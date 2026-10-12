"use client";

import { Arrow, DARK, Frame, LINE, LITE, Lines, MID, MiniPage, Person, Svg, Thumb, Tick, Txt } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Real pictures for Day 6 (CLAUDE.md #52): two persona cards (one built from clichés, one from data), the two perspectives of one platform, the screens that two
 * segments want, the five touchpoints of EduPath, the emotion curve of a journey, and a thumbnail for every measure of the cards and the two tasks. Mock screens use
 * their own neutral greys; the site's blue, teal and rust never colour the evidence (#15, #49).
 */

/* ------------------------------------------------------------------ A1 / A2 · a persona card, built from data or from clichés */

export function PersonaCard({ kind }: { kind: "weak" | "useful" }) {
  const useful = kind === "useful";
  const label = useful
    ? tt("A persona card built from data: Mia, 29, with a goal, a problem, a context of use and the sources behind it", "Eine Persona-Karte aus Daten: Mia, 29, mit Ziel, Problem, Nutzungskontext und den Quellen dahinter")
    : tt("A persona card built from clichés: Sandra, 34, tech-savvy, loves apps, with no sources", "Eine Persona-Karte aus Klischees: Sandra, 34, technikaffin, liebt Apps, ohne Quellen");
  const cols: [string, string[]][] = useful
    ? [
        [tt("Goal", "Ziel"), [tt("Qualify for a", "Sich für eine"), tt("team-lead role", "Teamleitung"), tt("next year", "qualifizieren")]],
        [tt("Problem", "Problem"), [tt("Loses the thread", "Verliert den Faden"), tt("after a few days", "nach ein paar"), tt("away", "Tagen Pause")]],
        [tt("Context", "Kontext"), [tt("20 minutes on", "20 Minuten auf"), tt("her phone, in", "dem Handy, am"), tt("the evening", "Abend")]],
      ]
    : [
        [tt("Goal", "Ziel"), [tt("Wants a great", "Will ein tolles"), tt("experience", "Erlebnis")]],
        [tt("Problem", "Problem"), [tt("Hates bad", "Hasst schlechte"), tt("design", "Gestaltung")]],
        [tt("Context", "Kontext"), [tt("Tech-savvy,", "Technikaffin,"), tt("loves apps", "liebt Apps")]],
      ];
  return (
    <Svg viewBox="0 0 300 190" label={label}>
      <rect x="4" y="4" width="292" height="182" rx="8" fill="#FFFFFF" stroke={useful ? DARK : LINE} strokeWidth={useful ? 2 : 1.4} strokeDasharray={useful ? undefined : "6 4"} />
      <Person x={34} y={30} s={0.9} />
      <Txt x={62} y={26} size={12} bold>{useful ? tt("Mia, 29", "Mia, 29") : tt("Sandra, 34", "Sandra, 34")}</Txt>
      <Txt x={62} y={40} size={9} fill="#555555">{useful ? tt("Sales assistant · learns for her job", "Vertriebsassistentin · lernt für den Beruf") : tt("“The typical user”", "„Die typische Nutzerin“")}</Txt>
      {cols.map(([head, lines], i) => (
        <g key={head}>
          <rect x={12 + i * 94} y={60} width="88" height="82" rx="5" fill={useful ? "#F4F4F4" : "#FAFAFA"} stroke={MID} />
          <Txt x={18 + i * 94} y={76} size={9.5} bold>{head}</Txt>
          {lines.map((l, j) => (
            <Txt key={j} x={18 + i * 94} y={92 + j * 12} size={8.5}>{l}</Txt>
          ))}
        </g>
      ))}
      <rect x="12" y="150" width="276" height="28" rx="5" fill={useful ? "#E2E2E2" : "#FAFAFA"} stroke={useful ? DARK : MID} strokeDasharray={useful ? undefined : "4 3"} />
      <Txt x={20} y={162} size={8.5} bold>{tt("Built from", "Gebaut aus")}</Txt>
      <Txt x={20} y={173} size={8.5}>{useful ? tt("2 learner interviews · 1 log analysis · note numbers", "2 Lernenden-Interviews · 1 Log-Analyse · Notiznummern") : tt("No sources. A workshop guess.", "Keine Quellen. Eine Workshop-Vermutung.")}</Txt>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A3 · the emotion curve of a journey */

export type PhaseCurve = { id: string; label: string; emotion: number };

/** A line through one emotion point per phase (1 very frustrated, 5 very motivated). The lowest point is ringed; colour is never the only channel. */
export function EmotionCurve({ phases, selected, height = 150 }: { phases: PhaseCurve[]; selected: string | null; height?: number }) {
  const W = 320;
  const X0 = 40;
  const X1 = W - 40;
  const Y0 = 22;
  const Y1 = height - 36;
  const x = (i: number) => (phases.length === 1 ? (X0 + X1) / 2 : X0 + (i / (phases.length - 1)) * (X1 - X0));
  const y = (e: number) => Y1 - ((Math.max(1, Math.min(5, e)) - 1) / 4) * (Y1 - Y0);
  const rated = phases.filter((p) => p.emotion > 0);
  const low = rated.length ? rated.reduce((m, p) => (p.emotion < m.emotion ? p : m), rated[0]) : null;
  const pts = phases.map((p, i) => (p.emotion > 0 ? `${x(i).toFixed(1)},${y(p.emotion).toFixed(1)}` : null)).filter(Boolean).join(" ");
  const label = tt(
    `An emotion curve over ${phases.length} phases: ${phases.map((p) => `${p.label} ${p.emotion > 0 ? p.emotion : "not rated"}`).join(", ")}`,
    `Eine Emotionskurve über ${phases.length} Phasen: ${phases.map((p) => `${p.label} ${p.emotion > 0 ? p.emotion : "nicht bewertet"}`).join(", ")}`,
  );
  return (
    <Svg viewBox={`0 0 ${W} ${height}`} label={label} className="mx-auto h-auto w-full max-w-[420px]">
      <rect x={X0 - 16} y={Y0 - 10} width={X1 - X0 + 32} height={Y1 - Y0 + 20} rx="4" fill="#FFFFFF" stroke={MID} />
      <line x1={X0 - 16} x2={X1 + 16} y1={y(3)} y2={y(3)} stroke={MID} strokeDasharray="4 4" />
      <Txt x={X0 - 20} y={y(5) + 3} size={8} anchor="end" fill="#555555">{tt("5 motivated", "5 motiviert")}</Txt>
      <Txt x={X0 - 20} y={y(1) + 3} size={8} anchor="end" fill="#555555">{tt("1 frustrated", "1 frustriert")}</Txt>
      {pts && <polyline points={pts} fill="none" stroke={DARK} strokeWidth="2.4" />}
      {phases.map((p, i) => (
        <g key={p.id}>
          {p.emotion > 0 && (
            <>
              <circle cx={x(i)} cy={y(p.emotion)} r={selected === p.id ? 7 : 5} fill={selected === p.id ? DARK : "#FFFFFF"} stroke={DARK} strokeWidth="2" />
              {low && low.id === p.id && rated.length > 1 && <circle cx={x(i)} cy={y(p.emotion)} r="11" fill="none" stroke={DARK} strokeWidth="1.6" strokeDasharray="3 3" />}
            </>
          )}
          <Txt x={x(i)} y={height - 14} size={9.5} bold={selected === p.id} anchor="middle">{p.label}</Txt>
          {p.emotion > 0 && <Txt x={x(i)} y={y(p.emotion) - 12} size={9} bold anchor="middle">{String(p.emotion)}</Txt>}
        </g>
      ))}
    </Svg>
  );
}

/* ------------------------------------------------------------------ A4 / B2 · the screens two groups see */

export type SideKind = "learner" | "teacher" | "both" | "everyone";

/** A screen of one platform as one group sees it: a learner sees the next lesson and her progress; a teacher sees an editor with many tabs and a table of learners. */
export function SideScreen({ kind }: { kind: SideKind }) {
  const label =
    kind === "learner"
      ? tt("The platform as a learner sees it: a resume card, a progress bar and the next lesson", "Die Plattform, wie eine Lernende sie sieht: eine Fortsetzen-Karte, ein Fortschrittsbalken und die nächste Lektion")
      : kind === "teacher"
        ? tt("The platform as a teacher sees it: a course editor with many tabs and a table of learners", "Die Plattform, wie eine Lehrende sie sieht: ein Kurseditor mit vielen Reitern und eine Tabelle der Lernenden")
        : kind === "both"
          ? tt("One shared course outline that learners and teachers both see, with groups and an order", "Eine gemeinsame Kursgliederung, die Lernende und Lehrende beide sehen, mit Gruppen und einer Reihenfolge")
          : tt("A screen that tries to serve everyone: a resume card, many tabs and a badge wall at once", "Ein Bildschirm, der alle bedienen will: eine Fortsetzen-Karte, viele Reiter und eine Badge-Wand auf einmal");
  return (
    <Svg viewBox="0 0 240 170" label={label}>
      <Frame>
        {kind === "learner" && (
          <>
            <Txt x={14} y={32} size={10} bold>{tt("Welcome back", "Willkommen zurück")}</Txt>
            <rect x="14" y="40" width="212" height="46" rx="5" fill="#FFFFFF" stroke={DARK} strokeWidth="1.8" />
            <Txt x={22} y={56} size={9} bold>{tt("Resume: unit 3 of 8", "Fortsetzen: Einheit 3 von 8")}</Txt>
            <rect x="22" y="64" width="130" height="7" rx="3.5" fill={LITE} stroke={LINE} />
            <rect x="22" y="64" width="50" height="7" rx="3.5" fill={DARK} />
            <rect x="170" y="62" width="48" height="16" rx="4" fill={DARK} />
            <Txt x={194} y={73} size={8.5} anchor="middle" fill="#FFFFFF">{tt("Go", "Los")}</Txt>
            <rect x="14" y="96" width="102" height="30" rx="4" fill="#F4F4F4" stroke={MID} />
            <Txt x={20} y={114} size={8.5}>{tt("5-minute units", "5-Minuten-Einheiten")}</Txt>
            <rect x="124" y="96" width="102" height="30" rx="4" fill="#F4F4F4" stroke={MID} />
            <Txt x={130} y={114} size={8.5}>{tt("My progress", "Mein Fortschritt")}</Txt>
          </>
        )}
        {kind === "teacher" && (
          <>
            <Txt x={14} y={30} size={9} bold>{tt("Course editor", "Kurseditor")}</Txt>
            {Array.from({ length: 9 }, (_, i) => (
              <rect key={i} x={14 + i * 24} y={36} width="22" height="12" rx="2" fill={i === 2 ? DARK : "#E2E2E2"} stroke={LINE} />
            ))}
            <Lines x={14} y={58} n={4} w={212} gap={8} fill={MID} />
            <rect x="14" y="96" width="212" height="52" rx="3" fill="#FAFAFA" stroke={MID} />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <Txt x={20} y={108 + i * 13} size={8}>{[tt("Learner A · 80%", "Lernende A · 80 %"), tt("Learner B · stopped", "Lernende B · aufgehört"), tt("Learner C · 10%", "Lernende C · 10 %")][i]}</Txt>
              </g>
            ))}
          </>
        )}
        {kind === "both" && (
          <>
            <Txt x={14} y={30} size={9.5} bold>{tt("Negotiation basics · course outline", "Verhandlungsgrundlagen · Kursgliederung")}</Txt>
            {[0, 1].map((g) => (
              <g key={g}>
                <rect x="14" y={38 + g * 54} width="212" height="14" rx="3" fill={DARK} />
                <Txt x={20} y={48 + g * 54} size={8.5} bold fill="#FFFFFF">{[tt("Group 1 · Basics", "Gruppe 1 · Grundlagen"), tt("Group 2 · Practice", "Gruppe 2 · Praxis")][g]}</Txt>
                {[0, 1].map((i) => (
                  <g key={i}>
                    <rect x="22" y={56 + g * 54 + i * 18} width="196" height="14" rx="2" fill="#F0F0F0" stroke={MID} />
                    <Txt x={28} y={66 + g * 54 + i * 18} size={8}>{`${g * 2 + i + 1} · ${tt("Unit", "Einheit")}`}</Txt>
                  </g>
                ))}
              </g>
            ))}
          </>
        )}
        {kind === "everyone" && (
          <>
            <rect x="14" y="26" width="212" height="26" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.4" />
            <Txt x={20} y={42} size={8.5} bold>{tt("Resume: unit 3", "Fortsetzen: Einheit 3")}</Txt>
            {Array.from({ length: 9 }, (_, i) => (
              <rect key={i} x={14 + i * 24} y={58} width="22" height="12" rx="2" fill="#E2E2E2" stroke={LINE} />
            ))}
            {Array.from({ length: 10 }, (_, i) => (
              <circle key={i} cx={24 + (i % 5) * 42} cy={90 + Math.floor(i / 5) * 24} r="9" fill="#FAFAFA" stroke={DARK} strokeWidth="1.2" />
            ))}
            <Lines x={14} y={132} n={3} w={212} gap={8} fill={MID} />
          </>
        )}
      </Frame>
    </Svg>
  );
}

