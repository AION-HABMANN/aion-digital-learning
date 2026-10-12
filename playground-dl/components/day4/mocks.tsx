"use client";

import type { ReactNode } from "react";
import { Arrow, DARK, Frame, LINE, LITE, Lines, MID, MiniPage, Svg, Thumb, Tick, Txt, Marker, Person } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Real pictures for Day 4 (CLAUDE.md #52): the lesson screen that gains one principle at a time, the result screens of a reward that supports learning and
 * of one that only pays, the two loyalty cards, a quiz with and without points, and a thumbnail for every measure of the two tasks. Mock screens use
 * their own neutral greys; the site's blue, teal and rust never colour the evidence (#15, #49).
 */

/* ------------------------------------------------------------------ A2 · one lesson screen that gains a principle at a time */

export type Principles5 = { goal: boolean; task: boolean; feedback: boolean; progress: boolean; example: boolean };

export function LessonBuilderMock({ on }: { on: Principles5 }) {
  const label = tt(
    `A lesson screen with ${[on.goal && "a goal sentence", on.task && "a task", on.feedback && "a result and a next step", on.progress && "a progress bar", on.example && "a work example"].filter(Boolean).join(", ") || "only a long block of reading"}`,
    `Ein Lektionsbildschirm mit ${[on.goal && "einem Zielsatz", on.task && "einer Aufgabe", on.feedback && "einem Ergebnis und einem nächsten Schritt", on.progress && "einem Fortschrittsbalken", on.example && "einem Praxisbeispiel"].filter(Boolean).join(", ") || "nur einem langen Lesetext"}`,
  );
  let y = 52;
  const els: ReactNode[] = [];
  if (on.goal) {
    els.push(
      <g key="goal">
        <rect x="14" y={y} width="272" height="18" rx="2" fill="#EDEDED" />
        <rect x="14" y={y} width="3" height="18" fill={DARK} />
        <Txt x={22} y={y + 12} size={8.5} bold>{tt("After this unit you can write a counter-offer", "Nach dieser Einheit können Sie ein Gegenangebot schreiben")}</Txt>
      </g>,
    );
    y += 24;
  }
  if (on.example) {
    els.push(
      <g key="ex">
        <rect x="14" y={y} width="272" height="28" rx="4" fill="#F4F4F4" stroke={LINE} strokeDasharray="4 3" />
        <Txt x={22} y={y + 12} size={8} bold>{tt("For example", "Zum Beispiel")}</Txt>
        <Txt x={22} y={y + 23} size={8}>{tt("A client asks for 20% off. What do you answer?", "Ein Kunde verlangt 20 % Nachlass. Was antworten Sie?")}</Txt>
      </g>,
    );
    y += 34;
  }
  if (on.task) {
    els.push(
      <g key="task">
        <rect x="14" y={y} width="272" height="46" rx="4" fill="#F0F0F0" stroke={MID} />
        <Txt x={22} y={y + 12} size={8} bold>{tt("Task · 3 min: write your counter-offer", "Aufgabe · 3 Min.: Schreiben Sie Ihr Gegenangebot")}</Txt>
        <rect x="22" y={y + 20} width="188" height="16" rx="3" fill="#FFFFFF" stroke={LINE} />
        <rect x="222" y={y + 20} width="56" height="16" rx="4" fill={DARK} />
        <Txt x={250} y={y + 31} size={8} anchor="middle" fill="#FFFFFF">{tt("Check", "Prüfen")}</Txt>
      </g>,
    );
    y += 52;
  }
  if (on.feedback) {
    els.push(
      <g key="fb">
        <rect x="14" y={y} width="272" height="22" rx="4" fill="#FFFFFF" stroke={DARK} />
        <Txt x={22} y={y + 9} size={7.5} bold>{on.task ? tt("Your offer names a price but no condition.", "Ihr Angebot nennt einen Preis, aber keine Bedingung.") : tt("Unit 3 done.", "Einheit 3 geschafft.")}</Txt>
        <Txt x={22} y={y + 18} size={7.5}>{on.task ? tt("Next: task 4", "Weiter: Aufgabe 4") : tt("Next: unit 4", "Weiter: Einheit 4")}</Txt>
      </g>,
    );
    y += 28;
  }
  const n = Math.max(1, Math.min(14, Math.floor((208 - y) / 8)));
  return (
    <Svg viewBox="0 0 300 220" label={label}>
      <Frame w={292} h={212}>
        <Txt x={14} y={32} size={10} bold>{tt("Negotiation basics · Unit 3", "Verhandlungsgrundlagen · Einheit 3")}</Txt>
        {on.progress && (
          <g>
            <rect x="14" y="38" width="226" height="7" rx="3.5" fill={LITE} stroke={LINE} />
            <rect x="14" y="38" width="90" height="7" rx="3.5" fill={DARK} />
            <Txt x={286} y={45} size={8} anchor="end">{tt("40% done", "40 % geschafft")}</Txt>
          </g>
        )}
        {els}
        <Lines x={14} y={y + 2} n={n} w={272} gap={8} fill={LINE} />
      </Frame>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A1 · a quiz, with and without points */

export type PointsPhase = "before" | "points" | "ended";

export function QuizMock({ phase }: { phase: PointsPhase }) {
  const label =
    phase === "before"
      ? tt("A quiz screen without any points", "Ein Quizbildschirm ohne Punkte")
      : phase === "points"
        ? tt("A quiz screen with a points banner and a points total", "Ein Quizbildschirm mit Punktebanner und Punktestand")
        : tt("A quiz screen where the points programme has ended", "Ein Quizbildschirm, auf dem das Punkteprogramm beendet ist");
  return (
    <Svg viewBox="0 0 240 150" label={label}>
      <Frame h={140}>
        <Txt x={14} y={32} size={9.5} bold>{tt("Quiz · contract basics", "Quiz · Vertragsgrundlagen")}</Txt>
        <Txt x={14} y={48} size={8.5}>{tt("Which clause limits liability?", "Welche Klausel begrenzt die Haftung?")}</Txt>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx="22" cy={64 + i * 16} r="3.6" fill="#FFFFFF" stroke={LINE} />
            <rect x="32" y={62 + i * 16} width={90 + i * 18} height="4" rx="2" fill={MID} />
          </g>
        ))}
        {phase === "points" && (
          <g>
            <rect x="150" y="26" width="80" height="24" rx="12" fill={DARK} />
            <Txt x={190} y={41} size={9} bold anchor="middle" fill="#FFFFFF">{tt("+10 points!", "+10 Punkte!")}</Txt>
            <rect x="150" y="60" width="80" height="22" rx="4" fill="#F0F0F0" stroke={LINE} />
            <Txt x={190} y={74} size={8} anchor="middle">{tt("Total: 340 points", "Gesamt: 340 Punkte")}</Txt>
          </g>
        )}
        {phase === "ended" && (
          <g>
            <rect x="150" y="26" width="80" height="24" rx="4" fill="#FAFAFA" stroke={MID} strokeDasharray="4 3" />
            <Txt x={190} y={41} size={8} anchor="middle" fill="#888888">{tt("Points ended", "Punkte beendet")}</Txt>
          </g>
        )}
        <rect x="14" y="118" width="56" height="16" rx="4" fill={DARK} />
        <Txt x={42} y={129} size={8} anchor="middle" fill="#FFFFFF">{tt("Answer", "Antworten")}</Txt>
      </Frame>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A3 · two result screens, two loyalty cards */

export function ResultScreen({ kind }: { kind: "skill" | "points" }) {
  const label = kind === "skill" ? tt("A result screen that says what the learner can now do and shows a skill bar", "Ein Ergebnisbildschirm, der sagt, was die Lernende jetzt kann, und einen Fähigkeitsbalken zeigt") : tt("A result screen that only pays points and shows a ranking", "Ein Ergebnisbildschirm, der nur Punkte zahlt und eine Rangliste zeigt");
  return (
    <Svg viewBox="0 0 240 170" label={label}>
      <Frame>
        {kind === "skill" ? (
          <>
            <Txt x={14} y={34} size={10} bold>{tt("Unit 3 done", "Einheit 3 geschafft")}</Txt>
            <Txt x={14} y={52} size={9}>{tt("You can now write a counter-offer.", "Sie können jetzt ein Gegenangebot schreiben.")}</Txt>
            <Txt x={14} y={78} size={8} bold>{tt("Negotiation skill", "Verhandlungsfähigkeit")}</Txt>
            <rect x="14" y="84" width="200" height="9" rx="4.5" fill={LITE} stroke={LINE} />
            <rect x="14" y="84" width="80" height="9" rx="4.5" fill={DARK} />
            <Txt x={14} y={110} size={8}>{tt("Level 2 of 5 · next: handling objections", "Stufe 2 von 5 · als Nächstes: Einwände behandeln")}</Txt>
            <rect x="140" y="130" width="86" height="20" rx="4" fill={DARK} />
            <Txt x={183} y={143} size={8.5} anchor="middle" fill="#FFFFFF">{tt("Next unit", "Nächste Einheit")}</Txt>
          </>
        ) : (
          <>
            <Txt x={14} y={38} size={18} bold>{tt("+10 points", "+10 Punkte")}</Txt>
            <Txt x={14} y={58} size={9}>{tt("You are number 14 this week.", "Sie sind diese Woche auf Platz 14.")}</Txt>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect x="14" y={72 + i * 15} width="200" height="12" rx="3" fill={i === 2 ? "#E2E2E2" : "#F4F4F4"} stroke={MID} />
                <Txt x={20} y={81 + i * 15} size={7.5}>{`${12 + i}. ${["Ana", "Ben", tt("You", "Sie"), "Dan"][i]}`}</Txt>
                <Txt x={208} y={81 + i * 15} size={7.5} anchor="end">{`${[420, 410, 340, 330][i]}`}</Txt>
              </g>
            ))}
          </>
        )}
      </Frame>
    </Svg>
  );
}

