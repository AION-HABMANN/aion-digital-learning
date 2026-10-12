"use client";

import { LearnBaseScreen } from "@/components/day5/mocks";
import type { LbScreen } from "@/components/day5/mocks";
import { Diagram } from "@/components/materi/kit";
import { tt } from "@/lib/lang";

/**
 * The four LearnBase screens of Day 5: Home, a course page, the course search and the three lists, drawn in plain greys so the site's own blue, teal and rust never
 * colour the evidence (CLAUDE.md #49). Dark numbered markers point at the places the eight facts of Block 1.1 describe; they carry no label that says whether
 * something is a problem. Two screens across on a phone, so the numbers stay readable.
 */
export function LearnBaseScreens() {
  const items: [LbScreen, string][] = [
    ["home", tt("Home", "Startseite")],
    ["course", tt("A course page", "Eine Kursseite")],
    ["search", tt("Course search", "Kurssuche")],
    ["lists", tt("The three lists", "Die drei Listen")],
  ];
  return (
    <Diagram label={tt("Four LearnBase screens, drawn in outline · Case assumption: the details are made up for this exercise", "Vier LearnBase-Bildschirme in Umrissen · Fallannahme: Die Details sind für diese Übung erfunden")}>
      <div className="mx-auto grid max-w-[640px] grid-cols-2 gap-x-3 gap-y-3">
        {items.map(([k, name]) => (
          <div key={k}>
            <LearnBaseScreen kind={k} />
            <p className="mt-1 text-center text-caption font-bold text-ink">{name}</p>
          </div>
        ))}
      </div>
    </Diagram>
  );
}
