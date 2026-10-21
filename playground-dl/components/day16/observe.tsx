"use client";

import { ConsoleSim } from "@/components/day16/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 16 · Route 2 · "Observe the platform for real". DataLearn's console as it is today, what learners and the team say in their own words, and what the platform records. The
 * brief's facts only: a platform with declining performance, a lot of data and unclear causes. No total, no verdict, no figure.
 */
function VoicesDay16() {
  return (
    <VoicesView
      intro={tt("Messages from learners and from the people who run DataLearn, as they arrive.", "Nachrichten von Lernenden und von denen, die DataLearn betreiben, so wie sie ankommen.")}
      voices={[
        { who: "Sam", meta: tt("learner · stopped", "Lernender · aufgehört"), device: tt("Laptop", "Laptop"), page: "/lesson", channel: tt("Help form", "Hilfeformular"), text: tt("I do not know what to do first. I looked around for a few minutes and left.", "Ich weiß nicht, was ich zuerst tun soll. Ich habe mich ein paar Minuten umgesehen und bin gegangen.") },
        { who: "Lin", meta: tt("learner · on and off", "Lernende · mal ja, mal nein"), device: tt("Phone", "Handy"), page: "/course", channel: tt("E-mail", "E-Mail"), text: tt("I keep getting e-mails to come back, but nothing on the page has changed.", "Ich bekomme ständig E-Mails, ich solle zurückkommen, aber auf der Seite hat sich nichts geändert.") },
        { who: tt("A head of product", "Ein Leiter Produkt"), meta: tt("our own team", "unser eigenes Team"), text: tt("We have tracking for everything and we tried three things. Nothing moved the drop-out. I do not know what to try next.", "Wir tracken alles und haben drei Dinge versucht. Nichts hat die Abbrüche bewegt. Ich weiß nicht, was wir als Nächstes versuchen sollen.") },
        { who: tt("A data analyst", "Eine Datenanalystin"), meta: tt("DataLearn team", "DataLearn-Team"), text: tt("I can show you any chart you like. I cannot tell you why people leave, because nobody asked a question first.", "Ich kann Ihnen jedes Diagramm zeigen, das Sie wollen. Ich kann nicht sagen, warum Menschen gehen, weil niemand zuerst eine Frage gestellt hat.") },
        { who: tt("A designer", "Eine Designerin"), meta: tt("DataLearn team", "DataLearn-Team"), text: tt("Nobody has watched a learner use the platform in months. We only look at the numbers.", "Seit Monaten hat niemand einer Lernenden bei der Nutzung der Plattform zugesehen. Wir sehen nur auf die Zahlen.") },
      ]}
    />
  );
}

function RecordsDay16() {
  return (
    <RecordsView
      intro={tt("What DataLearn's admin console can show today.", "Was die Admin-Konsole von DataLearn heute zeigen kann.")}
      reports={[
        { name: tt("Clicks, time spent and drop-off points", "Klicks, Verweildauer und Abspringstellen"), note: tt("Tracked for every page.", "Für jede Seite erfasst.") },
        { name: tt("Whether a measure had an effect", "Ob eine Maßnahme gewirkt hat"), note: tt("Three measures tried; none moved the drop-out.", "Drei Maßnahmen versucht; keine hat die Abbrüche bewegt.") },
        { name: tt("Why learners leave", "Warum Lernende gehen"), note: tt("Not recorded.", "Nicht erfasst.") },
        { name: tt("Hypotheses behind a measure", "Hypothesen hinter einer Maßnahme"), note: tt("None written.", "Keine geschrieben.") },
        { name: tt("Tests with learners", "Tests mit Lernenden"), note: tt("None recently.", "In letzter Zeit keine.") },
      ]}
    />
  );
}

export function ObserveDay16() {
  const views: ObserveView[] = [
    { id: "today", name: tt("DataLearn's console today", "DataLearns Konsole heute"), node: <ConsoleSim /> },
    { id: "voices", name: tt("What people say", "Was Menschen sagen"), node: <VoicesDay16 /> },
    { id: "records", name: tt("What DataLearn records", "Was DataLearn erfasst"), node: <RecordsDay16 /> },
  ];
  return <ObserveButton company="DataLearn" views={views} />;
}
