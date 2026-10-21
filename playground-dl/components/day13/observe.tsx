"use client";

import { AccessLearnSim } from "@/components/day13/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 13 · Route 2 · "Observe the platform for real". AccessLearn as it is today, what learners and the team say in their own words, and what the platform records. The brief's
 * facts only: a platform that must become accessible, a limited budget and increasing requirements. No total, no verdict, no figure.
 */
function VoicesDay13() {
  return (
    <VoicesView
      intro={tt("Messages from learners and from the people who run AccessLearn, as they arrive.", "Nachrichten von Lernenden und von denen, die AccessLearn betreiben, so wie sie ankommen.")}
      voices={[
        { who: "Mia", meta: tt("learner · low vision", "Lernende · eingeschränktes Sehvermögen"), device: tt("Laptop", "Laptop"), page: "/lesson", channel: tt("Help form", "Hilfeformular"), text: tt("I cannot read the lesson text. It is pale grey on white and very small.", "Ich kann den Lektionstext nicht lesen. Er ist hellgrau auf Weiß und sehr klein.") },
        { who: "Tom", meta: tt("learner · keyboard only", "Lernender · nur Tastatur"), device: tt("Laptop", "Laptop"), page: "/home", channel: tt("E-mail", "E-Mail"), text: tt("The menu does not open with Tab. I cannot get to my course.", "Das Menü öffnet sich nicht mit Tab. Ich komme nicht an meinen Kurs.") },
        { who: "Nia", meta: tt("learner · long text is hard", "Lernende · langer Text fällt schwer"), device: tt("Phone", "Handy"), page: "/catalog", channel: tt("Chat", "Chat"), text: tt("I clicked through four levels of the catalogue and still did not find my course.", "Ich habe mich durch vier Ebenen des Katalogs geklickt und meinen Kurs trotzdem nicht gefunden.") },
        { who: tt("Support", "Support"), meta: tt("our own team", "unser eigenes Team"), text: tt("The complaints keep coming, and some now mention the law. I do not know what to tell people.", "Die Beschwerden hören nicht auf, und einige erwähnen inzwischen das Gesetz. Ich weiß nicht, was ich den Leuten sagen soll.") },
        { who: tt("A content editor", "Eine Redakteurin"), meta: tt("AccessLearn team", "AccessLearn-Team"), text: tt("We have a lot of lessons, videos and charts. Nobody knows how many have a text version.", "Wir haben viele Lektionen, Videos und Diagramme. Niemand weiß, wie viele eine Textfassung haben.") },
      ]}
    />
  );
}

function RecordsDay13() {
  return (
    <RecordsView
      intro={tt("What AccessLearn's admin console can show today.", "Was die Admin-Konsole von AccessLearn heute zeigen kann.")}
      reports={[
        { name: tt("Complaints about the platform", "Beschwerden über die Plattform"), note: tt("They are increasing. The console does not sort them by kind.", "Sie nehmen zu. Die Konsole sortiert sie nicht nach Art.") },
        { name: tt("Which pages fail WCAG", "Welche Seiten WCAG nicht erfüllen"), note: tt("Nobody has audited the platform.", "Niemand hat die Plattform auditiert.") },
        { name: tt("Content with a text alternative", "Inhalte mit Textalternative"), note: tt("Not recorded.", "Nicht erfasst.") },
        { name: tt("Learners who stop and why", "Lernende, die aufhören, und warum") },
        { name: tt("How learners with impairments use the platform", "Wie Lernende mit Beeinträchtigungen die Plattform nutzen") },
      ]}
    />
  );
}

export function ObserveDay13() {
  const views: ObserveView[] = [
    { id: "today", name: tt("AccessLearn today", "AccessLearn heute"), node: <AccessLearnSim /> },
    { id: "voices", name: tt("What people say", "Was Menschen sagen"), node: <VoicesDay13 /> },
    { id: "records", name: tt("What AccessLearn records", "Was AccessLearn erfasst"), node: <RecordsDay13 /> },
  ];
  return <ObserveButton company="AccessLearn" views={views} />;
}
