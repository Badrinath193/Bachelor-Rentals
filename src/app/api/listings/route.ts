import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const createSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string(),
  imageUrl: z.string().min(1),
  pricePerDay: z.number().positive(),
  sellPrice: z.number().positive()
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || 100000);

  const listings = await prisma.listing.findMany({
    where: {
      category,
      pricePerDay: { gte: minPrice, lte: maxPrice }
    }
  });

  return NextResponse.json(listings);
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role === "GUEST") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = createSchema.parse(await request.json());
    const created = await prisma.listing.create({
      data: {
        ...payload,
        ownerId: session.user.id,
        pricePerDay: payload.pricePerDay
      }
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "Unable to create listing" }, { status: 500 });
  }
}
