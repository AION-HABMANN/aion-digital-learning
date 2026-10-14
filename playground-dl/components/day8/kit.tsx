"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day8/Cards";
import { MeasureThumb, StructScreen } from "@/components/day8/mocks";
import type { SlScreen, ThumbKind } from "@/components/day8/mocks";
import type { GenKit } from "@/components/dayGen/GenBits";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { Diagram } from "@/components/materi/kit";
import { MATS } from "@/data/day8/materials";
import { tt } from "@/lib/lang";

/** Day 8 · what the page frames and the engine need besides the spec: the evidence screens, the thumbnails and the study cards. */

function StructLearnScreens() {
  const items: [SlScreen, string][] = [
    ["home", tt("Home and menu", "Startseite und Menü")],
    ["course", tt("A course page", "Eine Kursseite")],
    ["lesson", tt("The end of a lesson", "Das Ende einer Lektion")],
    ["tools", tt("Quiz, profile, editor", "Quiz, Profil, Editor")],
  ];
  return (
    <Diagram label={tt("Four StructLearn screens, drawn in outline · Case assumption: the details are made up for this exercise", "Vier StructLearn-Bildschirme in Umrissen · Fallannahme: Die Details sind für diese Übung erfunden")}>
      <div className="mx-auto grid max-w-[640px] grid-cols-2 gap-x-3 gap-y-3">
        {items.map(([k, name]) => (
          <div key={k}>
            <StructScreen kind={k} />
            <p className="mt-1 text-center text-caption font-bold text-ink">{name}</p>
          </div>
        ))}
      </div>
    </Diagram>
  );
}

const MEASURE: Record<string, ThumbKind> = { m1: "ia", m2: "calm", m3: "nav", m4: "cta", m5: "style", m6: "deco", m7: "dark", m8: "brand", m9: "search" };
const OPTION: Record<string, ThumbKind> = { A: "calm", B: "nav", C: "deco" };
const DECISION: Record<string, ThumbKind> = { d1: "ia", d2: "style", d3: "page", d4: "test", d5: "tour", d6: "brand", d7: "anim" };

const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["rosenfeld2015", "spencer2009", "krug2014", "wertheimer1923", "hick1952", "fitts1954", "nielsen1994", "nielsen1993rt", "nielsen2006pd", "nielsen2006", "norman2013", "shneiderman2016", "bringhurst2012", "sweller1998", "mayer2009", "wcag22", "gibbons2018"],
  refsB: ["norman2013", "rosenfeld2015", "shneiderman2016", "nielsen2006pd", "nielsen1994", "spencer2009", "nielsen2000", "klein2007", "bezos2016", "gibbons2018"],
  texts: () => ({
    headA: tt("UX/UI basics: structure, visual design, interaction and user guidance, the typical mistakes, and how to weigh a design measure", "UX/UI-Grundlagen: Struktur, visuelles Design, Interaktion und Nutzerführung, die typischen Fehler und wie man eine Designmaßnahme abwägt"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Four are core; A4 on the typical mistakes is folded. Every diagram uses LearnLoop and other made-up people, so the task is never answered for you.", "Fünf Karten, Level 1 und Level 2 in einem Durchgang. Vier sind Kern; A4 zu den typischen Fehlern ist eingeklappt. Jedes Diagramm nutzt LearnLoop und andere erfundene Menschen, damit die Aufgabe nie für Sie gelöst wird."),
    headB: tt("Design as decision architecture: why structure beats surface, the conflicts of design against functionality and too complex against too reduced, and a decision without user tests", "Design als Entscheidungsarchitektur: warum Struktur Oberfläche schlägt, die Konflikte Design gegen Funktionalität und zu komplex gegen zu reduziert, und eine Entscheidung ohne Nutzertests"),
    leadB: tt("Three cards for Level 3. You stop sorting single facts and start deciding how a whole platform is structured, what it may refuse, and what waits. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie ordnen keine einzelnen Fakten mehr ein, sondern entscheiden, wie eine ganze Plattform aufgebaut ist, was sie ablehnen darf und was wartet. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen."),
    optionalReason: tt("Names the three typical mistakes and links them to learning psychology; the three mistakes are repeated in A1 to A3, so no Core task block needs this card.", "Nennt die drei typischen Fehler und verbindet sie mit der Lernpsychologie; die drei Fehler stehen auch in A1 bis A3, kein Kern-Aufgabenblock braucht diese Karte also."),
  }),
});

export const KIT: GenKit = {
  Evidence: StructLearnScreens,
  measureThumb: (id) => <MeasureThumb kind={MEASURE[id]} />,
  optionThumb: (id) => <MeasureThumb kind={OPTION[id]} />,
  decisionThumb: (id) => <MeasureThumb kind={DECISION[id]} />,
  MateriA: M.MateriA,
  MateriB: M.MateriB,
};
