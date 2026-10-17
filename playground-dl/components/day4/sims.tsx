"use client";

import { useState } from "react";
import clsx from "clsx";
import { tt } from "@/lib/lang";

/**
 * Day 4 · the working simulations of CLAUDE.md #60, built one to one from the plan's clues. Platform A (a benchmark): a progress bar that reads “40% done”,
 * small successes that are visible (“Correct.” and “Next: task 4”), short tasks of about three minutes, and a goal at the start of each unit. Platform B
 * (MotivaLearn today): long content, no feedback, unclear goals, no progress and no end point. The three options of Block 1.2 as the same short lesson: with
 * points and badges (A), with a visible progress path (B), with interactive tasks (C). Own colours only; the content is made up and nothing is marked.
 */
const INK = "text-[#26323F]";
const btn = "min-h-[40px] rounded border border-[#B9B4C4] bg-[#F4F2F7] px-4 text-[14px] text-[#26323F] hover:bg-[#E9E6F0]";
const btnDark = "min-h-[40px] rounded bg-[#4A4458] px-4 text-[14px] font-semibold text-white hover:bg-[#383344]";

type Task = { ask: string; options: string[]; right: number };
const TASKS = (): Task[] => [
  { ask: tt("The other side asks for a lower price. What do you do first?", "Die Gegenseite fordert einen niedrigeren Preis. Was tun Sie zuerst?"), options: [tt("Ask what is behind the request", "Nachfragen, was hinter der Forderung steckt"), tt("Agree at once", "Sofort zustimmen")], right: 0 },
  { ask: tt("Which sentence opens a counter-offer?", "Welcher Satz eröffnet ein Gegenangebot?"), options: [tt("“We can offer this if you commit to a longer term.”", "„Wir können das anbieten, wenn Sie sich länger binden.“"), tt("“That is impossible.”", "„Das ist unmöglich.“")], right: 0 },
  { ask: tt("A counter-offer should name…", "Ein Gegenangebot sollte nennen …"), options: [tt("what you give and what you ask in return", "was Sie geben und was Sie dafür verlangen"), tt("only your own wish", "nur Ihren eigenen Wunsch")], right: 0 },
  { ask: tt("When the other side says no, you…", "Wenn die Gegenseite Nein sagt, …"), options: [tt("look for a second option to offer", "suchen Sie eine zweite Option, die Sie anbieten"), tt("end the talk", "beenden Sie das Gespräch")], right: 0 },
  { ask: tt("After the agreement you…", "Nach der Einigung …"), options: [tt("write it down and confirm it", "halten Sie sie schriftlich fest und bestätigen sie"), tt("trust memory", "verlassen Sie sich auf das Gedächtnis")], right: 0 },
];

