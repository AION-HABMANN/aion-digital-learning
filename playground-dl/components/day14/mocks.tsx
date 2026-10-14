"use client";

import { Arrow, DARK, Frame, LITE, Lines, MID, Marker, Person, Svg, Thumb, Txt } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Real pictures for Day 14 (CLAUDE.md #52): the four ClearLearn screens of the task with their numbered markers, one welcome text in three versions, a page that gains four usability
 * fixes, three ways of testing, an improvement loop, and a thumbnail for every measure, option and decision. Mock screens use their own neutral greys; the site's blue, teal and
 * rust never colour the evidence (#15, #49).
 */

const RED = "#B3382A";

/* ------------------------------------------------------------------ the Task 1 evidence: four ClearLearn screens, eight facts */

export type ClScreen = "text" | "form" | "nav" | "lesson";

export function ClearScreen({ kind }: { kind: ClScreen }) {
  const label =
    kind === "text"
      ? tt("ClearLearn welcome text: one very long sentence full of technical terms", "ClearLearn-Willkommenstext: ein sehr langer Satz voller Fachbegriffe")
      : kind === "form"
        ? tt("ClearLearn assignment form: an upload that can be sent with no file, and an error that reads Error 4012", "ClearLearn-Aufgabenformular: ein Upload, der ohne Datei gesendet werden kann, und ein Fehler mit der Meldung Fehler 4012")
        : kind === "nav"
          ? tt("ClearLearn menu: eleven entries on one level, and one course listed under three headings", "ClearLearn-Menü: elf Einträge auf einer Ebene und ein Kurs unter drei Überschriften")
          : tt("ClearLearn lesson: the same action called Save, Submit and Apply, and a mark-as-done that takes five clicks", "ClearLearn-Lektion: dieselbe Aktion heißt Speichern, Einreichen und Anwenden, und ein Als-erledigt-Markieren braucht fünf Klicks");
  return (
    <Svg viewBox="0 0 240 170" label={label}>
      <Frame>
        {kind === "text" && (
          <>
            <Txt x={12} y={30} size={9} bold>{tt("Welcome to ClearLearn", "Willkommen bei ClearLearn")}</Txt>
            <Lines x={12} y={40} n={7} w={214} gap={8} h={3.2} fill="#8A8A8A" short={0.9} />
            <Txt x={12} y={108} size={6.8}>{tt("… asynchronous modality … learning taxonomy level …", "… asynchrone Modalität … Lerntaxonomiestufe …")}</Txt>
            <Marker x={216} y={52} n={1} />
            <Marker x={216} y={106} n={2} />
          </>
        )}
        {kind === "form" && (
          <>
            <Txt x={12} y={30} size={9} bold>{tt("Submit your assignment", "Reichen Sie Ihre Aufgabe ein")}</Txt>
            <rect x="12" y="38" width="214" height="16" rx="3" fill="#FFFFFF" stroke={MID} strokeDasharray="3 3" />
            <Txt x={18} y={49} size={7} fill="#777777">{tt("Choose a file (optional?)", "Datei wählen (optional?)")}</Txt>
            <rect x="12" y="62" width="60" height="16" rx="3" fill={DARK} />
            <Txt x={42} y={73} size={7.4} anchor="middle" fill="#FFFFFF">{tt("Send", "Senden")}</Txt>
            <rect x="12" y="88" width="214" height="18" rx="3" fill="#FFFFFF" stroke={RED} />
            <Txt x={18} y={100} size={7.4} fill={RED}>{tt("Error 4012: invalid payload", "Fehler 4012: ungültige Payload")}</Txt>
            <Marker x={216} y={46} n={6} />
            <Marker x={216} y={97} n={3} />
          </>
        )}
        {kind === "nav" && (
          <>
            {["Hub", "Resources 2", "Learn", "Library", "Pathways", "Tools", "Community", "More", "Misc", "Zone", "Extras"].map((s, i) => (
              <g key={s}>
                <rect x={12 + (i % 4) * 54} y={26 + Math.floor(i / 4) * 18} width="50" height="14" rx="3" fill={i < 2 ? "#FFFFFF" : LITE} stroke={i < 2 ? DARK : "none"} />
                <Txt x={37 + (i % 4) * 54} y={36 + Math.floor(i / 4) * 18} size={6.4} anchor="middle">{tt(s, i === 1 ? "Ressourcen 2" : s)}</Txt>
              </g>
            ))}
            <Txt x={12} y={98} size={7} bold>{tt("“Negotiation” is under: Learn · Library · Pathways", "„Verhandeln“ steht unter: Lernen · Bibliothek · Lernpfade")}</Txt>
            <Marker x={216} y={34} n={4} />
            <Marker x={216} y={94} n={5} />
          </>
        )}
        {kind === "lesson" && (
          <>
            <Txt x={12} y={30} size={9} bold>{tt("Lesson 3", "Lektion 3")}</Txt>
            {[tt("Save", "Speichern"), tt("Submit", "Einreichen"), tt("Apply", "Anwenden")].map((s, i) => (
              <g key={i}>
                <rect x={12 + i * 72} y="38" width="66" height="16" rx="3" fill={DARK} />
                <Txt x={45 + i * 72} y={49} size={7.4} anchor="middle" fill="#FFFFFF">{s}</Txt>
              </g>
            ))}
            <Txt x={12} y={72} size={7}>{tt("Mark as done: Menu › Lesson › More › Status › Done", "Als erledigt markieren: Menü › Lektion › Mehr › Status › Erledigt")}</Txt>
            {[0, 1, 2, 3, 4].map((i) => (
              <circle key={i} cx={22 + i * 22} cy="90" r="7" fill="#FFFFFF" stroke={DARK} />
            ))}
            <Marker x={216} y={46} n={7} />
            <Marker x={216} y={86} n={8} />
          </>
        )}
      </Frame>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A1 · one welcome text in three versions */

export type TextKind = "original" | "short" | "plain";

export function TextMock({ kind }: { kind: TextKind }) {
  return (
    <Svg
      viewBox="0 0 240 130"
      label={
        kind === "original"
          ? tt("One long sentence with technical terms", "Ein langer Satz mit Fachbegriffen")
          : kind === "short"
            ? tt("Short sentences that still use technical terms", "Kurze Sätze, die noch Fachbegriffe nutzen")
            : tt("Short sentences, everyday words, and one thing to do", "Kurze Sätze, Alltagswörter und eine Sache zu tun")
      }
    >
      <rect x="1" y="1" width="238" height="128" rx="5" fill="#F6F6F6" stroke={MID} />
      <rect x="10" y="10" width="220" height="110" rx="4" fill="#FFFFFF" stroke={DARK} />
      {kind === "original" && (
        <>
          <Lines x={18} y={22} n={7} w={204} gap={9} h={3.4} fill="#8A8A8A" short={0.9} />
          <Txt x={18} y={100} size={6.8} fill="#555555">{tt("asynchronous modality · learning taxonomy level", "asynchrone Modalität · Lerntaxonomiestufe")}</Txt>
          <Txt x={18} y={113} size={6.8} fill="#555555">{tt("(52 words, one sentence)", "(52 Wörter, ein Satz)")}</Txt>
        </>
      )}
      {kind === "short" && (
        <>
          <Txt x={18} y={30} size={7.6}>{tt("Our platform offers asynchronous modality.", "Unsere Plattform bietet asynchrone Modalität.")}</Txt>
          <Txt x={18} y={48} size={7.6}>{tt("Select a learning taxonomy level.", "Wählen Sie eine Lerntaxonomiestufe.")}</Txt>
          <Txt x={18} y={66} size={7.6}>{tt("Then proceed to enrolment.", "Fahren Sie dann mit der Einschreibung fort.")}</Txt>
          <Txt x={18} y={108} size={6.8} fill="#555555">{tt("(short, but the terms are still hard)", "(kurz, aber die Begriffe sind noch schwer)")}</Txt>
        </>
      )}
      {kind === "plain" && (
        <>
          <Txt x={18} y={30} size={9} bold>{tt("Welcome to ClearLearn.", "Willkommen bei ClearLearn.")}</Txt>
          <Txt x={18} y={48} size={7.6}>{tt("Learn when it suits you, in short lessons.", "Lernen Sie, wann es passt, in kurzen Lektionen.")}</Txt>
          <Txt x={18} y={64} size={7.6}>{tt("Pick a course below to start.", "Wählen Sie unten einen Kurs, um zu starten.")}</Txt>
          <rect x="18" y="80" width="86" height="22" rx="4" fill={DARK} />
          <Txt x={61} y={94} size={8} anchor="middle" fill="#FFFFFF">{tt("My first lesson", "Meine erste Lektion")}</Txt>
        </>
      )}
    </Svg>
  );
}

/* ------------------------------------------------------------------ A2 · a page that gains four usability fixes */

export type UsOn = { menu: boolean; efficiency: boolean; errors: boolean; consistency: boolean };

export function UsabilityMock({ on }: { on: UsOn }) {
  const n = [on.menu, on.efficiency, on.errors, on.consistency].filter(Boolean).length;
  return (
    <Svg viewBox="0 0 240 150" label={tt(`A learning page with ${n} of 4 usability fixes switched on: a short clear menu, a quick common action, error prevention and consistent names`, `Eine Lernseite mit ${n} von 4 eingeschalteten Usability-Korrekturen: ein kurzes klares Menü, eine schnelle häufige Aktion, Fehlervermeidung und einheitliche Namen`)}>
      <rect x="1" y="1" width="238" height="148" rx="5" fill="#F6F6F6" stroke={MID} />
      {on.menu ? (
        <g>
          {[tt("Courses", "Kurse"), tt("My path", "Mein Pfad"), tt("Help", "Hilfe")].map((s, i) => (
            <g key={i}>
              <rect x={10 + i * 56} y="10" width="52" height="14" rx="3" fill={DARK} />
              <Txt x={36 + i * 56} y={20} size={7} anchor="middle" fill="#FFFFFF">{s}</Txt>
            </g>
          ))}
        </g>
      ) : (
        <g>
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x={10 + i * 28} y="10" width="25" height="14" rx="2" fill={LITE} />
          ))}
        </g>
      )}
      <Txt x={10} y={44} size={8.5} bold>{tt("Lesson 3 · Pricing", "Lektion 3 · Preisgestaltung")}</Txt>
      <Lines x={10} y={52} n={3} w={150} gap={8} h={3.2} fill="#9A9A9A" short={0.7} />
      <rect x="10" y="84" width="70" height="16" rx="3" fill={DARK} />
      <Txt x={45} y={95} size={7.4} anchor="middle" fill="#FFFFFF">{on.efficiency ? tt("Mark done", "Erledigt") : tt("More ▾", "Mehr ▾")}</Txt>
      {on.consistency ? (
        <>
          <rect x="88" y="84" width="60" height="16" rx="3" fill={DARK} />
          <Txt x={118} y={95} size={7.4} anchor="middle" fill="#FFFFFF">{tt("Save", "Speichern")}</Txt>
        </>
      ) : (
        <>
          <rect x="88" y="84" width="60" height="16" rx="3" fill={DARK} />
          <Txt x={118} y={95} size={7.4} anchor="middle" fill="#FFFFFF">{tt("Apply", "Anwenden")}</Txt>
          <rect x="154" y="84" width="60" height="16" rx="3" fill={DARK} />
          <Txt x={184} y={95} size={7.4} anchor="middle" fill="#FFFFFF">{tt("Submit", "Einreichen")}</Txt>
        </>
      )}
      <rect x="10" y="108" width="204" height="16" rx="3" fill="#FFFFFF" stroke={on.errors ? DARK : RED} />
      <Txt x={16} y={119} size={7} fill={on.errors ? "#333333" : RED}>{on.errors ? tt("Please add a file before you send. (Send is off until then.)", "Bitte fügen Sie vor dem Senden eine Datei hinzu. (Senden ist bis dahin aus.)") : tt("Error 4012: invalid payload", "Fehler 4012: ungültige Payload")}</Txt>
      <Txt x={10} y={142} size={6.6} fill="#555555">{tt(`${n} of 4 fixes on`, `${n} von 4 Korrekturen an`)}</Txt>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A3 · three ways of testing */

export type TestKind = "survey" | "observe" | "group";

export function TestMock({ kind }: { kind: TestKind }) {
  return (
    <Svg
      viewBox="0 0 240 130"
      label={
        kind === "survey"
          ? tt("A survey asks a manager whether the page looks clear, and the answer is yes", "Eine Umfrage fragt eine Führungskraft, ob die Seite klar aussieht, und die Antwort ist ja")
          : kind === "observe"
            ? tt("A tester watches one learner try a task and sees her stop at the menu", "Ein Tester sieht einer Lernenden bei einer Aufgabe zu und sieht, wie sie am Menü hängenbleibt")
            : tt("A tester watches several different learners, and each one stops at a different place", "Ein Tester sieht mehreren verschiedenen Lernenden zu, und jede bleibt an einer anderen Stelle hängen")
      }
    >
      <rect x="1" y="1" width="238" height="128" rx="5" fill="#F6F6F6" stroke={MID} />
      {kind === "survey" && (
        <>
          <Person x={46} y={40} s={1} />
          <rect x="84" y="20" width="140" height="40" rx="4" fill="#FFFFFF" stroke={DARK} />
          <Txt x={92} y={36} size={7.6}>{tt("“Does the page look clear?”", "„Sieht die Seite klar aus?“")}</Txt>
          <Txt x={92} y={52} size={8} bold>{tt("“Yes, it looks fine.”", "„Ja, sieht gut aus.“")}</Txt>
          <Txt x={12} y={108} size={7.4} fill="#555555">{tt("Opinion of someone who knows the platform. Nothing about where learners stop.", "Meinung von jemandem, der die Plattform kennt. Nichts darüber, wo Lernende hängenbleiben.")}</Txt>
        </>
      )}
      {kind === "observe" && (
        <>
          <Person x={46} y={40} s={1} />
          <rect x="84" y="14" width="140" height="70" rx="4" fill="#FFFFFF" stroke={DARK} />
          <rect x="92" y="22" width="60" height="12" rx="2" fill={LITE} />
          <rect x="92" y="40" width="60" height="12" rx="2" fill="#FFFFFF" stroke={DARK} strokeWidth="2.2" strokeDasharray="3 2" />
          <Txt x={160} y={50} size={6.8}>{tt("← stops here", "← bleibt hier hängen")}</Txt>
          <Person x={198} y={96} s={0.55} />
          <Txt x={12} y={108} size={7.4} fill="#555555">{tt("One learner, one task: the team sees one real hurdle.", "Eine Lernende, eine Aufgabe: Das Team sieht eine echte Hürde.")}</Txt>
        </>
      )}
      {kind === "group" && (
        <>
          {[40, 90, 140].map((x, i) => (
            <g key={x}>
              <Person x={x} y={34} s={0.75} />
              <rect x={x - 22} y="62" width="44" height="14" rx="2" fill="#FFFFFF" stroke={DARK} strokeDasharray="3 2" />
              <Txt x={x} y={72} size={6} anchor="middle">{[tt("menu", "Menü"), tt("jargon", "Jargon"), tt("form", "Formular")][i]}</Txt>
            </g>
          ))}
          <Person x={196} y={34} s={0.75} />
          <rect x="174" y="62" width="44" height="14" rx="2" fill="#FFFFFF" stroke={DARK} strokeDasharray="3 2" />
          <Txt x={196} y={72} size={6} anchor="middle">{tt("small text", "kleiner Text")}</Txt>
          <Txt x={12} y={108} size={7.4} fill="#555555">{tt("Different learners, different hurdles: the mix shows the most.", "Verschiedene Lernende, verschiedene Hürden: Die Mischung zeigt am meisten.")}</Txt>
        </>
      )}
    </Svg>
  );
}

/* ------------------------------------------------------------------ A4 · an improvement loop, static */

export function LoopMock() {
  const steps = [tt("Change", "Ändern"), tt("Test", "Testen"), tt("Measure", "Messen"), tt("Adjust", "Anpassen")];
  return (
    <Svg viewBox="0 0 240 120" label={tt("A loop of four steps: change, test, measure, adjust, and back to change", "Ein Kreislauf aus vier Schritten: ändern, testen, messen, anpassen und zurück zu ändern")}>
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={6 + i * 58} y="44" width="52" height="28" rx="5" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          <Txt x={32 + i * 58} y={62} size={8} anchor="middle" bold>{s}</Txt>
          {i < 3 && <Arrow x1={60 + i * 58} y1={58} x2={62 + i * 58} y2={58} />}
        </g>
      ))}
      <path d="M206 74 C206 108 32 108 32 76" fill="none" stroke={DARK} strokeWidth="1.6" strokeDasharray="4 3" />
      <Arrow x1={32} y1={82} x2={32} y2={76} />
      <Txt x={120} y={22} size={8} anchor="middle">{tt("Repeat: testing is a continuous process", "Wiederholen: Testen ist ein kontinuierlicher Prozess")}</Txt>
    </Svg>
  );
}

