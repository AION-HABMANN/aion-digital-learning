import { bi, t } from "@/lib/lang";

/**
 * Day 3 · the case and the Route 1 evidence (CLAUDE.md #57). EduCore is a learning platform with an overwhelm effect (plan, Level 2 case study).
 *
 * Facts from the plan (printed as facts): users do not understand the content, the drop-out rate is high, the content is called "too
 * complicated"; too much information at once, no visual structure, no recognisable learning logic; a long continuous text of 500 words with
 * no paragraphs and no structure, unexplained technical terms and no visualisation; three options for a learning module (shorten the content,
 * visualise it, split it into small modules); four weeks, complex content, beginners. The four drawn screens and their eight numbered places
 * are a Case assumption, labelled so on screen; the plan prints no cost, budget or weeks for the options, so the site prints none.
 * The plan's Musterlösung: main problem extraneous cognitive load; measures chunking, visualisation, clear structure, reduction of irrelevant
 * content. Rationale: learning capacity before the amount of information.
 */

export const WEEKS_LIMIT = 4;

/* ------------------------------------------------------------------ the numbered places in the EduCore pictures (Blocks 1.1 and 2.1) */

export type FactId = "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8";
export const FACT_IDS: FactId[] = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"];

/** The eight numbered places in the four pictures, as plain description: what is there, never whether it is good or bad. */
export const FACTS = bi([
  { id: "f1" as FactId, no: 1, where: t("Lesson 7", "Lektion 7"), text: t("Lesson 7 is one continuous text of about 500 words.", "Lektion 7 ist ein einziger durchgehender Text von etwa 500 Wörtern.") },
  { id: "f2" as FactId, no: 2, where: t("Lesson page with extras", "Lektionsseite mit Extras"), text: t("Next to the text, the page shows a news banner, a chat window, a recommendation box and a menu with nine entries, all at the same time.", "Neben dem Text zeigt die Seite ein News-Banner, ein Chat-Fenster, einen Empfehlungskasten und ein Menü mit neun Einträgen, alles zugleich.") },
  { id: "f3" as FactId, no: 3, where: t("Quiz", "Quiz"), text: t("The quiz shows all 12 questions on one page.", "Das Quiz zeigt alle 12 Fragen auf einer Seite.") },
  { id: "f4" as FactId, no: 4, where: t("Lesson 7", "Lektion 7"), text: t("The text has no paragraphs, headings or lists.", "Der Text hat keine Absätze, Überschriften oder Listen.") },
  { id: "f5" as FactId, no: 5, where: t("Lesson 7", "Lektion 7"), text: t("The lesson has no diagram or picture, and terms such as “pseudonymisation” and “legitimate interest” are not explained.", "Die Lektion hat kein Diagramm und kein Bild, und Begriffe wie „Pseudonymisierung“ und „berechtigtes Interesse“ werden nicht erklärt.") },
  { id: "f6" as FactId, no: 6, where: t("Lesson 7", "Lektion 7"), text: t("The key sentence of the lesson has the same size, weight and colour as every other sentence.", "Der Kernsatz der Lektion hat dieselbe Größe, dasselbe Gewicht und dieselbe Farbe wie jeder andere Satz.") },
  { id: "f7" as FactId, no: 7, where: t("Module overview", "Modulübersicht"), text: t("The module overview lists 28 lessons in one flat list, with no groups and no order labels.", "Die Modulübersicht listet 28 Lektionen in einer flachen Liste, ohne Gruppen und ohne Reihenfolgenangaben.") },
  { id: "f8" as FactId, no: 8, where: t("Module overview", "Modulübersicht"), text: t("No lesson states its learning goal, and no lesson says how it connects to the one before.", "Keine Lektion nennt ihr Lernziel, und keine Lektion sagt, wie sie mit der vorherigen zusammenhängt.") },
]);

/* ------------------------------------------------------------------ Block 1.2 · three options for a learning module (plan UE3) */

export type OptId = "A" | "B" | "C";
export const OPT_IDS: OptId[] = ["A", "B", "C"];
/** The plan's three options, in its words. */
export const OPTS = bi([
  { id: "A" as OptId, name: t("Shorten the content significantly", "Den Inhalt deutlich kürzen") },
  { id: "B" as OptId, name: t("Visualise the content (diagrams, graphics)", "Den Inhalt visualisieren (Diagramme, Grafiken)") },
  { id: "C" as OptId, name: t("Split the content into small modules", "Den Inhalt in kleine Module aufteilen") },
]);
export const OPT_BY_ID = Object.fromEntries(OPTS.map((o) => [o.id, o])) as Record<OptId, (typeof OPTS)[number]>;
/** The reference decision: the measure with the greatest effect on learning. The plan's Musterlösung names chunking (splitting up) first. */
export const MODEL_OPT: OptId = "C";
