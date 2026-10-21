"use client";

import type { ReactNode } from "react";
import { ActivityFig, DecisionFrame, ElementsFig, EffectMatrix, MotivationFig, PrinciplesFig, ToolChain, WeighExample } from "@/components/day11/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D11 } from "@/components/day11/comicScenes";
import { COMICS_D11 } from "@/data/day11/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 11 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the rules
 * it gives the task (folded) → sources → Mark as read. Example company and people: LearnLoop, Kim; never GameLearn, so no task is answered here.
 */
const Extra = ({ id, children }: { id: string; children: ReactNode }) => (
  <ShowMore id={id} part="extra" label={tt("Show deeper reading (optional)", "Vertiefende Lektüre zeigen (optional)")}>
    <Callout label={tt("Extra · go deeper", "Extra · vertiefen")} tone="signal">
      {children}
    </Callout>
  </ShowMore>
);

const CA = (en: string, de: string) => (
  <Callout label={tt("Case assumption", "Fallannahme")}>
    <p>{tt(en, de)}</p>
  </Callout>
);

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("Gamification uses game elements outside a game. Points reward an action, a badge marks an achievement, a level shows a stage, a leaderboard compares people, a progress bar shows how far someone has come.", "Gamification nutzt Spielelemente außerhalb eines Spiels. Punkte belohnen eine Handlung, ein Abzeichen markiert eine Leistung, ein Level zeigt eine Stufe, eine Rangliste vergleicht Menschen, ein Fortschrittsbalken zeigt, wie weit jemand gekommen ist.")}
      sources={["deterding2011", "hamari2014"]}
      reasoning={[
        tt("Name the element before judging it: points, a badge, a level, a leaderboard, a streak, a progress bar, a prize, a choice.", "Benennen Sie das Element, bevor Sie es beurteilen: Punkte, ein Abzeichen, ein Level, eine Rangliste, ein Streak, ein Fortschrittsbalken, ein Preis, eine Wahl."),
        tt("For each element ask what it rewards: an action (a login), an achievement (a task applied at work) or a comparison (a rank).", "Fragen Sie bei jedem Element, was es belohnt: eine Handlung (eine Anmeldung), eine Leistung (eine bei der Arbeit angewendete Aufgabe) oder einen Vergleich (einen Rang)."),
        tt("Treat gamification as a set of separate elements, each judged on its own, not as one thing that is good or bad.", "Behandeln Sie Gamification als Menge einzelner Elemente, jedes für sich beurteilt, nicht als eine Sache, die gut oder schlecht ist."),
        tt("Note that gamification is not the same as a game: a platform with game elements is still a learning platform.", "Beachten Sie, dass Gamification nicht dasselbe ist wie ein Spiel: Eine Plattform mit Spielelementen bleibt eine Lernplattform."),
      ]}
    >
      <ComicButton comic={COMICS_D11.A1} art={ART_D11} />
      <ElementsFig />
      <DataTable
        caption={tt("Five game elements and what each does", "Fünf Spielelemente und was jedes bewirkt")}
        head={[tt("Element", "Element"), tt("What it does", "Was es bewirkt"), tt("What it can reward", "Was es belohnen kann")]}
        rows={[
          [tt("Points", "Punkte"), tt("Count actions.", "Zählen Handlungen."), tt("An action, whether or not it taught anything.", "Eine Handlung, ob sie etwas gelehrt hat oder nicht.")],
          [tt("Badges", "Abzeichen"), tt("Mark an achievement.", "Markieren eine Leistung."), tt("A real result, or just effort, depending on the rule.", "Ein echtes Ergebnis oder nur Anstrengung, je nach Regel.")],
          [tt("Levels", "Level"), tt("Show a stage.", "Zeigen eine Stufe."), tt("Meaningful only if the level says what was mastered.", "Nur bedeutsam, wenn das Level sagt, was gemeistert wurde.")],
          [tt("Leaderboard", "Rangliste"), tt("Compares people.", "Vergleicht Menschen."), tt("A rank; most people cannot win.", "Einen Rang; die meisten Menschen können nicht gewinnen.")],
          [tt("Progress bar", "Fortschrittsbalken"), tt("Shows how far someone has come.", "Zeigt, wie weit jemand gekommen ist."), tt("Progress, if it counts something real.", "Fortschritt, wenn er etwas Reales zählt.")],
        ]}
      />
      {CA("LearnLoop and Kim are made up for this example. The definition of gamification follows Deterding et al. (2011): game design elements in a non-game context.", "LearnLoop und Kim sind für dieses Beispiel erfunden. Die Definition von Gamification folgt Deterding et al. (2011): Spieldesign-Elemente in einem Nicht-Spiel-Kontext.")}
      <Extra id="A1">
        <p>{tt("Hamari, Koivisto and Sarsa (2014) reviewed studies of gamification and found that it often has positive effects, but that the effects depend on the context and on the learners. So “does gamification work?” has no single answer; the useful question is which element, for whom and for what objective.", "Hamari, Koivisto und Sarsa (2014) werteten Studien zu Gamification aus und fanden, dass sie oft positive Wirkungen hat, die Wirkungen aber vom Kontext und von den Lernenden abhängen. „Wirkt Gamification?“ hat also keine einzelne Antwort; die nützliche Frage ist, welches Element, für wen und für welches Ziel.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("Extrinsic motivation pushes from outside and fades. Intrinsic motivation comes from interest and lasts. Self-Determination Theory names three needs: autonomy, competence and relatedness.", "Extrinsische Motivation treibt von außen an und verblasst. Intrinsische Motivation kommt aus Interesse und hält. Die Selbstbestimmungstheorie nennt drei Bedürfnisse: Autonomie, Kompetenz und Zugehörigkeit.")}
      sources={["ryanDeci2000", "deci1999", "lepper1973"]}
      reasoning={[
        tt("Sort an element as extrinsic when the learner would stop if the reward or the threat were taken away: a point for a login, a prize, a rank, a streak that breaks.", "Ordnen Sie ein Element als extrinsisch ein, wenn die Lernende aufhören würde, fielen Belohnung oder Drohung weg: ein Punkt fürs Anmelden, ein Preis, ein Rang, ein Streak, der reißt."),
        tt("Sort an element as competence when it tells the learner how they are doing and how they are improving: a bar of lessons finished, a result line, difficulty that rises with ability.", "Ordnen Sie ein Element als Kompetenz ein, wenn es der Lernenden sagt, wie es ihr geht und wie sie besser wird: ein Balken erledigter Lektionen, eine Ergebniszeile, Schwierigkeit, die mit der Fähigkeit steigt."),
        tt("Sort an element as intrinsic when it makes the content itself interesting or meaningful, or gives the learner a choice: a story case, a choice of topic.", "Ordnen Sie ein Element als intrinsisch ein, wenn es den Inhalt selbst interessant oder bedeutsam macht oder der Lernenden eine Wahl gibt: ein Fallfaden, eine Themenwahl."),
        tt("Say which element would last longest by asking which one still works when the reward is gone: intrinsic and competence elements last, extrinsic ones fade.", "Sagen Sie, welches Element am längsten trüge, indem Sie fragen, welches noch wirkt, wenn die Belohnung weg ist: intrinsische und Kompetenzelemente halten, extrinsische verblassen."),
        tt("A reward can crowd out interest that was already there, so adding points to something learners enjoyed can make it worse.", "Eine Belohnung kann Interesse verdrängen, das schon da war, Punkte zu etwas hinzuzufügen, was Lernenden Spaß machte, kann es also verschlechtern."),
      ]}
    >
      <ComicButton comic={COMICS_D11.A2} art={ART_D11} />
      <MotivationFig />
      <DataTable
        caption={tt("The three needs of Self-Determination Theory", "Die drei Bedürfnisse der Selbstbestimmungstheorie")}
        head={[tt("Need", "Bedürfnis"), tt("In plain words", "In einfachen Worten"), tt("A learning platform meets it with", "Eine Lernplattform erfüllt es mit")]}
        rows={[
          [tt("Autonomy", "Autonomie"), tt("I choose what I do.", "Ich wähle, was ich tue."), tt("A choice of topic, a say in the order.", "Einer Themenwahl, Mitsprache bei der Reihenfolge.")],
          [tt("Competence", "Kompetenz"), tt("I am getting better.", "Ich werde besser."), tt("Progress, explained feedback, difficulty that fits.", "Fortschritt, erklärtes Feedback, passende Schwierigkeit.")],
          [tt("Relatedness", "Zugehörigkeit"), tt("I belong to others.", "Ich gehöre zu anderen."), tt("A group goal, a study group, shared work.", "Einem Gruppenziel, einer Lerngruppe, gemeinsamer Arbeit.")],
        ]}
      />
      {CA("LearnLoop and Kim are made up for this example. The theory is Ryan and Deci's (2000). The overjustification effect was shown in children by Lepper et al. (1973) and reviewed by Deci et al. (1999).", "LearnLoop und Kim sind für dieses Beispiel erfunden. Die Theorie stammt von Ryan und Deci (2000). Der Überrechtfertigungseffekt wurde bei Kindern von Lepper et al. (1973) gezeigt und von Deci et al. (1999) ausgewertet.")}
      <Extra id="A2">
        <p>{tt("Deci, Koestner and Ryan (1999) reviewed experiments and found that tangible rewards for an activity tend to reduce interest in it afterwards, especially when the reward is expected and given for simply taking part. Informative feedback does not have this effect.", "Deci, Koestner und Ryan (1999) werteten Experimente aus und fanden, dass greifbare Belohnungen für eine Tätigkeit danach tendenziell das Interesse an ihr verringern, besonders wenn die Belohnung erwartet wird und fürs bloße Mitmachen gegeben wird. Informatives Feedback hat diese Wirkung nicht.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Activity is not learning. A game element helps only if it rewards the learning itself, such as progress against an objective, and not the activity around it.", "Aktivität ist nicht Lernen. Ein Spielelement hilft nur, wenn es das Lernen selbst belohnt, etwa Fortschritt gegen ein Ziel, und nicht die Aktivität drumherum.")}
      sources={["hamari2014", "ryanDeci2000", "kivetz2006"]}
      reasoning={[
        tt("Ask of every element: does it reward learning (an objective mastered, a task applied) or activity (a login, a click, time spent)?", "Fragen Sie bei jedem Element: Belohnt es Lernen (ein gemeistertes Ziel, eine angewendete Aufgabe) oder Aktivität (eine Anmeldung, einen Klick, verbrachte Zeit)?"),
        tt("Prefer a measure that ties progress to objectives mastered, with a result line that says what to practise, over one that adds points.", "Bevorzugen Sie eine Maßnahme, die Fortschritt an gemeisterte Ziele bindet, mit einer Ergebniszeile, die sagt, was zu üben ist, gegenüber einer, die Punkte hinzufügt."),
        tt("Treat more badges, more levels and more prizes as more of the problem when the case is that learners chase the reward.", "Behandeln Sie mehr Abzeichen, mehr Level und mehr Preise als mehr vom Problem, wenn der Fall ist, dass Lernende der Belohnung nachjagen."),
        tt("Name a perverse incentive: a reward that invites people to game it, such as points for logging in that people collect without opening a lesson.", "Nennen Sie einen perversen Anreiz: eine Belohnung, die dazu einlädt, sie auszutricksen, etwa Punkte fürs Anmelden, die Menschen sammeln, ohne eine Lektion zu öffnen."),
        tt("Check with the learner's own view: would they say they learned something, or only that they collected something?", "Prüfen Sie aus Sicht der Lernenden: Würden sie sagen, dass sie etwas gelernt haben, oder nur, dass sie etwas gesammelt haben?"),
      ]}
    >
      <ComicButton comic={COMICS_D11.A3} art={ART_D11} />
      <ActivityFig />
      <DataTable
        caption={tt("Activity or learning: how to tell", "Aktivität oder Lernen: wie man es unterscheidet")}
        head={[tt("A measure that rewards", "Eine Maßnahme, die belohnt"), tt("Is it activity or learning?", "Ist es Aktivität oder Lernen?"), tt("Why", "Warum")]}
        rows={[
          [tt("Points for logging in", "Punkte fürs Anmelden"), tt("Activity", "Aktivität"), tt("Showing up does not mean learning.", "Erscheinen heißt nicht lernen.")],
          [tt("A bar of objectives mastered", "Ein Balken gemeisterter Ziele"), tt("Learning", "Lernen"), tt("It moves only when something is learned.", "Er bewegt sich nur, wenn etwas gelernt wird.")],
          [tt("A leaderboard of total points", "Eine Rangliste der Gesamtpunkte"), tt("Activity", "Aktivität"), tt("It ranks how much was done, not what was learned.", "Sie ordnet, wie viel getan wurde, nicht was gelernt wurde.")],
          [tt("A badge for a task applied at work", "Ein Abzeichen für eine bei der Arbeit angewendete Aufgabe"), tt("Learning", "Lernen"), tt("It is tied to a real result.", "Es ist an ein echtes Ergebnis gebunden.")],
        ]}
      />
      {CA("LearnLoop and its values are made up for this example, to show the idea; they are not research findings.", "LearnLoop und seine Werte sind für dieses Beispiel erfunden, um die Idee zu zeigen; es sind keine Forschungsergebnisse.")}
      <Extra id="A3">
        <p>{tt("Goal gradient and endowed progress studies (Kivetz, Urminsky and Zheng 2006) suggest that people try harder as a goal gets closer. That is a reason to show real progress, and a warning against inventing it.", "Studien zum Zielgradienten und zu geschenktem Fortschritt (Kivetz, Urminsky und Zheng 2006) legen nahe, dass Menschen sich mehr anstrengen, je näher ein Ziel kommt. Das ist ein Grund, echten Fortschritt zu zeigen, und eine Warnung davor, ihn zu erfinden.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("Meaningful gamification links every element to a learning objective, keeps the rules visible and fair, and matches the challenge to the learner's ability.", "Sinnvolle Gamification verbindet jedes Element mit einem Lernziel, hält die Regeln sichtbar und fair und passt die Herausforderung an die Fähigkeit der Lernenden an.")}
      sources={["csik1990", "ryanDeci2000"]}
      reasoning={[
        tt("Link: every element serves a learning objective; an element that serves none is dropped.", "Verbindung: Jedes Element dient einem Lernziel; ein Element, das keinem dient, wird gestrichen."),
        tt("Fairness: the rules are visible, and everyone can see how a result came about.", "Fairness: Die Regeln sind sichtbar, und alle können sehen, wie ein Ergebnis zustande kam."),
        tt("Challenge: a task that is too easy bores and one that is too hard worries; matching it to ability is called flow.", "Herausforderung: Eine zu leichte Aufgabe langweilt und eine zu schwere beunruhigt; sie an die Fähigkeit anzupassen heißt Flow."),
      ]}
    >
      <ComicButton comic={COMICS_D11.A4} art={ART_D11} />
      <PrinciplesFig />
      {CA("LearnLoop is the example company. Flow follows Csikszentmihalyi (1990).", "LearnLoop ist das Beispielunternehmen. Flow folgt Csikszentmihalyi (1990).")}
      <Extra id="A4">
        <p>{tt("Day 12 treats adaptive learning, where the platform adjusts the challenge for each learner. The idea of matching challenge to ability is the same.", "Tag 12 behandelt adaptives Lernen, bei dem die Plattform die Herausforderung für jede Lernende anpasst. Die Idee, die Herausforderung der Fähigkeit anzupassen, ist dieselbe.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Rate a measure by how long it keeps learners going, how much work it takes and what could go wrong. Learning before reward.", "Bewerten Sie eine Maßnahme danach, wie lange sie Lernende bei der Sache hält, wie viel Arbeit sie macht und was schiefgehen kann. Lernen vor Belohnung.")}
      sources={["gibbons2018", "hamari2014"]}
      reasoning={[
        tt("Rate effort by how much work and how many people it needs. The plan prints no price, so Low, Mid or High is your judgement, with a reason.", "Bewerten Sie den Aufwand danach, wie viel Arbeit und wie viele Personen er braucht. Der Plan nennt keinen Preis, also ist Niedrig, Mittel oder Hoch Ihr Urteil, mit einem Grund."),
        tt("Rate motivation by how long it keeps the learner going: elements that feed competence and interest last; a reward fades.", "Bewerten Sie die Motivation danach, wie lange sie die Lernende bei der Sache hält: Elemente, die Kompetenz und Interesse nähren, halten; eine Belohnung verblasst."),
        tt("Rate risk by what could go wrong: learners chasing the reward, pressure and worry, a contest most cannot win, a big change that touches every screen.", "Bewerten Sie das Risiko danach, was schiefgehen kann: Lernende, die der Belohnung nachjagen, Druck und Sorge, ein Wettbewerb, den die meisten nicht gewinnen können, eine große Änderung, die jeden Bildschirm berührt."),
        tt("Justify the order with the rule learning before reward: say how your first measure leads to the next.", "Begründen Sie die Reihenfolge mit der Regel Lernen vor Belohnung: Sagen Sie, wie Ihre erste Maßnahme zur nächsten führt."),
        tt("Say what you do not know, for example whether the progress display raises the return rate, and how you would find out.", "Sagen Sie, was Sie nicht wissen, zum Beispiel ob die Fortschrittsanzeige die Wiederkehrrate erhöht, und wie Sie es herausfinden würden."),
      ]}
    >
      <ComicButton comic={COMICS_D11.A5} art={ART_D11} />
      <WeighExample />
      {CA("LearnLoop and its reasons are made up for this example. The task case is in the task.", "LearnLoop und seine Gründe sind für dieses Beispiel erfunden. Der Aufgabenfall steht in der Aufgabe.")}
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("Gamification is a tool, not a goal. Start from the learning objective, choose the mechanic that encourages the behaviour that leads there, then check the result. Motivation is not the same as gamification.", "Gamification ist ein Werkzeug, kein Ziel. Gehen Sie vom Lernziel aus, wählen Sie die Mechanik, die das Verhalten fördert, das dorthin führt, und prüfen Sie dann das Ergebnis. Motivation ist nicht dasselbe wie Gamification.")}
      sources={["deterding2011", "ryanDeci2000", "hamari2014"]}
      reasoning={[
        tt("Decide first whether to gamify at all: say what a mechanic would change in behaviour and which learning objective that serves; “competitors do it” is not a reason.", "Entscheiden Sie zuerst, ob überhaupt gamifiziert wird: Sagen Sie, was eine Mechanik am Verhalten ändern würde und welches Lernziel das bedient; „Wettbewerber tun es“ ist kein Grund."),
        tt("Link each mechanic you keep to one learning objective, and drop the ones that serve none.", "Verbinden Sie jede Mechanik, die Sie behalten, mit einem Lernziel, und streichen Sie die, die keinem dienen."),
        tt("Name the perverse incentive of each mechanic: how could people game it, and what would they then do instead of learning?", "Nennen Sie den perversen Anreiz jeder Mechanik: Wie könnten Menschen sie austricksen, und was täten sie dann statt zu lernen?"),
        tt("Name the risk of over-motivation: pressure, anxiety and a loss that punishes, which make learners stop or cheat.", "Nennen Sie das Risiko der Übermotivation: Druck, Angst und ein Verlust, der bestraft, was Lernende aufhören oder schummeln lässt."),
        tt("Order the measures by the rule learning before reward: progress and feedback first, a say for the learner next, rewards and contests last.", "Ordnen Sie die Maßnahmen nach der Regel Lernen vor Belohnung: zuerst Fortschritt und Feedback, dann Mitsprache der Lernenden, Belohnungen und Wettbewerbe zuletzt."),
      ]}
    >
      <ComicButton comic={COMICS_D11.B1} art={ART_D11} />
      <ToolChain />
      <DataTable
        caption={tt("The test for each link of the chain", "Der Test für jedes Glied der Kette")}
        head={[tt("Link", "Glied"), tt("The test", "Der Test"), tt("What goes wrong without it", "Was ohne ihn schiefgeht")]}
        rows={[
          [tt("Objective", "Ziel"), tt("Can you say what learners should be able to do afterwards?", "Können Sie sagen, was Lernende danach können sollen?"), tt("The mechanic is decoration.", "Die Mechanik ist Dekoration.")],
          [tt("Mechanic", "Mechanik"), tt("Does it encourage the behaviour that leads to the objective?", "Fördert sie das Verhalten, das zum Ziel führt?"), tt("Learners do something else, such as collecting points.", "Lernende tun etwas anderes, etwa Punkte sammeln.")],
          [tt("Behaviour", "Verhalten"), tt("Can you watch what learners actually do?", "Können Sie beobachten, was Lernende tatsächlich tun?"), tt("A perverse incentive goes unnoticed.", "Ein perverser Anreiz bleibt unbemerkt.")],
          [tt("Result", "Ergebnis"), tt("Did they learn, and does it last after the reward stops?", "Haben sie gelernt, und hält es an, nachdem die Belohnung endet?"), tt("A short-term lift is mistaken for success.", "Ein kurzfristiger Schub wird für Erfolg gehalten.")],
        ]}
      />
      {CA("The chain follows the plan's coaching: gamification is a tool, and motivation is not the same as gamification. LearnLoop is the example company.", "Die Kette folgt dem Coaching des Plans: Gamification ist ein Werkzeug, und Motivation ist nicht dasselbe wie Gamification. LearnLoop ist das Beispielunternehmen.")}
      <Extra id="B1">
        <p>{tt("A perverse incentive is a reward that produces the opposite of what was meant. Points for logging in were meant to bring people to learn; they bring people to log in. Asking how a reward could be gamed is a habit worth having for any target, bonus or KPI.", "Ein perverser Anreiz ist eine Belohnung, die das Gegenteil dessen bewirkt, was gemeint war. Punkte fürs Anmelden sollten Menschen zum Lernen bringen; sie bringen Menschen zum Anmelden. Zu fragen, wie eine Belohnung ausgetrickst werden könnte, ist eine Gewohnheit, die sich für jedes Ziel, jeden Bonus und jeden KPI lohnt.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("A reward can lift activity at once and leave nothing behind. Pressure pushes but creates worry. Look for the measure that works now and lasts.", "Eine Belohnung kann die Aktivität sofort heben und nichts hinterlassen. Druck treibt an, erzeugt aber Sorge. Suchen Sie die Maßnahme, die jetzt wirkt und anhält.")}
      sources={["deci1999", "lepper1973", "kahneman1993"]}
      reasoning={[
        tt("Name both sides of each conflict: the short-term lift (points, a prize) and the lasting learning (progress, feedback, interest). A plan that names one side has not weighed the conflict.", "Nennen Sie beide Seiten jedes Konflikts: den kurzfristigen Schub (Punkte, ein Preis) und das nachhaltige Lernen (Fortschritt, Feedback, Interesse). Ein Plan, der eine Seite nennt, hat den Konflikt nicht abgewogen."),
        tt("Tell motivation from manipulation: motivation gives the learner a reason of their own; manipulation uses fear of loss or pressure to bring them back.", "Unterscheiden Sie Motivation von Manipulation: Motivation gibt der Lernenden einen eigenen Grund; Manipulation nutzt Verlustangst oder Druck, um sie zurückzuholen."),
        tt("Do not rely on a contest: if most learners cannot win, most will stop trying.", "Verlassen Sie sich nicht auf einen Wettbewerb: Wenn die meisten Lernenden nicht gewinnen können, hören die meisten auf, es zu versuchen."),
        tt("Keep the learner in control: let them choose the order of topics and switch badges off.", "Lassen Sie die Lernende die Kontrolle behalten: Sie darf die Reihenfolge der Themen wählen und Abzeichen ausschalten."),
      ]}
    >
      <ComicButton comic={COMICS_D11.B2} art={ART_D11} />
      <EffectMatrix />
      <DataTable
        caption={tt("Three conflicts and a rule for deciding each", "Drei Konflikte und eine Regel, jeden zu entscheiden")}
        head={[tt("Conflict", "Konflikt"), tt("One side gets", "Die eine Seite bekommt"), tt("The other side gets", "Die andere Seite bekommt"), tt("A rule for deciding", "Eine Regel zum Entscheiden")]}
        rows={[
          [tt("Short-term effect against sustainable learning", "Kurzfristige Wirkung gegen nachhaltiges Lernen"), tt("A quick lift in activity", "Ein schneller Schub in der Aktivität"), tt("Skill that stays", "Fähigkeit, die bleibt"), tt("Prefer what still works when the reward stops.", "Bevorzugen Sie, was noch wirkt, wenn die Belohnung endet.")],
          [tt("Motivation against manipulation", "Motivation gegen Manipulation"), tt("Learners brought back by pressure", "Lernende, durch Druck zurückgeholt"), tt("Learners who want to come back", "Lernende, die zurückkommen wollen"), tt("Never use loss or fear as the main driver.", "Nutzen Sie Verlust oder Angst nie als Haupttreiber.")],
          [tt("Engagement against overload", "Engagement gegen Überlastung"), tt("Many elements, always something new", "Viele Elemente, immer etwas Neues"), tt("A calm screen that supports the task", "Ein ruhiger Bildschirm, der die Aufgabe stützt"), tt("Keep the elements that serve an objective; remove the rest.", "Behalten Sie die Elemente, die einem Ziel dienen; entfernen Sie den Rest.")],
        ]}
      />
      {CA("LearnLoop and its six ideas are made up for this example. The positions in the picture are a reading of the example, not a score.", "LearnLoop und seine sechs Ideen sind für dieses Beispiel erfunden. Die Positionen im Bild sind eine Lesart des Beispiels, keine Note.")}
      <Extra id="B2">
        <p>{tt("Loss aversion is the finding that people feel a loss more strongly than an equal gain (Kahneman and colleagues describe the related effects of how experiences are remembered). A streak that breaks uses exactly this feeling, which is why it can be effective and still harmful.", "Verlustaversion ist der Befund, dass Menschen einen Verlust stärker spüren als einen gleich großen Gewinn (Kahneman und Kollegen beschreiben verwandte Effekte, wie Erlebnisse erinnert werden). Ein Streak, der reißt, nutzt genau dieses Gefühl, weshalb er wirksam und trotzdem schädlich sein kann.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("When you have no proof that gamification works, choose a small, reversible step, test it against a control group, write a figure you can watch into the plan, and say what you give up.", "Wenn Sie keinen Beleg haben, dass Gamification wirkt, wählen Sie einen kleinen, umkehrbaren Schritt, testen Sie ihn gegen eine Kontrollgruppe, schreiben Sie eine beobachtbare Zahl in den Plan und sagen Sie, worauf Sie verzichten.")}
      sources={["klein2007", "bezos2016", "gibbons2018"]}
      reasoning={[
        tt("A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.", "Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten."),
        tt("A reversal condition has a figure you can watch and a time: “the seven-day return rate of the pilot group is not at least 5 points above the control group by the end of month 3”.", "Eine Rücknahmebedingung hat eine Zahl, die Sie beobachten können, und eine Zeit: „die Sieben-Tage-Wiederkehrrate der Pilotgruppe liegt bis Ende von Monat 3 nicht mindestens 5 Punkte über der Kontrollgruppe“."),
        tt("Get proof cheaply: test one mechanic with a pilot group against a control group before you build it for everyone.", "Besorgen Sie sich Belege günstig: Testen Sie eine Mechanik mit einer Pilotgruppe gegen eine Kontrollgruppe, bevor Sie sie für alle bauen."),
        tt("Do not copy competitors because they gamify: their results are not yours, and you cannot see their evidence.", "Kopieren Sie Wettbewerber nicht, nur weil sie gamifizieren: Ihre Ergebnisse sind nicht ihre, und Sie sehen ihre Belege nicht."),
        tt("Giving up nothing means you have not decided: name what you postpone, for example a leaderboard or a points system.", "Auf nichts zu verzichten heißt, nicht entschieden zu haben: Nennen Sie, was Sie verschieben, zum Beispiel eine Rangliste oder ein Punktesystem."),
      ]}
    >
      <ComicButton comic={COMICS_D11.B3} art={ART_D11} />
      <DecisionFrame />
      <DataTable
        caption={tt("Five ways to make a decision without proof safer", "Fünf Wege, eine Entscheidung ohne Beleg sicherer zu machen")}
        head={[tt("Way", "Weg"), tt("What it looks like", "Wie es aussieht")]}
        rows={[
          [tt("Test against a control group", "Gegen eine Kontrollgruppe testen"), tt("Half of the learners get the mechanic; half do not; compare the return rate and objectives mastered.", "Die Hälfte der Lernenden bekommt die Mechanik, die andere nicht; vergleichen Sie Wiederkehrrate und gemeisterte Ziele.")],
          [tt("Start small and reversible", "Klein und umkehrbar beginnen"), tt("One mechanic first, behind a switch that can be turned off.", "Zuerst eine Mechanik, hinter einem Schalter, der sich ausschalten lässt.")],
          [tt("Set a figure and a date", "Eine Zahl und ein Datum festlegen"), tt("The gap you expect, and the month you will look.", "Die Lücke, die Sie erwarten, und der Monat, in dem Sie nachsehen.")],
          [tt("Fix who decides", "Festlegen, wer entscheidet"), tt("A role, with the evidence it needs.", "Eine Rolle, mit den Belegen, die sie braucht.")],
          [tt("Name what you give up", "Nennen, worauf Sie verzichten"), tt("Something real that someone would miss.", "Etwas Reales, das jemand vermissen würde.")],
        ]}
      />
      {CA("LearnLoop and its figures are made up for this example; the task case is in the task.", "LearnLoop und seine Zahlen sind für dieses Beispiel erfunden; der Aufgabenfall steht in der Aufgabe.")}
      <Extra id="B3">
        <p>{tt("Premortem: imagine the plan failed. Typical answers here: learners chased the points and learned nothing, the leaderboard discouraged most people, and the streak made some anxious. Each answer becomes a check.", "Premortem: Stellen Sie sich vor, der Plan sei gescheitert. Typische Antworten hier: Lernende jagten den Punkten nach und lernten nichts, die Rangliste entmutigte die meisten, und der Streak machte einige ängstlich. Jede Antwort wird zu einem Check.")}</p>
        <p>{tt("One-way and two-way doors: a mechanic behind a switch is a two-way door; a platform rebuilt around points is a one-way door.", "Einbahn- und Zweiwegtüren: Eine Mechanik hinter einem Schalter ist eine Zweiwegtür; eine um Punkte herum neu gebaute Plattform ist eine Einbahntür.")}</p>
      </Extra>
    </MaterialCard>
  );
}
