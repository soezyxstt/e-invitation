import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "SentuhUndang | Undangan Pernikahan Digital" },
  description:
    "Undangan pernikahan digital dengan sentuhan Sunda. Pilih desain dan paket sesuai kebutuhan, lalu bagikan kepada tamu.",
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
    title: "SentuhUndang | Undangan Pernikahan Digital",
    description:
      "Pilih desain undangan pernikahan dengan sentuhan Sunda dan paket sesuai kebutuhan.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SentuhUndang, undangan digital dari Garut",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SentuhUndang | Undangan Pernikahan Digital",
    description:
      "Undangan pernikahan digital dengan sentuhan Sunda.",
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
