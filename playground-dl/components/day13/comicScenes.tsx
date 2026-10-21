import type { ReactNode } from "react";
import { Board, LOOK, Mark, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes, Page, Rate } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 13 comics (data/day13/comics.ts, DL-STANDARD.md section 13). People: Mia (low vision), Tom (keyboard only), Nia (long text is hard) and Hana
 * (LearnLoop's head of product), all made up. Every label is a short capital word with a German entry in pixelLabelsMore.ts.
 */
LOOK.mia = { hair: "#3B2A20", shirt: "#D9534F", long: true, glasses: true, skin: "#E0B088" };
LOOK.nia = { hair: "#1B1B22", shirt: "#8A63D2", long: true, skin: "#C8946A" };
LOOK.hana = { hair: "#5A3A22", shirt: "#0B8A82", long: true };

const PALE = "#D5D9DF";

/** A lesson page as it is today (pale text, no headings) or after the fixes. */
function Lesson({ fixed = false, x = 40 }: { fixed?: boolean; x?: number }) {
  return fixed ? (
    <Page x={x} y={4} w={84} h={56} title="LESSON" blocks={[{ text: "STEP 1", c: "#B5E3C8", h: 7 }, { text: "STEP 2", c: "#B5E3C8", h: 7 }, { text: "MENU: TAB", c: "#B5D4F4", h: 7 }, { text: "CHART: TEXT", c: "#FFE9A8", h: 7 }]} />
  ) : (
    <Page x={x} y={4} w={84} h={56} title="LESSON" blocks={[{ text: "PALE TEXT", c: "#F1F3F6", tc: PALE, h: 10 }, { text: "CHART", c: "#F1F3F6", tc: PALE, h: 8 }, { text: "MENU: MOUSE", c: "#F1F3F6", tc: PALE, h: 8 }]} />
  );
}

/** A wall of text: a board with many grey lines. */
function Wall({ n = 7 }: { n?: number }) {
  return (
    <Board x={44} y={5} w={80} h={56}>
      <Txt x={48} y={12} size={4} c="#556274">LESSON</Txt>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={48} y={17 + i * 6} width={i % 3 === 2 ? 56 : 72} height={3} fill="#9AA5B5" />
      ))}
    </Board>
  );
}

/** A lesson with headings and short steps. */
function Steps3() {
  return (
    <Board x={44} y={5} w={80} h={56}>
      <Txt x={48} y={12} size={4} c="#556274">LESSON</Txt>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={48} y={17 + i * 14} width={34} height={4} fill="#2E9E6B" />
          <rect x={48} y={23 + i * 14} width={60} height={3} fill="#9AA5B5" />
          <rect x={48} y={28 + i * 14} width={44} height={3} fill="#9AA5B5" />
        </g>
      ))}
    </Board>
  );
}

