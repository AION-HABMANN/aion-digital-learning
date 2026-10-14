"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day15/Cards";
import { MeasureThumb, MobileScreen } from "@/components/day15/mocks";
import type { MlScreen, ThumbKind } from "@/components/day15/mocks";
import type { GenKit } from "@/components/dayGen/GenBits";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { Diagram } from "@/components/materi/kit";
import { MATS } from "@/data/day15/materials";
import { tt } from "@/lib/lang";

/** Day 15 · what the page frames and the engine need besides the spec: the evidence screens, the thumbnails and the study cards. */

function MobileLearnScreens() {
  const items: [MlScreen, string][] = [
    ["lesson", tt("A lesson", "Eine Lektion")],
    ["phone", tt("On a phone", "Auf einem Handy")],
    ["switch", tt("Changing device", "Gerätewechsel")],
    ["session", tt("A quiz and a video", "Ein Quiz und ein Video")],
  ];
  return (
    <Diagram label={tt("Four MobileLearn screens, drawn in outline · Case assumption: the details are made up for this exercise", "Vier MobileLearn-Bildschirme in Umrissen · Fallannahme: Die Details sind für diese Übung erfunden")}>
      <div className="mx-auto grid max-w-[640px] grid-cols-2 gap-x-3 gap-y-3">
        {items.map(([k, name]) => (
          <div key={k}>
            <MobileScreen kind={k} />
            <p className="mt-1 text-center text-caption font-bold text-ink">{name}</p>
          </div>
        ))}
      </div>
    </Diagram>
  );
}

const MEASURE: Record<string, ThumbKind> = { m1: "micro", m2: "mobile", m3: "nav", m4: "sync", m5: "test", m6: "app", m7: "push", m8: "shrink", m9: "everything" };
const OPTION: Record<string, ThumbKind> = { A: "micro", B: "desktop", C: "separate" };
const DECISION: Record<string, ThumbKind> = { d1: "micro", d2: "mobile", d3: "test", d4: "research", d5: "app", d6: "site", d7: "push" };

const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["budiu2015", "sharples2007", "wroblewski2011", "hug2005", "wcag22", "nielsen2000", "klein2007", "gibbons2018"],
  refsB: ["wroblewski2011", "sharples2007", "budiu2015", "nielsen2000", "klein2007", "bezos2016", "gibbons2018"],
  texts: () => ({
    headA: tt("Mobile learning and cross-device UX: the context of use, microlearning, responsive and cross-device design, and how to weigh a measure", "Mobiles Lernen und Cross-Device-UX: der Nutzungskontext, Microlearning, responsives und Cross-Device-Design und wie man eine Maßnahme abwägt"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Four are core; A4 on testing and optimising mobile learning is folded. Every diagram uses LearnLoop and other made-up people, so the task is never answered for you.", "Fünf Karten, Level 1 und Level 2 in einem Durchgang. Vier sind Kern; A4 zum Testen und Optimieren mobilen Lernens ist eingeklappt. Jedes Diagramm nutzt LearnLoop und andere erfundene Menschen, damit die Aufgabe nie für Sie gelöst wird."),
    headB: tt("Mobile UX as a strategy of its own: context, design, usage and scale, the conflicts of mobile and desktop, and a decision without data by device", "Mobile UX als eigene Strategie: Kontext, Design, Nutzung und Skalierung, die Konflikte von Mobil und Desktop und eine Entscheidung ohne Daten nach Gerät"),
    leadB: tt("Three cards for Level 3. You stop sorting single problems and start deciding how mobile and desktop work together, what microlearning looks like and what waits. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie ordnen keine einzelnen Probleme mehr ein, sondern entscheiden, wie Mobil und Desktop zusammenwirken, wie Microlearning aussieht und was wartet. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen."),
    optionalReason: tt("Names tests on real phones, the analysis of contexts and the continuous loop; the loop a Core block needs is repeated in B1, so no Core task block needs this card.", "Nennt Tests auf echten Handys, die Analyse der Kontexte und den fortlaufenden Kreislauf; der Kreislauf, den ein Kernblock braucht, steht auch in B1, kein Kern-Aufgabenblock braucht diese Karte also."),
  }),
});

export const KIT: GenKit = {
  Evidence: MobileLearnScreens,
  measureThumb: (id) => <MeasureThumb kind={MEASURE[id]} />,
  optionThumb: (id) => <MeasureThumb kind={OPTION[id]} />,
  decisionThumb: (id) => <MeasureThumb kind={DECISION[id]} />,
  MateriA: M.MateriA,
  MateriB: M.MateriB,
};
