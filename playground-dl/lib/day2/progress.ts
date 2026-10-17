import { OPT_IDS, TEST_SLOTS } from "@/data/day2/case";
import { MATERIALS } from "@/data/day2/materials";
import type { RouteNo } from "@/data/course";
import type { Persisted } from "@/store/useStore";

/**
 * Day 2 tasks (CLAUDE.md #57): the plan's own questions as free answers, and every block is Core, so nothing here is Optional.
 * Route 1: Block 1.1 (UE2), Block 1.2 (UE3), Block 2.1 (the case study, UE5-6). Route 2: Block 3.1 (the transfer project, UE8-10).
 * The UE4 coaching has no written answer and is a hidden facilitator card, so it is not a block.
 */
export type TaskBlockId = "b11" | "b12" | "b21" | "b31";

export const MIN_LINE = 30;
export const MIN_SENTENCE = 40;
export const MIN_REASON = 20;
export const MIN_FRAME = 60;
/** The plan asks for five differences (UE2, task 2), written one per line in one box; a line counts from this many characters. */
export const DIFFS_N = 5;
export const MIN_DIFF_LINE = 8;
/** A table row or cell counts when each of its cells has this many characters. */
export const MIN_CELL = 3;
/** A table cell without the scale word a learner may tap in ("Medium: "): the scale alone is not an answer, the reason is. */
export const cellText = (v: string | undefined) => (v ?? "").replace(/^\s*(Low|Medium|High|Niedrig|Mittel|Hoch):\s*/i, "").trim();
/** A free-text box for one option or one test counts from this many characters. */
export const MIN_ASSESS = 20;

export type DiffRow = { aspect: string; a: string; b: string };
export const rowGaps = (r: DiffRow): ("aspect" | "a" | "b")[] => (["aspect", "a", "b"] as const).filter((k) => r[k].trim().length < MIN_CELL);
export const diffLines = (t: string) => t.split(/\r?\n/).map((x) => x.replace(/^\s*(?:\d+[.):]|[-*•])\s*/, "").trim()).filter((x) => x.length >= MIN_DIFF_LINE);

/** How many of the five differences are written, in the layout the learner chose (the other layout is kept but does not count). */
export const diffCount = (r1: { diffMode: "table" | "text"; diffs: string; diffRows: DiffRow[] }) => (r1.diffMode === "table" ? r1.diffRows.filter((r) => rowGaps(r).length === 0).length : diffLines(r1.diffs).length);

export const ASSESS_KEYS = ["risk", "benefit", "effort"] as const;
export const TEST_KEYS = ["what", "how", "measure"] as const;
type Mode = "text" | "table";

/** Block 1.2 question 1: each option is assessed, as one box per option or as a table row. */
export const assessMissing = (r1: { assessMode: Mode; assessText: Record<string, string>; assessRows: Record<string, Record<string, string>> }) =>
  OPT_IDS.filter((id) => (r1.assessMode === "table" ? ASSESS_KEYS.some((k) => cellText(r1.assessRows[id]?.[k]).length < MIN_CELL) : (r1.assessText[id] ?? "").trim().length < MIN_ASSESS));
export const assessDone = (r1: Parameters<typeof assessMissing>[0]) => assessMissing(r1).length === 0;

/** Block 2.1 question 3: each of the three UX tests is defined, as one box per test or as a table row. */
export const testsMissing = (r1: { testMode: Mode; testText: Record<string, string>; testRows: Record<string, Record<string, string>> }) =>
  TEST_SLOTS.filter((id) => (r1.testMode === "table" ? TEST_KEYS.some((k) => (r1.testRows[id]?.[k] ?? "").trim().length < MIN_CELL) : (r1.testText[id] ?? "").trim().length < MIN_ASSESS));
export const testsDone = (r1: Parameters<typeof testsMissing>[0]) => testsMissing(r1).length === 0;

/** No Optional blocks on this day (#57). Kept as an empty list so the page map and the ring read it the same way as the other days. */
export const OPTIONAL_BLOCKS: TaskBlockId[] = [];
export const isOptionalBlock = (b: TaskBlockId) => (OPTIONAL_BLOCKS as string[]).includes(b);
export const CORE_UNITS: Record<RouteNo, TaskBlockId[]> = { 1: ["b11", "b12", "b21"], 2: ["b31"] };

/** A guide for the facilitator, not a timer. Route 1 about 30 minutes, Route 2 about 20 (the user's standing weights). */
export const BLOCK_MINUTES: Record<string, number> = { "1.1": 9, "1.2": 6, "2.1": 15, "3.1": 20 };
export const CORE1_MINUTES = BLOCK_MINUTES["1.1"] + BLOCK_MINUTES["1.2"] + BLOCK_MINUTES["2.1"];
export const CORE2_MINUTES = BLOCK_MINUTES["3.1"];
export const TASK1_MINUTES = CORE1_MINUTES;
export const TASK2_MINUTES = CORE2_MINUTES;

const len = (t: string) => t.trim().length;

/** Which task blocks are complete. Complete means filled in, never correct. */
export function taskBlocks(p: Persisted): Record<TaskBlockId, boolean> {
  const { r1, r2 } = p.d2;
  return {
    b11: !!r1.prefer && len(r1.preferWhy) >= MIN_LINE && diffCount(r1) >= DIFFS_N && r1.principles.every((x) => len(x) >= MIN_LINE),
    b12: assessDone(r1) && !!r1.optChoice && len(r1.optWhy) >= MIN_LINE && len(r1.noTest) >= MIN_LINE,
    b21: len(r1.weakText) >= MIN_LINE && len(r1.approachText) >= MIN_LINE && testsDone(r1) && !!r1.adaptive && len(r1.adaptiveWhy) >= MIN_LINE,
    b31: !!r2.adaptive && len(r2.adaptiveWhy) >= MIN_LINE && len(r2.prototyping) >= MIN_LINE && len(r2.testing) >= MIN_LINE && len(r2.roadmap) >= MIN_LINE && len(r2.riskText) >= MIN_LINE && len(r2.uncertain) >= MIN_FRAME,
  };
}

/** Dossier progress for one route: its Core cards marked read + its task blocks completed. */
export function dossierProgress(p: Persisted, route: RouteNo): { done: number; total: number } {
  const block = route === 1 ? "A" : "B";
  const cards = MATERIALS.filter((m) => m.block === block && !m.optional);
  const read = cards.filter((m) => p.ui.sectionsRead[`d2:${m.id}`]).length;
  const tb = taskBlocks(p);
  const units = CORE_UNITS[route];
  return { done: read + units.filter((b) => tb[b]).length, total: cards.length + units.length };
}
