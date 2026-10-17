import { MODEL_OPT, OPTS } from "@/data/day3/case";
import type { AnswerKeyBlock } from "@/lib/answerKey";

/**
 * Mentor-only answer key for the one exercise of Day 3 where the learner picks from fixed options (CLAUDE.md #7, #57): the option with the
 * greatest effect on learning (Block 1.2, the plan's UE3 task, question 3). It gives the expected pick and a reason per option, including why each
 * rejected option is rejected, with a teaching note where more than one answer defends. Never exported and never shown to a learner. Mentor
 * tools stay English (#32); the option labels they quote follow the site's language.
 */
export function optKey(): AnswerKeyBlock {
  return {
    title: "Block 1.2 · Reducing the load of a module: which option has the greatest effect",
    expected: `Decision: ${OPTS.find((o) => o.id === MODEL_OPT)?.name}. Reference assessment: A learning impact medium, effort low, risk high; B impact medium to high, effort high, risk medium; C impact high, effort medium, risk low. Reference priority: C, B, A.`,
    options: OPTS.map((o) => ({
      label: `${o.id} · ${o.name}`,
      expected: o.id === MODEL_OPT,
      why:
        o.id === "C"
          ? "Reference choice, the plan's chunking: the learner holds one small part at a time and nothing the beginner needs is removed, and re-cutting content fits four weeks. Learning capacity matters more than the amount of information."
          : o.id === "B"
            ? "Defendable if the reason is concrete: a diagram can carry a complex idea better than text. The weakness is time, since good diagrams may not fit four weeks, and an unexplained diagram adds load."
            : "Rejected unless the learner says what is protected: cutting content significantly is quick, but with complex specialist content and beginners it removes what the topic needs. It reduces the amount, not the extraneous load.",
    })),
    teachingNote: "The plan prints no cost or effort figure for the three options, so learning impact, effort and risk are the learner's own judgement and are never marked. Many teams rate each Low, Medium or High with a reason; plain sentences count the same. A different, well-reasoned choice exports. The plan's rationale: learning capacity before the amount of information.",
  };
}
