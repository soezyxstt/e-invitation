"use client";

import { useActionState, useState, useTransition } from "react";
import { createTimelineEvent, deleteTimelineEvent, updateTimelineEvent } from "@/app/actions/timeline";
import type { TimelineEventState } from "@/app/actions/timeline";
import { Plus, Trash2, Pencil, Check, X, GripVertical, Loader2 } from "lucide-react";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string | null;
  sortOrder: number;
}

interface TimelineManagerProps {
  invitationId: string;
  events: TimelineEvent[];
}

const inputCls =
  "rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none ring-sage-green focus:border-sage-green focus:ring-2 transition";

// ── Inline edit row ───────────────────────────────────────────────────────────

function EventRow({
  event,
  onDeleted,
}: {
  event: TimelineEvent;
  onDeleted: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [fields, setFields] = useState({
    date: event.date,
    title: event.title,
    description: event.description ?? "",
    sortOrder: event.sortOrder,
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSave() {
    startTransition(async () => {
      const result = await updateTimelineEvent(event.id, {
        date: fields.date,
        title: fields.title,
        description: fields.description,
        sortOrder: fields.sortOrder,
      });
      if (result.error) {
        setError(result.error);
      } else {
        setEditing(false);
        setError(null);
      }
    });
  }

  function handleDelete() {
    if (!confirm(`Hapus "${event.title}"?`)) return;
    startTransition(async () => {
      const result = await deleteTimelineEvent(event.id);
      if (result.error) setError(result.error);
      else onDeleted(event.id);
    });
  }

  if (editing) {
    return (
      <div className="rounded-xl border border-sage-green/40 bg-sage-green/5 p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-xs font-medium text-stone-600">
            Tahun/Waktu
            <input
              value={fields.date}
              onChange={(e) => setFields((f) => ({ ...f, date: e.target.value }))}
              className={inputCls}
              placeholder="Maret 2020"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-stone-600">
            Urutan
            <input
              type="number"
              value={fields.sortOrder}
              onChange={(e) => setFields((f) => ({ ...f, sortOrder: +e.target.value }))}
              className={inputCls}
            />
          </label>
        </div>
        <label className="mt-3 flex flex-col gap-1 text-xs font-medium text-stone-600">
          Judul
          <input
            value={fields.title}
            onChange={(e) => setFields((f) => ({ ...f, title: e.target.value }))}
            className={inputCls}
          />
        </label>
        <label className="mt-3 flex flex-col gap-1 text-xs font-medium text-stone-600">
          Deskripsi (opsional)
          <textarea
            value={fields.description}
            onChange={(e) => setFields((f) => ({ ...f, description: e.target.value }))}
            rows={2}
            className={`${inputCls} resize-none`}
          />
        </label>
        {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sage-green px-3 py-1.5 text-xs font-medium text-white disabled:opacity-60"
          >
            {isPending ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
            Simpan
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-50"
          >
            <X size={12} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-4">
      <GripVertical size={14} className="mt-0.5 shrink-0 text-stone-300" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-wood-brown px-2 py-0.5 text-[9px] uppercase tracking-wider text-primary-cream">
            {event.date}
          </span>
          <span className="text-sm font-medium text-stone-900">{event.title}</span>
        </div>
        {event.description && (
          <p className="mt-1 text-xs text-stone-500 line-clamp-2">{event.description}</p>
        )}
      </div>
      <div className="flex shrink-0 gap-1">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-stone-200 text-stone-500 transition hover:border-stone-300 hover:text-stone-800"
        >
          <Pencil size={12} />
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-stone-200 text-red-400 transition hover:border-red-300 hover:text-red-600 disabled:opacity-40"
        >
          {isPending ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
        </button>
      </div>
    </div>
  );
}

// ── Add event form ────────────────────────────────────────────────────────────

const initialState: TimelineEventState = {};

function AddEventForm({ invitationId }: { invitationId: string }) {
  const boundAction = createTimelineEvent.bind(null, initialState);
  const [state, formAction, pending] = useActionState(
    (_prev: TimelineEventState, fd: FormData) => createTimelineEvent(_prev, fd),
    initialState,
  );

  return (
    <form action={formAction} className="rounded-xl border border-dashed border-sage-green/40 bg-sage-green/5 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-600">
        Tambah Momen Baru
      </p>
      <input type="hidden" name="invitationId" value={invitationId} />

      {state.message && (
        <p className="mb-2 text-xs text-red-600">{state.message}</p>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs font-medium text-stone-600">
          Tahun / Waktu *
          <input name="date" placeholder="Maret 2019" className={inputCls} required />
          {state.errors?.date && <span className="text-red-600">{state.errors.date[0]}</span>}
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-stone-600">
          Urutan
          <input name="sortOrder" type="number" defaultValue={0} className={inputCls} />
        </label>
      </div>

      <label className="mt-3 flex flex-col gap-1 text-xs font-medium text-stone-600">
        Judul Momen *
        <input name="title" placeholder="Pertama Bertemu" className={inputCls} required />
        {state.errors?.title && <span className="text-xs text-red-600">{state.errors.title[0]}</span>}
      </label>

      <label className="mt-3 flex flex-col gap-1 text-xs font-medium text-stone-600">
        Cerita / Deskripsi (opsional)
        <textarea
          name="description"
          rows={2}
          placeholder="Kami pertama bertemu di…"
          className={`${inputCls} resize-none`}
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-sage-green px-4 py-2 text-sm font-medium text-white transition hover:bg-sage-green/85 disabled:opacity-60"
      >
        {pending ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
        {pending ? "Menambahkan…" : "Tambah Momen"}
      </button>

      {state.success && (
        <p className="mt-2 text-xs text-sage-green">Momen berhasil ditambahkan!</p>
      )}
    </form>
  );

  void boundAction;
}

// ── Main component ────────────────────────────────────────────────────────────

export function TimelineManager({ invitationId, events: initialEvents }: TimelineManagerProps) {
  const [events, setEvents] = useState(initialEvents);

  function handleDeleted(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="flex flex-col gap-4">
      {events.length === 0 && (
        <p className="text-sm text-stone-500 italic">
          Belum ada momen. Tambahkan cerita perjalanan cinta di bawah.
        </p>
      )}
      {events.map((event) => (
        <EventRow key={event.id} event={event} onDeleted={handleDeleted} />
      ))}
      <AddEventForm invitationId={invitationId} />
    </div>
  );
}
