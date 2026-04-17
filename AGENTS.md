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

## Cursor Cloud specific instructions

### Services overview
This is a single Next.js 16 app (not a monorepo). The only required services are:
- **Next.js dev server** (`bun run dev`) — serves all routes, API endpoints, and SSR pages.
- **PostgreSQL** — the sole data store. Prisma ORM connects via `DATABASE_URL`.

Uploadthing (file uploads) is optional; the app starts and core invitation CRUD works without it.

### Local database setup
A local PostgreSQL 16 instance is used for development. The database `sentuhundang` is owned by user `sentuhundang` (password: `sentuhundang`).

If the injected `DATABASE_URL` env var points at a remote Neon DB, override it for local dev:
```
export DATABASE_URL="postgresql://sentuhundang:sentuhundang@localhost:5432/sentuhundang"
```

After starting PostgreSQL (`sudo pg_ctlcluster 16 main start`), push the schema and seed:
```
DATABASE_URL="..." npx prisma db push
DATABASE_URL="..." bun prisma/seed.ts
```

A test admin user exists: **username `admin`**, **password `admin123`**.

### Running the dev server
Override env vars that point at remote services. Set `DATABASE_URL` to the local PostgreSQL connection string shown above. Set `NEXTAUTH_SECRET` to any random 32+ char string. Set `NEXTAUTH_URL` to the local dev URL (port 3000). Then:
```
bun run dev
```

### Lint / Build / Test
- **Lint:** `bun run lint` — uses ESLint 9 with `eslint-config-next`. Pre-existing lint issues exist in `components/admin/invitation-form.tsx`.
- **Build:** `bun run build` (runs `prisma generate && next build`).
- **No automated test suite** exists yet; testing is manual via the browser.

### Gotchas
- The `middleware.ts` file convention is deprecated in Next.js 16. The build warns to use `proxy` instead. This is a pre-existing state.
- Prisma 7 reads `DATABASE_URL` from `prisma.config.ts` (which loads `dotenv`). However, injected Cloud Agent secrets take precedence as actual env vars over `.env` file values. Always pass `DATABASE_URL=...` explicitly on the command line when targeting the local database.
- The `postinstall` script in `package.json` runs `prisma generate` automatically on `bun install`.
