import { bi, t } from "@/lib/lang";
import type { Tx } from "@/lib/lang";

/**
 * Day 7 · Route 2 (Level 3). The learner is InclusiveLearn's Chief UX and Accessibility Officer. The plan's framework: the platform is growing but does not reach all
 * user groups, accessibility requirements are increasing, resources are limited. "Limited resources" has no figure in the plan, so €240,000 over twelve months is a
 * Case assumption, and so are the seven decisions' costs and weeks. The plan's items: a strategy for inclusive UX, integration into existing processes, three
 * prioritised measures, an evaluation system (KPIs and methods), a risk analysis (costs against benefits), and one decision under uncertainty.
 */

export const R2_BUDGET = 240000;
export const R2_MONTHS = 12;
export const R2_PICK = 3;
export const PLACES_MIN = 3;
export const KPI_MIN = 3;
export const EVAL_MIN = 2;

/* ------------------------------------------------------------------ Block 3.1 */

export type PlaceId = "pl1" | "pl2" | "pl3" | "pl4" | "pl5" | "pl6" | "pl7";
export const PLACE_IDS: PlaceId[] = ["pl1", "pl2", "pl3", "pl4", "pl5", "pl6", "pl7"];
export const PLACES = bi([
  { id: "pl1" as PlaceId, text: t("Requirements and user stories", "Anforderungen und User Stories"), reading: t("Accessibility is asked for before anything is built.", "Barrierefreiheit wird verlangt, bevor irgendetwas gebaut wird.") },
  { id: "pl2" as PlaceId, text: t("Design reviews", "Design-Reviews"), reading: t("Barriers are caught on the drawing board.", "Barrieren werden auf dem Reißbrett erwischt.") },
  { id: "pl3" as PlaceId, text: t("Development: the definition of “done”", "Entwicklung: die Definition von „fertig“"), reading: t("A feature is not finished until it passes.", "Ein Feature ist erst fertig, wenn es besteht.") },
  { id: "pl4" as PlaceId, text: t("Content creation: a standard for authors", "Inhaltserstellung: ein Standard für Autoren"), reading: t("New lessons are born accessible.", "Neue Lektionen entstehen von Anfang an barrierefrei.") },
  { id: "pl5" as PlaceId, text: t("Buying third-party tools", "Einkauf von Drittanbieter-Werkzeugen"), reading: t("A tool can bring barriers in; procurement is a gate.", "Ein Werkzeug kann Barrieren hereinbringen; der Einkauf ist ein Tor.") },
  { id: "pl6" as PlaceId, text: t("Release testing", "Release-Tests"), reading: t("Automated and manual checks before every release.", "Automatische und manuelle Prüfungen vor jedem Release.") },
  { id: "pl7" as PlaceId, text: t("A support channel for access problems", "Ein Support-Kanal für Zugangsprobleme"), reading: t("Learners can report what the tests missed.", "Lernende können melden, was die Tests übersehen haben.") },
]);
export const MODEL_PLACES: PlaceId[] = ["pl1", "pl2", "pl3", "pl6"];

