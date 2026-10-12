import { NOTE_IDS, PHASES_1, PHASES_L, PHASES_T, PICK_MEASURES } from "@/data/day6/case";
import { MATERIALS } from "@/data/day6/materials";
import { PHASES_R, R2_PICK, SEG_MAX, SEG_MIN } from "@/data/day6/route2";
import { MIN_FRAME, MIN_LINE, MIN_REASON, dossierProgressOf, len, measuresComplete } from "@/lib/dayStd/common";
import type { TaskBlockId } from "@/lib/dayStd/common";
import type { RouteNo } from "@/data/course";
import type { JCell } from "@/store/dayTypesStd";
import type { Persisted } from "@/store/useStore";

export type { TaskBlockId };
export { BLOCK_MINUTES, CORE1_MINUTES, CORE2_MINUTES, CORE_UNITS, MIN_FRAME, MIN_LINE, MIN_REASON, MIN_SENTENCE, OPTIONAL_BLOCKS, TASK1_MINUTES, TASK2_MINUTES, isOptionalBlock } from "@/lib/dayStd/common";

/** A short row of a persona or a journey cell: a few words. */
export const MIN_ROW = 10;
export const MIN_CELL = 6;

export type JField = keyof Pick<JCell, "does" | "thinks" | "pain" | "acts">;
/** A journey cell is filled in when its text fields have a few words and the emotion is rated. */
export const cellOk = (c: JCell | undefined, fields: JField[]) => !!c && c.emotion > 0 && fields.every((f) => len(c[f]) >= MIN_CELL);

/**
 * Day 6 · which task blocks are complete. Complete means filled in, never correct. Route 1 Core: Block 1.1 (Level 1: describe a persona, plan Arbeitsauftrag 1)
 * and Block 2.2 (Level 2: the plan's Fallstudie, four measures with the pain point each answers). Route 2 Core: Block 3.1 and Block 3.2, the Transferprojekt.
 */
export function taskBlocks(p: Persisted): Record<TaskBlockId, boolean> {
  const { r1, r2 } = p.d6;
  const pe = r1.persona;
  const te = r1.teacher;
  return {
    b11:
      NOTE_IDS.every((id) => r1.sort[id] !== null) &&
      len(pe.nameRole) >= MIN_ROW &&
      len(pe.goals) >= MIN_REASON &&
      len(pe.problems) >= MIN_REASON &&
      len(pe.situation) >= MIN_REASON &&
      len(pe.expectations) >= MIN_REASON &&
      len(r1.frustrations) >= MIN_LINE,
    b12: PHASES_1.every((k) => cellOk(r1.j[k], ["does", "thinks", "pain"])) && len(r1.jProblems) >= MIN_FRAME && !!r1.jCritical && len(r1.jCriticalWhy) >= MIN_LINE,
    b13: Object.values(r1.reflect).some((v) => len(v) > 0),
    b21:
      len(te.nameRole) >= MIN_ROW &&
      len(te.goals) >= MIN_REASON &&
      len(te.problems) >= MIN_REASON &&
      len(te.situation) >= MIN_REASON &&
      PHASES_L.every((k) => cellOk(r1.jl[k], ["does", "pain"])) &&
      PHASES_T.every((k) => cellOk(r1.jt[k], ["does", "pain"])) &&
      len(r1.shared) >= MIN_LINE,
    b22: measuresComplete(r1, PICK_MEASURES, true),
    b31:
      r2.segs.length >= SEG_MIN &&
      r2.segs.length <= SEG_MAX &&
      r2.segs.every((id) => len(r2.segPersona[id]) >= MIN_LINE) &&
      !!r2.target &&
      len(r2.targetWhy) >= MIN_LINE &&
      len(r2.problems) >= MIN_FRAME,
    b32:
      !!r2.jSeg &&
      PHASES_R.every((k) => cellOk(r2.jr[k], ["does", "pain", "acts"])) &&
      r2.picks.length === R2_PICK &&
      r2.order.length === R2_PICK &&
      len(r2.orderWhy) >= MIN_LINE &&
      len(r2.decide) >= MIN_ROW &&
      len(r2.dontKnow) >= MIN_ROW &&
      len(r2.reverse) >= MIN_LINE &&
      len(r2.giveUp) >= MIN_LINE,
  };
}

/** Dossier progress for one route: its Core cards marked read + its Core units completed (Optional ones sit outside the ring, #35). */
export const dossierProgress = (p: Persisted, route: RouteNo) => dossierProgressOf(6, MATERIALS, p, route, taskBlocks(p));
