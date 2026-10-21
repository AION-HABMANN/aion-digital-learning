import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/day1/materials";

/**
 * Day 11 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow the topic
 * groups of the plan's Wissen cell (gamification elements; intrinsic and extrinsic motivation and Self-Determination Theory; gamification and learning; then gamification as a
 * strategic tool, its conflicts and a decision without proof). Every card is Core: each is drawn on by a block of the task (DL-STANDARD v1.1).
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("Game elements: points, badges, levels and leaderboards, and what gamification is", "Spielelemente: Punkte, Abzeichen, Level und Ranglisten, und was Gamification ist"), minutes: 14 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("Intrinsic and extrinsic motivation, and the three needs of Self-Determination Theory", "Intrinsische und extrinsische Motivation und die drei Bedürfnisse der Selbstbestimmungstheorie"), minutes: 14 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("Gamification and learning: activity is not learning", "Gamification und Lernen: Aktivität ist nicht Lernen"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Principles of meaningful gamification: link, fairness, challenge", "Prinzipien sinnvoller Gamification: Verbindung, Fairness, Herausforderung"), minutes: 10 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("Weighing a gamification measure: motivation, effort, risk", "Eine Gamification-Maßnahme abwägen: Motivation, Aufwand, Risiko"), minutes: 10 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Gamification as a strategic tool: from objective to mechanic to behaviour", "Gamification als strategisches Werkzeug: vom Ziel über die Mechanik zum Verhalten"), minutes: 18 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Conflicting goals: short-term effect against sustainable learning, motivation against manipulation", "Zielkonflikte: kurzfristige Wirkung gegen nachhaltiges Lernen, Motivation gegen Manipulation"), minutes: 22 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Deciding without proof that gamification works: a decision you can check later", "Entscheiden ohne Beleg, dass Gamification wirkt: eine Entscheidung, die Sie später prüfen können"), minutes: 20 },
]);

/** "In plain words" (CLAUDE.md #22, #51). */
const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "Gamification means using elements known from games, such as points, badges, levels, a progress bar or a leaderboard, in something that is not a game, such as a learning platform. Each element does something different to a learner: a point rewards an action, a badge marks an achievement, a level shows a stage, and a leaderboard compares people. Whether the element helps depends on what it rewards.",
      "Gamification heißt, Elemente aus Spielen, etwa Punkte, Abzeichen, Level, einen Fortschrittsbalken oder eine Rangliste, in etwas einzusetzen, das kein Spiel ist, etwa einer Lernplattform. Jedes Element tut etwas anderes mit einer Lernenden: Ein Punkt belohnt eine Handlung, ein Abzeichen markiert eine Leistung, ein Level zeigt eine Stufe, und eine Rangliste vergleicht Menschen. Ob das Element hilft, hängt davon ab, was es belohnt.",
    ),
    why: t(
      "Block 1.1 asks which elements of a platform raise motivation. You first need to know what each element is.",
      "Block 1.1 fragt, welche Elemente einer Plattform die Motivation erhöhen. Dafür müssen Sie zuerst wissen, was jedes Element ist.",
    ),
    picture: t(
      "One LearnLoop lesson screen with four switches: points, badges, a leaderboard and a progress bar. Switch them on one at a time and read what Kim sees. Press “Read the comic” for a short story.",
      "Ein LearnLoop-Lektionsbildschirm mit vier Schaltern: Punkte, Abzeichen, Rangliste und Fortschrittsbalken. Schalten Sie sie nacheinander ein und lesen Sie, was Kim sieht. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A2: {
    idea: t(
      "Intrinsic motivation means doing something because it is interesting or meaningful in itself. Extrinsic motivation means doing it for a reward or to avoid a penalty. Self-Determination Theory says people stay motivated when three needs are met: autonomy (I choose), competence (I am getting better) and relatedness (I belong). A reward can also crowd out interest that was already there.",
      "Intrinsische Motivation heißt, etwas zu tun, weil es an sich interessant oder bedeutsam ist. Extrinsische Motivation heißt, es für eine Belohnung oder zur Vermeidung einer Strafe zu tun. Die Selbstbestimmungstheorie sagt, Menschen bleiben motiviert, wenn drei Bedürfnisse erfüllt sind: Autonomie (ich wähle), Kompetenz (ich werde besser) und Zugehörigkeit (ich gehöre dazu). Eine Belohnung kann auch Interesse verdrängen, das schon da war.",
    ),
    why: t(
      "Block 1.1 asks which platform is more motivating and which elements raise motivation, and Block 2.1 asks for the problems of a platform where extrinsic motivation dominates. This card gives the test: would it still work if the reward stopped?",
      "Block 1.1 fragt, welche Plattform motivierender ist und welche Elemente die Motivation erhöhen, und Block 2.1 fragt nach den Problemen einer Plattform, auf der extrinsische Motivation dominiert. Diese Karte gibt den Test: Würde es noch wirken, wenn die Belohnung endete?",
    ),
    picture: t(
      "The same learner, Kim, three ways: with a prize in front of her, with the prize gone, and with real interest. Below it, the three needs drawn as three small pictures. Choose one state and read what Kim does. Press “Read the comic” for a short story.",
      "Dieselbe Lernende, Kim, auf drei Arten: mit einem Preis vor sich, ohne den Preis und mit echtem Interesse. Darunter die drei Bedürfnisse als drei kleine Bilder. Wählen Sie einen Zustand und lesen Sie, was Kim tut. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A3: {
    idea: t(
      "A platform can be very busy and teach very little. Activity means logins, clicks and points. Learning means that someone now knows or can do something they could not before. A game element helps learning only when it rewards the learning itself, for example progress against an objective, and not the activity around it.",
      "Eine Plattform kann sehr geschäftig sein und sehr wenig lehren. Aktivität heißt Anmeldungen, Klicks und Punkte. Lernen heißt, dass jemand jetzt etwas weiß oder kann, was er vorher nicht konnte. Ein Spielelement hilft dem Lernen nur, wenn es das Lernen selbst belohnt, etwa Fortschritt gegen ein Ziel, und nicht die Aktivität drumherum.",
    ),
    why: t(
      "In Block 1.2 and Block 2.1 you separate measures that reward learning from measures that reward activity. This is the test for that.",
      "In Block 1.2 und Block 2.1 trennen Sie Maßnahmen, die Lernen belohnen, von solchen, die Aktivität belohnen. Das ist der Test dafür.",
    ),
    picture: t(
      "Two bars for the same LearnLoop platform in three set-ups: logins and clicks, and objectives mastered. Choose a set-up and compare the bars. The values are invented to show the idea. Press “Read the comic” for a short story.",
      "Zwei Balken für dieselbe LearnLoop-Plattform in drei Varianten: Anmeldungen und Klicks sowie gemeisterte Ziele. Wählen Sie eine Variante und vergleichen Sie die Balken. Die Werte sind erfunden, um die Idee zu zeigen. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A4: {
    idea: t(
      "Three principles make gamification meaningful. First, every element is linked to a learning objective. Second, the rules are visible and fair, so nobody feels tricked. Third, the challenge matches the learner's ability, so the task is neither boring nor too hard. This last idea is called flow.",
      "Drei Prinzipien machen Gamification sinnvoll. Erstens ist jedes Element mit einem Lernziel verbunden. Zweitens sind die Regeln sichtbar und fair, sodass sich niemand getäuscht fühlt. Drittens passt die Herausforderung zur Fähigkeit der Lernenden, die Aufgabe ist also weder langweilig noch zu schwer. Diese letzte Idee heißt Flow.",
    ),
    why: t(
      "Block 1.1 and Block 3.1 ask which mechanics are meaningful. The three principles of this card, link, fairness and challenge, are the test.",
      "Block 1.1 und Block 3.1 fragen, welche Mechaniken sinnvoll sind. Die drei Prinzipien dieser Karte, Verbindung, Fairness und Herausforderung, sind der Test.",
    ),
    picture: t(
      "Three small pictures: a badge linked to a goal, a rule everyone can read, and a line where challenge rises with ability. Nothing to click.",
      "Drei kleine Bilder: ein Abzeichen, das mit einem Ziel verbunden ist, eine Regel, die alle lesen können, und eine Linie, auf der die Herausforderung mit der Fähigkeit steigt. Nichts zum Klicken.",
    ),
  },
  A5: {
    idea: t(
      "To choose between gamification measures, rate each on the same three questions. Motivation: how much does it keep the learner going, and for how long? Effort: how much work and how many people it needs; the plan prints no price, so Low, Mid or High is your judgement, with a reason. Risk: what could go wrong, for example that learners chase the reward and learn little.",
      "Um zwischen Gamification-Maßnahmen zu wählen, bewerten Sie jede mit denselben drei Fragen. Motivation: Wie sehr hält es die Lernende bei der Sache, und wie lange? Aufwand: wie viel Arbeit und wie viele Personen er braucht; der Plan nennt keinen Preis, also ist Niedrig, Mittel oder Hoch Ihr Urteil, mit einem Grund. Risiko: Was kann schiefgehen, zum Beispiel dass Lernende der Belohnung nachjagen und wenig lernen.",
    ),
    why: t(
      "Block 1.2 asks for exactly this, and Block 2.1 asks you to put improvements in order. The example uses LearnLoop, so the answer for the task case is not given.",
      "Block 1.2 verlangt genau das, und Block 2.1 verlangt, Verbesserungen in eine Reihenfolge zu bringen. Das Beispiel nutzt LearnLoop, damit die Antwort für den Aufgabenfall nicht verraten wird.",
    ),
    picture: t(
      "Three small pictures show LearnLoop's three measures, the table gives the rating of each; select a cell to read the reason. Press “Read the comic” for a short story.",
      "Drei kleine Bilder zeigen LearnLoops drei Maßnahmen, die Tabelle gibt die Bewertung jeder; wählen Sie eine Zelle, um den Grund zu lesen. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B1: {
    idea: t(
      "The plan's coaching says that gamification is a tool, not a goal. A tool serves an objective: you start from what learners should be able to do, choose a mechanic that encourages the behaviour that leads there, and check the result. The chain runs from objective to mechanic to behaviour to result. Motivation is not the same as gamification.",
      "Das Coaching des Plans sagt, dass Gamification ein Werkzeug ist, kein Ziel. Ein Werkzeug dient einem Ziel: Sie gehen davon aus, was Lernende können sollen, wählen eine Mechanik, die das Verhalten fördert, das dorthin führt, und prüfen das Ergebnis. Die Kette läuft vom Ziel über die Mechanik zum Verhalten zum Ergebnis. Motivation ist nicht dasselbe wie Gamification.",
    ),
    why: t(
      "Block 3.1 asks whether to use gamification at all, which mechanics are meaningful, and how they link to learning objectives. This chain answers all three.",
      "Block 3.1 fragt, ob überhaupt Gamification eingesetzt wird, welche Mechaniken sinnvoll sind und wie sie mit Lernzielen verbunden sind. Diese Kette beantwortet alle drei.",
    ),
    picture: t(
      "The chain reads from left to right: objective, mechanic, behaviour, result. Below it, the test for each link. Nothing to click.",
      "Die Kette liest sich von links nach rechts: Ziel, Mechanik, Verhalten, Ergebnis. Darunter der Test für jedes Glied. Nichts zum Klicken.",
    ),
  },
  B2: {
    idea: t(
      "The plan's conflicts for Day 11 are short-term effect against sustainable learning, motivation against manipulation, and engagement against overload. A reward can lift activity at once and still leave nothing behind. A streak that punishes can push people, but it creates pressure and worry. The aim is the combination that keeps learners going and learning.",
      "Die Konflikte des Plans für Tag 11 sind kurzfristige Wirkung gegen nachhaltiges Lernen, Motivation gegen Manipulation und Engagement gegen Überlastung. Eine Belohnung kann die Aktivität sofort heben und trotzdem nichts hinterlassen. Ein Streak, der bestraft, kann Menschen antreiben, erzeugt aber Druck und Sorge. Das Ziel ist die Verbindung, die Lernende dranhält und lernen lässt.",
    ),
    why: t(
      "Block 3.1 asks for a risk analysis, with perverse incentives and over-motivation. The rules of this card tell you how to weigh them.",
      "Block 3.1 verlangt eine Risikoanalyse mit perversen Anreizen und Übermotivation. Die Regeln dieser Karte sagen Ihnen, wie Sie sie abwägen.",
    ),
    picture: t(
      "The matrix places six LearnLoop game ideas by their short-term effect (to the right) and how much sustainable learning they leave (upwards). The position is a reading of the example, not a score. The top right is the aim. Select a point to read why it sits there. Press “Read the comic” for a short story.",
      "Die Matrix ordnet sechs LearnLoop-Spielideen nach ihrer kurzfristigen Wirkung (nach rechts) und danach, wie viel nachhaltiges Lernen sie hinterlassen (nach oben). Die Position ist eine Lesart des Beispiels, keine Note. Oben rechts ist das Ziel. Wählen Sie einen Punkt, um zu lesen, warum er dort liegt. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B3: {
    idea: t(
      "The plan asks you to decide although you have no proof yet that gamification works, and competitors use it heavily. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. A cheap test against a control group is the usual way to get proof.",
      "Der Plan verlangt, zu entscheiden, obwohl Sie noch keinen Beleg haben, dass Gamification wirkt, und Wettbewerber sie stark nutzen. Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten. Ein günstiger Test gegen eine Kontrollgruppe ist der übliche Weg zu einem Beleg.",
    ),
    why: t(
      "Block 3.1 asks for exactly this, as its last question, together with prioritised measures and a risk analysis.",
      "Block 3.1 verlangt genau das, als letzte Frage, zusammen mit priorisierten Maßnahmen und einer Risikoanalyse.",
    ),
    picture: t(
      "The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions. Nothing to click.",
      "Die vier Kästen oben sind die Teile der Entscheidung, für LearnLoop ausgefüllt. Die zwei Kästen darunter sind die Regel für künftige Entscheidungen. Nichts zum Klicken.",
    ),
  },
});

const M = makeMaterials(11, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
