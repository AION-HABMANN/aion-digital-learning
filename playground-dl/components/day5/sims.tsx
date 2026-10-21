"use client";

import { useState } from "react";
import clsx from "clsx";
import { tt } from "@/lib/lang";
import { LESSON_TEXTS } from "@/components/sim/lessonText";

/**
 * Day 5 · the working simulations of CLAUDE.md #60, built one to one from the plan's clues and the numbered facts of the task. LearnBase as it is: many
 * functions on the home screen (22 menu entries named after software modules, 9 widgets, 4 banners), unclear navigation (labels in the software's words, the
 * path “Home > Home”, a button that says “Enrol in module instance”, a course search with 14 filter fields before any result), content hard to find (the same
 * lessons in three lists in different orders, no “Continue where you stopped”). The three options of Block 1.2 as the same home screen after each measure:
 * more content, a simpler navigation, new features. Own colours only; the content is made up and nothing here is marked right or wrong.
 */
const INK = "text-[#26323F]";
const MODULES = ["Content Repository", "Module Manager", "Analytics Suite", "Course Search", "Library", "Catalogue", "My Learning", "Enrolment Hub", "Instance Registry", "Learning Objects", "Assessment Engine", "Credential Store", "Cohort Manager", "Notification Centre", "Resource Pool", "Pathway Builder", "Report Studio", "Integration Console", "User Directory", "Policy Settings", "Audit Log", "Help Centre"];
const WIDGETS = ["Activity", "Announcements", "Calendar", "Messages", "Recommended", "Trending", "Leaderboard", "Tasks", "Shortcuts"];
const LESSONS = ["Contracts: parties", "Contracts: terms", "Negotiation basics", "Writing a counter-offer", "Closing a deal", "Reviewing a contract"];
const btnTile = "min-h-[36px] rounded border border-[#D9D5E2] bg-white px-2 py-1 text-left text-[12px] hover:bg-[#F4F2F7]";

type View = "home" | "course" | "search" | "lists";

function Bar({ crumb }: { crumb: string }) {
  return (
    <div className="bg-[#4A4458] px-4 py-2 text-white">
      <span className="font-serif text-[15px] font-bold">LearnBase</span>
      <span className="ml-3 text-[12px] opacity-80">{crumb}</span>
    </div>
  );
}

