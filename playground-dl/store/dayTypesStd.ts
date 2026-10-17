import { SPEC as SPEC4 } from "@/data/day4/free";
import { SPEC as SPEC5 } from "@/data/day5/free";
import { SPEC as SPEC6 } from "@/data/day6/free";
import { emptyFreeRoute, fieldsOf } from "@/lib/dayFree/model";
import type { FreeRoute, FreeState } from "@/store/dayTypesFree";
import { FACT_IDS as D7_FACT_IDS } from "@/data/day7/case";
import type { BarrierId, FactId as D7FactId, GroupId, MeasureId as D7MeasureId, MethodId, OptId as D7OptId, PrincipleId as D7PrincipleId } from "@/data/day7/case";
import type { DecisionId as D7DecisionId, EvalId, KpiId, PlaceId, RiskId as D7RiskId } from "@/data/day7/route2";
import type { Score } from "@/store/useStore";

/**
 * The persisted answer state of the days built to the shared "standard day" form (Day 4 onward): one slice per day (`d4`, `d5`, `d6`, `d7`), each with its two
 * routes. Route 1 is the UX Analysis File (Levels 1 and 2), Route 2 the UX Strategy Memo (Level 3). The parts that repeat from day to day (a sort with undo
 * and redo, three rated options, the coaching reflection, a chosen set of causes, the four measures of Block 2.2) are declared once here, so the shared
 * blocks in components/dayStd read every day the same way. A change to a shape bumps the persist version in store/useStore.ts and is covered by its deep
 * merge (CLAUDE.md #9).
 */

export type Count = { holds: number; placed: number };

export type SortPart<F extends string, B extends string> = {
  sort: Record<F, B | null>;
  sortHistory: Record<F, B | null>[];
  sortFuture: Record<F, B | null>[];
  sortChecks: number;
  sortResult: Count | null;
  sortClue: boolean;
  sortReasoning: boolean;
};
export const emptySortPart = <F extends string, B extends string>(ids: F[]): SortPart<F, B> => ({
  sort: Object.fromEntries(ids.map((id) => [id, null])) as Record<F, B | null>,
  sortHistory: [],
  sortFuture: [],
  sortChecks: 0,
  sortResult: null,
  sortClue: false,
  sortReasoning: false,
});

/** Block 1.2 (Optional): three options rated on the day's three criteria, put in order, with the one that matters most. */
export type OptionsPart<O extends string> = {
  optImpact: Record<string, Score>;
  optEffort: Record<string, Score>;
  optRisk: Record<string, Score>;
  optEffortFlags: string[];
  optEffortClue: boolean;
  optEffortResult: { holds: number; rated: number } | null;
  optOrder: O[];
  optWhy: string;
};
export const emptyOptionsPart = <O extends string>(): OptionsPart<O> => ({ optImpact: {}, optEffort: {}, optRisk: {}, optEffortFlags: [], optEffortClue: false, optEffortResult: null, optOrder: [], optWhy: "" });

/** Block 1.3 (Optional): the coaching reflection. Never scored, never missing. */
export type ReflectPart = { reflect: Record<"a" | "b" | "c", string> };
export const emptyReflectPart = (): ReflectPart => ({ reflect: { a: "", b: "", c: "" } });

/** Block 2.1 (Optional): a chosen set of causes or problems, with one printed fact for the first. */
export type CausePart<C extends string> = { causes: C[]; causeResult: { holds: number; chosen: number } | null; causeClue: boolean; causeWhy: string };
export const emptyCausePart = <C extends string>(): CausePart<C> => ({ causes: [], causeResult: null, causeClue: false, causeWhy: "" });

/** Block 2.2 (Core): four measures, rated, ordered, with what is missing. `pain` is used where a measure names the pain point it answers (Day 6). */
export type MeasuresPart<M extends string> = {
  chosen: M[];
  impact: Record<string, Score>;
  effort: Record<string, Score>;
  risk: Record<string, Score>;
  reasons: Record<string, string>;
  pain: Record<string, string>;
  effortFlags: string[];
  effortClue: boolean;
  effortResult: { holds: number; rated: number } | null;
  order: M[];
  orderWhy: string;
  missingInfo: string;
  checks: number;
};
export const emptyMeasuresPart = <M extends string>(): MeasuresPart<M> => ({
  chosen: [],
  impact: {},
  effort: {},
  risk: {},
  reasons: {},
  pain: {},
  effortFlags: [],
  effortClue: false,
  effortResult: null,
  order: [],
  orderWhy: "",
  missingInfo: "",
  checks: 0,
});

