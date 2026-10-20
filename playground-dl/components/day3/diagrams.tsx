"use client";

import { useState } from "react";
import clsx from "clsx";
import { OptionGrid } from "@/components/day1/diagrams";
import type { GridRow } from "@/components/day1/diagrams";
import { DecisionFrameFig, MatrixFig } from "@/components/materi/figures";
import { LevelsPicture, LoadPages, MemoryPicture, ThreeIdeas, TwoLensesPicture } from "@/components/day3/mocks";
import type { MatrixPoint } from "@/components/materi/figures";
import { Diagram, Insight, ThePoint } from "@/components/materi/kit";
import { Gloss } from "@/lib/glossify";
import { tt } from "@/lib/lang";

/**
 * Day 3 · the teaching diagrams. Static ones (the memory flow, the levels of learning, the chain of effectiveness, the decision frame) need no story; the
 * interactive ones (the three loads, chunking, the LearnLoop weighing grid, the load-against-depth matrix) carry "The point" and an
 * always-visible "What this shows" (CLAUDE.md #20, #36, #51). Example companies: LearnLoop (an online-course provider); never EduCore, so no task is answered here.
 */

/* ------------------------------------------------------------------ A1 · how people learn (static) */

export function MemoryFlow() {
  return <MemoryPicture />;
}

export function LearningLevels() {
  return <LevelsPicture />;
}

/* ------------------------------------------------------------------ A2 · the three loads in one learner's working memory (interactive) */

type LoadMode = "over" | "redesigned";
const LOAD = { over: { intrinsic: 38, extraneous: 52, germane: 10 }, redesigned: { intrinsic: 38, extraneous: 12, germane: 50 } } as const;

