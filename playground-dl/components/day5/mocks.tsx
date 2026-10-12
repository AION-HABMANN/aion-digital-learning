"use client";

import type { ReactNode } from "react";
import { Arrow, DARK, Frame, LINE, LITE, Lines, MID, MiniPage, Svg, Thumb, Tick, Txt, Marker, Person } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Real pictures for Day 5 (CLAUDE.md #52): the same home screen decided by features and by learner tasks, the same screen with the three mistakes switched on
 * and off, four contexts of use as small scenes, the three kinds of quality of the Kano model, the four LearnBase screens of the task with their numbered
 * markers, and a thumbnail for every measure of the cards and the two tasks. Mock screens use their own neutral greys; the site's blue, teal and rust never
 * colour the evidence (#15, #49).
 */

/* ------------------------------------------------------------------ A1 · a home screen, decided two ways */

export function PlatformHome({ mode }: { mode: "features" | "tasks" }) {
  const label =
    mode === "features"
      ? tt("A home screen whose menu follows the organisation: release notes, object store, community, event analytics, cohort manager", "Ein Startbildschirm, dessen Menü der Organisation folgt: Release Notes, Object Store, Community, Event Analytics, Cohort Manager")
      : tt("A home screen built around learner tasks: continue, my courses, find a course, my progress", "Ein um Aufgaben der Lernenden gebauter Startbildschirm: weitermachen, meine Kurse, Kurs finden, mein Fortschritt");
  const feat = [tt("Release notes", "Release Notes"), tt("Object Store", "Object Store"), tt("Community", "Community"), tt("Event Analytics", "Event Analytics"), tt("Cohort Manager", "Cohort Manager"), tt("Reports", "Berichte")];
  const task = [tt("Continue", "Weitermachen"), tt("My courses", "Meine Kurse"), tt("Find a course", "Kurs finden"), tt("My progress", "Mein Fortschritt")];
  const items = mode === "features" ? feat : task;
  return (
    <Svg viewBox="0 0 300 200" label={label}>
      <Frame w={292} h={192}>
        <rect x="10" y="22" width="86" height="164" rx="3" fill="#F0F0F0" stroke={MID} />
        {items.map((s, i) => (
          <g key={s}>
            <rect x="14" y={28 + i * 24} width="78" height="18" rx="3" fill={mode === "tasks" && i === 0 ? DARK : "#E2E2E2"} />
            <Txt x={19} y={40 + i * 24} size={8} fill={mode === "tasks" && i === 0 ? "#FFFFFF" : "#333333"}>{s}</Txt>
          </g>
        ))}
        {mode === "features" ? (
          <>
            <Txt x={106} y={34} size={9} bold>{tt("Home", "Start")}</Txt>
            {[0, 1, 2].map((i) => (
              <rect key={i} x={106 + i * 62} y={42} width="56" height="38" rx="3" fill="#E2E2E2" stroke={LINE} />
            ))}
            <rect x="106" y="88" width="184" height="16" rx="3" fill="#D0D0D0" stroke={LINE} />
            <Txt x={112} y={99} size={7.5} bold>{tt("RELEASE · New feature: Live Polls", "RELEASE · Neues Feature: Live Polls")}</Txt>
            <Lines x={106} y={116} n={6} w={184} gap={9} fill={MID} />
          </>
        ) : (
          <>
            <Txt x={106} y={34} size={9} bold>{tt("Welcome back, Noor", "Willkommen zurück, Noor")}</Txt>
            <rect x="106" y="42" width="184" height="56" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
            <Txt x={114} y={58} size={8.5} bold>{tt("Resume your lesson", "Lektion fortsetzen")}</Txt>
            <Txt x={114} y={72} size={8}>{tt("Negotiation basics · unit 3", "Verhandlungsgrundlagen · Einheit 3")}</Txt>
            <rect x="114" y="80" width="120" height="7" rx="3.5" fill={LITE} stroke={LINE} />
            <rect x="114" y="80" width="48" height="7" rx="3.5" fill={DARK} />
            <rect x="244" y="76" width="40" height="16" rx="4" fill={DARK} />
            <Txt x={264} y={87} size={8} anchor="middle" fill="#FFFFFF">{tt("Go", "Los")}</Txt>
            {[0, 1].map((i) => (
              <g key={i}>
                <rect x={106 + i * 94} y={108} width="90" height="34" rx="3" fill="#F4F4F4" stroke={MID} />
                <Txt x={112 + i * 94} y={129} size={8}>{[tt("Find a course", "Kurs finden"), tt("My progress", "Mein Fortschritt")][i]}</Txt>
              </g>
            ))}
          </>
        )}
      </Frame>
    </Svg>
  );
}

/** The three kinds of quality of the Kano model as three curves: must-be, one-dimensional, attractive. */
export function KanoChart() {
  return (
    <Svg
      viewBox="0 0 340 250"
      label={tt("The Kano model: three curves of satisfaction against how well a quality is delivered", "Das Kano-Modell: drei Kurven der Zufriedenheit gegen die Qualität, mit der etwas geliefert wird")}
      desc={tt("A must-be quality stays flat and unnoticed when delivered and drops sharply when missing; a one-dimensional quality rises in proportion; an attractive quality is not missed when absent and delights when present.", "Eine Muss-Qualität bleibt unbemerkt, wenn sie geliefert wird, und fällt stark ab, wenn sie fehlt; eine eindimensionale Qualität steigt proportional; eine Begeisterungsqualität wird nicht vermisst, wenn sie fehlt, und begeistert, wenn sie da ist.")}
      className="mx-auto h-auto w-full max-w-[440px]"
    >
      <rect x="40" y="14" width="284" height="190" fill="#FFFFFF" stroke="#556274" strokeWidth="1.5" />
      <line x1="40" y1="109" x2="324" y2="109" stroke="#8793A3" strokeDasharray="4 4" />
      <path d="M44 196 C 110 150, 170 120, 320 112" fill="none" stroke="#17212E" strokeWidth="2.6" />
      <line x1="44" y1="196" x2="320" y2="26" stroke="#556274" strokeWidth="2.4" strokeDasharray="7 4" />
      <path d="M44 120 C 150 118, 220 96, 320 24" fill="none" stroke="#17212E" strokeWidth="2.6" strokeDasharray="2 5" />
      <Txt x={316} y={103} size={11} bold anchor="end" fill="#17212E">{tt("Must-be: finding my course", "Muss: meinen Kurs finden")}</Txt>
      <Txt x={206} y={158} size={11} bold fill="#556274">{tt("One-dimensional: faster is better", "Eindimensional: schneller ist besser")}</Txt>
      <Txt x={48} y={110} size={11} bold fill="#17212E">{tt("Attractive: a pleasant surprise", "Begeisterung: eine angenehme Überraschung")}</Txt>
      <Txt x={182} y={226} size={11} bold anchor="middle" fill="#17212E">{tt("How well the quality is delivered →", "Wie gut die Qualität geliefert wird →")}</Txt>
      <text x="14" y="109" textAnchor="middle" fontSize="11" fontWeight="700" fill="#17212E" fontFamily="system-ui,sans-serif" transform="rotate(-90 14 109)">{tt("Satisfaction →", "Zufriedenheit →")}</text>
      <Txt x={44} y={220} size={10} fill="#556274">{tt("missing", "fehlt")}</Txt>
      <Txt x={320} y={220} size={10} anchor="end" fill="#556274">{tt("delivered", "geliefert")}</Txt>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A3 · Mia's home screen with the three mistakes switched on or off */

export type Mistakes3 = { functions: boolean; complex: boolean; orientation: boolean };

export function MistakeScreen({ on }: { on: Mistakes3 }) {
  const label = tt(
    `Mia's home screen with ${[on.functions && "menu entries named after the software", on.complex && "many menus, widgets and banners at once", on.orientation && "no sign of where she is or what to do next"].filter(Boolean).join(", ") || "none of the three mistakes"}`,
    `Mias Startbildschirm mit ${[on.functions && "nach der Software benannten Menüeinträgen", on.complex && "vielen Menüs, Widgets und Bannern auf einmal", on.orientation && "keinem Zeichen, wo sie ist oder was als Nächstes kommt"].filter(Boolean).join(", ") || "keinem der drei Fehler"}`,
  );
  const sw = [tt("Object Store", "Object Store"), tt("Cohort Engine", "Cohort Engine"), tt("Event Analytics", "Event Analytics"), tt("Enrolment Console", "Einschreibekonsole"), tt("Asset Library", "Asset-Bibliothek"), tt("Admin Hub", "Admin-Hub"), tt("Poll Widgets", "Poll-Widgets"), tt("Reports", "Berichte"), tt("Settings", "Einstellungen"), tt("Tools", "Werkzeuge")];
  const tk = [tt("My courses", "Meine Kurse"), tt("Find a course", "Kurs finden"), tt("My progress", "Mein Fortschritt"), tt("Help", "Hilfe"), tt("Certificates", "Zertifikate"), tt("Calendar", "Kalender"), tt("Messages", "Nachrichten"), tt("Profile", "Profil"), tt("Search", "Suche"), tt("Notes", "Notizen")];
  const names = on.functions ? sw : tk;
  const n = on.complex ? 10 : 3;
  return (
    <Svg viewBox="0 0 300 220" label={label}>
      <Frame w={292} h={212}>
        <rect x="10" y="22" width="88" height="188" rx="3" fill="#F0F0F0" stroke={MID} />
        {names.slice(0, n).map((s, i) => (
          <g key={s}>
            <rect x="14" y={26 + i * (on.complex ? 18 : 28)} width="80" height={on.complex ? 15 : 22} rx="3" fill="#E2E2E2" />
            <Txt x={18} y={(on.complex ? 37 : 41) + i * (on.complex ? 18 : 28)} size={on.complex ? 6.8 : 8}>{s}</Txt>
          </g>
        ))}
        <Txt x={106} y={30} size={7.5} fill="#666666">{on.orientation ? tt("Library > Library", "Bibliothek > Bibliothek") : tt("Home > My courses > Negotiation", "Start > Meine Kurse > Verhandeln")}</Txt>
        <Txt x={106} y={46} size={11} bold>{on.orientation ? tt("Library", "Bibliothek") : tt("Negotiation basics", "Verhandlungsgrundlagen")}</Txt>
        {on.complex && (
          <>
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={106} y={52 + i * 14} width="182" height="11" rx="2" fill={i % 2 ? "#D0D0D0" : "#BDBDBD"} />
            ))}
            {[0, 1, 2].map((i) => (
              <rect key={i} x={106 + i * 62} y={112} width="56" height="40" rx="3" fill="#E2E2E2" stroke={LINE} />
            ))}
            {[0, 1, 2].map((i) => (
              <rect key={i} x={106 + i * 62} y={158} width="56" height="46" rx="3" fill="#F4F4F4" stroke={LINE} />
            ))}
          </>
        )}
        {!on.complex &&
          (on.orientation ? (
            <>
              <rect x="106" y="56" width="182" height="52" rx="4" fill="#F4F4F4" stroke={MID} />
              <Lines x={114} y={66} n={4} w={166} gap={10} fill={MID} />
            </>
          ) : (
            <>
              <rect x="106" y="56" width="182" height="54" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
              <Txt x={114} y={72} size={8.5} bold>{tt("Resume your lesson", "Lektion fortsetzen")}</Txt>
              <Txt x={114} y={86} size={8}>{tt("Unit 3 of 8 · 12 minutes left", "Einheit 3 von 8 · noch 12 Minuten")}</Txt>
              <rect x="114" y="94" width="110" height="7" rx="3.5" fill={LITE} stroke={LINE} />
              <rect x="114" y="94" width="42" height="7" rx="3.5" fill={DARK} />
              <rect x="238" y="88" width="42" height="16" rx="4" fill={DARK} />
              <Txt x={259} y={99} size={8} anchor="middle" fill="#FFFFFF">{tt("Go", "Los")}</Txt>
            </>
          ))}
        {!on.complex && (
          <>
            <rect x="106" y="120" width="86" height="40" rx="3" fill="#F4F4F4" stroke={MID} />
            <Txt x={112} y={144} size={8}>{tt("Find a course", "Kurs finden")}</Txt>
            <rect x="202" y="120" width="86" height="40" rx="3" fill="#F4F4F4" stroke={MID} />
            <Txt x={208} y={144} size={8}>{tt("My progress", "Mein Fortschritt")}</Txt>
          </>
        )}
      </Frame>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A2 · four contexts of use, as small scenes */

export type ContextKind = "train" | "desk" | "weekend" | "mandatory";

export function ContextScene({ kind }: { kind: ContextKind }) {
  const label =
    kind === "train"
      ? tt("A person on a train holding a phone", "Eine Person im Zug mit einem Handy in der Hand")
      : kind === "desk"
        ? tt("A desk with a laptop and a clock showing ten minutes between two meetings", "Ein Schreibtisch mit Laptop und einer Uhr, die zehn Minuten zwischen zwei Terminen zeigt")
        : kind === "weekend"
          ? tt("A person at a laptop for a whole weekend, with a calendar of two days", "Eine Person am Laptop für ein ganzes Wochenende, mit einem Kalender von zwei Tagen")
          : tt("A mandatory course with a deadline on a calendar", "Ein verpflichtender Kurs mit einer Frist auf einem Kalender");
  return (
    <Thumb label={label}>
      {kind === "train" && (
        <>
          <rect x="10" y="64" width="180" height="30" rx="4" fill="#E2E2E2" stroke={LINE} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={20 + i * 42} y={50} width="26" height="16" rx="3" fill="#FFFFFF" stroke={LINE} />
          ))}
          <Person x={72} y={40} s={0.8} />
          <rect x="86" y="46" width="18" height="30" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.8" />
          <rect x="89" y="50" width="12" height="3" rx="1.5" fill={MID} />
          <circle cx="40" cy="98" r="6" fill="#FFFFFF" stroke={DARK} strokeWidth="1.5" />
          <circle cx="160" cy="98" r="6" fill="#FFFFFF" stroke={DARK} strokeWidth="1.5" />
        </>
      )}
      {kind === "desk" && (
        <>
          <rect x="20" y="70" width="110" height="6" rx="2" fill={DARK} />
          <rect x="40" y="40" width="64" height="30" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <Lines x={46} y={48} n={3} w={50} fill={MID} gap={7} />
          <circle cx="160" cy="44" r="24" fill="#FFFFFF" stroke={DARK} strokeWidth="2" />
          <path d="M160 44 v-14 M160 44 l9 6" stroke={DARK} strokeWidth="2" strokeLinecap="round" fill="none" />
          <Txt x={160} y={86} size={9} bold anchor="middle">{tt("10 min", "10 Min.")}</Txt>
        </>
      )}
      {kind === "weekend" && (
        <>
          <rect x="16" y="22" width="76" height="60" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <rect x="16" y="22" width="76" height="14" rx="4" fill={LITE} stroke={DARK} />
          <Txt x={32} y={33} size={8} bold>{tt("Sat", "Sa")}</Txt>
          <Txt x={64} y={33} size={8} bold>{tt("Sun", "So")}</Txt>
          <rect x="22" y="42" width="30" height="34" rx="3" fill="#E2E2E2" />
          <rect x="56" y="42" width="30" height="34" rx="3" fill="#E2E2E2" />
          <rect x="112" y="46" width="70" height="40" rx="3" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <Lines x={118} y={54} n={4} w={58} fill={MID} gap={7} />
          <rect x="104" y="88" width="86" height="5" rx="2" fill={DARK} />
        </>
      )}
      {kind === "mandatory" && (
        <>
          <rect x="16" y="18" width="84" height="76" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <rect x="16" y="18" width="84" height="14" rx="4" fill={LITE} stroke={DARK} />
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x={22 + (i % 4) * 19} y={38 + Math.floor(i / 4) * 17} width="14" height="12" rx="2" fill={i === 9 ? DARK : "#F0F0F0"} />
          ))}
          <rect x="116" y="30" width="70" height="40" rx="4" fill="#F4F4F4" stroke={DARK} />
          <Txt x={151} y={46} size={8.5} bold anchor="middle">{tt("Mandatory", "Pflicht")}</Txt>
          <Txt x={151} y={60} size={8} anchor="middle">{tt("Deadline: Friday", "Frist: Freitag")}</Txt>
        </>
      )}
    </Thumb>
  );
}

