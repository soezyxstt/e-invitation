"use client";

import { useActionState } from "react";
import { updateSultanFields, type SultanState } from "@/app/actions/invitation";
import {
  Crown, Video, QrCode, Globe, CheckCircle2,
  Loader2, Camera, Info,
} from "lucide-react";

const initialState: SultanState = {};

const inputCls =
  "w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-800 outline-none ring-muted-gold placeholder:text-stone-400 focus:border-muted-gold focus:ring-2 transition";

function FieldRow({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-stone-600">
        {label}
      </label>
      {hint && <p className="text-[11px] text-stone-400">{hint}</p>}
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function SultanFieldsForm({
  invitationId,
  slug,
  defaults,
}: {
  invitationId: string;
  slug: string;
  defaults: {
    videoUrl?: string | null;
    qrisUrl?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountName?: string | null;
    instagramFilterUrl?: string | null;
    hasCustomDomain?: boolean;
    customDomain?: string | null;
  };
}) {
  const boundAction = updateSultanFields.bind(null, invitationId);
  const [state, formAction, pending] = useActionState(boundAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {state.success && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
          <p className="text-sm text-emerald-800">Data Sultan berhasil disimpan.</p>
        </div>
      )}
      {state.message && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.message}</p>
      )}

      {/* ── Video Background ──────────────────────────────────────────── */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-night">
            <Video size={14} className="text-muted-gold" />
          </div>
          <h3 className="text-sm font-semibold text-stone-800">Video Background (Cinematic Hero)</h3>
        </div>
        <FieldRow
          label="URL Video"
          hint="URL dari Uploadthing CDN. Jika diisi, video akan memutar otomatis sebagai latar belakang Hero."
          error={state.errors?.videoUrl?.[0]}
        >
          <input
            name="videoUrl"
            type="url"
            placeholder="https://utfs.io/f/..."
            defaultValue={defaults.videoUrl ?? ""}
            className={inputCls}
          />
        </FieldRow>
      </div>

      {/* ── Digital Angpao (QRIS & Bank) ─────────────────────────────── */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-wood-brown">
            <QrCode size={14} className="text-primary-cream" />
          </div>
          <h3 className="text-sm font-semibold text-stone-800">Digital Angpao (QRIS & Rekening)</h3>
        </div>
        <div className="flex flex-col gap-4">
          <FieldRow
            label="URL Gambar QRIS"
            hint="Upload gambar QRIS via Uploadthing lalu paste URL-nya di sini."
            error={state.errors?.qrisUrl?.[0]}
          >
            <input
              name="qrisUrl"
              type="url"
              placeholder="https://utfs.io/f/..."
              defaultValue={defaults.qrisUrl ?? ""}
              className={inputCls}
            />
          </FieldRow>
          <div className="grid gap-4 sm:grid-cols-3">
            <FieldRow label="Nama Bank" error={state.errors?.bankName?.[0]}>
              <input
                name="bankName"
                placeholder="BCA, Mandiri, BRI…"
                defaultValue={defaults.bankName ?? ""}
                className={inputCls}
              />
            </FieldRow>
            <FieldRow label="Nomor Rekening" error={state.errors?.bankAccountNumber?.[0]}>
              <input
                name="bankAccountNumber"
                placeholder="1234567890"
                defaultValue={defaults.bankAccountNumber ?? ""}
                className={inputCls}
              />
            </FieldRow>
            <FieldRow label="Atas Nama" error={state.errors?.bankAccountName?.[0]}>
              <input
                name="bankAccountName"
                placeholder="Nama Pemilik Rekening"
                defaultValue={defaults.bankAccountName ?? ""}
                className={inputCls}
              />
            </FieldRow>
          </div>
        </div>
      </div>

      {/* ── Instagram Filter ──────────────────────────────────────────── */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="bg-gradient-instagram-icon flex h-8 w-8 items-center justify-center rounded-full">
            <Camera size={14} className="text-white" />
          </div>
          <h3 className="text-sm font-semibold text-stone-800">Link Instagram Filter AR</h3>
        </div>
        <FieldRow
          label="URL Filter Instagram"
          hint="Link filter AR kustom dari Instagram Creator Studio milik klien."
          error={state.errors?.instagramFilterUrl?.[0]}
        >
          <input
            name="instagramFilterUrl"
            type="url"
            placeholder="https://www.instagram.com/ar/..."
            defaultValue={defaults.instagramFilterUrl ?? ""}
            className={inputCls}
          />
        </FieldRow>
      </div>

      {/* ── Custom Domain ─────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-deep-charcoal">
            <Globe size={14} className="text-primary-cream" />
          </div>
          <h3 className="text-sm font-semibold text-stone-800">Custom Domain</h3>
        </div>

        <div className="mb-4 flex gap-3 rounded-xl border border-sky-200 bg-sky-50 p-4">
          <Info size={16} className="mt-0.5 shrink-0 text-sky-600" />
          <div className="text-xs leading-relaxed text-sky-800">
            <p className="font-semibold">Cara setup Custom Domain ke Vercel:</p>
            <ol className="mt-2 list-decimal space-y-1.5 pl-4">
              <li>Masuk ke dashboard registrar domain klien (Niagahoster, Namecheap, Cloudflare, dll.)</li>
              <li>
                Tambahkan record <strong>CNAME</strong>:
                <code className="mx-1 rounded bg-sky-100 px-1.5 py-0.5 font-mono text-sky-900">www</code>
                → <code className="rounded bg-sky-100 px-1.5 py-0.5 font-mono text-sky-900">cname.vercel-dns.com</code>
              </li>
              <li>
                Untuk root domain (<code>@</code>), tambahkan record <strong>A</strong>:
                <code className="ml-1 rounded bg-sky-100 px-1.5 py-0.5 font-mono text-sky-900">76.76.21.21</code>
              </li>
              <li>Masuk ke Vercel → Settings → Domains → tambahkan domain.</li>
              <li>Propagasi DNS membutuhkan waktu 1–48 jam.</li>
            </ol>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <FieldRow label="Nama Domain Klien" hint='Contoh: "rina-adi.com" (tanpa https://)'>
            <input
              name="customDomain"
              placeholder="rina-adi.com"
              defaultValue={defaults.customDomain ?? ""}
              className={inputCls}
            />
          </FieldRow>
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              name="hasCustomDomain"
              defaultChecked={defaults.hasCustomDomain ?? false}
              className="h-4 w-4 rounded border-stone-300 accent-wood-brown"
            />
            <span className="text-sm text-stone-700">
              Custom domain sudah aktif dan terhubung ke Vercel
            </span>
          </label>
        </div>
      </div>

      {/* ── Tier 4 Quick Links ────────────────────────────────────────── */}
      <div className="rounded-2xl border border-muted-gold/30 bg-primary-cream p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-wood-brown">
          Link Sultan
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href={`/${slug}/live`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-muted-gold/40 bg-wood-brown px-4 py-1.5 text-xs font-medium text-primary-cream transition hover:bg-wood-brown/90"
          >
            Live Greeting Wall ↗
          </a>
          <a
            href={`/admin/check-in`}
            className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-4 py-1.5 text-xs text-stone-700 transition hover:bg-stone-50"
          >
            Check-in Scanner
          </a>
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-wood-brown px-6 py-3 text-sm font-medium text-primary-cream shadow-sm transition hover:bg-wood-brown/90 disabled:opacity-60"
      >
        {pending ? (
          <><Loader2 size={14} className="animate-spin" /> Menyimpan…</>
        ) : (
          <><Crown size={14} /> Simpan Pengaturan Sultan</>
        )}
      </button>
    </form>
  );
}
