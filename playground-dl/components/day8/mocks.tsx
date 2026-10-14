"use client";

import { Arrow, DARK, Frame, LINE, LITE, Lines, MID, Marker, Svg, Thumb, Txt } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Real pictures for Day 8 (CLAUDE.md #52): the four StructLearn screens of the task with their numbered markers, LearnLoop's lesson screen with and without its
 * orientation, a course page with everything competing and with one main thing, a button with three kinds of feedback, three typical mistakes as three screens, and a
 * thumbnail for every measure, option and decision. Mock screens use their own neutral greys, plus colour only where the problem needs it (nine colours, three link
 * colours); the site's blue, teal and rust never colour the evidence (#15, #49).
 */

const PAL = ["#C0392B", "#E67E22", "#F1C40F", "#27AE60", "#16A085", "#2980B9", "#8E44AD", "#D35400", "#7F8C8D"];

/* ------------------------------------------------------------------ the Task 1 evidence: four StructLearn screens, eight facts */

export type SlScreen = "home" | "course" | "lesson" | "tools";

export function StructScreen({ kind }: { kind: SlScreen }) {
  const label =
    kind === "home"
      ? tt("StructLearn home and menu: a menu with four levels, the same course under three entries, and Home marked while a course is open", "StructLearn-Startseite und Menü: ein Menü mit vier Ebenen, derselbe Kurs unter drei Einträgen und „Start“ markiert, während ein Kurs offen ist")
      : kind === "course"
        ? tt("StructLearn course page: nine colours, four text sizes, three animated banners and five equal buttons in a row", "StructLearn-Kursseite: neun Farben, vier Textgrößen, drei animierte Banner und fünf gleiche Buttons in einer Reihe")
        : kind === "lesson"
          ? tt("StructLearn end of a lesson: the lesson text ends, there is no Next link, and a Back arrow at the top left", "StructLearn-Ende einer Lektion: Der Lektionstext endet, es gibt keinen Weiter-Link, und links oben einen Zurück-Pfeil")
          : tt("StructLearn quiz, profile and editor side by side: a link in three colours and Submit in three forms", "StructLearn-Quiz, Profil und Editor nebeneinander: ein Link in drei Farben und Absenden in drei Formen");
  return (
    <Svg viewBox="0 0 240 170" label={label}>
      <Frame>
        {kind === "home" && (
          <>
            <rect x="8" y="20" width="76" height="140" fill={LITE} />
            <rect x="10" y="24" width="72" height="13" rx="2" fill={DARK} />
            <Txt x={16} y={34} size={7.5} bold fill="#FFFFFF">{tt("Home", "Start")}</Txt>
            {[
              [tt("Learn", "Lernen"), 46],
              [tt("Library", "Bibliothek"), 90],
              [tt("Archive", "Archiv"), 126],
            ].map(([name, y], i) => (
              <g key={i}>
                <Txt x={14} y={y as number} size={7.5} bold>{name as string}</Txt>
                <Txt x={22} y={(y as number) + 10} size={6.5}>{tt("› Courses", "› Kurse")}</Txt>
                {i === 0 && <Txt x={30} y={(y as number) + 19} size={6.5}>{tt("› Negotiation", "› Verhandeln")}</Txt>}
                {i === 0 && <Txt x={38} y={(y as number) + 28} size={6.5}>{tt("› Lesson 3", "› Lektion 3")}</Txt>}
                {i > 0 && <Txt x={30} y={(y as number) + 19} size={6.5}>{tt("› Negotiation", "› Verhandeln")}</Txt>}
              </g>
            ))}
            <Txt x={96} y={36} size={9.5} bold>{tt("Negotiation basics", "Verhandlungsgrundlagen")}</Txt>
            <Txt x={96} y={48} size={7}>{tt("You are inside this course.", "Sie sind in diesem Kurs.")}</Txt>
            <Lines x={96} y={58} n={5} w={128} gap={7} fill="#B4B4B4" />
            <Marker x={90} y={78} n={1} />
            <Marker x={80} y={30} n={2} />
          </>
        )}
        {kind === "course" && (
          <>
            <Txt x={12} y={30} size={9} bold>{tt("Negotiation basics", "Verhandlungsgrundlagen")}</Txt>
            {PAL.map((c, i) => (
              <rect key={i} x={12 + i * 14} y="34" width="12" height="7" rx="1.5" fill={c} />
            ))}
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={12 + i * 74} y="46" width="68" height="20" rx="2" fill={PAL[(i * 3 + 1) % 9]} />
                <Txt x={46 + i * 74} y={59} size={[6.5, 9, 7.5][i]} anchor="middle" fill="#FFFFFF" bold>{[tt("NEW! Offer", "NEU! Angebot"), tt("Win a badge", "Abzeichen gewinnen"), tt("Webinar today", "Webinar heute")][i]}</Txt>
              </g>
            ))}
            <Txt x={12} y={82} size={11} bold>{tt("Lessons", "Lektionen")}</Txt>
            <Lines x={12} y={88} n={3} w={200} gap={6} fill="#B4B4B4" />
            {[tt("Start", "Start"), tt("Save", "Speichern"), tt("Share", "Teilen"), tt("Report", "Melden"), tt("Delete", "Löschen")].map((b, i) => (
              <g key={b}>
                <rect x={12 + i * 43} y="116" width="39" height="16" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.3" />
                <Txt x={31.5 + i * 43} y={127} size={6.5} anchor="middle">{b}</Txt>
              </g>
            ))}
            <Marker x={226} y={38} n={4} />
            <Marker x={226} y={124} n={5} />
          </>
        )}
        {kind === "lesson" && (
          <>
            <path d="M18 29 l-7 -5 l7 -5 M11 24 h20" fill="none" stroke={DARK} strokeWidth="2" strokeLinecap="round" />
            <Txt x={38} y={28} size={8} bold>{tt("Lesson 3 · The first offer", "Lektion 3 · Das erste Angebot")}</Txt>
            <Lines x={14} y={40} n={9} w={212} gap={8} fill="#B4B4B4" />
            <Txt x={14} y={128} size={7} fill="#6A6A6A">{tt("End of the lesson.", "Ende der Lektion.")}</Txt>
            <rect x="14" y="136" width="212" height="18" rx="3" fill="#FFFFFF" stroke={MID} strokeDasharray="3 3" />
            <Marker x={216} y={145} n={3} />
            <Marker x={10} y={16} n={8} />
          </>
        )}
        {kind === "tools" && (
          <>
            {[
              [tt("Quiz", "Quiz"), "#2563EB", "button"],
              [tt("Profile", "Profil"), "#E67E22", "link"],
              [tt("Editor", "Editor"), "#1A1A1A", "icon"],
            ].map(([name, c, form], i) => (
              <g key={name as string}>
                <rect x={10 + i * 76} y="22" width="70" height="132" rx="3" fill="#FFFFFF" stroke={MID} />
                <Txt x={14 + i * 76} y={33} size={7.5} bold>{name as string}</Txt>
                <Lines x={14 + i * 76} y={40} n={4} w={62} gap={6} fill="#B4B4B4" />
                <Txt x={14 + i * 76} y={78} size={7} fill={c as string}>{tt("Read more about this", "Mehr dazu lesen")}</Txt>
                <line x1={14 + i * 76} x2={64 + i * 76} y1={80} y2={80} stroke={c as string} />
                {form === "button" && <rect x={30 + i * 76} y="118" width="38" height="14" rx="3" fill={DARK} />}
                {form === "button" && <Txt x={49 + i * 76} y={128} size={7} anchor="middle" fill="#FFFFFF">{tt("Submit", "Absenden")}</Txt>}
                {form === "link" && <Txt x={30 + i * 76} y={128} size={7} fill="#7A7A7A">{tt("submit", "absenden")}</Txt>}
                {form === "icon" && <path d={`M${50 + i * 76} 130 l10 -5 l-10 -5 z`} fill={DARK} />}
              </g>
            ))}
            <Marker x={72} y={64} n={6} />
            <Marker x={148} y={114} n={7} />
          </>
        )}
      </Frame>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A1 · LearnLoop's lesson screen with and without its orientation */

