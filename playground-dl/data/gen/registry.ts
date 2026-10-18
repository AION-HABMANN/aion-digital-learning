import { GEN as D11 } from "@/data/day11/gen";
import { GEN as D12 } from "@/data/day12/gen";
import { GEN as D13 } from "@/data/day13/gen";
import { GEN as D14 } from "@/data/day14/gen";
import { GEN as D15 } from "@/data/day15/gen";
import { GEN as D16 } from "@/data/day16/gen";
import type { GenSpec } from "@/lib/dayGen/spec";

/**
 * The generic days (Day 8 onward): each day's data in one spec (data/dayN/gen.ts). A day is added here when its spec exists; the store, the mentor fill, the
 * day pages and the verify script all read this registry, so a day is wired in one place.
 */
export const GEN_SPECS: Record<number, GenSpec> = { 11: D11, 12: D12, 13: D13, 14: D14, 15: D15, 16: D16 };
