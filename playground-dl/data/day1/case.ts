import { bi, t } from "@/lib/lang";
import type { Tx } from "@/lib/lang";

/**
 * Day 1 · the case and the Route 1 instruments. SkillUp GmbH runs the learning platform LearnFast.
 *
 * Facts from the plan (printed as facts): the platform has a cluttered dashboard, long texts without structure and no progress bar; many
 * learners drop out; the case study gives a 40 % drop-out rate, content that is hard to understand and no clear learning path; the
 * decision task gives three measures (progress indicator, shorter and structured content, gamification with badges), a budget of
 * €50,000 and two months. Everything else (the 14 tiles, the 500 words, the costs, the weeks) is a Case assumption and is labelled so on screen.
 */

export const BUDGET = 50000;
export const MONTHS = 2;
export const WEEKS_LIMIT = 8;
export const DROPOUT = 40;
export const PICK_MEASURES = 4;

export type AreaId = "orientation" | "understanding" | "motivation";
export const AREA_IDS: AreaId[] = ["orientation", "understanding", "motivation"];

/** The three areas of the plan's own task (Orientation, Understanding, Motivation) and the test question taught in Materi A3 for each. */
export const AREAS = bi({
  orientation: { id: "orientation" as AreaId, label: t("Orientation", "Orientierung"), hint: t("Where am I, where do I start, what comes next?", "Wo bin ich, wo fange ich an, was kommt als Nächstes?"), test: t("Can the learner tell where they are, where to start and what comes next?", "Können die Lernenden erkennen, wo sie sind, wo sie anfangen und was als Nächstes kommt?") },
  understanding: { id: "understanding" as AreaId, label: t("Understanding", "Verständnis"), hint: t("Can I follow what I read without extra effort?", "Kann ich folgen, was ich lese, ohne zusätzliche Mühe?"), test: t("Can the learner follow what they read without extra effort (length, structure, words)?", "Können die Lernenden dem Gelesenen ohne zusätzliche Mühe folgen (Länge, Struktur, Wörter)?") },
  motivation: { id: "motivation" as AreaId, label: t("Motivation", "Motivation"), hint: t("Can I see I am getting somewhere?", "Sehe ich, dass ich vorankomme?"), test: t("Can the learner see they are getting somewhere, and get a sign when they succeed?", "Können die Lernenden sehen, dass sie vorankommen, und bekommen sie ein Zeichen, wenn sie etwas schaffen?") },
});
export const AREA_LABEL = (id: AreaId) => AREAS[id].label;

/* ------------------------------------------------------------------ Block 1.1 · eight findings on the LearnFast screens */

export type FindingId = "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8";
export const FINDING_IDS: FindingId[] = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"];

type FindingDef = { id: FindingId; screen: "dashboard" | "course" | "lesson" | "quiz"; where: Tx; text: Tx; short: Tx; key: Tx; clue: Tx; why: Tx; area: AreaId };

