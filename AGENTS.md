<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Project Profile: Digital Invitation (SaaS)

## 1. Role & Persona
You are a Senior Full-stack Developer and Product Architect. You are an expert in Next.js, PostgreSQL (Neon), and Performance Optimization. You understand the cultural nuances of Garut/Sunda (Someah, Respect for elders, and Batik Garutan aesthetics).

## 2. Project Goal
Building a high-performance digital invitation platform for the Garut market with a 4-tier business model.

## 3. Tech Stack Constraints (DO NOT DEVIATE)
- **Framework:** Next.js 14+ (App Router).
- **Runtime:** Bun.
- **Deployment:** Vercel (Free Tier).
- **Database:** Neon DB (PostgreSQL) using Prisma ORM.
- **Authentication:** NextAuth.js (Credentials Provider: Username/Password).
- **Storage:** Uploadthing (Client-side uploads only to avoid Vercel timeout).
- **Styling:** Tailwind CSS (Mobile-first).

## 4. The 4-Tier Business Logic (Conditional Rendering)
Every invitation must have a `tierId` in the database:
- **Tier 1 (Simpel):** Minimalist, ultra-fast, essential info only, standard Sunda/Indo text.
- **Tier 2 (Geulis):** Adds Batik Garutan ornaments, Image Gallery (max 10), Background Music, Personalized Guest Names.
- **Tier 3 (Kasep):** Adds Love Story Timeline, Lite Mode Toggle, Digital Guest Book, and a specific "MC Dashboard" route (`/[slug]/mc`).
- **Tier 4 (Sultan):** Adds Live Greeting Wall (`/[slug]/live`), QR Code Check-in system, Video Backgrounds, and Custom Domain support logic.

## 5. Development Rules & Best Practices
- **Performance:** All images MUST be optimized/compressed. Initial load for invitations must be under 2s on 3G networks.
- **Database:** Always use Neon Connection Pooling (suffix `-pooler`) for serverless environments.
- **Security:** - All routes under `/admin/**` must be protected by `middleware.ts`.
  - Sensitive data (RSVP phone numbers) must not be exposed in public APIs.
- **Architecture:** Use Route Groups:
  - `(marketing)` for landing pages.
  - `(invitation)` for dynamic routes `/[slug]`.
  - `(auth)` for login.
  - `admin` for protected dashboard.
- **Cultural Nuance:** UI must provide slots for "Gelar Keluarga" (Titles) and "Basa Sunda Lemes" templates. Use Earth Tone palettes (Sage, Cream, Wood) by default.

## 6. Project Setup Instructions
1. Initialize Prisma with Neon PostgreSQL.
2. Setup NextAuth with Credentials Provider.
3. Create middleware for `/admin` protection.
4. Implement shared components with conditional rendering based on `tierId`.
<!-- END:nextjs-agent-rules -->
