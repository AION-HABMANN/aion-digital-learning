import { CAUSE_MODEL, FACT_IDS, MEASURE_BY_ID, OPT_BY_ID, OPT_IDS, TRUTH_SORT, effortBand } from "@/data/day4/case";
import type { CauseId } from "@/data/day4/case";
import { effortWrongOf } from "@/lib/dayStd/common";
import type { D4R1 } from "@/store/dayTypesStd";

/** Set-level checks (CLAUDE.md #4, #13): they count how many placed items hold and never say which, because with four bins naming the wrong ones names the answer. */

export function sortHolds(sort: D4R1["sort"]): { holds: number; placed: number } {
  const placed = FACT_IDS.filter((id) => sort[id] !== null);
  return { holds: placed.filter((id) => sort[id] === TRUTH_SORT[id]).length, placed: placed.length };
}

export function causeHolds(causes: CauseId[]): { holds: number; chosen: number } {
  return { holds: causes.filter((c) => CAUSE_MODEL.includes(c)).length, chosen: causes.length };
}

/** The measures whose effort rating differs from the band their printed cost falls in (a rule taught in Materi A5). Impact and risk are judgements and never are. */
export const effortWrong = (r1: D4R1) => effortWrongOf(r1, (id) => MEASURE_BY_ID[id as keyof typeof MEASURE_BY_ID].cost, effortBand);

/** The same for the three options of Block 1.2. */
export function optEffortWrong(r1: D4R1): string[] {
  return OPT_IDS.filter((id) => !!r1.optEffort[id] && r1.optEffort[id] !== effortBand(OPT_BY_ID[id].cost));
}
