import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TimelineManager } from "@/components/admin/timeline-manager";
import { SultanFieldsForm } from "@/components/admin/sultan-fields-form";
import { TemplateSwitcher } from "@/components/admin/template-switcher";
import { SongUrlForm } from "@/components/admin/song-url-form";
import { toggleInvitationStatus } from "@/app/actions/invitation";
import { ScrollText, Heart, Eye, EyeOff, Crown, Tv2, ScanLine, LayoutTemplate } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { id: string } }) {
  return { title: "Edit Undangan — Sentuh Undang" };
}

export default async function EditInvitationPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const inv = await prisma.invitation.findUnique({
    where: { id: params.id, ownerId: session.user.id },
    include: {
      tier: true,
      timeline: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!inv) notFound();

  const isTier2Plus = inv.tierId >= 2;
  const isTier3Plus = inv.tierId >= 3;
  const isTier4 = inv.tierId >= 4;
  const currentTemplateId = inv.templateId ?? 1;

  const publishAction = toggleInvitationStatus.bind(
    null,
    inv.id,
    inv.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED",
  );

  return (
    <div className="mx-auto max-w-3xl">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">{inv.title}</h1>
          <p className="mt-0.5 text-sm text-stone-500">
            /{inv.slug} ·{" "}
            <span className="font-medium capitalize text-sage-green">
              {inv.tier.name}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/${inv.slug}`}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 shadow-sm transition hover:bg-stone-50"
          >
            <Eye size={14} />
            Lihat
          </Link>
          <form action={publishAction}>
            <button
              type="submit"
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium shadow-sm transition ${
                inv.status === "PUBLISHED"
                  ? "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                  : "bg-sage-green text-white hover:bg-sage-green/85"
              }`}
            >
              {inv.status === "PUBLISHED" ? (
                <><EyeOff size={14} /> Jadikan Draft</>
              ) : (
                <><Eye size={14} /> Publikasikan</>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ── Info Cards ─────────────────────────────────────────────────── */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Mempelai Pria", value: inv.groomName },
          { label: "Mempelai Wanita", value: inv.brideName },
          {
            label: "Acara",
            value: inv.eventDate.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-xl border border-stone-200 bg-primary-cream p-4"
          >
            <p className="text-xs font-medium text-stone-500">{label}</p>
            <p className="mt-1 text-sm font-semibold text-stone-900 line-clamp-2">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Quick Links ────────────────────────────────────────────────── */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={`/admin/rsvps?invitationId=${inv.id}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs text-stone-600 transition hover:bg-stone-50"
        >
          <ScrollText size={12} />
          Lihat RSVP
        </Link>
        {isTier3Plus && (
          <Link
            href={`/${inv.slug}/mc`}
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs text-stone-600 transition hover:bg-stone-50"
          >
            <Heart size={12} />
            Buka Dasbor MC
          </Link>
        )}
        {isTier4 && (
          <>
            <Link
              href={`/${inv.slug}/live`}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-muted-gold/40 bg-wood-brown px-3 py-1.5 text-xs text-primary-cream transition hover:bg-wood-brown/90"
            >
              <Tv2 size={12} />
              Live Wall
            </Link>
            <Link
              href="/admin/check-in"
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs text-stone-600 transition hover:bg-stone-50"
            >
              <ScanLine size={12} />
              Check-in Scanner
            </Link>
          </>
        )}
      </div>

      {/* ── Template / Desain Switcher ─────────────────────────────────── */}
      <section className="mt-10">
        <div className="mb-5 flex items-center gap-2.5 border-b border-stone-200 pb-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-green/15">
            <LayoutTemplate size={13} className="text-sage-green" />
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-600">Ganti Desain Template</h2>
            <p className="mt-0.5 text-xs text-stone-400">Pilih tampilan layout yang sesuai untuk klien ini.</p>
          </div>
        </div>
        <TemplateSwitcher invitationId={inv.id} currentTemplateId={currentTemplateId} />
      </section>

      {/* ── Musik latar URL (Tier 2+) ───────────────────────────────────── */}
      {isTier2Plus ? (
        <section className="mt-10">
          <div className="mb-5 flex items-center gap-2.5 border-b border-stone-200 pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-green/15">
              <span className="text-xs font-semibold text-sage-green">♪</span>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-600">
                Musik latar
              </h2>
              <p className="mt-0.5 text-xs text-stone-400">
                URL file audio (misalnya hasil unggah Uploadthing).
              </p>
            </div>
          </div>
          <SongUrlForm invitationId={inv.id} defaultSongUrl={inv.songUrl} />
        </section>
      ) : (
        <section className="mt-10 rounded-2xl border border-dashed border-stone-200 bg-primary-cream p-6 text-center">
          <p className="text-sm font-medium text-stone-600">
            Musik latar tersedia mulai Paket{" "}
            <strong className="text-sage-green">Geulis (Tier 2)</strong>.
          </p>
        </section>
      )}

      {/* ── Timeline section (Tier 3+) ─────────────────────────────────── */}
      {isTier3Plus ? (
        <section className="mt-10">
          <div className="mb-5 flex items-center gap-2.5 border-b border-stone-200 pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-green/15">
              <Heart size={13} className="text-sage-green" />
            </div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-600">
              Perjalanan Cinta (Timeline)
            </h2>
          </div>
          <TimelineManager invitationId={inv.id} events={inv.timeline} />
        </section>
      ) : (
        <section className="mt-10 rounded-2xl border border-dashed border-stone-200 bg-primary-cream p-8 text-center">
          <p className="text-sm font-medium text-stone-600">
            Fitur Timeline tersedia di Paket{" "}
            <strong className="text-sage-green">Kasep (Tier 3)</strong> ke atas.
          </p>
          <p className="mt-1 text-xs text-stone-400">
            Undangan ini menggunakan Paket {inv.tier.name} (Tier {inv.tierId}).
          </p>
        </section>
      )}

      {/* ── Sultan Concierge Mode (Tier 4 only) ───────────────────────── */}
      {isTier4 ? (
        <section className="mt-10">
          <div className="mb-5 flex items-center gap-2.5 border-b border-stone-200 pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-wood-brown">
              <Crown size={13} className="text-muted-gold" />
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-600">
                Sultan Concierge — Fitur Eksklusif
              </h2>
              <p className="mt-0.5 text-xs text-stone-400">
                Kelola semua aset dan pengaturan premium Tier 4 di sini.
              </p>
            </div>
          </div>
          <SultanFieldsForm
            invitationId={inv.id}
            slug={inv.slug}
            defaults={{
              videoUrl: inv.videoUrl,
              qrisUrl: inv.qrisUrl,
              bankName: inv.bankName,
              bankAccountNumber: inv.bankAccountNumber,
              bankAccountName: inv.bankAccountName,
              instagramFilterUrl: inv.instagramFilterUrl,
              hasCustomDomain: inv.hasCustomDomain,
              customDomain: inv.customDomain,
            }}
          />
        </section>
      ) : (
        <section className="mt-6 rounded-2xl border border-dashed border-stone-200 bg-primary-cream p-6 text-center">
          <p className="text-sm font-medium text-stone-600">
            Fitur Concierge tersedia di Paket{" "}
            <strong className="text-muted-gold">Sultan (Tier 4)</strong>.
          </p>
          <p className="mt-1 text-xs text-stone-400">
            Undangan ini menggunakan Paket {inv.tier.name} (Tier {inv.tierId}).
          </p>
        </section>
      )}

      {/* ── Back link ──────────────────────────────────────────────────── */}
      <div className="mt-10 border-t border-stone-200 pt-6">
        <Link
          href="/admin/invitations"
          className="text-sm text-stone-500 hover:text-stone-800"
        >
          ← Kembali ke daftar undangan
        </Link>
      </div>
    </div>
  );
}
