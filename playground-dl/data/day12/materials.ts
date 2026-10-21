import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/day1/materials";

/**
 * Day 12 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow the topic
 * groups of the plan's Wissen cell (adaptive systems; technology and algorithms; UX patterns for personalised paths; opportunities and risks with the link to gamification; then
 * personalisation as a strategic UX option, its conflicts and a decision with an incomplete data basis). Every card is Core: each is drawn on by a block of the task (DL-STANDARD v1.1).
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("Adaptive learning systems: collect, analyse, adapt", "Adaptive Lernsysteme: sammeln, analysieren, anpassen"), minutes: 14 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("Technology and algorithms: rules, models and their limits", "Technologie und Algorithmen: Regeln, Modelle und ihre Grenzen"), minutes: 14 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("UX patterns for personalised learning paths", "UX-Muster für personalisierte Lernpfade"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Opportunities and risks, and the link to gamification", "Chancen und Risiken und die Verbindung zur Gamification"), minutes: 10 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("Weighing a personalisation measure: benefit, effort, risk", "Eine Personalisierungsmaßnahme abwägen: Nutzen, Aufwand, Risiko"), minutes: 10 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Personalisation as a strategic UX option: need, data, technique, explanation", "Personalisierung als strategische UX-Option: Bedarf, Daten, Technik, Erklärung"), minutes: 18 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Conflicting goals: UX against technology, personalisation against standardisation", "Zielkonflikte: UX gegen Technologie, Personalisierung gegen Standardisierung"), minutes: 22 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Deciding with an incomplete data basis: a decision you can check later", "Entscheiden bei unvollständiger Datenbasis: eine Entscheidung, die Sie später prüfen können"), minutes: 20 },
]);

/** "In plain words" (CLAUDE.md #22, #51). */
const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "An adaptive learning system adapts content to what the learner does. It works in three steps: it collects data about behaviour, it analyses it (for example progress and mistakes), and it adapts the content or the difficulty. The goal is a path that fits one person rather than everyone.",
      "Ein adaptives Lernsystem passt Inhalt an das an, was die Lernende tut. Es arbeitet in drei Schritten: Es sammelt Daten über das Verhalten, es analysiert sie (zum Beispiel Fortschritt und Fehler) und es passt Inhalt oder Schwierigkeit an. Das Ziel ist ein Pfad, der zu einer Person passt statt zu allen.",
    ),
    why: t(
      "Block 1.1 asks which platform is more effective, what personalisation offers and what its risks are. You first need to know what the system does.",
      "Block 1.1 fragt, welche Plattform wirksamer ist, was Personalisierung bietet und welche Risiken sie hat. Dafür müssen Sie zuerst wissen, was das System tut.",
    ),
    picture: t(
      "The same LearnLoop course three ways: identical for everyone, adapted with a reason, and adapted with no reason. Choose one and read what Ravi sees. Press “Read the comic” for a short story.",
      "Derselbe LearnLoop-Kurs auf drei Arten: für alle identisch, angepasst mit Grund und angepasst ohne Grund. Wählen Sie einen und lesen Sie, was Ravi sieht. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A2: {
    idea: t(
      "There are two broad ways to decide how to adapt. Rule-based systems use if-then logic that a person writes, such as “if the test is passed, skip the lesson”. Data-driven systems, such as machine learning, find patterns in large amounts of data. Their limits are data quality, complexity and transparency: a model with too little data guesses, and a learner cannot be told why it chose.",
      "Es gibt zwei grobe Wege, zu entscheiden, wie angepasst wird. Regelbasierte Systeme nutzen Wenn-dann-Logik, die ein Mensch schreibt, etwa „wenn der Test bestanden ist, die Lektion überspringen“. Datengetriebene Systeme, etwa maschinelles Lernen, finden Muster in großen Datenmengen. Ihre Grenzen sind Datenqualität, Komplexität und Transparenz: Ein Modell mit zu wenig Daten rät, und einer Lernenden lässt sich nicht sagen, warum es gewählt hat.",
    ),
    why: t(
      "Block 1.2 asks you to weigh rules against a complex AI system under a small data basis. This card gives the test.",
      "Block 1.2 verlangt, Regeln gegen ein komplexes KI-System bei kleiner Datenbasis abzuwägen. Diese Karte gibt den Test.",
    ),
    picture: t(
      "The same decision three ways: two clear rules, a closed box with lots of data, and a closed box with too little data. Choose one and read what it needs. Press “Read the comic” for a short story.",
      "Dieselbe Entscheidung auf drei Arten: zwei klare Regeln, eine geschlossene Box mit vielen Daten und eine geschlossene Box mit zu wenig Daten. Wählen Sie eine und lesen Sie, was sie braucht. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A3: {
    idea: t(
      "A UX pattern is a proven way to show something in an interface. For personalised paths there are four: an individual recommendation, adaptive difficulty levels, a dynamic learning path, and feedback based on behaviour. A pattern works when the learner can see it, understand why it appears, and change it.",
      "Ein UX-Muster ist eine bewährte Weise, etwas in einer Oberfläche zu zeigen. Für personalisierte Pfade gibt es vier: eine individuelle Empfehlung, adaptive Schwierigkeitsstufen, einen dynamischen Lernpfad und Feedback auf Basis des Verhaltens. Ein Muster wirkt, wenn die Lernende es sehen, verstehen kann, warum es erscheint, und es ändern kann.",
    ),
    why: t(
      "In Block 2.1 you find what makes an adaptive system hard to understand, and in Block 3.1 you choose patterns. This card says what makes a pattern usable.",
      "In Block 2.1 finden Sie, was ein adaptives System schwer verständlich macht, und in Block 3.1 wählen Sie Muster. Diese Karte sagt, was ein Muster nutzbar macht.",
    ),
    picture: t(
      "One LearnLoop path screen with four switches: a recommendation, difficulty, a path and feedback. Switch them on one at a time and read what Ravi can do. Press “Read the comic” for a short story.",
      "Ein LearnLoop-Pfadbildschirm mit vier Schaltern: eine Empfehlung, Schwierigkeit, ein Pfad und Feedback. Schalten Sie sie nacheinander ein und lesen Sie, was Ravi tun kann. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A4: {
    idea: t(
      "Adaptive systems offer opportunities (efficiency, motivation and learning success) and risks (opacity, over-adaptation and a wrong data basis). Over-adaptation means the system reacts too strongly to too little and boxes the learner in. Personalisation also links to gamification: a mechanic tied to a personal goal combines motivation with personalisation.",
      "Adaptive Systeme bieten Chancen (Effizienz, Motivation und Lernerfolg) und Risiken (Undurchsichtigkeit, Überanpassung und falsche Datenbasis). Überanpassung heißt, das System reagiert zu stark auf zu wenig und sperrt die Lernende ein. Personalisierung hängt auch mit Gamification zusammen: Eine Mechanik, die an ein persönliches Ziel gebunden ist, verbindet Motivation mit Personalisierung.",
    ),
    why: t(
      "Block 1.1 asks for the risks of personalisation, and Block 3.1 asks how gamification joins in. This card names both.",
      "Block 1.1 fragt nach den Risiken der Personalisierung, und Block 3.1 fragt, wie Gamification dazukommt. Diese Karte nennt beides.",
    ),
    picture: t(
      "Two columns: opportunities on the left, risks on the right. Nothing to click.",
      "Zwei Spalten: Chancen links, Risiken rechts. Nichts zum Klicken.",
    ),
  },
  A5: {
    idea: t(
      "To choose between personalisation measures, rate each on the same three questions. Benefit: how much does it help learners reach their goal, for many different users? Effort: how much work and how many people it needs; the plan prints no price, so Low, Mid or High is your judgement, with a reason. Risk: what could go wrong, for example a small data basis or a system nobody understands.",
      "Um zwischen Personalisierungsmaßnahmen zu wählen, bewerten Sie jede mit denselben drei Fragen. Nutzen: Wie sehr hilft sie Lernenden, ihr Ziel zu erreichen, bei vielen verschiedenen Nutzern? Aufwand: wie viel Arbeit und wie viele Personen er braucht; der Plan nennt keinen Preis, also ist Niedrig, Mittel oder Hoch Ihr Urteil, mit einem Grund. Risiko: Was kann schiefgehen, zum Beispiel eine kleine Datenbasis oder ein System, das niemand versteht.",
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
      "The plan's coaching says that more technology is not better UX. Personalisation is a strategic option, and the chain to design runs from the learner's need, to the data you have, to the technique (a rule or a model), to an adaptation the learner can see and change. Skipping the last step is how a clever system ends up not accepted.",
      "Das Coaching des Plans sagt, dass mehr Technologie nicht bessere UX ist. Personalisierung ist eine strategische Option, und die Kette, die Sie entwerfen, läuft vom Bedarf der Lernenden über die Daten, die Sie haben, zur Technik (eine Regel oder ein Modell) bis zu einer Anpassung, die die Lernende sehen und ändern kann. Den letzten Schritt auszulassen ist der Weg, auf dem ein kluges System am Ende nicht akzeptiert wird.",
    ),
    why: t(
      "Block 3.1 asks for a concept for adaptive paths, how gamification joins in, the UX patterns and a low-fidelity sketch. This chain gives you the order.",
      "Block 3.1 verlangt ein Konzept für adaptive Pfade, wie Gamification dazukommt, die UX-Muster und eine Low-Fidelity-Skizze. Diese Kette gibt Ihnen die Reihenfolge.",
    ),
    picture: t(
      "The chain reads from left to right: need, data, technique, an adaptation the learner can see. Below it, the test for each link. Nothing to click.",
      "Die Kette liest sich von links nach rechts: Bedarf, Daten, Technik, eine Anpassung, die die Lernende sehen kann. Darunter der Test für jedes Glied. Nichts zum Klicken.",
    ),
  },
  B2: {
    idea: t(
      "The plan's conflicts for Day 12 are UX against technology, and personalisation against standardisation. A technique can be powerful and still not understood. Standardisation is cheap and clear and ignores differences. The aim is the simplest technique that the learner can understand and that fits the data you have.",
      "Die Konflikte des Plans für Tag 12 sind UX gegen Technologie und Personalisierung gegen Standardisierung. Eine Technik kann mächtig und trotzdem nicht verstanden sein. Standardisierung ist günstig und klar und ignoriert Unterschiede. Das Ziel ist die einfachste Technik, die die Lernende verstehen kann und die zu den Daten passt, die Sie haben.",
    ),
    why: t(
      "Block 3.1 asks for a risk analysis and prioritised features. The rules of this card tell you how to weigh them.",
      "Block 3.1 verlangt eine Risikoanalyse und priorisierte Funktionen. Die Regeln dieser Karte sagen Ihnen, wie Sie sie abwägen.",
    ),
    picture: t(
      "The matrix places six LearnLoop ideas by their technical complexity (to the right) and how well the learner understands them (upwards). The position is a reading of the example, not a score. Select a point to read why it sits there. Press “Read the comic” for a short story.",
      "Die Matrix ordnet sechs LearnLoop-Ideen nach ihrer technischen Komplexität (nach rechts) und danach, wie gut die Lernende sie versteht (nach oben). Die Position ist eine Lesart des Beispiels, keine Note. Wählen Sie einen Punkt, um zu lesen, warum er dort liegt. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B3: {
    idea: t(
      "The plan asks you to decide although the data basis is not complete, and competitors already use adaptive systems. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. A low-fidelity prototype tested with a few learners is the cheapest way to learn what you do not know.",
      "Der Plan verlangt, zu entscheiden, obwohl die Datenbasis nicht vollständig ist und Wettbewerber schon adaptive Systeme einsetzen. Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten. Ein Low-Fidelity-Prototyp, mit wenigen Lernenden getestet, ist der günstigste Weg zu erfahren, was Sie nicht wissen.",
    ),
    why: t(
      "Block 3.1 asks for exactly this, as its last question, together with prioritised features and a risk analysis.",
      "Block 3.1 verlangt genau das, als letzte Frage, zusammen mit priorisierten Funktionen und einer Risikoanalyse.",
    ),
    picture: t(
      "The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions. Nothing to click.",
      "Die vier Kästen oben sind die Teile der Entscheidung, für LearnLoop ausgefüllt. Die zwei Kästen darunter sind die Regel für künftige Entscheidungen. Nichts zum Klicken.",
    ),
  },
});

const M = makeMaterials(12, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
