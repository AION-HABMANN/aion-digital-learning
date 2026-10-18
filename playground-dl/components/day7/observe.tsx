"use client";

import { InclusiveLearnSim } from "@/components/day7/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 7 · Route 2 · "Observe the platform for real" (2026-10-18). InclusiveLearn as it is today, what users say in their own words (most do not say who they are), and what the
 * platform records. The brief's facts only: users with impairments drop out, the content is hard to understand, usage is low despite good content, there is no complete user data.
 * No total, no verdict.
 */
function VoicesDay7() {
  return (
    <VoicesView
      intro={tt("Complaints from the support inbox, as they arrive. Most do not say who is writing.", "Beschwerden aus dem Support-Postfach, so wie sie ankommen. Die meisten sagen nicht, wer schreibt.")}
      voices={[
        { who: tt("Anonymous", "Anonym"), meta: tt("support form", "Supportformular"), text: tt("The video has no captions. I cannot follow it.", "Das Video hat keine Untertitel. Ich kann ihm nicht folgen.") },
        { who: tt("Anonymous", "Anonym"), meta: tt("support form", "Supportformular"), text: tt("The text is very small and the grey is too pale. I gave up after one page.", "Der Text ist sehr klein und das Grau zu blass. Ich habe nach einer Seite aufgegeben.") },
        { who: tt("A learner", "Eine Lernende"), meta: tt("learner · uses a screen reader", "Lernende · nutzt einen Screenreader"), device: tt("Laptop", "Laptop"), page: "/lesson/the-first-quiz", channel: tt("E-mail", "E-Mail"), text: tt("The quiz asks me to drag items into boxes. I cannot do that with my keyboard.", "Das Quiz verlangt, Elemente in Kästen zu ziehen. Das kann ich mit meiner Tastatur nicht.") },
        { who: tt("A learner", "Ein Lernender"), meta: tt("learner · learns in his second language", "Lernender · lernt in seiner Zweitsprache"), device: tt("Phone", "Handy"), page: "/sign-up", channel: tt("E-mail", "E-Mail"), text: tt("The sign-up speaks in long legal sentences. I do not understand what I am agreeing to.", "Die Anmeldung spricht in langen juristischen Sätzen. Ich verstehe nicht, wozu ich zustimme.") },
        { who: tt("A training manager", "Eine Weiterbildungsleiterin"), meta: tt("books the platform for a firm", "bucht die Plattform für eine Firma"), text: tt("The content is good, but fewer people use it than I expected. I do not know who is staying away or why.", "Der Inhalt ist gut, aber weniger Leute nutzen ihn, als ich erwartet habe. Ich weiß nicht, wer wegbleibt oder warum.") },
      ]}
    />
  );
}

function RecordsDay7() {
  return (
    <RecordsView
      intro={tt("What InclusiveLearn's admin console can show today.", "Was die Admin-Konsole von InclusiveLearn heute zeigen kann.")}
      reports={[
        { name: tt("Lessons opened", "Geöffnete Lektionen"), unit: tt("opens", "Aufrufe"), bars: [{ label: tt("Welcome", "Willkommen"), value: 1480 }, { label: tt("The first quiz", "Das erste Quiz"), value: 910 }, { label: tt("Plain language", "Einfache Sprache"), value: 640 }], note: tt("The report shows the lesson, not the person.", "Der Bericht zeigt die Lektion, nicht die Person.") },
        { name: tt("Quizzes finished", "Beendete Quizze"), unit: tt("finished", "beendet"), bars: [{ label: tt("Quiz 1", "Quiz 1"), value: 530 }, { label: tt("Quiz 2", "Quiz 2"), value: 360 }] },
        { name: tt("Complaints in the support inbox", "Beschwerden im Support-Postfach"), unit: tt("tickets", "Tickets"), bars: [{ label: tt("captions", "Untertitel"), value: 11 }, { label: tt("text size", "Textgröße"), value: 8 }, { label: tt("keyboard", "Tastatur"), value: 6 }, { label: tt("language", "Sprache"), value: 5 }], note: tt("Counted by the topic the agent chose. The report does not say who wrote.", "Gezählt nach dem Thema, das der Mitarbeiter gewählt hat. Der Bericht sagt nicht, wer geschrieben hat.") },
        { name: tt("Success or drop-out by user group", "Erfolg oder Abbruch pro Nutzergruppe") },
        { name: tt("Reasons for leaving", "Gründe für den Abbruch") },
        { name: tt("Feedback from users with impairments", "Feedback von Nutzern mit Einschränkungen"), note: tt("No feedback has been collected from this group.", "Von dieser Gruppe wurde kein Feedback erhoben.") },
      ]}
    />
  );
}

export function ObserveDay7() {
  const views: ObserveView[] = [
    { id: "today", name: tt("InclusiveLearn today", "InclusiveLearn heute"), node: <InclusiveLearnSim /> },
    { id: "voices", name: tt("What users say", "Was Nutzer sagen"), node: <VoicesDay7 /> },
    { id: "records", name: tt("What InclusiveLearn records", "Was InclusiveLearn erfasst"), node: <RecordsDay7 /> },
  ];
  return <ObserveButton company="InclusiveLearn" views={views} />;
}
