import { bi, t } from "@/lib/lang";
import type { Tx } from "@/lib/lang";

/**
 * Day 2 · the case and the Route 1 instruments. LearnPro is a stagnating learning platform (plan, Level 2 case study).
 *
 * Facts from the plan (printed as facts): learners drop out of courses early, there is no personalisation, the content is rated "boring";
 * the goal is to improve the platform; three months, a limited budget, unclear user needs; three options for prototyping and testing
 * (develop a high-fidelity prototype immediately, test low-fidelity first, develop directly without testing). Everything else (the two
 * drawn platforms, €60,000, the costs and weeks of the options, approaches and tests) is a Case assumption, labelled so on screen.
 * The plan's Musterlösung: main problem lack of feedback and individualisation; low-fidelity tests first, learning paths and interaction,
 * adaptive elements only step by step. Rationale: minimise risk before maximising technology.
 */

export const BUDGET = 60000;
export const MONTHS = 3;
export const WEEKS_LIMIT = 12;
export const PICK_TESTS = 3;
export const PICK_WEAK = 3;

/** Effort follows the printed cost (a rule taught in Materi A5): under €10,000 Low, €10,000 to €25,000 Mid, above that High. */
export const EFFORT_LOW_MAX = 9999;
export const EFFORT_MID_MAX = 25000;
export const effortBand = (cost: number): 1 | 2 | 3 => (cost <= EFFORT_LOW_MAX ? 1 : cost <= EFFORT_MID_MAX ? 2 : 3);

/* ------------------------------------------------------------------ Block 1.1 · eight facts about Platform A and Platform B */

export type PracticeId = "path" | "units" | "feedback";
export const PRACTICE_IDS: PracticeId[] = ["path", "units", "feedback"];

/** The three practices of card A1 and the question each answers for a learner. */
export const PRACTICES = bi({
  path: { id: "path" as PracticeId, label: t("Learning path", "Lernpfad"), hint: t("What do I do next?", "Was tue ich als Nächstes?"), test: t("Does it show the steps in order and which one is next?", "Zeigt es die Schritte in der Reihenfolge und welcher als Nächstes kommt?") },
  units: { id: "units" as PracticeId, label: t("Short units", "Kurze Einheiten"), hint: t("Can I do this in the time I have?", "Schaffe ich das in der Zeit, die ich habe?"), test: t("Can a learner finish one unit in a few minutes, with one goal?", "Können Lernende eine Einheit in wenigen Minuten abschließen, mit einem Ziel?") },
  feedback: { id: "feedback" as PracticeId, label: t("Feedback", "Feedback"), hint: t("Am I getting somewhere, and did I get it right?", "Komme ich voran, und lag ich richtig?"), test: t("Does it show how far along the learner is, or give a result after a task?", "Zeigt es, wie weit die Lernenden sind, oder gibt es nach einer Aufgabe ein Ergebnis?") },
});
export const PRACTICE_LABEL = (id: PracticeId) => PRACTICES[id].label;

export type FactId = "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8";
export const FACT_IDS: FactId[] = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"];

type FactDef = { id: FactId; no: number; platform: "A" | "B"; where: Tx; text: Tx; short: Tx; key: Tx; clue: Tx; why: Tx; practice: PracticeId };

