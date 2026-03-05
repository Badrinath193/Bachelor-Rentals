import { Hero } from "@/components/hero";
import { ListingGrid } from "@/components/listing-grid";
import { prisma } from "@/lib/prisma";
import { fallbackListings } from "@/lib/mock-data";

const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export default async function HomePage() {
  if (isStaticExport) {
    return (
      <main className="p-6">
        <Hero />
        <ListingGrid listings={fallbackListings} />
      </main>
    );
  }

  const listings = await prisma.listing
    .findMany({ take: 30, orderBy: { createdAt: "desc" } })
    .then((items) =>
      items.map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        description: item.description,
        imageUrl: item.imageUrl,
        pricePerDay: Number(item.pricePerDay),
        sellPrice: Number((item as any).sellPrice ?? item.pricePerDay),
        section: item.category.includes("electric") ? "Electric Mobility" : "Electronics"
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
