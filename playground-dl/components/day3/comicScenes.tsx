import type { ReactNode } from "react";
import { Arrow, Bar, Bits, Board, Chip, Coins, Cross, Icon, K, Kid, KID_COLOURS, LOOK, Lines, Mark, Mon, Person, Stage, Table, Tick, Txt } from "@/components/comic/PixelKit";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 3 comics (data/day3/comics.ts, DL-STANDARD.md section 13). People: Daniel (a learner in procurement), Mira (a team
 * leader), Priya (LearnLoop's content lead) and LearnLoop's Chief Product Officer, all made up. Every figure is one of the card's own.
 */
LOOK.daniel = { hair: "#3A2A20", shirt: "#4A5568", glasses: true };
LOOK.mira = { hair: "#6B3A2A", shirt: "#C0455A", long: true };
LOOK.priya = { hair: "#1B1B22", shirt: "#2B8A6E", long: true, skin: "#C8946A" };

/** One bar split into the three loads of card A2: the subject (grey), the waste (rust), what is left for understanding (teal). */
function LoadBar({ subject, waste, left }: { subject: number; waste: number; left: number }) {
  const w = 100;
  const a = Math.round((subject / 100) * w);
  const b = Math.round((waste / 100) * w);
  const c = w - a - b;
  return (
    <g>
      <Board x={28} y={10} w={104} h={34}>
        <Txt x={32} y={19} size={4.5} c="#556274">WORKING MEMORY</Txt>
        <rect x={29} y={22} width={102} height={13} fill={K} />
        <rect x={30} y={23} width={a} height={11} fill="#9AA5B5" />
        <rect x={30 + a} y={23} width={b} height={11} fill="#D9534F" />
        <rect x={30 + a + b} y={23} width={c} height={11} fill="#2AA39A" />
        <Txt x={30 + a / 2} y={31} size={5} anchor="middle" c="#FFFFFF">{subject}</Txt>
        {b > 6 && <Txt x={30 + a + b / 2} y={31} size={5} anchor="middle" c="#FFFFFF">{waste}</Txt>}
        {c > 6 && <Txt x={30 + a + b + c / 2} y={31} size={5} anchor="middle" c="#FFFFFF">{left}</Txt>}
        <Txt x={30 + a / 2} y={40} size={3.6} anchor="middle" c="#556274">SUBJECT</Txt>
        <Txt x={30 + a + b / 2} y={40} size={3.6} anchor="middle" c="#D9534F">WASTE</Txt>
        {c > 20 ? <Txt x={30 + a + b + c / 2} y={40} size={3.6} anchor="middle" c="#0B6F69">UNDERSTAND</Txt> : <Txt x={130} y={40} size={3.6} anchor="end" c="#0B6F69">UNDERSTAND</Txt>}
      </Board>
    </g>
  );
}

/** Four boxes of working memory, `n` filled. */
function Slots({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={x + i * 12 - 1} y={y - 1} width={11} height={11} fill={K} />
          <rect x={x + i * 12} y={y} width={9} height={9} fill={i < n ? "#9CC3EE" : "#FFFFFF"} />
        </g>
      ))}
    </g>
  );
}

/** A shelf of long-term memory with books. */
function Shelf({ x, y }: { x: number; y: number }) {
  const cols = ["#D9534F", "#3D7BD9", "#F2A900", "#2E9E6B", "#8A63D2", "#D9534F", "#3D7BD9"];
  return (
    <g>
      <rect x={x - 1} y={y - 1} width={52} height={40} fill={K} />
      <rect x={x} y={y} width={50} height={38} fill="#B58B5A" />
      {[0, 1].map((r) => (
        <g key={r}>
          <rect x={x + 2} y={y + 17 + r * 18} width={46} height={2} fill={K} />
          {cols.map((c, i) => (
            <g key={i}>
              <rect x={x + 3 + i * 6} y={y + 4 + r * 18 - (i % 3)} width={5} height={13 + (i % 3)} fill={K} />
              <rect x={x + 4 + i * 6} y={y + 5 + r * 18 - (i % 3)} width={3} height={11 + (i % 3)} fill={c} />
            </g>
          ))}
        </g>
      ))}
    </g>
  );
}

