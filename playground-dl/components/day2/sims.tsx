"use client";

import { useState } from "react";
import clsx from "clsx";
import { DeskSim, Sheet } from "@/components/sim/DeskSim";
import { tt } from "@/lib/lang";

/**
 * Day 2 · the working simulations of CLAUDE.md #60. Each one is built one to one from the plan's clues and the task's numbered facts, and adds
 * nothing that would change an answer. Platform A (a benchmark): a path of six steps with the current one marked, a progress bar with "Step n of
 * 6", units of six minutes with one goal, a quiz that says "x of y correct" and names the question to review. Platform B (LearnPro today): one
 * long page, no menu, no sign of progress, and after the last page a button back to the course list with no message. The three options of
 * Block 1.2: a high-fidelity prototype in which every drawn screen is linked (list, lesson, quiz, result) while nothing works behind it (the result is fixed, nothing is saved), a paper prototype paged through by a person who
 * plays the computer, and the live product with real data. Route 2: the Chief Product Officer's desk. Own colours only; the content is made up.
 */

type Unit = { title: string; goal: string; text: string; q: { ask: string; options: string[]; right: number }[] };

const UNITS = (): Unit[] => [
  {
    title: tt("Why projects fail", "Warum Projekte scheitern"),
    goal: tt("Name two plain reasons projects fail.", "Zwei einfache Gründe nennen, warum Projekte scheitern."),
    text: tt("Most projects that fail do so for plain reasons. The goal was never written down, or nobody checked early whether the plan still fitted. A one-line goal and a short check every week catch most of it.", "Die meisten Projekte, die scheitern, scheitern aus einfachen Gründen. Das Ziel wurde nie aufgeschrieben, oder niemand prüfte früh, ob der Plan noch passt. Ein Ziel in einer Zeile und eine kurze Prüfung jede Woche fangen das meiste ab."),
    q: [
      { ask: tt("Which is a plain reason projects fail?", "Was ist ein einfacher Grund, warum Projekte scheitern?"), options: [tt("The goal was never written down", "Das Ziel wurde nie aufgeschrieben"), tt("The slides used the wrong font", "Die Folien hatten die falsche Schrift"), tt("The team met too often", "Das Team traf sich zu oft")], right: 0 },
      { ask: tt("What catches most of it?", "Was fängt das meiste ab?"), options: [tt("A longer plan", "Ein längerer Plan"), tt("A one-line goal and a weekly check", "Ein Ziel in einer Zeile und eine wöchentliche Prüfung"), tt("More people", "Mehr Leute")], right: 1 },
    ],
  },
  {
    title: tt("Planning a project", "Ein Projekt planen"),
    goal: tt("Write a plan on one page.", "Einen Plan auf einer Seite schreiben."),
    text: tt("A good first plan fits on one page: the goal, the three biggest steps, who does each, and the date you will look at it again. Anything longer is usually written before anyone knows enough.", "Ein guter erster Plan passt auf eine Seite: das Ziel, die drei größten Schritte, wer jeden macht, und das Datum, an dem Sie wieder draufschauen. Alles Längere wird meist geschrieben, bevor jemand genug weiß."),
    q: [
      { ask: tt("What belongs on a one-page plan?", "Was gehört auf einen Plan auf einer Seite?"), options: [tt("Every task for a year", "Jede Aufgabe für ein Jahr"), tt("The goal, three big steps, owners, a review date", "Ziel, drei große Schritte, Verantwortliche, ein Prüfdatum"), tt("Only the budget", "Nur das Budget")], right: 1 },
      { ask: tt("Why keep the first plan short?", "Warum den ersten Plan kurz halten?"), options: [tt("Because nobody knows enough yet", "Weil noch niemand genug weiß"), tt("Because paper is expensive", "Weil Papier teuer ist"), tt("Because managers dislike plans", "Weil Manager Pläne nicht mögen")], right: 0 },
    ],
  },
  {
    title: tt("Working in a team", "Im Team arbeiten"),
    goal: tt("Agree who decides what.", "Vereinbaren, wer was entscheidet."),
    text: tt("Teams lose time when nobody knows who decides. Write down for the three biggest steps who decides, who is asked and who is told. It takes ten minutes and saves weeks.", "Teams verlieren Zeit, wenn niemand weiß, wer entscheidet. Schreiben Sie für die drei größten Schritte auf, wer entscheidet, wer gefragt und wer informiert wird. Das dauert zehn Minuten und spart Wochen."),
    q: [
      { ask: tt("What do teams lose time on?", "Womit verlieren Teams Zeit?"), options: [tt("Not knowing who decides", "Nicht zu wissen, wer entscheidet"), tt("Short meetings", "Kurzen Besprechungen"), tt("Writing goals", "Ziele aufzuschreiben")], right: 0 },
      { ask: tt("How long does the agreement take?", "Wie lange dauert die Vereinbarung?"), options: [tt("About ten minutes", "Etwa zehn Minuten"), tt("A full day", "Einen ganzen Tag"), tt("A month", "Einen Monat")], right: 0 },
    ],
  },
  {
    title: tt("Managing risks", "Risiken steuern"),
    goal: tt("List the three risks that matter most.", "Die drei wichtigsten Risiken auflisten."),
    text: tt("A long risk list is rarely read. Pick the three risks that would hurt most, say what you would notice first if each came true, and what you would do then.", "Eine lange Risikoliste wird selten gelesen. Wählen Sie die drei Risiken, die am meisten schaden würden, sagen Sie, was Sie zuerst bemerken würden, wenn jedes eintritt, und was Sie dann tun würden."),
    q: [
      { ask: tt("How many risks should you track closely?", "Wie viele Risiken sollten Sie eng verfolgen?"), options: [tt("Every risk you can think of", "Jedes Risiko, das Ihnen einfällt"), tt("The three that would hurt most", "Die drei, die am meisten schaden würden"), tt("None", "Keines")], right: 1 },
      { ask: tt("What do you note for each risk?", "Was notieren Sie zu jedem Risiko?"), options: [tt("The first sign and what you would do", "Das erste Zeichen und was Sie tun würden"), tt("Who is to blame", "Wer schuld ist"), tt("Nothing", "Nichts")], right: 0 },
    ],
  },
  {
    title: tt("Talking to stakeholders", "Mit Stakeholdern sprechen"),
    goal: tt("Give a two-minute status update.", "Einen Status in zwei Minuten geben."),
    text: tt("Stakeholders want three things: where the project stands, what is at risk, and what you need from them. Say it in that order, in two minutes, and stop.", "Stakeholder wollen drei Dinge: wo das Projekt steht, was gefährdet ist und was Sie von ihnen brauchen. Sagen Sie es in dieser Reihenfolge, in zwei Minuten, und hören Sie auf."),
    q: [
      { ask: tt("What comes first in a status update?", "Was kommt in einem Status zuerst?"), options: [tt("Where the project stands", "Wo das Projekt steht"), tt("A long history", "Eine lange Vorgeschichte"), tt("The team's holidays", "Der Urlaub des Teams")], right: 0 },
      { ask: tt("How long should it take?", "Wie lange sollte er dauern?"), options: [tt("About two minutes", "Etwa zwei Minuten"), tt("Half an hour", "Eine halbe Stunde"), tt("As long as needed", "So lange wie nötig")], right: 0 },
    ],
  },
  {
    title: tt("Closing a project", "Ein Projekt abschließen"),
    goal: tt("Write down three lessons for next time.", "Drei Lehren für das nächste Mal aufschreiben."),
    text: tt("A project is not finished when the work stops, but when the team has written down what it would do differently. Three honest lessons are worth more than a long report.", "Ein Projekt ist nicht fertig, wenn die Arbeit aufhört, sondern wenn das Team aufgeschrieben hat, was es anders machen würde. Drei ehrliche Lehren sind mehr wert als ein langer Bericht."),
    q: [
      { ask: tt("When is a project really finished?", "Wann ist ein Projekt wirklich fertig?"), options: [tt("When the lessons are written down", "Wenn die Lehren aufgeschrieben sind"), tt("When the budget is spent", "Wenn das Budget verbraucht ist"), tt("When the manager says so", "Wenn die Leitung es sagt")], right: 0 },
      { ask: tt("What is worth more?", "Was ist mehr wert?"), options: [tt("A long report", "Ein langer Bericht"), tt("Three honest lessons", "Drei ehrliche Lehren"), tt("A party", "Eine Feier")], right: 1 },
    ],
  },
];

