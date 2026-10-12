import { FACT_IDS, OPT_IDS, PICK_CAUSES, PICK_MEASURES } from "@/data/day4/case";
import { EVIDENCE_MIN, METRIC_MIN, R2_PICK } from "@/data/day4/route2";
import { MATERIALS } from "@/data/day4/materials";
import { MIN_FRAME, MIN_LINE, MIN_REASON, dossierProgressOf, len, measuresComplete } from "@/lib/dayStd/common";
import type { TaskBlockId } from "@/lib/dayStd/common";
import type { RouteNo } from "@/data/course";
import type { Persisted } from "@/store/useStore";

export type { TaskBlockId };
export { BLOCK_MINUTES, CORE1_MINUTES, CORE2_MINUTES, CORE_UNITS, MIN_FRAME, MIN_LINE, MIN_REASON, MIN_SENTENCE, OPTIONAL_BLOCKS, TASK1_MINUTES, TASK2_MINUTES, isOptionalBlock } from "@/lib/dayStd/common";

/**
 * Day 4 · which task blocks are complete. Complete means filled in, never correct. Route 1 Core: Block 1.1 (Level 1: compare two platforms for motivation,
 * plan Arbeitsauftrag 1) and Block 2.2 (Level 2: the plan's Fallstudie and Arbeitsauftrag 2). Route 2 Core: Block 3.1 and Block 3.2, the Transferprojekt.
 */
export function taskBlocks(p: Persisted): Record<TaskBlockId, boolean> {
  const { r1, r2 } = p.d4;
  return {
    b11: FACT_IDS.every((id) => r1.sort[id] !== null) && !!r1.prefer && len(r1.preferWhy) >= MIN_LINE && r1.principles.length === 3 && r1.principles.every((x) => len(x) >= MIN_REASON),
    b12: OPT_IDS.every((id) => !!r1.optImpact[id] && !!r1.optEffort[id] && !!r1.optRisk[id]) && r1.optOrder.length === OPT_IDS.length && len(r1.optWhy) >= MIN_LINE,
    b13: Object.values(r1.reflect).some((v) => len(v) > 0),
    b21: r1.causes.length === PICK_CAUSES && len(r1.causeWhy) >= MIN_LINE,
    b22: measuresComplete(r1, PICK_MEASURES),
    b31: !!r2.strategy && len(r2.strategyWhy) >= MIN_LINE && r2.picks.length === R2_PICK && r2.order.length === R2_PICK && len(r2.orderWhy) >= MIN_LINE && r2.metrics.length >= METRIC_MIN && len(r2.success) >= MIN_FRAME,
    b32: !!r2.risk && len(r2.riskPlan) >= MIN_REASON && len(r2.uncertain) >= MIN_FRAME && !!r2.owner && r2.evidence.length >= EVIDENCE_MIN && len(r2.giveUp) >= MIN_LINE,
  };
}

/** Dossier progress for one route: its Core cards marked read + its Core units completed (Optional ones sit outside the ring, #35). */
export const dossierProgress = (p: Persisted, route: RouteNo) => dossierProgressOf(4, MATERIALS, p, route, taskBlocks(p));
