/** Fallback instrumental tracks shipped under `public/audio/`. */
export const DEFAULT_MUSIC_PATHS = [
  "/audio/beautiful-in-white.mp3",
  "/audio/akad.mp3",
] as const;

export function pickDefaultMusicUrl(seed: string): string {
  let sum = 0;
  for (let i = 0; i < seed.length; i++) sum += seed.charCodeAt(i);
  return DEFAULT_MUSIC_PATHS[sum % 2];
}

function normalizeMusicUrl(raw: string): string {
  let s = raw.trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

/**
 * Hanya URL yang boleh diputar: path relatif dari situs (mis. /audio/…) atau
 * unggahan resmi (Uploadthing, Vercel Blob). CDN publik seperti Pixabay tidak
 * diizinkan — dipaksa fallback ke `public/audio/`.
 */
export function isTrustedMusicUrl(url: string): boolean {
  const u = normalizeMusicUrl(url);
  if (!u) return false;
  if (u.startsWith("/")) return true;
  if (!/^https?:\/\//i.test(u)) return false;
  try {
    const { hostname } = new URL(u);
    const h = hostname.toLowerCase();
    if (h === "localhost" || h === "127.0.0.1") return true;
    if (h === "utfs.io" || h.endsWith(".utfs.io")) return true;
    if (h.endsWith(".uploadthing.com") || h === "uploadthing.com") return true;
    if (h.endsWith(".uploadthing.pro") || h === "uploadthing.pro") return true;
    if (h.endsWith(".ufs.sh")) return true;
    if (h.includes("blob.vercel-storage.com")) return true;
    return false;
  } catch {
    return false;
  }
}

function isSkippableLegacyMusicUrl(url: string): boolean {
  const u = normalizeMusicUrl(url);
  if (!u) return false;
  if (/pixabay/i.test(u.toLowerCase())) return true;
  try {
    const href = u.startsWith("http") ? u : `https://${u}`;
    if (/pixabay/i.test(new URL(href).hostname)) return true;
  } catch {
    /* ignore */
  }
  return false;
}

/**
 * Tier 2+: `songUrl` lalu tiap aset BACKGROUND_MUSIC — hanya URL terpercaya.
 * Selain itu → `/audio/beautiful-in-white.mp3` atau `akad.mp3`.
 */
export function resolveBackgroundMusicUrl(opts: {
  isTier2Plus: boolean;
  invitationId: string;
  songUrl: string | null | undefined;
  assetMusicUrls?: string[] | null;
}): string | undefined {
  if (!opts.isTier2Plus) return undefined;

  const fromDb = opts.songUrl?.trim();
  if (
    fromDb &&
    isTrustedMusicUrl(fromDb) &&
    !isSkippableLegacyMusicUrl(fromDb)
  ) {
    return fromDb;
  }

  for (const raw of opts.assetMusicUrls ?? []) {
    const t = raw?.trim();
    if (
      t &&
      isTrustedMusicUrl(t) &&
      !isSkippableLegacyMusicUrl(t)
    ) {
      return t;
    }
  }

  return pickDefaultMusicUrl(opts.invitationId);
}

/**
 * Pertahanan di klien (MusicPlayer): URL tidak terpercaya / Pixabay → fallback.
 */
export function sanitizeMusicUrlForPlayback(
  src: string | undefined,
  invitationId: string,
): string | undefined {
  if (!src) return src;
  const s = src.trim();
  if (!isTrustedMusicUrl(s) || isSkippableLegacyMusicUrl(s)) {
    return pickDefaultMusicUrl(invitationId);
  }
  return s;
}
