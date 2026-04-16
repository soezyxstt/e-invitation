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
  templateId: z.coerce.number().int().min(1).max(3).default(1),
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
    templateId,
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
      templateId: templateId ?? 1,
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

export async function updateInvitation(
  invitationId: string,
  _prev: CreateInvitationState,
  formData: FormData,
): Promise<CreateInvitationState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { message: "Sesi login tidak ditemukan." };

  const inv = await prisma.invitation.findUnique({
    where: { id: invitationId },
    select: { ownerId: true },
  });
  if (!inv || inv.ownerId !== session.user.id) return { message: "Akses ditolak." };

  const raw = Object.fromEntries(formData.entries());
  const parsed = createInvitationSchema.omit({ slug: true }).safeParse(raw);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as CreateInvitationState["errors"] };
  }

  const {
    title, tierId, templateId, groomName, brideName,
    groomParentsLine, brideParentsLine, groomChildOrder, brideChildOrder,
    eventDate, eventTime, venueName, venueAddress, mapUrl,
    basaSundaLemesKey, openingReligiousText, heroImageUrl,
  } = parsed.data;

  const dateTimeStr = eventTime ? `${eventDate}T${eventTime}:00` : `${eventDate}T00:00:00`;

  await prisma.invitation.update({
    where: { id: invitationId },
    data: {
      title, tierId, templateId: templateId ?? 1, groomName, brideName,
      groomParentsLine: groomParentsLine || null,
      brideParentsLine: brideParentsLine || null,
      groomChildOrder: groomChildOrder || null,
      brideChildOrder: brideChildOrder || null,
      eventDate: new Date(dateTimeStr),
      venueName,
      venueAddress: venueAddress || null,
      mapUrl: mapUrl || null,
      basaSundaLemesKey: basaSundaLemesKey || null,
      openingReligiousText: openingReligiousText || null,
    },
  });

  // Update hero image if a new URL was uploaded
  if (heroImageUrl) {
    await prisma.invitationAsset.upsert({
      where: {
        // find existing hero for this invitation via compound filter
        id: (await prisma.invitationAsset.findFirst({
          where: { invitationId, kind: "HERO_IMAGE" },
          select: { id: true },
        }))?.id ?? "__new__",
      },
      create: { invitationId, kind: "HERO_IMAGE", url: heroImageUrl, sortOrder: 0 },
      update: { url: heroImageUrl },
    });
  }

  redirect(`/admin/invitations`);
}

export async function toggleInvitationStatus(
  invitationId: string,
  status: "PUBLISHED" | "DRAFT",
): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.invitation.updateMany({
    where: { id: invitationId, ownerId: session.user.id },
    data: { status },
  });

  redirect(`/admin/invitations`);
}

// ── Sultan (Tier 4) Concierge fields ─────────────────────────────────────────

const sultanSchema = z.object({
  videoUrl: z.string().url("URL video tidak valid").optional().or(z.literal("")),
  qrisUrl: z.string().url("URL QRIS tidak valid").optional().or(z.literal("")),
  bankName: z.string().max(60).optional(),
  bankAccountNumber: z.string().max(30).optional(),
  bankAccountName: z.string().max(100).optional(),
  instagramFilterUrl: z.string().url("URL filter IG tidak valid").optional().or(z.literal("")),
  hasCustomDomain: z.string().optional(),
  customDomain: z.string().max(253).optional(),
});

export type SultanState = {
  success?: boolean;
  message?: string;
  errors?: Partial<Record<string, string[]>>;
};

export async function updateSultanFields(
  invitationId: string,
  _prev: SultanState,
  formData: FormData,
): Promise<SultanState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { message: "Sesi login tidak ditemukan." };

  const inv = await prisma.invitation.findUnique({
    where: { id: invitationId },
    select: { ownerId: true, tierId: true },
  });
  if (!inv || inv.ownerId !== session.user.id) return { message: "Akses ditolak." };
  if (inv.tierId < 4) return { message: "Fitur ini hanya tersedia untuk Paket Sultan (Tier 4)." };

  const raw = Object.fromEntries(formData.entries());
  const parsed = sultanSchema.safeParse(raw);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as SultanState["errors"] };
  }

  const {
    videoUrl, qrisUrl, bankName, bankAccountNumber,
    bankAccountName, instagramFilterUrl, hasCustomDomain, customDomain,
  } = parsed.data;

  await prisma.invitation.update({
    where: { id: invitationId },
    data: {
      videoUrl: videoUrl || null,
      qrisUrl: qrisUrl || null,
      bankName: bankName || null,
      bankAccountNumber: bankAccountNumber || null,
      bankAccountName: bankAccountName || null,
      instagramFilterUrl: instagramFilterUrl || null,
      hasCustomDomain: hasCustomDomain === "on" || hasCustomDomain === "true",
      customDomain: customDomain || null,
    },
  });

  return { success: true };
}

// ── Template switcher (standalone) ───────────────────────────────────────────

export async function updateInvitationTemplate(
  invitationId: string,
  templateId: number,
): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const valid = [1, 2, 3].includes(templateId);
  if (!valid) throw new Error("templateId tidak valid");

  await prisma.invitation.updateMany({
    where: { id: invitationId, ownerId: session.user.id },
    data: { templateId },
  });

  redirect(`/admin/invitations/${invitationId}/edit`);
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
