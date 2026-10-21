import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/day1/materials";

/**
 * Day 15 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow the topic
 * groups of the plan's Wissen cell (mobile context of use; microlearning; responsive design and cross-device; testing; then mobile UX as a strategy of its own, its conflicts and a
 * decision under uncertainty). All eight cards are Core (DL-STANDARD v1.7).
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("The mobile context of use: on the go, little time, low attention", "Der mobile Nutzungskontext: unterwegs, wenig Zeit, wenig Aufmerksamkeit"), minutes: 14 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("Microlearning design: short units with one objective, and its risks", "Microlearning-Design: kurze Einheiten mit einem Ziel, und ihre Risiken"), minutes: 14 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("Responsive and cross-device design: prioritise, reduce, synchronise", "Responsives und Cross-Device-Design: priorisieren, reduzieren, synchronisieren"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Testing and optimising mobile learning: real phones, real settings", "Mobiles Lernen testen und optimieren: echte Handys, echte Umgebungen"), minutes: 10 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("Weighing a mobile measure: user value, effort, risk", "Eine mobile Maßnahme abwägen: Nutzerwert, Aufwand, Risiko"), minutes: 10 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Mobile UX as a strategy of its own: context, design, usage, scale", "Mobile UX als eigene Strategie: Kontext, Design, Nutzung, Skalierung"), minutes: 18 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Conflicting goals: mobile against desktop, content against fit to the situation", "Zielkonflikte: Mobil gegen Desktop, Inhalt gegen Passung zur Situation"), minutes: 22 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Deciding without data by device: a decision you can check later", "Entscheiden ohne Daten nach Gerät: eine Entscheidung, die Sie später prüfen können"), minutes: 20 },
]);

/** "In plain words" (CLAUDE.md #22, #51). */
const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "The context of use is where, when and with how much attention a person uses a product. On a phone it is usually on the go, with little time and low attention, in a place with many distractions. At a desk it is the opposite. Mobile is not a smaller desktop: the context decides the design, and what mobile learners need is speed, simplicity and clarity.",
      "Der Nutzungskontext ist, wo, wann und mit wie viel Aufmerksamkeit ein Mensch ein Produkt nutzt. Auf dem Handy ist es meist unterwegs, mit wenig Zeit und wenig Aufmerksamkeit, an einem Ort mit vielen Ablenkungen. Am Schreibtisch ist es das Gegenteil. Mobil ist kein kleinerer Desktop: Der Kontext bestimmt das Design, und was mobile Lernende brauchen, sind Tempo, Einfachheit und Klarheit.",
    ),
    why: t(
      "In Block 1.1 you say what problems arise for a learner on the move, what she expects and which content makes sense on a phone. All three come from the context of use.",
      "In Block 1.1 sagen Sie, welche Probleme für eine Lernende unterwegs entstehen, was sie erwartet und welcher Inhalt auf dem Handy sinnvoll ist. Alles drei kommt aus dem Nutzungskontext.",
    ),
    picture: t(
      "The same learner, Ben, in three contexts: at a desk, on a crowded train and in a five-minute break. Choose one and read what he needs. Press “Read the comic” for a short story.",
      "Derselbe Lernende, Ben, in drei Kontexten: am Schreibtisch, in einem vollen Zug und in einer Fünf-Minuten-Pause. Wählen Sie einen und lesen Sie, was er braucht. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A2: {
    idea: t(
      "Microlearning means short, self-contained learning units, each with one learning objective. Its advantages are flexibility and a better fit with everyday life. Its risk is fragmentation of knowledge: pieces that do not add up. A unit needs one objective, a short check and a visible place in the course.",
      "Microlearning heißt kurze, in sich geschlossene Lerneinheiten, jede mit einem Lernziel. Seine Vorteile sind Flexibilität und eine bessere Passung zum Alltag. Sein Risiko ist die Zersplitterung des Wissens: Stücke, die sich nicht zusammenfügen. Eine Einheit braucht ein Ziel, eine kurze Prüfung und einen sichtbaren Platz im Kurs.",
    ),
    why: t(
      "Block 1.2 asks you to assess shortening the content for mobile, and Block 2.1 and Block 3.1 ask for microlearning units. This card gives the rules and the risk of fragmentation.",
      "Block 1.2 verlangt, das Kürzen der Inhalte für mobile Geräte zu bewerten, und Block 2.1 und Block 3.1 verlangen Microlearning-Einheiten. Diese Karte gibt die Regeln und das Risiko der Zersplitterung.",
    ),
    picture: t(
      "The same content three ways: one long lesson, the same lesson cut into pieces at arbitrary points, and five short units with a goal each. Choose one and read what Ben gets. Press “Read the comic” for a short story.",
      "Derselbe Inhalt auf drei Arten: eine lange Lektion, dieselbe Lektion an beliebigen Stellen in Stücke geschnitten und fünf kurze Einheiten mit je einem Ziel. Wählen Sie eine und lesen Sie, was Ben bekommt. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A3: {
    idea: t(
      "Responsive design adapts a platform to different screen sizes. On a phone it prioritises content, reduces what is shown to the essentials, and makes controls large enough for a thumb. Cross-device optimisation goes further: it keeps the experience whole when a learner changes device, by synchronising progress and keeping the same names and layout logic.",
      "Responsive Design passt eine Plattform an verschiedene Bildschirmgrößen an. Auf dem Handy priorisiert es Inhalt, reduziert das Gezeigte auf das Wesentliche und macht Bedienelemente groß genug für einen Daumen. Cross-Device-Optimierung geht weiter: Sie hält das Erlebnis ganz, wenn eine Lernende das Gerät wechselt, indem Fortschritt synchronisiert und dieselben Namen und dieselbe Layoutlogik beibehalten werden.",
    ),
    why: t(
      "Block 1.2 asks you to assess a separate mobile UX, and Block 2.1 and Block 3.1 ask for mobile optimisation and progress synchronisation. This card names both.",
      "Block 1.2 verlangt, eine eigene mobile UX zu bewerten, und Block 2.1 und Block 3.1 verlangen mobile Optimierung und Fortschrittssynchronisation. Diese Karte nennt beides.",
    ),
    picture: t(
      "One LearnLoop phone screen with four switches: prioritised content, large targets, text that fits and a synchronised continue card. Switch them on one at a time and read what Ben can do. Press “Read the comic” for a short story.",
      "Ein LearnLoop-Handybildschirm mit vier Schaltern: priorisierter Inhalt, große Ziele, passender Text und eine synchronisierte Weitermachen-Karte. Schalten Sie sie nacheinander ein und lesen Sie, was Ben tun kann. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A4: {
    idea: t(
      "Mobile learning is tested on real phones in real settings. A mobile usability test means watching learners do tasks on their own phones, some on the move. Analysing the contexts of use means finding out when and where they study, and continuous adjustment means repeating the loop as use changes.",
      "Mobiles Lernen wird auf echten Handys in echten Umgebungen getestet. Ein mobiler Usability-Test heißt, Lernenden bei Aufgaben auf ihren eigenen Handys zuzusehen, manchen unterwegs. Die Nutzungskontexte zu analysieren heißt herauszufinden, wann und wo sie lernen, und fortlaufende Anpassung heißt, den Kreislauf zu wiederholen, wenn sich die Nutzung ändert.",
    ),
    why: t(
      "Block 3.1 asks for a testing and optimisation strategy. This card gives the tests on real phones and the analysis of contexts.",
      "Block 3.1 verlangt eine Test- und Optimierungsstrategie. Diese Karte gibt die Tests auf echten Handys und die Analyse der Nutzungskontexte.",
    ),
    picture: t(
      "A learner tests a task on her own phone while a tester watches and notes where she stops. Nothing to click.",
      "Eine Lernende testet eine Aufgabe auf ihrem eigenen Handy, während ein Tester zuschaut und festhält, wo sie hängenbleibt. Nichts zum Klicken.",
    ),
  },
  A5: {
    idea: t(
      "To choose between mobile measures, rate each on the same three questions. User value: how much does it help a learner on the move? Effort: how much work and how many people it needs; the plan prints no price, so Low, Mid or High is your judgement, with a reason. Risk: what could go wrong, for example that knowledge is fragmented or two products must be kept up.",
      "Um zwischen mobilen Maßnahmen zu wählen, bewerten Sie jede mit denselben drei Fragen. Nutzerwert: Wie sehr hilft sie einer Lernenden unterwegs? Aufwand: wie viel Arbeit und wie viele Personen es braucht; der Plan nennt keinen Preis, also ist Niedrig, Mittel oder Hoch Ihr Urteil, mit einem Grund. Risiko: Was kann schiefgehen, zum Beispiel dass Wissen zersplittert wird oder zwei Produkte gepflegt werden müssen.",
    ),
    why: t(
      "Block 1.2 asks for exactly this: user value, effort and risk, a decision and a justification. The example uses LearnLoop, so the answer for the task case is not given.",
      "Block 1.2 verlangt genau das: Nutzerwert, Aufwand und Risiko, eine Entscheidung und eine Begründung. Das Beispiel nutzt LearnLoop, damit die Antwort für den Aufgabenfall nicht verraten wird.",
    ),
    picture: t(
      "Three small pictures show LearnLoop's three measures, and the table gives the rating of each on user value, effort and risk; select a cell to read the reason. Press “Read the comic” for a short story.",
      "Drei kleine Bilder zeigen LearnLoops drei Maßnahmen, und die Tabelle gibt die Bewertung jeder nach Nutzerwert, Aufwand und Risiko; wählen Sie eine Zelle, um den Grund zu lesen. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B1: {
    idea: t(
      "The plan's coaching says that mobile is not a smaller desktop, the context of use determines the design, and cross-device is a strategic advantage. A mobile strategy therefore starts from the context, designs for it (short units, a layout that prioritises), checks the usage it produces, and scales the experience across devices. The chain is context, design, usage, scale.",
      "Das Coaching des Plans sagt, dass Mobil kein kleinerer Desktop ist, der Nutzungskontext das Design bestimmt und Cross-Device ein strategischer Vorteil ist. Eine mobile Strategie geht deshalb vom Kontext aus, gestaltet dafür (kurze Einheiten, ein Layout, das priorisiert), prüft die Nutzung, die sie erzeugt, und skaliert das Erlebnis über Geräte hinweg. Die Kette ist Kontext, Design, Nutzung, Skalierung.",
    ),
    why: t(
      "Block 3.1 asks for a mobile strategy, a microlearning concept, a cross-device approach and a testing strategy. This chain gives you the order.",
      "Block 3.1 verlangt eine mobile Strategie, ein Microlearning-Konzept, einen Cross-Device-Ansatz und eine Teststrategie. Diese Kette gibt Ihnen die Reihenfolge.",
    ),
    picture: t(
      "The chain reads from left to right: context, design, usage, scale. Below it, the test for each link. Nothing to click.",
      "Die Kette liest sich von links nach rechts: Kontext, Design, Nutzung, Skalierung. Darunter der Test für jedes Glied. Nichts zum Klicken.",
    ),
  },
  B2: {
    idea: t(
      "The plan's conflicts for Day 15 are mobile against desktop, and information content against fit to the situation. The desktop can show everything, and a phone cannot. The aim is to show on each device what suits its situation, and to keep one experience across both, instead of building two products or copying one onto the other.",
      "Die Konflikte des Plans für Tag 15 sind Mobil gegen Desktop und Informationsgehalt gegen Passung zur Situation. Der Desktop kann alles zeigen, ein Handy nicht. Das Ziel ist, auf jedem Gerät zu zeigen, was zu seiner Situation passt, und ein Erlebnis über beide zu halten, statt zwei Produkte zu bauen oder eines auf das andere zu kopieren.",
    ),
    why: t(
      "Block 3.1 asks for prioritised measures and a risk analysis. The rules of this card tell you how to weigh them.",
      "Block 3.1 verlangt priorisierte Maßnahmen und eine Risikoanalyse. Die Regeln dieser Karte sagen Ihnen, wie Sie sie abwägen.",
    ),
    picture: t(
      "The matrix places six LearnLoop ideas by how much content they show at once (to the right) and how well they fit the learner's situation (upwards). The position is a reading of the example, not a score. The top right is the aim. Select a point to read why it sits there. Press “Read the comic” for a short story.",
      "Die Matrix ordnet sechs LearnLoop-Ideen danach, wie viel Inhalt sie auf einmal zeigen (nach rechts) und wie gut sie zur Situation der Lernenden passen (nach oben). Die Position ist eine Lesart des Beispiels, keine Note. Oben rechts ist das Ziel. Wählen Sie einen Punkt, um zu lesen, warum er dort liegt. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B3: {
    idea: t(
      "The plan asks you to decide although you do not yet have the data by device. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. Splitting the data by device and testing on a few real phones is the cheapest way to learn what you do not know.",
      "Der Plan verlangt, zu entscheiden, obwohl Sie die Daten nach Gerät noch nicht haben. Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten. Die Daten nach Gerät aufzuteilen und auf einigen echten Handys zu testen ist der günstigste Weg zu erfahren, was Sie nicht wissen.",
    ),
    why: t(
      "Block 3.1 asks for exactly this: a decision made on purpose without the data by device.",
      "Block 3.1 verlangt genau das: eine Entscheidung, die bewusst ohne die Daten nach Gerät getroffen wird.",
    ),
    picture: t(
      "The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions. Nothing to click.",
      "Die vier Kästen oben sind die Teile der Entscheidung, für LearnLoop ausgefüllt. Die zwei Kästen darunter sind die Regel für künftige Entscheidungen. Nichts zum Klicken.",
    ),
  },
});

const M = makeMaterials(15, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
