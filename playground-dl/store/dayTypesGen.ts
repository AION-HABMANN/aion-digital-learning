import { emptyCausePart, emptyDecisionsPart, emptyMeasuresPart, emptyOptionsPart, emptyReflectPart, emptySortPart } from "@/store/dayTypesStd";
import type { CausePart, DecisionsPart, MeasuresPart, OptionsPart, ReflectPart, SortPart } from "@/store/dayTypesStd";

/**
 * The persisted answer state of the "generic days" (Day 8 onward, lib/dayGen/spec.ts): one slice per day under `dg[day]`, each with its two routes. The parts that
 * every day shares are the same as in the standard days (a sort with undo and redo, three rated options, the reflection, a chosen set of causes, the measures
 * of Block 2.2, the decisions of Route 2). What a day adds beyond them is stored by field id in four maps: `text` (free text and the parts of a sentence),
 * `multi` (a chosen set), `single` (one choice) and `assign` (a card sort). A field a later version adds simply reads as empty.
 */
export type GenExtra = {
  text: Record<string, string>;
  multi: Record<string, string[]>;
  single: Record<string, string | null>;
  assign: Record<string, Record<string, string | null>>;
};
export const emptyGenExtra = (): GenExtra => ({ text: {}, multi: {}, single: {}, assign: {} });

export type GenR1 = SortPart<string, string> & OptionsPart<string> & ReflectPart & CausePart<string> & MeasuresPart<string> & GenExtra;
export type GenR2 = DecisionsPart<string> & GenExtra;
export type GenState = { r1: GenR1; r2: GenR2 };

export const emptyGenR1 = (factIds: string[]): GenR1 => ({
  ...emptySortPart<string, string>(factIds),
  ...emptyOptionsPart<string>(),
  ...emptyReflectPart(),
  ...emptyCausePart<string>(),
  ...emptyMeasuresPart<string>(),
  ...emptyGenExtra(),
});
export const emptyGenR2 = (): GenR2 => ({ ...emptyDecisionsPart<string>(), ...emptyGenExtra() });
export const emptyGen = (factIds: string[]): GenState => ({ r1: emptyGenR1(factIds), r2: emptyGenR2() });
