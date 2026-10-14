"use client";

import clsx from "clsx";
import { useState } from "react";
import type { ReactNode } from "react";
import { OptionGrid } from "@/components/day1/diagrams";
import type { GridRow } from "@/components/day1/diagrams";
import { CostBands, MatrixFig } from "@/components/materi/figures";
import type { MatrixPoint } from "@/components/materi/figures";
import { Diagram, Insight, Story, ThePoint, useStory } from "@/components/materi/kit";
import type { StoryPlan } from "@/components/materi/kit";
import { euro, tt } from "@/lib/lang";

/**
 * Teaching figures that every generic day (Day 8 onward) builds its cards from, so a day writes its pictures and its sentences and not its controls (CLAUDE.md #20, #36,
 * #52). Each carries "The point", a story that drives the same state the learner's own buttons set, and an always-visible "What this shows". The learner's own buttons
 * leave the story, so the narration never disagrees with the picture.
 */
const Btn = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) => (
  <button type="button" aria-pressed={on} onClick={onClick} className={clsx("btn btn-sm min-h-[40px] border text-left", on ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
    {children}
  </button>
);

/* ------------------------------------------------------------------ one picture with several states, chosen by buttons (exclusive) */

export type FigState = { id: string; button: string; picture: ReactNode; insight: string };
export type FigStep = { title: string; say: string; look?: string };

export function StateFig({ label, point, states, steps, stepStates, caption }: { label: string; point: string; states: FigState[]; steps: FigStep[]; stepStates: string[]; caption?: ReactNode }) {
  const [cur, setCur] = useState(states[0].id);
  const story = useStory(steps.map((s, i) => ({ ...s, apply: () => setCur(stepStates[i]) })) satisfies StoryPlan[]);
  const st = states.find((s) => s.id === cur) ?? states[0];
  return (
    <Diagram label={label} caption={caption}>
      <div className="space-y-3">
        <ThePoint>{point}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <div role="radiogroup" aria-label={tt("Choose a version", "Wählen Sie eine Fassung")} className="flex flex-wrap gap-2">
          {states.map((s) => (
            <Btn key={s.id} on={cur === s.id} onClick={() => { story.leave(); setCur(s.id); }}>
              {s.button}
            </Btn>
          ))}
        </div>
        <div className={clsx("mx-auto max-w-[440px]", story.step !== null && "anim-pulse rounded-lg")}>{st.picture}</div>
        <Insight>{st.insight}</Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ one picture with several switches (each on or off) */

export type FigSwitch = { id: string; label: string };
export type SwitchStep = FigStep & { on: Record<string, boolean> };

export function SwitchFig({
  label,
  point,
  switches,
  start,
  picture,
  insight,
  steps,
  caption,
}: {
  label: string;
  point: string;
  switches: FigSwitch[];
  start: Record<string, boolean>;
  picture: (on: Record<string, boolean>) => ReactNode;
  insight: (on: Record<string, boolean>) => string;
  steps: SwitchStep[];
  caption?: ReactNode;
}) {
  const [on, setOn] = useState<Record<string, boolean>>(start);
  const story = useStory(steps.map((s) => ({ ...s, apply: () => setOn({ ...s.on }) })) satisfies StoryPlan[]);
  return (
    <Diagram label={label} caption={caption}>
      <div className="space-y-3">
        <ThePoint>{point}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <div role="group" aria-label={tt("Switch each part on or off", "Schalten Sie jeden Teil ein oder aus")} className="flex flex-wrap gap-2">
          {switches.map((s) => (
            <Btn key={s.id} on={!!on[s.id]} onClick={() => { story.leave(); setOn((o) => ({ ...o, [s.id]: !o[s.id] })); }}>
              <span aria-hidden className="mr-1.5">{on[s.id] ? "☑" : "☐"}</span>
              {s.label}
            </Btn>
          ))}
        </div>
        <div className={clsx("mx-auto max-w-[440px]", story.step !== null && "anim-pulse rounded-lg")}>{picture(on)}</div>
        <Insight>{insight(on)}</Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ a worked example: three measures weighed (A5 of every day) */

export type WeighItem = {
  id: string;
  name: string;
  cost: number;
  thumb?: ReactNode;
  impact: { level: 1 | 2 | 3; reason: string; note?: string };
  effortReason: string;
  risk: { level: 1 | 2 | 3; reason: string };
};

/** The example company weighs three measures on the three ratings; effort is read from the printed cost by the day's rule. */
export function WeighFig({
  label,
  point,
  company,
  budget,
  bands,
  band,
  impactLabel,
  items,
  steps,
  stepRows,
}: {
  label: string;
  point: string;
  company: string;
  budget: number;
  /** The effort bands for the cost bars: `to` is the upper limit of the band (null for the last). */
  bands: { to: number | null; label: string }[];
  band: (cost: number) => 1 | 2 | 3;
  impactLabel: string;
  items: WeighItem[];
  steps: FigStep[];
  /** For each story step, the row it talks about (or null). */
  stepRows: (string | null)[];
}) {
  const [sel, setSel] = useState<string | null>(null);
  const story = useStory(steps.map((s, i) => ({ ...s, apply: () => setSel(stepRows[i] ? `${stepRows[i]}.effort` : null) })) satisfies StoryPlan[]);
  const rows: GridRow[] = items.map((it) => ({
    id: it.id,
    name: it.name,
    sub: euro(it.cost),
    cells: {
      impact: { level: it.impact.level, reason: it.impact.reason, note: it.impact.note },
      effort: { level: band(it.cost), note: euro(it.cost), reason: it.effortReason },
      risk: { level: it.risk.level, reason: it.risk.reason },
    },
  }));
  return (
    <Diagram label={label}>
      <div className="space-y-3">
        <ThePoint>{point}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        {items.some((i) => i.thumb) && (
          <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
            {items.map((it) => (
              <div key={it.id}>
                {it.thumb}
                <p className="mt-1 text-caption font-semibold text-ink">{it.name}</p>
              </div>
            ))}
          </div>
        )}
        <CostBands title={`${company}: ${items.map((i) => i.name).join("; ")}`} bars={items.map((i) => ({ name: i.name, cost: i.cost }))} budget={budget} bands={bands} />
        <OptionGrid
          label={`${company} · ${tt("budget", "Budget")} ${euro(budget)}`}
          caption={tt(`Three measures for ${company} (Case assumption, example company)`, `Drei Maßnahmen für ${company} (Fallannahme, Beispielunternehmen)`)}
          rows={rows}
          cols={[
            { id: "impact", label: impactLabel },
            { id: "effort", label: tt("Effort", "Aufwand") },
            { id: "risk", label: tt("Risk", "Risiko") },
          ]}
          selected={sel}
          onSelect={(k) => {
            story.leave();
            setSel(k);
          }}
        />
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ a two-axis matrix with a story */

export function MatrixStory({
  label,
  point,
  title,
  xLabel,
  yLabel,
  quads,
  points,
  steps,
  stepPoints,
}: {
  label: string;
  point: string;
  title: string;
  xLabel: string;
  yLabel: string;
  quads: [string, string, string, string];
  points: MatrixPoint[];
  steps: FigStep[];
  stepPoints: (string | null)[];
}) {
  const [sel, setSel] = useState<string | null>(null);
  const [spot, setSpot] = useState<string | null>(null);
  const story = useStory(steps.map((s, i) => ({ ...s, apply: () => { setSel(stepPoints[i]); setSpot(stepPoints[i]); } })) satisfies StoryPlan[]);
  const cur = points.find((p) => p.id === sel);
  return (
    <Diagram label={label}>
      <div className="space-y-3">
        <ThePoint>{point}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <MatrixFig
          title={title}
          xLabel={xLabel}
          yLabel={yLabel}
          quads={quads}
          points={points}
          selected={sel}
          onSelect={(id) => {
            story.leave();
            setSpot(null);
            setSel(id);
          }}
          spot={spot}
        />
        <Insight>
          {cur
            ? tt(`In plain words: ${cur.letter} · ${cur.name}. ${cur.reading}`, `In einfachen Worten: ${cur.letter} · ${cur.name}. ${cur.reading}`)
            : tt("Select a point to read why it sits where it does. A position is a reading of this example company, not a score.", "Wählen Sie einen Punkt, um zu lesen, warum er dort liegt. Eine Position ist eine Lesart dieses Beispielunternehmens, keine Note.")}
        </Insight>
      </div>
    </Diagram>
  );
}
