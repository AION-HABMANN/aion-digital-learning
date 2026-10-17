import type { OptId as D2OptId, PlatformId, TestSlot, Verdict } from "@/data/day2/case";
import { FACT_IDS as D3_FACT_IDS } from "@/data/day3/case";
import type { AreaId, CauseId, FactId as D3FactId, MeasureId, OptId as D3OptId, ReflectKey as D3ReflectKey } from "@/data/day3/case";
import type { CheckId, DecisionId, OwnerId as D3OwnerId, RiskId as D3RiskId } from "@/data/day3/route2";
import type { Score } from "@/store/useStore";

/**
 * The persisted answer state of Day 2 and Day 3: one slice per day, each with its two routes (`r1`, `r2`), the same shape as Day 1's `d1`.
 * Route 1 is the UX Analysis File (Levels 1 and 2), Route 2 the UX Strategy Memo (Level 3). A change to a shape here bumps the persist
 * version in store/useStore.ts and is covered by its deep merge (CLAUDE.md #9).
 */

export type Count = { holds: number; placed: number };

/* ------------------------------------------------------------------ Day 2 */

type AssessRow = { risk: string; benefit: string; effort: string };
type TestRow = { what: string; how: string; measure: string };

/**
 * Day 2 · Route 1 · Levels 1 and 2 (CLAUDE.md #57: the plan's own questions as free answers, every block Core).
 * Block 1.1 (UE2): prefer a platform, five differences (one text box by default, or a table), three principles.
 * Block 1.2 (UE3): assess three options (one box per option by default, or a table), decide, risks without testing.
 * Block 2.1 (UE5-6): the case study: weaknesses, a prototype approach, three UX tests (boxes or a table), the adaptive decision.
 * The UE4 coaching has no written answer and so no field.
 */
export type D2R1 = {
  prefer: PlatformId | null;
  preferWhy: string;
  diffMode: "text" | "table";
  diffs: string;
  diffRows: { aspect: string; a: string; b: string }[];
  principles: string[];
  assessMode: "text" | "table";
  assessText: Record<string, string>;
  assessRows: Record<string, AssessRow>;
  optChoice: D2OptId | null;
  optWhy: string;
  noTest: string;
  weakText: string;
  approachText: string;
  testMode: "text" | "table";
  testText: Record<TestSlot, string>;
  testRows: Record<TestSlot, TestRow>;
  adaptive: Verdict | null;
  adaptiveWhy: string;
};

/** Day 2 · Route 2 · Level 3: the plan's transfer project, six items (CLAUDE.md #57). */
export type D2R2 = {
  adaptive: Verdict | null;
  adaptiveWhy: string;
  prototyping: string;
  testing: string;
  roadmap: string;
  riskText: string;
  uncertain: string;
};

export type D2State = { r1: D2R1; r2: D2R2 };

const emptyAssess = (): AssessRow => ({ risk: "", benefit: "", effort: "" });
const emptyTest = (): TestRow => ({ what: "", how: "", measure: "" });

export const emptyD2R1 = (): D2R1 => ({
  prefer: null,
  preferWhy: "",
  diffMode: "text",
  diffs: "",
  diffRows: Array.from({ length: 5 }, () => ({ aspect: "", a: "", b: "" })),
  principles: ["", "", ""],
  assessMode: "text",
  assessText: { A: "", B: "", C: "" },
  assessRows: { A: emptyAssess(), B: emptyAssess(), C: emptyAssess() },
  optChoice: null,
  optWhy: "",
  noTest: "",
  weakText: "",
  approachText: "",
  testMode: "text",
  testText: { "1": "", "2": "", "3": "" },
  testRows: { "1": emptyTest(), "2": emptyTest(), "3": emptyTest() },
  adaptive: null,
  adaptiveWhy: "",
});

