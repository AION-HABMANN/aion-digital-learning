import type { ReactNode } from "react";
import { Bar, Board, LOOK, Mark, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes, Rate } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 16 comics (data/day16/comics.ts, DL-STANDARD.md section 13). People: Sam (a learner), Mia (LearnLoop's data lead) and Dev (head of product), all
 * made up. Every label is a short capital word with a German entry in pixelLabelsMore.ts.
 */
LOOK.sam = { hair: "#2B2B2B", shirt: "#E07A1F", skin: "#B98A5E" };
LOOK.miad = { hair: "#5A3A22", shirt: "#0B8A82", long: true, glasses: true, skin: "#E0B088" };
LOOK.dev = { hair: "#1B1B22", shirt: "#33415C", skin: "#C8946A" };

/** A dashboard with a wall of small metric squares, or a few big ones. */
function Dash({ wall = false, title = "DASHBOARD" }: { wall?: boolean; title?: string }) {
  return (
    <Board x={40} y={4} w={88} h={58}>
      <rect x={40} y={4} width={88} height={5} fill="#3F4A58" />
      <Txt x={43} y={8.2} size={3.4} c="#FFFFFF">{title}</Txt>
      {wall
        ? Array.from({ length: 24 }, (_, i) => <rect key={i} x={44 + (i % 8) * 10} y={13 + Math.floor(i / 8) * 14} width={8} height={11} fill={i % 5 === 0 ? "#FFE9A8" : "#E4E8EE"} stroke="#1B1B1F" strokeWidth={0.3} />)
        : [0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={44 + i * 27} y={14} width={24} height={30} fill="#B5E3C8" stroke="#1B1B1F" strokeWidth={0.5} />
              <Txt x={56 + i * 27} y={32} size={4.4} anchor="middle">{["COMPLETION", "ENGAGEMENT", "DROP-OUT"][i]}</Txt>
            </g>
          ))}
    </Board>
  );
}

/** Two bars side by side (a comparison): a longer and a shorter one. */
function Compare({ a, b, la, lb }: { a: number; b: number; la: string; lb: string }) {
  return (
    <Board x={40} y={8} w={88} h={46}>
      <Txt x={44} y={17} size={4} c="#556274">{la}</Txt>
      <Bar x={44} y={20} w={76} p={a} c="#2E9E6B" />
      <Txt x={44} y={36} size={4} c="#556274">{lb}</Txt>
      <Bar x={44} y={39} w={76} p={b} c="#F59E0B" />
    </Board>
  );
}

/** Four boxes of a chain or a loop. */
function Steps4({ labels, on = 4 }: { labels: [string, string, string, string]; on?: number }) {
  return (
    <Board x={30} y={10} w={108} h={40}>
      {labels.map((l, i) => (
        <g key={l}>
          <rect x={34 + i * 26} y={22} width={23} height={14} fill={i < on ? "#B5E3C8" : "#E4E8EE"} stroke="#1B1B1F" strokeWidth={0.6} />
          <Txt x={45.5 + i * 26} y={31} size={3.2} anchor="middle">{l}</Txt>
        </g>
      ))}
    </Board>
  );
}

