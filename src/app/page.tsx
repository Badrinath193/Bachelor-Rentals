import { Hero } from "@/components/hero";
import { ListingGrid } from "@/components/listing-grid";
import { prisma } from "@/lib/prisma";
import { fallbackListings } from "@/lib/mock-data";

export default async function HomePage() {
  const listings = await prisma.listing
    .findMany({ take: 9, orderBy: { createdAt: "desc" } })
    .then((items) =>
      items.map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        description: item.description,
        imageUrl: item.imageUrl,
        pricePerDay: Number(item.pricePerDay)
      }))
    )
    .catch(() => fallbackListings);

  return (
    <main className="p-6">
      <Hero />
      <ListingGrid listings={listings.length ? listings : fallbackListings} />
    </main>
  );
}
