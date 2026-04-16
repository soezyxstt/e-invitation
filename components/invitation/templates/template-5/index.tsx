"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, Tv2, Heart } from "lucide-react";
import { CountdownTimer } from "@/components/invitation/countdown-timer";
import { RsvpForm } from "@/components/invitation/rsvp-form";
import { Timeline } from "@/components/invitation/timeline";
import { GuestBook } from "@/components/invitation/guest-book";
import { QrisSection } from "@/components/invitation/qris-section";
import { VideoHero } from "@/components/invitation/video-hero";
import { MapsEmbed } from "@/components/invitation/maps-embed";
import { groomFallback, brideFallback } from "@/lib/portrait-fallback";
import type { InvitationTemplateProps } from "../types";

/**
 * Template 5 — Sepia
 *
 * Palette  : Warm parchment / amber gold / dark umber
 * Aesthetic: Vintage editorial — full-bleed hero with warm amber overlay,
 *            ornate rectangular portrait frames, parchment-textured sections,
 *            and calligraphy-style large numerals for dates.
 * Different from existing templates: portrait cards are rectangular with
 * corner ornaments (not circular), layout is left-aligned editorial,
 * and the warm amber/gold palette is distinct from T1's cream/dark scheme.
 */

// ── Color palette ─────────────────────────────────────────────────────────────
const AMBER   = "#B87333";
const GOLD    = "#D4A853";
const UMBER   = "#3C2415";
const PARCHMENT = "#F2E9DC";
const WARM_WHITE = "#FAF6F0";
const RUST    = "#8B4513";

// ── Ornament: Vintage corner flourish ────────────────────────────────────────

function VintageCorner({ flip = false, invert = false, className = "" }: {
  flip?: boolean; invert?: boolean; className?: string;
}) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={`pointer-events-none select-none ${className}`}
      fill="none"
      aria-hidden="true"
      style={{
        transform: [flip && "scaleX(-1)", invert && "scaleY(-1)"].filter(Boolean).join(" ") || undefined,
      }}
    >
      {/* L-bracket lines */}
      <path d="M2 2 L2 28"   stroke={GOLD} strokeWidth="1.5" opacity="0.7" />
      <path d="M2 2 L28 2"   stroke={GOLD} strokeWidth="1.5" opacity="0.7" />
      {/* Inner bracket lines */}
      <path d="M8 8 L8 22"   stroke={GOLD} strokeWidth="0.7" opacity="0.45" />
      <path d="M8 8 L22 8"   stroke={GOLD} strokeWidth="0.7" opacity="0.45" />
      {/* Corner diamond */}
      <rect x="0" y="0" width="4" height="4" transform="rotate(45 2 2)" fill={GOLD} opacity="0.75" />
      {/* End dots */}
      <circle cx="2"  cy="28" r="1.5" fill={GOLD} opacity="0.6" />
      <circle cx="28" cy="2"  r="1.5" fill={GOLD} opacity="0.6" />
    </svg>
  );
}

// ── Ornament: Vintage rule ────────────────────────────────────────────────────

function VintageRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
      <svg viewBox="0 0 24 12" className="w-6" fill="none" aria-hidden="true">
        <circle cx="12" cy="6" r="3" fill={GOLD} opacity="0.8" />
        <circle cx="12" cy="6" r="1.5" fill={AMBER} opacity="0.9" />
        <path d="M2 6 L8 6"  stroke={GOLD} strokeWidth="1" opacity="0.6" />
        <path d="M16 6 L22 6" stroke={GOLD} strokeWidth="1" opacity="0.6" />
      </svg>
      <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
    </div>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 text-center">
      <p className="text-[9px] uppercase tracking-[0.6em]" style={{ color: AMBER }}>{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-light italic" style={{ color: UMBER }}>{title}</h2>
      <VintageRule className="mt-5 mx-auto max-w-xs" />
    </div>
  );
}

// ── Portrait with ornate frame ────────────────────────────────────────────────

function VintagePortrait({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto" style={{ width: 140, height: 175 }}>
      {/* Ornate corner flourishes */}
      <VintageCorner className="absolute top-0 left-0 w-10 h-10" />
      <VintageCorner flip className="absolute top-0 right-0 w-10 h-10" />
      <VintageCorner invert className="absolute bottom-0 left-0 w-10 h-10" />
      <VintageCorner flip invert className="absolute bottom-0 right-0 w-10 h-10" />

      {/* Portrait image */}
      <div className="absolute inset-5 overflow-hidden rounded-sm" style={{ border: `1px solid ${GOLD}44` }}>
        <Image
          src={src}
          alt={alt}
          fill
          quality={85}
          className="object-cover sepia-15"
          sizes="140px"
        />
      </div>
    </div>
  );
}

// ── Fade-in wrapper ───────────────────────────────────────────────────────────