const FACTS_DEF: FactDef[] = [
  { id: "f1", no: 1, platform: "A", where: t("Platform A", "Plattform A"), practice: "path",
    text: t("The course page shows a path of six steps and marks the current one.", "Die Kursseite zeigt einen Pfad aus sechs Schritten und markiert den aktuellen."),
    short: t("A: a path of six steps, current step marked", "A: ein Pfad aus sechs Schritten, aktueller Schritt markiert"),
    key: t("a path of six steps", "einen Pfad aus sechs Schritten"),
    clue: t("A learner finishes a step. What on this screen tells them which step comes next?", "Eine Lernende schließt einen Schritt ab. Was auf diesem Bildschirm sagt ihr, welcher Schritt als Nächstes kommt?"),
    why: t("It shows the steps in order and which one is next: a learning path.", "Es zeigt die Schritte in der Reihenfolge und welcher als Nächstes kommt: ein Lernpfad.") },
  { id: "f2", no: 2, platform: "A", where: t("Platform A", "Plattform A"), practice: "feedback",
    text: t("A progress bar and the text “Step 2 of 6” sit at the top.", "Oben stehen eine Fortschrittsleiste und der Text „Schritt 2 von 6“."),
    short: t("A: progress bar and “Step 2 of 6”", "A: Fortschrittsleiste und „Schritt 2 von 6“"),
    key: t("A progress bar", "eine Fortschrittsleiste"),
    clue: t("You are in the middle of a course. Does this tell you what to do next, or how far you have come?", "Sie sind mitten in einem Kurs. Sagt Ihnen das, was Sie als Nächstes tun sollen, oder wie weit Sie gekommen sind?"),
    why: t("It shows how far along the learner is: feedback on progress.", "Es zeigt, wie weit die Lernenden sind: Feedback zum Fortschritt.") },
  { id: "f3", no: 3, platform: "A", where: t("Platform A", "Plattform A"), practice: "units",
    text: t("Each learning unit says “6 min” and has one goal.", "Jede Lerneinheit nennt „6 Min.“ und hat ein Ziel."),
    short: t("A: each unit “6 min” with one goal", "A: jede Einheit „6 Min.“ mit einem Ziel"),
    key: t("has one goal", "hat ein Ziel"),
    clue: t("A learner has ten minutes on the train. Can they finish something here, and do they know what it is?", "Eine Lernende hat zehn Minuten im Zug. Kann sie hier etwas abschließen, und weiß sie, was es ist?"),
    why: t("It lets the learner finish one unit in a few minutes: short units.", "Es lässt die Lernenden eine Einheit in wenigen Minuten abschließen: kurze Einheiten.") },
  { id: "f4", no: 4, platform: "A", where: t("Platform A", "Plattform A"), practice: "feedback",
    text: t("After a quiz the screen says “4 of 5 correct” and names the question to review.", "Nach einem Quiz steht auf dem Bildschirm „4 von 5 richtig“, und die zu wiederholende Frage wird genannt."),
    short: t("A: “4 of 5 correct”, question to review", "A: „4 von 5 richtig“, Frage zum Wiederholen"),
    key: t("“4 of 5 correct”", "„4 von 5 richtig“"),
    clue: t("You have just answered five questions. What does the screen tell you about how you did?", "Sie haben gerade fünf Fragen beantwortet. Was sagt Ihnen der Bildschirm darüber, wie es lief?"),
    why: t("It gives a result after a task: feedback.", "Es gibt nach einer Aufgabe ein Ergebnis: Feedback.") },
  { id: "f5", no: 5, platform: "B", where: t("Platform B", "Plattform B"), practice: "units",
    text: t("The course is one long page of about 40 minutes of reading.", "Der Kurs ist eine lange Seite mit etwa 40 Minuten Lesestoff."),
    short: t("B: one long page, about 40 minutes", "B: eine lange Seite, etwa 40 Minuten"),
    key: t("one long page of about 40 minutes", "eine lange Seite mit etwa 40 Minuten"),
    clue: t("A learner has ten minutes. Can they finish anything on this page, and where would they stop?", "Eine Lernende hat zehn Minuten. Kann sie auf dieser Seite etwas abschließen, und wo würde sie aufhören?"),
    why: t("There is no unit a learner can finish in a few minutes: short units are missing.", "Es gibt keine Einheit, die Lernende in wenigen Minuten abschließen können: kurze Einheiten fehlen.") },
  { id: "f6", no: 6, platform: "B", where: t("Platform B", "Plattform B"), practice: "path",
    text: t("There is no menu or list of the parts of the course; the only way on is to scroll.", "Es gibt kein Menü und keine Liste der Teile des Kurses; weiter kommt man nur durch Scrollen."),
    short: t("B: no menu, the only way on is to scroll", "B: kein Menü, weiter kommt man nur durch Scrollen"),
    key: t("the only way on is to scroll", "weiter kommt man nur durch Scrollen"),
    clue: t("A learner wants to jump to the part about quizzes. What can they do here, and can they see the steps?", "Eine Lernende will zum Teil über Quizze springen. Was kann sie hier tun, und kann sie die Schritte sehen?"),
    why: t("The steps and their order are not shown: the learning path is missing.", "Die Schritte und ihre Reihenfolge werden nicht gezeigt: der Lernpfad fehlt.") },
  { id: "f7", no: 7, platform: "B", where: t("Platform B", "Plattform B"), practice: "feedback",
    text: t("There is no sign of how far along the learner is.", "Es gibt kein Zeichen dafür, wie weit die Lernenden sind."),
    short: t("B: no sign of how far along", "B: kein Zeichen, wie weit man ist"),
    key: t("no sign of how far along", "kein Zeichen dafür, wie weit"),
    clue: t("You have scrolled for ten minutes. How would you know whether you are nearly done or only at the start?", "Sie scrollen seit zehn Minuten. Woran würden Sie erkennen, ob Sie fast fertig oder erst am Anfang sind?"),
    why: t("The learner cannot see how far they have come: feedback on progress is missing.", "Die Lernenden sehen nicht, wie weit sie gekommen sind: Feedback zum Fortschritt fehlt.") },
  { id: "f8", no: 8, platform: "B", where: t("Platform B", "Plattform B"), practice: "feedback",
    text: t("After the last page the learner is returned to the course list without any message.", "Nach der letzten Seite werden die Lernenden ohne jede Meldung zur Kursliste zurückgeführt."),
    short: t("B: no message after the last page", "B: keine Meldung nach der letzten Seite"),
    key: t("without any message", "ohne jede Meldung"),
    clue: t("You have just finished the course. What does the screen tell you about what you achieved?", "Sie haben gerade den Kurs beendet. Was sagt Ihnen der Bildschirm darüber, was Sie erreicht haben?"),
    why: t("No sign of success after the effort: feedback is missing.", "Kein Zeichen von Erfolg nach der Mühe: Feedback fehlt.") },
];
export const FACTS = bi(FACTS_DEF);
export const FACT_BY_ID = Object.fromEntries(FACTS.map((f) => [f.id, f])) as Record<FactId, (typeof FACTS)[number]>;
export const FACT_PRACTICE: Record<FactId, PracticeId> = Object.fromEntries(FACTS_DEF.map((f) => [f.id, f.practice])) as Record<FactId, PracticeId>;
export const TRUTH_SORT = FACT_PRACTICE;

