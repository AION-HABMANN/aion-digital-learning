import { bi, t } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/day4/materials";

/**
 * Day 4 · the story comics in pixel art (DL-STANDARD.md section 13). One per study card: the card's own material told as a short story with the people
 * the card already uses (Tom, Anna, Maya, Dana, LearnLoop's team), so it is the card said again in pictures, not a new case. Every figure comes from the
 * card or its diagram. The comic replaces the card's "Walk me through it" story. Speech and captions are HTML in ComicModal; the drawings are in
 * components/day4/comicScenes.tsx.
 */
const NOTE = t(
  "Tom, Anna, Maya, Dana, Priya and LearnLoop are made up for this lesson, like the examples on the card: a Case assumption. MotivaLearn, the case of the task, is in the task.",
  "Tom, Anna, Maya, Dana, Priya und LearnLoop sind für diese Lektion erfunden, wie die Beispiele auf der Karte: eine Fallannahme. MotivaLearn, der Fall der Aufgabe, steht in der Aufgabe.",
);
const NAMES = {
  tom: t("Tom, learner in procurement", "Tom, Lernender im Einkauf"),
  anna: t("Anna, sales manager", "Anna, Vertriebsleiterin"),
  maya: t("Maya, learner", "Maya, Lernende"),
  dana: t("Dana, product manager", "Dana, Produktmanagerin"),
  priya: t("Priya, learning lead", "Priya, Learning Lead"),
  learner: t("A learner", "Eine Lernende"),
  narrator: t("Narrator", "Erzähler"),
};

