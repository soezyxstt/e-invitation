/**
 * MapsEmbed — interactive Google Maps iframe for venue location.
 *
 * Priority logic:
 *  1. If NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set → use Maps Embed API v1
 *     (full interactive map, custom styling)
 *  2. Otherwise → use the legacy query embed
 *     (still interactive, no key needed, works for most addresses)
 *
 * The search query uses venueAddress when available, falling back to venueName.
 * The original mapUrl is preserved as the "Buka di Google Maps" deep link.
 */

import { ExternalLink } from "lucide-react";

interface MapsEmbedProps {
  venueName: string;
  venueAddress?: string | null;
  mapUrl?: string | null;
}

function buildEmbedUrl(query: string): string {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const encoded = encodeURIComponent(query);

  if (apiKey) {
    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encoded}&zoom=16&language=id`;
  }

  // Legacy free embed — works without API key via address search
  return `https://maps.google.com/maps?q=${encoded}&output=embed&z=16&hl=id`;
}

export function MapsEmbed({ venueName, venueAddress, mapUrl }: MapsEmbedProps) {
  const searchQuery = venueAddress ?? venueName;
  const embedUrl = buildEmbedUrl(searchQuery);

  return (
    <div className="overflow-hidden rounded-2xl border border-muted-gold/50 bg-white shadow-sm">
      {/* ── Map iframe ───────────────────────────────────────────────────── */}
      <div className="relative aspect-4/3 w-full overflow-hidden">
        {/* Subtle vignette overlay so map blends with card */}
        <div className="maps-embed-inset pointer-events-none absolute inset-0 z-10 rounded-t-2xl" />
        <iframe
          src={embedUrl}
          title={`Peta lokasi ${venueName}`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      {/* ── Venue info + CTA ─────────────────────────────────────────────── */}
      <div className="border-t border-muted-gold/25 px-5 py-4">
        <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-wood-brown/80">
          Lokasi Acara
        </p>
        <p className="mt-1 font-sans text-sm font-medium text-wood-brown">
          {venueName}
        </p>
        {venueAddress && (
          <p className="mt-0.5 font-sans text-xs leading-relaxed text-wood-brown/80">
            {venueAddress}
          </p>
        )}

        {mapUrl && (
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-wood-brown py-2.5 font-sans text-[11px] tracking-[0.18em] text-primary-cream transition hover:bg-wood-brown/90"
          >
            <ExternalLink size={12} />
            Buka di Google Maps
          </a>
        )}
      </div>
    </div>
  );
}
