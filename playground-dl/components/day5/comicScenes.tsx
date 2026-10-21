import type { ReactNode } from "react";
import { Arrow, Bar, Bits, Board, Chip, Coins, Cross, Icon, K, Kid, KID_COLOURS, LOOK, Lines, Mark, Mon, Person, Stage, Table, Tick, Txt } from "@/components/comic/PixelKit";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 5 comics (data/day5/comics.ts, DL-STANDARD.md section 13). People: Mia (a project manager who is a learner), Priya (LearnLoop's
 * UX lead), Dana (the product manager) and the finance director, all made up. Every figure is one of the card's own.
 */
LOOK.mia = { hair: "#5A3A22", shirt: "#3D7BD9", long: true };
LOOK.priya = { hair: "#1B1B22", shirt: "#2B8A6E", long: true, skin: "#C8946A" };
LOOK.dana = { hair: "#5A3A22", shirt: "#8A63D2", long: true };
LOOK.fin = { hair: "#B8B8BE", shirt: "#33415C", glasses: true };

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

/** A platform screen in four states: how the menu is built and what the page says. */
function Menu({ kind }: { kind: "soft" | "names" | "three" | "full" | "tasks" | "feature" }) {
  const soft = ["#B8B8C0", "#A8B0BC", "#C0B0A8", "#B8C0B0", "#B0A8C0", "#C0C0A8", "#A8C0C0", "#C0A8B8", "#B0B8B8", "#B8B0A8"];
  return (
    <Mon x={46} y={6} w={68} h={52} bar="#8A8A92">
      {kind === "soft" && (
        <>
          {soft.map((c, i) => (
            <Chip key={i} x={49 + (i % 2) * 14} y={14 + Math.floor(i / 2) * 7} w={12} h={5} c={c} />
          ))}
          <Txt x={92} y={22} size={5}>LIBRARY</Txt>
          <Lines x={79} y={28} w={32} n={4} gap={4} />
        </>
      )}
      {kind === "names" && (
        <>
          {["MY COURSES", "FIND", "PROGRESS", "HELP", "SETTINGS", "ACCOUNT", "NEWS", "TEAM", "SHOP", "MORE"].map((l, i) => (
            <g key={l}>
              <Chip x={49 + (i % 2) * 14} y={14 + Math.floor(i / 2) * 7} w={12} h={5} c="#B5D4F4" />
              <Txt x={55 + (i % 2) * 14} y={18 + Math.floor(i / 2) * 7} size={2.6} anchor="middle">{l}</Txt>
            </g>
          ))}
          <Txt x={92} y={22} size={5}>LIBRARY</Txt>
          <Lines x={79} y={28} w={32} n={4} gap={4} />
        </>
      )}
      {kind === "three" && (
        <>
          {["MY COURSES", "FIND", "PROGRESS"].map((l, i) => (
            <g key={l}>
              <Chip x={49} y={14 + i * 9} w={22} h={7} c="#B5D4F4" />
              <Txt x={60} y={19.5 + i * 9} size={3.4} anchor="middle">{l}</Txt>
            </g>
          ))}
          <Txt x={92} y={22} size={5}>LIBRARY</Txt>
          <Lines x={79} y={28} w={32} n={4} gap={4} />
        </>
      )}
      {kind === "full" && (
        <>
          {["MY COURSES", "FIND", "PROGRESS"].map((l, i) => (
            <g key={l}>
              <Chip x={49} y={21 + i * 9} w={22} h={7} c="#B5D4F4" />
              <Txt x={60} y={26.5 + i * 9} size={3.4} anchor="middle">{l}</Txt>
            </g>
          ))}
          <Txt x={49} y={16} size={3.4} c="#556274">HOME › MY COURSES › NEGOTIATION</Txt>
          <Chip x={76} y={22} w={36} h={14} c="#FFE48A" />
          <Txt x={94} y={28} size={3.6} anchor="middle">RESUME YOUR LESSON</Txt>
          <Txt x={94} y={33} size={3.6} anchor="middle">UNIT 3 OF 8</Txt>
        </>
      )}
      {kind === "tasks" && (
        <>
          <Chip x={50} y={14} w={60} h={13} c="#FFE48A" />
          <Txt x={80} y={22} size={5.5} anchor="middle">CONTINUE</Txt>
          {["MY COURSES", "FIND", "PROGRESS"].map((l, i) => (
            <g key={l}>
              <Chip x={50 + i * 21} y={32} w={19} h={7} c="#B5D4F4" />
              <Txt x={59.5 + i * 21} y={37.5} size={3} anchor="middle">{l}</Txt>
            </g>
          ))}
        </>
      )}
      {kind === "feature" && (
        <>
          {soft.slice(0, 6).map((c, i) => (
            <Chip key={i} x={49 + (i % 2) * 14} y={14 + Math.floor(i / 2) * 7} w={12} h={5} c={c} />
          ))}
          <Chip x={79} y={14} w={32} h={10} c="#D9534F" />
          <Txt x={95} y={21} size={4} anchor="middle" c="#FFFFFF">NEW</Txt>
          <Lines x={79} y={30} w={32} n={4} gap={4} />
        </>
      )}
    </Mon>
  );
}

