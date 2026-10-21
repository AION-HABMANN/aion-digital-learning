import { bi, t } from "@/lib/lang";
import type { Comic } from "@/components/comic/ComicModal";
import type { MaterialId } from "@/data/day6/materials";

/**
 * Day 6 · the story comics in pixel art (DL-STANDARD.md section 13). One per study card: the card's own material told as a short story with the people
 * the card already uses (Mia, Sven, Petra, LearnLoop's team), so it is the card said again in pictures, not a new case. Every figure comes from the card
 * or its diagram. The comic replaces the card's "Walk me through it" story. Speech and captions are HTML in ComicModal; the drawings are in
 * components/day6/comicScenes.tsx.
 */
const NOTE = t(
  "Mia, Sven, Petra, Priya, Dana, Sandra and LearnLoop are made up for this lesson, like the examples on the card: a Case assumption. EduPath, the case of the task, is in the task.",
  "Mia, Sven, Petra, Priya, Dana, Sandra und LearnLoop sind für diese Lektion erfunden, wie die Beispiele auf der Karte: eine Fallannahme. EduPath, der Fall der Aufgabe, steht in der Aufgabe.",
);
const NAMES = {
  mia: t("Mia, sales assistant", "Mia, Vertriebsassistentin"),
  sven: t("Sven, teacher", "Sven, Lehrender"),
  petra: t("Petra, training manager", "Petra, Weiterbildungsleiterin"),
  priya: t("Priya, UX lead", "Priya, UX-Leiterin"),
  dana: t("Dana, head of product", "Dana, Leiterin Produkt"),
  learner: t("A learner", "Eine Lernende"),
  narrator: t("Narrator", "Erzähler"),
};

