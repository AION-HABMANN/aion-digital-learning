"use client";

import { ActivityMock, LessonGameMock, MeasureThumb, MotivMock, NeedsMock, PrinciplesMock } from "@/components/day11/mocks";
import type { LessonOn } from "@/components/day11/mocks";
import { MatrixStory, StateFig, SwitchFig, WeighFig } from "@/components/dayFree/figs";
import { ChainFig, DecisionFrameFig } from "@/components/materi/figures";
import { tt } from "@/lib/lang";

/**
 * Day 11 · the teaching diagrams of Materi A and B. Example company: LearnLoop, an online-course provider; never GameLearn, so no task is answered here. Interactive ones
 * carry "The point" and an always-visible "What this shows"; the story of each card is its pixel comic (CLAUDE.md #20, #36, #51); the static ones are drawn pictures (#52).
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
    />
  );
}

/* ------------------------------------------------------------------ A4 · principles of meaningful gamification (static) */

export function PrinciplesFig() {
  return <PrinciplesMock />;
}

/* ------------------------------------------------------------------ A5 · LearnLoop weighs three measures (interactive) */

export function WeighExample() {
  return (
    <WeighFig
      label={tt("A worked example: LearnLoop weighs three gamification measures · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei Gamification-Maßnahmen ab · Explorativ")}
      point={tt("Rate a measure by how long it keeps learners going, by the work it takes, and by what could go wrong. A points system looks lively but carries the highest risk, because learners chase the reward. Progress by objectives is light work and supports learning. Give a reason for every rating.", "Bewerten Sie eine Maßnahme danach, wie lange sie Lernende bei der Sache hält, wie viel Arbeit sie macht und was schiefgehen kann. Ein Punktesystem wirkt lebendig, trägt aber das höchste Risiko, weil Lernende der Belohnung nachjagen. Fortschritt nach Zielen ist wenig Arbeit und stützt das Lernen. Geben Sie für jede Bewertung einen Grund.")}
      company="LearnLoop"
      context={tt("learners drop out early, three ideas", "Lernende brechen früh ab, drei Ideen")}
      impactLabel={tt("Motivation", "Motivation")}
      order={["impact", "effort", "risk"]}
      items={[
        { id: "w1", name: tt("A points system for every action", "Ein Punktesystem für jede Handlung"), thumb: <MeasureThumb kind="points" />, impact: { level: 2, reason: tt("Points lift activity at once, but the lift fades when the novelty is over.", "Punkte heben die Aktivität sofort, der Schub verblasst aber, wenn der Reiz des Neuen vorbei ist.") }, effort: { level: 2, reason: tt("The rules for points have to be designed, balanced and kept fair: Mid.", "Die Regeln für Punkte müssen gestaltet, abgestimmt und fair gehalten werden: Mittel.") }, risk: { level: 3, reason: tt("Learners learn to chase the points and the content becomes an afterthought.", "Lernende lernen, den Punkten nachzujagen, und der Inhalt wird zur Nebensache.") } },
        { id: "w2", name: tt("Progress by objectives", "Fortschritt nach Zielen"), thumb: <MeasureThumb kind="progress" />, impact: { level: 3, reason: tt("Learners see what they have mastered, which feeds the need to feel competent and lasts.", "Lernende sehen, was sie gemeistert haben, was das Bedürfnis nährt, sich kompetent zu fühlen, und hält.") }, effort: { level: 1, reason: tt("It reuses what the platform already knows about the objectives: Low.", "Es nutzt, was die Plattform über die Ziele schon weiß: Niedrig.") }, risk: { level: 1, reason: tt("It rewards learning itself, so there is little to game.", "Es belohnt das Lernen selbst, also gibt es wenig zu umgehen.") } },
        { id: "w3", name: tt("Rewrite the content around real cases", "Den Inhalt um echte Fälle neu schreiben"), thumb: <MeasureThumb kind="story" />, impact: { level: 2, reason: tt("It builds interest in the topic, which lasts, but it works more slowly.", "Es baut Interesse am Thema auf, das hält, wirkt aber langsamer.") }, effort: { level: 3, reason: tt("Every lesson has to be rewritten and checked: High.", "Jede Lektion muss neu geschrieben und geprüft werden: Hoch.") }, risk: { level: 1, reason: tt("It adds interest and takes nothing away.", "Es ergänzt Interesse und nimmt nichts weg.") } },
      ]}
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
