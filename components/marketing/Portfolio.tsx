"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Zap,
  Star,
  Sparkles,
  Crown,
  AlignCenter,
  LayoutGrid,
  Layers,
} from "lucide-react";
import { FadeInSection } from "./FadeInSection";

// ── Types ────────────────────────────────────────────────────────────────────

type TierKey = "all" | "simpel" | "geulis" | "kasep" | "sultan";
type DesignKey = "all" | 1 | 2 | 3;

interface PortfolioItem {
  slug: string;
  couple: string;
  tier: "simpel" | "geulis" | "kasep" | "sultan";
  templateId: 1 | 2 | 3;
  image: string;
  guestParam: string;
}

// ── Data: 4 items per design template, 1 per tier each ───────────────────────

const ITEMS: PortfolioItem[] = [
  // ── Template 1 — The Editorial ────────────────────────────────────────────
  {
    slug: "demo-simpel",
    couple: "Asep & Siti",
    tier: "simpel",
    templateId: 1,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=85&auto=format&fit=crop",
    guestParam: "Bapak+Diding",
  },
  {
    slug: "demo-geulis",
    couple: "Farhan & Maya",
    tier: "geulis",
    templateId: 1,
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700&q=85&auto=format&fit=crop",
    guestParam: "Ibu+Neneng",
  },
  {
    slug: "demo-kasep",
    couple: "Rendi & Lilis",
    tier: "kasep",
    templateId: 1,
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=700&q=85&auto=format&fit=crop",
    guestParam: "Kang+Ujang",
  },
  {
    slug: "demo-sultan",
    couple: "Dimas & Putri",
    tier: "sultan",
    templateId: 1,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&q=85&auto=format&fit=crop",
    guestParam: "Bapak+H.+Cecep",
  },
  // ── Template 2 — The Modern Grid ─────────────────────────────────────────
  {
    slug: "demo-simpel-2",
    couple: "Bambang & Wulan",
    tier: "simpel",
    templateId: 2,
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=700&q=85&auto=format&fit=crop",
    guestParam: "Bapak+Entis",
  },
  {
    slug: "demo-geulis-2",
    couple: "Ridwan & Dewi",
    tier: "geulis",
    templateId: 2,
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=85&auto=format&fit=crop",
    guestParam: "Ibu+Cucu",
  },
  {
    slug: "demo-kasep-2",
    couple: "Dani & Rini",
    tier: "kasep",
    templateId: 2,
    image: "https://images.unsplash.com/photo-1550761557-cbba0db11aa8?w=700&q=85&auto=format&fit=crop",
    guestParam: "Prof+Iwan",
  },
  {
    slug: "demo-sultan-2",
    couple: "Gunawan & Anggraeni",
    tier: "sultan",
    templateId: 2,
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=700&q=85&auto=format&fit=crop",
    guestParam: "YM+Cecep+Hendra",
  },
  // ── Template 3 — The Minimalist Card ─────────────────────────────────────
  {
    slug: "demo-simpel-3",
    couple: "Yudi & Pipih",
    tier: "simpel",
    templateId: 3,
    image: "https://images.unsplash.com/photo-1530023367847-a683933f4172?w=700&q=85&auto=format&fit=crop",
    guestParam: "Pak+Ujang",
  },
  {
    slug: "demo-geulis-3",
    couple: "Anton & Sari",
    tier: "geulis",
    templateId: 3,
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=700&q=85&auto=format&fit=crop",
    guestParam: "Bapak+Yayan",
  },
  {
    slug: "demo-kasep-3",
    couple: "Heri & Tina",
    tier: "kasep",
    templateId: 3,
    image: "https://images.unsplash.com/photo-1510279775229-4b08b20eb428?w=700&q=85&auto=format&fit=crop",
    guestParam: "Bapak+Cecep",
  },
  {
    slug: "demo-sultan-3",
    couple: "Rizky & Nadira",
    tier: "sultan",
    templateId: 3,
    image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=700&q=85&auto=format&fit=crop",
    guestParam: "YM+Sofyan+Djalil",
  },
];

const FALLBACK_WEDDING_IMAGE =
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=85&auto=format&fit=crop";

// ── Config ────────────────────────────────────────────────────────────────────

