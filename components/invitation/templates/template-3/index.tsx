"use client";

import { motion } from "framer-motion";
import { Tv2 } from "lucide-react";
import { CountdownTimer } from "@/components/invitation/countdown-timer";
import { RsvpForm } from "@/components/invitation/rsvp-form";
import { Timeline } from "@/components/invitation/timeline";
import { GuestBook } from "@/components/invitation/guest-book";
import { QrisSection } from "@/components/invitation/qris-section";
import { ScrollyGallery } from "./scrolly-gallery";
import { HoverPortrait } from "./hover-portrait";
import type { InvitationTemplateProps } from "../types";

/**
 * Template 3 — The Minimalist Storybook
 *
 * Layout DNA:
 * - Parchment palette (primary-cream, deep-charcoal) + sage green accent
 * - Hero: NO photo. Pure typography on grainy paper texture.
 *   Staggered fade-in — each word appears 300 ms after the last.
 * - Couple: Giant name text only. Photo hidden — appears ONLY when tapped.
 * - Gallery: Full-viewport-height vertical stack (scrollytelling).
 *   One photo per screen, covers 88dvh.
 * - Whitespace: Maximum. Sections breathe.
 * - Animations: Staggered container + very slow/smooth item transitions.
 */

// ── Grainy paper texture overlay ─────────────────────────────────────────────

function GrainOverlay({ opacity = 0.07 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='350' height='350'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='350' height='350' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}

// ── Stagger container + item variants ────────────────────────────────────────

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.28,
      delayChildren: 0.15,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

// ── Fade-up for body sections (slower than usual) ────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.1, delay, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Minimal section label in sage ────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[8px] uppercase tracking-[0.65em] text-sage-green">
      {children}
    </p>
  );
}

// ── Thin sage line ────────────────────────────────────────────────────────────

function SageLine({ className = "" }: { className?: string }) {
  return <div className={`h-px w-12 bg-sage-green/40 ${className}`} />;
}

// ── Template ─────────────────────────────────────────────────────────────────

