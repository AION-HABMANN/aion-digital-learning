import type { ReactNode } from "react";
import { Arrow, Bar, Board, Chip, Cross, Icon, K, KID_COLOURS, Kid, LOOK, Lines, Mark, Mon, Person, Stage, Tick, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes, Rate } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 7 comics (data/day7/comics.ts, DL-STANDARD.md section 13). People: Ben, Sara and Jo (three people with the same barrier), Lena
 * (a quiz player who cannot use a mouse), Noor and Daniel (learners of LearnLoop), Priya (LearnLoop's UX lead) and Dana (head of product), all made up. Every
 * label is a short capital word with a German entry in pixelLabels.ts.
 */
LOOK.ben = { hair: "#2B2B2B", shirt: "#3D7BD9" };
LOOK.sara = { hair: "#8A4B2A", shirt: "#C0455A", long: true };
LOOK.jo = { hair: "#C9A55A", shirt: "#555B66", cap: "#2F5D9E" };
LOOK.lena = { hair: "#9B4A1E", shirt: "#E07A1F", long: true };
LOOK.noor = { hair: "#1B1B22", shirt: "#2B8A6E", long: true, skin: "#C8946A" };
LOOK.daniel = { hair: "#5A3A22", shirt: "#8A5A2E", skin: "#E8B88F" };
LOOK.priya = { hair: "#1B1B22", shirt: "#2B8A6E", long: true, skin: "#C8946A" };
LOOK.dana = { hair: "#5A3A22", shirt: "#8A63D2", long: true };

/** The reach (to the right) against the cost (upwards) of seven measures (card B2); `hi` marks the ones the story talks about. */
function ReachMatrix({ hi }: { hi?: string[] }) {
  const dots: [string, number, number][] = [["A", 0.8, 0.3], ["B", 0.62, 0.2], ["C", 0.9, 0.46], ["D", 0.5, 0.76], ["E", 0.7, 0.55], ["F", 0.1, 0.9], ["G", 0.34, 0.84]];
  const px = (x: number) => 50 + x * 72;
  const py = (y: number) => 46 - y * 34;
  return (
    <Board x={28} y={4} w={104} h={58}>
      <rect x={44} y={10} width={1} height={44} fill={K} />
      <rect x={44} y={54} width={84} height={1} fill={K} />
      <Txt x={86} y={60} size={3.8} anchor="middle" c="#556274">REACH →</Txt>
      <Txt x={31} y={30} size={3.2} c="#556274">COST</Txt>
      <Txt x={34} y={36} size={4} c="#556274">↑</Txt>
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

/** Learners who finish the main task: one average bar, or one bar per group (card B3). */
function FinishBars({ groups }: { groups: boolean }) {
  const rows: [string, number, string][] = groups ? [["GROUP A", 0.9, "#3D7BD9"], ["GROUP B", 0.8, "#3D7BD9"], ["GROUP C", 0.15, "#D9534F"]] : [["AVERAGE", 0.75, "#3D7BD9"]];
  return (
    <Board x={32} y={6} w={96} h={groups ? 50 : 34}>
      <Txt x={36} y={14} size={4.2} c="#556274">FINISH THE MAIN TASK</Txt>
      {rows.map(([l, p, c], i) => (
        <g key={l}>
          <Txt x={36} y={26 + i * 11} size={4} c="#556274">{l}</Txt>
          <rect x={69} y={21 + i * 11} width={52} height={6} fill="#E0E4EB" />
          <rect x={69} y={21 + i * 11} width={Math.round(52 * p)} height={6} fill={c} />
        </g>
      ))}
    </Board>
  );
}

export const ART_D7: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Duo label={tt("Ben is deaf. A video lesson has no captions and no transcript", "Ben ist gehörlos. Eine Videolektion hat weder Untertitel noch Transkript")} left={{ who: "ben", face: "worried" }}>
      <Mon x={56} y={8} w={60} h={40}>
        <Icon x={81} y={20} name="play" />
        <Txt x={86} y={42} size={4} anchor="middle">NO CAPTIONS</Txt>
        <Cross x={122} y={14} />
      </Mon>
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a1-2": (
    <Duo label={tt("Sara has an ear infection this week. Jo sits on a noisy train. Neither can hear the video", "Sara hat in dieser Woche eine Ohrenentzündung. Jo sitzt in einem lauten Zug. Beide können das Video nicht hören")} left={{ who: "sara", face: "sad" }} right={{ who: "jo", face: "worried" }}>
      <Notes x={30} y={10} w={44} items={[{ icon: "clock", text: "THIS WEEK" }]} title="EAR INFECTION" />
      <Notes x={84} y={10} w={44} items={[{ icon: "warn", text: "NOISE" }]} title="NOISY TRAIN" />
    </Duo>
  ),
  "a1-3": (
    <Stage label={tt("Captions and a transcript: all three can follow the lesson", "Untertitel und ein Transkript: Alle drei können der Lektion folgen")}>
      <Person x={4} y={40} who="ben" face="happy" />
      <Person x={22} y={40} who="sara" face="happy" />
      <Person x={40} y={40} who="jo" face="happy" />
      <Tick x={9} y={34} />
      <Tick x={27} y={34} />
      <Tick x={45} y={34} />
      <Mon x={76} y={8} w={70} h={40}>
        <Icon x={102} y={14} name="play" />
        <rect x={86} y={34} width={50} height={7} fill="#1B1B1F" />
        <Txt x={111} y={40} size={3.8} c="#FFFFFF" anchor="middle">CAPTIONS</Txt>
      </Mon>
      <Person x={148} y={40} who="priya" face="happy" pose="up" flip />
    </Stage>
  ),
  "a1-4": (
    <Duo label={tt("Name each barrier by what it stops, who it affects, and who else gains", "Jede Barriere danach benennen, woran sie hindert, wen sie betrifft und wem sie sonst nützt")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={100} title="NAME THE BARRIER" items={[{ icon: "lock", text: "WHAT IT STOPS" }, { icon: "ask", text: "WHO IT AFFECTS" }, { icon: "heart", text: "WHO ELSE GAINS" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Duo label={tt("Lena cannot use a mouse. The quiz can only be answered by dragging items onto boxes", "Lena kann keine Maus bedienen. Das Quiz lässt sich nur beantworten, indem man Elemente in Kästen zieht")} left={{ who: "lena", face: "sad" }}>
      <Mon x={50} y={6} w={92} h={46}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Chip x={56} y={16 + i * 11} w={26} h={7} c="#E0E4EB" />
            <rect x={106} y={16 + i * 11} width={30} height={7} fill="none" stroke="#8A93A0" strokeWidth={1} strokeDasharray="2 1" />
          </g>
        ))}
        <Arrow x={88} y={25} />
        <Txt x={96} y={49} size={3.8} anchor="middle">DRAG ONLY</Txt>
      </Mon>
      <Cross x={134} y={10} />
    </Duo>
  ),
  "a2-2": (
    <Duo label={tt("Ask what the learner cannot do: see or hear it, use it, follow it", "Fragen Sie, was die Lernende nicht kann: es sehen oder hören, es bedienen, es nachvollziehen")} left={{ who: "priya", face: "think", pose: "point" }}>
      <Notes x={40} y={8} w={110} title="WHAT CAN'T THEY DO?" items={[{ icon: "eye", text: "SEE OR HEAR: PERCEIVABLE" }, { icon: "gear", text: "USE IT: OPERABLE" }, { icon: "ask", text: "FOLLOW: UNDERSTANDABLE" }]} />
    </Duo>
  ),
  "a2-3": (
    <Duo label={tt("The plan names three types of barrier: visual, cognitive and motor", "Der Plan nennt drei Arten von Barrieren: visuell, kognitiv und motorisch")} left={{ who: "priya", face: "happy" }}>
      <Notes x={44} y={8} w={104} title="THREE TYPES" items={[{ icon: "eye", text: "VISUAL: CONTRAST, FONT" }, { icon: "ask", text: "COGNITIVE: COMPLEXITY" }, { icon: "gear", text: "MOTOR: OPERABILITY" }]} />
    </Duo>
  ),
  "a2-4": (
    <Duo label={tt("The quiz also works by keyboard: Lena answers", "Das Quiz funktioniert auch per Tastatur: Lena antwortet")} left={{ who: "lena", face: "happy", pose: "up" }}>
      <Mon x={50} y={6} w={92} h={46}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Chip x={56} y={16 + i * 11} w={26} h={7} c="#E0E4EB" />
            <Chip x={106} y={16 + i * 11} w={30} h={7} c="#B5E3C8" />
          </g>
        ))}
        <Arrow x={88} y={25} />
        <Txt x={96} y={49} size={3.8} anchor="middle">ALSO BY KEYBOARD</Txt>
      </Mon>
      <Tick x={134} y={10} />
    </Duo>
  ),
  "a2-5": (
    <Duo label={tt("Sort each barrier by the principle it breaks, and name its type", "Ordnen Sie jede Barriere dem Prinzip zu, das sie verletzt, und nennen Sie ihre Art")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={106} title="SORT EACH BARRIER" items={[{ tick: true, text: "BY THE PRINCIPLE IT BREAKS" }, { tick: true, text: "NAME ITS TYPE" }, { tick: true, text: "FIX THE SOURCE" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Duo label={tt("Noor reads in her second language. The sign-up speaks in long legal sentences", "Noor liest in ihrer Zweitsprache. Die Anmeldung spricht in langen juristischen Sätzen")} left={{ who: "noor", face: "worried" }}>
      <Mon x={56} y={6} w={86} h={46}>
        <Lines x={62} y={16} w={74} n={7} gap={4} />
        <Txt x={99} y={49} size={3.8} anchor="middle">LEGAL SENTENCES</Txt>
      </Mon>
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a3-2": (
    <Duo label={tt("The same sign-up in plain language: short sentences, everyday words", "Dieselbe Anmeldung in einfacher Sprache: kurze Sätze, Alltagsworte")} left={{ who: "noor", face: "happy" }}>
      <Mon x={56} y={6} w={86} h={46}>
        <Txt x={62} y={20} size={5.4}>YOUR NAME</Txt>
        <Chip x={62} y={24} w={50} h={7} c="#E0E4EB" />
        <Txt x={62} y={40} size={5.4}>YOUR EMAIL</Txt>
        <Chip x={62} y={44} w={50} h={5} c="#E0E4EB" />
      </Mon>
      <Tick x={136} y={10} />
    </Duo>
  ),
  "a3-3": (
    <Duo label={tt("Daniel is tired after work. The new sign-up shows one question per screen", "Daniel ist nach der Arbeit müde. Die neue Anmeldung zeigt eine Frage pro Bildschirm")} left={{ who: "daniel", face: "happy" }}>
      <Mon x={56} y={6} w={86} h={46}>
        <Txt x={99} y={22} size={5.4} anchor="middle">ONE QUESTION</Txt>
        <Chip x={74} y={26} w={50} h={7} c="#E0E4EB" />
        <Bar x={74} y={40} w={50} p={0.3} />
        <Txt x={99} y={49} size={3.8} anchor="middle">ONE STEP AT A TIME</Txt>
      </Mon>
    </Duo>
  ),
  "a3-4": (
    <Duo label={tt("The same lesson as text, as captioned video and as audio: the learner chooses", "Dieselbe Lektion als Text, als Video mit Untertiteln und als Audio: Die Lernende wählt")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="ONE CONTENT, 3 WAYS" items={[{ icon: "book", text: "TEXT" }, { icon: "play", text: "VIDEO WITH CAPTIONS" }, { icon: "idea", text: "AUDIO" }]} />
    </Duo>
  ),
  "a3-5": (
    <Duo label={tt("Name which tool a measure uses: plain language, lower load or flexibility", "Nennen Sie, welches Werkzeug eine Maßnahme nutzt: einfache Sprache, geringere Belastung oder Flexibilität")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="WHICH TOOL?" items={[{ tick: true, text: "PLAIN LANGUAGE" }, { tick: true, text: "LOWER LOAD" }, { tick: true, text: "FLEXIBILITY" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Duo label={tt("LearnLoop checks accessibility once, in an audit, and fixes what it found", "LearnLoop prüft Barrierefreiheit einmal, in einem Audit, und behebt, was es fand")} left={{ who: "priya", face: "happy" }} right={{ who: "dana", face: "happy" }}>
      <Notes x={44} y={8} w={72} title="ONE AUDIT" items={[{ tick: true, text: "CONTRAST" }, { tick: true, text: "CAPTIONS" }, { tick: true, text: "KEYBOARD" }]} />
    </Duo>
  ),
  "a4-2": (
    <Duo label={tt("Months later new course pages bring the old barriers back", "Monate später bringen neue Kursseiten die alten Barrieren zurück")} left={{ who: "priya", face: "sad" }}>
      <Mon x={56} y={8} w={80} h={42}>
        <Lines x={62} y={18} w={68} n={6} gap={3} c="#C0C5CE" />
        <Txt x={96} y={47} size={4} anchor="middle">NEW COURSE</Txt>
      </Mon>
      <Icon x={142} y={12} name="warn" />
      <Mark x={9} y={34} kind="sweat" />
    </Duo>
  ),
  "a4-3": (
    <Stage label={tt("The same question at every stage: plan, design, build, evaluate. Does this work for all learners?", "Dieselbe Frage in jeder Stufe: planen, gestalten, bauen, evaluieren. Funktioniert das für alle Lernenden?")}>
      <Board x={12} y={8} w={136} h={44}>
        {["PLAN", "DESIGN", "BUILD", "EVALUATE"].map((l, i) => (
          <g key={l}>
            <Chip x={18 + i * 33} y={14} w={26} h={9} c="#B5D4F4" />
            <Txt x={31 + i * 33} y={21} size={3.8} anchor="middle">{l}</Txt>
            {i < 3 && <Arrow x={46 + i * 33} y={17} />}
          </g>
        ))}
        <Icon x={64} y={30} name="ask" />
        <Txt x={78} y={37} size={4.4}>WORKS FOR ALL?</Txt>
        <Txt x={80} y={48} size={4} anchor="middle" c="#556274">THE RESULT FEEDS THE NEXT PLAN</Txt>
      </Board>
      <Person x={2} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),
  "a4-4": (
    <Duo label={tt("Three kinds of evidence: a test with users, data by group, a manual check", "Drei Arten von Belegen: ein Test mit Nutzern, Daten pro Gruppe, eine manuelle Prüfung")} left={{ who: "priya", face: "think", pose: "point" }}>
      <Notes x={40} y={8} w={112} title="THREE KINDS OF EVIDENCE" items={[{ icon: "eye", text: "TEST WITH USERS: WHY" }, { icon: "chart", text: "DATA BY GROUP: HOW MANY" }, { icon: "check", text: "MANUAL CHECK: MEETS?" }]} />
    </Duo>
  ),
  "a4-5": (
    <Duo label={tt("Integrate the check into the work and keep evaluating", "Die Prüfung in die Arbeit integrieren und weiter evaluieren")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="A LOOP, NOT A STEP" items={[{ tick: true, text: "A CHECK AT EVERY STAGE" }, { tick: true, text: "MEASURE BY GROUP" }, { tick: true, text: "KEEP IT GOING" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Duo label={tt("LearnLoop has three ideas on the table and rates each on three questions", "LearnLoop hat drei Ideen auf dem Tisch und bewertet jede mit drei Fragen")} left={{ who: "priya", face: "think" }} right={{ who: "dana", face: "think" }}>
      <Notes x={36} y={8} w={90} title="LEARNLOOP · 3 IDEAS" items={[{ icon: "idea", text: "A · QUIZ BATTLE" }, { icon: "idea", text: "B · CAPTIONS, KEYBOARD" }, { icon: "idea", text: "C · PLAIN LANGUAGE" }]} />
    </Duo>
  ),
  "a5-2": (
    <Duo label={tt("The quiz battle: a low impact for those shut out, a high risk, a high effort", "Das Quiz-Battle: geringe Wirkung für die Ausgeschlossenen, hohes Risiko, hoher Aufwand")} left={{ who: "priya", face: "worried" }}>
      <Rate x={44} y={4} title="A · QUIZ BATTLE" rows={[["IMPACT", 1, "LOW"], ["RISK", 3, "HIGH"], ["EFFORT", 3, "HIGH"]]} />
    </Duo>
  ),
  "a5-3": (
    <Duo label={tt("Captions and keyboard use: a high impact, a low risk, a medium effort", "Untertitel und Tastaturbedienung: hohe Wirkung, geringes Risiko, mittlerer Aufwand")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Rate x={44} y={4} title="B · CAPTIONS, KEYBOARD" rows={[["IMPACT", 3, "HIGH"], ["RISK", 1, "LOW"], ["EFFORT", 2, "MID"]]} />
    </Duo>
  ),
  "a5-4": (
    <Duo label={tt("Rate each measure on user impact, risk and effort, with a reason", "Bewerten Sie jede Maßnahme nach Nutzerwirkung, Risiko und Aufwand, mit einem Grund")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={40} y={6} w={112} title="RATE EACH MEASURE" items={[{ icon: "up", text: "IMPACT: WHO GETS IN" }, { icon: "warn", text: "RISK: WHAT GOES WRONG" }, { icon: "clock", text: "EFFORT: WORK AND TIME" }]} sub="FIX THE SOURCE BEFORE A LAYER" />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Duo label={tt("The head of product asks why accessibility should get budget", "Die Leiterin Produkt fragt, warum Barrierefreiheit Budget bekommen soll")} left={{ who: "dana", face: "worried" }} right={{ who: "priya", face: "think" }}>
      <Board x={56} y={10} w={48} h={34}>
        <Icon x={76} y={16} name="ask" />
        <Txt x={80} y={36} size={5} anchor="middle">WHY BUDGET?</Txt>
      </Board>
    </Duo>
  ),
  "b1-2": (
    <Stage label={tt("About one in six people lives with a significant disability (WHO 2022)", "Etwa jeder sechste Mensch lebt mit einer erheblichen Behinderung (WHO 2022)")}>
      <Board x={32} y={8} w={96} h={44}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Kid key={i} x={38 + i * 14} y={16} c={i === 2 ? "#D9534F" : KID_COLOURS[i]} />
        ))}
        <Txt x={80} y={42} size={4.6} anchor="middle">1 IN 6</Txt>
        <Txt x={80} y={49} size={3.6} anchor="middle" c="#556274">WHO 2022</Txt>
      </Board>
      <Person x={2} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),
  "b1-3": (
    <Duo label={tt("Three reasons: rules and expectations, reach, long-term quality", "Drei Gründe: Regeln und Erwartungen, Reichweite, langfristige Qualität")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Board x={38} y={10} w={112} h={34}>
        {["RULES", "REACH", "QUALITY"].map((l, i) => (
          <g key={l}>
            <Chip x={44 + i * 34} y={16} w={28} h={10} c="#B5D4F4" />
            <Txt x={58 + i * 34} y={23} size={4} anchor="middle">{l}</Txt>
            {i < 2 && <Arrow x={73 + i * 34} y={20} />}
          </g>
        ))}
        <Txt x={94} y={38} size={3.8} anchor="middle" c="#556274">IN FLUX: CHECK THE RULE</Txt>
      </Board>
    </Duo>
  ),
  "b1-4": (
    <Duo label={tt("State the strategic case in three parts, in management's terms", "Den strategischen Fall in drei Teilen nennen, in den Worten des Managements")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="THE STRATEGIC CASE" items={[{ tick: true, text: "THREE REASONS" }, { tick: true, text: "IN ITS TERMS" }, { tick: true, text: "LAW WITH CARE" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Stage label={tt("Seven ideas by the reach they give and what they cost", "Sieben Ideen nach der Reichweite, die sie geben, und nach ihren Kosten")}>
      <ReachMatrix />
      <Person x={2} y={40} who="priya" face="think" />
    </Stage>
  ),
  "b2-2": (
    <Stage label={tt("The tempting ideas cost a lot and reach few of the learners who are shut out", "Die verlockenden Ideen kosten viel und erreichen wenige der ausgeschlossenen Lernenden")}>
      <ReachMatrix hi={["F", "G"]} />
      <Person x={2} y={40} who="dana" face="surprised" />
    </Stage>
  ),
  "b2-3": (
    <Stage label={tt("Start where the reach is wide and the cost is low, and say what waits", "Beginnen Sie dort, wo die Reichweite groß und die Kosten gering sind, und sagen Sie, was wartet")}>
      <ReachMatrix hi={["A", "C"]} />
      <Person x={2} y={40} who="priya" face="happy" pose="up" />
    </Stage>
  ),
  "b2-4": (
    <Duo label={tt("Weigh reach, cost and risk, integrate instead of adding on, and name what waits", "Reichweite, Kosten und Risiko abwägen, integrieren statt aufsetzen und nennen, was wartet")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="DECIDE WITH A RULE" items={[{ tick: true, text: "REACH, COST, RISK" }, { tick: true, text: "INTEGRATE, NOT ADD ON" }, { tick: true, text: "NAME WHAT WAITS" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Duo label={tt("The average looks fine: most learners finish the main task", "Der Durchschnitt sieht gut aus: Die meisten Lernenden schließen die Hauptaufgabe ab")} left={{ who: "dana", face: "happy" }}>
      <FinishBars groups={false} />
    </Duo>
  ),
  "b3-2": (
    <Duo label={tt("By group, one group is stuck: the average hid it", "Pro Gruppe steckt eine Gruppe fest: Der Durchschnitt hat es verdeckt")} left={{ who: "priya", face: "worried", pose: "point" }}>
      <FinishBars groups />
      <Icon x={136} y={40} name="warn" />
    </Duo>
  ),
  "b3-3": (
    <Duo label={tt("A decision under uncertainty has four parts: decide, do not know, reverse if, give up", "Eine Entscheidung unter Unsicherheit hat vier Teile: entscheiden, nicht wissen, zurücknehmen, wenn, verzichten")} left={{ who: "priya", face: "think" }}>
      <Notes x={40} y={6} w={112} title="THE DECISION" items={[{ icon: "check", text: "I DECIDE" }, { icon: "ask", text: "I DO NOT KNOW" }, { icon: "clock", text: "I REVERSE IF …" }, { icon: "lock", text: "I GIVE UP" }]} />
    </Duo>
  ),
  "b3-4": (
    <Duo label={tt("Measure by group with a method for the reason and one for the count, and decide with a figure and a date", "Pro Gruppe messen, mit einer Methode für den Grund und einer für die Zahl, und mit einer Zahl und einem Termin entscheiden")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={44} y={8} w={104} title="MEASURE AND DECIDE" items={[{ tick: true, text: "KPIS BY GROUP" }, { tick: true, text: "WHY AND HOW MANY" }, { tick: true, text: "A FIGURE AND A DATE" }]} />
    </Duo>
  ),
};
