import { DECISION_BY_ID, DECISION_IDS, R2_BUDGET, R2_MONTHS } from "@/data/day1/route2";
import type { DecisionId } from "@/data/day1/route2";
import { DPANEL, SLOW_PERCENT, STANDING_MONTHS } from "@/data/day1/route2Panel";
import { euro, tt } from "@/lib/lang";

/**
 * The logic of the Day 1 Route 2 decision panel (CLAUDE.md #47, adapted): one place that turns the learner's three decisions and their order into
 * what the diagram, the three bars, the four tests, the memo and the mentor all say. Nothing here is a verdict: every line is a fact about the plan
 * and, where something is open, the rule from Materi B1 to B3 and two ways to act. The learner calculates nothing (#44).
 *
 * Time is derived: a decision that leans on others starts when they are in use (month 1 if it leans on none); it is in use at start + its months
 * (weeks ÷ 4, rounded up; 25% longer in the slower scenario). With twelve months the time test catches what starts late.
 */
export type Scn = 0 | 1;
export type PlanState = { picks: DecisionId[]; order: DecisionId[] };

const chosen = (s: PlanState, id: DecisionId) => s.picks.includes(id);
const nm = (id: DecisionId) => DPANEL[id].short;
const card = (id: DecisionId) => tt(`“${DECISION_BY_ID[id].name}”`, `„${DECISION_BY_ID[id].name}“`);
const names = (ids: DecisionId[]) => ids.map((i) => card(i)).join(tt(" and ", " und "));
const orJoin = (ids: DecisionId[]) => ids.map((i) => card(i)).join(tt(" or ", " oder "));

export const monthsOf = (id: DecisionId, scn: Scn) => (DPANEL[id].standing ? STANDING_MONTHS : Math.ceil((DECISION_BY_ID[id].weeks * (100 + SLOW_PERCENT * scn)) / 100 / 4));

/** The decisions a chosen one leans on that are not in the plan. For "any of" it is the whole list when none of them is chosen. */
export function missingNeeds(s: PlanState, id: DecisionId): DecisionId[] {
  const f = DPANEL[id];
  const all = f.needs.filter((n) => !chosen(s, n));
  const any = f.needsAny.length > 0 && !f.needsAny.some((n) => chosen(s, n)) ? f.needsAny : [];
  return [...all, ...any];
}

export function startOf(s: PlanState, id: DecisionId, scn: Scn): number {
  const f = DPANEL[id];
  const leans = [...f.needs, ...f.needsAny].filter((n) => chosen(s, n));
  return leans.length === 0 ? 1 : Math.max(...leans.map((n) => inUseOf(s, n, scn)));
}
export function inUseOf(s: PlanState, id: DecisionId, scn: Scn): number {
  return startOf(s, id, scn) + monthsOf(id, scn);
}

export type DItem = { id: DecisionId; chosen: boolean; pos: number | null; start: number | null; inUse: number | null; missing: DecisionId[]; late: boolean; purposeless: boolean; notes: string[] };
export type DBars = { spent: number; over: number; left: number; aimed: number | null; risk: number | null };
export type DTestId = "first" | "needs" | "purpose" | "budget";
export type DWay = { text: string; go: DecisionId[] };
export type DOpen = { fact: string; plain: string; rule: string; where: DecisionId[]; ways: DWay[] };
export type DTest = { id: DTestId; name: string; rule: string; applies: boolean; holds: boolean; open: DOpen[] };
export type DPlan = { items: Record<DecisionId, DItem>; bars: DBars; tests: DTest[]; holding: number; applicable: number };

