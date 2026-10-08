import { CAUSE_MODEL, CLAIM_IDS, CLAIM_TRUTH, FINDING_IDS, TRUTH_SORT, MEASURE_BY_ID, effortBand } from "@/data/day1/case";
import type { CauseId, MeasureId } from "@/data/day1/case";
import type { ClaimMap, D1R1, SortMap } from "@/store/useStore";

/** Set-level checks (CLAUDE.md #4, #13): they count how many placed items hold and never say which, because with three bins naming the wrong ones names the answer. */

export function sortHolds(sort: SortMap): { holds: number; placed: number } {
  const placed = FINDING_IDS.filter((id) => sort[id] !== null);
  return { holds: placed.filter((id) => sort[id] === TRUTH_SORT[id]).length, placed: placed.length };
}

export function claimHolds(claims: ClaimMap): { holds: number; placed: number } {
  const placed = CLAIM_IDS.filter((id) => claims[id] !== null);
  return { holds: placed.filter((id) => claims[id] === CLAIM_TRUTH[id]).length, placed: placed.length };
}

export function causeHolds(causes: CauseId[]): { holds: number; chosen: number } {
  return { holds: causes.filter((c) => CAUSE_MODEL.includes(c)).length, chosen: causes.length };
}

/** The measures whose effort rating differs from the band their printed cost falls in. Effort follows a rule taught in Materi A5, so it can be checked; impact and risk are judgements and never are. */
export function effortWrong(r1: D1R1): MeasureId[] {
  return r1.chosen.filter((id) => !!r1.effort[id] && r1.effort[id] !== effortBand(MEASURE_BY_ID[id].cost));
}
