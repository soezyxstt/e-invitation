import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Paket: [
    { label: "Simpel", href: "#paket" },
    { label: "Elegan", href: "#paket" },
    { label: "Istimewa", href: "#paket" },
    { label: "Sultan", href: "#paket" },
  ],
  Platform: [
    { label: "Tentang Kami", href: "#" },
    { label: "Preview Desain", href: "#preview" },
    { label: "FAQ", href: "#faq" },
    { label: "Kontak", href: "#" },
  ],
  Legal: [
    { label: "Kebijakan Privasi", href: "#" },
    { label: "Syarat & Ketentuan", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-deep-charcoal text-primary-cream/60 relative overflow-hidden">
      {/* Decorative top edge */}
      <div className="batik-divider" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center mb-5">
              <Image
                src="/logo.png"
                alt="SentuhUndang"
                width={130}
                height={36}
                className="h-8 w-auto object-contain brightness-0 invert opacity-80"
              />
            </Link>
            <p
              className="text-sm leading-relaxed text-primary-cream/45 max-w-xs"
              style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
            >
              Platform undangan digital pernikahan dengan sentuhan budaya dan
              kearifan lokal Garut. Dibangun dengan cinta untuk setiap pasangan.
            </p>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 text-sm text-whatsapp/90 transition-colors hover:text-whatsapp"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-whatsapp" />
              Chat via WhatsApp
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4
                className="text-xs tracking-[0.3em] uppercase text-primary-cream/30 mb-5"
                style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
              >
                {group}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-primary-cream/50 hover:text-muted-gold transition-colors"
                      style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-primary-cream/25"
            style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
          >
            © {new Date().getFullYear()} SentuhUndang · Dibuat dengan ❤ di Garut,
            Jawa Barat
          </p>
          <p
            className="text-xs text-primary-cream/20 font-serif italic"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            "Someah hadé ka semah, soméah hadé ka sémah"
          </p>
        </div>
      </div>
    </footer>
  );
}
