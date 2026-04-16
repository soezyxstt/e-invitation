"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Star, Crown, Zap } from "lucide-react";
import { FadeInSection } from "./FadeInSection";
import Link from "next/link";

const tiers = [
  {
    id: 1,
    name: "Simpel",
    subtitle: "Bersih & Cepat",
    price: "149.000",
    originalPrice: "299.000",
    icon: Zap,
    accentClass: "text-wood-brown/80",
    description:
      "Cocok untuk yang ingin undangan digital rapi, langsung disebar tanpa repot.",
    features: [
      "Informasi pernikahan lengkap",
      "Link undangan personal",
      "Konfirmasi kehadiran (RSVP)",
      "Pilihan teks Basa Sunda",
      "Nama & gelar keluarga",
      "Bagikan via WhatsApp & media sosial",
    ],
    cta: "Pilih Simpel",
    highlighted: false,
  },
  {
    id: 2,
    name: "Elegan",
    subtitle: "Cantik & Berkesan",
    price: "199.000",
    originalPrice: "399.000",
    icon: Star,
    accentClass: "text-muted-gold",
    description:
      "Undangan dengan sentuhan Batik Garutan, galeri foto kenangan, dan musik latar romantis.",
    features: [
      "Semua fitur Simpel",
      "Ornamen Batik Garutan",
      "Galeri foto kenangan (maks. 10)",
      "Musik latar (Akad, Beautiful in White, dll.)",
      "Nama tamu personal di undangan",
      "5 pilihan tampilan estetik",
    ],
    cta: "Pilih Elegan",
    highlighted: false,
  },
  {
    id: 3,
    name: "Istimewa",
    subtitle: "Lengkap & Elegan",
    price: "275.000",
    originalPrice: "549.000",
    icon: Sparkles,
    accentClass: "text-sage-green",
    description:
      "Pengalaman undangan yang utuh: kisah perjalanan cinta, buku tamu digital, dan akses khusus untuk MC.",
    features: [
      "Semua fitur Elegan",
      "Kisah Perjalanan Cinta",
      "Buku Tamu Digital interaktif",
      "Halaman khusus untuk MC",
      "Mode ringan untuk jaringan lambat",
      "Dukungan prioritas via WhatsApp",
    ],
    cta: "Pilih Istimewa",
    highlighted: true,
  },
  {
    id: 4,
    name: "Sultan",
    subtitle: "Premium & Eksklusif",
    price: "325.000",
    originalPrice: "649.000",
    icon: Crown,
    accentClass: "text-wood-brown",
    description:
      "Undangan terlengkap: ucapan langsung dari tamu secara real-time, check-in via QR, video sinematik, dan domain khusus.",
    features: [
      "Semua fitur Istimewa",
      "Dinding ucapan langsung (Live Wall)",
      "Check-in tamu via QR Code",
      "Latar video sinematik",
      "Dukungan domain khusus",
      "Laporan kunjungan tamu",
    ],
    cta: "Pilih Sultan",
    highlighted: false,
  },
];

interface PricingProps {
  whatsappNumber: string;
}

