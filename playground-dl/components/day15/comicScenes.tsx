import type { ReactNode } from "react";
import { Board, LOOK, Mark, Mon, Txt } from "@/components/comic/PixelKit";
import { Duo, Notes, Rate } from "@/components/comic/scenes";
import { tt } from "@/lib/lang";

/**
 * The pixel drawings of the Day 15 comics (data/day15/comics.ts, DL-STANDARD.md section 13). People: Ben (a learner), Tara (LearnLoop's mobile UX lead) and Owen (head of
 * product), all made up. Every label is a short capital word with a German entry in pixelLabelsMore.ts.
 */
LOOK.benm = { hair: "#2B2B2B", shirt: "#3D7BD9", skin: "#C68A5A" };
LOOK.tara = { hair: "#5A3A22", shirt: "#B5372E", long: true, skin: "#E0B088" };
LOOK.owen = { hair: "#8A8A90", shirt: "#33415C", glasses: true };

/** A phone: a tall narrow board with a title and a few blocks. `fit` shows large targets and text that fits; otherwise tiny and cramped. */
function Phone({ x = 62, title = "LESSON", fit = false, blocks, big }: { x?: number; title?: string; fit?: boolean; blocks?: string[]; big?: boolean }) {
  const rows = blocks ?? (fit ? ["ESSENTIALS", "LARGE BUTTON"] : ["TINY TEXT", "WIDE TABLE", "TINY BUTTON"]);
  return (
    <Board x={x} y={3} w={big ? 44 : 38} h={58}>
      <rect x={x} y={3} width={big ? 44 : 38} height={5} fill="#3F4A58" />
      <Txt x={x + 2} y={7.2} size={3.2} c="#FFFFFF">{title}</Txt>
      {rows.map((r, i) => (
        <g key={r}>
          <rect x={x + 3} y={11 + i * 15} width={(big ? 44 : 38) - 6} height={fit ? 12 : i === 2 ? 5 : 8} fill={fit ? "#B5E3C8" : i === 0 ? "#E4E8EE" : "#FFE9A8"} stroke="#1B1B1F" strokeWidth={0.4} />
          <Txt x={x + 5} y={fit ? 19 + i * 15 : 16.5 + i * 15} size={fit ? 3.6 : 2.6}>{r}</Txt>
        </g>
      ))}
    </Board>
  );
}

/** A row of short units, each a small box. */
function Units({ n, goal = true }: { n: number; goal?: boolean }) {
  return (
    <Board x={36} y={10} w={96} h={40}>
      <Txt x={40} y={18} size={4} c="#556274">{goal ? "ONE GOAL EACH" : "ARBITRARY PIECES"}</Txt>
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x={40 + i * (84 / n)} y={24} width={84 / n - 3} height={16} fill={goal ? "#B5E3C8" : i % 2 ? "#FFE9A8" : "#E4E8EE"} stroke="#1B1B1F" strokeWidth={0.5} />
          <Txt x={40 + i * (84 / n) + (84 / n - 3) / 2} y={34} size={3.6} anchor="middle">{String(i + 1)}</Txt>
        </g>
      ))}
    </Board>
  );
}

/** Four boxes of a chain or a loop. */
function Steps4({ labels, on = 4 }: { labels: [string, string, string, string]; on?: number }) {
  return (
    <Board x={32} y={10} w={104} h={40}>
      {labels.map((l, i) => (
        <g key={l}>
          <rect x={36 + i * 25} y={22} width={22} height={14} fill={i < on ? "#B5E3C8" : "#E4E8EE"} stroke="#1B1B1F" strokeWidth={0.6} />
          <Txt x={47 + i * 25} y={31} size={3.4} anchor="middle">{l}</Txt>
        </g>
      ))}
    </Board>
  );
}

