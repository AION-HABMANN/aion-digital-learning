import { effortBandOf } from "@/lib/dayGen/model";
import { effortWrongOf } from "@/lib/dayStd/common";
import type { GenSpec } from "@/lib/dayGen/spec";
import type { GenR1 } from "@/store/dayTypesGen";

/** Set-level checks (CLAUDE.md #4, #13): they count how many placed items hold and never say which, because with three bins naming the wrong ones names the answer. */
export function sortHolds(spec: GenSpec, sort: GenR1["sort"]): { holds: number; placed: number } {
  const placed = spec.facts.filter((f) => sort[f.id] !== null && sort[f.id] !== undefined);
  return { holds: placed.filter((f) => sort[f.id] === f.area).length, placed: placed.length };
}

export function causeHolds(spec: GenSpec, causes: string[]): { holds: number; chosen: number } {
  return { holds: causes.filter((c) => spec.causes.model.includes(c)).length, chosen: causes.length };
}

/** The measures whose effort rating differs from the band their printed cost falls in. Impact and risk are judgements and never are. */
export const effortWrong = (spec: GenSpec, r1: GenR1) => effortWrongOf(r1, (id) => spec.b22.measures.find((m) => m.id === id)?.cost ?? 0, effortBandOf(spec));
