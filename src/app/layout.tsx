import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Bachelor Rentals",
  description: "Rent homes, rides, and tech with secure checkout."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <PageTransition>{children}</PageTransition>
        </Providers>
      </body>
    </html>
  );
}