export type PlatformId = "A" | "B";
export const PLATFORMS = bi([
  { id: "A" as PlatformId, label: t("Platform A (a benchmark)", "Plattform A (ein Benchmark)") },
  { id: "B" as PlatformId, label: t("Platform B (LearnPro today)", "Plattform B (LearnPro heute)") },
]);
export const MODEL_PLATFORM: PlatformId = "A";

/* ------------------------------------------------------------------ Block 1.2 (Optional) · three options under time pressure */

export type OptId = "A" | "B" | "C";
export const OPT_IDS: OptId[] = ["A", "B", "C"];
type OptDef = { id: OptId; name: Tx; cost: number; weeks: number };
const OPTS_DEF: OptDef[] = [
  { id: "A", cost: 22000, weeks: 6, name: t("Develop a high-fidelity prototype of the core flows immediately", "Sofort einen High-Fidelity-Prototyp der Kernabläufe entwickeln") },
  { id: "B", cost: 6500, weeks: 2, name: t("Test low-fidelity first", "Zuerst Low-Fidelity testen") },
  { id: "C", cost: 48000, weeks: 11, name: t("Develop directly without testing", "Direkt entwickeln, ohne zu testen") },
];
export const OPTS = bi(OPTS_DEF);
export const OPT_BY_ID = Object.fromEntries(OPTS.map((o) => [o.id, o])) as Record<OptId, (typeof OPTS)[number]>;
export const MODEL_OPT: OptId = "B";
export const MODEL_OPT_BENEFIT: Record<string, 1 | 2 | 3> = { A: 2, B: 3, C: 1 };
export const MODEL_OPT_RISK: Record<string, 1 | 2 | 3> = { A: 2, B: 1, C: 3 };

export type RiskTickId = "k1" | "k2" | "k3" | "k4" | "k5";
export const RISK_TICK_IDS: RiskTickId[] = ["k1", "k2", "k3", "k4", "k5"];
export const RISK_TICKS = bi([
  { id: "k1" as RiskTickId, text: t("We build the wrong thing.", "Wir bauen das Falsche.") },
  { id: "k2" as RiskTickId, text: t("We find out late, when change is expensive.", "Wir erfahren es spät, wenn Änderungen teuer sind.") },
  { id: "k3" as RiskTickId, text: t("The budget is spent on rework.", "Das Budget fließt in Nacharbeit.") },
  { id: "k4" as RiskTickId, text: t("Learners leave before we know why.", "Lernende gehen, bevor wir wissen, warum.") },
  { id: "k5" as RiskTickId, text: t("A competitor ships a better version while we rework.", "Ein Wettbewerber bringt eine bessere Version heraus, während wir nacharbeiten.") },
]);
export const MODEL_RISK_TICKS: RiskTickId[] = ["k1", "k2", "k4"];

/* ------------------------------------------------------------------ Block 1.3 (Optional) · coaching reflection */

