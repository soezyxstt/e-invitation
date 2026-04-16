"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, Pause } from "lucide-react";
import { useLiteMode } from "@/lib/lite-mode-context";

interface MusicPlayerProps {
  /** URL from Uploadthing — any browser-playable audio format (mp3, ogg, aac). */
  src: string;
  /**
   * Set to true once the user clicks "Buka Undangan".
   * Browser policies require audio to start inside a user-gesture context;
   * the cover click is that gesture, so autoPlay here is safe.
   */
  autoPlay: boolean;
}

export function MusicPlayer({ src, autoPlay }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const { isLiteMode } = useLiteMode();

  // Start playing the first time autoPlay becomes true
  useEffect(() => {
    if (!autoPlay || !audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => {});
  }, [autoPlay]);

  // Pause automatically when Lite Mode is enabled
  useEffect(() => {
    if (isLiteMode && playing && audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
    }
  }, [isLiteMode, playing]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  return (
    <>
      {/* Preload audio — starts loading only after cover is dismissed */}
      {autoPlay && (
        <audio
          ref={audioRef}
          src={src}
          loop
          preload="auto"
          onCanPlayThrough={() => setReady(true)}
        />
      )}

      {/* Floating control — slides in after the cover exits */}
      <AnimatePresence>
        {autoPlay && (
          <motion.button
            key="music-btn"
            type="button"
            aria-label={playing ? "Jeda musik" : "Putar musik"}
            onClick={toggle}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
            className="fixed bottom-6 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-wood-brown/90 shadow-xl backdrop-blur-md ring-1 ring-white/10 transition-colors hover:bg-wood-brown active:scale-95"
          >
            {/* Spinning vinyl disc behind icon */}
            <motion.span
              className="absolute inset-0 rounded-full border border-muted-gold/30"
              animate={playing ? { rotate: 360 } : { rotate: 0 }}
              transition={
                playing
                  ? { duration: 4, repeat: Infinity, ease: "linear" }
                  : { duration: 0 }
              }
            />

            {playing ? (
              <Pause size={16} className="relative z-10 text-primary-cream" />
            ) : (
              <Music2 size={16} className="relative z-10 text-primary-cream" />
            )}

            {/* Loading pulse */}
            {autoPlay && !ready && !playing && (
              <span className="absolute inset-0 animate-ping rounded-full bg-muted-gold/20" />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
