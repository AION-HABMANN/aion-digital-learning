import type { ReactNode } from "react";
import { Arrow, Bar, Board, Chip, Cross, Icon, K, LOOK, Lines, Mark, Person, Stage, Tick, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes, Rate } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 10 comics (data/day10/comics.ts, DL-STANDARD.md section 13). People: Kim, Raj, Nia and Jo (learners of LearnLoop), Priya (LearnLoop's UX
 * lead) and Dana (head of product), all made up. Every label is a short capital word with a German entry in pixelLabels.ts.
 */
LOOK.kim = { hair: "#7A3B2E", shirt: "#D9534F", long: true };
LOOK.raj = { hair: "#1B1B22", shirt: "#8A63D2", skin: "#C68A5A" };
LOOK.nia = { hair: "#2B1B14", shirt: "#0B8A82", long: true, skin: "#B07A52" };
LOOK.jo = { hair: "#C9A55A", shirt: "#555B66", cap: "#2F5D9E" };
LOOK.priya = { hair: "#1B1B22", shirt: "#2B8A6E", long: true, skin: "#C8946A" };
LOOK.dana = { hair: "#5A3A22", shirt: "#8A63D2", long: true };

const WARN = "#F6C9B8";
const OK = "#B5E3C8";
const NEU = "#E4E8EE";

/** A quiz question with two answers, after the learner has chosen: nothing changes, a bare cross, or an explained result with a next step. */
function QuizBoard({ kind }: { kind: "none" | "bare" | "explained" }) {
  return (
    <Board x={34} y={4} w={92} h={58}>
      <rect x={34} y={4} width={92} height={5} fill="#3F4A58" />
      <Txt x={80} y={8} size={3.4} anchor="middle" c="#FFFFFF">QUIZ QUESTION</Txt>
      <Txt x={38} y={17} size={3.4}>WHO NAMES THE FIRST NUMBER?</Txt>
      <Chip x={38} y={21} w={24} h={7} c={kind === "explained" ? OK : "#B5D4F4"} />
      <Txt x={50} y={26.2} size={3.2} anchor="middle">A · YOU</Txt>
      <Chip x={66} y={21} w={42} h={7} c={kind === "bare" ? WARN : "#B5D4F4"} />
      <Txt x={87} y={26.2} size={3.2} anchor="middle">B · THE OTHER SIDE</Txt>
      {kind === "bare" && <Cross x={111} y={23} />}
      {kind === "none" && <Txt x={80} y={42} size={3.8} anchor="middle" c="#556274">NOTHING CHANGES</Txt>}
      {kind === "explained" && (
        <g>
          <Lines x={38} y={34} w={84} n={2} gap={3.4} c="#2E7D55" />
          <Txt x={38} y={44} size={3.2} c="#2E7D55">A IS RIGHT: YOUR NUMBER ANCHORS</Txt>
          <Chip x={84} y={48} w={38} h={8} c="#3F4A58" />
          <Txt x={103} y={53.8} size={3.2} anchor="middle" c="#FFFFFF">NEXT QUESTION</Txt>
        </g>
      )}
    </Board>
  );
}

/** A course page: eight lessons that look alike, a bar that cheats, or an honest count with a status on each lesson. */
function CourseBoard({ kind }: { kind: "none" | "cheat" | "honest" }) {
  return (
    <Board x={34} y={4} w={92} h={58}>
      <rect x={34} y={4} width={92} height={5} fill="#3F4A58" />
      <Txt x={80} y={8} size={3.4} anchor="middle" c="#FFFFFF">NEGOTIATION BASICS</Txt>
      {kind === "cheat" && (
        <g>
          <Bar x={40} y={14} w={80} p={0.9} c="#E4572E" />
          <Txt x={40} y={22} size={3.4}>90% AFTER LESSON 1</Txt>
        </g>
      )}
      {kind === "honest" && (
        <g>
          <Bar x={40} y={14} w={80} p={0.38} c="#3F4A58" />
          <Txt x={40} y={22} size={3.4}>3 OF 8 LESSONS · 20 MIN LEFT</Txt>
        </g>
      )}
      {kind === "none" && <Txt x={40} y={19} size={3.4} c="#556274">NO COUNT, NO BAR</Txt>}
      {Array.from({ length: 4 }, (_, i) => (
        <g key={i}>
          <rect x={40} y={26 + i * 8} width={80} height={6} fill={kind === "honest" && i < 3 ? OK : NEU} />
          <Txt x={43} y={30.6 + i * 8} size={3}>{`LESSON ${i + 1}`}</Txt>
          {kind === "honest" && <Txt x={117} y={30.6 + i * 8} size={3} anchor="end">{i < 3 ? "DONE" : "OPEN"}</Txt>}
        </g>
      ))}
    </Board>
  );
}

