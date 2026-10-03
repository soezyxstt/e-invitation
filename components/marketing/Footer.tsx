import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { label: "Paket", href: "#paket" },
  { label: "Keunggulan", href: "#keunggulan" },
  { label: "Contoh undangan", href: "#preview" },
  { label: "Pertanyaan", href: "#faq" },
];

export function Footer() {
  return (
    <footer className="bg-deep-charcoal text-primary-cream/60">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div>
            <Link href="/" className="mb-4 inline-flex items-center">
              <Image
                src="/logo.png"
                alt="SentuhUndang"
                width={130}
                height={36}
                className="h-8 w-auto object-contain brightness-0 invert opacity-80"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-primary-cream/55">
              Undangan pernikahan digital dengan sentuhan Sunda.
            </p>
          </div>

          <nav aria-label="Navigasi footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-cream/60 transition-colors hover:text-muted-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t border-white/5 pt-6 text-xs text-primary-cream/40">
          © {new Date().getFullYear()} SentuhUndang. Garut, Jawa Barat.
        </p>
      </div>
    </footer>
  );
}
