import { MEASURE_BY_ID, NOTE_IDS, TRUTH_SORT, effortBand } from "@/data/day6/case";
import { effortWrongOf } from "@/lib/dayStd/common";
import type { D6R1 } from "@/store/dayTypesStd";

/** Set-level check (CLAUDE.md #4, #13): it counts how many placed notes hold and never says which, because with three fields naming the wrong ones names the answer. */

export function sortHolds(sort: D6R1["sort"]): { holds: number; placed: number } {
  const placed = NOTE_IDS.filter((id) => sort[id] !== null);
  return { holds: placed.filter((id) => sort[id] === TRUTH_SORT[id]).length, placed: placed.length };
}

/** The measures whose effort rating differs from the band their printed cost falls in (a rule taught in Materi A5). Impact and risk are judgements and never are. */
export const effortWrong = (r1: D6R1) => effortWrongOf(r1, (id) => MEASURE_BY_ID[id as keyof typeof MEASURE_BY_ID].cost, effortBand);
