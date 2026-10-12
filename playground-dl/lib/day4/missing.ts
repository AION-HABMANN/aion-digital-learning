import { FACT_BY_ID, FACT_IDS, MEASURE_BY_ID, PICK_MEASURES } from "@/data/day4/case";
import { DECISION_BY_ID, EVIDENCE_MIN, METRIC_MIN, R2_PICK } from "@/data/day4/route2";
import { MIN_FRAME, MIN_LINE, MIN_REASON, coreOnly, len, measuresMissing } from "@/lib/dayStd/common";
import { participantMissing, short } from "@/lib/missing";
import type { MissingEntry } from "@/lib/missing";
import { tt } from "@/lib/lang";
import type { Persisted } from "@/store/useStore";

/** DOM ids the missing list points at. One place, so the list and the UI cannot drift. */
export const IDS = {
  fact: (id: string) => `fact-${id}`,
  prefer: "prefer-field",
  preferWhy: "preferwhy-field",
  principle: (i: number) => `principle-${i}`,
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
  missingInfo: "missinginfo-field",
  strategy: "strategy-field",
  strategyWhy: "strategywhy-field",
  decisionPick: "decision-pick",
  decisionOrder: "decisionorder-field",
  decisionOrderWhy: "decisionorderwhy-field",
  metrics: "metrics-field",
  success: "success-field",
  risk: "risk-field",
  riskPlan: "riskplan-field",
  uncertain: "uncertain-field",
  owner: "owner-field",
  evidence: "evidence-field",
  giveUp: "giveup-field",
} as const;

/** Every label starts "Block X.Y:", in both languages. Optional blocks (CLAUDE.md #35) are never required: `coreOnly` drops their entries in one place. */
export function r1Missing(p: Persisted): MissingEntry[] {
  const out = participantMissing(p);
  const { r1 } = p.d4;
  const e = (id: string, label: string) => out.push({ id, label });

  // Block 1.1 (Core)
  for (const id of FACT_IDS)
    if (r1.sort[id] === null) e(IDS.fact(id), tt(`Block 1.1: fact ${FACT_BY_ID[id].no} is not sorted into a principle.`, `Block 1.1: Fakt ${FACT_BY_ID[id].no} ist keinem Prinzip zugeordnet.`));
  if (!r1.prefer) e(IDS.prefer, tt("Block 1.1: choose the platform you find more motivating.", "Block 1.1: Wählen Sie die Plattform, die Sie motivierender finden."));
  if (len(r1.preferWhy) < MIN_LINE) e(IDS.preferWhy, tt(`Block 1.1: say what you, as a learner, can see, do or feel on that platform (at least ${MIN_LINE} characters).`, `Block 1.1: Sagen Sie, was Sie als Lernende auf dieser Plattform sehen, tun oder fühlen (mindestens ${MIN_LINE} Zeichen).`));
  r1.principles.forEach((x, i) => {
    if (len(x) < MIN_REASON) e(IDS.principle(i), tt(`Block 1.1: write principle ${i + 1} as “Do X, because Y” (at least ${MIN_REASON} characters).`, `Block 1.1: Schreiben Sie Prinzip ${i + 1} als „Tun Sie X, weil Y“ (mindestens ${MIN_REASON} Zeichen).`));
  });

  // Block 2.2 (Core)
  measuresMissing(
    r1,
    {
      pick: PICK_MEASURES,
      nameOf: (id) => MEASURE_BY_ID[id as keyof typeof MEASURE_BY_ID].name,
      criteria: tt("motivation impact", "Motivationswirkung"),
      ids: { pick: IDS.measurePick, measure: IDS.measure, reason: IDS.reason, orderWhy: IDS.orderWhy, missingInfo: IDS.missingInfo },
    },
    out,
  );
  return coreOnly(out);
}

