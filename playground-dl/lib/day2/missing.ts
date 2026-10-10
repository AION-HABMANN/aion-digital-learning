import { FACT_BY_ID, FACT_IDS, PICK_TESTS, TEST_BY_ID } from "@/data/day2/case";
import { DATA_MIN, EVIDENCE_MIN, INV_BY_ID, R2_PICK } from "@/data/day2/route2";
import { MIN_FRAME, MIN_LINE, MIN_REASON, OPTIONAL_BLOCKS } from "@/lib/day2/progress";
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
  approachPick: "approach-pick",
  approachWhy: "approachwhy-field",
  testPick: "test-pick",
  testQ: (id: string) => `testq-${id}`,
  adaptive: "adaptive-field",
  adaptiveWhy: "adaptivewhy-field",
  missingInfo: "missinginfo-field",
  r2Adaptive: "r2-adaptive-field",
  r2AdaptiveWhy: "r2-adaptivewhy-field",
  prototyping: "prototyping-field",
  dataPick: "data-pick",
  invPick: "inv-pick",
  invOrder: "inv-order-field",
  invOrderWhy: "inv-orderwhy-field",
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
  const { r1 } = p.d2;
  const e = (id: string, label: string) => out.push({ id, label });

  // Block 1.1 (Core)
  for (const id of FACT_IDS)
    if (r1.sort[id] === null) e(IDS.fact(id), tt(`Block 1.1: fact ${FACT_BY_ID[id].no} is not sorted into Learning path, Short units or Feedback.`, `Block 1.1: Fakt ${FACT_BY_ID[id].no} ist nicht in Lernpfad, Kurze Einheiten oder Feedback einsortiert.`));
  if (!r1.prefer) e(IDS.prefer, tt("Block 1.1: choose the platform you would prefer as a learner.", "Block 1.1: Wählen Sie die Plattform, die Sie als Lernende bevorzugen würden."));
  if (r1.preferWhy.trim().length < MIN_LINE) e(IDS.preferWhy, tt(`Block 1.1: say why you prefer it, from the learner's side (at least ${MIN_LINE} characters).`, `Block 1.1: Sagen Sie aus Sicht der Lernenden, warum Sie sie bevorzugen (mindestens ${MIN_LINE} Zeichen).`));
  r1.principles.forEach((x, i) => {
    if (x.trim().length < MIN_LINE) e(IDS.principle(i), tt(`Block 1.1: write principle ${i + 1} as “Do X, because Y” (at least ${MIN_LINE} characters).`, `Block 1.1: Schreiben Sie Prinzip ${i + 1} als „Tun Sie X, weil Y“ (mindestens ${MIN_LINE} Zeichen).`));
  });

  // Block 2.2 (Core)
  if (!r1.approach) e(IDS.approachPick, tt("Block 2.2: choose one prototype approach.", "Block 2.2: Wählen Sie einen Prototyping-Ansatz."));
  if (r1.approach && r1.approachWhy.trim().length < MIN_LINE) e(IDS.approachWhy, tt(`Block 2.2: say why this approach: what question it answers first and what it leaves for later (at least ${MIN_LINE} characters).`, `Block 2.2: Sagen Sie, warum dieser Ansatz: welche Frage er zuerst beantwortet und was er für später lässt (mindestens ${MIN_LINE} Zeichen).`));
  if (r1.tests.length !== PICK_TESTS) e(IDS.testPick, tt(`Block 2.2: choose exactly ${PICK_TESTS} UX tests (you have ${r1.tests.length}).`, `Block 2.2: Wählen Sie genau ${PICK_TESTS} UX-Tests (Sie haben ${r1.tests.length}).`));
  for (const id of r1.tests)
    if ((r1.testQ[id] ?? "").trim().length < MIN_REASON) e(IDS.testQ(id), tt(`Block 2.2: say which question ${TEST_BY_ID[id].no} answers for LearnPro (at least ${MIN_REASON} characters).`, `Block 2.2: Sagen Sie, welche Frage ${TEST_BY_ID[id].no} für LearnPro beantwortet (mindestens ${MIN_REASON} Zeichen).`));
  if (!r1.adaptive) e(IDS.adaptive, tt("Block 2.2: decide whether adaptive learning is worthwhile: yes, partly or no.", "Block 2.2: Entscheiden Sie, ob adaptives Lernen lohnt: ja, teilweise oder nein."));
  if (r1.adaptive && r1.adaptiveWhy.trim().length < MIN_LINE) e(IDS.adaptiveWhy, tt(`Block 2.2: give your reason for the adaptive decision and the first step (at least ${MIN_LINE} characters).`, `Block 2.2: Nennen Sie Ihren Grund für die Entscheidung zu adaptivem Lernen und den ersten Schritt (mindestens ${MIN_LINE} Zeichen).`));
  if (r1.missingInfo.trim().length < MIN_LINE) e(IDS.missingInfo, tt(`Block 2.2: say what information you are missing (at least ${MIN_LINE} characters).`, `Block 2.2: Sagen Sie, welche Information Ihnen fehlt (mindestens ${MIN_LINE} Zeichen).`));
  return coreOnly(out);
}

