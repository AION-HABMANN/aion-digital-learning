"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Diagram } from "@/components/materi/kit";
import { EduCoreShot } from "@/components/day3/sims";
import { tt } from "@/lib/lang";

/**
 * The four EduCore screens of Day 3 as pictures (DL-STANDARD section 5, v1.6): real screens of the platform, drawn by the same components as the simulation, scaled to fit,
 * not clickable. Dark numbered markers point at the places the eight facts of Block 1.1 describe; they carry no label that says whether something is a problem. A marker is an
 * annotation on the picture, not part of the platform. The long pages are cut at the fold, as a screenshot is.
 */
type ScreenKey = "l7" | "ov" | "ex" | "qz";

/** Scales a screen of 560 px to the width it is given, so the picture is the real page at any size. */
function Fit({ children }: { children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ s: 0.6, h: 360 });
  useEffect(() => {
    const fit = () => {
      const w = outer.current?.clientWidth ?? 560;
      const s = Math.min(1, w / 560);
      setBox({ s, h: Math.ceil((inner.current?.offsetHeight ?? 0) * s) });
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (outer.current) ro.observe(outer.current);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={outer} className="w-full overflow-hidden rounded-md border border-[#8793A3] bg-white" style={{ height: box.h }}>
      <div ref={inner} style={{ width: 560, transform: `scale(${box.s})`, transformOrigin: "top left" }}>{children}</div>
    </div>
  );
}

/** `only` shows some of the four screens; `markers={false}` leaves out the numbers (Block 1.1 shows Lesson 7 alone, as the plan describes it). */
export function EduCoreScreens({ only, markers = true }: { only?: ScreenKey[]; markers?: boolean } = {}) {
  const uid = useId().replace(/:/g, "");
  const want = (k: ScreenKey) => !only || only.includes(k);
  const single = !!only && only.length === 1;
  const shot = (key: ScreenKey, label: string, title: string, desc: string) => (
    <figure key={key} className="min-w-0" role="img" aria-labelledby={`${uid}-${key}-t`} aria-describedby={`${uid}-${key}-d`}>
      <span id={`${uid}-${key}-t`} className="sr-only">{title}</span>
      <span id={`${uid}-${key}-d`} className="sr-only">{desc}</span>
      <Fit><EduCoreShot screen={key} marks={markers} /></Fit>
      <figcaption className="mt-1 text-center text-[12.5px] font-bold text-ink">{label}</figcaption>
    </figure>
  );
  return (
    <Diagram label={single ? tt("A lesson of EduCore, as the platform shows it · Case assumption: the details are made up for this exercise", "Eine Lektion von EduCore, so wie die Plattform sie zeigt · Fallannahme: Die Details sind für diese Übung erfunden") : tt("The EduCore screens, as the platform shows them · Case assumption: the details are made up for this exercise", "Die EduCore-Bildschirme, so wie die Plattform sie zeigt · Fallannahme: Die Details sind für diese Übung erfunden")}>
      <div className={single ? "mx-auto grid max-w-[420px] grid-cols-1" : "mx-auto grid max-w-[760px] grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2"}>
        {want("l7") && shot("l7", tt("Lesson 7", "Lektion 7"), tt("EduCore lesson 7: a dense block of text", "EduCore Lektion 7: ein dichter Textblock"), tt("A dense block of text. Numbers 1, 4, 5 and 6 mark places that facts describe.", "Ein dichter Textblock. Die Nummern 1, 4, 5 und 6 markieren Stellen, die Fakten beschreiben."))}
        {want("ov") && shot("ov", tt("Module overview", "Modulübersicht"), tt("EduCore module overview: a long flat list of lessons", "EduCore Modulübersicht: eine lange flache Liste von Lektionen"), tt("A long flat list of lessons. Numbers 7 and 8 mark places that facts describe.", "Eine lange flache Liste von Lektionen. Die Nummern 7 und 8 markieren Stellen, die Fakten beschreiben."))}
        {want("ex") && shot("ex", tt("Lesson page with extras", "Lektionsseite mit Extras"), tt("EduCore lesson page with extras: a menu, a banner, text and two boxes", "EduCore Lektionsseite mit Extras: ein Menü, ein Banner, Text und zwei Kästen"), tt("A menu on the left, a banner on top, text, and two boxes on the right. Number 2 marks the place a fact describes.", "Links ein Menü, oben ein Banner, Text und rechts zwei Kästen. Die Nummer 2 markiert die Stelle, die ein Fakt beschreibt."))}
        {want("qz") && shot("qz", tt("Quiz", "Quiz"), tt("EduCore quiz: twelve questions on one page and a submit button", "EduCore Quiz: zwölf Fragen auf einer Seite und ein Absenden-Button"), tt("Twelve questions on one page and a submit button. Number 3 marks the place a fact describes.", "Zwölf Fragen auf einer Seite und ein Absenden-Button. Die Nummer 3 markiert die Stelle, die ein Fakt beschreibt."))}
      </div>
    </Diagram>
  );
}
