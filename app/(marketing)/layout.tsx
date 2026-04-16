import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SentuhUndang — Undangan Digital Pernikahan Elegan Khas Garut",
  description:
    "Platform undangan digital pernikahan premium dengan sentuhan Batik Garutan, Basa Sunda Lemes, dan teknologi modern. Tersedia 4 paket mulai Rp 49.000. Melayani seluruh Kabupaten Garut.",
  keywords: [
    "undangan digital",
    "undangan pernikahan",
    "undangan online",
    "undangan digital garut",
    "undangan sunda",
    "batik garutan",
    "sentuhundang",
    "wedding invitation",
  ],
  openGraph: {
    title: "SentuhUndang — Undangan Digital Pernikahan Elegan Khas Garut",
    description:
      "Undangan digital premium dengan sentuhan Batik Garutan dan Basa Sunda Lemes. 4 paket tersedia mulai Rp 49.000.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SentuhUndang — Platform Undangan Digital Garut",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SentuhUndang — Undangan Digital Pernikahan Garut",
    description:
      "Platform undangan digital premium dengan sentuhan budaya Sunda dan Batik Garutan.",
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
