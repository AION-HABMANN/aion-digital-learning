import type { ReactNode } from "react";
import { Arrow, Bar, Board, Chip, Cross, Icon, K, LOOK, Lines, Mark, Mon, Person, Stage, Tick, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes, Page, Rate } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 8 comics (data/day8/comics.ts, DL-STANDARD.md section 13). People: Tom, Mia and Noor (learners of LearnLoop), Priya (LearnLoop's UX
 * lead) and Dana (head of product), all made up. Every label is a short capital word with a German entry in pixelLabels.ts.
 */
LOOK.tom = { hair: "#2B2B2B", shirt: "#2E9E6B", skin: "#C68A5A" };
LOOK.mia = { hair: "#5A3A22", shirt: "#3D7BD9", long: true };
LOOK.noor = { hair: "#1B1B22", shirt: "#2B8A6E", long: true, skin: "#C8946A" };
LOOK.priya = { hair: "#1B1B22", shirt: "#2B8A6E", long: true, skin: "#C8946A" };
LOOK.dana = { hair: "#5A3A22", shirt: "#8A63D2", long: true };

const COL = ["#E4572E", "#F3A712", "#29A19C", "#7A4DE8", "#D9534F", "#3D7BD9"];

/** A LearnLoop lesson screen: a menu with the marked entry, an optional path above the text, an optional Next button. */
function Lesson({ marked, path, next }: { marked: "home" | "learn"; path: boolean; next: boolean }) {
  return (
    <Board x={36} y={4} w={88} h={58}>
      <rect x={36} y={4} width={88} height={5} fill="#3F4A58" />
      {["HOME", "LEARN", "FIND", "HELP"].map((l, i) => (
        <g key={l}>
          <rect x={38 + i * 21} y={11} width={19} height={6} fill={(marked === "home" && i === 0) || (marked === "learn" && i === 1) ? "#3F4A58" : "#E4E8EE"} />
          <Txt x={47.5 + i * 21} y={15.6} size={3.2} anchor="middle" c={(marked === "home" && i === 0) || (marked === "learn" && i === 1) ? "#FFFFFF" : K}>{l}</Txt>
        </g>
      ))}
      {path && <Txt x={40} y={24} size={3.4} c="#556274">LEARN › BASICS › LESSON 3 OF 8</Txt>}
      <Lines x={40} y={path ? 29 : 25} w={80} n={6} gap={3.4} />
      {next && (
        <g>
          <Chip x={78} y={50} w={42} h={8} c="#3F4A58" />
          <Txt x={99} y={55.8} size={3.4} anchor="middle" c="#FFFFFF">NEXT: LESSON 4</Txt>
        </g>
      )}
    </Board>
  );
}

/** The start page of a course: seven colours, three banners and five equal buttons (`calm` false), or one main thing (`calm` true). */
function CoursePage({ calm }: { calm: boolean }) {
  return (
    <Board x={40} y={4} w={80} h={58}>
      <rect x={40} y={4} width={80} height={5} fill="#3F4A58" />
      <Txt x={80} y={8} size={3.4} anchor="middle" c="#FFFFFF">COURSE PAGE</Txt>
      {calm ? (
        <g>
          <Lines x={46} y={14} w={68} n={3} gap={3.6} />
          <Chip x={46} y={28} w={48} h={9} c="#3F4A58" />
          <Txt x={70} y={34.2} size={3.8} anchor="middle" c="#FFFFFF">CONTINUE: LESSON 3</Txt>
          <Txt x={46} y={44} size={3.6} c="#556274">NOTES · SHARE</Txt>
          <Bar x={46} y={50} w={68} p={0.4} c="#3F4A58" />
        </g>
      ) : (
        <g>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={44} y={12 + i * 7} width={72} height={6} fill={COL[i]} />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={44 + (i % 3) * 25} y={36 + Math.floor(i / 3) * 11} width={22} height={9} fill={COL[(i + 3) % 6]} />
          ))}
          <Txt x={80} y={59} size={3.4} anchor="middle" c="#556274">5 EQUAL BUTTONS</Txt>
        </g>
      )}
    </Board>
  );
}

/** A Save button in three states (card A3): answered at once, answered after a second with a spinner, or no sign. */
function SaveButton({ kind }: { kind: "now" | "wait" | "none" }) {
  return (
    <Board x={42} y={10} w={76} h={42}>
      <Txt x={46} y={20} size={4} c="#556274">MY NOTE</Txt>
      <Lines x={46} y={24} w={68} n={2} gap={4} />
      <Chip x={64} y={36} w={40} h={10} c={kind === "now" ? "#B5E3C8" : kind === "wait" ? "#FFE48A" : "#B5D4F4"} />
      <Txt x={84} y={43} size={4.2} anchor="middle">{kind === "now" ? "SAVED ✓" : kind === "wait" ? "SAVING…" : "SAVE"}</Txt>
    </Board>
  );
}

