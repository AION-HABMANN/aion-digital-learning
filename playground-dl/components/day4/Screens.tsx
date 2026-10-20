"use client";

import { useId } from "react";
import { MotivaShot } from "@/components/day4/sims";
import type { ShotKind } from "@/components/day4/sims";
import { Diagram } from "@/components/materi/kit";
import { Fit } from "@/components/sim/Fit";
import { tt } from "@/lib/lang";

/**
 * The four MotivaLearn screens of Day 4 as pictures (DL-STANDARD section 5, v1.6): two of Platform A (a benchmark) and two of Platform B (MotivaLearn today), the real
 * screens drawn by the same components as the simulations, scaled to fit and not clickable. Dark numbered markers point at the places the eight facts of Block 1.1 describe;
 * they carry no label that says whether something is a problem. Two screens across on a wide page, one on a phone, so the text stays readable.
 */
export function MotivaScreens() {
  const uid = useId().replace(/:/g, "");
  const items: [ShotKind, string, string][] = [
    ["aCourse", tt("A · Course page", "A · Kursseite"), tt("Platform A, the course page: a progress bar, the goal of the unit and a list of short tasks. Numbers 1 and 4 mark places that facts describe.", "Plattform A, die Kursseite: ein Fortschrittsbalken, das Ziel der Einheit und eine Liste kurzer Aufgaben. Die Nummern 1 und 4 markieren Stellen, die Fakten beschreiben.")],
    ["aTask", tt("A · A task", "A · Eine Aufgabe"), tt("Platform A, a task after the check: the result and the next task. Numbers 2 and 3 mark places that facts describe.", "Plattform A, eine Aufgabe nach dem Prüfen: das Ergebnis und die nächste Aufgabe. Die Nummern 2 und 3 markieren Stellen, die Fakten beschreiben.")],
    ["bLesson", tt("B · A lesson", "B · Eine Lektion"), tt("Platform B, a lesson: one long page of reading and a Continue button. Numbers 5 and 6 mark places that facts describe.", "Plattform B, eine Lektion: eine lange Lesetextseite und ein Weiter-Button. Die Nummern 5 und 6 markieren Stellen, die Fakten beschreiben.")],
    ["bCourse", tt("B · Course page", "B · Kursseite"), tt("Platform B, the course page: a list of lesson titles. Numbers 7 and 8 mark places that facts describe.", "Plattform B, die Kursseite: eine Liste von Lektionstiteln. Die Nummern 7 und 8 markieren Stellen, die Fakten beschreiben.")],
  ];
  return (
    <Diagram label={tt("Platform A (a benchmark) and Platform B (MotivaLearn today), as the platforms show them · Case assumption: the details are made up for this exercise", "Plattform A (ein Vergleichswert) und Plattform B (MotivaLearn heute), so wie die Plattformen sie zeigen · Fallannahme: Die Details sind für diese Übung erfunden")}>
      <div className="mx-auto grid max-w-[760px] grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
        {items.map(([k, name, desc]) => (
          <figure key={k} className="min-w-0" role="img" aria-labelledby={`${uid}-${k}-t`} aria-describedby={`${uid}-${k}-d`}>
            <span id={`${uid}-${k}-t`} className="sr-only">{name}</span>
            <span id={`${uid}-${k}-d`} className="sr-only">{desc}</span>
            <Fit><MotivaShot kind={k} marks /></Fit>
            <figcaption className="mt-1 text-center text-[12.5px] font-bold text-ink">{name}</figcaption>
          </figure>
        ))}
      </div>
    </Diagram>
  );
}
