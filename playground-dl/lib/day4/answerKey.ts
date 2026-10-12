import { BUDGET, CAUSES, CAUSE_MODEL, FACTS, FACT_AREA, MEASURES, MODEL_IMPACT, MODEL_MEASURES, MODEL_OPT_ORDER, MODEL_RISK, OPTS, PRINCIPLES, PRINCIPLE_IDS, WEEKS_LIMIT, effortBand, totalCost } from "@/data/day4/case";
import { DECISIONS, EVIDENCE, METRICS, MODEL_DECISIONS, MODEL_EVIDENCE, MODEL_METRICS, MODEL_OWNER, MODEL_RISK_PICK, MODEL_STRATEGY, OWNERS, RISKS, STRATEGIES } from "@/data/day4/route2";
import { MENTOR_NOTE } from "@/lib/day4/mentorKey";
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
    title: "Block 1.1 · Eight facts into four principles",
    expected: PRINCIPLE_IDS.map((a) => `${PRINCIPLES[a].label}: ${FACTS.filter((f) => FACT_AREA[f.id] === a).map((f) => `fact ${f.no}`).join(", ")}`).join("  |  "),
    options: FACTS.map((f) => ({ label: `Fact ${f.no} · ${f.short}`, expected: true, why: `${PRINCIPLES[FACT_AREA[f.id]].label}. ${f.why}` })),
    teachingNote:
      "The sort is objective: each fact belongs to one principle, and each principle has one fact on Platform A and one on Platform B. Two edges: fact 2 (“Correct.” and “Next: task 4”) is Feedback, not Activation, although it follows a task; fact 6 (nothing after the last page) is the missing Feedback, not missing Progress. Which platform is more motivating is judged, but Platform A has all four principles on screen and Platform B none, so any defence of B has to name something the facts do not show. The three principles are “Do X, because Y” sentences: look for a reason, not a slogan. Plan: Arbeitsauftrag 1, describe 5 differences and derive 3 principles.",
  };
}

export function optKey(): AnswerKeyBlock {
  const band = (cost: number) => LEVEL[effortBand(cost)];
  return {
    title: "Block 1.2 (Optional) · Choose an engagement strategy: three options",
    expected: `Lasting effect: ${OPTS.find((o) => o.id === MODEL_OPT_ORDER[0])?.name}. Order: ${MODEL_OPT_ORDER.join(", ")}. Effort by the printed cost: ${OPTS.map((o) => `${o.id} ${band(o.cost)}`).join(", ")}.`,
    options: OPTS.map((o) => ({
      label: `${o.id} · ${o.name} (${euro(o.cost)}, ${o.weeks} weeks)`,
      expected: o.id === MODEL_OPT_ORDER[0],
      why:
        o.id === "B"
          ? `Reference: progress is information about the learner's own skill, so it remains when a reward would stop. Effort ${band(o.cost)} by the rule, impact High, risk Low. The plan's rationale: perceived progress is the strongest motivator.`
          : o.id === "C"
            ? `Second: making content interactive builds activation and competence and also lasts, but at ${euro(o.cost)} and ${o.weeks} of the 8 weeks it is High effort and Mid risk (weak tasks feel like homework). Impact High.`
            : `Last: badges and points are extrinsic rewards. Effort ${band(o.cost)}, impact Low for the learners who are leaving, risk High (overjustification: the reward can become the reason, Materi A1). A different order defends if the reason says what remains when the reward stops.`,
    })),
    teachingNote: "Effort is rule-based (under €10,000 Low, up to €20,000 Mid, above High), so the check can flag it; impact and risk are judgements and are never marked. “Which measure has a lasting effect” has one reference answer (B) but C also defends when the learner says what the learner can do afterwards.",
  };
}

export function causeKey(): AnswerKeyBlock {
  return {
    title: "Block 2.1 (Optional) · Three main causes of the motivation problem",
    expected: CAUSE_MODEL.map((id) => CAUSES.find((c) => c.id === id)?.text).join("  |  "),
    options: CAUSES.map((c) => ({ label: c.text, expected: CAUSE_MODEL.includes(c.id), why: c.why })),
    teachingNote: "The plan's main problem is the lack of perceived progress and of activation. “Too few rewards” is the popular wrong answer: Platform A motivates without any reward, so the missing reward is not what the facts show. A learner who ticks it and points at a printed fact defends the choice.",
  };
}

