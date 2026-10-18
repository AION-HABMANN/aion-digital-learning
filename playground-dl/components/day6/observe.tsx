"use client";

import { EduPathSim } from "@/components/day6/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 6 · Route 2 · "Observe the platform for real" (2026-10-18). EduPath as its learners and teachers meet it, what each group says in its own words, and what EduPath records.
 * The brief's facts only: different user groups with conflicting needs, learners say they have little time and drop out, teachers say the platform is too complicated, the organisation
 * says usage is low, nobody can say which group matters most. No total, no verdict.
 */
function VoicesDay6() {
  return (
    <VoicesView
      intro={tt("Each group in its own words. Their needs do not fit together easily.", "Jede Gruppe in ihren eigenen Worten. Ihre Bedürfnisse passen nicht leicht zusammen.")}
      voices={[
        { who: "Mia", meta: tt("learner · works full time", "Lernende · arbeitet Vollzeit"), device: tt("Phone", "Handy"), page: "/course/project-management/unit-3", channel: tt("Chat", "Chat"), text: tt("A unit takes forty-five minutes and I have fifteen at lunch. I start, get interrupted, and do not come back.", "Eine Einheit dauert fünfundvierzig Minuten, und ich habe in der Mittagspause fünfzehn. Ich fange an, werde unterbrochen und komme nicht wieder.") },
        { who: "Jonas", meta: tt("learner · studies in the evening", "Lernender · lernt abends"), text: tt("I like the long units. I want to go deep, not tap through small pieces.", "Ich mag die langen Einheiten. Ich will in die Tiefe gehen, nicht durch kleine Stücke tippen.") },
        { who: tt("A teacher", "Eine Lehrende"), meta: tt("builds courses on EduPath", "baut Kurse auf EduPath"), device: tt("Laptop", "Laptop"), page: "/teacher/course-editor/settings", channel: tt("E-mail", "E-Mail"), text: tt("There are nine tabs and I use two of them. Every course takes me longer to set up than the lessons themselves.", "Es gibt neun Tabs, und ich nutze zwei davon. Jeder Kurs braucht länger in der Einrichtung als die Lektionen selbst.") },
        { who: tt("A second teacher", "Eine zweite Lehrende"), meta: tt("teaches a certificate course", "unterrichtet einen Zertifikatskurs"), text: tt("My learners need the whole content in order. Please do not cut it into snacks.", "Meine Lernenden brauchen den ganzen Inhalt in Reihenfolge. Bitte schneiden Sie ihn nicht in Häppchen.") },
        { who: tt("The organisation", "Die Organisation"), meta: tt("the customer who pays", "der zahlende Kunde"), text: tt("We pay for many seats, and I see that few people use them. I need to show that the money is well spent.", "Wir zahlen für viele Plätze, und ich sehe, dass wenige sie nutzen. Ich muss zeigen, dass das Geld gut angelegt ist.") },
      ]}
    />
  );
}

function RecordsDay6() {
  return (
    <RecordsView
      intro={tt("What EduPath's admin console can show today.", "Was die Admin-Konsole von EduPath heute zeigen kann.")}
      reports={[
        { name: tt("Accounts by role", "Konten nach Rolle"), unit: tt("accounts", "Konten"), bars: [{ label: tt("Learners", "Lernende"), value: 4200 }, { label: tt("Teachers", "Lehrende"), value: 310 }, { label: tt("Organisation administrators", "Administratoren der Organisation"), value: 45 }] },
        { name: tt("Logins per month", "Anmeldungen pro Monat"), unit: tt("logins", "Anmeldungen"), bars: [{ label: tt("Month 1", "Monat 1"), value: 8200 }, { label: tt("Month 2", "Monat 2"), value: 10400 }, { label: tt("Month 3", "Monat 3"), value: 13100 }], note: tt("Logins are recorded for the whole platform, not per role. The report cannot be split by group.", "Anmeldungen werden für die ganze Plattform erfasst, nicht pro Rolle. Der Bericht lässt sich nicht nach Gruppen aufteilen.") },
        { name: tt("What each group wants to achieve", "Was jede Gruppe erreichen will") },
        { name: tt("Which group matters most", "Welche Gruppe am wichtigsten ist") },
        { name: tt("Learner journeys", "Lernwege der Lernenden") },
      ]}
    />
  );
}

export function ObserveDay6() {
  const views: ObserveView[] = [
    { id: "today", name: tt("EduPath today", "EduPath heute"), node: <EduPathSim /> },
    { id: "voices", name: tt("What the groups say", "Was die Gruppen sagen"), node: <VoicesDay6 /> },
    { id: "records", name: tt("What EduPath records", "Was EduPath erfasst"), node: <RecordsDay6 /> },
  ];
  return <ObserveButton company="EduPath" views={views} />;
}
