import { bi, t } from "@/lib/lang";
import { makeMaterials } from "@/lib/dayGen/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/day1/materials";

/**
 * Day 8 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60 minutes. The cards follow the
 * topic groups of the plan's Wissen cell (structure; visual design; interaction and user guidance; typical UX/UI mistakes and the link to learning psychology; weighing a
 * design measure; then design as decision architecture, the conflicts, and a decision without user tests). A4 is Optional: no Core block draws on it, because the three
 * mistakes it names are repeated in A1 to A3 (CLAUDE.md #35, #40).
 */
const METAS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as const, title: t("Structure: information architecture, hierarchy and orientation", "Struktur: Informationsarchitektur, Hierarchie und Orientierung"), minutes: 14 },
  { id: "A2" as MaterialId, block: "A" as const, title: t("Visual design: hierarchy, legibility, consistency and reduction", "Visuelles Design: Hierarchie, Lesbarkeit, Konsistenz und Reduktion"), minutes: 14 },
  { id: "A3" as MaterialId, block: "A" as const, title: t("Interaction and user guidance: operability, calls to action, feedback", "Interaktion und Nutzerführung: Bedienbarkeit, Handlungsaufforderung, Rückmeldung"), minutes: 12 },
  { id: "A4" as MaterialId, block: "A" as const, title: t("Typical UX/UI mistakes and the link to learning psychology", "Typische UX/UI-Fehler und die Verbindung zur Lernpsychologie"), minutes: 10 },
  { id: "A5" as MaterialId, block: "A" as const, title: t("Weighing a design measure: user impact, effort, risk", "Eine Designmaßnahme abwägen: Nutzerwirkung, Aufwand, Risiko"), minutes: 10 },
  { id: "B1" as MaterialId, block: "B" as const, title: t("Design as decision architecture: structure beats surface", "Design als Entscheidungsarchitektur: Struktur schlägt Oberfläche"), minutes: 18 },
  { id: "B2" as MaterialId, block: "B" as const, title: t("Conflicting goals: design against functionality, and too complex against too reduced", "Zielkonflikte: Design gegen Funktionalität, und zu komplex gegen zu reduziert"), minutes: 22 },
  { id: "B3" as MaterialId, block: "B" as const, title: t("Deciding without user tests: a structure, principles and guidance you can check later", "Entscheiden ohne Nutzertests: eine Struktur, Prinzipien und Führung, die Sie später prüfen können"), minutes: 20 },
]);