/** The same lesson on a phone that was not adapted, a phone that was, and a tablet with a desktop. */
function DeviceBoard({ kind }: { kind: "raw" | "phone" | "wide" }) {
  if (kind === "wide")
    return (
      <Board x={30} y={4} w={100} h={58}>
        <rect x={30} y={4} width={100} height={5} fill="#3F4A58" />
        <Txt x={80} y={8} size={3.4} anchor="middle" c="#FFFFFF">TABLET AND DESKTOP</Txt>
        <rect x={34} y={13} width={26} height={42} fill={NEU} />
        {["LESSON 1", "LESSON 2", "LESSON 3"].map((l, i) => (
          <Txt key={l} x={37} y={20 + i * 7} size={3}>{l}</Txt>
        ))}
        <Lines x={64} y={15} w={62} n={5} gap={3.6} />
        <rect x={64} y={38} width={62} height={16} fill="#F3F6FA" />
        <Txt x={67} y={44} size={3}>NOTES BESIDE THE TEXT</Txt>
      </Board>
    );
  return (
    <Board x={52} y={2} w={56} h={62}>
      <rect x={52} y={2} width={56} height={5} fill="#3F4A58" />
      <Txt x={80} y={6} size={3} anchor="middle" c="#FFFFFF">PHONE</Txt>
      {kind === "raw" ? (
        <g>
          <Lines x={54} y={11} w={60} n={6} gap={3.4} />
          <Chip x={96} y={55} w={10} h={5} c="#3F4A58" />
          <Txt x={54} y={50} size={3} c="#556274">TEXT RUNS OFF THE EDGE</Txt>
        </g>
      ) : (
        <g>
          <Bar x={56} y={11} w={48} p={0.38} c="#3F4A58" />
          <Txt x={56} y={18} size={3}>3 OF 8 LESSONS</Txt>
          <Chip x={56} y={22} w={48} h={11} c="#3F4A58" />
          <Txt x={80} y={29.4} size={3.6} anchor="middle" c="#FFFFFF">CONTINUE</Txt>
          <Lines x={56} y={38} w={48} n={3} gap={3.4} />
          <Txt x={56} y={56} size={3} c="#556274">THE MAIN ACTION FIRST</Txt>
        </g>
      )}
    </Board>
  );
}

/** A phone screen with large targets, strong contrast and status in words, or without them. */
function A11yBoard({ on }: { on: boolean }) {
  return (
    <Board x={44} y={2} w={72} h={62}>
      <rect x={44} y={2} width={72} height={5} fill="#3F4A58" />
      <Txt x={80} y={6} size={3} anchor="middle" c="#FFFFFF">PHONE IN THE SUN</Txt>
      <Txt x={48} y={16} size={3.4} c={on ? K : "#C9CED6"}>LESSON 3: THE FIRST OFFER</Txt>
      {[0, 1].map((i) => (
        <g key={i}>
          {on ? <Txt x={48} y={24 + i * 8} size={3} c="#2E7D55">{i === 0 ? "LESSON 1: DONE" : "LESSON 2: OPEN"}</Txt> : <rect x={48} y={22 + i * 8} width={3} height={3} fill={i === 0 ? "#D9534F" : "#2E9E6B"} />}
        </g>
      ))}
      {on ? (
        <g>
          <Chip x={48} y={42} w={64} h={14} c="#3F4A58" />
          <Txt x={80} y={51} size={4} anchor="middle" c="#FFFFFF">CONTINUE</Txt>
        </g>
      ) : (
        <g>
          <Chip x={96} y={52} w={10} h={5} c="#3F4A58" />
          <Mark x={108} y={46} kind="ask" />
        </g>
      )}
    </Board>
  );
}

