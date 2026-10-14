"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day16/Cards";
import { DataScreen, MeasureThumb } from "@/components/day16/mocks";
import type { DlScreen, ThumbKind } from "@/components/day16/mocks";
import type { GenKit } from "@/components/dayGen/GenBits";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { Diagram } from "@/components/materi/kit";
import { MATS } from "@/data/day16/materials";
import { tt } from "@/lib/lang";

/** Day 16 · what the page frames and the engine need besides the spec: the evidence screens, the thumbnails and the study cards. */

function DataLearnScreens() {
  const items: [DlScreen, string][] = [
    ["dash", tt("The dashboard", "Das Dashboard")],
    ["report", tt("The report", "Der Bericht")],
    ["log", tt("The change log", "Das Änderungsprotokoll")],
    ["tracking", tt("The tracking set-up", "Das Tracking-Setup")],
  ];
  return (
    <Diagram label={tt("Four DataLearn screens, drawn in outline · Case assumption: the details are made up for this exercise", "Vier DataLearn-Bildschirme in Umrissen · Fallannahme: Die Details sind für diese Übung erfunden")}>
      <div className="mx-auto grid max-w-[640px] grid-cols-2 gap-x-3 gap-y-3">
        {items.map(([k, name]) => (
          <div key={k}>
            <DataScreen kind={k} />
            <p className="mt-1 text-center text-caption font-bold text-ink">{name}</p>
          </div>
        ))}
      </div>
    </Diagram>
  );
}

const MEASURE: Record<string, ThumbKind> = { m1: "kpi", m2: "hyp", m3: "test", m4: "iterate", m5: "cohort", m6: "moredata", m7: "dash", m8: "ai", m9: "all" };
const OPTION: Record<string, ThumbKind> = { A: "ux", B: "content", C: "marketing" };
const DECISION: Record<string, ThumbKind> = { d1: "kpi", d2: "hyp", d3: "tracking", d4: "qual", d5: "ai", d6: "trackall", d7: "dash" };

const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["nielsen2000", "kohavi2020", "rodden2010", "gdpr", "croll2013", "few2013", "ries2011", "gibbons2018"],
  refsB: ["ries2011", "rodden2010", "gdpr", "kohavi2020", "klein2007", "bezos2016"],
  texts: () => ({
    headA: tt("UX testing, analytics and KPIs: testing methods, what to measure and define, how to read data without being fooled, and how to weigh a measure", "UX-Testing, Analytics und KPIs: Testmethoden, was zu messen und zu definieren ist, wie man Daten liest, ohne sich täuschen zu lassen, und wie man eine Maßnahme abwägt"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Four are core; A4 on the optimisation loop is folded. Every diagram uses LearnLoop and other made-up people, so the task is never answered for you.", "Fünf Karten, Level 1 und Level 2 in einem Durchgang. Vier sind Kern; A4 zum Optimierungskreislauf ist eingeklappt. Jedes Diagramm nutzt LearnLoop und andere erfundene Menschen, damit die Aufgabe nie für Sie gelöst wird."),
    headB: tt("UX as a measurable and controllable system: KPI, hypothesis, test and decision, the conflicts of data and intuition, and a decision with unclear causes", "UX als messbares und steuerbares System: KPI, Hypothese, Test und Entscheidung, die Konflikte von Daten und Intuition und eine Entscheidung bei unklaren Ursachen"),
    leadB: tt("Three cards for Level 3. You stop sorting single problems and start deciding which KPIs matter, how to track and analyse, and who decides on what evidence. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie ordnen keine einzelnen Probleme mehr ein, sondern entscheiden, welche KPIs zählen, wie erfasst und analysiert wird und wer auf welcher Grundlage entscheidet. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen."),
    optionalReason: tt("Names the loop of hypothesis, test, evaluate and decide; the loop a Core block needs is repeated in A3 and B1, so no Core task block needs this card.", "Nennt den Kreislauf aus Hypothese, Test, Auswerten und Entscheiden; der Kreislauf, den ein Kernblock braucht, steht auch in A3 und B1, kein Kern-Aufgabenblock braucht diese Karte also."),
  }),
});

export const KIT: GenKit = {
  Evidence: DataLearnScreens,
  measureThumb: (id) => <MeasureThumb kind={MEASURE[id]} />,
  optionThumb: (id) => <MeasureThumb kind={OPTION[id]} />,
  decisionThumb: (id) => <MeasureThumb kind={DECISION[id]} />,
  MateriA: M.MateriA,
  MateriB: M.MateriB,
};
