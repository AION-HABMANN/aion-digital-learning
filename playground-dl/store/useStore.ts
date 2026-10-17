"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CAUSE_PICK, CLAIM_IDS, FINDING_IDS, PICK_MEASURES } from "@/data/day1/case";
import type { AreaId, CauseId, ClaimBin, ClaimId, FindingId, MeasureId, ReflectKey } from "@/data/day1/case";
import type { DecisionId, EvidenceId, OwnerId, RiskId } from "@/data/day1/route2";
import { KEY_D1_R1, KEY_D1_R2 } from "@/lib/day1/mentorKey";
import { KEY_D2_R1, KEY_D2_R2 } from "@/lib/day2/mentorKey";
import { KEY_D3_R1, KEY_D3_R2 } from "@/lib/day3/mentorKey";
import { SPEC as SPEC4 } from "@/data/day4/free";
import { SPEC as SPEC5 } from "@/data/day5/free";
import { SPEC as SPEC6 } from "@/data/day6/free";
import { freeRouteKey } from "@/lib/dayFree/mentor";
import { KEY_D7_R1, KEY_D7_R2 } from "@/lib/day7/mentorKey";
import { emptyD2, emptyD2R1, emptyD2R2, emptyD3, emptyD3R1, emptyD3R2 } from "@/store/dayTypes";
import { emptyD4, emptyD4R1, emptyD4R2, emptyD5, emptyD5R1, emptyD5R2, emptyD6, emptyD6R1, emptyD6R2, emptyD7, emptyD7R1, emptyD7R2 } from "@/store/dayTypesStd";
import type { D4State, D5State, D6State, D7State } from "@/store/dayTypesStd";
import { emptyGen, emptyGenR1, emptyGenR2 } from "@/store/dayTypesGen";
import type { GenState } from "@/store/dayTypesGen";
import { GEN_SPECS } from "@/data/gen/registry";
import { genKeyR1, genKeyR2 } from "@/lib/dayGen/mentorKey";
import type { D2R1, D2R2, D2State, D3R1, D3R2, D3State } from "@/store/dayTypes";
import type { RouteNo } from "@/data/course";

/**
 * One persisted store for the whole course (one Next.js project, every day). Each built day adds one slice (`d1`, later `d2`, …), and each
 * slice holds the two routes of that day (`r1`, `r2`). A change to the persisted shape bumps `version`, adds a step to `migratePersisted`
 * and is covered by the deep `merge` (CLAUDE.md #9).
 */
export const STORAGE_KEY = "dl-v1";
export const PERSIST_VERSION = 11;
const HISTORY_CAP = 100;

/** 0 means not chosen yet; 1 Low, 2 Mid, 3 High. */
export type Score = 0 | 1 | 2 | 3;

export type SortMap = Record<FindingId, AreaId | null>;
export type ClaimMap = Record<ClaimId, ClaimBin | null>;

/** Day 1 · Route 1 · Levels 1 and 2 — the UX Analysis File. */
export type D1R1 = {
  /** Block 1.1 (Core): sort eight findings into the plan's three areas, then the one that would make a learner give up first. */
  sort: SortMap;
  sortHistory: SortMap[];
  sortFuture: SortMap[];
  sortChecks: number;
  sortResult: { holds: number; placed: number } | null;
  sortClue: boolean;
  sortReasoning: boolean;
  worst: FindingId | null;
  worstWhy: string;
  /** Block 1.2 (Optional): what the 40 % can and cannot tell. */
  claims: ClaimMap;
  claimHistory: ClaimMap[];
  claimFuture: ClaimMap[];
  claimChecks: number;
  claimResult: { holds: number; placed: number } | null;
  claimClue: boolean;
  claimReasoning: boolean;
  need: string;
  /** Block 1.3 (Optional): the coaching reflection. Never scored, never missing. */
  reflect: Record<ReflectKey, string>;
  /** Block 2.1 (Optional): three main causes. */
  causes: CauseId[];
  causeResult: { holds: number; chosen: number } | null;
  causeClue: boolean;
  causeWhy: string;
  /** Block 2.2 (Core): four measures, rated, ordered, with what is missing. */
  chosen: MeasureId[];
  impact: Record<string, Score>;
  effort: Record<string, Score>;
  risk: Record<string, Score>;
  reasons: Record<string, string>;
  /** Per measure: the problems of the case it fixes (ProblemIds, or "none") and the two sentences of "Say it in one sentence" (lib/day1/reason.ts). `reasons` holds the composed text once complete. */
  fixes: Record<string, string[]>;
  slotA: Record<string, string>;
  slotB: Record<string, string>;
  effortFlags: string[];
  effortClue: boolean;
  effortResult: { holds: number; rated: number } | null;
  order: MeasureId[];
  orderWhy: string;
  missingInfo: string;
  checks: number;
};