const FINDINGS_DEF: FindingDef[] = [
  { id: "f1", screen: "dashboard", where: t("Dashboard", "Dashboard"), area: "orientation",
    text: t("The dashboard shows 14 tiles of the same size and colour. Nothing tells the learner where to start.", "Das Dashboard zeigt 14 Kacheln in gleicher Größe und Farbe. Nichts sagt den Lernenden, wo sie anfangen sollen."),
    short: t("14 equal tiles on the dashboard", "14 gleiche Kacheln auf dem Dashboard"),
    key: t("Nothing tells the learner where to start", "Nichts sagt den Lernenden, wo sie anfangen sollen"),
    clue: t("You open this screen for the first time. What do you do first, and how do you decide?", "Sie öffnen diesen Bildschirm zum ersten Mal. Was tun Sie zuerst, und woran entscheiden Sie das?"),
    why: t("The learner cannot tell where to start: orientation.", "Die Lernenden können nicht erkennen, wo sie anfangen sollen: Orientierung.") },
  { id: "f2", screen: "dashboard", where: t("Dashboard", "Dashboard"), area: "orientation",
    text: t("The course a learner opened yesterday is not on the first screen. It sits under “All courses”, four clicks away.", "Der Kurs, den eine Lernende gestern geöffnet hat, steht nicht auf dem ersten Bildschirm. Er liegt unter „Alle Kurse“, vier Klicks entfernt."),
    short: t("Yesterday's course is four clicks away", "Der Kurs von gestern ist vier Klicks entfernt"),
    key: t("not on the first screen", "nicht auf dem ersten Bildschirm"),
    clue: t("A learner comes back after one day. What must they do before they can continue, and could they lose the thread on the way?", "Eine Lernende kommt nach einem Tag zurück. Was muss sie tun, bevor sie weitermachen kann, und könnte sie unterwegs den Faden verlieren?"),
    why: t("The learner cannot find where they stopped: orientation.", "Die Lernenden finden nicht, wo sie aufgehört haben: Orientierung.") },
  { id: "f3", screen: "course", where: t("Course page", "Kursseite"), area: "orientation",
    text: t("A lesson ends and the page shows no “Next lesson” button. The learner has to go back to the list and search for the next one.", "Eine Lektion endet, und die Seite zeigt keinen Button „Nächste Lektion“. Die Lernenden müssen zur Liste zurück und die nächste suchen."),
    short: t("No “Next lesson” button", "Kein Button „Nächste Lektion“"),
    key: t("no “Next lesson” button", "keinen Button „Nächste Lektion“"),
    clue: t("The learner has just finished a lesson and wants to carry on. What does the screen tell them to do next?", "Die Lernenden haben gerade eine Lektion beendet und wollen weitermachen. Was sagt ihnen der Bildschirm, was sie als Nächstes tun sollen?"),
    why: t("The learner is not told what comes next: orientation.", "Den Lernenden wird nicht gesagt, was als Nächstes kommt: Orientierung.") },
  { id: "f4", screen: "lesson", where: t("Lesson 3", "Lektion 3"), area: "understanding",
    text: t("Lesson 3 is one block of about 500 words. It has no headings, no paragraphs and no picture.", "Lektion 3 ist ein einziger Textblock von rund 500 Wörtern. Es gibt keine Überschriften, keine Absätze und kein Bild."),
    short: t("One 500-word block of text", "Ein Textblock mit 500 Wörtern"),
    key: t("one block of about 500 words", "ein einziger Textblock von rund 500 Wörtern"),
    clue: t("You must find the main point of this lesson in one minute. How easy is it to find it?", "Sie sollen die Hauptaussage dieser Lektion in einer Minute finden. Wie leicht ist das?"),
    why: t("The learner has to dig the structure out of the text themselves: understanding.", "Die Lernenden müssen die Struktur selbst aus dem Text herausarbeiten: Verständnis.") },
  { id: "f5", screen: "lesson", where: t("Lesson 3", "Lektion 3"), area: "understanding",
    text: t("Terms such as “wireframe” and “heuristic” appear without any short explanation.", "Begriffe wie „Wireframe“ und „Heuristik“ stehen ohne jede kurze Erklärung da."),
    short: t("Technical terms without explanation", "Fachbegriffe ohne Erklärung"),
    key: t("without any short explanation", "ohne jede kurze Erklärung"),
    clue: t("A beginner reads this word for the first time. What can they do about it without leaving the lesson?", "Eine Einsteigerin liest dieses Wort zum ersten Mal. Was kann sie tun, ohne die Lektion zu verlassen?"),
    why: t("The learner stops at words they do not know: understanding.", "Die Lernenden bleiben bei Wörtern hängen, die sie nicht kennen: Verständnis.") },
  { id: "f6", screen: "lesson", where: t("Lesson 3", "Lektion 3"), area: "understanding",
    text: t("The sentences are long: most have 25 words or more, with several sub-clauses.", "Die Sätze sind lang: die meisten haben 25 Wörter oder mehr, mit mehreren Nebensätzen."),
    short: t("Very long sentences", "Sehr lange Sätze"),
    key: t("25 words or more", "25 Wörter oder mehr"),
    clue: t("Read one such sentence aloud once. Do you remember its start when you reach its end?", "Lesen Sie einen solchen Satz einmal laut. Erinnern Sie sich am Ende noch an seinen Anfang?"),
    why: t("Long sentences cost attention that is then missing for learning: understanding.", "Lange Sätze kosten Aufmerksamkeit, die dann zum Lernen fehlt: Verständnis.") },
  { id: "f7", screen: "course", where: t("Course page", "Kursseite"), area: "motivation",
    text: t("The course page has no progress bar and does not say how many lessons are left.", "Die Kursseite hat keine Fortschrittsleiste und sagt nicht, wie viele Lektionen noch fehlen."),
    short: t("No progress bar", "Keine Fortschrittsleiste"),
    key: t("no progress bar", "keine Fortschrittsleiste"),
    clue: t("You have done three lessons. How can you tell whether you are nearly done or only at the start?", "Sie haben drei Lektionen gemacht. Woran erkennen Sie, ob Sie fast fertig oder erst am Anfang sind?"),
    why: t("The learner cannot see they are getting somewhere: motivation, through progress.", "Die Lernenden sehen nicht, dass sie vorankommen: Motivation durch Fortschritt.") },
  { id: "f8", screen: "quiz", where: t("Quiz", "Quiz"), area: "motivation",
    text: t("After a quiz the screen simply reloads. No message tells the learner whether it went well.", "Nach einem Quiz lädt der Bildschirm einfach neu. Keine Meldung sagt den Lernenden, ob es gut lief."),
    short: t("No message after a quiz", "Keine Meldung nach einem Quiz"),
    key: t("No message", "Keine Meldung"),
    clue: t("You have just answered five questions. What do you know about how you did, and what does that do to your wish to go on?", "Sie haben gerade fünf Fragen beantwortet. Was wissen Sie darüber, wie es lief, und was macht das mit Ihrem Wunsch weiterzumachen?"),
    why: t("The learner gets no sign of success or failure: motivation, through feedback.", "Die Lernenden bekommen kein Zeichen von Erfolg oder Misserfolg: Motivation durch Feedback.") },
];
export const FINDINGS = bi(FINDINGS_DEF);
export const FINDING_BY_ID = Object.fromEntries(FINDINGS.map((f) => [f.id, f])) as Record<FindingId, (typeof FINDINGS)[number]>;
export const FINDING_AREA: Record<FindingId, AreaId> = Object.fromEntries(FINDINGS_DEF.map((f) => [f.id, f.area])) as Record<FindingId, AreaId>;
export const TRUTH_SORT = FINDING_AREA;