export function LoyaltyCard({ total, endowed }: { total: number; endowed: number }) {
  const cols = 6;
  const label = tt(`A loyalty card with ${total} stamp places, ${endowed} already stamped, ${total - endowed} still to collect`, `Eine Treuekarte mit ${total} Stempelplätzen, ${endowed} schon gestempelt, ${total - endowed} noch zu sammeln`);
  return (
    <Svg viewBox="0 0 220 120" label={label}>
      <rect x="4" y="4" width="212" height="112" rx="8" fill="#FFFFFF" stroke={LINE} strokeWidth="1.5" />
      <Txt x={14} y={22} size={9} bold>{tt(`Coffee card · ${total} stamps`, `Kaffeekarte · ${total} Stempel`)}</Txt>
      {Array.from({ length: total }, (_, i) => {
        const cx = 30 + (i % cols) * 32;
        const cy = 46 + Math.floor(i / cols) * 30;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r="11" fill={i < endowed ? "#E2E2E2" : "#FFFFFF"} stroke={DARK} strokeWidth="1.4" strokeDasharray={i < endowed ? undefined : "3 3"} />
            {i < endowed && <path d={`M${cx - 5} ${cy} l4 4 l7 -8`} fill="none" stroke={DARK} strokeWidth="1.8" strokeLinecap="round" />}
          </g>
        );
      })}
      <Txt x={14} y={110} size={8}>{tt(`${total - endowed} to go`, `Noch ${total - endowed} bis zum Ziel`)}</Txt>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A4 · metrics, drawn small */

export function MetricMini({ kind }: { kind: "completion" | "return" | "time" | "interview" | "control" }) {
  const label =
    kind === "completion"
      ? tt("A bar showing 62 percent of learners finished", "Ein Balken, der zeigt, dass 62 Prozent der Lernenden abgeschlossen haben")
      : kind === "return"
        ? tt("A line of the share of learners who return within seven days, rising over six weeks", "Eine Linie des Anteils der Lernenden, die innerhalb von sieben Tagen zurückkehren, über sechs Wochen steigend")
        : kind === "time"
          ? tt("One long bar of time spent, with two speech bubbles: interest or confusion", "Ein langer Balken verbrachter Zeit mit zwei Sprechblasen: Interesse oder Verwirrung")
          : kind === "interview"
            ? tt("Three speech bubbles from learner interviews", "Drei Sprechblasen aus Lernenden-Interviews")
            : tt("A test line rising above a control line", "Eine Testlinie, die über einer Kontrolllinie steigt");
  return (
    <Thumb label={label}>
      {kind === "completion" && (
        <>
          <rect x="16" y="40" width="168" height="24" rx="4" fill={LITE} stroke={LINE} />
          <rect x="16" y="40" width="104" height="24" rx="4" fill={DARK} />
          <Txt x={100} y={86} size={14} bold anchor="middle">62%</Txt>
          <Txt x={100} y={100} size={8} anchor="middle">{tt("finished the course", "haben den Kurs abgeschlossen")}</Txt>
        </>
      )}
      {kind === "return" && (
        <>
          <line x1="20" y1="90" x2="184" y2="90" stroke={LINE} />
          <line x1="20" y1="14" x2="20" y2="90" stroke={LINE} />
          <polyline points="24,78 54,70 84,64 114,52 144,44 176,34" fill="none" stroke={DARK} strokeWidth="2.2" />
          {[24, 54, 84, 114, 144, 176].map((x, i) => (
            <circle key={x} cx={x} cy={[78, 70, 64, 52, 44, 34][i]} r="2.6" fill={DARK} />
          ))}
          <Txt x={100} y={103} size={8} anchor="middle">{tt("weeks 1 to 6", "Woche 1 bis 6")}</Txt>
        </>
      )}
      {kind === "time" && (
        <>
          <rect x="14" y="52" width="172" height="14" rx="3" fill={DARK} />
          <Txt x={100} y={86} size={8} anchor="middle">{tt("42 minutes in one session", "42 Minuten in einer Sitzung")}</Txt>
          <rect x="14" y="10" width="78" height="22" rx="9" fill="#FFFFFF" stroke={LINE} />
          <Txt x={53} y={25} size={8} anchor="middle">{tt("interested?", "interessiert?")}</Txt>
          <rect x="108" y="10" width="78" height="22" rx="9" fill="#FFFFFF" stroke={LINE} />
          <Txt x={147} y={25} size={8} anchor="middle">{tt("confused?", "verwirrt?")}</Txt>
        </>
      )}
      {kind === "interview" && (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={14 + (i % 2) * 54} y={10 + i * 30} width="128" height="22" rx="9" fill="#FFFFFF" stroke={LINE} />
              <Txt x={22 + (i % 2) * 54} y={25 + i * 30} size={8}>{[tt("I did not know what next.", "Ich wusste nicht, was als Nächstes kommt."), tt("No time on weekdays.", "Unter der Woche keine Zeit."), tt("It felt like homework.", "Es fühlte sich wie Hausaufgaben an.")][i]}</Txt>
            </g>
          ))}
        </>
      )}
      {kind === "control" && (
        <>
          <line x1="20" y1="90" x2="184" y2="90" stroke={LINE} />
          <polyline points="24,72 64,68 104,64 144,60 176,56" fill="none" stroke={LINE} strokeWidth="2" strokeDasharray="5 4" />
          <polyline points="24,72 64,62 104,50 144,40 176,30" fill="none" stroke={DARK} strokeWidth="2.4" />
          <Txt x={176} y={24} size={8} anchor="end">{tt("test", "Test")}</Txt>
          <Txt x={176} y={72} size={8} anchor="end">{tt("control", "Kontrolle")}</Txt>
        </>
      )}
    </Thumb>
  );
}

