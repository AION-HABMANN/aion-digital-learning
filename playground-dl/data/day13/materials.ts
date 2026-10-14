import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/day1/materials";

/**
 * Day 13 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow the topic
 * groups of the plan's Wissen cell (fundamentals of inclusive design; the principles; WCAG in practice; implementation in UX/UI design; then accessibility as a strategic
 * quality, its conflicts and a decision under uncertainty). A4 (implementation in UX/UI design) is Optional: plain language and structure are repeated in A3 and B1 (CLAUDE.md
 * #35, #40).
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("Inclusive design: user groups with different needs, and how it differs from usability", "Inklusives Design: Nutzergruppen mit unterschiedlichen Bedürfnissen und wie es sich von Usability unterscheidet"), minutes: 14 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("The four principles: perceivable, operable, understandable, robust", "Die vier Prinzipien: wahrnehmbar, bedienbar, verständlich, robust"), minutes: 12 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("WCAG in practice: contrast, text alternatives, structure, keyboard use", "WCAG in der Praxis: Kontrast, Textalternativen, Struktur, Tastaturbedienung"), minutes: 14 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Implementation in UX/UI design: plain language, hierarchy, intuitive interaction", "Umsetzung im UX/UI-Design: schlichte Sprache, Hierarchie, intuitive Interaktion"), minutes: 10, optional: true },
  { id: "A5" as MaterialId, block: "A" as const, title: t("Prioritising accessibility measures: impact, effort, risk", "Barrierefreiheitsmaßnahmen priorisieren: Wirkung, Aufwand, Risiko"), minutes: 10 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Accessibility as a strategic quality: from requirement to priority, process and measure", "Barrierefreiheit als strategische Qualität: von der Anforderung über Priorität und Prozess zur Messung"), minutes: 18 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Conflicting goals: accessibility against cost, standardisation against flexibility", "Zielkonflikte: Barrierefreiheit gegen Kosten, Standardisierung gegen Flexibilität"), minutes: 22 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Deciding without knowing how much of the platform fails: a decision you can check later", "Entscheiden, ohne zu wissen, wie viel der Plattform scheitert: eine Entscheidung, die Sie später prüfen können"), minutes: 20 },
]);

/** "In plain words" (CLAUDE.md #22, #51). */
const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "Inclusive design means designing so that people with different needs can use a product, not only the typical user. Classic usability asks whether a typical user finds a product easy. Inclusion asks who is left out. Three groups of needs matter: visual (seeing the page), motor (using the controls) and cognitive (understanding and following).",
      "Inklusives Design heißt, so zu gestalten, dass Menschen mit unterschiedlichen Bedürfnissen ein Produkt nutzen können, nicht nur der typische Nutzer. Klassische Usability fragt, ob ein typischer Nutzer ein Produkt leicht findet. Inklusion fragt, wer ausgeschlossen bleibt. Drei Gruppen von Bedürfnissen zählen: visuell (die Seite sehen), motorisch (die Bedienelemente nutzen) und kognitiv (verstehen und folgen).",
    ),
    why: t(
      "In Task 1 you sort facts about a platform by the user group they affect, and you say which one stops a learner completely.",
      "In Task 1 ordnen Sie Fakten über eine Plattform nach der Nutzergruppe, die sie betreffen, und sagen, welcher eine Lernende vollständig stoppt.",
    ),
    picture: t(
      "One LearnLoop lesson page as three learners meet it: Mia with low vision, Tom with only a keyboard, and Nia who finds long text hard. Choose one and read what happens to them. Press “Walk me through it” for a short story.",
      "Eine LearnLoop-Lektionsseite, wie drei Lernende ihr begegnen: Mia mit eingeschränktem Sehvermögen, Tom mit nur einer Tastatur und Nia, der langer Text schwerfällt. Wählen Sie eine und lesen Sie, was ihnen geschieht. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  A2: {
    idea: t(
      "The WCAG standard rests on four principles. Content must be perceivable (people can see or hear it), operable (people can use the controls), understandable (people can follow it) and robust (it works with different browsers and assistive technologies, such as a screen reader). A barrier breaks one of the four.",
      "Der WCAG-Standard beruht auf vier Prinzipien. Inhalte müssen wahrnehmbar sein (Menschen können sie sehen oder hören), bedienbar (Menschen können die Bedienelemente nutzen), verständlich (Menschen können ihnen folgen) und robust (sie funktionieren mit verschiedenen Browsern und assistiven Technologien, etwa einem Screenreader). Eine Barriere bricht eines der vier.",
    ),
    why: t(
      "In Block 2.1 and Block 2.2 you name the barriers behind the facts. The four principles are the way to name them.",
      "In Block 2.1 und Block 2.2 benennen Sie die Barrieren hinter den Fakten. Die vier Prinzipien sind der Weg, sie zu benennen.",
    ),
    picture: t(
      "Four small pictures, one for each principle: an eye, a keyboard key, a short text and a plug that fits. Nothing to click.",
      "Vier kleine Bilder, eines je Prinzip: ein Auge, eine Tastaturtaste, ein kurzer Text und ein passender Stecker. Nichts zum Klicken.",
    ),
  },
  A3: {
    idea: t(
      "WCAG, the Web Content Accessibility Guidelines, turns the principles into testable requirements. Four matter most on a learning platform: sufficient contrast (at least 4.5 : 1 for normal text), a text alternative for every image that carries content, a clear structure and navigation, and keyboard operability, so that everything works without a mouse.",
      "WCAG, die Web Content Accessibility Guidelines, macht die Prinzipien zu prüfbaren Anforderungen. Vier zählen auf einer Lernplattform am meisten: ausreichender Kontrast (mindestens 4,5 : 1 für normalen Text), eine Textalternative für jedes Bild, das Inhalt trägt, eine klare Struktur und Navigation und Tastaturbedienbarkeit, sodass alles ohne Maus funktioniert.",
    ),
    why: t(
      "Block 1.2 and Block 2.2 ask you to prioritise measures. Each one is one of these four requirements.",
      "Block 1.2 und Block 2.2 verlangen, Maßnahmen zu priorisieren. Jede ist eine dieser vier Anforderungen.",
    ),
    picture: t(
      "One LearnLoop lesson page with four switches: contrast, a text alternative, structure and keyboard use. Switch them on one at a time and read what changes. Press “Walk me through it” for a short story.",
      "Eine LearnLoop-Lektionsseite mit vier Schaltern: Kontrast, eine Textalternative, Struktur und Tastaturbedienung. Schalten Sie sie nacheinander ein und lesen Sie, was sich ändert. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  A4: {
    idea: t(
      "Accessibility is built in the design itself: plain language (short sentences, everyday words, abbreviations explained), a clear visual hierarchy (headings that show what matters), and intuitive interactions (controls that look and behave as people expect). These help everyone and are the cheapest barriers to avoid.",
      "Barrierefreiheit wird im Design selbst gebaut: schlichte Sprache (kurze Sätze, Alltagswörter, erklärte Abkürzungen), eine klare visuelle Hierarchie (Überschriften, die zeigen, was zählt) und intuitive Interaktionen (Bedienelemente, die aussehen und sich verhalten, wie Menschen es erwarten). Sie helfen allen und sind die günstigsten Barrieren, die sich vermeiden lassen.",
    ),
    why: t(
      "Block 3.1 asks how accessibility joins the UX process. The core rules on structure are repeated in A3 and B1, so no Core block needs this card.",
      "Block 3.1 fragt, wie Barrierefreiheit in den UX-Prozess kommt. Die Kernregeln zur Struktur stehen auch in A3 und B1, kein Kernblock braucht diese Karte also.",
    ),
    picture: t(
      "A before and after: one block of long text, and the same text with headings and short steps. Nothing to click.",
      "Ein Vorher und Nachher: ein Block langer Text und derselbe Text mit Überschriften und kurzen Schritten. Nichts zum Klicken.",
    ),
  },
  A5: {
    idea: t(
      "To choose between accessibility measures, rate each on the same three questions. Impact: how many learners does it free from a barrier, and how badly were they blocked? Effort: money and time, decided here by a rule: under €8,000 is Low, up to €18,000 is Mid, above that is High. Risk: what could go wrong, for example that it takes longer than planned.",
      "Um zwischen Barrierefreiheitsmaßnahmen zu wählen, bewerten Sie jede mit denselben drei Fragen. Wirkung: Wie viele Lernende befreit sie von einer Barriere, und wie stark waren sie blockiert? Aufwand: Geld und Zeit, hier von einer Regel entschieden: unter 8.000 € ist Niedrig, bis 18.000 € Mittel, darüber Hoch. Risiko: Was kann schiefgehen, zum Beispiel dass es länger dauert als geplant.",
    ),
    why: t(
      "Block 1.2 and Block 2.2 of the task ask for exactly this. The example uses LearnLoop, so the answer for the task case is not given.",
      "Block 1.2 und Block 2.2 der Aufgabe verlangen genau das. Das Beispiel nutzt LearnLoop, damit die Antwort für den Aufgabenfall nicht verraten wird.",
    ),
    picture: t(
      "Three small pictures show LearnLoop's three measures, the bars show the cost of each against the effort rule and the €40,000 budget, and the table gives the rating of each; select a cell to read the reason. Press “Walk me through it” for a short story.",
      "Drei kleine Bilder zeigen LearnLoops drei Maßnahmen, die Balken zeigen die Kosten jeder gegen die Aufwandsregel und das Budget von 40.000 €, und die Tabelle gibt die Bewertung jeder; wählen Sie eine Zelle, um den Grund zu lesen. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  B1: {
    idea: t(
      "The plan's coaching says that accessibility is not an add-on but a standard, and that WCAG is a minimum, not a goal. A strategy moves from the requirement to a priority (start where most learners meet the barrier), to a process (so that new content stays accessible), to a measure (so that management can see progress).",
      "Das Coaching des Plans sagt, dass Barrierefreiheit kein Add-on, sondern ein Standard ist und dass WCAG ein Minimum ist, kein Ziel. Eine Strategie geht von der Anforderung zu einer Priorität (dort beginnen, wo die meisten Lernenden auf die Barriere treffen), zu einem Prozess (damit neuer Inhalt barrierefrei bleibt) und zu einer Messung (damit das Management Fortschritt sehen kann).",
    ),
    why: t(
      "Task 2 asks for a strategy to implement WCAG, the integration into the UX process and an evaluation approach. This chain gives you the order.",
      "Task 2 verlangt eine Strategie zur Umsetzung von WCAG, die Integration in den UX-Prozess und einen Bewertungsansatz. Diese Kette gibt Ihnen die Reihenfolge.",
    ),
    picture: t(
      "The chain reads from left to right: requirement, priority, process, measure. Below it, the test for each link. Nothing to click.",
      "Die Kette liest sich von links nach rechts: Anforderung, Priorität, Prozess, Messung. Darunter der Test für jedes Glied. Nichts zum Klicken.",
    ),
  },
  B2: {
    idea: t(
      "The plan's conflicts for Day 13 are accessibility against cost, and standardisation against flexibility. A broad programme is expensive, and a cheap overlay does not remove barriers. A fixed standard is reliable, yet some learners need different solutions. The aim is the measures that reach the most learners for the least cost, with the standard as the floor.",
      "Die Konflikte des Plans für Tag 13 sind Barrierefreiheit gegen Kosten und Standardisierung gegen Flexibilität. Ein breites Programm ist teuer, und ein billiges Overlay beseitigt keine Barrieren. Ein fester Standard ist verlässlich, doch manche Lernende brauchen andere Lösungen. Das Ziel sind die Maßnahmen, die die meisten Lernenden für die geringsten Kosten erreichen, mit dem Standard als Untergrenze.",
    ),
    why: t(
      "Task 2 asks for prioritised measures and a risk analysis of costs against benefits. The rules of this card tell you how to weigh them.",
      "Task 2 verlangt priorisierte Maßnahmen und eine Risikoanalyse von Kosten gegen Nutzen. Die Regeln dieser Karte sagen Ihnen, wie Sie sie abwägen.",
    ),
    picture: t(
      "The matrix places six LearnLoop measures by their cost (to the right) and the reach, that is how many learners gain (upwards). The position is a reading of the example, not a score. Select a point to read why it sits there. Press “Walk me through it” for a short story.",
      "Die Matrix ordnet sechs LearnLoop-Maßnahmen nach ihren Kosten (nach rechts) und der Reichweite, also wie viele Lernende profitieren (nach oben). Die Position ist eine Lesart des Beispiels, keine Note. Wählen Sie einen Punkt, um zu lesen, warum er dort liegt. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  B3: {
    idea: t(
      "The plan asks you to decide although you do not know how much of the platform fails WCAG, and requirements are rising. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. A short audit of a sample is the cheapest way to find out what you do not know.",
      "Der Plan verlangt, zu entscheiden, obwohl Sie nicht wissen, wie viel der Plattform WCAG nicht erfüllt, und die Anforderungen steigen. Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten. Ein kurzes Audit einer Stichprobe ist der günstigste Weg zu erfahren, was Sie nicht wissen.",
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

const M = makeMaterials(13, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
