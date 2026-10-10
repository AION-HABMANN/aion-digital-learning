"use client";

import { useId } from "react";
import type { ReactNode } from "react";
import { tt } from "@/lib/lang";

/**
 * Real pictures for Day 2 (CLAUDE.md #52). One example screen, LearnLoop's "course start", is drawn once per fidelity so the eye reads the difference:
 * a paper sketch (rough pencil strokes, handwriting, a taped sheet), a low-fidelity wireframe (plain grey boxes, a crossed image box), a clickable prototype
 * (the same boxes with tap points and linked screens behind), and a high-fidelity design (colour, type, shadow). The two platform mock screens of Card A1
 * are drawn the same way. Mock screens use their own colours, never the site's blue, teal and rust (#15, #49).
 */

export type Fidelity = "paper" | "wire" | "click" | "hifi";

const HAND = "'Segoe Print','Bradley Hand','Comic Sans MS','Chalkboard SE',cursive";
const INK = "#3A3A3A";

/** A slightly wobbly pencil line, deterministic so server and browser draw the same. */
function wob(x1: number, y1: number, x2: number, y2: number, k = 0) {
  const mx = (x1 + x2) / 2 + ((k * 7) % 3) - 1;
  const my = (y1 + y2) / 2 + ((k * 5) % 3) - 1;
  return `M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`;
}
function sketchRect(x: number, y: number, w: number, h: number, k: number) {
  return [wob(x, y, x + w, y + 1, k), wob(x + w, y + 1, x + w - 1, y + h, k + 1), wob(x + w - 1, y + h, x + 1, y + h - 1, k + 2), wob(x + 1, y + h - 1, x, y, k + 3)].join(" ");
}

const LESSONS = () => [tt("Basics", "Grundlagen"), tt("Planning", "Planung"), tt("Testing", "Testen")];

/**
 * The course-start screen at one fidelity. `moved` puts the Next button below the lesson list instead of in the top corner (the change Sofia makes in the
 * story of Card A2).
 */
