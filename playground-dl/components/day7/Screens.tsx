"use client";

import { InclusiveScreen } from "@/components/day7/mocks";
import type { IlScreen } from "@/components/day7/mocks";
import { Diagram } from "@/components/materi/kit";
import { tt } from "@/lib/lang";

/**
 * The four InclusiveLearn screens of Day 7: a course page, a video lesson, the quiz and the sign-up, drawn in plain greys so the site's own blue, teal and rust never
 * colour the evidence (CLAUDE.md #49). Dark numbered markers point at the places the eight facts of Block 1.1 describe; they carry no label that says whether
 * something is a problem. Two screens across on a phone, so the numbers stay readable.
 */
export function InclusiveLearnScreens() {
  const items: [IlScreen, string][] = [
    ["course", tt("A course page", "Eine Kursseite")],
    ["video", tt("A video lesson", "Eine Videolektion")],
    ["quiz", tt("The quiz", "Das Quiz")],
    ["signup", tt("The sign-up", "Die Anmeldung")],
  ];
  return (
    <Diagram label={tt("Four InclusiveLearn screens, drawn in outline · Case assumption: the details are made up for this exercise", "Vier InclusiveLearn-Bildschirme in Umrissen · Fallannahme: Die Details sind für diese Übung erfunden")}>
      <div className="mx-auto grid max-w-[640px] grid-cols-2 gap-x-3 gap-y-3">
        {items.map(([k, name]) => (
          <div key={k}>
            <InclusiveScreen kind={k} />
            <p className="mt-1 text-center text-caption font-bold text-ink">{name}</p>
          </div>
        ))}
      </div>
    </Diagram>
  );
}
