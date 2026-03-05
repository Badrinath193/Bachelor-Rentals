import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        glass: "rgba(255,255,255,0.08)",
        neon: "#22d3ee"
      }
    }
  },
  plugins: []
} satisfies Config;