/* ------------------------------------------------------------------ the Task 1 evidence: four LearnBase screens, eight facts */

export type LbScreen = "home" | "course" | "search" | "lists";

export function LearnBaseScreen({ kind }: { kind: LbScreen }) {
  const label =
    kind === "home"
      ? tt("LearnBase home: a long menu, widgets and banners, a social feed, and no continue entry", "LearnBase-Startseite: ein langes Menü, Widgets und Banner, ein Social Feed und kein Weiter-Eintrag")
      : kind === "course"
        ? tt("LearnBase course page: a button that reads Enrol in module instance, and a path that reads Home > Home", "LearnBase-Kursseite: ein Button „In Modulinstanz einschreiben“ und ein Pfad „Start > Start“")
        : kind === "search"
          ? tt("LearnBase course search: fourteen filter fields above an empty result area", "LearnBase-Kurssuche: vierzehn Filterfelder über einem leeren Ergebnisbereich")
          : tt("LearnBase: the same lesson in three lists, Library, Catalogue and My Learning, in three orders", "LearnBase: dieselbe Lektion in drei Listen, Bibliothek, Katalog und Mein Lernen, in drei Reihenfolgen");
  return (
    <Svg viewBox="0 0 240 170" label={label}>
      <Frame>
        {kind === "home" && (
          <>
            <rect x="10" y="22" width="62" height="140" rx="3" fill="#F0F0F0" stroke={MID} />
            {[tt("Content Repository", "Content Repository"), tt("Module Manager", "Module Manager"), tt("Analytics Suite", "Analytics Suite")].map((s, i) => (
              <g key={s}>
                <rect x="13" y={26 + i * 12} width="56" height="9" rx="2" fill="#E2E2E2" />
                <Txt x={15} y={33 + i * 12} size={5.6}>{s}</Txt>
              </g>
            ))}
            {Array.from({ length: 19 }, (_, i) => (
              <rect key={i} x="13" y={26 + (i + 3) * 6.2} width="56" height="4.5" rx="1.5" fill="#E2E2E2" />
            ))}
            {[0, 1, 2].map((i) => (
              <rect key={i} x={78 + i * 53} y={24} width="48" height="12" rx="2" fill="#D0D0D0" />
            ))}
            {Array.from({ length: 9 }, (_, i) => (
              <rect key={i} x={78 + (i % 3) * 53} y={42 + Math.floor(i / 3) * 24} width="48" height="20" rx="3" fill="#E2E2E2" stroke={LINE} />
            ))}
            <rect x="78" y="116" width="156" height="14" rx="3" fill="#F4F4F4" stroke={MID} />
            <Txt x={82} y={126} size={6.5}>{tt("Learning Social Feed", "Learning Social Feed")}</Txt>
            <Marker x={78} y={32} n={1} />
            <Marker x={226} y={56} n={3} />
            <Marker x={226} y={142} n={6} />
            <Marker x={216} y={123} n={7} />
          </>
        )}
        {kind === "course" && (
          <>
            <Txt x={14} y={30} size={7.5} fill="#666666">{tt("Home > Home", "Start > Start")}</Txt>
            <Txt x={14} y={48} size={11} bold>{tt("Home", "Start")}</Txt>
            <Lines x={14} y={60} n={7} w={212} gap={8} fill={MID} />
            <rect x="60" y="130" width="120" height="20" rx="4" fill={DARK} />
            <Txt x={120} y={143} size={8.5} anchor="middle" fill="#FFFFFF">{tt("Enrol in module instance", "In Modulinstanz einschreiben")}</Txt>
            <Marker x={216} y={30} n={8} />
            <Marker x={188} y={140} n={2} />
          </>
        )}
        {kind === "search" && (
          <>
            <Txt x={14} y={30} size={10} bold>{tt("Find a course", "Kurs finden")}</Txt>
            {Array.from({ length: 14 }, (_, i) => (
              <rect key={i} x={14 + (i % 2) * 108} y={38 + Math.floor(i / 2) * 15} width="100" height="11" rx="2" fill="#FFFFFF" stroke={LINE} />
            ))}
            <rect x="14" y="146" width="212" height="14" rx="3" fill="#F4F4F4" stroke={MID} strokeDasharray="4 3" />
            <Txt x={120} y={156} size={7} anchor="middle" fill="#888888">{tt("results appear here", "Ergebnisse erscheinen hier")}</Txt>
            <Marker x={216} y={64} n={4} />
          </>
        )}
        {kind === "lists" && (
          <>
            {[tt("Library", "Bibliothek"), tt("Catalogue", "Katalog"), tt("My Learning", "Mein Lernen")].map((s, i) => (
              <g key={s}>
                <rect x={10 + i * 76} y={24} width="70" height="136" rx="3" fill="#F4F4F4" stroke={MID} />
                <Txt x={15 + i * 76} y={36} size={7.5} bold>{s}</Txt>
                {[0, 1, 2, 3, 4].map((j) => {
                  const pos = [[2, 0, 4], [0, 3, 1], [4, 1, 2]][i][j] ?? j;
                  return <rect key={j} x={14 + i * 76} y={42 + pos * 22} width="62" height="16" rx="2" fill={j === 1 ? DARK : "#E2E2E2"} />;
                })}
              </g>
            ))}
            <Marker x={118} y={150} n={5} />
          </>
        )}
      </Frame>
    </Svg>
  );
}

