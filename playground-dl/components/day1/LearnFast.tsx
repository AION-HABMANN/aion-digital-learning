"use client";

import { useId } from "react";
import { Diagram } from "@/components/materi/kit";
import { tt } from "@/lib/lang";

/**
 * The mock screens of LearnFast (SkillUp's platform), drawn in plain greys so the site's own blue, teal and rust never colour the evidence
 * (CLAUDE.md #49). They show what the eight findings describe, in outline: they carry no labels that name a problem.
 */
export function LearnFastScreens() {
  const uid = useId().replace(/:/g, "");
  const title = tt("Four schematic LearnFast screens: dashboard, course page, lesson 3 and a quiz", "Vier schematische LearnFast-Bildschirme: Dashboard, Kursseite, Lektion 3 und ein Quiz");
  const desc = tt(
    "Dashboard: fourteen tiles of the same size in two rows. Course page: a heading and a list of eight lessons. Lesson 3: a dense block of text lines. Quiz: five questions and a submit button.",
    "Dashboard: vierzehn gleich große Kacheln in zwei Reihen. Kursseite: eine Überschrift und eine Liste von acht Lektionen. Lektion 3: ein dichter Block aus Textzeilen. Quiz: fünf Fragen und ein Absenden-Button.",
  );
  const frame = (x: number, label: string) => (
    <g>
      <rect x={x} y="8" width="146" height="126" rx="6" fill="#FFFFFF" stroke="#8793A3" strokeWidth="1.5" />
      <rect x={x} y="8" width="146" height="14" rx="6" fill="#E6ECF4" stroke="#8793A3" strokeWidth="1.5" />
      <text x={x + 73} y="154" textAnchor="middle" fontSize="13" fontWeight="700" fill="#17212E">{label}</text>
    </g>
  );
  return (
    <Diagram label={tt("The LearnFast screens, drawn in outline · Case assumption: the details are made up for this exercise", "Die LearnFast-Bildschirme in Umrissen · Fallannahme: Die Details sind für diese Übung erfunden")}>
      <svg viewBox="0 0 640 164" className="mx-auto h-auto w-full max-w-[640px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{title}</title>
        <desc id={`${uid}-d`}>{desc}</desc>
        {frame(6, tt("Dashboard", "Dashboard"))}
        {Array.from({ length: 14 }, (_, i) => (
          <rect key={i} x={12 + (i % 7) * 19.5} y={30 + Math.floor(i / 7) * 36} width="16" height="30" rx="2" fill="#E6ECF4" stroke="#8793A3" />
        ))}
        <rect x="12" y="104" width="134" height="6" rx="2" fill="#E6ECF4" />
        {frame(166, tt("Course page", "Kursseite"))}
        <rect x="174" y="30" width="80" height="8" rx="2" fill="#8793A3" />
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x="174" y={46 + i * 10} width={110 - (i % 3) * 14} height="5" rx="2" fill="#D5DEE9" />
        ))}
        {frame(326, tt("Lesson 3", "Lektion 3"))}
        {Array.from({ length: 13 }, (_, i) => (
          <rect key={i} x="334" y={30 + i * 7.5} width={i % 5 === 4 ? 90 : 130} height="4" rx="2" fill="#8793A3" />
        ))}
        {frame(486, tt("Quiz", "Quiz"))}
        {Array.from({ length: 5 }, (_, i) => (
          <g key={i}>
            <rect x="494" y={30 + i * 15} width="10" height="10" rx="2" fill="#FFFFFF" stroke="#8793A3" />
            <rect x="510" y={33 + i * 15} width="80" height="4" rx="2" fill="#D5DEE9" />
          </g>
        ))}
        <rect x="494" y="108" width="52" height="16" rx="4" fill="#E6ECF4" stroke="#8793A3" />
      </svg>
    </Diagram>
  );
}
