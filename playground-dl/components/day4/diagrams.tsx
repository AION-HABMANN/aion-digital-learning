"use client";

import { useState } from "react";
import clsx from "clsx";
import { OptionGrid } from "@/components/day1/diagrams";
import type { GridRow } from "@/components/day1/diagrams";
import { IterateLoop, LessonBuilderMock, LoyaltyCard, MeasureThumb, MetricMini, QuizMock, ResultScreen } from "@/components/day4/mocks";
import type { PointsPhase, Principles5 } from "@/components/day4/mocks";
import { Svg, Txt } from "@/components/day/mockKit";
import { Diagram, Insight, ThePoint } from "@/components/materi/kit";
import { Gloss } from "@/lib/glossify";
import { tt } from "@/lib/lang";

/**
 * Day 4 · the teaching diagrams of Materi A. Interactive ones (Tom's quizzes with and without points, the lesson screen that gains a principle at a time,
 * the LearnLoop weighing grid) carry "The point" and an always-visible "What this shows" (CLAUDE.md #20, #36, #51). The static ones are
 * drawn pictures (#52). Example companies: LearnLoop (an online-course provider) and the made-up Tom and Anna; never MotivaLearn, so no task is answered here.
 */

/* ------------------------------------------------------------------ A1 · Tom's quizzes, with and without points (interactive) */

const QUIZ_WEEKS: Record<PointsPhase, number[]> = { before: [4, 4, 4, 4], points: [6, 7, 7, 7], ended: [3, 2, 2, 2] };
const PHASE_ORDER: PointsPhase[] = ["before", "points", "ended"];

