import type { ReactNode } from "react";
import { Board, LOOK, Mark, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes, Page, Rate } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 14 comics (data/day14/comics.ts, DL-STANDARD.md section 13). People: Kim (a new learner), Raj (a learner), Ava (a learner in a test) and Noor
 * (LearnLoop's head of UX), all made up. Every label is a short capital word with a German entry in pixelLabelsMore.ts.
 */
LOOK.kimc = { hair: "#9B4A1E", shirt: "#E07A1F", long: true };
LOOK.raj = { hair: "#1B1B22", shirt: "#3D7BD9", skin: "#B98A5E" };
LOOK.ava = { hair: "#3B2A20", shirt: "#8A63D2", long: true, skin: "#E0B088" };
LOOK.noor = { hair: "#1B1B22", shirt: "#0B8A82", long: true, glasses: true, skin: "#C8946A" };

/** A text box: a number of grey lines (long, dense lines for a hard text). */
function Text({ n, dense = false, title = "WELCOME" }: { n: number; dense?: boolean; title?: string }) {
  return (
    <Board x={44} y={5} w={80} h={56}>
      <Txt x={48} y={12} size={4} c="#556274">{title}</Txt>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={48} y={17 + i * (dense ? 5 : 8)} width={dense ? 72 : i % 2 ? 40 : 60} height={dense ? 3 : 4} fill={dense ? "#556274" : "#9AA5B5"} />
      ))}
    </Board>
  );
}

/** A menu: a number of entries in a row, long or short. */
function Menu({ n, label }: { n: number; label: string }) {
  return (
    <Board x={40} y={6} w={88} h={52}>
      <rect x={40} y={6} width={88} height={5} fill="#3F4A58" />
      <Txt x={43} y={10.2} size={3.4} c="#FFFFFF">{label}</Txt>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={44} y={15 + i * (n > 6 ? 4.4 : 7.5)} width={n > 6 ? 70 : 50} height={n > 6 ? 3 : 5} fill={n > 6 ? "#9AA5B5" : "#B5E3C8"} stroke="#1B1B1F" strokeWidth={0.4} />
      ))}
    </Board>
  );
}

/** Four small boxes in a row, each a step of a loop or a chain, the marked ones filled. */
function Steps4({ labels, on = 4 }: { labels: [string, string, string, string]; on?: number }) {
  return (
    <Board x={36} y={10} w={96} h={40}>
      {labels.map((l, i) => (
        <g key={l}>
          <rect x={40 + i * 23} y={22} width={20} height={14} fill={i < on ? "#B5E3C8" : "#E4E8EE"} stroke="#1B1B1F" strokeWidth={0.6} />
          <Txt x={50 + i * 23} y={31} size={3.5} anchor="middle">{l}</Txt>
        </g>
      ))}
      <Txt x={40} y={17} size={4} c="#556274">{"1  2  3  4"}</Txt>
    </Board>
  );
}

