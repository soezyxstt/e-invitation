"use client";

import { useTransition } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { updateInvitationTemplate } from "@/app/actions/invitation";

interface TemplateSwitcherProps {
  invitationId: string;
  currentTemplateId: number;
}

const TEMPLATES = [
  {
    id: 1,
    name: "Editorial",
    description: "Centered serif hero, horizontal carousel gallery, Batik Garutan ornaments.",
    previewBg: "bg-deep-charcoal",
    preview: (
      <div className="flex h-full flex-col items-center justify-end pb-3 pt-2">
        <div className="h-px w-10 bg-muted-gold/40" />
        <div className="mt-1 h-3 w-16 rounded-sm bg-primary-cream/80" />
        <div className="mt-0.5 h-2 w-10 rounded-sm bg-muted-gold/60" />
        <div className="mt-2 flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full ${i === 1 ? "w-4 bg-muted-gold" : "w-1.5 bg-muted-gold/30"}`}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 2,
    name: "Modern Grid",
    description: "Oversized typography hero, Pinterest masonry gallery, asymmetric alternating layout.",
    previewBg: "bg-surface-night",
    preview: (
      <div className="flex h-full items-end px-3 pb-3">
        <div>
          <div className="h-6 w-20 rounded-[2px] bg-primary-cream/80" />
          <div className="mt-0.5 h-5 w-14 rounded-[2px] bg-primary-cream/60" />
          <div className="mt-1 h-px w-10 bg-muted-gold/60" />
        </div>
        <div className="ml-auto flex gap-1">
          <div className="flex flex-col gap-1">
            <div className="h-8 w-8 rounded-[2px] bg-muted-gold/20" />
            <div className="h-5 w-8 rounded-[2px] bg-muted-gold/15" />
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <div className="h-5 w-8 rounded-[2px] bg-muted-gold/20" />
            <div className="h-8 w-8 rounded-[2px] bg-muted-gold/15" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    name: "Minimalist Card",
    description: "Typography-only hero with paper texture, card-based sections, vertical magazine gallery.",
    previewBg: "bg-primary-cream",
    preview: (
      <div className="flex h-full flex-col items-center justify-center gap-1.5 px-4">
        <div className="h-px w-8 bg-muted-gold/40" />
        <div className="h-4 w-14 rounded-[2px] bg-wood-brown/25" />
        <div className="h-2 w-6 rounded-[2px] bg-muted-gold/50" />
        <div className="h-4 w-14 rounded-[2px] bg-wood-brown/25" />
        <div className="h-px w-8 bg-muted-gold/40" />
        <div className="mt-1 w-full rounded-[3px] border border-muted-gold/55 bg-white p-1 shadow-sm">
          <div className="h-2 w-3/4 rounded-sm bg-wood-brown/30" />
          <div className="mt-1 h-2 w-1/2 rounded-sm bg-wood-brown/20" />
        </div>
      </div>
    ),
  },
];

export function TemplateSwitcher({ invitationId, currentTemplateId }: TemplateSwitcherProps) {
  const [isPending, startTransition] = useTransition();

  function handleSelect(templateId: number) {
    if (templateId === currentTemplateId || isPending) return;
    startTransition(async () => {
      await updateInvitationTemplate(invitationId, templateId);
    });
  }

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {TEMPLATES.map((t) => {
        const isActive = t.id === currentTemplateId;
        return (
          <button
            key={t.id}
            type="button"
            disabled={isPending}
            onClick={() => handleSelect(t.id)}
            className={`flex flex-col gap-2 rounded-xl border-2 p-4 text-left transition disabled:opacity-60 ${
              isActive
                ? "border-sage-green bg-sage-green/8 shadow-sm"
                : "border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50"
            }`}
          >
            <div className={`h-24 w-full overflow-hidden rounded-lg ${t.previewBg}`}>
              {t.preview}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                {isActive && !isPending && <CheckCircle2 size={12} className="shrink-0 text-sage-green" />}
                {isPending && <Loader2 size={12} className="shrink-0 animate-spin text-stone-400" />}
                <p className="text-xs font-semibold text-stone-800">{t.name}</p>
                {isActive && (
                  <span className="ml-auto rounded-full bg-sage-green/15 px-2 py-0.5 text-[10px] font-medium text-sage-green">
                    Aktif
                  </span>
                )}
              </div>
              <p className="mt-1 text-[10px] leading-snug text-stone-500">{t.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
