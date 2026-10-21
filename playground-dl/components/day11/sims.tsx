"use client";

import { PlatformShot, PlatformSim } from "@/components/sim/PlatformSim";
import { optionA, optionB, optionC, platformA, platformB, today } from "@/data/day11/platforms";

/**
 * Day 11 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.7. The two platforms of Block 1.1, GameLearn as it is and the three options of Block 1.2 as the same
 * platform after each measure. The pages are data (data/day11/platforms.ts) run by the shared mini-platform, so every menu entry, lesson and button opens a real page. Own
 * colours only; the content is made up and nothing here is marked right or wrong.
 */
export const PlatformASim = () => <PlatformSim cfg={platformA()} />;
export const PlatformBSim = () => <PlatformSim cfg={platformB()} />;
export const GameLearnSim = () => <PlatformSim cfg={today()} />;

/** One page of a platform as a picture (not clickable). */
export function PlatformShotOf({ which, page }: { which: "A" | "B" | "today"; page: string }) {
  return <PlatformShot cfg={which === "A" ? platformA() : which === "B" ? platformB() : today()} page={page} marks={false} />;
}

/** The same platform after each of the three options of Block 1.2. */
export function OptionSim({ option }: { option: "A" | "B" | "C" }) {
  return <PlatformSim cfg={option === "A" ? optionA() : option === "B" ? optionB() : optionC()} />;
}