export type DecisionId = "d1" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7";
export const DECISION_IDS: DecisionId[] = ["d1", "d2", "d3", "d4", "d5", "d6", "d7"];
export type DecisionArea = "reach" | "integration" | "evidence" | "understandable" | "layer" | "features";
type DecisionDef = { id: DecisionId; no: string; name: Tx; what: Tx; cost: number; weeks: number; area: DecisionArea };
const DECISIONS_DEF: DecisionDef[] = [
  { id: "d1", no: "D1", cost: 80000, weeks: 22, area: "reach", name: t("Fix the barriers in the 20 most-used courses", "Die Barrieren in den 20 meistgenutzten Kursen beheben"), what: t("Contrast, keyboard use, captions and plain language in the courses most learners open.", "Kontrast, Tastaturbedienung, Untertitel und einfache Sprache in den Kursen, die die meisten Lernenden öffnen.") },
  { id: "d2", no: "D2", cost: 40000, weeks: 16, area: "integration", name: t("Accessibility in the design system and every release", "Barrierefreiheit im Design-System und in jedem Release"), what: t("Accessibility requirements, a definition of “done” and automated checks in every release.", "Barrierefreiheits-Anforderungen, eine Definition von „fertig“ und automatische Prüfungen in jedem Release.") },
  { id: "d3", no: "D3", cost: 30000, weeks: 52, area: "evidence", name: t("A quarterly test programme", "Ein vierteljährliches Testprogramm"), what: t("A usability test each quarter with learners with disabilities.", "Ein Usability-Test pro Quartal mit Lernenden mit Behinderungen.") },
  { id: "d4", no: "D4", cost: 25000, weeks: 12, area: "understandable", name: t("A plain-language standard and author training", "Ein Standard für einfache Sprache und Autorentraining"), what: t("A writing standard and training for course authors.", "Ein Schreibstandard und Training für Kursautoren.") },
  { id: "d5", no: "D5", cost: 35000, weeks: 8, area: "evidence", name: t("An external accessibility audit", "Ein externes Barrierefreiheits-Audit"), what: t("An audit against WCAG 2.2 AA and EN 301 549 by a specialist.", "Ein Audit gegen WCAG 2.2 AA und EN 301 549 durch einen Spezialisten.") },
  { id: "d6", no: "D6", cost: 20000, weeks: 4, area: "layer", name: t("An accessibility toolbar", "Eine Barrierefreiheits-Toolbar"), what: t("A third-party toolbar that promises to fix problems automatically.", "Eine Toolbar eines Drittanbieters, die verspricht, Probleme automatisch zu beheben.") },
  { id: "d7", no: "D7", cost: 90000, weeks: 28, area: "features", name: t("New features for growth", "Neue Features für Wachstum"), what: t("A set of new features requested by sales.", "Ein Paket neuer Features, das der Vertrieb verlangt hat.") },
];
export const DECISIONS = bi(DECISIONS_DEF);
export const DECISION_BY_ID = Object.fromEntries(DECISIONS.map((d) => [d.id, d])) as Record<DecisionId, (typeof DECISIONS)[number]>;
export const DECISION_AREA = bi({
  reach: t("Acts on: Reach now", "Wirkt auf: Reichweite jetzt"),
  integration: t("Acts on: Integration", "Wirkt auf: Integration"),
  evidence: t("Gathers evidence", "Sammelt Belege"),
  understandable: t("Acts on: Understandable", "Wirkt auf: Verständlichkeit"),
  layer: t("A layer on top", "Eine Schicht obendrauf"),
  features: t("Adds features", "Fügt Features hinzu"),
});
export const decisionsCost = (ids: DecisionId[]) => ids.reduce((s, id) => s + DECISION_BY_ID[id].cost, 0);
export const MODEL_DECISIONS: DecisionId[] = ["d1", "d2", "d3"];

/* ------------------------------------------------------------------ Block 3.2 */

export type KpiId = "k1" | "k2" | "k3" | "k4" | "k5" | "k6" | "k7";
export const KPI_IDS: KpiId[] = ["k1", "k2", "k3", "k4", "k5", "k6", "k7"];
export const KPIS = bi([
  { id: "k1" as KpiId, text: t("Task success by user group", "Aufgabenerfolg pro Nutzergruppe"), expected: true },
  { id: "k2" as KpiId, text: t("Drop-out by user group", "Abbruch pro Nutzergruppe"), expected: true },
  { id: "k3" as KpiId, text: t("The share of pages that meet WCAG 2.2 AA in an audit", "Der Anteil der Seiten, die in einem Audit WCAG 2.2 AA erfüllen"), expected: true },
  { id: "k4" as KpiId, text: t("Accessibility problems reported, and the time to fix them", "Gemeldete Barrierefreiheitsprobleme und die Zeit bis zur Behebung"), expected: true },
  { id: "k5" as KpiId, text: t("Satisfaction (for example SUS) by group", "Zufriedenheit (zum Beispiel SUS) pro Gruppe"), expected: true },
  { id: "k6" as KpiId, text: t("The number of clicks on a toolbar", "Die Zahl der Klicks auf eine Toolbar"), expected: false },
  { id: "k7" as KpiId, text: t("The number of features released", "Die Zahl der veröffentlichten Features"), expected: false },
]);
export const MODEL_KPIS: KpiId[] = ["k1", "k2", "k3", "k4"];