const TIER_CONFIG = {
  all: {
    label: "Semua Tier",
    icon: null,
    activeBg: "bg-wood-brown text-primary-cream",
    badge: "bg-wood-brown/10 text-wood-brown",
    accentBorder: "border-wood-brown/22",
    accentText: "text-wood-brown",
  },
  simpel: {
    label: "Simpel",
    icon: Zap,
    activeBg: "bg-wood-brown/80 text-primary-cream",
    badge: "bg-wood-brown/12 text-wood-brown/90",
    accentBorder: "border-wood-brown/25",
    accentText: "text-wood-brown/80",
  },
  geulis: {
    label: "Geulis",
    icon: Star,
    activeBg: "bg-muted-gold text-deep-charcoal",
    badge: "bg-muted-gold/15 text-wood-brown",
    accentBorder: "border-muted-gold/35",
    accentText: "text-muted-gold",
  },
  kasep: {
    label: "Kasep",
    icon: Sparkles,
    activeBg: "bg-sage-green text-primary-cream",
    badge: "bg-sage-green/15 text-sage-green",
    accentBorder: "border-sage-green/30",
    accentText: "text-sage-green",
  },
  sultan: {
    label: "Sultan",
    icon: Crown,
    activeBg: "bg-wood-brown text-primary-cream",
    badge: "bg-wood-brown/12 text-wood-brown",
    accentBorder: "border-wood-brown/25",
    accentText: "text-wood-brown",
  },
} as const;

const DESIGN_CONFIG: Record<
  1 | 2 | 3,
  { label: string; sub: string; desc: string; icon: React.ElementType; cardStyle: string; imageStyle: string; overlayStyle: string }
> = {
  1: {
    label: "Classic Editorial",
    sub: "Split-screen hero, carousel gallery",
    desc: "Split-screen 50/50: foto kiri tetap, teks kanan scroll. Carousel gallery dengan navigasi panah. Portrait mempelai berbentuk lingkaran. Animasi fade & slide-up yang elegan.",
    icon: AlignCenter,
    cardStyle:
      "border-muted-gold/30 bg-primary-cream hover:border-wood-brown/45 hover:shadow-xl hover:shadow-wood-brown/15",
    imageStyle: "brightness-90 group-hover:brightness-95",
    overlayStyle: "bg-linear-to-t from-deep-charcoal/60 via-transparent to-transparent",
  },
  2: {
    label: "Avant-Garde",
    sub: "Masonry Pinterest, floating cards overlap",
    desc: "Full-screen foto asimetris, nama GIANT di kiri bawah. Floating cards mempelai tumpang-tindih dengan tilt. Masonry gallery — setiap foto masuk dari arah berbeda.",
    icon: LayoutGrid,
    cardStyle:
      "border-accent-ember/25 bg-surface-night hover:border-accent-ember/50 hover:shadow-xl hover:shadow-accent-ember/18",
    imageStyle: "brightness-[0.6] group-hover:brightness-70",
    overlayStyle: "bg-linear-to-t from-surface-night via-surface-night/30 to-transparent",
  },
  3: {
    label: "Minimalist Storybook",
    sub: "Tipografi hero, scrollytelling gallery",
    desc: "Hero tanpa foto — hanya tipografi mewah di atas kertas bertekstur. Galeri scrollytelling: satu foto per layar 88dvh. Portrait mempelai tersembunyi, muncul saat diketuk.",
    icon: Layers,
    cardStyle:
      "border-sage-green/28 bg-primary-cream/92 hover:border-sage-green/48 hover:shadow-xl hover:shadow-sage-green/14",
    imageStyle: "brightness-90 group-hover:brightness-95 grayscale-[20%]",
    overlayStyle: "bg-linear-to-t from-deep-charcoal/65 via-transparent to-transparent",
  },
};

const TIER_TABS: TierKey[] = ["all", "simpel", "geulis", "kasep", "sultan"];
const DESIGN_TABS: DesignKey[] = ["all", 1, 2, 3];

