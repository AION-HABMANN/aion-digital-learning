import { bi, t } from "@/lib/lang";
import type { Tx } from "@/lib/lang";

/**
 * Day 6 · the case and the Route 1 instruments. EduPath is a learning platform on which different users fail in different ways (plan, Level 2 case study):
 * learners drop out because they lack time, teachers find the platform too complicated, and the organisations that buy the courses complain about low usage.
 * The plan's scenario for Level 1: a working professional with little time who wants to continue their education. Everything else (the eight research notes,
 * the numbers in them, the six notes about teachers, the €45,000, the 13 weeks, the costs and weeks of the nine measures) is a Case assumption, labelled so
 * on screen.
 */

export const BUDGET = 45000;
export const WEEKS_LIMIT = 13;
export const PICK_MEASURES = 4;

/** Effort follows the printed cost (a rule taught in Materi A5): under €8,000 Low, €8,000 to €15,000 Mid, above that High. */
export const EFFORT_LOW_MAX = 7999;
export const EFFORT_MID_MAX = 15000;
export const effortBand = (cost: number): 1 | 2 | 3 => (cost <= EFFORT_LOW_MAX ? 1 : cost <= EFFORT_MID_MAX ? 2 : 3);
export const EFFORT_RULE = () => ({ en: "under €8,000, up to €15,000, above", de: "unter 8.000 €, bis 15.000 €, darüber" });

/* ------------------------------------------------------------------ Block 1.1 · eight research notes, three persona fields */

export type PersonaFieldId = "goal" | "problem" | "context";
export const PERSONA_FIELD_IDS: PersonaFieldId[] = ["goal", "problem", "context"];

/** The three fields of a persona taught in Materi A1, each with the test question taught there. */
export const PERSONA_FIELDS = bi({
  goal: { id: "goal" as PersonaFieldId, label: t("Goal", "Ziel"), hint: t("Why the person learns", "Warum die Person lernt"), test: t("Is it a reason in the person's life: what they want to reach or be able to do?", "Ist es ein Grund im Leben der Person: was sie erreichen oder können will?") },
  problem: { id: "problem" as PersonaFieldId, label: t("Problem or frustration", "Problem oder Frustration"), hint: t("What gets in the way", "Was im Weg steht"), test: t("Is it a situation where something goes wrong or gets in the person's way?", "Ist es eine Situation, in der etwas schiefgeht oder der Person im Weg steht?") },
  context: { id: "context" as PersonaFieldId, label: t("Context of use", "Nutzungskontext"), hint: t("Time, device, motivation", "Zeit, Gerät, Motivation"), test: t("Does it say when, where, on which device, or why (voluntary or required) the person uses the platform?", "Sagt es, wann, wo, auf welchem Gerät oder warum (freiwillig oder verpflichtend) die Person die Plattform nutzt?") },
});
export const PERSONA_LABEL = (id: PersonaFieldId) => PERSONA_FIELDS[id].label;

export type NoteId = "n1" | "n2" | "n3" | "n4" | "n5" | "n6" | "n7" | "n8";
export const NOTE_IDS: NoteId[] = ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8"];

type NoteDef = { id: NoteId; no: number; where: Tx; text: Tx; short: Tx; key: Tx; clue: Tx; why: Tx; area: PersonaFieldId };

