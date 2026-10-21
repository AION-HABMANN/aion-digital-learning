import type { GenSpec } from "@/lib/dayGen/spec";

/**
 * The generic days (Day 8 onward): each day's data in one spec (data/dayN/gen.ts). A day is added here when its spec exists; the store, the mentor fill, the
 * day pages and the verify script all read this registry, so a day is wired in one place.
 */
export const GEN_SPECS: Record<number, GenSpec> = {};