export const COMICS_D6 = bi({
  A1: {
    id: "d6-a1",
    pixel: true,
    title: t("A persona you can decide with", "Eine Persona, mit der man entscheiden kann"),
    teaser: t("LearnLoop's team argues about “the user”.", "Das Team von LearnLoop streitet über „die Nutzerin“."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a1-1",
        scene: t("LearnLoop's team argues about “the user”. The designer has Sandra in mind, tech-savvy and fond of apps. The sales manager pictures an exam student. They cannot agree.", "Das Team von LearnLoop streitet über „die Nutzerin“. Die Designerin hat Sandra im Kopf, technikaffin und App-begeistert. Der Vertriebsleiter stellt sich eine Prüfungskandidatin vor. Sie werden sich nicht einig."),
        speech: [{ by: "priya", think: true, text: t("Sandra's goal is “a great experience” and her problem is “hates bad design”. What could we act on?", "Sandras Ziel ist „ein großartiges Erlebnis“ und ihr Problem „hasst schlechtes Design“. Wonach könnten wir handeln?") }],
        tag: { tone: "plain", text: t("A PERSONA NOBODY CAN USE", "EINE PERSONA, DIE NIEMAND NUTZEN KANN") },
        means: t(
          "Sandra's card says nothing a team could act on. A persona stands for a group of real users and makes their needs concrete enough to discuss; this one does neither.",
          "Sandras Karte sagt nichts, wonach ein Team handeln könnte. Eine Persona steht für eine Gruppe echter Nutzer und macht ihre Bedürfnisse konkret genug zum Diskutieren; diese tut beides nicht.",
        ),
        look: t("Sandra's card: two vague lines", "Sandras Karte: zwei vage Zeilen"),
      },
      {
        art: "a1-2",
        scene: t("The team writes a persona from two learner interviews and a log analysis. Mia is 29, a sales assistant, and wants to qualify for a team-lead role.", "Das Team schreibt eine Persona aus zwei Lernenden-Interviews und einer Log-Analyse. Mia ist 29, Vertriebsassistentin und will sich für eine Teamleitung qualifizieren."),
        speech: [{ by: "priya", text: t("She loses the thread after a few days away, and she studies twenty minutes on her phone in the evening.", "Sie verliert nach ein paar Tagen Pause den Faden, und sie lernt abends zwanzig Minuten auf dem Handy.") }],
        tag: { tone: "teal", text: t("A PERSONA BUILT FROM DATA", "EINE PERSONA AUS DATEN") },
        means: t(
          "Three things go into a persona: goals (why does the person learn?), problems and frustrations (what gets in the way?) and the context of use (time, device, motivation).",
          "Drei Dinge gehören in eine Persona: Ziele (warum lernt die Person?), Probleme und Frustrationen (was steht im Weg?) und der Nutzungskontext (Zeit, Gerät, Motivation).",
        ),
        look: t("goal, problem, context: three concrete lines", "Ziel, Problem, Kontext: drei konkrete Zeilen"),
      },
      {
        art: "a1-3",
        scene: t("Now somebody can ask: would a resume button help Mia?", "Jetzt kann jemand fragen: Würde ein Fortsetzen-Button Mia helfen?"),
        speech: [{ by: "priya", text: t("Yes, she loses her place after a break. A resume button answers that, and the room can decide.", "Ja, sie verliert nach einer Pause ihre Stelle. Ein Fortsetzen-Button beantwortet das, und der Raum kann entscheiden.") }],
        tag: { tone: "teal", text: t("A TOOL FOR DECISIONS", "EIN WERKZEUG FÜR ENTSCHEIDUNGEN") },
        means: t(
          "A persona is not a profile to admire but a tool to decide with.",
          "Eine Persona ist kein Profil zum Bewundern, sondern ein Werkzeug, mit dem man entscheidet.",
        ),
      },
      {
        art: "a1-4",
        scene: t("Priya gives the team one question to ask of any persona.", "Priya gibt dem Team eine Frage, die man an jede Persona stellt."),
        speech: [{ by: "priya", text: t("Which decision would change because of it? Sandra changes none. Mia changes several.", "Welche Entscheidung würde sich deswegen ändern? Sandra ändert keine. Mia ändert mehrere.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Learners and teachers need different personas, because their perspectives differ. Block 1.1 asks you to develop a persona: goals, problems, situation, expectations and frustrations.",
          "Lernende und Lehrende brauchen verschiedene Personas, weil ihre Perspektiven verschieden sind. Block 1.1 verlangt, eine Persona zu entwickeln: Ziele, Probleme, Situation, Erwartungen und Frustrationen.",
        ),
      },
    ],
  },

  A2: {
    id: "d6-a2",
    pixel: true,
    title: t("Decoration or data", "Dekoration oder Daten"),
    teaser: t("Three cards on the wall, and what replaces them.", "Drei Karten an der Wand und was sie ersetzt."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a2-1",
        scene: t("Three persona cards hang on the wall of LearnLoop's team room: Sandra the techie, Tom the busy manager and Karen the career changer.", "Drei Personakarten hängen an der Wand im Teamraum von LearnLoop: Sandra, die Technikaffine, Tom, der vielbeschäftigte Manager, und Karen, die Quereinsteigerin."),
        speech: [{ by: "dana", think: true, text: t("All three want “a better experience”. None cites a source, and nobody has ever used one to settle an argument.", "Alle drei wollen „ein besseres Erlebnis“. Keine nennt eine Quelle, und niemand hat je eine benutzt, um einen Streit zu klären.") }],
        tag: { tone: "plain", text: t("CLICHÉS INSTEAD OF DATA", "KLISCHEES STATT DATEN") },
        means: t(
          "The plan names two typical mistakes: clichés instead of data, and personas that are too general. These cards are decoration.",
          "Der Plan nennt zwei typische Fehler: Klischees statt Daten und zu allgemeine Personas. Diese Karten sind Dekoration.",
        ),
      },
      {
        art: "a2-2",
        scene: t("The team interviews learners and teachers and reads the usage logs. It merges the three into one persona, Mia, and adds one who builds courses, Sven.", "Das Team interviewt Lernende und Lehrende und liest die Nutzungslogs. Es führt die drei zu einer Persona zusammen, Mia, und ergänzt einen, der Kurse baut, Sven."),
        speech: [{ by: "dana", text: t("They differ in what they want, and each statement names its source.", "Sie unterscheiden sich in dem, was sie wollen, und jede Aussage nennt ihre Quelle.") }],
        tag: { tone: "teal", text: t("REWRITTEN FROM DATA", "AUS DATEN NEU GESCHRIEBEN") },
        means: t(
          "The next argument about a resume button is settled by asking what Mia would do.",
          "Der nächste Streit über einen Fortsetzen-Button wird geklärt, indem man fragt, was Mia tun würde.",
        ),
      },
      {
        art: "a2-3",
        scene: t("Priya gives three checks.", "Priya gibt drei Prüfungen."),
        speech: [{ by: "priya", text: t("A good persona rests on data, differs from the others and changes decisions. Two or three are usually enough.", "Eine gute Persona beruht auf Daten, unterscheidet sich von den anderen und ändert Entscheidungen. Zwei oder drei genügen meist.") }],
        tag: { tone: "teal", text: t("DATA · DIFFERENCE · DECISIONS", "DATEN · UNTERSCHIED · ENTSCHEIDUNGEN") },
        means: t(
          "Use the checks on every persona you write.",
          "Nutzen Sie die Prüfungen bei jeder Persona, die Sie schreiben.",
        ),
      },
      {
        art: "a2-4",
        scene: t("Priya warns about the opposite mistake.", "Priya warnt vor dem umgekehrten Fehler."),
        speech: [{ by: "priya", text: t("A persona for everyone is a persona for no one: designing for everyone means designing for no one.", "Eine Persona für alle ist eine Persona für niemanden: Für alle zu gestalten heißt, für niemanden zu gestalten.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "A useful persona stops a team from designing for everyone. Block 1.1 asks you to write a persona, and Block 3.1 asks you to choose which ones matter most.",
          "Eine nützliche Persona hält ein Team davon ab, für alle zu gestalten. Block 1.1 verlangt, eine Persona zu schreiben, und Block 3.1, zu wählen, welche am wichtigsten sind.",
        ),
      },
    ],
  },

  A3: {
    id: "d6-a3",
    pixel: true,
    title: t("Where Mia's journey breaks", "Wo Mias Journey bricht"),
    teaser: t("Three phases, one number each, and the lowest point.", "Drei Phasen, je eine Zahl, und der tiefste Punkt."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a3-1",
        scene: t("Mia takes a negotiation course on LearnLoop. She signs up in the evening and opens lesson 1 on her phone. She arrives with a goal and the first screens are clear.", "Mia macht einen Verhandlungskurs bei LearnLoop. Sie meldet sich abends an und öffnet Lektion 1 auf dem Handy. Sie kommt mit einem Ziel, und die ersten Bildschirme sind klar."),
        speech: [{ by: "mia", text: t("This looks clear. I know where to start.", "Das sieht klar aus. Ich weiß, wo ich anfange.") }],
        tag: { tone: "plain", text: t("PHASE 1 · ENTRY · EMOTION 4", "PHASE 1 · EINSTIEG · EMOTION 4") },
        means: t(
          "A user journey is the step-by-step experience of a user. Emotion is rated from 1 (very frustrated) to 5 (very motivated); here it is high, a 4.",
          "Eine User Journey ist die schrittweise Erfahrung einer Nutzerin. Die Emotion wird von 1 (sehr frustriert) bis 5 (sehr motiviert) bewertet; hier ist sie hoch, eine 4.",
        ),
      },
      {
        art: "a3-2",
        scene: t("In the learning phase a unit needs thirty minutes and she has twenty.", "In der Lernphase braucht eine Einheit dreißig Minuten, und sie hat zwanzig."),
        speech: [{ by: "mia", think: true, text: t("Thirty minutes. I only have twenty tonight.", "Dreißig Minuten. Ich habe heute Abend nur zwanzig.") }],
        tag: { tone: "plain", text: t("PHASE 2 · LEARNING · EMOTION 3", "PHASE 2 · LERNEN · EMOTION 3") },
        means: t(
          "The plan names three phases in a learning context: entry, learning, and progress and completion. The emotion sinks to 3.",
          "Der Plan nennt in einem Lernkontext drei Phasen: Einstieg, Lernen sowie Fortschritt und Abschluss. Die Emotion sinkt auf 3.",
        ),
      },
      {
        art: "a3-3",
        scene: t("Then Mia stops for three days. When she returns, she cannot find where she stopped.", "Dann pausiert Mia drei Tage. Als sie zurückkehrt, findet sie nicht, wo sie aufgehört hat."),
        speech: [{ by: "mia", think: true, text: t("Where was I? I give up and close the app.", "Wo war ich? Ich gebe auf und schließe die App.") }],
        tag: { tone: "plain", text: t("PHASE 3 · PROGRESS · EMOTION 1", "PHASE 3 · FORTSCHRITT · EMOTION 1") },
        means: t(
          "That is the lowest point, a 1, and the next thing she does is close the app.",
          "Das ist der tiefste Punkt, eine 1, und als Nächstes schließt sie die App.",
        ),
        look: t("the red dot at the bottom", "der rote Punkt unten"),
      },
      {
        art: "a3-4",
        scene: t("Priya reads the whole curve.", "Priya liest die ganze Kurve."),
        speech: [{ by: "priya", text: t("The break is not in one screen. It is in the step between visits.", "Der Bruch liegt nicht in einem Bildschirm. Er liegt im Schritt zwischen den Besuchen.") }],
        tag: { tone: "plain", text: t("A PAIN POINT BETWEEN VISITS", "EIN SCHMERZPUNKT ZWISCHEN DEN BESUCHEN") },
        means: t(
          "A journey map shows, for each phase, what the person does, what they think and how they feel, and marks the pain points.",
          "Eine Journey Map zeigt für jede Phase, was die Person tut, was sie denkt und wie sie sich fühlt, und markiert die Schmerzpunkte.",
        ),
      },
      {
        art: "a3-5",
        scene: t("Priya sums up where a team acts first.", "Priya fasst zusammen, wo ein Team zuerst handelt."),
        speech: [{ by: "priya", text: t("Act first where the curve is lowest, and say which pain point your measure answers. If the same phase is low for several personas, one fix can help them all.", "Handeln Sie zuerst dort, wo die Kurve am tiefsten ist, und sagen Sie, welchen Schmerzpunkt Ihre Maßnahme beantwortet. Ist dieselbe Phase für mehrere Personas tief, kann eine Lösung allen helfen.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "The emotional perspective shows where to act first. Block 1.2 asks you to analyse a journey: entry, usage and drop-out, to name the pain point each measure answers and to say which phase is critical.",
          "Die emotionale Perspektive zeigt, wo man zuerst handelt. Block 1.2 verlangt, eine Journey zu analysieren: Einstieg, Nutzung und Abbruch, den Schmerzpunkt zu nennen, den jede Maßnahme beantwortet, und zu sagen, welche Phase kritisch ist.",
        ),
      },
    ],
  },

  A4: {
    id: "d6-a4",
    pixel: true,
    title: t("The same platform, two views", "Dieselbe Plattform, zwei Sichten"),
    teaser: t("Mia wants to finish. Sven wants to build.", "Mia will abschließen. Sven will bauen."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a4-1",
        scene: t("Mia, the learner, first looks at where she stopped and what is next.", "Mia, die Lernende, schaut zuerst, wo sie aufgehört hat und was als Nächstes kommt."),
        speech: [{ by: "mia", text: t("I want to finish the course. Show me where I stopped.", "Ich will den Kurs abschließen. Zeigen Sie mir, wo ich aufgehört habe.") }],
        tag: { tone: "plain", text: t("THE LEARNER'S VIEW · ENTRY · LEARNING · PROGRESS", "SICHT DER LERNENDEN · EINSTIEG · LERNEN · FORTSCHRITT") },
        means: t(
          "The learner wants to finish. Her typical frustration is losing her place.",
          "Die Lernende will abschließen. Ihre typische Frustration ist, ihre Stelle zu verlieren.",
        ),
      },
      {
        art: "a4-2",
        scene: t("Sven, the teacher, first looks at who is stuck and how the course is doing. He wants to build and run a course with little effort.", "Sven, der Lehrende, schaut zuerst, wer feststeckt und wie der Kurs läuft. Er will einen Kurs mit wenig Aufwand bauen und betreiben."),
        speech: [{ by: "sven", think: true, text: t("Nine tabs in the editor, and I still cannot see who is stuck.", "Neun Tabs im Editor, und ich sehe immer noch nicht, wer feststeckt.") }],
        tag: { tone: "plain", text: t("THE TEACHER'S VIEW · SET UP · RUN · REVIEW", "SICHT DES LEHRENDEN · EINRICHTEN · BETREIBEN · AUSWERTEN") },
        means: t(
          "The teacher's typical frustration is an editor with too many tabs. The journey has different phases: set up, run, review.",
          "Die typische Frustration des Lehrenden ist ein Editor mit zu vielen Tabs. Seine Journey hat andere Phasen: einrichten, betreiben, auswerten.",
        ),
      },
      {
        art: "a4-3",
        scene: t("A platform that serves only one of them fails the other.", "Eine Plattform, die nur eine von ihnen bedient, lässt die andere im Stich."),
        speech: [{ by: "priya", text: t("The organisation sees it as low usage. Each group needs its own persona and its own journey.", "Die Organisation sieht es als geringe Nutzung. Jede Gruppe braucht ihre eigene Persona und ihre eigene Journey.") }],
        tag: { tone: "plain", text: t("ONE SERVED · ONE FAILED", "EINE BEDIENT · EINE ENTTÄUSCHT") },
        means: t(
          "The plan stresses that learners and teachers have different perspectives.",
          "Der Plan betont, dass Lernende und Lehrende unterschiedliche Perspektiven haben.",
        ),
      },
      {
        art: "a4-4",
        scene: t("Priya shows the two journeys side by side.", "Priya zeigt die beiden Journeys nebeneinander."),
        speech: [{ by: "priya", text: t("One persona and one journey per group.", "Eine Persona und eine Journey pro Gruppe.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "The case-study block, Block 2.1, shows how far apart different users can be and asks for one persona and one journey per group.",
          "Der Fallstudien-Block, Block 2.1, zeigt, wie weit verschiedene Nutzer auseinanderliegen können, und verlangt eine Persona und eine Journey pro Gruppe.",
        ),
      },
    ],
  },

  A5: {
    id: "d6-a5",
    pixel: true,
    title: t("Three measures for one pain point", "Drei Maßnahmen für einen Schmerzpunkt"),
    teaser: t("LearnLoop has three months and three measures to weigh.", "LearnLoop hat drei Monate und drei Maßnahmen zum Abwägen."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "a5-1",
        scene: t("Mia falls into frustration at one point: when she returns after three days and cannot find where she stopped. LearnLoop has three months and three measures on the table.", "Mia fällt an einem Punkt in Frustration: wenn sie nach drei Tagen zurückkehrt und nicht findet, wo sie aufgehört hat. LearnLoop hat drei Monate und drei Maßnahmen auf dem Tisch."),
        speech: [{ by: "priya", text: t("We rate each on user impact, effort and risk. Effort is how much work and how many people a measure needs, and we say why.", "Wir bewerten jede nach Nutzerwirkung, Aufwand und Risiko. Aufwand ist, wie viel Arbeit und wie viele Personen eine Maßnahme braucht, und wir sagen, warum.") }],
        tag: { tone: "plain", text: t("3 MEASURES · 3 QUESTIONS", "3 MASSNAHMEN · 3 FRAGEN") },
        means: t(
          "User impact asks how much a measure helps the persona at a pain point, and how many people that persona stands for. Risk asks what could go wrong or be lost.",
          "Nutzerwirkung fragt, wie sehr eine Maßnahme der Persona an einem Schmerzpunkt hilft und für wie viele Menschen diese Persona steht. Risiko fragt, was schiefgehen oder verloren gehen kann.",
        ),
      },
      {
        art: "a5-2",
        scene: t("Measure 1: a resume button on every screen. It is one small change on every screen.", "Maßnahme 1: ein Fortsetzen-Button auf jedem Bildschirm. Er ist eine kleine Änderung auf jedem Bildschirm."),
        speech: [{ by: "priya", text: t("Effort Low: a small change by one person. It removes Mia's lowest point, and many learners return after a break. It is a small addition that can be undone.", "Aufwand Niedrig: eine kleine Änderung durch eine Person. Er beseitigt Mias tiefsten Punkt, und viele Lernende kehren nach einer Pause zurück. Er ist eine kleine Ergänzung, die sich zurücknehmen lässt.") }],
        tag: { tone: "teal", text: t("IMPACT HIGH · EFFORT LOW · RISK LOW", "WIRKUNG HOCH · AUFWAND NIEDRIG · RISIKO NIEDRIG") },
        means: t(
          "It answers Mia's lowest point exactly.",
          "Er beantwortet Mias tiefsten Punkt genau.",
        ),
      },
      {
        art: "a5-3",
        scene: t("Measure 2: five-minute learning formats. The content has to be rebuilt.", "Maßnahme 2: Fünf-Minuten-Lernformate. Die Inhalte müssen neu gebaut werden."),
        speech: [{ by: "priya", think: true, text: t("Effort High. They fit the time-poor learner a lot, but content must be rebuilt and that keeps a team busy for a long time.", "Aufwand Hoch. Sie passen sehr gut zu Lernenden mit wenig Zeit, aber Inhalte müssen neu gebaut werden, und das beschäftigt ein Team lange.") }],
        tag: { tone: "plain", text: t("IMPACT HIGH · EFFORT HIGH · RISK MID", "WIRKUNG HOCH · AUFWAND HOCH · RISIKO MITTEL") },
        means: t(
          "A good fit for the persona, with a real cost and some risk.",
          "Eine gute Passung für die Persona, mit echten Kosten und etwas Risiko.",
        ),
      },
      {
        art: "a5-4",
        scene: t("Measure 3: a new course editor for teachers. It is a large build.", "Maßnahme 3: ein neuer Kurseditor für Lehrende. Er ist ein großer Bau."),
        speech: [{ by: "priya", think: true, text: t("It does nothing for Mia's critical point, so its impact on this persona is Low. For teachers it could be High. That is why you must say whom a measure is for.", "Er tut nichts für Mias kritischen Punkt, seine Wirkung auf diese Persona ist also Niedrig. Für Lehrende könnte sie Hoch sein. Deshalb müssen Sie sagen, für wen eine Maßnahme ist.") }],
        tag: { tone: "plain", text: t("IMPACT LOW FOR MIA · EFFORT HIGH · RISK MID", "WIRKUNG NIEDRIG FÜR MIA · AUFWAND HOCH · RISIKO MITTEL") },
        means: t(
          "A large project for a smaller group.",
          "Ein großes Projekt für eine kleinere Gruppe.",
        ),
      },
      {
        art: "a5-5",
        scene: t("Priya sums up how to rate.", "Priya fasst zusammen, wie man bewertet."),
        speech: [{ by: "priya", text: t("Rate a measure for a named persona at a named pain point, and say how many people that persona stands for.", "Bewerten Sie eine Maßnahme für eine genannte Persona an einem genannten Schmerzpunkt und sagen Sie, für wie viele Menschen diese Persona steht.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Name the pain point and the phase in your own answer. Block 1.2 and Block 2.1 ask you to weigh measures this way.",
          "Nennen Sie den Schmerzpunkt und die Phase in Ihrer eigenen Antwort. Block 1.2 und Block 2.1 verlangen, Maßnahmen so abzuwägen.",
        ),
      },
    ],
  },

  B1: {
    id: "d6-b1",
    pixel: true,
    title: t("The biggest group is not always the most important", "Die größte Gruppe ist nicht immer die wichtigste"),
    teaser: t("LearnLoop has five segments and has to choose.", "LearnLoop hat fünf Segmente und muss wählen."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "b1-1",
        scene: t("LearnLoop has five user segments. The time-poor learners are by far the largest, about 5,000, so most people would start there.", "LearnLoop hat fünf Nutzersegmente. Die Lernenden mit wenig Zeit sind mit Abstand die größten, etwa 5.000, die meisten würden also dort anfangen."),
        speech: [{ by: "dana", text: t("They are a strong candidate, because their journey breaks when they return after a break. That is where a fix pays off.", "Sie sind ein starker Kandidat, weil ihre Journey bricht, wenn sie nach einer Pause zurückkehren. Dort lohnt sich eine Lösung.") }],
        tag: { tone: "plain", text: t("A · THE LARGEST SEGMENT", "A · DAS GRÖSSTE SEGMENT") },
        means: t(
          "A platform serves several user segments. Which one deserves the most attention? Three questions help.",
          "Eine Plattform bedient mehrere Nutzersegmente. Welches verdient die meiste Aufmerksamkeit? Drei Fragen helfen.",
        ),
        look: t("point A, far to the right", "Punkt A, weit rechts"),
      },
      {
        art: "b1-2",
        scene: t("But sixty training managers renew the licences for those 5,000 learners, and the teachers supply every course.", "Aber sechzig Weiterbildungsleiter verlängern die Lizenzen für diese 5.000 Lernenden, und die Lehrenden liefern jeden Kurs."),
        speech: [{ by: "petra", text: t("We are a tiny group. But if we leave, losing us costs more than losing a thousand learners.", "Wir sind eine winzige Gruppe. Aber wenn wir gehen, kostet es mehr, uns zu verlieren, als tausend Lernende zu verlieren.") }],
        tag: { tone: "plain", text: t("C AND D · SMALL BUT CRITICAL", "C UND D · KLEIN, ABER KRITISCH") },
        means: t(
          "A small segment can be the most critical: sixty training managers decide more of the business than all the learners together.",
          "Ein kleines Segment kann das kritischste sein: Sechzig Weiterbildungsleiter entscheiden über mehr vom Geschäft als alle Lernenden zusammen.",
        ),
        look: t("points C and D, high up on the left", "Punkte C und D, oben links"),
      },
      {
        art: "b1-3",
        scene: t("Dana gives the team three tests.", "Dana gibt dem Team drei Prüfungen."),
        speech: [{ by: "dana", text: t("How large is the segment, what is it worth to the business, and where does its journey break? And say which test decided.", "Wie groß ist das Segment, was ist es dem Unternehmen wert, und wo bricht seine Journey? Und sagen Sie, welche Prüfung entschieden hat.") }],
        tag: { tone: "teal", text: t("THREE TESTS", "DREI PRÜFUNGEN") },
        means: t(
          "The positions on the picture are a reading of this example, not a score.",
          "Die Positionen im Bild sind eine Lesart dieses Beispiels, keine Note.",
        ),
      },
      {
        art: "b1-4",
        scene: t("Dana pins the picture to the wall.", "Dana hängt das Bild an die Wand."),
        speech: [{ by: "dana", text: t("Choose two or three strategic personas, and write which test decided.", "Wählen Sie zwei oder drei strategische Personas und schreiben Sie, welche Prüfung entschieden hat.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Block 3.1 asks you to choose two or three strategic personas, to select the most important target group and to name its three biggest problems.",
          "Block 3.1 verlangt, zwei oder drei strategische Personas zu wählen, die wichtigste Zielgruppe auszuwählen und ihre drei größten Probleme zu nennen.",
        ),
      },
    ],
  },

  B2: {
    id: "d6-b2",
    pixel: true,
    title: t("Designing for everyone serves no one", "Für alle zu gestalten dient niemandem"),
    teaser: t("Learners and teachers want different things.", "Lernende und Lehrende wollen Verschiedenes."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "b2-1",
        scene: t("At LearnLoop, learners and teachers want different things. The first plan is to satisfy both completely on one screen.", "Bei LearnLoop wollen Lernende und Lehrende Verschiedenes. Der erste Plan ist, beide auf einem Bildschirm vollständig zufriedenzustellen."),
        speech: [{ by: "mia", think: true, text: t("A resume card, nine editor tabs and a badge wall, all at once. It is crowded and slow.", "Eine Fortsetzen-Karte, neun Editor-Tabs und eine Badge-Wand, alles auf einmal. Es ist voll und langsam.") }],
        tag: { tone: "plain", text: t("DESIGN FOR EVERYONE", "FÜR ALLE GESTALTEN") },
        means: t(
          "Neither group gets what it came for: designing for everyone has served no one.",
          "Keine der Gruppen bekommt, wofür sie gekommen ist: Für alle zu gestalten hat niemandem gedient.",
        ),
      },
      {
        art: "b2-2",
        scene: t("The second plan names the learners as the primary segment and fixes their journey first. The teachers are told they get their turn in the third quarter.", "Der zweite Plan benennt die Lernenden als primäres Segment und behebt zuerst ihre Journey. Die Lehrenden erfahren, dass sie im dritten Quartal an der Reihe sind."),
        speech: [{ by: "sven", text: t("Now I know when to expect mine. That keeps my trust.", "Jetzt weiß ich, wann ich meins erwarten kann. Das erhält mein Vertrauen.") }],
        tag: { tone: "teal", text: t("A PRIMARY SEGMENT · A DATE FOR THE OTHER", "EIN PRIMÄRES SEGMENT · EIN TERMIN FÜR DAS ANDERE") },
        means: t(
          "The learners have a clean screen, and the teachers know when to expect theirs. A strategy says what the others give up.",
          "Die Lernenden haben einen klaren Bildschirm, und die Lehrenden wissen, wann sie ihren erwarten können. Eine Strategie sagt, worauf die anderen verzichten.",
        ),
      },
      {
        art: "b2-3",
        scene: t("The best plan shares what is common: one clear course outline that both groups see. It separates only what truly differs: the home screen and the tools.", "Der beste Plan teilt, was gemeinsam ist: eine klare Kursübersicht, die beide Gruppen sehen. Er trennt nur, was sich wirklich unterscheidet: den Startbildschirm und die Werkzeuge."),
        speech: [{ by: "priya", text: t("One outline serves both groups, and each still gets a screen that fits.", "Eine Übersicht dient beiden Gruppen, und jede bekommt trotzdem einen Bildschirm, der passt.") }],
        tag: { tone: "teal", text: t("SHARE WHAT IS COMMON", "TEILEN, WAS GEMEINSAM IST") },
        means: t(
          "Press the three plans yourself on the card to compare what each gives and costs.",
          "Drücken Sie die drei Pläne auf der Karte selbst, um zu vergleichen, was jeder bringt und kostet.",
        ),
      },
      {
        art: "b2-4",
        scene: t("Dana sums up what a strategy does.", "Dana fasst zusammen, was eine Strategie tut."),
        speech: [{ by: "dana", text: t("Pick a primary segment, serve the others as far as it does not harm the primary one, and say what the others give up.", "Wählen Sie ein primäres Segment, bedienen Sie die anderen, soweit es dem primären nicht schadet, und sagen Sie, worauf die anderen verzichten.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "Block 3.1 asks you to select the most important target group and to prioritise an optimisation strategy. This card gives you the argument.",
          "Block 3.1 verlangt, die wichtigste Zielgruppe auszuwählen und eine Optimierungsstrategie zu priorisieren. Diese Karte gibt Ihnen das Argument.",
        ),
      },
    ],
  },

  B3: {
    id: "d6-b3",
    pixel: true,
    title: t("Personas are hypotheses", "Personas sind Hypothesen"),
    teaser: t("LearnLoop must choose a priority with thin data.", "LearnLoop muss mit dünnen Daten eine Priorität wählen."),
    note: NOTE,
    names: NAMES,
    panels: [
      {
        art: "b3-1",
        scene: t("LearnLoop must choose a priority although its data is thin. Mia rests on twelve interviews and the usage logs, Sven on four interviews, Petra on two conversations.", "LearnLoop muss eine Priorität wählen, obwohl die Daten dünn sind. Mia beruht auf zwölf Interviews und den Nutzungslogs, Sven auf vier Interviews, Petra auf zwei Gesprächen."),
        speech: [{ by: "priya", text: t("The less evidence a persona has, the more it is a hypothesis. So each persona is labelled with how much it rests on, and what would change it.", "Je weniger Belege eine Persona hat, desto mehr ist sie eine Hypothese. Darum wird jede Persona damit beschriftet, worauf sie beruht und was sie ändern würde.") }],
        tag: { tone: "plain", text: t("12 · 4 · 2", "12 · 4 · 2") },
        means: t(
          "Personas written from thin data are hypotheses; the decision should include how you will test them.",
          "Personas, die aus dünnen Daten geschrieben sind, sind Hypothesen; die Entscheidung sollte einschließen, wie Sie sie testen werden.",
        ),
      },
      {
        art: "b3-2",
        scene: t("LearnLoop prioritises Mia for two quarters, then looks at the figures again. The alternative is to rebuild the whole platform around Mia now.", "LearnLoop priorisiert Mia für zwei Quartale und schaut dann die Zahlen erneut an. Die Alternative ist, die ganze Plattform jetzt um Mia herum neu zu bauen."),
        speech: [{ by: "dana", text: t("If we are wrong, the cost is two quarters of work, and the others know their turn is coming. A full rebuild is hard to undo.", "Wenn wir falschliegen, sind es zwei Quartale Arbeit, und die anderen wissen, dass ihre Zeit kommt. Ein vollständiger Umbau ist schwer rückgängig zu machen.") }],
        tag: { tone: "teal", text: t("A REVERSIBLE PRIORITY", "EINE UMKEHRBARE PRIORITÄT") },
        means: t(
          "With thin data choose the step you can test, write down what would change your mind, and keep the personas as hypotheses.",
          "Wählen Sie bei dünnen Daten den Schritt, den Sie testen können, schreiben Sie auf, was Sie umstimmen würde, und behalten Sie die Personas als Hypothesen.",
        ),
      },
      {
        art: "b3-3",
        scene: t("Dana states the decision in four parts.", "Dana nennt die Entscheidung in vier Teilen."),
        speech: [{ by: "dana", text: t("I decide: Mia is the prioritised persona for two quarters. I do not know whether learners leave for lack of time or lack of a place marker. I reverse if the seven-day return rate is not up eight points after ten weeks, or the churn of the waiting teachers doubles. I give up the new course editor this half year.", "Ich entscheide: Mia ist zwei Quartale lang die priorisierte Persona. Ich weiß nicht, ob Lernende wegen fehlender Zeit oder fehlender Stellenmarke gehen. Ich nehme zurück, wenn die Rückkehrrate nach sieben Tagen nach zehn Wochen nicht um acht Punkte gestiegen ist oder die Abwanderung der wartenden Lehrenden sich verdoppelt. Ich verzichte in diesem Halbjahr auf den neuen Kurseditor.") }],
        tag: { tone: "plain", text: t("DECIDE · UNKNOWN · REVERSE IF · GIVE UP", "ENTSCHEIDEN · UNBEKANNT · ZURÜCKNEHMEN, WENN · VERZICHT") },
        means: t(
          "The four boxes make a decision checkable. The teachers get their turn in the third quarter.",
          "Die vier Kästen machen eine Entscheidung überprüfbar. Die Lehrenden kommen im dritten Quartal an die Reihe.",
        ),
      },
      {
        art: "b3-4",
        scene: t("Priya writes down the rule for future persona decisions.", "Priya schreibt die Regel für künftige Persona-Entscheidungen auf."),
        speech: [{ by: "priya", text: t("The head of product decides with the UX lead, on evidence: interviews per persona, usage per segment and renewal data.", "Die Leiterin Produkt entscheidet mit der UX-Leiterin, auf Grundlage von Belegen: Interviews pro Persona, Nutzung pro Segment und Verlängerungsdaten.") }],
        tag: { tone: "ink", text: t("THE RULE", "DIE REGEL") },
        means: t(
          "A rule makes future persona decisions less dependent on one person's favourite. Block 3.1 asks for a decision under uncertainty for a platform with limited data, and such a rule.",
          "Eine Regel macht künftige Persona-Entscheidungen weniger vom Liebling einer Person abhängig. Block 3.1 verlangt eine Entscheidung unter Unsicherheit für eine Plattform mit begrenzten Daten und eine solche Regel.",
        ),
      },
    ],
  },
}) as Record<MaterialId, Comic>;
