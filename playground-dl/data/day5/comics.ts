import { bi, t } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/day5/materials";

/**
 * Day 5 · the story comics in pixel art (DL-STANDARD.md section 13). One per study card: the card's own material told as a short story with the people
 * the card already uses (Mia, LearnLoop's UX lead and product manager), so it is the card said again in pictures, not a new case. Every figure comes from
 * the card or its diagram. The comic replaces the card's "Walk me through it" story. Speech and captions are HTML in ComicModal; the drawings are in
 * components/day5/comicScenes.tsx.
 */
const NOTE = t(
  "Mia, Priya, Dana, the finance director and LearnLoop are made up for this lesson, like the examples on the card: a Case assumption. LearnBase, the case of the task, is in the task.",
  "Mia, Priya, Dana, die Finanzchefin und LearnLoop sind für diese Lektion erfunden, wie die Beispiele auf der Karte: eine Fallannahme. LearnBase, der Fall der Aufgabe, steht in der Aufgabe.",
);
const NAMES = {
  mia: t("Mia, project manager", "Mia, Projektmanagerin"),
  priya: t("Priya, UX lead", "Priya, UX-Leiterin"),
  dana: t("Dana, head of product", "Dana, Leiterin Produkt"),
  fin: t("Finance director", "Finanzchefin"),
  learner: t("A learner", "Eine Lernende"),
  narrator: t("Narrator", "Erzähler"),
};

