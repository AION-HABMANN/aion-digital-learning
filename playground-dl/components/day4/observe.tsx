"use client";

import { GuidedPlatformSim, LongPlatformSim } from "@/components/day4/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 4 · Route 2 · "Observe the platform for real" (2026-10-18). MotivaLearn as it is today, a competing platform as its public pages show it, what learners say in their own words
 * and what MotivaLearn records. The brief's facts only: retention is low, competitors offer a more motivating experience, the data is incomplete. No total, no verdict.
 */
function VoicesDay4() {
  return (
    <VoicesView
      intro={tt("Messages from learners and from the people who book the platform, as the feedback inbox shows them.", "Nachrichten von Lernenden und von denen, die die Plattform buchen, so wie das Feedback-Postfach sie zeigt.")}
      voices={[
        { who: "Lena", meta: tt("learner · stopped after week two", "Lernende · nach Woche zwei aufgehört"), device: tt("Laptop", "Laptop"), page: "/course/motivation/lesson-3", channel: tt("Contact form", "Kontaktformular"), text: tt("I never knew what the goal of a lesson was. I read a lot and had no idea whether I was getting anywhere.", "Ich wusste nie, was das Ziel einer Lektion war. Ich habe viel gelesen und hatte keine Ahnung, ob ich vorankomme.") },
        { who: "Tariq", meta: tt("learner · still active", "Lernender · noch aktiv"), device: tt("Phone", "Handy"), page: "/course/motivation/lesson-2", text: tt("There is no sign when I finish something. I finish a lesson and the page just stays there.", "Es gibt kein Zeichen, wenn ich etwas beende. Ich beende eine Lektion, und die Seite bleibt einfach stehen.") },
        { who: tt("An HR officer", "Eine Personalreferentin"), meta: tt("books the platform for a team", "bucht die Plattform für ein Team"), channel: tt("E-mail", "E-Mail"), text: tt("People start the course and then I hear nothing. A colleague uses another platform and says it is much more motivating.", "Die Leute beginnen den Kurs, und dann höre ich nichts mehr. Ein Kollege nutzt eine andere Plattform und sagt, sie sei viel motivierender.") },
        { who: tt("A support agent", "Ein Support-Mitarbeiter"), meta: tt("our own team", "unser eigenes Team"), text: tt("People ask how much of a course is left. There is no answer I can give them.", "Leute fragen, wie viel von einem Kurs noch kommt. Ich kann ihnen keine Antwort geben.") },
        { who: tt("A learner on a competing platform", "Eine Lernende auf einer konkurrierenden Plattform"), meta: tt("asked why she switched", "gefragt, warum sie gewechselt hat"), text: tt("I can see my progress and I get a small success every few minutes. It keeps me going.", "Ich sehe meinen Fortschritt und bekomme alle paar Minuten ein kleines Erfolgserlebnis. Das hält mich bei der Stange.") },
      ]}
    />
  );
}

function RecordsDay4() {
  return (
    <RecordsView
      intro={tt("What MotivaLearn's admin console can show today.", "Was die Admin-Konsole von MotivaLearn heute zeigen kann.")}
      reports={[
        { name: tt("Sign-ups", "Anmeldungen"), unit: tt("sign-ups", "Anmeldungen"), bars: [{ label: tt("Week 1", "Woche 1"), value: 126 }, { label: tt("Week 2", "Woche 2"), value: 118 }, { label: tt("Week 3", "Woche 3"), value: 131 }] },
        { name: tt("Course starts", "Kursstarts"), unit: tt("starts", "Starts"), bars: [{ label: tt("Week 1", "Woche 1"), value: 84 }, { label: tt("Week 2", "Woche 2"), value: 79 }, { label: tt("Week 3", "Woche 3"), value: 88 }] },
        { name: tt("Lessons finished", "Abgeschlossene Lektionen"), unit: tt("finished", "beendet"), bars: [{ label: tt("Lesson 1", "Lektion 1"), value: 71 }, { label: tt("Lesson 2", "Lektion 2"), value: 52 }, { label: tt("Lesson 3", "Lektion 3"), value: null }, { label: tt("Lesson 4", "Lektion 4"), value: null }], note: tt("Finishing is recorded only partly: some lessons have no end marker.", "Das Beenden wird nur teilweise erfasst: Manche Lektionen haben keine Endmarke.") },
        { name: tt("Time spent per lesson", "Verweildauer pro Lektion") },
        { name: tt("Reasons for leaving", "Gründe für den Abbruch") },
        { name: tt("User feedback", "Nutzerfeedback"), note: tt("No feedback is collected. The tickets in “What users say” reached support by themselves.", "Es wird kein Feedback erhoben. Die Tickets unter „Was Nutzer sagen“ kamen von selbst beim Support an.") },
      ]}
    />
  );
}

export function ObserveDay4() {
  const views: ObserveView[] = [
    { id: "today", name: tt("MotivaLearn today", "MotivaLearn heute"), node: <LongPlatformSim /> },
    { id: "comp", name: tt("A competing platform", "Eine konkurrierende Plattform"), node: <GuidedPlatformSim /> },
    { id: "voices", name: tt("What users say", "Was Nutzer sagen"), node: <VoicesDay4 /> },
    { id: "records", name: tt("What MotivaLearn records", "Was MotivaLearn erfasst"), node: <RecordsDay4 /> },
  ];
  return <ObserveButton company="MotivaLearn" views={views} />;
}
