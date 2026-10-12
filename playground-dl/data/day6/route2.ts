import { bi, t } from "@/lib/lang";
import type { Tx } from "@/lib/lang";

/**
 * Day 6 · Route 2 (Level 3). The learner is EduPath's Head of UX Strategy. The plan's framework: a quickly growing platform, limited resources, user groups with
 * conflicting needs, a decision about which persona to prioritise although the data is thin. "Limited resources" has no figure in the plan, so €220,000 over
 * twelve months is a Case assumption, and so are the five segments' figures and the seven decisions' costs and weeks. The plan's items: two or three strategic
 * personas, the most important target group, the most critical journey, the three biggest problems, a prioritised UX strategy, one decision under uncertainty.
 */

export const R2_BUDGET = 220000;
export const R2_MONTHS = 12;
export const R2_PICK = 3;
export const SEG_MIN = 2;
export const SEG_MAX = 3;

export type SegmentId = "s1" | "s2" | "s3" | "s4" | "s5";
export const SEGMENT_IDS: SegmentId[] = ["s1", "s2", "s3", "s4", "s5"];
type SegmentDef = { id: SegmentId; no: string; name: Tx; facts: Tx; short: Tx };
const SEGMENTS_DEF: SegmentDef[] = [
  { id: "s1", no: "S1", name: t("Time-poor learners", "Lernende mit wenig Zeit"), short: t("Time-poor learners", "Lernende mit wenig Zeit"), facts: t("45% of learners; study about 20 minutes on a phone; paid by employers; return rate is falling.", "45 % der Lernenden; lernen etwa 20 Minuten auf dem Handy; von Arbeitgebern bezahlt; die Rückkehrrate sinkt.") },
  { id: "s2", no: "S2", name: t("Exam preparers", "Prüfungsvorbereiter"), short: t("Exam preparers", "Prüfungsvorbereiter"), facts: t("15% of learners; long sessions on a laptop; pay themselves; high satisfaction.", "15 % der Lernenden; lange Sitzungen auf dem Laptop; zahlen selbst; hohe Zufriedenheit.") },
  { id: "s3", no: "S3", name: t("Teachers who build courses", "Lehrende, die Kurse bauen"), short: t("Teachers who build courses", "Lehrende, die Kurse bauen"), facts: t("120 teachers; they supply all course content; 4 of 6 interviewed say the editor is too complicated.", "120 Lehrende; sie liefern den gesamten Kursinhalt; 4 von 6 Befragten sagen, der Editor sei zu kompliziert.") },
  { id: "s4", no: "S4", name: t("Training managers at client companies", "Weiterbildungsleiter bei Kundenunternehmen"), short: t("Training managers", "Weiterbildungsleiter"), facts: t("60 client accounts; they decide whether licences are renewed; 31% of employees logged in last quarter.", "60 Kundenkonten; sie entscheiden, ob Lizenzen verlängert werden; 31 % der Mitarbeitenden haben sich im letzten Quartal angemeldet.") },
  { id: "s5", no: "S5", name: t("Casual browsers", "Gelegenheitsbesucher"), short: t("Casual browsers", "Gelegenheitsbesucher"), facts: t("20% of sign-ups; rarely finish a course; no payment link.", "20 % der Anmeldungen; schließen selten einen Kurs ab; keine Zahlungsverbindung.") },
];
export const SEGMENTS = bi(SEGMENTS_DEF);
export const SEGMENT_BY_ID = Object.fromEntries(SEGMENTS.map((s) => [s.id, s])) as Record<SegmentId, (typeof SEGMENTS)[number]>;

/** Reference answers: the strategic personas, the target group and the persona of the critical journey. */
export const MODEL_SEGMENTS: SegmentId[] = ["s1", "s3", "s4"];
export const MODEL_TARGET: SegmentId = "s1";

