"use client";

import { StructLearnSim } from "@/components/day8/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 8 · Route 2 · "Observe the platform for real" (2026-10-18). StructLearn as it is today, what users and the design team say in their own words, and what the platform records.
 * The brief's facts only: the platform has grown and become cluttered, users lose orientation, a redesign is necessary on a limited budget, there are no user tests. No total, no verdict.
 */
function VoicesDay8() {
  return (
    <VoicesView
      intro={tt("Messages from learners and from the people who build StructLearn, as they arrive.", "Nachrichten von Lernenden und von denen, die StructLearn bauen, so wie sie ankommen.")}
      voices={[
        { who: "Tom", meta: tt("learner · first week", "Lernender · erste Woche"), device: tt("Laptop", "Laptop"), page: "/hub", channel: tt("Contact form", "Kontaktformular"), text: tt("I clicked Learn, then Offers, then Hub. I still do not know where my course is.", "Ich habe auf Lernen geklickt, dann auf Angebote, dann auf Hub. Ich weiß immer noch nicht, wo mein Kurs ist.") },
        { who: "Mia", meta: tt("learner", "Lernende"), device: tt("Phone", "Handy"), page: "/start", channel: tt("Chat", "Chat"), text: tt("Every page has a different colour and five buttons. I do not know which one to press.", "Jede Seite hat eine andere Farbe und fünf Buttons. Ich weiß nicht, welchen ich drücken soll.") },
        { who: tt("A learner", "Eine Lernende"), meta: tt("support form", "Supportformular"), text: tt("I was in lesson 3, closed the page, and could not find it again. I started the course over.", "Ich war in Lektion 3, habe die Seite geschlossen und fand sie nicht wieder. Ich habe den Kurs von vorn begonnen.") },
        { who: tt("A designer", "Eine Designerin"), meta: tt("StructLearn design team", "Designteam von StructLearn"), text: tt("Every team added a banner or a colour for its own feature. Nobody has checked how the pages fit together.", "Jedes Team hat für sein Feature ein Banner oder eine Farbe ergänzt. Niemand hat geprüft, wie die Seiten zusammenpassen.") },
        { who: tt("A head of product", "Eine Leiterin Produkt"), meta: tt("our own team", "unser eigenes Team"), text: tt("We have to redesign, but there is little budget. I cannot say yet what the new look would change for learners.", "Wir müssen redesignen, aber es gibt wenig Budget. Ich kann noch nicht sagen, was der neue Look für Lernende ändern würde.") },
      ]}
    />
  );
}

function RecordsDay8() {
  return (
    <RecordsView
      intro={tt("What StructLearn's admin console can show today.", "Was die Admin-Konsole von StructLearn heute zeigen kann.")}
      reports={[
        { name: tt("Pages opened", "Geöffnete Seiten"), unit: tt("opens", "Aufrufe"), bars: [{ label: tt("Start", "Start"), value: 2450 }, { label: tt("Library", "Bibliothek"), value: 1310 }, { label: tt("Lesson pages", "Lektionsseiten"), value: 1150 }, { label: tt("Offers", "Angebote"), value: 980 }, { label: tt("Hub", "Hub"), value: 420 }], note: tt("Each opening is counted on its own. The report does not say who opened which page before.", "Jeder Aufruf wird einzeln gezählt. Der Bericht sagt nicht, wer vorher welche Seite geöffnet hat.") },
        { name: tt("Questions in the support inbox", "Fragen im Support-Postfach"), unit: tt("tickets", "Tickets"), bars: [{ label: tt("cannot find my course", "finde meinen Kurs nicht"), value: 23 }, { label: tt("cannot find my lesson", "finde meine Lektion nicht"), value: 14 }, { label: tt("which button to press", "welchen Button ich drücken soll"), value: 9 }] },
        { name: tt("Where learners get lost", "Wo Lernende sich verirren") },
        { name: tt("Tests with users", "Tests mit Nutzern"), note: tt("No test with users has been run.", "Es wurde noch kein Test mit Nutzern durchgeführt.") },
        { name: tt("The path through the platform", "Der Weg durch die Plattform") },
      ]}
    />
  );
}

export function ObserveDay8() {
  const views: ObserveView[] = [
    { id: "today", name: tt("StructLearn today", "StructLearn heute"), node: <StructLearnSim /> },
    { id: "voices", name: tt("What people say", "Was Menschen sagen"), node: <VoicesDay8 /> },
    { id: "records", name: tt("What StructLearn records", "Was StructLearn erfasst"), node: <RecordsDay8 /> },
  ];
  return <ObserveButton company="StructLearn" views={views} />;
}
