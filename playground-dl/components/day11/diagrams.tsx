"use client";

import { ActivityMock, LessonGameMock, MeasureThumb, MotivMock, NeedsMock, PrinciplesMock } from "@/components/day11/mocks";
import type { LessonOn } from "@/components/day11/mocks";
import { MatrixStory, StateFig, SwitchFig, WeighFig } from "@/components/dayGen/figs";
import { ChainFig, DecisionFrameFig } from "@/components/materi/figures";
import { GEN } from "@/data/day11/gen";
import { effortBandOf } from "@/lib/dayGen/model";
import { euro, tt } from "@/lib/lang";

/**
 * Day 11 · the teaching diagrams of Materi A and B. Example company: LearnLoop, an online-course provider; never GameLearn, so no task is answered here. Interactive ones
 * carry "The point", "Walk me through it" and an always-visible "What this shows" (CLAUDE.md #20, #36, #51); the static ones are drawn pictures (#52).
 */

/* ------------------------------------------------------------------ A1 · a lesson screen that gains game elements (interactive) */

export function ElementsFig() {
  return (
    <SwitchFig
      label={tt("One LearnLoop lesson screen and four game elements · Exploratory · Case assumption", "Ein LearnLoop-Lektionsbildschirm und vier Spielelemente · Explorativ · Fallannahme")}
      point={tt("Gamification means using elements from games, such as points, badges, a leaderboard and a progress bar, in something that is not a game. Each element does something different: a point rewards an action, a badge marks an achievement, a leaderboard compares people, and a progress bar shows how far someone has come.", "Gamification heißt, Elemente aus Spielen, etwa Punkte, Abzeichen, eine Rangliste und einen Fortschrittsbalken, in etwas einzusetzen, das kein Spiel ist. Jedes Element tut etwas anderes: Ein Punkt belohnt eine Handlung, ein Abzeichen markiert eine Leistung, eine Rangliste vergleicht Menschen, und ein Fortschrittsbalken zeigt, wie weit jemand gekommen ist.")}
      switches={[
        { id: "points", label: tt("Points", "Punkte") },
        { id: "badges", label: tt("Badges", "Abzeichen") },
        { id: "board", label: tt("Leaderboard", "Rangliste") },
        { id: "progress", label: tt("Progress bar", "Fortschrittsbalken") },
      ]}
      start={{ points: false, badges: false, board: false, progress: false }}
      picture={(on) => <LessonGameMock on={on as unknown as LessonOn} />}
      insight={(on) => {
        const n = [on.points, on.badges, on.board, on.progress].filter(Boolean).length;
        return tt(
          `In plain words: ${n} of the 4 elements are on. ${on.points ? "Points reward every action, whatever it was." : "No points: nothing is counted."} ${on.badges ? "Badges mark things the learner has done." : ""} ${on.board ? "The leaderboard compares Kim with everyone else." : ""} ${on.progress ? "The bar says what has been mastered, which is about the learning itself." : "Nothing shows how much has been learned."}`,
          `In einfachen Worten: ${n} von 4 Elementen sind an. ${on.points ? "Punkte belohnen jede Handlung, egal welche." : "Keine Punkte: Nichts wird gezählt."} ${on.badges ? "Abzeichen markieren, was die Lernende getan hat." : ""} ${on.board ? "Die Rangliste vergleicht Kim mit allen anderen." : ""} ${on.progress ? "Der Balken sagt, was gemeistert wurde, und handelt vom Lernen selbst." : "Nichts zeigt, wie viel gelernt wurde."}`,
        );
      }}
      steps={[
        { title: tt("A plain lesson", "Eine schlichte Lektion"), say: tt("Let us follow Kim, a learner at LearnLoop, who opens a lesson on anchoring in negotiation. The screen has the lesson text and nothing else, so Kim reads, answers and leaves without any sign of what she has achieved. Nothing is counted and nothing is compared.", "Begleiten wir Kim, eine Lernende bei LearnLoop, die eine Lektion über Anker beim Verhandeln öffnet. Der Bildschirm hat den Lektionstext und sonst nichts, Kim liest also, antwortet und geht, ohne ein Zeichen, was sie erreicht hat. Nichts wird gezählt, nichts verglichen."), look: tt("the screen with no game element", "der Bildschirm ohne Spielelement"), on: { points: false, badges: false, board: false, progress: false } },
        { title: tt("Four elements added", "Vier Elemente ergänzt"), say: tt("Now LearnLoop adds all four elements. Points reward every action, badges mark what Kim has done, a leaderboard compares her with everyone, and a bar shows the objectives she has mastered. The elements look alike but do different jobs, and only the bar says anything about what she has learned.", "Jetzt ergänzt LearnLoop alle vier Elemente. Punkte belohnen jede Handlung, Abzeichen markieren, was Kim getan hat, eine Rangliste vergleicht sie mit allen, und ein Balken zeigt die Ziele, die sie gemeistert hat. Die Elemente sehen ähnlich aus, tun aber verschiedene Dinge, und nur der Balken sagt etwas darüber, was sie gelernt hat."), look: tt("the points, badges, leaderboard and the bar", "die Punkte, die Abzeichen, die Rangliste und der Balken"), on: { points: true, badges: true, board: true, progress: true } },
        { title: tt("Which one matters", "Welches zählt"), say: tt("So gamification is a set of separate elements, and each is worth judging on its own: what does it reward, and does that help learning? Press the four switches to add and remove them. Day 11's task asks you to judge exactly this for GameLearn.", "Gamification ist also eine Menge einzelner Elemente, und jedes ist für sich zu beurteilen: Was belohnt es, und hilft das dem Lernen? Drücken Sie die vier Schalter, um sie hinzuzufügen und zu entfernen. Die Aufgabe von Tag 11 verlangt genau diese Beurteilung für GameLearn."), look: tt("the bar, which is the only one about learning", "der Balken, der als einziger vom Lernen handelt"), on: { points: false, badges: false, board: false, progress: true } },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · Kim with a prize, without it, with interest (interactive) */

export function MotivationFig() {
  return (
    <StateFig
      label={tt("The same learner with a prize, without it and with interest · Exploratory · Case assumption", "Dieselbe Lernende mit einem Preis, ohne ihn und mit Interesse · Explorativ · Fallannahme")}
      point={tt("Extrinsic motivation pushes from outside, with a reward or a penalty, and it fades when the reward is gone. Intrinsic motivation comes from interest in the thing itself, and it lasts. A reward can even crowd out interest that was already there.", "Extrinsische Motivation treibt von außen an, mit einer Belohnung oder einer Strafe, und sie verblasst, wenn die Belohnung wegfällt. Intrinsische Motivation kommt aus dem Interesse an der Sache selbst, und sie hält. Eine Belohnung kann sogar Interesse verdrängen, das schon da war.")}
      states={[
        { id: "prize", button: tt("With a prize", "Mit einem Preis"), picture: <MotivMock kind="prize" />, insight: tt("In plain words: Kim studies because a prize hangs in front of her. She works hard, but what drives her is the prize, not the topic.", "In einfachen Worten: Kim lernt, weil ein Preis vor ihr hängt. Sie arbeitet hart, aber was sie antreibt, ist der Preis, nicht das Thema.") },
        { id: "gone", button: tt("The prize is gone", "Der Preis ist weg"), picture: <MotivMock kind="gone" />, insight: tt("In plain words: the prize ends, and Kim puts her book down. The reward pushed her, and when it stopped, so did she. That is how extrinsic motivation fades.", "In einfachen Worten: Der Preis endet, und Kim legt ihr Buch weg. Die Belohnung hat sie angetrieben, und als sie aufhörte, hörte auch sie auf. So verblasst extrinsische Motivation.") },
        { id: "interest", button: tt("With interest", "Mit Interesse"), picture: <MotivMock kind="interest" />, insight: tt("In plain words: Kim studies because she wants to know how it works. There is no prize, and she carries on. Interest in the content lasts without a reward.", "In einfachen Worten: Kim lernt, weil sie wissen will, wie es funktioniert. Es gibt keinen Preis, und sie macht weiter. Interesse am Inhalt hält ohne Belohnung.") },
      ]}
      steps={[
        { title: tt("A prize", "Ein Preis"), say: tt("Let us follow Kim, a learner at LearnLoop, who studies hard during a month in which the platform offers a prize for the most points. She is active every evening, and it looks like a success. But the prize is the reason she studies, not the topic.", "Begleiten wir Kim, eine Lernende bei LearnLoop, die in einem Monat fleißig lernt, in dem die Plattform einen Preis für die meisten Punkte ausgelobt hat. Sie ist jeden Abend aktiv, und es sieht nach einem Erfolg aus. Aber der Preis ist der Grund, warum sie lernt, nicht das Thema."), look: tt("the prize in front of Kim", "der Preis vor Kim") },
        { title: tt("The prize ends", "Der Preis endet"), say: tt("Then the month ends and the prize is gone. Kim puts her book down and asks why she should keep going. The reward pushed her from outside, and nothing inside her was keeping her at it, so the activity stops at once.", "Dann endet der Monat, und der Preis ist weg. Kim legt ihr Buch hin und fragt, warum sie weitermachen sollte. Die Belohnung hat sie von außen angetrieben, und nichts in ihr hielt sie bei der Sache, die Aktivität hört also sofort auf."), look: tt("the empty circle and the book put down", "der leere Kreis und das weggelegte Buch") },
        { title: tt("Interest", "Interesse"), say: tt("Compare a topic that makes Kim curious, such as a story case about a real negotiation. She keeps going with no prize at all. That is intrinsic motivation, and it is the kind that lasts. Press the three buttons to compare, and note the three needs in the table below.", "Vergleichen Sie ein Thema, das Kim neugierig macht, etwa einen Fall aus einer echten Verhandlung. Sie macht ganz ohne Preis weiter. Das ist intrinsische Motivation, und es ist die, die hält. Drücken Sie die drei Schaltflächen zum Vergleichen und beachten Sie die drei Bedürfnisse in der Tabelle darunter."), look: tt("Kim studying with no prize", "Kim beim Lernen ohne Preis") },
      ]}
      stepStates={["prize", "gone", "interest"]}
      caption={<NeedsMock />}
    />
  );
}

/* ------------------------------------------------------------------ A3 · activity against learning for three set-ups (interactive) */

export function ActivityFig() {
  return (
    <StateFig
      label={tt("The same LearnLoop platform in three set-ups: activity against learning · Exploratory · Case assumption", "Dieselbe LearnLoop-Plattform in drei Varianten: Aktivität gegen Lernen · Explorativ · Fallannahme")}
      point={tt("Activity is not learning. Points for logging in raise logins and clicks, and teach almost nothing. A progress display tied to objectives rewards learning itself. Switching on everything raises activity further and still does not raise learning.", "Aktivität ist nicht Lernen. Punkte fürs Anmelden erhöhen Anmeldungen und Klicks und lehren fast nichts. Eine Fortschrittsanzeige, die an Ziele gebunden ist, belohnt das Lernen selbst. Alles einzuschalten hebt die Aktivität weiter und das Lernen trotzdem nicht.")}
      states={[
        { id: "login", button: tt("Points for logging in", "Punkte fürs Anmelden"), picture: <ActivityMock kind="login" />, insight: tt("In plain words: the platform is very busy, with lots of logins, but few objectives are mastered. The points reward showing up, so learners show up.", "In einfachen Worten: Die Plattform ist sehr geschäftig, mit vielen Anmeldungen, aber wenige Ziele werden gemeistert. Die Punkte belohnen das Erscheinen, also erscheinen die Lernenden.") },
        { id: "objectives", button: tt("Progress by objectives", "Fortschritt nach Zielen"), picture: <ActivityMock kind="objectives" />, insight: tt("In plain words: fewer logins, but about as many objectives mastered. The bar rewards what was learned, so activity and learning move together.", "In einfachen Worten: weniger Anmeldungen, aber etwa ebenso viele gemeisterte Ziele. Der Balken belohnt, was gelernt wurde, Aktivität und Lernen bewegen sich also gemeinsam.") },
        { id: "everything", button: tt("Everything switched on", "Alles eingeschaltet"), picture: <ActivityMock kind="everything" />, insight: tt("In plain words: points, badges, a leaderboard and a streak push activity to its highest, yet learning stays low. More game elements are not more learning.", "In einfachen Worten: Punkte, Abzeichen, Rangliste und Streak treiben die Aktivität auf den Höchststand, doch das Lernen bleibt niedrig. Mehr Spielelemente sind nicht mehr Lernen.") },
      ]}
      steps={[
        { title: tt("Busy, not learning", "Beschäftigt, nicht lernend"), say: tt("Let us look at LearnLoop again. It gives 10 points for every login, and logins double within a week. The team is delighted, but only a few more objectives are mastered. The platform rewards the activity around learning, so that is what it gets.", "Sehen wir uns LearnLoop noch einmal an. Es gibt 10 Punkte für jede Anmeldung, und die Anmeldungen verdoppeln sich binnen einer Woche. Das Team freut sich, doch nur wenige Ziele mehr werden gemeistert. Die Plattform belohnt die Aktivität drumherum, also bekommt sie die."), look: tt("the long top bar and the short bottom bar", "der lange obere und der kurze untere Balken") },
        { title: tt("Reward the learning", "Das Lernen belohnen"), say: tt("Now LearnLoop shows progress per objective instead. Logins are lower, but each one counts, because the bar only moves when something is mastered. Activity and learning are now about the same length, and that is the aim.", "Jetzt zeigt LearnLoop stattdessen den Fortschritt je Ziel. Die Anmeldungen sind niedriger, aber jede zählt, denn der Balken bewegt sich nur, wenn etwas gemeistert wird. Aktivität und Lernen sind nun etwa gleich lang, und das ist das Ziel."), look: tt("the two bars of about the same length", "die beiden Balken etwa gleicher Länge") },
        { title: tt("More is not better", "Mehr ist nicht besser"), say: tt("A third idea switches on everything at once. Activity reaches its highest, and learning is still low. So the rule is to ask of each element what it rewards, and to keep the ones that reward learning. Press the three buttons to compare.", "Eine dritte Idee schaltet alles auf einmal ein. Die Aktivität erreicht ihren Höchststand, und das Lernen ist immer noch niedrig. Die Regel lautet also, bei jedem Element zu fragen, was es belohnt, und die zu behalten, die das Lernen belohnen. Drücken Sie die drei Schaltflächen zum Vergleichen."), look: tt("the top bar at its longest", "der obere Balken in voller Länge") },
      ]}
      stepStates={["login", "objectives", "everything"]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · principles of meaningful gamification (static) */

export function PrinciplesFig() {
  return <PrinciplesMock />;
}

/* ------------------------------------------------------------------ A5 · LearnLoop weighs three measures (interactive) */

const LL = { budget: 30000, points: 16000, progress: 6000, content: 12000 };

export function WeighExample() {
  const band = effortBandOf(GEN);
  const L = (n: number) => [tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")][n - 1];
  return (
    <WeighFig
      label={tt("A worked example: LearnLoop weighs three gamification measures · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei Gamification-Maßnahmen ab · Explorativ")}
      point={tt("Rate a measure by how long it keeps learners going, by its printed cost, and by what could go wrong. A points system looks lively but carries the highest risk, because learners chase the reward. Progress by objectives is cheap and supports learning.", "Bewerten Sie eine Maßnahme danach, wie lange sie Lernende bei der Sache hält, nach ihren gedruckten Kosten und danach, was schiefgehen kann. Ein Punktesystem wirkt lebendig, trägt aber das höchste Risiko, weil Lernende der Belohnung nachjagen. Fortschritt nach Zielen ist günstig und stützt das Lernen.")}
      company="LearnLoop"
      budget={LL.budget}
      bands={[{ to: 7000, label: tt("Low", "Niedrig") }, { to: 14000, label: tt("Mid", "Mittel") }, { to: null, label: tt("High", "Hoch") }]}
      band={band}
      impactLabel={tt("Motivation", "Motivation")}
      items={[
        { id: "w1", name: tt("A points system for every action", "Ein Punktesystem für jede Handlung"), cost: LL.points, thumb: <MeasureThumb kind="points" />, impact: { level: 2, reason: tt("Points lift activity at once, but the lift fades when the novelty is over.", "Punkte heben die Aktivität sofort, der Schub verblasst aber, wenn der Reiz des Neuen vorbei ist.") }, effortReason: tt(`${euro(LL.points)} is above ${euro(14000)}: ${L(band(LL.points))}.`, `${euro(LL.points)} liegen über ${euro(14000)}: ${L(band(LL.points))}.`), risk: { level: 3, reason: tt("Learners learn to chase the points and the content becomes an afterthought.", "Lernende lernen, den Punkten nachzujagen, und der Inhalt wird zur Nebensache.") } },
        { id: "w2", name: tt("Progress by objectives", "Fortschritt nach Zielen"), cost: LL.progress, thumb: <MeasureThumb kind="progress" />, impact: { level: 3, reason: tt("Learners see what they have mastered, which feeds the need to feel competent and lasts.", "Lernende sehen, was sie gemeistert haben, was das Bedürfnis nährt, sich kompetent zu fühlen, und hält.") }, effortReason: tt(`${euro(LL.progress)} is under ${euro(7000)}: ${L(band(LL.progress))}.`, `${euro(LL.progress)} liegen unter ${euro(7000)}: ${L(band(LL.progress))}.`), risk: { level: 1, reason: tt("It rewards learning itself, so there is little to game.", "Es belohnt das Lernen selbst, also gibt es wenig zu umgehen.") } },
        { id: "w3", name: tt("Rewrite the content around real cases", "Den Inhalt um echte Fälle neu schreiben"), cost: LL.content, thumb: <MeasureThumb kind="story" />, impact: { level: 2, reason: tt("It builds interest in the topic, which lasts, but it works more slowly.", "Es baut Interesse am Thema auf, das hält, wirkt aber langsamer.") }, effortReason: tt(`${euro(LL.content)} lies between ${euro(7000)} and ${euro(14000)}: ${L(band(LL.content))}.`, `${euro(LL.content)} liegen zwischen ${euro(7000)} und ${euro(14000)}: ${L(band(LL.content))}.`), risk: { level: 1, reason: tt("It adds interest and takes nothing away.", "Es ergänzt Interesse und nimmt nichts weg.") } },
      ]}
      steps={[
        { title: tt("The setting", "Die Ausgangslage"), say: tt(`Let us look at LearnLoop once more. Learners drop out early, the budget is ${euro(LL.budget)}, and three ideas are on the table. We rate each on three questions: how long it keeps learners going (motivation), what it costs (effort), and what could go wrong (risk).`, `Sehen wir uns LearnLoop noch einmal an. Lernende brechen früh ab, das Budget beträgt ${euro(LL.budget)}, und drei Ideen liegen auf dem Tisch. Wir bewerten jede mit drei Fragen: wie lange sie Lernende bei der Sache hält (Motivation), was sie kostet (Aufwand) und was schiefgehen kann (Risiko).`), look: tt("the three pictures and the dashed budget line", "die drei Bilder und die gestrichelte Budgetlinie") },
        { title: tt("A points system", "Ein Punktesystem"), say: tt(`A points system costs ${euro(LL.points)}, so the effort is ${L(band(LL.points))}. It lifts activity at once but the lift fades, so the motivation is Mid. The risk is High, because learners learn to chase the points and the content becomes an afterthought.`, `Ein Punktesystem kostet ${euro(LL.points)}, der Aufwand ist also ${L(band(LL.points))}. Es hebt die Aktivität sofort, aber der Schub verblasst, die Motivation ist also Mittel. Das Risiko ist Hoch, weil Lernende lernen, den Punkten nachzujagen, und der Inhalt zur Nebensache wird.`), look: tt("the first row", "die erste Zeile") },
        { title: tt("Progress by objectives", "Fortschritt nach Zielen"), say: tt(`Progress by objectives costs ${euro(LL.progress)}, so the effort is ${L(band(LL.progress))}. Learners see what they have mastered, so the motivation is High and it lasts, and the risk is Low because there is little to game. The content rewrite costs ${euro(LL.content)}, Mid effort, with Mid motivation and Low risk.`, `Fortschritt nach Zielen kostet ${euro(LL.progress)}, der Aufwand ist also ${L(band(LL.progress))}. Lernende sehen, was sie gemeistert haben, die Motivation ist also Hoch und hält, und das Risiko ist Niedrig, weil es wenig zu umgehen gibt. Die Inhaltsüberarbeitung kostet ${euro(LL.content)}, Aufwand Mittel, mit Motivation Mittel und Risiko Niedrig.`), look: tt("the second and third rows", "die zweite und dritte Zeile") },
        { title: tt("The order", "Die Reihenfolge"), say: tt("So the cheap measure that rewards learning comes first, the content rewrite second, and the points system last, if at all. Learning before reward is the rule. Select any cell to read its reason.", "Die günstige Maßnahme, die Lernen belohnt, kommt also zuerst, die Inhaltsüberarbeitung zweitens und das Punktesystem zuletzt, wenn überhaupt. Lernen vor Belohnung ist die Regel. Wählen Sie eine Zelle, um ihren Grund zu lesen."), look: tt("the third row's High risk", "das hohe Risiko der ersten Zeile") },
      ]}
      stepRows={[null, "w1", "w2", "w1"]}
    />
  );
}

/* ------------------------------------------------------------------ B1 · objective, mechanic, behaviour, result (static) */

export function ToolChain() {
  return (
    <ChainFig
      label={tt("Gamification as a tool: objective, mechanic, behaviour, result", "Gamification als Werkzeug: Ziel, Mechanik, Verhalten, Ergebnis")}
      steps={[
        { h: tt("Objective", "Ziel"), b: tt("What should learners be able to do?", "Was sollen Lernende können?"), kind: "a", tag: tt("Start here", "Hier beginnen") },
        { h: tt("Mechanic", "Mechanik"), b: tt("The element that encourages the behaviour that leads there.", "Das Element, das das Verhalten fördert, das dorthin führt."), kind: "s", tag: tt("The tool", "Das Werkzeug") },
        { h: tt("Behaviour", "Verhalten"), b: tt("What learners actually do because of it.", "Was Lernende wegen ihr tatsächlich tun."), kind: "m", tag: tt("Watch this", "Beobachten") },
        { h: tt("Result", "Ergebnis"), b: tt("Did they learn, and did it last?", "Haben sie gelernt, und hielt es an?"), kind: "a", tag: tt("Check", "Prüfen") },
      ]}
      caption={tt("A mechanic with no objective behind it is decoration. Start from the objective, never from the game element.", "Eine Mechanik ohne Ziel dahinter ist Dekoration. Beginnen Sie beim Ziel, nie beim Spielelement.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · short-term effect against sustainable learning (interactive) */

export function EffectMatrix() {
  return (
    <MatrixStory
      label={tt("A worked example: six LearnLoop game ideas by short-term effect and sustainable learning · Exploratory", "Ein durchgerechnetes Beispiel: sechs LearnLoop-Spielideen nach kurzfristiger Wirkung und nachhaltigem Lernen · Explorativ")}
      point={tt("A reward can lift activity at once and leave nothing behind. Pressure can push people but creates worry. The aim is the combination that works in the short term and leaves learning behind, and manipulation is the price of ignoring the second.", "Eine Belohnung kann die Aktivität sofort heben und nichts hinterlassen. Druck kann Menschen antreiben, erzeugt aber Sorge. Das Ziel ist die Verbindung, die kurzfristig wirkt und Lernen hinterlässt, und Manipulation ist der Preis dafür, das Zweite zu ignorieren.")}
      title={tt("Six LearnLoop game ideas by their short-term effect (to the right) and the sustainable learning they leave (upwards)", "Sechs LearnLoop-Spielideen nach ihrer kurzfristigen Wirkung (nach rechts) und dem nachhaltigen Lernen, das sie hinterlassen (nach oben)")}
      xLabel={tt("Short-term effect", "Kurzfristige Wirkung")}
      yLabel={tt("Sustainable learning", "Nachhaltiges Lernen")}
      quads={[tt("Slow but lasting", "Langsam, aber nachhaltig"), tt("Works and lasts: the aim", "Wirkt und hält: das Ziel"), tt("Little effect, little learning", "Wenig Wirkung, wenig Lernen"), tt("Quick lift, nothing left", "Schneller Schub, nichts bleibt")]}
      points={[
        { id: "a", letter: "A", x: 0.9, y: 0.12, name: tt("Points for every login", "Punkte für jede Anmeldung"), reading: tt("Activity jumps at once, and nothing about learning changes. The effect is short and leaves nothing behind.", "Die Aktivität springt sofort, und am Lernen ändert sich nichts. Die Wirkung ist kurz und hinterlässt nichts.") },
        { id: "b", letter: "B", x: 0.8, y: 0.28, name: tt("A prize for the top ten", "Ein Preis für die ersten zehn"), reading: tt("A strong push for a few, and most learners cannot win, so they stop. It invites gaming the points.", "Ein starker Anstoß für wenige, und die meisten Lernenden können nicht gewinnen und hören auf. Es lädt dazu ein, die Punkte auszutricksen.") },
        { id: "c", letter: "C", x: 0.22, y: 0.82, name: tt("A story case through each unit", "Ein Fallfaden durch jede Einheit"), reading: tt("It takes time to be felt, but interest in the content lasts without a reward. Slow and lasting.", "Es braucht Zeit, bis man es spürt, aber Interesse am Inhalt hält ohne Belohnung. Langsam und nachhaltig.") },
        { id: "d", letter: "D", x: 0.72, y: 0.82, name: tt("Progress by objectives with a result line", "Fortschritt nach Zielen mit Ergebniszeile"), reading: tt("Learners see at once how they are doing and what to practise, and it builds real skill. It works now and lasts. This is the aim.", "Lernende sehen sofort, wie es ihnen geht und was zu üben ist, und es baut echte Fähigkeit auf. Es wirkt jetzt und hält. Das ist das Ziel.") },
        { id: "e", letter: "E", x: 0.62, y: 0.2, name: tt("A streak that punishes a missed day", "Ein Streak, der einen verpassten Tag bestraft"), reading: tt("The fear of loss pushes people back each day, but it creates pressure and worry, not learning. That is manipulation rather than motivation.", "Die Angst vor Verlust treibt Menschen jeden Tag zurück, erzeugt aber Druck und Sorge, nicht Lernen. Das ist Manipulation statt Motivation.") },
        { id: "f", letter: "F", x: 0.18, y: 0.22, name: tt("One more badge nobody notices", "Noch ein Abzeichen, das niemand bemerkt"), reading: tt("It changes little at the start and nothing later. It adds no learning.", "Es ändert anfangs wenig und später nichts. Es bringt kein Lernen.") },
      ]}
      steps={[
        { title: tt("A lift that fades", "Ein Schub, der verblasst"), say: tt("Let us look at LearnLoop's ideas. Points for every login raise activity at once, and a prize for the top ten pushes a few learners very hard. But both leave nothing behind, because the learners are chasing a reward and not the learning.", "Sehen wir uns LearnLoops Ideen an. Punkte für jede Anmeldung heben die Aktivität sofort, und ein Preis für die ersten zehn treibt wenige Lernende sehr stark an. Beide hinterlassen aber nichts, weil die Lernenden einer Belohnung nachjagen und nicht dem Lernen."), look: tt("A and B at the bottom right", "A und B unten rechts") },
        { title: tt("Works and lasts", "Wirkt und hält"), say: tt("Progress by objectives with a result line is different. Learners see how they are doing and what to practise, so it works now and it builds skill that stays. A story case is slower but lasting. That is the aim.", "Fortschritt nach Zielen mit einer Ergebniszeile ist anders. Lernende sehen, wie es ihnen geht und was zu üben ist, es wirkt also jetzt und baut Fähigkeit auf, die bleibt. Ein Fallfaden ist langsamer, aber nachhaltig. Das ist das Ziel."), look: tt("D near the top right", "D nahe oben rechts") },
        { title: tt("Motivation against manipulation", "Motivation gegen Manipulation"), say: tt("A streak that punishes a missed day pushes people back every evening. It works in the short term, yet it creates worry, which is manipulation and not motivation. Select a point to read why it sits where it does.", "Ein Streak, der einen verpassten Tag bestraft, treibt Menschen jeden Abend zurück. Er wirkt kurzfristig, erzeugt aber Sorge, was Manipulation und nicht Motivation ist. Wählen Sie einen Punkt, um zu lesen, warum er dort liegt."), look: tt("E, the punishing streak", "E, der bestrafende Streak") },
      ]}
      stepPoints={[null, "d", "e"]}
    />
  );
}

/* ------------------------------------------------------------------ B3 · a decision without proof, filled in for LearnLoop (static) */

export function DecisionFrame() {
  return (
    <DecisionFrameFig
      label={tt("A decision without proof that gamification works, filled in for LearnLoop", "Eine Entscheidung ohne Beleg, dass Gamification wirkt, für LearnLoop ausgefüllt")}
      caption={tt("The four boxes make a decision checkable. The two boxes below are the rule that makes future decisions less dependent on one person's taste. The figures are made up for the example.", "Die vier Kästen machen eine Entscheidung überprüfbar. Die zwei Kästen darunter sind die Regel, die künftige Entscheidungen weniger vom Geschmack einer einzelnen Person abhängig macht. Die Zahlen sind für das Beispiel erfunden.")}
      boxes={[
        [tt("I decide", "Ich entscheide"), tt("To test progress by objectives with half of the learners first, and to add no points system yet.", "Zuerst Fortschritt nach Zielen mit der Hälfte der Lernenden zu testen und noch kein Punktesystem hinzuzufügen.")],
        [tt("I do not know", "Ich weiß nicht"), tt("Whether learners who see the progress bar come back more often than those who do not.", "Ob Lernende, die den Fortschrittsbalken sehen, häufiger zurückkehren als solche, die ihn nicht sehen.")],
        [tt("I reverse if", "Ich nehme zurück, wenn"), tt("The seven-day return rate of the pilot group is not at least 5 points above the control group by the end of month 3.", "die Sieben-Tage-Wiederkehrrate der Pilotgruppe bis Ende von Monat 3 nicht mindestens 5 Punkte über der Kontrollgruppe liegt.")],
        [tt("I give up", "Ich verzichte auf"), tt("The points system and the leaderboard for this half year, although competitors have them.", "das Punktesystem und die Rangliste in diesem Halbjahr, obwohl Wettbewerber sie haben.")],
      ]}
      rule={[
        [tt("Who decides", "Wer entscheidet"), tt("The head of learning with the head of product.", "Die Leiterin Lernen mit der Leiterin Produkt.")],
        [tt("On what evidence", "Auf welcher Grundlage"), tt("The return rate and objectives mastered, pilot against control.", "Die Wiederkehrrate und gemeisterte Ziele, Pilot gegen Kontrolle.")],
      ]}
    />
  );
}
