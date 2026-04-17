"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, Tv2, Heart } from "lucide-react";
import { CountdownTimer } from "@/components/invitation/countdown-timer";
import { RsvpForm } from "@/components/invitation/rsvp-form";
import { Timeline } from "@/components/invitation/timeline";
import { GuestBook } from "@/components/invitation/guest-book";
import { QrisSection } from "@/components/invitation/qris-section";
import { WeddingGiftSection } from "@/components/invitation/wedding-gift-section";
import { VideoHero } from "@/components/invitation/video-hero";
import { MapsEmbed } from "@/components/invitation/maps-embed";
import { groomFallback, brideFallback } from "@/lib/portrait-fallback";
import type { InvitationTemplateProps } from "../types";

/**
 * Template 6 — Azura
 *
 * Palette  : Soft sky blue / periwinkle / ivory white
 * Aesthetic: Dreamy romantic — similar in portrait-ring approach to T4 but
 *            with a cool blue botanical palette; hero has a sky-blue tinted
 *            veil overlay; section backgrounds alternate white and ice blue;
 *            text uses cornflower blue accents throughout.
 * Different from T4 (Botanica) by using cool blue tones, different hero layout
 * (full overlay with veil effect), and asymmetric couple section with names
 * displayed inside the ring area.
 */

// ── Color palette ─────────────────────────────────────────────────────────────
const SKY    = "#6B9BB8";
const DEEP   = "#2C4A6E";
const PEARL  = "#A0C4DC";
const IVORY  = "#F5F8FC";
const WHITE  = "#FFFFFF";
const NAVY   = "#1A3050";

// ── Ornament: Azure botanical corner ─────────────────────────────────────────

function AzureCorner({ flip = false, className = "" }: { flip?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`pointer-events-none select-none ${className}`}
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* Primary curved stem */}
      <path d="M4 96 C28 68 60 38 96 4"  stroke={PEARL} strokeWidth="1.4" opacity="0.65" />
      <path d="M4 75 C20 58 44 34 72 4"  stroke={PEARL} strokeWidth="0.8" opacity="0.4"  />
      {/* Leaves */}
      <path d="M25 65 Q12 54 20 42 Q34 52 25 65Z" fill={SKY}   opacity="0.48" />
      <path d="M48 42 Q36 32 44 20 Q58 30 48 42Z"  fill={SKY}   opacity="0.43" />
      <path d="M70 20 Q62 11 70 4 Q78 11 70 20Z"   fill={SKY}   opacity="0.38" />
      {/* Cloud blossom */}
      <circle cx="36" cy="54" r="5.5" fill={PEARL} opacity="0.68" />
      <circle cx="36" cy="54" r="3"   fill={PEARL} />
      <ellipse cx="36" cy="47.8" rx="2" ry="3.5" fill={SKY} opacity="0.5" />
      <ellipse cx="36" cy="60.2" rx="2" ry="3.5" fill={SKY} opacity="0.5" />
      <ellipse cx="29.8" cy="54" rx="3.5" ry="2" fill={SKY} opacity="0.5" />
      <ellipse cx="42.2" cy="54" rx="3.5" ry="2" fill={SKY} opacity="0.5" />
      {/* Buds */}
      <circle cx="60" cy="28" r="3"   fill={PEARL} opacity="0.55" />
      <circle cx="82" cy="12" r="2"   fill={PEARL} opacity="0.45" />
    </svg>
  );
}

// ── Ornament: Azure floral portrait ring (cool blue) ─────────────────────────