export const ART_D13: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Duo label={tt("One lesson page: it works for the typical user, but who can it not serve?", "Eine Lektionsseite: Für den typischen Nutzer funktioniert sie, aber wen kann sie nicht bedienen?")} left={{ who: "hana", face: "think" }}>
      <Lesson />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a1-2": (
    <Duo label={tt("Mia has low vision: the text is pale grey on white, and she squints", "Mia hat ein eingeschränktes Sehvermögen: Der Text ist hellgrau auf Weiß, und sie blinzelt")} left={{ who: "mia", face: "worried" }}>
      <Lesson />
      <Mark x={9} y={34} kind="sweat" />
    </Duo>
  ),
  "a1-3": (
    <Duo label={tt("Tom uses only a keyboard: the menu opens only for a mouse, so Tab skips it", "Tom nutzt nur eine Tastatur: Das Menü öffnet sich nur für eine Maus, Tab überspringt es")} left={{ who: "tom", face: "sad" }}>
      <Notes x={44} y={8} w={96} title="THE MENU" items={[{ icon: "play", text: "OPENS ON HOVER" }, { cross: true, text: "TAB: NOTHING OPENS" }]} />
    </Duo>
  ),
  "a1-4": (
    <Duo label={tt("Nia finds long text hard: one block with no headings, so she does not know where to start", "Nia fällt langer Text schwer: ein Block ohne Überschriften, sie weiß also nicht, wo sie anfangen soll")} left={{ who: "nia", face: "sad" }}>
      <Wall />
      <Mark x={9} y={34} kind="zzz" />
    </Duo>
  ),
  "a1-5": (
    <Duo label={tt("Three groups, three kinds of barrier: slows, stops, loses", "Drei Gruppen, drei Arten von Barrieren: bremst, stoppt, verliert")} left={{ who: "hana", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="THREE GROUPS" items={[{ icon: "eye", text: "VISUAL: SLOWS" }, { icon: "lock", text: "MOTOR: STOPS" }, { icon: "ask", text: "COGNITIVE: LOSES" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Duo label={tt("Principle one, perceivable: people can see or hear it", "Prinzip eins, wahrnehmbar: Menschen können es sehen oder hören")} left={{ who: "hana", face: "neutral", pose: "point" }}>
      <Notes x={44} y={10} w={104} title="1 · PERCEIVABLE" items={[{ icon: "eye", text: "SEE IT" }, { icon: "play", text: "HEAR IT" }]} />
    </Duo>
  ),
  "a2-2": (
    <Duo label={tt("Principle two, operable: Tom can use the controls with his keyboard", "Prinzip zwei, bedienbar: Tom kann die Bedienelemente mit seiner Tastatur nutzen")} left={{ who: "tom", face: "neutral" }}>
      <Notes x={44} y={10} w={104} title="2 · OPERABLE" items={[{ icon: "gear", text: "USE THE CONTROLS" }, { tick: true, text: "WITH A KEYBOARD" }]} />
    </Duo>
  ),
  "a2-3": (
    <Duo label={tt("Principle three, understandable: Nia can follow short steps", "Prinzip drei, verständlich: Nia kann kurzen Schritten folgen")} left={{ who: "nia", face: "happy" }}>
      <Steps3 />
    </Duo>
  ),
  "a2-4": (
    <Duo label={tt("Principle four, robust: it works with different browsers and a screen reader", "Prinzip vier, robust: Es funktioniert mit verschiedenen Browsern und einem Screenreader")} left={{ who: "hana", face: "neutral", pose: "point" }}>
      <Notes x={44} y={10} w={104} title="4 · ROBUST" items={[{ icon: "gear", text: "DIFFERENT BROWSERS" }, { icon: "book", text: "SCREEN READER" }]} />
    </Duo>
  ),
  "a2-5": (
    <Duo label={tt("The question for every barrier: which of the four does it break?", "Die Frage für jede Barriere: Welches der vier bricht sie?")} left={{ who: "hana", face: "happy" }}>
      <Notes x={44} y={8} w={104} items={[{ icon: "eye", text: "PERCEIVABLE" }, { icon: "gear", text: "OPERABLE" }, { icon: "ask", text: "UNDERSTANDABLE" }, { icon: "lock", text: "ROBUST" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Duo label={tt("The page as it stands: pale text, a chart with no words, no headings, a menu that needs a mouse", "Die Seite, wie sie jetzt ist: blasser Text, ein Diagramm ohne Worte, keine Überschriften, ein Menü, das eine Maus braucht")} left={{ who: "hana", face: "worried" }}>
      <Lesson />
    </Duo>
  ),
  "a3-2": (
    <Duo label={tt("Fix one: a contrast of at least 4.5 to 1, so Mia can read the text", "Korrektur eins: ein Kontrast von mindestens 4,5 zu 1, damit Mia den Text lesen kann")} left={{ who: "mia", face: "happy" }}>
      <Rate x={44} y={4} title="TEXT CONTRAST" rows={[["BEFORE", 1, "PALE"], ["AFTER", 3, "4.5 : 1"], ["READABLE", 3, "YES"]]} />
    </Duo>
  ),
  "a3-3": (
    <Duo label={tt("Fix two: the chart gets a sentence that says what it shows", "Korrektur zwei: Das Diagramm bekommt einen Satz, der sagt, was es zeigt")} left={{ who: "hana", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="A TEXT ALTERNATIVE" items={[{ icon: "chart", text: "THE CHART" }, { icon: "book", text: "A SENTENCE FOR IT" }, { tick: true, text: "A SCREEN READER SAYS IT" }]} />
    </Duo>
  ),
  "a3-4": (
    <Duo label={tt("Fixes three and four: headings mark the steps and the menu opens with Tab", "Korrekturen drei und vier: Überschriften markieren die Schritte, und das Menü öffnet sich mit Tab")} left={{ who: "tom", face: "happy" }} right={{ who: "nia", face: "happy" }}>
      <Lesson fixed x={38} />
    </Duo>
  ),
  "a3-5": (
    <Duo label={tt("Four small, testable fixes, each frees a different group", "Vier kleine, prüfbare Korrekturen, jede befreit eine andere Gruppe")} left={{ who: "hana", face: "happy" }}>
      <Notes x={44} y={6} w={104} items={[{ tick: true, text: "CONTRAST: MIA" }, { tick: true, text: "TEXT ALTERNATIVE: BLIND" }, { tick: true, text: "STRUCTURE: NIA" }, { tick: true, text: "KEYBOARD: TOM" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Duo label={tt("One long block of text: Nia gives up before the second sentence", "Ein langer Textblock: Nia gibt vor dem zweiten Satz auf")} left={{ who: "nia", face: "sad" }}>
      <Wall n={8} />
      <Mark x={9} y={34} kind="zzz" />
    </Duo>
  ),
  "a4-2": (
    <Duo label={tt("Plain language: short sentences, everyday words, each abbreviation explained once", "Schlichte Sprache: kurze Sätze, Alltagswörter, jede Abkürzung einmal erklärt")} left={{ who: "hana", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="PLAIN LANGUAGE" items={[{ icon: "pencil", text: "SHORT SENTENCES" }, { icon: "book", text: "EVERYDAY WORDS" }, { icon: "idea", text: "EXPLAIN ONCE" }]} />
    </Duo>
  ),
  "a4-3": (
    <Duo label={tt("A clear visual hierarchy: real headings and one main action", "Eine klare visuelle Hierarchie: echte Überschriften und eine Hauptaktion")} left={{ who: "nia", face: "happy" }}>
      <Steps3 />
    </Duo>
  ),
  "a4-4": (
    <Duo label={tt("Intuitive interaction: the same pattern for the same task", "Intuitive Interaktion: dasselbe Muster für dieselbe Aufgabe")} left={{ who: "tom", face: "happy" }}>
      <Notes x={44} y={10} w={104} title="INTUITIVE CONTROLS" items={[{ icon: "play", text: "THE SAME BUTTON" }, { tick: true, text: "THE SAME RESULT" }]} />
    </Duo>
  ),
  "a4-5": (
    <Duo label={tt("A barrier avoided in the design never has to be repaired", "Eine Barriere, die im Design vermieden wird, muss nie repariert werden")} left={{ who: "hana", face: "happy" }}>
      <Notes x={44} y={10} w={104} items={[{ tick: true, text: "PLAIN LANGUAGE" }, { tick: true, text: "A CLEAR HIERARCHY" }, { tick: true, text: "INTUITIVE CONTROLS" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Duo label={tt("Three ideas, three questions: impact, effort and risk", "Drei Ideen, drei Fragen: Wirkung, Aufwand und Risiko")} left={{ who: "hana", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="THREE IDEAS" items={[{ icon: "up", text: "IMPACT" }, { icon: "clock", text: "EFFORT" }, { icon: "warn", text: "RISK" }]} />
    </Duo>
  ),
  "a5-2": (
    <Duo label={tt("A skip link and a visible focus: impact high, effort low, risk low", "Ein Sprunglink und ein sichtbarer Fokus: Wirkung hoch, Aufwand niedrig, Risiko niedrig")} left={{ who: "tom", face: "happy" }}>
      <Rate x={44} y={4} title="SKIP LINK AND FOCUS" rows={[["IMPACT", 3, "HIGH"], ["EFFORT", 1, "LOW"], ["RISK", 1, "LOW"]]} />
    </Duo>
  ),
  "a5-3": (
    <Duo label={tt("Captions for ten videos: impact high, effort mid, risk low", "Untertitel für zehn Videos: Wirkung hoch, Aufwand mittel, Risiko niedrig")} left={{ who: "hana", face: "neutral" }}>
      <Rate x={44} y={4} title="CAPTIONS FOR 10 VIDEOS" rows={[["IMPACT", 3, "HIGH"], ["EFFORT", 2, "MID"], ["RISK", 1, "LOW"]]} />
    </Duo>
  ),
  "a5-4": (
    <Duo label={tt("Rewrite all lessons: impact mid, effort high, risk high", "Alle Lektionen neu schreiben: Wirkung mittel, Aufwand hoch, Risiko hoch")} left={{ who: "hana", face: "worried" }}>
      <Rate x={44} y={4} title="REWRITE ALL LESSONS" rows={[["IMPACT", 2, "MID"], ["EFFORT", 3, "HIGH"], ["RISK", 3, "HIGH"]]} />
    </Duo>
  ),
  "a5-5": (
    <Duo label={tt("The order: free the blocked group first, captions second, the big rewrite later in steps", "Die Reihenfolge: zuerst die blockierte Gruppe befreien, Untertitel zweitens, die große Überarbeitung später in Schritten")} left={{ who: "hana", face: "happy" }}>
      <Notes x={44} y={8} w={104} title="THE ORDER" items={[{ icon: "check", text: "1 · SKIP LINK AND FOCUS" }, { icon: "check", text: "2 · CAPTIONS" }, { icon: "clock", text: "3 · REWRITE, IN STEPS" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Duo label={tt("The requirement: WCAG 2.2 level AA is the floor, not the goal", "Die Anforderung: WCAG 2.2 Stufe AA ist die Untergrenze, nicht das Ziel")} left={{ who: "hana", face: "neutral", pose: "point" }}>
      <Notes x={44} y={10} w={104} title="1 · THE REQUIREMENT" items={[{ icon: "lock", text: "WCAG 2.2 · LEVEL AA" }, { icon: "up", text: "THE FLOOR, NOT THE GOAL" }]} />
    </Duo>
  ),
  "b1-2": (
    <Duo label={tt("The priority: start where most learners meet the barrier", "Die Priorität: dort beginnen, wo die meisten Lernenden auf die Barriere treffen")} left={{ who: "hana", face: "neutral", pose: "point" }}>
      <Notes x={44} y={10} w={104} title="2 · THE PRIORITY" items={[{ icon: "chart", text: "MOST USED FIRST" }, { icon: "eye", text: "WHERE MOST MEET IT" }]} />
    </Duo>
  ),
  "b1-3": (
    <Duo label={tt("The process: a check at every design review", "Der Prozess: eine Prüfung bei jedem Design-Review")} left={{ who: "hana", face: "neutral", pose: "point" }}>
      <Notes x={44} y={10} w={104} title="3 · THE PROCESS" items={[{ icon: "gear", text: "CHECK AT DESIGN REVIEW" }, { tick: true, text: "NEW CONTENT STAYS OK" }]} />
    </Duo>
  ),
  "b1-4": (
    <Duo label={tt("The measure: indicators the management can read", "Die Messung: Indikatoren, die das Management lesen kann")} left={{ who: "hana", face: "neutral", pose: "point" }}>
      <Notes x={44} y={10} w={104} title="4 · THE MEASURE" items={[{ icon: "chart", text: "A FIGURE TO WATCH" }, { icon: "up", text: "PROGRESS SHOWS" }]} />
    </Duo>
  ),
  "b1-5": (
    <Duo label={tt("The chain: requirement, priority, process, measure", "Die Kette: Anforderung, Priorität, Prozess, Messung")} left={{ who: "hana", face: "happy" }}>
      <Notes x={44} y={6} w={104} items={[{ icon: "lock", text: "REQUIREMENT" }, { icon: "chart", text: "PRIORITY" }, { icon: "gear", text: "PROCESS" }, { icon: "up", text: "MEASURE" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Duo label={tt("A cheap overlay plug-in removes no barrier", "Ein günstiges Overlay-Plug-in beseitigt keine Barriere")} left={{ who: "hana", face: "worried" }}>
      <Notes x={44} y={10} w={104} title="A CHEAP OVERLAY" items={[{ icon: "clock", text: "CHEAP AND QUICK" }, { cross: true, text: "NO BARRIER REMOVED" }]} />
    </Duo>
  ),
  "b2-2": (
    <Duo label={tt("Six measures placed by cost and by reach: cheap with wide reach first", "Sechs Maßnahmen nach Kosten und Reichweite geordnet: günstig mit großer Reichweite zuerst")} left={{ who: "hana", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="COST AGAINST REACH" items={[{ icon: "up", text: "CHEAP, WIDE: FIRST" }, { icon: "clock", text: "COSTLY, WIDE: PLAN IT" }, { icon: "down", text: "COSTLY, NARROW: AVOID" }]} />
    </Duo>
  ),
  "b2-3": (
    <Duo label={tt("A separate accessible version: the most costly and a narrow group", "Eine getrennte barrierefreie Fassung: die teuerste und eine kleine Gruppe")} left={{ who: "hana", face: "worried" }}>
      <Notes x={44} y={10} w={104} title="A SEPARATE VERSION" items={[{ icon: "down", text: "THE MOST COSTLY" }, { icon: "warn", text: "A NARROW GROUP" }]} />
    </Duo>
  ),
  "b2-4": (
    <Duo label={tt("A text alternative for 2,000 items: do it in steps, the most-viewed first", "Eine Textalternative für 2.000 Inhalte: in Schritten, die meistgesehenen zuerst")} left={{ who: "hana", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="2,000 ITEMS" items={[{ icon: "check", text: "STEP 1 · MOST VIEWED" }, { icon: "clock", text: "STEP 2 · THE NEXT" }, { icon: "clock", text: "STEP 3 · THE REST" }]} />
    </Duo>
  ),
  "b2-5": (
    <Duo label={tt("The rule: the most learners for the least cost, with the standard as the floor", "Die Regel: die meisten Lernenden für die geringsten Kosten, mit dem Standard als Untergrenze")} left={{ who: "hana", face: "happy" }}>
      <Notes x={44} y={12} w={104} items={[{ tick: true, text: "THE MOST LEARNERS" }, { tick: true, text: "THE LEAST COST" }, { tick: true, text: "THE STANDARD IS THE FLOOR" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Duo label={tt("Nobody knows how many pages fail WCAG, and a decision is due", "Niemand weiß, wie viele Seiten WCAG nicht erfüllen, und eine Entscheidung steht an")} left={{ who: "hana", face: "think" }}>
      <Notes x={44} y={10} w={104} title="HOW MUCH FAILS?" items={[{ icon: "ask", text: "THE SCALE IS UNKNOWN" }, { icon: "clock", text: "A DECISION IS DUE" }]} />
    </Duo>
  ),
  "b3-2": (
    <Duo label={tt("Part one, I decide: fix the ten most-visited pages and audit five more", "Teil eins, ich entscheide: die zehn meistbesuchten Seiten beheben und fünf weitere auditieren")} left={{ who: "hana", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="1 · I DECIDE" items={[{ icon: "check", text: "FIX 10 PAGES FIRST" }, { icon: "eye", text: "AUDIT 5 MORE" }]} />
    </Duo>
  ),
  "b3-3": (
    <Duo label={tt("Part two, I do not know: how many barriers the other pages have", "Teil zwei, ich weiß nicht: wie viele Barrieren die anderen Seiten haben")} left={{ who: "hana", face: "think" }}>
      <Notes x={44} y={10} w={104} title="2 · I DO NOT KNOW" items={[{ icon: "ask", text: "THE OTHER PAGES" }]} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "b3-4": (
    <Duo label={tt("Part three, I reverse if: a figure to watch and a date", "Teil drei, ich nehme zurück, wenn: eine Zahl zum Beobachten und ein Datum")} left={{ who: "hana", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="3 · I REVERSE IF" items={[{ icon: "chart", text: "OVER 5 BARRIERS A PAGE" }, { icon: "clock", text: "BY THE END OF MONTH 3" }]} />
    </Duo>
  ),
  "b3-5": (
    <Duo label={tt("Part four, I give up: the claim fully accessible, for this year", "Teil vier, ich verzichte auf: die Aussage vollständig barrierefrei, in diesem Jahr")} left={{ who: "hana", face: "neutral" }}>
      <Notes x={44} y={6} w={104} items={[{ icon: "check", text: "I DECIDE" }, { icon: "ask", text: "I DO NOT KNOW" }, { icon: "clock", text: "I REVERSE IF" }, { icon: "lock", text: "I GIVE UP" }]} />
    </Duo>
  ),
};
