"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface GalleryImage {
  url: string;
  altText: string | null;
}

interface VerticalGalleryProps {
  images: GalleryImage[];
}

export function VerticalGallery({ images }: VerticalGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="mx-auto max-w-sm space-y-8">
      {images.map((img, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="shadow-t3-card overflow-hidden rounded-sm border border-muted-gold/40 bg-white">
            <div className="relative aspect-4/5 w-full overflow-hidden">
              <Image
                src={img.url}
                alt={img.altText ?? `Foto ${i + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, 480px"
                className="object-cover"
              />
            </div>
            {img.altText && (
              <div className="px-5 py-4">
                <p className="font-serif text-sm italic leading-relaxed text-wood-brown/85">
                  {img.altText}
                </p>
                <div className="mt-3 h-px bg-muted-gold/40" />
                <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.3em] text-wood-brown/80">
                  Foto {i + 1}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
