import { CAUSE_MODEL, FACT_IDS, MEASURE_BY_ID, TRUTH_SORT, effortBand } from "@/data/day7/case";
import type { BarrierId } from "@/data/day7/case";
import { effortWrongOf } from "@/lib/dayStd/common";
import type { D7R1 } from "@/store/dayTypesStd";

/** Set-level checks (CLAUDE.md #4, #13): they count how many placed items hold and never say which, because with three bins naming the wrong ones names the answer. */

export function sortHolds(sort: D7R1["sort"]): { holds: number; placed: number } {
  const placed = FACT_IDS.filter((id) => sort[id] !== null);
  return { holds: placed.filter((id) => sort[id] === TRUTH_SORT[id]).length, placed: placed.length };
}

export function causeHolds(causes: BarrierId[]): { holds: number; chosen: number } {
  return { holds: causes.filter((c) => CAUSE_MODEL.includes(c)).length, chosen: causes.length };
}

/** The measures whose effort rating differs from the band their printed cost falls in (a rule taught in Materi A5). Impact and risk are judgements and never are. */
export const effortWrong = (r1: D7R1) => effortWrongOf(r1, (id) => MEASURE_BY_ID[id as keyof typeof MEASURE_BY_ID].cost, effortBand);