function itemOf(s: PlanState, id: DecisionId, scn: Scn): DItem {
  const on = chosen(s, id);
  const f = DPANEL[id];
  if (!on) return { id, chosen: false, pos: null, start: null, inUse: null, missing: [], late: false, purposeless: false, notes: [] };
  const start = startOf(s, id, scn);
  const inUse = inUseOf(s, id, scn);
  const missing = missingNeeds(s, id);
  const late = !f.standing && inUse > R2_MONTHS;
  const purposeless = !f.fixes && !f.evidence;
  const notes: string[] = [];
  if (missing.length > 0) notes.push(tt(`leans on ${orJoinNeeds(id, missing)}, which is not in your plan`, `stützt sich auf ${orJoinNeeds(id, missing)}, das nicht in Ihrem Plan ist`));
  if (late) notes.push(tt(`in use only in month ${inUse}, after the ${R2_MONTHS} months`, `erst in Monat ${inUse} im Einsatz, nach den ${R2_MONTHS} Monaten`));
  if (f.blackBox) notes.push(tt("learners cannot see why they are shown what they are shown", "Lernende können nicht sehen, warum ihnen gezeigt wird, was ihnen gezeigt wird"));
  if (purposeless && !f.blackBox) notes.push(tt("names no problem of the case it fixes", "nennt kein Problem des Falls, das es behebt"));
  const pos = s.order.indexOf(id);
  if (pos === 0 && !f.fundamental) notes.push(tt("first in your roadmap, but nothing else rests on it", "an erster Stelle Ihrer Roadmap, aber nichts anderes ruht darauf"));
  return { id, chosen: true, pos: pos >= 0 ? pos + 1 : null, start, inUse, missing, late, purposeless, notes };
}

function orJoinNeeds(id: DecisionId, missing: DecisionId[]): string {
  const any = DPANEL[id].needsAny.length > 0 && missing.some((m) => DPANEL[id].needsAny.includes(m)) && !missing.every((m) => DPANEL[id].needs.includes(m));
  const all = missing.filter((m) => DPANEL[id].needs.includes(m));
  const anyList = missing.filter((m) => DPANEL[id].needsAny.includes(m));
  const parts: string[] = [];
  if (all.length) parts.push(names(all));
  if (any && anyList.length) parts.push(orJoin(anyList));
  return parts.join(tt(" and ", " und "));
}

function barsOf(s: PlanState, items: Record<DecisionId, DItem>): DBars {
  const spent = s.picks.reduce((x, id) => x + DECISION_BY_ID[id].cost, 0);
  let aimed = 0;
  let risk = 0;
  for (const id of s.picks) {
    const c = DECISION_BY_ID[id].cost;
    const v = items[id];
    const f = DPANEL[id];
    if ((f.fixes || f.evidence) && v.missing.length === 0 && !v.late) aimed += c;
    if (v.purposeless || v.missing.length > 0 || v.late) risk += c;
  }
  return { spent, over: Math.max(0, spent - R2_BUDGET), left: R2_BUDGET - spent, aimed: spent ? Math.round((aimed / spent) * 100) : null, risk: spent ? Math.round((risk / spent) * 100) : null };
}

/** The aimed and risk bars are ranges across the two delivery scenarios: [as estimated, 25% slower]. */
export function rangeOf(s: PlanState): { aimed: [number | null, number | null]; risk: [number | null, number | null] } {
  const a = planOf(s, 0).bars;
  const w = planOf(s, 1).bars;
  return { aimed: [a.aimed, w.aimed], risk: [a.risk, w.risk] };
}

/* ------------------------------------------------------------------ the four tests */