/** Five options by the clutter they remove (to the right) and the guidance they keep (upwards) (card B2). */
function ClutterMatrix({ hi }: { hi?: string[] }) {
  const dots: [string, number, number][] = [["A", 0.7, 0.74], ["B", 0.94, 0.18], ["C", 0.1, 0.28], ["D", 0.18, 0.62], ["E", 0.82, 0.9]];
  const px = (x: number) => 48 + x * 72;
  const py = (y: number) => 46 - y * 34;
  return (
    <Board x={28} y={4} w={104} h={58}>
      <rect x={44} y={10} width={1} height={44} fill={K} />
      <rect x={44} y={54} width={84} height={1} fill={K} />
      <Txt x={86} y={60} size={3.6} anchor="middle" c="#556274">CLUTTER REMOVED →</Txt>
      <Txt x={31} y={26} size={3} c="#556274">GUIDANCE</Txt>
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

export const ART_D8: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Duo label={tt("Tom is lost in lesson 3: the menu marks Home, there is no path, and the text ends without a button", "Tom ist in Lektion 3 verloren: Das Menü markiert Start, es gibt keinen Pfad, und der Text endet ohne Button")} left={{ who: "tom", face: "worried" }}>
      <Lesson marked="home" path={false} next={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a1-2": (
    <Duo label={tt("LearnLoop marks Learn and adds a path above the lesson: Tom knows where he is", "LearnLoop markiert Lernen und ergänzt einen Pfad über der Lektion: Tom weiß, wo er ist")} left={{ who: "tom", face: "happy" }}>
      <Lesson marked="learn" path next={false} />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a1-3": (
    <Duo label={tt("A Next button at the end of the text tells Tom what comes next", "Ein Weiter-Button am Ende des Textes sagt Tom, was als Nächstes kommt")} left={{ who: "tom", face: "happy", pose: "up" }}>
      <Lesson marked="learn" path next />
    </Duo>
  ),
  "a1-4": (
    <Duo label={tt("An information architecture: four sections named after what the learner does, each item with one home", "Eine Informationsarchitektur: vier Bereiche, benannt nach dem, was die Lernende tut, jeder Eintrag mit einem Ort")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="FOUR SECTIONS" items={[{ icon: "book", text: "LEARN: CONTINUE, MY COURSES" }, { icon: "eye", text: "FIND: CATALOGUE, SEARCH" }, { icon: "chart", text: "PROGRESS: PER COURSE" }, { icon: "ask", text: "HELP: CONTACT, ACCOUNT" }]} />
    </Duo>
  ),
  "a1-5": (
    <Duo label={tt("Check a navigation with three questions: where am I, where can I go, what comes next", "Eine Navigation mit drei Fragen prüfen: Wo bin ich, wohin kann ich, was kommt als Nächstes")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="THREE QUESTIONS" items={[{ tick: true, text: "WHERE AM I?" }, { tick: true, text: "WHERE CAN I GO?" }, { tick: true, text: "WHAT COMES NEXT?" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Duo label={tt("Mia's course page: seven colours, three banners and five equal buttons", "Mias Kursseite: sieben Farben, drei Banner und fünf gleiche Buttons")} left={{ who: "mia", face: "worried" }}>
      <CoursePage calm={false} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a2-2": (
    <Duo label={tt("The same page with one filled button, quiet links and a progress bar", "Dieselbe Seite mit einem gefüllten Button, ruhigen Links und einem Fortschrittsbalken")} left={{ who: "mia", face: "happy" }}>
      <CoursePage calm />
      <Tick x={9} y={34} />
    </Duo>
  ),
  "a2-3": (
    <Duo label={tt("The tools of visual design: size, colour, contrast and position, plus legibility, consistency and reduction", "Die Werkzeuge des visuellen Designs: Größe, Farbe, Kontrast und Position, dazu Lesbarkeit, Konsistenz und Reduktion")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Notes x={40} y={6} w={112} title="VISUAL DESIGN" items={[{ icon: "eye", text: "SIZE, COLOUR, CONTRAST" }, { icon: "book", text: "LEGIBLE TEXT" }, { icon: "gear", text: "SAME FUNCTION, SAME STYLE" }, { icon: "down", text: "REDUCE TO THE ESSENTIALS" }]} />
    </Duo>
  ),
  "a2-4": (
    <Duo label={tt("Name the one main thing on a screen, and do not expect a visual fix to repair a structural problem", "Die eine Hauptsache auf einem Bildschirm nennen, und von einer visuellen Behebung kein Reparieren eines Strukturproblems erwarten")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="THE ONE MAIN THING" items={[{ tick: true, text: "NAME IT ON EACH SCREEN" }, { tick: true, text: "SAME STYLE, SAME JOB" }, { cross: true, text: "SURFACE ≠ STRUCTURE" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Duo label={tt("Noor presses Save and the button answers at once: Saved", "Noor drückt Speichern, und der Button antwortet sofort: Gespeichert")} left={{ who: "noor", face: "happy" }}>
      <SaveButton kind="now" />
    </Duo>
  ),
  "a3-2": (
    <Duo label={tt("The save takes about a second; the button shows Saving with a spinner", "Das Speichern dauert etwa eine Sekunde; der Button zeigt Speichern mit einem Kreisel")} left={{ who: "noor", face: "neutral" }}>
      <SaveButton kind="wait" />
      <Icon x={122} y={26} name="clock" />
    </Duo>
  ),
  "a3-3": (
    <Duo label={tt("Nothing changes for ten seconds: Noor presses again and is unsure her work is safe", "Zehn Sekunden lang ändert sich nichts: Noor drückt nochmals und ist unsicher, ob ihre Arbeit sicher ist")} left={{ who: "noor", face: "worried" }}>
      <SaveButton kind="none" />
      <Mark x={9} y={34} kind="sweat" />
      <Icon x={122} y={26} name="warn" />
    </Duo>
  ),
  "a3-4": (
    <Duo label={tt("One strong call to action says what to do next", "Eine starke Handlungsaufforderung sagt, was als Nächstes zu tun ist")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Board x={46} y={10} w={100} h={42}>
        <Chip x={52} y={16} w={60} h={12} c="#3F4A58" />
        <Txt x={82} y={24} size={4.4} anchor="middle" c="#FFFFFF">CONTINUE: LESSON 4</Txt>
        <Txt x={52} y={38} size={4} c="#556274">NOTES · SHARE · SAVE FOR LATER</Txt>
        <Txt x={52} y={46} size={3.6} c="#556274">ONE MAIN ACTION, THE REST QUIET</Txt>
      </Board>
    </Duo>
  ),
  "a3-5": (
    <Duo label={tt("Three jobs of interaction design: operability, a clear call to action, feedback", "Drei Aufgaben des Interaktionsdesigns: Bedienbarkeit, eine klare Handlungsaufforderung, Rückmeldung")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="INTERACTION" items={[{ tick: true, text: "LOOKS LIKE WHAT IT DOES" }, { tick: true, text: "ONE MAIN BUTTON" }, { tick: true, text: "AN ANSWER AT ONCE" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Duo label={tt("Unclear navigation: the learner cannot say where they are or where something is", "Unklare Navigation: Die Lernende kann nicht sagen, wo sie ist oder wo etwas liegt")} left={{ who: "tom", face: "worried" }}>
      <Notes x={44} y={8} w={104} title="UNCLEAR NAVIGATION" items={[{ cross: true, text: "THE SAME ITEM, 3 NAMES" }, { cross: true, text: "BACK GOES ELSEWHERE" }, { icon: "clock", text: "EFFORT GOES INTO FINDING" }]} />
    </Duo>
  ),
  "a4-2": (
    <Duo label={tt("Visual overload: many elements of the same weight compete and the key point is lost", "Visuelle Überladung: Viele Elemente gleichen Gewichts konkurrieren, und der Kernpunkt geht verloren")} left={{ who: "mia", face: "worried" }}>
      <Notes x={44} y={8} w={104} title="VISUAL OVERLOAD" items={[{ cross: true, text: "MANY ELEMENTS, ONE WEIGHT" }, { cross: true, text: "NO MAIN THING" }, { icon: "eye", text: "THE KEY POINT IS LOST" }]} />
    </Duo>
  ),
  "a4-3": (
    <Duo label={tt("Inconsistent design: the same function looks or works differently on different screens", "Inkonsistentes Design: Dieselbe Funktion sieht auf verschiedenen Bildschirmen anders aus oder funktioniert anders")} left={{ who: "noor", face: "worried" }}>
      <Notes x={44} y={8} w={104} title="INCONSISTENT DESIGN" items={[{ cross: true, text: "SAVE: BLUE HERE, GREY THERE" }, { cross: true, text: "ONE NAME, TWO JOBS" }, { icon: "book", text: "EACH SCREEN IS LEARNED AGAIN" }]} />
    </Duo>
  ),
  "a4-4": (
    <Duo label={tt("Each mistake takes attention: name the cost in attention and working memory, not in taste", "Jeder Fehler nimmt Aufmerksamkeit: Nennen Sie die Kosten in Aufmerksamkeit und Arbeitsgedächtnis, nicht in Geschmack")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="NAME THE COST" items={[{ tick: true, text: "ATTENTION IS SCARCE" }, { tick: true, text: "WORKING MEMORY (DAY 3)" }, { cross: true, text: "NOT: I DON'T LIKE IT" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Duo label={tt("LearnLoop has three ideas, three weeks, beginners and a high drop-out rate", "LearnLoop hat drei Ideen, drei Wochen, Einsteiger und eine hohe Abbruchrate")} left={{ who: "priya", face: "think" }} right={{ who: "dana", face: "think" }}>
      <Notes x={36} y={6} w={90} title="LEARNLOOP · 3 IDEAS" items={[{ icon: "idea", text: "FEWER COLOURS, BANNERS" }, { icon: "idea", text: "REBUILD NAVIGATION" }, { icon: "idea", text: "ANIMATED PICTURES" }]} sub="3 WEEKS · BEGINNERS" />
    </Duo>
  ),
  "a5-2": (
    <Duo label={tt("Fewer colours and banners: a medium impact, a low effort, a low risk", "Weniger Farben und Banner: mittlere Wirkung, geringer Aufwand, geringes Risiko")} left={{ who: "priya", face: "happy" }}>
      <Rate x={44} y={4} title="FEWER COLOURS, BANNERS" rows={[["IMPACT", 2, "MID"], ["EFFORT", 1, "LOW"], ["RISK", 1, "LOW"]]} />
    </Duo>
  ),
  "a5-3": (
    <Duo label={tt("Rebuild the navigation: a high impact, a high effort, a medium risk", "Die Navigation umbauen: hohe Wirkung, hoher Aufwand, mittleres Risiko")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Rate x={44} y={4} title="REBUILD NAVIGATION" rows={[["IMPACT", 3, "HIGH"], ["EFFORT", 3, "HIGH"], ["RISK", 2, "MID"]]} />
    </Duo>
  ),
  "a5-4": (
    <Duo label={tt("Rate each measure on user impact, effort and risk, with a reason: structure usually beats surface", "Jede Maßnahme nach Nutzerwirkung, Aufwand und Risiko bewerten, mit einem Grund: Struktur schlägt meist Oberfläche")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="RATE EACH MEASURE" items={[{ icon: "up", text: "IMPACT: ORIENTATION, ACTION" }, { icon: "clock", text: "EFFORT: WORK AND TIME" }, { icon: "warn", text: "RISK: MORE CLUTTER?" }]} sub="STRUCTURE BEFORE SURFACE" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Duo label={tt("The head of product asks why structure should come before the new look", "Die Leiterin Produkt fragt, warum die Struktur vor dem neuen Look kommen soll")} left={{ who: "dana", face: "worried" }} right={{ who: "priya", face: "think" }}>
      <Board x={56} y={10} w={48} h={34}>
        <Icon x={76} y={16} name="ask" />
        <Txt x={80} y={36} size={4.4} anchor="middle">LOOK FIRST?</Txt>
      </Board>
    </Duo>
  ),
  "b1-2": (
    <Duo label={tt("From structure to learning success: structure, orientation, behaviour, learning result", "Von der Struktur zum Lernerfolg: Struktur, Orientierung, Verhalten, Lernergebnis")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Board x={38} y={10} w={114} h={34}>
        {["STRUCTURE", "ORIENT.", "BEHAVIOUR", "RESULT"].map((l, i) => (
          <g key={l}>
            <Chip x={42 + i * 28} y={18} w={24} h={10} c="#B5D4F4" />
            <Txt x={54 + i * 28} y={25} size={3.2} anchor="middle">{l}</Txt>
            {i < 3 && <Arrow x={66 + i * 28} y={21} />}
          </g>
        ))}
        <Txt x={95} y={39} size={3.8} anchor="middle" c="#556274">FIX THE LEFT END FIRST</Txt>
      </Board>
    </Duo>
  ),
  "b1-3": (
    <Duo label={tt("A new look at the right end cannot repair what is wrong at the left", "Ein neuer Look am rechten Ende kann nicht reparieren, was links falsch ist")} left={{ who: "dana", face: "surprised" }}>
      <Board x={44} y={10} w={104} h={42}>
        <Chip x={50} y={18} w={30} h={10} c="#F6C9B8" />
        <Txt x={65} y={25} size={3.8} anchor="middle">NO STRUCTURE</Txt>
        <Arrow x={84} y={21} />
        <Chip x={96} y={18} w={44} h={10} c="#B5E3C8" />
        <Txt x={118} y={25} size={3.8} anchor="middle">NEW LOOK</Txt>
        <Cross x={116} y={34} />
        <Txt x={96} y={46} size={3.8} c="#556274">STILL CANNOT FIND IT</Txt>
      </Board>
    </Duo>
  ),
  "b1-4": (
    <Duo label={tt("Decide in the order of the chain: structure, then guidance, then the visual style", "In der Reihenfolge der Kette entscheiden: erst Struktur, dann Führung, dann der visuelle Stil")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="DESIGN DECISIONS" items={[{ tick: true, text: "1 · STRUCTURE" }, { tick: true, text: "2 · GUIDANCE" }, { tick: true, text: "3 · VISUAL STYLE" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Stage label={tt("Five options by the clutter they remove and the guidance they keep", "Fünf Optionen nach der Unruhe, die sie entfernen, und der Führung, die sie behalten")}>
      <ClutterMatrix />
      <Person x={2} y={40} who="priya" face="think" />
    </Stage>
  ),
  "b2-2": (
    <Stage label={tt("Stripped down to the course list is calm but loses help; adding banners or a tour stays cluttered", "Auf die Kursliste zurückgebaut ist ruhig, verliert aber Hilfe; Banner oder eine Tour lassen es unruhig")}>
      <ClutterMatrix hi={["B", "C", "D"]} />
      <Person x={2} y={40} who="dana" face="surprised" />
    </Stage>
  ),
  "b2-3": (
    <Stage label={tt("Remove clutter and keep the guidance: hide advanced options behind More", "Unruhe entfernen und die Führung behalten: erweiterte Optionen hinter Mehr legen")}>
      <ClutterMatrix hi={["A", "E"]} />
      <Person x={2} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),
  "b2-4": (
    <Duo label={tt("Name both risks, too complex and too reduced, and aim for calm and guided", "Beide Risiken nennen, zu komplex und zu reduziert, und auf ruhig und geführt zielen")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="TWO RISKS" items={[{ cross: true, text: "TOO COMPLEX" }, { cross: true, text: "TOO REDUCED" }, { tick: true, text: "CALM AND GUIDED" }]} sub="MORE BEHIND “MORE”" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Duo label={tt("There are no user tests yet, and the decision cannot wait", "Es gibt noch keine Nutzertests, und die Entscheidung kann nicht warten")} left={{ who: "dana", face: "worried" }} right={{ who: "priya", face: "think" }}>
      <Board x={52} y={10} w={56} h={34}>
        <Icon x={76} y={16} name="lock" />
        <Txt x={80} y={36} size={4.4} anchor="middle">NO TESTS YET</Txt>
      </Board>
    </Duo>
  ),
  "b3-2": (
    <Duo label={tt("A decision without user tests states four things: decide, do not know, reverse if, give up", "Eine Entscheidung ohne Nutzertests nennt vier Dinge: entscheiden, nicht wissen, zurücknehmen, wenn, verzichten")} left={{ who: "priya", face: "think" }}>
      <Notes x={40} y={6} w={112} title="THE DECISION" items={[{ icon: "check", text: "I DECIDE" }, { icon: "ask", text: "I DO NOT KNOW" }, { icon: "clock", text: "I REVERSE IF …" }, { icon: "lock", text: "I GIVE UP" }]} />
    </Duo>
  ),
  "b3-3": (
    <Duo label={tt("A rule for future decisions: who decides and on what evidence", "Eine Regel für künftige Entscheidungen: wer entscheidet und auf welcher Grundlage")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="THE RULE FOR NEXT TIME" items={[{ icon: "ask", text: "WHO DECIDES" }, { icon: "chart", text: "ON WHAT EVIDENCE" }]} />
    </Duo>
  ),
  "b3-4": (
    <Duo label={tt("Check a structure later with a tree test and task success, and keep design decisions less dependent on taste", "Eine Struktur später mit einem Tree Test und Aufgabenerfolg prüfen und Designentscheidungen weniger vom Geschmack abhängig machen")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="DECIDE, THEN CHECK" items={[{ tick: true, text: "STATE FOUR THINGS" }, { tick: true, text: "A SIGN AND A DATE" }, { tick: true, text: "TREE TEST LATER" }]} />
    </Duo>
  ),
};
