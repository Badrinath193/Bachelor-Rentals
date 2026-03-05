"use client";

import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { toast } from "react-hot-toast";
import { ShoppingCart, Star } from "lucide-react";
import { useCartStore } from "@/lib/store";

type Listing = {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  pricePerDay: number;
};

export const ListingGrid = ({ listings }: { listings: Listing[] }) => {
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    gsap.fromTo(
      ".listing-card",
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" }
    );
  }, [listings]);

  return (
    <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing) => (
        <article key={listing.id} className="listing-card glass-card rounded-2xl p-4">
          <img src={listing.imageUrl} alt={listing.title} className="h-44 w-full rounded-xl object-cover" />
          <h2 className="mt-3 text-xl font-semibold">{listing.title}</h2>
          <p className="text-sm text-slate-300">{listing.description}</p>
          <div className="mt-3 flex items-center justify-between text-cyan-300">
            <span>${listing.pricePerDay}/day</span>
            <span className="inline-flex items-center gap-1"><Star size={14} />4.8</span>
          </div>
          <div className="mt-4 flex gap-2">
            <Link className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-medium text-slate-950" href={`/listings/${listing.id}`}>Rent</Link>
            <button
              onClick={() => {
                addItem({ listingId: listing.id, title: listing.title, pricePerDay: listing.pricePerDay, days: 1 });
                toast.success(`${listing.title} added to cart`);
              }}
              className="inline-flex items-center gap-1 rounded-lg border border-white/30 px-3 py-2 text-sm"
            >
              <ShoppingCart size={14} /> Cart
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};
