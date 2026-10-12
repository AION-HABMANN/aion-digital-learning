import { bi, t } from "@/lib/lang";
import type { MaterialId, Block, MaterialMeta, PlainExplain } from "@/data/day1/materials";

/**
 * Day 4 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The
 * cards follow the topic groups of the plan's Wissen cell (intrinsic and extrinsic motivation and Self-Determination Theory, five design principles,
 * feedback, progress and rewards, evaluating motivation-based UX, optimising it, and the conflict of motivation, overload and manipulation). A4
 * (evaluating) is Optional: no Core block draws on it (CLAUDE.md #35, #40).
 */
export type { MaterialId, Block, MaterialMeta, PlainExplain };

export const MATERIALS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as Block, title: t("Intrinsic and extrinsic motivation, and what Self-Determination Theory adds", "Intrinsische und extrinsische Motivation, und was die Selbstbestimmungstheorie ergänzt"), minutes: 14 },
  { id: "A2" as MaterialId, block: "A" as Block, title: t("Five design principles for effective learning experiences", "Fünf Gestaltungsprinzipien für wirksame Lernerfahrungen"), minutes: 14 },
  { id: "A3" as MaterialId, block: "A" as Block, title: t("Feedback, progress and rewards: what helps and what backfires", "Feedback, Fortschritt und Belohnungen: was hilft und was nach hinten losgeht"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as Block, title: t("Evaluating motivation-based UX: metrics and methods", "Motivationsbasiertes UX bewerten: Kennzahlen und Methoden"), minutes: 10, optional: true },
  { id: "A5" as MaterialId, block: "A" as Block, title: t("Weighing an engagement measure: motivation, effort, risk", "Eine Engagement-Maßnahme abwägen: Motivation, Aufwand, Risiko"), minutes: 10 },
  { id: "B1" as MaterialId, block: "B" as Block, title: t("Motivation as a business lever, and where it is overestimated", "Motivation als Hebel für das Geschäft, und wo sie überschätzt wird"), minutes: 18 },
  { id: "B2" as MaterialId, block: "B" as Block, title: t("Conflicting goals: motivation, overload and manipulation", "Zielkonflikte: Motivation, Überlastung und Manipulation"), minutes: 22 },
  { id: "B3" as MaterialId, block: "B" as Block, title: t("Deciding and evaluating under uncertainty", "Unter Unsicherheit entscheiden und bewerten"), minutes: 20 },
]);
export const MATERIAL_BY_ID = Object.fromEntries(MATERIALS.map((m) => [m.id, m])) as Record<MaterialId, MaterialMeta>;
export const materialAnchorId = (id: MaterialId) => `mat-${id}`;
/** Card ids are stored with the day in front, so two days never share a "read" mark. */
export const readKey = (id: MaterialId) => `d4:${id}`;

/* ------------------------------------------------------------------ "In plain words" (CLAUDE.md #22, #51) */

