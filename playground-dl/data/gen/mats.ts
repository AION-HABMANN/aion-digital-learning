import { MATS as D8 } from "@/data/day8/materials";
import { MATS as D9 } from "@/data/day9/materials";
import { MATS as D10 } from "@/data/day10/materials";
import { MATS as D11 } from "@/data/day11/materials";
import { MATS as D12 } from "@/data/day12/materials";
import { MATS as D13 } from "@/data/day13/materials";
import { MATS as D14 } from "@/data/day14/materials";
import { MATS as D15 } from "@/data/day15/materials";
import { MATS as D16 } from "@/data/day16/materials";
import type { DayMaterials } from "@/data/materialRegistry";

/** The study-card registries of the generic days, by day (data/dayN/materials.ts). */
export const GEN_MATS: Record<number, DayMaterials> = { 8: D8, 9: D9, 10: D10, 11: D11, 12: D12, 13: D13, 14: D14, 15: D15, 16: D16 };
