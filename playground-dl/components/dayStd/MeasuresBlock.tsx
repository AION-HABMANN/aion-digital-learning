"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { BudgetBar } from "@/components/ui/BudgetBar";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { Field } from "@/components/ui/Field";
import { CheckBar, OptionList, Reading, ScorePick, TextBox } from "@/components/ui/Inputs";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { OrderList } from "@/components/ui/OrderList";
import { useStdSlice } from "@/components/dayStd/useStd";
import type { MaterialId } from "@/data/day1/materials";
import type { AnswerKeyBlock } from "@/lib/answerKey";
import { BLOCK_MINUTES, MIN_LINE, MIN_REASON, effortWrongOf } from "@/lib/dayStd/common";
import { euro, tt } from "@/lib/lang";
import { swap, syncOrder, toggleCapped } from "@/lib/lists";
import type { MentorGuide as Guide } from "@/lib/mentorGuide";
import type { MissingEntry } from "@/lib/missing";
import type { MeasuresPart } from "@/store/dayTypesStd";
import type { Score } from "@/store/useStore";

/** One candidate measure, as every standard day prints it: what it does, what a learner notices, its cost and weeks, and what it acts on. */
export type StdMeasure = { id: string; no: string; name: string; what: string; notice: string; cost: number; weeks: number; area: string };

export type MeasuresCfg = {
  day: number;
  measures: StdMeasure[];
  areaLabel: (area: string) => string;
  thumb?: (id: string) => ReactNode;
  budget: number;
  weeksLimit: number;
  pick: number;
  effortBand: (cost: number) => 1 | 2 | 3;
  /** The effort rule in words, e.g. “under €10,000, up to €20,000, above”. */
  effortRule: string;
  /** The name of the first criterion (“Learning impact”, “Motivation impact”, “User value”, “User impact”) and what it means in this day. */
  impact: { label: string; help: string };
  riskHelp: string;
  refs: MaterialId[];
  title: string;
  findIt: string;
  /** The measures the learner may fund, in words (“Measures EduCore could fund”). */
  listLabel: string;
  /** A day-specific sentence added after “The facts of Block 1.1 and the case brief are your evidence.” */
  evidenceNote: string;
  reasonHelp: string;
  orderWhyHelp: string;
  pain?: { label: string; help: string };
  ids: { pick: string; measure: (id: string) => string; reason: (id: string) => string; pain: (id: string) => string; order: string; orderWhy: string; missingInfo: string };
  guides: { reason: (id: string) => Guide; order: () => Guide; missing: () => Guide; pain?: (id: string) => Guide };
  key: () => AnswerKeyBlock;
};

