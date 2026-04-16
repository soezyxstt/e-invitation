"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Tv2, MapPin, ArrowRight } from "lucide-react";
import { CountdownTimer } from "@/components/invitation/countdown-timer";
import { RsvpForm } from "@/components/invitation/rsvp-form";
import { Timeline } from "@/components/invitation/timeline";
import { GuestBook } from "@/components/invitation/guest-book";
import { QrisSection } from "@/components/invitation/qris-section";
import { VideoHero } from "@/components/invitation/video-hero";
import { MasonryGallery } from "./masonry-gallery";
import { FloatingCouple } from "./floating-couple";
import type { InvitationTemplateProps } from "../types";

/**
 * Template 2 — The Avant-Garde
 *
 * Layout DNA:
 * - Near-black background (surface-night) + rust/burnt-orange accent (accent-ember)
 * - Hero: full-screen photo, GIANT names stacked bottom-left, text × separator
 * - Couple: Two portrait cards physically overlapping at tilt angles (z-index play)
 * - Gallery: Pinterest masonry — each image enters from a DIFFERENT direction
 * - All section headers: raw left-aligned mono label, NO centred ornaments
 * - Animations: x/y/rotate from alternating directions — never just a simple fade
 */

// ── Directional slide-in wrapper ─────────────────────────────────────────────

type SlideDirection = "left" | "right" | "bottom" | "diagonal-left" | "diagonal-right";

const SLIDE_MAP: Record<SlideDirection, { x: number; y: number }> = {
  left: { x: -50, y: 0 },
  right: { x: 50, y: 0 },
  bottom: { x: 0, y: 40 },
  "diagonal-left": { x: -35, y: 30 },
  "diagonal-right": { x: 35, y: -30 },
};

function SlideIn({
  children,
  from = "bottom",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  from?: SlideDirection;
  delay?: number;
  className?: string;
}) {
  const { x, y } = SLIDE_MAP[from];
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.78, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Raw section label ────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <div className="h-[2px] w-7 bg-accent-ember" />
      <p className="font-mono text-[9px] uppercase tracking-[0.65em] text-accent-ember">
        {children}
      </p>
    </div>
  );
}

// ── Noise texture overlay ────────────────────────────────────────────────────

