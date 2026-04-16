"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { useLiteMode } from "@/lib/lite-mode-context";

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
      <path
        d="M8 4 Q10 2 12 5 Q10 7 8 4Z"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.55"
      />
    </svg>
  );
}

/* ── Four-corner Ornament Group ──────────────────────────────────────────── */
export function BatikCornerGroup({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 select-none ${className}`}
      aria-hidden="true"
    >
      <CornerOrnament position="tl" className="absolute left-4 top-4" />
      <CornerOrnament position="tr" className="absolute right-4 top-4" />
      <CornerOrnament position="bl" className="absolute bottom-4 left-4" />
      <CornerOrnament position="br" className="absolute bottom-4 right-4" />
    </div>
  );
}

/* ── Cloud Layer — wavy cloud silhouettes at section edges ───────────────── */
export function CloudLayer({
  position = "top",
  opacity = 0.09,
  className = "",
}: {
  position?: "top" | "bottom";
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute left-0 right-0 select-none ${
        position === "top" ? "top-0" : "bottom-0"
      } ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <svg
        viewBox="0 0 540 56"
        preserveAspectRatio="none"
        className={`h-12 w-full text-muted-gold animate-cloud-sway ${
          position === "bottom" ? "transform-[scaleY(-1)]" : ""
        }`}
        fill="currentColor"
      >
        {/* Layered cloud bumps for depth */}
        <path
          d="M0 56 Q28 16 56 38 Q84 8 112 32 Q140 12 168 36
             Q196 10 224 34 Q252 14 280 38 Q308 8 336 30
             Q364 10 392 36 Q420 14 448 38 Q476 12 504 34
             Q522 20 540 32 L540 56 Z"
          opacity="0.6"
        />
        <path
          d="M0 56 Q35 22 70 42 Q105 12 140 38 Q175 18 210 40
             Q245 16 280 42 Q315 18 350 40 Q385 14 420 38
             Q455 18 490 40 Q515 26 540 38 L540 56 Z"
        />
      </svg>
    </div>
  );
}

/* ── Floating Petals — animated botanical elements ───────────────────────── */

const PETAL_CONFIGS = [
  { left: "7%",  delay: 0,   duration: 8.2,  size: 10 },
  { left: "21%", delay: 2.4, duration: 9.5,  size: 8  },
  { left: "40%", delay: 0.9, duration: 8.8,  size: 12 },
  { left: "58%", delay: 3.2, duration: 7.8,  size: 9  },
  { left: "74%", delay: 1.6, duration: 10.2, size: 11 },
  { left: "88%", delay: 4.5, duration: 8.5,  size: 8  },
];

export function FloatingPetals({
  count = 5,
  className = "",
  dark = false,
}: {
  count?: number;
  className?: string;
  /** Use on dark backgrounds — lighter petals */
  dark?: boolean;
}) {
  const { isLiteMode } = useLiteMode();
  if (isLiteMode) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {PETAL_CONFIGS.slice(0, count).map((p, i) => (
        <motion.div
          key={i}
          className={dark ? "absolute bottom-6 text-muted-gold/35" : "absolute bottom-6 text-muted-gold/22"}
          style={{ left: p.left }}
          animate={{
            y: [0, -p.size * 14],
            opacity: [0, 0.75, 0.5, 0],
            rotate: [0, i % 2 === 0 ? 28 : -22],
            scale: [1, 0.72],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width={p.size}
            height={Math.round(p.size * 1.55)}
            viewBox="0 0 10 16"
            fill="currentColor"
          >
            {/* Botanical leaf/petal */}
            <path d="M5 0 C2 3 0 8 5 16 C10 8 8 3 5 0Z" />
            <path
              d="M5 3 L5 13"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.4"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Animated Lotus Ring — for section headers ───────────────────────────── */
export function LotusRing({ className = "" }: { className?: string }) {
  const { isLiteMode } = useLiteMode();

  return (
    <motion.div
      className={`flex items-center justify-center ${className}`}
      aria-hidden="true"
      animate={isLiteMode ? {} : { rotate: 360 }}
      transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="text-muted-gold/28"
      >
        {/* 8-petal lotus ring */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const x = 24 + 14 * Math.cos(angle);
          const y = 24 + 14 * Math.sin(angle);
          return (
            <ellipse
              key={i}
              cx={x}
              cy={y}
              rx="4"
              ry="2.2"
              transform={`rotate(${i * 45} ${x} ${y})`}
              fill="currentColor"
              opacity="0.7"
            />
          );
        })}
        <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.5" />
        <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.35" />
      </svg>
    </motion.div>
  );
}

/* ── Wavy Batik Edge — ornamental wave stripe ────────────────────────────── */
export function WavyBatikEdge({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  const uid = useId();
  const pid = `wave-${uid.replace(/:/g, "")}`;

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <svg
        viewBox="0 0 400 20"
        preserveAspectRatio="none"
        className="h-5 w-full text-muted-gold opacity-20"
        fill="none"
      >
        <defs>
          <pattern id={pid} x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M0 10 Q5 2 10 10 Q15 18 20 10 Q25 2 30 10 Q35 18 40 10"
              stroke="currentColor"
              strokeWidth="0.7"
              fill="none"
            />
            <circle cx="10" cy="10" r="1.2" fill="currentColor" opacity="0.5" />
            <circle cx="30" cy="10" r="1.2" fill="currentColor" opacity="0.5" />
            <path
              d="M10 7 Q10 3 14 5 Q13 8 10 7Z M30 13 Q30 17 26 15 Q27 12 30 13Z"
              fill="currentColor"
              opacity="0.4"
            />
          </pattern>
        </defs>
        <rect width="400" height="20" fill={`url(#${pid})`} />
      </svg>
    </div>
  );
}