/* ------------------------------------------------------------------ Block 1.2 (Optional) · what the 40 % can and cannot tell */

export type ClaimId = "s1" | "s2" | "s3" | "s4" | "s5";
export const CLAIM_IDS: ClaimId[] = ["s1", "s2", "s3", "s4", "s5"];
export type ClaimBin = "shows" | "not";
type ClaimDef = { id: ClaimId; text: Tx; truth: ClaimBin; clue: Tx; why: Tx };
const CLAIMS_DEF: ClaimDef[] = [
  { id: "s1", truth: "shows", text: t("40 of every 100 learners who start a course do not finish it.", "40 von je 100 Lernenden, die einen Kurs beginnen, schließen ihn nicht ab."),
    clue: t("Is this a plain restatement of the number, or does it add a reason?", "Wiederholt das nur die Zahl, oder fügt es einen Grund hinzu?"), why: t("It only restates the number.", "Es wiederholt nur die Zahl.") },
  { id: "s2", truth: "not", text: t("Learners leave because the lessons are too hard.", "Die Lernenden gehen, weil die Lektionen zu schwer sind."),
    clue: t("Does the number say why anyone left?", "Sagt die Zahl, warum jemand gegangen ist?"), why: t("A drop-out rate counts who left, not why.", "Eine Abbruchquote zählt, wer gegangen ist, nicht warum.") },
  { id: "s3", truth: "not", text: t("A progress bar would bring the number down.", "Eine Fortschrittsleiste würde die Zahl senken."),
    clue: t("Does the number say what would change it?", "Sagt die Zahl, was sie verändern würde?"), why: t("A number does not predict the effect of a measure.", "Eine Zahl sagt die Wirkung einer Maßnahme nicht voraus.") },
  { id: "s4", truth: "shows", text: t("More than one in three learners who start do not finish.", "Mehr als jede dritte Lernende, die beginnt, schließt nicht ab."),
    clue: t("Compare 40 of 100 with one third of 100. Which is larger?", "Vergleichen Sie 40 von 100 mit einem Drittel von 100. Was ist größer?"), why: t("40 of 100 is more than a third (about 33).", "40 von 100 ist mehr als ein Drittel (etwa 33).") },
  { id: "s5", truth: "not", text: t("The 40 who leave are the learners who find the content boring.", "Die 40, die gehen, sind die Lernenden, die den Inhalt langweilig finden."),
    clue: t("Does the number say anything about how the learners felt?", "Sagt die Zahl etwas darüber, wie sich die Lernenden fühlten?"), why: t("It says nothing about feelings or reasons.", "Sie sagt nichts über Gefühle oder Gründe.") },
];
export const CLAIMS = bi(CLAIMS_DEF);
export const CLAIM_TRUTH: Record<ClaimId, ClaimBin> = Object.fromEntries(CLAIMS_DEF.map((c) => [c.id, c.truth])) as Record<ClaimId, ClaimBin>;
export const CLAIM_BINS = bi([
  { id: "shows" as ClaimBin, label: t("The number shows this", "Die Zahl zeigt das"), hint: t("It follows from 40 of every 100 alone.", "Es folgt allein aus 40 von je 100.") },
  { id: "not" as ClaimBin, label: t("The number does not show this", "Die Zahl zeigt das nicht"), hint: t("It needs something the number does not hold.", "Es braucht etwas, das die Zahl nicht enthält.") },
]);

