"use client";

import { useState } from "react";
import clsx from "clsx";
import { OptionGrid } from "@/components/day1/diagrams";
import type { GridRow } from "@/components/day1/diagrams";
import { IterateLoop, LessonBuilderMock, LoyaltyCard, MeasureThumb, MetricMini, QuizMock, ResultScreen } from "@/components/day4/mocks";
import type { PointsPhase, Principles5 } from "@/components/day4/mocks";
import { Svg, Txt } from "@/components/day/mockKit";
import { CostBands } from "@/components/materi/figures";
import { Diagram, Insight, Story, ThePoint, useStory } from "@/components/materi/kit";
import type { StoryPlan } from "@/components/materi/kit";
import { Gloss } from "@/lib/glossify";
import { tt } from "@/lib/lang";

/**
 * Day 4 · the teaching diagrams of Materi A. Interactive ones (Tom's quizzes with and without points, the lesson screen that gains a principle at a time,
 * the LearnLoop weighing grid) carry "The point", "Walk me through it" and an always-visible "What this shows" (CLAUDE.md #20, #36, #51). The static ones are
 * drawn pictures (#52). Example companies: LearnLoop (an online-course provider) and the made-up Tom and Anna; never MotivaLearn, so no task is answered here.
 */

/* ------------------------------------------------------------------ A1 · Tom's quizzes, with and without points (interactive) */

const QUIZ_WEEKS: Record<PointsPhase, number[]> = { before: [4, 4, 4, 4], points: [6, 7, 7, 7], ended: [3, 2, 2, 2] };
const PHASE_ORDER: PointsPhase[] = ["before", "points", "ended"];