/* ------------------------------------------------------------------ thumbnails for measures, options and decisions */

export type ThumbKind = "plain" | "structure" | "nav" | "test" | "terms" | "functions" | "visual" | "manual" | "cut" | "training" | "loop" | "help";

export function MeasureThumb({ kind }: { kind: ThumbKind }) {
  const label: Record<ThumbKind, string> = {
    plain: tt("A short sentence in everyday words", "Ein kurzer Satz in Alltagswörtern"),
    structure: tt("The same button name and place on every page", "Derselbe Buttonname und Ort auf jeder Seite"),
    nav: tt("One menu of six entries and a path above the page", "Ein Menü mit sechs Einträgen und ein Pfad über der Seite"),
    test: tt("A tester watching a learner", "Ein Tester, der einer Lernenden zuschaut"),
    terms: tt("A term with a small explanation", "Ein Begriff mit einer kleinen Erklärung"),
    functions: tt("Three new menu entries", "Drei neue Menüeinträge"),
    visual: tt("A new colour palette", "Eine neue Farbpalette"),
    manual: tt("A thick manual", "Ein dickes Handbuch"),
    cut: tt("Half of the lessons crossed out", "Die Hälfte der Lektionen durchgestrichen"),
    training: tt("A workshop with people at a table", "Ein Workshop mit Menschen an einem Tisch"),
    loop: tt("A loop of change, test, measure and adjust", "Ein Kreislauf aus Ändern, Testen, Messen und Anpassen"),
    help: tt("A help centre", "Ein Hilfecenter"),
  };
  return (
    <Thumb label={label[kind]}>
      {kind === "plain" && (
        <>
          <Txt x={100} y={50} size={13} anchor="middle" bold>{tt("Pick a course.", "Wählen Sie einen Kurs.")}</Txt>
          <Txt x={100} y={74} size={9} anchor="middle" fill="#555555">{tt("Start when you like.", "Starten Sie, wann Sie möchten.")}</Txt>
        </>
      )}
      {kind === "structure" && (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="20" y={14 + i * 30} width="160" height="22" rx="3" fill={LITE} />
              <rect x="124" y={18 + i * 30} width="52" height="14" rx="3" fill={DARK} />
              <Txt x={150} y={28 + i * 30} size={7} anchor="middle" fill="#FFFFFF">{tt("Save", "Speichern")}</Txt>
            </g>
          ))}
        </>
      )}
      {kind === "nav" && (
        <>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={14 + i * 29} y="14" width="26" height="14" rx="3" fill={DARK} />
          ))}
          <Txt x={14} y={52} size={7.6}>{tt("Home › Courses › Negotiation", "Start › Kurse › Verhandeln")}</Txt>
          <Lines x={14} y={64} n={3} w={172} gap={10} h={4} fill={MID} />
        </>
      )}
      {kind === "test" && (
        <>
          <Person x={50} y={36} s={0.8} />
          <rect x="82" y="22" width="86" height="54" rx="4" fill="#FFFFFF" stroke={DARK} />
          <Person x={186} y={52} s={0.5} />
        </>
      )}
      {kind === "terms" && (
        <>
          <Txt x={14} y={46} size={10} bold>{tt("asynchronous", "asynchron")}</Txt>
          <rect x="14" y="54" width="130" height="34" rx="4" fill="#FFFFFF" stroke={DARK} />
          <Txt x={20} y={68} size={7.6}>{tt("at any time, not live", "jederzeit, nicht live")}</Txt>
        </>
      )}
      {kind === "functions" && (
        <>
          {[tt("Chat", "Chat"), tt("Forum", "Forum"), tt("Calendar", "Kalender")].map((s, i) => (
            <g key={i}>
              <rect x={14 + i * 58} y="30" width="54" height="28" rx="4" fill="#FFFFFF" stroke={DARK} strokeDasharray="4 3" />
              <Txt x={41 + i * 58} y={48} size={8.6} anchor="middle">{s}</Txt>
            </g>
          ))}
        </>
      )}
      {kind === "visual" && (
        <>
          {["#8A8A8A", "#555555", "#C9C9C9", "#333333"].map((c, i) => (
            <rect key={i} x={20 + i * 40} y="30" width="34" height="50" rx="4" fill={c} />
          ))}
        </>
      )}
      {kind === "manual" && (
        <>
          <rect x="60" y="14" width="80" height="82" rx="4" fill="#FFFFFF" stroke={DARK} strokeWidth="2" />
          <Txt x={100} y={58} size={10} anchor="middle" bold>{tt("Manual", "Handbuch")}</Txt>
          <Txt x={100} y={74} size={8} anchor="middle">{tt("40 pages", "40 Seiten")}</Txt>
        </>
      )}
      {kind === "cut" && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="20" y={14 + i * 22} width="160" height="16" rx="3" fill={LITE} opacity={i % 2 ? 0.4 : 1} />
              {i % 2 === 1 && <line x1="20" y1={22 + i * 22} x2="180" y2={22 + i * 22} stroke={DARK} strokeWidth="1.6" />}
            </g>
          ))}
        </>
      )}
      {kind === "training" && (
        <>
          <rect x="30" y="64" width="140" height="10" rx="3" fill={LITE} stroke={DARK} />
          <Person x={56} y={34} s={0.7} />
          <Person x={100} y={34} s={0.7} />
          <Person x={144} y={34} s={0.7} />
        </>
      )}
      {kind === "loop" && (
        <>
          <path d="M50 70 A40 34 0 1 1 150 70" fill="none" stroke={DARK} strokeWidth="2" />
          <Arrow x1={140} y1={60} x2={150} y2={72} />
          <Txt x={100} y={56} size={8.4} anchor="middle">{tt("test · adjust", "testen · anpassen")}</Txt>
        </>
      )}
      {kind === "help" && (
        <>
          <circle cx="100" cy="50" r="30" fill="#FFFFFF" stroke={DARK} strokeWidth="2" />
          <Txt x={100} y={62} size={30} anchor="middle" bold>?</Txt>
        </>
      )}
    </Thumb>
  );
}
