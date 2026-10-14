import { MATS as D8 } from "@/data/day8/materials";
import { MATS as D9 } from "@/data/day9/materials";
import type { DayMaterials } from "@/data/materialRegistry";

/** The study-card registries of the generic days, by day (data/dayN/materials.ts). */
export const GEN_MATS: Record<number, DayMaterials> = { 8: D8, 9: D9 };
