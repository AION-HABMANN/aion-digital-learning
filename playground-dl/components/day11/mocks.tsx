"use client";

import { Arrow, DARK, Frame, LITE, Lines, MID, Marker, Person, Svg, Thumb, Txt } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Real pictures for Day 11 (CLAUDE.md #52): the four GameLearn screens of the task with their numbered markers, a lesson screen that gains game elements one at a time, a learner
 * with a prize, without it and with interest, activity against learning for three set-ups, and a thumbnail for every measure, option and decision. Mock screens use their own
 * neutral greys, plus colour only where the problem needs it; the site's blue, teal and rust never colour the evidence (#15, #49).
 */

const RED = "#B3382A";
const GOLD = "#C58A1B";

/* ------------------------------------------------------------------ the Task 1 evidence: four GameLearn screens, eight facts */

export type GlScreen = "dash" | "board" | "unit" | "start";

export function GameScreen({ kind }: { kind: GlScreen }) {
  const label =
    kind === "dash"
      ? tt("GameLearn dashboard: 10 points for every login and a daily streak counter that has turned red", "GameLearn-Dashboard: 10 Punkte für jede Anmeldung und ein Tages-Streak-Zähler, der rot geworden ist")
      : kind === "board"
        ? tt("GameLearn leaderboard: a list of learners ranked by points, with a prize for the top three", "GameLearn-Rangliste: eine Liste von Lernenden nach Punkten, mit einem Preis für die ersten drei")
        : kind === "unit"
          ? tt("GameLearn unit: a bar of lessons finished, a result line after a task, and three difficulty steps", "GameLearn-Einheit: ein Balken erledigter Lektionen, eine Ergebniszeile nach einer Aufgabe und drei Schwierigkeitsstufen")
          : tt("Start of a GameLearn unit: a short story case and a choice of three topics", "Beginn einer GameLearn-Einheit: ein kurzer Fallfaden und eine Wahl von drei Themen");
  return (
    <Svg viewBox="0 0 240 170" label={label}>
      <Frame>
        {kind === "dash" && (
          <>
            <Txt x={12} y={30} size={9} bold>{tt("Welcome back, Kim", "Willkommen zurück, Kim")}</Txt>
            <rect x="12" y="38" width="106" height="52" rx="5" fill="#FFFFFF" stroke={DARK} strokeWidth="1.5" />
            <Txt x={65} y={64} size={18} anchor="middle" bold>{tt("+10", "+10")}</Txt>
            <Txt x={65} y={80} size={7.5} anchor="middle">{tt("points for logging in", "Punkte fürs Anmelden")}</Txt>
            <rect x="126" y="38" width="100" height="52" rx="5" fill="#FFFFFF" stroke={RED} strokeWidth="1.5" />
            <Txt x={176} y={62} size={16} anchor="middle" bold fill={RED}>{tt("Streak: 6", "Streak: 6")}</Txt>
            <Txt x={176} y={78} size={7.2} anchor="middle" fill={RED}>{tt("Log in today or lose it", "Heute anmelden oder verlieren")}</Txt>
            <rect x="12" y="100" width="214" height="14" rx="3" fill={LITE} />
            <Txt x={18} y={110} size={7}>{tt("Total points: 2,340", "Gesamtpunkte: 2.340")}</Txt>
            <Lines x={12} y={124} n={2} w={214} gap={9} fill="#D0D0D0" />
            <Marker x={110} y={46} n={1} />
            <Marker x={218} y={46} n={3} />
          </>
        )}
        {kind === "board" && (
          <>
            <Txt x={12} y={30} size={9} bold>{tt("Leaderboard · all learners", "Rangliste · alle Lernenden")}</Txt>
            {[
              ["1", "Alex", "9,810", true],
              ["2", "Sam", "9,640", true],
              ["3", "Rui", "9,402", true],
              ["…", "", "", false],
              ["4,200", tt("You", "Sie"), "2,340", false],
            ].map(([r, n, p, top], i) => (
              <g key={i}>
                <rect x="12" y={38 + i * 19} width="214" height="16" rx="3" fill={i === 4 ? "#FFFFFF" : LITE} stroke={i === 4 ? DARK : "none"} />
                <Txt x={18} y={49.5 + i * 19} size={7.6} bold={i === 4}>{String(r)}</Txt>
                <Txt x={52} y={49.5 + i * 19} size={7.6} bold={i === 4}>{String(n)}</Txt>
                <Txt x={150} y={49.5 + i * 19} size={7.6} anchor="end">{String(p)}</Txt>
                {top && <Txt x={218} y={49.5 + i * 19} size={7.2} anchor="end" fill={GOLD} bold>{tt("Prize", "Preis")}</Txt>}
              </g>
            ))}
            <Marker x={216} y={46} n={2} />
          </>
        )}
        {kind === "unit" && (
          <>
            <Txt x={12} y={30} size={9} bold>{tt("Unit 3 · Negotiation", "Einheit 3 · Verhandeln")}</Txt>
            <rect x="12" y="36" width="214" height="9" rx="4.5" fill={LITE} />
            <rect x="12" y="36" width="128" height="9" rx="4.5" fill={DARK} />
            <Txt x={12} y={56} size={7}>{tt("6 of 10 lessons finished", "6 von 10 Lektionen erledigt")}</Txt>
            <rect x="12" y="64" width="214" height="30" rx="4" fill="#FFFFFF" stroke={DARK} />
            <Txt x={18} y={76} size={7} fill="#333333">{tt("Right: you named your number first.", "Richtig: Sie haben Ihre Zahl zuerst genannt.")}</Txt>
            <Txt x={18} y={87} size={7} fill="#333333">{tt("Practise: asking about the other side's goals.", "Üben: nach den Zielen der Gegenseite fragen.")}</Txt>
            {[tt("Step 1", "Stufe 1"), tt("Step 2", "Stufe 2"), tt("Step 3", "Stufe 3")].map((s, i) => (
              <g key={i}>
                <rect x={12 + i * 72} y="104" width="68" height="16" rx="3" fill={i === 1 ? DARK : LITE} />
                <Txt x={46 + i * 72} y={115} size={7.4} anchor="middle" fill={i === 1 ? "#FFFFFF" : "#333333"}>{s}</Txt>
              </g>
            ))}
            <Txt x={12} y={134} size={6.8} fill="#555555">{tt("Up a step after two correct answers", "Eine Stufe höher nach zwei richtigen Antworten")}</Txt>
            <Marker x={216} y={42} n={4} />
            <Marker x={216} y={79} n={5} />
            <Marker x={118} y={112} n={6} />
          </>
        )}
        {kind === "start" && (
          <>
            <Txt x={12} y={30} size={9} bold>{tt("Unit 4 · Handling a price objection", "Einheit 4 · Mit einem Preiseinwand umgehen")}</Txt>
            <rect x="12" y="38" width="214" height="40" rx="5" fill="#FFFFFF" stroke={DARK} />
            <Txt x={18} y={52} size={7.4} bold>{tt("Your client Mara says the offer is too dear.", "Ihre Kundin Mara sagt, das Angebot sei zu teuer.")}</Txt>
            <Lines x={18} y={58} n={2} w={202} gap={8} fill="#C4C4C4" />
            <Txt x={12} y={96} size={7.6} bold>{tt("Where do you want to start?", "Womit möchten Sie beginnen?")}</Txt>
            {[tt("Her budget", "Ihr Budget"), tt("The value", "Der Wert"), tt("The timing", "Das Timing")].map((s, i) => (
              <g key={i}>
                <rect x={12 + i * 72} y="104" width="68" height="20" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.3" />
                <Txt x={46 + i * 72} y={117} size={7.6} anchor="middle">{s}</Txt>
              </g>
            ))}
            <Marker x={216} y={44} n={7} />
            <Marker x={118} y={112} n={8} />
          </>
        )}
      </Frame>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A1 · one lesson screen that gains game elements */

export type LessonOn = { points: boolean; badges: boolean; board: boolean; progress: boolean };

export function LessonGameMock({ on }: { on: LessonOn }) {
  const n = [on.points, on.badges, on.board, on.progress].filter(Boolean).length;
  return (
    <Svg viewBox="0 0 240 150" label={tt(`A lesson screen with ${n} of 4 game elements switched on: points, badges, a leaderboard and a progress bar`, `Ein Lektionsbildschirm mit ${n} von 4 eingeschalteten Spielelementen: Punkte, Abzeichen, Rangliste und Fortschrittsbalken`)}>
      <rect x="1" y="1" width="238" height="148" rx="5" fill="#F6F6F6" stroke={MID} />
      <Txt x={12} y={20} size={8.5} bold>{tt("Lesson 3 · Anchoring", "Lektion 3 · Anker")}</Txt>
      <Lines x={12} y={30} n={4} w={on.board ? 150 : 216} gap={8} fill="#C4C4C4" />
      {on.points && (
        <g>
          <rect x="150" y="8" width="76" height="16" rx="8" fill="#FFFFFF" stroke={DARK} />
          <Txt x={188} y={19} size={8} anchor="middle" bold>{tt("★ 1,240 points", "★ 1.240 Punkte")}</Txt>
        </g>
      )}
      {on.board && (
        <g>
          <rect x="172" y="30" width="54" height="52" rx="4" fill="#FFFFFF" stroke={MID} />
          <Txt x={199} y={41} size={6.4} anchor="middle" bold>{tt("Top 3", "Top 3")}</Txt>
          {[0, 1, 2].map((i) => (
            <rect key={i} x="178" y={46 + i * 11} width="42" height="7" rx="2" fill={LITE} />
          ))}
        </g>
      )}
      {on.badges && (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx={24 + i * 26} cy="86" r="9" fill="#FFFFFF" stroke={DARK} strokeWidth="1.5" />
              <Txt x={24 + i * 26} y={90} size={9} anchor="middle">{["★", "◆", "●"][i]}</Txt>
            </g>
          ))}
          <Txt x={96} y={89} size={7}>{tt("3 badges", "3 Abzeichen")}</Txt>
        </g>
      )}
      {on.progress && (
        <g>
          <rect x="12" y="112" width="216" height="9" rx="4.5" fill={LITE} />
          <rect x="12" y="112" width="86" height="9" rx="4.5" fill={DARK} />
          <Txt x={12} y={134} size={7.4}>{tt("4 of 10 objectives mastered", "4 von 10 Zielen gemeistert")}</Txt>
        </g>
      )}
      {!on.progress && <Txt x={12} y={134} size={7} fill="#777777">{tt("(no sign of how much has been learned)", "(kein Zeichen, wie viel gelernt wurde)")}</Txt>}
    </Svg>
  );
}

