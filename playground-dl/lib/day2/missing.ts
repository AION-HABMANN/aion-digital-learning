import { OPT_BY_ID, OPT_IDS, TEST_SLOTS } from "@/data/day2/case";
import { ASSESS_KEYS, DATA_KEYS, DIFFS_N, MIN_ASSESS, MIN_CELL, MIN_FRAME, MIN_LINE, MIN_REASON, MIN_ROWS, RISK_KEYS, ROAD_KEYS, TEST_KEYS, cellText, diffCount, rowGaps, rowsFull, rowsPartial, uncGaps } from "@/lib/day2/progress";
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
  prefer: "prefer-field",
  preferWhy: "preferwhy-field",
  diffs: "diffs-field",
  diffRow: (i: number) => `diffs-row-${i}`,
  pictures: "platform-pictures",
  principle: (i: number) => `principle-${i}`,
  assess: "assess-field",
  assessOpt: (id: string) => `assess-${id}`,
  optChoice: "optchoice-field",
  optWhy: "optwhy-field",
  noTest: "notest-field",
  weak: "weak-field",
  approach: "approach-field",
  tests: "tests-field",
  dataRow: (i: number) => `data-row-${i}`,
  roadRow: (i: number) => `road-row-${i}`,
  riskRow: (i: number) => `risk-row-${i}`,
  uncRow: (k: string) => `unc-row-${k}`,
  testSlot: (id: string) => `test-${id}`,
  adaptive: "adaptive-field",
  adaptiveWhy: "adaptivewhy-field",
  r2Adaptive: "r2-adaptive-field",
  r2AdaptiveWhy: "r2-adaptivewhy-field",
  prototyping: "prototyping-field",
  testing: "testing-field",
  roadmap: "roadmap-field",
  riskText: "riskplan-field",
  uncertain: "uncertain-field",
} as const;

const colName = (k: string) =>
  k === "risk" ? tt("risk", "Risiko") : k === "benefit" ? tt("benefit", "Nutzen") : k === "effort" ? tt("effort", "Aufwand") : k === "what" ? tt("what you test", "was Sie testen") : k === "how" ? tt("how you test it", "wie Sie es testen") : tt("what you measure", "was Sie messen");

