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
  Leaf,
  Sun,
  Droplets,
  ChevronDown,
} from "lucide-react";
import { FadeInSection } from "./FadeInSection";

// ── Types ────────────────────────────────────────────────────────────────────

type TierKey = "all" | "simpel" | "elegan" | "istimewa" | "sultan";
type DesignKey = "all" | 1 | 2 | 3 | 4 | 5 | 6;

interface PreviewItem {
  slug: string;
  couple: string;
  tier: "simpel" | "elegan" | "istimewa" | "sultan";
  templateId: 1 | 2 | 3 | 4 | 5 | 6;
  image: string;
  guestParam: string;
}

// ── Data: 4 items per design template ────────────────────────────────────────

const ITEMS: PreviewItem[] = [
  // ── Template 1 — Klasik Elegan ─────────────────────────────────────────
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
    tier: "elegan",
    templateId: 1,
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700&q=85&auto=format&fit=crop",
    guestParam: "Ibu+Neneng",
  },
  {
    slug: "demo-kasep",
    couple: "Rendi & Lilis",
    tier: "istimewa",
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
  // ── Template 2 — Modern Bold ────────────────────────────────────────────
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
    tier: "elegan",
    templateId: 2,
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=85&auto=format&fit=crop",
    guestParam: "Ibu+Cucu",
  },
  {
    slug: "demo-kasep-2",
    couple: "Dani & Rini",
    tier: "istimewa",
    templateId: 2,
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=700&q=85&auto=format&fit=crop",
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
  // ── Template 3 — Minimalis Bersih ───────────────────────────────────────
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
    tier: "elegan",
    templateId: 3,
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=700&q=85&auto=format&fit=crop",
    guestParam: "Bapak+Yayan",
  },
  {
    slug: "demo-kasep-3",
    couple: "Heri & Tina",
    tier: "istimewa",
    templateId: 3,
    image: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=700&q=85&auto=format&fit=crop",
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
  // ── Template 4 — Botanica (Green Floral) ────────────────────────────────
  {
    slug: "demo-simpel",
    couple: "Bayu & Putri",
    tier: "simpel",
    templateId: 4,
    image: "https://images.unsplash.com/photo-1530023367847-a683933f4172?w=700&q=85&auto=format&fit=crop",
    guestParam: "Ibu+Tatang",
  },
  {
    slug: "demo-geulis",
    couple: "Mulia & Ratna",
    tier: "elegan",
    templateId: 4,
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=700&q=85&auto=format&fit=crop",
    guestParam: "Bapak+Wahyu",
  },
  {
    slug: "demo-kasep",
    couple: "Fauzan & Layla",
    tier: "istimewa",
    templateId: 4,
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=700&q=85&auto=format&fit=crop",
    guestParam: "Kang+Asep",
  },
  {
    slug: "demo-sultan",
    couple: "Ridwan & Sania",
    tier: "sultan",
    templateId: 4,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&q=85&auto=format&fit=crop",
    guestParam: "H.+Maman+Suparman",
  },
  // ── Template 5 — Sepia (Warm Vintage) ───────────────────────────────────
  {
    slug: "demo-simpel-2",
    couple: "Topan & Dewi",
    tier: "simpel",
    templateId: 5,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=85&auto=format&fit=crop",
    guestParam: "Bapak+Hasan",
  },
  {
    slug: "demo-geulis-2",
    couple: "Deni & Wulan",
    tier: "elegan",
    templateId: 5,
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700&q=85&auto=format&fit=crop",
    guestParam: "Ibu+Yati",
  },
  {
    slug: "demo-kasep-2",
    couple: "Robi & Intan",
    tier: "istimewa",
    templateId: 5,
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=85&auto=format&fit=crop",
    guestParam: "Prof.+Dadang",
  },
  {
    slug: "demo-sultan-2",
    couple: "Agung & Kalista",
    tier: "sultan",
    templateId: 5,
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=700&q=85&auto=format&fit=crop",
    guestParam: "Bp.+H.+Sopyan",
  },
  // ── Template 6 — Azura (Blue Romantic) ──────────────────────────────────
  {
    slug: "demo-simpel-3",
    couple: "Aldi & Fitri",
    tier: "simpel",
    templateId: 6,
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=700&q=85&auto=format&fit=crop",
    guestParam: "Pak+Iwan",
  },
  {
    slug: "demo-geulis-3",
    couple: "Yoga & Cantika",
    tier: "elegan",
    templateId: 6,
    image: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=700&q=85&auto=format&fit=crop",
    guestParam: "Ibu+Lina",
  },
  {
    slug: "demo-kasep-3",
    couple: "Kevin & Sinta",
    tier: "istimewa",
    templateId: 6,
    image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=700&q=85&auto=format&fit=crop",
    guestParam: "Kang+Deni",
  },
  {
    slug: "demo-sultan-3",
    couple: "Hafidz & Amira",
    tier: "sultan",
    templateId: 6,
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=700&q=85&auto=format&fit=crop",
    guestParam: "YM+H.+Deni+Sumarno",
  },
];

