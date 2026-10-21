import { bi, t } from "@/lib/lang";
import type { Tx } from "@/lib/lang";

/**
 * Day 5 · the case and the Route 1 instruments. LearnBase is a feature-heavy learning platform without user focus (plan, Level 2 case study).
 *
 * Facts from the plan (printed as facts): many functions but low usage; learners cannot find content; high frustration; system logic instead of user logic;
 * no clear user guidance; unclear navigation; a limited budget; falling satisfaction; management demands growth. The plan prints no cost or budget, so none is printed. Everything else (the screens, the numbers on
 * them) is a Case assumption, labelled so on screen. The plan's Musterlösung: main problem lack
 * of user-centredness; measures clear navigation, reduction of complexity, focus on core tasks, better structuring; rationale: understanding users beats the
 * number of features.
 */

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
