"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * SharingQR
 *
 * Floating vertical tab on the right edge of the invitation — matches the
 * example reference design. Clicking opens a modal overlay with a QR code
 * encoding the current invitation URL so guests can share it.
 */
export function SharingQR() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <>
      {/* ── Right-edge floating tab ─────────────────────────────────────── */}
      <div className="fixed right-0 top-1/2 z-30 -translate-y-1/2">
        <motion.button
          onClick={() => setOpen(true)}
          whileTap={{ scale: 0.94 }}
          className="flex flex-col items-center gap-2 rounded-l-xl bg-wood-brown/92 px-2.5 py-5 text-primary-cream shadow-xl backdrop-blur-sm transition-colors hover:bg-wood-brown active:bg-wood-brown/80"
          aria-label="Bagikan undangan via QR Code"
        >
          {/* QR icon — hand-drawn minimal */}
          <svg
            width="15"
            height="15"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="7" height="7" rx="1" />
            <rect x="11" y="2" width="7" height="7" rx="1" />
            <rect x="2" y="11" width="7" height="7" rx="1" />
            <rect x="4.5" y="4.5" width="2" height="2" fill="currentColor" stroke="none" />
            <rect x="13.5" y="4.5" width="2" height="2" fill="currentColor" stroke="none" />
            <rect x="4.5" y="13.5" width="2" height="2" fill="currentColor" stroke="none" />
            <path d="M12 12h2.5" />
            <path d="M17 12v2.5" />
            <path d="M12 17h5" />
            <path d="M14.5 14.5v2.5" />
          </svg>

          {/* Vertical text */}
          <span
            className="font-sans text-[7px] font-semibold uppercase tracking-[0.22em] text-primary-cream/90"
            style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
          >
            QR Code
          </span>
        </motion.button>
      </div>

      {/* ── Modal overlay ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="qr-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-surface-night/68 p-6 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              key="qr-card"
              initial={{ scale: 0.84, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.84, opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-[288px] flex-col items-center gap-5 rounded-3xl bg-primary-cream px-8 py-8 shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 rounded-full p-1.5 text-wood-brown/45 transition hover:bg-wood-brown/10 hover:text-wood-brown"
                aria-label="Tutup"
              >
                <X size={16} />
              </button>

              {/* Top ornament */}
              <div className="flex items-center gap-3" aria-hidden="true">
                <div className="h-px w-10 bg-muted-gold/35" />
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  className="text-muted-gold/60"
                  fill="currentColor"
                >
                  <path d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6Z" />
                </svg>
                <div className="h-px w-10 bg-muted-gold/35" />
              </div>

              {/* Heading */}
              <div className="text-center">
                <p className="font-sans text-[8px] uppercase tracking-[0.55em] text-wood-brown/65">
                  Bagikan Undangan
                </p>
                <h3 className="mt-1.5 font-serif text-xl font-light text-wood-brown">
                  Scan QR Code
                </h3>
              </div>

              {/* QR Code */}
              <div className="rounded-2xl border border-muted-gold/30 bg-white p-4 shadow-sm">
                {url ? (
                  <QRCodeSVG
                    value={url}
                    size={164}
                    fgColor="oklch(40% 0.130 162)"
                    bgColor="#ffffff"
                    level="M"
                  />
                ) : (
                  <div className="h-[164px] w-[164px] animate-pulse rounded-lg bg-muted-gold/10" />
                )}
              </div>

              <p className="text-center font-sans text-[9px] leading-relaxed text-wood-brown/55">
                Scan untuk membuka &amp; membagikan<br />
                undangan ini kepada keluarga &amp; tamu
              </p>

              {/* Bottom ornament */}
              <div className="flex items-center gap-3" aria-hidden="true">
                <div className="h-px w-10 bg-muted-gold/35" />
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  className="text-muted-gold/50"
                  fill="currentColor"
                >
                  <circle cx="5" cy="5" r="2" />
                  <circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" strokeWidth="0.6" />
                </svg>
                <div className="h-px w-10 bg-muted-gold/35" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
