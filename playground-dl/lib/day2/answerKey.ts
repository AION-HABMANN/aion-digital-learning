import { APPROACHES, FACTS, FACT_PRACTICE, MODEL_ADAPTIVE, MODEL_APPROACH, MODEL_OPT, MODEL_TESTS, OPTS, PRACTICES, PRACTICE_IDS, TESTS, TEST_KIND, VERDICTS, WEAKS, WEAK_MODEL, effortBand } from "@/data/day2/case";
import { DATA, INVS, MODEL_DATA, MODEL_EVIDENCE, MODEL_INVS, MODEL_OWNER, MODEL_RISK_PICK, EVIDENCE, OWNERS, RISKS } from "@/data/day2/route2";
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
    title: "Block 1.1 · Eight facts into Learning path, Short units, Feedback",
    expected: PRACTICE_IDS.map((a) => `${PRACTICES[a].label}: ${FACTS.filter((f) => FACT_PRACTICE[f.id] === a).map((f) => `fact ${f.no}`).join(", ")}`).join("  |  "),
    options: FACTS.map((f) => ({ label: `Fact ${f.no} · ${f.short}`, expected: true, why: `${PRACTICES[FACT_PRACTICE[f.id]].label}. ${f.why}` })),
    teachingNote:
      "The sort is objective: each fact answers or fails one of the three questions of card A1 (what next, can I do this in my time, am I getting somewhere). Two edges: fact 2 (progress bar and “Step 2 of 6”) also says where you are on a path, but it shows how far along the learner is, which is feedback; the test question is whether it tells you what to do next (path) or how far you have come (feedback). Fact 6 (no menu) is a missing path, not a missing unit. The preference and the principles are judged: either platform defends if the reason is written from the learner's side. Plan: Arbeitsauftrag 1, compare two platforms, derive three principles.",
  };
}

export function optKey(): AnswerKeyBlock {
  const band = (cost: number) => LEVEL[effortBand(cost)];
  return {
    title: "Block 1.2 (Optional) · Prototyping and testing under time pressure",
    expected: `Decision: ${OPTS.find((o) => o.id === MODEL_OPT)?.name}. Effort by the printed cost: ${OPTS.map((o) => `${o.id} ${band(o.cost)}`).join(", ")}.`,
    options: OPTS.map((o) => ({
      label: `${o.id} · ${o.name} (${euro(o.cost)}, ${o.weeks} weeks)`,
      expected: o.id === MODEL_OPT,
      why:
        o.id === "B"
          ? "Reference choice: cheap, fast, and it gives evidence on structure and flow before the money is spent. Benefit High, effort Low, risk Low. The plan's rationale: minimise risk before maximising technology."
          : o.id === "A"
            ? `Defendable if the reason is concrete, not in the model: effort ${band(o.cost)} by the rule, benefit Mid (it teaches something, but from a polished version of an untested idea), risk Mid (most of the budget goes into an idea nobody has tested).`
            : `Rejected: nothing is learned before launch, effort ${band(o.cost)}, benefit Low, risk High; learners find the problems by leaving, and rework would use up the rest of the budget.`,
    })),
    teachingNote: "Effort is rule-based (under €10,000 Low, up to €25,000 Mid, above High), so the check can flag it; benefit and risk are judgements and are never marked. The risks without testing are not scored; ticking more is fine.",
  };
}

export function weakKey(): AnswerKeyBlock {
  return {
    title: "Block 2.1 (Optional) · Three main weaknesses",
    expected: WEAK_MODEL.map((id) => WEAKS.find((w) => w.id === id)?.text).join("  |  "),
    options: WEAKS.map((w) => ({ label: w.text, expected: WEAK_MODEL.includes(w.id), why: w.why })),
    teachingNote: "The plan's model solution names the main problem as a lack of feedback and individualisation. A learner who swaps one weakness for another and points at a printed fact defends the choice; a weakness with no printed evidence does not.",
  };
}