/* ------------------------------------------------------------------ Block 1.3 (Optional) · coaching reflection */

export type ReflectKey = "a" | "b" | "c";
export const REFLECT = bi([
  { k: "a" as ReflectKey, q: t("Which decision really improves learning?", "Welche Entscheidung verbessert das Lernen wirklich?") },
  { k: "b" as ReflectKey, q: t("What is “nice to have”, and what is “critical”?", "Was ist „nice to have“, und was ist „kritisch“?") },
  { k: "c" as ReflectKey, q: t("Which UX decision has a business impact?", "Welche UX-Entscheidung hat Auswirkungen auf das Geschäft?") },
]);

/* ------------------------------------------------------------------ Block 2.1 (Optional) · three main causes */

export type CauseId = "c1" | "c2" | "c3" | "c4" | "c5" | "c6";
export const CAUSE_IDS: CauseId[] = ["c1", "c2", "c3", "c4", "c5", "c6"];
export const CAUSE_PICK = 3;
type CauseDef = { id: CauseId; text: Tx; expected: boolean; why: Tx };
const CAUSES_DEF: CauseDef[] = [
  { id: "c1", expected: true, text: t("Learners have no clear path through a course: what to do first, next and last.", "Die Lernenden haben keinen klaren Weg durch einen Kurs: was zuerst, als Nächstes und zuletzt zu tun ist."), why: t("The case names it (“no clear learning path”), and findings 1 to 3 show it.", "Der Fall nennt es („kein klarer Lernpfad“), und die Befunde 1 bis 3 zeigen es.") },
  { id: "c2", expected: true, text: t("Lessons are hard to follow: long, unstructured text with unexplained terms.", "Lektionen sind schwer zu folgen: langer, unstrukturierter Text mit unerklärten Begriffen."), why: t("The case names it (“content hard to understand”), and findings 4 to 6 show it.", "Der Fall nennt es („Inhalte schwer verständlich“), und die Befunde 4 bis 6 zeigen es.") },
  { id: "c3", expected: true, text: t("Learners cannot see their progress or whether they are succeeding.", "Die Lernenden sehen ihren Fortschritt nicht und nicht, ob sie Erfolg haben."), why: t("Findings 7 and 8 show it (no progress bar, no message after a quiz).", "Die Befunde 7 und 8 zeigen es (keine Fortschrittsleiste, keine Meldung nach einem Quiz).") },
  { id: "c4", expected: false, text: t("The visual style of the platform looks dated.", "Der visuelle Stil der Plattform wirkt veraltet."), why: t("No printed finding says so; it is about the surface, not the experience.", "Kein gedruckter Befund sagt das; es geht um die Oberfläche, nicht um das Erlebnis.") },
  { id: "c5", expected: false, text: t("The course catalogue is too small.", "Der Kurskatalog ist zu klein."), why: t("Nothing in the case says learners leave for lack of courses.", "Nichts im Fall sagt, dass Lernende gehen, weil es zu wenige Kurse gibt.") },
  { id: "c6", expected: false, text: t("The subscription price is too high.", "Der Preis des Abonnements ist zu hoch."), why: t("The case mentions no price complaint.", "Der Fall erwähnt keine Beschwerde über den Preis.") },
];
export const CAUSES = bi(CAUSES_DEF);
export const CAUSE_MODEL: CauseId[] = ["c1", "c2", "c3"];