export function r2Missing(p: Persisted): MissingEntry[] {
  const out = participantMissing(p);
  const { r2 } = p.d4;
  const e = (id: string, label: string) => out.push({ id, label });

  // Block 3.1 (Core)
  if (!r2.strategy) e(IDS.strategy, tt("Block 3.1: choose where your motivation strategy leans: intrinsic, a mix or extrinsic.", "Block 3.1: Wählen Sie, wohin Ihre Motivationsstrategie neigt: intrinsisch, eine Mischung oder extrinsisch."));
  if (len(r2.strategyWhy) < MIN_LINE) e(IDS.strategyWhy, tt(`Block 3.1: say which condition (motivation, ability, prompt) your strategy works on, and for which learners (at least ${MIN_LINE} characters).`, `Block 3.1: Sagen Sie, auf welche Bedingung (Motivation, Können, Impuls) Ihre Strategie wirkt und für welche Lernenden (mindestens ${MIN_LINE} Zeichen).`));
  if (r2.picks.length !== R2_PICK) e(IDS.decisionPick, tt(`Block 3.1: choose exactly ${R2_PICK} decisions (you have ${r2.picks.length}).`, `Block 3.1: Wählen Sie genau ${R2_PICK} Entscheidungen (Sie haben ${r2.picks.length}).`));
  if (r2.picks.length === R2_PICK && len(r2.orderWhy) < MIN_LINE)
    e(IDS.decisionOrderWhy, tt(`Block 3.1: say why “${short(DECISION_BY_ID[(r2.order[0] ?? r2.picks[0]) as keyof typeof DECISION_BY_ID].name, 36)}” goes first (at least ${MIN_LINE} characters).`, `Block 3.1: Begründen Sie, warum „${short(DECISION_BY_ID[(r2.order[0] ?? r2.picks[0]) as keyof typeof DECISION_BY_ID].name, 36)}“ zuerst kommt (mindestens ${MIN_LINE} Zeichen).`));
  if (r2.metrics.length < METRIC_MIN) e(IDS.metrics, tt(`Block 3.1: choose at least ${METRIC_MIN} ways to measure success (you have ${r2.metrics.length}).`, `Block 3.1: Wählen Sie mindestens ${METRIC_MIN} Wege, den Erfolg zu messen (Sie haben ${r2.metrics.length}).`));
  if (len(r2.success) < MIN_FRAME) e(IDS.success, tt(`Block 3.1: write your success sentence: what, against what baseline, with what method, by when (at least ${MIN_FRAME} characters).`, `Block 3.1: Schreiben Sie Ihren Erfolgssatz: was, gegen welche Ausgangslage, mit welcher Methode, bis wann (mindestens ${MIN_FRAME} Zeichen).`));

  // Block 3.2 (Core)
  if (!r2.risk) e(IDS.risk, tt("Block 3.2: choose the biggest risk of your plan.", "Block 3.2: Wählen Sie das größte Risiko Ihres Plans."));
  if (len(r2.riskPlan) < MIN_REASON) e(IDS.riskPlan, tt(`Block 3.2: say what you do about that risk (at least ${MIN_REASON} characters).`, `Block 3.2: Sagen Sie, was Sie gegen dieses Risiko tun (mindestens ${MIN_REASON} Zeichen).`));
  if (len(r2.uncertain) < MIN_FRAME) e(IDS.uncertain, tt(`Block 3.2: write the decision you make under uncertainty: what you decide, what you do not know, when you would reverse it (at least ${MIN_FRAME} characters).`, `Block 3.2: Schreiben Sie die Entscheidung unter Unsicherheit: was Sie entscheiden, was Sie nicht wissen, wann Sie sie zurücknähmen (mindestens ${MIN_FRAME} Zeichen).`));
  if (!r2.owner) e(IDS.owner, tt("Block 3.2: choose who decides on UX optimisation in future.", "Block 3.2: Wählen Sie, wer künftig über die UX-Optimierung entscheidet."));
  if (r2.evidence.length < EVIDENCE_MIN) e(IDS.evidence, tt(`Block 3.2: choose at least ${EVIDENCE_MIN} kinds of evidence (you have ${r2.evidence.length}).`, `Block 3.2: Wählen Sie mindestens ${EVIDENCE_MIN} Arten von Belegen (Sie haben ${r2.evidence.length}).`));
  if (len(r2.giveUp) < MIN_LINE) e(IDS.giveUp, tt(`Block 3.2: name what you give up or postpone (at least ${MIN_LINE} characters).`, `Block 3.2: Nennen Sie, worauf Sie verzichten oder was Sie verschieben (mindestens ${MIN_LINE} Zeichen).`));
  return coreOnly(out);
}
