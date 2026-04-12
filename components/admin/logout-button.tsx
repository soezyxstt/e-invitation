"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="rounded-lg border border-stone-400/60 bg-white/60 px-3 py-1.5 text-sm text-stone-700 transition hover:bg-stone-100"
    >
      Keluar
    </button>
  );
}
