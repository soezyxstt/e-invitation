import { FadeInSection } from "./FadeInSection";

const features = [
  {
    id: "budaya",
    title: "Bahasa yang santun.",
    description:
      "Pilihan teks Basa Sunda Lemes, dengan ruang untuk nama dan gelar keluarga.",
  },
  {
    id: "estetika",
    title: "Sentuhan Batik Garutan.",
    description:
      "Ornamen terinspirasi Batik Garutan untuk melengkapi foto dan cerita kalian.",
  },
  {
    id: "mc",
    title: "Bantu MC mengikuti acara.",
    description:
      "Pantau susunan acara, konfirmasi kehadiran, dan ucapan tamu lewat halaman MC. Tersedia di paket Istimewa dan Sultan.",
  },
];

export function Features() {
  return (
    <section id="keunggulan" className="bg-primary-cream py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <FadeInSection className="mb-16">
          <div className="grid items-end gap-6 lg:grid-cols-2">
            <h2
              className="font-serif text-4xl leading-tight text-wood-brown sm:text-5xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Akrab dengan tradisi.
            </h2>
            <p
              className="max-w-md leading-relaxed text-wood-brown/80"
              style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
            >
              Sentuhan Sunda dalam bahasa dan desain, dengan fitur untuk membantu
              persiapan acara.
            </p>
          </div>
        </FadeInSection>

        <div className="divide-y divide-wood-brown/10">
          {features.map((feature, index) => (
            <FadeInSection key={feature.id} delay={index * 0.12}>
              <div className="grid gap-5 py-10 lg:grid-cols-2 lg:gap-16 lg:py-12">
                <h3
                  className="font-serif text-3xl leading-tight text-wood-brown"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="max-w-xl text-base leading-relaxed text-wood-brown/75"
                  style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
                >
                  {feature.description}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.4} className="mt-12">
          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-wood-brown/15 px-7 py-7 sm:flex-row sm:items-center">
            <p
              className="text-base text-wood-brown/80"
              style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
            >
              Lihat tampilan undangan sebelum memilih.
            </p>
            <a
              href="#preview"
              className="inline-flex shrink-0 items-center rounded-full bg-wood-brown px-7 py-3.5 text-sm font-medium text-primary-cream transition-colors hover:bg-wood-brown/90"
            >
              Lihat desain
            </a>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
