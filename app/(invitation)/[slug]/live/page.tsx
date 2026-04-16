import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { LiveWallClient } from "@/components/invitation/live-wall-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const inv = await prisma.invitation.findUnique({
    where: { slug },
    select: { groomName: true, brideName: true },
  });
  if (!inv) return { title: "Live Wall" };
  return { title: `Live Greeting Wall — ${inv.groomName} & ${inv.brideName}` };
}

export default async function LivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
    notFound();
  }

  return (
    <LiveWallClient
      slug={slug}
      initialData={{
        groomName: inv.groomName,
        brideName: inv.brideName,
        eventDate: inv.eventDate,
        venueName: inv.venueName,
        messages: inv.rsvps.map((r) => ({
          ...r,
          createdAt: r.createdAt.toISOString(),
        })),
      }}
    />
  );
}
