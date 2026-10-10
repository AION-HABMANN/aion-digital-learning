import { FACT_BY_ID, FACT_IDS, MEASURE_BY_ID, PICK_MEASURES } from "@/data/day3/case";
import { CHECK_MIN, DECISION_BY_ID, R2_PICK } from "@/data/day3/route2";
import { MIN_FRAME, MIN_LINE, MIN_REASON, MIN_SENTENCE, OPTIONAL_BLOCKS } from "@/lib/day3/progress";
import { participantMissing, short } from "@/lib/missing";
import type { MissingEntry } from "@/lib/missing";
import { tt } from "@/lib/lang";
import type { Persisted } from "@/store/useStore";

/** DOM ids the missing list points at. One place, so the list and the UI cannot drift. */
export const IDS = {
  fact: (id: string) => `fact-${id}`,
  worst: "worst-field",
  worstWhy: "worstwhy-field",
  improve: "improve-field",
  optOrder: "optorder-field",
  optWhy: "optwhy-field",
  causePick: "cause-pick",
  causeWhy: "causewhy-field",
  measurePick: "measure-pick",
  measure: (id: string) => `measure-${id}`,
  reason: (id: string) => `reason-${id}`,
  order: "order-field",
  orderWhy: "orderwhy-field",
  missingInfo: "missinginfo-field",
  strategy: "strategy-field",
  definition: "definition-field",
  decisionPick: "decision-pick",
  decisionOrder: "decisionorder-field",
  decisionOrderWhy: "decisionorderwhy-field",
  risk: "risk-field",
  riskPlan: "riskplan-field",
  owner: "owner-field",
  lessonChecks: "lessonchecks-field",
  uncertain: "uncertain-field",
  giveUp: "giveup-field",
} as const;

/**
 * Optional blocks (CLAUDE.md #35) are never required: their entries are dropped here, in one place, so the Export notice, the per-block
 * notice (#34) and the dossier ring agree. Every label starts "Block X.Y:", in both languages.
 */
const BLOCK_OF = { b12: "1.2", b13: "1.3", b21: "2.1" } as const;
const OPTIONAL_PREFIXES = OPTIONAL_BLOCKS.map((b) => `Block ${BLOCK_OF[b as keyof typeof BLOCK_OF]}:`);
const coreOnly = (list: MissingEntry[]) => list.filter((m) => !OPTIONAL_PREFIXES.some((p) => m.label.startsWith(p)));

export function r1Missing(p: Persisted): MissingEntry[] {
  const out = participantMissing(p);
  const { r1 } = p.d3;
  const e = (id: string, label: string) => out.push({ id, label });

  // Block 1.1 (Core)
  for (const id of FACT_IDS)
    if (r1.sort[id] === null) e(IDS.fact(id), tt(`Block 1.1: fact ${FACT_BY_ID[id].no} is not sorted into Amount, Form or Order and purpose.`, `Block 1.1: Fakt ${FACT_BY_ID[id].no} ist nicht in Menge, Form oder Ordnung und Zweck einsortiert.`));
  if (!r1.worst) e(IDS.worst, tt("Block 1.1: choose the fact that would make you stop first.", "Block 1.1: Wählen Sie den Fakt, bei dem Sie zuerst aufhören würden."));
  if (r1.worstWhy.trim().length < MIN_LINE) e(IDS.worstWhy, tt(`Block 1.1: say how the learning process feels, from the learner's side (at least ${MIN_LINE} characters).`, `Block 1.1: Sagen Sie, wie sich der Lernprozess anfühlt, aus Sicht der Lernenden (mindestens ${MIN_LINE} Zeichen).`));
  if (r1.improve.trim().length < MIN_LINE) e(IDS.improve, tt(`Block 1.1: say what you would improve and which fact each improvement answers (at least ${MIN_LINE} characters).`, `Block 1.1: Sagen Sie, was Sie verbessern würden und welchen Fakt jede Verbesserung beantwortet (mindestens ${MIN_LINE} Zeichen).`));

  // Block 2.2 (Core)
  if (r1.chosen.length !== PICK_MEASURES) e(IDS.measurePick, tt(`Block 2.2: choose exactly ${PICK_MEASURES} measures (you have ${r1.chosen.length}).`, `Block 2.2: Wählen Sie genau ${PICK_MEASURES} Maßnahmen (Sie haben ${r1.chosen.length}).`));
  for (const id of r1.chosen) {
    const name = MEASURE_BY_ID[id].name;
    if (!r1.impact[id] || !r1.effort[id] || !r1.risk[id]) e(IDS.measure(id), tt(`Block 2.2: “${short(name, 36)}” is not rated on learning impact, effort and risk.`, `Block 2.2: „${short(name, 36)}“ ist nicht nach Lernwirkung, Aufwand und Risiko bewertet.`));
    if ((r1.reasons[id] ?? "").trim().length < MIN_REASON) e(IDS.reason(id), tt(`Block 2.2: say why “${short(name, 36)}” gets those ratings (at least ${MIN_REASON} characters).`, `Block 2.2: Begründen Sie, warum „${short(name, 36)}“ diese Bewertungen bekommt (mindestens ${MIN_REASON} Zeichen).`));
  }
  if (r1.chosen.length === PICK_MEASURES && r1.orderWhy.trim().length < MIN_LINE) e(IDS.orderWhy, tt(`Block 2.2: say why your first priority goes first (at least ${MIN_LINE} characters).`, `Block 2.2: Begründen Sie, warum Ihre erste Priorität zuerst kommt (mindestens ${MIN_LINE} Zeichen).`));
  if (r1.missingInfo.trim().length < MIN_LINE) e(IDS.missingInfo, tt(`Block 2.2: say what information you are missing (at least ${MIN_LINE} characters).`, `Block 2.2: Sagen Sie, welche Information Ihnen fehlt (mindestens ${MIN_LINE} Zeichen).`));
  return coreOnly(out);
}

