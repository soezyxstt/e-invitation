"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-b from-[#fdfbf7] via-primary-cream to-[#f5ebe8] px-6 text-center">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38vh] bg-radial-[ellipse_at_50%_0%] from-rose-200/18 via-muted-gold/[0.09] to-transparent" />

      <div className="relative mb-8 flex h-32 w-32 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-muted-gold/28" />
        <div className="absolute inset-3 rounded-full border border-muted-gold/18" />
        <svg
          viewBox="0 0 32 32"
          className="h-12 w-12 fill-none stroke-muted-gold/90 stroke-[1.5]"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 27S4 20 4 11a6 6 0 0 1 12 0l-2 3 4-1-2 3 4-1-2 4 5-5A6 6 0 0 1 28 11c0 9-12 16-12 16Z" />
        </svg>
      </div>

      <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-wood-brown/55">
        Terjadi Kesalahan
      </p>

      <h1 className="mt-3 font-serif text-3xl font-light text-wood-brown sm:text-4xl">
        Sesuatu tidak berjalan
        <br />
        sebagaimana mestinya
      </h1>

      <p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-relaxed text-wood-brown/65">
        Kami mohon maaf atas gangguan ini. Silakan coba muat ulang halaman atau hubungi admin jika
        masalah berlanjut.
      </p>

      {error.digest && (
        <p className="mt-3 font-mono text-[10px] text-wood-brown/50">
          Kode: {error.digest}
        </p>
      )}

      <div className="my-8 flex items-center gap-4">
        <div className="h-px w-16 bg-muted-gold/45" />
        <div className="h-1.5 w-1.5 rounded-full bg-muted-gold/55" />
        <div className="h-px w-16 bg-muted-gold/45" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full border border-muted-gold/35 bg-white/90 px-7 py-3 font-sans text-sm tracking-wide text-wood-brown shadow-sm transition hover:bg-primary-cream"
        >
          Coba Lagi
        </button>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-sage-green/35 bg-sage-green px-7 py-3 font-sans text-sm tracking-wide text-white shadow-sm transition hover:bg-sage-green/90"
        >
          Kembali ke Beranda
        </a>
      </div>

      <p className="mt-12 font-sans text-[10px] tracking-widest text-wood-brown/40">
        Sentuh Undang — Undangan Digital Garut
      </p>
    </div>
  );
}
