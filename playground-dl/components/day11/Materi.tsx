"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day11/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day11/materials";
import { tt } from "@/lib/lang";

/** Day 11 · the study cards of Materi A and B, with the references of each block (the pictures and simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["deterding2011", "hamari2014", "ryanDeci2000", "deci1999", "lepper1973", "kivetz2006", "csik1990", "gibbons2018"],
  refsB: ["deterding2011", "hamari2014", "ryanDeci2000", "deci1999", "lepper1973", "kahneman1993", "klein2007", "bezos2016", "gibbons2018"],
  texts: () => ({
    headA: tt("Gamification and motivation: what game elements are, what intrinsic and extrinsic motivation mean, why activity is not learning, and how to weigh a measure", "Gamification und Motivation: was Spielelemente sind, was intrinsische und extrinsische Motivation bedeuten, warum Aktivität nicht Lernen ist und wie man eine Maßnahme abwägt"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. All five are core. Every diagram uses LearnLoop and other made-up people, so the task is never answered for you.", "Fünf Karten, Level 1 und Level 2 in einem Durchgang. Alle fünf sind Kern. Jedes Diagramm nutzt LearnLoop und andere erfundene Menschen, damit die Aufgabe nie für Sie gelöst wird."),
    headB: tt("Gamification as a strategic tool: objective, mechanic, behaviour, the conflicts of short-term effect, manipulation and overload, and a decision without proof", "Gamification als strategisches Werkzeug: Ziel, Mechanik, Verhalten, die Konflikte von kurzfristiger Wirkung, Manipulation und Überlastung und eine Entscheidung ohne Beleg"),
    leadB: tt("Three cards for Level 3. You stop sorting single elements and start deciding whether and how to gamify, what each mechanic is for, and what waits. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie ordnen keine einzelnen Elemente mehr ein, sondern entscheiden, ob und wie gamifiziert wird, wofür jede Mechanik da ist und was wartet. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen."),
    optionalReason: tt("Not used: every card of this day is core.", "Nicht genutzt: Jede Karte dieses Tages ist Kern."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
