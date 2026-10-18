import type { ReactNode } from "react";
import { Arrow, Bar, Board, Chip, Cross, Icon, K, LOOK, Lines, Mark, Person, Stage, Tick, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes, Rate } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 9 comics (data/day9/comics.ts, DL-STANDARD.md section 13). People: Ana, Sam, Lea and Ben (learners of LearnLoop), Priya (LearnLoop's UX
 * lead) and Dana (head of product), all made up. Every label is a short capital word with a German entry in pixelLabels.ts.
 */
LOOK.ana = { hair: "#1F1F24", shirt: "#0B8A82", glasses: true };
LOOK.sam = { hair: "#3B2A20", shirt: "#555B66", skin: "#C68A5A" };
LOOK.lea = { hair: "#9B4A1E", shirt: "#E07A1F", long: true };
LOOK.ben = { hair: "#2B2B2B", shirt: "#3D7BD9" };
LOOK.priya = { hair: "#1B1B22", shirt: "#2B8A6E", long: true, skin: "#C8946A" };
LOOK.dana = { hair: "#5A3A22", shirt: "#8A63D2", long: true };

const WARN = "#F6C9B8";
const OK = "#B5E3C8";
const NEU = "#E4E8EE";

/** The twelve entries of one flat menu, or the same items grouped under four sections. */
function IaBoard({ grouped }: { grouped: boolean }) {
  const flat = ["HOME", "COURSES", "MY COURSES", "COURSES (OLD)", "LIBRARY", "NEWS", "OFFERS", "RECORDS", "TOOLS", "ATLAS", "HELP", "ACCOUNT"];
  return (
    <Board x={34} y={4} w={92} h={58}>
      <rect x={34} y={4} width={92} height={5} fill="#3F4A58" />
      <Txt x={80} y={8} size={3.4} anchor="middle" c="#FFFFFF">{grouped ? "FOUR SECTIONS" : "ONE FLAT ROW"}</Txt>
      {grouped
        ? ["LEARN", "FIND", "PROGRESS", "HELP"].map((s, i) => (
            <g key={s}>
              <rect x={37 + i * 22} y={13} width={20} height={6} fill={OK} />
              <Txt x={47 + i * 22} y={17.6} size={3} anchor="middle">{s}</Txt>
              {[0, 1].map((j) => (
                <rect key={j} x={38 + i * 22} y={22 + j * 8} width={18} height={6} fill={NEU} />
              ))}
            </g>
          ))
        : flat.map((s, i) => {
            const bad = s === "MY COURSES" || s === "COURSES (OLD)";
            return (
              <g key={s}>
                <rect x={37 + (i % 3) * 29} y={13 + Math.floor(i / 3) * 8} width={27} height={6} fill={bad ? WARN : NEU} />
                <Txt x={50.5 + (i % 3) * 29} y={17.6 + Math.floor(i / 3) * 8} size={2.7} anchor="middle">{s}</Txt>
              </g>
            );
          })}
      <Txt x={80} y={58} size={3.4} anchor="middle" c="#556274">{grouped ? "ONE HOME FOR EVERY ITEM" : "THE SAME COURSE TWICE"}</Txt>
    </Board>
  );
}

/** A menu with n entries, and the one the learner looks for ("CONTRACTS"). */
function MenuBoard({ n }: { n: 4 | 9 | 24 }) {
  const cols = n === 4 ? 2 : n === 9 ? 3 : 6;
  const rows = Math.ceil(n / cols);
  const w = n === 4 ? 36 : n === 9 ? 24 : 12;
  const h = n === 24 ? 6 : 8;
  const hit = n === 4 ? 1 : n === 9 ? 4 : 13;
  return (
    <Board x={34} y={4} w={92} h={58}>
      <Txt x={80} y={11} size={3.8} anchor="middle" c="#556274">{`${n} ENTRIES`}</Txt>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={40 + (i % cols) * (w + 2)} y={16 + Math.floor(i / cols) * (h + 2)} width={w} height={h} fill={i === hit ? "#F2C14E" : NEU} />
      ))}
      <Txt x={80} y={16 + rows * (h + 2) + 6} size={3.4} anchor="middle">{n === 24 ? "CONTRACTS HIDES IN THE CROWD" : "CONTRACTS IS EASY TO SEE"}</Txt>
    </Board>
  );
}

