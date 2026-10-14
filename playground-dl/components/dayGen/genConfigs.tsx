import type { DayConfig } from "@/components/day/DayPages";
import { KIT as K8 } from "@/components/day8/kit";
import { KIT as K9 } from "@/components/day9/kit";
import type { GenKit } from "@/components/dayGen/GenBits";
import { makeDayConfig } from "@/components/dayGen/genDay";
import { GEN_SPECS } from "@/data/gen/registry";
import { materialsOf } from "@/data/materialRegistry";

/**
 * The page configs of the generic days (Day 8 onward). A day's kit (its pictures and study cards, components/dayN/kit.tsx) is registered here next to the spec
 * registry (data/gen/registry.ts), so adding a day is one line in each.
 */
const KITS: Record<number, GenKit> = { 8: K8, 9: K9 };

export const GEN_CONFIGS: Record<number, DayConfig> = Object.fromEntries(Object.entries(KITS).map(([d, kit]) => [Number(d), makeDayConfig(GEN_SPECS[Number(d)], kit, materialsOf(Number(d)))]));
