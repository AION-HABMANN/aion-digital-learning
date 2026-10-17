import { bi, t } from "@/lib/lang";
import type { MaterialId, Block, MaterialMeta, PlainExplain } from "@/data/day1/materials";

/**
 * Day 5 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards
 * follow the topic groups of the plan's Wissen cell (the principle of user-centredness, understanding users in the learning context, typical mistakes without
 * user-centredness, methods of user-centred design, UX as a strategic factor and its conflicting goals). A4 (methods) is Optional: no Core block draws on it
 * (CLAUDE.md #35, #40).
 */
export type { MaterialId, Block, MaterialMeta, PlainExplain };

export const MATERIALS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as Block, title: t("User-centred against feature-driven", "Nutzerzentriert gegen funktionsgetrieben"), minutes: 12 },
  { id: "A2" as MaterialId, block: "A" as Block, title: t("Understanding learners: goals, expectations and contexts of use", "Lernende verstehen: Ziele, Erwartungen und Nutzungskontexte"), minutes: 12 },
  { id: "A3" as MaterialId, block: "A" as Block, title: t("Typical mistakes of platforms without user focus", "Typische Fehler von Plattformen ohne Nutzerfokus"), minutes: 10 },
  { id: "A4" as MaterialId, block: "A" as Block, title: t("Methods of user-centred design: a first overview", "Methoden des nutzerzentrierten Designs: ein erster Überblick"), minutes: 12, optional: true },
  { id: "A5" as MaterialId, block: "A" as Block, title: t("Weighing a user-centred measure: user value, effort, risk", "Eine nutzerzentrierte Maßnahme abwägen: Nutzerwert, Aufwand, Risiko"), minutes: 14 },
  { id: "B1" as MaterialId, block: "B" as Block, title: t("UX as the bridge between user needs and the business model", "UX als Brücke zwischen Nutzerbedürfnissen und Geschäftsmodell"), minutes: 18 },
  { id: "B2" as MaterialId, block: "B" as Block, title: t("Conflicting goals: user, business and technology", "Zielkonflikte: Nutzer, Unternehmen und Technik"), minutes: 22 },
  { id: "B3" as MaterialId, block: "B" as Block, title: t("Deciding without complete user data, and a decision architecture", "Ohne vollständige Nutzerdaten entscheiden, und eine Entscheidungsarchitektur"), minutes: 20 },
]);
export const MATERIAL_BY_ID = Object.fromEntries(MATERIALS.map((m) => [m.id, m])) as Record<MaterialId, MaterialMeta>;
export const materialAnchorId = (id: MaterialId) => `mat-${id}`;
/** Card ids are stored with the day in front, so two days never share a "read" mark. */
export const readKey = (id: MaterialId) => `d5:${id}`;

/* ------------------------------------------------------------------ "In plain words" (CLAUDE.md #22, #51) */