export type ReflectKey = "a" | "b" | "c";
export const REFLECT = bi([
  { k: "a" as ReflectKey, q: t("What happens if we do not test?", "Was passiert, wenn wir nicht testen?") },
  { k: "b" as ReflectKey, q: t("Which decision costs the most later on?", "Welche Entscheidung kostet später am meisten?") },
  { k: "c" as ReflectKey, q: t("When does technology make sense, and when is it over-engineering?", "Wann ist Technologie sinnvoll, und wann ist es Over-Engineering?") },
]);

/* ------------------------------------------------------------------ Block 2.1 (Optional) · three main weaknesses */

export type WeakId = "w1" | "w2" | "w3" | "w4" | "w5" | "w6";
export const WEAK_IDS: WeakId[] = ["w1", "w2", "w3", "w4", "w5", "w6"];
type WeakDef = { id: WeakId; text: Tx; expected: boolean; why: Tx };
const WEAK_DEF: WeakDef[] = [
  { id: "w1", expected: true, text: t("Learners get no feedback on what they do or how far they have come.", "Lernende bekommen kein Feedback darauf, was sie tun oder wie weit sie gekommen sind."), why: t("Facts 7 and 8 show it: no sign of progress, no message after the last page.", "Die Fakten 7 und 8 zeigen es: kein Zeichen für den Fortschritt, keine Meldung nach der letzten Seite.") },
  { id: "w2", expected: true, text: t("Every learner gets the same path and the same content, whatever they already know.", "Alle Lernenden bekommen denselben Pfad und denselben Inhalt, was auch immer sie schon wissen."), why: t("The case names it: “no personalisation”.", "Der Fall nennt es: „keine Personalisierung“.") },
  { id: "w3", expected: true, text: t("The content is long and passive, with little to do.", "Der Inhalt ist lang und passiv, mit wenig zu tun."), why: t("The case says the content is rated “boring”, and fact 5 shows one long page of about 40 minutes of reading.", "Der Fall sagt, der Inhalt werde als „langweilig“ bewertet, und Fakt 5 zeigt eine lange Seite mit etwa 40 Minuten Lesestoff.") },
  { id: "w4", expected: false, text: t("The visual style of the platform looks dated.", "Der visuelle Stil der Plattform wirkt veraltet."), why: t("No printed fact says so; it is about the surface, not the experience.", "Kein gedruckter Fakt sagt das; es geht um die Oberfläche, nicht um das Erlebnis.") },
  { id: "w5", expected: false, text: t("The course catalogue is too small.", "Der Kurskatalog ist zu klein."), why: t("Nothing in the case says learners leave for lack of courses.", "Nichts im Fall sagt, dass Lernende gehen, weil es zu wenige Kurse gibt.") },
  { id: "w6", expected: false, text: t("The subscription price is too high.", "Der Preis des Abonnements ist zu hoch."), why: t("The case mentions no price complaint.", "Der Fall erwähnt keine Beschwerde über den Preis.") },
];
export const WEAKS = bi(WEAK_DEF);
export const WEAK_MODEL: WeakId[] = ["w1", "w2", "w3"];

/* ------------------------------------------------------------------ Block 2.2 (Core) · prototype approach, three UX tests, the adaptive decision */

export type ApproachId = "p1" | "p2" | "p3" | "p4" | "p5";
export const APPROACH_IDS: ApproachId[] = ["p1", "p2", "p3", "p4", "p5"];
type ApproachDef = { id: ApproachId; no: string; what: Tx; cost: number; weeks: number };
const APPROACH_DEF: ApproachDef[] = [
  { id: "p1", no: "P1", cost: 5000, weeks: 2, what: t("Paper sketches of the course start and the learning path; test with five learners; then a clickable low-fidelity version", "Papierskizzen von Kursstart und Lernpfad; Test mit fünf Lernenden; danach eine klickbare Low-Fidelity-Version") },
  { id: "p2", no: "P2", cost: 14000, weeks: 5, what: t("A clickable low-fidelity prototype of the whole course flow (start, unit, quiz, end); test; refine", "Ein klickbarer Low-Fidelity-Prototyp des ganzen Kursablaufs (Start, Einheit, Quiz, Ende); testen; verfeinern") },
  { id: "p3", no: "P3", cost: 36000, weeks: 8, what: t("A high-fidelity prototype of the whole platform with the final look", "Ein High-Fidelity-Prototyp der ganzen Plattform mit dem endgültigen Aussehen") },
  { id: "p4", no: "P4", cost: 72000, weeks: 14, what: t("Build the adaptive engine first and test it on the real platform", "Zuerst die adaptive Engine bauen und auf der echten Plattform testen") },
  { id: "p5", no: "P5", cost: 54000, weeks: 12, what: t("Build the redesign directly and test after launch", "Das Redesign direkt bauen und nach dem Start testen") },
];
export const APPROACHES = bi(APPROACH_DEF);
export const APPROACH_BY_ID = Object.fromEntries(APPROACHES.map((p) => [p.id, p])) as Record<ApproachId, (typeof APPROACHES)[number]>;
export const MODEL_APPROACH: ApproachId = "p2";