/** Day 1 · Route 2 · Level 3 — the UX Strategy Memo. */
export type D1R2 = {
  vision: string;
  picks: DecisionId[];
  order: DecisionId[];
  orderWhy: string;
  risk: RiskId | null;
  riskPlan: string;
  uncertain: string;
  owner: OwnerId | null;
  evidence: EvidenceId[];
  giveUp: string;
};

export type D1State = { r1: D1R1; r2: D1R2 };

export type Persisted = {
  participant: { name: string };
  ui: { bannerDismissed: Record<string, boolean>; sectionsRead: Record<string, boolean>; lang: "en" | "de" };
  d1: D1State;
  d2: D2State;
  d3: D3State;
  d4: D4State;
  d5: D5State;
  d6: D6State;
  d7: D7State;
  /** The generic days (Day 8 onward), by day number: store/dayTypesGen.ts. */
  dg: Record<number, GenState>;
};

type Session = { mentorUnlocked: boolean; resetCount: number };
type Patch<T> = Partial<T> | ((s: T) => Partial<T>);

type Actions = {
  setParticipant: (patch: Partial<Persisted["participant"]>) => void;
  dismissBanner: (key: string) => void;
  toggleRead: (cardKey: string, value?: boolean) => void;
  setLang: (l: "en" | "de") => void;
  patchD1R1: (p: Patch<D1R1>) => void;
  patchD1R2: (p: Patch<D1R2>) => void;
  patchD2R1: (p: Patch<D2R1>) => void;
  patchD2R2: (p: Patch<D2R2>) => void;
  patchD3R1: (p: Patch<D3R1>) => void;
  patchD3R2: (p: Patch<D3R2>) => void;
  /** The shared "standard day" form (Day 4 onward): patch route 1 or 2 of day N. The slice type is the day's own (store/dayTypesStd.ts). */
  patchStd: (day: number, route: RouteNo, p: Patch<any>) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  /** The same for a generic day (Day 8 onward). */
  patchGen: (day: number, route: RouteNo, p: Patch<any>) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  placeFinding: (id: FindingId, area: AreaId | null) => void;
  undoSort: () => void;
  redoSort: () => void;
  placeClaim: (id: ClaimId, bin: ClaimBin | null) => void;
  undoClaims: () => void;
  redoClaims: () => void;
  toggleCause: (id: CauseId) => void;
  toggleMeasure: (id: MeasureId) => void;
  moveMeasure: (id: MeasureId, dir: -1 | 1) => void;
  toggleDecision: (id: DecisionId) => void;
  moveDecision: (id: DecisionId, dir: -1 | 1) => void;
  toggleEvidence: (id: EvidenceId) => void;
  setMentorUnlocked: (v: boolean) => void;
  mentorFill: (day: number) => void;
  resetRoute: (day: number, route: RouteNo | null) => void;
};

const emptySort = (): SortMap => Object.fromEntries(FINDING_IDS.map((id) => [id, null])) as SortMap;
const emptyClaims = (): ClaimMap => Object.fromEntries(CLAIM_IDS.map((id) => [id, null])) as ClaimMap;

