import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { RsvpFilterSelect } from "@/components/admin/rsvp-filter-select";
import { RsvpVisibilityToggle } from "@/components/admin/rsvp-visibility-toggle";
import { Download, MessageCircle } from "lucide-react";

export const metadata = { title: "RSVP Tamu — Sentuh Undang" };

const ATTENDANCE = {
  ATTENDING: { label: "Hadir", cls: "bg-emerald-100 text-emerald-700" },
  DECLINED: { label: "Tidak Hadir", cls: "bg-red-100 text-red-700" },
  MAYBE: { label: "Mungkin", cls: "bg-amber-100 text-amber-700" },
  PENDING: { label: "Menunggu", cls: "bg-stone-100 text-stone-600" },
} as const;

type AttendanceKey = keyof typeof ATTENDANCE;

export default async function RsvpsPage({
  searchParams,
}: {
  searchParams: Promise<{ invitationId?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const { invitationId } = await searchParams;
  const userId = session.user.id;

  const [invitations, rsvps] = await Promise.all([
    prisma.invitation.findMany({
      where: { ownerId: userId },
      select: { id: true, title: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.rsvp.findMany({
      where: {
        ...(invitationId ? { invitationId } : {}),
        invitation: { ownerId: userId },
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true, guestName: true, attendance: true, partySize: true,
        message: true, createdAt: true, isPublic: true,
        invitation: { select: { title: true } },
      },
    }),
  ]);

  // Aggregate stats
  const stats = {
    attending: rsvps.filter((r) => r.attendance === "ATTENDING").length,
    declined: rsvps.filter((r) => r.attendance === "DECLINED").length,
    maybe: rsvps.filter((r) => r.attendance === "MAYBE").length,
    totalGuests: rsvps.reduce(
      (sum, r) => sum + (r.attendance === "ATTENDING" ? r.partySize : 0),
      0,
    ),
  };

  const exportHref = `/admin/rsvps/export${invitationId ? `?invitationId=${invitationId}` : ""}`;

  return (
    <div className="mx-auto max-w-5xl">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">RSVP Tamu</h1>
          <p className="mt-0.5 text-sm text-stone-500">
            {rsvps.length} respons
            {invitationId && invitations.find((i) => i.id === invitationId)
              ? ` — ${invitations.find((i) => i.id === invitationId)!.title}`
              : " dari semua undangan"}
          </p>
        </div>
        <a
          href={exportHref}
          className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:bg-stone-50"
        >
          <Download size={14} />
          Export CSV
        </a>
      </div>

      {/* ── Filter ──────────────────────────────────────────────────────── */}
      <div className="mt-6 flex items-center gap-3">
        <span className="text-sm text-stone-500">Filter:</span>
        <RsvpFilterSelect invitations={invitations} currentId={invitationId} />
        {invitationId && (
          <a href="/admin/rsvps" className="text-sm text-stone-400 hover:text-stone-700">
            Reset
          </a>
        )}
      </div>

      {/* ── Stats cards ─────────────────────────────────────────────────── */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            label: "Hadir",
            value: stats.attending,
            cls: "border-emerald-100 bg-emerald-50 text-emerald-700",
          },
          {
            label: "Tidak Hadir",
            value: stats.declined,
            cls: "border-red-100 bg-red-50 text-red-700",
          },
          {
            label: "Mungkin",
            value: stats.maybe,
            cls: "border-amber-100 bg-amber-50 text-amber-700",
          },
          {
            label: "Total Kursi",
            value: stats.totalGuests,
            cls: "border-stone-200 bg-primary-cream text-stone-700",
          },
        ].map(({ label, value, cls }) => (
          <div key={label} className={`rounded-xl border p-4 ${cls}`}>
            <p className="text-xs font-medium opacity-70">{label}</p>
            <p className="mt-1.5 text-2xl font-semibold tabular-nums">{value}</p>
          </div>
        ))}
      </div>

      {/* ── Empty state ─────────────────────────────────────────────────── */}
      {rsvps.length === 0 && (
        <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-primary-cream py-16 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage-green/15">
            <MessageCircle size={22} className="text-stone-400" />
          </div>
          <p className="text-base font-medium text-stone-700">Belum ada RSVP</p>
          <p className="mt-1 text-sm text-stone-500">
            {invitationId
              ? "Undangan yang dipilih belum memiliki konfirmasi tamu."
              : "Tamu akan muncul di sini setelah mengisi formulir RSVP."}
          </p>
        </div>
      )}

      {/* ── Table ───────────────────────────────────────────────────────── */}
      {rsvps.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-primary-cream">
                  {[
                    "Nama Tamu",
                    "Undangan",
                    "Kehadiran",
                    "Tamu",
                    "Ucapan",
                    "Tanggal",
                    "Publik",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-stone-500 first:pl-5"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {rsvps.map((rsvp) => {
                  const att =
                    ATTENDANCE[rsvp.attendance as AttendanceKey] ??
                    ATTENDANCE.PENDING;
                  return (
                    <tr key={rsvp.id} className="transition hover:bg-primary-cream/80">
                      <td className="px-5 py-4 font-medium text-stone-900">
                        {rsvp.guestName}
                      </td>
                      <td className="px-5 py-4 text-xs text-stone-500">
                        {rsvp.invitation.title}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${att.cls}`}
                        >
                          {att.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center tabular-nums text-stone-700">
                        {rsvp.partySize}
                      </td>
                      <td className="max-w-[200px] px-5 py-4">
                        {rsvp.message ? (
                          <p className="line-clamp-2 text-xs text-stone-600">
                            {rsvp.message}
                          </p>
                        ) : (
                          <span className="text-xs italic text-stone-300">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-xs text-stone-500">
                        {new Date(rsvp.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-5 py-4">
                        <RsvpVisibilityToggle
                          rsvpId={rsvp.id}
                          isPublic={rsvp.isPublic}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
