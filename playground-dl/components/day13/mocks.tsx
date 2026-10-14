"use client";

import { Arrow, DARK, Frame, LITE, Lines, MID, Marker, Person, Svg, Thumb, Txt } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Real pictures for Day 13 (CLAUDE.md #52): the four AccessLearn screens of the task with their numbered markers, one lesson page as three learners meet it, the four WCAG
 * principles, a lesson page that gains four WCAG fixes, a before and after for plain structure, and a thumbnail for every measure, option and decision. Mock screens use their
 * own neutral greys, plus colour only where the problem needs it; the site's blue, teal and rust never colour the evidence (#15, #49).
 */

const PALE = "#C9C9C9";

/* ------------------------------------------------------------------ the Task 1 evidence: four AccessLearn screens, eight facts */

export type AcScreen = "lesson" | "media" | "menu" | "quiz";

export function AccessScreen({ kind }: { kind: AcScreen }) {
  const label =
    kind === "lesson"
      ? tt("AccessLearn lesson: light grey 10 px text at low contrast, and a long block of instructions with no headings", "AccessLearn-Lektion: hellgrauer 10-px-Text mit niedrigem Kontrast und ein langer Anleitungsblock ohne Überschriften")
      : kind === "media"
        ? tt("AccessLearn chart: a bar chart that carries the lesson's message, with no text alternative", "AccessLearn-Diagramm: ein Balkendiagramm, das die Aussage der Lektion trägt, ohne Textalternative")
        : kind === "menu"
          ? tt("AccessLearn menu: a course menu that opens only on mouse hover, and a path seven levels deep", "AccessLearn-Menü: ein Kursmenü, das sich nur bei Mausüberfahrt öffnet, und ein Pfad, der sieben Ebenen tief ist")
          : tt("AccessLearn quiz: small answer buttons close together and a 60-second timer", "AccessLearn-Quiz: kleine Antwortbuttons dicht beieinander und ein 60-Sekunden-Timer");
  return (
    <Svg viewBox="0 0 240 170" label={label}>
      <Frame>
        {kind === "lesson" && (
          <>
            <Txt x={12} y={30} size={9} bold>{tt("Lesson 3 · Setting up your account", "Lektion 3 · Ihr Konto einrichten")}</Txt>
            <Lines x={12} y={40} n={3} w={214} gap={9} h={2.4} fill={PALE} />
            <Txt x={12} y={78} size={4.5} fill="#CFCFCF">{tt("Open the settings and set the options as described in the manual.", "Öffnen Sie die Einstellungen und stellen Sie die Optionen wie im Handbuch beschrieben ein.")}</Txt>
            <Lines x={12} y={90} n={6} w={214} gap={7} h={3.2} fill="#9A9A9A" short={0.8} />
            <Marker x={216} y={44} n={1} />
            <Marker x={216} y={80} n={2} />
            <Marker x={216} y={112} n={7} />
          </>
        )}
        {kind === "media" && (
          <>
            <Txt x={12} y={30} size={9} bold>{tt("Lesson 5 · Results by quarter", "Lektion 5 · Ergebnisse nach Quartal")}</Txt>
            <rect x="12" y="38" width="214" height="104" rx="4" fill="#FFFFFF" stroke={MID} />
            {[34, 52, 40, 76].map((h, i) => (
              <rect key={i} x={36 + i * 44} y={130 - h} width="26" height={h} fill={i === 3 ? DARK : PALE} />
            ))}
            <line x1="24" y1="130" x2="214" y2="130" stroke={DARK} />
            <Marker x={216} y={46} n={3} />
          </>
        )}
        {kind === "menu" && (
          <>
            <rect x="12" y="24" width="78" height="14" rx="3" fill={DARK} />
            <Txt x={18} y={34} size={7.4} fill="#FFFFFF">{tt("Courses ▾ (hover)", "Kurse ▾ (Mausüberfahrt)")}</Txt>
            <rect x="12" y="40" width="78" height="46" rx="3" fill="#FFFFFF" stroke={DARK} />
            <Lines x={18} y={48} n={4} w={64} gap={9} fill={PALE} />
            <Txt x={100} y={34} size={6.6} fill="#555555">{tt("Tab key: skips the menu", "Tab-Taste: überspringt das Menü")}</Txt>
            <Txt x={12} y={108} size={7} bold>{tt("Home › Courses › Sales › Level 2 › Module 4 › Unit 3 › Lesson 3", "Start › Kurse › Vertrieb › Stufe 2 › Modul 4 › Einheit 3 › Lektion 3")}</Txt>
            <Marker x={102} y={46} n={4} />
            <Marker x={216} y={104} n={6} />
          </>
        )}
        {kind === "quiz" && (
          <>
            <Txt x={12} y={30} size={9} bold>{tt("Quiz · question 2 of 5", "Quiz · Frage 2 von 5")}</Txt>
            <rect x="170" y="20" width="56" height="14" rx="7" fill="#FFFFFF" stroke={DARK} />
            <Txt x={198} y={30} size={7.6} anchor="middle" bold>{tt("0:42", "0:42")}</Txt>
            <Txt x={12} y={52} size={7.6}>{tt("Which step comes first?", "Welcher Schritt kommt zuerst?")}</Txt>
            {["A", "B", "C", "D"].map((s, i) => (
              <g key={s}>
                <rect x={12 + i * 28} y="62" width="25" height="9" rx="2" fill="#FFFFFF" stroke={DARK} />
                <Txt x={24.5 + i * 28} y={69} size={6.4} anchor="middle">{s}</Txt>
              </g>
            ))}
            <Txt x={12} y={92} size={6.8} fill="#555555">{tt("The timer cannot be extended.", "Der Timer lässt sich nicht verlängern.")}</Txt>
            <Marker x={134} y={66} n={5} />
            <Marker x={218} y={44} n={8} />
          </>
        )}
      </Frame>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A1 · one lesson page, three learners */

export type UserKind = "vision" | "keys" | "mind";

export function UserMock({ kind }: { kind: UserKind }) {
  return (
    <Svg
      viewBox="0 0 240 130"
      label={
        kind === "vision"
          ? tt("Mia, who has low vision, sees pale grey text on white that she can barely read", "Mia, die eingeschränkt sieht, sieht hellgrauen Text auf Weiß, den sie kaum lesen kann")
          : kind === "keys"
            ? tt("Tom, who uses only a keyboard, presses Tab and the focus skips the menu", "Tom, der nur eine Tastatur nutzt, drückt Tab, und der Fokus überspringt das Menü")
            : tt("Nia, who finds long text hard, faces a wall of text with no headings", "Nia, der langer Text schwerfällt, steht vor einer Textwand ohne Überschriften")
      }
    >
      <rect x="1" y="1" width="238" height="128" rx="5" fill="#F6F6F6" stroke={MID} />
      <Person x={26} y={38} s={0.9} />
      <rect x="62" y="12" width="168" height="104" rx="4" fill="#FFFFFF" stroke={DARK} />
      {kind === "vision" && (
        <>
          <Lines x={70} y={24} n={5} w={152} gap={10} h={3.4} fill="#D4D4D4" />
          <Txt x={70} y={100} size={7.4} fill="#555555">{tt("“I cannot read this.”", "„Das kann ich nicht lesen.“")}</Txt>
        </>
      )}
      {kind === "keys" && (
        <>
          <rect x="70" y="20" width="60" height="14" rx="3" fill={LITE} />
          <Txt x={76} y={30} size={7}>{tt("Menu", "Menü")}</Txt>
          <rect x="140" y="20" width="60" height="14" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="2" strokeDasharray="3 2" />
          <Txt x={146} y={30} size={7}>{tt("Lesson", "Lektion")}</Txt>
          <Arrow x1={100} y1={52} x2={140} y2={36} dash="3 3" />
          <Txt x={70} y={70} size={7.4}>{tt("Tab → skips the menu", "Tab → überspringt das Menü")}</Txt>
          <Txt x={70} y={100} size={7.4} fill="#555555">{tt("“I cannot reach the courses.”", "„Ich komme nicht an die Kurse.“")}</Txt>
        </>
      )}
      {kind === "mind" && (
        <>
          <Lines x={70} y={22} n={9} w={152} gap={7.6} h={3.4} fill="#9A9A9A" short={0.8} />
          <Txt x={70} y={108} size={7.4} fill="#555555">{tt("“Where do I even start?”", "„Wo fange ich überhaupt an?“")}</Txt>
        </>
      )}
    </Svg>
  );
}

/* ------------------------------------------------------------------ A2 · the four principles, static */

export function PourMock() {
  const cols = [
    { h: tt("Perceivable", "Wahrnehmbar"), s: tt("I can see or hear it", "Ich kann es sehen oder hören") },
    { h: tt("Operable", "Bedienbar"), s: tt("I can use it", "Ich kann es bedienen") },
    { h: tt("Understandable", "Verständlich"), s: tt("I can follow it", "Ich kann ihm folgen") },
    { h: tt("Robust", "Robust"), s: tt("It works with my tools", "Es funktioniert mit meinen Werkzeugen") },
  ];
  return (
    <Svg viewBox="0 0 240 110" label={tt("The four principles: perceivable drawn as an eye, operable as a keyboard key, understandable as a short text, robust as a plug that fits", "Die vier Prinzipien: wahrnehmbar als Auge, bedienbar als Tastaturtaste, verständlich als kurzer Text, robust als passender Stecker")}>
      {cols.map((c, i) => (
        <g key={i}>
          <rect x={3 + i * 59} y="3" width="55" height="104" rx="5" fill="#F6F6F6" stroke={MID} />
          <Txt x={30.5 + i * 59} y={16} size={6.8} anchor="middle" bold>{c.h}</Txt>
          <Txt x={30.5 + i * 59} y={99} size={5.8} anchor="middle">{c.s}</Txt>
        </g>
      ))}
      <ellipse cx="30.5" cy="52" rx="18" ry="10" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
      <circle cx="30.5" cy="52" r="5" fill={DARK} />
      <rect x="107" y="40" width="26" height="24" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.8" />
      <Txt x={120} y={57} size={8} anchor="middle" bold>Tab</Txt>
      <Lines x={158} y={38} n={3} w={44} gap={8} h={3.4} fill="#8A8A8A" />
      <Txt x={180} y={72} size={6} anchor="middle">{tt("short and plain", "kurz und schlicht")}</Txt>
      <rect x="216" y="42" width="14" height="20" rx="2" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
      <rect x="210" y="48" width="8" height="8" rx="1" fill={DARK} />
    </Svg>
  );
}

/* ------------------------------------------------------------------ A3 · a lesson page that gains four WCAG fixes */

export type WcagOn = { contrast: boolean; alt: boolean; structure: boolean; keyboard: boolean };

export function WcagMock({ on }: { on: WcagOn }) {
  const n = [on.contrast, on.alt, on.structure, on.keyboard].filter(Boolean).length;
  return (
    <Svg viewBox="0 0 240 150" label={tt(`A lesson page with ${n} of 4 WCAG fixes switched on: contrast, a text alternative for the chart, a clear structure and keyboard use`, `Eine Lektionsseite mit ${n} von 4 eingeschalteten WCAG-Korrekturen: Kontrast, eine Textalternative für das Diagramm, eine klare Struktur und Tastaturbedienung`)}>
      <rect x="1" y="1" width="238" height="148" rx="5" fill="#F6F6F6" stroke={MID} />
      <rect x="10" y="10" width="64" height="14" rx="3" fill={on.keyboard ? "#FFFFFF" : LITE} stroke={on.keyboard ? DARK : "none"} strokeWidth={on.keyboard ? 2.2 : 0} strokeDasharray={on.keyboard ? "3 2" : undefined} />
      <Txt x={16} y={20} size={7}>{on.keyboard ? tt("Menu · Tab reaches it", "Menü · Tab erreicht es") : tt("Menu (mouse)", "Menü (Maus)")}</Txt>
      {on.structure && <Txt x={10} y={42} size={9} bold>{tt("1. Set up your account", "1. Ihr Konto einrichten")}</Txt>}
      <Lines x={10} y={on.structure ? 50 : 36} n={on.structure ? 3 : 5} w={150} gap={8} h={3.2} fill={on.contrast ? "#4A4A4A" : "#D2D2D2"} short={0.7} />
      <rect x="170" y="32" width="60" height="50" rx="3" fill="#FFFFFF" stroke={MID} />
      {[14, 22, 10, 30].map((h, i) => (
        <rect key={i} x={178 + i * 12} y={76 - h} width="8" height={h} fill={on.contrast ? DARK : PALE} />
      ))}
      {on.alt && <Txt x={200} y={96} size={5.6} anchor="middle">{tt("Sales rose each quarter", "Der Umsatz stieg jedes Quartal")}</Txt>}
      {on.structure && <Txt x={10} y={90} size={9} bold>{tt("2. Choose your options", "2. Wählen Sie Ihre Optionen")}</Txt>}
      {on.structure && <Lines x={10} y={98} n={2} w={150} gap={8} h={3.2} fill={on.contrast ? "#4A4A4A" : "#D2D2D2"} short={0.6} />}
      <Txt x={10} y={140} size={6.6} fill="#555555">{tt(`${n} of 4 fixes on`, `${n} von 4 Korrekturen an`)}</Txt>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A4 · plain structure before and after, static */

export function PlainMock() {
  return (
    <Svg viewBox="0 0 240 120" label={tt("Before: one block of long text; after: headings, short paragraphs and a numbered list", "Vorher: ein Block langer Text; nachher: Überschriften, kurze Absätze und eine nummerierte Liste")}>
      <rect x="4" y="4" width="112" height="112" rx="5" fill="#F6F6F6" stroke={MID} />
      <rect x="124" y="4" width="112" height="112" rx="5" fill="#F6F6F6" stroke={MID} />
      <Txt x={60} y={18} size={8} anchor="middle" bold>{tt("Before", "Vorher")}</Txt>
      <Txt x={180} y={18} size={8} anchor="middle" bold>{tt("After", "Nachher")}</Txt>
      <Lines x={12} y={26} n={10} w={96} gap={8.4} h={3} fill="#9A9A9A" short={0.8} />
      <Txt x={132} y={32} size={8} bold>{tt("1. Open settings", "1. Einstellungen öffnen")}</Txt>
      <Lines x={132} y={38} n={1} w={92} h={3} fill="#9A9A9A" />
      <Txt x={132} y={58} size={8} bold>{tt("2. Choose options", "2. Optionen wählen")}</Txt>
      <Lines x={132} y={64} n={2} w={92} gap={7} h={3} fill="#9A9A9A" short={0.6} />
      <Txt x={132} y={90} size={8} bold>{tt("3. Save", "3. Speichern")}</Txt>
      <Lines x={132} y={96} n={1} w={92} h={3} fill="#9A9A9A" short={0.5} />
    </Svg>
  );
}

/* ------------------------------------------------------------------ thumbnails for measures, options and decisions */

export type ThumbKind = "contrast" | "nav" | "alt" | "structure" | "test" | "overlay" | "separate" | "everything" | "statement" | "wcag" | "process" | "measure" | "training" | "reactive";

export function MeasureThumb({ kind }: { kind: ThumbKind }) {
  const label: Record<ThumbKind, string> = {
    contrast: tt("Dark text on a light background", "Dunkler Text auf hellem Hintergrund"),
    nav: tt("One menu, three levels, reachable by keyboard", "Ein Menü, drei Ebenen, per Tastatur erreichbar"),
    alt: tt("A chart with a text alternative and a video with captions", "Ein Diagramm mit Textalternative und ein Video mit Untertiteln"),
    structure: tt("Headings and short paragraphs", "Überschriften und kurze Absätze"),
    test: tt("A test with a keyboard, a screen reader and a user", "Ein Test mit Tastatur, Screenreader und einer Nutzerin"),
    overlay: tt("A toolbar button on top of a page", "Ein Toolbar-Button auf einer Seite"),
    separate: tt("Two copies of a platform", "Zwei Kopien einer Plattform"),
    everything: tt("Two thousand items at once", "Zweitausend Inhalte auf einmal"),
    statement: tt("A statement page", "Eine Erklärungsseite"),
    wcag: tt("A checklist of WCAG requirements", "Eine Checkliste der WCAG-Anforderungen"),
    process: tt("A gate in a design process", "Ein Tor in einem Designprozess"),
    measure: tt("A gauge with a target", "Ein Messgerät mit Zielwert"),
    training: tt("A workshop with people at a table", "Ein Workshop mit Menschen an einem Tisch"),
    reactive: tt("A complaint arriving, then a fix", "Eine eintreffende Beschwerde, dann eine Korrektur"),
  };
  return (
    <Thumb label={label[kind]}>
      {kind === "contrast" && (
        <>
          <Txt x={100} y={50} size={20} anchor="middle" bold fill="#222222">{tt("Aa", "Aa")}</Txt>
          <Txt x={100} y={84} size={9} anchor="middle">{tt("Contrast 4.5 : 1", "Kontrast 4,5 : 1")}</Txt>
        </>
      )}
      {kind === "nav" && (
        <>
          <rect x="14" y="16" width="172" height="14" rx="3" fill={DARK} />
          <rect x="14" y="34" width="110" height="52" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="2.2" strokeDasharray="4 3" />
          <Lines x={22} y={44} n={3} w={94} gap={11} h={4} fill={PALE} />
          <Txt x={132} y={64} size={8}>{tt("Tab", "Tab")}</Txt>
        </>
      )}
      {kind === "alt" && (
        <>
          <rect x="14" y="14" width="80" height="50" rx="3" fill="#FFFFFF" stroke={DARK} />
          {[14, 22, 10, 30].map((h, i) => (
            <rect key={i} x={22 + i * 16} y={58 - h} width="10" height={h} fill={DARK} />
          ))}
          <Txt x={54} y={80} size={6.6} anchor="middle">{tt("“Sales rose”", "„Umsatz stieg“")}</Txt>
          <rect x="106" y="14" width="80" height="50" rx="3" fill="#FFFFFF" stroke={DARK} />
          <rect x="112" y="52" width="68" height="8" rx="2" fill={LITE} />
          <Txt x={146} y={80} size={6.6} anchor="middle">{tt("captions", "Untertitel")}</Txt>
        </>
      )}
      {kind === "structure" && (
        <>
          <Txt x={14} y={26} size={9} bold>{tt("1. First step", "1. Erster Schritt")}</Txt>
          <Lines x={14} y={32} n={2} w={172} gap={8} h={3.2} fill={MID} short={0.6} />
          <Txt x={14} y={62} size={9} bold>{tt("2. Second step", "2. Zweiter Schritt")}</Txt>
          <Lines x={14} y={68} n={2} w={172} gap={8} h={3.2} fill={MID} short={0.6} />
        </>
      )}
      {kind === "test" && (
        <>
          <Person x={52} y={34} s={0.8} />
          <rect x="84" y="30" width="40" height="20" rx="3" fill="#FFFFFF" stroke={DARK} />
          <Txt x={104} y={44} size={8} anchor="middle" bold>Tab</Txt>
          <Txt x={150} y={44} size={8} anchor="middle">{tt("reader", "Reader")}</Txt>
          <rect x="30" y="76" width="140" height="16" rx="3" fill="#FFFFFF" stroke={DARK} strokeDasharray="4 3" />
        </>
      )}
      {kind === "overlay" && (
        <>
          <rect x="14" y="14" width="172" height="82" rx="4" fill={LITE} />
          <circle cx="166" cy="76" r="14" fill={DARK} />
          <Txt x={166} y={80} size={11} anchor="middle" bold fill="#FFFFFF">♿</Txt>
        </>
      )}
      {kind === "separate" && (
        <>
          <rect x="18" y="20" width="72" height="64" rx="4" fill="#FFFFFF" stroke={DARK} />
          <rect x="110" y="20" width="72" height="64" rx="4" fill="#FFFFFF" stroke={DARK} strokeDasharray="4 3" />
          <Txt x={54} y={56} size={8} anchor="middle">{tt("Platform", "Plattform")}</Txt>
          <Txt x={146} y={56} size={8} anchor="middle">{tt("Copy", "Kopie")}</Txt>
        </>
      )}
      {kind === "everything" && (
        <>
          {Array.from({ length: 24 }, (_, i) => (
            <rect key={i} x={14 + (i % 8) * 22} y={14 + Math.floor(i / 8) * 28} width="18" height="22" rx="2" fill={LITE} stroke={DARK} strokeWidth="0.8" />
          ))}
        </>
      )}
      {kind === "statement" && (
        <>
          <rect x="40" y="12" width="120" height="86" rx="4" fill="#FFFFFF" stroke={DARK} />
          <Txt x={100} y={30} size={8} anchor="middle" bold>{tt("Accessibility statement", "Erklärung zur Barrierefreiheit")}</Txt>
          <Lines x={50} y={40} n={4} w={100} gap={10} h={3.4} fill={MID} />
        </>
      )}
      {kind === "wcag" && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="30" y={16 + i * 22} width="12" height="12" rx="2" fill="#FFFFFF" stroke={DARK} />
              <rect x="50" y={20 + i * 22} width="120" height="4" rx="2" fill={MID} />
            </g>
          ))}
        </>
      )}
      {kind === "process" && (
        <>
          <Arrow x1={14} y1={55} x2={66} y2={55} />
          <rect x="74" y="26" width="50" height="58" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="2" />
          <Txt x={99} y={60} size={8} anchor="middle" bold>{tt("Check", "Prüfung")}</Txt>
          <Arrow x1={130} y1={55} x2={186} y2={55} />
        </>
      )}
      {kind === "measure" && (
        <>
          <path d="M40 84 A60 60 0 0 1 160 84" fill="none" stroke={MID} strokeWidth="10" />
          <path d="M40 84 A60 60 0 0 1 128 36" fill="none" stroke={DARK} strokeWidth="10" />
          <Txt x={100} y={84} size={9} anchor="middle" bold>{tt("85%", "85 %")}</Txt>
        </>
      )}
      {kind === "training" && (
        <>
          <rect x="30" y="64" width="140" height="10" rx="3" fill={LITE} stroke={DARK} />
          <Person x={56} y={34} s={0.7} />
          <Person x={100} y={34} s={0.7} />
          <Person x={144} y={34} s={0.7} />
        </>
      )}
      {kind === "reactive" && (
        <>
          <rect x="14" y="30" width="60" height="34" rx="4" fill="#FFFFFF" stroke={DARK} />
          <Txt x={44} y={51} size={7.6} anchor="middle">{tt("Complaint", "Beschwerde")}</Txt>
          <Arrow x1={80} y1={47} x2={116} y2={47} />
          <rect x="122" y="30" width="64" height="34" rx="4" fill="#FFFFFF" stroke={DARK} strokeDasharray="4 3" />
          <Txt x={154} y={51} size={7.6} anchor="middle">{tt("Fix", "Korrektur")}</Txt>
        </>
      )}
    </Thumb>
  );
}
