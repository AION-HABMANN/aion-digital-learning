"use client";

import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { Field } from "@/components/ui/Field";
import { CheckBar, Reading, ScorePick, TextBox } from "@/components/ui/Inputs";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { OrderList } from "@/components/ui/OrderList";
import { useStdSlice } from "@/components/dayStd/useStd";
import type { ReactNode } from "react";
import type { MaterialId } from "@/data/day1/materials";
import type { AnswerKeyBlock } from "@/lib/answerKey";
import { BLOCK_MINUTES, MIN_LINE } from "@/lib/dayStd/common";
import { euro, tt } from "@/lib/lang";
import { swap } from "@/lib/lists";
import type { MentorGuide as Guide } from "@/lib/mentorGuide";
import type { MissingEntry } from "@/lib/missing";
import type { OptionsPart } from "@/store/dayTypesStd";
import type { Score } from "@/store/useStore";

export type OptionsCfg = {
  day: number;
  options: { id: string; name: string; cost: number; weeks: number }[];
  /** The three criteria of the day, in the plan's own words: the first is the day's benefit (motivation, user value, learning impact). */
  criteria: [{ label: string; help: string }, { label: string; help: string }, { label: string; help: string }];
  effortBand: (cost: number) => 1 | 2 | 3;
  effortRule: string;
  title: string;
  findIt: string;
  refs: MaterialId[];
  intro: ReactNode;
  orderHelp: string;
  whyLabel: string;
  whyHelp: string;
  ids: { order: string; why: string };
  guide: () => Guide;
  key: () => AnswerKeyBlock;
  /** True where the second criterion is a judgement (Day 5: business value) and not the effort rule: there is then no effort check. */
  judgedSecond?: boolean;
  /** A small picture of each option, so a learner rates by looking (CLAUDE.md #52). */
  thumb?: (id: string) => ReactNode;
};

const LEVELS = () => ["", tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")];

/** Block 1.2 (Optional) of the standard days: three options rated on three criteria, put in order, with the one that matters most. */
export function OptionsBlock({ cfg, missing }: { cfg: OptionsCfg; missing: MissingEntry[] }) {
  const { r, patch, mentor } = useStdSlice<OptionsPart<string> & { checks: number }>(cfg.day, 1);
  const L = LEVELS();
  const ids = cfg.options.map((o) => o.id);
  const byId = Object.fromEntries(cfg.options.map((o) => [o.id, o]));
  const ordered = r.optOrder.length === ids.length;
  const order = ordered ? r.optOrder : ids;
  const keys = ["optImpact", "optEffort", "optRisk"] as const;
  const set = (key: (typeof keys)[number], id: string, v: Score) =>
    patch((s) => ({ [key]: { ...s[key], [id]: v }, ...(key === "optEffort" ? { optEffortFlags: s.optEffortFlags.filter((x) => x !== id), optEffortResult: null } : {}) }));
  const check = () =>
    patch((s) => {
      const wrong = ids.filter((id) => !!s.optEffort[id] && s.optEffort[id] !== cfg.effortBand(byId[id].cost));
      const rated = ids.filter((id) => !!s.optEffort[id]).length;
      return { checks: s.checks + 1, optEffortFlags: wrong, optEffortClue: false, optEffortResult: { holds: rated - wrong.length, rated } };
    });
  return (
    <AnswerBlock id="block-1-2" title={cfg.title} kind="OBJECTIVE + JUDGED" core={false} minutes={BLOCK_MINUTES["1.2"]} findIt={cfg.findIt}>
      <MaterialRefs refs={cfg.refs} />
      <div className="rounded-lg border border-line bg-canvas p-3 text-caption text-ink">{cfg.intro}</div>
      {cfg.options.map((o) => {
        const flagged = r.optEffortFlags.includes(o.id);
        return (
          <div key={o.id} id={`option-${o.id}`} className="space-y-3 rounded-lg border border-line bg-paper p-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-semibold text-ink">
                {o.id} · {o.name}
              </p>
              <p className="text-caption text-ash">
                {euro(o.cost)} · {o.weeks} {tt("weeks", "Wochen")}
              </p>
            </div>
            {cfg.thumb && <div className="w-40 max-w-full overflow-hidden rounded-md border border-line bg-canvas">{cfg.thumb(o.id)}</div>}
            <div className="grid gap-3 sm:grid-cols-3">
              {keys.map((key, i) => (
                <div key={key} className="space-y-1">
                  <p className="text-caption font-semibold text-ink">{cfg.criteria[i].label}</p>
                  <p className="text-micro normal-case tracking-normal text-ash">{cfg.criteria[i].help}</p>
                  <ScorePick value={r[key][o.id] ?? 0} onChange={(v) => set(key, o.id, v)} label={`${o.id}: ${cfg.criteria[i].label}`} flagged={key === "optEffort" && flagged && !cfg.judgedSecond} />
                  {r[key][o.id] ? <p className="text-micro text-ash">{L[r[key][o.id]]}</p> : null}
                </div>
              ))}
            </div>
            {flagged && !cfg.judgedSecond && r.optEffortClue && <Reading label={tt("Clue", "Hinweis")}>{tt(`Which price band is ${euro(o.cost)} in? The rule is in Materi A5: ${cfg.effortRule}.`, `In welches Preisband fallen ${euro(o.cost)}? Die Regel steht in Materi A5: ${cfg.effortRule}.`)}</Reading>}
          </div>
        );
      })}
      {!cfg.judgedSecond && (
      <div className="space-y-2">
        <CheckBar onCheck={check} checkLabel={tt("Check my effort ratings", "Meine Aufwandsbewertungen prüfen")} clueShown={r.optEffortClue} onClue={r.optEffortFlags.length ? () => patch({ optEffortClue: true }) : undefined} checks={r.checks} />
        {r.optEffortResult && (
          <Reading>
            {r.optEffortResult.rated === 0
              ? tt("No effort rating yet.", "Noch keine Aufwandsbewertung.")
              : tt(`${r.optEffortResult.holds} of ${r.optEffortResult.rated} effort ratings follow the printed cost. A flagged one is outlined. ${cfg.criteria[0].label} and risk are your judgement and are never marked.`, `${r.optEffortResult.holds} von ${r.optEffortResult.rated} Aufwandsbewertungen folgen den gedruckten Kosten. Eine markierte ist umrandet. ${cfg.criteria[0].label} und Risiko sind Ihr Urteil und werden nie markiert.`)}
          </Reading>
        )}
      </div>
      )}
      <Field id={cfg.ids.order} label={tt("Put the three options in priority order", "Bringen Sie die drei Optionen in eine Prioritätsreihenfolge")} help={cfg.orderHelp}>
        <OrderList<string> order={order} name={(id) => `${id} · ${byId[id].name}`} onMove={(id, dir) => patch((s) => ({ optOrder: swap(s.optOrder.length === ids.length ? s.optOrder : ids, id, dir) }))} />
        {!ordered && (
          <button type="button" onClick={() => patch({ optOrder: [...ids] })} className="btn-ghost btn-sm">
            {tt("Keep this order", "Diese Reihenfolge behalten")}
          </button>
        )}
      </Field>
      <TextBox id={cfg.ids.why} label={cfg.whyLabel} help={cfg.whyHelp} value={r.optWhy} onChange={(v) => patch({ optWhy: v })} min={MIN_LINE} rows={3} />
      <ExampleAnswer id="optwhy-example" guide={cfg.guide()} />
      {mentor && <MentorGuide guide={cfg.guide()} />}
      <AnswerKey block={cfg.key()} />
      <BlockMissing block="1.2" missing={missing} />
    </AnswerBlock>
  );
}
