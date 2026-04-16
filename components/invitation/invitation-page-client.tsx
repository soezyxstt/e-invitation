"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CoverOverlay } from "./cover-overlay";
import { MusicPlayer } from "./music-player";
import { LiteModeToggle } from "./lite-mode-toggle";
import { LiteModeProvider } from "@/lib/lite-mode-context";

interface InvitationPageClientProps {
  coverProps: {
    groomName: string;
    brideName: string;
    heroImageUrl: string | null;
    guestName: string | null;
    eventDateLabel: string;
  };
  /** Tier 2+ — URL audio dari Uploadthing. */
  musicUrl?: string;
  children: React.ReactNode;
}

function InvitationPageInner({
  coverProps,
  musicUrl,
  children,
}: InvitationPageClientProps) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!opened && (
          <CoverOverlay {...coverProps} onOpen={() => setOpened(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {opened && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="min-h-screen font-sans"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating controls — visible after cover exits */}
      {musicUrl && <MusicPlayer src={musicUrl} autoPlay={opened} />}
      <LiteModeToggle />
    </>
  );
}

/**
 * Wraps the entire invitation in `LiteModeProvider` so every child
 * component (FadeIn, MusicPlayer, Timeline, GuestBook, etc.) can read
 * the lite-mode state from context without prop drilling.
 */
export function InvitationPageClient(props: InvitationPageClientProps) {
  return (
    <LiteModeProvider>
      <InvitationPageInner {...props} />
    </LiteModeProvider>
  );
}