export const ART_D15: Record<string, ReactNode> = {
  /* ------------------------------------------------------------------ A1 */
  "a1-1": (
    <Duo label={tt("Ben at a desk: an hour, a big screen and quiet, so a long lesson works", "Ben am Schreibtisch: eine Stunde, ein großer Bildschirm und Ruhe, eine lange Lektion funktioniert also")} left={{ who: "benm", face: "happy" }}>
      <Mon x={50} y={8} w={80} h={46}>
        <Txt x={56} y={18} size={4} c="#556274">LONG LESSON</Txt>
      </Mon>
    </Duo>
  ),
  "a1-2": (
    <Duo label={tt("Ben on a crowded train: a few minutes, one hand, many distractions", "Ben in einem vollen Zug: wenige Minuten, eine Hand, viele Ablenkungen")} left={{ who: "benm", face: "worried" }}>
      <Notes x={50} y={8} w={96} title="ON A TRAIN" items={[{ icon: "clock", text: "A FEW MINUTES" }, { icon: "warn", text: "MANY DISTRACTIONS" }, { cross: true, text: "40-MINUTE VIDEO" }]} />
    </Duo>
  ),
  "a1-3": (
    <Duo label={tt("Ben in a five-minute break: something short that starts at once", "Ben in einer Fünf-Minuten-Pause: etwas Kurzes, das sofort startet")} left={{ who: "benm", face: "neutral" }}>
      <Notes x={50} y={10} w={96} title="A BREAK" items={[{ icon: "clock", text: "5 MINUTES" }, { icon: "play", text: "STARTS AT ONCE" }]} />
    </Duo>
  ),
  "a1-4": (
    <Duo label={tt("What Ben needs on a phone: speed, simplicity, clarity", "Was Ben auf dem Handy braucht: Schnelligkeit, Einfachheit, Klarheit")} left={{ who: "tara", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="THREE NEEDS" items={[{ icon: "up", text: "SPEED" }, { icon: "check", text: "SIMPLICITY" }, { icon: "eye", text: "CLARITY" }]} />
    </Duo>
  ),
  "a1-5": (
    <Duo label={tt("Mobile is not a smaller desktop: the context decides the design", "Mobil ist kein kleinerer Desktop: Der Kontext entscheidet über das Design")} left={{ who: "tara", face: "happy" }}>
      <Notes x={44} y={12} w={104} items={[{ cross: true, text: "NOT A SMALLER DESKTOP" }, { tick: true, text: "THE CONTEXT DECIDES" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A2 */
  "a2-1": (
    <Duo label={tt("One long lesson: Ben cannot finish it in a five-minute break", "Eine lange Lektion: Ben kann sie in einer Fünf-Minuten-Pause nicht beenden")} left={{ who: "benm", face: "sad" }}>
      <Board x={44} y={5} w={80} h={56}>
        <Txt x={48} y={12} size={4} c="#556274">ONE LONG LESSON</Txt>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={48} y={17 + i * 7} width={i % 3 === 2 ? 50 : 70} height={3} fill="#9AA5B5" />
        ))}
      </Board>
      <Mark x={9} y={34} kind="sweat" />
    </Duo>
  ),
  "a2-2": (
    <Duo label={tt("The same lesson cut at arbitrary points: shorter, but the pieces do not belong together", "Dieselbe Lektion an beliebigen Stellen zerschnitten: kürzer, aber die Stücke gehören nicht zusammen")} left={{ who: "benm", face: "worried" }}>
      <Units n={5} goal={false} />
    </Duo>
  ),
  "a2-3": (
    <Duo label={tt("Five short units, each with one goal, a check and its place in the course", "Fünf kurze Einheiten, jede mit einem Ziel, einer Prüfung und ihrem Platz im Kurs")} left={{ who: "benm", face: "happy" }}>
      <Units n={5} />
    </Duo>
  ),
  "a2-4": (
    <Duo label={tt("Advantages: flexible and fits everyday life. The risk: fragmentation of knowledge", "Vorteile: flexibel und passt in den Alltag. Das Risiko: Zersplitterung von Wissen")} left={{ who: "tara", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="MICROLEARNING" items={[{ icon: "up", text: "FLEXIBLE" }, { icon: "check", text: "FITS EVERYDAY LIFE" }, { icon: "warn", text: "RISK: FRAGMENTATION" }]} />
    </Duo>
  ),
  "a2-5": (
    <Duo label={tt("Every unit needs a goal, a check and a place in the course", "Jede Einheit braucht ein Ziel, eine Prüfung und einen Platz im Kurs")} left={{ who: "tara", face: "happy" }}>
      <Notes x={44} y={12} w={104} items={[{ tick: true, text: "A GOAL" }, { tick: true, text: "A CHECK" }, { tick: true, text: "A PLACE IN THE COURSE" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A3 */
  "a3-1": (
    <Duo label={tt("The desktop page shrunk onto the phone: tiny text, tiny buttons, a wide table", "Die Desktop-Seite aufs Handy verkleinert: winziger Text, winzige Buttons, eine breite Tabelle")} left={{ who: "benm", face: "worried" }}>
      <Phone />
    </Duo>
  ),
  "a3-2": (
    <Duo label={tt("Fix one: the essentials first, prioritised content", "Korrektur eins: das Wesentliche zuerst, priorisierter Inhalt")} left={{ who: "tara", face: "neutral", pose: "point" }}>
      <Phone fit blocks={["ESSENTIALS", "THE REST: LATER"]} />
    </Duo>
  ),
  "a3-3": (
    <Duo label={tt("Fixes two and three: large targets for a thumb, and text that fits the width", "Korrekturen zwei und drei: große Ziele für einen Daumen und Text, der in die Breite passt")} left={{ who: "benm", face: "happy" }}>
      <Phone fit blocks={["TEXT FITS", "LARGE BUTTON"]} />
    </Duo>
  ),
  "a3-4": (
    <Duo label={tt("Fix four: Ben stops on the phone and finds the same place on his laptop", "Korrektur vier: Ben hört auf dem Handy auf und findet dieselbe Stelle auf seinem Laptop")} left={{ who: "benm", face: "happy" }}>
      <Notes x={44} y={8} w={104} title="SAME PLACE" items={[{ icon: "play", text: "PHONE: STOPPED AT 3" }, { icon: "play", text: "LAPTOP: CONTINUE AT 3" }, { tick: true, text: "SYNCHRONISED" }]} />
    </Duo>
  ),
  "a3-5": (
    <Duo label={tt("One experience across devices: the same names, the same logic", "Ein Erlebnis über alle Geräte: dieselben Namen, dieselbe Logik")} left={{ who: "tara", face: "happy" }}>
      <Notes x={44} y={12} w={104} items={[{ tick: true, text: "THE SAME NAMES" }, { tick: true, text: "THE SAME LOGIC" }, { tick: true, text: "ONE PROGRESS" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A4 */
  "a4-1": (
    <Duo label={tt("A test on a laptop only: it looks fine, but is that where Ben learns?", "Ein Test nur auf einem Laptop: Es sieht gut aus, aber lernt Ben dort?")} left={{ who: "tara", face: "think" }}>
      <Notes x={44} y={10} w={104} title="A DESK TEST" items={[{ icon: "check", text: "LOOKS FINE" }, { icon: "ask", text: "IS THIS WHERE HE LEARNS?" }]} />
    </Duo>
  ),
  "a4-2": (
    <Duo label={tt("Ben tries a real phone on a train: his thumb does not reach the button", "Ben probiert ein echtes Handy im Zug aus: Sein Daumen erreicht den Button nicht")} left={{ who: "benm", face: "worried" }} right={{ who: "tara", face: "neutral", pose: "point" }}>
      <Phone x={64} />
    </Duo>
  ),
  "a4-3": (
    <Duo label={tt("Tara analyses when and where learners study: mostly short breaks on phones", "Tara analysiert, wann und wo Lernende lernen: meist kurze Pausen auf Handys")} left={{ who: "tara", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="THE CONTEXTS" items={[{ icon: "chart", text: "WHEN LEARNERS STUDY" }, { icon: "eye", text: "WHERE LEARNERS STUDY" }]} />
    </Duo>
  ),
  "a4-4": (
    <Duo label={tt("She adjusts the button and tests again: now Ben reaches it", "Sie passt den Button an und testet erneut: Jetzt erreicht ihn Ben")} left={{ who: "benm", face: "happy" }} right={{ who: "tara", face: "happy" }}>
      <Phone x={64} fit blocks={["TEXT FITS", "LARGE BUTTON"]} />
    </Duo>
  ),
  "a4-5": (
    <Duo label={tt("Test where the learner is, not where we are", "Testen Sie dort, wo die Lernende ist, nicht dort, wo wir sind")} left={{ who: "tara", face: "happy" }}>
      <Notes x={44} y={12} w={104} items={[{ tick: true, text: "REAL PHONES" }, { tick: true, text: "REAL SETTINGS" }, { tick: true, text: "KEEP ADJUSTING" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ A5 */
  "a5-1": (
    <Duo label={tt("Three ideas, three questions: user value, effort and risk", "Drei Ideen, drei Fragen: Nutzerwert, Aufwand und Risiko")} left={{ who: "tara", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="THREE IDEAS" items={[{ icon: "up", text: "USER VALUE" }, { icon: "clock", text: "EFFORT" }, { icon: "warn", text: "RISK" }]} />
    </Duo>
  ),
  "a5-2": (
    <Duo label={tt("Three-minute units for ten lessons: value high, effort mid, risk mid", "Drei-Minuten-Einheiten für zehn Lektionen: Wert hoch, Aufwand mittel, Risiko mittel")} left={{ who: "benm", face: "happy" }}>
      <Rate x={44} y={4} title="3-MINUTE UNITS" rows={[["VALUE", 3, "HIGH"], ["EFFORT", 2, "MID"], ["RISK", 2, "MID"]]} />
    </Duo>
  ),
  "a5-3": (
    <Duo label={tt("Remember where a learner stopped: value mid, effort mid, risk mid", "Merken, wo eine Lernende aufgehört hat: Wert mittel, Aufwand mittel, Risiko mittel")} left={{ who: "tara", face: "neutral" }}>
      <Rate x={44} y={4} title="REMEMBER THE PLACE" rows={[["VALUE", 2, "MID"], ["EFFORT", 2, "MID"], ["RISK", 2, "MID"]]} />
    </Duo>
  ),
  "a5-4": (
    <Duo label={tt("A separate native phone app: value mid, effort high, risk high", "Eine eigene native Handy-App: Wert mittel, Aufwand hoch, Risiko hoch")} left={{ who: "owen", face: "worried" }}>
      <Rate x={44} y={4} title="A NATIVE APP" rows={[["VALUE", 2, "MID"], ["EFFORT", 3, "HIGH"], ["RISK", 3, "HIGH"]]} />
    </Duo>
  ),
  "a5-5": (
    <Duo label={tt("The order: fit the content to the context first, build a product later", "Die Reihenfolge: zuerst den Inhalt an den Kontext anpassen, später ein Produkt bauen")} left={{ who: "tara", face: "happy" }}>
      <Notes x={44} y={8} w={104} title="THE ORDER" items={[{ icon: "check", text: "1 · SHORT UNITS" }, { icon: "check", text: "2 · REMEMBER THE PLACE" }, { icon: "clock", text: "3 · AN APP, LATER" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B1 */
  "b1-1": (
    <Duo label={tt("Step one: the context of use, where, when and with how much attention", "Schritt eins: der Nutzungskontext, wo, wann und mit wie viel Aufmerksamkeit")} left={{ who: "tara", face: "neutral", pose: "point" }}>
      <Steps4 labels={["CONTEXT", "DESIGN", "USAGE", "SCALE"]} on={1} />
    </Duo>
  ),
  "b1-2": (
    <Duo label={tt("Step two: design for it, short units, a layout that prioritises, large targets", "Schritt zwei: dafür gestalten, kurze Einheiten, ein Layout, das priorisiert, große Ziele")} left={{ who: "tara", face: "neutral", pose: "point" }}>
      <Steps4 labels={["CONTEXT", "DESIGN", "USAGE", "SCALE"]} on={2} />
    </Duo>
  ),
  "b1-3": (
    <Duo label={tt("Step three: check the usage by device, not on average", "Schritt drei: die Nutzung nach Gerät prüfen, nicht im Durchschnitt")} left={{ who: "tara", face: "neutral", pose: "point" }}>
      <Steps4 labels={["CONTEXT", "DESIGN", "USAGE", "SCALE"]} on={3} />
    </Duo>
  ),
  "b1-4": (
    <Duo label={tt("Step four: scale one experience across devices", "Schritt vier: ein Erlebnis über Geräte skalieren")} left={{ who: "owen", face: "happy" }}>
      <Steps4 labels={["CONTEXT", "DESIGN", "USAGE", "SCALE"]} on={4} />
    </Duo>
  ),
  "b1-5": (
    <Duo label={tt("Context, design, usage, scale: skip the context and you design for a learner who is not there", "Kontext, Design, Nutzung, Skalierung: Lassen Sie den Kontext aus, und Sie gestalten für eine Lernende, die nicht da ist")} left={{ who: "tara", face: "happy" }}>
      <Notes x={44} y={6} w={104} items={[{ icon: "eye", text: "CONTEXT" }, { icon: "pencil", text: "DESIGN" }, { icon: "chart", text: "USAGE" }, { icon: "up", text: "SCALE" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B2 */
  "b2-1": (
    <Duo label={tt("The desktop page shrunk onto the phone: all the content, almost no fit", "Die Desktop-Seite aufs Handy verkleinert: der ganze Inhalt, fast keine Passung")} left={{ who: "owen", face: "worried" }}>
      <Phone />
    </Duo>
  ),
  "b2-2": (
    <Duo label={tt("A three-minute unit with one goal: it fits, but shows little at once", "Eine Drei-Minuten-Einheit mit einem Ziel: Sie passt, zeigt aber wenig auf einmal")} left={{ who: "tara", face: "neutral" }}>
      <Notes x={44} y={10} w={104} title="A SHORT UNIT" items={[{ tick: true, text: "FITS THE BREAK" }, { cross: true, text: "SHOWS LITTLE AT ONCE" }]} />
    </Duo>
  ),
  "b2-3": (
    <Duo label={tt("A responsive page: the essentials first, the rest one tap away", "Eine responsive Seite: das Wesentliche zuerst, der Rest einen Tipp entfernt")} left={{ who: "tara", face: "happy" }}>
      <Phone fit blocks={["ESSENTIALS", "MORE: ONE TAP"]} />
    </Duo>
  ),
  "b2-4": (
    <Duo label={tt("Long reading and wide tables stay for the laptop", "Langes Lesen und breite Tabellen bleiben für den Laptop")} left={{ who: "tara", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="EACH DEVICE ITS OWN" items={[{ icon: "play", text: "PHONE: SHORT UNITS" }, { icon: "book", text: "LAPTOP: LONG READING" }]} />
    </Duo>
  ),
  "b2-5": (
    <Duo label={tt("Show on each device what suits it, and keep one experience across both", "Auf jedem Gerät zeigen, was passt, und ein Erlebnis über beide halten")} left={{ who: "tara", face: "happy" }}>
      <Notes x={44} y={12} w={104} items={[{ tick: true, text: "WHAT SUITS EACH DEVICE" }, { tick: true, text: "ONE EXPERIENCE" }]} />
    </Duo>
  ),

  /* ------------------------------------------------------------------ B3 */
  "b3-1": (
    <Duo label={tt("Nobody knows how many learners use phones, because the data is not split by device", "Niemand weiß, wie viele Lernende Handys nutzen, weil die Daten nicht nach Gerät aufgeteilt sind")} left={{ who: "owen", face: "think" }}>
      <Notes x={44} y={10} w={104} title="NO DATA BY DEVICE" items={[{ icon: "ask", text: "HOW MANY ON PHONES?" }, { icon: "clock", text: "A DECISION IS DUE" }]} />
    </Duo>
  ),
  "b3-2": (
    <Duo label={tt("Part one, I decide: split the data by device and cut the ten most-used lessons into short units", "Teil eins, ich entscheide: die Daten nach Gerät aufteilen und die zehn meistgenutzten Lektionen in kurze Einheiten schneiden")} left={{ who: "tara", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="1 · I DECIDE" items={[{ icon: "chart", text: "SPLIT THE DATA BY DEVICE" }, { icon: "pencil", text: "CUT 10 LESSONS INTO UNITS" }]} />
    </Duo>
  ),
  "b3-3": (
    <Duo label={tt("Part two, I do not know: how large the share of phone learners really is", "Teil zwei, ich weiß nicht: wie groß der Anteil der Handy-Lernenden wirklich ist")} left={{ who: "tara", face: "think" }}>
      <Notes x={44} y={10} w={104} title="2 · I DO NOT KNOW" items={[{ icon: "ask", text: "THE SHARE ON PHONES" }]} />
      <Mark x={9} y={34} kind="ask" />
    </Duo>
  ),
  "b3-4": (
    <Duo label={tt("Part three, I reverse if: drop-out on phones has not fallen from 45 percent to below 40 percent by the end of month 3", "Teil drei, ich nehme zurück, wenn: die Abbrüche auf Handys bis Ende von Monat 3 nicht von 45 Prozent auf unter 40 Prozent gefallen sind")} left={{ who: "tara", face: "neutral", pose: "point" }}>
      <Notes x={44} y={8} w={104} title="3 · I REVERSE IF" items={[{ icon: "chart", text: "45% NOT BELOW 40%" }, { icon: "clock", text: "BY THE END OF MONTH 3" }]} />
    </Duo>
  ),
  "b3-5": (
    <Duo label={tt("Part four, I give up: the native app, for this year", "Teil vier, ich verzichte auf: die native App, in diesem Jahr")} left={{ who: "tara", face: "neutral" }}>
      <Notes x={44} y={6} w={104} items={[{ icon: "check", text: "I DECIDE" }, { icon: "ask", text: "I DO NOT KNOW" }, { icon: "clock", text: "I REVERSE IF" }, { icon: "lock", text: "I GIVE UP" }]} />
    </Duo>
  ),
};
