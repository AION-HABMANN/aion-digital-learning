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
        { who: tt("A learner", "Eine Lernende"), meta: tt("e-mail · uses a screen reader", "E-Mail · nutzt einen Screenreader"), text: tt("The quiz asks me to drag items into boxes. I cannot do that with my keyboard.", "Das Quiz verlangt, Elemente in Kästen zu ziehen. Das kann ich mit meiner Tastatur nicht.") },
        { who: tt("A learner", "Ein Lernender"), meta: tt("e-mail · learns in his second language", "E-Mail · lernt in seiner Zweitsprache"), text: tt("The sign-up speaks in long legal sentences. I do not understand what I am agreeing to.", "Die Anmeldung spricht in langen juristischen Sätzen. Ich verstehe nicht, wozu ich zustimme.") },
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
        { name: tt("Lessons opened", "Geöffnete Lektionen"), head: [tt("Lesson", "Lektion"), tt("Opened", "Geöffnet")], rows: [[tt("Welcome", "Willkommen"), tt("recorded", "erfasst")], [tt("The first quiz", "Das erste Quiz"), tt("recorded", "erfasst")], [tt("Plain language", "Einfache Sprache"), tt("recorded", "erfasst")]], note: tt("The report shows the lesson, not the person.", "Der Bericht zeigt die Lektion, nicht die Person.") },
        { name: tt("Quizzes finished", "Beendete Quizze"), head: [tt("Quiz", "Quiz"), tt("Finished", "Beendet")], rows: [[tt("Quiz 1", "Quiz 1"), tt("recorded", "erfasst")], [tt("Quiz 2", "Quiz 2"), tt("recorded", "erfasst")]] },
        { name: tt("Complaints in the support inbox", "Beschwerden im Support-Postfach"), head: [tt("Date", "Datum"), tt("Topic", "Thema")], rows: [["03 Mar", tt("captions", "Untertitel")], ["04 Mar", tt("text size", "Textgröße")], ["04 Mar", tt("keyboard", "Tastatur")], ["06 Mar", tt("language", "Sprache")]] },
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
