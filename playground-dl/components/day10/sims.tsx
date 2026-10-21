"use client";

import { PlatformSim, PlatformShot } from "@/components/sim/PlatformSim";
import { optionA, optionB, optionC, today } from "@/data/day10/platforms";

/**
 * Day 10 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.7. The platform as the plan describes it and the three options of Block 1.2 as the same platform after each
 * measure. The pages are data (`data/day10/platforms.ts`) run by the shared mini-platform, so every menu entry, lesson and button opens a real page. Own colours only; the content is
 * made up and nothing here is marked right or wrong.
 */
export function TrackLearnSim({ phone }: { phone?: boolean }) {
  return <PlatformSim cfg={today(!!phone)} />;
}

/** One page of TrackLearn today as a picture (not clickable), on a desktop or on a phone. */
export function TrackLearnShot({ page, phone }: { page: "course" | "lesson0"; phone?: boolean }) {
  return <PlatformShot cfg={today(!!phone)} page={page} marks={false} />;
}

/** The same platform after each of the three options of Block 1.2. */
export function OptionSim({ option }: { option: "A" | "B" | "C" }) {
  return <PlatformSim cfg={option === "A" ? optionA() : option === "B" ? optionB() : optionC()} />;
}
