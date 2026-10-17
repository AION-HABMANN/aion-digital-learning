import { MODEL_ADAPTIVE, MODEL_OPT, OPTS, VERDICTS } from "@/data/day2/case";
import type { AnswerKeyBlock } from "@/lib/answerKey";

/**
 * Mentor-only answer keys for the exercises where the learner picks from fixed options (CLAUDE.md #7, #57): the expected pick and a reason per
 * option, including why each rejected option is rejected, with a teaching note where more than one answer defends. Never exported and
 * never shown to a learner. Mentor tools stay English (#32); the option labels they quote follow the site's language. Day 2 has two such
 * picks: the decision of Block 1.2 (A, B or C) and the adaptive decision (yes, partly or no) of Blocks 2.1 and 3.1.
 */

export function optKey(): AnswerKeyBlock {
  return {
    title: "Block 1.2 · Prototyping and testing under time pressure",
    expected: `Decision: ${OPTS.find((o) => o.id === MODEL_OPT)?.name}. Reference assessment: A risk medium, benefit medium, effort high; B risk low, benefit high, effort low; C risk high, benefit low, effort very high.`,
    options: OPTS.map((o) => ({
      label: `${o.id} · ${o.name}`,
      expected: o.id === MODEL_OPT,
      why:
        o.id === "B"
          ? "Reference choice: cheap, fast, and it gives evidence on structure and flow before the time and money are spent. Risk low, benefit high, effort low. The plan's rationale: minimise risk before maximising technology."
          : o.id === "A"
            ? "Defendable if the reason is concrete, not in the model: it teaches something and can convince stakeholders, but from a polished version of an untested idea (risk medium, benefit medium, effort high)."
            : "Rejected unless the learner says what is risked: nothing is learned before launch, learners find the problems by leaving, and rework would use up the rest of the time and money (risk high, benefit low, effort very high).",
    })),
    teachingNote: "The plan prints no cost or effort figure for the three options, so risk, benefit and effort are the learner's own judgement and are never marked. A different, well-reasoned decision exports. The risks without testing are free text; look for building the wrong thing, finding out late, rework cost, learners leaving, a competitor moving first.",
  };
}

export function adaptiveKey(): AnswerKeyBlock {
  return {
    title: "Block 2.1 and 3.1 · Is adaptive learning worthwhile? Yes, partly or no",
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
