import type { AssessField, BlockSpec, FreeField, FreeSpec, ListsField, PickField, TextField } from "@/lib/dayFree/spec";
import type { FreeRoute, FreeState } from "@/store/dayTypesFree";
import type { Persisted } from "@/store/useStore";

/** The length minimums of a free-form day (the same as Day 2 and Day 3). */
export const MIN_LINE = 30;
export const MIN_FRAME = 60;
/** A table cell counts from this many characters. */
export const MIN_CELL = 3;
/** A line of a list counts from this many characters (a leading number or bullet is ignored). */
export const MIN_LIST_LINE = 8;

export const len = (t: string | undefined) => (t ?? "").trim().length;
export const listLines = (t: string) => t.split(/\r?\n/).map((x) => x.replace(/^\s*(?:\d+[.):]|[-*•])\s*/, "").trim()).filter((x) => x.length >= MIN_LIST_LINE);

export const blocksOf = (spec: FreeSpec, route: 1 | 2): BlockSpec[] => (route === 1 ? spec.blocks1 : [spec.block2]);
export const fieldsOf = (spec: FreeSpec, route: 1 | 2): FreeField[] => blocksOf(spec, route).flatMap((b) => b.fields);
/** "1.1" → "b11", the key of a block in the progress record and the page map. */
export const blockKey = (id: string) => `b${id.replace(".", "")}`;

/** The state of one route before anything is answered: every key of the spec present, so a saved blob merges field by field (CLAUDE.md #9). */
export function emptyFreeRoute(fields: FreeField[]): FreeRoute {
  const r: FreeRoute = { text: {}, modes: {}, rows: {}, assessText: {}, assessRows: {}, picks: {} };
  for (const f of fields) {
    if (f.kind === "text") r.text[f.id] = "";
    else if (f.kind === "lists") {
      f.lists.forEach((l) => (r.text[l.id] = ""));
      r.modes[f.id] = "text";
      r.rows[f.id] = Array.from({ length: f.n }, () => Object.fromEntries(f.table.cols.map((c) => [c.key, ""])));
    } else if (f.kind === "assess") {
      r.modes[f.id] = "text";
      r.assessText[f.id] = Object.fromEntries(f.items.map((i) => [i.id, ""]));
      r.assessRows[f.id] = Object.fromEntries(f.items.map((i) => [i.id, Object.fromEntries(f.cols.map((c) => [c.key, ""]))]));
    } else r.picks[f.id] = null;
  }
  return r;
}
export const emptyFree = (spec: FreeSpec): FreeState => ({ r1: emptyFreeRoute(fieldsOf(spec, 1)), r2: emptyFreeRoute(fieldsOf(spec, 2)) });

export const sliceOf = (p: Persisted, day: number): FreeState => (p as unknown as Record<string, FreeState>)[`d${day}`];

/* ------------------------------------------------------------------ what counts */

const rowDone = (row: Record<string, string> | undefined, keys: string[]) => !!row && keys.every((k) => len(row[k]) >= MIN_CELL);

/** The number of complete table rows of a lists field. */
export const tableRowsDone = (f: ListsField, r: FreeRoute) => (r.rows[f.id] ?? []).filter((row) => rowDone(row, f.table.cols.map((c) => c.key))).length;
/** The number of items written in one list, in the layout the learner chose (the other layout is kept but does not count). */
export const listCount = (f: ListsField, listIndex: number, r: FreeRoute) => ((r.modes[f.id] ?? "text") === "table" ? tableRowsDone(f, r) : listLines(r.text[f.lists[listIndex].id] ?? "").length);

export const assessItemsMissing = (f: AssessField, r: FreeRoute) =>
  f.items.filter((i) => ((r.modes[f.id] ?? "text") === "table" ? !rowDone(r.assessRows[f.id]?.[i.id], f.cols.map((c) => c.key)) : len(r.assessText[f.id]?.[i.id]) < f.minText));

export function fieldComplete(f: FreeField, r: FreeRoute): boolean {
  if (f.kind === "text") return len(r.text[f.id]) >= f.min;
  if (f.kind === "lists") return f.lists.every((_, i) => listCount(f, i, r) >= f.n);
  if (f.kind === "assess") return assessItemsMissing(f, r).length === 0;
  return !!r.picks[f.id];
}
export const blockComplete = (b: BlockSpec, r: FreeRoute) => b.fields.every((f) => fieldComplete(f, r));

export type { AssessField, BlockSpec, FreeField, ListsField, PickField, TextField };
