"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#paket", label: "Paket" },
  { href: "#keunggulan", label: "Keunggulan" },
  { href: "#preview", label: "Contoh undangan" },
  { href: "#faq", label: "Pertanyaan" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-primary-cream/95 backdrop-blur-md border-b border-deep-charcoal/5">

      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/logo.png"
            alt="SentuhUndang"
            width={140}
            height={40}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-deep-charcoal/70 hover:text-deep-charcoal transition-colors duration-200"
                style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#paket"
            className="rounded-full bg-deep-charcoal px-5 py-2 text-sm font-medium tracking-wide text-primary-cream transition-colors hover:bg-deep-charcoal/90 border border-muted-gold/20 hover:border-muted-gold/50"
          >
            Pilih paket
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-deep-charcoal/80 hover:text-deep-charcoal transition-colors"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative md:hidden overflow-hidden bg-primary-cream border-b border-deep-charcoal/10"
      >
        <div className="flex flex-col gap-0 px-6 py-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-deep-charcoal/70 hover:text-deep-charcoal border-b border-deep-charcoal/5 text-sm transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4">
            <Link
              href="#paket"
              onClick={() => setOpen(false)}
              className="rounded-full bg-deep-charcoal py-2.5 text-center text-sm font-medium text-primary-cream border border-muted-gold/20"
            >
              Pilih paket
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
