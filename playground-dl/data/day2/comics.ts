import { bi, t } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/day2/materials";

/**
 * Day 2 · the story comics in pixel art (DL-STANDARD.md section 13). One per study card: the card's own material told as a short story with the people
 * the card already uses (Sofia, Ana, Lena, LearnLoop's Chief Product Officer), so it is the card said again in pictures, not a new case. Every figure
 * comes from the card or its diagram. The comic replaces the card's "Walk me through it" story. Speech and captions are HTML in ComicModal; the
 * drawings are in components/day2/comicScenes.tsx.
 */
const NOTE = t(
  "Sofia, Ana, Lena, Tom, the Chief Product Officer and LearnLoop are made up for this lesson, like the examples on the card: a Case assumption. LearnPro's own case is in the task.",
  "Sofia, Ana, Lena, Tom, der Chief Product Officer und LearnLoop sind für diese Lektion erfunden, wie die Beispiele auf der Karte: eine Fallannahme. Der eigene Fall von LearnPro steht in der Aufgabe.",
);
const NAMES = {
  sofia: t("Sofia, product designer", "Sofia, Produktdesignerin"),
  ana: t("Ana, UX researcher", "Ana, UX-Forscherin"),
  lena: t("Lena, learner", "Lena, Lernende"),
  tom: t("Tom, video editor", "Tom, Videoeditor"),
  boss: t("Chief Product Officer", "Chief Product Officer"),
  learner: t("A learner", "Eine Lernende"),
  narrator: t("Narrator", "Erzähler"),
};

