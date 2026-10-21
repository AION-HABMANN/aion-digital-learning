"use client";

import { MobileLearnSim } from "@/components/day15/sims";
import { ObserveButton, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import type { ObserveView } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 15 · Route 2 · "Observe the platform for real". MobileLearn as it is today, what learners and the team say in their own words, and what the platform records. The brief's
 * facts only: mobile use is growing strongly, the platform is not optimised and competitors are better on mobile. No total, no verdict, no figure.
 */
function VoicesDay15() {
  return (
    <VoicesView
      intro={tt("Messages from learners and from the people who run MobileLearn, as they arrive.", "Nachrichten von Lernenden und von denen, die MobileLearn betreiben, so wie sie ankommen.")}
      voices={[
        { who: "Ben", meta: tt("learner · on the train", "Lernender · im Zug"), device: tt("Phone", "Handy"), page: "/lesson", channel: tt("Help form", "Hilfeformular"), text: tt("I have ten minutes on the train and the lesson does not even fit on my screen. I give up.", "Ich habe zehn Minuten im Zug, und die Lektion passt nicht einmal auf meinen Bildschirm. Ich gebe auf.") },
        { who: "Lea", meta: tt("learner · on and off", "Lernende · mal ja, mal nein"), device: tt("Phone", "Handy"), page: "/course", channel: tt("E-mail", "E-Mail"), text: tt("I start on my phone and finish on my laptop, but it never knows where I stopped.", "Ich fange auf dem Handy an und mache auf dem Laptop weiter, aber es weiß nie, wo ich aufgehört habe.") },
        { who: "Jo", meta: tt("learner · stopped", "Lernender · aufgehört"), device: tt("Phone", "Handy"), page: "/reports", channel: tt("Chat", "Chat"), text: tt("The table does not fit on a phone, so I could not see my progress.", "Die Tabelle passt nicht auf ein Handy, also konnte ich meinen Fortschritt nicht sehen.") },
        { who: tt("A head of product", "Ein Leiter Produkt"), meta: tt("our own team", "unser eigenes Team"), text: tt("Our competitors are better on mobile. Learners compare us with them every day.", "Unsere Wettbewerber sind mobil besser. Lernende vergleichen uns jeden Tag mit ihnen.") },
        { who: tt("A designer", "Eine Designerin"), meta: tt("MobileLearn team", "MobileLearn-Team"), text: tt("We built everything for the desktop. Nobody has tested it on a real phone.", "Wir haben alles für den Desktop gebaut. Niemand hat es auf einem echten Handy getestet.") },
      ]}
    />
  );
}

function RecordsDay15() {
  return (
    <RecordsView
      intro={tt("What MobileLearn's admin console can show today.", "Was die Admin-Konsole von MobileLearn heute zeigen kann.")}
      reports={[
        { name: tt("Visits by device", "Besuche nach Gerät"), note: tt("Phone visits are growing strongly. The console shows the total, not the split.", "Die Handy-Besuche wachsen stark. Die Konsole zeigt die Summe, nicht die Aufteilung.") },
        { name: tt("Drop-out by device", "Abbrüche nach Gerät"), note: tt("Not recorded separately.", "Nicht getrennt erfasst.") },
        { name: tt("Where learners stop on a phone", "Wo Lernende auf dem Handy aufhören") },
        { name: tt("Progress that moves between devices", "Fortschritt, der zwischen Geräten wechselt"), note: tt("Not recorded.", "Nicht erfasst.") },
        { name: tt("Tests on real phones", "Tests auf echten Handys"), note: tt("None done.", "Keine durchgeführt.") },
      ]}
    />
  );
}

export function ObserveDay15() {
  const views: ObserveView[] = [
    { id: "today", name: tt("MobileLearn on a phone", "MobileLearn auf einem Handy"), node: <MobileLearnSim /> },
    { id: "desktop", name: tt("MobileLearn on a desktop", "MobileLearn auf einem Desktop"), node: <MobileLearnSim onDesktop /> },
    { id: "voices", name: tt("What people say", "Was Menschen sagen"), node: <VoicesDay15 /> },
    { id: "records", name: tt("What MobileLearn records", "Was MobileLearn erfasst"), node: <RecordsDay15 /> },
  ];
  return <ObserveButton company="MobileLearn" views={views} />;
}
