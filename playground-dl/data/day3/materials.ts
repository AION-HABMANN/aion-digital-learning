import { bi, t } from "@/lib/lang";
import type { MaterialId, Block, MaterialMeta, PlainExplain } from "@/data/day1/materials";

/**
 * Day 3 · the material registry. Materi A (Route 1, Levels 1 and 2) has five cards, 60 minutes; Materi B (Route 2, Level 3) has three, 60
 * minutes. The cards follow the topic groups of the plan's Wissen cell (how people learn, cognitive load and its three kinds, working memory
 * and chunking, visual hierarchy and focus, typical UX mistakes seen through psychology, learning effectiveness against cognitive efficiency,
 * the conflict of efficiency and deep learning). A4 (typical UX mistakes) is Optional: no Core block draws on it (CLAUDE.md #35, #40).
 */
export type { MaterialId, Block, MaterialMeta, PlainExplain };

export const MATERIALS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as Block, title: t("How people learn: intake, processing, storage", "Wie Menschen lernen: Aufnahme, Verarbeitung, Speicherung"), minutes: 12 },
  { id: "A2" as MaterialId, block: "A" as Block, title: t("Cognitive load: intrinsic, extraneous, germane", "Kognitive Belastung: intrinsisch, extrinsisch, lernbezogen"), minutes: 14 },
  { id: "A3" as MaterialId, block: "A" as Block, title: t("Working memory, chunking and focus in the interface", "Arbeitsgedächtnis, Chunking und Fokus im Interface"), minutes: 14 },
  { id: "A4" as MaterialId, block: "A" as Block, title: t("Typical UX mistakes seen through psychology", "Typische UX-Fehler aus Sicht der Psychologie"), minutes: 10, optional: true },
  { id: "A5" as MaterialId, block: "A" as Block, title: t("Weighing a load-reducing measure: learning impact, effort, risk", "Eine Maßnahme zur Lastsenkung abwägen: Lernwirkung, Aufwand, Risiko"), minutes: 10 },
  { id: "B1" as MaterialId, block: "B" as Block, title: t("Learning effectiveness and cognitive efficiency as strategic measures", "Lerneffektivität und kognitive Effizienz als strategische Maßstäbe"), minutes: 18 },
  { id: "B2" as MaterialId, block: "B" as Block, title: t("Conflicting goals: efficiency, deep learning and over-simplification", "Zielkonflikte: Effizienz, tiefes Lernen und Übervereinfachung"), minutes: 22 },
  { id: "B3" as MaterialId, block: "B" as Block, title: t("Deciding without user data: assume, test, and set a rule for content", "Ohne Nutzerdaten entscheiden: annehmen, testen und eine Regel für Inhalte setzen"), minutes: 20 },
]);
export const MATERIAL_BY_ID = Object.fromEntries(MATERIALS.map((m) => [m.id, m])) as Record<MaterialId, MaterialMeta>;
export const materialAnchorId = (id: MaterialId) => `mat-${id}`;
/** Card ids are stored with the day in front, so two days never share a "read" mark. */
export const readKey = (id: MaterialId) => `d3:${id}`;

/* ------------------------------------------------------------------ "In plain words" (CLAUDE.md #22, #51) */

