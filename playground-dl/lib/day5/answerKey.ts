import { BUDGET, FACTS, FACT_AREA, MEASURES, MISTAKES, MISTAKE_IDS, MODEL_IMPACT, MODEL_MEASURES, MODEL_OPT_ORDER, MODEL_RISK, OPTS, PROBLEMS, PROBLEM_MODEL, WEEKS_LIMIT, effortBand, totalCost } from "@/data/day5/case";
import { DECISIONS, EVIDENCE, MODEL_DECISIONS, MODEL_EVIDENCE, MODEL_OWNER, MODEL_RISK_PICK, OWNERS, RISKS } from "@/data/day5/route2";
import { MENTOR_NOTE } from "@/lib/day5/mentorKey";
import type { AnswerKeyBlock } from "@/lib/answerKey";
import { euro } from "@/lib/lang";

/**
 * Mentor-only answer keys for the exercises where the learner picks from fixed options (CLAUDE.md #7): the expected pick and a reason per option,
 * including why each rejected option is rejected, with a teaching note where more than one answer defends. Never exported and never shown to a learner.
 * Mentor tools stay English (#32); the option labels they quote follow the site's language.
 */
const LEVEL = ["", "Low", "Mid", "High"];

export function sortKey(): AnswerKeyBlock {
  return {
    title: "Block 1.1 · Eight facts into three mistakes",
    expected: MISTAKE_IDS.map((a) => `${MISTAKES[a].label}: ${FACTS.filter((f) => FACT_AREA[f.id] === a).map((f) => `fact ${f.no}`).join(", ")}`).join("  |  "),
    options: FACTS.map((f) => ({ label: `Fact ${f.no} · ${f.short}`, expected: true, why: `${MISTAKES[FACT_AREA[f.id]].label}. ${f.why}` })),
    teachingNote:
      "The sort is objective: one fact belongs to the mistake it breaks first. Two edges: fact 7 (a social feed opened by 2%) is Functions instead of benefits, not Overly complex, although it adds to the clutter: it was added because the software could, not for a learner task. Fact 5 (the same lesson in three lists) is Missing orientation, not complexity: the learner cannot tell which list counts. The goal field, the most frustrating fact and the three expectations are judged: any fact defends if the reason is written from the learner's side (what I expected, what I saw). Plan: Arbeitsauftrag 1, put yourself in the learner's position, describe 5 problems, formulate 3 expectations.",
  };
}

export function optKey(): AnswerKeyBlock {
  return {
    title: "Block 1.2 (Optional) · User-centredness against business goals",
    expected: `First priority: ${OPTS.find((o) => o.id === MODEL_OPT_ORDER[0])?.name}. Order: ${MODEL_OPT_ORDER.join(", ")}.`,
    options: OPTS.map((o) => ({
      label: `${o.id} · ${o.name} (${euro(o.cost)}, ${o.weeks} weeks)`,
      expected: o.id === MODEL_OPT_ORDER[0],
      why:
        o.id === "B"
          ? `Reference: simplifying the navigation gives users what they miss (user value High) and the business completion and fewer complaints (business value High). Effort ${LEVEL[effortBand(o.cost)]} by the printed cost, risk Low: structure changes, content stays.`
          : o.id === "A"
            ? "Second: more content serves a business goal, but learners who cannot find what exists will not find more; user value Low, business value Mid, risk Mid. It defends only if the learner says what the business gets and how learners will find it."
            : "Last: new features serve a marketing goal on a platform whose problem is the opposite of too few features; user value Low, risk High (a large share of the budget on an unrequested extra).",
    })),
    teachingNote: "All three ratings are judgements here and are never marked; the plan's rationale for the day is that understanding users beats the number of features. A different order defends if the justification names what the business gets from the first priority.",
  };
}

export function causeKey(): AnswerKeyBlock {
  return {
    title: "Block 2.1 (Optional) · Four central user problems and their causes",
    expected: PROBLEM_MODEL.map((id) => PROBLEMS.find((c) => c.id === id)?.text).join("  |  "),
    options: PROBLEMS.map((c) => ({ label: c.text, expected: PROBLEM_MODEL.includes(c.id), why: c.why })),
    teachingNote: "The plan's main problem is the lack of user-centredness: system logic instead of user logic. “More social features” is the popular wrong answer and fact 7 contradicts it. A learner who ticks it and points at a printed fact defends the choice; the design error written beside each chosen problem is judged on whether it names a fact number.",
  };
}

