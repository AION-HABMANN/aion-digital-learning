"use client";

import { useState } from "react";
import clsx from "clsx";
import { tt } from "@/lib/lang";

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

/** The three options of Block 1.2, each as the home screen after the measure: A more content, B a simpler navigation, C new features. */
export function LearnBaseOptionSim({ option }: { option: "A" | "B" | "C" }) {
  const [view, setView] = useState<"home" | "course">("home");
  if (view === "course")
    return (
      <div className={INK}>
        <Bar crumb={tt("Negotiation basics", "Verhandlungsgrundlagen")} />
        <div className="space-y-3 px-4 py-4">
          <h3 className="text-[17px] font-semibold">{tt("Negotiation basics", "Verhandlungsgrundlagen")}</h3>
          <p className="text-[14px]">{tt("A course on negotiation.", "Ein Kurs über Verhandeln.")}</p>
          <button type="button" onClick={() => setView("home")} className="text-[13px] underline">← {tt("Back", "Zurück")}</button>
        </div>
      </div>
    );
  const tile = (x: string, key?: string) => (
    <button key={key ?? x} type="button" onClick={() => setView("course")} className={btnTile}>{x}</button>
  );
  return (
    <div className={INK}>
      <Bar crumb={tt("Home", "Start")} />
      <div className="space-y-3 px-3 py-3">
        {option === "B" ? (
          <ul className="flex flex-wrap gap-1" aria-label={tt("Menu", "Menü")}>
            {[tt("My courses", "Meine Kurse"), tt("Find a course", "Kurs finden"), tt("Progress", "Fortschritt"), tt("Help", "Hilfe"), tt("Account", "Konto")].map((m) => (
              <li key={m}><button type="button" onClick={() => setView("course")} className="min-h-[36px] rounded bg-[#F4F2F7] px-3 text-[13px] hover:bg-[#E9E6F0]">{m}</button></li>
            ))}
          </ul>
        ) : (
          <ul className="flex flex-wrap gap-1" aria-label={tt("Menu", "Menü")}>
            {MODULES.map((m) => (
              <li key={m}><button type="button" onClick={() => setView("course")} className="min-h-[32px] rounded bg-[#F4F2F7] px-2 text-[12px] hover:bg-[#E9E6F0]">{m}</button></li>
            ))}
          </ul>
        )}
        {option === "C" && (
          <div className="grid grid-cols-3 gap-1">
            {[tt("Learning Feed", "Lern-Feed"), tt("Leaderboard", "Rangliste"), tt("AI Coach", "KI-Coach")].map((f) => (
              <div key={f} className="rounded border border-[#4A4458] bg-[#F4F2F7] px-2 py-3 text-[12px] font-semibold">{f}</div>
            ))}
          </div>
        )}
        <h3 className="text-[14px] font-semibold">{tt("Courses", "Kurse")}</h3>
        <div className={clsx("grid gap-1", option === "A" ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2")}>
          {(option === "A" ? [...LESSONS, ...LESSONS.map((l) => `${l} II`), ...LESSONS.map((l) => `${l} III`)] : LESSONS.slice(0, 4)).map((l) => tile(l))}
        </div>
      </div>
    </div>
  );
}