export type TestId = "t1" | "t2" | "t3" | "t4" | "t5" | "t6" | "t7";
export const TEST_IDS: TestId[] = ["t1", "t2", "t3", "t4", "t5", "t6", "t7"];
export type TestKind = "qual" | "quant" | "both";
type TestDef = { id: TestId; no: string; name: Tx; answers: Tx; cost: number; weeks: number; kind: TestKind };
const TEST_DEF: TestDef[] = [
  { id: "t1", no: "T1", cost: 3000, weeks: 1, kind: "qual", name: t("Paper-prototype test with 5 learners, task-based", "Papier-Prototyp-Test mit 5 Lernenden, aufgabenbasiert"), answers: t("Can learners find the next step? Why not?", "Finden Lernende den nächsten Schritt? Warum nicht?") },
  { id: "t2", no: "T2", cost: 6000, weeks: 2, kind: "qual", name: t("Clickable low-fidelity test with 5 learners, think-aloud", "Klickbarer Low-Fidelity-Test mit 5 Lernenden, Think-aloud"), answers: t("Do learners complete a whole flow? Where do they hesitate?", "Schließen Lernende einen ganzen Ablauf ab? Wo zögern sie?") },
  { id: "t3", no: "T3", cost: 9000, weeks: 3, kind: "quant", name: t("Unmoderated remote test with 30 learners", "Unmoderierter Remote-Test mit 30 Lernenden"), answers: t("How many complete the task, and how fast?", "Wie viele schließen die Aufgabe ab, und wie schnell?") },
  { id: "t4", no: "T4", cost: 12000, weeks: 6, kind: "quant", name: t("A/B test of two course-start screens on live traffic", "A/B-Test zweier Kursstart-Bildschirme mit Live-Traffic"), answers: t("Which version raises the share who finish lesson 1? Needs enough learners.", "Welche Version erhöht den Anteil, der Lektion 1 abschließt? Braucht genug Lernende.") },
  { id: "t5", no: "T5", cost: 4000, weeks: 2, kind: "quant", name: t("Drop-out analysis per lesson from existing logs", "Abbruchanalyse pro Lektion aus vorhandenen Logs"), answers: t("Where do learners leave? It shows where, not why.", "Wo gehen Lernende? Es zeigt, wo, nicht warum.") },
  { id: "t6", no: "T6", cost: 5000, weeks: 2, kind: "qual", name: t("Interviews with 8 learners who left", "Interviews mit 8 Lernenden, die gegangen sind"), answers: t("Why did they leave?", "Warum sind sie gegangen?") },
  { id: "t7", no: "T7", cost: 30000, weeks: 8, kind: "both", name: t("Usability test of the full high-fidelity redesign", "Usability-Test des gesamten High-Fidelity-Redesigns"), answers: t("Does the finished design work in detail?", "Funktioniert das fertige Design im Detail?") },
];
export const TESTS = bi(TEST_DEF);
export const TEST_BY_ID = Object.fromEntries(TESTS.map((x) => [x.id, x])) as Record<TestId, (typeof TESTS)[number]>;
export const TEST_KIND = bi({
  qual: t("Qualitative: says why", "Qualitativ: sagt, warum"),
  quant: t("Quantitative: says how many", "Quantitativ: sagt, wie viele"),
  both: t("Qualitative and quantitative", "Qualitativ und quantitativ"),
});
export const MODEL_TESTS: TestId[] = ["t2", "t5", "t6"];

export type Verdict = "yes" | "partly" | "no";
export const VERDICTS = bi([
  { id: "yes" as Verdict, label: t("Yes", "Ja") },
  { id: "partly" as Verdict, label: t("Partly", "Teilweise") },
  { id: "no" as Verdict, label: t("No", "Nein") },
]);
export const MODEL_ADAPTIVE: Verdict = "partly";

export const planCost = (approach: ApproachId | null, tests: TestId[]) => (approach ? APPROACH_BY_ID[approach].cost : 0) + tests.reduce((s, id) => s + TEST_BY_ID[id].cost, 0);
export const planWeeks = (approach: ApproachId | null, tests: TestId[]) => Math.max(approach ? APPROACH_BY_ID[approach].weeks : 0, ...tests.map((id) => TEST_BY_ID[id].weeks), 0);
