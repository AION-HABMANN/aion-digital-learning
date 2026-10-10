import { bi, t } from "@/lib/lang";
import type { Tx } from "@/lib/lang";

/**
 * Day 3 · the case and the Route 1 instruments. EduCore is a learning platform with an overwhelm effect (plan, Level 2 case study).
 *
 * Facts from the plan (printed as facts): users do not understand the content, the drop-out rate is high, the content is called "too
 * complicated"; too much information at once, no visual structure, no recognisable learning logic; a long continuous text of 500 words
 * with unexplained technical terms and no visualisation; four weeks, complex content, beginners. Everything else (the screens, the 28
 * lessons, the 12 quiz questions, €40,000, the costs and weeks) is a Case assumption, labelled so on screen. The plan's Musterlösung: main
 * problem extraneous cognitive load; measures chunking, visualisation, clear structure, reduction of irrelevant content. Rationale:
 * learning capacity before the amount of information.
 */

export const BUDGET = 40000;
export const WEEKS_LIMIT = 4;
export const PICK_MEASURES = 4;
export const PICK_CAUSES = 4;

/** Effort follows the printed cost (a rule taught in Materi A5): under €8,000 Low, €8,000 to €15,000 Mid, above that High. */
export const EFFORT_LOW_MAX = 7999;
export const EFFORT_MID_MAX = 15000;
export const effortBand = (cost: number): 1 | 2 | 3 => (cost <= EFFORT_LOW_MAX ? 1 : cost <= EFFORT_MID_MAX ? 2 : 3);

/* ------------------------------------------------------------------ Block 1.1 · eight facts about the EduCore screens */

export type AreaId = "amount" | "form" | "order";
export const AREA_IDS: AreaId[] = ["amount", "form", "order"];

/** The three observations of the case and the test question taught in Materi A2 and A3 for each. */
export const AREAS = bi({
  amount: { id: "amount" as AreaId, label: t("Amount", "Menge"), hint: t("Too much information at once", "Zu viel Information auf einmal"), test: t("Is it a matter of how much is on the screen or in the lesson at once?", "Geht es darum, wie viel auf einmal auf dem Bildschirm oder in der Lektion steht?") },
  form: { id: "form" as AreaId, label: t("Form", "Form"), hint: t("How the content is presented and structured on the screen", "Wie der Inhalt auf dem Bildschirm dargestellt und gegliedert ist"), test: t("Is it a matter of how the content is shaped: paragraphs, headings, pictures, what stands out?", "Geht es darum, wie der Inhalt geformt ist: Absätze, Überschriften, Bilder, was hervorsticht?") },
  order: { id: "order" as AreaId, label: t("Order and purpose", "Ordnung und Zweck"), hint: t("Can the learner see the learning logic: groups, order, goals?", "Können die Lernenden die Lernlogik erkennen: Gruppen, Reihenfolge, Ziele?"), test: t("Is it a matter of whether the learner can see how the parts are grouped, in what order, and what each is for?", "Geht es darum, ob die Lernenden sehen können, wie die Teile gruppiert sind, in welcher Reihenfolge und wofür jeder da ist?") },
});
export const AREA_LABEL = (id: AreaId) => AREAS[id].label;

export type FactId = "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8";
export const FACT_IDS: FactId[] = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"];

type FactDef = { id: FactId; no: number; where: Tx; text: Tx; short: Tx; key: Tx; clue: Tx; why: Tx; area: AreaId };

