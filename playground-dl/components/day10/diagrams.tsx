"use client";

import { MeasureThumb, PhoneA11yMock, ProgressMock, QuizFeedbackMock, ResponsiveMock } from "@/components/day10/mocks";
import type { A11yOn } from "@/components/day10/mocks";
import { MatrixStory, StateFig, SwitchFig, WeighFig } from "@/components/dayFree/figs";
import { ChainFig, DecisionFrameFig } from "@/components/materi/figures";
import { tt } from "@/lib/lang";

/**
 * Day 10 · the teaching diagrams of Materi A and B. Example company: LearnLoop, an online-course provider; never TrackLearn, so no task is answered here. Interactive ones
 * carry "The point" and an always-visible "What this shows"; the story of each card is its pixel comic (data/day10/comics.ts) (CLAUDE.md #20, #36, #51); the static ones are drawn pictures (#52).
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
    />
  );
}

/* ------------------------------------------------------------------ A5 · LearnLoop weighs three measures (interactive) */

export function WeighExample() {
  return (
    <WeighFig
      label={tt("A worked example: LearnLoop weighs three feedback and tracking measures · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei Maßnahmen für Feedback und Fortschritt ab · Explorativ")}
      point={tt("Rate a measure by what it does for motivation and finishing, by the work it takes and by what could go wrong. Honest transparency and explained feedback beat a flashy display, and a display that does not say what it measures carries the highest risk. Give a reason for every rating.", "Bewerten Sie eine Maßnahme danach, was sie für Motivation und Abschluss bewirkt, nach der Arbeit, die sie macht, und danach, was schiefgehen kann. Ehrliche Transparenz und erklärtes Feedback schlagen eine auffällige Anzeige, und eine Anzeige, die nicht sagt, was sie misst, trägt das höchste Risiko. Begründen Sie jede Bewertung.")}
      company="LearnLoop"
      context={tt("learners do not know how far along they are, and motivation is low", "Lernende wissen nicht, wie weit sie sind, und die Motivation ist niedrig")}
      impactLabel={tt("Impact", "Wirkung")}
      order={["impact", "effort", "risk"]}
      items={[
        { id: "w1", name: tt("A progress bar on every course", "Ein Fortschrittsbalken auf jedem Kurs"), thumb: <MeasureThumb kind="bar" />, impact: { level: 3, reason: tt("Every learner sees how far along they are, which is the quickest way to raise motivation and completion.", "Jede Lernende sieht, wie weit sie ist, was der schnellste Weg ist, Motivation und Abschluss zu steigern.") }, effort: { level: 1, reason: tt("A count and a place on the course page: little work and little time.", "Eine Zählung und ein Platz auf der Kursseite: wenig Arbeit und wenig Zeit.") }, risk: { level: 2, reason: tt("A bar that counts the wrong thing would mislead; it must show lessons finished.", "Ein Balken, der das Falsche zählt, würde täuschen; er muss erledigte Lektionen zeigen.") } },
        { id: "w2", name: tt("Explained feedback after every task", "Erklärtes Feedback nach jeder Aufgabe"), thumb: <MeasureThumb kind="feedback" />, impact: { level: 3, reason: tt("Learners learn from mistakes and know what to do next, so they carry on.", "Lernende lernen aus Fehlern und wissen, was sie als Nächstes tun sollen, also machen sie weiter.") }, effort: { level: 2, reason: tt("Answers have to be written for the tasks: a medium amount of work.", "Antworten müssen für die Aufgaben geschrieben werden: ein mittlerer Arbeitsaufwand.") }, risk: { level: 1, reason: tt("It only adds answers; little can go wrong.", "Es fügt nur Antworten hinzu; wenig kann schiefgehen.") } },
        { id: "w3", name: tt("Levels and points for every action", "Level und Punkte für jede Aktion"), thumb: <MeasureThumb kind="game" />, impact: { level: 1, reason: tt("It rewards clicks and says nothing about progress, so it does not help learners know how they are doing.", "Es belohnt Klicks und sagt nichts über Fortschritt, hilft Lernenden also nicht zu wissen, wie es ihnen geht.") }, effort: { level: 3, reason: tt("Levels, rules and pictures have to be designed and tested: the most work of the three.", "Level, Regeln und Bilder müssen gestaltet und getestet werden: die meiste Arbeit der drei.") }, risk: { level: 3, reason: tt("A level that does not say what it measures misleads and adds noise.", "Ein Level, das nicht sagt, was es misst, täuscht und fügt Lärm hinzu.") } },
      ]}
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
