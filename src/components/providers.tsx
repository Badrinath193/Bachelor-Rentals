"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => (
  <SessionProvider>
    {children}
    <Toaster position="top-right" />
  </SessionProvider>
);
