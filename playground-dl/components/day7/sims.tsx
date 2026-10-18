"use client";

import { useState } from "react";
import clsx from "clsx";
import { tt } from "@/lib/lang";

/**
 * Day 7 · the working simulations of CLAUDE.md #60. InclusiveLearn as the plan describes it (a small font, complicated language, many steps to operate), and the
 * three options of Block 1.2 as three experiences of the same lesson. They add no hint and no verdict and print no figure the plan does not print. Own colours
 * only (never the site's blue, teal and rust); the content is made up and nothing here is marked right or wrong.
 */
const INK = "text-[#26323F]";
const BAR = "bg-[#3F4A58]";

const LONG = () => tt(
  "Notwithstanding the foregoing provisions of the present agreement, the participant hereby acknowledges that the aforementioned terms shall apply mutatis mutandis to all successive enrolments, insofar as permitted by applicable regulations, unless expressly waived in writing.",
  "Ungeachtet der vorstehenden Bestimmungen der vorliegenden Vereinbarung erkennt die Teilnehmerin hiermit an, dass die vorgenannten Bedingungen sinngemäß für alle nachfolgenden Anmeldungen gelten, soweit nach den anwendbaren Vorschriften zulässig, sofern nicht ausdrücklich schriftlich darauf verzichtet wird.",
);
const LESSON = () => tt(
  "Negotiation begins long before the first offer. The parties establish their interests, their alternatives and the range within which an agreement is conceivable. A well-prepared party enters the conversation with a clear target, a limit it will not cross and an understanding of what the other side may need.",
  "Verhandlungen beginnen lange vor dem ersten Angebot. Die Parteien klären ihre Interessen, ihre Alternativen und den Bereich, in dem eine Einigung denkbar ist. Eine gut vorbereitete Partei geht mit einem klaren Ziel, einer Grenze, die sie nicht überschreitet, und einem Verständnis dafür ins Gespräch, was die andere Seite brauchen könnte.",
);

