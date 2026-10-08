"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CAUSE_PICK, CLAIM_IDS, FINDING_IDS, PICK_MEASURES } from "@/data/day1/case";
import type { AreaId, CauseId, ClaimBin, ClaimId, FindingId, MeasureId, ReflectKey } from "@/data/day1/case";
import { R2_PICK } from "@/data/day1/route2";
import type { DecisionId, EvidenceId, OwnerId, RiskId } from "@/data/day1/route2";
import { KEY_D1_R1, KEY_D1_R2 } from "@/lib/day1/mentorKey";
import type { RouteNo } from "@/data/course";

/**
 * One persisted store for the whole course (one Next.js project, every day). Each built day adds one slice (`d1`, later `d2`, …), and each
 * slice holds the two routes of that day (`r1`, `r2`). A change to the persisted shape bumps `version`, adds a step to `migratePersisted`
 * and is covered by the deep `merge` (CLAUDE.md #9).
 */
export const STORAGE_KEY = "dl-v1";
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

const emptyPersisted = (): Persisted => ({
  participant: { name: "" },
  ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" },
  d1: { r1: emptyD1R1(), r2: emptyD1R2() },
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
    return base.map((b, i) => mergeDefaults(b, saved[i])) as T;
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

/** The migration of a saved blob to the current shape. Pure, so it can be tested without a browser. Version 1 is the first shape. */
export function migratePersisted(persisted: unknown, from: number): Persisted {
  void from;
  return (persisted ?? {}) as Persisted;
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
          const picks = r.picks.includes(id) ? r.picks.filter((c) => c !== id) : r.picks.length >= R2_PICK ? r.picks : [...r.picks, id];
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
          if (day !== 1) return {};
          const d1: D1State = { r1: { ...emptyD1R1(), ...KEY_D1_R1() }, r2: { ...emptyD1R2(), ...KEY_D1_R2() } };
          const participant = { name: s.participant.name.trim() ? s.participant.name : "Mentor Check" };
          return { participant, d1, resetCount: s.resetCount + 1 };
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
          return { d1, ui: { bannerDismissed, sectionsRead, lang: s.ui.lang }, resetCount: s.resetCount + 1 };
        }),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ participant: s.participant, ui: s.ui, d1: s.d1 }),
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
