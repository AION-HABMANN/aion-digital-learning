"use client";

import { LoopMock, MeasureThumb, TestMock, TextMock, UsabilityMock } from "@/components/day14/mocks";
import type { UsOn } from "@/components/day14/mocks";
import { MatrixStory, StateFig, SwitchFig, WeighFig } from "@/components/dayGen/figs";
import { ChainFig, DecisionFrameFig } from "@/components/materi/figures";
import { GEN } from "@/data/day14/gen";
import { effortBandOf } from "@/lib/dayGen/model";
import { euro, tt } from "@/lib/lang";

/**
 * Day 14 · the teaching diagrams of Materi A and B. Example company: LearnLoop, an online-course provider; never ClearLearn, so no task is answered here. Interactive ones carry
 * "The point", "Walk me through it" and an always-visible "What this shows" (CLAUDE.md #20, #36, #51); the static ones are drawn pictures (#52).
 */

/* ------------------------------------------------------------------ A1 · one welcome text, three versions (interactive) */

export function PlainFig() {
  return (
    <StateFig
      label={tt("The same LearnLoop welcome text three ways · Exploratory · Case assumption", "Derselbe LearnLoop-Willkommenstext auf drei Arten · Explorativ · Fallannahme")}
      point={tt("Plain language means short sentences, clear everyday terms and no jargon, so that people understand a text at first reading. Short sentences alone are not enough: if the terms stay hard, the text stays hard. Language is access, and access is use.", "Schlichte Sprache heißt kurze Sätze, klare Alltagsbegriffe und kein Jargon, damit Menschen einen Text beim ersten Lesen verstehen. Kurze Sätze allein genügen nicht: Bleiben die Begriffe schwer, bleibt der Text schwer. Sprache ist Zugang, und Zugang ist Nutzung.")}
      states={[
        { id: "original", button: tt("One long sentence", "Ein langer Satz"), picture: <TextMock kind="original" />, insight: tt("In plain words: one sentence of 52 words with technical terms. Kim reads it twice and still does not know what to do, so she may close the page.", "In einfachen Worten: ein Satz mit 52 Wörtern und Fachbegriffen. Kim liest ihn zweimal und weiß immer noch nicht, was sie tun soll, sie schließt vielleicht die Seite.") },
        { id: "short", button: tt("Short, but hard words", "Kurz, aber schwere Wörter"), picture: <TextMock kind="short" />, insight: tt("In plain words: the sentences are short, and it is already easier to read. But Kim still does not know what “asynchronous modality” means, so she is still stuck.", "In einfachen Worten: Die Sätze sind kurz, und es liest sich schon leichter. Aber Kim weiß immer noch nicht, was „asynchrone Modalität“ bedeutet, sie hängt also immer noch fest.") },
        { id: "plain", button: tt("Plain", "Schlicht"), picture: <TextMock kind="plain" />, insight: tt("In plain words: short sentences, everyday words and one thing to do. Kim understands at first reading and presses “My first lesson”.", "In einfachen Worten: kurze Sätze, Alltagswörter und eine Sache zu tun. Kim versteht beim ersten Lesen und drückt „Meine erste Lektion“.") },
      ]}
      steps={[
        { title: tt("A wall of words", "Eine Wand aus Worten"), say: tt("Let us follow Kim, a new learner at LearnLoop, who opens the welcome text. It is one sentence of 52 words with terms she has never heard. She reads it twice, still does not know what to do, and starts to doubt that the platform is for her.", "Begleiten wir Kim, eine neue Lernende bei LearnLoop, die den Willkommenstext öffnet. Es ist ein Satz mit 52 Wörtern und Begriffen, die sie nie gehört hat. Sie liest ihn zweimal, weiß immer noch nicht, was sie tun soll, und beginnt zu zweifeln, ob die Plattform etwas für sie ist."), look: tt("the long block of text", "der lange Textblock") },
        { title: tt("Short is not enough", "Kurz genügt nicht"), say: tt("Now the team cuts the sentence into three short ones. It reads faster, but the technical terms are still there, and Kim still cannot say what “asynchronous modality” is. So a short sentence with hard words is only half the cure.", "Nun teilt das Team den Satz in drei kurze. Es liest sich schneller, aber die Fachbegriffe sind noch da, und Kim kann immer noch nicht sagen, was „asynchrone Modalität“ ist. Ein kurzer Satz mit schweren Wörtern ist also nur die halbe Heilung."), look: tt("the unchanged technical terms", "die unveränderten Fachbegriffe") },
        { title: tt("Plain at first reading", "Schlicht beim ersten Lesen"), say: tt("The plain version says: learn when it suits you, in short lessons, and pick a course to start. Short sentences, everyday words, one thing to do. Kim understands it at once. Press the three buttons to compare, then write your own plainer version in Task 1.", "Die schlichte Fassung sagt: Lernen Sie, wann es passt, in kurzen Lektionen, und wählen Sie einen Kurs zum Start. Kurze Sätze, Alltagswörter, eine Sache zu tun. Kim versteht es sofort. Drücken Sie die drei Schaltflächen zum Vergleichen und schreiben Sie dann in Task 1 Ihre eigene schlichtere Fassung."), look: tt("the single button “My first lesson”", "der einzelne Button „Meine erste Lektion“") },
      ]}
      stepStates={["original", "short", "plain"]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · a learning page that gains four usability fixes (interactive) */

export function UsabilityFig() {
  return (
    <SwitchFig
      label={tt("One LearnLoop learning page and four usability fixes · Exploratory · Case assumption", "Eine LearnLoop-Lernseite und vier Usability-Korrekturen · Explorativ · Fallannahme")}
      point={tt("An intuitive environment can be used without an explanation. Clear structure, three usability principles (efficiency, error prevention, consistency) and less complexity get you there. Each fix is small, and together they remove most of the friction.", "Eine intuitive Umgebung lässt sich ohne Erklärung nutzen. Klare Struktur, drei Usability-Prinzipien (Effizienz, Fehlervermeidung, Konsistenz) und weniger Komplexität bringen Sie dorthin. Jede Korrektur ist klein, und zusammen beseitigen sie den Großteil der Reibung.")}
      switches={[
        { id: "menu", label: tt("Short clear menu", "Kurzes klares Menü") },
        { id: "efficiency", label: tt("Quick common action", "Schnelle häufige Aktion") },
        { id: "errors", label: tt("Error prevention", "Fehlervermeidung") },
        { id: "consistency", label: tt("Consistent names", "Einheitliche Namen") },
      ]}
      start={{ menu: false, efficiency: false, errors: false, consistency: false }}
      picture={(on) => <UsabilityMock on={on as unknown as UsOn} />}
      insight={(on) => {
        const n = [on.menu, on.efficiency, on.errors, on.consistency].filter(Boolean).length;
        return tt(
          `In plain words: ${n} of the 4 fixes are on. ${on.menu ? "Three clear menu entries show where to go." : "Eight unlabelled boxes make Raj search."} ${on.efficiency ? "Marking a lesson done is one click." : "Marking done hides behind “More”."} ${on.errors ? "The page stops the mistake before it happens." : "A cryptic error appears after the mistake."} ${on.consistency ? "One action has one name." : "One action has two names."}`,
          `In einfachen Worten: ${n} von 4 Korrekturen sind an. ${on.menu ? "Drei klare Menüeinträge zeigen, wohin es geht." : "Acht unbeschriftete Kästen lassen Raj suchen."} ${on.efficiency ? "Eine Lektion als erledigt zu markieren ist ein Klick." : "Das Erledigt-Markieren versteckt sich hinter „Mehr“."} ${on.errors ? "Die Seite stoppt den Fehler, bevor er geschieht." : "Ein kryptischer Fehler erscheint nach dem Fehler."} ${on.consistency ? "Eine Aktion hat einen Namen." : "Eine Aktion hat zwei Namen."}`,
        );
      }}
      steps={[
        { title: tt("A confusing page", "Eine verwirrende Seite"), say: tt("Let us follow Raj, a learner at LearnLoop, on a page with eight unlabelled boxes at the top, a “More” menu that hides the common action, two names for one action, and a cryptic error. None of it is wrong in itself, but together it is hard work.", "Begleiten wir Raj, einen Lernenden bei LearnLoop, auf einer Seite mit acht unbeschrifteten Kästen oben, einem Menü „Mehr“, das die häufige Aktion versteckt, zwei Namen für eine Aktion und einem kryptischen Fehler. Nichts davon ist für sich falsch, aber zusammen ist es mühsam."), look: tt("the eight boxes and the red error", "die acht Kästen und der rote Fehler"), on: { menu: false, efficiency: false, errors: false, consistency: false } },
        { title: tt("Four fixes", "Vier Korrekturen"), say: tt("Now all four fixes are on. Three clear entries replace the eight boxes, marking done is one click, the page stops a missing file before Send, and the action has one name. Raj does not need an explanation, which is what intuitive means.", "Jetzt sind alle vier Korrekturen an. Drei klare Einträge ersetzen die acht Kästen, Erledigt-Markieren ist ein Klick, die Seite stoppt eine fehlende Datei vor dem Senden, und die Aktion hat einen Namen. Raj braucht keine Erklärung, und das heißt intuitiv."), look: tt("the three menu entries and the plain message", "die drei Menüeinträge und die schlichte Meldung"), on: { menu: true, efficiency: true, errors: true, consistency: true } },
        { title: tt("One at a time", "Eines nach dem anderen"), say: tt("A team can do these one by one. Press the four switches to add and remove them, and ask for each which of efficiency, error prevention or consistency it serves. Block 2.2 asks you to choose measures like these.", "Ein Team kann diese eines nach dem anderen machen. Drücken Sie die vier Schalter, um sie hinzuzufügen und zu entfernen, und fragen Sie bei jedem, welchem von Effizienz, Fehlervermeidung oder Konsistenz es dient. Block 2.2 verlangt von Ihnen, solche Maßnahmen zu wählen."), look: tt("the error message alone", "die Fehlermeldung allein"), on: { menu: false, efficiency: false, errors: true, consistency: false } },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · three ways of testing (interactive) */

export function TestingFig() {
  return (
    <StateFig
      label={tt("Three ways of testing the same LearnLoop page · Exploratory · Case assumption", "Drei Arten, dieselbe LearnLoop-Seite zu testen · Explorativ · Fallannahme")}
      point={tt("To know whether a platform is understood, watch real learners do real tasks. A manager's opinion shows how the page looks to someone who knows it. One learner shows one hurdle, and a mix of different learners shows the most.", "Um zu wissen, ob eine Plattform verstanden wird, sehen Sie echten Lernenden bei echten Aufgaben zu. Die Meinung einer Führungskraft zeigt, wie die Seite für jemanden aussieht, der sie kennt. Eine Lernende zeigt eine Hürde, und eine Mischung verschiedener Lernender zeigt die meisten.")}
      states={[
        { id: "survey", button: tt("Ask a manager", "Eine Führungskraft fragen"), picture: <TestMock kind="survey" />, insight: tt("In plain words: the manager says the page looks clear, because the manager knows it. This tells you nothing about where a new learner would stop.", "In einfachen Worten: Die Führungskraft sagt, die Seite sehe klar aus, weil sie sie kennt. Das sagt Ihnen nichts darüber, wo eine neue Lernende aufhören würde.") },
        { id: "observe", button: tt("Watch one learner", "Einer Lernenden zusehen"), picture: <TestMock kind="observe" />, insight: tt("In plain words: you watch Ava do a task and see her stop at the menu. You found a real hurdle that nobody on the team had noticed.", "In einfachen Worten: Sie sehen Ava bei einer Aufgabe zu und sehen, wie sie am Menü hängenbleibt. Sie haben eine echte Hürde gefunden, die niemand im Team bemerkt hatte.") },
        { id: "group", button: tt("Watch several different learners", "Mehreren verschiedenen Lernenden zusehen"), picture: <TestMock kind="group" />, insight: tt("In plain words: four different learners stop in four places: the menu, the jargon, the form and the small text. A mixed group shows the hurdles one learner alone would miss.", "In einfachen Worten: Vier verschiedene Lernende bleiben an vier Stellen hängen: Menü, Jargon, Formular und kleiner Text. Eine gemischte Gruppe zeigt die Hürden, die eine Lernende allein verpassen würde.") },
      ]}
      steps={[
        { title: tt("Asking the wrong person", "Die falsche Person fragen"), say: tt("Let us look at how LearnLoop checked its new page. The head of product, who built it, was asked whether it looks clear, and said yes. Of course: they know where everything is. The answer says nothing about a newcomer.", "Sehen wir uns an, wie LearnLoop seine neue Seite geprüft hat. Die Leiterin Produkt, die sie gebaut hat, wurde gefragt, ob sie klar aussieht, und sagte ja. Natürlich: Sie weiß, wo alles ist. Die Antwort sagt nichts über einen Neuling."), look: tt("the manager's “Yes, it looks fine”", "das „Ja, sieht gut aus“ der Führungskraft") },
        { title: tt("Watching a learner", "Einer Lernenden zusehen"), say: tt("Then the team watches Ava, a learner, try to find her course. She hesitates at the menu and stops. That is a usability test: a real task, a real learner, and a hurdle the team could not see. One learner already found something useful.", "Dann sieht das Team Ava, einer Lernenden, dabei zu, wie sie ihren Kurs finden will. Sie zögert am Menü und bleibt hängen. Das ist ein Usability-Test: eine echte Aufgabe, eine echte Lernende und eine Hürde, die das Team nicht sehen konnte. Eine Lernende hat schon etwas Nützliches gefunden."), look: tt("the highlighted menu entry", "der hervorgehobene Menüeintrag") },
        { title: tt("A mixed group", "Eine gemischte Gruppe"), say: tt("Finally the team invites four different learners, among them one with low vision and one who reads in a second language. Each stops somewhere else, so the mix shows far more than any single learner. Press the three buttons to compare.", "Schließlich lädt das Team vier verschiedene Lernende ein, darunter eine mit eingeschränktem Sehvermögen und einen, der in einer Zweitsprache liest. Jede bleibt woanders hängen, die Mischung zeigt also weit mehr als jede einzelne Lernende. Drücken Sie die drei Schaltflächen zum Vergleichen."), look: tt("the four different stopping places", "die vier verschiedenen Haltepunkte") },
      ]}
      stepStates={["survey", "observe", "group"]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · an improvement loop (static) */

export function LoopFig() {
  return <LoopMock />;
}

/* ------------------------------------------------------------------ A5 · LearnLoop weighs three measures (interactive) */

const LL = { budget: 36000, errors: 6000, menu: 13000, chat: 28000 };

export function WeighExample() {
  const band = effortBandOf(GEN);
  const L = (n: number) => [tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")][n - 1];
  return (
    <WeighFig
      label={tt("A worked example: LearnLoop weighs three simplification measures · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei Vereinfachungsmaßnahmen ab · Explorativ")}
      point={tt("Rate a measure by how much it helps learners understand and keep going, by its printed cost, and by what could go wrong. A cheap fix that makes messages understandable beats a new function that makes the platform more complex.", "Bewerten Sie eine Maßnahme danach, wie sehr sie Lernenden hilft, zu verstehen und weiterzumachen, nach ihren gedruckten Kosten und danach, was schiefgehen kann. Eine günstige Korrektur, die Meldungen verständlich macht, schlägt eine neue Funktion, die die Plattform komplexer macht.")}
      company="LearnLoop"
      budget={LL.budget}
      bands={[{ to: 7000, label: tt("Low", "Niedrig") }, { to: 15000, label: tt("Mid", "Mittel") }, { to: null, label: tt("High", "Hoch") }]}
      band={band}
      impactLabel={tt("Impact", "Wirkung")}
      items={[
        { id: "w1", name: tt("Plain messages in place of error codes", "Schlichte Meldungen statt Fehlercodes"), cost: LL.errors, thumb: <MeasureThumb kind="plain" />, impact: { level: 3, reason: tt("Learners know what went wrong and what to do, so they carry on instead of leaving.", "Lernende wissen, was schiefging und was zu tun ist, sie machen also weiter, statt zu gehen.") }, effortReason: tt(`${euro(LL.errors)} is under ${euro(7000)}: ${L(band(LL.errors))}.`, `${euro(LL.errors)} liegen unter ${euro(7000)}: ${L(band(LL.errors))}.`), risk: { level: 1, reason: tt("It only changes words.", "Es ändert nur Worte.") } },
        { id: "w2", name: tt("One menu of six entries", "Ein Menü mit sechs Einträgen"), cost: LL.menu, thumb: <MeasureThumb kind="nav" />, impact: { level: 3, reason: tt("Learners find their course at once, which removes a hurdle every learner meets.", "Lernende finden ihren Kurs sofort, was eine Hürde beseitigt, der jede Lernende begegnet.") }, effortReason: tt(`${euro(LL.menu)} lies between ${euro(7000)} and ${euro(15000)}: ${L(band(LL.menu))}.`, `${euro(LL.menu)} liegen zwischen ${euro(7000)} und ${euro(15000)}: ${L(band(LL.menu))}.`), risk: { level: 2, reason: tt("Regular users may be disturbed by the new menu at first.", "Stammnutzer können vom neuen Menü zunächst gestört werden.") } },
        { id: "w3", name: tt("A new chat function", "Eine neue Chat-Funktion"), cost: LL.chat, thumb: <MeasureThumb kind="functions" />, impact: { level: 1, reason: tt("It adds one more thing to learn on a platform people already find hard.", "Es fügt eine weitere Sache zum Lernen hinzu auf einer Plattform, die Menschen schon schwer finden.") }, effortReason: tt(`${euro(LL.chat)} is above ${euro(15000)}: ${L(band(LL.chat))}.`, `${euro(LL.chat)} liegen über ${euro(15000)}: ${L(band(LL.chat))}.`), risk: { level: 3, reason: tt("More complexity can raise drop-out instead of lowering it.", "Mehr Komplexität kann die Abbrüche erhöhen, statt sie zu senken.") } },
      ]}
      steps={[
        { title: tt("The setting", "Die Ausgangslage"), say: tt(`Let us look at LearnLoop once more. Learners leave early, the budget is ${euro(LL.budget)}, and three ideas are on the table. We rate each on three questions: how much it helps learners understand and keep going (impact), what it costs (effort), and what could go wrong (risk).`, `Sehen wir uns LearnLoop noch einmal an. Lernende gehen früh, das Budget beträgt ${euro(LL.budget)}, und drei Ideen liegen auf dem Tisch. Wir bewerten jede mit drei Fragen: wie sehr sie Lernenden hilft, zu verstehen und weiterzumachen (Wirkung), was sie kostet (Aufwand) und was schiefgehen kann (Risiko).`), look: tt("the three pictures and the dashed budget line", "die drei Bilder und die gestrichelte Budgetlinie") },
        { title: tt("Plain messages", "Schlichte Meldungen"), say: tt(`Plain messages cost ${euro(LL.errors)}, so the effort is ${L(band(LL.errors))}. Learners know what to do next, so the impact is High, and the risk is Low because only words change. The menu costs ${euro(LL.menu)}, Mid effort, with High impact and Mid risk.`, `Schlichte Meldungen kosten ${euro(LL.errors)}, der Aufwand ist also ${L(band(LL.errors))}. Lernende wissen, was als Nächstes zu tun ist, die Wirkung ist also Hoch, und das Risiko ist Niedrig, weil sich nur Worte ändern. Das Menü kostet ${euro(LL.menu)}, Aufwand Mittel, mit Wirkung Hoch und Risiko Mittel.`), look: tt("the first and second rows", "die erste und zweite Zeile") },
        { title: tt("A new function", "Eine neue Funktion"), say: tt(`The chat costs ${euro(LL.chat)}, so the effort is High. It adds one more thing to a platform people already find hard, so the impact is Low, and the risk is High because more complexity can raise drop-out. So: simplify first, add later. Select any cell to read its reason.`, `Der Chat kostet ${euro(LL.chat)}, der Aufwand ist also Hoch. Er fügt einer Plattform, die Menschen schon schwer finden, eine weitere Sache hinzu, die Wirkung ist also Niedrig, und das Risiko ist Hoch, weil mehr Komplexität die Abbrüche erhöhen kann. Also: zuerst vereinfachen, später ergänzen. Wählen Sie eine Zelle, um ihren Grund zu lesen.`), look: tt("the third row", "die dritte Zeile") },
      ]}
      stepRows={[null, "w1", "w3"]}
    />
  );
}

/* ------------------------------------------------------------------ B1 · find the hurdle, simplify, test, adjust (static) */

export function ClarityChain() {
  return (
    <ChainFig
      label={tt("A comprehensibility strategy: find the hurdle, simplify, test, adjust", "Eine Verständlichkeitsstrategie: Hürde finden, vereinfachen, testen, anpassen")}
      steps={[
        { h: tt("Find the hurdle", "Die Hürde finden"), b: tt("Where do learners stop, and why?", "Wo hören Lernende auf, und warum?"), kind: "a", tag: tt("Start here", "Hier beginnen") },
        { h: tt("Simplify", "Vereinfachen"), b: tt("Plain words, one place, one name; keep what the subject needs.", "Schlichte Worte, ein Ort, ein Name; behalten, was das Thema braucht."), kind: "s", tag: tt("The change", "Die Änderung") },
        { h: tt("Test with users", "Mit Nutzern testen"), b: tt("Watch different learners; check understanding, not opinion.", "Verschiedenen Lernenden zusehen; Verständnis prüfen, nicht Meinung."), kind: "m", tag: tt("The evidence", "Der Beleg") },
        { h: tt("Adjust and repeat", "Anpassen und wiederholen"), b: tt("Use the data, fix the next hurdle, and keep going.", "Die Daten nutzen, die nächste Hürde beheben und weitermachen."), kind: "a", tag: tt("Never stop", "Nie aufhören") },
      ]}
      caption={tt("Comprehensibility leads to usage, and usage leads to success. Skip the test and you are guessing.", "Verständlichkeit führt zu Nutzung, und Nutzung führt zu Erfolg. Lassen Sie den Test aus, und Sie raten.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · information kept against understanding (interactive) */

export function ClarityMatrix() {
  return (
    <MatrixStory
      label={tt("A worked example: six LearnLoop screens by information kept and understanding at first reading · Exploratory", "Ein durchgerechnetes Beispiel: sechs LearnLoop-Bildschirme nach behaltener Information und Verständnis beim ersten Lesen · Explorativ")}
      point={tt("Simplicity and information content pull against each other. Too much simplification removes what some learners need, and too little leaves them lost. Keep the complexity the subject needs and remove the complexity the interface adds.", "Einfachheit und Informationsgehalt ziehen gegeneinander. Zu viel Vereinfachung entfernt, was manche Lernende brauchen, und zu wenig lässt sie verloren. Behalten Sie die Komplexität, die das Thema braucht, und entfernen Sie die Komplexität, die die Oberfläche hinzufügt.")}
      title={tt("Six LearnLoop screens by the information they keep (to the right) and how well a learner understands them at first reading (upwards)", "Sechs LearnLoop-Bildschirme nach der Information, die sie behalten (nach rechts), und danach, wie gut eine Lernende sie beim ersten Lesen versteht (nach oben)")}
      xLabel={tt("Information kept", "Behaltene Information")}
      yLabel={tt("Understood at first reading", "Beim ersten Lesen verstanden")}
      quads={[tt("Few facts, clear", "Wenige Fakten, klar"), tt("Rich and clear: the aim", "Reich und klar: das Ziel"), tt("Few facts, unclear", "Wenige Fakten, unklar"), tt("Dense and unclear", "Dicht und unklar")]}
      points={[
        { id: "a", letter: "A", x: 0.9, y: 0.1, name: tt("Everything on one page, in expert terms", "Alles auf einer Seite, in Expertenworten"), reading: tt("All the information is there, but a learner cannot find or understand any of it. Dense and unclear.", "Alle Information ist da, aber eine Lernende kann nichts davon finden oder verstehen. Dicht und unklar.") },
        { id: "b", letter: "B", x: 0.1, y: 0.88, name: tt("A bare page with one slogan", "Eine leere Seite mit einem Slogan"), reading: tt("Perfectly clear and almost empty: nobody learns anything from it. Simple, but too little information.", "Völlig klar und fast leer: Niemand lernt daraus etwas. Einfach, aber zu wenig Information.") },
        { id: "c", letter: "C", x: 0.78, y: 0.86, name: tt("Short steps, with a “More detail” link", "Kurze Schritte mit einem Link „Mehr Details“"), reading: tt("The main points come first in plain words, and the detail sits one click down. A learner can follow it and an expert can dig in. This is the aim.", "Die Hauptpunkte kommen zuerst in schlichten Worten, und das Detail liegt einen Klick tiefer. Eine Lernende kann folgen, und ein Experte kann tiefer gehen. Das ist das Ziel.") },
        { id: "d", letter: "D", x: 0.88, y: 0.3, name: tt("A 40-page manual", "Ein Handbuch mit 40 Seiten"), reading: tt("It holds the information, but nobody reads it before using the platform. Information kept, little understood.", "Es enthält die Information, aber niemand liest es, bevor er die Plattform nutzt. Information behalten, wenig verstanden.") },
        { id: "e", letter: "E", x: 0.62, y: 0.7, name: tt("Plain text with a small explanation for each term", "Schlichter Text mit kleiner Erklärung für jeden Begriff"), reading: tt("The terms stay, because the subject needs them, and each is explained where it appears. Good: it keeps the content and helps the newcomer.", "Die Begriffe bleiben, weil das Thema sie braucht, und jeder wird dort erklärt, wo er vorkommt. Gut: Es behält den Inhalt und hilft dem Neuling.") },
        { id: "f", letter: "F", x: 0.3, y: 0.62, name: tt("Half of the lessons deleted", "Die Hälfte der Lektionen gelöscht"), reading: tt("The platform is simpler, but advanced learners lost what they needed. Over-simplification: clarity bought with information.", "Die Plattform ist einfacher, aber fortgeschrittene Lernende haben verloren, was sie brauchten. Übervereinfachung: Klarheit mit Information erkauft.") },
      ]}
      steps={[
        { title: tt("Two ways to get it wrong", "Zwei Wege, es falsch zu machen"), say: tt("Let us look at LearnLoop's options. One page holds everything in expert terms: all the information, and no learner can use it. Another page holds one slogan: perfectly clear, and nobody learns anything. Both fail, from opposite sides.", "Sehen wir uns LearnLoops Optionen an. Eine Seite enthält alles in Expertenworten: alle Information, und keine Lernende kann sie nutzen. Eine andere Seite enthält einen Slogan: völlig klar, und niemand lernt etwas. Beide scheitern, von entgegengesetzten Seiten."), look: tt("A at the bottom right and B at the top left", "A unten rechts und B oben links") },
        { title: tt("Clear and rich", "Klar und reich"), say: tt("Short steps with a “More detail” link do both jobs. The main points are plain, so a newcomer follows them, and the detail is one click down for an expert. That separates the complexity of the interface, which goes, from the complexity of the subject, which stays.", "Kurze Schritte mit einem Link „Mehr Details“ erledigen beide Aufgaben. Die Hauptpunkte sind schlicht, ein Neuling folgt ihnen also, und das Detail liegt für einen Experten einen Klick tiefer. Das trennt die Komplexität der Oberfläche, die geht, von der Komplexität des Themas, die bleibt."), look: tt("C near the top right", "C nahe oben rechts") },
        { title: tt("Too much simplification", "Zu viel Vereinfachung"), say: tt("Deleting half of the lessons looks like a quick way to simplify, and it costs advanced learners what they came for. So the risk runs both ways: too little simplification and too much. Select a point to read why it sits where it does.", "Die Hälfte der Lektionen zu löschen sieht nach einem schnellen Weg zur Vereinfachung aus, und es kostet fortgeschrittene Lernende, weswegen sie kamen. Das Risiko läuft also in beide Richtungen: zu wenig Vereinfachung und zu viel. Wählen Sie einen Punkt, um zu lesen, warum er dort liegt."), look: tt("F, the deleted lessons", "F, die gelöschten Lektionen") },
      ]}
      stepPoints={[null, "c", "f"]}
    />
  );
}

/* ------------------------------------------------------------------ B3 · a decision without knowing where learners stop, filled in for LearnLoop (static) */

export function DecisionFrame() {
  return (
    <DecisionFrameFig
      label={tt("A decision without knowing where learners stop, filled in for LearnLoop", "Eine Entscheidung, ohne zu wissen, wo Lernende aufhören, für LearnLoop ausgefüllt")}
      caption={tt("The four boxes make a decision checkable. The two boxes below are the rule that makes future decisions less dependent on one person's taste. The figures are made up for the example.", "Die vier Kästen machen eine Entscheidung überprüfbar. Die zwei Kästen darunter sind die Regel, die künftige Entscheidungen weniger vom Geschmack einer einzelnen Person abhängig macht. Die Zahlen sind für das Beispiel erfunden.")}
      boxes={[
        [tt("I decide", "Ich entscheide"), tt("To rewrite the welcome screen in plain words first, and to test it with eight learners.", "Zuerst den Willkommensbildschirm in schlichten Worten umzuschreiben und ihn mit acht Lernenden zu testen.")],
        [tt("I do not know", "Ich weiß nicht"), tt("Whether the text is the main reason people leave.", "Ob der Text der Hauptgrund ist, warum Menschen gehen.")],
        [tt("I reverse if", "Ich nehme zurück, wenn"), tt("First-week drop-out has not fallen from 30% to below 27% by the end of month 2.", "die Abbrüche in der ersten Woche bis Ende von Monat 2 nicht von 30 % auf unter 27 % gefallen sind.")],
        [tt("I give up", "Ich verzichte auf"), tt("The planned forum, for this year.", "das geplante Forum, in diesem Jahr.")],
      ]}
      rule={[
        [tt("Who decides", "Wer entscheidet"), tt("The head of product with the head of learning.", "Die Leiterin Produkt mit der Leiterin Lernen.")],
        [tt("On what evidence", "Auf welcher Grundlage"), tt("First-week drop-out and the results of the user tests.", "Die Abbrüche in der ersten Woche und die Ergebnisse der Nutzertests.")],
      ]}
    />
  );
}
