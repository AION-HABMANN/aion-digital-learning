import { bi, t } from "@/lib/lang";
import type { Tx } from "@/lib/lang";

/**
 * Day 7 · the case and the Route 1 instruments. InclusiveLearn is a learning platform whose content is good and whose usage is low (plan, Level 2 case study):
 * users with impairments drop out, the content is hard to understand, there is a lack of accessibility and no user-centred integration; the platform has a small
 * font, complicated language and many steps to operate; complaints are rising, the budget is limited and time is short. Everything else (the four screens, the
 * numbers on them, the €50,000, the 10 weeks, the costs and weeks of the nine measures) is a Case assumption, labelled so on screen. The plan's Musterlösung:
 * main problem the exclusion of certain user groups; measures clear structure and plain language, better operability, visual optimisation, continuous testing;
 * rationale: accessibility = usage = success.
 */

export const BUDGET = 50000;
export const WEEKS_LIMIT = 10;
export const PICK_MEASURES = 4;
export const PICK_CAUSES = 4;
export const PICK_METHODS = 3;
export const GROUPS_MIN = 2;

/** Effort follows the printed cost (a rule taught in Materi A5): under €10,000 Low, €10,000 to €25,000 Mid, above that High. */
export const EFFORT_LOW_MAX = 9999;
export const EFFORT_MID_MAX = 25000;
export const effortBand = (cost: number): 1 | 2 | 3 => (cost <= EFFORT_LOW_MAX ? 1 : cost <= EFFORT_MID_MAX ? 2 : 3);
export const EFFORT_RULE = () => ({ en: "under €10,000, up to €25,000, above", de: "unter 10.000 €, bis 25.000 €, darüber" });

/* ------------------------------------------------------------------ Block 1.1 · eight facts about InclusiveLearn, three principles */

export type PrincipleId = "perceivable" | "operable" | "understandable";
export const PRINCIPLE_IDS: PrincipleId[] = ["perceivable", "operable", "understandable"];

/** The three principles of the plan (perceivability, operability, understandability), each with the test question taught in Materi A2. */
export const PRINCIPLES = bi({
  perceivable: { id: "perceivable" as PrincipleId, label: t("Perceivable", "Wahrnehmbar"), hint: t("Can the learner see or hear it?", "Kann die Lernende es sehen oder hören?"), test: t("Can the learner see or hear it, in the way they perceive things? A thing that cannot be seen or heard cannot be used at all.", "Kann die Lernende es sehen oder hören, so wie sie wahrnimmt? Was man nicht sehen oder hören kann, lässt sich gar nicht nutzen.") },
  operable: { id: "operable" as PrincipleId, label: t("Operable", "Bedienbar"), hint: t("Can the learner use it?", "Kann die Lernende es bedienen?"), test: t("Can the learner reach, press and finish it with the tools they have: a keyboard, a thumb, a steady or a shaky hand?", "Kann die Lernende es mit ihren Mitteln erreichen, drücken und abschließen: einer Tastatur, einem Daumen, einer ruhigen oder zitternden Hand?") },
  understandable: { id: "understandable" as PrincipleId, label: t("Understandable", "Verständlich"), hint: t("Can the learner follow it?", "Kann die Lernende es nachvollziehen?"), test: t("Can the learner follow what is written and know what went wrong and what to do next?", "Kann die Lernende nachvollziehen, was dasteht, und wissen, was schiefging und was sie als Nächstes tun soll?") },
});
export const PRINCIPLE_LABEL = (id: PrincipleId) => PRINCIPLES[id].label;

export type FactId = "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8";
export const FACT_IDS: FactId[] = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"];

type FactDef = { id: FactId; no: number; where: Tx; text: Tx; short: Tx; key: Tx; clue: Tx; why: Tx; area: PrincipleId };

