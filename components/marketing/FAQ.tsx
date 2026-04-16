"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FadeInSection } from "./FadeInSection";

const faqs = [
  {
    q: "Bagaimana cara memesan undangan digital di SentuhUndang?",
    a: "Sangat mudah! Cukup hubungi kami via WhatsApp, pilih paket yang sesuai, kirimkan data pernikahan Anda (nama, tanggal, lokasi, dsb.), dan kami akan membuatkan undangan digital Anda dalam waktu 1–3 hari kerja. Anda juga bisa melakukan revisi hingga puas sebelum disebarkan.",
  },
  {
    q: "Apakah link undangan bisa disebarkan langsung via WhatsApp?",
    a: "Tentu! Setiap undangan memiliki link unik yang bisa langsung dibagikan melalui WhatsApp, Instagram, atau platform lainnya. Tamu cukup klik link tersebut untuk membuka undangan — tanpa perlu install aplikasi apapun.",
  },
  {
    q: "Apa perbedaan antara paket Simpel, Elegan, Istimewa, dan Sultan?",
    a: "Paket Simpel mencakup informasi dasar pernikahan, RSVP, dan berbagi via WA. Paket Elegan menambahkan galeri foto, musik latar romantis, dan ornamen Batik Garutan. Paket Istimewa melengkapi dengan kisah perjalanan cinta, buku tamu digital, dan halaman khusus MC. Paket Sultan adalah yang paling lengkap: live ucapan selamat dari tamu, QR check-in, video background, dan domain khusus.",
  },
  {
    q: "Bisakah nama tamu ditulis personal di setiap undangan yang dikirim?",
    a: "Bisa! Mulai dari Paket Elegan ke atas, setiap undangan bisa menampilkan nama tamu secara personal. Misalnya, Bapak Ujang akan melihat \"Kepada Yth. Bapak Ujang\" di halaman depan undangannya — terasa lebih berkesan dan personal.",
  },
  {
    q: "Berapa lama undangan bisa diakses setelah hari pernikahan?",
    a: "Semua paket sudah termasuk hosting selama 1 tahun penuh tanpa biaya tambahan. Jadi tamu masih bisa membuka undangan untuk mengingat kenangan, melihat foto galeri, atau membaca buku tamu hingga setahun setelah pernikahan.",
  },
  {
    q: "Apakah saya bisa memilih musik latar sendiri untuk undangan?",
    a: "Ya! Di Paket Elegan, Istimewa, dan Sultan, Anda bisa memilih lagu favorit seperti \"Akad\" dari Payung Teduh, \"Nikah\" dari Juicy Luicy, \"Beautiful in White\", atau lagu lain yang Anda suka. Cukup beritahu kami judul lagunya dan kami akan membantu prosesnya.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-primary-cream py-28">
      {/* Background subtle gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-full max-w-3xl rounded-full bg-muted-gold/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 lg:px-10">
        {/* Section header */}
        <FadeInSection className="mb-14 text-center">
          <div className="mb-5 inline-flex items-center gap-3">
            <div className="h-px w-10 bg-muted-gold/50" />
            <span
              className="text-xs tracking-[0.35em] uppercase text-muted-gold"
              style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
            >
              Pertanyaan Umum
            </span>
            <div className="h-px w-10 bg-muted-gold/50" />
          </div>
          <h2
            className="font-serif text-4xl leading-tight text-wood-brown sm:text-5xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Ada yang Ingin
            <br />
            <span className="italic text-muted-gold">Ditanyakan?</span>
          </h2>
          <p
            className="mt-5 mx-auto max-w-md text-base leading-relaxed text-wood-brown/70"
            style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
          >
            Kumpulan pertanyaan yang sering kami terima. Tidak menemukan jawabannya?
            Chat langsung via WhatsApp.
          </p>
        </FadeInSection>

        {/* FAQ list */}
        <FadeInSection delay={0.1}>
          <div className="divide-y divide-wood-brown/10">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className="py-1">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="group flex w-full items-start justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`flex-1 text-base font-medium leading-snug transition-colors duration-200 ${
                        isOpen ? "text-wood-brown" : "text-wood-brown/85 group-hover:text-wood-brown"
                      }`}
                      style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
                    >
                      {faq.q}
                    </span>
                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "border-muted-gold/50 bg-muted-gold/10 text-muted-gold"
                          : "border-wood-brown/20 text-wood-brown/40 group-hover:border-muted-gold/30 group-hover:text-muted-gold/60"
                      }`}
                    >
                      {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p
                          className="pb-6 pr-11 text-sm leading-relaxed text-wood-brown/72"
                          style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </FadeInSection>

        {/* Bottom CTA */}
        <FadeInSection delay={0.2} className="mt-12 text-center">
          <p
            className="text-sm text-wood-brown/60 mb-4"
            style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
          >
            Masih ada pertanyaan lain?
          </p>
          <a
            href="https://wa.me/6281234567890?text=Halo%20SentuhUndang%2C%20saya%20ingin%20bertanya%20tentang%20undangan%20digital."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-wood-brown px-7 py-3.5 text-sm font-medium text-primary-cream transition-colors hover:bg-wood-brown/90"
            style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-whatsapp" />
            Tanya via WhatsApp
          </a>
        </FadeInSection>
      </div>
    </section>
  );
}