// ── Card component ────────────────────────────────────────────────────────────

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const [imageSrc, setImageSrc] = useState(item.image);
  const tierCfg = TIER_CONFIG[item.tier];
  const designCfg = DESIGN_CONFIG[item.templateId];
  const DesignIcon = designCfg.icon;
  const href = `/${item.slug}?to=${item.guestParam}&template=${item.templateId}`;

  // Template 1: warm ivory (light). Template 2: near-black (dark). Template 3: parchment (light).
  const isLight = item.templateId !== 2;
  const textColor = isLight ? "text-deep-charcoal" : "text-primary-cream";
  const subTextColor = isLight
    ? item.templateId === 3
      ? "text-sage-green/70"
      : "text-wood-brown/75"
    : "text-accent-ember/65";
  const dividerColor = isLight
    ? item.templateId === 3
      ? "bg-sage-green/25"
      : "bg-muted-gold/35"
    : "bg-accent-ember/22";

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block rounded-2xl overflow-hidden border transition-all duration-300 ${designCfg.cardStyle}`}
    >
      {/* ── Image ── */}
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={imageSrc}
          alt={`Undangan ${item.couple}`}
          fill
          quality={80}
          className={`object-cover transition-all duration-700 group-hover:scale-105 ${designCfg.imageStyle}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setImageSrc(FALLBACK_WEDDING_IMAGE)}
        />

        {/* Gradient overlay */}
        <div className={`absolute inset-0 ${designCfg.overlayStyle}`} />

        {/* Template 1: Bottom-center editorial text overlay */}
        {item.templateId === 1 && (
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-5 text-center">
            <p className="font-sans text-[7px] uppercase tracking-[0.5em] text-primary-cream/60">
              The Wedding of
            </p>
            <p className="mt-1 font-serif font-light leading-tight text-primary-cream"
              style={{ fontSize: "clamp(16px,4.5vw,22px)" }}>
              {item.couple}
            </p>
          </div>
        )}

        {/* Template 2: GIANT names stacked bottom-left, × separator — mirrors the actual template */}
        {item.templateId === 2 && (
          <div className="absolute bottom-0 left-0 px-4 pb-4">
            <p className="font-mono text-[7px] uppercase tracking-[0.5em] text-accent-ember">
              The Wedding of
            </p>
            <p className="font-serif font-extralight leading-[0.88] text-primary-cream"
              style={{ fontSize: "clamp(24px,7vw,36px)" }}>
              {item.couple.split(" & ")[0]}
            </p>
            <div className="flex items-center gap-1.5 pl-0.5">
              <div className="h-px w-4 bg-accent-ember/55" />
              <span className="font-serif text-xs italic text-accent-ember">&times;</span>
              <div className="h-px w-4 bg-accent-ember/55" />
            </div>
            <p className="font-serif font-extralight leading-[0.88] text-primary-cream"
              style={{ fontSize: "clamp(24px,7vw,36px)" }}>
              {item.couple.split(" & ")[1]}
            </p>
          </div>
        )}

        {/* Template 3: Typographic-only strip — mirrors the minimal storybook hero */}
        {item.templateId === 3 && (
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-deep-charcoal/85 to-transparent px-4 pb-4 pt-10">
            <p className="font-mono text-[7px] uppercase tracking-[0.5em] text-sage-green">
              Undangan Pernikahan
            </p>
            <p className="mt-1 font-serif font-extralight leading-tight text-primary-cream/95"
              style={{ fontSize: "clamp(17px,4.8vw,24px)" }}>
              {item.couple.split(" & ")[0]}
              <span className="mx-2 italic text-sage-green">&amp;</span>
              {item.couple.split(" & ")[1]}
            </p>
          </div>
        )}

        {/* Tier badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full font-semibold backdrop-blur-sm ${tierCfg.badge}`}
            style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
          >
            {tierCfg.label}
          </span>
        </div>

        {/* Arrow on hover */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md">
            <ArrowUpRight size={14} className="text-wood-brown" />
          </div>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="px-5 pb-5 pt-4">
        {/* Couple name in card body */}
        {item.templateId === 1 && (
          <h3 className={`font-serif text-lg leading-snug ${textColor}`} style={{ fontFamily: "var(--font-serif)" }}>
            {item.couple}
          </h3>
        )}
        {item.templateId === 2 && (
          <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-accent-ember/70">
            {item.couple}
          </p>
        )}
        {item.templateId === 3 && (
          <p className={`font-serif text-base font-light ${textColor}`} style={{ fontFamily: "var(--font-serif)" }}>
            {item.couple}
          </p>
        )}

        {/* Design template badge */}
        <div className={`mt-3 flex items-center gap-2`}>
          <div className={`h-px flex-1 ${dividerColor}`} />
          <div
            className={`flex items-center gap-1 rounded-full border px-2.5 py-1 ${tierCfg.accentBorder}`}
          >
            <DesignIcon size={9} className={tierCfg.accentText} />
            <span
              className={`text-[9px] font-medium uppercase tracking-wide ${tierCfg.accentText}`}
              style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
            >
              {designCfg.label}
            </span>
          </div>
          <div className={`h-px flex-1 ${dividerColor}`} />
        </div>

        {/* CTA */}
        <div
          className={`mt-3 flex items-center gap-1.5 text-xs font-medium ${subTextColor} transition-colors duration-200 group-hover:text-muted-gold`}
          style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
        >
          <span>Lihat Contoh</span>
          <span className="w-4 h-px bg-current transition-all duration-300 group-hover:w-6" />
        </div>
      </div>
    </Link>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────

export function Portfolio() {
  const [activeTier, setActiveTier] = useState<TierKey>("all");
  const [activeDesign, setActiveDesign] = useState<DesignKey>("all");

  const visible = ITEMS.filter((item) => {
    const tierMatch = activeTier === "all" || item.tier === activeTier;
    const designMatch = activeDesign === "all" || item.templateId === activeDesign;
    return tierMatch && designMatch;
  });

  const filterKey = `${activeTier}-${activeDesign}`;

  return (
    <section
      id="portofolio"
      className="relative overflow-hidden bg-primary-cream/95 py-28"
    >
      {/* Dot texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-wood-brown) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* ── Section header ── */}
        <FadeInSection className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <div className="h-px w-10 bg-muted-gold/50" />
              <span
                className="text-xs tracking-[0.35em] uppercase text-muted-gold"
                style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
              >
                Pilihan Desain
              </span>
            </div>
            <h2
              className="font-serif text-4xl text-wood-brown sm:text-5xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              3 Karakter
              <br />
              <span className="italic text-muted-gold">Layout Unik</span>
            </h2>
          </div>
          <p
            className="max-w-xs text-sm leading-relaxed text-wood-brown/80"
            style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
          >
            Setiap klien bisa memilih gaya tampilan yang mencerminkan kepribadian mereka — bukan sekadar beda warna, melainkan beda struktur dan jiwa.
          </p>
        </FadeInSection>

        {/* ── Design template tabs — primary filter ── */}
        <FadeInSection delay={0.08} className="mb-5">
          <div className="flex flex-wrap gap-2">
            {DESIGN_TABS.map((d) => {
              const isActive = activeDesign === d;
              if (d === "all") {
                return (
                  <button
                    key="all"
                    onClick={() => setActiveDesign("all")}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200 ${
                      isActive
                        ? "border-transparent bg-wood-brown text-primary-cream shadow-sm"
                        : "border-wood-brown/25 bg-white/70 text-wood-brown/85 hover:border-muted-gold/45 hover:text-wood-brown"
                    }`}
                    style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
                  >
                    Semua Desain
                  </button>
                );
              }
              const cfg = DESIGN_CONFIG[d];
              const Icon = cfg.icon;
              const bgMap: Record<1 | 2 | 3, string> = {
                1: "border-transparent bg-deep-charcoal text-primary-cream shadow-sm",
                2: "border-accent-ember/35 bg-surface-night text-accent-ember shadow-sm",
                3: "border-sage-green/28 bg-primary-cream/92 text-deep-charcoal shadow-sm",
              };
              return (
                <button
                  key={d}
                  onClick={() => setActiveDesign(d)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? bgMap[d]
                      : "border-wood-brown/25 bg-white/70 text-wood-brown/85 hover:border-muted-gold/45 hover:text-wood-brown"
                  }`}
                  style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
                >
                  <Icon size={11} />
                  {cfg.label}
                </button>
              );
            })}
          </div>
        </FadeInSection>

        {/* Design description strip */}
        <AnimatePresence mode="wait">
          {activeDesign !== "all" && (
            <motion.div
              key={activeDesign}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-5 overflow-hidden"
            >
              <p
                className="text-xs italic text-wood-brown/72"
                style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
              >
                {activeDesign === 1 && "Classic Editorial — Split-screen 50/50: foto kiri tetap, teks kanan scroll. Carousel gallery dengan navigasi panah. Portrait mempelai lingkaran. Seperti majalah cetak kelas atas."}
                {activeDesign === 2 && "Avant-Garde — Full-screen foto asimetris, nama GIANT stacked kiri-bawah. Floating cards mempelai saling tumpang-tindih dengan tilt. Masonry gallery: setiap foto masuk dari arah berbeda."}
                {activeDesign === 3 && "Minimalist Storybook — Hero hanya tipografi di atas kertas bertekstur. Galeri scrollytelling full-layar (88dvh per foto). Portrait mempelai tersembunyi hingga diketuk."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Tier filter — secondary ── */}
        <FadeInSection delay={0.12} className="mb-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="mr-1 text-[10px] uppercase tracking-[0.3em] text-wood-brown/50"
              style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
            >
              Paket:
            </span>
            {TIER_TABS.map((tab) => {
              const cfg = TIER_CONFIG[tab];
              const Icon = "icon" in cfg && cfg.icon ? cfg.icon : null;
              const isActive = activeTier === tab;
              const count = tab === "all"
                ? ITEMS.filter((i) => activeDesign === "all" || i.templateId === activeDesign).length
                : ITEMS.filter((i) => i.tier === tab && (activeDesign === "all" || i.templateId === activeDesign)).length;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTier(tab)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? `${cfg.activeBg} border-transparent shadow-sm`
                      : "border-wood-brown/25 bg-white/70 text-wood-brown/85 hover:border-muted-gold/45 hover:text-wood-brown"
                  }`}
                  style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
                >
                  {Icon && <Icon size={11} />}
                  {cfg.label}
                  <span className="opacity-50 text-[9px] tracking-widest">({count})</span>
                </button>
              );
            })}
          </div>
        </FadeInSection>

        {/* ── Template grid ── */}
        <AnimatePresence mode="wait">
          {visible.length > 0 ? (
            <motion.div
              key={filterKey}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {visible.map((item, i) => (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PortfolioCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center"
            >
              <p
                className="text-sm text-wood-brown/50"
                style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
              >
                Tidak ada contoh untuk kombinasi filter ini.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Legend cards — 3 template descriptions ── */}
        <FadeInSection delay={0.2} className="mt-16 grid gap-4 sm:grid-cols-3">
          {([1, 2, 3] as const).map((id) => {
            const cfg = DESIGN_CONFIG[id];
            const Icon = cfg.icon;
            const bgMap: Record<1 | 2 | 3, string> = {
              1: "border-muted-gold/30 bg-primary-cream",
              2: "border-accent-ember/22 bg-surface-night",
              3: "border-sage-green/28 bg-primary-cream/90",
            };
            const textMap: Record<1 | 2 | 3, string> = {
              1: "text-deep-charcoal",
              2: "text-primary-cream",
              3: "text-deep-charcoal",
            };
            const subMap: Record<1 | 2 | 3, string> = {
              1: "text-wood-brown",
              2: "text-accent-ember/75",
              3: "text-sage-green",
            };
            return (
              <button
                key={id}
                onClick={() => setActiveDesign(activeDesign === id ? "all" : id)}
                className={`group rounded-2xl border p-5 text-left transition-all duration-200 hover:scale-[1.02] ${bgMap[id]} ${
                  activeDesign === id
                    ? "ring-2 ring-muted-gold/50 ring-offset-2 ring-offset-primary-cream"
                    : ""
                }`}
              >
                <div
                  className={`mb-3 flex h-9 w-9 items-center justify-center rounded-sm border ${
                    id === 1
                      ? "border-muted-gold/35 bg-primary-cream"
                      : id === 2
                        ? "border-accent-ember/25 bg-white/5"
                        : "border-sage-green/25 bg-primary-cream/85"
                  }`}
                >
                  <Icon
                    size={16}
                    className={
                      id === 1
                        ? "text-wood-brown"
                        : id === 2
                          ? "text-accent-ember"
                          : "text-sage-green"
                    }
                  />
                </div>
                <p className={`font-serif text-lg ${textMap[id]}`} style={{ fontFamily: "var(--font-serif)" }}>
                  {cfg.label}
                </p>
                <p className={`mt-1 text-[11px] leading-relaxed ${subMap[id]}`} style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}>
                  {cfg.desc}
                </p>
                <div className={`mt-3 text-[10px] font-medium tracking-wide ${activeDesign === id ? "text-muted-gold" : subMap[id]}`} style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}>
                  {activeDesign === id ? "✓ Sedang difilter" : "Klik untuk filter →"}
                </div>
              </button>
            );
          })}
        </FadeInSection>

        {/* ── CTA ── */}
        <FadeInSection delay={0.3} className="flex justify-center mt-14">
          <Link
            href="#paket"
            className="group inline-flex items-center gap-3 rounded-full border border-wood-brown/25 px-8 py-4 text-sm font-medium tracking-wide text-wood-brown transition-all duration-300 hover:border-muted-gold hover:text-muted-gold"
            style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
          >
            <span>Mulai Buat Undangan Anda</span>
            <span className="w-5 h-px bg-current transition-all duration-300 group-hover:w-8" />
          </Link>
        </FadeInSection>
      </div>
    </section>
  );
}
