import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const inv = await prisma.invitation.findUnique({
    where: { slug },
    select: {
      id: true,
      tierId: true,
      status: true,
      groomName: true,
      brideName: true,
      eventDate: true,
      venueName: true,
      rsvps: {
        where: { isPublic: true, message: { not: null } },
        orderBy: { createdAt: "desc" },
        take: 50,
        select: {
          id: true,
          guestName: true,
          attendance: true,
          message: true,
          partySize: true,
          createdAt: true,
        },
      },
    },
  });

  if (!inv || inv.status !== "PUBLISHED" || inv.tierId < 4) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const stats = {
    total: await prisma.rsvp.count({ where: { invitationId: inv.id } }),
    attending: await prisma.rsvp.count({
      where: { invitationId: inv.id, attendance: "ATTENDING" },
    }),
    seats: await prisma.rsvp
      .aggregate({
        where: { invitationId: inv.id, attendance: "ATTENDING" },
        _sum: { partySize: true },
      })
      .then((r) => r._sum.partySize ?? 0),
  };

  return NextResponse.json(
    {
      groomName: inv.groomName,
      brideName: inv.brideName,
      eventDate: inv.eventDate,
      venueName: inv.venueName,
      stats,
      messages: inv.rsvps,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
