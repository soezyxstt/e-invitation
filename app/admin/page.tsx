import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminOverviewPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const [invitationCount, rsvpCount] = await Promise.all([
    prisma.invitation.count({ where: { ownerId: userId } }),
    prisma.rsvp.count({
      where: { invitation: { ownerId: userId } },
    }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Ringkasan</h1>
      <p className="mt-1 text-sm text-stone-600">
        Statistik undangan dan RSVP untuk akun Anda.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-stone-200 bg-primary-cream p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-600">Jumlah undangan</p>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-stone-900">
            {invitationCount}
          </p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-primary-cream p-5 shadow-sm">
          <p className="text-sm font-medium text-stone-600">Total RSVP</p>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-stone-900">
            {rsvpCount}
          </p>
        </div>
      </div>
    </div>
  );
}
