import { OPT_BY_ID, OPT_IDS } from "@/data/day3/case";
import { ASSESS_KEYS, CAUSES_N, IMPROVEMENTS_N, MEASURES_N, MIN_ASSESS, MIN_CELL, MIN_FRAME, MIN_LINE, PROBLEMS_N, causeCount, causeGaps, improvementCount, listLines, problemCount, problemGaps } from "@/lib/day3/progress";
import { participantMissing } from "@/lib/missing";
import type { MissingEntry } from "@/lib/missing";
import { tt } from "@/lib/lang";
import type { Persisted } from "@/store/useStore";

/**
 * DOM ids the missing list points at. One place, so the list and the UI cannot drift. Every label starts "Block X.Y:", in both languages
 * (the per-block notice of CLAUDE.md #34 filters on that prefix). All blocks are Core (#57): a missing entry is a field that is empty, too
 * short, or a list that has fewer items than the plan asks for. A choice that differs from the model is never missing (#38).
 */
export const IDS = {
  pictures: "educore-pictures",
  problems: "problems-field",
  problemRow: (i: number) => `problems-row-${i}`,
  feel: "feel-field",
  improve: "improve-field",
  assess: "assess-field",
  assessOpt: (id: string) => `assess-${id}`,
  optOrder: "optorder-field",
  optChoice: "optchoice-field",
  optWhy: "optwhy-field",
  causes: "causes-field",
  improvements: "improvements-field",
  causeRow: (i: number) => `cause-row-${i}`,
  priority: "priority-field",
  justify: "justify-field",
  strategy: "strategy-field",
  measures: "measures-field",
  definition: "definition-field",
  riskText: "risktext-field",
  logic: "logic-field",
  uncertain: "uncertain-field",
} as const;

const colName = (k: string) =>
  k === "impact" ? tt("learning impact", "Lernwirkung") : k === "effort" ? tt("effort", "Aufwand") : k === "risk" ? tt("risk", "Risiko") : k === "problem" ? tt("the problem", "das Problem") : k === "side" ? tt("how it is for the learner", "wie es für die Lernende ist") : k === "cause" ? tt("the cause", "die Ursache") : tt("the improvement", "die Verbesserung");

export function r1Missing(p: Persisted): MissingEntry[] {
  const out = participantMissing(p);
  const { r1 } = p.d3;
  const e = (id: string, label: string) => out.push({ id, label });
  const long = (v: string, n: number) => v.trim().length >= n;

  // Block 1.1: the plan's UE2 task, three questions in the plan's order (CLAUDE.md #57)
  const nProblems = problemCount(r1);
  if (r1.problemMode === "text") {
    if (nProblems < PROBLEMS_N) e(IDS.problems, tt(`Block 1.1: describe ${PROBLEMS_N} problems from the learner's side, one per line (you have ${nProblems} of ${PROBLEMS_N}).`, `Block 1.1: Beschreiben Sie ${PROBLEMS_N} Probleme aus Sicht der Lernenden, eines pro Zeile (Sie haben ${nProblems} von ${PROBLEMS_N}).`));
  } else {
    r1.problemRows.forEach((row, i) => {
      const gaps = problemGaps(row);
      if (gaps.length) e(IDS.problemRow(i), tt(`Block 1.1: problem ${i + 1} still needs ${gaps.map(colName).join(", ")}.`, `Block 1.1: Problem ${i + 1} braucht noch: ${gaps.map(colName).join(", ")}.`));
    });
  }
  if (!long(r1.feel, MIN_LINE)) e(IDS.feel, tt(`Block 1.1: say how the learning process feels (at least ${MIN_LINE} characters).`, `Block 1.1: Sagen Sie, wie sich der Lernprozess anfühlt (mindestens ${MIN_LINE} Zeichen).`));
  if (!long(r1.improve, MIN_LINE)) e(IDS.improve, tt(`Block 1.1: say what you would improve intuitively (at least ${MIN_LINE} characters).`, `Block 1.1: Sagen Sie, was Sie intuitiv verbessern würden (mindestens ${MIN_LINE} Zeichen).`));

  // Block 1.2: the plan's UE3 task, three questions
  for (const id of OPT_IDS) {
    const name = `${tt("Option", "Option")} ${id} · ${OPT_BY_ID[id].name}`;
    if (r1.assessMode === "text") {
      if (!long(r1.assessText[id] ?? "", MIN_ASSESS)) e(IDS.assessOpt(id), tt(`Block 1.2: assess ${name}: its learning impact, effort and risk (at least ${MIN_ASSESS} characters).`, `Block 1.2: Bewerten Sie ${name}: Lernwirkung, Aufwand und Risiko (mindestens ${MIN_ASSESS} Zeichen).`));
    } else {
      const lack = ASSESS_KEYS.filter((k) => (r1.assessRows[id]?.[k] ?? "").trim().length < MIN_CELL).map(colName);
      if (lack.length) e(IDS.assessOpt(id), tt(`Block 1.2: ${name} still needs its ${lack.join(", ")}.`, `Block 1.2: ${name} braucht noch: ${lack.join(", ")}.`));
    }
  }
  if (!long(r1.optOrder, MIN_ASSESS)) e(IDS.optOrder, tt(`Block 1.2: put the three options in a priority order, first priority first (at least ${MIN_ASSESS} characters).`, `Block 1.2: Bringen Sie die drei Optionen in eine Prioritätsreihenfolge, die erste Priorität zuerst (mindestens ${MIN_ASSESS} Zeichen).`));
  if (!r1.optChoice) e(IDS.optChoice, tt("Block 1.2: choose the option A, B or C that has the greatest effect.", "Block 1.2: Wählen Sie die Option A, B oder C mit der größten Wirkung."));
  if (!long(r1.optWhy, MIN_LINE)) e(IDS.optWhy, tt(`Block 1.2: say why that option has the greatest effect on learning (at least ${MIN_LINE} characters).`, `Block 1.2: Sagen Sie, warum diese Option die größte Wirkung aufs Lernen hat (mindestens ${MIN_LINE} Zeichen).`));

  // Block 2.1: the plan's case study, four questions
  const nCauses = causeCount(r1);
  const nImps = improvementCount(r1);
  if (r1.causeMode === "text") {
    if (nCauses < CAUSES_N) e(IDS.causes, tt(`Block 2.1: identify ${CAUSES_N} causes of cognitive overload, one per line (you have ${nCauses} of ${CAUSES_N}).`, `Block 2.1: Erkennen Sie ${CAUSES_N} Ursachen kognitiver Überlastung, eine pro Zeile (Sie haben ${nCauses} von ${CAUSES_N}).`));
    if (nImps < IMPROVEMENTS_N) e(IDS.improvements, tt(`Block 2.1: develop ${IMPROVEMENTS_N} UX improvements, one per line (you have ${nImps} of ${IMPROVEMENTS_N}).`, `Block 2.1: Entwickeln Sie ${IMPROVEMENTS_N} UX-Verbesserungen, eine pro Zeile (Sie haben ${nImps} von ${IMPROVEMENTS_N}).`));
  } else {
    r1.causeRows.forEach((row, i) => {
      const gaps = causeGaps(row);
      if (gaps.length) e(IDS.causeRow(i), tt(`Block 2.1: row ${i + 1} still needs ${gaps.map(colName).join(", ")}.`, `Block 2.1: Zeile ${i + 1} braucht noch: ${gaps.map(colName).join(", ")}.`));
    });
  }
  if (!long(r1.priority, MIN_LINE)) e(IDS.priority, tt(`Block 2.1: prioritise your improvements, the first priority first (at least ${MIN_LINE} characters).`, `Block 2.1: Priorisieren Sie Ihre Verbesserungen, die erste Priorität zuerst (mindestens ${MIN_LINE} Zeichen).`));
  if (!long(r1.justify, MIN_LINE)) e(IDS.justify, tt(`Block 2.1: justify your decision (at least ${MIN_LINE} characters).`, `Block 2.1: Begründen Sie Ihre Entscheidung (mindestens ${MIN_LINE} Zeichen).`));
  return out;
}

