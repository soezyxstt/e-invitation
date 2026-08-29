# Sentuh Undang

Full-stack digital invitation platform with configurable packages, guest personalization, RSVP, QR check-in, media, and admin tools.

## Features

- Tier-based invitation features
- Personalized guest links
- RSVP and guest-book flows
- Image and media support
- QR code generation and check-in
- Protected admin dashboard
- Mobile-first invitation pages

## Stack

`Next.js 16` `React 19` `TypeScript` `PostgreSQL` `Prisma` `NextAuth.js` `UploadThing` `Zod` `Framer Motion` `Tailwind CSS 4` `Bun`

## Architecture

```text
Guests / Admins
       │
       ▼
  Next.js App
       │
   Auth + Product + Uploads
       │
     Prisma
       │
   PostgreSQL
```

## Development

```bash
bun install
cp .env.example .env.local
bun run dev
```

Validation:

```bash
bun run lint
bun run build
```

Use local development credentials and never commit production secrets.