const TEST_NAME: Record<DTestId, () => string> = {
  first: () => tt("The first decision is the one the others rest on", "Die erste Entscheidung ist die, auf der die anderen ruhen"),
  needs: () => tt("A decision has what it leans on", "Eine Entscheidung hat, worauf sie sich stützt"),
  purpose: () => tt("Every decision has a purpose", "Jede Entscheidung hat einen Zweck"),
  budget: () => tt(`It fits the budget and the ${R2_MONTHS} months`, `Es passt ins Budget und in die ${R2_MONTHS} Monate`),
};
const TEST_RULE: Record<DTestId, () => string> = {
  first: () => tt("Order decisions by what unlocks the others: usually the fix every learner meets (orientation), or the evidence that tells you why learners leave. Your reason for position one says which it is (Materi B2, B3).", "Ordnen Sie Entscheidungen danach, was die anderen freischaltet: meist die Lösung, auf die jede Lernende trifft (Orientierung), oder die Belege dafür, warum Lernende gehen. Ihr Grund für Platz eins sagt, welches es ist (Materi B2, B3)."),
  needs: () => tt("An extra or a growth decision waits for the fix every learner meets; a system that recommends lessons also waits for data on what learners do. A big rebuild waits for evidence of what to rebuild. Check whether the business goal depends on the user goal (Materi B2, B3).", "Ein Extra oder eine Wachstumsentscheidung wartet auf die Lösung, auf die jede Lernende trifft; ein System, das Lektionen empfiehlt, wartet außerdem auf Daten dazu, was Lernende tun. Ein großer Neubau wartet auf Belege dafür, was neu zu bauen ist. Prüfen Sie, ob das Geschäftsziel vom Nutzerziel abhängt (Materi B2, B3)."),
  purpose: () => tt("A funded decision fixes a problem the case names or finds its cause. A drop-out rate counts who left, not why: until you know the cause it is a symptom (Materi B1). A decision that does neither is a bet: say what it changes for learners and how you will see it.", "Eine finanzierte Entscheidung behebt ein Problem, das der Fall nennt, oder findet seine Ursache. Eine Abbruchquote zählt, wer gegangen ist, nicht warum: Solange Sie die Ursache nicht kennen, ist sie ein Symptom (Materi B1). Eine Entscheidung, die keines von beidem tut, ist eine Wette: Sagen Sie, was sie für Lernende ändert und woran Sie es sehen."),
  budget: () => tt(`Your decisions stay inside ${euro(R2_BUDGET)} and are all in use by month ${R2_MONTHS}. Prefer what you can undo cheaply while you learn (Materi B3).`, `Ihre Entscheidungen bleiben innerhalb von ${euro(R2_BUDGET)} und sind alle bis Monat ${R2_MONTHS} im Einsatz. Bevorzugen Sie, was Sie günstig zurücknehmen können, während Sie lernen (Materi B3).`),
};
export const DTEST_IDS: DTestId[] = ["first", "needs", "purpose", "budget"];

const PLAIN_NEEDS: Partial<Record<DecisionId, () => string>> = {
  d5: () => tt("Points and badges would sit on a platform where learners still cannot see where to start. They would collect points in a place they find confusing, and a reward does not fix why they leave.", "Punkte und Badges säßen auf einer Plattform, auf der Lernende noch nicht sehen, wo sie anfangen. Sie sammelten Punkte an einem Ort, den sie verwirrend finden, und eine Belohnung behebt nicht, warum sie gehen."),
  d9: () => tt("A mobile app would carry the same unclear courses onto a phone. Learners would meet the same confusion in a smaller window.", "Eine Mobile App trüge dieselben unklaren Kurse aufs Handy. Lernende träfen dieselbe Verwirrung in einem kleineren Fenster."),
  d12: () => tt("Ten new courses would join a platform where learners still cannot see where to start. More courses to get lost in do not keep the 40 who leave.", "Zehn neue Kurse kämen auf eine Plattform, auf der Lernende noch nicht sehen, wo sie anfangen. Mehr Kurse, in denen man sich verirrt, halten die 40, die gehen, nicht."),
  d11: () => tt("Rebuilding everything in one go rebuilds on a guess: you do not yet know why learners leave. If the guess is wrong there is no way back, and the whole year's money is gone.", "Alles auf einmal neu zu bauen heißt, auf eine Vermutung hin zu bauen: Sie wissen noch nicht, warum Lernende gehen. Ist die Vermutung falsch, gibt es keinen Weg zurück, und das Geld des ganzen Jahres ist weg."),
  d7: () => tt("Doubling the marketing brings more new learners to the same platform. About 40 of every 100 still leave, so you would pay to lose more learners at the same rate.", "Das Marketing zu verdoppeln bringt mehr neue Lernende auf dieselbe Plattform. Etwa 40 von je 100 gehen weiter, Sie würden also dafür zahlen, mehr Lernende in gleicher Rate zu verlieren."),
};

