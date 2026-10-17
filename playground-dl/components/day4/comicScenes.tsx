import type { ReactNode } from "react";
import { Arrow, Bar, Bits, Board, Chip, Cross, Icon, K, Kid, KID_COLOURS, LOOK, Lines, Mark, Mon, Person, Stage, Table, Tick, Txt } from "@/components/comic/PixelKit";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 4 comics (data/day4/comics.ts, DL-STANDARD.md section 13). People: Tom (a learner in procurement), Anna (a sales manager
 * taking a negotiation course), Maya (a learner), Dana (a product manager at LearnLoop) and Priya (LearnLoop's learning lead), all made up. Every figure
 * is one of the card's own.
 */
LOOK.tom = { hair: "#2B2B2B", shirt: "#2E9E6B", skin: "#C68A5A" };
LOOK.anna = { hair: "#7A3B2E", shirt: "#3D7BD9", long: true };
LOOK.maya = { hair: "#1B1B22", shirt: "#D9534F", long: true, skin: "#C8946A" };
LOOK.dana = { hair: "#5A3A22", shirt: "#8A63D2", long: true };
LOOK.priya = { hair: "#1B1B22", shirt: "#2B8A6E", long: true, skin: "#C8946A" };

/** Tom's quizzes per week as a bar chart (card A1): the same numbers as the diagram. */
function Weeks({ vals, colour = "#3D7BD9", flag }: { vals: number[]; colour?: string; flag?: string }) {
  return (
    <Board x={44} y={8} w={84} h={50}>
      <Txt x={48} y={16} size={4.4} c="#556274">QUIZZES A WEEK</Txt>
      <rect x={50} y={50} width={72} height={1} fill={K} />
      {vals.map((v, i) => (
        <g key={i}>
          <rect x={53 + i * 10} y={50 - v * 4 - 1} width={9} height={v * 4 + 1} fill={K} />
          <rect x={54 + i * 10} y={50 - v * 4} width={7} height={v * 4} fill={colour} />
          <Txt x={57.5 + i * 10} y={47} size={5} c="#FFFFFF" anchor="middle">{v}</Txt>
        </g>
      ))}
      {flag && <Txt x={124} y={16} size={4.6} anchor="end" c="#D9534F">{flag}</Txt>}
    </Board>
  );
}

/** A quiz screen, with or without a points banner. */
function QuizScreen({ x, y, points }: { x: number; y: number; points?: boolean }) {
  return (
    <Mon x={x} y={y} w={34} h={30}>
      {points && <Chip x={x + 3} y={y + 7} w={28} h={5} c="#F2A900" />}
      {points && <Txt x={x + 17} y={y + 11} size={3.6} anchor="middle">+ POINTS</Txt>}
      <Chip x={x + 3} y={y + (points ? 15 : 9)} w={28} h={5} c="#FFFFFF" />
      <Chip x={x + 3} y={y + (points ? 22 : 16)} w={28} h={5} c="#FFFFFF" />
    </Mon>
  );
}

const rate = (rows: [string, number, string][], x: number, y: number) => (
  <g>
    {rows.map(([label, n, word], i) => (
      <g key={label}>
        <Txt x={x} y={y + i * 8} size={4.4} c="#556274">{label}</Txt>
        {[0, 1, 2].map((k) => (
          <rect key={k} x={x + 26 + k * 6} y={y - 4 + i * 8} width={4} height={4} fill={k < n ? "#3D7BD9" : "#E0E4EB"} />
        ))}
        <Txt x={x + 46} y={y + i * 8} size={4.4}>{word}</Txt>
      </g>
    ))}
  </g>
);

/** Fogg's chart (card B1): ability to the right, motivation up, a curve; `prompt` is the flag. */
function Fogg({ dot, prompt, promptOff }: { dot: [number, number]; prompt?: boolean; promptOff?: boolean }) {
  const curve: [number, number][] = [[46, 9], [49, 12], [53, 16], [58, 20], [64, 24], [71, 28], [79, 31], [88, 34], [98, 36], [110, 38], [120, 39]];
  return (
    <Board x={36} y={6} w={92} h={52}>
      <rect x={42} y={10} width={1} height={42} fill={K} />
      <rect x={42} y={52} width={80} height={1} fill={K} />
      {curve.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={3} height={2} fill="#556274" />
      ))}
      <Txt x={45} y={9} size={3.6} c="#556274">MOTIVATION</Txt>
      <Txt x={122} y={58} size={3.6} anchor="end" c="#556274">ABILITY (EASY)</Txt>
      <rect x={dot[0] - 1} y={dot[1] - 1} width={7} height={7} fill={K} />
      <rect x={dot[0]} y={dot[1]} width={5} height={5} fill="#D9534F" />
      {prompt && <Icon x={dot[0] + 9} y={dot[1] - 4} name="idea" />}
      {promptOff && (
        <g>
          <Icon x={dot[0] + 9} y={dot[1] - 4} name="lock" />
          <Cross x={dot[0] + 20} y={dot[1] - 2} />
        </g>
      )}
    </Board>
  );
}