/* ------------------------------------------------------------------ A2 · a learner with a prize, without it, with interest */

export type MotivKind = "prize" | "gone" | "interest";

export function MotivMock({ kind }: { kind: MotivKind }) {
  return (
    <Svg
      viewBox="0 0 240 130"
      label={
        kind === "prize"
          ? tt("Kim studies while a prize hangs in front of her", "Kim lernt, während ein Preis vor ihr hängt")
          : kind === "gone"
            ? tt("The prize is gone and Kim has put her book down", "Der Preis ist weg und Kim hat ihr Buch weggelegt")
            : tt("Kim studies because the topic is interesting; there is no prize", "Kim lernt, weil das Thema interessant ist; es gibt keinen Preis")
      }
    >
      <rect x="1" y="1" width="238" height="128" rx="5" fill="#F6F6F6" stroke={MID} />
      <Person x={70} y={46} s={1.5} />
      {kind !== "gone" && <rect x="86" y="86" width="40" height="22" rx="2" fill="#FFFFFF" stroke={DARK} strokeWidth="1.5" />}
      {kind === "gone" && <rect x="8" y="98" width="40" height="10" rx="2" fill="#FFFFFF" stroke={DARK} strokeWidth="1.5" transform="rotate(-8 28 103)" />}
      {kind === "prize" && (
        <g>
          <circle cx="190" cy="40" r="20" fill="#FFFFFF" stroke={GOLD} strokeWidth="2.4" />
          <Txt x={190} y={46} size={18} anchor="middle" bold fill={GOLD}>★</Txt>
          <Txt x={190} y={76} size={8} anchor="middle">{tt("A prize for the most points", "Ein Preis für die meisten Punkte")}</Txt>
          <Arrow x1={110} y1={40} x2={166} y2={40} color={GOLD} />
        </g>
      )}
      {kind === "gone" && (
        <g>
          <circle cx="190" cy="40" r="20" fill="none" stroke={MID} strokeWidth="2" strokeDasharray="4 4" />
          <Txt x={190} y={76} size={8} anchor="middle" fill="#777777">{tt("The prize is gone", "Der Preis ist weg")}</Txt>
          <Txt x={150} y={112} size={8}>{tt("“Why would I still do this?”", "„Warum sollte ich das noch tun?“")}</Txt>
        </g>
      )}
      {kind === "interest" && (
        <g>
          <path d="M150 34 q8 -16 22 -4 q14 -12 22 6 q-6 18 -22 24 q-18 -6 -22 -26 z" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <Txt x={172} y={42} size={14} anchor="middle" bold>?!</Txt>
          <Txt x={172} y={76} size={8} anchor="middle">{tt("“How does this work?”", "„Wie funktioniert das?“")}</Txt>
        </g>
      )}
    </Svg>
  );
}

