# Bachelor Rentals (Next.js Full-Stack)

Full-stack rental marketplace built with Next.js 14 App Router, TypeScript, Tailwind CSS, GSAP, Prisma, PostgreSQL, NextAuth RBAC, Stripe Connect checkout, and Zustand cart state.

## Stack
- Next.js 14 + TypeScript + Tailwind CSS
- Prisma ORM + PostgreSQL
- NextAuth Credentials + RBAC (Guest/Member/Admin)
- Stripe Connect (application fee + seller transfer)
- GSAP (hero sequence, stagger card entry, Flip page transitions)
- Zustand cart, react-hot-toast notifications, skeleton loading components

## Required environment variables
Create `.env` with:

```bash
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
PLATFORM_FEE_PERCENT="10"
```

## Run
```bash
npm install
npx prisma generate
npm run dev
```

## Structure
- `src/app`: app router pages + API routes
- `src/components`: UI and GSAP client components
- `src/lib`: Prisma, Stripe, RBAC, Zustand, utility logic
- `src/types`: shared TS declarations
- `prisma`: schema and SQL migration
