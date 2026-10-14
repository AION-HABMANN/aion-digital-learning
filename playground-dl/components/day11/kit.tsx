"use client";

import { CardA1, CardA2, CardA3, CardA4, CardA5, CardB1, CardB2, CardB3 } from "@/components/day11/Cards";
import { GameScreen, MeasureThumb } from "@/components/day11/mocks";
import type { GlScreen, ThumbKind } from "@/components/day11/mocks";
import type { GenKit } from "@/components/dayGen/GenBits";
import { makeMateri } from "@/components/dayGen/GenMateri";
import { Diagram } from "@/components/materi/kit";
import { MATS } from "@/data/day11/materials";
import { tt } from "@/lib/lang";

/** Day 11 · what the page frames and the engine need besides the spec: the evidence screens, the thumbnails and the study cards. */

function GameLearnScreens() {
  const items: [GlScreen, string][] = [
    ["dash", tt("The dashboard", "Das Dashboard")],
    ["board", tt("The leaderboard", "Die Rangliste")],
    ["unit", tt("A unit", "Eine Einheit")],
    ["start", tt("Start of a unit", "Beginn einer Einheit")],
  ];
  return (
    <Diagram label={tt("Four GameLearn screens, drawn in outline · Case assumption: the details are made up for this exercise", "Vier GameLearn-Bildschirme in Umrissen · Fallannahme: Die Details sind für diese Übung erfunden")}>
      <div className="mx-auto grid max-w-[640px] grid-cols-2 gap-x-3 gap-y-3">
        {items.map(([k, name]) => (
          <div key={k}>
            <GameScreen kind={k} />
            <p className="mt-1 text-center text-caption font-bold text-ink">{name}</p>
          </div>
        ))}
      </div>
    </Diagram>
  );
}

const MEASURE: Record<string, ThumbKind> = { m1: "progress", m2: "feedback", m3: "link", m4: "choice", m5: "team", m6: "badges", m7: "streak", m8: "prize", m9: "ai" };
const OPTION: Record<string, ThumbKind> = { A: "points", B: "progress", C: "story" };
const DECISION: Record<string, ThumbKind> = { d1: "progress", d2: "feedback", d3: "choice", d4: "team", d5: "evidence", d6: "leaderboard", d7: "streak" };

const M = makeMateri({
  mats: MATS,
  cards: { A1: () => <CardA1 />, A2: () => <CardA2 />, A3: () => <CardA3 />, A4: () => <CardA4 />, A5: () => <CardA5 />, B1: () => <CardB1 />, B2: () => <CardB2 />, B3: () => <CardB3 /> },
  refsA: ["deterding2011", "hamari2014", "ryanDeci2000", "deci1999", "lepper1973", "kivetz2006", "csik1990", "gibbons2018"],
  refsB: ["deterding2011", "hamari2014", "ryanDeci2000", "deci1999", "lepper1973", "kahneman1993", "klein2007", "bezos2016", "gibbons2018"],
  texts: () => ({
    headA: tt("Gamification and motivation: what game elements are, what intrinsic and extrinsic motivation mean, why activity is not learning, and how to weigh a measure", "Gamification und Motivation: was Spielelemente sind, was intrinsische und extrinsische Motivation bedeuten, warum Aktivität nicht Lernen ist und wie man eine Maßnahme abwägt"),
    leadA: tt("Five cards, Level 1 and Level 2 in one run. Four are core; A4 on the principles of meaningful gamification is folded. Every diagram uses LearnLoop and other made-up people, so the task is never answered for you.", "Fünf Karten, Level 1 und Level 2 in einem Durchgang. Vier sind Kern; A4 zu den Prinzipien sinnvoller Gamification ist eingeklappt. Jedes Diagramm nutzt LearnLoop und andere erfundene Menschen, damit die Aufgabe nie für Sie gelöst wird."),
    headB: tt("Gamification as a strategic tool: objective, mechanic, behaviour, the conflicts of short-term effect, manipulation and overload, and a decision without proof", "Gamification als strategisches Werkzeug: Ziel, Mechanik, Verhalten, die Konflikte von kurzfristiger Wirkung, Manipulation und Überlastung und eine Entscheidung ohne Beleg"),
    leadB: tt("Three cards for Level 3. You stop sorting single elements and start deciding whether and how to gamify, what each mechanic is for, and what waits. Each diagram uses LearnLoop, another company.", "Drei Karten für Level 3. Sie ordnen keine einzelnen Elemente mehr ein, sondern entscheiden, ob und wie gamifiziert wird, wofür jede Mechanik da ist und was wartet. Jedes Diagramm nutzt LearnLoop, ein anderes Unternehmen."),
    optionalReason: tt("Names the link, the fairness of rules and the match of challenge and ability; the link rule is repeated in A3 and B1, so no Core task block needs this card.", "Nennt die Verbindung, die Fairness der Regeln und die Passung von Herausforderung und Fähigkeit; die Verbindungsregel steht auch in A3 und B1, kein Kern-Aufgabenblock braucht diese Karte also."),
  }),
});

export const KIT: GenKit = {
  Evidence: GameLearnScreens,
  measureThumb: (id) => <MeasureThumb kind={MEASURE[id]} />,
  optionThumb: (id) => <MeasureThumb kind={OPTION[id]} />,
  decisionThumb: (id) => <MeasureThumb kind={DECISION[id]} />,
  MateriA: M.MateriA,
  MateriB: M.MateriB,
};