/** Three Kano curves (card A2): how satisfaction changes with how well something is done. */
function Kano() {
  const g = (x: number, label: string, pts: [number, number][], c: string, note: string) => (
    <g>
      <rect x={x} y={14} width={1} height={30} fill={K} />
      <rect x={x} y={29} width={28} height={1} fill="#D4D8E0" />
      <rect x={x} y={44} width={28} height={1} fill={K} />
      {pts.map(([px, py], i) => (
        <rect key={i} x={x + 1 + px} y={14 + py} width={2} height={2} fill={c} />
      ))}
      <Txt x={x + 14} y={51} size={4} anchor="middle">{label}</Txt>
      <Txt x={x + 14} y={57} size={3} anchor="middle" c="#556274">{note}</Txt>
    </g>
  );
  const line = (f: (t: number) => number) => Array.from({ length: 14 }, (_, i) => [i * 2, f(i / 13)] as [number, number]);
  return (
    <Board x={22} y={6} w={116} h={56}>
      <Txt x={26} y={13} size={4} c="#556274">SATISFACTION ↑ · HOW WELL IT IS DONE →</Txt>
      {g(30, "BASIC", line((t) => 26 - 12 * Math.pow(t, 0.5)), "#D9534F", "MISSING HURTS")}
      {g(62, "SPEED", line((t) => 28 - 24 * t), "#3D7BD9", "IN PROPORTION")}
      {g(94, "SURPRISE", line((t) => 15 - 12 * Math.pow(t, 3)), "#2E9E6B", "NOT MISSED")}
    </Board>
  );
}

/** A mini scene of a context of use (card A2). */
function Scene({ kind }: { kind: "phone" | "desk" | "weekend" | "mandatory" }) {
  return (
    <Board x={36} y={8} w={88} h={50}>
      {kind === "phone" && (
        <>
          <rect x={44} y={14} width={14} height={30} fill={K} />
          <rect x={45} y={15} width={12} height={28} fill="#E4F0FB" />
          <Chip x={47} y={20} w={8} h={4} c="#FFE48A" />
          <Chip x={47} y={27} w={8} h={4} c="#B5D4F4" />
          <Bar x={47} y={38} w={8} p={0.4} c="#2E9E6B" />
          <Txt x={66} y={22} size={4.4}>ONE HAND</Txt>
          <Txt x={66} y={30} size={4.4}>SHORT TIME</Txt>
          <Txt x={66} y={38} size={4.4}>POOR SIGNAL</Txt>
        </>
      )}
      {kind === "desk" && (
        <>
          <Icon x={46} y={18} name="clock" />
          <Txt x={60} y={25} size={5}>10 MINUTES</Txt>
          <Chip x={46} y={34} w={50} h={9} c="#FFE48A" />
          <Txt x={71} y={40.5} size={4.4} anchor="middle">RESUME HERE</Txt>
        </>
      )}
      {kind === "weekend" && (
        <>
          <Bar x={46} y={20} w={72} p={0.5} c="#2E9E6B" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Chip key={i} x={46 + i * 12} y={28} w={10} h={6} c={i === 2 ? "#FFE48A" : "#B5D4F4"} />
          ))}
          <Txt x={46} y={44} size={4.4}>HOURS AT A STRETCH</Txt>
        </>
      )}
      {kind === "mandatory" && (
        <>
          <rect x={46} y={16} width={30} height={26} fill={K} />
          <rect x={47} y={17} width={28} height={24} fill="#FFFFFF" />
          <rect x={47} y={17} width={28} height={6} fill="#D9534F" />
          <Txt x={61} y={37} size={9} anchor="middle">!</Txt>
          <Txt x={84} y={26} size={4.4}>DEADLINE</Txt>
          <Txt x={84} y={34} size={4.4}>NO CHOICE</Txt>
        </>
      )}
    </Board>
  );
}

