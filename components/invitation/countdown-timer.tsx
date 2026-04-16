"use client";

import { useEffect, useMemo, useState } from "react";

interface CountdownTimerProps {
  /** Accept both Date (React 19 serialization) and ISO string (safe fallback). */
  eventDate: Date | string;
  /** Visual variant — "default" for dark backgrounds, "dark" for light/gold backgrounds */
  variant?: "default" | "dark";
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(target.getTime() - Date.now(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function CountdownTimer({ eventDate, variant = "default" }: CountdownTimerProps) {
  const target = useMemo(
    () => (eventDate instanceof Date ? eventDate : new Date(eventDate)),
    [eventDate],
  );

  const [tl, setTl] = useState<TimeLeft>(() => calcTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTl(calcTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { value: pad(tl.days), label: "Hari" },
    { value: pad(tl.hours), label: "Jam" },
    { value: pad(tl.minutes), label: "Menit" },
    { value: pad(tl.seconds), label: "Detik" },
  ];

  const isPast = tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0;

  if (isPast) {
    return (
      <p className="text-center font-serif text-lg italic text-wood-brown/85">
        Acara telah berlangsung.
      </p>
    );
  }

  const boxCls =
    variant === "dark"
      ? "flex h-14 w-14 items-center justify-center rounded-xl border border-surface-night/20 bg-surface-night/15 font-serif text-2xl font-semibold tabular-nums text-surface-night"
      : "flex h-14 w-14 items-center justify-center rounded-xl border border-muted-gold/30 bg-primary-cream font-serif text-2xl font-semibold tabular-nums text-wood-brown";

  const labelCls =
    variant === "dark"
      ? "font-sans text-[9px] uppercase tracking-[0.2em] text-surface-night/60"
      : "font-sans text-[9px] uppercase tracking-[0.2em] text-wood-brown/80";

  return (
    <div className="flex justify-center gap-3">
      {units.map(({ value, label }) => (
        <div key={label} className="flex flex-col items-center gap-1">
          <span className={boxCls}>{value}</span>
          <span className={labelCls}>{label}</span>
        </div>
      ))}
    </div>
  );
}
