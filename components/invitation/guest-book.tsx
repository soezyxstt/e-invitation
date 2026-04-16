"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";
import { useLiteMode } from "@/lib/lite-mode-context";

interface GuestBookEntry {
  id: string;
  guestName: string;
  attendance: string;
  message: string;
  createdAt: Date | string;
}

interface GuestBookProps {
  entries: GuestBookEntry[];
  invitationId: string;
}

const ATTENDANCE_ICON: Record<string, { icon: string; cls: string }> = {
  ATTENDING: { icon: "✅", cls: "text-emerald-600" },
  DECLINED: { icon: "❌", cls: "text-red-500" },
  MAYBE: { icon: "🤔", cls: "text-amber-600" },
};

function formatRelative(dateInput: Date | string): string {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "baru saja";
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

export function GuestBook({ entries, invitationId: _ }: GuestBookProps) {
  const { isLiteMode } = useLiteMode();
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-refresh every 30 s so new messages appear without manual reload
  useEffect(() => {
    timerRef.current = setInterval(() => router.refresh(), 30_000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [router]);

  if (entries.length === 0) {
    return (
      <div className="mx-auto flex max-w-sm flex-col items-center gap-3 py-10 text-center">
        <MessageCircle size={36} className="text-muted-gold/50" />
        <p className="font-sans text-sm text-wood-brown/80">
          Jadilah yang pertama memberikan ucapan selamat.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="flex flex-col gap-3">
        {entries.map((entry, i) => {
          const att = ATTENDANCE_ICON[entry.attendance];
          const cardContent = (
            <div className="rounded-2xl border border-muted-gold/40 bg-primary-cream p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  {/* Avatar initials */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-muted-gold/60 bg-muted-gold/25">
                    <span className="font-serif text-sm text-wood-brown">
                      {entry.guestName[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-wood-brown">
                      {entry.guestName}
                    </p>
                    <p className="font-sans text-[10px] text-wood-brown/80">
                      {att && (
                        <span className={att.cls}>{att.icon} </span>
                      )}
                      {formatRelative(entry.createdAt)}
                    </p>
                  </div>
                </div>
                <Heart size={14} className="mt-1 shrink-0 text-muted-gold" fill="currentColor" />
              </div>
              <p className="mt-3 font-sans text-sm leading-relaxed text-wood-brown/90">
                {entry.message}
              </p>
            </div>
          );

          if (isLiteMode) {
            return <div key={entry.id}>{cardContent}</div>;
          }

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
            >
              {cardContent}
            </motion.div>
          );
        })}
      </div>

      <p className="mt-6 text-center font-sans text-[10px] tracking-wider text-muted-gold/50">
        Memperbarui otomatis setiap 30 detik
      </p>
    </div>
  );
}
