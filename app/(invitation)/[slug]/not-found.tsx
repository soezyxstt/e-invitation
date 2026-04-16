import Link from "next/link";

export default function InvitationNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-surface-night px-6 text-center">
      {/* Ambient glow */}
      <div className="bg-radial-muted-gold-soft pointer-events-none absolute inset-x-0 top-0 h-[40vh]" />

      {/* Floating petals */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { x: "15%", y: "20%", size: 3, delay: "0s" },
          { x: "75%", y: "35%", size: 2, delay: "1.5s" },
          { x: "35%", y: "70%", size: 4, delay: "0.8s" },
          { x: "85%", y: "65%", size: 2, delay: "2.2s" },
          { x: "55%", y: "15%", size: 3, delay: "3s" },
        ].map(({ x, y, size, delay }, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-muted-gold/20"
            style={{
              left: x,
              top: y,
              width: size * 4,
              height: size * 4,
              animation: `pulse 4s ease-in-out ${delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Ornament ring */}
      <div className="relative z-10 mb-8 flex h-36 w-36 items-center justify-center">
        <div
          className="absolute inset-0 rounded-full border border-muted-gold/20"
          style={{ animation: "spin 20s linear infinite" }}
        />
        <div className="absolute inset-4 rounded-full border border-muted-gold/10" />
        <div className="flex flex-col items-center">
          {/* Simple flower/ring SVG */}
          <svg
            viewBox="0 0 48 48"
            className="h-14 w-14"
            fill="none"
          >
            <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1" className="text-muted-gold opacity-50" />
            <circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="1.5" className="text-gold-shine opacity-60" />
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
                  className="text-muted-gold opacity-30"
                />
              );
            })}
          </svg>
        </div>
      </div>

      <p className="relative z-10 font-sans text-[10px] uppercase tracking-[0.45em] text-muted-gold/60">
        Undangan Tidak Ditemukan
      </p>

      <h1 className="relative z-10 mt-3 font-serif text-3xl font-light text-primary-cream sm:text-4xl">
        Undangan ini tidak<br />tersedia
      </h1>

      <p className="relative z-10 mx-auto mt-5 max-w-xs font-sans text-sm leading-relaxed text-wood-brown/75">
        Link undangan mungkin salah ketik, sudah tidak aktif,
        atau belum dipublikasikan oleh pengirim.
      </p>

      <p className="relative z-10 mt-3 font-sans text-sm text-wood-brown/75">
        Pastikan Anda membuka link yang benar dari pengirim undangan.
      </p>

      {/* Gold divider */}
      <div className="relative z-10 my-8 flex items-center gap-4">
        <div className="h-px w-16 bg-linear-to-r from-transparent to-muted-gold/30" />
        <div className="h-1.5 w-1.5 rounded-full bg-muted-gold/50" />
        <div className="h-px w-16 bg-linear-to-l from-transparent to-muted-gold/30" />
      </div>

      <Link
        href="/"
        className="relative z-10 inline-flex items-center gap-2 rounded-full border border-muted-gold/30 bg-muted-gold/10 px-7 py-3 font-sans text-sm tracking-wide text-muted-gold transition hover:bg-muted-gold/20"
      >
        Kembali ke Beranda
      </Link>

      <p className="relative z-10 mt-12 font-sans text-[10px] tracking-widest text-muted-gold/20">
        Sentuh Undang · Undangan Digital Garut
      </p>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } }
      `}</style>
    </div>
  );
}