const FACTS_DEF: FactDef[] = [
  { id: "f1", no: 1, where: t("Lesson 7", "Lektion 7"), area: "amount",
    text: t("Lesson 7 is one continuous text of about 500 words.", "Lektion 7 ist ein einziger durchgehender Text von etwa 500 Wörtern."),
    short: t("One continuous text of about 500 words", "Ein durchgehender Text von etwa 500 Wörtern"),
    key: t("about 500 words", "etwa 500 Wörtern"),
    clue: t("Count what a learner has to hold in mind between the first and the last sentence. Is it a question of how much, or of how it looks?", "Zählen Sie, was eine Lernende zwischen dem ersten und dem letzten Satz im Kopf behalten muss. Geht es um die Menge oder um das Aussehen?"),
    why: t("The learner has to take in 500 words at once: amount.", "Die Lernenden müssen 500 Wörter auf einmal aufnehmen: Menge.") },
  { id: "f2", no: 2, where: t("Lesson page with extras", "Lektionsseite mit Extras"), area: "amount",
    text: t("Next to the text, the page shows a news banner, a chat window, a recommendation box and a menu with nine entries, all at the same time.", "Neben dem Text zeigt die Seite ein News-Banner, ein Chat-Fenster, einen Empfehlungskasten und ein Menü mit neun Einträgen, alles zugleich."),
    short: t("Banner, chat, recommendations and a nine-entry menu next to the text", "Banner, Chat, Empfehlungen und ein Menü mit neun Einträgen neben dem Text"),
    key: t("all at the same time", "alles zugleich"),
    clue: t("How many separate things compete for the learner's attention here, apart from the lesson itself?", "Wie viele getrennte Dinge konkurrieren hier um die Aufmerksamkeit der Lernenden, abgesehen von der Lektion selbst?"),
    why: t("Several things compete for attention at once: amount.", "Mehrere Dinge konkurrieren zugleich um die Aufmerksamkeit: Menge.") },
  { id: "f3", no: 3, where: t("Quiz", "Quiz"), area: "amount",
    text: t("The quiz shows all 12 questions on one page.", "Das Quiz zeigt alle 12 Fragen auf einer Seite."),
    short: t("All 12 quiz questions on one page", "Alle 12 Quizfragen auf einer Seite"),
    key: t("all 12 questions on one page", "alle 12 Fragen auf einer Seite"),
    clue: t("A learner opens the quiz. How much do they face at once, and would five at a time change that?", "Eine Lernende öffnet das Quiz. Wie viel steht ihr auf einmal gegenüber, und würde es etwas ändern, fünf auf einmal zu zeigen?"),
    why: t("Twelve questions at once is a question of how much is shown together: amount.", "Zwölf Fragen auf einmal ist eine Frage, wie viel zusammen gezeigt wird: Menge.") },
  { id: "f4", no: 4, where: t("Lesson 7", "Lektion 7"), area: "form",
    text: t("The text has no paragraphs, headings or lists.", "Der Text hat keine Absätze, Überschriften oder Listen."),
    short: t("No paragraphs, headings or lists", "Keine Absätze, Überschriften oder Listen"),
    key: t("no paragraphs, headings or lists", "keine Absätze, Überschriften oder Listen"),
    clue: t("Imagine the same 500 words in five parts with headings. What has changed: how much there is, or how it is shaped?", "Stellen Sie sich dieselben 500 Wörter in fünf Teilen mit Überschriften vor. Was hat sich geändert: wie viel es ist oder wie es geformt ist?"),
    why: t("The content is not shaped into parts the eye can use: form.", "Der Inhalt ist nicht in Teile geformt, die das Auge nutzen kann: Form.") },
  { id: "f5", no: 5, where: t("Lesson 7", "Lektion 7"), area: "form",
    text: t("The lesson has no diagram or picture, and terms such as “pseudonymisation” and “legitimate interest” are not explained.", "Die Lektion hat kein Diagramm und kein Bild, und Begriffe wie „Pseudonymisierung“ und „berechtigtes Interesse“ werden nicht erklärt."),
    short: t("No picture, and terms not explained", "Kein Bild, und Begriffe nicht erklärt"),
    key: t("no diagram or picture", "kein Diagramm und kein Bild"),
    clue: t("A beginner meets a word they do not know. Is the problem the number of words, or what the page offers to explain them?", "Eine Einsteigerin trifft auf ein Wort, das sie nicht kennt. Ist das Problem die Zahl der Wörter oder das, was die Seite zur Erklärung anbietet?"),
    why: t("The presentation offers neither a picture nor an explanation: form.", "Die Darstellung bietet weder ein Bild noch eine Erklärung: Form.") },
  { id: "f6", no: 6, where: t("Lesson 7", "Lektion 7"), area: "form",
    text: t("The key sentence of the lesson has the same size, weight and colour as every other sentence.", "Der Kernsatz der Lektion hat dieselbe Größe, dasselbe Gewicht und dieselbe Farbe wie jeder andere Satz."),
    short: t("The key sentence looks like every other sentence", "Der Kernsatz sieht aus wie jeder andere Satz"),
    key: t("same size, weight and colour", "dieselbe Größe, dasselbe Gewicht und dieselbe Farbe"),
    clue: t("Where does the eye go first on this page, and why is the answer “nowhere in particular”?", "Wohin geht das Auge auf dieser Seite zuerst, und warum lautet die Antwort „nirgends besonders“?"),
    why: t("Nothing marks what matters most, so attention has nothing to follow: form (visual hierarchy).", "Nichts markiert, was am wichtigsten ist, die Aufmerksamkeit hat also nichts, dem sie folgen kann: Form (visuelle Hierarchie).") },
  { id: "f7", no: 7, where: t("Module overview", "Modulübersicht"), area: "order",
    text: t("The module overview lists 28 lessons in one flat list, with no groups and no order labels.", "Die Modulübersicht listet 28 Lektionen in einer flachen Liste, ohne Gruppen und ohne Reihenfolgenangaben."),
    short: t("28 lessons in one flat list", "28 Lektionen in einer flachen Liste"),
    key: t("no groups and no order labels", "ohne Gruppen und ohne Reihenfolgenangaben"),
    clue: t("A learner wants to know where to start and what belongs together. What on this list tells them?", "Eine Lernende will wissen, wo sie anfangen soll und was zusammengehört. Was auf dieser Liste sagt es ihr?"),
    why: t("The learner cannot see groups or an order: order and purpose.", "Die Lernenden sehen weder Gruppen noch eine Reihenfolge: Ordnung und Zweck.") },
  { id: "f8", no: 8, where: t("Module overview", "Modulübersicht"), area: "order",
    text: t("No lesson states its learning goal, and no lesson says how it connects to the one before.", "Keine Lektion nennt ihr Lernziel, und keine Lektion sagt, wie sie mit der vorherigen zusammenhängt."),
    short: t("No lesson states its goal or its link to the one before", "Keine Lektion nennt ihr Ziel oder ihre Verbindung zur vorherigen"),
    key: t("No lesson states its learning goal", "Keine Lektion nennt ihr Lernziel"),
    clue: t("Before you start a lesson, what do you know about what it is for and how it follows from the last one?", "Bevor Sie eine Lektion beginnen: Was wissen Sie darüber, wofür sie da ist und wie sie auf die letzte folgt?"),
    why: t("The learner cannot tell what a lesson is for or how it fits: order and purpose.", "Die Lernenden können nicht erkennen, wofür eine Lektion da ist oder wie sie passt: Ordnung und Zweck.") },
];
export const FACTS = bi(FACTS_DEF);
export const FACT_BY_ID = Object.fromEntries(FACTS.map((f) => [f.id, f])) as Record<FactId, (typeof FACTS)[number]>;
export const FACT_AREA: Record<FactId, AreaId> = Object.fromEntries(FACTS_DEF.map((f) => [f.id, f.area])) as Record<FactId, AreaId>;
export const TRUTH_SORT = FACT_AREA;

