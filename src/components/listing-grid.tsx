"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { toast } from "react-hot-toast";
import { ShoppingCart, Star, Zap, Laptop } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { MarketplaceListing } from "@/lib/mock-data";

export const ListingGrid = ({ listings }: { listings: MarketplaceListing[] }) => {
  const [daysSelected, setDaysSelected] = useState(3);
  const [mode, setMode] = useState<"rent" | "buy">("rent");
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    gsap.fromTo(
      ".listing-card",
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" }
    );
  }, [listings, mode, daysSelected]);

  const sections = useMemo(() => {
    return {
      electronics: listings.filter((item) => item.section === "Electronics"),
      mobility: listings.filter((item) => item.section === "Electric Mobility")
    };
  }, [listings]);

  return (
    <div className="mx-auto mt-10 max-w-6xl space-y-8">
      <div className="glass-card flex flex-wrap items-center gap-4 rounded-2xl p-4">
        <button onClick={() => setMode("rent")} className={`rounded-lg px-4 py-2 ${mode === "rent" ? "bg-cyan-500 text-slate-950" : "bg-slate-900"}`}>Rent Mode</button>
        <button onClick={() => setMode("buy")} className={`rounded-lg px-4 py-2 ${mode === "buy" ? "bg-cyan-500 text-slate-950" : "bg-slate-900"}`}>Buy Mode</button>
        <label className="ml-auto text-sm text-slate-200">Days: {daysSelected}</label>
        <input type="range" min={1} max={30} value={daysSelected} onChange={(e) => setDaysSelected(Number(e.target.value))} />
      </div>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold"><Laptop size={20} />Electronics</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.electronics.map((listing) => (
            <article key={listing.id} className="listing-card glass-card rounded-2xl p-4">
              <img src={listing.imageUrl} alt={listing.title} className="h-44 w-full rounded-xl object-cover" />
              <h3 className="mt-3 text-xl font-semibold">{listing.title}</h3>
              <p className="text-sm text-slate-300">{listing.description}</p>
              <div className="mt-3 flex items-center justify-between text-cyan-300">
                <span>{mode === "rent" ? `$${(listing.pricePerDay * daysSelected).toFixed(2)} / ${daysSelected} days` : `$${listing.sellPrice.toFixed(2)} buy now`}</span>
                <span className="inline-flex items-center gap-1"><Star size={14} />4.9</span>
              </div>
              <div className="mt-4 flex gap-2">
                <Link className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-medium text-slate-950" href={`/listings/${listing.id}`}>{mode === "rent" ? "Rent" : "Buy"}</Link>
                <button
                  onClick={() => {
                    addItem({ listingId: listing.id, title: listing.title, pricePerDay: mode === "rent" ? listing.pricePerDay : listing.sellPrice, days: mode === "rent" ? daysSelected : 1 });
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
      </section>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold"><Zap size={20} />Electric Mobility</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.mobility.map((listing) => (
            <article key={listing.id} className="listing-card glass-card rounded-2xl p-4">
              <img src={listing.imageUrl} alt={listing.title} className="h-44 w-full rounded-xl object-cover" />
              <h3 className="mt-3 text-xl font-semibold">{listing.title}</h3>
              <p className="text-sm text-slate-300">{listing.description}</p>
              <div className="mt-3 flex items-center justify-between text-cyan-300">
                <span>{mode === "rent" ? `$${(listing.pricePerDay * daysSelected).toFixed(2)} / ${daysSelected} days` : `$${listing.sellPrice.toFixed(2)} buy now`}</span>
                <span className="inline-flex items-center gap-1"><Star size={14} />4.8</span>
              </div>
              <div className="mt-4 flex gap-2">
                <Link className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-medium text-slate-950" href={`/listings/${listing.id}`}>{mode === "rent" ? "Rent" : "Buy"}</Link>
                <button
                  onClick={() => {
                    addItem({ listingId: listing.id, title: listing.title, pricePerDay: mode === "rent" ? listing.pricePerDay : listing.sellPrice, days: mode === "rent" ? daysSelected : 1 });
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
      </section>
    </div>
  );
};
