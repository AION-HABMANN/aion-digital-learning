"use client";

import { useState } from "react";
import clsx from "clsx";
import { tt } from "@/lib/lang";

/**
 * Day 9 · the working simulations of CLAUDE.md #60. NavLearn as the plan describes it (many menu items, no clear order, content that is hard to find), and the three
 * options of Block 1.2 as three experiences of the same lesson. They add no hint and no verdict and print no figure the plan does not print. Own colours only (never the
 * site's blue, teal and rust); the content is made up and nothing here is marked right or wrong.
 */
const INK = "text-[#26323F]";

type Item = { label: string; title: string; text: string };
const ITEMS = (): Item[] => [
  { label: tt("Hub", "Hub"), title: tt("Hub", "Hub"), text: tt("Your news and a few suggestions.", "Ihre Neuigkeiten und ein paar Vorschläge.") },
  { label: tt("Library", "Bibliothek"), title: tt("Library", "Bibliothek"), text: tt("Negotiation basics · Project planning · Presenting · Teamwork", "Verhandlungsgrundlagen · Projektplanung · Präsentieren · Teamarbeit") },
  { label: tt("Learning", "Lernen"), title: tt("Learning", "Lernen"), text: tt("Lessons you have started. Negotiation basics: lesson 3.", "Lektionen, die Sie begonnen haben. Verhandlungsgrundlagen: Lektion 3.") },
  { label: tt("My stuff", "Meine Sachen"), title: tt("My stuff", "Meine Sachen"), text: tt("Notes, bookmarks and things you saved.", "Notizen, Lesezeichen und Dinge, die Sie gespeichert haben.") },
  { label: tt("Courses (old)", "Kurse (alt)"), title: tt("Courses (old)", "Kurse (alt)"), text: tt("The list of courses as it was last year.", "Die Kursliste, wie sie letztes Jahr war.") },
  { label: tt("Atlas", "Atlas"), title: tt("Atlas", "Atlas"), text: tt("A map of topics. Pick a topic to see related courses.", "Eine Landkarte der Themen. Wählen Sie ein Thema, um verwandte Kurse zu sehen.") },
  { label: tt("Records", "Nachweise"), title: tt("Records", "Nachweise"), text: tt("Your completed courses and your certificates.", "Ihre abgeschlossenen Kurse und Ihre Zertifikate.") },
  { label: tt("Offers", "Angebote"), title: tt("Offers", "Angebote"), text: tt("Spring offers on every course.", "Frühlingsangebote für jeden Kurs.") },
  { label: tt("Community", "Community"), title: tt("Community", "Community"), text: tt("Questions and answers from other learners.", "Fragen und Antworten anderer Lernender.") },
  { label: tt("Tools", "Werkzeuge"), title: tt("Tools", "Werkzeuge"), text: tt("A calculator, a glossary and a timer.", "Ein Rechner, ein Glossar und ein Timer.") },
  { label: tt("Start", "Start"), title: tt("Start", "Start"), text: tt("Welcome back. What would you like to do?", "Willkommen zurück. Was möchten Sie tun?") },
  { label: tt("Help", "Hilfe"), title: tt("Help", "Hilfe"), text: tt("Contact us and read the answers to common questions.", "Kontaktieren Sie uns und lesen Sie die Antworten auf häufige Fragen.") },
  { label: tt("Explore", "Entdecken"), title: tt("Explore", "Entdecken"), text: tt("New and popular courses.", "Neue und beliebte Kurse.") },
  { label: tt("Account", "Konto"), title: tt("Account", "Konto"), text: tt("Your details and your settings.", "Ihre Angaben und Ihre Einstellungen.") },
  { label: tt("Archive", "Archiv"), title: tt("Archive", "Archiv"), text: tt("Courses you have set aside.", "Kurse, die Sie beiseitegelegt haben.") },
  { label: tt("Tracks", "Pfade"), title: tt("Tracks", "Pfade"), text: tt("Sets of courses in a fixed order.", "Gruppen von Kursen in fester Reihenfolge.") },
];

