import { bi, t } from "@/lib/lang";
import type { MaterialId, Block, MaterialMeta, PlainExplain } from "@/data/day1/materials";

/**
 * Day 6 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards
 * follow the topic groups of the plan's Wissen cell (what a persona is and what is in it, good and weak personas, user journeys, learners and teachers,
 * weighing a measure; then the prioritisation of segments, conflicting needs and deciding which persona to prioritise). A4 (learners and teachers) is
 * Optional: no Core block draws on it (CLAUDE.md #35, #40).
 */
export type { MaterialId, Block, MaterialMeta, PlainExplain };

export const MATERIALS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as Block, title: t("Personas: what they are and what is in them", "Personas: was sie sind und was darin steht"), minutes: 14 },
  { id: "A2" as MaterialId, block: "A" as Block, title: t("Good and weak personas: data, not clichés", "Gute und schwache Personas: Daten statt Klischees"), minutes: 10 },
  { id: "A3" as MaterialId, block: "A" as Block, title: t("User journeys: phases, pain points and emotions", "User Journeys: Phasen, Pain Points und Emotionen"), minutes: 14 },
  { id: "A4" as MaterialId, block: "A" as Block, title: t("Learners and teachers: different perspectives", "Lernende und Lehrende: verschiedene Perspektiven"), minutes: 10, optional: true },
  { id: "A5" as MaterialId, block: "A" as Block, title: t("Weighing a measure along a journey: impact, effort, risk", "Eine Maßnahme entlang einer Journey abwägen: Wirkung, Aufwand, Risiko"), minutes: 12 },
  { id: "B1" as MaterialId, block: "B" as Block, title: t("Segments and strategy: which persona is business-critical", "Segmente und Strategie: welche Persona geschäftskritisch ist"), minutes: 18 },
  { id: "B2" as MaterialId, block: "B" as Block, title: t("Conflicting goals: segments with conflicting needs", "Zielkonflikte: Segmente mit widersprüchlichen Bedürfnissen"), minutes: 22 },
  { id: "B3" as MaterialId, block: "B" as Block, title: t("Deciding which persona to prioritise under uncertainty", "Unter Unsicherheit entscheiden, welche Persona priorisiert wird"), minutes: 20 },
]);
export const MATERIAL_BY_ID = Object.fromEntries(MATERIALS.map((m) => [m.id, m])) as Record<MaterialId, MaterialMeta>;
export const materialAnchorId = (id: MaterialId) => `mat-${id}`;
/** Card ids are stored with the day in front, so two days never share a "read" mark. */
export const readKey = (id: MaterialId) => `d6:${id}`;

/* ------------------------------------------------------------------ "In plain words" (CLAUDE.md #22, #51) */

