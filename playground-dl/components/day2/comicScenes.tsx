import type { ReactNode } from "react";
import { Arrow, Bar, Bits, Board, Calendar, Chip, Coins, Cross, Door, Icon, K, Kid, KID_COLOURS, Lines, Mark, Mon, Paper, Person, Stage, Steps, Table, Tick, Txt } from "@/components/comic/PixelKit";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 2 comics (data/day2/comics.ts, DL-STANDARD.md section 13). People: Sofia (product designer), Ana (UX researcher),
 * Lena (a learner), Tom (video editor) and LearnLoop's Chief Product Officer, all made up. Every figure in a drawing is one of the card's own.
 */

const kids = (xs: number[], y: number, extra?: (x: number, i: number) => ReactNode) =>
  xs.map((x, i) => (
    <g key={x}>
      <Kid x={x} y={y} c={KID_COLOURS[i % KID_COLOURS.length]} flip />
      {extra?.(x, i)}
    </g>
  ));

/** The matrix of card B2: value for the learner across, data and complexity needed up. */
function Matrix({ hi }: { hi?: string[] }) {
  const dots: [string, number, number][] = [["A", 58, 38], ["B", 76, 34], ["C", 108, 42], ["D", 64, 20], ["E", 88, 28], ["F", 106, 16]];
  return (
    <g>
      <Board x={30} y={8} w={100} h={52}>
        <rect x={40} y={14} width={1} height={38} fill={K} />
        <rect x={40} y={52} width={84} height={1} fill={K} />
        <rect x={82} y={14} width={1} height={38} fill="#D4D8E0" />
        <rect x={40} y={33} width={84} height={1} fill="#D4D8E0" />
        <Txt x={44} y={22} size={4} c="#556274">DATA</Txt>
        <Txt x={104} y={58} size={4} c="#556274">VALUE</Txt>
        {dots.map(([n, x, y]) => (
          <g key={n}>
            {hi?.includes(n) && <rect x={x - 3} y={y - 3} width={14} height={11} fill="none" stroke="#F2A900" strokeWidth={1.5} />}
            <rect x={x - 1} y={y - 1} width={8} height={8} fill={K} />
            <rect x={x} y={y} width={6} height={6} fill={hi?.includes(n) ? "#7A4DE8" : "#9AA5B5"} />
            <Txt x={x + 3} y={y + 5} size={5} c="#FFFFFF" anchor="middle">{n}</Txt>
          </g>
        ))}
      </Board>
    </g>
  );
}

/** One hundred learners as a grid of ten by ten dots. */
function Hundred({ x, y, c }: { x: number; y: number; c: string }) {
  return (
    <g>
      <rect x={x - 1} y={y - 1} width={42} height={42} fill={K} />
      <rect x={x} y={y} width={40} height={40} fill="#FFFFFF" />
      {Array.from({ length: 100 }, (_, i) => (
        <rect key={i} x={x + 2 + (i % 10) * 4} y={y + 2 + Math.floor(i / 10) * 4} width={2} height={2} fill={c} />
      ))}
    </g>
  );
}

/** Two bars (control, pilot) against a dashed gate line, for card B3. */
function Gate({ pilot }: { pilot: number }) {
  const base = 52;
  const h = (p: number) => Math.round(p * 0.6 * 1);
  return (
    <g>
      <Board x={26} y={8} w={110} h={54}>
        <rect x={34} y={base} width={96} height={1} fill={K} />
        <Chip x={52} y={base - h(60)} w={16} h={h(60)} c="#B4B7BF" />
        <Chip x={92} y={base - h(pilot)} w={16} h={h(pilot)} c="#7A4DE8" />
        {Array.from({ length: 14 }, (_, i) => (
          <rect key={i} x={36 + i * 7} y={base - h(65)} width={4} height={1} fill="#D9534F" />
        ))}
        <Txt x={60} y={base - h(60) - 3} size={5} anchor="middle">60%</Txt>
        <Txt x={100} y={base - h(pilot) - 3} size={5} anchor="middle">{pilot}%</Txt>
        <Txt x={60} y={59} size={4} anchor="middle" c="#556274">CONTROL</Txt>
        <Txt x={100} y={59} size={4} anchor="middle" c="#556274">PILOT</Txt>
        <Txt x={36} y={base - h(65) - 2} size={4} c="#D9534F">GATE 65%</Txt>
      </Board>
    </g>
  );
}

