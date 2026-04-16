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
    bgColor: "bg-primary-cream/95",
    accentColor: "text-muted-gold",
    borderColor: "border-wood-brown/25",
  },
  {
    id: "estetika",
    eyebrow: "Estetika Premium",
    title: "Motif Batik\nGarutan Asli",
    description:
      "Ornamen digital terinspirasi langsung dari motif Batik Garutan yang khas — merak ngibing, rereng, dan kembang latar — dihadirkan sebagai elemen dekoratif yang anggun.",
    highlight: "Warisan yang terus hidup",
    ornament: "❋",
    bgColor: "bg-wood-brown",
    accentColor: "text-muted-gold",
    borderColor: "border-muted-gold/20",
    isDark: true,
  },
  {
    id: "mc",
    eyebrow: "Fitur Eksklusif",
    title: "Dashboard\nSinergi MC",
    description:
      "Khusus Tier Kasep & Sultan: MC mendapat akses dashboard real-time `/[slug]/mc` untuk memonitor rundown, konfirmasi kehadiran tamu, dan live greeting wall saat hari H.",
    highlight: "Hari H tanpa hambatan",
    ornament: "◈",
    bgColor: "bg-wood-brown/12",
    accentColor: "text-sage-green",
    borderColor: "border-wood-brown/25",
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
        <FadeInSection className="mb-16">
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

        {/* Feature cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {features.map((f, i) => (
            <FadeInSection key={f.id} delay={i * 0.12}>
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-8 ${f.bgColor} ${f.borderColor} group`}
              >
                {/* Ornament */}
                <div
                  className={`pointer-events-none absolute right-8 top-6 select-none font-serif text-6xl opacity-5 ${
                    f.isDark ? "text-muted-gold" : "text-wood-brown"
                  }`}
                  style={{ fontFamily: "var(--font-serif)" }}
                  aria-hidden
                >
                  {f.ornament}
                </div>

                <div className="flex flex-1 flex-col gap-5">
                  {/* Eyebrow */}
                  <span
                    className={`text-xs tracking-[0.3em] uppercase ${f.accentColor}`}
                    style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
                  >
                    {f.eyebrow}
                  </span>

                  {/* Title */}
                  <h3
                    className={`whitespace-pre-line font-serif text-3xl leading-tight ${
                      f.isDark ? "text-primary-cream" : "text-wood-brown"
                    }`}
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {f.title}
                  </h3>

                  {/* Gold divider */}
                  <div className="batik-divider" />

                  {/* Description */}
                  <p
                    className={`flex-1 text-sm leading-relaxed ${
                      f.isDark ? "text-primary-cream/60" : "text-wood-brown/80"
                    }`}
                    style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
                  >
                    {f.description}
                  </p>

                  {/* Highlight quote */}
                  <div
                    className={`border-l-2 pl-4 ${
                      f.isDark ? "border-muted-gold/40" : "border-muted-gold/50"
                    }`}
                  >
                    <p
                      className={`font-serif text-base italic ${
                        f.isDark ? "text-muted-gold/80" : "text-muted-gold"
                      }`}
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      &ldquo;{f.highlight}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Batik-inspired decorative band */}
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
                  Demo interaktif tersedia — rasakan pengalaman seperti tamu undangan nyata.
                </p>
              </div>
              <a
                href="https://wa.me/6281234567890?text=Saya%20ingin%20melihat%20demo%20undangan%20SentuhUndang"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-wood-brown px-7 py-3.5 text-sm font-medium text-primary-cream transition-colors hover:bg-wood-brown/90"
              >
                Minta Demo Gratis
              </a>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
