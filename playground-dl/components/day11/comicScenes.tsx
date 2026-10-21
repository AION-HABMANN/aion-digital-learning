import type { ReactNode } from "react";
import { Bar, Board, Chip, Icon, K, LOOK, Lines, Mark, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes, Rate } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 11 comics (data/day11/comics.ts, DL-STANDARD.md section 13). People: Kim (a learner of LearnLoop), Priya (LearnLoop's UX lead) and Dana
 * (head of product), all made up. Every label is a short capital word with a German entry in pixelLabels.ts.
 */
LOOK.kim = { hair: "#7A3E1D", shirt: "#E4572E", long: true };
LOOK.priya = { hair: "#1B1B22", shirt: "#2B8A6E", long: true, skin: "#C8946A" };
LOOK.dana = { hair: "#5A3A22", shirt: "#8A63D2", long: true };

/** A LearnLoop lesson screen with the game elements switched on one by one. */
function LessonG({ points, badge, board, bar }: { points?: boolean; badge?: boolean; board?: boolean; bar?: boolean }) {
  return (
    <Board x={36} y={3} w={88} h={60}>
      <rect x={36} y={3} width={88} height={5} fill="#3F4A58" />
      <Txt x={40} y={7.2} size={3.4} c="#FFFFFF">LESSON · ANCHORING</Txt>
      <Lines x={40} y={13} w={52} n={5} gap={4} />
      {points && (
        <g>
          <Chip x={98} y={11} w={22} h={8} c="#FFE48A" />
          <Txt x={109} y={17} size={4.2} anchor="middle">+10 POINTS</Txt>
        </g>
      )}
      {badge && (
        <g>
          <Icon x={98} y={24} name="idea" />
          <Txt x={102} y={39} size={3.4} anchor="middle">BADGE</Txt>
          <Txt x={102} y={45} size={3.4} anchor="middle" c="#556274">LEVEL 2</Txt>
        </g>
      )}
      {board && (
        <g>
          <rect x={96} y={21} width={24} height={26} fill="#F4F6F8" stroke={K} strokeWidth={0.8} />
          {["1 JONAS", "2 MIRA", "3 KIM"].map((s, i) => (
            <Txt key={s} x={98} y={28 + i * 7} size={3.6} c={i === 2 ? "#D9534F" : K}>{s}</Txt>
          ))}
        </g>
      )}
      {bar && <Bar x={40} y={50} w={52} p={0.5} c="#2E9E6B" />}
    </Board>
  );
}

/** Two bars for one platform: activity (logins and clicks) and objectives mastered. */
function Bars({ a, b, la, lb }: { a: number; b: number; la: string; lb: string }) {
  return (
    <Board x={36} y={6} w={88} h={50}>
      <Txt x={40} y={16} size={4}>{la}</Txt>
      <Bar x={40} y={19} w={78} p={a} c="#F59E0B" />
      <Txt x={40} y={34} size={4}>{lb}</Txt>
      <Bar x={40} y={37} w={78} p={b} c="#2E9E6B" />
      <Txt x={40} y={52} size={3.4} c="#556274">THE SAME PLATFORM</Txt>
    </Board>
  );
}

export const ART_D11: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Duo label={tt("Kim reads a plain lesson: the text and nothing else, nothing is counted", "Kim liest eine schlichte Lektion: der Text und sonst nichts, nichts wird gezählt")} left={{ who: "kim", face: "neutral" }}>
      <LessonG />
    </Duo>
  ),
  "a1-2": (
    <Duo label={tt("Points are added: every finished screen gives 10", "Punkte werden ergänzt: Jede beendete Seite gibt 10")} left={{ who: "kim", face: "happy" }}>
      <LessonG points />
    </Duo>
  ),
  "a1-3": (
    <Duo label={tt("A badge marks Kim's first task and a level shows her stage", "Ein Abzeichen markiert Kims erste Aufgabe und ein Level zeigt ihre Stufe")} left={{ who: "kim", face: "happy", pose: "up" }}>
      <LessonG points badge />
    </Duo>
  ),
  "a1-4": (
    <Duo label={tt("A leaderboard ranks Kim third: most people cannot win", "Eine Rangliste setzt Kim auf Platz drei: Die meisten können nicht gewinnen")} left={{ who: "kim", face: "worried" }}>
      <LessonG points badge board />
    </Duo>
  ),
  "a1-5": (
    <Duo label={tt("Each element does a different job: a point rewards an action, a badge an achievement, a level a stage, a board a comparison, a bar how far", "Jedes Element hat eine andere Aufgabe: Ein Punkt belohnt eine Handlung, ein Abzeichen eine Leistung, ein Level eine Stufe, eine Rangliste einen Vergleich, ein Balken wie weit")} left={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={44} y={3} w={106} items={[{ icon: "play", text: "POINTS: AN ACTION" }, { icon: "idea", text: "BADGE: AN ACHIEVEMENT" }, { icon: "chart", text: "BOARD: A COMPARISON" }, { icon: "clock", text: "BAR: HOW FAR" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Duo label={tt("Kim studies every evening because a prize hangs in front of her", "Kim lernt jeden Abend, weil ein Preis vor ihr hängt")} left={{ who: "kim", face: "happy" }}>
      <Notes x={50} y={8} w={86} title="THE MONTH OF POINTS" items={[{ icon: "idea", text: "PRIZE: TOP 10" }, { icon: "play", text: "KIM: 8 EVENINGS" }]} />
    </Duo>
  ),
  "a2-2": (
    <Duo label={tt("The prize is gone and Kim puts her book down", "Der Preis ist weg, und Kim legt ihr Buch hin")} left={{ who: "kim", face: "sad" }}>
      <Notes x={50} y={8} w={86} title="THE MONTH IS OVER" items={[{ cross: true, text: "PRIZE: GONE" }, { cross: true, text: "KIM: NO EVENINGS" }]} />
      <Mark x={9} y={34} kind="zzz" />
    </Duo>
  ),
  "a2-3": (
    <Duo label={tt("A story case makes Kim curious: no prize, and she carries on", "Ein Fallfaden macht Kim neugierig: kein Preis, und sie macht weiter")} left={{ who: "kim", face: "happy", pose: "up" }}>
      <Notes x={50} y={8} w={86} title="A STORY CASE" items={[{ icon: "book", text: "A REAL NEGOTIATION" }, { tick: true, text: "NO PRIZE, SHE GOES ON" }]} />
    </Duo>
  ),
  "a2-4": (
    <Duo label={tt("The three needs of Self-Determination Theory: autonomy, competence, relatedness", "Die drei Bedürfnisse der Selbstbestimmungstheorie: Autonomie, Kompetenz, Zugehörigkeit")} left={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="THREE NEEDS" items={[{ icon: "gear", text: "AUTONOMY: I CHOOSE" }, { icon: "up", text: "COMPETENCE: I IMPROVE" }, { icon: "heart", text: "RELATEDNESS: I BELONG" }]} />
    </Duo>
  ),
  "a2-5": (
    <Duo label={tt("The test for any element: would it still work if the reward stopped", "Der Test für jedes Element: Würde es noch wirken, wenn die Belohnung endete")} left={{ who: "priya", face: "think" }}>
      <Notes x={44} y={12} w={104} items={[{ icon: "ask", text: "STILL WORKS WITHOUT A REWARD?" }, { tick: true, text: "YES: KEEP IT" }, { cross: true, text: "NO: IT WILL FADE" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Duo label={tt("Points for every login: logins double within a week", "Punkte für jede Anmeldung: Die Anmeldungen verdoppeln sich innerhalb einer Woche")} left={{ who: "dana", face: "happy" }}>
      <Bars a={0.95} b={0.2} la="LOGINS AND CLICKS" lb="OBJECTIVES MASTERED" />
    </Duo>
  ),
  "a3-2": (
    <Duo label={tt("Priya checks the objectives mastered: only a few more", "Priya prüft die gemeisterten Ziele: nur wenige mehr")} left={{ who: "priya", face: "think" }}>
      <Bars a={0.95} b={0.22} la="LOGINS AND CLICKS" lb="OBJECTIVES MASTERED" />
    </Duo>
  ),
  "a3-3": (
    <Duo label={tt("Progress by objectives: the bar moves only when something is mastered", "Fortschritt nach Zielen: Der Balken bewegt sich nur, wenn etwas gemeistert ist")} left={{ who: "kim", face: "happy" }}>
      <Bars a={0.5} b={0.55} la="LOGINS AND CLICKS" lb="OBJECTIVES MASTERED" />
    </Duo>
  ),
  "a3-4": (
    <Duo label={tt("Everything switched on: activity at its highest, learning still low", "Alles eingeschaltet: Aktivität am höchsten, Lernen weiter niedrig")} left={{ who: "priya", face: "worried" }}>
      <Bars a={1} b={0.25} la="LOGINS AND CLICKS" lb="OBJECTIVES MASTERED" />
    </Duo>
  ),
  "a3-5": (
    <Duo label={tt("The same question for every element: learning or only activity", "Dieselbe Frage für jedes Element: Lernen oder nur Aktivität")} left={{ who: "priya", face: "think", pose: "point" }}>
      <Notes x={44} y={8} w={104} items={[{ icon: "play", text: "LOGIN POINTS: ACTIVITY" }, { icon: "chart", text: "OBJECTIVES BAR: LEARNING" }, { icon: "idea", text: "BADGE AT WORK: LEARNING" }, { icon: "eye", text: "TOTAL RANKING: ACTIVITY" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Duo label={tt("A badge with no objective behind it is decoration", "Ein Abzeichen ohne Ziel dahinter ist Dekoration")} left={{ who: "dana", face: "neutral" }} right={{ who: "priya", face: "think" }}>
      <Notes x={50} y={10} w={60} items={[{ icon: "idea", text: "NEW BADGE" }, { icon: "ask", text: "WHICH OBJECTIVE?" }]} />
    </Duo>
  ),
  "a4-2": (
    <Duo label={tt("Hidden rules: Kim cannot see how the points were counted", "Versteckte Regeln: Kim kann nicht sehen, wie die Punkte gezählt wurden")} left={{ who: "kim", face: "worried" }}>
      <Notes x={50} y={8} w={86} title="THE RULES" items={[{ icon: "lock", text: "HIDDEN" }, { icon: "ask", text: "WHY MORE THAN ME?" }]} />
    </Duo>
  ),
  "a4-3": (
    <Duo label={tt("Too easy bores Kim, too hard worries her", "Zu leicht langweilt Kim, zu schwer beunruhigt sie")} left={{ who: "kim", face: "sad" }}>
      <Notes x={50} y={8} w={86} title="CHALLENGE" items={[{ icon: "down", text: "TOO EASY: BORED" }, { icon: "warn", text: "TOO HARD: WORRIED" }]} />
    </Duo>
  ),
  "a4-4": (
    <Duo label={tt("When the task fits Kim's ability she is absorbed: flow", "Wenn die Aufgabe zu Kims Fähigkeit passt, ist sie vertieft: Flow")} left={{ who: "kim", face: "happy", pose: "up" }}>
      <Notes x={50} y={8} w={86} title="FLOW" items={[{ tick: true, text: "CHALLENGE FITS ABILITY" }, { icon: "clock", text: "TIME FLIES" }]} />
    </Duo>
  ),
  "a4-5": (
    <Duo label={tt("Three questions for any mechanic: linked, fair, a fitting challenge", "Drei Fragen für jede Mechanik: verbunden, fair, eine passende Herausforderung")} left={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="THREE QUESTIONS" items={[{ tick: true, text: "LINKED TO AN OBJECTIVE?" }, { tick: true, text: "VISIBLE AND FAIR?" }, { tick: true, text: "A FITTING CHALLENGE?" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Duo label={tt("Three ideas for LearnLoop, rated on motivation, effort and risk", "Drei Ideen für LearnLoop, bewertet nach Motivation, Aufwand und Risiko")} left={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="3 IDEAS" items={[{ icon: "play", text: "1 · POINTS FOR EVERY ACTION" }, { icon: "chart", text: "2 · PROGRESS BY OBJECTIVES" }, { icon: "book", text: "3 · CONTENT AROUND CASES" }]} />
    </Duo>
  ),
  "a5-2": (
    <Duo label={tt("Idea 1, a points system: motivation mid, effort mid, risk high", "Idee 1, ein Punktesystem: Motivation mittel, Aufwand mittel, Risiko hoch")} left={{ who: "priya", face: "worried" }}>
      <Rate x={44} y={4} title="POINTS SYSTEM" rows={[["MOTIVATION", 2, "MID"], ["EFFORT", 2, "MID"], ["RISK", 3, "HIGH"]]} />
    </Duo>
  ),
  "a5-3": (
    <Duo label={tt("Idea 2, progress by objectives: motivation high, effort low, risk low", "Idee 2, Fortschritt nach Zielen: Motivation hoch, Aufwand niedrig, Risiko niedrig")} left={{ who: "priya", face: "happy" }}>
      <Rate x={44} y={4} title="PROGRESS BY OBJECTIVES" rows={[["MOTIVATION", 3, "HIGH"], ["EFFORT", 1, "LOW"], ["RISK", 1, "LOW"]]} />
    </Duo>
  ),
  "a5-4": (
    <Duo label={tt("Idea 3, content around real cases: motivation mid, effort high, risk low", "Idee 3, Inhalt um echte Fälle: Motivation mittel, Aufwand hoch, Risiko niedrig")} left={{ who: "priya", face: "think" }}>
      <Rate x={44} y={4} title="CONTENT AROUND CASES" rows={[["MOTIVATION", 2, "MID"], ["EFFORT", 3, "HIGH"], ["RISK", 1, "LOW"]]} />
    </Duo>
  ),
  "a5-5": (
    <Duo label={tt("The order: progress first, the content second, points last", "Die Reihenfolge: Fortschritt zuerst, der Inhalt zweitens, Punkte zuletzt")} left={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="LEARNING BEFORE REWARD" items={[{ tick: true, text: "1 · PROGRESS BY OBJECTIVES" }, { tick: true, text: "2 · CONTENT AROUND CASES" }, { cross: true, text: "3 · POINTS, IF AT ALL" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Duo label={tt("Dana: competitors have leaderboards, so LearnLoop needs one too", "Dana: Wettbewerber haben Ranglisten, also braucht LearnLoop auch eine")} left={{ who: "dana", face: "happy", pose: "point" }} right={{ who: "priya", face: "think" }}>
      <Notes x={50} y={10} w={60} items={[{ icon: "eye", text: "THEY HAVE A BOARD" }, { icon: "ask", text: "SO DO WE?" }]} />
    </Duo>
  ),
  "b1-2": (
    <Duo label={tt("Priya starts from the objective: what should learners be able to do", "Priya geht vom Ziel aus: Was sollen Lernende können")} left={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={44} y={12} w={104} items={[{ icon: "book", text: "1 · OBJECTIVE FIRST" }, { icon: "play", text: "2 · THEN A MECHANIC" }, { icon: "eye", text: "3 · THEN THE BEHAVIOUR" }]} />
    </Duo>
  ),
  "b1-3": (
    <Duo label={tt("How could a reward be gamed: points for logging in, so people log in and do nothing else", "Wie könnte eine Belohnung ausgetrickst werden: Punkte fürs Anmelden, also melden sich Leute an und tun sonst nichts")} left={{ who: "priya", face: "worried" }}>
      <Notes x={44} y={8} w={104} title="A PERVERSE INCENTIVE" items={[{ icon: "play", text: "POINTS FOR LOGGING IN" }, { cross: true, text: "PEOPLE LOG IN, NOTHING ELSE" }]} />
    </Duo>
  ),
  "b1-4": (
    <Duo label={tt("The team watches what learners do and whether it lasts after the reward", "Das Team beobachtet, was Lernende tun und ob es nach der Belohnung anhält")} left={{ who: "priya", face: "think" }}>
      <Notes x={44} y={8} w={104} title="WATCH" items={[{ icon: "eye", text: "WHAT LEARNERS DO" }, { icon: "chart", text: "DID THEY LEARN?" }, { icon: "clock", text: "DOES IT LAST?" }]} />
    </Duo>
  ),
  "b1-5": (
    <Duo label={tt("The chain: objective, mechanic, behaviour, result", "Die Kette: Ziel, Mechanik, Verhalten, Ergebnis")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="THE CHAIN" items={[{ tick: true, text: "OBJECTIVE" }, { tick: true, text: "MECHANIC" }, { tick: true, text: "BEHAVIOUR" }, { tick: true, text: "RESULT" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Duo label={tt("A quick lift in activity with nothing left behind", "Ein schneller Schub in der Aktivität, ohne dass etwas bleibt")} left={{ who: "priya", face: "think" }}>
      <Bars a={0.95} b={0.15} la="ACTIVITY NOW" lb="LEARNING LEFT" />
    </Duo>
  ),
  "b2-2": (
    <Duo label={tt("A streak that punishes a missed day pushes Kim back and worries her", "Ein Streak, der einen verpassten Tag bestraft, treibt Kim zurück und beunruhigt sie")} left={{ who: "kim", face: "worried" }}>
      <Notes x={50} y={8} w={86} title="A STREAK" items={[{ icon: "warn", text: "MISS A DAY: LOSE ALL" }, { cross: true, text: "WORRY, NOT LEARNING" }]} />
      <Mark x={9} y={34} kind="sweat" />
    </Duo>
  ),
  "b2-3": (
    <Duo label={tt("A contest for the top ten: most learners cannot win", "Ein Wettbewerb für die ersten zehn: Die meisten Lernenden können nicht gewinnen")} left={{ who: "kim", face: "sad" }}>
      <Notes x={50} y={8} w={86} title="A CONTEST" items={[{ icon: "idea", text: "ONLY THE TOP TEN WIN" }, { cross: true, text: "MOST STOP TRYING" }]} />
    </Duo>
  ),
  "b2-4": (
    <Duo label={tt("Progress by objectives with a result line works now and lasts", "Fortschritt nach Zielen mit Ergebniszeile wirkt jetzt und hält")} left={{ who: "priya", face: "happy", pose: "up" }}>
      <Notes x={50} y={8} w={86} title="THE AIM" items={[{ tick: true, text: "WORKS NOW" }, { tick: true, text: "LASTS AFTER THE REWARD" }]} />
    </Duo>
  ),
  "b2-5": (
    <Duo label={tt("The learner stays in control: choose the order, switch badges off", "Die Lernende behält die Kontrolle: die Reihenfolge wählen, Abzeichen ausschalten")} left={{ who: "kim", face: "happy" }} right={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={50} y={8} w={60} title="KIM DECIDES" items={[{ icon: "gear", text: "CHOOSE THE ORDER" }, { icon: "lock", text: "BADGES OFF" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Duo label={tt("Dana asks Priya to decide, but there is no proof that gamification works", "Dana bittet Priya zu entscheiden, aber es gibt keinen Beleg, dass Gamification wirkt")} left={{ who: "dana", face: "worried" }} right={{ who: "priya", face: "think" }}>
      <Notes x={50} y={10} w={60} items={[{ icon: "ask", text: "NO PROOF YET" }, { icon: "eye", text: "COMPETITORS USE IT" }]} />
    </Duo>
  ),
  "b3-2": (
    <Duo label={tt("One mechanic behind a switch that can be turned off: small and reversible", "Eine Mechanik hinter einem Schalter, der sich ausschalten lässt: klein und umkehrbar")} left={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={44} y={12} w={104} items={[{ icon: "gear", text: "ONE MECHANIC" }, { icon: "lock", text: "BEHIND A SWITCH" }, { tick: true, text: "CAN BE TURNED OFF" }]} />
    </Duo>
  ),
  "b3-3": (
    <Duo label={tt("Half of the learners get the mechanic, half do not: pilot against control", "Die Hälfte der Lernenden bekommt die Mechanik, die andere nicht: Pilot gegen Kontrolle")} left={{ who: "priya", face: "neutral" }}>
      <Notes x={44} y={12} w={104} items={[{ icon: "play", text: "PILOT: GETS IT" }, { icon: "eye", text: "CONTROL: DOES NOT" }, { icon: "chart", text: "THEN COMPARE" }]} />
    </Duo>
  ),
  "b3-4": (
    <Duo label={tt("A figure to watch and a date go into the plan", "Eine Zahl zum Beobachten und ein Datum kommen in den Plan")} left={{ who: "priya", face: "happy", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="REVERSE IF" items={[{ icon: "chart", text: "RETURN RATE NOT ABOVE CONTROL" }, { icon: "clock", text: "BY THE END OF MONTH 3" }]} />
    </Duo>
  ),
  "b3-5": (
    <Duo label={tt("Four parts of a decision without proof: decide, do not know, reverse, give up", "Vier Teile einer Entscheidung ohne Beleg: entscheiden, nicht wissen, zurücknehmen, verzichten")} left={{ who: "priya", face: "neutral", pose: "point" }}>
      <Notes x={44} y={3} w={106} items={[{ tick: true, text: "I DECIDE" }, { tick: true, text: "I DO NOT KNOW" }, { tick: true, text: "I REVERSE IF" }, { cross: true, text: "I GIVE UP: THE LEADERBOARD" }]} />
    </Duo>
  ),
};