export const ART_D2: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Stage label={tt("Lena in front of one long page", "Lena vor einer langen Seite")}>
      <Table x={44} y={56} w={72} />
      <Mon x={52} y={8} w={56} h={46} bar="#8A8A92"><Lines x={56} y={16} w={46} n={11} gap={3} /></Mon>
      <Person x={14} y={40} who="lena" face="worried" />
      <Mark x={19} y={32} kind="ask" />
    </Stage>
  ),
  "a1-2": (
    <Stage label={tt("Lena reaches the end and the page sends her back without a word", "Lena erreicht das Ende, und die Seite schickt sie wortlos zurück")}>
      <Table x={44} y={56} w={72} />
      <Mon x={52} y={8} w={56} h={46} bar="#8A8A92">
        <Lines x={56} y={16} w={46} n={5} gap={3} />
        <Chip x={70} y={42} w={28} h={6} c="#E0E0E0" />
        <Txt x={84} y={47} size={4} anchor="middle">BACK</Txt>
      </Mon>
      <Person x={14} y={40} who="lena" face="surprised" pose="point" />
      <Mark x={26} y={30} kind="bang" />
    </Stage>
  ),
  "a1-3": (
    <Stage label={tt("The same course with a path, a progress bar and short units", "Derselbe Kurs mit Pfad, Fortschrittsleiste und kurzen Einheiten")}>
      <Table x={44} y={56} w={72} />
      <Mon x={52} y={8} w={56} h={46}>
        <Bar x={56} y={13} w={46} p={0.33} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Chip x={56} y={20 + i * 10} w={46} h={7} c={i === 0 ? "#EFE8FB" : "#FFFFFF"} />
            {i === 0 && <Tick x={58} y={22} />}
            <Chip x={90} y={22 + i * 10} w={9} h={3} c="#C9B8F5" />
          </g>
        ))}
        <Txt x={79} y={52} size={4} anchor="middle" c="#556274">STEP 2 OF 6</Txt>
      </Mon>
      <Person x={14} y={40} who="lena" face="happy" />
    </Stage>
  ),
  "a1-4": (
    <Stage label={tt("Three questions every learner asks", "Drei Fragen, die jede Lernende stellt")}>
      <Board x={38} y={10} w={84} h={40}>
        {[["ask", 48], ["clock", 76], ["check", 104]].map(([n, x]) => (
          <g key={n as string}>
            <Icon x={x as number} y={15} name={n as string} />
            <Lines x={(x as number) - 3} y={30} w={16} n={3} gap={4} />
          </g>
        ))}
      </Board>
      <Person x={12} y={40} who="lena" face="happy" pose="up" />
      <Person x={132} y={40} who="sofia" face="happy" flip />
    </Stage>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Stage label={tt("Sofia has an idea for a course start screen", "Sofia hat eine Idee für einen Kursstart-Bildschirm")}>
      <Person x={14} y={40} who="sofia" face="think" />
      <Icon x={18} y={26} name="idea" />
      <Mon x={62} y={12} w={50} h={36} bar="#8A8A92">
        {[0, 1, 2].map((i) => (
          <Chip key={i} x={66} y={20 + i * 8} w={32} h={5} c="#E4E4E4" />
        ))}
        <Chip x={100} y={14} w={9} h={4} c="#F59E0B" />
      </Mon>
      <Calendar x={124} y={12} w={28} h={26} />
      <Txt x={138} y={32} size={9} anchor="middle">6</Txt>
      <Txt x={138} y={36} size={4} anchor="middle" c="#556274">WEEKS</Txt>
    </Stage>
  ),
  "a2-2": (
    <Stage label={tt("A paper test: four of five learners do not see the Next button", "Ein Papiertest: vier von fünf Lernenden sehen den Weiter-Button nicht")}>
      <Table x={42} y={52} w={64} />
      <Paper x={54} y={34} w={36} h={16} />
      <Chip x={82} y={36} w={5} h={3} c="#F59E0B" />
      <Person x={8} y={38} who="sofia" face="neutral" pose="point" />
      {kids([108, 118, 128, 138, 148], 51, (x, i) => (i < 4 ? <Mark x={x} y={42} kind="ask" /> : <Tick x={x + 1} y={45} />))}
    </Stage>
  ),
  "a2-3": (
    <Stage label={tt("The Next button moves below the list and four of five find it", "Der Weiter-Button wandert unter die Liste, und vier von fünf finden ihn")}>
      <Table x={42} y={52} w={64} />
      <Paper x={54} y={34} w={36} h={16} />
      <Chip x={62} y={46} w={16} h={3} c="#F59E0B" />
      <Person x={8} y={38} who="sofia" face="happy" pose="point" />
      {kids([108, 118, 128, 138, 148], 51, (x, i) => (i < 4 ? <Tick key={x} x={x + 1} y={45} /> : <Mark x={x} y={42} kind="ask" />))}
    </Stage>
  ),
  "a2-4": (
    <Stage label={tt("The same change costs more on every rung of the ladder", "Dieselbe Änderung kostet auf jeder Stufe der Leiter mehr")}>
      <Board x={24} y={8} w={112} h={52}>
        <Txt x={28} y={16} size={5} c="#556274">COST OF ONE CHANGE</Txt>
        <Chip x={38} y={44} w={14} h={6} c="#D4D8E0" />
        <Chip x={60} y={38} w={14} h={12} c="#9AA5B5" />
        <Chip x={82} y={32} w={14} h={18} c="#7A8CD9" />
        <Chip x={104} y={24} w={14} h={26} c="#7A4DE8" />
        {[["PAPER", 45], ["WIRE", 67], ["CLICK", 89], ["POLISH", 111]].map(([n, x]) => (
          <Txt key={n as string} x={x as number} y={57} size={4} anchor="middle" c="#556274">{n}</Txt>
        ))}
      </Board>
      <Person x={4} y={40} who="sofia" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Stage label={tt("Ana tests with one learner: about 31 percent of the problems", "Ana testet mit einer Lernenden: etwa 31 Prozent der Probleme")}>
      <Person x={10} y={40} who="ana" face="think" />
      <Mon x={50} y={12} w={42} h={34} bar="#8A8A92">
        <Chip x={54} y={20} w={30} h={5} c="#E4E4E4" />
        <Chip x={54} y={28} w={30} h={5} c="#E4E4E4" />
        <Chip x={78} y={14} w={9} h={4} c="#F59E0B" />
      </Mon>
      <Kid x={100} y={51} c="#2E9E6B" flip />
      <Mark x={101} y={42} kind="ask" />
      <Bar x={112} y={26} w={38} p={0.31} />
      <Txt x={131} y={20} size={9} anchor="middle">31%</Txt>
    </Stage>
  ),
  "a3-2": (
    <Stage label={tt("With five learners Ana is at about 85 percent", "Mit fünf Lernenden ist Ana bei etwa 85 Prozent")}>
      <Person x={6} y={40} who="ana" face="happy" />
      {kids([58, 70, 82, 94, 106], 51)}
      <Bar x={52} y={26} w={64} p={0.85} />
      <Txt x={84} y={20} size={9} anchor="middle">85%</Txt>
      <Txt x={132} y={36} size={9} anchor="middle">5</Txt>
      <Txt x={132} y={42} size={4} anchor="middle" c="#556274">USERS</Txt>
    </Stage>
  ),
  "a3-3": (
    <Stage label={tt("Fifteen learners cost three times as much as five", "Fünfzehn Lernende kosten dreimal so viel wie fünf")}>
      <Person x={6} y={40} who="ana" face="think" />
      {[0, 1, 2].map((row) => (
        <g key={row}>
          {kids([40, 50, 60, 70, 80], 14 + row * 17)}
        </g>
      ))}
      <Txt x={122} y={34} size={14} anchor="middle">15</Txt>
      <Txt x={122} y={52} size={11} anchor="middle" c="#D9534F">×3</Txt>
      <Txt x={122} y={58} size={4} anchor="middle" c="#556274">THE COST</Txt>
    </Stage>
  ),
  "a3-4": (
    <Stage label={tt("Watch a few to learn why, count many to learn how many", "Wenige beobachten, um zu erfahren, warum; viele zählen, um zu erfahren, wie viele")}>
      <Board x={28} y={8} w={104} h={52}>
        <Icon x={36} y={13} name="eye" />
        <Txt x={50} y={20} size={5}>WHY</Txt>
        {kids([38, 48, 58, 68, 78], 32)}
        <Icon x={92} y={13} name="chart" />
        <Txt x={106} y={20} size={5}>HOW MANY</Txt>
        <Chip x={94} y={44} w={6} h={10} c="#9AA5B5" />
        <Chip x={103} y={38} w={6} h={16} c="#9AA5B5" />
        <Chip x={112} y={32} w={6} h={22} c="#9AA5B5" />
        <Chip x={121} y={26} w={6} h={28} c="#9AA5B5" />
      </Board>
      <Person x={4} y={40} who="ana" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Stage label={tt("Level 1: Lena chooses one of three paths", "Stufe 1: Lena wählt einen von drei Pfaden")}>
      <Mon x={46} y={10} w={68} h={40}>
        {[["Basics", 50, "#FFFFFF"], ["Standard", 72, "#FFE48A"], ["Advanced", 94, "#FFFFFF"]].map(([n, x, c]) => (
          <g key={n as string}>
            <Chip x={x as number} y={20} w={19} h={14} c={c as string} />
            <Txt x={(x as number) + 9.5} y={28} size={3.4} anchor="middle">{(n as string).toUpperCase()}</Txt>
          </g>
        ))}
        <Txt x={80} y={46} size={4} anchor="middle" c="#556274">PICK A PATH</Txt>
      </Mon>
      <Person x={10} y={40} who="lena" face="neutral" pose="point" />
    </Stage>
  ),
  "a4-2": (
    <Stage label={tt("Level 2: a score of 85 skips unit 1", "Stufe 2: Ein Ergebnis von 85 überspringt Einheit 1")}>
      <Mon x={46} y={10} w={68} h={40}>
        <Txt x={66} y={34} size={14} anchor="middle">85%</Txt>
        <Arrow x={82} y={26} />
        <Chip x={92} y={18} w={18} h={8} c="#DDDDDD" />
        <Cross x={99} y={20} />
        <Chip x={92} y={30} w={18} h={8} c="#FFE48A" />
        <Tick x={99} y={32} />
        <Txt x={80} y={46} size={4} anchor="middle" c="#556274">AT LEAST 80: SKIP UNIT 1</Txt>
      </Mon>
      <Person x={10} y={40} who="lena" face="happy" pose="up" />
    </Stage>
  ),
  "a4-3": (
    <Stage label={tt("Level 3: a model decides, and it needs data, variants and an explanation", "Stufe 3: Ein Modell entscheidet und braucht Daten, Varianten und eine Erklärung")}>
      <Mon x={30} y={14} w={34} h={26} bar={null}>
        {Array.from({ length: 18 }, (_, i) => (
          <rect key={i} x={34 + (i % 6) * 5} y={19 + Math.floor(i / 6) * 6} width={2} height={2} fill="#556274" />
        ))}
      </Mon>
      <Arrow x={68} y={26} />
      <rect x={80} y={14} width={32} height={32} fill={K} />
      <rect x={81} y={15} width={30} height={30} fill="#2B2B33" />
      <Icon x={91} y={19} name="gear" />
      <Txt x={96} y={43} size={9} anchor="middle" c="#FFFFFF">?</Txt>
      <Arrow x={116} y={26} />
      <Chip x={124} y={20} w={28} h={12} c="#EFE8FB" />
      <Txt x={138} y={28} size={4} anchor="middle">NEXT STEP</Txt>
      <Person x={10} y={40} who="lena" face="surprised" />
    </Stage>
  ),
  "a4-4": (
    <Stage label={tt("Three questions before adaptive learning", "Drei Fragen vor adaptivem Lernen")}>
      <Board x={30} y={8} w={100} h={46}>
        {[["ask", 40], ["chart", 72], ["book", 104]].map(([n, x]) => (
          <g key={n as string}>
            <Icon x={x as number} y={14} name={n as string} />
            <Lines x={(x as number) - 4} y={30} w={18} n={4} gap={4} />
          </g>
        ))}
      </Board>
      <Person x={8} y={40} who="lena" face="happy" />
      <Person x={136} y={40} who="sofia" face="happy" flip />
    </Stage>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Stage label={tt("LearnLoop loses many new learners in the first week", "LearnLoop verliert viele neue Lernende in der ersten Woche")}>
      <Board x={10} y={10} w={62} h={34}>
        {[26, 22, 17, 12, 8, 4].map((h, k) => (
          <Chip key={k} x={18 + k * 9} y={40 - h} w={6} h={h} c="#D9534F" />
        ))}
        <Txt x={16} y={16} size={4} c="#556274">NEW LEARNERS STAYING</Txt>
      </Board>
      <Door x={128} y={22} />
      <Person x={86} y={40} who="sofia" face="worried" flip />
      {kids([104, 112, 120], 51)}
      <Steps x={100} y={63} n={3} />
    </Stage>
  ),
  "a5-2": (
    <Stage label={tt("Option A: twelve videos before any learner sees one", "Option A: zwölf Videos, bevor eine Lernende eines sieht")}>
      {[0, 1].flatMap((j) => [0, 1, 2, 3, 4, 5].map((i) => (
        <g key={`${i}-${j}`}>
          <rect x={45 + i * 15} y={9 + j * 18} width={14} height={16} fill={K} />
          <rect x={46 + i * 15} y={10 + j * 18} width={12} height={14} fill="#9CC3EE" />
          <Bits x={50 + i * 15} y={14 + j * 18} rows={["#...", "##..", "###.", "##..", "#..."]} map={{ "#": "#1D4E89" }} />
        </g>
      )))}
      <Person x={12} y={40} who="sofia" face="think" />
      <Person x={128} y={40} who="tom" face="sad" flip />
      <Mark x={139} y={34} kind="sweat" />
    </Stage>
  ),
  "a5-3": (
    <Stage label={tt("Option B: a paper sketch and five learners", "Option B: eine Papierskizze und fünf Lernende")}>
      <Table x={48} y={52} w={60} />
      <Paper x={60} y={34} w={36} h={16} />
      <Person x={14} y={40} who="sofia" face="happy" />
      {kids([112, 122, 132, 142, 152], 51)}
    </Stage>
  ),
  "a5-4": (
    <Stage label={tt("Option C: waiting for next quarter's numbers while learners keep leaving", "Option C: auf die Zahlen des nächsten Quartals warten, während Lernende weiter gehen")}>
      <Calendar x={12} y={8} w={58} h={46} />
      <Bits x={18} y={42} rows={["#######....", ".......####"]} map={{ "#": "#3D7BD9" }} />
      <Person x={82} y={40} who="sofia" face="worried" flip />
      <Door x={132} y={22} />
      {kids([108, 116, 124], 51)}
    </Stage>
  ),
  "a5-5": (
    <Stage label={tt("Sofia decides on B and names what she still does not know", "Sofia entscheidet sich für B und nennt, was sie noch nicht weiß")}>
      <Board x={46} y={10} w={70} h={36}>
        <Icon x={52} y={17} name="up" />
        <Icon x={72} y={17} name="clock" />
        <Icon x={92} y={17} name="warn" />
        <Lines x={52} y={32} w={9} n={2} gap={4} />
        <Lines x={72} y={32} w={9} n={2} gap={4} />
        <Lines x={92} y={32} w={9} n={2} gap={4} />
      </Board>
      <Paper x={124} y={40} w={28} h={18} />
      <Icon x={133} y={29} name="check" />
      <Person x={14} y={40} who="sofia" face="happy" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Stage label={tt("One big bet: the whole system funded at once", "Eine große Wette: das ganze System auf einmal finanziert")}>
      <Person x={12} y={40} who="boss" face="think" pose="point" />
      <Mark x={18} y={32} kind="sweat" />
      <Coins x={96} y={62} n={6} w={18} />
      <Coins x={122} y={62} n={4} w={18} />
      <Txt x={116} y={26} size={8} anchor="middle">€168,000</Txt>
    </Stage>
  ),
  "b1-2": (
    <Stage label={tt("Stage 1 costs 8,000 euros, and gate 1 is missed with three of five", "Stufe 1 kostet 8.000 Euro, und Gate 1 wird mit drei von fünf verfehlt")}>
      <Table x={40} y={52} w={50} />
      <Paper x={50} y={36} w={30} h={14} />
      <Person x={6} y={38} who="boss" face="worried" />
      {kids([100, 110, 120, 130, 140], 51, (x, i) => (i < 3 ? <Tick x={x + 1} y={45} /> : <Cross x={x + 1} y={45} />))}
      <Txt x={120} y={24} size={11} anchor="middle">3 / 5</Txt>
      <Txt x={120} y={32} size={4} anchor="middle" c="#556274">GATE: AT LEAST 4</Txt>
      <Txt x={65} y={26} size={7} anchor="middle">€8,000</Txt>
    </Stage>
  ),
  "b1-3": (
    <Stage label={tt("A pilot for 40,000 euros, a missed gate, and 120,000 euros kept", "Ein Pilot für 40.000 Euro, ein verfehltes Gate und 120.000 Euro behalten")}>
      <Person x={8} y={40} who="boss" face="neutral" pose="up" />
      <Calendar x={46} y={12} w={28} h={26} />
      <Txt x={60} y={32} size={8} anchor="middle">8</Txt>
      <Txt x={60} y={36} size={4} anchor="middle" c="#556274">WEEKS</Txt>
      <Txt x={96} y={20} size={7} anchor="middle" c="#D9534F">€48,000</Txt>
      <Txt x={96} y={26} size={4} anchor="middle" c="#556274">SPENT</Txt>
      <Icon x={90} y={30} name="lock" />
      <Coins x={126} y={62} n={5} w={18} />
      <Txt x={135} y={34} size={7} anchor="middle">€120,000</Txt>
      <Txt x={135} y={40} size={4} anchor="middle" c="#556274">KEPT</Txt>
    </Stage>
  ),
  "b1-4": (
    <Stage label={tt("Three stages with a gate between them", "Drei Stufen mit einem Gate dazwischen")}>
      <Chip x={44} y={46} w={22} h={10} c="#D4D8E0" />
      <Chip x={76} y={36} w={22} h={20} c="#9AA5B5" />
      <Chip x={108} y={22} w={22} h={34} c="#7A4DE8" />
      <Icon x={64} y={32} name="check" />
      <Icon x={96} y={22} name="check" />
      <Txt x={55} y={52} size={4} anchor="middle">TEST</Txt>
      <Txt x={87} y={50} size={4} anchor="middle">PILOT</Txt>
      <Txt x={119} y={42} size={4} anchor="middle" c="#FFFFFF">ROLL-OUT</Txt>
      <Person x={10} y={40} who="boss" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Stage label={tt("Six features placed by value and by the data they need", "Sechs Funktionen, eingeordnet nach Wert und benötigten Daten")}>
      <Matrix />
      <Person x={4} y={40} who="sofia" face="neutral" pose="point" />
    </Stage>
  ),
  "b2-2": (
    <Stage label={tt("Feature C gives high value for little data: start here", "Funktion C gibt hohen Wert bei wenig Daten: hier beginnen")}>
      <Matrix hi={["C"]} />
      <Person x={4} y={40} who="sofia" face="happy" pose="up" />
    </Stage>
  ),
  "b2-3": (
    <Stage label={tt("Features D and F need the most data and can wait", "Die Funktionen D und F brauchen die meisten Daten und können warten")}>
      <Matrix hi={["D", "F"]} />
      <Person x={4} y={40} who="sofia" face="think" />
      <Icon x={140} y={14} name="clock" />
    </Stage>
  ),
  "b2-4": (
    <Stage label={tt("Two questions place every feature", "Zwei Fragen ordnen jede Funktion ein")}>
      <Board x={34} y={10} w={92} h={42}>
        <Icon x={44} y={16} name="heart" />
        <Lines x={42} y={32} w={26} n={3} gap={4} />
        <Icon x={92} y={16} name="gear" />
        <Lines x={90} y={32} w={26} n={3} gap={4} />
      </Board>
      <Person x={8} y={40} who="sofia" face="happy" />
      <Person x={136} y={40} who="boss" face="happy" flip />
    </Stage>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Stage label={tt("200 learners split at random into a pilot group and a control group of 100 each", "200 Lernende, zufällig in eine Pilotgruppe und eine Kontrollgruppe zu je 100 geteilt")}>
      <Hundred x={14} y={8} c="#7A4DE8" />
      <Hundred x={106} y={8} c="#8A8F99" />
      <Txt x={34} y={58} size={5} anchor="middle">PILOT</Txt>
      <Txt x={126} y={58} size={5} anchor="middle">CONTROL</Txt>
      <Person x={73} y={36} who="boss" face="neutral" pose="up" />
    </Stage>
  ),
  "b3-2": (
    <Stage label={tt("The gate is missed: the pilot is only two points above the control group", "Das Gate wird verfehlt: Der Pilot liegt nur zwei Punkte über der Kontrollgruppe")}>
      <Gate pilot={62} />
      <Icon x={118} y={14} name="cross" />
      <Person x={2} y={40} who="boss" face="worried" />
    </Stage>
  ),
  "b3-3": (
    <Stage label={tt("The gate is met: the pilot is seven points above the control group", "Das Gate wird erreicht: Der Pilot liegt sieben Punkte über der Kontrollgruppe")}>
      <Gate pilot={67} />
      <Icon x={118} y={14} name="check" />
      <Person x={2} y={40} who="boss" face="happy" pose="up" />
    </Stage>
  ),
  "b3-4": (
    <Stage label={tt("A decision under uncertainty has four parts", "Eine Entscheidung unter Unsicherheit hat vier Teile")}>
      <Board x={22} y={8} w={116} h={50}>
        {[["check", 30], ["ask", 58], ["clock", 86], ["down", 114]].map(([n, x]) => (
          <g key={n as string}>
            <Icon x={x as number} y={14} name={n as string} />
            <Lines x={(x as number) - 3} y={30} w={16} n={4} gap={4} />
          </g>
        ))}
      </Board>
      <Person x={2} y={40} who="boss" face="happy" />
    </Stage>
  ),
};
