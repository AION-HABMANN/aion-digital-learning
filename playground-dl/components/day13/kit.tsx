"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day13/Cards";
import { AccessScreen, MeasureThumb } from "@/components/day13/mocks";
import type { AcScreen, ThumbKind } from "@/components/day13/mocks";
import type { GenKit } from "@/components/dayGen/GenBits";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { Diagram } from "@/components/materi/kit";
import { MATS } from "@/data/day13/materials";
import { tt } from "@/lib/lang";

/** Day 13 · what the page frames and the engine need besides the spec: the evidence screens, the thumbnails and the study cards. */

function AccessLearnScreens() {
  const items: [AcScreen, string][] = [
    ["lesson", tt("A lesson", "Eine Lektion")],
    ["media", tt("A chart", "Ein Diagramm")],
    ["menu", tt("The menu", "Das Menü")],
    ["quiz", tt("A quiz", "Ein Quiz")],
  ];
  return (
    <Diagram label={tt("Four AccessLearn screens, drawn in outline · Case assumption: the details are made up for this exercise", "Vier AccessLearn-Bildschirme in Umrissen · Fallannahme: Die Details sind für diese Übung erfunden")}>
      <div className="mx-auto grid max-w-[640px] grid-cols-2 gap-x-3 gap-y-3">
        {items.map(([k, name]) => (
          <div key={k}>
            <AccessScreen kind={k} />
            <p className="mt-1 text-center text-caption font-bold text-ink">{name}</p>
          </div>
        ))}
      </div>
    </Diagram>
  );
}

const MEASURE: Record<string, ThumbKind> = { m1: "contrast", m2: "nav", m3: "alt", m4: "structure", m5: "test", m6: "overlay", m7: "separate", m8: "everything", m9: "statement" };
const OPTION: Record<string, ThumbKind> = { A: "contrast", B: "nav", C: "alt" };
const DECISION: Record<string, ThumbKind> = { d1: "wcag", d2: "process", d3: "measure", d4: "training", d5: "overlay", d6: "separate", d7: "reactive" };

const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["castUdl", "msInclusive", "who2022", "wcag22", "wcagUnderstanding", "w3cAria", "en301549", "nielsen1994", "gibbons2018"],
  refsB: ["wcag22", "en301549", "bfsg", "castUdl", "gibbons2018", "klein2007", "bezos2016"],
  texts: () => ({
    headA: tt("Inclusive design and WCAG: user groups and barriers, the four principles, the key requirements in practice, and how to prioritise a measure", "Inklusives Design und WCAG: Nutzergruppen und Barrieren, die vier Prinzipien, die wichtigsten Anforderungen in der Praxis und wie man eine Maßnahme priorisiert"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Four are core; A4 on plain language, hierarchy and interaction is folded. Every diagram uses LearnLoop and other made-up people, so the task is never answered for you.", "Fünf Karten, Level 1 und Level 2 in einem Durchgang. Vier sind Kern; A4 zu schlichter Sprache, Hierarchie und Interaktion ist eingeklappt. Jedes Diagramm nutzt LearnLoop und andere erfundene Menschen, damit die Aufgabe nie für Sie gelöst wird."),
    headB: tt("Accessibility as a strategic quality: requirement, priority, process and measure, the conflicts of cost and standard, and a decision with an unknown scale", "Barrierefreiheit als strategische Qualität: Anforderung, Priorität, Prozess und Messung, die Konflikte von Kosten und Standard und eine Entscheidung mit unbekanntem Ausmaß"),
    leadB: tt("Three cards for Level 3. You stop sorting single barriers and start deciding how to implement the standard, how to build it into the process, and what waits. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie ordnen keine einzelnen Barrieren mehr ein, sondern entscheiden, wie der Standard umgesetzt wird, wie er in den Prozess eingebaut wird und was wartet. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen."),
    optionalReason: tt("Names plain language, a clear hierarchy and intuitive interaction; the structure rules a Core block needs are repeated in A3 and B1, so no Core task block needs this card.", "Nennt schlichte Sprache, eine klare Hierarchie und intuitive Interaktion; die Strukturregeln, die ein Kernblock braucht, stehen auch in A3 und B1, kein Kern-Aufgabenblock braucht diese Karte also."),
  }),
});

export const KIT: GenKit = {
  Evidence: AccessLearnScreens,
  measureThumb: (id) => <MeasureThumb kind={MEASURE[id]} />,
  optionThumb: (id) => <MeasureThumb kind={OPTION[id]} />,
  decisionThumb: (id) => <MeasureThumb kind={DECISION[id]} />,
  MateriA: M.MateriA,
  MateriB: M.MateriB,
};
