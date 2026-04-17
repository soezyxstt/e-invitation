"use client";

import Image from "next/image";
import { Gift, ExternalLink } from "lucide-react";
import { DEFAULT_QRIS_PLACEHOLDER_PATH } from "@/lib/demo-invitation-fallbacks";

/** QRIS scan & filter IG — transfer bank ada di `WeddingGiftSection`. */
export function QrisSection({
  qrisUrl,
  instagramFilterUrl,
}: {
  qrisUrl?: string | null;
  instagramFilterUrl?: string | null;
}) {
  if (!qrisUrl && !instagramFilterUrl) return null;

  const isPlaceholder =
    !!qrisUrl &&
    (qrisUrl === DEFAULT_QRIS_PLACEHOLDER_PATH ||
      qrisUrl.includes("qris-placeholder"));

  return (
    <section className="bg-primary-cream px-6 py-14">
      <div className="mx-auto max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-wood-brown/80">
            Hadiah Digital
          </p>
          <h2 className="mt-2 font-serif text-3xl text-wood-brown">
            Digital Angpao
          </h2>
          <p className="mt-2 font-sans text-xs text-wood-brown/80">
            Scan QRIS atau gunakan filter Instagram
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-px flex-1 bg-muted-gold/50" />
            <Gift size={14} className="text-muted-gold" />
            <div className="h-px flex-1 bg-muted-gold/50" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {qrisUrl && (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-muted-gold/40 bg-white p-6 shadow-sm">
              <p className="font-sans text-xs font-medium uppercase tracking-wide text-wood-brown/80">
                Scan QRIS
              </p>
              <div className="relative h-52 w-52">
                <Image
                  src={qrisUrl}
                  alt={isPlaceholder ? "Contoh tampilan QRIS" : "QRIS"}
                  fill
                  className="object-contain"
                  unoptimized={isPlaceholder}
                />
              </div>
              {isPlaceholder ? (
                <p className="text-center font-sans text-[10px] leading-relaxed text-wood-brown/60">
                  Contoh tampilan — unggah gambar QRIS Anda di dasbor admin untuk
                  mengganti placeholder ini.
                </p>
              ) : (
                <p className="text-center font-sans text-[10px] text-wood-brown/65">
                  Berlaku untuk semua aplikasi pembayaran digital
                </p>
              )}
            </div>
          )}

          {instagramFilterUrl && (
            <a
              href={instagramFilterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-instagram-filter-cta flex items-center justify-center gap-2.5 rounded-2xl border border-muted-gold/40 px-5 py-4 font-sans text-sm font-medium text-wood-brown shadow-sm transition hover:opacity-90"
            >
              <span className="text-lg">📸</span>
              <span>Coba Filter Instagram Kami</span>
              <ExternalLink size={13} className="ml-auto opacity-60" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
