"use client";

import { DayHome, DayRoute } from "@/components/day/DayPages";
import { DAY_CONFIGS } from "@/components/day/dayConfigs";
import { Day1Home, Day1Route1, Day1Route2, DayPlaceholder } from "@/components/day1/Pages";
import { DayProvider } from "@/lib/dayContext";

/** Picks the content of a day. A day that is not built yet shows its placeholder at the same address (CLAUDE.md #12). */
export function DayView({ n, part }: { n: number; part: "home" | "route-1" | "route-2" }) {
  const cfg = DAY_CONFIGS[n];
  let page;
  if (n === 1) page = part === "route-1" ? <Day1Route1 /> : part === "route-2" ? <Day1Route2 /> : <Day1Home />;
  else if (cfg) page = part === "route-1" ? <DayRoute cfg={cfg} route={1} /> : part === "route-2" ? <DayRoute cfg={cfg} route={2} /> : <DayHome cfg={cfg} />;
  else return <DayPlaceholder n={n} />;
  return <DayProvider value={n}>{page}</DayProvider>;
}
