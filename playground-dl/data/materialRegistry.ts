import * as d1 from "@/data/day1/materials";
import * as d2 from "@/data/day2/materials";
import * as d3 from "@/data/day3/materials";
import type { MaterialId, MaterialMeta, PlainExplain } from "@/data/day1/materials";

/**
 * One lookup for the study cards of every built day. The shared components (the material card, the "Draws on" chips, the reference list)
 * ask for the cards of the day the page belongs to, so none of them forks per day. A day adds its module here when it is built.
 */
export type DayMaterials = {
  MATERIALS: MaterialMeta[];
  MATERIAL_BY_ID: Record<MaterialId, MaterialMeta>;
  MATERIAL_PLAIN: Record<MaterialId, PlainExplain>;
  materialAnchorId: (id: MaterialId) => string;
  readKey: (id: MaterialId) => string;
};

const BY_DAY: Record<number, DayMaterials> = { 1: d1, 2: d2, 3: d3 };

export const materialsOf = (day: number): DayMaterials => BY_DAY[day] ?? d1;

