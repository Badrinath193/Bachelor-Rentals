export type MarketplaceListing = {
  id: string;
  title: string;
  category: string;
  section: "Electronics" | "Electric Mobility";
  description: string;
  imageUrl: string;
  pricePerDay: number;
  sellPrice: number;
};

export const fallbackListings: MarketplaceListing[] = [
  {
    id: "elec-1",
    title: "MacBook Pro M3",
    category: "laptop",
    section: "Electronics",
    description: "16-inch creator laptop for editing and development.",
    imageUrl: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=1600&q=80",
    pricePerDay: 45,
    sellPrice: 2199
  },
  {
    id: "elec-2",
    title: "Sony A7 IV Camera",
    category: "camera",
    section: "Electronics",
    description: "Professional mirrorless camera for photo and video creators.",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=80",
    pricePerDay: 38,
    sellPrice: 1899
  },
  {
    id: "elec-3",
    title: "DJI Mini 4 Pro",
    category: "drone",
    section: "Electronics",
    description: "Compact 4K drone with obstacle sensing and long flight time.",
    imageUrl: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1600&q=80",
    pricePerDay: 32,
    sellPrice: 1099
  },
  {
    id: "elec-4",
    title: "PlayStation 5 Bundle",
    category: "gaming",
    section: "Electronics",
    description: "Next-gen console bundle with dual controller set.",
    imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1600&q=80",
    pricePerDay: 24,
    sellPrice: 649
  },
  {
    id: "elec-5",
    title: "iPad Pro 12.9",
    category: "tablet",
    section: "Electronics",
    description: "Liquid Retina tablet with stylus support.",
    imageUrl: "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1600&q=80",
    pricePerDay: 19,
    sellPrice: 1199
  },
  {
    id: "elec-6",
    title: "Meta Quest 3",
    category: "vr",
    section: "Electronics",
    description: "Standalone VR headset for immersive games and work.",
    imageUrl: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=1600&q=80",
    pricePerDay: 22,
    sellPrice: 549
  },
  {
    id: "mob-1",
    title: "Tesla Model 3 Long Range",
    category: "electric-car",
    section: "Electric Mobility",
    description: "Premium EV sedan with autopilot and fast charging.",
    imageUrl: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1600&q=80",
    pricePerDay: 110,
    sellPrice: 38999
  },
  {
    id: "mob-2",
    title: "Ather 450X Scooter",
    category: "electric-scooter",
    section: "Electric Mobility",
    description: "Smart urban e-scooter with connected dashboard.",
    imageUrl: "https://images.unsplash.com/photo-1620748832320-8d4d4a22f4ee?auto=format&fit=crop&w=1600&q=80",
    pricePerDay: 18,
    sellPrice: 2199
  },
  {
    id: "mob-3",
    title: "Specialized Turbo Vado",
    category: "electric-bike",
    section: "Electric Mobility",
    description: "Commuter e-bike with pedal assist and long battery life.",
    imageUrl: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=1600&q=80",
    pricePerDay: 21,
    sellPrice: 3299
  },
  {
    id: "mob-4",
    title: "Segway Ninebot Max",
    category: "electric-scooter",
    section: "Electric Mobility",
    description: "Durable electric scooter for daily short trips.",
    imageUrl: "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?auto=format&fit=crop&w=1600&q=80",
    pricePerDay: 14,
    sellPrice: 899
  },
  {
    id: "mob-5",
    title: "Tata Nexon EV",
    category: "electric-car",
    section: "Electric Mobility",
    description: "Compact electric SUV with practical range.",
    imageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1600&q=80",
    pricePerDay: 72,
    sellPrice: 22999
  },
  {
    id: "mob-6",
    title: "Rad Power Cargo E-Bike",
    category: "electric-bike",
    section: "Electric Mobility",
    description: "Cargo e-bike ideal for deliveries and heavy loads.",
    imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1600&q=80",
    pricePerDay: 26,
    sellPrice: 3599
  }
];
