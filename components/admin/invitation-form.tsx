"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { createInvitation } from "@/app/actions/invitation";
import type { CreateInvitationState } from "@/app/actions/invitation";
import {
  User,
  Users,
  CalendarDays,
  MapPin,
  FileText,
  ImagePlus,
  Loader2,
  CheckCircle2,
  XCircle,
  Link as LinkIcon,
} from "lucide-react";

// ── Utilitas ────────────────────────────────────────────────────────────────

function toSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ── Sub-komponen ─────────────────────────────────────────────────────────────

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5 border-b border-stone-200 pb-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8ebe3]">
        <Icon size={13} className="text-[#3d5a2b]" />
      </div>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-600">{children}</h2>
    </div>
  );
}

function FieldError({ msgs }: { msgs?: string[] }) {
  if (!msgs?.length) return null;
  return <p className="mt-1 text-xs text-red-600">{msgs[0]}</p>;
}

function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string[];
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-stone-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>
      {hint && <span className="text-xs text-stone-500">{hint}</span>}
      {children}
      <FieldError msgs={error} />
    </label>
  );
}

const inputCls =
  "rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none placeholder:text-stone-400 ring-[#6b7f5a] focus:border-[#6b7f5a] focus:ring-2 transition";

const selectCls = `${inputCls} cursor-pointer`;

// ── Template pembuka ─────────────────────────────────────────────────────────

const TEMPLATES: Record<string, { label: string; text: string }> = {
  "": { label: "— Pilih template —", text: "" },
  indonesia_formal: {
    label: "Indonesia Formal",
    text: "Bismillahirrahmanirrahim. Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami.",
  },
  sunda_lemes: {
    label: "Basa Sunda Lemes",
    text: "Bismillahirrahmanirrahim. Kalayan neda pangampura sareng berkah Allah SWT, kami seja ngayakeun pernikahan putra-putri kami.",
  },
  quran_an_nuur: {
    label: "Q.S. An-Nur : 32",
    text: "وَأَنكِحُوا الْأَيَامَىٰ مِنكُمْ وَالصَّالِحِينَ مِنْ عِبَادِكُمْ وَإِمَائِكُمْ — Dan nikahkanlah orang-orang yang masih membujang di antara kamu (Q.S. An-Nur: 32)",
  },
  quran_ar_rum: {
    label: "Q.S. Ar-Rum : 21",
    text: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا — Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri (Q.S. Ar-Rum: 21)",
  },
};

// ── Komponen hero uploader ───────────────────────────────────────────────────

function HeroUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { startUpload } = useUploadThing("heroImage", {
    onClientUploadComplete: (res) => {
      const url = res?.[0]?.ufsUrl ?? res?.[0]?.url ?? "";
      onChange(url);
      setUploading(false);
      setDone(true);
    },
    onUploadError: (err) => {
      setError(err.message);
      setUploading(false);
    },
  });

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setDone(false);
    setError(null);
    setUploading(true);
    await startUpload([f]);
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="group relative flex min-h-[140px] w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 px-4 py-6 transition hover:border-[#6b7f5a] hover:bg-[#f7f9f5]"
      >
        {uploading && (
          <Loader2 size={28} className="animate-spin text-[#6b7f5a]" />
        )}
        {!uploading && done && (
          <>
            <CheckCircle2 size={28} className="text-[#6b7f5a]" />
            <p className="text-sm text-stone-600">Upload berhasil!</p>
          </>
        )}
        {!uploading && !done && (
          <>
            <ImagePlus size={28} className="text-stone-400 transition group-hover:text-[#6b7f5a]" />
            <div className="text-center">
              <p className="text-sm font-medium text-stone-700">Klik untuk unggah foto utama</p>
              <p className="mt-0.5 text-xs text-stone-500">JPG, PNG, WebP — maks 4 MB</p>
            </div>
          </>
        )}
        {file && !uploading && (
          <p className="text-xs text-stone-400">{file.name}</p>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </button>
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-600">
          <XCircle size={12} /> {error}
        </p>
      )}
      {value && (
        <p className="break-all text-xs text-stone-500">
          URL tersimpan:{" "}
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-[#6b7f5a] underline">
            {value}
          </a>
        </p>
      )}
      {/* Hidden input membawa URL ke Server Action */}
      <input type="hidden" name="heroImageUrl" value={value} />
    </div>
  );
}

