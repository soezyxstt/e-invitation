"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FadeInSection } from "./FadeInSection";

const faqs = [
  {
    q: "Bagaimana cara memesan?",
    a: "Pilih paket, lalu hubungi kami melalui WhatsApp. Siapkan nama mempelai, tanggal, lokasi, dan bahan undangan. Konfirmasikan waktu pengerjaan dan kebutuhan revisi saat memesan.",
  },
  {
    q: "Bagaimana cara membagikan undangan?",
    a: "Bagikan tautan undangan melalui WhatsApp atau media sosial. Tamu bisa membukanya di browser tanpa memasang aplikasi.",
  },
  {
    q: "Apa perbedaan setiap paket?",
    a: "Simpel memuat informasi acara dan RSVP. Elegan menambahkan galeri, musik, dan nama tamu. Istimewa dilengkapi cerita pasangan, buku tamu, dan halaman MC. Sultan menambahkan layar ucapan langsung, check-in QR, latar video, dan domain khusus. Lihat rincian fitur di bagian paket.",
  },
  {
    q: "Bisa mencantumkan nama tamu?",
    a: "Bisa, mulai dari paket Elegan. Nama tamu tampil di halaman pembuka, misalnya \"Kepada Yth. Bapak Ujang\".",
  },
  {
    q: "Berapa lama undangan aktif?",
    a: "Semua paket mencakup hosting selama satu tahun. Konfirmasikan tanggal mulai masa aktif saat memesan.",
  },
  {
    q: "Bisa memilih musik sendiri?",
    a: "Musik latar tersedia mulai dari paket Elegan. Sampaikan pilihan musik Anda saat memesan agar kami bisa membantu menyiapkannya.",
  },
];

export function FAQ({ whatsappNumber }: { whatsappNumber: string }) {
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
          <h2
            className="font-serif text-4xl leading-tight text-wood-brown sm:text-5xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Pertanyaan umum
          </h2>
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
            Perlu bantuan?
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Halo, saya ingin bertanya tentang undangan digital SentuhUndang.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-wood-brown px-7 py-3.5 text-sm font-medium text-primary-cream transition-colors hover:bg-wood-brown/90"
            style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
          >
            Tanya via WhatsApp
          </a>
        </FadeInSection>
      </div>
    </section>
  );
}