/** One LearnLoop lesson: read only, a question with an explained answer, or points for clicks. */
function LessonBoard({ kind }: { kind: "read" | "ask" | "clicks" }) {
  return (
    <Board x={34} y={4} w={92} h={58}>
      <rect x={34} y={4} width={92} height={5} fill="#3F4A58" />
      <Txt x={80} y={8} size={3.4} anchor="middle" c="#FFFFFF">LESSON 3</Txt>
      <Lines x={38} y={14} w={84} n={kind === "read" ? 6 : 3} gap={3.4} />
      {kind === "read" && (
        <g>
          <Chip x={84} y={48} w={38} h={8} c="#3F4A58" />
          <Txt x={103} y={53.8} size={3.4} anchor="middle" c="#FFFFFF">NEXT</Txt>
        </g>
      )}
      {kind === "ask" && (
        <g>
          <rect x={38} y={28} width={84} height={26} fill="#F3F6FA" />
          <Txt x={41} y={34} size={3.4}>WHO NAMES THE FIRST NUMBER?</Txt>
          <Chip x={41} y={37} w={16} h={6} c="#B5D4F4" />
          <Txt x={49} y={41.6} size={3} anchor="middle">YOU</Txt>
          <Chip x={60} y={37} w={26} h={6} c="#B5D4F4" />
          <Txt x={73} y={41.6} size={3} anchor="middle">THE OTHER SIDE</Txt>
          <Txt x={41} y={49} size={3} c="#2E7D55">WHY A IS RIGHT, THEN NEXT</Txt>
        </g>
      )}
      {kind === "clicks" && (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <Chip x={40 + i * 26} y={30} w={22} h={8} c="#F2C14E" />
              <Txt x={51 + i * 26} y={35.8} size={3} anchor="middle">+10 POINTS</Txt>
            </g>
          ))}
          <Txt x={80} y={48} size={3.4} anchor="middle" c="#556274">BUSY, BUT WHAT WAS LEARNED?</Txt>
        </g>
      )}
    </Board>
  );
}

/** The end of a quiz: a score, with an explanation, a next step and a different kind of task added one by one. */
function EndBoard({ result, next, variety }: { result: boolean; next: boolean; variety: boolean }) {
  return (
    <Board x={34} y={4} w={92} h={58}>
      <rect x={34} y={4} width={92} height={5} fill="#3F4A58" />
      <Txt x={80} y={8} size={3.4} anchor="middle" c="#FFFFFF">QUIZ DONE</Txt>
      <Txt x={80} y={22} size={9} anchor="middle">6 OF 10</Txt>
      {result ? (
        <g>
          <Lines x={40} y={27} w={80} n={2} gap={3.4} c="#2E7D55" />
          <Txt x={40} y={39} size={3.2} c="#2E7D55">WHY YOU MISSED 4</Txt>
        </g>
      ) : (
        <Txt x={80} y={30} size={3.6} anchor="middle" c="#556274">WELL DONE</Txt>
      )}
      {next && (
        <g>
          <Chip x={40} y={44} w={40} h={8} c="#3F4A58" />
          <Txt x={60} y={49.8} size={3.2} anchor="middle" c="#FFFFFF">NEXT: LESSON 4</Txt>
        </g>
      )}
      {variety && (
        <g>
          <Chip x={84} y={44} w={38} h={8} c="#B5D4F4" />
          <Txt x={103} y={49.8} size={3} anchor="middle">SCENARIO TASK</Txt>
        </g>
      )}
    </Board>
  );
}

