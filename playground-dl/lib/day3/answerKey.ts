import { AREAS, AREA_IDS, BUDGET, CAUSES, CAUSE_MODEL, FACTS, FACT_AREA, MEASURES, MODEL_IMPACT, MODEL_MEASURES, MODEL_OPT_ORDER, MODEL_RISK, OPTS, effortBand, totalCost, WEEKS_LIMIT } from "@/data/day3/case";
import { CHECKS, DECISIONS, MODEL_CHECKS, MODEL_DECISIONS, MODEL_OWNER, MODEL_RISK_PICK, OWNERS, RISKS } from "@/data/day3/route2";
import { MENTOR_NOTE } from "@/lib/day3/mentorKey";
import type { AnswerKeyBlock } from "@/lib/answerKey";
import { euro } from "@/lib/lang";

/**
 * Mentor-only answer keys for the exercises where the learner picks from fixed options (CLAUDE.md #7): the expected pick and a reason per
 * option, including why each rejected option is rejected, with a teaching note where more than one answer defends. Never exported and
 * never shown to a learner. Mentor tools stay English (#32); the option labels they quote follow the site's language.
 */
const LEVEL = ["", "Low", "Mid", "High"];

export function sortKey(): AnswerKeyBlock {
  return {
    title: "Block 1.1 · Eight facts into Amount, Form, Order and purpose",
    expected: AREA_IDS.map((a) => `${AREAS[a].label}: ${FACTS.filter((f) => FACT_AREA[f.id] === a).map((f) => `fact ${f.no}`).join(", ")}`).join("  |  "),
    options: FACTS.map((f) => ({ label: `Fact ${f.no} · ${f.short}`, expected: true, why: `${AREAS[FACT_AREA[f.id]].label}. ${f.why}` })),
    teachingNote:
      "The sort is objective: each fact belongs to one of the three observations of the case. Two edges: fact 5 (no picture, terms not explained) can read as amount of knowledge needed, but what the page offers to explain is a matter of how the content is shaped, so it is Form; fact 3 (12 quiz questions on one page) is Amount even though it is a quiz layout. The one fact that makes a learner stop first and how the process feels are judged: any of the eight defends if the reason is written from the learner's side (intake, processing, storage). Plan: Arbeitsauftrag 1, describe 5 problems from the user's side.",
  };
}

export function optKey(): AnswerKeyBlock {
  const band = (cost: number) => LEVEL[effortBand(cost)];
  return {
    title: "Block 1.2 (Optional) · Reduce the load of a module: three options",
    expected: `Greatest effect: ${OPTS.find((o) => o.id === MODEL_OPT_ORDER[0])?.name}. Order: ${MODEL_OPT_ORDER.join(", ")}. Effort by the printed cost: ${OPTS.map((o) => `${o.id} ${band(o.cost)}`).join(", ")}.`,
    options: OPTS.map((o) => ({
      label: `${o.id} · ${o.name} (${euro(o.cost)}, ${o.weeks} weeks)`,
      expected: o.id === MODEL_OPT_ORDER[0],
      why:
        o.id === "C"
          ? "Reference: chunking reduces what the learner holds at once without deleting content. Impact High, effort Mid by the rule, risk Low."
          : o.id === "B"
            ? `Second: a diagram helps where a structure or flow is described, not everywhere; effort ${band(o.cost)} by the rule, and it takes the whole four weeks. Impact Mid, risk Mid.`
            : `Last: the content is professionally necessary and the learners are beginners, so shortening a lot removes what they need. Effort ${band(o.cost)}, impact Low, risk High.`,
    })),
    teachingNote: "Effort is rule-based (under €8,000 Low, up to €15,000 Mid, above High), so the check can flag it; impact and risk are judgements and are never marked. The plan's rationale for the day: learning capacity > amount of information.",
  };
}

export function causeKey(): AnswerKeyBlock {
  return {
    title: "Block 2.1 (Optional) · Four causes of cognitive overload",
    expected: CAUSE_MODEL.map((id) => CAUSES.find((c) => c.id === id)?.text).join("  |  "),
    options: CAUSES.map((c) => ({ label: c.text, expected: CAUSE_MODEL.includes(c.id), why: c.why })),
    teachingNote: "The plan's model solution names the main problem as extraneous cognitive load. “The subject itself is complex” is true and is the intrinsic load, but it is not a cause that design can remove; a learner who ticks it and says so defends the choice, and the key marks it as not expected only because the task asks for causes the design can act on.",
  };
}

