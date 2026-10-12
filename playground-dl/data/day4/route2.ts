import { bi, t } from "@/lib/lang";
import type { Tx } from "@/lib/lang";

/**
 * Day 4 · Route 2 (Level 3). The learner is MotivaLearn's Chief Experience Officer. The plan's framework: low user retention, competitors with more
 * motivating platforms, a limited budget, incomplete data. "Limited budget" has no figure in the plan, so €180,000 over twelve months is a Case
 * assumption. The plan's items: a motivation strategy (intrinsic against extrinsic), three prioritised UX measures, an evaluation strategy, a risk analysis
 * (perverse incentives, wrong motivation), a decision architecture for UX optimisation, and one decision under uncertainty.
 */

export const R2_BUDGET = 180000;
export const R2_MONTHS = 12;
export const R2_PICK = 3;
export const METRIC_MIN = 3;
export const EVIDENCE_MIN = 2;

export type StrategyId = "intrinsic" | "mix" | "extrinsic";
export const STRATEGY_IDS: StrategyId[] = ["intrinsic", "mix", "extrinsic"];
export const STRATEGIES = bi([
  { id: "intrinsic" as StrategyId, text: t("Mainly intrinsic: goals, competence, progress", "Hauptsächlich intrinsisch: Ziele, Kompetenz, Fortschritt") },
  { id: "mix" as StrategyId, text: t("A mix: intrinsic as the base, a few extrinsic elements", "Eine Mischung: intrinsisch als Basis, einige extrinsische Elemente") },
  { id: "extrinsic" as StrategyId, text: t("Mainly extrinsic: points, badges, rewards", "Hauptsächlich extrinsisch: Punkte, Badges, Belohnungen") },
]);
export const MODEL_STRATEGY: StrategyId = "mix";

export type DecisionId = "d1" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7";
export const DECISION_IDS: DecisionId[] = ["d1", "d2", "d3", "d4", "d5", "d6", "d7"];
export type DecisionArea = "progressAbility" | "activation" | "goalsFeedback" | "rewards" | "evidence" | "pressure";
type DecisionDef = { id: DecisionId; no: string; name: Tx; what: Tx; cost: number; weeks: number; area: DecisionArea };
const DECISIONS_DEF: DecisionDef[] = [
  { id: "d1", no: "D1", cost: 40000, weeks: 14, area: "progressAbility", name: t("Visible progress and a next step across the platform", "Sichtbarer Fortschritt und ein nächster Schritt auf der ganzen Plattform"), what: t("A progress display and a clear next step on every course and unit page.", "Eine Fortschrittsanzeige und ein klarer nächster Schritt auf jeder Kurs- und Einheitsseite.") },
  { id: "d2", no: "D2", cost: 70000, weeks: 24, area: "activation", name: t("Rebuild the five most-used courses with short interactive tasks", "Die fünf meistgenutzten Kurse mit kurzen interaktiven Aufgaben neu aufbauen"), what: t("Replace long reading with three-minute tasks and feedback.", "Langes Lesen durch Dreiminutenaufgaben und Feedback ersetzen.") },
  { id: "d3", no: "D3", cost: 25000, weeks: 12, area: "goalsFeedback", name: t("A goals and feedback standard", "Ein Standard für Ziele und Feedback"), what: t("Every unit states its goal; every task gives a result and a next step.", "Jede Einheit nennt ihr Ziel; jede Aufgabe gibt ein Ergebnis und einen nächsten Schritt.") },
  { id: "d4", no: "D4", cost: 45000, weeks: 16, area: "rewards", name: t("Points, badges and a leaderboard", "Punkte, Badges und eine Rangliste"), what: t("A reward layer across the platform.", "Eine Belohnungsschicht über die ganze Plattform.") },
  { id: "d5", no: "D5", cost: 30000, weeks: 52, area: "evidence", name: t("A research and experiment routine", "Eine Forschungs- und Experimentier-Routine"), what: t("Monthly learner interviews and A/B tests for every motivation measure.", "Monatliche Lernenden-Interviews und A/B-Tests für jede Motivationsmaßnahme.") },
  { id: "d6", no: "D6", cost: 20000, weeks: 8, area: "pressure", name: t("Streaks, reminders and loss messages", "Serien, Erinnerungen und Verlustmeldungen"), what: t("Daily streaks and messages such as “You will lose your streak”.", "Tagesserien und Meldungen wie „Sie verlieren Ihre Serie“.") },
  { id: "d7", no: "D7", cost: 35000, weeks: 10, area: "rewards", name: t("Discounts for completion", "Rabatte fürs Abschließen"), what: t("A discount on the next course for every finished course.", "Ein Rabatt auf den nächsten Kurs für jeden abgeschlossenen Kurs.") },
];
export const DECISIONS = bi(DECISIONS_DEF);
export const DECISION_BY_ID = Object.fromEntries(DECISIONS.map((d) => [d.id, d])) as Record<DecisionId, (typeof DECISIONS)[number]>;
export const DECISION_AREA = bi({
  progressAbility: t("Acts on: Progress and ability", "Wirkt auf: Fortschritt und Können"),
  activation: t("Acts on: Activation", "Wirkt auf: Aktivierung"),
  goalsFeedback: t("Acts on: Goals and feedback", "Wirkt auf: Ziele und Feedback"),
  rewards: t("Adds rewards", "Fügt Belohnungen hinzu"),
  evidence: t("Gathers evidence", "Sammelt Belege"),
  pressure: t("Adds pressure", "Fügt Druck hinzu"),
});
export const decisionsCost = (ids: DecisionId[]) => ids.reduce((s, id) => s + DECISION_BY_ID[id].cost, 0);
export const MODEL_DECISIONS: DecisionId[] = ["d1", "d3", "d5"];