const FACTS_DEF: FactDef[] = [
  { id: "f1", no: 1, where: t("Course page", "Kursseite"), area: "perceivable",
    text: t("The body text is 11 px, light grey (#AAAAAA) on white. Its contrast ratio is 2.3 : 1.", "Der Fließtext ist 11 px groß, hellgrau (#AAAAAA) auf Weiß. Sein Kontrastverhältnis beträgt 2,3 : 1."),
    short: t("Light grey 11 px text, contrast 2.3 : 1", "Hellgrauer 11-px-Text, Kontrast 2,3 : 1"),
    key: t("contrast ratio is 2.3 : 1", "Kontrastverhältnis beträgt 2,3 : 1"),
    clue: t("Before the learner can use anything on this page, what must they be able to do with the text?", "Was muss die Lernende mit dem Text können, bevor sie auf dieser Seite irgendetwas nutzen kann?"),
    why: t("The text is too small and too pale to read well, and the contrast is below 4.5 : 1: the learner cannot perceive it.", "Der Text ist zu klein und zu blass, um gut lesbar zu sein, und der Kontrast liegt unter 4,5 : 1: Die Lernende kann ihn nicht wahrnehmen.") },
  { id: "f2", no: 2, where: t("Video lesson", "Videolektion"), area: "perceivable",
    text: t("Video lessons have no captions and no transcript.", "Videolektionen haben weder Untertitel noch ein Transkript."),
    short: t("Videos without captions or transcript", "Videos ohne Untertitel oder Transkript"),
    key: t("no captions and no transcript", "weder Untertitel noch ein Transkript"),
    clue: t("A learner cannot hear the sound. What is left of the lesson for them?", "Eine Lernende kann den Ton nicht hören. Was bleibt ihr von der Lektion?"),
    why: t("What is said can only be heard, so a learner who cannot hear cannot take in the content: not perceivable.", "Was gesagt wird, lässt sich nur hören, eine Lernende, die nicht hören kann, nimmt den Inhalt also nicht auf: nicht wahrnehmbar.") },
  { id: "f3", no: 3, where: t("Course page", "Kursseite"), area: "perceivable",
    text: t("A lesson's status is shown only by a coloured dot (red or green), with no word next to it.", "Der Status einer Lektion wird nur durch einen farbigen Punkt (rot oder grün) gezeigt, ohne ein Wort daneben."),
    short: t("Status shown only by a coloured dot", "Status nur durch einen farbigen Punkt gezeigt"),
    key: t("only by a coloured dot", "nur durch einen farbigen Punkt"),
    clue: t("Take away the colour. What does the learner still know about the lesson's status?", "Nehmen Sie die Farbe weg. Was weiß die Lernende dann noch über den Status der Lektion?"),
    why: t("The information is carried by colour alone, so a learner who cannot tell red from green loses it: not perceivable.", "Die Information steckt allein in der Farbe, eine Lernende, die Rot und Grün nicht unterscheiden kann, verliert sie also: nicht wahrnehmbar.") },
  { id: "f4", no: 4, where: t("Course page", "Kursseite"), area: "operable",
    text: t("The “Next” button is 18 × 18 px and sits 4 px from the “Back” button.", "Der „Weiter“-Button ist 18 × 18 px groß und sitzt 4 px neben dem „Zurück“-Button."),
    short: t("An 18 × 18 px “Next” button, 4 px from “Back”", "Ein 18 × 18 px großer „Weiter“-Button, 4 px neben „Zurück“"),
    key: t("18 × 18 px", "18 × 18 px"),
    clue: t("A learner's hand shakes a little. Which of the two buttons does the press land on?", "Die Hand einer Lernenden zittert ein wenig. Auf welchem der beiden Buttons landet der Druck?"),
    why: t("The target is small and sits close to another one, so a learner with a tremor or limited hand use hits the wrong button: not operable.", "Das Ziel ist klein und sitzt nah an einem anderen, eine Lernende mit Zittern oder eingeschränkter Handfunktion trifft also den falschen Button: nicht bedienbar.") },
  { id: "f5", no: 5, where: t("Quiz", "Quiz"), area: "operable",
    text: t("The quiz can only be answered by dragging items onto boxes. There is no keyboard alternative.", "Das Quiz lässt sich nur beantworten, indem man Elemente in Kästen zieht. Es gibt keine Tastatur-Alternative."),
    short: t("A quiz that needs dragging, no keyboard way", "Ein Quiz, das Ziehen verlangt, ohne Tastaturweg"),
    key: t("no keyboard alternative", "keine Tastatur-Alternative"),
    clue: t("A learner cannot use a mouse. Can they answer a single question?", "Eine Lernende kann keine Maus benutzen. Kann sie eine einzige Frage beantworten?"),
    why: t("Keyboard and switch users cannot answer at all: not operable.", "Nutzer von Tastatur und Schalter können gar nicht antworten: nicht bedienbar.") },
  { id: "f6", no: 6, where: t("Sign-up", "Anmeldung"), area: "operable",
    text: t("Signing up takes 14 steps over 6 screens.", "Die Anmeldung braucht 14 Schritte auf 6 Bildschirmen."),
    short: t("Sign-up in 14 steps over 6 screens", "Anmeldung in 14 Schritten auf 6 Bildschirmen"),
    key: t("14 steps over 6 screens", "14 Schritte auf 6 Bildschirmen"),
    clue: t("The plan calls it “many steps to operate”. What can a learner who tires quickly not do with 14 steps?", "Der Plan nennt es „viele Schritte zur Bedienung“. Was kann eine Lernende, die schnell ermüdet, bei 14 Schritten nicht?"),
    why: t("The plan files “many steps to operate” under operation: a learner with limited strength or time cannot reach the end of a long sequence. Argued as understandable it also defends, if the reason is clear.", "Der Plan ordnet „viele Schritte zur Bedienung“ der Bedienung zu: Eine Lernende mit wenig Kraft oder Zeit erreicht das Ende einer langen Folge nicht. Als verständlich begründet, ist es ebenfalls vertretbar, wenn der Grund klar ist.") },
  { id: "f7", no: 7, where: t("Sign-up", "Anmeldung"), area: "understandable",
    text: t("Instructions are long sentences with legal wording, many of 38 words or more.", "Anleitungen sind lange Sätze mit juristischem Wortlaut, viele mit 38 Wörtern oder mehr."),
    short: t("Long sentences with legal wording", "Lange Sätze mit juristischem Wortlaut"),
    key: t("legal wording", "juristischem Wortlaut"),
    clue: t("The learner can see every word and press every button. What stops them now?", "Die Lernende sieht jedes Wort und kann jeden Button drücken. Was hält sie jetzt auf?"),
    why: t("The learner can see and press everything, but cannot follow the instruction: not understandable.", "Die Lernende sieht und drückt alles, kann die Anleitung aber nicht nachvollziehen: nicht verständlich.") },
  { id: "f8", no: 8, where: t("Sign-up", "Anmeldung"), area: "understandable",
    text: t("A failed step shows only “Error 4011”, with no explanation.", "Ein fehlgeschlagener Schritt zeigt nur „Fehler 4011“, ohne Erklärung."),
    short: t("“Error 4011” with no explanation", "„Fehler 4011“ ohne Erklärung"),
    key: t("only “Error 4011”", "nur „Fehler 4011“"),
    clue: t("The step fails. What does the learner know about what went wrong and what to do?", "Der Schritt scheitert. Was weiß die Lernende darüber, was schiefging und was sie tun soll?"),
    why: t("The learner cannot tell what went wrong or what to do next: not understandable.", "Die Lernende erkennt weder, was schiefging, noch, was sie als Nächstes tun soll: nicht verständlich.") },
];
export const FACTS = bi(FACTS_DEF);
export const FACT_BY_ID = Object.fromEntries(FACTS.map((f) => [f.id, f])) as Record<FactId, (typeof FACTS)[number]>;
export const FACT_AREA: Record<FactId, PrincipleId> = Object.fromEntries(FACTS_DEF.map((f) => [f.id, f.area])) as Record<FactId, PrincipleId>;
export const TRUTH_SORT = FACT_AREA;