export const ART_D14: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Duo label={tt("Kim opens the welcome text: one long sentence of 52 words with technical terms", "Kim öffnet den Willkommenstext: ein langer Satz mit 52 Wörtern und Fachbegriffen")} left={{ who: "kimc", face: "sad" }}>
      <Text n={7} dense />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a1-2": (
    <Duo label={tt("Short sentences, but the hard words stay: Kim is still stuck", "Kurze Sätze, aber die schweren Wörter bleiben: Kim hängt immer noch fest")} left={{ who: "kimc", face: "worried" }} right={{ who: "noor", face: "neutral", pose: "point" }}>
      <Notes x={50} y={8} w={78} title="SHORT SENTENCES" items={[{ tick: true, text: "SHORT" }, { cross: true, text: "ASYNCHRONOUS MODALITY" }]} />
    </Duo>
  ),
  "a1-3": (
    <Duo label={tt("The plain version: short sentences, everyday words, one thing to do", "Die schlichte Fassung: kurze Sätze, Alltagswörter, eine Sache zu tun")} left={{ who: "kimc", face: "happy" }}>
      <Notes x={44} y={8} w={96} title="PLAIN" items={[{ tick: true, text: "SHORT SENTENCES" }, { tick: true, text: "EVERYDAY WORDS" }, { icon: "play", text: "MY FIRST LESSON" }]} />
    </Duo>
  ),
  "a1-4": (
    <Duo label={tt("Three principles of plain language: short sentences, clear terms, no jargon", "Drei Prinzipien schlichter Sprache: kurze Sätze, klare Begriffe, kein Jargon")} left={{ who: "noor", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="THREE PRINCIPLES" items={[{ icon: "pencil", text: "SHORT SENTENCES" }, { icon: "book", text: "CLEAR TERMS" }, { icon: "cross", text: "NO JARGON" }]} />
    </Duo>
  ),
  "a1-5": (
    <Duo label={tt("Language is access, and access is use", "Sprache ist Zugang, und Zugang ist Nutzung")} left={{ who: "noor", face: "happy" }}>
      <Notes x={44} y={12} w={104} items={[{ icon: "book", text: "LANGUAGE" }, { icon: "lock", text: "ACCESS" }, { icon: "play", text: "USE" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Duo label={tt("A long menu and no explanation: Raj cannot find his course", "Ein langes Menü und keine Erklärung: Raj findet seinen Kurs nicht")} left={{ who: "raj", face: "worried" }}>
      <Menu n={9} label="MENU" />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "a2-2": (
    <Duo label={tt("Fix one: a short, clear menu, with every course in one place", "Korrektur eins: ein kurzes, klares Menü, mit jedem Kurs an einem Ort")} left={{ who: "raj", face: "happy" }} right={{ who: "noor", face: "neutral", pose: "point" }}>
      <Menu n={4} label="MENU" />
    </Duo>
  ),
  "a2-3": (
    <Duo label={tt("Principle one, efficiency: the common action takes few steps", "Prinzip eins, Effizienz: Die häufige Aktion braucht wenige Schritte")} left={{ who: "raj", face: "happy" }}>
      <Notes x={44} y={10} w={104} title="1 · EFFICIENCY" items={[{ icon: "play", text: "RESUME: ONE TAP" }, { icon: "clock", text: "FEW STEPS" }]} />
    </Duo>
  ),
  "a2-4": (
    <Duo label={tt("Principles two and three: warn before a mistake, and use the same name for the same thing", "Prinzipien zwei und drei: vor einem Fehler warnen und dieselbe Sache gleich benennen")} left={{ who: "noor", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="2 AND 3" items={[{ icon: "warn", text: "ERROR PREVENTION" }, { icon: "lock", text: "WARN BEFORE DELETE" }, { icon: "check", text: "CONSISTENCY" }]} />
    </Duo>
  ),
  "a2-5": (
    <Duo label={tt("Three usability principles: efficiency, error prevention, consistency", "Drei Usability-Prinzipien: Effizienz, Fehlervermeidung, Konsistenz")} left={{ who: "noor", face: "happy" }}>
      <Notes x={44} y={12} w={104} items={[{ tick: true, text: "EFFICIENCY" }, { tick: true, text: "ERROR PREVENTION" }, { tick: true, text: "CONSISTENCY" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Duo label={tt("Asking a manager: the manager says it is clear, because the manager knows it", "Eine Führungskraft fragen: Sie sagt, es sei klar, weil sie es kennt")} left={{ who: "noor", face: "think" }}>
      <Notes x={44} y={10} w={104} title="ASK A MANAGER" items={[{ icon: "ask", text: "IS IT CLEAR?" }, { icon: "check", text: "YES, I KNOW IT" }]} />
    </Duo>
  ),
  "a3-2": (
    <Duo label={tt("Watching one learner: Ava stops at the menu", "Einer Lernenden zusehen: Ava bleibt am Menü hängen")} left={{ who: "noor", face: "neutral", pose: "point" }} right={{ who: "ava", face: "worried" }}>
      <Menu n={8} label="MENU" />
    </Duo>
  ),
  "a3-3": (
    <Duo label={tt("Watching several different learners: four stop in four places", "Mehreren verschiedenen Lernenden zusehen: Vier bleiben an vier Stellen hängen")} left={{ who: "noor", face: "neutral" }}>
      <Notes x={44} y={6} w={104} title="FOUR PLACES" items={[{ icon: "warn", text: "THE MENU" }, { icon: "warn", text: "THE JARGON" }, { icon: "warn", text: "THE FORM" }, { icon: "warn", text: "THE SMALL TEXT" }]} />
    </Duo>
  ),
  "a3-4": (
    <Duo label={tt("The three steps of a test: observe, listen, name the hurdle", "Die drei Schritte eines Tests: beobachten, zuhören, die Hürde benennen")} left={{ who: "noor", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="A TEST" items={[{ icon: "eye", text: "OBSERVE" }, { icon: "ask", text: "LISTEN" }, { icon: "pencil", text: "NAME THE HURDLE" }]} />
    </Duo>
  ),
  "a3-5": (
    <Duo label={tt("The rule: test with real, different users and check understanding, not opinion", "Die Regel: mit echten, verschiedenen Nutzern testen und Verständnis prüfen, nicht Meinung")} left={{ who: "noor", face: "happy" }}>
      <Notes x={44} y={12} w={104} items={[{ tick: true, text: "REAL USERS" }, { tick: true, text: "DIFFERENT USERS" }, { tick: true, text: "UNDERSTANDING, NOT OPINION" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Duo label={tt("Step one: change one small thing, the welcome text", "Schritt eins: eine kleine Sache ändern, den Willkommenstext")} left={{ who: "noor", face: "neutral", pose: "point" }}>
      <Steps4 labels={["CHANGE", "TEST", "MEASURE", "ADJUST"]} on={1} />
    </Duo>
  ),
  "a4-2": (
    <Duo label={tt("Step two: Ava and others try the new text", "Schritt zwei: Ava und andere probieren den neuen Text aus")} left={{ who: "ava", face: "happy" }}>
      <Steps4 labels={["CHANGE", "TEST", "MEASURE", "ADJUST"]} on={2} />
    </Duo>
  ),
  "a4-3": (
    <Duo label={tt("Step three: measure with data how many learners carry on", "Schritt drei: mit Daten messen, wie viele Lernende weitermachen")} left={{ who: "noor", face: "neutral", pose: "point" }}>
      <Steps4 labels={["CHANGE", "TEST", "MEASURE", "ADJUST"]} on={3} />
    </Duo>
  ),
  "a4-4": (
    <Duo label={tt("Step four: adjust, the form is the next hurdle", "Schritt vier: anpassen, das Formular ist die nächste Hürde")} left={{ who: "noor", face: "think" }}>
      <Steps4 labels={["CHANGE", "TEST", "MEASURE", "ADJUST"]} on={4} />
    </Duo>
  ),
  "a4-5": (
    <Duo label={tt("The loop starts again: continuous evaluation never stops", "Der Kreislauf beginnt von vorn: Kontinuierliche Bewertung endet nie")} left={{ who: "noor", face: "happy" }}>
      <Notes x={44} y={12} w={104} items={[{ icon: "gear", text: "ITERATE" }, { icon: "chart", text: "USE DATA" }, { icon: "clock", text: "KEEP EVALUATING" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Duo label={tt("Three ideas, three questions: impact, effort and risk", "Drei Ideen, drei Fragen: Wirkung, Aufwand und Risiko")} left={{ who: "noor", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="THREE IDEAS" items={[{ icon: "up", text: "IMPACT" }, { icon: "clock", text: "EFFORT" }, { icon: "warn", text: "RISK" }]} />
    </Duo>
  ),
  "a5-2": (
    <Duo label={tt("Plain messages in place of error codes: impact high, effort low, risk low", "Schlichte Meldungen statt Fehlercodes: Wirkung hoch, Aufwand niedrig, Risiko niedrig")} left={{ who: "kimc", face: "happy" }}>
      <Rate x={44} y={4} title="PLAIN MESSAGES" rows={[["IMPACT", 3, "HIGH"], ["EFFORT", 1, "LOW"], ["RISK", 1, "LOW"]]} />
    </Duo>
  ),
  "a5-3": (
    <Duo label={tt("One menu of six entries: impact high, effort mid, risk mid", "Ein Menü mit sechs Einträgen: Wirkung hoch, Aufwand mittel, Risiko mittel")} left={{ who: "raj", face: "happy" }}>
      <Rate x={44} y={4} title="ONE MENU" rows={[["IMPACT", 3, "HIGH"], ["EFFORT", 2, "MID"], ["RISK", 2, "MID"]]} />
    </Duo>
  ),
  "a5-4": (
    <Duo label={tt("A new chat function: impact low, effort high, risk high", "Eine neue Chat-Funktion: Wirkung niedrig, Aufwand hoch, Risiko hoch")} left={{ who: "noor", face: "worried" }}>
      <Rate x={44} y={4} title="A NEW CHAT" rows={[["IMPACT", 1, "LOW"], ["EFFORT", 3, "HIGH"], ["RISK", 3, "HIGH"]]} />
    </Duo>
  ),
  "a5-5": (
    <Duo label={tt("The order: simplify first, add functions later", "Die Reihenfolge: zuerst vereinfachen, Funktionen später ergänzen")} left={{ who: "noor", face: "happy" }}>
      <Notes x={44} y={8} w={104} title="THE ORDER" items={[{ icon: "check", text: "1 · PLAIN MESSAGES" }, { icon: "check", text: "2 · ONE MENU" }, { icon: "clock", text: "3 · A CHAT, LATER" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Duo label={tt("Step one: find the hurdle, where do learners stop and why?", "Schritt eins: die Hürde finden, wo hören Lernende auf und warum?")} left={{ who: "noor", face: "think" }}>
      <Steps4 labels={["FIND", "SIMPLIFY", "TEST", "ADJUST"]} on={1} />
    </Duo>
  ),
  "b1-2": (
    <Duo label={tt("Step two: simplify, plain words, one place, one name", "Schritt zwei: vereinfachen, schlichte Worte, ein Ort, ein Name")} left={{ who: "noor", face: "neutral", pose: "point" }}>
      <Steps4 labels={["FIND", "SIMPLIFY", "TEST", "ADJUST"]} on={2} />
    </Duo>
  ),
  "b1-3": (
    <Duo label={tt("Step three: test with different learners, understanding not opinion", "Schritt drei: mit verschiedenen Lernenden testen, Verständnis, nicht Meinung")} left={{ who: "ava", face: "happy" }}>
      <Steps4 labels={["FIND", "SIMPLIFY", "TEST", "ADJUST"]} on={3} />
    </Duo>
  ),
  "b1-4": (
    <Duo label={tt("Step four: adjust with the data and go on to the next hurdle", "Schritt vier: mit den Daten anpassen und zur nächsten Hürde weitergehen")} left={{ who: "noor", face: "neutral", pose: "point" }}>
      <Steps4 labels={["FIND", "SIMPLIFY", "TEST", "ADJUST"]} on={4} />
    </Duo>
  ),
  "b1-5": (
    <Duo label={tt("Comprehensibility, then usage, then success", "Verständlichkeit, dann Nutzung, dann Erfolg")} left={{ who: "noor", face: "happy" }}>
      <Notes x={44} y={12} w={104} items={[{ icon: "book", text: "COMPREHENSIBILITY" }, { icon: "play", text: "USAGE" }, { icon: "up", text: "SUCCESS" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Duo label={tt("Everything on one page, in expert terms: dense and unclear", "Alles auf einer Seite, in Expertenworten: dicht und unklar")} left={{ who: "kimc", face: "sad" }}>
      <Text n={7} dense title="EVERYTHING" />
    </Duo>
  ),
  "b2-2": (
    <Duo label={tt("A bare page with one slogan: clear, but empty", "Eine leere Seite mit einem Slogan: klar, aber leer")} left={{ who: "raj", face: "neutral" }}>
      <Text n={1} title="ONE SLOGAN" />
    </Duo>
  ),
  "b2-3": (
    <Duo label={tt("Short steps with a More detail link: rich and clear, the aim", "Kurze Schritte mit einem Link Mehr Details: reich und klar, das Ziel")} left={{ who: "noor", face: "happy" }}>
      <Page x={40} y={4} w={88} h={56} title="SHORT STEPS" blocks={[{ text: "STEP 1", c: "#B5E3C8", h: 7 }, { text: "STEP 2", c: "#B5E3C8", h: 7 }, { text: "STEP 3", c: "#B5E3C8", h: 7 }, { text: "MORE DETAIL", c: "#B5D4F4", h: 7 }]} />
    </Duo>
  ),
  "b2-4": (
    <Duo label={tt("Standard against flexibility: one standard path and a way into more detail", "Standard gegen Flexibilität: ein Standardweg und ein Zugang zu mehr Detail")} left={{ who: "noor", face: "neutral", pose: "point" }}>
      <Notes x={44} y={10} w={104} title="TWO PULLS" items={[{ icon: "lock", text: "ONE STANDARD PATH" }, { icon: "gear", text: "A WAY TO MORE DETAIL" }]} />
    </Duo>
  ),
  "b2-5": (
    <Duo label={tt("The rule: neither too much nor too little simplification", "Die Regel: weder zu viel noch zu wenig Vereinfachung")} left={{ who: "noor", face: "happy" }}>
      <Notes x={44} y={12} w={104} items={[{ cross: true, text: "TOO MUCH: LOSES DETAIL" }, { cross: true, text: "TOO LITTLE: LOSES LEARNERS" }, { tick: true, text: "KEEP WHAT THE SUBJECT NEEDS" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Duo label={tt("Learners leave in the first week, and nobody knows exactly where they stop", "Lernende gehen in der ersten Woche, und niemand weiß genau, wo sie aufhören")} left={{ who: "noor", face: "think" }}>
      <Notes x={44} y={10} w={104} title="WHERE DO THEY STOP?" items={[{ icon: "ask", text: "NOT KNOWN EXACTLY" }, { icon: "clock", text: "A DECISION IS DUE" }]} />
    </Duo>
  ),
  "b3-2": (
    <Duo label={tt("Part one, I decide: rewrite the welcome screen in plain words and test it with eight learners", "Teil eins, ich entscheide: den Willkommensbildschirm in schlichten Worten umschreiben und mit acht Lernenden testen")} left={{ who: "noor", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="1 · I DECIDE" items={[{ icon: "pencil", text: "REWRITE THE WELCOME" }, { icon: "eye", text: "TEST WITH 8 LEARNERS" }]} />
    </Duo>
  ),
  "b3-3": (
    <Duo label={tt("Part two, I do not know: whether the text is the main reason people leave", "Teil zwei, ich weiß nicht: ob der Text der Hauptgrund ist, warum Menschen gehen")} left={{ who: "noor", face: "think" }}>
      <Notes x={44} y={10} w={104} title="2 · I DO NOT KNOW" items={[{ icon: "ask", text: "IS THE TEXT THE REASON?" }]} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "b3-4": (
    <Duo label={tt("Part three, I reverse if: drop-out has not fallen from 30 percent to below 27 percent by the end of month 2", "Teil drei, ich nehme zurück, wenn: die Abbrüche nicht von 30 Prozent auf unter 27 Prozent gefallen sind bis Ende von Monat 2")} left={{ who: "noor", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="3 · I REVERSE IF" items={[{ icon: "chart", text: "30% NOT BELOW 27%" }, { icon: "clock", text: "BY THE END OF MONTH 2" }]} />
    </Duo>
  ),
  "b3-5": (
    <Duo label={tt("Part four, I give up: the planned forum, for this year", "Teil vier, ich verzichte auf: das geplante Forum, in diesem Jahr")} left={{ who: "noor", face: "neutral" }}>
      <Notes x={44} y={6} w={104} items={[{ icon: "check", text: "I DECIDE" }, { icon: "ask", text: "I DO NOT KNOW" }, { icon: "clock", text: "I REVERSE IF" }, { icon: "lock", text: "I GIVE UP" }]} />
    </Duo>
  ),
};