/** A screen cluttered with `n` small things. */
function Clutter({ x, y, w, h, n }: { x: number; y: number; w: number; h: number; n: number }) {
  const cols = ["#F59E0B", "#3D7BD9", "#D9534F", "#2E9E6B", "#8A63D2", "#0B8A82", "#F2A900", "#B5372E"];
  return (
    <Mon x={x} y={y} w={w} h={h} bar="#8A8A92">
      {Array.from({ length: n }, (_, i) => (
        <Chip key={i} x={x + 3 + (i % 4) * Math.floor((w - 6) / 4)} y={y + 7 + Math.floor(i / 4) * 8} w={Math.floor((w - 6) / 4) - 2} h={5} c={cols[i % cols.length]} />
      ))}
    </Mon>
  );
}

/** The matrix of card B2: load removed across, depth kept up. */
function Corners({ hi }: { hi?: string[] }) {
  // positions are the card's own: load removed (left to right) and depth kept (bottom to top)
  const dots: [string, number, number][] = [["A", 105, 44], ["B", 92, 20], ["C", 87, 27], ["D", 107, 38], ["E", 48, 15]];
  return (
    <Board x={30} y={8} w={100} h={52}>
      <rect x={40} y={12} width={1} height={40} fill={K} />
      <rect x={40} y={52} width={84} height={1} fill={K} />
      <Txt x={58} y={15} size={3.6} c="#556274">DEEP BUT HEAVY</Txt>
      <Txt x={102} y={14} size={3.6} c="#0B6F69">AIM HERE</Txt>
      <Txt x={84} y={58} size={4} anchor="middle" c="#556274">LOAD REMOVED →</Txt>
      {dots.map(([n, x, y]) => (
        <g key={n}>
          {hi?.includes(n) && <rect x={x - 3} y={y - 3} width={14} height={11} fill="none" stroke="#F2A900" strokeWidth={1.5} />}
          <rect x={x - 1} y={y - 1} width={8} height={8} fill={K} />
          <rect x={x} y={y} width={6} height={6} fill={hi?.includes(n) ? "#7A4DE8" : "#9AA5B5"} />
          <Txt x={x + 3} y={y + 5} size={5} c="#FFFFFF" anchor="middle">{n}</Txt>
        </g>
      ))}
    </Board>
  );
}

const group = (x: number, y: number, label: string, n: number, c: string) => (
  <g>
    <rect x={x - 1} y={y - 1} width={n * 7 + 3} height={16} fill={K} />
    <rect x={x} y={y} width={n * 7 + 1} height={14} fill="#F4F1FD" />
    {Array.from({ length: n }, (_, i) => (
      <Chip key={i} x={x + 2 + i * 7} y={y + 7} w={5} h={5} c={c} />
    ))}
    <Txt x={x + 2} y={y + 5} size={4.2}>{label}</Txt>
  </g>
);

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

/** A learner's path to a goal flag (card B1): `reaches` ends on the goal, `detour` loops around banners, otherwise the path stops short. */
function Path({ y, reaches, detour, label }: { y: number; reaches?: boolean; detour?: boolean; label?: [string, string] }) {
  const end = reaches ? 118 : 70;
  return (
    <g>
      <rect x={30} y={y} width={84} height={14} fill="#F4F6FA" />
      <rect x={30} y={y} width={84} height={1} fill={K} />
      <rect x={30} y={y + 13} width={84} height={1} fill={K} />
      <Kid x={32} y={y + 2} c={KID_COLOURS[0]} flip />
      {detour ? (
        <>
          <Chip x={52} y={y + 3} w={10} h={8} c="#F59E0B" />
          <Chip x={72} y={y + 3} w={10} h={8} c="#D9534F" />
          <Arrow x={90} y={y + 5} />
        </>
      ) : (
        <Arrow x={50} y={y + 5} />
      )}
      <rect x={reaches ? 106 : 64} y={y + 1} width={3} height={12} fill={K} />
      {reaches ? <Icon x={96} y={y + 2} name="check" /> : <Cross x={72} y={y + 3} />}
      {label && (
        <g>
          <Txt x={118} y={y + 6} size={3.4}>{label[0]}</Txt>
          <Txt x={118} y={y + 12} size={3.4} c="#556274">{label[1]}</Txt>
        </g>
      )}
    </g>
  );
}

