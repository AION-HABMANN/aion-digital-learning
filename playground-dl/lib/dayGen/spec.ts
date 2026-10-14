import type { MaterialId } from "@/data/day1/materials";
import type { Tx } from "@/lib/lang";

/** The same shape as a resolved spec, but any string may be a `t(en, de)`: a day writes its data like this and wraps it in `bi(...)`. */
export type Raw<T> = T extends string ? string | Tx : T extends readonly (infer U)[] ? Raw<U>[] : T extends object ? { [K in keyof T]: Raw<T[K]> } : T;

/**
 * The shape of a "generic day" (Day 8 onward). A day is described once, as data, in `data/dayN/gen.ts`; the shared engine (components/dayGen, lib/dayGen)
 * draws both routes, derives the missing lists, the progress ring, the export documents, the mentor fill, the answer keys and the worked answers from it.
 * Nothing here is a string with two languages: a day writes its data with `t(en, de)` and wraps it in `bi(...)`, so every value below is the text of the active
 * language at read time (CLAUDE.md #32). The pictures, the study cards and the day's own materials stay in `components/dayN` and `data/dayN`.
 */

/** A worked answer without its model text: the engine adds `answer` from the same model the mentor fill enters (CLAUDE.md #23). */
export type GuideText = { example?: string; why?: string; lookFor?: string[]; pitfalls?: string[] };
export type Guide = GuideText & { answer: string };

/** A clue kit entry: the material card it points to and the steps of the answer (CLAUDE.md #42, #44). */
export type Clue = { ref: MaterialId; refLabel: string; refValue: string; steps: string[] };

type Base = {
  id: string;
  label: string;
  help: string;
  /** What is missing, as a sentence without the block prefix and without the length: "write your strategy, which groups you reach and what you change first". */
  missing: string;
};

export type Opt = { id: string; label: string; sub?: string; expected: boolean; why: string };

export type TextField = Base & { kind: "text"; min: number; rows?: number; guide: GuideText & { example: string }; model: string; clue?: Clue };
export type MultiField = Base & {
  kind: "multi";
  options: Opt[];
  /** At least this many (a free count) or exactly this many. */
  min?: number;
  exact?: number;
  cols?: 1 | 2;
  model: string[];
  optionsLabel: string;
  /** The answer-key block of the mentor tools. */
  keyTitle: string;
  teaching: string;
};
export type SingleField = Base & { kind: "single"; options: Opt[]; model: string; optionsLabel: string; keyTitle: string; teaching: string };
/** A card sort: every item goes to one of a few sections (Day 8 block 3.1: twelve items, five sections). */
export type AssignField = Base & {
  kind: "assign";
  bins: { id: string; label: string }[];
  items: { id: string; no: string; label: string; model: string; why: string }[];
  /** Every section must be used at least once. */
  everyBin: boolean;
  keyTitle: string;
  teaching: string;
};
/** A sentence with fixed parts (“I decide …”, “I do not know …”, “I reverse if …”), each part its own text box, stored in the text map. */
export type FrameField = Omit<Base, "missing"> & {
  kind: "frame";
  frameLabel: string;
  parts: { id: string; label: string; help: string; min: number; missing: string; model: string }[];
  guide: GuideText & { example: string };
  /** The frame, in words, for the collapsed “Show the frame”. */
  frameSteps: string[];
  frameNote?: string;
};
/** Where the decisions picker of Route 2 sits inside a block. */
export type DecisionsSlot = { kind: "decisions" };
export type GenField = TextField | MultiField | SingleField | AssignField | FrameField | DecisionsSlot;

export type BlockSpec = {
  title: string;
  findIt: string;
  refs: MaterialId[];
  /** One short sentence under the title, in the active language (the plan item it answers). */
  plan?: string;
  fields: GenField[];
};

export type Brief = {
  heading: string;
  readTime: string;
  paragraph: string;
  have: { title: string; items: string[] };
  limits: { title: string; items: string[] };
  /** The Case assumption callout. */
  assumption: string;
  /** Route 2 only: a soft pointer to Route 1 is added by the engine. */
  runTitle: string;
  run: string[];
  runNote?: string;
};

export type Category = { id: string; label: string; hint: string; test: string };
export type Fact = { id: string; no: number; where: string; text: string; short: string; key: string; clue: string; why: string; area: string };
export type OptionDef = { id: string; name: string; cost: number; weeks: number; keyWhy: string };
export type MeasureDef = { id: string; no: string; name: string; what: string; notice: string; cost: number; weeks: number; area: string; keyWhy: string };
export type DecisionDef = { id: string; no: string; name: string; what: string; cost: number; weeks: number; area: string; keyWhy: string };
export type CauseDef = { id: string; text: string; expected: boolean; why: string };

