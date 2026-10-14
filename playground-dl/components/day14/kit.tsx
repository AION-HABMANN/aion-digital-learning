"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day14/Cards";
import { ClearScreen, MeasureThumb } from "@/components/day14/mocks";
import type { ClScreen, ThumbKind } from "@/components/day14/mocks";
import type { GenKit } from "@/components/dayGen/GenBits";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { Diagram } from "@/components/materi/kit";
import { MATS } from "@/data/day14/materials";
import { tt } from "@/lib/lang";

/** Day 14 · what the page frames and the engine need besides the spec: the evidence screens, the thumbnails and the study cards. */

function ClearLearnScreens() {
  const items: [ClScreen, string][] = [
    ["text", tt("The welcome text", "Der Willkommenstext")],
    ["form", tt("A form", "Ein Formular")],
    ["nav", tt("The menu", "Das Menü")],
    ["lesson", tt("A lesson", "Eine Lektion")],
  ];
  return (
    <Diagram label={tt("Four ClearLearn screens, drawn in outline · Case assumption: the details are made up for this exercise", "Vier ClearLearn-Bildschirme in Umrissen · Fallannahme: Die Details sind für diese Übung erfunden")}>
      <div className="mx-auto grid max-w-[640px] grid-cols-2 gap-x-3 gap-y-3">
        {items.map(([k, name]) => (
          <div key={k}>
            <ClearScreen kind={k} />
            <p className="mt-1 text-center text-caption font-bold text-ink">{name}</p>
          </div>
        ))}
      </div>
    </Diagram>
  );
}

const MEASURE: Record<string, ThumbKind> = { m1: "plain", m2: "structure", m3: "nav", m4: "test", m5: "terms", m6: "functions", m7: "visual", m8: "manual", m9: "cut" };
const OPTION: Record<string, ThumbKind> = { A: "plain", B: "nav", C: "functions" };
const DECISION: Record<string, ThumbKind> = { d1: "plain", d2: "nav", d3: "loop", d4: "training", d5: "functions", d6: "help", d7: "cut" };

const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["iso24495", "ecClear2011", "nielsen1994", "krug2014", "shneiderman2016", "nielsen2000", "gibbons2018"],
  refsB: ["iso24495", "nielsen2000", "krug2014", "nielsen1994", "klein2007", "bezos2016"],
  texts: () => ({
    headA: tt("Plain language, usability and testing: short sentences and clear terms, an intuitive structure, testing with different users, and how to weigh a measure", "Schlichte Sprache, Usability und Testen: kurze Sätze und klare Begriffe, eine intuitive Struktur, Testen mit verschiedenen Nutzern und wie man eine Maßnahme abwägt"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Four are core; A4 on optimising inclusive UX is folded. Every diagram uses LearnLoop and other made-up people, so the task is never answered for you.", "Fünf Karten, Level 1 und Level 2 in einem Durchgang. Vier sind Kern; A4 zur Optimierung inklusiver UX ist eingeklappt. Jedes Diagramm nutzt LearnLoop und andere erfundene Menschen, damit die Aufgabe nie für Sie gelöst wird."),
    headB: tt("Comprehensibility as a strategic quality: find the hurdle, simplify, test and adjust, the conflicts of simplicity and information, and a decision without knowing where learners stop", "Verständlichkeit als strategische Qualität: Hürde finden, vereinfachen, testen und anpassen, die Konflikte von Einfachheit und Information und eine Entscheidung, ohne zu wissen, wo Lernende aufhören"),
    leadB: tt("Three cards for Level 3. You stop sorting single hurdles and start deciding how to simplify, how to reshape the structure and how to keep testing. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie ordnen keine einzelnen Hürden mehr ein, sondern entscheiden, wie vereinfacht wird, wie die Struktur umgestaltet wird und wie weiter getestet wird. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen."),
    optionalReason: tt("Names the loop of change, test, measure and adjust; the loop is repeated in A3 and B1, so no Core task block needs this card.", "Nennt den Kreislauf aus Ändern, Testen, Messen und Anpassen; der Kreislauf steht auch in A3 und B1, kein Kern-Aufgabenblock braucht diese Karte also."),
  }),
});

export const KIT: GenKit = {
  Evidence: ClearLearnScreens,
  measureThumb: (id) => <MeasureThumb kind={MEASURE[id]} />,
  optionThumb: (id) => <MeasureThumb kind={OPTION[id]} />,
  decisionThumb: (id) => <MeasureThumb kind={DECISION[id]} />,
  MateriA: M.MateriA,
  MateriB: M.MateriB,
};
