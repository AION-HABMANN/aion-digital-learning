import { bi, t } from "@/lib/lang";
import type { MaterialId, Block, MaterialMeta, PlainExplain } from "@/data/day1/materials";

/**
 * Day 7 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards
 * follow the topic groups of the plan's Wissen cell (accessibility and inclusive design, barriers and the principles of inclusive design, plain language and
 * flexibility, integrating and evaluating user-centred concepts, weighing a measure; then inclusion as a strategic quality, the conflicts inclusion against cost
 * and integration against add-on, and an evaluation system with a decision under uncertainty). Every card is Core: the tasks are the plan's own
 * questions and every block draws on the cards named in it (DL-STANDARD v1.4).
 */
export type { MaterialId, Block, MaterialMeta, PlainExplain };

export const MATERIALS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as Block, title: t("Accessibility and inclusive design: what they are and why they matter", "Barrierefreiheit und inklusives Design: was sie sind und warum sie zählen"), minutes: 12 },
  { id: "A2" as MaterialId, block: "A" as Block, title: t("Barriers and the four principles: perceivable, operable, understandable, robust", "Barrieren und die vier Prinzipien: wahrnehmbar, bedienbar, verständlich, robust"), minutes: 14 },
  { id: "A3" as MaterialId, block: "A" as Block, title: t("Inclusive learning: plain language, lower load and flexibility", "Inklusives Lernen: einfache Sprache, geringere Belastung und Flexibilität"), minutes: 10 },
  { id: "A4" as MaterialId, block: "A" as Block, title: t("Integrating and evaluating user-centred UX concepts", "Nutzerzentrierte UX-Konzepte integrieren und evaluieren"), minutes: 12 },
  { id: "A5" as MaterialId, block: "A" as Block, title: t("Weighing an inclusion measure: user impact, effort, risk", "Eine Inklusionsmaßnahme abwägen: Nutzerwirkung, Aufwand, Risiko"), minutes: 12 },
  { id: "B1" as MaterialId, block: "B" as Block, title: t("Inclusion as a strategic quality", "Inklusion als strategische Qualität"), minutes: 18 },
  { id: "B2" as MaterialId, block: "B" as Block, title: t("Conflicting goals: inclusion against cost, and integration against add-on", "Zielkonflikte: Inklusion gegen Kosten und Integration gegen Add-on"), minutes: 22 },
  { id: "B3" as MaterialId, block: "B" as Block, title: t("An evaluation system and a decision under uncertainty", "Ein Evaluationssystem und eine Entscheidung unter Unsicherheit"), minutes: 20 },
]);
export const MATERIAL_BY_ID = Object.fromEntries(MATERIALS.map((m) => [m.id, m])) as Record<MaterialId, MaterialMeta>;
export const materialAnchorId = (id: MaterialId) => `mat-${id}`;
/** Card ids are stored with the day in front, so two days never share a "read" mark. */
export const readKey = (id: MaterialId) => `d7:${id}`;

/* ------------------------------------------------------------------ "In plain words" (CLAUDE.md #22, #51) */

