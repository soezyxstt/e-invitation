import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { InvitationForm } from "@/components/admin/invitation-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Tambah Undangan — Sentuh Undang" };

export default async function NewInvitationPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const tiers = await prisma.tier.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="mx-auto max-w-2xl">
      {/* Back + Header */}
      <div className="mb-8">
        <Link
          href="/admin/invitations"
          className="inline-flex items-center gap-1.5 text-sm text-stone-500 transition hover:text-stone-800"
        >
          <ArrowLeft size={14} />
          Kembali ke daftar
        </Link>
        <h1 className="mt-3 text-2xl font-semibold text-stone-900">Tambah Undangan</h1>
        <p className="mt-1 text-sm text-stone-600">
          Isi data pernikahan atau khitanan, lalu simpan sebagai draf.
        </p>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-primary-cream p-6 shadow-sm">
        <InvitationForm tiers={tiers} />
      </div>
    </div>
  );
}
