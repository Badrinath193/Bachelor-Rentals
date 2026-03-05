"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: root.current,
          start: "top center"
        }
      }
    );
  }, []);

  return (
    <section ref={root} className="glass-card mx-auto mt-8 max-w-6xl rounded-3xl p-12">
      <h1 className="hero-text text-5xl font-bold">Bachelor Rentals</h1>
      <p className="hero-text mt-4 max-w-2xl text-slate-200">
        Book houses, cars, laptops, bikes, cameras, books, and clothes with Stripe-secured payments and role-aware dashboards.
      </p>
    </section>
  );
};