/** The eight groups of Block 1.1, part b. All are real groups; the learner ties two or more to a printed fact (the last is a situational limit, not a person). */
export type GroupId = "g1" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7" | "g8";
export const GROUP_IDS: GroupId[] = ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8"];
export const GROUPS = bi([
  { id: "g1" as GroupId, text: t("People with low vision", "Menschen mit eingeschränktem Sehvermögen") },
  { id: "g2" as GroupId, text: t("People who cannot tell red from green", "Menschen, die Rot und Grün nicht unterscheiden können") },
  { id: "g3" as GroupId, text: t("Deaf or hard-of-hearing learners", "Gehörlose oder schwerhörige Lernende") },
  { id: "g4" as GroupId, text: t("People who use only a keyboard or a switch", "Menschen, die nur eine Tastatur oder einen Schalter nutzen") },
  { id: "g5" as GroupId, text: t("People with a hand tremor or limited hand use", "Menschen mit Handzittern oder eingeschränkter Handfunktion") },
  { id: "g6" as GroupId, text: t("People with dyslexia or learning difficulties", "Menschen mit Legasthenie oder Lernschwierigkeiten") },
  { id: "g7" as GroupId, text: t("Learners reading in a second language", "Lernende, die in einer Zweitsprache lesen") },
  { id: "g8" as GroupId, text: t("Anyone on a small screen, in bright light or on a noisy train (a situational limit)", "Alle auf einem kleinen Bildschirm, bei grellem Licht oder in einem lauten Zug (eine situative Einschränkung)") },
]);
export const GROUP_BY_ID = Object.fromEntries(GROUPS.map((g) => [g.id, g])) as Record<GroupId, (typeof GROUPS)[number]>;
export const MODEL_GROUPS: GroupId[] = ["g1", "g3", "g4", "g8"];

