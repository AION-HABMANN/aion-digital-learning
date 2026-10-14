import { BARRIERS, BARRIER_MODEL, BUDGET, FACTS, FACT_AREA, MEASURES, METHODS, MODEL_IMPACT, MODEL_MEASURES, MODEL_METHODS, MODEL_OPT_IMPACT, MODEL_OPT_ORDER, MODEL_OPT_RISK, MODEL_RISK, OPTS, PRINCIPLES, PRINCIPLE_IDS, WEEKS_LIMIT, effortBand, totalCost } from "@/data/day7/case";
import { DECISIONS, EVALS, KPIS, MODEL_DECISIONS, MODEL_EVALS, MODEL_KPIS, MODEL_RISK_PICK, PLACES, MODEL_PLACES, RISKS } from "@/data/day7/route2";
import { MENTOR_NOTE } from "@/lib/day7/mentorKey";
import type { AnswerKeyBlock } from "@/lib/answerKey";
import { euro } from "@/lib/lang";

/**
 * Mentor-only answer keys for the exercises where the learner picks from fixed options (CLAUDE.md #7): the expected pick and a reason per option, including why
 * each rejected option is rejected, with a teaching note where more than one answer defends. Never exported and never shown to a learner. Mentor tools stay
 * English (#32); the option labels they quote follow the site's language.
 */
const LEVEL = ["", "Low", "Mid", "High"];

export function sortKey(): AnswerKeyBlock {
  return {
    title: "Block 1.1 · Eight facts into Perceivable, Operable, Understandable",
    expected: PRINCIPLE_IDS.map((a) => `${PRINCIPLES[a].label}: ${FACTS.filter((f) => FACT_AREA[f.id] === a).map((f) => `fact ${f.no}`).join(", ")}`).join("  |  "),
    options: FACTS.map((f) => ({ label: `Fact ${f.no} · ${f.short}`, expected: true, why: `${PRINCIPLES[FACT_AREA[f.id]].label}. ${f.why}` })),
    teachingNote:
      "The sort is objective: each fact breaks one of the three principles the plan names, and the test is what the learner cannot do. Fact 6 (14 steps over 6 screens) can be argued as Understandable (fourteen steps are hard to follow); the plan files “many steps to operate” under operation, and a learner who argues the other reading with a reason defends the choice. The groups, the improvements and the reasons are judged: any two groups defend if each is tied to a fact by number and the answer says what the group cannot do. Plan: Arbeitsauftrag 1, identify 5 possible barriers, say which user groups run into problems, formulate 3 improvements.",
  };
}

export function optKey(): AnswerKeyBlock {
  const why = (id: string) =>
    id === "A"
      ? `Reference ratings: user impact Low (it opens nothing to the groups who drop out), effort High (${euro(36000)} is above €25,000), risk Mid (a new feature can bring new barriers). An expansion that uses all ten weeks.`
      : id === "B"
        ? `Reference ratings: user impact Mid (structure, navigation and wording help many, but not those blocked by pictures, sound or a mouse-only quiz), effort Mid, risk Low. An integration. Defends as first or second.`
        : `Reference ratings: user impact High (it opens the platform to the groups who drop out), effort Mid (${euro(24000)} is under €25,000), risk Low to Mid (a patch could hide a problem). An integration.`;
  return {
    title: "Block 1.2 · Integrate or expand: three options",
    expected: `Reference order: ${MODEL_OPT_ORDER.join(", then ")} (C increase accessibility, B improve the existing UX, A new features). Impact ${MODEL_OPT_ORDER.map((id) => `${id} ${LEVEL[MODEL_OPT_IMPACT[id]]}`).join(", ")}; risk ${MODEL_OPT_ORDER.map((id) => `${id} ${LEVEL[MODEL_OPT_RISK[id]]}`).join(", ")}.`,
    options: OPTS.map((o) => ({ label: `${o.id} · ${o.name} (${euro(o.cost)}, ${o.weeks} weeks)`, expected: o.id !== "A", why: why(o.id) })),
    teachingNote: `Effort follows the printed cost by the rule in Materi A5 (under €10,000 Low, €10,000 to €25,000 Mid, above High), so the check can flag it; user impact and risk are judgements. The plan's goal is to understand integration against expansion: A expands, B and C build inclusion into what exists. B first also defends if the reason says who gains and what it leaves out. A different, well-reasoned order exports (CLAUDE.md #38).`,
  };
}

