import { bi, t } from "@/lib/lang";
import type { Tx } from "@/lib/lang";

/**
 * Day 3 · Route 2 (Level 3). The learner is EduCore's Chief Learning Experience Officer. The plan's framework: the platform is rated "too
 * complicated", the content is professionally necessary but hard to understand, the budget is limited, and the decision is taken without user
 * data. "Limited budget" has no figure in the plan, so €150,000 over twelve months is a Case assumption. The plan's items: a strategy to reduce
 * cognitive load, three prioritised measures, a definition of learning-effective UX, a risk analysis (too simple against too complex), a decision
 * logic for future content, and one decision under uncertainty.
 */

export const R2_BUDGET = 150000;
export const R2_MONTHS = 12;
export const R2_PICK = 3;
export const CHECK_MIN = 3;

export type DecisionId = "d1" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7";
export const DECISION_IDS: DecisionId[] = ["d1", "d2", "d3", "d4", "d5", "d6", "d7"];
export type DecisionArea = "amountForm" | "order" | "evidence" | "reduces" | "feedback" | "technology" | "look";
type DecisionDef = { id: DecisionId; no: string; name: Tx; what: Tx; cost: number; weeks: number; area: DecisionArea };
const DECISIONS_DEF: DecisionDef[] = [
  { id: "d1", no: "D1", cost: 60000, weeks: 20, area: "amountForm", name: t("Rebuild the ten most-used lessons", "Die zehn meistgenutzten Lektionen neu aufbauen"), what: t("Chunking, clear structure and visuals for the ten lessons that most learners open.", "Chunking, klare Struktur und Visualisierungen für die zehn Lektionen, die die meisten Lernenden öffnen.") },
  { id: "d2", no: "D2", cost: 25000, weeks: 12, area: "order", name: t("A content standard with editorial review", "Ein Inhaltsstandard mit redaktioneller Prüfung"), what: t("Every lesson has one goal, a set size, a marked key sentence and explained terms; an editor checks new lessons.", "Jede Lektion hat ein Ziel, eine feste Größe, einen markierten Kernsatz und erklärte Begriffe; eine Redakteurin prüft neue Lektionen.") },
  { id: "d3", no: "D3", cost: 30000, weeks: 52, area: "evidence", name: t("A learner-testing routine for new content", "Eine Lerntest-Routine für neue Inhalte"), what: t("Five beginners test every new module before release.", "Fünf Einsteiger testen jedes neue Modul vor der Freigabe.") },
  { id: "d4", no: "D4", cost: 15000, weeks: 8, area: "reduces", name: t("Cut the specialist content by a third", "Den Fachinhalt um ein Drittel kürzen"), what: t("Remove material to make the courses shorter.", "Material entfernen, um die Kurse kürzer zu machen.") },
  { id: "d5", no: "D5", cost: 30000, weeks: 12, area: "feedback", name: t("Result and next step after every lesson", "Ergebnis und nächster Schritt nach jeder Lektion"), what: t("A short check and a clear next step at the end of each lesson.", "Eine kurze Prüfung und ein klarer nächster Schritt am Ende jeder Lektion.") },
  { id: "d6", no: "D6", cost: 70000, weeks: 24, area: "technology", name: t("An AI summary button", "Ein KI-Zusammenfassungs-Button"), what: t("A button that shortens any lesson on demand.", "Ein Button, der jede Lektion auf Wunsch kürzt.") },
  { id: "d7", no: "D7", cost: 45000, weeks: 20, area: "look", name: t("A new visual brand", "Eine neue visuelle Marke"), what: t("Colours, icons, fonts and layout of the platform.", "Farben, Icons, Schriften und Layout der Plattform.") },
];
export const DECISIONS = bi(DECISIONS_DEF);
export const DECISION_BY_ID = Object.fromEntries(DECISIONS.map((d) => [d.id, d])) as Record<DecisionId, (typeof DECISIONS)[number]>;
export const DECISION_AREA = bi({
  amountForm: t("Acts on: Amount and Form", "Wirkt auf: Menge und Form"),
  order: t("Acts on: Order and purpose", "Wirkt auf: Ordnung und Zweck"),
  evidence: t("Gathers evidence", "Sammelt Belege"),
  reduces: t("Reduces content", "Verringert den Inhalt"),
  feedback: t("Acts on: feedback", "Wirkt auf: Feedback"),
  technology: t("Adds technology", "Fügt Technologie hinzu"),
  look: t("The look, not the load", "Das Aussehen, nicht die Belastung"),
});
export const decisionsCost = (ids: DecisionId[]) => ids.reduce((s, id) => s + DECISION_BY_ID[id].cost, 0);
export const MODEL_DECISIONS: DecisionId[] = ["d1", "d2", "d3"];