/* ------------------------------------------------------------------ A3 · activity against learning for three set-ups */

export type ActivityKind = "login" | "objectives" | "everything";

const ACT: Record<ActivityKind, [number, number]> = { login: [9, 2], objectives: [6, 7], everything: [10, 3] };

export function ActivityMock({ kind }: { kind: ActivityKind }) {
  const [a, l] = ACT[kind];
  return (
    <Svg
      viewBox="0 0 240 140"
      label={
        kind === "login"
          ? tt("Points for logging in: activity is high and learning is low", "Punkte fürs Anmelden: Aktivität ist hoch und Lernen niedrig")
          : kind === "objectives"
            ? tt("Progress by objectives: activity is moderate and learning is about as high", "Fortschritt nach Zielen: Aktivität ist mäßig und Lernen etwa ebenso hoch")
            : tt("Every game element switched on: activity is at its highest and learning is still low", "Alle Spielelemente eingeschaltet: Aktivität ist am höchsten und Lernen noch niedrig")
      }
    >
      <rect x="1" y="1" width="238" height="138" rx="5" fill="#F6F6F6" stroke={MID} />
      <Txt x={12} y={18} size={8.4} bold>{kind === "login" ? tt("Points for logging in", "Punkte fürs Anmelden") : kind === "objectives" ? tt("Progress by objectives", "Fortschritt nach Zielen") : tt("Everything switched on", "Alles eingeschaltet")}</Txt>
      <line x1="62" y1="26" x2="62" y2="126" stroke={MID} />
      {[tt("Logins and clicks", "Anmeldungen und Klicks"), tt("Objectives mastered", "Gemeisterte Ziele")].map((s, i) => (
        <g key={i}>
          <Txt x={58} y={52 + i * 42} size={6.8} anchor="end">{s}</Txt>
          <rect x="62" y={38 + i * 42} width="160" height="22" rx="2" fill={LITE} />
          <rect x="62" y={38 + i * 42} width={16 * (i === 0 ? a : l)} height="22" rx="2" fill={DARK} />
          <Txt x={66 + 16 * (i === 0 ? a : l)} y={53 + i * 42} size={8} bold fill={16 * (i === 0 ? a : l) > 150 ? "#FFFFFF" : "#333333"}>{String(i === 0 ? a : l)}</Txt>
        </g>
      ))}
      <Txt x={12} y={134} size={6.6} fill="#777777">{tt("Case assumption: invented values out of 10", "Fallannahme: erfundene Werte von 10")}</Txt>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A2 · the three needs, static */

export function NeedsMock() {
  const cols = [
    { x: 4, h: tt("Autonomy", "Autonomie"), s: tt("I choose", "Ich wähle") },
    { x: 84, h: tt("Competence", "Kompetenz"), s: tt("I am getting better", "Ich werde besser") },
    { x: 164, h: tt("Relatedness", "Zugehörigkeit"), s: tt("I belong", "Ich gehöre dazu") },
  ];
  return (
    <Svg viewBox="0 0 240 110" label={tt("The three needs: autonomy drawn as three paths, competence as steps going up, relatedness as two people side by side", "Die drei Bedürfnisse: Autonomie als drei Wege, Kompetenz als aufsteigende Stufen, Zugehörigkeit als zwei Menschen nebeneinander")}>
      {cols.map((c) => (
        <g key={c.x}>
          <rect x={c.x + 2} y="2" width="72" height="106" rx="5" fill="#F6F6F6" stroke={MID} />
          <Txt x={c.x + 38} y={16} size={8} anchor="middle" bold>{c.h}</Txt>
          <Txt x={c.x + 38} y={100} size={7} anchor="middle">{c.s}</Txt>
        </g>
      ))}
      <path d="M42 80 v-22 M42 58 l-16 -18 M42 58 l16 -18 M42 58 v-20" stroke={DARK} strokeWidth="2" fill="none" strokeLinecap="round" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={98 + i * 16} y={74 - i * 16} width="16" height={16 + i * 16} fill={i === 2 ? DARK : LITE} stroke={DARK} />
      ))}
      <Person x={188} y={44} s={0.9} />
      <Person x={216} y={44} s={0.9} />
      <path d="M196 72 q12 8 20 0" stroke={DARK} strokeWidth="1.6" fill="none" />
    </Svg>
  );
}

