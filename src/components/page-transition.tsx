"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (!ref.current) return;
    const state = Flip.getState(ref.current);
    gsap.fromTo(ref.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.45 });
    Flip.from(state, { duration: 0.4, absolute: true, ease: "power2.out" });
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
};