/** LearnBase today (Block 1.1 and Block 2.1). */
export function LearnBaseSim({ start = "home" }: { start?: View }) {
  const [view, setView] = useState<View>(start);
  const [note, setNote] = useState("");
  const go = (name: string) => {
    setNote("");
    if (name === "Course Search") setView("search");
    else if (["Library", "Catalogue", "My Learning"].includes(name)) setView("lists");
    else setNote(tt("This simulation includes the home screen, a course page, the course search and the lists.", "Diese Simulation enthält den Startbildschirm, eine Kursseite, die Kurssuche und die Listen."));
  };
  if (view === "course")
    return (
      <div className={INK}>
        <Bar crumb="Home > Home" />
        <div className="space-y-3 px-4 py-4">
          <h3 className="text-[17px] font-semibold">{tt("Negotiation basics", "Verhandlungsgrundlagen")}</h3>
          <p className="text-[14px]">{tt("A course on negotiation.", "Ein Kurs über Verhandeln.")}</p>
          <button type="button" onClick={() => setView("home")} className="min-h-[40px] rounded bg-[#4A4458] px-4 text-[14px] font-semibold text-white">Enrol in module instance</button>
          <p><button type="button" onClick={() => setView("home")} className="text-[13px] underline">← {tt("Back to Home", "Zurück zum Start")}</button></p>
        </div>
      </div>
    );
  if (view === "search")
    return (
      <div className={INK}>
        <Bar crumb="Home > Home" />
        <div className="space-y-3 px-4 py-4">
          <h3 className="text-[17px] font-semibold">{tt("Course search", "Kurssuche")}</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {Array.from({ length: 14 }, (_, i) => (
              <label key={i} className="block text-[12px]">
                {tt(`Filter ${i + 1}`, `Filter ${i + 1}`)}
                <input type="text" className="mt-0.5 block min-h-[32px] w-full rounded border border-[#B9B4C4] px-2 text-[13px]" />
              </label>
            ))}
          </div>
          <button type="button" onClick={() => setView("course")} className="min-h-[40px] rounded border border-[#B9B4C4] bg-[#F4F2F7] px-4 text-[14px]">{tt("Search", "Suchen")}</button>
          <p><button type="button" onClick={() => setView("home")} className="text-[13px] underline">← {tt("Back to Home", "Zurück zum Start")}</button></p>
        </div>
      </div>
    );
  if (view === "lists") {
    const orders = [[0, 1, 2, 3, 4, 5], [3, 5, 0, 2, 1, 4], [5, 4, 3, 2, 1, 0]];
    const names = ["Library", "Catalogue", "My Learning"];
    return (
      <div className={INK}>
        <Bar crumb="Home > Home" />
        <div className="grid gap-3 px-4 py-4 sm:grid-cols-3">
          {orders.map((o, k) => (
            <div key={k}>
              <h3 className="mb-1 text-[14px] font-semibold">{names[k]}</h3>
              <ul className="space-y-1">
                {o.map((i) => (
                  <li key={i}>
                    <button type="button" onClick={() => setView("course")} className={btnTile + " w-full"}>{LESSONS[i]}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="sm:col-span-3"><button type="button" onClick={() => setView("home")} className="text-[13px] underline">← {tt("Back to Home", "Zurück zum Start")}</button></p>
        </div>
      </div>
    );
  }
  return (
    <div className={INK}>
      <Bar crumb="Home > Home" />
      <div className="space-y-3 px-3 py-3">
        <div className="grid gap-1 sm:grid-cols-2">
          {["Spring campaign: new modules", "Webinar: Analytics Suite", "Maintenance window", "Survey: tell us what you think"].map((b) => (
            <p key={b} className="rounded bg-[#E8DFC8] px-3 py-1.5 text-[12px] font-semibold">{b}</p>
          ))}
        </div>
        <ul className="flex flex-wrap gap-1" aria-label={tt("Menu", "Menü")}>
          {MODULES.map((m) => (
            <li key={m}>
              <button type="button" onClick={() => go(m)} className="min-h-[32px] rounded bg-[#F4F2F7] px-2 text-[12px] hover:bg-[#E9E6F0]">{m}</button>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-3 gap-1">
          {WIDGETS.map((w) => (
            <div key={w} className="rounded border border-[#D9D5E2] bg-[#FAF9FC] px-2 py-3 text-[12px]">{w}</div>
          ))}
        </div>
        {note && <p role="status" className="text-[13px] text-[#5F5E5A]">{note}</p>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Block 1.2 · the three options as the same working platform */

type OV = { v: "home" } | { v: "course"; i: number } | { v: "lesson"; i: number } | { v: "search" } | { v: "lists" } | { v: "module"; name: string } | { v: "feed" } | { v: "board" } | { v: "coach" } | { v: "mine" } | { v: "progress" } | { v: "help" } | { v: "account" };
const COURSE_TEXT = () => LESSON_TEXTS();

/** The three options of Block 1.2, each as the same working platform after the measure: A more content, B a simpler navigation, C new features. Every entry of every menu opens a real page; courses open, enrol and play lessons. */
export function LearnBaseOptionSim({ option }: { option: "A" | "B" | "C" }) {
  const [view, setView] = useState<OV>({ v: "home" });
  const [enrolled, setEnrolled] = useState<number[]>([]);
  const [seen, setSeen] = useState<number[]>([]);
  const [chat, setChat] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const go = (x: OV) => setView(x);
  const all = option === "A" ? [...LESSONS, ...LESSONS.map((l) => `${l} II`), ...LESSONS.map((l) => `${l} III`)] : LESSONS.slice(0, 4);
  const crumb = tt("Home", "Start");
  const back = <p><button type="button" onClick={() => go({ v: "home" })} className="min-h-[36px] text-[13px] underline">← {tt("Back to Home", "Zurück zum Start")}</button></p>;
  const lessonsOf = COURSE_TEXT();
  const course = (i: number) => {
    const on = enrolled.includes(i);
    return (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{all[i]}</h3>
        <p className="text-[14px]">{tt("A short course in eight lessons, about ten minutes each.", "Ein kurzer Kurs in acht Lektionen, je etwa zehn Minuten.")}</p>
        {on ? (
          <ul className="space-y-1">
            {lessonsOf.slice(0, 4).map((l, k) => (
              <li key={k}><button type="button" onClick={() => { setSeen((s) => (s.includes(i * 10 + k) ? s : [...s, i * 10 + k])); go({ v: "lesson", i: k }); }} className={btnTile + " w-full"}>{k + 1}. {l.title}{seen.includes(i * 10 + k) ? " ✓" : ""}</button></li>
            ))}
          </ul>
        ) : (
          <button type="button" onClick={() => setEnrolled((e) => [...e, i])} className="min-h-[40px] rounded bg-[#4A4458] px-4 text-[14px] font-semibold text-white">{option === "B" ? tt("Start the course", "Kurs beginnen") : "Enrol in module instance"}</button>
        )}
        {back}
      </div>
    );
  };
  let body: React.ReactNode;
  if (view.v === "course") body = course(view.i);
  else if (view.v === "lesson") {
    const l = lessonsOf[view.i];
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{l.title}</h3>
        <p className="text-[14px] leading-relaxed">{l.text}</p>
        <button type="button" onClick={() => go({ v: "home" })} className="text-[13px] underline">← {tt("Back to Home", "Zurück zum Start")}</button>
      </div>
    );
  } else if (view.v === "search") {
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{option === "B" ? tt("Find a course", "Kurs finden") : tt("Course search", "Kurssuche")}</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {(option === "B" ? [tt("Topic", "Thema"), tt("Level", "Niveau")] : Array.from({ length: 14 }, (_, i) => tt(`Filter ${i + 1}`, `Filter ${i + 1}`))).map((f) => (
            <label key={f} className="block text-[12px]">{f}<input type="text" className="mt-0.5 block min-h-[32px] w-full rounded border border-[#B9B4C4] px-2 text-[13px]" /></label>
          ))}
        </div>
        <ul className="space-y-1">{all.slice(0, 4).map((l, i) => (<li key={l}><button type="button" onClick={() => go({ v: "course", i })} className={btnTile + " w-full"}>{l}</button></li>))}</ul>
        {back}
      </div>
    );
  } else if (view.v === "lists") {
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{tt("Courses", "Kurse")}</h3>
        <ul className="grid gap-1 sm:grid-cols-2">{all.map((l, i) => (<li key={l}><button type="button" onClick={() => go({ v: "course", i })} className={btnTile + " w-full"}>{l}</button></li>))}</ul>
        {back}
      </div>
    );
  } else if (view.v === "mine") {
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{tt("My courses", "Meine Kurse")}</h3>
        {enrolled.length === 0 ? <p className="text-[14px]">{tt("You have not started a course yet. Open one from Home.", "Sie haben noch keinen Kurs begonnen. Öffnen Sie einen auf dem Start.")}</p> : <ul className="space-y-1">{enrolled.map((i) => (<li key={i}><button type="button" onClick={() => go({ v: "course", i })} className={btnTile + " w-full"}>{all[i]}</button></li>))}</ul>}
        {back}
      </div>
    );
  } else if (view.v === "progress") {
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{tt("Progress", "Fortschritt")}</h3>
        <p className="text-[14px]">{tt(`Lessons opened: ${seen.length}. Courses started: ${enrolled.length}.`, `Geöffnete Lektionen: ${seen.length}. Begonnene Kurse: ${enrolled.length}.`)}</p>
        {back}
      </div>
    );
  } else if (view.v === "help") {
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{tt("Help", "Hilfe")}</h3>
        <p className="text-[14px]">{tt("To start a course, open it from Home and press the start button. Your lessons then appear on the course page.", "Um einen Kurs zu beginnen, öffnen Sie ihn auf dem Start und drücken Sie die Schaltfläche. Ihre Lektionen erscheinen dann auf der Kursseite.")}</p>
        {back}
      </div>
    );
  } else if (view.v === "account") {
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{tt("Account", "Konto")}</h3>
        <p className="text-[14px]">Mia Berg · mia.berg@example.com</p>
        {back}
      </div>
    );
  } else if (view.v === "feed") {
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{tt("Learning Feed", "Lern-Feed")}</h3>
        <ul className="space-y-2 text-[14px]">
          {[tt("Jonas K. finished “Closing a deal”.", "Jonas K. hat „Einen Abschluss erzielen“ beendet."), tt("A new course was added: Reviewing a contract.", "Ein neuer Kurs wurde hinzugefügt: Einen Vertrag prüfen."), tt("Mira S. shared a note on “Negotiation basics”.", "Mira S. hat eine Notiz zu „Verhandlungsgrundlagen“ geteilt.")].map((x) => (<li key={x} className="rounded border border-[#D9D5E2] px-3 py-2">{x}</li>))}
        </ul>
        {back}
      </div>
    );
  } else if (view.v === "board") {
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{tt("Leaderboard", "Rangliste")}</h3>
        <ol className="space-y-1 text-[14px]">
          {[["Jonas K.", 60], ["Mira S.", 40], [tt("You", "Sie"), seen.length * 10], ["Tomas B.", 20]].sort((a, b) => (b[1] as number) - (a[1] as number)).map((r, k) => (<li key={String(r[0])} className="flex justify-between rounded border border-[#D9D5E2] px-3 py-2"><span>{k + 1}. {r[0]}</span><span>{tt(`${r[1]} points`, `${r[1]} Punkte`)}</span></li>))}
        </ol>
        <p className="text-[13px] text-[#5F5E5A]">{tt("The other names and points are made up.", "Die anderen Namen und Punkte sind erfunden.")}</p>
        {back}
      </div>
    );
  } else if (view.v === "coach") {
    const send = () => {
      const t = draft.trim();
      if (!t) return;
      setChat((c) => [...c, `${tt("You", "Sie")}: ${t}`, `${tt("AI Coach", "KI-Coach")}: ${tt("Try the course “Negotiation basics”, lesson 1. It is a good place to start.", "Versuchen Sie den Kurs „Verhandlungsgrundlagen“, Lektion 1. Dort lässt es sich gut beginnen.")}`]);
      setDraft("");
    };
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{tt("AI Coach", "KI-Coach")}</h3>
        <ul className="space-y-1 text-[14px]">{chat.length === 0 ? <li className="text-[#5F5E5A]">{tt("Ask the coach what to learn next.", "Fragen Sie den Coach, was Sie als Nächstes lernen sollen.")}</li> : chat.map((m, k) => <li key={k} className="rounded border border-[#D9D5E2] px-3 py-1.5">{m}</li>)}</ul>
        <div className="flex gap-2"><input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} aria-label={tt("Message to the coach", "Nachricht an den Coach")} className="min-h-[40px] flex-1 rounded border border-[#B9B4C4] px-2 text-[14px]" /><button type="button" onClick={send} className="min-h-[40px] rounded bg-[#4A4458] px-4 text-[14px] font-semibold text-white">{tt("Send", "Senden")}</button></div>
        {back}
      </div>
    );
  } else if (view.v === "module") {
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{view.name}</h3>
        <p className="text-[14px]">{tt("Settings and records of this area, kept for course teams.", "Einstellungen und Einträge dieses Bereichs, geführt für Kursteams.")}</p>
        <button type="button" onClick={() => go({ v: "lists" })} className={btnTile}>{tt("Show the courses", "Die Kurse anzeigen")}</button>
        {back}
      </div>
    );
  } else {
    const menu: [string, OV][] = option === "B"
      ? [[tt("My courses", "Meine Kurse"), { v: "mine" }], [tt("Find a course", "Kurs finden"), { v: "search" }], [tt("Progress", "Fortschritt"), { v: "progress" }], [tt("Help", "Hilfe"), { v: "help" }], [tt("Account", "Konto"), { v: "account" }]]
      : MODULES.map((m): [string, OV] => [m, m === "Course Search" ? { v: "search" } : ["Library", "Catalogue", "My Learning"].includes(m) ? { v: "lists" } : { v: "module", name: m }]);
    body = (
      <div className="space-y-3 px-3 py-3">
        <ul className="flex flex-wrap gap-1" aria-label={tt("Menu", "Menü")}>
          {menu.map(([m, t]) => (<li key={m}><button type="button" onClick={() => go(t)} className={clsx("rounded bg-[#F4F2F7] hover:bg-[#E9E6F0]", option === "B" ? "min-h-[36px] px-3 text-[13px]" : "min-h-[32px] px-2 text-[12px]")}>{m}</button></li>))}
        </ul>
        {option === "C" && (
          <div className="grid grid-cols-3 gap-1">
            {([[tt("Learning Feed", "Lern-Feed"), "feed"], [tt("Leaderboard", "Rangliste"), "board"], [tt("AI Coach", "KI-Coach"), "coach"]] as [string, "feed" | "board" | "coach"][]).map(([f, k]) => (
              <button key={f} type="button" onClick={() => go({ v: k })} className="min-h-[44px] rounded border border-[#4A4458] bg-[#F4F2F7] px-2 py-3 text-left text-[12px] font-semibold hover:bg-[#E9E6F0]">{f}</button>
            ))}
          </div>
        )}
        <h3 className="text-[14px] font-semibold">{tt("Courses", "Kurse")}</h3>
        <div className={clsx("grid gap-1", option === "A" ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2")}>
          {all.map((l, i) => (<button key={l} type="button" onClick={() => go({ v: "course", i })} className={btnTile}>{l}</button>))}
        </div>
      </div>
    );
  }
  return (
    <div className={INK}>
      <Bar crumb={view.v === "home" ? crumb : tt("Home", "Start") + " > " + (view.v === "course" ? all[view.i] : view.v === "lesson" ? lessonsOf[view.i].title : view.v === "module" ? view.name : "")} />
      {body}
    </div>
  );
}
