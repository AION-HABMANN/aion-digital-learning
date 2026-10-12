import { CAUSE_MODEL, FACT_IDS, MEASURE_BY_ID, OPT_IDS, TRUTH_SORT, effortBand } from "@/data/day5/case";
import type { ProblemId } from "@/data/day5/case";
import { effortWrongOf } from "@/lib/dayStd/common";
import type { D5R1 } from "@/store/dayTypesStd";

/** Set-level checks (CLAUDE.md #4, #13): they count how many placed items hold and never say which, because with three bins naming the wrong ones names the answer. */

export function sortHolds(sort: D5R1["sort"]): { holds: number; placed: number } {
  const placed = FACT_IDS.filter((id) => sort[id] !== null);
  return { holds: placed.filter((id) => sort[id] === TRUTH_SORT[id]).length, placed: placed.length };
}

export function causeHolds(causes: ProblemId[]): { holds: number; chosen: number } {
  return { holds: causes.filter((c) => CAUSE_MODEL.includes(c)).length, chosen: causes.length };
}

/** The measures whose effort rating differs from the band their printed cost falls in (a rule taught in Materi A5). Value and risk are judgements and never are. */
export const effortWrong = (r1: D5R1) => effortWrongOf(r1, (id) => MEASURE_BY_ID[id as keyof typeof MEASURE_BY_ID].cost, effortBand);

/** Block 1.2 has no effort check: its second criterion is business value, a judgement. */
export const optEffortWrong = (_r1: D5R1): string[] => (OPT_IDS.length ? [] : []);
