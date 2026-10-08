import { AREAS, AREA_IDS, CAUSES, CAUSE_MODEL, CLAIMS, CLAIM_TRUTH, FINDINGS, FINDING_AREA, MEASURES, MODEL_MEASURES, MODEL_RISK, MODEL_IMPACT, effortBand, BUDGET, totalCost } from "@/data/day1/case";
import { DECISIONS, MODEL_DECISIONS, MODEL_EVIDENCE, MODEL_OWNER, EVIDENCE, OWNERS, RISKS, MODEL_RISK_PICK } from "@/data/day1/route2";
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
    title: "Block 1.1 · Eight findings into Orientation, Understanding, Motivation",
    expected: AREA_IDS.map((a) => `${AREAS[a].label}: ${FINDINGS.filter((f) => FINDING_AREA[f.id] === a).map((f) => f.short).join("; ")}`).join("  |  "),
    options: FINDINGS.map((f) => ({ label: f.short, expected: true, why: `${AREAS[FINDING_AREA[f.id]].label}. ${f.why}` })),
    teachingNote:
      "The sort is objective: each finding breaks one of the three questions taught in Materi A3. Some findings touch two areas (a wall of text also hides where the main point is); the test is which question the printed phrase breaks first. The 40% drop-out figure is deliberately not a finding to sort: it is where the three areas end up. The second part of the block (the one finding that would make a learner give up first) is judged: any of the eight defends if the reason is written from the learner's side. Plan: Arbeitsauftrag 1, categories Orientation, Understanding, Motivation.",
  };
}

export function claimKey(): AnswerKeyBlock {
  return {
    title: "Block 1.2 (Optional) · What the 40% shows and does not show",
    expected: CLAIMS.map((c) => `${c.text} → ${CLAIM_TRUTH[c.id] === "shows" ? "the number shows this" : "the number does not show this"}`).join("  |  "),
    options: CLAIMS.map((c) => ({ label: c.text, expected: true, why: c.why })),
    teachingNote: "The trap the app reveals: a rate counts who left, never why. Anyone who ticks “shows” for a reason or a remedy has read a cause into a symptom. This is the coaching point of the plan (“Daten zeigen Symptome, nicht Ursachen” appears on Day 16; on Day 1 the equivalent is “dealing with incomplete user information”).",
  };
}

export function causeKey(): AnswerKeyBlock {
  return {
    title: "Block 2.1 (Optional) · Three main causes",
    expected: CAUSE_MODEL.map((id) => CAUSES.find((c) => c.id === id)?.text).join("  |  "),
    options: CAUSES.map((c) => ({ label: c.text, expected: CAUSE_MODEL.includes(c.id), why: c.why })),
    teachingNote: "The plan's model solution names the main problem as a lack of structure and orientation. A learner who swaps one cause for another and points at a printed fact (a finding or a case line) defends the choice; a cause with no printed evidence does not.",
  };
}

export function measureKey(): AnswerKeyBlock {
  const band = (cost: number) => LEVEL[effortBand(cost)];
  return {
    title: "Block 2.2 · Choose four measures, rate them, order them",
    expected: `${MODEL_MEASURES.map((id) => MEASURES.find((m) => m.id === id)?.name).join("; ")}. Total ${euro(totalCost(MODEL_MEASURES))} of ${euro(BUDGET)}.`,
    options: MEASURES.map((m) => {
      const model = MODEL_MEASURES.includes(m.id);
      const why = model
        ? `Answers a printed finding (${m.area}). Effort ${band(m.cost)} by the printed cost ${euro(m.cost)}. Reference ratings: user impact ${LEVEL[MODEL_IMPACT[m.id]]}, risk ${LEVEL[MODEL_RISK[m.id]]}.`
        : m.id === "m5"
          ? `Rejected in the plan's own logic: points and badges are extrinsic and answer none of the three findings areas directly; the short-term effect fades and the cost is Mid. A learner who funds it must say what it does for the learner.`
          : m.id === "m9"
            ? `Defendable, not in the model: it gathers evidence (cost ${euro(m.cost)}, effort ${band(m.cost)}) and answers the “what information are you missing” item. A learner who funds it instead of m4 should say which measure they drop and why.`
            : m.area === "feature"
              ? `Rejected: a new feature, tied to no printed finding, and the most expensive option (${euro(m.cost)}, effort ${band(m.cost)}).`
              : m.area === "surface"
                ? `Rejected: it changes the look (UI), not the experience; no printed finding is about the look.`
                : `Rejected: more content serves a business goal, not a learner's problem; ${euro(m.cost)} for effort ${band(m.cost)}.`;
      return { label: m.name, expected: model, why };
    }),
    teachingNote:
      "Effort is rule-based (under €10,000 Low, up to €15,000 Mid, above High), so the check can flag it; user impact and risk are judgements and are never marked. A different, well-reasoned choice is acceptable and exports (CLAUDE.md #38): over budget, another set of four, a different order, all with a stated reason. The plan's model solution orders them: learning paths (greatest impact), modular content, progress indicator, less cognitive load; its rationale line “Impact > Effort > User impact” is read here as: impact first, then what it costs.",
  };
}