const FALLBACK_WEDDING_IMAGE =
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=85&auto=format&fit=crop";

const INITIAL_VISIBLE = 12;
const LOAD_MORE_STEP  = 12;

// ── Configs ───────────────────────────────────────────────────────────────────

const TIER_CONFIG = {
  all: { label: "Semua", icon: null, activeBg: "bg-wood-brown text-primary-cream", badge: "bg-wood-brown/10 text-wood-brown", accentBorder: "border-wood-brown/22", accentText: "text-wood-brown" },
  simpel:   { label: "Simpel",   icon: Zap,      activeBg: "bg-wood-brown/80 text-primary-cream",    badge: "bg-wood-brown/12 text-wood-brown/90",   accentBorder: "border-wood-brown/25",    accentText: "text-wood-brown/80" },
  elegan:   { label: "Elegan",   icon: Star,     activeBg: "bg-muted-gold text-deep-charcoal",        badge: "bg-muted-gold/15 text-wood-brown",       accentBorder: "border-muted-gold/35",    accentText: "text-muted-gold" },
  istimewa: { label: "Istimewa", icon: Sparkles, activeBg: "bg-sage-green text-primary-cream",        badge: "bg-sage-green/15 text-sage-green",       accentBorder: "border-sage-green/30",    accentText: "text-sage-green" },
  sultan:   { label: "Sultan",   icon: Crown,    activeBg: "bg-wood-brown text-primary-cream",        badge: "bg-wood-brown/12 text-wood-brown",       accentBorder: "border-wood-brown/25",    accentText: "text-wood-brown" },
} as const;

const DESIGN_CONFIG: Record<
  1 | 2 | 3 | 4 | 5 | 6,
  { label: string; sub: string; desc: string; icon: React.ElementType; cardStyle: string; imageStyle: string; overlayStyle: string }
