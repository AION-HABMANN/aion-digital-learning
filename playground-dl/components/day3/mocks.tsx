"use client";

import { useId } from "react";
import type { ReactNode } from "react";
import { Diagram } from "@/components/materi/kit";
import { tt } from "@/lib/lang";

/**
 * Real pictures for Day 3 (CLAUDE.md #52). A lesson page is drawn the way it looks: a wall of text with a banner, a chat window and a nine-entry menu, against
 * a clean page with one heading, three short paragraphs, a diagram and a question; a flat page against one with a visual hierarchy; the four typical UX
 * mistakes as four small screens; the nine and seven measures of the two tasks as small thumbnails. The memory flow, the three levels of learning and the two
 * lenses of Materi B are drawn as pictures, not as boxes with a sentence in each. Mock screens use their own neutral greys, never the site's blue, teal and
 * rust (#15, #49).
 */

const BG = "#F6F6F6";
const LINE = "#8E8E8E";
const DARK = "#3A3A3A";
const MID = "#BDBDBD";
const LITE = "#E2E2E2";
const TXT = "#333333";
const FONT = "system-ui,sans-serif";

function Svg({ viewBox, label, desc, className, children }: { viewBox: string; label: string; desc?: string; className?: string; children: ReactNode }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox={viewBox} className={className ?? "h-auto w-full"} role="img" aria-labelledby={desc ? `${uid}-t ${uid}-d` : `${uid}-t`}>
      <title id={`${uid}-t`}>{label}</title>
      {desc && <desc id={`${uid}-d`}>{desc}</desc>}
      {children}
    </svg>
  );
}

function Lines({ x, y, n, w, gap = 7, h = 3.4, fill = LINE, short = 0.6 }: { x: number; y: number; n: number; w: number; gap?: number; h?: number; fill?: string; short?: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={x} y={y + i * gap} width={i === n - 1 ? w * short : w} height={h} rx={h / 2} fill={fill} />
      ))}
    </>
  );
}

function Arrow({ x1, y1, x2, y2, color = DARK, dash }: { x1: number; y1: number; x2: number; y2: number; color?: string; dash?: string }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const s = 5;
  const p = (da: number) => `${x2 - s * Math.cos(a + da)},${y2 - s * Math.sin(a + da)}`;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2 - 2 * Math.cos(a)} y2={y2 - 2 * Math.sin(a)} stroke={color} strokeWidth="1.8" strokeDasharray={dash} />
      <polygon points={`${x2},${y2} ${p(0.45)} ${p(-0.45)}`} fill={color} />
    </g>
  );
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <>
      <rect x="4" y="4" width="232" height="162" rx="6" fill="#FFFFFF" stroke={LINE} strokeWidth="1.5" />
      <rect x="4" y="4" width="232" height="12" rx="6" fill={LITE} stroke={LINE} strokeWidth="1.5" />
      {children}
    </>
  );
}

function Txt({ x, y, size = 8, bold, anchor = "start", fill = TXT, children }: { x: number; y: number; size?: number; bold?: boolean; anchor?: "start" | "middle" | "end"; fill?: string; children: string }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={bold ? 700 : 400} textAnchor={anchor} fontFamily={FONT} fill={fill}>
      {children}
    </text>
  );
}

/* ------------------------------------------------------------------ a lesson page, four ways */

export type PageKind = "wall" | "clean" | "flat" | "hier";

