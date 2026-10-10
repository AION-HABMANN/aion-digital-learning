import { FACT_IDS, OPT_IDS, PICK_CAUSES, PICK_MEASURES } from "@/data/day3/case";
import { CHECK_MIN, R2_PICK } from "@/data/day3/route2";
import { MATERIALS } from "@/data/day3/materials";
import type { RouteNo } from "@/data/course";
import type { Persisted } from "@/store/useStore";

export type TaskBlockId = "b11" | "b12" | "b13" | "b21" | "b22" | "b31" | "b32";

export const MIN_LINE = 30;
export const MIN_SENTENCE = 40;
export const MIN_REASON = 20;
export const MIN_FRAME = 60;

/**
 * Blocks that deepen or repeat a skill a Core block already teaches (CLAUDE.md #35): collapsed by default, never removed, never required.
 * Route 1 Core: Block 1.1 (Level 1: describe the overload from the learner's side, plan Arbeitsauftrag 1) and Block 2.2 (Level 2: the plan's
 * Fallstudie and Arbeitsauftrag 2: develop four improvements, rate, prioritise, justify). Route 2 Core: Block 3.1 and Block 3.2, which hold the
 * plan's Transferprojekt.
 */
export const OPTIONAL_BLOCKS: TaskBlockId[] = ["b12", "b13", "b21"];
export const isOptionalBlock = (b: TaskBlockId) => (OPTIONAL_BLOCKS as string[]).includes(b);
export const CORE_UNITS: Record<RouteNo, TaskBlockId[]> = { 1: ["b11", "b22"], 2: ["b31", "b32"] };

/** A guide for the facilitator, not a timer. Core of Route 1 about 30 minutes, Core of Route 2 about 20 (the user's standing weights). */
export const BLOCK_MINUTES: Record<string, number> = { "1.1": 13, "1.2": 8, "1.3": 5, "2.1": 7, "2.2": 17, "3.1": 9, "3.2": 11 };
export const CORE1_MINUTES = BLOCK_MINUTES["1.1"] + BLOCK_MINUTES["2.2"];
export const CORE2_MINUTES = BLOCK_MINUTES["3.1"] + BLOCK_MINUTES["3.2"];
export const TASK1_MINUTES = Object.entries(BLOCK_MINUTES).filter(([k]) => k.startsWith("1.") || k.startsWith("2.")).reduce((s, [, v]) => s + v, 0);
export const TASK2_MINUTES = CORE2_MINUTES;

const len = (t: string) => t.trim().length;

/** Which task blocks are complete. Complete means filled in, never correct. */
export function taskBlocks(p: Persisted): Record<TaskBlockId, boolean> {
  const { r1, r2 } = p.d3;
  const b22 =
    r1.chosen.length === PICK_MEASURES &&
    r1.chosen.every((id) => !!r1.impact[id] && !!r1.effort[id] && !!r1.risk[id] && len(r1.reasons[id] ?? "") >= MIN_REASON) &&
    r1.order.length === PICK_MEASURES &&
    len(r1.orderWhy) >= MIN_LINE &&
    len(r1.missingInfo) >= MIN_LINE;
  const b31 = len(r2.strategy) >= MIN_SENTENCE && len(r2.definition) >= MIN_SENTENCE && r2.picks.length === R2_PICK && r2.order.length === R2_PICK && len(r2.orderWhy) >= MIN_LINE;
  const b32 = !!r2.risk && len(r2.riskPlan) >= MIN_REASON && !!r2.owner && r2.lessonChecks.length >= CHECK_MIN && len(r2.uncertain) >= MIN_FRAME && len(r2.giveUp) >= MIN_LINE;
  return {
    b11: FACT_IDS.every((id) => r1.sort[id] !== null) && !!r1.worst && len(r1.worstWhy) >= MIN_LINE && len(r1.improve) >= MIN_LINE,
    b12: OPT_IDS.every((id) => !!r1.optImpact[id] && !!r1.optEffort[id] && !!r1.optRisk[id]) && r1.optOrder.length === OPT_IDS.length && len(r1.optWhy) >= MIN_LINE,
    b13: Object.values(r1.reflect).some((v) => len(v) > 0),
    b21: r1.causes.length === PICK_CAUSES && len(r1.causeWhy) >= MIN_LINE,
    b22,
    b31,
    b32,
  };
}

/** Dossier progress for one route: its Core cards marked read + its Core units completed (Optional ones sit outside the ring, #35). */
export function dossierProgress(p: Persisted, route: RouteNo): { done: number; total: number } {
  const block = route === 1 ? "A" : "B";
  const cards = MATERIALS.filter((m) => m.block === block && !m.optional);
  const read = cards.filter((m) => p.ui.sectionsRead[`d3:${m.id}`]).length;
  const tb = taskBlocks(p);
  const units = CORE_UNITS[route];
  return { done: read + units.filter((b) => tb[b]).length, total: cards.length + units.length };
}
