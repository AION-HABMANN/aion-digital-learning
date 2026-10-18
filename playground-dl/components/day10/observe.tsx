"use client";

import { useState } from "react";
import clsx from "clsx";
import { TrackLearnSim } from "@/components/day10/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 10 · Route 2 · "Observe the platform for real" (2026-10-18). TrackLearn as it is today on a desktop and on a phone, what learners and the team say in their own words, and what
 * the platform records. The brief's facts only: the platform grows but retention declines, mobile use is high, feedback systems are missing, retention is not split by device.
 * No total, no verdict.
 */
function TodayView() {
  const [dev, setDev] = useState<"desktop" | "phone">("phone");
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E3E6EC] px-3 py-2 text-[13px]" role="group" aria-label={tt("Open TrackLearn on", "TrackLearn öffnen auf")}>
        <span className="text-[#5F5E5A]">{tt("Open TrackLearn on:", "TrackLearn öffnen auf:")}</span>
        {(["phone", "desktop"] as const).map((k) => (
          <button key={k} type="button" aria-pressed={dev === k} onClick={() => setDev(k)} className={clsx("min-h-[34px] rounded px-3", dev === k ? "bg-[#3F4A58] text-white" : "bg-[#EEF1F5]")}>
            {k === "phone" ? tt("A phone", "Ein Handy") : tt("A desktop", "Ein Desktop")}
          </button>
        ))}
      </div>
      <TrackLearnSim key={dev} phone={dev === "phone"} />
    </div>
  );
}

function VoicesDay10() {
  return (
    <VoicesView
      intro={tt("Messages from learners and from the team, as they arrive.", "Nachrichten von Lernenden und vom Team, so wie sie ankommen.")}
      voices={[
        { who: "Kim", meta: tt("learner · phone", "Lernende · Handy"), text: tt("I finish a task and nothing happens. I do not know if it counted, so I do it again.", "Ich beende eine Aufgabe, und nichts passiert. Ich weiß nicht, ob sie zählte, also mache ich sie nochmals.") },
        { who: "Raj", meta: tt("learner · half way through a course", "Lernender · halb durch einen Kurs"), text: tt("I have no idea how much is left. Finished lessons look just like new ones.", "Ich habe keine Ahnung, wie viel noch kommt. Erledigte Lektionen sehen aus wie neue.") },
        { who: "Nia", meta: tt("learner · on the train, phone", "Lernende · im Zug, Handy"), text: tt("The page is made for a big screen. The text runs off the edge and the Next button is tiny.", "Die Seite ist für einen großen Bildschirm gemacht. Der Text läuft über den Rand, und der Weiter-Button ist winzig.") },
        { who: "Jo", meta: tt("learner · outdoors · hand shakes a little", "Lernende · draußen · Hand zittert leicht"), text: tt("I miss the buttons, I cannot read the pale text in the sun, and I cannot tell which lessons are done.", "Ich verfehle die Buttons, kann den blassen Text in der Sonne nicht lesen und weiß nicht, welche Lektionen erledigt sind.") },
        { who: tt("A head of product", "Eine Leiterin Produkt"), meta: tt("our own team", "unser eigenes Team"), text: tt("We are growing, but fewer people come back. Most use a phone, and I cannot say whether they come back less than the others.", "Wir wachsen, aber weniger Leute kommen zurück. Die meisten nutzen ein Handy, und ich kann nicht sagen, ob sie seltener zurückkommen als die anderen.") },
      ]}
    />
  );
}

function RecordsDay10() {
  return (
    <RecordsView
      intro={tt("What TrackLearn's admin console can show today.", "Was die Admin-Konsole von TrackLearn heute zeigen kann.")}
      reports={[
        { name: tt("Visits", "Besuche"), head: [tt("Week", "Woche"), tt("Event", "Ereignis")], rows: [[tt("Week 1", "Woche 1"), tt("visits recorded", "Besuche erfasst")], [tt("Week 2", "Woche 2"), tt("visits recorded", "Besuche erfasst")], [tt("Week 3", "Woche 3"), tt("visits recorded", "Besuche erfasst")]], note: tt("Visits are recorded for the whole platform, not by device.", "Besuche werden für die ganze Plattform erfasst, nicht nach Gerät.") },
        { name: tt("Finished lessons", "Beendete Lektionen"), head: [tt("Lesson", "Lektion"), tt("Finished", "Beendet")], rows: [[tt("Lesson 1", "Lektion 1"), tt("recorded", "erfasst")], [tt("Lesson 2", "Lektion 2"), tt("recorded", "erfasst")], [tt("Lesson 3", "Lektion 3"), tt("recorded", "erfasst")]] },
        { name: tt("Return visits by device", "Wiederkehr pro Gerät") },
        { name: tt("Where learners stop on a phone", "Wo Lernende auf dem Handy aufhören") },
        { name: tt("Tests of a progress display with users", "Tests einer Fortschrittsanzeige mit Nutzern"), note: tt("No test has been run.", "Es wurde noch kein Test durchgeführt.") },
      ]}
    />
  );
}

export function ObserveDay10() {
  const views: ObserveView[] = [
    { id: "today", name: tt("TrackLearn today", "TrackLearn heute"), node: <TodayView /> },
    { id: "voices", name: tt("What people say", "Was Menschen sagen"), node: <VoicesDay10 /> },
    { id: "records", name: tt("What TrackLearn records", "Was TrackLearn erfasst"), node: <RecordsDay10 /> },
  ];
  return <ObserveButton company="TrackLearn" views={views} />;
}