export function causeKey(): AnswerKeyBlock {
  return {
    title: "Block 2.1 · Four central barriers",
    expected: BARRIER_MODEL.map((id) => BARRIERS.find((b) => b.id === id)?.text).join(" · "),
    options: BARRIERS.map((b) => ({ label: b.text, expected: BARRIER_MODEL.includes(b.id), why: b.why })),
    teachingNote: "A central barrier is defended by a printed fact. The plan's Musterlösung names the main problem as the exclusion of certain user groups. The three rejected options are real business or content matters, but none of them stops a group of learners from doing something.",
  };
}

export function measureKey(): AnswerKeyBlock {
  const band = (cost: number) => LEVEL[effortBand(cost)];
  const why = (id: string) => {
    const m = MEASURES.find((x) => x.id === id)!;
    if (MODEL_MEASURES.includes(m.id))
      return `Reference measure (${m.area}). Effort ${band(m.cost)} by the printed cost ${euro(m.cost)}. Reference ratings: user impact ${LEVEL[MODEL_IMPACT[m.id]]}, risk ${LEVEL[MODEL_RISK[m.id]]}. ${m.id === "m1" ? "Answers facts 7 and 8." : m.id === "m2" ? "Answers facts 4, 5 and 6." : m.id === "m3" ? "Answers facts 1 and 3." : "Keeps the fixes from decaying: accessibility means usage means success only if it stays."}`;
    if (m.id === "m4") return "Defendable: it answers fact 2 for deaf and hard-of-hearing learners, effort Low (€9,000). A learner who picks it instead of M5 or M1 should name the group and the fact.";
    if (m.id === "m6") return "Rejected: a layer on top that promises to fix problems automatically; the barriers stay. Effort Mid, user impact Low, risk High (a patch hides the problem). Materi A5: fix the source before you add a layer.";
    if (m.id === "m7") return "Rejected: adds a feature and opens nothing to excluded groups; effort High (above €25,000).";
    if (m.id === "m8") return "Rejected: the look; no printed fact asks for it. Effort Mid (€25,000 is up to the limit).";
    return "Rejected: reach in another way; effort High, and it does not answer a printed barrier.";
  };
  return {
    title: "Block 2.2 · Choose four measures, rate them, order them, choose three evaluation methods",
    expected: `${MODEL_MEASURES.map((id) => MEASURES.find((m) => m.id === id)?.name).join("; ")}. Total ${euro(totalCost(MODEL_MEASURES))} of ${euro(BUDGET)}, longest 6 weeks of ${WEEKS_LIMIT}. Methods: ${MODEL_METHODS.map((id) => METHODS.find((m) => m.id === id)?.name).join("; ")}.`,
    options: [
      ...MEASURES.map((m) => ({ label: `${m.no} · ${m.name}`, expected: MODEL_MEASURES.includes(m.id), why: why(m.id) })),
      ...METHODS.map((m) => ({
        label: `${m.no} · ${m.name}`,
        expected: MODEL_METHODS.includes(m.id),
        why:
          m.id === "e1"
            ? "Reference method: finds some problems quickly, cannot find all. Gives conformance."
            : m.id === "e2"
              ? "Defends in place of E1: finds problems that tools miss (keyboard and screen reader)."
              : m.id === "e3"
                ? "Reference method: shows why a group cannot finish a task, the method that gives reasons."
                : m.id === "e4"
                  ? "Reference method: shows how many in each group are blocked, the method that gives counts."
                  : m.id === "e5"
                    ? "Defends as a compact signal; it does not show where the barrier is."
                    : "Rejected: shows how much was built, not who can use it.",
      })),
    ],
    teachingNote: `${MENTOR_NOTE} Reference order (one defensible reading): M3 first (one change on every page, answers facts 1 and 3), then M2 (a group that cannot operate cannot finish at all), then M1 (the widest reach, but six weeks of rewriting), then M5. M1 or M2 first defends equally with a reason. Effort is rule-based (under €10,000 Low, up to €25,000 Mid, above High), so the check can flag it; user impact and risk are judgements and are never marked. Choose at least one evaluation method that gives reasons and one that gives counts or conformance; the learner is judged on the reason, not on matching the reference set. A different, well-reasoned choice is acceptable and exports (CLAUDE.md #38).`,
  };
}

