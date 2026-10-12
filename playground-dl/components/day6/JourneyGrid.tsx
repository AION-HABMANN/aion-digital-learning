"use client";

import clsx from "clsx";
import { EmotionCurve } from "@/components/day6/mocks";
import { MIN_CELL } from "@/lib/day6/progress";
import { len } from "@/lib/dayStd/common";
import { tt } from "@/lib/lang";
import type { Emotion, JCell } from "@/store/dayTypesStd";

export type JField = "does" | "thinks" | "pain" | "acts";

const LABEL: Record<JField, () => string> = {
  does: () => tt("What the person does", "Was die Person tut"),
  thinks: () => tt("What the person thinks", "Was die Person denkt"),
  pain: () => tt("Pain point", "Pain Point"),
  acts: () => tt("Where your strategy acts", "Wo Ihre Strategie ansetzt"),
};

/**
 * A journey grid (Materi A3): one card per phase with a few words for each field and an emotion from 1 (very frustrated) to 5 (very motivated), and a live
 * emotion curve under it. Used in Blocks 1.2, 2.1 and 3.2. A card is stacked on a phone and set side by side on a wide screen; every field is a labelled
 * textarea, and the emotion is a group of five real buttons (CLAUDE.md #16, #49).
 */
export function JourneyGrid({
  name,
  phases,
  value,
  onChange,
  fields,
  idOf,
}: {
  name: string;
  phases: { id: string; label: string }[];
  value: Record<string, JCell>;
  onChange: (phaseId: string, patch: Partial<JCell>) => void;
  fields: JField[];
  idOf: (phaseId: string) => string;
}) {
  const curve = phases.map((p) => ({ id: p.id, label: p.label, emotion: value[p.id]?.emotion ?? 0 }));
  const anyRated = curve.some((c) => c.emotion > 0);
  return (
    <div className="space-y-3">
      <div className={clsx("grid gap-3", phases.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2")}>
        {phases.map((p) => {
          const c = value[p.id];
          return (
            <div key={p.id} id={idOf(p.id)} className="space-y-2 rounded-lg border border-line bg-canvas p-3">
              <p className="text-body font-semibold text-ink">{p.label}</p>
              {fields.map((f) => (
                <div key={f}>
                  <label htmlFor={`${idOf(p.id)}-${f}`} className="smallcaps block">
                    {LABEL[f]()}
                  </label>
                  <textarea
                    id={`${idOf(p.id)}-${f}`}
                    rows={2}
                    className="field"
                    value={c?.[f] ?? ""}
                    onChange={(e) => onChange(p.id, { [f]: e.target.value } as Partial<JCell>)}
                    aria-label={`${name} · ${p.label} · ${LABEL[f]()}`}
                  />
                  <span className={clsx("tnum text-micro normal-case tracking-normal", len(c?.[f]) >= MIN_CELL ? "text-signal" : "text-ash")}>{`${len(c?.[f])} / ${MIN_CELL} ${tt("characters", "Zeichen")}`}</span>
                </div>
              ))}
              <div role="group" aria-label={`${name} · ${p.label} · ${tt("Emotion from 1 to 5", "Emotion von 1 bis 5")}`}>
                <p className="smallcaps">{tt("Emotion (1 very frustrated · 5 very motivated)", "Emotion (1 sehr frustriert · 5 sehr motiviert)")}</p>
                <div className="mt-1 flex gap-1.5">
                  {([1, 2, 3, 4, 5] as Emotion[]).map((n) => (
                    <button key={n} type="button" aria-pressed={c?.emotion === n} onClick={() => onChange(p.id, { emotion: n })} className={clsx("btn btn-sm min-h-[40px] min-w-[40px] border", c?.emotion === n ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {anyRated && (
        <div className="mx-auto w-full max-w-[420px]">
          <EmotionCurve phases={curve} selected={null} />
          <p className="text-center text-micro normal-case tracking-normal text-ash">{tt("Your emotion curve, drawn from the numbers you chose. The dashed ring marks the lowest point.", "Ihre Emotionskurve, aus den gewählten Zahlen gezeichnet. Der gestrichelte Ring markiert den tiefsten Punkt.")}</p>
        </div>
      )}
    </div>
  );
}