export type Score3 = 1 | 2 | 3;

export type GenSpec = {
  day: number;
  /** The platform of the case, “StructLearn”. */
  caseName: string;
  /** The learner's role in Route 2, “Chief UX Architect”. */
  role: string;
  limits: { budget: number; weeks: number; r2Budget: number; r2Months: number; pickMeasures: number; pickCauses: number; r2Pick: number; effortLowMax: number; effortMidMax: number };

  /* ---- the day's chrome */
  heading: string;
  /** The topic cards of the home page: what today is about, the case, the story, what is in it for you (CLAUDE.md #27). */
  intro: {
    about: string;
    caseLine: string;
    story: { route: 1 | 2; verb: string; question: string; output: string }[];
    wiifm: { route: 1 | 2; skill: string; payoff: string }[];
  };
  route1: { title: string; blurb: string; kicker: string; h1: string; order: string; materiSub: string; taskSub: string };
  route2: { title: string; blurb: string; kicker: string; h1: string; order: string; materiSub: string; taskSub: string };

  /* ---- Route 1 */
  brief1: Brief;
  partHeadings: { p1: { title: string; level: string }; p2: { title: string; level: string } };
  /** Block 1.1: the sort of the facts into the categories, then more fields. */
  cats: Category[];
  facts: Fact[];
  sortIntro: string;
  sortNoun: string;
  sortKeyTitle: string;
  sortTeaching: string;
  testsLabel: string;
  b11: BlockSpec;

  /** Block 1.2 (Optional). */
  opts: {
    title: string;
    findIt: string;
    intro: string;
    criteria: [{ label: string; help: string }, { label: string; help: string }, { label: string; help: string }];
    orderHelp: string;
    whyLabel: string;
    whyHelp: string;
    options: OptionDef[];
    model: { impact: Record<string, Score3>; risk: Record<string, Score3>; order: string[]; why: string };
    guide: GuideText;
    keyTitle: string;
    keyTeaching: string;
    reason: string;
    refs: MaterialId[];
  };
  /** Block 1.3 (Optional). */
  reflect: { title: string; point: string; questions: { k: "a" | "b" | "c"; q: string }[]; model: { a: string; b: string; c: string }; guideWhy: string; reason: string };
  /** Block 2.1 (Optional). */
  causes: {
    title: string;
    findIt: string;
    pickLabel: string;
    pickHelp: string;
    listLabel: string;
    checkLabel: string;
    clue: string;
    whyLabel: string;
    whyHelp: string;
    items: CauseDef[];
    model: string[];
    whyModel: string;
    guide: GuideText;
    keyTitle: string;
    teaching: string;
    reason: string;
    refs: MaterialId[];
  };

  /** Block 2.2 (Core). */
  b22: {
    title: string;
    findIt: string;
    listLabel: string;
    evidenceNote: string;
    reasonHelp: string;
    orderWhyHelp: string;
    riskHelp: string;
    impact: { label: string; help: string };
    effortRuleText: string;
    refs: MaterialId[];
    keyTitle: string;
    keyTeaching: string;
    areas: Record<string, string>;
    measures: MeasureDef[];
    model: { chosen: string[]; impact: Record<string, Score3>; risk: Record<string, Score3>; reasons: Record<string, string>; order: string[]; orderWhy: string; missingInfo: string };
    guides: { reason: GuideText; order: GuideText; missing: GuideText };
    /** Fields placed after the priority order, before “What information are you missing?”. */
    after: GenField[];
    afterNote?: string;
  };

  /* ---- Route 2 */
  brief2: Brief;
  b31: BlockSpec;
  b32: BlockSpec;
  decisions: {
    items: DecisionDef[];
    areas: Record<string, string>;
    pickLabel: string;
    listLabel: string;
    orderLabel: string;
    whyLabel: string;
    whyHelp: string;
    model: { picks: string[]; order: string[]; orderWhy: string };
    guide: GuideText;
    keyTitle: string;
    keyTeaching: string;
  };
  /** The memo header and the one-paragraph case of the export. */
  memo: { to: string; subject: string };
  caseExport: string;
  /** The document sections of the memo, in order: the title of each block of fields. */
  memoSections: { title: string; fieldIds: string[] }[];
  mentorNote: string;
};

/** Every field of a block, with the decisions slot left out. */
export const fieldsOf = (b: BlockSpec) => b.fields.filter((f): f is Exclude<GenField, DecisionsSlot> => f.kind !== "decisions");