export function r2Missing(p: Persisted): MissingEntry[] {
  const out = participantMissing(p);
  const { r2 } = p.d3;
  const e = (id: string, label: string) => out.push({ id, label });

  // Block 3.1 (Core)
  if (r2.strategy.trim().length < MIN_SENTENCE) e(IDS.strategy, tt(`Block 3.1: write your strategy to reduce cognitive load: what you reduce first and what you protect (at least ${MIN_SENTENCE} characters).`, `Block 3.1: Schreiben Sie Ihre Strategie zur Senkung der kognitiven Belastung: was Sie zuerst senken und was Sie schützen (mindestens ${MIN_SENTENCE} Zeichen).`));
  if (r2.definition.trim().length < MIN_SENTENCE) e(IDS.definition, tt(`Block 3.1: write your definition of learning-effective UX: the learner, the goal, the cost and the proof (at least ${MIN_SENTENCE} characters).`, `Block 3.1: Schreiben Sie Ihre Definition von lerneffektivem UX: die Lernende, das Ziel, die Kosten und den Beleg (mindestens ${MIN_SENTENCE} Zeichen).`));
  if (r2.picks.length !== R2_PICK) e(IDS.decisionPick, tt(`Block 3.1: choose exactly ${R2_PICK} measures (you have ${r2.picks.length}).`, `Block 3.1: Wählen Sie genau ${R2_PICK} Maßnahmen (Sie haben ${r2.picks.length}).`));
  if (r2.picks.length === R2_PICK && r2.orderWhy.trim().length < MIN_LINE)
    e(IDS.decisionOrderWhy, tt(`Block 3.1: say why “${short(DECISION_BY_ID[r2.order[0] ?? r2.picks[0]].name, 36)}” goes first (at least ${MIN_LINE} characters).`, `Block 3.1: Begründen Sie, warum „${short(DECISION_BY_ID[r2.order[0] ?? r2.picks[0]].name, 36)}“ zuerst kommt (mindestens ${MIN_LINE} Zeichen).`));

  // Block 3.2 (Core)
  if (!r2.risk) e(IDS.risk, tt("Block 3.2: choose the biggest risk of your plan.", "Block 3.2: Wählen Sie das größte Risiko Ihres Plans."));
  if (r2.riskPlan.trim().length < MIN_REASON) e(IDS.riskPlan, tt(`Block 3.2: say what you do about that risk (at least ${MIN_REASON} characters).`, `Block 3.2: Sagen Sie, was Sie gegen dieses Risiko tun (mindestens ${MIN_REASON} Zeichen).`));
  if (!r2.owner) e(IDS.owner, tt("Block 3.2: choose who decides whether a new lesson goes live.", "Block 3.2: Wählen Sie, wer entscheidet, ob eine neue Lektion live geht."));
  if (r2.lessonChecks.length < CHECK_MIN) e(IDS.lessonChecks, tt(`Block 3.2: choose at least ${CHECK_MIN} checks every new lesson must pass (you have ${r2.lessonChecks.length}).`, `Block 3.2: Wählen Sie mindestens ${CHECK_MIN} Prüfungen, die jede neue Lektion bestehen muss (Sie haben ${r2.lessonChecks.length}).`));
  if (r2.uncertain.trim().length < MIN_FRAME) e(IDS.uncertain, tt(`Block 3.2: write the decision you make without user data: what you decide, what you do not know, when you would reverse it (at least ${MIN_FRAME} characters).`, `Block 3.2: Schreiben Sie die Entscheidung ohne Nutzerdaten: was Sie entscheiden, was Sie nicht wissen, wann Sie sie zurücknähmen (mindestens ${MIN_FRAME} Zeichen).`));
  if (r2.giveUp.trim().length < MIN_LINE) e(IDS.giveUp, tt(`Block 3.2: name what you give up or postpone (at least ${MIN_LINE} characters).`, `Block 3.2: Nennen Sie, worauf Sie verzichten oder was Sie verschieben (mindestens ${MIN_LINE} Zeichen).`));
  return coreOnly(out);
}
