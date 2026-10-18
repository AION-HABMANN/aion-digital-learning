"use client";

import { useState } from "react";
import clsx from "clsx";
import { tt } from "@/lib/lang";

/**
 * Day 10 · the working simulations of CLAUDE.md #60. TrackLearn as the plan describes it (no progress bar, no response to completed tasks, an unclear learning status),
 * the same platform on a phone (the case study: high mobile use, poor UX), and the three options of Block 1.2 as three experiences of the same course. They add no hint and
 * no verdict and print no figure the plan does not print. Own colours only (never the site's blue, teal and rust); the content is made up and nothing here is marked right or wrong.
 */
const INK = "text-[#26323F]";

const LESSONS = () => [
  tt("Welcome", "Willkommen"),
  tt("The first offer", "Das erste Angebot"),
  tt("Preparing your limit", "Ihre Grenze vorbereiten"),
  tt("Giving in return", "Etwas dafür geben"),
  tt("Handling a no", "Mit einem Nein umgehen"),
  tt("Closing a deal", "Einen Abschluss erzielen"),
  tt("After the deal", "Nach dem Abschluss"),
  tt("Putting it together", "Alles zusammenführen"),
];

/** The course as the plan describes it: eight lessons that look alike, a task that answers with nothing, and no sign of progress. */
function CourseBody({ phone }: { phone?: boolean }) {
  const lessons = LESSONS();
  const [cur, setCur] = useState<number | null>(null);
  return (
    <div className={clsx("space-y-2 p-3", phone && "min-w-[420px]")}>
      <p className="text-[15px] font-semibold">{tt("Negotiation basics", "Verhandlungsgrundlagen")}</p>
      {cur === null ? (
        <ul className="space-y-1">
          {lessons.map((l, i) => (
            <li key={l}>
              <button type="button" onClick={() => setCur(i)} className={clsx("w-full rounded border border-[#C9D0DA] bg-white px-2 text-left text-[13px]", phone ? "min-h-[22px] text-[11px]" : "min-h-[36px]")}>
                {l}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="space-y-2">
          <p className="text-[14px] font-semibold">{lessons[cur]}</p>
          <p className={clsx("text-[13px]", phone && "whitespace-nowrap text-[12px]")}>{tt("In a negotiation, the first number you hear tends to pull the rest toward it. Prepare your limit before you start.", "In einer Verhandlung zieht die erste Zahl, die Sie hören, den Rest zu sich hin. Bereiten Sie Ihre Grenze vor, bevor Sie beginnen.")}</p>
          <div className="rounded border border-[#C9D0DA] bg-[#F3F6FA] p-2">
            <p className="text-[13px]">{tt("Task: write your limit for the example offer.", "Aufgabe: Schreiben Sie Ihre Grenze für das Beispielangebot.")}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <input aria-label={tt("Your limit", "Ihre Grenze")} className="min-h-[34px] w-32 rounded border border-[#C9D0DA] px-2 text-[13px]" />
              <button type="button" className={clsx("rounded border border-[#8A93A0] bg-white px-2 text-[13px]", phone ? "min-h-[22px] text-[11px]" : "min-h-[34px]")}>{tt("Finish task", "Aufgabe beenden")}</button>
            </div>
          </div>
          <button type="button" onClick={() => setCur(null)} className="min-h-[32px] rounded border border-[#C9D0DA] px-2 text-[13px]">{tt("Back to the lessons", "Zurück zu den Lektionen")}</button>
        </div>
      )}
    </div>
  );
}

/** TrackLearn as one of its learners meets it, on a desktop (Block 1.1) or on a phone-width screen (the case study). */
export function TrackLearnSim({ phone }: { phone?: boolean }) {
  return (
    <div className={INK}>
      <div className="flex items-center justify-between bg-[#3F4A58] px-3 py-2 text-white">
        <span className="font-serif text-[15px] font-bold">TrackLearn</span>
        <span className="text-[12px] opacity-80">{phone ? tt("On a phone", "Auf dem Handy") : tt("Learning platform", "Lernplattform")}</span>
      </div>
      {phone ? (
        <div className="mx-auto max-w-[320px] overflow-x-auto border-x border-[#C9D0DA] bg-[#F7F8FA]">
          <CourseBody phone />
        </div>
      ) : (
        <div className="bg-[#F7F8FA]">
          <CourseBody />
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ the three options of Block 1.2 */

function TaskBox({ onDone, label }: { onDone: () => void; label: string }) {
  return (
    <div className="rounded border border-[#C9D0DA] bg-[#F3F6FA] p-2">
      <p className="text-[13px]">{tt("Task: write your limit for the example offer.", "Aufgabe: Schreiben Sie Ihre Grenze für das Beispielangebot.")}</p>
      <button type="button" onClick={onDone} className="mt-1 min-h-[34px] rounded border border-[#8A93A0] bg-white px-2 text-[13px]">{label}</button>
    </div>
  );
}

function WithProgress() {
  const lessons = LESSONS();
  const [done, setDone] = useState(3);
  return (
    <div className="space-y-2 px-3 py-3">
      <p className="text-[15px] font-semibold">{tt("Negotiation basics", "Verhandlungsgrundlagen")}</p>
      <p className="text-[13px]">{tt(`${done} of ${lessons.length} lessons done`, `${done} von ${lessons.length} Lektionen erledigt`)}</p>
      <div aria-hidden className="h-2 overflow-hidden rounded bg-[#E4E8EE]"><div className="h-2 bg-[#3F4A58]" style={{ width: `${(done / lessons.length) * 100}%` }} /></div>
      <ul className="space-y-1">
        {lessons.slice(0, 5).map((l, i) => (
          <li key={l} className="flex min-h-[32px] items-center justify-between rounded border border-[#C9D0DA] bg-white px-2 text-[13px]">
            <span>{l}</span>
            <span className="text-[12px] text-[#5F5E5A]">{i < done ? tt("done", "erledigt") : tt("open", "offen")}</span>
          </li>
        ))}
      </ul>
      <TaskBox label={tt("Finish task", "Aufgabe beenden")} onDone={() => setDone((d) => Math.min(lessons.length, d + 1))} />
    </div>
  );
}

function MobileOptimised() {
  return (
    <div className="px-3 py-3">
      <div className="mx-auto max-w-[300px] space-y-2 rounded-xl border-2 border-[#3F4A58] bg-white p-3">
        <p className="text-[15px] font-semibold">{tt("Negotiation basics", "Verhandlungsgrundlagen")}</p>
        <button type="button" className="min-h-[48px] w-full rounded bg-[#3F4A58] px-3 text-[15px] font-semibold text-white">{tt("Continue: lesson 4", "Weiter: Lektion 4")}</button>
        <p className="text-[14px] leading-relaxed">{tt("The first number you hear tends to pull the rest toward it. Prepare your limit before you start.", "Die erste Zahl, die Sie hören, zieht den Rest zu sich hin. Bereiten Sie Ihre Grenze vor, bevor Sie beginnen.")}</p>
        <button type="button" className="min-h-[44px] w-full rounded border border-[#8A93A0] text-[14px]">{tt("Finish task", "Aufgabe beenden")}</button>
      </div>
    </div>
  );
}

function DetailedFeedback() {
  const [n, setN] = useState(0);
  return (
    <div className="space-y-2 px-3 py-3">
      <p className="text-[15px] font-semibold">{tt("Negotiation basics", "Verhandlungsgrundlagen")}</p>
      <TaskBox label={tt("Finish task", "Aufgabe beenden")} onDone={() => setN((x) => x + 1)} />
      {n > 0 && (
        <div className="space-y-1">
          {[
            tt("Task saved. Well done for finishing.", "Aufgabe gespeichert. Gut gemacht, dass Sie fertig sind."),
            tt("Your limit is lower than the usual range for this kind of offer.", "Ihre Grenze liegt unter dem üblichen Bereich für diese Art Angebot."),
            tt("Tip: name your own number first.", "Tipp: Nennen Sie Ihre Zahl zuerst."),
            tt("Badge earned: First task.", "Abzeichen erhalten: Erste Aufgabe."),
            tt("You have finished 1 task today.", "Sie haben heute 1 Aufgabe beendet."),
          ].map((m) => (
            <p key={m} className="rounded border border-[#C9D0DA] bg-[#FFFBEA] px-2 py-1 text-[12px]">{m}</p>
          ))}
        </div>
      )}
    </div>
  );
}

/** The same course under each of the three options of Block 1.2. */
export function OptionSim({ option }: { option: "A" | "B" | "C" }) {
  return (
    <div className={INK}>
      <div className="flex items-center justify-between bg-[#3F4A58] px-3 py-2 text-white">
        <span className="font-serif text-[15px] font-bold">TrackLearn</span>
        <span className="text-[12px] opacity-80">{tt("A course", "Ein Kurs")}</span>
      </div>
      {option === "A" ? <WithProgress /> : option === "B" ? <MobileOptimised /> : <DetailedFeedback />}
    </div>
  );
}
