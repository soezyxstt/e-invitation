"use client";

import { useTransition } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toggleRsvpVisibility } from "@/app/actions/timeline";

export function RsvpVisibilityToggle({
  rsvpId,
  isPublic,
}: {
  rsvpId: string;
  isPublic: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      await toggleRsvpVisibility(rsvpId);
    });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      title={isPublic ? "Sembunyikan dari buku tamu" : "Tampilkan di buku tamu"}
      className={`flex h-8 w-8 items-center justify-center rounded-lg border transition disabled:opacity-40 ${
        isPublic
          ? "border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
          : "border-stone-200 bg-stone-50 text-stone-400 hover:bg-stone-100"
      }`}
    >
      {isPending ? (
        <Loader2 size={13} className="animate-spin" />
      ) : isPublic ? (
        <Eye size={13} />
      ) : (
        <EyeOff size={13} />
      )}
    </button>
  );
}
