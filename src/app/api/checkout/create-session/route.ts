import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PLATFORM_FEE_PERCENT, stripe } from "@/lib/stripe";
import { calculateRentalPrice } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { listingId, daysSelected, startDate } = await request.json();
    const listing = await prisma.listing.findUnique({ where: { id: listingId }, include: { owner: true } });
    if (!listing || !listing.isAvailable) return NextResponse.json({ error: "Listing unavailable" }, { status: 400 });

    const total = calculateRentalPrice(daysSelected, Number(listing.pricePerDay));
    const platformFee = Number(((total * PLATFORM_FEE_PERCENT) / 100).toFixed(2));

    const booking = await prisma.booking.create({
      data: {
        listingId,
        renterId: session.user.id,
        startDate: new Date(startDate),
        endDate: new Date(new Date(startDate).getTime() + daysSelected * 86400000),
        daysSelected,
        totalPrice: total
      }
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: Math.round(total * 100),
            product_data: { name: listing.title }
          }
        }
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/listings/${listing.id}?checkout=cancel`,
      payment_intent_data: {
        application_fee_amount: Math.round(platformFee * 100),
        transfer_data: listing.owner.stripeAccount ? { destination: listing.owner.stripeAccount } : undefined
      },
      metadata: {
        bookingId: booking.id,
        payerId: session.user.id,
        sellerId: listing.ownerId,
        platformFee: platformFee.toString()
      }
    });

    await prisma.transaction.create({
      data: {
        bookingId: booking.id,
        payerId: session.user.id,
        sellerId: listing.ownerId,
        amount: total,
        platformFee,
        stripeCheckoutId: checkoutSession.id
      }
    });

    return NextResponse.json({ checkoutUrl: checkoutSession.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create Stripe session" }, { status: 500 });
  }
}