export function measureKey(): AnswerKeyBlock {
  const band = (cost: number) => LEVEL[effortBand(cost)];
  return {
    title: "Block 2.2 · Choose four measures, rate them, order them",
    expected: `${MODEL_MEASURES.map((id) => MEASURES.find((m) => m.id === id)?.name).join("; ")}. Total ${euro(totalCost(MODEL_MEASURES))} of ${euro(BUDGET)}, longest 5 weeks of ${WEEKS_LIMIT}.`,
    options: MEASURES.map((m) => {
      const model = MODEL_MEASURES.includes(m.id);
      const why = model
        ? `The plan's own measure; answers a printed fact (${m.area}). Effort ${band(m.cost)} by the printed cost ${euro(m.cost)}. Reference ratings: user value ${LEVEL[MODEL_IMPACT[m.id]]}, risk ${LEVEL[MODEL_RISK[m.id]]}.`
        : m.id === "m5"
          ? `Defendable and cheap (${euro(m.cost)}): it answers facts 1 and 2 directly. A learner who takes it in place of better structuring stays inside the budget and leaves fact 5 open; the reason should say so.`
          : m.id === "m9"
            ? "Defendable: it closes an evidence gap cheaply, but nothing changes on screen yet; as a fourth measure it leaves the printed problems unanswered."
            : m.id === "m6"
              ? `Rejected: ${euro(m.cost)} and ${m.weeks} weeks for features sales asked for, on a platform whose problem is too many features nobody uses (fact 7).`
              : m.id === "m7"
                ? "Rejected: a longer catalogue is harder to search, and learners already cannot find content."
                : "Rejected: advertising features that 2% use does not fix finding or understanding.";
      return { label: `${m.no} · ${m.name}`, expected: model, why };
    }),
    teachingNote: `${MENTOR_NOTE} Effort is rule-based (under €10,000 Low, up to €20,000 Mid, above High), so the check can flag it; user value and risk are judgements and are never marked. A different, well-reasoned choice is acceptable and exports (CLAUDE.md #38): within the budget, over it, another set of four, a different order, all with a stated reason. The plan's rationale: understanding users beats the number of features.`,
  };
}

export function decisionKey(): AnswerKeyBlock {
  return {
    title: "Block 3.1 · Three strategic UX decisions",
    expected: MODEL_DECISIONS.map((id) => DECISIONS.find((d) => d.id === id)?.name).join("; "),
    options: DECISIONS.map((d) => {
      const model = MODEL_DECISIONS.includes(d.id);
      return {
        label: `${d.no} · ${d.name} (${euro(d.cost)}, ${d.weeks} weeks)`,
        expected: model,
        why: model
          ? d.id === "d1"
            ? "Reference pick: it fixes what every learner meets and carries the plan's rationale, understanding users over the number of features (Materi B1)."
            : d.id === "d4"
              ? "Reference pick: the user data is incomplete (the plan), so the research programme is the evidence the case lacks and feeds every later decision (Materi B3)."
              : "Reference pick: a feature approval rule is the concrete decision architecture against feature creep (Materi B3)."
          : d.id === "d2"
            ? "Defendable: a feature audit calms the platform cheaply; strong if the learner pairs it with the approval rule."
            : d.id === "d3"
              ? "Defendable and strong on orientation, but €45,000 and 16 weeks; D1 already carries a continue entry."
              : d.id === "d6"
                ? "Rejected: €90,000 for the features sales asked for, with no named user problem (Materi B2)."
                : "Rejected: it counts growth in sign-ups on a platform where learners cannot find or finish a course (Materi B1).",
      };
    }),
    teachingNote: "A different set of three defends if the reason is written and the conflict analysis names what the user, the business and the other side get or lose. The budget is a live hint, not a lock (CLAUDE.md #38); a set over the €200,000 limit exports with the amount printed as a fact.",
  };
}

export function riskKey(): AnswerKeyBlock {
  return {
    title: "Block 3.2 · The biggest risk",
    expected: RISKS.find((r) => r.id === MODEL_RISK_PICK)?.text ?? "",
    options: RISKS.map((r) => ({
      label: r.text,
      expected: r.id === MODEL_RISK_PICK,
      why: r.id === MODEL_RISK_PICK ? "The risk the case itself names: the user data is incomplete, so the team may fix the wrong problem. The remedy is the research programme before the big spend." : r.id === "r2" ? "Defendable: the stakeholders pursue different goals (the plan); the approval rule is the remedy." : "Defendable as the biggest risk if the learner says what they do about it.",
    })),
    teachingNote: "The plan names wrong prioritisation as the greatest risk. Any of the five defends when the plan to meet it is concrete (what is done, by whom, when). The wrong answer is a risk with no action.",
  };
}

export function logicKey(): AnswerKeyBlock {
  return {
    title: "Block 3.2 · Who decides, and on what evidence",
    expected: `Who: ${OWNERS.find((o) => o.id === MODEL_OWNER)?.text}. Evidence: ${MODEL_EVIDENCE.map((id) => EVIDENCE.find((c) => c.id === id)?.text).join("; ")}.`,
    options: [
      ...OWNERS.map((o) => ({ label: `Who decides: ${o.text}`, expected: o.id === MODEL_OWNER, why: o.id === MODEL_OWNER ? "Product and UX judgement together: the person who owns the roadmap and the person who knows the users." : o.id === "o1" ? "Defendable, but one person's taste is what a decision architecture should prevent." : o.id === "o3" ? "Defendable for large budget items; too slow, and all stakeholders pull in different directions (the plan)." : "Rejected: whoever pays decides by budget, not by user problem." })),
      ...EVIDENCE.map((c) => ({ label: `Evidence: ${c.text}`, expected: MODEL_EVIDENCE.includes(c.id), why: MODEL_EVIDENCE.includes(c.id) ? "Evidence about what learners do and why (Materi A4, B3)." : c.id === "e4" ? "Defendable as input, but a request from sales says what one department wants, not what users need (Materi B3)." : "Rejected: a senior opinion alone is not evidence." })),
    ],
    teachingNote: "At least two kinds of evidence are required; which ones is judged on the rule in the memo, not on matching the model. A feature approval rule needs a named user problem, a metric and an owner (Materi B3).",
  };
}