/* ------------------------------------------------------------------ A4 · principles of meaningful gamification, static */

export function PrinciplesMock() {
  return (
    <Svg viewBox="0 0 240 120" label={tt("Three principles: a mechanic linked to an objective, a rule everyone can see, and a challenge matched to ability", "Drei Prinzipien: eine Mechanik, die mit einem Ziel verbunden ist, eine Regel, die alle sehen können, und eine Herausforderung, die zur Fähigkeit passt")}>
      {[4, 84, 164].map((x) => (
        <rect key={x} x={x + 2} y="2" width="72" height="116" rx="5" fill="#F6F6F6" stroke={MID} />
      ))}
      <Txt x={42} y={16} size={7.4} anchor="middle" bold>{tt("A meaningful link", "Eine sinnvolle Verbindung")}</Txt>
      <rect x="12" y="30" width="24" height="16" rx="3" fill="#FFFFFF" stroke={DARK} />
      <Txt x={24} y={41} size={6.4} anchor="middle">{tt("Badge", "Badge")}</Txt>
      <Arrow x1={38} y1={38} x2={52} y2={38} />
      <rect x="54" y="30" width="22" height="16" rx="3" fill={DARK} />
      <Txt x={65} y={41} size={6.2} anchor="middle" fill="#FFFFFF">{tt("Goal", "Ziel")}</Txt>
      <Txt x={42} y={72} size={6.6} anchor="middle">{tt("Every element serves", "Jedes Element dient")}</Txt>
      <Txt x={42} y={82} size={6.6} anchor="middle">{tt("a learning goal", "einem Lernziel")}</Txt>
      <Txt x={122} y={16} size={7.4} anchor="middle" bold>{tt("A rule all can see", "Eine Regel für alle")}</Txt>
      <rect x="96" y="28" width="52" height="38" rx="3" fill="#FFFFFF" stroke={DARK} />
      <Lines x={102} y={36} n={3} w={40} gap={8} fill={MID} />
      <Txt x={122} y={86} size={6.6} anchor="middle">{tt("Clear and fair:", "Klar und fair:")}</Txt>
      <Txt x={122} y={96} size={6.6} anchor="middle">{tt("no hidden scoring", "keine versteckte Wertung")}</Txt>
      <Txt x={202} y={16} size={7.4} anchor="middle" bold>{tt("Challenge and ability", "Herausforderung und Fähigkeit")}</Txt>
      <line x1="178" y1="92" x2="178" y2="30" stroke={DARK} />
      <line x1="178" y1="92" x2="228" y2="92" stroke={DARK} />
      <path d="M184 86 L222 36" stroke={DARK} strokeWidth="2.2" fill="none" />
      <path d="M184 86 L222 36" stroke={MID} strokeWidth="14" fill="none" opacity="0.5" />
      <Txt x={202} y={104} size={6.4} anchor="middle">{tt("Ability →", "Fähigkeit →")}</Txt>
      <Txt x={196} y={30} size={6.4} anchor="end">{tt("Challenge", "Herausf.")}</Txt>
    </Svg>
  );
}