const NOTES_DEF: NoteDef[] = [
  { id: "n1", no: 1, where: t("Learner interview", "Lernenden-Interview"), area: "context",
    text: t("“I study after the children are in bed, around 21:00, for about 20 minutes on my phone.”", "„Ich lerne, nachdem die Kinder im Bett sind, gegen 21:00 Uhr, etwa 20 Minuten auf dem Handy.“"),
    short: t("Studies around 21:00 for 20 minutes on a phone", "Lernt gegen 21:00 Uhr 20 Minuten auf dem Handy"),
    key: t("around 21:00", "gegen 21:00 Uhr"),
    clue: t("Does it say why she learns, what goes wrong, or when and on which device?", "Sagt es, warum sie lernt, was schiefgeht, oder wann und auf welchem Gerät?"),
    why: t("It says when, for how long and on which device: the context of use.", "Es sagt, wann, wie lange und auf welchem Gerät: der Nutzungskontext.") },
  { id: "n2", no: 2, where: t("Learner interview", "Lernenden-Interview"), area: "goal",
    text: t("“I need the certificate to apply for a team-lead role next year.”", "„Ich brauche das Zertifikat, um mich nächstes Jahr auf eine Teamleiterstelle zu bewerben.“"),
    short: t("Needs the certificate for a team-lead role", "Braucht das Zertifikat für eine Teamleiterstelle"),
    key: t("the certificate", "das Zertifikat"),
    clue: t("Is it something she wants to reach, or something that gets in her way?", "Ist es etwas, das sie erreichen will, oder etwas, das ihr im Weg steht?"),
    why: t("It is a reason in her life, a role she wants to reach: a goal.", "Es ist ein Grund in ihrem Leben, eine Rolle, die sie erreichen will: ein Ziel.") },
  { id: "n3", no: 3, where: t("Learner interview", "Lernenden-Interview"), area: "problem",
    text: t("“When I come back after three days, I do not know where I stopped.”", "„Wenn ich nach drei Tagen zurückkomme, weiß ich nicht, wo ich aufgehört habe.“"),
    short: t("After three days she does not know where she stopped", "Nach drei Tagen weiß sie nicht, wo sie aufgehört hat"),
    key: t("I do not know where I stopped", "weiß ich nicht, wo ich aufgehört habe"),
    clue: t("Is something going wrong for her in this sentence? In which situation?", "Geht in diesem Satz etwas für sie schief? In welcher Situation?"),
    why: t("A situation where something goes wrong: she loses her place. A problem.", "Eine Situation, in der etwas schiefgeht: Sie verliert ihre Stelle. Ein Problem.") },
  { id: "n4", no: 4, where: t("Usage data", "Nutzungsdaten"), area: "context",
    text: t("The median session lasts 14 minutes, and 71% of sessions start on a phone.", "Die mittlere Sitzung dauert 14 Minuten, und 71 % der Sitzungen beginnen auf einem Handy."),
    short: t("Median session 14 minutes, 71% on a phone", "Mittlere Sitzung 14 Minuten, 71 % auf dem Handy"),
    key: t("71% of sessions start on a phone", "71 % der Sitzungen beginnen auf einem Handy"),
    clue: t("What does the number describe: a wish, a trouble, or the way people use the platform?", "Was beschreibt die Zahl: einen Wunsch, eine Schwierigkeit oder die Art, wie Menschen die Plattform nutzen?"),
    why: t("It describes how long and on which device people use the platform: the context of use.", "Es beschreibt, wie lange und auf welchem Gerät Menschen die Plattform nutzen: der Nutzungskontext.") },
  { id: "n5", no: 5, where: t("Learner interview", "Lernenden-Interview"), area: "goal",
    text: t("“I want to use what I learn in my project next week.”", "„Ich will das Gelernte nächste Woche in meinem Projekt anwenden.“"),
    short: t("Wants to use it in her project next week", "Will es nächste Woche in ihrem Projekt anwenden"),
    key: t("use what I learn in my project", "das Gelernte nächste Woche in meinem Projekt anwenden"),
    clue: t("Is it a result she wants, or an obstacle?", "Ist es ein Ergebnis, das sie will, oder ein Hindernis?"),
    why: t("It is what she wants to be able to do: a goal tied to her work.", "Es ist das, was sie können will: ein Ziel, das an ihre Arbeit gebunden ist.") },
  { id: "n6", no: 6, where: t("Usage data", "Nutzungsdaten"), area: "problem",
    text: t("A lesson needs about 40 minutes in one sitting; it cannot be paused and resumed.", "Eine Lektion braucht etwa 40 Minuten am Stück; sie lässt sich nicht pausieren und fortsetzen."),
    short: t("A lesson needs 40 minutes in one sitting", "Eine Lektion braucht 40 Minuten am Stück"),
    key: t("cannot be paused and resumed", "lässt sich nicht pausieren und fortsetzen"),
    clue: t("Put it next to her 20 minutes. What happens when the two do not fit?", "Legen Sie es neben ihre 20 Minuten. Was passiert, wenn beides nicht zusammenpasst?"),
    why: t("A 40-minute lesson against 20 minutes of time: something gets in her way. A problem.", "Eine Lektion von 40 Minuten gegen 20 Minuten Zeit: Etwas steht ihr im Weg. Ein Problem.") },
  { id: "n7", no: 7, where: t("Learner interview", "Lernenden-Interview"), area: "problem",
    text: t("“The reminder email arrives at 08:00 when I am at work, so I ignore it.”", "„Die Erinnerungs-E-Mail kommt um 08:00 Uhr, wenn ich bei der Arbeit bin, also ignoriere ich sie.“"),
    short: t("The reminder arrives at 08:00, at work", "Die Erinnerung kommt um 08:00 Uhr, bei der Arbeit"),
    key: t("arrives at 08:00", "kommt um 08:00 Uhr"),
    clue: t("It mentions a time, but is it only describing when she studies, or is the timing the trouble?", "Es nennt eine Uhrzeit, aber beschreibt es nur, wann sie lernt, oder ist die Uhrzeit das Problem?"),
    why: t("The reminder comes when she cannot use it, so she ignores it: something goes wrong. A problem, even though it names a time.", "Die Erinnerung kommt, wenn sie sie nicht nutzen kann, also ignoriert sie sie: Etwas geht schief. Ein Problem, obwohl es eine Uhrzeit nennt.") },
  { id: "n8", no: 8, where: t("Learner interview", "Lernenden-Interview"), area: "context",
    text: t("“My employer pays, and my manager wants to see that I am making progress.”", "„Mein Arbeitgeber zahlt, und meine Chefin will sehen, dass ich vorankomme.“"),
    short: t("The employer pays and the manager wants to see progress", "Der Arbeitgeber zahlt und die Chefin will Fortschritt sehen"),
    key: t("My employer pays", "Mein Arbeitgeber zahlt"),
    clue: t("Does it say what she wants for herself, or why she is on the platform and who is watching?", "Sagt es, was sie für sich will, oder warum sie auf der Plattform ist und wer zusieht?"),
    why: t("It says why she is on the platform (the employer pays and checks): the motivation part of the context of use.", "Es sagt, warum sie auf der Plattform ist (der Arbeitgeber zahlt und prüft): der Motivationsteil des Nutzungskontexts.") },
];
export const NOTES = bi(NOTES_DEF);
export const NOTE_BY_ID = Object.fromEntries(NOTES.map((n) => [n.id, n])) as Record<NoteId, (typeof NOTES)[number]>;
export const NOTE_AREA: Record<NoteId, PersonaFieldId> = Object.fromEntries(NOTES_DEF.map((n) => [n.id, n.area])) as Record<NoteId, PersonaFieldId>;
export const TRUTH_SORT = NOTE_AREA;

