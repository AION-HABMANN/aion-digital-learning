"use client";

import { Day1Home, Day1Route1, Day1Route2, DayPlaceholder } from "@/components/day1/Pages";

/** Picks the content of a day. A day that is not built yet shows its placeholder at the same address (CLAUDE.md #12). */
export function DayView({ n, part }: { n: number; part: "home" | "route-1" | "route-2" }) {
  if (n !== 1) return <DayPlaceholder n={n} />;
  if (part === "route-1") return <Day1Route1 />;
  if (part === "route-2") return <Day1Route2 />;
  return <Day1Home />;
}
