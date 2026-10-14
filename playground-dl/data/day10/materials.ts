import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/day1/materials";

/**
 * Day 10 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow the
 * topic groups of the plan's Wissen cell (visual feedback; progress tracking systems; responsive design; accessibility in the responsive context; then UX as a steering
 * and feedback system, the conflicts, and a decision without retention data by device). A4 (accessibility in the responsive context) is Optional: the target size, the
 * contrast and the rule “words as well as colours” that a Core block needs are repeated in A3 and B1 (CLAUDE.md #35, #40).
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("Visual feedback: direct and indirect feedback as a tool for motivation and steering", "Visuelles Feedback: direktes und indirektes Feedback als Werkzeug für Motivation und Steuerung"), minutes: 14 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("Progress tracking systems: bars, levels and status, and their risks", "Fortschrittsanzeigen: Balken, Level und Status, und ihre Risiken"), minutes: 14 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("Responsive design for learning platforms: devices, contexts and priorities", "Responsive Design für Lernplattformen: Geräte, Kontexte und Prioritäten"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Accessibility in the responsive context: operability, legibility and reach", "Barrierefreiheit im responsiven Kontext: Bedienbarkeit, Lesbarkeit und Reichweite"), minutes: 10, optional: true },
  { id: "A5" as MaterialId, block: "A" as const, title: t("Weighing a feedback, tracking or mobile measure: impact, effort, risk", "Eine Maßnahme für Feedback, Fortschritt oder Mobil abwägen: Wirkung, Aufwand, Risiko"), minutes: 10 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("UX as a steering and feedback system: transparency, motivation, usage", "UX als Steuerungs- und Feedbacksystem: Transparenz, Motivation, Nutzung"), minutes: 18 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Conflicting goals: information density against clarity, feedback against overload, flexibility against consistency", "Zielkonflikte: Informationsdichte gegen Klarheit, Feedback gegen Überlastung, Flexibilität gegen Konsistenz"), minutes: 22 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Deciding without retention data by device: a system you can check later", "Entscheiden ohne Bindungsdaten pro Gerät: ein System, das Sie später prüfen können"), minutes: 20 },
]);

/** "In plain words" (CLAUDE.md #22, #51). */
const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "Feedback is what a platform tells a learner back after they act. It matters in the learning process because it shows that the action counted and what it means. There are two kinds: direct feedback, such as correct or incorrect, and indirect feedback, such as visible progress. Used well, feedback is a tool for motivation and steering.",
      "Feedback ist das, was eine Plattform einer Lernenden zurückmeldet, nachdem sie gehandelt hat. Es zählt im Lernprozess, weil es zeigt, dass die Aktion zählte und was sie bedeutet. Es gibt zwei Arten: direktes Feedback, etwa richtig oder falsch, und indirektes Feedback, etwa sichtbarer Fortschritt. Gut genutzt ist Feedback ein Werkzeug für Motivation und Steuerung.",
    ),
    why: t(
      "In Task 1 you sort facts about a platform into missing feedback, unclear progress and poor use on a phone, and you say how they affect motivation. The first of these comes from this card.",
      "In Task 1 ordnen Sie Fakten über eine Plattform in fehlendes Feedback, unklaren Fortschritt und schlechte Nutzung auf dem Handy und sagen, wie sie die Motivation beeinflussen. Das erste davon kommt aus dieser Karte.",
    ),
    picture: t(
      "The same LearnLoop question three ways: no answer, a bare red cross, and an explained result with a next step. Choose one and read what Kim feels. Press “Walk me through it” for a short story.",
      "Dieselbe LearnLoop-Frage auf drei Arten: keine Antwort, ein nacktes rotes Kreuz und ein erklärtes Ergebnis mit nächstem Schritt. Wählen Sie eines und lesen Sie, was Kim fühlt. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  A2: {
    idea: t(
      "A progress tracking system shows the learner how far along they are, with progress bars, levels or status indicators. It answers “how far along am I?”, which makes the learning process transparent, and it raises motivation and the completion rate. Its risks are a misleading display and demotivation when the learner is overwhelmed.",
      "Eine Fortschrittsanzeige zeigt der Lernenden, wie weit sie ist, mit Fortschrittsbalken, Leveln oder Statusanzeigen. Sie beantwortet „Wie weit bin ich?“, was den Lernprozess transparent macht, und steigert Motivation und Abschlussquote. Ihre Risiken sind eine irreführende Anzeige und Demotivation bei Überforderung.",
    ),
    why: t(
      "In Task 1 you choose measures for transparency, and in Task 2 you design a tracking strategy and name how it could mislead.",
      "In Task 1 wählen Sie Maßnahmen für Transparenz, und in Task 2 entwerfen Sie eine Fortschrittsstrategie und nennen, wie sie täuschen könnte.",
    ),
    picture: t(
      "The same course page three ways: no progress, a bar that jumps to 90% and then crawls, and an honest display “3 of 8”. Choose one and read what Raj feels. Press “Walk me through it” for a short story.",
      "Dieselbe Kursseite auf drei Arten: kein Fortschritt, ein Balken, der auf 90 % springt und dann kriecht, und eine ehrliche Anzeige „3 von 8“. Wählen Sie eine und lesen Sie, was Raj fühlt. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  A3: {
    idea: t(
      "Responsive design adapts a platform to different devices (desktop, tablet, mobile) and to the different contexts in which they are used. It prioritises content by device: what is the same everywhere, what comes first on a phone, what only fits a large screen. A learner who studies on a phone in a few free minutes needs a different order than one at a desk.",
      "Responsive Design passt eine Plattform an verschiedene Geräte (Desktop, Tablet, Mobil) und an die verschiedenen Kontexte an, in denen sie genutzt werden. Es priorisiert Inhalt nach Gerät: was überall gleich ist, was auf dem Handy zuerst kommt, was nur auf einen großen Bildschirm passt. Eine Lernende, die in ein paar freien Minuten auf dem Handy lernt, braucht eine andere Reihenfolge als eine am Schreibtisch.",
    ),
    why: t(
      "In Block 1.1 a fact about a phone screen is one of the three problems, and in Block 3.1 you place content by device. The coaching says responsive design is not an option, but a prerequisite.",
      "In Block 1.1 ist ein Fakt zu einem Handybildschirm eines der drei Probleme, und in Block 3.1 ordnen Sie Inhalt nach Gerät. Das Coaching sagt, Responsive Design ist keine Option, sondern eine Voraussetzung.",
    ),
    picture: t(
      "The same LearnLoop lesson on four screens: a phone that was not adapted, a phone that was, a tablet and a desktop. Choose one and read what Nia can do. Press “Walk me through it” for a short story.",
      "Dieselbe LearnLoop-Lektion auf vier Bildschirmen: ein Handy, das nicht angepasst wurde, eines, das angepasst wurde, ein Tablet und ein Desktop. Wählen Sie eines und lesen Sie, was Nia tun kann. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  A4: {
    idea: t(
      "In the responsive context accessibility means three things: operability on all devices (targets large enough to hit), legibility (contrast and text that fits), and interaction that works for more people. It is the link to inclusive design from Day 7, and it means scalability and reach: the same design works for more learners.",
      "Im responsiven Kontext bedeutet Barrierefreiheit drei Dinge: Bedienbarkeit auf allen Geräten (Ziele, die groß genug zum Treffen sind), Lesbarkeit (Kontrast und Text, der passt) und Interaktion, die für mehr Menschen funktioniert. Sie ist die Verbindung zum inklusiven Design von Tag 7 und bedeutet Skalierbarkeit und Reichweite: Dasselbe Design funktioniert für mehr Lernende.",
    ),
    why: t(
      "Block 3.1 asks for an accessibility integration. The core rules (target size, contrast, words as well as colour) are repeated in A3 and B1, so no Core block needs this card.",
      "Block 3.1 verlangt eine Integration von Barrierefreiheit. Die Kernregeln (Zielgröße, Kontrast, Worte zusätzlich zu Farbe) stehen auch in A3 und B1, kein Kernblock braucht diese Karte also.",
    ),
    picture: t(
      "A LearnLoop phone screen with three switches: large targets, strong contrast and status in words. Switch them on one at a time and read who gains. Press “Walk me through it” for a short story.",
      "Ein LearnLoop-Handybildschirm mit drei Schaltern: große Ziele, starker Kontrast und Status in Worten. Schalten Sie sie nacheinander ein und lesen Sie, wer profitiert. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  A5: {
    idea: t(
      "To choose between feedback, tracking and mobile measures, rate each on the same three questions. Impact: how much does it do for motivation and for finishing a course? Effort: money and time, decided here by a rule: under €8,000 is Low, up to €16,000 is Mid, above that is High. Risk: what could go wrong, for example a display that misleads or feedback that overloads.",
      "Um zwischen Maßnahmen für Feedback, Fortschritt und Mobil zu wählen, bewerten Sie jede mit denselben drei Fragen. Wirkung: Wie viel bewirkt sie für Motivation und für das Beenden eines Kurses? Aufwand: Geld und Zeit, hier von einer Regel entschieden: unter 8.000 € ist Niedrig, bis 16.000 € Mittel, darüber Hoch. Risiko: Was kann schiefgehen, zum Beispiel eine Anzeige, die irreführt, oder Feedback, das überlastet.",
    ),
    why: t(
      "Block 1.2 and Block 2.2 of the task ask for exactly this. The example uses LearnLoop, so the answer for the task case is not given.",
      "Block 1.2 und Block 2.2 der Aufgabe verlangen genau das. Das Beispiel nutzt LearnLoop, damit die Antwort für den Aufgabenfall nicht verraten wird.",
    ),
    picture: t(
      "Three small pictures show LearnLoop's three measures, the bars show the cost of each against the effort rule and the €30,000 budget, and the table gives the rating of each; select a cell to read the reason. Press “Walk me through it” for a short story.",
      "Drei kleine Bilder zeigen LearnLoops drei Maßnahmen, die Balken zeigen die Kosten jeder gegen die Aufwandsregel und das Budget von 30.000 €, und die Tabelle gibt die Bewertung jeder; wählen Sie eine Zelle, um den Grund zu lesen. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  B1: {
    idea: t(
      "The plan's coaching says that UX is a steering and feedback system: users need orientation and feedback; making progress visible increases motivation; responsive design is not an option but a prerequisite; accessibility means scalability and reach. The chain runs from feedback to visible progress, to motivation, to usage.",
      "Das Coaching des Plans sagt, dass UX ein Steuerungs- und Feedbacksystem ist: Nutzer brauchen Orientierung und Feedback; Fortschritt sichtbar zu machen steigert die Motivation; Responsive Design ist keine Option, sondern eine Voraussetzung; Barrierefreiheit bedeutet Skalierbarkeit und Reichweite. Die Kette läuft von Feedback über sichtbaren Fortschritt zu Motivation und Nutzung.",
    ),
    why: t(
      "Task 2 asks you to design the feedback, the tracking, the responsive concept and the accessibility integration as one system, in order of priority.",
      "Task 2 verlangt von Ihnen, das Feedback, die Fortschrittsanzeige, das responsive Konzept und die Barrierefreiheits-Integration als ein System zu entwerfen, in Prioritätsreihenfolge.",
    ),
    picture: t(
      "The chain reads from left to right: feedback, visible progress, motivation, usage. Below it, the parts of a system and the accessibility rules. Nothing to click.",
      "Die Kette liest sich von links nach rechts: Feedback, sichtbarer Fortschritt, Motivation, Nutzung. Darunter die Teile eines Systems und die Regeln der Barrierefreiheit. Nichts zum Klicken.",
    ),
  },
  B2: {
    idea: t(
      "The plan's conflicts for Day 10 are information density against clarity, feedback against overload, and flexibility against consistency. A screen that shows everything is not clear; feedback after every click is overload; a layout tuned to each device can break consistency. The aim is to show what the learner needs to decide the next step, and to give feedback where it counts.",
      "Die Konflikte des Plans für Tag 10 sind Informationsdichte gegen Klarheit, Feedback gegen Überlastung und Flexibilität gegen Konsistenz. Ein Bildschirm, der alles zeigt, ist nicht klar; Feedback nach jedem Klick ist Überlastung; ein auf jedes Gerät abgestimmtes Layout kann die Konsistenz brechen. Das Ziel ist, zu zeigen, was die Lernende braucht, um den nächsten Schritt zu entscheiden, und Feedback dort zu geben, wo es zählt.",
    ),
    why: t(
      "Task 2 asks for a risk analysis and for prioritised measures. The rules of this card tell you how to weigh them.",
      "Task 2 verlangt eine Risikoanalyse und priorisierte Maßnahmen. Die Regeln dieser Karte sagen Ihnen, wie Sie sie abwägen.",
    ),
    picture: t(
      "The matrix places five LearnLoop progress screens by the information they show (to the right) and the clarity they keep (upwards). The position is a reading of the example, not a score. The top right is the aim. Select a point to read why it sits there. Press “Walk me through it” for a short story.",
      "Die Matrix ordnet fünf LearnLoop-Fortschrittsbildschirme nach der Information, die sie zeigen (nach rechts), und der Klarheit, die sie behalten (nach oben). Die Position ist eine Lesart des Beispiels, keine Note. Oben rechts ist das Ziel. Wählen Sie einen Punkt, um zu lesen, warum er dort liegt. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  B3: {
    idea: t(
      "The plan asks you to decide under uncertainty. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. For a feedback and tracking decision the usual unknown is whether the change raises retention, and whether it does so on phones, where most learners are.",
      "Der Plan verlangt, unter Unsicherheit zu entscheiden. Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten. Bei einer Entscheidung zu Feedback und Fortschrittsanzeige ist das übliche Unbekannte, ob die Änderung die Bindung erhöht und ob sie das auf Handys tut, wo die meisten Lernenden sind.",
    ),
    why: t(
      "Block 3.2 asks for exactly this, together with prioritised measures and a risk analysis.",
      "Block 3.2 verlangt genau das, zusammen mit priorisierten Maßnahmen und einer Risikoanalyse.",
    ),
    picture: t(
      "The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions. Nothing to click.",
      "Die vier Kästen oben sind die Teile der Entscheidung, für LearnLoop ausgefüllt. Die zwei Kästen darunter sind die Regel für künftige Entscheidungen. Nichts zum Klicken.",
    ),
  },
});

const M = makeMaterials(10, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