/* ------------------------------------------------------------------ Block 2.2 (Core) · nine measures, choose four */

export type MeasureId = "m1" | "m2" | "m3" | "m4" | "m5" | "m6" | "m7" | "m8" | "m9";
export const MEASURE_IDS: MeasureId[] = ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9"];
export type MeasureArea = AreaId | "surface" | "feature" | "volume" | "evidence";
type MeasureDef = { id: MeasureId; name: Tx; what: Tx; notice: Tx; cost: number; weeks: number; area: MeasureArea };
const MEASURES_DEF: MeasureDef[] = [
  { id: "m1", cost: 18000, weeks: 6, area: "orientation", name: t("Define learning paths", "Lernpfade definieren"),
    what: t("For each course, set one guided path: what to do first, next and last.", "Für jeden Kurs einen geführten Pfad festlegen: was zuerst, als Nächstes und zuletzt zu tun ist."),
    notice: t("After the first lesson the learner sees “Next: lesson 2” and the whole path.", "Nach der ersten Lektion sehen die Lernenden „Weiter: Lektion 2“ und den ganzen Pfad.") },
  { id: "m2", cost: 14000, weeks: 5, area: "understanding", name: t("Split lessons into short units", "Lektionen in kurze Einheiten teilen"),
    what: t("Cut the long lessons into units of five to seven minutes, each with one goal.", "Die langen Lektionen in Einheiten von fünf bis sieben Minuten schneiden, jede mit einem Ziel."),
    notice: t("A lesson becomes a few short screens, each with a clear goal at the top.", "Aus einer Lektion werden einige kurze Bildschirme, jeder mit einem klaren Ziel oben.") },
  { id: "m3", cost: 6000, weeks: 2, area: "motivation", name: t("Add a progress indicator", "Fortschrittsanzeige einbauen"),
    what: t("Show a progress bar and the number of lessons left on every course page.", "Auf jeder Kursseite eine Fortschrittsleiste und die Zahl der verbleibenden Lektionen zeigen."),
    notice: t("The learner sees “3 of 8 lessons done” on the course page.", "Die Lernenden sehen „3 von 8 Lektionen erledigt“ auf der Kursseite.") },
  { id: "m4", cost: 9000, weeks: 3, area: "understanding", name: t("Structure the text of each lesson", "Den Text jeder Lektion strukturieren"),
    what: t("Add headings, short paragraphs and a picture, and explain each technical term in one line.", "Überschriften, kurze Absätze und ein Bild ergänzen und jeden Fachbegriff in einer Zeile erklären."),
    notice: t("A lesson can be scanned: headings show the structure, a term shows its meaning on tap.", "Eine Lektion lässt sich überfliegen: Überschriften zeigen die Struktur, ein Begriff zeigt seine Bedeutung per Tipp.") },
  { id: "m5", cost: 12000, weeks: 4, area: "motivation", name: t("Points and badges", "Punkte und Badges"),
    what: t("Give points and badges for each finished lesson.", "Für jede beendete Lektion Punkte und Badges vergeben."),
    notice: t("After a lesson a badge appears and the point total goes up.", "Nach einer Lektion erscheint ein Badge, und die Punktzahl steigt.") },
  { id: "m6", cost: 22000, weeks: 8, area: "feature", name: t("Discussion forum", "Diskussionsforum"),
    what: t("Add a forum where learners can ask each other questions.", "Ein Forum ergänzen, in dem Lernende einander Fragen stellen können."),
    notice: t("A new “Forum” entry appears in the menu.", "Im Menü erscheint ein neuer Eintrag „Forum“.") },
  { id: "m7", cost: 15000, weeks: 4, area: "surface", name: t("New visual style", "Neuer visueller Stil"),
    what: t("Redesign colours, icons and fonts of the whole platform.", "Farben, Icons und Schriften der ganzen Plattform neu gestalten."),
    notice: t("The platform looks different; the way it works stays the same.", "Die Plattform sieht anders aus; die Bedienung bleibt gleich.") },
  { id: "m8", cost: 20000, weeks: 8, area: "volume", name: t("Ten new courses", "Zehn neue Kurse"),
    what: t("Add ten new courses to the catalogue.", "Zehn neue Kurse in den Katalog aufnehmen."),
    notice: t("The catalogue is longer; the courses work as before.", "Der Katalog ist länger; die Kurse funktionieren wie bisher.") },
  { id: "m9", cost: 7000, weeks: 3, area: "evidence", name: t("Interview learners who left, and test one course", "Ausgestiegene Lernende befragen und einen Kurs testen"),
    what: t("Interview ten learners who left and run a usability test of one course.", "Zehn ausgestiegene Lernende befragen und einen Kurs im Usability-Test prüfen."),
    notice: t("Nothing changes on screen yet; SkillUp learns why learners stop.", "Auf dem Bildschirm ändert sich noch nichts; SkillUp erfährt, warum Lernende aufhören.") },
];
export const MEASURES = bi(MEASURES_DEF);
export const MEASURE_BY_ID = Object.fromEntries(MEASURES.map((m) => [m.id, m])) as Record<MeasureId, (typeof MEASURES)[number]>;
export const MEASURE_AREA = bi({
  orientation: t("Acts on: Orientation", "Wirkt auf: Orientierung"),
  understanding: t("Acts on: Understanding", "Wirkt auf: Verständnis"),
  motivation: t("Acts on: Motivation", "Wirkt auf: Motivation"),
  surface: t("Acts on: the look, not the experience", "Wirkt auf: das Aussehen, nicht das Erlebnis"),
  feature: t("Adds a new feature", "Fügt eine neue Funktion hinzu"),
  volume: t("Adds more content", "Fügt mehr Inhalt hinzu"),
  evidence: t("Gathers evidence", "Sammelt Belege"),
});

/** Effort follows the printed cost (a rule taught in Materi A5): under €10,000 Low, €10,000 to €15,000 Mid, above that High. */
export const EFFORT_LOW_MAX = 9999;
export const EFFORT_MID_MAX = 15000;
export const effortBand = (cost: number): 1 | 2 | 3 => (cost <= EFFORT_LOW_MAX ? 1 : cost <= EFFORT_MID_MAX ? 2 : 3);

export const totalCost = (ids: MeasureId[]) => ids.reduce((s, id) => s + MEASURE_BY_ID[id].cost, 0);
export const longestWeeks = (ids: MeasureId[]) => ids.reduce((m, id) => Math.max(m, MEASURE_BY_ID[id].weeks), 0);

/** The plan's Musterlösung (Kernlogik) for the case study: learning paths first, modular content, a progress indicator, less load. */
export const MODEL_MEASURES: MeasureId[] = ["m1", "m2", "m3", "m4"];
export const MODEL_IMPACT: Record<string, 1 | 2 | 3> = { m1: 3, m2: 2, m3: 2, m4: 2 };
export const MODEL_RISK: Record<string, 1 | 2 | 3> = { m1: 2, m2: 2, m3: 1, m4: 1 };