export type DecisionId = "d1" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7";
export const DECISION_IDS: DecisionId[] = ["d1", "d2", "d3", "d4", "d5", "d6", "d7"];
export type DecisionArea = "learners" | "teachers" | "onboarding" | "orgs" | "exam" | "evidence" | "marketing";
type DecisionDef = { id: DecisionId; no: string; name: Tx; what: Tx; cost: number; weeks: number; area: DecisionArea };
const DECISIONS_DEF: DecisionDef[] = [
  { id: "d1", no: "D1", cost: 70000, weeks: 20, area: "learners", name: t("Flexible five-minute learning formats", "Flexible Fünf-Minuten-Lernformate"), what: t("Units that work on a phone and can be paused or resumed anywhere.", "Einheiten, die auf dem Handy funktionieren und sich überall pausieren oder fortsetzen lassen.") },
  { id: "d2", no: "D2", cost: 60000, weeks: 22, area: "teachers", name: t("A simpler teacher workspace", "Ein einfacherer Arbeitsbereich für Lehrende"), what: t("A shorter editor, reusable units and a view of stuck learners.", "Ein kürzerer Editor, wiederverwendbare Einheiten und eine Ansicht der festgefahrenen Lernenden.") },
  { id: "d3", no: "D3", cost: 35000, weeks: 12, area: "onboarding", name: t("An onboarding path by role", "Ein Onboarding-Pfad nach Rolle"), what: t("Different first steps for learner, teacher and training manager.", "Unterschiedliche erste Schritte für Lernende, Lehrende und Weiterbildungsleiter.") },
  { id: "d4", no: "D4", cost: 30000, weeks: 12, area: "orgs", name: t("Client reporting", "Kundenberichte"), what: t("Automatic, formatted monthly reports for training managers.", "Automatische, formatierte Monatsberichte für Weiterbildungsleiter.") },
  { id: "d5", no: "D5", cost: 55000, weeks: 18, area: "exam", name: t("An exam-preparation mode", "Ein Prüfungsvorbereitungsmodus"), what: t("Practice sets, notes and an overview for intensive learners.", "Übungssätze, Notizen und eine Übersicht für intensive Lernende.") },
  { id: "d6", no: "D6", cost: 25000, weeks: 52, area: "evidence", name: t("A persona research programme", "Ein Persona-Forschungsprogramm"), what: t("Quarterly interviews per strategic persona and usage analysis per segment.", "Vierteljährliche Interviews pro strategischer Persona und Nutzungsanalyse pro Segment.") },
  { id: "d7", no: "D7", cost: 40000, weeks: 10, area: "marketing", name: t("A redesign of the public marketing site", "Ein Redesign der öffentlichen Marketingseite"), what: t("A new look for the public web pages.", "Ein neues Aussehen für die öffentlichen Webseiten.") },
];
export const DECISIONS = bi(DECISIONS_DEF);
export const DECISION_BY_ID = Object.fromEntries(DECISIONS.map((d) => [d.id, d])) as Record<DecisionId, (typeof DECISIONS)[number]>;
export const DECISION_AREA = bi({
  learners: t("Acts on: Learners", "Wirkt auf: Lernende"),
  teachers: t("Acts on: Teachers", "Wirkt auf: Lehrende"),
  onboarding: t("Acts on: Entry for every group", "Wirkt auf: Einstieg jeder Gruppe"),
  orgs: t("Acts on: Organisations", "Wirkt auf: Organisationen"),
  exam: t("Acts on: Exam preparers", "Wirkt auf: Prüfungsvorbereiter"),
  evidence: t("Gathers evidence", "Sammelt Belege"),
  marketing: t("Marketing, not experience", "Marketing, nicht Erlebnis"),
});
export const decisionsCost = (ids: DecisionId[]) => ids.reduce((s, id) => s + DECISION_BY_ID[id].cost, 0);
export const MODEL_DECISIONS: DecisionId[] = ["d1", "d4", "d6"];

export type PhaseIdR = "entry" | "work" | "progress";
export const PHASES_R: PhaseIdR[] = ["entry", "work", "progress"];
export const PHASE_LABEL_R = bi({ entry: t("Entry", "Einstieg"), work: t("Learning or working", "Lernen oder Arbeiten"), progress: t("Progress and completion", "Fortschritt und Abschluss") });
