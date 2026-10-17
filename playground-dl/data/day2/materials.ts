import { bi, t } from "@/lib/lang";
import type { MaterialId, Block, MaterialMeta, PlainExplain } from "@/data/day1/materials";

/**
 * Day 2 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60
 * minutes. The cards follow the topic groups of the plan's Wissen cell (success factors of e-learning platforms, learning paths,
 * microlearning, feedback systems, prototyping, usability tests and KPIs, adaptive learning and its risks, conflicting goals of Day 2).
 * All five cards of Materi A are Core: the case study (Block 2.1) and Route 2 both rest on the adaptive-learning card A4 (CLAUDE.md #57).
 * The cards teach and the tasks are free answers, so no card prints a rule the tasks cannot use.
 */
export type { MaterialId, Block, MaterialMeta, PlainExplain };

export const MATERIALS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as Block, title: t("What successful learning platforms have in common", "Was erfolgreiche Lernplattformen gemeinsam haben"), minutes: 12 },
  { id: "A2" as MaterialId, block: "A" as Block, title: t("Prototyping: test the idea before you build it", "Prototyping: die Idee testen, bevor man sie baut"), minutes: 12 },
  { id: "A3" as MaterialId, block: "A" as Block, title: t("Testing a learning interface: whom, how and what you measure", "Ein Lerninterface testen: wen, wie und was man misst"), minutes: 14 },
  { id: "A4" as MaterialId, block: "A" as Block, title: t("Adaptive learning: what it is, what it needs, what it risks", "Adaptives Lernen: was es ist, was es braucht, was es riskiert"), minutes: 10 },
  { id: "A5" as MaterialId, block: "A" as Block, title: t("Weighing a prototyping and testing decision: benefit, risk, effort", "Eine Prototyping- und Testentscheidung abwägen: Nutzen, Risiko, Aufwand"), minutes: 12 },
  { id: "B1" as MaterialId, block: "B" as Block, title: t("UX investments as staged bets", "UX-Investitionen als gestufte Wetten"), minutes: 18 },
  { id: "B2" as MaterialId, block: "B" as Block, title: t("Conflicting goals: personalisation, hype and scale", "Zielkonflikte: Personalisierung, Hype und Skalierung"), minutes: 22 },
  { id: "B3" as MaterialId, block: "B" as Block, title: t("Deciding under uncertainty: pilots, gates and a rule for next time", "Unter Unsicherheit entscheiden: Piloten, Gates und eine Regel für das nächste Mal"), minutes: 20 },
]);
export const MATERIAL_BY_ID = Object.fromEntries(MATERIALS.map((m) => [m.id, m])) as Record<MaterialId, MaterialMeta>;
export const materialAnchorId = (id: MaterialId) => `mat-${id}`;
/** Card ids are stored with the day in front, so two days never share a "read" mark. */
export const readKey = (id: MaterialId) => `d2:${id}`;

/* ------------------------------------------------------------------ "In plain words" (CLAUDE.md #22, #51) */

