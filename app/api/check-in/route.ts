import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const token: string = body.token ?? "";

  if (!token) {
    return NextResponse.json({ error: "Token tidak valid." }, { status: 400 });
  }

  const rsvp = await prisma.rsvp.findUnique({
    where: { qrCodeToken: token },
    include: {
      invitation: {
        select: {
          title: true,
          groomName: true,
          brideName: true,
          ownerId: true,
          tierId: true,
        },
      },
      checkIn: true,
    },
  });

  if (!rsvp) {
    return NextResponse.json(
      { error: "QR tidak dikenali. Pastikan Anda men-scan kode yang benar." },
      { status: 404 },
    );
  }

  // Ensure the scanning admin owns this invitation
  if (rsvp.invitation.ownerId !== session.user.id) {
    return NextResponse.json(
      { error: "Anda tidak memiliki akses ke undangan ini." },
      { status: 403 },
    );
  }

  const alreadyCheckedIn = !!rsvp.checkIn;

  if (!alreadyCheckedIn) {
    await prisma.guestCheckIn.create({ data: { rsvpId: rsvp.id } });
  }

  return NextResponse.json({
    success: true,
    alreadyCheckedIn,
    guest: {
      name: rsvp.guestName,
      attendance: rsvp.attendance,
      partySize: rsvp.partySize,
      message: rsvp.message,
    },
    invitation: {
      title: rsvp.invitation.title,
      coupleName: `${rsvp.invitation.groomName} & ${rsvp.invitation.brideName}`,
    },
    checkedInAt: alreadyCheckedIn
      ? rsvp.checkIn?.checkedInAt
      : new Date(),
  });
}