/* ------------------------------------------------------------------ Block 1.2 (Optional) · a journey that ends in drop-out */

export type PhaseId1 = "entry" | "usage" | "drop";
export const PHASES_1: PhaseId1[] = ["entry", "usage", "drop"];
export const PHASE_LABEL_1 = bi({ entry: t("Entry", "Einstieg"), usage: t("Usage", "Nutzung"), drop: t("Drop-out point", "Abbruchpunkt") });
/** The model critical phase of the drop-out journey: where the emotion is lowest and the person stops. */
export const MODEL_CRITICAL: PhaseId1 = "usage";

/* ------------------------------------------------------------------ Block 1.3 (Optional) · coaching reflection */

export type ReflectKey = "a" | "b" | "c";
export const REFLECT = bi([
  { k: "a" as ReflectKey, q: t("Who are we really designing for?", "Für wen gestalten wir eigentlich?") },
  { k: "b" as ReflectKey, q: t("Which persona is strategically relevant?", "Welche Persona ist strategisch relevant?") },
  { k: "c" as ReflectKey, q: t("Where does the user get lost in the process?", "Wo verliert sich der Nutzer im Prozess?") },
]);

/* ------------------------------------------------------------------ Block 2.1 (Optional) · the teacher persona and two journeys */

export type TeacherNoteId = "t1" | "t2" | "t3" | "t4" | "t5" | "t6";
export const TEACHER_NOTES = bi([
  { id: "t1" as TeacherNoteId, no: "T1", where: t("Teacher interview", "Lehrenden-Interview"), text: t("“I build courses on Sunday evening at my desk; uploading one unit takes me about three hours.”", "„Ich baue Kurse am Sonntagabend an meinem Schreibtisch; eine Einheit hochzuladen dauert etwa drei Stunden.“") },
  { id: "t2" as TeacherNoteId, no: "T2", where: t("Teacher interview", "Lehrenden-Interview"), text: t("“The course editor has nine tabs. I use two of them.”", "„Der Kurseditor hat neun Reiter. Ich nutze zwei davon.“") },
  { id: "t3" as TeacherNoteId, no: "T3", where: t("Teacher interview", "Lehrenden-Interview"), text: t("“I cannot see which learners are stuck until they write to me.”", "„Ich sehe nicht, welche Lernenden feststecken, bis sie mir schreiben.“") },
  { id: "t4" as TeacherNoteId, no: "T4", where: t("Training manager", "Weiterbildungsleiterin"), text: t("“Only 31% of our licensed employees logged in last quarter.”", "„Nur 31 % unserer lizenzierten Mitarbeitenden haben sich im letzten Quartal angemeldet.“") },
  { id: "t5" as TeacherNoteId, no: "T5", where: t("Training manager", "Weiterbildungsleiterin"), text: t("“I receive a monthly export that I format by hand before I can show it to management.”", "„Ich bekomme einen monatlichen Export, den ich von Hand formatiere, bevor ich ihn der Geschäftsführung zeigen kann.“") },
  { id: "t6" as TeacherNoteId, no: "T6", where: t("Teacher interview", "Lehrenden-Interview"), text: t("“I want to reuse a unit in a second course, but I have to copy it and upload it again.”", "„Ich will eine Einheit in einem zweiten Kurs wiederverwenden, muss sie aber kopieren und neu hochladen.“") },
]);

