import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/day1/materials";

/**
 * Day 16 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow the topic
 * groups of the plan's Wissen cell (UX testing; analytics, tracking and KPIs; data analysis and interpretation; data-driven optimisation; then UX as a measurable and controllable
 * system, its conflicts and a decision with unclear causes). A4 (the optimisation loop) is Optional: its rules are repeated in A3 and B1 (CLAUDE.md #35, #40).
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("UX testing: usability tests, A/B tests and observation, qualitative and quantitative", "UX-Testing: Usability-Tests, A/B-Tests und Beobachtung, qualitativ und quantitativ"), minutes: 14 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("Tracking and KPIs: what to measure, how to define it, and what data protection asks", "Tracking und KPIs: was zu messen ist, wie man es definiert und was der Datenschutz verlangt"), minutes: 14 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("Reading data: patterns, symptoms and causes, misreadings and hypotheses", "Daten lesen: Muster, Symptome und Ursachen, Fehldeutungen und Hypothesen"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Data-driven optimisation: hypothesis, test, evaluate, repeat", "Datengetriebene Optimierung: Hypothese, Test, Auswertung, Wiederholung"), minutes: 10, optional: true },
  { id: "A5" as MaterialId, block: "A" as const, title: t("Weighing a data-based measure: KPI impact, effort, risk", "Eine datenbasierte Maßnahme abwägen: KPI-Wirkung, Aufwand, Risiko"), minutes: 10 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("UX as a measurable and controllable system: KPI, hypothesis, test, decision", "UX als messbares und steuerbares System: KPI, Hypothese, Test, Entscheidung"), minutes: 18 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Conflicting goals: data against intuition, more data against more insight", "Zielkonflikte: Daten gegen Intuition, mehr Daten gegen mehr Erkenntnis"), minutes: 22 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Deciding when the causes are unclear: a decision you can check later", "Entscheiden, wenn die Ursachen unklar sind: eine Entscheidung, die Sie später prüfen können"), minutes: 20 },
]);

/** "In plain words" (CLAUDE.md #22, #51). */
const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "UX testing finds out how people really behave with a product, so that it can be improved. Three common methods are the usability test (watching people do tasks), the A/B test (comparing two versions with real users) and observation. Qualitative tests, such as watching a few people, tell you why. Quantitative tests, such as counting many people, tell you how many.",
      "UX-Testing findet heraus, wie sich Menschen mit einem Produkt wirklich verhalten, damit es verbessert werden kann. Drei verbreitete Methoden sind der Usability-Test (Menschen bei Aufgaben zusehen), der A/B-Test (zwei Fassungen mit echten Nutzern vergleichen) und die Beobachtung. Qualitative Tests, etwa einigen Menschen zuzusehen, sagen Ihnen, warum. Quantitative Tests, etwa viele Menschen zu zählen, sagen Ihnen, wie viele.",
    ),
    why: t(
      "In Task 1 you need to tell what a number can show from what only watching can show, and in Block 2.2 you choose tests.",
      "In Task 1 müssen Sie unterscheiden, was eine Zahl zeigen kann und was nur Zusehen zeigen kann, und in Block 2.2 wählen Sie Tests.",
    ),
    picture: t(
      "One LearnLoop drop-out figure seen three ways: as a number only, by watching a learner, and by comparing two versions. Choose one and read what it tells the team. Press “Walk me through it” for a short story.",
      "Eine LearnLoop-Abbruchzahl auf drei Arten gesehen: nur als Zahl, durch Zusehen bei einer Lernenden und durch den Vergleich zweier Fassungen. Wählen Sie eine und lesen Sie, was sie dem Team sagt. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  A2: {
    idea: t(
      "Tracking records what users do: clicks, time spent and the points where they drop off. Analytics tools and heatmaps show it, and data protection and ethics set limits on what may be collected. A KPI is one key figure chosen to show whether you reach a goal, such as completion rate, engagement or drop-out rate. A KPI needs a definition and a target.",
      "Tracking erfasst, was Nutzer tun: Klicks, Verweildauer und die Stellen, an denen sie abspringen. Analysewerkzeuge und Heatmaps zeigen es, und Datenschutz und Ethik setzen Grenzen dafür, was erfasst werden darf. Eine KPI ist eine Kennzahl, die gewählt wird, um zu zeigen, ob ein Ziel erreicht wird, etwa Abschlussquote, Engagement oder Abbruchquote. Eine KPI braucht eine Definition und ein Ziel.",
    ),
    why: t(
      "In Block 1.1 you sort facts into measuring problems, and in Block 2.2 you define three KPIs. This card gives the tests.",
      "In Block 1.1 ordnen Sie Fakten in Messprobleme ein, und in Block 2.2 bestimmen Sie drei KPIs. Diese Karte gibt die Tests.",
    ),
    picture: t(
      "One LearnLoop dashboard with four switches: only three KPIs, a definition under each, a target, and a split by device. Switch them on one at a time and read what Mia can do. Press “Walk me through it” for a short story.",
      "Ein LearnLoop-Dashboard mit vier Schaltern: nur drei KPIs, eine Definition unter jeder, ein Ziel und eine Aufteilung nach Gerät. Schalten Sie sie nacheinander ein und lesen Sie, was Mia tun kann. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  A3: {
    idea: t(
      "Reading data means finding patterns and then looking for causes, not only symptoms. A symptom is what the data shows, such as 70% drop-out. A cause is why, and the data alone rarely says it. Misreadings come from jumping from a number to an explanation, and from comparing periods that are not alike. A hypothesis is a testable guess: we believe …, so we will …, and expect ….",
      "Daten zu lesen heißt, Muster zu finden und dann nach Ursachen zu suchen, nicht nur nach Symptomen. Ein Symptom ist, was die Daten zeigen, etwa 70 % Abbrüche. Eine Ursache ist, warum, und die Daten allein sagen es selten. Fehldeutungen entstehen durch den Sprung von einer Zahl zu einer Erklärung und durch den Vergleich von Zeiträumen, die nicht gleich sind. Eine Hypothese ist eine prüfbare Vermutung: wir glauben …, also werden wir …, und erwarten ….",
    ),
    why: t(
      "Task 1 asks for causes of a 70% drop-out rate, and Block 1.1 asks which fact jumps from a symptom to a cause. This card is the test for both.",
      "Task 1 fragt nach Ursachen einer Abbruchquote von 70 %, und Block 1.1 fragt, welcher Fakt von einem Symptom auf eine Ursache springt. Diese Karte ist der Test für beides.",
    ),
    picture: t(
      "The same LearnLoop figure read three ways: as a jump to one cause, as a list of possible causes, and as a hypothesis that is tested. Choose one and read what the team learns. Press “Walk me through it” for a short story.",
      "Dieselbe LearnLoop-Zahl auf drei Arten gelesen: als Sprung zu einer Ursache, als Liste möglicher Ursachen und als Hypothese, die getestet wird. Wählen Sie eine und lesen Sie, was das Team lernt. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  A4: {
    idea: t(
      "Data-driven optimisation is a loop. You develop a hypothesis, test it, evaluate the result and decide what to do next, and the result starts the next hypothesis. It is continuous improvement: small steps, one change at a time, so that the effect of each can be seen.",
      "Datengetriebene Optimierung ist ein Kreislauf. Sie entwickeln eine Hypothese, testen sie, werten das Ergebnis aus und entscheiden, was als Nächstes geschieht, und das Ergebnis startet die nächste Hypothese. Es ist kontinuierliche Verbesserung: kleine Schritte, eine Änderung nach der anderen, damit sich die Wirkung jeder sehen lässt.",
    ),
    why: t(
      "Block 3.1 asks for hypotheses and a decision architecture. The core of the loop is repeated in A3 and B1, so no Core block needs this card.",
      "Block 3.1 verlangt Hypothesen und eine Entscheidungsarchitektur. Der Kern des Kreislaufs steht auch in A3 und B1, kein Kernblock braucht diese Karte also.",
    ),
    picture: t(
      "A loop of four steps: hypothesis, test, evaluate, decide. Nothing to click.",
      "Ein Kreislauf aus vier Schritten: Hypothese, Test, Auswerten, Entscheiden. Nichts zum Klicken.",
    ),
  },
  A5: {
    idea: t(
      "To choose between data-based measures, rate each on the same three questions. KPI impact: how much would it move the drop-out rate or the completion rate, or the team's ability to do so? Effort: money and time, decided here by a rule: under €7,000 is Low, up to €14,000 is Mid, above that is High. Risk: what could go wrong, for example that the team reads the data wrongly again.",
      "Um zwischen datenbasierten Maßnahmen zu wählen, bewerten Sie jede mit denselben drei Fragen. KPI-Wirkung: Wie stark würde sie die Abbruchquote oder die Abschlussquote bewegen, oder die Fähigkeit des Teams dazu? Aufwand: Geld und Zeit, hier von einer Regel entschieden: unter 7.000 € ist Niedrig, bis 14.000 € Mittel, darüber Hoch. Risiko: Was kann schiefgehen, zum Beispiel dass das Team die Daten wieder falsch liest.",
    ),
    why: t(
      "Block 1.2 and Block 2.2 of the task ask for exactly this. The example uses LearnLoop, so the answer for the task case is not given.",
      "Block 1.2 und Block 2.2 der Aufgabe verlangen genau das. Das Beispiel nutzt LearnLoop, damit die Antwort für den Aufgabenfall nicht verraten wird.",
    ),
    picture: t(
      "Three small pictures show LearnLoop's three measures, the bars show the cost of each against the effort rule and the €30,000 budget, and the table gives the rating of each; select a cell to read the reason. Press “Walk me through it” for a short story.",
      "Drei kleine Bilder zeigen LearnLoops drei Maßnahmen, die Balken zeigen die Kosten jeder gegen die Aufwandsregel und das Budget von 30.000 €, und die Tabelle gibt die Bewertung jeder; wählen Sie eine Zelle, um den Grund zu lesen. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  B1: {
    idea: t(
      "The plan's goal is to understand UX as a measurable and controllable system. A data-driven strategy chains four things: a KPI that says what matters, a hypothesis that says what will change it, a test that checks the guess, and a decision that follows from the result. The plan's rationale is data, then insight, then decision.",
      "Das Ziel des Plans ist, UX als messbares und steuerbares System zu verstehen. Eine datengetriebene Strategie verkettet vier Dinge: eine KPI, die sagt, was zählt, eine Hypothese, die sagt, was sie verändern wird, einen Test, der die Vermutung prüft, und eine Entscheidung, die aus dem Ergebnis folgt. Die Begründung des Plans lautet Daten, dann Erkenntnis, dann Entscheidung.",
    ),
    why: t(
      "Task 2 asks for the central KPIs, an analysis and tracking strategy, hypotheses and a decision architecture. This chain gives you the order.",
      "Task 2 verlangt die zentralen KPIs, eine Analyse- und Tracking-Strategie, Hypothesen und eine Entscheidungsarchitektur. Diese Kette gibt Ihnen die Reihenfolge.",
    ),
    picture: t(
      "The chain reads from left to right: KPI, hypothesis, test, decision. Below it, the test for each link. Nothing to click.",
      "Die Kette liest sich von links nach rechts: KPI, Hypothese, Test, Entscheidung. Darunter der Test für jedes Glied. Nichts zum Klicken.",
    ),
  },
  B2: {
    idea: t(
      "The plan's discussion for Day 16 is data against intuition, and UX as a measurable system. More data is not more insight: a wall of charts can hide the question. Intuition is not useless either: data shows what happened, and judgement still decides what to try and what the product stands for. The aim is data as a basis for decisions, not a substitute for thinking.",
      "Die Diskussion des Plans für Tag 16 ist Daten gegen Intuition und UX als messbares System. Mehr Daten sind nicht mehr Erkenntnis: Eine Wand aus Diagrammen kann die Frage verbergen. Intuition ist auch nicht nutzlos: Daten zeigen, was geschah, und Urteil entscheidet weiterhin, was versucht wird und wofür das Produkt steht. Das Ziel ist Daten als Grundlage für Entscheidungen, nicht als Ersatz fürs Denken.",
    ),
    why: t(
      "Task 2 asks for a risk analysis and a decision architecture. The rules of this card tell you how to weigh them.",
      "Task 2 verlangt eine Risikoanalyse und eine Entscheidungsarchitektur. Die Regeln dieser Karte sagen Ihnen, wie Sie sie abwägen.",
    ),
    picture: t(
      "The matrix places six LearnLoop approaches by the amount of data they use (to the right) and the insight into causes they give (upwards). The position is a reading of the example, not a score. The top right is the aim. Select a point to read why it sits there. Press “Walk me through it” for a short story.",
      "Die Matrix ordnet sechs LearnLoop-Ansätze nach der Menge an Daten, die sie nutzen (nach rechts), und der Einsicht in Ursachen, die sie geben (nach oben). Die Position ist eine Lesart des Beispiels, keine Note. Oben rechts ist das Ziel. Wählen Sie einen Punkt, um zu lesen, warum er dort liegt. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  B3: {
    idea: t(
      "The plan asks you to decide although the causes of the decline are unclear. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. A small test of the most likely cause is the cheapest way to learn what you do not know.",
      "Der Plan verlangt, zu entscheiden, obwohl die Ursachen des Rückgangs unklar sind. Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten. Ein kleiner Test der wahrscheinlichsten Ursache ist der günstigste Weg zu erfahren, was Sie nicht wissen.",
    ),
    why: t(
      "Block 3.2 asks for exactly this, together with prioritised measures and a risk analysis.",
      "Block 3.2 verlangt genau das, zusammen mit priorisierten Maßnahmen und einer Risikoanalyse.",
    ),
    picture: t(
      "The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions. Nothing to click.",
      "Die vier Kästen oben sind die Teile der Entscheidung, für LearnLoop ausgefüllt. Die zwei Kästen darunter sind die Regel für künftige Entscheidungen. Nichts zum Klicken.",
    ),
  },
});

const M = makeMaterials(16, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
