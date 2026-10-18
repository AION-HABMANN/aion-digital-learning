import { FREE_SPECS } from "@/data/free/registry";
import { emptyFreeRoute, fieldsOf } from "@/lib/dayFree/model";
import type { FreeRoute, FreeState } from "@/store/dayTypesFree";
import type { Score } from "@/store/useStore";

/**
 * The persisted answer state of the days built to the shared "standard day" form (Day 4 onward): one slice per day (`d4` onward), each with its two
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

/* ------------------------------------------------------------------ the free-form days (DL-STANDARD v1.1) */

/**
 * Days 4 onward that are built to the free-form standard (data/free/registry.ts): their slice is a `FreeState` (store/dayTypesFree.ts) shaped by the day's spec
 * (data/dayN/free.ts). One function makes the empty route or slice of any of them.
 */
export const emptyFreeDayRoute = (day: number, route: 1 | 2): FreeRoute => emptyFreeRoute(FREE_SPECS[day] ? fieldsOf(FREE_SPECS[day], route) : []);
export const emptyFreeDay = (day: number): FreeState => ({ r1: emptyFreeDayRoute(day, 1), r2: emptyFreeDayRoute(day, 2) });