export type EvalId = "v1" | "v2" | "v3" | "v4" | "v5";
export const EVAL_IDS: EvalId[] = ["v1", "v2", "v3", "v4", "v5"];
export const EVALS = bi([
  { id: "v1" as EvalId, text: t("A usability test with learners with impairments", "Ein Usability-Test mit Lernenden mit Einschränkungen"), gives: t("reasons", "Gründe"), expected: true },
  { id: "v2" as EvalId, text: t("A manual audit (keyboard, screen reader)", "Ein manuelles Audit (Tastatur, Screenreader)"), gives: t("conformance", "Konformität"), expected: true },
  { id: "v3" as EvalId, text: t("Automated checks in each release", "Automatische Prüfungen in jedem Release"), gives: t("quick, partial conformance", "schnelle, teilweise Konformität"), expected: true },
  { id: "v4" as EvalId, text: t("Analytics by group (with a legal basis)", "Analytics pro Gruppe (mit Rechtsgrundlage)"), gives: t("counts", "Zahlen"), expected: true },
  { id: "v5" as EvalId, text: t("A survey of all learners", "Eine Umfrage unter allen Lernenden"), gives: t("one source, not by group", "eine Quelle, nicht pro Gruppe"), expected: false },
]);
export const MODEL_EVALS: EvalId[] = ["v1", "v3", "v4"];

export type RiskId = "r1" | "r2" | "r3" | "r4" | "r5";
export const RISK_IDS: RiskId[] = ["r1", "r2", "r3", "r4", "r5"];
export const RISKS = bi([
  { id: "r1" as RiskId, text: t("Accessibility stayed a project and the platform drifted back.", "Barrierefreiheit blieb ein Projekt, und die Plattform fiel zurück."), answer: t("Answered by D2: a definition of “done” and checks in every release.", "Beantwortet durch D2: eine Definition von „fertig“ und Prüfungen in jedem Release.") },
  { id: "r2" as RiskId, text: t("Authors ignored the standard, so new content was inaccessible.", "Autoren ignorierten den Standard, also war neuer Inhalt nicht barrierefrei."), answer: t("Answered by a standard and training (D4) and a release check.", "Beantwortet durch einen Standard und Training (D4) und eine Release-Prüfung.") },
  { id: "r3" as RiskId, text: t("We bought a toolbar and the barriers stayed.", "Wir kauften eine Toolbar, und die Barrieren blieben."), answer: t("Answered by fixing the source, never by a layer.", "Beantwortet durch Beheben an der Quelle, nie durch eine Schicht.") },
  { id: "r4" as RiskId, text: t("We spent the budget on an audit and had nothing left to fix.", "Wir gaben das Budget für ein Audit aus und hatten nichts mehr zum Beheben."), answer: t("Answered by ordering: fix first, audit later.", "Beantwortet durch die Reihenfolge: erst beheben, später prüfen.") },
  { id: "r5" as RiskId, text: t("We could not show a benefit and the budget was cut.", "Wir konnten keinen Nutzen zeigen, und das Budget wurde gekürzt."), answer: t("Answered by KPIs by group from the first quarter.", "Beantwortet durch KPIs pro Gruppe ab dem ersten Quartal.") },
]);
export const MODEL_RISK_PICK: RiskId = "r1";

