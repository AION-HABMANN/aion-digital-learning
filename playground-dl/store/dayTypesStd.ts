import { FACT_IDS as D4_FACT_IDS } from "@/data/day4/case";
import type { CauseId as D4CauseId, FactId as D4FactId, MeasureId as D4MeasureId, OptId as D4OptId, PlatformId, PrincipleId, ReflectKey as D4ReflectKey } from "@/data/day4/case";
import type { DecisionId as D4DecisionId, EvidenceId as D4EvidenceId, MetricId as D4MetricId, OwnerId as D4OwnerId, RiskId as D4RiskId, StrategyId } from "@/data/day4/route2";
import { FACT_IDS as D5_FACT_IDS } from "@/data/day5/case";
import type { FactId as D5FactId, MeasureId as D5MeasureId, MistakeId, OptId as D5OptId, ProblemId } from "@/data/day5/case";
import type { DecisionId as D5DecisionId, EvidenceId as D5EvidenceId, OwnerId as D5OwnerId, RiskId as D5RiskId } from "@/data/day5/route2";
import { NOTE_IDS as D6_NOTE_IDS } from "@/data/day6/case";
import type { MeasureId as D6MeasureId, NoteId as D6NoteId, PersonaFieldId, PhaseId1, PhaseIdL, PhaseIdT } from "@/data/day6/case";
import type { DecisionId as D6DecisionId, PhaseIdR, SegmentId } from "@/data/day6/route2";
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

/* ------------------------------------------------------------------ Day 4 */

/** Day 4 · Route 1 · Levels 1 and 2. Core: Block 1.1 (eight facts, a preferred platform, three principles) and Block 2.2 (four of nine measures). */
export type D4R1 = SortPart<D4FactId, PrincipleId> &
  OptionsPart<D4OptId> &
  ReflectPart &
  CausePart<D4CauseId> &
  MeasuresPart<D4MeasureId> & {
    prefer: PlatformId | null;
    preferWhy: string;
    principles: string[];
  };

/** Day 4 · Route 2 · Level 3. */
export type D4R2 = DecisionsPart<D4DecisionId> & {
  strategy: StrategyId | null;
  strategyWhy: string;
  metrics: D4MetricId[];
  success: string;
  risk: D4RiskId | null;
  riskPlan: string;
  uncertain: string;
  owner: D4OwnerId | null;
  evidence: D4EvidenceId[];
  giveUp: string;
};

export type D4State = { r1: D4R1; r2: D4R2 };

export const emptyD4R1 = (): D4R1 => ({
  ...emptySortPart<D4FactId, PrincipleId>(D4_FACT_IDS),
  ...emptyOptionsPart<D4OptId>(),
  ...emptyReflectPart(),
  ...emptyCausePart<D4CauseId>(),
  ...emptyMeasuresPart<D4MeasureId>(),
  prefer: null,
  preferWhy: "",
  principles: ["", "", ""],
});

export const emptyD4R2 = (): D4R2 => ({
  ...emptyDecisionsPart<D4DecisionId>(),
  strategy: null,
  strategyWhy: "",
  metrics: [],
  success: "",
  risk: null,
  riskPlan: "",
  uncertain: "",
  owner: null,
  evidence: [],
  giveUp: "",
});

export const emptyD4 = (): D4State => ({ r1: emptyD4R1(), r2: emptyD4R2() });

/* ------------------------------------------------------------------ Day 5 */

/** Day 5 · Route 1 · Levels 1 and 2. Core: Block 1.1 (the learner's goal, eight facts into three mistakes, the most frustrating fact, three expectations) and Block 2.2 (four of nine measures). */
export type D5R1 = SortPart<D5FactId, MistakeId> &
  OptionsPart<D5OptId> &
  ReflectPart &
  CausePart<ProblemId> &
  MeasuresPart<D5MeasureId> & {
    goal: string;
    worst: D5FactId | null;
    worstWhy: string;
    expectations: string;
    /** Block 2.1 (Optional): the design error behind each chosen problem. */
    errors: Record<string, string>;
  };

export type ConflictRow = { user: string; business: string; lost: string };

/** Day 5 · Route 2 · Level 3. */
export type D5R2 = DecisionsPart<D5DecisionId> & {
  needs: string;
  conflict: Record<string, ConflictRow>;
  risk: D5RiskId | null;
  riskPlan: string;
  owner: D5OwnerId | null;
  evidence: D5EvidenceId[];
  rule: string;
  uncertain: string;
  giveUp: string;
};

export type D5State = { r1: D5R1; r2: D5R2 };