export const MATERIAL_PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "A persona is a representative user profile. It stands for a group of real users and makes their needs concrete enough to discuss. Three things go into it: goals (why does the person learn?), problems and frustrations (what gets in the way?) and the context of use (time, device, motivation). Learners and teachers need different personas, because their perspectives differ.",
      "Eine Persona ist ein repräsentatives Nutzerprofil. Sie steht für eine Gruppe echter Nutzer und macht ihre Bedürfnisse so konkret, dass man darüber reden kann. Drei Dinge gehören hinein: Ziele (warum lernt die Person?), Probleme und Frustrationen (was steht im Weg?) und der Nutzungskontext (Zeit, Gerät, Motivation). Lernende und Lehrende brauchen verschiedene Personas, weil ihre Perspektiven verschieden sind.",
    ),
    why: t(
      "In Task 1 you sort research notes into the persona fields and then write a persona. This card shows what the fields mean and what a usable persona looks like.",
      "In Task 1 sortieren Sie Recherchenotizen in die Persona-Felder und schreiben dann eine Persona. Diese Karte zeigt, was die Felder bedeuten und wie eine brauchbare Persona aussieht.",
    ),
    picture: t(
      "The card is one example persona for LearnLoop. Read the three fields from left to right: goal, problems and frustrations, context of use. Below them, one line says what the persona is built from. Switch between “A persona nobody can use” and “A persona a team can decide with” and press “Read the comic” for a short story.",
      "Die Karte ist eine Beispiel-Persona für LearnLoop. Lesen Sie die drei Felder von links nach rechts: Ziel, Probleme und Frustrationen, Nutzungskontext. Darunter sagt eine Zeile, woraus die Persona gebaut ist. Wechseln Sie zwischen „Eine Persona, die niemand nutzen kann“ und „Eine Persona, mit der ein Team entscheiden kann“ und drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A2: {
    idea: t(
      "The plan names two typical mistakes: clichés instead of data, and personas that are too general. A useful persona rests on data, differs from the other personas, and is used in decisions. It stops a team from designing for everyone, which means designing for no one.",
      "Der Plan nennt zwei typische Fehler: Klischees statt Daten und zu allgemeine Personas. Eine brauchbare Persona beruht auf Daten, unterscheidet sich von den anderen Personas und wird in Entscheidungen genutzt. Sie hält ein Team davon ab, für alle zu gestalten, was heißt, für niemanden zu gestalten.",
    ),
    why: t(
      "In Task 1 and Task 2 you write and choose personas. This card is the quality check for what you write.",
      "In Task 1 und Task 2 schreiben und wählen Sie Personas. Diese Karte ist die Qualitätsprüfung für das, was Sie schreiben.",
    ),
    picture: t(
      "Two persona cards sit side by side: a weak one built from clichés and a useful one built from data. Select a mistake on the weak card to see what it replaces on the useful one. Below, the sources of data are listed, and the table sets behaviour against demographics. Press “Read the comic” for a short story.",
      "Zwei Persona-Karten stehen nebeneinander: eine schwache aus Klischees und eine brauchbare aus Daten. Wählen Sie einen Fehler auf der schwachen Karte, um zu sehen, was er auf der brauchbaren ersetzt. Darunter sind die Datenquellen aufgelistet, und die Tabelle stellt Verhalten gegen Demografie. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A3: {
    idea: t(
      "A user journey is the step-by-step experience of a user. In a learning context the plan names three phases: entry, learning, and progress and completion. A journey map shows, for each phase, what the person does, what they think and how they feel, and marks the pain points. The emotional perspective shows where to act first.",
      "Eine User Journey ist das schrittweise Erleben eines Nutzers. Im Lernkontext nennt der Plan drei Phasen: Einstieg, Lernen sowie Fortschritt und Abschluss. Eine Journey Map zeigt für jede Phase, was die Person tut, was sie denkt und wie sie sich fühlt, und markiert die Pain Points. Die emotionale Perspektive zeigt, wo man zuerst ansetzen sollte.",
    ),
    why: t(
      "Task 1 asks you to map journeys, to name the pain point each measure answers and to say which phase is critical. This card gives you the grid and the reading rules.",
      "Task 1 verlangt, Journeys abzubilden, den Pain Point zu nennen, den jede Maßnahme beantwortet, und zu sagen, welche Phase kritisch ist. Diese Karte gibt Ihnen das Raster und die Leseregeln.",
    ),
    picture: t(
      "The journey map follows one persona through three phases. The line is the emotion curve: low points are frustration, high points motivation. Select a phase to read what the person does and where it breaks. Change the emotion of a phase with the buttons and see where the critical point moves. Press “Read the comic” for a short story.",
      "Die Journey Map folgt einer Persona durch drei Phasen. Die Linie ist die Emotionskurve: Tiefpunkte sind Frustration, Hochpunkte Motivation. Wählen Sie eine Phase, um zu lesen, was die Person tut und wo es bricht. Ändern Sie die Emotion einer Phase mit den Schaltflächen und sehen Sie, wohin der kritische Punkt wandert. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A4: {
    idea: t(
      "The plan stresses that learners and teachers have different perspectives. The learner wants to finish; the teacher wants to build and run a course with little effort and to see how learners are doing. A platform that serves only one of them fails the other, which the organisation sees as low usage.",
      "Der Plan betont, dass Lernende und Lehrende verschiedene Perspektiven haben. Die Lernende will abschließen; die Lehrende will einen Kurs mit wenig Aufwand bauen und durchführen und sehen, wie es den Lernenden geht. Eine Plattform, die nur eine von beiden bedient, lässt die andere im Stich, was die Organisation als geringe Nutzung sieht.",
    ),
    why: t(
      "The optional case-study block asks for one persona and one journey per group. This card shows how far apart they can be.",
      "Der optionale Fallstudienblock verlangt eine Persona und eine Journey pro Gruppe. Diese Karte zeigt, wie weit sie auseinanderliegen können.",
    ),
    picture: t(
      "The same platform is drawn twice: once as the learner sees it and once as the teacher sees it. Two columns set the perspectives next to each other, row by row. Nothing to click.",
      "Dieselbe Plattform ist zweimal gezeichnet: einmal, wie die Lernende sie sieht, und einmal, wie die Lehrende sie sieht. Zwei Spalten stellen die Perspektiven Zeile für Zeile nebeneinander. Nichts zum Klicken.",
    ),
  },
  A5: {
    idea: t(
      "To choose between measures, place each on the journey and rate it on three questions. User impact: how much does it help the persona at a pain point, and how many people does that persona stand for? Effort: money and time, decided here by a rule: under €8,000 is Low, up to €15,000 is Mid, above that is High. Risk: what could go wrong or be lost?",
      "Um zwischen Maßnahmen zu wählen, ordnen Sie jede auf der Journey ein und bewerten sie mit drei Fragen. Nutzerwirkung: Wie sehr hilft sie der Persona an einem Pain Point, und für wie viele Menschen steht diese Persona? Aufwand: Geld und Zeit, hier von einer Regel entschieden: unter 8.000 € ist Niedrig, bis 15.000 € Mittel, darüber Hoch. Risiko: Was kann schiefgehen oder verloren gehen?",
    ),
    why: t(
      "Block 2.2 of the task asks for exactly this. The example uses LearnLoop, so the answer for the task case is not given.",
      "Block 2.2 der Aufgabe verlangt genau das. Das Beispiel nutzt LearnLoop, damit die Antwort für den Aufgabenfall nicht verraten wird.",
    ),
    picture: t(
      "First, three small pictures show LearnLoop's three measures: a resume button, five-minute learning formats and a new course editor. The bars show the cost of the three measures. The coloured bands behind them are the effort rule, and the dashed line is the budget. Under the bars, the table gives the rating of each measure; select a cell to read the reason. Press “Read the comic” for a short story.",
      "Zuerst zeigen drei kleine Bilder LearnLoops drei Maßnahmen: einen Fortsetzen-Button, Fünf-Minuten-Lernformate und einen neuen Kurseditor. Die Balken zeigen die Kosten der drei Maßnahmen. Die farbigen Bänder dahinter sind die Aufwandsregel, die gestrichelte Linie ist das Budget. Unter den Balken gibt die Tabelle die Bewertung jeder Maßnahme; wählen Sie eine Zelle, um den Grund zu lesen. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B1: {
    idea: t(
      "A platform serves several user segments. Which one deserves the most attention? Three questions help: how large is the segment, what is it worth to the business, and where does its journey break most? A small segment can be the most critical.",
      "Eine Plattform bedient mehrere Nutzersegmente. Welches verdient die meiste Aufmerksamkeit? Drei Fragen helfen: Wie groß ist das Segment, was ist es dem Unternehmen wert und wo bricht seine Journey am stärksten? Ein kleines Segment kann das kritischste sein.",
    ),
    why: t(
      "Task 2 asks you to choose two or three strategic personas, to select the most important target group and to name its three biggest problems. This card gives you the grid.",
      "Task 2 verlangt, zwei oder drei strategische Personas zu wählen, die wichtigste Zielgruppe auszuwählen und ihre drei größten Probleme zu nennen. Diese Karte gibt Ihnen das Raster.",
    ),
    picture: t(
      "The matrix places five segments of LearnLoop by their size (left to right) and by their business value (bottom to top). Select a segment to read where it sits and why. The position is a reading of the example, not a score. A small segment high up is small but critical. Press “Read the comic” for a short story.",
      "Die Matrix ordnet fünf Segmente von LearnLoop nach ihrer Größe (von links nach rechts) und nach ihrem Geschäftswert (von unten nach oben). Wählen Sie ein Segment, um zu lesen, wo es liegt und warum. Die Position ist eine Lesart des Beispiels, keine Note. Ein kleines Segment weit oben ist klein, aber kritisch. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B2: {
    idea: t(
      "The plan's conflict for Day 6 is the prioritisation of user groups: their needs can conflict, and resources are limited. A design that tries to satisfy every segment fully ends up serving none. A strategy picks a primary segment, serves the others as far as it does not harm the primary one, and says what the others give up.",
      "Der Konflikt des Plans für Tag 6 ist die Priorisierung von Nutzergruppen: Ihre Bedürfnisse können kollidieren, und die Ressourcen sind begrenzt. Ein Design, das jedes Segment vollständig bedienen will, bedient am Ende keines. Eine Strategie wählt ein primäres Segment, bedient die anderen, soweit es dem primären nicht schadet, und sagt, worauf die anderen verzichten.",
    ),
    why: t(
      "Task 2 asks you to select the most important target group and to prioritise an optimisation strategy. This card gives you the argument.",
      "Task 2 verlangt, die wichtigste Zielgruppe auszuwählen und eine Optimierungsstrategie zu priorisieren. Diese Karte gibt Ihnen das Argument.",
    ),
    picture: t(
      "Two segments of LearnLoop are drawn as two screens that want different things. Switch between “Design for everyone”, “Primary first” and “Share what is common” to see what each choice gives to each side and what it costs. A table below lists four typical conflicts with a rule for each. Press “Read the comic” for a short story.",
      "Zwei Segmente von LearnLoop sind als zwei Bildschirme gezeichnet, die Verschiedenes wollen. Wechseln Sie zwischen „Für alle gestalten“, „Primäres zuerst“ und „Das Gemeinsame teilen“, um zu sehen, was jede Wahl jeder Seite gibt und was sie kostet. Eine Tabelle darunter listet vier typische Konflikte mit je einer Regel. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B3: {
    idea: t(
      "The plan asks you to decide under uncertainty, for example which persona is prioritised. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. Personas written from thin data are hypotheses; the decision should include how you will test them.",
      "Der Plan verlangt, unter Unsicherheit zu entscheiden, zum Beispiel welche Persona priorisiert wird. Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten. Personas, die aus dünnen Daten entstanden sind, sind Hypothesen; die Entscheidung sollte einschließen, wie Sie sie testen.",
    ),
    why: t(
      "Block 3.2 asks for exactly this, for a platform with limited data.",
      "Block 3.2 verlangt genau das, für eine Plattform mit begrenzten Daten.",
    ),
    picture: t(
      "A strip shows how much evidence three personas rest on, and the switch “Review in two quarters” shows what a reversible priority looks like against a rebuilt platform. Below, the four boxes are the parts of the decision, filled in for LearnLoop, and the two boxes at the bottom are the rule for future decisions. Press “Read the comic” for a short story.",
      "Ein Streifen zeigt, auf wie viel Belegen drei Personas beruhen, und der Schalter „In zwei Quartalen prüfen“ zeigt, wie sich eine umkehrbare Priorität gegenüber einer umgebauten Plattform darstellt. Darunter sind die vier Kästen die Teile der Entscheidung, für LearnLoop ausgefüllt, und die zwei Kästen unten sind die Regel für künftige Entscheidungen. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
});