function AzureRing({ src, alt }: { src: string; alt: string }) {
  const c = 72;
  return (
    <div className="relative mx-auto" style={{ width: 144, height: 144 }}>
      <svg
        viewBox="0 0 144 144"
        className="absolute inset-0 pointer-events-none select-none"
        fill="none"
        aria-hidden="true"
      >
        {/* Outer glow ring */}
        <circle cx={c} cy={c} r="70"  stroke={PEARL} strokeWidth="2.5" opacity="0.18" />
        <circle cx={c} cy={c} r="67"  stroke={SKY}   strokeWidth="1.2" opacity="0.45" />
        <circle cx={c} cy={c} r="59"  stroke={SKY}   strokeWidth="0.5" opacity="0.22" />
        {/* Dot ring at 12 positions */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = ((i * 30) - 90) * (Math.PI / 180);
          const x = c + 64 * Math.cos(a);
          const y = c + 64 * Math.sin(a);
          const r = i % 3 === 0 ? 3.2 : 1.8;
          return <circle key={i} cx={x} cy={y} r={r} fill={i % 3 === 0 ? PEARL : SKY} opacity={i % 3 === 0 ? 0.72 : 0.42} />;
        })}
        {/* Cardinal leaf flourishes */}
        <path d={`M${c} 2 Q${c-5} 11 ${c} 19 Q${c+5} 11 ${c} 2Z`}       fill={SKY} opacity="0.5" />
        <path d={`M${c} 125 Q${c-5} 133 ${c} 142 Q${c+5} 133 ${c} 125Z`} fill={SKY} opacity="0.5" />
        <path d={`M2 ${c} Q11 ${c-5} 19 ${c} Q11 ${c+5} 2 ${c}Z`}        fill={SKY} opacity="0.5" />
        <path d={`M125 ${c} Q133 ${c-5} 142 ${c} Q133 ${c+5} 125 ${c}Z`}  fill={SKY} opacity="0.5" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="overflow-hidden rounded-full" style={{ width: 112, height: 112 }}>
          <Image src={src} alt={alt} width={112} height={112} className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}

// ── Ornament: Wave divider ────────────────────────────────────────────────────

function WaveDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div style={{ height: 1, width: 52, background: SKY, opacity: 0.38 }} />
      <svg viewBox="0 0 40 18" className="w-10" fill="none" aria-hidden="true">
        <path d="M2 9 Q7 3 12 9 Q17 15 22 9 Q27 3 32 9 Q37 15 38 9"
              stroke={SKY} strokeWidth="1.2" opacity="0.65" />
        <circle cx="20" cy="9" r="2.5" fill={PEARL} opacity="0.8" />
        <circle cx="20" cy="9" r="1.2" fill={SKY} />
      </svg>
      <div style={{ height: 1, width: 52, background: SKY, opacity: 0.38 }} />
    </div>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 text-center">
      <p className="text-[9px] uppercase tracking-[0.55em]" style={{ color: SKY }}>{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-light" style={{ color: DEEP }}>{title}</h2>
      <WaveDivider className="mt-5" />
    </div>
  );
}

// ── Fade-in animation wrapper ─────────────────────────────────────────────────