export default function Template3({
  inv,
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
    <div className="min-h-screen bg-primary-cream/92 font-sans antialiased">
      {isDraft && (
        <div className="sticky top-0 z-40 bg-amber-400 py-1 text-center text-xs font-semibold tracking-wide text-amber-900">
          PRATINJAU — Undangan belum tayang
        </div>
      )}

      {/* ── HERO: Typography only on grainy paper ────────────────────────── */}
      <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-primary-cream/88 px-8 py-24">
        <GrainOverlay opacity={0.09} />

        {/* Giant watermark initials — static, behind content */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
          aria-hidden="true"
        >
          <span
            className="font-serif font-extralight text-deep-charcoal/[0.04]"
            style={{ fontSize: "clamp(180px, 55vw, 360px)" }}
          >
            {shortGroom[0]}&amp;{shortBride[0]}
          </span>
        </div>

        {/* Staggered text reveal — slow, one element at a time */}
        <motion.div
          className="relative z-10 text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={staggerItem}
            className="font-mono text-[8px] uppercase tracking-[0.7em] text-wood-brown/65"
          >
            Undangan Pernikahan
          </motion.p>

          <motion.div variants={staggerItem} className="mt-10">
            <h1
              className="font-serif font-extralight leading-none text-deep-charcoal"
              style={{ fontSize: "clamp(48px, 13vw, 80px)" }}
            >
              {shortGroom}
            </h1>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="my-5 flex items-center justify-center gap-6"
          >
            <SageLine />
            <span className="font-serif text-xl italic text-sage-green">&amp;</span>
            <SageLine />
          </motion.div>

          <motion.div variants={staggerItem}>
            <h1
              className="font-serif font-extralight leading-none text-deep-charcoal"
              style={{ fontSize: "clamp(48px, 13vw, 80px)" }}
            >
              {shortBride}
            </h1>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="mt-12 flex flex-col items-center gap-2"
          >
            <SageLine />
            <p className="font-serif text-sm italic text-wood-brown/78">{eventDateLabel}</p>
            <p className="font-mono text-[9px] tracking-wider text-wood-brown/65">
              {inv.venueName}
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <div className="h-12 w-px bg-linear-to-b from-transparent to-sage-green/35" />
        </motion.div>
      </section>

      {/* ── OPENING TEXT ──────────────────────────────────────────────────── */}
      {inv.openingReligiousText && (
        <section className="relative overflow-hidden bg-primary-cream/92 px-8 py-20">
          <GrainOverlay opacity={0.06} />
          <FadeUp className="relative z-10 mx-auto max-w-xs text-center">
            <Label>Bismillah</Label>
            <div className="my-5 h-px bg-sage-green/20" />
            <p className="font-serif text-base italic leading-loose text-deep-charcoal/88">
              &ldquo;{inv.openingReligiousText}&rdquo;
            </p>
            {inv.basaSundaLemesKey === "sunda_lemes" && (
              <p className="mt-5 font-sans text-xs leading-relaxed text-wood-brown/65">
                Kalayan hormat, kami ngondang ka Bapa/Ibu/Saderek sadayana
                kanggo ngiringan mangsa bingah kami.
              </p>
            )}
          </FadeUp>
        </section>
      )}

      {/* ── COUPLE: Giant names, photo hidden until tapped ───────────────── */}
      <section className="relative overflow-hidden bg-primary-cream/88 px-8 py-20">
        <GrainOverlay opacity={0.07} />
        <div className="relative z-10 mx-auto max-w-sm">
          <FadeUp>
            <Label>Mempelai</Label>
            <div className="my-4 h-px bg-sage-green/20" />
          </FadeUp>

          {/* Mempelai Pria */}
          <FadeUp delay={0.1}>
            <HoverPortrait
              name={inv.groomName}
              portraitUrl={groomPortraitUrl}
              label="Mempelai Pria"
              childOrder={inv.groomChildOrder}
              parentsLine={inv.groomParentsLine}
            />
          </FadeUp>

          {/* Ampersand spacer */}
          <FadeUp delay={0.2}>
            <div className="flex items-center justify-center gap-6 py-4">
              <SageLine />
              <span className="font-serif text-2xl italic text-sage-green/60">&amp;</span>
              <SageLine />
            </div>
          </FadeUp>

          {/* Mempelai Wanita */}
          <FadeUp delay={0.3}>
            <HoverPortrait
              name={inv.brideName}
              portraitUrl={bridePortraitUrl}
              label="Mempelai Wanita"
              childOrder={inv.brideChildOrder}
              parentsLine={inv.brideParentsLine}
            />
          </FadeUp>
        </div>
      </section>

      {/* ── SAVE THE DATE ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary-cream/92 px-8 py-20">
        <GrainOverlay opacity={0.06} />
        <div className="relative z-10 mx-auto max-w-sm">
          <FadeUp>
            <Label>Save The Date</Label>
            <div className="my-4 h-px bg-sage-green/20" />
            <p className="font-serif text-xl font-extralight text-deep-charcoal">
              {eventDateLabel}
            </p>
            <p className="mt-1 font-mono text-[9px] text-wood-brown/65">{eventTimeLabel} WIB</p>
          </FadeUp>
          <FadeUp delay={0.12} className="mt-10">
            <CountdownTimer eventDate={inv.eventDate} />
          </FadeUp>
        </div>
      </section>

      {/* ── EVENT DETAILS ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary-cream/88 px-8 py-20">
        <GrainOverlay opacity={0.07} />
        <div className="relative z-10 mx-auto max-w-sm space-y-5">
          <FadeUp>
            <Label>Informasi Acara</Label>
            <div className="my-4 h-px bg-sage-green/20" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-serif text-xl font-extralight text-deep-charcoal">
              {inv.venueName}
            </p>
            {inv.venueAddress && (
              <p className="mt-1.5 font-sans text-sm leading-relaxed text-wood-brown/78">
                {inv.venueAddress}
              </p>
            )}
          </FadeUp>
          {inv.mapUrl && (
            <FadeUp delay={0.2}>
              <a
                href={inv.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.4em] text-sage-green underline-offset-4 hover:underline"
              >
                Lihat di Peta →
              </a>
            </FadeUp>
          )}
        </div>
      </section>

      {/* ── GALLERY: Scrollytelling full-width (Tier 2+) ─────────────────── */}
      {isTier2Plus && galleryImages.length > 0 && (
        <section className="bg-deep-charcoal">
          {/* Label above gallery */}
          <FadeUp className="px-8 py-10">
            <p className="font-mono text-[8px] uppercase tracking-[0.65em] text-sage-green">
              Galeri Kenangan
            </p>
          </FadeUp>
          <ScrollyGallery images={galleryImages} />
          <div className="h-12 bg-deep-charcoal" />
        </section>
      )}

      {/* ── TIMELINE (Tier 3+) ────────────────────────────────────────────── */}
      {isTier3Plus && timelineEvents.length > 0 && (
        <section className="relative overflow-hidden bg-primary-cream/92 px-8 py-20">
          <GrainOverlay opacity={0.06} />
          <div className="relative z-10 mx-auto max-w-sm">
            <FadeUp>
              <Label>Perjalanan Cinta</Label>
              <div className="my-4 h-px bg-sage-green/20" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <Timeline events={timelineEvents} />
            </FadeUp>
          </div>
        </section>
      )}

      {/* ── RSVP ─────────────────────────────────────────────────────────── */}
      {inv.status === "PUBLISHED" && (
        <section className="relative overflow-hidden bg-primary-cream/88 px-8 py-20">
          <GrainOverlay opacity={0.07} />
          <div className="relative z-10 mx-auto max-w-sm">
            <FadeUp>
              <Label>Konfirmasi Kehadiran</Label>
              <div className="my-4 h-px bg-sage-green/20" />
              <p className="mb-8 font-sans text-sm leading-relaxed text-wood-brown/78">
                Mohon konfirmasi kehadiran Anda sebelum hari-H agar kami dapat
                mempersiapkan segalanya dengan baik.
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <RsvpForm
                invitationId={inv.id}
                defaultName={guestName ?? undefined}
                coupleName={coupleName}
              />
            </FadeUp>
          </div>
        </section>
      )}

      {/* ── BUKU TAMU (Tier 3+) ──────────────────────────────────────────── */}
      {isTier3Plus && (
        <section className="relative overflow-hidden bg-primary-cream/92 px-8 py-20">
          <GrainOverlay opacity={0.06} />
          <div className="relative z-10 mx-auto max-w-sm">
            <FadeUp>
              <Label>Buku Tamu</Label>
              <div className="my-4 h-px bg-sage-green/20" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <GuestBook entries={guestBookEntries} invitationId={inv.id} />
            </FadeUp>
          </div>
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
        <section className="relative overflow-hidden bg-primary-cream/88 px-8 py-14 text-center">
          <GrainOverlay opacity={0.07} />
          <FadeUp className="relative z-10">
            <a
              href={`/${inv.slug}/live`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-sage-green/35 px-7 py-3.5 font-mono text-[9px] uppercase tracking-[0.4em] text-sage-green transition hover:bg-sage-green/8"
            >
              <Tv2 size={13} />
              Live Greeting Wall
            </a>
          </FadeUp>
        </section>
      )}

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="relative overflow-hidden bg-primary-cream/88 px-8 py-20 text-center">
        <GrainOverlay opacity={0.09} />
        <FadeUp className="relative z-10">
          {/* Minimal closing typography */}
          <SageLine className="mx-auto" />
          <p className="mt-8 font-serif font-extralight text-deep-charcoal"
            style={{ fontSize: "clamp(22px, 6vw, 36px)" }}>
            {shortGroom}
            <span className="mx-4 font-serif italic text-sage-green">&amp;</span>
            {shortBride}
          </p>
          <SageLine className="mx-auto mt-8" />
          <p className="mt-8 font-mono text-[7px] tracking-[0.55em] text-wood-brown/65">
            SENTUH UNDANG — UNDANGAN DIGITAL GARUT
          </p>
        </FadeUp>
      </footer>
    </div>
  );
}
