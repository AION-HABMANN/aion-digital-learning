"use client";

import { useState } from "react";
import clsx from "clsx";
import { LongPageSim } from "@/components/day2/sims";
import { CompetitorSite, ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 2 · Route 2 · "Observe the platform for real" (the user's request of 2026-10-18). LearnPro as it is today, the same page for two different learners, what a competitor
 * offers (an adaptive course and an AI tutor, as a public demo shows it), what learners say in their own words, and what LearnPro records. Only facts of the brief and of
 * the desk's data table are used: the platform is outdated (one version, one long page), competitors use AI and adaptive systems, the data is incomplete. No total, no verdict.
 */

/** LearnPro today, opened as two different learners: the page is the same for both. */
function TodayView() {
  const [who, setWho] = useState<"mia" | "sam">("mia");
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E3E6EC] px-3 py-2 text-[13px]" role="group" aria-label={tt("Open LearnPro as", "LearnPro öffnen als")}>
        <span className="text-[#5F5E5A]">{tt("Open LearnPro as:", "LearnPro öffnen als:")}</span>
        {(["mia", "sam"] as const).map((k) => (
          <button key={k} type="button" aria-pressed={who === k} onClick={() => setWho(k)} className={clsx("min-h-[34px] rounded px-3", who === k ? "bg-[#3F4A58] text-white" : "bg-[#EEF1F5]")}>
            {k === "mia" ? tt("Mia · new to project work", "Mia · neu in der Projektarbeit") : tt("Sam · has led projects for years", "Sam · leitet seit Jahren Projekte")}
          </button>
        ))}
      </div>
      <p className="px-3 pt-2 text-[12px] text-[#5F5E5A]">
        {who === "mia" ? tt("Mia signed up this week and has never planned a project.", "Mia hat sich diese Woche angemeldet und noch nie ein Projekt geplant.") : tt("Sam signed up this week and has led projects for twelve years.", "Sam hat sich diese Woche angemeldet und leitet seit zwölf Jahren Projekte.")}
      </p>
      <LongPageSim />
    </div>
  );
}

