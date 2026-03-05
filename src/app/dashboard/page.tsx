import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id || "";

  const [activeRentals, selling] = await Promise.all([
    prisma.booking.findMany({ where: { renterId: userId, status: { in: ["PENDING", "PAID"] } }, include: { listing: true } }),
    prisma.listing.findMany({ where: { ownerId: userId } })
  ]);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-3xl font-bold">My Dashboard</h1>
      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="glass-card rounded-2xl p-4">
          <h2 className="font-semibold">Active Rentals</h2>
          <p className="text-4xl text-cyan-300">{activeRentals.length}</p>
        </div>
        <div className="glass-card rounded-2xl p-4">
          <h2 className="font-semibold">Items I'm Selling</h2>
          <p className="text-4xl text-cyan-300">{selling.length}</p>
        </div>
      </section>
    </main>
  );
}
