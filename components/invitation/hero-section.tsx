"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "./fade-in";
import { getFirstName } from "@/lib/name-utils";

interface HeroSectionProps {
  groomName: string;
  brideName: string;
  eventDateLabel: string;
  heroUrl: string | null;
  /** Tier 4 uses VideoHero instead — pass false to suppress image layers */
  showImage?: boolean;
}

export function HeroSection({
  groomName,
  brideName,
  eventDateLabel,
  heroUrl,
  showImage = true,
}: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const shortGroom = getFirstName(groomName);
  const shortBride = getFirstName(brideName);

  return (
    <section
      ref={ref}
      className="relative flex min-h-dvh items-end overflow-hidden bg-surface-night"
    >
      {showImage && heroUrl ? (
        <motion.div className="absolute inset-0" style={{ y: yParallax }}>
          <Image
            src={heroUrl}
            alt={`${groomName} & ${brideName}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0iIzExMGUwYiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiLz48L3N2Zz4="
          />
        </motion.div>
      ) : (
        !heroUrl && (
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 80% at 50% 40%, var(--color-wood-brown), var(--color-surface-night))`,
            }}
          />
        )
      )}

      <div className="absolute inset-0 bg-linear-to-t from-surface-night/95 via-surface-night/15 to-surface-night/40" />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 100% at 50% 50%, transparent 60%, color-mix(in oklch, var(--color-surface-night) 40%, transparent) 100%)`,
        }}
      />

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="relative z-10 w-full"
      >
        <div className="px-6 pb-14 text-center lg:pb-20">
          <FadeIn delay={0.05}>
            <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-muted-gold/52">
              The Wedding of
            </p>
          </FadeIn>

          <FadeIn delay={0.18}>
            <div className="mt-3 flex items-baseline justify-center gap-4">
              <h1 className="font-serif text-[clamp(38px,9vw,56px)] font-light leading-none tracking-wider text-primary-cream">
                {shortGroom}
              </h1>
              <span className="font-serif text-[clamp(20px,5vw,30px)] italic leading-none text-muted-gold">
                &amp;
              </span>
              <h1 className="font-serif text-[clamp(38px,9vw,56px)] font-light leading-none tracking-wider text-primary-cream">
                {shortBride}
              </h1>
            </div>
          </FadeIn>

          <FadeIn delay={0.32}>
            <div className="my-4 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-linear-to-r from-transparent to-muted-gold/40" />
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                className="text-muted-gold/55"
                aria-hidden="true"
              >
                <path
                  d="M7 0L8.75 5.25L14 7L8.75 8.75L7 14L5.25 8.75L0 7L5.25 5.25Z"
                  fill="currentColor"
                />
              </svg>
              <div className="h-px w-16 bg-linear-to-l from-transparent to-muted-gold/40" />
            </div>
          </FadeIn>

          <FadeIn delay={0.44}>
            <p className="font-sans text-[10px] uppercase tracking-[0.38em] text-muted-gold/42">
              {eventDateLabel}
            </p>
          </FadeIn>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-1.5">
          <p className="font-sans text-[8px] uppercase tracking-[0.4em] text-muted-gold/40">
            Scroll
          </p>
          <svg
            width="14"
            height="18"
            viewBox="0 0 14 18"
            fill="none"
            className="text-muted-gold/45"
            aria-hidden="true"
          >
            <path
              d="M7 1v12M2 9l5 7 5-7"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
