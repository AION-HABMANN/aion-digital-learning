import { bi, t } from "@/lib/lang";

/**
 * Day 1 · the material registry: the rail, the cards, the page map and the task chips all read it. Materi A (Route 1, Levels 1 and 2) has five
 * cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow the topic groups of the plan's Wissen cell (UX vs UI,
 * learning success, user-centredness, user groups, the three principles, learning platforms against classic apps, learning contexts,
 * conflicting goals, the role of UX in the business model). A4 is Optional: no Core block draws on it (CLAUDE.md #35, #40).
 */
export type MaterialId = "A1" | "A2" | "A3" | "A4" | "A5" | "B1" | "B2" | "B3";
export type Block = "A" | "B";
export type MaterialMeta = { id: MaterialId; block: Block; title: string; minutes: number; optional?: boolean };

export const MATERIALS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as Block, title: t("UX is the experience, UI is the surface", "UX ist das Erlebnis, UI ist die Oberfläche"), minutes: 10 },
  { id: "A2" as MaterialId, block: "A" as Block, title: t("Design from the learner's need, not from the system's logic", "Vom Bedarf der Lernenden aus gestalten, nicht von der Systemlogik"), minutes: 12 },
  { id: "A3" as MaterialId, block: "A" as Block, title: t("Three principles of a good learning interface", "Drei Prinzipien einer guten Lernoberfläche"), minutes: 14 },
  { id: "A4" as MaterialId, block: "A" as Block, title: t("A learning platform is not a classic app", "Eine Lernplattform ist keine klassische App"), minutes: 10, optional: true },
  { id: "A5" as MaterialId, block: "A" as Block, title: t("Weighing a measure: user impact, effort, risk", "Eine Maßnahme abwägen: Nutzerwirkung, Aufwand, Risiko"), minutes: 14 },
  { id: "B1" as MaterialId, block: "B" as Block, title: t("Why UX matters to the business", "Warum UX für das Geschäft zählt"), minutes: 18 },
  { id: "B2" as MaterialId, block: "B" as Block, title: t("Conflicting goals: user value, effort and business goals", "Zielkonflikte: Nutzerwert, Aufwand und Geschäftsziele"), minutes: 22 },
  { id: "B3" as MaterialId, block: "B" as Block, title: t("Deciding when you do not know enough", "Entscheiden, wenn man nicht genug weiß"), minutes: 20 },
]);
export const MATERIAL_BY_ID = Object.fromEntries(MATERIALS.map((m) => [m.id, m])) as Record<MaterialId, MaterialMeta>;
export const materialAnchorId = (id: MaterialId) => `mat-${id}`;
/** Card ids are stored with the day in front, so two days never share a "read" mark. */
export const readKey = (id: MaterialId) => `d1:${id}`;

export type RailSection = { id: string; label: string; sub: string; minutes: number };

/* ------------------------------------------------------------------ "In plain words" (CLAUDE.md #22) */

export type PlainExplain = { idea: string; why: string; picture?: string };

