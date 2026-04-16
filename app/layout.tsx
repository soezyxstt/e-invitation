import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Lato } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Heading / wordmark — Sophisticated Monogram brand line */
const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

/* Body text undangan */
const lato = Lato({
  variable: "--font-sans-inv",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  // Resolves relative OG image paths and sets canonical base URL for all pages.
  // On Vercel, NEXTAUTH_URL should be set to the production URL (e.g. https://sentuhundang.vercel.app).
  metadataBase: new URL(
    process.env.NEXTAUTH_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Sentuh Undang",
    template: "%s — Sentuh Undang",
  },
  description: "Undangan digital pernikahan elegan — Garut",
  openGraph: {
    siteName: "Sentuh Undang",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
