"use client";

import { Trash2 } from "lucide-react";
import { deleteInvitation } from "@/app/actions/invitation";

export function DeleteInvitationButton({ id, title }: { id: string; title: string }) {
  async function handleDelete() {
    const confirmed = window.confirm(
      `Hapus undangan "${title}"? Tindakan ini tidak bisa dibatalkan.`,
    );
    if (!confirmed) return;
    await deleteInvitation(id);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
      title="Hapus"
    >
      <Trash2 size={13} />
    </button>
  );
}
