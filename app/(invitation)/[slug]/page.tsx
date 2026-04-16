import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { InvitationPageClient } from "@/components/invitation/invitation-page-client";
import Template1 from "@/components/invitation/templates/template-1";
import Template2 from "@/components/invitation/templates/template-2";
import Template3 from "@/components/invitation/templates/template-3";
import Template4 from "@/components/invitation/templates/template-4";
import Template5 from "@/components/invitation/templates/template-5";
import Template6 from "@/components/invitation/templates/template-6";
import type { InvitationTemplateProps } from "@/components/invitation/templates/types";

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(d: Date) {
  return d.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(d: Date) {
  return d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

// ── generateMetadata ──────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { to } = await searchParams;
  const guestName = to ? decodeURIComponent(to) : null;

  const inv = await prisma.invitation.findUnique({
    where: { slug },
    select: {
      title: true,
      groomName: true,
      brideName: true,
      eventDate: true,
      venueName: true,
      assets: { where: { kind: "HERO_IMAGE" }, take: 1, select: { url: true } },
    },
  });

  if (!inv) return { title: "Undangan tidak ditemukan — Sentuh Undang" };

  const heroUrl = inv.assets[0]?.url ?? null;
  const coupleName = `${inv.groomName} & ${inv.brideName}`;
  const dateStr = formatDate(inv.eventDate);

  const title = guestName
    ? `Kepada ${guestName} — Undangan ${coupleName}`
    : inv.title;

  const description = guestName
    ? `${guestName}, Anda diundang ke pernikahan ${coupleName} pada ${dateStr} di ${inv.venueName}. 💍`
    : `Pernikahan ${coupleName} — ${dateStr} di ${inv.venueName}`;

  const ogImages = heroUrl
    ? [{ url: heroUrl, width: 1200, height: 630, alt: coupleName }]
    : [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Sentuh Undang",
      ...(ogImages.length ? { images: ogImages } : {}),
    },
    twitter: {
      card: heroUrl ? "summary_large_image" : "summary",
      title,
      description,
      ...(heroUrl ? { images: [heroUrl] } : {}),
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function InvitationPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string; template?: string }>;
}) {
  const { slug } = await params;
  const { to, template: templateParam } = await searchParams;
  const guestName = to ? decodeURIComponent(to) : null;

  const inv = await prisma.invitation.findUnique({
    where: { slug },
    include: {
      tier: true,
      assets: { orderBy: { sortOrder: "asc" } },
      timeline: { orderBy: { sortOrder: "asc" } },
      rsvps: {
        where: { isPublic: true, message: { not: null } },
        orderBy: { createdAt: "desc" },
        take: 30,
      },
    },
  });

  if (!inv || inv.status === "ARCHIVED") notFound();

  const tierId = inv.tierId;

  // Allow ?template= query param to override the DB value.
  // Useful for demo slugs linked from the marketing portfolio.
  const templateIdFromParam = templateParam ? parseInt(templateParam, 10) : NaN;
  const templateId =
    !isNaN(templateIdFromParam) && [1, 2, 3, 4, 5, 6].includes(templateIdFromParam)
      ? templateIdFromParam
      : (inv.templateId ?? 1);

  // ── Tier gating ──────────────────────────────────────────────────────────
  const isTier2Plus = tierId >= 2;
  const isTier3Plus = tierId >= 3;
  const isTier4 = tierId >= 4;

  // ── Asset extraction ─────────────────────────────────────────────────────
  const heroAsset = inv.assets.find((a) => a.kind === "HERO_IMAGE");
  const heroUrl = heroAsset?.url ?? null;

  const musicUrl = isTier2Plus
    ? (inv.assets.find((a) => a.kind === "BACKGROUND_MUSIC")?.url ?? undefined)
    : undefined;

  const galleryImages = isTier2Plus
    ? inv.assets
        .filter((a) => a.kind === "GALLERY_IMAGE")
        .slice(0, 10)
        .map((a) => ({ url: a.url, altText: a.altText }))
    : [];

  // Portrait kinds are optional — returns null if not uploaded
  const groomPortraitUrl = isTier2Plus
    ? (inv.assets.find((a) => (a.kind as string) === "GROOM_PORTRAIT")?.url ?? null)
    : null;
  const bridePortraitUrl = isTier2Plus
    ? (inv.assets.find((a) => (a.kind as string) === "BRIDE_PORTRAIT")?.url ?? null)
    : null;

  const timelineEvents = isTier3Plus ? inv.timeline : [];

  const guestBookEntries = isTier3Plus
    ? inv.rsvps
        .filter((r) => r.message)
        .map((r) => ({
          id: r.id,
          guestName: r.guestName,
          attendance: r.attendance as string,
          message: r.message!,
          createdAt: r.createdAt,
        }))
    : [];

  const videoUrl = isTier4 ? (inv.videoUrl ?? null) : null;
  const coupleName = `${inv.groomName} & ${inv.brideName}`;

  const qrisData = isTier4
    ? {
        qrisUrl: inv.qrisUrl ?? null,
        bankName: inv.bankName ?? null,
        bankAccountNumber: inv.bankAccountNumber ?? null,
        bankAccountName: inv.bankAccountName ?? null,
        instagramFilterUrl: inv.instagramFilterUrl ?? null,
      }
    : null;

  const isDraft = inv.status === "DRAFT";
  const eventDateLabel = formatDate(inv.eventDate);
  const eventTimeLabel = formatTime(inv.eventDate);

  // ── Build shared template props ──────────────────────────────────────────
  const templateProps: InvitationTemplateProps = {
    inv: {
      id: inv.id,
      groomName: inv.groomName,
      brideName: inv.brideName,
      groomParentsLine: inv.groomParentsLine ?? null,
      brideParentsLine: inv.brideParentsLine ?? null,
      groomChildOrder: inv.groomChildOrder ?? null,
      brideChildOrder: inv.brideChildOrder ?? null,
      eventDate: inv.eventDate,
      venueName: inv.venueName,
      venueAddress: inv.venueAddress ?? null,
      mapUrl: inv.mapUrl ?? null,
      openingReligiousText: inv.openingReligiousText ?? null,
      basaSundaLemesKey: inv.basaSundaLemesKey ?? null,
      slug: inv.slug,
      status: inv.status as string,
      tierId,
      templateId,
    },
    heroUrl,
    videoUrl,
    musicUrl,
    galleryImages,
    groomPortraitUrl,
    bridePortraitUrl,
    timelineEvents,
    guestBookEntries,
    qrisData,
    guestName,
    coupleName,
    isDraft,
    isTier2Plus,
    isTier3Plus,
    isTier4,
    eventDateLabel,
    eventTimeLabel,
  };

  // ── Template selection (tier-aware) ──────────────────────────────────────
  function renderTemplate() {
    switch (templateId) {
      case 2: return <Template2 {...templateProps} />;
      case 3: return <Template3 {...templateProps} />;
      case 4: return <Template4 {...templateProps} />;
      case 5: return <Template5 {...templateProps} />;
      case 6: return <Template6 {...templateProps} />;
      default: return <Template1 {...templateProps} />;
    }
  }

  return (
    <InvitationPageClient
      coverProps={{
        groomName: inv.groomName,
        brideName: inv.brideName,
        heroImageUrl: heroUrl,
        guestName,
        eventDateLabel,
      }}
      musicUrl={musicUrl}
    >
      {renderTemplate()}
    </InvitationPageClient>
  );
}
