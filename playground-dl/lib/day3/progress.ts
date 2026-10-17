import { OPT_IDS } from "@/data/day3/case";
import { MATERIALS } from "@/data/day3/materials";
import type { RouteNo } from "@/data/course";
import type { Persisted } from "@/store/useStore";

/**
 * Day 3 tasks (CLAUDE.md #57): the plan's own questions as free answers, and every block is Core, so nothing here is Optional.
 * Route 1: Block 1.1 (UE2), Block 1.2 (UE3), Block 2.1 (the case study, UE5-6). Route 2: Block 3.1 (the transfer project, UE8-10).
 * The UE4 coaching and the UE7 feedback round have no written answer and are hidden facilitator cards, so they are not blocks.
 */
export type TaskBlockId = "b11" | "b12" | "b21" | "b31";

export const MIN_LINE = 30;
export const MIN_FRAME = 60;
/** A table row or cell counts when each of its cells has this many characters. */
export const MIN_CELL = 3;
/** A free-text box for one option counts from this many characters. */
export const MIN_ASSESS = 20;
/** A line of a list counts from this many characters (a leading number or bullet is ignored). */
export const MIN_LIST_LINE = 8;

/** How many items the plan asks for in each list. */
export const PROBLEMS_N = 5;
export const CAUSES_N = 4;
export const IMPROVEMENTS_N = 4;
export const MEASURES_N = 3;

/** A table cell without the scale word a learner may tap in ("Medium: "): the scale alone is not an answer, the reason is. */
export const cellText = (v: string | undefined) => (v ?? "").replace(/^\s*(Low|Medium|High|Niedrig|Mittel|Hoch):\s*/i, "").trim();
/** A part of a decision written as a table (the risk, the decision logic, the decision under uncertainty) counts from this many characters: a sentence. */
export const FRAME_CELL = 20;

export const listLines = (t: string) => t.split(/\r?\n/).map((x) => x.replace(/^\s*(?:\d+[.):]|[-*•])\s*/, "").trim()).filter((x) => x.length >= MIN_LIST_LINE);

export type ProblemRow = { problem: string; side: string };
export type CauseRow = { cause: string; improvement: string };
export const problemGaps = (r: ProblemRow): ("problem" | "side")[] => (["problem", "side"] as const).filter((k) => r[k].trim().length < MIN_CELL);
export const causeGaps = (r: CauseRow): ("cause" | "improvement")[] => (["cause", "improvement"] as const).filter((k) => r[k].trim().length < MIN_CELL);

/** Block 1.1 question 1: how many of the five problems are written, in the layout the learner chose (the other layout is kept but does not count). */
export const problemCount = (r1: { problemMode: "table" | "text"; problems: string; problemRows: ProblemRow[] }) =>
  r1.problemMode === "table" ? r1.problemRows.filter((r) => problemGaps(r).length === 0).length : listLines(r1.problems).length;

/** Block 2.1 questions 1 and 2: how many causes and how many improvements are written, in the layout chosen. */
export const causeCount = (r1: { causeMode: "table" | "text"; causesText: string; causeRows: CauseRow[] }) =>
  r1.causeMode === "table" ? r1.causeRows.filter((r) => r.cause.trim().length >= MIN_CELL).length : listLines(r1.causesText).length;
export const improvementCount = (r1: { causeMode: "table" | "text"; improvementsText: string; causeRows: CauseRow[] }) =>
  r1.causeMode === "table" ? r1.causeRows.filter((r) => r.improvement.trim().length >= MIN_CELL).length : listLines(r1.improvementsText).length;

export const ASSESS_KEYS = ["impact", "effort", "risk"] as const;
type Mode = "text" | "table";

/* Route 2, questions 2 and 4 to 6: a text box (or a list), or a guided table. Only the chosen layout counts. */
export const MEASURE_KEYS = ["measure", "why"] as const;
export const RISK_KEYS = ["goes", "action"] as const;
type Cells = Record<string, string>;
export const measureGaps = (r: Cells): ("measure" | "why")[] => MEASURE_KEYS.filter((k) => cellText(r[k]).length < MIN_CELL);
/** The rows of a frame table (fixed parts) whose cells are still too short, by index. */
export const frameGaps = (rows: Cells[], keys: readonly string[]) => rows.map((r, i) => (keys.some((k) => (r[k] ?? "").trim().length < FRAME_CELL) ? i : -1)).filter((i) => i >= 0);
type R2Like = {
  measures: string; measureMode: Mode; measureRows: Cells[];
  riskText: string; riskMode: Mode; riskRows: Cells[];
  logic: string; logicMode: Mode; logicRows: Cells[];
  uncertain: string; uncMode: Mode; uncRows: Cells[];
};
export const measureCount = (r: Pick<R2Like, "measures" | "measureMode" | "measureRows">) => (r.measureMode === "table" ? r.measureRows.filter((x) => measureGaps(x).length === 0).length : listLines(r.measures).length);
export const riskOk = (r: R2Like) => (r.riskMode === "table" ? frameGaps(r.riskRows, RISK_KEYS).length === 0 : r.riskText.trim().length >= MIN_LINE);
export const logicOk = (r: R2Like) => (r.logicMode === "table" ? frameGaps(r.logicRows, ["text"]).length === 0 : r.logic.trim().length >= MIN_LINE);
export const uncOk = (r: R2Like) => (r.uncMode === "table" ? frameGaps(r.uncRows, ["text"]).length === 0 : r.uncertain.trim().length >= MIN_FRAME);

/** Block 1.2 question 1: each option is assessed, as one box per option or as a table row. */
export const assessMissing = (r1: { assessMode: Mode; assessText: Record<string, string>; assessRows: Record<string, Record<string, string>> }) =>
  OPT_IDS.filter((id) => (r1.assessMode === "table" ? ASSESS_KEYS.some((k) => cellText(r1.assessRows[id]?.[k]).length < MIN_CELL) : (r1.assessText[id] ?? "").trim().length < MIN_ASSESS));
export const assessDone = (r1: Parameters<typeof assessMissing>[0]) => assessMissing(r1).length === 0;

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
  const { r1, r2 } = p.d3;
  return {
    b11: problemCount(r1) >= PROBLEMS_N && len(r1.feel) >= MIN_LINE && len(r1.improve) >= MIN_LINE,
    b12: assessDone(r1) && len(r1.optOrder) >= MIN_ASSESS && !!r1.optChoice && len(r1.optWhy) >= MIN_LINE,
    b21: causeCount(r1) >= CAUSES_N && improvementCount(r1) >= IMPROVEMENTS_N && len(r1.priority) >= MIN_LINE && len(r1.justify) >= MIN_LINE,
    b31: len(r2.strategy) >= MIN_LINE && measureCount(r2) >= MEASURES_N && len(r2.definition) >= MIN_LINE && riskOk(r2) && logicOk(r2) && uncOk(r2),
  };
}

/** Dossier progress for one route: its Core cards marked read + its task blocks completed. */
export function dossierProgress(p: Persisted, route: RouteNo): { done: number; total: number } {
  const block = route === 1 ? "A" : "B";
  const cards = MATERIALS.filter((m) => m.block === block && !m.optional);
  const read = cards.filter((m) => p.ui.sectionsRead[`d3:${m.id}`]).length;
  const tb = taskBlocks(p);
  const units = CORE_UNITS[route];
  return { done: read + units.filter((b) => tb[b]).length, total: cards.length + units.length };
}
