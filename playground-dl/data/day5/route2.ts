import { bi, t } from "@/lib/lang";
import type { Tx } from "@/lib/lang";

/**
 * Day 5 · Route 2 (Level 3). The learner is LearnBase's Chief UX Strategist. The plan's framework: the platform is growing but user satisfaction is declining,
 * many features but low usage, internal stakeholders pursue different goals. "Limited resources" has no figure in the plan, so €200,000 over twelve months is a
 * Case assumption. The plan's items: the central user needs, three strategic UX decisions, a prioritised measures roadmap, a conflict analysis (user against
 * business), a decision architecture for user-centred development, and one decision under uncertainty.
 */

export const R2_BUDGET = 200000;
export const R2_MONTHS = 12;
export const R2_PICK = 3;
export const EVIDENCE_MIN = 2;

export type DecisionId = "d1" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7";
export const DECISION_IDS: DecisionId[] = ["d1", "d2", "d3", "d4", "d5", "d6", "d7"];
export type DecisionArea = "orientation" | "complexity" | "evidence" | "architecture" | "features" | "growth";
type DecisionDef = { id: DecisionId; no: string; name: Tx; what: Tx; cost: number; weeks: number; area: DecisionArea };
const DECISIONS_DEF: DecisionDef[] = [
  { id: "d1", no: "D1", cost: 60000, weeks: 18, area: "orientation", name: t("Rebuild navigation and home screen around learner tasks", "Navigation und Startbildschirm um Aufgaben der Lernenden herum neu bauen"), what: t("One main action, “Continue where you stopped”, and two secondary tasks.", "Eine Hauptaktion, „Dort weitermachen, wo Sie aufgehört haben“, und zwei Nebenaufgaben.") },
  { id: "d2", no: "D2", cost: 30000, weeks: 12, area: "complexity", name: t("A feature audit", "Ein Feature-Audit"), what: t("Find the least-used features and retire or hide them.", "Die am wenigsten genutzten Features finden und abschalten oder ausblenden.") },
  { id: "d3", no: "D3", cost: 45000, weeks: 16, area: "orientation", name: t("One content structure", "Eine Inhaltsstruktur"), what: t("A single catalogue with groups, one place per lesson, and a “continue” entry.", "Ein einziger Katalog mit Gruppen, einem Ort pro Lektion und einem „Weiter“-Eintrag.") },
  { id: "d4", no: "D4", cost: 35000, weeks: 52, area: "evidence", name: t("A user-research programme", "Ein Nutzerforschungs-Programm"), what: t("Monthly interviews and a quarterly usability test, feeding every decision.", "Monatliche Interviews und ein vierteljährlicher Usability-Test, die jede Entscheidung speisen.") },
  { id: "d5", no: "D5", cost: 15000, weeks: 8, area: "architecture", name: t("A feature approval rule", "Eine Feature-Freigaberegel"), what: t("Every new feature needs a named user problem, a metric and an owner before it enters the roadmap.", "Jedes neue Feature braucht ein genanntes Nutzerproblem, eine Kennzahl und einen Verantwortlichen, bevor es in die Roadmap kommt.") },
  { id: "d6", no: "D6", cost: 90000, weeks: 28, area: "features", name: t("The feature set sales asked for", "Das Feature-Paket, das der Vertrieb verlangt hat"), what: t("A social feed, groups and badges.", "Ein Social Feed, Gruppen und Badges.") },
  { id: "d7", no: "D7", cost: 60000, weeks: 12, area: "growth", name: t("A growth marketing push", "Ein Wachstums-Marketingschub"), what: t("More advertising for sign-ups.", "Mehr Werbung für Anmeldungen.") },
];
export const DECISIONS = bi(DECISIONS_DEF);
export const DECISION_BY_ID = Object.fromEntries(DECISIONS.map((d) => [d.id, d])) as Record<DecisionId, (typeof DECISIONS)[number]>;
export const DECISION_AREA = bi({
  orientation: t("Acts on: Orientation", "Wirkt auf: Orientierung"),
  complexity: t("Acts on: Complexity", "Wirkt auf: Komplexität"),
  evidence: t("Gathers evidence", "Sammelt Belege"),
  architecture: t("Acts on: Decision architecture", "Wirkt auf: Entscheidungsarchitektur"),
  features: t("Adds features", "Fügt Features hinzu"),
  growth: t("Growth, not experience", "Wachstum, nicht Erlebnis"),
});
export const decisionsCost = (ids: DecisionId[]) => ids.reduce((s, id) => s + DECISION_BY_ID[id].cost, 0);
export const MODEL_DECISIONS: DecisionId[] = ["d1", "d4", "d5"];

export type RiskId = "r1" | "r2" | "r3" | "r4" | "r5";
export const RISK_IDS: RiskId[] = ["r1", "r2", "r3", "r4", "r5"];
export const RISKS = bi([
  { id: "r1" as RiskId, text: t("We fixed the wrong user problem because our data was incomplete.", "Wir haben das falsche Nutzerproblem behoben, weil unsere Daten unvollständig waren.") },
  { id: "r2" as RiskId, text: t("Sales and management overrode the plan with their own features.", "Vertrieb und Management haben den Plan mit eigenen Features überstimmt.") },
  { id: "r3" as RiskId, text: t("We measured sign-ups, not finished courses, and growth did not come.", "Wir haben Anmeldungen gemessen, nicht abgeschlossene Kurse, und das Wachstum blieb aus.") },
  { id: "r4" as RiskId, text: t("The changes confused learners who had learned the old platform.", "Die Änderungen verwirrten Lernende, die die alte Plattform gelernt hatten.") },
  { id: "r5" as RiskId, text: t("We spent the budget before a first result was visible.", "Wir haben das Budget ausgegeben, bevor ein erstes Ergebnis sichtbar war.") },
]);
export const MODEL_RISK_PICK: RiskId = "r1";

export type OwnerId = "o1" | "o2" | "o3" | "o4";
export const OWNER_IDS: OwnerId[] = ["o1", "o2", "o3", "o4"];
export const OWNERS = bi([
  { id: "o1" as OwnerId, text: t("The Chief UX Strategist alone", "Die Chief UX Strategist allein") },
  { id: "o2" as OwnerId, text: t("The head of product with the UX lead", "Die Leiterin Produkt mit der UX-Leiterin") },
  { id: "o3" as OwnerId, text: t("A steering group with all stakeholders", "Ein Lenkungskreis mit allen Stakeholdern") },
  { id: "o4" as OwnerId, text: t("Whichever department pays", "Die Abteilung, die zahlt") },
]);
export const MODEL_OWNER: OwnerId = "o2";

export type EvidenceId = "e1" | "e2" | "e3" | "e4" | "e5";
export const EVIDENCE_IDS: EvidenceId[] = ["e1", "e2", "e3", "e4", "e5"];
export const EVIDENCE = bi([
  { id: "e1" as EvidenceId, text: t("A usability test", "Ein Usability-Test") },
  { id: "e2" as EvidenceId, text: t("Interviews with learners who left", "Interviews mit Lernenden, die gegangen sind") },
  { id: "e3" as EvidenceId, text: t("Usage data per feature", "Nutzungsdaten pro Feature") },
  { id: "e4" as EvidenceId, text: t("A request from sales", "Eine Anfrage des Vertriebs") },
  { id: "e5" as EvidenceId, text: t("The opinion of the most senior person in the room", "Die Meinung der ranghöchsten Person im Raum") },
]);
export const MODEL_EVIDENCE: EvidenceId[] = ["e1", "e2", "e3"];
