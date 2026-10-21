import type { ReactNode } from "react";
import { Board, Chip, K, LOOK, Mark, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes, Rate } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 12 comics (data/day12/comics.ts, DL-STANDARD.md section 13). People: Ravi (a learner of LearnLoop), Priya (LearnLoop's UX lead) and Dana
 * (head of product), all made up. Every label is a short capital word with a German entry in pixelLabelsMore.ts.
 */
LOOK.ravi = { hair: "#1B1B22", shirt: "#3D7BD9", skin: "#B98A5E" };
LOOK.priya = { hair: "#1B1B22", shirt: "#2B8A6E", long: true, skin: "#C8946A" };
LOOK.dana = { hair: "#5A3A22", shirt: "#8A63D2", long: true };

/** A learning path of five step boxes: the marked one is the next, with an optional reason line and a change link. */
function Path({ marked = 2, reason, change, moved }: { marked?: number; reason?: string; change?: boolean; moved?: boolean }) {
  return (
    <Board x={34} y={5} w={92} h={56}>
      <rect x={34} y={5} width={92} height={5} fill="#3F4A58" />
      <Txt x={38} y={9.2} size={3.4} c="#FFFFFF">MY PATH</Txt>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={38 + i * 17} y={16} width={14} height={11} fill={i === marked ? "#2E9E6B" : i < marked ? "#B5E3C8" : "#E4E8EE"} stroke={K} strokeWidth={0.6} />
          <Txt x={45 + i * 17} y={24} size={4.4} anchor="middle" c={i === marked ? "#FFFFFF" : K}>{String(i + 1)}</Txt>
        </g>
      ))}
      {moved && <Txt x={38 + marked * 17} y={34} size={3.4} c="#D9534F">MOVED UP</Txt>}
      {reason && <Txt x={38} y={40} size={3.6}>{reason}</Txt>}
      {change && <Txt x={38} y={47} size={3.6} c="#3D7BD9">CHANGE THIS</Txt>}
      <Chip x={90} y={50} w={32} h={8} c="#3F4A58" />
      <Txt x={106} y={55.6} size={3.6} anchor="middle" c="#FFFFFF">CONTINUE</Txt>
    </Board>
  );
}

/** A board with a short heading and a few dots, for the data and the models. */
function Dots({ n, title }: { n: number; title: string }) {
  return (
    <Board x={40} y={6} w={80} h={50}>
      <Txt x={44} y={15} size={4.4} c="#556274">{title}</Txt>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={46 + (i % 10) * 7} y={22 + Math.floor(i / 10) * 8} width={4} height={4} fill={K} />
      ))}
    </Board>
  );
}

