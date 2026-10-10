import { bi, t } from "@/lib/lang";
import type { MaterialId, Block, MaterialMeta, PlainExplain } from "@/data/day1/materials";

/**
 * Day 2 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60
 * minutes. The cards follow the topic groups of the plan's Wissen cell (success factors of e-learning platforms, learning paths,
 * microlearning, feedback systems, prototyping, usability tests and KPIs, adaptive learning and its risks, conflicting goals of Day 2).
 * A4 (adaptive learning) is Optional: no Core block draws on it, and the rule Block 2.2 needs for the adaptive decision is repeated in A5
 * (CLAUDE.md #35, #40).
 */
export type { MaterialId, Block, MaterialMeta, PlainExplain };

export const MATERIALS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as Block, title: t("What successful learning platforms have in common", "Was erfolgreiche Lernplattformen gemeinsam haben"), minutes: 12 },
  { id: "A2" as MaterialId, block: "A" as Block, title: t("Prototyping: test the idea before you build it", "Prototyping: die Idee testen, bevor man sie baut"), minutes: 12 },
  { id: "A3" as MaterialId, block: "A" as Block, title: t("Testing a learning interface: whom, how and what you measure", "Ein Lerninterface testen: wen, wie und was man misst"), minutes: 14 },
  { id: "A4" as MaterialId, block: "A" as Block, title: t("Adaptive learning: what it is, what it needs, what it risks", "Adaptives Lernen: was es ist, was es braucht, was es riskiert"), minutes: 10, optional: true },
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
      "A learning platform is successful when learners start, carry on and finish, and then come back. The plan names three success factors: engagement (they do things), completion rate (they finish) and user guidance (they know where to go). Three practices appear again and again behind them: a clear learning path, microlearning (short units) and feedback systems. Each one answers a question every learner asks without saying it: what do I do next, can I do this in the time I have, and am I getting somewhere?",
      "Eine Lernplattform ist erfolgreich, wenn Lernende beginnen, dranbleiben, abschließen und dann wiederkommen. Der Plan nennt drei Erfolgsfaktoren: Engagement (sie tun etwas), Completion Rate (sie schließen ab) und Nutzerführung (sie wissen, wohin). Dahinter stehen immer wieder drei Praktiken: ein klarer Lernpfad, Microlearning (kurze Einheiten) und Feedback-Systeme. Jede beantwortet eine Frage, die jede Lernende stellt, ohne sie auszusprechen: Was tue ich als Nächstes, schaffe ich das in der Zeit, die ich habe, und komme ich voran?",
    ),
    why: t(
      "In Task 1 you compare a platform that learners finish with one they leave. You will say which practice each difference belongs to, and then state the principles of success in your own words.",
      "In Task 1 vergleichen Sie eine Plattform, die Lernende abschließen, mit einer, die sie verlassen. Sie sagen, zu welcher Praxis jeder Unterschied gehört, und formulieren dann die Erfolgsprinzipien in eigenen Worten.",
    ),
    picture: t(
      "The two columns show the same content built in two ways. Read each row across, from the left platform to the right one: path, units, feedback, and what typically follows. Nothing to click.",
      "Die beiden Spalten zeigen denselben Inhalt in zwei Bauweisen. Lesen Sie jede Zeile quer, von der linken Plattform zur rechten: Pfad, Einheiten, Feedback und was typischerweise folgt. Nichts zum Klicken.",
    ),
  },
  A2: {
    idea: t(
      "A prototype is an early, simple version of a screen or a flow, made so that you can test an idea before you build the real thing. It can be a sketch on paper or a clickable mock-up. Low-fidelity means rough and plain, high-fidelity means polished. The purpose is quick validation, not perfection: the rougher the version, the faster and cheaper it is to change, so a mistake costs little.",
      "Ein Prototyp ist eine frühe, einfache Version eines Bildschirms oder Ablaufs, gemacht, um eine Idee zu testen, bevor man das Echte baut. Er kann eine Skizze auf Papier oder ein klickbares Mock-up sein. Low-Fidelity heißt grob und schlicht, High-Fidelity heißt ausgearbeitet. Der Zweck ist schnelle Validierung, nicht Perfektion: Je gröber die Version, desto schneller und billiger lässt sie sich ändern, ein Fehler kostet also wenig.",
    ),
    why: t(
      "In Task 1 you decide how to prototype and test under time pressure and a limited budget, when the needs of users are still unclear. This card gives you the reasons for choosing a low-fidelity test first.",
      "In Task 1 entscheiden Sie, wie Sie unter Zeitdruck und mit begrenztem Budget prototypen und testen, solange die Bedürfnisse der Nutzer noch unklar sind. Diese Karte gibt Ihnen die Gründe, zuerst einen Low-Fidelity-Test zu wählen.",
    ),
    picture: t(
      "The loop shows iterative design: build a small version, measure what learners do, learn from it, and repeat. Below it is the fidelity ladder. Select a rung to read what it tests and what it costs to change. Press “Walk me through it” for a short story.",
      "Die Schleife zeigt iteratives Design: eine kleine Version bauen, messen, was Lernende tun, daraus lernen und wiederholen. Darunter steht die Fidelity-Leiter. Wählen Sie eine Stufe, um zu lesen, was sie testet und was eine Änderung kostet. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  A3: {
    idea: t(
      "A usability test watches real users try a real task, for example “find your next lesson”, while they say what they think. It is task-based and usually needs only a handful of users per group. Alongside it, you can measure numbers (KPIs) such as the drop-out rate, the time to finish a task and a comprehension score. Qualitative data says why; quantitative data says how many. A few users are enough for a first test, because later users mostly repeat what earlier ones found.",
      "Ein Usability-Test beobachtet echte Nutzer dabei, wie sie eine echte Aufgabe versuchen, zum Beispiel „Finden Sie Ihre nächste Lektion“, während sie sagen, was sie denken. Er ist aufgabenbasiert und braucht meist nur eine Handvoll Nutzer pro Gruppe. Daneben können Sie Zahlen (KPIs) messen, etwa die Abbruchquote, die Zeit bis zum Abschluss einer Aufgabe und einen Verständniswert. Qualitative Daten sagen, warum; quantitative Daten sagen, wie viele. Für einen ersten Test genügen wenige Nutzer, denn spätere Nutzer wiederholen meist, was frühere schon gefunden haben.",
    ),
    why: t(
      "In Task 1 you choose three UX tests for a platform in which learners drop out and no one knows why. This card tells you what each kind of test can answer.",
      "In Task 1 wählen Sie drei UX-Tests für eine Plattform, auf der Lernende abbrechen und niemand weiß, warum. Diese Karte sagt Ihnen, was jede Art von Test beantworten kann.",
    ),
    picture: t(
      "Select a number of test users to see the share of problems found in Nielsen and Landauer's model. Below it, two columns set qualitative and quantitative data side by side. Press “Walk me through it” for a short story.",
      "Wählen Sie eine Anzahl Testnutzer, um den Anteil gefundener Probleme im Modell von Nielsen und Landauer zu sehen. Darunter stellen zwei Spalten qualitative und quantitative Daten nebeneinander. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  A4: {
    idea: t(
      "Adaptive learning means the platform adjusts the next step, the difficulty or the order of content to the learner. The adjustment can follow a simple rule (if the pre-test is passed, skip the basics) or an algorithm that learns from data. Recommendation systems and learning analytics are tools for it. Adaptive systems can personalise, but they need data, content in several variants and a way to explain what they do.",
      "Adaptives Lernen heißt, dass die Plattform den nächsten Schritt, den Schwierigkeitsgrad oder die Reihenfolge der Inhalte an die Lernende anpasst. Die Anpassung kann einer einfachen Regel folgen (wenn der Vortest bestanden ist, die Grundlagen überspringen) oder einem Algorithmus, der aus Daten lernt. Empfehlungssysteme und Learning Analytics sind Werkzeuge dafür. Adaptive Systeme können personalisieren, brauchen aber Daten, Inhalte in mehreren Varianten und eine Möglichkeit, zu erklären, was sie tun.",
    ),
    why: t(
      "The plan asks whether adaptive learning is worthwhile. This card gives you the opportunities and the risks, so that you can say “yes, no or partly” and give a reason.",
      "Der Plan fragt, ob adaptives Lernen lohnt. Diese Karte gibt Ihnen die Chancen und die Risiken, damit Sie „ja, nein oder teilweise“ sagen und einen Grund nennen können.",
    ),
    picture: t(
      "The loop shows how an adaptive system works: the learner acts, the system records it, a model chooses the next step, and the learner sees it. The last box, “and why it was suggested”, is where transparency comes in. The table sets three levels side by side. Nothing to click.",
      "Die Schleife zeigt, wie ein adaptives System arbeitet: Die Lernende handelt, das System erfasst es, ein Modell wählt den nächsten Schritt, und die Lernende sieht ihn. Im letzten Kasten, „und warum er vorgeschlagen wurde“, kommt die Transparenz ins Spiel. Die Tabelle stellt drei Stufen nebeneinander. Nichts zum Klicken.",
    ),
  },
  A5: {
    idea: t(
      "To choose between ways of building and testing, rate each on the same three questions: benefit (how much do we learn or gain?), effort (money and time) and risk (what could go wrong?). Here a rule decides effort: under €10,000 is Low, up to €25,000 is Mid, above that is High. Then decide, and say what could go wrong if you skip testing. To decide whether adaptive learning is worthwhile, ask three more things: is there a learner problem that individual paths solve, is there enough data of good quality, and are there content variants to adapt to?",
      "Um zwischen Arten des Bauens und Testens zu wählen, bewerten Sie jede mit denselben drei Fragen: Nutzen (wie viel lernen oder gewinnen wir?), Aufwand (Geld und Zeit) und Risiko (was kann schiefgehen?). Hier entscheidet eine Regel über den Aufwand: unter 10.000 € ist Niedrig, bis 25.000 € Mittel, darüber Hoch. Dann entscheiden Sie und sagen, was schiefgehen kann, wenn Sie das Testen überspringen. Um zu entscheiden, ob adaptives Lernen lohnt, fragen Sie drei weitere Dinge: Gibt es ein Problem der Lernenden, das individuelle Pfade lösen, gibt es genug Daten guter Qualität, und gibt es Inhaltsvarianten, an die man anpassen kann?",
    ),
    why: t(
      "Block 2.2 of the task asks for exactly this under a time limit and a limited budget: choose an approach and three tests, rate the cost against the limits, and decide on adaptive learning. The example here uses LearnLoop, so the answer for the task case is not given.",
      "Block 2.2 der Aufgabe verlangt genau das unter Zeitlimit und mit begrenztem Budget: einen Ansatz und drei Tests wählen, die Kosten gegen die Grenzen stellen und über adaptives Lernen entscheiden. Das Beispiel hier nutzt LearnLoop, damit die Antwort für den Aufgabenfall nicht verraten wird.",
    ),
    picture: t(
      "The bars show the cost of three options. The coloured bands behind them are the effort rule, and the dashed line is the budget. Under the bars, the table gives the rating of each option; select a cell to read the reason. Press “Walk me through it” for a short story.",
      "Die Balken zeigen die Kosten von drei Optionen. Die farbigen Bänder dahinter sind die Aufwandsregel, die gestrichelte Linie ist das Budget. Unter den Balken gibt die Tabelle die Bewertung jeder Option; wählen Sie eine Zelle, um den Grund zu lesen. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
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
      "The chain runs left to right: stage 1, a gate, stage 2, a gate, stage 3. Each gate asks a question with a number. Select what happens at a gate to see what is spent and what is kept back. Press “Walk me through it” for a short story.",
      "Die Kette läuft von links nach rechts: Stufe 1, ein Gate, Stufe 2, ein Gate, Stufe 3. Jedes Gate stellt eine Frage mit einer Zahl. Wählen Sie, was an einem Gate passiert, um zu sehen, was ausgegeben und was zurückgehalten wird. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  B2: {
    idea: t(
      "The plan names three conflicts for Day 2. Personalisation against transparency: the more the system decides for the learner, the harder it is to explain. UX against technology hype: a good experience may need a simple fix, while the market pushes for the newest technology. Scalability against simplicity: a solution that works for ten thousand learners may be too heavy for a platform with three hundred. A good decision names the conflict in one sentence, says what each side gets and loses, and only then decides.",
      "Der Plan nennt drei Konflikte für Tag 2. Personalisierung gegen Transparenz: Je mehr das System für die Lernende entscheidet, desto schwerer ist es zu erklären. UX gegen Technologie-Hype: Ein gutes Erlebnis braucht vielleicht eine einfache Lösung, während der Markt nach der neuesten Technologie drängt. Skalierbarkeit gegen Einfachheit: Eine Lösung, die für zehntausend Lernende funktioniert, kann für eine Plattform mit dreihundert zu schwer sein. Eine gute Entscheidung benennt den Konflikt in einem Satz, sagt, was jede Seite bekommt und verliert, und entscheidet erst dann.",
    ),
    why: t(
      "Block 3.1 and Block 3.2 of the task ask you to prioritise a roadmap and to take one decision under uncertainty. The rules of this card tell you how to argue each choice.",
      "Block 3.1 und Block 3.2 der Aufgabe verlangen, eine Roadmap zu priorisieren und eine Entscheidung unter Unsicherheit zu treffen. Die Regeln dieser Karte sagen Ihnen, wie Sie jede Wahl begründen.",
    ),
    picture: t(
      "The matrix places six features of a learning platform by the value they give the learner (left to right) and by the data and complexity they need (bottom to top). Select a point to read where it sits and why. Press “Walk me through it” for a short story.",
      "Die Matrix ordnet sechs Funktionen einer Lernplattform danach, welchen Wert sie den Lernenden geben (von links nach rechts) und welche Daten und Komplexität sie brauchen (von unten nach oben). Wählen Sie einen Punkt, um zu lesen, wo er liegt und warum. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  B3: {
    idea: t(
      "The plan asks you to deliberately make one decision under uncertainty. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. You also fix how future decisions are made: who decides and what evidence they need. A pilot with a control group is the standard way to turn an unknown into evidence.",
      "Der Plan verlangt, bewusst eine Entscheidung unter Unsicherheit zu treffen. Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten. Außerdem legen Sie fest, wie künftige Entscheidungen getroffen werden: wer entscheidet und welche Belege er braucht. Ein Pilot mit Kontrollgruppe ist der übliche Weg, aus einer Unbekannten einen Beleg zu machen.",
    ),
    why: t(
      "Block 3.2 asks for exactly this, for a platform with incomplete data: a risk, one decision under uncertainty, a rule for future decisions, and what you give up.",
      "Block 3.2 verlangt genau das, für eine Plattform mit unvollständigen Daten: ein Risiko, eine Entscheidung unter Unsicherheit, eine Regel für künftige Entscheidungen und worauf Sie verzichten.",
    ),
    picture: t(
      "The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions. Read from left to right. Nothing to click.",
      "Die vier Kästen oben sind die Teile der Entscheidung, für LearnLoop ausgefüllt. Die zwei Kästen darunter sind die Regel für künftige Entscheidungen. Lesen Sie von links nach rechts. Nichts zum Klicken.",
    ),
  },
});
