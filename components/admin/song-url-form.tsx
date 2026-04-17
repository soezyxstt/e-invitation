"use client";

import { useActionState } from "react";
import {
  updateInvitationSongUrl,
  type SongUrlState,
} from "@/app/actions/invitation";
import { Music, CheckCircle2, Loader2, Info } from "lucide-react";

const initialState: SongUrlState = {};

const inputCls =
  "w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-800 outline-none ring-muted-gold placeholder:text-stone-400 focus:border-muted-gold focus:ring-2 transition";

export function SongUrlForm({
  invitationId,
  defaultSongUrl,
}: {
  invitationId: string;
  defaultSongUrl: string | null;
}) {
  const boundAction = updateInvitationSongUrl.bind(null, invitationId);
  const [state, formAction, pending] = useActionState(boundAction, initialState);

  return (
    <form action={formAction} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-green/15">
          <Music size={14} className="text-sage-green" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-stone-800">Musik latar</h3>
          <p className="text-[11px] text-stone-400">
            Unggah ke Uploadthing, lalu tempel URL file audio di sini. Kosongkan untuk memakai aset
            BACKGROUND_MUSIC (jika ada), atau salah satu lagu instrumental bawaan{" "}
            <code className="text-stone-500">/audio/beautiful-in-white.mp3</code> atau{" "}
            <code className="text-stone-500">/audio/akad.mp3</code>.
          </p>
        </div>
      </div>

      {state.success && (
        <div className="mb-3 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2">
          <CheckCircle2 size={14} className="text-emerald-600" />
          <p className="text-xs text-emerald-800">URL musik disimpan.</p>
        </div>
      )}
      {state.message && (
        <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{state.message}</p>
      )}

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wide text-stone-600">
          URL musik (opsional)
        </span>
        <input
          type="url"
          name="songUrl"
          defaultValue={defaultSongUrl ?? ""}
          placeholder="https://…"
          className={inputCls}
        />
        {state.errors?.songUrl?.[0] && (
          <span className="text-xs text-red-600">{state.errors.songUrl[0]}</span>
        )}
      </label>

      <p className="mt-3 flex items-start gap-2 text-[11px] text-stone-500">
        <Info size={12} className="mt-0.5 shrink-0 text-stone-400" />
        Jika dikosongkan, undangan memakai salah satu lagu default dari server atau file musik yang
        diunggah lewat aset undangan.
      </p>

      <button
        type="submit"
        disabled={pending}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-sage-green px-4 py-2 text-sm font-medium text-white transition hover:bg-sage-green/85 disabled:opacity-60"
      >
        {pending && <Loader2 size={14} className="animate-spin" />}
        Simpan URL musik
      </button>
    </form>
  );
}