export function TomQuizzes() {
  const [phase, setPhase] = useState<PointsPhase>("before");
  const weeks = PHASE_ORDER.slice(0, PHASE_ORDER.indexOf(phase) + 1).flatMap((p) => QUIZ_WEEKS[p].map((v) => ({ v, p })));
  const avg = (p: PointsPhase) => Math.round((QUIZ_WEEKS[p].reduce((a, b) => a + b, 0) / QUIZ_WEEKS[p].length) * 10) / 10;
  const story = useStory([
    { title: tt("Tom enjoys the quizzes", "Tom macht die Quizze gern"), say: tt(`Let us follow Tom, who works in procurement and uses his company's learning platform. He likes the quizzes, because he enjoys seeing that he knows the answer, so he does about ${avg("before")} a week without anyone asking him to. In other words, his reason is inside the activity.`, `Begleiten wir Tom, der im Einkauf arbeitet und die Lernplattform seines Unternehmens nutzt. Er macht die Quizze gern, weil er es mag zu sehen, dass er die Antwort weiß, und macht deshalb etwa ${avg("before")} pro Woche, ohne dass ihn jemand dazu auffordert. Sein Grund liegt also in der Tätigkeit selbst.`), look: tt("the first four bars, and the quiz screen without points", "die ersten vier Balken und der Quizbildschirm ohne Punkte"), apply: () => setPhase("before") },
    { title: tt("The platform adds points", "Die Plattform fügt Punkte hinzu"), say: tt(`Now the platform adds points for every quiz. For a few weeks Tom does more, about ${avg("points")} a week, because a reward from outside has been added to his own reason. This is what the designers hoped for, and it looks like a success.`, `Nun fügt die Plattform Punkte für jedes Quiz hinzu. Einige Wochen lang macht Tom mehr, etwa ${avg("points")} pro Woche, weil zu seinem eigenen Grund eine Belohnung von außen hinzugekommen ist. Das haben sich die Gestalter erhofft, und es sieht nach einem Erfolg aus.`), look: tt("the next four bars and the points banner on the screen", "die nächsten vier Balken und das Punktebanner auf dem Bildschirm"), apply: () => setPhase("points") },
    { title: tt("The points programme ends", "Das Punkteprogramm endet"), say: tt(`Then the programme ends. Tom now does only about ${avg("ended")} quizzes a week, fewer than the ${avg("before")} he did before any points. In his head the quiz had become a way to collect points, so when the points stop, the reason stops too. Researchers call this the overjustification effect.`, `Dann endet das Programm. Tom macht nun nur noch etwa ${avg("ended")} Quizze pro Woche, weniger als die ${avg("before")} vor allen Punkten. In seinem Kopf war das Quiz zu einem Weg geworden, Punkte zu sammeln, und als die Punkte aufhören, hört auch der Grund auf. Forschende nennen das den Overjustification-Effekt.`), look: tt("the last four bars, lower than the first four", "die letzten vier Balken, niedriger als die ersten vier"), apply: () => setPhase("ended") },
    { title: tt("What to take from it", "Was Sie mitnehmen"), say: tt("So an extrinsic reward can start behaviour, but it may not keep it, and a reward for something a person already enjoys can lower their interest. Before you add points, ask whether the learner already has a reason of their own, and whether the reward would replace it. Press the three buttons yourself to compare.", "Eine extrinsische Belohnung kann also ein Verhalten anstoßen, es aber vielleicht nicht halten, und eine Belohnung für etwas, das eine Person schon gern tut, kann ihr Interesse senken. Fragen Sie vor Punkten, ob die Lernende schon einen eigenen Grund hat und ob die Belohnung ihn ersetzen würde. Drücken Sie die drei Schaltflächen selbst, um zu vergleichen."), apply: () => setPhase("ended") },
  ] satisfies StoryPlan[]);
  const btns: [PointsPhase, string][] = [
    ["before", tt("Before points", "Vor den Punkten")],
    ["points", tt("With points", "Mit Punkten")],
    ["ended", tt("Points ended", "Punkte beendet")],
  ];
  return (
    <Diagram label={tt("Tom's quizzes, with and without points · Exploratory · Case assumption", "Toms Quizze, mit und ohne Punkte · Explorativ · Fallannahme")}>
      <div className="space-y-3">
        <ThePoint>{tt("A reward from outside can start a behaviour, but it can replace the learner's own reason, and then the behaviour fades when the reward stops.", "Eine Belohnung von außen kann ein Verhalten anstoßen, aber sie kann den eigenen Grund der Lernenden ersetzen, und dann verfliegt das Verhalten, wenn die Belohnung aufhört.")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <div role="radiogroup" aria-label={tt("The platform", "Die Plattform")} className="flex flex-wrap gap-2">
          {btns.map(([id, label]) => (
            <button key={id} type="button" aria-pressed={phase === id} onClick={() => { story.leave(); setPhase(id); }} className={clsx("btn btn-sm min-h-[40px] border", phase === id ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
              {label}
            </button>
          ))}
        </div>
        <div className={clsx("grid items-end gap-3 sm:grid-cols-2", story.step !== null && "anim-pulse rounded-lg")}>
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
  const story = useStory([
    { title: tt("Anna meets a long page", "Anna trifft auf eine lange Seite"), say: tt("Let us follow Anna, a sales manager who takes a negotiation course on LearnLoop, an online-course provider. The first version of the course opens with a long page of reading. She does not know what she will be able to do at the end, nothing asks her to try anything, nothing tells her how she is doing, and the page does not show how far she has come. After two pages she closes it.", "Begleiten wir Anna, eine Vertriebsleiterin, die bei LearnLoop, einem Anbieter von Online-Kursen, einen Verhandlungskurs belegt. Die erste Version des Kurses beginnt mit einer langen Lesetextseite. Sie weiß nicht, was sie am Ende können wird, nichts fordert sie auf, etwas auszuprobieren, nichts sagt ihr, wie sie dasteht, und die Seite zeigt nicht, wie weit sie gekommen ist. Nach zwei Seiten schließt sie sie."), look: tt("the screen: only lines of text", "der Bildschirm: nur Textzeilen"), apply: () => setOn(NONE5) },
    { title: tt("The unit says what it is for", "Die Einheit sagt, wofür sie da ist"), say: tt("In the second version the unit starts with “After this unit you can write a counter-offer”, which is the principle of clarity, and a short work example follows, which gives it relevance. Anna now knows what the page is for and why it matters in her job, so she reads on with a purpose.", "In der zweiten Version beginnt die Einheit mit „Nach dieser Einheit können Sie ein Gegenangebot schreiben“, das ist das Prinzip der Klarheit, und danach folgt ein kurzes Praxisbeispiel, das ihr Relevanz gibt. Anna weiß nun, wofür die Seite da ist und warum sie in ihrem Beruf zählt, und liest mit einem Ziel weiter."), look: tt("the goal sentence and the example box", "der Zielsatz und das Beispielfeld"), apply: () => setOn({ ...NONE5, goal: true, example: true }) },
    { title: tt("She does something and gets an answer", "Sie tut etwas und bekommt eine Antwort"), say: tt("Then comes a three-minute task: Anna types her counter-offer, which is activation. A message follows: “Your offer names a price but no condition. Next: task 4”. That is feedback with a next step, so she knows how she did and what to do next, and she does not have to guess.", "Dann kommt eine Dreiminutenaufgabe: Anna tippt ihr Gegenangebot, das ist Aktivierung. Eine Meldung folgt: „Ihr Angebot nennt einen Preis, aber keine Bedingung. Weiter: Aufgabe 4“. Das ist Feedback mit einem nächsten Schritt, sie weiß also, wie sie es gemacht hat und was als Nächstes kommt, und muss nicht raten."), look: tt("the task box and the message under it", "das Aufgabenfeld und die Meldung darunter"), apply: () => setOn({ goal: true, example: true, task: true, feedback: true, progress: false }) },
    { title: tt("The page shows her progress", "Die Seite zeigt ihren Fortschritt"), say: tt("At the top a bar shows 40 percent, which is progression: Anna can see her learning move forward. Nothing about the content changed. What changed is that each of the five principles is visible on the screen, so Anna can feel that she is getting somewhere. Switch the five principles on and off yourself to see which element delivers which.", "Oben zeigt ein Balken 40 Prozent, das ist Progression: Anna sieht, wie ihr Lernen vorankommt. Am Inhalt hat sich nichts geändert. Geändert hat sich, dass jedes der fünf Prinzipien auf dem Bildschirm sichtbar ist, sodass Anna spüren kann, dass sie vorankommt. Schalten Sie die fünf Prinzipien selbst ein und aus, um zu sehen, welches Element welches liefert."), look: tt("the bar at the top, and the whole screen", "der Balken oben und der ganze Bildschirm"), apply: () => setOn(ALL5) },
  ] satisfies StoryPlan[]);
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
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:items-start">
          <div role="group" aria-label={tt("The five principles", "Die fünf Prinzipien")} className="grid gap-2">
            {sw.map(([k, label, sub]) => (
              <button key={k} type="button" aria-pressed={on[k]} onClick={() => { story.leave(); toggle(k); }} className={clsx("min-h-[44px] rounded-lg border px-3 py-2 text-left text-caption transition-colors", on[k] ? "border-accent bg-accentSoft ring-2 ring-gold" : "border-line bg-paper hover:border-ash")}>
                <span className="font-semibold text-ink"><span aria-hidden className="mr-1.5">{on[k] ? "☑" : "☐"}</span>{label}</span>
                <span className="block pl-5 text-ash">{sub}</span>
              </button>
            ))}
          </div>
          <div className={clsx("mx-auto w-full max-w-[420px]", story.step !== null && "anim-pulse rounded-lg")}>
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
  const story = useStory([
    { title: tt("The setting", "Die Ausgangslage"), say: tt("Let us look at LearnLoop again. Learners drop out early, the budget is €40,000 and the time limit is two months, so the team has to choose carefully. Three ideas are on the table, and we rate each on motivation impact (how much it supports lasting motivation), effort (money and time) and risk (how it can backfire). The rule for effort is: under €10,000 is Low, up to €20,000 is Mid, above that is High.", "Sehen wir uns LearnLoop noch einmal an. Lernende brechen früh ab, das Budget beträgt 40.000 € und das Zeitlimit zwei Monate, das Team muss also sorgfältig wählen. Drei Ideen liegen auf dem Tisch, und wir bewerten jede nach Motivationswirkung (wie sehr sie dauerhafte Motivation stützt), Aufwand (Geld und Zeit) und Risiko (wie sie nach hinten losgehen kann). Die Regel für den Aufwand lautet: unter 10.000 € ist Niedrig, bis 20.000 € Mittel, darüber Hoch."), look: tt("the three pictures and the three bars", "die drei Bilder und die drei Balken"), apply: () => setSel(null) },
    { title: tt("A weekly leaderboard", "Eine wöchentliche Rangliste"), say: tt("The first idea, a weekly leaderboard, costs €14,000, so its effort is Mid. It sounds motivating, but a ranking rewards the learners who are already active and can discourage those at the bottom. So the motivation impact is Low for the learners LearnLoop wants to keep, and the risk is High, because of pressure and social comparison.", "Die erste Idee, eine wöchentliche Rangliste, kostet 14.000 €, ihr Aufwand ist also Mittel. Sie klingt motivierend, aber eine Rangliste belohnt die Lernenden, die schon aktiv sind, und kann die am unteren Ende entmutigen. Die Motivationswirkung ist deshalb für die Lernenden, die LearnLoop halten will, Niedrig, und das Risiko ist Hoch, wegen Druck und sozialem Vergleich."), look: tt("the top row, impact and risk", "die obere Zeile, Wirkung und Risiko"), apply: () => setSel("w1.risk") },
    { title: tt("A progress display, then practice tasks", "Eine Fortschrittsanzeige, dann Übungsaufgaben"), say: tt("The second idea, a progress and next-step display, costs €8,000, so its effort is Low. It shows the learner how far they have come and what to do next, so its impact is High, and its risk is Low because it adds information and takes nothing away. The third idea, short practice tasks, costs €26,000, so its effort is High, and it takes seven of the eight weeks. It makes learners active, so its impact is High and lasting, and its risk is Mid, because the schedule is tight and weak tasks would feel like homework.", "Die zweite Idee, eine Fortschritts- und Nächster-Schritt-Anzeige, kostet 8.000 €, ihr Aufwand ist also Niedrig. Sie zeigt der Lernenden, wie weit sie gekommen ist und was sie als Nächstes tun soll, die Wirkung ist also Hoch, und das Risiko ist Niedrig, weil sie Information hinzufügt und nichts wegnimmt. Die dritte Idee, kurze Übungsaufgaben, kostet 26.000 €, ihr Aufwand ist also Hoch, und sie braucht sieben der acht Wochen. Sie macht Lernende aktiv, die Wirkung ist also Hoch und dauerhaft, und das Risiko ist Mittel, weil der Zeitplan eng ist und schwache Aufgaben sich wie Hausaufgaben anfühlen würden."), look: tt("the middle and the bottom row", "die mittlere und die untere Zeile"), apply: () => setSel("w2.impact") },
    { title: tt("Which has a lasting effect", "Welche wirkt nachhaltig"), say: tt("So the progress display has the lasting effect, even though the leaderboard sounds more exciting, because it stays useful after any reward would stop. Ask the same question of any measure: what remains when the reward is gone? LearnLoop also names what it does not know: whether learners leave for lack of progress or lack of time. Select any cell in the table to read its reason.", "Die Fortschrittsanzeige wirkt also nachhaltig, obwohl die Rangliste aufregender klingt, weil sie auch dann nützlich bleibt, wenn jede Belohnung wegfiele. Stellen Sie dieselbe Frage jeder Maßnahme: Was bleibt, wenn die Belohnung weg ist? LearnLoop nennt auch, was es nicht weiß: ob Lernende wegen fehlenden Fortschritts oder fehlender Zeit gehen. Wählen Sie eine Zelle in der Tabelle, um ihren Grund zu lesen."), apply: () => setSel("w2.effort") },
  ] satisfies StoryPlan[]);
  const rows: GridRow[] = [
    { id: "w1", name: tt("Weekly leaderboard", "Wöchentliche Rangliste"), sub: tt("€14,000", "14.000 €"), cells: {
      impact: { level: 1, reason: tt("It rewards the already active; it does not help the learner who is lost.", "Sie belohnt die schon Aktiven; sie hilft der Lernenden nicht, die verloren ist.") },
      effort: { level: 2, note: tt("€14,000", "14.000 €"), reason: tt("€14,000 lies between €10,000 and €20,000: Mid.", "14.000 € liegen zwischen 10.000 € und 20.000 €: Mittel.") },
      risk: { level: 3, reason: tt("Pressure and comparison can push the weakest learners out.", "Druck und Vergleich können die schwächsten Lernenden hinausdrängen.") },
    } },
    { id: "w2", name: tt("Progress and next-step display", "Fortschritts- und Nächster-Schritt-Anzeige"), sub: tt("€8,000", "8.000 €"), cells: {
      impact: { level: 3, reason: tt("It supports competence and clarity for every learner.", "Sie stützt Kompetenz und Klarheit für jede Lernende.") },
      effort: { level: 1, note: tt("€8,000", "8.000 €"), reason: tt("€8,000 is under €10,000: Low.", "8.000 € liegen unter 10.000 €: Niedrig.") },
      risk: { level: 1, reason: tt("It adds information and can be adjusted.", "Sie fügt Information hinzu und lässt sich anpassen.") },
    } },
    { id: "w3", name: tt("Short practice tasks", "Kurze Übungsaufgaben"), sub: tt("€26,000", "26.000 €"), cells: {
      impact: { level: 3, reason: tt("Activation, feedback and a sense of getting better.", "Aktivierung, Feedback und das Gefühl, besser zu werden.") },
      effort: { level: 3, note: tt("€26,000", "26.000 €"), reason: tt("€26,000 is above €20,000: High.", "26.000 € liegen über 20.000 €: Hoch.") },
      risk: { level: 2, reason: tt("Seven of eight weeks; weak tasks feel like homework.", "Sieben von acht Wochen; schwache Aufgaben fühlen sich wie Hausaufgaben an.") },
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
        <ThePoint>{tt("Rate each measure on how much it supports lasting motivation, what it costs and how it can backfire. Pressure and rewards carry the highest risk, and the measure whose value stays when a reward stops is the one with a lasting effect.", "Bewerten Sie jede Maßnahme danach, wie sehr sie dauerhafte Motivation stützt, was sie kostet und wie sie nach hinten losgehen kann. Druck und Belohnungen tragen das höchste Risiko, und die Maßnahme, deren Wert bleibt, wenn eine Belohnung endet, ist die mit nachhaltiger Wirkung.")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {([["leaderboard", tt("A · Weekly leaderboard", "A · Wöchentliche Rangliste")], ["progress", tt("B · Progress and next step", "B · Fortschritt und nächster Schritt")], ["tasks", tt("C · Short practice tasks", "C · Kurze Übungsaufgaben")]] as const).map(([k, name]) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{name}</p>
            </div>
          ))}
        </div>
        <CostBands
          title={tt("LearnLoop, three measures: cost against the effort rule and the €40,000 budget", "LearnLoop, drei Maßnahmen: Kosten gegen die Aufwandsregel und das Budget von 40.000 €")}
          bars={[
            { name: tt("A · Leaderboard", "A · Rangliste"), cost: 14000 },
            { name: tt("B · Progress display", "B · Fortschrittsanzeige"), cost: 8000 },
            { name: tt("C · Practice tasks", "C · Übungsaufgaben"), cost: 26000 },
          ]}
          budget={40000}
          bands={[
            { to: 10000, label: tt("Low", "Niedrig") },
            { to: 20000, label: tt("Mid", "Mittel") },
            { to: null, label: tt("High", "Hoch") },
          ]}
        />
        <OptionGrid label={tt("LearnLoop · budget €40,000, two months", "LearnLoop · Budget 40.000 €, zwei Monate")} caption={tt("Three measures for LearnLoop (Case assumption, example company)", "Drei Maßnahmen für LearnLoop (Fallannahme, Beispielunternehmen)")} rows={rows} cols={cols} selected={sel} onSelect={(k) => { story.leave(); setSel(k); }} />
        <p className="rounded-md border border-line bg-canvas px-3 py-2 text-caption text-ink">
          <span className="smallcaps mr-1.5">{tt("Still unknown", "Noch unbekannt")}</span>
          <Gloss>{tt("Whether learners leave for lack of progress or for lack of time. LearnLoop would interview six learners who dropped out before it commits the whole budget.", "Ob Lernende wegen fehlenden Fortschritts oder fehlender Zeit gehen. LearnLoop würde sechs Lernende interviewen, die abgebrochen haben, bevor es das ganze Budget bindet.")}</Gloss>
        </p>
      </div>
    </Diagram>
  );
}
