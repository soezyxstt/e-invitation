"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { getFirstName } from "@/lib/name-utils";

interface CoverOverlayProps {
  groomName: string;
  brideName: string;
  heroImageUrl: string | null;
  guestName: string | null;
  eventDateLabel: string;
  onOpen: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  };
}

export function CoverOverlay({
  groomName,
  brideName,
  heroImageUrl,
  guestName,
  eventDateLabel,
  onOpen,
}: CoverOverlayProps) {
  const [pressed, setPressed] = useState(false);

  const shortGroom = getFirstName(groomName);
  const shortBride = getFirstName(brideName);

  function handleOpen() {
    if (pressed) return;
    setPressed(true);
    setTimeout(onOpen, 200);
  }

  return (
    <motion.div
      key="cover"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 1.1, ease: EASE }}
      className="fixed inset-0 z-50 overflow-hidden bg-surface-night"
    >
      {/* ── Hero image ─────────────────────────────────────────────────────── */}
      {heroImageUrl ? (
        <div className="absolute inset-0">
          <Image
            src={heroImageUrl}
            alt={`${groomName} & ${brideName}`}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.65]"
          />
        </div>
      ) : (
        <div className="cover-hero-fallback absolute inset-0" />
      )}

      {/* ── Cinematic gradient layers ───────────────────────────────────── */}
      <div className="cover-vignette-top absolute inset-0" />
      <div className="cover-vignette-bottom absolute inset-0" />
      <div className="cover-vignette-left absolute inset-0" />
      <div className="cover-vignette-right absolute inset-0" />

      {/* ── Desktop theater side panels ─────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[calc((100%-500px)/2)] bg-surface-night/75 backdrop-blur-md lg:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[calc((100%-500px)/2)] bg-surface-night/75 backdrop-blur-md lg:block" />

      {/* ── Main content ────────────────────────────────────────────────── */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between px-8 lg:mx-auto lg:max-w-[500px]">

        {/* Top: Botanical crown + label */}
        <div className="flex flex-col items-center gap-3 pt-14">
          <motion.div {...fadeUp(0.2)} className="w-full max-w-[280px]">
            <BotanicalCrown />
          </motion.div>
          <motion.p
            {...fadeUp(0.35)}
            className="font-sans text-[9px] uppercase tracking-[0.55em] text-muted-gold/60"
          >
            Undangan Pernikahan
          </motion.p>
        </div>

        {/* Middle: Couple names */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <motion.p
            {...fadeUp(0.45)}
            className="font-sans text-[10px] uppercase tracking-[0.48em] text-muted-gold/50"
          >
            The Wedding of
          </motion.p>

          <motion.h1
            {...fadeUp(0.58)}
            className="font-serif text-[clamp(44px,11vw,58px)] font-light leading-none tracking-wide text-primary-cream"
          >
            {shortGroom}
          </motion.h1>

          <motion.div {...fadeUp(0.7)} className="flex items-center gap-5 py-1">
            <div className="h-px w-12 bg-linear-to-r from-transparent to-muted-gold/45" />
            <span className="font-serif text-2xl italic leading-none text-muted-gold">&amp;</span>
            <div className="h-px w-12 bg-linear-to-l from-transparent to-muted-gold/45" />
          </motion.div>

          <motion.h1
            {...fadeUp(0.82)}
            className="font-serif text-[clamp(44px,11vw,58px)] font-light leading-none tracking-wide text-primary-cream"
          >
            {shortBride}
          </motion.h1>

          <motion.p
            {...fadeUp(0.95)}
            className="mt-5 font-sans text-[10px] uppercase tracking-[0.32em] text-muted-gold/42"
          >
            {eventDateLabel}
          </motion.p>
        </div>

        {/* Bottom: Guest name + CTA + closing ornament */}
        <div className="mb-12 flex flex-col items-center gap-6">
          {guestName && (
            <motion.div
              {...fadeUp(1.05)}
              className="flex flex-col items-center gap-2 text-center"
            >
              <p className="font-sans text-[9px] uppercase tracking-[0.45em] text-muted-gold/48">
                Kepada Yth.
              </p>
              <div className="relative flex items-center gap-3 px-2">
                <div className="h-px w-6 bg-muted-gold/30" />
                <p className="font-serif text-[22px] font-light italic text-primary-cream">
                  {guestName}
                </p>
                <div className="h-px w-6 bg-muted-gold/30" />
              </div>
            </motion.div>
          )}

          <motion.div {...fadeUp(guestName ? 1.18 : 1.05)}>
            <button
              type="button"
              onClick={handleOpen}
              disabled={pressed}
              aria-label="Buka undangan"
              className="group relative overflow-hidden rounded-full disabled:opacity-60"
            >
              {/* Double-ring border */}
              <span className="pointer-events-none absolute inset-0 rounded-full border border-muted-gold/35" />
              <span className="pointer-events-none absolute inset-[4px] rounded-full border border-muted-gold/18" />
              {/* Shimmer sweep */}
              <span className="absolute inset-0 -translate-x-full rounded-full bg-linear-to-r from-transparent via-muted-gold/12 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative z-10 flex items-center gap-3 px-11 py-4">
                <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-primary-cream transition-colors duration-300 group-hover:text-muted-gold">
                  {pressed ? "Membuka…" : "Buka Undangan"}
                </span>
                {!pressed && (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    className="shrink-0 text-muted-gold/55 transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    <path
                      d="M1 6.5h11M7 1.5l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </button>
          </motion.div>

          <motion.div {...fadeUp(guestName ? 1.3 : 1.18)}>
            <SimpleLeafLine />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Botanical Crown SVG ─────────────────────────────────────────────────── */
function BotanicalCrown() {
  return (
    <svg
      viewBox="0 0 280 52"
      fill="none"
      aria-hidden="true"
      className="w-full text-muted-gold"
    >
      {/* Central crown motif */}
      <path
        d="M140 6 L143.5 16 L152 13 L145 21 L153 25.5 L143.5 25.5 L142 36 L140 29 L138 36 L136.5 25.5 L127 25.5 L135 21 L128 13 L136.5 16 Z"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.82"
      />
      <circle cx="140" cy="21" r="2" fill="currentColor" opacity="0.55" />

      {/* Left main vine */}
      <path
        d="M133 24 C122 22 104 18 84 22 C66 25 48 23 30 20 C18 18 9 20 4 22"
        stroke="currentColor"
        strokeWidth="0.85"
        opacity="0.62"
      />
      {/* Left leaf cluster 1 (≈x=101) */}
      <path
        d="M104 19 Q100 12 96 16 Q96 21 104 19Z"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.62"
      />
      <path
        d="M96 23 Q92 30 96 26 Q101 25 96 23Z"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.52"
      />
      {/* Left leaf cluster 2 (≈x=68) */}
      <path
        d="M72 20 Q68 13 64 17 Q64 22 72 20Z"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.58"
      />
      <path
        d="M64 24 Q60 31 64 27 Q69 26 64 24Z"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.48"
      />
      {/* Left leaf cluster 3 (≈x=38) */}
      <path
        d="M40 18 Q36 11 32 15 Q32 20 40 18Z"
        stroke="currentColor"
        strokeWidth="0.55"
        opacity="0.5"
      />
      <path
        d="M32 22 Q28 29 32 25 Q37 24 32 22Z"
        stroke="currentColor"
        strokeWidth="0.55"
        opacity="0.4"
      />
      {/* Left tendrils */}
      <path d="M110 22 Q108 28 105 31" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <path d="M77 23 Q75 29 72 32" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      {/* Left endpoint dot */}
      <circle cx="4" cy="22" r="1.4" fill="currentColor" opacity="0.38" />

      {/* Right main vine */}
      <path
        d="M147 24 C158 22 176 18 196 22 C214 25 232 23 250 20 C262 18 271 20 276 22"
        stroke="currentColor"
        strokeWidth="0.85"
        opacity="0.62"
      />
      {/* Right leaf cluster 1 (≈x=179) */}
      <path
        d="M176 19 Q180 12 184 16 Q184 21 176 19Z"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.62"
      />
      <path
        d="M184 23 Q188 30 184 26 Q179 25 184 23Z"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.52"
      />
      {/* Right leaf cluster 2 (≈x=208) */}
      <path
        d="M208 20 Q212 13 216 17 Q216 22 208 20Z"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.58"
      />
      <path
        d="M216 24 Q220 31 216 27 Q211 26 216 24Z"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.48"
      />
      {/* Right leaf cluster 3 (≈x=240) */}
      <path
        d="M240 18 Q244 11 248 15 Q248 20 240 18Z"
        stroke="currentColor"
        strokeWidth="0.55"
        opacity="0.5"
      />
      <path
        d="M248 22 Q252 29 248 25 Q243 24 248 22Z"
        stroke="currentColor"
        strokeWidth="0.55"
        opacity="0.4"
      />
      {/* Right tendrils */}
      <path d="M170 22 Q172 28 175 31" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <path d="M203 23 Q205 29 208 32" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      {/* Right endpoint dot */}
      <circle cx="276" cy="22" r="1.4" fill="currentColor" opacity="0.38" />
    </svg>
  );
}

/* ── Simple leaf line divider ─────────────────────────────────────────────── */
function SimpleLeafLine() {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <div className="h-px w-10 bg-linear-to-r from-transparent to-muted-gold/40" />
      <svg width="22" height="10" viewBox="0 0 22 10" fill="none" className="text-muted-gold/55">
        <path d="M11 1 Q8 5 11 9 Q14 5 11 1Z" stroke="currentColor" strokeWidth="0.8" />
        <path d="M1 5 Q4 3 7 5 Q4 7 1 5Z" stroke="currentColor" strokeWidth="0.7" opacity="0.7" />
        <path d="M21 5 Q18 3 15 5 Q18 7 21 5Z" stroke="currentColor" strokeWidth="0.7" opacity="0.7" />
      </svg>
      <div className="h-px w-10 bg-linear-to-l from-transparent to-muted-gold/40" />
    </div>
  );
}
