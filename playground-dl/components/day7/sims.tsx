"use client";

import { PlatformSim, PlatformShot } from "@/components/sim/PlatformSim";
import { optionA, optionB, optionC, today } from "@/data/day7/platforms";

/**
 * Day 7 · the working simulations of CLAUDE.md #60 and DL-STANDARD v1.7. InclusiveLearn as the plan describes it (a small font, complicated language, many steps to operate), and the
 * three options of Block 1.2 as the same platform after each measure. The pages are data (`data/day7/platforms.ts`) run by the shared mini-platform, so every menu entry, lesson and
 * button opens a real page. Own colours only; the content is made up and nothing here is marked right or wrong.
 */
export function InclusiveLearnSim() {
  return <PlatformSim cfg={today()} />;
}

/** One page of InclusiveLearn today as a picture (not clickable). */
export function InclusiveLearnShot({ page }: { page: "course" | "signup" }) {
  return <PlatformShot cfg={today()} page={page} marks={false} />;
}

/** The same platform after each of the three options of Block 1.2. */
export function OptionSim({ option }: { option: "A" | "B" | "C" }) {
  return <PlatformSim cfg={option === "A" ? optionA() : option === "B" ? optionB() : optionC()} />;
}