/* ------------------------------------------------------------------ Block 1.2 (Optional) · three options to reduce a module's load */

export type OptId = "A" | "B" | "C";
export const OPT_IDS: OptId[] = ["A", "B", "C"];
type OptDef = { id: OptId; name: Tx; cost: number; weeks: number };
const OPTS_DEF: OptDef[] = [
  { id: "A", cost: 7500, weeks: 2, name: t("Shorten the content significantly", "Den Inhalt deutlich kürzen") },
  { id: "B", cost: 22000, weeks: 4, name: t("Visualise the content (diagrams, graphics)", "Den Inhalt visualisieren (Diagramme, Grafiken)") },
  { id: "C", cost: 10000, weeks: 3, name: t("Split the content into small modules", "Den Inhalt in kleine Module aufteilen") },
];
export const OPTS = bi(OPTS_DEF);
export const OPT_BY_ID = Object.fromEntries(OPTS.map((o) => [o.id, o])) as Record<OptId, (typeof OPTS)[number]>;
export const MODEL_OPT_IMPACT: Record<string, 1 | 2 | 3> = { A: 1, B: 2, C: 3 };
export const MODEL_OPT_RISK: Record<string, 1 | 2 | 3> = { A: 3, B: 2, C: 1 };
export const MODEL_OPT_ORDER: OptId[] = ["C", "B", "A"];

/* ------------------------------------------------------------------ Block 1.3 (Optional) · coaching reflection */

export type ReflectKey = "a" | "b" | "c";
export const REFLECT = bi([
  { k: "a" as ReflectKey, q: t("Where do we overburden users unnecessarily?", "Wo überlasten wir Nutzer unnötig?") },
  { k: "b" as ReflectKey, q: t("Which information is truly decisive?", "Welche Information ist wirklich entscheidend?") },
  { k: "c" as ReflectKey, q: t("Which UX decision measurably improves learning?", "Welche UX-Entscheidung verbessert das Lernen messbar?") },
]);

/* ------------------------------------------------------------------ Block 2.1 (Optional) · four causes of cognitive overload */