function Appear({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Template component ────────────────────────────────────────────────────────

export default function Template5({
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
  const groomSrc = groomPortraitUrl ?? groomFallback(inv.groomName);
  const brideSrc = bridePortraitUrl ?? brideFallback(inv.brideName);

  return (
    <div className="w-full" style={{ background: PARCHMENT, color: UMBER, fontFamily: "var(--font-serif)" }}>

      {/* ── Draft banner ──────────────────────────────────────────────────── */}
      {isDraft && (
        <div className="sticky top-0 z-50 bg-amber-400/95 px-4 py-2 text-center text-xs font-medium text-amber-900 backdrop-blur-sm">
          MODE DRAFT — hanya terlihat oleh admin
        </div>
      )}

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      {isTier4 && videoUrl ? (
        <VideoHero videoUrl={videoUrl} fallbackImageUrl={heroUrl}>
          <div className="flex flex-col items-center gap-4 text-center">
            {guestName && <p className="text-xs uppercase tracking-[0.45em] text-white/65">Kepada: {guestName}</p>}
            <p className="text-[10px] uppercase tracking-[0.5em]" style={{ color: GOLD }}>The Wedding of</p>
            <h1 className="text-5xl font-light italic text-white leading-tight">{inv.groomName}</h1>
            <div className="flex items-center gap-2">
              <div className="h-px w-8" style={{ background: GOLD }} />
              <span className="text-sm" style={{ color: GOLD }}>&amp;</span>
              <div className="h-px w-8" style={{ background: GOLD }} />
            </div>
            <h1 className="text-5xl font-light italic text-white leading-tight">{inv.brideName}</h1>
            <p className="text-xs tracking-widest text-white/55 mt-2">{eventDateLabel}</p>
          </div>
        </VideoHero>
      ) : (
        <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden">
          {heroUrl && (
            <>
              <Image
                src={heroUrl}
                alt={coupleName}
                fill
                priority
                quality={85}
                className="object-cover"
                sizes="100vw"
              />
              {/* Warm amber/sepia overlay */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(160deg, rgba(60,36,21,0.72) 0%, rgba(180,115,51,0.45) 50%, rgba(60,36,21,0.85) 100%)" }}
              />
            </>
          )}
          {!heroUrl && (
            <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${UMBER} 0%, ${AMBER} 60%, ${RUST} 100%)` }} />
          )}

          {/* Vintage border frame */}
          <div className="absolute inset-6 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}88, transparent)` }} />
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}88, transparent)` }} />
            <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${GOLD}88, transparent)` }} />
            <div className="absolute right-0 top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${GOLD}88, transparent)` }} />
            <VintageCorner className="absolute top-0 left-0 w-12 h-12" />
            <VintageCorner flip className="absolute top-0 right-0 w-12 h-12" />
            <VintageCorner invert className="absolute bottom-0 left-0 w-12 h-12" />
            <VintageCorner flip invert className="absolute bottom-0 right-0 w-12 h-12" />
          </div>

          <div className="relative z-10 px-10 py-28 text-center">
            {guestName && (
              <Appear>
                <p className="mb-5 text-xs uppercase tracking-[0.45em]" style={{ color: GOLD + "cc" }}>
                  Kepada Yth. {guestName}
                </p>
              </Appear>
            )}
            <Appear delay={0.1}>
              <p className="mb-2 text-[10px] uppercase tracking-[0.55em]" style={{ color: GOLD + "99" }}>
                The Wedding of
              </p>
            </Appear>
            <Appear delay={0.2}>
              <h1 className="text-5xl font-light italic leading-tight text-white sm:text-6xl">
                {inv.groomName}
              </h1>
            </Appear>
            <Appear delay={0.3}>
              <div className="my-3 flex items-center justify-center gap-3">
                <div className="h-px w-12" style={{ background: GOLD + "77" }} />
                <span className="text-xl italic" style={{ color: GOLD }}>&amp;</span>
                <div className="h-px w-12" style={{ background: GOLD + "77" }} />
              </div>
            </Appear>
            <Appear delay={0.4}>
              <h1 className="text-5xl font-light italic leading-tight text-white sm:text-6xl">
                {inv.brideName}
              </h1>
            </Appear>
            <Appear delay={0.52}>
              <VintageRule className="mt-7 mb-5 max-w-xs mx-auto" />
              <p className="text-xs tracking-widest text-white/55">{eventDateLabel}</p>
            </Appear>
          </div>
        </section>
      )}

      {/* ── Opening ───────────────────────────────────────────────────────── */}
      <section className="relative py-20 px-6 text-center overflow-hidden" style={{ background: WARM_WHITE }}>
        {/* Parchment texture lines */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `repeating-linear-gradient(0deg, ${AMBER} 0 1px, transparent 0 32px)` }}
        />
        <Appear className="relative mx-auto max-w-md">
          <p className="mb-4 text-3xl" style={{ color: AMBER }}>﷽</p>
          <p className="text-sm leading-loose font-light italic" style={{ color: UMBER + "bb" }}>
            {inv.openingReligiousText ||
              "Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam tali pernikahan putra-putri kami."}
          </p>
        </Appear>
      </section>

      {/* ── Couple ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: PARCHMENT }}>
        <Appear><SectionHead eyebrow="Mempelai" title="Dua Insan Bersatu" /></Appear>

        <div className="mx-auto max-w-2xl grid grid-cols-1 gap-14 sm:grid-cols-2 sm:gap-8">
          {/* Groom */}
          <Appear delay={0.1} className="flex flex-col items-center gap-5 text-center">
            <VintagePortrait src={groomSrc} alt={inv.groomName} />
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.45em]" style={{ color: AMBER }}>
                {inv.groomChildOrder ?? "Putra"}
              </p>
              <h3 className="text-2xl font-light italic" style={{ color: UMBER }}>{inv.groomName}</h3>
              {inv.groomParentsLine && (
                <p className="mt-1.5 text-xs leading-relaxed font-light" style={{ color: UMBER + "88" }}>
                  {inv.groomParentsLine}
                </p>
              )}
            </div>
          </Appear>

          {/* Bride */}
          <Appear delay={0.2} className="flex flex-col items-center gap-5 text-center">
            <VintagePortrait src={brideSrc} alt={inv.brideName} />
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.45em]" style={{ color: AMBER }}>
                {inv.brideChildOrder ?? "Putri"}
              </p>
              <h3 className="text-2xl font-light italic" style={{ color: UMBER }}>{inv.brideName}</h3>
              {inv.brideParentsLine && (
                <p className="mt-1.5 text-xs leading-relaxed font-light" style={{ color: UMBER + "88" }}>
                  {inv.brideParentsLine}
                </p>
              )}
            </div>
          </Appear>
        </div>
      </section>

      {/* ── Countdown ────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 text-center" style={{ background: UMBER }}>
        <Appear>
          <p className="mb-1 text-[9px] uppercase tracking-[0.55em]" style={{ color: GOLD + "88" }}>Hitung Mundur</p>
          <p className="mb-6 font-light text-sm" style={{ color: GOLD + "bb" }}>{eventDateLabel}</p>
        </Appear>
        <Appear delay={0.1}>
          <CountdownTimer eventDate={inv.eventDate} variant="default" />
        </Appear>
      </section>

      {/* ── Events ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: WARM_WHITE }}>
        <Appear><SectionHead eyebrow="Hari Bahagia" title="Acara Pernikahan" /></Appear>

        <div className="mx-auto max-w-sm space-y-4">
          <Appear
            className="relative rounded-xl border p-6"
            style={{ borderColor: GOLD + "44", background: PARCHMENT }}
          >
            {/* Mini corner flourishes on card */}
            <VintageCorner className="absolute top-3 left-3 w-6 h-6 opacity-60" />
            <VintageCorner flip className="absolute top-3 right-3 w-6 h-6 opacity-60" />

            <div className="space-y-4 pt-2">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Calendar size={13} style={{ color: AMBER }} />
                  <span className="text-[9px] uppercase tracking-widest" style={{ color: AMBER }}>Tanggal</span>
                </div>
                <p className="font-light" style={{ color: UMBER }}>{eventDateLabel}</p>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Clock size={13} style={{ color: AMBER }} />
                  <span className="text-[9px] uppercase tracking-widest" style={{ color: AMBER }}>Waktu</span>
                </div>
                <p className="font-light" style={{ color: UMBER }}>{eventTimeLabel} WIB</p>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <MapPin size={13} style={{ color: AMBER }} />
                  <span className="text-[9px] uppercase tracking-widest" style={{ color: AMBER }}>Lokasi</span>
                </div>
                <p className="font-light" style={{ color: UMBER }}>{inv.venueName}</p>
                {inv.venueAddress && (
                  <p className="mt-0.5 text-xs" style={{ color: UMBER + "77" }}>{inv.venueAddress}</p>
                )}
              </div>
            </div>
            {inv.mapUrl && (
              <div className="mt-5 border-t pt-4" style={{ borderColor: GOLD + "33" }}>
                <a
                  href={inv.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded px-5 py-2 text-xs font-medium text-white"
                  style={{ background: AMBER }}
                >
                  <MapPin size={11} /> Lihat Peta
                </a>
              </div>
            )}
          </Appear>

          {inv.mapUrl && inv.venueName && (
            <Appear delay={0.1}>
              <MapsEmbed mapUrl={inv.mapUrl} venueName={inv.venueName} venueAddress={inv.venueAddress ?? undefined} />
            </Appear>
          )}
        </div>
      </section>

      {/* ── Gallery (Tier 2+) ────────────────────────────────────────────── */}
      {isTier2Plus && galleryImages.length > 0 && (
        <section className="py-16 px-6" style={{ background: PARCHMENT }}>
          <Appear><SectionHead eyebrow="Galeri" title="Kenangan Indah" /></Appear>
          <div className="mx-auto max-w-4xl grid grid-cols-2 sm:grid-cols-3 gap-3">
            {galleryImages.map((img, i) => (
              <Appear key={i} delay={i * 0.055} className="relative aspect-square overflow-hidden rounded-sm" style={{ border: `1px solid ${GOLD}33` }}>
                <Image
                  src={img.url}
                  alt={img.altText ?? `Galeri ${i + 1}`}
                  fill
                  quality={80}
                  className="object-cover transition-transform duration-500 hover:scale-105 sepia-10"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </Appear>
            ))}
          </div>
        </section>
      )}

      {/* ── Timeline (Tier 3+) ───────────────────────────────────────────── */}
      {isTier3Plus && timelineEvents.length > 0 && (
        <section className="py-16 px-6" style={{ background: WARM_WHITE }}>
          <Appear><SectionHead eyebrow="Kisah Kami" title="Love Story" /></Appear>
          <div className="mx-auto max-w-lg">
            <Timeline events={timelineEvents} />
          </div>
        </section>
      )}

      {/* ── RSVP (Tier 3+) ───────────────────────────────────────────────── */}
      {isTier3Plus && (
        <section className="py-16 px-6" style={{ background: PARCHMENT }}>
          <Appear><SectionHead eyebrow="Konfirmasi Hadir" title="RSVP" /></Appear>
          <div className="mx-auto max-w-md">
            <RsvpForm invitationId={inv.id} defaultName={guestName ?? undefined} coupleName={coupleName} />
          </div>
        </section>
      )}

      {/* ── Guest Book (Tier 3+) ─────────────────────────────────────────── */}
      {isTier3Plus && guestBookEntries.length > 0 && (
        <section className="py-16 px-6" style={{ background: WARM_WHITE }}>
          <Appear><SectionHead eyebrow="Pesan & Doa" title="Buku Tamu" /></Appear>
          <div className="mx-auto max-w-lg">
            <GuestBook entries={guestBookEntries} invitationId={inv.id} />
          </div>
        </section>
      )}

      {/* ── QRIS / Bank (Sultan) ─────────────────────────────────────────── */}
      {qrisData && (
        <Appear>
          <QrisSection
            qrisUrl={qrisData.qrisUrl}
            bankName={qrisData.bankName}
            bankAccountNumber={qrisData.bankAccountNumber}
            bankAccountName={qrisData.bankAccountName}
            instagramFilterUrl={qrisData.instagramFilterUrl}
          />
        </Appear>
      )}

      {/* ── Live Wall (Tier 4) ───────────────────────────────────────────── */}
      {isTier4 && (
        <section className="py-12 px-6 text-center" style={{ background: PARCHMENT }}>
          <Appear>
            <Tv2 size={24} style={{ color: AMBER }} className="mx-auto mb-3" />
            <p className="mb-4 font-light text-sm italic" style={{ color: UMBER }}>Kirim doa dan ucapan secara langsung</p>
            <a
              href={`/${inv.slug}/live`}
              className="inline-flex items-center gap-2 rounded px-6 py-3 text-sm font-medium text-white"
              style={{ background: AMBER }}
            >
              Live Greeting Wall ↗
            </a>
          </Appear>
        </section>
      )}

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="relative overflow-hidden py-16 text-center px-6" style={{ background: UMBER }}>
        {/* Vintage border */}
        <div className="pointer-events-none absolute inset-6">
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}66, transparent)` }} />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}66, transparent)` }} />
        </div>
        <div className="relative z-10">
          <p className="mb-2 text-[10px] uppercase tracking-[0.5em]" style={{ color: GOLD + "55" }}>Dengan cinta</p>
          <h2 className="text-3xl font-light italic" style={{ color: GOLD + "dd" }}>{coupleName}</h2>
          <div className="my-4 flex items-center justify-center gap-3">
            <div className="h-px w-10" style={{ background: GOLD + "44" }} />
            <Heart size={11} style={{ color: GOLD + "66" }} fill="currentColor" />
            <div className="h-px w-10" style={{ background: GOLD + "44" }} />
          </div>
          <p className="text-xs" style={{ color: GOLD + "55" }}>{eventDateLabel}</p>
          <p className="mt-8 text-[9px] uppercase tracking-[0.4em]" style={{ color: GOLD + "2a" }}>Sentuh Undang</p>
        </div>
      </footer>
    </div>
  );
}
