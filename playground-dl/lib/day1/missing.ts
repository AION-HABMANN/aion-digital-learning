import { FINDING_BY_ID, FINDING_IDS, MEASURE_BY_ID, PICK_MEASURES } from "@/data/day1/case";
import { DECISION_BY_ID, EVIDENCE_MIN, R2_PICK } from "@/data/day1/route2";
import { OPTIONAL_BLOCKS, MIN_LINE, MIN_REASON, MIN_SENTENCE } from "@/lib/day1/progress";
import { participantMissing, short } from "@/lib/missing";
import type { MissingEntry } from "@/lib/missing";
import { tt } from "@/lib/lang";
import type { Persisted } from "@/store/useStore";

/** DOM ids the missing list points at. One place, so the list and the UI cannot drift. */
export const IDS = {
  finding: (id: string) => `finding-${id}`,
  worst: "worst-field",
  worstWhy: "worstwhy-field",
  claim: (id: string) => `claim-${id}`,
  need: "need-field",
  causePick: "cause-pick",
  causeWhy: "causewhy-field",
  measurePick: "measure-pick",
  measure: (id: string) => `measure-${id}`,
  reason: (id: string) => `reason-${id}`,
  order: "order-field",
  orderWhy: "orderwhy-field",
  missingInfo: "missinginfo-field",
  vision: "vision-field",
  decisionPick: "decision-pick",
  decisionOrder: "decisionorder-field",
  decisionOrderWhy: "decisionorderwhy-field",
  risk: "risk-field",
  riskPlan: "riskplan-field",
  uncertain: "uncertain-field",
  owner: "owner-field",
  evidence: "evidence-field",
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
  const { r1 } = p.d1;
  const e = (id: string, label: string) => out.push({ id, label });

  // Block 1.1 (Core)
  for (const id of FINDING_IDS)
    if (r1.sort[id] === null) e(IDS.finding(id), tt(`Block 1.1: “${short(FINDING_BY_ID[id].short)}” is not sorted into Orientation, Understanding or Motivation.`, `Block 1.1: „${short(FINDING_BY_ID[id].short)}“ ist nicht in Orientierung, Verständnis oder Motivation einsortiert.`));
  if (!r1.worst) e(IDS.worst, tt("Block 1.1: choose the finding that would make you give up first.", "Block 1.1: Wählen Sie den Befund, der Sie zuerst aufgeben ließe."));
  if (r1.worstWhy.trim().length < MIN_LINE) e(IDS.worstWhy, tt(`Block 1.1: say, from the learner's side, why that one (at least ${MIN_LINE} characters).`, `Block 1.1: Sagen Sie aus Sicht der Lernenden, warum gerade dieser (mindestens ${MIN_LINE} Zeichen).`));

  // Block 2.2 (Core)
  if (r1.chosen.length !== PICK_MEASURES) e(IDS.measurePick, tt(`Block 2.2: choose exactly ${PICK_MEASURES} measures (you have ${r1.chosen.length}).`, `Block 2.2: Wählen Sie genau ${PICK_MEASURES} Maßnahmen (Sie haben ${r1.chosen.length}).`));
  for (const id of r1.chosen) {
    const name = MEASURE_BY_ID[id].name;
    if (!r1.impact[id] || !r1.effort[id] || !r1.risk[id]) e(IDS.measure(id), tt(`Block 2.2: “${short(name, 36)}” is not rated on user impact, effort and risk.`, `Block 2.2: „${short(name, 36)}“ ist nicht nach Nutzerwirkung, Aufwand und Risiko bewertet.`));
    if ((r1.reasons[id] ?? "").trim().length < MIN_REASON) e(IDS.reason(id), tt(`Block 2.2: say why “${short(name, 36)}” gets those ratings (at least ${MIN_REASON} characters).`, `Block 2.2: Begründen Sie, warum „${short(name, 36)}“ diese Bewertungen bekommt (mindestens ${MIN_REASON} Zeichen).`));
  }
  if (r1.chosen.length === PICK_MEASURES && r1.orderWhy.trim().length < MIN_LINE) e(IDS.orderWhy, tt(`Block 2.2: say why your first priority goes first (at least ${MIN_LINE} characters).`, `Block 2.2: Begründen Sie, warum Ihre erste Priorität zuerst kommt (mindestens ${MIN_LINE} Zeichen).`));
  if (r1.missingInfo.trim().length < MIN_LINE) e(IDS.missingInfo, tt(`Block 2.2: say what information you are missing (at least ${MIN_LINE} characters).`, `Block 2.2: Sagen Sie, welche Information Ihnen fehlt (mindestens ${MIN_LINE} Zeichen).`));
  return coreOnly(out);
}

