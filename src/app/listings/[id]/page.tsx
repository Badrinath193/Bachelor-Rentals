import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { calculateRentalPrice } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const listing = await prisma.listing.findUnique({ where: { id: params.id } }).catch(() => null);
  if (!listing) {
    return { title: "Listing Not Found | Bachelor Rentals" };
  }

  return {
    title: `${listing.title} | Bachelor Rentals`,
    description: listing.description,
    openGraph: {
      title: listing.title,
      description: listing.description,
      images: [listing.imageUrl]
    }
  };
}

export default async function ListingDetails({ params }: { params: { id: string } }) {
  const listing = await prisma.listing.findUnique({ where: { id: params.id } }).catch(() => null);

  if (!listing) notFound();

  const estimate = calculateRentalPrice(3, Number(listing.pricePerDay));

  return (
    <main className="mx-auto max-w-4xl p-6">
      <article className="glass-card rounded-2xl p-6">
        <img src={listing.imageUrl} alt={listing.title} className="h-72 w-full rounded-xl object-cover" />
        <h1 className="mt-5 text-3xl font-bold">{listing.title}</h1>
        <p className="mt-2 text-slate-300">{listing.description}</p>
        <p className="mt-4 text-cyan-300">Rent: ${Number(listing.pricePerDay)}/day</p>
        <p className="mt-1 text-emerald-300">Buy: ${Number((listing as any).sellPrice ?? listing.pricePerDay).toFixed(2)}</p>
        <p className="mt-2 text-sm text-slate-400">Estimated rental for 3 days: ${estimate}</p>
      </article>
    </main>
  );
}