function Bar({ page }: { page: string }) {
  return (
    <div className={clsx("flex items-center justify-between px-4 py-2.5 text-white", BAR)}>
      <span className="font-serif text-[15px] font-bold">InclusiveLearn</span>
      <span className="text-[12px] opacity-80">{page}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ InclusiveLearn as the plan describes it */

const STEPS = 10;

function SignUp() {
  const [step, setStep] = useState(1);
  if (step > STEPS)
    return (
      <div className="space-y-2 px-4 py-4">
        <p style={{ fontSize: 11 }}>{tt("You are signed up.", "Sie sind angemeldet.")}</p>
        <button type="button" onClick={() => setStep(1)} style={{ fontSize: 11 }} className="underline">{tt("Start again", "Neu beginnen")}</button>
      </div>
    );
  return (
    <div className="space-y-3 px-4 py-4">
      <p style={{ fontSize: 11 }} className="font-semibold">{tt(`Sign-up · step ${step}`, `Anmeldung · Schritt ${step}`)}</p>
      <p style={{ fontSize: 11, lineHeight: 1.5 }}>{LONG()}</p>
      <label className="block" style={{ fontSize: 11 }}>
        {tt("Reference", "Referenz")}
        <input type="text" className="mt-0.5 block h-[22px] w-full max-w-[220px] rounded border border-[#B0B7C2] px-1" style={{ fontSize: 11 }} />
      </label>
      <div className="flex gap-2">
        <button type="button" onClick={() => setStep((s) => Math.max(1, s - 1))} style={{ fontSize: 10 }} className="h-[20px] rounded border border-[#8A93A0] px-1.5">{tt("Back", "Zurück")}</button>
        <button type="button" onClick={() => setStep((s) => s + 1)} style={{ fontSize: 10 }} className="h-[20px] rounded bg-[#3F4A58] px-1.5 text-white">{tt("Next", "Weiter")}</button>
      </div>
    </div>
  );
}

function CoursePage() {
  return (
    <div className="space-y-2 px-4 py-4">
      <h3 style={{ fontSize: 13 }} className="font-semibold">{tt("Negotiation basics", "Verhandlungsgrundlagen")}</h3>
      <p style={{ fontSize: 11, lineHeight: 1.45 }}>{LESSON()}</p>
      <p style={{ fontSize: 11, lineHeight: 1.45 }}>{LONG()}</p>
      <ul style={{ fontSize: 11 }} className="space-y-0.5">
        {[tt("Lesson 1", "Lektion 1"), tt("Lesson 2", "Lektion 2"), tt("Lesson 3", "Lektion 3")].map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  );
}

/** InclusiveLearn as one of its learners meets it: a course page and the sign-up (Blocks 1.1 and 2.1). */
export function InclusiveLearnSim() {
  const [tab, setTab] = useState<"course" | "signup">("course");
  return (
    <div className={INK}>
      <Bar page={tab === "course" ? tt("Course", "Kurs") : tt("Sign-up", "Anmeldung")} />
      <div className="flex gap-1 border-b border-[#D6DAE1] px-3 py-2" role="group" aria-label={tt("Page", "Seite")}>
        {(["course", "signup"] as const).map((k) => (
          <button key={k} type="button" aria-pressed={tab === k} onClick={() => setTab(k)} className={clsx("min-h-[36px] rounded px-3 text-[13px]", tab === k ? "bg-[#3F4A58] text-white" : "bg-[#EEF0F3] hover:bg-[#E3E6EB]")}>
            {k === "course" ? tt("Course page", "Kursseite") : tt("Sign-up", "Anmeldung")}
          </button>
        ))}
      </div>
      {tab === "course" ? <CoursePage /> : <SignUp />}
    </div>
  );
}

/* ------------------------------------------------------------------ the three options of Block 1.2 */

/** The lesson in three parts, so Back and Next lead somewhere (the same words under every option; the plain version is in PLAIN_PARTS). */
const PARTS = () => [
  LESSON(),
  tt("Second, name your goal and your limit. The goal is what you hope for, the limit is the point beyond which you would rather walk away. Write both down before the talk starts.", "Zweitens: Nennen Sie Ihr Ziel und Ihre Grenze. Das Ziel ist, was Sie hoffen, die Grenze ist der Punkt, ab dem Sie lieber gehen. Schreiben Sie beides auf, bevor das Gespräch beginnt."),
  tt("Third, think about the other side. What might they need, and what could you give that costs you little? A good offer often starts there.", "Drittens: Denken Sie an die andere Seite. Was könnte sie brauchen, und was könnten Sie geben, das Sie wenig kostet? Ein gutes Angebot beginnt oft dort."),
];

function OptionA() {
  const [part, setPart] = useState(0);
  const [battle, setBattle] = useState(false);
  const parts = PARTS();
  return (
    <div className="space-y-3 px-4 py-4">
      <div className="rounded-lg border border-[#D6DAE1] bg-[#F4F6F8] p-3">
        <p className="text-[13px] font-semibold">{tt("New · Quiz battle", "Neu · Quiz-Battle")}</p>
        <p className="text-[12px]">{tt("Challenge a colleague to a five-question duel on this lesson.", "Fordern Sie eine Kollegin zu einem Fünf-Fragen-Duell zu dieser Lektion heraus.")}</p>
        <button type="button" onClick={() => setBattle(true)} className="mt-1 min-h-[34px] rounded bg-[#3F4A58] px-3 text-[12px] text-white">{tt("Start a battle", "Battle starten")}</button>
        {battle && <p role="status" className="mt-1 text-[12px]">{tt("Challenge sent to a colleague. You will see the result when they have played.", "Herausforderung an eine Kollegin gesendet. Sie sehen das Ergebnis, sobald sie gespielt hat.")}</p>}
      </div>
      <h3 style={{ fontSize: 13 }} className="font-semibold">{tt("Negotiation basics", "Verhandlungsgrundlagen")}</h3>
      <p style={{ fontSize: 11, lineHeight: 1.45 }}>{parts[part]}</p>
      <div className="flex gap-2">
        <button type="button" onClick={() => setPart((x) => Math.max(0, x - 1))} style={{ fontSize: 10 }} className="h-[20px] rounded border border-[#8A93A0] px-1.5">{tt("Back", "Zurück")}</button>
        <button type="button" onClick={() => setPart((x) => Math.min(parts.length - 1, x + 1))} style={{ fontSize: 10 }} className="h-[20px] rounded bg-[#3F4A58] px-1.5 text-white">{tt("Next", "Weiter")}</button>
      </div>
    </div>
  );
}

function OptionB() {
  const [part, setPart] = useState(0);
  const parts = PARTS();
  return (
    <div className="space-y-3 px-4 py-4">
      <nav className="flex gap-3 border-b border-[#D6DAE1] pb-2 text-[12px]" aria-label={tt("Lesson navigation", "Lektionsnavigation")}>
        <span className="font-semibold">{tt("Course", "Kurs")}</span>
        <span>{tt("Lessons", "Lektionen")}</span>
        <span>{tt("Quiz", "Quiz")}</span>
      </nav>
      <h3 style={{ fontSize: 13 }} className="font-semibold">{tt("Negotiation basics", "Verhandlungsgrundlagen")}</h3>
      <p style={{ fontSize: 11, lineHeight: 1.6 }}>{parts[part]}</p>
      <div className="flex gap-2">
        <button type="button" onClick={() => setPart((x) => Math.max(0, x - 1))} style={{ fontSize: 11 }} className="h-[24px] rounded border border-[#8A93A0] px-2">{tt("Back", "Zurück")}</button>
        <button type="button" onClick={() => setPart((x) => Math.min(parts.length - 1, x + 1))} style={{ fontSize: 11 }} className="h-[24px] rounded bg-[#3F4A58] px-2 text-white">{tt("Next", "Weiter")}</button>
      </div>
    </div>
  );
}

const PLAIN = () => tt(
  "A negotiation starts before the first offer. First, each side thinks about what it wants, what it can do instead, and where an agreement is possible. Then it chooses a goal and a limit. It also asks: what might the other side need?",
  "Eine Verhandlung beginnt vor dem ersten Angebot. Zuerst überlegt jede Seite, was sie will, was sie stattdessen tun kann und wo eine Einigung möglich ist. Dann wählt sie ein Ziel und eine Grenze. Sie fragt auch: Was könnte die andere Seite brauchen?",
);

const PLAIN_PARTS = () => [
  PLAIN(),
  tt("Next, choose a goal and a limit. The goal is what you hope for. The limit is the point where you would rather walk away. Write both down before the talk.", "Als Nächstes wählen Sie ein Ziel und eine Grenze. Das Ziel ist, was Sie hoffen. Die Grenze ist der Punkt, an dem Sie lieber gehen. Schreiben Sie beides vor dem Gespräch auf."),
  tt("Last, think about the other side. What might they need? What can you give that costs you little? A good offer often starts there.", "Zuletzt denken Sie an die andere Seite. Was könnte sie brauchen? Was können Sie geben, das Sie wenig kostet? Ein gutes Angebot beginnt oft dort."),
];

function OptionC() {
  const [captions, setCaptions] = useState(true);
  const [part, setPart] = useState(0);
  const plain = PLAIN_PARTS();
  return (
    <div className="space-y-3 px-4 py-4">
      <h3 className="text-[18px] font-semibold">{tt("Negotiation basics", "Verhandlungsgrundlagen")}</h3>
      <p className="text-[16px] leading-[1.6]">{plain[part]}</p>
      <div className="rounded-lg bg-[#2E3640] p-3 text-white">
        <p className="text-[12px] opacity-80">{tt("Video · Preparing a negotiation", "Video · Eine Verhandlung vorbereiten")}</p>
        {captions && <p className="mt-2 rounded bg-black/60 px-2 py-1 text-[15px]">{tt("“First, think about what you want.”", "„Überlegen Sie zuerst, was Sie wollen.“")}</p>}
        <button type="button" aria-pressed={captions} onClick={() => setCaptions((c) => !c)} className="mt-2 min-h-[40px] rounded border border-white/60 px-3 text-[14px]">
          {captions ? tt("Captions on", "Untertitel an") : tt("Captions off", "Untertitel aus")}
        </button>
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={() => setPart((x) => Math.max(0, x - 1))} className="min-h-[44px] rounded border border-[#8A93A0] px-4 text-[15px]">{tt("Back", "Zurück")}</button>
        <button type="button" onClick={() => setPart((x) => Math.min(plain.length - 1, x + 1))} className="min-h-[44px] rounded bg-[#3F4A58] px-4 text-[15px] text-white">{tt("Next", "Weiter")}</button>
      </div>
      <p className="text-[14px] text-[#5F5E5A]">{tt("Everything on this page works with the keyboard.", "Alles auf dieser Seite funktioniert mit der Tastatur.")}</p>
    </div>
  );
}

/** The same lesson under each of the three options of Block 1.2. */
export function OptionSim({ option }: { option: "A" | "B" | "C" }) {
  return (
    <div className={INK}>
      <Bar page={tt("Lesson", "Lektion")} />
      {option === "A" ? <OptionA /> : option === "B" ? <OptionB /> : <OptionC />}
    </div>
  );
}