export function approachKey(): AnswerKeyBlock {
  const ap = APPROACHES.find((p) => p.id === MODEL_APPROACH);
  return {
    title: "Block 2.2 · The prototype approach",
    expected: `${ap?.no} · ${ap?.what} (${euro(ap?.cost ?? 0)}, ${ap?.weeks} weeks)`,
    options: APPROACHES.map((p) => ({
      label: `${p.no} · ${p.what} (${euro(p.cost)}, ${p.weeks} weeks)`,
      expected: p.id === MODEL_APPROACH,
      why:
        p.id === "p2"
          ? "Reference pick: a clickable low-fidelity version of the whole flow tests structure, order and wording end to end, cheaply, and leaves the look for later."
          : p.id === "p1"
            ? "Defendable and the cheapest start: it answers “can learners find the next step?” first. It tests only the start of the course, so the quiz and the end are left for a second round; the answer should say so."
            : p.id === "p3"
              ? `Rejected: polish before the idea is tested; ${euro(p.cost)} and ${p.weeks} weeks for what a rough version would show, and a team that defends a good-looking prototype.`
              : p.id === "p4"
                ? `Rejected: ${euro(p.cost)} is over the €60,000 budget and ${p.weeks} weeks is over the 12-week limit; it builds technology before knowing the problem, and it needs data the platform does not have.`
                : `Rejected: no test before launch; problems are found by learners who leave, and the budget goes into rework.`,
    })),
    teachingNote: "The plan's model solution: low-fidelity tests first, focus on learning paths and interaction. P1 and P2 both fit; the answer to “why” must name the question it answers first and what it leaves for later. A choice over the budget or the time exports with the amount printed as a fact (CLAUDE.md #38).",
  };
}

export function testKey(): AnswerKeyBlock {
  return {
    title: "Block 2.2 · Three UX tests",
    expected: MODEL_TESTS.map((id) => TESTS.find((x) => x.id === id)?.name).join("  |  "),
    options: TESTS.map((x) => {
      const model = MODEL_TESTS.includes(x.id);
      return {
        label: `${x.no} · ${x.name} (${TEST_KIND[x.kind]}; ${euro(x.cost)}, ${x.weeks} weeks)`,
        expected: model,
        why: model
          ? x.id === "t2"
            ? "Reference pick: it shows whether learners complete a whole flow on the chosen prototype and where they hesitate, in two weeks."
            : x.id === "t5"
              ? "Reference pick: it shows where learners leave, from data that already exists, cheaply. It shows where, not why, so it is paired with an interview test."
              : "Reference pick: the only test here that can show why learners left, which the case says nobody knows."
          : x.id === "t1"
            ? "Defendable: a cheap first test of the course start, in one week. It overlaps with the prototype approach if P1 is chosen."
            : x.id === "t3"
              ? "Defendable: a larger count of task success and time, but it does not show why."
              : x.id === "t4"
                ? "Defendable later, not now: an A/B test needs enough learners and takes six weeks; the platform's size and the 12-week limit make it a poor first choice."
                : "Rejected: it tests a finished high-fidelity redesign that does not exist yet, at €30,000 and 8 weeks, before the cheap questions are answered.",
      };
    }),
    teachingNote: "A good set mixes kinds: something that shows why (qualitative: T1, T2, T6) with something that shows where or how many (quantitative: T3, T4, T5). Three of the same kind leave half the question open. Cost and weeks are a live hint, not a lock; over the budget or the time still exports with the amount printed.",
  };
}

export function adaptiveKey(): AnswerKeyBlock {
  return {
    title: "Block 2.2 and 3.1 · Is adaptive learning worthwhile? Yes, partly or no",
    expected: VERDICTS.find((v) => v.id === MODEL_ADAPTIVE)?.label ?? "",
    options: VERDICTS.map((v) => ({
      label: v.label,
      expected: v.id === MODEL_ADAPTIVE,
      why:
        v.id === "partly"
          ? "Reference answer, the plan's “only step by step”: one simple, tested step (a rule, in one course) now, and the algorithmic part waits for data, content variants and the legal check."
          : v.id === "yes"
            ? "Defendable only with a reason that names the learner problem, the data and the legal check; a plain “yes” because competitors have it is the hype the plan warns against."
            : "Defendable if the reason is that the data and the content variants are not there; but “no” without a first step ignores the plan's complaint of no personalisation.",
    })),
    teachingNote: "The three questions of Materi A5: is there a learner problem that individual paths solve, is there enough data of good quality, are there content variants to adapt to? Without them it is over-engineering. “Partly” is a real answer when it says which part is funded and which waits.",
  };
}