export function measureKey(): AnswerKeyBlock {
  const band = (cost: number) => LEVEL[effortBand(cost)];
  return {
    title: "Block 2.2 · Choose four measures, rate them, order them",
    expected: `${MODEL_MEASURES.map((id) => MEASURES.find((m) => m.id === id)?.name).join("; ")}. Total ${euro(totalCost(MODEL_MEASURES))} of ${euro(BUDGET)}, longest 3 weeks of ${WEEKS_LIMIT}.`,
    options: MEASURES.map((m) => {
      const model = MODEL_MEASURES.includes(m.id);
      const why = model
        ? `Answers a printed fact (${m.area}). Effort ${band(m.cost)} by the printed cost ${euro(m.cost)}. Reference ratings: impact ${LEVEL[MODEL_IMPACT[m.id]]}, risk ${LEVEL[MODEL_RISK[m.id]]}.`
        : m.id === "m2"
          ? `In the plan's own list, and defendable: visualisation helps where a flow or structure is described. At ${euro(m.cost)} and ${m.weeks} weeks it is High effort and one week over the four-week limit, so the reference set uses “Goal and outline” instead. A learner who funds it exports with the longer time printed as a fact and a reason.`
          : m.id === "m6"
            ? "Rejected: points for lesson views reward opening a lesson, not understanding it, and add one more thing to the screen."
            : m.id === "m7"
              ? "Rejected: it changes the look, not the load; no printed fact is about the look."
              : m.id === "m8"
                ? `Rejected: ${euro(m.cost)} and ${m.weeks} weeks is over both limits, and a chatbot adds one more thing to the screen.`
                : `Rejected: more reading material adds load; learners are already overloaded by the amount.`;
      return { label: `${m.no} · ${m.name}`, expected: model, why };
    }),
    teachingNote: `${MENTOR_NOTE} Effort is rule-based (under €8,000 Low, up to €15,000 Mid, above High), so the check can flag it; impact and risk are judgements and are never marked. A different, well-reasoned choice is acceptable and exports (CLAUDE.md #38): over budget, over time, another set of four, a different order, all with a stated reason. The plan's rationale: learning capacity > amount of information.`,
  };
}

export function decisionKey(): AnswerKeyBlock {
  return {
    title: "Block 3.1 · Three measures for the strategy",
    expected: MODEL_DECISIONS.map((id) => DECISIONS.find((d) => d.id === id)?.name).join("; "),
    options: DECISIONS.map((d) => {
      const model = MODEL_DECISIONS.includes(d.id);
      return {
        label: `${d.no} · ${d.name} (${euro(d.cost)}, ${d.weeks} weeks)`,
        expected: model,
        why: model
          ? d.id === "d1"
            ? "Reference pick: it removes extraneous load for the most learners (Materi B1: structure and chunking first) and keeps the content."
            : d.id === "d2"
              ? "Reference pick: a content standard is the decision logic made concrete; every new lesson passes the same checks, so the problem does not return."
              : "Reference pick: it is the evidence the case lacks (the plan asks to decide without user data), and it shows both effectiveness and efficiency."
          : d.id === "d5"
            ? "Defendable: feedback after every lesson helps storage and gives a measure of what learners can do; it is a candidate for next year."
            : d.id === "d4"
              ? "Rejected in the plan's own logic: the content is professionally necessary, so cutting a third is the over-simplification risk (Materi B2)."
              : d.id === "d6"
                ? "Rejected: €70,000 and 24 weeks for a tool that shortens lessons on demand, without checking whether the shortened version still teaches."
                : "Rejected: it changes the look, not the load; no printed fact is about the look.",
      };
    }),
    teachingNote: "A different set of three defends if the reason is written and the three together answer the definition of learning-effective UX. The budget is a live hint, not a lock (CLAUDE.md #38); a set over the €150,000 limit exports with the amount printed as a fact.",
  };
}

export function riskKey(): AnswerKeyBlock {
  return {
    title: "Block 3.2 · The biggest risk",
    expected: RISKS.find((r) => r.id === MODEL_RISK_PICK)?.text ?? "",
    options: RISKS.map((r) => ({
      label: r.text,
      expected: r.id === MODEL_RISK_PICK,
      why: r.id === MODEL_RISK_PICK ? "The one that hides both other risks: without a measure of what learners can do, “too simple” and “too complex” cannot be told apart (Materi B2). The remedy is a check at the end of each lesson." : "Defendable as the biggest risk if the learner says what they do about it; the model picks the measurement risk because the plan's question is where the risk of too much simplification lies.",
    })),
    teachingNote: "Any of the five defends when the plan to meet it is concrete (what is done, by whom, when). The wrong answer is a risk with no action.",
  };
}

export function logicKey(): AnswerKeyBlock {
  return {
    title: "Block 3.2 · Who decides, and which checks a new lesson passes",
    expected: `Who: ${OWNERS.find((o) => o.id === MODEL_OWNER)?.text}. Checks: ${MODEL_CHECKS.map((id) => CHECKS.find((c) => c.id === id)?.text).join("; ")}.`,
    options: [
      ...OWNERS.map((o) => ({ label: `Who decides: ${o.text}`, expected: o.id === MODEL_OWNER, why: o.id === MODEL_OWNER ? "Learning judgement and content ownership together: neither one person's taste nor the author's own view." : o.id === "o1" ? "Defendable, but one person's taste is exactly what a decision logic should prevent." : o.id === "o4" ? "Defendable for large budget items; too slow for every lesson." : "Rejected: an author checking their own lesson has no outside view." })),
      ...CHECKS.map((c) => ({ label: `Check: ${c.text}`, expected: MODEL_CHECKS.includes(c.id), why: MODEL_CHECKS.includes(c.id) ? "A check that can be done on every lesson and that follows from the three loads." : c.id === "k6" ? "Defendable and strong, but not on every lesson: five beginners per module before release is the testing routine (D3), not a per-lesson check." : "Rejected: authority is not a check on whether a lesson teaches." })),
    ],
    teachingNote: "At least three checks are required; which ones is judged on the reason in the memo, not on matching the model. A style guide that nobody checks is not a decision logic (Materi B3).",
  };
}
