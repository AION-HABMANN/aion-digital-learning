"use client";

import { PlatformShot, PlatformSim } from "@/components/sim/PlatformSim";
import { optionA, optionB, optionC, today } from "@/data/day14/platforms";

/**
 * Day 14 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.7. ClearLearn as it is (a hard interface text and unclear menu entries) and the three options of Block 1.2
 * as the same platform after each measure. The pages are data (data/day14/platforms.ts) run by the shared mini-platform, so every menu entry, list entry and button opens a real
 * page. Own colours only; the content is made up and nothing here is marked right or wrong.
 */
export const ClearLearnSim = () => <PlatformSim cfg={today()} />;

/** One page of ClearLearn as a picture (not clickable). */
export function PlatformShotOf({ page }: { page: string }) {
  return <PlatformShot cfg={today()} page={page} marks={false} />;
}

/** The same platform after each of the three options of Block 1.2. */
export function OptionSim({ option }: { option: "A" | "B" | "C" }) {
  return <PlatformSim cfg={option === "A" ? optionA() : option === "B" ? optionB() : optionC()} />;
}
