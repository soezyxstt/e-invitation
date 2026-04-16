/**
 * WhatsApp notification helpers.
 *
 * Two modes (both optional — configure via env vars):
 *
 * 1. SERVER-SIDE (Fonnte gateway)
 *    Set FONNTE_TOKEN + ADMIN_WHATSAPP to auto-send notifications to the admin
 *    without any action from the guest. Requires a Fonnte account (fonnte.com).
 *
 * 2. CLIENT-SIDE (wa.me deep-link)
 *    Set ADMIN_WHATSAPP only. The server action returns a pre-filled wa.me URL
 *    which the guest can tap to send their confirmation to the admin via their
 *    own WhatsApp. Free, no API key required.
 */

const FONNTE_ENDPOINT = "https://api.fonnte.com/send";

/**
 * Attempt to push a message to the admin via Fonnte's HTTP API.
 * Silently no-ops when FONNTE_TOKEN or ADMIN_WHATSAPP is not configured.
 */
export async function notifyAdminWhatsApp(message: string): Promise<void> {
  const token = process.env.FONNTE_TOKEN;
  const target = process.env.ADMIN_WHATSAPP;

  if (!token || !target) return;

  try {
    await fetch(FONNTE_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ target, message, countryCode: "62" }),
    });
  } catch {
    // Notification failure must never block the RSVP flow.
  }
}

/**
 * Build a wa.me deep-link so the guest can confirm directly to the admin.
 * Returns null when ADMIN_WHATSAPP is not configured.
 */
export function buildAdminWaLink(text: string): string | null {
  const number = process.env.ADMIN_WHATSAPP;
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