/** The matrix of card B2: lasting motivation across, pressure up; seven options A to G. */
function Matrix7({ hi }: { hi?: string[] }) {
  const dots: [string, number, number][] = [["A", 0.8, 0.1], ["B", 0.7, 0.16], ["C", 0.84, 0.34], ["D", 0.28, 0.4], ["E", 0.3, 0.78], ["F", 0.18, 0.92], ["G", 0.14, 0.2]];
  const px = (x: number) => 48 + x * 70;
  const py = (y: number) => 52 - y * 38;
  return (
    <Board x={30} y={6} w={100} h={54}>
      <rect x={44} y={12} width={1} height={40} fill={K} />
      <rect x={44} y={52} width={80} height={1} fill={K} />
      <rect x={44} y={32} width={80} height={1} fill="#D4D8E0" />
      <rect x={84} y={12} width={1} height={40} fill="#D4D8E0" />
      <Txt x={72} y={14} size={3.4} c="#556274">PRESSURED, SHORT-LIVED</Txt>
      <Txt x={124} y={58} size={3.8} anchor="end" c="#0B6F69">AIM HERE</Txt>
      <Txt x={46} y={58} size={3.8} c="#556274">LASTING MOTIVATION →</Txt>
      {dots.map(([n, x, y]) => (
        <g key={n}>
          {hi?.includes(n) && <rect x={px(x) - 3} y={py(y) - 3} width={14} height={11} fill="none" stroke="#F2A900" strokeWidth={1.5} />}
          <rect x={px(x) - 1} y={py(y) - 1} width={8} height={8} fill={K} />
          <rect x={px(x)} y={py(y)} width={6} height={6} fill={hi?.includes(n) ? "#7A4DE8" : "#9AA5B5"} />
          <Txt x={px(x) + 3} y={py(y) + 5} size={5} c="#FFFFFF" anchor="middle">{n}</Txt>
        </g>
      ))}
    </Board>
  );
}

/** The seven-day return rate of card B3: LearnLoop's change (blue) and the group that did not get it (grey). */
function RateChart({ control, gap }: { control?: boolean; gap?: boolean }) {
  const TEST = [30, 32, 34, 36, 37, 38, 39];
  const CONTROL = [30, 31, 32, 32, 33, 34, 34];
  const px = (i: number) => 50 + i * 10;
  const py = (v: number) => 54 - (v - 28) * 3.6;
  return (
    <Board x={38} y={6} w={90} h={56}>
      <rect x={46} y={12} width={1} height={42} fill={K} />
      <rect x={46} y={54} width={76} height={1} fill={K} />
      <Txt x={48} y={12} size={3.8} c="#556274">RETURN IN 7 DAYS</Txt>
      {TEST.map((v, i) => (
        <rect key={i} x={px(i) - 1} y={py(v) - 1} width={3} height={3} fill="#3D7BD9" />
      ))}
      {control && CONTROL.map((v, i) => (
        <rect key={i} x={px(i) - 1} y={py(v) - 1} width={3} height={3} fill="#8793A3" />
      ))}
      {gap && <rect x={px(6) + 4} y={py(39)} width={2} height={py(34) - py(39)} fill="#F2A900" />}
      <Txt x={50} y={py(30) + 8} size={4.4}>30</Txt>
      <Txt x={px(6)} y={py(39) - 4} size={4.6} c="#3D7BD9" anchor="middle">39</Txt>
      {control && <Txt x={px(6)} y={py(34) + 9} size={4.6} c="#556274" anchor="middle">34</Txt>}
      {gap && <Txt x={px(6) + 9} y={(py(39) + py(34)) / 2 + 2} size={6} c="#B5700B">5</Txt>}
    </Board>
  );
}