export function measureKey(): AnswerKeyBlock {
  const band = (cost: number) => LEVEL[effortBand(cost)];
  return {
    title: "Block 2.2 · Choose four measures, rate them, order them",
    expected: `${MODEL_MEASURES.map((id) => MEASURES.find((m) => m.id === id)?.name).join("; ")}. Total ${euro(totalCost(MODEL_MEASURES))} of ${euro(BUDGET)}, longest 6 weeks of ${WEEKS_LIMIT}.`,
    options: MEASURES.map((m) => {
      const model = MODEL_MEASURES.includes(m.id);
      const why = model
        ? `The plan's own measure; answers a printed fact (${m.area}). Effort ${band(m.cost)} by the printed cost ${euro(m.cost)}. Reference ratings: impact ${LEVEL[MODEL_IMPACT[m.id]]}, risk ${LEVEL[MODEL_RISK[m.id]]}.`
        : m.id === "m5"
          ? "Rejected: points and badges reward opening a lesson, not learning (a perverse incentive, Materi B2), and the facts show missing progress and activation, not a missing reward."
          : m.id === "m6"
            ? "Rejected: a public ranking rewards the already active and can push the weakest learners out, who are the ones the platform is losing (pressure and comparison, Materi B2)."
            : m.id === "m7"
              ? "Rejected: loss messages are pressure and a manipulation risk; they raise activity today and cost trust tomorrow."
              : m.id === "m8"
                ? `Rejected: ${euro(m.cost)} for a discount after completion, which only reaches learners who already finish.`
                : "Rejected: it changes the look, not the motivation; no printed fact is about the look.";
      return { label: `${m.no} · ${m.name}`, expected: model, why };
    }),
    teachingNote: `${MENTOR_NOTE} Effort is rule-based (under €10,000 Low, up to €20,000 Mid, above High), so the check can flag it; impact and risk are judgements and are never marked. A different, well-reasoned choice is acceptable and exports (CLAUDE.md #38): within the budget, over it, another set of four, a different order, all with a stated reason. The plan's rationale: perceived progress is the strongest motivator.`,
  };
}

export function strategyKey(): AnswerKeyBlock {
  return {
    title: "Block 3.1 · Motivation strategy",
    expected: STRATEGIES.find((s) => s.id === MODEL_STRATEGY)?.text ?? "",
    options: STRATEGIES.map((s) => ({
      label: s.text,
      expected: s.id === MODEL_STRATEGY,
      why: s.id === "mix" ? "Reference: intrinsic as the base, because lasting motivation needs goals, competence and progress (Materi A1), with at most a few extrinsic elements that give real information." : s.id === "intrinsic" ? "Defendable: it is the cleanest against overjustification, but it ignores that many Habmann learners are required to learn and already have an extrinsic reason." : "Rejected unless defended: rewards alone raise short-term activity and carry the overjustification and perverse-incentive risks (Materi A1, B2).",
    })),
    teachingNote: "The plan's question is intrinsic against extrinsic. The answer is judged on the field under it: which of the three conditions (motivation, ability, prompt) the strategy works on, and for which learners.",
  };
}

export function decisionKey(): AnswerKeyBlock {
  return {
    title: "Block 3.1 · Three prioritised measures",
    expected: MODEL_DECISIONS.map((id) => DECISIONS.find((d) => d.id === id)?.name).join("; "),
    options: DECISIONS.map((d) => {
      const model = MODEL_DECISIONS.includes(d.id);
      return {
        label: `${d.no} · ${d.name} (${euro(d.cost)}, ${d.weeks} weeks)`,
        expected: model,
        why: model
          ? d.id === "d1"
            ? "Reference pick: it works on ability and prompt for every learner on every page (Materi B1) and is the strongest motivator in the plan's logic."
            : d.id === "d3"
              ? "Reference pick: a goals and feedback standard keeps every new unit and task on the principles, so the problem does not return."
              : "Reference pick: the data is incomplete (the plan), so the research and experiment routine is the evidence the case lacks (Materi B3)."
          : d.id === "d2"
            ? "Defendable and strong on activation, but €70,000 and 24 weeks: the biggest share of the budget before any evidence."
            : d.id === "d4"
              ? "Rejected in the plan's own logic: an extrinsic layer on a platform whose problem is missing progress and activation (perverse-incentive risk)."
              : d.id === "d6"
                ? "Rejected: loss messages are pressure; they risk trust (Materi B2)."
                : "Rejected: a discount after completion only reaches learners who already finish.",
      };
    }),
    teachingNote: "A different set of three defends if the reason is written and the three together deal with the three conditions of behaviour. The budget is a live hint, not a lock (CLAUDE.md #38); a set over the €180,000 limit exports with the amount printed as a fact.",
  };
}