/* ------------------------------------------------------------------ Block 1.2 (Optional) · integrating or expanding: three options */

export type OptId = "A" | "B" | "C";
export const OPT_IDS: OptId[] = ["A", "B", "C"];
type OptDef = { id: OptId; name: Tx; cost: number; weeks: number };
const OPTS_DEF: OptDef[] = [
  { id: "A", cost: 36000, weeks: 10, name: t("Develop new features (an expansion)", "Neue Features entwickeln (eine Erweiterung)") },
  { id: "B", cost: 18000, weeks: 6, name: t("Improve the existing UX: structure, navigation, wording (an integration)", "Die bestehende UX verbessern: Struktur, Navigation, Formulierungen (eine Integration)") },
  { id: "C", cost: 24000, weeks: 8, name: t("Increase accessibility: contrast, keyboard use, captions (an integration)", "Barrierefreiheit erhöhen: Kontrast, Tastaturbedienung, Untertitel (eine Integration)") },
];
export const OPTS = bi(OPTS_DEF);
export const OPT_BY_ID = Object.fromEntries(OPTS.map((o) => [o.id, o])) as Record<OptId, (typeof OPTS)[number]>;
export const MODEL_OPT_IMPACT: Record<string, 1 | 2 | 3> = { A: 1, B: 2, C: 3 };
export const MODEL_OPT_RISK: Record<string, 1 | 2 | 3> = { A: 2, B: 1, C: 2 };
export const MODEL_OPT_ORDER: OptId[] = ["C", "B", "A"];

/* ------------------------------------------------------------------ Block 1.3 (Optional) · coaching reflection */

export type ReflectKey = "a" | "b" | "c";
export const REFLECT = bi([
  { k: "a" as ReflectKey, q: t("Who is currently being excluded?", "Wer wird derzeit ausgeschlossen?") },
  { k: "b" as ReflectKey, q: t("Which UX decision has the greatest reach?", "Welche UX-Entscheidung hat die größte Reichweite?") },
  { k: "c" as ReflectKey, q: t("How do we measure UX quality meaningfully?", "Wie messen wir UX-Qualität sinnvoll?") },
]);

/* ------------------------------------------------------------------ Block 2.1 (Optional) · four central barriers */