/** One lesson page of LearnLoop, 240 × 170. */
export function LessonPage({ kind, className }: { kind: PageKind; className?: string }) {
  const label =
    kind === "wall"
      ? tt("A lesson page with a menu of nine entries, a news banner, a block of 500 words and a chat window", "Eine Lektionsseite mit einem Menü aus neun Einträgen, einem News-Banner, einem Block von 500 Wörtern und einem Chat-Fenster")
      : kind === "clean"
        ? tt("A lesson page with one heading, three short paragraphs, a diagram and a question", "Eine Lektionsseite mit einer Überschrift, drei kurzen Absätzen, einem Diagramm und einer Frage")
        : kind === "flat"
          ? tt("A lesson page where every line looks the same", "Eine Lektionsseite, auf der jede Zeile gleich aussieht")
          : tt("A lesson page with a large heading, a marked key sentence, quiet body text and one main button", "Eine Lektionsseite mit großer Überschrift, markiertem Kernsatz, ruhigem Fließtext und einem Haupt-Button");
  return (
    <Svg viewBox="0 0 240 170" label={label} className={className ?? "h-auto w-full"}>
      <Frame>
        {kind === "wall" && (
          <>
            <rect x="8" y="20" width="36" height="142" rx="3" fill="#F0F0F0" stroke={MID} />
            {Array.from({ length: 9 }, (_, i) => (
              <rect key={i} x="12" y={25 + i * 14.5} width="28" height="7" rx="2" fill="#9A9A9A" />
            ))}
            <rect x="50" y="20" width="118" height="16" rx="3" fill="#D0D0D0" stroke={LINE} />
            <Txt x={56} y={31} size={7.5} bold>{tt("NEWS · 12 new courses", "NEWS · 12 neue Kurse")}</Txt>
            <Lines x={50} y={42} n={16} w={118} gap={7.2} />
            <rect x="174" y="20" width="58" height="34" rx="3" fill="#E9E9E9" stroke={LINE} />
            <Txt x={178} y={30} size={7}>{tt("Recommended", "Empfohlen")}</Txt>
            <rect x="178" y="35" width="22" height="14" rx="2" fill={MID} />
            <rect x="204" y="35" width="24" height="14" rx="2" fill={MID} />
            <rect x="174" y="100" width="58" height="62" rx="4" fill={LITE} stroke={LINE} />
            <rect x="174" y="100" width="58" height="11" rx="4" fill={MID} />
            <Txt x={178} y={108} size={7} bold>Chat</Txt>
            <rect x="178" y="116" width="36" height="12" rx="5" fill="#FFFFFF" stroke={LINE} />
            <rect x="192" y="133" width="36" height="12" rx="5" fill="#9A9A9A" />
            <rect x="178" y="150" width="30" height="8" rx="4" fill="#FFFFFF" stroke={LINE} />
          </>
        )}
        {kind === "clean" && (
          <>
            <Txt x={14} y={32} size={12} bold>{tt("Contract basics", "Vertragsgrundlagen")}</Txt>
            <Lines x={14} y={42} n={3} w={118} gap={6.6} />
            <Lines x={14} y={66} n={3} w={118} gap={6.6} />
            <Lines x={14} y={90} n={2} w={118} gap={6.6} />
            <rect x="142" y="38" width="38" height="20" rx="3" fill={LITE} stroke={LINE} />
            <rect x="190" y="38" width="38" height="20" rx="3" fill={LITE} stroke={LINE} />
            <rect x="166" y="74" width="38" height="20" rx="3" fill={MID} stroke={LINE} />
            <Arrow x1={161} y1={58} x2={178} y2={73} />
            <Arrow x1={209} y1={58} x2={194} y2={73} />
            <Txt x={185} y={106} size={7} anchor="middle" fill="#555555">{tt("the clause, drawn", "die Klausel, gezeichnet")}</Txt>
            <rect x="14" y="116" width="168" height="42" rx="4" fill="#F0F0F0" stroke={MID} />
            <Txt x={22} y={129} size={8.5} bold>{tt("Which party pays?", "Wer zahlt?")}</Txt>
            <circle cx="26" cy="140" r="3.4" fill="#FFFFFF" stroke={LINE} />
            <rect x="34" y="138" width="60" height="4" rx="2" fill={MID} />
            <circle cx="26" cy="151" r="3.4" fill="#FFFFFF" stroke={LINE} />
            <rect x="34" y="149" width="76" height="4" rx="2" fill={MID} />
            <rect x="192" y="138" width="36" height="16" rx="4" fill={DARK} />
            <Txt x={210} y={149} size={8} anchor="middle" fill="#FFFFFF">{tt("Next", "Weiter")}</Txt>
          </>
        )}
        {kind === "flat" && (
          <>
            <Lines x={14} y={24} n={14} w={212} gap={8.2} />
            <rect x="150" y="144" width="36" height="14" rx="3" fill={LITE} stroke={LINE} />
            <rect x="192" y="144" width="36" height="14" rx="3" fill={LITE} stroke={LINE} />
          </>
        )}
        {kind === "hier" && (
          <>
            <rect x="14" y="24" width="104" height="11" rx="2" fill={DARK} />
            <rect x="14" y="42" width="212" height="16" rx="2" fill="#EDEDED" />
            <rect x="14" y="42" width="3" height="16" fill={DARK} />
            <rect x="23" y="48" width="170" height="4.5" rx="2" fill={DARK} />
            <Lines x={14} y={68} n={8} w={196} gap={8} fill="#B8B8B8" />
            <rect x="106" y="142" width="56" height="16" rx="4" fill="#FFFFFF" stroke={LINE} />
            <Txt x={134} y={153} size={8} anchor="middle" fill="#777777">{tt("Back", "Zurück")}</Txt>
            <rect x="170" y="142" width="56" height="16" rx="4" fill={DARK} />
            <Txt x={198} y={153} size={8} anchor="middle" fill="#FFFFFF">{tt("Next", "Weiter")}</Txt>
          </>
        )}
      </Frame>
    </Svg>
  );
}

/** Card A2: the same lesson as two pages, so the bar below has something to be the bar of. */
export function LoadPages({ mode, onPick }: { mode: "over" | "redesigned"; onPick: (m: "over" | "redesigned") => void }) {
  const items: ["over" | "redesigned", PageKind, string, string][] = [
    ["over", "wall", tt("Overloaded", "Überlastet"), tt("menu, banner, chat, a block of text", "Menü, Banner, Chat, ein Textblock")],
    ["redesigned", "clean", tt("Redesigned", "Neu gestaltet"), tt("one heading, short parts, a diagram, a question", "eine Überschrift, kurze Teile, ein Diagramm, eine Frage")],
  ];
  return (
    <div className="mx-auto grid max-w-[560px] grid-cols-2 gap-3">
      {items.map(([id, kind, name, what]) => (
        <button
          key={id}
          type="button"
          aria-pressed={mode === id}
          onClick={() => onPick(id)}
          className={`rounded-lg border-2 p-2 text-left ${mode === id ? "border-accent bg-accentSoft" : "border-line bg-paper hover:border-ash"}`}
        >
          <LessonPage kind={kind} />
          <span className="mt-1.5 block text-caption font-bold text-ink">{name}</span>
          <span className="block text-micro normal-case tracking-normal text-ash">{what}</span>
        </button>
      ))}
    </div>
  );
}

