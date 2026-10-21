"use client";

import { ContextMock, MeasureThumb, MicroMock, MobileTestMock, PhoneFixMock } from "@/components/day15/mocks";
import type { PhoneOn } from "@/components/day15/mocks";
import { MatrixStory, StateFig, SwitchFig, WeighFig } from "@/components/dayFree/figs";
import { ChainFig, DecisionFrameFig } from "@/components/materi/figures";
import { tt } from "@/lib/lang";

/**
 * Day 15 · the teaching diagrams of Materi A and B. Example company: LearnLoop, an online-course provider; never MobileLearn, so no task is answered here. Interactive ones carry
 * "The point", "Walk me through it" and an always-visible "What this shows" (CLAUDE.md #20, #36, #51); the static ones are drawn pictures (#52).
 */

/* ------------------------------------------------------------------ A1 · one learner in three contexts (interactive) */

export function ContextFig() {
  return (
    <StateFig
      label={tt("The same learner in three contexts of use · Exploratory · Case assumption", "Derselbe Lernende in drei Nutzungskontexten · Explorativ · Fallannahme")}
      point={tt("The context of use is where, when and with how much attention someone uses a product. On a phone it is often on the go, with little time and low attention. Mobile is not a smaller desktop: the context decides the design, and what the learner needs is speed, simplicity and clarity.", "Der Nutzungskontext ist, wo, wann und mit wie viel Aufmerksamkeit jemand ein Produkt nutzt. Auf dem Handy ist es oft unterwegs, mit wenig Zeit und wenig Aufmerksamkeit. Mobil ist kein kleinerer Desktop: Der Kontext bestimmt das Design, und was die Lernende braucht, sind Tempo, Einfachheit und Klarheit.")}
      states={[
        { id: "desk", button: tt("At a desk", "Am Schreibtisch"), picture: <ContextMock kind="desk" />, insight: tt("In plain words: Ben has an hour, a big screen and quiet. A long lesson, a wide table and a lot of text all work, so the desktop design is fine here.", "In einfachen Worten: Ben hat eine Stunde, einen großen Bildschirm und Ruhe. Eine lange Lektion, eine breite Tabelle und viel Text funktionieren alle, das Desktop-Design ist hier also in Ordnung.") },
        { id: "train", button: tt("On a crowded train", "In einem vollen Zug"), picture: <ContextMock kind="train" />, insight: tt("In plain words: Ben has a few minutes, one hand and many distractions. A 40-minute video or a wide table is useless to him now.", "In einfachen Worten: Ben hat wenige Minuten, eine Hand und viele Ablenkungen. Ein 40-Minuten-Video oder eine breite Tabelle ist ihm jetzt nutzlos.") },
        { id: "break", button: tt("In a five-minute break", "In einer Fünf-Minuten-Pause"), picture: <ContextMock kind="break" />, insight: tt("In plain words: Ben has five minutes and one eye on the clock. He needs something short that starts at once and that he can stop without losing his place.", "In einfachen Worten: Ben hat fünf Minuten und ein Auge auf der Uhr. Er braucht etwas Kurzes, das sofort startet und das er abbrechen kann, ohne seine Stelle zu verlieren.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · a long lesson, arbitrary pieces, units with a goal (interactive) */

export function MicroFig() {
  return (
    <StateFig
      label={tt("The same LearnLoop content as one long lesson, as arbitrary pieces, and as units with a goal · Exploratory · Case assumption", "Derselbe LearnLoop-Inhalt als eine lange Lektion, als beliebige Stücke und als Einheiten mit Ziel · Explorativ · Fallannahme")}
      point={tt("Microlearning means short, self-contained units, each with one objective. It fits everyday life, but cutting a lesson at random pieces does not teach. The risk is fragmentation of knowledge, and the answer is a goal, a check and a visible place in the course for every unit.", "Microlearning heißt kurze, in sich geschlossene Einheiten, jede mit einem Ziel. Es passt zum Alltag, aber eine Lektion an beliebigen Stellen zu zerschneiden lehrt nichts. Das Risiko ist die Zersplitterung des Wissens, und die Antwort ist ein Ziel, eine Prüfung und ein sichtbarer Platz im Kurs für jede Einheit.")}
      states={[
        { id: "long", button: tt("One long lesson", "Eine lange Lektion"), picture: <MicroMock kind="long" />, insight: tt("In plain words: one block of forty minutes. A learner must finish it or lose their place, which does not fit a day full of short breaks.", "In einfachen Worten: ein Block von vierzig Minuten. Eine Lernende muss ihn beenden oder ihre Stelle verlieren, was nicht zu einem Tag voller kurzer Pausen passt.") },
        { id: "cut", button: tt("Arbitrary pieces", "Beliebige Stücke"), picture: <MicroMock kind="cut" />, insight: tt("In plain words: the same lesson cut every five minutes, wherever the clock says. Each piece is short, but none says what it is for, so the learner collects pieces and understands little.", "In einfachen Worten: dieselbe Lektion alle fünf Minuten geschnitten, wo die Uhr es sagt. Jedes Stück ist kurz, aber keines sagt, wofür es da ist, die Lernende sammelt also Stücke und versteht wenig.") },
        { id: "micro", button: tt("Units with a goal", "Einheiten mit Ziel"), picture: <MicroMock kind="micro" />, insight: tt("In plain words: five units of about four minutes, each with one goal, a short check and its place in the course. A learner can finish one in a break and still see how the whole fits together.", "In einfachen Worten: fünf Einheiten von etwa vier Minuten, jede mit einem Ziel, einer kurzen Prüfung und ihrem Platz im Kurs. Eine Lernende kann eine in einer Pause beenden und sieht trotzdem, wie das Ganze zusammenpasst.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A3 · a phone screen that gains four fixes (interactive) */

export function PhoneFixFig() {
  return (
    <SwitchFig
      label={tt("One LearnLoop phone screen and four fixes · Exploratory · Case assumption", "Ein LearnLoop-Handybildschirm und vier Korrekturen · Explorativ · Fallannahme")}
      point={tt("Responsive design prioritises: it shows what a phone user needs first, makes controls large enough for a thumb, and lets text fit the screen. Cross-device design adds a synchronised place, so a learner can pick up on any device. Together they make one experience instead of two.", "Responsive Design priorisiert: Es zeigt zuerst, was eine Handynutzerin braucht, macht Bedienelemente groß genug für einen Daumen und lässt Text auf den Bildschirm passen. Cross-Device-Design ergänzt eine synchronisierte Stelle, sodass eine Lernende auf jedem Gerät weitermachen kann. Zusammen machen sie ein Erlebnis statt zwei.")}
      switches={[
        { id: "priority", label: tt("Prioritised content", "Priorisierter Inhalt") },
        { id: "targets", label: tt("Large targets", "Große Ziele") },
        { id: "reflow", label: tt("Text that fits", "Passender Text") },
        { id: "sync", label: tt("Synchronised continue card", "Synchronisierte Weitermachen-Karte") },
      ]}
      start={{ priority: false, targets: false, reflow: false, sync: false }}
      picture={(on) => <PhoneFixMock on={on as unknown as PhoneOn} />}
      insight={(on) => {
        const n = [on.priority, on.targets, on.reflow, on.sync].filter(Boolean).length;
        return tt(
          `In plain words: ${n} of the 4 fixes are on. ${on.priority ? "The screen opens with what Ben needs today." : "Everything is shown at once, in small type."} ${on.targets ? "The Start button is large enough for a thumb." : "The Start button is tiny."} ${on.reflow ? "The text fits the screen." : "A wide block runs off the edge."} ${on.sync ? "A card continues where Ben stopped on his laptop." : "Nothing shows where Ben stopped on his laptop."}`,
          `In einfachen Worten: ${n} von 4 Korrekturen sind an. ${on.priority ? "Der Bildschirm öffnet mit dem, was Ben heute braucht." : "Alles wird auf einmal gezeigt, in kleiner Schrift."} ${on.targets ? "Der Start-Button ist groß genug für einen Daumen." : "Der Start-Button ist winzig."} ${on.reflow ? "Der Text passt auf den Bildschirm." : "Ein breiter Block läuft über den Rand."} ${on.sync ? "Eine Karte setzt dort fort, wo Ben auf seinem Laptop aufgehört hat." : "Nichts zeigt, wo Ben auf seinem Laptop aufgehört hat."}`,
        );
      }}
    />
  );
}

/* ------------------------------------------------------------------ A4 · a mobile test (static) */

export function MobileTestFig() {
  return <MobileTestMock />;
}

/* ------------------------------------------------------------------ A5 · LearnLoop weighs three measures (interactive) */

export function WeighExample() {
  return (
    <WeighFig
      label={tt("A worked example: LearnLoop weighs three mobile measures · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei mobile Maßnahmen ab · Explorativ")}
      point={tt("Rate a measure by how much it helps a learner on the move, by the work it takes, and by what could go wrong. Short units and a remembered place fit the context with little work. A separate native app can fit well too, but it takes the most work and doubles the upkeep. Give a reason for every rating.", "Bewerten Sie eine Maßnahme danach, wie sehr sie einer Lernenden unterwegs hilft, wie viel Arbeit sie macht und was schiefgehen kann. Kurze Einheiten und eine gemerkte Stelle passen mit wenig Arbeit zum Kontext. Eine eigene native App kann auch gut passen, macht aber die meiste Arbeit und verdoppelt die Pflege. Geben Sie für jede Bewertung einen Grund.")}
      company="LearnLoop"
      context={tt("phone use is rising, lessons are long, three ideas", "die Handynutzung steigt, Lektionen sind lang, drei Ideen")}
      impactLabel={tt("User value", "Nutzerwert")}
      order={["impact", "effort", "risk"]}
      items={[
        { id: "w1", name: tt("Three-minute units for the ten most-used lessons", "Drei-Minuten-Einheiten für die zehn meistgenutzten Lektionen"), thumb: <MeasureThumb kind="micro" />, impact: { level: 3, reason: tt("A learner can finish a unit in a short break, which fits the context of use.", "Eine Lernende kann eine Einheit in einer kurzen Pause beenden, was zum Nutzungskontext passt.") }, effort: { level: 2, reason: tt("Ten lessons have to be cut into units with a goal each: real but bounded work, Mid.", "Zehn Lektionen müssen in Einheiten mit je einem Ziel geschnitten werden: echte, aber begrenzte Arbeit, Mittel.") }, risk: { level: 2, reason: tt("The units must still add up to the course, or knowledge is fragmented.", "Die Einheiten müssen sich weiter zum Kurs fügen, sonst wird Wissen zersplittert.") } },
        { id: "w2", name: tt("Remember where a learner stopped, on every device", "Merken, wo eine Lernende aufgehört hat, auf jedem Gerät"), thumb: <MeasureThumb kind="sync" />, impact: { level: 2, reason: tt("It keeps the experience whole when the device changes, but it does not shorten anything.", "Es hält das Erlebnis ganz, wenn das Gerät wechselt, kürzt aber nichts.") }, effort: { level: 2, reason: tt("Progress has to be stored on the server and read by every device: Mid.", "Der Fortschritt muss auf dem Server gespeichert und von jedem Gerät gelesen werden: Mittel.") }, risk: { level: 2, reason: tt("A sync error could show the wrong place or progress.", "Ein Synchronisationsfehler könnte die falsche Stelle oder den falschen Fortschritt zeigen.") } },
        { id: "w3", name: tt("A separate native phone app", "Eine eigene native Handy-App"), thumb: <MeasureThumb kind="app" />, impact: { level: 2, reason: tt("It can fit the phone very well, but it only helps once built and the content is still long.", "Sie kann sehr gut zum Handy passen, hilft aber erst, wenn sie gebaut ist, und der Inhalt ist weiter lang.") }, effort: { level: 3, reason: tt("A second product has to be designed, built, tested and kept up: High.", "Ein zweites Produkt muss gestaltet, gebaut, getestet und gepflegt werden: Hoch.") }, risk: { level: 3, reason: tt("Two products must be kept up, and the budget is limited.", "Zwei Produkte müssen gepflegt werden, und das Budget ist begrenzt.") } },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B1 · context, design, usage, scale (static) */

export function MobileChain() {
  return (
    <ChainFig
      label={tt("A mobile strategy: context, design, usage, scale", "Eine mobile Strategie: Kontext, Design, Nutzung, Skalierung")}
      steps={[
        { h: tt("Context of use", "Nutzungskontext"), b: tt("Where, when and with how much attention do learners use it?", "Wo, wann und mit wie viel Aufmerksamkeit nutzen Lernende es?"), kind: "a", tag: tt("Start here", "Hier beginnen") },
        { h: tt("Design for it", "Dafür gestalten"), b: tt("Short units, a layout that prioritises, large targets.", "Kurze Einheiten, ein Layout, das priorisiert, große Ziele."), kind: "s", tag: tt("The fit", "Die Passung") },
        { h: tt("Usage", "Nutzung"), b: tt("Do learners now finish units on their phones?", "Beenden Lernende nun Einheiten auf ihren Handys?"), kind: "m", tag: tt("Check by device", "Nach Gerät prüfen") },
        { h: tt("Scale across devices", "Über Geräte skalieren"), b: tt("One account, one progress, the same names everywhere.", "Ein Konto, ein Fortschritt, überall dieselben Namen."), kind: "a", tag: tt("Strategic advantage", "Strategischer Vorteil") },
      ]}
      caption={tt("Mobile is not a smaller desktop. Skip the context and you design for a learner who is not there.", "Mobil ist kein kleinerer Desktop. Lassen Sie den Kontext aus, und Sie gestalten für eine Lernende, die nicht da ist.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · content shown against fit to the situation (interactive) */

export function FitMatrix() {
  return (
    <MatrixStory
      label={tt("A worked example: six LearnLoop ideas by content shown at once and fit to the learner's situation · Exploratory", "Ein durchgerechnetes Beispiel: sechs LearnLoop-Ideen nach auf einmal gezeigtem Inhalt und Passung zur Situation der Lernenden · Explorativ")}
      point={tt("Mobile and desktop pull against each other, and so do content and fit. A phone cannot show everything at once, so the answer is to show on each device what suits its situation, with the rest one tap away, and to keep one experience across both.", "Mobil und Desktop ziehen gegeneinander, ebenso Inhalt und Passung. Ein Handy kann nicht alles auf einmal zeigen, die Antwort ist also, auf jedem Gerät zu zeigen, was zu seiner Situation passt, mit dem Rest einen Tipp entfernt, und ein Erlebnis über beide zu halten.")}
      title={tt("Six LearnLoop ideas by the content they show at once (to the right) and how well they fit the learner's situation (upwards)", "Sechs LearnLoop-Ideen nach dem Inhalt, den sie auf einmal zeigen (nach rechts), und danach, wie gut sie zur Situation der Lernenden passen (nach oben)")}
      xLabel={tt("Content shown at once", "Auf einmal gezeigter Inhalt")}
      yLabel={tt("Fit to the situation", "Passung zur Situation")}
      quads={[tt("Reduced and fitting", "Reduziert und passend"), tt("Complete and fitting: the aim", "Vollständig und passend: das Ziel"), tt("Reduced, not fitting", "Reduziert, nicht passend"), tt("Complete, not fitting", "Vollständig, nicht passend")]}
      points={[
        { id: "a", letter: "A", x: 0.9, y: 0.1, name: tt("The desktop page shrunk onto the phone", "Die Desktop-Seite aufs Handy verkleinert"), reading: tt("Everything is there, in tiny type, and it fits no situation on the move. Complete, not fitting.", "Alles ist da, in winziger Schrift, und es passt zu keiner Situation unterwegs. Vollständig, nicht passend.") },
        { id: "b", letter: "B", x: 0.12, y: 0.84, name: tt("A three-minute unit with one goal", "Eine Drei-Minuten-Einheit mit einem Ziel"), reading: tt("It fits a short break perfectly and shows little. On its own it is a piece, so it needs its place in the course. Reduced and fitting.", "Sie passt perfekt zu einer kurzen Pause und zeigt wenig. Allein ist sie ein Stück, sie braucht also ihren Platz im Kurs. Reduziert und passend.") },
        { id: "c", letter: "C", x: 0.72, y: 0.86, name: tt("A responsive page that shows the essentials first", "Eine responsive Seite, die zuerst das Wesentliche zeigt"), reading: tt("The essentials come first on the phone, and the rest is one tap away. The whole is there, and the situation is respected. This is the aim.", "Das Wesentliche kommt auf dem Handy zuerst, und der Rest ist einen Tipp entfernt. Das Ganze ist da, und die Situation wird respektiert. Das ist das Ziel.") },
        { id: "d", letter: "D", x: 0.3, y: 0.2, name: tt("A daily push reminder", "Eine tägliche Push-Erinnerung"), reading: tt("It shows almost nothing, and it arrives when the learner is busy. It interrupts instead of fitting. Reduced, not fitting.", "Sie zeigt fast nichts und kommt, wenn die Lernende beschäftigt ist. Sie unterbricht, statt zu passen. Reduziert, nicht passend.") },
        { id: "e", letter: "E", x: 0.55, y: 0.62, name: tt("A separate phone-only catalogue with fewer courses", "Ein getrennter Nur-Handy-Katalog mit weniger Kursen"), reading: tt("It fits the phone, and learners miss courses and lose the link to the desktop. A second product with a broken experience.", "Er passt zum Handy, und Lernende verpassen Kurse und verlieren die Verbindung zum Desktop. Ein zweites Produkt mit gebrochenem Erlebnis.") },
        { id: "f", letter: "F", x: 0.84, y: 0.62, name: tt("Long reading and wide tables kept for the laptop", "Langes Lesen und breite Tabellen für den Laptop behalten"), reading: tt("The depth stays where it fits, on a large screen, and the phone is not forced to show it. Complete on the laptop, with the phone kept clear.", "Die Tiefe bleibt dort, wo sie passt, auf einem großen Bildschirm, und das Handy wird nicht gezwungen, sie zu zeigen. Vollständig auf dem Laptop, mit freiem Handy.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B3 · a decision without data by device, filled in for LearnLoop (static) */

export function DecisionFrame() {
  return (
    <DecisionFrameFig
      label={tt("A decision without data by device, filled in for LearnLoop", "Eine Entscheidung ohne Daten nach Gerät, für LearnLoop ausgefüllt")}
      caption={tt("The four boxes make a decision checkable. The two boxes below are the rule that makes future decisions less dependent on one person's taste. The figures are made up for the example.", "Die vier Kästen machen eine Entscheidung überprüfbar. Die zwei Kästen darunter sind die Regel, die künftige Entscheidungen weniger vom Geschmack einer einzelnen Person abhängig macht. Die Zahlen sind für das Beispiel erfunden.")}
      boxes={[
        [tt("I decide", "Ich entscheide"), tt("To split the data by device first and to cut the ten most-used lessons into short units before any redesign.", "Zuerst die Daten nach Gerät aufzuteilen und die zehn meistgenutzten Lektionen in kurze Einheiten zu schneiden, vor jedem Redesign.")],
        [tt("I do not know", "Ich weiß nicht"), tt("How large the share of phone learners really is.", "Wie groß der Anteil der Handy-Lernenden wirklich ist.")],
        [tt("I reverse if", "Ich nehme zurück, wenn"), tt("Drop-out on phones has not fallen from 45% to below 40% by the end of month 3.", "die Abbrüche auf Handys bis Ende von Monat 3 nicht von 45 % auf unter 40 % gefallen sind.")],
        [tt("I give up", "Ich verzichte auf"), tt("The native app, for this year.", "die native App, in diesem Jahr.")],
      ]}
      rule={[
        [tt("Who decides", "Wer entscheidet"), tt("The head of product with the head of learning.", "Die Leiterin Produkt mit der Leiterin Lernen.")],
        [tt("On what evidence", "Auf welcher Grundlage"), tt("Drop-out by device and a test on real phones.", "Die Abbrüche nach Gerät und ein Test auf echten Handys.")],
      ]}
    />
  );
}
