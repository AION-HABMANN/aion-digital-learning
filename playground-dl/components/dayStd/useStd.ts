"use client";

import { useCallback } from "react";
import type { RouteNo } from "@/data/course";
import { useStore } from "@/store/useStore";

/** The first day that is built as a generic day (lib/dayGen/spec.ts, slice `dg[day]`); earlier standard days keep their own slice `d{day}`. */
export const FIRST_GEN_DAY = 8;

/**
 * The state of one route of a standard or generic day (Day 4 onward): the slice, a `patch` that writes it, and whether the mentor tools are unlocked. The slice type
 * is the day's own (store/dayTypesStd.ts, store/dayTypesGen.ts); the shared blocks in this folder ask for the parts they need.
 */
export function useStdSlice<T>(day: number, route: RouteNo) {
  const rk = route === 1 ? "r1" : "r2";
  const r = useStore((s) => (day >= FIRST_GEN_DAY ? (s.dg[day] as unknown as Record<string, unknown>)[rk] : (s as unknown as Record<string, Record<string, unknown>>)[`d${day}`][rk])) as T;
  const patchStd = useStore((s) => s.patchStd);
  const patchGen = useStore((s) => s.patchGen);
  const patch = useCallback(
    (p: Partial<T> | ((s: T) => Partial<T>)) => (day >= FIRST_GEN_DAY ? patchGen(day, route, p as never) : patchStd(day, route, p as never)),
    [day, route, patchStd, patchGen],
  );
  const mentor = useStore((s) => s.mentorUnlocked);
  return { r, patch, mentor };
}