/** Card A3: a flat page against a page with a visual hierarchy. */
export function HierarchyPair() {
  return (
    <Diagram
      label={tt("Visual hierarchy: the same lesson page, flat and with a hierarchy", "Visuelle Hierarchie: dieselbe Lektionsseite, flach und mit Hierarchie")}
      caption={tt("Size, contrast and position tell the eye where to start. On the left nothing is first; on the right the heading, then the marked key sentence, then the body, and one main button.", "Größe, Kontrast und Position sagen dem Auge, wo es beginnen soll. Links ist nichts zuerst; rechts kommen die Überschrift, dann der markierte Kernsatz, dann der Fließtext und ein Haupt-Button.")}
    >
      <div className="mx-auto grid max-w-[560px] grid-cols-2 gap-3">
        <div>
          <LessonPage kind="flat" />
          <p className="mt-1.5 text-caption font-bold text-ink">{tt("Flat", "Flach")}</p>
          <p className="text-micro normal-case tracking-normal text-ash">{tt("every line looks the same", "jede Zeile sieht gleich aus")}</p>
        </div>
        <div>
          <LessonPage kind="hier" />
          <p className="mt-1.5 text-caption font-bold text-ink">{tt("With a hierarchy", "Mit Hierarchie")}</p>
          <p className="text-micro normal-case tracking-normal text-ash">{tt("heading, key sentence, body, one main button", "Überschrift, Kernsatz, Fließtext, ein Haupt-Button")}</p>
        </div>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A4 · four typical UX mistakes, as four small screens */

type Mistake = "overload" | "structure" | "feedback" | "navigation";

function MistakeMock({ kind }: { kind: Mistake }) {
  const label =
    kind === "overload"
      ? tt("A screen with many things competing at once", "Ein Bildschirm, auf dem viele Dinge zugleich konkurrieren")
      : kind === "structure"
        ? tt("A screen with one long block of text and no structure", "Ein Bildschirm mit einem langen Textblock ohne Struktur")
        : kind === "feedback"
          ? tt("A quiz screen where pressing Submit shows no result", "Ein Quiz-Bildschirm, auf dem „Absenden“ kein Ergebnis zeigt")
          : tt("A screen where the way to the lesson leads through five menu levels", "Ein Bildschirm, auf dem der Weg zur Lektion durch fünf Menüebenen führt");
  const scatter: [number, number, number, number][] = [[12, 22, 40, 22], [58, 20, 26, 34], [90, 24, 50, 14], [146, 20, 38, 38], [190, 24, 38, 18], [14, 52, 28, 28], [48, 62, 56, 16], [110, 50, 30, 26], [150, 66, 34, 22], [190, 52, 36, 36], [16, 90, 54, 20], [76, 86, 36, 34], [118, 88, 44, 18], [168, 98, 58, 22], [20, 120, 46, 30], [74, 128, 70, 14], [150, 126, 32, 28], [188, 128, 40, 24]];
  return (
    <Svg viewBox="0 0 240 170" label={label}>
      <Frame>
        {kind === "overload" &&
          scatter.map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill={i % 3 === 0 ? MID : i % 3 === 1 ? LITE : "#D0D0D0"} stroke={LINE} />)}
        {kind === "structure" && <Lines x={12} y={24} n={17} w={216} gap={8.2} />}
        {kind === "feedback" && (
          <>
            <Txt x={14} y={34} size={9} bold>{tt("Which party pays?", "Wer zahlt?")}</Txt>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <circle cx="20" cy={50 + i * 14} r="3.6" fill="#FFFFFF" stroke={LINE} />
                <rect x="30" y={48 + i * 14} width={70 + i * 14} height="4" rx="2" fill={MID} />
              </g>
            ))}
            <rect x="14" y="98" width="52" height="16" rx="4" fill={DARK} />
            <Txt x={40} y={109} size={8} anchor="middle" fill="#FFFFFF">{tt("Submit", "Absenden")}</Txt>
            <rect x="84" y="94" width="144" height="60" rx="4" fill="#FFFFFF" stroke={LINE} strokeDasharray="4 3" />
            <Txt x={156} y={130} size={20} bold anchor="middle" fill={MID}>?</Txt>
          </>
        )}
        {kind === "navigation" && (
          <>
            <Txt x={12} y={30} size={7.5}>{tt("Home › Courses › Area › Module › Unit › Lesson 7", "Start › Kurse › Bereich › Modul › Einheit › Lektion 7")}</Txt>
            {Array.from({ length: 6 }, (_, i) => (
              <g key={i}>
                <rect x={12 + i * 14} y={40 + i * 19} width={92} height="14" rx="3" fill={i === 5 ? DARK : LITE} stroke={LINE} />
                {i < 5 && <Arrow x1={104 + i * 14 - 8} y1={47 + i * 19} x2={104 + i * 14 + 6} y2={47 + i * 19} color="#777777" />}
              </g>
            ))}
          </>
        )}
      </Frame>
    </Svg>
  );
}

