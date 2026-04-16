"use server";

import { z } from "zod";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { notifyAdminWhatsApp, buildAdminWaLink } from "@/lib/whatsapp";

const rsvpSchema = z.object({
  invitationId: z.string().min(1),
  guestName: z.string().min(2, "Nama minimal 2 karakter"),
  attendance: z.enum(["ATTENDING", "DECLINED", "MAYBE"]),
  message: z.string().max(500).optional(),
  partySize: z.coerce.number().int().min(1).max(10).default(1),
});

export type RsvpState = {
  success?: boolean;
  errors?: Partial<Record<string, string[]>>;
  message?: string;
  /** wa.me deep-link for the guest to forward their RSVP to the admin. */
  waLink?: string;
  /** QR token for Tier 4 check-in (only set when tierId === 4). */
  qrToken?: string;
  /** Guest name echoed back for QR ticket display. */
  guestName?: string;
};

const ATTENDANCE_LABEL: Record<string, string> = {
  ATTENDING: "✅ Hadir",
  DECLINED: "❌ Tidak Hadir",
  MAYBE: "🤔 Mungkin Hadir",
};

export async function submitRsvp(
  _prev: RsvpState,
  formData: FormData,
): Promise<RsvpState> {
  const parsed = rsvpSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { invitationId, guestName, attendance, message, partySize } =
    parsed.data;

  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId },
    select: {
      id: true,
      status: true,
      title: true,
      groomName: true,
      brideName: true,
      tierId: true,
    },
  });

  if (!invitation || invitation.status !== "PUBLISHED") {
    return { message: "Undangan tidak ditemukan atau belum tayang." };
  }

  // Generate QR token for Tier 4 (Sultan) check-in system
  const qrCodeToken =
    invitation.tierId >= 4 ? randomBytes(16).toString("hex") : null;

  await prisma.rsvp.create({
    data: {
      invitationId,
      guestName,
      attendance,
      message: message || null,
      partySize,
      ...(qrCodeToken ? { qrCodeToken } : {}),
    },
  });

  // ── WhatsApp notifications ────────────────────────────────────────────────

  const attendanceLabel = ATTENDANCE_LABEL[attendance] ?? attendance;
  const invTitle = invitation.title;

  // 1. Server-side push via Fonnte (auto, no guest action needed)
  const serverMsg = [
    `🎊 *RSVP Baru — ${invTitle}*`,
    ``,
    `Tamu      : ${guestName}`,
    `Kehadiran : ${attendanceLabel}`,
    `Jumlah    : ${partySize} orang`,
    message ? `Ucapan    : ${message}` : "",
    ``,
    `_Via Sentuh Undang_`,
  ]
    .filter((l) => l !== undefined)
    .join("\n");

  await notifyAdminWhatsApp(serverMsg);

  // 2. Client-side wa.me link (guest taps to send confirmation themselves)
  const guestMsg = [
    `Halo Admin, saya *${guestName}* ingin konfirmasi kehadiran untuk undangan *${invTitle}*.`,
    ``,
    `Kehadiran : ${attendanceLabel}`,
    `Jumlah    : ${partySize} orang`,
    message ? `Pesan     : ${message}` : "",
  ]
    .filter((l) => l !== undefined)
    .join("\n");

  const waLink = buildAdminWaLink(guestMsg);

  return {
    success: true,
    waLink: waLink ?? undefined,
    qrToken: qrCodeToken ?? undefined,
    guestName,
  };
}