/** The three steps of iterating, as a loop, above a hypothesis written with a figure. */
export function IterateLoop() {
  return (
    <Svg viewBox="0 0 340 130" label={tt("Iterating as a loop: test, analyse, adjust, and test again", "Iterieren als Schleife: testen, analysieren, anpassen und wieder testen")}>
      {[tt("Test", "Testen"), tt("Analyse", "Analysieren"), tt("Adjust", "Anpassen")].map((s, i) => (
        <g key={s}>
          <rect x={14 + i * 112} y="30" width="96" height="40" rx="8" fill={i === 1 ? "#E2E2E2" : "#FFFFFF"} stroke={DARK} strokeWidth="1.6" />
          <Txt x={62 + i * 112} y={55} size={12} bold anchor="middle">{s}</Txt>
          {i < 2 && <Arrow x1={112 + i * 112} y1={50} x2={124 + i * 112} y2={50} />}
        </g>
      ))}
      <path d="M278 72 C 278 112, 62 112, 62 74" fill="none" stroke="#777777" strokeWidth="1.8" strokeDasharray="5 4" />
      <polygon points="62,72 57,82 67,82" fill="#777777" />
      <Txt x={170} y={116} size={9} anchor="middle" fill="#555555">{tt("and again, with the baseline written down", "und wieder, mit der aufgeschriebenen Ausgangslage")}</Txt>
      <Txt x={170} y={18} size={9} anchor="middle" fill="#555555">{tt("We believe … will raise … by … we will know when …", "Wir glauben, dass … … um … steigert; wir wissen es, wenn …")}</Txt>
    </Svg>
  );
}