/** The chain from feedback to visible progress, motivation and usage. */
function ChainBoard() {
  return (
    <Board x={26} y={4} w={108} h={58}>
      {["FEEDBACK", "PROGRESS", "MOTIVATION", "USAGE"].map((l, i) => (
        <g key={l}>
          <Chip x={30 + i * 26} y={20} w={22} h={10} c={i === 0 ? OK : i === 1 ? "#B5D4F4" : i === 2 ? "#F2E2A8" : "#E7D5F5"} />
          <Txt x={41 + i * 26} y={27} size={3} anchor="middle">{l}</Txt>
          {i < 3 && <Arrow x={52 + i * 26} y={23} />}
        </g>
      ))}
      <Txt x={80} y={44} size={3.6} anchor="middle" c="#556274">ON EVERY DEVICE, FOR EVERY LEARNER</Txt>
      <Txt x={80} y={52} size={3.6} anchor="middle" c="#556274">RESPONSIVE AND ACCESSIBLE</Txt>
    </Board>
  );
}

/** Five LearnLoop progress screens by the information they show (to the right) and the clarity they keep (upwards). */
function DensityMatrix({ hi }: { hi?: string[] }) {
  const dots: [string, number, number][] = [["A", 0.92, 0.12], ["B", 0.12, 0.88], ["C", 0.78, 0.84], ["D", 0.4, 0.16], ["E", 0.5, 0.32]];
  const px = (x: number) => 48 + x * 72;
  const py = (y: number) => 46 - y * 34;
  return (
    <Board x={28} y={4} w={104} h={58}>
      <rect x={44} y={10} width={1} height={44} fill={K} />
      <rect x={44} y={54} width={84} height={1} fill={K} />
      <Txt x={86} y={60} size={3.6} anchor="middle" c="#556274">INFORMATION SHOWN →</Txt>
      <Txt x={30} y={26} size={3} c="#556274">CLARITY</Txt>
      <Txt x={34} y={32} size={4} c="#556274">↑</Txt>
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

export const ART_D10: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Duo label={tt("Kim picks an answer and the page looks exactly as before: she does not know if it counted", "Kim wählt eine Antwort und die Seite sieht genau aus wie vorher: Sie weiß nicht, ob es zählte")} left={{ who: "kim", face: "worried" }}>
      <QuizBoard kind="none" />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a1-2": (
    <Duo label={tt("A red cross appears next to B: Kim knows she was wrong, but not why", "Ein rotes Kreuz erscheint neben B: Kim weiß, dass sie falsch lag, aber nicht warum")} left={{ who: "kim", face: "worried" }}>
      <QuizBoard kind="bare" />
    </Duo>
  ),
  "a1-3": (
    <Duo label={tt("The page says A was right, why, and what to do next: the feedback steers Kim", "Die Seite sagt, dass A richtig war, warum und was als Nächstes zu tun ist: Das Feedback steuert Kim")} left={{ who: "kim", face: "happy", pose: "up" }}>
      <QuizBoard kind="explained" />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a1-4": (
    <Duo label={tt("Two kinds of feedback: direct (right or wrong, and why) and indirect (visible progress)", "Zwei Arten von Feedback: direkt (richtig oder falsch, und warum) und indirekt (sichtbarer Fortschritt)")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="TWO KINDS OF FEEDBACK" items={[{ icon: "check", text: "DIRECT: RIGHT OR WRONG" }, { icon: "chart", text: "INDIRECT: PROGRESS" }, { tick: true, text: "SAY WHY, THEN NEXT" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Duo label={tt("Raj is half way through an eight-lesson course, but the page shows no count, and finished lessons look like new ones", "Raj ist halb durch einen Kurs mit acht Lektionen, aber die Seite zeigt keine Zählung, und erledigte Lektionen sehen aus wie neue")} left={{ who: "raj", face: "worried" }}>
      <CourseBoard kind="none" />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a2-2": (
    <Duo label={tt("A bar that counts clicks shows 90% after the first lesson, then barely moves: Raj feels cheated", "Ein Balken, der Klicks zählt, zeigt nach der ersten Lektion 90 % und bewegt sich dann kaum: Raj fühlt sich getäuscht")} left={{ who: "raj", face: "surprised" }}>
      <CourseBoard kind="cheat" />
    </Duo>
  ),
  "a2-3": (
    <Duo label={tt("An honest display: 3 of 8 lessons done, about 20 minutes left, a status on each lesson", "Eine ehrliche Anzeige: 3 von 8 Lektionen erledigt, etwa 20 Minuten übrig, ein Status an jeder Lektion")} left={{ who: "raj", face: "happy", pose: "up" }}>
      <CourseBoard kind="honest" />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a2-4": (
    <Duo label={tt("A display answers how far along am I: it must count something real, and a long course is shown in small steps", "Eine Anzeige beantwortet, wie weit ich bin: Sie muss etwas Echtes zählen, und ein langer Kurs wird in kleinen Schritten gezeigt")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="PROGRESS TRACKING" items={[{ icon: "chart", text: "BAR, LEVELS, STATUS" }, { cross: true, text: "RISK: A MISLEADING DISPLAY" }, { cross: true, text: "RISK: DEMOTIVATION" }, { tick: true, text: "COUNT LESSONS FINISHED" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Duo label={tt("Nia studies on the train. The desktop page is squeezed onto her phone: text runs off the edge", "Nia lernt im Zug. Die Desktopseite ist auf ihr Handy gequetscht: Text läuft über den Rand")} left={{ who: "nia", face: "worried" }}>
      <DeviceBoard kind="raw" />
      <Mark x={9} y={34} kind="sweat" />
    </Duo>
  ),
  "a3-2": (
    <Duo label={tt("The same lesson prioritised for a phone: progress, a large Continue button first, text that fits", "Dieselbe Lektion für ein Handy priorisiert: Fortschritt, ein großer Weiter-Button zuerst, Text, der passt")} left={{ who: "nia", face: "happy", pose: "up" }}>
      <DeviceBoard kind="phone" />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a3-3": (
    <Duo label={tt("A tablet has room for the lesson list beside the lesson, and a desktop adds notes", "Ein Tablet hat Platz für die Lektionsliste neben der Lektion, und ein Desktop ergänzt Notizen")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <DeviceBoard kind="wide" />
    </Duo>
  ),
  "a3-4": (
    <Duo label={tt("Responsive design is a decision per device: what is the same, what comes first, what only fits a large screen", "Responsive Design ist eine Entscheidung pro Gerät: was gleich ist, was zuerst kommt, was nur auf einen großen Bildschirm passt")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="PER DEVICE" items={[{ tick: true, text: "WHAT IS THE SAME" }, { tick: true, text: "WHAT COMES FIRST" }, { tick: true, text: "WHAT ONLY FITS LARGE" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Duo label={tt("Jo's hand shakes a little and she studies outside: the button is tiny, the text pale, the status only a dot", "Jos Hand zittert ein wenig, und sie lernt draußen: Der Button ist winzig, der Text blass, der Status nur ein Punkt")} left={{ who: "jo", face: "worried" }}>
      <A11yBoard on={false} />
    </Duo>
  ),
  "a4-2": (
    <Duo label={tt("Large target, strong contrast and status in words: Jo hits the button, reads the text and sees what is done", "Großes Ziel, starker Kontrast und Status in Worten: Jo trifft den Button, liest den Text und sieht, was erledigt ist")} left={{ who: "jo", face: "happy", pose: "up" }}>
      <A11yBoard on />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a4-3": (
    <Duo label={tt("Three small fixes: a target of at least 44 pixels, strong contrast, and words as well as colours", "Drei kleine Behebungen: ein Ziel von mindestens 44 Pixeln, starker Kontrast und Worte zusätzlich zu Farben")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="THREE SMALL FIXES" items={[{ icon: "play", text: "TARGET: AT LEAST 44 PX" }, { icon: "eye", text: "STRONG CONTRAST" }, { icon: "book", text: "WORDS, NOT ONLY COLOUR" }]} sub="THE SAME FIXES HELP EVERYONE" />
    </Duo>
  ),
  "a4-4": (
    <Duo label={tt("Accessibility on a phone means scalability and reach, and links to inclusive design", "Barrierefreiheit auf dem Handy bedeutet Skalierbarkeit und Reichweite und knüpft an inklusives Design an")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="ACCESSIBILITY" items={[{ tick: true, text: "OPERABLE ON EVERY DEVICE" }, { tick: true, text: "LEGIBLE IN BAD LIGHT" }, { tick: true, text: "MORE REACH, MORE SCALE" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Duo label={tt("LearnLoop's learners do not know how far along they are, and motivation is low. Three ideas are on the table", "LearnLoops Lernende wissen nicht, wie weit sie sind, und die Motivation ist niedrig. Drei Ideen liegen auf dem Tisch")} left={{ who: "priya", face: "think" }} right={{ who: "dana", face: "think" }}>
      <Notes x={36} y={6} w={90} title="LEARNLOOP · 3 IDEAS" items={[{ icon: "idea", text: "A PROGRESS BAR" }, { icon: "idea", text: "EXPLAINED FEEDBACK" }, { icon: "idea", text: "LEVELS AND POINTS" }]} sub="NO PROGRESS SHOWN · LOW MOTIVATION" />
    </Duo>
  ),
  "a5-2": (
    <Duo label={tt("A progress bar on every course: a high impact, a low effort, a medium risk", "Ein Fortschrittsbalken auf jedem Kurs: hohe Wirkung, geringer Aufwand, mittleres Risiko")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Rate x={44} y={4} title="A PROGRESS BAR" rows={[["IMPACT", 3, "HIGH"], ["EFFORT", 1, "LOW"], ["RISK", 2, "MID"]]} />
    </Duo>
  ),
  "a5-3": (
    <Duo label={tt("Explained feedback after every task: a high impact, a medium effort, a low risk", "Erklärtes Feedback nach jeder Aufgabe: hohe Wirkung, mittlerer Aufwand, geringes Risiko")} left={{ who: "priya", face: "happy" }}>
      <Rate x={44} y={4} title="EXPLAINED FEEDBACK" rows={[["IMPACT", 3, "HIGH"], ["EFFORT", 2, "MID"], ["RISK", 1, "LOW"]]} />
    </Duo>
  ),
  "a5-4": (
    <Duo label={tt("Levels and points for every action: a low impact, a high effort, a high risk", "Level und Punkte für jede Aktion: geringe Wirkung, hoher Aufwand, hohes Risiko")} left={{ who: "priya", face: "worried" }}>
      <Rate x={44} y={4} title="LEVELS AND POINTS" rows={[["IMPACT", 1, "LOW"], ["EFFORT", 3, "HIGH"], ["RISK", 3, "HIGH"]]} />
    </Duo>
  ),
  "a5-5": (
    <Duo label={tt("Rate each measure on impact, effort and risk, with a reason: transparency and feedback before decoration", "Jede Maßnahme nach Wirkung, Aufwand und Risiko bewerten, mit einem Grund: Transparenz und Feedback vor Dekoration")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="RATE EACH MEASURE" items={[{ icon: "up", text: "IMPACT: MOTIVATION" }, { icon: "clock", text: "EFFORT: WORK AND TIME" }, { icon: "warn", text: "RISK: DOES IT MISLEAD?" }]} sub="TRANSPARENCY BEFORE DECORATION" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Duo label={tt("The head of product asks why feedback and progress come before a redesign for the phone", "Die Leiterin Produkt fragt, warum Feedback und Fortschritt vor einem Redesign für das Handy kommen")} left={{ who: "dana", face: "worried" }} right={{ who: "priya", face: "think" }}>
      <Board x={56} y={10} w={48} h={34}>
        <Icon x={76} y={16} name="ask" />
        <Txt x={80} y={36} size={4.4} anchor="middle">REDESIGN FIRST?</Txt>
      </Board>
    </Duo>
  ),
  "b1-2": (
    <Duo label={tt("UX as a feedback system: feedback, visible progress, motivation, usage", "UX als Feedbacksystem: Feedback, sichtbarer Fortschritt, Motivation, Nutzung")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <ChainBoard />
    </Duo>
  ),
  "b1-3": (
    <Duo label={tt("Responsive design and accessibility are not a fifth box: they let the chain work for every learner", "Responsive Design und Barrierefreiheit sind kein fünfter Kasten: Sie lassen die Kette für jede Lernende funktionieren")} left={{ who: "dana", face: "surprised" }}>
      <Notes x={44} y={8} w={104} title="WHAT LETS IT WORK" items={[{ icon: "play", text: "A PREREQUISITE" }, { icon: "eye", text: "FOR EVERY LEARNER" }, { icon: "chart", text: "FOR EVERY DEVICE" }]} />
    </Duo>
  ),
  "b1-4": (
    <Duo label={tt("Order the work as the chain runs: feedback and progress first, then the phone, then accessibility", "Die Arbeit ordnen, wie die Kette läuft: erst Feedback und Fortschritt, dann das Handy, dann Barrierefreiheit")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="ORDER OF THE WORK" items={[{ tick: true, text: "1 · FEEDBACK, PROGRESS" }, { tick: true, text: "2 · THE PHONE" }, { tick: true, text: "3 · ACCESSIBILITY" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Stage label={tt("Five progress screens by the information they show and the clarity they keep", "Fünf Fortschrittsbildschirme nach der Information, die sie zeigen, und der Klarheit, die sie behalten")}>
      <DensityMatrix />
      <Person x={2} y={40} who="priya" face="think" />
    </Stage>
  ),
  "b2-2": (
    <Stage label={tt("Fourteen charts hide the one number a learner needs, and only a Continue button hides how they are doing", "Vierzehn Diagramme verbergen die eine Zahl, die eine Lernende braucht, und ein Weiter-Button allein verbirgt, wie es ihr geht")}>
      <DensityMatrix hi={["A", "B"]} />
      <Person x={2} y={40} who="dana" face="surprised" />
    </Stage>
  ),
  "b2-3": (
    <Stage label={tt("Three numbers and a “Details” link: enough to decide the next step, and clear", "Drei Zahlen und ein Link „Details“: genug, um den nächsten Schritt zu entscheiden, und klar")}>
      <DensityMatrix hi={["C"]} />
      <Person x={2} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),
  "b2-4": (
    <Stage label={tt("A pop-up after every click is feedback that overloads: give feedback where it counts", "Ein Pop-up nach jedem Klick ist Feedback, das überlastet: Feedback dort geben, wo es zählt")}>
      <DensityMatrix hi={["D"]} />
      <Person x={2} y={40} who="priya" face="worried" />
    </Stage>
  ),
  "b2-5": (
    <Duo label={tt("Name the conflicts: density against clarity, feedback against overload, flexibility against consistency", "Die Konflikte nennen: Dichte gegen Klarheit, Feedback gegen Überlastung, Flexibilität gegen Konsistenz")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="THREE CONFLICTS" items={[{ icon: "warn", text: "DENSITY ↔ CLARITY" }, { icon: "warn", text: "FEEDBACK ↔ OVERLOAD" }, { icon: "warn", text: "FLEXIBILITY ↔ CONSISTENCY" }]} sub="SHOW WHAT THE NEXT STEP NEEDS" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Duo label={tt("The platform does not split retention by device, and the decision cannot wait", "Die Plattform teilt die Bindung nicht nach Gerät auf, und die Entscheidung kann nicht warten")} left={{ who: "dana", face: "worried" }} right={{ who: "priya", face: "think" }}>
      <Board x={48} y={10} w={64} h={34}>
        <Icon x={76} y={16} name="lock" />
        <Txt x={80} y={36} size={4} anchor="middle">NO DATA BY DEVICE</Txt>
      </Board>
    </Duo>
  ),
  "b3-2": (
    <Duo label={tt("A decision under uncertainty states four things: decide, do not know, reverse if, give up", "Eine Entscheidung unter Unsicherheit nennt vier Dinge: entscheiden, nicht wissen, zurücknehmen, wenn, verzichten")} left={{ who: "priya", face: "think" }}>
      <Notes x={40} y={6} w={112} title="THE DECISION" items={[{ icon: "check", text: "HONEST PROGRESS FIRST" }, { icon: "ask", text: "DO NOT KNOW: DO THEY RETURN?" }, { icon: "clock", text: "REVERSE IF NO RISE" }, { icon: "lock", text: "GIVE UP LEVELS, POINTS" }]} />
    </Duo>
  ),
  "b3-3": (
    <Duo label={tt("A rule for future decisions: who decides and on what evidence", "Eine Regel für künftige Entscheidungen: wer entscheidet und auf welcher Grundlage")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="THE RULE FOR NEXT TIME" items={[{ icon: "ask", text: "UX LEAD WITH PRODUCT" }, { icon: "chart", text: "RETURN RATE BY DEVICE" }]} sub="COMPLETION AND A TEST ON PHONES" />
    </Duo>
  ),
  "b3-4": (
    <Duo label={tt("Decide now, say what you do not know, and name the sign and the time to check", "Jetzt entscheiden, sagen, was Sie nicht wissen, und das Zeichen und den Zeitpunkt zur Prüfung nennen")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="DECIDE, THEN CHECK" items={[{ tick: true, text: "STATE FOUR THINGS" }, { tick: true, text: "A SIGN AND A DATE" }, { tick: true, text: "CHECK WITH THE RULE" }]} />
    </Duo>
  ),
};