export type BarrierId = "p1" | "p2" | "p3" | "p4" | "p5" | "p6" | "p7";
export const BARRIER_IDS: BarrierId[] = ["p1", "p2", "p3", "p4", "p5", "p6", "p7"];
type BarrierDef = { id: BarrierId; text: Tx; expected: boolean; why: Tx };
const BARRIERS_DEF: BarrierDef[] = [
  { id: "p1", expected: true, text: t("The text is small and low in contrast.", "Der Text ist klein und kontrastarm."), why: t("Facts 1 and 3: pale small text and status by colour alone.", "Fakten 1 und 3: blasser kleiner Text und Status nur durch Farbe.") },
  { id: "p2", expected: true, text: t("Content can only be operated with a mouse or by dragging.", "Inhalte lassen sich nur mit der Maus oder durch Ziehen bedienen."), why: t("Facts 4 and 5: a tiny button and a drag-only quiz.", "Fakten 4 und 5: ein winziger Button und ein Quiz nur zum Ziehen.") },
  { id: "p3", expected: true, text: t("The language is complicated and instructions are unclear.", "Die Sprache ist kompliziert und Anleitungen sind unklar."), why: t("Facts 7 and 8: legal wording and “Error 4011”.", "Fakten 7 und 8: juristischer Wortlaut und „Fehler 4011“.") },
  { id: "p4", expected: true, text: t("Videos have no captions or transcripts.", "Videos haben weder Untertitel noch Transkripte."), why: t("Fact 2: the videos can only be heard.", "Fakt 2: Die Videos lassen sich nur hören.") },
  { id: "p5", expected: false, text: t("The subscription price is too high.", "Der Abo-Preis ist zu hoch."), why: t("A business matter: no printed fact says it stops a group of learners.", "Eine Geschäftsfrage: Kein gedruckter Fakt sagt, dass sie eine Gruppe von Lernenden aufhält.") },
  { id: "p6", expected: false, text: t("The course catalogue is too small.", "Der Kurskatalog ist zu klein."), why: t("A content matter: the case says the content is good.", "Eine Inhaltsfrage: Der Fall sagt, der Inhalt sei gut.") },
  { id: "p7", expected: false, text: t("The platform has no dark mode.", "Die Plattform hat keinen Dunkelmodus."), why: t("A preference, not a barrier in the case; it would not help the groups who drop out.", "Eine Vorliebe, keine Barriere im Fall; sie würde den Gruppen, die abbrechen, nicht helfen.") },
];
export const BARRIERS = bi(BARRIERS_DEF);
export const BARRIER_BY_ID = Object.fromEntries(BARRIERS.map((b) => [b.id, b])) as Record<BarrierId, (typeof BARRIERS)[number]>;
export const BARRIER_MODEL: BarrierId[] = ["p1", "p2", "p3", "p4"];
// The causes use the same set-level check as Days 3 to 5: `causeHolds` reads CAUSE_MODEL.
export const CAUSE_MODEL = BARRIER_MODEL;
export const CAUSES = BARRIERS;

/* ------------------------------------------------------------------ Block 2.2 (Core) · nine measures, choose four; six evaluation methods, choose three */

