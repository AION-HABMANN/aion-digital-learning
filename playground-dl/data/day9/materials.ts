import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/day1/materials";

/**
 * Day 9 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow the
 * topic groups of the plan's Wissen cell (information architecture; navigation in learning platforms; interactive elements; engagement strategies through interaction;
 * then structure and interaction as steering of behaviour, the conflicts, and a decision without behaviour data). A4 (engagement strategies) is Optional: no Core task
 * block draws on it, because feedback and variety are repeated in A3 (CLAUDE.md #35, #40).
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("Information architecture: organising content so that it can be found and understood", "Informationsarchitektur: Inhalt so ordnen, dass er gefunden und verstanden wird"), minutes: 14 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("Navigation in learning platforms: orientation, types and typical mistakes", "Navigation in Lernplattformen: Orientierung, Arten und typische Fehler"), minutes: 14 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("Interactive elements: quizzes, tasks and clicks as a learning reinforcer", "Interaktive Elemente: Quizze, Aufgaben und Klicks als Lernverstärker"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Engagement strategies through interaction: activation, feedback and variety", "Engagement-Strategien durch Interaktion: Aktivierung, Rückmeldung und Abwechslung"), minutes: 10 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("Weighing a structure or interaction measure: learning impact, effort, risk", "Eine Maßnahme für Struktur oder Interaktion abwägen: Lernwirkung, Aufwand, Risiko"), minutes: 10 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Structure guides, interaction activates: orientation, activation, engagement", "Struktur führt, Interaktion aktiviert: Orientierung, Aktivierung, Engagement"), minutes: 18 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Conflicting goals: structure against flexibility, and interaction against overload", "Zielkonflikte: Struktur gegen Flexibilität und Interaktion gegen Überlastung"), minutes: 22 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Deciding without behaviour data: a structure and an interaction plan you can check later", "Entscheiden ohne Verhaltensdaten: eine Struktur und ein Interaktionsplan, die Sie später prüfen können"), minutes: 20 },
]);

/** "In plain words" (CLAUDE.md #22, #51). */
const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "Information architecture is how the content of a platform is organised and named. Its goal is that content can be found and understood. Three principles carry it: clear hierarchies, logical grouping, and a reduction of complexity.",
      "Informationsarchitektur ist, wie der Inhalt einer Plattform geordnet und benannt ist. Ihr Ziel ist, dass Inhalt gefunden und verstanden wird. Drei Prinzipien tragen sie: klare Hierarchien, logische Gruppierung und eine Reduktion der Komplexität.",
    ),
    why: t(
      "In Block 1.1 you identify the problems of a platform with many menu items and in Block 2.1 you identify structural problems. The first two come from a weak architecture, and this card gives you its three principles.",
      "In Block 1.1 identifizieren Sie die Probleme einer Plattform mit vielen Menüpunkten und in Block 2.1 strukturelle Probleme. Die ersten beiden kommen aus einer schwachen Architektur, und diese Karte gibt Ihnen ihre drei Prinzipien.",
    ),
    picture: t(
      "The same LearnLoop items, once as a flat row with two homes for one course and once grouped under four sections. Choose a version and read what Ana can and cannot find. Press “Read the comic” for a short story.",
      "Dieselben LearnLoop-Einträge, einmal als flache Reihe mit zwei Orten für einen Kurs und einmal in vier Bereichen gruppiert. Wählen Sie eine Fassung und lesen Sie, was Ana finden kann und was nicht. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A2: {
    idea: t(
      "Navigation answers the learner's orientation questions: where am I, and what comes next. There are three kinds: a menu, paths and a progress indicator. The typical mistakes are too many options and unclear labels.",
      "Navigation beantwortet die Orientierungsfragen der Lernenden: Wo bin ich, und was kommt als Nächstes. Es gibt drei Arten: ein Menü, Pfade und einen Fortschrittsanzeiger. Die typischen Fehler sind zu viele Optionen und unklare Bezeichnungen.",
    ),
    why: t(
      "In Block 1.1 you say where the user loses orientation and how the navigation could be improved, and in Block 3.1 you write a navigation concept. This card gives you the two orientation questions, the three kinds of navigation and the typical mistakes.",
      "In Block 1.1 sagen Sie, wo der Nutzer die Orientierung verliert und wie sich die Navigation verbessern ließe, und in Block 3.1 schreiben Sie ein Navigationskonzept. Diese Karte gibt Ihnen die beiden Orientierungsfragen, die drei Arten von Navigation und die typischen Fehler.",
    ),
    picture: t(
      "First a menu with 4, 9 or 24 entries: choose a size and read how long it takes Sam to find “Contracts”. Then one lesson screen with its three kinds of navigation labelled. Press “Read the comic” for a short story.",
      "Zuerst ein Menü mit 4, 9 oder 24 Einträgen: Wählen Sie eine Größe und lesen Sie, wie lange Sam braucht, „Verträge“ zu finden. Dann ein Lektionsbildschirm mit seinen drei beschrifteten Navigationsarten. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A3: {
    idea: t(
      "Interactive elements are quizzes, tasks and click interactions. Using them is active, reading is passive, and active use can reinforce learning. But interaction helps only when it is tied to a goal, makes the learner think and answers back; an interaction that only collects clicks is an end in itself.",
      "Interaktive Elemente sind Quizze, Aufgaben und Klick-Interaktionen. Ihre Nutzung ist aktiv, Lesen ist passiv, und aktive Nutzung kann das Lernen festigen. Aber Interaktion hilft nur, wenn sie mit einem Ziel verbunden ist, die Lernende zum Denken bringt und antwortet; eine Interaktion, die nur Klicks sammelt, ist Selbstzweck.",
    ),
    why: t(
      "In Block 1.2 you judge the option of more interactions, in Block 2.1 you develop interaction measures and in Block 3.1 you write an interaction strategy. You need to know when an interaction helps learning and when it is activity with no direction.",
      "In Block 1.2 beurteilen Sie die Option mehr Interaktionen, in Block 2.1 entwickeln Sie Interaktionsmaßnahmen und in Block 3.1 schreiben Sie eine Interaktionsstrategie. Sie müssen wissen, wann eine Interaktion das Lernen unterstützt und wann sie Aktivität ohne Richtung ist.",
    ),
    picture: t(
      "The same LearnLoop lesson three ways: only read, a question with an explained answer, and rewards for clicks. Choose one and read what Lea does with her mind. Press “Read the comic” for a short story.",
      "Dieselbe LearnLoop-Lektion auf drei Arten: nur gelesen, eine Frage mit erklärter Antwort und Belohnungen für Klicks. Wählen Sie eine und lesen Sie, was Lea gedanklich tut. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A4: {
    idea: t(
      "The plan names three engagement strategies through interaction: activate the user, give feedback and reward, and avoid monotony. Feedback that explains and a reward that is tied to progress keep a learner going; the same task again and again does not.",
      "Der Plan nennt drei Engagement-Strategien durch Interaktion: den Nutzer aktivieren, Rückmeldung und Belohnung geben und Monotonie vermeiden. Rückmeldung, die erklärt, und eine Belohnung, die an Fortschritt gebunden ist, halten eine Lernende bei der Sache; dieselbe Aufgabe immer wieder nicht.",
    ),
    why: t(
      "Feedback and variety are the parts of engagement that Block 2.1 asks for in its feedback mechanisms and Block 3.1 in the interaction strategy. This card gives you the three parts of engagement through interaction.",
      "Rückmeldung und Abwechslung sind die Teile des Engagements, nach denen Block 2.1 in den Rückmeldemechanismen und Block 3.1 in der Interaktionsstrategie fragt. Diese Karte gibt Ihnen die drei Teile von Engagement durch Interaktion.",
    ),
    picture: t(
      "The end of a LearnLoop lesson with three switches: an explained result, a next step and a different kind of task. Switch them on one at a time. Press “Read the comic” for a short story.",
      "Das Ende einer LearnLoop-Lektion mit drei Schaltern: ein erklärtes Ergebnis, ein nächster Schritt und eine andere Art von Aufgabe. Schalten Sie sie nacheinander ein. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A5: {
    idea: t(
      "To choose between structure and interaction measures, rate each on the same three questions. Learning impact: how much does it help the learner find the content and then learn from it? Effort: how much work and time it takes. Risk: what could go wrong, for example that an interaction becomes a burden.",
      "Um zwischen Maßnahmen für Struktur und Interaktion zu wählen, bewerten Sie jede mit denselben drei Fragen. Lernwirkung: Wie sehr hilft sie der Lernenden, den Inhalt zu finden und dann daraus zu lernen? Aufwand: wie viel Arbeit und Zeit sie braucht. Risiko: Was kann schiefgehen, zum Beispiel dass eine Interaktion zur Last wird.",
    ),
    why: t(
      "Block 1.2 asks for exactly this, and Block 2.1 uses it for the prioritisation. The example uses LearnLoop and its own options, so the answer for the task case is not given.",
      "Block 1.2 verlangt genau das, und Block 2.1 nutzt es für die Priorisierung. Das Beispiel nutzt LearnLoop und eigene Optionen, damit die Antwort für den Aufgabenfall nicht verraten wird.",
    ),
    picture: t(
      "Three small pictures show LearnLoop's three measures. The table rates each one on learning impact, effort and risk; select a cell to read the reason. Press “Read the comic” for a short story.",
      "Drei kleine Bilder zeigen LearnLoops drei Maßnahmen. Die Tabelle bewertet jede nach Lernwirkung, Aufwand und Risiko; wählen Sie eine Zelle, um den Grund zu lesen. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B1: {
    idea: t(
      "The plan's coaching says that structure guides and interaction activates: without structure, interaction has no effect; navigation is decision guidance; interaction must be goal-oriented; engagement arises from meaningful activation. The chain runs orientation, activation, engagement.",
      "Das Coaching des Plans sagt, dass Struktur führt und Interaktion aktiviert: Ohne Struktur hat Interaktion keine Wirkung; Navigation ist Entscheidungsführung; Interaktion muss zielgerichtet sein; Engagement entsteht aus sinnvoller Aktivierung. Die Kette läuft Orientierung, Aktivierung, Engagement.",
    ),
    why: t(
      "Block 3.1 asks you to design the architecture, the navigation and the interaction strategy and to put the measures in order of priority. This card gives you the logic of that order.",
      "Block 3.1 verlangt von Ihnen, die Architektur, die Navigation und die Interaktionsstrategie zu entwerfen und die Maßnahmen in Prioritätsreihenfolge zu bringen. Diese Karte gibt Ihnen die Logik dieser Reihenfolge.",
    ),
    picture: t(
      "The chain reads from left to right: orientation, activation, engagement. Below it, what each step needs and where interaction is overestimated. Nothing to click.",
      "Die Kette liest sich von links nach rechts: Orientierung, Aktivierung, Engagement. Darunter, was jeder Schritt braucht und wo Interaktion überschätzt wird. Nichts zum Klicken.",
    ),
  },
  B2: {
    idea: t(
      "The plan's conflicts for Day 9 are structure against flexibility, and interaction against overload. Too much guidance traps experienced learners; too little loses beginners. Too little interaction leaves learners passive; too much overloads them. The aim is guidance with freedom, and interaction in a dose that serves a goal.",
      "Die Konflikte des Plans für Tag 9 sind Struktur gegen Flexibilität und Interaktion gegen Überlastung. Zu viel Führung fesselt erfahrene Lernende; zu wenig verliert Einsteiger. Zu wenig Interaktion lässt Lernende passiv; zu viel überlastet sie. Das Ziel ist Führung mit Freiheit und Interaktion in einer Dosis, die einem Ziel dient.",
    ),
    why: t(
      "Block 3.1 asks for a risk analysis of over-structuring against over-interaction and for prioritised measures.",
      "Block 3.1 verlangt eine Risikoanalyse von Überstrukturierung gegen Überinteraktion und priorisierte Maßnahmen.",
    ),
    picture: t(
      "The matrix places five LearnLoop designs by the guidance the learner gets (to the right) and the freedom they keep (upwards). The position is a reading of the example, not a score. The top right is the aim. Select a point to read why it sits there. Press “Read the comic” for a short story.",
      "Die Matrix ordnet fünf LearnLoop-Entwürfe nach der Führung, die die Lernende bekommt (nach rechts), und der Freiheit, die sie behält (nach oben). Die Position ist eine Lesart des Beispiels, keine Note. Oben rechts ist das Ziel. Wählen Sie einen Punkt, um zu lesen, warum er dort liegt. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B3: {
    idea: t(
      "The plan asks you to decide under uncertainty. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. For a structure and interaction decision the usual unknown is how learners will react to a new menu or a question after every section.",
      "Der Plan verlangt, unter Unsicherheit zu entscheiden. Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten. Bei einer Entscheidung zu Struktur und Interaktion ist das übliche Unbekannte, wie Lernende auf ein neues Menü oder eine Frage nach jedem Abschnitt reagieren.",
    ),
    why: t(
      "Block 3.1 asks for exactly this, a decision under uncertainty, together with prioritised measures and a risk analysis.",
      "Block 3.1 verlangt genau das, eine Entscheidung unter Unsicherheit, zusammen mit priorisierten Maßnahmen und einer Risikoanalyse.",
    ),
    picture: t(
      "The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions. Nothing to click.",
      "Die vier Kästen oben sind die Teile der Entscheidung, für LearnLoop ausgefüllt. Die zwei Kästen darunter sind die Regel für künftige Entscheidungen. Nichts zum Klicken.",
    ),
  },
});

const M = makeMaterials(9, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