/** NavLearn as one of its learners meets it: sixteen menu items in no order, and pages that do not say where they sit. */
export function NavLearnSim() {
  const items = ITEMS();
  const [cur, setCur] = useState<number | null>(null);
  return (
    <div className={clsx(INK, "bg-[#F7F8FA]")}>
      <div className="flex items-center justify-between bg-[#3F4A58] px-3 py-2 text-white">
        <span className="font-serif text-[15px] font-bold">NavLearn</span>
        <span className="text-[12px] opacity-80">{tt("Learning platform", "Lernplattform")}</span>
      </div>
      <div className="grid gap-3 p-3 sm:grid-cols-[170px_1fr]">
        <nav aria-label={tt("Menu", "Menü")} className="grid grid-cols-2 gap-1 sm:grid-cols-1">
          {items.map((it, i) => (
            <button key={it.label} type="button" onClick={() => setCur(i)} className={clsx("min-h-[34px] rounded border px-2 text-left text-[13px]", cur === i ? "border-[#3F4A58] bg-white font-semibold" : "border-[#C9D0DA] bg-[#EEF1F5]")}>
              {it.label}
            </button>
          ))}
        </nav>
        <div className="rounded border border-[#C9D0DA] bg-white p-3">
          {cur === null ? (
            <p className="text-[13px]">{tt("Welcome. Pick something from the menu.", "Willkommen. Wählen Sie etwas aus dem Menü.")}</p>
          ) : (
            <div className="space-y-2">
              <p className="text-[15px] font-semibold">{items[cur].title}</p>
              <p className="text-[13px]">{items[cur].text}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ the three options of Block 1.2 */

const PARA = () => [
  tt("In a negotiation, the first number you hear tends to pull the rest toward it. This is called anchoring.", "In einer Verhandlung zieht die erste Zahl, die Sie hören, den Rest zu sich hin. Das nennt man Anker."),
  tt("Prepare your limit and your goal before you start, so that you do not drift toward the other side's number.", "Bereiten Sie Ihre Grenze und Ihr Ziel vor, bevor Sie beginnen, damit Sie nicht zur Zahl der anderen Seite abdriften."),
  tt("After the offer, name what you give in return: a longer contract, a faster payment, a smaller scope.", "Nennen Sie nach dem Angebot, was Sie dafür geben: einen längeren Vertrag, eine schnellere Zahlung, einen kleineren Umfang."),
];

function Quiz({ q, a, b }: { q: string; a: string; b: string }) {
  const [pick, setPick] = useState<string | null>(null);
  return (
    <div className="space-y-1 rounded border border-[#C9D0DA] bg-[#F3F6FA] p-2">
      <p className="text-[13px] font-semibold">{q}</p>
      <div className="flex flex-wrap gap-1">
        {[a, b].map((o) => (
          <button key={o} type="button" onClick={() => setPick(o)} className={clsx("min-h-[34px] rounded border px-2 text-[13px]", pick === o ? "border-[#3F4A58] bg-white font-semibold" : "border-[#C9D0DA] bg-white")}>{o}</button>
        ))}
      </div>
      {pick && <p className="text-[12px] text-[#5F5E5A]">{tt("Answer saved.", "Antwort gespeichert.")}</p>}
    </div>
  );
}

function MoreInteraction() {
  const p = PARA();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2 px-3 py-3">
      <p className="text-[15px] font-semibold">{tt("Negotiation basics · The first offer", "Verhandlungsgrundlagen · Das erste Angebot")}</p>
      <p className="text-[13px]">{p[0]}</p>
      <Quiz q={tt("Quick check: who names the first number?", "Kurzer Check: Wer nennt die erste Zahl?")} a={tt("You", "Sie")} b={tt("The other side", "Die andere Seite")} />
      <p className="text-[13px]">{p[1]}</p>
      <Quiz q={tt("Quick check: what do you prepare?", "Kurzer Check: Was bereiten Sie vor?")} a={tt("A limit", "Eine Grenze")} b={tt("Nothing", "Nichts")} />
      <div className="flex flex-wrap gap-1">
        {[1, 2, 3].map((n) => (
          <button key={n} type="button" onClick={() => setOpen(n)} className="min-h-[34px] rounded bg-[#E4572E] px-3 text-[13px] font-semibold text-white">{tt(`Tap to reveal tip ${n}`, `Tippen für Tipp ${n}`)}</button>
        ))}
      </div>
      {open && <p className="text-[12px] text-[#5F5E5A]">{tt(`Tip ${open}: read the next paragraph.`, `Tipp ${open}: Lesen Sie den nächsten Absatz.`)}</p>}
      <p className="text-[13px]">{p[2]}</p>
    </div>
  );
}

function Structured() {
  const p = PARA();
  const [sec, setSec] = useState(0);
  const secs = [tt("Learn", "Lernen"), tt("Find", "Finden"), tt("Progress", "Fortschritt"), tt("Help", "Hilfe")];
  return (
    <div className="space-y-2 px-3 py-3">
      <nav className="flex flex-wrap gap-1" aria-label={tt("Sections", "Bereiche")}>
        {secs.map((s, i) => (
          <button key={s} type="button" aria-current={sec === i} onClick={() => setSec(i)} className={clsx("min-h-[34px] rounded px-3 text-[13px]", sec === i ? "bg-[#3F4A58] text-white" : "bg-[#EEF0F3]")}>{s}</button>
        ))}
      </nav>
      <p className="text-[12px] text-[#5F5E5A]">{secs[sec]} › {tt("Negotiation basics", "Verhandlungsgrundlagen")} › {tt("Lesson 3 of 8", "Lektion 3 von 8")}</p>
      <div aria-hidden className="h-2 overflow-hidden rounded bg-[#E4E8EE]"><div className="h-2 bg-[#3F4A58]" style={{ width: "38%" }} /></div>
      <p className="text-[15px] font-semibold">{tt("The first offer", "Das erste Angebot")}</p>
      {p.map((x) => (
        <p key={x} className="text-[13px]">{x}</p>
      ))}
      <button type="button" className="min-h-[38px] rounded bg-[#3F4A58] px-3 text-[13px] font-semibold text-white">{tt("Next: lesson 4", "Weiter: Lektion 4")}</button>
    </div>
  );
}

function VisualOnly() {
  const p = PARA();
  const items = ITEMS();
  return (
    <div className="space-y-2 px-3 py-3">
      <div className="grid grid-cols-3 gap-1 sm:grid-cols-4">
        {items.map((it) => (
          <span key={it.label} className="rounded bg-[#E7EEF8] px-2 py-1 text-[12px]">{it.label}</span>
        ))}
      </div>
      <div className="rounded-lg bg-[#F3F6FA] p-3 shadow-sm">
        <p className="font-serif text-[17px] font-bold">{tt("Negotiation basics · The first offer", "Verhandlungsgrundlagen · Das erste Angebot")}</p>
        {p.map((x) => (
          <p key={x} className="mt-2 text-[13px] leading-relaxed">{x}</p>
        ))}
      </div>
    </div>
  );
}

/** The same lesson under each of the three options of Block 1.2. */
export function OptionSim({ option }: { option: "A" | "B" | "C" }) {
  return (
    <div className={INK}>
      <div className="flex items-center justify-between bg-[#3F4A58] px-3 py-2 text-white">
        <span className="font-serif text-[15px] font-bold">NavLearn</span>
        <span className="text-[12px] opacity-80">{tt("A lesson", "Eine Lektion")}</span>
      </div>
      {option === "A" ? <MoreInteraction /> : option === "B" ? <Structured /> : <VisualOnly />}
    </div>
  );
}