export function CourseStartMock({ level, moved = false, className }: { level: Fidelity; moved?: boolean; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const L = LESSONS();
  const nextLabel = tt("Next", "Weiter");
  const title = tt("Course · UX basics", "Kurs · UX-Grundlagen");
  const nextPos = moved ? { x: 150, y: 128, w: 70, h: 24 } : { x: 168, y: 8, w: 56, h: 22 };
  const desc: Record<Fidelity, string> = {
    paper: tt("A hand-drawn paper sketch of the course start: a title, three lesson boxes and a Next button, drawn with a pencil.", "Eine handgezeichnete Papierskizze des Kursstarts: ein Titel, drei Lektionskästen und ein Weiter-Button, mit Bleistift gezeichnet."),
    wire: tt("A low-fidelity wireframe of the course start: a title bar, three grey lesson boxes with a crossed picture box and a grey Next button.", "Ein Low-Fidelity-Wireframe des Kursstarts: eine Titelleiste, drei graue Lektionskästen mit einem durchkreuzten Bildkasten und ein grauer Weiter-Button."),
    click: tt("A clickable prototype of the course start: the grey wireframe with tap points on the lesson and the Next button, and linked screens behind it.", "Ein klickbarer Prototyp des Kursstarts: das graue Wireframe mit Tippstellen auf Lektion und Weiter-Button und verknüpften Bildschirmen dahinter."),
    hifi: tt("A high-fidelity design of the course start: coloured header, rounded lesson cards with icons and durations, a progress bar and an orange Next button.", "Ein High-Fidelity-Design des Kursstarts: farbige Kopfleiste, abgerundete Lektionskarten mit Icons und Dauer, eine Fortschrittsleiste und ein oranger Weiter-Button."),
  };
  const names: Record<Fidelity, string> = { paper: tt("Sketch on paper", "Skizze auf Papier"), wire: tt("Low-fidelity wireframe", "Low-Fidelity-Wireframe"), click: tt("Clickable prototype", "Klickbarer Prototyp"), hifi: tt("High-fidelity design", "High-Fidelity-Design") };
  return (
    <svg viewBox="0 0 240 170" className={className ?? "h-auto w-full"} role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
      <title id={`${uid}-t`}>{names[level]}</title>
      <desc id={`${uid}-d`}>{desc[level]}</desc>
      {level === "paper" && (
        <g>
          <rect x="6" y="6" width="228" height="158" fill="#FBF8EE" stroke="#BDB59A" strokeWidth="1" />
          <rect x="0" y="0" width="30" height="12" fill="#E7DDB5" opacity="0.85" transform="rotate(-32 8 6)" />
          <rect x="210" y="0" width="30" height="12" fill="#E7DDB5" opacity="0.85" transform="rotate(32 232 6)" />
          <path d={sketchRect(16, 18, 150, 22, 1)} fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
          <text x="24" y="34" fontFamily={HAND} fontSize="12" fill={INK}>{title}</text>
          {!moved && (
            <g>
              <path d={sketchRect(nextPos.x, nextPos.y + 6, nextPos.w, nextPos.h, 5)} fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
              <text x={nextPos.x + 8} y={nextPos.y + 22} fontFamily={HAND} fontSize="12" fill={INK}>{nextLabel} →</text>
            </g>
          )}
          {L.map((x, i) => (
            <g key={x}>
              <path d={sketchRect(16, 52 + i * 26, 190, 20, 9 + i)} fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
              <text x="24" y={67 + i * 26} fontFamily={HAND} fontSize="11.5" fill={INK}>{`${i + 1}  ${x}`}</text>
            </g>
          ))}
          {moved && (
            <g>
              <path d={sketchRect(nextPos.x, nextPos.y + 4, nextPos.w, nextPos.h, 5)} fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
              <text x={nextPos.x + 8} y={nextPos.y + 20} fontFamily={HAND} fontSize="12" fill={INK}>{nextLabel} →</text>
            </g>
          )}
          <path d="M180 130 q8 -6 12 2" fill="none" stroke="#8A8A8A" strokeWidth="1" strokeDasharray="3 3" />
        </g>
      )}
      {(level === "wire" || level === "click") && (
        <g>
          {level === "click" && (
            <g>
              <rect x="18" y="18" width="216" height="146" rx="3" fill="#EDEDED" stroke="#B5B5B5" />
              <rect x="12" y="12" width="216" height="146" rx="3" fill="#F0F0F0" stroke="#A8A8A8" />
            </g>
          )}
          <rect x="6" y="6" width={level === "click" ? 216 : 228} height={level === "click" ? 146 : 158} rx="3" fill="#F6F6F6" stroke="#8E8E8E" strokeWidth="1.4" />
          <rect x="6" y="6" width={level === "click" ? 216 : 228} height="26" fill="#DADADA" stroke="#8E8E8E" strokeWidth="1.4" />
          <text x="14" y="23" fontFamily="system-ui,sans-serif" fontSize="10.5" fill="#555">{title}</text>
          {!moved && (
            <g>
              <rect x={nextPos.x - (level === "click" ? 12 : 0)} y={nextPos.y} width={nextPos.w} height={nextPos.h} fill="#BDBDBD" stroke="#7B7B7B" />
              <text x={nextPos.x - (level === "click" ? 12 : 0) + nextPos.w / 2} y={nextPos.y + 15} textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="10.5" fill="#333">{nextLabel}</text>
            </g>
          )}
          <rect x="14" y="40" width="40" height="30" fill="#E4E4E4" stroke="#9A9A9A" />
          <path d="M14 40 L54 70 M54 40 L14 70" stroke="#9A9A9A" />
          {L.map((x, i) => (
            <g key={x}>
              <rect x="62" y={40 + i * 28} width={level === "click" ? 150 : 162} height="22" fill="#E2E2E2" stroke="#9A9A9A" />
              <text x="70" y={55 + i * 28} fontFamily="system-ui,sans-serif" fontSize="10" fill="#555">{`${i + 1} · ${x}`}</text>
            </g>
          ))}
          <rect x="14" y="76" width="40" height="30" fill="#E4E4E4" stroke="#9A9A9A" />
          <rect x="14" y="112" width="40" height="30" fill="#E4E4E4" stroke="#9A9A9A" />
          {moved && (
            <g>
              <rect x={nextPos.x - (level === "click" ? 12 : 0)} y={nextPos.y} width={nextPos.w} height={nextPos.h} fill="#BDBDBD" stroke="#7B7B7B" />
              <text x={nextPos.x - (level === "click" ? 12 : 0) + nextPos.w / 2} y={nextPos.y + 15} textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="10.5" fill="#333">{nextLabel}</text>
            </g>
          )}
          {level === "click" && (
            <g>
              {[[190, 51], [moved ? 168 : 192, moved ? 140 : 19]].map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="9" fill="none" stroke="#222" strokeWidth="1.6" strokeDasharray="3 2" />
                  <circle cx={x} cy={y} r="2.4" fill="#222" />
                </g>
              ))}
              <path d="M196 56 l0 18 l5 -4 l4 9 l3 -1.5 l-4 -9 l6 -1 z" fill="#222" stroke="#FFF" strokeWidth="0.8" />
              <text x="140" y="164" fontFamily="system-ui,sans-serif" fontSize="9" fill="#555">{tt("tap → next screen", "tippen → nächster Bildschirm")}</text>
            </g>
          )}
        </g>
      )}
      {level === "hifi" && (
        <g>
          <defs>
            <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFF4E5" />
              <stop offset="1" stopColor="#FFFFFF" />
            </linearGradient>
            <linearGradient id={`${uid}-hd`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#4C2FBF" />
              <stop offset="1" stopColor="#7A4DE8" />
            </linearGradient>
          </defs>
          <rect x="6" y="6" width="228" height="158" rx="10" fill={`url(#${uid}-bg)`} stroke="#D9CFC0" />
          <path d="M6 16 a10 10 0 0 1 10 -10 h208 a10 10 0 0 1 10 10 v18 h-228 z" fill={`url(#${uid}-hd)`} />
          <text x="16" y="25" fontFamily="Georgia,serif" fontSize="12" fontWeight="700" fill="#FFFFFF">{title}</text>
          {!moved && (
            <g>
              <rect x="168" y="12" width="56" height="20" rx="10" fill="#F59E0B" />
              <text x="196" y="26" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="10.5" fontWeight="700" fill="#FFFFFF">{nextLabel} ›</text>
            </g>
          )}
          <rect x="16" y="42" width="208" height="6" rx="3" fill="#E9DFCE" />
          <rect x="16" y="42" width="70" height="6" rx="3" fill="#F59E0B" />
          {L.map((x, i) => (
            <g key={x}>
              <rect x="16" y={55 + i * 26 + 2} width="208" height="22" rx="8" fill="#E5DACB" opacity="0.7" />
              <rect x="16" y={55 + i * 26} width="208" height="22" rx="8" fill="#FFFFFF" stroke="#E6DCCB" />
              <circle cx="30" cy={66 + i * 26} r="7" fill={i === 0 ? "#7A4DE8" : "#C9B8F5"} />
              <path d={i === 0 ? `M27.5 ${66 + i * 26} l2 2 l4 -4` : `M28 ${64 + i * 26} h4`} fill="none" stroke="#FFF" strokeWidth="1.6" strokeLinecap="round" />
              <text x="44" y={70 + i * 26} fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="700" fill="#2B2340">{x}</text>
              <rect x="186" y={60 + i * 26} width="30" height="12" rx="6" fill="#EFE8FB" />
              <text x="201" y={69 + i * 26} textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="8.5" fill="#4C2FBF">{tt("6 min", "6 Min.")}</text>
            </g>
          ))}
          {moved && (
            <g>
              <rect x="150" y="134" width="74" height="24" rx="12" fill="#F59E0B" />
              <text x="187" y="150" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="700" fill="#FFFFFF">{nextLabel} ›</text>
            </g>
          )}
        </g>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ Card A1 · the two platforms, drawn */

/** A platform that shows the way (a path of steps, a progress bar, short units, a quiz result) or one long page that does not. */
export function PlatformMock({ kind }: { kind: "guided" | "flat" }) {
  const uid = useId().replace(/:/g, "");
  const guided = kind === "guided";
  const title = guided ? tt("A platform that shows the way", "Eine Plattform, die den Weg zeigt") : tt("A platform that makes the learner find it alone", "Eine Plattform, die die Lernende suchen lässt");
  const desc = guided
    ? tt("A course screen with a path of six steps and the current one marked, a progress bar, two short units with durations, a quiz result and a Next button.", "Ein Kursbildschirm mit einem Pfad aus sechs Schritten, der aktuelle markiert, einer Fortschrittsleiste, zwei kurzen Einheiten mit Dauer, einem Quizergebnis und einem Weiter-Button.")
    : tt("A course screen that is one long column of text with a scrollbar and a button back to the course list; no menu, no progress, no result.", "Ein Kursbildschirm, der aus einer langen Textspalte mit Scrollleiste und einem Button zurück zur Kursliste besteht; kein Menü, kein Fortschritt, kein Ergebnis.");
  return (
    <svg viewBox="0 0 260 200" className="h-auto w-full" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
      <title id={`${uid}-t`}>{title}</title>
      <desc id={`${uid}-d`}>{desc}</desc>
      <rect x="4" y="4" width="252" height="192" rx="6" fill="#FFFFFF" stroke="#8E8E8E" strokeWidth="1.4" />
      {guided ? (
        <g fontFamily="system-ui,sans-serif">
          <rect x="4" y="4" width="252" height="24" rx="6" fill="#E6E6E6" stroke="#8E8E8E" strokeWidth="1.4" />
          <text x="12" y="20" fontSize="10.5" fill="#444">{tt("Course · Step 2 of 6", "Kurs · Schritt 2 von 6")}</text>
          <rect x="12" y="34" width="236" height="6" rx="3" fill="#E1E1E1" />
          <rect x="12" y="34" width="79" height="6" rx="3" fill="#555" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              {i < 5 && <line x1={30 + i * 40} y1="58" x2={50 + i * 40} y2="58" stroke="#9A9A9A" strokeWidth="2" />}
              <circle cx={30 + i * 40} cy="58" r={i === 1 ? 9 : 7} fill={i <= 1 ? "#555" : "#FFFFFF"} stroke={i === 1 ? "#111" : "#8E8E8E"} strokeWidth={i === 1 ? 2.4 : 1.4} />
              <text x={30 + i * 40} y="62" textAnchor="middle" fontSize="9" fill={i <= 1 ? "#FFF" : "#555"}>{i + 1}</text>
            </g>
          ))}
          {[0, 1].map((i) => (
            <g key={i}>
              <rect x="12" y={78 + i * 34} width="170" height="28" rx="4" fill={i === 0 ? "#EDEDED" : "#FFFFFF"} stroke="#9A9A9A" strokeWidth={i === 0 ? 1.8 : 1} />
              <text x="20" y={92 + i * 34} fontSize="10.5" fontWeight="700" fill="#333">{tt(`Unit ${i + 2} · 6 min`, `Einheit ${i + 2} · 6 Min.`)}</text>
              <text x="20" y={102 + i * 34} fontSize="8.5" fill="#666">{tt("One goal: ", "Ein Ziel: ")}{i === 0 ? tt("plan a test", "einen Test planen") : tt("run a test", "einen Test durchführen")}</text>
            </g>
          ))}
          <rect x="192" y="78" width="56" height="28" rx="4" fill="#444" />
          <text x="220" y="96" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#FFF">{tt("Next →", "Weiter →")}</text>
          <rect x="12" y="152" width="236" height="34" rx="4" fill="#F1F1F1" stroke="#B0B0B0" />
          <text x="20" y="167" fontSize="10.5" fontWeight="700" fill="#333">{tt("Quiz: 4 of 5 correct", "Quiz: 4 von 5 richtig")}</text>
          <text x="20" y="179" fontSize="9" fill="#666">{tt("Review question 2", "Frage 2 wiederholen")}</text>
        </g>
      ) : (
        <g fontFamily="system-ui,sans-serif">
          {Array.from({ length: 19 }, (_, i) => (
            <rect key={i} x="14" y={14 + i * 8.6} width={i % 6 === 5 ? 130 : 210} height="4" rx="2" fill="#9A9A9A" />
          ))}
          <rect x="238" y="12" width="10" height="150" rx="5" fill="#EAEAEA" stroke="#B5B5B5" />
          <rect x="239.5" y="14" width="7" height="20" rx="3.5" fill="#8E8E8E" />
          <rect x="14" y="170" width="120" height="20" rx="4" fill="#EDEDED" stroke="#9A9A9A" />
          <text x="22" y="184" fontSize="9.5" fill="#555">{tt("Back to course list", "Zurück zur Kursliste")}</text>
        </g>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ approach thumbnails for the task options */

/** A small picture of what a prototype approach produces, so the learner chooses by looking (CLAUDE.md #52). */
export function ApproachThumb({ kind }: { kind: "paper" | "click" | "hifi" | "engine" | "build" }): ReactNode {
  if (kind === "paper") return <CourseStartMock level="paper" className="h-auto w-full" />;
  if (kind === "click") return <CourseStartMock level="click" className="h-auto w-full" />;
  if (kind === "hifi") return <CourseStartMock level="hifi" className="h-auto w-full" />;
  const steps = kind === "engine" ? [tt("data", "Daten"), tt("engine", "Engine"), tt("platform", "Plattform")] : [tt("build", "Bauen"), tt("launch", "Start"), tt("test?", "Test?")];
  return (
    <svg viewBox="0 0 240 170" className="h-auto w-full" role="img" aria-label={kind === "engine" ? tt("Data flows into an engine and then into the platform", "Daten fließen in eine Engine und dann in die Plattform") : tt("Build, then launch, and only then test", "Bauen, dann starten und erst dann testen")}>
      <rect x="6" y="6" width="228" height="158" rx="6" fill="#F6F6F6" stroke="#8E8E8E" />
      {steps.map((s, i) => (
        <g key={s}>
          <rect x={14 + i * 76} y="62" width="62" height="42" rx="5" fill={i === 1 && kind === "engine" ? "#BDBDBD" : "#E2E2E2"} stroke="#7B7B7B" strokeDasharray={kind === "build" && i === 2 ? "4 3" : undefined} />
          <text x={45 + i * 76} y="88" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="11" fill="#333">{s}</text>
          {i < 2 && <path d={`M${78 + i * 76} 83 h10`} stroke="#555" strokeWidth="2" />}
        </g>
      ))}
    </svg>
  );
}
