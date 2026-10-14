import { fieldComplete } from "@/lib/dayGen/fields";
import { realFields } from "@/lib/dayGen/model";
import type { GenSpec } from "@/lib/dayGen/spec";
import { MIN_LINE, dossierProgressOf, len, measuresComplete } from "@/lib/dayStd/common";
import type { TaskBlockId } from "@/lib/dayStd/common";
import type { MaterialMeta } from "@/data/day1/materials";
import type { RouteNo } from "@/data/course";
import type { Persisted } from "@/store/useStore";

export type { TaskBlockId };
export { BLOCK_MINUTES, CORE1_MINUTES, CORE2_MINUTES, CORE_UNITS, MIN_FRAME, MIN_LINE, MIN_REASON, OPTIONAL_BLOCKS, TASK1_MINUTES, TASK2_MINUTES, isOptionalBlock } from "@/lib/dayStd/common";

const hasDecisions = (blk: { fields: { kind: string }[] }) => blk.fields.some((f) => f.kind === "decisions");

/** Which task blocks of a generic day are complete. Complete means filled in, never correct (CLAUDE.md #28). */
export function genTaskBlocks(p: Persisted, spec: GenSpec): Record<TaskBlockId, boolean> {
  const { r1, r2 } = p.dg[spec.day];
  const l = spec.limits;
  const sorted = spec.facts.every((f) => r1.sort[f.id] !== null && r1.sort[f.id] !== undefined);
  const decisionsDone = r2.picks.length === l.r2Pick && r2.order.length === l.r2Pick && len(r2.orderWhy) >= MIN_LINE;
  return {
    b11: sorted && realFields(spec.b11.fields).every((f) => fieldComplete(f, r1)),
    b12: spec.opts.options.every((o) => !!r1.optImpact[o.id] && !!r1.optEffort[o.id] && !!r1.optRisk[o.id]) && r1.optOrder.length === spec.opts.options.length && len(r1.optWhy) >= MIN_LINE,
    b13: Object.values(r1.reflect).some((v) => len(v) > 0),
    b21: r1.causes.length === l.pickCauses && len(r1.causeWhy) >= MIN_LINE,
    b22: measuresComplete(r1, l.pickMeasures) && realFields(spec.b22.after).every((f) => fieldComplete(f, r1)),
    b31: realFields(spec.b31.fields).every((f) => fieldComplete(f, r2)) && (!hasDecisions(spec.b31) || decisionsDone),
    b32: realFields(spec.b32.fields).every((f) => fieldComplete(f, r2)) && (!hasDecisions(spec.b32) || decisionsDone),
  };
}

export const genDossierProgress = (p: Persisted, spec: GenSpec, materials: MaterialMeta[], route: RouteNo) => dossierProgressOf(spec.day, materials, p, route, genTaskBlocks(p, spec));