/** A competitor's course, as its public demo shows it: a short placement, a path that skips what you know, and a tutor you can ask. */
function CompetitorView() {
  const [know, setKnow] = useState<"new" | "some" | "lots" | null>(null);
  const [ask, setAsk] = useState<number | null>(null);
  const units = [tt("Why projects fail", "Warum Projekte scheitern"), tt("Planning a project", "Ein Projekt planen"), tt("Working in a team", "Im Team arbeiten"), tt("Managing risks", "Risiken steuern"), tt("Talking to stakeholders", "Mit Stakeholdern sprechen")];
  const skip = know === "lots" ? 3 : know === "some" ? 1 : 0;
  const asks: [string, string][] = [
    [tt("What is a stakeholder?", "Was ist ein Stakeholder?"), tt("A stakeholder is anyone who is affected by the project or can affect it: a customer, a sponsor, a team member.", "Ein Stakeholder ist jede Person, die vom Projekt betroffen ist oder es beeinflussen kann: ein Kunde, ein Geldgeber, ein Teammitglied.")],
    [tt("How long should a plan be?", "Wie lang sollte ein Plan sein?"), tt("For a first plan, one page is usually enough: the goal, the three biggest steps and a date to look again.", "Für einen ersten Plan reicht meist eine Seite: das Ziel, die drei größten Schritte und ein Datum zum erneuten Ansehen.")],
    [tt("Can you explain risk lists?", "Können Sie Risikolisten erklären?"), tt("A risk list names what could go wrong, what you would notice first and what you would do. Keep it short enough to be read.", "Eine Risikoliste nennt, was schiefgehen könnte, was Sie zuerst bemerken würden und was Sie tun würden. Halten Sie sie so kurz, dass sie gelesen wird.")],
  ];
  return (
    <CompetitorSite
      name="NextStep Learning"
      tagline={tt("Project basics, adaptive: a course that starts where you are, and an AI tutor you can ask.", "Projektgrundlagen, adaptiv: ein Kurs, der dort beginnt, wo Sie stehen, und ein KI-Tutor, den Sie fragen können.")}
      points={[tt("Placement in two minutes", "Einstufung in zwei Minuten"), tt("A path that skips what you know", "Ein Pfad, der überspringt, was Sie können"), tt("An AI tutor, day and night", "Ein KI-Tutor, Tag und Nacht")]}
      quote={tt("I finished the course in half the time I expected. The tutor answered my questions at midnight. · a customer, as quoted on the page", "Ich war mit dem Kurs in der Hälfte der erwarteten Zeit fertig. Der Tutor beantwortete meine Fragen um Mitternacht. · eine Kundin, wie auf der Seite zitiert")}
    >
    <div className="space-y-3 p-3">
      {know === null ? (
        <div className="space-y-2">
          <p className="text-[14px] font-semibold">{tt("Before we start: how much do you know about managing projects?", "Bevor wir beginnen: Wie viel wissen Sie über Projektmanagement?")}</p>
          <div className="flex flex-wrap gap-2">
            {([["new", tt("Nothing yet", "Noch nichts")], ["some", tt("Some", "Einiges")], ["lots", tt("A lot", "Viel")]] as const).map(([k, l]) => (
              <button key={k} type="button" onClick={() => setKnow(k)} className="min-h-[40px] rounded-full bg-[#1F5F5B] px-4 text-[14px] font-semibold text-white">{l}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-[14px] font-semibold">{tt("Your path", "Ihr Pfad")}</p>
          <ol className="space-y-1">
            {units.map((u, i) => (
              <li key={u} className={clsx("flex min-h-[38px] items-center justify-between rounded border px-3 text-[14px]", i < skip ? "border-dashed border-[#B8C0CC] bg-[#F4F6F9] text-[#6B7280]" : "border-[#BFD9D6] bg-white")}>
                <span>{i + 1}. {u}</span>
                <span className="text-[12px]">{i < skip ? tt("skipped · you know this", "übersprungen · Sie kennen das") : i === skip ? tt("start here", "hier beginnen") : tt("next", "danach")}</span>
              </li>
            ))}
          </ol>
          <button type="button" onClick={() => setKnow(null)} className="min-h-[34px] rounded border border-[#B8C0CC] px-3 text-[13px]">{tt("Answer the question again", "Die Frage erneut beantworten")}</button>
        </div>
      )}
      <div className="space-y-2 rounded border border-[#D9DEE6] bg-white p-3">
        <p className="text-[14px] font-semibold">{tt("Ask the tutor", "Den Tutor fragen")}</p>
        <div className="flex flex-wrap gap-2">
          {asks.map(([q], i) => (
            <button key={q} type="button" onClick={() => setAsk(i)} className={clsx("min-h-[36px] rounded-full border px-3 text-[13px]", ask === i ? "border-[#1F5F5B] bg-[#E6F1F0]" : "border-[#B8C0CC]")}>{q}</button>
          ))}
        </div>
        {ask !== null && <p className="rounded bg-[#F4F6F9] px-3 py-2 text-[14px]">{asks[ask][1]}</p>}
      </div>
      <p className="text-[12px] text-[#5F5E5A]">{tt("From the vendor's page: “Learners on adaptive paths finish more courses.” No source or measurement is given.", "Von der Seite des Anbieters: „Lernende auf adaptiven Pfaden schließen mehr Kurse ab.“ Eine Quelle oder Messung wird nicht genannt.")}</p>
    </div>
    </CompetitorSite>
  );
}

function VoicesDay2() {
  return (
    <VoicesView
      intro={tt("Messages from learners and from the people who book the course, as the support inbox shows them.", "Nachrichten von Lernenden und von denen, die den Kurs buchen, so wie das Support-Postfach sie zeigt.")}
      voices={[
        { who: "Mia", meta: tt("learner · first week", "Lernende · erste Woche"), device: tt("Phone", "Handy"), page: "/course/project-basics", channel: tt("Contact form", "Kontaktformular"), text: tt("It is one long page. I lose my place when I look away, and I cannot tell how much is left.", "Es ist eine lange Seite. Ich verliere meine Stelle, wenn ich wegsehe, und kann nicht sagen, wie viel noch kommt.") },
        { who: "Sam", meta: tt("learner · leads projects", "Lernender · leitet Projekte"), device: tt("Laptop", "Laptop"), page: "/course/project-basics", channel: tt("E-mail", "E-Mail"), text: tt("I know most of this already. I would like to skip ahead, but the only way is to scroll.", "Das meiste kenne ich schon. Ich würde gern vorspringen, aber der einzige Weg ist Scrollen.") },
        { who: tt("A team lead", "Eine Teamleiterin"), meta: tt("books the course for six people", "bucht den Kurs für sechs Personen"), channel: tt("E-mail", "E-Mail"), text: tt("Two of my people have been on the same page for a week. I do not know whether they are stuck or just busy.", "Zwei meiner Leute sind seit einer Woche auf derselben Seite. Ich weiß nicht, ob sie feststecken oder nur beschäftigt sind.") },
        { who: tt("A support agent", "Ein Support-Mitarbeiter"), meta: tt("our own team", "unser eigenes Team"), channel: tt("Internal note", "Interne Notiz"), text: tt("People ask whether the course adapts to them. I have to say it is the same for everyone.", "Leute fragen, ob sich der Kurs an sie anpasst. Ich muss sagen, dass er für alle gleich ist.") },
        { who: tt("A learner on another platform", "Eine Lernende auf einer anderen Plattform"), meta: tt("heard about it from a friend", "von einer Freundin gehört"), text: tt("A friend says her course asks a few questions first and then skips what she knows. Does yours do that?", "Eine Freundin sagt, ihr Kurs stellt zuerst ein paar Fragen und überspringt dann, was sie kann. Macht Ihrer das auch?") },
      ]}
    />
  );
}

function RecordsDay2() {
  const stops: [string, string, string][] = [
    ["03 Mar", tt("Learner 114", "Lernende 114"), tt("Planning a project", "Ein Projekt planen")],
    ["04 Mar", tt("Learner 207", "Lernender 207"), tt("Why projects fail", "Warum Projekte scheitern")],
    ["04 Mar", tt("Learner 131", "Lernende 131"), tt("Managing risks", "Risiken steuern")],
    ["05 Mar", tt("Learner 042", "Lernender 042"), tt("Working in a team", "Im Team arbeiten")],
    ["06 Mar", tt("Learner 207", "Lernender 207"), tt("Planning a project", "Ein Projekt planen")],
    ["06 Mar", tt("Learner 188", "Lernende 188"), tt("Talking to stakeholders", "Mit Stakeholdern sprechen")],
    ["07 Mar", tt("Learner 090", "Lernender 090"), tt("Why projects fail", "Warum Projekte scheitern")],
    ["07 Mar", tt("Learner 131", "Lernende 131"), tt("Working in a team", "Im Team arbeiten")],
  ];
  return (
    <RecordsView
      intro={tt("What LearnPro's admin console can show today.", "Was die Admin-Konsole von LearnPro heute zeigen kann.")}
      reports={[
        { name: tt("Where learners stop", "Wo Lernende aufhören"), unit: tt("stops", "Abbrüche"), bars: [{ label: tt("Why projects fail", "Warum Projekte scheitern"), value: 34 }, { label: tt("Planning a project", "Ein Projekt planen"), value: 37 }, { label: tt("Working in a team", "Im Team arbeiten"), value: 35 }, { label: tt("Managing risks", "Risiken steuern"), value: 33 }, { label: tt("Talking to stakeholders", "Mit Stakeholdern sprechen"), value: 36 }, { label: tt("Closing a project", "Ein Projekt abschließen"), value: 31 }], head: [tt("Date", "Datum"), tt("Learner", "Lernende"), tt("Last lesson opened", "Zuletzt geöffnete Lektion")], rows: stops, note: tt("Recorded events, newest last. A sample of the log; nothing is added up.", "Erfasste Ereignisse, das neueste zuletzt. Ein Ausschnitt des Protokolls; nichts wird zusammengezählt.") },
        { name: tt("Time per lesson", "Zeit pro Lektion") },
        { name: tt("Why learners leave", "Warum Lernende gehen") },
        { name: tt("What a learner already knows", "Was eine Lernende schon weiß") },
        { name: tt("Versions of each lesson", "Fassungen jeder Lektion"), head: [tt("Lesson", "Lektion"), tt("Versions", "Fassungen")], rows: [[tt("Why projects fail", "Warum Projekte scheitern"), "1"], [tt("Planning a project", "Ein Projekt planen"), "1"], [tt("Working in a team", "Im Team arbeiten"), "1"], [tt("Managing risks", "Risiken steuern"), "1"], [tt("Talking to stakeholders", "Mit Stakeholdern sprechen"), "1"], [tt("Closing a project", "Ein Projekt abschließen"), "1"]] },
      ]}
    />
  );
}

export function ObserveDay2() {
  const views: ObserveView[] = [
    { id: "today", name: tt("LearnPro today", "LearnPro heute"), node: <TodayView /> },
    { id: "comp", name: tt("A competitor's course", "Der Kurs eines Wettbewerbers"), node: <CompetitorView /> },
    { id: "voices", name: tt("What users say", "Was Nutzer sagen"), node: <VoicesDay2 /> },
    { id: "records", name: tt("What LearnPro records", "Was LearnPro erfasst"), node: <RecordsDay2 /> },
  ];
  return <ObserveButton company="LearnPro" views={views} />;
}
