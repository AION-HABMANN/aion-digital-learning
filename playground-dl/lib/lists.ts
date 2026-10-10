/**
 * Pure helpers for the answer state of the days built after Day 1: capped history, "choose exactly N", a priority order kept in step with a
 * chosen list, and the placement of an item into a bin with undo and redo (CLAUDE.md #5). Each returns the part of the slice that changes, so a
 * component writes it with the day's `patch` action. Nothing here touches the store, so the verify scripts can run it in Node.
 */
export const HISTORY_CAP = 100;

export const pushCapped = <T,>(list: T[], item: T, cap = HISTORY_CAP) => [...list, item].slice(-cap);

/** Adds or removes an id; a new id is refused (the list is returned as it is) once `cap` ids are chosen. */
export function toggleCapped<T extends string>(list: T[], id: T, cap: number): T[] {
  if (list.includes(id)) return list.filter((x) => x !== id);
  return list.length >= cap ? list : [...list, id];
}

/** Adds or removes an id with no limit. */
export const toggleList = <T extends string>(list: T[], id: T): T[] => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

/** Keeps an order list consistent with a chosen list: drops what is no longer chosen, appends what is new (in chosen order). */
export function syncOrder<T extends string>(order: T[], chosen: T[]): T[] {
  const kept = order.filter((id) => chosen.includes(id));
  return [...kept, ...chosen.filter((id) => !kept.includes(id))];
}

/** Moves one id a step up or down. */
export function swap<T>(list: T[], id: T, dir: -1 | 1): T[] {
  const i = list.indexOf(id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= list.length) return list;
  const out = [...list];
  [out[i], out[j]] = [out[j], out[i]];
  return out;
}

/** A sort exercise: every item is in a bin or still in the tray (null), with the history that undo and redo walk. */
export type SortSlice<B extends string> = {
  sort: Record<string, B | null>;
  sortHistory: Record<string, B | null>[];
  sortFuture: Record<string, B | null>[];
  sortResult: { holds: number; placed: number } | null;
};

export function placeItem<B extends string, S extends SortSlice<B>>(r: S, id: string, bin: B | null): Partial<S> {
  if (r.sort[id] === bin) return {};
  return { sort: { ...r.sort, [id]: bin }, sortHistory: pushCapped(r.sortHistory, r.sort), sortFuture: [], sortResult: null } as unknown as Partial<S>;
}

export function undoSort<B extends string, S extends SortSlice<B>>(r: S): Partial<S> {
  const prev = r.sortHistory[r.sortHistory.length - 1];
  if (!prev) return {};
  return { sort: prev, sortHistory: r.sortHistory.slice(0, -1), sortFuture: pushCapped(r.sortFuture, r.sort), sortResult: null } as unknown as Partial<S>;
}

export function redoSort<B extends string, S extends SortSlice<B>>(r: S): Partial<S> {
  const next = r.sortFuture[r.sortFuture.length - 1];
  if (!next) return {};
  return { sort: next, sortHistory: pushCapped(r.sortHistory, r.sort), sortFuture: r.sortFuture.slice(0, -1), sortResult: null } as unknown as Partial<S>;
}