export const emptyD1R1 = (): D1R1 => ({
  sort: emptySort(),
  sortHistory: [],
  sortFuture: [],
  sortChecks: 0,
  sortResult: null,
  sortClue: false,
  sortReasoning: false,
  worst: null,
  worstWhy: "",
  claims: emptyClaims(),
  claimHistory: [],
  claimFuture: [],
  claimChecks: 0,
  claimResult: null,
  claimClue: false,
  claimReasoning: false,
  need: "",
  reflect: { a: "", b: "", c: "" },
  causes: [],
  causeResult: null,
  causeClue: false,
  causeWhy: "",
  chosen: [],
  impact: {},
  effort: {},
  risk: {},
  reasons: {},
  fixes: {},
  slotA: {},
  slotB: {},
  effortFlags: [],
  effortClue: false,
  effortResult: null,
  order: [],
  orderWhy: "",
  missingInfo: "",
  checks: 0,
});

export const emptyD1R2 = (): D1R2 => ({
  vision: "",
  picks: [],
  order: [],
  orderWhy: "",
  risk: null,
  riskPlan: "",
  uncertain: "",
  owner: null,
  evidence: [],
  giveUp: "",
});

/** An empty slice for every registered generic day. */
export const emptyDg = (): Record<number, GenState> => Object.fromEntries(Object.entries(GEN_SPECS).map(([d, spec]) => [d, emptyGen(spec.facts.map((f) => f.id))]));

const emptyPersisted = (): Persisted => ({
  participant: { name: "" },
  ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" },
  d1: { r1: emptyD1R1(), r2: emptyD1R2() },
  d2: emptyD2(),
  d3: emptyD3(),
  d4: emptyD4(),
  d5: emptyD5(),
  d6: emptyD6(),
  d7: emptyD7(),
  dg: emptyDg(),
});

const pushCapped = <T,>(list: T[], item: T) => [...list, item].slice(-HISTORY_CAP);
const resolve = <T,>(p: Patch<T>, s: T): Partial<T> => (typeof p === "function" ? (p as (x: T) => Partial<T>)(s) : p);
const isPlain = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

/** Keeps an order list consistent with a chosen list: drops what is no longer chosen, appends what is new (in chosen order). */
function syncOrder<T extends string>(order: T[], chosen: T[]): T[] {
  const kept = order.filter((id) => chosen.includes(id));
  return [...kept, ...chosen.filter((id) => !kept.includes(id))];
}
function swap<T>(list: T[], id: T, dir: -1 | 1): T[] {
  const i = list.indexOf(id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= list.length) return list;
  const out = [...list];
  [out[i], out[j]] = [out[j], out[i]];
  return out;
}

/**
 * A deep merge of a saved value onto the defaults: every field an older or partial blob lacks comes from the defaults, a value of the
 * wrong type is dropped, and an empty default array or object takes what was saved (a history, a list of chosen ids).
 */
export function mergeDefaults<T>(base: T, saved: unknown): T {
  if (saved === undefined || saved === null) return base;
  if (Array.isArray(base)) {
    if (!Array.isArray(saved)) return base;
    if (base.length === 0) return saved as T;
    // a learner may have added rows (a guided table grows): keep every saved item, shaped like the last default item
    return Array.from({ length: Math.max(base.length, saved.length) }, (_, i) => mergeDefaults(base[Math.min(i, base.length - 1)], saved[i])) as T;
  }
  if (isPlain(base)) {
    if (!isPlain(saved)) return base;
    const keys = Object.keys(base);
    if (keys.length === 0) return { ...saved } as T;
    const out: Record<string, unknown> = { ...(saved as Record<string, unknown>) };
    for (const k of keys) out[k] = mergeDefaults((base as Record<string, unknown>)[k], (saved as Record<string, unknown>)[k]);
    return out as T;
  }
  return typeof saved === typeof base || base === null ? (saved as T) : base;
}

