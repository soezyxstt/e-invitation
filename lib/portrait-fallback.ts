/**
 * Portrait fallback photos — shown when a couple portrait URL has not been
 * uploaded yet. Each pool contains diverse, realistic face photos from
 * Unsplash (already whitelisted in next.config.ts).
 *
 * The portrait is chosen deterministically from the person's name so the
 * same name always resolves to the same photo across page loads.
 */

const GROOM_PORTRAITS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=560&q=82&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=560&q=82&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=560&q=82&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=560&q=82&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=560&q=82&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=560&q=82&auto=format&fit=crop",
];

const BRIDE_PORTRAITS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=560&q=82&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=560&q=82&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=560&q=82&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=560&q=82&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=560&q=82&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=560&q=82&auto=format&fit=crop",
];

/** Returns a consistent fallback portrait URL for the given name. */
export function groomFallback(name: string): string {
  const idx = name.charCodeAt(0) % GROOM_PORTRAITS.length;
  return GROOM_PORTRAITS[idx];
}

export function brideFallback(name: string): string {
  const idx = name.charCodeAt(0) % BRIDE_PORTRAITS.length;
  return BRIDE_PORTRAITS[idx];
}
