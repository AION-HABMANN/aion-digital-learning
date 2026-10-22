"use client";

import { AdaptLearnSim } from "@/components/day12/sims";
import { ObserveButton, RealSiteView, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import { PlatformSim } from "@/components/sim/PlatformSim";
import { competitor } from "@/data/day12/competitor";
import type { ObserveView, RealSite } from "@/components/sim/ObserveKit";
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

/** The real platform beside the made-up competitor (DL-STANDARD v1.8, section 4): optional, checked on 2026-10-22. */
const REAL = (): RealSite => ({
  name: "Duolingo",
  page: tt("Blog: Introducing Birdbrain, the model that personalises lessons", "Blog: Birdbrain, das Modell, das Lektionen personalisiert"),
  url: "https://blog.duolingo.com/learning-how-to-help-you-learn-introducing-birdbrain/",
  why: tt("A real learning platform that uses an adaptive system, as the brief says your competitors do. In this post Duolingo explains how its model chooses exercises for each learner.", "Eine echte Lernplattform, die ein adaptives System nutzt, wie der Auftrag es von Ihren Wettbewerbern sagt. In diesem Beitrag erklärt Duolingo, wie sein Modell Übungen für jede Lernende auswählt."),
  look: [tt("Which signals does the model use to adapt, and does a learner see them?", "Welche Signale nutzt das Modell, um sich anzupassen, und sieht eine Lernende sie?"), tt("What does the company say about why it adapts, and what about how well it works?", "Was sagt das Unternehmen dazu, warum es anpasst, und was dazu, wie gut es wirkt?"), tt("What would a learner on your platform need to understand an adaptation like this?", "Was bräuchte eine Lernende auf Ihrer Plattform, um eine solche Anpassung zu verstehen?")],
  embed: true,
});

export function ObserveDay12() {
  const views: ObserveView[] = [
    { id: "today", name: tt("AdaptLearn today", "AdaptLearn heute"), node: <AdaptLearnSim /> },
    { id: "comp", name: tt("A competing platform: PathWise", "Eine konkurrierende Plattform: PathWise"), node: <PlatformSim cfg={competitor()} /> },
    { id: "real", name: tt("Real: Duolingo", "Echt: Duolingo"), node: <RealSiteView site={REAL()} /> },
    { id: "voices", name: tt("What people say", "Was Menschen sagen"), node: <VoicesDay12 /> },
    { id: "records", name: tt("What AdaptLearn records", "Was AdaptLearn erfasst"), node: <RecordsDay12 /> },
  ];
  return <ObserveButton company="AdaptLearn" views={views} />;
}