export const COMICS_D5 = bi({
  A1: {
    id: "d5-a1",
    pixel: true,
    title: t("A menu that follows the software, and one that follows Mia", "Ein Menü, das der Software folgt, und eines, das Mia folgt"),
    teaser: t("Mia wants to carry on with her course.", "Mia will mit ihrem Kurs weitermachen."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a1-1",
        scene: t("LearnLoop's platform has grown for years. Every time a department asked for something, a new menu entry appeared, named after the software module behind it. Mia, a project manager, wants to carry on with her negotiation course.", "Die Plattform von LearnLoop ist über Jahre gewachsen. Jedes Mal, wenn eine Abteilung etwas wollte, kam ein neuer Menüeintrag dazu, benannt nach dem Software-Modul dahinter. Mia, eine Projektmanagerin, will mit ihrem Verhandlungskurs weitermachen."),
        speech: [{ by: "mia", think: true, text: t("Which of these entries carries on my course? I cannot tell.", "Welcher dieser Einträge setzt meinen Kurs fort? Ich kann es nicht sagen.") }],
        tag: { tone: "plain", text: t("A MENU THAT FOLLOWS THE ORGANISATION", "EIN MENÜ, DAS DER ORGANISATION FOLGT") },
        means: t(
          "A feature-driven platform decides what to build from what the software could do, or from what a department asked for. The learner has to translate.",
          "Eine funktionsgetriebene Plattform entscheidet, was sie baut, nach dem, was die Software kann, oder was eine Abteilung wollte. Die Lernende muss übersetzen.",
        ),
      },
      {
        art: "a1-2",
        scene: t("Then LearnLoop asks a different question: what are learners trying to do? The answers are few: carry on, see my courses, find a course, see my progress. The menu is rebuilt around them.", "Dann stellt LearnLoop eine andere Frage: Was wollen Lernende tun? Die Antworten sind wenige: weitermachen, meine Kurse sehen, einen Kurs finden, meinen Fortschritt sehen. Das Menü wird um sie herum neu gebaut."),
        speech: [{ by: "mia", text: t("A big card says Continue. I see my course at once and start it in one click.", "Eine große Karte sagt „Weiter“. Ich sehe meinen Kurs sofort und starte ihn mit einem Klick.") }],
        tag: { tone: "teal", text: t("A MENU THAT FOLLOWS HER TASKS", "EIN MENÜ, DAS IHREN AUFGABEN FOLGT") },
        means: t(
          "A user-driven platform decides from what learners need to do.",
          "Eine nutzergetriebene Plattform entscheidet nach dem, was Lernende tun müssen.",
        ),
        look: t("the big yellow Continue card", "die große gelbe Karte „Weiter“"),
      },
      {
        art: "a1-3",
        scene: t("Both versions have the same functions behind them. What differs is what decided the screen.", "Beide Versionen haben dieselben Funktionen dahinter. Der Unterschied ist, was den Bildschirm entschieden hat."),
        speech: [{ by: "priya", text: t("In the first, what the software could do and what departments asked for. In the second, what learners need to do.", "Im ersten, was die Software konnte und was Abteilungen wollten. Im zweiten, was Lernende tun müssen.") }],
        tag: { tone: "plain", text: t("FEATURE-DRIVEN · USER-CENTRED", "FUNKTIONSGETRIEBEN · NUTZERZENTRIERT") },
        means: t(
          "That is the difference between feature-driven and user-centred. UX is the bridge between what learners need and the business model of the company.",
          "Das ist der Unterschied zwischen funktionsgetrieben und nutzerzentriert. UX ist die Brücke zwischen dem, was Lernende brauchen, und dem Geschäftsmodell des Unternehmens.",
        ),
      },
      {
        art: "a1-4",
        scene: t("Priya gives the team one question to ask of any screen.", "Priya gibt dem Team eine Frage, die man an jeden Bildschirm stellt."),
        speech: [{ by: "priya", text: t("What is the learner trying to do here?", "Was versucht die Lernende hier zu tun?") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Task 1 describes a platform with many functions and little use. Block 1.1 asks you to look at it through the learner's eyes, and Block 2.1 asks what is wrong with deciding by features.",
          "Task 1 beschreibt eine Plattform mit vielen Funktionen und wenig Nutzung. Block 1.1 verlangt, sie mit den Augen der Lernenden anzusehen, und Block 2.1 fragt, was daran falsch ist, nach Funktionen zu entscheiden.",
        ),
      },
    ],
  },

  A2: {
    id: "d5-a2",
    pixel: true,
    title: t("The same learner, four situations", "Dieselbe Lernende, vier Situationen"),
    teaser: t("What learners expect, and where they learn.", "Was Lernende erwarten und wo sie lernen."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a2-1",
        scene: t("First, what learners expect. Priya shows the Kano model: three kinds of quality.", "Zuerst, was Lernende erwarten. Priya zeigt das Kano-Modell: drei Arten von Qualität."),
        speech: [{ by: "priya", text: t("A basic that is missing makes people unhappy, and one that works goes unnoticed. Speed pays off in proportion. A pleasant surprise is not missed when absent.", "Ein fehlendes Basiselement macht Menschen unglücklich, und ein funktionierendes bleibt unbemerkt. Geschwindigkeit zahlt sich proportional aus. Eine angenehme Überraschung wird nicht vermisst, wenn sie fehlt.") }],
        tag: { tone: "plain", text: t("BASIC · SPEED · SURPRISE", "BASIS · GESCHWINDIGKEIT · ÜBERRASCHUNG") },
        means: t(
          "Kano and colleagues (1984) described three kinds of quality. More features cannot rescue a weak basic.",
          "Kano und Kollegen (1984) beschrieben drei Arten von Qualität. Mehr Funktionen können ein schwaches Basiselement nicht retten.",
        ),
        look: t("the red curve never rises above zero for a basic", "die rote Kurve steigt bei einem Basiselement nie über null"),
      },
      {
        art: "a2-2",
        scene: t("Now where they learn. Mia on a train, with one hand, a short stretch of time and a poor connection.", "Nun, wo sie lernen. Mia im Zug, mit einer Hand, wenig Zeit und schlechter Verbindung."),
        speech: [{ by: "mia", text: t("Short units, large targets, and my progress saved at once, please.", "Kurze Einheiten, große Schaltflächen und mein Fortschritt sofort gespeichert, bitte.") }],
        tag: { tone: "plain", text: t("CONTEXT 1 · ON A PHONE, ON A TRAIN", "KONTEXT 1 · AUF DEM HANDY, IM ZUG") },
        means: t(
          "The situation is the context of use. On a phone the design must allow short units, large targets and progress saved at once.",
          "Die Situation ist der Nutzungskontext. Auf dem Handy muss das Design kurze Einheiten, große Schaltflächen und sofort gespeicherten Fortschritt erlauben.",
        ),
      },
      {
        art: "a2-3",
        scene: t("The next day Mia is at her desk between two meetings, with ten minutes and a head full of other things.", "Am nächsten Tag sitzt Mia zwischen zwei Terminen am Schreibtisch, mit zehn Minuten und dem Kopf voller anderer Dinge."),
        speech: [{ by: "mia", text: t("Show me where I stopped. And let a unit end anywhere.", "Zeigen Sie mir, wo ich aufgehört habe. Und lassen Sie eine Einheit überall enden.") }],
        tag: { tone: "plain", text: t("CONTEXT 2 · AT A DESK", "KONTEXT 2 · AM SCHREIBTISCH") },
        means: t(
          "Here the design needs a clear way to resume, and units that can end anywhere. A goal such as “carry on with my course” looks different in each context.",
          "Hier braucht das Design einen klaren Weg zum Weitermachen und Einheiten, die überall enden können. Ein Ziel wie „meinen Kurs fortsetzen“ sieht in jedem Kontext anders aus.",
        ),
      },
      {
        art: "a2-4",
        scene: t("Two more situations: an intensive weekend of hours at a stretch, and a mandatory course with a deadline.", "Zwei weitere Situationen: ein intensives Wochenende mit Stunden am Stück und ein Pflichtkurs mit Frist."),
        speech: [{ by: "priya", text: t("For the weekend: an overview of the whole path, room for breaks, a sign of how far you have come. For the mandatory course: show the path and the deadline, and do not assume motivation.", "Fürs Wochenende: ein Überblick über den ganzen Pfad, Raum für Pausen, ein Zeichen, wie weit man gekommen ist. Für den Pflichtkurs: Pfad und Frist zeigen und Motivation nicht voraussetzen.") }],
        tag: { tone: "plain", text: t("CONTEXTS 3 AND 4", "KONTEXTE 3 UND 4") },
        means: t(
          "The same learner can be in any of these on different days. A good design works in all of them.",
          "Dieselbe Lernende kann an verschiedenen Tagen in jeder davon sein. Ein gutes Design funktioniert in allen.",
        ),
      },
      {
        art: "a2-5",
        scene: t("Priya sums up what to know about users.", "Priya fasst zusammen, was man über Nutzer wissen muss."),
        speech: [{ by: "priya", text: t("Who the users are, what they want and expect, and in what situation they use the platform.", "Wer die Nutzer sind, was sie wollen und erwarten und in welcher Situation sie die Plattform nutzen.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Block 1.1 asks you to put yourself into a learner's position and write their goals and frustrations. The contexts give you the situations to think of.",
          "Block 1.1 verlangt, sich in die Lage einer Lernenden zu versetzen und ihre Ziele und Frustrationen zu schreiben. Die Kontexte geben Ihnen die Situationen, an die Sie denken können.",
        ),
      },
    ],
  },

  A3: {
    id: "d5-a3",
    pixel: true,
    title: t("Three mistakes, three repairs", "Drei Fehler, drei Reparaturen"),
    teaser: t("Mia looks for lesson 3 and gives up after a minute.", "Mia sucht Lektion 3 und gibt nach einer Minute auf."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a3-1",
        scene: t("Mia opens a platform at LearnLoop to find lesson 3 of her negotiation course. The menu is named after software, ten entries compete for her eyes, and the page says only “Library”.", "Mia öffnet eine Plattform bei LearnLoop, um Lektion 3 ihres Verhandlungskurses zu finden. Das Menü ist nach Software benannt, zehn Einträge konkurrieren um ihre Augen, und die Seite sagt nur „Library“."),
        speech: [{ by: "mia", think: true, text: t("What do these entries mean? Where do I start? Where am I? I give up.", "Was bedeuten diese Einträge? Wo fange ich an? Wo bin ich? Ich gebe auf.") }],
        tag: { tone: "plain", text: t("ALL THREE MISTAKES", "ALLE DREI FEHLER") },
        means: t(
          "The platform talks about its functions instead of what the learner can do. The interface is overly complex, with too many choices at once. Orientation and structure are missing.",
          "Die Plattform spricht über ihre Funktionen statt darüber, was die Lernende tun kann. Die Oberfläche ist übermäßig komplex, mit zu vielen Auswahlmöglichkeiten auf einmal. Orientierung und Struktur fehlen.",
        ),
      },
      {
        art: "a3-2",
        scene: t("The first repair: the entries are renamed after what Mia wants to do, such as “My courses” and “Find a course”.", "Die erste Reparatur: Die Einträge werden nach dem benannt, was Mia tun will, etwa „Meine Kurse“ und „Kurs finden“."),
        speech: [{ by: "mia", text: t("Now I understand the menu. But ten entries are still too many, and I still do not know where I am.", "Jetzt verstehe ich das Menü. Aber zehn Einträge sind immer noch zu viele, und ich weiß immer noch nicht, wo ich bin.") }],
        tag: { tone: "teal", text: t("REPAIR 1 · THE LEARNER'S WORDS", "REPARATUR 1 · DIE WORTE DER LERNENDEN") },
        means: t(
          "One mistake is fixed, and two remain.",
          "Ein Fehler ist behoben, und zwei bleiben.",
        ),
      },
      {
        art: "a3-3",
        scene: t("The second repair: only the three tasks learners really use stay on the screen.", "Die zweite Reparatur: Nur die drei Aufgaben, die Lernende wirklich nutzen, bleiben auf dem Bildschirm."),
        speech: [{ by: "mia", text: t("Three things to choose from instead of ten. I read the whole menu in a second.", "Drei Dinge zur Auswahl statt zehn. Ich lese das ganze Menü in einer Sekunde.") }],
        tag: { tone: "teal", text: t("REPAIR 2 · FEWER CHOICES AT ONCE", "REPARATUR 2 · WENIGER AUSWAHL AUF EINMAL") },
        means: t(
          "The page title still says only “Library”, so one mistake remains.",
          "Der Seitentitel sagt immer noch nur „Library“, ein Fehler bleibt also.",
        ),
      },
      {
        art: "a3-4",
        scene: t("The third repair: a path says “Home › My courses › Negotiation”, and a card at the top says “Resume your lesson, unit 3 of 8”.", "Die dritte Reparatur: Ein Pfad sagt „Start › Meine Kurse › Verhandlung“, und eine Karte oben sagt „Lektion fortsetzen, Einheit 3 von 8“."),
        speech: [{ by: "mia", text: t("I know where I am and what to do next. I start at once.", "Ich weiß, wo ich bin und was ich als Nächstes tue. Ich fange sofort an.") }],
        tag: { tone: "teal", text: t("REPAIR 3 · ORIENTATION AND STRUCTURE", "REPARATUR 3 · ORIENTIERUNG UND STRUKTUR") },
        means: t(
          "All three mistakes are gone, and the functions behind the screen are the same.",
          "Alle drei Fehler sind behoben, und die Funktionen hinter dem Bildschirm sind dieselben.",
        ),
        look: t("the path at the top and the yellow resume card", "der Pfad oben und die gelbe Fortsetzen-Karte"),
      },
      {
        art: "a3-5",
        scene: t("Priya names the three areas.", "Priya nennt die drei Bereiche."),
        speech: [{ by: "priya", text: t("Words, too many choices, no orientation. Each problem on a screen is one of these three.", "Wortwahl, zu viele Auswahlmöglichkeiten, keine Orientierung. Jedes Problem auf einem Bildschirm ist eines dieser drei.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "These are the three areas Block 1.1 sorts the facts into. Each fact in the task is one of these mistakes.",
          "Das sind die drei Bereiche, in die Block 1.1 die Fakten sortiert. Jeder Fakt in der Aufgabe ist einer dieser Fehler.",
        ),
      },
    ],
  },

  A4: {
    id: "d5-a4",
    pixel: true,
    title: t("Reasons from a few, counts from many", "Gründe von wenigen, Zahlen von vielen"),
    teaser: t("Learners leave in the first week, and nobody knows why.", "Lernende gehen in der ersten Woche, und niemand weiß, warum."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a4-1",
        scene: t("Learners leave in the first week at LearnLoop, and nobody knows why. Dana first interviews six of them.", "Lernende gehen bei LearnLoop in der ersten Woche, und niemand weiß, warum. Dana interviewt zuerst sechs von ihnen."),
        speech: [{ by: "dana", text: t("They tell me what confused them, in their own words. But six people are few, and they only say what they can put into words.", "Sie sagen mir, was sie verwirrt hat, in ihren eigenen Worten. Aber sechs Menschen sind wenige, und sie sagen nur, was sie in Worte fassen können.") }],
        tag: { tone: "plain", text: t("INTERVIEWS · REASONS FROM A FEW", "INTERVIEWS · GRÜNDE VON WENIGEN") },
        means: t(
          "Interviews and surveys show what people say. Small studies give reasons, which the platform's numbers cannot say.",
          "Interviews und Umfragen zeigen, was Menschen sagen. Kleine Studien liefern Gründe, die die Zahlen der Plattform nicht sagen können.",
        ),
        look: t("point A, bottom left", "Punkt A, unten links"),
      },
      {
        art: "a4-2",
        scene: t("Next she reads the usage analytics for all learners.", "Als Nächstes liest sie die Nutzungs-Analytics aller Lernenden."),
        speech: [{ by: "dana", text: t("Exactly how many open lesson 1 and how many reach lesson 3: thousands at once. But numbers show what happened, not why.", "Genau, wie viele Lektion 1 öffnen und wie viele Lektion 3 erreichen: Tausende auf einmal. Aber Zahlen zeigen, was passiert ist, nicht warum.") }],
        tag: { tone: "plain", text: t("ANALYTICS · COUNTS FROM MANY", "ANALYTICS · ZAHLEN VON VIELEN") },
        means: t(
          "Usability tests, observation and analytics show what people do. Large studies give counts. The two methods answer different questions and fill each other's gaps.",
          "Usability-Tests, Beobachtung und Analytics zeigen, was Menschen tun. Große Studien liefern Zahlen. Die beiden Methoden beantworten verschiedene Fragen und füllen gegenseitig ihre Lücken.",
        ),
        look: t("point D, top right", "Punkt D, oben rechts"),
      },
      {
        art: "a4-3",
        scene: t("A usability test sits in between: a few people try a task while she watches.", "Ein Usability-Test liegt dazwischen: Wenige Menschen probieren eine Aufgabe, während sie zusieht."),
        speech: [{ by: "dana", text: t("I see where they hesitate and click wrongly, and I can ask why.", "Ich sehe, wo sie zögern und falsch klicken, und ich kann fragen, warum.") }],
        tag: { tone: "teal", text: t("USABILITY TEST · WHAT PEOPLE DO, WITH A CHANCE TO ASK WHY", "USABILITY-TEST · WAS MENSCHEN TUN, MIT DER CHANCE ZU FRAGEN, WARUM") },
        means: t(
          "The positions on the picture are a reading of these methods, not a ranking.",
          "Die Positionen im Bild sind eine Lesart dieser Methoden, keine Rangliste.",
        ),
        look: t("point C, bottom right", "Punkt C, unten rechts"),
      },
      {
        art: "a4-4",
        scene: t("Dana sums it up for the team.", "Dana fasst es für das Team zusammen."),
        speech: [{ by: "dana", text: t("Choose a method by the gap you have to close: reasons need a few people and their words, counts need many people and their behaviour.", "Wählen Sie eine Methode nach der Lücke, die Sie schließen müssen: Gründe brauchen wenige Menschen und ihre Worte, Zahlen brauchen viele Menschen und ihr Verhalten.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "The plan's Level 3 task asks you to decide without complete user data, so you need to know which method would close which gap. Block 3.1 is where you decide.",
          "Die Level-3-Aufgabe des Plans verlangt, ohne vollständige Nutzerdaten zu entscheiden, Sie müssen also wissen, welche Methode welche Lücke schließen würde. In Block 3.1 entscheiden Sie.",
        ),
      },
    ],
  },

  A5: {
    id: "d5-a5",
    pixel: true,
    title: t("Three ideas, three ratings, one sentence for the business", "Drei Ideen, drei Bewertungen, ein Satz fürs Unternehmen"),
    teaser: t("LearnLoop has €50,000, and learners find their course with difficulty.", "LearnLoop hat 50.000 €, und Lernende finden ihren Kurs nur mit Mühe."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a5-1",
        scene: t("Learners find their course with difficulty. LearnLoop has a budget of €50,000 and three ideas on the table.", "Lernende finden ihren Kurs nur mit Mühe. LearnLoop hat ein Budget von 50.000 € und drei Ideen auf dem Tisch."),
        speech: [{ by: "priya", text: t("We rate each idea on user value, effort and risk. The effort rule: under €10,000 is Low, up to €20,000 is Mid, above that is High.", "Wir bewerten jede Idee nach Nutzerwert, Aufwand und Risiko. Die Aufwandsregel: unter 10.000 € ist Niedrig, bis 20.000 € Mittel, darüber Hoch.") }],
        tag: { tone: "plain", text: t("3 IDEAS · 3 QUESTIONS", "3 IDEEN · 3 FRAGEN") },
        means: t(
          "User value asks how much it helps learners reach their goal. Effort is money and time, decided here by the rule. Risk asks what could go wrong or be lost.",
          "Nutzerwert fragt, wie sehr es Lernenden hilft, ihr Ziel zu erreichen. Aufwand ist Geld und Zeit, hier von der Regel entschieden. Risiko fragt, was schiefgehen oder verloren gehen kann.",
        ),
      },
      {
        art: "a5-2",
        scene: t("Idea 1: a chat window. It costs €24,000.", "Idee 1: ein Chat-Fenster. Es kostet 24.000 €."),
        speech: [{ by: "priya", think: true, text: t("€24,000 is above €20,000: effort High. It helps a few learners who are already stuck, but only if they find it on a crowded screen. And someone must answer every day.", "24.000 € liegen über 20.000 €: Aufwand Hoch. Es hilft einigen Lernenden, die schon feststecken, aber nur, wenn sie es auf einem vollen Bildschirm finden. Und jemand muss jeden Tag antworten.") }],
        tag: { tone: "plain", text: t("VALUE MID · EFFORT HIGH · RISK MID", "WERT MITTEL · AUFWAND HOCH · RISIKO MITTEL") },
        means: t(
          "A chat nobody answers is worse than none, so the risk is Mid.",
          "Ein Chat, den niemand beantwortet, ist schlechter als keiner, das Risiko ist also Mittel.",
        ),
      },
      {
        art: "a5-3",
        scene: t("Idea 3: ten new courses. They cost €32,000.", "Idee 3: zehn neue Kurse. Sie kosten 32.000 €."),
        speech: [{ by: "priya", think: true, text: t("Also effort High. And more to choose from makes finding the right course harder, not easier.", "Ebenfalls Aufwand Hoch. Und mehr Auswahl macht das Finden des richtigen Kurses schwerer, nicht leichter.") }],
        tag: { tone: "plain", text: t("VALUE LOW · EFFORT HIGH · RISK HIGH", "WERT NIEDRIG · AUFWAND HOCH · RISIKO HOCH") },
        means: t(
          "Most of the budget goes into content before the finding problem is solved, so the risk is High.",
          "Der größte Teil des Budgets geht in Inhalt, bevor das Problem des Findens gelöst ist, das Risiko ist also Hoch.",
        ),
      },
      {
        art: "a5-4",
        scene: t("Idea 2: rebuild the menu around the three tasks learners have. It costs €12,000.", "Idee 2: das Menü um die drei Aufgaben der Lernenden herum neu bauen. Es kostet 12.000 €."),
        speech: [{ by: "priya", text: t("€12,000 lies between €10,000 and €20,000: effort Mid. It answers the very trouble learners have, takes nothing away, and can be adjusted after a test.", "12.000 € liegen zwischen 10.000 € und 20.000 €: Aufwand Mittel. Es beantwortet genau die Schwierigkeit der Lernenden, nimmt nichts weg und lässt sich nach einem Test anpassen.") }],
        tag: { tone: "teal", text: t("VALUE HIGH · EFFORT MID · RISK LOW", "WERT HOCH · AUFWAND MITTEL · RISIKO NIEDRIG") },
        means: t(
          "The idea with the highest user value, the lowest risk and an effort the budget allows comes first, even though a chat sounds modern.",
          "Die Idee mit dem höchsten Nutzerwert, dem niedrigsten Risiko und einem Aufwand, den das Budget erlaubt, kommt zuerst, auch wenn ein Chat modern klingt.",
        ),
      },
      {
        art: "a5-5",
        scene: t("Dana asks the fourth question that management weighs: what do we gain?", "Dana stellt die vierte Frage, die das Management abwägt: Was gewinnen wir?"),
        speech: [{ by: "dana", text: t("Fewer first-week drop-outs. That is slower than a new feature, but it lasts.", "Weniger Abbrüche in der ersten Woche. Das ist langsamer als ein neues Feature, aber es hält.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Rate each measure on the same three questions and add one sentence on what the business gets. Block 1.2 asks you to weigh user-centredness against business goals this way.",
          "Bewerten Sie jede Maßnahme mit denselben drei Fragen und ergänzen Sie einen Satz dazu, was das Unternehmen davon hat. Block 1.2 verlangt, so Nutzerzentrierung gegen Geschäftsziele abzuwägen.",
        ),
      },
    ],
  },

  B1: {
    id: "d5-b1",
    pixel: true,
    title: t("A need nobody pays for, and one they do", "Ein Bedürfnis, für das niemand zahlt, und eines, für das man zahlt"),
    teaser: t("Priya asks the finance director for money to rebuild the home screen.", "Priya bittet die Finanzchefin um Geld, um den Startbildschirm umzubauen."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "b1-1",
        scene: t("The UX lead wants money to rebuild the home screen. She tells the finance director: “Learners want to know what to do next.”", "Die UX-Leiterin will Geld, um den Startbildschirm umzubauen. Sie sagt der Finanzchefin: „Lernende wollen wissen, was sie als Nächstes tun.“"),
        speech: [{ by: "fin", text: t("That is true, but it names no number the company watches. The request is refused.", "Das stimmt, aber es nennt keine Zahl, die das Unternehmen beobachtet. Die Anfrage ist abgelehnt.") }],
        tag: { tone: "plain", text: t("A NEED ON ITS OWN", "EIN BEDÜRFNIS ALLEIN") },
        means: t(
          "A need that names no figure gives a finance director nothing to weigh.",
          "Ein Bedürfnis, das keine Zahl nennt, gibt einer Finanzchefin nichts zum Abwägen.",
        ),
      },
      {
        art: "b1-2",
        scene: t("Priya tries again, in three parts: who it is, what they want to do, and what the company gets.", "Priya versucht es noch einmal, in drei Teilen: wer es ist, was sie tun wollen und was das Unternehmen davon hat."),
        speech: [{ by: "priya", text: t("A learner who returns after three days wants to carry on without searching. We add a Continue card, and the share of learners who return within seven days should rise.", "Eine Lernende, die nach drei Tagen zurückkehrt, will weitermachen, ohne zu suchen. Wir ergänzen eine Karte „Weiter“, und der Anteil der Lernenden, die innerhalb von sieben Tagen zurückkehren, sollte steigen.") }],
        tag: { tone: "teal", text: t("WHO · WHAT THEY WANT · WHAT THE COMPANY GETS", "WER · WAS SIE WOLLEN · WAS DAS UNTERNEHMEN DAVON HAT") },
        means: t(
          "Say every need as who, what they want to do, and what the company gets, and name the figure it moves.",
          "Sagen Sie jedes Bedürfnis als wer, was sie tun wollen und was das Unternehmen davon hat, und nennen Sie die Zahl, die es bewegt.",
        ),
      },
      {
        art: "b1-3",
        scene: t("Now the finance director hears a figure she already tracks.", "Jetzt hört die Finanzchefin eine Zahl, die sie schon verfolgt."),
        speech: [{ by: "fin", text: t("The seven-day return rate. Approved.", "Die Rückkehrrate nach sieben Tagen. Genehmigt.") }],
        tag: { tone: "teal", text: t("A FIGURE THE COMPANY WATCHES · APPROVED", "EINE ZAHL, DIE DAS UNTERNEHMEN BEOBACHTET · GENEHMIGT") },
        means: t(
          "UX influences engagement, learning success and the drop-out rate, and so the numbers the business watches.",
          "UX beeinflusst Engagement, Lernerfolg und die Abbruchquote und damit die Zahlen, die das Unternehmen beobachtet.",
        ),
      },
      {
        art: "b1-4",
        scene: t("Priya sums it up for the team.", "Priya fasst es für das Team zusammen."),
        speech: [{ by: "priya", text: t("UX is the translation between what the learner needs and what the company earns from.", "UX ist die Übersetzung zwischen dem, was die Lernende braucht, und dem, womit das Unternehmen verdient.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Block 3.1 asks you to define the central user needs and to analyse the conflict of user against business. To do it you must be able to say each need in business terms.",
          "Block 3.1 verlangt, die zentralen Nutzerbedürfnisse zu definieren und den Konflikt von Nutzer gegen Unternehmen zu analysieren. Dazu müssen Sie jedes Bedürfnis in Geschäftssprache sagen können.",
        ),
      },
    ],
  },

  B2: {
    id: "d5-b2",
    pixel: true,
    title: t("Who gets, who pays", "Wer bekommt, wer zahlt"),
    teaser: t("Three groups at LearnLoop want different things.", "Drei Gruppen bei LearnLoop wollen Verschiedenes."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "b2-1",
        scene: t("Three groups want different things: learners want to find and finish, the business wants growth and low cost, and the engineers want a system they can keep running. The sales team asks for a new feature.", "Drei Gruppen wollen Verschiedenes: Lernende wollen finden und abschließen, das Unternehmen will Wachstum und niedrige Kosten, und die Ingenieure wollen ein System, das sie am Laufen halten können. Das Vertriebsteam bittet um ein neues Feature."),
        speech: [{ by: "priya", think: true, text: t("It serves the business, and it costs the engineers years of upkeep and the learners a fuller screen. One goal wins, and the others pay.", "Es dient dem Unternehmen und kostet die Ingenieure Jahre an Pflege und die Lernenden einen volleren Bildschirm. Ein Ziel gewinnt, und die anderen zahlen.") }],
        tag: { tone: "plain", text: t("ONE GOAL WINS, TWO LOSE", "EIN ZIEL GEWINNT, ZWEI VERLIEREN") },
        means: t(
          "The plan's conflict for Day 5 is user against business against technology.",
          "Der Konflikt des Plans für Tag 5 lautet Nutzer gegen Unternehmen gegen Technik.",
        ),
        look: t("the gold marker sits in the business circle only", "die goldene Markierung liegt nur im Kreis des Unternehmens"),
      },
      {
        art: "b2-2",
        scene: t("A better case is simplifying the menu.", "Ein besserer Fall ist, das Menü zu vereinfachen."),
        speech: [{ by: "priya", text: t("Learners get a menu they can read, and the business gets fewer drop-outs later. The cost is small and falls on the engineers once, plus one department that liked its entry.", "Lernende bekommen ein Menü, das sie lesen können, und das Unternehmen hat später weniger Abbrüche. Die Kosten sind klein und fallen einmal bei den Ingenieuren an, dazu bei einer Abteilung, die ihren Eintrag mochte.") }],
        tag: { tone: "plain", text: t("TWO GOALS AGREE", "ZWEI ZIELE STIMMEN ÜBEREIN") },
        means: t(
          "A good UX decision looks for such overlaps and says plainly what the one who loses gives up.",
          "Eine gute UX-Entscheidung sucht solche Überschneidungen und sagt klar, worauf der Verlierende verzichtet.",
        ),
        look: t("the marker sits where learners and business overlap", "die Markierung liegt dort, wo sich Lernende und Unternehmen überschneiden"),
      },
      {
        art: "b2-3",
        scene: t("Best is a decision where all three agree: a Continue card on the home screen.", "Am besten ist eine Entscheidung, bei der alle drei übereinstimmen: eine Karte „Weiter“ auf dem Startbildschirm."),
        speech: [{ by: "priya", text: t("Learners reach the next step in one click, the business gets more learners who finish, and the data already exists, so the engineers pay little.", "Lernende erreichen den nächsten Schritt mit einem Klick, das Unternehmen bekommt mehr Lernende, die abschließen, und die Daten gibt es schon, die Ingenieure zahlen also wenig.") }],
        tag: { tone: "teal", text: t("ALL THREE AGREE · AIM HERE", "ALLE DREI STIMMEN ÜBEREIN · ZIEL HIER") },
        means: t(
          "A good UX decision aims for the overlap, and when none exists, says which goal wins and what the others lose.",
          "Eine gute UX-Entscheidung zielt auf die Überschneidung und sagt, wenn es keine gibt, welches Ziel gewinnt und was die anderen verlieren.",
        ),
        look: t("the marker in the middle", "die Markierung in der Mitte"),
      },
      {
        art: "b2-4",
        scene: t("Dana asks three questions of every conflict.", "Dana stellt zu jedem Konflikt drei Fragen."),
        speech: [{ by: "dana", text: t("Who gets? Who pays? Is there an overlap?", "Wer bekommt? Wer zahlt? Gibt es eine Überschneidung?") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Block 3.1 asks for a conflict analysis of user against business and a prioritised roadmap. The rules of this card tell you how to argue each choice.",
          "Block 3.1 verlangt eine Konfliktanalyse von Nutzer gegen Unternehmen und eine priorisierte Roadmap. Die Regeln dieser Karte sagen Ihnen, wie Sie jede Wahl begründen.",
        ),
      },
    ],
  },

  B3: {
    id: "d5-b3",
    pixel: true,
    title: t("A gate for features, and a decision with unknowns", "Ein Tor für Features und eine Entscheidung mit Unbekanntem"),
    teaser: t("A manager wants Live Polls because a competitor has them.", "Eine Managerin will Live Polls, weil ein Wettbewerber sie hat."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "b3-1",
        scene: t("A manager asks for a new feature, “Live Polls”, because a competitor has one. The request names no learner problem, no figure it should move and no person who is responsible.", "Eine Managerin bittet um ein neues Feature, „Live Polls“, weil ein Wettbewerber eines hat. Die Anfrage nennt kein Lernendenproblem, keine Zahl, die sie bewegen soll, und keine verantwortliche Person."),
        speech: [{ by: "dana", text: t("At the gate it stops. Come back with the three things.", "Am Tor stoppt sie. Kommen Sie mit den drei Dingen zurück.") }],
        tag: { tone: "plain", text: t("A REQUEST WITHOUT A REASON", "EINE ANFRAGE OHNE GRUND") },
        means: t(
          "The gate asks for a problem, a metric and an owner. A request that has none of them does not enter the roadmap.",
          "Das Tor verlangt ein Problem, eine Kennzahl und eine verantwortliche Person. Eine Anfrage, die keines davon hat, kommt nicht in die Roadmap.",
        ),
      },
      {
        art: "b3-2",
        scene: t("She returns: learners cannot tell if they understood a lesson, the metric is the share who pass the lesson check, and she herself is the owner.", "Sie kommt zurück: Lernende können nicht sagen, ob sie eine Lektion verstanden haben, die Kennzahl ist der Anteil, der die Lektionsprüfung besteht, und sie selbst ist die Verantwortliche."),
        speech: [{ by: "dana", text: t("Now the gate opens. The feature may still be built, but now for a reason.", "Jetzt öffnet sich das Tor. Das Feature wird vielleicht trotzdem gebaut, aber jetzt aus einem Grund.") }],
        tag: { tone: "teal", text: t("PROBLEM · METRIC · OWNER", "PROBLEM · KENNZAHL · VERANTWORTLICHE") },
        means: t(
          "The rule is the same for everybody, the sales team and the CEO included. A decision architecture decides who decides and on what evidence, so features start from users and not from the loudest voice.",
          "Die Regel gilt für alle, auch für das Vertriebsteam und den CEO. Eine Entscheidungsarchitektur legt fest, wer entscheidet und auf welcher Grundlage, damit Features bei den Nutzern beginnen und nicht bei der lautesten Stimme.",
        ),
      },
      {
        art: "b3-3",
        scene: t("For the menu rebuild, Priya decides without complete data and states four things.", "Für den Menüumbau entscheidet Priya ohne vollständige Daten und nennt vier Dinge."),
        speech: [{ by: "priya", text: t("I decide: rebuild the menu around tasks in two courses first. I do not know whether learners leave because they cannot find the course or because they lack time. I reverse if the seven-day return rate is not 3 points above the old menu after 8 weeks. I give up Live Polls this year.", "Ich entscheide: zuerst in zwei Kursen das Menü um Aufgaben herum neu bauen. Ich weiß nicht, ob Lernende gehen, weil sie den Kurs nicht finden oder weil ihnen die Zeit fehlt. Ich nehme es zurück, wenn die Rückkehrrate nach sieben Tagen nach 8 Wochen nicht 3 Punkte über dem alten Menü liegt. Ich verzichte in diesem Jahr auf Live Polls.") }],
        tag: { tone: "plain", text: t("DECIDE · UNKNOWN · REVERSE IF · GIVE UP", "ENTSCHEIDEN · UNBEKANNT · ZURÜCKNEHMEN, WENN · VERZICHT") },
        means: t(
          "The four boxes make a decision checkable: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.",
          "Die vier Kästen machen eine Entscheidung überprüfbar: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten.",
        ),
      },
      {
        art: "b3-4",
        scene: t("Dana and Priya write down the rule for every future feature.", "Dana und Priya schreiben die Regel für jedes künftige Feature auf."),
        speech: [{ by: "dana", text: t("The head of product decides with the UX lead, on evidence: a named user problem, a metric and an owner, plus a usability test or interviews.", "Die Leiterin Produkt entscheidet mit der UX-Leiterin, auf Grundlage von Belegen: einem genannten Nutzerproblem, einer Kennzahl und einer Verantwortlichen, dazu einem Usability-Test oder Interviews.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "A rule that holds for every future feature makes decisions less dependent on the loudest voice. Block 3.1 asks for a decision under uncertainty and for such a rule.",
          "Eine Regel, die für jedes künftige Feature gilt, macht Entscheidungen weniger von der lautesten Stimme abhängig. Block 3.1 verlangt eine Entscheidung unter Unsicherheit und eine solche Regel.",
        ),
      },
    ],
  },
}) as Record<MaterialId, Comic>;
