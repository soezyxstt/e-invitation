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
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary-cream px-6 text-center">
      <div className="relative mb-8 flex h-32 w-32 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-muted-gold/20" />
        <div className="absolute inset-3 rounded-full border border-muted-gold/15" />
        <svg
          viewBox="0 0 32 32"
          className="h-12 w-12 fill-none stroke-muted-gold stroke-[1.5]"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 27S4 20 4 11a6 6 0 0 1 12 0l-2 3 4-1-2 3 4-1-2 4 5-5A6 6 0 0 1 28 11c0 9-12 16-12 16Z" />
        </svg>
      </div>

      <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-wood-brown/75">
        Terjadi Kesalahan
      </p>

      <h1 className="mt-3 font-serif text-3xl font-light text-wood-brown sm:text-4xl">
        Sesuatu tidak berjalan
        <br />
        sebagaimana mestinya
      </h1>

      <p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-relaxed text-wood-brown/78">
        Kami mohon maaf atas gangguan ini. Tim kami sudah diberitahu. Silakan coba
        muat ulang halaman atau hubungi admin jika masalah berlanjut.
      </p>

      {error.digest && (
        <p className="mt-3 font-mono text-[10px] text-wood-brown/55">
          Kode: {error.digest}
        </p>
      )}

      <div className="my-8 flex items-center gap-4">
        <div className="h-px w-16 bg-muted-gold/50" />
        <div className="h-1.5 w-1.5 rounded-full bg-muted-gold/60" />
        <div className="h-px w-16 bg-muted-gold/50" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-wood-brown px-7 py-3 font-sans text-sm tracking-wide text-primary-cream shadow-sm transition hover:bg-wood-brown/90"
        >
          Coba Lagi
        </button>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-muted-gold/40 bg-white px-7 py-3 font-sans text-sm tracking-wide text-wood-brown shadow-sm transition hover:bg-primary-cream"
        >
          Kembali ke Beranda
        </a>
      </div>

      <p className="mt-12 font-sans text-[10px] tracking-widest text-muted-gold/30">
        Sentuh Undang — Undangan Digital Garut
      </p>
    </div>
  );
}
