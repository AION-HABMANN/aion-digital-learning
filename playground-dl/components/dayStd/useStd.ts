"use client";

import { useCallback } from "react";
import type { RouteNo } from "@/data/course";
import { useStore } from "@/store/useStore";

/**
 * The state of one route of a standard day (Day 4 onward): the slice, a `patch` that writes it, and whether the mentor tools are unlocked. The slice type
 * is the day's own (store/dayTypesStd.ts); the shared blocks in this folder ask for the parts they need.
 */
export function useStdSlice<T>(day: number, route: RouteNo) {
  const r = useStore((s) => (s as unknown as Record<string, { r1: unknown; r2: unknown }>)[`d${day}`][route === 1 ? "r1" : "r2"]) as T;
  const patchStd = useStore((s) => s.patchStd);
  const patch = useCallback((p: Partial<T> | ((s: T) => Partial<T>)) => patchStd(day, route, p as never), [day, route, patchStd]);
  const mentor = useStore((s) => s.mentorUnlocked);
  return { r, patch, mentor };
}