export type CauseId = "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7";
export const CAUSE_IDS: CauseId[] = ["c1", "c2", "c3", "c4", "c5", "c6", "c7"];
type CauseDef = { id: CauseId; text: Tx; expected: boolean; why: Tx };
const CAUSES_DEF: CauseDef[] = [
  { id: "c1", expected: true, text: t("Too much information is shown at once.", "Es wird zu viel Information auf einmal gezeigt."), why: t("The case names it, and facts 1 to 3 show it.", "Der Fall nennt es, und die Fakten 1 bis 3 zeigen es.") },
  { id: "c2", expected: true, text: t("The content has no visual structure.", "Der Inhalt hat keine visuelle Struktur."), why: t("The case names it, and facts 4 to 6 show it.", "Der Fall nennt es, und die Fakten 4 bis 6 zeigen es.") },
  { id: "c3", expected: true, text: t("The learner cannot see a learning logic: groups, order, goals.", "Die Lernenden können keine Lernlogik erkennen: Gruppen, Reihenfolge, Ziele."), why: t("The case names it (“no recognisable learning logic”), and facts 7 and 8 show it.", "Der Fall nennt es („keine erkennbare Lernlogik“), und die Fakten 7 und 8 zeigen es.") },
  { id: "c4", expected: true, text: t("Technical terms are used without explanation.", "Fachbegriffe werden ohne Erklärung verwendet."), why: t("The case says the text has unexplained technical terms, and fact 5 shows it.", "Der Fall sagt, der Text habe unerklärte Fachbegriffe, und Fakt 5 zeigt es.") },
  { id: "c5", expected: false, text: t("The subject itself is complex.", "Das Thema selbst ist komplex."), why: t("True, and it is the intrinsic load, but it is not a cause of overload that design can remove; design can only order it.", "Das stimmt, und es ist die intrinsische Belastung, aber keine Ursache der Überlastung, die Gestaltung beseitigen kann; sie kann sie nur ordnen.") },
  { id: "c6", expected: false, text: t("The visual style of the platform looks dated.", "Der visuelle Stil der Plattform wirkt veraltet."), why: t("No printed fact says so; it is about the surface, not the load.", "Kein gedruckter Fakt sagt das; es geht um die Oberfläche, nicht um die Belastung.") },
  { id: "c7", expected: false, text: t("The course catalogue is too small.", "Der Kurskatalog ist zu klein."), why: t("Nothing in the case says learners are overloaded for lack of courses.", "Nichts im Fall sagt, dass Lernende überlastet sind, weil es zu wenige Kurse gibt.") },
];
export const CAUSES = bi(CAUSES_DEF);
export const CAUSE_MODEL: CauseId[] = ["c1", "c2", "c3", "c4"];

/* ------------------------------------------------------------------ Block 2.2 (Core) · nine measures, choose four */

