import Image from "next/image";
import { Calendar, Clock, Tv2 } from "lucide-react";
import { FadeIn } from "@/components/invitation/fade-in";
import { CountdownTimer } from "@/components/invitation/countdown-timer";
import { RsvpForm } from "@/components/invitation/rsvp-form";
import { Timeline } from "@/components/invitation/timeline";
import { GuestBook } from "@/components/invitation/guest-book";
import { QrisSection } from "@/components/invitation/qris-section";
import { WeddingGiftSection } from "@/components/invitation/wedding-gift-section";
import { VideoHero } from "@/components/invitation/video-hero";
import { MapsEmbed } from "@/components/invitation/maps-embed";
import {
  BatikBorder,
  BatikCornerGroup,
  FloatingPetals,
  CloudLayer,
  WavyBatikEdge,
  LotusRing,
  FloralSeparator,
} from "@/components/invitation/ornament";
import {
  KawungBg,
  ParangDarkBg,
  SemenBg,
  LerengBg,
} from "@/components/invitation/pattern-bg";
import { CarouselGallery } from "./carousel-gallery";
import { getFirstName } from "@/lib/name-utils";
import { groomFallback, brideFallback } from "@/lib/portrait-fallback";
import type { InvitationTemplateProps } from "../types";

/**
 * Template 1 — The Classic Editorial
 *
 * Layout DNA:
 * - Warm ivory palette (primary-cream, surface-night, wood-brown) — magazine luxury
 * - Hero: Split-screen on desktop (left fixed photo, right scrollable text).
 *   On mobile: stacked (photo → text below).
 * - Couple: Circular portraits, double ring border, stacked center alignment.
 * - Gallery: Horizontal carousel with arrow navigation and dot indicators.
 * - Animations: Simple fade + slide-up (slow, elegant) via existing FadeIn.
 * - Typography: Serif headings, wide-tracked uppercase labels, generous whitespace.
 */

// ── Thin editorial divider ────────────────────────────────────────────────────

function EditorialRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="h-px flex-1 bg-muted-gold/50" />
      <div className="h-1.5 w-1.5 rotate-45 bg-wood-brown/60" />
      <div className="h-px flex-1 bg-muted-gold/50" />
    </div>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────

function SectionHead({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-12 text-center">
      <p className="font-sans text-[9px] uppercase tracking-[0.55em] text-wood-brown/80">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-serif text-[30px] font-light text-surface-night">{title}</h2>
      <EditorialRule className="mx-auto mt-4 max-w-[160px]" />
    </div>
  );
}

// ── Circle portrait ───────────────────────────────────────────────────────────