/** "In plain words" (CLAUDE.md #22, #51). */
const PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "The structure of a learning interface has three parts. Information architecture is how the content is organised and named. Hierarchy and navigation logic say what is a main section and what is a detail, and how you move between them. Orientation means that the learner always knows where they are and what comes next.",
      "Die Struktur einer Lernoberfläche hat drei Teile. Die Informationsarchitektur ist, wie der Inhalt geordnet und benannt ist. Hierarchie und Navigationslogik sagen, was ein Hauptbereich und was ein Detail ist und wie man sich dazwischen bewegt. Orientierung heißt, dass die Lernende immer weiß, wo sie ist und was als Nächstes kommt.",
    ),
    why: t(
      "In Block 1.1 you describe the problems of a cluttered interface and where confusion arises, and in Block 2.1 you identify structural problems. This card gives you the three orientation questions and the parts of a structure.",
      "In Block 1.1 beschreiben Sie die Probleme einer unübersichtlichen Oberfläche und wo Verwirrung entsteht, und in Block 2.1 identifizieren Sie strukturelle Probleme. Diese Karte gibt Ihnen die drei Orientierungsfragen und die Teile einer Struktur.",
    ),
    picture: t(
      "The first picture is a LearnLoop lesson screen with three switches: a path above the lesson, a menu that marks the real place, and a Next button. Switch them on one at a time and read how many of the three orientation questions the screen answers. The second picture is a simple information architecture. Press “Read the comic” for a short story.",
      "Das erste Bild ist ein LearnLoop-Lektionsbildschirm mit drei Schaltern: ein Pfad über der Lektion, ein Menü, das die richtige Stelle markiert, und ein Weiter-Button. Schalten Sie sie nacheinander ein und lesen Sie, wie viele der drei Orientierungsfragen der Bildschirm beantwortet. Das zweite Bild ist eine einfache Informationsarchitektur. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A2: {
    idea: t(
      "Visual design controls attention. A visual hierarchy uses size, colour, contrast and position so that the most important thing is seen first. Legibility means the text can be read comfortably, consistency means the same thing looks the same everywhere, and reduction means leaving out what does not help the learner's goal on this screen.",
      "Visuelles Design lenkt die Aufmerksamkeit. Eine visuelle Hierarchie nutzt Größe, Farbe, Kontrast und Position, damit das Wichtigste zuerst gesehen wird. Lesbarkeit heißt, dass sich der Text angenehm lesen lässt, Konsistenz heißt, dass dasselbe überall gleich aussieht, und Reduktion heißt, wegzulassen, was auf diesem Bildschirm dem Ziel der Lernenden nicht hilft.",
    ),
    why: t(
      "In Block 1.2 you decide between simplifying the design and restructuring the navigation, and in Block 3.1 you write principles for visual design. You need to know what a visual change can and cannot do.",
      "In Block 1.2 entscheiden Sie zwischen dem Vereinfachen des Designs und dem Umbau der Navigation, und in Block 3.1 schreiben Sie Prinzipien für das visuelle Design. Sie müssen wissen, was eine visuelle Änderung kann und was nicht.",
    ),
    picture: t(
      "Choose “Everything competes” or “One main thing”: the same LearnLoop course page, once with seven colours, three banners and five equal buttons, and once with one main button, quiet links and a progress bar. Read what changed for the learner. Press “Read the comic” for a short story.",
      "Wählen Sie „Alles konkurriert“ oder „Eine Hauptsache“: dieselbe LearnLoop-Kursseite, einmal mit sieben Farben, drei Bannern und fünf gleichen Buttons, einmal mit einem Hauptbutton, ruhigen Links und einem Fortschrittsbalken. Lesen Sie, was sich für die Lernende geändert hat. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A3: {
    idea: t(
      "Interaction design has three jobs. Intuitive operability: things look like what they do, so the learner does not have to learn the interface. Clear calls to action: one main button says what to do next. Feedback on actions: when the learner acts, the platform answers at once.",
      "Interaktionsdesign hat drei Aufgaben. Intuitive Bedienbarkeit: Dinge sehen aus wie das, was sie tun, die Lernende muss die Oberfläche also nicht lernen. Klare Handlungsaufforderungen: Ein Hauptbutton sagt, was als Nächstes zu tun ist. Rückmeldung auf Aktionen: Wenn die Lernende handelt, antwortet die Plattform sofort.",
    ),
    why: t(
      "In Block 1.1 you judge screens with several buttons without priority, in Block 2.1 you develop action guidance, and in Block 3.1 you write a concept for user guidance.",
      "In Block 1.1 beurteilen Sie Bildschirme mit mehreren Buttons ohne Priorität, in Block 2.1 entwickeln Sie eine Handlungsführung, und in Block 3.1 schreiben Sie ein Konzept für die Nutzerführung.",
    ),
    picture: t(
      "A LearnLoop Save button in three versions: it answers within a tenth of a second, it answers after about a second, and it shows nothing for ten seconds. Choose a version and read what the learner does. Press “Read the comic” for a short story.",
      "Ein LearnLoop-Speichern-Button in drei Fassungen: Er antwortet innerhalb einer zehntel Sekunde, er antwortet nach etwa einer Sekunde, und er zeigt zehn Sekunden lang nichts. Wählen Sie eine Fassung und lesen Sie, was die Lernende tut. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  A4: {
    idea: t(
      "The plan lists three typical mistakes: unclear navigation, visual overload and inconsistent design. It also asks you to link design to learning psychology: structure reduces cognitive load, and visual support helps learning (Day 3). Each mistake takes attention that learning needs.",
      "Der Plan nennt drei typische Fehler: unklare Navigation, visuelle Überladung und inkonsistentes Design. Er verlangt auch, Design mit Lernpsychologie zu verbinden: Struktur senkt die kognitive Belastung, und visuelle Unterstützung fördert das Lernen (Tag 3). Jeder Fehler nimmt Aufmerksamkeit, die das Lernen braucht.",
    ),
    why: t(
      "The three mistakes are the places where confusion arises in Block 1.1, and they help you name structural problems in Block 2.1. This card gives you the reason for each.",
      "Die drei Fehler sind die Stellen, an denen in Block 1.1 Verwirrung entsteht, und sie helfen Ihnen, in Block 2.1 strukturelle Probleme zu benennen. Diese Karte gibt Ihnen den Grund für jeden.",
    ),
    picture: t(
      "Three small screens, one for each mistake, with what it costs the learner. Nothing to click.",
      "Drei kleine Bildschirme, einer für jeden Fehler, mit dem, was er die Lernende kostet. Nichts zum Klicken.",
    ),
  },
  A5: {
    idea: t(
      "To choose between design measures, rate each on the same three questions. User impact: how much does it help the learner find, choose and carry on? Effort: how much work and time it takes. Risk: what could go wrong, for example adding more clutter.",
      "Um zwischen Designmaßnahmen zu wählen, bewerten Sie jede mit denselben drei Fragen. Nutzerwirkung: Wie sehr hilft sie der Lernenden zu finden, zu wählen und weiterzumachen? Aufwand: wie viel Arbeit und Zeit sie braucht. Risiko: Was kann schiefgehen, zum Beispiel dass mehr Unruhe hinzukommt.",
    ),
    why: t(
      "Block 1.2 asks for exactly this, and Block 2.1 uses it for the prioritisation. The example uses LearnLoop and its own options, so the answer for the task case is not given.",
      "Block 1.2 verlangt genau das, und Block 2.1 nutzt es für die Priorisierung. Das Beispiel nutzt LearnLoop und eigene Optionen, damit die Antwort für den Aufgabenfall nicht verraten wird.",
    ),
    picture: t(
      "Three small pictures show LearnLoop's three design measures. The table rates each one on user impact, effort and risk; select a cell to read the reason. Press “Read the comic” for a short story.",
      "Drei kleine Bilder zeigen LearnLoops drei Designmaßnahmen. Die Tabelle bewertet jede nach Nutzerwirkung, Aufwand und Risiko; wählen Sie eine Zelle, um den Grund zu lesen. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B1: {
    idea: t(
      "The plan's coaching says design is decision architecture: UI is not about making it pretty but about making it understandable; structure beats visual design; good UX reduces the user's wrong decisions. The chain runs from structure and hierarchy to orientation, from orientation to behaviour, and from behaviour to learning success.",
      "Das Coaching des Plans sagt, Design sei Entscheidungsarchitektur: UI heißt nicht, es hübsch zu machen, sondern es verständlich zu machen; Struktur schlägt visuelles Design; gutes UX verringert die falschen Entscheidungen der Nutzer. Die Kette läuft von Struktur und Hierarchie zur Orientierung, von der Orientierung zum Verhalten und vom Verhalten zum Lernerfolg.",
    ),
    why: t(
      "Block 3.1 asks you to propose a basic structure, principles for visual design and a concept for user guidance, in order of priority. This card gives you the logic of the order.",
      "Block 3.1 verlangt von Ihnen eine Grundstruktur, Prinzipien für das visuelle Design und ein Konzept für die Nutzerführung, in Prioritätsreihenfolge. Diese Karte gibt Ihnen die Logik der Reihenfolge.",
    ),
    picture: t(
      "The chain reads from left to right: structure and hierarchy, orientation and guidance, behaviour, learning result. Below it, the four design layers and what each decides for the learner. Nothing to click.",
      "Die Kette liest sich von links nach rechts: Struktur und Hierarchie, Orientierung und Führung, Verhalten, Lernergebnis. Darunter die vier Designebenen und was jede für die Lernende entscheidet. Nichts zum Klicken.",
    ),
  },
  B2: {
    idea: t(
      "The plan's conflicts for Day 8 are design against functionality, and (in the risk analysis) too complex against too reduced. A designer who removes everything to make the screen calm may also remove what learners need: help, options, power for experts. A designer who keeps everything makes the screen unusable. The aim is to remove clutter and keep guidance and function.",
      "Die Konflikte des Plans für Tag 8 sind Design gegen Funktionalität und (in der Risikoanalyse) zu komplex gegen zu reduziert. Wer alles entfernt, um den Bildschirm ruhig zu machen, entfernt vielleicht auch, was Lernende brauchen: Hilfe, Optionen, Leistung für Experten. Wer alles behält, macht den Bildschirm unbenutzbar. Das Ziel ist, Unruhe zu entfernen und Führung und Funktion zu behalten.",
    ),
    why: t(
      "Block 3.1 asks for a risk analysis of too complex against too reduced and for prioritised design measures.",
      "Block 3.1 verlangt eine Risikoanalyse von zu komplex gegen zu reduziert und priorisierte Designmaßnahmen.",
    ),
    picture: t(
      "The matrix places five LearnLoop options by the clutter they remove (to the right) and by the guidance and function they keep (upwards). The position is a reading of the example, not a score. The top right is the aim. Select a point to read why it sits there. Press “Read the comic” for a short story.",
      "Die Matrix ordnet fünf LearnLoop-Optionen nach der Unruhe, die sie entfernen (nach rechts), und nach der Führung und Funktion, die sie behalten (nach oben). Die Position ist eine Lesart des Beispiels, keine Note. Oben rechts ist das Ziel. Wählen Sie einen Punkt, um zu lesen, warum er dort liegt. Drücken Sie „Comic lesen“ für eine kurze Geschichte.",
    ),
  },
  B3: {
    idea: t(
      "The plan asks you to decide under uncertainty, for example without user tests. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. For a design decision the usual unknown is how learners will react to a new structure and new names.",
      "Der Plan verlangt, unter Unsicherheit zu entscheiden, zum Beispiel ohne Nutzertests. Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten. Bei einer Designentscheidung ist das übliche Unbekannte, wie Lernende auf eine neue Struktur und neue Namen reagieren.",
    ),
    why: t(
      "Block 3.1 asks for exactly this, a decision without user tests, together with prioritised design measures and a risk analysis.",
      "Block 3.1 verlangt genau das, eine Entscheidung ohne Nutzertests, zusammen mit priorisierten Designmaßnahmen und einer Risikoanalyse.",
    ),
    picture: t(
      "The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions. Nothing to click.",
      "Die vier Kästen oben sind die Teile der Entscheidung, für LearnLoop ausgefüllt. Die zwei Kästen darunter sind die Regel für künftige Entscheidungen. Nichts zum Klicken.",
    ),
  },
});

const M = makeMaterials(8, METAS, PLAIN);
export const MATERIALS = M.MATERIALS;
export const MATERIAL_BY_ID = M.MATERIAL_BY_ID;
export const MATERIAL_PLAIN = M.MATERIAL_PLAIN;
export const materialAnchorId = M.materialAnchorId;
export const readKey = M.readKey;
export type { MaterialId };
export const MATS = M;
