"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day16/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day16/materials";
import { tt } from "@/lib/lang";

/** Day 16 · the study cards of Materi A and B, with the references of each block (the pictures and simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["nielsen2000", "kohavi2020", "rodden2010", "gdpr", "croll2013", "few2013", "ries2011", "gibbons2018"],
  refsB: ["ries2011", "rodden2010", "gdpr", "kohavi2020", "klein2007", "bezos2016"],
  texts: () => ({
    headA: tt("UX testing, analytics and KPIs: testing methods, what to measure and define, how to read data without being fooled, and how to weigh a measure", "UX-Testing, Analytics und KPIs: Testmethoden, was zu messen und zu definieren ist, wie man Daten liest, ohne sich täuschen zu lassen, und wie man eine Maßnahme abwägt"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. All five are core. Every diagram uses LearnLoop and other made-up people, so the task is never answered for you.", "Fünf Karten, Level 1 und Level 2 in einem Durchgang. Alle fünf sind Kern. Jedes Diagramm nutzt LearnLoop und andere erfundene Menschen, damit die Aufgabe nie für Sie gelöst wird."),
    headB: tt("UX as a measurable and controllable system: KPI, hypothesis, test and decision, the conflicts of data and intuition, and a decision with unclear causes", "UX als messbares und steuerbares System: KPI, Hypothese, Test und Entscheidung, die Konflikte von Daten und Intuition und eine Entscheidung bei unklaren Ursachen"),
    leadB: tt("Three cards for Level 3. You stop sorting single problems and start deciding which KPIs matter, how to track and analyse, and who decides on what evidence. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie ordnen keine einzelnen Probleme mehr ein, sondern entscheiden, welche KPIs zählen, wie erfasst und analysiert wird und wer auf welcher Grundlage entscheidet. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen."),
    optionalReason: tt("Not used: every card of this day is core.", "Nicht genutzt: Jede Karte dieses Tages ist Kern."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
