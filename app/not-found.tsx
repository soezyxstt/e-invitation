import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary-cream px-6 text-center">
      <div className="relative mb-8 flex h-32 w-32 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-muted-gold/20" />
        <div className="absolute inset-3 rounded-full border border-muted-gold/15" />
        <span className="font-serif text-5xl font-light text-muted-gold">?</span>
      </div>

      <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-wood-brown/75">
        404 — Halaman Tidak Ditemukan
      </p>

      <h1 className="mt-3 font-serif text-3xl font-light text-wood-brown sm:text-4xl">
        Maaf, halaman ini
        <br />
        tidak ada
      </h1>

      <p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-relaxed text-wood-brown/78">
        Mungkin link sudah berubah atau undangan yang Anda cari telah dipindahkan. Silakan
        hubungi pengirim undangan untuk mendapatkan link terbaru.
      </p>

      <div className="my-8 flex items-center gap-4">
        <div className="h-px w-16 bg-muted-gold/50" />
        <div className="h-1.5 w-1.5 rounded-full bg-muted-gold/60" />
        <div className="h-px w-16 bg-muted-gold/50" />
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full border border-muted-gold/40 bg-wood-brown px-7 py-3 font-sans text-sm tracking-wide text-primary-cream shadow-sm transition hover:bg-wood-brown/90"
      >
        Kembali ke Beranda
      </Link>

      <p className="mt-12 font-sans text-[10px] tracking-widest text-muted-gold/30">
        Sentuh Undang — Undangan Digital Garut
      </p>
    </div>
  );
}
