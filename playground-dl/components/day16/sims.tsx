"use client";

import { PlatformShot, PlatformSim } from "@/components/sim/PlatformSim";
import { figures, optionA, optionB, optionC, today } from "@/data/day16/platforms";

/**
 * Day 16 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.7. DataLearn's analytics console (with the plan's key figures for Block 1.1, and as the case's console for
 * Block 2.1 and Level 3) and the learner-facing platform after each of the three options of Block 1.2. The pages are data (data/day16/platforms.ts) run by the shared
 * mini-platform, so every menu entry, list entry and button opens a real page. Own colours only; the content is made up and nothing here is marked right or wrong.
 */
export const ConsoleSim = ({ keyFigures }: { keyFigures?: boolean }) => <PlatformSim cfg={keyFigures ? figures() : today()} />;

/** One page of the console as a picture (not clickable). */
export function ConsoleShot({ page, keyFigures }: { page: string; keyFigures?: boolean }) {
  return <PlatformShot cfg={keyFigures ? figures() : today()} page={page} marks={false} />;
}

/** The learner-facing platform after each of the three options of Block 1.2. */
export function OptionSim({ option }: { option: "A" | "B" | "C" }) {
  return <PlatformSim cfg={option === "A" ? optionA() : option === "B" ? optionB() : optionC()} />;
}
