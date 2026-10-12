import type { MaterialId, MaterialMeta } from "@/data/day1/materials";
import type { RouteNo } from "@/data/course";
import type { MissingEntry } from "@/lib/missing";
import { short } from "@/lib/missing";
import { tt } from "@/lib/lang";
import type { MeasuresPart } from "@/store/dayTypesStd";
import type { Persisted } from "@/store/useStore";

/**
 * The parts of a "standard day" (Day 4 onward) that do not change from day to day: the length minimums, the minutes of the blocks, which blocks are
 * Optional, how the dossier ring is counted, and the Block 2.2 helpers (the effort check and the missing entries of the four measures). A day keeps its
 * own content, its own Block 1.1 and 2.1 and its own Route 2 (data/dayN, lib/dayN, components/dayN).
 */
export const MIN_LINE = 30;
export const MIN_SENTENCE = 40;
export const MIN_REASON = 20;
export const MIN_FRAME = 60;

export type TaskBlockId = "b11" | "b12" | "b13" | "b21" | "b22" | "b31" | "b32";

/** Blocks that deepen or repeat a skill a Core block already teaches (CLAUDE.md #35): collapsed by default, never removed, never required. */
export const OPTIONAL_BLOCKS: TaskBlockId[] = ["b12", "b13", "b21"];
export const isOptionalBlock = (b: TaskBlockId) => (OPTIONAL_BLOCKS as string[]).includes(b);
export const CORE_UNITS: Record<RouteNo, TaskBlockId[]> = { 1: ["b11", "b22"], 2: ["b31", "b32"] };

/** A guide for the facilitator, not a timer. Core of Route 1 about 30 minutes, Core of Route 2 about 20 (the user's standing weights). */
export const BLOCK_MINUTES: Record<string, number> = { "1.1": 13, "1.2": 8, "1.3": 5, "2.1": 7, "2.2": 17, "3.1": 9, "3.2": 11 };
export const CORE1_MINUTES = BLOCK_MINUTES["1.1"] + BLOCK_MINUTES["2.2"];
export const CORE2_MINUTES = BLOCK_MINUTES["3.1"] + BLOCK_MINUTES["3.2"];
export const TASK1_MINUTES = Object.entries(BLOCK_MINUTES).filter(([k]) => k.startsWith("1.") || k.startsWith("2.")).reduce((s, [, v]) => s + v, 0);
export const TASK2_MINUTES = CORE2_MINUTES;

export const len = (t: string | undefined) => (t ?? "").trim().length;

/** Dossier progress for one route: its Core cards marked read + its Core units completed (Optional ones sit outside the ring, #35). */
export function dossierProgressOf(day: number, materials: MaterialMeta[], p: Persisted, route: RouteNo, blocks: Record<TaskBlockId, boolean>): { done: number; total: number } {
  const block = route === 1 ? "A" : "B";
  const cards = materials.filter((m) => m.block === block && !m.optional);
  const read = cards.filter((m) => p.ui.sectionsRead[`d${day}:${m.id}`]).length;
  const units = CORE_UNITS[route];
  return { done: read + units.filter((b) => blocks[b]).length, total: cards.length + units.length };
}

export type CardId = MaterialId;

/* ------------------------------------------------------------------ Block 2.2 · the four measures */

type Rated = { chosen: string[]; effort: Record<string, number>; effortFlags?: string[] };

/** The measures whose effort rating differs from the band their printed cost falls in. Effort follows a rule taught in Materi A5; impact and risk are judgements and never are checked. */
export function effortWrongOf(r: Rated, costOf: (id: string) => number, band: (cost: number) => number): string[] {
  return r.chosen.filter((id) => !!r.effort[id] && r.effort[id] !== band(costOf(id)));
}

export type MeasuresMissingCfg = {
  pick: number;
  nameOf: (id: string) => string;
  /** "learning impact", "motivation impact", … in the active language. */
  criteria: string;
  ids: { pick: string; measure: (id: string) => string; reason: (id: string) => string; pain?: (id: string) => string; orderWhy: string; missingInfo: string };
  painLabel?: string;
};

/** The missing entries of Block 2.2, in the words every day uses. The caller prefixes nothing: every label starts "Block 2.2:". */
export function measuresMissing(r: MeasuresPart<string>, c: MeasuresMissingCfg, out: MissingEntry[]) {
  const e = (id: string, label: string) => out.push({ id, label });
  if (r.chosen.length !== c.pick) e(c.ids.pick, tt(`Block 2.2: choose exactly ${c.pick} measures (you have ${r.chosen.length}).`, `Block 2.2: Wählen Sie genau ${c.pick} Maßnahmen (Sie haben ${r.chosen.length}).`));
  for (const id of r.chosen) {
    const name = c.nameOf(id);
    if (!r.impact[id] || !r.effort[id] || !r.risk[id]) e(c.ids.measure(id), tt(`Block 2.2: “${short(name, 36)}” is not rated on ${c.criteria}, effort and risk.`, `Block 2.2: „${short(name, 36)}“ ist nicht nach ${c.criteria}, Aufwand und Risiko bewertet.`));
    if (c.ids.pain && len(r.pain[id]) < MIN_REASON) e(c.ids.pain(id), tt(`Block 2.2: name the pain point “${short(name, 36)}” answers: the persona and the phase (at least ${MIN_REASON} characters).`, `Block 2.2: Nennen Sie den Pain Point, den „${short(name, 36)}“ beantwortet: die Persona und die Phase (mindestens ${MIN_REASON} Zeichen).`));
    if (len(r.reasons[id]) < MIN_REASON) e(c.ids.reason(id), tt(`Block 2.2: say why “${short(name, 36)}” gets those ratings (at least ${MIN_REASON} characters).`, `Block 2.2: Begründen Sie, warum „${short(name, 36)}“ diese Bewertungen bekommt (mindestens ${MIN_REASON} Zeichen).`));
  }
  if (r.chosen.length === c.pick && len(r.orderWhy) < MIN_LINE) e(c.ids.orderWhy, tt(`Block 2.2: say why your first priority goes first (at least ${MIN_LINE} characters).`, `Block 2.2: Begründen Sie, warum Ihre erste Priorität zuerst kommt (mindestens ${MIN_LINE} Zeichen).`));
  if (len(r.missingInfo) < MIN_LINE) e(c.ids.missingInfo, tt(`Block 2.2: say what information you are missing (at least ${MIN_LINE} characters).`, `Block 2.2: Sagen Sie, welche Information Ihnen fehlt (mindestens ${MIN_LINE} Zeichen).`));
}

/** Is Block 2.2 filled in? Complete means filled in, never correct. */
export function measuresComplete(r: MeasuresPart<string>, pick: number, withPain = false): boolean {
  return (
    r.chosen.length === pick &&
    r.chosen.every((id) => !!r.impact[id] && !!r.effort[id] && !!r.risk[id] && len(r.reasons[id]) >= MIN_REASON && (!withPain || len(r.pain[id]) >= MIN_REASON)) &&
    r.order.length === pick &&
    len(r.orderWhy) >= MIN_LINE &&
    len(r.missingInfo) >= MIN_LINE
  );
}

/** The labels of the "Optional block" entries, so a day's coreOnly filter drops them in one place. */
export const OPTIONAL_PREFIXES = ["Block 1.2:", "Block 1.3:", "Block 2.1:"];
export const coreOnly = (list: MissingEntry[]) => list.filter((m) => !OPTIONAL_PREFIXES.some((p) => m.label.startsWith(p)));