export const MATERIAL_PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "A learning platform is successful when learners start, carry on and finish, and then come back. The plan names three success factors: engagement (they do things), completion rate (they finish) and user guidance (they know where to go). Three practices appear again and again behind them: a clear learning path, microlearning (short units) and feedback systems. Each one answers a question every learner asks without saying it: what do I do next, can I do this in the time I have, and am I getting somewhere? The plan also names UX as a driver of learning motivation and retention: a learner who knows where to go, can finish in the time they have and sees progress is more likely to stay motivated and to come back.",
      "Eine Lernplattform ist erfolgreich, wenn Lernende beginnen, dranbleiben, abschließen und dann wiederkommen. Der Plan nennt drei Erfolgsfaktoren: Engagement (sie tun etwas), Completion Rate (sie schließen ab) und Nutzerführung (sie wissen, wohin). Dahinter stehen immer wieder drei Praktiken: ein klarer Lernpfad, Microlearning (kurze Einheiten) und Feedback-Systeme. Jede beantwortet eine Frage, die jede Lernende stellt, ohne sie auszusprechen: Was tue ich als Nächstes, schaffe ich das in der Zeit, die ich habe, und komme ich voran? Der Plan nennt UX außerdem als Treiber von Lernmotivation und Bindung (Retention): Wer weiß, wohin, in der verfügbaren Zeit fertig werden kann und Fortschritt sieht, bleibt eher motiviert und kommt eher wieder.",
    ),
    why: t(
      "In Block 1.1 you say which of two platforms you prefer and why, find five differences between them, and derive three principles of success in your own words.",
      "In Block 1.1 sagen Sie, welche von zwei Plattformen Sie bevorzugen und warum, finden fünf Unterschiede zwischen ihnen und leiten drei Erfolgsprinzipien in eigenen Worten ab.",
    ),
    picture: t(
      "The two screens show the same course built in two ways. On the left you can see a path, short units, a progress bar and a quiz result; on the right there is one long page and nothing else. Compare them part by part. Nothing to click.",
      "Die beiden Bildschirme zeigen denselben Kurs in zwei Bauweisen. Links sehen Sie einen Pfad, kurze Einheiten, eine Fortschrittsleiste und ein Quizergebnis; rechts gibt es eine lange Seite und sonst nichts. Vergleichen Sie sie Teil für Teil. Nichts zum Klicken.",
    ),
  },
  A2: {
    idea: t(
      "A prototype is an early, simple version of a screen or a flow, made so that you can test an idea before you build the real thing. It can be a sketch on paper or a clickable mock-up. Low-fidelity means rough and plain, high-fidelity means polished. The purpose is quick validation, not perfection: the rougher the version, the faster and cheaper it is to change, so a mistake costs little.",
      "Ein Prototyp ist eine frühe, einfache Version eines Bildschirms oder Ablaufs, gemacht, um eine Idee zu testen, bevor man das Echte baut. Er kann eine Skizze auf Papier oder ein klickbares Mock-up sein. Low-Fidelity heißt grob und schlicht, High-Fidelity heißt ausgearbeitet. Der Zweck ist schnelle Validierung, nicht Perfektion: Je gröber die Version, desto schneller und billiger lässt sie sich ändern, ein Fehler kostet also wenig.",
    ),
    why: t(
      "In Block 1.2 you assess three options for prototyping and testing under time pressure and a limited budget, when the needs of users are still unclear, and you decide. In Block 2.1 you develop a prototype approach. This card gives you the reasons for starting with a low-fidelity test.",
      "In Block 1.2 bewerten Sie drei Optionen für Prototyping und Testen unter Zeitdruck und mit begrenztem Budget, solange die Bedürfnisse der Nutzer noch unklar sind, und entscheiden sich. In Block 2.1 entwickeln Sie einen Prototyping-Ansatz. Diese Karte gibt Ihnen die Gründe, mit einem Low-Fidelity-Test zu beginnen.",
    ),
    picture: t(
      "The loop shows iterative design: build a small version, measure what learners do, learn from it, and repeat. Below it, the same course-start screen is drawn four times, from a paper sketch to a polished design. Press “Move the Next button” to see what the same change costs on each, and select a picture to read what it tests. Press “Read the comic” for a short story.",
      "Die Schleife zeigt iteratives Design: eine kleine Version bauen, messen, was Lernende tun, daraus lernen und wiederholen. Darunter ist derselbe Kursstart-Bildschirm viermal gezeichnet, von der Papierskizze bis zum ausgearbeiteten Design. Drücken Sie „Weiter-Button verschieben“, um zu sehen, was dieselbe Änderung auf jeder Stufe kostet, und wählen Sie ein Bild, um zu lesen, was es testet. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A3: {
    idea: t(
      "A usability test watches real users try a real task, for example “find your next lesson”, while they say what they think. It is task-based and usually needs only a handful of users per group. Alongside it, you can measure numbers (KPIs) such as the drop-out rate, the time to finish a task and a comprehension score. Qualitative data says why; quantitative data says how many. A few users are enough for a first test, because later users mostly repeat what earlier ones found.",
      "Ein Usability-Test beobachtet echte Nutzer dabei, wie sie eine echte Aufgabe versuchen, zum Beispiel „Finden Sie Ihre nächste Lektion“, während sie sagen, was sie denken. Er ist aufgabenbasiert und braucht meist nur eine Handvoll Nutzer pro Gruppe. Daneben können Sie Zahlen (KPIs) messen, etwa die Abbruchquote, die Zeit bis zum Abschluss einer Aufgabe und einen Verständniswert. Qualitative Daten sagen, warum; quantitative Daten sagen, wie viele. Für einen ersten Test genügen wenige Nutzer, denn spätere Nutzer wiederholen meist, was frühere schon gefunden haben.",
    ),
    why: t(
      "In Block 2.1 you define three UX tests for a platform in which learners drop out and no one knows why: what you test, how, and what you measure. This card tells you what each kind of test can answer.",
      "In Block 2.1 definieren Sie drei UX-Tests für eine Plattform, auf der Lernende abbrechen und niemand weiß, warum: was Sie testen, wie und was Sie messen. Diese Karte sagt Ihnen, was jede Art von Test beantworten kann.",
    ),
    picture: t(
      "Select a number of test users to see the share of problems found in Nielsen and Landauer's model. Below it, one picture shows five learners watched (qualitative) next to a chart of many learners counted (quantitative). Press “Read the comic” for a short story.",
      "Wählen Sie eine Anzahl Testnutzer, um den Anteil gefundener Probleme im Modell von Nielsen und Landauer zu sehen. Darunter zeigt ein Bild fünf beobachtete Lernende (qualitativ) neben einem Diagramm vieler gezählter Lernender (quantitativ). Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A4: {
    idea: t(
      "Adaptive learning means the platform adjusts the next step, the difficulty or the order of content to the learner. The adjustment can follow a simple rule (if the pre-test is passed, skip the basics) or an algorithm that learns from data. Recommendation systems and learning analytics are tools for it. Adaptive systems can personalise, but they need data, content in several variants and a way to explain what they do. Learning analytics, the reading of learners' data to see where they struggle, feeds such systems, and a platform that learns from its data is one way of seeing UX as a data-driven, future-oriented system.",
      "Adaptives Lernen heißt, dass die Plattform den nächsten Schritt, den Schwierigkeitsgrad oder die Reihenfolge der Inhalte an die Lernende anpasst. Die Anpassung kann einer einfachen Regel folgen (wenn der Vortest bestanden ist, die Grundlagen überspringen) oder einem Algorithmus, der aus Daten lernt. Empfehlungssysteme und Learning Analytics sind Werkzeuge dafür. Adaptive Systeme können personalisieren, brauchen aber Daten, Inhalte in mehreren Varianten und eine Möglichkeit, zu erklären, was sie tun. Learning Analytics, das Auslesen von Lerndaten, um zu sehen, wo Lernende sich schwertun, speist solche Systeme, und eine Plattform, die aus ihren Daten lernt, ist eine Art, UX als datengetriebenes, zukunftsorientiertes System zu sehen.",
    ),
    why: t(
      "Blocks 2.1 and 3.1 ask whether adaptive learning is worthwhile. This card gives you the opportunities and the risks, so that you can say “yes, no or partly” and give a reason.",
      "Die Blöcke 2.1 und 3.1 fragen, ob adaptives Lernen lohnt. Diese Karte gibt Ihnen die Chancen und die Risiken, damit Sie „ja, nein oder teilweise“ sagen und einen Grund nennen können.",
    ),
    picture: t(
      "The three panels show the three levels working: pick a path yourself, move the pre-test slider across 80 percent to see a rule fire, and read what a model needs. Below them, the loop shows how an adaptive system works; its last box, “and why it was suggested”, is where transparency comes in. Press “Read the comic” for a short story.",
      "Die drei Felder zeigen die drei Stufen in Aktion: Wählen Sie selbst einen Pfad, schieben Sie den Vortest-Regler über 80 Prozent, um eine Regel greifen zu sehen, und lesen Sie, was ein Modell braucht. Darunter zeigt die Schleife, wie ein adaptives System arbeitet; ihr letzter Kasten, „und warum er vorgeschlagen wurde“, ist der Ort der Transparenz. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A5: {
    idea: t(
      "To choose between ways of building and testing, rate each on the same three questions: benefit (how much do we learn or gain?), effort (how much work and time it takes) and risk (what could go wrong?). Then decide, and say what could go wrong if you skip testing. To decide whether adaptive learning is worthwhile, ask three more things: is there a learner problem that individual paths solve, is there enough data of good quality, and are there content variants to adapt to?",
      "Um zwischen Arten des Bauens und Testens zu wählen, bewerten Sie jede mit denselben drei Fragen: Nutzen (wie viel lernen oder gewinnen wir?), Aufwand (wie viel Arbeit und Zeit es braucht) und Risiko (was kann schiefgehen?). Dann entscheiden Sie und sagen, was schiefgehen kann, wenn Sie das Testen überspringen. Um zu entscheiden, ob adaptives Lernen lohnt, fragen Sie drei weitere Dinge: Gibt es ein Problem der Lernenden, das individuelle Pfade lösen, gibt es genug Daten guter Qualität, und gibt es Inhaltsvarianten, an die man anpassen kann?",
    ),
    why: t(
      "Block 1.2 of the task asks you to assess three options on risk, benefit and effort and to decide, and Block 2.1 asks whether adaptive learning is worthwhile. The example here uses LearnLoop and its own options, so the answer for the task case is not given.",
      "Block 1.2 der Aufgabe verlangt, drei Optionen nach Risiko, Nutzen und Aufwand zu bewerten und sich zu entscheiden, und Block 2.1 fragt, ob adaptives Lernen lohnt. Das Beispiel hier nutzt LearnLoop und eigene Optionen, damit die Antwort für den Aufgabenfall nicht verraten wird.",
    ),
    picture: t(
      "Three small pictures show the three options of LearnLoop. Under them, the table rates each option on benefit, effort and risk in words; select a cell to read the reason. Press “Read the comic” for a short story.",
      "Drei kleine Bilder zeigen die drei Optionen von LearnLoop. Darunter bewertet die Tabelle jede Option nach Nutzen, Aufwand und Risiko in Worten; wählen Sie eine Zelle, um den Grund zu lesen. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B1: {
    idea: t(
      "A management decision about UX is a decision about where to put money and time: prototypes and tests, analytics, personalisation, artificial intelligence, a new look. Each one is a bet. A staged investment spreads the bet: a small first stage, then a gate with a figure written down in advance, then the next stage only if the gate is passed. That way you spend a little to learn, and let the evidence decide the next amount.",
      "Eine Managemententscheidung über UX ist eine Entscheidung darüber, wohin Geld und Zeit fließen: Prototypen und Tests, Analytics, Personalisierung, künstliche Intelligenz, ein neues Aussehen. Jedes davon ist eine Wette. Eine gestufte Investition verteilt die Wette: eine kleine erste Stufe, dann ein Gate mit einer vorab festgelegten Zahl, dann die nächste Stufe nur, wenn das Gate bestanden ist. So geben Sie wenig aus, um zu lernen, und lassen die Belege über den nächsten Betrag entscheiden.",
    ),
    why: t(
      "Task 2 puts you in the chair of a Chief Product Officer whose competitors use AI and adaptive systems, whose own platform is outdated, whose budget is limited and whose data is incomplete. You will decide whether to invest, how to test, and in what order.",
      "Task 2 setzt Sie auf den Stuhl einer Chief Product Officer, deren Wettbewerber KI und adaptive Systeme nutzen, deren eigene Plattform veraltet ist, deren Budget begrenzt ist und deren Daten unvollständig sind. Sie entscheiden, ob Sie investieren, wie Sie testen und in welcher Reihenfolge.",
    ),
    picture: t(
      "The chain runs left to right: stage 1, a gate, stage 2, a gate, stage 3. Each gate asks a question with a number. Select what happens at a gate to see what is spent and what is kept back. Press “Read the comic” for a short story.",
      "Die Kette läuft von links nach rechts: Stufe 1, ein Gate, Stufe 2, ein Gate, Stufe 3. Jedes Gate stellt eine Frage mit einer Zahl. Wählen Sie, was an einem Gate passiert, um zu sehen, was ausgegeben und was zurückgehalten wird. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B2: {
    idea: t(
      "The plan names three conflicts for Day 2. Personalisation against transparency: the more the system decides for the learner, the harder it is to explain. UX against technology hype: a good experience may need a simple fix, while the market pushes for the newest technology. Scalability against simplicity: a solution that works for ten thousand learners may be too heavy for a platform with three hundred. A good decision names the conflict in one sentence, says what each side gets and loses, and only then decides.",
      "Der Plan nennt drei Konflikte für Tag 2. Personalisierung gegen Transparenz: Je mehr das System für die Lernende entscheidet, desto schwerer ist es zu erklären. UX gegen Technologie-Hype: Ein gutes Erlebnis braucht vielleicht eine einfache Lösung, während der Markt nach der neuesten Technologie drängt. Skalierbarkeit gegen Einfachheit: Eine Lösung, die für zehntausend Lernende funktioniert, kann für eine Plattform mit dreihundert zu schwer sein. Eine gute Entscheidung benennt den Konflikt in einem Satz, sagt, was jede Seite bekommt und verliert, und entscheidet erst dann.",
    ),
    why: t(
      "Block 3.1 asks you to prioritise a roadmap and to weigh technology against user value in a risk analysis. The rules of this card tell you how to argue each choice.",
      "Block 3.1 verlangt, eine Roadmap zu priorisieren und in einer Risikoanalyse Technologie gegen Nutzerwert abzuwägen. Die Regeln dieser Karte sagen Ihnen, wie Sie jede Wahl begründen.",
    ),
    picture: t(
      "The matrix places six features of a learning platform by the value they give the learner (left to right) and by the data and complexity they need (bottom to top). Select a point to read where it sits and why. Press “Read the comic” for a short story.",
      "Die Matrix ordnet sechs Funktionen einer Lernplattform danach, welchen Wert sie den Lernenden geben (von links nach rechts) und welche Daten und Komplexität sie brauchen (von unten nach oben). Wählen Sie einen Punkt, um zu lesen, wo er liegt und warum. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B3: {
    idea: t(
      "The plan asks you to deliberately make one decision under uncertainty. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. You also fix how future decisions are made: who decides and what evidence they need. A pilot with a control group is the standard way to turn an unknown into evidence.",
      "Der Plan verlangt, bewusst eine Entscheidung unter Unsicherheit zu treffen. Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten. Außerdem legen Sie fest, wie künftige Entscheidungen getroffen werden: wer entscheidet und welche Belege er braucht. Ein Pilot mit Kontrollgruppe ist der übliche Weg, aus einer Unbekannten einen Beleg zu machen.",
    ),
    why: t(
      "Block 3.1 asks for one decision under uncertainty, for a platform with incomplete data: what you decide, what you do not know, and when you would reverse it. The card also shows how to name what you give up and how to fix who decides next time.",
      "Block 3.1 verlangt eine Entscheidung unter Unsicherheit, für eine Plattform mit unvollständigen Daten: was Sie entscheiden, was Sie nicht wissen und wann Sie die Entscheidung zurücknähmen. Die Karte zeigt auch, wie Sie benennen, worauf Sie verzichten, und wie Sie festlegen, wer künftig entscheidet.",
    ),
    picture: t(
      "First the pilot: two groups of 100 learners, with the result moved by a slider against a gate written in advance. Below it, the four boxes are the parts of the decision, filled in for LearnLoop, and the two boxes under them are the rule for future decisions. Press “Read the comic” for a short story.",
      "Zuerst der Pilot: zwei Gruppen zu je 100 Lernenden, das Ergebnis per Regler gegen ein vorab geschriebenes Gate bewegt. Darunter sind die vier Kästen die Teile der Entscheidung, für LearnLoop ausgefüllt, und die zwei Kästen darunter die Regel für künftige Entscheidungen. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
});