export type MeasureId = "m1" | "m2" | "m3" | "m4" | "m5" | "m6" | "m7" | "m8" | "m9";
export const MEASURE_IDS: MeasureId[] = ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9"];
export type MeasureArea = "understandable" | "operable" | "perceivable" | "evaluation" | "layer" | "feature" | "look" | "reach";
type MeasureDef = { id: MeasureId; no: string; name: Tx; what: Tx; notice: Tx; cost: number; weeks: number; area: MeasureArea };
const MEASURES_DEF: MeasureDef[] = [
  { id: "m1", no: "M1", cost: 15000, weeks: 6, area: "understandable", name: t("Clear structure and plain language", "Klare Struktur und einfache Sprache"),
    what: t("Rewrite the 20 most-used lessons and the sign-up instructions in short, plain sentences with headings.", "Die 20 meistgenutzten Lektionen und die Anmeldeanleitung in kurzen, einfachen Sätzen mit Überschriften neu schreiben."),
    notice: t("Text is easy to follow.", "Der Text ist leicht zu verstehen.") },
  { id: "m2", no: "M2", cost: 13000, weeks: 5, area: "operable", name: t("Better operability", "Bessere Bedienbarkeit"),
    what: t("Full keyboard use, larger targets, a non-drag way to answer quizzes.", "Volle Tastaturbedienung, größere Ziele, ein Weg ohne Ziehen, um Quizze zu beantworten."),
    notice: t("Everything works without a mouse.", "Alles funktioniert ohne Maus.") },
  { id: "m3", no: "M3", cost: 11000, weeks: 4, area: "perceivable", name: t("Visual optimisation", "Visuelle Optimierung"),
    what: t("Contrast of at least 4.5 : 1, text that can be enlarged to 200%, status always with a word.", "Kontrast von mindestens 4,5 : 1, Text, der sich auf 200 % vergrößern lässt, Status immer mit einem Wort."),
    notice: t("Text is clear and can be enlarged.", "Text ist klar und lässt sich vergrößern.") },
  { id: "m4", no: "M4", cost: 9000, weeks: 4, area: "perceivable", name: t("Captions and transcripts", "Untertitel und Transkripte"),
    what: t("Add captions and a transcript to the 30 most-used videos.", "Den 30 meistgenutzten Videos Untertitel und ein Transkript hinzufügen."),
    notice: t("Videos can be read.", "Videos lassen sich lesen.") },
  { id: "m5", no: "M5", cost: 8000, weeks: 4, area: "evaluation", name: t("Continuous testing", "Kontinuierliches Testen"),
    what: t("An automated check in every release and a test with five learners with impairments each quarter (first quarter).", "Eine automatische Prüfung in jedem Release und ein Test mit fünf Lernenden mit Einschränkungen pro Quartal (erstes Quartal)."),
    notice: t("Barriers are found before release.", "Barrieren werden vor dem Release gefunden.") },
  { id: "m6", no: "M6", cost: 12000, weeks: 3, area: "layer", name: t("An accessibility toolbar", "Eine Barrierefreiheits-Toolbar"),
    what: t("A third-party toolbar that promises to fix accessibility problems automatically.", "Eine Toolbar eines Drittanbieters, die verspricht, Barrierefreiheitsprobleme automatisch zu beheben."),
    notice: t("A new icon appears on every page.", "Auf jeder Seite erscheint ein neues Symbol.") },
  { id: "m7", no: "M7", cost: 40000, weeks: 10, area: "feature", name: t("An AI learning buddy", "Ein KI-Lernbegleiter"),
    what: t("A chat assistant for questions on the content.", "Ein Chat-Assistent für Fragen zum Inhalt."),
    notice: t("A chat button appears.", "Ein Chat-Button erscheint.") },
  { id: "m8", no: "M8", cost: 25000, weeks: 6, area: "look", name: t("A new visual style", "Ein neuer visueller Stil"),
    what: t("New colours, icons and fonts.", "Neue Farben, Icons und Schriften."),
    notice: t("The platform looks different.", "Die Plattform sieht anders aus.") },
  { id: "m9", no: "M9", cost: 30000, weeks: 10, area: "reach", name: t("Two more languages", "Zwei weitere Sprachen"),
    what: t("Translate the platform into two further languages.", "Die Plattform in zwei weitere Sprachen übersetzen."),
    notice: t("More language options.", "Mehr Sprachoptionen.") },
];
export const MEASURES = bi(MEASURES_DEF);
export const MEASURE_BY_ID = Object.fromEntries(MEASURES.map((m) => [m.id, m])) as Record<MeasureId, (typeof MEASURES)[number]>;
export const MEASURE_AREA = bi({
  understandable: t("Acts on: Understandable", "Wirkt auf: Verständlichkeit"),
  operable: t("Acts on: Operable", "Wirkt auf: Bedienbarkeit"),
  perceivable: t("Acts on: Perceivable", "Wirkt auf: Wahrnehmbarkeit"),
  evaluation: t("Acts on: Evaluation", "Wirkt auf: Evaluation"),
  layer: t("A layer on top", "Eine Schicht obendrauf"),
  feature: t("Adds a feature", "Fügt ein Feature hinzu"),
  look: t("The look", "Das Aussehen"),
  reach: t("Adds reach in other ways", "Schafft Reichweite auf anderem Weg"),
});

