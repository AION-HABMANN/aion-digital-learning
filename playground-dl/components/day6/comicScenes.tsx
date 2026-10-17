import type { ReactNode } from "react";
import { Arrow, Bar, Board, Calendar, Chip, Coins, Cross, Icon, K, Kid, KID_COLOURS, LOOK, Lines, Mark, Mon, Person, Stage, Table, Tick, Txt } from "@/components/comic/PixelKit";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 6 comics (data/day6/comics.ts, DL-STANDARD.md section 13). People: Mia (a sales assistant who takes a course), Sven (a teacher),
 * Petra (a training manager), Priya (LearnLoop's UX lead) and Dana (head of product), all made up. Every figure is one of the card's own.
 */
LOOK.mia = { hair: "#5A3A22", shirt: "#3D7BD9", long: true };
LOOK.sven = { hair: "#C9A55A", shirt: "#8A5A2E", skin: "#E8B88F" };
LOOK.petra = { hair: "#1B1B22", shirt: "#B5372E", long: true, glasses: true };
LOOK.priya = { hair: "#1B1B22", shirt: "#2B8A6E", long: true, skin: "#C8946A" };
LOOK.dana = { hair: "#5A3A22", shirt: "#8A63D2", long: true };

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

/** A head-and-shoulders portrait, 12 by 12. */
function Face({ x, y, hair, shirt, skin = "#F1C9A0" }: { x: number; y: number; hair: string; shirt: string; skin?: string }) {
  return (
    <g>
      <rect x={x - 1} y={y - 1} width={14} height={14} fill={K} />
      <rect x={x} y={y} width={12} height={12} fill="#E4F0FB" />
      <rect x={x + 1} y={y + 8} width={10} height={4} fill={shirt} />
      <rect x={x + 3} y={y + 2} width={6} height={6} fill={skin} />
      <rect x={x + 3} y={y + 1} width={6} height={2} fill={hair} />
      <rect x={x + 4} y={y + 5} width={1} height={1} fill={K} />
      <rect x={x + 7} y={y + 5} width={1} height={1} fill={K} />
    </g>
  );
}

/** A persona card. `weak` says nothing a team could act on; `data` is built from interviews and logs. */
function PersonaCard({ x, y, name, kind, hair, shirt, w = 56 }: { x: number; y: number; name: string; kind: "weak" | "mia" | "sven"; hair: string; shirt: string; w?: number }) {
  const rows: Record<string, [string, string][]> = {
    weak: [["GOAL", "A GREAT EXPERIENCE"], ["PROBLEM", "HATES BAD DESIGN"]],
    mia: [["GOAL", "TEAM-LEAD ROLE"], ["PROBLEM", "LOSES THE THREAD"], ["CONTEXT", "20 MIN · PHONE"]],
    sven: [["GOAL", "BUILD A COURSE"], ["PROBLEM", "TOO MANY TABS"]],
  };
  return (
    <g>
      <rect x={x - 1} y={y - 1} width={w + 2} height={rows[kind].length * 8 + 22} fill={K} />
      <rect x={x} y={y} width={w} height={rows[kind].length * 8 + 20} fill="#FFFFFF" />
      <Face x={x + 3} y={y + 3} hair={hair} shirt={shirt} />
      <Txt x={x + 19} y={y + 11} size={4.6}>{name}</Txt>
      {rows[kind].map(([k, v], i) => (
        <g key={k}>
          <Txt x={x + 3} y={y + 23 + i * 8} size={3} c="#556274">{k}</Txt>
          <Txt x={x + 3} y={y + 27 + i * 8} size={3}>{v}</Txt>
        </g>
      ))}
    </g>
  );
}

/** Mia's journey (card A3): emotion from 1 to 5 in three phases; `upTo` is how many phases are drawn. */
function Journey({ upTo }: { upTo: 1 | 2 | 3 }) {
  const em = [4, 3, 1];
  const names = ["ENTRY", "LEARNING", "PROGRESS"];
  const px = (i: number) => 58 + i * 32;
  const py = (v: number) => 48 - (v - 1) * 8;
  const pts = em.slice(0, upTo).map((v, i) => [px(i), py(v), v] as [number, number, number]);
  const seg: ReactNode[] = [];
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    for (let s = 0; s <= 16; s++) {
      seg.push(<rect key={`${i}-${s}`} x={x0 + ((x1 - x0) * s) / 16} y={y0 + ((y1 - y0) * s) / 16 + 3} width={2} height={2} fill="#3D7BD9" />);
    }
  }
  return (
    <Board x={34} y={4} w={104} h={58}>
      <Txt x={38} y={12} size={3.6} c="#556274">EMOTION 5 HIGH · 1 LOW</Txt>
      <rect x={42} y={16} width={1} height={36} fill={K} />
      <rect x={42} y={52} width={92} height={1} fill={K} />
      {names.map((n, i) => (
        <g key={n}>
          <rect x={px(i) - 14} y={16} width={1} height={36} fill="#E0E4EB" />
          <Txt x={px(i) + 3} y={58} size={3.8} anchor="middle">{n}</Txt>
        </g>
      ))}
      {seg}
      {pts.map(([x, y, v], i) => (
        <g key={i}>
          <rect x={x - 1} y={y - 1} width={9} height={9} fill={K} />
          <rect x={x} y={y} width={7} height={7} fill={v === 1 ? "#D9534F" : "#3D7BD9"} />
          <Txt x={x + 3.5} y={y + 5.5} size={5} c="#FFFFFF" anchor="middle">{v}</Txt>
        </g>
      ))}
    </Board>
  );
}

