import { bi, t } from "@/lib/lang";
import type { Tx } from "@/lib/lang";

/**
 * Day 5 · the case and the Route 1 instruments. LearnBase is a feature-heavy learning platform without user focus (plan, Level 2 case study).
 *
 * Facts from the plan (printed as facts): many functions but low usage; learners cannot find content; high frustration; system logic instead of user logic;
 * no clear user guidance; unclear navigation; a limited budget; falling satisfaction; management demands growth. Everything else (the screens, the numbers on
 * them, the €40,000, the 13 weeks, the costs and weeks of the measures) is a Case assumption, labelled so on screen. The plan's Musterlösung: main problem lack
 * of user-centredness; measures clear navigation, reduction of complexity, focus on core tasks, better structuring; rationale: understanding users beats the
 * number of features.
 */

export const BUDGET = 40000;
export const WEEKS_LIMIT = 13;
export const PICK_MEASURES = 4;
export const PICK_CAUSES = 4;

/** Effort follows the printed cost (a rule taught in Materi A5): under €10,000 Low, €10,000 to €20,000 Mid, above that High. */
export const EFFORT_LOW_MAX = 9999;
export const EFFORT_MID_MAX = 20000;
export const effortBand = (cost: number): 1 | 2 | 3 => (cost <= EFFORT_LOW_MAX ? 1 : cost <= EFFORT_MID_MAX ? 2 : 3);
export const EFFORT_RULE = () => ({ en: "under €10,000, up to €20,000, above", de: "unter 10.000 €, bis 20.000 €, darüber" });

/* ------------------------------------------------------------------ Block 1.1 · eight facts about LearnBase */

export type MistakeId = "functions" | "complex" | "orientation";
export const MISTAKE_IDS: MistakeId[] = ["functions", "complex", "orientation"];

/** The three mistakes of Materi A3, with the test question taught there for each. */
export const MISTAKES = bi({
  functions: { id: "functions" as MistakeId, label: t("Functions instead of benefits", "Funktionen statt Nutzen"), hint: t("The screen speaks in the software's terms", "Der Bildschirm spricht in den Begriffen der Software"), test: t("Does the screen name things after the software, or show what the learner can do?", "Benennt der Bildschirm Dinge nach der Software, oder zeigt er, was die Lernende tun kann?") },
  complex: { id: "complex" as MistakeId, label: t("Overly complex", "Übermäßig komplex"), hint: t("Too many choices or elements at once", "Zu viele Auswahlmöglichkeiten oder Elemente auf einmal"), test: t("Must the learner choose from many things before they can act?", "Muss die Lernende aus vielen Dingen wählen, bevor sie handeln kann?") },
  orientation: { id: "orientation" as MistakeId, label: t("Missing orientation", "Fehlende Orientierung"), hint: t("The learner cannot tell where they are or what next", "Die Lernende erkennt nicht, wo sie ist oder was als Nächstes kommt"), test: t("Can the learner tell where they are, where something is, and what to do next?", "Kann die Lernende erkennen, wo sie ist, wo etwas liegt und was als Nächstes zu tun ist?") },
});
export const MISTAKE_LABEL = (id: MistakeId) => MISTAKES[id].label;

export type FactId = "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8";
export const FACT_IDS: FactId[] = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"];

type FactDef = { id: FactId; no: number; where: Tx; text: Tx; short: Tx; key: Tx; clue: Tx; why: Tx; area: MistakeId };

