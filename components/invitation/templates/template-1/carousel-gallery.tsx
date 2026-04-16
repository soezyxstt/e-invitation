"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  url: string;
  altText: string | null;
}

interface CarouselGalleryProps {
  images: GalleryImage[];
}

export function CarouselGallery({ images }: CarouselGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  if (images.length === 0) return null;

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + images.length) % images.length);
  };

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="relative select-none">
      {/* Main slide */}
      <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: "4/3" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <Image
              src={images[current].url}
              alt={images[current].altText ?? `Foto ${current + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className="object-cover"
            />
            {/* Dark base at bottom for caption */}
            {images[current].altText && (
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-surface-night/70 to-transparent px-6 pb-5 pt-12">
                <p className="font-serif text-sm italic text-primary-cream">
                  {images[current].altText}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Prev arrow */}
        <button
          onClick={() => go(-1)}
          aria-label="Foto sebelumnya"
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-primary-cream/80 text-surface-night shadow-sm backdrop-blur-sm transition hover:bg-primary-cream"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Next arrow */}
        <button
          onClick={() => go(1)}
          aria-label="Foto berikutnya"
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-primary-cream/80 text-surface-night shadow-sm backdrop-blur-sm transition hover:bg-primary-cream"
        >
          <ChevronRight size={18} />
        </button>

        {/* Counter */}
        <div className="absolute right-4 top-4 z-10 rounded-sm bg-surface-night/60 px-2 py-0.5 backdrop-blur-sm">
          <p className="font-sans text-[9px] tracking-widest text-primary-cream/80">
            {current + 1} / {images.length}
          </p>
        </div>
      </div>

      {/* Dot navigation */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Foto ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 bg-wood-brown"
                : "w-2 bg-muted-gold hover:bg-muted-gold/90"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
