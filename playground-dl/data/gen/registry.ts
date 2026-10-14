import { GEN as D8 } from "@/data/day8/gen";
import { GEN as D9 } from "@/data/day9/gen";
import { GEN as D10 } from "@/data/day10/gen";
import { GEN as D11 } from "@/data/day11/gen";
import type { GenSpec } from "@/lib/dayGen/spec";

/**
 * The generic days (Day 8 onward): each day's data in one spec (data/dayN/gen.ts). A day is added here when its spec exists; the store, the mentor fill, the
 * day pages and the verify script all read this registry, so a day is wired in one place.
 */
export const GEN_SPECS: Record<number, GenSpec> = { 8: D8, 9: D9, 10: D10, 11: D11 };