const FACTS_DEF: FactDef[] = [
  { id: "f1", no: 1, where: t("Home", "Startseite"), area: "functions",
    text: t("The menu has entries named after software modules: “Content Repository”, “Module Manager”, “Analytics Suite”.", "Das Menü hat Einträge, die nach Softwaremodulen benannt sind: „Content Repository“, „Module Manager“, „Analytics Suite“."),
    short: t("Menu entries named after software modules", "Menüeinträge nach Softwaremodulen benannt"),
    key: t("named after software modules", "nach Softwaremodulen benannt"),
    clue: t("A learner wants to carry on with a course. Which menu entry names that task?", "Eine Lernende will einen Kurs fortsetzen. Welcher Menüeintrag nennt diese Aufgabe?"),
    why: t("The menu speaks in the software's terms, not in what the learner wants to do: functions instead of benefits.", "Das Menü spricht in den Begriffen der Software, nicht in dem, was die Lernende tun will: Funktionen statt Nutzen.") },
  { id: "f2", no: 2, where: t("Course page", "Kursseite"), area: "functions",
    text: t("The button to start a course says “Enrol in module instance”.", "Der Button zum Starten eines Kurses sagt „In Modulinstanz einschreiben“."),
    short: t("Button “Enrol in module instance”", "Button „In Modulinstanz einschreiben“"),
    key: t("“Enrol in module instance”", "„In Modulinstanz einschreiben“"),
    clue: t("Say the same button the way the learner would: what do they want to do?", "Sagen Sie denselben Button so, wie die Lernende ihn sagen würde: Was will sie tun?"),
    why: t("The label names a system object, not the learner's action: functions instead of benefits.", "Die Beschriftung nennt ein Systemobjekt, nicht die Handlung der Lernenden: Funktionen statt Nutzen.") },
  { id: "f3", no: 3, where: t("Home", "Startseite"), area: "complex",
    text: t("The home screen shows 22 menu entries, 9 widgets and 4 banners at the same time.", "Der Startbildschirm zeigt 22 Menüeinträge, 9 Widgets und 4 Banner gleichzeitig."),
    short: t("22 entries, 9 widgets and 4 banners at once", "22 Einträge, 9 Widgets und 4 Banner auf einmal"),
    key: t("22 menu entries, 9 widgets and 4 banners", "22 Menüeinträge, 9 Widgets und 4 Banner"),
    clue: t("Before the learner can act, how many things must they sort through?", "Wie viele Dinge muss die Lernende durchsehen, bevor sie handeln kann?"),
    why: t("Many choices at once before any action: overly complex.", "Viele Auswahlmöglichkeiten auf einmal vor jeder Handlung: übermäßig komplex.") },
  { id: "f4", no: 4, where: t("Course search", "Kurssuche"), area: "complex",
    text: t("The course search shows 14 filter fields before it shows any result.", "Die Kurssuche zeigt 14 Filterfelder, bevor sie ein Ergebnis zeigt."),
    short: t("14 filters before any result", "14 Filter vor jedem Ergebnis"),
    key: t("14 filter fields before it shows any result", "14 Filterfelder, bevor sie ein Ergebnis zeigt"),
    clue: t("What must the learner decide before they see a single course?", "Was muss die Lernende entscheiden, bevor sie einen einzigen Kurs sieht?"),
    why: t("Fourteen decisions before a result: overly complex.", "Vierzehn Entscheidungen vor einem Ergebnis: übermäßig komplex.") },
  { id: "f5", no: 5, where: t("Three lists", "Drei Listen"), area: "orientation",
    text: t("The same lesson appears in three lists (Library, Catalogue, My Learning), each in a different order.", "Dieselbe Lektion erscheint in drei Listen (Bibliothek, Katalog, Mein Lernen), jeweils in anderer Reihenfolge."),
    short: t("The same lesson in three lists, three orders", "Dieselbe Lektion in drei Listen, drei Reihenfolgen"),
    key: t("three lists (Library, Catalogue, My Learning)", "drei Listen (Bibliothek, Katalog, Mein Lernen)"),
    clue: t("Where is the lesson, really? How would a learner know which list to trust?", "Wo liegt die Lektion wirklich? Woran erkennt eine Lernende, welcher Liste sie trauen kann?"),
    why: t("The learner cannot tell where the lesson is or which list counts: missing orientation.", "Die Lernende erkennt nicht, wo die Lektion liegt oder welche Liste zählt: fehlende Orientierung.") },
  { id: "f6", no: 6, where: t("Home", "Startseite"), area: "orientation",
    text: t("The home screen has no “Continue where you stopped”; the learner must reopen the course list.", "Der Startbildschirm hat kein „Dort weitermachen, wo Sie aufgehört haben“; die Lernende muss die Kursliste wieder öffnen."),
    short: t("No “Continue where you stopped”", "Kein „Dort weitermachen, wo Sie aufgehört haben“"),
    key: t("no “Continue where you stopped”", "kein „Dort weitermachen, wo Sie aufgehört haben“"),
    clue: t("Mia comes back after three days. What on this screen tells her what to do next?", "Mia kommt nach drei Tagen zurück. Was auf diesem Bildschirm sagt ihr, was sie als Nächstes tun soll?"),
    why: t("Nothing tells the learner what to do next: missing orientation.", "Nichts sagt der Lernenden, was sie als Nächstes tun soll: fehlende Orientierung.") },
  { id: "f7", no: 7, where: t("Home", "Startseite"), area: "functions",
    text: t("A feature called “Learning Social Feed” was added last year; 2% of learners opened it in the last month.", "Ein Feature namens „Learning Social Feed“ wurde letztes Jahr hinzugefügt; 2 % der Lernenden haben es im letzten Monat geöffnet."),
    short: t("A feature added last year, opened by 2%", "Ein Feature vom letzten Jahr, von 2 % geöffnet"),
    key: t("opened it in the last month", "haben es im letzten Monat geöffnet"),
    clue: t("Which learner task does this feature serve? Who asked for it?", "Welcher Aufgabe der Lernenden dient dieses Feature? Wer hat es verlangt?"),
    why: t("A feature added because the software could do it, not for a learner task: functions instead of benefits.", "Ein Feature, das hinzukam, weil die Software es konnte, nicht für eine Aufgabe der Lernenden: Funktionen statt Nutzen.") },
  { id: "f8", no: 8, where: t("Course page", "Kursseite"), area: "orientation",
    text: t("The page title and the path above it both read “Home” (“Home > Home”) on every page.", "Der Seitentitel und der Pfad darüber lauten beide „Start“ („Start > Start“) auf jeder Seite."),
    short: t("Title and path both read “Home”", "Titel und Pfad lauten beide „Start“"),
    key: t("both read “Home”", "lauten beide „Start“"),
    clue: t("Where am I? What do the title and the path tell the learner about it?", "Wo bin ich? Was sagen Titel und Pfad der Lernenden darüber?"),
    why: t("The learner cannot tell where they are: missing orientation.", "Die Lernende erkennt nicht, wo sie ist: fehlende Orientierung.") },
];
export const FACTS = bi(FACTS_DEF);
export const FACT_BY_ID = Object.fromEntries(FACTS.map((f) => [f.id, f])) as Record<FactId, (typeof FACTS)[number]>;
export const FACT_AREA: Record<FactId, MistakeId> = Object.fromEntries(FACTS_DEF.map((f) => [f.id, f.area])) as Record<FactId, MistakeId>;
export const TRUTH_SORT = FACT_AREA;

