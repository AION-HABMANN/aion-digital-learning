import { FACT_BY_ID, FACT_IDS, MEASURE_BY_ID, PICK_CAUSES, PICK_MEASURES, PROBLEM_BY_ID } from "@/data/day5/case";
import { DECISION_BY_ID, EVIDENCE_MIN, R2_PICK } from "@/data/day5/route2";
import { MIN_FRAME, MIN_LINE, MIN_REASON, coreOnly, len, measuresMissing } from "@/lib/dayStd/common";
import { MIN_ROW } from "@/lib/day5/progress";
import { participantMissing, short } from "@/lib/missing";
import type { MissingEntry } from "@/lib/missing";
import { tt } from "@/lib/lang";
import type { Persisted } from "@/store/useStore";

/** DOM ids the missing list points at. One place, so the list and the UI cannot drift. */
export const IDS = {
  goal: "goal-field",
  fact: (id: string) => `fact-${id}`,
  worst: "worst-field",
  worstWhy: "worstwhy-field",
  expectations: "expectations-field",
  optOrder: "optorder-field",
  optWhy: "optwhy-field",
  causePick: "cause-pick",
  error: (id: string) => `error-${id}`,
  measurePick: "measure-pick",
  measure: (id: string) => `measure-${id}`,
  reason: (id: string) => `reason-${id}`,
  pain: (id: string) => `pain-${id}`,
  order: "order-field",
  orderWhy: "orderwhy-field",
  missingInfo: "missinginfo-field",
  needs: "needs-field",
  decisionPick: "decision-pick",
  decisionOrder: "decisionorder-field",
  decisionOrderWhy: "decisionorderwhy-field",
  conflict: (id: string) => `conflict-${id}`,
  risk: "risk-field",
  riskPlan: "riskplan-field",
  owner: "owner-field",
  evidence: "evidence-field",
  rule: "rule-field",
  uncertain: "uncertain-field",
  giveUp: "giveup-field",
} as const;

/** Every label starts "Block X.Y:", in both languages. Optional blocks (CLAUDE.md #35) are never required: `coreOnly` drops their entries in one place. */
export function r1Missing(p: Persisted): MissingEntry[] {
  const out = participantMissing(p);
  const { r1 } = p.d5;
  const e = (id: string, label: string) => out.push({ id, label });

  // Block 1.1 (Core)
  if (len(r1.goal) < MIN_LINE) e(IDS.goal, tt(`Block 1.1: write your goal as a learner, as a task in everyday words, with your situation (at least ${MIN_LINE} characters).`, `Block 1.1: Schreiben Sie Ihr Ziel als Lernende, als Aufgabe in Alltagsworten, mit Ihrer Situation (mindestens ${MIN_LINE} Zeichen).`));
  for (const id of FACT_IDS)
    if (r1.sort[id] === null) e(IDS.fact(id), tt(`Block 1.1: fact ${FACT_BY_ID[id].no} is not sorted into a mistake.`, `Block 1.1: Fakt ${FACT_BY_ID[id].no} ist keinem Fehler zugeordnet.`));
  if (!r1.worst) e(IDS.worst, tt("Block 1.1: choose the fact that would frustrate you most as a learner.", "Block 1.1: Wählen Sie den Fakt, der Sie als Lernende am meisten frustrieren würde."));
  if (len(r1.worstWhy) < MIN_LINE) e(IDS.worstWhy, tt(`Block 1.1: say what you expected to see and what you saw instead (at least ${MIN_LINE} characters).`, `Block 1.1: Sagen Sie, was Sie erwartet haben und was Sie stattdessen sahen (mindestens ${MIN_LINE} Zeichen).`));
  if (len(r1.expectations) < MIN_FRAME) e(IDS.expectations, tt(`Block 1.1: write three expectations of a good platform, each starting “I expect…” (at least ${MIN_FRAME} characters).`, `Block 1.1: Schreiben Sie drei Erwartungen an eine gute Plattform, jeweils beginnend mit „Ich erwarte …“ (mindestens ${MIN_FRAME} Zeichen).`));

  // Block 2.1 (Optional) entries exist so that its own notice can show them; they are dropped by coreOnly.
  if (r1.causes.length !== PICK_CAUSES) e(IDS.causePick, tt(`Block 2.1: choose exactly ${PICK_CAUSES} user problems (you have ${r1.causes.length}).`, `Block 2.1: Wählen Sie genau ${PICK_CAUSES} Nutzerprobleme (Sie haben ${r1.causes.length}).`));
  for (const id of r1.causes)
    if (len(r1.errors[id]) < MIN_ROW) e(IDS.error(id), tt(`Block 2.1: name the design error behind “${short(PROBLEM_BY_ID[id].text, 36)}” and the fact number that shows it.`, `Block 2.1: Nennen Sie den Designfehler hinter „${short(PROBLEM_BY_ID[id].text, 36)}“ und die Faktnummer, die ihn zeigt.`));

  // Block 2.2 (Core)
  measuresMissing(
    r1,
    {
      pick: PICK_MEASURES,
      nameOf: (id) => MEASURE_BY_ID[id as keyof typeof MEASURE_BY_ID].name,
      criteria: tt("user value", "Nutzerwert"),
      ids: { pick: IDS.measurePick, measure: IDS.measure, reason: IDS.reason, orderWhy: IDS.orderWhy, missingInfo: IDS.missingInfo },
    },
    out,
  );
  return coreOnly(out);
}

