"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  url: string;
  altText: string | null;
}

interface PhotoGalleryProps {
  /** Maximum 10 images enforced at the server level. */
  images: GalleryImage[];
}

const SLIDE_VARIANTS = {
  enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
};

const TRANSITION = { type: "spring" as const, stiffness: 320, damping: 32 };

export function PhotoGallery({ images }: PhotoGalleryProps) {
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(0);

  if (images.length === 0) return null;

  function go(next: number) {
    const clamped = ((next % images.length) + images.length) % images.length;
    setDirection(next > idx ? 1 : -1);
    setIdx(clamped);
  }

  function handleDragEnd(_: unknown, info: { offset: { x: number } }) {
    if (info.offset.x < -40) go(idx + 1);
    else if (info.offset.x > 40) go(idx - 1);
  }

  const current = images[idx];

  return (
    <div className="mx-auto max-w-sm">
      {/* ── Slide area ───────────────────────────────────────────────────── */}
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-muted-gold/40 bg-surface-night shadow-md">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={idx}
            custom={direction}
            variants={SLIDE_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={TRANSITION}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={current.url}
              alt={current.altText ?? `Foto ${idx + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, 480px"
              className="pointer-events-none select-none object-cover"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient vignette for readability of nav buttons */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

        {/* Counter pill */}
        <div className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-0.5 font-sans text-[10px] tracking-widest text-white/80 backdrop-blur-sm">
          {idx + 1} / {images.length}
        </div>

        {/* Prev / Next — only shown when > 1 image */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Foto sebelumnya"
              onClick={() => go(idx - 1)}
              className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white/80 backdrop-blur-sm transition hover:bg-black/50"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Foto berikutnya"
              onClick={() => go(idx + 1)}
              className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white/80 backdrop-blur-sm transition hover:bg-black/50"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* ── Dot navigation ───────────────────────────────────────────────── */}
      {images.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Foto ${i + 1}`}
              onClick={() => go(i)}
              className="transition-all duration-300 focus:outline-none"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === idx
                    ? "h-2 w-6 bg-muted-gold"
                    : "h-2 w-2 bg-muted-gold/50 hover:bg-muted-gold"
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {/* ── Thumbnail strip (shown when ≥ 4 images) ──────────────────────── */}
      {images.length >= 4 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                i === idx
                  ? "border-muted-gold"
                  : "border-transparent opacity-60 hover:opacity-90"
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText ?? `Thumbnail ${i + 1}`}
                fill
                sizes="56px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
