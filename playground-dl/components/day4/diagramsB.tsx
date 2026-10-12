"use client";

import { useState } from "react";
import clsx from "clsx";
import { Svg, Txt } from "@/components/day/mockKit";
import { DecisionFrameFig, MatrixFig } from "@/components/materi/figures";
import type { MatrixPoint } from "@/components/materi/figures";
import { Diagram, Insight, Story, ThePoint, useStory } from "@/components/materi/kit";
import type { StoryPlan } from "@/components/materi/kit";
import { tt } from "@/lib/lang";

/**
 * Day 4 · the teaching diagrams of Materi B. Fogg's model as a chart you can move a learner across, the control group as a second line, the motivation-against-pressure
 * matrix, and the four boxes of a decision under uncertainty (CLAUDE.md #20, #36, #51, #52). Example company: LearnLoop; never MotivaLearn, so no task is answered here.
 */

/* ------------------------------------------------------------------ B1 · Fogg's behaviour model (interactive) */

const K = 0.25;
/** The action line: the motivation needed at a given ability, both 0 to 1. Easy things need little motivation; hard things need a lot. */
const needed = (a: number) => Math.min(1, K / (a + K));

export function FoggChart() {
  const [m, setM] = useState(70);
  const [a, setA] = useState(10);
  const [prompt, setPrompt] = useState(true);
  const above = m / 100 >= needed(a / 100);
  const acts = above && prompt;
  const X0 = 46;
  const X1 = 326;
  const Y0 = 18;
  const Y1 = 218;
  const px = (v: number) => X0 + v * (X1 - X0);
  const py = (v: number) => Y1 - v * (Y1 - Y0);
  const curve = Array.from({ length: 51 }, (_, i) => i / 50).map((v) => `${px(v).toFixed(1)},${py(needed(v)).toFixed(1)}`);
  const story = useStory([
    { title: tt("Maya wants to finish", "Maya will abschließen"), say: tt("Let us follow Maya, who is motivated to finish her course on LearnLoop, an online-course provider. She even gets a reminder every evening. But the next lesson is buried three menus deep, so for her the step is very hard to do. Her motivation is high, and still she does not act, because the point sits below the line.", "Begleiten wir Maya, die motiviert ist, ihren Kurs bei LearnLoop, einem Anbieter von Online-Kursen, abzuschließen. Sie bekommt sogar jeden Abend eine Erinnerung. Aber die nächste Lektion liegt drei Menüs tief, der Schritt ist für sie also sehr schwer. Ihre Motivation ist hoch, und trotzdem handelt sie nicht, weil der Punkt unter der Linie liegt."), look: tt("the dot below the curve, and the prompt switched on", "der Punkt unter der Kurve und der eingeschaltete Impuls"), apply: () => { setM(70); setA(10); setPrompt(true); } },
    { title: tt("The next step becomes easy", "Der nächste Schritt wird leicht"), say: tt("Now LearnLoop puts a “Next lesson” button on every page, so the step is easy to find. The dot moves to the right, above the line: Maya has enough motivation for such an easy step. But the evening reminder is switched off in this version, and nothing happens, because behaviour needs a prompt as well.", "Nun setzt LearnLoop auf jede Seite einen Button „Nächste Lektion“, der Schritt ist also leicht zu finden. Der Punkt wandert nach rechts, über die Linie: Maya hat für einen so leichten Schritt genug Motivation. Aber die Abenderinnerung ist in dieser Version ausgeschaltet, und nichts geschieht, denn Verhalten braucht auch einen Impuls."), look: tt("the dot above the curve, and the prompt switched off", "der Punkt über der Kurve und der ausgeschaltete Impuls"), apply: () => { setM(70); setA(45); setPrompt(false); } },
    { title: tt("All three come together", "Alle drei kommen zusammen"), say: tt("With the button and the reminder, motivation, ability and a prompt are all present, and Maya opens the next lesson. Notice that no reward was added at any point. The platform removed a barrier and added a prompt, and that was enough.", "Mit Button und Erinnerung sind Motivation, Können und ein Impuls alle da, und Maya öffnet die nächste Lektion. Beachten Sie, dass an keiner Stelle eine Belohnung hinzukam. Die Plattform beseitigte eine Hürde und ergänzte einen Impuls, und das reichte."), look: tt("the dot ringed: the behaviour happens", "der Punkt mit Ring: Das Verhalten geschieht"), apply: () => { setM(70); setA(45); setPrompt(true); } },
    { title: tt("What to take from it", "Was Sie mitnehmen"), say: tt("So more motivation is not always the answer. When the step is very easy, even modest motivation is enough, and when it is hard, even high motivation fails. Before a team adds rewards, it should check whether the next step is easy to find and whether anything invites it. Move the two sliders and the prompt yourself to test this.", "Mehr Motivation ist also nicht immer die Antwort. Ist der Schritt sehr leicht, reicht schon mäßige Motivation, und ist er schwer, scheitert sogar hohe Motivation. Bevor ein Team Belohnungen ergänzt, sollte es prüfen, ob der nächste Schritt leicht zu finden ist und ob etwas dazu einlädt. Bewegen Sie die beiden Regler und den Impuls selbst, um das zu testen."), apply: () => { setM(30); setA(80); setPrompt(true); } },
  ] satisfies StoryPlan[]);
  return (
    <Diagram label={tt("Fogg's Behavior Model: motivation, ability and a prompt · Exploratory · Case assumption", "Foggs Verhaltensmodell: Motivation, Können und ein Impuls · Explorativ · Fallannahme")}>
      <div className="space-y-3">
        <ThePoint>{tt("A behaviour happens when motivation, ability and a prompt come together. If the next step is hard, or nothing invites it, more motivation does not help.", "Ein Verhalten geschieht, wenn Motivation, Können und ein Impuls zusammenkommen. Ist der nächste Schritt schwer oder lädt nichts dazu ein, hilft mehr Motivation nicht.")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <div className={clsx("mx-auto w-full max-w-[460px]", story.step !== null && "anim-pulse rounded-lg")}>
          <Svg
            viewBox="0 0 340 270"
            label={tt("A chart: motivation upwards, ability to the right, a curve called the action line, and a dot for one learner", "Ein Diagramm: Motivation nach oben, Können nach rechts, eine Kurve namens Aktionslinie und ein Punkt für eine Lernende")}
            desc={tt(`The learner has motivation ${m} and ability ${a}. The prompt is ${prompt ? "on" : "off"}. The dot is ${above ? "above" : "below"} the line, so the behaviour ${acts ? "happens" : "does not happen"}.`, `Die Lernende hat Motivation ${m} und Können ${a}. Der Impuls ist ${prompt ? "an" : "aus"}. Der Punkt liegt ${above ? "über" : "unter"} der Linie, das Verhalten ${acts ? "geschieht" : "geschieht nicht"}.`)}
          >
            <rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} fill="#FFFFFF" stroke="#556274" strokeWidth="1.5" />
            <polygon points={`${curve.join(" ")} ${px(1)},${py(1)} ${px(0)},${py(1)}`} fill="#E6ECF4" />
            <polyline points={curve.join(" ")} fill="none" stroke="#17212E" strokeWidth="2.4" />
            <Txt x={X1 - 6} y={Y0 + 16} size={11} bold anchor="end" fill="#17212E">{tt("above the line: it can happen", "über der Linie: es kann geschehen")}</Txt>
            <Txt x={X0 + 8} y={Y1 - 8} size={11} bold fill="#17212E">{tt("below the line: it will not", "unter der Linie: es geschieht nicht")}</Txt>
            <Txt x={(X0 + X1) / 2} y={Y1 + 22} size={11.5} bold anchor="middle" fill="#17212E">{tt("Ability: hard to do → easy to do", "Können: schwer zu tun → leicht zu tun")}</Txt>
            <text x="14" y={(Y0 + Y1) / 2} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#17212E" fontFamily="system-ui,sans-serif" transform={`rotate(-90 14 ${(Y0 + Y1) / 2})`}>{tt("Motivation: low → high", "Motivation: niedrig → hoch")}</text>
            {acts && <circle cx={px(a / 100)} cy={py(m / 100)} r="18" fill="none" stroke="#4C8BE0" strokeWidth="2.5" strokeDasharray="5 4" className="anim-pulse" />}
            <circle cx={px(a / 100)} cy={py(m / 100)} r="10" fill={above ? "#1750A8" : "#FFFFFF"} stroke="#17212E" strokeWidth="2.2" />
            {prompt && <Txt x={px(a / 100) + 14} y={py(m / 100) - 12} size={10} bold fill="#17212E">{tt("prompt", "Impuls")}</Txt>}
          </Svg>
        </div>
        <div className="mx-auto grid max-w-[460px] gap-2 sm:grid-cols-2">
          <label className="block text-caption text-ink">
            {tt("Motivation", "Motivation")}: <span className="tnum font-bold">{m}</span>
            <input type="range" min={0} max={100} step={5} value={m} onChange={(e) => { story.leave(); setM(Number(e.target.value)); }} className="h-10 w-full" />
          </label>
          <label className="block text-caption text-ink">
            {tt("Ability (how easy the step is)", "Können (wie leicht der Schritt ist)")}: <span className="tnum font-bold">{a}</span>
            <input type="range" min={0} max={100} step={5} value={a} onChange={(e) => { story.leave(); setA(Number(e.target.value)); }} className="h-10 w-full" />
          </label>
          <button type="button" aria-pressed={prompt} onClick={() => { story.leave(); setPrompt((p) => !p); }} className={clsx("btn btn-sm min-h-[40px] border sm:col-span-2", prompt ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
            {prompt ? tt("The prompt is on: a reminder arrives", "Der Impuls ist an: Eine Erinnerung kommt an") : tt("The prompt is off: nothing invites the step", "Der Impuls ist aus: Nichts lädt zum Schritt ein")}
          </button>
        </div>
        <Insight>
          {acts
            ? tt("In plain words: motivation, ability and a prompt are all there, so the learner does the next lesson. Notice what carried it: the step is easy enough for this much motivation, and something invited it.", "In einfachen Worten: Motivation, Können und ein Impuls sind alle da, also macht die Lernende die nächste Lektion. Beachten Sie, was es trug: Der Schritt ist für so viel Motivation leicht genug, und etwas lud dazu ein.")
            : !above
              ? tt("In plain words: the dot is below the line, so this much motivation is not enough for a step this hard. Adding a reward raises motivation, but making the step easier moves the dot to the right, and that is often cheaper.", "In einfachen Worten: Der Punkt liegt unter der Linie, so viel Motivation reicht für einen so schweren Schritt also nicht. Eine Belohnung hebt die Motivation, aber den Schritt zu erleichtern, verschiebt den Punkt nach rechts, und das ist oft günstiger.")
              : tt("In plain words: the learner is motivated enough and the step is easy enough, but nothing invites it, so nothing happens. A timely, honest reminder with the next step in it is the missing third condition.", "In einfachen Worten: Die Lernende ist motiviert genug, und der Schritt ist leicht genug, aber nichts lädt dazu ein, also geschieht nichts. Eine rechtzeitige, ehrliche Erinnerung mit dem nächsten Schritt darin ist die fehlende dritte Bedingung.")}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B2 · motivation against pressure (interactive matrix) */

export function MotivationMatrix() {
  const [sel, setSel] = useState<string | null>(null);
  const [spot, setSpot] = useState<string | null>(null);
  const pts: MatrixPoint[] = [
    { id: "a", letter: "A", x: 0.8, y: 0.1, name: tt("Progress display", "Fortschrittsanzeige"), reading: tt("It adds information and takes nothing away, so it puts no pressure on the learner, and it keeps its value after any reward would stop.", "Sie fügt Information hinzu und nimmt nichts weg, setzt die Lernende also nicht unter Druck, und sie behält ihren Wert, auch wenn jede Belohnung wegfiele.") },
    { id: "b", letter: "B", x: 0.7, y: 0.16, name: tt("A goal sentence per unit", "Ein Zielsatz pro Einheit"), reading: tt("It tells the learner what the unit is for, which supports competence, and it asks nothing of them.", "Er sagt der Lernenden, wofür die Einheit da ist, was die Kompetenz stützt, und verlangt nichts von ihr.") },
    { id: "c", letter: "C", x: 0.84, y: 0.34, name: tt("Short practice tasks", "Kurze Übungsaufgaben"), reading: tt("They build competence that lasts, and they ask for some effort, so they carry a little pressure: weak tasks would feel like homework.", "Sie bauen Kompetenz auf, die bleibt, und verlangen etwas Anstrengung, tragen also ein wenig Druck: Schwache Aufgaben würden sich wie Hausaufgaben anfühlen.") },
    { id: "d", letter: "D", x: 0.28, y: 0.4, name: tt("Points for opening lessons", "Punkte fürs Öffnen von Lektionen"), reading: tt("The cheapest way to earn them is to open lessons without reading: a perverse incentive. They support little lasting motivation and add some pressure to keep collecting.", "Der günstigste Weg, sie zu verdienen, ist, Lektionen ohne Lesen zu öffnen: ein Fehlanreiz. Sie stützen wenig dauerhafte Motivation und fügen etwas Druck hinzu, weiter zu sammeln.") },
    { id: "e", letter: "E", x: 0.3, y: 0.78, name: tt("A weekly leaderboard", "Eine wöchentliche Rangliste"), reading: tt("It rewards the already active and can push the weakest learners out. It puts high pressure on people and supports little lasting motivation for those at the bottom.", "Sie belohnt die schon Aktiven und kann die schwächsten Lernenden hinausdrängen. Sie setzt Menschen unter hohen Druck und stützt für die am unteren Ende wenig dauerhafte Motivation.") },
    { id: "f", letter: "F", x: 0.18, y: 0.92, name: tt("A streak with loss messages", "Eine Serie mit Verlustmeldungen"), reading: tt("“You will lose your streak” raises activity today by pressure. It is a manipulation risk: it costs trust and does not build a reason of the learner's own.", "„Sie verlieren Ihre Serie“ steigert die Aktivität heute durch Druck. Es ist ein Manipulationsrisiko: Es kostet Vertrauen und baut keinen eigenen Grund der Lernenden auf.") },
    { id: "g", letter: "G", x: 0.14, y: 0.2, name: tt("A discount for finishing", "Ein Rabatt fürs Abschließen"), reading: tt("It is light on the learner, but it only reaches people who already finish and builds no motivation that lasts.", "Er belastet die Lernende kaum, erreicht aber nur Menschen, die ohnehin abschließen, und baut keine Motivation auf, die bleibt.") },
  ];
  const story = useStory([
    { title: tt("Pressure raises activity today", "Druck steigert heute die Aktivität"), say: tt("Let us look at LearnLoop, which has seven ideas to raise engagement. Option F sends loss messages such as “You will lose your streak”. It makes people active this week, so it sits high on the picture, but it builds no reason of the learner's own, so it sits far to the left. It is the corner “Pressured and short-lived”, and it also costs trust.", "Sehen wir uns LearnLoop an, das sieben Ideen hat, um das Engagement zu steigern. Option F schickt Verlustmeldungen wie „Sie verlieren Ihre Serie“. Sie macht Menschen diese Woche aktiv und liegt deshalb weit oben im Bild, baut aber keinen eigenen Grund der Lernenden auf und liegt deshalb weit links. Es ist die Ecke „Unter Druck und kurzlebig“, und sie kostet auch Vertrauen."), look: tt("point F, top left", "Punkt F, oben links"), apply: () => { setSel("f"); setSpot("f"); } },
    { title: tt("A reward can send learners the wrong way", "Eine Belohnung kann Lernende in die falsche Richtung schicken"), say: tt("Option D gives points for opening a lesson. The cheapest way to earn them is to open lessons and not read them, which is the opposite of what LearnLoop wants. This is a perverse incentive: it produces the reverse of the intention. So ask of every reward: what is the cheapest way to earn it, and is that what we want?", "Option D gibt Punkte fürs Öffnen einer Lektion. Der günstigste Weg, sie zu verdienen, ist, Lektionen zu öffnen und nicht zu lesen, das Gegenteil dessen, was LearnLoop will. Das ist ein Fehlanreiz: Er erzeugt das Gegenteil der Absicht. Fragen Sie also bei jeder Belohnung: Was ist der günstigste Weg, sie zu verdienen, und ist das, was wir wollen?"), look: tt("point D, left of the middle", "Punkt D, links der Mitte"), apply: () => { setSel("d"); setSpot("d"); } },
    { title: tt("The aim, and what to take from it", "Das Ziel, und was Sie mitnehmen"), say: tt("Option A, a progress display, and option B, a goal sentence, sit in the bottom right: they support lasting motivation and put almost no pressure on the learner. So prefer measures the learner would endorse if they saw how they work. Select any point yourself, and remember that the positions are a reading of this example, not a score.", "Option A, eine Fortschrittsanzeige, und Option B, ein Zielsatz, liegen unten rechts: Sie stützen dauerhafte Motivation und üben fast keinen Druck auf die Lernende aus. Bevorzugen Sie also Maßnahmen, die die Lernende gutheißen würde, wenn sie sähe, wie sie wirken. Wählen Sie selbst einen Punkt, und bedenken Sie, dass die Positionen eine Lesart dieses Beispiels sind, keine Note."), look: tt("points A and B, bottom right", "Punkte A und B, unten rechts"), apply: () => { setSel("a"); setSpot("a"); } },
  ] satisfies StoryPlan[]);
  return (
    <Diagram label={tt("A worked example: LearnLoop's seven ideas by lasting motivation and pressure · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoops sieben Ideen nach dauerhafter Motivation und Druck · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("Every motivating element costs attention and can be used against the learner. Weigh the lasting motivation it builds against the pressure it puts on people, and aim for much motivation with little pressure.", "Jedes motivierende Element kostet Aufmerksamkeit und kann gegen die Lernende eingesetzt werden. Wägen Sie die dauerhafte Motivation, die es aufbaut, gegen den Druck ab, den es auf Menschen ausübt, und streben Sie viel Motivation bei wenig Druck an.")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <MatrixFig
          title={tt("LearnLoop: seven ideas by lasting motivation supported and pressure on the learner", "LearnLoop: sieben Ideen nach gestützter dauerhafter Motivation und Druck auf die Lernende")}
          xLabel={tt("Lasting motivation supported", "Gestützte dauerhafte Motivation")}
          yLabel={tt("Pressure on the learner", "Druck auf die Lernende")}
          quads={[tt("Pressured, short-lived", "Unter Druck, kurzlebig"), tt("Pressured, some lasting", "Unter Druck, etwas dauerhaft"), tt("Light, short-lived", "Leicht, kurzlebig"), tt("Aim here", "Ziel hier")]}
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

/* ------------------------------------------------------------------ B3 · a control group shows what the change did (interactive) */

const TEST = [30, 32, 34, 36, 37, 38, 39];
const CONTROL = [30, 31, 32, 32, 33, 34, 34];

export function ControlGroupChart() {
  const [control, setControl] = useState(false);
  const last = TEST.length - 1;
  const rise = TEST[last] - TEST[0];
  const seasonal = CONTROL[last] - CONTROL[0];
  const effect = TEST[last] - CONTROL[last];
  const X0 = 46;
  const X1 = 320;
  const Y0 = 20;
  const Y1 = 190;
  const px = (i: number) => X0 + (i / last) * (X1 - X0);
  const py = (v: number) => Y1 - ((v - 25) / (45 - 25)) * (Y1 - Y0);
  const pts = (arr: number[]) => arr.map((v, i) => `${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(" ");
  const story = useStory([
    { title: tt("The rate goes up", "Die Rate steigt"), say: tt(`Let us follow Dana, a product manager at LearnLoop. She shows a progress display to all learners, and the share of new learners who return within seven days rises from ${TEST[0]} percent to ${TEST[last]} percent in six weeks. It looks like a ${rise}-point success. But do we know that the display caused it?`, `Begleiten wir Dana, eine Produktmanagerin bei LearnLoop. Sie zeigt allen Lernenden eine Fortschrittsanzeige, und der Anteil neuer Lernender, die innerhalb von sieben Tagen zurückkehren, steigt in sechs Wochen von ${TEST[0]} Prozent auf ${TEST[last]} Prozent. Es sieht nach einem Erfolg von ${rise} Punkten aus. Aber wissen wir, dass die Anzeige ihn verursacht hat?`), look: tt("the single line, rising", "die einzelne Linie, steigend"), apply: () => setControl(false) },
    { title: tt("A control group shows the difference", "Eine Kontrollgruppe zeigt den Unterschied"), say: tt(`Now suppose half of the learners had not seen the display. Their rate also rose, from ${CONTROL[0]} to ${CONTROL[last]} percent, because it was the start of the year and more people were learning anyway. So the display added ${effect} points, not ${rise}. The gap between the two lines is what the change did.`, `Nun angenommen, die Hälfte der Lernenden hätte die Anzeige nicht gesehen. Ihre Rate stieg ebenfalls, von ${CONTROL[0]} auf ${CONTROL[last]} Prozent, weil es der Jahresanfang war und ohnehin mehr Menschen lernten. Die Anzeige brachte also ${effect} Punkte, nicht ${rise}. Der Abstand zwischen den beiden Linien ist das, was die Änderung bewirkt hat.`), look: tt("the second, dashed line, and the gap at week 6", "die zweite, gestrichelte Linie und der Abstand in Woche 6"), apply: () => setControl(true) },
    { title: tt("What to take from it", "Was Sie mitnehmen"), say: tt("So write the baseline down before you change anything, and compare against a control group when you have enough learners. Without it, a rise could be the season, a campaign or luck. With few learners, use small tests and interviews instead, and say that the result is a hint. Switch the control group on and off yourself.", "Schreiben Sie die Ausgangslage also auf, bevor Sie etwas ändern, und vergleichen Sie mit einer Kontrollgruppe, wenn Sie genug Lernende haben. Ohne sie könnte ein Anstieg die Jahreszeit, eine Kampagne oder Zufall sein. Bei wenigen Lernenden nutzen Sie stattdessen kleine Tests und Interviews und sagen, dass das Ergebnis ein Hinweis ist. Schalten Sie die Kontrollgruppe selbst ein und aus."), apply: () => setControl(true) },
  ] satisfies StoryPlan[]);
  return (
    <Diagram label={tt("A control group: what a change really did · Exploratory · Case assumption (LearnLoop)", "Eine Kontrollgruppe: was eine Änderung wirklich bewirkt hat · Explorativ · Fallannahme (LearnLoop)")}>
      <div className="space-y-3">
        <ThePoint>{tt("A rise in a metric does not prove that your change caused it. A baseline and a control group show how much of the rise is the change and how much would have happened anyway.", "Ein Anstieg einer Kennzahl beweist nicht, dass Ihre Änderung ihn verursacht hat. Eine Ausgangslage und eine Kontrollgruppe zeigen, wie viel vom Anstieg die Änderung ist und wie viel ohnehin geschehen wäre.")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <button type="button" aria-pressed={control} onClick={() => { story.leave(); setControl((c) => !c); }} className={clsx("btn btn-sm min-h-[40px] border", control ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
          {control ? tt("The control group is shown", "Die Kontrollgruppe wird gezeigt") : tt("Show the control group", "Die Kontrollgruppe zeigen")}
        </button>
        <div className={clsx("mx-auto w-full max-w-[460px]", story.step !== null && "anim-pulse rounded-lg")}>
          <Svg
            viewBox="0 0 340 236"
            label={tt("A line chart of the seven-day return rate over six weeks: the test group, and optionally a control group", "Ein Liniendiagramm der Rückkehrrate nach sieben Tagen über sechs Wochen: die Testgruppe und auf Wunsch eine Kontrollgruppe")}
            desc={tt(`The test group rises from ${TEST[0]} to ${TEST[last]} percent.${control ? ` The control group rises from ${CONTROL[0]} to ${CONTROL[last]} percent, so the change added ${effect} points.` : ""}`, `Die Testgruppe steigt von ${TEST[0]} auf ${TEST[last]} Prozent.${control ? ` Die Kontrollgruppe steigt von ${CONTROL[0]} auf ${CONTROL[last]} Prozent, die Änderung brachte also ${effect} Punkte.` : ""}`)}
          >
            <rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} fill="#FFFFFF" stroke="#556274" strokeWidth="1.5" />
            {[30, 35, 40].map((v) => (
              <g key={v}>
                <line x1={X0} x2={X1} y1={py(v)} y2={py(v)} stroke="#D5DEE9" />
                <Txt x={X0 - 6} y={py(v) + 4} size={11} anchor="end" fill="#556274">{`${v}%`}</Txt>
              </g>
            ))}
            {TEST.map((_, i) => (
              <Txt key={i} x={px(i)} y={Y1 + 16} size={11} anchor="middle" fill="#556274">{String(i)}</Txt>
            ))}
            <Txt x={(X0 + X1) / 2} y={Y1 + 34} size={11.5} bold anchor="middle" fill="#17212E">{tt("Week", "Woche")}</Txt>
            <line x1={X0} x2={X1} y1={py(TEST[0])} y2={py(TEST[0])} stroke="#8793A3" strokeDasharray="3 4" />
            <Txt x={X1 - 4} y={py(TEST[0]) + 14} size={10} anchor="end" fill="#556274">{tt("baseline 30%", "Ausgangslage 30 %")}</Txt>
            {control && <polyline points={pts(CONTROL)} fill="none" stroke="#556274" strokeWidth="2.4" strokeDasharray="6 4" />}
            <polyline points={pts(TEST)} fill="none" stroke="#1750A8" strokeWidth="2.8" />
            {TEST.map((v, i) => (
              <circle key={i} cx={px(i)} cy={py(v)} r="3.5" fill="#1750A8" />
            ))}
            <Txt x={px(last) - 6} y={py(TEST[last]) - 10} size={11} bold anchor="end" fill="#17212E">{tt(`test ${TEST[last]}%`, `Test ${TEST[last]} %`)}</Txt>
            {control && <Txt x={px(last) - 6} y={py(CONTROL[last]) + 20} size={11} bold anchor="end" fill="#556274">{tt(`control ${CONTROL[last]}%`, `Kontrolle ${CONTROL[last]} %`)}</Txt>}
            {control && <line x1={px(last) + 6} x2={px(last) + 6} y1={py(TEST[last])} y2={py(CONTROL[last])} stroke="#17212E" strokeWidth="2" />}
          </Svg>
        </div>
        <Insight>
          {control
            ? tt(`In plain words: the test group rose ${rise} points, but the control group rose ${seasonal} points without the display, so the display added ${effect}. That is the figure to report, and it is the one a reversal condition can be written against.`, `In einfachen Worten: Die Testgruppe stieg um ${rise} Punkte, aber die Kontrollgruppe stieg ohne die Anzeige um ${seasonal} Punkte, die Anzeige brachte also ${effect}. Das ist die Zahl, die man berichtet, und die, gegen die sich eine Rückgängig-Bedingung schreiben lässt.`)
            : tt(`In plain words: the rate rose ${rise} points, from ${TEST[0]} to ${TEST[last]} percent. With only this line, nobody can say how much of that is the display and how much is the season. The figures are made up to show the method.`, `In einfachen Worten: Die Rate stieg um ${rise} Punkte, von ${TEST[0]} auf ${TEST[last]} Prozent. Mit nur dieser Linie kann niemand sagen, wie viel davon die Anzeige und wie viel die Jahreszeit ist. Die Zahlen sind erfunden, um die Methode zu zeigen.`)}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B3 · a decision under uncertainty, filled in for LearnLoop (static) */

export function DecisionFrame() {
  return (
    <DecisionFrameFig
      label={tt("A decision under uncertainty, filled in for LearnLoop", "Eine Entscheidung unter Unsicherheit, für LearnLoop ausgefüllt")}
      caption={tt("The four boxes make a decision checkable. The two boxes below make future optimisation less dependent on the loudest opinion.", "Die vier Kästen machen eine Entscheidung überprüfbar. Die zwei Kästen darunter machen künftige Optimierung weniger abhängig von der lautesten Meinung.")}
      boxes={[
        [tt("I decide", "Ich entscheide"), tt("Show a progress display and a next step in two courses first.", "Zuerst in zwei Kursen eine Fortschrittsanzeige und einen nächsten Schritt zeigen.")],
        [tt("I do not know", "Ich weiß nicht"), tt("Whether learners leave for lack of direction or for lack of time; the data does not say.", "Ob Lernende wegen fehlender Richtung oder fehlender Zeit gehen; die Daten sagen es nicht.")],
        [tt("I reverse if", "Ich nehme zurück, wenn"), tt("The seven-day return rate is not 4 points above the control group after 8 weeks.", "die Rückkehrrate nach sieben Tagen nach 8 Wochen nicht 4 Punkte über der Kontrollgruppe liegt.")],
        [tt("I give up", "Ich verzichte auf"), tt("The points programme this year.", "das Punkteprogramm in diesem Jahr.")],
      ]}
      rule={[
        [tt("Who decides", "Wer entscheidet"), tt("The head of product with the learning lead.", "Die Leiterin Produkt mit dem Learning Lead.")],
        [tt("On what evidence", "Auf welcher Grundlage"), tt("An A/B test with a control group, five learner interviews, return-rate data.", "Ein A/B-Test mit Kontrollgruppe, fünf Lernenden-Interviews, Rückkehrdaten.")],
      ]}
    />
  );
}
