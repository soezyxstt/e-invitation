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
 * Template 4 — Botanica
 *
 * Palette  : Sage green / blush rose / warm cream
 * Aesthetic: Fresh garden botanical — circular portraits with floral rings,
 *            hand-drawn SVG branch corners, petal dividers.
 * Different from existing templates by having a pure white/botanical aesthetic
 * with real floral SVG ornaments and a light, airy layout.
 */

// ── Color palette ─────────────────────────────────────────────────────────────
const SAGE   = "#5C8B65";
const BLUSH  = "#C4A090";
const DARK   = "#2A3D2C";
const CREAM  = "#F7F5F0";
const LIGHT  = "#FFFFFF";

// ── Ornament: Botanical corner branch ────────────────────────────────────────

function FloralCorner({ flip = false, className = "" }: { flip?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 110 110"
      className={`pointer-events-none select-none ${className}`}
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M5 105 C30 75 65 40 105 5"   stroke={SAGE} strokeWidth="1.4" opacity="0.6"  />
      <path d="M5 82 C22 65 48 36 78 5"     stroke={SAGE} strokeWidth="0.8" opacity="0.38" />
      <path d="M28 70 Q14 58 22 46 Q38 55 28 70Z" fill={SAGE} opacity="0.5"  />
      <path d="M52 46 Q40 35 48 23 Q62 33 52 46Z" fill={SAGE} opacity="0.45" />
      <path d="M76 22 Q68 13 76 5 Q84 13 76 22Z"  fill={SAGE} opacity="0.40" />
      {/* Bloom */}
      <circle cx="40" cy="60" r="5.5" fill={BLUSH} opacity="0.7" />
      <circle cx="40" cy="60" r="3"   fill={BLUSH} />
      <ellipse cx="40" cy="53.5" rx="2.2" ry="3.8" fill={SAGE} opacity="0.5" />
      <ellipse cx="40" cy="66.5" rx="2.2" ry="3.8" fill={SAGE} opacity="0.5" />
      <ellipse cx="33.5" cy="60" rx="3.8" ry="2.2" fill={SAGE} opacity="0.5" />
      <ellipse cx="46.5" cy="60" rx="3.8" ry="2.2" fill={SAGE} opacity="0.5" />
      {/* Buds */}
      <circle cx="65" cy="30" r="3"   fill={BLUSH} opacity="0.55" />
      <circle cx="88" cy="13" r="2"   fill={BLUSH} opacity="0.45" />
    </svg>
  );
}

// ── Ornament: Petal divider ───────────────────────────────────────────────────

function FloralDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div style={{ height: 1, width: 56, background: SAGE, opacity: 0.38 }} />
      <svg viewBox="0 0 36 20" className="w-9" fill="none" aria-hidden="true">
        <circle cx="18" cy="10" r="4"   fill={BLUSH} opacity="0.7" />
        <circle cx="18" cy="10" r="2.2" fill={BLUSH} />
        <ellipse cx="18" cy="4.8"  rx="1.8" ry="3.2" fill={SAGE} opacity="0.52" />
        <ellipse cx="18" cy="15.2" rx="1.8" ry="3.2" fill={SAGE} opacity="0.52" />
        <ellipse cx="12.8" cy="10" rx="3.2" ry="1.8" fill={SAGE} opacity="0.52" />
        <ellipse cx="23.2" cy="10" rx="3.2" ry="1.8" fill={SAGE} opacity="0.52" />
        <path d="M3 10 Q5 6 8 8 Q7 12 3 10Z"   fill={SAGE} opacity="0.45" />
        <path d="M33 10 Q31 6 28 8 Q29 12 33 10Z" fill={SAGE} opacity="0.45" />
      </svg>
      <div style={{ height: 1, width: 56, background: SAGE, opacity: 0.38 }} />
    </div>
  );
}

// ── Ornament: Floral portrait ring ────────────────────────────────────────────