export const COMICS_D4 = bi({
  A1: {
    id: "d4-a1",
    pixel: true,
    title: t("The quizzes that lost their reason", "Die Quizze, die ihren Grund verloren"),
    teaser: t("Tom likes quizzes. Then the platform adds points.", "Tom macht gern Quizze. Dann fügt die Plattform Punkte hinzu."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a1-1",
        scene: t("Tom works in procurement and uses his company's learning platform. He likes the quizzes, because he enjoys seeing that he knows the answer.", "Tom arbeitet im Einkauf und nutzt die Lernplattform seines Unternehmens. Er macht die Quizze gern, weil er es mag zu sehen, dass er die Antwort weiß."),
        speech: [{ by: "tom", text: t("Another quiz? Sure. I like knowing I got it right.", "Noch ein Quiz? Gern. Ich mag es zu wissen, dass ich richtig lag.") }],
        tag: { tone: "plain", text: t("ABOUT 4 A WEEK · OWN REASON", "ETWA 4 PRO WOCHE · EIGENER GRUND") },
        means: t(
          "Intrinsic motivation comes from the activity itself: interest, curiosity, the wish to get better. Tom does about 4 quizzes a week without anyone asking him.",
          "Intrinsische Motivation kommt aus der Tätigkeit selbst: Interesse, Neugier, der Wunsch, besser zu werden. Tom macht etwa 4 Quizze pro Woche, ohne dass ihn jemand darum bittet.",
        ),
        look: t("the four equal bars", "die vier gleich hohen Balken"),
      },
      {
        art: "a1-2",
        scene: t("The platform adds points for every quiz. For a few weeks Tom does more.", "Die Plattform fügt Punkte für jedes Quiz hinzu. Einige Wochen lang macht Tom mehr."),
        speech: [{ by: "tom", text: t("Points for every quiz! Let me do one more.", "Punkte für jedes Quiz! Ich mache noch eins.") }],
        tag: { tone: "plain", text: t("ABOUT 6.8 A WEEK · REWARD FROM OUTSIDE", "ETWA 6,8 PRO WOCHE · BELOHNUNG VON AUSSEN") },
        means: t(
          "Extrinsic motivation comes from outside: points, money, a deadline, a certificate. A reward from outside has been added to Tom's own reason, and it looks like a success.",
          "Extrinsische Motivation kommt von außen: Punkte, Geld, eine Frist, ein Zertifikat. Zu Toms eigenem Grund ist eine Belohnung von außen hinzugekommen, und es sieht nach einem Erfolg aus.",
        ),
        look: t("the bars rise, and the points banner on the screen", "die Balken steigen, und das Punkte-Banner auf dem Bildschirm"),
      },
      {
        art: "a1-3",
        scene: t("Then the programme ends. Tom now does only about 2.3 quizzes a week, fewer than the 4 he did before any points.", "Dann endet das Programm. Tom macht nun nur noch etwa 2,3 Quizze pro Woche, weniger als die 4 vor allen Punkten."),
        speech: [{ by: "tom", think: true, text: t("Without points, why bother?", "Ohne Punkte, wozu?") }],
        tag: { tone: "plain", text: t("ABOUT 2.3 A WEEK · THE REASON IS GONE", "ETWA 2,3 PRO WOCHE · DER GRUND IST WEG") },
        means: t(
          "In his head the quiz had become a way to collect points, so when the points stop, the reason stops too. Researchers call this the overjustification effect.",
          "In seinem Kopf war das Quiz zu einem Weg geworden, Punkte zu sammeln, und als die Punkte aufhören, hört auch der Grund auf. Forschende nennen das den Overjustification-Effekt.",
        ),
        look: t("the last bars are lower than the first four", "die letzten Balken sind niedriger als die ersten vier"),
      },
      {
        art: "a1-4",
        scene: t("Priya shows what keeps motivation going: three needs.", "Priya zeigt, was Motivation trägt: drei Bedürfnisse."),
        speech: [{ by: "priya", text: t("Self-Determination Theory says people stay motivated when three needs are met: I choose, I can see I am getting better, I belong.", "Die Selbstbestimmungstheorie sagt, dass Menschen motiviert bleiben, wenn drei Bedürfnisse erfüllt sind: Ich wähle, ich sehe, dass ich besser werde, ich gehöre dazu.") }],
        tag: { tone: "teal", text: t("AUTONOMY · COMPETENCE · RELATEDNESS", "AUTONOMIE · KOMPETENZ · ZUGEHÖRIGKEIT") },
        means: t(
          "A platform can offer something for each need: your own path and pace, a visible sign of progress, a trainer's comments or a team that learns with you. Where all three meet, motivation lasts after the novelty is gone.",
          "Eine Plattform kann für jedes Bedürfnis etwas bieten: einen eigenen Weg und eigenes Tempo, ein sichtbares Zeichen des Fortschritts, Kommentare einer Trainerin oder ein Team, das mit lernt. Wo alle drei zusammentreffen, hält Motivation, wenn die Neuheit vorbei ist.",
        ),
      },
      {
        art: "a1-5",
        scene: t("Priya asks two questions before any platform adds points.", "Priya stellt zwei Fragen, bevor eine Plattform Punkte ergänzt."),
        speech: [{ by: "priya", text: t("Does the learner already have a reason of their own? And would the reward replace it?", "Hat die Lernende schon einen eigenen Grund? Und würde die Belohnung ihn ersetzen?") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "An extrinsic reward can start behaviour, but it may not keep it, and a reward for something a person already enjoys can lower their interest. Block 1.1 asks which of two platforms motivates more, five differences and three principles.",
          "Eine extrinsische Belohnung kann ein Verhalten anstoßen, es aber vielleicht nicht halten, und eine Belohnung für etwas, das eine Person schon gern tut, kann ihr Interesse senken. Block 1.1 fragt, welche von zwei Plattformen mehr motiviert, nach fünf Unterschieden und drei Prinzipien.",
        ),
      },
    ],
  },

  A2: {
    id: "d4-a2",
    pixel: true,
    title: t("One screen, five principles", "Ein Bildschirm, fünf Prinzipien"),
    teaser: t("Anna's course gains one principle at a time.", "Annas Kurs gewinnt ein Prinzip nach dem anderen."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a2-1",
        scene: t("Anna, a sales manager, takes a negotiation course on LearnLoop. The first version opens with a long page of reading.", "Anna, eine Vertriebsleiterin, macht einen Verhandlungskurs bei LearnLoop. Die erste Version beginnt mit einer langen Lesetextseite."),
        speech: [{ by: "anna", think: true, text: t("What will I be able to do at the end? Nothing asks me to try anything. After two pages I close it.", "Was kann ich am Ende? Nichts bittet mich, etwas auszuprobieren. Nach zwei Seiten schließe ich es.") }],
        tag: { tone: "plain", text: t("A LONG PAGE · NO GOAL · NO TASK", "EINE LANGE SEITE · KEIN ZIEL · KEINE AUFGABE") },
        means: t(
          "She does not know what she will be able to do, nothing asks her to try anything, nothing tells her how she is doing, and the page does not show how far she has come.",
          "Sie weiß nicht, was sie können wird, nichts bittet sie, etwas auszuprobieren, nichts sagt ihr, wie es ihr geht, und die Seite zeigt nicht, wie weit sie gekommen ist.",
        ),
      },
      {
        art: "a2-2",
        scene: t("In the second version the unit starts with: after this unit you can write a counter-offer. A short work example follows.", "In der zweiten Version beginnt die Einheit mit: Nach dieser Einheit können Sie ein Gegenangebot schreiben. Ein kurzes Praxisbeispiel folgt."),
        speech: [{ by: "anna", text: t("Now I know what this page is for, and why it matters in my job.", "Jetzt weiß ich, wozu diese Seite da ist und warum sie in meinem Beruf zählt.") }],
        tag: { tone: "teal", text: t("CLARITY · RELEVANCE", "KLARHEIT · RELEVANZ") },
        means: t(
          "The goal sentence is the principle of clarity and structure. The work example gives relevance and context. Anna reads on with a purpose.",
          "Der Zielsatz ist das Prinzip Klarheit und Struktur. Das Praxisbeispiel liefert Relevanz und Kontext. Anna liest mit einem Zweck weiter.",
        ),
      },
      {
        art: "a2-3",
        scene: t("A three-minute task follows: Anna types her counter-offer. A message comes back.", "Es folgt eine Aufgabe von drei Minuten: Anna tippt ihr Gegenangebot. Eine Meldung kommt zurück."),
        speech: [{ by: "anna", text: t("“Your offer names a price but no condition. Next: task 4.” Now I know how I did and what comes next.", "„Ihr Angebot nennt einen Preis, aber keine Bedingung. Weiter: Aufgabe 4.“ Jetzt weiß ich, wie ich es gemacht habe und was als Nächstes kommt.") }],
        tag: { tone: "teal", text: t("ACTIVATION · FEEDBACK", "AKTIVIERUNG · FEEDBACK") },
        means: t(
          "Typing the offer is activation: she does something instead of only reading. The message is feedback with a next step, so she does not have to guess.",
          "Das Tippen des Angebots ist Aktivierung: Sie tut etwas, statt nur zu lesen. Die Meldung ist Feedback mit einem nächsten Schritt, sie muss also nicht raten.",
        ),
      },
      {
        art: "a2-4",
        scene: t("At the top of the page a bar shows 40 percent.", "Oben auf der Seite zeigt ein Balken 40 Prozent."),
        speech: [{ by: "anna", text: t("Forty percent. I can see my learning move forward.", "Vierzig Prozent. Ich sehe, wie mein Lernen vorankommt.") }],
        tag: { tone: "teal", text: t("PROGRESSION · 40%", "PROGRESSION · 40 %") },
        means: t(
          "Nothing about the content changed. What changed is that each of the five principles is visible on the screen, so Anna can feel that she is getting somewhere.",
          "Am Inhalt hat sich nichts geändert. Geändert hat sich, dass jedes der fünf Prinzipien auf dem Bildschirm sichtbar ist, sodass Anna spüren kann, dass sie vorankommt.",
        ),
        look: t("the bar at the top", "der Balken oben"),
      },
      {
        art: "a2-5",
        scene: t("Priya lists the five elements next to the five principles.", "Priya stellt die fünf Elemente neben die fünf Prinzipien."),
        speech: [{ by: "priya", text: t("Clarity, activation, feedback, progression, relevance. Ask which element delivers which.", "Klarheit, Aktivierung, Feedback, Progression, Relevanz. Fragen Sie, welches Element welches liefert.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Sorting what differs between two platforms into these principles, and then choosing measures that deliver them, is what Block 1.1 and Block 1.2 ask for.",
          "Zu sortieren, was sich zwischen zwei Plattformen unterscheidet, in diese Prinzipien und dann Maßnahmen zu wählen, die sie liefern, verlangen Block 1.1 und Block 1.2.",
        ),
      },
    ],
  },

  A3: {
    id: "d4-a3",
    pixel: true,
    title: t("What helps and what backfires", "Was hilft und was nach hinten losgeht"),
    teaser: t("Feedback, progress and rewards, each in two versions.", "Feedback, Fortschritt und Belohnungen, jeweils in zwei Versionen."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a3-1",
        scene: t("Two feedback messages. One says “Well done!”. The other says where Anna is going, how she is going and where to next.", "Zwei Feedback-Meldungen. Eine sagt „Gut gemacht!“. Die andere sagt, wohin Anna geht, wie sie vorankommt und was als Nächstes kommt."),
        speech: [{ by: "anna", text: t("“Well done” tells me nothing. The other one tells me what to fix and what to do next.", "„Gut gemacht“ sagt mir nichts. Die andere sagt mir, was ich verbessern soll und was ich als Nächstes tue.") }],
        tag: { tone: "plain", text: t("PRAISE ONLY · THREE QUESTIONS ANSWERED", "NUR LOB · DREI FRAGEN BEANTWORTET") },
        means: t(
          "Hattie and Timperley (2007): helpful feedback tells the learner where they are going, how they are going and where to next. “Well done” alone answers none of them.",
          "Hattie und Timperley (2007): Hilfreiches Feedback sagt der Lernenden, wohin sie geht, wie sie vorankommt und was als Nächstes kommt. „Gut gemacht“ allein beantwortet keine davon.",
        ),
        look: t("three crosses on the left, three ticks on the right", "drei Kreuze links, drei Häkchen rechts"),
      },
      {
        art: "a3-2",
        scene: t("Two result screens. One tells the learner something true about their skill. The other pays points for opening a lesson and ranks people.", "Zwei Ergebnisbildschirme. Einer sagt der Lernenden etwas Wahres über ihr Können. Der andere zahlt Punkte fürs Öffnen einer Lektion und reiht Menschen."),
        speech: [{ by: "priya", text: t("A reward helps when it says something true about the skill. It backfires when it replaces the reason for learning.", "Eine Belohnung hilft, wenn sie etwas Wahres über das Können sagt. Sie geht nach hinten los, wenn sie den Grund zum Lernen ersetzt.") }],
        tag: { tone: "plain", text: t("SUPPORTS LEARNING · CAN REPLACE THE REASON", "STÜTZT DAS LERNEN · KANN DEN GRUND ERSETZEN") },
        means: t(
          "Rate a reward by what it says. The left screen is information about the skill. The right one pays for presence and ranks people against each other, so it can become the reason for opening a lesson.",
          "Bewerten Sie eine Belohnung danach, was sie sagt. Der linke Bildschirm ist eine Information über das Können. Der rechte zahlt für Anwesenheit und reiht Menschen gegeneinander, kann also zum Grund werden, eine Lektion zu öffnen.",
        ),
      },
      {
        art: "a3-3",
        scene: t("Two loyalty cards. Both need eight more stamps. One has 8 places, none stamped. The other has 10 places, 2 already stamped.", "Zwei Treuekarten. Beide brauchen acht weitere Stempel. Eine hat 8 Plätze, keiner gestempelt. Die andere hat 10 Plätze, 2 schon gestempelt."),
        speech: [{ by: "priya", text: t("People finish the card that is already partly stamped more often. A progress bar uses the same effect, but it has to be honest.", "Menschen schließen die Karte, die schon teilweise gestempelt ist, häufiger ab. Ein Fortschrittsbalken nutzt denselben Effekt, aber er muss ehrlich sein.") }],
        tag: { tone: "teal", text: t("PROGRESS THAT ALREADY EXISTS", "FORTSCHRITT, DER SCHON EXISTIERT") },
        means: t(
          "Nunes and Drèze (2006): customers whose card was already partly stamped were more likely to finish it. A bar that moves without real progress teaches the learner to distrust it.",
          "Nunes und Drèze (2006): Kundinnen, deren Karte schon teilweise gestempelt war, schlossen sie eher ab. Ein Balken, der sich ohne echten Fortschritt bewegt, bringt der Lernenden bei, ihm zu misstrauen.",
        ),
        look: t("both cards need 8 more", "beide Karten brauchen 8 weitere"),
      },
      {
        art: "a3-4",
        scene: t("Priya sums up the three tools.", "Priya fasst die drei Werkzeuge zusammen."),
        speech: [{ by: "priya", text: t("For each measure ask: does it help, or does it backfire? What remains when the reward is gone?", "Fragen Sie bei jeder Maßnahme: Hilft sie oder geht sie nach hinten los? Was bleibt, wenn die Belohnung weg ist?") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Feedback, progress displays and rewards appear in almost every motivation discussion. Block 1.2 and Block 2.1 ask you to choose between measures such as a progress display, feedback after each task, and points and badges, and to say why.",
          "Feedback, Fortschrittsanzeigen und Belohnungen tauchen in fast jeder Motivationsdiskussion auf. Block 1.2 und Block 2.1 verlangen, zwischen Maßnahmen wie einer Fortschrittsanzeige, Feedback nach jeder Aufgabe sowie Punkten und Badges zu wählen und zu sagen, warum.",
        ),
      },
    ],
  },

  A4: {
    id: "d4-a4",
    pixel: true,
    title: t("Five ways to measure, five traps", "Fünf Wege zu messen, fünf Fallen"),
    teaser: t("Dana checks whether a motivating design works.", "Dana prüft, ob ein motivierendes Design wirkt."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a4-1",
        scene: t("Dana looks at the completion rate: how many finish the course.", "Dana betrachtet die Completion Rate: wie viele den Kurs abschließen."),
        speech: [{ by: "dana", think: true, text: t("It tells me how many finish. It does not tell me why, or what they learned.", "Sie sagt mir, wie viele abschließen. Sie sagt mir nicht, warum, oder was sie gelernt haben.") }],
        tag: { tone: "plain", text: t("COMPLETION RATE · THE TRAP", "COMPLETION RATE · DIE FALLE") },
        means: t(
          "Each metric answers one question and has a trap. Completion says nothing about why learners finish, or about what they learned.",
          "Jede Kennzahl beantwortet eine Frage und hat eine Falle. Completion sagt nichts darüber, warum Lernende abschließen, oder was sie gelernt haben.",
        ),
      },
      {
        art: "a4-2",
        scene: t("Next the return rate: do learners come back within seven days?", "Als Nächstes die Rückkehrrate: Kommen Lernende innerhalb von sieben Tagen zurück?"),
        speech: [{ by: "dana", text: t("A line that rises means nothing without a baseline. I write down today's figure first.", "Eine steigende Linie bedeutet nichts ohne Ausgangslage. Ich schreibe zuerst die heutige Zahl auf.") }],
        tag: { tone: "plain", text: t("RETURN RATE · NEEDS A BASELINE", "RÜCKKEHRRATE · BRAUCHT EINE AUSGANGSLAGE") },
        means: t(
          "The return rate shows behaviour, but it needs a baseline, or a rise means nothing.",
          "Die Rückkehrrate zeigt Verhalten, braucht aber eine Ausgangslage, sonst bedeutet ein Anstieg nichts.",
        ),
      },
      {
        art: "a4-3",
        scene: t("Then time spent: how long are learners on the platform?", "Dann die verbrachte Zeit: Wie lange sind Lernende auf der Plattform?"),
        speech: [{ by: "dana", think: true, text: t("A long time. Is that interest, or is that confusion?", "Eine lange Zeit. Ist das Interesse oder Verwirrung?") }],
        tag: { tone: "plain", text: t("TIME SPENT · INTEREST OR CONFUSION", "VERBRACHTE ZEIT · INTERESSE ODER VERWIRRUNG") },
        means: t(
          "The same long time can be read as interest or as confusion. The number alone cannot tell them apart.",
          "Dieselbe lange Zeit lässt sich als Interesse oder als Verwirrung lesen. Die Zahl allein kann sie nicht unterscheiden.",
        ),
      },
      {
        art: "a4-4",
        scene: t("Two methods can help. Interviews explain why. A test against a control group shows whether the change caused the rise.", "Zwei Methoden helfen. Interviews erklären das Warum. Ein Test gegen eine Kontrollgruppe zeigt, ob die Änderung den Anstieg verursacht hat."),
        speech: [{ by: "dana", text: t("Interviews are a few voices: they explain, they do not count. The control test needs enough learners to tell a difference.", "Interviews sind wenige Stimmen: Sie erklären, sie zählen nicht. Der Kontrolltest braucht genug Lernende, um einen Unterschied zu erkennen.") }],
        tag: { tone: "plain", text: t("INTERVIEWS · TEST VS CONTROL", "INTERVIEWS · TEST GEGEN KONTROLLE") },
        means: t(
          "Pair a metric about behaviour with a method about reasons. Write the expected effect and the figure down before you change anything.",
          "Kombinieren Sie eine Kennzahl über Verhalten mit einer Methode über Gründe. Schreiben Sie den erwarteten Effekt und die Zahl auf, bevor Sie etwas ändern.",
        ),
      },
      {
        art: "a4-5",
        scene: t("Dana turns it into a loop.", "Dana macht daraus eine Schleife."),
        speech: [{ by: "dana", text: t("Test, analyse, adjust, and test again.", "Testen, analysieren, anpassen, und wieder testen.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Iterating means three steps in a loop. The plan's Level 3 task asks for an evaluation strategy: how do we measure success? Block 3.1 is where you write it.",
          "Iterieren heißt drei Schritte in einer Schleife. Die Level-3-Aufgabe des Plans verlangt eine Evaluationsstrategie: Wie messen wir den Erfolg? In Block 3.1 schreiben Sie sie.",
        ),
      },
    ],
  },

  A5: {
    id: "d4-a5",
    pixel: true,
    title: t("Three ideas, one lasting effect", "Drei Ideen, eine bleibende Wirkung"),
    teaser: t("LearnLoop has €40,000 and two months, and learners drop out early.", "LearnLoop hat 40.000 € und zwei Monate, und Lernende brechen früh ab."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a5-1",
        scene: t("Learners drop out early. LearnLoop has €40,000 and two months, and three ideas on the table.", "Lernende brechen früh ab. LearnLoop hat 40.000 € und zwei Monate und drei Ideen auf dem Tisch."),
        speech: [{ by: "priya", text: t("We rate each idea on motivation impact, effort and risk. The effort rule: under €10,000 is Low, up to €20,000 is Mid, above that is High.", "Wir bewerten jede Idee nach Motivationswirkung, Aufwand und Risiko. Die Aufwandsregel: unter 10.000 € ist Niedrig, bis 20.000 € Mittel, darüber Hoch.") }],
        tag: { tone: "plain", text: t("3 IDEAS · 3 QUESTIONS", "3 IDEEN · 3 FRAGEN") },
        means: t(
          "Motivation impact asks how much it supports lasting motivation: goals, activation, feedback, progress. Effort is money and time. Risk asks how it can backfire, through overjustification, pressure or manipulation.",
          "Motivationswirkung fragt, wie sehr es dauerhafte Motivation stützt: Ziele, Aktivierung, Feedback, Fortschritt. Aufwand ist Geld und Zeit. Risiko fragt, wie es nach hinten losgehen kann, durch Overjustification, Druck oder Manipulation.",
        ),
      },
      {
        art: "a5-2",
        scene: t("Idea 1: a weekly leaderboard. It costs €14,000.", "Idee 1: eine wöchentliche Rangliste. Sie kostet 14.000 €."),
        speech: [{ by: "priya", think: true, text: t("€14,000 is between €10,000 and €20,000: effort Mid. It sounds exciting, but a ranking rewards the already active and can discourage those at the bottom.", "14.000 € liegen zwischen 10.000 € und 20.000 €: Aufwand Mittel. Es klingt spannend, aber eine Rangliste belohnt die ohnehin Aktiven und kann die am Ende entmutigen.") }],
        tag: { tone: "plain", text: t("IMPACT LOW · EFFORT MID · RISK HIGH", "WIRKUNG NIEDRIG · AUFWAND MITTEL · RISIKO HOCH") },
        means: t(
          "For the learners LearnLoop wants to keep, the impact is Low. The risk is High because of pressure and social comparison.",
          "Für die Lernenden, die LearnLoop halten will, ist die Wirkung Niedrig. Das Risiko ist Hoch wegen Druck und sozialem Vergleich.",
        ),
      },
      {
        art: "a5-3",
        scene: t("Idea 2: a progress and next-step display. It costs €8,000.", "Idee 2: eine Fortschritts- und Nächster-Schritt-Anzeige. Sie kostet 8.000 €."),
        speech: [{ by: "priya", text: t("€8,000 is under €10,000: effort Low. It shows how far the learner has come and what to do next, and it takes nothing away.", "8.000 € liegen unter 10.000 €: Aufwand Niedrig. Sie zeigt, wie weit die Lernende gekommen ist und was als Nächstes zu tun ist, und nimmt nichts weg.") }],
        tag: { tone: "teal", text: t("IMPACT HIGH · EFFORT LOW · RISK LOW", "WIRKUNG HOCH · AUFWAND NIEDRIG · RISIKO NIEDRIG") },
        means: t(
          "It adds information, so the impact is High and the risk is Low.",
          "Sie fügt Information hinzu, die Wirkung ist also Hoch und das Risiko Niedrig.",
        ),
      },
      {
        art: "a5-4",
        scene: t("Idea 3: short practice tasks. They cost €26,000 and take seven of the eight weeks.", "Idee 3: kurze Übungsaufgaben. Sie kosten 26.000 € und brauchen sieben der acht Wochen."),
        speech: [{ by: "priya", think: true, text: t("€26,000 is above €20,000: effort High. They make learners active, but the schedule is tight and weak tasks would feel like homework.", "26.000 € liegen über 20.000 €: Aufwand Hoch. Sie machen Lernende aktiv, aber der Zeitplan ist eng und schwache Aufgaben würden sich wie Hausaufgaben anfühlen.") }],
        tag: { tone: "plain", text: t("IMPACT HIGH · EFFORT HIGH · RISK MID", "WIRKUNG HOCH · AUFWAND HOCH · RISIKO MITTEL") },
        means: t(
          "Practice makes learners active, so the impact is High and lasting. The tight schedule and the risk of weak tasks make the risk Mid.",
          "Übung macht Lernende aktiv, die Wirkung ist also Hoch und bleibend. Der enge Zeitplan und das Risiko schwacher Aufgaben machen das Risiko Mittel.",
        ),
      },
      {
        art: "a5-5",
        scene: t("Priya names the idea with the lasting effect, and what LearnLoop does not know.", "Priya nennt die Idee mit der bleibenden Wirkung und was LearnLoop nicht weiß."),
        speech: [{ by: "priya", text: t("The progress display lasts, even though the leaderboard sounds more exciting. Ask of any measure: what remains when the reward is gone? We do not know yet if learners leave for lack of progress or lack of time.", "Die Fortschrittsanzeige wirkt, obwohl die Rangliste spannender klingt. Fragen Sie bei jeder Maßnahme: Was bleibt, wenn die Belohnung weg ist? Wir wissen noch nicht, ob Lernende wegen fehlenden Fortschritts oder fehlender Zeit gehen.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Weigh each measure on the same three questions and say what you do not know. Block 1.2 asks you to do this for three engagement options.",
          "Wägen Sie jede Maßnahme mit denselben drei Fragen ab und sagen Sie, was Sie nicht wissen. Block 1.2 verlangt das für drei Engagement-Optionen.",
        ),
      },
    ],
  },

  B1: {
    id: "d4-b1",
    pixel: true,
    title: t("Why Maya does not open the next lesson", "Warum Maya die nächste Lektion nicht öffnet"),
    teaser: t("Motivation alone does not do it: Fogg's model in four pictures.", "Motivation allein reicht nicht: Foggs Modell in vier Bildern."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "b1-1",
        scene: t("Maya is motivated to finish her course on LearnLoop. She gets a reminder every evening. But the next lesson is buried three menus deep.", "Maya ist motiviert, ihren Kurs bei LearnLoop abzuschließen. Sie bekommt jeden Abend eine Erinnerung. Aber die nächste Lektion steckt drei Menüs tief."),
        speech: [{ by: "maya", think: true, text: t("I really want to finish. But where is the next lesson? It takes too much to find it.", "Ich will wirklich abschließen. Aber wo ist die nächste Lektion? Sie zu finden ist zu mühsam.") }],
        tag: { tone: "plain", text: t("HIGH MOTIVATION · VERY HARD · BELOW THE LINE", "HOHE MOTIVATION · SEHR SCHWER · UNTER DER LINIE") },
        means: t(
          "Fogg's Behavior Model says a behaviour happens when motivation, ability and a prompt come together. The step is very hard, so even high motivation does not carry her over the line.",
          "Foggs Verhaltensmodell sagt, dass ein Verhalten geschieht, wenn Motivation, Können und ein Impuls zusammenkommen. Der Schritt ist sehr schwer, selbst hohe Motivation trägt sie also nicht über die Linie.",
        ),
        look: t("the dot sits below the curve", "der Punkt liegt unter der Kurve"),
      },
      {
        art: "b1-2",
        scene: t("LearnLoop puts a “Next lesson” button on every page. The step is now easy. But the evening reminder is switched off in this version.", "LearnLoop setzt einen Button „Nächste Lektion“ auf jede Seite. Der Schritt ist jetzt leicht. Aber die Abenderinnerung ist in dieser Version ausgeschaltet."),
        speech: [{ by: "maya", think: true, text: t("The button is easy now. But I forgot about it, and nothing reminds me.", "Der Button ist jetzt leicht. Aber ich habe es vergessen, und nichts erinnert mich.") }],
        tag: { tone: "plain", text: t("EASY · NO PROMPT · NOTHING HAPPENS", "LEICHT · KEIN IMPULS · NICHTS PASSIERT") },
        means: t(
          "The dot has moved to the right, above the line: she has enough motivation for such an easy step. But behaviour needs a prompt as well.",
          "Der Punkt ist nach rechts gewandert, über die Linie: Sie hat genug Motivation für einen so leichten Schritt. Aber Verhalten braucht auch einen Impuls.",
        ),
        look: t("the dot is above the curve, but the flag is crossed out", "der Punkt liegt über der Kurve, aber die Flagge ist durchgestrichen"),
      },
      {
        art: "b1-3",
        scene: t("With the button and the reminder, all three are present.", "Mit dem Button und der Erinnerung sind alle drei da."),
        speech: [{ by: "maya", text: t("A reminder, and the next lesson is one tap away. I open it.", "Eine Erinnerung, und die nächste Lektion ist einen Tipp entfernt. Ich öffne sie.") }],
        tag: { tone: "teal", text: t("MOTIVATION + ABILITY + PROMPT", "MOTIVATION + KÖNNEN + IMPULS") },
        means: t(
          "No reward was added at any point. The platform removed a barrier and added a prompt, and that was enough.",
          "Es wurde zu keinem Zeitpunkt eine Belohnung ergänzt. Die Plattform hat eine Hürde entfernt und einen Impuls ergänzt, und das genügte.",
        ),
      },
      {
        art: "b1-4",
        scene: t("Dana turns it into a question for the team.", "Dana macht daraus eine Frage an das Team."),
        speech: [{ by: "dana", text: t("Before we add rewards: is the next step easy to find, and does anything invite it?", "Bevor wir Belohnungen ergänzen: Ist der nächste Schritt leicht zu finden, und lädt etwas dazu ein?") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "More motivation is not always the answer: when the step is very easy, modest motivation is enough, and when it is hard, even high motivation fails. Block 3.1 asks you to develop an engagement strategy and to say where motivation is overestimated.",
          "Mehr Motivation ist nicht immer die Antwort: Ist der Schritt sehr leicht, genügt bescheidene Motivation, und ist er schwer, scheitert auch hohe. Block 3.1 verlangt, eine Engagement-Strategie zu entwickeln und zu sagen, wo Motivation überschätzt wird.",
        ),
      },
    ],
  },

  B2: {
    id: "d4-b2",
    pixel: true,
    title: t("Seven ideas, one corner to aim for", "Sieben Ideen, eine Ecke als Ziel"),
    teaser: t("LearnLoop places seven ideas by lasting motivation and pressure.", "LearnLoop ordnet sieben Ideen nach dauerhafter Motivation und Druck."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "b2-1",
        scene: t("Option F sends loss messages such as “You will lose your streak”.", "Option F sendet Verlustmeldungen wie „Sie verlieren Ihre Serie“."),
        speech: [{ by: "priya", think: true, text: t("It makes people active this week, so it sits high. But it builds no reason of the learner's own, so it sits far left. And it costs trust.", "Es macht Menschen diese Woche aktiv und liegt deshalb oben. Aber es baut keinen eigenen Grund der Lernenden auf und liegt deshalb weit links. Und es kostet Vertrauen.") }],
        tag: { tone: "plain", text: t("F · PRESSURED, SHORT-LIVED", "F · UNTER DRUCK, KURZLEBIG") },
        means: t(
          "A third pull is motivation against manipulation: pressure, guilt and loss messages that raise activity today and cost trust tomorrow.",
          "Ein dritter Zug ist Motivation gegen Manipulation: Druck, Schuldgefühle und Verlustmeldungen, die heute die Aktivität steigern und morgen das Vertrauen kosten.",
        ),
        look: t("point F, top left", "Punkt F, oben links"),
      },
      {
        art: "b2-2",
        scene: t("Option D gives points for opening a lesson.", "Option D gibt Punkte fürs Öffnen einer Lektion."),
        speech: [{ by: "priya", think: true, text: t("The cheapest way to earn them is to open lessons without reading. That is the opposite of what we want.", "Am billigsten verdient man sie, indem man Lektionen öffnet, ohne zu lesen. Das ist das Gegenteil dessen, was wir wollen.") }],
        tag: { tone: "plain", text: t("D · A PERVERSE INCENTIVE", "D · EIN FEHLANREIZ") },
        means: t(
          "A perverse incentive produces the reverse of the intention. Ask of every reward: what is the cheapest way to earn it, and is that what we want?",
          "Ein Fehlanreiz erzeugt das Gegenteil der Absicht. Fragen Sie bei jeder Belohnung: Was ist der billigste Weg, sie zu verdienen, und wollen wir das?",
        ),
        look: t("point D, on the left", "Punkt D, links"),
      },
      {
        art: "b2-3",
        scene: t("Option A, a progress display, and option B, a goal sentence, sit in the bottom right.", "Option A, eine Fortschrittsanzeige, und Option B, ein Zielsatz, liegen unten rechts."),
        speech: [{ by: "priya", text: t("They support lasting motivation and put almost no pressure on the learner. Prefer measures the learner would endorse if they saw how they work.", "Sie stützen dauerhafte Motivation und üben fast keinen Druck auf die Lernende aus. Bevorzugen Sie Maßnahmen, die die Lernende gutheißen würde, wenn sie sähe, wie sie wirken.") }],
        tag: { tone: "teal", text: t("A AND B · AIM HERE", "A UND B · ZIEL HIER") },
        means: t(
          "The plan's conflicts for Day 4 are motivation against overload, motivation against usability, and short-term against long-term effect. The positions are a reading of this example, not a score.",
          "Die Konflikte des Plans für Tag 4 sind Motivation gegen Überlastung, Motivation gegen Usability und kurzfristige gegen langfristige Wirkung. Die Positionen sind eine Lesart dieses Beispiels, keine Note.",
        ),
        look: t("points A and B, bottom right", "Punkte A und B, unten rechts"),
      },
      {
        art: "b2-4",
        scene: t("Dana pins the matrix to the wall.", "Dana hängt die Matrix an die Wand."),
        speech: [{ by: "dana", text: t("A good strategy names which conflict it faces in each measure, and stays on the right side of manipulation.", "Eine gute Strategie nennt, welchen Konflikt sie bei jeder Maßnahme eingeht, und bleibt auf der richtigen Seite der Manipulation.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Block 3.1 asks for a risk analysis of perverse incentives and wrong motivation, and for a motivation strategy that stays on the right side of manipulation.",
          "Block 3.1 verlangt eine Risikoanalyse von Fehlanreizen und falscher Motivation und eine Motivationsstrategie, die auf der richtigen Seite der Manipulation bleibt.",
        ),
      },
    ],
  },

  B3: {
    id: "d4-b3",
    pixel: true,
    title: t("Did the change do it?", "Hat die Änderung es bewirkt?"),
    teaser: t("Dana learns what a control group shows, and then makes a decision with unknowns.", "Dana lernt, was eine Kontrollgruppe zeigt, und trifft dann eine Entscheidung mit Unbekanntem."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "b3-1",
        scene: t("Dana shows a progress display to all learners. The share who return within seven days rises from 30 to 39 percent in six weeks.", "Dana zeigt allen Lernenden eine Fortschrittsanzeige. Der Anteil, der innerhalb von sieben Tagen zurückkehrt, steigt in sechs Wochen von 30 auf 39 Prozent."),
        speech: [{ by: "dana", text: t("That looks like a 9-point success. But do we know that the display caused it?", "Das sieht nach einem Erfolg von 9 Punkten aus. Aber wissen wir, dass die Anzeige es verursacht hat?") }],
        tag: { tone: "plain", text: t("30 → 39 · A 9-POINT RISE", "30 → 39 · EIN ANSTIEG VON 9 PUNKTEN") },
        means: t(
          "Without anything to compare with, a rise could be the season, a campaign or luck.",
          "Ohne etwas zum Vergleich könnte ein Anstieg die Jahreszeit, eine Kampagne oder Zufall sein.",
        ),
      },
      {
        art: "b3-2",
        scene: t("Suppose half of the learners had not seen the display. Their rate also rose, from 30 to 34 percent, because it was the start of the year.", "Angenommen, die Hälfte der Lernenden hätte die Anzeige nicht gesehen. Ihre Rate stieg ebenfalls, von 30 auf 34 Prozent, weil es der Jahresanfang war."),
        speech: [{ by: "dana", think: true, text: t("So the display added 5 points, not 9. The gap between the two lines is what the change did.", "Die Anzeige brachte also 5 Punkte, nicht 9. Der Abstand zwischen den beiden Linien ist das, was die Änderung bewirkt hat.") }],
        tag: { tone: "teal", text: t("CONTROL GROUP · 34 · THE GAP IS 5", "KONTROLLGRUPPE · 34 · DER ABSTAND IST 5") },
        means: t(
          "Write the baseline down before you change anything, and compare against a control group when you have enough learners. With few learners, use small tests and interviews, and say that the result is a hint.",
          "Schreiben Sie die Ausgangslage auf, bevor Sie etwas ändern, und vergleichen Sie mit einer Kontrollgruppe, wenn Sie genug Lernende haben. Bei wenigen Lernenden nutzen Sie kleine Tests und Interviews und sagen, dass das Ergebnis ein Hinweis ist.",
        ),
        look: t("the gap between the blue and the grey line", "der Abstand zwischen der blauen und der grauen Linie"),
      },
      {
        art: "b3-3",
        scene: t("Dana decides under uncertainty. She states four things.", "Dana entscheidet unter Unsicherheit. Sie nennt vier Dinge."),
        speech: [{ by: "dana", text: t("I decide: a progress display and a next step in two courses first. I do not know whether learners leave for lack of direction or of time. I reverse if the return rate is not 4 points above the control group after 8 weeks. I give up the points programme this year.", "Ich entscheide: zuerst in zwei Kursen eine Fortschrittsanzeige und einen nächsten Schritt. Ich weiß nicht, ob Lernende wegen fehlender Richtung oder fehlender Zeit gehen. Ich nehme zurück, wenn die Rückkehrrate nach 8 Wochen nicht 4 Punkte über der Kontrollgruppe liegt. Ich verzichte in diesem Jahr auf das Punkteprogramm.") }],
        tag: { tone: "plain", text: t("DECIDE · UNKNOWN · REVERSE IF · GIVE UP", "ENTSCHEIDEN · UNBEKANNT · ZURÜCKNEHMEN, WENN · VERZICHT") },
        means: t(
          "The four boxes make a decision checkable: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.",
          "Die vier Kästen machen eine Entscheidung überprüfbar: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten.",
        ),
      },
      {
        art: "b3-4",
        scene: t("Dana and Priya set a rule for future optimisation.", "Dana und Priya legen eine Regel für künftige Optimierung fest."),
        speech: [{ by: "priya", text: t("The head of product decides with the learning lead, on evidence: an A/B test with a control group, five learner interviews, return-rate data.", "Die Leiterin Produkt entscheidet mit dem Learning Lead, auf Grundlage von Belegen: einem A/B-Test mit Kontrollgruppe, fünf Lernenden-Interviews, Rückkehrdaten.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Your evaluation strategy says how you will measure success: a baseline, a target, a method and a date. A rule makes future optimisation less dependent on the loudest opinion. Block 3.1 asks for both.",
          "Ihre Evaluationsstrategie sagt, wie Sie den Erfolg messen: eine Ausgangslage, ein Ziel, eine Methode und ein Termin. Eine Regel macht künftige Optimierung weniger abhängig von der lautesten Meinung. Block 3.1 verlangt beides.",
        ),
      },
    ],
  },
}) as Record<MaterialId, Comic>;
