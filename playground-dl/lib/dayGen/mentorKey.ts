import { effortBandOf, modelExtra, r1Fields, r2Fields } from "@/lib/dayGen/model";
import type { GenSpec } from "@/lib/dayGen/spec";
import type { GenR1, GenR2 } from "@/store/dayTypesGen";
import type { Score } from "@/store/useStore";

/**
 * The model answers of a generic day (CLAUDE.md #7), read from the day's spec. "Fill all model answers" in the mentor bar enters every one of them, so after one fill
 * every missing list is empty and both documents export at once. The texts follow the site's language, because the fill enters them in that language.
 */
export function genKeyR1(spec: GenSpec): Partial<GenR1> {
  const band = effortBandOf(spec);
  const costOf = (id: string) => spec.b22.measures.find((m) => m.id === id)?.cost ?? 0;
  const optCost = (id: string) => spec.opts.options.find((o) => o.id === id)?.cost ?? 0;
  const m = spec.b22.model;
  const o = spec.opts.model;
  return {
    sort: Object.fromEntries(spec.facts.map((f) => [f.id, f.area])),
    optImpact: { ...o.impact } as Record<string, Score>,
    optEffort: Object.fromEntries(spec.opts.options.map((x) => [x.id, band(optCost(x.id))])) as Record<string, Score>,
    optRisk: { ...o.risk } as Record<string, Score>,
    optOrder: [...o.order],
    optWhy: o.why,
    reflect: { ...spec.reflect.model },
    causes: [...spec.causes.model],
    causeWhy: spec.causes.whyModel,
    chosen: [...m.chosen],
    impact: { ...m.impact } as Record<string, Score>,
    effort: Object.fromEntries(m.chosen.map((id) => [id, band(costOf(id))])) as Record<string, Score>,
    risk: { ...m.risk } as Record<string, Score>,
    reasons: { ...m.reasons },
    effortFlags: [],
    order: [...m.order],
    orderWhy: m.orderWhy,
    missingInfo: m.missingInfo,
    ...modelExtra(r1Fields(spec)),
  };
}

export function genKeyR2(spec: GenSpec): Partial<GenR2> {
  return { picks: [...spec.decisions.model.picks], order: [...spec.decisions.model.order], orderWhy: spec.decisions.model.orderWhy, ...modelExtra(r2Fields(spec)) };
}
