"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day15/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day15/materials";
import { tt } from "@/lib/lang";

/** Day 15 · the study cards of Materi A and B, with the references of each block (the pictures and simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["budiu2015", "sharples2007", "wroblewski2011", "hug2005", "wcag22", "nielsen2000", "klein2007", "gibbons2018"],
  refsB: ["wroblewski2011", "sharples2007", "budiu2015", "nielsen2000", "klein2007", "bezos2016", "gibbons2018"],
  texts: () => ({
    headA: tt("Mobile learning and cross-device UX: the context of use, microlearning, responsive and cross-device design, and how to weigh a measure", "Mobiles Lernen und Cross-Device-UX: der Nutzungskontext, Microlearning, responsives und Cross-Device-Design und wie man eine Maßnahme abwägt"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. All five are core. Every diagram uses LearnLoop and other made-up people, so the task is never answered for you.", "Fünf Karten, Level 1 und Level 2 in einem Durchgang. Alle fünf sind Kern. Jedes Diagramm nutzt LearnLoop und andere erfundene Menschen, damit die Aufgabe nie für Sie gelöst wird."),
    headB: tt("Mobile UX as a strategy of its own: context, design, usage and scale, the conflicts of mobile and desktop, and a decision without data by device", "Mobile UX als eigene Strategie: Kontext, Design, Nutzung und Skalierung, die Konflikte von Mobil und Desktop und eine Entscheidung ohne Daten nach Gerät"),
    leadB: tt("Three cards for Level 3. You stop sorting single problems and start deciding how mobile and desktop work together, what microlearning looks like and what waits. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie ordnen keine einzelnen Probleme mehr ein, sondern entscheiden, wie Mobil und Desktop zusammenwirken, wie Microlearning aussieht und was wartet. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen."),
    optionalReason: tt("Not used: every card of this day is core.", "Nicht genutzt: Jede Karte dieses Tages ist Kern."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
