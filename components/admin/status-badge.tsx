import type { InvitationStatus } from "@/app/generated/prisma/client";

const map: Record<InvitationStatus, { label: string; className: string }> = {
  DRAFT: {
    label: "Draf",
    className: "bg-stone-100 text-stone-600 border-stone-200",
  },
  PUBLISHED: {
    label: "Tayang",
    className: "bg-[#e8ebe3] text-[#3d5a2b] border-[#c8d6b8]",
  },
  ARCHIVED: {
    label: "Arsip",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
};

export function StatusBadge({ status }: { status: InvitationStatus }) {
  const { label, className } = map[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}
