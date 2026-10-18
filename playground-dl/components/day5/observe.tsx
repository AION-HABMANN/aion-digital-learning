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
        { who: tt("A trainer", "Ein Trainer"), meta: tt("uses LearnBase for his courses", "nutzt LearnBase für seine Kurse"), text: tt("I use two screens of this platform. The rest I have never opened.", "Ich nutze zwei Bildschirme dieser Plattform. Den Rest habe ich nie geöffnet.") },
        { who: tt("A learner", "Eine Lernende"), meta: tt("rated the platform lower than last year", "hat die Plattform schlechter bewertet als letztes Jahr"), text: tt("It used to be simple. Now I do not know where to click, and I am not sure what the platform is for.", "Früher war es einfach. Jetzt weiß ich nicht, wohin ich klicken soll, und bin nicht sicher, wofür die Plattform da ist.") },
      ]}
    />
  );
}

function RecordsDay5() {
  const feature = (a: string, b: string, c: string): string[] => [tt(a, b), c];
  return (
    <RecordsView
      intro={tt("What LearnBase's admin console can show today.", "Was die Admin-Konsole von LearnBase heute zeigen kann.")}
      reports={[
        {
          name: tt("Feature use", "Nutzung der Features"),
          head: [tt("Feature", "Feature"), tt("Opened in the last month", "Im letzten Monat geöffnet")],
          rows: [
            feature("Course catalogue", "Kurskatalog", tt("by most users", "von den meisten Nutzern")),
            feature("Continue learning", "Weiterlernen", tt("by most users", "von den meisten Nutzern")),
            feature("Discussion forum", "Diskussionsforum", tt("by some users", "von einigen Nutzern")),
            feature("Learning goals", "Lernziele", tt("by a few users", "von wenigen Nutzern")),
            feature("Skill map", "Kompetenzkarte", tt("by a few users", "von wenigen Nutzern")),
            feature("Badges overview", "Abzeichen-Übersicht", tt("by a few users", "von wenigen Nutzern")),
            feature("Study groups", "Lerngruppen", tt("by a few users", "von wenigen Nutzern")),
            feature("Content recommendations", "Inhaltsempfehlungen", tt("by a few users", "von wenigen Nutzern")),
            feature("Peer review", "Peer-Review", tt("by almost nobody", "von fast niemandem")),
          ],
          note: tt("Words only; the console shows no counts.", "Nur Worte; die Konsole zeigt keine Zahlen."),
        },
        {
          name: tt("Satisfaction rating", "Zufriedenheitsbewertung"),
          head: [tt("Quarter", "Quartal"), tt("What the ratings say", "Was die Bewertungen sagen")],
          rows: [[tt("Quarter 1", "Quartal 1"), tt("mostly good", "überwiegend gut")], [tt("Quarter 2", "Quartal 2"), tt("mixed", "gemischt")], [tt("Quarter 3", "Quartal 3"), tt("more complaints than praise", "mehr Beschwerden als Lob")]],
        },
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
