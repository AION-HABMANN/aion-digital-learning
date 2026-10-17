import { bi, t } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/day3/materials";

/**
 * Day 3 · the story comics in pixel art (DL-STANDARD.md section 13). One per study card: the card's own material told as a short story with the people
 * the card already uses (Daniel, Mira, LearnLoop's team), so it is the card said again in pictures, not a new case. Every figure comes from the card
 * or its diagram. The comic replaces the card's "Walk me through it" story. Speech and captions are HTML in ComicModal; the drawings are in
 * components/day3/comicScenes.tsx.
 */
const NOTE = t(
  "Daniel, Mira, Priya, the Chief Learning Experience Officer and LearnLoop are made up for this lesson, like the examples on the card: a Case assumption. EduCore, the case of the task, is in the task.",
  "Daniel, Mira, Priya, die Chief Learning Experience Officer und LearnLoop sind für diese Lektion erfunden, wie die Beispiele auf der Karte: eine Fallannahme. EduCore, der Fall der Aufgabe, steht in der Aufgabe.",
);
const NAMES = {
  daniel: t("Daniel, learner in procurement", "Daniel, Lernender im Einkauf"),
  mira: t("Mira, team leader", "Mira, Teamleiterin"),
  priya: t("Priya, content lead", "Priya, Content Lead"),
  boss: t("Chief Learning Experience Officer", "Chief Learning Experience Officer"),
  learner: t("A learner", "Eine Lernende"),
  narrator: t("Narrator", "Erzähler"),
};