/* ------------------------------------------------------------------ the Task 1 evidence: five touchpoints of EduPath */

export function TouchpointsPicture() {
  const label = tt(
    "EduPath: five touchpoints. A learner meets the lesson app and the reminder email; a teacher meets the course editor and the learner list; the organisation meets the monthly export",
    "EduPath: fünf Touchpoints. Eine Lernende trifft auf die Lern-App und die Erinnerungs-E-Mail; eine Lehrende trifft auf den Kurseditor und die Lernendenliste; die Organisation trifft auf den Monatsexport",
  );
  const rows: [number, string, string, number, number][] = [
    [1, tt("Lesson app", "Lern-App"), tt("Learner", "Lernende"), 40, 36],
    [2, tt("Reminder email", "Erinnerungs-E-Mail"), tt("Learner", "Lernende"), 40, 108],
    [3, tt("Course editor", "Kurseditor"), tt("Teacher", "Lehrende"), 150, 36],
    [4, tt("Learner list", "Lernendenliste"), tt("Teacher", "Lehrende"), 150, 108],
    [5, tt("Monthly export", "Monatsexport"), tt("Organisation", "Organisation"), 260, 72],
  ];
  return (
    <Svg viewBox="0 0 360 170" label={label} className="mx-auto h-auto w-full max-w-[560px]">
      {[tt("Learner", "Lernende"), tt("Teacher", "Lehrende"), tt("Organisation", "Organisation")].map((g, i) => (
        <g key={g}>
          <rect x={8 + i * 110} y={6} width="100" height="158" rx="6" fill="#FAFAFA" stroke={MID} strokeDasharray="5 4" />
          <Txt x={58 + i * 110} y={20} size={9.5} bold anchor="middle">{g}</Txt>
        </g>
      ))}
      {rows.map(([n, name, who, x, yy]) => (
        <g key={n}>
          <rect x={x - 28} y={yy - 14} width="96" height="38" rx="5" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <circle cx={x - 28} cy={yy - 14} r="9.5" fill="#17212E" />
          <text x={x - 28} y={yy - 10} textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFFFFF" fontFamily="system-ui,sans-serif">{n}</text>
          <Txt x={x - 24} y={yy + 4} size={9} bold>{name}</Txt>
          <Txt x={x - 24} y={yy + 16} size={8} fill="#555555">{who}</Txt>
        </g>
      ))}
      <Arrow x1={108} y1={72} x2={118} y2={72} color={MID} dash="3 3" />
      <Arrow x1={218} y1={72} x2={228} y2={72} color={MID} dash="3 3" />
    </Svg>
  );
}