> = {
  1: {
    label: "Klasik Elegan", sub: "Foto & teks berdampingan",
    desc: "Tampilan foto dan teks yang seimbang, bersih, dan penuh keanggunan — cocok untuk pasangan yang ingin kesan klasik dan romantis.",
    icon: AlignCenter,
    cardStyle: "border-muted-gold/30 bg-primary-cream hover:border-wood-brown/45 hover:shadow-xl hover:shadow-wood-brown/15",
    imageStyle: "brightness-90 group-hover:brightness-95",
    overlayStyle: "bg-linear-to-t from-deep-charcoal/60 via-transparent to-transparent",
  },
  2: {
    label: "Modern Bold", sub: "Berani & penuh karakter",
    desc: "Desain berani dengan foto penuh layar dan nama mempelai yang besar — cocok untuk pasangan yang ingin tampil beda dan berkesan.",
    icon: LayoutGrid,
    cardStyle: "border-accent-ember/25 bg-surface-night hover:border-accent-ember/50 hover:shadow-xl hover:shadow-accent-ember/18",
    imageStyle: "brightness-[0.6] group-hover:brightness-70",
    overlayStyle: "bg-linear-to-t from-surface-night via-surface-night/30 to-transparent",
  },
  3: {
    label: "Minimalis Bersih", sub: "Sederhana & mewah",
    desc: "Tampilan simpel namun mewah dengan fokus pada tulisan indah — cocok untuk pasangan yang menyukai kesan bersih dan berkelas.",
    icon: Layers,
    cardStyle: "border-sage-green/28 bg-primary-cream/92 hover:border-sage-green/48 hover:shadow-xl hover:shadow-sage-green/14",
    imageStyle: "brightness-90 group-hover:brightness-95 grayscale-[20%]",
    overlayStyle: "bg-linear-to-t from-deep-charcoal/65 via-transparent to-transparent",
  },
  4: {
    label: "Botanica", sub: "Bunga & taman hijau",
    desc: "Nuansa taman bunga segar dengan ornamen botanikal hijau sage dan foto mempelai berbingkai mahkota bunga — cantik dan romantis.",
    icon: Leaf,
    cardStyle: "border-emerald-200/50 bg-[#F7F5F0] hover:border-emerald-400/55 hover:shadow-xl hover:shadow-emerald-400/12",
    imageStyle: "brightness-90 group-hover:brightness-100",
    overlayStyle: "bg-linear-to-t from-[#2A3D2C]/60 via-transparent to-transparent",
  },
  5: {
    label: "Sepia", sub: "Hangat & klasik vintage",
    desc: "Palet amber dan perkamen hangat dengan bingkai portrait bergaya vintage — elegan, penuh karakter, cocok untuk pasangan klasik.",
    icon: Sun,
    cardStyle: "border-amber-300/40 bg-[#F2E9DC] hover:border-amber-500/55 hover:shadow-xl hover:shadow-amber-400/12",
    imageStyle: "brightness-85 sepia-[18%] group-hover:brightness-95",
    overlayStyle: "bg-linear-to-t from-[#3C2415]/70 via-[#B87333]/20 to-transparent",
  },
  6: {
    label: "Azura", sub: "Biru langit & romantis",
    desc: "Nuansa langit biru lembut dengan ornamen botanikal biru dan efek selimut langit pada foto hero — dreamy dan penuh perasaan.",
    icon: Droplets,
    cardStyle: "border-sky-200/50 bg-[#F5F8FC] hover:border-sky-400/55 hover:shadow-xl hover:shadow-sky-400/12",
    imageStyle: "brightness-90 group-hover:brightness-100",
    overlayStyle: "bg-linear-to-t from-[#1A3050]/65 via-[#2C4A6E]/15 to-transparent",
  },
};

const TIER_TABS: TierKey[]   = ["all", "simpel", "elegan", "istimewa", "sultan"];
const DESIGN_TABS: DesignKey[] = ["all", 1, 2, 3, 4, 5, 6];

// ── Card ─────────────────────────────────────────────────────────────────────

