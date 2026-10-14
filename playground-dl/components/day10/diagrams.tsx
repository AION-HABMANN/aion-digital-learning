"use client";

import { MeasureThumb, PhoneA11yMock, ProgressMock, QuizFeedbackMock, ResponsiveMock } from "@/components/day10/mocks";
import type { A11yOn } from "@/components/day10/mocks";
import { MatrixStory, StateFig, SwitchFig, WeighFig } from "@/components/dayGen/figs";
import { ChainFig, DecisionFrameFig } from "@/components/materi/figures";
import { GEN } from "@/data/day10/gen";
import { effortBandOf } from "@/lib/dayGen/model";
import { euro, tt } from "@/lib/lang";

/**
 * Day 10 · the teaching diagrams of Materi A and B. Example company: LearnLoop, an online-course provider; never TrackLearn, so no task is answered here. Interactive ones
 * carry "The point", "Walk me through it" and an always-visible "What this shows" (CLAUDE.md #20, #36, #51); the static ones are drawn pictures (#52).
 */

/* ------------------------------------------------------------------ A1 · a finished question: no answer, a bare mark, an explained result (interactive) */

export function FeedbackFig() {
  return (
    <StateFig
      label={tt("The same LearnLoop question: no answer, a bare mark, or an explained result · Exploratory · Case assumption", "Dieselbe LearnLoop-Frage: keine Antwort, ein nacktes Zeichen oder ein erklärtes Ergebnis · Explorativ · Fallannahme")}
      point={tt("Feedback tells a learner that their action counted and what it means. A bare mark says something happened; an explained result with a next step tells the learner how they are doing and what to do, which steers their motivation.", "Feedback sagt einer Lernenden, dass ihre Aktion zählte und was sie bedeutet. Ein nacktes Zeichen sagt, dass etwas passiert ist; ein erklärtes Ergebnis mit nächstem Schritt sagt der Lernenden, wie es ihr geht und was sie tun soll, und das steuert ihre Motivation.")}
      states={[
        { id: "none", button: tt("No answer", "Keine Antwort"), picture: <QuizFeedbackMock kind="none" />, insight: tt("In plain words: Kim picks an answer and the page looks exactly as before. She does not know if it counted, so she clicks again and wonders whether the platform works.", "In einfachen Worten: Kim wählt eine Antwort, und die Seite sieht genauso aus wie vorher. Sie weiß nicht, ob es zählte, klickt also nochmals und fragt sich, ob die Plattform funktioniert.") },
        { id: "bare", button: tt("A bare mark", "Ein nacktes Zeichen"), picture: <QuizFeedbackMock kind="bare" />, insight: tt("In plain words: a red cross appears. Kim knows she was wrong, but not why, and not what to do. Direct feedback that only judges can feel like a verdict.", "In einfachen Worten: Ein rotes Kreuz erscheint. Kim weiß, dass sie falsch lag, aber nicht warum und nicht, was sie tun soll. Direktes Feedback, das nur urteilt, kann sich wie ein Urteil anfühlen.") },
        { id: "explained", button: tt("Explained, with a next step", "Erklärt, mit nächstem Schritt"), picture: <QuizFeedbackMock kind="explained" />, insight: tt("In plain words: the page says A was right, why, and what to do next time, and offers “Next question”. Kim learns from the mistake and carries on, so the feedback steers her instead of stopping her.", "In einfachen Worten: Die Seite sagt, dass A stimmte, warum und was sie das nächste Mal tun soll, und bietet „Nächste Frage“ an. Kim lernt aus dem Fehler und macht weiter, das Feedback steuert sie also, statt sie zu stoppen.") },
      ]}
      steps={[
        { title: tt("Silence", "Stille"), say: tt("Let us follow Kim, a learner at LearnLoop, who answers a quiz question. The page does not change at all. Kim cannot tell whether her answer was recorded, so she clicks it again and then wonders if the platform is broken. A learner who gets no answer to an action tends to stop acting.", "Begleiten wir Kim, eine Lernende bei LearnLoop, die eine Quizfrage beantwortet. Die Seite verändert sich überhaupt nicht. Kim kann nicht sagen, ob ihre Antwort erfasst wurde, klickt sie also nochmals an und fragt sich dann, ob die Plattform kaputt ist. Eine Lernende, die auf eine Aktion keine Antwort bekommt, hört leicht auf zu handeln."), look: tt("the unchanged page", "die unveränderte Seite") },
        { title: tt("A mark and nothing else", "Ein Zeichen und sonst nichts"), say: tt("Now a red cross appears next to B. That is direct feedback, and it is better than silence, but it only judges. Kim does not know why B is wrong or what to do about it, so a mistake feels like a verdict and the next question feels like a risk.", "Jetzt erscheint ein rotes Kreuz neben B. Das ist direktes Feedback, und es ist besser als Stille, aber es urteilt nur. Kim weiß nicht, warum B falsch ist oder was sie dagegen tun kann, ein Fehler fühlt sich also wie ein Urteil an und die nächste Frage wie ein Risiko."), look: tt("the red cross", "das rote Kreuz") },
        { title: tt("Feedback that steers", "Feedback, das steuert"), say: tt("Finally the page explains: A is right, because the first number sets the anchor, and next time name your number first. A button leads to the next question. Kim learns something from the mistake and knows where to go, so feedback has become a tool for motivation and steering. Press the three buttons to compare.", "Schließlich erklärt die Seite: A stimmt, weil die erste Zahl den Anker setzt, und nennen Sie das nächste Mal Ihre Zahl zuerst. Ein Button führt zur nächsten Frage. Kim lernt aus dem Fehler etwas und weiß, wohin, Feedback ist also zum Werkzeug für Motivation und Steuerung geworden. Drücken Sie die drei Schaltflächen zum Vergleichen."), look: tt("the explanation and the Next button", "die Erklärung und der Weiter-Button") },
      ]}
      stepStates={["none", "bare", "explained"]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · a progress display: none, one that cheats, one that is honest (interactive) */

export function ProgressFig() {
  return (
    <StateFig
      label={tt("The same LearnLoop course: no progress, a bar that cheats, an honest display · Exploratory · Case assumption", "Derselbe LearnLoop-Kurs: kein Fortschritt, ein Balken, der täuscht, eine ehrliche Anzeige · Explorativ · Fallannahme")}
      point={tt("A progress display answers “how far along am I?” and raises motivation and completion, but only if it is honest. A bar that jumps ahead and then crawls feels like a cheat, and a long course shown all at once can overwhelm.", "Eine Fortschrittsanzeige beantwortet „Wie weit bin ich?“ und steigert Motivation und Abschluss, aber nur, wenn sie ehrlich ist. Ein Balken, der vorspringt und dann kriecht, fühlt sich wie ein Betrug an, und ein langer Kurs, der auf einmal gezeigt wird, kann überfordern.")}
      states={[
        { id: "none", button: tt("No progress shown", "Kein Fortschritt gezeigt"), picture: <ProgressMock kind="none" />, insight: tt("In plain words: eight lessons that all look alike. Raj is half way through and cannot tell. Without a sense of getting somewhere he starts to wonder how much is left.", "In einfachen Worten: Acht Lektionen, die alle gleich aussehen. Raj ist halb durch und kann es nicht sagen. Ohne das Gefühl, voranzukommen, fragt er sich bald, wie viel noch kommt.") },
        { id: "cheat", button: tt("A bar that cheats", "Ein Balken, der täuscht"), picture: <ProgressMock kind="cheat" />, insight: tt("In plain words: the bar counts clicks, so it shows 90% after the first lesson and then barely moves. Raj first feels great and then feels cheated, and loses trust in every number the platform shows.", "In einfachen Worten: Der Balken zählt Klicks, zeigt also nach der ersten Lektion 90 % und bewegt sich dann kaum. Raj fühlt sich erst großartig und dann betrogen und verliert das Vertrauen in jede Zahl, die die Plattform zeigt.") },
        { id: "honest", button: tt("An honest display", "Eine ehrliche Anzeige"), picture: <ProgressMock kind="honest" />, insight: tt("In plain words: “3 of 8 lessons done · about 20 min left”, with a status on each lesson. Raj sees where he is, what is done and what is left, so the progress motivates him and matches what he did.", "In einfachen Worten: „3 von 8 Lektionen erledigt · noch etwa 20 Min.“, mit einem Status je Lektion. Raj sieht, wo er ist, was erledigt ist und was bleibt, der Fortschritt motiviert ihn also und entspricht dem, was er getan hat.") },
      ]}
      steps={[
        { title: tt("No way to tell", "Keine Möglichkeit, es zu sagen"), say: tt("Let us follow Raj, a learner at LearnLoop, half way through an eight-lesson course. The page lists the lessons and nothing else: finished ones look like new ones, and there is no count. Raj cannot tell how far he has come, and effort without a sign of progress is hard to keep up.", "Begleiten wir Raj, einen Lernenden bei LearnLoop, halb durch einen Kurs mit acht Lektionen. Die Seite listet die Lektionen und sonst nichts: Erledigte sehen aus wie neue, und es gibt keine Zahl. Raj kann nicht sagen, wie weit er gekommen ist, und Mühe ohne Zeichen des Fortschritts ist schwer durchzuhalten."), look: tt("the eight identical rows", "die acht gleichen Zeilen") },
        { title: tt("A bar that cheats", "Ein Balken, der täuscht"), say: tt("Now someone adds a bar that counts clicks and shows 90% after the first lesson. It looks motivating for a minute. Then the bar creeps, and Raj feels cheated: a misleading display is one of the two risks the plan names, and it costs trust in every number.", "Jetzt ergänzt jemand einen Balken, der Klicks zählt und nach der ersten Lektion 90 % zeigt. Er wirkt eine Minute lang motivierend. Dann kriecht der Balken, und Raj fühlt sich betrogen: Eine irreführende Anzeige ist eines der beiden Risiken, die der Plan nennt, und sie kostet Vertrauen in jede Zahl."), look: tt("the 90% after lesson 1", "die 90 % nach Lektion 1") },
        { title: tt("Honest and clear", "Ehrlich und klar"), say: tt("The honest version counts lessons finished out of lessons in the course: “3 of 8”, with a status on each lesson and the time left. It is true, it is clear, and it breaks a big course into steps Raj can see. So progress should be based on something real, labelled, and shown in a size a learner can take in. Press the buttons to compare.", "Die ehrliche Fassung zählt erledigte Lektionen von den Lektionen im Kurs: „3 von 8“, mit einem Status je Lektion und der verbleibenden Zeit. Sie ist wahr, sie ist klar, und sie zerlegt einen großen Kurs in Schritte, die Raj sehen kann. Fortschritt sollte also auf etwas Realem beruhen, beschriftet sein und in einer Größe gezeigt werden, die eine Lernende aufnehmen kann. Drücken Sie die Schaltflächen zum Vergleichen."), look: tt("“3 of 8” and the statuses", "„3 von 8“ und die Status") },
      ]}
      stepStates={["none", "cheat", "honest"]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · the same lesson on a phone that was not adapted, a phone that was, a tablet, a desktop (interactive) */

export function DevicesFig() {
  return (
    <StateFig
      label={tt("The same LearnLoop lesson on four screens · Exploratory · Case assumption", "Dieselbe LearnLoop-Lektion auf vier Bildschirmen · Explorativ · Fallannahme")}
      point={tt("Responsive design adapts a platform to the device and the context of use, and prioritises content by device. For a platform used mostly on phones, it is a prerequisite, not an option.", "Responsive Design passt eine Plattform an das Gerät und den Nutzungskontext an und priorisiert Inhalt nach Gerät. Für eine Plattform, die überwiegend auf Handys genutzt wird, ist es eine Voraussetzung, keine Option.")}
      states={[
        { id: "phoneRaw", button: tt("Phone, not adapted", "Handy, nicht angepasst"), picture: <ResponsiveMock kind="phoneRaw" />, insight: tt("In plain words: the desktop layout is squeezed onto a phone. Text runs off the right edge, the learner must scroll sideways, and the Next button is tiny at the page bottom. Most learners would give up.", "In einfachen Worten: Das Desktop-Layout wird auf ein Handy gepresst. Text läuft über den rechten Rand, die Lernende muss seitlich scrollen, und der Weiter-Button ist winzig am Seitenende. Die meisten Lernenden würden aufgeben.") },
        { id: "phone", button: tt("Phone, adapted", "Handy, angepasst"), picture: <ResponsiveMock kind="phone" />, insight: tt("In plain words: the same lesson, prioritised for a phone: progress on top, a large Continue button first, text that fits and one short question. Everything a learner needs in a few minutes is within thumb reach.", "In einfachen Worten: Dieselbe Lektion, für ein Handy priorisiert: Fortschritt oben, ein großer Weiter-Button zuerst, Text, der passt, und eine kurze Frage. Alles, was eine Lernende in wenigen Minuten braucht, ist in Daumenreichweite.") },
        { id: "tablet", button: tt("Tablet", "Tablet"), picture: <ResponsiveMock kind="tablet" />, insight: tt("In plain words: a tablet has room for the lesson list beside the lesson. The core content is the same; the layout uses the extra width.", "In einfachen Worten: Ein Tablet hat Platz für die Lektionsliste neben der Lektion. Der Kerninhalt ist derselbe; das Layout nutzt die zusätzliche Breite.") },
        { id: "desktop", button: tt("Desktop", "Desktop"), picture: <ResponsiveMock kind="desktop" />, insight: tt("In plain words: a desktop adds notes beside the lesson. These extras suit a large screen; on a phone they open as a separate layer or wait.", "In einfachen Worten: Ein Desktop ergänzt Notizen neben der Lektion. Diese Extras passen zu einem großen Bildschirm; auf dem Handy öffnen sie sich als eigene Ebene oder warten.") },
      ]}
      steps={[
        { title: tt("A desktop page on a phone", "Eine Desktopseite auf einem Handy"), say: tt("Let us follow Nia, a learner at LearnLoop, who studies on the train with her phone. The platform shows the desktop layout, squeezed to fit: the text runs off the right edge, and the Next button is 20 pixels high at the bottom of a long page. She has four minutes and spends them scrolling.", "Begleiten wir Nia, eine Lernende bei LearnLoop, die im Zug mit ihrem Handy lernt. Die Plattform zeigt das Desktop-Layout, zusammengepresst: Der Text läuft über den rechten Rand, und der Weiter-Button ist 20 Pixel hoch am Ende einer langen Seite. Sie hat vier Minuten und verbringt sie mit Scrollen."), look: tt("the cut-off text and the tiny button", "der abgeschnittene Text und der winzige Button") },
        { title: tt("Prioritised for the phone", "Für das Handy priorisiert"), say: tt("Now the page is built for a phone: progress on top, a large “Continue” button first, text that fits, and one short question. Nia reaches what she needs with her thumb. The content is the same; what changed is the order and the size, decided by how a phone is used.", "Jetzt ist die Seite für ein Handy gebaut: Fortschritt oben, ein großer Button „Weiter“ zuerst, Text, der passt, und eine kurze Frage. Nia erreicht mit dem Daumen, was sie braucht. Der Inhalt ist derselbe; geändert haben sich Reihenfolge und Größe, entschieden danach, wie ein Handy genutzt wird."), look: tt("the large Continue button", "der große Weiter-Button") },
        { title: tt("More room, more content", "Mehr Platz, mehr Inhalt"), say: tt("A tablet shows the lesson list beside the lesson, and a desktop adds notes. So responsive design is not one shrunken page: it is a decision, per device, about what is the same everywhere, what comes first, and what only fits a large screen. Press the four buttons to compare.", "Ein Tablet zeigt die Lektionsliste neben der Lektion, und ein Desktop ergänzt Notizen. Responsive Design ist also keine verkleinerte Seite: Es ist eine Entscheidung, pro Gerät, was überall gleich ist, was zuerst kommt und was nur auf einen großen Bildschirm passt. Drücken Sie die vier Schaltflächen zum Vergleichen."), look: tt("the second column on the desktop", "die zweite Spalte auf dem Desktop") },
      ]}
      stepStates={["phoneRaw", "phone", "desktop"]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · a phone screen with accessible targets, contrast and words (interactive) */

export function A11yPhoneFig() {
  return (
    <SwitchFig
      label={tt("A LearnLoop phone screen: targets, contrast and words · Exploratory · Case assumption", "Ein LearnLoop-Handybildschirm: Ziele, Kontrast und Worte · Explorativ · Fallannahme")}
      point={tt("Accessibility on a phone comes from three small things: targets large enough to hit, contrast strong enough to read in sunlight, and words as well as colours. They make the design work for more people on more devices.", "Barrierefreiheit auf dem Handy kommt aus drei kleinen Dingen: Ziele, die groß genug zum Treffen sind, Kontrast, der stark genug zum Lesen im Sonnenlicht ist, und Worte zusätzlich zu Farben. Sie lassen das Design für mehr Menschen auf mehr Geräten funktionieren.")}
      switches={[
        { id: "targets", label: tt("Large targets (at least 44 px)", "Große Ziele (mindestens 44 px)") },
        { id: "contrast", label: tt("Strong contrast", "Starker Kontrast") },
        { id: "words", label: tt("Status in words", "Status in Worten") },
      ]}
      start={{ targets: false, contrast: false, words: false }}
      picture={(on) => <PhoneA11yMock on={on as unknown as A11yOn} />}
      insight={(on) => {
        const n = [on.targets, on.contrast, on.words].filter(Boolean).length;
        return tt(
          `In plain words: ${n} of the 3 accessibility parts are on. ${on.targets ? "Jo can hit Continue with a thumb that shakes a little." : "The Continue button is tiny, and Jo, whose hand shakes, misses it."} ${on.contrast ? "The text is dark and readable in sunlight." : "The pale grey text disappears in sunlight."} ${on.words ? "Each lesson says “done” or “open”, which works for colour-blind learners too." : "Lessons are only red or green dots, which a colour-blind learner cannot tell apart."}`,
          `In einfachen Worten: ${n} von 3 Barrierefreiheitsteilen sind eingeschaltet. ${on.targets ? "Jo trifft Weiter mit einem Daumen, der ein wenig zittert." : "Der Weiter-Button ist winzig, und Jo, deren Hand zittert, verfehlt ihn."} ${on.contrast ? "Der Text ist dunkel und im Sonnenlicht lesbar." : "Der blassgraue Text verschwindet im Sonnenlicht."} ${on.words ? "Jede Lektion sagt „erledigt“ oder „offen“, was auch für farbenblinde Lernende funktioniert." : "Lektionen sind nur rote oder grüne Punkte, die eine farbenblinde Lernende nicht unterscheiden kann."}`,
        );
      }}
      steps={[
        { title: tt("Jo on a bright day", "Jo an einem hellen Tag"), say: tt("Let us follow Jo, a learner at LearnLoop whose hand shakes a little, who studies on a phone outside. The Continue button is tiny, the text is pale grey, and each lesson is only a red or green dot. Jo misses the button, cannot read the text in the glare, and cannot tell which lessons are done.", "Begleiten wir Jo, eine Lernende bei LearnLoop, deren Hand ein wenig zittert und die draußen auf dem Handy lernt. Der Weiter-Button ist winzig, der Text blassgrau, und jede Lektion ist nur ein roter oder grüner Punkt. Jo verfehlt den Button, kann den Text im Glanz nicht lesen und nicht sagen, welche Lektionen erledigt sind."), look: tt("the tiny button and the pale text", "der winzige Button und der blasse Text"), on: { targets: false, contrast: false, words: false } },
        { title: tt("Three small fixes", "Drei kleine Behebungen"), say: tt("Now the button is large, the text is dark and each lesson says “done” or “open” in words. Jo hits the button at the first try, reads the text in the sun and sees what is done. Nothing about the content changed, and the same three fixes help every learner in a hurry or in bad light.", "Jetzt ist der Button groß, der Text dunkel, und jede Lektion sagt in Worten „erledigt“ oder „offen“. Jo trifft den Button im ersten Versuch, liest den Text in der Sonne und sieht, was erledigt ist. Am Inhalt hat sich nichts geändert, und dieselben drei Behebungen helfen jeder Lernenden in Eile oder bei schlechtem Licht."), look: tt("the large button and the words “done” and “open”", "der große Button und die Worte „erledigt“ und „offen“"), on: { targets: true, contrast: true, words: true } },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A5 · LearnLoop weighs three measures (interactive) */

const LL = { budget: 30000, bar: 6000, feedback: 12000, levels: 20000 };

export function WeighExample() {
  const band = effortBandOf(GEN);
  const L = (n: number) => [tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")][n - 1];
  return (
    <WeighFig
      label={tt("A worked example: LearnLoop weighs three feedback and tracking measures · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei Maßnahmen für Feedback und Fortschritt ab · Explorativ")}
      point={tt("Rate a measure by what it does for motivation and finishing, by its printed cost, and by what could go wrong. Honest transparency and explained feedback beat a flashy display, and a display that does not say what it measures carries the highest risk.", "Bewerten Sie eine Maßnahme danach, was sie für Motivation und Abschluss bewirkt, nach ihren gedruckten Kosten und danach, was schiefgehen kann. Ehrliche Transparenz und erklärtes Feedback schlagen eine auffällige Anzeige, und eine Anzeige, die nicht sagt, was sie misst, trägt das höchste Risiko.")}
      company="LearnLoop"
      budget={LL.budget}
      bands={[{ to: 8000, label: tt("Low", "Niedrig") }, { to: 16000, label: tt("Mid", "Mittel") }, { to: null, label: tt("High", "Hoch") }]}
      band={band}
      impactLabel={tt("Impact", "Wirkung")}
      items={[
        { id: "w1", name: tt("A progress bar on every course", "Ein Fortschrittsbalken auf jedem Kurs"), cost: LL.bar, thumb: <MeasureThumb kind="bar" />, impact: { level: 3, reason: tt("Every learner sees how far along they are, which is the cheapest way to raise motivation and completion.", "Jede Lernende sieht, wie weit sie ist, was der günstigste Weg ist, Motivation und Abschluss zu steigern.") }, effortReason: tt(`${euro(LL.bar)} is under ${euro(8000)}: ${L(band(LL.bar))}.`, `${euro(LL.bar)} liegen unter ${euro(8000)}: ${L(band(LL.bar))}.`), risk: { level: 2, reason: tt("A wrong or cheating bar would mislead, so it must count something real.", "Ein falscher oder täuschender Balken würde irreführen, er muss also etwas Reales zählen.") } },
        { id: "w2", name: tt("Explained feedback after every task", "Erklärtes Feedback nach jeder Aufgabe"), cost: LL.feedback, thumb: <MeasureThumb kind="feedback" />, impact: { level: 3, reason: tt("Learners learn from mistakes and know what to do next, so they carry on.", "Lernende lernen aus Fehlern und wissen, was sie als Nächstes tun sollen, also machen sie weiter.") }, effortReason: tt(`${euro(LL.feedback)} lies between ${euro(8000)} and ${euro(16000)}: ${L(band(LL.feedback))}.`, `${euro(LL.feedback)} liegen zwischen ${euro(8000)} und ${euro(16000)}: ${L(band(LL.feedback))}.`), risk: { level: 1, reason: tt("It adds answers and removes nothing.", "Es ergänzt Antworten und entfernt nichts.") } },
        { id: "w3", name: tt("Levels and points for every action", "Level und Punkte für jede Aktion"), cost: LL.levels, thumb: <MeasureThumb kind="game" />, impact: { level: 1, reason: tt("It rewards clicks and says nothing about progress, so it does not help learners know how they are doing.", "Es belohnt Klicks und sagt nichts über Fortschritt, hilft Lernenden also nicht zu wissen, wie es ihnen geht.") }, effortReason: tt(`${euro(LL.levels)} is above ${euro(16000)}: ${L(band(LL.levels))}.`, `${euro(LL.levels)} liegen über ${euro(16000)}: ${L(band(LL.levels))}.`), risk: { level: 3, reason: tt("A level that does not say what it measures misleads and can demotivate.", "Ein Level, das nicht sagt, was es misst, täuscht und kann demotivieren.") } },
      ]}
      steps={[
        { title: tt("The setting", "Die Ausgangslage"), say: tt(`Let us look at LearnLoop again. Learners do not know how far along they are, motivation is low, the budget is ${euro(LL.budget)}, and three ideas are on the table. We rate each on three questions: what it does for motivation and finishing (impact), what it costs (effort), and what could go wrong (risk).`, `Sehen wir uns LearnLoop noch einmal an. Lernende wissen nicht, wie weit sie sind, die Motivation ist niedrig, das Budget beträgt ${euro(LL.budget)}, und drei Ideen liegen auf dem Tisch. Wir bewerten jede mit drei Fragen: was sie für Motivation und Abschluss bewirkt (Wirkung), was sie kostet (Aufwand) und was schiefgehen kann (Risiko).`), look: tt("the three pictures and the dashed budget line", "die drei Bilder und die gestrichelte Budgetlinie") },
        { title: tt("A progress bar", "Ein Fortschrittsbalken"), say: tt(`A progress bar costs ${euro(LL.bar)}, so the effort is ${L(band(LL.bar))}. It shows every learner how far along they are, so the impact is High. The risk is Mid, because a bar that counts the wrong thing would mislead; it must show lessons finished.`, `Ein Fortschrittsbalken kostet ${euro(LL.bar)}, der Aufwand ist also ${L(band(LL.bar))}. Er zeigt jeder Lernenden, wie weit sie ist, die Wirkung ist also Hoch. Das Risiko ist Mittel, weil ein Balken, der das Falsche zählt, täuschen würde; er muss erledigte Lektionen zeigen.`), look: tt("the first row", "die erste Zeile") },
        { title: tt("Explained feedback", "Erklärtes Feedback"), say: tt(`Explained feedback after every task costs ${euro(LL.feedback)}, so the effort is Mid. Learners learn from mistakes and know what to do next, so the impact is High, and the risk is Low because it only adds answers. Both measures answer the case; the bar is cheaper and can come first.`, `Erklärtes Feedback nach jeder Aufgabe kostet ${euro(LL.feedback)}, der Aufwand ist also Mittel. Lernende lernen aus Fehlern und wissen, was sie als Nächstes tun sollen, die Wirkung ist also Hoch, und das Risiko ist Niedrig, weil nur Antworten hinzukommen. Beide Maßnahmen beantworten den Fall; der Balken ist günstiger und kann zuerst kommen.`), look: tt("the second row", "die zweite Zeile") },
        { title: tt("Levels without meaning", "Level ohne Bedeutung"), say: tt(`Levels and points for every action cost ${euro(LL.levels)}, so the effort is High. They reward clicks and say nothing about progress, so the impact is Low, and the risk is High because a level that does not say what it measures misleads. So: transparency and feedback first, decoration last. Select any cell to read its reason.`, `Level und Punkte für jede Aktion kosten ${euro(LL.levels)}, der Aufwand ist also Hoch. Sie belohnen Klicks und sagen nichts über Fortschritt, die Wirkung ist also Niedrig, und das Risiko ist Hoch, weil ein Level, das nicht sagt, was es misst, täuscht. Also: zuerst Transparenz und Feedback, Dekoration zuletzt. Wählen Sie eine Zelle, um ihren Grund zu lesen.`), look: tt("the third row", "die dritte Zeile") },
      ]}
      stepRows={[null, "w1", "w2", "w3"]}
    />
  );
}

/* ------------------------------------------------------------------ B1 · transparency, motivation, usage (static) */

export function SteerChain() {
  return (
    <ChainFig
      label={tt("UX as a feedback system: feedback, visible progress, motivation, usage", "UX als Feedbacksystem: Feedback, sichtbarer Fortschritt, Motivation, Nutzung")}
      steps={[
        { h: tt("Feedback", "Feedback"), b: tt("Every action gets an answer that says something.", "Jede Aktion bekommt eine Antwort, die etwas sagt."), kind: "a", tag: tt("Orientation", "Orientierung") },
        { h: tt("Visible progress", "Sichtbarer Fortschritt"), b: tt("The learner sees how far along they are.", "Die Lernende sieht, wie weit sie ist."), kind: "s", tag: tt("Transparency", "Transparenz") },
        { h: tt("Motivation", "Motivation"), b: tt("Progress that is real makes the next step worth taking.", "Echter Fortschritt macht den nächsten Schritt lohnend."), kind: "m", tag: tt("Steering", "Steuerung") },
        { h: tt("Usage", "Nutzung"), b: tt("The learner carries on, on any device, and returns.", "Die Lernende macht weiter, auf jedem Gerät, und kehrt zurück."), kind: "a", tag: tt("Retention", "Bindung") },
      ]}
      caption={tt("Responsive design and accessibility are not a fifth box: they are what lets the chain work for every learner on every device.", "Responsive Design und Barrierefreiheit sind kein fünfter Kasten: Sie sind das, was die Kette für jede Lernende auf jedem Gerät funktionieren lässt.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · information density against clarity (interactive) */

export function DensityMatrix() {
  return (
    <MatrixStory
      label={tt("A worked example: five LearnLoop progress screens by information shown and clarity kept · Exploratory", "Ein durchgerechnetes Beispiel: fünf LearnLoop-Fortschrittsbildschirme nach gezeigter Information und behaltener Klarheit · Explorativ")}
      point={tt("Information density and clarity pull against each other, and so do feedback and overload. Show what a learner needs to decide the next step, and keep the rest one level down; feedback after every click is overload.", "Informationsdichte und Klarheit ziehen gegeneinander, ebenso Feedback und Überlastung. Zeigen Sie, was eine Lernende braucht, um den nächsten Schritt zu entscheiden, und halten Sie den Rest eine Ebene tiefer; Feedback nach jedem Klick ist Überlastung.")}
      title={tt("Five LearnLoop progress screens by the information they show (to the right) and the clarity they keep (upwards)", "Fünf LearnLoop-Fortschrittsbildschirme nach der Information, die sie zeigen (nach rechts), und der Klarheit, die sie behalten (nach oben)")}
      xLabel={tt("Information shown", "Gezeigte Information")}
      yLabel={tt("Clarity kept", "Behaltene Klarheit")}
      quads={[tt("Few facts, clear", "Wenige Fakten, klar"), tt("Rich and clear: the aim", "Reich und klar: das Ziel"), tt("Few facts, unclear", "Wenige Fakten, unklar"), tt("Dense and cluttered", "Dicht und unübersichtlich")]}
      points={[
        { id: "a", letter: "A", x: 0.92, y: 0.12, name: tt("A dashboard with fourteen charts", "Ein Dashboard mit vierzehn Diagrammen"), reading: tt("It shows everything, so a learner cannot find the one number they need. Information density has beaten clarity.", "Es zeigt alles, eine Lernende kann also die eine Zahl, die sie braucht, nicht finden. Informationsdichte hat Klarheit geschlagen.") },
        { id: "b", letter: "B", x: 0.12, y: 0.88, name: tt("Only a Continue button", "Nur ein Weiter-Button"), reading: tt("It is perfectly clear, but it shows no progress and no result. The learner does not know how they are doing.", "Es ist vollkommen klar, zeigt aber weder Fortschritt noch Ergebnis. Die Lernende weiß nicht, wie es ihr geht.") },
        { id: "c", letter: "C", x: 0.78, y: 0.84, name: tt("Three numbers and a “Details” link", "Drei Zahlen und ein Link „Details“"), reading: tt("Lessons done, time left and the next lesson, with the rest one click away. It shows what a learner needs and stays clear. This is the aim.", "Erledigte Lektionen, verbleibende Zeit und die nächste Lektion, der Rest einen Klick entfernt. Es zeigt, was eine Lernende braucht, und bleibt klar. Das ist das Ziel.") },
        { id: "d", letter: "D", x: 0.4, y: 0.16, name: tt("A pop-up after every click", "Ein Pop-up nach jedem Klick"), reading: tt("It is feedback, but so much of it that it interrupts the lesson. Feedback against overload: here overload wins.", "Es ist Feedback, aber so viel davon, dass es die Lektion unterbricht. Feedback gegen Überlastung: Hier gewinnt die Überlastung.") },
        { id: "e", letter: "E", x: 0.5, y: 0.32, name: tt("Small icons with no labels for status", "Kleine Symbole ohne Beschriftung für den Status"), reading: tt("It has some information, but a learner has to guess what each icon means. It is neither rich nor clear.", "Es hat etwas Information, aber eine Lernende muss raten, was jedes Symbol bedeutet. Es ist weder reich noch klar.") },
      ]}
      steps={[
        { title: tt("Two ways to get it wrong", "Zwei Wege, es falsch zu machen"), say: tt("Let us look at LearnLoop's progress screen. One idea shows fourteen charts: a learner is lost among them. Another shows only a Continue button: it is clear, but the learner has no idea how they are doing. Too much information destroys clarity, and too little leaves the learner blind.", "Sehen wir uns LearnLoops Fortschrittsbildschirm an. Eine Idee zeigt vierzehn Diagramme: Eine Lernende ist unter ihnen verloren. Eine andere zeigt nur einen Weiter-Button: Er ist klar, aber die Lernende hat keine Ahnung, wie es ihr geht. Zu viel Information zerstört Klarheit, und zu wenig lässt die Lernende blind."), look: tt("A at the bottom right and B at the top left", "A unten rechts und B oben links") },
        { title: tt("Enough, and clear", "Genug und klar"), say: tt("The third idea shows three numbers: lessons done, time left, next lesson, with a “Details” link for the rest. It gives the learner what they need to decide the next step, and it stays clear because everything else is one click down. That is the aim.", "Die dritte Idee zeigt drei Zahlen: erledigte Lektionen, verbleibende Zeit, nächste Lektion, mit einem Link „Details“ für den Rest. Sie gibt der Lernenden, was sie braucht, um den nächsten Schritt zu entscheiden, und bleibt klar, weil alles andere einen Klick tiefer liegt. Das ist das Ziel."), look: tt("C near the top right", "C nahe oben rechts") },
        { title: tt("Feedback against overload", "Feedback gegen Überlastung"), say: tt("The same balance holds for feedback. A pop-up after every click is feedback in the same way that shouting is conversation: it overloads. So give feedback where it counts (a finished task, a mistake, a milestone) and keep the rest quiet. Select a point to read why it sits where it does.", "Dieselbe Balance gilt für Feedback. Ein Pop-up nach jedem Klick ist Feedback in dem Sinn, in dem Schreien Unterhaltung ist: Es überlastet. Geben Sie also Feedback dort, wo es zählt (eine beendete Aufgabe, ein Fehler, ein Meilenstein), und halten Sie den Rest ruhig. Wählen Sie einen Punkt, um zu lesen, warum er dort liegt."), look: tt("D, the pop-up after every click", "D, das Pop-up nach jedem Klick") },
      ]}
      stepPoints={[null, "c", "d"]}
    />
  );
}

/* ------------------------------------------------------------------ B3 · a decision without retention data by device, filled in for LearnLoop (static) */

export function DecisionFrame() {
  return (
    <DecisionFrameFig
      label={tt("A decision without retention data by device, filled in for LearnLoop", "Eine Entscheidung ohne Bindungsdaten pro Gerät, für LearnLoop ausgefüllt")}
      caption={tt("The four boxes make a decision checkable. The two boxes below are the rule that makes future decisions less dependent on one person's taste. The figures are made up for the example.", "Die vier Kästen machen eine Entscheidung überprüfbar. Die zwei Kästen darunter sind die Regel, die künftige Entscheidungen weniger vom Geschmack einer einzelnen Person abhängig macht. Die Zahlen sind für das Beispiel erfunden.")}
      boxes={[
        [tt("I decide", "Ich entscheide"), tt("To show an honest progress display and one explained message per task first, before any redesign.", "Zuerst eine ehrliche Fortschrittsanzeige und eine erklärte Meldung pro Aufgabe zu zeigen, vor jedem Redesign.")],
        [tt("I do not know", "Ich weiß nicht"), tt("Whether phone learners come back more often because of it.", "Ob Handy-Lernende deshalb häufiger zurückkehren.")],
        [tt("I reverse if", "Ich nehme zurück, wenn"), tt("The seven-day return rate of phone learners has not risen from 20% to 26% by the end of month 3.", "die Sieben-Tage-Wiederkehrrate der Handy-Lernenden bis Ende von Monat 3 nicht von 20 % auf 26 % gestiegen ist.")],
        [tt("I give up", "Ich verzichte auf"), tt("The levels and points for this half year.", "die Level und Punkte in diesem Halbjahr.")],
      ]}
      rule={[
        [tt("Who decides", "Wer entscheidet"), tt("The head of UX with the head of product.", "Die Leiterin UX mit der Leiterin Produkt.")],
        [tt("On what evidence", "Auf welcher Grundlage"), tt("The return rate by device, completion and a test on real phones.", "Die Wiederkehrrate pro Gerät, der Abschluss und ein Test auf echten Handys.")],
      ]}
    />
  );
}