export const MATERIAL_PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "Accessibility means that people with very different abilities can get in: people who cannot see well, cannot hear, cannot use a mouse, or find complex text hard. It differs from usability, which asks whether users can reach their goal. A platform can be usable for most people and still closed to some. Inclusive design goes one step further: it plans for differences from the start, instead of fixing them at the end.",
      "Barrierefreiheit heißt, dass Menschen mit sehr verschiedenen Fähigkeiten hineinkommen: Menschen, die nicht gut sehen, nicht hören, keine Maus bedienen oder komplexe Texte schwer finden. Sie unterscheidet sich von Usability, die fragt, ob Nutzer ihr Ziel erreichen. Eine Plattform kann für die meisten benutzbar und für manche trotzdem verschlossen sein. Inklusives Design geht einen Schritt weiter: Es plant Unterschiede von Anfang an ein, statt sie am Ende zu reparieren.",
    ),
    why: t(
      "In Block 1.1 you name barriers and the groups they stop; in Block 1.2 and Block 2.1 you decide about them. This card gives you the words and the reason to treat access as a core quality.",
      "In Block 1.1 benennen Sie Barrieren und die Gruppen, die sie aufhalten, in Block 1.2 und Block 2.1 entscheiden Sie darüber. Diese Karte gibt Ihnen die Begriffe und den Grund, Zugang als Kernqualität zu behandeln.",
    ),
    picture: t(
      "Choose a feature at the top: captions, keyboard use or clear contrast. Below it, three people appear: one with a permanent limit, one with a temporary limit and one in a situation that causes the same limit. Read across: the same feature helps all three. Press “Read the comic” for a short story.",
      "Wählen Sie oben ein Merkmal: Untertitel, Tastaturbedienung oder klaren Kontrast. Darunter erscheinen drei Menschen: einer mit einer dauerhaften Einschränkung, einer mit einer vorübergehenden und einer in einer Situation, die dieselbe Einschränkung verursacht. Lesen Sie quer: Dasselbe Merkmal hilft allen dreien. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A2: {
    idea: t(
      "The plan names three types of barrier: visual (contrast, font), cognitive (complexity) and motor (operability). The WCAG standard sorts its requirements under four principles: perceivable, operable, understandable and robust (POUR). The plan's three principles of inclusive design are the first three of them. To sort a barrier, ask what the learner cannot do: see or hear it, use it, or follow it.",
      "Der Plan nennt drei Arten von Barrieren: visuell (Kontrast, Schrift), kognitiv (Komplexität) und motorisch (Bedienbarkeit). Der WCAG-Standard ordnet seine Anforderungen vier Prinzipien zu: wahrnehmbar, bedienbar, verständlich und robust (POUR). Die drei Prinzipien inklusiven Designs des Plans sind die ersten drei davon. Um eine Barriere einzuordnen, fragen Sie, was die Lernende nicht kann: es sehen oder hören, es bedienen oder es nachvollziehen.",
    ),
    why: t(
      "In Block 1.1 and Block 2.1 you name barriers and sort them under these principles, and in Block 2.1 you develop measures that remove them.",
      "In Block 1.1 und Block 2.1 benennen Sie Barrieren und ordnen sie diesen Prinzipien zu, und in Block 2.1 entwickeln Sie Maßnahmen, die die Barrieren beseitigen.",
    ),
    picture: t(
      "The first picture shows the four principles, each with a small screen that breaks it. The second shows the three barrier types, a typical barrier and a remedy. The third is a quiz at LearnLoop: switch between “Drag only” and “Also by keyboard” and see who can finish it. Press “Read the comic” for a short story.",
      "Das erste Bild zeigt die vier Prinzipien, jeweils mit einem kleinen Bildschirm, der es verletzt. Das zweite zeigt die drei Barrierearten, eine typische Barriere und ein Gegenmittel. Das dritte ist ein Quiz bei LearnLoop: Wechseln Sie zwischen „Nur Ziehen“ und „Auch per Tastatur“ und sehen Sie, wer es abschließen kann. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A3: {
    idea: t(
      "Beyond sensory and motor access, inclusion has a cognitive side. The plan names three tools: plain language and clear structure, a lower cognitive load (the link to Day 3), and flexibility, meaning more than one way to learn. Together they open a platform to learners with learning difficulties, a different first language, a tired mind or little time.",
      "Über sensorischen und motorischen Zugang hinaus hat Inklusion eine kognitive Seite. Der Plan nennt drei Werkzeuge: einfache Sprache und klare Struktur, eine geringere kognitive Belastung (die Verbindung zu Tag 3) und Flexibilität, also mehr als einen Weg zu lernen. Zusammen öffnen sie eine Plattform für Lernende mit Lernschwierigkeiten, einer anderen Erstsprache, einem müden Kopf oder wenig Zeit.",
    ),
    why: t(
      "In Block 1.1 you formulate improvements against cognitive barriers such as complex language and many steps, and in Block 2.1 you develop inclusive measures. This card gives you the three tools and a way to say what each one does.",
      "In Block 1.1 formulieren Sie Verbesserungen gegen kognitive Barrieren wie komplexe Sprache und viele Schritte, und in Block 2.1 entwickeln Sie inklusive Maßnahmen. Diese Karte gibt Ihnen die drei Werkzeuge und eine Möglichkeit zu sagen, was jedes tut.",
    ),
    picture: t(
      "One sign-up screen of LearnLoop appears in a hard version. Switch on the three tools one at a time: plain language, clear structure and flexibility. After each one, read what changed on the screen and who gains. Press “Read the comic” for a short story.",
      "Ein Anmeldebildschirm von LearnLoop erscheint in einer schweren Fassung. Schalten Sie die drei Werkzeuge nacheinander ein: einfache Sprache, klare Struktur und Flexibilität. Lesen Sie nach jedem, was sich auf dem Bildschirm geändert hat und wer profitiert. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A4: {
    idea: t(
      "The plan asks for the integration of user-centred concepts: personas, journeys and design joined together, UX treated as a continuous process and not a single step, and built into development and the organisation. It also asks for evaluation: measuring satisfaction, usage and drop-out with tests, feedback and data, and improving step by step.",
      "Der Plan verlangt die Integration nutzerzentrierter Konzepte: Personas, Journeys und Design verbunden, UX als fortlaufender Prozess und nicht als einzelner Schritt, eingebaut in Entwicklung und Organisation. Er verlangt auch Evaluation: Zufriedenheit, Nutzung und Abbruch mit Tests, Feedback und Daten messen und schrittweise verbessern.",
    ),
    why: t(
      "Block 2.1 asks for three evaluation methods, and the Level 3 task asks for an integration into existing processes and an evaluation system. This card gives you the building blocks.",
      "Block 2.1 verlangt drei Evaluationsmethoden, und die Level-3-Aufgabe verlangt eine Integration in bestehende Prozesse und ein Evaluationssystem. Diese Karte gibt Ihnen die Bausteine.",
    ),
    picture: t(
      "The loop shows four stages: plan, design, build, evaluate. In each stage the same question is asked: does this work for all learners? The result of the evaluation feeds the next plan. Nothing to click.",
      "Der Kreis zeigt vier Stufen: planen, gestalten, bauen, evaluieren. In jeder Stufe wird dieselbe Frage gestellt: Funktioniert das für alle Lernenden? Das Ergebnis der Evaluation speist die nächste Planung. Nichts zum Klicken.",
    ),
  },
  A5: {
    idea: t(
      "To choose between measures, rate each on three questions. User impact: how many learners does it open the platform to, and how much does it help them? Risk: what could go wrong, for example that a quick patch hides the problem without fixing it. Effort: how much work and time it takes before the release. Give a reason for each rating; a scale such as Low, Mid and High only helps to compare.",
      "Um zwischen Maßnahmen zu wählen, bewerten Sie jede mit drei Fragen. Nutzerwirkung: Für wie viele Lernende öffnet sie die Plattform, und wie sehr hilft sie ihnen? Risiko: Was kann schiefgehen, zum Beispiel dass ein schneller Flicken das Problem verdeckt, statt es zu beheben. Aufwand: Wie viel Arbeit und Zeit sie bis zum Release braucht. Begründen Sie jede Bewertung; eine Skala wie Niedrig, Mittel und Hoch hilft nur beim Vergleichen.",
    ),
    why: t(
      "Block 1.2 asks for exactly this, and Block 2.1 uses it for the prioritisation. The example uses LearnLoop and its own options, so the answer for the task case is not given.",
      "Block 1.2 verlangt genau das, und Block 2.1 nutzt es für die Priorisierung. Das Beispiel nutzt LearnLoop und eigene Optionen, damit die Antwort für den Aufgabenfall nicht verraten wird.",
    ),
    picture: t(
      "Three small pictures show LearnLoop's three measures. The table rates each one on user impact, risk and effort; select a cell to read the reason. Press “Read the comic” for a short story.",
      "Drei kleine Bilder zeigen LearnLoops drei Maßnahmen. Die Tabelle bewertet jede nach Nutzerwirkung, Risiko und Aufwand; wählen Sie eine Zelle, um den Grund zu lesen. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B1: {
    idea: t(
      "The plan's coaching says accessibility is not an add-on but a core quality, and that inclusive systems are more successful in the long run. Three reasons stand behind it: rules and customer expectations, reach, and long-term quality. A strategy states all three in the words management uses.",
      "Das Coaching des Plans sagt, Barrierefreiheit sei kein Add-on, sondern eine Kernqualität, und inklusive Systeme seien langfristig erfolgreicher. Drei Gründe stehen dahinter: Regeln und Kundenerwartungen, Reichweite und langfristige Qualität. Eine Strategie nennt alle drei in den Worten, die das Management nutzt.",
    ),
    why: t(
      "Block 3.1 asks for a strategy for inclusive UX in a company whose platform is growing but does not reach all groups, under growing accessibility requirements and limited resources.",
      "Block 3.1 verlangt eine Strategie für inklusive UX in einem Unternehmen, dessen Plattform wächst, aber nicht alle Gruppen erreicht, unter wachsenden Barrierefreiheitsanforderungen und begrenzten Ressourcen.",
    ),
    picture: t(
      "The strip of six people shows one in six living with a significant disability. The chain below reads from left to right: the rules and expectations, the reach, the long-term quality. Nothing to click.",
      "Der Streifen mit sechs Menschen zeigt, dass einer von sechs mit einer erheblichen Behinderung lebt. Die Kette darunter liest sich von links nach rechts: die Regeln und Erwartungen, die Reichweite, die langfristige Qualität. Nichts zum Klicken.",
    ),
  },
  B2: {
    idea: t(
      "The plan's conflicts for Day 7 are inclusion against cost and integration against expansion. A new feature is visible and easy to justify; accessibility work is less visible, and its benefit is spread over learners who were not reached before. The decision is a matter of reach, cost and risk, and of what waits.",
      "Die Konflikte des Plans für Tag 7 sind Inklusion gegen Kosten und Integration gegen Erweiterung. Ein neues Feature ist sichtbar und leicht zu begründen; Barrierefreiheitsarbeit ist weniger sichtbar, und ihr Nutzen verteilt sich auf Lernende, die vorher nicht erreicht wurden. Die Entscheidung ist eine Frage von Reichweite, Kosten und Risiko und davon, was wartet.",
    ),
    why: t(
      "Block 3.1 asks for three prioritised measures, the integration into processes and a risk analysis of costs against benefits. The rules of this card tell you how to weigh them.",
      "Block 3.1 verlangt drei priorisierte Maßnahmen, die Integration in Prozesse und eine Risikoanalyse von Kosten gegen Nutzen. Die Regeln dieser Karte sagen Ihnen, wie Sie sie abwägen.",
    ),
    picture: t(
      "The matrix places seven LearnLoop measures by the reach they give (to the right) and by their cost and effort (upwards). The position is a reading of the example, not a score. The lower right is where to start. Select a point to read why it sits there. Press “Read the comic” for a short story.",
      "Die Matrix ordnet sieben LearnLoop-Maßnahmen nach der Reichweite, die sie geben (nach rechts), und nach ihren Kosten und ihrem Aufwand (nach oben). Die Position ist eine Lesart des Beispiels, keine Note. Unten rechts ist der Ort, an dem man beginnt. Wählen Sie einen Punkt, um zu lesen, warum er dort liegt. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B3: {
    idea: t(
      "The plan asks for an evaluation system with KPIs and methods, and for a decision without complete user data. An evaluation system has three parts: KPIs (what you count), methods (how you find out) and a rhythm (how often, and who acts). A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.",
      "Der Plan verlangt ein Evaluationssystem mit KPIs und Methoden und eine Entscheidung ohne vollständige Nutzerdaten. Ein Evaluationssystem hat drei Teile: KPIs (was Sie zählen), Methoden (wie Sie es herausfinden) und einen Rhythmus (wie oft und wer handelt). Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten.",
    ),
    why: t(
      "Block 3.1 asks for exactly this: an evaluation system and a decision under uncertainty.",
      "Block 3.1 verlangt genau das: ein Evaluationssystem und eine Entscheidung unter Unsicherheit.",
    ),
    picture: t(
      "The bars show how many learners of LearnLoop finish the main task: first as one average, then by group. Switch between “The average” and “By group” to see what one number hides. Below, the four boxes are the parts of the decision filled in for LearnLoop, and the two boxes at the bottom are the rule for future decisions. Press “Read the comic” for a short story.",
      "Die Balken zeigen, wie viele Lernende von LearnLoop die Hauptaufgabe abschließen: erst als ein Durchschnitt, dann pro Gruppe. Wechseln Sie zwischen „Der Durchschnitt“ und „Pro Gruppe“, um zu sehen, was eine Zahl verdeckt. Darunter sind die vier Kästen die Teile der Entscheidung, für LearnLoop ausgefüllt, und die zwei Kästen unten sind die Regel für künftige Entscheidungen. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
});
