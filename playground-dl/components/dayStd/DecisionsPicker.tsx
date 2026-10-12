"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { BudgetBar } from "@/components/ui/BudgetBar";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { Field } from "@/components/ui/Field";
import { OptionList, TextBox } from "@/components/ui/Inputs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { OrderList } from "@/components/ui/OrderList";
import { useStdSlice } from "@/components/dayStd/useStd";
import { MIN_LINE } from "@/lib/dayStd/common";
import { euro, tt } from "@/lib/lang";
import { swap, syncOrder, toggleCapped } from "@/lib/lists";
import type { MentorGuide as Guide } from "@/lib/mentorGuide";
import type { DecisionsPart } from "@/store/dayTypesStd";

export type DecisionItem = { id: string; no: string; name: string; what: string; cost: number; weeks: number; area: string };

export type DecisionsCfg = {
  day: number;
  items: DecisionItem[];
  areaLabel: (area: string) => string;
  thumb?: (id: string) => ReactNode;
  budget: number;
  pick: number;
  /** The yearly budget label in the bar, e.g. “the yearly budget”. */
  pickLabel: string;
  listLabel: string;
  orderLabel: string;
  whyLabel: string;
  whyHelp: string;
  ids: { pick: string; order: string; orderWhy: string };
  guide: () => Guide;
  /** Extra content under the order field (for example a conflict table). */
  afterOrder?: ReactNode;
};

/** In Route 2 of every standard day: choose N of seven decisions, see the cost against the yearly budget, put them in order, and say why the first goes first. */
export function DecisionsPicker({ cfg }: { cfg: DecisionsCfg }) {
  const { r, patch, mentor } = useStdSlice<DecisionsPart<string>>(cfg.day, 2);
  const [note, setNote] = useState("");
  const byId = Object.fromEntries(cfg.items.map((d) => [d.id, d]));
  const full = r.picks.length >= cfg.pick;
  const cost = r.picks.reduce((s, id) => s + byId[id].cost, 0);
  return (
    <>
      <Field id={cfg.ids.pick} label={tt(`Choose exactly ${cfg.pick} ${cfg.pickLabel}`, `Wählen Sie genau ${cfg.pick} ${cfg.pickLabel}`)} help={tt("Each shows what it is, its cost and its weeks, and what it acts on. You have chosen:", "Jede zeigt, was sie ist, ihre Kosten und Wochen und worauf sie wirkt. Sie haben gewählt:") + ` ${r.picks.length} / ${cfg.pick}`}>
        <OptionList<string>
          options={cfg.items.map((d) => ({ id: d.id, label: `${d.no} · ${d.name} · ${euro(d.cost)} · ${d.weeks} ${tt("weeks", "Wochen")}`, tag: cfg.areaLabel(d.area), visual: cfg.thumb?.(d.id), sub: d.what }))}
          value={r.picks}
          onChange={(id) => {
            setNote("");
            patch((s) => {
              const picks = toggleCapped(s.picks, id, cfg.pick);
              return { picks, order: syncOrder(s.order, picks) };
            });
          }}
          multi
          cols={2}
          label={cfg.listLabel}
          disabledIds={full ? cfg.items.map((d) => d.id) : []}
          onDisabledClick={() => setNote(tt(`You have ${cfg.pick}. Deselect one first.`, `Sie haben ${cfg.pick}. Wählen Sie zuerst eine ab.`))}
        />
        {note && <p role="status" className="text-caption text-ash">{note}</p>}
      </Field>
      {r.picks.length > 0 && (
        <div className="space-y-2">
          <BudgetBar items={r.picks.map((id) => ({ id, short: byId[id].no, cost: byId[id].cost }))} budget={cfg.budget} title={tt("Cost of the chosen decisions against the yearly budget", "Kosten der gewählten Entscheidungen gegen das Jahresbudget")} />
          <p className="text-caption text-ink" aria-live="polite">
            {tt(`Total ${euro(cost)} of ${euro(cfg.budget)}${cost > cfg.budget ? `, ${euro(cost - cfg.budget)} over` : ""}.`, `Gesamt ${euro(cost)} von ${euro(cfg.budget)}${cost > cfg.budget ? `, ${euro(cost - cfg.budget)} darüber` : ""}.`)}{" "}
            {cost > cfg.budget && <span className="text-ash">{tt("Going over is allowed; say why. It is printed in the memo as a fact.", "Das Überschreiten ist erlaubt; sagen Sie, warum. Es steht als Tatsache im Memo.")}</span>}
          </p>
        </div>
      )}
      {r.picks.length === cfg.pick && (
        <Field id={cfg.ids.order} label={cfg.orderLabel} help={tt("The first is the most important. Move one up or down with the arrows.", "Die erste ist die wichtigste. Verschieben Sie eine mit den Pfeilen nach oben oder unten.")}>
          <OrderList<string> order={r.order} name={(id) => `${byId[id].no} · ${byId[id].name}`} onMove={(id, dir) => patch((s) => ({ order: swap(s.order, id, dir) }))} />
        </Field>
      )}
      {cfg.afterOrder}
      <TextBox id={cfg.ids.orderWhy} label={cfg.whyLabel} help={cfg.whyHelp} value={r.orderWhy} onChange={(v) => patch({ orderWhy: v })} min={MIN_LINE} rows={3} />
      <ExampleAnswer id="decisionorder-example" guide={cfg.guide()} />
      {mentor && <MentorGuide guide={cfg.guide()} />}
    </>
  );
}