export function TomQuizzes() {
  const [phase, setPhase] = useState<PointsPhase>("before");
  const weeks = PHASE_ORDER.slice(0, PHASE_ORDER.indexOf(phase) + 1).flatMap((p) => QUIZ_WEEKS[p].map((v) => ({ v, p })));
  const avg = (p: PointsPhase) => Math.round((QUIZ_WEEKS[p].reduce((a, b) => a + b, 0) / QUIZ_WEEKS[p].length) * 10) / 10;
  const btns: [PointsPhase, string][] = [
    ["before", tt("Before points", "Vor den Punkten")],
    ["points", tt("With points", "Mit Punkten")],
    ["ended", tt("Points ended", "Punkte beendet")],
  ];
  return (
    <Diagram label={tt("Tom's quizzes, with and without points · Exploratory · Case assumption", "Toms Quizze, mit und ohne Punkte · Explorativ · Fallannahme")}>
      <div className="space-y-3">
        <ThePoint>{tt("A reward from outside can start a behaviour, but it can replace the learner's own reason, and then the behaviour fades when the reward stops.", "Eine Belohnung von außen kann ein Verhalten anstoßen, aber sie kann den eigenen Grund der Lernenden ersetzen, und dann verfliegt das Verhalten, wenn die Belohnung aufhört.")}</ThePoint>
        <div role="radiogroup" aria-label={tt("The platform", "Die Plattform")} className="flex flex-wrap gap-2">
          {btns.map(([id, label]) => (
            <button key={id} type="button" aria-pressed={phase === id} onClick={() => { setPhase(id); }} className={clsx("btn btn-sm min-h-[40px] border", phase === id ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
              {label}
            </button>
          ))}
        </div>
        <div className={"grid items-end gap-3 sm:grid-cols-2"}>
          <div className="mx-auto w-full max-w-[300px]">
            <QuizMock phase={phase} />
          </div>
          <div>
            <p className="text-caption font-semibold text-ink">{tt("Quizzes Tom does each week", "Quizze, die Tom pro Woche macht")}</p>
            <div className="flex h-36 items-end gap-1 rounded-lg border-2 border-line bg-paper p-2" role="img" aria-label={tt(`Quizzes per week: ${weeks.map((w) => w.v).join(", ")}`, `Quizze pro Woche: ${weeks.map((w) => w.v).join(", ")}`)}>
              {Array.from({ length: 12 }, (_, i) => {
                const w = weeks[i];
                return (
                  <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-0.5">
                    {w && <span className="tnum text-micro font-bold text-ink">{w.v}</span>}
                    <div className={clsx("w-full rounded-t border", w ? (w.p === "points" ? "border-ink bg-ink" : w.p === "ended" ? "border-ash bg-ash" : "border-ash bg-ash/70") : "border-dashed border-line")} style={{ height: w ? `${w.v * 11}%` : "6%" }} />
                  </div>
                );
              })}
            </div>
            <p className="mt-1 text-micro normal-case tracking-normal text-ash">{tt("weeks 1 to 12 · dark bars: points running", "Woche 1 bis 12 · dunkle Balken: Punkte laufen")}</p>
          </div>
        </div>
        <Insight>
          {phase === "before"
            ? tt(`In plain words: with no points, Tom does about ${avg("before")} quizzes a week. His reason is inside the quiz: he likes knowing the answer. The figures are made up to show the pattern the research describes.`, `In einfachen Worten: Ohne Punkte macht Tom etwa ${avg("before")} Quizze pro Woche. Sein Grund liegt im Quiz selbst: Er mag es, die Antwort zu wissen. Die Zahlen sind erfunden, um das Muster zu zeigen, das die Forschung beschreibt.`)
            : phase === "points"
              ? tt(`In plain words: with points, Tom does about ${avg("points")} a week, so the reward works at first. The risk is hidden: he now opens a quiz partly to collect points.`, `In einfachen Worten: Mit Punkten macht Tom etwa ${avg("points")} pro Woche, die Belohnung wirkt also zunächst. Das Risiko liegt verborgen: Er öffnet ein Quiz nun auch, um Punkte zu sammeln.`)
              : tt(`In plain words: when the points end, Tom drops to about ${avg("ended")} a week, below the ${avg("before")} he started with. The reward had become the reason, and the reason left with it. Deci, Koestner and Ryan (1999) found this pattern for expected tangible rewards.`, `In einfachen Worten: Wenn die Punkte enden, fällt Tom auf etwa ${avg("ended")} pro Woche, unter die ${avg("before")}, mit denen er begann. Die Belohnung war zum Grund geworden, und der Grund ging mit ihr. Deci, Koestner und Ryan (1999) fanden dieses Muster bei erwarteten materiellen Belohnungen.`)}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A1 · the three needs of Self-Determination Theory, drawn (static) */

export function SdtVenn() {
  return (
    <Diagram
      label={tt("Self-Determination Theory: three needs that support lasting motivation", "Selbstbestimmungstheorie: drei Bedürfnisse, die dauerhafte Motivation stützen")}
      caption={tt("A platform can offer something for each need. Where all three meet, motivation lasts after the novelty is gone.", "Eine Plattform kann für jedes Bedürfnis etwas bieten. Wo sich alle drei treffen, hält die Motivation auch dann, wenn das Neue vorbei ist.")}
    >
      <Svg
        viewBox="0 0 340 290"
        label={tt("Three overlapping circles: autonomy, competence and relatedness, each with an example from a learning platform, and lasting motivation where they meet", "Drei überlappende Kreise: Autonomie, Kompetenz und Zugehörigkeit, jeweils mit einem Beispiel von einer Lernplattform, und dauerhafte Motivation dort, wo sie sich treffen")}
        className="mx-auto h-auto w-full max-w-[420px]"
      >
        <circle cx="122" cy="104" r="84" fill="#E2E2E2" fillOpacity="0.8" stroke="#3A3A3A" strokeWidth="1.8" />
        <circle cx="218" cy="104" r="84" fill="#BDBDBD" fillOpacity="0.55" stroke="#3A3A3A" strokeWidth="1.8" strokeDasharray="7 4" />
        <circle cx="170" cy="186" r="84" fill="#F4F4F4" fillOpacity="0.85" stroke="#3A3A3A" strokeWidth="1.8" strokeDasharray="2 4" />
        <Txt x={84} y={78} size={13} bold anchor="middle">{tt("Autonomy", "Autonomie")}</Txt>
        <Txt x={84} y={94} size={9.5} anchor="middle">{tt("I choose my path", "Ich wähle meinen Weg")}</Txt>
        <Txt x={84} y={106} size={9.5} anchor="middle">{tt("and my pace", "und mein Tempo")}</Txt>
        <Txt x={256} y={78} size={13} bold anchor="middle">{tt("Competence", "Kompetenz")}</Txt>
        <Txt x={256} y={94} size={9.5} anchor="middle">{tt("I see that I am", "Ich sehe, dass ich")}</Txt>
        <Txt x={256} y={106} size={9.5} anchor="middle">{tt("getting better", "besser werde")}</Txt>
        <Txt x={170} y={236} size={13} bold anchor="middle">{tt("Relatedness", "Zugehörigkeit")}</Txt>
        <Txt x={170} y={252} size={9.5} anchor="middle">{tt("My trainer comments, my", "Mein Trainer kommentiert, mein")}</Txt>
        <Txt x={170} y={264} size={9.5} anchor="middle">{tt("team learns with me", "Team lernt mit mir")}</Txt>
        <Txt x={170} y={142} size={10.5} bold anchor="middle">{tt("Lasting", "Dauerhafte")}</Txt>
        <Txt x={170} y={155} size={10.5} bold anchor="middle">{tt("motivation", "Motivation")}</Txt>
      </Svg>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A2 · one lesson screen that gains a principle at a time (interactive) */

const NONE5: Principles5 = { goal: false, task: false, feedback: false, progress: false, example: false };
const ALL5: Principles5 = { goal: true, task: true, feedback: true, progress: true, example: true };

export function ScreenBuilder() {
  const [on, setOn] = useState<Principles5>(NONE5);
  const count = Object.values(on).filter(Boolean).length;
  const toggle = (k: keyof Principles5) => setOn((s) => ({ ...s, [k]: !s[k] }));
  const sw: [keyof Principles5, string, string][] = [
    ["goal", tt("Clarity: a goal sentence", "Klarheit: ein Zielsatz"), tt("the learner knows what this is for", "die Lernende weiß, wofür das da ist")],
    ["task", tt("Activation: a task", "Aktivierung: eine Aufgabe"), tt("the learner does something", "die Lernende tut etwas")],
    ["feedback", tt("Feedback: a result and a next step", "Feedback: ein Ergebnis und ein nächster Schritt"), tt("the learner knows how they did", "die Lernende weiß, wie sie es gemacht hat")],
    ["progress", tt("Progression: a progress bar", "Progression: ein Fortschrittsbalken"), tt("the learner sees how far they have come", "die Lernende sieht, wie weit sie gekommen ist")],
    ["example", tt("Relevance: a work example", "Relevanz: ein Praxisbeispiel"), tt("the learner sees why it matters at work", "die Lernende sieht, warum es bei der Arbeit zählt")],
  ];
  return (
    <Diagram label={tt("One lesson screen that gains the five design principles, one at a time · Exploratory · Case assumption", "Ein Lektionsbildschirm, der die fünf Gestaltungsprinzipien bekommt, eines nach dem anderen · Explorativ · Fallannahme")}>
      <div className="space-y-3">
        <ThePoint>{tt("The same content can motivate or not, depending on whether five things are visible on the screen: a goal, something to do, a result, a sign of progress and a reason.", "Derselbe Inhalt kann motivieren oder nicht, je nachdem, ob fünf Dinge auf dem Bildschirm sichtbar sind: ein Ziel, etwas zu tun, ein Ergebnis, ein Zeichen von Fortschritt und ein Grund.")}</ThePoint>
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:items-start">
          <div role="group" aria-label={tt("The five principles", "Die fünf Prinzipien")} className="grid gap-2">
            {sw.map(([k, label, sub]) => (
              <button key={k} type="button" aria-pressed={on[k]} onClick={() => { toggle(k); }} className={clsx("min-h-[44px] rounded-lg border px-3 py-2 text-left text-caption transition-colors", on[k] ? "border-accent bg-accentSoft ring-2 ring-gold" : "border-line bg-paper hover:border-ash")}>
                <span className="font-semibold text-ink"><span aria-hidden className="mr-1.5">{on[k] ? "☑" : "☐"}</span>{label}</span>
                <span className="block pl-5 text-ash">{sub}</span>
              </button>
            ))}
          </div>
          <div className={"mx-auto w-full max-w-[420px]"}>
            <LessonBuilderMock on={on} />
          </div>
        </div>
        <Insight>
          {count === 0
            ? tt("In plain words: the screen is one long block of reading. None of the five principles is on it, so the learner cannot tell what it is for, does nothing, gets no answer and sees no progress. Switch one on to see what it adds.", "In einfachen Worten: Der Bildschirm ist ein langer Lesetext. Keines der fünf Prinzipien ist darauf, die Lernende kann also nicht erkennen, wofür er da ist, tut nichts, bekommt keine Antwort und sieht keinen Fortschritt. Schalten Sie eines ein, um zu sehen, was es hinzufügt.")
            : count === 5
              ? tt("In plain words: all five principles are on the screen. The content is the same as before; what changed is that the learner can see a goal, do a task, get a result, watch their progress and see why it matters. That is what “design for motivation” means here.", "In einfachen Worten: Alle fünf Prinzipien sind auf dem Bildschirm. Der Inhalt ist derselbe wie vorher; geändert hat sich, dass die Lernende ein Ziel sieht, eine Aufgabe löst, ein Ergebnis bekommt, ihren Fortschritt verfolgt und sieht, warum es zählt. Das meint hier „für Motivation gestalten“.")
              : tt(`In plain words: ${count} of the five principles are on the screen, so ${5 - count} are still missing. The learner meets what is on, and still meets the gaps. Prefer the principles that work for every learner (a goal, a result, a progress bar) before an extra for some.`, `In einfachen Worten: ${count} der fünf Prinzipien sind auf dem Bildschirm, ${5 - count} fehlen also noch. Die Lernende trifft auf das, was an ist, und weiterhin auf die Lücken. Bevorzugen Sie die Prinzipien, die für jede Lernende wirken (ein Ziel, ein Ergebnis, einen Fortschrittsbalken), vor einem Extra für einige.`)}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A3 · three pictures: feedback, rewards, loyalty cards (static) */

export function FeedbackPicture() {
  const q = [tt("Where am I going?", "Wohin gehe ich?"), tt("How am I going?", "Wie komme ich voran?"), tt("Where to next?", "Was kommt als Nächstes?")];
  const msgs: { text: string[]; marks: boolean[]; name: string }[] = [
    { name: tt("Feedback that only praises", "Feedback, das nur lobt"), text: [tt("Well done!", "Gut gemacht!")], marks: [false, false, false] },
    { name: tt("Feedback that answers the three questions", "Feedback, das die drei Fragen beantwortet"), text: [tt("Goal: write a counter-offer.", "Ziel: ein Gegenangebot schreiben."), tt("Your offer names a price but no condition.", "Ihr Angebot nennt einen Preis, aber keine Bedingung."), tt("Next: task 4", "Weiter: Aufgabe 4")], marks: [true, true, true] },
  ];
  return (
    <Diagram
      label={tt("Three questions good feedback answers, with two messages side by side", "Drei Fragen, die gutes Feedback beantwortet, mit zwei Meldungen nebeneinander")}
      caption={tt("Hattie and Timperley (2007): helpful feedback tells the learner where they are going, how they are going and where to next. “Well done” alone answers none of them.", "Hattie und Timperley (2007): Hilfreiches Feedback sagt der Lernenden, wohin sie geht, wie sie vorankommt und was als Nächstes kommt. „Gut gemacht“ allein beantwortet keine davon.")}
    >
      <div className="mx-auto grid max-w-[640px] gap-3 sm:grid-cols-2">
        {msgs.map((m, mi) => (
          <div key={mi} className="space-y-2">
            <p className="text-caption font-bold text-ink">{m.name}</p>
            <div className="rounded-lg border-2 bg-[#F0F0F0] p-3 text-[13px] leading-snug text-[#333]" style={{ borderColor: "#3A3A3A", fontFamily: "system-ui,sans-serif" }}>
              {m.text.map((s) => (
                <p key={s} className={mi === 0 ? "text-[15px] font-bold" : undefined}>{s}</p>
              ))}
            </div>
            <ul className="space-y-1 text-caption text-ink">
              {q.map((x, i) => (
                <li key={x}>
                  <span aria-hidden className="mr-1.5 font-bold">{m.marks[i] ? "●" : "○"}</span>
                  {x} <span className="text-ash">{m.marks[i] ? tt("answered", "beantwortet") : tt("not answered", "nicht beantwortet")}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Diagram>
  );
}

export function RewardsPicture() {
  return (
    <Diagram
      label={tt("The same kind of element can help or backfire: a result that supports learning, and one that only pays", "Dasselbe Element kann helfen oder nach hinten losgehen: ein Ergebnis, das das Lernen stützt, und eines, das nur zahlt")}
      caption={tt("Rate a reward by what it says. The left screen tells the learner something true about their skill. The right one pays for presence and ranks people against each other, so it can become the reason for opening a lesson.", "Bewerten Sie eine Belohnung danach, was sie sagt. Der linke Bildschirm sagt der Lernenden etwas Wahres über ihr Können. Der rechte bezahlt Anwesenheit und reiht Menschen gegeneinander, kann also zum Grund werden, eine Lektion zu öffnen.")}
    >
      <div className="mx-auto grid max-w-[640px] grid-cols-2 gap-3">
        <div>
          <ResultScreen kind="skill" />
          <p className="mt-1 text-caption font-bold text-ink">{tt("Supports learning", "Stützt das Lernen")}</p>
          <p className="text-micro normal-case tracking-normal text-ash">{tt("information about my skill", "Information über mein Können")}</p>
        </div>
        <div>
          <ResultScreen kind="points" />
          <p className="mt-1 text-caption font-bold text-ink">{tt("Can replace the reason", "Kann den Grund ersetzen")}</p>
          <p className="text-micro normal-case tracking-normal text-ash">{tt("pays points and ranks people", "zahlt Punkte und reiht Menschen")}</p>
        </div>
      </div>
    </Diagram>
  );
}

export function LoyaltyPicture() {
  return (
    <Diagram
      label={tt("Progress that already exists: two loyalty cards that both need eight more stamps", "Fortschritt, der schon da ist: zwei Treuekarten, die beide noch acht Stempel brauchen")}
      caption={tt("Nunes and Drèze (2006): customers whose card was already partly stamped were more likely to finish it. A progress bar uses the same effect, but it has to be honest: a bar that moves without real progress teaches the learner to distrust it.", "Nunes und Drèze (2006): Kundinnen, deren Karte schon teilweise gestempelt war, schlossen sie eher ab. Ein Fortschrittsbalken nutzt denselben Effekt, muss aber ehrlich sein: Ein Balken, der sich ohne echten Fortschritt bewegt, bringt der Lernenden bei, ihm zu misstrauen.")}
    >
      <div className="mx-auto grid max-w-[640px] gap-3 sm:grid-cols-2">
        <div>
          <LoyaltyCard total={8} endowed={0} />
          <p className="mt-1 text-caption font-bold text-ink">{tt("A card with 8 places, none stamped", "Eine Karte mit 8 Plätzen, keiner gestempelt")}</p>
        </div>
        <div>
          <LoyaltyCard total={10} endowed={2} />
          <p className="mt-1 text-caption font-bold text-ink">{tt("A card with 10 places, 2 already stamped", "Eine Karte mit 10 Plätzen, 2 schon gestempelt")}</p>
        </div>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A4 · five metrics, each with its question and its trap (static) */

export function MetricsPicture() {
  const items: ["completion" | "return" | "time" | "interview" | "control", string, string, string][] = [
    ["completion", tt("Completion rate", "Completion Rate"), tt("How many finish the course?", "Wie viele schließen den Kurs ab?"), tt("It says nothing about why, or about what they learned.", "Sie sagt nichts darüber, warum, oder was sie gelernt haben.")],
    ["return", tt("Return rate", "Rückkehrrate"), tt("Do learners come back within seven days?", "Kommen Lernende innerhalb von sieben Tagen zurück?"), tt("It needs a baseline, or a rise means nothing.", "Sie braucht eine Ausgangslage, sonst bedeutet ein Anstieg nichts.")],
    ["time", tt("Time spent", "Verbrachte Zeit"), tt("How long are learners on the platform?", "Wie lange sind Lernende auf der Plattform?"), tt("A long time can mean interest or confusion.", "Eine lange Zeit kann Interesse oder Verwirrung bedeuten.")],
    ["interview", tt("Learner interviews", "Lernenden-Interviews"), tt("Why do learners do what they do?", "Warum tun Lernende, was sie tun?"), tt("A few voices; they explain, they do not count.", "Wenige Stimmen; sie erklären, sie zählen nicht.")],
    ["control", tt("Test against a control group", "Test gegen eine Kontrollgruppe"), tt("Did our change cause the rise?", "Hat unsere Änderung den Anstieg verursacht?"), tt("It needs enough learners to tell a difference.", "Sie braucht genug Lernende, um einen Unterschied zu erkennen.")],
  ];
  return (
    <Diagram
      label={tt("Five metrics and methods, each drawn small, with the question it answers and the trap in it", "Fünf Kennzahlen und Methoden, jeweils klein gezeichnet, mit der Frage, die sie beantwortet, und der Falle darin")}
      caption={tt("Pair a metric about behaviour with a method about reasons. Write the expected effect and the figure down before you change anything.", "Koppeln Sie eine Kennzahl zum Verhalten mit einer Methode zu den Gründen. Schreiben Sie die erwartete Wirkung und die Zahl auf, bevor Sie etwas ändern.")}
    >
      <div className="space-y-4">
        <div className="mx-auto grid max-w-[700px] grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map(([k, name, q, trap]) => (
            <div key={k} className="space-y-1">
              <MetricMini kind={k} />
              <p className="text-caption font-bold text-ink">{name}</p>
              <p className="text-micro normal-case tracking-normal text-ink">{q}</p>
              <p className="text-micro normal-case tracking-normal text-ash">{tt("Trap: ", "Falle: ")}{trap}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-[420px]">
          <IterateLoop />
        </div>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A5 · LearnLoop weighs three engagement measures (interactive) */

export function WeighExample() {
  const [sel, setSel] = useState<string | null>(null);
  const rows: GridRow[] = [
    { id: "w1", name: tt("Weekly leaderboard", "Wöchentliche Rangliste"), cells: {
      impact: { level: 1, reason: tt("It rewards the already active; it does not help the learner who is lost.", "Sie belohnt die schon Aktiven; sie hilft der Lernenden nicht, die verloren ist.") },
      effort: { level: 2, reason: tt("A ranking has to be designed, built and kept fair: Mid.", "Eine Rangliste muss gestaltet, gebaut und fair gehalten werden: Mittel.") },
      risk: { level: 3, reason: tt("Pressure and comparison can push the weakest learners out.", "Druck und Vergleich können die schwächsten Lernenden hinausdrängen.") },
    } },
    { id: "w2", name: tt("Progress and next-step display", "Fortschritts- und Nächster-Schritt-Anzeige"), cells: {
      impact: { level: 3, reason: tt("It supports competence and clarity for every learner.", "Sie stützt Kompetenz und Klarheit für jede Lernende.") },
      effort: { level: 1, reason: tt("It reuses what the platform already knows about the learner: Low.", "Sie nutzt, was die Plattform über die Lernende schon weiß: Niedrig.") },
      risk: { level: 1, reason: tt("It adds information and can be adjusted.", "Sie fügt Information hinzu und lässt sich anpassen.") },
    } },
    { id: "w3", name: tt("Short practice tasks", "Kurze Übungsaufgaben"), cells: {
      impact: { level: 3, reason: tt("Activation, feedback and a sense of getting better.", "Aktivierung, Feedback und das Gefühl, besser zu werden.") },
      effort: { level: 3, reason: tt("Every task has to be written and checked, and it takes most of the two months: High.", "Jede Aufgabe muss geschrieben und geprüft werden, und es braucht den Großteil der zwei Monate: Hoch.") },
      risk: { level: 2, reason: tt("Most of the two months; weak tasks feel like homework.", "Der Großteil der zwei Monate; schwache Aufgaben fühlen sich wie Hausaufgaben an.") },
    } },
  ];
  const cols = [
    { id: "impact", label: tt("Motivation impact", "Motivationswirkung") },
    { id: "effort", label: tt("Effort", "Aufwand") },
    { id: "risk", label: tt("Risk", "Risiko") },
  ];
  return (
    <Diagram label={tt("A worked example: LearnLoop weighs three engagement measures · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei Engagement-Maßnahmen ab · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("Rate each measure on how much it supports lasting motivation, how much effort it takes and how it can backfire. Pressure and rewards carry the highest risk, and the measure whose value stays when a reward stops is the one with a lasting effect.", "Bewerten Sie jede Maßnahme danach, wie sehr sie dauerhafte Motivation stützt, wie viel Aufwand sie macht und wie sie nach hinten losgehen kann. Druck und Belohnungen tragen das höchste Risiko, und die Maßnahme, deren Wert bleibt, wenn eine Belohnung endet, ist die mit nachhaltiger Wirkung.")}</ThePoint>
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {([["leaderboard", tt("A · Weekly leaderboard", "A · Wöchentliche Rangliste")], ["progress", tt("B · Progress and next step", "B · Fortschritt und nächster Schritt")], ["tasks", tt("C · Short practice tasks", "C · Kurze Übungsaufgaben")]] as const).map(([k, name]) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{name}</p>
            </div>
          ))}
        </div>
        <OptionGrid label={tt("LearnLoop · two months", "LearnLoop · zwei Monate")} caption={tt("Three measures for LearnLoop (Case assumption, example company)", "Drei Maßnahmen für LearnLoop (Fallannahme, Beispielunternehmen)")} rows={rows} cols={cols} selected={sel} onSelect={(k) => { setSel(k); }} />
        <p className="rounded-md border border-line bg-canvas px-3 py-2 text-caption text-ink">
          <span className="smallcaps mr-1.5">{tt("Still unknown", "Noch unbekannt")}</span>
          <Gloss>{tt("Whether learners leave for lack of progress or for lack of time. LearnLoop would interview six learners who dropped out before it commits the two months.", "Ob Lernende wegen fehlenden Fortschritts oder fehlender Zeit gehen. LearnLoop würde sechs Lernende interviewen, die abgebrochen haben, bevor es die zwei Monate bindet.")}</Gloss>
        </p>
      </div>
    </Diagram>
  );
}
