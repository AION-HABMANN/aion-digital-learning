import { FACT_IDS, OPT_BY_ID, OPT_IDS, TRUTH_SORT, WEAK_MODEL, effortBand } from "@/data/day2/case";
import type { OptId, WeakId } from "@/data/day2/case";
import type { D2R1 } from "@/store/dayTypes";

/** Set-level checks (CLAUDE.md #4, #13): they count how many placed items hold and never say which, because with three bins naming the wrong ones names the answer. */

export function sortHolds(sort: D2R1["sort"]): { holds: number; placed: number } {
  const placed = FACT_IDS.filter((id) => sort[id] !== null);
  return { holds: placed.filter((id) => sort[id] === TRUTH_SORT[id]).length, placed: placed.length };
}

export function weakHolds(weak: WeakId[]): { holds: number; chosen: number } {
  return { holds: weak.filter((w) => WEAK_MODEL.includes(w)).length, chosen: weak.length };
}

/** The options whose effort rating differs from the band their printed cost falls in. Effort follows a rule taught in Materi A5, so it can be checked; benefit and risk are judgements and never are. */
export function optEffortWrong(r1: D2R1): OptId[] {
  return OPT_IDS.filter((id) => !!r1.optEffort[id] && r1.optEffort[id] !== effortBand(OPT_BY_ID[id].cost));
}
