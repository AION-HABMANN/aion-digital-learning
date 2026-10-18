"use client";

import { useState } from "react";
import clsx from "clsx";
import { tt } from "@/lib/lang";

/**
 * Day 8 · the working simulations of CLAUDE.md #60. StructLearn as the plan describes it (many colours, no clear structure, several buttons without priority), and
 * the three options of Block 1.2 as three experiences of the same start page. They add no hint and no verdict and print no figure the plan does not print. Own
 * colours only (never the site's blue, teal and rust); the content is made up and nothing here is marked right or wrong.
 */
const INK = "text-[#26323F]";
const COL = ["#E4572E", "#F3A712", "#29A19C", "#7A4DE8", "#D9534F", "#3D7BD9", "#2E9E6B"];

type Page = "home" | "courses" | "lesson" | "profile";
const PAGES = (): { id: Page; label: string }[] => [
  { id: "home", label: tt("Start", "Start") },
  { id: "courses", label: tt("Courses", "Kurse") },
  { id: "lesson", label: tt("My notes", "Meine Notizen") },
  { id: "profile", label: tt("Profile", "Profil") },
  { id: "courses", label: tt("Offers", "Angebote") },
  { id: "lesson", label: tt("News", "Neuigkeiten") },
];

function Banner({ i, text }: { i: number; text: string }) {
  return (
    <div className="rounded px-3 py-2 text-[13px] font-semibold text-white" style={{ background: COL[i % COL.length] }}>
      {text}
    </div>
  );
}

function Btn({ label, i, onClick }: { label: string; i: number; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="min-h-[40px] rounded px-3 text-[13px] font-semibold text-white" style={{ background: COL[(i * 2 + 1) % COL.length] }}>
      {label}
    </button>
  );
}

