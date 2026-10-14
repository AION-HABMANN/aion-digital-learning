import { FACT_BY_ID, FACT_IDS, GROUPS_MIN, MEASURE_BY_ID, PICK_CAUSES, PICK_MEASURES, PICK_METHODS } from "@/data/day7/case";
import { DECISION_BY_ID, EVAL_MIN, KPI_MIN, PLACES_MIN, R2_PICK } from "@/data/day7/route2";
import { MIN_FRAME, MIN_LINE, coreOnly, len, measuresMissing } from "@/lib/dayStd/common";
import { MIN_ROW } from "@/lib/day7/progress";
import { participantMissing, short } from "@/lib/missing";
import type { MissingEntry } from "@/lib/missing";
import { tt } from "@/lib/lang";
import type { Persisted } from "@/store/useStore";

/** DOM ids the missing list points at. One place, so the list and the UI cannot drift. */
export const IDS = {
  fact: (id: string) => `fact-${id}`,
  groups: "groups-field",
  groupsWhy: "groupswhy-field",
  improve: "improve-field",
  optOrder: "optorder-field",
  optWhy: "optwhy-field",
  causePick: "cause-pick",
  causeWhy: "causewhy-field",
  measurePick: "measure-pick",
  measure: (id: string) => `measure-${id}`,
  reason: (id: string) => `reason-${id}`,
  pain: (id: string) => `pain-${id}`,
  order: "order-field",
  orderWhy: "orderwhy-field",
  methods: "methods-field",
  methodsWhy: "methodswhy-field",
  missingInfo: "missinginfo-field",
  strategy: "strategy-field",
  places: "places-field",
  decisionPick: "decision-pick",
  decisionOrder: "decisionorder-field",
  decisionOrderWhy: "decisionorderwhy-field",
  kpis: "kpis-field",
  evals: "evals-field",
  readers: "readers-field",
  risk: "risk-field",
  riskPlan: "riskplan-field",
  decide: "decide-field",
  dontKnow: "dontknow-field",
  reverse: "reverse-field",
  giveUp: "giveup-field",
} as const;

/** Every label starts "Block X.Y:", in both languages. Optional blocks (CLAUDE.md #35) are never required: `coreOnly` drops their entries in one place. */
export function r1Missing(p: Persisted): MissingEntry[] {
  const out = participantMissing(p);
  const { r1 } = p.d7;
  const e = (id: string, label: string) => out.push({ id, label });

  // Block 1.1 (Core)
  for (const id of FACT_IDS)
    if (r1.sort[id] === null) e(IDS.fact(id), tt(`Block 1.1: fact ${FACT_BY_ID[id].no} is not sorted into a principle.`, `Block 1.1: Fakt ${FACT_BY_ID[id].no} ist keinem Prinzip zugeordnet.`));
  if (r1.groups.length < GROUPS_MIN) e(IDS.groups, tt(`Block 1.1: tick at least ${GROUPS_MIN} user groups that run into problems (you have ${r1.groups.length}).`, `Block 1.1: Haken Sie mindestens ${GROUPS_MIN} Nutzergruppen an, die auf Probleme stoßen (Sie haben ${r1.groups.length}).`));
  if (len(r1.groupsWhy) < MIN_LINE) e(IDS.groupsWhy, tt(`Block 1.1: name two groups, the fact (by number) that blocks each, and what they cannot do (at least ${MIN_LINE} characters).`, `Block 1.1: Nennen Sie zwei Gruppen, den Fakt (mit Nummer), der jede blockiert, und was sie nicht tun können (mindestens ${MIN_LINE} Zeichen).`));
  if (len(r1.improve) < MIN_FRAME) e(IDS.improve, tt(`Block 1.1: write three improvements, each starting with a verb, naming the fact it answers and who gains (at least ${MIN_FRAME} characters).`, `Block 1.1: Schreiben Sie drei Verbesserungen, jede mit einem Verb beginnend, mit dem Fakt, den sie beantwortet, und wer profitiert (mindestens ${MIN_FRAME} Zeichen).`));

  // Block 2.1 (Optional): entries exist so that its own notice can show them; they are dropped by coreOnly.
  if (r1.causes.length !== PICK_CAUSES) e(IDS.causePick, tt(`Block 2.1: choose exactly ${PICK_CAUSES} central barriers (you have ${r1.causes.length}).`, `Block 2.1: Wählen Sie genau ${PICK_CAUSES} zentrale Barrieren (Sie haben ${r1.causes.length}).`));
  if (len(r1.causeWhy) < MIN_LINE) e(IDS.causeWhy, tt(`Block 2.1: say which printed fact supports your first barrier and which group it blocks (at least ${MIN_LINE} characters).`, `Block 2.1: Sagen Sie, welcher gedruckte Fakt Ihre erste Barriere stützt und welche Gruppe sie blockiert (mindestens ${MIN_LINE} Zeichen).`));

  // Block 2.2 (Core)
  measuresMissing(
    r1,
    {
      pick: PICK_MEASURES,
      nameOf: (id) => MEASURE_BY_ID[id as keyof typeof MEASURE_BY_ID].name,
      criteria: tt("user impact", "Nutzerwirkung"),
      ids: { pick: IDS.measurePick, measure: IDS.measure, reason: IDS.reason, orderWhy: IDS.orderWhy, missingInfo: IDS.missingInfo },
    },
    out,
  );
  if (r1.methods.length !== PICK_METHODS) e(IDS.methods, tt(`Block 2.2: choose exactly ${PICK_METHODS} evaluation methods (you have ${r1.methods.length}).`, `Block 2.2: Wählen Sie genau ${PICK_METHODS} Evaluationsmethoden (Sie haben ${r1.methods.length}).`));
  if (len(r1.methodsWhy) < MIN_LINE) e(IDS.methodsWhy, tt(`Block 2.2: say what your three methods tell you that each of the others would not: one that gives reasons and one that gives counts or conformance (at least ${MIN_LINE} characters).`, `Block 2.2: Sagen Sie, was Ihre drei Methoden Ihnen sagen, was die anderen nicht sagen würden: eine, die Gründe liefert, und eine, die Zahlen oder Konformität liefert (mindestens ${MIN_LINE} Zeichen).`));
  return coreOnly(out);
}