export type MeasureId = "m1" | "m2" | "m3" | "m4" | "m5" | "m6" | "m7" | "m8" | "m9";
export const MEASURE_IDS: MeasureId[] = ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9"];
export type MeasureArea = AreaId | "reward" | "look" | "technology" | "content";
type MeasureDef = { id: MeasureId; no: string; name: Tx; what: Tx; notice: Tx; cost: number; weeks: number; area: MeasureArea };
const MEASURES_DEF: MeasureDef[] = [
  { id: "m1", no: "M1", cost: 10000, weeks: 3, area: "amount", name: t("Chunking", "Chunking"),
    what: t("Split each lesson into units of five to seven minutes, each with one goal.", "Jede Lektion in Einheiten von fünf bis sieben Minuten teilen, jede mit einem Ziel."),
    notice: t("A lesson becomes a few short screens.", "Aus einer Lektion werden einige kurze Bildschirme.") },
  { id: "m2", no: "M2", cost: 20000, weeks: 5, area: "form", name: t("Visualisation", "Visualisierung"),
    what: t("Replace the densest paragraphs with diagrams and flow pictures.", "Die dichtesten Absätze durch Diagramme und Ablaufbilder ersetzen."),
    notice: t("The hardest ideas are shown as a picture.", "Die schwersten Ideen werden als Bild gezeigt.") },
  { id: "m3", no: "M3", cost: 7000, weeks: 2, area: "form", name: t("Clear structure", "Klare Struktur"),
    what: t("Headings, short paragraphs, the key sentence marked, terms explained on tap.", "Überschriften, kurze Absätze, der Kernsatz markiert, Begriffe per Tipp erklärt."),
    notice: t("A lesson can be scanned.", "Eine Lektion lässt sich überfliegen.") },
  { id: "m4", no: "M4", cost: 4000, weeks: 1, area: "amount", name: t("Remove extras from the lesson page", "Extras von der Lektionsseite entfernen"),
    what: t("Take the banner, chat, recommendations and extra menu off the lesson page while the learner works.", "Banner, Chat, Empfehlungen und das Zusatzmenü von der Lektionsseite nehmen, solange die Lernenden arbeiten."),
    notice: t("The lesson page shows the lesson and one way on.", "Die Lektionsseite zeigt die Lektion und einen Weg weiter.") },
  { id: "m5", no: "M5", cost: 9000, weeks: 3, area: "order", name: t("Goal and outline", "Ziel und Gliederung"),
    what: t("State the goal at the start of each lesson and group the 28 lessons into modules with an order.", "Das Ziel am Anfang jeder Lektion nennen und die 28 Lektionen zu Modulen mit einer Reihenfolge gruppieren."),
    notice: t("Each lesson says what it is for and where it fits.", "Jede Lektion sagt, wofür sie da ist und wo sie hinpasst.") },
  { id: "m6", no: "M6", cost: 13000, weeks: 4, area: "reward", name: t("Points for lesson views", "Punkte für Lektionsaufrufe"),
    what: t("Give points for every lesson opened.", "Punkte für jede geöffnete Lektion vergeben."),
    notice: t("A point total goes up.", "Eine Punktzahl steigt.") },
  { id: "m7", no: "M7", cost: 24000, weeks: 6, area: "look", name: t("New brand look", "Neues Marken-Aussehen"),
    what: t("Redesign colours, icons and fonts of the whole platform.", "Farben, Icons und Schriften der ganzen Plattform neu gestalten."),
    notice: t("The platform looks different.", "Die Plattform sieht anders aus.") },
  { id: "m8", no: "M8", cost: 48000, weeks: 10, area: "technology", name: t("An AI chatbot", "Ein KI-Chatbot"),
    what: t("A chatbot that answers learners' questions about the content.", "Ein Chatbot, der Fragen der Lernenden zum Inhalt beantwortet."),
    notice: t("A new chat entry appears.", "Ein neuer Chat-Eintrag erscheint.") },
  { id: "m9", no: "M9", cost: 11000, weeks: 4, area: "content", name: t("Extra reading library", "Zusätzliche Lesebibliothek"),
    what: t("Add a library of background articles to each module.", "Jedem Modul eine Bibliothek mit Hintergrundartikeln hinzufügen."),
    notice: t("More material to read.", "Mehr Material zum Lesen.") },
];
export const MEASURES = bi(MEASURES_DEF);
export const MEASURE_BY_ID = Object.fromEntries(MEASURES.map((m) => [m.id, m])) as Record<MeasureId, (typeof MEASURES)[number]>;
export const MEASURE_AREA = bi({
  amount: t("Acts on: Amount", "Wirkt auf: Menge"),
  form: t("Acts on: Form", "Wirkt auf: Form"),
  order: t("Acts on: Order and purpose", "Wirkt auf: Ordnung und Zweck"),
  reward: t("Adds a reward", "Fügt eine Belohnung hinzu"),
  look: t("The look, not the load", "Das Aussehen, nicht die Belastung"),
  technology: t("Adds technology", "Fügt Technologie hinzu"),
  content: t("Adds more content", "Fügt mehr Inhalt hinzu"),
});

export const totalCost = (ids: MeasureId[]) => ids.reduce((s, id) => s + MEASURE_BY_ID[id].cost, 0);
export const longestWeeks = (ids: MeasureId[]) => ids.reduce((m, id) => Math.max(m, MEASURE_BY_ID[id].weeks), 0);

/**
 * The reference set. The plan's Musterlösung names chunking, visualisation, clear structure and reducing irrelevant content. Visualisation takes
 * five weeks in this case, one more than the four the plan prints, so the reference set takes "Goal and outline" instead, which answers the
 * third observation of the case (no recognisable learning logic). A learner who funds visualisation as the plan does exports with the
 * longer time printed as a fact and gives a reason (CLAUDE.md #38).
 */
export const MODEL_MEASURES: MeasureId[] = ["m1", "m3", "m4", "m5"];
export const MODEL_IMPACT: Record<string, 1 | 2 | 3> = { m1: 3, m3: 2, m4: 2, m5: 2 };
export const MODEL_RISK: Record<string, 1 | 2 | 3> = { m1: 1, m3: 1, m4: 2, m5: 1 };