/* ------------------------------------------------------------------ thumbnails for measures, options and decisions */

export type ThumbKind = "progress" | "feedback" | "link" | "choice" | "team" | "badges" | "streak" | "prize" | "ai" | "evidence" | "points" | "story" | "leaderboard";

export function MeasureThumb({ kind }: { kind: ThumbKind }) {
  const label: Record<ThumbKind, string> = {
    progress: tt("A bar of objectives mastered", "Ein Balken gemeisterter Ziele"),
    feedback: tt("A result line: what was right, what to practise", "Eine Ergebniszeile: was richtig war, was zu üben ist"),
    link: tt("A game element linked to a learning goal", "Ein Spielelement, mit einem Lernziel verbunden"),
    choice: tt("Three topics to choose from", "Drei Themen zur Auswahl"),
    team: tt("A group goal with no ranking", "Ein Gruppenziel ohne Rangliste"),
    badges: tt("Rows of badges", "Reihen von Abzeichen"),
    streak: tt("A daily streak that breaks", "Ein Tages-Streak, der reißt"),
    prize: tt("A prize for the top of a ranking", "Ein Preis für die Spitze einer Rangliste"),
    ai: tt("An AI choosing rewards for each learner", "Eine KI, die Belohnungen je Lernende wählt"),
    evidence: tt("A pilot group and a control group", "Eine Pilotgruppe und eine Kontrollgruppe"),
    points: tt("A points total", "Eine Punktesumme"),
    story: tt("A story case through each unit", "Ein Fallfaden durch jede Einheit"),
    leaderboard: tt("A leaderboard", "Eine Rangliste"),
  };
  return (
    <Thumb label={label[kind]}>
      {kind === "progress" && (
        <>
          <Txt x={14} y={22} size={9} bold>{tt("4 of 10 objectives", "4 von 10 Zielen")}</Txt>
          <rect x="14" y="30" width="172" height="10" rx="5" fill={LITE} />
          <rect x="14" y="30" width="70" height="10" rx="5" fill={DARK} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x="14" y={52 + i * 16} width="172" height="12" rx="2" fill={LITE} />
          ))}
        </>
      )}
      {kind === "feedback" && (
        <>
          <Txt x={14} y={28} size={16} bold>✓</Txt>
          <Lines x={44} y={14} n={3} w={140} gap={9} fill={MID} />
          <rect x="100" y="70" width="86" height="22" rx="4" fill={DARK} />
          <Txt x={143} y={85} size={8.6} anchor="middle" fill="#FFFFFF">{tt("Next ▶", "Weiter ▶")}</Txt>
        </>
      )}
      {kind === "link" && (
        <>
          <rect x="14" y="40" width="54" height="30" rx="5" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <Txt x={41} y={59} size={9} anchor="middle">{tt("Mechanic", "Mechanik")}</Txt>
          <Arrow x1={72} y1={55} x2={118} y2={55} />
          <rect x="122" y="40" width="64" height="30" rx="5" fill={DARK} />
          <Txt x={154} y={59} size={9} anchor="middle" fill="#FFFFFF">{tt("Goal", "Ziel")}</Txt>
        </>
      )}
      {kind === "choice" && (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={14 + i * 60} y="34" width="54" height="40" rx="5" fill="#FFFFFF" stroke={DARK} strokeWidth="1.5" />
              <Txt x={41 + i * 60} y={58} size={9} anchor="middle">{["A", "B", "C"][i]}</Txt>
            </g>
          ))}
          <Txt x={100} y={94} size={8} anchor="middle">{tt("You choose", "Sie wählen")}</Txt>
        </>
      )}
      {kind === "team" && (
        <>
          <Person x={52} y={34} s={0.9} />
          <Person x={100} y={34} s={0.9} />
          <Person x={148} y={34} s={0.9} />
          <rect x="30" y="80" width="140" height="10" rx="5" fill={LITE} />
          <rect x="30" y="80" width="92" height="10" rx="5" fill={DARK} />
        </>
      )}
      {kind === "badges" && (
        <>
          {Array.from({ length: 10 }, (_, i) => (
            <circle key={i} cx={28 + (i % 5) * 36} cy={38 + Math.floor(i / 5) * 36} r="12" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          ))}
        </>
      )}
      {kind === "streak" && (
        <>
          <Txt x={100} y={50} size={20} anchor="middle" bold fill={RED}>{tt("Streak: 6", "Streak: 6")}</Txt>
          <Txt x={100} y={78} size={9} anchor="middle" fill={RED}>{tt("−50 points if missed", "−50 Punkte, wenn verpasst")}</Txt>
        </>
      )}
      {kind === "prize" && (
        <>
          <circle cx="100" cy="42" r="22" fill="#FFFFFF" stroke={GOLD} strokeWidth="2.6" />
          <Txt x={100} y={50} size={22} anchor="middle" bold fill={GOLD}>★</Txt>
          <Txt x={100} y={86} size={9} anchor="middle">{tt("Top 10 win", "Die ersten 10 gewinnen")}</Txt>
        </>
      )}
      {kind === "ai" && (
        <>
          <rect x="70" y="24" width="60" height="40" rx="6" fill={DARK} />
          <Txt x={100} y={50} size={14} anchor="middle" bold fill="#FFFFFF">AI</Txt>
          {[0, 1, 2].map((i) => (
            <Arrow key={i} x1={100} y1={66} x2={40 + i * 60} y2={92} />
          ))}
        </>
      )}
      {kind === "evidence" && (
        <>
          <rect x="14" y="26" width="78" height="62" rx="5" fill="#FFFFFF" stroke={DARK} strokeWidth="1.5" />
          <rect x="108" y="26" width="78" height="62" rx="5" fill="#FFFFFF" stroke={DARK} strokeWidth="1.5" strokeDasharray="5 4" />
          <Txt x={53} y={62} size={8.4} anchor="middle">{tt("Pilot", "Pilot")}</Txt>
          <Txt x={147} y={62} size={8.4} anchor="middle">{tt("Control", "Kontrolle")}</Txt>
        </>
      )}
      {kind === "points" && (
        <>
          <Txt x={100} y={62} size={26} anchor="middle" bold>{tt("2,340", "2.340")}</Txt>
          <Txt x={100} y={84} size={9} anchor="middle">{tt("points", "Punkte")}</Txt>
        </>
      )}
      {kind === "story" && (
        <>
          <rect x="14" y="20" width="172" height="40" rx="5" fill="#FFFFFF" stroke={DARK} />
          <Lines x={22} y={30} n={3} w={156} gap={9} fill={MID} />
          <rect x="14" y="70" width="52" height="20" rx="4" fill="#FFFFFF" stroke={DARK} />
          <rect x="74" y="70" width="52" height="20" rx="4" fill="#FFFFFF" stroke={DARK} />
          <rect x="134" y="70" width="52" height="20" rx="4" fill="#FFFFFF" stroke={DARK} />
        </>
      )}
      {kind === "leaderboard" && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="14" y={14 + i * 22} width="172" height="16" rx="3" fill={i < 3 ? LITE : "#FFFFFF"} stroke={i < 3 ? "none" : DARK} />
          ))}
          <Txt x={178} y={26} size={8} anchor="end" fill={GOLD} bold>{tt("Prize", "Preis")}</Txt>
        </>
      )}
    </Thumb>
  );
}