function Appear({ children, delay = 0, className = "", style }: {
  children: React.ReactNode; delay?: number; className?: string; style?: CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ── Template component ────────────────────────────────────────────────────────

export default function Template6({
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
    <div className="w-full" style={{ background: IVORY, color: DEEP, fontFamily: "var(--font-serif)" }}>

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
            <p className="text-[10px] uppercase tracking-[0.5em]" style={{ color: PEARL }}>The Wedding of</p>
            <h1 className="text-5xl font-light text-white leading-tight">{inv.groomName}<br /><span className="text-2xl italic" style={{ color: PEARL }}>&amp;</span><br />{inv.brideName}</h1>
            <WaveDivider className="mt-5 mb-3" />
            <p className="text-xs tracking-widest text-white/60">{eventDateLabel}</p>
          </div>
        </VideoHero>
      ) : (
        <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden">
          {heroUrl ? (
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
              {/* Sky-blue veil overlay — signature of Azura template */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, rgba(107,155,184,0.45) 0%, rgba(44,74,110,0.25) 50%, rgba(26,48,80,0.75) 100%)",
                }}
              />
            </>
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(160deg, ${DEEP} 0%, ${SKY} 60%, ${PEARL} 100%)` }}
            />
          )}

          {/* Azure botanical corners */}
          <AzureCorner className="absolute top-0 left-0 w-36 h-36 sm:w-52 sm:h-52" />
          <AzureCorner flip className="absolute top-0 right-0 w-36 h-36 sm:w-52 sm:h-52" />
          <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-44 sm:h-44" style={{ transform: "rotate(180deg)" }}>
            <AzureCorner />
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-44 sm:h-44" style={{ transform: "rotate(180deg) scaleX(-1)" }}>
            <AzureCorner />
          </div>

          <div className="relative z-10 px-8 py-28 text-center">
            {guestName && (
              <Appear>
                <p className="mb-5 text-xs uppercase tracking-[0.45em] text-white/70">
                  Kepada Yth. {guestName}
                </p>
              </Appear>
            )}
            <Appear delay={0.1}>
              <p className="mb-2 text-[10px] uppercase tracking-[0.5em]" style={{ color: PEARL + "cc" }}>
                The Wedding of
              </p>
            </Appear>
            <Appear delay={0.2}>
              <h1 className="text-5xl font-light leading-tight text-white sm:text-6xl">
                {inv.groomName}
                <br />
                <span className="text-2xl italic" style={{ color: PEARL }}>&amp;</span>
                <br />
                {inv.brideName}
              </h1>
            </Appear>
            <Appear delay={0.38}>
              <WaveDivider className="mt-7 mb-5" />
            </Appear>
            <Appear delay={0.48}>
              <p className="text-xs tracking-widest text-white/60">{eventDateLabel}</p>
            </Appear>
          </div>
        </section>
      )}

      {/* ── Opening ───────────────────────────────────────────────────────── */}
      <section className="relative py-20 px-6 text-center overflow-hidden" style={{ background: WHITE }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${SKY} 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />
        <Appear className="relative mx-auto max-w-lg">
          <p className="mb-4 text-3xl" style={{ color: SKY }}>﷽</p>
          <p className="text-sm leading-loose font-light" style={{ color: DEEP + "aa" }}>
            {inv.openingReligiousText ||
              "Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam tali suci pernikahan putra-putri kami."}
          </p>
        </Appear>
      </section>

      {/* ── Couple ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 px-6" style={{ background: IVORY }}>
        <AzureCorner className="absolute top-0 left-0 w-20 h-20 opacity-55" />
        <AzureCorner flip className="absolute top-0 right-0 w-20 h-20 opacity-55" />

        <div className="mx-auto max-w-2xl">
          <Appear><SectionHead eyebrow="Mempelai" title="Dua Jiwa Bersatu" /></Appear>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-8">
            {/* Groom */}
            <Appear delay={0.1} className="flex flex-col items-center gap-4 text-center">
              <AzureRing src={groomSrc} alt={inv.groomName} />
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.4em]" style={{ color: SKY }}>
                  {inv.groomChildOrder ?? "Putra"}
                </p>
                <h3 className="text-2xl font-light" style={{ color: DEEP }}>{inv.groomName}</h3>
                {inv.groomParentsLine && (
                  <p className="mt-1.5 text-xs leading-relaxed font-light" style={{ color: DEEP + "88" }}>
                    {inv.groomParentsLine}
                  </p>
                )}
              </div>
            </Appear>

            {/* Bride */}
            <Appear delay={0.2} className="flex flex-col items-center gap-4 text-center">
              <AzureRing src={brideSrc} alt={inv.brideName} />
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.4em]" style={{ color: SKY }}>
                  {inv.brideChildOrder ?? "Putri"}
                </p>
                <h3 className="text-2xl font-light" style={{ color: DEEP }}>{inv.brideName}</h3>
                {inv.brideParentsLine && (
                  <p className="mt-1.5 text-xs leading-relaxed font-light" style={{ color: DEEP + "88" }}>
                    {inv.brideParentsLine}
                  </p>
                )}
              </div>
            </Appear>
          </div>
        </div>
      </section>

      {/* ── Countdown ────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 text-center" style={{ background: DEEP }}>
        <Appear>
          <p className="mb-1 text-[9px] uppercase tracking-[0.5em] text-white/55">Hitung Mundur</p>
          <p className="mb-6 font-light text-sm text-white/70">{eventDateLabel}</p>
        </Appear>
        <Appear delay={0.1}>
          <CountdownTimer eventDate={inv.eventDate} variant="default" />
        </Appear>
      </section>

      {/* ── Events ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: WHITE }}>
        <Appear><SectionHead eyebrow="Tanggal & Lokasi" title="Acara Pernikahan" /></Appear>

        <div className="mx-auto max-w-sm space-y-4">
          <Appear
            className="rounded-2xl border p-6"
            style={{ borderColor: SKY + "44", background: IVORY }}
          >
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Calendar size={13} style={{ color: SKY }} />
                  <span className="text-[9px] uppercase tracking-widest" style={{ color: SKY }}>Tanggal</span>
                </div>
                <p className="font-light" style={{ color: DEEP }}>{eventDateLabel}</p>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Clock size={13} style={{ color: SKY }} />
                  <span className="text-[9px] uppercase tracking-widest" style={{ color: SKY }}>Waktu</span>
                </div>
                <p className="font-light" style={{ color: DEEP }}>{eventTimeLabel} WIB</p>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <MapPin size={13} style={{ color: SKY }} />
                  <span className="text-[9px] uppercase tracking-widest" style={{ color: SKY }}>Lokasi</span>
                </div>
                <p className="font-light" style={{ color: DEEP }}>{inv.venueName}</p>
                {inv.venueAddress && (
                  <p className="mt-0.5 text-xs" style={{ color: DEEP + "77" }}>{inv.venueAddress}</p>
                )}
              </div>
            </div>
            {inv.mapUrl && (
              <div className="mt-5 border-t pt-4" style={{ borderColor: SKY + "22" }}>
                <a
                  href={inv.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-medium text-white"
                  style={{ background: SKY }}
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
        <section className="py-16 px-6" style={{ background: IVORY }}>
          <Appear><SectionHead eyebrow="Galeri" title="Momen Indah" /></Appear>
          <div className="mx-auto max-w-4xl grid grid-cols-2 sm:grid-cols-3 gap-3">
            {galleryImages.map((img, i) => (
              <Appear key={i} delay={i * 0.055} className="relative aspect-square overflow-hidden rounded-xl" style={{ border: `1px solid ${SKY}22` }}>
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
        <section className="py-16 px-6" style={{ background: WHITE }}>
          <Appear><SectionHead eyebrow="Kisah Kami" title="Love Story" /></Appear>
          <div className="mx-auto max-w-lg">
            <Timeline events={timelineEvents} />
          </div>
        </section>
      )}

      {/* ── RSVP (Tier 3+) ───────────────────────────────────────────────── */}
      {isTier3Plus && (
        <section className="py-16 px-6" style={{ background: IVORY }}>
          <Appear><SectionHead eyebrow="Konfirmasi Hadir" title="RSVP" /></Appear>
          <div className="mx-auto max-w-md">
            <RsvpForm invitationId={inv.id} defaultName={guestName ?? undefined} coupleName={coupleName} />
          </div>
        </section>
      )}

      {/* ── Guest Book (Tier 3+) ─────────────────────────────────────────── */}
      {isTier3Plus && guestBookEntries.length > 0 && (
        <section className="py-16 px-6" style={{ background: WHITE }}>
          <Appear><SectionHead eyebrow="Pesan & Doa" title="Buku Tamu" /></Appear>
          <div className="mx-auto max-w-lg">
            <GuestBook entries={guestBookEntries} invitationId={inv.id} />
          </div>
        </section>
      )}

      {/* ── QRIS / Bank (Sultan) ─────────────────────────────────────────── */}
      {isTier4 && qrisData && (
        <Appear>
          <WeddingGiftSection
            bankName={qrisData.bankName}
            bankAccountNumber={qrisData.bankAccountNumber}
            bankAccountName={qrisData.bankAccountName}
          />
          <QrisSection
            qrisUrl={qrisData.qrisUrl}
            instagramFilterUrl={qrisData.instagramFilterUrl}
          />
        </Appear>
      )}

      {/* ── Live Wall (Tier 4) ───────────────────────────────────────────── */}
      {isTier4 && (
        <section className="py-12 px-6 text-center" style={{ background: IVORY }}>
          <Appear>
            <Tv2 size={24} style={{ color: SKY }} className="mx-auto mb-3" />
            <p className="mb-4 font-light text-sm" style={{ color: DEEP }}>Kirim doa dan ucapan secara langsung</p>
            <a
              href={`/${inv.slug}/live`}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white"
              style={{ background: SKY }}
            >
              Live Greeting Wall ↗
            </a>
          </Appear>
        </section>
      )}

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="relative overflow-hidden py-16 text-center px-6" style={{ background: DEEP }}>
        <div className="absolute bottom-0 left-0 w-28 h-28 opacity-30" style={{ transform: "rotate(180deg)" }}>
          <AzureCorner />
        </div>
        <div className="absolute bottom-0 right-0 w-28 h-28 opacity-30" style={{ transform: "rotate(180deg) scaleX(-1)" }}>
          <AzureCorner />
        </div>
        <div className="relative z-10">
          <p className="mb-2 text-[10px] uppercase tracking-[0.5em] text-white/50">Dengan cinta</p>
          <h2 className="text-3xl font-light text-white">{coupleName}</h2>
          <div className="my-4 flex items-center justify-center gap-3">
            <div className="h-px w-10" style={{ background: PEARL + "55" }} />
            <Heart size={11} style={{ color: PEARL + "66" }} fill="currentColor" />
            <div className="h-px w-10" style={{ background: PEARL + "55" }} />
          </div>
          <p className="text-xs" style={{ color: PEARL + "66" }}>{eventDateLabel}</p>
          <p className="mt-8 text-[9px] uppercase tracking-[0.4em] text-white/20">Sentuh Undang</p>
        </div>
      </footer>
    </div>
  );
}