export type LessonOn = { path: boolean; marked: boolean; next: boolean };

export function LessonMock({ on }: { on: LessonOn }) {
  return (
    <Svg
      viewBox="0 0 240 170"
      label={tt(
        `A LearnLoop lesson. ${on.path ? "A path reads Learn, Negotiation basics, Lesson 3 of 8." : "There is no path."} ${on.marked ? "The menu marks Learn." : "The menu marks Home."} ${on.next ? "A button reads Next: lesson 4." : "There is no Next button."}`,
        `Eine LearnLoop-Lektion. ${on.path ? "Ein Pfad lautet Lernen, Verhandlungsgrundlagen, Lektion 3 von 8." : "Es gibt keinen Pfad."} ${on.marked ? "Das Menü markiert Lernen." : "Das Menü markiert Start."} ${on.next ? "Ein Button lautet Weiter: Lektion 4." : "Es gibt keinen Weiter-Button."}`,
      )}
    >
      <Frame>
        <rect x="8" y="20" width="58" height="140" fill={LITE} />
        {[
          [tt("Home", "Start"), "home"],
          [tt("Learn", "Lernen"), "learn"],
          [tt("Find", "Finden"), "find"],
          [tt("Progress", "Fortschritt"), "progress"],
        ].map(([name, id], i) => {
          const hot = on.marked ? id === "learn" : id === "home";
          return (
            <g key={id as string}>
              {hot && <rect x="10" y={24 + i * 17} width="54" height="14" rx="2" fill={DARK} />}
              <Txt x={16} y={34 + i * 17} size={7.5} bold={hot} fill={hot ? "#FFFFFF" : "#333333"}>{name as string}</Txt>
            </g>
          );
        })}
        {on.path && <Txt x={74} y={31} size={6.8} fill="#555555">{tt("Learn › Negotiation basics › Lesson 3 of 8", "Lernen › Verhandlungsgrundlagen › Lektion 3 von 8")}</Txt>}
        <Txt x={74} y={on.path ? 46 : 36} size={10} bold>{tt("The first offer", "Das erste Angebot")}</Txt>
        <Lines x={74} y={on.path ? 54 : 44} n={6} w={150} gap={8} fill="#B4B4B4" />
        {on.next && (
          <>
            <rect x="136" y="126" width="88" height="20" rx="4" fill={DARK} />
            <Txt x={180} y={140} size={7.5} anchor="middle" fill="#FFFFFF" bold>{tt("Next: lesson 4", "Weiter: Lektion 4")}</Txt>
          </>
        )}
      </Frame>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A2 · a course page: everything competes, or one main thing */

export function CoursePageMock({ calm }: { calm: boolean }) {
  return (
    <Svg
      viewBox="0 0 240 170"
      label={calm ? tt("A course page with one main button, quiet links and a progress bar", "Eine Kursseite mit einem Hauptbutton, ruhigen Links und einem Fortschrittsbalken") : tt("A course page where seven colours, three banners and five equal buttons compete", "Eine Kursseite, auf der sieben Farben, drei Banner und fünf gleiche Buttons konkurrieren")}
    >
      <Frame>
        <Txt x={12} y={32} size={calm ? 11 : 9} bold>{tt("Negotiation basics", "Verhandlungsgrundlagen")}</Txt>
        {calm ? (
          <>
            <rect x="12" y="40" width="216" height="5" rx="2.5" fill={LITE} />
            <rect x="12" y="40" width="86" height="5" rx="2.5" fill={DARK} />
            <Txt x={12} y={58} size={7} fill="#6A6A6A">{tt("Lesson 3 of 8", "Lektion 3 von 8")}</Txt>
            <Lines x={12} y={68} n={4} w={216} gap={8} fill="#B4B4B4" />
            <rect x="12" y="112" width="110" height="26" rx="5" fill={DARK} />
            <Txt x={67} y={129} size={9.5} anchor="middle" bold fill="#FFFFFF">{tt("Continue: lesson 3", "Weiter: Lektion 3")}</Txt>
            {[tt("Save", "Speichern"), tt("Share", "Teilen"), tt("More", "Mehr")].map((b, i) => (
              <g key={b}>
                <Txt x={140 + i * 32} y={129} size={7}>{b}</Txt>
                <line x1={140 + i * 32} x2={140 + i * 32 + b.length * 4} y1={131} y2={131} stroke={LINE} />
              </g>
            ))}
          </>
        ) : (
          <>
            {PAL.slice(0, 7).map((c, i) => (
              <rect key={i} x={12 + i * 14} y="38" width="12" height="6" rx="1.5" fill={c} />
            ))}
            {[0, 1, 2].map((i) => (
              <rect key={i} x={12 + i * 74} y="50" width="68" height="16" rx="2" fill={PAL[(i * 3 + 1) % 9]} />
            ))}
            <Lines x={12} y={74} n={3} w={216} gap={6} fill="#B4B4B4" />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x={12 + i * 43} y="108" width="39" height="16" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.3" />
            ))}
            <rect x="12" y="132" width="216" height="14" fill={PAL[2]} opacity="0.7" />
          </>
        )}
      </Frame>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A3 · feedback on an action: at once, after a second, or not at all */

export type FeedbackKind = "now" | "wait" | "none";

export function FeedbackMock({ kind }: { kind: FeedbackKind }) {
  return (
    <Svg
      viewBox="0 0 240 110"
      label={
        kind === "now"
          ? tt("A Save button turns into Saved with a tick within a tenth of a second", "Ein Speichern-Button wird innerhalb einer zehntel Sekunde zu Gespeichert mit Haken")
          : kind === "wait"
            ? tt("A Save button shows Saving with a spinner after about a second", "Ein Speichern-Button zeigt nach etwa einer Sekunde Speichern mit einem Kreisel")
            : tt("A Save button that shows nothing for ten seconds, and a hand pressing it again", "Ein Speichern-Button, der zehn Sekunden nichts zeigt, und eine Hand, die ihn nochmals drückt")
      }
    >
      <rect x="1" y="1" width="238" height="108" rx="5" fill="#F6F6F6" stroke={MID} />
      <Txt x={14} y={22} size={8} bold>{tt("Your notes", "Ihre Notizen")}</Txt>
      <Lines x={14} y={30} n={3} w={212} gap={7} fill="#B4B4B4" />
      <rect x="14" y="62" width="92" height="26" rx="5" fill={kind === "none" ? "#FFFFFF" : DARK} stroke={DARK} strokeWidth="1.4" />
      <Txt x={60} y={79} size={9} anchor="middle" bold fill={kind === "none" ? "#333333" : "#FFFFFF"}>
        {kind === "now" ? tt("Saved ✓", "Gespeichert ✓") : kind === "wait" ? tt("Saving…", "Speichern …") : tt("Save", "Speichern")}
      </Txt>
      {kind === "wait" && <circle cx="26" cy="75" r="4" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeDasharray="5 3" />}
      <Txt x={122} y={74} size={7.5} fill="#444444">{kind === "now" ? tt("about 0.1 seconds", "etwa 0,1 Sekunden") : kind === "wait" ? tt("about 1 second", "etwa 1 Sekunde") : tt("10 seconds, and nothing", "10 Sekunden, und nichts")}</Txt>
      <Txt x={122} y={86} size={7.5} fill="#444444">{kind === "now" ? tt("feels instant", "fühlt sich sofort an") : kind === "wait" ? tt("the train of thought holds", "der Gedankengang hält") : tt("the learner presses again", "die Lernende drückt nochmals")}</Txt>
      {kind === "none" && <Arrow x1={60} y1={102} x2={60} y2={91} />}
    </Svg>
  );
}

/* ------------------------------------------------------------------ A4 · three typical mistakes as three screens */

export type MistakeKind = "nav" | "overload" | "consistency";

export function MistakeMock({ kind }: { kind: MistakeKind }) {
  return (
    <Svg
      viewBox="0 0 200 130"
      label={
        kind === "nav"
          ? tt("Unclear navigation: the same course in three menu entries and a menu that marks the wrong place", "Unklare Navigation: derselbe Kurs in drei Menüeinträgen und ein Menü, das die falsche Stelle markiert")
          : kind === "overload"
            ? tt("Visual overload: many colours and several equal buttons", "Visuelle Überladung: viele Farben und mehrere gleiche Buttons")
            : tt("Inconsistent design: the same Submit as a button, a link and an icon", "Inkonsistentes Design: dasselbe Absenden als Button, als Link und als Symbol")
      }
    >
      <rect x="1" y="1" width="198" height="128" rx="5" fill="#F6F6F6" stroke={MID} />
      {kind === "nav" && (
        <>
          {[tt("Learn", "Lernen"), tt("Library", "Bibliothek"), tt("Archive", "Archiv")].map((n, i) => (
            <g key={n}>
              <rect x="12" y={14 + i * 34} width="70" height="26" rx="3" fill="#FFFFFF" stroke={LINE} />
              <Txt x={18} y={25 + i * 34} size={7.5} bold>{n}</Txt>
              <Txt x={18} y={35 + i * 34} size={6.5}>{tt("Negotiation", "Verhandeln")}</Txt>
            </g>
          ))}
          <Txt x={96} y={44} size={7.5} bold>{tt("Where is it?", "Wo ist es?")}</Txt>
          <Arrow x1={92} y1={50} x2={84} y2={30} dash="3 3" />
          <Arrow x1={92} y1={54} x2={84} y2={64} dash="3 3" />
          <Arrow x1={92} y1={58} x2={84} y2={98} dash="3 3" />
        </>
      )}
      {kind === "overload" && (
        <>
          {PAL.slice(0, 7).map((c, i) => (
            <rect key={i} x={12 + (i % 4) * 46} y={14 + Math.floor(i / 4) * 30} width="42" height="24" rx="3" fill={c} />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={12 + i * 46} y="84" width="42" height="16" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.3" />
          ))}
          <Txt x={12} y={116} size={7.5}>{tt("Which one is the main thing?", "Welches ist die Hauptsache?")}</Txt>
        </>
      )}
      {kind === "consistency" && (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={10 + i * 63} y="14" width="58" height="76" rx="3" fill="#FFFFFF" stroke={MID} />
              <Lines x={14 + i * 63} y={22} n={3} w={50} gap={6} fill="#B4B4B4" />
            </g>
          ))}
          <rect x="22" y="70" width="34" height="12" rx="3" fill={DARK} />
          <Txt x={39} y={79} size={6.5} anchor="middle" fill="#FFFFFF">{tt("Submit", "Absenden")}</Txt>
          <Txt x={92} y={79} size={7} fill="#7A7A7A">{tt("submit", "absenden")}</Txt>
          <path d="M160 82 l10 -5 l-10 -5 z" fill={DARK} />
          <Txt x={12} y={108} size={7.5}>{tt("The same action, three looks", "Dieselbe Aktion, drei Erscheinungsbilder")}</Txt>
        </>
      )}
    </Svg>
  );
}

