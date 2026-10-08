import { bi, t } from "@/lib/lang";
import type { Tx } from "@/lib/lang";

/**
 * Day 1 · Route 2 (Level 3). The learner is SkillUp's Chief UX Officer. The plan's framework: a strongly growing market, competitors with
 * better UX, a limited budget, impatient users. "Limited budget" has no figure in the plan, so €120,000 over twelve months is a Case assumption.
 * The plan's five items: UX vision, three strategic UX decisions, a prioritised roadmap, a risk analysis, a decision architecture;
 * plus "make one decision despite incomplete data".
 */

export const R2_BUDGET = 120000;
export const R2_MONTHS = 12;
export const R2_PICK = 3;

export type DecisionId = "d1" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7";
export const DECISION_IDS: DecisionId[] = ["d1", "d2", "d3", "d4", "d5", "d6", "d7"];
export type DecisionArea = "orientation" | "understanding" | "motivation" | "evidence" | "reward" | "technology" | "growth";

type DecisionDef = { id: DecisionId; name: Tx; what: Tx; notice: Tx; cost: number; weeks: number; area: DecisionArea };
const DECISIONS_DEF: DecisionDef[] = [
  { id: "d1", cost: 45000, weeks: 16, area: "orientation", name: t("Guided learning paths for the three most-taken courses", "Geführte Lernpfade für die drei meistgenutzten Kurse"),
    what: t("Rebuild the three busiest courses around one path each: first, next, last.", "Die drei am stärksten genutzten Kurse um je einen Pfad herum neu bauen: zuerst, als Nächstes, zuletzt."),
    notice: t("A learner always sees where they are on the path and what comes next.", "Die Lernenden sehen immer, wo sie auf dem Pfad sind und was als Nächstes kommt.") },
  { id: "d2", cost: 25000, weeks: 12, area: "motivation", name: t("Progress and feedback on every course page and quiz", "Fortschritt und Feedback auf jeder Kursseite und in jedem Quiz"),
    what: t("Show progress on every course page and give a clear message after every quiz.", "Auf jeder Kursseite den Fortschritt zeigen und nach jedem Quiz eine klare Rückmeldung geben."),
    notice: t("A learner sees how far they have come and how they did.", "Die Lernenden sehen, wie weit sie sind und wie sie abgeschnitten haben.") },
  { id: "d3", cost: 40000, weeks: 20, area: "understanding", name: t("Rewrite the ten longest lessons as short, structured units", "Die zehn längsten Lektionen als kurze, strukturierte Einheiten neu schreiben"),
    what: t("Rewrite the ten longest lessons with headings, short paragraphs and plain wording.", "Die zehn längsten Lektionen mit Überschriften, kurzen Absätzen und einfacher Sprache neu schreiben."),
    notice: t("Those ten lessons can be scanned and followed without effort.", "Diese zehn Lektionen lassen sich überfliegen und ohne Mühe verfolgen.") },
  { id: "d4", cost: 30000, weeks: 52, area: "evidence", name: t("A standing user-research programme", "Ein dauerhaftes Nutzerforschungsprogramm"),
    what: t("Interview learners every month and run a usability test every quarter, and feed the results to every UX decision.", "Jeden Monat Lernende befragen und jedes Quartal einen Usability-Test durchführen und die Ergebnisse in jede UX-Entscheidung einfließen lassen."),
    notice: t("Nothing changes on screen at first; decisions rest on what learners actually do.", "Zunächst ändert sich auf dem Bildschirm nichts; Entscheidungen beruhen darauf, was Lernende tatsächlich tun.") },
  { id: "d5", cost: 35000, weeks: 16, area: "reward", name: t("Points, badges and a leaderboard", "Punkte, Badges und eine Rangliste"),
    what: t("Introduce points for each lesson, badges for milestones and a ranking of learners.", "Punkte für jede Lektion, Badges für Meilensteine und eine Rangliste der Lernenden einführen."),
    notice: t("Learners collect points and see where they stand against others.", "Die Lernenden sammeln Punkte und sehen, wo sie gegenüber anderen stehen.") },
  { id: "d6", cost: 90000, weeks: 36, area: "technology", name: t("AI-driven personal recommendations", "KI-gestützte persönliche Empfehlungen"),
    what: t("Build a system that recommends the next lesson to each learner from their behaviour.", "Ein System bauen, das jeder Lernenden aus ihrem Verhalten die nächste Lektion empfiehlt."),
    notice: t("Each learner is shown a different next step, chosen by software.", "Jede Lernende bekommt einen anderen nächsten Schritt gezeigt, von Software gewählt.") },
  { id: "d7", cost: 60000, weeks: 12, area: "growth", name: t("Double the marketing budget", "Das Marketingbudget verdoppeln"),
    what: t("Spend twice as much on advertising to win more new learners.", "Doppelt so viel für Werbung ausgeben, um mehr neue Lernende zu gewinnen."),
    notice: t("More new learners arrive; the platform they meet is unchanged.", "Mehr neue Lernende kommen; die Plattform, auf die sie treffen, bleibt unverändert.") },
];
export const DECISIONS = bi(DECISIONS_DEF);
export const DECISION_BY_ID = Object.fromEntries(DECISIONS.map((d) => [d.id, d])) as Record<DecisionId, (typeof DECISIONS)[number]>;
export const DECISION_AREA = bi({
  orientation: t("Acts on: Orientation", "Wirkt auf: Orientierung"),
  understanding: t("Acts on: Understanding", "Wirkt auf: Verständnis"),
  motivation: t("Acts on: Motivation", "Wirkt auf: Motivation"),
  evidence: t("Gathers evidence", "Sammelt Belege"),
  reward: t("Adds rewards", "Fügt Belohnungen hinzu"),
  technology: t("Adds technology", "Fügt Technologie hinzu"),
  growth: t("Aims at growth, not experience", "Zielt auf Wachstum, nicht auf Erlebnis"),
});
export const decisionsCost = (ids: DecisionId[]) => ids.reduce((s, id) => s + DECISION_BY_ID[id].cost, 0);
export const MODEL_DECISIONS: DecisionId[] = ["d1", "d2", "d4"];