/** Five methods by what people say or do and how many (card A4). */
function Methods({ hi }: { hi?: string[] }) {
  const dots: [string, number, number][] = [["A", 0.12, 0.12], ["B", 0.22, 0.88], ["C", 0.84, 0.14], ["D", 0.9, 0.9], ["E", 0.72, 0.34]];
  const px = (x: number) => 46 + x * 70;
  const py = (y: number) => 52 - y * 36;
  const names: Record<string, string> = { A: "INTERVIEWS", B: "SURVEY", C: "USABILITY TEST", D: "ANALYTICS", E: "OBSERVATION" };
  return (
    <Board x={30} y={6} w={100} h={54}>
      <rect x={44} y={12} width={1} height={40} fill={K} />
      <rect x={44} y={52} width={80} height={1} fill={K} />
      <rect x={44} y={32} width={80} height={1} fill="#D4D8E0" />
      <rect x={84} y={12} width={1} height={40} fill="#D4D8E0" />
      <Txt x={84} y={58} size={3.8} anchor="middle" c="#556274">WHAT PEOPLE SAY → WHAT THEY DO</Txt>
      {hi && <Txt x={47} y={11} size={4} c="#B5700B">{hi.map((n) => `${n} · ${names[n]}`).join("  ")}</Txt>}
      <Txt x={46} y={20} size={3.4} c="#556274">MANY</Txt>
      <Txt x={46} y={50} size={3.4} c="#556274">FEW</Txt>
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

/** A filled disc built from pixel rows. */
function Disc({ cx, cy, r, c }: { cx: number; cy: number; r: number; c: string }) {
  const rows = [];
  for (let dy = -r; dy <= r; dy++) {
    const w = Math.round(Math.sqrt(r * r - dy * dy));
    rows.push(<rect key={dy} x={cx - w} y={cy + dy} width={w * 2 + 1} height={1} fill={c} />);
  }
  return <g>{rows}</g>;
}
function Ring({ cx, cy, r, c }: { cx: number; cy: number; r: number; c: string }) {
  const out = [];
  for (let a = 0; a < 360; a += 4) {
    const x = Math.round(cx + r * Math.cos((a * Math.PI) / 180));
    const y = Math.round(cy + r * Math.sin((a * Math.PI) / 180));
    out.push(<rect key={a} x={x} y={y} width={1.4} height={1.4} fill={c} />);
  }
  return <g>{out}</g>;
}
/** Three goals as circles (card B2): learners, business, technology; the star marks where a decision lands. */
function Goals({ at }: { at: "business" | "learnbiz" | "all" }) {
  const pos = { business: [101, 22], learnbiz: [80, 24], all: [80, 34] }[at];
  return (
    <Board x={36} y={4} w={92} h={58}>
      <Ring cx={70} cy={27} r={15} c="#3D7BD9" />
      <Ring cx={90} cy={27} r={15} c="#F59E0B" />
      <Ring cx={80} cy={44} r={15} c="#2E9E6B" />
      <Txt x={42} y={11} size={3.6} c="#3D7BD9">LEARNERS</Txt>
      <Txt x={122} y={11} size={3.6} anchor="end" c="#B5700B">BUSINESS</Txt>
      <Txt x={98} y={52} size={3.6} c="#0B6F69">TECHNOLOGY</Txt>
      <Disc cx={pos[0]} cy={pos[1]} r={3} c="#F2A900" />
      <rect x={pos[0] - 1} y={pos[1] - 1} width={3} height={3} fill={K} />
    </Board>
  );
}

export const ART_D5: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Stage label={tt("A menu named after the software: Mia cannot tell which entry carries on her course", "Ein Menü nach der Software benannt: Mia erkennt nicht, welcher Eintrag ihren Kurs fortsetzt")}>
      <Table x={44} y={56} w={72} />
      <Menu kind="feature" />
      <Person x={8} y={40} who="mia" face="worried" />
      <Mark x={13} y={34} kind="ask" />
    </Stage>
  ),
  "a1-2": (
    <Stage label={tt("The menu rebuilt around tasks: a large Continue card, and Mia starts in one click", "Das Menü um Aufgaben herum neu gebaut: eine große Karte „Weiter“, und Mia startet mit einem Klick")}>
      <Table x={44} y={56} w={72} />
      <Menu kind="tasks" />
      <Person x={8} y={40} who="mia" face="happy" pose="point" />
    </Stage>
  ),
  "a1-3": (
    <Stage label={tt("Same functions, different starting point: what the software can do, or what learners need to do", "Dieselben Funktionen, ein anderer Ausgangspunkt: was die Software kann, oder was Lernende tun müssen")}>
      <Board x={14} y={10} w={60} h={44}>
        <Txt x={18} y={18} size={4} c="#556274">FEATURE-DRIVEN</Txt>
        <Icon x={20} y={24} name="gear" />
        <Txt x={33} y={31} size={4.2}>SOFTWARE</Txt>
        <Icon x={20} y={38} name="book" />
        <Txt x={33} y={45} size={4.2}>DEPARTMENTS</Txt>
      </Board>
      <Board x={86} y={10} w={60} h={44}>
        <Txt x={90} y={18} size={4} c="#0B6F69">USER-CENTRED</Txt>
        <Icon x={92} y={24} name="eye" />
        <Txt x={105} y={31} size={4.2}>WHAT LEARNERS</Txt>
        <Txt x={105} y={37} size={4.2}>NEED TO DO</Txt>
      </Board>
      <Arrow x={77} y={30} />
    </Stage>
  ),
  "a1-4": (
    <Stage label={tt("Look at any platform through the learner's eyes", "Jede Plattform mit den Augen der Lernenden ansehen")}>
      <Board x={38} y={10} w={84} h={40}>
        <Icon x={46} y={16} name="eye" />
        <Txt x={60} y={23} size={4.6}>WHAT IS THE</Txt>
        <Txt x={60} y={29} size={4.6}>LEARNER TRYING</Txt>
        <Txt x={60} y={35} size={4.6}>TO DO?</Txt>
      </Board>
      <Person x={6} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Stage label={tt("The Kano model: three kinds of quality", "Das Kano-Modell: drei Arten von Qualität")}>
      <Kano />
      <Person x={2} y={40} who="priya" face="neutral" pose="point" />
    </Stage>
  ),
  "a2-2": (
    <Stage label={tt("On a phone, on a train: one hand, a short time, a poor connection", "Auf dem Handy, im Zug: eine Hand, wenig Zeit, schlechte Verbindung")}>
      <Person x={8} y={40} who="mia" face="neutral" />
      <Scene kind="phone" />
    </Stage>
  ),
  "a2-3": (
    <Stage label={tt("At a desk between two meetings: ten minutes and a clear way to resume", "Am Schreibtisch zwischen zwei Terminen: zehn Minuten und ein klarer Weg zum Weitermachen")}>
      <Person x={8} y={40} who="mia" face="think" />
      <Scene kind="desk" />
    </Stage>
  ),
  "a2-4": (
    <Stage label={tt("An intensive weekend, or a mandatory course with a deadline", "Ein intensives Wochenende oder ein Pflichtkurs mit Frist")}>
      <Board x={6} y={10} w={72} h={44}>
        <Bar x={12} y={20} w={60} p={0.5} c="#2E9E6B" />
        {[0, 1, 2, 3, 4].map((i) => (
          <Chip key={i} x={12 + i * 12} y={27} w={10} h={6} c={i === 2 ? "#FFE48A" : "#B5D4F4"} />
        ))}
        <Txt x={12} y={44} size={4}>HOURS AT A STRETCH</Txt>
      </Board>
      <Board x={84} y={10} w={72} h={44}>
        <rect x={92} y={16} width={22} height={22} fill={K} />
        <rect x={93} y={17} width={20} height={20} fill="#FFFFFF" />
        <rect x={93} y={17} width={20} height={5} fill="#D9534F" />
        <Txt x={103} y={33} size={8} anchor="middle">!</Txt>
        <Txt x={118} y={26} size={3.8}>DEADLINE</Txt>
        <Txt x={92} y={46} size={4}>LITTLE CHOICE</Txt>
      </Board>
    </Stage>
  ),
  "a2-5": (
    <Stage label={tt("Put yourself in the learner's place: who, what they want, in which situation", "Sich in die Lernende hineinversetzen: wer, was sie will, in welcher Situation")}>
      <Board x={32} y={10} w={96} h={40}>
        {[["eye", 44, "WHO"], ["heart", 74, "WANTS"], ["clock", 104, "WHEN, WHERE"]].map(([n, x, l]) => (
          <g key={l as string}>
            <Icon x={(x as number) - 4} y={16} name={n as string} />
            <Txt x={x as number} y={36} size={4} anchor="middle">{l as string}</Txt>
          </g>
        ))}
      </Board>
      <Person x={2} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Stage label={tt("Three mistakes at once: names from the software, ten entries, a page that says only Library", "Drei Fehler auf einmal: Namen aus der Software, zehn Einträge, eine Seite, die nur „Library“ sagt")}>
      <Table x={44} y={56} w={72} />
      <Menu kind="soft" />
      <Person x={8} y={40} who="mia" face="sad" />
      <Mark x={13} y={34} kind="sweat" />
    </Stage>
  ),
  "a3-2": (
    <Stage label={tt("Repair 1: entries named in the learner's words", "Reparatur 1: Einträge in den Worten der Lernenden")}>
      <Table x={44} y={56} w={72} />
      <Menu kind="names" />
      <Person x={8} y={40} who="mia" face="think" />
    </Stage>
  ),
  "a3-3": (
    <Stage label={tt("Repair 2: only the three tasks learners really use stay on the screen", "Reparatur 2: Nur die drei Aufgaben, die Lernende wirklich nutzen, bleiben auf dem Bildschirm")}>
      <Table x={44} y={56} w={72} />
      <Menu kind="three" />
      <Person x={8} y={40} who="mia" face="neutral" />
    </Stage>
  ),
  "a3-4": (
    <Stage label={tt("Repair 3: a path and a resume card show where Mia is and what comes next", "Reparatur 3: Ein Pfad und eine Fortsetzen-Karte zeigen, wo Mia ist und was als Nächstes kommt")}>
      <Table x={44} y={56} w={72} />
      <Menu kind="full" />
      <Person x={8} y={40} who="mia" face="happy" />
    </Stage>
  ),
  "a3-5": (
    <Stage label={tt("Three areas to sort what is wrong: wording, choices, orientation", "Drei Bereiche, um zu sortieren, was falsch ist: Wortwahl, Auswahl, Orientierung")}>
      <Board x={30} y={10} w={100} h={42}>
        {[["book", 44, "WORDS"], ["warn", 80, "TOO MANY"], ["eye", 116, "WHERE AM I"]].map(([n, x, l]) => (
          <g key={l as string}>
            <Icon x={(x as number) - 4} y={16} name={n as string} />
            <Txt x={x as number} y={36} size={4} anchor="middle">{l as string}</Txt>
          </g>
        ))}
      </Board>
      <Person x={2} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Stage label={tt("Interviews with six learners: reasons, in their own words, from a few", "Interviews mit sechs Lernenden: Gründe, in ihren Worten, von wenigen")}>
      <Methods hi={["A"]} />
      {[0, 1, 2].map((i) => (
        <Kid key={i} x={4 + i * 8} y={44} c={KID_COLOURS[i]} />
      ))}
      <Person x={138} y={40} who="dana" face="think" flip />
    </Stage>
  ),
  "a4-2": (
    <Stage label={tt("Usage analytics: exact counts for thousands of learners, but no reasons", "Nutzungs-Analytics: genaue Zahlen für Tausende Lernende, aber keine Gründe")}>
      <Methods hi={["D"]} />
      <Person x={4} y={40} who="dana" face="neutral" />
    </Stage>
  ),
  "a4-3": (
    <Stage label={tt("A usability test sits in between: what a few people do, with a chance to ask why", "Ein Usability-Test liegt dazwischen: was wenige Menschen tun, mit der Chance zu fragen, warum")}>
      <Methods hi={["C"]} />
      <Person x={4} y={40} who="dana" face="happy" />
    </Stage>
  ),
  "a4-4": (
    <Stage label={tt("Choose a method by the gap you have to close", "Eine Methode nach der Lücke wählen, die Sie schließen müssen")}>
      <Board x={30} y={10} w={100} h={42}>
        <Icon x={38} y={16} name="ask" />
        <Txt x={52} y={23} size={4.4}>REASONS → FEW PEOPLE</Txt>
        <Icon x={38} y={32} name="chart" />
        <Txt x={52} y={39} size={4.4}>COUNTS → MANY PEOPLE</Txt>
      </Board>
      <Person x={2} y={40} who="dana" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Stage label={tt("Learners find their course with difficulty: three ideas", "Lernende finden ihren Kurs nur mit Mühe: drei Ideen")}>
      <Board x={38} y={8} w={84} h={42}>
        {[["ask", 48, "CHAT"], ["gear", 72, "MENU"], ["book", 96, "COURSES"]].map(([n, x, l]) => (
          <g key={l as string}>
            <Icon x={(x as number) - 4} y={14} name={n as string} />
            <Txt x={x as number} y={34} size={3.8} anchor="middle">{l as string}</Txt>
          </g>
        ))}
        <Txt x={80} y={46} size={4.2} anchor="middle" c="#556274">3 IDEAS</Txt>
      </Board>
      <Person x={6} y={40} who="priya" face="think" />
      <Person x={132} y={40} who="dana" face="neutral" flip />
    </Stage>
  ),
  "a5-2": (
    <Stage label={tt("Idea 1: a chat window, 24,000", "Idee 1: ein Chat-Fenster, 24.000")}>
      <Board x={34} y={4} w={92} h={56}>
        <Txt x={40} y={12} size={4.4}>1 · CHAT WINDOW · 24,000</Txt>
        <Chip x={44} y={17} w={26} h={7} c="#B5D4F4" />
        <Chip x={56} y={26} w={26} h={7} c="#FFE48A" />
        {rate([["VALUE", 2, "MID"], ["EFFORT", 3, "HIGH"], ["RISK", 2, "MID"]], 40, 38)}
      </Board>
      <Person x={6} y={40} who="priya" face="neutral" />
      <Person x={130} y={40} who="dana" face="think" flip />
    </Stage>
  ),
  "a5-3": (
    <Stage label={tt("Idea 3: ten new courses, 32,000", "Idee 3: zehn neue Kurse, 32.000")}>
      <Board x={34} y={4} w={92} h={56}>
        <Txt x={40} y={12} size={4.4}>3 · TEN COURSES · 32,000</Txt>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <Chip key={i} x={47 + i * 7} y={17} w={5} h={8} c={KID_COLOURS[i % 6]} />
        ))}
        {rate([["VALUE", 1, "LOW"], ["EFFORT", 3, "HIGH"], ["RISK", 3, "HIGH"]], 40, 38)}
      </Board>
      <Person x={6} y={40} who="priya" face="worried" />
      <Person x={130} y={40} who="dana" face="surprised" flip />
    </Stage>
  ),
  "a5-4": (
    <Stage label={tt("Idea 2: a menu rebuilt around tasks, 12,000", "Idee 2: ein um Aufgaben herum gebautes Menü, 12.000")}>
      <Board x={34} y={4} w={92} h={56}>
        <Txt x={40} y={12} size={4.4}>2 · TASK MENU · 12,000</Txt>
        <Chip x={44} y={17} w={44} h={7} c="#FFE48A" />
        {rate([["VALUE", 3, "HIGH"], ["EFFORT", 2, "MID"], ["RISK", 1, "LOW"]], 40, 38)}
      </Board>
      <Person x={6} y={40} who="priya" face="happy" />
      <Person x={130} y={40} who="dana" face="happy" flip />
    </Stage>
  ),
  "a5-5": (
    <Stage label={tt("The menu comes first, and one sentence says what the business gets", "Das Menü kommt zuerst, und ein Satz sagt, was das Unternehmen davon hat")}>
      <Board x={38} y={8} w={84} h={44}>
        <Icon x={46} y={14} name="gear" />
        <Icon x={60} y={14} name="check" />
        <Txt x={74} y={21} size={4.4}>FIRST</Txt>
        <Coins x={46} y={32} n={3} w={14} />
        <Txt x={70} y={38} size={4.2}>FEWER FIRST-WEEK</Txt>
        <Txt x={70} y={44} size={4.2}>DROP-OUTS</Txt>
      </Board>
      <Person x={6} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Stage label={tt("A need on its own: “learners want to know what to do next”. The finance director refuses", "Ein Bedürfnis allein: „Lernende wollen wissen, was sie als Nächstes tun“. Die Finanzchefin lehnt ab")}>
      <Person x={8} y={40} who="priya" face="neutral" pose="up" />
      <Person x={138} y={40} who="fin" face="neutral" flip />
      <Board x={38} y={10} w={84} h={36}>
        <Icon x={46} y={16} name="heart" />
        <Txt x={60} y={23} size={4.4}>WHAT TO DO NEXT?</Txt>
        <Icon x={46} y={30} name="ask" />
        <Txt x={60} y={37} size={4.4}>NO NUMBER</Txt>
      </Board>
      <Cross x={126} y={20} />
    </Stage>
  ),
  "b1-2": (
    <Stage label={tt("The same need in three parts: who it is, what they want, what the company gets", "Dasselbe Bedürfnis in drei Teilen: wer es ist, was sie wollen, was das Unternehmen davon hat")}>
      <Person x={8} y={40} who="priya" face="happy" pose="up" />
      <Board x={32} y={10} w={96} h={42}>
        {[["eye", 42, "WHO"], ["pencil", 72, "WANTS"], ["chart", 102, "COMPANY GETS"]].map(([n, x, l]) => (
          <g key={l as string}>
            <Icon x={(x as number) - 4} y={16} name={n as string} />
            <Txt x={x as number} y={36} size={3.8} anchor="middle">{l as string}</Txt>
          </g>
        ))}
        <Arrow x={54} y={20} />
        <Arrow x={84} y={20} />
      </Board>
    </Stage>
  ),
  "b1-3": (
    <Stage label={tt("The finance director hears a figure she already tracks: the seven-day return rate", "Die Finanzchefin hört eine Zahl, die sie schon verfolgt: die Rückkehrrate nach sieben Tagen")}>
      <Person x={8} y={40} who="priya" face="happy" />
      <Person x={138} y={40} who="fin" face="happy" flip />
      <Board x={38} y={10} w={84} h={40}>
        <Chip x={44} y={16} w={30} h={9} c="#FFE48A" />
        <Txt x={59} y={22.5} size={3.8} anchor="middle">CONTINUE</Txt>
        <Arrow x={78} y={19} />
        <Icon x={92} y={16} name="up" />
        <Txt x={44} y={38} size={4.2}>RETURN IN 7 DAYS</Txt>
      </Board>
      <Tick x={126} y={20} />
    </Stage>
  ),
  "b1-4": (
    <Stage label={tt("UX is the bridge between what the learner needs and what the company earns from", "UX ist die Brücke zwischen dem, was die Lernende braucht, und dem, womit das Unternehmen verdient")}>
      <Board x={26} y={10} w={108} h={40}>
        <Icon x={34} y={16} name="eye" />
        <Txt x={34} y={36} size={3.8}>LEARNER NEEDS</Txt>
        <Arrow x={62} y={20} />
        <Icon x={74} y={16} name="gear" />
        <Txt x={74} y={36} size={3.8}>UX</Txt>
        <Arrow x={90} y={20} />
        <Icon x={104} y={16} name="chart" />
        <Txt x={96} y={36} size={3.8}>COMPANY EARNS</Txt>
      </Board>
      <Person x={2} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Stage label={tt("A new feature serves the business, and the engineers and learners pay", "Ein neues Feature dient dem Unternehmen, und Ingenieure und Lernende zahlen")}>
      <Goals at="business" />
      <Person x={4} y={40} who="priya" face="worried" />
    </Stage>
  ),
  "b2-2": (
    <Stage label={tt("Simplifying the menu: learners and business agree, and the work is small", "Das Menü vereinfachen: Lernende und Unternehmen sind sich einig, und der Aufwand ist klein")}>
      <Goals at="learnbiz" />
      <Person x={4} y={40} who="priya" face="neutral" />
    </Stage>
  ),
  "b2-3": (
    <Stage label={tt("A Continue card on the home screen: all three agree", "Eine Karte „Weiter“ auf dem Startbildschirm: Alle drei sind sich einig")}>
      <Goals at="all" />
      <Person x={4} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),
  "b2-4": (
    <Stage label={tt("For every conflict ask: who gets, who pays, is there an overlap?", "Bei jedem Konflikt fragen: wer bekommt, wer zahlt, gibt es eine Überschneidung?")}>
      <Board x={32} y={10} w={96} h={42}>
        {[["up", 44, "WHO GETS"], ["down", 76, "WHO PAYS"], ["ask", 108, "OVERLAP?"]].map(([n, x, l]) => (
          <g key={l as string}>
            <Icon x={(x as number) - 4} y={16} name={n as string} />
            <Txt x={x as number} y={36} size={4} anchor="middle">{l as string}</Txt>
          </g>
        ))}
      </Board>
      <Person x={2} y={40} who="dana" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Stage label={tt("A request for Live Polls with no problem, no metric and no owner stops at the gate", "Eine Anfrage nach Live Polls ohne Problem, Kennzahl und Verantwortliche stoppt am Tor")}>
      <Person x={6} y={40} who="dana" face="worried" />
      <Board x={38} y={8} w={84} h={46}>
        <Chip x={42} y={14} w={30} h={8} c="#FFE48A" />
        <Txt x={57} y={20} size={3.8} anchor="middle">LIVE POLLS</Txt>
        <rect x={84} y={12} width={3} height={36} fill={K} />
        {[["PROBLEM", 20], ["METRIC", 30], ["OWNER", 40]].map(([l, y]) => (
          <g key={l as string}>
            <Cross x={92} y={(y as number) - 5} />
            <Txt x={104} y={y as number} size={3.8}>{l as string}</Txt>
          </g>
        ))}
      </Board>
    </Stage>
  ),
  "b3-2": (
    <Stage label={tt("With a problem, a metric and an owner the gate opens, and the request is ranked", "Mit Problem, Kennzahl und Verantwortlicher öffnet sich das Tor, und die Anfrage wird eingereiht")}>
      <Person x={6} y={40} who="dana" face="happy" />
      <Board x={38} y={8} w={84} h={46}>
        <Chip x={42} y={14} w={30} h={8} c="#FFE48A" />
        <Txt x={57} y={20} size={3.8} anchor="middle">LIVE POLLS</Txt>
        <Arrow x={74} y={16} />
        {[["PROBLEM", 20], ["METRIC", 30], ["OWNER", 40]].map(([l, y]) => (
          <g key={l as string}>
            <Tick x={92} y={(y as number) - 5} />
            <Txt x={104} y={y as number} size={3.8}>{l as string}</Txt>
          </g>
        ))}
      </Board>
    </Stage>
  ),
  "b3-3": (
    <Stage label={tt("Decide, name the unknown, set a reversal condition, name what you give up", "Entscheiden, das Unbekannte benennen, eine Rückgängig-Bedingung setzen, den Verzicht benennen")}>
      <Board x={20} y={8} w={120} h={50}>
        {[["check", 30, "DECIDE"], ["ask", 56, "UNKNOWN"], ["clock", 82, "REVERSE IF"], ["down", 108, "GIVE UP"]].map(([n, x, l]) => (
          <g key={l as string}>
            <Icon x={(x as number) - 4} y={14} name={n as string} />
            <Txt x={x as number} y={32} size={3.6} anchor="middle">{l as string}</Txt>
            <Lines x={(x as number) - 8} y={38} w={16} n={3} gap={4} />
          </g>
        ))}
      </Board>
      <Person x={2} y={40} who="priya" face="happy" />
    </Stage>
  ),
  "b3-4": (
    <Stage label={tt("A rule for every future feature: who decides and on what evidence", "Eine Regel für jedes künftige Feature: wer entscheidet und auf welcher Grundlage")}>
      <Board x={26} y={8} w={108} h={50}>
        <Txt x={32} y={17} size={4.6} c="#556274">WHO DECIDES</Txt>
        <Icon x={34} y={20} name="eye" />
        <Txt x={48} y={27} size={4.4}>HEAD OF PRODUCT + UX LEAD</Txt>
        <Txt x={32} y={40} size={4.6} c="#556274">ON WHAT EVIDENCE</Txt>
        <Icon x={34} y={43} name="chart" />
        <Txt x={48} y={50} size={4.4}>PROBLEM · METRIC · OWNER · TEST</Txt>
      </Board>
      <Person x={2} y={40} who="dana" face="happy" />
    </Stage>
  ),
};
// keep imports used even when a scene set changes
void Bits;