export function r2Missing(p: Persisted): MissingEntry[] {
  const out = participantMissing(p);
  const { r2 } = p.d5;
  const e = (id: string, label: string) => out.push({ id, label });

  // Block 3.1 (Core)
  if (len(r2.needs) < MIN_FRAME) e(IDS.needs, tt(`Block 3.1: define the central user needs: two or three needs, each as who, what they want to do, and what the business gets (at least ${MIN_FRAME} characters).`, `Block 3.1: Definieren Sie die zentralen Nutzerbedürfnisse: zwei oder drei Bedürfnisse, jeweils als wer, was sie tun wollen und was das Unternehmen bekommt (mindestens ${MIN_FRAME} Zeichen).`));
  if (r2.picks.length !== R2_PICK) e(IDS.decisionPick, tt(`Block 3.1: choose exactly ${R2_PICK} strategic decisions (you have ${r2.picks.length}).`, `Block 3.1: Wählen Sie genau ${R2_PICK} strategische Entscheidungen (Sie haben ${r2.picks.length}).`));
  for (const id of r2.picks) {
    const c = r2.conflict[id];
    if (len(c?.user) < MIN_ROW || len(c?.business) < MIN_ROW || len(c?.lost) < MIN_ROW) e(IDS.conflict(id), tt(`Block 3.1: fill in the conflict analysis for “${short(DECISION_BY_ID[id as keyof typeof DECISION_BY_ID].name, 36)}”: what the user gets, what the business gets, what is lost or postponed.`, `Block 3.1: Füllen Sie die Konfliktanalyse für „${short(DECISION_BY_ID[id as keyof typeof DECISION_BY_ID].name, 36)}“ aus: was die Nutzer bekommen, was das Unternehmen bekommt, was verloren geht oder verschoben wird.`));
  }
  if (r2.picks.length === R2_PICK && len(r2.orderWhy) < MIN_LINE)
    e(IDS.decisionOrderWhy, tt(`Block 3.1: say why “${short(DECISION_BY_ID[(r2.order[0] ?? r2.picks[0]) as keyof typeof DECISION_BY_ID].name, 36)}” goes first (at least ${MIN_LINE} characters).`, `Block 3.1: Begründen Sie, warum „${short(DECISION_BY_ID[(r2.order[0] ?? r2.picks[0]) as keyof typeof DECISION_BY_ID].name, 36)}“ zuerst kommt (mindestens ${MIN_LINE} Zeichen).`));

  // Block 3.2 (Core)
  if (!r2.risk) e(IDS.risk, tt("Block 3.2: choose the biggest risk of your plan.", "Block 3.2: Wählen Sie das größte Risiko Ihres Plans."));
  if (len(r2.riskPlan) < MIN_REASON) e(IDS.riskPlan, tt(`Block 3.2: say what you do about that risk (at least ${MIN_REASON} characters).`, `Block 3.2: Sagen Sie, was Sie gegen dieses Risiko tun (mindestens ${MIN_REASON} Zeichen).`));
  if (!r2.owner) e(IDS.owner, tt("Block 3.2: choose who decides what goes on the roadmap.", "Block 3.2: Wählen Sie, wer entscheidet, was auf die Roadmap kommt."));
  if (r2.evidence.length < EVIDENCE_MIN) e(IDS.evidence, tt(`Block 3.2: choose at least ${EVIDENCE_MIN} kinds of evidence (you have ${r2.evidence.length}).`, `Block 3.2: Wählen Sie mindestens ${EVIDENCE_MIN} Arten von Belegen (Sie haben ${r2.evidence.length}).`));
  if (len(r2.rule) < MIN_LINE) e(IDS.rule, tt(`Block 3.2: write the rule every new feature must pass before it is built (at least ${MIN_LINE} characters).`, `Block 3.2: Schreiben Sie die Regel, die jedes neue Feature bestehen muss, bevor es gebaut wird (mindestens ${MIN_LINE} Zeichen).`));
  if (len(r2.uncertain) < MIN_FRAME) e(IDS.uncertain, tt(`Block 3.2: write the decision you make without complete user data: what you decide, what you do not know, when you would reverse it (at least ${MIN_FRAME} characters).`, `Block 3.2: Schreiben Sie die Entscheidung ohne vollständige Nutzerdaten: was Sie entscheiden, was Sie nicht wissen, wann Sie sie zurücknähmen (mindestens ${MIN_FRAME} Zeichen).`));
  if (len(r2.giveUp) < MIN_LINE) e(IDS.giveUp, tt(`Block 3.2: name what you give up or postpone (at least ${MIN_LINE} characters).`, `Block 3.2: Nennen Sie, worauf Sie verzichten oder was Sie verschieben (mindestens ${MIN_LINE} Zeichen).`));
  return coreOnly(out);
}
