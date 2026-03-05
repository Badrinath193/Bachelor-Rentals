"use client";

import { create } from "zustand";

type CartItem = {
  listingId: string;
  title: string;
  pricePerDay: number;
  days: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (listingId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items.filter((i) => i.listingId !== item.listingId), item]
    })),
  removeItem: (listingId) => set((state) => ({ items: state.items.filter((i) => i.listingId !== listingId) })),
  clear: () => set({ items: [] })
}));
