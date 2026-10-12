"use client";

import { PlatformScreen } from "@/components/day4/mocks";
import type { ScreenKind } from "@/components/day4/mocks";
import { Diagram } from "@/components/materi/kit";
import { tt } from "@/lib/lang";

/**
 * The four MotivaLearn screens of Day 4: two of Platform A (a benchmark) and two of Platform B (MotivaLearn today), drawn in plain greys so the site's own blue,
 * teal and rust never colour the evidence (CLAUDE.md #49). Dark numbered markers point at the places the eight facts of Block 1.1 describe; they carry no label that
 * says whether something is a problem. Two screens across on a phone, so the numbers stay readable.
 */
export function MotivaScreens() {
  const items: [ScreenKind, string][] = [
    ["aCourse", tt("A · Course page", "A · Kursseite")],
    ["aTask", tt("A · A task", "A · Eine Aufgabe")],
    ["bLesson", tt("B · A lesson", "B · Eine Lektion")],
    ["bCourse", tt("B · Course page", "B · Kursseite")],
  ];
  return (
    <Diagram label={tt("Platform A (a benchmark) and Platform B (MotivaLearn today), drawn in outline · Case assumption: the details are made up for this exercise", "Plattform A (ein Vergleichswert) und Plattform B (MotivaLearn heute) in Umrissen · Fallannahme: Die Details sind für diese Übung erfunden")}>
      <div className="mx-auto grid max-w-[640px] grid-cols-2 gap-x-3 gap-y-3">
        {items.map(([k, name]) => (
          <div key={k}>
            <PlatformScreen kind={k} />
            <p className="mt-1 text-center text-caption font-bold text-ink">{name}</p>
          </div>
        ))}
      </div>
    </Diagram>
  );
}