export type MetricId = "k1" | "k2" | "k3" | "k4" | "k5" | "k6" | "k7";
export const METRIC_IDS: MetricId[] = ["k1", "k2", "k3", "k4", "k5", "k6", "k7"];
export const METRICS = bi([
  { id: "k1" as MetricId, text: t("Completion rate", "Completion Rate") },
  { id: "k2" as MetricId, text: t("Return rate within seven days", "Rückkehrrate innerhalb von sieben Tagen") },
  { id: "k3" as MetricId, text: t("Tasks done per week", "Erledigte Aufgaben pro Woche") },
  { id: "k4" as MetricId, text: t("Time spent on the platform", "Verbrachte Zeit auf der Plattform") },
  { id: "k5" as MetricId, text: t("Badges earned", "Verdiente Badges") },
  { id: "k6" as MetricId, text: t("Learner interviews", "Lernenden-Interviews") },
  { id: "k7" as MetricId, text: t("Satisfaction rating", "Zufriedenheitsbewertung") },
]);
export const MODEL_METRICS: MetricId[] = ["k1", "k2", "k3", "k6"];

export type RiskId = "r1" | "r2" | "r3" | "r4" | "r5";
export const RISK_IDS: RiskId[] = ["r1", "r2", "r3", "r4", "r5"];
export const RISKS = bi([
  { id: "r1" as RiskId, text: t("Learners collect rewards without learning (a perverse incentive).", "Lernende sammeln Belohnungen, ohne zu lernen (ein Fehlanreiz).") },
  { id: "r2" as RiskId, text: t("Learners feel pressured and trust the platform less.", "Lernende fühlen sich unter Druck gesetzt und vertrauen der Plattform weniger.") },
  { id: "r3" as RiskId, text: t("We raise short-term activity that fades once the novelty is gone.", "Wir steigern kurzfristige Aktivität, die verfliegt, sobald das Neue vorbei ist.") },
  { id: "r4" as RiskId, text: t("We change the wrong thing because our data does not show why learners leave.", "Wir ändern das Falsche, weil unsere Daten nicht zeigen, warum Lernende gehen.") },
  { id: "r5" as RiskId, text: t("Management expects retention to rise within weeks.", "Die Geschäftsführung erwartet, dass die Retention in wenigen Wochen steigt.") },
]);
export const MODEL_RISK_PICK: RiskId = "r4";

export type OwnerId = "o1" | "o2" | "o3" | "o4";
export const OWNER_IDS: OwnerId[] = ["o1", "o2", "o3", "o4"];
export const OWNERS = bi([
  { id: "o1" as OwnerId, text: t("The Chief Experience Officer alone", "Die Chief Experience Officer allein") },
  { id: "o2" as OwnerId, text: t("The head of product together with the learning lead", "Die Leiterin Produkt gemeinsam mit dem Learning Lead") },
  { id: "o3" as OwnerId, text: t("A steering group with management", "Ein Lenkungskreis mit dem Management") },
  { id: "o4" as OwnerId, text: t("Whoever runs the campaign", "Wer die Kampagne leitet") },
]);
export const MODEL_OWNER: OwnerId = "o2";

export type EvidenceId = "e1" | "e2" | "e3" | "e4" | "e5";
export const EVIDENCE_IDS: EvidenceId[] = ["e1", "e2", "e3", "e4", "e5"];
export const EVIDENCE = bi([
  { id: "e1" as EvidenceId, text: t("An A/B test with a control group", "Ein A/B-Test mit einer Kontrollgruppe") },
  { id: "e2" as EvidenceId, text: t("Learner interviews", "Lernenden-Interviews") },
  { id: "e3" as EvidenceId, text: t("Return rate and completion data", "Rückkehr- und Completion-Daten") },
  { id: "e4" as EvidenceId, text: t("A comparison with a competitor", "Ein Vergleich mit einem Wettbewerber") },
  { id: "e5" as EvidenceId, text: t("The opinion of the most senior person in the room", "Die Meinung der ranghöchsten Person im Raum") },
]);
export const MODEL_EVIDENCE: EvidenceId[] = ["e1", "e2", "e3"];