export const ART_D4: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Stage label={tt("Tom enjoys the quizzes: about 4 a week, with no one asking him", "Tom macht die Quizze gern: etwa 4 pro Woche, ohne dass ihn jemand darum bittet")}>
      <Table x={4} y={46} w={38} />
      <QuizScreen x={7} y={12} />
      <Person x={14} y={40} who="tom" face="happy" flip />
      <Weeks vals={[4, 4, 4, 4]} />
    </Stage>
  ),
  "a1-2": (
    <Stage label={tt("The platform adds points: Tom does about 7 a week", "Die Plattform fügt Punkte hinzu: Tom macht etwa 7 pro Woche")}>
      <Table x={4} y={46} w={38} />
      <QuizScreen x={7} y={12} points />
      <Person x={14} y={40} who="tom" face="surprised" flip />
      <Weeks vals={[4, 4, 4, 4, 6, 7, 7]} colour="#3D7BD9" />
    </Stage>
  ),
  "a1-3": (
    <Stage label={tt("The points programme ends: Tom does only about 2 a week, fewer than before", "Das Punkteprogramm endet: Tom macht nur noch etwa 2 pro Woche, weniger als vorher")}>
      <Table x={4} y={46} w={38} />
      <QuizScreen x={7} y={12} />
      <Person x={14} y={40} who="tom" face="sad" flip />
      <Mark x={19} y={32} kind="zzz" />
      <Weeks vals={[4, 7, 7, 3, 2, 2]} colour="#3D7BD9" flag="BELOW BEFORE" />
    </Stage>
  ),
  "a1-4": (
    <Stage label={tt("Three needs that keep motivation going: autonomy, competence, relatedness", "Drei Bedürfnisse, die Motivation tragen: Autonomie, Kompetenz, Zugehörigkeit")}>
      <Board x={30} y={6} w={100} h={54}>
        {[
          [60, 24, "#3D7BD9", "AUTONOMY", "I CHOOSE"],
          [100, 24, "#2E9E6B", "COMPETENCE", "I IMPROVE"],
          [80, 46, "#F59E0B", "RELATEDNESS", "I BELONG"],
        ].map(([x, y, c, l, s]) => (
          <g key={l as string}>
            <rect x={(x as number) - 17} y={(y as number) - 8} width={34} height={16} fill={K} />
            <rect x={(x as number) - 16} y={(y as number) - 7} width={32} height={14} fill={c as string} />
            <Txt x={x as number} y={(y as number) - 1} size={3.4} anchor="middle" c="#FFFFFF">{l as string}</Txt>
            <Txt x={x as number} y={(y as number) + 5} size={3.2} anchor="middle" c="#FFFFFF">{s as string}</Txt>
          </g>
        ))}
        <Icon x={76} y={26} name="heart" />
      </Board>
      <Person x={4} y={40} who="priya" face="happy" pose="point" />
    </Stage>
  ),
  "a1-5": (
    <Stage label={tt("Before adding points, ask two questions", "Vor Punkten zwei Fragen stellen")}>
      <Board x={38} y={10} w={84} h={40}>
        <Icon x={46} y={16} name="heart" />
        <Txt x={60} y={23} size={4.6}>OWN REASON?</Txt>
        <Icon x={46} y={32} name="warn" />
        <Txt x={60} y={39} size={4.6}>WOULD THE REWARD</Txt>
        <Txt x={60} y={45} size={4.6}>REPLACE IT?</Txt>
      </Board>
      <Person x={4} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Stage label={tt("Anna meets a long page of reading, with no goal, no task and no sign of progress", "Anna trifft auf eine lange Lesetextseite, ohne Ziel, ohne Aufgabe und ohne Zeichen des Fortschritts")}>
      <Table x={44} y={56} w={72} />
      <Mon x={52} y={8} w={56} h={46} bar="#8A8A92"><Lines x={56} y={16} w={46} n={11} gap={3} /></Mon>
      <Person x={14} y={40} who="anna" face="sad" />
      <Mark x={19} y={32} kind="zzz" />
    </Stage>
  ),
  "a2-2": (
    <Stage label={tt("Clarity and relevance: the unit says what it is for, and shows a work example", "Klarheit und Relevanz: Die Einheit sagt, wozu sie dient, und zeigt ein Praxisbeispiel")}>
      <Table x={44} y={56} w={72} />
      <Mon x={52} y={8} w={56} h={46}>
        <Chip x={56} y={14} w={48} h={15} c="#FFE48A" />
        <Txt x={80} y={20} size={3.6} anchor="middle">YOU CAN WRITE</Txt>
        <Txt x={80} y={26} size={3.6} anchor="middle">A COUNTER-OFFER</Txt>
        <Chip x={56} y={32} w={48} h={14} c="#FFFFFF" />
        <Txt x={80} y={40} size={4} anchor="middle" c="#556274">WORK EXAMPLE</Txt>
      </Mon>
      <Person x={14} y={40} who="anna" face="happy" />
    </Stage>
  ),
  "a2-3": (
    <Stage label={tt("Activation and feedback: Anna writes her offer and gets an answer with a next step", "Aktivierung und Feedback: Anna schreibt ihr Angebot und erhält eine Antwort mit nächstem Schritt")}>
      <Table x={44} y={56} w={72} />
      <Mon x={52} y={8} w={56} h={46}>
        <Chip x={56} y={14} w={48} h={13} c="#FFFFFF" />
        <Lines x={59} y={18} w={36} n={2} gap={4} />
        <Chip x={56} y={31} w={48} h={15} c="#CDE8DA" />
        <Txt x={59} y={37} size={3.6}>PRICE, NO CONDITION</Txt>
        <Txt x={59} y={43} size={3.6} c="#0B6F69">NEXT: TASK 4</Txt>
      </Mon>
      <Person x={14} y={40} who="anna" face="think" pose="point" />
    </Stage>
  ),
  "a2-4": (
    <Stage label={tt("Progression: a bar shows 40 percent", "Progression: Ein Balken zeigt 40 Prozent")}>
      <Table x={44} y={56} w={72} />
      <Mon x={52} y={8} w={56} h={46}>
        <Bar x={58} y={15} w={44} p={0.4} c="#2E9E6B" />
        <Txt x={104} y={18} size={4.2} anchor="end">40%</Txt>
        <Chip x={56} y={24} w={48} h={9} c="#FFE48A" />
        <Chip x={56} y={36} w={48} h={9} c="#FFFFFF" />
      </Mon>
      <Person x={14} y={40} who="anna" face="happy" />
    </Stage>
  ),
  "a2-5": (
    <Stage label={tt("Five principles, five elements on the screen", "Fünf Prinzipien, fünf Elemente auf dem Bildschirm")}>
      <Board x={26} y={10} w={108} h={42}>
        {[["book", 34, "GOAL"], ["idea", 56, "EXAMPLE"], ["pencil", 80, "TASK"], ["check", 102, "ANSWER"], ["chart", 124, "PROGRESS"]].map(([n, x, l]) => (
          <g key={l as string}>
            <Icon x={(x as number) - 4} y={18} name={n as string} />
            <Txt x={x as number} y={38} size={3.2} anchor="middle">{l as string}</Txt>
          </g>
        ))}
      </Board>
      <Person x={2} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Stage label={tt("Two feedback messages: one only praises, one answers the three questions", "Zwei Feedback-Meldungen: Eine lobt nur, die andere beantwortet die drei Fragen")}>
      <Board x={14} y={8} w={64} h={50}>
        <Txt x={18} y={16} size={4} c="#556274">ONLY PRAISE</Txt>
        <Chip x={20} y={22} w={50} h={10} c="#FFFFFF" />
        <Txt x={45} y={29} size={5} anchor="middle">WELL DONE!</Txt>
        {[0, 1, 2].map((i) => (
          <Cross key={i} x={22 + i * 15} y={40} />
        ))}
      </Board>
      <Board x={84} y={8} w={64} h={50}>
        <Txt x={88} y={16} size={4} c="#0B6F69">THREE QUESTIONS</Txt>
        <Chip x={90} y={21} w={52} h={13} c="#CDE8DA" />
        <Txt x={116} y={27} size={3.2} anchor="middle">PRICE, NO CONDITION</Txt>
        <Txt x={116} y={32} size={3.2} anchor="middle" c="#0B6F69">NEXT: TASK 4</Txt>
        {[0, 1, 2].map((i) => (
          <Tick key={i} x={92 + i * 15} y={40} />
        ))}
      </Board>
    </Stage>
  ),
  "a3-2": (
    <Stage label={tt("Two result screens: one tells something true about the skill, one only pays points", "Zwei Ergebnisbildschirme: einer sagt etwas Wahres über das Können, einer zahlt nur Punkte")}>
      <Mon x={14} y={8} w={60} h={46} bar="#0B8A82">
        <Txt x={20} y={20} size={4.4} c="#556274">YOUR SKILL</Txt>
        <Bar x={20} y={25} w={48} p={0.65} c="#2E9E6B" />
        <Chip x={20} y={34} w={48} h={11} c="#CDE8DA" />
        <Txt x={44} y={41} size={3.6} anchor="middle">TRUE ABOUT YOU</Txt>
      </Mon>
      <Mon x={86} y={8} w={60} h={46} bar="#D9534F">
        <Txt x={92} y={20} size={6} c="#B5700B">+10</Txt>
        <Txt x={92} y={30} size={4.4}>RANK 3</Txt>
        <Chip x={92} y={36} w={48} h={9} c="#F2A900" />
        <Txt x={116} y={42} size={3.6} anchor="middle">OPEN A LESSON</Txt>
      </Mon>
      <Icon x={75} y={26} name="gear" />
    </Stage>
  ),
  "a3-3": (
    <Stage label={tt("Two loyalty cards that both need 8 more stamps: one already has 2", "Zwei Treuekarten, die beide 8 weitere Stempel brauchen: eine hat schon 2")}>
      {[[14, 8, 0, "8 PLACES"], [86, 10, 2, "10 PLACES"]].map(([x, n, done, l]) => (
        <Board key={l as string} x={x as number} y={14} w={60} h={34}>
          <Txt x={(x as number) + 4} y={22} size={4} c="#556274">{l as string}</Txt>
          {Array.from({ length: n as number }, (_, i) => (
            <g key={i}>
              <rect x={(x as number) + 5 + (i % 5) * 10} y={26 + Math.floor(i / 5) * 9} width={8} height={7} fill={K} />
              <rect x={(x as number) + 6 + (i % 5) * 10} y={27 + Math.floor(i / 5) * 9} width={6} height={5} fill={i < (done as number) ? "#2E9E6B" : "#FFFFFF"} />
            </g>
          ))}
        </Board>
      ))}
      <Txt x={80} y={34} size={7} anchor="middle">8</Txt>
    </Stage>
  ),
  "a3-4": (
    <Stage label={tt("Rate a measure by what it tells the learner and what it leaves behind", "Eine Maßnahme danach bewerten, was sie der Lernenden sagt und was sie hinterlässt")}>
      <Board x={30} y={10} w={100} h={42}>
        {[["ask", 42, "FEEDBACK"], ["chart", 70, "PROGRESS"], ["heart", 98, "REWARD"]].map(([n, x, l]) => (
          <g key={l as string}>
            <Icon x={(x as number) - 4} y={16} name={n as string} />
            <Txt x={x as number} y={36} size={3.8} anchor="middle">{l as string}</Txt>
          </g>
        ))}
        <Txt x={80} y={46} size={4} anchor="middle" c="#556274">HELP OR BACKFIRE?</Txt>
      </Board>
      <Person x={2} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Stage label={tt("Completion rate: how many finish, but not why or what they learned", "Completion Rate: wie viele abschließen, aber nicht warum oder was sie gelernt haben")}>
      <Board x={38} y={10} w={84} h={40}>
        <Txt x={44} y={19} size={4.6} c="#556274">COMPLETION</Txt>
        <Bar x={44} y={25} w={70} p={0.55} c="#3D7BD9" />
        <Icon x={44} y={33} name="ask" />
        <Txt x={58} y={40} size={4.4}>WHY? WHAT LEARNED?</Txt>
      </Board>
      <Person x={6} y={40} who="dana" face="think" />
    </Stage>
  ),
  "a4-2": (
    <Stage label={tt("Return rate: a rise means nothing without a baseline", "Return Rate: Ein Anstieg bedeutet nichts ohne Ausgangslage")}>
      <Board x={38} y={10} w={84} h={40}>
        <rect x={46} y={36} width={68} height={1} fill={K} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={48 + i * 11} y={34 - i * 3} width={3} height={3} fill="#3D7BD9" />
        ))}
        <rect x={46} y={31} width={68} height={1} fill="#D9534F" />
        <Txt x={112} y={29} size={3.6} anchor="end" c="#D9534F">BASELINE</Txt>
        <Txt x={46} y={18} size={4.4} c="#556274">RETURN IN 7 DAYS</Txt>
      </Board>
      <Person x={6} y={40} who="dana" face="think" />
    </Stage>
  ),
  "a4-3": (
    <Stage label={tt("Time spent: a long time can mean interest or confusion", "Verbrachte Zeit: Eine lange Zeit kann Interesse oder Verwirrung bedeuten")}>
      <Board x={38} y={10} w={84} h={40}>
        <Icon x={62} y={14} name="clock" />
        <Txt x={67} y={34} size={5} anchor="middle">LONG</Txt>
        <Icon x={46} y={38} name="heart" />
        <Txt x={92} y={44} size={4.2}>OR</Txt>
        <Icon x={104} y={38} name="ask" />
      </Board>
      <Person x={6} y={40} who="dana" face="surprised" />
    </Stage>
  ),
  "a4-4": (
    <Stage label={tt("Interviews explain; a test against a control group shows what the change did", "Interviews erklären; ein Test gegen eine Kontrollgruppe zeigt, was die Änderung bewirkt hat")}>
      <Board x={14} y={8} w={64} h={50}>
        <Txt x={18} y={16} size={4} c="#556274">INTERVIEWS</Txt>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Chip x={20 + i * 3} y={21 + i * 10} w={36} h={7} c="#FFFFFF" />
            <Kid x={60} y={21 + i * 10} c={KID_COLOURS[i]} flip />
          </g>
        ))}
      </Board>
      <Board x={84} y={8} w={64} h={50}>
        <Txt x={88} y={16} size={4} c="#556274">TEST VS CONTROL</Txt>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={92 + i * 10} y={40 - i * 4} width={3} height={3} fill="#3D7BD9" />
            <rect x={92 + i * 10} y={42 - i * 2} width={3} height={3} fill="#8793A3" />
          </g>
        ))}
      </Board>
    </Stage>
  ),
  "a4-5": (
    <Stage label={tt("Iterate in a loop: test, analyse, adjust", "In einer Schleife iterieren: testen, analysieren, anpassen")}>
      <Board x={32} y={10} w={96} h={40}>
        {[["play", 40, "TEST"], ["chart", 74, "ANALYSE"], ["gear", 108, "ADJUST"]].map(([n, x, l]) => (
          <g key={l as string}>
            <Icon x={(x as number) - 4} y={16} name={n as string} />
            <Txt x={x as number} y={36} size={4.2} anchor="middle">{l as string}</Txt>
          </g>
        ))}
        <Arrow x={54} y={20} />
        <Arrow x={88} y={20} />
        <rect x={42} y={42} width={64} height={1} fill={K} />
        <rect x={106} y={30} width={1} height={13} fill={K} />
        <rect x={42} y={30} width={1} height={13} fill={K} />
      </Board>
      <Person x={4} y={40} who="dana" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Stage label={tt("Learners drop out early: €40,000, two months, three ideas", "Lernende brechen früh ab: 40.000 €, zwei Monate, drei Ideen")}>
      <Board x={38} y={8} w={84} h={42}>
        {[["up", 48, "RANKING"], ["chart", 72, "PROGRESS"], ["pencil", 96, "PRACTICE"]].map(([n, x, l]) => (
          <g key={l as string}>
            <Icon x={(x as number) - 4} y={14} name={n as string} />
            <Txt x={x as number} y={34} size={3.6} anchor="middle">{l as string}</Txt>
          </g>
        ))}
        <Txt x={80} y={46} size={4.2} anchor="middle" c="#556274">40,000 · 2 MONTHS</Txt>
      </Board>
      <Person x={10} y={40} who="priya" face="think" />
      <Person x={130} y={40} who="dana" face="neutral" flip />
    </Stage>
  ),
  "a5-2": (
    <Stage label={tt("Idea 1: a weekly leaderboard, 14,000", "Idee 1: eine wöchentliche Rangliste, 14.000")}>
      <Board x={34} y={4} w={92} h={56}>
        <Txt x={40} y={12} size={4.4}>1 · LEADERBOARD · 14,000</Txt>
        <Bits x={44} y={16} rows={["..###..", "..#.#..", "###.###", "#######"]} map={{ "#": "#F2A900" }} />
        {rate([["IMPACT", 1, "LOW"], ["EFFORT", 2, "MID"], ["RISK", 3, "HIGH"]], 40, 38)}
      </Board>
      <Person x={10} y={40} who="priya" face="worried" />
      <Person x={128} y={40} who="dana" face="surprised" flip />
    </Stage>
  ),
  "a5-3": (
    <Stage label={tt("Idea 2: a progress and next-step display, 8,000", "Idee 2: eine Fortschritts- und Nächster-Schritt-Anzeige, 8.000")}>
      <Board x={34} y={4} w={92} h={56}>
        <Txt x={40} y={12} size={4.4}>2 · PROGRESS · 8,000</Txt>
        <Bar x={44} y={20} w={30} p={0.6} c="#2E9E6B" />
        <Chip x={78} y={17} w={18} h={6} c="#FFE48A" />
        {rate([["IMPACT", 3, "HIGH"], ["EFFORT", 1, "LOW"], ["RISK", 1, "LOW"]], 40, 38)}
      </Board>
      <Person x={10} y={40} who="priya" face="happy" />
      <Person x={128} y={40} who="dana" face="happy" flip />
    </Stage>
  ),
  "a5-4": (
    <Stage label={tt("Idea 3: short practice tasks, 26,000, seven of the eight weeks", "Idee 3: kurze Übungsaufgaben, 26.000, sieben der acht Wochen")}>
      <Board x={34} y={4} w={92} h={56}>
        <Txt x={40} y={12} size={4.4}>3 · PRACTICE · 26,000</Txt>
        <Icon x={44} y={15} name="pencil" />
        <Txt x={58} y={22} size={4.2}>7 OF 8 WEEKS</Txt>
        {rate([["IMPACT", 3, "HIGH"], ["EFFORT", 3, "HIGH"], ["RISK", 2, "MID"]], 40, 38)}
      </Board>
      <Person x={10} y={40} who="priya" face="neutral" />
      <Person x={128} y={40} who="dana" face="think" flip />
    </Stage>
  ),
  "a5-5": (
    <Stage label={tt("The progress display lasts; what LearnLoop does not know is named", "Die Fortschrittsanzeige wirkt nachhaltig; was LearnLoop nicht weiß, wird benannt")}>
      <Board x={40} y={8} w={80} h={44}>
        <Icon x={48} y={14} name="chart" />
        <Icon x={64} y={14} name="check" />
        <Txt x={78} y={20} size={4.4}>LASTS AFTER</Txt>
        <Txt x={78} y={26} size={4.4}>THE REWARD</Txt>
        <Icon x={48} y={32} name="ask" />
        <Txt x={62} y={36} size={4.2}>NO PROGRESS</Txt>
        <Txt x={62} y={43} size={4.2}>OR NO TIME?</Txt>
      </Board>
      <Person x={10} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Stage label={tt("Maya is motivated and gets a reminder, but the next lesson is hidden in menus", "Maya ist motiviert und bekommt eine Erinnerung, aber die nächste Lektion steckt in Menüs")}>
      <Person x={6} y={40} who="maya" face="sad" />
      <Mark x={11} y={32} kind="ask" />
      <Fogg dot={[49, 20]} prompt />
    </Stage>
  ),
  "b1-2": (
    <Stage label={tt("A Next lesson button makes the step easy, but the reminder is off: nothing happens", "Ein Button „Nächste Lektion“ macht den Schritt leicht, aber die Erinnerung ist aus: Nichts passiert")}>
      <Person x={6} y={40} who="maya" face="neutral" />
      <Mark x={11} y={32} kind="zzz" />
      <Fogg dot={[92, 20]} promptOff />
    </Stage>
  ),
  "b1-3": (
    <Stage label={tt("Motivation, ability and a prompt together: Maya opens the next lesson", "Motivation, Können und ein Impuls zusammen: Maya öffnet die nächste Lektion")}>
      <Person x={6} y={40} who="maya" face="happy" pose="up" />
      <Fogg dot={[92, 20]} prompt />
      <Icon x={112} y={20} name="check" />
    </Stage>
  ),
  "b1-4": (
    <Stage label={tt("Check the next step and the prompt before adding rewards", "Den nächsten Schritt und den Impuls prüfen, bevor Belohnungen ergänzt werden")}>
      <Board x={32} y={10} w={96} h={42}>
        {[["eye", 42, "EASY TO FIND?"], ["idea", 78, "INVITED?"], ["heart", 108, "THEN REWARDS"]].map(([n, x, l]) => (
          <g key={l as string}>
            <Icon x={(x as number) - 4} y={16} name={n as string} />
            <Txt x={x as number} y={36} size={3.4} anchor="middle">{l as string}</Txt>
          </g>
        ))}
        <Arrow x={56} y={20} />
        <Arrow x={88} y={20} />
      </Board>
      <Person x={4} y={40} who="dana" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Stage label={tt("A streak with loss messages: active this week, but pressured and short-lived", "Eine Serie mit Verlustmeldungen: diese Woche aktiv, aber unter Druck und kurzlebig")}>
      <Matrix7 hi={["F"]} />
      <Person x={4} y={40} who="priya" face="worried" />
    </Stage>
  ),
  "b2-2": (
    <Stage label={tt("Points for opening lessons: the cheapest way to earn them is not reading", "Punkte fürs Öffnen von Lektionen: Am billigsten verdient man sie, ohne zu lesen")}>
      <Matrix7 hi={["D"]} />
      <Person x={4} y={40} who="priya" face="surprised" />
    </Stage>
  ),
  "b2-3": (
    <Stage label={tt("A progress display and a goal sentence: lasting motivation, almost no pressure", "Eine Fortschrittsanzeige und ein Zielsatz: dauerhafte Motivation, fast kein Druck")}>
      <Matrix7 hi={["A", "B"]} />
      <Person x={4} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),
  "b2-4": (
    <Stage label={tt("Seven options; prefer what the learner would endorse if they saw how it works", "Sieben Optionen; vorziehen, was die Lernende gutheißen würde, wenn sie sähe, wie es wirkt")}>
      <Matrix7 />
      <Person x={4} y={40} who="dana" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Stage label={tt("After the change the return rate rises from 30 to 39: a 9-point success?", "Nach der Änderung steigt die Rückkehrrate von 30 auf 39: ein Erfolg von 9 Punkten?")}>
      <Person x={6} y={40} who="dana" face="happy" />
      <RateChart />
      <Txt x={142} y={34} size={9} anchor="middle">+9</Txt>
    </Stage>
  ),
  "b3-2": (
    <Stage label={tt("The group without the display also rose, to 34: the change added 5 points", "Die Gruppe ohne die Anzeige stieg ebenfalls, auf 34: Die Änderung brachte 5 Punkte")}>
      <Person x={6} y={40} who="dana" face="think" />
      <RateChart control gap />
    </Stage>
  ),
  "b3-3": (
    <Stage label={tt("Decide, name what is unknown, set a reversal condition, name what you give up", "Entscheiden, Unbekanntes benennen, eine Rückgängig-Bedingung setzen, den Verzicht benennen")}>
      <Board x={20} y={8} w={120} h={50}>
        {[["check", 30, "DECIDE"], ["ask", 56, "UNKNOWN"], ["clock", 82, "REVERSE IF"], ["down", 108, "GIVE UP"]].map(([n, x, l]) => (
          <g key={l as string}>
            <Icon x={(x as number) - 4} y={14} name={n as string} />
            <Txt x={x as number} y={32} size={3.6} anchor="middle">{l as string}</Txt>
            <Lines x={(x as number) - 8} y={38} w={16} n={3} gap={4} />
          </g>
        ))}
      </Board>
      <Person x={2} y={40} who="dana" face="happy" />
    </Stage>
  ),
  "b3-4": (
    <Stage label={tt("A rule for future optimisation: who decides, and on what evidence", "Eine Regel für künftige Optimierung: wer entscheidet und auf welcher Grundlage")}>
      <Board x={26} y={8} w={108} h={50}>
        <Txt x={32} y={17} size={4.6} c="#556274">WHO DECIDES</Txt>
        <Icon x={34} y={20} name="eye" />
        <Txt x={48} y={27} size={4.4}>HEAD OF PRODUCT + LEARNING LEAD</Txt>
        <Txt x={32} y={40} size={4.6} c="#556274">ON WHAT EVIDENCE</Txt>
        <Icon x={34} y={43} name="chart" />
        <Txt x={48} y={50} size={4.4}>A/B TEST · INTERVIEWS · RETURN RATE</Txt>
      </Board>
      <Person x={2} y={40} who="priya" face="happy" />
    </Stage>
  ),
};
// keep imports used even when a scene set changes
void Table;