const btnPrimary = "min-h-[40px] rounded-full bg-[#4C2FBF] px-4 text-[14px] font-semibold text-white hover:bg-[#3E25A0]";
const btnWarm = "min-h-[40px] rounded-full bg-[#F59E0B] px-4 text-[14px] font-semibold text-white hover:bg-[#D98A07]";

/* ------------------------------------------------------------------ a course with a path, progress, short units and feedback */

/** Platform A, and (with `live`) Option C of Block 1.2: the same course as a working product. */
export function GuidedCourseSim({ live = false }: { live?: boolean }) {
  const units = UNITS();
  const [done, setDone] = useState<number[]>([0]);
  const [view, setView] = useState<{ kind: "path" } | { kind: "unit"; i: number } | { kind: "quiz"; i: number }>({ kind: "path" });
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<{ right: number; total: number; review: number | null } | null>(null);
  const step = Math.min(done.length + 1, 6);
  const header = (
    <>
      <div className="flex items-center justify-between bg-[#4C2FBF] px-4 py-2.5 text-white">
        <span className="font-serif text-[15px] font-bold">{tt("Project basics", "Projektgrundlagen")}</span>
        {live && <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#4C2FBF]">JM</span>}
      </div>
      {live && <p className="bg-[#FFF4E5] px-4 py-1 text-[12px] text-[#7A4A00]">{tt("Live · every learner sees this version · signed in as J. M.", "Live · alle Lernenden sehen diese Version · angemeldet als J. M.")}</p>}
      <div className="flex items-center gap-3 px-4 pt-3">
        <div className="h-2 flex-1 rounded-full bg-[#E9E6F5]" role="progressbar" aria-valuemin={0} aria-valuemax={6} aria-valuenow={done.length} aria-label={tt("Progress", "Fortschritt")}>
          <div className="h-2 rounded-full bg-[#F59E0B]" style={{ width: `${Math.round((done.length / 6) * 100)}%` }} />
        </div>
        <span className="text-[13px] text-[#555]">{done.length === 6 ? tt("6 of 6 done", "6 von 6 erledigt") : tt(`Step ${step} of 6`, `Schritt ${step} von 6`)}</span>
      </div>
    </>
  );
  if (view.kind === "unit") {
    const u = units[view.i];
    return (
      <div>
        {header}
        <div className="space-y-3 px-4 py-4">
          <button type="button" onClick={() => setView({ kind: "path" })} className="text-[13px] text-[#4C2FBF] underline">← {tt("Back to the path", "Zurück zum Pfad")}</button>
          <p className="text-[12px] font-semibold text-[#4C2FBF]">{tt(`Unit ${view.i + 1} · 6 min`, `Einheit ${view.i + 1} · 6 Min.`)}</p>
          <h3 className="text-[18px] font-bold text-[#2B2340]">{u.title}</h3>
          <p className="rounded-lg bg-[#EFE8FB] px-3 py-2 text-[13px] text-[#2B2340]"><span className="font-semibold">{tt("Goal:", "Ziel:")}</span> {u.goal}</p>
          <p className="max-w-prose text-[15px] leading-relaxed">{u.text}</p>
          <button type="button" onClick={() => { setAnswers({}); setResult(null); setView({ kind: "quiz", i: view.i }); }} className={btnWarm}>{tt("Check yourself ›", "Selbst prüfen ›")}</button>
        </div>
      </div>
    );
  }
  if (view.kind === "quiz") {
    const u = units[view.i];
    const submit = () => {
      const wrong = u.q.findIndex((q, k) => answers[k] !== q.right);
      setResult({ right: u.q.filter((q, k) => answers[k] === q.right).length, total: u.q.length, review: wrong >= 0 ? wrong : null });
    };
    return (
      <div>
        {header}
        <div className="space-y-3 px-4 py-4">
          <p className="text-[12px] font-semibold text-[#4C2FBF]">{tt(`Quiz · unit ${view.i + 1}`, `Quiz · Einheit ${view.i + 1}`)}</p>
          {u.q.map((q, k) => (
            <fieldset key={k} className="space-y-1.5">
              <legend className="text-[14px] font-semibold">{`${k + 1}. ${q.ask}`}</legend>
              {q.options.map((o, j) => (
                <label key={j} className={clsx("flex min-h-[40px] cursor-pointer items-center gap-2 rounded-lg border px-3 text-[14px]", answers[k] === j ? "border-[#4C2FBF] bg-[#F4F1FD]" : "border-[#E3DFF0]")}>
                  <input type="radio" name={`q${view.i}-${k}`} checked={answers[k] === j} onChange={() => setAnswers((a) => ({ ...a, [k]: j }))} />
                  {o}
                </label>
              ))}
            </fieldset>
          ))}
          {!result ? (
            <button type="button" onClick={submit} className={btnPrimary}>{tt("Submit", "Absenden")}</button>
          ) : (
            <div className="space-y-2" aria-live="polite">
              <p className="rounded-lg bg-[#EFE8FB] px-3 py-2 text-[14px]">
                <span className="font-bold">{tt(`${result.right} of ${result.total} correct.`, `${result.right} von ${result.total} richtig.`)}</span>{" "}
                {result.review !== null ? tt(`Review question ${result.review + 1}.`, `Frage ${result.review + 1} wiederholen.`) : tt("Nothing to review.", "Nichts zu wiederholen.")}
              </p>
              <button type="button" onClick={() => { setDone((d) => (d.includes(view.i) ? d : [...d, view.i].sort())); setView({ kind: "path" }); }} className={btnWarm}>{tt("Back to the path ›", "Zurück zum Pfad ›")}</button>
            </div>
          )}
        </div>
      </div>
    );
  }
  const next = units.findIndex((_, i) => !done.includes(i));
  return (
    <div>
      {header}
      <div className="space-y-2 px-4 py-4">
        <p className="text-[13px] text-[#555]">{next >= 0 ? <>{tt("Next up: ", "Als Nächstes: ")}<span className="font-semibold text-[#2B2340]">{units[next].title}</span></> : tt("You have done all six steps.", "Sie haben alle sechs Schritte erledigt.")}</p>
        <ol className="space-y-1.5">
          {units.map((u, i) => {
            const isDone = done.includes(i);
            const isNext = i === next;
            return (
              <li key={i}>
                <button type="button" onClick={() => setView({ kind: "unit", i })} className={clsx("flex min-h-[44px] w-full items-center gap-3 rounded-xl border px-3 text-left", isNext ? "border-2 border-[#4C2FBF]" : "border-[#E3DFF0]", isDone && "bg-[#F4F1FD]")}>
                  <span className={clsx("flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white", isDone ? "bg-[#2E9E6B]" : isNext ? "bg-[#4C2FBF]" : "bg-[#C9B8F5]")} aria-hidden>{isDone ? "✓" : i + 1}</span>
                  <span className="flex-1 text-[14px] font-semibold text-[#2B2340]">{u.title}{isNext ? <span className="sr-only">{tt(" (current step)", " (aktueller Schritt)")}</span> : null}</span>
                  <span className="rounded-full bg-[#EFE8FB] px-2 py-0.5 text-[12px] text-[#4C2FBF]">{tt("6 min", "6 Min.")}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ one long page, no menu, no progress, no message at the end */

/** Platform B, LearnPro today (and LearnPro in Block 2.1): every course is one long page, with no menu and no sign of progress; after the last page a button back to the course list, with no message. */
const FILLER = () => [
  tt("In practice this means that a team which keeps going without checking will often discover late that it was building different things, and by then the time and the money have gone. Teams that take the time to agree early spend that time once; teams that do not spend it again and again.", "In der Praxis heißt das, dass ein Team, das ohne Prüfung weitermacht, oft spät entdeckt, dass es an verschiedenen Dingen gebaut hat, und dann sind Zeit und Geld weg. Teams, die sich früh die Zeit nehmen, sich abzustimmen, verbringen diese Zeit einmal; Teams, die es nicht tun, verbringen sie immer wieder."),
  tt("The same holds for every part of a project, from the first plan to the last report: what is written down can be checked, and what can be checked can be corrected while it is still cheap.", "Dasselbe gilt für jeden Teil eines Projekts, vom ersten Plan bis zum letzten Bericht: Was aufgeschrieben ist, lässt sich prüfen, und was sich prüfen lässt, lässt sich korrigieren, solange es noch günstig ist."),
];

const LP_COURSES = () => {
  const units = UNITS();
  return [
    {
      title: tt("Project basics", "Projektgrundlagen"),
      blurb: tt("Plan, run and close a small project.", "Ein kleines Projekt planen, durchführen und abschließen."),
      paras: units.flatMap((u) => [`${u.text} ${u.text}`]),
    },
    {
      title: tt("Time management", "Zeitmanagement"),
      blurb: tt("Make room for the work that matters.", "Platz für die Arbeit schaffen, die zählt."),
      paras: [
        tt("Most people do not lack time; they lack a clear order. Write down what has to be done this week, mark the three things that matter most, and do those first, before the day fills up with requests from others. The rest can wait or be shared.", "Den meisten Menschen fehlt nicht die Zeit, sondern eine klare Reihenfolge. Schreiben Sie auf, was diese Woche zu tun ist, markieren Sie die drei wichtigsten Dinge und erledigen Sie diese zuerst, bevor sich der Tag mit Anfragen anderer füllt. Der Rest kann warten oder verteilt werden."),
        tt("A calendar is a promise to yourself. Block the time for focused work the way you block time for a meeting, and treat it as just as fixed. Interruptions are normal; the aim is that they do not take the whole day.", "Ein Kalender ist ein Versprechen an sich selbst. Blocken Sie die Zeit für konzentrierte Arbeit so, wie Sie Zeit für einen Termin blocken, und behandeln Sie sie als ebenso fest. Unterbrechungen sind normal; das Ziel ist, dass sie nicht den ganzen Tag nehmen."),
        tt("At the end of each week, look back for ten minutes: what took longer than planned, and why? Next week's plan is better when it is based on what really happened.", "Schauen Sie am Ende jeder Woche zehn Minuten zurück: Was dauerte länger als geplant, und warum? Der Plan der nächsten Woche wird besser, wenn er auf dem beruht, was wirklich geschah."),
      ].map((x) => `${x} ${x}`),
    },
    {
      title: tt("Writing clear emails", "Klare E-Mails schreiben"),
      blurb: tt("Get an answer with the first message.", "Mit der ersten Nachricht eine Antwort bekommen."),
      paras: [
        tt("A clear email starts with what you need and by when, in the first two lines. Background comes after that, for those who want it. A reader who stops after two lines should still know what to do.", "Eine klare E-Mail beginnt in den ersten zwei Zeilen mit dem, was Sie brauchen und bis wann. Der Hintergrund folgt danach, für die, die ihn wollen. Wer nach zwei Zeilen aufhört zu lesen, sollte trotzdem wissen, was zu tun ist."),
        tt("One email, one request. If you have three questions, number them. If you attach a document, say in a sentence what the reader should look at and what you want from them.", "Eine E-Mail, eine Bitte. Wenn Sie drei Fragen haben, nummerieren Sie sie. Wenn Sie ein Dokument anhängen, sagen Sie in einem Satz, worauf die Leserin schauen soll und was Sie von ihr wollen."),
        tt("Before you press send, read the subject line as if it were all the reader sees. If it does not say what the email is about, change it.", "Lesen Sie vor dem Absenden die Betreffzeile, als wäre sie alles, was der Leser sieht. Wenn sie nicht sagt, worum es geht, ändern Sie sie."),
      ].map((x) => `${x} ${x}`),
    },
  ];
};

export function LongPageSim() {
  const courses = LP_COURSES();
  const filler = FILLER();
  const [open, setOpen] = useState<number | null>(0);
  if (open === null)
    return (
      <div className="space-y-2 px-4 py-4">
        <h3 className="text-[17px] font-semibold text-[#333]">{tt("Your courses", "Ihre Kurse")}</h3>
        {courses.map((c, i) => (
          <button key={c.title} type="button" onClick={() => setOpen(i)} className="block min-h-[56px] w-full rounded border border-[#CCCCCC] bg-white px-3 py-2 text-left text-[#333]">
            <span className="block text-[15px] font-semibold">{c.title}</span>
            <span className="block text-[13px] text-[#666]">{c.blurb}</span>
          </button>
        ))}
      </div>
    );
  const c = courses[open];
  return (
    <div className="px-4 py-4 text-[#333]">
      <h3 className="mb-3 text-[17px] font-semibold">{c.title}</h3>
      {c.paras.map((para, i) => (
        <div key={i}>
          <p className="mb-3 text-[15px] leading-[1.8]">{para}</p>
          <p className="mb-3 text-[15px] leading-[1.8]">{filler[0]}</p>
          <p className="mb-3 text-[15px] leading-[1.8]">{filler[1]}</p>
        </div>
      ))}
      <button type="button" onClick={() => setOpen(null)} className="mt-2 min-h-[40px] rounded border border-[#BBBBBB] bg-[#F6F6F6] px-4 text-[14px] text-[#333]">{tt("Back to course list", "Zurück zur Kursliste")}</button>
    </div>
  );
}

/* ------------------------------------------------------------------ Block 1.2 · option A: a clickable prototype that looks finished */

export function HifiPrototypeSim() {
  const units = UNITS();
  type Screen = { kind: "start" } | { kind: "lesson"; i: number } | { kind: "quiz"; i: number } | { kind: "result"; i: number };
  const [screen, setScreen] = useState<Screen>({ kind: "start" });
  const [picked, setPicked] = useState<Record<string, number>>({});
  const frame = (children: React.ReactNode) => (
    <div>
      <p className="bg-[#2B2340] px-4 py-1 text-[12px] text-white">{tt("Prototype · made in a design tool · every screen is linked · answers are not checked and nothing is saved", "Prototyp · in einem Design-Werkzeug erstellt · jeder Bildschirm ist verknüpft · Antworten werden nicht geprüft und nichts wird gespeichert")}</p>
      <div className="bg-gradient-to-r from-[#4C2FBF] to-[#7A4DE8] px-4 py-3 text-white">
        <span className="font-serif text-[16px] font-bold">{tt("Project basics", "Projektgrundlagen")}</span>
      </div>
      {children}
    </div>
  );
  if (screen.kind === "start")
    return frame(
      <div className="space-y-2 px-4 py-4">
        {units.map((u, i) => (
          <button key={i} type="button" onClick={() => setScreen({ kind: "lesson", i })} className="flex min-h-[48px] w-full items-center gap-3 rounded-2xl border border-[#E6DCCB] bg-white px-3 text-left shadow-sm">
            <span className="h-7 w-7 rounded-full bg-[#7A4DE8]" aria-hidden />
            <span className="flex-1 text-[14px] font-bold text-[#2B2340]">{u.title}</span>
            <span className="rounded-full bg-[#EFE8FB] px-2 text-[12px] text-[#4C2FBF]">{tt("6 min", "6 Min.")}</span>
          </button>
        ))}
        <button type="button" onClick={() => setScreen({ kind: "lesson", i: 0 })} className={btnWarm}>{tt("Start ›", "Starten ›")}</button>
      </div>,
    );
  const u = units[screen.i];
  if (screen.kind === "lesson")
    return frame(
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[18px] font-bold text-[#2B2340]">{u.title}</h3>
        <p className="max-w-prose text-[15px] leading-relaxed">{u.text}</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setScreen({ kind: "quiz", i: screen.i })} className={btnWarm}>{tt("Check yourself ›", "Selbst prüfen ›")}</button>
          <button type="button" onClick={() => setScreen({ kind: "start" })} className="min-h-[40px] rounded-full border border-[#C9B8F5] px-4 text-[14px] text-[#4C2FBF]">{tt("Back", "Zurück")}</button>
        </div>
      </div>,
    );
  if (screen.kind === "quiz")
    return frame(
      <div className="space-y-3 px-4 py-4">
        {u.q.map((q, k) => (
          <fieldset key={k} className="space-y-1.5">
            <legend className="text-[14px] font-semibold">{`${k + 1}. ${q.ask}`}</legend>
            {q.options.map((o, j) => (
              <label key={j} className={clsx("flex min-h-[40px] cursor-pointer items-center gap-2 rounded-lg border px-3 text-[14px]", picked[`${screen.i}-${k}`] === j ? "border-[#4C2FBF] bg-[#F4F1FD]" : "border-[#E3DFF0]")}>
                <input type="radio" name={`hq${screen.i}-${k}`} checked={picked[`${screen.i}-${k}`] === j} onChange={() => setPicked((a) => ({ ...a, [`${screen.i}-${k}`]: j }))} />
                {o}
              </label>
            ))}
          </fieldset>
        ))}
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setScreen({ kind: "result", i: screen.i })} className={btnPrimary}>{tt("Submit", "Absenden")}</button>
          <button type="button" onClick={() => setScreen({ kind: "lesson", i: screen.i })} className="min-h-[40px] rounded-full border border-[#C9B8F5] px-4 text-[14px] text-[#4C2FBF]">{tt("Back", "Zurück")}</button>
        </div>
      </div>,
    );
  return frame(
    <div className="space-y-3 px-4 py-4" aria-live="polite">
      <p className="rounded-lg bg-[#EFE8FB] px-3 py-2 text-[14px]">
        <span className="font-bold">{tt("1 of 2 correct.", "1 von 2 richtig.")}</span> {tt("Review question 2.", "Frage 2 wiederholen.")}
      </p>
      <button type="button" onClick={() => setScreen({ kind: "start" })} className={btnWarm}>{tt("Back to the course ›", "Zurück zum Kurs ›")}</button>
    </div>,
  );
}

/* ------------------------------------------------------------------ Block 1.2 · option B: a paper prototype, paged by a person */

export function PaperPrototypeSim() {
  const units = UNITS();
  const [sheet, setSheet] = useState(0);
  const hand = { fontFamily: "'Segoe Print','Bradley Hand','Comic Sans MS','Chalkboard SE',cursive" };
  const sheets = [
    <div key="s0" className="space-y-2">
      <p className="text-[16px]" style={hand}>{tt("Project basics", "Projektgrundlagen")}</p>
      {units.slice(0, 3).map((u, i) => (
        <p key={i} className="border-2 border-[#3A3A3A] px-2 py-1 text-[14px]" style={hand}>{`${i + 1}. ${u.title}`}</p>
      ))}
      <p className="inline-block border-2 border-[#3A3A3A] px-3 py-1 text-[14px]" style={hand}>{tt("START →", "STARTEN →")}</p>
    </div>,
    <div key="s1" className="space-y-2">
      <p className="text-[16px]" style={hand}>{units[0].title}</p>
      <p className="text-[13px] text-[#555]" style={hand}>{tt("(text of the lesson goes here, about 6 min)", "(hier steht der Text der Lektion, ca. 6 Min.)")}</p>
      <p className="inline-block border-2 border-[#3A3A3A] px-3 py-1 text-[14px]" style={hand}>{tt("CHECK YOURSELF →", "SELBST PRÜFEN →")}</p>
    </div>,
    <div key="s2" className="space-y-2">
      <p className="text-[16px]" style={hand}>{tt("Quiz", "Quiz")}</p>
      <p className="text-[14px]" style={hand}>{`1. ${units[0].q[0].ask}`}</p>
      <p className="text-[14px]" style={hand}>○ ○ ○</p>
      <p className="text-[14px]" style={hand}>{tt("Result: __ of 2", "Ergebnis: __ von 2")}</p>
    </div>,
  ];
  return (
    <div className="space-y-3 bg-[#EDE7D9] px-4 py-4">
      <p className="rounded-md bg-[#F6E58D] px-3 py-1.5 text-[13px] text-[#3A3A35]">{tt("A person plays the computer: when you point at something, they put the next sheet in front of you. A line can be crossed out and redrawn in a minute.", "Eine Person spielt den Computer: Wenn Sie auf etwas zeigen, legt sie Ihnen das nächste Blatt hin. Eine Linie ist in einer Minute durchgestrichen und neu gezeichnet.")}</p>
      <div className="min-h-[220px] rotate-[-0.6deg] border border-[#BDB59A] bg-[#FBF8EE] p-4 shadow-sm">{sheets[sheet]}</div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => setSheet((s) => Math.max(0, s - 1))} className="min-h-[40px] rounded border border-[#8A8A8A] bg-white px-3 text-[14px]">← {tt("Previous sheet", "Vorheriges Blatt")}</button>
        <button type="button" onClick={() => setSheet((s) => Math.min(sheets.length - 1, s + 1))} className="min-h-[40px] rounded border border-[#8A8A8A] bg-white px-3 text-[14px]">{tt("Point at the button: next sheet", "Auf den Button zeigen: nächstes Blatt")} →</button>
        <span className="text-[13px] text-[#555]">{tt(`Sheet ${sheet + 1} of ${sheets.length}`, `Blatt ${sheet + 1} von ${sheets.length}`)}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Route 2 · the Chief Product Officer's desk */

export function CpoDeskSim() {
  return (
    <DeskSim
      mailbox={tt("Inbox · Chief Product Officer · LearnPro", "Posteingang · Chief Product Officer · LearnPro")}
      messages={[
        {
          from: tt("Management", "Geschäftsführung"),
          subject: tt("We need a future strategy for the platform", "Wir brauchen eine Zukunftsstrategie für die Plattform"),
          body: [
            tt("Our competitors now use AI and adaptive systems, and our own platform is outdated. The budget is limited, and our data situation is incomplete.", "Unsere Wettbewerber nutzen inzwischen KI und adaptive Systeme, und unsere eigene Plattform ist veraltet. Das Budget ist begrenzt, und unsere Datenlage ist unvollständig."),
            tt("Please develop a future strategy for the learning platform: do we invest in adaptive learning, how do we test new features, which data do we need, a prioritised innovation roadmap, and the risks of technology against user value. We know you will have to decide some things before we have all the data.", "Bitte entwickeln Sie eine Zukunftsstrategie für die Lernplattform: Investieren wir in adaptives Lernen, wie testen wir neue Funktionen, welche Daten brauchen wir, eine priorisierte Innovations-Roadmap und die Risiken von Technologie gegen Nutzerwert. Uns ist klar, dass Sie manches entscheiden müssen, bevor alle Daten da sind."),
          ],
        },
        {
          from: tt("Industry news", "Branchennachrichten"),
          subject: tt("Competitors launch AI tutors and adaptive paths", "Wettbewerber starten KI-Tutoren und adaptive Pfade"),
          body: [tt("A short item from this morning's industry digest. The full article is attached.", "Ein kurzer Beitrag aus dem Branchen-Digest von heute Morgen. Der ganze Artikel ist angehängt.")],
          attachments: [
            {
              name: "ai-tutor-article.html",
              kind: "page",
              node: (
                <div className="space-y-3 bg-white px-5 py-4 text-[#222]">
                  <p className="text-[12px] text-[#666]">{tt("Industry news · two competitors", "Branchennachrichten · zwei Wettbewerber")}</p>
                  <h3 className="font-serif text-[20px] font-bold">{tt("“An AI tutor for every learner”", "„Ein KI-Tutor für jede Lernende“")}</h3>
                  <p className="text-[15px] leading-relaxed">{tt("Two learning platforms in the market announce an AI tutor that answers questions, and learning paths that adapt to what each learner already knows. Both say their learners finish more courses; neither publishes how this was measured.", "Zwei Lernplattformen am Markt kündigen einen KI-Tutor an, der Fragen beantwortet, und Lernpfade, die sich an das Vorwissen jeder Lernenden anpassen. Beide sagen, ihre Lernenden schließen mehr Kurse ab; keine veröffentlicht, wie das gemessen wurde.")}</p>
                </div>
              ),
            },
          ],
        },
        {
          from: tt("Data team", "Datenteam"),
          subject: tt("What our platform records today", "Was unsere Plattform heute erfasst"),
          body: [tt("This is what the platform records today. The sheet is attached.", "Das erfasst die Plattform heute. Die Tabelle ist angehängt.")],
          attachments: [
            {
              name: "platform-records.xlsx",
              kind: "sheet",
              node: (
                <Sheet
                  title={tt("What the platform records today (Case assumption)", "Was die Plattform heute erfasst (Fallannahme)")}
                  head={[tt("Data", "Daten"), tt("Today", "Heute")]}
                  rows={[
                    [tt("At which lesson learners stop", "Bei welcher Lektion Lernende aufhören"), tt("recorded", "erfasst")],
                    [tt("How long a lesson takes", "Wie lange eine Lektion dauert"), tt("not recorded", "nicht erfasst")],
                    [tt("Why learners leave", "Warum Lernende gehen"), tt("not recorded", "nicht erfasst")],
                    [tt("What a learner already knows", "Was eine Lernende schon weiß"), tt("not recorded", "nicht erfasst")],
                    [tt("Versions of each lesson to adapt to", "Fassungen jeder Lektion zum Anpassen"), tt("one version only", "nur eine Fassung")],
                  ]}
                />
              ),
            },
          ],
        },
        {
          from: tt("Our platform", "Unsere Plattform"),
          subject: tt("LearnPro today, as a learner sees it", "LearnPro heute, wie eine Lernende es sieht"),
          body: [tt("A link to the live course, as a learner opens it today.", "Ein Link zum Live-Kurs, so wie eine Lernende ihn heute öffnet.")],
          attachments: [{ name: "learnpro.example/course", kind: "link", node: <LongPageSim /> }],
        },
      ]}
    />
  );
}
