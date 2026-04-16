"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// ── Helpers ───────────────────────────────────────────────────────────────────

async function assertOwnsInvitation(invitationId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Tidak terautentikasi.");

  const inv = await prisma.invitation.findUnique({
    where: { id: invitationId },
    select: { ownerId: true, slug: true },
  });
  if (!inv || inv.ownerId !== session.user.id) {
    throw new Error("Akses ditolak.");
  }
  return inv;
}

// ── Schemas ───────────────────────────────────────────────────────────────────

const eventSchema = z.object({
  invitationId: z.string().min(1),
  date: z.string().min(1, "Tanggal harus diisi"),
  title: z.string().min(1, "Judul harus diisi").max(100),
  description: z.string().max(500).optional(),
  sortOrder: z.coerce.number().int().default(0),
});

// ── Types ─────────────────────────────────────────────────────────────────────

export type TimelineEventState = {
  success?: boolean;
  message?: string;
  errors?: Partial<Record<string, string[]>>;
};

// ── Actions ───────────────────────────────────────────────────────────────────

export async function createTimelineEvent(
  _prev: TimelineEventState,
  formData: FormData,
): Promise<TimelineEventState> {
  const parsed = eventSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { invitationId, date, title, description, sortOrder } = parsed.data;

  try {
    const inv = await assertOwnsInvitation(invitationId);
    await prisma.timelineEvent.create({
      data: { invitationId, date, title, description: description || null, sortOrder },
    });
    revalidatePath(`/admin/invitations/${invitationId}/edit`);
    revalidatePath(`/${inv.slug}`);
    return { success: true };
  } catch (e) {
    return { message: e instanceof Error ? e.message : "Gagal menyimpan." };
  }
}

export async function deleteTimelineEvent(id: string): Promise<{ error?: string }> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { error: "Tidak terautentikasi." };

    const event = await prisma.timelineEvent.findUnique({
      where: { id },
      include: { invitation: { select: { ownerId: true, slug: true, id: true } } },
    });
    if (!event || event.invitation.ownerId !== session.user.id) {
      return { error: "Akses ditolak." };
    }

    await prisma.timelineEvent.delete({ where: { id } });
    revalidatePath(`/admin/invitations/${event.invitation.id}/edit`);
    revalidatePath(`/${event.invitation.slug}`);
    return {};
  } catch {
    return { error: "Gagal menghapus." };
  }
}

export async function updateTimelineEvent(
  id: string,
  data: { date: string; title: string; description?: string; sortOrder?: number },
): Promise<{ error?: string }> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { error: "Tidak terautentikasi." };

    const event = await prisma.timelineEvent.findUnique({
      where: { id },
      include: { invitation: { select: { ownerId: true, slug: true, id: true } } },
    });
    if (!event || event.invitation.ownerId !== session.user.id) {
      return { error: "Akses ditolak." };
    }

    await prisma.timelineEvent.update({
      where: { id },
      data: {
        date: data.date,
        title: data.title,
        description: data.description || null,
        sortOrder: data.sortOrder ?? event.sortOrder,
      },
    });
    revalidatePath(`/admin/invitations/${event.invitation.id}/edit`);
    revalidatePath(`/${event.invitation.slug}`);
    return {};
  } catch {
    return { error: "Gagal memperbarui." };
  }
}

// ── RSVP visibility toggle ────────────────────────────────────────────────────

export async function toggleRsvpVisibility(
  rsvpId: string,
): Promise<{ error?: string; isPublic?: boolean }> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { error: "Tidak terautentikasi." };

    const rsvp = await prisma.rsvp.findUnique({
      where: { id: rsvpId },
      include: { invitation: { select: { ownerId: true } } },
    });
    if (!rsvp || rsvp.invitation.ownerId !== session.user.id) {
      return { error: "Akses ditolak." };
    }

    const updated = await prisma.rsvp.update({
      where: { id: rsvpId },
      data: { isPublic: !rsvp.isPublic },
      select: { isPublic: true },
    });

    revalidatePath("/admin/rsvps");
    return { isPublic: updated.isPublic };
  } catch {
    return { error: "Gagal mengubah visibilitas." };
  }
}
