import type { FrameField, GenSpec, TextField } from "@/lib/dayGen/spec";
import type { MentorGuide } from "@/lib/mentorGuide";

/**
 * Worked answers for every free-text question of a generic day (CLAUDE.md #23). `answer` is the real model text the mentor sees after the passcode, read from the
 * same model the "Fill all model answers" button enters, so the two can never drift apart. `example` is the learner-facing example (ExampleAnswer, no passcode):
 * the same method on a different company, so a learner can see the shape of a good answer but not copy a value across.
 */
export function textGuide(f: TextField, block: string): MentorGuide {
  return { title: `${block} · ${f.label}`, answer: f.model, ...f.guide };
}

export function frameGuide(f: FrameField, block: string): MentorGuide {
  return { title: `${block} · ${f.label}`, answer: f.parts.map((p) => `${p.label} ${p.model}`).join("\n"), ...f.guide };
}

export function reasonGuide(spec: GenSpec, id: string): MentorGuide {
  const m = spec.b22.measures.find((x) => x.id === id);
  return { title: `2.2 · Why this measure gets its ratings (${m?.no ?? id})`, answer: spec.b22.model.reasons[id] ?? "", ...spec.b22.guides.reason };
}
export const orderGuide = (spec: GenSpec): MentorGuide => ({ title: "2.2 · Why the first priority goes first (Core)", answer: spec.b22.model.orderWhy, ...spec.b22.guides.order });
export const missingGuide = (spec: GenSpec): MentorGuide => ({ title: "2.2 · What information you are missing (Core)", answer: spec.b22.model.missingInfo, ...spec.b22.guides.missing });
export const optWhyGuide = (spec: GenSpec): MentorGuide => ({ title: "1.2 (Optional) · Justify your decision", answer: spec.opts.model.why, ...spec.opts.guide });
export const reflectGuide = (spec: GenSpec): MentorGuide => ({
  title: "1.3 (Optional) · Coaching reflection",
  answer: `${spec.reflect.model.a} ${spec.reflect.model.b} ${spec.reflect.model.c}`,
  why: spec.reflect.guideWhy,
});
export const causeWhyGuide = (spec: GenSpec): MentorGuide => ({ title: "2.1 (Optional) · The printed fact behind the first choice", answer: spec.causes.whyModel, ...spec.causes.guide });
export const decisionOrderGuide = (spec: GenSpec): MentorGuide => ({ title: "3.1 · Why the first measure goes first", answer: spec.decisions.model.orderWhy, ...spec.decisions.guide });