export type PhaseIdL = "entry" | "learning" | "progress";
export const PHASES_L: PhaseIdL[] = ["entry", "learning", "progress"];
export const PHASE_LABEL_L = bi({ entry: t("Entry", "Einstieg"), learning: t("Learning", "Lernen"), progress: t("Progress and completion", "Fortschritt und Abschluss") });
export type PhaseIdT = "setup" | "run" | "review";
export const PHASES_T: PhaseIdT[] = ["setup", "run", "review"];
export const PHASE_LABEL_T = bi({ setup: t("Set up", "Einrichten"), run: t("Run", "Durchführen"), review: t("Review", "Auswerten") });

/* ------------------------------------------------------------------ Block 2.2 (Core) · nine measures, choose four */

export type MeasureId = "m1" | "m2" | "m3" | "m4" | "m5" | "m6" | "m7" | "m8" | "m9";
export const MEASURE_IDS: MeasureId[] = ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9"];
export type MeasureArea = "learners" | "teachers" | "both" | "orgs" | "everyone";
type MeasureDef = { id: MeasureId; no: string; name: Tx; what: Tx; notice: Tx; cost: number; weeks: number; area: MeasureArea };
const MEASURES_DEF: MeasureDef[] = [
  { id: "m1", no: "M1", cost: 16000, weeks: 6, area: "learners", name: t("Flexible learning formats", "Flexible Lernformate"),
    what: t("Five-minute units that work on a phone and can be paused.", "Fünf-Minuten-Einheiten, die auf dem Handy funktionieren und sich pausieren lassen."),
    notice: t("A lesson can be done in short pieces.", "Eine Lektion lässt sich in kurzen Stücken erledigen.") },
  { id: "m2", no: "M2", cost: 6000, weeks: 2, area: "learners", name: t("“Where I stopped”", "„Wo ich aufgehört habe“"),
    what: t("A resume button on every screen.", "Ein Fortsetzen-Button auf jedem Bildschirm."),
    notice: t("The learner returns to the exact place.", "Die Lernende kehrt an die genaue Stelle zurück.") },
  { id: "m3", no: "M3", cost: 14000, weeks: 5, area: "teachers", name: t("A simpler course editor", "Ein einfacherer Kurseditor"),
    what: t("Show the two key tabs; put the rest under “More”.", "Die zwei wichtigsten Reiter zeigen; den Rest unter „Mehr“ ablegen."),
    notice: t("The editor looks small.", "Der Editor wirkt klein.") },
  { id: "m4", no: "M4", cost: 12000, weeks: 4, area: "teachers", name: t("A view of stuck learners", "Eine Ansicht der festgefahrenen Lernenden"),
    what: t("A simple list of learners who stopped.", "Eine einfache Liste der Lernenden, die aufgehört haben."),
    notice: t("The teacher sees who needs help.", "Die Lehrende sieht, wer Hilfe braucht.") },
  { id: "m5", no: "M5", cost: 9000, weeks: 3, area: "teachers", name: t("Reusable units", "Wiederverwendbare Einheiten"),
    what: t("Copy a unit into a second course.", "Eine Einheit in einen zweiten Kurs kopieren."),
    notice: t("No second upload.", "Kein zweiter Upload.") },
  { id: "m6", no: "M6", cost: 11000, weeks: 4, area: "both", name: t("One clear course structure", "Eine klare Kursstruktur"),
    what: t("One outline with groups and order, visible to learners and teachers.", "Eine Gliederung mit Gruppen und Reihenfolge, sichtbar für Lernende und Lehrende."),
    notice: t("Both see the same path.", "Beide sehen denselben Weg.") },
  { id: "m7", no: "M7", cost: 7000, weeks: 3, area: "orgs", name: t("An automatic monthly report", "Ein automatischer Monatsbericht"),
    what: t("A formatted report to the training manager.", "Ein formatierter Bericht an die Weiterbildungsleiterin."),
    notice: t("No hand formatting.", "Kein Formatieren von Hand.") },
  { id: "m8", no: "M8", cost: 18000, weeks: 5, area: "everyone", name: t("Badges for all users", "Badges für alle Nutzer"),
    what: t("A badge system across the platform.", "Ein Badge-System auf der ganzen Plattform."),
    notice: t("Badges appear.", "Badges erscheinen.") },
  { id: "m9", no: "M9", cost: 25000, weeks: 6, area: "everyone", name: t("A new brand look", "Ein neuer Markenauftritt"),
    what: t("New colours, icons and fonts.", "Neue Farben, Icons und Schriften."),
    notice: t("The platform looks different.", "Die Plattform sieht anders aus.") },
];
export const MEASURES = bi(MEASURES_DEF);
export const MEASURE_BY_ID = Object.fromEntries(MEASURES.map((m) => [m.id, m])) as Record<MeasureId, (typeof MEASURES)[number]>;
export const MEASURE_AREA = bi({
  learners: t("For: Learners", "Für: Lernende"),
  teachers: t("For: Teachers", "Für: Lehrende"),
  both: t("For: Learners and teachers", "Für: Lernende und Lehrende"),
  orgs: t("For: Organisations", "Für: Organisationen"),
  everyone: t("For: Everyone", "Für: Alle"),
});

