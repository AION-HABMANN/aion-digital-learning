import type { DecisionId } from "@/data/day1/route2";
import { bi, t } from "@/lib/lang";

/**
 * What the Day 1 Route 2 decision panel reads (CLAUDE.md #47, adapted to Day 1: choose three of nine decisions, in order). Every fact is printed
 * on the decision cards (cost, weeks, what it acts on) or follows from the rules of Materi B1 to B3, so the learner never calculates (#44):
 * the panel computes the months and says what they mean. The nine decisions sit in four layers of one picture, and some of them lean on others:
 * the fix every learner meets (guided paths) and the evidence about why learners leave are what the others rest on.
 */
export type DLayer = "growth" | "extra" | "fix" | "evidence";

export type DFacts = {
  layer: DLayer;
  /** Short name for the diagram. */
  short: string;
  /** It fixes a problem the case brief names. */
  fixes: boolean;
  /** It finds out why learners leave (or where). */
  evidence: boolean;
  /** The decision others rest on: the fix every learner meets, or the evidence about why learners leave. */
  fundamental: boolean;
  /** Needs all of these in the plan before it starts. */
  needs: DecisionId[];
  /** Needs at least one of these (data on what learners do). */
  needsAny: DecisionId[];
  /** A programme that runs all year: its first results come after its first months, it has no end month. */
  standing: boolean;
  /** Learners cannot see why they are shown what they are shown. */
  blackBox: boolean;
};

export const DPANEL: Record<DecisionId, DFacts> = bi({
  d1: { layer: "fix" as DLayer, short: t("Guided paths", "Geführte Pfade"), fixes: true, evidence: false, fundamental: true, needs: [] as DecisionId[], needsAny: [] as DecisionId[], standing: false, blackBox: false },
  d2: { layer: "fix" as DLayer, short: t("Progress and feedback", "Fortschritt und Feedback"), fixes: true, evidence: false, fundamental: false, needs: [] as DecisionId[], needsAny: [] as DecisionId[], standing: false, blackBox: false },
  d3: { layer: "fix" as DLayer, short: t("Short, structured lessons", "Kurze, strukturierte Lektionen"), fixes: true, evidence: false, fundamental: false, needs: [] as DecisionId[], needsAny: [] as DecisionId[], standing: false, blackBox: false },
  d4: { layer: "evidence" as DLayer, short: t("User-research programme", "Nutzerforschungsprogramm"), fixes: false, evidence: true, fundamental: true, needs: [] as DecisionId[], needsAny: [] as DecisionId[], standing: true, blackBox: false },
  d8: { layer: "evidence" as DLayer, short: t("Drop-out analytics", "Abbruch-Analytics"), fixes: false, evidence: true, fundamental: true, needs: [] as DecisionId[], needsAny: [] as DecisionId[], standing: false, blackBox: false },
  d5: { layer: "extra" as DLayer, short: t("Points and badges", "Punkte und Badges"), fixes: false, evidence: false, fundamental: false, needs: ["d1"] as DecisionId[], needsAny: [] as DecisionId[], standing: false, blackBox: false },
  d6: { layer: "extra" as DLayer, short: t("AI recommendations", "KI-Empfehlungen"), fixes: false, evidence: false, fundamental: false, needs: ["d1"] as DecisionId[], needsAny: ["d8", "d4"] as DecisionId[], standing: false, blackBox: true },
  d9: { layer: "extra" as DLayer, short: t("Mobile app", "Mobile App"), fixes: false, evidence: false, fundamental: false, needs: ["d1"] as DecisionId[], needsAny: [] as DecisionId[], standing: false, blackBox: false },
  d10: { layer: "extra" as DLayer, short: t("New visual style", "Neuer visueller Stil"), fixes: false, evidence: false, fundamental: false, needs: [] as DecisionId[], needsAny: [] as DecisionId[], standing: false, blackBox: false },
  d11: { layer: "extra" as DLayer, short: t("Rebuild everything", "Alles neu bauen"), fixes: true, evidence: false, fundamental: false, needs: [] as DecisionId[], needsAny: ["d8", "d4"] as DecisionId[], standing: false, blackBox: false },
  d12: { layer: "growth" as DLayer, short: t("Ten new courses", "Zehn neue Kurse"), fixes: false, evidence: false, fundamental: false, needs: ["d1"] as DecisionId[], needsAny: [] as DecisionId[], standing: false, blackBox: false },
  d7: { layer: "growth" as DLayer, short: t("Double the marketing", "Marketing verdoppeln"), fixes: false, evidence: false, fundamental: false, needs: ["d1"] as DecisionId[], needsAny: [] as DecisionId[], standing: false, blackBox: false },
});

/** The "slower" scenario: every build takes this many percent longer (the plan's “incomplete data”: the forecast is unclear). */
export const SLOW_PERCENT = 25;
/** A standing programme counts as in use after its first months (its first interviews and test results). */
export const STANDING_MONTHS = 2;
