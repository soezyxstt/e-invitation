import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/admin/status-badge";
import { DeleteInvitationButton } from "@/components/admin/delete-invitation-button";
import { Plus, ExternalLink, Pencil } from "lucide-react";

export const metadata = { title: "Daftar Undangan — Sentuh Undang" };

export default async function InvitationsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const invitations = await prisma.invitation.findMany({
    where: { ownerId: session.user.id },
    include: { tier: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Undangan</h1>
          <p className="mt-0.5 text-sm text-stone-600">
            {invitations.length} undangan terdaftar
          </p>
        </div>
        <Link
          href="/admin/invitations/new"
          className="inline-flex items-center gap-2 rounded-lg bg-sage-green px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sage-green/85"
        >
          <Plus size={15} />
          Tambah Undangan
        </Link>
      </div>

      {/* Empty state */}
      {invitations.length === 0 && (
        <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-primary-cream py-16 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage-green/15">
            <Plus size={22} className="text-sage-green" />
          </div>
          <p className="text-base font-medium text-stone-700">Belum ada undangan</p>
          <p className="mt-1 text-sm text-stone-500">
            Mulai dengan membuat undangan pertama Anda
          </p>
          <Link
            href="/admin/invitations/new"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-sage-green px-4 py-2 text-sm font-medium text-white transition hover:bg-sage-green/85"
          >
            <Plus size={14} />
            Tambah Undangan
          </Link>
        </div>
      )}

      {/* Table */}
      {invitations.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-stone-100 bg-primary-cream">
                <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-stone-500">
                  Judul
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-stone-500">
                  Slug
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-stone-500">
                  Tier
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wide text-stone-500">
                  Status
                </th>
                <th className="px-5 py-3.5 text-right text-xs font-medium uppercase tracking-wide text-stone-500">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {invitations.map((inv) => (
                <tr key={inv.id} className="transition hover:bg-primary-cream/80">
                  <td className="px-5 py-4">
                    <p className="font-medium text-stone-900">{inv.title}</p>
                    <p className="mt-0.5 text-xs text-stone-500">
                      {inv.groomName} &amp; {inv.brideName}
                    </p>
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-stone-600">
                    {inv.slug}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-md bg-sage-green/15 px-2 py-0.5 text-xs font-medium text-sage-green">
                      {inv.tier.name}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={inv.status} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/${inv.slug}`}
                        target="_blank"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-500 transition hover:border-stone-300 hover:text-stone-800"
                        title="Lihat undangan"
                      >
                        <ExternalLink size={13} />
                      </Link>
                      <Link
                        href={`/admin/invitations/${inv.id}/edit`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-500 transition hover:border-stone-300 hover:text-stone-800"
                        title="Edit & Timeline"
                      >
                        <Pencil size={13} />
                      </Link>
                      <DeleteInvitationButton id={inv.id} title={inv.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