/* ------------------------------------------------------------------ thumbnails for the measures of the cards and the two tasks */

export type MeasureKind = "nav" | "simplify" | "core" | "structure" | "language" | "features" | "courses" | "campaign" | "research" | "audit" | "approval" | "chat" | "menuTasks";

export function MeasureThumb({ kind }: { kind: MeasureKind }): ReactNode {
  const labels: Record<MeasureKind, string> = {
    nav: tt("A menu rebuilt around learner tasks", "Ein um Aufgaben der Lernenden gebautes Menü"),
    simplify: tt("A calm home screen with unused features removed", "Ein ruhiger Startbildschirm ohne ungenutzte Features"),
    core: tt("A home screen with one main action and two secondary tasks", "Ein Startbildschirm mit einer Hauptaktion und zwei Nebenaufgaben"),
    structure: tt("One content list with groups and one place per lesson", "Eine Inhaltsliste mit Gruppen und einem Ort pro Lektion"),
    language: tt("A button renamed from system words to learner words", "Ein Button, von Systemworten auf Worte der Lernenden umbenannt"),
    features: tt("Six new features added to the menu", "Sechs neue Features im Menü ergänzt"),
    courses: tt("A catalogue grown by twenty courses", "Ein um zwanzig Kurse gewachsener Katalog"),
    campaign: tt("Banners and emails advertising existing features", "Banner und E-Mails, die bestehende Features bewerben"),
    research: tt("A learner interview and a usability test", "Ein Lernenden-Interview und ein Usability-Test"),
    audit: tt("A list of features with the least-used ones crossed out", "Eine Liste von Features, die am wenigsten genutzten durchgestrichen"),
    approval: tt("A gate a feature request must pass: user problem, metric, owner", "Ein Tor, das eine Feature-Anfrage passieren muss: Nutzerproblem, Kennzahl, Verantwortlicher"),
    chat: tt("A chat window added to the screen", "Ein zum Bildschirm hinzugefügtes Chat-Fenster"),
    menuTasks: tt("A menu with three tasks: My courses, Find a course, My progress", "Ein Menü mit drei Aufgaben: Meine Kurse, Kurs finden, Mein Fortschritt"),
  };
  return (
    <Thumb label={labels[kind]}>
      {(kind === "nav" || kind === "menuTasks") && (
        <>
          <rect x="14" y="12" width="64" height="86" rx="3" fill="#F0F0F0" stroke={MID} />
          {[tt("My courses", "Meine Kurse"), tt("Find a course", "Kurs finden"), tt("My progress", "Mein Fortschritt")].map((s, i) => (
            <g key={s}>
              <rect x="18" y={18 + i * 24} width="56" height="18" rx="3" fill={i === 0 ? DARK : "#E2E2E2"} />
              <Txt x={22} y={30 + i * 24} size={7.5} fill={i === 0 ? "#FFFFFF" : "#333333"}>{s}</Txt>
            </g>
          ))}
          <MiniPage x={92} y={12} w={94} h={86} n={7} />
        </>
      )}
      {kind === "simplify" && (
        <>
          <rect x="14" y="12" width="172" height="86" rx="3" fill="#FFFFFF" stroke={LINE} />
          <rect x="24" y="22" width="152" height="40" rx="4" fill="#F4F4F4" stroke={MID} />
          <Lines x={32} y={32} n={3} w={136} gap={9} fill={MID} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={24 + i * 52} y={70} width="46" height="20" rx="3" fill="#FAFAFA" stroke={MID} strokeDasharray="4 3" />
          ))}
        </>
      )}
      {kind === "core" && (
        <>
          <rect x="14" y="12" width="172" height="50" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="1.8" />
          <Txt x={24} y={32} size={9} bold>{tt("Continue where you stopped", "Dort weitermachen, wo Sie aufgehört haben")}</Txt>
          <rect x="24" y="40" width="100" height="7" rx="3.5" fill={LITE} stroke={LINE} />
          <rect x="24" y="40" width="40" height="7" rx="3.5" fill={DARK} />
          {[0, 1].map((i) => (
            <rect key={i} x={14 + i * 90} y={70} width="82" height="28" rx="3" fill="#F4F4F4" stroke={MID} />
          ))}
        </>
      )}
      {kind === "structure" && (
        <>
          {[0, 1].map((g) => (
            <g key={g}>
              <rect x="16" y={14 + g * 44} width="168" height="14" rx="3" fill={DARK} />
              {[0, 1].map((i) => (
                <rect key={i} x={26} y={32 + g * 44 + i * 5 - i * 0} width={150 - i * 20} height="4" rx="2" fill={MID} />
              ))}
            </g>
          ))}
          <Txt x={100} y={104} size={8} anchor="middle" fill="#555555">{tt("one place per lesson", "ein Ort pro Lektion")}</Txt>
        </>
      )}
      {kind === "language" && (
        <>
          <rect x="14" y="14" width="172" height="22" rx="4" fill="#E2E2E2" stroke={LINE} />
          <Txt x={100} y={29} size={8.5} anchor="middle" fill="#888888">{tt("Enrol in module instance", "In Modulinstanz einschreiben")}</Txt>
          <Arrow x1={100} y1={42} x2={100} y2={56} />
          <rect x="44" y="62" width="112" height="26" rx="4" fill={DARK} />
          <Txt x={100} y={79} size={10} bold anchor="middle" fill="#FFFFFF">{tt("Start course", "Kurs starten")}</Txt>
        </>
      )}
      {kind === "features" && (
        <>
          {Array.from({ length: 6 }, (_, i) => (
            <g key={i}>
              <rect x={14 + (i % 3) * 58} y={14 + Math.floor(i / 3) * 44} width="52" height="38" rx="4" fill="#E2E2E2" stroke={LINE} />
              <circle cx={40 + (i % 3) * 58} cy={33 + Math.floor(i / 3) * 44} r="8" fill="#FFFFFF" stroke={DARK} strokeWidth="1.4" />
              <Txt x={40 + (i % 3) * 58} y={36 + Math.floor(i / 3) * 44} size={8} bold anchor="middle">+</Txt>
            </g>
          ))}
        </>
      )}
      {kind === "courses" && (
        <>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={20 + i * 10} y={14 + i * 10} width="86" height="36" rx="3" fill="#FFFFFF" stroke={LINE} />
          ))}
          <Txt x={152} y={64} size={20} bold anchor="middle">+20</Txt>
          <Txt x={152} y={80} size={8} anchor="middle">{tt("courses", "Kurse")}</Txt>
        </>
      )}
      {kind === "campaign" && (
        <>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={14} y={14 + i * 30} width="172" height="24" rx="3" fill={["#D0D0D0", "#BDBDBD", "#E2E2E2"][i]} stroke={LINE} />
          ))}
          <Txt x={22} y={30} size={8.5} bold>{tt("NEW! Try our features", "NEU! Probieren Sie unsere Features")}</Txt>
          <Txt x={22} y={60} size={8.5} bold>{tt("Did you know …?", "Wussten Sie schon …?")}</Txt>
        </>
      )}
      {kind === "research" && (
        <>
          <Person x={30} y={36} />
          <rect x="50" y="22" width="62" height="22" rx="9" fill="#FFFFFF" stroke={LINE} />
          <Txt x={81} y={36} size={7.5} anchor="middle">{tt("Where do you click?", "Wo klicken Sie?")}</Txt>
          <MiniPage x={124} y={20} w={60} h={50} n={4} />
          <Tick x={176} y={64} r={5} />
          <Txt x={100} y={92} size={8} anchor="middle" fill="#555555">{tt("interview + usability test", "Interview + Usability-Test")}</Txt>
        </>
      )}
      {kind === "audit" && (
        <>
          {[tt("Home", "Start"), tt("Courses", "Kurse"), tt("Social feed · 2%", "Social Feed · 2 %"), tt("Progress", "Fortschritt"), tt("Widgets · 1%", "Widgets · 1 %")].map((s, i) => (
            <g key={s}>
              <rect x="20" y={12 + i * 18} width="160" height="14" rx="3" fill={i === 2 || i === 4 ? "#FAFAFA" : "#F0F0F0"} stroke={MID} />
              <Txt x={26} y={22 + i * 18} size={7.5} fill={i === 2 || i === 4 ? "#999999" : "#333333"}>{s}</Txt>
              {(i === 2 || i === 4) && <line x1="24" y1={19 + i * 18} x2="176" y2={19 + i * 18} stroke={DARK} strokeWidth="1.4" />}
            </g>
          ))}
        </>
      )}
      {kind === "approval" && (
        <>
          <rect x="14" y="36" width="44" height="30" rx="4" fill="#FFFFFF" stroke={LINE} />
          <Txt x={36} y={55} size={7.5} anchor="middle">{tt("request", "Anfrage")}</Txt>
          <Arrow x1={60} y1={51} x2={78} y2={51} />
          <rect x="82" y="14" width="40" height="74" rx="3" fill="#F0F0F0" stroke={DARK} strokeWidth="1.8" />
          {[tt("problem", "Problem"), tt("metric", "Kennzahl"), tt("owner", "Owner")].map((s, i) => (
            <g key={s}>
              <Tick x={92} y={30 + i * 22} r={5} />
              <Txt x={100} y={33 + i * 22} size={6.5}>{s}</Txt>
            </g>
          ))}
          <Arrow x1={126} y1={51} x2={144} y2={51} />
          <rect x="148" y="36" width="42" height="30" rx="4" fill={DARK} />
          <Txt x={169} y={55} size={7.5} anchor="middle" fill="#FFFFFF">{tt("roadmap", "Roadmap")}</Txt>
        </>
      )}
      {kind === "chat" && (
        <>
          <MiniPage x={14} y={12} w={110} h={86} n={7} />
          <rect x="132" y="38" width="56" height="58" rx="5" fill="#E2E2E2" stroke={LINE} />
          <rect x="132" y="38" width="56" height="11" rx="5" fill={MID} />
          <Txt x={136} y={46} size={7} bold>Chat</Txt>
          <rect x="136" y="54" width="34" height="11" rx="5" fill="#FFFFFF" stroke={LINE} />
          <rect x="148" y="70" width="34" height="11" rx="5" fill="#9A9A9A" />
        </>
      )}
    </Thumb>
  );
}
