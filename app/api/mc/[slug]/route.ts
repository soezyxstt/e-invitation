import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const inv = await prisma.invitation.findUnique({
    where: { slug },
    select: {
      groomName: true,
      brideName: true,
      venueName: true,
      eventDate: true,
      tierId: true,
      status: true,
      rsvps: {
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

  if (!inv || inv.status === "ARCHIVED" || inv.tierId < 3) {
    return new Response("Not found", { status: 404 });
  }

  return Response.json({
    groomName: inv.groomName,
    brideName: inv.brideName,
    venueName: inv.venueName,
    eventDate: inv.eventDate.toISOString(),
    rsvps: inv.rsvps.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
    })),
  });
}
