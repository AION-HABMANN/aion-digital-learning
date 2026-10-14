"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day12/Cards";
import { AdaptScreen, MeasureThumb } from "@/components/day12/mocks";
import type { AlScreen, ThumbKind } from "@/components/day12/mocks";
import type { GenKit } from "@/components/dayGen/GenBits";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { Diagram } from "@/components/materi/kit";
import { MATS } from "@/data/day12/materials";
import { tt } from "@/lib/lang";

/** Day 12 · what the page frames and the engine need besides the spec: the evidence screens, the thumbnails and the study cards. */

function AdaptLearnScreens() {
  const items: [AlScreen, string][] = [
    ["path", tt("The path", "Der Pfad")],
    ["rec", tt("Recommendations", "Empfehlungen")],
    ["level", tt("Difficulty", "Schwierigkeit")],
    ["settings", tt("Settings", "Einstellungen")],
  ];
  return (
    <Diagram label={tt("Four AdaptLearn screens, drawn in outline · Case assumption: the details are made up for this exercise", "Vier AdaptLearn-Bildschirme in Umrissen · Fallannahme: Die Details sind für diese Übung erfunden")}>
      <div className="mx-auto grid max-w-[640px] grid-cols-2 gap-x-3 gap-y-3">
        {items.map(([k, name]) => (
          <div key={k}>
            <AdaptScreen kind={k} />
            <p className="mt-1 text-center text-caption font-bold text-ink">{name}</p>
          </div>
        ))}
      </div>
    </Diagram>
  );
}

const MEASURE: Record<string, ThumbKind> = { m1: "explain", m2: "rules", m3: "structure", m4: "feedback", m5: "control", m6: "ai", m7: "variants", m8: "dense", m9: "reward" };
const OPTION: Record<string, ThumbKind> = { A: "standard", B: "rules", C: "ai" };
const DECISION: Record<string, ThumbKind> = { d1: "explain", d2: "rules", d3: "gamify", d4: "evidence", d5: "ai", d6: "prize", d7: "silent" };

const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["brusilovsky2001", "kalyuga2003", "ribeiro2016", "amershi2019", "aiAct", "shneiderman2016", "nielsen1994", "deterding2011", "gibbons2018"],
  refsB: ["amershi2019", "brusilovsky2001", "hamari2014", "ribeiro2016", "kalyuga2003", "klein2007", "bezos2016", "gibbons2018"],
  texts: () => ({
    headA: tt("Adaptive learning and personalisation: how an adaptive system works, rules against models, UX patterns for personalised paths, and how to weigh a measure", "Adaptives Lernen und Personalisierung: wie ein adaptives System arbeitet, Regeln gegen Modelle, UX-Muster für personalisierte Pfade und wie man eine Maßnahme abwägt"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Four are core; A4 on opportunities, risks and gamification is folded. Every diagram uses LearnLoop and other made-up people, so the task is never answered for you.", "Fünf Karten, Level 1 und Level 2 in einem Durchgang. Vier sind Kern; A4 zu Chancen, Risiken und Gamification ist eingeklappt. Jedes Diagramm nutzt LearnLoop und andere erfundene Menschen, damit die Aufgabe nie für Sie gelöst wird."),
    headB: tt("Personalisation as a strategic option: need, data, technique, the conflicts of UX and technology, and a decision with an incomplete data basis", "Personalisierung als strategische Option: Bedarf, Daten, Technik, die Konflikte von UX und Technologie und eine Entscheidung bei unvollständiger Datenbasis"),
    leadB: tt("Three cards for Level 3. You stop sorting single elements and start deciding how far to personalise, which patterns to use and what waits. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie ordnen keine einzelnen Elemente mehr ein, sondern entscheiden, wie weit personalisiert wird, welche Muster genutzt werden und was wartet. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen."),
    optionalReason: tt("Names the opportunities, the risks and the link to gamification; the rules a Core block needs are repeated in A2 and B2, so no Core task block needs this card.", "Nennt die Chancen, die Risiken und die Verbindung zur Gamification; die Regeln, die ein Kernblock braucht, stehen auch in A2 und B2, kein Kern-Aufgabenblock braucht diese Karte also."),
  }),
});

export const KIT: GenKit = {
  Evidence: AdaptLearnScreens,
  measureThumb: (id) => <MeasureThumb kind={MEASURE[id]} />,
  optionThumb: (id) => <MeasureThumb kind={OPTION[id]} />,
  decisionThumb: (id) => <MeasureThumb kind={DECISION[id]} />,
  MateriA: M.MateriA,
  MateriB: M.MateriB,
};
