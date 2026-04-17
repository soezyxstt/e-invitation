import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-b from-[#fdfbf7] via-primary-cream to-[#eef4ef] px-6 text-center">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40vh] bg-radial-[ellipse_at_50%_0%] from-muted-gold/14 via-sage-green/[0.08] to-transparent" />

      <div className="relative mb-8 flex h-32 w-32 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-muted-gold/28" />
        <div className="absolute inset-3 rounded-full border border-muted-gold/18" />
        <span className="font-serif text-5xl font-light text-muted-gold/90">?</span>
      </div>

      <p className="font-sans text-[10px] uppercase tracking-[0.45em] text-wood-brown/55">
        404 — Halaman Tidak Ditemukan
      </p>

      <h1 className="mt-3 font-serif text-3xl font-light text-wood-brown sm:text-4xl">
        Maaf, halaman ini
        <br />
        tidak ada
      </h1>

      <p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-relaxed text-wood-brown/65">
        Mungkin link sudah berubah atau halaman yang Anda cari telah dipindahkan. Silakan periksa
        alamat atau kembali ke beranda.
      </p>

      <div className="my-8 flex items-center gap-4">
        <div className="h-px w-16 bg-muted-gold/45" />
        <div className="h-1.5 w-1.5 rounded-full bg-muted-gold/55" />
        <div className="h-px w-16 bg-muted-gold/45" />
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full border border-muted-gold/35 bg-white/90 px-7 py-3 font-sans text-sm tracking-wide text-wood-brown shadow-sm transition hover:bg-primary-cream"
      >
        Kembali ke Beranda
      </Link>

      <p className="mt-12 font-sans text-[10px] tracking-widest text-wood-brown/40">
        Sentuh Undang — Undangan Digital Garut
      </p>
    </div>
  );
}
