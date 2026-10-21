"use client";

import { PlatformSim, PlatformShot } from "@/components/sim/PlatformSim";
import { optionA, optionB, optionC, today } from "@/data/day8/platforms";

/**
 * Day 8 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.7. The platform as the plan describes it and the three options of Block 1.2 as the same platform after each
 * measure. The pages are data (`data/day8/platforms.ts`) run by the shared mini-platform, so every menu entry, lesson and button opens a real page. Own colours only; the content is
 * made up and nothing here is marked right or wrong.
 */
export function StructLearnSim() {
  return <PlatformSim cfg={today()} />;
}

/** One page of the platform today as a picture (not clickable). */
export function StructLearnShot({ page }: { page: "home" | "courses" }) {
  return <PlatformShot cfg={today()} page={page} marks={false} />;
}

/** The same platform after each of the three options of Block 1.2. */
export function OptionSim({ option }: { option: "A" | "B" | "C" }) {
  return <PlatformSim cfg={option === "A" ? optionA() : option === "B" ? optionB() : optionC()} />;
}