export function ThreeLoads() {
  const [mode, setMode] = useState<LoadMode>("over");
  const v = LOAD[mode];
  const part = (cls: string, label: string, pct: number) => (
    <div className={clsx("flex min-h-[3.5rem] items-center justify-center border-r-2 border-paper px-1 text-center text-caption font-bold text-paper", cls)} style={{ width: `${pct}%` }}>
      <span className="break-words">{pct >= 20 ? `${label} ${pct}%` : `${pct}%`}</span>
    </div>
  );
  return (
    <Diagram label={tt("The three loads in one learner's working memory · Exploratory", "Die drei Belastungen im Arbeitsgedächtnis einer Lernenden · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("The subject sets part of the mental effort, and design decides how much of the rest is wasted. Cut the waste, and keep room for understanding.", "Das Thema legt einen Teil der geistigen Anstrengung fest, und die Gestaltung entscheidet, wie viel vom Rest vergeudet wird. Kürzen Sie die Vergeudung, und lassen Sie Platz fürs Verstehen.")}</ThePoint>
        <LoadPages mode={mode} onPick={(m) => { setMode(m); }} />
        <div className={clsx("overflow-hidden rounded-lg border-2 border-ink")} role="img" aria-label={tt(`Working memory: subject ${v.intrinsic}%, waste ${v.extraneous}%, making sense ${v.germane}%`, `Arbeitsgedächtnis: Thema ${v.intrinsic} %, Vergeudung ${v.extraneous} %, Verstehen ${v.germane} %`)}>
          <div className="flex w-full">
            {part("bg-ash", tt("Subject", "Thema"), v.intrinsic)}
            {part("bg-rust", tt("Waste", "Vergeudung"), v.extraneous)}
            {part("bg-signal", tt("Making sense", "Verstehen"), v.germane)}
          </div>
        </div>
        <div className="grid gap-2 text-caption sm:grid-cols-3">
          <p className="rounded-lg border-2 border-ash/50 bg-mist p-2.5 text-ink">
            <span className="font-bold">{tt("Intrinsic", "Intrinsisch")}</span> · {tt("the subject: how complex the content is", "das Thema: wie komplex der Inhalt ist")}
          </p>
          <p className="rounded-lg border-2 border-rust/60 bg-rustSoft p-2.5 text-ink">
            <span className="font-bold">{tt("Extraneous", "Extrinsisch")}</span> · {tt("waste: effort caused by poor design", "Vergeudung: Anstrengung durch schlechte Gestaltung")}
          </p>
          <p className="rounded-lg border-2 border-signal/60 bg-signalSoft p-2.5 text-ink">
            <span className="font-bold">{tt("Germane", "Lernbezogen")}</span> · {tt("making sense: effort that builds understanding", "Verstehen: Anstrengung, die Verstehen aufbaut")}
          </p>
        </div>
        <Insight>
          {mode === "over"
            ? tt(`In plain words: of one moment of working memory, ${v.extraneous} percent goes into clutter and a wall of text, and only ${v.germane} percent is left for making sense of the lesson. The learner feels it as “I cannot follow this”, although the subject itself takes only ${v.intrinsic} percent.`, `In einfachen Worten: Von einem Moment des Arbeitsgedächtnisses fließen ${v.extraneous} Prozent in Unübersichtlichkeit und eine Textwand, und nur ${v.germane} Prozent bleiben, um die Lektion zu verstehen. Die Lernende erlebt es als „Ich kann dem nicht folgen“, obwohl das Thema selbst nur ${v.intrinsic} Prozent braucht.`)
            : tt(`In plain words: the subject still takes ${v.intrinsic} percent, but waste has fallen to ${v.extraneous} percent, so ${v.germane} percent goes into understanding. The same lesson is no easier to learn from, only easier to follow, which is the point of cutting extraneous load. The figures are illustrative.`, `In einfachen Worten: Das Thema braucht weiterhin ${v.intrinsic} Prozent, aber die Vergeudung ist auf ${v.extraneous} Prozent gesunken, also fließen ${v.germane} Prozent ins Verstehen. Dieselbe Lektion ist nicht leichter zu lernen, nur leichter zu verfolgen, und das ist der Sinn davon, die extrinsische Belastung zu senken. Die Zahlen sind veranschaulichend.`)}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A3 · chunking: the same items loose and in groups (interactive) */

type ChunkMode = "loose" | "chunked";

export function Chunking() {
  const [mode, setMode] = useState<ChunkMode>("loose");
  const items = [tt("login", "Anmeldung"), tt("profile", "Profil"), tt("deadline", "Frist"), tt("badge", "Badge"), tt("forum", "Forum"), tt("quiz 1", "Quiz 1"), tt("news", "News"), tt("certificate", "Zertifikat"), tt("quiz 2", "Quiz 2"), tt("reading", "Lesestoff"), tt("chat", "Chat"), tt("report", "Bericht")];
  const groups = [
    { name: tt("Learn", "Lernen"), items: [tt("reading", "Lesestoff"), tt("quiz 1", "Quiz 1"), tt("quiz 2", "Quiz 2")] },
    { name: tt("Progress", "Fortschritt"), items: [tt("badge", "Badge"), tt("certificate", "Zertifikat"), tt("report", "Bericht")] },
    { name: tt("Talk", "Austausch"), items: [tt("forum", "Forum"), tt("chat", "Chat"), tt("news", "News")] },
  ];
  return (
    <Diagram label={tt("Chunking: the same twelve items, loose and in three groups · Exploratory", "Chunking: dieselben zwölf Elemente, lose und in drei Gruppen · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("Working memory holds only a few new things at once. Grouping items into named chunks gives the learner fewer things to hold, and nothing is removed.", "Das Arbeitsgedächtnis hält nur wenige neue Dinge gleichzeitig. Elemente in benannte Chunks zu gruppieren, gibt der Lernenden weniger zu halten, und nichts wird entfernt.")}</ThePoint>
        <div role="radiogroup" aria-label={tt("View", "Ansicht")} className="flex flex-wrap gap-2">
          {([
            ["loose", tt("Loose items", "Lose Elemente")],
            ["chunked", tt("Three chunks", "Drei Chunks")],
          ] as [ChunkMode, string][]).map(([id, label]) => (
            <button key={id} type="button" aria-pressed={mode === id} onClick={() => { setMode(id); }} className={clsx("btn btn-sm min-h-[40px] border", mode === id ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
              {label}
            </button>
          ))}
        </div>
        <div className={clsx("rounded-xl border-2 border-ash bg-paper p-3")} aria-label={tt("A drawn start page", "Eine gezeichnete Startseite")}>
          {mode === "loose" ? (
            <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {items.map((x, i) => (
                <li key={x} className={clsx("rounded-md border border-ash/60 bg-mist px-2 py-2 text-center text-caption text-ink", i % 3 === 1 && "-translate-y-0.5", i % 4 === 2 && "translate-y-0.5")}>
                  {x}
                </li>
              ))}
            </ul>
          ) : (
            <div className="grid gap-2 md:grid-cols-3">
              {groups.map((g) => (
                <div key={g.name} className="rounded-lg border-2 border-accent/60 bg-accentSoft p-2">
                  <p className="text-body font-bold text-ink">{g.name}</p>
                  <ul className="mt-1 grid gap-1">
                    {g.items.map((x) => (
                      <li key={x} className="rounded-md border border-ash/60 bg-paper px-2 py-1.5 text-center text-caption text-ink">
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
        <Insight>
          {mode === "loose"
            ? tt("In plain words: twelve loose items are twelve things to hold, and working memory manages about four. The learner has to scan the whole page and may stop before finding what they came for.", "In einfachen Worten: Zwölf lose Elemente sind zwölf Dinge zum Halten, und das Arbeitsgedächtnis schafft etwa vier. Die Lernende muss die ganze Seite absuchen und hört vielleicht auf, bevor sie findet, wofür sie gekommen ist.")
            : tt("In plain words: the same twelve items in three named groups are three things to hold. Working memory has room for that, and the name of each group tells the learner where to look. Nothing was removed, only organised.", "In einfachen Worten: Dieselben zwölf Elemente in drei benannten Gruppen sind drei Dinge zum Halten. Dafür hat das Arbeitsgedächtnis Platz, und der Name jeder Gruppe sagt der Lernenden, wo sie suchen soll. Nichts wurde entfernt, nur geordnet.")}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A5 · LearnLoop weighs three load-reducing measures (interactive) */

export function WeighExample() {
  const [sel, setSel] = useState<string | null>(null);
  const rows: GridRow[] = [
    { id: "y1", name: tt("Shorten the content a lot", "Den Inhalt stark kürzen"), cells: {
      impact: { level: 1, reason: tt("Beginners need the content; cutting it removes what they came for.", "Einsteiger brauchen den Inhalt; ihn zu kürzen entfernt, wofür sie gekommen sind.") },
      effort: { level: 1, reason: tt("A few days of editing: Low.", "Ein paar Tage Redaktionsarbeit: Niedrig.") },
      risk: { level: 3, reason: tt("Too much is lost, and it cannot easily be put back.", "Zu viel geht verloren, und es lässt sich nicht leicht zurückholen.") },
    } },
    { id: "y2", name: tt("Add diagrams and graphics", "Diagramme und Grafiken hinzufügen"), cells: {
      impact: { level: 2, reason: tt("A diagram helps where a structure or flow is described, not everywhere.", "Ein Diagramm hilft dort, wo eine Struktur oder ein Ablauf beschrieben wird, nicht überall.") },
      effort: { level: 3, reason: tt("Every diagram is designed and checked, and it takes most of the four weeks: High.", "Jedes Diagramm wird gestaltet und geprüft, und es braucht den Großteil der vier Wochen: Hoch.") },
      risk: { level: 2, reason: tt("It uses the whole four weeks, and weak diagrams add clutter.", "Es braucht alle vier Wochen, und schwache Diagramme erhöhen die Unübersichtlichkeit.") },
    } },
    { id: "y3", name: tt("Split into small modules", "In kleine Module aufteilen"), cells: {
      impact: { level: 3, reason: tt("The learner has less to hold at once, and the content is kept.", "Die Lernende hat weniger auf einmal im Kopf, und der Inhalt bleibt erhalten.") },
      effort: { level: 2, reason: tt("The text is cut into units and titled, nothing new is drawn: Mid.", "Der Text wird in Einheiten geteilt und betitelt, nichts Neues wird gezeichnet: Mittel.") },
      risk: { level: 1, reason: tt("Same content in small units, and the split can be adjusted.", "Derselbe Inhalt in kleinen Einheiten, und die Aufteilung lässt sich anpassen.") },
    } },
  ];
  const cols = [
    { id: "impact", label: tt("Learning impact", "Lernwirkung") },
    { id: "effort", label: tt("Effort", "Aufwand") },
    { id: "risk", label: tt("Risk", "Risiko") },
  ];
  return (
    <Diagram label={tt("A worked example: LearnLoop weighs three load-reducing measures · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei Maßnahmen zur Lastsenkung ab · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("Rate each measure on how much it helps learning, how much effort it takes and what could go wrong. Quick and direct usually beats big and slow when time is short, but a measure that only makes the screen lighter does not help learning.", "Bewerten Sie jede Maßnahme danach, wie sehr sie dem Lernen hilft, wie viel Aufwand sie macht und was schiefgehen kann. Schnell und direkt schlägt bei knapper Zeit meist groß und langsam, aber eine Maßnahme, die den Bildschirm nur leichter macht, hilft dem Lernen nicht.")}</ThePoint>
        <ThreeIdeas />
        <OptionGrid label={tt("LearnLoop · four weeks", "LearnLoop · vier Wochen")} caption={tt("Three measures for LearnLoop (Case assumption, example company)", "Drei Maßnahmen für LearnLoop (Fallannahme, Beispielunternehmen)")} rows={rows} cols={cols} selected={sel} onSelect={(k) => { setSel(k); }} />
        <p className="rounded-md border border-line bg-canvas px-3 py-2 text-caption text-ink">
          <span className="smallcaps mr-1.5">{tt("Still unknown", "Noch unbekannt")}</span>
          <Gloss>{tt("Whether learners are overloaded by the amount of content or by its wording. LearnLoop would ask six beginners to explain the key point of one lesson before it commits all four weeks.", "Ob Lernende durch die Menge des Inhalts oder durch seine Formulierung überlastet sind. LearnLoop würde sechs Einsteiger bitten, den Kerngedanken einer Lektion zu erklären, bevor es die ganzen vier Wochen bindet.")}</Gloss>
        </p>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B1 · two lenses on a UX decision (static) */

export function EffectivenessChain() {
  return <TwoLensesPicture />;
}

/* ------------------------------------------------------------------ B2 · five options for a hard course: load removed against depth kept (interactive) */

export function LoadVsDepth() {
  const [sel, setSel] = useState<string | null>(null);
  const [spot, setSpot] = useState<string | null>(null);
  const pts: MatrixPoint[] = [
    { id: "a", letter: "A", x: 0.8, y: 0.18, name: tt("Cut content by half", "Inhalt um die Hälfte kürzen"), reading: tt("It removes a lot of load, but it also removes the depth: learners finish, and cannot apply what is left.", "Es entfernt viel Belastung, aber auch die Tiefe: Lernende schließen ab und können das Übrige nicht anwenden.") },
    { id: "b", letter: "B", x: 0.64, y: 0.74, name: tt("Chunk into modules", "In Module gliedern"), reading: tt("It removes a good share of the load by splitting and ordering, and keeps the content, so it stays deep.", "Es entfernt einen guten Teil der Belastung durch Teilen und Ordnen und behält den Inhalt, bleibt also tief.") },
    { id: "c", letter: "C", x: 0.58, y: 0.6, name: tt("Add diagrams", "Diagramme hinzufügen"), reading: tt("It helps where a structure or flow is described and keeps the depth, but it removes less load than chunking.", "Es hilft dort, wo eine Struktur oder ein Ablauf beschrieben wird, und behält die Tiefe, entfernt aber weniger Belastung als Chunking.") },
    { id: "d", letter: "D", x: 0.82, y: 0.3, name: tt("Summary button only", "Nur ein Zusammenfassungs-Button"), reading: tt("It makes the lesson feel light, but a summary on demand drops the examples and practice that carry the depth.", "Es lässt die Lektion leicht wirken, aber eine Zusammenfassung auf Abruf lässt die Beispiele und Übungen weg, die die Tiefe tragen.") },
    { id: "e", letter: "E", x: 0.12, y: 0.88, name: tt("Keep as it is", "So lassen, wie es ist"), reading: tt("It keeps all the depth and removes no load, so learners stay overloaded and many leave.", "Es behält die ganze Tiefe und entfernt keine Belastung, die Lernenden bleiben also überlastet, und viele gehen.") },
  ];
  return (
    <Diagram label={tt("A worked example: LearnLoop's five options for a hard course · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoops fünf Optionen für einen schweren Kurs · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("Lighter is not always better. Efficiency and depth pull against each other, so name what each option keeps and what it loses, and aim for much load removed with the depth kept.", "Leichter ist nicht immer besser. Effizienz und Tiefe ziehen gegeneinander, benennen Sie also, was jede Option behält und was sie verliert, und streben Sie viel entfernte Belastung bei erhaltener Tiefe an.")}</ThePoint>
        <MatrixFig
          title={tt("LearnLoop: five options for a hard course by mental load removed and depth kept", "LearnLoop: fünf Optionen für einen schweren Kurs nach entfernter geistiger Belastung und erhaltener Tiefe")}
          xLabel={tt("Mental load removed", "Entfernte geistige Belastung")}
          yLabel={tt("Depth of content kept", "Erhaltene Inhaltstiefe")}
          quads={[tt("Deep but heavy", "Deep but heavy"), tt("Aim here", "Aim here"), tt("Neither", "Neither"), tt("Light but shallow", "Light but shallow")]}
          points={pts}
          selected={sel}
          onSelect={(id) => {
            
            setSpot(null);
            setSel(id);
          }}
          spot={spot}
        />
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B3 · a decision without user data, filled in for LearnLoop (static) */

export function DecisionFrame() {
  return (
    <DecisionFrameFig
      label={tt("A decision without user data, filled in for LearnLoop", "Eine Entscheidung ohne Nutzerdaten, für LearnLoop ausgefüllt")}
      caption={tt("The four boxes make a decision checkable. The two boxes below make the next one less dependent on one person's taste.", "Die vier Kästen machen eine Entscheidung überprüfbar. Die zwei Kästen darunter machen die nächste weniger abhängig vom Geschmack einer Person.")}
      boxes={[
        [tt("I decide", "Ich entscheide"), tt("Rebuild one course in small modules and test it with five beginners.", "Einen Kurs in kleinen Modulen neu bauen und mit fünf Einsteigern testen.")],
        [tt("I do not know", "Ich weiß nicht"), tt("Whether learners are overloaded by the amount or by the wording; we have no user data yet.", "Ob Lernende durch die Menge oder durch die Formulierung überlastet sind; wir haben noch keine Nutzerdaten.")],
        [tt("I reverse if", "Ich nehme zurück, wenn"), tt("Fewer than 4 of 5 beginners can explain the key point after a lesson, or completion is not up 5 points after 8 weeks.", "weniger als 4 von 5 Einsteigern nach einer Lektion den Kerngedanken erklären können oder die Completion nach 8 Wochen nicht um 5 Punkte gestiegen ist.")],
        [tt("I give up", "Ich verzichte auf"), tt("The full diagram redesign this year.", "die komplette Diagramm-Neugestaltung in diesem Jahr.")],
      ]}
      rule={[
        [tt("Who decides", "Wer entscheidet"), tt("The head of learning with the content lead.", "Die Leiterin Lernen mit dem Content Lead.")],
        [tt("On what evidence", "Auf welcher Grundlage"), tt("A usability test with beginners, a short comprehension check, drop-out per lesson.", "Ein Usability-Test mit Einsteigern, eine kurze Verständnisprüfung, Abbruch pro Lektion.")],
      ]}
    />
  );
}