export function r1Missing(p: Persisted): MissingEntry[] {
  const out = participantMissing(p);
  const { r1 } = p.d2;
  const e = (id: string, label: string) => out.push({ id, label });
  const long = (v: string, n: number) => v.trim().length >= n;

  // Block 1.1: the plan's three questions, in the plan's order (CLAUDE.md #57)
  if (!r1.prefer) e(IDS.prefer, tt("Block 1.1: choose the platform you would prefer as a learner.", "Block 1.1: Wählen Sie die Plattform, die Sie als Lernende bevorzugen würden."));
  if (!long(r1.preferWhy, MIN_LINE)) e(IDS.preferWhy, tt(`Block 1.1: say why you prefer it, from the learner's side (at least ${MIN_LINE} characters).`, `Block 1.1: Sagen Sie aus Sicht der Lernenden, warum Sie sie bevorzugen (mindestens ${MIN_LINE} Zeichen).`));
  const nDiffs = diffCount(r1);
  if (r1.diffMode === "text") {
    if (nDiffs < DIFFS_N) e(IDS.diffs, tt(`Block 1.1: write ${DIFFS_N} differences between Platform A and Platform B, one per line (you have ${nDiffs} of ${DIFFS_N}).`, `Block 1.1: Schreiben Sie ${DIFFS_N} Unterschiede zwischen Plattform A und Plattform B, einen pro Zeile (Sie haben ${nDiffs} von ${DIFFS_N}).`));
  } else {
    const what = (k: "aspect" | "a" | "b") => (k === "aspect" ? tt("what you compare", "was Sie vergleichen") : k === "a" ? tt("what Platform A has", "was Plattform A hat") : tt("what Platform B has", "was Plattform B hat"));
    r1.diffRows.forEach((row, i) => {
      const gaps = rowGaps(row);
      if (gaps.length) e(IDS.diffRow(i), tt(`Block 1.1: difference ${i + 1} needs ${gaps.map(what).join(", ")}.`, `Block 1.1: Unterschied ${i + 1} braucht noch: ${gaps.map(what).join(", ")}.`));
    });
  }
  r1.principles.forEach((x, i) => {
    if (!long(x, MIN_LINE)) e(IDS.principle(i), tt(`Block 1.1: write principle ${i + 1} as “Do X, because Y” (at least ${MIN_LINE} characters).`, `Block 1.1: Schreiben Sie Prinzip ${i + 1} als „Tun Sie X, weil Y“ (mindestens ${MIN_LINE} Zeichen).`));
  });

  // Block 1.2: the plan's UE3 task, three questions
  for (const id of OPT_IDS) {
    const name = `${tt("Option", "Option")} ${id} · ${OPT_BY_ID[id].name}`;
    if (r1.assessMode === "text") {
      if (!long(r1.assessText[id] ?? "", MIN_ASSESS)) e(IDS.assessOpt(id), tt(`Block 1.2: assess ${name}: its risk, benefit and effort (at least ${MIN_ASSESS} characters).`, `Block 1.2: Bewerten Sie ${name}: Risiko, Nutzen und Aufwand (mindestens ${MIN_ASSESS} Zeichen).`));
    } else {
      const lack = ASSESS_KEYS.filter((k) => cellText(r1.assessRows[id]?.[k]).length < MIN_CELL).map(colName);
      if (lack.length) e(IDS.assessOpt(id), tt(`Block 1.2: ${name} still needs its ${lack.join(", ")}.`, `Block 1.2: ${name} braucht noch: ${lack.join(", ")}.`));
    }
  }
  if (!r1.optChoice) e(IDS.optChoice, tt("Block 1.2: choose option A, B or C.", "Block 1.2: Wählen Sie Option A, B oder C."));
  if (!long(r1.optWhy, MIN_LINE)) e(IDS.optWhy, tt(`Block 1.2: say why that option fits the three conditions better than the other two (at least ${MIN_LINE} characters).`, `Block 1.2: Sagen Sie, warum diese Option besser zu den drei Rahmenbedingungen passt als die anderen beiden (mindestens ${MIN_LINE} Zeichen).`));
  if (!long(r1.noTest, MIN_LINE)) e(IDS.noTest, tt(`Block 1.2: name the risks without testing and the one that worries you most (at least ${MIN_LINE} characters).`, `Block 1.2: Nennen Sie die Risiken ohne Testen und das, das Sie am meisten sorgt (mindestens ${MIN_LINE} Zeichen).`));

  // Block 2.1: the plan's case study, four questions
  if (!long(r1.weakText, MIN_LINE)) e(IDS.weak, tt(`Block 2.1: analyse the weaknesses of LearnPro (at least ${MIN_LINE} characters).`, `Block 2.1: Analysieren Sie die Schwächen von LearnPro (mindestens ${MIN_LINE} Zeichen).`));
  if (!long(r1.approachText, MIN_LINE)) e(IDS.approach, tt(`Block 2.1: describe your prototype approach, low or high fidelity (at least ${MIN_LINE} characters).`, `Block 2.1: Beschreiben Sie Ihren Prototyping-Ansatz, Low oder High Fidelity (mindestens ${MIN_LINE} Zeichen).`));
  for (const id of TEST_SLOTS) {
    if (r1.testMode === "text") {
      if (!long(r1.testText[id] ?? "", MIN_ASSESS)) e(IDS.testSlot(id), tt(`Block 2.1: define UX test ${id}: what you test, how, and what you measure (at least ${MIN_ASSESS} characters).`, `Block 2.1: Definieren Sie UX-Test ${id}: was Sie testen, wie, und was Sie messen (mindestens ${MIN_ASSESS} Zeichen).`));
    } else {
      const lack = TEST_KEYS.filter((k) => (r1.testRows[id]?.[k] ?? "").trim().length < MIN_CELL).map(colName);
      if (lack.length) e(IDS.testSlot(id), tt(`Block 2.1: UX test ${id} still needs: ${lack.join(", ")}.`, `Block 2.1: UX-Test ${id} braucht noch: ${lack.join(", ")}.`));
    }
  }
  if (!r1.adaptive) e(IDS.adaptive, tt("Block 2.1: decide whether adaptive learning is worthwhile: yes, partly or no.", "Block 2.1: Entscheiden Sie, ob adaptives Lernen lohnt: ja, teilweise oder nein."));
  if (!long(r1.adaptiveWhy, MIN_LINE)) e(IDS.adaptiveWhy, tt(`Block 2.1: give your reason for the adaptive decision (at least ${MIN_LINE} characters).`, `Block 2.1: Nennen Sie Ihren Grund für die Entscheidung zu adaptivem Lernen (mindestens ${MIN_LINE} Zeichen).`));
  return out;
}