export const MATERIAL_PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "Intrinsic motivation comes from the activity itself: interest, curiosity, the wish to get better. Extrinsic motivation comes from outside: points, money, a deadline, a certificate. Self-Determination Theory (Deci and Ryan) adds that people stay motivated when three needs are met: autonomy (I choose), competence (I can see I am getting better) and relatedness (I belong).",
      "Intrinsische Motivation kommt aus der Tätigkeit selbst: Interesse, Neugier, der Wunsch, besser zu werden. Extrinsische Motivation kommt von außen: Punkte, Geld, eine Frist, ein Zertifikat. Die Selbstbestimmungstheorie (Deci und Ryan) ergänzt, dass Menschen motiviert bleiben, wenn drei Bedürfnisse erfüllt sind: Autonomie (ich wähle), Kompetenz (ich sehe, dass ich besser werde) und Zugehörigkeit (ich gehöre dazu).",
    ),
    why: t(
      "In Task 1 you compare two platforms and choose measures to raise engagement. You will need to say whether a measure supports a learner's motivation or only decorates it.",
      "In Task 1 vergleichen Sie zwei Plattformen und wählen Maßnahmen, um das Engagement zu steigern. Sie müssen sagen, ob eine Maßnahme die Motivation einer Lernenden stützt oder sie nur schmückt.",
    ),
    picture: t(
      "The first picture follows Tom, who likes quizzes: choose “Before points”, “With points” or “Points ended” to see how many quizzes he does each week, and what the screen looks like. The second picture draws the three needs of Self-Determination Theory as overlapping circles, each with an example from a learning platform. Press “Walk me through it” for a short story.",
      "Das erste Bild begleitet Tom, der gern Quizze macht: Wählen Sie „Vor den Punkten“, „Mit Punkten“ oder „Punkte beendet“, um zu sehen, wie viele Quizze er pro Woche macht und wie der Bildschirm aussieht. Das zweite Bild zeichnet die drei Bedürfnisse der Selbstbestimmungstheorie als überlappende Kreise, jeweils mit einem Beispiel von einer Lernplattform. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  A2: {
    idea: t(
      "The plan names five design principles. Clarity and structure: the learner knows what this is and what to do. Activation: the learner does something instead of only reading. Feedback and reinforcement: the learner knows how they did and what to do next. Progression: the learner can see their learning move forward. Relevance and context: the learner sees why this matters for their work.",
      "Der Plan nennt fünf Gestaltungsprinzipien. Klarheit und Struktur: Die Lernende weiß, was das ist und was zu tun ist. Aktivierung: Die Lernende tut etwas, statt nur zu lesen. Feedback und Verstärkung: Die Lernende weiß, wie sie es gemacht hat und was als Nächstes kommt. Progression: Die Lernende sieht, wie ihr Lernen vorankommt. Relevanz und Kontext: Die Lernende sieht, warum das für ihre Arbeit zählt.",
    ),
    why: t(
      "In Task 1 you sort what differs between two platforms into these principles and then choose measures that deliver them. The model of the plan builds its measures on exactly these ideas.",
      "In Task 1 sortieren Sie, was sich zwischen zwei Plattformen unterscheidet, in diese Prinzipien und wählen dann Maßnahmen, die sie liefern. Das Modell des Plans baut seine Maßnahmen auf genau diesen Ideen auf.",
    ),
    picture: t(
      "The lesson screen below starts as a long page of reading. Switch on one principle at a time (a goal sentence, a task, feedback, a progress bar, a work example) and watch the same screen gain the element that delivers it. The table afterwards keeps only what a picture cannot show. Press “Walk me through it” for a short story.",
      "Der Lektionsbildschirm unten beginnt als lange Lesetextseite. Schalten Sie ein Prinzip nach dem anderen ein (einen Zielsatz, eine Aufgabe, Feedback, einen Fortschrittsbalken, ein Praxisbeispiel) und sehen Sie, wie derselbe Bildschirm das Element bekommt, das es liefert. Die Tabelle danach behält nur, was ein Bild nicht zeigen kann. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  A3: {
    idea: t(
      "Three tools appear in almost every motivation discussion: feedback, progress displays and rewards. Feedback helps when it answers three questions: where am I going, how am I going, where to next. Progress displays help because people work harder as they get nearer a goal and when they can already see some progress. Rewards help when they tell the learner something true about their skill, and backfire when they replace the reason for learning.",
      "Drei Werkzeuge tauchen in fast jeder Motivationsdiskussion auf: Feedback, Fortschrittsanzeigen und Belohnungen. Feedback hilft, wenn es drei Fragen beantwortet: Wohin gehe ich, wie komme ich voran, was kommt als Nächstes. Fortschrittsanzeigen helfen, weil Menschen sich mehr anstrengen, je näher sie einem Ziel kommen und wenn sie schon etwas Fortschritt sehen. Belohnungen helfen, wenn sie der Lernenden etwas Wahres über ihr Können sagen, und gehen nach hinten los, wenn sie den Grund zum Lernen ersetzen.",
    ),
    why: t(
      "In Task 1 and Task 2 you choose between measures such as a progress display, feedback after each task, and points and badges. This card tells you how to rate each.",
      "In Task 1 und Task 2 wählen Sie zwischen Maßnahmen wie einer Fortschrittsanzeige, Feedback nach jeder Aufgabe sowie Punkten und Badges. Diese Karte sagt Ihnen, wie Sie jede bewerten.",
    ),
    picture: t(
      "The first picture sets two feedback messages side by side and marks which of the three questions each one answers. The second sets two result screens next to each other: one that tells the learner something true about their skill, and one that only pays points. The third shows two loyalty cards that need the same number of new stamps, one already partly stamped. Nothing to click.",
      "Das erste Bild stellt zwei Feedback-Meldungen nebeneinander und markiert, welche der drei Fragen jede beantwortet. Das zweite stellt zwei Ergebnisbildschirme nebeneinander: einen, der der Lernenden etwas Wahres über ihr Können sagt, und einen, der nur Punkte zahlt. Das dritte zeigt zwei Treuekarten, die dieselbe Zahl neuer Stempel brauchen, eine davon schon teilweise gestempelt. Nichts zum Klicken.",
    ),
  },
  A4: {
    idea: t(
      "To know whether a motivating design works, you measure. The plan lists engagement, completion rate and time spent as metrics, user feedback and observation as qualitative methods, and KPIs and tracking as quantitative methods. Each metric answers one question and has a trap.",
      "Um zu wissen, ob ein motivierendes Design wirkt, messen Sie. Der Plan nennt Engagement, Completion Rate und verbrachte Zeit als Kennzahlen, Nutzer-Feedback und Beobachtung als qualitative Methoden sowie KPIs und Tracking als quantitative Methoden. Jede Kennzahl beantwortet eine Frage und hat eine Falle.",
    ),
    why: t(
      "The plan's Level 3 task asks for an evaluation strategy: how do we measure success? This card gives you the building blocks.",
      "Die Level-3-Aufgabe des Plans verlangt eine Evaluationsstrategie: Wie messen wir den Erfolg? Diese Karte gibt Ihnen die Bausteine.",
    ),
    picture: t(
      "Five small cards each draw one metric or method: a completion bar, a return line, the same long time read as interest or as confusion, interview speech bubbles and a test line against a control line. Under each is the question it answers and the trap in it. Below them the three steps of iterating (test, analyse, adjust) are drawn as a loop. Nothing to click.",
      "Fünf kleine Karten zeichnen je eine Kennzahl oder Methode: einen Completion-Balken, eine Rückkehrlinie, dieselbe lange Zeit als Interesse oder als Verwirrung gelesen, Sprechblasen aus Interviews und eine Testlinie gegen eine Kontrolllinie. Darunter stehen die Frage, die sie beantwortet, und die Falle darin. Darunter sind die drei Schritte des Iterierens (testen, analysieren, anpassen) als Schleife gezeichnet. Nichts zum Klicken.",
    ),
  },
  A5: {
    idea: t(
      "To choose between ways of raising engagement, rate each on the same three questions. Motivation impact: how much does it support lasting motivation, meaning goals, activation, feedback and progress? Effort: money and time, decided here by a rule: under €10,000 is Low, up to €20,000 is Mid, above that is High. Risk: how can it backfire, through overjustification, pressure or manipulation?",
      "Um zwischen Wegen zur Steigerung des Engagements zu wählen, bewerten Sie jeden mit denselben drei Fragen. Motivationswirkung: Wie sehr stützt er dauerhafte Motivation, also Ziele, Aktivierung, Feedback und Fortschritt? Aufwand: Geld und Zeit, hier von einer Regel entschieden: unter 10.000 € ist Niedrig, bis 20.000 € Mittel, darüber Hoch. Risiko: Wie kann es nach hinten losgehen, durch Overjustification, Druck oder Manipulation?",
    ),
    why: t(
      "Block 1.2 and Block 2.2 of the task ask for exactly this. The example uses LearnLoop, so the answer for the task case is not given.",
      "Block 1.2 und Block 2.2 der Aufgabe verlangen genau das. Das Beispiel nutzt LearnLoop, damit die Antwort für den Aufgabenfall nicht verraten wird.",
    ),
    picture: t(
      "First, three small pictures show LearnLoop's three ideas: a weekly leaderboard, a progress and next-step display, and short practice tasks. The bars show the cost of the three measures. The coloured bands behind them are the effort rule, and the dashed line is the budget. Under the bars, the table gives the rating of each option; select a cell to read the reason. Press “Walk me through it” for a short story.",
      "Zuerst zeigen drei kleine Bilder LearnLoops drei Ideen: eine wöchentliche Rangliste, eine Fortschritts- und Nächster-Schritt-Anzeige und kurze Übungsaufgaben. Die Balken zeigen die Kosten der drei Maßnahmen. Die farbigen Bänder dahinter sind die Aufwandsregel, die gestrichelte Linie ist das Budget. Unter den Balken gibt die Tabelle die Bewertung jeder Option; wählen Sie eine Zelle, um den Grund zu lesen. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  B1: {
    idea: t(
      "For a platform, retention is behaviour: learners come back and do the next lesson. Fogg's Behavior Model says a behaviour happens when motivation, ability and a prompt come together. If the next step is hard, or nothing prompts it, more motivation does not help. That is where motivation is overestimated: teams add rewards when the real barrier is that the next step is hard to find.",
      "Für eine Plattform ist Retention Verhalten: Lernende kommen zurück und machen die nächste Lektion. Foggs Verhaltensmodell sagt, dass ein Verhalten geschieht, wenn Motivation, Können und ein Impuls zusammenkommen. Ist der nächste Schritt schwer oder erinnert nichts daran, hilft mehr Motivation nicht. Dort wird Motivation überschätzt: Teams ergänzen Belohnungen, wenn die eigentliche Hürde ist, dass der nächste Schritt schwer zu finden ist.",
    ),
    why: t(
      "Task 2 puts you in the chair of a Chief Experience Officer whose platform has low retention, whose competitors seem more motivating, and whose data is incomplete. You must choose a strategy and say how you will know it works.",
      "Task 2 setzt Sie auf den Stuhl einer Chief Experience Officer, deren Plattform eine niedrige Retention hat, deren Wettbewerber motivierender wirken und deren Daten unvollständig sind. Sie müssen eine Strategie wählen und sagen, woran Sie erkennen, dass sie wirkt.",
    ),
    picture: t(
      "The chart shows Fogg's model: motivation upwards, ability to the right, and a curve. Move the two sliders and switch the prompt on or off: only a learner above the curve, with a prompt, does the next lesson. Below the chart, a table says which measure works on which condition. Press “Walk me through it” for a short story.",
      "Das Diagramm zeigt Foggs Modell: Motivation nach oben, Können nach rechts und eine Kurve. Bewegen Sie die beiden Regler und schalten Sie den Impuls ein oder aus: Nur eine Lernende über der Kurve und mit einem Impuls macht die nächste Lektion. Unter dem Diagramm sagt eine Tabelle, welche Maßnahme auf welche Bedingung wirkt. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  B2: {
    idea: t(
      "The plan's conflicts for Day 4 are motivation against overload, motivation against usability, and short-term against long-term effect. A third pull is motivation against manipulation: pressure, guilt and loss messages that raise activity today and cost trust tomorrow. A good strategy names which conflict it faces in each measure.",
      "Die Konflikte des Plans für Tag 4 sind Motivation gegen Überlastung, Motivation gegen Usability und kurzfristige gegen langfristige Wirkung. Ein dritter Zug ist Motivation gegen Manipulation: Druck, Schuldgefühle und Verlustmeldungen, die heute die Aktivität steigern und morgen das Vertrauen kosten. Eine gute Strategie nennt, welchen Konflikt sie bei jeder Maßnahme eingeht.",
    ),
    why: t(
      "Task 2 asks for a risk analysis of perverse incentives and wrong motivation, and for a motivation strategy that stays on the right side of manipulation.",
      "Task 2 verlangt eine Risikoanalyse von Fehlanreizen und falscher Motivation und eine Motivationsstrategie, die auf der richtigen Seite der Manipulation bleibt.",
    ),
    picture: t(
      "The matrix places seven measures by the lasting motivation they support (left to right) and the pressure they put on the learner (bottom to top). The bottom right is the aim. Select a point to read where it sits and why; the position is a reading of the example, not a score. Press “Walk me through it” for a short story.",
      "Die Matrix ordnet sieben Maßnahmen danach, wie viel dauerhafte Motivation sie stützen (von links nach rechts) und wie viel Druck sie auf die Lernende ausüben (von unten nach oben). Unten rechts ist das Ziel. Wählen Sie einen Punkt, um zu lesen, wo er liegt und warum; die Position ist eine Lesart des Beispiels, keine Note. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  B3: {
    idea: t(
      "When the data is incomplete you cannot be sure which measure will work. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. Your evaluation strategy then says how you will measure success: a baseline, a target, a method and a date. You also fix who decides future optimisation and on what evidence.",
      "Sind die Daten unvollständig, können Sie nicht sicher sein, welche Maßnahme wirkt. Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten. Ihre Evaluationsstrategie sagt dann, wie Sie den Erfolg messen: eine Ausgangslage, ein Ziel, eine Methode und ein Termin. Außerdem legen Sie fest, wer künftig über die Optimierung entscheidet und auf welcher Grundlage.",
    ),
    why: t(
      "Block 3.1 and 3.2 ask for an evaluation strategy, a risk analysis, a decision architecture and one decision under uncertainty.",
      "Block 3.1 und 3.2 verlangen eine Evaluationsstrategie, eine Risikoanalyse, eine Entscheidungsarchitektur und eine Entscheidung unter Unsicherheit.",
    ),
    picture: t(
      "The line chart follows the seven-day return rate of LearnLoop for six weeks. Switch the control group on and off: without it, the rise could be the season; with it, the gap between the two lines is what the change did. Below, the four boxes are the parts of the decision, filled in for LearnLoop, and the two boxes at the bottom are the rule for future decisions. Press “Walk me through it” for a short story.",
      "Das Liniendiagramm folgt der Rückkehrrate nach sieben Tagen von LearnLoop über sechs Wochen. Schalten Sie die Kontrollgruppe ein und aus: Ohne sie könnte der Anstieg die Jahreszeit sein; mit ihr ist der Abstand zwischen den beiden Linien das, was die Änderung bewirkt hat. Darunter sind die vier Kästen die Teile der Entscheidung, für LearnLoop ausgefüllt, und die zwei Kästen unten sind die Regel für künftige Entscheidungen. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
});