export const MATERIAL_PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "UX (user experience) is how using the platform feels from start to finish: finding a course, understanding a lesson, seeing that you are getting somewhere. UI (user interface) is only what you see and touch: buttons, colours, text. A beautiful surface can still give a poor experience. On a learning platform the experience is the product: if learners get lost or do not understand, they do not learn, and they leave.",
      "UX (User Experience) ist, wie sich die Nutzung der Plattform von Anfang bis Ende anfühlt: einen Kurs finden, eine Lektion verstehen, merken, dass man vorankommt. UI (User Interface) ist nur das, was man sieht und anfasst: Buttons, Farben, Text. Eine schöne Oberfläche kann trotzdem ein schlechtes Erlebnis geben. Bei einer Lernplattform ist das Erlebnis das Produkt: Wer sich verirrt oder nichts versteht, lernt nicht und geht.",
    ),
    why: t(
      "Block 1.1 asks you to look at SkillUp's screens from the learner's side. The test of this card is the one you use there: say what the learner cannot do or feel, not what looks wrong.",
      "Block 1.1 verlangt, SkillUps Bildschirme aus Sicht der Lernenden zu betrachten. Der Test dieser Karte ist der, den Sie dort nutzen: Sagen Sie, was die Lernenden nicht können oder fühlen, nicht was schlecht aussieht.",
    ),
    picture: t(
      "The picture shows one course page in two layers. The top layer is the surface (UI): what you see. The bottom row is the experience (UX): find it, understand it, finish it. Nothing to click; read it from top to bottom.",
      "Das Bild zeigt eine Kursseite in zwei Schichten. Die obere Schicht ist die Oberfläche (UI): was man sieht. Die untere Zeile ist das Erlebnis (UX): finden, verstehen, abschließen. Nichts zum Klicken; lesen Sie von oben nach unten.",
    ),
  },
  A2: {
    idea: t(
      "Software is usually built around what it can do: a menu with every feature. Learners come with a goal: carry on where I stopped, find a course for my job, show my employer that I finished. User-centred design starts from that goal and asks what the learner needs at each step. A learning platform has three kinds of users with different goals: learners, teachers, and the organisations that pay for the courses.",
      "Software wird meist um das gebaut, was sie kann: ein Menü mit jeder Funktion. Lernende kommen mit einem Ziel: dort weitermachen, wo ich aufgehört habe, einen Kurs für meinen Beruf finden, dem Arbeitgeber zeigen, dass ich fertig bin. Nutzerzentriertes Design geht von diesem Ziel aus und fragt, was die Lernenden bei jedem Schritt brauchen. Eine Lernplattform hat drei Arten von Nutzern mit verschiedenen Zielen: Lernende, Lehrende und die Organisationen, die die Kurse bezahlen.",
    ),
    why: t(
      "In Block 1.1 and Block 2.2 you judge problems and measures from the learner's side. The test of this card: for every screen or measure, whose goal does it serve, the learner's or the system's?",
      "In Block 1.1 und Block 2.2 beurteilen Sie Probleme und Maßnahmen aus Sicht der Lernenden. Der Test dieser Karte: Wessen Ziel dient jeder Bildschirm und jede Maßnahme, dem der Lernenden oder dem des Systems?",
    ),
    picture: t(
      "Switch between “System's view” and “Learner's view”. The same course is shown twice: first sorted by the system's features, then by what a learner wants to do. Press “Walk me through it” for three short steps.",
      "Wechseln Sie zwischen „Sicht des Systems“ und „Sicht der Lernenden“. Derselbe Kurs wird zweimal gezeigt: erst nach den Funktionen des Systems geordnet, dann nach dem, was Lernende tun wollen. Drücken Sie „Führen Sie mich durch“ für drei kurze Schritte.",
    ),
  },
  A3: {
    idea: t(
      "Good learning screens follow three principles. Clarity and orientation: the learner always knows where they are and what comes next. Low cognitive load: the screen does not spend the learner's limited attention on things that do not help them learn, such as dense text, clutter and unexplained words. Feedback and progress: the learner can see how far they have come and whether they got it right.",
      "Gute Lernbildschirme folgen drei Prinzipien. Klarheit und Orientierung: Die Lernenden wissen immer, wo sie sind und was als Nächstes kommt. Geringe kognitive Belastung: Der Bildschirm verbraucht die begrenzte Aufmerksamkeit der Lernenden nicht für Dinge, die nicht beim Lernen helfen, etwa dichten Text, Unübersichtlichkeit und unerklärte Wörter. Feedback und Fortschritt: Die Lernenden sehen, wie weit sie gekommen sind und ob sie richtig lagen.",
    ),
    why: t(
      "These are the three areas Block 1.1 sorts the findings into: Orientation, Understanding, Motivation. Each finding is one of these principles missing or broken.",
      "Das sind die drei Bereiche, in die Block 1.1 die Befunde einsortiert: Orientierung, Verständnis, Motivation. Jeder Befund ist eines dieser Prinzipien, das fehlt oder verletzt ist.",
    ),
    picture: t(
      "Under the lesson screen are three switches: Orientation, Light load, Feedback. Switch each on or off and watch the same lesson change. “What this shows” says what the learner experiences. Press “Walk me through it” for three short steps.",
      "Unter dem Lektionsbildschirm sind drei Schalter: Orientierung, Leichte Last, Feedback. Schalten Sie jeden ein oder aus und sehen Sie, wie sich dieselbe Lektion verändert. „Was das zeigt“ sagt, was die Lernenden erleben. Drücken Sie „Führen Sie mich durch“ für drei kurze Schritte.",
    ),
  },
  A4: {
    idea: t(
      "In a classic app the goal is a quick task: pay, book, buy. On a learning platform the goal is to change what someone knows or can do, which takes effort and repeated visits. And learners differ in how much they steer themselves: some study alone at their own pace (self-directed), others follow a trainer and a schedule (guided). One screen rarely serves both equally.",
      "Bei einer klassischen App ist das Ziel eine schnelle Aufgabe: bezahlen, buchen, kaufen. Bei einer Lernplattform ist das Ziel, zu verändern, was jemand weiß oder kann, und das braucht Mühe und wiederholte Besuche. Außerdem steuern Lernende sich unterschiedlich stark selbst: Manche lernen allein im eigenen Tempo (selbstgesteuert), andere folgen einem Trainer und einem Zeitplan (geführt). Ein Bildschirm bedient selten beide gleich gut.",
    ),
    why: t(
      "It explains why a measure that makes a screen faster is not automatically better for learning, and why you ask who is learning, alone or with a trainer, before you choose.",
      "Es erklärt, warum eine Maßnahme, die einen Bildschirm schneller macht, nicht automatisch besser fürs Lernen ist, und warum Sie fragen, wer lernt, allein oder mit Trainer, bevor Sie wählen.",
    ),
    picture: t(
      "The first table sets a classic app next to a learning platform; the second sets self-directed next to guided learning. Read across each row.",
      "Die erste Tabelle stellt eine klassische App neben eine Lernplattform; die zweite stellt selbstgesteuertes neben geführtes Lernen. Lesen Sie jede Zeile quer.",
    ),
  },
  A5: {
    idea: t(
      "A budget never covers every good idea, so you compare measures with the same three questions. User impact: how much does it help learners get unstuck, understand or carry on? Effort: money and time; here a rule decides it, under €10,000 is Low, up to €15,000 is Mid, above that is High. Risk: what could go wrong or backfire? Then you put the measures in order and say what information you are missing, because you rarely know enough.",
      "Ein Budget deckt nie jede gute Idee, also vergleichen Sie Maßnahmen mit denselben drei Fragen. Nutzerwirkung: Wie sehr hilft sie den Lernenden, weiterzukommen, zu verstehen oder dranzubleiben? Aufwand: Geld und Zeit; hier entscheidet eine Regel, unter 10.000 € ist Niedrig, bis 15.000 € Mittel, darüber Hoch. Risiko: Was kann schiefgehen oder nach hinten losgehen? Dann bringen Sie die Maßnahmen in eine Reihenfolge und sagen, welche Information Ihnen fehlt, denn man weiß selten genug.",
    ),
    why: t(
      "Block 2.2 asks you to choose four measures for SkillUp, rate them like this, order them and name the missing information. The example here uses LearnLoop, a different company, so the answer is not given.",
      "Block 2.2 verlangt, vier Maßnahmen für SkillUp zu wählen, sie so zu bewerten, zu ordnen und die fehlende Information zu nennen. Das Beispiel hier nutzt LearnLoop, ein anderes Unternehmen, damit die Antwort nicht verraten wird.",
    ),
    picture: t(
      "The grid shows three measures for LearnLoop. Select any cell to read why it has that rating. Press “Walk me through it” for three short steps.",
      "Das Raster zeigt drei Maßnahmen für LearnLoop. Wählen Sie eine Zelle, um zu lesen, warum sie diese Bewertung hat. Drücken Sie „Führen Sie mich durch“ für drei kurze Schritte.",
    ),
  },
  B1: {
    idea: t(
      "A learning platform earns when learners finish courses, come back for the next one and recommend it to their employers. Three numbers show it: completion rate (how many who start, finish), retention (how many come back) and engagement (how much they do while they are there). All three move with the experience, so a UX decision is also a business decision. And if a competitor's platform is easier to use, learners, and the companies that pay for them, can switch.",
      "Eine Lernplattform verdient, wenn Lernende Kurse abschließen, für den nächsten wiederkommen und sie ihren Arbeitgebern empfehlen. Drei Zahlen zeigen das: Completion Rate (wie viele von denen, die beginnen, schließen ab), Retention (wie viele kommen wieder) und Engagement (wie viel sie tun, während sie da sind). Alle drei bewegen sich mit dem Erlebnis, also ist eine UX-Entscheidung auch eine Geschäftsentscheidung. Und wenn die Plattform eines Wettbewerbers leichter zu bedienen ist, können Lernende, und die Firmen, die für sie zahlen, wechseln.",
    ),
    why: t(
      "Route 2 puts you in the chair of SkillUp's Chief UX Officer. Every decision there has to be justified to people who think in completion, retention and cost, not in screens.",
      "Route 2 setzt Sie auf den Stuhl der Chief UX Officer von SkillUp. Jede Entscheidung dort muss Menschen gegenüber begründet werden, die in Abschluss, Bindung und Kosten denken, nicht in Bildschirmen.",
    ),
    picture: t(
      "The chain reads from left to right: what the learner experiences, what they then do, and which number shows it. Follow it from any of the three experiences to its number. Nothing to click.",
      "Die Kette liest sich von links nach rechts: was die Lernenden erleben, was sie daraufhin tun und welche Zahl es zeigt. Folgen Sie ihr von jedem der drei Erlebnisse zu seiner Zahl. Nichts zum Klicken.",
    ),
  },
  B2: {
    idea: t(
      "In every UX decision, goals pull against each other. The plan's own example: usability, depth of content and time pressure. A simple screen is easy to use but may carry less depth; depth takes time the learner may not have. At management level a second tension appears: what is best for the user, what is cheap to build, and what the business asks for. A good decision names the tension in one sentence, says what each side gets, and says what it loses.",
      "Bei jeder UX-Entscheidung ziehen Ziele in verschiedene Richtungen. Das Beispiel des Plans selbst: Usability, Inhaltstiefe und Zeitdruck. Ein einfacher Bildschirm ist leicht zu bedienen, trägt aber vielleicht weniger Tiefe; Tiefe braucht Zeit, die die Lernenden vielleicht nicht haben. Auf Managementebene kommt eine zweite Spannung dazu: was für die Nutzer am besten ist, was billig zu bauen ist und was das Geschäft verlangt. Eine gute Entscheidung benennt die Spannung in einem Satz, sagt, was jede Seite bekommt, und sagt, was sie verliert.",
    ),
    why: t(
      "Block 3.1 asks you to pick three strategic decisions under a limited budget while competitors move. This card gives you the way to weigh them.",
      "Block 3.1 verlangt, drei strategische Entscheidungen bei begrenztem Budget zu wählen, während Wettbewerber sich bewegen. Diese Karte gibt Ihnen die Art, sie abzuwägen.",
    ),
    picture: t(
      "The grid weighs three options for LearnLoop on user value, business value and risk. Select a cell to read the reason. Press “Walk me through it” for three short steps.",
      "Das Raster wägt drei Optionen für LearnLoop nach Nutzerwert, Geschäftswert und Risiko ab. Wählen Sie eine Zelle, um den Grund zu lesen. Drücken Sie „Führen Sie mich durch“ für drei kurze Schritte.",
    ),
  },
  B3: {
    idea: t(
      "Sometimes you must decide without the data you would like. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. You also fix how future UX decisions are made: who decides, and what evidence they need, so that a decision does not rest on one person's taste.",
      "Manchmal müssen Sie ohne die Daten entscheiden, die Sie gern hätten. Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten. Außerdem legen Sie fest, wie künftige UX-Entscheidungen getroffen werden: wer entscheidet und welche Belege er braucht, damit eine Entscheidung nicht am Geschmack einer Person hängt.",
    ),
    why: t(
      "Block 3.2 is exactly this: the risk of your plan, one decision made without complete data, a rule for future decisions, and what you give up.",
      "Block 3.2 ist genau das: das Risiko Ihres Plans, eine Entscheidung ohne vollständige Daten, eine Regel für künftige Entscheidungen und worauf Sie verzichten.",
    ),
    picture: t(
      "The four boxes are the parts of a decision made under uncertainty, filled in for LearnLoop. The two boxes below are the rule for future decisions. Read from left to right. Nothing to click.",
      "Die vier Kästen sind die Teile einer Entscheidung unter Unsicherheit, für LearnLoop ausgefüllt. Die zwei Kästen darunter sind die Regel für künftige Entscheidungen. Lesen Sie von links nach rechts. Nichts zum Klicken.",
    ),
  },
});

