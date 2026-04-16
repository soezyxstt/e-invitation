"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#paket", label: "Paket" },
  { href: "#keunggulan", label: "Keunggulan" },
  { href: "#preview", label: "Preview" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <motion.div
        className="absolute inset-0 bg-deep-charcoal/90 backdrop-blur-md border-b border-muted-gold/10"
        style={{ opacity: bgOpacity }}
      />

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
                className="text-sm tracking-widest uppercase text-primary-cream/60 hover:text-muted-gold transition-colors duration-200 font-light"
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
            Mulai Sekarang
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-primary-cream/80 hover:text-muted-gold transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative md:hidden overflow-hidden bg-deep-charcoal/95 backdrop-blur-md border-b border-muted-gold/10"
      >
        <div className="flex flex-col gap-0 px-6 py-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-primary-cream/70 hover:text-muted-gold border-b border-white/5 text-sm tracking-widest uppercase transition-colors"
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
              Mulai Sekarang
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
