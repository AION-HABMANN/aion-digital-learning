import { bi, t } from "@/lib/lang";
import type { Tx } from "@/lib/lang";
import type { Verdict } from "@/data/day2/case";

/**
 * Day 2 · Route 2 (Level 3). The learner is LearnPro's Chief Product Officer. The plan's framework: competitors use AI and adaptive systems,
 * the platform is outdated, the budget is limited, the data situation is incomplete. "Limited budget" has no figure in the plan, so €200,000
 * over twelve months is a Case assumption. The plan's items: a decision on adaptive learning (yes, no, partly), a prototyping strategy, a
 * UX testing strategy, a prioritised innovation roadmap, a risk analysis, and one decision under uncertainty.
 */

export const R2_BUDGET = 200000;
export const R2_MONTHS = 12;
export const R2_PICK = 3;
export const DATA_MIN = 3;
export const EVIDENCE_MIN = 2;

export type { Verdict };

/* ------------------------------------------------------------------ the testing strategy: which data do we need */

export type DataId = "q1" | "q2" | "q3" | "q4" | "q5" | "q6" | "q7";
export const DATA_IDS: DataId[] = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"];
export const DATA = bi([
  { id: "q1" as DataId, text: t("Drop-out per lesson from existing logs (shows where learners leave)", "Abbruch pro Lektion aus vorhandenen Logs (zeigt, wo Lernende gehen)") },
  { id: "q2" as DataId, text: t("Interviews with learners who left (shows why)", "Interviews mit Lernenden, die gegangen sind (zeigt, warum)") },
  { id: "q3" as DataId, text: t("Task success and time in usability tests", "Aufgabenerfolg und Zeit in Usability-Tests") },
  { id: "q4" as DataId, text: t("Completion per course in a pilot with a control group", "Completion pro Kurs in einem Pilot mit Kontrollgruppe") },
  { id: "q5" as DataId, text: t("Time on task in the live platform", "Zeit pro Aufgabe auf der Live-Plattform") },
  { id: "q6" as DataId, text: t("Competitors' feature lists", "Funktionslisten der Wettbewerber") },
  { id: "q7" as DataId, text: t("Consent and legal basis for tracking learners", "Einwilligung und Rechtsgrundlage für das Tracking von Lernenden") },
]);
export const MODEL_DATA: DataId[] = ["q1", "q2", "q4", "q7"];

/* ------------------------------------------------------------------ the roadmap: seven investments, choose three */

export type InvId = "i1" | "i2" | "i3" | "i4" | "i5" | "i6" | "i7";
export const INV_IDS: InvId[] = ["i1", "i2", "i3", "i4", "i5", "i6", "i7"];
export type InvArea = "guidance" | "adaptive" | "evidence" | "process" | "technology" | "look" | "engagement";
type InvDef = { id: InvId; no: string; name: Tx; what: Tx; cost: number; weeks: number; area: InvArea };
const INV_DEF: InvDef[] = [
  { id: "i1", no: "I1", cost: 30000, weeks: 10, area: "guidance", name: t("Guided path and feedback redesign, tested with low-fidelity prototypes", "Neugestaltung von geführtem Pfad und Feedback, getestet mit Low-Fidelity-Prototypen"), what: t("Rework the course flow around one path and a result after each quiz; test before building.", "Den Kursablauf um einen Pfad und ein Ergebnis nach jedem Quiz herum neu gestalten; vor dem Bauen testen.") },
  { id: "i2", no: "I2", cost: 40000, weeks: 16, area: "adaptive", name: t("Rule-based personalisation pilot", "Pilot für regelbasierte Personalisierung"), what: t("A pre-test lets learners skip what they know; one course, with a control group.", "Ein Vortest lässt Lernende überspringen, was sie schon wissen; ein Kurs, mit Kontrollgruppe.") },
  { id: "i3", no: "I3", cost: 25000, weeks: 12, area: "evidence", name: t("Learning-analytics dashboard for the product team", "Learning-Analytics-Dashboard für das Produktteam"), what: t("Completion and drop-out per lesson, with consent and a stated purpose.", "Completion und Abbruch pro Lektion, mit Einwilligung und einem genannten Zweck.") },
  { id: "i4", no: "I4", cost: 20000, weeks: 52, area: "process", name: t("A standing prototype-and-test routine", "Eine feste Routine aus Prototyp und Test"), what: t("Every new feature gets a low-fidelity test before it is built.", "Jede neue Funktion bekommt einen Low-Fidelity-Test, bevor sie gebaut wird.") },
  { id: "i5", no: "I5", cost: 120000, weeks: 40, area: "technology", name: t("AI recommendation engine for all courses", "KI-Empfehlungs-Engine für alle Kurse"), what: t("Software that suggests the next lesson to each learner from their behaviour.", "Software, die jeder Lernenden aus ihrem Verhalten die nächste Lektion vorschlägt.") },
  { id: "i6", no: "I6", cost: 60000, weeks: 20, area: "look", name: t("New visual design of the whole platform", "Neues visuelles Design der ganzen Plattform"), what: t("Colours, icons, fonts and layout.", "Farben, Icons, Schriften und Layout.") },
  { id: "i7", no: "I7", cost: 45000, weeks: 20, area: "engagement", name: t("Interactive exercises for the three most boring courses", "Interaktive Übungen für die drei langweiligsten Kurse"), what: t("Replace long text with short tasks and feedback.", "Langen Text durch kurze Aufgaben und Feedback ersetzen.") },
];
export const INVS = bi(INV_DEF);
export const INV_BY_ID = Object.fromEntries(INVS.map((d) => [d.id, d])) as Record<InvId, (typeof INVS)[number]>;
export const INV_AREA = bi({
  guidance: t("Acts on: guidance and feedback", "Wirkt auf: Führung und Feedback"),
  adaptive: t("Acts on: the adaptive step", "Wirkt auf: den adaptiven Schritt"),
  evidence: t("Gathers evidence", "Sammelt Belege"),
  process: t("Builds evidence into the process", "Verankert Belege im Prozess"),
  technology: t("Adds technology", "Fügt Technologie hinzu"),
  look: t("Acts on the look, not the experience", "Wirkt auf das Aussehen, nicht das Erlebnis"),
  engagement: t("Acts on: engagement", "Wirkt auf: Engagement"),
});
export const invsCost = (ids: InvId[]) => ids.reduce((s, id) => s + INV_BY_ID[id].cost, 0);
export const MODEL_INVS: InvId[] = ["i1", "i3", "i2"];