// ── Form utama ────────────────────────────────────────────────────────────────

const initialState: CreateInvitationState = {};

export function InvitationForm({ tiers }: { tiers: { id: number; name: string; code: string }[] }) {
  const [state, formAction, pending] = useActionState(createInvitation, initialState);

  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [slug, setSlug] = useState("");
  const [templateKey, setTemplateKey] = useState("");
  const [openingText, setOpeningText] = useState("");
  const [heroUrl, setHeroUrl] = useState("");

  // Auto-generate slug dari nama mempelai
  useEffect(() => {
    if (!slugManual && groomName && brideName) {
      setSlug(toSlug(`${groomName}-dan-${brideName}`));
    }
  }, [groomName, brideName, slugManual]);

  function handleTemplateChange(key: string) {
    setTemplateKey(key);
    setOpeningText(TEMPLATES[key]?.text ?? "");
  }

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {/* Error global */}
      {state.message && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </div>
      )}

      {/* ─ Informasi Dasar ─────────────────────────────────────────────── */}
      <section className="flex flex-col gap-5">
        <SectionTitle icon={FileText}>Informasi Dasar</SectionTitle>

        <Field label="Judul Undangan" required error={state.errors?.title}>
          <input
            name="title"
            placeholder="Pernikahan Andi & Siti"
            className={inputCls}
            required
          />
        </Field>

        <Field
          label="Slug (URL Undangan)"
          hint={`Akan diakses di: sentuhundang.com/${slug || "nama-mempelai"}`}
          required
          error={state.errors?.slug}
        >
          <div className="flex gap-2">
            <input
              name="slug"
              value={slug}
              onChange={(e) => {
                setSlugManual(true);
                setSlug(e.target.value);
              }}
              placeholder="andi-dan-siti"
              className={`${inputCls} flex-1 font-mono`}
              required
            />
            {slugManual && (
              <button
                type="button"
                onClick={() => setSlugManual(false)}
                className="shrink-0 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-600 transition hover:bg-stone-100"
              >
                Auto
              </button>
            )}
          </div>
        </Field>

        <Field label="Paket / Tier" required error={state.errors?.tierId}>
          <select name="tierId" className={selectCls} defaultValue="1">
            {tiers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </Field>
      </section>

      {/* ─ Mempelai Pria ───────────────────────────────────────────────── */}
      <section className="flex flex-col gap-5">
        <SectionTitle icon={User}>Mempelai Pria</SectionTitle>

        <Field label="Nama Lengkap" required error={state.errors?.groomName}>
          <input
            name="groomName"
            value={groomName}
            onChange={(e) => setGroomName(e.target.value)}
            placeholder="H. Ahmad Fauzi, S.T."
            className={inputCls}
            required
          />
        </Field>

        <Field
          label="Nama Orang Tua (Bapak & Ibu)"
          hint="Sertakan gelar jika ada, misal: Bpk. H. Dede Sopyan & Ibu Hj. Neng Ruheni"
          error={state.errors?.groomParentsLine}
        >
          <input
            name="groomParentsLine"
            placeholder="Putra Bpk. H. Dede Sopyan & Ibu Hj. Neng Ruheni"
            className={inputCls}
          />
        </Field>

        <Field
          label="Silsilah / Urutan Kelahiran"
          hint="Misal: putra pertama, putra kedua"
          error={state.errors?.groomChildOrder}
        >
          <input
            name="groomChildOrder"
            placeholder="Putra pertama"
            className={inputCls}
          />
        </Field>
      </section>

      {/* ─ Mempelai Wanita ─────────────────────────────────────────────── */}
      <section className="flex flex-col gap-5">
        <SectionTitle icon={User}>Mempelai Wanita</SectionTitle>

        <Field label="Nama Lengkap" required error={state.errors?.brideName}>
          <input
            name="brideName"
            value={brideName}
            onChange={(e) => setBrideName(e.target.value)}
            placeholder="dr. Siti Nurhaliza"
            className={inputCls}
            required
          />
        </Field>

        <Field
          label="Nama Orang Tua (Bapak & Ibu)"
          hint="Sertakan gelar jika ada"
          error={state.errors?.brideParentsLine}
        >
          <input
            name="brideParentsLine"
            placeholder="Putri Bpk. H. Ujang Sutisna & Ibu Hj. Tati Rohaeti"
            className={inputCls}
          />
        </Field>

        <Field
          label="Silsilah / Urutan Kelahiran"
          error={state.errors?.brideChildOrder}
        >
          <input
            name="brideChildOrder"
            placeholder="Putri kedua"
            className={inputCls}
          />
        </Field>
      </section>

      {/* ─ Informasi Acara ─────────────────────────────────────────────── */}
      <section className="flex flex-col gap-5">
        <SectionTitle icon={CalendarDays}>Informasi Acara</SectionTitle>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Tanggal Acara" required error={state.errors?.eventDate}>
            <input name="eventDate" type="date" className={inputCls} required />
          </Field>
          <Field label="Jam Acara" error={state.errors?.eventTime}>
            <input name="eventTime" type="time" className={inputCls} />
          </Field>
        </div>

        <Field label="Nama Venue / Gedung" required error={state.errors?.venueName}>
          <input
            name="venueName"
            placeholder="Gedung Serba Guna Garut Kota"
            className={inputCls}
            required
          />
        </Field>

        <Field label="Alamat Lengkap" error={state.errors?.venueAddress}>
          <textarea
            name="venueAddress"
            placeholder="Jl. Ahmad Yani No. 1, Garut, Jawa Barat"
            rows={2}
            className={`${inputCls} resize-none`}
          />
        </Field>

        <Field
          label="Link Google Maps"
          error={state.errors?.mapUrl}
        >
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <MapPin size={14} className="text-stone-400" />
            </span>
            <input
              name="mapUrl"
              type="url"
              placeholder="https://maps.google.com/..."
              className={`${inputCls} pl-8`}
            />
          </div>
        </Field>
      </section>

      {/* ─ Konten & Budaya ─────────────────────────────────────────────── */}
      <section className="flex flex-col gap-5">
        <SectionTitle icon={Users}>Konten & Budaya</SectionTitle>

        <Field
          label="Template Pesan Pembuka"
          hint="Pilih template lalu sesuaikan teks di bawah"
        >
          <select
            className={selectCls}
            value={templateKey}
            onChange={(e) => handleTemplateChange(e.target.value)}
          >
            {Object.entries(TEMPLATES).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Teks Pembuka / Ayat"
          hint="Bisa diedit bebas. Kalimat ini akan tampil di awal undangan."
        >
          <textarea
            name="openingReligiousText"
            value={openingText}
            onChange={(e) => setOpeningText(e.target.value)}
            rows={4}
            placeholder="Bismillahirrahmanirrahim…"
            className={`${inputCls} resize-none`}
          />
        </Field>

        <input type="hidden" name="basaSundaLemesKey" value={templateKey} />
      </section>

      {/* ─ Foto Utama ──────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-5">
        <SectionTitle icon={ImagePlus}>Foto Utama (Hero Image)</SectionTitle>
        <p className="text-xs text-stone-500">
          Foto akan diunggah langsung ke penyimpanan cloud. URL disimpan di database, bukan file-nya.
        </p>
        <HeroUploader value={heroUrl} onChange={setHeroUrl} />
        <FieldError msgs={state.errors?.heroImageUrl} />
      </section>

      {/* ─ Submit ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-end gap-3 border-t border-stone-200 pt-6">
        <a
          href="/admin/invitations"
          className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-stone-700 transition hover:bg-stone-50"
        >
          Batal
        </a>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-lg bg-[#6b7f5a] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#5a6b4b] disabled:opacity-60"
        >
          {pending && <Loader2 size={14} className="animate-spin" />}
          {pending ? "Menyimpan…" : "Simpan Undangan"}
        </button>
      </div>
    </form>
  );
}
