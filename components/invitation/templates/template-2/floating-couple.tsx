"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingCoupleProps {
  groomName: string;
  brideName: string;
  groomPortraitUrl: string | null;
  bridePortraitUrl: string | null;
  groomChildOrder: string | null;
  brideChildOrder: string | null;
  groomParentsLine: string | null;
  brideParentsLine: string | null;
}

export function FloatingCouple({
  groomName,
  brideName,
  groomPortraitUrl,
  bridePortraitUrl,
  groomChildOrder,
  brideChildOrder,
  groomParentsLine,
  brideParentsLine,
}: FloatingCoupleProps) {
  const shortGroom = groomName.split(" ")[0];
  const shortBride = brideName.split(" ")[0];

  return (
    <div className="relative">
      {/* ── Overlapping tilted cards ─────────────────────────────────────── */}
      <div className="relative mx-auto h-[460px] max-w-[380px]">

        {/* Groom card — left, behind, tilted -3° */}
        <motion.div
          className="shadow-template2-float absolute left-0 top-0 z-10 w-[60%] origin-bottom-left overflow-hidden rounded-xl border border-white/5"
          initial={{ opacity: 0, x: -60, rotate: -8 }}
          whileInView={{ opacity: 1, x: 0, rotate: -3 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ rotate: -3 }}
        >
            <div className="relative aspect-3/4 w-full bg-surface-night">
            {groomPortraitUrl ? (
              <Image
                src={groomPortraitUrl}
                alt={groomName}
                fill
                sizes="(max-width: 480px) 55vw, 228px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-serif text-6xl font-light text-accent-ember/30">
                  {groomName[0]}
                </span>
              </div>
            )}
            {/* Name overlay at card bottom */}
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-surface-night via-surface-night/70 to-transparent px-4 pb-4 pt-14">
              <p className="font-mono text-[7px] uppercase tracking-[0.45em] text-accent-ember">
                Mempelai Pria
              </p>
              <p className="mt-0.5 font-serif text-sm font-light text-primary-cream">
                {shortGroom}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bride card — right, front, tilted +2.5° */}
        <motion.div
          className="shadow-template2-float-strong absolute bottom-0 right-0 z-20 w-[60%] origin-bottom-right overflow-hidden rounded-xl border border-white/[0.07]"
          initial={{ opacity: 0, x: 60, rotate: 7 }}
          whileInView={{ opacity: 1, x: 0, rotate: 2.5 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{ rotate: 2.5 }}
        >
            <div className="relative aspect-3/4 w-full bg-surface-night">
            {bridePortraitUrl ? (
              <Image
                src={bridePortraitUrl}
                alt={brideName}
                fill
                sizes="(max-width: 480px) 55vw, 228px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-serif text-6xl font-light text-accent-ember/30">
                  {brideName[0]}
                </span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-surface-night via-surface-night/70 to-transparent px-4 pb-4 pt-14">
              <p className="font-mono text-[7px] uppercase tracking-[0.45em] text-accent-ember">
                Mempelai Wanita
              </p>
              <p className="mt-0.5 font-serif text-sm font-light text-primary-cream">
                {shortBride}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Center badge — overlaps both cards at the crossing point */}
        <motion.div
          className="absolute left-1/2 top-[40%] z-30 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.55, type: "spring", stiffness: 240, damping: 18 }}
        >
          <div className="shadow-accent-ember-ring flex h-11 w-11 items-center justify-center rounded-full bg-accent-ember">
            <span className="font-serif text-lg italic leading-none text-white">&times;</span>
          </div>
        </motion.div>
      </div>

      {/* ── Name + parents detail below cards ──────────────────────────── */}
      <div className="mt-10 grid grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <p className="font-serif text-base font-light text-primary-cream">{groomName}</p>
          {groomChildOrder && (
            <p className="mt-1 font-mono text-[8px] capitalize tracking-wider text-wood-brown/80">
              {groomChildOrder}
            </p>
          )}
          {groomParentsLine && (
            <p className="mt-2 font-sans text-[11px] leading-relaxed text-wood-brown/90">
              {groomParentsLine}
            </p>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-right"
        >
          <p className="font-serif text-base font-light text-primary-cream">{brideName}</p>
          {brideChildOrder && (
            <p className="mt-1 font-mono text-[8px] capitalize tracking-wider text-wood-brown/80">
              {brideChildOrder}
            </p>
          )}
          {brideParentsLine && (
            <p className="mt-2 font-sans text-[11px] leading-relaxed text-wood-brown/90">
              {brideParentsLine}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
