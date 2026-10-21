"use client";

import { AdaptLearnSim } from "@/components/day12/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 12 · Route 2 · "Observe the platform for real". AdaptLearn as it is today, what learners and the team say in their own words, and what the platform records. The brief's
 * facts only: a complex adaptive system, users who do not understand the adaptations, low acceptance, heterogeneous users and a small data basis. No total, no verdict.
 */
function VoicesDay12() {
  return (
    <VoicesView
      intro={tt("Messages from learners and from the people who run AdaptLearn, as they arrive.", "Nachrichten von Lernenden und von denen, die AdaptLearn betreiben, so wie sie ankommen.")}
      voices={[
        { who: "Ravi", meta: tt("learner · second week", "Lernender · zweite Woche"), device: tt("Laptop", "Laptop"), page: "/path", channel: tt("Chat", "Chat"), text: tt("Why did my lesson change? Yesterday lesson 5 was there and today it is gone.", "Warum hat sich meine Lektion geändert? Gestern war Lektion 5 da und heute ist sie weg.") },
        { who: "Mina", meta: tt("learner · heterogeneous group", "Lernende · heterogene Gruppe"), text: tt("My colleague has a different order than I do, and nobody can tell us which is right.", "Meine Kollegin hat eine andere Reihenfolge als ich, und niemand kann uns sagen, welche richtig ist.") },
        { who: "Tobias", meta: tt("learner · stopped", "Lernender · aufgehört"), device: tt("Phone", "Handy"), page: "/updates", channel: tt("E-mail", "E-Mail"), text: tt("It keeps updating my path. I stopped looking at it.", "Es aktualisiert ständig meinen Pfad. Ich habe aufgehört, es mir anzusehen.") },
        { who: tt("A head of product", "Eine Leiterin Produkt"), meta: tt("our own team", "unser eigenes Team"), text: tt("Competitors have adaptive systems, so we built a big one. I cannot show that it helps anyone.", "Wettbewerber haben adaptive Systeme, also haben wir ein großes gebaut. Ich kann nicht zeigen, dass es jemandem hilft.") },
        { who: tt("A data engineer", "Ein Dateningenieur"), meta: tt("AdaptLearn team", "AdaptLearn-Team"), text: tt("We have few learners and few recorded actions per learner. The model mostly guesses.", "Wir haben wenige Lernende und wenige erfasste Handlungen pro Lernender. Das Modell rät meist.") },
      ]}
    />
  );
}

function RecordsDay12() {
  return (
    <RecordsView
      intro={tt("What AdaptLearn's admin console can show today.", "Was die Admin-Konsole von AdaptLearn heute zeigen kann.")}
      reports={[
        { name: tt("Path updates per learner and week", "Pfad-Aktualisierungen pro Lernender und Woche"), unit: tt("updates", "Aktualisierungen"), bars: [{ label: tt("Week 1", "Woche 1"), value: 9 }, { label: tt("Week 2", "Woche 2"), value: 14 }, { label: tt("Week 3", "Woche 3"), value: 17 }] },
        { name: tt("Recorded actions per learner", "Erfasste Handlungen pro Lernender"), note: tt("Few. The model has little to learn from.", "Wenige. Das Modell hat wenig, woraus es lernen kann.") },
        { name: tt("How well an adaptation fits", "Wie gut eine Anpassung passt"), note: tt("Nobody has checked.", "Niemand hat es geprüft.") },
        { name: tt("Why learners ignore a change", "Warum Lernende eine Änderung ignorieren") },
        { name: tt("Whether learners understand a change", "Ob Lernende eine Änderung verstehen") },
      ]}
    />
  );
}

export function ObserveDay12() {
  const views: ObserveView[] = [
    { id: "today", name: tt("AdaptLearn today", "AdaptLearn heute"), node: <AdaptLearnSim /> },
    { id: "voices", name: tt("What people say", "Was Menschen sagen"), node: <VoicesDay12 /> },
    { id: "records", name: tt("What AdaptLearn records", "Was AdaptLearn erfasst"), node: <RecordsDay12 /> },
  ];
  return <ObserveButton company="AdaptLearn" views={views} />;
}
