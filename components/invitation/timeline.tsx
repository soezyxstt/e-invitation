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

function TimelineCard({
  event,
  index,
}: {
  event: TimelineEventItem;
  index: number;
}) {
  const { isLiteMode } = useLiteMode();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const isLeft = index % 2 === 0;

  const animProps = isLiteMode
    ? {}
    : {
        initial: { opacity: 0, x: isLeft ? -40 : 40 },
        animate: isInView ? { opacity: 1, x: 0 } : {},
        transition: { duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
      };

  return (
    <div
      ref={ref}
      className={`relative flex w-full items-start gap-0 ${
        isLeft ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Card */}
      <motion.div
        {...animProps}
        className={`w-[calc(50%-28px)] ${isLeft ? "text-right pr-5" : "text-left pl-5"} sm:w-[calc(50%-28px)]`}
      >
        <div
          className={`inline-block rounded-2xl border border-muted-gold/50 bg-primary-cream p-4 shadow-sm ${
            isLeft ? "text-right" : "text-left"
          }`}
        >
          {/* Date chip */}
          <span className="inline-block rounded-full bg-wood-brown px-3 py-0.5 font-sans text-[9px] uppercase tracking-[0.25em] text-primary-cream">
            {event.date}
          </span>
          <h3 className="mt-2 font-serif text-base text-wood-brown">
            {event.title}
          </h3>
          {event.description && (
            <p className="mt-1.5 font-sans text-xs leading-relaxed text-wood-brown/85">
              {event.description}
            </p>
          )}
        </div>
      </motion.div>

      {/* Centre dot + connector */}
      <div className="relative z-10 flex w-14 shrink-0 flex-col items-center">
        <motion.div
          ref={undefined}
          {...(isLiteMode
            ? {}
            : {
                initial: { scale: 0 },
                animate: isInView ? { scale: 1 } : {},
                transition: { duration: 0.4, delay: 0.2, type: "spring" },
              })}
          className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-muted-gold bg-primary-cream shadow-md"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-muted-gold" />
        </motion.div>
      </div>

      {/* Spacer (opposite side) */}
      <div className="w-[calc(50%-28px)]" />
    </div>
  );
}

export function Timeline({ events }: TimelineProps) {
  if (events.length === 0) return null;

  return (
    <div className="relative mx-auto max-w-2xl">
      {/* Vertical gold line */}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-linear-to-b from-transparent via-muted-gold/50 to-transparent" />

      <div className="flex flex-col gap-8">
        {events.map((event, i) => (
          <TimelineCard key={event.id} event={event} index={i} />
        ))}
      </div>

      {/* Trailing heart at the bottom */}
      <div className="mt-8 flex justify-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-muted-gold/60 bg-primary-cream shadow-sm">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-muted-gold" fill="currentColor">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
          </svg>
        </span>
      </div>
    </div>
  );
}
