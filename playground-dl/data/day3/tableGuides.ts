import { bi, t } from "@/lib/lang";
import type { TableGuide } from "@/components/ui/FormOrTable";

/**
 * Day 3 · the guided tables (DL-STANDARD section 15). Each table a learner can choose has a hint per column and one grey example row from another
 * platform or company (a cooking-class platform, a language-learning app, a hospital course), never an answer to EduCore. The hints and the example only
 * show on screen; they are not exported, not checked and not in the mentor key.
 */
const TITLE = t("How to fill this table", "So füllen Sie diese Tabelle aus");
const EXAMPLE = t("Example from another company, not this case", "Beispiel aus einem anderen Unternehmen, nicht aus diesem Fall");
const SCALE = {
  values: [
    { id: "low", label: t("Low", "Niedrig") },
    { id: "medium", label: t("Medium", "Mittel") },
    { id: "high", label: t("High", "Hoch") },
  ],
  note: t("A scale many teams use (optional):", "Eine Skala, die viele Teams nutzen (optional):"),
};
const ONE_ANSWER = t("write each part in your own words; a sentence each is enough", "schreiben Sie jeden Teil in eigenen Worten; ein Satz je Teil genügt");
const PARTS = t("the three parts of the rule", "die drei Teile der Regel");
const EX_FIRST = t("Example (another company)", "Beispiel (anderes Unternehmen)");

/** Block 1.1 question 1: five problems, each with how it is for the learner. */
export const PROBLEMS_GUIDE = bi({
  title: TITLE,
  exampleLabel: EXAMPLE,
  hints: {
    first: t("a problem you meet as a learner, in a few words", "ein Problem, das Sie als Lernende erleben, in wenigen Worten"),
    side: t("how it is for you: what you feel, think or do then", "wie es für Sie ist: was Sie dann fühlen, denken oder tun"),
  },
  example: {
    first: t("A menu with fifteen entries on the first screen (a cooking-class platform)", "Ein Menü mit fünfzehn Einträgen auf dem ersten Bildschirm (eine Kochkurs-Plattform)"),
    cells: { side: t("I do not know which entry to open first, so I close the page.", "Ich weiß nicht, welchen Eintrag ich zuerst öffnen soll, und schließe die Seite.") },
  },
}) as TableGuide;

/** Block 1.2 question 1: learning impact, effort and risk of each option. */
export const ASSESS_GUIDE = bi({
  title: TITLE,
  exampleLabel: EXAMPLE,
  hints: {
    first: t("the option you assess", "die Option, die Sie bewerten"),
    impact: t("what it changes for the learner's learning", "was es für das Lernen der Lernenden ändert"),
    effort: t("how much work and time it takes", "wie viel Arbeit und Zeit es braucht"),
    risk: t("what could go wrong or backfire", "was schiefgehen oder nach hinten losgehen könnte"),
  },
  example: {
    first: t("A summary page at the end of each lesson (a language-learning app)", "Eine Zusammenfassung am Ende jeder Lektion (eine Sprachlern-App)"),
    cells: {
      impact: t("Medium: learners see the key points again.", "Mittel: Lernende sehen die Kernpunkte noch einmal."),
      effort: t("Low: one template for every lesson.", "Gering: eine Vorlage für jede Lektion."),
      risk: t("Low: little can go wrong.", "Gering: Es kann wenig schiefgehen."),
    },
  },
  suggest: { impact: SCALE, effort: SCALE, risk: SCALE },
}) as TableGuide;

/** Block 2.1 questions 1 and 2: a cause of the overload and the improvement that answers it. */
export const CAUSES_GUIDE = bi({
  title: TITLE,
  exampleLabel: EXAMPLE,
  hints: {
    first: t("one cause of the overload, on the platform", "eine Ursache der Überlastung, auf der Plattform"),
    improvement: t("the improvement that answers this cause", "die Verbesserung, die diese Ursache beantwortet"),
  },
  example: {
    first: t("Five pop-ups appear while the learner reads (a video-learning site)", "Während die Lernende liest, erscheinen fünf Pop-ups (eine Video-Lernseite)"),
    cells: { improvement: t("Show one message at a time, and only after the lesson.", "Nur eine Meldung zur Zeit zeigen, und erst nach der Lektion.") },
  },
}) as TableGuide;