export const ART_D3: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Stage label={tt("Daniel's eyes pick one thing on a busy screen", "Daniels Augen wählen eine Sache auf einem vollen Bildschirm")}>
      <Table x={44} y={56} w={72} />
      <Clutter x={52} y={8} w={56} h={46} n={12} />
      <Chip x={70} y={26} w={14} h={5} c="#FFE48A" />
      <Icon x={118} y={14} name="eye" />
      <Arrow x={110} y={20} />
      <Person x={14} y={40} who="daniel" face="think" />
    </Stage>
  ),
  "a1-2": (
    <Stage label={tt("Working memory holds only a few things at once", "Das Arbeitsgedächtnis hält nur wenige Dinge auf einmal")}>
      <Person x={14} y={40} who="daniel" face="worried" />
      <Mark x={19} y={32} kind="sweat" />
      <Slots x={56} y={24} n={4} />
      <Txt x={80} y={20} size={5} anchor="middle" c="#556274">WORKING MEMORY</Txt>
      <Chip x={116} y={14} w={8} h={8} c="#F59E0B" />
      <Arrow x={104} y={30} />
      <Mark x={118} y={26} kind="bang" />
    </Stage>
  ),
  "a1-3": (
    <Stage label={tt("A question at the start of the next lesson pulls an answer from long-term memory", "Eine Frage am Anfang der nächsten Lektion holt eine Antwort aus dem Langzeitgedächtnis")}>
      <Shelf x={86} y={12} />
      <Person x={14} y={40} who="daniel" face="happy" pose="point" />
      <Icon x={44} y={22} name="ask" />
      <Txt x={110} y={56} size={4.5} anchor="middle" c="#556274">LONG-TERM MEMORY</Txt>
    </Stage>
  ),
  "a1-4": (
    <Stage label={tt("Three steps to describe how a screen feels", "Drei Schritte, um zu beschreiben, wie sich ein Bildschirm anfühlt")}>
      <Board x={32} y={10} w={96} h={40}>
        {[["eye", 42, "INTAKE"], ["clock", 72, "PROCESS"], ["book", 102, "STORE"]].map(([n, x, l]) => (
          <g key={n as string}>
            <Icon x={x as number} y={16} name={n as string} />
            <Txt x={(x as number) + 4.5} y={36} size={4.4} anchor="middle">{l as string}</Txt>
          </g>
        ))}
        <Arrow x={56} y={20} />
        <Arrow x={86} y={20} />
      </Board>
      <Person x={8} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Stage label={tt("A hard lesson: 38 percent of Daniel's working memory goes to the subject", "Eine schwere Lektion: 38 Prozent von Daniels Arbeitsgedächtnis gehen an das Thema")}>
      <LoadBar subject={38} waste={0} left={62} />
      <Person x={14} y={40} who="daniel" face="think" />
      <Chip x={96} y={50} w={30} h={10} c="#FBF6E6" />
      <Txt x={111} y={58} size={4.4} anchor="middle">CONTRACT</Txt>
    </Stage>
  ),
  "a2-2": (
    <Stage label={tt("A banner, a chat window and a menu of nine entries add waste: 52 percent", "Ein Banner, ein Chatfenster und ein Menü mit neun Einträgen erzeugen Verschwendung: 52 Prozent")}>
      <LoadBar subject={38} waste={52} left={10} />
      <Person x={14} y={40} who="daniel" face="worried" />
      <Mark x={19} y={32} kind="sweat" />
      <Clutter x={60} y={48} w={60} h={14} n={8} />
    </Stage>
  ),
  "a2-3": (
    <Stage label={tt("The redesigned page: waste falls to 12 percent", "Die neu gestaltete Seite: Die Verschwendung sinkt auf 12 Prozent")}>
      <LoadBar subject={38} waste={12} left={50} />
      <Person x={14} y={40} who="daniel" face="happy" />
      <Mon x={60} y={48} w={60} h={14} bar="#4C2FBF"><Lines x={64} y={55} w={40} n={2} gap={3} /></Mon>
    </Stage>
  ),
  "a2-4": (
    <Stage label={tt("Which part of the bar is the problem?", "Welcher Teil des Balkens ist das Problem?")}>
      <LoadBar subject={38} waste={12} left={50} />
      <Person x={8} y={40} who="priya" face="happy" pose="up" />
      <Icon x={64} y={52} name="ask" />
      <Arrow x={78} y={54} />
      <Icon x={92} y={52} name="gear" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Stage label={tt("Mira meets twelve separate things on a start page", "Mira begegnet zwölf einzelnen Dingen auf einer Startseite")}>
      <Person x={14} y={40} who="mira" face="worried" />
      <Mark x={19} y={32} kind="ask" />
      <Clutter x={52} y={8} w={80} h={50} n={12} />
      <Txt x={144} y={34} size={11} anchor="middle">12</Txt>
    </Stage>
  ),
  "a3-2": (
    <Stage label={tt("The same twelve items in three named groups: Learn, Progress, Talk", "Dieselben zwölf Dinge in drei benannten Gruppen: Lernen, Fortschritt, Gespräch")}>
      <Person x={14} y={40} who="mira" face="happy" />
      {group(50, 12, "LEARN", 5, "#3D7BD9")}
      {group(96, 12, "PROGRESS", 4, "#2E9E6B")}
      {group(50, 34, "TALK", 3, "#F59E0B")}
      <Txt x={130} y={44} size={11} anchor="middle">3</Txt>
    </Stage>
  ),
  "a3-3": (
    <Stage label={tt("A visual hierarchy: size, colour and position say what to look at first", "Eine visuelle Hierarchie: Größe, Farbe und Position sagen, wohin man zuerst schaut")}>
      <Mon x={48} y={8} w={70} h={48}>
        <Chip x={54} y={16} w={40} h={14} c="#FFE48A" />
        <Txt x={74} y={26} size={5} anchor="middle">NEXT QUIZ</Txt>
        {[0, 1, 2, 3].map((i) => (
          <Chip key={i} x={54 + (i % 2) * 28} y={36 + Math.floor(i / 2) * 8} w={24} h={5} c="#D4D8E0" />
        ))}
      </Mon>
      <Icon x={126} y={16} name="eye" />
      <Arrow x={122} y={26} />
      <Person x={14} y={40} who="mira" face="happy" pose="point" />
    </Stage>
  ),
  "a3-4": (
    <Stage label={tt("More than about four separate things: group them or hide some", "Mehr als etwa vier einzelne Dinge: gruppieren oder einige verbergen")}>
      <Board x={36} y={10} w={88} h={40}>
        <Slots x={44} y={18} n={4} />
        <Txt x={92} y={25} size={9}>≈ 4</Txt>
        <Txt x={44} y={40} size={4.6} c="#556274">MORE? GROUP OR HIDE</Txt>
      </Board>
      <Person x={8} y={40} who="mira" face="happy" pose="up" />
      <Person x={136} y={40} who="priya" face="happy" flip />
    </Stage>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Stage label={tt("Overload: too many things compete for attention", "Überlastung: Zu viele Dinge konkurrieren um die Aufmerksamkeit")}>
      <Table x={44} y={56} w={72} />
      <Clutter x={52} y={8} w={56} h={46} n={12} />
      <Person x={14} y={40} who="daniel" face="surprised" />
      <Mark x={19} y={32} kind="sweat" />
    </Stage>
  ),
  "a4-2": (
    <Stage label={tt("Unclear structure: one block of text with no headings", "Unklare Struktur: ein Textblock ohne Überschriften")}>
      <Table x={44} y={56} w={72} />
      <Mon x={52} y={8} w={56} h={46} bar="#8A8A92"><Lines x={56} y={16} w={46} n={11} gap={3} /></Mon>
      <Person x={14} y={40} who="daniel" face="worried" />
      <Mark x={19} y={32} kind="ask" />
    </Stage>
  ),
  "a4-3": (
    <Stage label={tt("Missing feedback: the learner cannot tell whether the effort worked", "Fehlendes Feedback: Die Lernende kann nicht sagen, ob die Mühe gewirkt hat")}>
      <Table x={44} y={56} w={72} />
      <Mon x={52} y={8} w={56} h={46}>
        <Chip x={58} y={18} w={44} h={6} c="#FFFFFF" />
        <Chip x={58} y={27} w={44} h={6} c="#FFFFFF" />
        <Chip x={74} y={40} w={14} h={6} c="#F59E0B" />
        <Txt x={81} y={45} size={3.6} anchor="middle" c="#FFFFFF">SEND</Txt>
      </Mon>
      <Person x={14} y={40} who="daniel" face="sad" />
      <Mark x={19} y={32} kind="ask" />
    </Stage>
  ),
  "a4-4": (
    <Stage label={tt("Complex navigation: effort goes into finding, not learning", "Komplexe Navigation: Die Mühe geht ins Finden, nicht ins Lernen")}>
      <Table x={44} y={56} w={72} />
      <Mon x={52} y={8} w={56} h={46}>
        {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
          <Chip key={`${r}${c}`} x={56 + c * 16} y={16 + r * 10} w={13} h={6} c={r === 2 && c === 1 ? "#FFE48A" : "#E4E4E4"} />
        )))}
        <Arrow x={78} y={46} />
        <Txt x={80} y={52} size={3.8} anchor="middle" c="#556274">5 MENU LEVELS</Txt>
      </Mon>
      <Person x={14} y={40} who="daniel" face="worried" />
      <Mark x={19} y={32} kind="sweat" />
    </Stage>
  ),
  "a4-5": (
    <Stage label={tt("Each mistake has a remedy, and too simple is also a mistake", "Jeder Fehler hat ein Heilmittel, und zu einfach ist auch ein Fehler")}>
      <Board x={30} y={8} w={100} h={46}>
        {[["warn", 40, "ONE FOCUS"], ["book", 66, "HEADINGS"], ["check", 92, "A RESULT"], ["eye", 118, "FEW PATHS"]].map(([n, x, l]) => (
          <g key={n as string}>
            <Icon x={(x as number) - 4} y={14} name={n as string} />
            <Txt x={x as number} y={36} size={3.2} anchor="middle">{l as string}</Txt>
          </g>
        ))}
      </Board>
      <Person x={8} y={40} who="priya" face="happy" />
      <Person x={136} y={40} who="daniel" face="happy" flip />
    </Stage>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Stage label={tt("A beginners' course rated too complicated: four weeks and three ideas", "Ein Anfängerkurs, als zu kompliziert bewertet: vier Wochen und drei Ideen")}>
      <Board x={40} y={8} w={80} h={40}>
        {[1, 2, 3].map((i) => (
          <g key={i}>
            <Icon x={48 + (i - 1) * 24} y={14} name="idea" />
            <Txt x={52.5 + (i - 1) * 24} y={34} size={7} anchor="middle">{i}</Txt>
          </g>
        ))}
        <Txt x={80} y={44} size={4.4} anchor="middle" c="#556274">IMPACT · EFFORT · RISK</Txt>
      </Board>
      <Person x={10} y={40} who="priya" face="worried" />
      <Person x={130} y={40} who="boss" face="neutral" flip />
    </Stage>
  ),
  "a5-2": (
    <Stage label={tt("Idea 1: shorten the content a lot", "Idee 1: den Inhalt stark kürzen")}>
      <Board x={34} y={4} w={92} h={56}>
        <Txt x={40} y={12} size={4.4}>1 · SHORTEN A LOT · 6,000</Txt>
        <Chip x={40} y={18} w={30} h={4} c="#D9534F" />
        <Chip x={40} y={24} w={8} h={4} c="#D4D8E0" />
        {rate([["IMPACT", 1, "LOW"], ["EFFORT", 1, "LOW"], ["RISK", 3, "HIGH"]], 40, 38)}
      </Board>
      <Person x={10} y={40} who="priya" face="think" />
      <Person x={128} y={40} who="boss" face="surprised" flip />
    </Stage>
  ),
  "a5-3": (
    <Stage label={tt("Idea 2: add diagrams and graphics", "Idee 2: Diagramme und Grafiken hinzufügen")}>
      <Board x={34} y={4} w={92} h={56}>
        <Txt x={40} y={12} size={4.4}>2 · DIAGRAMS · 16,000</Txt>
        <Chip x={40} y={18} w={14} h={10} c="#B5D4F4" />
        <Bits x={58} y={20} rows={["#####", "#...#", "#.#.#", "#...#", "#####"]} map={{ "#": "#3D7BD9" }} />
        {rate([["IMPACT", 2, "MID"], ["EFFORT", 3, "HIGH"], ["RISK", 2, "MID"]], 40, 38)}
      </Board>
      <Person x={10} y={40} who="priya" face="neutral" />
      <Person x={128} y={40} who="boss" face="think" flip />
    </Stage>
  ),
  "a5-4": (
    <Stage label={tt("Idea 3: split the content into small modules", "Idee 3: den Inhalt in kleine Module teilen")}>
      <Board x={34} y={4} w={92} h={56}>
        <Txt x={40} y={12} size={4.4}>3 · MODULES · 12,000</Txt>
        {[0, 1, 2].map((i) => (
          <Chip key={i} x={50 + i * 11} y={18} w={9} h={9} c="#9CC3EE" />
        ))}
        {rate([["IMPACT", 3, "HIGH"], ["EFFORT", 2, "MID"], ["RISK", 1, "LOW"]], 40, 38)}
      </Board>
      <Person x={10} y={40} who="priya" face="happy" />
      <Person x={128} y={40} who="boss" face="happy" flip />
    </Stage>
  ),
  "a5-5": (
    <Stage label={tt("The module split has the greatest effect; what is not yet known is named", "Die Modul-Teilung hat die größte Wirkung; was noch unbekannt ist, wird benannt")}>
      <Board x={44} y={8} w={72} h={40}>
        {[0, 1, 2].map((i) => (
          <Chip key={i} x={52 + i * 14} y={14} w={10} h={10} c="#7A4DE8" />
        ))}
        <Icon x={96} y={13} name="check" />
        <Icon x={68} y={30} name="ask" />
        <Txt x={80} y={46} size={3.8} anchor="middle" c="#556274">AMOUNT OR WORDING?</Txt>
      </Board>
      <Person x={10} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Stage label={tt("First lens, learning effectiveness: did the learner learn what the course promised", "Erste Linse, Lerneffektivität: Hat die Lernende gelernt, was der Kurs versprach")}>
      <Path y={34} reaches />
      <Person x={8} y={40} who="boss" face="think" pose="point" />
    </Stage>
  ),
  "b1-2": (
    <Stage label={tt("Second lens, cognitive efficiency: how much mental effort did it take", "Zweite Linse, kognitive Effizienz: Wie viel geistige Anstrengung hat es gekostet")}>
      <Board x={40} y={10} w={80} h={36}>
        <Txt x={46} y={20} size={4.6} c="#556274">MENTAL EFFORT</Txt>
        <rect x={45} y={25} width={70} height={9} fill={K} />
        <rect x={46} y={26} width={30} height={7} fill="#2AA39A" />
        <Txt x={46} y={42} size={4} c="#556274">LOW · REASONABLE</Txt>
      </Board>
      <Person x={8} y={40} who="boss" face="think" pose="point" />
    </Stage>
  ),
  "b1-3": (
    <Stage label={tt("Three paths: short and arrives, long and arrives, short and stops early", "Drei Wege: kurz und am Ziel, lang und am Ziel, kurz und zu früh zu Ende")}>
      <Path y={6} reaches label={["EFFECTIVE", "EFFICIENT"]} />
      <Path y={24} reaches detour label={["EFFECTIVE", "NOT EFFICIENT"]} />
      <Path y={42} label={["EFFICIENT", "NOT EFFECTIVE"]} />
    </Stage>
  ),
  "b1-4": (
    <Stage label={tt("Prefer the measure that gets the learning result at a reasonable mental cost", "Die Maßnahme vorziehen, die das Lernergebnis zu vertretbaren geistigen Kosten erreicht")}>
      <Board x={34} y={10} w={92} h={38}>
        <Chip x={40} y={18} w={34} h={9} c="#E4E4E4" />
        <Txt x={57} y={24.5} size={3.8} anchor="middle">LOOKS LIGHTER</Txt>
        <Cross x={80} y={18} />
        <Chip x={92} y={18} w={28} h={9} c="#9CC3EE" />
        <Txt x={106} y={24.5} size={3.8} anchor="middle">LEARNING</Txt>
        <Icon x={101} y={32} name="check" />
      </Board>
      <Person x={8} y={40} who="boss" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Stage label={tt("Five options placed by the load they remove and the depth they keep", "Fünf Optionen, eingeordnet nach der Last, die sie entfernen, und der Tiefe, die sie behalten")}>
      <Corners />
      <Person x={4} y={40} who="priya" face="neutral" pose="point" />
    </Stage>
  ),
  "b2-2": (
    <Stage label={tt("Option A cuts the content by half: light but shallow", "Option A halbiert den Inhalt: leicht, aber flach")}>
      <Corners hi={["A"]} />
      <Person x={4} y={40} who="priya" face="worried" />
    </Stage>
  ),
  "b2-3": (
    <Stage label={tt("Option E keeps the course as it is: deep but heavy, and learners leave", "Option E behält den Kurs, wie er ist: tief, aber schwer, und Lernende gehen")}>
      <Corners hi={["E"]} />
      <Person x={4} y={40} who="priya" face="sad" />
    </Stage>
  ),
  "b2-4": (
    <Stage label={tt("Option B splits the course into modules: aim here", "Option B teilt den Kurs in Module: hier zielen")}>
      <Corners hi={["B"]} />
      <Person x={4} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Stage label={tt("I decide: rebuild one course in small modules and test it with five beginners. I do not know: the amount or the wording?", "Ich entscheide: einen Kurs in kleinen Modulen neu bauen und mit fünf Einsteigern testen. Ich weiß nicht: Menge oder Formulierung?")}>
      <Person x={10} y={40} who="boss" face="think" />
      <Mark x={16} y={32} kind="ask" />
      <Mon x={44} y={12} w={32} h={28}><Lines x={48} y={20} w={24} n={4} gap={4} /></Mon>
      <Arrow x={80} y={24} />
      {[92, 102, 112, 122, 132].map((x, i) => (
        <Kid key={x} x={x} y={44} c={KID_COLOURS[i]} flip />
      ))}
      <Txt x={112} y={30} size={8} anchor="middle">5</Txt>
    </Stage>
  ),
  "b3-2": (
    <Stage label={tt("I reverse if: fewer than 4 of 5 can explain the key point, or completion is not up 5 points after 8 weeks", "Ich nehme zurück, wenn: weniger als 4 von 5 den Kerngedanken erklären können oder die Completion nach 8 Wochen nicht um 5 Punkte gestiegen ist")}>
      <Person x={8} y={40} who="boss" face="neutral" pose="up" />
      <Board x={44} y={8} w={84} h={50}>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <Kid x={50 + i * 14} y={26} c={KID_COLOURS[i]} />
            {i < 3 ? <Tick x={51 + i * 14} y={17} /> : <Cross x={51 + i * 14} y={17} />}
          </g>
        ))}
        <Txt x={86} y={14} size={4.2} anchor="middle" c="#556274">NEED 4 OF 5</Txt>
        <Txt x={50} y={46} size={4.6}>+5</Txt>
        <Icon x={62} y={39} name="chart" />
        <Txt x={76} y={46} size={4.6}>8 WEEKS</Txt>
      </Board>
    </Stage>
  ),
  "b3-3": (
    <Stage label={tt("I give up: the full diagram redesign this year", "Ich verzichte auf: die komplette Diagramm-Neugestaltung in diesem Jahr")}>
      <Person x={8} y={40} who="boss" face="neutral" />
      <Board x={46} y={10} w={80} h={40}>
        <Bits x={54} y={18} rows={["#####", "#...#", "#.#.#", "#...#", "#####"]} map={{ "#": "#3D7BD9" }} />
        <Txt x={72} y={24} size={4.6}>DIAGRAM</Txt>
        <Txt x={72} y={31} size={4.6}>REDESIGN</Txt>
        <Cross x={104} y={22} />
        <Txt x={86} y={44} size={4} anchor="middle" c="#556274">NOT THIS YEAR</Txt>
      </Board>
    </Stage>
  ),
  "b3-4": (
    <Stage label={tt("A rule for future content: who decides, and on what evidence", "Eine Regel für künftige Inhalte: wer entscheidet und auf welcher Grundlage")}>
      <Board x={26} y={8} w={108} h={50}>
        <Txt x={32} y={17} size={4.6} c="#556274">WHO DECIDES</Txt>
        <Icon x={34} y={20} name="eye" />
        <Txt x={48} y={27} size={4.4}>HEAD OF LEARNING + CONTENT LEAD</Txt>
        <Txt x={32} y={40} size={4.6} c="#556274">ON WHAT EVIDENCE</Txt>
        <Icon x={34} y={43} name="chart" />
        <Txt x={48} y={50} size={4.4}>USABILITY TEST · CHECK · DROP-OUT</Txt>
      </Board>
      <Person x={2} y={40} who="priya" face="happy" />
    </Stage>
  ),
};
// keep imports used even when a scene set changes
void Bar;
void Coins;