/** Route 2: a chosen set of N decisions in priority order, with why the first goes first. */
export type DecisionsPart<D extends string> = { picks: D[]; order: D[]; orderWhy: string };
export const emptyDecisionsPart = <D extends string>(): DecisionsPart<D> => ({ picks: [], order: [], orderWhy: "" });

/* ------------------------------------------------------------------ Days 4 to 6: free-form days (DL-STANDARD v1.1) */

/** Days 4 to 6 are built to the free-form standard: their slice is a `FreeState` (store/dayTypesFree.ts) shaped by the day's spec (data/dayN/free.ts). */
export type D4State = FreeState;
export type D5State = FreeState;
export type D6State = FreeState;
export type D4R1 = FreeRoute;
export type D4R2 = FreeRoute;
export type D5R1 = FreeRoute;
export type D5R2 = FreeRoute;
export type D6R1 = FreeRoute;
export type D6R2 = FreeRoute;

export const emptyD4R1 = (): FreeRoute => emptyFreeRoute(fieldsOf(SPEC4, 1));
export const emptyD4R2 = (): FreeRoute => emptyFreeRoute(fieldsOf(SPEC4, 2));
export const emptyD4 = (): D4State => ({ r1: emptyD4R1(), r2: emptyD4R2() });
export const emptyD5R1 = (): FreeRoute => emptyFreeRoute(fieldsOf(SPEC5, 1));
export const emptyD5R2 = (): FreeRoute => emptyFreeRoute(fieldsOf(SPEC5, 2));
export const emptyD5 = (): D5State => ({ r1: emptyD5R1(), r2: emptyD5R2() });
export const emptyD6R1 = (): FreeRoute => emptyFreeRoute(fieldsOf(SPEC6, 1));
export const emptyD6R2 = (): FreeRoute => emptyFreeRoute(fieldsOf(SPEC6, 2));
export const emptyD6 = (): D6State => ({ r1: emptyD6R1(), r2: emptyD6R2() });

/* ------------------------------------------------------------------ Day 7 */

/**
 * Day 7 · Route 1 · Levels 1 and 2. Core: Block 1.1 (eight facts into three principles, the groups that struggle, three improvements) and Block 2.2 (four of nine
 * measures, rated and ordered, and three evaluation methods). Optional: 1.2 (three options), 1.3 (reflection), 2.1 (four central barriers).
 */
export type D7R1 = SortPart<D7FactId, D7PrincipleId> &
  OptionsPart<D7OptId> &
  ReflectPart &
  CausePart<BarrierId> &
  MeasuresPart<D7MeasureId> & {
    groups: GroupId[];
    groupsWhy: string;
    improve: string;
    /** Block 2.2, step 5: exactly three evaluation methods, with what each tells the learner. */
    methods: MethodId[];
    methodsWhy: string;
  };

/** Day 7 · Route 2 · Level 3. */
export type D7R2 = DecisionsPart<D7DecisionId> & {
  strategy: string;
  places: PlaceId[];
  kpis: KpiId[];
  evals: EvalId[];
  readers: string;
  risk: D7RiskId | null;
  riskPlan: string;
  decide: string;
  dontKnow: string;
  reverse: string;
  giveUp: string;
};

export type D7State = { r1: D7R1; r2: D7R2 };

export const emptyD7R1 = (): D7R1 => ({
  ...emptySortPart<D7FactId, D7PrincipleId>(D7_FACT_IDS),
  ...emptyOptionsPart<D7OptId>(),
  ...emptyReflectPart(),
  ...emptyCausePart<BarrierId>(),
  ...emptyMeasuresPart<D7MeasureId>(),
  groups: [],
  groupsWhy: "",
  improve: "",
  methods: [],
  methodsWhy: "",
});

export const emptyD7R2 = (): D7R2 => ({
  ...emptyDecisionsPart<D7DecisionId>(),
  strategy: "",
  places: [],
  kpis: [],
  evals: [],
  readers: "",
  risk: null,
  riskPlan: "",
  decide: "",
  dontKnow: "",
  reverse: "",
  giveUp: "",
});

export const emptyD7 = (): D7State => ({ r1: emptyD7R1(), r2: emptyD7R2() });