const LEVELS = () => ["", tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")];

/** Block 2.2 (Core, Level 2) of every standard day: choose four of nine measures, rate each, order them, justify, and say what is missing. */
export function MeasuresBlock({ cfg, missing }: { cfg: MeasuresCfg; missing: MeasuresMissingProp }) {
  const { r, patch, mentor } = useStdSlice<MeasuresPart<string>>(cfg.day, 1);
  const [note, setNote] = useState("");
  const L = LEVELS();
  const byId = Object.fromEntries(cfg.measures.map((m) => [m.id, m]));
  const chosen = r.chosen;
  const full = chosen.length >= cfg.pick;
  const cost = chosen.reduce((s, id) => s + byId[id].cost, 0);
  const weeks = chosen.reduce((m, id) => Math.max(m, byId[id].weeks), 0);
  const set = (key: "impact" | "effort" | "risk", id: string, v: Score) =>
    patch((s) => ({ [key]: { ...s[key], [id]: v }, ...(key === "effort" ? { effortFlags: s.effortFlags.filter((x) => x !== id), effortResult: null } : {}) }));
  const check = () =>
    patch((s) => {
      const wrong = effortWrongOf(s, (id) => byId[id].cost, cfg.effortBand);
      const rated = s.chosen.filter((id) => !!s.effort[id]).length;
      return { checks: s.checks + 1, effortFlags: wrong, effortClue: false, effortResult: { holds: rated - wrong.length, rated } };
    });
  const criteria = [
    ["impact", cfg.impact.label, cfg.impact.help],
    ["effort", tt("Effort", "Aufwand"), tt("By the printed cost, with the rule in Materi A5.", "Nach den gedruckten Kosten, mit der Regel in Materi A5.")],
    ["risk", tt("Risk", "Risiko"), cfg.riskHelp],
  ] as const;
  return (
    <AnswerBlock id="block-2-2" title={cfg.title} kind="OBJECTIVE + JUDGED" core minutes={BLOCK_MINUTES["2.2"]} findIt={cfg.findIt}>
      <MaterialRefs refs={cfg.refs} />
      <div className="rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
        <p>
          <strong>{tt("The limits:", "Die Grenzen:")}</strong> {tt(`${cfg.weeksLimit} weeks, ${euro(cfg.budget)}.`, `${cfg.weeksLimit} Wochen, ${euro(cfg.budget)}.`)} {cfg.evidenceNote}
        </p>
      </div>

      <Field id={cfg.ids.pick} label={tt(`Step 1 · Choose exactly ${cfg.pick} of the nine measures`, `Schritt 1 · Wählen Sie genau ${cfg.pick} der neun Maßnahmen`)} help={tt("Each shows what it does, what a learner notices, its cost and its weeks, and what it acts on. You have chosen:", "Jede zeigt, was sie tut, was Lernende bemerken, ihre Kosten und Wochen, und worauf sie wirkt. Sie haben gewählt:") + ` ${chosen.length} / ${cfg.pick}`}>
        <OptionList<string>
          options={cfg.measures.map((m) => ({ id: m.id, label: `${m.no} · ${m.name} · ${euro(m.cost)} · ${m.weeks} ${tt("weeks", "Wochen")}`, tag: cfg.areaLabel(m.area), visual: cfg.thumb?.(m.id), sub: `${m.what}\n${tt("A learner notices:", "Lernende bemerken:")} ${m.notice}` }))}
          value={chosen}
          onChange={(id) => {
            setNote("");
            patch((s) => {
              const next = toggleCapped(s.chosen, id, cfg.pick);
              return { chosen: next, order: syncOrder(s.order, next), effortFlags: [], effortClue: false, effortResult: null };
            });
          }}
          multi
          cols={2}
          label={cfg.listLabel}
          disabledIds={full ? cfg.measures.map((m) => m.id) : []}
          onDisabledClick={() => setNote(tt(`You have ${cfg.pick}. Deselect one first.`, `Sie haben ${cfg.pick}. Wählen Sie zuerst eine ab.`))}
        />
        {note && <p role="status" className="text-caption text-ash">{note}</p>}
      </Field>

      {chosen.length > 0 && (
        <div className="space-y-2">
          <BudgetBar items={chosen.map((id) => ({ id, short: byId[id].no, cost: byId[id].cost }))} budget={cfg.budget} title={tt("Cost of the chosen measures against the budget", "Kosten der gewählten Maßnahmen gegen das Budget")} />
          <p className="text-caption text-ink" aria-live="polite">
            {tt(`Total ${euro(cost)} of ${euro(cfg.budget)}${cost > cfg.budget ? `, ${euro(cost - cfg.budget)} over` : ""}. Longest measure ${weeks} weeks of ${cfg.weeksLimit}${weeks > cfg.weeksLimit ? ", over" : ""}.`, `Gesamt ${euro(cost)} von ${euro(cfg.budget)}${cost > cfg.budget ? `, ${euro(cost - cfg.budget)} darüber` : ""}. Längste Maßnahme ${weeks} Wochen von ${cfg.weeksLimit}${weeks > cfg.weeksLimit ? ", darüber" : ""}.`)}{" "}
            {(cost > cfg.budget || weeks > cfg.weeksLimit) && <span className="text-ash">{tt("Going over is allowed; say why in the reasons below. It is printed in your file as a fact.", "Das Überschreiten ist erlaubt; sagen Sie in den Begründungen unten, warum. Es steht als Tatsache in Ihrer Datei.")}</span>}
          </p>
        </div>
      )}

      {chosen.map((id) => {
        const m = byId[id];
        const flagged = r.effortFlags.includes(id);
        return (
          <div key={id} id={cfg.ids.measure(id)} className="space-y-3 rounded-lg border border-line bg-paper p-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-semibold text-ink">
                {m.no} · {m.name}
              </p>
              <p className="text-caption text-ash">
                {euro(m.cost)} · {m.weeks} {tt("weeks", "Wochen")} · {cfg.areaLabel(m.area)}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {criteria.map(([key, label, help]) => (
                <div key={key} className="space-y-1">
                  <p className="text-caption font-semibold text-ink">{label}</p>
                  <p className="text-micro normal-case tracking-normal text-ash">{help}</p>
                  <ScorePick value={r[key][id] ?? 0} onChange={(v) => set(key, id, v)} label={`${m.no}: ${label}`} flagged={key === "effort" && flagged} />
                  {r[key][id] ? <p className="text-micro text-ash">{L[r[key][id]]}</p> : null}
                </div>
              ))}
            </div>
            {flagged && r.effortClue && <Reading label={tt("Clue", "Hinweis")}>{tt(`Which price band is ${euro(m.cost)} in? The rule is in Materi A5: ${cfg.effortRule}.`, `In welches Preisband fallen ${euro(m.cost)}? Die Regel steht in Materi A5: ${cfg.effortRule}.`)}</Reading>}
            {cfg.pain && (
              <>
                <TextBox id={cfg.ids.pain(id)} label={cfg.pain.label} help={cfg.pain.help} value={r.pain[id] ?? ""} onChange={(v) => patch((s) => ({ pain: { ...s.pain, [id]: v } }))} min={MIN_REASON} rows={2} />
                {cfg.guides.pain && <ExampleAnswer id={`pain-example-${id}`} guide={cfg.guides.pain(id)} />}
                {cfg.guides.pain && mentor && <MentorGuide guide={cfg.guides.pain(id)} />}
              </>
            )}
            <TextBox id={cfg.ids.reason(id)} label={tt("Why these ratings?", "Warum diese Bewertungen?")} help={cfg.reasonHelp} value={r.reasons[id] ?? ""} onChange={(v) => patch((s) => ({ reasons: { ...s.reasons, [id]: v } }))} min={MIN_REASON} rows={2} />
            <ExampleAnswer id={`reason-example-${id}`} guide={cfg.guides.reason(id)} />
            {mentor && <MentorGuide guide={cfg.guides.reason(id)} />}
          </div>
        );
      })}

      {chosen.length > 0 && (
        <div className="space-y-2">
          <CheckBar onCheck={check} checkLabel={tt("Check my effort ratings", "Meine Aufwandsbewertungen prüfen")} clueShown={r.effortClue} onClue={r.effortFlags.length ? () => patch({ effortClue: true }) : undefined} checks={r.checks} />
          {r.effortResult && (
            <Reading>
              {r.effortResult.rated === 0
                ? tt("No effort rating yet.", "Noch keine Aufwandsbewertung.")
                : tt(`${r.effortResult.holds} of ${r.effortResult.rated} effort ratings follow the printed cost. A flagged one is outlined. ${cfg.impact.label} and risk are your judgement and are never marked.`, `${r.effortResult.holds} von ${r.effortResult.rated} Aufwandsbewertungen folgen den gedruckten Kosten. Eine markierte ist umrandet. ${cfg.impact.label} und Risiko sind Ihr Urteil und werden nie markiert.`)}
            </Reading>
          )}
        </div>
      )}

      {chosen.length === cfg.pick && (
        <Field id={cfg.ids.order} label={tt(`Step 4 · Put your ${cfg.pick} measures in priority order`, `Schritt 4 · Bringen Sie Ihre ${cfg.pick} Maßnahmen in eine Prioritätsreihenfolge`)} help={tt("The first is the most important. Move one up or down with the arrows.", "Die erste ist die wichtigste. Verschieben Sie eine mit den Pfeilen nach oben oder unten.")}>
          <OrderList<string> order={r.order} name={(id) => `${byId[id].no} · ${byId[id].name}`} onMove={(id, dir) => patch((s) => ({ order: swap(s.order, id, dir) }))} />
        </Field>
      )}
      <TextBox id={cfg.ids.orderWhy} label={tt("Why does your first priority go first?", "Warum kommt Ihre erste Priorität zuerst?")} help={cfg.orderWhyHelp} value={r.orderWhy} onChange={(v) => patch({ orderWhy: v })} min={MIN_LINE} rows={3} />
      <ExampleAnswer id="order-example" guide={cfg.guides.order()} />
      {mentor && <MentorGuide guide={cfg.guides.order()} />}
      <TextBox
        id={cfg.ids.missingInfo}
        label={tt("What information are you missing?", "Welche Information fehlt Ihnen?")}
        help={tt(`Name something specific you do not know that would change your decision, and how you could find it out. At least ${MIN_LINE} characters.`, `Nennen Sie etwas Konkretes, das Sie nicht wissen und das Ihre Entscheidung ändern würde, und wie Sie es herausfinden könnten. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.missingInfo}
        onChange={(v) => patch({ missingInfo: v })}
        min={MIN_LINE}
        rows={3}
      />
      <ExampleAnswer id="missing-example" guide={cfg.guides.missing()} />
      {mentor && <MentorGuide guide={cfg.guides.missing()} />}
      <AnswerKey block={cfg.key()} />
      <BlockMissing block="2.2" missing={missing} />
    </AnswerBlock>
  );
}

type MeasuresMissingProp = MissingEntry[];