export function metricKey(): AnswerKeyBlock {
  return {
    title: "Block 3.1 · How to measure success",
    expected: MODEL_METRICS.map((id) => METRICS.find((m) => m.id === id)?.text).join("; "),
    options: METRICS.map((m) => ({
      label: m.text,
      expected: MODEL_METRICS.includes(m.id),
      why: MODEL_METRICS.includes(m.id) ? (m.id === "k6" ? "A method about reasons, to pair with the behaviour metrics (Materi A4)." : "A behaviour metric: it counts what learners do and has a baseline (Materi A4, B3).") : m.id === "k4" ? "Ambiguous: a long time can mean interest or confusion; do not use it alone (Materi A4)." : m.id === "k5" ? "Rejected: badges earned measure the reward system, not learning." : "Defendable as an addition, but a rating is an opinion and not behaviour; pair it with a behaviour metric.",
    })),
    teachingNote: "At least three are required; which ones is judged on the success sentence: a baseline, a target, a method and a date. A metric without a baseline cannot show improvement.",
  };
}

export function riskKey(): AnswerKeyBlock {
  return {
    title: "Block 3.2 · The biggest risk",
    expected: RISKS.find((r) => r.id === MODEL_RISK_PICK)?.text ?? "",
    options: RISKS.map((r) => ({
      label: r.text,
      expected: r.id === MODEL_RISK_PICK,
      why: r.id === MODEL_RISK_PICK ? "The risk the case itself names: the data is incomplete, so the team may fix the wrong thing. The remedy is the research routine before the big spend." : r.id === "r1" ? "The classic perverse incentive (Materi B2): defendable as the biggest risk if the plan has any reward in it; the model plan has none." : "Defendable as the biggest risk if the learner says what they do about it.",
    })),
    teachingNote: "Any of the five defends when the plan to meet it is concrete (what is done, by whom, when). The wrong answer is a risk with no action.",
  };
}

export function logicKey(): AnswerKeyBlock {
  return {
    title: "Block 3.2 · Who decides, and on what evidence",
    expected: `Who: ${OWNERS.find((o) => o.id === MODEL_OWNER)?.text}. Evidence: ${MODEL_EVIDENCE.map((id) => EVIDENCE.find((c) => c.id === id)?.text).join("; ")}.`,
    options: [
      ...OWNERS.map((o) => ({ label: `Who decides: ${o.text}`, expected: o.id === MODEL_OWNER, why: o.id === MODEL_OWNER ? "Product and learning judgement together: neither one person's taste nor whoever shouts loudest." : o.id === "o1" ? "Defendable, but one person's taste is exactly what a decision architecture should prevent." : o.id === "o3" ? "Defendable for large budget items; too slow for every optimisation." : "Rejected: the campaign owner judges their own work." })),
      ...EVIDENCE.map((c) => ({ label: `Evidence: ${c.text}`, expected: MODEL_EVIDENCE.includes(c.id), why: MODEL_EVIDENCE.includes(c.id) ? "Evidence about learners' behaviour and reasons (Materi B3)." : c.id === "e4" ? "Defendable as context, but a competitor's feature is not proof that it causes their retention (Materi B1)." : "Rejected: a senior opinion alone is not evidence (Materi B3)." })),
    ],
    teachingNote: "At least two kinds of evidence are required; which ones is judged on the reason in the memo, not on matching the model.",
  };
}