export function MistakesPicture() {
  const items: [Mistake, string, string][] = [
    ["overload", tt("Information overload", "Informationsüberflutung"), tt("many things compete at once", "viele Dinge konkurrieren zugleich")],
    ["structure", tt("Unclear structure", "Unklare Struktur"), tt("one block, no headings", "ein Block, keine Überschriften")],
    ["feedback", tt("Missing feedback", "Fehlendes Feedback"), tt("an answer, and no result", "eine Antwort, und kein Ergebnis")],
    ["navigation", tt("Complex navigation", "Komplexe Navigation"), tt("five levels to reach one lesson", "fünf Ebenen bis zu einer Lektion")],
  ];
  return (
    <Diagram
      label={tt("Four typical UX mistakes, each drawn as a screen", "Vier typische UX-Fehler, jeweils als Bildschirm gezeichnet")}
      caption={tt("Each screen is the same lesson platform with one mistake. The table below says what each does in the learner's head and how to reduce it.", "Jeder Bildschirm ist dieselbe Lernplattform mit einem Fehler. Die Tabelle darunter sagt, was jeder im Kopf der Lernenden bewirkt und wie man ihn verringert.")}
    >
      <div className="mx-auto grid max-w-[560px] grid-cols-2 gap-3">
        {items.map(([k, name, what]) => (
          <div key={k}>
            <MistakeMock kind={k} />
            <p className="mt-1.5 text-caption font-bold text-ink">{name}</p>
            <p className="text-micro normal-case tracking-normal text-ash">{what}</p>
          </div>
        ))}
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ thumbnails for the measures of the cards and the two tasks */

export type MeasureKind = "chunk" | "visual" | "structure" | "extras" | "outline" | "points" | "brand" | "chatbot" | "library" | "standard" | "testing" | "cut" | "feedback" | "summary" | "rebuild";

function MiniPage({ x, y, w, h, n = 0, fill = "#FFFFFF" }: { x: number; y: number; w: number; h: number; n?: number; fill?: string }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx="3" fill={fill} stroke={LINE} />
      {n > 0 && <Lines x={x + 5} y={y + 7} n={n} w={w - 10} gap={Math.min(7, (h - 12) / n)} h={3} />}
    </>
  );
}

export function MeasureThumb({ kind }: { kind: MeasureKind }) {
  const labels: Record<MeasureKind, string> = {
    chunk: tt("A long lesson split into three short units", "Eine lange Lektion, in drei kurze Einheiten geteilt"),
    visual: tt("A block of text replaced by a diagram", "Ein Textblock, durch ein Diagramm ersetzt"),
    structure: tt("A page with a heading, a marked key sentence and short paragraphs", "Eine Seite mit Überschrift, markiertem Kernsatz und kurzen Absätzen"),
    extras: tt("A lesson page with the banner and the chat window taken away", "Eine Lektionsseite ohne Banner und ohne Chat-Fenster"),
    outline: tt("A goal at the top and three modules in order below it", "Ein Ziel oben und darunter drei Module in Reihenfolge"),
    points: tt("A points total that goes up for every lesson opened", "Eine Punktzahl, die für jede geöffnete Lektion steigt"),
    brand: tt("Colour swatches and two font samples: a new look", "Farbfelder und zwei Schriftproben: ein neues Aussehen"),
    chatbot: tt("A question and the answer of a chatbot", "Eine Frage und die Antwort eines Chatbots"),
    library: tt("A stack of background articles", "Ein Stapel Hintergrundartikel"),
    standard: tt("A checklist for every lesson and a reviewer", "Eine Checkliste für jede Lektion und eine Prüferin"),
    testing: tt("Five beginners testing one lesson page", "Fünf Einsteiger testen eine Lektionsseite"),
    cut: tt("A lesson page with its last third cut off", "Eine Lektionsseite, deren letztes Drittel abgeschnitten ist"),
    feedback: tt("The end of a lesson with a result and a next step", "Das Ende einer Lektion mit Ergebnis und nächstem Schritt"),
    summary: tt("A long lesson shortened by an AI button", "Eine lange Lektion, durch einen KI-Button verkürzt"),
    rebuild: tt("Ten lesson pages rebuilt", "Zehn Lektionsseiten neu aufgebaut"),
  };
  return (
    <Svg viewBox="0 0 200 110" label={labels[kind]}>
      <rect x="1" y="1" width="198" height="108" rx="5" fill={BG} stroke={MID} />
      {kind === "chunk" && (
        <>
          <MiniPage x={10} y={8} w={56} h={94} n={10} />
          <Arrow x1={70} y1={55} x2={88} y2={55} />
          {[92, 128, 164].map((x, i) => (
            <g key={x}>
              <MiniPage x={x} y={30} w={32} h={42} n={3} />
              <Txt x={x + 16} y={86} size={9} bold anchor="middle">{String(i + 1)}</Txt>
            </g>
          ))}
          <Txt x={146} y={100} size={8} anchor="middle" fill="#555555">{tt("5–7 min each", "je 5–7 Min.")}</Txt>
        </>
      )}
      {kind === "visual" && (
        <>
          <MiniPage x={10} y={8} w={70} h={94} n={10} />
          <Arrow x1={86} y1={55} x2={104} y2={55} />
          <rect x="112" y="16" width="34" height="22" rx="3" fill={LITE} stroke={LINE} />
          <rect x="154" y="16" width="34" height="22" rx="3" fill={LITE} stroke={LINE} />
          <rect x="132" y="68" width="34" height="22" rx="3" fill={MID} stroke={LINE} />
          <Arrow x1={129} y1={38} x2={143} y2={66} />
          <Arrow x1={171} y1={38} x2={157} y2={66} />
        </>
      )}
      {kind === "structure" && (
        <>
          <MiniPage x={40} y={6} w={120} h={98} />
          <rect x="50" y="14" width="56" height="8" rx="2" fill={DARK} />
          <rect x="50" y="28" width="100" height="10" rx="2" fill="#EDEDED" />
          <rect x="50" y="28" width="3" height="10" fill={DARK} />
          <rect x="57" y="31.5" width="80" height="3.4" rx="2" fill={DARK} />
          <Lines x={50} y={46} n={3} w={100} gap={6} fill="#B8B8B8" h={3} />
          <Lines x={50} y={68} n={3} w={100} gap={6} fill="#B8B8B8" h={3} />
          <Lines x={50} y={90} n={1} w={100} gap={6} fill="#B8B8B8" h={3} short={0.5} />
        </>
      )}
      {kind === "extras" && (
        <>
          <MiniPage x={46} y={6} w={108} h={98} n={11} />
          <rect x="6" y="10" width="76" height="14" rx="3" fill="none" stroke={MID} strokeDasharray="4 3" />
          <line x1="10" y1="12" x2="78" y2="22" stroke={LINE} strokeWidth="1.6" />
          <line x1="78" y1="12" x2="10" y2="22" stroke={LINE} strokeWidth="1.6" />
          <rect x="132" y="62" width="62" height="40" rx="4" fill="none" stroke={MID} strokeDasharray="4 3" />
          <line x1="138" y1="68" x2="188" y2="96" stroke={LINE} strokeWidth="1.6" />
          <line x1="188" y1="68" x2="138" y2="96" stroke={LINE} strokeWidth="1.6" />
        </>
      )}
      {kind === "outline" && (
        <>
          <rect x="60" y="6" width="80" height="20" rx="4" fill={DARK} />
          <Txt x={100} y={20} size={9} anchor="middle" fill="#FFFFFF" bold>{tt("Goal", "Ziel")}</Txt>
          {[16, 76, 136].map((x, i) => (
            <g key={x}>
              <line x1={100} y1={26} x2={x + 24} y2={44} stroke={LINE} strokeWidth="1.4" />
              <rect x={x} y={44} width={48} height={22} rx="3" fill={LITE} stroke={LINE} />
              <Txt x={x + 24} y={59} size={9} anchor="middle" bold>{String(i + 1)}</Txt>
              <Lines x={x + 6} y={74} n={3} w={36} gap={8} h={3.4} fill={MID} short={0.7} />
            </g>
          ))}
          <Arrow x1={64} y1={55} x2={74} y2={55} color="#777777" />
          <Arrow x1={124} y1={55} x2={134} y2={55} color="#777777" />
        </>
      )}
      {kind === "points" && (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="12" y={14 + i * 30} width="92" height="22" rx="3" fill="#FFFFFF" stroke={LINE} />
              <rect x="20" y={22 + i * 30} width="50" height="4" rx="2" fill={MID} />
              <circle cx="90" cy={25 + i * 30} r="6" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
              <path d={`M86.5 ${25 + i * 30} l2.6 2.8 l4.6 -5.4`} fill="none" stroke={DARK} strokeWidth="1.6" strokeLinecap="round" />
            </g>
          ))}
          <circle cx="152" cy="46" r="28" fill={LITE} stroke={DARK} strokeWidth="2" />
          <Txt x={152} y={52} size={17} bold anchor="middle">+30</Txt>
          <Txt x={152} y={92} size={8.5} anchor="middle" fill="#555555">{tt("points", "Punkte")}</Txt>
        </>
      )}
      {kind === "brand" && (
        <>
          {["#3A3A3A", "#8E8E8E", "#BDBDBD", "#E2E2E2"].map((c, i) => (
            <rect key={c} x={14 + i * 24} y={14} width="20" height="30" rx="4" fill={c} stroke={LINE} />
          ))}
          <Txt x={22} y={86} size={30} bold>Aa</Txt>
          <text x={102} y={86} fontSize="30" fontFamily="Georgia,serif" fill={TXT}>Aa</text>
          <rect x="116" y="18" width="70" height="22" rx="11" fill={DARK} />
          <Txt x={151} y={33} size={9} anchor="middle" fill="#FFFFFF">{tt("Start", "Start")}</Txt>
        </>
      )}
      {kind === "chatbot" && (
        <>
          <rect x="14" y="12" width="104" height="26" rx="8" fill="#FFFFFF" stroke={LINE} />
          <Txt x={22} y={29} size={8.5}>{tt("What is a clause?", "Was ist eine Klausel?")}</Txt>
          <rect x="62" y="48" width="124" height="44" rx="8" fill={DARK} />
          <Lines x={72} y={58} n={3} w={104} gap={8} h={3.6} fill="#D9D9D9" short={0.6} />
          <rect x="14" y="68" width="30" height="26" rx="5" fill={LITE} stroke={LINE} />
          <circle cx="23" cy="78" r="2.6" fill={DARK} />
          <circle cx="35" cy="78" r="2.6" fill={DARK} />
          <rect x="22" y="86" width="14" height="2.6" rx="1.3" fill={DARK} />
        </>
      )}
      {kind === "library" && (
        <>
          {[3, 2, 1, 0].map((i) => (
            <g key={i}>
              <rect x={16 + i * 16} y={10 + i * 10} width="104" height="60" rx="3" fill="#FFFFFF" stroke={LINE} />
              {i === 0 && <Lines x={26} y={20} n={6} w={84} gap={8} h={3.4} />}
            </g>
          ))}
          <Txt x={195} y={104} size={14} bold anchor="end" fill={LINE}>+ 40</Txt>
        </>
      )}
      {kind === "standard" && (
        <>
          <rect x="10" y="8" width="108" height="94" rx="4" fill="#FFFFFF" stroke={LINE} />
          {[tt("one goal", "ein Ziel"), tt("fits the time", "passt zur Zeit"), tt("key sentence", "Kernsatz"), tt("terms explained", "Begriffe erklärt")].map((s, i) => (
            <g key={s}>
              <rect x="18" y={18 + i * 21} width="10" height="10" rx="2" fill="#FFFFFF" stroke={DARK} strokeWidth="1.4" />
              <path d={`M20 ${23 + i * 21} l2.6 2.8 l4.4 -5.2`} fill="none" stroke={DARK} strokeWidth="1.5" strokeLinecap="round" />
              <Txt x={34} y={27 + i * 21} size={8}>{s}</Txt>
            </g>
          ))}
          <circle cx="156" cy="38" r="11" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <path d="M156 49 v26 M142 60 h28 M156 75 l-10 22 M156 75 l10 22" fill="none" stroke={DARK} strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {kind === "testing" && (
        <>
          <MiniPage x={62} y={6} w={76} h={46} n={5} />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <circle cx={26 + i * 37} cy={82} r="8" fill="#FFFFFF" stroke={DARK} strokeWidth="1.5" />
              <path d={`M${26 + i * 37} 90 v10`} stroke={DARK} strokeWidth="1.6" />
              <line x1={26 + i * 37} y1={72} x2={100} y2={52} stroke={MID} strokeWidth="1" strokeDasharray="3 3" />
            </g>
          ))}
        </>
      )}
      {kind === "cut" && (
        <>
          <MiniPage x={50} y={6} w={100} h={98} n={12} />
          <rect x="51" y="70" width="98" height="33" rx="2" fill="#F6F6F6" opacity="0.85" />
          <line x1="40" y1="70" x2="160" y2="70" stroke={DARK} strokeWidth="1.6" strokeDasharray="5 3" />
          <Txt x={164} y={74} size={9} bold>{tt("cut", "weg")}</Txt>
        </>
      )}
      {kind === "feedback" && (
        <>
          <MiniPage x={14} y={8} w={172} h={94} />
          <Lines x={24} y={18} n={3} w={150} gap={7} h={3.4} />
          <rect x="24" y="48" width="70" height="22" rx="3" fill={LITE} stroke={LINE} />
          <Txt x={59} y={63} size={9.5} bold anchor="middle">{tt("3 of 4", "3 von 4")}</Txt>
          <rect x="104" y="48" width="70" height="22" rx="3" fill="#FFFFFF" stroke={LINE} strokeDasharray="3 3" />
          <Txt x={139} y={63} size={8} anchor="middle">{tt("Review Q 2", "Frage 2 ansehen")}</Txt>
          <rect x="112" y="78" width="62" height="18" rx="4" fill={DARK} />
          <Txt x={143} y={90} size={8.5} anchor="middle" fill="#FFFFFF">{tt("Next step", "Nächster Schritt")}</Txt>
        </>
      )}
      {kind === "summary" && (
        <>
          <MiniPage x={8} y={8} w={64} h={94} n={10} />
          <Arrow x1={76} y1={55} x2={92} y2={55} />
          <circle cx="110" cy="55" r="15" fill={DARK} />
          <Txt x={110} y={59} size={10} bold anchor="middle" fill="#FFFFFF">AI</Txt>
          <Arrow x1={128} y1={55} x2={144} y2={55} />
          <MiniPage x={148} y={34} w={44} h={42} n={3} />
        </>
      )}
      {kind === "rebuild" && (
        <>
          {[12, 62, 112].map((x) => (
            <g key={x}>
              <MiniPage x={x} y={18} w={40} h={58} n={4} />
              <circle cx={x + 32} cy={70} r="6" fill="#FFFFFF" stroke={DARK} strokeWidth="1.5" />
              <path d={`M${x + 29} 70 l2.2 2.4 l3.8 -4.4`} fill="none" stroke={DARK} strokeWidth="1.5" strokeLinecap="round" />
            </g>
          ))}
          <Txt x={176} y={62} size={20} bold anchor="middle">×10</Txt>
        </>
      )}
    </Svg>
  );
}

