import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const [transactions, users, listings] = await Promise.all([
    prisma.transaction.findMany(),
    prisma.user.count(),
    prisma.listing.count()
  ]);

  const revenue = transactions.reduce((sum, txn) => sum + Number(txn.amount), 0);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-3xl font-bold">Admin Analytics</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="glass-card rounded-xl p-4">Revenue: ${revenue.toFixed(2)}</div>
        <div className="glass-card rounded-xl p-4">Users: {users}</div>
        <div className="glass-card rounded-xl p-4">Listings: {listings}</div>
      </div>
    </main>
  );
}