/** Platform A, a benchmark. */
export function GuidedPlatformSim() {
  const tasks = TASKS();
  const [done, setDone] = useState<number[]>([0, 1]);
  const [view, setView] = useState<number | null>(null);
  const [pick, setPick] = useState<number | null>(null);
  const [result, setResult] = useState<"right" | "wrong" | null>(null);
  const pct = Math.round((done.length / tasks.length) * 100);
  const next = tasks.findIndex((_, i) => !done.includes(i));
  const bar = (
    <div className="flex items-center gap-3 px-4 pt-3">
      <div className="h-2.5 flex-1 rounded-full bg-[#E4E0EC]" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={tt("Progress", "Fortschritt")}>
        <div className="h-2.5 rounded-full bg-[#2E7D5B]" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[13px] font-semibold">{tt(`${pct}% done`, `${pct} % geschafft`)}</span>
    </div>
  );
  const head = <div className="bg-[#4A4458] px-4 py-2.5 font-serif text-[15px] font-bold text-white">{tt("Negotiation basics", "Verhandlungsgrundlagen")}</div>;
  if (view !== null) {
    const t = tasks[view];
    return (
      <div className={INK}>
        {head}
        {bar}
        <div className="space-y-3 px-4 py-4">
          <p className="rounded bg-[#EEF3EE] px-3 py-2 text-[13px]"><span className="font-semibold">{tt("After this unit you can:", "Nach dieser Einheit können Sie:")}</span> {tt("write a counter-offer", "ein Gegenangebot schreiben")}</p>
          <p className="text-[12px] font-semibold text-[#4A4458]">{tt(`Task ${view + 1} · about 3 minutes`, `Aufgabe ${view + 1} · etwa 3 Minuten`)}</p>
          <fieldset className="space-y-2">
            <legend className="text-[15px] font-semibold">{t.ask}</legend>
            {t.options.map((o, j) => (
              <label key={j} className={clsx("flex min-h-[44px] cursor-pointer items-center gap-2 rounded border px-3 text-[14px]", pick === j ? "border-[#4A4458] bg-[#F4F2F7]" : "border-[#D9D5E2]")}>
                <input type="radio" name="task" checked={pick === j} onChange={() => { setPick(j); setResult(null); }} />
                {o}
              </label>
            ))}
          </fieldset>
          {result === null ? (
            <button type="button" disabled={pick === null} onClick={() => setResult(pick === t.right ? "right" : "wrong")} className={btnDark}>{tt("Check", "Prüfen")}</button>
          ) : (
            <div className="space-y-2" aria-live="polite">
              <p className="text-[15px] font-semibold">{result === "right" ? tt("Correct.", "Richtig.") : tt("Not quite.", "Nicht ganz.")}</p>
              <button
                type="button"
                onClick={() => {
                  setDone((d) => (d.includes(view) ? d : [...d, view].sort()));
                  setView(null);
                  setPick(null);
                  setResult(null);
                }}
                className={btnDark}
              >
                {view + 2 <= tasks.length ? tt(`Next: task ${view + 2}`, `Weiter: Aufgabe ${view + 2}`) : tt("Back to the course", "Zurück zum Kurs")}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className={INK}>
      {head}
      {bar}
      <div className="space-y-2 px-4 py-4">
        <p className="rounded bg-[#EEF3EE] px-3 py-2 text-[13px]"><span className="font-semibold">{tt("After this unit you can:", "Nach dieser Einheit können Sie:")}</span> {tt("write a counter-offer", "ein Gegenangebot schreiben")}</p>
        <ol className="space-y-1.5">
          {tasks.map((t, i) => (
            <li key={i}>
              <button type="button" onClick={() => { setView(i); setPick(null); setResult(null); }} className={clsx("flex min-h-[44px] w-full items-center gap-3 rounded border px-3 text-left", i === next ? "border-2 border-[#4A4458]" : "border-[#D9D5E2]")}>
                <span aria-hidden className={clsx("flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-bold text-white", done.includes(i) ? "bg-[#2E7D5B]" : "bg-[#B9B4C4]")}>{done.includes(i) ? "✓" : i + 1}</span>
                <span className="flex-1 text-[14px]">{tt(`Task ${i + 1}`, `Aufgabe ${i + 1}`)}</span>
                <span className="text-[12px] text-[#5F5E5A]">{tt("3 min", "3 Min.")}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

const LONG = () => [
  tt("Motivation is one of the most studied topics in the psychology of learning, and the literature distinguishes many kinds of it. Some authors speak of drives, others of needs, others of goals, and each tradition uses its own words for what keeps a person at a task over time. A learner may begin a course because a manager asked, because a certificate is useful, or because the subject is interesting, and the reasons can change from one week to the next.", "Motivation ist eines der am meisten untersuchten Themen der Lernpsychologie, und die Literatur unterscheidet viele Arten davon. Manche Autoren sprechen von Trieben, andere von Bedürfnissen, andere von Zielen, und jede Tradition nutzt eigene Worte dafür, was eine Person über längere Zeit bei einer Aufgabe hält. Eine Lernende kann einen Kurs beginnen, weil eine Führungskraft darum bat, weil ein Zertifikat nützlich ist oder weil das Thema interessant ist, und die Gründe können sich von Woche zu Woche ändern."),
  tt("The research also shows that the same learner may feel very different on different days, depending on sleep, workload and what happened in the meeting before. For that reason a platform cannot assume that interest will be there when a lesson opens. What it can do is describe the topic, explain the terms in turn, and give the learner the space to read all of the material at their own pace, from the first definition to the last example, before moving on to the next lesson.", "Die Forschung zeigt auch, dass dieselbe Lernende sich an verschiedenen Tagen sehr unterschiedlich fühlen kann, je nach Schlaf, Arbeitslast und dem, was in der Besprechung davor geschah. Deshalb kann eine Plattform nicht davon ausgehen, dass Interesse da ist, wenn eine Lektion sich öffnet. Was sie tun kann, ist, das Thema zu beschreiben, die Begriffe der Reihe nach zu erklären und der Lernenden Raum zu geben, das gesamte Material in ihrem Tempo zu lesen, von der ersten Definition bis zum letzten Beispiel, bevor sie zur nächsten Lektion weitergeht."),
  tt("Over the following pages the course discusses each kind of motivation in turn, with background on where the ideas come from and how they were tested. Readers who reach the end will find that the pieces fit together, although the order in which they are presented follows the history of the field and not the order in which a practitioner would need them.", "Auf den folgenden Seiten bespricht der Kurs jede Art der Motivation der Reihe nach, mit Hintergrund dazu, woher die Ideen kommen und wie sie getestet wurden. Wer das Ende erreicht, wird feststellen, dass die Teile zusammenpassen, auch wenn die Reihenfolge ihrer Darstellung der Geschichte des Fachs folgt und nicht der Reihenfolge, in der eine Praktikerin sie brauchen würde."),
];

/** Platform B, and MotivaLearn today: long content, no feedback, unclear goals, no progress, no end point. */
export function LongPlatformSim() {
  const pages = LONG();
  const [view, setView] = useState<"course" | "lesson">("course");
  const [page, setPage] = useState(0);
  const head = <div className="bg-[#6B6F76] px-4 py-2.5 font-serif text-[15px] font-bold text-white">{tt("Motivation in learning", "Motivation beim Lernen")}</div>;
  if (view === "course")
    return (
      <div className={INK}>
        {head}
        <div className="space-y-2 px-4 py-4">
          <p className="text-[14px]">{tt("A course on motivation.", "Ein Kurs über Motivation.")}</p>
          <ul className="space-y-1.5">
            {[tt("Lesson", "Lektion"), tt("Lesson", "Lektion"), tt("Lesson", "Lektion")].map((l, i) => (
              <li key={i}>
                <button type="button" onClick={() => { setView("lesson"); setPage(0); }} className="block min-h-[44px] w-full rounded border border-[#CCCCCC] bg-white px-3 text-left text-[14px]">{`${l}`}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  return (
    <div className={INK}>
      {head}
      <div className="space-y-3 px-4 py-4">
        <p className="text-[15px] leading-[1.8]">{pages[page]}</p>
        <button type="button" onClick={() => (page + 1 < pages.length ? setPage(page + 1) : setView("course"))} className={btn}>{tt("Continue", "Weiter")}</button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Block 1.2 · the three options as the same short lesson */

const PAGES = () => [
  { title: tt("Why plans slip", "Warum Pläne verrutschen"), text: tt("Plans slip when nobody checks them. A short weekly look at what is done and what is next catches most delays early.", "Pläne verrutschen, wenn niemand sie prüft. Ein kurzer wöchentlicher Blick darauf, was fertig ist und was als Nächstes kommt, fängt die meisten Verzögerungen früh ab."), q: tt("What catches most delays early?", "Was fängt die meisten Verzögerungen früh ab?"), a: [tt("A weekly look at what is done and next", "Ein wöchentlicher Blick auf Erledigtes und Nächstes"), tt("A longer plan", "Ein längerer Plan")] },
  { title: tt("Splitting the work", "Die Arbeit aufteilen"), text: tt("Big tasks hide their size. Splitting a task into steps of a day or less makes the work visible and easier to start.", "Große Aufgaben verbergen ihre Größe. Eine Aufgabe in Schritte von höchstens einem Tag zu teilen macht die Arbeit sichtbar und leichter zu beginnen."), q: tt("Why split a big task?", "Warum eine große Aufgabe teilen?"), a: [tt("It makes the work visible and easier to start", "Es macht die Arbeit sichtbar und leichter zu beginnen"), tt("It makes the task bigger", "Es macht die Aufgabe größer")] },
  { title: tt("Saying what is done", "Sagen, was fertig ist"), text: tt("A step is done when someone else could use its result. Writing that down avoids arguments at the end.", "Ein Schritt ist fertig, wenn jemand anderes sein Ergebnis nutzen könnte. Das aufzuschreiben vermeidet Streit am Ende."), q: tt("When is a step done?", "Wann ist ein Schritt fertig?"), a: [tt("When someone else could use its result", "Wenn jemand anderes sein Ergebnis nutzen könnte"), tt("When the author is tired", "Wenn der Autor müde ist")] },
];

/** The three options of Block 1.2, each as the same short lesson: A gamification (badges, points), B visible progress, C interactive content. */
export function EngagementOptionSim({ option }: { option: "A" | "B" | "C" }) {
  const pages = PAGES();
  const [i, setI] = useState(0);
  const [points, setPoints] = useState(0);
  const [answered, setAnswered] = useState<Record<number, number>>({});
  const p = pages[i];
  const last = i === pages.length - 1;
  const head = (
    <div className="flex items-center justify-between bg-[#4A4458] px-4 py-2.5 text-white">
      <span className="font-serif text-[15px] font-bold">{tt("Planning basics", "Planungsgrundlagen")}</span>
      {option === "A" && <span className="rounded-full bg-white px-3 py-0.5 text-[13px] font-bold text-[#4A4458]">{tt(`${points} points`, `${points} Punkte`)}</span>}
    </div>
  );
  const go = () => {
    if (option === "A") setPoints((x) => x + 10);
    setI((x) => Math.min(pages.length - 1, x + 1));
  };
  return (
    <div className={INK}>
      {head}
      {option === "B" && (
        <div className="px-4 pt-3">
          <ol className="flex gap-1" aria-label={tt("Progress path", "Fortschrittspfad")}>
            {pages.map((x, k) => (
              <li key={k} className={clsx("flex-1 rounded px-2 py-1 text-center text-[12px]", k < i ? "bg-[#2E7D5B] text-white" : k === i ? "border-2 border-[#4A4458] bg-white font-semibold" : "bg-[#E4E0EC]")}>
                {k < i ? "✓ " : ""}{k + 1}
              </li>
            ))}
          </ol>
          <p className="mt-1 text-[13px] text-[#5F5E5A]">{tt(`Step ${i + 1} of ${pages.length} · ${Math.round((i / pages.length) * 100)}% done`, `Schritt ${i + 1} von ${pages.length} · ${Math.round((i / pages.length) * 100)} % geschafft`)}</p>
        </div>
      )}
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{p.title}</h3>
        <p className="text-[15px] leading-relaxed">{p.text}</p>
        {option === "C" && (
          <fieldset className="space-y-2 rounded border border-[#D9D5E2] p-3">
            <legend className="px-1 text-[14px] font-semibold">{p.q}</legend>
            {p.a.map((o, j) => (
              <label key={j} className={clsx("flex min-h-[40px] cursor-pointer items-center gap-2 rounded border px-3 text-[14px]", answered[i] === j ? "border-[#4A4458] bg-[#F4F2F7]" : "border-[#D9D5E2]")}>
                <input type="radio" name={`q${i}`} checked={answered[i] === j} onChange={() => setAnswered((s) => ({ ...s, [i]: j }))} />
                {o}
              </label>
            ))}
            {answered[i] !== undefined && <p role="status" className="text-[13px]">{answered[i] === 0 ? tt("Correct.", "Richtig.") : tt("Not quite.", "Nicht ganz.")}</p>}
          </fieldset>
        )}
        {option === "A" && points >= 20 && (
          <p className="rounded bg-[#FFF4D6] px-3 py-2 text-[13px] font-semibold" role="status">{tt("Badge unlocked: Explorer", "Badge freigeschaltet: Entdecker")}</p>
        )}
        <div className="flex gap-2">
          <button type="button" onClick={() => setI((x) => Math.max(0, x - 1))} disabled={i === 0} className={btn}>‹ {tt("Back", "Zurück")}</button>
          <button type="button" onClick={go} disabled={last} className={btnDark}>{tt("Next", "Weiter")} ›</button>
        </div>
      </div>
    </div>
  );
}
