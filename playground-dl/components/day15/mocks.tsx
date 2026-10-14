"use client";

import { Arrow, DARK, Frame, LITE, Lines, MID, Marker, Person, Svg, Thumb, Txt } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Real pictures for Day 15 (CLAUDE.md #52): the four MobileLearn screens of the task with their numbered markers, one learner in three contexts, a long lesson against pieces and
 * against units with an objective, a phone screen that gains four fixes, a mobile test, and a thumbnail for every measure, option and decision. Mock screens use their own
 * neutral greys; the site's blue, teal and rust never colour the evidence (#15, #49).
 */

/* ------------------------------------------------------------------ the Task 1 evidence: four MobileLearn screens, eight facts */

export type MlScreen = "lesson" | "phone" | "switch" | "session";

export function MobileScreen({ kind }: { kind: MlScreen }) {
  const label =
    kind === "lesson"
      ? tt("MobileLearn lesson: a 40-minute video with no pause points, and a text page of 1,800 words", "MobileLearn-Lektion: ein 40-Minuten-Video ohne Pausenpunkte und eine Textseite mit 1.800 Wörtern")
      : kind === "phone"
        ? tt("MobileLearn on a phone: a shrunk desktop menu with links close together, and a nine-column table", "MobileLearn auf einem Handy: ein verkleinertes Desktop-Menü mit eng stehenden Links und eine Tabelle mit neun Spalten")
        : kind === "switch"
          ? tt("MobileLearn changing device: a phone showing 60 percent progress and a laptop showing 20 percent", "MobileLearn beim Gerätewechsel: ein Handy mit 60 Prozent Fortschritt und ein Laptop mit 20 Prozent")
          : tt("MobileLearn quiz and video: twelve questions that must be finished in one go, and a video with no captions", "MobileLearn-Quiz und -Video: zwölf Fragen, die in einem Zug beendet werden müssen, und ein Video ohne Untertitel");
  return (
    <Svg viewBox="0 0 240 170" label={label}>
      <Frame>
        {kind === "lesson" && (
          <>
            <Txt x={12} y={30} size={9} bold>{tt("Lesson 4 · Pricing", "Lektion 4 · Preisgestaltung")}</Txt>
            <rect x="12" y="38" width="100" height="56" rx="3" fill="#E9E9E9" stroke={MID} />
            <Txt x={62} y={64} size={14} anchor="middle" bold>▶</Txt>
            <rect x="12" y="98" width="100" height="5" rx="2.5" fill={LITE} />
            <Txt x={62} y={116} size={7.2} anchor="middle">{tt("0:00 / 40:00", "0:00 / 40:00")}</Txt>
            <Lines x={122} y={40} n={9} w={100} gap={7.4} h={2.8} fill="#9A9A9A" short={0.8} />
            <Txt x={122} y={120} size={6.4} fill="#555555">{tt("1,800 words", "1.800 Wörter")}</Txt>
            <Marker x={104} y={46} n={1} />
            <Marker x={216} y={48} n={2} />
          </>
        )}
        {kind === "phone" && (
          <>
            <rect x="70" y="18" width="100" height="148" rx="10" fill="#FFFFFF" stroke={DARK} strokeWidth="2" />
            {Array.from({ length: 7 }, (_, i) => (
              <rect key={i} x="76" y={26 + i * 9} width="88" height="6" rx="1.5" fill={LITE} />
            ))}
            <rect x="76" y="94" width="150" height="40" fill="#FFFFFF" stroke={DARK} strokeDasharray="3 3" />
            {Array.from({ length: 9 }, (_, i) => (
              <line key={i} x1={76 + i * 16.6} y1="94" x2={76 + i * 16.6} y2="134" stroke={MID} />
            ))}
            <Txt x={120} y={150} size={6} anchor="middle">{tt("9 columns, scroll →", "9 Spalten, scrollen →")}</Txt>
            <Marker x={56} y={40} n={3} />
            <Marker x={56} y={114} n={4} />
          </>
        )}
        {kind === "switch" && (
          <>
            <rect x="12" y="30" width="56" height="92" rx="8" fill="#FFFFFF" stroke={DARK} strokeWidth="1.8" />
            <Txt x={40} y={70} size={13} anchor="middle" bold>60%</Txt>
            <Txt x={40} y={84} size={6.4} anchor="middle">{tt("phone", "Handy")}</Txt>
            <Arrow x1={72} y1={76} x2={102} y2={76} dash="3 3" />
            <rect x="106" y="38" width="120" height="76" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.8" />
            <Txt x={166} y={74} size={13} anchor="middle" bold>20%</Txt>
            <Txt x={166} y={88} size={6.4} anchor="middle">{tt("laptop: start at home page", "Laptop: Start auf der Startseite")}</Txt>
            <Marker x={56} y={40} n={5} />
            <Marker x={216} y={46} n={6} />
          </>
        )}
        {kind === "session" && (
          <>
            <Txt x={12} y={30} size={9} bold>{tt("Quiz · question 7 of 12", "Quiz · Frage 7 von 12")}</Txt>
            <rect x="12" y="36" width="214" height="7" rx="3.5" fill={LITE} />
            <rect x="12" y="36" width="124" height="7" rx="3.5" fill={DARK} />
            <Txt x={12} y={58} size={6.8} fill="#555555">{tt("Leaving now loses all answers.", "Wenn Sie jetzt gehen, gehen alle Antworten verloren.")}</Txt>
            <rect x="12" y="72" width="100" height="56" rx="3" fill="#E9E9E9" stroke={MID} />
            <Txt x={62} y={98} size={12} anchor="middle" bold>▶</Txt>
            <Txt x={122} y={104} size={6.8} fill="#555555">{tt("Video: spoken, no captions", "Video: gesprochen, keine Untertitel")}</Txt>
            <Marker x={216} y={44} n={7} />
            <Marker x={104} y={80} n={8} />
          </>
        )}
      </Frame>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A1 · one learner in three contexts */

export type CtxKind = "desk" | "train" | "break";

export function ContextMock({ kind }: { kind: CtxKind }) {
  return (
    <Svg
      viewBox="0 0 240 130"
      label={
        kind === "desk"
          ? tt("Ben at a desk with a large screen, an hour free and no distractions", "Ben am Schreibtisch mit großem Bildschirm, einer freien Stunde und ohne Ablenkung")
          : kind === "train"
            ? tt("Ben standing on a crowded train with a phone in one hand and a few minutes", "Ben steht in einem vollen Zug mit dem Handy in einer Hand und wenigen Minuten")
            : tt("Ben in a five-minute break, with a phone, one eye on the clock", "Ben in einer Fünf-Minuten-Pause mit dem Handy, ein Auge auf der Uhr")
      }
    >
      <rect x="1" y="1" width="238" height="128" rx="5" fill="#F6F6F6" stroke={MID} />
      {kind === "desk" && (
        <>
          <Person x={44} y={40} s={1} />
          <rect x="88" y="22" width="132" height="68" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.8" />
          <Lines x={96} y={32} n={5} w={116} gap={10} h={3.4} fill={MID} />
          <rect x="108" y="92" width="92" height="6" rx="2" fill={LITE} />
          <Txt x={12} y={116} size={7.4} fill="#555555">{tt("An hour, a big screen, a keyboard, quiet.", "Eine Stunde, ein großer Bildschirm, eine Tastatur, Ruhe.")}</Txt>
        </>
      )}
      {kind === "train" && (
        <>
          <Person x={40} y={40} s={1} />
          <rect x="68" y="28" width="22" height="38" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          {[0, 1, 2, 3].map((i) => (
            <Person key={i} x={120 + i * 28} y={50} s={0.55} />
          ))}
          <Txt x={150} y={92} size={7.4}>{tt("crowded · noise · one hand", "voll · Lärm · eine Hand")}</Txt>
          <Txt x={12} y={116} size={7.4} fill="#555555">{tt("A few minutes, low attention, many interruptions.", "Wenige Minuten, wenig Aufmerksamkeit, viele Unterbrechungen.")}</Txt>
        </>
      )}
      {kind === "break" && (
        <>
          <Person x={40} y={40} s={1} />
          <rect x="68" y="28" width="22" height="38" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <circle cx="170" cy="48" r="26" fill="#FFFFFF" stroke={DARK} strokeWidth="1.8" />
          <line x1="170" y1="48" x2="170" y2="32" stroke={DARK} strokeWidth="2" />
          <line x1="170" y1="48" x2="182" y2="52" stroke={DARK} strokeWidth="2" />
          <Txt x={170} y={92} size={7.4} anchor="middle">{tt("5 minutes left", "noch 5 Minuten")}</Txt>
          <Txt x={12} y={116} size={7.4} fill="#555555">{tt("Short, quick to start, easy to stop.", "Kurz, schnell zu starten, leicht zu beenden.")}</Txt>
        </>
      )}
    </Svg>
  );
}

/* ------------------------------------------------------------------ A2 · a long lesson, arbitrary pieces, units with an objective */

export type MicroKind = "long" | "cut" | "micro";

export function MicroMock({ kind }: { kind: MicroKind }) {
  return (
    <Svg
      viewBox="0 0 240 130"
      label={
        kind === "long"
          ? tt("One long 40-minute lesson", "Eine lange Lektion von 40 Minuten")
          : kind === "cut"
            ? tt("The same lesson cut into five-minute pieces at arbitrary points, each with no goal", "Dieselbe Lektion an beliebigen Stellen in Fünf-Minuten-Stücke geschnitten, jedes ohne Ziel")
            : tt("The same content as five short units, each with one goal and a place in the course", "Derselbe Inhalt als fünf kurze Einheiten, jede mit einem Ziel und einem Platz im Kurs")
      }
    >
      <rect x="1" y="1" width="238" height="128" rx="5" fill="#F6F6F6" stroke={MID} />
      {kind === "long" && (
        <>
          <rect x="12" y="24" width="216" height="40" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <Txt x={120} y={48} size={10} anchor="middle" bold>{tt("Lesson 4 · 40 minutes", "Lektion 4 · 40 Minuten")}</Txt>
          <Txt x={12} y={96} size={7.4} fill="#555555">{tt("One block. Finish it, or lose your place.", "Ein Block. Beenden Sie ihn, oder verlieren Sie Ihre Stelle.")}</Txt>
        </>
      )}
      {kind === "cut" && (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect x={12 + i * 44} y="24" width="40" height="40" rx="3" fill="#FFFFFF" stroke={DARK} strokeDasharray="3 3" />
              <Txt x={32 + i * 44} y={48} size={8} anchor="middle">{`${i + 1}`}</Txt>
            </g>
          ))}
          <Txt x={12} y={96} size={7.4} fill="#555555">{tt("Cut mid-sentence. No piece says what it is for.", "Mitten im Satz geschnitten. Kein Stück sagt, wofür es da ist.")}</Txt>
        </>
      )}
      {kind === "micro" && (
        <>
          {[tt("Why price", "Warum Preis"), tt("Anchor", "Anker"), tt("Offer", "Angebot"), tt("Reply", "Antwort"), tt("Close", "Abschluss")].map((s, i) => (
            <g key={i}>
              <rect x={12 + i * 44} y="24" width="40" height="40" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
              <Txt x={32 + i * 44} y={42} size={6.4} anchor="middle" bold>{s}</Txt>
              <Txt x={32 + i * 44} y={56} size={6} anchor="middle">{`4 min`}</Txt>
            </g>
          ))}
          <rect x="12" y="74" width="216" height="8" rx="4" fill={LITE} />
          <rect x="12" y="74" width="88" height="8" rx="4" fill={DARK} />
          <Txt x={12} y={102} size={7.4} fill="#555555">{tt("Each unit has one goal, a short check and its place in the course.", "Jede Einheit hat ein Ziel, eine kurze Prüfung und ihren Platz im Kurs.")}</Txt>
        </>
      )}
    </Svg>
  );
}

