import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s — Sentuh Undang",
    default: "Undangan Digital Sentuh Undang",
  },
};

export default function InvitationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /*
     * inv-layout: scopes invitation-specific font rules (see globals.css).
     * Desktop "theater" frame: content is centered in a ~540px column;
     * the flanking areas get a subtle textured dark background so the
     * invitation never looks like a stretched mobile page on wide screens.
     */
    <div className="inv-layout flex min-h-screen bg-surface-night lg:justify-center">
      {/* Decorative side backgrounds on desktop — subtle warm vignette only */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 hidden lg:block"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 10% 50%, oklch(30% 0.012 55 / 0.35) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 90% 50%, oklch(30% 0.012 55 / 0.35) 0%, transparent 70%)
          `,
        }}
      />
      {/* Subtle grain texture overlay on desktop sides */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 hidden opacity-[0.015] lg:block"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />

      {/* Content column */}
      <div className="invitation-column-shadow relative w-full lg:max-w-[540px]">
        {children}
      </div>
    </div>
  );
}
