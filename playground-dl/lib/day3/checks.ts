import { CAUSE_MODEL, FACT_IDS, MEASURE_BY_ID, OPT_BY_ID, OPT_IDS, TRUTH_SORT, effortBand } from "@/data/day3/case";
import type { CauseId, MeasureId, OptId } from "@/data/day3/case";
import type { D3R1 } from "@/store/dayTypes";

/** Set-level checks (CLAUDE.md #4, #13): they count how many placed items hold and never say which, because with three bins naming the wrong ones names the answer. */

export function sortHolds(sort: D3R1["sort"]): { holds: number; placed: number } {
  const placed = FACT_IDS.filter((id) => sort[id] !== null);
  return { holds: placed.filter((id) => sort[id] === TRUTH_SORT[id]).length, placed: placed.length };
}

export function causeHolds(causes: CauseId[]): { holds: number; chosen: number } {
  return { holds: causes.filter((c) => CAUSE_MODEL.includes(c)).length, chosen: causes.length };
}

/** The measures whose effort rating differs from the band their printed cost falls in. Effort follows a rule taught in Materi A5, so it can be checked; impact and risk are judgements and never are. */
export function effortWrong(r1: D3R1): MeasureId[] {
  return r1.chosen.filter((id) => !!r1.effort[id] && r1.effort[id] !== effortBand(MEASURE_BY_ID[id].cost));
}

/** The same for the three options of Block 1.2. */
export function optEffortWrong(r1: D3R1): OptId[] {
  return OPT_IDS.filter((id) => !!r1.optEffort[id] && r1.optEffort[id] !== effortBand(OPT_BY_ID[id].cost));
}