export const MATERIAL_PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "User-centred design means designing from the user's perspective, not the system's. A feature-driven platform decides what to build from what the software could do, or from what a department asked for. A user-driven platform decides from what learners need to do. UX is the bridge between those needs and the business model of the company.",
      "Nutzerzentriertes Design heißt, aus der Perspektive der Nutzer zu gestalten, nicht aus der des Systems. Eine funktionsgetriebene Plattform entscheidet, was sie baut, danach, was die Software könnte oder was eine Abteilung verlangt hat. Eine nutzergetriebene Plattform entscheidet danach, was Lernende tun müssen. UX ist die Brücke zwischen diesen Bedürfnissen und dem Geschäftsmodell des Unternehmens.",
    ),
    why: t(
      "Task 1 describes a platform with many functions and little use. You will look at it through the learner's eyes, and you will need words to say what is wrong with deciding by features.",
      "Task 1 beschreibt eine Plattform mit vielen Funktionen und wenig Nutzung. Sie betrachten sie mit den Augen der Lernenden und brauchen Worte, um zu sagen, was daran falsch ist, nach Features zu entscheiden.",
    ),
    picture: t(
      "The first picture shows the same platform home screen decided in two ways: switch between “Decided by features” and “Decided by learner tasks” to see the menu change, and press “Read the comic” for a short story. The second picture draws the three kinds of quality of the Kano model as three curves, so you can see why extra features do not rescue a weak basic.",
      "Das erste Bild zeigt denselben Startbildschirm einer Plattform, auf zwei Arten entschieden: Wechseln Sie zwischen „Nach Features entschieden“ und „Nach Aufgaben der Lernenden entschieden“, um das Menü sich ändern zu sehen, und drücken Sie „Comic lesen“ für eine kurze Geschichte. Das zweite Bild zeichnet die drei Qualitätsarten des Kano-Modells als drei Kurven, damit Sie sehen, warum zusätzliche Features ein schwaches Fundament nicht retten.",
    ),
  },
  A2: {
    idea: t(
      "To design from the user's perspective you need to know three things: who the users are (learners, teachers, organisations), what they want and expect, and in what situation they use the platform. The situation is the context of use: on a phone, on the side between meetings, in an intensive weekend, or because training is mandatory.",
      "Um aus der Perspektive der Nutzer zu gestalten, müssen Sie drei Dinge wissen: wer die Nutzer sind (Lernende, Lehrende, Organisationen), was sie wollen und erwarten und in welcher Situation sie die Plattform nutzen. Die Situation ist der Nutzungskontext: auf dem Handy, nebenbei zwischen Terminen, an einem Intensivwochenende oder weil die Weiterbildung verpflichtend ist.",
    ),
    why: t(
      "In Task 1 you put yourself into a learner's position and write their goals and frustrations. This card gives you the situations to think of.",
      "In Task 1 versetzen Sie sich in die Lage einer Lernenden und schreiben ihre Ziele und Frustrationen auf. Diese Karte gibt Ihnen die Situationen, an die Sie denken können.",
    ),
    picture: t(
      "Four small scenes show four contexts of use: a phone on a train, a desk between two meetings, a laptop in an intensive weekend, and a mandatory course with a deadline. Under each scene is what the design must allow. Below, a table lists the three user groups with their goal, expectation and typical problem. Nothing to click.",
      "Vier kleine Szenen zeigen vier Nutzungskontexte: ein Handy im Zug, einen Schreibtisch zwischen zwei Terminen, einen Laptop an einem Intensivwochenende und einen verpflichtenden Kurs mit einer Frist. Unter jeder Szene steht, was das Design erlauben muss. Darunter listet eine Tabelle die drei Nutzergruppen mit Ziel, Erwartung und typischem Problem. Nichts zum Klicken.",
    ),
  },
  A3: {
    idea: t(
      "The plan lists three mistakes that follow from not designing for the user. The platform talks about its functions instead of what the learner can do. The interface is overly complex: too many choices at once. And orientation and structure are missing: the learner cannot tell where they are or where the content is.",
      "Der Plan nennt drei Fehler, die daraus folgen, nicht für die Nutzer zu gestalten. Die Plattform spricht über ihre Funktionen statt darüber, was die Lernende tun kann. Die Oberfläche ist übermäßig komplex: zu viele Auswahlmöglichkeiten auf einmal. Und Orientierung und Struktur fehlen: Die Lernende erkennt nicht, wo sie ist oder wo der Inhalt liegt.",
    ),
    why: t(
      "These are the three areas Block 1.1 sorts the facts into. Each fact in the task is one of these mistakes.",
      "Das sind die drei Bereiche, in die Block 1.1 die Fakten sortiert. Jeder Fakt der Aufgabe ist einer dieser Fehler.",
    ),
    picture: t(
      "The home screen below is Mia's platform. Switch the three mistakes on and off: software names or learner words, many things or few, no orientation or a continue entry and a path. Watch the same screen turn from hard to use into easy to use. Press “Read the comic” for a short story.",
      "Der Startbildschirm unten ist Mias Plattform. Schalten Sie die drei Fehler ein und aus: Softwarenamen oder Worte der Lernenden, viele Dinge oder wenige, keine Orientierung oder ein Weiter-Eintrag und ein Pfad. Sehen Sie, wie derselbe Bildschirm von schwer nutzbar zu leicht nutzbar wird. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A4: {
    idea: t(
      "The plan lists four methods in overview: observation and user feedback, personas, user journeys and iterative design. Methods differ in what they tell you. Interviews and surveys show what people say; usability tests, observation and analytics show what people do. Small studies give reasons; large ones give counts.",
      "Der Plan nennt vier Methoden im Überblick: Beobachtung und Nutzer-Feedback, Personas, User Journeys und iteratives Design. Methoden unterscheiden sich darin, was sie Ihnen sagen. Interviews und Umfragen zeigen, was Menschen sagen; Usability-Tests, Beobachtung und Analytics zeigen, was Menschen tun. Kleine Studien liefern Gründe; große liefern Zahlen.",
    ),
    why: t(
      "In the plan's Level 3 task you decide without complete user data, so you need to know which method would close which gap.",
      "In der Level-3-Aufgabe des Plans entscheiden Sie ohne vollständige Nutzerdaten, Sie müssen also wissen, welche Methode welche Lücke schließen würde.",
    ),
    picture: t(
      "The matrix places five methods by what they tell you about (what people say against what they do, left to right) and the number of people involved (few to many, bottom to top). Select a method to read where it sits and which gap it closes; the position is a reading, not a ranking. Press “Read the comic” for a short story.",
      "Die Matrix ordnet fünf Methoden danach, worüber sie Auskunft geben (was Menschen sagen gegen was sie tun, von links nach rechts) und wie viele Menschen beteiligt sind (wenige bis viele, von unten nach oben). Wählen Sie eine Methode, um zu lesen, wo sie liegt und welche Lücke sie schließt; die Position ist eine Lesart, keine Rangfolge. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A5: {
    idea: t(
      "To choose between measures, rate each on the same three questions. User value: how much does it help learners reach their goal? Effort: money and time, decided here by a rule: under €10,000 is Low, up to €20,000 is Mid, above that is High. Risk: what could go wrong or be lost? Then add one sentence on what the business gets, because management weighs a fourth question: what do we gain?",
      "Um zwischen Maßnahmen zu wählen, bewerten Sie jede mit denselben drei Fragen. Nutzerwert: Wie sehr hilft sie Lernenden, ihr Ziel zu erreichen? Aufwand: Geld und Zeit, hier von einer Regel entschieden: unter 10.000 € ist Niedrig, bis 20.000 € Mittel, darüber Hoch. Risiko: Was kann schiefgehen oder verloren gehen? Dann ergänzen Sie einen Satz dazu, was das Unternehmen bekommt, denn das Management wägt eine vierte Frage ab: Was gewinnen wir?",
    ),
    why: t(
      "Block 1.2 and Block 2.2 of the task ask for this. The example uses LearnLoop, so the answer for the task case is not given.",
      "Block 1.2 und Block 2.2 der Aufgabe verlangen das. Das Beispiel nutzt LearnLoop, damit die Antwort für den Aufgabenfall nicht verraten wird.",
    ),
    picture: t(
      "First, three small pictures show LearnLoop's three ideas: a chat feature, a menu rebuilt around tasks, and ten new courses. The bars show the cost of the three measures. The coloured bands behind them are the effort rule, and the dashed line is the budget. Under the bars, the table gives the rating of each option; select a cell to read the reason. Press “Read the comic” for a short story.",
      "Zuerst zeigen drei kleine Bilder LearnLoops drei Ideen: ein Chat-Feature, ein um Aufgaben herum neu gebautes Menü und zehn neue Kurse. Die Balken zeigen die Kosten der drei Maßnahmen. Die farbigen Bänder dahinter sind die Aufwandsregel, die gestrichelte Linie ist das Budget. Unter den Balken gibt die Tabelle die Bewertung jeder Option; wählen Sie eine Zelle, um den Grund zu lesen. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B1: {
    idea: t(
      "The plan calls user-centred UX a strategic success factor. It influences engagement, learning success and the drop-out rate, and so the numbers the business watches. UX is the translation between what the learner needs and what the company earns from.",
      "Der Plan nennt nutzerzentriertes UX einen strategischen Erfolgsfaktor. Es beeinflusst Engagement, Lernerfolg und Abbruchquote und damit die Zahlen, die das Unternehmen beobachtet. UX ist die Übersetzung zwischen dem, was die Lernende braucht, und dem, womit das Unternehmen verdient.",
    ),
    why: t(
      "Task 2 asks you to define the central user needs and to conflict-analyse user against business. To do it you must be able to say each need in business terms.",
      "Task 2 verlangt, die zentralen Nutzerbedürfnisse zu definieren und Nutzer gegen Unternehmen konfliktanalytisch zu betrachten. Dazu müssen Sie jedes Bedürfnis in Geschäftsbegriffen sagen können.",
    ),
    picture: t(
      "The chain runs from a user need, through the UX decision that serves it, to the business figure that moves. Select one of the four needs and the whole chain lights up for it. Below, a short list says why companies often fail to act user-centred. Press “Read the comic” for a short story.",
      "Die Kette läuft von einem Nutzerbedürfnis über die UX-Entscheidung, die es bedient, zur Geschäftszahl, die sich bewegt. Wählen Sie eines der vier Bedürfnisse, und die ganze Kette leuchtet dafür auf. Darunter sagt eine kurze Liste, warum Unternehmen oft nicht nutzerzentriert handeln. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B2: {
    idea: t(
      "The plan's conflict for Day 5 is user against business against technology. The user wants to find and finish. The business wants growth, retention and low cost. Technology sets what can be built and kept running. A good UX decision aims for the overlap, and when none exists, says which goal wins and what the others lose.",
      "Der Konflikt des Plans für Tag 5 lautet Nutzer gegen Unternehmen gegen Technik. Der Nutzer will finden und abschließen. Das Unternehmen will Wachstum, Retention und niedrige Kosten. Die Technik legt fest, was gebaut und am Laufen gehalten werden kann. Eine gute UX-Entscheidung zielt auf die Überschneidung und sagt, wenn es keine gibt, welches Ziel gewinnt und was die anderen verlieren.",
    ),
    why: t(
      "Task 2 asks for a conflict analysis (user against business) and a prioritised roadmap. The rules of this card tell you how to argue each choice.",
      "Task 2 verlangt eine Konfliktanalyse (Nutzer gegen Unternehmen) und eine priorisierte Roadmap. Die Regeln dieser Karte sagen Ihnen, wie Sie jede Wahl begründen.",
    ),
    picture: t(
      "Three circles are the three goals: the user, the business and the technology. Select one of four typical conflicts and the circles it serves light up, with what each side gets or loses written beside them. The centre, where all three meet, is the aim. Press “Read the comic” for a short story.",
      "Drei Kreise sind die drei Ziele: der Nutzer, das Unternehmen und die Technik. Wählen Sie einen von vier typischen Konflikten, und die Kreise, die er bedient, leuchten auf, mit dem, was jede Seite bekommt oder verliert, daneben. Die Mitte, wo sich alle drei treffen, ist das Ziel. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B3: {
    idea: t(
      "The plan asks you to decide without complete user data. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. A decision architecture for user-centred development then names who decides and what evidence a decision needs, so that features start from users.",
      "Der Plan verlangt, ohne vollständige Nutzerdaten zu entscheiden. Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten. Eine Entscheidungsarchitektur für nutzerzentrierte Entwicklung nennt dann, wer entscheidet und welche Belege eine Entscheidung braucht, damit Features bei den Nutzern beginnen.",
    ),
    why: t(
      "Block 3.2 asks for exactly this, and for a rule that holds for every future feature.",
      "Block 3.2 verlangt genau das und eine Regel, die für jedes künftige Feature gilt.",
    ),
    picture: t(
      "The gate shows a feature request on its way to the roadmap: switch on a named user problem, a metric and an owner, and see when the request may enter. Below, the four boxes are the parts of the decision, filled in for LearnLoop, and the two boxes at the bottom are the rule for future decisions. Press “Read the comic” for a short story.",
      "Das Tor zeigt eine Feature-Anfrage auf dem Weg zur Roadmap: Schalten Sie ein genanntes Nutzerproblem, eine Kennzahl und einen Verantwortlichen ein und sehen Sie, wann die Anfrage eintreten darf. Darunter sind die vier Kästen die Teile der Entscheidung, für LearnLoop ausgefüllt, und die zwei Kästen unten sind die Regel für künftige Entscheidungen. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
});
