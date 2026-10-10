import { FACT_IDS, OPT_IDS, PICK_TESTS, PICK_WEAK } from "@/data/day2/case";
import { DATA_MIN, EVIDENCE_MIN, R2_PICK } from "@/data/day2/route2";
import { MATERIALS } from "@/data/day2/materials";
import type { RouteNo } from "@/data/course";
import type { Persisted } from "@/store/useStore";

export type TaskBlockId = "b11" | "b12" | "b13" | "b21" | "b22" | "b31" | "b32";

export const MIN_LINE = 30;
export const MIN_SENTENCE = 40;
export const MIN_REASON = 20;
export const MIN_FRAME = 60;

/**
 * Blocks that deepen or repeat a skill a Core block already teaches (CLAUDE.md #35): collapsed by default, never removed, never required.
 * Route 1 Core: Block 1.1 (Level 1: compare two platforms, plan Arbeitsauftrag 1) and Block 2.2 (Level 2: the plan's Fallstudie, with the prototype
 * approach, three UX tests and the decision on adaptive learning). Route 2 Core: Block 3.1 and Block 3.2, which hold the plan's Transferprojekt.
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
  const { r1, r2 } = p.d2;
  const b11 = FACT_IDS.every((id) => r1.sort[id] !== null) && !!r1.prefer && len(r1.preferWhy) >= MIN_LINE && r1.principles.every((x) => len(x) >= MIN_LINE);
  const b22 =
    !!r1.approach &&
    len(r1.approachWhy) >= MIN_LINE &&
    r1.tests.length === PICK_TESTS &&
    r1.tests.every((id) => len(r1.testQ[id] ?? "") >= MIN_REASON) &&
    !!r1.adaptive &&
    len(r1.adaptiveWhy) >= MIN_LINE &&
    len(r1.missingInfo) >= MIN_LINE;
  const b31 = !!r2.adaptive && len(r2.adaptiveWhy) >= MIN_LINE && len(r2.prototyping) >= MIN_LINE && r2.data.length >= DATA_MIN && r2.picks.length === R2_PICK && r2.order.length === R2_PICK && len(r2.orderWhy) >= MIN_LINE;
  const b32 = !!r2.risk && len(r2.riskPlan) >= MIN_REASON && len(r2.uncertain) >= MIN_FRAME && !!r2.owner && r2.evidence.length >= EVIDENCE_MIN && len(r2.giveUp) >= MIN_LINE;
  return {
    b11,
    b12: OPT_IDS.every((id) => !!r1.optBenefit[id] && !!r1.optEffort[id] && !!r1.optRisk[id]) && !!r1.optChoice && len(r1.optWhy) >= MIN_LINE,
    b13: Object.values(r1.reflect).some((v) => len(v) > 0),
    b21: r1.weak.length === PICK_WEAK && len(r1.weakWhy) >= MIN_LINE,
    b22,
    b31,
    b32,
  };
}

/** Dossier progress for one route: its Core cards marked read + its Core units completed (Optional ones sit outside the ring, #35). */
export function dossierProgress(p: Persisted, route: RouteNo): { done: number; total: number } {
  const block = route === 1 ? "A" : "B";
  const cards = MATERIALS.filter((m) => m.block === block && !m.optional);
  const read = cards.filter((m) => p.ui.sectionsRead[`d2:${m.id}`]).length;
  const tb = taskBlocks(p);
  const units = CORE_UNITS[route];
  return { done: read + units.filter((b) => tb[b]).length, total: cards.length + units.length };
}
