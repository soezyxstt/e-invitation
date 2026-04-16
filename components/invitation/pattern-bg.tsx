"use client";

import { useId } from "react";

/**
 * Sundanese / Garutan-inspired SVG pattern backgrounds (stroke inherits theme `muted-gold`).
 * Parent <section> should use `relative overflow-hidden`.
 */

export function KawungBg({ opacity = 0.055 }: { opacity?: number }) {
  const id = useId();
  const pid = `kawung-${id.replace(/:/g, "")}`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none text-muted-gold"
      style={{ opacity }}
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={pid}
            width="72"
            height="72"
            patternUnits="userSpaceOnUse"
          >
            <ellipse
              cx="36"
              cy="21"
              rx="13"
              ry="8.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.55"
            />
            <ellipse
              cx="36"
              cy="51"
              rx="13"
              ry="8.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.55"
            />
            <ellipse
              cx="21"
              cy="36"
              rx="8.5"
              ry="13"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.55"
            />
            <ellipse
              cx="51"
              cy="36"
              rx="8.5"
              ry="13"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.55"
            />
            <circle cx="36" cy="36" r="2" fill="currentColor" opacity="0.45" />
            <ellipse
              cx="0"
              cy="0"
              rx="13"
              ry="8.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.55"
            />
            <ellipse
              cx="72"
              cy="0"
              rx="13"
              ry="8.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.55"
            />
            <ellipse
              cx="0"
              cy="72"
              rx="13"
              ry="8.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.55"
            />
            <ellipse
              cx="72"
              cy="72"
              rx="13"
              ry="8.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.55"
            />
            <ellipse
              cx="0"
              cy="36"
              rx="8.5"
              ry="13"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.55"
            />
            <ellipse
              cx="72"
              cy="36"
              rx="8.5"
              ry="13"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.55"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${pid})`} />
      </svg>
    </div>
  );
}

export function LerengBg({ opacity = 0.05 }: { opacity?: number }) {
  const id = useId();
  const pid = `lereng-${id.replace(/:/g, "")}`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none text-muted-gold"
      style={{ opacity }}
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={pid}
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="48"
              x2="48"
              y2="0"
              stroke="currentColor"
              strokeWidth="0.6"
            />
            <line
              x1="0"
              y1="24"
              x2="24"
              y2="0"
              stroke="currentColor"
              strokeWidth="0.4"
              opacity="0.7"
            />
            <line
              x1="24"
              y1="48"
              x2="48"
              y2="24"
              stroke="currentColor"
              strokeWidth="0.4"
              opacity="0.7"
            />
            <path
              d="M24 24 L26.5 21.5 L24 19 L21.5 21.5 Z"
              fill="currentColor"
              opacity="0.45"
            />
            <circle cx="12" cy="36" r="1" fill="currentColor" opacity="0.3" />
            <circle cx="36" cy="12" r="1" fill="currentColor" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${pid})`} />
      </svg>
    </div>
  );
}

/** Parang on dark — gold strokes on charcoal / night surfaces */
export function ParangDarkBg({ opacity = 0.07 }: { opacity?: number }) {
  const id = useId();
  const pid = `parang-${id.replace(/:/g, "")}`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none text-muted-gold"
      style={{ opacity }}
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={pid}
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 56 Q14 28 28 28 Q42 28 56 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.7"
            />
            <path
              d="M0 28 Q14 14 28 14 Q42 14 56 -14"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.6"
            />
            <ellipse
              cx="28"
              cy="28"
              rx="3.5"
              ry="2"
              transform="rotate(45 28 28)"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.6"
            />
            <circle cx="28" cy="28" r="1.2" fill="currentColor" opacity="0.4" />
            <circle cx="14" cy="42" r="0.9" fill="currentColor" opacity="0.3" />
            <circle cx="42" cy="14" r="0.9" fill="currentColor" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${pid})`} />
      </svg>
    </div>
  );
}

export function SemenBg({ opacity = 0.045 }: { opacity?: number }) {
  const id = useId();
  const pid = `semen-${id.replace(/:/g, "")}`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none text-muted-gold"
      style={{ opacity }}
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={pid}
            width="90"
            height="90"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 45 Q22 30 45 45 Q68 60 90 45"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
            />
            <path
              d="M45 0 Q30 22 45 45 Q60 68 45 90"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
            />
            <path
              d="M45 38 Q40 45 45 52 Q50 45 45 38Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.55"
            />
            <path
              d="M22 37 Q18 30 22 34 Q26 34 22 37Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.45"
              opacity="0.7"
            />
            <path
              d="M68 37 Q72 30 68 34 Q64 34 68 37Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.45"
              opacity="0.7"
            />
            <path
              d="M37 22 Q30 18 34 22 Q34 26 37 22Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.45"
              opacity="0.7"
            />
            <path
              d="M37 68 Q30 72 34 68 Q34 64 37 68Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.45"
              opacity="0.7"
            />
            <circle cx="45" cy="45" r="1.8" fill="currentColor" opacity="0.4" />
            <circle
              cx="0"
              cy="0"
              r="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
              opacity="0.5"
            />
            <circle
              cx="90"
              cy="0"
              r="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
              opacity="0.5"
            />
            <circle
              cx="0"
              cy="90"
              r="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
              opacity="0.5"
            />
            <circle
              cx="90"
              cy="90"
              r="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
              opacity="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${pid})`} />
      </svg>
    </div>
  );
}
