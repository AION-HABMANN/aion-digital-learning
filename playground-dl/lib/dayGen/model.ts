import type { BlockSpec, GenField, GenSpec } from "@/lib/dayGen/spec";
import type { GenExtra } from "@/store/dayTypesGen";

/** The effort band of a printed cost, by the day's own rule (taught in A5): up to the low limit Low, up to the mid limit Mid, above High. */
export const effortBandOf = (spec: GenSpec) => (cost: number): 1 | 2 | 3 => (cost <= spec.limits.effortLowMax ? 1 : cost <= spec.limits.effortMidMax ? 2 : 3);

export const measureCost = (spec: GenSpec, id: string) => spec.b22.measures.find((m) => m.id === id)?.cost ?? 0;
export const measureWeeks = (spec: GenSpec, id: string) => spec.b22.measures.find((m) => m.id === id)?.weeks ?? 0;
export const totalCost = (spec: GenSpec, ids: string[]) => ids.reduce((s, id) => s + measureCost(spec, id), 0);
export const longestWeeks = (spec: GenSpec, ids: string[]) => ids.reduce((m, id) => Math.max(m, measureWeeks(spec, id)), 0);
export const decisionsCost = (spec: GenSpec, ids: string[]) => ids.reduce((s, id) => s + (spec.decisions.items.find((d) => d.id === id)?.cost ?? 0), 0);

export type RealField = Exclude<GenField, { kind: "decisions" }>;

/** The field kinds that hold an answer (the decisions slot does not). */
export const realFields = (fields: GenField[]): RealField[] => fields.filter((f): f is RealField => f.kind !== "decisions");

/** The model answers of a list of fields, in the four maps of the store (store/dayTypesGen.ts). */
export function modelExtra(fields: GenField[]): GenExtra {
  const out: GenExtra = { text: {}, multi: {}, single: {}, assign: {} };
  for (const f of realFields(fields)) {
    if (f.kind === "text") out.text[f.id] = f.model;
    else if (f.kind === "multi") out.multi[f.id] = [...f.model];
    else if (f.kind === "single") out.single[f.id] = f.model;
    else if (f.kind === "assign") out.assign[f.id] = Object.fromEntries(f.items.map((i) => [i.id, i.model]));
    else for (const p of f.parts) out.text[p.id] = p.model;
  }
  return out;
}

export const r1Fields = (spec: GenSpec): GenField[] => [...spec.b11.fields, ...spec.b22.after];
export const r2Fields = (spec: GenSpec): GenField[] => [...spec.b31.fields, ...spec.b32.fields];
export const blockFields = (b: BlockSpec) => realFields(b.fields);
