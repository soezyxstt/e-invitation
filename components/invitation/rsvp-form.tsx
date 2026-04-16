"use client";

import { useActionState } from "react";
import { submitRsvp } from "@/app/actions/rsvp";
import type { RsvpState } from "@/app/actions/rsvp";
import { CheckCircle2, Loader2, Heart, MessageCircle } from "lucide-react";
import { QrTicket } from "@/components/invitation/qr-ticket";

const initialState: RsvpState = {};

const inputCls =
  "w-full rounded-xl border border-muted-gold/55 bg-white/70 px-4 py-3 font-sans text-sm text-wood-brown placeholder:text-wood-brown/50 outline-none ring-muted-gold focus:border-muted-gold focus:ring-2 transition backdrop-blur-sm";

export function RsvpForm({
  invitationId,
  defaultName,
  coupleName,
}: {
  invitationId: string;
  defaultName?: string;
  coupleName?: string;
}) {
  const [state, formAction, pending] = useActionState(submitRsvp, initialState);

  if (state.success) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-muted-gold/30 bg-primary-cream p-8 text-center shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-green/12">
          <CheckCircle2 size={32} className="text-sage-green" />
        </div>

        <div>
          <h3 className="font-serif text-xl text-wood-brown">Terima kasih!</h3>
          <p className="mt-1 font-sans text-sm text-wood-brown/78">
            Konfirmasi kehadiran Anda telah kami terima. Kami sangat berterima
            kasih atas doa dan kehadiran Anda.
          </p>
        </div>

        {/* WhatsApp confirmation button — only shown when ADMIN_WHATSAPP is configured */}
        {state.waLink && (
          <a
            href={state.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl bg-whatsapp px-6 py-3 font-sans text-sm font-medium tracking-wide text-white shadow-sm transition hover:bg-whatsapp/90"
          >
            <MessageCircle size={16} />
            Kirim Konfirmasi via WhatsApp
          </a>
        )}

        {/* QR Ticket — only for Tier 4 (Sultan) */}
        {state.qrToken && state.guestName && (
          <QrTicket
            token={state.qrToken}
            guestName={state.guestName}
            coupleName={coupleName ?? ""}
          />
        )}

        <Heart size={18} className="text-muted-gold" fill="currentColor" />
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="invitationId" value={invitationId} />

      {state.message && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="font-sans text-xs uppercase tracking-[0.15em] text-wood-brown/72">
          Nama Lengkap
        </label>
        <input
          name="guestName"
          defaultValue={defaultName}
          placeholder="Masukkan nama Anda"
          className={inputCls}
          required
        />
        {state.errors?.guestName && (
          <p className="text-xs text-red-600">{state.errors.guestName[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-sans text-xs uppercase tracking-[0.15em] text-wood-brown/72">
          Konfirmasi Kehadiran
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: "ATTENDING", label: "Hadir" },
            { value: "MAYBE", label: "Mungkin" },
            { value: "DECLINED", label: "Tidak Hadir" },
          ].map(({ value, label }) => (
            <label
              key={value}
              className="flex cursor-pointer flex-col items-center gap-1 rounded-xl border border-muted-gold/55 bg-white/60 p-3 text-center transition has-checked:border-muted-gold has-checked:bg-primary-cream"
            >
              <input
                type="radio"
                name="attendance"
                value={value}
                className="sr-only"
                defaultChecked={value === "ATTENDING"}
                required
              />
              <span className="font-sans text-xs text-wood-brown">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-sans text-xs uppercase tracking-[0.15em] text-wood-brown/72">
          Jumlah Tamu
        </label>
        <select name="partySize" className={inputCls} defaultValue="1">
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} orang
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-sans text-xs uppercase tracking-[0.15em] text-wood-brown/72">
          Ucapan &amp; Doa (opsional)
        </label>
        <textarea
          name="message"
          placeholder="Kirimkan ucapan hangat untuk kedua mempelai…"
          rows={3}
          className={`${inputCls} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-wood-brown py-3.5 font-sans text-sm tracking-[0.15em] text-primary-cream transition hover:bg-wood-brown/90 disabled:opacity-60"
      >
        {pending && <Loader2 size={14} className="animate-spin" />}
        {pending ? "Mengirim…" : "Kirim Konfirmasi"}
      </button>
    </form>
  );
}
