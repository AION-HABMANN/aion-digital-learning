import { bi, t } from "@/lib/lang";

/**
 * Day 2 · the case and the Route 1 evidence (CLAUDE.md #57). LearnPro is a stagnating learning platform (plan, Level 2 case study).
 *
 * Facts from the plan (printed as facts): learners drop out of courses early, there is no personalisation, the content is rated "boring";
 * the goal is to improve the platform; three months, a limited budget, unclear user needs; three options for prototyping and testing
 * (develop a high-fidelity prototype immediately, test low-fidelity first, develop directly without testing). The two drawn platforms and their
 * eight numbered places are a Case assumption, labelled so on screen; the plan prints no cost, weeks or budget figure, so the site prints none.
 * The plan's Musterlösung: main problem lack of feedback and individualisation; low-fidelity tests first, learning paths and interaction,
 * adaptive elements only step by step. Rationale: minimise risk before maximising technology.
 */

export const MONTHS = 3;

/* ------------------------------------------------------------------ Block 1.1 · two platforms (plan UE2) */

export type FactId = "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8";
export const FACT_IDS: FactId[] = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"];

/** The eight numbered places in the two pictures, as plain description: what is there, never whether it is good or bad. */
export const FACTS = bi([
  { id: "f1" as FactId, no: 1, where: t("Platform A", "Plattform A"), text: t("The course page shows a path of six steps and marks the current one.", "Die Kursseite zeigt einen Pfad aus sechs Schritten und markiert den aktuellen.") },
  { id: "f2" as FactId, no: 2, where: t("Platform A", "Plattform A"), text: t("A progress bar and the text “Step 2 of 6” sit at the top.", "Oben stehen eine Fortschrittsleiste und der Text „Schritt 2 von 6“.") },
  { id: "f3" as FactId, no: 3, where: t("Platform A", "Plattform A"), text: t("Each learning unit says “6 min” and has one goal.", "Jede Lerneinheit nennt „6 Min.“ und hat ein Ziel.") },
  { id: "f4" as FactId, no: 4, where: t("Platform A", "Plattform A"), text: t("After a quiz the screen says “4 of 5 correct” and names the question to review.", "Nach einem Quiz steht auf dem Bildschirm „4 von 5 richtig“, und die zu wiederholende Frage wird genannt.") },
  { id: "f5" as FactId, no: 5, where: t("Platform B", "Plattform B"), text: t("The course is one long page of about 40 minutes of reading.", "Der Kurs ist eine lange Seite mit etwa 40 Minuten Lesestoff.") },
  { id: "f6" as FactId, no: 6, where: t("Platform B", "Plattform B"), text: t("There is no menu or list of the parts of the course; the only way on is to scroll.", "Es gibt kein Menü und keine Liste der Teile des Kurses; weiter kommt man nur durch Scrollen.") },
  { id: "f7" as FactId, no: 7, where: t("Platform B", "Plattform B"), text: t("There is no sign of how far along the learner is.", "Es gibt kein Zeichen dafür, wie weit die Lernenden sind.") },
  { id: "f8" as FactId, no: 8, where: t("Platform B", "Plattform B"), text: t("After the last page the learner is returned to the course list without any message.", "Nach der letzten Seite werden die Lernenden ohne jede Meldung zur Kursliste zurückgeführt.") },
]);

export type PlatformId = "A" | "B";
export const PLATFORMS = bi([
  { id: "A" as PlatformId, label: t("Platform A (a benchmark)", "Plattform A (ein Benchmark)") },
  { id: "B" as PlatformId, label: t("Platform B (LearnPro today)", "Plattform B (LearnPro heute)") },
]);
export const MODEL_PLATFORM: PlatformId = "A";

/* ------------------------------------------------------------------ Block 1.2 · three options (plan UE3) */

export type OptId = "A" | "B" | "C";
export const OPT_IDS: OptId[] = ["A", "B", "C"];
/** The plan's three options, in its words. */
export const OPTS = bi([
  { id: "A" as OptId, name: t("Develop a high-fidelity prototype immediately", "Sofort einen High-Fidelity-Prototyp entwickeln") },
  { id: "B" as OptId, name: t("Test low-fidelity first", "Zuerst Low-Fidelity testen") },
  { id: "C" as OptId, name: t("Develop directly without testing", "Direkt entwickeln, ohne zu testen") },
]);
export const OPT_BY_ID = Object.fromEntries(OPTS.map((o) => [o.id, o])) as Record<OptId, (typeof OPTS)[number]>;
export const MODEL_OPT: OptId = "B";

/* ------------------------------------------------------------------ Block 2.1 · the case study (plan UE5-6) */

/** The three UX tests the plan asks the learner to define, as three numbered slots. */
export type TestSlot = "1" | "2" | "3";
export const TEST_SLOTS: TestSlot[] = ["1", "2", "3"];

export type Verdict = "yes" | "partly" | "no";
export const VERDICTS = bi([
  { id: "yes" as Verdict, label: t("Yes", "Ja") },
  { id: "partly" as Verdict, label: t("Partly", "Teilweise") },
  { id: "no" as Verdict, label: t("No", "Nein") },
]);
export const MODEL_ADAPTIVE: Verdict = "partly";