/** StructLearn as one of its learners meets it: a start page with many colours, no structure and six equal buttons, and pages that look alike. */
export function StructLearnSim() {
  const [page, setPage] = useState<Page>("home");
  const pages = PAGES();
  return (
    <div className={clsx(INK, "bg-[#FFFBEA]")}>
      <div className="flex items-center justify-between px-3 py-2 text-white" style={{ background: "#7A4DE8" }}>
        <span className="font-serif text-[15px] font-bold">StructLearn</span>
        <span className="text-[12px]">{tt("Offers · News · Help", "Angebote · Neuigkeiten · Hilfe")}</span>
      </div>
      <div className="space-y-2 px-3 py-3">
        <Banner i={0} text={tt("New: spring offers on every course!", "Neu: Frühlingsangebote für jeden Kurs!")} />
        <Banner i={2} text={tt("Join our community and get a badge", "Werden Sie Teil unserer Community und erhalten Sie ein Badge")} />
        <Banner i={3} text={tt("Tip: complete your profile", "Tipp: Vervollständigen Sie Ihr Profil")} />
        {page === "home" ? (
          <p className="pt-1 text-[13px]">{tt("Welcome back. What would you like to do?", "Willkommen zurück. Was möchten Sie tun?")}</p>
        ) : (
          <p className="pt-1 text-[14px] font-semibold">{pages.find((p) => p.id === page)?.label}</p>
        )}
        {page === "lesson" && <p className="text-[13px]">{tt("Negotiation basics: preparing, offering, agreeing. This lesson has three parts.", "Verhandlungsgrundlagen: vorbereiten, anbieten, einigen. Diese Lektion hat drei Teile.")}</p>}
        {page === "courses" && (
          <ul className="space-y-1 text-[13px]">
            {[tt("Negotiation basics", "Verhandlungsgrundlagen"), tt("Project planning", "Projektplanung"), tt("Presenting", "Präsentieren"), tt("Teamwork", "Teamarbeit")].map((c, i) => (
              <li key={c} className="rounded px-2 py-1 text-white" style={{ background: COL[(i + 3) % COL.length] }}>{c}</li>
            ))}
          </ul>
        )}
        {page === "profile" && <p className="text-[13px]">{tt("Your details and your badges.", "Ihre Angaben und Ihre Badges.")}</p>}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {pages.map((p, i) => (
            <Btn key={`${p.label}-${i}`} label={p.label} i={i} onClick={() => setPage(p.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ the three options of Block 1.2 */

function Calm() {
  return (
    <div className="space-y-2 px-3 py-3">
      <p className="rounded bg-[#EEF0F3] px-3 py-2 text-[13px]">{tt("Spring offers on every course", "Frühlingsangebote für jeden Kurs")}</p>
      <p className="text-[13px]">{tt("Welcome back. What would you like to do?", "Willkommen zurück. Was möchten Sie tun?")}</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {PAGES().map((p, i) => (
          <button key={`${p.label}-${i}`} type="button" className="min-h-[40px] rounded border border-[#8A93A0] bg-[#F4F6F8] px-3 text-[13px]">{p.label}</button>
        ))}
      </div>
    </div>
  );
}

function Restructured() {
  const [sec, setSec] = useState(0);
  const secs = [tt("Learn", "Lernen"), tt("Find", "Finden"), tt("Progress", "Fortschritt"), tt("Help", "Hilfe")];
  return (
    <div className="space-y-2 px-3 py-3">
      <nav className="flex flex-wrap gap-1" aria-label={tt("Sections", "Bereiche")}>
        {secs.map((s, i) => (
          <button key={s} type="button" aria-current={sec === i} onClick={() => setSec(i)} className={clsx("min-h-[36px] rounded px-3 text-[13px]", sec === i ? "bg-[#3F4A58] text-white" : "bg-[#EEF0F3]")}>{s}</button>
        ))}
      </nav>
      <p className="text-[12px] text-[#5F5E5A]">{secs[sec]} › {tt("Overview", "Übersicht")}</p>
      <div className="space-y-1 rounded px-3 py-2 text-white" style={{ background: COL[sec] }}>
        <p className="text-[13px] font-semibold">{tt("Spring offers on every course!", "Frühlingsangebote für jeden Kurs!")}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[tt("Continue", "Weitermachen"), tt("My courses", "Meine Kurse"), tt("Notes", "Notizen"), tt("Offers", "Angebote")].map((l, i) => (
          <button key={l} type="button" className="min-h-[40px] rounded px-3 text-[13px] font-semibold text-white" style={{ background: COL[(i * 2 + 1) % COL.length] }}>{l}</button>
        ))}
      </div>
    </div>
  );
}

function MoreVisual() {
  return (
    <div className="space-y-2 px-3 py-3">
      <div className="flex items-center gap-2 rounded px-3 py-3 text-white" style={{ background: "#E4572E" }}>
        <span aria-hidden className="inline-block animate-pulse text-[26px]">★</span>
        <p className="text-[13px] font-semibold">{tt("Spring offers on every course!", "Frühlingsangebote für jeden Kurs!")}</p>
      </div>
      <div className="flex items-center gap-2 rounded px-3 py-3 text-white" style={{ background: "#29A19C" }}>
        <span aria-hidden className="inline-block animate-bounce text-[22px]">◆</span>
        <p className="text-[13px] font-semibold">{tt("Join our community and get a badge", "Werden Sie Teil unserer Community und erhalten Sie ein Badge")}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {PAGES().map((p, i) => (
          <button key={`${p.label}-${i}`} type="button" className="flex min-h-[44px] items-center justify-center gap-1 rounded px-3 text-[13px] font-semibold text-white" style={{ background: COL[(i * 2 + 1) % COL.length] }}>
            <span aria-hidden>{["●", "▲", "■", "◆", "★", "✚"][i]}</span>
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** The same start page under each of the three options of Block 1.2. */
export function OptionSim({ option }: { option: "A" | "B" | "C" }) {
  return (
    <div className={INK}>
      <div className="flex items-center justify-between bg-[#3F4A58] px-3 py-2 text-white">
        <span className="font-serif text-[15px] font-bold">StructLearn</span>
        <span className="text-[12px] opacity-80">{tt("Start page", "Startseite")}</span>
      </div>
      {option === "A" ? <Calm /> : option === "B" ? <Restructured /> : <MoreVisual />}
    </div>
  );
}
