"use client";

import { Arrow, DARK, Frame, LINE, LITE, Lines, MID, Marker, Svg, Thumb, Txt } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Real pictures for Day 9 (CLAUDE.md #52): the four NavLearn screens of the task with their numbered markers, a menu with few or many entries, an information
 * architecture that grew and one that is grouped, a lesson that is only read, one that asks a question with feedback and one that rewards clicks, the end of a lesson with
 * or without feedback, and a thumbnail for every measure, option and decision. Mock screens use their own neutral greys; the site's blue, teal and rust never colour the
 * evidence (#15, #49).
 */

const NAMES = ["Hub", "Stream", "Vault", "Space", "Zone", "Lab", "Deck", "Core", "Port", "Grid", "Nest", "Loop", "Atlas", "Base", "Dock", "Feed", "Gate", "Hive", "Index", "Join", "Kit", "Lane", "Mesh", "Node"];

/* ------------------------------------------------------------------ the Task 1 evidence: four NavLearn screens, eight facts */

export type NlScreen = "home" | "course" | "lesson" | "search";

export function NavScreen({ kind }: { kind: NlScreen }) {
  const label =
    kind === "home"
      ? tt("NavLearn home: 24 menu entries in one row named Hub, Stream, Vault and Space and so on", "NavLearn-Startseite: 24 Menüeinträge in einer Reihe mit Namen wie Hub, Stream, Vault und Space")
      : kind === "course"
        ? tt("NavLearn course page: a menu with 24 entries and a second menu with 11 entries side by side", "NavLearn-Kursseite: ein Menü mit 24 Einträgen und ein zweites Menü mit 11 Einträgen nebeneinander")
        : kind === "lesson"
          ? tt("NavLearn lesson page: two buttons named Go and Run, no lesson number, and a quiz score of 6 of 10 with no next step", "NavLearn-Lektionsseite: zwei Buttons namens Go und Run, keine Lektionsnummer und ein Quizergebnis von 6 von 10 ohne nächsten Schritt")
          : tt("NavLearn search results: 140 results in no order and no filters, under the title NavLearn", "NavLearn-Suchergebnisse: 140 Ergebnisse ohne Ordnung und ohne Filter, unter dem Titel NavLearn");
  return (
    <Svg viewBox="0 0 240 170" label={label}>
      <Frame>
        {kind === "home" && (
          <>
            <Txt x={12} y={30} size={9} bold>NavLearn</Txt>
            {NAMES.map((n, i) => (
              <g key={n}>
                <rect x={10 + (i % 8) * 28} y={36 + Math.floor(i / 8) * 17} width="26" height="14" rx="2" fill={LITE} stroke={MID} />
                <Txt x={23 + (i % 8) * 28} y={46 + Math.floor(i / 8) * 17} size={5.6} anchor="middle">{n}</Txt>
              </g>
            ))}
            <Txt x={12} y={102} size={9} bold>{tt("Welcome back", "Willkommen zurück")}</Txt>
            <Lines x={12} y={110} n={4} w={216} gap={8} fill="#B4B4B4" />
            <Marker x={226} y={58} n={1} />
            <Marker x={120} y={93} n={3} />
          </>
        )}
        {kind === "course" && (
          <>
            <rect x="8" y="20" width="54" height="140" fill={LITE} />
            {Array.from({ length: 12 }, (_, i) => (
              <rect key={i} x="12" y={24 + i * 11.5} width={30 + (i % 3) * 8} height="4" rx="2" fill={LINE} />
            ))}
            <rect x="66" y="20" width="44" height="140" fill="#EDEDED" />
            {Array.from({ length: 11 }, (_, i) => (
              <rect key={i} x="70" y={26 + i * 12} width={22 + (i % 3) * 6} height="4" rx="2" fill={MID} />
            ))}
            <Txt x={122} y={34} size={9} bold>{tt("Negotiation basics", "Verhandlungsgrundlagen")}</Txt>
            <Lines x={122} y={44} n={6} w={104} gap={8} fill="#B4B4B4" />
            <Marker x={112} y={90} n={2} />
          </>
        )}
        {kind === "lesson" && (
          <>
            <Txt x={14} y={30} size={9} bold>{tt("The first offer", "Das erste Angebot")}</Txt>
            <rect x="150" y="19" width="76" height="14" rx="2" fill="#FFFFFF" stroke={MID} strokeDasharray="3 3" />
            <Lines x={14} y={40} n={4} w={212} gap={8} fill="#B4B4B4" />
            <rect x="14" y="78" width="46" height="16" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.3" />
            <Txt x={37} y={89} size={8} anchor="middle">Go</Txt>
            <rect x="68" y="78" width="46" height="16" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.3" />
            <Txt x={91} y={89} size={8} anchor="middle">Run</Txt>
            <rect x="14" y="108" width="212" height="40" rx="4" fill="#FFFFFF" stroke={MID} />
            <Txt x={120} y={134} size={14} anchor="middle" bold>6 / 10</Txt>
            <Marker x={124} y={86} n={4} />
            <Marker x={214} y={26} n={5} />
            <Marker x={216} y={140} n={6} />
          </>
        )}
        {kind === "search" && (
          <>
            <Txt x={12} y={30} size={9} bold>NavLearn</Txt>
            <rect x="12" y="36" width="150" height="14" rx="7" fill="#FFFFFF" stroke={DARK} />
            <Txt x={22} y={46} size={7}>{tt("negotiation", "Verhandlung")}</Txt>
            <Txt x={12} y={62} size={7} fill="#555555">{tt("140 results", "140 Ergebnisse")}</Txt>
            {Array.from({ length: 6 }, (_, i) => (
              <g key={i}>
                <rect x="12" y={68 + i * 15} width="216" height="12" rx="2" fill={LITE} />
                <rect x="16" y={72 + i * 15} width={90 + ((i * 37) % 90)} height="3.4" rx="1.7" fill={LINE} />
              </g>
            ))}
            <Marker x={216} y={96} n={7} />
            <Marker x={72} y={26} n={8} />
          </>
        )}
      </Frame>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A1 · a platform that grew, and the same platform grouped */

export function IaMock({ grouped }: { grouped: boolean }) {
  const items = [tt("My courses", "Meine Kurse"), tt("Catalogue", "Katalog"), tt("Search", "Suche"), tt("Progress", "Fortschritt"), tt("Certificates", "Zertifikate"), tt("Help centre", "Hilfecenter"), tt("Profile", "Profil"), tt("Notes", "Notizen")];
  const groups: [string, number[]][] = [
    [tt("Learn", "Lernen"), [0, 7]],
    [tt("Find", "Finden"), [1, 2]],
    [tt("Progress", "Fortschritt"), [3, 4]],
    [tt("Help", "Hilfe"), [5, 6]],
  ];
  return (
    <Svg
      viewBox="0 0 240 150"
      label={
        grouped
          ? tt("The same eight items grouped under four sections: Learn, Find, Progress and Help", "Dieselben acht Einträge in vier Bereichen gruppiert: Lernen, Finden, Fortschritt und Hilfe")
          : tt("Eight items in one flat row, with the same course twice under different names", "Acht Einträge in einer flachen Reihe, mit demselben Kurs zweimal unter verschiedenen Namen")
      }
    >
      <rect x="1" y="1" width="238" height="148" rx="5" fill="#F6F6F6" stroke={MID} />
      {!grouped &&
        items.concat([tt("Courses (old)", "Kurse (alt)"), tt("Library", "Bibliothek"), tt("Archive", "Archiv"), tt("Downloads", "Downloads")]).map((n, i) => (
          <g key={n}>
            <rect x={10 + (i % 4) * 57} y={14 + Math.floor(i / 4) * 34} width="52" height="26" rx="3" fill="#FFFFFF" stroke={LINE} />
            <Txt x={36 + (i % 4) * 57} y={31 + Math.floor(i / 4) * 34} size={7} anchor="middle">{n}</Txt>
          </g>
        ))}
      {grouped &&
        groups.map(([g, ids], i) => (
          <g key={g}>
            <rect x={8 + i * 58} y="12" width="54" height="20" rx="3" fill={DARK} />
            <Txt x={35 + i * 58} y={26} size={8} anchor="middle" bold fill="#FFFFFF">{g}</Txt>
            {ids.map((id, j) => (
              <g key={id}>
                <rect x={10 + i * 58} y={40 + j * 28} width="50" height="22" rx="3" fill="#FFFFFF" stroke={LINE} />
                <Txt x={35 + i * 58} y={54 + j * 28} size={6.6} anchor="middle">{items[id]}</Txt>
              </g>
            ))}
          </g>
        ))}
      <Txt x={10} y={140} size={7.5} fill="#444444">{grouped ? tt("Four groups; each item has one home.", "Vier Gruppen; jeder Eintrag hat einen Ort.") : tt("Twelve entries, one flat row, two homes for the same course.", "Zwölf Einträge, eine flache Reihe, zwei Orte für denselben Kurs.")}</Txt>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A2 · a menu with 4, 9 or 24 entries */

export function MenuMock({ n }: { n: 4 | 9 | 24 }) {
  const cols = n === 4 ? 4 : n === 9 ? 5 : 8;
  const w = n === 4 ? 52 : n === 9 ? 40 : 24;
  const gap = n === 4 ? 6 : 4;
  return (
    <Svg viewBox="0 0 240 130" label={tt(`A menu with ${n} entries, and a learner who looks for “Contracts”`, `Ein Menü mit ${n} Einträgen und eine Lernende, die „Verträge“ sucht`)}>
      <rect x="1" y="1" width="238" height="128" rx="5" fill="#F6F6F6" stroke={MID} />
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x={10 + (i % cols) * (w + gap)} y={12 + Math.floor(i / cols) * (n === 24 ? 20 : 26)} width={w} height={n === 24 ? 16 : 22} rx="3" fill={i === 3 ? "#FFFFFF" : LITE} stroke={i === 3 ? DARK : MID} strokeWidth={i === 3 ? 1.6 : 1} />
          <Txt x={10 + (i % cols) * (w + gap) + w / 2} y={(n === 24 ? 24 : 27) + Math.floor(i / cols) * (n === 24 ? 20 : 26)} size={n === 24 ? 5.6 : n === 9 ? 6.4 : 7.4} anchor="middle">{i === 3 ? tt("Contracts", "Verträge") : NAMES[i]}</Txt>
        </g>
      ))}
      <Txt x={10} y={116} size={8} fill="#444444">{tt(`Find “Contracts” among ${n} entries.`, `„Verträge“ unter ${n} Einträgen finden.`)}</Txt>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A3 · a lesson that is read, one that asks, one that rewards clicks */

export type ActiveKind = "read" | "ask" | "clicks";

export function ActiveMock({ kind }: { kind: ActiveKind }) {
  return (
    <Svg
      viewBox="0 0 240 150"
      label={
        kind === "read"
          ? tt("A lesson page that is only a text to read, with a Next button", "Eine Lektionsseite, die nur ein Text zum Lesen ist, mit einem Weiter-Button")
          : kind === "ask"
            ? tt("A lesson page with one short question, an explained answer and a next step", "Eine Lektionsseite mit einer kurzen Frage, einer erklärten Antwort und einem nächsten Schritt")
            : tt("A lesson page with badges for opening pages and pressing buttons", "Eine Lektionsseite mit Abzeichen fürs Öffnen von Seiten und Drücken von Buttons")
      }
    >
      <rect x="1" y="1" width="238" height="148" rx="5" fill="#F6F6F6" stroke={MID} />
      <Txt x={12} y={22} size={9} bold>{tt("The first offer", "Das erste Angebot")}</Txt>
      {kind === "read" && (
        <>
          <Lines x={12} y={32} n={8} w={216} gap={9} fill="#B4B4B4" />
          <rect x="150" y="118" width="78" height="20" rx="4" fill={DARK} />
          <Txt x={189} y={132} size={8} anchor="middle" fill="#FFFFFF">{tt("Next ▶", "Weiter ▶")}</Txt>
        </>
      )}
      {kind === "ask" && (
        <>
          <Lines x={12} y={32} n={3} w={216} gap={9} fill="#B4B4B4" />
          <rect x="12" y="62" width="216" height="46" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.3" />
          <Txt x={20} y={76} size={7.5} bold>{tt("Who should name the first number?", "Wer sollte die erste Zahl nennen?")}</Txt>
          <rect x="20" y="82" width="90" height="16" rx="3" fill={LITE} stroke={DARK} />
          <Txt x={65} y={93} size={7} anchor="middle">{tt("A · you", "A · Sie")}</Txt>
          <rect x="118" y="82" width="104" height="16" rx="3" fill="#FFFFFF" stroke={MID} />
          <Txt x={170} y={93} size={7} anchor="middle">{tt("B · the other side", "B · die Gegenseite")}</Txt>
          <Txt x={12} y={120} size={7} fill="#333333">{tt("A is right: the first number sets the anchor.", "A stimmt: Die erste Zahl setzt den Anker.")}</Txt>
          <rect x="150" y="124" width="78" height="18" rx="4" fill={DARK} />
          <Txt x={189} y={136} size={7.5} anchor="middle" fill="#FFFFFF">{tt("Next: lesson 4 ▶", "Weiter: Lektion 4 ▶")}</Txt>
        </>
      )}
      {kind === "clicks" && (
        <>
          <Lines x={12} y={32} n={3} w={216} gap={9} fill="#B4B4B4" />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <circle cx={30 + i * 44} cy="76" r="14" fill="#FFFFFF" stroke={DARK} strokeWidth="1.5" />
              <Txt x={30 + i * 44} y={80} size={9} anchor="middle">★</Txt>
            </g>
          ))}
          <Txt x={12} y={108} size={7.5}>{tt("You opened a page: +5 points. You pressed a button: +2 points.", "Sie haben eine Seite geöffnet: +5 Punkte. Sie haben einen Button gedrückt: +2 Punkte.")}</Txt>
          <Txt x={12} y={122} size={7.5} fill="#555555">{tt("Nothing says what you learned.", "Nichts sagt, was Sie gelernt haben.")}</Txt>
        </>
      )}
    </Svg>
  );
}

/* ------------------------------------------------------------------ A4 · the end of a lesson with an explained result, a next step and some variety */

export type EndOn = { result: boolean; next: boolean; variety: boolean };

export function EndMock({ on }: { on: EndOn }) {
  return (
    <Svg
      viewBox="0 0 240 150"
      label={tt(
        `The end of a LearnLoop lesson. ${on.result ? "An explained result is shown." : "Only a score of 6 of 10 is shown."} ${on.next ? "A button reads Next: lesson 4." : "There is no next step."} ${on.variety ? "The next task is a short scenario and not another question." : "The next task is the same kind of question again."}`,
        `Das Ende einer LearnLoop-Lektion. ${on.result ? "Ein erklärtes Ergebnis wird gezeigt." : "Nur ein Ergebnis von 6 von 10 wird gezeigt."} ${on.next ? "Ein Button lautet Weiter: Lektion 4." : "Es gibt keinen nächsten Schritt."} ${on.variety ? "Die nächste Aufgabe ist ein kurzes Szenario und nicht wieder eine Frage." : "Die nächste Aufgabe ist wieder dieselbe Art Frage."}`,
      )}
    >
      <rect x="1" y="1" width="238" height="148" rx="5" fill="#F6F6F6" stroke={MID} />
      <Txt x={12} y={22} size={9} bold>{tt("Quiz finished", "Quiz beendet")}</Txt>
      <Txt x={12} y={46} size={20} bold>6 / 10</Txt>
      {on.result ? (
        <>
          <Lines x={84} y={32} n={3} w={140} gap={9} fill="#9A9A9A" />
          <Txt x={84} y={64} size={7} fill="#333333">{tt("You missed the anchor question: the first number sets the anchor.", "Sie haben die Ankerfrage verpasst: Die erste Zahl setzt den Anker.")}</Txt>
        </>
      ) : (
        <Txt x={84} y={44} size={7.5} fill="#777777">{tt("Well done. Try again.", "Gut gemacht. Versuchen Sie es nochmal.")}</Txt>
      )}
      <rect x="12" y="78" width="216" height="30" rx="4" fill="#FFFFFF" stroke={MID} />
      <Txt x={20} y={90} size={7} fill="#555555">{tt("The next task", "Die nächste Aufgabe")}</Txt>
      <Txt x={20} y={102} size={8.5} bold>{on.variety ? tt("A short scenario: you are the buyer", "Ein kurzes Szenario: Sie sind der Käufer") : tt("Question 11: choose A, B or C", "Frage 11: Wählen Sie A, B oder C")}</Txt>
      {on.next ? (
        <>
          <rect x="140" y="118" width="88" height="22" rx="4" fill={DARK} />
          <Txt x={184} y={133} size={8} anchor="middle" fill="#FFFFFF" bold>{tt("Next: lesson 4 ▶", "Weiter: Lektion 4 ▶")}</Txt>
        </>
      ) : (
        <Txt x={12} y={132} size={7} fill="#777777">{tt("(nothing more on this page)", "(nichts weiter auf dieser Seite)")}</Txt>
      )}
    </Svg>
  );
}

/* ------------------------------------------------------------------ thumbnails of measures, options and decisions */

export type ThumbKind = "ia" | "nav" | "quiz" | "feedback" | "label" | "reward" | "drag" | "theme" | "chat" | "patterns" | "path" | "test" | "progress" | "look";

export function MeasureThumb({ kind }: { kind: ThumbKind }) {
  const label: Record<ThumbKind, string> = {
    ia: tt("An information architecture: a root with four sections", "Eine Informationsarchitektur: eine Wurzel mit vier Bereichen"),
    nav: tt("A short menu with a path above the page", "Ein kurzes Menü mit einem Pfad über der Seite"),
    quiz: tt("One short question after a lesson section", "Eine kurze Frage nach einem Lektionsabschnitt"),
    feedback: tt("An explained result and a Next button", "Ein erklärtes Ergebnis und ein Weiter-Button"),
    label: tt("Buttons renamed after what the learner does", "Buttons, umbenannt nach dem, was die Lernende tut"),
    reward: tt("Stars and points for every click", "Sterne und Punkte für jeden Klick"),
    drag: tt("A drag-and-drop exercise on every lesson", "Eine Drag-and-drop-Übung in jeder Lektion"),
    theme: tt("A new colour theme", "Ein neues Farbthema"),
    chat: tt("A chat assistant", "Ein Chat-Assistent"),
    patterns: tt("Five interaction patterns", "Fünf Interaktionsmuster"),
    path: tt("A guided learning path with a skip option", "Ein geführter Lernpfad mit Überspring-Möglichkeit"),
    test: tt("A test: learners find an item", "Ein Test: Lernende finden einen Eintrag"),
    progress: tt("A progress bar on a course page", "Ein Fortschrittsbalken auf einer Kursseite"),
    look: tt("Only the look changes", "Nur das Aussehen ändert sich"),
  };
  return (
    <Thumb label={label[kind]}>
      {kind === "ia" && (
        <>
          <rect x="82" y="8" width="36" height="14" rx="3" fill="#FFFFFF" stroke={DARK} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <line x1="100" y1="22" x2={26 + i * 49} y2="44" stroke={LINE} />
              <rect x={8 + i * 49} y="44" width="36" height="14" rx="3" fill="#FFFFFF" stroke={DARK} />
              <Lines x={12 + i * 49} y={66} n={3} w={28} gap={9} fill={MID} />
            </g>
          ))}
        </>
      )}
      {kind === "nav" && (
        <>
          <Txt x={14} y={20} size={8} fill="#444444">{tt("Learn › Course › Lesson 3 of 8", "Lernen › Kurs › Lektion 3 von 8")}</Txt>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={14 + i * 44} y="32" width="40" height="14" rx="3" fill={i === 0 ? DARK : LITE} />
          ))}
          <Lines x={14} y={58} n={3} w={172} gap={9} fill={MID} />
        </>
      )}
      {kind === "quiz" && (
        <>
          <Lines x={14} y={12} n={2} w={172} gap={9} fill={MID} />
          <rect x="14" y="40" width="172" height="50" rx="5" fill="#FFFFFF" stroke={DARK} strokeWidth="1.4" />
          <Txt x={22} y={56} size={8} bold>{tt("Which first?", "Was zuerst?")}</Txt>
          <rect x="22" y="64" width="70" height="16" rx="3" fill={LITE} stroke={DARK} />
          <rect x="100" y="64" width="78" height="16" rx="3" fill="#FFFFFF" stroke={MID} />
        </>
      )}
      {kind === "feedback" && (
        <>
          <Txt x={14} y={26} size={14} bold>6 / 10</Txt>
          <Lines x={84} y={14} n={3} w={100} gap={9} fill={MID} />
          <rect x="100" y="70" width="86" height="22" rx="4" fill={DARK} />
          <Txt x={143} y={85} size={9} anchor="middle" fill="#FFFFFF">{tt("Next ▶", "Weiter ▶")}</Txt>
        </>
      )}
      {kind === "label" && (
        <>
          {[tt("Start the quiz", "Quiz starten"), tt("Watch the video", "Video ansehen")].map((b, i) => (
            <g key={b}>
              <rect x={14 + i * 88} y="40" width="82" height="24" rx="4" fill={i === 0 ? DARK : "#FFFFFF"} stroke={DARK} />
              <Txt x={55 + i * 88} y={56} size={7.6} anchor="middle" fill={i === 0 ? "#FFFFFF" : "#333333"}>{b}</Txt>
            </g>
          ))}
        </>
      )}
      {kind === "reward" && (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={28 + i * 36} cy="40" r="13" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          ))}
          <Txt x={100} y={84} size={9} anchor="middle">{tt("+5 · +2 · +5 · +2", "+5 · +2 · +5 · +2")}</Txt>
        </>
      )}
      {kind === "drag" && (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="14" y={14 + i * 28} width="60" height="20" rx="3" fill={LITE} stroke={MID} />
              <rect x="116" y={14 + i * 28} width="70" height="20" rx="3" fill="#FFFFFF" stroke={MID} strokeDasharray="4 3" />
            </g>
          ))}
          <Arrow x1={78} y1={24} x2={112} y2={52} dash="4 3" />
        </>
      )}
      {kind === "theme" && (
        <>
          {["#C0392B", "#2980B9", "#27AE60", "#8E44AD"].map((c, i) => (
            <rect key={c} x={14 + i * 44} y="26" width="38" height="50" rx="4" fill={c} opacity="0.85" />
          ))}
        </>
      )}
      {kind === "chat" && (
        <>
          <rect x="20" y="14" width="110" height="26" rx="8" fill={LITE} stroke={MID} />
          <Txt x={30} y={31} size={8}>{tt("Where is my course?", "Wo ist mein Kurs?")}</Txt>
          <rect x="70" y="50" width="110" height="26" rx="8" fill="#FFFFFF" stroke={DARK} />
          <Txt x={80} y={67} size={8}>{tt("Under “Menu 14”.", "Unter „Menü 14“.")}</Txt>
        </>
      )}
      {kind === "patterns" && (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect x={10 + i * 37} y="22" width="33" height="52" rx="3" fill="#FFFFFF" stroke={MID} />
              <circle cx={26 + i * 37} cy="40" r="6" fill={i === 1 ? DARK : LITE} stroke={DARK} />
              <Lines x={14 + i * 37} y={54} n={2} w={25} gap={7} h={2.6} fill={MID} />
            </g>
          ))}
        </>
      )}
      {kind === "path" && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <circle cx={30 + i * 48} cy="44" r="12" fill={i < 2 ? DARK : "#FFFFFF"} stroke={DARK} strokeWidth="1.6" />
              {i < 3 && <line x1={42 + i * 48} y1="44" x2={66 + i * 48} y2="44" stroke={DARK} strokeWidth="1.6" />}
            </g>
          ))}
          <Txt x={160} y={86} size={8}>{tt("skip ▶", "überspringen ▶")}</Txt>
        </>
      )}
      {kind === "test" && (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={28 + i * 36} cy="34" r="9" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          ))}
          <Arrow x1={100} y1={56} x2={100} y2={78} />
          <Txt x={100} y={98} size={8} anchor="middle">{tt("Where would you look?", "Wo würden Sie suchen?")}</Txt>
        </>
      )}
      {kind === "progress" && (
        <>
          <Txt x={14} y={26} size={9} bold>{tt("Lesson 3 of 8", "Lektion 3 von 8")}</Txt>
          <rect x="14" y="40" width="172" height="10" rx="5" fill={LITE} />
          <rect x="14" y="40" width="64" height="10" rx="5" fill={DARK} />
          <Lines x={14} y={66} n={3} w={172} gap={9} fill={MID} />
        </>
      )}
      {kind === "look" && (
        <>
          <rect x="14" y="14" width="80" height="80" rx="4" fill="#FFFFFF" stroke={MID} />
          <rect x="106" y="14" width="80" height="80" rx="4" fill="#2A2A2A" />
          <Lines x={22} y={26} n={4} w={64} gap={9} fill={MID} />
          <Lines x={114} y={26} n={4} w={64} gap={9} fill="#777777" />
        </>
      )}
    </Thumb>
  );
}
