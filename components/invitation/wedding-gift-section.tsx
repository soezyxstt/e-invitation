"use client";

import { useState } from "react";
import { Copy, Check, Gift } from "lucide-react";

export function WeddingGiftSection({
  bankName,
  bankAccountNumber,
  bankAccountName,
}: {
  bankName?: string | null;
  bankAccountNumber?: string | null;
  bankAccountName?: string | null;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!bankAccountNumber) return;
    navigator.clipboard.writeText(bankAccountNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  if (!bankAccountNumber && !bankName && !bankAccountName) return null;

  return (
    <section
      id="wedding-gift"
      className="bg-primary-cream px-6 py-14"
      aria-labelledby="wedding-gift-heading"
    >
      <div className="mx-auto max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-wood-brown/80">
            Wedding Gift
          </p>
          <h2
            id="wedding-gift-heading"
            className="mt-2 font-serif text-3xl text-wood-brown"
          >
            Hadiah Pernikahan
          </h2>
          <p className="mt-2 font-sans text-xs text-wood-brown/80">
            Transfer dapat dilakukan ke rekening berikut
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-px flex-1 bg-muted-gold/50" />
            <Gift size={14} className="text-muted-gold" />
            <div className="h-px flex-1 bg-muted-gold/50" />
          </div>
        </div>

        <div className="rounded-2xl border border-muted-gold/40 bg-white p-6 shadow-sm">
          {bankName && (
            <p className="font-sans text-xs font-medium uppercase tracking-wide text-wood-brown/70">
              Bank
            </p>
          )}
          {bankName && (
            <p className="mt-1 font-serif text-xl text-wood-brown">{bankName}</p>
          )}
          {bankAccountNumber && (
            <>
              <p className="mt-4 font-sans text-xs font-medium uppercase tracking-wide text-wood-brown/70">
                Nomor rekening
              </p>
              <p className="mt-1 break-all font-serif text-2xl tracking-widest text-wood-brown">
                {bankAccountNumber}
              </p>
            </>
          )}
          {bankAccountName && (
            <>
              <p className="mt-4 font-sans text-xs font-medium uppercase tracking-wide text-wood-brown/70">
                Atas nama
              </p>
              <p className="mt-1 font-sans text-base text-wood-brown/90">
                {bankAccountName}
              </p>
            </>
          )}
          {bankAccountNumber && (
            <button
              type="button"
              onClick={handleCopy}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-muted-gold/40 bg-primary-cream py-2.5 font-sans text-xs font-medium text-wood-brown transition hover:bg-muted-gold/20"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-600" />
                  <span className="text-emerald-600">Berhasil disalin!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  Salin nomor rekening
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