export const ART_D12: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Duo label={tt("Every learner gets the same lessons in the same order; Ravi already knows the first one", "Jede Lernende bekommt dieselben Lektionen in derselben Reihenfolge; Ravi kennt die erste schon")} left={{ who: "ravi", face: "sad" }}>
      <Notes x={50} y={8} w={86} title="THE SAME FOR ALL" items={[{ icon: "book", text: "LESSON 1 · KNOWN" }, { icon: "book", text: "LESSON 2" }]} />
      <Mark x={9} y={34} kind="zzz" />
    </Duo>
  ),
  "a1-2": (
    <Duo label={tt("Step one: the platform collects what Ravi opens and answers", "Schritt eins: Die Plattform sammelt, was Ravi öffnet und beantwortet")} left={{ who: "ravi", face: "neutral" }} right={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={50} y={8} w={60} title="1 · COLLECT" items={[{ icon: "eye", text: "WHAT IS OPENED" }, { icon: "pencil", text: "WHAT IS ANSWERED" }]} />
    </Duo>
  ),
  "a1-3": (
    <Duo label={tt("Step two: the platform analyses progress and mistakes: two questions on limits missed", "Schritt zwei: Die Plattform wertet Fortschritt und Fehler aus: zwei Fragen zu Grenzen verfehlt")} left={{ who: "ravi", face: "think" }} right={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={50} y={8} w={60} title="2 · ANALYSE" items={[{ icon: "chart", text: "PROGRESS" }, { cross: true, text: "2 MISSED ON LIMITS" }]} />
    </Duo>
  ),
  "a1-4": (
    <Duo label={tt("Step three: the next lesson changes, a short repeat on limits", "Schritt drei: Die nächste Lektion ändert sich, eine kurze Wiederholung zu Grenzen")} left={{ who: "ravi", face: "happy", pose: "up" }}>
      <Notes x={50} y={8} w={86} title="3 · ADAPT" items={[{ icon: "up", text: "NEXT: A SHORT REPEAT" }, { tick: true, text: "FITS RAVI" }]} />
    </Duo>
  ),
  "a1-5": (
    <Duo label={tt("It helps only when the learner can see why the lesson changed", "Es hilft nur, wenn die Lernende sehen kann, warum sich die Lektion geändert hat")} left={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={44} y={12} w={104} items={[{ icon: "eye", text: "CAN RAVI SEE WHY?" }, { tick: true, text: "YES: IT HELPS" }, { cross: true, text: "NO: IT DOES NOT" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Duo label={tt("Two rules written by hand: after two mistakes repeat the topic, after a perfect check skip it", "Zwei Regeln von Hand geschrieben: nach zwei Fehlern das Thema wiederholen, nach einem perfekten Check überspringen")} left={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="RULES: IF … THEN" items={[{ icon: "gear", text: "2 MISTAKES: REPEAT" }, { icon: "gear", text: "PERFECT: SKIP" }]} />
    </Duo>
  ),
  "a2-2": (
    <Duo label={tt("A model finds patterns in a lot of data, but it cannot say why", "Ein Modell findet Muster in vielen Daten, kann aber nicht sagen, warum")} left={{ who: "dana", face: "worried" }}>
      <Dots n={36} title="A MODEL: A LOT OF DATA" />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a2-3": (
    <Duo label={tt("Only a few learners' data: the model mostly guesses", "Nur die Daten weniger Lernender: Das Modell rät meist")} left={{ who: "priya", face: "worried" }}>
      <Dots n={6} title="A SMALL DATA BASIS" />
    </Duo>
  ),
  "a2-4": (
    <Duo label={tt("Three limits of any adaptive technique: data quality, complexity, transparency", "Drei Grenzen jeder adaptiven Technik: Datenqualität, Komplexität, Transparenz")} left={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="THREE LIMITS" items={[{ icon: "chart", text: "DATA QUALITY" }, { icon: "gear", text: "COMPLEXITY" }, { icon: "eye", text: "TRANSPARENCY" }]} />
    </Duo>
  ),
  "a2-5": (
    <Duo label={tt("The rule: the simplest technique that the data supports and the learner understands", "Die Regel: die einfachste Technik, die die Daten tragen und die die Lernende versteht")} left={{ who: "priya", face: "happy" }}>
      <Notes x={44} y={12} w={104} items={[{ tick: true, text: "THE DATA SUPPORTS IT" }, { tick: true, text: "THE LEARNER UNDERSTANDS IT" }, { tick: true, text: "THE SIMPLEST THAT FITS" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Duo label={tt("Pattern one: a recommendation with a reason: because you missed two questions on limits", "Muster eins: eine Empfehlung mit Grund: weil Sie zwei Fragen zu Grenzen verfehlt haben")} left={{ who: "ravi", face: "happy" }}>
      <Path marked={2} reason="BECAUSE YOU MISSED 2 ON LIMITS" />
    </Duo>
  ),
  "a3-2": (
    <Duo label={tt("Pattern two: adaptive difficulty: the next task is a little harder, and it says so", "Muster zwei: adaptive Schwierigkeit: Die nächste Aufgabe ist etwas schwerer, und es wird gesagt")} left={{ who: "priya", face: "neutral" }}>
      <Rate x={44} y={4} title="NEXT TASK" rows={[["LEVEL", 2, "UP"], ["BECAUSE", 3, "READY"], ["SAYS SO", 3, "YES"]]} />
    </Duo>
  ),
  "a3-3": (
    <Duo label={tt("Pattern three: a dynamic path as visible steps; one step moved up", "Muster drei: ein dynamischer Pfad als sichtbare Schritte; ein Schritt rückte vor")} left={{ who: "ravi", face: "happy" }}>
      <Path marked={2} moved />
    </Duo>
  ),
  "a3-4": (
    <Duo label={tt("Pattern four: feedback after each task says what changed and what to do next", "Muster vier: Feedback nach jeder Aufgabe sagt, was sich änderte und was als Nächstes zu tun ist")} left={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="AFTER A TASK" items={[{ icon: "check", text: "DONE" }, { icon: "up", text: "WHAT CHANGED: STEP 3" }, { icon: "play", text: "WHAT NEXT: CONTINUE" }]} />
    </Duo>
  ),
  "a3-5": (
    <Duo label={tt("Three words for any pattern: see it, understand it, change it", "Drei Wörter für jedes Muster: es sehen, es verstehen, es ändern")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Notes x={44} y={12} w={104} items={[{ icon: "eye", text: "CAN RAVI SEE IT?" }, { icon: "ask", text: "UNDERSTAND IT?" }, { icon: "gear", text: "CHANGE IT?" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Duo label={tt("The opportunities: efficiency, motivation, learning success", "Die Chancen: Effizienz, Motivation, Lernerfolg")} left={{ who: "ravi", face: "happy", pose: "up" }} right={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={50} y={8} w={60} title="OPPORTUNITIES" items={[{ icon: "clock", text: "EFFICIENCY" }, { icon: "heart", text: "MOTIVATION" }, { icon: "chart", text: "LEARNING SUCCESS" }]} />
    </Duo>
  ),
  "a4-2": (
    <Duo label={tt("Risk one: opacity: Ravi does not know why his lesson changed", "Risiko eins: Undurchsichtigkeit: Ravi weiß nicht, warum sich seine Lektion geändert hat")} left={{ who: "ravi", face: "worried" }}>
      <Notes x={50} y={8} w={86} title="RISK: OPACITY" items={[{ icon: "lock", text: "NO REASON SHOWN" }, { icon: "ask", text: "WHY DID IT CHANGE?" }]} />
    </Duo>
  ),
  "a4-3": (
    <Duo label={tt("Risk two: over-adaptation: the path narrows and Ravi never meets harder topics", "Risiko zwei: Überanpassung: Der Pfad wird enger, und Ravi begegnet nie schwereren Themen")} left={{ who: "priya", face: "worried" }}>
      <Notes x={50} y={8} w={86} title="RISK: OVER-ADAPTATION" items={[{ icon: "down", text: "ONLY EASY THINGS" }, { cross: true, text: "NEVER HARDER TOPICS" }]} />
    </Duo>
  ),
  "a4-4": (
    <Duo label={tt("Risk three: a wrong data basis: the platform misreads Ravi", "Risiko drei: eine falsche Datenbasis: Die Plattform liest Ravi falsch")} left={{ who: "priya", face: "think" }}>
      <Notes x={50} y={8} w={86} title="RISK: WRONG DATA" items={[{ icon: "warn", text: "RAVI IS MISREAD" }, { cross: true, text: "WRONG ADAPTATION" }]} />
    </Duo>
  ),
  "a4-5": (
    <Duo label={tt("The link to gamification: a personal goal on Ravi's own path", "Die Verbindung zur Gamification: ein persönliches Ziel auf Ravis eigenem Pfad")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="MOTIVATION + PERSONALISATION" items={[{ icon: "heart", text: "A PERSONAL GOAL" }, { icon: "chart", text: "PROGRESS ON MY OWN PATH" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Duo label={tt("Three ideas for LearnLoop, rated on benefit, effort and risk", "Drei Ideen für LearnLoop, bewertet nach Nutzen, Aufwand und Risiko")} left={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="3 IDEAS" items={[{ icon: "ask", text: "1 · A REASON ON EVERY ADVICE" }, { icon: "pencil", text: "2 · A START QUESTIONNAIRE" }, { icon: "gear", text: "3 · A LEARNING MODEL" }]} />
    </Duo>
  ),
  "a5-2": (
    <Duo label={tt("Idea 1, a reason on every recommendation: benefit high, effort low, risk low", "Idee 1, ein Grund bei jeder Empfehlung: Nutzen hoch, Aufwand niedrig, Risiko niedrig")} left={{ who: "priya", face: "happy" }}>
      <Rate x={44} y={4} title="A REASON ON EVERY ADVICE" rows={[["BENEFIT", 3, "HIGH"], ["EFFORT", 1, "LOW"], ["RISK", 1, "LOW"]]} />
    </Duo>
  ),
  "a5-3": (
    <Duo label={tt("Idea 2, a start questionnaire: benefit mid, effort mid, risk mid", "Idee 2, ein Startfragebogen: Nutzen mittel, Aufwand mittel, Risiko mittel")} left={{ who: "priya", face: "think" }}>
      <Rate x={44} y={4} title="A START QUESTIONNAIRE" rows={[["BENEFIT", 2, "MID"], ["EFFORT", 2, "MID"], ["RISK", 2, "MID"]]} />
    </Duo>
  ),
  "a5-4": (
    <Duo label={tt("Idea 3, a learning model: benefit mid, effort high, risk high", "Idee 3, ein Lernmodell: Nutzen mittel, Aufwand hoch, Risiko hoch")} left={{ who: "priya", face: "worried" }}>
      <Rate x={44} y={4} title="A LEARNING MODEL" rows={[["BENEFIT", 2, "MID"], ["EFFORT", 3, "HIGH"], ["RISK", 3, "HIGH"]]} />
    </Duo>
  ),
  "a5-5": (
    <Duo label={tt("The order: the reason first, the questionnaire second, the model last", "Die Reihenfolge: der Grund zuerst, der Fragebogen zweitens, das Modell zuletzt")} left={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="SIMPLE BEFORE COMPLEX" items={[{ tick: true, text: "1 · A REASON ON EVERY ADVICE" }, { tick: true, text: "2 · A START QUESTIONNAIRE" }, { cross: true, text: "3 · A MODEL, IF AT ALL" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Duo label={tt("Dana wants an AI model because competitors have one", "Dana will ein KI-Modell, weil Wettbewerber eines haben")} left={{ who: "dana", face: "happy", pose: "point" }} right={{ who: "priya", face: "think" }}>
      <Notes x={50} y={10} w={60} items={[{ icon: "eye", text: "THEY HAVE AI" }, { icon: "ask", text: "SO DO WE?" }]} />
    </Duo>
  ),
  "b1-2": (
    <Duo label={tt("Link one: the learner's need, not wasting time on what Ravi knows", "Glied eins: der Bedarf der Lernenden, keine Zeit mit dem zu verschwenden, was Ravi kann")} left={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={44} y={12} w={104} items={[{ icon: "heart", text: "1 · THE NEED" }, { icon: "chart", text: "2 · THE DATA" }, { icon: "gear", text: "3 · THE TECHNIQUE" }]} />
    </Duo>
  ),
  "b1-3": (
    <Duo label={tt("Link two: the data they have: what Ravi opens and answers", "Glied zwei: die Daten, die sie haben: was Ravi öffnet und beantwortet")} left={{ who: "priya", face: "neutral" }}>
      <Dots n={8} title="THE DATA WE HAVE" />
    </Duo>
  ),
  "b1-4": (
    <Duo label={tt("Link three: the simplest technique that fits the data: three rules", "Glied drei: die einfachste Technik, die zu den Daten passt: drei Regeln")} left={{ who: "priya", face: "happy" }}>
      <Notes x={44} y={12} w={104} title="THE TECHNIQUE" items={[{ icon: "gear", text: "RULE 1" }, { icon: "gear", text: "RULE 2" }, { icon: "gear", text: "RULE 3" }]} />
    </Duo>
  ),
  "b1-5": (
    <Duo label={tt("Link four: an adaptation Ravi can see and change", "Glied vier: eine Anpassung, die Ravi sehen und ändern kann")} left={{ who: "ravi", face: "happy" }}>
      <Path marked={2} reason="BECAUSE YOU MISSED 2 ON LIMITS" change />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Duo label={tt("A clever model nobody understands: Ravi ignores its suggestions", "Ein kluges Modell, das niemand versteht: Ravi ignoriert seine Vorschläge")} left={{ who: "ravi", face: "worried" }}>
      <Notes x={50} y={8} w={86} title="A CLEVER MODEL" items={[{ icon: "lock", text: "NO REASON SHOWN" }, { cross: true, text: "RAVI IGNORES IT" }]} />
    </Duo>
  ),
  "b2-2": (
    <Duo label={tt("A mixed group: one path suits nobody, but it is clear and fair", "Eine gemischte Gruppe: Ein Pfad passt niemandem, ist aber klar und fair")} left={{ who: "priya", face: "think" }}>
      <Notes x={50} y={8} w={86} title="A STANDARD PATH" items={[{ tick: true, text: "CLEAR AND FAIR" }, { cross: true, text: "FITS A MIXED GROUP BADLY" }]} />
    </Duo>
  ),
  "b2-3": (
    <Duo label={tt("Six ideas by technical complexity and by how well learners understand them", "Sechs Ideen nach technischer Komplexität und danach, wie gut Lernende sie verstehen")} left={{ who: "priya", face: "neutral", pose: "point" }}>
      <Board x={34} y={4} w={92} h={58}>
        <rect x={50} y={9} width={1} height={44} fill={K} />
        <rect x={50} y={53} width={72} height={1} fill={K} />
        <Txt x={86} y={60} size={3.4} anchor="middle" c="#556274">TECHNICAL COMPLEXITY →</Txt>
        <Txt x={36} y={28} size={3} c="#556274">UNDERSTOOD</Txt>
        {([[0.2, 0.85, "#2E9E6B"], [0.35, 0.7, "#2E9E6B"], [0.85, 0.2, "#D9534F"], [0.7, 0.35, "#D9534F"], [0.6, 0.5, "#9AA5B5"], [0.15, 0.4, "#9AA5B5"]] as [number, number, string][]).map(([x, y, c], i) => (
          <g key={i}>
            <rect x={54 + x * 64 - 1} y={48 - y * 38 - 1} width={8} height={8} fill={K} />
            <rect x={54 + x * 64} y={48 - y * 38} width={6} height={6} fill={c} />
          </g>
        ))}
      </Board>
    </Duo>
  ),
  "b2-4": (
    <Duo label={tt("When standardisation makes more sense: the group is alike and the data is missing", "Wann Standardisierung sinnvoller ist: Die Gruppe ist gleich und die Daten fehlen")} left={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={44} y={12} w={104} items={[{ icon: "book", text: "A GROUP THAT IS ALIKE" }, { icon: "ask", text: "NO DATA YET" }, { tick: true, text: "THE STANDARD PATH WINS" }]} />
    </Duo>
  ),
  "b2-5": (
    <Duo label={tt("The rule: the simplest technique the learner understands and that fits the data", "Die Regel: die einfachste Technik, die die Lernende versteht und die zu den Daten passt")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Notes x={44} y={12} w={104} items={[{ tick: true, text: "THE LEARNER UNDERSTANDS IT" }, { tick: true, text: "IT FITS THE DATA" }, { tick: true, text: "THE SIMPLEST THAT WORKS" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Duo label={tt("Dana asks Priya to decide, but the data basis is incomplete", "Dana bittet Priya zu entscheiden, aber die Datenbasis ist unvollständig")} left={{ who: "dana", face: "worried" }} right={{ who: "priya", face: "think" }}>
      <Notes x={50} y={10} w={60} items={[{ icon: "ask", text: "DATA IS INCOMPLETE" }, { icon: "eye", text: "COMPETITORS ARE LIVE" }]} />
    </Duo>
  ),
  "b3-2": (
    <Duo label={tt("A small, reversible step: three rules behind a switch", "Ein kleiner, umkehrbarer Schritt: drei Regeln hinter einem Schalter")} left={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={44} y={12} w={104} items={[{ icon: "gear", text: "THREE RULES" }, { icon: "lock", text: "BEHIND A SWITCH" }, { tick: true, text: "CAN BE TURNED OFF" }]} />
    </Duo>
  ),
  "b3-3": (
    <Duo label={tt("The concept is tested in a prototype with a few learners", "Das Konzept wird in einem Prototyp mit wenigen Lernenden getestet")} left={{ who: "priya", face: "happy" }} right={{ who: "ravi", face: "neutral" }}>
      <Path marked={1} reason="A PROTOTYPE" />
    </Duo>
  ),
  "b3-4": (
    <Duo label={tt("A figure to watch and a date go into the plan", "Eine Zahl zum Beobachten und ein Datum kommen in den Plan")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="CHANGE IF" items={[{ icon: "chart", text: "SWITCHED OFF AS OFTEN" }, { icon: "clock", text: "BY MONTH 3" }]} />
    </Duo>
  ),
  "b3-5": (
    <Duo label={tt("Four parts of a decision with incomplete data: decide, do not know, reverse, give up", "Vier Teile einer Entscheidung mit unvollständigen Daten: entscheiden, nicht wissen, zurücknehmen, verzichten")} left={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={44} y={3} w={106} items={[{ tick: true, text: "I DECIDE" }, { tick: true, text: "I DO NOT KNOW" }, { tick: true, text: "I CHANGE IF" }, { cross: true, text: "I GIVE UP: THE MODEL" }]} />
    </Duo>
  ),
};