export function invKey(): AnswerKeyBlock {
  return {
    title: "Block 3.1 · Three investments for the roadmap",
    expected: MODEL_INVS.map((id) => INVS.find((d) => d.id === id)?.name).join("; "),
    options: INVS.map((d) => {
      const model = MODEL_INVS.includes(d.id);
      return {
        label: `${d.no} · ${d.name} (${euro(d.cost)}, ${d.weeks} weeks)`,
        expected: model,
        why: model
          ? d.id === "i1"
            ? "Reference pick: it meets the feedback and path weaknesses, is tested with prototypes before building, and reaches every learner."
            : d.id === "i3"
              ? "Reference pick: the data foundation, with consent and a purpose, that the pilot and every later decision need (Materi B1: check the data foundation before the technology)."
              : "Reference pick: one small adaptive step with a control group; this is what “partly” means in money."
          : d.id === "i4"
            ? "Defendable: a standing routine that makes every later feature cheaper to test; it runs 52 weeks, so the result is slow."
            : d.id === "i7"
              ? "Defendable: it meets the “boring” complaint, but without feedback and a path the new exercises sit inside the same confusing structure."
              : d.id === "i5"
                ? "Rejected: €120,000 is most of the budget, it needs data the platform does not record, and learners could not see why they are shown what they see."
                : "Rejected: it changes the look, not the experience; no printed finding is about the look.",
      };
    }),
    teachingNote: "A different set of three defends if the reason is written and the three together answer the plan. The budget is a live hint, not a lock (CLAUDE.md #38); a set over the €200,000 limit exports with the amount printed as a fact.",
  };
}

export function dataKey(): AnswerKeyBlock {
  return {
    title: "Block 3.1 · Which data the testing strategy needs",
    expected: MODEL_DATA.map((id) => DATA.find((d) => d.id === id)?.text).join("  |  "),
    options: DATA.map((d) => ({
      label: d.text,
      expected: MODEL_DATA.includes(d.id),
      why: MODEL_DATA.includes(d.id)
        ? "Evidence about LearnPro's own learners that answers where, why, or whether a change worked; the consent line is the legal basis for tracking."
        : d.id === "q6"
          ? "Rejected: a competitor's feature list is context, not evidence about LearnPro's learners."
          : "Defendable when the learner can say which question it answers (task success and time answer “can they do it”; time on task in the live platform needs consent and a purpose).",
    })),
    teachingNote: "At least three are required; which ones is judged on the question each answers, not on matching the model.",
  };
}

export function riskKey(): AnswerKeyBlock {
  return {
    title: "Block 3.2 · The biggest risk",
    expected: RISKS.find((r) => r.id === MODEL_RISK_PICK)?.text ?? "",
    options: RISKS.map((r) => ({
      label: r.text,
      expected: r.id === MODEL_RISK_PICK,
      why: r.id === MODEL_RISK_PICK ? "The central risk of the whole plan: technology against user value. LearnPro's data is incomplete (it knows where learners leave, not why), so technology that the data cannot support is the likeliest failure." : "Defendable as the biggest risk if the learner says what they do about it; the model picks the data risk because the case states incomplete data.",
    })),
    teachingNote: "Any of the five defends when the plan to meet it is concrete (what is done, by whom, when). The wrong answer is a risk with no action.",
  };
}

export function architectureKey(): AnswerKeyBlock {
  return {
    title: "Block 3.2 · Who decides, on what evidence",
    expected: `Who: ${OWNERS.find((o) => o.id === MODEL_OWNER)?.text}. Evidence: ${MODEL_EVIDENCE.map((id) => EVIDENCE.find((e) => e.id === id)?.text).join("; ")}.`,
    options: [
      ...OWNERS.map((o) => ({ label: `Who decides: ${o.text}`, expected: o.id === MODEL_OWNER, why: o.id === MODEL_OWNER ? "Product judgement and data together: neither taste alone nor a sales story." : o.id === "o1" ? "Defendable, but one person's taste is exactly what a decision rule should prevent." : o.id === "o3" ? "Defendable for large budget items; too slow for routine decisions." : "Rejected: the vendor decides what it can sell, not what LearnPro's learners need." })),
      ...EVIDENCE.map((e) => ({ label: `Evidence: ${e.text}`, expected: MODEL_EVIDENCE.includes(e.id), why: MODEL_EVIDENCE.includes(e.id) ? "Evidence from LearnPro's own learners." : e.id === "e4" ? "Useful context, not evidence about LearnPro's own learners." : "Rejected: authority is not evidence." })),
    ],
    teachingNote: "At least two kinds of evidence are required; the sort of evidence a learner chooses is judged on the reason in the memo, not on matching the model.",
  };
}
