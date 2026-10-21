"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day13/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day13/materials";
import { tt } from "@/lib/lang";

/** Day 13 · the study cards of Materi A and B, with the references of each block (the pictures and simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["castUdl", "msInclusive", "who2022", "wcag22", "wcagUnderstanding", "w3cAria", "en301549", "nielsen1994", "gibbons2018"],
  refsB: ["wcag22", "en301549", "bfsg", "castUdl", "gibbons2018", "klein2007", "bezos2016"],
  texts: () => ({
    headA: tt("Inclusive design and WCAG: user groups and barriers, the four principles, the key requirements in practice, and how to prioritise a measure", "Inklusives Design und WCAG: Nutzergruppen und Barrieren, die vier Prinzipien, die wichtigsten Anforderungen in der Praxis und wie man eine Maßnahme priorisiert"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. All five are core. Every diagram uses LearnLoop and other made-up people, so the task is never answered for you.", "Fünf Karten, Level 1 und Level 2 in einem Durchgang. Alle fünf sind Kern. Jedes Diagramm nutzt LearnLoop und andere erfundene Menschen, damit die Aufgabe nie für Sie gelöst wird."),
    headB: tt("Accessibility as a strategic quality: requirement, priority, process and measure, the conflicts of cost and standard, and a decision with an unknown scale", "Barrierefreiheit als strategische Qualität: Anforderung, Priorität, Prozess und Messung, die Konflikte von Kosten und Standard und eine Entscheidung mit unbekanntem Ausmaß"),
    leadB: tt("Three cards for Level 3. You stop sorting single barriers and start deciding how to implement the standard, how to build it into the process, and what waits. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie ordnen keine einzelnen Barrieren mehr ein, sondern entscheiden, wie der Standard umgesetzt wird, wie er in den Prozess kommt und was wartet. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen."),
    optionalReason: tt("Not used: every card of this day is core.", "Nicht genutzt: Jede Karte dieses Tages ist Kern."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
