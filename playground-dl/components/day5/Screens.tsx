"use client";

import { useId } from "react";
import { LearnBaseShot } from "@/components/day5/sims";
import { Diagram } from "@/components/materi/kit";
import { Fit } from "@/components/sim/Fit";
import { tt } from "@/lib/lang";

/**
 * The four LearnBase screens of Day 5 as pictures (DL-STANDARD section 5, v1.7): Home, a course page, the course search and the three lists, the real screens drawn by the
 * same components as the simulation, scaled to fit and not clickable. Dark numbered markers point at the places the eight facts of Block 1.1 describe; they carry no label
 * that says whether something is a problem. Two screens across on a wide page, one on a phone, so the text stays readable.
 */
export function LearnBaseScreens() {
  const uid = useId().replace(/:/g, "");
  const items: [Parameters<typeof LearnBaseShot>[0]["kind"], string, string][] = [
    ["home", tt("Home", "Startseite"), tt("LearnBase home: banners, a long menu, widgets and a social feed. Numbers 1, 3, 6 and 7 mark places that facts describe.", "LearnBase-Startseite: Banner, ein langes Menü, Widgets und ein Social Feed. Die Nummern 1, 3, 6 und 7 markieren Stellen, die Fakten beschreiben.")],
    ["course", tt("A course page", "Eine Kursseite"), tt("LearnBase course page: a button to start the course. Numbers 2 and 8 mark places that facts describe.", "LearnBase-Kursseite: ein Button zum Starten des Kurses. Die Nummern 2 und 8 markieren Stellen, die Fakten beschreiben.")],
    ["search", tt("Course search", "Kurssuche"), tt("LearnBase course search: filter fields above the result area. Number 4 marks the place a fact describes.", "LearnBase-Kurssuche: Filterfelder über dem Ergebnisbereich. Die Nummer 4 markiert die Stelle, die ein Fakt beschreibt.")],
    ["lists", tt("The three lists", "Die drei Listen"), tt("LearnBase: the same lessons in three lists, each in its own order. Number 5 marks the place a fact describes.", "LearnBase: dieselben Lektionen in drei Listen, jeweils in eigener Reihenfolge. Die Nummer 5 markiert die Stelle, die ein Fakt beschreibt.")],
  ];
  return (
    <Diagram label={tt("Four LearnBase screens, as the platform shows them · Case assumption: the details are made up for this exercise", "Vier LearnBase-Bildschirme, wie die Plattform sie zeigt · Fallannahme: Die Details sind für diese Übung erfunden")}>
      <div className="mx-auto grid max-w-[760px] grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
        {items.map(([k, name, desc]) => (
          <figure key={k} className="min-w-0" role="img" aria-labelledby={`${uid}-${k}-t`} aria-describedby={`${uid}-${k}-d`}>
            <span id={`${uid}-${k}-t`} className="sr-only">{name}</span>
            <span id={`${uid}-${k}-d`} className="sr-only">{desc}</span>
            <Fit><LearnBaseShot kind={k} marks /></Fit>
            <figcaption className="mt-1 text-center text-[12.5px] font-bold text-ink">{name}</figcaption>
          </figure>
        ))}
      </div>
    </Diagram>
  );
}
