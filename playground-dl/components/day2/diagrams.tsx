"use client";

import { useState } from "react";
import clsx from "clsx";
import { OptionGrid } from "@/components/day1/diagrams";
import type { GridRow } from "@/components/day1/diagrams";
import { ChainFig, CompareFig, CostBands, DecisionFrameFig, MatrixFig } from "@/components/materi/figures";
import type { MatrixPoint } from "@/components/materi/figures";
import { Diagram, Insight, Story, ThePoint, useStory } from "@/components/materi/kit";
import type { StoryPlan } from "@/components/materi/kit";
import { Gloss } from "@/lib/glossify";
import { euro, tt } from "@/lib/lang";

/**
 * Day 2 · the teaching diagrams. Static ones (A1, the loops, the data kinds, B3) need no story; the interactive ones (the fidelity ladder, the
 * five-user curve, the LearnLoop weighing grid, the staged investment, the feature matrix) carry "The point", "Walk me through it" and an
 * always-visible "What this shows" (CLAUDE.md #20, #36, #51). Example companies: LearnLoop (an online-course provider); never LearnPro, so no
 * task is answered here.
 */

/* ------------------------------------------------------------------ A1 · same content, two designs (static) */

export function SuccessVsFailing() {
  return (
    <CompareFig
      label={tt("Same content, two designs · a typical contrast, not a measurement", "Derselbe Inhalt, zwei Gestaltungen · ein typischer Kontrast, keine Messung")}
      left={tt("A platform that learners finish", "Eine Plattform, die Lernende abschließen")}
      right={tt("A platform that learners leave", "Eine Plattform, die Lernende verlassen")}
      rows={[
        [tt("A clear path: the learner always sees the next step", "Ein klarer Pfad: Die Lernende sieht immer den nächsten Schritt"), tt("No navigation: the only way on is to scroll", "Keine Navigation: weiter kommt man nur durch Scrollen")],
        [tt("Short units with one goal each", "Kurze Einheiten mit je einem Ziel"), tt("One long page of content", "Eine lange Seite mit Inhalt")],
        [tt("Progress is shown and a result follows every quiz", "Der Fortschritt wird gezeigt, und nach jedem Quiz folgt ein Ergebnis"), tt("No sign of progress, no message at the end", "Kein Zeichen für den Fortschritt, keine Meldung am Ende")],
        [tt("Typical result: learners carry on and come back", "Typisches Ergebnis: Lernende machen weiter und kommen wieder"), tt("Typical result: learners stop early and do not return", "Typisches Ergebnis: Lernende hören früh auf und kommen nicht zurück")],
      ]}
      caption={tt("The left platform shows the way; the right one makes the learner find it alone.", "Die linke Plattform zeigt den Weg; die rechte lässt die Lernende ihn allein finden.")}
    />
  );
}

/* ------------------------------------------------------------------ A2 · the loop of iterative design (static) and the fidelity ladder (interactive) */

export function BuildMeasureLearn() {
  return (
    <ChainFig
      label={tt("Build–Measure–Learn: the loop of iterative design", "Build–Measure–Learn: die Schleife des iterativen Designs")}
      steps={[
        { h: tt("Build", "Build"), b: tt("the smallest version that can be tested", "die kleinste testbare Version"), kind: "a" },
        { h: tt("Measure", "Measure"), b: tt("watch what learners do and say", "beobachten, was Lernende tun und sagen"), kind: "s" },
        { h: tt("Learn", "Learn"), b: tt("decide: keep, change or drop", "entscheiden: behalten, ändern oder verwerfen"), kind: "m" },
      ]}
      loop={tt("Repeat in days, not months", "In Tagen wiederholen, nicht in Monaten")}
    />
  );
}

type Rung = { id: string; name: string; time: string; change: string; tests: string; kind: "g" | "a" | "m" };

