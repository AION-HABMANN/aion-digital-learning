"use client";

import { Arrow, DARK, Frame, LINE, LITE, Lines, MID, Marker, Svg, Thumb, Txt } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Real pictures for Day 10 (CLAUDE.md #52): the four TrackLearn screens of the task with their numbered markers, a task with no answer, a bare mark and an explained
 * result, a progress display that is missing, one that cheats and one that is honest, the same lesson on a phone that was not adapted, a phone that was, a tablet and a
 * desktop, a phone screen with and without accessible targets, contrast and words, and a thumbnail for every measure, option and decision. Mock screens use their own
 * neutral greys, plus colour only where the problem needs it (a red cross, a green and a red dot); the site's blue, teal and rust never colour the evidence (#15, #49).
 */

const RED = "#B3382A";
const GREEN = "#2F7D4F";
const PALE = "#BDBDBD";

/* ------------------------------------------------------------------ the Task 1 evidence: four TrackLearn screens, eight facts */

export type TlScreen = "course" | "quiz" | "dash" | "phone";

export function TrackScreen({ kind }: { kind: TlScreen }) {
  const label =
    kind === "course"
      ? tt("TrackLearn course page: a list of eight lessons that all look the same, and no progress bar", "TrackLearn-Kursseite: eine Liste mit acht Lektionen, die alle gleich aussehen, und kein Fortschrittsbalken")
      : kind === "quiz"
        ? tt("TrackLearn quiz: a wrong answer marked with a red cross and no reason, a finished task where nothing changes, and a Save button with no message", "TrackLearn-Quiz: eine falsche Antwort mit einem roten Kreuz ohne Grund, eine beendete Aufgabe, bei der sich nichts ändert, und ein Speichern-Button ohne Meldung")
        : kind === "dash"
          ? tt("TrackLearn dashboard: a large Level 7 with no explanation", "TrackLearn-Dashboard: ein großes Level 7 ohne Erklärung")
          : tt("TrackLearn on a phone: lesson text cut off at the right edge, and a small Next button at the very bottom", "TrackLearn auf einem Handy: Lektionstext am rechten Rand abgeschnitten und ein kleiner Weiter-Button ganz unten");
  return (
    <Svg viewBox="0 0 240 170" label={label}>
      <Frame>
        {kind === "course" && (
          <>
            <Txt x={12} y={30} size={9} bold>{tt("Negotiation basics", "Verhandlungsgrundlagen")}</Txt>
            <rect x="130" y="22" width="96" height="12" rx="2" fill="#FFFFFF" stroke={MID} strokeDasharray="3 3" />
            {Array.from({ length: 8 }, (_, i) => (
              <g key={i}>
                <rect x="12" y={40 + i * 14} width="216" height="11" rx="2" fill={LITE} />
                <Txt x={18} y={48.5 + i * 14} size={6.8}>{tt(`Lesson ${i + 1}`, `Lektion ${i + 1}`)}</Txt>
              </g>
            ))}
            <Marker x={216} y={26} n={4} />
            <Marker x={116} y={72} n={5} />
          </>
        )}
        {kind === "quiz" && (
          <>
            <Txt x={12} y={30} size={9} bold>{tt("Quiz · Task 3 of 5", "Quiz · Aufgabe 3 von 5")}</Txt>
            <Txt x={12} y={44} size={7.5}>{tt("Who should name the first number?", "Wer sollte die erste Zahl nennen?")}</Txt>
            <rect x="12" y="50" width="100" height="16" rx="3" fill="#FFFFFF" stroke={DARK} />
            <Txt x={20} y={61} size={7}>{tt("B · the other side", "B · die Gegenseite")}</Txt>
            <Txt x={98} y={62} size={11} bold fill={RED}>✗</Txt>
            <rect x="120" y="50" width="100" height="16" rx="3" fill="#FFFFFF" stroke={MID} />
            <Txt x={128} y={61} size={7}>{tt("A · you", "A · Sie")}</Txt>
            <Lines x={12} y={80} n={2} w={216} gap={8} fill="#D0D0D0" />
            <rect x="12" y="108" width="52" height="16" rx="3" fill={DARK} />
            <Txt x={38} y={119} size={7.5} anchor="middle" fill="#FFFFFF">{tt("Save", "Speichern")}</Txt>
            <Marker x={112} y={88} n={1} />
            <Marker x={116} y={58} n={2} />
            <Marker x={72} y={116} n={3} />
          </>
        )}
        {kind === "dash" && (
          <>
            <Txt x={12} y={30} size={9} bold>{tt("Your dashboard", "Ihr Dashboard")}</Txt>
            <rect x="12" y="40" width="100" height="100" rx="6" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
            <Txt x={62} y={98} size={22} anchor="middle" bold>{tt("Level 7", "Level 7")}</Txt>
            <rect x="124" y="40" width="102" height="44" rx="4" fill={LITE} />
            <Lines x={132} y={50} n={3} w={86} gap={9} fill="#B4B4B4" />
            <rect x="124" y="92" width="102" height="48" rx="4" fill={LITE} />
            <Lines x={132} y={102} n={3} w={86} gap={9} fill="#B4B4B4" />
            <Marker x={104} y={50} n={6} />
          </>
        )}
        {kind === "phone" && (
          <>
            <rect x="70" y="20" width="100" height="144" rx="10" fill="#FFFFFF" stroke={DARK} strokeWidth="2" />
            <Txt x={78} y={36} size={7} bold>{tt("The first offer", "Das erste Angebot")}</Txt>
            {Array.from({ length: 6 }, (_, i) => (
              <rect key={i} x="78" y={44 + i * 9} width={i % 2 ? 110 : 120} height="3.6" rx="1.8" fill="#B4B4B4" />
            ))}
            <rect x="170" y="38" width="30" height="64" fill="#F6F6F6" />
            <rect x="136" y="148" width="26" height="8" rx="2" fill={DARK} />
            <Txt x={149} y={154.5} size={5} anchor="middle" fill="#FFFFFF">{tt("Next", "Weiter")}</Txt>
            <Marker x={166} y={60} n={7} />
            <Marker x={148} y={136} n={8} />
          </>
        )}
      </Frame>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A1 · a finished task: no answer, a bare mark, an explained result */

export type FeedbackKind = "none" | "bare" | "explained";

export function QuizFeedbackMock({ kind }: { kind: FeedbackKind }) {
  return (
    <Svg
      viewBox="0 0 240 130"
      label={
        kind === "none"
          ? tt("A finished question where nothing on the screen changes", "Eine beendete Frage, bei der sich auf dem Bildschirm nichts ändert")
          : kind === "bare"
            ? tt("A wrong answer marked with a red cross and no reason", "Eine falsche Antwort mit einem roten Kreuz und ohne Grund")
            : tt("A wrong answer with an explanation, what to do, and a Next button", "Eine falsche Antwort mit einer Erklärung, was zu tun ist, und einem Weiter-Button")
      }
    >
      <rect x="1" y="1" width="238" height="128" rx="5" fill="#F6F6F6" stroke={MID} />
      <Txt x={12} y={20} size={8.5} bold>{tt("Question 4 of 10", "Frage 4 von 10")}</Txt>
      <Txt x={12} y={34} size={7.5}>{tt("Who should name the first number?", "Wer sollte die erste Zahl nennen?")}</Txt>
      <rect x="12" y="42" width="104" height="18" rx="3" fill={LITE} stroke={DARK} />
      <Txt x={20} y={54} size={7.5}>{tt("B · the other side", "B · die Gegenseite")}</Txt>
      {kind === "bare" && <Txt x={100} y={56} size={13} bold fill={RED}>✗</Txt>}
      {kind === "explained" && <Txt x={96} y={55} size={8} bold fill={RED}>✗</Txt>}
      <rect x="122" y="42" width="104" height="18" rx="3" fill="#FFFFFF" stroke={MID} />
      <Txt x={130} y={54} size={7.5}>{tt("A · you", "A · Sie")}</Txt>
      {kind === "explained" && (
        <>
          <rect x="12" y="68" width="214" height="30" rx="4" fill="#FFFFFF" stroke={DARK} />
          <Txt x={18} y={80} size={7} fill="#333333">{tt("A is right: the first number sets the anchor.", "A stimmt: Die erste Zahl setzt den Anker.")}</Txt>
          <Txt x={18} y={91} size={7} fill="#333333">{tt("Next time, name your number first.", "Nennen Sie das nächste Mal Ihre Zahl zuerst.")}</Txt>
          <rect x="150" y="104" width="76" height="18" rx="4" fill={DARK} />
          <Txt x={188} y={116} size={7.5} anchor="middle" fill="#FFFFFF">{tt("Next question ▶", "Nächste Frage ▶")}</Txt>
        </>
      )}
      {kind !== "explained" && <Txt x={12} y={116} size={7.5} fill="#777777">{kind === "none" ? tt("(the page looks exactly as before)", "(die Seite sieht genauso aus wie vorher)") : tt("(no reason, no next step)", "(kein Grund, kein nächster Schritt)")}</Txt>}
    </Svg>
  );
}

/* ------------------------------------------------------------------ A2 · a progress display: none, one that cheats, one that is honest */

export type ProgressKind = "none" | "cheat" | "honest";

export function ProgressMock({ kind }: { kind: ProgressKind }) {
  return (
    <Svg
      viewBox="0 0 240 150"
      label={
        kind === "none"
          ? tt("A course page with eight lessons and no progress display", "Eine Kursseite mit acht Lektionen und ohne Fortschrittsanzeige")
          : kind === "cheat"
            ? tt("A progress bar at 90 percent after the first lesson, which then barely moves", "Ein Fortschrittsbalken bei 90 Prozent nach der ersten Lektion, der sich dann kaum bewegt")
            : tt("A bar labelled 3 of 8 lessons, a status on each lesson and the time left", "Ein Balken mit der Beschriftung 3 von 8 Lektionen, ein Status je Lektion und die verbleibende Zeit")
      }
    >
      <rect x="1" y="1" width="238" height="148" rx="5" fill="#F6F6F6" stroke={MID} />
      <Txt x={12} y={20} size={9} bold>{tt("Negotiation basics", "Verhandlungsgrundlagen")}</Txt>
      {kind === "cheat" && (
        <>
          <rect x="12" y="28" width="216" height="9" rx="4.5" fill={LITE} />
          <rect x="12" y="28" width="194" height="9" rx="4.5" fill={DARK} />
          <Txt x={12} y={50} size={7.2} fill="#555555">{tt("90% · after lesson 1 of 8", "90 % · nach Lektion 1 von 8")}</Txt>
        </>
      )}
      {kind === "honest" && (
        <>
          <rect x="12" y="28" width="216" height="9" rx="4.5" fill={LITE} />
          <rect x="12" y="28" width="81" height="9" rx="4.5" fill={DARK} />
          <Txt x={12} y={50} size={7.2} fill="#333333">{tt("3 of 8 lessons done · about 20 min left", "3 von 8 Lektionen erledigt · noch etwa 20 Min.")}</Txt>
        </>
      )}
      {Array.from({ length: kind === "none" ? 8 : 4 }, (_, i) => (
        <g key={i}>
          <rect x="12" y={kind === "none" ? 30 + i * 14 : 58 + i * 20} width="216" height={kind === "none" ? 11 : 16} rx="2" fill={LITE} />
          <Txt x={18} y={(kind === "none" ? 38.5 : 69) + (kind === "none" ? i * 14 : i * 20)} size={7}>{tt(`Lesson ${i + 1}`, `Lektion ${i + 1}`)}</Txt>
          {kind === "honest" && <Txt x={222} y={69 + i * 20} size={6.6} anchor="end" bold>{[tt("done", "erledigt"), tt("done", "erledigt"), tt("done", "erledigt"), tt("in progress", "in Arbeit")][i]}</Txt>}
          {kind === "cheat" && <Txt x={222} y={69 + i * 20} size={6.6} anchor="end">{[tt("done", "erledigt"), "", "", ""][i]}</Txt>}
        </g>
      ))}
    </Svg>
  );
}

/* ------------------------------------------------------------------ A3 · the same lesson on a phone that was not adapted, a phone that was, a tablet and a desktop */

export type DeviceKind = "phoneRaw" | "phone" | "tablet" | "desktop";

export function ResponsiveMock({ kind }: { kind: DeviceKind }) {
  return (
    <Svg
      viewBox="0 0 240 170"
      label={
        kind === "phoneRaw"
          ? tt("A phone showing the desktop layout: text cut off at the right edge and a tiny Next button at the page bottom", "Ein Handy mit dem Desktop-Layout: Text am rechten Rand abgeschnitten und ein winziger Weiter-Button am Seitenende")
          : kind === "phone"
            ? tt("A phone showing a phone layout: a large Continue button first, text that fits, progress on top", "Ein Handy mit einem Handylayout: ein großer Weiter-Button zuerst, Text, der passt, Fortschritt oben")
            : kind === "tablet"
              ? tt("A tablet with the lesson and the lesson list side by side", "Ein Tablet mit der Lektion und der Lektionsliste nebeneinander")
              : tt("A desktop with the lesson list, the lesson and notes side by side", "Ein Desktop mit Lektionsliste, Lektion und Notizen nebeneinander")
      }
    >
      <rect x="1" y="1" width="238" height="168" rx="5" fill="#F6F6F6" stroke={MID} />
      {(kind === "phoneRaw" || kind === "phone") && (
        <>
          <rect x="78" y="8" width="84" height="154" rx="10" fill="#FFFFFF" stroke={DARK} strokeWidth="2" />
          {kind === "phoneRaw" ? (
            <>
              <Txt x={84} y={24} size={6.4} bold>{tt("The first offer", "Das erste Angebot")}</Txt>
              {Array.from({ length: 6 }, (_, i) => (
                <rect key={i} x="84" y={32 + i * 9} width={i % 2 ? 92 : 100} height="3.4" rx="1.7" fill="#B4B4B4" />
              ))}
              <rect x="160" y="26" width="30" height="60" fill="#F6F6F6" />
              <rect x="126" y="146" width="26" height="8" rx="2" fill={DARK} />
            </>
          ) : (
            <>
              <rect x="86" y="18" width="68" height="5" rx="2.5" fill={LITE} />
              <rect x="86" y="18" width="26" height="5" rx="2.5" fill={DARK} />
              <Txt x={86} y={34} size={6} fill="#555555">{tt("Lesson 3 of 8", "Lektion 3 von 8")}</Txt>
              <rect x="86" y="42" width="68" height="22" rx="4" fill={DARK} />
              <Txt x={120} y={56} size={7} anchor="middle" bold fill="#FFFFFF">{tt("Continue ▶", "Weiter ▶")}</Txt>
              {Array.from({ length: 5 }, (_, i) => (
                <rect key={i} x="86" y={74 + i * 9} width={i % 2 ? 56 : 66} height="3.4" rx="1.7" fill="#B4B4B4" />
              ))}
              <rect x="86" y="132" width="68" height="20" rx="4" fill="#FFFFFF" stroke={DARK} />
              <Txt x={120} y={145} size={6.4} anchor="middle">{tt("Question ▸", "Frage ▸")}</Txt>
            </>
          )}
        </>
      )}
      {kind === "tablet" && (
        <>
          <rect x="30" y="14" width="180" height="142" rx="8" fill="#FFFFFF" stroke={DARK} strokeWidth="2" />
          <rect x="38" y="24" width="52" height="122" fill={LITE} />
          {Array.from({ length: 6 }, (_, i) => (
            <rect key={i} x="42" y={30 + i * 18} width="44" height="12" rx="2" fill={i === 2 ? DARK : "#FFFFFF"} />
          ))}
          <rect x="98" y="26" width="104" height="5" rx="2.5" fill={LITE} />
          <rect x="98" y="26" width="40" height="5" rx="2.5" fill={DARK} />
          {Array.from({ length: 7 }, (_, i) => (
            <rect key={i} x="98" y={42 + i * 9} width={i % 2 ? 86 : 100} height="3.4" rx="1.7" fill="#B4B4B4" />
          ))}
          <rect x="140" y="124" width="62" height="18" rx="4" fill={DARK} />
        </>
      )}
      {kind === "desktop" && (
        <>
          <rect x="8" y="12" width="224" height="146" rx="6" fill="#FFFFFF" stroke={DARK} strokeWidth="2" />
          <rect x="8" y="12" width="224" height="10" rx="6" fill={LITE} />
          <rect x="14" y="28" width="46" height="124" fill={LITE} />
          {Array.from({ length: 6 }, (_, i) => (
            <rect key={i} x="18" y={34 + i * 19} width="38" height="12" rx="2" fill={i === 2 ? DARK : "#FFFFFF"} />
          ))}
          <rect x="68" y="30" width="96" height="5" rx="2.5" fill={LITE} />
          <rect x="68" y="30" width="36" height="5" rx="2.5" fill={DARK} />
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x="68" y={44 + i * 9} width={i % 2 ? 80 : 94} height="3.4" rx="1.7" fill="#B4B4B4" />
          ))}
          <rect x="172" y="28" width="54" height="124" rx="3" fill="#F6F6F6" stroke={MID} />
          <Txt x={176} y={40} size={6.4} bold>{tt("Notes", "Notizen")}</Txt>
          <Lines x={176} y={46} n={5} w={46} gap={9} h={2.8} fill={MID} />
        </>
      )}
    </Svg>
  );
}