/** The chain from orientation to activation to engagement, with the point where a quiz would land. */
function ChainBoard({ quiz }: { quiz?: boolean }) {
  return (
    <Board x={30} y={4} w={100} h={58}>
      {["ORIENTATION", "ACTIVATION", "ENGAGEMENT"].map((l, i) => (
        <g key={l}>
          <Chip x={34 + i * 32} y={20} w={28} h={10} c={i === 0 ? OK : i === 1 ? "#B5D4F4" : "#F2E2A8"} />
          <Txt x={48 + i * 32} y={27} size={3.1} anchor="middle">{l}</Txt>
          {i < 2 && <Arrow x={62 + i * 32} y={23} />}
        </g>
      ))}
      <Txt x={80} y={44} size={3.8} anchor="middle" c="#556274">{quiz ? "A QUIZ ON A LOST LEARNER" : "STRUCTURE GUIDES"}</Txt>
      {quiz ? <Cross x={79} y={48} /> : <Txt x={80} y={52} size={3.8} anchor="middle" c="#556274">INTERACTION ACTIVATES</Txt>}
    </Board>
  );
}

/** Five LearnLoop designs by the guidance the learner gets (to the right) and the freedom they keep (upwards). */
function FreedomMatrix({ hi }: { hi?: string[] }) {
  const dots: [string, number, number][] = [["A", 0.9, 0.12], ["B", 0.1, 0.9], ["C", 0.82, 0.84], ["D", 0.62, 0.3], ["E", 0.15, 0.34]];
  const px = (x: number) => 48 + x * 72;
  const py = (y: number) => 46 - y * 34;
  return (
    <Board x={28} y={4} w={104} h={58}>
      <rect x={44} y={10} width={1} height={44} fill={K} />
      <rect x={44} y={54} width={84} height={1} fill={K} />
      <Txt x={86} y={60} size={3.6} anchor="middle" c="#556274">GUIDANCE →</Txt>
      <Txt x={30} y={26} size={3} c="#556274">FREEDOM</Txt>
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

export const ART_D9: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Duo label={tt("Ana wants her certificate. The menu is one flat row, and the same course appears twice under different names", "Ana will ihr Zertifikat. Das Menü ist eine flache Reihe, und derselbe Kurs steht zweimal unter verschiedenen Namen")} left={{ who: "ana", face: "worried" }}>
      <IaBoard grouped={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a1-2": (
    <Duo label={tt("The same items under Learn, Find, Progress and Help: Ana opens Progress and finds it", "Dieselben Einträge unter Lernen, Finden, Fortschritt und Hilfe: Ana öffnet Fortschritt und findet es")} left={{ who: "ana", face: "happy", pose: "up" }}>
      <IaBoard grouped />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a1-3": (
    <Duo label={tt("Three principles: clear hierarchies, logical grouping, a reduction of complexity", "Drei Prinzipien: klare Hierarchien, logische Gruppierung, eine Reduktion der Komplexität")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="THREE PRINCIPLES" items={[{ icon: "book", text: "CLEAR HIERARCHIES" }, { icon: "gear", text: "LOGICAL GROUPING" }, { icon: "down", text: "LESS COMPLEXITY" }]} sub="CAN IT BE FOUND AND UNDERSTOOD?" />
    </Duo>
  ),
  "a1-4": (
    <Duo label={tt("Judge a structure on two goals, give every item one home, and check it with learners", "Eine Struktur an zwei Zielen beurteilen, jedem Eintrag einen Ort geben und sie mit Lernenden prüfen")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="JUDGE A STRUCTURE" items={[{ tick: true, text: "CAN IT BE FOUND?" }, { tick: true, text: "ONE HOME PER ITEM" }, { tick: true, text: "TEST WITH LEARNERS" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Duo label={tt("Sam wants the lesson on contracts. The menu has four entries, and he knows where to go", "Sam will die Lektion zu Verträgen. Das Menü hat vier Einträge, und er weiß, wohin")} left={{ who: "sam", face: "happy" }}>
      <MenuBoard n={4} />
    </Duo>
  ),
  "a2-2": (
    <Duo label={tt("The platform has grown: 24 small entries, and “Contracts” hides among them", "Die Plattform ist gewachsen: 24 kleine Einträge, und „Verträge“ versteckt sich darunter")} left={{ who: "sam", face: "worried" }}>
      <MenuBoard n={24} />
      <Mark x={9} y={34} kind="sweat" />
    </Duo>
  ),
  "a2-3": (
    <Duo label={tt("Nine entries is a middle case: Sam can manage, but it takes longer", "Neun Einträge sind ein Mittelfall: Sam kommt zurecht, aber es dauert länger")} left={{ who: "sam", face: "neutral" }}>
      <MenuBoard n={9} />
    </Duo>
  ),
  "a2-4": (
    <Duo label={tt("Three kinds of navigation: the menu, the path and the progress indicator", "Drei Arten von Navigation: das Menü, der Pfad und die Fortschrittsanzeige")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="THREE KINDS" items={[{ icon: "eye", text: "MENU: WHERE CAN I GO?" }, { icon: "pencil", text: "PATH: WHERE AM I?" }, { icon: "chart", text: "PROGRESS: HOW FAR?" }, { icon: "play", text: "NEXT STEP: WHAT NEXT?" }]} />
    </Duo>
  ),
  "a2-5": (
    <Duo label={tt("Sort a navigation fact by what the learner cannot do: choose, tell what is behind a name, or tell where they are", "Einen Navigationsfakt danach ordnen, was die Lernende nicht kann: wählen, sagen, was hinter einem Namen steckt, oder sagen, wo sie ist")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="THREE MISTAKES" items={[{ cross: true, text: "TOO MANY OPTIONS" }, { cross: true, text: "UNCLEAR LABELS" }, { cross: true, text: "NO ORIENTATION" }]} sub="CUT, GROUP, RENAME, SHOW POSITION" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Duo label={tt("Lea reads a lesson and presses Next. Nothing shows whether she took it in", "Lea liest eine Lektion und drückt Weiter. Nichts zeigt, ob sie es aufgenommen hat")} left={{ who: "lea", face: "neutral" }}>
      <LessonBoard kind="read" />
    </Duo>
  ),
  "a3-2": (
    <Duo label={tt("One question tied to the lesson, an explained answer and a next step: Lea thinks and learns", "Eine Frage zur Lektion, eine erklärte Antwort und ein nächster Schritt: Lea denkt und lernt")} left={{ who: "lea", face: "happy", pose: "up" }}>
      <LessonBoard kind="ask" />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a3-3": (
    <Duo label={tt("Points for opening a page and pressing a button: Lea is busy, but learns nothing", "Punkte fürs Öffnen einer Seite und Drücken eines Buttons: Lea ist beschäftigt, lernt aber nichts")} left={{ who: "lea", face: "worried" }}>
      <LessonBoard kind="clicks" />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a3-4": (
    <Duo label={tt("Ask of every interaction what the learner thinks about, and what answers back", "Bei jeder Interaktion fragen, worüber die Lernende nachdenkt und was zurückantwortet")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="INTERACTION" items={[{ tick: true, text: "TIED TO A GOAL" }, { tick: true, text: "ANSWERS BACK" }, { cross: true, text: "NOT AN END IN ITSELF" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Duo label={tt("Ben finishes a quiz: 6 of 10 and a cheerful “Well done”, but no reason for the four misses and no next step", "Ben beendet ein Quiz: 6 von 10 und ein fröhliches „Gut gemacht“, aber kein Grund für die vier Fehler und kein nächster Schritt")} left={{ who: "ben", face: "worried" }}>
      <EndBoard result={false} next={false} variety={false} />
    </Duo>
  ),
  "a4-2": (
    <Duo label={tt("The page explains the missed questions and adds “Next: lesson 4”", "Die Seite erklärt die verpassten Fragen und ergänzt „Weiter: Lektion 4“")} left={{ who: "ben", face: "happy" }}>
      <EndBoard result next variety={false} />
    </Duo>
  ),
  "a4-3": (
    <Duo label={tt("The next task is a different kind: a short scenario in which Ben is the buyer", "Die nächste Aufgabe ist von anderer Art: ein kurzes Szenario, in dem Ben der Käufer ist")} left={{ who: "ben", face: "happy", pose: "up" }}>
      <EndBoard result next variety />
    </Duo>
  ),
  "a4-4": (
    <Duo label={tt("Three engagement strategies: activate the user, give feedback and reward, avoid monotony", "Drei Engagement-Strategien: den Nutzer aktivieren, Rückmeldung und Belohnung geben, Monotonie vermeiden")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="ENGAGEMENT" items={[{ icon: "play", text: "ACTIVATE THE USER" }, { icon: "check", text: "FEEDBACK THAT EXPLAINS" }, { icon: "idea", text: "VARY THE TASK" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Duo label={tt("LearnLoop's learners get lost in the menu and rarely interact. Three ideas are on the table", "LearnLoops Lernende verirren sich im Menü und interagieren selten. Drei Ideen liegen auf dem Tisch")} left={{ who: "priya", face: "think" }} right={{ who: "dana", face: "think" }}>
      <Notes x={36} y={6} w={90} title="LEARNLOOP · 3 IDEAS" items={[{ icon: "idea", text: "RENAME THE ENTRIES" }, { icon: "idea", text: "GROUP THE MENU" }, { icon: "idea", text: "BADGES FOR CLICKS" }]} sub="LOST IN THE MENU · LITTLE INTERACTION" />
    </Duo>
  ),
  "a5-2": (
    <Duo label={tt("Rename the entries: a medium learning impact, a low effort, a low risk", "Die Einträge umbenennen: mittlere Lernwirkung, geringer Aufwand, geringes Risiko")} left={{ who: "priya", face: "happy" }}>
      <Rate x={44} y={4} title="RENAME THE ENTRIES" rows={[["IMPACT", 2, "MID"], ["EFFORT", 1, "LOW"], ["RISK", 1, "LOW"]]} />
    </Duo>
  ),
  "a5-3": (
    <Duo label={tt("Group the menu into four sections: a high learning impact, a high effort, a medium risk", "Das Menü in vier Bereiche gruppieren: hohe Lernwirkung, hoher Aufwand, mittleres Risiko")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Rate x={44} y={4} title="GROUP THE MENU" rows={[["IMPACT", 3, "HIGH"], ["EFFORT", 3, "HIGH"], ["RISK", 2, "MID"]]} />
    </Duo>
  ),
  "a5-4": (
    <Duo label={tt("Badges for every click: a low learning impact, a medium effort, a high risk", "Abzeichen für jeden Klick: geringe Lernwirkung, mittlerer Aufwand, hohes Risiko")} left={{ who: "priya", face: "worried" }}>
      <Rate x={44} y={4} title="BADGES FOR CLICKS" rows={[["IMPACT", 1, "LOW"], ["EFFORT", 2, "MID"], ["RISK", 3, "HIGH"]]} />
    </Duo>
  ),
  "a5-5": (
    <Duo label={tt("Rate each measure on learning impact, effort and risk, with a reason: structure before interaction", "Jede Maßnahme nach Lernwirkung, Aufwand und Risiko bewerten, mit einem Grund: Struktur vor Interaktion")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="RATE EACH MEASURE" items={[{ icon: "up", text: "IMPACT: FIND, THEN LEARN" }, { icon: "clock", text: "EFFORT: WORK AND TIME" }, { icon: "warn", text: "RISK: A BURDEN?" }]} sub="STRUCTURE BEFORE INTERACTION" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Duo label={tt("The head of product asks why the team should not simply add quizzes", "Die Leiterin Produkt fragt, warum das Team nicht einfach Quizze ergänzen soll")} left={{ who: "dana", face: "worried" }} right={{ who: "priya", face: "think" }}>
      <Board x={56} y={10} w={48} h={34}>
        <Icon x={76} y={16} name="ask" />
        <Txt x={80} y={36} size={4.4} anchor="middle">JUST ADD QUIZZES?</Txt>
      </Board>
    </Duo>
  ),
  "b1-2": (
    <Duo label={tt("Structure guides, interaction activates: orientation first, then activation, then engagement", "Struktur führt, Interaktion aktiviert: erst Orientierung, dann Aktivierung, dann Engagement")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <ChainBoard />
    </Duo>
  ),
  "b1-3": (
    <Duo label={tt("A quiz on a platform nobody can find their way in adds a click to a lost learner", "Ein Quiz auf einer Plattform, auf der sich niemand zurechtfindet, fügt einer verlorenen Lernenden einen Klick hinzu")} left={{ who: "dana", face: "surprised" }}>
      <ChainBoard quiz />
    </Duo>
  ),
  "b1-4": (
    <Duo label={tt("Order the work as the chain runs: structure, navigation, then interaction", "Die Arbeit ordnen, wie die Kette läuft: Struktur, Navigation, dann Interaktion")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="ORDER OF THE WORK" items={[{ tick: true, text: "1 · STRUCTURE" }, { tick: true, text: "2 · NAVIGATION" }, { tick: true, text: "3 · INTERACTION" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Stage label={tt("Five designs by the guidance the learner gets and the freedom they keep", "Fünf Entwürfe nach der Führung, die die Lernende bekommt, und der Freiheit, die sie behält")}>
      <FreedomMatrix />
      <Person x={2} y={40} who="priya" face="think" />
    </Stage>
  ),
  "b2-2": (
    <Stage label={tt("A fixed path leaves no freedom, and everything open gives no guidance", "Ein fester Pfad lässt keine Freiheit, und alles offen gibt keine Führung")}>
      <FreedomMatrix hi={["A", "B"]} />
      <Person x={2} y={40} who="dana" face="surprised" />
    </Stage>
  ),
  "b2-3": (
    <Stage label={tt("A recommended path with free access and a skip button is guided and free", "Ein empfohlener Pfad mit freiem Zugang und einem Überspringen-Button ist geführt und frei")}>
      <FreedomMatrix hi={["C"]} />
      <Person x={2} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),
  "b2-4": (
    <Duo label={tt("Name both risks, over-structuring and over-interaction, and cap the interaction per lesson", "Beide Risiken nennen, Überstrukturierung und Überinteraktion, und die Interaktion pro Lektion begrenzen")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="TWO RISKS" items={[{ cross: true, text: "OVER-STRUCTURING" }, { cross: true, text: "OVER-INTERACTION" }, { tick: true, text: "GUIDED AND FREE" }]} sub="MOST OPTIONAL, CAPPED PER LESSON" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Duo label={tt("The platform does not record the path a learner takes, and the decision cannot wait", "Die Plattform erfasst den Weg einer Lernenden nicht, und die Entscheidung kann nicht warten")} left={{ who: "dana", face: "worried" }} right={{ who: "priya", face: "think" }}>
      <Board x={50} y={10} w={60} h={34}>
        <Icon x={76} y={16} name="lock" />
        <Txt x={80} y={36} size={4.2} anchor="middle">NO PATH DATA YET</Txt>
      </Board>
    </Duo>
  ),
  "b3-2": (
    <Duo label={tt("A decision under uncertainty states four things: decide, do not know, reverse if, give up", "Eine Entscheidung unter Unsicherheit nennt vier Dinge: entscheiden, nicht wissen, zurücknehmen, wenn, verzichten")} left={{ who: "priya", face: "think" }}>
      <Notes x={40} y={6} w={112} title="THE DECISION" items={[{ icon: "check", text: "GROUP THE MENU FIRST" }, { icon: "ask", text: "DO NOT KNOW: HELPFUL?" }, { icon: "clock", text: "REVERSE IF MANY SKIP" }, { icon: "lock", text: "GIVE UP THE POINTS" }]} />
    </Duo>
  ),
  "b3-3": (
    <Duo label={tt("A rule for future decisions: who decides and on what evidence", "Eine Regel für künftige Entscheidungen: wer entscheidet und auf welcher Grundlage")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="THE RULE FOR NEXT TIME" items={[{ icon: "ask", text: "UX LEAD WITH PRODUCT" }, { icon: "chart", text: "TREE TEST, SKIP RATE" }]} sub="AND TASK SUCCESS" />
    </Duo>
  ),
  "b3-4": (
    <Duo label={tt("Decide now, say what you do not know, and name the sign and the time to check", "Jetzt entscheiden, sagen, was Sie nicht wissen, und das Zeichen und den Zeitpunkt zur Prüfung nennen")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="DECIDE, THEN CHECK" items={[{ tick: true, text: "STATE FOUR THINGS" }, { tick: true, text: "A SIGN AND A DATE" }, { tick: true, text: "CHECK WITH THE RULE" }]} />
    </Duo>
  ),
};
