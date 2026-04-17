"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Users, CheckCircle2, Sparkles } from "lucide-react";

type Message = {
  id: string;
  guestName: string;
  attendance: string;
  message: string | null;
  partySize: number;
  createdAt: string;
};

type InitialData = {
  groomName: string;
  brideName: string;
  eventDate: Date | string;
  venueName: string;
  messages: Message[];
};

const ATTENDANCE_COLOR: Record<string, string> = {
  ATTENDING: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  DECLINED: "text-rose-400 bg-rose-400/10 border-rose-400/30",
  MAYBE: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  PENDING: "text-stone-400 bg-stone-400/10 border-stone-400/30",
};

const ATTENDANCE_LABEL: Record<string, string> = {
  ATTENDING: "Hadir",
  DECLINED: "Tidak Hadir",
  MAYBE: "Mungkin Hadir",
  PENDING: "Menunggu",
};

function formatRelativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "baru saja";
  if (mins < 60) return `${mins} menit lalu`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} jam lalu`;
  return `${Math.floor(hrs / 24)} hari lalu`;
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-linear-to-r from-transparent via-muted-gold/40 to-transparent" />
      <Heart size={10} className="text-muted-gold" fill="currentColor" />
      <div className="h-px flex-1 bg-linear-to-r from-transparent via-muted-gold/40 to-transparent" />
    </div>
  );
}

function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 16 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-muted-gold/35"
          style={{
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 53 + 7) % 100}%`,
          }}
          animate={{
            opacity: [0, 0.55, 0],
            scale: [0, 1.2, 0],
            y: [-12, -40],
          }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            delay: (i * 0.7) % 6,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

function MessageCard({ msg, index }: { msg: Message; index: number }) {
  const colorCls =
    ATTENDANCE_COLOR[msg.attendance] ?? ATTENDANCE_COLOR.PENDING;
  const label = ATTENDANCE_LABEL[msg.attendance] ?? msg.attendance;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -32, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-muted-gold/25 bg-[#fdfbf7]/95 p-5 shadow-[0_8px_30px_-12px_rgba(90,74,58,0.12)] backdrop-blur-sm"
    >
      {/* Shimmer border on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-muted-gold/[0.14] via-transparent to-sage-green/[0.08] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-serif text-lg font-medium text-wood-brown">
            {msg.guestName}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-sans text-[10px] font-medium uppercase tracking-wide ${colorCls}`}
            >
              {label}
            </span>
            {msg.partySize > 1 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-muted-gold/20 bg-muted-gold/10 px-2.5 py-0.5 font-sans text-[10px] text-muted-gold">
                <Users size={9} />
                {msg.partySize} tamu
              </span>
            )}
          </div>
        </div>
        <span className="shrink-0 font-sans text-[10px] text-wood-brown/45">
          {formatRelativeTime(msg.createdAt)}
        </span>
      </div>

      {msg.message && (
        <p className="mt-3 border-t border-muted-gold/20 pt-3 font-sans text-sm leading-relaxed text-wood-brown/82 italic">
          &ldquo;{msg.message}&rdquo;
        </p>
      )}
    </motion.div>
  );
}

export function LiveWallClient({
  slug,
  initialData,
}: {
  slug: string;
  initialData: InitialData;
}) {
  const [messages, setMessages] = useState<Message[]>(initialData.messages);
  const [groomName] = useState(initialData.groomName);
  const [brideName] = useState(initialData.brideName);
  const [venueName] = useState(initialData.venueName);
  const [eventDate] = useState(initialData.eventDate);
  const [newCount, setNewCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const knownIds = useRef<Set<string>>(
    new Set(initialData.messages.map((m) => m.id)),
  );

  const fetchLatest = useCallback(async () => {
    try {
      const res = await fetch(`/api/live/${slug}`, { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      const incoming: Message[] = data.messages ?? [];

      const fresh = incoming.filter((m) => !knownIds.current.has(m.id));
      if (fresh.length > 0) {
        fresh.forEach((m) => knownIds.current.add(m.id));
        setMessages((prev) => {
          const merged = [...fresh, ...prev];
          return merged.slice(0, 50);
        });
        setNewCount((c) => c + fresh.length);
        setTimeout(() => setNewCount(0), 3000);
      }
      setLastUpdated(new Date());
    } catch {
      // silent — display last known state
    }
  }, [slug]);

  useEffect(() => {
    const id = setInterval(fetchLatest, 8_000);
    return () => clearInterval(id);
  }, [fetchLatest]);

  const formattedDate = new Date(eventDate).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-[#fdfbf7] via-[#f7f2ea] to-[#eef6f1]">
      <ParticleField />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[48vh] bg-radial-[ellipse_at_50%_0%] from-muted-gold/12 via-sage-green/[0.06] to-transparent" />

      {/* ── Header ── */}
      <header className="relative z-10 flex flex-col items-center px-6 pb-8 pt-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-wood-brown/55">
            ✦ Live Greeting Wall ✦
          </p>

          <h1 className="font-serif text-5xl font-medium text-wood-brown/95 sm:text-7xl lg:text-8xl">
            {groomName}
            <span className="mx-3 font-serif text-4xl text-muted-gold sm:text-6xl lg:text-7xl">
              &
            </span>
            {brideName}
          </h1>

          <div className="mt-1 flex flex-col items-center gap-1">
            <p className="font-sans text-sm text-wood-brown/72">{formattedDate}</p>
            <p className="font-sans text-xs text-wood-brown/58">{venueName}</p>
          </div>

          <GoldDivider />
        </motion.div>

        {/* New message flash */}
        <AnimatePresence>
          {newCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -8 }}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-muted-gold/35 bg-primary-cream/95 px-4 py-1.5 shadow-sm"
            >
              <Sparkles size={12} className="text-muted-gold" />
              <span className="font-sans text-xs text-wood-brown">
                {newCount} ucapan baru masuk!
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Messages Grid ── */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-12">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <Heart size={32} className="text-muted-gold/45" />
            <p className="font-sans text-sm text-wood-brown/75">
              Belum ada ucapan yang masuk. Undang tamu untuk mengisi RSVP!
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="columns-1 gap-4 sm:columns-2 lg:columns-3"
          >
            <AnimatePresence>
              {messages.map((msg, i) => (
                <div key={msg.id} className="mb-4 break-inside-avoid">
                  <MessageCard msg={msg} index={i} />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* ── Footer ticker ── */}
      <footer className="fixed bottom-0 inset-x-0 z-20 flex items-center justify-between border-t border-muted-gold/25 bg-[#f8f6f1]/92 px-6 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={10} className="text-emerald-600" />
          <span className="font-sans text-[10px] text-wood-brown/58">
            Live · diperbarui{" "}
            {lastUpdated.toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        </div>
        <p className="font-sans text-[10px] text-wood-brown/45">
          Sentuh Undang · Tier Sultan
        </p>
      </footer>
    </div>
  );
}