function testsOf(s: PlanState, items: Record<DecisionId, DItem>, bars: DBars): DTest[] {
  const picks = s.picks;
  const view = (id: DTestId, applies: boolean, open: DOpen[]): DTest => ({ id, name: TEST_NAME[id](), rule: TEST_RULE[id](), applies, holds: applies && open.length === 0, open });
  const fundamentalsIn = picks.filter((id) => DPANEL[id].fundamental);

  // 1 · the first decision is the one the others rest on
  const fOpen: DOpen[] = [];
  const first = s.order.find((id) => chosen(s, id)) ?? picks[0];
  if (first && !DPANEL[first].fundamental) {
    fOpen.push({
      fact: tt(`Your first decision is ${card(first)}, but nothing else in your plan rests on it.`, `Ihre erste Entscheidung ist ${card(first)}, aber nichts anderes in Ihrem Plan ruht auf ihr.`),
      plain: tt(`Starting with ${nm(first)} does not unlock the others. What the others lean on is a path every learner meets, or evidence about why learners leave. Put one of those first, or be ready to say why ${nm(first)} must come before them.`, `Mit ${nm(first)} zu beginnen schaltet die anderen nicht frei. Worauf sich die anderen stützen, ist ein Pfad, auf den jede Lernende trifft, oder Belege dafür, warum Lernende gehen. Setzen Sie eines davon an die erste Stelle, oder sagen Sie, warum ${nm(first)} vor ihnen kommen muss.`),
      where: [first, ...fundamentalsIn],
      rule: TEST_RULE.first(),
      ways:
        fundamentalsIn.length > 0
          ? [
              { text: tt(`In the roadmap below, move ${card(fundamentalsIn[0])} to position 1 with the arrow buttons.`, `Verschieben Sie in der Roadmap unten ${card(fundamentalsIn[0])} mit den Pfeiltasten auf Platz 1.`), go: [fundamentalsIn[0]] },
              { text: tt("Or keep your order, and say in your reason below why it must come first.", "Oder behalten Sie Ihre Reihenfolge und sagen Sie unten in Ihrem Grund, warum sie zuerst kommen muss."), go: [] },
            ]
          : [
              { text: tt(`Add ${card("d1")} or ${card("d4")} to your plan and put it first: the others can then rest on it.`, `Nehmen Sie ${card("d1")} oder ${card("d4")} in Ihren Plan auf und setzen Sie sie an die erste Stelle: Die anderen können dann darauf ruhen.`), go: ["d1", "d4"] },
              { text: tt("Or keep your plan, and say in your reason below why it must come first.", "Oder behalten Sie Ihren Plan und sagen Sie unten in Ihrem Grund, warum sie zuerst kommen muss."), go: [] },
            ],
    });
  }

  // 2 · a decision has what it leans on
  const nOpen: DOpen[] = [];
  for (const id of picks) {
    const v = items[id];
    if (v.missing.length === 0) continue;
    const needsPath = v.missing.includes("d1");
    const needsData = v.missing.some((m) => DPANEL[id].needsAny.includes(m));
    const plain =
      id === "d6"
        ? tt(
            `AI recommendations need ${needsPath ? "a clear path to recommend along" : ""}${needsPath && needsData ? " and " : ""}${needsData ? "data on what learners do to learn from" : ""}. Without ${needsPath && needsData ? "them" : "it"} the system would guess the next lesson, and learners could not see why they are shown it.`,
            `KI-Empfehlungen brauchen ${needsPath ? "einen klaren Pfad, an dem sie entlang empfehlen" : ""}${needsPath && needsData ? " und " : ""}${needsData ? "Daten dazu, was Lernende tun, um daraus zu lernen" : ""}. Ohne ${needsPath && needsData ? "sie" : "das"} würde das System die nächste Lektion raten, und Lernende könnten nicht sehen, warum sie ihnen gezeigt wird.`,
          )
        : (PLAIN_NEEDS[id]?.() ?? "");
    nOpen.push({
      fact: tt(`${nm(id)}: leans on ${orJoinNeeds(id, v.missing)}, which is not in your plan.`, `${nm(id)}: stützt sich auf ${orJoinNeeds(id, v.missing)}, das nicht in Ihrem Plan ist.`),
      plain,
      where: [id],
      rule: TEST_RULE.needs(),
      ways: [
        { text: tt(`Add ${orJoin(v.missing)} to your plan.`, `Nehmen Sie ${orJoin(v.missing)} in Ihren Plan auf.`), go: v.missing },
        { text: tt(`Or remove ${card(id)} from your plan.`, `Oder nehmen Sie ${card(id)} aus Ihrem Plan heraus.`), go: [id] },
        { text: tt("Or keep it, and say in your reason what the plan does until what it leans on is in place.", "Oder behalten Sie es und sagen Sie in Ihrem Grund, was der Plan tut, bis das, worauf es sich stützt, steht."), go: [] },
      ],
    });
  }

  // 3 · every decision has a purpose
  const pOpen: DOpen[] = picks
    .filter((id) => items[id].purposeless)
    .map((id) => ({
      fact: DPANEL[id].blackBox
        ? tt(`${nm(id)} names no problem of the case it fixes, and learners cannot see why they are shown what they are shown.`, `${nm(id)} nennt kein Problem des Falls, das es behebt, und Lernende können nicht sehen, warum ihnen gezeigt wird, was ihnen gezeigt wird.`)
        : id === "d7"
          ? tt(`${nm(id)} names no problem of the case it fixes: it aims at growth, not at the experience.`, `${nm(id)} nennt kein Problem des Falls, das es behebt: Es zielt auf Wachstum, nicht auf das Erlebnis.`)
          : id === "d10"
            ? tt(`${nm(id)} names no problem of the case it fixes: it changes the look, not the experience. No finding in the brief is about the look.`, `${nm(id)} nennt kein Problem des Falls, das es behebt: Es ändert das Aussehen, nicht das Erlebnis. Kein Befund im Auftrag betrifft das Aussehen.`)
            : id === "d12"
              ? tt(`${nm(id)} names no problem of the case it fixes: it adds content, and nothing in the brief says learners leave for lack of courses.`, `${nm(id)} nennt kein Problem des Falls, das es behebt: Es fügt Inhalt hinzu, und nichts im Auftrag sagt, dass Lernende gehen, weil es zu wenige Kurse gibt.`)
          : tt(`${nm(id)} names no problem of the case it fixes: nothing in the brief says learners leave for lack of it.`, `${nm(id)} nennt kein Problem des Falls, das es behebt: Nichts im Auftrag sagt, dass Lernende gehen, weil es fehlt.`),
      plain: tt(
        `You would spend ${euro(DECISION_BY_ID[id].cost)} on a decision whose effect on the 40 who leave nobody can name. After the ${R2_MONTHS} months you could not say whether it kept a single learner.`,
        `Sie gäben ${euro(DECISION_BY_ID[id].cost)} für eine Entscheidung aus, deren Wirkung auf die 40, die gehen, niemand benennen kann. Nach den ${R2_MONTHS} Monaten könnten Sie nicht sagen, ob sie auch nur eine Lernende gehalten hat.`,
      ),
      where: [id],
      rule: TEST_RULE.purpose(),
      ways: [
        { text: tt(`Remove it, or add a decision that fixes a problem of the case, such as ${card("d1")}, ${card("d2")} or ${card("d3")}, or finds its cause, such as ${card("d4")}.`, `Nehmen Sie sie heraus oder ergänzen Sie eine Entscheidung, die ein Problem des Falls behebt, etwa ${card("d1")}, ${card("d2")} oder ${card("d3")}, oder seine Ursache findet, etwa ${card("d4")}.`), go: ["d1", "d2", "d3", "d4"] as DecisionId[] },
        { text: tt("Or keep it, and say in your reasons what it changes for learners and how you will see it.", "Oder behalten Sie sie und sagen Sie in Ihren Begründungen, was sie für Lernende ändert und woran Sie es sehen."), go: [] as DecisionId[] },
      ],
    }));

  // 4 · budget and the twelve months
  const bOpen: DOpen[] = [];
  if (bars.over > 0)
    bOpen.push({
      fact: tt(`Your decisions cost ${euro(bars.spent)}, which is ${euro(bars.over)} over the ${euro(R2_BUDGET)} budget.`, `Ihre Entscheidungen kosten ${euro(bars.spent)}, das sind ${euro(bars.over)} über dem Budget von ${euro(R2_BUDGET)}.`),
      plain: tt(`Your plan spends more than the ${euro(R2_BUDGET)} you have. To fit, take out decisions worth at least ${euro(bars.over)}, or swap one for a cheaper one. Your decisions are listed below with their costs, most expensive first; choose the one whose case you find weakest.`, `Ihr Plan gibt mehr aus als die ${euro(R2_BUDGET)}, die Sie haben. Damit er passt, nehmen Sie Entscheidungen im Wert von mindestens ${euro(bars.over)} heraus oder tauschen Sie eine gegen eine günstigere. Ihre Entscheidungen stehen unten mit ihren Kosten, die teuerste zuerst; wählen Sie die, deren Begründung Sie am schwächsten finden.`),
      where: [],
      rule: TEST_RULE.budget(),
      ways: [
        { text: tt(`Remove one or more of these, or swap one for a cheaper decision (together at least ${euro(bars.over)} less):`, `Nehmen Sie eine oder mehrere davon heraus oder tauschen Sie eine gegen eine günstigere (zusammen mindestens ${euro(bars.over)} weniger):`), go: [...picks].sort((a, b) => DECISION_BY_ID[b].cost - DECISION_BY_ID[a].cost) },
        { text: tt("Or keep the total, and say in your reasons why it is worth going over.", "Oder behalten Sie die Summe und sagen Sie in Ihren Begründungen, warum es sich lohnt, darüber zu liegen."), go: [] },
      ],
    });
  for (const id of picks) {
    const v = items[id];
    if (!v.late) continue;
    bOpen.push({
      fact: tt(`${nm(id)}: in use only in month ${v.inUse}, after the ${R2_MONTHS} months (it starts in month ${v.start} and takes ${v.inUse! - v.start!} months).`, `${nm(id)}: erst in Monat ${v.inUse} im Einsatz, nach den ${R2_MONTHS} Monaten (es startet in Monat ${v.start} und dauert ${v.inUse! - v.start!} Monate).`),
      plain: tt(`${nm(id)} would be ready only after the year ends, so it cannot show a result inside the ${R2_MONTHS} months.`, `${nm(id)} wäre erst nach dem Ende des Jahres fertig und kann also innerhalb der ${R2_MONTHS} Monate kein Ergebnis zeigen.`),
      where: [id],
      rule: TEST_RULE.budget(),
      ways: [
        { text: tt(`Remove ${card(id)}, or swap it for a decision that is in use sooner.`, `Nehmen Sie ${card(id)} heraus oder tauschen Sie es gegen eine Entscheidung, die früher im Einsatz ist.`), go: [id] },
        { text: tt(`Or keep it, and say in your reasons what the plan does without it before month ${R2_MONTHS + 1}.`, `Oder behalten Sie es und sagen Sie in Ihren Begründungen, was der Plan ohne es vor Monat ${R2_MONTHS + 1} tut.`), go: [] },
      ],
    });
  }

  const any = picks.length > 0;
  return [view("first", any, fOpen), view("needs", any, nOpen), view("purpose", any, pOpen), view("budget", any, bOpen)];
}

/** Everything the panel shows for one delivery scenario. */
export function planOf(s: PlanState, scn: Scn): DPlan {
  const items = Object.fromEntries(DECISION_IDS.map((id) => [id, itemOf(s, id, scn)])) as Record<DecisionId, DItem>;
  const bars = barsOf(s, items);
  const tests = testsOf(s, items, bars);
  const applicable = tests.filter((x) => x.applies).length;
  return { items, bars, tests, holding: tests.filter((x) => x.holds).length, applicable };
}