export function r2Missing(p: Persisted): MissingEntry[] {
  const out = participantMissing(p);
  const { r2 } = p.d1;
  const e = (id: string, label: string) => out.push({ id, label });

  // Block 3.1 (Core)
  if (r2.vision.trim().length < MIN_SENTENCE) e(IDS.vision, tt(`Block 3.1: write your UX vision in one or two sentences (at least ${MIN_SENTENCE} characters).`, `Block 3.1: Schreiben Sie Ihre UX-Vision in ein oder zwei Sätzen (mindestens ${MIN_SENTENCE} Zeichen).`));
  if (r2.picks.length !== R2_PICK) e(IDS.decisionPick, tt(`Block 3.1: choose exactly ${R2_PICK} strategic decisions (you have ${r2.picks.length}).`, `Block 3.1: Wählen Sie genau ${R2_PICK} strategische Entscheidungen (Sie haben ${r2.picks.length}).`));
  if (r2.picks.length === R2_PICK && r2.orderWhy.trim().length < MIN_LINE)
    e(IDS.decisionOrderWhy, tt(`Block 3.1: say why “${short(DECISION_BY_ID[r2.order[0] ?? r2.picks[0]].name, 36)}” goes first (at least ${MIN_LINE} characters).`, `Block 3.1: Begründen Sie, warum „${short(DECISION_BY_ID[r2.order[0] ?? r2.picks[0]].name, 36)}“ zuerst kommt (mindestens ${MIN_LINE} Zeichen).`));

  // Block 3.2 (Core)
  if (!r2.risk) e(IDS.risk, tt("Block 3.2: choose the biggest risk of your plan.", "Block 3.2: Wählen Sie das größte Risiko Ihres Plans."));
  if (r2.riskPlan.trim().length < MIN_REASON) e(IDS.riskPlan, tt(`Block 3.2: say what you do about that risk (at least ${MIN_REASON} characters).`, `Block 3.2: Sagen Sie, was Sie gegen dieses Risiko tun (mindestens ${MIN_REASON} Zeichen).`));
  if (r2.uncertain.trim().length < 60) e(IDS.uncertain, tt("Block 3.2: write the decision you make without complete data: what you decide, what you do not know, when you would reverse it (at least 60 characters).", "Block 3.2: Schreiben Sie die Entscheidung ohne vollständige Daten: was Sie entscheiden, was Sie nicht wissen, wann Sie sie zurücknähmen (mindestens 60 Zeichen)."));
  if (!r2.owner) e(IDS.owner, tt("Block 3.2: choose who decides on UX in future.", "Block 3.2: Wählen Sie, wer künftig über UX entscheidet."));
  if (r2.evidence.length < EVIDENCE_MIN) e(IDS.evidence, tt(`Block 3.2: choose at least ${EVIDENCE_MIN} kinds of evidence a UX decision needs.`, `Block 3.2: Wählen Sie mindestens ${EVIDENCE_MIN} Arten von Belegen, die eine UX-Entscheidung braucht.`));
  if (r2.giveUp.trim().length < MIN_LINE) e(IDS.giveUp, tt(`Block 3.2: name what you give up or postpone (at least ${MIN_LINE} characters).`, `Block 3.2: Nennen Sie, worauf Sie verzichten oder was Sie verschieben (mindestens ${MIN_LINE} Zeichen).`));
  return coreOnly(out);
}
