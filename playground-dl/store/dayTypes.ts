import { FACT_IDS as D2_FACT_IDS } from "@/data/day2/case";
import type { ApproachId, FactId as D2FactId, OptId as D2OptId, PlatformId, PracticeId, ReflectKey as D2ReflectKey, RiskTickId, TestId, Verdict, WeakId } from "@/data/day2/case";
import type { DataId, EvidenceId as D2EvidenceId, InvId, OwnerId as D2OwnerId, RiskId as D2RiskId } from "@/data/day2/route2";
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

/** Day 2 · Route 1 · Levels 1 and 2. Core: Block 1.1 (two platforms, three practices) and Block 2.2 (approach, three tests, the adaptive decision). */
export type D2R1 = {
  sort: Record<D2FactId, PracticeId | null>;
  sortHistory: Record<D2FactId, PracticeId | null>[];
  sortFuture: Record<D2FactId, PracticeId | null>[];
  sortChecks: number;
  sortResult: Count | null;
  sortClue: boolean;
  sortReasoning: boolean;
  prefer: PlatformId | null;
  preferWhy: string;
  principles: string[];
  /** Block 1.2 (Optional): three options rated on benefit, effort and risk, a decision, the risks without testing. */
  optBenefit: Record<string, Score>;
  optEffort: Record<string, Score>;
  optRisk: Record<string, Score>;
  optEffortFlags: string[];
  optEffortClue: boolean;
  optEffortResult: { holds: number; rated: number } | null;
  optChoice: D2OptId | null;
  optWhy: string;
  optRisks: RiskTickId[];
  optRiskOther: string;
  /** Block 1.3 (Optional): the coaching reflection. Never scored, never missing. */
  reflect: Record<D2ReflectKey, string>;
  /** Block 2.1 (Optional): three main weaknesses. */
  weak: WeakId[];
  weakResult: { holds: number; chosen: number } | null;
  weakClue: boolean;
  weakWhy: string;
  /** Block 2.2 (Core). */
  approach: ApproachId | null;
  approachWhy: string;
  tests: TestId[];
  testQ: Record<string, string>;
  adaptive: Verdict | null;
  adaptiveWhy: string;
  missingInfo: string;
  checks: number;
};

/** Day 2 · Route 2 · Level 3. */
export type D2R2 = {
  adaptive: Verdict | null;
  adaptiveWhy: string;
  prototyping: string;
  data: DataId[];
  picks: InvId[];
  order: InvId[];
  orderWhy: string;
  risk: D2RiskId | null;
  riskPlan: string;
  uncertain: string;
  owner: D2OwnerId | null;
  evidence: D2EvidenceId[];
  giveUp: string;
};

export type D2State = { r1: D2R1; r2: D2R2 };

export const emptyD2R1 = (): D2R1 => ({
  sort: Object.fromEntries(D2_FACT_IDS.map((id) => [id, null])) as D2R1["sort"],
  sortHistory: [],
  sortFuture: [],
  sortChecks: 0,
  sortResult: null,
  sortClue: false,
  sortReasoning: false,
  prefer: null,
  preferWhy: "",
  principles: ["", "", ""],
  optBenefit: {},
  optEffort: {},
  optRisk: {},
  optEffortFlags: [],
  optEffortClue: false,
  optEffortResult: null,
  optChoice: null,
  optWhy: "",
  optRisks: [],
  optRiskOther: "",
  reflect: { a: "", b: "", c: "" },
  weak: [],
  weakResult: null,
  weakClue: false,
  weakWhy: "",
  approach: null,
  approachWhy: "",
  tests: [],
  testQ: {},
  adaptive: null,
  adaptiveWhy: "",
  missingInfo: "",
  checks: 0,
});

export const emptyD2R2 = (): D2R2 => ({
  adaptive: null,
  adaptiveWhy: "",
  prototyping: "",
  data: [],
  picks: [],
  order: [],
  orderWhy: "",
  risk: null,
  riskPlan: "",
  uncertain: "",
  owner: null,
  evidence: [],
  giveUp: "",
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