function FloralRing({ src, alt }: { src: string; alt: string }) {
  const c = 72;
  return (
    <div className="relative mx-auto" style={{ width: 144, height: 144 }}>
      <svg
        viewBox="0 0 144 144"
        className="absolute inset-0 pointer-events-none select-none"
        fill="none"
        aria-hidden="true"
      >
        <circle cx={c} cy={c} r="68"  stroke={SAGE} strokeWidth="1.2" opacity="0.45" />
        <circle cx={c} cy={c} r="60"  stroke={SAGE} strokeWidth="0.5" opacity="0.25" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = ((i * 30) - 90) * (Math.PI / 180);
          const x = c + 65 * Math.cos(a);
          const y = c + 65 * Math.sin(a);
          const r = i % 3 === 0 ? 3.2 : 1.8;
          return <circle key={i} cx={x} cy={y} r={r} fill={i % 3 === 0 ? BLUSH : SAGE} opacity={i % 3 === 0 ? 0.72 : 0.42} />;
        })}
        {/* Cardinal leaf flourishes */}
        <path d={`M${c} 2 Q${c-5} 11 ${c} 19 Q${c+5} 11 ${c} 2Z`}       fill={SAGE} opacity="0.5" />
        <path d={`M${c} 125 Q${c-5} 133 ${c} 142 Q${c+5} 133 ${c} 125Z`} fill={SAGE} opacity="0.5" />
        <path d={`M2 ${c} Q11 ${c-5} 19 ${c} Q11 ${c+5} 2 ${c}Z`}        fill={SAGE} opacity="0.5" />
        <path d={`M125 ${c} Q133 ${c-5} 142 ${c} Q133 ${c+5} 125 ${c}Z`}  fill={SAGE} opacity="0.5" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="overflow-hidden rounded-full" style={{ width: 112, height: 112 }}>
          <Image src={src} alt={alt} width={112} height={112} className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 text-center">
      <p className="text-[9px] uppercase tracking-[0.55em]" style={{ color: SAGE }}>{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-light" style={{ color: DARK }}>{title}</h2>
      <FloralDivider className="mt-5" />
    </div>
  );
}

// ── Fade-in animation wrapper ─────────────────────────────────────────────────

