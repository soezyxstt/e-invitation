"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, Ticket } from "lucide-react";

/** Matches @theme --color-wood-brown (SSR/hydration fallback before :root is read). */
const WOOD_BROWN_OKLCH_FALLBACK = "oklch(55% 0.1 70)";

export function QrTicket({
  token,
  guestName,
  coupleName,
}: {
  token: string;
  guestName: string;
  coupleName: string;
}) {
  const [fgColor, setFgColor] = useState(WOOD_BROWN_OKLCH_FALLBACK);

  useEffect(() => {
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-wood-brown")
      .trim();
    if (v) setFgColor(v);
  }, []);

  const handleSave = () => {
    // Guide guest to long-press / screenshot the QR
    alert(
      "Tekan lama gambar QR di atas, lalu simpan ke galeri Anda untuk digunakan saat check-in di pintu masuk.",
    );
  };

  return (
    <div className="mt-4 rounded-2xl border border-muted-gold/40 bg-primary-cream p-6 shadow-sm">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2 text-wood-brown/85">
          <Ticket size={16} />
          <p className="font-sans text-xs font-medium uppercase tracking-[0.15em]">
            E-Tiket Masuk
          </p>
        </div>

        <div className="rounded-xl border-2 border-muted-gold/30 bg-white p-4 shadow-inner">
          <QRCodeSVG
            value={token}
            size={160}
            bgColor="oklch(100% 0 0)"
            fgColor={fgColor}
            level="M"
            includeMargin={false}
          />
        </div>

        <div>
          <p className="font-serif text-base text-wood-brown">{guestName}</p>
          <p className="mt-0.5 font-sans text-[10px] text-wood-brown/80">
            {coupleName}
          </p>
        </div>

        <p className="max-w-[220px] font-sans text-[10px] leading-relaxed text-wood-brown/65">
          Screenshot QR ini. Tunjukkan kepada petugas di pintu masuk untuk
          check-in.
        </p>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl border border-muted-gold/40 bg-primary-cream px-5 py-2.5 font-sans text-xs text-wood-brown transition hover:bg-muted-gold/20"
        >
          <Download size={13} />
          Simpan QR Ticket
        </button>
      </div>
    </div>
  );
}
