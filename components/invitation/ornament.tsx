"use client";

import { useId } from "react";

/* ── Diamond Divider ──────────────────────────────────────────────────────── */
export function DiamondDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="h-px flex-1 bg-linear-to-r from-transparent via-muted-gold/45 to-muted-gold/45" />
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        className="shrink-0 text-muted-gold/70"
        aria-hidden="true"
      >
        <path d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6Z" fill="currentColor" />
      </svg>
      <div className="h-px flex-1 bg-linear-to-l from-transparent via-muted-gold/45 to-muted-gold/45" />
    </div>
  );
}

/* ── Batik Border (horizontal repeating pattern) ─────────────────────────── */
export function BatikBorder({ className = "" }: { className?: string }) {
  const uid = useId();
  const patternId = `batik-${uid.replace(/:/g, "")}`;

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 24"
        preserveAspectRatio="none"
        className="h-6 w-full text-muted-gold opacity-30"
        fill="none"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="40"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20 2 L38 12 L20 22 L2 12 Z"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
            />
            <circle cx="20" cy="12" r="2" fill="currentColor" opacity="0.6" />
            <path
              d="M0 12 L5 7 M0 12 L5 17 M40 12 L35 7 M40 12 L35 17"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="400" height="24" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}

/* ── Floral Separator — richer botanical section divider ─────────────────── */
export function FloralSeparator({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 py-1 ${className}`}
      aria-hidden="true"
    >
      <div className="h-px w-12 bg-linear-to-r from-transparent to-muted-gold/40" />
      <svg
        viewBox="0 0 80 28"
        fill="none"
        className="w-20 text-muted-gold/65"
        aria-hidden="true"
      >
        {/* Central lotus */}
        <path d="M40 4 Q37 10 40 14 Q43 10 40 4Z" stroke="currentColor" strokeWidth="0.7" />
        <path d="M40 14 Q37 18 40 24 Q43 18 40 14Z" stroke="currentColor" strokeWidth="0.7" opacity="0.6" />
        <path d="M34 9 Q36 12 40 14 Q38 11 34 9Z" stroke="currentColor" strokeWidth="0.6" />
        <path d="M46 9 Q44 12 40 14 Q42 11 46 9Z" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="40" cy="14" r="1.5" fill="currentColor" opacity="0.55" />

        {/* Left branch */}
        <path d="M36 14 C28 13 18 10 8 13" stroke="currentColor" strokeWidth="0.7" opacity="0.6" />
        <path d="M26 11 Q23 7 20 10 Q21 13 26 11Z" stroke="currentColor" strokeWidth="0.55" opacity="0.6" />
        <path d="M20 14 Q17 10 14 13 Q15 16 20 14Z" stroke="currentColor" strokeWidth="0.55" opacity="0.5" />
        <circle cx="8" cy="13" r="1.2" fill="currentColor" opacity="0.38" />

        {/* Right branch */}
        <path d="M44 14 C52 13 62 10 72 13" stroke="currentColor" strokeWidth="0.7" opacity="0.6" />
        <path d="M54 11 Q57 7 60 10 Q59 13 54 11Z" stroke="currentColor" strokeWidth="0.55" opacity="0.6" />
        <path d="M60 14 Q63 10 66 13 Q65 16 60 14Z" stroke="currentColor" strokeWidth="0.55" opacity="0.5" />
        <circle cx="72" cy="13" r="1.2" fill="currentColor" opacity="0.38" />
      </svg>
      <div className="h-px w-12 bg-linear-to-l from-transparent to-muted-gold/40" />
    </div>
  );
}

/* ── Section Header Ornament ─────────────────────────────────────────────── */
export function SectionOrnament({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center gap-2 ${className}`}
      aria-hidden="true"
    >
      <FloralSeparator />
    </div>
  );
}

/* ── Corner Ornament (for cards) ─────────────────────────────────────────── */
export function CornerOrnament({
  position = "tl",
  className = "",
}: {
  position?: "tl" | "tr" | "bl" | "br";
  className?: string;
}) {
  const transforms: Record<string, string> = {
    tl: "rotate(0)",
    tr: "rotate(90)",
    br: "rotate(180)",
    bl: "rotate(270)",
  };

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      className={`text-muted-gold/40 ${className}`}
      aria-hidden="true"
      style={{ transform: transforms[position] }}
    >
      <path
        d="M2 2 L12 2 M2 2 L2 12"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M6 2 Q6 6 2 6"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity="0.7"
      />
      <circle cx="2" cy="2" r="1.2" fill="currentColor" opacity="0.6" />
      {/* Small leaf */}
      <path
        d="M8 4 Q10 2 12 5 Q10 7 8 4Z"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.55"
      />
    </svg>
  );
}
