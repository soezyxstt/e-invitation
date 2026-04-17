import Link from "next/link";

export default function InvitationNotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-b from-[#fdfbf7] via-primary-cream to-[#eef4ef] px-6 text-center">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40vh] bg-radial-[ellipse_at_50%_0%] from-muted-gold/14 via-sage-green/[0.07] to-transparent" />

      <div className="relative z-10 mb-8 flex h-32 w-32 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-muted-gold/25" />
        <div className="absolute inset-3 rounded-full border border-muted-gold/20" />
        <svg
          viewBox="0 0 48 48"
          className="relative h-14 w-14"
          fill="none"
          aria-hidden
        >
          <circle
            cx="24"
            cy="24"
            r="10"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-gold/50"
          />
          <circle
            cx="24"
            cy="24"
            r="5"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-muted-gold/70"
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 24 + 10 * Math.cos(rad);
            const y1 = 24 + 10 * Math.sin(rad);
            const x2 = 24 + 18 * Math.cos(rad);
            const y2 = 24 + 18 * Math.sin(rad);
            return (
              <line
                key={deg}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="0.75"
                className="text-muted-gold/35"
              />
            );
          })}
        </svg>
      </div>

      <p className="relative z-10 font-sans text-[10px] uppercase tracking-[0.45em] text-wood-brown/55">
        Undangan Tidak Ditemukan
      </p>

      <h1 className="relative z-10 mt-3 font-serif text-3xl font-light text-wood-brown sm:text-4xl">
        Undangan ini tidak
        <br />
        tersedia
      </h1>

      <p className="relative z-10 mx-auto mt-5 max-w-xs font-sans text-sm leading-relaxed text-wood-brown/65">
        Link undangan mungkin salah ketik, sudah tidak aktif, atau belum dipublikasikan oleh
        pengirim.
      </p>

      <p className="relative z-10 mt-3 font-sans text-sm text-wood-brown/62">
        Pastikan Anda membuka link yang benar dari pengirim undangan.
      </p>

      <div className="relative z-10 my-8 flex items-center gap-4">
        <div className="h-px w-16 bg-linear-to-r from-transparent to-muted-gold/40" />
        <div className="h-1.5 w-1.5 rounded-full bg-muted-gold/50" />
        <div className="h-px w-16 bg-linear-to-l from-transparent to-muted-gold/40" />
      </div>

      <Link
        href="/"
        className="relative z-10 inline-flex items-center gap-2 rounded-full border border-muted-gold/35 bg-white/90 px-7 py-3 font-sans text-sm tracking-wide text-wood-brown shadow-sm transition hover:bg-primary-cream"
      >
        Kembali ke Beranda
      </Link>

      <p className="relative z-10 mt-12 font-sans text-[10px] tracking-widest text-wood-brown/40">
        Sentuh Undang · Undangan Digital Garut
      </p>
    </div>
  );
}