/** The segments of card B1: how large across, what it is worth to the business up. */
function Segments({ hi }: { hi?: string[] }) {
  const dots: [string, number, number][] = [["A", 0.82, 0.5], ["B", 0.34, 0.36], ["C", 0.16, 0.8], ["D", 0.08, 0.94], ["E", 0.58, 0.1]];
  const names: Record<string, string> = { A: "TIME-POOR LEARNERS", B: "EXAM PREPARERS", C: "TEACHERS", D: "TRAINING MANAGERS", E: "CASUAL BROWSERS" };
  const px = (x: number) => 50 + x * 72;
  const py = (y: number) => 53 - y * 38;
  return (
    <Board x={28} y={4} w={104} h={58}>
      <rect x={44} y={12} width={1} height={43} fill={K} />
      <rect x={44} y={55} width={84} height={1} fill={K} />
      <Txt x={86} y={60} size={3.8} anchor="middle" c="#556274">HOW LARGE →</Txt>
      <Txt x={30} y={30} size={3.2} c="#556274">VALUE</Txt>
      <Txt x={34} y={36} size={4} c="#556274">↑</Txt>
      {hi && <Txt x={47} y={10} size={3.8} c="#B5700B">{hi.map((n) => `${n} · ${names[n]}`).join("   ")}</Txt>}
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

export const ART_D6: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Stage label={tt("A team argues about “the user”: Sandra's card says nothing a team could act on", "Ein Team streitet über „die Nutzerin“: Sandras Karte sagt nichts, wonach ein Team handeln könnte")}>
      <Person x={6} y={40} who="priya" face="worried" />
      <Person x={138} y={40} who="dana" face="worried" flip />
      <PersonaCard x={52} y={10} name="SANDRA" kind="weak" hair="#6B3A2A" shirt="#C0455A" w={56} />
      <Icon x={112} y={14} name="ask" />
    </Stage>
  ),
  "a1-2": (
    <Stage label={tt("A persona from two interviews and a log analysis: Mia, 29, a sales assistant", "Eine Persona aus zwei Interviews und einer Log-Analyse: Mia, 29, Vertriebsassistentin")}>
      <Person x={6} y={40} who="priya" face="happy" />
      <Person x={138} y={40} who="dana" face="happy" flip />
      <PersonaCard x={52} y={6} name="MIA · 29" kind="mia" hair="#5A3A22" shirt="#3D7BD9" w={56} />
      <Icon x={112} y={14} name="check" />
    </Stage>
  ),
  "a1-3": (
    <Stage label={tt("Would a resume button help Mia? The room can answer", "Würde ein Fortsetzen-Button Mia helfen? Der Raum kann antworten")}>
      <Person x={6} y={40} who="priya" face="think" pose="point" />
      <PersonaCard x={50} y={6} name="MIA" kind="mia" hair="#5A3A22" shirt="#3D7BD9" w={50} />
      <Arrow x={104} y={26} />
      <Mon x={114} y={14} w={34} h={28}>
        <Chip x={118} y={22} w={26} h={8} c="#FFE48A" />
        <Txt x={131} y={28} size={3.6} anchor="middle">RESUME</Txt>
      </Mon>
    </Stage>
  ),
  "a1-4": (
    <Stage label={tt("The test: which decision would change because of this persona?", "Der Test: Welche Entscheidung würde sich wegen dieser Persona ändern?")}>
      <Board x={36} y={8} w={88} h={44}>
        <Txt x={42} y={18} size={4.6}>SANDRA</Txt>
        <Cross x={80} y={13} />
        <Txt x={92} y={18} size={4}>CHANGES 0</Txt>
        <Txt x={42} y={34} size={4.6}>MIA</Txt>
        <Tick x={80} y={29} />
        <Txt x={92} y={34} size={4}>CHANGES MANY</Txt>
        <Txt x={42} y={46} size={4} c="#556274">GOALS · PROBLEMS · CONTEXT</Txt>
      </Board>
      <Person x={4} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Stage label={tt("Three persona cards on the wall: all want a better experience, none cites a source", "Drei Personakarten an der Wand: Alle wollen ein besseres Erlebnis, keine nennt eine Quelle")}>
      <PersonaCard x={8} y={14} name="SANDRA" kind="weak" hair="#6B3A2A" shirt="#C0455A" w={46} />
      <PersonaCard x={57} y={14} name="TOM" kind="weak" hair="#2B2B2B" shirt="#2E9E6B" w={46} />
      <PersonaCard x={106} y={14} name="KAREN" kind="weak" hair="#C9A55A" shirt="#8A63D2" w={46} />
      <Icon x={76} y={4} name="lock" />
      <Person x={4} y={40} who="dana" face="sad" />
    </Stage>
  ),
  "a2-2": (
    <Stage label={tt("Rewritten from interviews, teachers and logs: Mia and Sven, each statement with its source", "Neu geschrieben aus Interviews, Lehrenden und Logs: Mia und Sven, jede Aussage mit Quelle")}>
      <PersonaCard x={30} y={8} name="MIA" kind="mia" hair="#5A3A22" shirt="#3D7BD9" w={50} />
      <PersonaCard x={92} y={8} name="SVEN" kind="sven" hair="#C9A55A" shirt="#8A5A2E" w={50} />
      <Txt x={55} y={58} size={3.8} anchor="middle" c="#556274">INTERVIEWS + LOGS</Txt>
      <Txt x={117} y={58} size={3.8} anchor="middle" c="#556274">INTERVIEWS</Txt>
      <Person x={2} y={40} who="dana" face="happy" />
    </Stage>
  ),
  "a2-3": (
    <Stage label={tt("Three checks for a good persona: data, difference, decisions", "Drei Prüfungen für eine gute Persona: Daten, Unterschied, Entscheidungen")}>
      <Board x={32} y={10} w={96} h={42}>
        {[["chart", 44, "DATA"], ["eye", 74, "DIFFERS"], ["check", 104, "DECIDES"]].map(([n, x, l]) => (
          <g key={l as string}>
            <Icon x={(x as number) - 4} y={16} name={n as string} />
            <Txt x={x as number} y={36} size={4} anchor="middle">{l as string}</Txt>
          </g>
        ))}
        <Txt x={80} y={47} size={3.8} anchor="middle" c="#556274">TWO OR THREE ARE USUALLY ENOUGH</Txt>
      </Board>
      <Person x={2} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),
  "a2-4": (
    <Stage label={tt("Design for everyone, and you design for no one", "Wer für alle gestaltet, gestaltet für niemanden")}>
      <Board x={36} y={8} w={88} h={44}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Kid key={i} x={42 + i * 13} y={20} c={KID_COLOURS[i]} />
        ))}
        <Txt x={80} y={42} size={4.6} anchor="middle">EVERYONE</Txt>
        <Cross x={76} y={46} />
      </Board>
      <Person x={2} y={40} who="priya" face="worried" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Stage label={tt("Entry: Mia signs up in the evening and opens lesson 1 on her phone: emotion 4", "Einstieg: Mia meldet sich abends an und öffnet Lektion 1 auf dem Handy: Emotion 4")}>
      <Person x={4} y={40} who="mia" face="happy" />
      <Journey upTo={1} />
    </Stage>
  ),
  "a3-2": (
    <Stage label={tt("Learning: a unit needs 30 minutes and she has 20: emotion 3", "Lernen: Eine Einheit braucht 30 Minuten, sie hat 20: Emotion 3")}>
      <Person x={4} y={40} who="mia" face="worried" />
      <Journey upTo={2} />
    </Stage>
  ),
  "a3-3": (
    <Stage label={tt("Progress: after three days she cannot find where she stopped, and closes the app: emotion 1", "Fortschritt: Nach drei Tagen findet sie nicht, wo sie aufgehört hat, und schließt die App: Emotion 1")}>
      <Person x={4} y={40} who="mia" face="sad" />
      <Mark x={9} y={36} kind="sweat" />
      <Journey upTo={3} />
    </Stage>
  ),
  "a3-4": (
    <Stage label={tt("The break is not in one screen, but in the step between visits", "Der Bruch liegt nicht in einem Bildschirm, sondern im Schritt zwischen den Besuchen")}>
      <Journey upTo={3} />
      <Person x={4} y={40} who="priya" face="think" pose="point" />
      <Icon x={124} y={34} name="warn" />
    </Stage>
  ),
  "a3-5": (
    <Stage label={tt("Act first where the curve is lowest, and say which pain point it answers", "Zuerst dort handeln, wo die Kurve am tiefsten ist, und sagen, welchen Schmerzpunkt es beantwortet")}>
      <Board x={32} y={10} w={96} h={42}>
        <Icon x={40} y={16} name="down" />
        <Txt x={54} y={23} size={4.4}>LOWEST POINT FIRST</Txt>
        <Icon x={40} y={32} name="warn" />
        <Txt x={54} y={39} size={4.4}>NAME THE PAIN POINT</Txt>
      </Board>
      <Person x={2} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Stage label={tt("The learner's view: where she stopped, and what is next", "Die Sicht der Lernenden: wo sie aufgehört hat und was als Nächstes kommt")}>
      <Table x={44} y={56} w={72} />
      <Mon x={52} y={8} w={56} h={46}>
        <Chip x={56} y={16} w={48} h={11} c="#FFE48A" />
        <Txt x={80} y={23} size={4.2} anchor="middle">WHERE YOU STOPPED</Txt>
        <Bar x={58} y={34} w={44} p={0.4} c="#2E9E6B" />
        <Chip x={56} y={40} w={48} h={7} c="#B5D4F4" />
      </Mon>
      <Person x={8} y={40} who="mia" face="happy" />
    </Stage>
  ),
  "a4-2": (
    <Stage label={tt("The teacher's view: who is stuck, how the course is doing, an editor with many tabs", "Die Sicht des Lehrenden: wer feststeckt, wie der Kurs läuft, ein Editor mit vielen Tabs")}>
      <Table x={44} y={56} w={72} />
      <Mon x={48} y={8} w={64} h={46}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Chip key={i} x={52 + i * 6} y={15} w={5} h={5} c={i === 0 ? "#FFE48A" : "#D4D8E0"} />
        ))}
        <Lines x={52} y={25} w={54} n={4} gap={4} />
        <Txt x={52} y={48} size={3.8} c="#556274">WHO IS STUCK?</Txt>
      </Mon>
      <Person x={8} y={40} who="sven" face="worried" />
    </Stage>
  ),
  "a4-3": (
    <Stage label={tt("A platform that serves only one of them fails the other", "Eine Plattform, die nur eine von ihnen bedient, lässt die andere im Stich")}>
      <Person x={8} y={40} who="mia" face="happy" />
      <Person x={138} y={40} who="sven" face="sad" flip />
      <Board x={44} y={10} w={72} h={40}>
        <Txt x={50} y={20} size={4.4}>LEARNER</Txt>
        <Tick x={96} y={15} />
        <Txt x={50} y={34} size={4.4}>TEACHER</Txt>
        <Cross x={96} y={29} />
        <Txt x={80} y={46} size={3.8} anchor="middle" c="#556274">LOW USAGE</Txt>
      </Board>
    </Stage>
  ),
  "a4-4": (
    <Stage label={tt("Each group gets its own persona and its own journey", "Jede Gruppe bekommt ihre eigene Persona und ihre eigene Journey")}>
      <Board x={20} y={8} w={120} h={44}>
        <Txt x={26} y={17} size={4.4} c="#556274">LEARNER</Txt>
        {["ENTRY", "LEARNING", "PROGRESS"].map((l, i) => (
          <Chip key={l} x={26 + i * 24} y={21} w={22} h={6} c="#B5D4F4" />
        ))}
        <Txt x={26} y={37} size={4.4} c="#556274">TEACHER</Txt>
        {["SET UP", "RUN", "REVIEW"].map((l, i) => (
          <Chip key={l} x={26 + i * 24} y={41} w={22} h={6} c="#CDE8DA" />
        ))}
      </Board>
      <Person x={0} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Stage label={tt("Mia's lowest point is the return after three days: €40,000, three months, three measures", "Mias tiefster Punkt ist die Rückkehr nach drei Tagen: 40.000 €, drei Monate, drei Maßnahmen")}>
      <Board x={38} y={8} w={84} h={42}>
        {[["play", 48, "RESUME"], ["clock", 72, "5 MIN"], ["pencil", 96, "EDITOR"]].map(([n, x, l]) => (
          <g key={l as string}>
            <Icon x={(x as number) - 4} y={14} name={n as string} />
            <Txt x={x as number} y={34} size={3.8} anchor="middle">{l as string}</Txt>
          </g>
        ))}
        <Txt x={80} y={46} size={4.2} anchor="middle" c="#556274">40,000 · 3 MONTHS</Txt>
      </Board>
      <Person x={6} y={40} who="priya" face="think" />
      <Person x={132} y={40} who="dana" face="neutral" flip />
    </Stage>
  ),
  "a5-2": (
    <Stage label={tt("Measure 1: a resume button on every screen, 5,000", "Maßnahme 1: ein Fortsetzen-Button auf jedem Bildschirm, 5.000")}>
      <Board x={34} y={4} w={92} h={56}>
        <Txt x={40} y={12} size={4.4}>1 · RESUME BUTTON · 5,000</Txt>
        <Chip x={44} y={17} w={26} h={7} c="#FFE48A" />
        {rate([["IMPACT", 3, "HIGH"], ["EFFORT", 1, "LOW"], ["RISK", 1, "LOW"]], 40, 38)}
      </Board>
      <Person x={6} y={40} who="priya" face="happy" />
      <Person x={130} y={40} who="dana" face="happy" flip />
    </Stage>
  ),
  "a5-3": (
    <Stage label={tt("Measure 2: five-minute learning formats, 18,000", "Maßnahme 2: Fünf-Minuten-Lernformate, 18.000")}>
      <Board x={34} y={4} w={92} h={56}>
        <Txt x={40} y={12} size={4.4}>2 · 5-MINUTE FORMATS · 18,000</Txt>
        <Icon x={44} y={15} name="clock" />
        <Txt x={58} y={22} size={4.2}>CONTENT REBUILT</Txt>
        {rate([["IMPACT", 3, "HIGH"], ["EFFORT", 3, "HIGH"], ["RISK", 2, "MID"]], 40, 38)}
      </Board>
      <Person x={6} y={40} who="priya" face="neutral" />
      <Person x={130} y={40} who="dana" face="think" flip />
    </Stage>
  ),
  "a5-4": (
    <Stage label={tt("Measure 3: a new course editor, 26,000: for teachers, not for Mia", "Maßnahme 3: ein neuer Kurseditor, 26.000: für Lehrende, nicht für Mia")}>
      <Board x={34} y={4} w={92} h={56}>
        <Txt x={40} y={12} size={4.4}>3 · COURSE EDITOR · 26,000</Txt>
        <Icon x={44} y={15} name="pencil" />
        <Txt x={58} y={22} size={4.2}>FOR TEACHERS</Txt>
        {rate([["IMPACT", 1, "LOW FOR MIA"], ["EFFORT", 3, "HIGH"], ["RISK", 2, "MID"]], 40, 38)}
      </Board>
      <Person x={6} y={40} who="priya" face="neutral" />
      <Person x={130} y={40} who="dana" face="surprised" flip />
    </Stage>
  ),
  "a5-5": (
    <Stage label={tt("Rate a measure for a named persona at a named pain point, and say how many people she stands for", "Eine Maßnahme für eine genannte Persona an einem genannten Schmerzpunkt bewerten und sagen, für wie viele Menschen sie steht")}>
      <Board x={32} y={8} w={96} h={44}>
        {[["eye", 44, "PERSONA"], ["warn", 74, "PAIN POINT"], ["chart", 104, "HOW MANY"]].map(([n, x, l]) => (
          <g key={l as string}>
            <Icon x={(x as number) - 4} y={14} name={n as string} />
            <Txt x={x as number} y={34} size={4} anchor="middle">{l as string}</Txt>
          </g>
        ))}
        <Txt x={80} y={46} size={3.8} anchor="middle" c="#556274">IN YOUR OWN ANSWER</Txt>
      </Board>
      <Person x={2} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Stage label={tt("The time-poor learners are by far the largest group, about 5,000", "Die Lernenden mit wenig Zeit sind mit etwa 5.000 die mit Abstand größte Gruppe")}>
      <Segments hi={["A"]} />
      <Person x={4} y={40} who="dana" face="think" />
    </Stage>
  ),
  "b1-2": (
    <Stage label={tt("Sixty training managers and the teachers are tiny groups at the top: losing them costs more", "Sechzig Weiterbildungsleiter und die Lehrenden sind kleine Gruppen oben: Sie zu verlieren kostet mehr")}>
      <Segments hi={["C", "D"]} />
      <Person x={4} y={40} who="petra" face="worried" />
    </Stage>
  ),
  "b1-3": (
    <Stage label={tt("Three tests: how large, what it is worth, where the journey breaks", "Drei Prüfungen: wie groß, was es wert ist, wo die Journey bricht")}>
      <Board x={32} y={10} w={96} h={42}>
        {[["chart", 44, "HOW LARGE"], ["heart", 74, "WORTH"], ["warn", 104, "WHERE IT BREAKS"]].map(([n, x, l]) => (
          <g key={l as string}>
            <Icon x={(x as number) - 4} y={16} name={n as string} />
            <Txt x={x as number} y={36} size={3.6} anchor="middle">{l as string}</Txt>
          </g>
        ))}
      </Board>
      <Person x={2} y={40} who="dana" face="happy" pose="up" />
    </Stage>
  ),
  "b1-4": (
    <Stage label={tt("Choose two or three strategic personas and say which test decided", "Zwei oder drei strategische Personas wählen und sagen, welche Prüfung entschied")}>
      <Segments />
      <Person x={4} y={40} who="dana" face="happy" pose="up" />
    </Stage>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Stage label={tt("One screen for everyone: a resume card, nine editor tabs and a badge wall at once", "Ein Bildschirm für alle: eine Fortsetzen-Karte, neun Editor-Tabs und eine Badge-Wand auf einmal")}>
      <Mon x={46} y={6} w={68} h={52} bar="#8A8A92">
        <Chip x={50} y={14} w={26} h={8} c="#FFE48A" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Chip key={i} x={50 + i * 6.5} y={26} w={5} h={5} c="#D4D8E0" />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Chip key={i} x={50 + i * 9} y={36} w={7} h={7} c={KID_COLOURS[i]} />
        ))}
        <Lines x={50} y={48} w={56} n={2} gap={3} />
      </Mon>
      <Person x={4} y={40} who="mia" face="sad" />
      <Person x={138} y={40} who="sven" face="sad" flip />
    </Stage>
  ),
  "b2-2": (
    <Stage label={tt("Learners are the primary segment; the teachers are told they get their turn in the third quarter", "Lernende sind das primäre Segment; die Lehrenden erfahren, dass sie im dritten Quartal an der Reihe sind")}>
      <Board x={20} y={8} w={120} h={44}>
        <Txt x={26} y={17} size={4.4} c="#0B6F69">PRIMARY · LEARNERS</Txt>
        <Chip x={26} y={21} w={48} h={9} c="#FFE48A" />
        <Txt x={26} y={40} size={4.4} c="#556274">TEACHERS</Txt>
        <Calendar x={80} y={14} w={50} h={30} />
        <Txt x={105} y={42} size={5} anchor="middle">Q3</Txt>
      </Board>
      <Person x={0} y={40} who="priya" face="happy" />
    </Stage>
  ),
  "b2-3": (
    <Stage label={tt("Share what is common, separate what truly differs", "Teilen, was gemeinsam ist, trennen, was sich wirklich unterscheidet")}>
      <Board x={16} y={8} w={128} h={44}>
        <Chip x={64} y={14} w={32} h={14} c="#FFE48A" />
        <Txt x={80} y={23} size={3.8} anchor="middle">ONE OUTLINE</Txt>
        <Chip x={22} y={34} w={36} h={10} c="#B5D4F4" />
        <Txt x={40} y={41} size={3.6} anchor="middle">LEARNER HOME</Txt>
        <Chip x={102} y={34} w={36} h={10} c="#CDE8DA" />
        <Txt x={120} y={41} size={3.6} anchor="middle">TEACHER TOOLS</Txt>
        <Arrow x={56} y={22} />
        <Arrow x={98} y={22} />
      </Board>
    </Stage>
  ),
  "b2-4": (
    <Stage label={tt("Pick a primary segment, serve the others as far as it does not harm it, and say what they give up", "Ein primäres Segment wählen, die anderen bedienen, soweit es ihm nicht schadet, und sagen, worauf sie verzichten")}>
      <Board x={32} y={10} w={96} h={42}>
        {[["up", 44, "PRIMARY"], ["clock", 74, "OTHERS"], ["down", 104, "GIVE UP"]].map(([n, x, l]) => (
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
    <Stage label={tt("Personas are hypotheses: Mia rests on twelve interviews and logs, Sven on four, Petra on two", "Personas sind Hypothesen: Mia beruht auf zwölf Interviews und Logs, Sven auf vier, Petra auf zwei")}>
      <Board x={24} y={8} w={112} h={46}>
        {[["MIA", 12], ["SVEN", 4], ["PETRA", 2]].map(([n, k], r) => (
          <g key={n as string}>
            <Txt x={30} y={20 + r * 13} size={4.4}>{n as string}</Txt>
            {Array.from({ length: k as number }, (_, i) => (
              <g key={i}>
                <rect x={56 + i * 6} y={14 + r * 13} width={5} height={7} fill={K} />
                <rect x={57 + i * 6} y={15 + r * 13} width={3} height={5} fill={r === 0 ? "#2E9E6B" : r === 1 ? "#F2A900" : "#D9534F"} />
              </g>
            ))}
          </g>
        ))}
      </Board>
      <Person x={0} y={40} who="priya" face="think" />
    </Stage>
  ),
  "b3-2": (
    <Stage label={tt("A priority for two quarters you can review, against rebuilding the whole platform now", "Eine Priorität für zwei Quartale, die man prüfen kann, gegenüber dem Umbau der ganzen Plattform jetzt")}>
      <Board x={14} y={8} w={64} h={46}>
        <Txt x={18} y={16} size={4} c="#0B6F69">TWO QUARTERS</Txt>
        <Calendar x={22} y={20} w={44} h={26} />
        <Icon x={64} y={22} name="clock" />
      </Board>
      <Board x={84} y={8} w={64} h={46}>
        <Txt x={88} y={16} size={4} c="#B5372E">WHOLE PLATFORM</Txt>
        <rect x={92} y={22} width={48} height={22} fill={K} />
        <rect x={93} y={23} width={46} height={20} fill="#D4D8E0" />
        <Icon x={111} y={28} name="lock" />
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
      <Person x={0} y={40} who="dana" face="happy" />
    </Stage>
  ),
  "b3-4": (
    <Stage label={tt("A rule for future persona decisions: who decides, and on what evidence", "Eine Regel für künftige Persona-Entscheidungen: wer entscheidet und auf welcher Grundlage")}>
      <Board x={26} y={8} w={108} h={50}>
        <Txt x={32} y={17} size={4.6} c="#556274">WHO DECIDES</Txt>
        <Icon x={34} y={20} name="eye" />
        <Txt x={48} y={27} size={4.4}>HEAD OF PRODUCT + UX LEAD</Txt>
        <Txt x={32} y={40} size={4.6} c="#556274">ON WHAT EVIDENCE</Txt>
        <Icon x={34} y={43} name="chart" />
        <Txt x={48} y={50} size={4.4}>INTERVIEWS · USAGE · RENEWALS</Txt>
      </Board>
      <Person x={2} y={40} who="priya" face="happy" />
    </Stage>
  ),
};
// keep imports used even when a scene set changes
void Coins;
void Table;