/* ------------------------------------------------------------------ A4 · a phone progress screen with accessible targets, contrast and words */

export type A11yOn = { targets: boolean; contrast: boolean; words: boolean };

export function PhoneA11yMock({ on }: { on: A11yOn }) {
  const ink = on.contrast ? "#222222" : PALE;
  return (
    <Svg
      viewBox="0 0 240 160"
      label={tt(
        `A phone progress screen. ${on.targets ? "The Continue button is large." : "The Continue button is tiny."} ${on.contrast ? "The text is dark." : "The text is pale grey."} ${on.words ? "Each lesson says done or open in words." : "Each lesson is only a coloured dot."}`,
        `Ein Fortschrittsbildschirm auf dem Handy. ${on.targets ? "Der Weiter-Button ist groß." : "Der Weiter-Button ist winzig."} ${on.contrast ? "Der Text ist dunkel." : "Der Text ist hellgrau."} ${on.words ? "Jede Lektion sagt in Worten erledigt oder offen." : "Jede Lektion ist nur ein farbiger Punkt."}`,
      )}
    >
      <rect x="1" y="1" width="238" height="158" rx="5" fill="#F6F6F6" stroke={MID} />
      <rect x="64" y="6" width="112" height="150" rx="10" fill="#FFFFFF" stroke={DARK} strokeWidth="2" />
      <Txt x={72} y={22} size={7.4} bold fill={ink}>{tt("Negotiation basics", "Verhandlungsgrundlagen")}</Txt>
      <rect x="72" y="28" width="96" height="6" rx="3" fill={LITE} />
      <rect x="72" y="28" width="36" height="6" rx="3" fill={on.contrast ? DARK : PALE} />
      {[tt("Lesson 1", "Lektion 1"), tt("Lesson 2", "Lektion 2"), tt("Lesson 3", "Lektion 3")].map((n, i) => (
        <g key={n}>
          <circle cx={80} cy={50 + i * 20} r={4} fill={i < 2 ? GREEN : RED} />
          <Txt x={90} y={53 + i * 20} size={7} fill={ink}>{n}</Txt>
          {on.words && <Txt x={166} y={53 + i * 20} size={6.4} anchor="end" bold fill={ink}>{i < 2 ? tt("done", "erledigt") : tt("open", "offen")}</Txt>}
        </g>
      ))}
      <rect x={on.targets ? 72 : 134} y={on.targets ? 112 : 130} width={on.targets ? 96 : 30} height={on.targets ? 30 : 10} rx={on.targets ? 6 : 2} fill={DARK} />
      <Txt x={on.targets ? 120 : 149} y={on.targets ? 131 : 137.5} size={on.targets ? 8.5 : 5.2} anchor="middle" bold fill="#FFFFFF">{tt("Continue ▶", "Weiter ▶")}</Txt>
    </Svg>
  );
}

