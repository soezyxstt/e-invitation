# Sentuh Undang

A full-stack digital invitation platform designed for configurable invitation tiers, guest personalization, RSVP workflows, QR-based check-in, media features, and administrative management.

The project is built as a real SaaS-style product rather than a static invitation template.

## Product capabilities

- Tier-based invitation features and presentation
- Personalized guest links and invitation content
- RSVP and digital guest-book workflows
- Image and media support
- QR code generation and check-in flows
- Administrative dashboard with protected routes
- Authentication with credentials-based access
- Mobile-first invitation pages

## Tech stack

- **Next.js 16** + React 19 + TypeScript
- **PostgreSQL** + Prisma 7
- **NextAuth.js**
- **UploadThing** for media uploads
- **Zod** for validation
- **Framer Motion** for interaction and animation
- **Tailwind CSS 4**
- **Bun** for local tooling

## Architecture

```text
Guests / Admins
       │
       ▼
  Next.js application
       │
  ┌────┼─────────────┐
  │    │             │
  ▼    ▼             ▼
Auth  Product      Uploads
      workflows       │
  │    │          UploadThing
  └────┼─────────────┘
       ▼
    Prisma
       │
       ▼
  PostgreSQL
```

## Local development

```bash
bun install
cp .env.example .env.local
bun run dev
```

The application requires a PostgreSQL connection and authentication configuration. Use local development values and never commit production credentials.

Useful checks:

```bash
bun run lint
bun run build
```

## Project context

The product is designed around a tiered invitation business model, where invitation capabilities can be enabled according to the selected package while sharing one underlying application and administration system.
