"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Check, Gift, ExternalLink } from "lucide-react";

export function QrisSection({
  qrisUrl,
  bankName,
  bankAccountNumber,
  bankAccountName,
  instagramFilterUrl,
}: {
  qrisUrl?: string | null;
  bankName?: string | null;
  bankAccountNumber?: string | null;
  bankAccountName?: string | null;
  instagramFilterUrl?: string | null;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!bankAccountNumber) return;
    navigator.clipboard.writeText(bankAccountNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  if (!qrisUrl && !bankAccountNumber && !instagramFilterUrl) return null;

  return (
    <section className="bg-primary-cream px-6 py-14">
      <div className="mx-auto max-w-sm">
        {/* Section header */}
        <div className="mb-8 text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-wood-brown/80">
            Hadiah Digital
          </p>
          <h2 className="mt-2 font-serif text-3xl text-wood-brown">
            Digital Angpao
          </h2>
          <p className="mt-2 font-sans text-xs text-wood-brown/80">
            Kirimkan doa dan rezeki untuk kedua mempelai
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-px flex-1 bg-muted-gold/50" />
            <Gift size={14} className="text-muted-gold" />
            <div className="h-px flex-1 bg-muted-gold/50" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* QRIS Image */}
          {qrisUrl && (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-muted-gold/40 bg-white p-6 shadow-sm">
              <p className="font-sans text-xs font-medium uppercase tracking-wide text-wood-brown/80">
                Scan QRIS
              </p>
              <div className="relative h-52 w-52">
                <Image
                  src={qrisUrl}
                  alt="QRIS"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center font-sans text-[10px] text-wood-brown/65">
                Berlaku untuk semua aplikasi pembayaran digital
              </p>
            </div>
          )}

          {/* Bank transfer */}
          {bankAccountNumber && (
            <div className="rounded-2xl border border-muted-gold/40 bg-white p-5 shadow-sm">
              <p className="font-sans text-xs font-medium uppercase tracking-wide text-wood-brown/80">
                Transfer Bank
              </p>
              <div className="mt-3">
                {bankName && (
                  <p className="font-sans text-sm text-wood-brown/80">{bankName}</p>
                )}
                <p className="mt-1 font-serif text-2xl tracking-widest text-wood-brown">
                  {bankAccountNumber}
                </p>
                {bankAccountName && (
                  <p className="mt-1 font-sans text-sm text-wood-brown/85">
                    a.n. {bankAccountName}
                  </p>
                )}
              </div>
              <button
                onClick={handleCopy}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-muted-gold/40 bg-primary-cream py-2.5 font-sans text-xs font-medium text-wood-brown transition hover:bg-muted-gold/20"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-600" />
                    <span className="text-emerald-600">Berhasil disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    Salin Nomor Rekening
                  </>
                )}
              </button>
            </div>
          )}

          {/* Instagram Filter */}
          {instagramFilterUrl && (
            <a
              href={instagramFilterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-instagram-filter-cta flex items-center justify-center gap-2.5 rounded-2xl border border-muted-gold/40 px-5 py-4 font-sans text-sm font-medium text-wood-brown shadow-sm transition hover:opacity-90"
            >
              <span className="text-lg">📸</span>
              <span>Coba Filter Instagram Kami</span>
              <ExternalLink size={13} className="ml-auto opacity-60" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