/* ------------------------------------------------------------------ Block 1.2 (Optional) · user-centredness against business goals */

export type OptId = "A" | "B" | "C";
export const OPT_IDS: OptId[] = ["A", "B", "C"];
type OptDef = { id: OptId; name: Tx; cost: number; weeks: number };
const OPTS_DEF: OptDef[] = [
  { id: "A", cost: 30000, weeks: 8, name: t("Add more content (a business goal)", "Mehr Inhalt hinzufügen (ein Geschäftsziel)") },
  { id: "B", cost: 11000, weeks: 4, name: t("Simplify the navigation (a UX goal)", "Die Navigation vereinfachen (ein UX-Ziel)") },
  { id: "C", cost: 28000, weeks: 10, name: t("Develop new features (a marketing goal)", "Neue Features entwickeln (ein Marketingziel)") },
];
export const OPTS = bi(OPTS_DEF);
export const OPT_BY_ID = Object.fromEntries(OPTS.map((o) => [o.id, o])) as Record<OptId, (typeof OPTS)[number]>;
/** User value, business value, risk (the second criterion is a judgement here, not the effort rule). */
export const MODEL_OPT_IMPACT: Record<string, 1 | 2 | 3> = { A: 1, B: 3, C: 1 };
export const MODEL_OPT_BUSINESS: Record<string, 1 | 2 | 3> = { A: 2, B: 3, C: 2 };
export const MODEL_OPT_RISK: Record<string, 1 | 2 | 3> = { A: 2, B: 1, C: 3 };
export const MODEL_OPT_ORDER: OptId[] = ["B", "A", "C"];

