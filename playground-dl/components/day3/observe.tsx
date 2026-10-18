"use client";

import { EduCoreSim } from "@/components/day3/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 3 · Route 2 · "Observe the platform for real" (2026-10-18). EduCore as it is today, what professional learners say in their own words, and what EduCore records. The brief's
 * facts only: the platform is rated "too complicated", the content is professionally necessary but hard to understand, there is no user data. No total, no verdict.
 */
function VoicesDay3() {
  return (
    <VoicesView
      intro={tt("Messages and ratings from learners, as the feedback form of EduCore shows them.", "Nachrichten und Bewertungen von Lernenden, so wie das Feedbackformular von EduCore sie zeigt.")}
      voices={[
        { who: tt("A nurse manager", "Eine Pflegedienstleiterin"), meta: tt("needs the module for her certificate · rating “too complicated”", "braucht das Modul für ihr Zertifikat · Bewertung „zu kompliziert“"), text: tt("I need this for my certificate, so I will get through it. But I read each paragraph three times and I still do not know what to remember.", "Ich brauche das für mein Zertifikat, ich komme also durch. Aber ich lese jeden Absatz dreimal und weiß trotzdem nicht, was ich mir merken soll.") },
        { who: tt("A site engineer", "Ein Bauleiter"), meta: tt("tablet · rating “too complicated”", "Tablet · Bewertung „zu kompliziert“"), text: tt("There is a diagram, a table, two boxes and a video on one screen. I do not know where to start.", "Auf einem Bildschirm sind ein Diagramm, eine Tabelle, zwei Kästen und ein Video. Ich weiß nicht, wo ich anfangen soll.") },
        { who: tt("A tax adviser", "Ein Steuerberater"), meta: tt("laptop · no rating", "Laptop · keine Bewertung"), text: tt("The content is right and I need all of it. I just wish it came in smaller pieces.", "Der Inhalt stimmt, und ich brauche alles davon. Ich wünschte nur, er käme in kleineren Stücken.") },
        { who: tt("A training manager", "Eine Weiterbildungsleiterin"), meta: tt("books EduCore for her firm", "bucht EduCore für ihre Firma"), text: tt("My people call the platform “too complicated”. When I ask what they mean, they say the content, not the buttons.", "Meine Leute nennen die Plattform „zu kompliziert“. Wenn ich frage, was sie meinen, sagen sie: den Inhalt, nicht die Buttons.") },
        { who: tt("A support agent", "Ein Support-Mitarbeiter"), meta: tt("our own team", "unser eigenes Team"), text: tt("“Too complicated” is the phrase I hear most. Nobody has told me which lesson it is about.", "„Zu kompliziert“ ist der Satz, den ich am häufigsten höre. Niemand hat mir gesagt, um welche Lektion es geht.") },
      ]}
    />
  );
}

function RecordsDay3() {
  return (
    <RecordsView
      intro={tt("What EduCore's admin console can show today.", "Was die Admin-Konsole von EduCore heute zeigen kann.")}
      reports={[
        {
          name: tt("Learner ratings", "Bewertungen der Lernenden"),
          head: [tt("Date", "Datum"), tt("Module", "Modul"), tt("Rating", "Bewertung")],
          rows: [
            ["02 Mar", tt("Data protection basics", "Datenschutz-Grundlagen"), tt("too complicated", "zu kompliziert")],
            ["02 Mar", tt("Contract law, part 1", "Vertragsrecht, Teil 1"), tt("too complicated", "zu kompliziert")],
            ["03 Mar", tt("Data protection basics", "Datenschutz-Grundlagen"), tt("good content", "guter Inhalt")],
            ["04 Mar", tt("Hygiene rules", "Hygieneregeln"), tt("too complicated", "zu kompliziert")],
            ["05 Mar", tt("Contract law, part 1", "Vertragsrecht, Teil 1"), tt("too complicated", "zu kompliziert")],
            ["05 Mar", tt("Hygiene rules", "Hygieneregeln"), tt("too long", "zu lang")],
          ],
          note: tt("Free-form ratings, newest last. A sample; nothing is added up.", "Freie Bewertungen, die neueste zuletzt. Ein Ausschnitt; nichts wird zusammengezählt."),
        },
        { name: tt("Time on each screen", "Zeit auf jedem Bildschirm") },
        { name: tt("Where learners reread or leave", "Wo Lernende nachlesen oder gehen") },
        { name: tt("Tests with users", "Tests mit Nutzern") },
      ]}
    />
  );
}

export function ObserveDay3() {
  const views: ObserveView[] = [
    { id: "today", name: tt("EduCore today", "EduCore heute"), node: <EduCoreSim /> },
    { id: "voices", name: tt("What users say", "Was Nutzer sagen"), node: <VoicesDay3 /> },
    { id: "records", name: tt("What EduCore records", "Was EduCore erfasst"), node: <RecordsDay3 /> },
  ];
  return <ObserveButton company="EduCore" views={views} />;
}