export const totalCost = (ids: string[]) => ids.reduce((s, id) => s + MEASURE_BY_ID[id as MeasureId].cost, 0);
export const longestWeeks = (ids: string[]) => ids.reduce((m, id) => Math.max(m, MEASURE_BY_ID[id as MeasureId].weeks), 0);

/**
 * The reference set follows the plan's Musterlösung (clear structure and plain language, better operability, visual optimisation, continuous testing): M1, M2, M3, M5.
 * Together €47,000 of €50,000 and six weeks of ten. M4 (captions) defends in place of M5 or M1 if the learner names the group and the fact.
 */
export const MODEL_MEASURES: MeasureId[] = ["m3", "m2", "m1", "m5"];
export const MODEL_IMPACT: Record<string, 1 | 2 | 3> = { m1: 3, m2: 3, m3: 3, m5: 2 };
export const MODEL_RISK: Record<string, 1 | 2 | 3> = { m1: 1, m2: 2, m3: 1, m5: 1 };

export type MethodId = "e1" | "e2" | "e3" | "e4" | "e5" | "e6";
export const METHOD_IDS: MethodId[] = ["e1", "e2", "e3", "e4", "e5", "e6"];
type MethodDef = { id: MethodId; no: string; name: Tx; tells: Tx; gives: "reasons" | "counts" | "conformance" | "signal" | "nothing" };
const METHODS_DEF: MethodDef[] = [
  { id: "e1", no: "E1", gives: "conformance", name: t("An automated accessibility check in each release", "Eine automatische Barrierefreiheitsprüfung in jedem Release"), tells: t("Finds some problems quickly; cannot find all.", "Findet manche Probleme schnell; findet nicht alle.") },
  { id: "e2", no: "E2", gives: "conformance", name: t("A manual check with the keyboard alone and a screen reader", "Eine manuelle Prüfung nur mit der Tastatur und einem Screenreader"), tells: t("Finds problems that tools miss.", "Findet Probleme, die Werkzeuge übersehen.") },
  { id: "e3", no: "E3", gives: "reasons", name: t("A usability test with learners with impairments", "Ein Usability-Test mit Lernenden mit Einschränkungen"), tells: t("Shows why a group cannot finish a task.", "Zeigt, warum eine Gruppe eine Aufgabe nicht abschließen kann.") },
  { id: "e4", no: "E4", gives: "counts", name: t("Task success and drop-out by user group", "Aufgabenerfolg und Abbruch pro Nutzergruppe"), tells: t("Shows how many in each group are blocked.", "Zeigt, wie viele in jeder Gruppe blockiert sind.") },
  { id: "e5", no: "E5", gives: "signal", name: t("A satisfaction questionnaire (SUS) asked per group", "Ein Zufriedenheitsfragebogen (SUS), pro Gruppe gestellt"), tells: t("A compact signal that a group has trouble.", "Ein kompaktes Signal, dass eine Gruppe Schwierigkeiten hat.") },
  { id: "e6", no: "E6", gives: "nothing", name: t("Counting the features on the platform", "Die Features der Plattform zählen"), tells: t("Shows how much was built, not who can use it.", "Zeigt, wie viel gebaut wurde, nicht, wer es nutzen kann.") },
];
export const METHODS = bi(METHODS_DEF);
export const METHOD_BY_ID = Object.fromEntries(METHODS.map((m) => [m.id, m])) as Record<MethodId, (typeof METHODS)[number]>;
export const MODEL_METHODS: MethodId[] = ["e1", "e3", "e4"];
