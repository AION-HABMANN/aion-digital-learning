"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day10/Cards";
import { MeasureThumb, TrackScreen } from "@/components/day10/mocks";
import type { ThumbKind, TlScreen } from "@/components/day10/mocks";
import type { GenKit } from "@/components/dayGen/GenBits";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { Diagram } from "@/components/materi/kit";
import { MATS } from "@/data/day10/materials";
import { tt } from "@/lib/lang";

/** Day 10 · what the page frames and the engine need besides the spec: the evidence screens, the thumbnails and the study cards. */

function TrackLearnScreens() {
  const items: [TlScreen, string][] = [
    ["course", tt("A course page", "Eine Kursseite")],
    ["quiz", tt("A quiz", "Ein Quiz")],
    ["dash", tt("The dashboard", "Das Dashboard")],
    ["phone", tt("On a phone", "Auf dem Handy")],
  ];
  return (
    <Diagram label={tt("Four TrackLearn screens, drawn in outline · Case assumption: the details are made up for this exercise", "Vier TrackLearn-Bildschirme in Umrissen · Fallannahme: Die Details sind für diese Übung erfunden")}>
      <div className="mx-auto grid max-w-[640px] grid-cols-2 gap-x-3 gap-y-3">
        {items.map(([k, name]) => (
          <div key={k}>
            <TrackScreen kind={k} />
            <p className="mt-1 text-center text-caption font-bold text-ink">{name}</p>
          </div>
        ))}
      </div>
    </Diagram>
  );
}

const MEASURE: Record<string, ThumbKind> = { m1: "bar", m2: "feedback", m3: "phone", m4: "clear", m5: "access", m6: "game", m7: "dense", m8: "native", m9: "remind" };
const OPTION: Record<string, ThumbKind> = { A: "bar", B: "phone", C: "feedback" };
const DECISION: Record<string, ThumbKind> = { d1: "feedback", d2: "bar", d3: "mobileFirst", d4: "access", d5: "test", d6: "game", d7: "native" };

const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["hattie2007", "nielsen1993rt", "shneiderman2016", "amabile2011", "kivetz2006", "nunes2006", "nielsen1994", "wroblewski2011", "fitts1954", "wcag22", "castUdl", "gibbons2018"],
  refsB: ["hattie2007", "amabile2011", "wroblewski2011", "wcag22", "nielsen1994", "shneiderman2016", "klein2007", "bezos2016", "nielsen2000", "gibbons2018"],
  texts: () => ({
    headA: tt("Feedback, progress tracking and responsive design: what makes feedback useful, how a progress display helps or misleads, how a layout adapts to a phone, and how to weigh a measure", "Feedback, Fortschrittsanzeige und Responsive Design: was Feedback nützlich macht, wie eine Fortschrittsanzeige hilft oder täuscht, wie sich ein Layout an ein Handy anpasst und wie man eine Maßnahme abwägt"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Four are core; A4 on accessibility in the responsive context is folded. Every diagram uses LearnLoop and other made-up people, so the task is never answered for you.", "Fünf Karten, Level 1 und Level 2 in einem Durchgang. Vier sind Kern; A4 zur Barrierefreiheit im responsiven Kontext ist eingeklappt. Jedes Diagramm nutzt LearnLoop und andere erfundene Menschen, damit die Aufgabe nie für Sie gelöst wird."),
    headB: tt("UX as a steering and feedback system: transparency, motivation and usage, the conflicts of information density, feedback and flexibility, and a decision without retention data by device", "UX als Steuerungs- und Feedbacksystem: Transparenz, Motivation und Nutzung, die Konflikte von Informationsdichte, Feedback und Flexibilität, und eine Entscheidung ohne Bindungsdaten pro Gerät"),
    leadB: tt("Three cards for Level 3. You stop sorting single facts and start designing how feedback, progress, devices and accessibility work as one system, and what waits. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie ordnen keine einzelnen Fakten mehr ein, sondern entwerfen, wie Feedback, Fortschritt, Geräte und Barrierefreiheit als ein System zusammenwirken, und was wartet. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen."),
    optionalReason: tt("Names operability, legibility and reach on a phone; the target size, the contrast and the rule “words as well as colour” are repeated in A3 and B1, so no Core task block needs this card.", "Nennt Bedienbarkeit, Lesbarkeit und Reichweite auf dem Handy; die Zielgröße, der Kontrast und die Regel „Worte zusätzlich zu Farbe“ stehen auch in A3 und B1, kein Kern-Aufgabenblock braucht diese Karte also."),
  }),
});

export const KIT: GenKit = {
  Evidence: TrackLearnScreens,
  measureThumb: (id) => <MeasureThumb kind={MEASURE[id]} />,
  optionThumb: (id) => <MeasureThumb kind={OPTION[id]} />,
  decisionThumb: (id) => <MeasureThumb kind={DECISION[id]} />,
  MateriA: M.MateriA,
  MateriB: M.MateriB,
};
