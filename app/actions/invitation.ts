"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const createInvitationSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  slug: z
    .string()
    .min(3, "Slug minimal 3 karakter")
    .regex(slugRegex, "Slug hanya boleh huruf kecil, angka, dan tanda hubung"),
  tierId: z.coerce.number().int().min(1).max(4),
  groomName: z.string().min(2, "Nama mempelai pria wajib diisi"),
  brideName: z.string().min(2, "Nama mempelai wanita wajib diisi"),
  groomParentsLine: z.string().optional(),
  brideParentsLine: z.string().optional(),
  groomChildOrder: z.string().optional(),
  brideChildOrder: z.string().optional(),
  eventDate: z.string().min(1, "Tanggal acara wajib diisi"),
  eventTime: z.string().optional(),
  venueName: z.string().min(2, "Nama tempat wajib diisi"),
  venueAddress: z.string().optional(),
  mapUrl: z.string().url("Link Google Maps tidak valid").optional().or(z.literal("")),
  basaSundaLemesKey: z.string().optional(),
  openingReligiousText: z.string().optional(),
  heroImageUrl: z.string().url("URL hero image tidak valid").optional().or(z.literal("")),
});

export type CreateInvitationState = {
  errors?: Partial<Record<keyof z.infer<typeof createInvitationSchema>, string[]>>;
  message?: string;
};

export async function createInvitation(
  _prev: CreateInvitationState,
  formData: FormData,
): Promise<CreateInvitationState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { message: "Sesi login tidak ditemukan. Silakan masuk kembali." };
  }
  const ownerId = session.user.id;

  const raw = Object.fromEntries(formData.entries());
  const parsed = createInvitationSchema.safeParse(raw);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as CreateInvitationState["errors"] };
  }

  const {
    title,
    slug,
    tierId,
    groomName,
    brideName,
    groomParentsLine,
    brideParentsLine,
    groomChildOrder,
    brideChildOrder,
    eventDate,
    eventTime,
    venueName,
    venueAddress,
    mapUrl,
    basaSundaLemesKey,
    openingReligiousText,
    heroImageUrl,
  } = parsed.data;

  const existing = await prisma.invitation.findUnique({ where: { slug } });
  if (existing) {
    return { errors: { slug: ["Slug sudah dipakai, pilih slug lain."] } };
  }

  // Gabungkan tanggal + jam menjadi DateTime
  const dateTimeStr = eventTime ? `${eventDate}T${eventTime}:00` : `${eventDate}T00:00:00`;
  const eventDateTime = new Date(dateTimeStr);

  const invitation = await prisma.invitation.create({
    data: {
      title,
      slug,
      tierId,
      ownerId,
      groomName,
      brideName,
      groomParentsLine: groomParentsLine || null,
      brideParentsLine: brideParentsLine || null,
      groomChildOrder: groomChildOrder || null,
      brideChildOrder: brideChildOrder || null,
      eventDate: eventDateTime,
      venueName,
      venueAddress: venueAddress || null,
      mapUrl: mapUrl || null,
      basaSundaLemesKey: basaSundaLemesKey || null,
      openingReligiousText: openingReligiousText || null,
    },
  });

  if (heroImageUrl) {
    await prisma.invitationAsset.create({
      data: {
        invitationId: invitation.id,
        kind: "HERO_IMAGE",
        url: heroImageUrl,
        sortOrder: 0,
      },
    });
  }

  redirect("/admin/invitations");
}

export async function deleteInvitation(id: string): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  // Hanya izinkan hapus milik sendiri
  await prisma.invitation.deleteMany({
    where: { id, ownerId: session.user.id },
  });

  redirect("/admin/invitations");
}
