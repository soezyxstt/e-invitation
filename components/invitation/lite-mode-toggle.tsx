"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Zap, ZapOff } from "lucide-react";
import { useLiteMode } from "@/lib/lite-mode-context";

/**
 * Floating "Lite Mode" toggle — bottom-left corner.
 * Enables/disables heavy animations and pauses music to save battery/CPU
 * on low-end devices or poor-signal areas (common in rural Garut).
 */
export function LiteModeToggle() {
  const { isLiteMode, toggle } = useLiteMode();

  return (
    <AnimatePresence>
      <motion.button
        type="button"
        aria-label={isLiteMode ? "Matikan Lite Mode" : "Aktifkan Lite Mode"}
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1, ease: "easeOut" }}
        className={`fixed bottom-6 left-5 z-30 flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium shadow-lg backdrop-blur-md ring-1 transition-colors ${
          isLiteMode
            ? "bg-sage-green/15 text-sage-green ring-sage-green/30 hover:bg-sage-green/25"
            : "bg-surface-night/80 text-muted-gold/70 ring-white/10 hover:text-muted-gold"
        }`}
      >
        {isLiteMode ? (
          <>
            <ZapOff size={13} />
            <span className="hidden sm:inline">Lite Mode</span>
          </>
        ) : (
          <>
            <Zap size={13} />
            <span className="hidden sm:inline">Lite Mode</span>
          </>
        )}
      </motion.button>
    </AnimatePresence>
  );
}
