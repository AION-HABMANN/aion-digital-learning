"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { Diagram, Insight, Story, ThePoint, useStory } from "@/components/materi/kit";
import type { StoryPlan } from "@/components/materi/kit";
import { euro, tt } from "@/lib/lang";

/**
 * Day 1 · the teaching diagrams. Every diagram is an inline SVG or plain HTML with a `viewBox` or fluid width, legible at 380 px. The
 * interactive ones (A2, A3, A5, B2) carry "The point", "Walk me through it" and an always-visible "What this shows" (CLAUDE.md #20, #36).
 * Static ones (A1, B1, B3) need none. Example companies: LearnLoop (an online-course provider), never SkillUp, so no task is answered here.
 */

const LV = () => ["", tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")];
const GLYPH = ["", "●○○", "●●○", "●●●"];

/* ------------------------------------------------------------------ A1 · UX against UI (static) */

export function UxUiLayers() {
  const uid = useId().replace(/:/g, "");
  const title = tt("The same course page seen as a surface (UI) and as an experience (UX)", "Dieselbe Kursseite als Oberfläche (UI) und als Erlebnis (UX)");
  const desc = tt("Top: a drawn course page with a title, three tiles and a button, labelled UI. Bottom: three steps, find it, understand it, finish it, labelled UX. A bracket shows that the experience includes the surface.", "Oben: eine gezeichnete Kursseite mit Titel, drei Kacheln und einem Button, beschriftet UI. Unten: drei Schritte, finden, verstehen, abschließen, beschriftet UX. Eine Klammer zeigt, dass das Erlebnis die Oberfläche einschließt.");
  return (
    <Diagram label={tt("UI is the surface, UX is the experience", "UI ist die Oberfläche, UX ist das Erlebnis")} caption={tt("A beautiful surface can sit on top of a poor experience. The reverse is rare: a good experience needs a surface that works.", "Eine schöne Oberfläche kann auf einem schlechten Erlebnis sitzen. Umgekehrt ist es selten: Ein gutes Erlebnis braucht eine Oberfläche, die funktioniert.")}>
      <svg viewBox="0 0 640 300" className="mx-auto h-auto w-full max-w-[640px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{title}</title>
        <desc id={`${uid}-d`}>{desc}</desc>
        <text x="20" y="22" fontSize="14" fontWeight="700" fill="#17212E">{tt("UI · what you see and touch", "UI · was man sieht und anfasst")}</text>
        <rect x="20" y="32" width="600" height="116" rx="8" fill="#FFFFFF" stroke="#556274" strokeWidth="1.5" />
        <rect x="20" y="32" width="600" height="22" rx="8" fill="#E6ECF4" stroke="#556274" strokeWidth="1.5" />
        <text x="34" y="48" fontSize="12" fill="#556274">{tt("Course · UX basics", "Kurs · UX-Grundlagen")}</text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={36 + i * 150} y="68" width="136" height="48" rx="6" fill="#E3ECFA" stroke="#1750A8" />
            <text x={104 + i * 150} y="97" textAnchor="middle" fontSize="13" fill="#17212E">{tt(`Lesson ${i + 1}`, `Lektion ${i + 1}`)}</text>
          </g>
        ))}
        <rect x="500" y="76" width="108" height="32" rx="6" fill="#1750A8" />
        <text x="554" y="97" textAnchor="middle" fontSize="13" fontWeight="700" fill="#FFFFFF">{tt("Start", "Start")}</text>
        <text x="36" y="136" fontSize="12" fill="#556274">{tt("Colours, buttons, text, layout", "Farben, Buttons, Text, Layout")}</text>

        <path d="M12 156 H4 V288 H12" fill="none" stroke="#556274" strokeWidth="1.5" />
        <text x="20" y="176" fontSize="14" fontWeight="700" fill="#17212E">{tt("UX · what the learner goes through (the surface is part of it)", "UX · was die Lernenden durchlaufen (die Oberfläche gehört dazu)")}</text>
        {[
          [tt("Find it", "Finden"), tt("Where is my course?", "Wo ist mein Kurs?")],
          [tt("Understand it", "Verstehen"), tt("Can I follow this?", "Kann ich dem folgen?")],
          [tt("Finish it", "Abschließen"), tt("Am I getting there?", "Komme ich ans Ziel?")],
        ].map(([a, b], i) => (
          <g key={i}>
            <rect x={20 + i * 204} y="190" width="184" height="86" rx="8" fill="#DCF0EE" stroke="#0B6F69" strokeWidth="1.5" />
            <text x={112 + i * 204} y="226" textAnchor="middle" fontSize="16" fontWeight="700" fill="#17212E">{a}</text>
            <text x={112 + i * 204} y="252" textAnchor="middle" fontSize="13" fill="#17212E">{b}</text>
            {i < 2 && <path d={`M${206 + i * 204} 233 H${222 + i * 204}`} stroke="#0B6F69" strokeWidth="2" markerEnd={`url(#${uid}-ar)`} />}
          </g>
        ))}
        <defs>
          <marker id={`${uid}-ar`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="#0B6F69" />
          </marker>
        </defs>
      </svg>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A2 · system's view against learner's view (interactive) */

type ViewMode = "system" | "learner";

export function SystemVsLearner() {
  const [view, setView] = useState<ViewMode>("system");
  const story = useStory([
    { title: tt("A menu built around features", "Ein Menü um Funktionen herum"), say: tt("Meet LearnLoop, an example company. Its menu lists eight features. A new learner wants one thing: to carry on with a lesson.", "Lernen Sie LearnLoop kennen, ein Beispielunternehmen. Sein Menü listet acht Funktionen. Eine neue Lernende will nur eins: mit einer Lektion weitermachen."), look: tt("the menu on the left", "das Menü links"), apply: () => setView("system") },
    { title: tt("The same platform, by goal", "Dieselbe Plattform, nach Zielen"), say: tt("Now the same platform sorted by what learners want to do. The first card says: carry on where I stopped.", "Jetzt dieselbe Plattform nach dem geordnet, was Lernende tun wollen. Die erste Karte sagt: dort weitermachen, wo ich aufgehört habe."), look: tt("the three cards", "die drei Karten"), apply: () => setView("learner") },
    { title: tt("The point", "Das Wichtigste"), say: tt("Start from the learner's goal, then name the feature. Use the two buttons to switch back and forth.", "Gehen Sie vom Ziel der Lernenden aus und nennen Sie dann die Funktion. Wechseln Sie mit den zwei Schaltflächen hin und her."), apply: () => setView("learner") },
  ] satisfies StoryPlan[]);
  const features = [tt("Courses", "Kurse"), tt("Library", "Bibliothek"), tt("Catalogue", "Katalog"), tt("Forum", "Forum"), tt("Certificates", "Zertifikate"), tt("Reports", "Berichte"), tt("Admin", "Admin"), tt("Settings", "Einstellungen")];
  const goals = [
    [tt("Carry on where I stopped", "Dort weitermachen, wo ich aufgehört habe"), tt("Lesson 3 of 8 · UX basics", "Lektion 3 von 8 · UX-Grundlagen")],
    [tt("Find a course for my job", "Einen Kurs für meinen Beruf finden"), tt("Tell us your role", "Nennen Sie uns Ihre Rolle")],
    [tt("Show my employer I finished", "Meinem Arbeitgeber zeigen, dass ich fertig bin"), tt("Your certificates", "Ihre Zertifikate")],
  ];
  const pick = (v: ViewMode) => {
    story.leave();
    setView(v);
  };
  return (
    <Diagram label={tt("One platform, two ways to organise it · Exploratory", "Eine Plattform, zwei Arten, sie zu ordnen · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("A platform organised around its features makes the learner do the work of finding their goal. One organised around goals does that work for them. Ask of every screen: whose goal does it serve?", "Eine Plattform, die um ihre Funktionen herum organisiert ist, lässt die Lernenden die Arbeit des Findens ihres Ziels selbst machen. Eine, die um Ziele herum organisiert ist, nimmt ihnen diese Arbeit ab. Fragen Sie bei jedem Bildschirm: Wessen Ziel dient er?")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <div role="radiogroup" aria-label={tt("View", "Sicht")} className="flex flex-wrap gap-2">
          {(["system", "learner"] as const).map((v) => (
            <button key={v} type="button" aria-pressed={view === v} onClick={() => pick(v)} className={clsx("btn btn-sm min-h-[40px] border", view === v ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
              {v === "system" ? tt("System's view", "Sicht des Systems") : tt("Learner's view", "Sicht der Lernenden")}
            </button>
          ))}
        </div>
        <div className="overflow-hidden rounded-xl border-2 border-ash bg-paper" aria-label={tt("A drawn platform screen", "Ein gezeichneter Plattform-Bildschirm")}>
          <div className="flex items-center gap-2 border-b border-line bg-mist px-3 py-1.5 text-micro text-ash">
            <span aria-hidden>●●●</span> LearnLoop
          </div>
          {view === "system" ? (
            <div className="grid gap-3 p-3 sm:grid-cols-[11rem_1fr]">
              <ul className={clsx("space-y-1 rounded-lg border border-line bg-canvas p-2 text-caption", story.step === 0 && "anim-pulse ring-2 ring-gold")}>
                {features.map((f) => (
                  <li key={f} className="rounded px-2 py-1 text-ink">{f}</li>
                ))}
              </ul>
              <p className="p-2 text-caption text-ash">{tt("Select an entry on the left. (You came to carry on with a lesson. Which entry is it?)", "Wählen Sie links einen Eintrag. (Sie wollten mit einer Lektion weitermachen. Welcher Eintrag ist es?)")}</p>
            </div>
          ) : (
            <div className={clsx("grid gap-3 p-3 sm:grid-cols-3", story.step === 1 && "anim-pulse")}>
              {goals.map(([a, b], i) => (
                <div key={i} className={clsx("rounded-lg border p-3", i === 0 ? "border-accent bg-accentSoft" : "border-line bg-canvas")}>
                  <p className="text-body font-semibold text-ink">{a}</p>
                  <p className="mt-1 text-caption text-ash">{b}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <Insight>
          {view === "system"
            ? tt("In plain words: this screen lists what the software can do. A new learner has to guess which of eight entries gets them to their lesson, so the work of finding the goal is theirs.", "In einfachen Worten: Dieser Bildschirm listet auf, was die Software kann. Eine neue Lernende muss raten, welcher von acht Einträgen sie zu ihrer Lektion bringt, die Arbeit des Findens liegt also bei ihr.")
            : tt("In plain words: the same platform, organised by what a learner wants to do. The first thing to select is obvious, so the work of finding the goal is done for the learner.", "In einfachen Worten: dieselbe Plattform, geordnet nach dem, was Lernende tun wollen. Das Erste, was man wählt, ist offensichtlich, die Arbeit des Findens nimmt den Lernenden also das System ab.")}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A3 · a lesson screen with three switches (interactive) */

export function LessonScreen() {
  const [orient, setOrient] = useState(false);
  const [light, setLight] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const set = (f: (v: boolean) => void, v: boolean) => {
    story.leave();
    f(v);
  };
  const story = useStory([
    { title: tt("All three missing", "Alle drei fehlen"), say: tt("A lesson of an example platform: a wall of text, no sign of where you are, no sign of how you did. You would stop soon.", "Eine Lektion einer Beispielplattform: eine Textwand, kein Zeichen, wo Sie sind, kein Zeichen, wie Sie abgeschnitten haben. Sie würden bald aufhören."), look: tt("the whole screen", "der ganze Bildschirm"), apply: () => { setOrient(false); setLight(false); setFeedback(false); } },
    { title: tt("All three present", "Alle drei vorhanden"), say: tt("Switch all three on. You see where you are and what comes next, the text can be scanned, and you see your progress and your quiz result.", "Schalten Sie alle drei ein. Sie sehen, wo Sie sind und was als Nächstes kommt, der Text lässt sich überfliegen, und Sie sehen Ihren Fortschritt und Ihr Quizergebnis."), look: tt("the top bar, the text, the bottom bar", "die obere Leiste, der Text, die untere Leiste"), apply: () => { setOrient(true); setLight(true); setFeedback(true); } },
    { title: tt("The point", "Das Wichtigste"), say: tt("Each switch answers one question: where am I, can I follow this, am I getting somewhere. Try them one at a time.", "Jeder Schalter beantwortet eine Frage: Wo bin ich, kann ich folgen, komme ich voran. Probieren Sie sie einzeln aus."), apply: () => { setOrient(true); setLight(true); setFeedback(true); } },
  ] satisfies StoryPlan[]);
  const n = [orient, light, feedback].filter(Boolean).length;
  const lines = (k: number, w: number[]) => Array.from({ length: k }, (_, i) => <span key={i} className="block h-2 rounded bg-line" style={{ width: `${w[i % w.length]}%` }} />);
  return (
    <Diagram label={tt("A lesson screen and its three principles · Exploratory", "Ein Lektionsbildschirm und seine drei Prinzipien · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("A learning screen has three jobs: show where you are, ask for no needless effort, and show that you are getting somewhere. When one is missing, learners stop for a reason you can name.", "Ein Lernbildschirm hat drei Aufgaben: zeigen, wo man ist, keine unnötige Mühe verlangen und zeigen, dass man vorankommt. Fehlt eine, hören Lernende aus einem Grund auf, den Sie benennen können.")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <div role="group" aria-label={tt("Principles", "Prinzipien")} className="flex flex-wrap gap-2">
          {[
            [tt("Orientation", "Orientierung"), orient, setOrient],
            [tt("Light load", "Leichte Last"), light, setLight],
            [tt("Feedback", "Feedback"), feedback, setFeedback],
          ].map(([label, on, fn]) => (
            <button key={label as string} type="button" aria-pressed={on as boolean} onClick={() => set(fn as (v: boolean) => void, !(on as boolean))} className={clsx("btn btn-sm min-h-[40px] border", on ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
              <span aria-hidden>{on ? "☑" : "☐"}</span> {label as string}
            </button>
          ))}
        </div>
        <div className="overflow-hidden rounded-xl border-2 border-ash bg-paper" aria-label={tt("A drawn lesson screen", "Ein gezeichneter Lektionsbildschirm")}>
          <div className={clsx("flex flex-wrap items-center justify-between gap-2 border-b border-line bg-mist px-3 py-2 text-caption", story.step === 1 && "anim-pulse")}>
            {orient ? (
              <>
                <span className="text-ink">{tt("UX basics › Module 2 › Lesson 3 of 8", "UX-Grundlagen › Modul 2 › Lektion 3 von 8")}</span>
                <span className="rounded bg-accent px-2 py-0.5 text-micro font-bold text-paper">{tt("Next lesson →", "Nächste Lektion →")}</span>
              </>
            ) : (
              <span className="text-ash">{tt("Lesson", "Lektion")}</span>
            )}
          </div>
          <div className="space-y-2 p-3">
            {light ? (
              <>
                <p className="text-body font-semibold text-ink">{tt("Why a sketch comes before a design", "Warum eine Skizze vor dem Design kommt")}</p>
                <p className="text-caption text-ink">{tt("A sketch tests an idea in minutes.", "Eine Skizze testet eine Idee in Minuten.")}</p>
                <p className="text-caption text-ink">
                  {tt("A ", "Ein ")}
                  <span className="rounded bg-accentSoft px-1 font-semibold text-accent">wireframe</span>
                  {tt(" (a plain layout drawing with no colours) shows structure first.", " (eine schlichte Layoutzeichnung ohne Farben) zeigt zuerst die Struktur.")}
                </p>
                <div className="space-y-1.5 rounded border border-line bg-canvas p-2" aria-hidden>
                  {lines(2, [90, 70])}
                </div>
              </>
            ) : (
              <div className="space-y-1.5" aria-label={tt("About 500 words in one block", "Etwa 500 Wörter in einem Block")}>
                {lines(11, [100, 96, 100, 92, 100, 98, 100, 94, 100, 97, 60])}
                <p className="pt-1 text-micro text-ash">{tt("…about 500 words in one block, with the terms “wireframe” and “heuristic” unexplained.", "…etwa 500 Wörter in einem Block, mit den unerklärten Begriffen „Wireframe“ und „Heuristik“.")}</p>
              </div>
            )}
          </div>
          <div className={clsx("border-t border-line bg-mist px-3 py-2 text-caption", story.step === 1 && "anim-pulse")}>
            {feedback ? (
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-ink">{tt("3 of 8 lessons done", "3 von 8 Lektionen erledigt")}</span>
                <span aria-hidden className="h-2 w-32 overflow-hidden rounded bg-line">
                  <span className="block h-2 w-[37.5%] bg-signal" />
                </span>
                <span className="text-ink">{tt("Quiz: 4 of 5 correct. Review question 2.", "Quiz: 4 von 5 richtig. Prüfen Sie Frage 2 noch einmal.")}</span>
              </div>
            ) : (
              <span className="text-ash">{tt("(Nothing here: no progress, no result.)", "(Hier ist nichts: kein Fortschritt, kein Ergebnis.)")}</span>
            )}
          </div>
        </div>
        <Insight>
          {tt(
            `In plain words: ${n} of the 3 principles are present. ${orient ? "The learner knows where they are and what comes next." : "The learner cannot tell where they are or what comes next."} ${light ? "The text can be scanned and the new word is explained." : "The learner has to dig the point out of a wall of text."} ${feedback ? "The learner sees progress and how they did." : "The learner gets no sign of getting anywhere."}`,
            `In einfachen Worten: ${n} der 3 Prinzipien sind vorhanden. ${orient ? "Die Lernende weiß, wo sie ist und was als Nächstes kommt." : "Die Lernende erkennt nicht, wo sie ist oder was als Nächstes kommt."} ${light ? "Der Text lässt sich überfliegen, und das neue Wort ist erklärt." : "Die Lernende muss die Aussage aus einer Textwand herausgraben."} ${feedback ? "Die Lernende sieht Fortschritt und wie sie abgeschnitten hat." : "Die Lernende bekommt kein Zeichen, dass sie vorankommt."}`,
          )}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A5 / B2 · a worked example grid (interactive) */

export type GridCell = { level: 1 | 2 | 3; reason: string; note?: string };
export type GridRow = { id: string; name: string; sub?: string; cells: Record<string, GridCell> };

/**
 * A worked example on a different company: rows are options, columns the questions asked of each. Every cell is a button that opens the reason for its rating
 * (CLAUDE.md #25). A rating is a word and a glyph (●●○), never a colour alone, and never "good" or "bad": a High risk is not a high mark.
 */
export function OptionGrid({ label, rows, cols, selected, onSelect, caption }: { label: string; rows: GridRow[]; cols: { id: string; label: string }[]; selected: string | null; onSelect: (key: string | null) => void; caption: string }) {
  const sel = selected ? selected.split(".") : null;
  const row = sel ? rows.find((r) => r.id === sel[0]) : null;
  const cell = row && sel ? row.cells[sel[1]] : null;
  const colLabel = sel ? cols.find((c) => c.id === sel[1])?.label : "";
  return (
    <div className="space-y-2">
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[32rem] border-collapse text-caption">
          <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{caption}</caption>
          <thead>
            <tr className="text-left text-micro uppercase text-ash">
              <th scope="col" className="px-3 py-2">{label}</th>
              {cols.map((c) => (
                <th key={c.id} scope="col" className="px-3 py-2">{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-line align-top">
                <th scope="row" className="px-3 py-2 text-left font-semibold text-ink">
                  {r.name}
                  {r.sub && <span className="block font-normal text-ash">{r.sub}</span>}
                </th>
                {cols.map((c) => {
                  const key = `${r.id}.${c.id}`;
                  const on = selected === key;
                  const x = r.cells[c.id];
                  return (
                    <td key={c.id} className="px-2 py-1.5">
                      <button
                        type="button"
                        aria-pressed={on}
                        aria-label={`${r.name}, ${c.label}: ${LV()[x.level]}`}
                        onClick={() => onSelect(on ? null : key)}
                        className={clsx("flex min-h-[44px] w-full flex-col items-start justify-center rounded-lg border px-2 py-1 text-left transition-colors", on ? "border-accent bg-accentSoft ring-2 ring-gold" : "border-line bg-paper hover:border-ash")}
                      >
                        <span className="font-semibold text-ink">
                          <span aria-hidden className="mr-1.5 tracking-wider">{GLYPH[x.level]}</span>
                          {LV()[x.level]}
                        </span>
                        {x.note && <span className="text-micro text-ash">{x.note}</span>}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Insight>
        {row && cell
          ? tt(`In plain words: ${row.name}, ${colLabel?.toLowerCase()}: ${LV()[cell.level]}. ${cell.reason}`, `In einfachen Worten: ${row.name}, ${colLabel}: ${LV()[cell.level]}. ${cell.reason}`)
          : tt("Select any cell to read why it has that rating. The rating is a reading of the example company, not a mark.", "Wählen Sie eine Zelle, um zu lesen, warum sie diese Bewertung hat. Die Bewertung ist eine Lesart des Beispielunternehmens, keine Note.")}
      </Insight>
    </div>
  );
}

export function WeighExample() {
  const [sel, setSel] = useState<string | null>(null);
  const story = useStory([
    { title: tt("A cheap, clear fix", "Eine billige, klare Lösung"), say: tt("Meet LearnLoop, where 30 of 100 new learners leave in week one. A guided first week costs €7,000, so effort is Low, and it meets the problem directly.", "Lernen Sie LearnLoop kennen, wo 30 von 100 neuen Lernenden in Woche eins gehen. Eine geführte erste Woche kostet 7.000 €, der Aufwand ist also Niedrig, und sie trifft das Problem direkt."), look: tt("the top row, user impact", "die obere Zeile, Nutzerwirkung"), apply: () => setSel("x1.impact") },
    { title: tt("A tempting idea that could backfire", "Eine verlockende Idee mit Rückschlagrisiko"), say: tt("A leaderboard costs €12,000 and mostly rewards learners who are already active. Those at the bottom may leave sooner: the risk is High.", "Eine Rangliste kostet 12.000 € und belohnt vor allem Lernende, die ohnehin aktiv sind. Die unten stehenden gehen vielleicht früher: Das Risiko ist Hoch."), look: tt("the middle row, risk", "die mittlere Zeile, Risiko"), apply: () => setSel("x2.risk") },
    { title: tt("The point", "Das Wichtigste"), say: tt("Rate every measure on the same three questions, and say what you still do not know. Select any cell to read its reason.", "Bewerten Sie jede Maßnahme nach denselben drei Fragen, und sagen Sie, was Sie noch nicht wissen. Wählen Sie eine Zelle, um ihren Grund zu lesen."), apply: () => setSel("x3.effort") },
  ] satisfies StoryPlan[]);
  const rows: GridRow[] = [
    { id: "x1", name: tt("Guided first week", "Geführte erste Woche"), sub: euro(7000), cells: {
      impact: { level: 3, reason: tt("Week one is where learners leave, and this tells every new learner exactly what to do first.", "In Woche eins gehen Lernende, und dies sagt jeder neuen Lernenden genau, was sie zuerst tun soll.") },
      effort: { level: 1, note: euro(7000), reason: tt("€7,000 is under €10,000, so the rule gives Low.", "7.000 € liegen unter 10.000 €, die Regel ergibt also Niedrig.") },
      risk: { level: 1, reason: tt("It adds a path and removes nothing, and it can be switched off again.", "Es fügt einen Pfad hinzu und nimmt nichts weg, und man kann es wieder abschalten.") },
    } },
    { id: "x2", name: tt("Leaderboard", "Rangliste"), sub: euro(12000), cells: {
      impact: { level: 1, reason: tt("It rewards the few learners who are already active and does nothing for a newcomer who is lost.", "Sie belohnt die wenigen ohnehin aktiven Lernenden und tut nichts für eine Neue, die sich verirrt hat.") },
      effort: { level: 2, note: euro(12000), reason: tt("€12,000 lies between €10,000 and €15,000: Mid.", "12.000 € liegen zwischen 10.000 € und 15.000 €: Mittel.") },
      risk: { level: 3, reason: tt("A ranking can discourage learners at the bottom, and they are the ones most likely to leave.", "Eine Rangliste kann Lernende unten entmutigen, und genau sie gehen am ehesten.") },
    } },
    { id: "x3", name: tt("Rewrite the whole catalogue", "Den ganzen Katalog neu schreiben"), sub: euro(27000), cells: {
      impact: { level: 2, reason: tt("It helps understanding, but most of the benefit arrives after the six weeks, and learners leave in week one.", "Es hilft dem Verständnis, aber der größte Nutzen kommt nach den sechs Wochen, und die Lernenden gehen in Woche eins.") },
      effort: { level: 3, note: euro(27000), reason: tt("€27,000 is above €15,000: High, and it uses almost the whole €30,000.", "27.000 € liegen über 15.000 €: Hoch, und es verbraucht fast die ganzen 30.000 €.") },
      risk: { level: 2, reason: tt("Most of the budget goes into one bet; if the cause is not the text, little is left to try something else.", "Der größte Teil des Budgets geht in eine Wette; liegt die Ursache nicht im Text, bleibt wenig für einen anderen Versuch.") },
    } },
  ];
  const cols = [
    { id: "impact", label: tt("User impact", "Nutzerwirkung") },
    { id: "effort", label: tt("Effort", "Aufwand") },
    { id: "risk", label: tt("Risk", "Risiko") },
  ];
  return (
    <Diagram label={tt("A worked example: LearnLoop weighs three measures · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei Maßnahmen ab · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("To choose under a budget, ask every measure the same three questions: how much does it help the learner, what does it cost, what could go wrong? Then say what you still do not know.", "Um unter einem Budget zu wählen, stellen Sie jeder Maßnahme dieselben drei Fragen: Wie sehr hilft sie den Lernenden, was kostet sie, was kann schiefgehen? Dann sagen Sie, was Sie noch nicht wissen.")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <OptionGrid label={tt("LearnLoop · budget €30,000, six weeks", "LearnLoop · Budget 30.000 €, sechs Wochen")} caption={tt("Three measures for LearnLoop (Case assumption, example company)", "Drei Maßnahmen für LearnLoop (Fallannahme, Beispielunternehmen)")} rows={rows} cols={cols} selected={sel} onSelect={(k) => { story.leave(); setSel(k); }} />
        <p className="rounded-md border border-line bg-canvas px-3 py-2 text-caption text-ink">
          <span className="smallcaps mr-1.5">{tt("Still unknown", "Noch unbekannt")}</span>
          {tt("Whether week-one leavers lack direction or lack time. LearnLoop would run five short interviews before committing the whole budget.", "Ob die Abbrecher der ersten Woche Orientierung oder Zeit vermissen. LearnLoop würde fünf kurze Interviews führen, bevor es das ganze Budget bindet.")}
        </p>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B1 · experience → behaviour → number (static) */

export function ExperienceToNumber() {
  const uid = useId().replace(/:/g, "");
  const rows: [string, string, string][] = [
    [tt("A clear path", "Ein klarer Pfad"), tt("Learners carry on", "Lernende machen weiter"), tt("Completion rate", "Completion Rate")],
    [tt("Lessons you can follow", "Lektionen, denen man folgen kann"), tt("They do more while there", "Sie tun mehr, solange sie da sind"), tt("Engagement", "Engagement")],
    [tt("Visible progress", "Sichtbarer Fortschritt"), tt("They come back", "Sie kommen wieder"), tt("Retention", "Retention")],
  ];
  const title = tt("From the experience to the numbers a business watches", "Vom Erlebnis zu den Zahlen, die ein Unternehmen beobachtet");
  const desc = tt("Three rows, each read left to right: a clear path leads to learners carrying on, which shows in the completion rate; lessons you can follow lead to more activity, which shows in engagement; visible progress leads to coming back, which shows in retention.", "Drei Zeilen, jede von links nach rechts gelesen: ein klarer Pfad führt dazu, dass Lernende weitermachen, was die Completion Rate zeigt; Lektionen, denen man folgen kann, führen zu mehr Aktivität, was das Engagement zeigt; sichtbarer Fortschritt führt zum Wiederkommen, was die Retention zeigt.");
  return (
    <Diagram label={tt("UX is a business decision", "UX ist eine Geschäftsentscheidung")} caption={tt("Typical links, drawn for a learning platform. A real platform checks each link with its own data.", "Typische Zusammenhänge, für eine Lernplattform gezeichnet. Eine echte Plattform prüft jeden Zusammenhang mit eigenen Daten.")}>
      <svg viewBox="0 0 640 250" className="mx-auto h-auto w-full max-w-[640px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{title}</title>
        <desc id={`${uid}-d`}>{desc}</desc>
        <defs>
          <marker id={`${uid}-ar`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="#556274" />
          </marker>
        </defs>
        {[tt("What the learner experiences", "Was die Lernenden erleben"), tt("What they then do", "Was sie daraufhin tun"), tt("The number that shows it", "Die Zahl, die es zeigt")].map((h, i) => (
          <text key={h} x={20 + i * 214} y="20" fontSize="13" fontWeight="700" fill="#556274">{h}</text>
        ))}
        {rows.map((r, i) => (
          <g key={i}>
            {r.map((c, j) => (
              <g key={j}>
                <rect x={20 + j * 214} y={34 + i * 72} width="188" height="56" rx="8" fill={j === 2 ? "#DCF0EE" : j === 1 ? "#E6ECF4" : "#E3ECFA"} stroke={j === 2 ? "#0B6F69" : "#556274"} strokeWidth="1.4" strokeDasharray={j === 1 ? "5 3" : undefined} />
                <text x={114 + j * 214} y={67 + i * 72} textAnchor="middle" fontSize="14" fontWeight={j === 2 ? 700 : 400} fill="#17212E">{c}</text>
                {j < 2 && <path d={`M${210 + j * 214} ${62 + i * 72} H${232 + j * 214}`} stroke="#556274" strokeWidth="2" markerEnd={`url(#${uid}-ar)`} />}
              </g>
            ))}
          </g>
        ))}
      </svg>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B2 · conflicting goals (interactive) */

export function TensionExample() {
  const [sel, setSel] = useState<string | null>(null);
  const story = useStory([
    { title: tt("Three goals pull apart", "Drei Ziele ziehen auseinander"), say: tt("LearnLoop's management wants growth, but satisfaction is falling and the budget is limited. Buying marketing serves the business goal.", "Die Geschäftsführung von LearnLoop will Wachstum, aber die Zufriedenheit sinkt und das Budget ist begrenzt. Marketing einzukaufen dient dem Geschäftsziel."), look: tt("the bottom row, business value", "die untere Zeile, Geschäftswert"), apply: () => setSel("y3.business") },
    { title: tt("One option serves both", "Eine Option dient beiden"), say: tt("Simplifying the navigation helps learners find their course now and, later, more of them finish. It is small and can be undone.", "Die Navigation zu vereinfachen hilft Lernenden, ihren Kurs jetzt zu finden, und später schließen mehr von ihnen ab. Sie ist klein und lässt sich zurücknehmen."), look: tt("the middle row, user value", "die mittlere Zeile, Nutzerwert"), apply: () => setSel("y2.user") },
    { title: tt("The point", "Das Wichtigste"), say: tt("Name the conflict in one sentence, say what each side gets and loses, then decide. Select any cell for its reason.", "Benennen Sie den Konflikt in einem Satz, sagen Sie, was jede Seite bekommt und verliert, und entscheiden Sie dann. Wählen Sie eine Zelle für ihren Grund."), apply: () => setSel("y1.risk") },
  ] satisfies StoryPlan[]);
  const rows: GridRow[] = [
    { id: "y1", name: tt("Add more courses", "Mehr Kurse hinzufügen"), sub: tt("a business goal", "ein Geschäftsziel"), cells: {
      user: { level: 1, reason: tt("More to choose from makes finding the right course harder, not easier.", "Mehr Auswahl macht das Finden des richtigen Kurses schwerer, nicht leichter.") },
      business: { level: 2, reason: tt("A bigger catalogue can sell, but only if learners can find what they want.", "Ein größerer Katalog kann verkaufen, aber nur, wenn Lernende finden, was sie wollen.") },
      risk: { level: 2, reason: tt("Money goes into content before the finding problem is fixed.", "Geld fließt in Inhalt, bevor das Problem des Findens gelöst ist.") },
    } },
    { id: "y2", name: tt("Simplify the navigation", "Die Navigation vereinfachen"), sub: tt("a user goal", "ein Nutzerziel"), cells: {
      user: { level: 3, reason: tt("Learners find their course and see what comes next.", "Lernende finden ihren Kurs und sehen, was als Nächstes kommt.") },
      business: { level: 2, reason: tt("Fewer leave, so completion and renewals rise, but slowly.", "Weniger gehen, also steigen Completion und Verlängerungen, aber langsam.") },
      risk: { level: 1, reason: tt("It is a small change that can be undone.", "Es ist eine kleine Änderung, die sich zurücknehmen lässt.") },
    } },
    { id: "y3", name: tt("Buy more marketing", "Mehr Marketing einkaufen"), sub: tt("a growth goal", "ein Wachstumsziel"), cells: {
      user: { level: 1, reason: tt("Nothing gets better for the learner who is already there.", "Für die Lernenden, die schon da sind, wird nichts besser.") },
      business: { level: 2, reason: tt("More sign-ups in the short term.", "Kurzfristig mehr Anmeldungen.") },
      risk: { level: 3, reason: tt("New learners meet the same problems and leave, so the spend is partly lost.", "Neue Lernende treffen auf dieselben Probleme und gehen, das Geld ist also teilweise verloren.") },
    } },
  ];
  const cols = [
    { id: "user", label: tt("User value", "Nutzerwert") },
    { id: "business", label: tt("Business value", "Geschäftswert") },
    { id: "risk", label: tt("Risk", "Risiko") },
  ];
  return (
    <Diagram label={tt("A worked example: LearnLoop weighs three options against conflicting goals · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei Optionen gegen Zielkonflikte ab · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("In a UX decision the goals pull in different directions. A good decision names the conflict, says what each side gets and loses, and keeps what cannot be undone to a minimum.", "Bei einer UX-Entscheidung ziehen die Ziele in verschiedene Richtungen. Eine gute Entscheidung benennt den Konflikt, sagt, was jede Seite bekommt und verliert, und hält das, was sich nicht zurücknehmen lässt, gering.")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <OptionGrid label={tt("LearnLoop · limited budget, falling satisfaction, management wants growth", "LearnLoop · begrenztes Budget, sinkende Zufriedenheit, das Management will Wachstum")} caption={tt("Three options for LearnLoop (Case assumption, example company)", "Drei Optionen für LearnLoop (Fallannahme, Beispielunternehmen)")} rows={rows} cols={cols} selected={sel} onSelect={(k) => { story.leave(); setSel(k); }} />
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B3 · the frame of a decision under uncertainty (static) */

export function DecisionFrame() {
  const uid = useId().replace(/:/g, "");
  const boxes: [string, string][] = [
    [tt("I decide", "Ich entscheide"), tt("Launch a guided first week now.", "Jetzt eine geführte erste Woche starten.")],
    [tt("I do not know", "Ich weiß nicht"), tt("Whether leavers lack direction or time.", "Ob Abbrecher Orientierung oder Zeit vermissen.")],
    [tt("I reverse if", "Ich nehme zurück, wenn"), tt("Week-one drop-out is not below 25% after six weeks (now 30%).", "die Abbruchquote der ersten Woche nach sechs Wochen nicht unter 25 % liegt (jetzt 30 %).")],
    [tt("I give up", "Ich verzichte auf"), tt("The leaderboard this year.", "die Rangliste in diesem Jahr.")],
  ];
  const rule: [string, string][] = [
    [tt("Who decides", "Wer entscheidet"), tt("The UX lead with the product owner.", "Der UX Lead mit dem Product Owner.")],
    [tt("On what evidence", "Auf welcher Grundlage"), tt("Interviews, a usability test, drop-out data.", "Interviews, ein Usability-Test, Abbruchdaten.")],
  ];
  const wrapText = (s: string, n: number) => {
    const words = s.split(" ");
    const out: string[] = [];
    let cur = "";
    for (const w of words) {
      if ((cur + " " + w).trim().length > n && cur) {
        out.push(cur);
        cur = w;
      } else cur = (cur + " " + w).trim();
    }
    if (cur) out.push(cur);
    return out;
  };
  const title = tt("The four parts of a decision made without complete data, and the rule for future decisions", "Die vier Teile einer Entscheidung ohne vollständige Daten und die Regel für künftige Entscheidungen");
  const desc = tt("Four boxes filled in for LearnLoop: I decide, I do not know, I reverse if, I give up. Below, two boxes: who decides and on what evidence.", "Vier für LearnLoop ausgefüllte Kästen: Ich entscheide, Ich weiß nicht, Ich nehme zurück, wenn, Ich verzichte auf. Darunter zwei Kästen: wer entscheidet und auf welcher Grundlage.");
  return (
    <Diagram label={tt("A decision under uncertainty, filled in for LearnLoop", "Eine Entscheidung unter Unsicherheit, für LearnLoop ausgefüllt")} caption={tt("The four boxes make a decision checkable. The two boxes below make the next one less dependent on one person's taste.", "Die vier Kästen machen eine Entscheidung überprüfbar. Die zwei Kästen darunter machen die nächste weniger abhängig vom Geschmack einer Person.")}>
      <svg viewBox="0 0 640 330" className="mx-auto h-auto w-full max-w-[640px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{title}</title>
        <desc id={`${uid}-d`}>{desc}</desc>
        {boxes.map(([h, b], i) => (
          <g key={h}>
            <rect x={10 + i * 158} y="16" width="148" height="156" rx="8" fill={i === 3 ? "#F8E4DE" : "#E3ECFA"} stroke={i === 3 ? "#AD3F26" : "#1750A8"} strokeWidth="1.5" />
            <text x={84 + i * 158} y="42" textAnchor="middle" fontSize="14" fontWeight="700" fill="#17212E">{h}</text>
            {wrapText(b, 17).map((l, k) => (
              <text key={k} x={84 + i * 158} y={70 + k * 19} textAnchor="middle" fontSize="13" fill="#17212E">{l}</text>
            ))}
          </g>
        ))}
        <text x="10" y="204" fontSize="13" fontWeight="700" fill="#556274">{tt("The rule for future UX decisions", "Die Regel für künftige UX-Entscheidungen")}</text>
        {rule.map(([h, b], i) => (
          <g key={h}>
            <rect x={10 + i * 316} y="214" width="304" height="96" rx="8" fill="#DCF0EE" stroke="#0B6F69" strokeWidth="1.5" />
            <text x={162 + i * 316} y="240" textAnchor="middle" fontSize="14" fontWeight="700" fill="#17212E">{h}</text>
            {wrapText(b, 38).map((l, k) => (
              <text key={k} x={162 + i * 316} y={266 + k * 19} textAnchor="middle" fontSize="13" fill="#17212E">{l}</text>
            ))}
          </g>
        ))}
      </svg>
    </Diagram>
  );
}
