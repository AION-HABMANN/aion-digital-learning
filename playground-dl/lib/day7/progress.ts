import { FACT_IDS, GROUPS_MIN, OPT_IDS, PICK_CAUSES, PICK_MEASURES, PICK_METHODS } from "@/data/day7/case";
import { MATERIALS } from "@/data/day7/materials";
import { EVAL_MIN, KPI_MIN, PLACES_MIN, R2_PICK } from "@/data/day7/route2";
import { MIN_FRAME, MIN_LINE, MIN_REASON, dossierProgressOf, len, measuresComplete } from "@/lib/dayStd/common";
import type { TaskBlockId } from "@/lib/dayStd/common";
import type { RouteNo } from "@/data/course";
import type { Persisted } from "@/store/useStore";

export type { TaskBlockId };
export { BLOCK_MINUTES, CORE1_MINUTES, CORE2_MINUTES, CORE_UNITS, MIN_FRAME, MIN_LINE, MIN_REASON, MIN_SENTENCE, OPTIONAL_BLOCKS, TASK1_MINUTES, TASK2_MINUTES, isOptionalBlock } from "@/lib/dayStd/common";

/** A short row: a few words. */
export const MIN_ROW = 10;

/**
 * Day 7 · which task blocks are complete. Complete means filled in, never correct. Route 1 Core: Block 1.1 (Level 1: describe the barriers from the learner's side,
 * the plan's Arbeitsauftrag 1) and Block 2.2 (Level 2: the plan's Fallstudie, four measures and three evaluation methods). Route 2 Core: Block 3.1 and Block 3.2,
 * the Transferprojekt.
 */
export function taskBlocks(p: Persisted): Record<TaskBlockId, boolean> {
  const { r1, r2 } = p.d7;
  return {
    b11: FACT_IDS.every((id) => r1.sort[id] !== null) && r1.groups.length >= GROUPS_MIN && len(r1.groupsWhy) >= MIN_LINE && len(r1.improve) >= MIN_FRAME,
    b12: OPT_IDS.every((id) => !!r1.optImpact[id] && !!r1.optEffort[id] && !!r1.optRisk[id]) && r1.optOrder.length === OPT_IDS.length && len(r1.optWhy) >= MIN_LINE,
    b13: Object.values(r1.reflect).some((v) => len(v) > 0),
    b21: r1.causes.length === PICK_CAUSES && len(r1.causeWhy) >= MIN_LINE,
    b22: measuresComplete(r1, PICK_MEASURES) && r1.methods.length === PICK_METHODS && len(r1.methodsWhy) >= MIN_LINE,
    b31: len(r2.strategy) >= MIN_FRAME && r2.places.length >= PLACES_MIN && r2.picks.length === R2_PICK && r2.order.length === R2_PICK && len(r2.orderWhy) >= MIN_LINE,
    b32:
      r2.kpis.length >= KPI_MIN &&
      r2.evals.length >= EVAL_MIN &&
      len(r2.readers) >= MIN_LINE &&
      !!r2.risk &&
      len(r2.riskPlan) >= MIN_LINE &&
      len(r2.decide) >= MIN_ROW &&
      len(r2.dontKnow) >= MIN_ROW &&
      len(r2.reverse) >= MIN_LINE &&
      len(r2.giveUp) >= MIN_LINE,
  };
}

void MIN_REASON;

/** Dossier progress for one route: its Core cards marked read + its Core units completed (Optional ones sit outside the ring, #35). */
export const dossierProgress = (p: Persisted, route: RouteNo) => dossierProgressOf(7, MATERIALS, p, route, taskBlocks(p));
