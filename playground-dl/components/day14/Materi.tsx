"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day14/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day14/materials";
import { tt } from "@/lib/lang";

/** Day 14 · the study cards of Materi A and B, with the references of each block (the pictures and simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["iso24495", "ecClear2011", "nielsen1994", "krug2014", "shneiderman2016", "nielsen2000", "gibbons2018"],
  refsB: ["iso24495", "nielsen2000", "krug2014", "nielsen1994", "klein2007", "bezos2016"],
  texts: () => ({
    headA: tt("Plain language, usability and testing: short sentences and clear terms, an intuitive structure, testing with different users, and how to weigh a measure", "Schlichte Sprache, Usability und Testen: kurze Sätze und klare Begriffe, eine intuitive Struktur, Testen mit verschiedenen Nutzern und wie man eine Maßnahme abwägt"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. All five are core. Every diagram uses LearnLoop and other made-up people, so the task is never answered for you.", "Fünf Karten, Level 1 und Level 2 in einem Durchgang. Alle fünf sind Kern. Jedes Diagramm nutzt LearnLoop und andere erfundene Menschen, damit die Aufgabe nie für Sie gelöst wird."),
    headB: tt("Comprehensibility as a strategic quality: find the hurdle, simplify, test and adjust, the conflicts of simplicity and information, and a decision without knowing where learners stop", "Verständlichkeit als strategische Qualität: Hürde finden, vereinfachen, testen und anpassen, die Konflikte von Einfachheit und Information und eine Entscheidung, ohne zu wissen, wo Lernende aufhören"),
    leadB: tt("Three cards for Level 3. You stop sorting single hurdles and start deciding how to simplify, how to reshape the structure and how to keep testing. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie ordnen keine einzelnen Hürden mehr ein, sondern entscheiden, wie vereinfacht wird, wie die Struktur umgestaltet wird und wie weiter getestet wird. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen."),
    optionalReason: tt("Not used: every card of this day is core.", "Nicht genutzt: Jede Karte dieses Tages ist Kern."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
