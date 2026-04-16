import { FadeInSection } from "./FadeInSection";

const features = [
  {
    id: "budaya",
    eyebrow: "Kearifan Lokal",
    title: "Tatakrama\nBasa Sunda Lemes",
    description:
      "Setiap undangan ditulis dalam Basa Sunda Lemes yang santun, lengkap dengan penulisan Gelar Keturunan (silsilah keluarga) yang tepat dan hormat — sesuai adat istiadat Garut.",
    highlight: "Someah hadé ka semah",
    ornament: "ᮞᮧᮙᮦᮃᮂ",
    accentColor: "text-muted-gold",
    isDark: false,
  },
  {
    id: "estetika",
    eyebrow: "Estetika Premium",
    title: "Motif Batik\nGarutan Asli",
    description:
      "Ornamen digital terinspirasi langsung dari motif Batik Garutan yang khas — merak ngibing, rereng, dan kembang latar — dihadirkan sebagai elemen dekoratif yang anggun.",
    highlight: "Warisan yang terus hidup",
    ornament: "❋",
    accentColor: "text-muted-gold",
    isDark: true,
  },
  {
    id: "mc",
    eyebrow: "Fitur Eksklusif",
    title: "Kendali Penuh\ndi Hari Spesial",
    description:
      "Khusus Paket Istimewa & Sultan: tersedia halaman khusus untuk MC agar rundown acara, konfirmasi tamu, dan ucapan selamat bisa dipantau langsung saat hari pernikahan.",
    highlight: "Hari H tanpa hambatan",
    ornament: "◈",
    accentColor: "text-sage-green",
    isDark: false,
  },
];

export function Features() {
  return (
    <section id="keunggulan" className="relative overflow-hidden bg-primary-cream py-28">
      {/* Subtle pattern background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            var(--color-wood-brown) 0px,
            var(--color-wood-brown) 1px,
            transparent 1px,
            transparent 14px
          )`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section header */}
        <FadeInSection className="mb-20">
          <div className="mb-5 flex items-center gap-4">
            <div className="h-px w-10 bg-muted-gold/50" />
            <span
              className="text-xs tracking-[0.35em] uppercase text-muted-gold"
              style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
            >
              Garut Pride
            </span>
          </div>
          <div className="grid items-end gap-8 lg:grid-cols-2">
            <h2
              className="font-serif text-4xl leading-tight text-wood-brown sm:text-5xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Tilu Kaunggulan
              <br />
              <span className="italic text-muted-gold">nu Ngabédakeun</span>
            </h2>
            <p
              className="max-w-md leading-relaxed text-wood-brown/80"
              style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
            >
              SentuhUndang bukan sekadar undangan digital biasa. Kami membangun
              sebuah karya yang merayakan identitas, tradisi, dan keindahan
              Tatar Garut.
            </p>
          </div>
        </FadeInSection>

        {/* Feature strips */}
        <div className="flex flex-col divide-y divide-wood-brown/10">
          {features.map((f, i) => (
            <FadeInSection key={f.id} delay={i * 0.12}>
              <div
                className={`group relative flex flex-col lg:flex-row gap-8 lg:gap-16 py-12 lg:py-16 transition-colors duration-300 ${
                  f.isDark
                    ? "lg:-mx-10 lg:px-10 rounded-none hover:bg-wood-brown/[0.04]"
                    : "hover:bg-wood-brown/[0.03]"
                }`}
              >
                {/* Number & eyebrow */}
                <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-3 lg:w-40 shrink-0">
                  <span
                    className="font-serif text-5xl lg:text-7xl text-wood-brown/8 leading-none tabular-nums"
                    style={{ fontFamily: "var(--font-serif)" }}
                    aria-hidden
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={`text-[10px] tracking-[0.35em] uppercase ${f.accentColor} whitespace-nowrap`}
                    style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
                  >
                    {f.eyebrow}
                  </span>
                </div>

                {/* Title */}
                <div className="lg:w-64 shrink-0">
                  <h3
                    className="whitespace-pre-line font-serif text-3xl lg:text-4xl leading-tight text-wood-brown"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {f.title}
                  </h3>

                  {/* Decorative ornament */}
                  <span
                    className="mt-4 block font-serif text-4xl text-wood-brown/10 leading-none select-none"
                    style={{ fontFamily: "var(--font-serif)" }}
                    aria-hidden
                  >
                    {f.ornament}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between gap-6">
                  <p
                    className="text-base leading-relaxed text-wood-brown/75"
                    style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
                  >
                    {f.description}
                  </p>

                  {/* Highlight quote */}
                  <div className="flex items-center gap-4">
                    <div className={`h-px flex-1 max-w-[3rem] bg-muted-gold/30`} />
                    <p
                      className={`font-serif text-base italic ${f.accentColor}`}
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      &ldquo;{f.highlight}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Right edge accent — visible on hover */}
                <div
                  className={`absolute right-0 top-1/2 -translate-y-1/2 h-12 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    f.accentColor === "text-sage-green"
                      ? "bg-sage-green/40"
                      : "bg-muted-gold/40"
                  }`}
                />
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Bottom CTA band */}
        <FadeInSection delay={0.4} className="mt-20">
          <div className="relative overflow-hidden rounded-2xl border border-wood-brown/20 bg-wood-brown/[0.06] px-8 py-7">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg, var(--color-muted-gold) 0px, var(--color-muted-gold) 1px, transparent 1px, transparent 20px
                ), repeating-linear-gradient(
                  90deg, var(--color-muted-gold) 0px, var(--color-muted-gold) 1px, transparent 1px, transparent 20px
                )`,
              }}
            />
            <div className="relative flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div>
                <p
                  className="font-serif text-xl text-wood-brown"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Ingin melihat contoh undangan langsung?
                </p>
                <p
                  className="mt-1 text-sm text-wood-brown/80"
                  style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
                >
                  Preview interaktif tersedia — rasakan pengalaman seperti tamu undangan nyata.
                </p>
              </div>
              <a
                href="#preview"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-wood-brown px-7 py-3.5 text-sm font-medium text-primary-cream transition-colors hover:bg-wood-brown/90"
              >
                Lihat Preview Desain
              </a>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