/* ------------------------------------------------------------------ the Task 1 evidence: two platforms, four screens, eight facts */

export type ScreenKind = "aCourse" | "aTask" | "bLesson" | "bCourse";

export function PlatformScreen({ kind }: { kind: ScreenKind }) {
  const label =
    kind === "aCourse"
      ? tt("Platform A, course page: a progress bar at 40 percent and a goal sentence for the unit", "Plattform A, Kursseite: ein Fortschrittsbalken bei 40 Prozent und ein Zielsatz für die Einheit")
      : kind === "aTask"
        ? tt("Platform A, a task: a short task, then a result and a next step", "Plattform A, eine Aufgabe: eine kurze Aufgabe, dann ein Ergebnis und ein nächster Schritt")
        : kind === "bLesson"
          ? tt("Platform B, a lesson: one long page of reading and a Next button, with nothing after the last page", "Plattform B, eine Lektion: eine lange Lesetextseite und ein Weiter-Button, nach der letzten Seite nichts")
          : tt("Platform B, course page: a title and a list of lessons, with no goal and no progress", "Plattform B, Kursseite: ein Titel und eine Liste von Lektionen, ohne Ziel und ohne Fortschritt");
  return (
    <Svg viewBox="0 0 240 170" label={label}>
      <Frame>
        {kind === "aCourse" && (
          <>
            <Txt x={14} y={32} size={10} bold>{tt("Negotiation basics", "Verhandlungsgrundlagen")}</Txt>
            <rect x="14" y="40" width="160" height="8" rx="4" fill={LITE} stroke={LINE} />
            <rect x="14" y="40" width="64" height="8" rx="4" fill={DARK} />
            <Txt x={226} y={47} size={8} anchor="end">{tt("40% done", "40 % geschafft")}</Txt>
            <rect x="14" y="62" width="212" height="30" rx="3" fill="#EDEDED" />
            <rect x="14" y="62" width="3" height="30" fill={DARK} />
            <Txt x={22} y={74} size={8} bold>{tt("Unit 3", "Einheit 3")}</Txt>
            <Txt x={22} y={86} size={7.5}>{tt("After this unit you can: write a counter-offer", "Nach dieser Einheit können Sie: ein Gegenangebot schreiben")}</Txt>
            {[0, 1, 2].map((i) => (
              <rect key={i} x="14" y={102 + i * 17} width="212" height="12" rx="3" fill="#F4F4F4" stroke={MID} />
            ))}
            <Marker x={216} y={44} n={1} />
            <Marker x={216} y={78} n={4} />
          </>
        )}
        {kind === "aTask" && (
          <>
            <Txt x={14} y={32} size={10} bold>{tt("Task 3 · 3 min", "Aufgabe 3 · 3 Min.")}</Txt>
            <rect x="14" y="42" width="212" height="18" rx="3" fill="#FFFFFF" stroke={LINE} />
            <Txt x={20} y={54} size={8}>{tt("My counter-offer: 12% off if we sign by May", "Mein Gegenangebot: 12 % Nachlass bei Abschluss bis Mai")}</Txt>
            <rect x="14" y="70" width="212" height="38" rx="4" fill="#F0F0F0" stroke={DARK} />
            <Txt x={22} y={84} size={9} bold>{tt("Correct.", "Richtig.")}</Txt>
            <Txt x={22} y={98} size={8.5}>{tt("Next: task 4", "Weiter: Aufgabe 4")}</Txt>
            <rect x="170" y="130" width="56" height="18" rx="4" fill={DARK} />
            <Txt x={198} y={142} size={8} anchor="middle" fill="#FFFFFF">{tt("Next", "Weiter")}</Txt>
            <Marker x={216} y={52} n={3} />
            <Marker x={216} y={90} n={2} />
          </>
        )}
        {kind === "bLesson" && (
          <>
            <Txt x={14} y={32} size={10} bold>{tt("Lesson 4", "Lektion 4")}</Txt>
            <Lines x={14} y={40} n={14} w={212} gap={7.4} />
            <rect x="170" y="146" width="56" height="14" rx="4" fill="#E2E2E2" stroke={LINE} />
            <Txt x={198} y={156} size={8} anchor="middle">{tt("Next", "Weiter")}</Txt>
            <Marker x={216} y={60} n={5} />
            <Marker x={150} y={152} n={6} />
          </>
        )}
        {kind === "bCourse" && (
          <>
            <Txt x={14} y={32} size={10} bold>{tt("Negotiation basics", "Verhandlungsgrundlagen")}</Txt>
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x="14" y={44 + i * 20} width="212" height="14" rx="3" fill="#F4F4F4" stroke={MID} />
            ))}
            <Marker x={216} y={38} n={7} />
            <Marker x={216} y={120} n={8} />
          </>
        )}
      </Frame>
    </Svg>
  );
}