/* ------------------------------------------------------------------ thumbnails for the measures and decisions of the cards and the two tasks */

export type MeasureKind =
  | "formats" | "resume" | "editor" | "stuck" | "reuse" | "structure" | "report" | "badges" | "brand"
  | "onboarding" | "exam" | "research" | "site";

export function MeasureThumb({ kind }: { kind: MeasureKind }) {
  const labels: Record<MeasureKind, string> = {
    formats: tt("A lesson cut into five-minute units that can be paused", "Eine Lektion in Fünf-Minuten-Einheiten, die sich pausieren lassen"),
    resume: tt("A resume button on a lesson screen", "Ein Fortsetzen-Button auf einem Lektionsbildschirm"),
    editor: tt("A course editor with nine tabs", "Ein Kurseditor mit neun Reitern"),
    stuck: tt("A list of learners with the stuck ones marked", "Eine Liste von Lernenden, die Festgefahrenen markiert"),
    reuse: tt("One unit copied into a second course", "Eine Einheit in einen zweiten Kurs kopiert"),
    structure: tt("One course outline with groups and order", "Eine Kursgliederung mit Gruppen und Reihenfolge"),
    report: tt("A formatted report sent to a training manager", "Ein formatierter Bericht an eine Weiterbildungsleiterin"),
    badges: tt("A wall of badges", "Eine Wand aus Badges"),
    brand: tt("A new colour scheme and fonts", "Ein neues Farbschema und neue Schriften"),
    onboarding: tt("Three different first steps for learner, teacher and training manager", "Drei verschiedene erste Schritte für Lernende, Lehrende und Weiterbildungsleiter"),
    exam: tt("Practice sets and notes for exam preparation", "Übungssätze und Notizen für die Prüfungsvorbereitung"),
    research: tt("A calendar of quarterly interviews", "Ein Kalender mit vierteljährlichen Interviews"),
    site: tt("A redesigned public web page", "Eine neu gestaltete öffentliche Webseite"),
  };
  return (
    <Thumb label={labels[kind]}>
      {kind === "formats" && (
        <>
          <rect x="14" y="14" width="68" height="82" rx="3" fill="#FFFFFF" stroke={LINE} />
          <Lines x={20} y={22} n={8} w={56} gap={8} fill={MID} />
          <Arrow x1={88} y1={55} x2={104} y2={55} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={110 + (i % 2) * 40} y={16 + Math.floor(i / 2) * 42} width="36" height="36" rx="3" fill="#F4F4F4" stroke={DARK} />
              <Txt x={128 + (i % 2) * 40} y={38 + Math.floor(i / 2) * 42} size={8} bold anchor="middle">{tt("5 min", "5 Min.")}</Txt>
            </g>
          ))}
        </>
      )}
      {kind === "resume" && (
        <>
          <MiniPage x={14} y={12} w={172} h={86} n={6} />
          <rect x="106" y="70" width="72" height="20" rx="4" fill={DARK} />
          <Txt x={142} y={84} size={8.5} bold anchor="middle" fill="#FFFFFF">{tt("Resume", "Fortsetzen")}</Txt>
        </>
      )}
      {kind === "editor" && (
        <>
          {Array.from({ length: 9 }, (_, i) => (
            <rect key={i} x={14 + i * 19} y={14} width="17" height="12" rx="2" fill={i === 0 ? DARK : "#E2E2E2"} stroke={LINE} />
          ))}
          <MiniPage x={14} y={34} w={172} h={62} n={6} />
        </>
      )}
      {kind === "stuck" && (
        <>
          {[tt("A · 80%", "A · 80 %"), tt("B · stopped", "B · aufgehört"), tt("C · 10%", "C · 10 %"), tt("D · 60%", "D · 60 %")].map((s, i) => (
            <g key={i}>
              <rect x="20" y={14 + i * 20} width="160" height="16" rx="3" fill={i === 1 || i === 2 ? "#E2E2E2" : "#FAFAFA"} stroke={i === 1 || i === 2 ? DARK : MID} strokeWidth={i === 1 || i === 2 ? 1.8 : 1} />
              <Txt x={28} y={25 + i * 20} size={8.5}>{s}</Txt>
              {(i === 1 || i === 2) && <Txt x={172} y={25 + i * 20} size={8.5} bold anchor="end">{tt("stuck", "festgefahren")}</Txt>}
            </g>
          ))}
        </>
      )}
      {kind === "reuse" && (
        <>
          <rect x="14" y="22" width="68" height="64" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <Txt x={48} y={36} size={8} bold anchor="middle">{tt("Course 1", "Kurs 1")}</Txt>
          <rect x="22" y="44" width="52" height="16" rx="2" fill={DARK} />
          <Txt x={48} y={55} size={7.5} anchor="middle" fill="#FFFFFF">{tt("Unit 4", "Einheit 4")}</Txt>
          <Arrow x1={86} y1={52} x2={112} y2={52} />
          <rect x="118" y="22" width="68" height="64" rx="3" fill="#FFFFFF" stroke={LINE} />
          <Txt x={152} y={36} size={8} bold anchor="middle">{tt("Course 2", "Kurs 2")}</Txt>
          <rect x="126" y="44" width="52" height="16" rx="2" fill="#F4F4F4" stroke={DARK} strokeDasharray="3 2" />
          <Txt x={152} y={55} size={7.5} anchor="middle">{tt("Unit 4", "Einheit 4")}</Txt>
        </>
      )}
      {kind === "structure" && (
        <>
          {[0, 1].map((g) => (
            <g key={g}>
              <rect x="16" y={14 + g * 44} width="168" height="14" rx="3" fill={DARK} />
              {[0, 1].map((i) => (
                <rect key={i} x={26} y={32 + g * 44 + i * 5} width={150 - i * 20} height="4" rx="2" fill={MID} />
              ))}
            </g>
          ))}
        </>
      )}
      {kind === "report" && (
        <>
          <rect x="14" y="14" width="64" height="82" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <Txt x={46} y={28} size={8} bold anchor="middle">{tt("Report", "Bericht")}</Txt>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={22 + i * 16} y={70 - (i + 1) * 12} width="12" height={(i + 1) * 12} fill={MID} stroke={DARK} />
          ))}
          <Arrow x1={86} y1={55} x2={112} y2={55} />
          <rect x="118" y="38" width="68" height="34" rx="4" fill="#F4F4F4" stroke={DARK} />
          <Txt x={152} y={58} size={8.5} bold anchor="middle">{tt("Manager", "Leiterin")}</Txt>
        </>
      )}
      {kind === "badges" && (
        <>
          {Array.from({ length: 10 }, (_, i) => (
            <circle key={i} cx={30 + (i % 5) * 36} cy={38 + Math.floor(i / 5) * 40} r="13" fill="#FAFAFA" stroke={DARK} strokeWidth="1.5" />
          ))}
        </>
      )}
      {kind === "brand" && (
        <>
          {["#E2E2E2", "#BDBDBD", "#8E8E8E", "#3A3A3A"].map((c, i) => (
            <rect key={i} x={20 + i * 40} y={20} width="34" height="34" rx="4" fill={c} stroke={LINE} />
          ))}
          <Txt x={20} y={80} size={14} bold>Aa</Txt>
          <Txt x={60} y={80} size={14}>Aa</Txt>
        </>
      )}
      {kind === "onboarding" && (
        <>
          {[tt("Learner", "Lernende"), tt("Teacher", "Lehrende"), tt("Manager", "Leiterin")].map((s, i) => (
            <g key={s}>
              <rect x={12 + i * 62} y={22} width="56" height="62" rx="4" fill="#F4F4F4" stroke={DARK} strokeWidth="1.4" />
              <Txt x={40 + i * 62} y={38} size={8} bold anchor="middle">{s}</Txt>
              <Lines x={18 + i * 62} y={46} n={3} w={44} gap={9} fill={MID} />
            </g>
          ))}
        </>
      )}
      {kind === "exam" && (
        <>
          <rect x="14" y="14" width="80" height="82" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <Tick x={26} y={30 + i * 16} r={5} />
              <rect x={36} y={28 + i * 16} width={44 - i * 6} height="4" rx="2" fill={MID} />
            </g>
          ))}
          <rect x="104" y="22" width="82" height="66" rx="3" fill="#F4F4F4" stroke={LINE} />
          <Lines x={110} y={30} n={6} w={70} gap={8} fill={MID} />
        </>
      )}
      {kind === "research" && (
        <>
          <rect x="14" y="14" width="172" height="82" rx="3" fill="#FFFFFF" stroke={LINE} />
          {Array.from({ length: 4 }, (_, i) => (
            <g key={i}>
              <rect x={22 + i * 42} y={24} width="36" height="14" rx="2" fill={i === 0 ? DARK : "#E2E2E2"} />
              <Txt x={40 + i * 42} y={34} size={8} anchor="middle" fill={i === 0 ? "#FFFFFF" : "#333333"}>{`Q${i + 1}`}</Txt>
            </g>
          ))}
          <Person x={50} y={64} s={0.7} />
          <rect x="66" y="52" width="60" height="18" rx="8" fill="#F4F4F4" stroke={LINE} />
          <Txt x={96} y={64} size={7.5} anchor="middle">{tt("Interview", "Interview")}</Txt>
        </>
      )}
      {kind === "site" && (
        <>
          <MiniPage x={14} y={12} w={172} h={86} />
          <rect x="22" y="20" width="156" height="22" rx="3" fill={DARK} />
          <Txt x={100} y={35} size={10} bold anchor="middle" fill="#FFFFFF">{tt("Learn with EduPath", "Lernen mit EduPath")}</Txt>
          <Lines x={22} y={52} n={4} w={156} gap={9} fill={MID} />
        </>
      )}
    </Thumb>
  );
}