export function FidelityLadder() {
  const [sel, setSel] = useState<number | null>(null);
  const rungs: Rung[] = [
    { id: "sketch", kind: "g", name: tt("Sketch on paper", "Skizze auf Papier"), time: tt("minutes", "Minuten"), change: tt("seconds", "Sekunden"), tests: tt("the idea and the order of steps", "die Idee und die Reihenfolge der Schritte") },
    { id: "wire", kind: "a", name: tt("Low-fidelity wireframe", "Low-Fidelity-Wireframe"), time: tt("hours", "Stunden"), change: tt("minutes", "Minuten"), tests: tt("structure and flow, with plain boxes and no colours", "Struktur und Ablauf, mit schlichten Kästen und ohne Farben") },
    { id: "click", kind: "a", name: tt("Clickable prototype", "Klickbarer Prototyp"), time: tt("days", "Tage"), change: tt("hours", "Stunden"), tests: tt("tasks from start to end, by clicking through boxes", "Aufgaben von Anfang bis Ende, durch Klicken durch Kästen") },
    { id: "hifi", kind: "m", name: tt("High-fidelity prototype", "High-Fidelity-Prototyp"), time: tt("weeks", "Wochen"), change: tt("hours to days", "Stunden bis Tage"), tests: tt("the look and small details, once the structure is settled", "das Aussehen und kleine Details, wenn die Struktur steht") },
  ];
  const story = useStory([
    { title: tt("Sofia's idea", "Sofias Idee"), say: tt("Let us follow Sofia, a product designer at LearnLoop, an online-course provider. She has an idea for a new “course start” screen that shows the learning path with a Next button, and her team could build it in six weeks. She is not sure that learners will notice the button, and a mistake found after six weeks of building would be expensive to fix.", "Begleiten wir Sofia, Produktdesignerin bei LearnLoop, einem Anbieter von Online-Kursen. Sie hat eine Idee für einen neuen Bildschirm „Kursstart“, der den Lernpfad mit einem Weiter-Button zeigt, und ihr Team könnte ihn in sechs Wochen bauen. Sie ist nicht sicher, ob Lernende den Button bemerken, und ein Fehler, der nach sechs Wochen Bauen auffällt, wäre teuer zu beheben."), look: tt("the right end of the ladder: weeks of work", "das rechte Ende der Leiter: Wochen Arbeit"), apply: () => setSel(3) },
    { title: tt("A paper test in one afternoon", "Ein Papiertest an einem Nachmittag"), say: tt("Instead of building, Sofia draws the screen on six paper cards and asks five learners to “find your next lesson”. Four of the five do not see the Next button, because it sits in the top corner where nobody looks. This took one afternoon and cost almost nothing, and it already answered her question.", "Statt zu bauen, zeichnet Sofia den Bildschirm auf sechs Papierkarten und bittet fünf Lernende, „Ihre nächste Lektion zu finden“. Vier von fünf sehen den Weiter-Button nicht, weil er in der oberen Ecke sitzt, wohin niemand schaut. Das dauerte einen Nachmittag, kostete fast nichts und beantwortete ihre Frage schon."), look: tt("the left end of the ladder: minutes of work", "das linke Ende der Leiter: Minuten Arbeit"), apply: () => setSel(0) },
    { title: tt("Change it in ten minutes", "In zehn Minuten ändern"), say: tt("Sofia moves the button below the lesson list, redraws one card in ten minutes, and tests with five more learners. This time four of five find it at once. Because the sketch is rough, a change takes seconds; the same finding after a build would have meant reworking finished code.", "Sofia verschiebt den Button unter die Lektionsliste, zeichnet eine Karte in zehn Minuten neu und testet mit fünf weiteren Lernenden. Diesmal finden ihn vier von fünf sofort. Weil die Skizze grob ist, dauert eine Änderung Sekunden; derselbe Befund nach dem Bauen hätte bedeutet, fertigen Code umzuarbeiten."), look: tt("the line “cost to change” of the rung", "die Zeile „Aufwand für eine Änderung“ der Stufe"), apply: () => setSel(1) },
    { title: tt("What to take from it", "Was Sie mitnehmen"), say: tt("So prototyping is risk reduction, not design play: it lets you be wrong cheaply. Climb the ladder only as far as the question needs. A question about order and wording needs paper or grey boxes; a question about the exact look needs a polished version, and only later. Select any rung yourself to compare what each one tests.", "Prototyping ist also Risikominderung, kein Gestaltungsspiel: Es lässt Sie günstig falschliegen. Steigen Sie auf der Leiter nur so weit, wie die Frage es braucht. Eine Frage zu Reihenfolge und Wortlaut braucht Papier oder graue Kästen; eine Frage zum genauen Aussehen braucht eine ausgearbeitete Version, und erst später. Wählen Sie selbst eine Stufe, um zu vergleichen, was jede testet."), apply: () => setSel(null) },
  ] satisfies StoryPlan[]);
  const cur = sel === null ? null : rungs[sel];
  const pick = (i: number) => {
    story.leave();
    setSel(sel === i ? null : i);
  };
  return (
    <Diagram label={tt("The fidelity ladder: how finished a prototype looks · Exploratory", "Die Fidelity-Leiter: wie fertig ein Prototyp aussieht · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("The rougher a prototype, the faster and cheaper it is to change. Climb the ladder only as far as the question you want answered needs.", "Je gröber ein Prototyp, desto schneller und billiger lässt er sich ändern. Steigen Sie auf der Leiter nur so weit, wie die Frage, die Sie beantwortet haben wollen, es braucht.")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <ol className="grid gap-2 md:grid-cols-4">
          {rungs.map((r, i) => (
            <li key={r.id}>
              <button
                type="button"
                aria-pressed={sel === i}
                onClick={() => pick(i)}
                className={clsx("flex h-full min-h-[44px] w-full flex-col items-start gap-0.5 rounded-lg border-2 p-2.5 text-left transition-colors", sel === i ? "border-accent bg-accentSoft ring-2 ring-gold" : "border-line bg-paper hover:border-ash", story.step !== null && sel === i && "anim-pulse")}
              >
                <span className="smallcaps text-ash">{tt(`Rung ${i + 1}`, `Stufe ${i + 1}`)}</span>
                <span className="text-body font-semibold text-ink">{r.name}</span>
                <span className="text-caption text-ash">{tt(`Takes ${r.time} to make`, `Dauert ${r.time} in der Herstellung`)}</span>
                <span className="text-caption text-ash">{tt(`Cost to change: ${r.change}`, `Aufwand für eine Änderung: ${r.change}`)}</span>
              </button>
            </li>
          ))}
        </ol>
        <p aria-hidden className="text-right text-caption font-semibold text-ash">
          {tt("Time and cost rise to the right →", "Zeit und Kosten steigen nach rechts →")}
        </p>
        <Insight>
          {cur
            ? tt(`In plain words: a “${cur.name}” takes ${cur.time} to make and ${cur.change} to change, and it tests ${cur.tests}. ${sel === 3 ? "It is worth it only after the cheaper rungs have settled the structure." : "It is cheap enough that a wrong idea costs little."}`, `In einfachen Worten: Ein „${cur.name}“ braucht ${cur.time} in der Herstellung und ${cur.change} für eine Änderung und testet ${cur.tests}. ${sel === 3 ? "Er lohnt sich erst, wenn die günstigeren Stufen die Struktur geklärt haben." : "Er ist so günstig, dass eine falsche Idee wenig kostet."}`)
            : tt("Select a rung to read what it tests and what it costs to change. A rung is a tool for one question, not a better or worse design.", "Wählen Sie eine Stufe, um zu lesen, was sie testet und was eine Änderung kostet. Eine Stufe ist ein Werkzeug für eine Frage, kein besseres oder schlechteres Design.")}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A3 · how many test users: Nielsen and Landauer's model (interactive) */

const FIVE_USERS = [
  { n: 1, pct: 31 },
  { n: 3, pct: 65 },
  { n: 5, pct: 85 },
  { n: 15, pct: 100 },
];

export function FiveUsers() {
  const [sel, setSel] = useState<number>(5);
  const story = useStory([
    { title: tt("One test user", "Eine Testperson"), say: tt("Let us follow Ana, a UX researcher at LearnLoop, who wants to find what is wrong with the course start screen. She starts with one learner, who stumbles over the Next button and the quiz message. In Nielsen and Landauer's model, one user already finds about 31 percent of the problems, so even the first test teaches a lot.", "Begleiten wir Ana, UX-Researcherin bei LearnLoop, die herausfinden will, was am Kursstart-Bildschirm nicht stimmt. Sie beginnt mit einer Lernenden, die über den Weiter-Button und die Quizmeldung stolpert. Im Modell von Nielsen und Landauer findet schon eine Testperson etwa 31 Prozent der Probleme, schon der erste Test lehrt also viel."), look: tt("the first bar: about 31%", "der erste Balken: etwa 31 %"), apply: () => setSel(1) },
    { title: tt("Three and five users", "Drei und fünf Testpersonen"), say: tt("Ana tests with two more learners, and they mostly repeat what the first one found, so three users reach about 65 percent. With five users she is at about 85 percent. Each new user adds less, because most of the problems have already been seen.", "Ana testet mit zwei weiteren Lernenden, und sie wiederholen meist, was die erste gefunden hat, drei Testpersonen erreichen also etwa 65 Prozent. Mit fünf Testpersonen ist sie bei etwa 85 Prozent. Jede neue Person bringt weniger, weil die meisten Probleme schon gesehen wurden."), look: tt("the second and third bars: 65% and 85%", "der zweite und dritte Balken: 65 % und 85 %"), apply: () => setSel(5) },
    { title: tt("Fifteen users, and the point", "Fünfzehn Testpersonen, und die Hauptsache"), say: tt("Fifteen users would find nearly everything, but at three times the cost of five, and by then the first problems could have been fixed. Nielsen's advice is therefore to run several small tests with about five users each, fixing what you find in between, rather than one large test. The model has limits, so use it to plan, not as a guarantee, and plan about five for each user group.", "Fünfzehn Testpersonen würden fast alles finden, aber zum Dreifachen der Kosten von fünf, und bis dahin hätten sich die ersten Probleme schon beheben lassen. Nielsens Rat lautet deshalb, mehrere kleine Tests mit je etwa fünf Testpersonen zu fahren und dazwischen zu beheben, was man findet, statt eines großen Tests. Das Modell hat Grenzen, nutzen Sie es also zum Planen, nicht als Garantie, und planen Sie für jede Nutzergruppe etwa fünf ein."), look: tt("the last bar, then the buttons to try other numbers", "der letzte Balken, dann die Schaltflächen für andere Zahlen"), apply: () => setSel(15) },
  ] satisfies StoryPlan[]);
  const cur = FIVE_USERS.find((x) => x.n === sel)!;
  const pick = (n: number) => {
    story.leave();
    setSel(n);
  };
  return (
    <Diagram label={tt("How many test users? Nielsen and Landauer's model · Exploratory", "Wie viele Testpersonen? Das Modell von Nielsen und Landauer · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("A few test users already show most of the problems, because later users mostly repeat what earlier ones found. Run several small tests with about five users each, instead of one large test.", "Wenige Testpersonen zeigen schon die meisten Probleme, weil spätere meist wiederholen, was frühere gefunden haben. Fahren Sie mehrere kleine Tests mit je etwa fünf Testpersonen statt eines großen Tests.")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <div role="radiogroup" aria-label={tt("Number of test users", "Anzahl der Testpersonen")} className="flex flex-wrap gap-2">
          {FIVE_USERS.map((x) => (
            <button key={x.n} type="button" aria-pressed={sel === x.n} onClick={() => pick(x.n)} className={clsx("btn btn-sm min-h-[40px] border", sel === x.n ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
              {tt(`${x.n} test ${x.n === 1 ? "user" : "users"}`, `${x.n} ${x.n === 1 ? "Testperson" : "Testpersonen"}`)}
            </button>
          ))}
        </div>
        <ul className="space-y-1.5" aria-label={tt("Share of usability problems found", "Anteil gefundener Usability-Probleme")}>
          {FIVE_USERS.map((x) => (
            <li key={x.n} className="grid grid-cols-[5.5rem_1fr_4.75rem] items-center gap-2 text-caption sm:grid-cols-[7.5rem_1fr_5.5rem]">
              <span className={clsx("text-ink", sel === x.n && "font-bold")}>{tt(`${x.n} test ${x.n === 1 ? "user" : "users"}`, `${x.n} ${x.n === 1 ? "Testperson" : "Testpersonen"}`)}</span>
              <span className="h-6 overflow-hidden rounded border border-line bg-canvas" aria-hidden>
                <span className={clsx("block h-6 transition-all", sel === x.n ? "bg-accent" : "bg-ash/60")} style={{ width: `${x.pct}%` }} />
              </span>
              <span className="tnum font-semibold text-ink">{x.n === 15 ? tt("close to 100%", "fast 100 %") : tt(`about ${x.pct}%`, `etwa ${x.pct} %`)}</span>
            </li>
          ))}
        </ul>
        <Insight>
          {tt(
            `In plain words: with ${cur.n} test ${cur.n === 1 ? "user" : "users"} you see ${cur.n === 15 ? "close to all" : `about ${cur.pct} percent`} of the problems. ${cur.n < 5 ? "Each further user still adds a lot." : cur.n === 5 ? "This is the usual sweet spot: most problems are found, and each further user would add little." : "The extra ten users find only a few more problems at three times the cost, so several small tests beat one large one."} The model assumes each user finds about 31% of the problems and that problems are found independently, so it is for planning, not a guarantee.`,
            `In einfachen Worten: Mit ${cur.n} ${cur.n === 1 ? "Testperson" : "Testpersonen"} sehen Sie ${cur.n === 15 ? "fast alle" : `etwa ${cur.pct} Prozent`} der Probleme. ${cur.n < 5 ? "Jede weitere Person bringt noch viel." : cur.n === 5 ? "Das ist der übliche günstige Punkt: Die meisten Probleme sind gefunden, und jede weitere Person brächte wenig." : "Die zusätzlichen zehn Personen finden nur wenige Probleme mehr zum Dreifachen der Kosten, mehrere kleine Tests schlagen also einen großen."} Das Modell nimmt an, dass jede Testperson etwa 31 % der Probleme findet und dass Probleme unabhängig gefunden werden, es dient also zum Planen, nicht als Garantie.`,
          )}
        </Insight>
      </div>
    </Diagram>
  );
}

export function QualVsQuant() {
  return (
    <CompareFig
      label={tt("Two kinds of test data answer two different questions", "Zwei Arten von Testdaten beantworten zwei verschiedene Fragen")}
      left={tt("Qualitative: why", "Qualitativ: warum")}
      right={tt("Quantitative: how many", "Quantitativ: wie viele")}
      leftKind="a"
      rightKind="s"
      rows={[
        [tt("Question: why do learners get stuck?", "Frage: Warum bleiben Lernende hängen?"), tt("Question: how many get stuck, and where?", "Frage: Wie viele bleiben hängen, und wo?")],
        [tt("Few learners (about 5 per group), watched or interviewed", "Wenige Lernende (etwa 5 pro Gruppe), beobachtet oder befragt"), tt("Many learners, counted from logs or a larger test", "Viele Lernende, gezählt aus Logs oder einem größeren Test")],
        [tt("Examples: observation, think-aloud, interviews", "Beispiele: Beobachtung, Think-aloud, Interviews"), tt("Examples: drop-out per lesson, time on task, quiz score", "Beispiele: Abbruch pro Lektion, Zeit pro Aufgabe, Quizergebnis")],
        [tt("Strength: finds causes and surprises", "Stärke: findet Ursachen und Überraschungen"), tt("Strength: sizes a problem and tracks change", "Stärke: bemisst ein Problem und verfolgt Veränderung")],
        [tt("Weakness: cannot say how common a problem is", "Schwäche: kann nicht sagen, wie verbreitet ein Problem ist"), tt("Weakness: shows the symptom, not the cause", "Schwäche: zeigt das Symptom, nicht die Ursache")],
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · how an adaptive system works (static) */

export function AdaptiveLoop() {
  return (
    <ChainFig
      label={tt("How an adaptive system works, and where transparency comes in", "Wie ein adaptives System arbeitet, und wo Transparenz ins Spiel kommt")}
      steps={[
        { h: tt("Learner acts", "Lernende handelt"), b: tt("answers, skips, stays, leaves", "antwortet, überspringt, bleibt, geht"), kind: "a" },
        { h: tt("System records", "System erfasst"), b: tt("what happened, with consent", "was passiert ist, mit Einwilligung"), kind: "m" },
        { h: tt("Model chooses", "Modell wählt"), b: tt("the next step for this learner", "den nächsten Schritt für diese Lernende"), kind: "m" },
        { h: tt("Learner sees it", "Lernende sieht es"), b: tt("and why it was suggested", "und warum es vorgeschlagen wurde"), kind: "s" },
      ]}
      loop={tt("Adaptive learning loop", "Schleife des adaptiven Lernens")}
    />
  );
}

/* ------------------------------------------------------------------ A5 · LearnLoop weighs three options (interactive) */

export function WeighExample() {
  const [sel, setSel] = useState<string | null>(null);
  const story = useStory([
    { title: tt("Option B: test low-fidelity first", "Option B: zuerst Low-Fidelity testen"), say: tt("Let us look at LearnLoop again. It wants to improve how learners start a course, it has €60,000 and three months, and it does not yet know what learners need. Three options are on the table, and we rate each on benefit (what we learn or gain), effort (money and time) and risk (what could go wrong). Option B, a low-fidelity test first, costs €8,000, which is under €10,000, so its effort is Low.", "Sehen wir uns LearnLoop noch einmal an. Es will verbessern, wie Lernende einen Kurs beginnen, hat 60.000 € und drei Monate und weiß noch nicht, was Lernende brauchen. Drei Optionen liegen auf dem Tisch, und wir bewerten jede nach Nutzen (was wir lernen oder gewinnen), Aufwand (Geld und Zeit) und Risiko (was schiefgehen kann). Option B, zuerst Low-Fidelity zu testen, kostet 8.000 €, das ist unter 10.000 €, ihr Aufwand ist also Niedrig."), look: tt("the middle row, effort", "die mittlere Zeile, Aufwand"), apply: () => setSel("x2.effort") },
    { title: tt("Why B is a good bet", "Warum B eine gute Wette ist"), say: tt("The benefit of option B is High, because after three weeks LearnLoop knows what works on structure and flow. The risk is Low: little money is spent and nothing is locked in. What B does not give is a finished product, so the build still comes afterwards, but it then rests on evidence.", "Der Nutzen von Option B ist Hoch, weil LearnLoop nach drei Wochen weiß, was bei Struktur und Ablauf funktioniert. Das Risiko ist Niedrig: Es wird wenig Geld ausgegeben, und nichts wird festgelegt. Was B nicht gibt, ist ein fertiges Produkt, der Bau kommt also noch danach, beruht dann aber auf Belegen."), look: tt("the middle row, benefit and risk", "die mittlere Zeile, Nutzen und Risiko"), apply: () => setSel("x2.risk") },
    { title: tt("Options A and C", "Optionen A und C"), say: tt("Option A, a high-fidelity prototype now, costs €36,000, so its effort is High. LearnLoop learns something, but from a polished version of an untested idea, so the benefit is Mid, and the risk is Mid because a good-looking prototype is hard to drop. Option C, building directly, costs €54,000 and teaches nothing before launch: its benefit is Low and its risk High, because problems are then found by learners who leave.", "Option A, ein High-Fidelity-Prototyp jetzt, kostet 36.000 €, ihr Aufwand ist also Hoch. LearnLoop lernt etwas, aber aus einer ausgearbeiteten Version einer ungetesteten Idee, der Nutzen ist also Mittel, und das Risiko ist Mittel, weil sich ein gut aussehender Prototyp schwer verwerfen lässt. Option C, direkt zu bauen, kostet 54.000 € und lehrt vor dem Start nichts: Ihr Nutzen ist Niedrig und ihr Risiko Hoch, weil Probleme dann von Lernenden gefunden werden, die gehen."), look: tt("the top row and the bottom row, risk", "die obere und die untere Zeile, Risiko"), apply: () => setSel("x3.risk") },
    { title: tt("Decide, and say what you do not know", "Entscheiden, und sagen, was man nicht weiß"), say: tt("So LearnLoop chooses B and says what it still does not know: whether learners leave because the start is confusing or because the course is too long. A decision with a stated gap is stronger than one that pretends there is none. Select any cell in the table to read the reason for its rating.", "LearnLoop wählt also B und sagt, was es noch nicht weiß: ob Lernende gehen, weil der Start verwirrend oder der Kurs zu lang ist. Eine Entscheidung mit einer genannten Lücke ist stärker als eine, die so tut, als gäbe es keine. Wählen Sie eine Zelle in der Tabelle, um den Grund ihrer Bewertung zu lesen."), apply: () => setSel("x2.impact") },
  ] satisfies StoryPlan[]);
  const rows: GridRow[] = [
    { id: "x1", name: tt("A · High-fidelity prototype now", "A · High-Fidelity-Prototyp jetzt"), sub: euro(36000), cells: {
      impact: { level: 2, reason: tt("Real learning, but from a polished version of an untested idea.", "Echtes Lernen, aber aus einer ausgearbeiteten Version einer ungetesteten Idee.") },
      effort: { level: 3, note: euro(36000), reason: tt("€36,000 is above €25,000, so the rule gives High.", "36.000 € liegen über 25.000 €, die Regel ergibt also Hoch.") },
      risk: { level: 2, reason: tt("If the idea is wrong, most of the budget is spent, and the polish makes it hard to drop.", "Ist die Idee falsch, ist der größte Teil des Budgets ausgegeben, und die Politur macht es schwer, sie zu verwerfen.") },
    } },
    { id: "x2", name: tt("B · Low-fidelity test first", "B · Zuerst Low-Fidelity testen"), sub: euro(8000), cells: {
      impact: { level: 3, reason: tt("Clear evidence on structure and flow in three weeks.", "Klare Belege zu Struktur und Ablauf in drei Wochen.") },
      effort: { level: 1, note: euro(8000), reason: tt("€8,000 is under €10,000, so the rule gives Low.", "8.000 € liegen unter 10.000 €, die Regel ergibt also Niedrig.") },
      risk: { level: 1, reason: tt("Small money and nothing locked in; the build still has to follow.", "Wenig Geld und nichts festgelegt; der Bau muss noch folgen.") },
    } },
    { id: "x3", name: tt("C · Build directly, no test", "C · Direkt bauen, kein Test"), sub: euro(54000), cells: {
      impact: { level: 1, reason: tt("No evidence before launch.", "Keine Belege vor dem Start.") },
      effort: { level: 3, note: euro(54000), reason: tt("€54,000 is above €25,000, so the rule gives High.", "54.000 € liegen über 25.000 €, die Regel ergibt also Hoch.") },
      risk: { level: 3, reason: tt("Problems are found by learners who leave, and rework would use the rest of the budget.", "Probleme werden von Lernenden gefunden, die gehen, und Nacharbeit würde den Rest des Budgets verbrauchen.") },
    } },
  ];
  const cols = [
    { id: "impact", label: tt("Benefit", "Nutzen") },
    { id: "effort", label: tt("Effort", "Aufwand") },
    { id: "risk", label: tt("Risk", "Risiko") },
  ];
  return (
    <Diagram label={tt("A worked example: LearnLoop weighs three options · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei Optionen ab · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("When user needs are unclear and time is short, the cheapest test that gives real evidence usually beats both building at once and testing nothing. Rate every option on benefit, effort and risk, then decide.", "Wenn die Nutzerbedürfnisse unklar sind und die Zeit knapp ist, schlägt der günstigste Test, der echte Belege liefert, meist sowohl das sofortige Bauen als auch das Nicht-Testen. Bewerten Sie jede Option nach Nutzen, Aufwand und Risiko, dann entscheiden Sie.")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <CostBands
          title={tt("LearnLoop, three options: cost against the effort rule and the €60,000 budget", "LearnLoop, drei Optionen: Kosten gegen die Aufwandsregel und das Budget von 60.000 €")}
          bars={[
            { name: tt("A · High-fidelity now", "A · High-Fidelity jetzt"), cost: 36000 },
            { name: tt("B · Low-fidelity first", "B · Zuerst Low-Fidelity"), cost: 8000 },
            { name: tt("C · Build directly", "C · Direkt bauen"), cost: 54000 },
          ]}
          budget={60000}
          bands={[
            { to: 10000, label: tt("Low", "Niedrig") },
            { to: 25000, label: tt("Mid", "Mittel") },
            { to: null, label: tt("High", "Hoch") },
          ]}
        />
        <OptionGrid label={tt("LearnLoop · budget €60,000, three months", "LearnLoop · Budget 60.000 €, drei Monate")} caption={tt("Three options for LearnLoop (Case assumption, example company)", "Drei Optionen für LearnLoop (Fallannahme, Beispielunternehmen)")} rows={rows} cols={cols} selected={sel} onSelect={(k) => { story.leave(); setSel(k); }} />
        <p className="rounded-md border border-line bg-canvas px-3 py-2 text-caption text-ink">
          <span className="smallcaps mr-1.5">{tt("Still unknown", "Noch unbekannt")}</span>
          <Gloss>{tt("Whether learners leave because the start is confusing or because the course is too long. LearnLoop would interview six learners who left before it commits more money.", "Ob Lernende gehen, weil der Start verwirrend oder der Kurs zu lang ist. LearnLoop würde sechs Ausgestiegene befragen, bevor es mehr Geld bindet.")}</Gloss>
        </p>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B1 · stage the investment (interactive) */

type Scenario = "all" | "gate1" | "gate2";
const STAGE_COST = [8000, 40000, 120000];

export function StagedInvestment() {
  const [sc, setSc] = useState<Scenario>("all");
  const story = useStory([
    { title: tt("One big bet", "Eine große Wette"), say: tt("Let us look at LearnLoop, which wants to add adaptive learning because its competitors have it. A single decision would put €168,000 into the whole system at once, and if learners do not use it, all of that money is gone. So LearnLoop splits the plan into three stages: a small test, a pilot, and only then the full roll-out.", "Sehen wir uns LearnLoop an, das adaptives Lernen einführen will, weil seine Wettbewerber es haben. Eine einzige Entscheidung würde 168.000 € auf einmal in das ganze System stecken, und wenn Lernende es nicht nutzen, ist all das Geld weg. LearnLoop teilt den Plan deshalb in drei Stufen: einen kleinen Test, einen Pilot und erst dann die volle Einführung."), look: tt("the whole chain from left to right", "die ganze Kette von links nach rechts"), apply: () => setSc("all") },
    { title: tt("Gate 1 is missed", "Gate 1 wird verfehlt"), say: tt("Stage 1 costs €8,000: a paper test with five learners. Gate 1 was written down in advance: at least four of five learners must complete the task. Suppose only three do. LearnLoop changes the design and tests again, having spent €8,000 and not €168,000, and the pilot and the roll-out stay unfunded.", "Stufe 1 kostet 8.000 €: ein Papiertest mit fünf Lernenden. Gate 1 wurde vorab aufgeschrieben: Mindestens vier von fünf Lernenden müssen die Aufgabe schaffen. Angenommen, nur drei tun es. LearnLoop ändert das Design und testet erneut, hat 8.000 € ausgegeben und nicht 168.000 €, und Pilot und Einführung bleiben unfinanziert."), look: tt("gate 1 and the dashed boxes after it", "Gate 1 und die gestrichelten Kästen danach"), apply: () => setSc("gate1") },
    { title: tt("Gate 2 is missed", "Gate 2 wird verfehlt"), say: tt("Now suppose the design passed gate 1, and the pilot ran in one course for €40,000. Gate 2 asks: is completion at least five points above the control group after eight weeks? If it is not, LearnLoop stops before the roll-out. It has spent €48,000 and keeps €120,000, and it has learned that the idea does not move completion.", "Nun angenommen, das Design bestand Gate 1, und der Pilot lief in einem Kurs für 40.000 €. Gate 2 fragt: Liegt die Completion nach acht Wochen mindestens fünf Punkte über der Kontrollgruppe? Wenn nicht, stoppt LearnLoop vor der Einführung. Es hat 48.000 € ausgegeben und behält 120.000 €, und es hat gelernt, dass die Idee die Completion nicht bewegt."), look: tt("gate 2 and the kept-back amount", "Gate 2 und der zurückgehaltene Betrag"), apply: () => setSc("gate2") },
    { title: tt("What to take from it", "Was Sie mitnehmen"), say: tt("So spend a little to learn, and let the evidence decide the next amount. Every gate carries a figure and a date written down before the stage starts, and a stage that misses its gate is changed or stopped, not extended by default. That is also why “partly” is often the right answer to “do we invest in adaptive learning?”. Select a scenario yourself to see what is spent and what is kept.", "Geben Sie also wenig aus, um zu lernen, und lassen Sie die Belege über den nächsten Betrag entscheiden. Jedes Gate trägt eine Zahl und ein Datum, die vor Beginn der Stufe aufgeschrieben wurden, und eine Stufe, die ihr Gate verfehlt, wird geändert oder gestoppt, nicht standardmäßig verlängert. Deshalb ist „teilweise“ oft die richtige Antwort auf „Investieren wir in adaptives Lernen?“. Wählen Sie selbst ein Szenario, um zu sehen, was ausgegeben und was zurückgehalten wird."), apply: () => setSc("all") },
  ] satisfies StoryPlan[]);
  const reached = sc === "all" ? 3 : sc === "gate2" ? 2 : 1;
  const spent = STAGE_COST.slice(0, reached).reduce((s, v) => s + v, 0);
  const total = STAGE_COST.reduce((s, v) => s + v, 0);
  const kept = total - spent;
  const missedGate = sc === "gate1" ? 1 : sc === "gate2" ? 2 : 0;
  const boxes = [
    { key: "s1", kind: "stage", i: 0, h: tt("Stage 1 · Test the idea", "Stufe 1 · Die Idee testen"), b: tt("Paper or clickable prototype with 5 learners.", "Papier- oder klickbarer Prototyp mit 5 Lernenden."), cost: STAGE_COST[0] },
    { key: "g1", kind: "gate", i: 1, h: "Gate 1", b: tt("Do at least 4 of 5 learners complete the task?", "Schaffen mindestens 4 von 5 Lernenden die Aufgabe?") },
    { key: "s2", kind: "stage", i: 1, h: tt("Stage 2 · Pilot", "Stufe 2 · Pilot"), b: tt("One course, one rule-based step, about 30 learners.", "Ein Kurs, ein regelbasierter Schritt, etwa 30 Lernende."), cost: STAGE_COST[1] },
    { key: "g2", kind: "gate", i: 2, h: "Gate 2", b: tt("Is completion 5 points above the control group after 8 weeks?", "Liegt die Completion nach 8 Wochen 5 Punkte über der Kontrollgruppe?") },
    { key: "s3", kind: "stage", i: 2, h: tt("Stage 3 · Scale", "Stufe 3 · Skalieren"), b: tt("More courses and, only if the data supports it, algorithms.", "Mehr Kurse und, nur wenn die Daten es tragen, Algorithmen."), cost: STAGE_COST[2] },
  ];
  const state = (b: (typeof boxes)[number]): "done" | "missed" | "passed" | "off" => {
    if (b.kind === "stage") return b.i < reached ? "done" : "off";
    return b.i === missedGate ? "missed" : b.i < (missedGate || 3) ? "passed" : "off";
  };
  return (
    <Diagram label={tt("Stage the investment: money follows evidence · Exploratory", "Die Investition stufen: Geld folgt Belegen · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("Spend a little to learn, and let the evidence decide the next amount. A gate carries a figure and a date written down before the stage starts, and a stage that misses its gate is changed or stopped.", "Geben Sie wenig aus, um zu lernen, und lassen Sie die Belege über den nächsten Betrag entscheiden. Ein Gate trägt eine Zahl und ein Datum, die vor Beginn der Stufe aufgeschrieben wurden, und eine Stufe, die ihr Gate verfehlt, wird geändert oder gestoppt.")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <div role="radiogroup" aria-label={tt("What happens at the gates", "Was an den Gates passiert")} className="flex flex-wrap gap-2">
          {([
            ["all", tt("Both gates passed", "Beide Gates bestanden")],
            ["gate1", tt("Gate 1 missed", "Gate 1 verfehlt")],
            ["gate2", tt("Gate 2 missed", "Gate 2 verfehlt")],
          ] as [Scenario, string][]).map(([id, label]) => (
            <button key={id} type="button" aria-pressed={sc === id} onClick={() => { story.leave(); setSc(id); }} className={clsx("btn btn-sm min-h-[40px] border", sc === id ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
              {label}
            </button>
          ))}
        </div>
        <ol className="flex flex-col gap-1.5 md:flex-row md:items-stretch md:gap-0">
          {boxes.map((b, idx) => {
            const st = state(b);
            return (
              <li key={b.key} className="flex flex-col items-stretch gap-1.5 md:min-w-0 md:flex-1 md:flex-row md:items-center md:gap-0">
                <div className={clsx("h-full min-w-0 flex-1 rounded-lg border-2 p-2.5", st === "done" && "border-signal/60 bg-signalSoft", st === "passed" && "border-signal/60 bg-paper", st === "missed" && "border-dashed border-rust bg-rustSoft", st === "off" && "border-dashed border-ash/50 bg-mist/60 opacity-80", story.step !== null && b.i === (missedGate || 3) && b.kind === "gate" && "anim-pulse")}>
                  <p className="smallcaps text-ash">
                    {b.kind === "gate" ? (st === "missed" ? tt("Gate · missed: change or stop", "Gate · verfehlt: ändern oder stoppen") : st === "passed" ? tt("Gate · passed", "Gate · bestanden") : tt("Gate · not reached", "Gate · nicht erreicht")) : st === "done" ? tt("Funded", "Finanziert") : tt("Not funded", "Nicht finanziert")}
                  </p>
                  <p className="text-body font-semibold text-ink">{b.h}</p>
                  <p className="mt-0.5 text-caption text-ink">
                    <Gloss>{b.b}</Gloss>
                  </p>
                  {b.kind === "stage" && b.cost !== undefined && <p className="tnum mt-1 text-caption font-semibold text-ink">{euro(b.cost)}</p>}
                </div>
                {idx < boxes.length - 1 && (
                  <span aria-hidden className="self-center text-lg text-ash md:px-1">
                    <span className="md:hidden">↓</span>
                    <span className="hidden md:inline">→</span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
        <p className="rounded-md border border-line bg-canvas px-3 py-2 text-caption text-ink">
          <span className="smallcaps mr-1.5">{tt("Case assumption", "Fallannahme")}</span>
          {tt(`LearnLoop spends ${euro(spent)} and keeps back ${euro(kept)} of ${euro(total)}.`, `LearnLoop gibt ${euro(spent)} aus und hält ${euro(kept)} von ${euro(total)} zurück.`)}
        </p>
        <Insight>
          {sc === "all"
            ? tt("In plain words: both gates were passed, so every stage was funded in turn and each had evidence before the next. The money was still released in steps, so the plan could have stopped at either gate.", "In einfachen Worten: Beide Gates wurden bestanden, jede Stufe wurde also der Reihe nach finanziert und hatte Belege vor der nächsten. Das Geld wurde trotzdem in Schritten freigegeben, der Plan hätte also an jedem Gate stoppen können.")
            : sc === "gate1"
              ? tt(`In plain words: the first gate was missed, so LearnLoop stops after ${euro(spent)} and changes the design. The ${euro(kept)} that would have gone into the pilot and the roll-out is still there.`, `In einfachen Worten: Das erste Gate wurde verfehlt, LearnLoop hört also nach ${euro(spent)} auf und ändert das Design. Die ${euro(kept)}, die in Pilot und Einführung geflossen wären, sind noch da.`)
              : tt(`In plain words: the pilot ran, and the second gate was missed, so LearnLoop does not roll out. It spent ${euro(spent)} to find out that the idea does not move completion, and keeps ${euro(kept)}.`, `In einfachen Worten: Der Pilot lief, und das zweite Gate wurde verfehlt, LearnLoop führt also nicht aus. Es gab ${euro(spent)} aus, um zu erfahren, dass die Idee die Completion nicht bewegt, und behält ${euro(kept)}.`)}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B2 · where six features sit: value against data and complexity (interactive) */

export function FeatureMatrix() {
  const [sel, setSel] = useState<string | null>(null);
  const [spot, setSpot] = useState<string | null>(null);
  const pts: MatrixPoint[] = [
    { id: "a", letter: "A", x: 0.38, y: 0.1, name: tt("Progress overview", "Fortschrittsübersicht"), reading: tt("It gives the learner a sign of progress for very little data: a count of finished units.", "Sie gibt der Lernenden ein Zeichen für den Fortschritt mit sehr wenig Daten: eine Zahl abgeschlossener Einheiten.") },
    { id: "b", letter: "B", x: 0.7, y: 0.22, name: tt("Next-step path", "Pfad zum nächsten Schritt"), reading: tt("It tells the learner what comes next and needs only the course structure, so a lot of value comes for little data.", "Sie sagt der Lernenden, was als Nächstes kommt, und braucht nur die Kursstruktur, viel Wert kommt also mit wenig Daten.") },
    { id: "c", letter: "C", x: 0.78, y: 0.4, name: tt("Skip-what-you-know test", "Test zum Überspringen von Bekanntem"), reading: tt("It saves time for learners who know the basics and needs a pre-test and a few rules, not an algorithm.", "Er spart Lernenden, die die Grundlagen kennen, Zeit und braucht einen Vortest und ein paar Regeln, keinen Algorithmus.") },
    { id: "d", letter: "D", x: 0.4, y: 0.62, name: tt("Recommendation list", "Empfehlungsliste"), reading: tt("It needs data on many learners to work, and at first it gives only modest value.", "Sie braucht Daten über viele Lernende, um zu funktionieren, und gibt zunächst nur bescheidenen Wert.") },
    { id: "e", letter: "E", x: 0.72, y: 0.7, name: tt("Adaptive difficulty", "Adaptiver Schwierigkeitsgrad"), reading: tt("The value could be high, but it needs plenty of data and content in several variants.", "Der Wert könnte hoch sein, aber es braucht viele Daten und Inhalte in mehreren Varianten.") },
    { id: "f", letter: "F", x: 0.6, y: 0.84, name: tt("Full AI tutor", "Vollständiger KI-Tutor"), reading: tt("It needs the most data and complexity, with an uncertain value, and it brings the cold start and transparency problems.", "Er braucht die meisten Daten und die meiste Komplexität bei unsicherem Wert, und er bringt die Probleme von Cold Start und Transparenz.") },
  ];
  const story = useStory([
    { title: tt("What gives most for least", "Was am meisten für am wenigsten gibt"), say: tt("Let us look at LearnLoop, which is deciding what to build next. The team lists six features and places each by how much it helps the learner and by how much data and complexity it needs. Start with feature C, a short test that lets learners skip what they already know. It gives high value, and it needs a pre-test and a few rules, not an algorithm, so it sits in “Start here”.", "Sehen wir uns LearnLoop an, das entscheidet, was als Nächstes gebaut wird. Das Team listet sechs Funktionen und ordnet jede danach ein, wie sehr sie der Lernenden hilft und wie viele Daten und wie viel Komplexität sie braucht. Beginnen Sie mit Funktion C, einem kurzen Test, mit dem Lernende überspringen, was sie schon wissen. Sie gibt hohen Wert und braucht einen Vortest und ein paar Regeln, keinen Algorithmus, sie liegt also in „Start here“."), look: tt("point C, bottom right", "Punkt C, unten rechts"), apply: () => { setSel("c"); setSpot("c"); } },
    { title: tt("What can wait", "Was warten kann"), say: tt("Now compare feature F, a full AI tutor. It sits at the top: the value for the learner could be high, but it needs the most data and complexity, and LearnLoop has little data. Features like this are for later, after small steps have produced evidence. Feature D, a recommendation list, is a different trap: it needs data on many learners, and at first it gives modest value.", "Vergleichen Sie nun Funktion F, einen vollständigen KI-Tutor. Er liegt oben: Der Wert für die Lernende könnte hoch sein, aber er braucht die meisten Daten und die meiste Komplexität, und LearnLoop hat wenig Daten. Funktionen wie diese sind für später, nachdem kleine Schritte Belege geliefert haben. Funktion D, eine Empfehlungsliste, ist eine andere Falle: Sie braucht Daten über viele Lernende und gibt zunächst bescheidenen Wert."), look: tt("points F and D, top half", "Punkte F und D, obere Hälfte"), apply: () => { setSel("f"); setSpot("f"); } },
    { title: tt("What to take from it", "Was Sie mitnehmen"), say: tt("So place a feature by two questions: how much does it help the learner, and how much data and complexity does it need? Start with what gives most for least, and let the data-hungry features wait for their gate. Select any point yourself to read where it sits and why, and remember that the positions are a reading of this example, not a score.", "Ordnen Sie eine Funktion also mit zwei Fragen ein: Wie sehr hilft sie der Lernenden, und wie viele Daten und wie viel Komplexität braucht sie? Beginnen Sie mit dem, was am meisten für am wenigsten gibt, und lassen Sie die datenhungrigen Funktionen auf ihr Gate warten. Wählen Sie selbst einen Punkt, um zu lesen, wo er liegt und warum, und bedenken Sie, dass die Positionen eine Lesart dieses Beispiels sind, keine Note."), apply: () => { setSel(null); setSpot(null); } },
  ] satisfies StoryPlan[]);
  return (
    <Diagram label={tt("A worked example: LearnLoop places six features · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop ordnet sechs Funktionen ein · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("Place a feature by two questions: how much does it help the learner, and how much data and complexity does it need? Start with what gives most for least, and let the data-hungry features wait.", "Ordnen Sie eine Funktion mit zwei Fragen ein: Wie sehr hilft sie der Lernenden, und wie viele Daten und wie viel Komplexität braucht sie? Beginnen Sie mit dem, was am meisten für am wenigsten gibt, und lassen Sie die datenhungrigen Funktionen warten.")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <MatrixFig
          title={tt("LearnLoop: where six features sit by value to the learner and by the data and complexity they need", "LearnLoop: wo sechs Funktionen nach Wert für die Lernende und nach benötigten Daten und Komplexität liegen")}
          xLabel={tt("Value to the learner", "Wert für die Lernende")}
          yLabel={tt("Data and complexity needed", "Benötigte Daten und Komplexität")}
          quads={[tt("Avoid for now", "Vorerst meiden"), tt("Plan and prepare", "Planen und vorbereiten"), tt("Easy extras", "Leichte Extras"), tt("Start here", "Hier beginnen")]}
          points={pts}
          selected={sel}
          onSelect={(id) => {
            story.leave();
            setSpot(null);
            setSel(id);
          }}
          spot={spot}
        />
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B3 · a decision under uncertainty, filled in for LearnLoop (static) */

export function DecisionFrame() {
  return (
    <DecisionFrameFig
      label={tt("A decision under uncertainty, filled in for LearnLoop", "Eine Entscheidung unter Unsicherheit, für LearnLoop ausgefüllt")}
      caption={tt("The four boxes make a decision checkable. The two boxes below make the next one less dependent on one person's taste.", "Die vier Kästen machen eine Entscheidung überprüfbar. Die zwei Kästen darunter machen die nächste weniger abhängig vom Geschmack einer Person.")}
      boxes={[
        [tt("I decide", "Ich entscheide"), tt("Run a rule-based pilot in one course first.", "Zuerst einen regelbasierten Pilot in einem Kurs fahren.")],
        [tt("I do not know", "Ich weiß nicht"), tt("Whether learners want recommended steps, and whether our data is good enough.", "Ob Lernende empfohlene Schritte wollen und ob unsere Daten gut genug sind.")],
        [tt("I reverse if", "Ich nehme zurück, wenn"), tt("Pilot completion is not at least 5 points above the control group after 8 weeks.", "die Completion im Pilot nach 8 Wochen nicht mindestens 5 Punkte über der Kontrollgruppe liegt.")],
        [tt("I give up", "Ich verzichte auf"), tt("The AI recommendation engine this year.", "die KI-Empfehlungs-Engine in diesem Jahr.")],
      ]}
      rule={[
        [tt("Who decides", "Wer entscheidet"), tt("The product lead with the head of data.", "Der Product Lead mit der Leiterin Daten.")],
        [tt("On what evidence", "Auf welcher Grundlage"), tt("A pilot with a control group, learner interviews, drop-out data per lesson.", "Ein Pilot mit Kontrollgruppe, Interviews mit Lernenden, Abbruchdaten pro Lektion.")],
      ]}
    />
  );
}
