"use client";

import { LearnBaseSim } from "@/components/day5/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 5 · Route 2 · "Observe the platform for real" (2026-10-18). LearnBase as it is today, what the stakeholders and users say in their own words, and what LearnBase records.
 * The brief's facts only: the platform grows but satisfaction declines, many features but little usage, internal stakeholders pursue different goals, there is no complete data on what
 * users need. No total, no verdict.
 */
function VoicesDay5() {
  return (
    <VoicesView
      intro={tt("What people inside and outside the company say, in their own words. They do not all want the same thing.", "Was Menschen innerhalb und außerhalb der Firma sagen, in ihren eigenen Worten. Sie wollen nicht alle dasselbe.")}
      voices={[
        { who: tt("Head of sales", "Leiter Vertrieb"), meta: tt("internal stakeholder", "interner Stakeholder"), text: tt("Customers ask for new things in every meeting. Each feature we add is one more thing I can show them.", "Kunden fragen in jedem Termin nach Neuem. Jedes Feature, das wir ergänzen, ist eine Sache mehr, die ich zeigen kann.") },
        { who: tt("Head of product", "Leiterin Produkt"), meta: tt("internal stakeholder", "interner Stakeholder"), text: tt("We have built a great deal. I would like to see which of it people actually use before we build more.", "Wir haben sehr viel gebaut. Ich würde gern sehen, was davon wirklich genutzt wird, bevor wir mehr bauen.") },
        { who: tt("Head of support", "Leiter Support"), meta: tt("internal stakeholder", "interner Stakeholder"), text: tt("Most of my tickets are people who cannot find something that already exists.", "Die meisten meiner Tickets sind Leute, die etwas nicht finden, das es schon gibt.") },
        { who: tt("A trainer", "Ein Trainer"), meta: tt("uses LearnBase for his courses", "nutzt LearnBase für seine Kurse"), device: tt("Laptop", "Laptop"), page: "/trainer/course-editor", channel: tt("Chat", "Chat"), text: tt("I use two screens of this platform. The rest I have never opened.", "Ich nutze zwei Bildschirme dieser Plattform. Den Rest habe ich nie geöffnet.") },
        { who: tt("A learner", "Eine Lernende"), meta: tt("rated the platform lower than last year", "hat die Plattform schlechter bewertet als letztes Jahr"), device: tt("Phone", "Handy"), page: "/home", channel: tt("Rating form", "Bewertungsformular"), text: tt("It used to be simple. Now I do not know where to click, and I am not sure what the platform is for.", "Früher war es einfach. Jetzt weiß ich nicht, wohin ich klicken soll, und bin nicht sicher, wofür die Plattform da ist.") },
      ]}
    />
  );
}

function RecordsDay5() {
  return (
    <RecordsView
      intro={tt("What LearnBase's admin console can show today.", "Was die Admin-Konsole von LearnBase heute zeigen kann.")}
      reports={[
        {
          name: tt("Feature use", "Nutzung der Features"),
          unit: tt("users", "Nutzer"),
          bars: [
            { label: tt("Course catalogue", "Kurskatalog"), value: 940 },
            { label: tt("Continue learning", "Weiterlernen"), value: 870 },
            { label: tt("Discussion forum", "Diskussionsforum"), value: 310 },
            { label: tt("Learning goals", "Lernziele"), value: 120 },
            { label: tt("Skill map", "Kompetenzkarte"), value: 95 },
            { label: tt("Badges overview", "Abzeichen-Übersicht"), value: 80 },
            { label: tt("Study groups", "Lerngruppen"), value: 70 },
            { label: tt("Content recommendations", "Inhaltsempfehlungen"), value: 60 },
            { label: tt("Peer review", "Peer-Review"), value: 15 },
          ],
          note: tt("Users who opened the feature in the last 30 days.", "Nutzer, die das Feature in den letzten 30 Tagen geöffnet haben."),
        },
        { name: tt("Satisfaction rating", "Zufriedenheitsbewertung"), unit: tt("of 5", "von 5"), max: 5, bars: [{ label: tt("Quarter 1", "Quartal 1"), value: 4.2 }, { label: tt("Quarter 2", "Quartal 2"), value: 3.8 }, { label: tt("Quarter 3", "Quartal 3"), value: 3.3 }], note: tt("Average of the rating learners give when they leave a course.", "Durchschnitt der Bewertung, die Lernende beim Verlassen eines Kurses geben.") },
        { name: tt("What users need", "Was Nutzer brauchen") },
        { name: tt("Reasons for the rating", "Gründe für die Bewertung") },
      ]}
    />
  );
}

export function ObserveDay5() {
  const views: ObserveView[] = [
    { id: "today", name: tt("LearnBase today", "LearnBase heute"), node: <LearnBaseSim /> },
    { id: "voices", name: tt("What people say", "Was Menschen sagen"), node: <VoicesDay5 /> },
    { id: "records", name: tt("What LearnBase records", "Was LearnBase erfasst"), node: <RecordsDay5 /> },
  ];
  return <ObserveButton company="LearnBase" views={views} />;
}