export function Pricing({ whatsappNumber }: PricingProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  function buildWaLink(tierName: string) {
    const text = encodeURIComponent(
      `Halo Sentuh Undang, saya tertarik dengan Paket ${tierName}. Boleh minta info lebih lanjut? 🙏`
    );
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  }

  return (
    <section id="paket" className="relative overflow-hidden bg-primary-cream py-28">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -translate-y-1/2 translate-x-1/2 top-0 right-0 h-96 w-96 rounded-full bg-wood-brown/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 translate-y-1/2 -translate-x-1/2 rounded-full bg-sage-green/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section header */}
        <FadeInSection className="mb-16 text-center">
          <div className="mb-5 inline-flex items-center gap-3">
            <div className="h-px w-10 bg-muted-gold/50" />
            <span
              className="text-xs tracking-[0.35em] uppercase text-muted-gold"
              style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
            >
              4 Pilihan Paket
            </span>
            <div className="h-px w-10 bg-muted-gold/50" />
          </div>
          <h2
            className="font-serif text-4xl leading-tight text-wood-brown sm:text-5xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Temukan Paket
            <br />
            <span className="italic text-muted-gold">Sesuai Impian</span> Anda
          </h2>
          <p
            className="mt-5 mx-auto max-w-xl text-base leading-relaxed text-wood-brown/80"
            style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
          >
            Dari yang sederhana hingga serba eksklusif — setiap paket dirancang
            untuk menghadirkan pengalaman undangan digital terbaik.
          </p>

          {/* Promo banner */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted-gold/10 border border-muted-gold/30 px-5 py-2">
            <span className="text-muted-gold text-xs font-semibold tracking-wide uppercase">🎉 Promo Peluncuran</span>
            <span className="text-wood-brown/70 text-xs" style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}>Hemat 50% untuk semua paket — terbatas!</span>
          </div>
        </FadeInSection>

        {/* Tier cards grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            const isHovered = hoveredId === tier.id;
            const isHighlighted = tier.highlighted;

            return (
              <FadeInSection key={tier.id} delay={i * 0.1}>
                <motion.div
                  onMouseEnter={() => setHoveredId(tier.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  animate={{
                    y: isHovered ? -6 : 0,
                    scale: isHovered ? 1.01 : 1,
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex h-full flex-col rounded-3xl p-6 transition-shadow duration-300 ${
                    isHighlighted
                      ? "bg-wood-brown text-primary-cream shadow-2xl shadow-wood-brown/30 ring-1 ring-muted-gold/30"
                      : "border border-wood-brown/25 bg-white text-wood-brown hover:shadow-xl hover:shadow-wood-brown/10"
                  }`}
                >
                  {/* Popular badge */}
                  {isHighlighted && (
                    <div className="absolute inset-x-0 -top-3.5 flex justify-center">
                      <span className="rounded-full bg-muted-gold px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-deep-charcoal">
                        Paling Populer
                      </span>
                    </div>
                  )}

                  {/* Icon + Tier name */}
                  <div className="mb-5 flex items-start justify-between">
                    <div>
                      <div
                        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
                          isHighlighted ? "bg-muted-gold/20" : "bg-wood-brown/12"
                        }`}
                      >
                        <Icon
                          size={18}
                          className={
                            isHighlighted ? "text-muted-gold" : tier.accentClass
                          }
                        />
                      </div>
                      <h3
                        className={`font-serif text-2xl leading-none ${
                          isHighlighted ? "text-primary-cream" : "text-wood-brown"
                        }`}
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {tier.name}
                      </h3>
                      <p
                        className={`mt-1 text-xs tracking-wider ${
                          isHighlighted ? "text-muted-gold/80" : "text-wood-brown/75"
                        }`}
                        style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
                      >
                        {tier.subtitle}
                      </p>
                    </div>

                    {/* Price with strikethrough */}
                    <div className="text-right">
                      <p
                        className={`text-xs line-through tabular-nums ${
                          isHighlighted ? "text-primary-cream/35" : "text-wood-brown/35"
                        }`}
                        style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
                      >
                        Rp{tier.originalPrice}
                      </p>
                      <span
                        className={`text-2xl font-semibold tabular-nums leading-none ${
                          isHighlighted ? "text-muted-gold" : "text-wood-brown"
                        }`}
                      >
                        <span className="text-sm font-normal">Rp</span>
                        {tier.price}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className={`mb-5 h-px ${
                      isHighlighted ? "bg-muted-gold/15" : "bg-wood-brown/18"
                    }`}
                  />

                  {/* Description */}
                  <p
                    className={`mb-5 text-sm leading-relaxed ${
                      isHighlighted ? "text-primary-cream/60" : "text-wood-brown/80"
                    }`}
                    style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
                  >
                    {tier.description}
                  </p>

                  {/* Features */}
                  <ul className="mb-6 flex flex-1 flex-col gap-2.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check
                          size={14}
                          className={`mt-0.5 shrink-0 ${
                            isHighlighted ? "text-muted-gold" : tier.accentClass
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            isHighlighted ? "text-primary-cream/75" : "text-wood-brown/85"
                          }`}
                          style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA button */}
                  <a
                    href={buildWaLink(tier.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block rounded-2xl py-3 text-center text-sm font-medium tracking-wide transition-all duration-300 ${
                      isHighlighted
                        ? "bg-muted-gold text-deep-charcoal hover:bg-muted-gold/90 hover:shadow-lg hover:shadow-muted-gold/25"
                        : "border border-wood-brown/25 bg-wood-brown/8 text-wood-brown hover:bg-wood-brown/15"
                    }`}
                  >
                    {tier.cta}
                  </a>
                </motion.div>
              </FadeInSection>
            );
          })}
        </div>

        {/* Bottom note */}
        <FadeInSection delay={0.4} className="mt-10 text-center">
          <p
            className="text-sm text-wood-brown/70"
            style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
          >
            Semua paket sudah termasuk hosting 1 tahun · Tanpa biaya bulanan ·{" "}
            <Link
              href="#"
              className="text-muted-gold underline underline-offset-2 hover:text-muted-gold/80"
            >
              Lihat perbandingan lengkap →
            </Link>
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}
