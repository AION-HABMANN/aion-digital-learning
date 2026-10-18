"use client";

import { NavLearnSim } from "@/components/day9/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 9 · Route 2 · "Observe the platform for real" (2026-10-18). NavLearn as it is today, what learners and the team say in their own words, and what the platform records.
 * The brief's facts only: the platform grows without structure, users lose orientation, engagement is declining, the platform does not record the path a learner takes. No total, no verdict.
 */
function VoicesDay9() {
  return (
    <VoicesView
      intro={tt("Messages from learners and from the team, as they arrive.", "Nachrichten von Lernenden und vom Team, so wie sie ankommen.")}
      voices={[
        { who: "Ana", meta: tt("learner · wants her certificate", "Lernende · will ihr Zertifikat"), device: tt("Laptop", "Laptop"), page: "/archive", channel: tt("Contact form", "Kontaktformular"), text: tt("I looked in Library, then Records, then Archive. I found it in the end, but I had to try them all.", "Ich habe in Bibliothek, dann in Nachweise, dann in Archiv gesucht. Am Ende habe ich es gefunden, aber ich musste alle probieren.") },
        { who: "Sam", meta: tt("learner", "Lernender"), device: tt("Laptop", "Laptop"), page: "/hub", channel: tt("E-mail", "E-Mail"), text: tt("There are sixteen items in the menu in no order I can see. “Courses (old)” and “Library” look like the same thing.", "Im Menü stehen sechzehn Einträge in einer Reihenfolge, die ich nicht erkennen kann. „Kurse (alt)“ und „Bibliothek“ sehen aus wie dasselbe.") },
        { who: "Lea", meta: tt("learner · still active", "Lernende · noch aktiv"), text: tt("Each lesson is a page of text and a Next button. I read, press, read, press. After a while I stop.", "Jede Lektion ist eine Textseite und ein Weiter-Button. Ich lese, drücke, lese, drücke. Nach einer Weile höre ich auf.") },
        { who: tt("A content author", "Ein Content-Autor"), meta: tt("NavLearn team", "NavLearn-Team"), text: tt("When I add a course I put it where there is room. Nobody told me where it belongs.", "Wenn ich einen Kurs ergänze, lege ich ihn dorthin, wo Platz ist. Niemand hat mir gesagt, wohin er gehört.") },
        { who: tt("A head of product", "Eine Leiterin Produkt"), meta: tt("our own team", "unser eigenes Team"), text: tt("Engagement is falling. I do not know whether people leave because they cannot find things or because they are bored.", "Das Engagement sinkt. Ich weiß nicht, ob Leute gehen, weil sie Dinge nicht finden oder weil sie sich langweilen.") },
      ]}
    />
  );
}

function RecordsDay9() {
  return (
    <RecordsView
      intro={tt("What NavLearn's admin console can show today.", "Was die Admin-Konsole von NavLearn heute zeigen kann.")}
      reports={[
        { name: tt("Page views", "Seitenaufrufe"), unit: tt("views", "Aufrufe"), bars: [{ label: tt("Hub", "Hub"), value: 1900 }, { label: tt("Library", "Bibliothek"), value: 1640 }, { label: tt("Courses (old)", "Kurse (alt)"), value: 1210 }, { label: tt("Lesson pages", "Lektionsseiten"), value: 2380 }, { label: tt("Records", "Nachweise"), value: 540 }], note: tt("Each view is recorded on its own. The report does not say who opened which page before.", "Jeder Aufruf wird einzeln erfasst. Der Bericht sagt nicht, wer vorher welche Seite geöffnet hat.") },
        { name: tt("Quiz answers", "Quizantworten"), unit: tt("answered", "beantwortet"), bars: [{ label: tt("Quiz in lesson 1", "Quiz in Lektion 1"), value: 520 }, { label: tt("Quiz in lesson 2", "Quiz in Lektion 2"), value: 410 }, { label: tt("Quiz in lesson 3", "Quiz in Lektion 3"), value: 290 }] },
        { name: tt("The path a learner takes", "Der Weg, den eine Lernende nimmt") },
        { name: tt("Where learners stop", "Wo Lernende aufhören") },
        { name: tt("Tests of the menu names with users", "Tests der Menünamen mit Nutzern"), note: tt("No test has been run.", "Es wurde noch kein Test durchgeführt.") },
      ]}
    />
  );
}

export function ObserveDay9() {
  const views: ObserveView[] = [
    { id: "today", name: tt("NavLearn today", "NavLearn heute"), node: <NavLearnSim /> },
    { id: "voices", name: tt("What people say", "Was Menschen sagen"), node: <VoicesDay9 /> },
    { id: "records", name: tt("What NavLearn records", "Was NavLearn erfasst"), node: <RecordsDay9 /> },
  ];
  return <ObserveButton company="NavLearn" views={views} />;
}
