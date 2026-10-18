import type { DayConfig } from "@/components/day/DayPages";
import { KIT as K11 } from "@/components/day11/kit";
import { KIT as K12 } from "@/components/day12/kit";
import { KIT as K13 } from "@/components/day13/kit";
import { KIT as K14 } from "@/components/day14/kit";
import { KIT as K15 } from "@/components/day15/kit";
import { KIT as K16 } from "@/components/day16/kit";
import type { GenKit } from "@/components/dayGen/GenBits";
import { makeDayConfig } from "@/components/dayGen/genDay";
import { GEN_SPECS } from "@/data/gen/registry";
import { materialsOf } from "@/data/materialRegistry";

/**
 * The page configs of the generic days (Day 8 onward). A day's kit (its pictures and study cards, components/dayN/kit.tsx) is registered here next to the spec
 * registry (data/gen/registry.ts), so adding a day is one line in each.
 */
const KITS: Record<number, GenKit> = { 11: K11, 12: K12, 13: K13, 14: K14, 15: K15, 16: K16 };

export const GEN_CONFIGS: Record<number, DayConfig> = Object.fromEntries(Object.entries(KITS).map(([d, kit]) => [Number(d), makeDayConfig(GEN_SPECS[Number(d)], kit, materialsOf(Number(d)))]));