export const emptyD2R2 = (): D2R2 => ({
  adaptive: null,
  adaptiveWhy: "",
  prototyping: "",
  testing: "",
  roadmap: "",
  riskText: "",
  uncertain: "",
});

export const emptyD2 = (): D2State => ({ r1: emptyD2R1(), r2: emptyD2R2() });

/* ------------------------------------------------------------------ Day 3 */

/** Day 3 · Route 1 · Levels 1 and 2. Core: Block 1.1 (eight facts, the one that stops a learner first, the improvements) and Block 2.2 (four of nine measures). */
export type D3R1 = {
  sort: Record<D3FactId, AreaId | null>;
  sortHistory: Record<D3FactId, AreaId | null>[];
  sortFuture: Record<D3FactId, AreaId | null>[];
  sortChecks: number;
  sortResult: Count | null;
  sortClue: boolean;
  sortReasoning: boolean;
  worst: D3FactId | null;
  worstWhy: string;
  improve: string;
  /** Block 1.2 (Optional): three options for a module, rated, ordered, with the one of greatest effect. */
  optImpact: Record<string, Score>;
  optEffort: Record<string, Score>;
  optRisk: Record<string, Score>;
  optEffortFlags: string[];
  optEffortClue: boolean;
  optEffortResult: { holds: number; rated: number } | null;
  optOrder: D3OptId[];
  optWhy: string;
  /** Block 1.3 (Optional): the coaching reflection. */
  reflect: Record<D3ReflectKey, string>;
  /** Block 2.1 (Optional): four causes of overload. */
  causes: CauseId[];
  causeResult: { holds: number; chosen: number } | null;
  causeClue: boolean;
  causeWhy: string;
  /** Block 2.2 (Core): four measures, rated, ordered, with what is missing. */
  chosen: MeasureId[];
  impact: Record<string, Score>;
  effort: Record<string, Score>;
  risk: Record<string, Score>;
  reasons: Record<string, string>;
  effortFlags: string[];
  effortClue: boolean;
  effortResult: { holds: number; rated: number } | null;
  order: MeasureId[];
  orderWhy: string;
  missingInfo: string;
  checks: number;
};

/** Day 3 · Route 2 · Level 3. */
export type D3R2 = {
  strategy: string;
  definition: string;
  picks: DecisionId[];
  order: DecisionId[];
  orderWhy: string;
  risk: D3RiskId | null;
  riskPlan: string;
  owner: D3OwnerId | null;
  lessonChecks: CheckId[];
  uncertain: string;
  giveUp: string;
};

export type D3State = { r1: D3R1; r2: D3R2 };

export const emptyD3R1 = (): D3R1 => ({
  sort: Object.fromEntries(D3_FACT_IDS.map((id) => [id, null])) as D3R1["sort"],
  sortHistory: [],
  sortFuture: [],
  sortChecks: 0,
  sortResult: null,
  sortClue: false,
  sortReasoning: false,
  worst: null,
  worstWhy: "",
  improve: "",
  optImpact: {},
  optEffort: {},
  optRisk: {},
  optEffortFlags: [],
  optEffortClue: false,
  optEffortResult: null,
  optOrder: [],
  optWhy: "",
  reflect: { a: "", b: "", c: "" },
  causes: [],
  causeResult: null,
  causeClue: false,
  causeWhy: "",
  chosen: [],
  impact: {},
  effort: {},
  risk: {},
  reasons: {},
  effortFlags: [],
  effortClue: false,
  effortResult: null,
  order: [],
  orderWhy: "",
  missingInfo: "",
  checks: 0,
});

export const emptyD3R2 = (): D3R2 => ({
  strategy: "",
  definition: "",
  picks: [],
  order: [],
  orderWhy: "",
  risk: null,
  riskPlan: "",
  owner: null,
  lessonChecks: [],
  uncertain: "",
  giveUp: "",
});

export const emptyD3 = (): D3State => ({ r1: emptyD3R1(), r2: emptyD3R2() });