/* ------------------------------------------------------------------ Block 1.3 (Optional) · coaching reflection */

export type ReflectKey = "a" | "b" | "c";
export const REFLECT = bi([
  { k: "a" as ReflectKey, q: t("Which decision ignores the user?", "Welche Entscheidung ignoriert die Nutzer?") },
  { k: "b" as ReflectKey, q: t("When does business logic harm UX?", "Wann schadet Geschäftslogik dem UX?") },
  { k: "c" as ReflectKey, q: t("How do you argue in a user-centred way toward management?", "Wie argumentieren Sie nutzerzentriert gegenüber dem Management?") },
]);

/* ------------------------------------------------------------------ Block 2.1 (Optional) · four central user problems and their causes */

export type ProblemId = "p1" | "p2" | "p3" | "p4" | "p5" | "p6" | "p7";
export const PROBLEM_IDS: ProblemId[] = ["p1", "p2", "p3", "p4", "p5", "p6", "p7"];
type ProblemDef = { id: ProblemId; text: Tx; expected: boolean; why: Tx; error?: Tx };
const PROBLEMS_DEF: ProblemDef[] = [
  { id: "p1", expected: true, text: t("Learners cannot find the content they need.", "Lernende finden den Inhalt nicht, den sie brauchen."), why: t("The case names it, and facts 4, 5 and 6 show why.", "Der Fall nennt es, und die Fakten 4, 5 und 6 zeigen, warum."), error: t("Facts 4 and 5: 14 filters and three lists mean no single clear place to look.", "Fakten 4 und 5: 14 Filter und drei Listen bedeuten keinen einzigen klaren Ort zum Suchen.") },
  { id: "p2", expected: true, text: t("Learners do not understand what the buttons and menu entries mean.", "Lernende verstehen nicht, was die Buttons und Menüeinträge bedeuten."), why: t("Facts 1 and 2 show labels in the software's words.", "Die Fakten 1 und 2 zeigen Beschriftungen in den Worten der Software."), error: t("Facts 1 and 2: labels name the software, not the learner's task.", "Fakten 1 und 2: Beschriftungen nennen die Software, nicht die Aufgabe der Lernenden.") },
  { id: "p3", expected: true, text: t("Learners are overwhelmed by the number of options at once.", "Lernende sind von der Zahl der Optionen auf einmal überwältigt."), why: t("Fact 3 and fact 4 show many choices before any action.", "Fakt 3 und Fakt 4 zeigen viele Auswahlmöglichkeiten vor jeder Handlung."), error: t("Facts 3 and 4: 22 entries, 9 widgets, 4 banners and 14 filters at once.", "Fakten 3 und 4: 22 Einträge, 9 Widgets, 4 Banner und 14 Filter auf einmal.") },
  { id: "p4", expected: true, text: t("Learners do not know what to do next.", "Lernende wissen nicht, was sie als Nächstes tun sollen."), why: t("Facts 6 and 8 show no “continue” and no sign of where they are.", "Die Fakten 6 und 8 zeigen kein „Weiter“ und kein Zeichen, wo sie sind."), error: t("Facts 6 and 8: no “Continue where you stopped”, and title and path both read “Home”.", "Fakten 6 und 8: kein „Dort weitermachen, wo Sie aufgehört haben“, und Titel und Pfad lauten beide „Start“.") },
  { id: "p5", expected: false, text: t("Learners want more social features.", "Lernende wollen mehr soziale Features."), why: t("Fact 7 says the opposite: a social feature exists and 2% open it.", "Fakt 7 sagt das Gegenteil: Ein soziales Feature existiert, und 2 % öffnen es.") },
  { id: "p6", expected: false, text: t("Learners find the price too high.", "Lernende finden den Preis zu hoch."), why: t("Nothing in the case mentions the price.", "Nichts im Fall erwähnt den Preis.") },
  { id: "p7", expected: false, text: t("The visual style looks dated.", "Der visuelle Stil wirkt veraltet."), why: t("No printed fact is about the look; it is about the surface, not the learner's task.", "Kein gedruckter Fakt betrifft das Aussehen; es geht um die Oberfläche, nicht um die Aufgabe der Lernenden.") },
];
export const PROBLEMS = bi(PROBLEMS_DEF);
export const PROBLEM_BY_ID = Object.fromEntries(PROBLEMS.map((p) => [p.id, p])) as Record<ProblemId, (typeof PROBLEMS)[number]>;
export const PROBLEM_MODEL: ProblemId[] = ["p1", "p2", "p3", "p4"];
// The causes use the same checks as Day 3 and Day 4: the set-level `causeHolds` reads CAUSE_MODEL.
export const CAUSE_MODEL = PROBLEM_MODEL;
export const CAUSES = PROBLEMS;

