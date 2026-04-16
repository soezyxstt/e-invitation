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
import {
  BatikCornerGroup,
  FloatingPetals,
  CloudLayer,
  WavyBatikEdge,
} from "@/components/invitation/ornament";
import {
  KawungBg,
  LerengBg,
  ParangDarkBg,
} from "@/components/invitation/pattern-bg";
import { MasonryGallery } from "./masonry-gallery";
import { FloatingCouple } from "./floating-couple";
import { getFirstName } from "@/lib/name-utils";
import type { InvitationTemplateProps } from "../types";

/**
 * Template 2 — The Avant-Garde
 *
 * Layout DNA:
 * - Cream/ivory canvas + royal emerald accent (sage-green) + champagne gold (muted-gold)
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
      <div className="h-[2px] w-7 bg-sage-green" />
      <p className="font-mono text-[9px] uppercase tracking-[0.65em] text-sage-green">
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
  const shortGroom = getFirstName(inv.groomName);
  const shortBride = getFirstName(inv.brideName);

  return (
    <div className="bg-primary-cream font-sans antialiased">
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
              <div className="absolute inset-0 bg-deep-charcoal/20" />
              <div className="absolute inset-0 bg-linear-to-t from-deep-charcoal/90 via-deep-charcoal/40 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-r from-deep-charcoal/55 via-transparent to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-deep-charcoal via-sage-green/80 to-deep-charcoal" />
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
        <section className="relative overflow-hidden border-b border-sage-green/20 px-6 py-14">
          <NoiseOverlay />
          <KawungBg opacity={0.035} />
          <BatikCornerGroup />
          <FloatingPetals count={3} />
          <SlideIn from="left" className="relative z-10">
            <div className="flex gap-5">
              <div className="mt-1 w-[3px] shrink-0 self-stretch bg-sage-green" />
              <div>
                <p className="font-serif text-lg italic leading-relaxed text-deep-charcoal sm:text-xl">
                  &ldquo;{inv.openingReligiousText}&rdquo;
                </p>
                {inv.basaSundaLemesKey === "sunda_lemes" && (
                  <p className="mt-4 font-mono text-xs leading-relaxed text-wood-brown">
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
      <section className="relative overflow-hidden border-b border-sage-green/20 px-5 py-16">
        <NoiseOverlay opacity={0.025} />
        <LerengBg opacity={0.04} />
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
      <section className="relative overflow-hidden border-b border-sage-green/20 px-6 py-14">
        <NoiseOverlay />
        <ParangDarkBg opacity={0.06} />
        <CloudLayer position="top" opacity={0.07} />
        <FloatingPetals count={4} />
        <SlideIn from="diagonal-left" className="relative z-10">
          <SectionLabel>Save The Date</SectionLabel>
          <p className="font-serif text-xl font-light text-deep-charcoal">{eventDateLabel}</p>
          <p className="mt-0.5 font-mono text-xs text-wood-brown">{eventTimeLabel} WIB</p>
        </SlideIn>
        <SlideIn from="bottom" delay={0.12} className="relative z-10 mt-8">
          <CountdownTimer eventDate={inv.eventDate} variant="dark" />
        </SlideIn>
        <CloudLayer position="bottom" opacity={0.05} />
      </section>

      {/* ── EVENT DETAILS ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-sage-green/20 px-6 py-14">
        <NoiseOverlay />
        <KawungBg opacity={0.03} />
        <SlideIn from="right" className="relative z-10">
          <SectionLabel>Informasi Acara</SectionLabel>
        </SlideIn>
        <SlideIn from="diagonal-right" delay={0.08} className="relative z-10">
          <h3 className="font-serif text-2xl font-light text-deep-charcoal">
            {inv.venueName}
          </h3>
          {inv.venueAddress && (
            <p className="mt-1.5 font-mono text-xs leading-relaxed text-wood-brown">
              {inv.venueAddress}
            </p>
          )}
          <div className="mt-6 flex items-center gap-6">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.45em] text-wood-brown">
                Tanggal
              </p>
              <p className="mt-1 font-sans text-sm text-deep-charcoal">{eventDateLabel}</p>
            </div>
            <div className="h-8 w-px bg-sage-green/30" />
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.45em] text-wood-brown">
                Jam
              </p>
              <p className="mt-1 font-sans text-sm text-deep-charcoal">{eventTimeLabel} WIB</p>
            </div>
          </div>
          {inv.mapUrl && (
            <a
              href={inv.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border-b border-sage-green/40 pb-px font-mono text-xs text-sage-green transition hover:border-sage-green hover:text-sage-green"
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
        <section className="relative overflow-hidden border-b border-sage-green/20 px-3 py-14 sm:px-4">
          <div className="px-2">
            <SlideIn from="left" className="relative z-10">
              <SectionLabel>Galeri Kenangan</SectionLabel>
            </SlideIn>
          </div>
          <MasonryGallery images={galleryImages} />
        </section>
      )}

      {/* ── TIMELINE (Tier 3+) ───────────────────────────────────────────── */}
      {isTier3Plus && timelineEvents.length > 0 && (
        <section className="relative overflow-hidden border-b border-sage-green/20 px-6 py-14">
          <NoiseOverlay />
          <LerengBg opacity={0.04} />
          <SlideIn from="left" className="relative z-10">
            <SectionLabel>Perjalanan Cinta</SectionLabel>
          </SlideIn>
          <Timeline events={timelineEvents} />
        </section>
      )}

      {/* ── RSVP ─────────────────────────────────────────────────────────── */}
      {inv.status === "PUBLISHED" && (
        <section className="relative overflow-hidden border-b border-sage-green/20 bg-sage-green/8 px-6 py-14">
          <NoiseOverlay />
          <BatikCornerGroup />
          <SlideIn from="bottom" className="relative z-10">
            <SectionLabel>Konfirmasi Kehadiran</SectionLabel>
          </SlideIn>
          <div className="relative z-10 mx-auto max-w-sm">
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
        <section className="relative overflow-hidden border-b border-sage-green/20 px-6 py-14">
          <NoiseOverlay />
          <KawungBg opacity={0.03} />
          <SlideIn from="right" className="relative z-10">
            <SectionLabel>Buku Tamu</SectionLabel>
          </SlideIn>
          <GuestBook entries={guestBookEntries} invitationId={inv.id} />
        </section>
      )}

      {/* ── WAVY ORNAMENT ────────────────────────────────────────────────── */}
      <WavyBatikEdge />

      {/* ── AMPLOP DIGITAL / QRIS ─────────────────────────────────────────── */}
      {qrisData && (
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
        <section className="border-b border-sage-green/20 px-6 py-12 text-center">
          <SlideIn from="bottom">
            <a
              href={`/${inv.slug}/live`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-sage-green/35 px-7 py-3.5 font-mono text-xs text-sage-green transition hover:bg-sage-green/10"
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
        <ParangDarkBg opacity={0.06} />
        <FloatingPetals count={3} />
        <SlideIn from="bottom" className="relative z-10 text-center">
          {/* Giant ghosted names */}
          <p
            className="select-none font-serif font-extralight leading-[0.82] text-deep-charcoal/6"
            style={{ fontSize: "clamp(48px, 16vw, 100px)" }}
          >
            {shortGroom}
          </p>
          <span
            className="block font-serif italic text-muted-gold/50"
            style={{ fontSize: "clamp(32px, 10vw, 64px)" }}
          >
            &times;
          </span>
          <p
            className="select-none font-serif font-extralight leading-[0.82] text-deep-charcoal/6"
            style={{ fontSize: "clamp(48px, 16vw, 100px)" }}
          >
            {shortBride}
          </p>
          <p className="mt-10 font-mono text-[8px] tracking-[0.55em] text-deep-charcoal/45">
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
        className="font-mono text-[8px] uppercase tracking-[0.6em] text-muted-gold"
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
        <div className="flex items-center gap-2 py-1 pl-1">
          <div className="h-px w-6 bg-muted-gold/60" />
          <span className="font-serif text-lg italic text-muted-gold">&times;</span>
          <div className="h-px w-6 bg-muted-gold/60" />
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
        className="mt-6 font-mono text-[9px] uppercase tracking-[0.5em] text-primary-cream/70"
      >
        {eventDateLabel}
      </motion.p>
    </div>
  );
}