export const COMICS_D2 = bi({
  A1: {
    id: "d2-a1",
    pixel: true,
    title: t("A course that shows the way, and one that does not", "Ein Kurs, der den Weg zeigt, und einer, der es nicht tut"),
    teaser: t("Lena meets the same course twice.", "Lena begegnet demselben Kurs zweimal."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a1-1",
        scene: t("Lena wants to learn project basics. She opens a course that is one long page.", "Lena will Projektgrundlagen lernen. Sie öffnet einen Kurs, der aus einer langen Seite besteht."),
        speech: [{ by: "lena", think: true, text: t("Where do I start, and how long is this?", "Wo fange ich an, und wie lang ist das?") }],
        tag: { tone: "plain", text: t("NO PATH · NO SHORT UNITS", "KEIN PFAD · KEINE KURZEN EINHEITEN") },
        means: t(
          "There is no list of steps and no unit she can finish in the time she has. Two of the three questions every learner asks are left unanswered: what do I do next, and can I do this in the time I have.",
          "Es gibt keine Liste von Schritten und keine Einheit, die sie in ihrer Zeit abschließen kann. Zwei der drei Fragen, die jede Lernende stellt, bleiben offen: Was tue ich als Nächstes, und schaffe ich das in der Zeit, die ich habe.",
        ),
        look: t("one long column of text, nothing else", "eine lange Textspalte, sonst nichts"),
      },
      {
        art: "a1-2",
        scene: t("She scrolls to the end. The page sends her back to the course list.", "Sie scrollt bis zum Ende. Die Seite schickt sie zur Kursliste zurück."),
        speech: [{ by: "lena", text: t("Did I finish? Did I get it right? Nothing tells me.", "Bin ich fertig? Habe ich es richtig gemacht? Nichts sagt es mir.") }],
        tag: { tone: "plain", text: t("NO FEEDBACK", "KEIN FEEDBACK") },
        means: t(
          "The third question is also unanswered: am I getting somewhere, and did I get it right. Without a result or a sign of progress, the effort feels wasted, and many learners do not come back.",
          "Auch die dritte Frage bleibt offen: Komme ich voran, und lag ich richtig. Ohne Ergebnis oder Zeichen des Fortschritts wirkt die Mühe vergeudet, und viele Lernende kommen nicht wieder.",
        ),
      },
      {
        art: "a1-3",
        scene: t("The same course on another platform: a path, a progress bar and units of six minutes.", "Derselbe Kurs auf einer anderen Plattform: ein Pfad, eine Fortschrittsleiste und Einheiten von sechs Minuten."),
        speech: [{ by: "lena", text: t("Step 2 of 6, and the next unit is six minutes. I can do that on my break.", "Schritt 2 von 6, und die nächste Einheit dauert sechs Minuten. Das schaffe ich in meiner Pause.") }],
        tag: { tone: "teal", text: t("PATH · SHORT UNITS · FEEDBACK", "PFAD · KURZE EINHEITEN · FEEDBACK") },
        means: t(
          "Each practice answers one question: the path says what comes next, the short unit fits the time she has, and the progress bar shows how far she has come. The content may be the same; the experience is not.",
          "Jede Praxis beantwortet eine Frage: Der Pfad sagt, was als Nächstes kommt, die kurze Einheit passt in ihre Zeit, und die Fortschrittsleiste zeigt, wie weit sie gekommen ist. Der Inhalt kann derselbe sein; das Erlebnis ist es nicht.",
        ),
        look: t("the path, the bar and the six-minute chips", "der Pfad, die Leiste und die Sechs-Minuten-Felder"),
      },
      {
        art: "a1-4",
        scene: t("Sofia sums it up for Lena.", "Sofia fasst es für Lena zusammen."),
        speech: [{ by: "sofia", text: t("Ask three questions of any platform: what do I do next, can I do this in the time I have, am I getting somewhere?", "Stellen Sie jeder Plattform drei Fragen: Was tue ich als Nächstes, schaffe ich das in der Zeit, die ich habe, komme ich voran?") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Learning path, short units and feedback are the three practices behind success. Block 1.1 asks you to say which of two platforms you prefer, to find five differences between them and to derive three principles.",
          "Lernpfad, kurze Einheiten und Feedback sind die drei Praktiken hinter dem Erfolg. Block 1.1 verlangt, dass Sie sagen, welche von zwei Plattformen Sie bevorzugen, fünf Unterschiede finden und drei Prinzipien ableiten.",
        ),
      },
    ],
  },

  A2: {
    id: "d2-a2",
    pixel: true,
    title: t("A paper test in one afternoon", "Ein Papiertest an einem Nachmittag"),
    teaser: t("Sofia learns in an afternoon what six weeks of building would have cost.", "Sofia erfährt an einem Nachmittag, was sechs Wochen Bauen gekostet hätten."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a2-1",
        scene: t("Sofia has an idea for a new course start screen with a Next button.", "Sofia hat eine Idee für einen neuen Kursstart-Bildschirm mit einem Weiter-Button."),
        speech: [{ by: "sofia", text: t("My team could build this as a polished design in six weeks. But will learners even notice the button?", "Mein Team könnte das in sechs Wochen als ausgearbeitetes Design bauen. Aber werden Lernende den Button überhaupt bemerken?") }],
        tag: { tone: "plain", text: t("THE IDEA · SIX WEEKS TO BUILD", "DIE IDEE · SECHS WOCHEN ZUM BAUEN") },
        means: t(
          "A mistake found after six weeks of building would be expensive to fix. The question is not how the screen looks but whether learners find the way on.",
          "Ein nach sechs Wochen Bauen gefundener Fehler wäre teuer zu beheben. Die Frage ist nicht, wie der Bildschirm aussieht, sondern ob Lernende den Weg weiter finden.",
        ),
      },
      {
        art: "a2-2",
        scene: t("Instead of building, Sofia draws the screen on paper and asks five learners to find their next lesson.", "Statt zu bauen, zeichnet Sofia den Bildschirm auf Papier und bittet fünf Lernende, ihre nächste Lektion zu finden."),
        speech: [{ by: "learner", think: true, text: t("Where do I go now?", "Wohin muss ich jetzt?") }],
        tag: { tone: "plain", text: t("PAPER TEST · ONE AFTERNOON", "PAPIERTEST · EIN NACHMITTAG") },
        means: t(
          "Four of the five do not see the Next button, because it sits in the top corner where nobody looks. It took one afternoon and cost almost nothing, and it already answered her question.",
          "Vier der fünf sehen den Weiter-Button nicht, weil er in der oberen Ecke sitzt, wo niemand hinschaut. Es dauerte einen Nachmittag, kostete fast nichts und beantwortete ihre Frage bereits.",
        ),
        look: t("the question marks over four of the five learners", "die Fragezeichen über vier der fünf Lernenden"),
      },
      {
        art: "a2-3",
        scene: t("Sofia moves the button below the lesson list and tests again with five new learners.", "Sofia verschiebt den Button unter die Lektionsliste und testet erneut mit fünf neuen Lernenden."),
        speech: [{ by: "sofia", text: t("On paper this took ten minutes. Now four of five find it at once.", "Auf Papier dauerte das zehn Minuten. Jetzt finden vier von fünf ihn sofort.") }],
        tag: { tone: "teal", text: t("THE CHANGE · TEN MINUTES ON PAPER", "DIE ÄNDERUNG · ZEHN MINUTEN AUF PAPIER") },
        means: t(
          "The same change would have cost half an hour in the wireframe, a few hours in the clickable prototype and one to two days in the polished design. The rougher the version, the cheaper it is to be wrong.",
          "Dieselbe Änderung hätte im Wireframe eine halbe Stunde, im klickbaren Prototyp einige Stunden und im ausgearbeiteten Design ein bis zwei Tage gekostet. Je gröber die Version, desto billiger ist es, sich zu irren.",
        ),
      },
      {
        art: "a2-4",
        scene: t("Sofia shows the ladder from paper to polished design.", "Sofia zeigt die Leiter vom Papier zum ausgearbeiteten Design."),
        speech: [{ by: "sofia", text: t("Climb the ladder only as far as the question needs.", "Steigen Sie die Leiter nur so weit hinauf, wie die Frage es braucht.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Prototyping is risk reduction, not design play. A question about order and wording needs paper or grey boxes; a question about the exact look needs a polished version, and only later. Blocks 1.2 and 2.1 ask you to decide how to prototype.",
          "Prototyping ist Risikoreduktion, kein Designspiel. Eine Frage zu Reihenfolge und Wortlaut braucht Papier oder graue Kästen; eine Frage zum genauen Aussehen braucht eine ausgearbeitete Version, und erst später. Die Blöcke 1.2 und 2.1 verlangen, dass Sie entscheiden, wie Sie prototypen.",
        ),
      },
    ],
  },

  A3: {
    id: "d2-a3",
    pixel: true,
    title: t("Five learners, one afternoon", "Fünf Lernende, ein Nachmittag"),
    teaser: t("Ana finds out how many test users are enough.", "Ana findet heraus, wie viele Testpersonen genügen."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a3-1",
        scene: t("Ana, a UX researcher, wants to know what is wrong with the course start screen. She starts with one learner.", "Ana, eine UX-Forscherin, will wissen, was am Kursstart-Bildschirm nicht stimmt. Sie beginnt mit einer Lernenden."),
        speech: [{ by: "ana", text: t("One learner already stumbles over the Next button and the quiz message.", "Schon eine Lernende stolpert über den Weiter-Button und die Quizmeldung.") }],
        tag: { tone: "plain", text: t("1 USER · ABOUT 31 PERCENT", "1 NUTZERIN · ETWA 31 PROZENT") },
        means: t(
          "In Nielsen and Landauer's model, one user already finds about 31 percent of the problems, so even the first test teaches a lot.",
          "Im Modell von Nielsen und Landauer findet schon eine Nutzerin etwa 31 Prozent der Probleme, schon der erste Test lehrt also viel.",
        ),
      },
      {
        art: "a3-2",
        scene: t("Ana tests with more learners.", "Ana testet mit weiteren Lernenden."),
        speech: [{ by: "ana", text: t("Three users reach about 65 percent, five about 85. Each new one mostly repeats what we saw.", "Drei Nutzerinnen erreichen etwa 65 Prozent, fünf etwa 85. Jede neue wiederholt meist, was wir schon gesehen haben.") }],
        tag: { tone: "teal", text: t("5 USERS · ABOUT 85 PERCENT", "5 NUTZERINNEN · ETWA 85 PROZENT") },
        means: t(
          "Each new user adds less, because most of the problems have already been seen. That is why a handful of users is enough for a first test.",
          "Jede neue Nutzerin bringt weniger, weil die meisten Probleme schon gesehen wurden. Deshalb genügt eine Handvoll Nutzerinnen für einen ersten Test.",
        ),
      },
      {
        art: "a3-3",
        scene: t("Ana imagines a test with fifteen users.", "Ana stellt sich einen Test mit fünfzehn Nutzerinnen vor."),
        speech: [{ by: "ana", think: true, text: t("Nearly everything found, but three times the cost of five, and the first problems could have been fixed by then.", "Fast alles gefunden, aber dreimal so teuer wie fünf, und die ersten Probleme hätten bis dahin behoben sein können.") }],
        tag: { tone: "plain", text: t("15 USERS · THREE TIMES THE COST", "15 NUTZERINNEN · DREIMAL SO TEUER") },
        means: t(
          "Nielsen's advice is therefore to run several small tests with about five users each, fixing what you find in between, rather than one large test. Plan about five for each user group.",
          "Nielsens Rat lautet daher, mehrere kleine Tests mit je etwa fünf Nutzerinnen zu machen und zwischendurch zu beheben, was man findet, statt eines großen Tests. Planen Sie etwa fünf pro Nutzergruppe.",
        ),
      },
      {
        art: "a3-4",
        scene: t("Ana shows two kinds of data side by side.", "Ana zeigt zwei Arten von Daten nebeneinander."),
        speech: [{ by: "ana", text: t("Watch a few learners to learn why they struggle. Count many to learn how many. Use both, in that order.", "Beobachten Sie wenige Lernende, um zu erfahren, warum sie sich schwertun. Zählen Sie viele, um zu erfahren, wie viele. Nutzen Sie beides, in dieser Reihenfolge.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Qualitative data says why, quantitative data says how many. A number such as a drop-out rate tells you where to look, not what to fix. Block 2.1 asks you to define three UX tests: what you test, how, and what you measure.",
          "Qualitative Daten sagen, warum; quantitative sagen, wie viele. Eine Zahl wie die Abbruchquote sagt, wo Sie hinschauen sollen, nicht, was zu beheben ist. Block 2.1 verlangt, drei UX-Tests zu definieren: was Sie testen, wie, und was Sie messen.",
        ),
      },
    ],
  },

  A4: {
    id: "d2-a4",
    pixel: true,
    title: t("Three levels of adaptive learning", "Drei Stufen adaptiven Lernens"),
    teaser: t("Lena meets a choice, a rule and a model.", "Lena begegnet einer Wahl, einer Regel und einem Modell."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a4-1",
        scene: t("Lena is a new learner at LearnLoop. At the start the platform shows her three paths.", "Lena ist neue Lernende bei LearnLoop. Zum Start zeigt ihr die Plattform drei Pfade."),
        speech: [{ by: "lena", text: t("Basics, Standard or Advanced? I will take Standard.", "Basics, Standard oder Advanced? Ich nehme Standard.") }],
        tag: { tone: "plain", text: t("LEVEL 1 · THE LEARNER CHOOSES", "STUFE 1 · DIE LERNENDE WÄHLT") },
        means: t(
          "Nothing here is adaptive in a technical sense: the learner decides, and she may choose badly or not at all.",
          "Nichts davon ist im technischen Sinn adaptiv: Die Lernende entscheidet, und sie kann schlecht oder gar nicht wählen.",
        ),
      },
      {
        art: "a4-2",
        scene: t("LearnLoop adds one rule: if the pre-test score is at least 80 percent, skip unit 1.", "LearnLoop fügt eine Regel hinzu: Ist das Vortestergebnis mindestens 80 Prozent, wird Einheit 1 übersprungen."),
        speech: [{ by: "lena", text: t("85 percent, so the platform starts me at unit 2 without asking.", "85 Prozent, also startet mich die Plattform bei Einheit 2, ohne zu fragen.") }],
        tag: { tone: "teal", text: t("LEVEL 2 · A RULE DECIDES", "STUFE 2 · EINE REGEL ENTSCHEIDET") },
        means: t(
          "This is adaptive learning at its simplest: it needs only a pre-test and a few rules, and it is easy to explain. A learner with 65 would start at unit 1.",
          "Das ist adaptives Lernen in seiner einfachsten Form: Es braucht nur einen Vortest und einige Regeln und lässt sich leicht erklären. Eine Lernende mit 65 würde bei Einheit 1 beginnen.",
        ),
      },
      {
        art: "a4-3",
        scene: t("At the third level a model trained on the data of many learners picks the next step.", "Auf der dritten Stufe wählt ein Modell, das mit den Daten vieler Lernender trainiert wurde, den nächsten Schritt."),
        speech: [{ by: "lena", think: true, text: t("It suggests a next step. Why this one? I cannot see.", "Es schlägt einen nächsten Schritt vor. Warum gerade diesen? Ich sehe es nicht.") }],
        tag: { tone: "plain", text: t("LEVEL 3 · A MODEL DECIDES", "STUFE 3 · EIN MODELL ENTSCHEIDET") },
        means: t(
          "It needs many learners, good data and content in several variants, and it brings the risks of a cold start, a black box and legal duties. A model that can show why (learners like you finished this) is more transparent.",
          "Es braucht viele Lernende, gute Daten und Inhalte in mehreren Varianten, und es bringt die Risiken von Cold Start, Black Box und rechtlichen Pflichten. Ein Modell, das zeigen kann, warum (Lernende wie Sie haben das abgeschlossen), ist transparenter.",
        ),
      },
      {
        art: "a4-4",
        scene: t("Sofia gives Lena the three questions to ask before any adaptive step.", "Sofia gibt Lena die drei Fragen mit, die vor jedem adaptiven Schritt zu stellen sind."),
        speech: [{ by: "sofia", text: t("Is there a learner problem that individual paths solve? Is there enough good data? Are there content variants to adapt to?", "Gibt es ein Problem der Lernenden, das individuelle Pfade lösen? Gibt es genug gute Daten? Gibt es Inhaltsvarianten, an die man anpassen kann?") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Without all three it is over-engineering. Start with the simplest level that answers the problem and add complexity step by step. Blocks 2.1 and 3.1 ask whether adaptive learning is worthwhile.",
          "Ohne alle drei ist es Over-Engineering. Beginnen Sie mit der einfachsten Stufe, die das Problem beantwortet, und fügen Sie Komplexität Schritt für Schritt hinzu. Die Blöcke 2.1 und 3.1 fragen, ob adaptives Lernen lohnt.",
        ),
      },
    ],
  },

  A5: {
    id: "d2-a5",
    pixel: true,
    title: t("LearnLoop weighs three options", "LearnLoop wägt drei Optionen ab"),
    teaser: t("Sofia rates a full course, a paper sketch and a wait.", "Sofia bewertet einen ganzen Kurs, eine Papierskizze und das Abwarten."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a5-1",
        scene: t("LearnLoop is an online-course provider. Sofia leads the team.", "LearnLoop ist ein Anbieter von Online-Kursen. Sofia leitet das Team."),
        speech: [{ by: "sofia", text: t("Many new learners leave in the first week, and I do not know why.", "Viele neue Lernende gehen in der ersten Woche, und ich weiß nicht, warum.") }],
        tag: { tone: "plain", text: t("THE SITUATION", "DIE LAGE") },
        means: t(
          "LearnLoop has a problem it cannot explain yet, a limited budget and one quarter. Three options are on the table. This is a decision that rests on judgement, not on data.",
          "LearnLoop hat ein Problem, das es noch nicht erklären kann, ein begrenztes Budget und ein Quartal. Drei Optionen liegen auf dem Tisch. Das ist eine Entscheidung, die auf Urteil beruht, nicht auf Daten.",
        ),
      },
      {
        art: "a5-2",
        scene: t("Option A. Tom edits videos.", "Option A. Tom schneidet Videos."),
        speech: [
          { by: "sofia", text: t("Option A: build a full onboarding course, twelve videos.", "Option A: einen kompletten Onboarding-Kurs bauen, zwölf Videos.") },
          { by: "tom", text: t("That is a lot of work before a single learner sees one.", "Das ist viel Arbeit, bevor eine einzige Lernende eines sieht.") },
        ],
        tag: { tone: "plain", text: t("A · BENEFIT MID · EFFORT HIGH · RISK HIGH", "A · NUTZEN MITTEL · AUFWAND HOCH · RISIKO HOCH") },
        means: t(
          "A full course gives a complete programme, but nobody knows yet whether it is what learners need. If the idea is wrong, most of the work is lost, and finished videos are hard to change.",
          "Ein ganzer Kurs gibt ein vollständiges Programm, aber noch weiß niemand, ob es das ist, was Lernende brauchen. Ist die Idee falsch, geht der größte Teil der Arbeit verloren, und fertige Videos lassen sich schwer ändern.",
        ),
      },
      {
        art: "a5-3",
        scene: t("Option B. A paper sketch on the table, five learners around it.", "Option B. Eine Papierskizze auf dem Tisch, fünf Lernende darum herum."),
        speech: [
          { by: "sofia", text: t("Option B: sketch the first week and ask five learners to try it.", "Option B: die erste Woche skizzieren und fünf Lernende bitten, sie auszuprobieren.") },
          { by: "learner", text: t("I got lost here, on the second screen.", "Hier habe ich mich verlaufen, auf dem zweiten Bildschirm.") },
        ],
        tag: { tone: "teal", text: t("B · BENEFIT HIGH · EFFORT LOW · RISK LOW", "B · NUTZEN HOCH · AUFWAND NIEDRIG · RISIKO NIEDRIG") },
        means: t(
          "Within days LearnLoop sees where learners get lost, and why. Little is spent and nothing is locked in. The build still has to follow, but it then rests on evidence.",
          "Innerhalb weniger Tage sieht LearnLoop, wo Lernende sich verlaufen, und warum. Es wird wenig ausgegeben und nichts festgelegt. Der Bau muss noch folgen, beruht dann aber auf Belegen.",
        ),
      },
      {
        art: "a5-4",
        scene: t("Option C. A calendar, and learners still walking out of the door.", "Option C. Ein Kalender, und Lernende, die weiter zur Tür hinausgehen."),
        speech: [
          { by: "sofia", text: t("Option C: wait for next quarter's numbers.", "Option C: auf die Zahlen des nächsten Quartals warten.") },
          { by: "narrator", text: t("Meanwhile, another quarter of new learners leaves.", "Währenddessen geht ein weiteres Quartal neuer Lernender.") },
        ],
        tag: { tone: "plain", text: t("C · BENEFIT LOW · EFFORT LOW · RISK MID", "C · NUTZEN NIEDRIG · AUFWAND NIEDRIG · RISIKO MITTEL") },
        means: t(
          "The numbers say how many learners leave, not why, so waiting teaches little. It costs no effort, but another quarter of learners leaves while LearnLoop waits.",
          "Die Zahlen sagen, wie viele Lernende gehen, nicht warum, das Abwarten lehrt also wenig. Es kostet keinen Aufwand, aber ein weiteres Quartal Lernender geht, während LearnLoop wartet.",
        ),
      },
      {
        art: "a5-5",
        scene: t("Sofia decides, and names what she still does not know.", "Sofia entscheidet und nennt, was sie noch nicht weiß."),
        speech: [{ by: "sofia", text: t("B. I still do not know if they leave because the start is confusing or the course is too long, so I will ask five who left.", "B. Ich weiß noch nicht, ob sie gehen, weil der Start verwirrend oder der Kurs zu lang ist, also frage ich fünf, die gegangen sind.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Rate every option on benefit, effort and risk with a reason, choose the cheapest step that gives real evidence, and say what you still do not know. Block 1.2 asks you to do this for the options of the task. Teams often use a scale such as Low, Medium and High; plain sentences do the same job.",
          "Bewerten Sie jede Option nach Nutzen, Aufwand und Risiko mit einem Grund, wählen Sie den günstigsten Schritt, der echte Belege liefert, und sagen Sie, was Sie noch nicht wissen. Block 1.2 verlangt, das für die Optionen der Aufgabe zu tun. Teams nutzen oft eine Skala wie Niedrig, Mittel und Hoch; einfache Sätze leisten dasselbe.",
        ),
      },
    ],
  },

  B1: {
    id: "d2-b1",
    pixel: true,
    title: t("Spend a little to learn", "Wenig ausgeben, um zu lernen"),
    teaser: t("LearnLoop splits one big bet into three stages with gates.", "LearnLoop teilt eine große Wette in drei Stufen mit Gates."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "b1-1",
        scene: t("LearnLoop's Chief Product Officer wants adaptive learning, because its competitors have it.", "LearnLoops Chief Product Officer will adaptives Lernen, weil die Wettbewerber es haben."),
        speech: [{ by: "boss", text: t("One decision would put 168,000 euros into the whole system at once.", "Eine Entscheidung würde 168.000 Euro auf einmal in das ganze System stecken.") }],
        tag: { tone: "plain", text: t("ONE BIG BET · €168,000", "EINE GROSSE WETTE · 168.000 €") },
        means: t(
          "If learners do not use it, all of that money is gone. So LearnLoop splits the plan into three stages: a small test, a pilot, and only then the full roll-out.",
          "Nutzen Lernende es nicht, ist das ganze Geld weg. LearnLoop teilt den Plan deshalb in drei Stufen: ein kleiner Test, ein Pilot und erst dann die volle Einführung.",
        ),
      },
      {
        art: "b1-2",
        scene: t("Stage 1 is a paper test with five learners for 8,000 euros. Gate 1 was written down in advance: at least four of five must complete the task.", "Stufe 1 ist ein Papiertest mit fünf Lernenden für 8.000 Euro. Gate 1 wurde vorab aufgeschrieben: Mindestens vier von fünf müssen die Aufgabe abschließen."),
        speech: [{ by: "boss", text: t("Only three complete it. We change the design and test again.", "Nur drei schließen sie ab. Wir ändern das Design und testen erneut.") }],
        tag: { tone: "plain", text: t("GATE 1 MISSED · €8,000 SPENT", "GATE 1 VERFEHLT · 8.000 € AUSGEGEBEN") },
        means: t(
          "LearnLoop has spent 8,000 euros and not 168,000, and the pilot and the roll-out stay unfunded.",
          "LearnLoop hat 8.000 Euro ausgegeben und nicht 168.000, und Pilot und Einführung bleiben unfinanziert.",
        ),
      },
      {
        art: "b1-3",
        scene: t("Suppose the design passed gate 1 and the pilot ran in one course for 40,000 euros. Gate 2 asks: is completion at least five points above the control group after eight weeks?", "Angenommen, das Design bestand Gate 1, und der Pilot lief in einem Kurs für 40.000 Euro. Gate 2 fragt: Liegt die Completion nach acht Wochen mindestens fünf Punkte über der Kontrollgruppe?"),
        speech: [{ by: "boss", text: t("It is not. We stop before the roll-out.", "Das tut sie nicht. Wir halten vor der Einführung an.") }],
        tag: { tone: "plain", text: t("GATE 2 MISSED · €48,000 SPENT · €120,000 KEPT", "GATE 2 VERFEHLT · 48.000 € AUSGEGEBEN · 120.000 € BEHALTEN") },
        means: t(
          "LearnLoop has spent 48,000 euros, keeps 120,000, and has learned that the idea does not move completion.",
          "LearnLoop hat 48.000 Euro ausgegeben, behält 120.000 und hat gelernt, dass die Idee die Completion nicht bewegt.",
        ),
      },
      {
        art: "b1-4",
        scene: t("The Chief Product Officer sums it up.", "Der Chief Product Officer fasst es zusammen."),
        speech: [{ by: "boss", text: t("Spend a little to learn, and let the evidence decide the next amount.", "Wenig ausgeben, um zu lernen, und die Belege über den nächsten Betrag entscheiden lassen.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Every gate carries a figure and a date written down before the stage starts, and a stage that misses its gate is changed or stopped, not extended by default. That is why partly is often the right answer to do we invest in adaptive learning. Block 3.1 asks for your decision.",
          "Jedes Gate trägt eine Zahl und ein Datum, die vor Beginn der Stufe aufgeschrieben werden, und eine Stufe, die ihr Gate verfehlt, wird geändert oder gestoppt, nicht standardmäßig verlängert. Deshalb ist teilweise oft die richtige Antwort auf die Frage, ob wir in adaptives Lernen investieren. Block 3.1 verlangt Ihre Entscheidung.",
        ),
      },
    ],
  },

  B2: {
    id: "d2-b2",
    pixel: true,
    title: t("What gives most for least", "Was am meisten für am wenigsten gibt"),
    teaser: t("Sofia places six features by value and by the data they need.", "Sofia ordnet sechs Funktionen nach Wert und benötigten Daten."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "b2-1",
        scene: t("LearnLoop is deciding what to build next. Sofia lists six features and places each on a matrix.", "LearnLoop entscheidet, was als Nächstes gebaut wird. Sofia listet sechs Funktionen und ordnet jede in einer Matrix ein."),
        speech: [{ by: "sofia", text: t("Across: how much does it help the learner. Up: how much data and complexity does it need.", "Quer: wie sehr hilft es der Lernenden. Nach oben: wie viele Daten und wie viel Komplexität braucht es.") }],
        tag: { tone: "plain", text: t("THE MATRIX · SIX FEATURES", "DIE MATRIX · SECHS FUNKTIONEN") },
        means: t(
          "Technology decisions pull goals apart. Placing every feature by two questions makes the pull visible before anyone decides.",
          "Technologieentscheidungen ziehen Ziele auseinander. Jede Funktion mit zwei Fragen einzuordnen macht den Zug sichtbar, bevor jemand entscheidet.",
        ),
      },
      {
        art: "b2-2",
        scene: t("Feature C is a short test that lets learners skip what they already know.", "Funktion C ist ein kurzer Test, mit dem Lernende überspringen, was sie schon wissen."),
        speech: [{ by: "sofia", text: t("High value, and it needs only a pre-test and a few rules, not an algorithm. Start here.", "Hoher Wert, und es braucht nur einen Vortest und einige Regeln, keinen Algorithmus. Hier beginnen.") }],
        tag: { tone: "teal", text: t("C · START HERE", "C · HIER BEGINNEN") },
        means: t(
          "Start with what gives most for least: a feature that helps learners a lot and needs little data.",
          "Beginnen Sie mit dem, was am meisten für am wenigsten gibt: einer Funktion, die Lernenden viel hilft und wenig Daten braucht.",
        ),
      },
      {
        art: "b2-3",
        scene: t("Now feature F, a full AI tutor, and feature D, a recommendation list.", "Nun Funktion F, ein vollständiger KI-Tutor, und Funktion D, eine Empfehlungsliste."),
        speech: [{ by: "sofia", text: t("F could be very valuable, but it needs the most data, and we have little. D needs data on many learners and gives modest value at first. Both wait.", "F könnte sehr wertvoll sein, braucht aber die meisten Daten, und wir haben wenige. D braucht Daten vieler Lernender und gibt zunächst bescheidenen Wert. Beide warten.") }],
        tag: { tone: "plain", text: t("D AND F · LATER", "D UND F · SPÄTER") },
        means: t(
          "Features like these are for later, after small steps have produced evidence. The positions are a reading of this example, not a score.",
          "Funktionen wie diese sind für später, nachdem kleine Schritte Belege geliefert haben. Die Positionen sind eine Lesart dieses Beispiels, keine Bewertung.",
        ),
      },
      {
        art: "b2-4",
        scene: t("Sofia and the Chief Product Officer agree on the rule.", "Sofia und der Chief Product Officer einigen sich auf die Regel."),
        speech: [{ by: "boss", text: t("Name the conflict in one sentence, say what each side gets and loses, then decide.", "Benennen Sie den Konflikt in einem Satz, sagen Sie, was jede Seite bekommt und verliert, und entscheiden Sie dann.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Place a feature by two questions: how much does it help the learner, and how much data and complexity does it need. Let the data-hungry features wait for their gate. Block 3.1 asks for a prioritised roadmap and a risk analysis of technology against user value.",
          "Ordnen Sie eine Funktion mit zwei Fragen ein: Wie sehr hilft sie der Lernenden, und wie viele Daten und wie viel Komplexität braucht sie. Lassen Sie datenhungrige Funktionen auf ihr Gate warten. Block 3.1 verlangt eine priorisierte Roadmap und eine Risikoanalyse von Technologie gegen Nutzerwert.",
        ),
      },
    ],
  },

  B3: {
    id: "d2-b3",
    pixel: true,
    title: t("A pilot with a control group", "Ein Pilot mit Kontrollgruppe"),
    teaser: t("LearnLoop turns an unknown into evidence.", "LearnLoop macht aus einer Unbekannten einen Beleg."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "b3-1",
        scene: t("LearnLoop wants to test a rule-based step: a pre-test that lets learners skip what they know. It splits 200 new learners at random into two groups of 100.", "LearnLoop will einen regelbasierten Schritt testen: einen Vortest, mit dem Lernende überspringen, was sie wissen. Es teilt 200 neue Lernende zufällig in zwei Gruppen zu je 100."),
        speech: [{ by: "boss", text: t("The pilot group gets the new step. The control group gets the course as it is today. Eight weeks for both.", "Die Pilotgruppe bekommt den neuen Schritt. Die Kontrollgruppe bekommt den Kurs wie heute. Acht Wochen für beide.") }],
        tag: { tone: "plain", text: t("PILOT AND CONTROL · 100 + 100", "PILOT UND KONTROLLE · 100 + 100") },
        means: t(
          "Each dot is one learner. The control group is what makes the result a result: without it, LearnLoop would not know whether a rise came from the new step or from something else.",
          "Jeder Punkt ist eine Lernende. Die Kontrollgruppe macht aus dem Ergebnis ein Ergebnis: Ohne sie wüsste LearnLoop nicht, ob ein Anstieg vom neuen Schritt oder von etwas anderem kam.",
        ),
      },
      {
        art: "b3-2",
        scene: t("The gate was written down before the pilot: completion must be at least five points above the control group.", "Das Gate wurde vor dem Pilot aufgeschrieben: Die Completion muss mindestens fünf Punkte über der Kontrollgruppe liegen."),
        speech: [{ by: "boss", text: t("60 percent of the control group finished, and the pilot is only two points higher. The gate is missed.", "60 Prozent der Kontrollgruppe haben abgeschlossen, und der Pilot liegt nur zwei Punkte höher. Das Gate ist verfehlt.") }],
        tag: { tone: "plain", text: t("GATE MISSED", "GATE VERFEHLT") },
        means: t(
          "LearnLoop reverses the step or changes it, and it has spent a pilot, not a platform.",
          "LearnLoop nimmt den Schritt zurück oder ändert ihn, und es hat einen Pilot ausgegeben, keine Plattform.",
        ),
      },
      {
        art: "b3-3",
        scene: t("Now suppose the pilot group finishes seven points above the control group.", "Nun angenommen, die Pilotgruppe schließt sieben Punkte über der Kontrollgruppe ab."),
        speech: [{ by: "boss", text: t("The gate is met. We keep the step and plan the next stage.", "Das Gate ist erreicht. Wir behalten den Schritt und planen die nächste Stufe.") }],
        tag: { tone: "teal", text: t("GATE MET", "GATE ERREICHT") },
        means: t(
          "A pilot with a control group is the standard way to turn an unknown into evidence, and a gate written in advance turns the evidence into a decision.",
          "Ein Pilot mit Kontrollgruppe ist der übliche Weg, aus einer Unbekannten einen Beleg zu machen, und ein vorab geschriebenes Gate macht aus dem Beleg eine Entscheidung.",
        ),
      },
      {
        art: "b3-4",
        scene: t("The Chief Product Officer writes down what a decision under uncertainty must say.", "Der Chief Product Officer schreibt auf, was eine Entscheidung unter Unsicherheit sagen muss."),
        speech: [{ by: "boss", text: t("What I decide, what I do not know, what would make me reverse it and by when, and what I give up.", "Was ich entscheide, was ich nicht weiß, was mich zum Zurücknehmen bringen würde und bis wann, und worauf ich verzichte.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "A reversal condition is checkable only with a figure and a time. Prefer the decision you can undo cheaply while you learn. Block 3.1 asks you to make one decision under uncertainty on purpose.",
          "Eine Rückgängig-Bedingung ist nur mit einer Zahl und einer Zeit prüfbar. Bevorzugen Sie die Entscheidung, die Sie günstig zurücknehmen können, während Sie lernen. Block 3.1 verlangt, bewusst eine Entscheidung unter Unsicherheit zu treffen.",
        ),
      },
    ],
  },
}) as unknown as Record<MaterialId, Comic>;