export type RiskId = "r1" | "r2" | "r3" | "r4" | "r5";
export const RISK_IDS: RiskId[] = ["r1", "r2", "r3", "r4", "r5"];
export const RISKS = bi([
  { id: "r1" as RiskId, text: t("The content is now so light that learners finish but cannot apply it.", "Der Inhalt ist jetzt so leicht, dass Lernende abschließen, aber es nicht anwenden können.") },
  { id: "r2" as RiskId, text: t("The content is still too complex, and learners still leave.", "Der Inhalt ist immer noch zu komplex, und Lernende gehen weiterhin.") },
  { id: "r3" as RiskId, text: t("We measure completion but not what learners can do.", "Wir messen Completion, aber nicht, was Lernende können.") },
  { id: "r4" as RiskId, text: t("The budget is used up before a first result is visible.", "Das Budget ist aufgebraucht, bevor ein erstes Ergebnis sichtbar wird.") },
  { id: "r5" as RiskId, text: t("Authors ignore the new content standard.", "Autoren ignorieren den neuen Inhaltsstandard.") },
]);
export const MODEL_RISK_PICK: RiskId = "r3";

export type OwnerId = "o1" | "o2" | "o3" | "o4";
export const OWNER_IDS: OwnerId[] = ["o1", "o2", "o3", "o4"];
export const OWNERS = bi([
  { id: "o1" as OwnerId, text: t("The Chief Learning Experience Officer alone", "Die Chief Learning Experience Officer allein") },
  { id: "o2" as OwnerId, text: t("The head of learning with the content lead", "Die Leiterin Lernen gemeinsam mit dem Content Lead") },
  { id: "o3" as OwnerId, text: t("The author of the lesson", "Der Autor der Lektion") },
  { id: "o4" as OwnerId, text: t("A steering group with management", "Ein Lenkungskreis mit dem Management") },
]);
export const MODEL_OWNER: OwnerId = "o2";

export type CheckId = "k1" | "k2" | "k3" | "k4" | "k5" | "k6" | "k7";
export const CHECK_IDS: CheckId[] = ["k1", "k2", "k3", "k4", "k5", "k6", "k7"];
export const CHECKS = bi([
  { id: "k1" as CheckId, text: t("One stated learning goal", "Ein genanntes Lernziel") },
  { id: "k2" as CheckId, text: t("A size that fits the learner's time", "Eine Größe, die zur Zeit der Lernenden passt") },
  { id: "k3" as CheckId, text: t("The key sentence is marked", "Der Kernsatz ist markiert") },
  { id: "k4" as CheckId, text: t("Technical terms are explained in place", "Fachbegriffe sind an Ort und Stelle erklärt") },
  { id: "k5" as CheckId, text: t("A short check or task at the end", "Eine kurze Prüfung oder Aufgabe am Ende") },
  { id: "k6" as CheckId, text: t("A test with beginners before release", "Ein Test mit Einsteigern vor der Freigabe") },
  { id: "k7" as CheckId, text: t("Approval by the most senior person in the room", "Freigabe durch die ranghöchste Person im Raum") },
]);
export const MODEL_CHECKS: CheckId[] = ["k1", "k2", "k3", "k4", "k5"];
