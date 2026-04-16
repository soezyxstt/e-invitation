"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface GalleryImage {
  url: string;
  altText: string | null;
}

interface MasonryGalleryProps {
  images: GalleryImage[];
}

// Alternating entry directions: left → right → diagonal-top → diagonal-bottom
const ENTRY_VARIANTS = [
  { x: -60, y: 0, rotate: -1.5 },
  { x: 60, y: 0, rotate: 1.5 },
  { x: -30, y: -50, rotate: -1 },
  { x: 30, y: 50, rotate: 1 },
];

export function MasonryGallery({ images }: MasonryGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="columns-2 gap-2 sm:columns-3">
      {images.map((img, i) => {
        const entry = ENTRY_VARIANTS[i % 4];
        return (
          <motion.div
            key={i}
            className="mb-2 break-inside-avoid overflow-hidden"
            initial={{ opacity: 0, x: entry.x, y: entry.y, rotate: entry.rotate }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.8,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="group relative w-full cursor-pointer overflow-hidden bg-surface-night">
              <Image
                src={img.url}
                alt={img.altText ?? `Foto ${i + 1}`}
                width={600}
                height={800}
                sizes="(max-width: 640px) 50vw, 33vw"
                className="w-full object-cover transition-all duration-700 group-hover:scale-[1.07] group-hover:brightness-75"
                style={{ height: "auto" }}
              />
              {/* Rust border reveal on hover */}
              <div className="pointer-events-none absolute inset-0 border border-accent-ember/0 transition-all duration-500 group-hover:border-accent-ember/50" />
              {/* Alt text on hover */}
              {img.altText && (
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-surface-night/90 px-3 py-2 transition-transform duration-400 group-hover:translate-y-0">
                  <p className="font-mono text-[8px] leading-tight text-accent-ember">{img.altText}</p>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