/* ------------------------------------------------------------------ thumbnails of measures, options and decisions */

export type ThumbKind = "bar" | "feedback" | "phone" | "clear" | "access" | "game" | "dense" | "native" | "remind" | "system" | "test" | "mobileFirst";

export function MeasureThumb({ kind }: { kind: ThumbKind }) {
  const label: Record<ThumbKind, string> = {
    bar: tt("A progress bar and three lesson statuses", "Ein Fortschrittsbalken und drei Lektionsstatus"),
    feedback: tt("A tick, an explained result and a Next button", "Ein Haken, ein erklärtes Ergebnis und ein Weiter-Button"),
    phone: tt("A phone-first layout", "Ein Handy-zuerst-Layout"),
    clear: tt("A calm screen with one main thing", "Ein ruhiger Bildschirm mit einer Hauptsache"),
    access: tt("Large targets and strong contrast", "Große Ziele und starker Kontrast"),
    game: tt("A level number and points", "Eine Levelzahl und Punkte"),
    dense: tt("A page of fourteen charts", "Eine Seite mit vierzehn Diagrammen"),
    native: tt("A second product: an app next to the website", "Ein zweites Produkt: eine App neben der Website"),
    remind: tt("A daily reminder email", "Eine tägliche Erinnerungs-E-Mail"),
    system: tt("Feedback, progress and phone as one system", "Feedback, Fortschritt und Handy als ein System"),
    test: tt("A test with learners on their own phones", "Ein Test mit Lernenden auf ihren eigenen Handys"),
    mobileFirst: tt("A phone, a tablet and a desktop layout", "Ein Handy-, ein Tablet- und ein Desktop-Layout"),
  };
  return (
    <Thumb label={label[kind]}>
      {kind === "bar" && (
        <>
          <Txt x={14} y={20} size={9} bold>{tt("3 of 8", "3 von 8")}</Txt>
          <rect x="14" y="26" width="172" height="9" rx="4.5" fill={LITE} />
          <rect x="14" y="26" width="64" height="9" rx="4.5" fill={DARK} />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="14" y={46 + i * 17} width="172" height="13" rx="2" fill={LITE} />
              <Txt x={178} y={56 + i * 17} size={7} anchor="end">{[tt("done", "erledigt"), tt("in progress", "in Arbeit"), tt("open", "offen")][i]}</Txt>
            </g>
          ))}
        </>
      )}
      {kind === "feedback" && (
        <>
          <Txt x={14} y={28} size={16} bold>✓</Txt>
          <Lines x={44} y={14} n={3} w={140} gap={9} fill={MID} />
          <rect x="100" y="70" width="86" height="22" rx="4" fill={DARK} />
          <Txt x={143} y={85} size={8.6} anchor="middle" fill="#FFFFFF">{tt("Next ▶", "Weiter ▶")}</Txt>
        </>
      )}
      {kind === "phone" && (
        <>
          <rect x="70" y="6" width="60" height="98" rx="8" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <rect x="78" y="16" width="44" height="14" rx="3" fill={DARK} />
          <Lines x={78} y={38} n={5} w={44} gap={9} fill={MID} />
        </>
      )}
      {kind === "clear" && (
        <>
          <rect x="14" y="12" width="172" height="8" rx="4" fill={DARK} />
          <Lines x={14} y={30} n={3} w={172} gap={9} fill={MID} />
          <rect x="14" y="68" width="90" height="24" rx="5" fill={DARK} />
        </>
      )}
      {kind === "access" && (
        <>
          <rect x="14" y="20" width="110" height="34" rx="6" fill={DARK} />
          <Txt x={69} y={42} size={12} anchor="middle" bold fill="#FFFFFF">{tt("Continue", "Weiter")}</Txt>
          <Txt x={14} y={84} size={10} bold fill="#222222">{tt("Contrast 4.5 : 1", "Kontrast 4,5 : 1")}</Txt>
        </>
      )}
      {kind === "game" && (
        <>
          <Txt x={14} y={42} size={22} bold>{tt("Level 7", "Level 7")}</Txt>
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={28 + i * 40} cy="74" r="11" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          ))}
        </>
      )}
      {kind === "dense" && (
        <>
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x={10 + (i % 4) * 47} y={10 + Math.floor(i / 4) * 32} width="42" height="26" rx="2" fill={LITE} stroke={MID} />
          ))}
        </>
      )}
      {kind === "native" && (
        <>
          <rect x="16" y="14" width="86" height="80" rx="5" fill="#FFFFFF" stroke={DARK} />
          <Lines x={22} y={24} n={5} w={72} gap={9} fill={MID} />
          <rect x="124" y="10" width="48" height="90" rx="9" fill="#FFFFFF" stroke={DARK} strokeWidth="1.8" />
          <Lines x={130} y={24} n={5} w={36} gap={9} fill={MID} />
        </>
      )}
      {kind === "remind" && (
        <>
          <rect x="30" y="22" width="140" height="64" rx="5" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <path d="M30 24 l70 38 l70 -38" fill="none" stroke={DARK} strokeWidth="1.6" />
        </>
      )}
      {kind === "system" && (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={12 + i * 62} y="36" width="54" height="36" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
              <Txt x={39 + i * 62} y={58} size={8} anchor="middle">{[tt("Feedback", "Feedback"), tt("Progress", "Fortschritt"), tt("Phone", "Handy")][i]}</Txt>
              {i < 2 && <Arrow x1={66 + i * 62} y1={54} x2={74 + i * 62} y2={54} />}
            </g>
          ))}
        </>
      )}
      {kind === "test" && (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={22 + i * 56} y="14" width="38" height="66" rx="6" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
              <circle cx={41 + i * 56} cy="92" r="6" fill="#FFFFFF" stroke={DARK} strokeWidth="1.4" />
            </g>
          ))}
        </>
      )}
      {kind === "mobileFirst" && (
        <>
          <rect x="14" y="18" width="34" height="76" rx="6" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <rect x="58" y="30" width="56" height="64" rx="5" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <rect x="124" y="38" width="64" height="54" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
        </>
      )}
    </Thumb>
  );
}

void LINE;
