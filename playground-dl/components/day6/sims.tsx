"use client";

import { useState } from "react";
import clsx from "clsx";
import { tt } from "@/lib/lang";

/**
 * Day 6 · the working simulation of CLAUDE.md #60 for the case study: EduPath as its two user groups meet it. As a learner: a course of long units, each about
 * forty-five minutes, one after the other. As a teacher: a course editor with many tabs and many settings, and a table of learners. It adds no hint and no
 * verdict, and prints no figure the plan does not print. Own colours only; the content is made up and nothing here is marked right or wrong.
 */
const INK = "text-[#26323F]";
const TABS = () => [tt("Basics", "Grundlagen"), tt("Structure", "Struktur"), tt("Content", "Inhalt"), tt("Assessment", "Prüfung"), tt("Grading", "Bewertung"), tt("Access", "Zugang"), tt("Notifications", "Benachrichtigungen"), tt("Reports", "Berichte"), tt("Advanced", "Erweitert")];
const UNITS = () => [tt("Planning a project", "Ein Projekt planen"), tt("Scope and goals", "Umfang und Ziele"), tt("Time and cost", "Zeit und Kosten"), tt("Risks", "Risiken"), tt("Teams", "Teams"), tt("Closing a project", "Ein Projekt abschließen")];
const TEXT = () => tt(
  "This unit covers the topic in depth. It begins with the background, goes through the main concepts one after the other, and ends with a worked example that builds on everything before it. Plan to work through it from the first section to the last without a break, because the later sections rely on the earlier ones.",
  "Diese Einheit behandelt das Thema in der Tiefe. Sie beginnt mit dem Hintergrund, geht die wichtigsten Konzepte nacheinander durch und endet mit einem durchgerechneten Beispiel, das auf allem Vorherigen aufbaut. Planen Sie ein, sie vom ersten bis zum letzten Abschnitt ohne Pause durchzuarbeiten, weil die späteren Abschnitte auf den früheren aufbauen.",
);

const btnDark = "min-h-[40px] rounded bg-[#4A4458] px-4 text-[14px] font-semibold text-white hover:bg-[#383344]";
const link = "min-h-[36px] text-[13px] underline";