export function r2Missing(p: Persisted): MissingEntry[] {
  const out = participantMissing(p);
  const { r2 } = p.d3;
  const e = (id: string, label: string) => out.push({ id, label });
  const long = (v: string, n: number) => v.trim().length >= n;

  // Block 3.1: the plan's transfer project, five items and the decision under uncertainty
  if (!long(r2.strategy, MIN_LINE)) e(IDS.strategy, tt(`Block 3.1: write your strategy for reducing cognitive load (at least ${MIN_LINE} characters).`, `Block 3.1: Schreiben Sie Ihre Strategie zur Senkung der kognitiven Belastung (mindestens ${MIN_LINE} Zeichen).`));
  const nMeasures = listLines(r2.measures).length;
  if (nMeasures < MEASURES_N) e(IDS.measures, tt(`Block 3.1: write ${MEASURES_N} prioritised UX measures, the first priority first, one per line (you have ${nMeasures} of ${MEASURES_N}).`, `Block 3.1: Schreiben Sie ${MEASURES_N} priorisierte UX-Maßnahmen, die erste Priorität zuerst, eine pro Zeile (Sie haben ${nMeasures} von ${MEASURES_N}).`));
  if (!long(r2.definition, MIN_LINE)) e(IDS.definition, tt(`Block 3.1: define “learning-effective UX” (at least ${MIN_LINE} characters).`, `Block 3.1: Definieren Sie „lerneffektives UX“ (mindestens ${MIN_LINE} Zeichen).`));
  if (!long(r2.riskText, MIN_LINE)) e(IDS.riskText, tt(`Block 3.1: write your risk analysis: content that is too simple against content that is too complex (at least ${MIN_LINE} characters).`, `Block 3.1: Schreiben Sie Ihre Risikoanalyse: zu einfacher Inhalt gegen zu komplexen Inhalt (mindestens ${MIN_LINE} Zeichen).`));
  if (!long(r2.logic, MIN_LINE)) e(IDS.logic, tt(`Block 3.1: write your decision logic for future content (at least ${MIN_LINE} characters).`, `Block 3.1: Schreiben Sie Ihre Entscheidungslogik für künftige Inhalte (mindestens ${MIN_LINE} Zeichen).`));
  if (!long(r2.uncertain, MIN_FRAME)) e(IDS.uncertain, tt(`Block 3.1: write the decision you make under uncertainty: what you decide, what you do not know, when you would reverse it (at least ${MIN_FRAME} characters).`, `Block 3.1: Schreiben Sie die Entscheidung unter Unsicherheit: was Sie entscheiden, was Sie nicht wissen, wann Sie sie zurücknähmen (mindestens ${MIN_FRAME} Zeichen).`));
  return out;
}
