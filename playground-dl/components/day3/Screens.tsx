"use client";

import { useId } from "react";
import type { ReactNode } from "react";
import { Diagram } from "@/components/materi/kit";
import { tt } from "@/lib/lang";

/**
 * The four EduCore screens of Day 3, drawn in plain greys so the site's own blue, teal and rust never colour the evidence (CLAUDE.md #49).
 * Dark numbered markers point at the places the eight facts of Block 1.1 describe; they carry no label that says whether something is a
 * problem. A marker is an annotation on the picture, not part of the mock platform.
 */
function Marker({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g aria-hidden>
      <circle cx={x} cy={y} r="9.5" fill="#17212E" />
      <text x={x} y={y + 4.5} textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFFFFF">
        {n}
      </text>
    </g>
  );
}

export function EduCoreScreens() {
  const uid = useId().replace(/:/g, "");
  const frame = (x: number, label: string) => (
    <g>
      <rect x={x} y="8" width="150" height="190" rx="6" fill="#FFFFFF" stroke="#8793A3" strokeWidth="1.5" />
      <rect x={x} y="8" width="150" height="14" rx="6" fill="#E6ECF4" stroke="#8793A3" strokeWidth="1.5" />
      <text x={x + 75} y="220" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#17212E">{label}</text>
    </g>
  );
  /** One screen per picture: four across on a wide page, two by two on a phone, so the numbers and the names stay readable. */
  const shot = (key: string, vx: number, title: string, desc: string, body: ReactNode) => (
    <svg key={key} viewBox={`${vx - 6} 0 162 232` } className="h-auto w-full" role="img" aria-labelledby={`${uid}-${key}-t ${uid}-${key}-d`}>
      <title id={`${uid}-${key}-t`}>{title}</title>
      <desc id={`${uid}-${key}-d`}>{desc}</desc>
      {body}
    </svg>
  );
  const lesson = (
    <>
      {frame(6, tt("Lesson 7", "Lektion 7"))}
      {Array.from({ length: 22 }, (_, i) => (
        <rect key={i} x="14" y={30 + i * 7.3} width={i % 7 === 6 ? 88 : 116} height="3.8" rx="2" fill="#8793A3" />
      ))}
      <Marker x={140} y={40} n={1} />
      <Marker x={140} y={88} n={4} />
      <Marker x={140} y={130} n={5} />
      <Marker x={140} y={170} n={6} />
    </>
  );
  const overview = (
    <>
      {frame(166, tt("Module overview", "Modulübersicht"))}
      {Array.from({ length: 14 }, (_, i) => (
        <rect key={i} x="174" y={30 + i * 11.8} width="118" height="8" rx="2" fill="#E6ECF4" stroke="#D5DEE9" />
      ))}
      <Marker x={300} y={70} n={7} />
      <Marker x={300} y={170} n={8} />
    </>
  );
  const extras = (
    <>
      {frame(326, tt("Lesson page with extras", "Lektionsseite mit Extras"))}
      <rect x="332" y="28" width="38" height="164" rx="3" fill="#F3F6FA" stroke="#8793A3" />
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x="336" y={34 + i * 17} width="30" height="6" rx="2" fill="#8793A3" />
      ))}
      <rect x="376" y="28" width="94" height="18" rx="3" fill="#E6ECF4" stroke="#8793A3" />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x="376" y={54 + i * 8} width={i === 7 ? 40 : 66} height="3.8" rx="2" fill="#8793A3" />
      ))}
      <rect x="446" y="52" width="26" height="46" rx="3" fill="#E6ECF4" stroke="#8793A3" />
      <rect x="376" y="130" width="94" height="26" rx="3" fill="#E6ECF4" stroke="#8793A3" />
      <Marker x={460} y={37} n={2} />
    </>
  );
  const quiz = (
    <>
      {frame(486, tt("Quiz", "Quiz"))}
      {Array.from({ length: 12 }, (_, i) => (
        <g key={i}>
          <rect x="494" y={30 + i * 12} width="8" height="8" rx="2" fill="#FFFFFF" stroke="#8793A3" />
          <rect x="508" y={32 + i * 12} width="96" height="4" rx="2" fill="#D5DEE9" />
        </g>
      ))}
      <rect x="494" y="176" width="52" height="16" rx="4" fill="#E6ECF4" stroke="#8793A3" />
      <Marker x={618} y={96} n={3} />
    </>
  );
  return (
    <Diagram label={tt("The EduCore screens, drawn in outline · Case assumption: the details are made up for this exercise", "Die EduCore-Bildschirme in Umrissen · Fallannahme: Die Details sind für diese Übung erfunden")}>
      <div className="mx-auto grid max-w-[700px] grid-cols-2 gap-x-2 gap-y-3 sm:grid-cols-4">
        {shot("l7", 6, tt("EduCore lesson 7: a dense block of text lines", "EduCore Lektion 7: ein dichter Block aus Textzeilen"), tt("A dense block of text lines. Numbers 1, 4, 5 and 6 mark places that facts describe.", "Ein dichter Block aus Textzeilen. Die Nummern 1, 4, 5 und 6 markieren Stellen, die Fakten beschreiben."), lesson)}
        {shot("ov", 166, tt("EduCore module overview: a long flat list of rows", "EduCore Modulübersicht: eine lange flache Liste von Zeilen"), tt("A long flat list of rows. Numbers 7 and 8 mark places that facts describe.", "Eine lange flache Liste von Zeilen. Die Nummern 7 und 8 markieren Stellen, die Fakten beschreiben."), overview)}
        {shot("ex", 326, tt("EduCore lesson page with extras: a menu, a banner, text and two boxes", "EduCore Lektionsseite mit Extras: ein Menü, ein Banner, Text und zwei Kästen"), tt("A menu on the left, a banner on top, text, and two boxes on the right. Number 2 marks the place a fact describes.", "Links ein Menü, oben ein Banner, Text und rechts zwei Kästen. Die Nummer 2 markiert die Stelle, die ein Fakt beschreibt."), extras)}
        {shot("qz", 486, tt("EduCore quiz: twelve checkbox rows and a submit button", "EduCore Quiz: zwölf Zeilen mit Kontrollkästchen und ein Absenden-Button"), tt("Twelve checkbox rows and a submit button. Number 3 marks the place a fact describes.", "Zwölf Zeilen mit Kontrollkästchen und ein Absenden-Button. Die Nummer 3 markiert die Stelle, die ein Fakt beschreibt."), quiz)}
      </div>
    </Diagram>
  );
}