function Bar({ role, items, cur, onGo }: { role: string; items?: [string, string][]; cur?: string; onGo?: (k: string) => void }) {
  return (
    <div className="bg-[#4A4458] text-white">
      <div className="flex items-center justify-between px-4 py-2.5">
        <span className="font-serif text-[15px] font-bold">EduPath</span>
        <span className="text-[12px] opacity-80">{role}</span>
      </div>
      {items && (
        <nav className="flex gap-1 px-3 pb-2" aria-label={tt("Menu", "Menü")}>
          {items.map(([k, l]) => (
            <button key={k} type="button" onClick={() => onGo?.(k)} className={clsx("min-h-[32px] rounded px-3 text-[13px]", cur === k ? "bg-white text-[#4A4458]" : "hover:bg-white/15")}>{l}</button>
          ))}
        </nav>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ the learner's course page and the teacher's editor, used by the platform and by the pictures of Block 2.1 */

function CourseList({ done, onOpen }: { done: number[]; onOpen: (i: number) => void }) {
  const units = UNITS();
  return (
    <div className="space-y-2 px-4 py-4">
      <h3 className="text-[17px] font-semibold">{tt("Project management", "Projektmanagement")}</h3>
      <p className="text-[13px] text-[#5F5E5A]">{tt(`${done.length} of ${units.length} units finished`, `${done.length} von ${units.length} Einheiten beendet`)}</p>
      <ol className="space-y-1.5">
        {units.map((u, i) => (
          <li key={u}>
            <button type="button" onClick={() => onOpen(i)} className="flex min-h-[44px] w-full items-center justify-between rounded border border-[#D9D5E2] px-3 text-left hover:bg-[#F4F2F7]">
              <span className="text-[14px]">{`${i + 1}. ${u}`}{done.includes(i) ? " ✓" : ""}</span>
              <span className="text-[12px] text-[#5F5E5A]">{tt("45 min", "45 Min.")}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function EditorV({ onSave, saved }: { onSave?: () => void; saved?: boolean }) {
  const tabs = TABS();
  const [tab, setTab] = useState(0);
  return (
    <div className="space-y-3 px-3 py-3">
      <h3 className="text-[17px] font-semibold">{tt("Course editor", "Kurseditor")}</h3>
      <div role="tablist" className="flex flex-wrap gap-1">
        {tabs.map((x, i) => (
          <button key={x} role="tab" aria-selected={tab === i} type="button" onClick={() => setTab(i)} className={clsx("min-h-[36px] rounded px-2 text-[12px]", tab === i ? "bg-[#4A4458] text-white" : "bg-[#F4F2F7] hover:bg-[#E9E6F0]")}>{x}</button>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {Array.from({ length: 8 }, (_, i) => (
          <label key={i} className="block text-[12px]">
            {`${tabs[tab]} · ${tt("setting", "Einstellung")} ${i + 1}`}
            <input type="text" className="mt-0.5 block min-h-[32px] w-full rounded border border-[#B9B4C4] px-2 text-[13px]" />
          </label>
        ))}
      </div>
      <button type="button" onClick={onSave} className={btnDark}>{tt("Save", "Speichern")}</button>
      {saved && <p role="status" className="text-[13px] text-[#4A4458]">{tt("Saved.", "Gespeichert.")}</p>}
    </div>
  );
}

const NAMES = ["A. Berg", "M. Okafor", "L. Weiss", "J. Kaya"];

/** The two screens of Block 2.1 as the platform shows them, for the pictures: not clickable. */
export function EduPathShot({ kind }: { kind: "learner" | "teacher" }) {
  return (
    <div className={clsx("w-[560px] bg-white", INK)} aria-hidden>
      {kind === "learner" ? (
        <>
          <Bar role={tt("Learner", "Lernende")} items={[["course", tt("Course", "Kurs")], ["profile", tt("Profile", "Profil")], ["help", tt("Help", "Hilfe")]]} cur="course" />
          <CourseList done={[]} onOpen={() => undefined} />
        </>
      ) : (
        <>
          <Bar role={tt("Teacher", "Lehrende")} items={[["editor", tt("Course editor", "Kurseditor")], ["learners", tt("Learners", "Lernende")], ["help", tt("Help", "Hilfe")]]} cur="editor" />
          <EditorV />
        </>
      )}
    </div>
  );
}

function LearnerView() {
  const [page, setPage] = useState<{ p: "course" } | { p: "unit"; i: number } | { p: "profile" } | { p: "help" }>({ p: "course" });
  const [done, setDone] = useState<number[]>([]);
  const units = UNITS();
  const nav: [string, string][] = [["course", tt("Course", "Kurs")], ["profile", tt("Profile", "Profil")], ["help", tt("Help", "Hilfe")]];
  const go = (k: string) => setPage({ p: k as "course" | "profile" | "help" });
  let body: React.ReactNode;
  if (page.p === "unit") {
    const i = page.i;
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{units[i]}</h3>
        <p className="text-[12px] font-semibold text-[#4A4458]">{tt("45 min", "45 Min.")}</p>
        <p className="text-[14px] leading-[1.6]">{TEXT()}</p>
        <p className="text-[14px] leading-[1.6]">{TEXT()}</p>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => { setDone((d) => (d.includes(i) ? d : [...d, i])); setPage({ p: "course" }); }} className={btnDark}>{tt("Mark as finished", "Als beendet markieren")}</button>
          <button type="button" onClick={() => setPage({ p: "course" })} className={link}>← {tt("Back to the course", "Zurück zum Kurs")}</button>
        </div>
      </div>
    );
  } else if (page.p === "profile") {
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{tt("Profile", "Profil")}</h3>
        <ul className="space-y-1 text-[14px]">
          <li>Mia Berg · mia.berg@example.com</li>
          <li>{tt("Enrolled in: Project management", "Eingeschrieben in: Projektmanagement")}</li>
          <li>{tt(`Units finished: ${done.length} of ${units.length}`, `Beendete Einheiten: ${done.length} von ${units.length}`)}</li>
        </ul>
        <button type="button" onClick={() => setPage({ p: "course" })} className={link}>← {tt("Back to the course", "Zurück zum Kurs")}</button>
      </div>
    );
  } else if (page.p === "help") {
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{tt("Help", "Hilfe")}</h3>
        <dl className="space-y-2 text-[14px]">
          <div><dt className="font-semibold">{tt("How do I continue a unit?", "Wie mache ich mit einer Einheit weiter?")}</dt><dd>{tt("Open the course and select the unit. A unit opens at its start.", "Öffnen Sie den Kurs und wählen Sie die Einheit. Eine Einheit öffnet sich an ihrem Anfang.")}</dd></div>
          <div><dt className="font-semibold">{tt("How do I finish a unit?", "Wie beende ich eine Einheit?")}</dt><dd>{tt("Read it to the end and press “Mark as finished”.", "Lesen Sie sie bis zum Ende und drücken Sie „Als beendet markieren“.")}</dd></div>
        </dl>
        <button type="button" onClick={() => setPage({ p: "course" })} className={link}>← {tt("Back to the course", "Zurück zum Kurs")}</button>
      </div>
    );
  } else body = <CourseList done={done} onOpen={(i) => setPage({ p: "unit", i })} />;
  return (
    <>
      <Bar role={tt("Learner", "Lernende")} items={nav} cur={page.p === "unit" ? "course" : page.p} onGo={go} />
      {body}
    </>
  );
}

function TeacherView() {
  const [page, setPage] = useState<{ p: "editor" } | { p: "learners" } | { p: "learner"; n: string } | { p: "help" }>({ p: "editor" });
  const [saved, setSaved] = useState(false);
  const nav: [string, string][] = [["editor", tt("Course editor", "Kurseditor")], ["learners", tt("Learners", "Lernende")], ["help", tt("Help", "Hilfe")]];
  let body: React.ReactNode;
  if (page.p === "learner") {
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{page.n}</h3>
        <p className="text-[14px]">{tt("Enrolled in: Project management. Last login: two days ago. Units opened: 3 of 6.", "Eingeschrieben in: Projektmanagement. Letzte Anmeldung: vor zwei Tagen. Geöffnete Einheiten: 3 von 6.")}</p>
        <button type="button" onClick={() => setPage({ p: "learners" })} className={link}>← {tt("Back to the learners", "Zurück zu den Lernenden")}</button>
      </div>
    );
  } else if (page.p === "learners") {
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{tt("Learners", "Lernende")}</h3>
        <table className="w-full text-[13px]">
          <thead><tr className="bg-[#F4F2F7] text-left"><th className="px-2 py-1">{tt("Name", "Name")}</th><th className="px-2 py-1">{tt("Status", "Status")}</th></tr></thead>
          <tbody>
            {NAMES.map((n) => (
              <tr key={n} className="border-t border-[#E4E0EC]"><td className="px-2 py-1"><button type="button" onClick={() => setPage({ p: "learner", n })} className="min-h-[32px] underline decoration-dotted">{n}</button></td><td className="px-2 py-1">{tt("Enrolled", "Eingeschrieben")}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else if (page.p === "help") {
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{tt("Help", "Hilfe")}</h3>
        <dl className="space-y-2 text-[14px]">
          <div><dt className="font-semibold">{tt("Where do I change a course?", "Wo ändere ich einen Kurs?")}</dt><dd>{tt("In the course editor. Every area has its own tab with its own settings.", "Im Kurseditor. Jeder Bereich hat einen eigenen Reiter mit eigenen Einstellungen.")}</dd></div>
          <div><dt className="font-semibold">{tt("How do I see who is enrolled?", "Wie sehe ich, wer eingeschrieben ist?")}</dt><dd>{tt("Open “Learners” in the menu and select a name.", "Öffnen Sie „Lernende“ im Menü und wählen Sie einen Namen.")}</dd></div>
        </dl>
      </div>
    );
  } else body = <EditorV onSave={() => setSaved(true)} saved={saved} />;
  return (
    <>
      <Bar role={tt("Teacher", "Lehrende")} items={nav} cur={page.p === "learner" ? "learners" : page.p} onGo={(k) => setPage({ p: k as "editor" | "learners" | "help" })} />
      {body}
    </>
  );
}

/** EduPath as a learner and as a teacher meet it (Block 2.1): every menu entry opens a real page. */
export function EduPathSim() {
  const [who, setWho] = useState<"learner" | "teacher">("learner");
  return (
    <div className={INK}>
      <div className="flex gap-1 border-b border-[#D9D5E2] px-3 py-2" role="group" aria-label={tt("View as", "Ansicht als")}>
        {(["learner", "teacher"] as const).map((k) => (
          <button key={k} type="button" aria-pressed={who === k} onClick={() => setWho(k)} className={clsx("min-h-[36px] rounded px-3 text-[13px]", who === k ? "bg-[#4A4458] text-white" : "bg-[#F4F2F7] hover:bg-[#E9E6F0]")}>
            {k === "learner" ? tt("As a learner", "Als Lernende") : tt("As a teacher", "Als Lehrende")}
          </button>
        ))}
      </div>
      {who === "learner" ? <LearnerView key="l" /> : <TeacherView key="t" />}
    </div>
  );
}