export const ART_D16: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Duo label={tt("The dashboard says 70 percent of new learners leave in the first week: clear, but why?", "Das Dashboard sagt, 70 Prozent der neuen Lernenden gehen in der ersten Woche: klar, aber warum?")} left={{ who: "dev", face: "worried" }}>
      <Notes x={46} y={10} w={92} title="THE NUMBER" items={[{ icon: "chart", text: "70% LEAVE IN WEEK 1" }, { icon: "ask", text: "WHY?" }]} />
    </Duo>
  ),
  "a1-2": (
    <Duo label={tt("Mia watches Sam do a quiz: he stops because he cannot find the Save button", "Mia sieht Sam bei einem Quiz zu: Er hält an, weil er den Speichern-Button nicht findet")} left={{ who: "sam", face: "worried" }} right={{ who: "miad", face: "neutral", pose: "point" }}>
      <Notes x={50} y={10} w={78} title="WATCHING SAM" items={[{ icon: "eye", text: "HE STOPS AT THE QUIZ" }, { icon: "ask", text: "WHERE IS SAVE?" }]} />
    </Duo>
  ),
  "a1-3": (
    <Duo label={tt("Two versions compared: a visible Save button keeps 70 of 100, the old one 62 of 100", "Zwei Fassungen verglichen: ein sichtbarer Speichern-Button hält 70 von 100, der alte 62 von 100")} left={{ who: "miad", face: "happy" }}>
      <Compare a={0.7} b={0.62} la="WITH SAVE: 70 OF 100" lb="OLD: 62 OF 100" />
    </Duo>
  ),
  "a1-4": (
    <Duo label={tt("Three methods: usability test, A/B test, observation; qualitative says why, quantitative says how many", "Drei Methoden: Usability-Test, A/B-Test, Beobachtung; qualitativ sagt warum, quantitativ sagt wie viele")} left={{ who: "miad", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="THREE METHODS" items={[{ icon: "eye", text: "USABILITY TEST" }, { icon: "chart", text: "A/B TEST" }, { icon: "pencil", text: "OBSERVATION" }]} />
    </Duo>
  ),
  "a1-5": (
    <Duo label={tt("You usually need both: a number, and someone watching", "Meist braucht man beides: eine Zahl und jemanden, der zusieht")} left={{ who: "miad", face: "happy" }}>
      <Notes x={44} y={12} w={104} items={[{ icon: "chart", text: "QUANTITATIVE: HOW MANY" }, { icon: "eye", text: "QUALITATIVE: WHY" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Duo label={tt("A wall of small metrics: none stands out, and Mia does not know where to look", "Eine Wand aus kleinen Kennzahlen: Keine sticht hervor, und Mia weiß nicht, wohin sie schauen soll")} left={{ who: "miad", face: "worried" }}>
      <Dash wall />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a2-2": (
    <Duo label={tt("Tracking records clicks, time spent and the points where users drop off", "Tracking erfasst Klicks, Verweildauer und die Stellen, an denen Nutzer abspringen")} left={{ who: "miad", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="TRACKING" items={[{ icon: "play", text: "CLICKS" }, { icon: "clock", text: "TIME SPENT" }, { icon: "down", text: "DROP-OFF POINTS" }]} />
    </Duo>
  ),
  "a2-3": (
    <Duo label={tt("Data protection and ethics set limits: collect only what is needed", "Datenschutz und Ethik setzen Grenzen: nur erfassen, was nötig ist")} left={{ who: "miad", face: "neutral" }}>
      <Notes x={44} y={10} w={104} title="LIMITS" items={[{ icon: "lock", text: "DATA PROTECTION" }, { icon: "heart", text: "ETHICS" }]} />
    </Duo>
  ),
  "a2-4": (
    <Duo label={tt("Three KPIs, each with a definition and a target, split by device", "Drei KPIs, jede mit einer Definition und einem Ziel, nach Gerät aufgeteilt")} left={{ who: "miad", face: "happy" }}>
      <Dash />
    </Duo>
  ),
  "a2-5": (
    <Duo label={tt("The chain: UX leads to behaviour, behaviour shows in the KPI", "Die Kette: UX führt zu Verhalten, Verhalten zeigt sich in der KPI")} left={{ who: "miad", face: "happy" }}>
      <Notes x={44} y={12} w={104} items={[{ icon: "pencil", text: "UX" }, { icon: "play", text: "BEHAVIOUR" }, { icon: "chart", text: "KPI" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Duo label={tt("A jump to one cause: the team says the content is too hard, rewrites three lessons, and nothing moves", "Ein Sprung zu einer Ursache: Das Team sagt, der Inhalt sei zu schwer, schreibt drei Lektionen um, und nichts bewegt sich")} left={{ who: "dev", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="A JUMP" items={[{ icon: "chart", text: "70%" }, { icon: "cross", text: "IT MUST BE THE CONTENT" }, { cross: true, text: "NOTHING CHECKED" }]} />
    </Duo>
  ),
  "a3-2": (
    <Duo label={tt("A list of possible causes: hard content, a long form, a slow page, a course that is not what people expected", "Eine Liste möglicher Ursachen: schwerer Inhalt, ein langes Formular, eine langsame Seite, ein Kurs, der nicht das ist, was Menschen erwarteten")} left={{ who: "miad", face: "think" }}>
      <Notes x={44} y={4} w={104} title="POSSIBLE CAUSES" items={[{ icon: "ask", text: "CONTENT TOO HARD" }, { icon: "ask", text: "A LONG FORM" }, { icon: "ask", text: "A SLOW PAGE" }, { icon: "ask", text: "NOT WHAT THEY EXPECTED" }]} />
    </Duo>
  ),
  "a3-3": (
    <Duo label={tt("One cause written as a hypothesis: we believe, so we will, and expect", "Eine Ursache als Hypothese formuliert: Wir glauben, also werden wir, und erwarten")} left={{ who: "miad", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="A HYPOTHESIS" items={[{ icon: "idea", text: "WE BELIEVE" }, { icon: "pencil", text: "SO WE WILL" }, { icon: "chart", text: "AND EXPECT" }]} />
    </Duo>
  ),
  "a3-4": (
    <Duo label={tt("The test: a form with three fields keeps 47 percent against 40 percent, so the form is a real cause", "Der Test: Ein Formular mit drei Feldern hält 47 Prozent gegenüber 40 Prozent, das Formular ist also eine echte Ursache")} left={{ who: "dev", face: "happy" }}>
      <Compare a={0.47} b={0.4} la="3 FIELDS: 47%" lb="LONG FORM: 40%" />
    </Duo>
  ),
  "a3-5": (
    <Duo label={tt("The test for any reading: a symptom, a cause, or a guess that was tested?", "Der Test für jede Deutung: ein Symptom, eine Ursache oder eine Vermutung, die getestet wurde?")} left={{ who: "miad", face: "happy" }}>
      <Notes x={44} y={8} w={104} items={[{ icon: "chart", text: "A SYMPTOM?" }, { icon: "ask", text: "A GUESS?" }, { icon: "check", text: "A TESTED CAUSE?" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Duo label={tt("Step one: a hypothesis, a guess she can check", "Schritt eins: eine Hypothese, eine Vermutung, die sie prüfen kann")} left={{ who: "miad", face: "neutral", pose: "point" }}>
      <Steps4 labels={["HYPOTHESIS", "TEST", "EVALUATE", "REPEAT"]} on={1} />
    </Duo>
  ),
  "a4-2": (
    <Duo label={tt("Step two: a test, one change at a time, with a comparison", "Schritt zwei: ein Test, eine Änderung nach der anderen, mit einem Vergleich")} left={{ who: "miad", face: "neutral", pose: "point" }}>
      <Steps4 labels={["HYPOTHESIS", "TEST", "EVALUATE", "REPEAT"]} on={2} />
    </Duo>
  ),
  "a4-3": (
    <Duo label={tt("Step three: evaluate against the KPI by a rule agreed in advance", "Schritt drei: an der KPI auswerten, nach einer vorab vereinbarten Regel")} left={{ who: "miad", face: "happy" }}>
      <Steps4 labels={["HYPOTHESIS", "TEST", "EVALUATE", "REPEAT"]} on={3} />
    </Duo>
  ),
  "a4-4": (
    <Duo label={tt("Step four: repeat with the next hypothesis, and the loop never stops", "Schritt vier: mit der nächsten Hypothese wiederholen, und der Kreislauf endet nie")} left={{ who: "miad", face: "neutral", pose: "point" }}>
      <Steps4 labels={["HYPOTHESIS", "TEST", "EVALUATE", "REPEAT"]} on={4} />
    </Duo>
  ),
  "a4-5": (
    <Duo label={tt("Hypothesis first, then the test: without a hypothesis the test has nothing to answer", "Erst die Hypothese, dann der Test: Ohne Hypothese hat der Test nichts zu beantworten")} left={{ who: "miad", face: "happy" }}>
      <Notes x={44} y={12} w={104} items={[{ icon: "idea", text: "1 · A HYPOTHESIS" }, { icon: "chart", text: "2 · THEN THE TEST" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Duo label={tt("Three ideas, three questions: KPI impact, effort and risk", "Drei Ideen, drei Fragen: KPI-Wirkung, Aufwand und Risiko")} left={{ who: "miad", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="THREE IDEAS" items={[{ icon: "up", text: "KPI IMPACT" }, { icon: "clock", text: "EFFORT" }, { icon: "warn", text: "RISK" }]} />
    </Duo>
  ),
  "a5-2": (
    <Duo label={tt("Define three KPIs with a target each: impact high, effort low, risk low", "Drei KPIs mit je einem Ziel definieren: Wirkung hoch, Aufwand niedrig, Risiko niedrig")} left={{ who: "dev", face: "happy" }}>
      <Rate x={44} y={4} title="DEFINE 3 KPIS" rows={[["IMPACT", 3, "HIGH"], ["EFFORT", 1, "LOW"], ["RISK", 1, "LOW"]]} />
    </Duo>
  ),
  "a5-3": (
    <Duo label={tt("Five usability tests: impact mid, effort mid, risk mid", "Fünf Usability-Tests: Wirkung mittel, Aufwand mittel, Risiko mittel")} left={{ who: "miad", face: "neutral" }}>
      <Rate x={44} y={4} title="5 USABILITY TESTS" rows={[["IMPACT", 2, "MID"], ["EFFORT", 2, "MID"], ["RISK", 2, "MID"]]} />
    </Duo>
  ),
  "a5-4": (
    <Duo label={tt("A wall dashboard with forty charts: impact low, effort high, risk high", "Ein Wanddashboard mit vierzig Diagrammen: Wirkung niedrig, Aufwand hoch, Risiko hoch")} left={{ who: "miad", face: "worried" }}>
      <Rate x={44} y={4} title="A WALL OF CHARTS" rows={[["IMPACT", 1, "LOW"], ["EFFORT", 3, "HIGH"], ["RISK", 3, "HIGH"]]} />
    </Duo>
  ),
  "a5-5": (
    <Duo label={tt("The order: define what matters first, look for causes next, show data last", "Die Reihenfolge: zuerst festlegen, was zählt, dann Ursachen suchen, Daten zuletzt zeigen")} left={{ who: "miad", face: "happy" }}>
      <Notes x={44} y={8} w={104} title="THE ORDER" items={[{ icon: "check", text: "1 · DEFINE WHAT MATTERS" }, { icon: "check", text: "2 · LOOK FOR CAUSES" }, { icon: "clock", text: "3 · SHOW DATA LAST" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Duo label={tt("Step one: a KPI, one defined figure with a target", "Schritt eins: eine KPI, eine definierte Zahl mit einem Ziel")} left={{ who: "miad", face: "neutral", pose: "point" }}>
      <Steps4 labels={["KPI", "HYPOTHESIS", "TEST", "DECISION"]} on={1} />
    </Duo>
  ),
  "b1-2": (
    <Duo label={tt("Step two: a hypothesis, we believe, so we will, and expect", "Schritt zwei: eine Hypothese, wir glauben, also werden wir, und erwarten")} left={{ who: "miad", face: "neutral", pose: "point" }}>
      <Steps4 labels={["KPI", "HYPOTHESIS", "TEST", "DECISION"]} on={2} />
    </Duo>
  ),
  "b1-3": (
    <Duo label={tt("Step three: a test, one change at a time, with real learners", "Schritt drei: ein Test, eine Änderung nach der anderen, mit echten Lernenden")} left={{ who: "sam", face: "happy" }}>
      <Steps4 labels={["KPI", "HYPOTHESIS", "TEST", "DECISION"]} on={3} />
    </Duo>
  ),
  "b1-4": (
    <Duo label={tt("Step four: a decision by a rule agreed in advance: keep, change or drop", "Schritt vier: eine Entscheidung nach einer vorab vereinbarten Regel: behalten, ändern oder verwerfen")} left={{ who: "dev", face: "happy" }}>
      <Steps4 labels={["KPI", "HYPOTHESIS", "TEST", "DECISION"]} on={4} />
    </Duo>
  ),
  "b1-5": (
    <Duo label={tt("Data leads to insight, and insight leads to a decision", "Daten führen zu Erkenntnis, und Erkenntnis führt zu einer Entscheidung")} left={{ who: "miad", face: "happy" }}>
      <Notes x={44} y={12} w={104} items={[{ icon: "chart", text: "DATA" }, { icon: "idea", text: "INSIGHT" }, { icon: "check", text: "DECISION" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Duo label={tt("Track everything and look for patterns: much data, little insight", "Alles erfassen und nach Mustern suchen: viele Daten, wenig Einsicht")} left={{ who: "dev", face: "neutral" }}>
      <Dash wall title="EVERYTHING" />
    </Duo>
  ),
  "b2-2": (
    <Duo label={tt("Deciding by gut feeling alone: no data, and no way to check", "Allein nach Bauchgefühl entscheiden: keine Daten und keine Möglichkeit zu prüfen")} left={{ who: "dev", face: "think" }}>
      <Notes x={44} y={10} w={104} title="GUT FEELING" items={[{ icon: "ask", text: "NO DATA" }, { cross: true, text: "NOTHING TO CHECK" }]} />
    </Duo>
  ),
  "b2-3": (
    <Duo label={tt("Six approaches by how much data they use and how much insight into causes they give", "Sechs Ansätze danach, wie viele Daten sie nutzen und wie viel Einsicht in Ursachen sie geben")} left={{ who: "miad", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="DATA AGAINST INSIGHT" items={[{ icon: "up", text: "LITTLE DATA, MUCH INSIGHT" }, { icon: "down", text: "MUCH DATA, LITTLE INSIGHT" }]} />
    </Duo>
  ),
  "b2-4": (
    <Duo label={tt("The numbers plus five learner interviews: numbers say how many, interviews say why", "Die Zahlen plus fünf Lernenden-Interviews: Zahlen sagen, wie viele, Interviews sagen, warum")} left={{ who: "miad", face: "happy" }}>
      <Notes x={44} y={8} w={104} title="BOTH" items={[{ icon: "chart", text: "NUMBERS: HOW MANY" }, { icon: "eye", text: "5 INTERVIEWS: WHY" }]} />
    </Duo>
  ),
  "b2-5": (
    <Duo label={tt("The rule: the most insight into causes for the least data", "Die Regel: die meiste Einsicht in Ursachen für die wenigsten Daten")} left={{ who: "miad", face: "happy" }}>
      <Notes x={44} y={12} w={104} items={[{ tick: true, text: "INSIGHT INTO CAUSES" }, { tick: true, text: "FOR THE LEAST DATA" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Duo label={tt("First-week drop-out is 60 percent, there is a lot of data, and nobody knows the cause", "Die Abbrüche in der ersten Woche liegen bei 60 Prozent, es gibt viele Daten, und niemand kennt die Ursache")} left={{ who: "dev", face: "think" }}>
      <Notes x={44} y={8} w={104} title="CAUSES UNCLEAR" items={[{ icon: "chart", text: "60% IN WEEK 1" }, { icon: "ask", text: "THE CAUSE IS UNKNOWN" }]} />
    </Duo>
  ),
  "b3-2": (
    <Duo label={tt("Part one, I decide: define three KPIs and test the shorter sign-up form first", "Teil eins, ich entscheide: drei KPIs definieren und zuerst das kürzere Anmeldeformular testen")} left={{ who: "miad", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="1 · I DECIDE" items={[{ icon: "chart", text: "DEFINE 3 KPIS" }, { icon: "pencil", text: "TEST THE SHORTER FORM" }]} />
    </Duo>
  ),
  "b3-3": (
    <Duo label={tt("Part two, I do not know: whether the form is the main reason people leave", "Teil zwei, ich weiß nicht: ob das Formular der Hauptgrund ist, warum Menschen gehen")} left={{ who: "miad", face: "think" }}>
      <Notes x={44} y={10} w={104} title="2 · I DO NOT KNOW" items={[{ icon: "ask", text: "IS THE FORM THE REASON?" }]} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "b3-4": (
    <Duo label={tt("Part three, I reverse if: drop-out has not fallen from 60 percent to below 55 percent by the end of month 2", "Teil drei, ich nehme zurück, wenn: die Abbrüche nicht von 60 Prozent auf unter 55 Prozent gefallen sind bis Ende von Monat 2")} left={{ who: "miad", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="3 · I REVERSE IF" items={[{ icon: "chart", text: "60% NOT BELOW 55%" }, { icon: "clock", text: "BY THE END OF MONTH 2" }]} />
    </Duo>
  ),
  "b3-5": (
    <Duo label={tt("Part four, I give up: the live wall of charts, for this year", "Teil vier, ich verzichte auf: die Live-Wand aus Diagrammen, in diesem Jahr")} left={{ who: "miad", face: "neutral" }}>
      <Notes x={44} y={6} w={104} items={[{ icon: "check", text: "I DECIDE" }, { icon: "ask", text: "I DO NOT KNOW" }, { icon: "clock", text: "I REVERSE IF" }, { icon: "lock", text: "I GIVE UP" }]} />
    </Duo>
  ),
};
