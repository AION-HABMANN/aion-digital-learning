"use client";

import { Arrow, DARK, Frame, LITE, Lines, MID, Marker, Person, Svg, Thumb, Txt } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Real pictures for Day 16 (CLAUDE.md #52): the four DataLearn screens of the task with their numbered markers, one drop-out figure seen through numbers, observation and a
 * comparison, a dashboard that gains four fixes, a figure read as a jump, as a list of causes and as a tested hypothesis, a hypothesis loop, and a thumbnail for every measure,
 * option and decision. Mock screens use their own neutral greys; the site's blue, teal and rust never colour the evidence (#15, #49).
 */

/* ------------------------------------------------------------------ the Task 1 evidence: four DataLearn screens, eight facts */

export type DlScreen = "dash" | "report" | "log" | "tracking";

export function DataScreen({ kind }: { kind: DlScreen }) {
  const label =
    kind === "dash"
      ? tt("DataLearn dashboard: thirty-one small metrics with none marked as the main one, and Engagement shown as a click count", "DataLearn-Dashboard: einunddreißig kleine Kennzahlen, keine als Hauptkennzahl markiert, und Engagement als Klickzahl")
      : kind === "report"
        ? tt("DataLearn report: a sentence concluding that the content is too hard from a 70 percent drop-out, and a month-on-month chart", "DataLearn-Bericht: ein Satz, der aus 70 Prozent Abbruch folgert, dass der Inhalt zu schwer ist, und ein Monatsvergleichsdiagramm")
        : kind === "log"
          ? tt("DataLearn change log: five changes launched in one month, none with an expected effect", "DataLearn-Änderungsprotokoll: fünf Änderungen in einem Monat gestartet, keine mit erwarteter Wirkung")
          : tt("DataLearn tracking set-up: every click stored with a name, and time spent counting an open tab", "DataLearn-Tracking-Setup: jeder Klick mit Namen gespeichert und die Verweildauer zählt einen offenen Tab");
  return (
    <Svg viewBox="0 0 240 170" label={label}>
      <Frame>
        {kind === "dash" && (
          <>
            <Txt x={12} y={28} size={8.4} bold>{tt("Dashboard · 31 metrics", "Dashboard · 31 Kennzahlen")}</Txt>
            {Array.from({ length: 24 }, (_, i) => (
              <rect key={i} x={12 + (i % 8) * 27} y={34 + Math.floor(i / 8) * 20} width="24" height="16" rx="2" fill={LITE} stroke={MID} />
            ))}
            <rect x="12" y="98" width="214" height="22" rx="3" fill="#FFFFFF" stroke={DARK} />
            <Txt x={18} y={112} size={7.6}>{tt("Engagement: 18,420 clicks", "Engagement: 18.420 Klicks")}</Txt>
            <Marker x={216} y={44} n={1} />
            <Marker x={216} y={106} n={2} />
          </>
        )}
        {kind === "report" && (
          <>
            <Txt x={12} y={28} size={8.4} bold>{tt("Monthly report", "Monatsbericht")}</Txt>
            <rect x="12" y="34" width="214" height="26" rx="3" fill="#FFFFFF" stroke={DARK} />
            <Txt x={18} y={45} size={6.8}>{tt("Drop-out is 70%, so the content", "Die Abbrüche liegen bei 70 %, also ist")}</Txt>
            <Txt x={18} y={55} size={6.8}>{tt("is too hard.", "der Inhalt zu schwer.")}</Txt>
            {[34, 44, 38, 62].map((h, i) => (
              <rect key={i} x={30 + i * 22} y={118 - h} width="14" height={h} fill={i === 3 ? DARK : "#BDBDBD"} />
            ))}
            <Txt x={150} y={84} size={6.8} fill="#555555">{tt("↑ +40%: a success!", "↑ +40 %: ein Erfolg!")}</Txt>
            <Txt x={150} y={96} size={6.2} fill="#777777">{tt("(last month had a holiday)", "(der letzte Monat hatte einen Feiertag)")}</Txt>
            <Marker x={216} y={44} n={3} />
            <Marker x={216} y={100} n={4} />
          </>
        )}
        {kind === "log" && (
          <>
            <Txt x={12} y={28} size={8.4} bold>{tt("Change log · May", "Änderungsprotokoll · Mai")}</Txt>
            {[tt("New menu", "Neues Menü"), tt("New emails", "Neue E-Mails"), tt("Shorter intro", "Kürzeres Intro"), tt("New price page", "Neue Preisseite"), tt("New colours", "Neue Farben")].map((s, i) => (
              <g key={i}>
                <rect x="12" y={34 + i * 17} width="214" height="14" rx="2" fill={LITE} />
                <Txt x={18} y={44 + i * 17} size={7}>{s}</Txt>
                <Txt x={222} y={44 + i * 17} size={6.4} anchor="end" fill="#777777">{tt("expected effect: —", "erwartete Wirkung: —")}</Txt>
              </g>
            ))}
            <Marker x={216} y={40} n={5} />
            <Marker x={140} y={40} n={6} />
          </>
        )}
        {kind === "tracking" && (
          <>
            <Txt x={12} y={28} size={8.4} bold>{tt("Tracking set-up", "Tracking-Setup")}</Txt>
            <rect x="12" y="34" width="214" height="36" rx="3" fill="#FFFFFF" stroke={DARK} />
            <Txt x={18} y={46} size={6.8}>{tt("click · lesson 3 · ", "Klick · Lektion 3 · ")}</Txt>
            <Txt x={86} y={46} size={6.8} bold>{tt("Maria Keller", "Maria Keller")}</Txt>
            <Txt x={18} y={58} size={6.8}>{tt("click · quiz 2 · Maria Keller", "Klick · Quiz 2 · Maria Keller")}</Txt>
            <Txt x={12} y={86} size={6.8} fill="#555555">{tt("Privacy notice: (no mention of click tracking)", "Datenschutzerklärung: (keine Erwähnung von Klick-Tracking)")}</Txt>
            <rect x="12" y="98" width="214" height="22" rx="3" fill="#FFFFFF" stroke={DARK} strokeDasharray="3 3" />
            <Txt x={18} y={112} size={7}>{tt("Time spent: 11 h 40 min (tab open overnight)", "Verweildauer: 11 Std. 40 Min. (Tab über Nacht offen)")}</Txt>
            <Marker x={216} y={44} n={7} />
            <Marker x={216} y={108} n={8} />
          </>
        )}
      </Frame>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A1 · one drop-out figure: numbers, observation, a comparison */

export type SeeKind = "numbers" | "observe" | "ab";

export function SeeMock({ kind }: { kind: SeeKind }) {
  return (
    <Svg
      viewBox="0 0 240 130"
      label={
        kind === "numbers"
          ? tt("A figure of 70 percent drop-out and no reason", "Eine Zahl von 70 Prozent Abbruch und kein Grund")
          : kind === "observe"
            ? tt("A tester watching a learner stop at the quiz and noting why", "Ein Tester, der einer Lernenden zusieht, wie sie am Quiz hängenbleibt, und den Grund notiert")
            : tt("Two versions compared: version B keeps eight more learners in every hundred", "Zwei Fassungen im Vergleich: Fassung B hält von hundert Lernenden acht mehr")
      }
    >
      <rect x="1" y="1" width="238" height="128" rx="5" fill="#F6F6F6" stroke={MID} />
      {kind === "numbers" && (
        <>
          <Txt x={120} y={58} size={34} anchor="middle" bold>70%</Txt>
          <Txt x={120} y={78} size={9} anchor="middle">{tt("leave in the first week", "gehen in der ersten Woche")}</Txt>
          <Txt x={12} y={112} size={7.4} fill="#555555">{tt("Quantitative: it says how many, not why.", "Quantitativ: Es sagt, wie viele, nicht warum.")}</Txt>
        </>
      )}
      {kind === "observe" && (
        <>
          <Person x={40} y={40} s={0.9} />
          <rect x="66" y="22" width="82" height="52" rx="4" fill="#FFFFFF" stroke={DARK} />
          <Txt x={72} y={38} size={7} bold>{tt("Quiz · question 7", "Quiz · Frage 7")}</Txt>
          <Lines x={72} y={44} n={2} w={68} gap={8} h={3} fill={MID} />
          <Person x={176} y={50} s={0.7} />
          <rect x="156" y="74" width="74" height="24" rx="3" fill="#FFFFFF" stroke={DARK} strokeDasharray="3 3" />
          <Txt x={160} y={86} size={6.2}>{tt("“Where is Save?”", "„Wo ist Speichern?“")}</Txt>
          <Txt x={12} y={112} size={7.4} fill="#555555">{tt("Qualitative: it shows why, for a few people.", "Qualitativ: Es zeigt, warum, bei wenigen Menschen.")}</Txt>
        </>
      )}
      {kind === "ab" && (
        <>
          <rect x="16" y="24" width="96" height="62" rx="4" fill="#FFFFFF" stroke={DARK} />
          <Txt x={64} y={42} size={8} anchor="middle" bold>{tt("Version A", "Fassung A")}</Txt>
          <Txt x={64} y={66} size={16} anchor="middle" bold>{tt("62", "62")}</Txt>
          <Txt x={64} y={78} size={6.6} anchor="middle">{tt("of 100 stay", "von 100 bleiben")}</Txt>
          <rect x="128" y="24" width="96" height="62" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="2" />
          <Txt x={176} y={42} size={8} anchor="middle" bold>{tt("Version B", "Fassung B")}</Txt>
          <Txt x={176} y={66} size={16} anchor="middle" bold>{tt("70", "70")}</Txt>
          <Txt x={176} y={78} size={6.6} anchor="middle">{tt("of 100 stay", "von 100 bleiben")}</Txt>
          <Txt x={12} y={112} size={7.4} fill="#555555">{tt("Quantitative test: shows which version works better.", "Quantitativer Test: zeigt, welche Fassung besser wirkt.")}</Txt>
        </>
      )}
    </Svg>
  );
}

/* ------------------------------------------------------------------ A2 · a dashboard that gains four fixes */

export type KpiOn = { few: boolean; defined: boolean; target: boolean; split: boolean };

export function KpiMock({ on }: { on: KpiOn }) {
  const n = [on.few, on.defined, on.target, on.split].filter(Boolean).length;
  const count = on.few ? 3 : 18;
  return (
    <Svg viewBox="0 0 240 150" label={tt(`A dashboard with ${n} of 4 fixes switched on: only three KPIs, a definition under each, a target line, and a split by device`, `Ein Dashboard mit ${n} von 4 eingeschalteten Korrekturen: nur drei KPIs, eine Definition unter jeder, eine Ziellinie und eine Aufteilung nach Gerät`)}>
      <rect x="1" y="1" width="238" height="148" rx="5" fill="#F6F6F6" stroke={MID} />
      {on.few ? (
        <>
          {[tt("Completion", "Abschluss"), tt("Week-1 drop-out", "Abbruch Woche 1"), tt("7-day return", "7-Tage-Rückkehr")].map((s, i) => (
            <g key={i}>
              <rect x={10 + i * 76} y="10" width="70" height={on.defined ? 64 : 50} rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
              <Txt x={45 + i * 76} y={26} size={7.2} anchor="middle" bold>{s}</Txt>
              <Txt x={45 + i * 76} y={46} size={14} anchor="middle" bold>{["38%", "70%", "21%"][i]}</Txt>
              {on.defined && <Txt x={45 + i * 76} y={64} size={5.4} anchor="middle" fill="#555555">{[tt("finished / started", "beendet / begonnen"), tt("left within 7 days", "gegangen binnen 7 Tagen"), tt("back within 7 days", "zurück binnen 7 Tagen")][i]}</Txt>}
              {on.target && <Txt x={45 + i * 76} y={on.defined ? 72 : 58} size={5.8} anchor="middle" bold>{[tt("target 45%", "Ziel 45 %"), tt("target 55%", "Ziel 55 %"), tt("target 30%", "Ziel 30 %")][i]}</Txt>}
            </g>
          ))}
        </>
      ) : (
        Array.from({ length: count }, (_, i) => (
          <g key={i}>
            <rect x={10 + (i % 6) * 38} y={10 + Math.floor(i / 6) * 22} width="34" height="18" rx="2" fill={LITE} stroke={MID} />
          </g>
        ))
      )}
      {on.split && (
        <g>
          <Txt x={10} y={102} size={7.4} bold>{tt("Drop-out, week 1, by device", "Abbruch Woche 1 nach Gerät")}</Txt>
          {[tt("Phone", "Handy"), tt("Laptop", "Laptop")].map((s, i) => (
            <g key={i}>
              <Txt x={10} y={118 + i * 14} size={6.6}>{s}</Txt>
              <rect x="50" y={111 + i * 14} width="150" height="9" rx="2" fill={LITE} />
              <rect x="50" y={111 + i * 14} width={i === 0 ? 120 : 84} height="9" rx="2" fill={DARK} />
              <Txt x={206} y={119 + i * 14} size={6.4}>{i === 0 ? "80%" : "56%"}</Txt>
            </g>
          ))}
        </g>
      )}
      <Txt x={10} y={146} size={6.2} fill="#555555">{tt(`${n} of 4 fixes on`, `${n} von 4 Korrekturen an`)}</Txt>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A3 · one figure read as a jump, as a list of causes, as a tested hypothesis */

export type ReadKind = "jump" | "causes" | "tested";

export function ReadMock({ kind }: { kind: ReadKind }) {
  return (
    <Svg
      viewBox="0 0 240 130"
      label={
        kind === "jump"
          ? tt("The figure 70 percent leads straight to the conclusion that the content is too hard", "Die Zahl 70 Prozent führt direkt zum Schluss, dass der Inhalt zu schwer ist")
          : kind === "causes"
            ? tt("The figure 70 percent leads to a list of four possible causes", "Die Zahl 70 Prozent führt zu einer Liste von vier möglichen Ursachen")
            : tt("One cause is written as a hypothesis, tested, and the result confirms the sign-up form", "Eine Ursache wird als Hypothese formuliert, getestet, und das Ergebnis bestätigt das Anmeldeformular")
      }
    >
      <rect x="1" y="1" width="238" height="128" rx="5" fill="#F6F6F6" stroke={MID} />
      {kind === "jump" && (
        <>
          <rect x="12" y="30" width="64" height="40" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <Txt x={44} y={56} size={16} anchor="middle" bold>70%</Txt>
          <Arrow x1={80} y1={50} x2={128} y2={50} />
          <rect x="132" y="30" width="96" height="40" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <Txt x={180} y={54} size={8} anchor="middle" bold>{tt("“Too hard”", "„Zu schwer“")}</Txt>
          <Txt x={12} y={100} size={7.4} fill="#555555">{tt("A symptom taken for a cause, with nothing checked.", "Ein Symptom, als Ursache genommen, ohne etwas zu prüfen.")}</Txt>
        </>
      )}
      {kind === "causes" && (
        <>
          <rect x="12" y="46" width="52" height="34" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <Txt x={38} y={68} size={14} anchor="middle" bold>70%</Txt>
          {[tt("Too hard", "Zu schwer"), tt("Long sign-up form", "Langes Anmeldeformular"), tt("Slow page", "Langsame Seite"), tt("Not what they expected", "Nicht das Erwartete")].map((s, i) => (
            <g key={i}>
              <Arrow x1={68} y1={63} x2={100} y2={26 + i * 24} />
              <rect x="104" y={14 + i * 24} width="124" height="18" rx="3" fill="#FFFFFF" stroke={DARK} strokeDasharray="3 3" />
              <Txt x={110} y={26 + i * 24} size={7.4}>{s}</Txt>
            </g>
          ))}
          <Txt x={12} y={116} size={7.4} fill="#555555">{tt("Several guesses; none is checked yet.", "Mehrere Vermutungen; keine ist bisher geprüft.")}</Txt>
        </>
      )}
      {kind === "tested" && (
        <>
          <rect x="12" y="16" width="216" height="38" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <Txt x={18} y={30} size={7} bold>{tt("Hypothesis", "Hypothese")}</Txt>
          <Txt x={18} y={43} size={6.6}>{tt("We believe the form is too long, so we cut it to 3 fields and expect +5 points.", "Wir glauben, das Formular ist zu lang, also kürzen wir es auf 3 Felder und erwarten +5 Punkte.")}</Txt>
          <Arrow x1={120} y1={56} x2={120} y2={70} />
          <rect x="12" y="72" width="104" height="30" rx="4" fill="#FFFFFF" stroke={DARK} />
          <Txt x={64} y={90} size={7.2} anchor="middle">{tt("A: 8 fields · 40%", "A: 8 Felder · 40 %")}</Txt>
          <rect x="124" y="72" width="104" height="30" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="2" />
          <Txt x={176} y={90} size={7.2} anchor="middle" bold>{tt("B: 3 fields · 47%", "B: 3 Felder · 47 %")}</Txt>
          <Txt x={12} y={118} size={7.4} fill="#555555">{tt("The guess was checked: one cause is now supported.", "Die Vermutung wurde geprüft: Eine Ursache ist nun gestützt.")}</Txt>
        </>
      )}
    </Svg>
  );
}

/* ------------------------------------------------------------------ A4 · a hypothesis loop, static */

export function HypLoopMock() {
  const steps = [tt("Hypothesis", "Hypothese"), tt("Test", "Test"), tt("Evaluate", "Auswerten"), tt("Decide", "Entscheiden")];
  return (
    <Svg viewBox="0 0 240 120" label={tt("A loop of four steps: hypothesis, test, evaluate, decide, and back to a new hypothesis", "Ein Kreislauf aus vier Schritten: Hypothese, Test, Auswerten, Entscheiden und zurück zu einer neuen Hypothese")}>
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={6 + i * 58} y="44" width="52" height="28" rx="5" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <Txt x={32 + i * 58} y={62} size={7.6} anchor="middle" bold>{s}</Txt>
          {i < 3 && <Arrow x1={60 + i * 58} y1={58} x2={62 + i * 58} y2={58} />}
        </g>
      ))}
      <path d="M206 74 C206 108 32 108 32 76" fill="none" stroke={DARK} strokeWidth="1.6" strokeDasharray="4 3" />
      <Arrow x1={32} y1={82} x2={32} y2={76} />
      <Txt x={120} y={22} size={8} anchor="middle">{tt("Continuous improvement: every result starts the next guess", "Kontinuierliche Verbesserung: Jedes Ergebnis startet die nächste Vermutung")}</Txt>
    </Svg>
  );
}

/* ------------------------------------------------------------------ thumbnails for measures, options and decisions */

export type ThumbKind = "kpi" | "hyp" | "test" | "iterate" | "cohort" | "moredata" | "dash" | "ai" | "all" | "marketing" | "content" | "ux" | "qual" | "trackall" | "tracking";

export function MeasureThumb({ kind }: { kind: ThumbKind }) {
  const label: Record<ThumbKind, string> = {
    kpi: tt("Three KPI tiles with a target each", "Drei KPI-Kacheln mit je einem Ziel"),
    hyp: tt("A hypothesis sentence: we believe, so we will, and expect", "Ein Hypothesensatz: wir glauben, also werden wir, und erwarten"),
    test: tt("A tester watching a learner", "Ein Tester, der einer Lernenden zuschaut"),
    iterate: tt("A loop of two-week cycles", "Ein Kreislauf aus Zwei-Wochen-Zyklen"),
    cohort: tt("Drop-out split by week", "Abbrüche nach Woche aufgeteilt"),
    moredata: tt("Forty more events added to a tracker", "Vierzig weitere Ereignisse in einem Tracker"),
    dash: tt("A wall of forty charts", "Eine Wand aus vierzig Diagrammen"),
    ai: tt("A box that finds patterns automatically", "Eine Box, die automatisch Muster findet"),
    all: tt("Five changes launched together", "Fünf Änderungen zusammen gestartet"),
    marketing: tt("A megaphone: more people arrive", "Ein Megafon: mehr Menschen kommen"),
    content: tt("More lessons added", "Mehr Lektionen ergänzt"),
    ux: tt("A clearer menu and structure", "Ein klareres Menü und eine klarere Struktur"),
    qual: tt("An interview with a learner", "Ein Interview mit einer Lernenden"),
    trackall: tt("Every click stored with a name", "Jeder Klick mit Namen gespeichert"),
    tracking: tt("A tracker that records only what a question needs", "Ein Tracker, der nur erfasst, was eine Frage braucht"),
  };
  return (
    <Thumb label={label[kind]}>
      {kind === "kpi" && (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={14 + i * 58} y="24" width="54" height="50" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.5" />
              <Txt x={41 + i * 58} y={50} size={11} anchor="middle" bold>{["38%", "70%", "21%"][i]}</Txt>
              <Txt x={41 + i * 58} y={66} size={6.2} anchor="middle">{tt("target", "Ziel")}</Txt>
            </g>
          ))}
        </>
      )}
      {kind === "hyp" && (
        <>
          <Txt x={14} y={34} size={8.2} bold>{tt("We believe …", "Wir glauben …")}</Txt>
          <Txt x={14} y={54} size={8.2} bold>{tt("so we will …", "also werden wir …")}</Txt>
          <Txt x={14} y={74} size={8.2} bold>{tt("and expect …", "und erwarten …")}</Txt>
        </>
      )}
      {kind === "test" && (
        <>
          <Person x={50} y={36} s={0.8} />
          <rect x="82" y="22" width="86" height="54" rx="4" fill="#FFFFFF" stroke={DARK} />
          <Person x={186} y={52} s={0.5} />
        </>
      )}
      {kind === "iterate" && (
        <>
          <path d="M50 70 A40 34 0 1 1 150 70" fill="none" stroke={DARK} strokeWidth="2" />
          <Arrow x1={140} y1={60} x2={150} y2={72} />
          <Txt x={100} y={56} size={8.4} anchor="middle">{tt("2 weeks · 1 change", "2 Wochen · 1 Änderung")}</Txt>
        </>
      )}
      {kind === "cohort" && (
        <>
          {[60, 52, 40, 34, 30].map((h, i) => (
            <rect key={i} x={24 + i * 32} y={90 - h} width="24" height={h} fill={i === 0 ? DARK : "#8A8A8A"} />
          ))}
          <line x1="16" y1="90" x2="186" y2="90" stroke={DARK} />
        </>
      )}
      {kind === "moredata" && (
        <>
          {Array.from({ length: 24 }, (_, i) => (
            <circle key={i} cx={20 + (i % 8) * 23} cy={24 + Math.floor(i / 8) * 26} r="7" fill={LITE} stroke={DARK} strokeWidth="1" />
          ))}
        </>
      )}
      {kind === "dash" && (
        <>
          {Array.from({ length: 20 }, (_, i) => (
            <rect key={i} x={14 + (i % 5) * 36} y={12 + Math.floor(i / 5) * 24} width="30" height="18" rx="2" fill={LITE} stroke={DARK} strokeWidth="0.8" />
          ))}
        </>
      )}
      {kind === "ai" && (
        <>
          {Array.from({ length: 12 }, (_, i) => (
            <circle key={i} cx={20 + (i % 4) * 9} cy={30 + Math.floor(i / 4) * 12} r="2.6" fill={DARK} />
          ))}
          <Arrow x1={62} y1={48} x2={82} y2={48} />
          <rect x="86" y="26" width="50" height="44" rx="6" fill={DARK} />
          <Txt x={111} y={53} size={13} anchor="middle" bold fill="#FFFFFF">AI</Txt>
        </>
      )}
      {kind === "all" && (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={14 + i * 36} y={30 + (i % 2) * 14} width="30" height="40" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.4" />
          ))}
        </>
      )}
      {kind === "marketing" && (
        <>
          <path d="M40 40 L90 24 L90 76 L40 60 Z" fill="#FFFFFF" stroke={DARK} strokeWidth="1.8" />
          {[0, 1, 2].map((i) => (
            <Person key={i} x={130 + i * 22} y={50} s={0.4} />
          ))}
        </>
      )}
      {kind === "content" && (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x="20" y={10 + i * 19} width="160" height="14" rx="3" fill={i > 2 ? "#FFFFFF" : LITE} stroke={i > 2 ? DARK : "none"} strokeDasharray={i > 2 ? "4 3" : undefined} />
          ))}
        </>
      )}
      {kind === "ux" && (
        <>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={14 + i * 58} y="14" width="54" height="14" rx="3" fill={DARK} />
          ))}
          <Lines x={14} y={44} n={4} w={172} gap={12} h={4} fill={MID} />
        </>
      )}
      {kind === "qual" && (
        <>
          <Person x={56} y={40} s={0.85} />
          <Person x={144} y={40} s={0.85} />
          <rect x="70" y="26" width="60" height="22" rx="4" fill="#FFFFFF" stroke={DARK} strokeDasharray="3 3" />
          <Txt x={100} y={41} size={7.2} anchor="middle">{tt("“Why?”", "„Warum?“")}</Txt>
        </>
      )}
      {kind === "trackall" && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="14" y={12 + i * 22} width="172" height="16" rx="2" fill={LITE} />
              <Txt x={20} y={23 + i * 22} size={6.8}>{tt("click · M. Keller", "Klick · M. Keller")}</Txt>
            </g>
          ))}
        </>
      )}
      {kind === "tracking" && (
        <>
          <rect x="40" y="16" width="120" height="78" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="50" y={28 + i * 20} width="10" height="10" rx="2" fill="#FFFFFF" stroke={DARK} />
              <rect x="68" y={31 + i * 20} width="80" height="4" rx="2" fill={MID} />
            </g>
          ))}
        </>
      )}
    </Thumb>
  );
}