/** Route 2, question 2: three prioritised measures, the first priority first. */
export const MEASURES_GUIDE = bi({
  title: TITLE,
  exampleLabel: EXAMPLE,
  hints: {
    first: t("the place in the order: the first priority is number 1", "der Platz in der Reihenfolge: die erste Priorität ist Nummer 1"),
    measure: t("an action that lowers the load, in a few words", "eine Maßnahme, die die Belastung senkt, in wenigen Worten"),
    why: t("why it has this place: what it removes or unlocks", "warum sie diesen Platz hat: was sie entfernt oder freischaltet"),
  },
  example: {
    first: t("1", "1"),
    cells: {
      measure: t("State the goal at the start of every lesson (a language-learning app)", "Das Ziel am Anfang jeder Lektion nennen (eine Sprachlern-App)"),
      why: t("Cheap, helps every learner and needs no new data.", "Günstig, hilft jeder Lernenden und braucht keine neuen Daten."),
    },
  },
}) as TableGuide;

/** Route 2, question 4: the two sides of the risk. */
export const RISK_GUIDE = bi({
  title: TITLE,
  exampleLabel: EXAMPLE,
  hints: {
    first: t("the two sides of the risk", "die beiden Seiten des Risikos"),
    goes: t("what goes wrong on this side", "was auf dieser Seite schiefgeht"),
    action: t("what you do about it, and what you would notice", "was Sie dagegen tun und was Sie bemerken würden"),
  },
  example: {
    first: t("Example (a hospital course)", "Beispiel (ein Kurs im Krankenhaus)"),
    cells: {
      goes: t("Too simple: staff click through to the end without reading, and mistakes continue in practice.", "Zu einfach: Mitarbeitende klicken bis zum Ende durch, ohne zu lesen, und Fehler passieren weiter in der Praxis."),
      action: t("Two questions at the end of every unit; a wrong answer shows the page again.", "Zwei Fragen am Ende jeder Einheit; eine falsche Antwort zeigt die Seite noch einmal."),
    },
  },
}) as TableGuide;

/** Route 2, question 5: a decision logic in three parts. */
export const LOGIC_GUIDE = bi({
  title: TITLE,
  exampleLabel: EXAMPLE,
  hints: { first: PARTS, text: ONE_ANSWER },
  example: {
    first: EX_FIRST,
    cells: { text: t("Each new module needs one goal and a short task; the editor in chief decides on Fridays; a module that fails goes back to its author with the failed check named.", "Jedes neue Modul braucht ein Ziel und eine kurze Aufgabe; die Chefredakteurin entscheidet freitags; ein Modul, das durchfällt, geht mit der genannten Prüfung an die Autorin zurück.") },
  },
}) as TableGuide;

/** Route 2, question 6: the decision under uncertainty in three parts. */
export const UNC_GUIDE = bi({
  title: TITLE,
  exampleLabel: EXAMPLE,
  hints: { first: t("the three parts of the decision", "die drei Teile der Entscheidung"), text: ONE_ANSWER },
  example: {
    first: EX_FIRST,
    cells: { text: t("I decide to send a reminder to learners who have been silent for three days. I do not know whether they find it helpful or annoying. I would reverse it if more learners switch it off than come back within six weeks.", "Ich entscheide, Lernenden eine Erinnerung zu schicken, die drei Tage nichts getan haben. Ich weiß nicht, ob sie sie hilfreich oder lästig finden. Ich nähme sie zurück, wenn innerhalb von sechs Wochen mehr Lernende sie abschalten als zurückkommen.") },
  },
}) as TableGuide;
