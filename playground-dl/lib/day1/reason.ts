import { NO_PROBLEM, PROBLEM_BY_ID } from "@/data/day1/case";
import type { ProblemId } from "@/data/day1/case";
import { tt } from "@/lib/lang";
import type { D1R1 } from "@/store/useStore";

/**
 * Block 2.2 · "Say it in one sentence" (user decision 2026-10-15). A measure's reason is built from three parts: the problem(s) of the case it
 * fixes (picked, one or more: a measure can answer more than one), then two sentences of the learner's own: what the learner can then do, and
 * what follows. `reasons[id]` holds the composed text only once all three are there, so every older check ("is the reason at least N
 * characters") keeps meaning "is it complete".
 */
export const MIN_SLOT = 10;

/**
 * Whether Block 2.2 asks for the sentence at all. Off (user decision 2026-10-16, "for now"): the measures keep their picks (the problem, impact
 * and risk) and the priority list shows them, but there is no "Say it in one sentence" and no reason per measure. Everything stays built;
 * set this to true to bring it back.
 */
export const SENTENCE_PER_MEASURE = false;

const clean = (s: string) => s.trim().replace(/[.\s]+$/, "");

/** A stored pick as a list (a first build stored one id as a string). */
export const fixList = (v: unknown): string[] => (Array.isArray(v) ? (v as string[]) : typeof v === "string" && v ? [v] : []);

/** Toggle one problem in a measure's picks. "none of these" excludes the others, and picking a problem drops it. */
export function toggleFix(current: unknown, id: string): string[] {
  const list = fixList(current);
  if (id === NO_PROBLEM) return list.includes(NO_PROBLEM) ? [] : [NO_PROBLEM];
  const rest = list.filter((x) => x !== NO_PROBLEM);
  return rest.includes(id) ? rest.filter((x) => x !== id) : [...rest, id];
}

/** The quotes of the picked problems (none for "none of these"). */
export const fixQuotes = (fix: unknown): string[] => fixList(fix).filter((x) => x !== NO_PROBLEM && PROBLEM_BY_ID[x as ProblemId]).map((x) => PROBLEM_BY_ID[x as ProblemId].quote);

/** The start of the sentence, built from the picked problems; empty until one is picked. */
export function reasonLead(fix: unknown): string {
  const list = fixList(fix);
  if (list.length === 0) return "";
  if (list.includes(NO_PROBLEM)) return tt("This is not a problem the case names,", "Das ist kein Problem, das der Fall nennt,");
  const q = fixQuotes(list);
  if (q.length === 0) return "";
  return tt(`The case says ${q.map((x) => `“${x}”`).join(" and ")},`, `Der Fall sagt ${q.map((x) => `„${x}“`).join(" und ")},`);
}

export const slotsComplete = (fix: unknown, a: string, b: string) => fixList(fix).length > 0 && a.trim().length >= MIN_SLOT && b.trim().length >= MIN_SLOT;

export function composeReason(fix: unknown, a: string, b: string): string {
  if (!slotsComplete(fix, a, b)) return "";
  return `${reasonLead(fix)} ${tt("so this measure lets the learner", "deshalb lässt diese Maßnahme die Lernenden")} ${clean(a)}, ${tt("so", "deshalb")} ${clean(b)}.`;
}

type Parts = Pick<D1R1, "fixes" | "slotA" | "slotB" | "reasons">;

/** The stored parts of a measure's reason plus the composed `reasons` entry, as one patch. Pure, used by the UI, the mentor key and the checks. */
export function withReason(r: Parts, id: string, p: { fix?: string[]; a?: string; b?: string }): Parts {
  const fix = p.fix ?? fixList(r.fixes[id]);
  const a = p.a ?? r.slotA[id] ?? "";
  const b = p.b ?? r.slotB[id] ?? "";
  return {
    fixes: { ...r.fixes, [id]: fix },
    slotA: { ...r.slotA, [id]: a },
    slotB: { ...r.slotB, [id]: b },
    reasons: { ...r.reasons, [id]: composeReason(fix, a, b) },
  };
}

/** What documents and the mentor's worked answer print: re-composed in the active language, or the stored text if only that exists. */
export function reasonText(r: Parts, id: string): string {
  return composeReason(r.fixes?.[id], r.slotA?.[id] ?? "", r.slotB?.[id] ?? "") || (r.reasons?.[id] ?? "");
}
