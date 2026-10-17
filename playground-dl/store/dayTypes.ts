import type { OptId as D2OptId, PlatformId, TestSlot, Verdict } from "@/data/day2/case";
import type { OptId as D3OptId } from "@/data/day3/case";

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
  /** Questions 3 to 6 can be written as text (the default) or as a guided table; the other layout is kept, only the chosen one counts. */
  testing: string;
  dataMode: "text" | "table";
  dataRows: { data: string; have: string; how: string }[];
  roadmap: string;
  roadMode: "text" | "table";
  roadRows: { item: string; why: string }[];
  riskText: string;
  riskMode: "text" | "table";
  riskRows: { risk: string; side: string; action: string }[];
  uncertain: string;
  uncMode: "text" | "table";
  uncRows: { decide: string; unknown: string; reverse: string };
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
  dataMode: "text",
  dataRows: Array.from({ length: 3 }, () => ({ data: "", have: "", how: "" })),
  roadmap: "",
  roadMode: "text",
  roadRows: Array.from({ length: 3 }, () => ({ item: "", why: "" })),
  riskText: "",
  riskMode: "text",
  riskRows: Array.from({ length: 3 }, () => ({ risk: "", side: "", action: "" })),
  uncertain: "",
  uncMode: "text",
  uncRows: { decide: "", unknown: "", reverse: "" },
});

export const emptyD2 = (): D2State => ({ r1: emptyD2R1(), r2: emptyD2R2() });

/* ------------------------------------------------------------------ Day 3 */

type D3ProblemRow = { problem: string; side: string };
type D3AssessRow = { impact: string; effort: string; risk: string };
type D3CauseRow = { cause: string; improvement: string };

/**
 * Day 3 · Route 1 · Levels 1 and 2 (CLAUDE.md #57: the plan's own questions as free answers, every block Core).
 * Block 1.1 (UE2): five problems from the user's perspective (one text box by default, or a table), how the learning process feels, what you
 * would improve intuitively. Block 1.2 (UE3): assess three options (one box per option, or a table), a priority order, the option with the
 * greatest effect. Block 2.1 (UE5-6): the case study: four causes and four UX improvements (boxes or a table), the priority, the justification.
 * The UE4 coaching and the UE7 feedback round have no written answer and so no field.
 */
export type D3R1 = {
  problemMode: "text" | "table";
  problems: string;
  problemRows: D3ProblemRow[];
  feel: string;
  improve: string;
  assessMode: "text" | "table";
  assessText: Record<string, string>;
  assessRows: Record<string, D3AssessRow>;
  optOrder: string;
  optChoice: D3OptId | null;
  optWhy: string;
  causeMode: "text" | "table";
  causesText: string;
  improvementsText: string;
  causeRows: D3CauseRow[];
  priority: string;
  justify: string;
};

/** Day 3 · Route 2 · Level 3: the plan's transfer project, five items and the decision under uncertainty (CLAUDE.md #57). */
export type D3R2 = {
  strategy: string;
  measures: string;
  /** The guided-table layouts (DL-STANDARD section 15): three prioritised measures, two sides of the risk, the decision logic and the decision under uncertainty in three parts. */
  measureMode: "text" | "table";
  measureRows: { measure: string; why: string }[];
  definition: string;
  riskText: string;
  riskMode: "text" | "table";
  riskRows: { goes: string; action: string }[];
  logic: string;
  logicMode: "text" | "table";
  logicRows: { text: string }[];
  uncertain: string;
  uncMode: "text" | "table";
  uncRows: { text: string }[];
};

export type D3State = { r1: D3R1; r2: D3R2 };

const emptyD3Assess = (): D3AssessRow => ({ impact: "", effort: "", risk: "" });

export const emptyD3R1 = (): D3R1 => ({
  problemMode: "text",
  problems: "",
  problemRows: Array.from({ length: 5 }, () => ({ problem: "", side: "" })),
  feel: "",
  improve: "",
  assessMode: "text",
  assessText: { A: "", B: "", C: "" },
  assessRows: { A: emptyD3Assess(), B: emptyD3Assess(), C: emptyD3Assess() },
  optOrder: "",
  optChoice: null,
  optWhy: "",
  causeMode: "text",
  causesText: "",
  improvementsText: "",
  causeRows: Array.from({ length: 4 }, () => ({ cause: "", improvement: "" })),
  priority: "",
  justify: "",
});

export const emptyD3R2 = (): D3R2 => ({
  strategy: "",
  measures: "",
  measureMode: "text",
  measureRows: Array.from({ length: 3 }, () => ({ measure: "", why: "" })),
  definition: "",
  riskText: "",
  riskMode: "text",
  riskRows: Array.from({ length: 2 }, () => ({ goes: "", action: "" })),
  logic: "",
  logicMode: "text",
  logicRows: Array.from({ length: 3 }, () => ({ text: "" })),
  uncertain: "",
  uncMode: "text",
  uncRows: Array.from({ length: 3 }, () => ({ text: "" })),
});

export const emptyD3 = (): D3State => ({ r1: emptyD3R1(), r2: emptyD3R2() });