/* ------------------------------------------------------------------ Block 2.2 (Core) · nine measures, choose four */

export type MeasureId = "m1" | "m2" | "m3" | "m4" | "m5" | "m6" | "m7" | "m8" | "m9";
export const MEASURE_IDS: MeasureId[] = ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9"];
export type MeasureArea = "orientation" | "complexity" | "focus" | "benefits" | "features" | "content" | "marketing" | "evidence";
type MeasureDef = { id: MeasureId; no: string; name: Tx; what: Tx; notice: Tx; cost: number; weeks: number; area: MeasureArea };
const MEASURES_DEF: MeasureDef[] = [
  { id: "m1", no: "M1", cost: 14000, weeks: 5, area: "orientation", name: t("Clear navigation", "Klare Navigation"),
    what: t("Rebuild the menu around learner tasks: My courses, Find a course, My progress.", "Das Menü um Aufgaben der Lernenden herum neu bauen: Meine Kurse, Kurs finden, Mein Fortschritt."),
    notice: t("Entries say what the learner can do.", "Die Einträge sagen, was die Lernende tun kann.") },
  { id: "m2", no: "M2", cost: 6000, weeks: 2, area: "complexity", name: t("Reduce complexity", "Komplexität verringern"),
    what: t("Hide or remove unused features and widgets from the home screen.", "Ungenutzte Features und Widgets vom Startbildschirm ausblenden oder entfernen."),
    notice: t("The home screen is calm.", "Der Startbildschirm ist ruhig.") },
  { id: "m3", no: "M3", cost: 9000, weeks: 3, area: "focus", name: t("Focus on core tasks", "Auf Kernaufgaben fokussieren"),
    what: t("A home screen with one main action, “Continue where you stopped”, and two secondary tasks.", "Ein Startbildschirm mit einer Hauptaktion, „Dort weitermachen, wo Sie aufgehört haben“, und zwei Nebenaufgaben."),
    notice: t("The learner knows what to do first.", "Die Lernende weiß, was sie zuerst tun soll.") },
  { id: "m4", no: "M4", cost: 16000, weeks: 5, area: "orientation", name: t("Better structuring of content", "Bessere Strukturierung der Inhalte"),
    what: t("One content list with clear groups and one place per lesson.", "Eine Inhaltsliste mit klaren Gruppen und einem Ort pro Lektion."),
    notice: t("A lesson is in one place.", "Eine Lektion liegt an einem Ort.") },
  { id: "m5", no: "M5", cost: 5000, weeks: 2, area: "benefits", name: t("Learner language", "Sprache der Lernenden"),
    what: t("Rename system terms in labels and buttons (“Start course” instead of “Enrol in module instance”).", "Systembegriffe in Beschriftungen und Buttons umbenennen („Kurs starten“ statt „In Modulinstanz einschreiben“)."),
    notice: t("Words say what they do.", "Die Wörter sagen, was sie tun.") },
  { id: "m6", no: "M6", cost: 45000, weeks: 12, area: "features", name: t("Six new features", "Sechs neue Features"),
    what: t("Add a social feed, groups and badges as requested by sales.", "Einen Social Feed, Gruppen und Badges hinzufügen, wie vom Vertrieb gewünscht."),
    notice: t("New entries appear in the menu.", "Neue Einträge erscheinen im Menü.") },
  { id: "m7", no: "M7", cost: 38000, weeks: 10, area: "content", name: t("Twenty new courses", "Zwanzig neue Kurse"),
    what: t("Add twenty new courses to the catalogue.", "Zwanzig neue Kurse in den Katalog aufnehmen."),
    notice: t("A longer catalogue.", "Ein längerer Katalog.") },
  { id: "m8", no: "M8", cost: 25000, weeks: 6, area: "marketing", name: t("A campaign for existing features", "Eine Kampagne für bestehende Features"),
    what: t("Advertise the existing features to learners.", "Die bestehenden Features den Lernenden bewerben."),
    notice: t("Banners and emails.", "Banner und E-Mails.") },
  { id: "m9", no: "M9", cost: 7000, weeks: 3, area: "evidence", name: t("User research", "Nutzerforschung"),
    what: t("Interview ten learners and run a usability test of the home screen.", "Zehn Lernende interviewen und einen Usability-Test des Startbildschirms durchführen."),
    notice: t("Nothing changes on screen yet.", "Auf dem Bildschirm ändert sich noch nichts.") },
];
export const MEASURES = bi(MEASURES_DEF);
export const MEASURE_BY_ID = Object.fromEntries(MEASURES.map((m) => [m.id, m])) as Record<MeasureId, (typeof MEASURES)[number]>;
export const MEASURE_AREA = bi({
  orientation: t("Acts on: Orientation", "Wirkt auf: Orientierung"),
  complexity: t("Acts on: Complexity", "Wirkt auf: Komplexität"),
  focus: t("Acts on: Orientation and focus", "Wirkt auf: Orientierung und Fokus"),
  benefits: t("Acts on: Benefits, not functions", "Wirkt auf: Nutzen statt Funktionen"),
  features: t("Adds features", "Fügt Features hinzu"),
  content: t("Adds content", "Fügt Inhalt hinzu"),
  marketing: t("Marketing", "Marketing"),
  evidence: t("Gathers evidence", "Sammelt Belege"),
});

export const totalCost = (ids: string[]) => ids.reduce((s, id) => s + MEASURE_BY_ID[id as MeasureId].cost, 0);
export const longestWeeks = (ids: string[]) => ids.reduce((m, id) => Math.max(m, MEASURE_BY_ID[id as MeasureId].weeks), 0);

/**
 * The reference set is the plan's own Musterlösung: clear navigation, reduction of complexity, focus on core tasks, better structuring. Together they cost
 * €45,000, which is €5,000 over the €40,000 the case assumes, so the reference reasons say so and name what would be phased; a learner who stays inside the
 * budget (for example with learner language instead of better structuring) exports with a reason too (CLAUDE.md #38).
 */
export const MODEL_MEASURES: MeasureId[] = ["m1", "m2", "m3", "m4"];
export const MODEL_IMPACT: Record<string, 1 | 2 | 3> = { m1: 3, m2: 2, m3: 3, m4: 3 };
export const MODEL_RISK: Record<string, 1 | 2 | 3> = { m1: 2, m2: 1, m3: 1, m4: 2 };
