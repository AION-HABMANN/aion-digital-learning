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

function Bar({ role }: { role: string }) {
  return (
    <div className="flex items-center justify-between bg-[#4A4458] px-4 py-2.5 text-white">
      <span className="font-serif text-[15px] font-bold">EduPath</span>
      <span className="text-[12px] opacity-80">{role}</span>
    </div>
  );
}

function LearnerView() {
  const [open, setOpen] = useState<number | null>(null);
  const units = UNITS();
  if (open !== null)
    return (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{units[open]}</h3>
        <p className="text-[12px] font-semibold text-[#4A4458]">{tt("45 min", "45 Min.")}</p>
        <p className="text-[14px] leading-[1.6]">{TEXT()}</p>
        <p className="text-[14px] leading-[1.6]">{TEXT()}</p>
        <button type="button" onClick={() => setOpen(null)} className="text-[13px] underline">← {tt("Back to the course", "Zurück zum Kurs")}</button>
      </div>
    );
  return (
    <div className="space-y-2 px-4 py-4">
      <h3 className="text-[17px] font-semibold">{tt("Project management", "Projektmanagement")}</h3>
      <ol className="space-y-1.5">
        {units.map((u, i) => (
          <li key={u}>
            <button type="button" onClick={() => setOpen(i)} className="flex min-h-[44px] w-full items-center justify-between rounded border border-[#D9D5E2] px-3 text-left hover:bg-[#F4F2F7]">
              <span className="text-[14px]">{`${i + 1}. ${u}`}</span>
              <span className="text-[12px] text-[#5F5E5A]">{tt("45 min", "45 Min.")}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function TeacherView() {
  const tabs = TABS();
  const [tab, setTab] = useState(0);
  return (
    <div className="space-y-3 px-3 py-3">
      <h3 className="text-[17px] font-semibold">{tt("Course editor", "Kurseditor")}</h3>
      <div role="tablist" className="flex flex-wrap gap-1">
        {tabs.map((x, i) => (
          <button key={x} role="tab" aria-selected={tab === i} type="button" onClick={() => setTab(i)} className={clsx("min-h-[36px] rounded px-2 text-[12px]", tab === i ? "bg-[#4A4458] text-white" : "bg-[#F4F2F7] hover:bg-[#E9E6F0]")}>
            {x}
          </button>
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
      <button type="button" className="min-h-[40px] rounded bg-[#4A4458] px-4 text-[14px] font-semibold text-white">{tt("Save", "Speichern")}</button>
      <h3 className="pt-2 text-[14px] font-semibold">{tt("Learners", "Lernende")}</h3>
      <table className="w-full text-[13px]">
        <thead>
          <tr className="bg-[#F4F2F7] text-left"><th className="px-2 py-1">{tt("Name", "Name")}</th><th className="px-2 py-1">{tt("Status", "Status")}</th></tr>
        </thead>
        <tbody>
          {["A. Berg", "M. Okafor", "L. Weiss", "J. Kaya"].map((n) => (
            <tr key={n} className="border-t border-[#E4E0EC]"><td className="px-2 py-1">{n}</td><td className="px-2 py-1">—</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** EduPath as a learner and as a teacher meet it (Block 2.1). */
export function EduPathSim() {
  const [who, setWho] = useState<"learner" | "teacher">("learner");
  return (
    <div className={INK}>
      <Bar role={who === "learner" ? tt("Learner", "Lernende") : tt("Teacher", "Lehrende")} />
      <div className="flex gap-1 border-b border-[#D9D5E2] px-3 py-2" role="group" aria-label={tt("View as", "Ansicht als")}>
        {(["learner", "teacher"] as const).map((k) => (
          <button key={k} type="button" aria-pressed={who === k} onClick={() => setWho(k)} className={clsx("min-h-[36px] rounded px-3 text-[13px]", who === k ? "bg-[#4A4458] text-white" : "bg-[#F4F2F7] hover:bg-[#E9E6F0]")}>
            {k === "learner" ? tt("As a learner", "Als Lernende") : tt("As a teacher", "Als Lehrende")}
          </button>
        ))}
      </div>
      {who === "learner" ? <LearnerView /> : <TeacherView />}
    </div>
  );
}