export function placesKey(): AnswerKeyBlock {
  return {
    title: "Block 3.1 · Where accessibility is checked",
    expected: `At least three, so that accessibility does not depend on one person. The core four: ${MODEL_PLACES.map((id) => PLACES.find((p) => p.id === id)?.text).join("; ")}.`,
    options: PLACES.map((p) => ({ label: p.text, expected: MODEL_PLACES.includes(p.id), why: `${p.reading} All seven are defensible places.` })),
    teachingNote: "The plan asks for the integration into existing processes. Any three or more defend; the point is that accessibility is checked in more than one place and does not depend on one person's interest (Materi A4, B2).",
  };
}

export function decisionKey(): AnswerKeyBlock {
  return {
    title: "Block 3.1 · Three measures for the strategy",
    expected: `${MODEL_DECISIONS.map((id) => DECISIONS.find((d) => d.id === id)?.name).join("; ")}. ${euro(MODEL_DECISIONS.reduce((s, id) => s + (DECISIONS.find((d) => d.id === id)?.cost ?? 0), 0))} of the yearly budget.`,
    options: DECISIONS.map((d) => {
      const model = MODEL_DECISIONS.includes(d.id);
      return {
        label: `${d.no} · ${d.name} (${euro(d.cost)}, ${d.weeks} weeks)`,
        expected: model,
        why: model
          ? d.id === "d1"
            ? "Reference pick: reach now. The groups blocked today stay blocked while you wait."
            : d.id === "d2"
              ? "Reference pick: integration. Otherwise new content re-creates the barriers (Materi B2)."
              : "Reference pick: evidence by group; the plan asks for an evaluation system."
          : d.id === "d4"
            ? "Defends: it prevents new inaccessible text. Instead of D3 if the reason says how it will be checked."
            : d.id === "d5"
              ? "Defends as diagnosis, but an audit finds problems and fixes none: the premortem failure “we spent the budget on an audit and had nothing left to fix”."
              : d.id === "d6"
                ? "Rejected: a layer on top; the barriers stay."
                : "Rejected: an expansion; it reaches no excluded group and uses the largest share of the budget.",
      };
    }),
    teachingNote: "Reference order: D1, D2, D3. D1 first because every month of waiting is a month of excluded learners; D2 second so that the fix lasts; D3 third to show the effect by group. D2 first also defends (it removes the dependence on one person). The budget is a live hint, not a lock (CLAUDE.md #38); a set over the €240,000 limit exports with the amount printed as a fact.",
  };
}

export function kpiKey(): AnswerKeyBlock {
  return {
    title: "Block 3.2 · The evaluation system: KPIs and methods",
    expected: `KPIs (at least three): ${MODEL_KPIS.map((id) => KPIS.find((k) => k.id === id)?.text).join("; ")}. Methods (at least two): ${MODEL_EVALS.map((id) => EVALS.find((e) => e.id === id)?.text).join("; ")}.`,
    options: [
      ...KPIS.map((k) => ({
        label: `KPI · ${k.text}`,
        expected: k.expected,
        why: k.id === "k1" ? "Shows whether a group cannot finish the main task." : k.id === "k2" ? "A symptom of exclusion." : k.id === "k3" ? "Measures the product against the standard." : k.id === "k4" ? "Shows whether the process works." : k.id === "k5" ? "A compact signal that a group has trouble." : k.id === "k6" ? "Rejected: counts use of a layer, not access." : "Rejected: counts what was built, not who can use it.",
      })),
      ...EVALS.map((e) => ({
        label: `Method · ${e.text}`,
        expected: e.expected,
        why: e.id === "v1" ? "Gives reasons." : e.id === "v2" ? "Gives conformance and finds what tools miss." : e.id === "v3" ? "Gives quick, partial conformance." : e.id === "v4" ? "Gives counts. Check the DSGVO duties before measuring by group." : "Defends as one source; it is not by group and shows no barrier.",
      })),
    ],
    teachingNote: "Choose at least one method that gives reasons (a test with users) and one that gives counts or conformance. The average hides a group: KPIs are read by group (Materi B3). Measuring by group may touch special categories of data, so a DSGVO question belongs in the answer. The learner is judged on the reason, not on matching the reference set.",
  };
}

export function riskKey(): AnswerKeyBlock {
  return {
    title: "Block 3.2 · The biggest risk (costs against benefits)",
    expected: RISKS.find((r) => r.id === MODEL_RISK_PICK)?.text ?? "",
    options: RISKS.map((r) => ({ label: r.text, expected: r.id === MODEL_RISK_PICK, why: r.answer })),
    teachingNote: "Any of the five defends with a reason and an action. The action should cost less than the risk; ask the learner to compare the two. These five are the typical answers of a premortem (Klein 2007).",
  };
}