export function r2Missing(p: Persisted): MissingEntry[] {
  const out = participantMissing(p);
  const { r2 } = p.d2;
  const e = (id: string, label: string) => out.push({ id, label });

  // Block 3.1 (Core)
  if (!r2.adaptive) e(IDS.r2Adaptive, tt("Block 3.1: decide whether to invest in adaptive learning: yes, partly or no.", "Block 3.1: Entscheiden Sie, ob Sie in adaptives Lernen investieren: ja, teilweise oder nein."));
  if (r2.adaptive && r2.adaptiveWhy.trim().length < MIN_LINE) e(IDS.r2AdaptiveWhy, tt(`Block 3.1: say why; if partly, what you fund now and what waits (at least ${MIN_LINE} characters).`, `Block 3.1: Sagen Sie, warum; bei „teilweise“, was Sie jetzt finanzieren und was wartet (mindestens ${MIN_LINE} Zeichen).`));
  if (r2.prototyping.trim().length < MIN_LINE) e(IDS.prototyping, tt(`Block 3.1: write your prototyping strategy: the fidelity you start with and the first question (at least ${MIN_LINE} characters).`, `Block 3.1: Schreiben Sie Ihre Prototyping-Strategie: die Fidelity, mit der Sie beginnen, und die erste Frage (mindestens ${MIN_LINE} Zeichen).`));
  if (r2.data.length < DATA_MIN) e(IDS.dataPick, tt(`Block 3.1: choose at least ${DATA_MIN} kinds of data your testing strategy needs (you have ${r2.data.length}).`, `Block 3.1: Wählen Sie mindestens ${DATA_MIN} Arten von Daten, die Ihre Teststrategie braucht (Sie haben ${r2.data.length}).`));
  if (r2.picks.length !== R2_PICK) e(IDS.invPick, tt(`Block 3.1: choose exactly ${R2_PICK} investments (you have ${r2.picks.length}).`, `Block 3.1: Wählen Sie genau ${R2_PICK} Investitionen (Sie haben ${r2.picks.length}).`));
  if (r2.picks.length === R2_PICK && r2.orderWhy.trim().length < MIN_LINE)
    e(IDS.invOrderWhy, tt(`Block 3.1: say why “${short(INV_BY_ID[r2.order[0] ?? r2.picks[0]].name, 36)}” goes first (at least ${MIN_LINE} characters).`, `Block 3.1: Begründen Sie, warum „${short(INV_BY_ID[r2.order[0] ?? r2.picks[0]].name, 36)}“ zuerst kommt (mindestens ${MIN_LINE} Zeichen).`));

  // Block 3.2 (Core)
  if (!r2.risk) e(IDS.risk, tt("Block 3.2: choose the biggest risk of your plan.", "Block 3.2: Wählen Sie das größte Risiko Ihres Plans."));
  if (r2.riskPlan.trim().length < MIN_REASON) e(IDS.riskPlan, tt(`Block 3.2: say what you do about that risk (at least ${MIN_REASON} characters).`, `Block 3.2: Sagen Sie, was Sie gegen dieses Risiko tun (mindestens ${MIN_REASON} Zeichen).`));
  if (r2.uncertain.trim().length < MIN_FRAME) e(IDS.uncertain, tt(`Block 3.2: write the decision you make under uncertainty: what you decide, what you do not know, when you would reverse it (at least ${MIN_FRAME} characters).`, `Block 3.2: Schreiben Sie die Entscheidung unter Unsicherheit: was Sie entscheiden, was Sie nicht wissen, wann Sie sie zurücknähmen (mindestens ${MIN_FRAME} Zeichen).`));
  if (!r2.owner) e(IDS.owner, tt("Block 3.2: choose who decides on innovations in future.", "Block 3.2: Wählen Sie, wer künftig über Innovationen entscheidet."));
  if (r2.evidence.length < EVIDENCE_MIN) e(IDS.evidence, tt(`Block 3.2: choose at least ${EVIDENCE_MIN} kinds of evidence a decision needs.`, `Block 3.2: Wählen Sie mindestens ${EVIDENCE_MIN} Arten von Belegen, die eine Entscheidung braucht.`));
  if (r2.giveUp.trim().length < MIN_LINE) e(IDS.giveUp, tt(`Block 3.2: name what you give up or postpone (at least ${MIN_LINE} characters).`, `Block 3.2: Nennen Sie, worauf Sie verzichten oder was Sie verschieben (mindestens ${MIN_LINE} Zeichen).`));
  return coreOnly(out);
}
