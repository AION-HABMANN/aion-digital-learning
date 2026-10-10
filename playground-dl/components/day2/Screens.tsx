"use client";

import { useId } from "react";
import { Diagram } from "@/components/materi/kit";
import { tt } from "@/lib/lang";

/**
 * The two platforms of Day 2 (A, a benchmark, and B, LearnPro today), drawn in plain greys so the site's own blue, teal and rust never colour the
 * evidence (CLAUDE.md #49). Dark numbered markers point at the places the eight facts of Block 1.1 describe; they carry no label that says
 * whether something is good or bad. A marker is an annotation on the picture, not part of the mock platform.
 */
function Marker({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g aria-hidden>
      <circle cx={x} cy={y} r="10" fill="#17212E" />
      <text x={x} y={y + 4.5} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#FFFFFF">
        {n}
      </text>
    </g>
  );
}

export function PlatformScreens() {
  const uid = useId().replace(/:/g, "");
  const title = tt("Two schematic platforms: Platform A, a benchmark, and Platform B, LearnPro today", "Zwei schematische Plattformen: Plattform A, ein Benchmark, und Plattform B, LearnPro heute");
  const desc = tt(
    "Platform A: a bar with a course title and a progress bar, four unit rows each with a duration, and a quiz result. Platform B: one long column of text lines and a button back to the course list. Numbers 1 to 8 mark the places the eight facts describe.",
    "Plattform A: eine Leiste mit Kurstitel und Fortschrittsleiste, vier Einheitenzeilen mit je einer Dauer und ein Quizergebnis. Plattform B: eine lange Spalte mit Textzeilen und ein Button zurück zur Kursliste. Die Nummern 1 bis 8 markieren die Stellen, die die acht Fakten beschreiben.",
  );
  return (
    <Diagram label={tt("The two platforms, drawn in outline · Case assumption: the details are made up for this exercise", "Die beiden Plattformen in Umrissen · Fallannahme: Die Details sind für diese Übung erfunden")}>
      <svg viewBox="0 0 640 290" className="mx-auto h-auto w-full max-w-[640px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{title}</title>
        <desc id={`${uid}-d`}>{desc}</desc>

        {/* Platform A */}
        <rect x="8" y="8" width="304" height="236" rx="6" fill="#FFFFFF" stroke="#8793A3" strokeWidth="1.5" />
        <rect x="8" y="8" width="304" height="26" rx="6" fill="#E6ECF4" stroke="#8793A3" strokeWidth="1.5" />
        <text x="18" y="26" fontSize="12.5" fill="#17212E">{tt("Course · Step 2 of 6", "Kurs · Schritt 2 von 6")}</text>
        <rect x="18" y="42" width="240" height="8" rx="3" fill="#E6ECF4" stroke="#8793A3" />
        <rect x="18" y="42" width="80" height="8" rx="3" fill="#556274" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="18" y={62 + i * 32} width="240" height="26" rx="4" fill={i === 1 ? "#E6ECF4" : "#FFFFFF"} stroke="#8793A3" strokeWidth={i === 1 ? 2 : 1} />
            <text x="26" y={79 + i * 32} fontSize="12" fill="#17212E">{tt(`Unit ${i + 1} · 6 min`, `Einheit ${i + 1} · 6 Min.`)}</text>
          </g>
        ))}
        <text x="18" y="212" fontSize="12.5" fontWeight="700" fill="#17212E">{tt("Quiz: 4 of 5 correct.", "Quiz: 4 von 5 richtig.")}</text>
        <text x="18" y="229" fontSize="12" fill="#556274">{tt("Review question 2.", "Frage 2 wiederholen.")}</text>
        <Marker x={290} y={46} n={2} />
        <Marker x={290} y={102} n={1} />
        <Marker x={290} y={134} n={3} />
        <Marker x={290} y={216} n={4} />
        <text x="160" y="270" textAnchor="middle" fontSize="13" fontWeight="700" fill="#17212E">{tt("Platform A (a benchmark)", "Plattform A (ein Benchmark)")}</text>

        {/* Platform B */}
        <rect x="328" y="8" width="304" height="236" rx="6" fill="#FFFFFF" stroke="#8793A3" strokeWidth="1.5" />
        {Array.from({ length: 17 }, (_, i) => (
          <rect key={i} x="342" y={22 + i * 10.5} width={i % 6 === 5 ? 150 : 236} height="4.5" rx="2" fill="#8793A3" />
        ))}
        <rect x="342" y="212" width="130" height="22" rx="4" fill="#E6ECF4" stroke="#8793A3" />
        <text x="352" y="227" fontSize="11.5" fill="#556274">{tt("Back to course list", "Zurück zur Kursliste")}</text>
        <Marker x={610} y={30} n={5} />
        <Marker x={610} y={86} n={6} />
        <Marker x={610} y={142} n={7} />
        <Marker x={610} y={220} n={8} />
        <text x="480" y="270" textAnchor="middle" fontSize="13" fontWeight="700" fill="#17212E">{tt("Platform B (LearnPro today)", "Plattform B (LearnPro heute)")}</text>
      </svg>
    </Diagram>
  );
}
