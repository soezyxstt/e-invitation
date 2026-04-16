"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface HoverPortraitProps {
  name: string;
  portraitUrl: string | null;
  label: string;
  childOrder: string | null;
  parentsLine: string | null;
}

export function HoverPortrait({
  name,
  portraitUrl,
  label,
  childOrder,
  parentsLine,
}: HoverPortraitProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      className="cursor-pointer py-6 text-center"
      onClick={() => setRevealed((v) => !v)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {/* Photo — only visible when revealed */}
      <AnimatePresence>
        {revealed && portraitUrl && (
          <motion.div
            key="photo"
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mx-auto overflow-hidden"
            style={{ maxWidth: 200 }}
          >
            <div className="relative aspect-3/4 w-full overflow-hidden">
              <Image
                src={portraitUrl}
                alt={name}
                fill
                sizes="200px"
                className="object-cover grayscale"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name — always visible, shrinks slightly when photo is shown */}
      <motion.h3
        className="font-serif font-extralight leading-none text-deep-charcoal transition-all"
        style={{ fontSize: revealed ? "clamp(24px, 7vw, 48px)" : "clamp(36px, 11vw, 70px)" }}
        animate={{ opacity: revealed ? 0.6 : 1 }}
        transition={{ duration: 0.45 }}
      >
        {name}
      </motion.h3>

      {/* Subtle "tap" hint on first load */}
      <motion.p
        className={`mt-2 font-mono text-[8px] uppercase tracking-[0.5em] transition-colors duration-500 ${revealed ? "text-sage-green" : "text-wood-brown/70"}`}
      >
        {revealed ? label : `${label} — ketuk untuk foto`}
      </motion.p>

      {/* Detail text fades in with photo */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-3 space-y-0.5"
          >
            {childOrder && (
              <p className="font-sans text-xs capitalize text-wood-brown/75">{childOrder}</p>
            )}
            {parentsLine && (
              <p className="font-sans text-xs leading-relaxed text-wood-brown/70">{parentsLine}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
