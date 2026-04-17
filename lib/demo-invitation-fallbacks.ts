/**
 * Gambar contoh QRIS (bukan kode pembayaran sungguhan) — dipakai jika admin
 * belum unggah QRIS, dan untuk slug demo.
 */
export const DEFAULT_QRIS_PLACEHOLDER_PATH = "/images/qris-placeholder.svg";

/**
 * Fallback hanya untuk slug demo marketing (`demo-sultan*`) bila baris DB
 * belum berisi rekening / QRIS — agar preview lokal konsisten tanpa harus
 * re-seed setiap kali.
 */
export type DemoSultanGift = {
  bankName: string;
  bankAccountNumber: string;
  bankAccountName: string;
  /** Bisa diarahkan ke placeholder lokal atau gambar demo */
  qrisUrl: string;
};

export const DEMO_SULTAN_GIFT_BY_SLUG: Record<string, DemoSultanGift> = {
  "demo-sultan": {
    bankName: "Bank Mandiri",
    bankAccountNumber: "0080012345678",
    bankAccountName: "Dimas Pratama Nugraha",
    qrisUrl: DEFAULT_QRIS_PLACEHOLDER_PATH,
  },
  "demo-sultan-2": {
    bankName: "Bank Central Asia (BCA)",
    bankAccountNumber: "1234567890",
    bankAccountName: "Gunawan Fauzi Nugraha",
    qrisUrl: DEFAULT_QRIS_PLACEHOLDER_PATH,
  },
  "demo-sultan-3": {
    bankName: "Bank Negara Indonesia (BNI)",
    bankAccountNumber: "0123456789012",
    bankAccountName: "Rizky Pratama Wijaya",
    qrisUrl: DEFAULT_QRIS_PLACEHOLDER_PATH,
  },
};
