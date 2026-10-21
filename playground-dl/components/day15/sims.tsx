"use client";

import { PlatformShot, PlatformSim } from "@/components/sim/PlatformSim";
import { desktop, optionA, optionB, optionC, today } from "@/data/day15/platforms";

/**
 * Day 15 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.7. MobileLearn as it is, on a phone and on a desktop screen, and the three options of Block 1.2 as the same
 * platform on a phone after each measure. The pages are data (data/day15/platforms.ts) run by the shared mini-platform, so every menu entry, list entry and button opens a real
 * page. Own colours only; the content is made up and nothing here is marked right or wrong.
 */
export const MobileLearnSim = ({ onDesktop }: { onDesktop?: boolean }) => <PlatformSim cfg={onDesktop ? desktop() : today()} />;

/** One page of MobileLearn as a picture (not clickable), on a phone or a desktop screen. */
export function PlatformShotOf({ page, onDesktop }: { page: string; onDesktop?: boolean }) {
  return <PlatformShot cfg={onDesktop ? desktop() : today()} page={page} marks={false} />;
}

/** The same platform on a phone after each of the three options of Block 1.2. */
export function OptionSim({ option }: { option: "A" | "B" | "C" }) {
  return <PlatformSim cfg={option === "A" ? optionA() : option === "B" ? optionB() : optionC()} />;
}
