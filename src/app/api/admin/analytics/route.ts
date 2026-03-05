import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [transactions, users, listings, bookings] = await Promise.all([
    prisma.transaction.findMany({ where: { status: "SUCCEEDED" } }),
    prisma.user.count(),
    prisma.listing.count(),
    prisma.booking.count()
  ]);

  const totalRevenue = transactions.reduce((acc, txn) => acc + Number(txn.amount), 0);
  const platformFees = transactions.reduce((acc, txn) => acc + Number(txn.platformFee), 0);

  return NextResponse.json({ totalRevenue, platformFees, users, listings, bookings });
}