function NoiseOverlay({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}

// ── Template ─────────────────────────────────────────────────────────────────

export default function Template2({
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
  const shortGroom = inv.groomName.split(" ")[0];
  const shortBride = inv.brideName.split(" ")[0];

  return (
    <div className="bg-surface-night font-sans antialiased">
      {isDraft && (
        <div className="sticky top-0 z-50 bg-amber-400 py-1 text-center text-xs font-semibold tracking-wide text-amber-900">
          PRATINJAU — Undangan belum tayang
        </div>
      )}

      {/* ── HERO: Full-screen, names bottom-left, asymmetric ───────────── */}
      {isTier4 && videoUrl ? (
        <VideoHero videoUrl={videoUrl} fallbackImageUrl={heroUrl}>
          <HeroContent
            shortGroom={shortGroom}
            shortBride={shortBride}
            eventDateLabel={eventDateLabel}
            coupleName={coupleName}
          />
        </VideoHero>
      ) : (
        <section className="relative flex min-h-dvh flex-col overflow-hidden">
          {heroUrl ? (
            <>
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.14 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.4, ease: "easeOut" }}
              >
                <Image
                  src={heroUrl}
                  alt={coupleName}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
              {/* Multi-directional vignette — bottom + left heavy */}
              <div className="absolute inset-0 bg-surface-night/25" />
              <div className="absolute inset-0 bg-linear-to-t from-surface-night via-surface-night/45 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-r from-surface-night/65 via-transparent to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-surface-night" />
          )}
          <HeroContent
            shortGroom={shortGroom}
            shortBride={shortBride}
            eventDateLabel={eventDateLabel}
            coupleName={coupleName}
          />
        </section>
      )}

      {/* ── OPENING TEXT: Left-border pull-quote ─────────────────────────── */}
      {inv.openingReligiousText && (
        <section className="relative overflow-hidden border-b border-accent-ember/12 px-6 py-14">
          <NoiseOverlay />
          <SlideIn from="left">
            <div className="flex gap-5">
              <div className="mt-1 w-[3px] shrink-0 self-stretch bg-accent-ember" />
              <div>
                <p className="font-serif text-lg italic leading-relaxed text-primary-cream/95 sm:text-xl">
                  &ldquo;{inv.openingReligiousText}&rdquo;
                </p>
                {inv.basaSundaLemesKey === "sunda_lemes" && (
                  <p className="mt-4 font-mono text-xs leading-relaxed text-wood-brown/90">
                    Kalayan hormat, kami ngondang ka Bapa/Ibu/Saderek sadayana
                    kanggo ngiringan mangsa bingah kami.
                  </p>
                )}
              </div>
            </div>
          </SlideIn>
        </section>
      )}

      {/* ── COUPLE: Floating overlapping cards ───────────────────────────── */}
      <section className="relative overflow-hidden border-b border-accent-ember/12 px-5 py-16">
        <NoiseOverlay opacity={0.025} />
        <SlideIn from="right" className="relative z-10">
          <SectionLabel>The Couple</SectionLabel>
        </SlideIn>
        <div className="relative z-10">
          <FloatingCouple
            groomName={inv.groomName}
            brideName={inv.brideName}
            groomPortraitUrl={groomPortraitUrl}
            bridePortraitUrl={bridePortraitUrl}
            groomChildOrder={inv.groomChildOrder}
            brideChildOrder={inv.brideChildOrder}
            groomParentsLine={inv.groomParentsLine}
            brideParentsLine={inv.brideParentsLine}
          />
        </div>
      </section>

      {/* ── COUNTDOWN: Bold raw numbers ──────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-accent-ember/12 px-6 py-14">
        <NoiseOverlay />
        <SlideIn from="diagonal-left">
          <SectionLabel>Save The Date</SectionLabel>
          <p className="font-serif text-xl font-light text-primary-cream">{eventDateLabel}</p>
          <p className="mt-0.5 font-mono text-xs text-wood-brown/90">{eventTimeLabel} WIB</p>
        </SlideIn>
        <SlideIn from="bottom" delay={0.12} className="mt-8">
          <CountdownTimer eventDate={inv.eventDate} variant="dark" />
        </SlideIn>
      </section>

      {/* ── EVENT DETAILS ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-accent-ember/12 px-6 py-14">
        <NoiseOverlay />
        <SlideIn from="right">
          <SectionLabel>Informasi Acara</SectionLabel>
        </SlideIn>
        <SlideIn from="diagonal-right" delay={0.08}>
          <h3 className="font-serif text-2xl font-light text-primary-cream">
            {inv.venueName}
          </h3>
          {inv.venueAddress && (
            <p className="mt-1.5 font-mono text-xs leading-relaxed text-wood-brown/90">
              {inv.venueAddress}
            </p>
          )}
          <div className="mt-6 flex items-center gap-6">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.45em] text-wood-brown/90">
                Tanggal
              </p>
              <p className="mt-1 font-sans text-sm text-primary-cream/95">{eventDateLabel}</p>
            </div>
            <div className="h-8 w-px bg-accent-ember/20" />
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.45em] text-wood-brown/90">
                Jam
              </p>
              <p className="mt-1 font-sans text-sm text-primary-cream/95">{eventTimeLabel} WIB</p>
            </div>
          </div>
          {inv.mapUrl && (
            <a
              href={inv.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border-b border-accent-ember/40 pb-px font-mono text-xs text-accent-ember transition hover:border-accent-ember hover:text-accent-ember"
            >
              <MapPin size={11} />
              Buka di Google Maps
              <ArrowRight size={11} />
            </a>
          )}
        </SlideIn>
      </section>

      {/* ── GALLERY: Masonry Pinterest (Tier 2+) ─────────────────────────── */}
      {isTier2Plus && galleryImages.length > 0 && (
        <section className="relative overflow-hidden border-b border-accent-ember/12 px-3 py-14 sm:px-4">
          <div className="px-2">
            <SlideIn from="left">
              <SectionLabel>Galeri Kenangan</SectionLabel>
            </SlideIn>
          </div>
          <MasonryGallery images={galleryImages} />
        </section>
      )}

      {/* ── TIMELINE (Tier 3+) ───────────────────────────────────────────── */}
      {isTier3Plus && timelineEvents.length > 0 && (
        <section className="relative overflow-hidden border-b border-accent-ember/12 px-6 py-14">
          <NoiseOverlay />
          <SlideIn from="left">
            <SectionLabel>Perjalanan Cinta</SectionLabel>
          </SlideIn>
          <Timeline events={timelineEvents} />
        </section>
      )}

      {/* ── RSVP ─────────────────────────────────────────────────────────── */}
      {inv.status === "PUBLISHED" && (
        <section className="relative overflow-hidden border-b border-accent-ember/12 bg-deep-charcoal px-6 py-14">
          <NoiseOverlay />
          <SlideIn from="bottom">
            <SectionLabel>Konfirmasi Kehadiran</SectionLabel>
          </SlideIn>
          <div className="mx-auto max-w-sm">
            <RsvpForm
              invitationId={inv.id}
              defaultName={guestName ?? undefined}
              coupleName={coupleName}
            />
          </div>
        </section>
      )}

      {/* ── BUKU TAMU (Tier 3+) ──────────────────────────────────────────── */}
      {isTier3Plus && (
        <section className="relative overflow-hidden border-b border-accent-ember/12 px-6 py-14">
          <NoiseOverlay />
          <SlideIn from="right">
            <SectionLabel>Buku Tamu</SectionLabel>
          </SlideIn>
          <GuestBook entries={guestBookEntries} invitationId={inv.id} />
        </section>
      )}

      {/* ── QRIS (Tier 4) ───────────────────────────────────────────────── */}
      {isTier4 && qrisData && (
        <QrisSection
          qrisUrl={qrisData.qrisUrl}
          bankName={qrisData.bankName}
          bankAccountNumber={qrisData.bankAccountNumber}
          bankAccountName={qrisData.bankAccountName}
          instagramFilterUrl={qrisData.instagramFilterUrl}
        />
      )}

      {/* ── LIVE WALL (Tier 4) ───────────────────────────────────────────── */}
      {isTier4 && (
        <section className="border-b border-accent-ember/12 px-6 py-12 text-center">
          <SlideIn from="bottom">
            <a
              href={`/${inv.slug}/live`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-accent-ember/35 px-7 py-3.5 font-mono text-xs text-accent-ember transition hover:bg-accent-ember/10"
            >
              <Tv2 size={14} />
              Live Greeting Wall
            </a>
          </SlideIn>
        </section>
      )}

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="relative overflow-hidden px-6 py-20">
        <NoiseOverlay opacity={0.04} />
        <SlideIn from="bottom" className="relative z-10 text-center">
          {/* Giant ghosted names */}
          <p
            className="select-none font-serif font-extralight leading-[0.82] text-primary-cream/8"
            style={{ fontSize: "clamp(48px, 16vw, 100px)" }}
          >
            {shortGroom}
          </p>
          <span
            className="block font-serif italic text-accent-ember/40"
            style={{ fontSize: "clamp(32px, 10vw, 64px)" }}
          >
            &times;
          </span>
          <p
            className="select-none font-serif font-extralight leading-[0.82] text-primary-cream/8"
            style={{ fontSize: "clamp(48px, 16vw, 100px)" }}
          >
            {shortBride}
          </p>
          <p className="mt-10 font-mono text-[8px] tracking-[0.55em] text-wood-brown/90">
            SENTUH UNDANG — UNDANGAN DIGITAL GARUT
          </p>
        </SlideIn>
      </footer>
    </div>
  );
}

// ── Hero content overlay ──────────────────────────────────────────────────────

function HeroContent({
  shortGroom,
  shortBride,
  eventDateLabel,
  coupleName,
}: {
  shortGroom: string;
  shortBride: string;
  eventDateLabel: string;
  coupleName: string;
}) {
  return (
    <div className="relative z-10 mt-auto w-full px-6 pb-14 pt-8" aria-label={coupleName}>
      {/* Top micro-label */}
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="font-mono text-[8px] uppercase tracking-[0.6em] text-accent-ember"
      >
        The Wedding of
      </motion.p>

      {/* Giant stacked first names */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-2"
      >
        <h1
          className="font-serif font-extralight leading-[0.82] tracking-tight text-primary-cream"
          style={{ fontSize: "clamp(62px, 22vw, 128px)" }}
        >
          {shortGroom}
        </h1>

        {/* × separator with side lines */}
        <div className="flex items-center gap-2 pl-1 py-1">
          <div className="h-px w-6 bg-accent-ember/50" />
          <span className="font-serif text-lg italic text-accent-ember">&times;</span>
          <div className="h-px w-6 bg-accent-ember/50" />
        </div>

        <h1
          className="font-serif font-extralight leading-[0.82] tracking-tight text-primary-cream"
          style={{ fontSize: "clamp(62px, 22vw, 128px)" }}
        >
          {shortBride}
        </h1>
      </motion.div>

      {/* Date in mono */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.85 }}
        className="mt-6 font-mono text-[9px] uppercase tracking-[0.5em] text-wood-brown/90"
      >
        {eventDateLabel}
      </motion.p>
    </div>
  );
}
