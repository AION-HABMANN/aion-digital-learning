"use client";

import type { ComponentType, ReactNode } from "react";
import { Callout } from "@/components/ui/MaterialCard";
import type { Brief } from "@/lib/dayGen/spec";
import { Gloss } from "@/lib/glossify";
import { tt } from "@/lib/lang";

/** What a day hands to the engine besides its spec: its pictures (React) and its study cards. */
export type GenKit = {
  /** The evidence of Block 1.1: the screens of the case, with their numbered markers. */
  Evidence: ComponentType;
  /** A small picture of each measure, option and decision, so a learner chooses by looking (CLAUDE.md #52). */
  measureThumb?: (id: string) => ReactNode;
  optionThumb?: (id: string) => ReactNode;
  decisionThumb?: (id: string) => ReactNode;
  MateriA: ComponentType;
  MateriB: ComponentType;
};

/** A case brief, read once: the paragraph, what the learner has, the limits and how the task runs (CLAUDE.md #12, #27). */
export function CaseBriefView({ id, b, headingId, extra }: { id: string; b: Brief; headingId: string; extra?: ReactNode }) {
  return (
    <section id={id} aria-labelledby={headingId} className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id={headingId}>{b.heading}</h2>
        <span className="smallcaps">{b.readTime}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>{b.paragraph}</Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        {b.have.items.length > 0 && (
          <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
            <p className="smallcaps">{b.have.title}</p>
            <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
              {b.have.items.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{b.limits.title}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            {b.limits.items.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{b.runTitle}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            {b.run.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
          {b.runNote && <p className="mt-1 text-ash">{b.runNote}</p>}
        </div>
      </div>
      {extra}
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{b.assumption}</p>
      </Callout>
    </section>
  );
}