export function r2Missing(p: Persisted): MissingEntry[] {
  const out = participantMissing(p);
  const { r2 } = p.d7;
  const e = (id: string, label: string) => out.push({ id, label });

  // Block 3.1 (Core)
  if (len(r2.strategy) < MIN_FRAME) e(IDS.strategy, tt(`Block 3.1: write your strategy for inclusive UX: which groups you aim to reach, what you change first, and why it is a core quality (at least ${MIN_FRAME} characters).`, `Block 3.1: Schreiben Sie Ihre Strategie für inklusive UX: welche Gruppen Sie erreichen wollen, was Sie zuerst ändern und warum es eine Kernqualität ist (mindestens ${MIN_FRAME} Zeichen).`));
  if (r2.places.length < PLACES_MIN) e(IDS.places, tt(`Block 3.1: choose at least ${PLACES_MIN} places in your processes where accessibility is checked (you have ${r2.places.length}).`, `Block 3.1: Wählen Sie mindestens ${PLACES_MIN} Stellen in Ihren Prozessen, an denen Barrierefreiheit geprüft wird (Sie haben ${r2.places.length}).`));
  if (r2.picks.length !== R2_PICK) e(IDS.decisionPick, tt(`Block 3.1: choose exactly ${R2_PICK} measures (you have ${r2.picks.length}).`, `Block 3.1: Wählen Sie genau ${R2_PICK} Maßnahmen (Sie haben ${r2.picks.length}).`));
  if (r2.picks.length === R2_PICK && len(r2.orderWhy) < MIN_LINE) {
    const first = DECISION_BY_ID[(r2.order[0] ?? r2.picks[0]) as keyof typeof DECISION_BY_ID];
    e(IDS.decisionOrderWhy, tt(`Block 3.1: say why “${short(first.name, 36)}” goes first: which groups it reaches and what waiting costs (at least ${MIN_LINE} characters).`, `Block 3.1: Begründen Sie, warum „${short(first.name, 36)}“ zuerst kommt: welche Gruppen sie erreicht und was Warten kostet (mindestens ${MIN_LINE} Zeichen).`));
  }

  // Block 3.2 (Core)
  if (r2.kpis.length < KPI_MIN) e(IDS.kpis, tt(`Block 3.2: choose at least ${KPI_MIN} KPIs for your evaluation system (you have ${r2.kpis.length}).`, `Block 3.2: Wählen Sie mindestens ${KPI_MIN} KPIs für Ihr Evaluationssystem (Sie haben ${r2.kpis.length}).`));
  if (r2.evals.length < EVAL_MIN) e(IDS.evals, tt(`Block 3.2: choose at least ${EVAL_MIN} evaluation methods (you have ${r2.evals.length}).`, `Block 3.2: Wählen Sie mindestens ${EVAL_MIN} Evaluationsmethoden (Sie haben ${r2.evals.length}).`));
  if (len(r2.readers) < MIN_LINE) e(IDS.readers, tt(`Block 3.2: say who reads the results, how often, and what they must do when a KPI is poor (at least ${MIN_LINE} characters).`, `Block 3.2: Sagen Sie, wer die Ergebnisse liest, wie oft und was zu tun ist, wenn ein KPI schlecht ist (mindestens ${MIN_LINE} Zeichen).`));
  if (!r2.risk) e(IDS.risk, tt("Block 3.2: choose the most likely reason the plan fails.", "Block 3.2: Wählen Sie den wahrscheinlichsten Grund, warum der Plan scheitert."));
  if (len(r2.riskPlan) < MIN_LINE) e(IDS.riskPlan, tt(`Block 3.2: name one action against that risk and compare its cost with the cost of the risk (at least ${MIN_LINE} characters).`, `Block 3.2: Nennen Sie eine Maßnahme gegen dieses Risiko und vergleichen Sie ihre Kosten mit den Kosten des Risikos (mindestens ${MIN_LINE} Zeichen).`));
  if (len(r2.decide) < MIN_ROW) e(IDS.decide, tt(`Block 3.2: write “I decide …” (at least ${MIN_ROW} characters).`, `Block 3.2: Schreiben Sie „Ich entscheide …“ (mindestens ${MIN_ROW} Zeichen).`));
  if (len(r2.dontKnow) < MIN_ROW) e(IDS.dontKnow, tt(`Block 3.2: write “I do not know …” (at least ${MIN_ROW} characters).`, `Block 3.2: Schreiben Sie „Ich weiß nicht …“ (mindestens ${MIN_ROW} Zeichen).`));
  if (len(r2.reverse) < MIN_LINE) e(IDS.reverse, tt(`Block 3.2: write “I reverse if … (a figure) … by … (a time)” (at least ${MIN_LINE} characters).`, `Block 3.2: Schreiben Sie „Ich nehme zurück, wenn … (eine Zahl) … bis … (eine Zeit)“ (mindestens ${MIN_LINE} Zeichen).`));
  if (len(r2.giveUp) < MIN_LINE) e(IDS.giveUp, tt(`Block 3.2: name what you give up or postpone (at least ${MIN_LINE} characters).`, `Block 3.2: Nennen Sie, worauf Sie verzichten oder was Sie verschieben (mindestens ${MIN_LINE} Zeichen).`));
  return coreOnly(out);
}