export const COMICS_D3 = bi({
  A1: {
    id: "d3-a1",
    pixel: true,
    title: t("Three steps from the screen to the head", "Drei Schritte vom Bildschirm in den Kopf"),
    teaser: t("Daniel meets a lesson and we follow what happens in his head.", "Daniel begegnet einer Lektion, und wir folgen, was in seinem Kopf passiert."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a1-1",
        scene: t("Daniel opens a lesson on a busy screen. His eyes pick one thing out of many.", "Daniel öffnet eine Lektion auf einem vollen Bildschirm. Seine Augen wählen eine Sache aus vielen."),
        speech: [{ by: "daniel", think: true, text: t("There is so much here. I look at the yellow box first.", "Hier ist so viel. Ich schaue zuerst auf den gelben Kasten.") }],
        tag: { tone: "plain", text: t("STEP 1 · INTAKE", "SCHRITT 1 · AUFNAHME") },
        means: t(
          "Intake is the first step: of everything on the screen, attention picks only a few things. What is not picked is not learned, however well it was written.",
          "Die Aufnahme ist der erste Schritt: Von allem auf dem Bildschirm wählt die Aufmerksamkeit nur wenige Dinge aus. Was nicht gewählt wird, wird nicht gelernt, so gut es auch geschrieben ist.",
        ),
        look: t("the one chip with the eye", "der eine Kasten mit dem Auge"),
      },
      {
        art: "a1-2",
        scene: t("What he picked goes into working memory, a small workspace. It has room for about four things.", "Was er gewählt hat, geht ins Arbeitsgedächtnis, einen kleinen Arbeitsraum. Dort ist Platz für etwa vier Dinge."),
        speech: [{ by: "daniel", think: true, text: t("Four slots are full, and now a fifth thing comes. I lose the first one.", "Vier Fächer sind voll, und jetzt kommt ein Fünftes. Das Erste verliere ich.") }],
        tag: { tone: "plain", text: t("STEP 2 · PROCESSING", "SCHRITT 2 · VERARBEITUNG") },
        means: t(
          "Processing happens in working memory. It is small, so a fifth item pushes another one out. This is why “I lost track of what I had read” is a processing problem.",
          "Die Verarbeitung findet im Arbeitsgedächtnis statt. Es ist klein, ein fünftes Element verdrängt also ein anderes. Deshalb ist „Ich habe den Faden des Gelesenen verloren“ ein Verarbeitungsproblem.",
        ),
        look: t("the four boxes, all full", "die vier Fächer, alle voll"),
      },
      {
        art: "a1-3",
        scene: t("Next week a new lesson starts with a question. Daniel pulls the answer from his long-term memory.", "Nächste Woche beginnt eine neue Lektion mit einer Frage. Daniel holt die Antwort aus seinem Langzeitgedächtnis."),
        speech: [{ by: "daniel", text: t("I know this from last week. The shelf still has it.", "Das kenne ich von letzter Woche. Das Regal hat es noch.") }],
        tag: { tone: "teal", text: t("STEP 3 · STORAGE", "SCHRITT 3 · SPEICHERUNG") },
        means: t(
          "Long-term memory keeps what was understood and revisited. A loop back to earlier content, such as a question at the start of the next lesson, is what fills the shelf.",
          "Das Langzeitgedächtnis behält, was verstanden und wieder aufgegriffen wurde. Eine Schleife zu früheren Inhalten, etwa eine Frage am Anfang der nächsten Lektion, füllt das Regal.",
        ),
        look: t("the question mark and the shelf", "das Fragezeichen und das Regal"),
      },
      {
        art: "a1-4",
        scene: t("Priya sums it up for the team.", "Priya fasst es für das Team zusammen."),
        speech: [{ by: "priya", text: t("Describe any screen in three steps: what draws attention, what the head has to hold, and what is kept.", "Beschreiben Sie jeden Bildschirm in drei Schritten: was die Aufmerksamkeit zieht, was der Kopf halten muss und was bleibt.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Intake, processing and storage give you words for how a screen feels to the learner. Block 1.1 asks you to describe a lesson screen this way: five problems, how it feels, and what you would improve.",
          "Aufnahme, Verarbeitung und Speicherung geben Ihnen Worte dafür, wie sich ein Bildschirm für die Lernende anfühlt. Block 1.1 verlangt, einen Lernbildschirm so zu beschreiben: fünf Probleme, wie er sich anfühlt und was Sie verbessern würden.",
        ),
      },
    ],
  },

  A2: {
    id: "d3-a2",
    pixel: true,
    title: t("What fills the bar", "Was den Balken füllt"),
    teaser: t("The same contract lesson, on two pages, with Daniel's working memory as a bar.", "Dieselbe Vertragslektion auf zwei Seiten, mit Daniels Arbeitsgedächtnis als Balken."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a2-1",
        scene: t("Daniel, who works in procurement, has to learn how a contract works. The subject alone takes 38 percent of his working memory.", "Daniel, der im Einkauf arbeitet, muss lernen, wie ein Vertrag funktioniert. Das Thema allein nimmt 38 Prozent seines Arbeitsgedächtnisses."),
        speech: [{ by: "narrator", text: t("This is the intrinsic load: it comes from the subject, from how many new ideas there are and how much they depend on each other.", "Das ist die intrinsische Belastung: Sie kommt vom Thema, davon, wie viele neue Ideen es gibt und wie sehr sie voneinander abhängen.") }],
        tag: { tone: "plain", text: t("38 · THE SUBJECT", "38 · DAS THEMA") },
        means: t(
          "Intrinsic load is the part of the effort that the subject itself demands. You cannot remove it by design; you can only put the content in a sensible order.",
          "Intrinsische Belastung ist der Teil der Mühe, den das Thema selbst verlangt. Sie lässt sich nicht durch Gestaltung entfernen; man kann den Inhalt nur sinnvoll ordnen.",
        ),
        look: t("the grey part of the bar", "der graue Teil des Balkens"),
      },
      {
        art: "a2-2",
        scene: t("The lesson page has a banner, a chat window and a menu with nine entries. Daniel tries to ignore them, and 52 percent of his working memory goes there.", "Die Lektionsseite hat ein Banner, ein Chat-Fenster und ein Menü mit neun Einträgen. Daniel versucht, sie zu übersehen, und 52 Prozent seines Arbeitsgedächtnisses gehen dorthin."),
        speech: [{ by: "daniel", think: true, text: t("I am reading the contract, and I keep looking at the banner. Only 10 percent is left to understand it.", "Ich lese den Vertrag und schaue immer wieder auf das Banner. Nur 10 Prozent bleiben, um ihn zu verstehen.") }],
        tag: { tone: "plain", text: t("52 · WASTE · 10 LEFT", "52 · VERSCHWENDUNG · 10 ÜBRIG") },
        means: t(
          "Extraneous load comes from poor design: clutter, a wall of text, unclear structure. It is wasted effort, and it leaves little room for the effort that goes into understanding.",
          "Extrinsische Belastung kommt von schlechter Gestaltung: Unübersichtlichkeit, eine Textwand, unklare Struktur. Sie ist vergeudete Mühe und lässt wenig Platz für die Mühe, die ins Verstehen fließt.",
        ),
        look: t("the rust part, and the little teal part", "der rostrote Teil und der kleine türkise Teil"),
      },
      {
        art: "a2-3",
        scene: t("The team redesigns the page: one heading, short parts, a diagram and a question. The waste falls to 12 percent.", "Das Team gestaltet die Seite neu: eine Überschrift, kurze Teile, ein Diagramm und eine Frage. Die Verschwendung sinkt auf 12 Prozent."),
        speech: [{ by: "daniel", text: t("Same contract, same subject. Now I have room to link the ideas and try the example.", "Derselbe Vertrag, dasselbe Thema. Jetzt habe ich Platz, die Ideen zu verknüpfen und das Beispiel durchzuarbeiten.") }],
        tag: { tone: "teal", text: t("12 · WASTE · 50 FOR UNDERSTANDING", "12 · VERSCHWENDUNG · 50 FÜRS VERSTEHEN") },
        means: t(
          "The part that is left goes to germane load: the effort of linking ideas and working an example. The subject did not change; the design decided how much was wasted.",
          "Der Rest geht in die lernbezogene (germane) Belastung: die Mühe, Ideen zu verknüpfen und ein Beispiel durchzuarbeiten. Das Thema hat sich nicht geändert; die Gestaltung hat entschieden, wie viel vergeudet wurde.",
        ),
        look: t("the teal part has grown from 10 to 50", "der türkise Teil ist von 10 auf 50 gewachsen"),
      },
      {
        art: "a2-4",
        scene: t("Priya asks the team the question that matters when a platform is called “too complicated”.", "Priya stellt dem Team die Frage, auf die es ankommt, wenn eine Plattform „zu kompliziert“ genannt wird."),
        speech: [{ by: "priya", text: t("Is it the subject, the presentation, or the effort of understanding? Only the middle one is ours to change.", "Liegt es am Thema, an der Darstellung oder an der Mühe des Verstehens? Nur das Mittlere können wir ändern.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Minimise the unnecessary load, leave room for the effort that teaches. Blocks 1.2 and 2.1 ask you to find which kind of load an option or a platform adds, and what to change.",
          "Minimieren Sie die unnötige Belastung, lassen Sie Platz für die Mühe, die lehrt. Block 1.2 und Block 2.1 verlangen, herauszufinden, welche Art von Belastung eine Option oder eine Plattform erzeugt und was zu ändern ist.",
        ),
      },
    ],
  },

  A3: {
    id: "d3-a3",
    pixel: true,
    title: t("Twelve things become three", "Aus zwölf Dingen werden drei"),
    teaser: t("Mira tidies a start page so that it fits in working memory.", "Mira räumt eine Startseite auf, damit sie ins Arbeitsgedächtnis passt."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a3-1",
        scene: t("Mira leads a team and opens the start page of the platform. She counts twelve separate things.", "Mira leitet ein Team und öffnet die Startseite der Plattform. Sie zählt zwölf einzelne Dinge."),
        speech: [{ by: "mira", think: true, text: t("Twelve things. I can hold maybe four at once. Where do I even start?", "Zwölf Dinge. Ich kann vielleicht vier auf einmal halten. Wo fange ich überhaupt an?") }],
        tag: { tone: "plain", text: t("12 LOOSE ITEMS", "12 LOSE ELEMENTE") },
        means: t(
          "Working memory can hold only a few new things at once. Miller (1956) put it at seven plus or minus two; later work (Cowan 2001) suggests about four chunks for new material.",
          "Das Arbeitsgedächtnis kann nur wenige neue Dinge auf einmal halten. Miller (1956) setzte es bei sieben plus/minus zwei an; spätere Arbeiten (Cowan 2001) legen für neues Material etwa vier Chunks nahe.",
        ),
      },
      {
        art: "a3-2",
        scene: t("She groups the same twelve items under three names: Learn, Progress and Talk.", "Sie fasst dieselben zwölf Elemente unter drei Namen zusammen: Lernen, Fortschritt und Gespräch."),
        speech: [{ by: "mira", text: t("Still twelve things, but now I only hold three groups. I open one group when I need it.", "Immer noch zwölf Dinge, aber jetzt halte ich nur drei Gruppen. Eine Gruppe öffne ich, wenn ich sie brauche.") }],
        tag: { tone: "teal", text: t("CHUNKING · 3 GROUPS", "CHUNKING · 3 GRUPPEN") },
        means: t(
          "A chunk is a meaningful group. A phone number written in groups is easier than eleven loose digits. Chunking reduces what the learner holds at once without deleting content.",
          "Ein Chunk ist eine sinnvolle Gruppe. Eine in Gruppen geschriebene Telefonnummer ist leichter als elf lose Ziffern. Chunking verringert, was die Lernende auf einmal hält, ohne Inhalt zu löschen.",
        ),
        look: t("Learn, Progress, Talk", "Lernen, Fortschritt, Gespräch"),
      },
      {
        art: "a3-3",
        scene: t("On the lesson page she makes the next quiz big and yellow, and the rest small and quiet.", "Auf der Lektionsseite macht sie das nächste Quiz groß und gelb und den Rest klein und ruhig."),
        speech: [{ by: "mira", text: t("Now the eye goes to the next quiz first, and the other lines wait.", "Jetzt geht das Auge zuerst zum nächsten Quiz, und die anderen Zeilen warten.") }],
        tag: { tone: "teal", text: t("VISUAL HIERARCHY", "VISUELLE HIERARCHIE") },
        means: t(
          "A visual hierarchy uses size, colour, contrast and position so that attention goes to the main thing first. A flat page where every line looks the same gives attention nothing to choose.",
          "Eine visuelle Hierarchie nutzt Größe, Farbe, Kontrast und Position, damit die Aufmerksamkeit zuerst auf das Wichtigste geht. Eine flache Seite, auf der jede Zeile gleich aussieht, gibt der Aufmerksamkeit nichts zum Wählen.",
        ),
        look: t("the big yellow quiz", "das große gelbe Quiz"),
      },
      {
        art: "a3-4",
        scene: t("Priya and Mira agree on a rule of thumb for every new page.", "Priya und Mira einigen sich auf eine Faustregel für jede neue Seite."),
        speech: [{ by: "priya", text: t("About four separate things on a screen. More than that: group them, or hide some.", "Etwa vier einzelne Dinge auf einem Bildschirm. Mehr als das: gruppieren oder einige verbergen.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Chunking and visual hierarchy are the two most direct tools to reduce load. Block 1.2 asks you to rate options that use them, and Block 2.1 asks which measures to develop for EduCore.",
          "Chunking und visuelle Hierarchie sind die zwei direktesten Werkzeuge, um Belastung zu senken. Block 1.2 verlangt, Optionen zu bewerten, die sie nutzen, und Block 2.1, welche Maßnahmen für EduCore zu entwickeln sind.",
        ),
      },
    ],
  },

  A4: {
    id: "d3-a4",
    pixel: true,
    title: t("Four mistakes that waste the head", "Vier Fehler, die den Kopf vergeuden"),
    teaser: t("Daniel meets four versions of the same platform, each with one mistake.", "Daniel begegnet vier Versionen derselben Plattform, jede mit einem Fehler."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a4-1",
        scene: t("On the first version many things compete at once: banners, buttons, boxes.", "Auf der ersten Version konkurrieren viele Dinge zugleich: Banner, Buttons, Kästen."),
        speech: [{ by: "daniel", think: true, text: t("I do not know where to look. It all shouts at the same time.", "Ich weiß nicht, wohin ich schauen soll. Alles schreit gleichzeitig.") }],
        tag: { tone: "plain", text: t("MISTAKE 1 · INFORMATION OVERLOAD", "FEHLER 1 · INFORMATIONSÜBERFLUTUNG") },
        means: t(
          "Too many things at once waste attention: the learner cannot pick what matters. A way to reduce it is to show one main thing and move the rest out of the way.",
          "Zu viele Dinge auf einmal vergeuden Aufmerksamkeit: Die Lernende kann nicht wählen, was zählt. Man verringert es, indem man eine Hauptsache zeigt und den Rest zur Seite schiebt.",
        ),
      },
      {
        art: "a4-2",
        scene: t("The second version is one long block of text with no headings.", "Die zweite Version ist ein langer Textblock ohne Überschriften."),
        speech: [{ by: "daniel", think: true, text: t("Where does one idea end and the next begin? I have to build the structure myself.", "Wo endet eine Idee und beginnt die nächste? Ich muss die Struktur selbst bauen.") }],
        tag: { tone: "plain", text: t("MISTAKE 2 · UNCLEAR STRUCTURE", "FEHLER 2 · UNKLARE STRUKTUR") },
        means: t(
          "Without headings and short parts, working memory has to hold the whole text and build the structure at the same time. Headings and short parts do that work for the learner.",
          "Ohne Überschriften und kurze Teile muss das Arbeitsgedächtnis den ganzen Text halten und zugleich die Struktur bauen. Überschriften und kurze Teile nehmen der Lernenden diese Arbeit ab.",
        ),
      },
      {
        art: "a4-3",
        scene: t("On the third version Daniel presses Submit on a quiz, and nothing shows him a result.", "Auf der dritten Version drückt Daniel bei einem Quiz auf „Absenden“, und nichts zeigt ihm ein Ergebnis."),
        speech: [{ by: "daniel", think: true, text: t("Did that work? Was I right? I cannot tell if my effort did anything.", "Hat das geklappt? Hatte ich recht? Ich kann nicht sagen, ob meine Mühe etwas bewirkt hat.") }],
        tag: { tone: "plain", text: t("MISTAKE 3 · MISSING FEEDBACK", "FEHLER 3 · FEHLENDES FEEDBACK") },
        means: t(
          "Missing feedback wastes the learner's wish to carry on: the effort has no visible result. A way to reduce it is to show a result and a next step after every action.",
          "Fehlendes Feedback vergeudet den Wunsch der Lernenden weiterzumachen: Die Mühe hat kein sichtbares Ergebnis. Man verringert es, indem man nach jeder Handlung ein Ergebnis und einen nächsten Schritt zeigt.",
        ),
      },
      {
        art: "a4-4",
        scene: t("The fourth version has five menu levels before Daniel reaches a lesson.", "Die vierte Version hat fünf Menüebenen, bevor Daniel eine Lektion erreicht."),
        speech: [{ by: "daniel", think: true, text: t("I spend my effort finding the lesson, not learning it.", "Meine Mühe geht ins Finden der Lektion, nicht ins Lernen.") }],
        tag: { tone: "plain", text: t("MISTAKE 4 · COMPLEX NAVIGATION", "FEHLER 4 · KOMPLEXE NAVIGATION") },
        means: t(
          "Complex navigation spends working memory on the way instead of the content. A way to reduce it is fewer levels and a clear path to the next lesson.",
          "Komplexe Navigation verbraucht Arbeitsgedächtnis für den Weg statt für den Inhalt. Man verringert sie mit weniger Ebenen und einem klaren Weg zur nächsten Lektion.",
        ),
      },
      {
        art: "a4-5",
        scene: t("Priya pins the four remedies on the wall, and adds a warning.", "Priya hängt die vier Gegenmittel an die Wand und fügt eine Warnung hinzu."),
        speech: [{ by: "priya", text: t("Each mistake has a remedy. But do not overdo it: a page that is too simple is also a mistake.", "Jeder Fehler hat ein Gegenmittel. Aber übertreiben Sie nicht: Eine zu einfache Seite ist auch ein Fehler.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "The four mistakes are a checklist for reading any learning screen. Block 1.1 asks you to find five problems of a lesson screen and say how it feels to the learner.",
          "Die vier Fehler sind eine Checkliste, um jeden Lernbildschirm zu lesen. Block 1.1 verlangt, fünf Probleme eines Lernbildschirms zu finden und zu sagen, wie er sich für die Lernende anfühlt.",
        ),
      },
    ],
  },

  A5: {
    id: "d3-a5",
    pixel: true,
    title: t("Three ideas, three questions", "Drei Ideen, drei Fragen"),
    teaser: t("LearnLoop has €30,000 and four weeks, and Priya weighs three ideas.", "LearnLoop hat 30.000 € und vier Wochen, und Priya wägt drei Ideen ab."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a5-1",
        scene: t("A course for beginners on a technical subject is rated “too complicated”. The content has to stay. LearnLoop has four weeks and €30,000, and three ideas on the table.", "Ein Kurs für Einsteiger zu einem technischen Thema wird als „zu kompliziert“ bewertet. Der Inhalt muss bleiben. LearnLoop hat vier Wochen und 30.000 € und drei Ideen auf dem Tisch."),
        speech: [{ by: "priya", text: t("We rate each idea on learning impact, effort and risk. For effort the rule is: under €8,000 is Low, up to €15,000 is Mid, above that is High.", "Wir bewerten jede Idee nach Lernwirkung, Aufwand und Risiko. Für den Aufwand gilt die Regel: unter 8.000 € ist Niedrig, bis 15.000 € Mittel, darüber Hoch.") }],
        tag: { tone: "plain", text: t("3 IDEAS · 3 QUESTIONS", "3 IDEEN · 3 FRAGEN") },
        means: t(
          "Learning impact asks how much it helps learners understand. Effort is money and time, decided here by the rule. Risk asks what could go wrong, for example that too much is removed.",
          "Lernwirkung fragt, wie sehr es Lernenden beim Verstehen hilft. Aufwand ist Geld und Zeit, hier von der Regel entschieden. Risiko fragt, was schiefgehen kann, zum Beispiel dass zu viel entfernt wird.",
        ),
      },
      {
        art: "a5-2",
        scene: t("Idea 1: shorten the content a lot. It costs €6,000.", "Idee 1: den Inhalt stark kürzen. Sie kostet 6.000 €."),
        speech: [{ by: "priya", think: true, text: t("€6,000 is under €8,000, so the effort is Low. But the content is needed, so cutting it removes what learners came for.", "6.000 € liegen unter 8.000 €, der Aufwand ist also Niedrig. Aber der Inhalt wird gebraucht, wer ihn kürzt, entfernt, wofür die Lernenden gekommen sind.") }],
        tag: { tone: "plain", text: t("IMPACT LOW · EFFORT LOW · RISK HIGH", "WIRKUNG NIEDRIG · AUFWAND NIEDRIG · RISIKO HOCH") },
        means: t(
          "Cheap is not the same as good. What is left may no longer teach the subject, and what is cut cannot easily be put back.",
          "Günstig ist nicht gleich gut. Was bleibt, lehrt das Thema vielleicht nicht mehr, und was gekürzt wurde, lässt sich nicht leicht zurückholen.",
        ),
        look: t("the three rating rows", "die drei Bewertungszeilen"),
      },
      {
        art: "a5-3",
        scene: t("Idea 2: add diagrams and graphics. It costs €16,000.", "Idee 2: Diagramme und Grafiken hinzufügen. Sie kostet 16.000 €."),
        speech: [{ by: "priya", think: true, text: t("€16,000 is above €15,000, so the effort is High. A diagram helps where a flow is described, not everywhere, and it takes all four weeks.", "16.000 € liegen über 15.000 €, der Aufwand ist also Hoch. Ein Diagramm hilft dort, wo ein Ablauf beschrieben wird, nicht überall, und es braucht alle vier Wochen.") }],
        tag: { tone: "plain", text: t("IMPACT MID · EFFORT HIGH · RISK MID", "WIRKUNG MITTEL · AUFWAND HOCH · RISIKO MITTEL") },
        means: t(
          "A good diagram helps, so the impact is Mid. Weak diagrams add clutter and the work uses the whole time, so the risk is Mid too.",
          "Ein gutes Diagramm hilft, die Wirkung ist also Mittel. Schwache Diagramme erhöhen die Unübersichtlichkeit, und die Arbeit braucht die ganze Zeit, das Risiko ist also ebenfalls Mittel.",
        ),
      },
      {
        art: "a5-4",
        scene: t("Idea 3: split the content into small modules. It costs €12,000.", "Idee 3: den Inhalt in kleine Module aufteilen. Sie kostet 12.000 €."),
        speech: [{ by: "priya", text: t("€12,000 lies between €8,000 and €15,000, so the effort is Mid. The learner holds less at once and the content stays.", "12.000 € liegen zwischen 8.000 € und 15.000 €, der Aufwand ist also Mittel. Die Lernende hält weniger auf einmal, und der Inhalt bleibt.") }],
        tag: { tone: "teal", text: t("IMPACT HIGH · EFFORT MID · RISK LOW", "WIRKUNG HOCH · AUFWAND MITTEL · RISIKO NIEDRIG") },
        means: t(
          "Chunking reduces what the learner holds at once without deleting content, so the impact is High. The split can be adjusted, so the risk is Low.",
          "Chunking verringert, was die Lernende auf einmal hält, ohne Inhalt zu löschen, die Wirkung ist also Hoch. Die Aufteilung lässt sich anpassen, das Risiko ist also Niedrig.",
        ),
      },
      {
        art: "a5-5",
        scene: t("Priya names the winner, and what LearnLoop still does not know.", "Priya nennt die Gewinnerin und was LearnLoop noch nicht weiß."),
        speech: [{ by: "priya", text: t("The module split has the greatest effect, even though it is not the cheapest. What we still do not know: is it the amount of content, or the wording?", "Die Modulaufteilung hat die größte Wirkung, obwohl sie nicht die günstigste ist. Was wir noch nicht wissen: Liegt es an der Menge des Inhalts oder an der Formulierung?") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Weigh each measure on the same three questions, put them in order and say why the first goes first. Say what you do not know. Block 1.2 asks you to do this for the three options of a learning module.",
          "Wägen Sie jede Maßnahme mit denselben drei Fragen ab, bringen Sie sie in eine Reihenfolge und sagen Sie, warum die erste zuerst kommt. Sagen Sie, was Sie nicht wissen. Block 1.2 verlangt das für die drei Optionen eines Lernmoduls.",
        ),
      },
    ],
  },

  B1: {
    id: "d3-b1",
    pixel: true,
    title: t("Two lenses on one decision", "Zwei Linsen auf eine Entscheidung"),
    teaser: t("The Chief Learning Experience Officer asks two questions about every UX decision.", "Die Chief Learning Experience Officer stellt zu jeder UX-Entscheidung zwei Fragen."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "b1-1",
        scene: t("The first question: did the learner reach the goal the course promised?", "Die erste Frage: Hat die Lernende das Ziel erreicht, das der Kurs versprach?"),
        speech: [{ by: "boss", text: t("This is learning effectiveness. Did the learner learn what we promised?", "Das ist Lerneffektivität. Hat die Lernende gelernt, was wir versprochen haben?") }],
        tag: { tone: "plain", text: t("LENS 1 · LEARNING EFFECTIVENESS", "LINSE 1 · LERNEFFEKTIVITÄT") },
        means: t(
          "Learning effectiveness asks whether the learner learned what the course promised. A design that is easy and teaches nothing fails this lens.",
          "Lerneffektivität fragt, ob die Lernende gelernt hat, was der Kurs versprach. Ein Design, das leicht ist und nichts lehrt, scheitert an dieser Linse.",
        ),
      },
      {
        art: "b1-2",
        scene: t("The second question: how much mental effort did it take?", "Die zweite Frage: Wie viel geistige Anstrengung hat es gekostet?"),
        speech: [{ by: "boss", text: t("This is cognitive efficiency. How much effort did that take?", "Das ist kognitive Effizienz. Wie viel Anstrengung hat das gekostet?") }],
        tag: { tone: "plain", text: t("LENS 2 · COGNITIVE EFFICIENCY", "LINSE 2 · KOGNITIVE EFFIZIENZ") },
        means: t(
          "Cognitive efficiency asks how much mental effort the result cost. A design can be hard and teach a lot, but only effort that goes into understanding is well spent.",
          "Kognitive Effizienz fragt, wie viel geistige Anstrengung das Ergebnis gekostet hat. Ein Design kann schwer sein und viel lehren, aber nur Anstrengung, die ins Verstehen fließt, ist gut angelegt.",
        ),
      },
      {
        art: "b1-3",
        scene: t("Together the lenses give three kinds of path to the goal.", "Zusammen ergeben die Linsen drei Arten von Weg zum Ziel."),
        speech: [{ by: "boss", text: t("A short path that arrives is effective and efficient. A path around banners and chat windows is effective, but not efficient. A short path that stops early is efficient, but not effective.", "Ein kurzer Weg, der ankommt, ist effektiv und effizient. Ein Weg um Banner und Chat-Fenster herum ist effektiv, aber nicht effizient. Ein kurzer Weg, der früh endet, ist effizient, aber nicht effektiv.") }],
        tag: { tone: "teal", text: t("THREE PATHS", "DREI WEGE") },
        means: t(
          "The aim is a design that gets the learning result at a reasonable mental cost. This card calls it learning-effective UX.",
          "Das Ziel ist ein Design, das das Lernergebnis zu vertretbaren geistigen Kosten erreicht. Diese Karte nennt es lerneffektives UX.",
        ),
        look: t("the first path ends on the check, the last one stops short", "der erste Weg endet am Häkchen, der letzte bleibt stehen"),
      },
      {
        art: "b1-4",
        scene: t("A team proposes a change that only makes the page look lighter.", "Ein Team schlägt eine Änderung vor, die die Seite nur leichter aussehen lässt."),
        speech: [{ by: "boss", text: t("Looking lighter is not the goal. I say no to a measure that does not help learning.", "Leichter auszusehen ist nicht das Ziel. Zu einer Maßnahme, die dem Lernen nicht hilft, sage ich Nein.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "A definition of learning-effective UX is what lets you say no to a measure that only makes things look simpler. Block 3.1 asks you to write that definition and to prioritise three measures by it.",
          "Eine Definition von lerneffektivem UX erlaubt Ihnen, Nein zu einer Maßnahme zu sagen, die alles nur einfacher aussehen lässt. Block 3.1 verlangt, diese Definition zu schreiben und drei Maßnahmen danach zu priorisieren.",
        ),
      },
    ],
  },

  B2: {
    id: "d3-b2",
    pixel: true,
    title: t("Lighter is not always better", "Leichter ist nicht immer besser"),
    teaser: t("LearnLoop has a hard course for beginners and five options for it.", "LearnLoop hat einen schweren Kurs für Einsteiger und fünf Optionen dafür."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "b2-1",
        scene: t("Priya places the five options on a matrix: how much mental load each removes, and how much depth it keeps.", "Priya ordnet die fünf Optionen in einer Matrix: wie viel geistige Belastung jede entfernt und wie viel Tiefe sie behält."),
        speech: [{ by: "priya", text: t("Efficiency and depth pull against each other. The top right is where we want to be: much load removed, depth kept.", "Effizienz und Tiefe ziehen gegeneinander. Oben rechts wollen wir sein: viel Belastung entfernt, Tiefe behalten.") }],
        tag: { tone: "plain", text: t("5 OPTIONS · 2 AXES", "5 OPTIONEN · 2 ACHSEN") },
        means: t(
          "The plan's conflict for Day 3 is efficiency against deep learning. The decision is how much load to remove and how much to keep.",
          "Der Konflikt des Plans für Tag 3 lautet Effizienz gegen tiefes Lernen. Die Entscheidung ist, wie viel Belastung man entfernt und wie viel man behält.",
        ),
      },
      {
        art: "b2-2",
        scene: t("Option A cuts the content by half. It sits far to the right and low.", "Option A kürzt den Inhalt um die Hälfte. Sie liegt weit rechts und unten."),
        speech: [{ by: "priya", think: true, text: t("Learners will finish, and then find they cannot apply what is left.", "Lernende werden abschließen und dann merken, dass sie das Übrige nicht anwenden können.") }],
        tag: { tone: "plain", text: t("A · LIGHT BUT SHALLOW", "A · LEICHT, ABER FLACH") },
        means: t(
          "Removing the difficulty that is part of the learning leaves learners with a feeling of understanding and little ability. This is the risk of too much simplification.",
          "Wer die Schwierigkeit entfernt, die zum Lernen gehört, lässt Lernende mit einem Gefühl des Verstehens und wenig Können zurück. Das ist das Risiko zu starker Vereinfachung.",
        ),
        look: t("point A, bottom right", "Punkt A, unten rechts"),
      },
      {
        art: "b2-3",
        scene: t("Option E keeps the course as it is. It sits high and far to the left.", "Option E lässt den Kurs, wie er ist. Sie liegt oben und weit links."),
        speech: [{ by: "priya", think: true, text: t("All the depth, and no relief. The learners stay lost, and many of them leave.", "Die ganze Tiefe und keine Entlastung. Die Lernenden bleiben verloren, und viele gehen.") }],
        tag: { tone: "plain", text: t("E · DEEP BUT HEAVY", "E · TIEF, ABER SCHWER") },
        means: t(
          "There are two risks: content that is too simple and content that is too complex. A plan that names only one has not weighed the conflict.",
          "Es gibt zwei Risiken: zu einfacher und zu komplexer Inhalt. Ein Plan, der nur eines nennt, hat den Konflikt nicht abgewogen.",
        ),
        look: t("point E, top left", "Punkt E, oben links"),
      },
      {
        art: "b2-4",
        scene: t("Option B splits the course into modules with one goal each.", "Option B teilt den Kurs in Module mit je einem Ziel."),
        speech: [{ by: "priya", text: t("It removes a good share of the load and keeps the content. Remove the unnecessary load first, keep the difficulty the course exists to teach.", "Sie entfernt einen guten Teil der Belastung und behält den Inhalt. Entfernen Sie zuerst die unnötige Belastung, behalten Sie die Schwierigkeit, die der Kurs lehren soll.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Aim for much load removed and the depth kept. Block 3.1 asks for a risk analysis of content that is too simple against content that is too complex; the positions here are a reading of this example, not a score.",
          "Streben Sie viel entfernte Belastung bei erhaltener Tiefe an. Block 3.1 verlangt eine Risikoanalyse von zu einfachem gegenüber zu komplexem Inhalt; die Positionen hier sind eine Lesart dieses Beispiels, keine Note.",
        ),
        look: t("point B, near the top right", "Punkt B, nahe oben rechts"),
      },
    ],
  },

  B3: {
    id: "d3-b3",
    pixel: true,
    title: t("A decision without user data", "Eine Entscheidung ohne Nutzerdaten"),
    teaser: t("LearnLoop must decide, and does not yet know why learners are overloaded.", "LearnLoop muss entscheiden und weiß noch nicht, warum Lernende überlastet sind."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "b3-1",
        scene: t("The Chief Learning Experience Officer has no user data. She decides to rebuild one course in small modules and test it with five beginners.", "Die Chief Learning Experience Officer hat keine Nutzerdaten. Sie entscheidet, einen Kurs in kleinen Modulen neu zu bauen und mit fünf Einsteigern zu testen."),
        speech: [{ by: "boss", text: t("I decide this. What I do not know: are learners overloaded by the amount, or by the wording?", "Das entscheide ich. Was ich nicht weiß: Sind Lernende durch die Menge oder durch die Formulierung überlastet?") }],
        tag: { tone: "plain", text: t("I DECIDE · I DO NOT KNOW", "ICH ENTSCHEIDE · ICH WEISS NICHT") },
        means: t(
          "A decision under uncertainty starts with two things: what you decide and what you do not know. Saying what is unknown makes the decision checkable.",
          "Eine Entscheidung unter Unsicherheit beginnt mit zwei Dingen: was Sie entscheiden und was Sie nicht wissen. Zu sagen, was unbekannt ist, macht die Entscheidung überprüfbar.",
        ),
      },
      {
        art: "b3-2",
        scene: t("She also says what would make her reverse the decision, and by when.", "Sie sagt auch, was sie zum Rückgängigmachen bringen würde, und bis wann."),
        speech: [{ by: "boss", text: t("I reverse it if fewer than 4 of 5 beginners can explain the key point after a lesson, or if completion is not up 5 points after 8 weeks.", "Ich nehme es zurück, wenn weniger als 4 von 5 Einsteigern nach einer Lektion den Kerngedanken erklären können oder die Completion nach 8 Wochen nicht um 5 Punkte gestiegen ist.") }],
        tag: { tone: "plain", text: t("I REVERSE IF · 4 OF 5 · 8 WEEKS", "ICH NEHME ZURÜCK, WENN · 4 VON 5 · 8 WOCHEN") },
        means: t(
          "A reversal condition has a figure and a time, so the decision does not depend on one person's taste. Three of the five can explain it here, so this test would call for a reversal.",
          "Eine Rückgängig-Bedingung hat eine Zahl und eine Zeit, damit die Entscheidung nicht vom Geschmack einer Person abhängt. Hier können nur drei der fünf es erklären, dieser Test würde also zur Rücknahme führen.",
        ),
        look: t("three ticks and two crosses, against the need of 4 of 5", "drei Häkchen und zwei Kreuze, bei einer Anforderung von 4 von 5"),
      },
      {
        art: "b3-3",
        scene: t("The fourth part: what she gives up.", "Der vierte Teil: worauf sie verzichtet."),
        speech: [{ by: "boss", text: t("I give up the full diagram redesign this year.", "Ich verzichte in diesem Jahr auf die komplette Diagramm-Neugestaltung.") }],
        tag: { tone: "plain", text: t("I GIVE UP", "ICH VERZICHTE AUF") },
        means: t(
          "Every decision costs something. Naming what you give up shows that the choice was weighed, not just made.",
          "Jede Entscheidung kostet etwas. Zu nennen, worauf Sie verzichten, zeigt, dass die Wahl abgewogen und nicht nur getroffen wurde.",
        ),
      },
      {
        art: "b3-4",
        scene: t("For the next time, Priya and the Chief Learning Experience Officer set a rule for content decisions.", "Für das nächste Mal legen Priya und die Chief Learning Experience Officer eine Regel für Inhaltsentscheidungen fest."),
        speech: [{ by: "priya", text: t("The head of learning decides with the content lead, on evidence: a usability test with beginners, a short comprehension check, drop-out per lesson.", "Die Leiterin Lernen entscheidet mit dem Content Lead, auf Grundlage von Belegen: einem Usability-Test mit Einsteigern, einer kurzen Verständnisprüfung und dem Abbruch pro Lektion.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "A decision under uncertainty states what you decide, what you do not know, what would make you reverse it and what you give up. A rule says who decides and on what evidence. Block 3.1 asks you to write both.",
          "Eine Entscheidung unter Unsicherheit nennt, was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und worauf Sie verzichten. Eine Regel sagt, wer entscheidet und auf welcher Grundlage. Block 3.1 verlangt, beides zu schreiben.",
        ),
      },
    ],
  },
}) as Record<MaterialId, Comic>;
