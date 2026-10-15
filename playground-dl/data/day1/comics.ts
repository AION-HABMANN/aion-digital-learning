import { bi, t } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/day1/materials";

/**
 * Day 1 · the story comics (CLAUDE.md #54). One per study card: the card's own material told as a short story with the people it already uses
 * (Mia, Daniel, Lena, LearnLoop's managing director), so it is the card said again in pictures, not a new case. Every figure comes from the card
 * or its diagram (data/day1, components/day1/diagrams.tsx). Speech and captions are HTML in ComicModal; the drawings are in
 * components/day1/comicScenes.tsx and carry only numerals and one-word labels. Everyone and LearnLoop are made up for this lesson.
 */
const NOTE = t(
  "Mia, Daniel, Lena, the managing director and LearnLoop are made up for this lesson, like the examples on the card: a Case assumption. SkillUp's own numbers are in the task.",
  "Mia, Daniel, Lena, die Geschäftsführerin und LearnLoop sind für diese Lektion erfunden, wie die Beispiele auf der Karte: eine Fallannahme. Die Zahlen von SkillUp stehen in der Aufgabe.",
);
const NAMES = {
  lena: t("Lena, UX lead", "Lena, UX Lead"),
  mia: t("Mia", "Mia"),
  daniel: t("Daniel", "Daniel"),
  md: t("Managing director", "Geschäftsführerin"),
  trainer: t("Trainer", "Trainer"),
};

