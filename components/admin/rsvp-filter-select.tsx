"use client";

import { useRouter } from "next/navigation";

interface RsvpFilterSelectProps {
  invitations: { id: string; title: string }[];
  currentId: string | undefined;
}

export function RsvpFilterSelect({
  invitations,
  currentId,
}: RsvpFilterSelectProps) {
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const id = e.target.value;
    router.push(id ? `/admin/rsvps?invitationId=${id}` : "/admin/rsvps");
  }

  return (
    <select
      value={currentId ?? ""}
      onChange={handleChange}
      className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-sage-green/40"
    >
      <option value="">Semua Undangan</option>
      {invitations.map((inv) => (
        <option key={inv.id} value={inv.id}>
          {inv.title}
        </option>
      ))}
    </select>
  );
}