export const emptyD5R1 = (): D5R1 => ({
  ...emptySortPart<D5FactId, MistakeId>(D5_FACT_IDS),
  ...emptyOptionsPart<D5OptId>(),
  ...emptyReflectPart(),
  ...emptyCausePart<ProblemId>(),
  ...emptyMeasuresPart<D5MeasureId>(),
  goal: "",
  worst: null,
  worstWhy: "",
  expectations: "",
  errors: {},
});

export const emptyD5R2 = (): D5R2 => ({
  ...emptyDecisionsPart<D5DecisionId>(),
  needs: "",
  conflict: {},
  risk: null,
  riskPlan: "",
  owner: null,
  evidence: [],
  rule: "",
  uncertain: "",
  giveUp: "",
});

export const emptyD5 = (): D5State => ({ r1: emptyD5R1(), r2: emptyD5R2() });

/* ------------------------------------------------------------------ Day 6 */

/** An emotion from 1 (very frustrated) to 5 (very motivated); 0 means not rated yet. */
export type Emotion = 0 | 1 | 2 | 3 | 4 | 5;
/** One cell column of a journey grid: what the person does and thinks, how they feel, where it breaks, and where a strategy acts. Unused fields stay empty. */
export type JCell = { does: string; thinks: string; emotion: Emotion; pain: string; acts: string };
export const emptyJCell = (): JCell => ({ does: "", thinks: "", emotion: 0, pain: "", acts: "" });
const emptyJ = <K extends string>(keys: K[]) => Object.fromEntries(keys.map((k) => [k, emptyJCell()])) as Record<K, JCell>;

/** The learner persona of Block 1.1: five fields. */
export type Persona5 = { nameRole: string; goals: string; problems: string; situation: string; expectations: string };
/** The teacher persona of Block 2.1: four fields. */
export type Persona4 = { nameRole: string; goals: string; problems: string; situation: string };

/**
 * Day 6 · Route 1 · Levels 1 and 2. Core: Block 1.1 (eight research notes into three persona fields, the learner persona and its frustrations) and Block 2.2
 * (four of nine measures, each with the pain point it answers). Optional: 1.2 (a journey that ends in drop-out), 1.3 (reflection), 2.1 (teacher persona and two journeys).
 */
export type D6R1 = SortPart<D6NoteId, PersonaFieldId> &
  ReflectPart &
  MeasuresPart<D6MeasureId> & {
    persona: Persona5;
    frustrations: string;
    /** Block 1.2 (Optional). */
    j: Record<PhaseId1, JCell>;
    jProblems: string;
    jCritical: PhaseId1 | null;
    jCriticalWhy: string;
    /** Block 2.1 (Optional). */
    teacher: Persona4;
    jl: Record<PhaseIdL, JCell>;
    jt: Record<PhaseIdT, JCell>;
    shared: string;
  };

/** Day 6 · Route 2 · Level 3. */
export type D6R2 = DecisionsPart<D6DecisionId> & {
  segs: SegmentId[];
  segPersona: Record<string, string>;
  target: SegmentId | null;
  targetWhy: string;
  problems: string;
  jSeg: SegmentId | null;
  jr: Record<PhaseIdR, JCell>;
  decide: string;
  dontKnow: string;
  reverse: string;
  giveUp: string;
};

export type D6State = { r1: D6R1; r2: D6R2 };

export const emptyD6R1 = (): D6R1 => ({
  ...emptySortPart<D6NoteId, PersonaFieldId>(D6_NOTE_IDS),
  ...emptyReflectPart(),
  ...emptyMeasuresPart<D6MeasureId>(),
  persona: { nameRole: "", goals: "", problems: "", situation: "", expectations: "" },
  frustrations: "",
  j: emptyJ<PhaseId1>(["entry", "usage", "drop"]),
  jProblems: "",
  jCritical: null,
  jCriticalWhy: "",
  teacher: { nameRole: "", goals: "", problems: "", situation: "" },
  jl: emptyJ<PhaseIdL>(["entry", "learning", "progress"]),
  jt: emptyJ<PhaseIdT>(["setup", "run", "review"]),
  shared: "",
});

export const emptyD6R2 = (): D6R2 => ({
  ...emptyDecisionsPart<D6DecisionId>(),
  segs: [],
  segPersona: {},
  target: null,
  targetWhy: "",
  problems: "",
  jSeg: null,
  jr: emptyJ<PhaseIdR>(["entry", "work", "progress"]),
  decide: "",
  dontKnow: "",
  reverse: "",
  giveUp: "",
});

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
export type { D4ReflectKey };