/* ------------------------------------------------------------------ thumbnails of measures, options and decisions */

export type ThumbKind = "ia" | "calm" | "nav" | "cta" | "style" | "deco" | "dark" | "brand" | "search" | "page" | "test" | "tour" | "anim";

export function MeasureThumb({ kind }: { kind: ThumbKind }) {
  const label: Record<ThumbKind, string> = {
    ia: tt("An information architecture: a root with four sections", "Eine Informationsarchitektur: eine Wurzel mit vier Bereichen"),
    calm: tt("A calm page with few colours", "Eine ruhige Seite mit wenigen Farben"),
    nav: tt("A page with a path above and a Next button", "Eine Seite mit Pfad darüber und einem Weiter-Button"),
    cta: tt("A page with one main button", "Eine Seite mit einem Hauptbutton"),
    style: tt("A style guide: one button style for every screen", "Ein Style Guide: ein Buttonstil für jeden Bildschirm"),
    deco: tt("A page crowded with illustrations", "Eine mit Illustrationen überfüllte Seite"),
    dark: tt("A light and a dark colour scheme", "Ein helles und ein dunkles Farbschema"),
    brand: tt("A new logo and name", "Ein neues Logo und ein neuer Name"),
    search: tt("A search bar with suggestions", "Eine Suchleiste mit Vorschlägen"),
    page: tt("A redesigned page with one main action", "Eine neu gestaltete Seite mit einer Hauptaktion"),
    test: tt("A test: five learners find an item", "Ein Test: fünf Lernende finden einen Eintrag"),
    tour: tt("A short guided first visit", "Ein kurzer geführter erster Besuch"),
    anim: tt("Moving elements on a page", "Bewegte Elemente auf einer Seite"),
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
      {kind === "calm" && (
        <>
          <rect x="14" y="12" width="172" height="8" rx="4" fill={DARK} />
          <Lines x={14} y={30} n={4} w={172} gap={9} fill={MID} />
          <rect x="14" y="78" width="70" height="20" rx="4" fill={DARK} />
        </>
      )}
      {kind === "nav" && (
        <>
          <rect x="14" y="10" width="110" height="6" rx="3" fill={MID} />
          <Lines x={14} y={26} n={4} w={172} gap={9} fill={MID} />
          <rect x="110" y="76" width="76" height="22" rx="4" fill={DARK} />
          <Txt x={148} y={90} size={9} anchor="middle" fill="#FFFFFF">{tt("Next ▶", "Weiter ▶")}</Txt>
        </>
      )}
      {kind === "cta" && (
        <>
          <Lines x={14} y={14} n={3} w={172} gap={9} fill={MID} />
          <rect x="14" y="52" width="100" height="26" rx="5" fill={DARK} />
          <Txt x={64} y={69} size={9} anchor="middle" fill="#FFFFFF" bold>{tt("Continue", "Weiter")}</Txt>
          <Txt x={126} y={69} size={8}>{tt("Save · Share", "Speichern · Teilen")}</Txt>
        </>
      )}
      {kind === "style" && (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={14 + i * 62} y="20" width="54" height="46" rx="3" fill="#FFFFFF" stroke={MID} />
              <rect x={22 + i * 62} y="46" width="38" height="12" rx="3" fill={DARK} />
            </g>
          ))}
          <Txt x={100} y={90} size={8} anchor="middle">{tt("one style, every screen", "ein Stil, jeder Bildschirm")}</Txt>
        </>
      )}
      {kind === "deco" && (
        <>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={30 + (i % 3) * 56} cy={32 + Math.floor(i / 3) * 40} r="15" fill={PAL[(i * 2) % 9]} opacity="0.85" />
          ))}
        </>
      )}
      {kind === "dark" && (
        <>
          <rect x="14" y="14" width="80" height="80" rx="4" fill="#FFFFFF" stroke={MID} />
          <rect x="106" y="14" width="80" height="80" rx="4" fill="#2A2A2A" />
          <Lines x={22} y={26} n={4} w={64} gap={9} fill={MID} />
          <Lines x={114} y={26} n={4} w={64} gap={9} fill="#777777" />
        </>
      )}
      {kind === "brand" && (
        <>
          <circle cx="60" cy="54" r="26" fill="#FFFFFF" stroke={DARK} strokeWidth="2" />
          <Txt x={60} y={59} size={14} anchor="middle" bold>?</Txt>
          <Txt x={124} y={58} size={14} bold>NEW</Txt>
        </>
      )}
      {kind === "search" && (
        <>
          <rect x="14" y="14" width="172" height="20" rx="10" fill="#FFFFFF" stroke={DARK} />
          <Txt x={26} y={28} size={8}>{tt("negot…", "verhan…")}</Txt>
          {[0, 1, 2].map((i) => (
            <rect key={i} x="24" y={42 + i * 18} width={110 - i * 14} height="12" rx="3" fill={LITE} />
          ))}
        </>
      )}
      {kind === "page" && (
        <>
          <rect x="14" y="10" width="172" height="8" rx="4" fill={DARK} />
          <Lines x={14} y={26} n={3} w={172} gap={9} fill={MID} />
          <rect x="14" y="62" width="90" height="26" rx="5" fill={DARK} />
          <Txt x={59} y={79} size={9} anchor="middle" bold fill="#FFFFFF">{tt("Continue", "Weiter")}</Txt>
        </>
      )}
      {kind === "test" && (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={28 + i * 36} cy="40" r="9" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          ))}
          <Arrow x1={100} y1={64} x2={100} y2={86} />
          <Txt x={100} y={104} size={8} anchor="middle">{tt("Where would you look?", "Wo würden Sie suchen?")}</Txt>
        </>
      )}
      {kind === "tour" && (
        <>
          <rect x="14" y="14" width="172" height="80" rx="4" fill="#FFFFFF" stroke={MID} />
          <rect x="30" y="30" width="110" height="34" rx="5" fill={LITE} stroke={DARK} />
          <Txt x={85} y={50} size={8} anchor="middle">{tt("Start here ▶", "Hier beginnen ▶")}</Txt>
          <Txt x={150} y={84} size={7}>{tt("skip", "überspringen")}</Txt>
        </>
      )}
      {kind === "anim" && (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={20 + i * 58} y="26" width="46" height="46" rx="6" fill={PAL[(i * 3 + 2) % 9]} opacity="0.85" />
              <path d={`M${20 + i * 58} 84 q12 -8 24 0 t24 0`} fill="none" stroke={DARK} strokeWidth="1.6" />
            </g>
          ))}
        </>
      )}
    </Thumb>
  );
}