function CirclePortrait({
  src,
  alt,
  fallbackUrl,
}: {
  src: string | null;
  alt: string;
  fallbackUrl: string;
}) {
  return (
    <div className="avatar-ring-editorial mx-auto h-32 w-32 overflow-hidden rounded-full border-2 border-muted-gold/60">
      <Image
        src={src ?? fallbackUrl}
        alt={alt}
        width={128}
        height={128}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

// ── Template ─────────────────────────────────────────────────────────────────

export default function Template1({
  inv,
  heroUrl,
  videoUrl,
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
}: InvitationTemplateProps) {
  const shortGroom = getFirstName(inv.groomName);
  const shortBride = getFirstName(inv.brideName);

  return (
    <div className="bg-primary-cream font-sans">
      {isDraft && (
        <div className="sticky top-0 z-40 bg-amber-400 py-1 text-center text-xs font-semibold tracking-wide text-amber-900">
          PRATINJAU — Undangan belum tayang
        </div>
      )}

      {/* ── HERO: Split-screen (desktop) / Stacked (mobile) ───────────── */}
      {isTier4 && videoUrl ? (
        <VideoHero videoUrl={videoUrl} fallbackImageUrl={heroUrl}>
          <HeroText
            shortGroom={shortGroom}
            shortBride={shortBride}
            eventDateLabel={eventDateLabel}
            venueName={inv.venueName}
          />
        </VideoHero>
      ) : (
        <section className="lg:flex lg:min-h-screen">
          {/* Left — sticky photo panel */}
          <div className="relative h-[60dvh] lg:sticky lg:top-0 lg:h-screen lg:w-1/2 lg:shrink-0">
            {heroUrl ? (
              <Image
                src={heroUrl}
                alt={coupleName}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted-gold/15">
                <span className="font-serif text-6xl font-light text-wood-brown/40">
                  {shortGroom[0]}&amp;{shortBride[0]}
                </span>
              </div>
            )}
            {/* Subtle inner shadow on edges */}
            <div className="inv-hero-vignette pointer-events-none absolute inset-0" />
          </div>

          {/* Right — editorial text (scrolls while left stays) */}
          <div className="flex flex-col items-center justify-center px-8 py-16 lg:w-1/2 lg:min-h-screen">
            <HeroText
              shortGroom={shortGroom}
              shortBride={shortBride}
              eventDateLabel={eventDateLabel}
              venueName={inv.venueName}
            />
          </div>
        </section>
      )}

      {/* ── ORNAMENT DIVIDER ──────────────────────────────────────────────── */}
      <WavyBatikEdge className="mx-0" />

      {/* ── OPENING TEXT ──────────────────────────────────────────────────── */}
      {inv.openingReligiousText && (
        <section className="relative overflow-hidden bg-primary-cream px-8 py-16">
          <KawungBg opacity={0.04} />
          <BatikCornerGroup />
          <FloatingPetals count={4} />
          <FadeIn className="relative z-10 mx-auto max-w-sm text-center">
            <EditorialRule />
            <p className="mt-8 font-serif text-base italic leading-loose text-wood-brown">
              &ldquo;{inv.openingReligiousText}&rdquo;
            </p>
            {inv.basaSundaLemesKey === "sunda_lemes" && (
              <p className="mt-5 font-sans text-xs leading-relaxed text-wood-brown/80">
                Kalayan hormat, kami ngondang ka Bapa/Ibu/Saderek sadayana
                kanggo ngiringan mangsa bingah kami.
              </p>
            )}
            <EditorialRule className="mt-8" />
          </FadeIn>
        </section>
      )}

      {/* ── COUPLE: Circle portraits, text below ─────────────────────────── */}
      <section className="relative overflow-hidden bg-primary-cream px-8 py-16">
        <SemenBg opacity={0.038} />
        <FadeIn className="relative z-10">
          <SectionHead eyebrow="Mempelai" title="The Couple" />
        </FadeIn>

        <div className="relative z-10 mx-auto max-w-sm space-y-12">
          {/* Mempelai Pria */}
          <FadeIn direction="left">
            <div className="text-center">
              <CirclePortrait
                src={groomPortraitUrl}
                alt={inv.groomName}
                fallbackUrl={groomFallback(inv.groomName)}
              />
              <p className="mt-5 font-sans text-[9px] uppercase tracking-[0.38em] text-wood-brown/80">
                Mempelai Pria
              </p>
              <h3 className="mt-2 font-serif text-[22px] font-light text-surface-night">
                {inv.groomName}
              </h3>
              {inv.groomChildOrder && (
                <p className="mt-1 font-sans text-xs capitalize text-wood-brown/80">
                  {inv.groomChildOrder}
                </p>
              )}
              {inv.groomParentsLine && (
                <p className="mt-3 font-sans text-sm leading-relaxed text-wood-brown/85">
                  {inv.groomParentsLine}
                </p>
              )}
            </div>
          </FadeIn>

          {/* Divider with lotus ornament */}
          <div className="flex flex-col items-center gap-3">
            <EditorialRule />
            <LotusRing />
            <EditorialRule />
          </div>

          {/* Mempelai Wanita */}
          <FadeIn direction="right">
            <div className="text-center">
              <CirclePortrait
                src={bridePortraitUrl}
                alt={inv.brideName}
                fallbackUrl={brideFallback(inv.brideName)}
              />
              <p className="mt-5 font-sans text-[9px] uppercase tracking-[0.38em] text-wood-brown/80">
                Mempelai Wanita
              </p>
              <h3 className="mt-2 font-serif text-[22px] font-light text-surface-night">
                {inv.brideName}
              </h3>
              {inv.brideChildOrder && (
                <p className="mt-1 font-sans text-xs capitalize text-wood-brown/80">
                  {inv.brideChildOrder}
                </p>
              )}
              {inv.brideParentsLine && (
                <p className="mt-3 font-sans text-sm leading-relaxed text-wood-brown/85">
                  {inv.brideParentsLine}
                </p>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── BATIK DIVIDER ─────────────────────────────────────────────────── */}
      <BatikBorder />

      {/* ── SAVE THE DATE / COUNTDOWN ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-surface-night px-8 py-16 text-center">
        <ParangDarkBg opacity={0.1} />
        <CloudLayer position="top" opacity={0.07} />
        <FloatingPetals count={5} dark />
        <FadeIn className="relative z-10">
          <p className="font-sans text-[9px] uppercase tracking-[0.5em] text-muted-gold/55">
            Save The Date
          </p>
          <h2 className="mt-3 font-serif text-[24px] font-light text-primary-cream">
            {eventDateLabel}
          </h2>
          <EditorialRule className="mx-auto mt-5 mb-8 max-w-[180px] opacity-20" />
          <CountdownTimer eventDate={inv.eventDate} />
        </FadeIn>
        <CloudLayer position="bottom" opacity={0.06} />
      </section>

      {/* ── BATIK DIVIDER ─────────────────────────────────────────────────── */}
      <BatikBorder />

      {/* ── EVENT DETAILS ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary-cream px-8 py-16">
        <LerengBg opacity={0.04} />
        <FadeIn className="relative z-10">
          <SectionHead eyebrow="Informasi Acara" title="Wedding Event" />
        </FadeIn>
        <FadeIn className="relative z-10 mx-auto max-w-sm space-y-3">
          <div className="overflow-hidden rounded-xl border border-muted-gold/60 bg-white shadow-sm">
            <div className="flex items-center gap-4 border-b border-muted-gold/25 px-5 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-night">
                <Calendar size={15} className="text-primary-cream" />
              </div>
              <div>
                <p className="font-sans text-[8px] uppercase tracking-[0.28em] text-wood-brown/80">
                  Tanggal
                </p>
                <p className="mt-0.5 font-sans text-sm font-medium text-surface-night">
                  {eventDateLabel}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-night">
                <Clock size={15} className="text-primary-cream" />
              </div>
              <div>
                <p className="font-sans text-[8px] uppercase tracking-[0.28em] text-wood-brown/80">
                  Waktu
                </p>
                <p className="mt-0.5 font-sans text-sm font-medium text-surface-night">
                  {eventTimeLabel} WIB
                </p>
              </div>
            </div>
          </div>
          <MapsEmbed
            venueName={inv.venueName}
            venueAddress={inv.venueAddress}
            mapUrl={inv.mapUrl}
          />
        </FadeIn>
      </section>

      {/* ── GALLERY: Carousel (Tier 2+) ───────────────────────────────────── */}
      {isTier2Plus && galleryImages.length > 0 && (
        <section className="bg-primary-cream px-6 py-16">
          <FadeIn>
            <SectionHead eyebrow="Kenangan" title="Galeri Foto" />
          </FadeIn>
          <FadeIn className="mx-auto max-w-xl">
            <CarouselGallery images={galleryImages} />
          </FadeIn>
        </section>
      )}

      {/* ── TIMELINE (Tier 3+) ────────────────────────────────────────────── */}
      {isTier3Plus && timelineEvents.length > 0 && (
        <section className="relative overflow-hidden bg-primary-cream px-8 py-16">
          <KawungBg opacity={0.035} />
          <FadeIn className="relative z-10">
            <SectionHead eyebrow="Perjalanan Cinta" title="Our Story" />
          </FadeIn>
          <div className="relative z-10 mx-auto max-w-sm">
            <Timeline events={timelineEvents} />
          </div>
        </section>
      )}

      {/* ── BATIK DIVIDER ─────────────────────────────────────────────────── */}
      <BatikBorder />

      {/* ── RSVP ─────────────────────────────────────────────────────────── */}
      {inv.status === "PUBLISHED" && (
        <section className="relative overflow-hidden bg-primary-cream px-8 py-16">
          <SemenBg opacity={0.038} />
          <BatikCornerGroup />
          <FadeIn className="relative z-10">
            <SectionHead eyebrow="Konfirmasi" title="RSVP" />
            <p className="mx-auto -mt-6 mb-10 max-w-xs text-center font-sans text-sm leading-relaxed text-wood-brown/85">
              Mohon konfirmasi kehadiran Anda sebelum hari-H agar kami dapat
              mempersiapkan segalanya dengan baik.
            </p>
          </FadeIn>
          <FadeIn className="relative z-10 mx-auto max-w-sm">
            <RsvpForm
              invitationId={inv.id}
              defaultName={guestName ?? undefined}
              coupleName={coupleName}
            />
          </FadeIn>
        </section>
      )}

      {/* ── BUKU TAMU (Tier 3+) ──────────────────────────────────────────── */}
      {isTier3Plus && (
        <section className="relative overflow-hidden bg-primary-cream px-8 py-16">
          <LerengBg opacity={0.038} />
          <FadeIn className="relative z-10">
            <SectionHead eyebrow="Ucapan Tamu" title="Buku Tamu" />
          </FadeIn>
          <GuestBook entries={guestBookEntries} invitationId={inv.id} />
        </section>
      )}

      {/* ── BATIK DIVIDER ─────────────────────────────────────────────────── */}
      <BatikBorder />

      {/* ── AMPLOP DIGITAL / QRIS ─────────────────────────────────────────── */}
      {isTier4 && qrisData && (
        <FadeIn>
          <WeddingGiftSection
            bankName={qrisData.bankName}
            bankAccountNumber={qrisData.bankAccountNumber}
            bankAccountName={qrisData.bankAccountName}
          />
          <QrisSection
            qrisUrl={qrisData.qrisUrl}
            instagramFilterUrl={qrisData.instagramFilterUrl}
          />
        </FadeIn>
      )}

      {/* ── LIVE WALL (Tier 4) ───────────────────────────────────────────── */}
      {isTier4 && (
        <section className="bg-surface-night px-8 py-12 text-center">
          <FadeIn>
            <a
              href={`/${inv.slug}/live`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-muted-gold/35 px-7 py-3.5 font-sans text-sm text-muted-gold transition hover:bg-muted-gold/10"
            >
              <Tv2 size={15} />
              Live Greeting Wall — Tampilkan di LED Panggung
            </a>
          </FadeIn>
        </section>
      )}

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="relative overflow-hidden bg-surface-night px-8 py-16 text-center">
        <ParangDarkBg opacity={0.1} />
        <FloatingPetals count={4} dark />
        <FadeIn className="relative z-10">
          <FloralSeparator className="opacity-30" />
          <p className="mt-6 font-sans text-[8px] uppercase tracking-[0.55em] text-muted-gold/35">
            With Love
          </p>
          <p className="mt-5 font-serif text-2xl font-light text-primary-cream">
            {shortGroom}{" "}
            <span className="italic text-muted-gold">&amp;</span>{" "}
            {shortBride}
          </p>
          <EditorialRule className="mx-auto mt-7 max-w-[140px] opacity-15" />
          <p className="mt-7 font-sans text-[8px] tracking-[0.4em] text-muted-gold/25">
            Sentuh Undang — Undangan Digital Garut
          </p>
        </FadeIn>
      </footer>
    </div>
  );
}

// ── Hero text block — used both in split-screen & video fallback ──────────────

function HeroText({
  shortGroom,
  shortBride,
  eventDateLabel,
  venueName,
}: {
  shortGroom: string;
  shortBride: string;
  eventDateLabel: string;
  venueName: string;
}) {
  return (
    <div className="w-full max-w-sm text-center">
      <p className="font-sans text-[9px] uppercase tracking-[0.55em] text-wood-brown/80">
        Undangan Pernikahan
      </p>

      <div className="mt-8">
        <h1
          className="font-serif font-light leading-tight text-surface-night"
          style={{ fontSize: "clamp(40px, 10vw, 60px)" }}
        >
          {shortGroom}
        </h1>
        <div className="my-4 flex items-center justify-center gap-5">
          <div className="h-px w-12 bg-muted-gold/80" />
          <span className="font-serif text-2xl italic text-wood-brown">&amp;</span>
          <div className="h-px w-12 bg-muted-gold/80" />
        </div>
        <h1
          className="font-serif font-light leading-tight text-surface-night"
          style={{ fontSize: "clamp(40px, 10vw, 60px)" }}
        >
          {shortBride}
        </h1>
      </div>

      <div className="mt-10 flex flex-col items-center gap-1.5">
        <div className="h-px w-10 bg-muted-gold/60" />
        <p className="font-serif text-sm italic text-wood-brown/85">{eventDateLabel}</p>
        <p className="font-sans text-xs text-wood-brown/80">{venueName}</p>
      </div>
    </div>
  );
}
