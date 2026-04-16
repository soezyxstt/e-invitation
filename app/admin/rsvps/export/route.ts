import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const ATTENDANCE_LABEL: Record<string, string> = {
  ATTENDING: "Hadir",
  DECLINED: "Tidak Hadir",
  MAYBE: "Mungkin",
  PENDING: "Belum Konfirmasi",
};

/** Escape a value for RFC-4180 CSV. */
function cell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  // Wrap in quotes if the value contains a comma, quote, or newline
  if (/[",\r\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const invitationId = searchParams.get("invitationId") ?? undefined;

  // Security: scope to the logged-in admin's own invitations only.
  const rsvps = await prisma.rsvp.findMany({
    where: {
      ...(invitationId ? { invitationId } : {}),
      invitation: { ownerId: session.user.id },
    },
    include: {
      invitation: { select: { title: true, groomName: true, brideName: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const header = [
    "No",
    "Nama Tamu",
    "Undangan",
    "Kehadiran",
    "Jumlah Tamu",
    "Ucapan",
    "Tanggal RSVP",
  ].join(",");

  const rows = rsvps.map((rsvp, i) =>
    [
      cell(i + 1),
      cell(rsvp.guestName),
      cell(rsvp.invitation.title),
      cell(ATTENDANCE_LABEL[rsvp.attendance] ?? rsvp.attendance),
      cell(rsvp.partySize),
      cell(rsvp.message),
      cell(
        new Date(rsvp.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      ),
    ].join(","),
  );

  // UTF-8 BOM (\uFEFF) ensures Excel opens the file with correct encoding.
  const csv = "\uFEFF" + [header, ...rows].join("\r\n");

  const filename = `rsvp-${invitationId ? `${invitationId}-` : ""}${Date.now()}.csv`;

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
