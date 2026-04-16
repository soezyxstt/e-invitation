"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { RefreshCw, Wifi, WifiOff } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface RsvpEntry {
  id: string;
  guestName: string;
  attendance: "ATTENDING" | "DECLINED" | "MAYBE" | "PENDING";
  message: string | null;
  partySize: number;
  createdAt: string;
}

interface MCData {
  groomName: string;
  brideName: string;
  venueName: string;
  eventDate: string;
  rsvps: RsvpEntry[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const ATT_BADGE: Record<string, { label: string; cls: string }> = {
  ATTENDING: { label: "HADIR", cls: "bg-emerald-500 text-white" },
  DECLINED: { label: "TIDAK HADIR", cls: "bg-red-500/80 text-white" },
  MAYBE: { label: "MUNGKIN", cls: "bg-amber-400 text-surface-night" },
  PENDING: { label: "MENUNGGU", cls: "bg-stone-600 text-white" },
};

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}d lalu`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m lalu`;
  return `${Math.floor(diff / 3600)}j lalu`;
}

// ── Main page (Client Component — auto-refreshes) ─────────────────────────────

export default function MCPage({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<MCData | null>(null);
  const [loading, setLoading] = useState(true);
  const [online, setOnline] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/mc/${params.slug}`, { cache: "no-store" });
      if (!res.ok) throw new Error("fetch failed");
      const json = (await res.json()) as MCData;
      setData(json);
      setOnline(true);
      setLastRefresh(new Date());
    } catch {
      setOnline(false);
    } finally {
      setLoading(false);
    }
  }, [params.slug]);

  useEffect(() => {
    fetchData();
    timerRef.current = setInterval(fetchData, 30_000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-night">
        <RefreshCw size={28} className="animate-spin text-sage-green" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-night text-white">
        <p className="text-xl">Undangan tidak ditemukan.</p>
        <p className="text-sm text-white/40">/mc/{params.slug}</p>
      </div>
    );
  }

  const shortGroom = data.groomName.split(" ")[0];
  const shortBride = data.brideName.split(" ")[0];
  const attending = data.rsvps.filter((r) => r.attendance === "ATTENDING");
  const totalGuests = attending.reduce((s, r) => s + r.partySize, 0);

  return (
    <div className="min-h-screen bg-surface-night font-sans text-white selection:bg-sage-green/40">
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-surface-night/95 px-5 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-sage-green px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
            MC LIVE
          </span>
          <span className="font-serif text-lg text-white/90">
            {shortGroom} &amp; {shortBride}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchData}
            aria-label="Refresh manual"
            className="rounded-lg p-1.5 text-white/40 transition hover:text-white"
          >
            <RefreshCw size={15} />
          </button>
          {online ? (
            <Wifi size={15} className="text-sage-green" />
          ) : (
            <WifiOff size={15} className="text-red-400" />
          )}
          <span className="text-[10px] text-white/30">
            {lastRefresh.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </span>
        </div>
      </div>

      {/* ── Stats strip ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 divide-x divide-white/10 border-b border-white/10">
        {[
          { label: "Total RSVP", value: data.rsvps.length },
          { label: "Konfirmasi Hadir", value: attending.length },
          { label: "Estimasi Tamu", value: totalGuests },
        ].map(({ label, value }) => (
          <div key={label} className="px-5 py-4 text-center">
            <p className="text-3xl font-semibold tabular-nums text-white">{value}</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-widest text-white/40">{label}</p>
          </div>
        ))}
      </div>

      {/* ── RSVP list ───────────────────────────────────────────────────── */}
      <div className="px-4 py-5">
        <p className="mb-4 text-[10px] uppercase tracking-widest text-white/30">
          Terbaru ({data.rsvps.length} entri)
        </p>

        <div className="flex flex-col gap-3">
          {data.rsvps.map((rsvp) => {
            const badge = ATT_BADGE[rsvp.attendance] ?? ATT_BADGE.PENDING;
            return (
              <div
                key={rsvp.id}
                className="rounded-2xl border border-white/8 bg-white/5 p-4"
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-xl font-semibold leading-tight text-white">
                      {rsvp.guestName}
                    </p>
                    <p className="mt-0.5 text-xs text-white/30">
                      {rsvp.partySize} orang · {timeAgo(rsvp.createdAt)}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${badge.cls}`}
                  >
                    {badge.label}
                  </span>
                </div>

                {/* Message */}
                {rsvp.message && (
                  <p className="mt-3 border-l-2 border-sage-green/60 pl-3 text-base leading-relaxed text-white/70">
                    {rsvp.message}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <div className="pb-8 pt-2 text-center">
        <p className="text-[10px] tracking-widest text-white/20">
          Sentuh Undang · Dasbor MC · Auto-refresh 30 detik
        </p>
      </div>
    </div>
  );
}
