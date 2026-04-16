"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

const WEDDING_BG =
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1800&q=90&auto=format&fit=crop";

const MOCKUP_IMG =
  "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=90&auto=format&fit=crop";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-deep-charcoal"
    >
      {/* Parallax background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <Image
          src={WEDDING_BG}
          alt="Pernikahan Garut"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-deep-charcoal via-deep-charcoal/85 to-deep-charcoal/40" />
        <div className="absolute inset-0 bg-linear-to-t from-deep-charcoal/60 via-transparent to-transparent" />
      </motion.div>

      {/* Decorative gold lines */}
      <div className="absolute top-0 left-0 w-px h-full bg-linear-to-b from-transparent via-muted-gold/20 to-transparent" />
      <div className="absolute top-0 right-[42%] hidden h-full w-px bg-linear-to-b from-transparent via-muted-gold/10 to-transparent lg:block" />

      {/* Main content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-10 pt-24 pb-16 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        {/* Left: Editorial text */}
        <div className="flex flex-col gap-8">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="h-px w-12 bg-muted-gold" />
            <span
              className="text-muted-gold text-xs tracking-[0.35em] uppercase"
              style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
            >
              Platform Undangan Digital Garut
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <h1
              className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-primary-cream"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <span className="block">Setiap Kata</span>
              <span className="block text-muted-gold italic">Membawa Rasa</span>
              <span className="block text-primary-cream/70 text-4xl sm:text-5xl lg:text-6xl mt-1">
                Undangan Berkesan Selamanya
              </span>
            </h1>
          </motion.div>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-primary-cream/55 text-base sm:text-lg leading-relaxed max-w-md"
            style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
          >
            Undangan digital pernikahan dengan sentuhan{" "}
            <em className="text-muted-gold not-italic">Budaya Lokal</em> dan{" "}
            <em className="text-muted-gold not-italic">Campuran Modern</em> — tampil
            elegan, tersampaikan instan, dikenang selamanya.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="#paket"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-deep-charcoal px-8 py-4 text-sm font-medium tracking-wide text-primary-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-deep-charcoal/90 hover:shadow-lg hover:shadow-deep-charcoal/25"
            >
              Lihat Katalog Paket
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <a
              href={"https://wa.me/" + process.env.ADMIN_WHATSAPP + "?text=Halo%2C%20saya%20ingin%20konsultasi%20undangan%20digital%20SentuhUndang"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-primary-cream/20 px-8 py-4 text-sm tracking-wide text-primary-cream/80 transition-all duration-300 hover:border-muted-gold/60 hover:text-muted-gold"
            >
              <MessageCircle size={16} />
              Konsultasi via WA
            </a>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center gap-6 pt-2"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 overflow-hidden rounded-full border-2 border-deep-charcoal bg-wood-brown/15"
                />
              ))}
            </div>
            <div>
              <p className="text-primary-cream text-sm font-medium">
                250+ Pasang Bahagia
              </p>
              <p className="text-primary-cream/40 text-xs">
                dari seluruh Kabupaten Garut
              </p>
            </div>
            <div className="hidden h-8 w-px bg-primary-cream/10 sm:block" />
            <div className="hidden sm:block">
              <p className="text-primary-cream text-sm font-medium">4.9 ★</p>
              <p className="text-primary-cream/40 text-xs">Rating rata-rata</p>
            </div>
          </motion.div>
        </div>

        {/* Right: Phone mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="hidden lg:flex justify-center items-center relative"
        >
          {/* Decorative glow */}
          <div className="absolute w-80 h-80 rounded-full bg-muted-gold/5 blur-3xl" />

          {/* Phone frame */}
          <div className="relative w-64 xl:w-72">
            {/* Outer ring decorations */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-muted-gold/20" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full border border-muted-gold/10" />

            {/* Phone body */}
            <div className="relative rounded-[2.5rem] overflow-hidden border border-muted-gold/25 shadow-2xl shadow-black/60 bg-deep-charcoal">
              {/* Notch */}
              <div className="absolute top-0 inset-x-0 z-20 h-8 flex items-center justify-center">
                <div className="w-24 h-5 rounded-b-2xl bg-deep-charcoal" />
              </div>

              {/* Screen */}
              <div className="relative aspect-[9/19.5] overflow-hidden">
                <Image
                  src={MOCKUP_IMG}
                  alt="Contoh undangan Sultan"
                  loading="eager"
                  priority
                  fill
                  quality={85}
                  className="object-cover object-top"
                  sizes="(max-width: 1280px) 256px, 288px"
                />
                {/* Overlay content on mockup */}
                <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/70" />
                <div className="absolute bottom-0 inset-x-0 p-5 text-center">
                  <p className="text-primary-cream/60 text-[9px] tracking-[0.3em] uppercase mb-1">
                    The Wedding of
                  </p>
                  <p
                    className="text-primary-cream font-serif text-lg leading-tight"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Raka & Sari
                  </p>
                  <p className="text-muted-gold/80 text-[10px] mt-1 tracking-widest">
                    12 · 12 · 2025
                  </p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 top-1/3 rounded-2xl border border-muted-gold/20 bg-primary-cream/90 px-4 py-3 shadow-xl"
            >
              <p className="text-xs font-medium text-deep-charcoal">Tier Sultan ✦</p>
              <p className="text-[10px] text-wood-brown/70">Live Greeting Wall</p>
            </motion.div>

            {/* Floating badge 2 */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -left-10 bottom-1/3 bg-deep-charcoal border border-muted-gold/15 rounded-2xl shadow-xl px-4 py-3"
            >
              <p className="text-muted-gold text-xs font-medium">✓ Terkirim</p>
              <p className="text-primary-cream/40 text-[10px]">128 tamu konfirmasi</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom fade gradient */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-linear-to-t from-primary-cream to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span
          className="text-primary-cream/30 text-[10px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-px h-8 bg-linear-to-b from-muted-gold/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