function PreviewCard({ item }: { item: PreviewItem }) {
  const [imageSrc, setImageSrc] = useState(item.image);
  const tierCfg   = TIER_CONFIG[item.tier];
  const designCfg = DESIGN_CONFIG[item.templateId];
  const DesignIcon = designCfg.icon;
  const href = `/${item.slug}?to=${item.guestParam}&template=${item.templateId}`;

  const isDark = item.templateId === 2;
  const textColor    = isDark ? "text-primary-cream" : item.templateId === 5 ? "text-[#3C2415]" : item.templateId === 6 ? "text-[#2C4A6E]" : "text-deep-charcoal";
  const subTextColor = {
    1: "text-wood-brown/75",
    2: "text-accent-ember/65",
    3: "text-sage-green/70",
    4: "text-[#5C8B65]/70",
    5: "text-[#B87333]/70",
    6: "text-[#6B9BB8]/70",
  }[item.templateId] ?? "text-wood-brown/70";
  const dividerColor = {
    1: "bg-muted-gold/35",
    2: "bg-accent-ember/22",
    3: "bg-sage-green/25",
    4: "bg-[#5C8B65]/22",
    5: "bg-[#B87333]/25",
    6: "bg-[#6B9BB8]/22",
  }[item.templateId] ?? "bg-muted-gold/30";

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block overflow-hidden rounded-2xl border transition-all duration-300 ${designCfg.cardStyle}`}
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
        <div className={`absolute inset-0 ${designCfg.overlayStyle}`} />

        {/* ── Couple name overlay ── */}
        {item.templateId === 1 && (
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-5 text-center">
            <p className="font-sans text-[7px] uppercase tracking-[0.5em] text-primary-cream/60">The Wedding of</p>
            <p className="mt-1 font-serif font-light leading-tight text-primary-cream" style={{ fontSize: "clamp(16px,4.5vw,22px)" }}>{item.couple}</p>
          </div>
        )}
        {item.templateId === 2 && (
          <div className="absolute bottom-0 left-0 px-4 pb-4">
            <p className="font-mono text-[7px] uppercase tracking-[0.5em] text-accent-ember">The Wedding of</p>
            <p className="font-serif font-extralight leading-[0.88] text-primary-cream" style={{ fontSize: "clamp(24px,7vw,36px)" }}>{item.couple.split(" & ")[0]}</p>
            <div className="flex items-center gap-1.5 pl-0.5">
              <div className="h-px w-4 bg-accent-ember/55" />
              <span className="font-serif text-xs italic text-accent-ember">&times;</span>
              <div className="h-px w-4 bg-accent-ember/55" />
            </div>
            <p className="font-serif font-extralight leading-[0.88] text-primary-cream" style={{ fontSize: "clamp(24px,7vw,36px)" }}>{item.couple.split(" & ")[1]}</p>
          </div>
        )}
        {item.templateId === 3 && (
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-deep-charcoal/85 to-transparent px-4 pb-4 pt-10">
            <p className="font-mono text-[7px] uppercase tracking-[0.5em] text-sage-green">Undangan Pernikahan</p>
            <p className="mt-1 font-serif font-extralight leading-tight text-primary-cream/95" style={{ fontSize: "clamp(17px,4.8vw,24px)" }}>
              {item.couple.split(" & ")[0]}<span className="mx-2 italic text-sage-green">&amp;</span>{item.couple.split(" & ")[1]}
            </p>
          </div>
        )}
        {item.templateId === 4 && (
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-5 text-center">
            <p className="font-sans text-[7px] uppercase tracking-[0.5em] text-white/65">Undangan</p>
            <p className="mt-1 font-serif font-light leading-tight text-white" style={{ fontSize: "clamp(16px,4.5vw,22px)" }}>
              {item.couple.split(" & ")[0]}
              <span className="mx-1.5 italic text-green-200">&amp;</span>
              {item.couple.split(" & ")[1]}
            </p>
          </div>
        )}
        {item.templateId === 5 && (
          <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
            <p className="font-sans text-[7px] uppercase tracking-[0.5em] text-amber-200/80">The Wedding of</p>
            <p className="mt-1 font-serif italic font-light leading-tight text-white" style={{ fontSize: "clamp(16px,4.5vw,22px)" }}>{item.couple}</p>
          </div>
        )}
        {item.templateId === 6 && (
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-5 text-center">
            <p className="font-sans text-[7px] uppercase tracking-[0.5em] text-sky-200/80">Undangan Pernikahan</p>
            <p className="mt-1 font-serif font-light leading-tight text-white" style={{ fontSize: "clamp(16px,4.5vw,22px)" }}>{item.couple}</p>
          </div>
        )}

        {/* Tier badge */}
        <div className="absolute left-3 top-3">
          <span className={`rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest backdrop-blur-sm ${tierCfg.badge}`} style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}>
            {tierCfg.label}
          </span>
        </div>

        {/* Arrow on hover */}
        <div className="absolute right-3 top-3 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md">
            <ArrowUpRight size={14} className="text-wood-brown" />
          </div>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="px-5 pb-5 pt-4">
        {/* Couple name */}
        {item.templateId === 1 && (
          <h3 className={`font-serif text-lg leading-snug ${textColor}`} style={{ fontFamily: "var(--font-serif)" }}>{item.couple}</h3>
        )}
        {item.templateId === 2 && (
          <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-accent-ember/70">{item.couple}</p>
        )}
        {item.templateId === 3 && (
          <p className={`font-serif text-base font-light ${textColor}`} style={{ fontFamily: "var(--font-serif)" }}>{item.couple}</p>
        )}
        {item.templateId === 4 && (
          <h3 className="font-serif text-lg font-light leading-snug text-[#2A3D2C]" style={{ fontFamily: "var(--font-serif)" }}>{item.couple}</h3>
        )}
        {item.templateId === 5 && (
          <h3 className="font-serif text-lg italic font-light leading-snug text-[#3C2415]" style={{ fontFamily: "var(--font-serif)" }}>{item.couple}</h3>
        )}
        {item.templateId === 6 && (
          <h3 className="font-serif text-lg font-light leading-snug text-[#2C4A6E]" style={{ fontFamily: "var(--font-serif)" }}>{item.couple}</h3>
        )}

        {/* Design badge */}
        <div className="mt-3 flex items-center gap-2">
          <div className={`h-px flex-1 ${dividerColor}`} />
          <div className={`flex items-center gap-1 rounded-full border px-2.5 py-1 ${tierCfg.accentBorder}`}>
            <DesignIcon size={9} className={tierCfg.accentText} />
            <span className={`text-[9px] font-medium uppercase tracking-wide ${tierCfg.accentText}`} style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}>
              {designCfg.label}
            </span>
          </div>
          <div className={`h-px flex-1 ${dividerColor}`} />
        </div>

        {/* CTA */}
        <div className={`mt-3 flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 group-hover:text-muted-gold ${subTextColor}`} style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}>
          <span>Lihat Preview</span>
          <span className="h-px w-4 bg-current transition-all duration-300 group-hover:w-6" />
        </div>
      </div>
    </Link>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────

export function Portfolio() {
  const [activeTier,   setActiveTier]   = useState<TierKey>("all");
  const [activeDesign, setActiveDesign] = useState<DesignKey>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const filtered = ITEMS.filter((item) => {
    const tierMatch   = activeTier   === "all" || item.tier       === activeTier;
    const designMatch = activeDesign === "all" || item.templateId === activeDesign;
    return tierMatch && designMatch;
  });

  const visible    = filtered.slice(0, visibleCount);
  const hasMore    = visibleCount < filtered.length;
  const filterKey  = `${activeTier}-${activeDesign}`;

  function handleFilterChange(newTier?: TierKey, newDesign?: DesignKey) {
    if (newTier   !== undefined) setActiveTier(newTier);
    if (newDesign !== undefined) setActiveDesign(newDesign);
    setVisibleCount(INITIAL_VISIBLE); // Reset count on filter change
  }

  return (
    <section id="preview" className="relative overflow-hidden bg-primary-cream/95 py-28">
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
        <FadeInSection className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <div className="h-px w-10 bg-muted-gold/50" />
              <span className="text-xs uppercase tracking-[0.35em] text-muted-gold" style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}>
                Preview Desain
              </span>
            </div>
            <h2 className="font-serif text-4xl text-wood-brown sm:text-5xl" style={{ fontFamily: "var(--font-serif)" }}>
              6 Pilihan
              <br />
              <span className="italic text-muted-gold">Gaya Tampilan</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-wood-brown/80" style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}>
            Pilih gaya tampilan yang paling mencerminkan kepribadian Anda dan pasangan. Klik untuk mencoba langsung.
          </p>
        </FadeInSection>

        {/* ── Design template tabs ── */}
        <FadeInSection delay={0.08} className="mb-5">
          <div className="flex flex-wrap gap-2">
            {/* "All" button */}
            <button
              key="all"
              onClick={() => handleFilterChange(undefined, "all")}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200 ${
                activeDesign === "all"
                  ? "border-transparent bg-wood-brown text-primary-cream shadow-sm"
                  : "border-wood-brown/25 bg-white/70 text-wood-brown/85 hover:border-muted-gold/45 hover:text-wood-brown"
              }`}
              style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
            >
              Semua Gaya
            </button>

            {DESIGN_TABS.filter((d) => d !== "all").map((d) => {
              const cfg  = DESIGN_CONFIG[d as 1 | 2 | 3 | 4 | 5 | 6];
              const Icon = cfg.icon;
              const isActive = activeDesign === d;
              const activeBgMap: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
                1: "border-transparent bg-deep-charcoal text-primary-cream shadow-sm",
                2: "border-accent-ember/35 bg-surface-night text-accent-ember shadow-sm",
                3: "border-sage-green/28 bg-primary-cream/92 text-deep-charcoal shadow-sm",
                4: "border-transparent bg-[#5C8B65] text-white shadow-sm",
                5: "border-transparent bg-[#B87333] text-white shadow-sm",
                6: "border-transparent bg-[#6B9BB8] text-white shadow-sm",
              };
              return (
                <button
                  key={d}
                  onClick={() => handleFilterChange(undefined, d as DesignKey)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? activeBgMap[d as 1 | 2 | 3 | 4 | 5 | 6]
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
              <p className="text-xs italic text-wood-brown/72" style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}>
                {DESIGN_CONFIG[activeDesign as 1 | 2 | 3 | 4 | 5 | 6]?.desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Tier filter ── */}
        <FadeInSection delay={0.12} className="mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[10px] uppercase tracking-[0.3em] text-wood-brown/50" style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}>
              Paket:
            </span>
            {TIER_TABS.map((tab) => {
              const cfg  = TIER_CONFIG[tab];
              const Icon = "icon" in cfg && cfg.icon ? cfg.icon : null;
              const isActive = activeTier === tab;
              const count = tab === "all"
                ? ITEMS.filter((i) => activeDesign === "all" || i.templateId === activeDesign).length
                : ITEMS.filter((i) => i.tier === tab && (activeDesign === "all" || i.templateId === activeDesign)).length;

              return (
                <button
                  key={tab}
                  onClick={() => handleFilterChange(tab)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? `${cfg.activeBg} border-transparent shadow-sm`
                      : "border-wood-brown/25 bg-white/70 text-wood-brown/85 hover:border-muted-gold/45 hover:text-wood-brown"
                  }`}
                  style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
                >
                  {Icon && <Icon size={11} />}
                  {cfg.label}
                  <span className="text-[9px] tracking-widest opacity-50">({count})</span>
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
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visible.map((item, i) => (
                <motion.div
                  key={`${item.slug}-${item.templateId}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PreviewCard item={item} />
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
              <p className="text-sm text-wood-brown/50" style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}>
                Tidak ada preview untuk kombinasi pilihan ini.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Load more ── */}
        {hasMore && (
          <FadeInSection delay={0.1} className="mt-10 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
              className="group inline-flex items-center gap-2.5 rounded-full border border-wood-brown/28 bg-white/80 px-8 py-3.5 text-sm font-medium tracking-wide text-wood-brown transition-all duration-300 hover:border-muted-gold hover:bg-primary-cream hover:text-muted-gold"
              style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
            >
              <span>Tampilkan Lebih Banyak</span>
              <ChevronDown size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              <span className="text-[10px] text-wood-brown/40">
                ({Math.min(LOAD_MORE_STEP, filtered.length - visibleCount)} lagi)
              </span>
            </button>
          </FadeInSection>
        )}

        {/* ── CTA ── */}
        <FadeInSection delay={0.3} className="mt-14 flex justify-center">
          <Link
            href="#paket"
            className="group inline-flex items-center gap-3 rounded-full border border-wood-brown/25 px-8 py-4 text-sm font-medium tracking-wide text-wood-brown transition-all duration-300 hover:border-muted-gold hover:text-muted-gold"
            style={{ fontFamily: "var(--font-sans-inv, var(--font-geist-sans))" }}
          >
            <span>Mulai Buat Undangan Anda</span>
            <span className="h-px w-5 bg-current transition-all duration-300 group-hover:w-8" />
          </Link>
        </FadeInSection>
      </div>
    </section>
  );
}