/* ------------------------------------------------------------------ thumbnails for the measures of the cards and the two tasks */

export type MeasureKind = "progress" | "tasks" | "goals" | "feedback" | "points" | "leaderboard" | "streak" | "coupon" | "look" | "research" | "rebuild" | "standard" | "rewards" | "badges" | "gamified";

export function MeasureThumb({ kind }: { kind: MeasureKind }) {
  const labels: Record<MeasureKind, string> = {
    progress: tt("A progress bar with “3 of 8 done” and a next step", "Ein Fortschrittsbalken mit „3 von 8 geschafft“ und einem nächsten Schritt"),
    tasks: tt("A short task with an input line and a Check button", "Eine kurze Aufgabe mit Eingabezeile und Prüfen-Button"),
    goals: tt("A unit that starts with “After this unit you can…”", "Eine Einheit, die mit „Nach dieser Einheit können Sie …“ beginnt"),
    feedback: tt("A result and a next step after a task", "Ein Ergebnis und ein nächster Schritt nach einer Aufgabe"),
    points: tt("Points and a badge for every lesson opened", "Punkte und ein Badge für jede geöffnete Lektion"),
    leaderboard: tt("A ranking of learners by points", "Eine Rangliste der Lernenden nach Punkten"),
    streak: tt("A daily streak with a message about losing it", "Eine Tagesserie mit einer Meldung, sie zu verlieren"),
    coupon: tt("A discount coupon after finishing a course", "Ein Rabattgutschein nach dem Abschluss eines Kurses"),
    look: tt("New pictures and colours for the course catalogue", "Neue Bilder und Farben für den Kurskatalog"),
    research: tt("A learner interview and an A/B test", "Ein Lernenden-Interview und ein A/B-Test"),
    rebuild: tt("Five courses rebuilt with short tasks", "Fünf Kurse mit kurzen Aufgaben neu aufgebaut"),
    standard: tt("A checklist every unit follows: goal, task, result", "Eine Checkliste, der jede Einheit folgt: Ziel, Aufgabe, Ergebnis"),
    rewards: tt("A reward layer: points, badges and a ranking", "Eine Belohnungsschicht: Punkte, Badges und eine Rangliste"),
    badges: tt("A badge for every lesson opened", "Ein Badge für jede geöffnete Lektion"),
    gamified: tt("Badges and points around a course page", "Badges und Punkte rund um eine Kursseite"),
  };
  return (
    <Thumb label={labels[kind]}>
      {kind === "progress" && (
        <>
          <rect x="14" y="26" width="172" height="14" rx="7" fill={LITE} stroke={LINE} />
          <rect x="14" y="26" width="64" height="14" rx="7" fill={DARK} />
          <Txt x={14} y={58} size={9} bold>{tt("3 of 8 done", "3 von 8 geschafft")}</Txt>
          <rect x="108" y="72" width="78" height="22" rx="4" fill={DARK} />
          <Txt x={147} y={86} size={8.5} anchor="middle" fill="#FFFFFF">{tt("Next: unit 4", "Weiter: Einheit 4")}</Txt>
          <Tick x={26} y={84} />
          <Tick x={46} y={84} />
          <Tick x={66} y={84} />
        </>
      )}
      {kind === "tasks" && (
        <>
          <Txt x={14} y={24} size={9} bold>{tt("Task · 3 min", "Aufgabe · 3 Min.")}</Txt>
          <rect x="14" y="34" width="172" height="20" rx="3" fill="#FFFFFF" stroke={LINE} />
          <Lines x={20} y={42} n={1} w={100} fill={MID} />
          <rect x="116" y="68" width="70" height="22" rx="4" fill={DARK} />
          <Txt x={151} y={82} size={8.5} anchor="middle" fill="#FFFFFF">{tt("Check", "Prüfen")}</Txt>
        </>
      )}
      {kind === "goals" && (
        <>
          <Txt x={14} y={24} size={9} bold>{tt("Unit 3", "Einheit 3")}</Txt>
          <rect x="14" y="32" width="172" height="34" rx="3" fill="#EDEDED" />
          <rect x="14" y="32" width="3" height="34" fill={DARK} />
          <Txt x={22} y={46} size={8.5}>{tt("After this unit you can:", "Nach dieser Einheit können Sie:")}</Txt>
          <Txt x={22} y={59} size={9} bold>{tt("write a counter-offer", "ein Gegenangebot schreiben")}</Txt>
          <Lines x={14} y={76} n={3} w={172} fill={MID} />
        </>
      )}
      {kind === "feedback" && (
        <>
          <rect x="14" y="16" width="172" height="20" rx="3" fill="#FFFFFF" stroke={LINE} />
          <Lines x={20} y={24} n={1} w={90} fill={MID} />
          <rect x="14" y="46" width="172" height="34" rx="4" fill="#F0F0F0" stroke={DARK} />
          <Txt x={22} y={60} size={9} bold>{tt("Correct.", "Richtig.")}</Txt>
          <Txt x={22} y={73} size={8.5}>{tt("Next: task 4", "Weiter: Aufgabe 4")}</Txt>
          <Txt x={14} y={98} size={7.5} fill="#555555">{tt("a result and a next step", "ein Ergebnis und ein nächster Schritt")}</Txt>
        </>
      )}
      {(kind === "points" || kind === "badges") && (
        <>
          <circle cx="60" cy="52" r="30" fill="#E2E2E2" stroke={DARK} strokeWidth="2" />
          <Txt x={60} y={58} size={16} bold anchor="middle">+10</Txt>
          <path d="M120 38 l8 -8 l8 8 l-4 0 l0 16 l-8 0 l0 -16 z" fill="#FFFFFF" stroke={DARK} strokeWidth="1.5" />
          <circle cx="152" cy="52" r="16" fill="#FFFFFF" stroke={DARK} strokeWidth="2" />
          <path d="M152 42 l3 7 l7 1 l-5 5 l1 7 l-6 -4 l-6 4 l1 -7 l-5 -5 l7 -1 z" fill={DARK} />
          <Txt x={100} y={100} size={8} anchor="middle">{tt("points and a badge for opening a lesson", "Punkte und ein Badge fürs Öffnen einer Lektion")}</Txt>
        </>
      )}
      {kind === "leaderboard" && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="14" y={12 + i * 22} width="172" height="18" rx="3" fill={i === 2 ? "#E2E2E2" : "#FFFFFF"} stroke={MID} />
              <Txt x={22} y={25 + i * 22} size={8}>{`${i + 1}. ${["Ana", "Ben", tt("You", "Sie"), "Dan"][i]}`}</Txt>
              <Txt x={178} y={25 + i * 22} size={8} anchor="end">{["420", "410", "340", "330"][i]}</Txt>
            </g>
          ))}
        </>
      )}
      {kind === "streak" && (
        <>
          <path d="M60 20 C 40 44, 44 70, 60 84 C 76 70, 80 44, 60 20 Z" fill="#E2E2E2" stroke={DARK} strokeWidth="2" />
          <Txt x={60} y={66} size={16} bold anchor="middle">12</Txt>
          <rect x="96" y="30" width="92" height="40" rx="6" fill="#FFFFFF" stroke={DARK} />
          <Txt x={104} y={46} size={8} bold>{tt("You will lose", "Sie verlieren")}</Txt>
          <Txt x={104} y={58} size={8} bold>{tt("your streak!", "Ihre Serie!")}</Txt>
        </>
      )}
      {kind === "coupon" && (
        <>
          <rect x="20" y="22" width="160" height="56" rx="6" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" strokeDasharray="6 4" />
          <Txt x={100} y={46} size={14} bold anchor="middle">−20%</Txt>
          <Txt x={100} y={64} size={8} anchor="middle">{tt("on your next course", "auf Ihren nächsten Kurs")}</Txt>
        </>
      )}
      {kind === "look" && (
        <>
          {["#3A3A3A", "#8E8E8E", "#BDBDBD", "#E2E2E2"].map((c, i) => (
            <rect key={c} x={14 + i * 26} y={16} width="20" height="30" rx="4" fill={c} stroke={LINE} />
          ))}
          {[0, 1, 2].map((i) => (
            <rect key={i} x={14 + i * 60} y={58} width="52" height="36" rx="4" fill={["#BDBDBD", "#E2E2E2", "#8E8E8E"][i]} stroke={LINE} />
          ))}
        </>
      )}
      {kind === "research" && (
        <>
          <Person x={30} y={32} />
          <rect x="50" y="18" width="58" height="22" rx="9" fill="#FFFFFF" stroke={LINE} />
          <Txt x={79} y={32} size={8} anchor="middle">{tt("Why did you stop?", "Warum haben Sie aufgehört?")}</Txt>
          <rect x="118" y="30" width="26" height="26" rx="3" fill="#E2E2E2" stroke={LINE} />
          <Txt x={131} y={48} size={11} bold anchor="middle">A</Txt>
          <rect x="152" y="30" width="26" height="26" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <Txt x={165} y={48} size={11} bold anchor="middle">B</Txt>
          <Txt x={148} y={78} size={8} anchor="middle">{tt("A/B test", "A/B-Test")}</Txt>
        </>
      )}
      {kind === "rebuild" && (
        <>
          {[12, 50, 88, 126, 164].map((x) => (
            <g key={x}>
              <MiniPage x={x} y={20} w={28} h={46} n={3} />
              <Tick x={x + 20} y={60} r={5} />
            </g>
          ))}
          <Txt x={100} y={90} size={8.5} anchor="middle">{tt("the five most-used courses", "die fünf meistgenutzten Kurse")}</Txt>
        </>
      )}
      {kind === "standard" && (
        <>
          {[tt("every unit states its goal", "jede Einheit nennt ihr Ziel"), tt("every task gives a result", "jede Aufgabe gibt ein Ergebnis"), tt("every result a next step", "jedes Ergebnis einen nächsten Schritt")].map((s, i) => (
            <g key={s}>
              <rect x="16" y={18 + i * 26} width="12" height="12" rx="2" fill="#FFFFFF" stroke={DARK} strokeWidth="1.4" />
              <path d={`M18 ${24 + i * 26} l3 3 l6 -7`} fill="none" stroke={DARK} strokeWidth="1.6" strokeLinecap="round" />
              <Txt x={36} y={28 + i * 26} size={8.5}>{s}</Txt>
            </g>
          ))}
        </>
      )}
      {kind === "rewards" && (
        <>
          <circle cx="40" cy="44" r="22" fill="#E2E2E2" stroke={DARK} strokeWidth="2" />
          <Txt x={40} y={49} size={12} bold anchor="middle">+10</Txt>
          <circle cx="92" cy="44" r="16" fill="#FFFFFF" stroke={DARK} strokeWidth="2" />
          <path d="M92 35 l3 6 l6 1 l-4 4 l1 6 l-6 -3 l-6 3 l1 -6 l-4 -4 l6 -1 z" fill={DARK} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x="124" y={26 + i * 14} width="62" height="10" rx="3" fill={i === 1 ? "#E2E2E2" : "#FFFFFF"} stroke={MID} />
          ))}
        </>
      )}
      {kind === "gamified" && (
        <>
          <MiniPage x={40} y={10} w={72} h={88} n={7} />
          <circle cx="132" cy="30" r="14" fill="#E2E2E2" stroke={DARK} strokeWidth="1.8" />
          <Txt x={132} y={34} size={9} bold anchor="middle">+10</Txt>
          <circle cx="146" cy="68" r="12" fill="#FFFFFF" stroke={DARK} strokeWidth="1.8" />
        </>
      )}
    </Thumb>
  );
}
