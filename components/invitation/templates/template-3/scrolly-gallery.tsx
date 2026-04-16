"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface GalleryImage {
  url: string;
  altText: string | null;
}

interface ScrollyGalleryProps {
  images: GalleryImage[];
}

/**
 * Full-viewport-height vertical stack.
 * Each photo covers nearly the whole screen as the user scrolls —
 * scrollytelling / storybook feel.
 */
export function ScrollyGallery({ images }: ScrollyGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="space-y-1">
      {images.map((img, i) => (
        <motion.div
          key={i}
          className="relative w-full overflow-hidden bg-deep-charcoal"
          style={{ height: "88dvh" }}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Image
            src={img.url}
            alt={img.altText ?? `Foto ${i + 1}`}
            fill
            sizes="100vw"
            className="object-cover grayscale-15"
          />

          {/* Gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-surface-night/80 via-transparent to-surface-night/10" />

          {/* Caption + index */}
          <div className="absolute inset-x-0 bottom-0 px-6 pb-8">
            <p className="font-mono text-[8px] uppercase tracking-[0.55em] text-sage-green">
              {String(i + 1).padStart(2, "0")}
            </p>
            {img.altText && (
              <p className="mt-1.5 font-serif text-base italic leading-snug text-primary-cream">
                {img.altText}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