export const COMICS_D1 = bi({
  A1: {
    id: "d1-a1",
    title: t("One course page, seen as a surface and as an experience", "Eine Kursseite, als Oberfläche und als Erlebnis gesehen"),
    teaser: t("Lena polishes a page, and Mia goes through it.", "Lena poliert eine Seite, und Mia geht durch sie hindurch."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a1-polish",
        scene: t("LearnLoop's UX lead Lena has spent a week polishing the course page: new colours, new buttons, new fonts.", "LearnLoops UX Lead Lena hat eine Woche lang die Kursseite poliert: neue Farben, neue Buttons, neue Schriften."),
        speech: [{ by: "lena", text: t("Fresh colours, clearer buttons, a nicer layout. It looks great now.", "Frische Farben, klarere Buttons, ein schöneres Layout. Jetzt sieht es gut aus.") }],
        tag: { tone: "plain", text: t("UI: what you see and touch", "UI: was man sieht und anfasst") },
        means: t(
          "UI is the surface: colours, buttons, text and layout. Lena changed all of them, and that is real work. The open question is whether the experience on the page changed too.",
          "UI ist die Oberfläche: Farben, Buttons, Text und Layout. Lena hat alle verändert, und das ist echte Arbeit. Offen ist, ob sich damit auch das Erlebnis auf der Seite verändert hat.",
        ),
        look: t("the polished page: colours, tiles, a button", "die polierte Seite: Farben, Kacheln, ein Button"),
      },
      {
        art: "a1-find",
        scene: t("Mia, a project manager, opens the page to carry on with her course.", "Mia, Projektleiterin, öffnet die Seite, um mit ihrem Kurs weiterzumachen."),
        speech: [{ by: "mia", think: true, text: t("Where is my course? I only see a menu of eight entries.", "Wo ist mein Kurs? Ich sehe nur ein Menü mit acht Einträgen.") }],
        tag: { tone: "teal", text: t("UX: can I find it?", "UX: Kann ich es finden?") },
        means: t(
          "Finding the course is part of the experience, and a new colour does not help with it. Mia's first problem is not what the page looks like. It is that she cannot find her lesson.",
          "Den Kurs zu finden gehört zum Erlebnis, und eine neue Farbe hilft dabei nicht. Mias erstes Problem ist nicht, wie die Seite aussieht. Es ist, dass sie ihre Lektion nicht findet.",
        ),
      },
      {
        art: "a1-follow",
        scene: t("She finally opens the lesson.", "Schließlich öffnet sie die Lektion."),
        speech: [{ by: "mia", text: t("A wall of text, and I do not know these words.", "Eine Textwand, und ich kenne diese Wörter nicht.") }],
        tag: { tone: "teal", text: t("UX: can I understand it?", "UX: Kann ich es verstehen?") },
        means: t(
          "The second part of the experience is following what you read. One block of text with unexplained words costs effort that should go into learning, and new colours do not change that.",
          "Der zweite Teil des Erlebnisses ist, dem Gelesenen zu folgen. Ein Textblock mit unerklärten Wörtern kostet Mühe, die ins Lernen fließen sollte, und neue Farben ändern daran nichts.",
        ),
      },
      {
        art: "a1-finish",
        scene: t("Twenty minutes later.", "Zwanzig Minuten später."),
        speech: [{ by: "mia", text: t("I cannot tell if I am getting anywhere. I will stop here.", "Ich kann nicht erkennen, ob ich vorankomme. Ich höre hier auf.") }],
        tag: { tone: "teal", text: t("UX: will I finish it?", "UX: Werde ich abschließen?") },
        means: t(
          "The third part is seeing that you are getting somewhere. With no sign of progress Mia closes the tab, and a learner who stops has not learned, however good the content is. That is why learning success is UX success.",
          "Der dritte Teil ist zu sehen, dass man vorankommt. Ohne ein Zeichen von Fortschritt schließt Mia den Tab, und wer aufhört, hat nicht gelernt, so gut der Inhalt auch ist. Darum ist Lernerfolg UX-Erfolg.",
        ),
      },
      {
        art: "a1-layers",
        scene: t("Lena looks at the page again.", "Lena sieht sich die Seite noch einmal an."),
        speech: [{ by: "lena", text: t("I changed the surface. The experience is still the same.", "Ich habe die Oberfläche verändert. Das Erlebnis ist noch dasselbe.") }],
        tag: { tone: "ink", text: t("UI is part of UX, not all of it", "UI ist ein Teil von UX, nicht alles") },
        means: t(
          "UX is everything the learner goes through: find it, understand it, finish it. UI is only the surface, and it is part of that. So describe a problem as what the learner cannot do or feel, not as what looks wrong. You use this test in Block 1.1.",
          "UX ist alles, was die Lernenden durchlaufen: finden, verstehen, abschließen. UI ist nur die Oberfläche, und sie gehört dazu. Beschreiben Sie ein Problem also als das, was die Lernenden nicht können oder fühlen, nicht als das, was schlecht aussieht. Diesen Test nutzen Sie in Block 1.1.",
        ),
        look: t("the thin top layer (UI) and the three steps below it (UX)", "die dünne obere Schicht (UI) und die drei Schritte darunter (UX)"),
      },
    ],
  },

  A2: {
    id: "d1-a2",
    title: t("Mia has twenty minutes", "Mia hat zwanzig Minuten"),
    teaser: t("The same platform, built around its features and then around Mia's goal.", "Dieselbe Plattform, erst um ihre Funktionen gebaut und dann um Mias Ziel."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a2-menu",
        scene: t("Mia has twenty minutes before a meeting and opens LearnLoop to carry on with lesson 3 of her course on negotiating with suppliers.", "Mia hat zwanzig Minuten vor einem Termin und öffnet LearnLoop, um mit Lektion 3 ihres Kurses über Lieferantenverhandlungen weiterzumachen."),
        speech: [{ by: "mia", text: t("Lesson 3, please.", "Lektion 3, bitte.") }],
        tag: { tone: "plain", text: t("The system's view: a menu of features", "Sicht des Systems: ein Menü der Funktionen") },
        means: t(
          "The menu shows how the builders organised the platform: eight entries for what the software can do, and none says “continue”. This is a platform organised around its features.",
          "Das Menü zeigt, wie die Entwickler die Plattform geordnet haben: acht Einträge für das, was die Software kann, und keiner sagt „Weitermachen“. Das ist eine um ihre Funktionen herum organisierte Plattform.",
        ),
        look: t("the menu on the left: eight entries", "das Menü links: acht Einträge"),
      },
      {
        art: "a2-lost",
        scene: t("She tries Courses, then Library.", "Sie probiert Kurse, dann Bibliothek."),
        speech: [{ by: "mia", think: true, text: t("Courses… Library… where is lesson 3?", "Kurse … Bibliothek … wo ist Lektion 3?") }],
        tag: { tone: "plain", text: t("Three minutes, and still not found", "Drei Minuten, und immer noch nicht gefunden") },
        means: t(
          "After three minutes Mia has not found lesson 3, her twenty minutes are nearly gone and she closes the tab. LearnLoop never finds out why she left, which is why a problem like this stays hidden.",
          "Nach drei Minuten hat Mia Lektion 3 nicht gefunden, ihre zwanzig Minuten sind fast um, und sie schließt den Tab. LearnLoop erfährt nie, warum sie gegangen ist, und deshalb bleibt ein solches Problem verborgen.",
        ),
      },
      {
        art: "a2-goals",
        scene: t("The same platform, now organised by what a learner wants to do.", "Dieselbe Plattform, jetzt nach dem geordnet, was Lernende tun wollen."),
        speech: [{ by: "mia", text: t("One click: “Carry on where I stopped, lesson 3 of 8”.", "Ein Klick: „Dort weitermachen, wo ich aufgehört habe, Lektion 3 von 8“.") }],
        tag: { tone: "teal", text: t("The learner's view: goals first", "Sicht der Lernenden: Ziele zuerst") },
        means: t(
          "None of the features changed. What changed is who does the work of finding the goal: before it was Mia, now it is the platform.",
          "Keine Funktion hat sich geändert. Geändert hat sich, wer die Arbeit des Findens des Ziels macht: vorher war es Mia, jetzt ist es die Plattform.",
        ),
        look: t("the first card, with the blue outline", "die erste Karte, mit dem blauen Rahmen"),
      },
      {
        art: "a2-point",
        scene: t("What to take from it.", "Was Sie mitnehmen."),
        speech: [{ by: "lena", text: t("For every screen, ask: whose goal does it serve?", "Fragen Sie bei jedem Bildschirm: Wessen Ziel dient er?") }],
        tag: { tone: "ink", text: t("Whose goal does it serve?", "Wessen Ziel dient er?") },
        means: t(
          "Ask this of every screen and every measure: the learner's goal or the system's. Learners, teachers and organisations want different things, so name who a measure helps. You use this question in Blocks 1.1 and 2.2.",
          "Fragen Sie das bei jedem Bildschirm und jeder Maßnahme: das Ziel der Lernenden oder das des Systems. Lernende, Lehrende und Organisationen wollen Verschiedenes, nennen Sie also, wem eine Maßnahme hilft. Diese Frage nutzen Sie in den Blöcken 1.1 und 2.2.",
        ),
      },
    ],
  },

  A3: {
    id: "d1-a3",
    title: t("Daniel and lesson 3", "Daniel und Lektion 3"),
    teaser: t("One lesson, fixed one question at a time.", "Eine Lektion, Frage für Frage verbessert."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a3-wall",
        scene: t("Evening. Daniel works in procurement and is taking an online course on contract basics. He wants to finish lesson 3.", "Abend. Daniel arbeitet im Einkauf und belegt einen Online-Kurs über Vertragsgrundlagen. Er will Lektion 3 abschließen."),
        speech: [{ by: "daniel", think: true, text: t("About 500 words in one block. Where am I in this course? How am I doing?", "Etwa 500 Wörter in einem Block. Wo stehe ich in diesem Kurs? Wie komme ich voran?") }],
        tag: { tone: "plain", text: t("No orientation, no help, no progress", "Keine Orientierung, keine Hilfe, kein Fortschritt") },
        means: t(
          "The lesson opens as one block of about 500 words, with nothing that says where it sits in the course and nothing that says how he is doing. A tired learner stops for reasons you can name.",
          "Die Lektion öffnet sich als ein Block von etwa 500 Wörtern, ohne etwas, das sagt, wo sie im Kurs steht, und ohne etwas, das sagt, wie er vorankommt. Ein müder Lernender hört aus Gründen auf, die Sie benennen können.",
        ),
        look: t("the whole screen: one grey wall, nothing else", "der ganze Bildschirm: eine graue Wand, sonst nichts"),
      },
      {
        art: "a3-orient",
        scene: t("First fix: where am I?", "Erste Lösung: Wo bin ich?"),
        speech: [{ by: "lena", text: t("A line at the top: Module 2, Lesson 3 of 8, and a “Next lesson” button.", "Eine Zeile oben: Modul 2, Lektion 3 von 8, und ein Button „Nächste Lektion“.") }],
        tag: { tone: "teal", text: t("Clarity and orientation", "Klarheit und Orientierung") },
        means: t(
          "Daniel now knows where he is and what comes after. But knowing where you are does not make a hard text easy, so he is still struggling.",
          "Daniel weiß jetzt, wo er ist und was danach kommt. Aber zu wissen, wo man ist, macht einen schweren Text nicht leicht, er tut sich also immer noch schwer.",
        ),
        look: t("the top bar of the lesson", "die obere Leiste der Lektion"),
      },
      {
        art: "a3-light",
        scene: t("Second fix: can I follow this?", "Zweite Lösung: Kann ich folgen?"),
        speech: [{ by: "lena", text: t("A heading, three short paragraphs, and “wireframe” explained right where it appears.", "Eine Überschrift, drei kurze Absätze und „Wireframe“ direkt dort erklärt, wo es vorkommt.") }],
        tag: { tone: "teal", text: t("Low cognitive load", "Geringe kognitive Belastung") },
        means: t(
          "Daniel can now scan the page and find the main point in seconds. He reads instead of digging, so his attention goes into the lesson, not into decoding the screen.",
          "Daniel kann die Seite jetzt überfliegen und die Hauptaussage in Sekunden finden. Er liest, statt zu graben, und seine Aufmerksamkeit fließt in die Lektion, nicht ins Entziffern des Bildschirms.",
        ),
        look: t("the text in the middle: short blocks and one explained word", "der Text in der Mitte: kurze Blöcke und ein erklärtes Wort"),
      },
      {
        art: "a3-feedback",
        scene: t("Third fix: am I getting somewhere?", "Dritte Lösung: Komme ich voran?"),
        speech: [{ by: "daniel", text: t("3 of 8 lessons done. 4 of 5 correct: review question 2.", "3 von 8 Lektionen erledigt. 4 von 5 richtig: Frage 2 noch einmal prüfen.") }],
        tag: { tone: "teal", text: t("Feedback and progress", "Feedback und Fortschritt") },
        means: t(
          "He sees that he is progressing, and he knows what to do about the question he missed. A missing progress bar, or no message after a quiz, is about feedback, not about how the screen looks.",
          "Er sieht, dass er vorankommt, und er weiß, was er mit der verfehlten Frage tun kann. Eine fehlende Fortschrittsleiste oder keine Meldung nach einem Quiz betrifft das Feedback, nicht das Aussehen des Bildschirms.",
        ),
        look: t("the bottom bar: progress and the quiz result", "die untere Leiste: Fortschritt und Quizergebnis"),
      },
      {
        art: "a3-three",
        scene: t("Three fixes, three questions.", "Drei Lösungen, drei Fragen."),
        speech: [{ by: "lena", text: t("Where am I? Can I follow this? Am I getting somewhere?", "Wo bin ich? Kann ich folgen? Komme ich voran?") }],
        tag: { tone: "ink", text: t("Orientation · Light load · Feedback", "Orientierung · Leichte Last · Feedback") },
        means: t(
          "Each fix answered a different question, so a finding can be sorted by the question it breaks. When one is missing, learners stop for a reason you can name. You sort findings like this in Block 1.1.",
          "Jede Lösung beantwortete eine andere Frage, ein Befund lässt sich also nach der Frage sortieren, die er verletzt. Fehlt eine, hören Lernende aus einem Grund auf, den Sie benennen können. Solche Befunde sortieren Sie in Block 1.1.",
        ),
      },
    ],
  },

  A4: {
    id: "d1-a4",
    title: t("Mia pays a bill, then she learns", "Mia bezahlt eine Rechnung, dann lernt sie"),
    teaser: t("Why a learning platform is not a shopping or banking app.", "Warum eine Lernplattform keine Shopping- oder Banking-App ist."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a4-bank",
        scene: t("Mia pays a supplier invoice in a banking app.", "Mia bezahlt eine Lieferantenrechnung in einer Banking-App."),
        speech: [{ by: "mia", text: t("Two minutes, done.", "Zwei Minuten, erledigt.") }],
        tag: { tone: "plain", text: t("Classic app: a quick task done", "Klassische App: eine schnelle Aufgabe erledigt") },
        means: t(
          "In a classic app (pay, book, buy) the goal is a quick task finished, in minutes, in one visit. The less effort, the better.",
          "In einer klassischen App (bezahlen, buchen, kaufen) ist das Ziel eine schnell erledigte Aufgabe, in Minuten, in einem Besuch. Je weniger Mühe, desto besser.",
        ),
      },
      {
        art: "a4-weeks",
        scene: t("The same evening she opens her negotiation course.", "Am selben Abend öffnet sie ihren Verhandlungskurs."),
        speech: [{ by: "mia", think: true, text: t("This one will take me weeks.", "Das wird Wochen dauern.") }],
        tag: { tone: "plain", text: t("Learning platform: what you know has changed", "Lernplattform: Was man weiß, hat sich verändert") },
        means: t(
          "A learning platform has a different goal: what someone knows or can do has changed. That takes weeks and many visits, and success is that the learner finishes and can use it.",
          "Eine Lernplattform hat ein anderes Ziel: Das, was jemand weiß oder kann, hat sich verändert. Das dauert Wochen und viele Besuche, und Erfolg heißt, dass die Lernenden abschließen und es anwenden können.",
        ),
      },
      {
        art: "a4-effort",
        scene: t("A quiz question asks her to explain a rule in her own words.", "Eine Quizfrage verlangt, eine Regel in eigenen Worten zu erklären."),
        speech: [{ by: "mia", text: t("Hmm. I have to think about this one.", "Hmm. Darüber muss ich nachdenken.") }],
        tag: { tone: "teal", text: t("Some effort is the point", "Etwas Mühe ist der Sinn") },
        means: t(
          "A measure that makes a screen quicker is not automatically better for learning. Remove the effort that does not help learning, such as hunting for the lesson, and keep the effort that does, such as thinking about a quiz question.",
          "Eine Maßnahme, die einen Bildschirm schneller macht, ist nicht automatisch besser fürs Lernen. Nehmen Sie die Mühe weg, die dem Lernen nicht hilft, etwa die Suche nach der Lektion, und behalten Sie die, die ihm hilft, etwa das Nachdenken über eine Quizfrage.",
        ),
      },
      {
        art: "a4-guided",
        scene: t("Not every learner studies the same way.", "Nicht alle Lernenden lernen auf dieselbe Weise."),
        speech: [
          { by: "mia", text: t("Alone, I get lost and stop, and nobody notices.", "Allein verirre ich mich und höre auf, und niemand merkt es.") },
          { by: "trainer", text: t("With a trainer, I set the next step and I can see how you are doing.", "Mit Trainer lege ich den nächsten Schritt fest und sehe, wie Sie vorankommen.") },
        ],
        tag: { tone: "ink", text: t("Self-directed or guided?", "Selbstgesteuert oder geführt?") },
        means: t(
          "Ask whether the learner studies alone or with a trainer before you choose. Alone, the platform must supply the clear path and the feedback a trainer would. With a trainer, it needs visibility for the trainer and a shared schedule.",
          "Fragen Sie, ob die Lernenden allein oder mit Trainer lernen, bevor Sie wählen. Allein muss die Plattform den klaren Pfad und das Feedback liefern, die ein Trainer geben würde. Mit Trainer braucht sie Sichtbarkeit für den Trainer und einen gemeinsamen Zeitplan.",
        ),
        look: t("left: a learner alone. Right: a learner with a trainer", "links: eine Lernende allein. Rechts: ein Lernender mit Trainer"),
      },
    ],
  },

  A5: {
    id: "d1-a5",
    title: t("LearnLoop's three ideas", "LearnLoops drei Ideen"),
    teaser: t("Three measures, three questions, and what is still unknown.", "Drei Maßnahmen, drei Fragen und was noch unbekannt ist."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a5-setup",
        scene: t("LearnLoop loses 30 of every 100 new learners in the first week. It has €30,000, six weeks and three ideas.", "LearnLoop verliert von je 100 neuen Lernenden 30 in der ersten Woche. Es hat 30.000 €, sechs Wochen und drei Ideen."),
        speech: [{ by: "lena", text: t("Rate each idea on three questions: how much it helps the learner, what it costs, and what could go wrong.", "Bewerten wir jede Idee mit drei Fragen: wie sehr sie den Lernenden hilft, was sie kostet und was schiefgehen kann.") }],
        tag: { tone: "plain", text: t("User impact · effort · risk", "Nutzerwirkung · Aufwand · Risiko") },
        means: t(
          "Effort is read from the printed cost: under €10,000 is Low, between €10,000 and €15,000 is Mid, above €15,000 is High. User impact and risk are your judgement, with a reason.",
          "Der Aufwand wird aus den gedruckten Kosten gelesen: unter 10.000 € ist Niedrig, zwischen 10.000 € und 15.000 € Mittel, über 15.000 € Hoch. Nutzerwirkung und Risiko sind Ihr Urteil, mit einem Grund.",
        ),
        look: t("the 100 dots: 30 are the learners who leave in week one", "die 100 Punkte: 30 sind die Lernenden, die in Woche eins gehen"),
      },
      {
        art: "a5-idea1",
        scene: t("Idea one: a guided first week that tells every newcomer what to do first.", "Idee eins: eine geführte erste Woche, die jeder Neuen sagt, was sie zuerst tun soll."),
        speech: [{ by: "lena", text: t("€7,000, so Low effort. Week one is where learners leave, so High impact. It adds a path and can be switched off, so Low risk.", "7.000 €, also niedriger Aufwand. In Woche eins gehen die Lernenden, also hohe Wirkung. Sie fügt einen Pfad hinzu und lässt sich abschalten, also niedriges Risiko.") }],
        tag: { tone: "teal", text: t("Cheap, direct and safe", "Günstig, direkt und sicher") },
        means: t(
          "Put together, this is a cheap, direct and safe measure: effort Low because €7,000 is under €10,000, user impact High, risk Low.",
          "Zusammen ergibt das eine günstige, direkte und sichere Maßnahme: Aufwand Niedrig, weil 7.000 € unter 10.000 € liegen, Nutzerwirkung Hoch, Risiko Niedrig.",
        ),
      },
      {
        art: "a5-idea2",
        scene: t("Idea two: a leaderboard that ranks learners by activity.", "Idee zwei: eine Rangliste, die Lernende nach Aktivität ordnet."),
        speech: [
          { by: "md", text: t("A ranking is exciting. Let us do it.", "Eine Rangliste ist spannend. Machen wir das.") },
          { by: "lena", text: t("€12,000, so Mid effort. It rewards those already active, so Low impact, and learners at the bottom may leave sooner: High risk.", "12.000 €, also mittlerer Aufwand. Sie belohnt die ohnehin Aktiven, also niedrige Wirkung, und Lernende unten gehen vielleicht früher: hohes Risiko.") },
        ],
        tag: { tone: "plain", text: t("Sounds exciting, can backfire", "Klingt aufregend, kann nach hinten losgehen") },
        means: t(
          "A ranking mostly rewards learners who are already active. A newcomer who is lost gains nothing from it and may leave sooner, and that newcomer is exactly who LearnLoop most wants to keep.",
          "Eine Rangliste belohnt vor allem Lernende, die ohnehin aktiv sind. Eine verirrte Neue gewinnt nichts davon und geht vielleicht früher, und genau sie will LearnLoop am meisten halten.",
        ),
        look: t("the learner at the bottom of the ranking", "die Lernende am Ende der Rangliste"),
      },
      {
        art: "a5-idea3",
        scene: t("Idea three: rewrite the whole course catalogue.", "Idee drei: den ganzen Kurskatalog neu schreiben."),
        speech: [{ by: "lena", text: t("€27,000: High effort, almost the whole budget. Most of the benefit would come after the six weeks, while learners leave in week one.", "27.000 €: hoher Aufwand, fast das ganze Budget. Der größte Nutzen käme nach den sechs Wochen, während die Lernenden in Woche eins gehen.") }],
        tag: { tone: "plain", text: t("Almost the whole budget on one bet", "Fast das ganze Budget auf eine Wette") },
        means: t(
          "€27,000 is above €15,000, so the effort is High, and most of the budget goes into one bet. If the cause is not the text, little is left to try something else.",
          "27.000 € liegen über 15.000 €, der Aufwand ist also Hoch, und der größte Teil des Budgets geht in eine Wette. Liegt die Ursache nicht im Text, bleibt wenig für einen anderen Versuch.",
        ),
        look: t("the budget bar: almost full. The benefit sits after week six.", "die Budgetleiste: fast voll. Der Nutzen liegt nach Woche sechs."),
      },
      {
        art: "a5-unknown",
        scene: t("Before committing the money.", "Bevor das Geld gebunden wird."),
        speech: [{ by: "lena", text: t("We do not know yet whether newcomers leave for lack of direction or lack of time. Five short interviews first.", "Wir wissen noch nicht, ob Neue gehen, weil ihnen Orientierung oder Zeit fehlt. Zuerst fünf kurze Interviews.") }],
        tag: { tone: "ink", text: t("Say what you do not know", "Sagen, was Sie nicht wissen") },
        means: t(
          "To choose well, rate every measure on the same three questions, say what you do not know, and then decide. LearnLoop should find out why newcomers leave before it commits the whole budget.",
          "Um gut zu wählen, bewerten Sie jede Maßnahme mit denselben drei Fragen, sagen Sie, was Sie nicht wissen, und entscheiden Sie dann. LearnLoop sollte herausfinden, warum Neue gehen, bevor es das ganze Budget bindet.",
        ),
      },
    ],
  },

  B1: {
    id: "d1-b1",
    title: t("Why should the business pay for UX?", "Warum sollte das Geschäft für UX zahlen?"),
    teaser: t("From what a learner experiences to the numbers a business watches.", "Von dem, was Lernende erleben, zu den Zahlen, die ein Unternehmen beobachtet."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "b1-ask",
        scene: t("At management level. LearnLoop's managing director asks why UX deserves money.", "Auf Managementebene. LearnLoops Geschäftsführerin fragt, warum UX Geld verdient."),
        speech: [
          { by: "md", text: t("Why should I pay for UX? What do I get?", "Warum soll ich für UX zahlen? Was bekomme ich?") },
          { by: "lena", text: t("Let me show you what UX does to the numbers you watch.", "Ich zeige Ihnen, was UX mit den Zahlen macht, die Sie beobachten.") },
        ],
        tag: { tone: "plain", text: t("UX is a business decision", "UX ist eine Geschäftsentscheidung") },
        means: t(
          "Argue a UX decision in the business's numbers: which of completion rate, retention or engagement does it move, and how do you expect to see it?",
          "Begründen Sie eine UX-Entscheidung in den Zahlen des Geschäfts: Welche von Completion Rate, Retention oder Engagement bewegt sie, und woran erwarten Sie es zu sehen?",
        ),
      },
      {
        art: "b1-chain",
        scene: t("Lena draws three chains, each from what a learner experiences to a number.", "Lena zeichnet drei Ketten, jede von dem, was Lernende erleben, bis zu einer Zahl."),
        speech: [{ by: "lena", text: t("A clear path: learners carry on, that is the completion rate. Lessons you can follow: they do more, that is engagement. Visible progress: they come back, that is retention.", "Ein klarer Pfad: Lernende machen weiter, das ist die Completion Rate. Lektionen, denen man folgen kann: sie tun mehr, das ist das Engagement. Sichtbarer Fortschritt: sie kommen wieder, das ist die Retention.") }],
        tag: { tone: "teal", text: t("Experience → behaviour → number", "Erlebnis → Verhalten → Zahl") },
        means: t(
          "Completion rate counts how many who start a course finish. Retention counts how many come back. Engagement counts how much learners do while they are there. UX moves each one through a link you can name.",
          "Die Completion Rate zählt, wie viele von denen, die einen Kurs beginnen, abschließen. Die Retention zählt, wie viele wiederkommen. Das Engagement zählt, wie viel Lernende tun, solange sie da sind. UX bewegt jede über einen Zusammenhang, den Sie benennen können.",
        ),
        look: t("each row, from left to right", "jede Zeile, von links nach rechts"),
      },
      {
        art: "b1-rival",
        scene: t("A competitor launches an easier platform.", "Ein Wettbewerber startet eine leichtere Plattform."),
        speech: [{ by: "md", text: t("Learners can switch, and so can the companies that pay for them.", "Lernende können wechseln, und die Unternehmen, die für sie zahlen, auch.") }],
        tag: { tone: "plain", text: t("A business risk, not a design detail", "Ein Geschäftsrisiko, kein Designdetail") },
        means: t(
          "A competitor with an easier platform is a business risk: the learners and the companies that pay for them can switch.",
          "Ein Wettbewerber mit einer leichteren Plattform ist ein Geschäftsrisiko: Die Lernenden und die Unternehmen, die für sie zahlen, können wechseln.",
        ),
      },
      {
        art: "b1-symptom",
        scene: t("The drop-out rate rises.", "Die Abbruchquote steigt."),
        speech: [
          { by: "md", text: t("Drop-out is up. So what is wrong?", "Die Abbrüche steigen. Was ist also falsch?") },
          { by: "lena", text: t("The number counts who left, not why. Until we know the cause, it is a symptom.", "Die Zahl zählt, wer gegangen ist, nicht warum. Solange wir die Ursache nicht kennen, ist sie ein Symptom.") },
        ],
        tag: { tone: "ink", text: t("A symptom, not a cause", "Ein Symptom, keine Ursache") },
        means: t(
          "A number such as a drop-out rate counts who left, not why. Treat it as a symptom until you know the cause, and check each link with your own data.",
          "Eine Zahl wie die Abbruchquote zählt, wer gegangen ist, nicht warum. Behandeln Sie sie als Symptom, bis Sie die Ursache kennen, und prüfen Sie jeden Zusammenhang mit Ihren eigenen Daten.",
        ),
        look: t("the rising line, and the question mark over its cause", "die steigende Linie und das Fragezeichen über ihrer Ursache"),
      },
    ],
  },

  B2: {
    id: "d1-b2",
    title: t("Growth against a usable platform", "Wachstum gegen eine nutzbare Plattform"),
    teaser: t("Three options pull in different directions, and how management decides.", "Drei Optionen ziehen in verschiedene Richtungen, und wie das Management entscheidet."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "b2-growth",
        scene: t("LearnLoop at management level. The managing director wants growth this year. Satisfaction is falling and the budget is limited.", "LearnLoop auf Managementebene. Die Geschäftsführerin will dieses Jahr Wachstum. Die Zufriedenheit sinkt, und das Budget ist begrenzt."),
        speech: [{ by: "md", text: t("We need more sign-ups. Let us buy more marketing.", "Wir brauchen mehr Anmeldungen. Kaufen wir mehr Marketing ein.") }],
        tag: { tone: "plain", text: t("Idea one serves a growth goal", "Idee eins dient einem Wachstumsziel") },
        means: t(
          "Three ideas come up, and each serves a different goal. More marketing serves the growth goal, because it brings new sign-ups quickly.",
          "Drei Ideen kommen auf, und jede dient einem anderen Ziel. Mehr Marketing dient dem Wachstumsziel, weil es schnell neue Anmeldungen bringt.",
        ),
      },
      {
        art: "b2-catch",
        scene: t("The new learners arrive.", "Die neuen Lernenden kommen."),
        speech: [{ by: "lena", text: t("They meet the same confusing platform, and many of them leave again.", "Sie treffen auf dieselbe verwirrende Plattform, und viele gehen wieder.") }],
        tag: { tone: "plain", text: t("The catch", "Der Haken") },
        means: t(
          "Part of the money is lost, and nothing has become better for the learners who were already there. The growth goal can only be reached if the user goal is reached as well.",
          "Ein Teil des Geldes ist verloren, und für die Lernenden, die schon da waren, ist nichts besser geworden. Das Wachstumsziel lässt sich nur erreichen, wenn auch das Nutzerziel erreicht wird.",
        ),
        look: t("arrows in, arrows out", "Pfeile hinein, Pfeile hinaus"),
      },
      {
        art: "b2-both",
        scene: t("The user team suggests another idea: simplify the navigation.", "Das Nutzerteam schlägt eine andere Idee vor: die Navigation vereinfachen."),
        speech: [{ by: "lena", text: t("It is a small change and we can undo it. Learners find their course more easily, and more of them finish.", "Es ist eine kleine Änderung, und wir können sie zurücknehmen. Lernende finden ihren Kurs leichter, und mehr von ihnen schließen ab.") }],
        tag: { tone: "teal", text: t("An option that serves both goals", "Eine Option, die beiden Zielen dient") },
        means: t(
          "It helps the business too, only more slowly. Compare adding more courses: it sounds like added value, but a longer catalogue makes the right course harder to find, so it serves a business goal and hurts the user goal.",
          "Sie hilft auch dem Geschäft, nur langsamer. Vergleichen Sie mehr Kurse: Das klingt nach Mehrwert, aber ein längerer Katalog macht das Finden des richtigen Kurses schwerer, es dient also einem Geschäftsziel und schadet dem Nutzerziel.",
        ),
      },
      {
        art: "b2-grid",
        scene: t("Management weighs the three options on user value, business value and risk.", "Das Management wägt die drei Optionen nach Nutzerwert, Geschäftswert und Risiko ab."),
        speech: [{ by: "md", text: t("Each option pulls a different way.", "Jede Option zieht in eine andere Richtung.") }],
        tag: { tone: "plain", text: t("Goals pull in different directions", "Ziele ziehen in verschiedene Richtungen") },
        means: t(
          "More courses: user value Low, risk Mid. Simplify the navigation: user value High, risk Low. Buy more marketing: user value Low, risk High, because new learners meet the same problems and leave. These ratings are a reading of the example company, not marks.",
          "Mehr Kurse: Nutzerwert Niedrig, Risiko Mittel. Navigation vereinfachen: Nutzerwert Hoch, Risiko Niedrig. Mehr Marketing: Nutzerwert Niedrig, Risiko Hoch, weil neue Lernende auf dieselben Probleme treffen und gehen. Diese Bewertungen sind eine Lesart des Beispielunternehmens, keine Noten.",
        ),
        look: t("the rows: the dots show Low, Mid or High", "die Zeilen: Die Punkte zeigen Niedrig, Mittel oder Hoch"),
      },
      {
        art: "b2-decide",
        scene: t("How should management decide?", "Wie soll das Management entscheiden?"),
        speech: [{ by: "lena", text: t("Name the conflict in one sentence, say what each side gets and loses, then decide. If the options are close, prefer the one we can undo cheaply while we learn.", "Den Konflikt in einem Satz benennen, sagen, was jede Seite bekommt und verliert, dann entscheiden. Liegen die Optionen nah beieinander, die bevorzugen, die wir günstig zurücknehmen können, während wir lernen.") }],
        tag: { tone: "ink", text: t("Name it, weigh it, then decide", "Benennen, abwägen, dann entscheiden") },
        means: t(
          "For example: quick growth against a platform that learners can actually use. A decision that gives each side something is not the same as one that serves nobody, so say what each gets and loses. Order decisions by what unlocks the others, usually a fix every learner meets before an extra.",
          "Zum Beispiel: schnelles Wachstum gegen eine Plattform, die Lernende wirklich nutzen können. Eine Entscheidung, die jeder Seite etwas gibt, ist nicht dasselbe wie eine, die niemand dient, sagen Sie also, was jede bekommt und verliert. Ordnen Sie Entscheidungen danach, was die anderen freischaltet, meist eine Lösung, auf die jede Lernende trifft, vor einem Extra.",
        ),
      },
    ],
  },

  B3: {
    id: "d1-b3",
    title: t("Deciding when you do not know enough", "Entscheiden, wenn man nicht genug weiß"),
    teaser: t("Four things a decision states, a premortem, and a rule for next time.", "Vier Dinge, die eine Entscheidung nennt, ein Premortem und eine Regel für das nächste Mal."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "b3-fog",
        scene: t("LearnLoop has to decide now, without the data it wants.", "LearnLoop muss jetzt entscheiden, ohne die gewünschten Daten."),
        speech: [
          { by: "md", text: t("Do we launch the guided first week, or wait for more data?", "Starten wir die geführte erste Woche, oder warten wir auf mehr Daten?") },
          { by: "lena", text: t("We do not know yet whether leavers lack direction or time.", "Wir wissen noch nicht, ob Abbrecher Orientierung oder Zeit vermissen.") },
        ],
        tag: { tone: "plain", text: t("Deciding without the data you want", "Entscheiden ohne die gewünschten Daten") },
        means: t(
          "When you must decide without complete data, a decision states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.",
          "Wenn Sie ohne vollständige Daten entscheiden müssen, nennt eine Entscheidung vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Zurücknehmen bringen würde und bis wann, und worauf Sie verzichten.",
        ),
      },
      {
        art: "b3-four",
        scene: t("Lena fills in four boxes.", "Lena füllt vier Kästen aus."),
        speech: [{ by: "lena", text: t("I decide: launch the guided first week. I do not know: direction or time. I reverse if week-one drop-out is not below 25% after six weeks, it is 30% now. I give up: the leaderboard this year.", "Ich entscheide: die geführte erste Woche starten. Ich weiß nicht: Orientierung oder Zeit. Ich nehme zurück, wenn die Abbruchquote der ersten Woche nach sechs Wochen nicht unter 25 % liegt, jetzt sind es 30 %. Ich verzichte auf: die Rangliste in diesem Jahr.") }],
        tag: { tone: "teal", text: t("The four parts of a decision", "Die vier Teile einer Entscheidung") },
        means: t(
          "A reversal condition can be checked when it has a figure and a time (“below 25% after six weeks”), not when it is a feeling (“if it does not work”). Giving up nothing means you have not decided, so name what you postpone.",
          "Eine Rückgängig-Bedingung ist prüfbar, wenn sie eine Zahl und eine Zeit hat („unter 25 % nach sechs Wochen“), nicht wenn sie ein Gefühl ist („wenn es nicht klappt“). Nichts aufzugeben heißt, nicht entschieden zu haben, nennen Sie also, was Sie verschieben.",
        ),
        look: t("the red box: what is given up", "der rote Kasten: worauf verzichtet wird"),
      },
      {
        art: "b3-pre",
        scene: t("Before the money is spent.", "Bevor das Geld ausgegeben wird."),
        speech: [{ by: "lena", text: t("Imagine it is six weeks from now and the plan has failed. Why did it fail?", "Stellen Sie sich vor, es ist sechs Wochen später und der Plan ist gescheitert. Warum?") }],
        tag: { tone: "plain", text: t("A premortem", "Ein Premortem") },
        means: t(
          "A premortem (Klein 2007) brings risks to the surface before the money is spent: imagine the plan has failed and ask why. It is a cheap way to find what could go wrong.",
          "Ein Premortem (Klein 2007) bringt Risiken ans Licht, bevor das Geld ausgegeben ist: Stellen Sie sich vor, der Plan ist gescheitert, und fragen Sie warum. Es ist ein günstiger Weg, zu finden, was schiefgehen könnte.",
        ),
      },
      {
        art: "b3-rule",
        scene: t("Lena adds a rule for future decisions.", "Lena ergänzt eine Regel für künftige Entscheidungen."),
        speech: [{ by: "lena", text: t("Who decides? The UX lead with the product owner. On what evidence? Interviews, a usability test and drop-out data.", "Wer entscheidet? Der UX Lead mit dem Product Owner. Auf welcher Grundlage? Interviews, ein Usability-Test und Abbruchdaten.") }],
        tag: { tone: "ink", text: t("A rule, not one person's taste", "Eine Regel, nicht der Geschmack einer Person") },
        means: t(
          "A rule for future UX decisions names who decides and what evidence they need, so that a decision does not rest on one person's taste. As the plan's coaching says, UX is not a design problem but a decision problem.",
          "Eine Regel für künftige UX-Entscheidungen nennt, wer entscheidet und welche Belege nötig sind, damit eine Entscheidung nicht auf dem Geschmack einer Person ruht. Wie das Coaching des Plans sagt: UX ist kein Designproblem, sondern ein Entscheidungsproblem.",
        ),
      },
    ],
  },
}) as Record<MaterialId, Comic>;