export const totalCost = (ids: string[]) => ids.reduce((s, id) => s + MEASURE_BY_ID[id as MeasureId].cost, 0);
export const longestWeeks = (ids: string[]) => ids.reduce((m, id) => Math.max(m, MEASURE_BY_ID[id as MeasureId].weeks), 0);

/**
 * The reference set covers the three groups of the brief: two learner measures (“Where I stopped” answers note 3, flexible formats answers note 6), one shared
 * measure (one clear course structure) and one for teachers (a view of stuck learners, answering T3). Together they cost €45,000, exactly the case's budget.
 */
export const MODEL_MEASURES: MeasureId[] = ["m2", "m1", "m6", "m4"];
export const MODEL_IMPACT: Record<string, 1 | 2 | 3> = { m1: 3, m2: 3, m6: 2, m4: 2 };
export const MODEL_RISK: Record<string, 1 | 2 | 3> = { m1: 2, m2: 1, m6: 1, m4: 1 };
/** The pain point each model measure answers: the persona and the phase (Block 2.2 asks for it). */
export const MODEL_PAIN: Record<string, string> = bi({
  m1: t("The learner, in the usage phase: a 40-minute lesson against 20 minutes of time (note 6).", "Die Lernende, in der Nutzungsphase: eine 40-Minuten-Lektion gegen 20 Minuten Zeit (Notiz 6)."),
  m2: t("The learner, when she returns after three days: she does not know where she stopped (note 3).", "Die Lernende, wenn sie nach drei Tagen zurückkehrt: Sie weiß nicht, wo sie aufgehört hat (Notiz 3)."),
  m6: t("Learner and teacher, in the learning and set-up phases: each sees a different path (T2, T3, note 3).", "Lernende und Lehrende, in der Lern- und Einrichtungsphase: Jede sieht einen anderen Weg (T2, T3, Notiz 3)."),
  m4: t("The teacher, in the run phase: she cannot see who is stuck until they write (T3).", "Die Lehrende, in der Durchführungsphase: Sie sieht nicht, wer feststeckt, bis sie schreiben (T3)."),
});
