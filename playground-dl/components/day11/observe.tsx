"use client";

import { GameLearnSim } from "@/components/day11/sims";
import { ObserveButton, RealSiteView, RecordsView, VoicesView } from "@/components/sim/ObserveKit";
import { PlatformSim } from "@/components/sim/PlatformSim";
import { competitor } from "@/data/day11/competitor";
import type { ObserveView, RealSite } from "@/components/sim/ObserveKit";
import { tt } from "@/lib/lang";

/**
 * Day 11 · Route 2 · "Observe the platform for real". GameLearn as it is today, what learners and the team say in their own words, and what the platform records. The brief's
 * facts only: user retention is low, competitors make heavy use of gamification, the budget is limited, users collect points but learn little. No total, no verdict.
 */
function VoicesDay11() {
  return (
    <VoicesView
      intro={tt("Messages from learners and from the people who run GameLearn, as they arrive.", "Nachrichten von Lernenden und von denen, die GameLearn betreiben, so wie sie ankommen.")}
      voices={[
        { who: "Kim", meta: tt("learner · active every evening", "Lernende · jeden Abend aktiv"), device: tt("Laptop", "Laptop"), page: "/unit/3", channel: tt("Chat", "Chat"), text: tt("I click through the screens to get the points. I could not tell you what lesson 3 was about.", "Ich klicke mich durch die Seiten, um die Punkte zu bekommen. Ich könnte Ihnen nicht sagen, worum es in Lektion 3 ging.") },
        { who: "Jonas", meta: tt("learner · top of the leaderboard", "Lernender · oben in der Rangliste"), text: tt("I like the ranking. I do it for the rank, to be honest, not for the subject.", "Ich mag die Rangliste. Ich mache es ehrlich gesagt für den Rang, nicht für das Thema.") },
        { who: "Mira", meta: tt("learner · stopped after two weeks", "Lernende · nach zwei Wochen aufgehört"), device: tt("Phone", "Handy"), page: "/board", channel: tt("E-mail", "E-Mail"), text: tt("I will never catch the top ten, so I stopped opening it.", "Ich hole die ersten zehn nie ein, also habe ich aufgehört, es zu öffnen.") },
        { who: tt("A head of product", "Eine Leiterin Produkt"), meta: tt("our own team", "unser eigenes Team"), text: tt("Competitors show points on every screen. If we take ours away, will anyone still come? I cannot say.", "Wettbewerber zeigen auf jeder Seite Punkte. Wenn wir unsere wegnehmen, kommt dann noch jemand? Ich kann es nicht sagen.") },
        { who: tt("A trainer", "Ein Trainer"), meta: tt("teaches on GameLearn", "unterrichtet auf GameLearn"), text: tt("My learners finish a lot of screens and fail the questions afterwards.", "Meine Lernenden beenden viele Seiten und fallen danach bei den Fragen durch.") },
      ]}
    />
  );
}

function RecordsDay11() {
  return (
    <RecordsView
      intro={tt("What GameLearn's admin console can show today.", "Was die Admin-Konsole von GameLearn heute zeigen kann.")}
      reports={[
        { name: tt("Logins per week", "Anmeldungen pro Woche"), unit: tt("logins", "Anmeldungen"), bars: [{ label: tt("Week 1", "Woche 1"), value: 3100 }, { label: tt("Week 2", "Woche 2"), value: 4200 }, { label: tt("Week 3", "Woche 3"), value: 5600 }, { label: tt("Week 4", "Woche 4"), value: 3900 }] },
        { name: tt("Points awarded", "Vergebene Punkte"), unit: tt("points", "Punkte"), bars: [{ label: tt("Finished screens", "Beendete Seiten"), value: 41000 }, { label: tt("Logins", "Anmeldungen"), value: 12000 }] },
        { name: tt("Objectives mastered", "Gemeisterte Ziele"), note: tt("Recorded only for some courses.", "Nur für einige Kurse erfasst.") },
        { name: tt("What the points change in learning", "Was die Punkte am Lernen ändern"), note: tt("Nobody has measured this.", "Das hat niemand gemessen.") },
        { name: tt("Why learners leave", "Warum Lernende gehen") },
      ]}
    />
  );
}

/** The real platform beside the made-up competitor (DL-STANDARD v1.8, section 4): optional, checked on 2026-10-22. */
const REAL = (): RealSite => ({
  name: "Duolingo",
  page: tt("Blog: How Duolingo leaderboards and leagues work", "Blog: Wie die Ranglisten und Ligen von Duolingo funktionieren"),
  url: "https://blog.duolingo.com/duolingo-leagues-leaderboards/",
  why: tt("A real learning platform that uses gamification heavily, as the brief says your competitors do. In this post Duolingo describes its weekly leagues in its own words.", "Eine echte Lernplattform, die stark auf Gamification setzt, wie der Auftrag es von Ihren Wettbewerbern sagt. In diesem Beitrag beschreibt Duolingo seine wöchentlichen Ligen mit eigenen Worten."),
  look: [tt("Which behaviour do the leagues reward: learning, or activity?", "Welches Verhalten belohnen die Ligen: Lernen oder Aktivität?"), tt("What happens to a learner who cannot keep up with the top of the league?", "Was passiert mit einer Lernenden, die mit der Spitze der Liga nicht mithalten kann?"), tt("Which claims about learning does the page make, and which evidence does it show for them?", "Welche Aussagen über das Lernen macht die Seite, und welche Belege zeigt sie dafür?")],
  embed: true,
});

export function ObserveDay11() {
  const views: ObserveView[] = [
    { id: "today", name: tt("GameLearn today", "GameLearn heute"), node: <GameLearnSim /> },
    { id: "comp", name: tt("A competing platform: QuestUp", "Eine konkurrierende Plattform: QuestUp"), node: <PlatformSim cfg={competitor()} /> },
    { id: "real", name: tt("Real: Duolingo", "Echt: Duolingo"), node: <RealSiteView site={REAL()} /> },
    { id: "voices", name: tt("What people say", "Was Menschen sagen"), node: <VoicesDay11 /> },
    { id: "records", name: tt("What GameLearn records", "Was GameLearn erfasst"), node: <RecordsDay11 /> },
  ];
  return <ObserveButton company="GameLearn" views={views} />;
}