export type RiskId = "r1" | "r2" | "r3" | "r4" | "r5";
export const RISK_IDS: RiskId[] = ["r1", "r2", "r3", "r4", "r5"];
export const RISKS = bi([
  { id: "r1" as RiskId, text: t("We treat the symptom (drop-out) and miss its cause.", "Wir behandeln das Symptom (Abbruch) und verfehlen die Ursache.") },
  { id: "r2" as RiskId, text: t("Competitors improve faster than we do while we prepare.", "Wettbewerber verbessern sich schneller als wir, während wir vorbereiten.") },
  { id: "r3" as RiskId, text: t("Learners do not use the new paths or progress views.", "Die Lernenden nutzen die neuen Pfade oder Fortschrittsansichten nicht.") },
  { id: "r4" as RiskId, text: t("The budget is used up before a first result is visible.", "Das Budget ist aufgebraucht, bevor ein erstes Ergebnis sichtbar wird.") },
  { id: "r5" as RiskId, text: t("Management expects the drop-out rate to fall within weeks.", "Das Management erwartet, dass die Abbruchquote binnen Wochen sinkt.") },
]);
export const MODEL_RISK_PICK: RiskId = "r1";

export type OwnerId = "o1" | "o2" | "o3" | "o4";
export const OWNER_IDS: OwnerId[] = ["o1", "o2", "o3", "o4"];
export const OWNERS = bi([
  { id: "o1" as OwnerId, text: t("The Chief UX Officer alone", "Die Chief UX Officer allein") },
  { id: "o2" as OwnerId, text: t("The UX lead together with the product owner", "Der UX Lead gemeinsam mit dem Product Owner") },
  { id: "o3" as OwnerId, text: t("A steering group with management", "Ein Lenkungskreis mit dem Management") },
  { id: "o4" as OwnerId, text: t("Whoever builds the feature", "Wer die Funktion baut") },
]);
export const MODEL_OWNER: OwnerId = "o2";

export type EvidenceId = "e1" | "e2" | "e3" | "e4" | "e5";
export const EVIDENCE_IDS: EvidenceId[] = ["e1", "e2", "e3", "e4", "e5"];
export const EVIDENCE_MIN = 2;
export const EVIDENCE = bi([
  { id: "e1" as EvidenceId, text: t("Learner interviews", "Interviews mit Lernenden") },
  { id: "e2" as EvidenceId, text: t("A usability test of the new screens", "Ein Usability-Test der neuen Bildschirme") },
  { id: "e3" as EvidenceId, text: t("Drop-out data per lesson", "Abbruchdaten pro Lektion") },
  { id: "e4" as EvidenceId, text: t("A comparison with competitors", "Ein Vergleich mit Wettbewerbern") },
  { id: "e5" as EvidenceId, text: t("The opinion of the most senior person in the room", "Die Meinung der ranghöchsten Person im Raum") },
]);
export const MODEL_EVIDENCE: EvidenceId[] = ["e1", "e2", "e3"];
