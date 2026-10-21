"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day12/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day12/materials";
import { tt } from "@/lib/lang";

/** Day 12 · the study cards of Materi A and B, with the references of each block (the pictures and simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["brusilovsky2001", "kalyuga2003", "ribeiro2016", "amershi2019", "aiAct", "shneiderman2016", "nielsen1994", "deterding2011", "gibbons2018"],
  refsB: ["amershi2019", "brusilovsky2001", "hamari2014", "ribeiro2016", "kalyuga2003", "klein2007", "bezos2016", "gibbons2018"],
  texts: () => ({
    headA: tt("Adaptive learning and personalisation: how an adaptive system works, rules against models, UX patterns for personalised paths, and how to weigh a measure", "Adaptives Lernen und Personalisierung: wie ein adaptives System arbeitet, Regeln gegen Modelle, UX-Muster für personalisierte Pfade und wie man eine Maßnahme abwägt"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. All five are core. Every diagram uses LearnLoop and other made-up people, so the task is never answered for you.", "Fünf Karten, Level 1 und Level 2 in einem Durchgang. Alle fünf sind Kern. Jedes Diagramm nutzt LearnLoop und andere erfundene Menschen, damit die Aufgabe nie für Sie gelöst wird."),
    headB: tt("Personalisation as a strategic option: need, data, technique, the conflicts of UX and technology, and a decision with an incomplete data basis", "Personalisierung als strategische Option: Bedarf, Daten, Technik, die Konflikte von UX und Technologie und eine Entscheidung bei unvollständiger Datenbasis"),
    leadB: tt("Three cards for Level 3. You stop sorting single elements and start deciding how far to personalise, which patterns to use and what waits. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie ordnen keine einzelnen Elemente mehr ein, sondern entscheiden, wie weit personalisiert wird, welche Muster genutzt werden und was wartet. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen."),
    optionalReason: tt("Not used: every card of this day is core.", "Nicht genutzt: Jede Karte dieses Tages ist Kern."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