export function decisionKey(): AnswerKeyBlock {
  return {
    title: "Block 3.1 · Three strategic decisions",
    expected: MODEL_DECISIONS.map((id) => DECISIONS.find((d) => d.id === id)?.name).join("; "),
    options: DECISIONS.map((d) => {
      const model = MODEL_DECISIONS.includes(d.id);
      const why = model
        ? `Reference pick: ${euro(d.cost)}, ${d.weeks} weeks. ${d.id === "d4" ? "It is the decision that lets later decisions rest on evidence, which the decision-architecture item of the plan asks for." : "It meets a printed finding that every learner meets."}`
        : d.id === "d3"
          ? "Defendable: it meets the Understanding finding, but at €40,000 and 20 weeks it is the costliest fix; it would go next year."
          : d.id === "d5"
            ? "Rejected in the plan's own logic: extrinsic reward, answers no printed finding, and the effect fades; competitors using it is not a reason."
            : d.id === "d6"
              ? "Rejected: €90,000 is most of the budget, it needs data SkillUp does not have, and learners cannot see why they are shown what they see."
              : "Rejected: it fixes acquisition, not experience; more learners arriving at the same platform leave at the same rate.";
      return { label: d.name, expected: model, why };
    }),
    teachingNote: "A different set of three defends if the reason is written and the three together answer the vision. Budget is a live hint, not a lock (CLAUDE.md #38); a set over the €120,000 limit exports with the amount printed as a fact.",
  };
}

export function riskKey(): AnswerKeyBlock {
  return {
    title: "Block 3.2 · The biggest risk",
    expected: RISKS.find((r) => r.id === MODEL_RISK_PICK)?.text ?? "",
    options: RISKS.map((r) => ({ label: r.text, expected: r.id === MODEL_RISK_PICK, why: r.id === MODEL_RISK_PICK ? "The central risk of the whole plan: SkillUp knows what is hard on the screens, not why learners stop. The research programme is the answer to it." : "Defendable as the biggest risk if the learner says what they do about it; the model picks the cause-versus-symptom risk because the plan's own coaching names it (“UX is not a design problem but a decision problem”)." })),
    teachingNote: "Any of the five defends when the plan to meet it is concrete (what is done, by whom, when). The wrong answer is a risk with no action.",
  };
}

export function architectureKey(): AnswerKeyBlock {
  return {
    title: "Block 3.2 · Who decides, on what evidence",
    expected: `Who: ${OWNERS.find((o) => o.id === MODEL_OWNER)?.text}. Evidence: ${MODEL_EVIDENCE.map((id) => EVIDENCE.find((e) => e.id === id)?.text).join("; ")}.`,
    options: [
      ...OWNERS.map((o) => ({ label: `Who decides: ${o.text}`, expected: o.id === MODEL_OWNER, why: o.id === MODEL_OWNER ? "UX judgement and product ownership together: neither taste alone nor build convenience." : o.id === "o1" ? "Defendable, but one person's taste is exactly what a decision architecture should prevent." : o.id === "o3" ? "Defendable for large budget items; too slow for routine UX decisions." : "Rejected: the builder decides what is easy to build, not what learners need." })),
      ...EVIDENCE.map((e) => ({ label: `Evidence: ${e.text}`, expected: MODEL_EVIDENCE.includes(e.id), why: MODEL_EVIDENCE.includes(e.id) ? "Evidence from learners themselves." : e.id === "e4" ? "Useful context, not evidence about SkillUp's own learners." : "Rejected: authority is not evidence." })),
    ],
    teachingNote: "At least two kinds of evidence are required; the sort of evidence a learner chooses is judged on the reason in the memo, not on matching the model.",
  };
}
