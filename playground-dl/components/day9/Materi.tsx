"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day9/Cards";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { MATS } from "@/data/day9/materials";
import { tt } from "@/lib/lang";

/** Day 9 · the study cards of Materi A and B, with the references of each block (the pictures and simulations of the tasks are in Free.tsx). */
const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["rosenfeld2015", "spencer2009", "krug2014", "hick1952", "nielsen1994", "chiWylie2014", "roediger2006", "hattie2007", "hamari2014", "gibbons2018"],
  refsB: ["norman2013", "rosenfeld2015", "chiWylie2014", "nielsen2006pd", "nielsen1994", "spencer2009", "nielsen2000", "klein2007", "bezos2016"],
  texts: () => ({
    headA: tt("Information architecture and interaction: how content is organised, how learners find their way, when interaction helps learning, and how to weigh a measure", "Informationsarchitektur und Interaktion: wie Inhalt geordnet ist, wie Lernende ihren Weg finden, wann Interaktion dem Lernen hilft und wie man eine Maßnahme abwägt"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Every diagram uses LearnLoop and other made-up people, so the task is never answered for you.", "Fünf Karten, Level 1 und Level 2 in einem Durchgang. Jedes Diagramm nutzt LearnLoop und andere erfundene Menschen, damit die Aufgabe nie für Sie gelöst wird."),
    headB: tt("Structure guides, interaction activates: the order orientation, activation, engagement, the conflicts of structure against flexibility and interaction against overload, and a decision without behaviour data", "Struktur führt, Interaktion aktiviert: die Reihenfolge Orientierung, Aktivierung, Engagement, die Konflikte Struktur gegen Flexibilität und Interaktion gegen Überlastung, und eine Entscheidung ohne Verhaltensdaten"),
    leadB: tt("Three cards for Level 3. You stop sorting single facts and start deciding how a whole platform is organised, where interaction belongs, and what waits. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie ordnen keine einzelnen Fakten mehr ein, sondern entscheiden, wie eine ganze Plattform geordnet ist, wo Interaktion hingehört und was wartet. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen."),
    optionalReason: tt("Names the engagement strategies of the plan; feedback, a next step and variety are repeated in A3, so no Core task block needs this card.", "Nennt die Engagement-Strategien des Plans; Rückmeldung, ein nächster Schritt und Abwechslung stehen auch in A3, kein Kern-Aufgabenblock braucht diese Karte also."),
  }),
});

export const MateriA = M.MateriA;
export const MateriB = M.MateriB;
