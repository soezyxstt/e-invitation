"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLiteMode } from "@/lib/lite-mode-context";

interface TimelineEventItem {
  id: string;
  date: string;
  title: string;
  description: string | null;
}

interface TimelineProps {
  events: TimelineEventItem[];
}

/** Editorial zigzag + bento grid — no card chrome (no rounded boxes / panel cards). */
function StoryBlock({
  event,
  index,
  total,
  className,
}: {
  event: TimelineEventItem;
  index: number;
  total: number;
  className?: string;
}) {
  const { isLiteMode } = useLiteMode();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });

  const isWide = total === 1 || index % 5 === 0;

  const animProps = isLiteMode
    ? {}
    : {
        initial: { opacity: 0, y: 36 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 },
        transition: {
          duration: 0.65,
          delay: index * 0.07,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
      };

  return (
    <motion.div
      ref={ref}
      {...animProps}
      className={[
        "group relative min-h-0",
        isWide ? "md:col-span-2" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ willChange: isLiteMode ? undefined : "transform, opacity" }}
    >
      {/* Soft wash — not a card: no border radius box, no drop shadow */}
      <div
        className="pointer-events-none absolute -inset-x-1 -inset-y-2 bg-linear-to-br from-muted-gold/9 via-transparent to-sage-green/6 opacity-80 blur-2xl md:opacity-100"
        aria-hidden
      />

      <div className="relative flex h-full flex-col border-l-2 border-muted-gold/45 pl-5 pr-1 pt-0.5 md:pl-6">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-gold/90"
          style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
        >
          {event.date}
        </span>
        <h3 className="mt-2 font-serif text-xl leading-snug text-wood-brown sm:text-2xl">
          {event.title}
        </h3>
        {event.description && (
          <p className="mt-3 max-w-prose font-sans text-sm leading-relaxed text-wood-brown/78">
            {event.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function Timeline({ events }: TimelineProps) {
  if (events.length === 0) return null;

  return (
    <div className="relative mx-auto max-w-3xl">
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-4xl bg-linear-to-br from-muted-gold/6 via-transparent to-sage-green/5"
        aria-hidden
      />

      <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 md:gap-x-14 md:gap-y-12">
        {events.map((event, i) => (
          <StoryBlock
            key={event.id}
            event={event}
            index={i}
            total={events.length}
            className={i % 2 === 1 ? "md:mt-14" : ""}
          />
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <motion.span
          initial={false}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex h-10 w-10 items-center justify-center text-muted-gold/80"
          aria-hidden
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
          </svg>
        </motion.span>
      </div>
    </div>
  );
}