/**
 * The migration of a saved blob to the current shape. Pure, so it can be tested without a browser. Version 1 held Day 1 only; version 2
 * adds the slices of Day 2 and Day 3 (d2, d3); version 3 adds Days 4 to 6 (d4, d5, d6); version 4 adds Day 7 (d7); version 5 adds the generic days (dg); version 6 adds Day 1 Block 2.2's `fixes`, `slotA`, `slotB` (the deep merge fills them); version 7 adds Day 2 Block 1.1's `diffMode`, `diffs` and `diffRows` and Block 1.2's `assessMode`, `assessText`, `assessRows` and `noTest` (the deep merge fills them; the old rating fields of Block 1.2 are dropped and stay harmlessly in an old blob, and the Block 1.4 sort keeps its saved placements). version 8 replaces the Day 3 task fields (CLAUDE.md #57: `problemMode`, `problems`, `problemRows`, `feel`, `improve`, the assessment, `optOrder`, `optChoice`, `optWhy`, the causes and improvements, `priority`, `justify`; Route 2 `strategy`, `measures`, `definition`, `riskText`, `logic`, `uncertain`); the deep merge keeps what still fits (`improve`, `optWhy`, `strategy`, `definition`, `uncertain`) and fills the rest, and the old fields stay harmlessly in an old blob. version 9 replaces the task state of Days 4 to 6 with the free-form shape (store/dayTypesFree.ts: `text`, `modes`, `rows`, `assessText`, `assessRows`, `picks`, keyed by the field ids of the day's spec); the deep merge fills the new keys and the old fields stay harmlessly in an old blob, so earlier Day 4 to 6 task answers are not carried over. version 10 adds Day 2 Route 2's table layouts (`dataMode`, `dataRows`, `roadMode`, `roadRows`, `riskMode`, `riskRows`, `uncMode`, `uncRows`; the deep merge fills them and now also keeps rows a learner added). version 11 adds the guided-table layouts of Days 3 to 6 (DL-STANDARD section 15): `modes[id]` and `rows[id]` for the text fields of Days 4 to 6 that can be answered as a table, and Day 3 Route 2's `measureMode`, `measureRows`, `riskMode`, `riskRows`, `logicMode`, `logicRows`, `uncMode`, `uncRows`; the deep merge fills them. A blob that lacks them gets empty ones here, and the deep merge fills any single field.
 */
export function migratePersisted(persisted: unknown, from: number): Persisted {
  const p = (persisted ?? {}) as Partial<Persisted>;
  return { ...p, d2: p.d2 ?? emptyD2(), d3: p.d3 ?? emptyD3(), d4: p.d4 ?? emptyD4(), d5: p.d5 ?? emptyD5(), d6: p.d6 ?? emptyD6(), d7: p.d7 ?? emptyD7(), dg: p.dg ?? emptyDg() } as Persisted;
}