/* ------------------------------------------------------------------ Block 3.2 */

export type RiskId = "r1" | "r2" | "r3" | "r4" | "r5";
export const RISK_IDS: RiskId[] = ["r1", "r2", "r3", "r4", "r5"];
export const RISKS = bi([
  { id: "r1" as RiskId, text: t("We buy technology that the data cannot support.", "Wir kaufen Technologie, die die Daten nicht tragen können.") },
  { id: "r2" as RiskId, text: t("Competitors' AI gets ahead while we run pilots.", "Die KI der Wettbewerber zieht davon, während wir Piloten fahren.") },
  { id: "r3" as RiskId, text: t("Learners do not understand or trust the recommendations.", "Lernende verstehen die Empfehlungen nicht oder vertrauen ihnen nicht.") },
  { id: "r4" as RiskId, text: t("The pilot is too small to show a result.", "Der Pilot ist zu klein, um ein Ergebnis zu zeigen.") },
  { id: "r5" as RiskId, text: t("The legal check for adaptive features comes too late.", "Die rechtliche Prüfung für adaptive Funktionen kommt zu spät.") },
]);
export const MODEL_RISK_PICK: RiskId = "r1";

export type OwnerId = "o1" | "o2" | "o3" | "o4";
export const OWNER_IDS: OwnerId[] = ["o1", "o2", "o3", "o4"];
export const OWNERS = bi([
  { id: "o1" as OwnerId, text: t("The Chief Product Officer alone", "Die Chief Product Officer allein") },
  { id: "o2" as OwnerId, text: t("The product lead together with the head of data", "Der Product Lead gemeinsam mit der Leiterin Daten") },
  { id: "o3" as OwnerId, text: t("A steering group with management", "Ein Lenkungskreis mit dem Management") },
  { id: "o4" as OwnerId, text: t("The vendor of the technology", "Der Anbieter der Technologie") },
]);
export const MODEL_OWNER: OwnerId = "o2";

export type EvidenceId = "e1" | "e2" | "e3" | "e4" | "e5";
export const EVIDENCE_IDS: EvidenceId[] = ["e1", "e2", "e3", "e4", "e5"];
export const EVIDENCE = bi([
  { id: "e1" as EvidenceId, text: t("A pilot with a control group", "Ein Pilot mit Kontrollgruppe") },
  { id: "e2" as EvidenceId, text: t("A usability test of the new screens", "Ein Usability-Test der neuen Bildschirme") },
  { id: "e3" as EvidenceId, text: t("Drop-out data per lesson", "Abbruchdaten pro Lektion") },
  { id: "e4" as EvidenceId, text: t("A vendor demonstration or competitor comparison", "Eine Anbieter-Demonstration oder ein Wettbewerbsvergleich") },
  { id: "e5" as EvidenceId, text: t("The opinion of the most senior person in the room", "Die Meinung der ranghöchsten Person im Raum") },
]);
export const MODEL_EVIDENCE: EvidenceId[] = ["e1", "e2", "e3"];
