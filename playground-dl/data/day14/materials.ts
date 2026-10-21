import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/day1/materials";

/**
 * Day 14 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow the topic
 * groups of the plan's Wissen cell (plain language; intuitive learning environments and usability principles; testing inclusive solutions; optimisation; then comprehensibility
 * as a strategic quality, its conflicts and a decision under uncertainty). All eight cards are Core (DL-STANDARD v1.7).
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("Plain language: short sentences, clear terms, no jargon", "Schlichte Sprache: kurze Sätze, klare Begriffe, kein Jargon"), minutes: 14 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("Intuitive learning environments: structure, navigation and three usability principles", "Intuitive Lernumgebungen: Struktur, Navigation und drei Usability-Prinzipien"), minutes: 14 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("Testing with different user groups: observe, ask, find the hurdles", "Testen mit verschiedenen Nutzergruppen: beobachten, fragen, die Hürden finden"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Optimising inclusive UX: iterate, use data, keep evaluating", "Inklusive UX optimieren: iterieren, Daten nutzen, fortlaufend bewerten"), minutes: 10 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("Weighing a simplification measure: impact, effort, risk", "Eine Vereinfachungsmaßnahme abwägen: Wirkung, Aufwand, Risiko"), minutes: 10 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Comprehensibility as a strategic quality: find the hurdle, simplify, test, adjust", "Verständlichkeit als strategische Qualität: Hürde finden, vereinfachen, testen, anpassen"), minutes: 18 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Conflicting goals: simplicity against information, standard against flexibility", "Zielkonflikte: Einfachheit gegen Information, Standard gegen Flexibilität"), minutes: 22 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Deciding without knowing where learners stop: a decision you can check later", "Entscheiden, ohne zu wissen, wo Lernende aufhören: eine Entscheidung, die Sie später prüfen können"), minutes: 20 },
]);

/** "In plain words" (CLAUDE.md #22, #51). */
const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "Plain language means writing so that the people who use a platform understand it at first reading. Use short sentences, clear everyday terms and no jargon. The idea in the plan is: language is access, and access is use. A learner who cannot understand the text cannot use the platform.",
      "Schlichte Sprache heißt, so zu schreiben, dass die Menschen, die eine Plattform nutzen, sie beim ersten Lesen verstehen. Nutzen Sie kurze Sätze, klare Alltagsbegriffe und keinen Jargon. Die Idee im Plan lautet: Sprache ist Zugang, und Zugang ist Nutzung. Eine Lernende, die den Text nicht versteht, kann die Plattform nicht nutzen.",
    ),
    why: t(
      "In Block 1.1 you name five hurdles of an interface text and write a more understandable version. This card gives the principles of plain language.",
      "In Block 1.1 benennen Sie fünf Verständnishürden eines Oberflächentextes und schreiben eine verständlichere Fassung. Diese Karte gibt die Prinzipien schlichter Sprache.",
    ),
    picture: t(
      "The same LearnLoop welcome text three ways: one long sentence with technical terms, short sentences that keep the terms, and a plain version. Choose one and read what Kim understands. Press “Read the comic” for a short story.",
      "Derselbe LearnLoop-Willkommenstext auf drei Arten: ein langer Satz mit Fachbegriffen, kurze Sätze, die die Begriffe behalten, und eine schlichte Fassung. Wählen Sie eine und lesen Sie, was Kim versteht. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A2: {
    idea: t(
      "An intuitive learning environment is one that people can use without an explanation. It has a clear structure and navigation, and it reduces complexity. Three usability principles help: efficiency (common tasks take few steps), error prevention (the system stops a mistake before it happens) and consistency (the same thing always has the same name and place).",
      "Eine intuitive Lernumgebung ist eine, die Menschen ohne Erklärung nutzen können. Sie hat eine klare Struktur und Navigation und verringert Komplexität. Drei Usability-Prinzipien helfen: Effizienz (häufige Aufgaben brauchen wenige Schritte), Fehlervermeidung (das System stoppt einen Fehler, bevor er geschieht) und Konsistenz (dieselbe Sache hat immer denselben Namen und Ort).",
    ),
    why: t(
      "Block 1.2 asks you to assess improving the navigation, and Block 2.1 asks for the problems and measures of ClearLearn. This card gives the structure and the three usability principles.",
      "Block 1.2 verlangt, die Verbesserung der Navigation zu bewerten, und Block 2.1 verlangt die Probleme und Maßnahmen von ClearLearn. Diese Karte gibt die Struktur und die drei Usability-Prinzipien.",
    ),
    picture: t(
      "One LearnLoop learning page with four switches: a short menu, a quick common action, error prevention and consistent names. Switch them on one at a time and read what Raj notices. Press “Read the comic” for a short story.",
      "Eine LearnLoop-Lernseite mit vier Schaltern: ein kurzes Menü, eine schnelle häufige Aktion, Fehlervermeidung und einheitliche Namen. Schalten Sie sie nacheinander ein und lesen Sie, was Raj bemerkt. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A3: {
    idea: t(
      "To know whether a platform is understood, you test it with different groups of users. A usability test means watching people do real tasks, listening to what they say, and noting where they stop. This finds comprehension barriers that the team, who know the platform too well, cannot see.",
      "Um zu wissen, ob eine Plattform verstanden wird, testen Sie sie mit verschiedenen Nutzergruppen. Ein Usability-Test heißt, Menschen bei echten Aufgaben zuzusehen, auf das zu hören, was sie sagen, und festzuhalten, wo sie hängenbleiben. So finden Sie Verständnisbarrieren, die das Team, das die Plattform zu gut kennt, nicht sieht.",
    ),
    why: t(
      "Block 2.1 asks you to define two test methods, and Block 3.1 asks for a testing concept. This card names the methods.",
      "Block 2.1 verlangt, zwei Testmethoden zu bestimmen, und Block 3.1 verlangt ein Testkonzept. Diese Karte nennt die Methoden.",
    ),
    picture: t(
      "Three ways of testing the same LearnLoop page: asking a manager, watching one learner, and watching several different learners. Choose one and read what it shows. Press “Read the comic” for a short story.",
      "Drei Arten, dieselbe LearnLoop-Seite zu testen: eine Führungskraft fragen, einer Lernenden zusehen und mehreren verschiedenen Lernenden zusehen. Wählen Sie eine und lesen Sie, was sie zeigt. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A4: {
    idea: t(
      "Optimising inclusive UX is not a one-off task. It is a loop: change something, test it, measure the effect with data, adjust, and repeat. Iterative improvement means small steps with checks in between, and continuous evaluation means the loop never stops.",
      "Inklusive UX zu optimieren ist keine einmalige Aufgabe. Es ist ein Kreislauf: etwas ändern, es testen, die Wirkung mit Daten messen, anpassen und wiederholen. Iterative Verbesserung heißt kleine Schritte mit Prüfungen dazwischen, und kontinuierliche Bewertung heißt, dass der Kreislauf nie endet.",
    ),
    why: t(
      "Block 3.1 asks for a testing and optimisation concept. This card gives the loop of change, test, measure and adjust.",
      "Block 3.1 verlangt ein Test- und Optimierungskonzept. Diese Karte gibt den Kreislauf aus Ändern, Testen, Messen und Anpassen.",
    ),
    picture: t(
      "A loop of four steps: change, test, measure, adjust. Nothing to click.",
      "Ein Kreislauf aus vier Schritten: ändern, testen, messen, anpassen. Nichts zum Klicken.",
    ),
  },
  A5: {
    idea: t(
      "To choose between simplification measures, rate each on the same three questions. Impact: how much does it help learners understand and keep going? Effort: how much work and how many people it needs; the plan prints no price, so Low, Mid or High is your judgement, with a reason. Risk: what could go wrong, for example that it adds complexity or does not reach the cause.",
      "Um zwischen Vereinfachungsmaßnahmen zu wählen, bewerten Sie jede mit denselben drei Fragen. Wirkung: Wie sehr hilft sie Lernenden, zu verstehen und weiterzumachen? Aufwand: wie viel Arbeit und wie viele Personen es braucht; der Plan nennt keinen Preis, also ist Niedrig, Mittel oder Hoch Ihr Urteil, mit einem Grund. Risiko: Was kann schiefgehen, zum Beispiel dass sie Komplexität hinzufügt oder die Ursache nicht trifft.",
    ),
    why: t(
      "Block 1.2 and Block 2.1 ask for exactly this: impact, effort and risk, a prioritisation and a justification. The example uses LearnLoop, so the answer for the task case is not given.",
      "Block 1.2 und Block 2.1 verlangen genau das: Wirkung, Aufwand und Risiko, eine Priorisierung und eine Begründung. Das Beispiel nutzt LearnLoop, damit die Antwort für den Aufgabenfall nicht verraten wird.",
    ),
    picture: t(
      "Three small pictures show LearnLoop's three measures, and the table gives the rating of each on impact, effort and risk; select a cell to read the reason. Press “Read the comic” for a short story.",
      "Drei kleine Bilder zeigen LearnLoops drei Maßnahmen, und die Tabelle gibt die Bewertung jeder nach Wirkung, Aufwand und Risiko; wählen Sie eine Zelle, um den Grund zu lesen. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B1: {
    idea: t(
      "The plan's coaching says that complexity is UX's greatest enemy, simple systems are more successful, and usability determines usage. A strategy for comprehensibility is a loop: find the hurdle where learners stop, simplify it, test whether it worked with real users, and adjust. The aim is comprehensibility, then usage, then success.",
      "Das Coaching des Plans sagt, dass Komplexität der größte Feind der UX ist, einfache Systeme erfolgreicher sind und Usability die Nutzung bestimmt. Eine Strategie für Verständlichkeit ist ein Kreislauf: die Hürde finden, an der Lernende aufhören, sie vereinfachen, mit echten Nutzern testen, ob es gewirkt hat, und anpassen. Das Ziel ist Verständlichkeit, dann Nutzung, dann Erfolg.",
    ),
    why: t(
      "Block 3.1 asks for a strategy to simplify content, an optimised information architecture and a testing concept. This chain gives you the order.",
      "Block 3.1 verlangt eine Strategie zur Vereinfachung von Inhalten, eine optimierte Informationsarchitektur und ein Testkonzept. Diese Kette gibt Ihnen die Reihenfolge.",
    ),
    picture: t(
      "The chain reads from left to right: find the hurdle, simplify, test with users, adjust. Below it, the test for each link. Nothing to click.",
      "Die Kette liest sich von links nach rechts: die Hürde finden, vereinfachen, mit Nutzern testen, anpassen. Darunter der Test für jedes Glied. Nichts zum Klicken.",
    ),
  },
  B2: {
    idea: t(
      "The plan's conflicts for Day 14 are simplicity against information content, and standardisation against flexibility. Too much simplification removes what some learners need, and too little leaves them lost. The aim is to separate the complexity of the subject, which may be needed, from the complexity of the interface, which should go.",
      "Die Konflikte des Plans für Tag 14 sind Einfachheit gegen Informationsgehalt und Standardisierung gegen Flexibilität. Zu viel Vereinfachung entfernt, was manche Lernende brauchen, und zu wenig lässt sie verloren. Das Ziel ist, die Komplexität des Themas, die nötig sein kann, von der Komplexität der Oberfläche zu trennen, die weg sollte.",
    ),
    why: t(
      "Block 3.1 asks for prioritised measures and a risk analysis of too much against too little simplification. The rules of this card tell you how to weigh them.",
      "Block 3.1 verlangt priorisierte Maßnahmen und eine Risikoanalyse von zu viel gegen zu wenig Vereinfachung. Die Regeln dieser Karte sagen Ihnen, wie Sie sie abwägen.",
    ),
    picture: t(
      "The matrix places six LearnLoop screens by the information they keep (to the right) and how well a learner understands them at first reading (upwards). The position is a reading of the example, not a score. The top right is the aim. Select a point to read why it sits there. Press “Read the comic” for a short story.",
      "Die Matrix ordnet sechs LearnLoop-Bildschirme nach der Information, die sie behalten (nach rechts), und danach, wie gut eine Lernende sie beim ersten Lesen versteht (nach oben). Die Position ist eine Lesart des Beispiels, keine Note. Oben rechts ist das Ziel. Wählen Sie einen Punkt, um zu lesen, warum er dort liegt. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B3: {
    idea: t(
      "The plan asks you to decide although you do not know exactly where learners stop. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. A first test with a few learners is the cheapest way to find out what you do not know.",
      "Der Plan verlangt, zu entscheiden, obwohl Sie nicht genau wissen, wo Lernende aufhören. Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten. Ein erster Test mit wenigen Lernenden ist der günstigste Weg zu erfahren, was Sie nicht wissen.",
    ),
    why: t(
      "Block 3.1 asks for exactly this: a decision made on purpose without knowing exactly where learners stop.",
      "Block 3.1 verlangt genau das: eine Entscheidung, die bewusst getroffen wird, ohne genau zu wissen, wo Lernende aufhören.",
    ),
    picture: t(
      "The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions. Nothing to click.",
      "Die vier Kästen oben sind die Teile der Entscheidung, für LearnLoop ausgefüllt. Die zwei Kästen darunter sind die Regel für künftige Entscheidungen. Nichts zum Klicken.",
    ),
  },
});

const M = makeMaterials(14, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
