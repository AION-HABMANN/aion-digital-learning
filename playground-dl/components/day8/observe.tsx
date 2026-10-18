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
        { who: "Tom", meta: tt("learner · first week", "Lernender · erste Woche"), text: tt("I clicked Learn, then Offers, then Hub. I still do not know where my course is.", "Ich habe auf Lernen geklickt, dann auf Angebote, dann auf Hub. Ich weiß immer noch nicht, wo mein Kurs ist.") },
        { who: "Mia", meta: tt("learner · phone", "Lernende · Handy"), text: tt("Every page has a different colour and five buttons. I do not know which one to press.", "Jede Seite hat eine andere Farbe und fünf Buttons. Ich weiß nicht, welchen ich drücken soll.") },
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
        { name: tt("Pages opened", "Geöffnete Seiten"), head: [tt("Page", "Seite"), tt("Opened", "Geöffnet")], rows: [[tt("Start", "Start"), tt("recorded", "erfasst")], [tt("Library", "Bibliothek"), tt("recorded", "erfasst")], [tt("Offers", "Angebote"), tt("recorded", "erfasst")], [tt("Hub", "Hub"), tt("recorded", "erfasst")], [tt("Lesson pages", "Lektionsseiten"), tt("recorded", "erfasst")]] },
        { name: tt("Questions in the support inbox", "Fragen im Support-Postfach"), head: [tt("Date", "Datum"), tt("Topic", "Thema")], rows: [["02 Mar", tt("cannot find my course", "finde meinen Kurs nicht")], ["03 Mar", tt("which button to press", "welchen Button ich drücken soll")], ["04 Mar", tt("cannot find my lesson", "finde meine Lektion nicht")], ["06 Mar", tt("cannot find my course", "finde meinen Kurs nicht")]] },
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