export function r2Missing(p: Persisted): MissingEntry[] {
  const out = participantMissing(p);
  const { r2 } = p.d2;
  const e = (id: string, label: string) => out.push({ id, label });
  const long = (v: string, n: number) => v.trim().length >= n;

  // Block 3.1: the plan's transfer project, six items
  if (!r2.adaptive) e(IDS.r2Adaptive, tt("Block 3.1: decide whether to invest in adaptive learning: yes, partly or no.", "Block 3.1: Entscheiden Sie, ob Sie in adaptives Lernen investieren: ja, teilweise oder nein."));
  if (!long(r2.adaptiveWhy, MIN_LINE)) e(IDS.r2AdaptiveWhy, tt(`Block 3.1: say why; if partly, what you fund now and what waits (at least ${MIN_LINE} characters).`, `Block 3.1: Sagen Sie, warum; bei „teilweise“, was Sie jetzt finanzieren und was wartet (mindestens ${MIN_LINE} Zeichen).`));
  if (!long(r2.prototyping, MIN_LINE)) e(IDS.prototyping, tt(`Block 3.1: write your prototyping strategy: how you test new features (at least ${MIN_LINE} characters).`, `Block 3.1: Schreiben Sie Ihre Prototyping-Strategie: wie Sie neue Funktionen testen (mindestens ${MIN_LINE} Zeichen).`));
  // questions 3 to 6: a text box or a guided table; only the chosen layout counts
  if (r2.dataMode === "table") {
    if (rowsFull(r2.dataRows, DATA_KEYS) < MIN_ROWS) e(IDS.testing, tt(`Block 3.1: name the data you need in at least ${MIN_ROWS} complete rows: the data, whether you have it, how you get it.`, `Block 3.1: Nennen Sie die Daten, die Sie brauchen, in mindestens ${MIN_ROWS} vollständigen Zeilen: die Daten, ob Sie sie haben, wie Sie sie bekommen.`));
    for (const i of rowsPartial(r2.dataRows, DATA_KEYS)) e(IDS.dataRow(i), tt(`Block 3.1: finish data row ${i + 1} (the data, whether you have it, how you get it) or clear it.`, `Block 3.1: Vervollständigen Sie Daten-Zeile ${i + 1} (die Daten, ob Sie sie haben, wie Sie sie bekommen) oder leeren Sie sie.`));
  } else if (!long(r2.testing, MIN_LINE)) e(IDS.testing, tt(`Block 3.1: write your UX testing strategy: which data you need (at least ${MIN_LINE} characters).`, `Block 3.1: Schreiben Sie Ihre UX-Teststrategie: welche Daten Sie brauchen (mindestens ${MIN_LINE} Zeichen).`));
  if (r2.roadMode === "table") {
    if (rowsFull(r2.roadRows, ROAD_KEYS) < MIN_ROWS) e(IDS.roadmap, tt(`Block 3.1: write your roadmap in at least ${MIN_ROWS} complete rows, first priority first: what and why.`, `Block 3.1: Schreiben Sie Ihre Roadmap in mindestens ${MIN_ROWS} vollständigen Zeilen, die erste Priorität zuerst: was und warum.`));
    for (const i of rowsPartial(r2.roadRows, ROAD_KEYS)) e(IDS.roadRow(i), tt(`Block 3.1: finish roadmap row ${i + 1} (what, and why in this place) or clear it.`, `Block 3.1: Vervollständigen Sie Roadmap-Zeile ${i + 1} (was, und warum an dieser Stelle) oder leeren Sie sie.`));
  } else if (!long(r2.roadmap, MIN_LINE)) e(IDS.roadmap, tt(`Block 3.1: write your prioritised innovation roadmap, first priority first (at least ${MIN_LINE} characters).`, `Block 3.1: Schreiben Sie Ihre priorisierte Innovations-Roadmap, die erste Priorität zuerst (mindestens ${MIN_LINE} Zeichen).`));
  if (r2.riskMode === "table") {
    if (rowsFull(r2.riskRows, RISK_KEYS) < MIN_ROWS) e(IDS.riskText, tt(`Block 3.1: name at least ${MIN_ROWS} risks in complete rows: the risk, its side (technology or users), what you do about it.`, `Block 3.1: Nennen Sie mindestens ${MIN_ROWS} Risiken in vollständigen Zeilen: das Risiko, seine Seite (Technologie oder Nutzer), was Sie dagegen tun.`));
    for (const i of rowsPartial(r2.riskRows, RISK_KEYS)) e(IDS.riskRow(i), tt(`Block 3.1: finish risk row ${i + 1} (the risk, its side, what you do) or clear it.`, `Block 3.1: Vervollständigen Sie Risiko-Zeile ${i + 1} (das Risiko, seine Seite, was Sie tun) oder leeren Sie sie.`));
  } else if (!long(r2.riskText, MIN_LINE)) e(IDS.riskText, tt(`Block 3.1: write your risk analysis: technology against user value (at least ${MIN_LINE} characters).`, `Block 3.1: Schreiben Sie Ihre Risikoanalyse: Technologie gegen Nutzerwert (mindestens ${MIN_LINE} Zeichen).`));
  if (r2.uncMode === "table") {
    const names: Record<string, string> = { decide: tt("what you decide", "was Sie entscheiden"), unknown: tt("what you do not know", "was Sie nicht wissen"), reverse: tt("when you would reverse it", "wann Sie sie zurücknähmen") };
    for (const k of uncGaps(r2)) e(IDS.uncRow(k), tt(`Block 3.1: write ${names[k]} (at least ${MIN_REASON} characters).`, `Block 3.1: Schreiben Sie, ${names[k]} (mindestens ${MIN_REASON} Zeichen).`));
  } else if (!long(r2.uncertain, MIN_FRAME)) e(IDS.uncertain, tt(`Block 3.1: write the decision you make under uncertainty: what you decide, what you do not know, when you would reverse it (at least ${MIN_FRAME} characters).`, `Block 3.1: Schreiben Sie die Entscheidung unter Unsicherheit: was Sie entscheiden, was Sie nicht wissen, wann Sie sie zurücknähmen (mindestens ${MIN_FRAME} Zeichen).`));
  return out;
}