/** Card A5: LearnLoop's three ideas, drawn, before they are rated. */
export function ThreeIdeas() {
  const items: [MeasureKind, string][] = [
    ["cut", tt("A · Shorten a lot", "A · Stark kürzen")],
    ["visual", tt("B · Add diagrams", "B · Diagramme")],
    ["chunk", tt("C · Small modules", "C · Kleine Module")],
  ];
  return (
    <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
      {items.map(([k, name]) => (
        <div key={k}>
          <MeasureThumb kind={k} />
          <p className="mt-1 text-caption font-semibold text-ink">{name}</p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ A1 · how people learn, drawn */

function MemorySvg({ kind }: { kind: "intake" | "processing" | "storage" }) {
  const label =
    kind === "intake"
      ? tt("A screen with six blocks: attention picks one of them", "Ein Bildschirm mit sechs Blöcken: Die Aufmerksamkeit wählt einen davon")
      : kind === "processing"
        ? tt("Working memory drawn as four slots, with a fifth item that does not fit", "Das Arbeitsgedächtnis als vier Fächer gezeichnet, mit einem fünften Element, das nicht passt")
        : tt("Long-term memory as a cabinet; an item goes in, and a loop leads back to it later", "Das Langzeitgedächtnis als Schrank; ein Element wandert hinein, und eine Schleife führt später zurück");
  return (
    <Svg viewBox="0 0 200 130" label={label}>
      <rect x="1" y="1" width="198" height="128" rx="6" fill={BG} stroke={MID} />
      {kind === "intake" && (
        <>
          <rect x="10" y="12" width="118" height="84" rx="4" fill="#FFFFFF" stroke={LINE} />
          {Array.from({ length: 6 }, (_, i) => {
            const x = 16 + (i % 3) * 38;
            const y = 20 + Math.floor(i / 3) * 38;
            return <rect key={i} x={x} y={y} width="34" height="32" rx="3" fill={i === 1 ? DARK : LITE} stroke={LINE} opacity={i === 1 ? 1 : 0.7} />;
          })}
          <ellipse cx="162" cy="54" rx="24" ry="14" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <circle cx="162" cy="54" r="7" fill={DARK} />
          <Arrow x1={138} y1={54} x2={92} y2={44} color={DARK} dash="4 3" />
          <Txt x={100} y={116} size={9} anchor="middle" fill="#555555">{tt("attention picks one", "die Aufmerksamkeit wählt eines")}</Txt>
        </>
      )}
      {kind === "processing" && (
        <>
          <rect x="16" y="22" width="168" height="50" rx="8" fill="#EEEEEE" stroke={DARK} strokeWidth="1.6" />
          <Txt x={100} y={16} size={9} bold anchor="middle">{tt("working memory", "Arbeitsgedächtnis")}</Txt>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={24 + i * 40} y="32" width="32" height="30" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.4" />
              <rect x={30 + i * 40} y="40" width="20" height="14" rx="3" fill={i % 2 ? DARK : "#8E8E8E"} />
            </g>
          ))}
          <rect x="74" y="84" width="52" height="26" rx="4" fill="#FFFFFF" stroke={LINE} strokeDasharray="4 3" />
          <line x1="82" y1="90" x2="118" y2="104" stroke={LINE} strokeWidth="1.6" />
          <line x1="118" y1="90" x2="82" y2="104" stroke={LINE} strokeWidth="1.6" />
          <Txt x={100} y={122} size={9} anchor="middle" fill="#555555">{tt("about four at a time", "etwa vier gleichzeitig")}</Txt>
        </>
      )}
      {kind === "storage" && (
        <>
          <rect x="70" y="10" width="72" height="92" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="76" y={16 + i * 28} width="60" height="22" rx="3" fill={i === 1 ? LITE : "#F0F0F0"} stroke={LINE} />
              <rect x="98" y={25 + i * 28} width="16" height="4" rx="2" fill="#8E8E8E" />
            </g>
          ))}
          <rect x="10" y="44" width="24" height="20" rx="3" fill={DARK} />
          <Arrow x1={38} y1={54} x2={72} y2={54} />
          <path d="M106 104 C 106 124, 22 124, 22 70" fill="none" stroke="#777777" strokeWidth="1.6" strokeDasharray="4 3" />
          <polygon points="22,66 17,74 27,74" fill="#777777" />
          <Txt x={150} y={64} size={9} fill="#555555">{tt("again", "wieder")}</Txt>
          <Txt x={150} y={76} size={9} fill="#555555">{tt("and again", "und wieder")}</Txt>
        </>
      )}
    </Svg>
  );
}