/* ------------------------------------------------------------------ Sources (CLAUDE.md CURRICULUM-GUIDE §4) */

export type RefKey = "normanNielsen" | "nielsen1994" | "iso924111" | "iso9241210" | "sweller1988" | "knowles1975" | "gibbons2018" | "klein2007";
export type Reference = { key: RefKey; chip: string; full: string };
const r = (key: RefKey, chip: string, en: string, de: string) => ({ key, chip, full: t(en, de) });

export const REFERENCES: Record<RefKey, Reference> = bi({
  normanNielsen: r("normanNielsen", "Norman & Nielsen", "Norman, D., & Nielsen, J. The Definition of User Experience (UX). Nielsen Norman Group. https://www.nngroup.com/articles/definition-user-experience/ (User experience covers all aspects of the end user's interaction with the company, its services and its products.)", "Norman, D., & Nielsen, J. The Definition of User Experience (UX). Nielsen Norman Group. https://www.nngroup.com/articles/definition-user-experience/ (User Experience umfasst alle Aspekte der Interaktion der Endnutzer mit dem Unternehmen, seinen Dienstleistungen und Produkten.)"),
  nielsen1994: r("nielsen1994", "Nielsen 1994", "Nielsen, J. (1994, reviewed 2024). 10 Usability Heuristics for User Interface Design. Nielsen Norman Group. https://www.nngroup.com/articles/ten-usability-heuristics/ (Visibility of system status: keep users informed with prompt feedback. Match between the system and the real world: use language users know.)", "Nielsen, J. (1994, überprüft 2024). 10 Usability Heuristics for User Interface Design. Nielsen Norman Group. https://www.nngroup.com/articles/ten-usability-heuristics/ (Sichtbarkeit des Systemstatus: Nutzer mit prompter Rückmeldung informieren. Übereinstimmung von System und realer Welt: eine Sprache nutzen, die Nutzer kennen.)"),
  iso924111: r("iso924111", "ISO 9241-11", "ISO 9241-11:2018. Ergonomics of human-system interaction, Part 11: Usability: Definitions and concepts. (Usability: how far a system can be used to reach goals with effectiveness, efficiency and satisfaction in a given context of use.) Check the current edition before you teach from it.", "ISO 9241-11:2018. Ergonomics of human-system interaction, Part 11: Usability: Definitions and concepts. (Usability: wie weit ein System genutzt werden kann, um Ziele mit Effektivität, Effizienz und Zufriedenheit in einem gegebenen Nutzungskontext zu erreichen.) Prüfen Sie die aktuelle Ausgabe, bevor Sie damit unterrichten."),
  iso9241210: r("iso9241210", "ISO 9241-210", "ISO 9241-210:2019. Ergonomics of human-system interaction, Part 210: Human-centred design for interactive systems. (Design starts from users, their tasks and their environment, and is repeated with users.) Check the current edition before you teach from it.", "ISO 9241-210:2019. Ergonomics of human-system interaction, Part 210: Human-centred design for interactive systems. (Gestaltung geht von Nutzern, ihren Aufgaben und ihrer Umgebung aus und wird mit Nutzern wiederholt.) Prüfen Sie die aktuelle Ausgabe, bevor Sie damit unterrichten."),
  sweller1988: r("sweller1988", "Sweller 1988", "Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. Cognitive Science, 12(2), 257–285. https://doi.org/10.1207/s15516709cog1202_4 (Working memory is limited; effort spent on a badly designed task is missing for learning.)", "Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. Cognitive Science, 12(2), 257–285. https://doi.org/10.1207/s15516709cog1202_4 (Das Arbeitsgedächtnis ist begrenzt; Mühe, die in eine schlecht gestaltete Aufgabe fließt, fehlt zum Lernen.)"),
  knowles1975: r("knowles1975", "Knowles 1975", "Knowles, M. S. (1975). Self-Directed Learning: A Guide for Learners and Teachers. Association Press. (A self-directed learner sets goals, finds resources and judges progress; a guided learner gets these from a trainer.)", "Knowles, M. S. (1975). Self-Directed Learning: A Guide for Learners and Teachers. Association Press. (Eine selbstgesteuert Lernende setzt Ziele, findet Ressourcen und beurteilt Fortschritt; eine geführt Lernende bekommt das von einem Trainer.)"),
  gibbons2018: r("gibbons2018", "Gibbons 2018", "Gibbons, S. (2018). Using Prioritization Matrices to Inform UX Decisions. Nielsen Norman Group. https://www.nngroup.com/articles/prioritization-matrices/ (A prioritization matrix plots items on two criteria, for example value to the user against effort.)", "Gibbons, S. (2018). Using Prioritization Matrices to Inform UX Decisions. Nielsen Norman Group. https://www.nngroup.com/articles/prioritization-matrices/ (Eine Priorisierungsmatrix ordnet Punkte nach zwei Kriterien, zum Beispiel Nutzerwert gegen Aufwand.)"),
  klein2007: r("klein2007", "Klein 2007", "Klein, G. (2007). Performing a project premortem. Harvard Business Review, 85(9), 18–19. (Imagine the plan has failed and ask why; it brings risks to the surface before the money is spent.)", "Klein, G. (2007). Performing a project premortem. Harvard Business Review, 85(9), 18–19. (Stellen Sie sich vor, der Plan sei gescheitert, und fragen Sie, warum; so kommen Risiken ans Licht, bevor das Geld ausgegeben ist.)"),
});
export const refFull = (k: RefKey) => REFERENCES[k].full;
export const REFERENCE_ORDER = Object.keys(REFERENCES) as RefKey[];
