import { FACT_IDS, OPT_IDS, PICK_CAUSES, PICK_MEASURES } from "@/data/day5/case";
import { EVIDENCE_MIN, R2_PICK } from "@/data/day5/route2";
import { MATERIALS } from "@/data/day5/materials";
import { MIN_FRAME, MIN_LINE, MIN_REASON, dossierProgressOf, len, measuresComplete } from "@/lib/dayStd/common";
import type { TaskBlockId } from "@/lib/dayStd/common";
import type { RouteNo } from "@/data/course";
import type { Persisted } from "@/store/useStore";

export type { TaskBlockId };
export { BLOCK_MINUTES, CORE1_MINUTES, CORE2_MINUTES, CORE_UNITS, MIN_FRAME, MIN_LINE, MIN_REASON, MIN_SENTENCE, OPTIONAL_BLOCKS, TASK1_MINUTES, TASK2_MINUTES, isOptionalBlock } from "@/lib/dayStd/common";

/** A short row of the conflict table: what the user gets, what the business gets, what is lost or postponed. */
export const MIN_ROW = 10;

/**
 * Day 5 · which task blocks are complete. Complete means filled in, never correct. Route 1 Core: Block 1.1 (Level 1: take the learner's perspective, plan
 * Arbeitsauftrag 1) and Block 2.2 (Level 2: the plan's Fallstudie and Arbeitsauftrag 2). Route 2 Core: Block 3.1 and Block 3.2, the Transferprojekt.
 */
export function taskBlocks(p: Persisted): Record<TaskBlockId, boolean> {
  const { r1, r2 } = p.d5;
  return {
    b11: len(r1.goal) >= MIN_LINE && FACT_IDS.every((id) => r1.sort[id] !== null) && !!r1.worst && len(r1.worstWhy) >= MIN_LINE && len(r1.expectations) >= MIN_FRAME,
    b12: OPT_IDS.every((id) => !!r1.optImpact[id] && !!r1.optEffort[id] && !!r1.optRisk[id]) && r1.optOrder.length === OPT_IDS.length && len(r1.optWhy) >= MIN_LINE,
    b13: Object.values(r1.reflect).some((v) => len(v) > 0),
    b21: r1.causes.length === PICK_CAUSES && r1.causes.every((id) => len(r1.errors[id]) >= MIN_ROW),
    b22: measuresComplete(r1, PICK_MEASURES),
    b31: len(r2.needs) >= MIN_FRAME && r2.picks.length === R2_PICK && r2.order.length === R2_PICK && r2.picks.every((id) => len(r2.conflict[id]?.user) >= MIN_ROW && len(r2.conflict[id]?.business) >= MIN_ROW && len(r2.conflict[id]?.lost) >= MIN_ROW) && len(r2.orderWhy) >= MIN_LINE,
    b32: !!r2.risk && len(r2.riskPlan) >= MIN_REASON && !!r2.owner && r2.evidence.length >= EVIDENCE_MIN && len(r2.rule) >= MIN_LINE && len(r2.uncertain) >= MIN_FRAME && len(r2.giveUp) >= MIN_LINE,
  };
}

/** Dossier progress for one route: its Core cards marked read + its Core units completed (Optional ones sit outside the ring, #35). */
export const dossierProgress = (p: Persisted, route: RouteNo) => dossierProgressOf(5, MATERIALS, p, route, taskBlocks(p));