export function MemoryPicture() {
  const steps: ["intake" | "processing" | "storage", string, string][] = [
    ["intake", tt("Intake", "Aufnahme"), tt("Attention picks a few things from the screen. The rest is ignored.", "Die Aufmerksamkeit wählt wenige Dinge vom Bildschirm. Der Rest wird ignoriert.")],
    ["processing", tt("Processing", "Verarbeitung"), tt("Working memory holds and works on about four chunks at a time.", "Das Arbeitsgedächtnis hält und bearbeitet etwa vier Chunks gleichzeitig.")],
    ["storage", tt("Storage", "Speicherung"), tt("Long-term memory keeps what was understood and revisited.", "Das Langzeitgedächtnis behält, was verstanden und wieder aufgegriffen wurde.")],
  ];
  return (
    <Diagram
      label={tt("How people learn: intake, processing, storage", "Wie Menschen lernen: Aufnahme, Verarbeitung, Speicherung")}
      caption={tt("Design can help at each step: guide attention (intake), do not overfill working memory (processing), and bring learners back to the content later (storage).", "Gestaltung kann bei jedem Schritt helfen: die Aufmerksamkeit lenken (Aufnahme), das Arbeitsgedächtnis nicht überfüllen (Verarbeitung) und Lernende später zum Inhalt zurückbringen (Speicherung).")}
    >
      <ol className="grid gap-3 sm:grid-cols-3">
        {steps.map(([k, h, b], i) => (
          <li key={k} className="rounded-lg border border-line bg-paper p-2">
            <MemorySvg kind={k} />
            <p className="mt-2 text-body font-bold text-ink">{`${i + 1} · ${h}`}</p>
            <p className="text-caption text-ink">{b}</p>
          </li>
        ))}
      </ol>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A1 · three levels of learning, as three screens */

function LevelSvg({ level }: { level: 1 | 2 | 3 }) {
  const label =
    level === 1
      ? tt("A screen that only presents text", "Ein Bildschirm, der nur Text präsentiert")
      : level === 2
        ? tt("A screen with text, an example and a link to something the learner knows", "Ein Bildschirm mit Text, einem Beispiel und einer Verbindung zu etwas, das die Lernende kennt")
        : tt("A screen with a task, a result and a next step", "Ein Bildschirm mit einer Aufgabe, einem Ergebnis und einem nächsten Schritt");
  return (
    <Svg viewBox="0 0 200 140" label={label}>
      <rect x="1" y="1" width="198" height="138" rx="6" fill={BG} stroke={MID} />
      <rect x="12" y="10" width="176" height="120" rx="4" fill="#FFFFFF" stroke={LINE} />
      <rect x="20" y="18" width="70" height="8" rx="2" fill={DARK} />
      {level === 1 && <Lines x={20} y={34} n={11} w={160} gap={8} />}
      {level === 2 && (
        <>
          <Lines x={20} y={34} n={4} w={160} gap={7} />
          <rect x="20" y="66" width="104" height="30" rx="4" fill="#F0F0F0" stroke={DARK} strokeDasharray="4 3" />
          <Txt x={26} y={78} size={8} bold>{tt("for example", "zum Beispiel")}</Txt>
          <Lines x={26} y={84} n={2} w={92} gap={6} h={3} fill={MID} />
          <path d="M124 80 C 140 80, 140 96, 150 100" fill="none" stroke="#777777" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="160" cy="104" r="14" fill={LITE} stroke={DARK} strokeWidth="1.4" />
          <Txt x={160} y={107} size={7} anchor="middle">{tt("known", "bekannt")}</Txt>
          <Lines x={20} y={108} n={2} w={110} gap={7} />
        </>
      )}
      {level === 3 && (
        <>
          <Lines x={20} y={34} n={2} w={160} gap={7} />
          <rect x="20" y="54" width="110" height="26" rx="4" fill="#F0F0F0" stroke={LINE} />
          <Txt x={26} y={65} size={8} bold>{tt("Which clause?", "Welche Klausel?")}</Txt>
          <rect x="26" y="69" width="60" height="7" rx="2" fill="#FFFFFF" stroke={LINE} />
          <rect x="136" y="56" width="44" height="22" rx="4" fill={DARK} />
          <Txt x={158} y={70} size={8} anchor="middle" fill="#FFFFFF">{tt("Check", "Prüfen")}</Txt>
          <rect x="20" y="90" width="76" height="30" rx="4" fill={LITE} stroke={LINE} />
          <Txt x={58} y={108} size={9.5} bold anchor="middle">{tt("3 of 4", "3 von 4")}</Txt>
          <rect x="104" y="96" width="76" height="20" rx="4" fill="#FFFFFF" stroke={DARK} />
          <Txt x={142} y={109} size={8} anchor="middle">{tt("Next step", "Nächster Schritt")}</Txt>
        </>
      )}
    </Svg>
  );
}

export function LevelsPicture() {
  const steps: [1 | 2 | 3, string, string][] = [
    [1, tt("Taking in", "Aufnehmen"), tt("The learner can repeat what was shown.", "Die Lernende kann wiederholen, was gezeigt wurde.")],
    [2, tt("Understanding", "Verstehen"), tt("The learner can explain it in their own words and give an example.", "Die Lernende kann es in eigenen Worten erklären und ein Beispiel geben.")],
    [3, tt("Applying", "Anwenden"), tt("The learner can use it in a new situation at work.", "Die Lernende kann es in einer neuen Situation bei der Arbeit nutzen.")],
  ];
  return (
    <Diagram
      label={tt("Three levels of learning: each needs more from the interface than the one before", "Drei Stufen des Lernens: Jede verlangt mehr vom Interface als die vorige")}
      caption={tt("A screen that only presents content supports the first level. Examples and connections support the second. Tasks and feedback support the third.", "Ein Bildschirm, der Inhalt nur präsentiert, stützt die erste Stufe. Beispiele und Verknüpfungen stützen die zweite. Aufgaben und Feedback stützen die dritte.")}
    >
      <ol className="grid gap-3 sm:grid-cols-3">
        {steps.map(([n, h, b]) => (
          <li key={n} className="rounded-lg border border-line bg-paper p-2">
            <LevelSvg level={n} />
            <p className="mt-2 text-body font-bold text-ink">{`${n} · ${h}`}</p>
            <p className="text-caption text-ink">{b}</p>
          </li>
        ))}
      </ol>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B1 · effectiveness against efficiency, as three paths to a goal */

function PathSvg({ kind }: { kind: "both" | "effective" | "efficient" }) {
  const label =
    kind === "both"
      ? tt("A learner walks a short, clear path to the goal", "Eine Lernende geht einen kurzen, klaren Weg zum Ziel")
      : kind === "effective"
        ? tt("A learner reaches the goal by a winding path around a banner and a chat window", "Eine Lernende erreicht das Ziel auf einem Umweg um ein Banner und ein Chat-Fenster")
        : tt("A learner walks a short path that stops before the goal", "Eine Lernende geht einen kurzen Weg, der vor dem Ziel endet");
  return (
    <Svg viewBox="0 0 340 72" label={label}>
      <rect x="1" y="1" width="338" height="70" rx="6" fill={BG} stroke={MID} />
      <circle cx="26" cy="30" r="7" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
      <path d="M26 37 v14 M18 42 h16 M26 51 l-6 9 M26 51 l6 9" fill="none" stroke={DARK} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="306" y1="14" x2="306" y2="58" stroke={DARK} strokeWidth="2" />
      <polygon points="306,14 328,22 306,30" fill={DARK} />
      {kind === "both" && <Arrow x1={42} y1={38} x2={298} y2={38} />}
      {kind === "effective" && (
        <>
          <rect x="96" y="12" width="40" height="14" rx="3" fill={MID} stroke={LINE} />
          <rect x="196" y="46" width="34" height="18" rx="3" fill={MID} stroke={LINE} />
          <path d="M42 38 C 70 6, 100 62, 130 38 S 190 8, 214 36 S 258 62, 288 38" fill="none" stroke={DARK} strokeWidth="1.8" />
          <polygon points="298,38 289,33 289,43" fill={DARK} />
        </>
      )}
      {kind === "efficient" && (
        <>
          <Arrow x1={42} y1={38} x2={176} y2={38} />
          <line x1="190" y1="38" x2="292" y2="38" stroke={LINE} strokeWidth="1.8" strokeDasharray="5 5" />
          <Txt x={240} y={30} size={10} bold anchor="middle" fill="#555555">?</Txt>
        </>
      )}
    </Svg>
  );
}

export function TwoLensesPicture() {
  const lanes: ["both" | "effective" | "efficient", string, string][] = [
    ["both", tt("Effective and efficient", "Effektiv und effizient"), tt("The learner reaches the goal by a short, clear path: they learned it, with little wasted effort.", "Die Lernende erreicht das Ziel auf einem kurzen, klaren Weg: Sie hat es gelernt, mit wenig vergeudeter Anstrengung.")],
    ["effective", tt("Effective, but not efficient", "Effektiv, aber nicht effizient"), tt("The learner reaches the goal too, but around banners, chat windows and unclear menus: the learning happened, at a high mental cost.", "Die Lernende erreicht das Ziel auch, aber um Banner, Chat-Fenster und unklare Menüs herum: Das Lernen hat stattgefunden, zu hohen geistigen Kosten.")],
    ["efficient", tt("Efficient, but not effective", "Effizient, aber nicht effektiv"), tt("A short path that stops before the goal: it feels light, but the learner cannot yet explain or do it afterwards.", "Ein kurzer Weg, der vor dem Ziel endet: Er fühlt sich leicht an, aber die Lernende kann es danach noch nicht erklären oder tun.")],
  ];
  return (
    <Diagram
      label={tt("Two lenses on a UX decision: did learning happen, and at what cost", "Zwei Linsen auf eine UX-Entscheidung: Hat Lernen stattgefunden, und zu welchen Kosten")}
      caption={tt("Effectiveness asks whether learning happened (is the goal reached?). Efficiency asks at what mental cost (how long and how winding is the path?). A decision that raises one and lowers the other needs a stated reason; learners who finish and employers who see results need both.", "Effektivität fragt, ob Lernen stattgefunden hat (wird das Ziel erreicht?). Effizienz fragt, zu welchen geistigen Kosten (wie lang und wie verschlungen ist der Weg?). Eine Entscheidung, die eine hebt und die andere senkt, braucht einen genannten Grund; Lernende, die abschließen, und Arbeitgeber, die Ergebnisse sehen, brauchen beides.")}
    >
      <div className="mx-auto max-w-[440px] space-y-3">
        {lanes.map(([k, h, b]) => (
          <div key={k}>
            <p className="text-caption font-bold text-ink">{h}</p>
            <PathSvg kind={k} />
            <p className="text-caption text-ink">{b}</p>
          </div>
        ))}
      </div>
    </Diagram>
  );
}