/* ------------------------------------------------------------------ A3 · a phone screen that gains four fixes */

export type PhoneOn = { priority: boolean; targets: boolean; reflow: boolean; sync: boolean };

export function PhoneFixMock({ on }: { on: PhoneOn }) {
  const n = [on.priority, on.targets, on.reflow, on.sync].filter(Boolean).length;
  return (
    <Svg viewBox="0 0 240 150" label={tt(`A phone screen with ${n} of 4 fixes switched on: content prioritised, large targets, text that fits, and a synchronised continue card`, `Ein Handybildschirm mit ${n} von 4 eingeschalteten Korrekturen: priorisierter Inhalt, große Ziele, passender Text und eine synchronisierte Weitermachen-Karte`)}>
      <rect x="1" y="1" width="238" height="148" rx="5" fill="#F6F6F6" stroke={MID} />
      <rect x="80" y="8" width="80" height="136" rx="10" fill="#FFFFFF" stroke={DARK} strokeWidth="2" />
      {on.sync ? (
        <g>
          <rect x="86" y="16" width="68" height="22" rx="4" fill={DARK} />
          <Txt x={120} y={26} size={6.2} anchor="middle" fill="#FFFFFF">{tt("Continue: Unit 3", "Weiter: Einheit 3")}</Txt>
          <Txt x={120} y={34} size={5.4} anchor="middle" fill="#FFFFFF">{tt("from your laptop, 2 min ago", "von Ihrem Laptop, vor 2 Min.")}</Txt>
        </g>
      ) : (
        <Lines x={86} y={20} n={2} w={68} gap={7} h={3} fill={MID} />
      )}
      {on.priority ? (
        <>
          <Txt x={86} y={54} size={7.4} bold>{tt("Today: 4 minutes", "Heute: 4 Minuten")}</Txt>
          <Lines x={86} y={60} n={2} w={62} gap={7} h={3} fill="#8A8A8A" />
        </>
      ) : (
        <Lines x={86} y={48} n={6} w={68} gap={6} h={2.6} fill="#8A8A8A" />
      )}
      {on.reflow ? <Lines x={86} y={84} n={3} w={64} gap={7} h={3.2} fill="#8A8A8A" /> : <rect x="86" y="84" width="110" height="22" fill="#F0F0F0" stroke={MID} strokeDasharray="3 2" />}
      <rect x="86" y={on.targets ? 112 : 120} width={on.targets ? 68 : 26} height={on.targets ? 22 : 8} rx="3" fill={DARK} />
      <Txt x={on.targets ? 120 : 99} y={on.targets ? 126 : 126.5} size={on.targets ? 7.6 : 4.8} anchor="middle" fill="#FFFFFF">{tt("Start", "Starten")}</Txt>
      <Txt x={10} y={140} size={6.6} fill="#555555">{tt(`${n} of 4 fixes on`, `${n} von 4 Korrekturen an`)}</Txt>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A4 · a mobile test, static */

export function MobileTestMock() {
  return (
    <Svg viewBox="0 0 240 120" label={tt("A learner tests a task on her own phone on a train while a tester watches and notes where she stops", "Eine Lernende testet eine Aufgabe auf ihrem eigenen Handy im Zug, während ein Tester zuschaut und festhält, wo sie hängenbleibt")}>
      <rect x="4" y="4" width="232" height="112" rx="5" fill="#F6F6F6" stroke={MID} />
      <Person x={40} y={40} s={0.9} />
      <rect x="62" y="28" width="20" height="34" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
      <Person x={118} y={46} s={0.7} />
      <rect x="140" y="22" width="86" height="60" rx="4" fill="#FFFFFF" stroke={DARK} />
      <Txt x={148} y={38} size={7} bold>{tt("Notes", "Notizen")}</Txt>
      <Lines x={148} y={44} n={3} w={70} gap={8} h={3} fill={MID} />
      <Txt x={12} y={104} size={7.4} fill="#555555">{tt("Real phone, real setting, real task: where does she stop?", "Echtes Handy, echte Umgebung, echte Aufgabe: Wo bleibt sie hängen?")}</Txt>
    </Svg>
  );
}

/* ------------------------------------------------------------------ thumbnails for measures, options and decisions */

export type ThumbKind = "micro" | "mobile" | "nav" | "sync" | "test" | "app" | "push" | "shrink" | "everything" | "desktop" | "separate" | "research" | "site";

export function MeasureThumb({ kind }: { kind: ThumbKind }) {
  const label: Record<ThumbKind, string> = {
    micro: tt("A long lesson cut into short units with a goal each", "Eine lange Lektion in kurze Einheiten mit je einem Ziel geschnitten"),
    mobile: tt("A phone layout with large buttons", "Ein Handylayout mit großen Buttons"),
    nav: tt("A continue card and a bottom bar of three entries", "Eine Weitermachen-Karte und eine untere Leiste mit drei Einträgen"),
    sync: tt("A phone and a laptop with the same progress", "Ein Handy und ein Laptop mit demselben Fortschritt"),
    test: tt("A tester watching a learner with a phone", "Ein Tester, der einer Lernenden mit Handy zuschaut"),
    app: tt("A native app next to the website", "Eine native App neben der Website"),
    push: tt("A reminder message on a phone", "Eine Erinnerungsnachricht auf einem Handy"),
    shrink: tt("A desktop page shrunk to fit a phone", "Eine Desktop-Seite, verkleinert, damit sie aufs Handy passt"),
    everything: tt("Everything rewritten for the phone only", "Alles nur fürs Handy neu geschrieben"),
    desktop: tt("A desktop page copied unchanged to a phone", "Eine Desktop-Seite, unverändert aufs Handy kopiert"),
    separate: tt("A second, separate phone product", "Ein zweites, getrenntes Handyprodukt"),
    research: tt("A diary of when and where a learner studies", "Ein Tagebuch dazu, wann und wo eine Lernende lernt"),
    site: tt("A separate small mobile site", "Eine getrennte kleine mobile Website"),
  };
  return (
    <Thumb label={label[kind]}>
      {kind === "micro" && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={14 + i * 44} y="26" width="40" height="44" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.5" />
              <Txt x={34 + i * 44} y={52} size={8} anchor="middle">{tt("4 min", "4 Min.")}</Txt>
            </g>
          ))}
        </>
      )}
      {kind === "mobile" && (
        <>
          <rect x="68" y="6" width="64" height="98" rx="8" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <Lines x={76} y={16} n={3} w={48} gap={8} h={3} fill={MID} />
          <rect x="76" y="56" width="48" height="22" rx="4" fill={DARK} />
          <rect x="76" y="82" width="48" height="16" rx="4" fill={DARK} />
        </>
      )}
      {kind === "nav" && (
        <>
          <rect x="68" y="6" width="64" height="98" rx="8" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <rect x="74" y="14" width="52" height="26" rx="4" fill={DARK} />
          <Txt x={100} y={31} size={7} anchor="middle" fill="#FFFFFF">{tt("Continue", "Weiter")}</Txt>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={74 + i * 18} y="86" width="16" height="12" rx="2" fill={LITE} stroke={DARK} />
          ))}
        </>
      )}
      {kind === "sync" && (
        <>
          <rect x="20" y="26" width="34" height="56" rx="6" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <Txt x={37} y={58} size={9} anchor="middle" bold>60%</Txt>
          <Arrow x1={60} y1={54} x2={88} y2={54} />
          <rect x="94" y="30" width="86" height="48" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <Txt x={137} y={58} size={9} anchor="middle" bold>60%</Txt>
        </>
      )}
      {kind === "test" && (
        <>
          <Person x={50} y={36} s={0.8} />
          <rect x="72" y="26" width="16" height="28" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.5" />
          <Person x={140} y={40} s={0.65} />
          <rect x="108" y="70" width="70" height="22" rx="3" fill="#FFFFFF" stroke={DARK} strokeDasharray="4 3" />
        </>
      )}
      {kind === "app" && (
        <>
          <rect x="16" y="22" width="74" height="60" rx="4" fill="#FFFFFF" stroke={DARK} />
          <Txt x={53} y={56} size={8} anchor="middle">{tt("Website", "Website")}</Txt>
          <rect x="120" y="24" width="30" height="56" rx="6" fill="#FFFFFF" stroke={DARK} strokeDasharray="4 3" />
          <Txt x={135} y={56} size={7} anchor="middle">{tt("App", "App")}</Txt>
          <rect x="156" y="24" width="30" height="56" rx="6" fill="#FFFFFF" stroke={DARK} strokeDasharray="4 3" />
        </>
      )}
      {kind === "push" && (
        <>
          <rect x="68" y="6" width="64" height="98" rx="8" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <rect x="74" y="16" width="52" height="22" rx="4" fill={LITE} stroke={DARK} />
          <Txt x={100} y={30} size={6.4} anchor="middle">{tt("Time to learn!", "Zeit zum Lernen!")}</Txt>
        </>
      )}
      {kind === "shrink" && (
        <>
          <rect x="14" y="10" width="172" height="90" rx="4" fill="#FFFFFF" stroke={DARK} />
          <Lines x={20} y={18} n={9} w={160} gap={8.6} h={2} fill="#8A8A8A" short={0.9} />
        </>
      )}
      {kind === "everything" && (
        <>
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x={14 + (i % 6) * 29} y={14 + Math.floor(i / 6) * 40} width="25" height="34" rx="3" fill={LITE} stroke={DARK} strokeWidth="0.8" />
          ))}
        </>
      )}
      {kind === "desktop" && (
        <>
          <rect x="14" y="10" width="172" height="90" rx="4" fill="#FFFFFF" stroke={DARK} />
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x={20 + i * 20} y="16" width="17" height="8" rx="1.5" fill={LITE} />
          ))}
          <Lines x={20} y={36} n={5} w={160} gap={10} h={3.4} fill={MID} />
        </>
      )}
      {kind === "separate" && (
        <>
          <rect x="18" y="20" width="72" height="64" rx="4" fill="#FFFFFF" stroke={DARK} />
          <rect x="110" y="20" width="72" height="64" rx="4" fill="#FFFFFF" stroke={DARK} strokeDasharray="4 3" />
        </>
      )}
      {kind === "research" && (
        <>
          <rect x="50" y="10" width="100" height="90" rx="4" fill="#FFFFFF" stroke={DARK} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="58" y={20 + i * 20} width="10" height="10" rx="2" fill="#FFFFFF" stroke={DARK} />
              <rect x="74" y={23 + i * 20} width="68" height="4" rx="2" fill={MID} />
            </g>
          ))}
        </>
      )}
      {kind === "site" && (
        <>
          <rect x="60" y="14" width="80" height="82" rx="4" fill="#FFFFFF" stroke={DARK} strokeDasharray="4 3" />
          <Txt x={100} y={58} size={8} anchor="middle">{tt("m.site", "m.site")}</Txt>
        </>
      )}
    </Thumb>
  );
}
