"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day10/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day10/materials";
import { tt } from "@/lib/lang";

/** Day 10 · the study cards of Materi A and B, with the references of each block (the pictures and simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["hattie2007", "nielsen1993rt", "shneiderman2016", "amabile2011", "kivetz2006", "nunes2006", "nielsen1994", "wroblewski2011", "fitts1954", "wcag22", "castUdl", "gibbons2018"],
  refsB: ["hattie2007", "amabile2011", "wroblewski2011", "wcag22", "nielsen1994", "shneiderman2016", "klein2007", "bezos2016", "nielsen2000", "gibbons2018"],
  texts: () => ({
    headA: tt("Feedback, progress tracking and responsive design: what makes feedback useful, how a progress display helps or misleads, how a layout adapts to a phone, and how to weigh a measure", "Feedback, Fortschrittsanzeige und Responsive Design: was Feedback nützlich macht, wie eine Fortschrittsanzeige hilft oder täuscht, wie sich ein Layout an ein Handy anpasst und wie man eine Maßnahme abwägt"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Every diagram uses LearnLoop and other made-up people, so the task is never answered for you.", "Fünf Karten, Level 1 und Level 2 in einem Durchgang. Jedes Diagramm nutzt LearnLoop und andere erfundene Menschen, damit die Aufgabe nie für Sie gelöst wird."),
    headB: tt("UX as a steering and feedback system: transparency, motivation and usage, the conflicts of information density, feedback and flexibility, and a decision without retention data by device", "UX als Steuerungs- und Feedbacksystem: Transparenz, Motivation und Nutzung, die Konflikte von Informationsdichte, Feedback und Flexibilität, und eine Entscheidung ohne Bindungsdaten pro Gerät"),
    leadB: tt("Three cards for Level 3. You stop sorting single facts and start designing how feedback, progress, devices and accessibility work as one system, and what waits. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie ordnen keine einzelnen Fakten mehr ein, sondern entwerfen, wie Feedback, Fortschritt, Geräte und Barrierefreiheit als ein System zusammenwirken, und was wartet. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen."),
    optionalReason: tt("Names operability, legibility and reach on a phone; the target size, the contrast and the rule “words as well as colour” are repeated in A3 and B1, so no Core task block needs this card.", "Nennt Bedienbarkeit, Lesbarkeit und Reichweite auf dem Handy; die Zielgröße, der Kontrast und die Regel „Worte zusätzlich zu Farbe“ stehen auch in A3 und B1, kein Kern-Aufgabenblock braucht diese Karte also."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