export const MATERIAL_PLAIN: Record<MaterialId, PlainExplain> = bi({
  A1: {
    idea: t(
      "Think of learning as three steps. First, intake: of everything on the screen, attention picks only a few things. Second, processing: working memory, a small mental workspace, holds those things and works on them. Third, storage: long-term memory keeps what was understood and revisited. Taking in, understanding and applying are different levels, and each asks more of the interface.",
      "Denken Sie sich Lernen als drei Schritte. Erstens die Aufnahme: Von allem auf dem Bildschirm wählt die Aufmerksamkeit nur wenige Dinge aus. Zweitens die Verarbeitung: Das Arbeitsgedächtnis, ein kleiner geistiger Arbeitsraum, hält diese Dinge und bearbeitet sie. Drittens die Speicherung: Das Langzeitgedächtnis behält, was verstanden und wieder aufgegriffen wurde. Aufnehmen, Verstehen und Anwenden sind verschiedene Stufen, und jede verlangt mehr vom Interface.",
    ),
    why: t(
      "In Task 1 you describe how a learning screen feels to the learner. The three steps give you words for it: “I did not know what to look at” is an intake problem, “I lost track of what I had read” is a processing problem.",
      "In Task 1 beschreiben Sie, wie sich ein Lernbildschirm für die Lernende anfühlt. Die drei Schritte geben Ihnen Worte dafür: „Ich wusste nicht, worauf ich schauen sollte“ ist ein Aufnahmeproblem, „Ich habe den Faden des Gelesenen verloren“ ein Verarbeitungsproblem.",
    ),
    picture: t(
      "Three small pictures show the three steps: a screen of which attention picks one block, working memory as four slots with a fifth item that does not fit, and a cabinet that long-term memory fills and that a loop leads back to. Below them, three screens show the three levels of learning: a page that only presents, a page with an example linked to something known, and a page with a task, a result and a next step. Nothing to click.",
      "Drei kleine Bilder zeigen die drei Schritte: einen Bildschirm, aus dem die Aufmerksamkeit einen Block wählt, das Arbeitsgedächtnis als vier Fächer mit einem fünften Element, das nicht passt, und einen Schrank, den das Langzeitgedächtnis füllt und zu dem eine Schleife zurückführt. Darunter zeigen drei Bildschirme die drei Stufen des Lernens: eine Seite, die nur präsentiert, eine Seite mit einem Beispiel, das mit Bekanntem verbunden ist, und eine Seite mit Aufgabe, Ergebnis und nächstem Schritt. Nichts zum Klicken.",
    ),
  },
  A2: {
    idea: t(
      "Cognitive load is how much a person has to hold in mind and work out at once, and it is limited. Cognitive Load Theory (Sweller) distinguishes three kinds. Intrinsic load comes from the subject: how many new ideas there are and how much they depend on each other. Extraneous load comes from poor design: clutter, a wall of text, unclear structure. Germane load is the effort that goes into understanding: linking ideas and working an example. The goal is to minimise the unnecessary load.",
      "Kognitive Belastung ist, wie viel ein Mensch gleichzeitig im Kopf halten und durchdenken muss, und sie ist begrenzt. Die Cognitive Load Theory (Sweller) unterscheidet drei Arten. Intrinsische Belastung kommt vom Thema: wie viele neue Ideen es gibt und wie sehr sie voneinander abhängen. Extrinsische Belastung kommt von schlechter Gestaltung: Unübersichtlichkeit, eine Textwand, unklare Struktur. Lernbezogene (germane) Belastung ist die Mühe, die ins Verstehen fließt: Ideen verknüpfen und ein Beispiel durcharbeiten. Das Ziel ist, die unnötige Belastung zu minimieren.",
    ),
    why: t(
      "In Task 1 you analyse a platform that learners call “too complicated” and decide what to change. The three loads tell you which part you can change by design (the second), which you can only order (the first) and which you want to leave room for (the third).",
      "In Task 1 analysieren Sie eine Plattform, die Lernende „zu kompliziert“ nennen, und entscheiden, was zu ändern ist. Die drei Belastungen sagen Ihnen, welchen Teil Sie durch Gestaltung ändern können (den zweiten), welchen Sie nur ordnen können (den ersten) und wofür Sie Platz lassen wollen (den dritten).",
    ),
    picture: t(
      "The two lesson pages are the same lesson: the overloaded page has a menu, a banner, a block of text and a chat window; the redesigned page has one heading, short parts, a diagram and a question. Select either page, or use the story, and the bar below shows how it uses the learner's working memory. The subject stays the same; the design decides how much is wasted. The numbers are illustrative. Press “Walk me through it” for a short story.",
      "Die beiden Lektionsseiten sind dieselbe Lektion: Die überlastete Seite hat ein Menü, ein Banner, einen Textblock und ein Chat-Fenster; die neu gestaltete Seite hat eine Überschrift, kurze Teile, ein Diagramm und eine Frage. Wählen Sie eine der Seiten oder nutzen Sie die Geschichte, und der Balken darunter zeigt, wie sie das Arbeitsgedächtnis der Lernenden nutzt. Das Thema bleibt gleich; die Gestaltung entscheidet, wie viel vergeudet wird. Die Zahlen sind veranschaulichend. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  A3: {
    idea: t(
      "Working memory can hold only a few new things at once. Miller (1956) famously put it at seven plus or minus two; later work (Cowan 2001) suggests about four chunks for new material. A chunk is a meaningful group: a phone number written in groups is easier than eleven loose digits. On a screen you help in two ways: by chunking the content, and by using a visual hierarchy (size, colour, contrast, position) so that attention goes to the main thing first.",
      "Das Arbeitsgedächtnis kann nur wenige neue Dinge auf einmal halten. Miller (1956) setzte es bekanntlich bei sieben plus/minus zwei an; spätere Arbeiten (Cowan 2001) legen für neues Material etwa vier Chunks nahe. Ein Chunk ist eine sinnvolle Gruppe: Eine in Gruppen geschriebene Telefonnummer ist leichter als elf lose Ziffern. Auf einem Bildschirm helfen Sie auf zwei Arten: indem Sie den Inhalt in Chunks gliedern und indem Sie eine visuelle Hierarchie (Größe, Farbe, Kontrast, Position) nutzen, damit die Aufmerksamkeit zuerst auf das Wichtigste geht.",
    ),
    why: t(
      "In Task 1 you decide how to reduce load. Chunking and visual hierarchy are the two most direct tools, and the task's measures use their names.",
      "In Task 1 entscheiden Sie, wie Sie die Belastung senken. Chunking und visuelle Hierarchie sind die zwei direktesten Werkzeuge, und die Maßnahmen der Aufgabe tragen ihre Namen.",
    ),
    picture: t(
      "Below the story, the same start page is drawn twice: as twelve loose items and as three named groups. Switch between “Loose items” and “Three chunks” and count how many things you must hold in each case. A second picture shows the same lesson page flat, where every line looks the same, and with a visual hierarchy: a large heading, a marked key sentence, quiet body text and one main button. Press “Walk me through it” for a short story.",
      "Unter der Geschichte ist dieselbe Startseite zweimal gezeichnet: als zwölf lose Elemente und als drei benannte Gruppen. Wechseln Sie zwischen „Lose Elemente“ und „Drei Chunks“ und zählen Sie, wie viele Dinge Sie jeweils im Kopf halten müssen. Ein zweites Bild zeigt dieselbe Lektionsseite flach, auf der jede Zeile gleich aussieht, und mit visueller Hierarchie: einer großen Überschrift, einem markierten Kernsatz, ruhigem Fließtext und einem Haupt-Button. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  A4: {
    idea: t(
      "The plan lists four typical UX mistakes: information overload, unclear structure, missing feedback and overly complex navigation. Seen through psychology, each one wastes a limited resource: attention, working memory, or the learner's wish to carry on.",
      "Der Plan nennt vier typische UX-Fehler: Informationsüberflutung, unklare Struktur, fehlendes Feedback und übermäßig komplexe Navigation. Psychologisch gesehen vergeudet jeder eine begrenzte Ressource: Aufmerksamkeit, Arbeitsgedächtnis oder den Wunsch der Lernenden weiterzumachen.",
    ),
    why: t(
      "It gives you a checklist for reading any learning screen, and a plain way to say what each mistake does to the learner.",
      "Es gibt Ihnen eine Checkliste, um jeden Lernbildschirm zu lesen, und eine einfache Art zu sagen, was jeder Fehler mit den Lernenden macht.",
    ),
    picture: t(
      "Four small screens show the same lesson platform with one mistake each: many things competing at once, one block of text with no structure, a quiz that shows no result after Submit, and five menu levels before a lesson. Each row of the table then reads from left to right: the mistake, what it does in the learner's head, and a way to reduce it. Nothing to click.",
      "Vier kleine Bildschirme zeigen dieselbe Lernplattform mit je einem Fehler: viele Dinge, die zugleich konkurrieren, ein Textblock ohne Struktur, ein Quiz, das nach „Absenden“ kein Ergebnis zeigt, und fünf Menüebenen bis zu einer Lektion. Jede Zeile der Tabelle liest sich dann von links nach rechts: der Fehler, was er im Kopf der Lernenden bewirkt und eine Möglichkeit, ihn zu verringern. Nichts zum Klicken.",
    ),
  },
  A5: {
    idea: t(
      "To choose between ways of reducing load, rate each on the same three questions. Learning impact: how much does it help learners understand? Effort: money and time, decided here by a rule: under €8,000 is Low, up to €15,000 is Mid, above that is High. Risk: what could go wrong, for example that too much is removed. Then put the measures in order and say why the first goes first.",
      "Um zwischen Wegen zur Lastsenkung zu wählen, bewerten Sie jeden mit denselben drei Fragen. Lernwirkung: Wie sehr hilft er Lernenden beim Verstehen? Aufwand: Geld und Zeit, hier von einer Regel entschieden: unter 8.000 € ist Niedrig, bis 15.000 € Mittel, darüber Hoch. Risiko: Was kann schiefgehen, zum Beispiel dass zu viel entfernt wird? Dann bringen Sie die Maßnahmen in eine Reihenfolge und sagen, warum die erste zuerst kommt.",
    ),
    why: t(
      "Block 2.2 of the task asks for exactly this under a time limit. The example here uses LearnLoop, so the answer for the task case is not given.",
      "Block 2.2 der Aufgabe verlangt genau das unter einem Zeitlimit. Das Beispiel hier nutzt LearnLoop, damit die Antwort für den Aufgabenfall nicht verraten wird.",
    ),
    picture: t(
      "First, three small pictures show LearnLoop's three ideas: a lesson cut by a third, a block of text replaced by a diagram, and one long lesson split into short modules. The bars show the cost of the three measures. The coloured bands behind them are the effort rule, and the dashed line is the budget. Under the bars, the table gives the rating of each option; select a cell to read the reason. Press “Walk me through it” for a short story.",
      "Zuerst zeigen drei kleine Bilder LearnLoops drei Ideen: eine um ein Drittel gekürzte Lektion, einen Textblock, durch ein Diagramm ersetzt, und eine lange Lektion, in kurze Module geteilt. Die Balken zeigen die Kosten der drei Maßnahmen. Die farbigen Bänder dahinter sind die Aufwandsregel, die gestrichelte Linie ist das Budget. Unter den Balken gibt die Tabelle die Bewertung jeder Option; wählen Sie eine Zelle, um den Grund zu lesen. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  B1: {
    idea: t(
      "Two lenses help a manager judge a UX decision. Learning effectiveness asks whether the learner learned what the course promised. Cognitive efficiency asks how much mental effort that took. A design can be easy and teach nothing, or hard and teach a lot. The aim is a design that gets the learning result at a reasonable mental cost; this card calls it learning-effective UX.",
      "Zwei Linsen helfen einer Managerin, eine UX-Entscheidung zu beurteilen. Lerneffektivität fragt, ob die Lernende gelernt hat, was der Kurs versprach. Kognitive Effizienz fragt, wie viel geistige Anstrengung das kostete. Ein Design kann leicht sein und nichts lehren, oder schwer sein und viel lehren. Das Ziel ist ein Design, das das Lernergebnis zu vertretbaren geistigen Kosten erreicht; diese Karte nennt es lerneffektives UX.",
    ),
    why: t(
      "Task 2 asks you to write a definition of learning-effective UX and to prioritise three measures by it. The definition is what lets you say “no” to a measure that only makes things look simpler.",
      "Task 2 verlangt, eine Definition von lerneffektivem UX zu schreiben und drei Maßnahmen danach zu priorisieren. Die Definition erlaubt Ihnen, „Nein“ zu einer Maßnahme zu sagen, die nur alles einfacher aussehen lässt.",
    ),
    picture: t(
      "The three paths show the two lenses side by side. A learner who reaches the goal by a short path is effective and efficient; one who reaches it around banners and chat windows is effective but not efficient; one whose short path stops before the goal is efficient but not effective. Nothing to click.",
      "Die drei Wege zeigen die beiden Linsen nebeneinander. Eine Lernende, die das Ziel auf einem kurzen Weg erreicht, ist effektiv und effizient; eine, die es um Banner und Chat-Fenster herum erreicht, ist effektiv, aber nicht effizient; eine, deren kurzer Weg vor dem Ziel endet, ist effizient, aber nicht effektiv. Nichts zum Klicken.",
    ),
  },
  B2: {
    idea: t(
      "The plan's conflict for Day 3 is efficiency against deep learning, and its risk question is “where is the risk of too much simplification?”. Making content lighter helps beginners, but removing the difficulty that is part of the learning leaves learners with a feeling of understanding and little ability. The decision is how much load to remove and how much to keep.",
      "Der Konflikt des Plans für Tag 3 lautet Effizienz gegen tiefes Lernen, und seine Risikofrage heißt „Wo liegt das Risiko zu starker Vereinfachung?“. Inhalte leichter zu machen hilft Einsteigern, aber wer die Schwierigkeit entfernt, die zum Lernen gehört, lässt Lernende mit einem Gefühl des Verstehens und wenig Können zurück. Die Entscheidung ist, wie viel Belastung man entfernt und wie viel man behält.",
    ),
    why: t(
      "Task 2 asks for a risk analysis of content that is too simple against content that is too complex. This card gives you the two sides.",
      "Task 2 verlangt eine Risikoanalyse von zu einfachem gegenüber zu komplexem Inhalt. Diese Karte gibt Ihnen die beiden Seiten.",
    ),
    picture: t(
      "The matrix places five options for a hard course by how much mental load they remove (left to right) and how much depth they keep (bottom to top). The top right is the aim: much load removed, depth kept. Select a point to read where it sits and why. Press “Walk me through it” for a short story.",
      "Die Matrix ordnet fünf Optionen für einen schweren Kurs danach, wie viel geistige Belastung sie entfernen (von links nach rechts) und wie viel Tiefe sie behalten (von unten nach oben). Oben rechts ist das Ziel: viel Belastung entfernt, Tiefe behalten. Wählen Sie einen Punkt, um zu lesen, wo er liegt und warum. Drücken Sie „Führen Sie mich durch“ für eine kurze Geschichte.",
    ),
  },
  B3: {
    idea: t(
      "The plan asks you to decide under uncertainty, for example without user data. A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. You also set a decision logic for future content: who decides and what evidence they need.",
      "Der Plan verlangt, unter Unsicherheit zu entscheiden, zum Beispiel ohne Nutzerdaten. Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten. Außerdem legen Sie eine Entscheidungslogik für künftige Inhalte fest: wer entscheidet und welche Belege er braucht.",
    ),
    why: t(
      "Block 3.2 asks for exactly this, and for a rule that will be used for every new lesson.",
      "Block 3.2 verlangt genau das, und eine Regel, die für jede neue Lektion gilt.",
    ),
    picture: t(
      "The four boxes at the top are the parts of the decision, filled in for LearnLoop. The two boxes below are the rule for future decisions. Read from left to right. Nothing to click.",
      "Die vier Kästen oben sind die Teile der Entscheidung, für LearnLoop ausgefüllt. Die zwei Kästen darunter sind die Regel für künftige Entscheidungen. Lesen Sie von links nach rechts. Nichts zum Klicken.",
    ),
  },
});