export const useStore = create<Persisted & Session & Actions>()(
  persist(
    (set) => ({
      ...emptyPersisted(),
      mentorUnlocked: false,
      resetCount: 0,

      setParticipant: (patch) => set((s) => ({ participant: { ...s.participant, ...patch } })),
      dismissBanner: (key) => set((s) => ({ ui: { ...s.ui, bannerDismissed: { ...s.ui.bannerDismissed, [key]: true } } })),
      toggleRead: (cardKey, value) => set((s) => ({ ui: { ...s.ui, sectionsRead: { ...s.ui.sectionsRead, [cardKey]: value ?? !s.ui.sectionsRead[cardKey] } } })),
      setLang: (l) => set((s) => ({ ui: { ...s.ui, lang: l } })),

      patchD1R1: (p) => set((s) => ({ d1: { ...s.d1, r1: { ...s.d1.r1, ...resolve(p, s.d1.r1) } } })),
      patchD1R2: (p) => set((s) => ({ d1: { ...s.d1, r2: { ...s.d1.r2, ...resolve(p, s.d1.r2) } } })),
      patchD2R1: (p) => set((s) => ({ d2: { ...s.d2, r1: { ...s.d2.r1, ...resolve(p, s.d2.r1) } } })),
      patchD2R2: (p) => set((s) => ({ d2: { ...s.d2, r2: { ...s.d2.r2, ...resolve(p, s.d2.r2) } } })),
      patchD3R1: (p) => set((s) => ({ d3: { ...s.d3, r1: { ...s.d3.r1, ...resolve(p, s.d3.r1) } } })),
      patchD3R2: (p) => set((s) => ({ d3: { ...s.d3, r2: { ...s.d3.r2, ...resolve(p, s.d3.r2) } } })),
      patchStd: (day, route, p) =>
        set((s) => {
          const key = `d${day}` as keyof Persisted;
          const slice = s[key] as unknown as { r1: unknown; r2: unknown };
          const rk = route === 1 ? "r1" : "r2";
          const cur = slice[rk] as Record<string, unknown>;
          return { [key]: { ...slice, [rk]: { ...cur, ...resolve(p, cur) } } } as Partial<Persisted>;
        }),

      patchGen: (day, route, p) =>
        set((s) => {
          const spec = GEN_SPECS[day];
          const slice = s.dg[day] ?? (spec ? emptyGen(spec.facts.map((f) => f.id)) : undefined);
          if (!slice) return {};
          const rk = route === 1 ? "r1" : "r2";
          const cur = slice[rk] as unknown as Record<string, unknown>;
          return { dg: { ...s.dg, [day]: { ...slice, [rk]: { ...cur, ...resolve(p, cur) } } } };
        }),

      placeFinding: (id, area) =>
        set((s) => {
          const r = s.d1.r1;
          if (r.sort[id] === area) return {};
          return { d1: { ...s.d1, r1: { ...r, sort: { ...r.sort, [id]: area }, sortHistory: pushCapped(r.sortHistory, r.sort), sortFuture: [], sortResult: null } } };
        }),
      undoSort: () =>
        set((s) => {
          const r = s.d1.r1;
          const prev = r.sortHistory[r.sortHistory.length - 1];
          if (!prev) return {};
          return { d1: { ...s.d1, r1: { ...r, sort: prev, sortHistory: r.sortHistory.slice(0, -1), sortFuture: pushCapped(r.sortFuture, r.sort), sortResult: null } } };
        }),
      redoSort: () =>
        set((s) => {
          const r = s.d1.r1;
          const next = r.sortFuture[r.sortFuture.length - 1];
          if (!next) return {};
          return { d1: { ...s.d1, r1: { ...r, sort: next, sortHistory: pushCapped(r.sortHistory, r.sort), sortFuture: r.sortFuture.slice(0, -1), sortResult: null } } };
        }),

      placeClaim: (id, bin) =>
        set((s) => {
          const r = s.d1.r1;
          if (r.claims[id] === bin) return {};
          return { d1: { ...s.d1, r1: { ...r, claims: { ...r.claims, [id]: bin }, claimHistory: pushCapped(r.claimHistory, r.claims), claimFuture: [], claimResult: null } } };
        }),
      undoClaims: () =>
        set((s) => {
          const r = s.d1.r1;
          const prev = r.claimHistory[r.claimHistory.length - 1];
          if (!prev) return {};
          return { d1: { ...s.d1, r1: { ...r, claims: prev, claimHistory: r.claimHistory.slice(0, -1), claimFuture: pushCapped(r.claimFuture, r.claims), claimResult: null } } };
        }),
      redoClaims: () =>
        set((s) => {
          const r = s.d1.r1;
          const next = r.claimFuture[r.claimFuture.length - 1];
          if (!next) return {};
          return { d1: { ...s.d1, r1: { ...r, claims: next, claimHistory: pushCapped(r.claimHistory, r.claims), claimFuture: r.claimFuture.slice(0, -1), claimResult: null } } };
        }),

      toggleCause: (id) =>
        set((s) => {
          const r = s.d1.r1;
          const causes = r.causes.includes(id) ? r.causes.filter((c) => c !== id) : r.causes.length >= CAUSE_PICK ? r.causes : [...r.causes, id];
          return { d1: { ...s.d1, r1: { ...r, causes, causeResult: null } } };
        }),

      toggleMeasure: (id) =>
        set((s) => {
          const r = s.d1.r1;
          const chosen = r.chosen.includes(id) ? r.chosen.filter((c) => c !== id) : r.chosen.length >= PICK_MEASURES ? r.chosen : [...r.chosen, id];
          return { d1: { ...s.d1, r1: { ...r, chosen, order: syncOrder(r.order, chosen), effortFlags: [], effortClue: false, effortResult: null } } };
        }),
      moveMeasure: (id, dir) => set((s) => ({ d1: { ...s.d1, r1: { ...s.d1.r1, order: swap(s.d1.r1.order, id, dir) } } })),

      toggleDecision: (id) =>
        set((s) => {
          const r = s.d1.r2;
          const picks = r.picks.includes(id) ? r.picks.filter((c) => c !== id) : [...r.picks, id];
          return { d1: { ...s.d1, r2: { ...r, picks, order: syncOrder(r.order, picks) } } };
        }),
      moveDecision: (id, dir) => set((s) => ({ d1: { ...s.d1, r2: { ...s.d1.r2, order: swap(s.d1.r2.order, id, dir) } } })),
      toggleEvidence: (id) =>
        set((s) => {
          const r = s.d1.r2;
          return { d1: { ...s.d1, r2: { ...r, evidence: r.evidence.includes(id) ? r.evidence.filter((e) => e !== id) : [...r.evidence, id] } } };
        }),

      setMentorUnlocked: (v) => set({ mentorUnlocked: v }),

      // Mentor autofill: every model answer of both routes of the day, plus the participant name if it is empty, so each document can be exported at once.
      mentorFill: (day) =>
        set((s) => {
          const participant = { name: s.participant.name.trim() ? s.participant.name : "Mentor Check" };
          if (day === 1) {
            const d1: D1State = { r1: { ...emptyD1R1(), ...KEY_D1_R1() }, r2: { ...emptyD1R2(), ...KEY_D1_R2() } };
            return { participant, d1, resetCount: s.resetCount + 1 };
          }
          if (day === 2) {
            const d2: D2State = { r1: { ...emptyD2R1(), ...KEY_D2_R1() }, r2: { ...emptyD2R2(), ...KEY_D2_R2() } };
            return { participant, d2, resetCount: s.resetCount + 1 };
          }
          if (day === 3) {
            const d3: D3State = { r1: { ...emptyD3R1(), ...KEY_D3_R1() }, r2: { ...emptyD3R2(), ...KEY_D3_R2() } };
            return { participant, d3, resetCount: s.resetCount + 1 };
          }
          if (day === 4) {
            const d4: D4State = { r1: freeRouteKey(SPEC4, 1), r2: freeRouteKey(SPEC4, 2) };
            return { participant, d4, resetCount: s.resetCount + 1 };
          }
          if (day === 5) {
            const d5: D5State = { r1: freeRouteKey(SPEC5, 1), r2: freeRouteKey(SPEC5, 2) };
            return { participant, d5, resetCount: s.resetCount + 1 };
          }
          if (day === 6) {
            const d6: D6State = { r1: freeRouteKey(SPEC6, 1), r2: freeRouteKey(SPEC6, 2) };
            return { participant, d6, resetCount: s.resetCount + 1 };
          }
          if (day === 7) {
            const d7: D7State = { r1: { ...emptyD7R1(), ...KEY_D7_R1() }, r2: { ...emptyD7R2(), ...KEY_D7_R2() } };
            return { participant, d7, resetCount: s.resetCount + 1 };
          }
          const gspec = GEN_SPECS[day];
          if (gspec) {
            const ids = gspec.facts.map((f) => f.id);
            const gen: GenState = { r1: { ...emptyGenR1(ids), ...genKeyR1(gspec) }, r2: { ...emptyGenR2(), ...genKeyR2(gspec) } };
            return { participant, dg: { ...s.dg, [day]: gen }, resetCount: s.resetCount + 1 };
          }
          return {};
        }),

      resetRoute: (day, route) =>
        set((s) => {
          const prefix = route === 1 ? `d${day}:A` : route === 2 ? `d${day}:B` : `d${day}:`;
          const sectionsRead = Object.fromEntries(Object.entries(s.ui.sectionsRead).filter(([k]) => !k.startsWith(prefix)));
          const bannerDismissed = { ...s.ui.bannerDismissed };
          if (route === null) {
            delete bannerDismissed[`d${day}r1`];
            delete bannerDismissed[`d${day}r2`];
          } else delete bannerDismissed[`d${day}r${route}`];
          const d1 = day === 1 ? { r1: route === null || route === 1 ? emptyD1R1() : s.d1.r1, r2: route === null || route === 2 ? emptyD1R2() : s.d1.r2 } : s.d1;
          const d2 = day === 2 ? { r1: route === null || route === 1 ? emptyD2R1() : s.d2.r1, r2: route === null || route === 2 ? emptyD2R2() : s.d2.r2 } : s.d2;
          const d3 = day === 3 ? { r1: route === null || route === 1 ? emptyD3R1() : s.d3.r1, r2: route === null || route === 2 ? emptyD3R2() : s.d3.r2 } : s.d3;
          const d4 = day === 4 ? { r1: route === null || route === 1 ? emptyD4R1() : s.d4.r1, r2: route === null || route === 2 ? emptyD4R2() : s.d4.r2 } : s.d4;
          const d5 = day === 5 ? { r1: route === null || route === 1 ? emptyD5R1() : s.d5.r1, r2: route === null || route === 2 ? emptyD5R2() : s.d5.r2 } : s.d5;
          const d6 = day === 6 ? { r1: route === null || route === 1 ? emptyD6R1() : s.d6.r1, r2: route === null || route === 2 ? emptyD6R2() : s.d6.r2 } : s.d6;
          const d7 = day === 7 ? { r1: route === null || route === 1 ? emptyD7R1() : s.d7.r1, r2: route === null || route === 2 ? emptyD7R2() : s.d7.r2 } : s.d7;
          const gspec = GEN_SPECS[day];
          const dg = gspec
            ? { ...s.dg, [day]: { r1: route === null || route === 1 ? emptyGenR1(gspec.facts.map((f) => f.id)) : s.dg[day].r1, r2: route === null || route === 2 ? emptyGenR2() : s.dg[day].r2 } }
            : s.dg;
          return { d1, d2, d3, d4, d5, d6, d7, dg, ui: { bannerDismissed, sectionsRead, lang: s.ui.lang }, resetCount: s.resetCount + 1 };
        }),
    }),
    {
      name: STORAGE_KEY,
      version: PERSIST_VERSION,
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ participant: s.participant, ui: s.ui, d1: s.d1, d2: s.d2, d3: s.d3, d4: s.d4, d5: s.d5, d6: s.d6, d7: s.d7, dg: s.dg }),
      migrate: migratePersisted,
      merge: (persisted, current) => {
        const merged = mergeDefaults(emptyPersisted(), (persisted ?? {}) as Partial<Persisted>);
        merged.ui.lang = merged.ui.lang === "de" ? "de" : "en";
        return { ...current, ...merged };
      },
    },
  ),
);

export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const unsub = useStore.persist.onFinishHydration(() => setHydrated(true));
    if (useStore.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);
  return hydrated;
}

export function rehydrateStore() {
  return useStore.persist.rehydrate();
}
