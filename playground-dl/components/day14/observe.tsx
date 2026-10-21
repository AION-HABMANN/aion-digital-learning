"use client";

import { ClearLearnSim } from "@/components/day14/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 14 · Route 2 · "Observe the platform for real". ClearLearn as it is today, what learners and the team say in their own words, and what the platform records. The brief's
 * facts only: a platform that is too complex, users who do not understand the content and a rising drop-out rate. No total, no verdict, no figure.
 */
function VoicesDay14() {
  return (
    <VoicesView
      intro={tt("Messages from learners and from the people who run ClearLearn, as they arrive.", "Nachrichten von Lernenden und von denen, die ClearLearn betreiben, so wie sie ankommen.")}
      voices={[
        { who: "Kim", meta: tt("learner · first week", "Lernende · erste Woche"), device: tt("Laptop", "Laptop"), page: "/home", channel: tt("Help form", "Hilfeformular"), text: tt("I read the first page three times and still do not know what to do. What is a “competency-profiling instrument”?", "Ich habe die erste Seite dreimal gelesen und weiß immer noch nicht, was ich tun soll. Was ist ein „Kompetenzprofilierungsinstrument“?") },
        { who: "Raj", meta: tt("learner · stopped", "Lernender · aufgehört"), device: tt("Phone", "Handy"), page: "/directory", channel: tt("E-mail", "E-Mail"), text: tt("I could not find my course. “Hub”, “Workspace”, “Repository”: they all sound the same to me.", "Ich konnte meinen Kurs nicht finden. „Hub“, „Workspace“, „Repository“: Für mich klingt alles gleich.") },
        { who: "Ava", meta: tt("learner · still here", "Lernende · noch dabei"), device: tt("Laptop", "Laptop"), page: "/support", channel: tt("Chat", "Chat"), text: tt("I only carry on because a colleague showed me where to click.", "Ich mache nur weiter, weil mir ein Kollege gezeigt hat, wo ich klicken muss.") },
        { who: tt("A head of learning", "Eine Leiterin Lernen"), meta: tt("our own team", "unser eigenes Team"), text: tt("Our content is correct and complete. I do not see why people say it is hard.", "Unser Inhalt ist korrekt und vollständig. Ich verstehe nicht, warum die Leute sagen, er sei schwer.") },
        { who: tt("Support", "Support"), meta: tt("ClearLearn team", "ClearLearn-Team"), text: tt("Most questions I get start with “where do I find …” or “what does this mean”.", "Die meisten Fragen, die ich bekomme, beginnen mit „Wo finde ich …“ oder „Was bedeutet das“.") },
      ]}
    />
  );
}

function RecordsDay14() {
  return (
    <RecordsView
      intro={tt("What ClearLearn's admin console can show today.", "Was die Admin-Konsole von ClearLearn heute zeigen kann.")}
      reports={[
        { name: tt("Learners who stop, by week", "Lernende, die aufhören, nach Woche"), note: tt("The drop-out rate is rising. The console does not show where in a lesson they stop.", "Die Abbruchquote steigt. Die Konsole zeigt nicht, wo in einer Lektion sie aufhören.") },
        { name: tt("Questions to support", "Fragen an den Support"), note: tt("Not sorted by topic.", "Nicht nach Thema sortiert.") },
        { name: tt("Whether learners understand a text", "Ob Lernende einen Text verstehen"), note: tt("Never tested.", "Nie getestet.") },
        { name: tt("Where learners get lost in the menu", "Wo Lernende sich im Menü verirren") },
        { name: tt("Tests with different learners", "Tests mit verschiedenen Lernenden"), note: tt("None done.", "Keine durchgeführt.") },
      ]}
    />
  );
}

export function ObserveDay14() {
  const views: ObserveView[] = [
    { id: "today", name: tt("ClearLearn today", "ClearLearn heute"), node: <ClearLearnSim /> },
    { id: "voices", name: tt("What people say", "Was Menschen sagen"), node: <VoicesDay14 /> },
    { id: "records", name: tt("What ClearLearn records", "Was ClearLearn erfasst"), node: <RecordsDay14 /> },
  ];
  return <ObserveButton company="ClearLearn" views={views} />;
}