function Appear({
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
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Template component ────────────────────────────────────────────────────────

export default function Template4({
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
    <div className="w-full" style={{ background: CREAM, color: DARK, fontFamily: "var(--font-serif)" }}>

      {/* ── Draft banner ──────────────────────────────────────────────────── */}
      {isDraft && (
        <div className="sticky top-0 z-50 bg-amber-400/95 px-4 py-2 text-center text-xs font-medium text-amber-900 backdrop-blur-sm">
          MODE DRAFT — hanya terlihat oleh admin
        </div>
      )}

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      {isTier4 && videoUrl ? (
        <VideoHero videoUrl={videoUrl} fallbackImageUrl={heroUrl}>
          <div className="flex flex-col items-center gap-3 text-center">
            {guestName && <p className="text-xs uppercase tracking-[0.45em] text-white/70">Kepada: {guestName}</p>}
            <p className="text-xs uppercase tracking-[0.45em]" style={{ color: BLUSH }}>The Wedding of</p>
            <h1 className="text-5xl font-light text-white leading-tight">{inv.groomName}<br /><span className="text-2xl italic" style={{ color: BLUSH }}>&amp;</span><br />{inv.brideName}</h1>
            <p className="text-xs tracking-widest text-white/60 mt-2">{eventDateLabel}</p>
          </div>
        </VideoHero>
      ) : (
        <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden">
          {heroUrl ? (
            <div className="absolute inset-0">
              <Image
                src={heroUrl}
                alt={coupleName}
                fill
                priority
                quality={85}
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(247,245,240,0.6) 0%, rgba(247,245,240,0.2) 50%, rgba(247,245,240,0.8) 100%)" }} />
            </div>
          ) : (
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${CREAM} 0%, #e6efe8 100%)` }} />
          )}

          {/* Botanical corner decorations */}
          <FloralCorner className="absolute top-0 left-0 w-36 h-36 sm:w-52 sm:h-52" />
          <FloralCorner flip className="absolute top-0 right-0 w-36 h-36 sm:w-52 sm:h-52" />
          <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-44 sm:h-44" style={{ transform: "rotate(180deg)" }}>
            <FloralCorner />
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-44 sm:h-44" style={{ transform: "rotate(180deg) scaleX(-1)" }}>
            <FloralCorner />
          </div>

          <div className="relative z-10 px-8 py-28 text-center">
            {guestName && (
              <Appear>
                <p className="mb-5 text-xs uppercase tracking-[0.45em]" style={{ color: SAGE }}>
                  Kepada Yth. {guestName}
                </p>
              </Appear>
            )}
            <Appear delay={0.1}>
              <p className="mb-2 text-[10px] uppercase tracking-[0.5em]" style={{ color: BLUSH }}>
                The Wedding of
              </p>
            </Appear>
            <Appear delay={0.2}>
              <h1 className="text-5xl font-light leading-tight sm:text-6xl" style={{ color: DARK }}>
                {inv.groomName}
                <br />
                <span className="text-2xl italic" style={{ color: BLUSH }}>&amp;</span>
                <br />
                {inv.brideName}
              </h1>
            </Appear>
            <Appear delay={0.38}>
              <FloralDivider className="mt-7 mb-5" />
            </Appear>
            <Appear delay={0.48}>
              <p className="text-xs tracking-widest" style={{ color: SAGE }}>{eventDateLabel}</p>
            </Appear>
          </div>
        </section>
      )}

      {/* ── Opening ───────────────────────────────────────────────────────── */}
      <section className="relative py-20 px-6 text-center overflow-hidden" style={{ background: LIGHT }}>
        {/* Trellis pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, ${SAGE} 0 1px, transparent 0 14px),
                              repeating-linear-gradient(-45deg, ${SAGE} 0 1px, transparent 0 14px)`,
          }}
        />
        <Appear className="relative mx-auto max-w-lg">
          <p className="mb-4 text-3xl" style={{ color: SAGE }}>﷽</p>
          <p className="text-sm leading-loose font-light" style={{ color: DARK + "bb" }}>
            {inv.openingReligiousText ||
              "Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam tali suci pernikahan putra-putri kami."}
          </p>
        </Appear>
      </section>

      {/* ── Couple ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 px-6" style={{ background: CREAM }}>
        <FloralCorner className="absolute top-0 left-0 w-24 h-24 opacity-50" />
        <FloralCorner flip className="absolute top-0 right-0 w-24 h-24 opacity-50" />

        <div className="mx-auto max-w-2xl">
          <Appear><SectionHead eyebrow="Mempelai" title="Bersatunya Dua Hati" /></Appear>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-8">
            {/* Groom */}
            <Appear delay={0.1} className="flex flex-col items-center gap-4 text-center">
              <FloralRing src={groomSrc} alt={inv.groomName} />
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.4em]" style={{ color: BLUSH }}>
                  {inv.groomChildOrder ?? "Putra"}
                </p>
                <h3 className="text-2xl font-light" style={{ color: DARK }}>{inv.groomName}</h3>
                {inv.groomParentsLine && (
                  <p className="mt-1.5 text-xs leading-relaxed font-light" style={{ color: DARK + "88" }}>
                    {inv.groomParentsLine}
                  </p>
                )}
              </div>
            </Appear>

            {/* Bride */}
            <Appear delay={0.2} className="flex flex-col items-center gap-4 text-center">
              <FloralRing src={brideSrc} alt={inv.brideName} />
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.4em]" style={{ color: BLUSH }}>
                  {inv.brideChildOrder ?? "Putri"}
                </p>
                <h3 className="text-2xl font-light" style={{ color: DARK }}>{inv.brideName}</h3>
                {inv.brideParentsLine && (
                  <p className="mt-1.5 text-xs leading-relaxed font-light" style={{ color: DARK + "88" }}>
                    {inv.brideParentsLine}
                  </p>
                )}
              </div>
            </Appear>
          </div>
        </div>
      </section>

      {/* ── Countdown ────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 text-center" style={{ background: SAGE }}>
        <Appear>
          <p className="mb-1 text-[9px] uppercase tracking-[0.5em] text-white/60">Hitung Mundur</p>
          <p className="mb-6 text-sm font-light text-white/80">{eventDateLabel}</p>
        </Appear>
        <Appear delay={0.1}>
          <CountdownTimer eventDate={inv.eventDate} variant="default" />
        </Appear>
      </section>

      {/* ── Events ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: LIGHT }}>
        <Appear><SectionHead eyebrow="Tanggal & Lokasi" title="Acara Pernikahan" /></Appear>

        <div className="mx-auto max-w-sm space-y-4">
          <Appear
            className="rounded-2xl border p-6"
            style={{ borderColor: SAGE + "44", background: CREAM }}
          >
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Calendar size={13} style={{ color: SAGE }} />
                  <span className="text-[9px] uppercase tracking-widest" style={{ color: SAGE }}>Tanggal</span>
                </div>
                <p className="font-light" style={{ color: DARK }}>{eventDateLabel}</p>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Clock size={13} style={{ color: SAGE }} />
                  <span className="text-[9px] uppercase tracking-widest" style={{ color: SAGE }}>Waktu</span>
                </div>
                <p className="font-light" style={{ color: DARK }}>{eventTimeLabel} WIB</p>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <MapPin size={13} style={{ color: SAGE }} />
                  <span className="text-[9px] uppercase tracking-widest" style={{ color: SAGE }}>Lokasi</span>
                </div>
                <p className="font-light" style={{ color: DARK }}>{inv.venueName}</p>
                {inv.venueAddress && (
                  <p className="mt-0.5 text-xs" style={{ color: DARK + "77" }}>{inv.venueAddress}</p>
                )}
              </div>
            </div>
            {inv.mapUrl && (
              <div className="mt-5 border-t pt-4" style={{ borderColor: SAGE + "22" }}>
                <a
                  href={inv.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-medium text-white"
                  style={{ background: SAGE }}
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
        <section className="py-16 px-6" style={{ background: CREAM }}>
          <Appear><SectionHead eyebrow="Galeri" title="Momen Kami" /></Appear>
          <div className="mx-auto max-w-4xl grid grid-cols-2 sm:grid-cols-3 gap-3">
            {galleryImages.map((img, i) => (
              <Appear key={i} delay={i * 0.055} className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={img.url}
                  alt={img.altText ?? `Galeri ${i + 1}`}
                  fill
                  quality={80}
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </Appear>
            ))}
          </div>
        </section>
      )}

      {/* ── Timeline (Tier 3+) ───────────────────────────────────────────── */}
      {isTier3Plus && timelineEvents.length > 0 && (
        <section className="py-16 px-6" style={{ background: LIGHT }}>
          <Appear><SectionHead eyebrow="Kisah Kami" title="Love Story" /></Appear>
          <div className="mx-auto max-w-lg">
            <Timeline events={timelineEvents} />
          </div>
        </section>
      )}

      {/* ── RSVP (Tier 3+) ───────────────────────────────────────────────── */}
      {isTier3Plus && (
        <section className="py-16 px-6" style={{ background: CREAM }}>
          <Appear><SectionHead eyebrow="Konfirmasi Hadir" title="RSVP" /></Appear>
          <div className="mx-auto max-w-md">
            <RsvpForm invitationId={inv.id} defaultName={guestName ?? undefined} coupleName={coupleName} />
          </div>
        </section>
      )}

      {/* ── Guest Book (Tier 3+) ─────────────────────────────────────────── */}
      {isTier3Plus && guestBookEntries.length > 0 && (
        <section className="py-16 px-6" style={{ background: LIGHT }}>
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
        <section className="py-12 px-6 text-center" style={{ background: CREAM }}>
          <Appear>
            <Tv2 size={24} style={{ color: SAGE }} className="mx-auto mb-3" />
            <p className="mb-4 font-light text-sm" style={{ color: DARK }}>Kirim doa dan ucapan secara langsung</p>
            <a
              href={`/${inv.slug}/live`}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white"
              style={{ background: SAGE }}
            >
              Live Greeting Wall ↗
            </a>
          </Appear>
        </section>
      )}

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="relative overflow-hidden py-16 text-center px-6" style={{ background: SAGE }}>
        <div className="absolute bottom-0 left-0 w-28 h-28 opacity-35" style={{ transform: "rotate(180deg)" }}>
          <FloralCorner />
        </div>
        <div className="absolute bottom-0 right-0 w-28 h-28 opacity-35" style={{ transform: "rotate(180deg) scaleX(-1)" }}>
          <FloralCorner />
        </div>
        <div className="relative z-10">
          <p className="mb-2 text-[10px] uppercase tracking-[0.5em] text-white/55">Dengan cinta</p>
          <h2 className="text-3xl font-light text-white">{coupleName}</h2>
          <div className="my-4 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-white/30" />
            <Heart size={11} className="text-white/50" fill="currentColor" />
            <div className="h-px w-10 bg-white/30" />
          </div>
          <p className="text-xs text-white/55">{eventDateLabel}</p>
          <p className="mt-8 text-[9px] uppercase tracking-[0.4em] text-white/25">Sentuh Undang</p>
        </div>
      </footer>
    </div>
  );
}
