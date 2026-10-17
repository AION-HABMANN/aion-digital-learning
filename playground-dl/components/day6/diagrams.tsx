"use client";

import { useState } from "react";
import clsx from "clsx";
import { OptionGrid } from "@/components/day1/diagrams";
import type { GridRow } from "@/components/day1/diagrams";
import { EmotionCurve, MeasureThumb, PersonaCard, SideScreen } from "@/components/day6/mocks";
import { CostBands } from "@/components/materi/figures";
import { Diagram, Insight, ThePoint } from "@/components/materi/kit";
import { Gloss } from "@/lib/glossify";
import { tt } from "@/lib/lang";

/**
 * Day 6 · the teaching diagrams of Materi A. Interactive ones (a persona built from clichés or from data, the four mistakes of a weak persona, a journey with its
 * emotion curve, LearnLoop weighing three measures) carry "The point" and an always-visible "What this shows" (CLAUDE.md #20, #36, #51).
 * The static ones are drawn pictures (#52). Example companies and people: LearnLoop, Mia and Sven; never EduPath, so no task is answered here.
 */

const Btn = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button type="button" aria-pressed={on} onClick={onClick} className={clsx("btn btn-sm min-h-[40px] border text-left", on ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
    {children}
  </button>
);

/* ------------------------------------------------------------------ A1 · a persona nobody can use, and one a team can decide with (interactive) */

export function PersonaToggle() {
  const [kind, setKind] = useState<"weak" | "useful">("weak");
  return (
    <Diagram label={tt("A persona built from clichés and one built from data · Exploratory · Case assumption", "Eine Persona aus Klischees und eine aus Daten · Explorativ · Fallannahme")}>
      <div className="space-y-3">
        <ThePoint>{tt("A persona is a representative profile with goals, problems and a context of use, built from data. It is a tool for decisions, not a picture of “the user”.", "Eine Persona ist ein repräsentatives Profil mit Zielen, Problemen und einem Nutzungskontext, aus Daten gebaut. Sie ist ein Werkzeug für Entscheidungen, kein Bild „des Nutzers“.")}</ThePoint>
        <div role="radiogroup" aria-label={tt("The persona card", "Die Persona-Karte")} className="flex flex-wrap gap-2">
          <Btn on={kind === "weak"} onClick={() => { setKind("weak"); }}>{tt("A persona nobody can use", "Eine Persona, die niemand nutzen kann")}</Btn>
          <Btn on={kind === "useful"} onClick={() => { setKind("useful"); }}>{tt("A persona a team can decide with", "Eine Persona, mit der ein Team entscheiden kann")}</Btn>
        </div>
        <div className={"mx-auto w-full max-w-[420px]"}>
          <PersonaCard kind={kind} />
        </div>
        <Insight>
          {kind === "weak"
            ? tt("In plain words: this card gives a goal (“a great experience”) and a problem (“hates bad design”) that fit every user, so no decision depends on it. It has no sources, so nobody can check it. The names and details are made up for the example.", "In einfachen Worten: Diese Karte nennt ein Ziel („ein tolles Erlebnis“) und ein Problem („hasst schlechte Gestaltung“), die auf jeden Nutzer passen, keine Entscheidung hängt also davon ab. Sie hat keine Quellen, niemand kann sie prüfen. Die Namen und Einzelheiten sind für das Beispiel erfunden.")
            : tt("In plain words: this card names a goal that is a reason in her life, a problem that is a situation, and a context with time and device, and it says what it is built from. A team can ask “would this help Mia?” and find an answer.", "In einfachen Worten: Diese Karte nennt ein Ziel, das ein Grund in ihrem Leben ist, ein Problem, das eine Situation ist, und einen Kontext mit Zeit und Gerät, und sie sagt, woraus sie gebaut ist. Ein Team kann fragen „Würde das Mia helfen?“ und eine Antwort finden.")}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A2 · four mistakes of a weak persona, and what a useful one does instead (interactive) */

type Mistake = "cliche" | "general" | "source" | "decision";
const MISTAKE_IDS: Mistake[] = ["cliche", "general", "source", "decision"];
const mistakeText = (id: Mistake) =>
  ({
    cliche: { name: tt("A cliché instead of data", "Ein Klischee statt Daten"), instead: tt("A goal, a problem or a situation you can point to in the evidence.", "Ein Ziel, ein Problem oder eine Situation, auf die Sie in den Belegen zeigen können.") },
    general: { name: tt("A persona for everyone", "Eine Persona für alle"), instead: tt("A persona that differs from the others in goal, problem or context. If two want the same in the same situation, merge them.", "Eine Persona, die sich von den anderen in Ziel, Problem oder Kontext unterscheidet. Wollen zwei dasselbe in derselben Situation, führen Sie sie zusammen.") },
    source: { name: tt("No source", "Keine Quelle"), instead: tt("Every statement names its source: an interview, a ticket, a log. A statement without a source is a hypothesis.", "Jede Aussage nennt ihre Quelle: ein Interview, ein Ticket, ein Log. Eine Aussage ohne Quelle ist eine Hypothese.") },
    decision: { name: tt("It changes no decision", "Sie ändert keine Entscheidung"), instead: tt("Ask: which decision would change because of it? If none would, it is decoration.", "Fragen Sie: Welche Entscheidung würde sich wegen ihr ändern? Wenn keine, ist sie Dekoration.") },
  })[id];

export function GoodVsWeak() {
  const [sel, setSel] = useState<Mistake | null>(null);
  return (
    <Diagram label={tt("Two persona cards and the four mistakes of the weak one · Exploratory · Case assumption", "Zwei Persona-Karten und die vier Fehler der schwachen · Explorativ · Fallannahme")}>
      <div className="space-y-3">
        <ThePoint>{tt("A useful persona rests on data, differs from the other personas, and is used in decisions. Clichés and personas for everyone are the typical failures.", "Eine brauchbare Persona beruht auf Daten, unterscheidet sich von den anderen Personas und wird in Entscheidungen genutzt. Klischees und Personas für alle sind die typischen Fehler.")}</ThePoint>
        <div className={"mx-auto grid max-w-[640px] gap-3 sm:grid-cols-2"}>
          <div>
            <PersonaCard kind="weak" />
            <p className="mt-1 text-caption font-bold text-ink">{tt("A weak persona", "Eine schwache Persona")}</p>
          </div>
          <div>
            <PersonaCard kind="useful" />
            <p className="mt-1 text-caption font-bold text-ink">{tt("A useful persona", "Eine brauchbare Persona")}</p>
          </div>
        </div>
        <div role="radiogroup" aria-label={tt("A mistake of the weak persona", "Ein Fehler der schwachen Persona")} className="grid gap-2 sm:grid-cols-2">
          {MISTAKE_IDS.map((id) => (
            <Btn key={id} on={sel === id} onClick={() => { setSel(id); }}>
              {mistakeText(id).name}
            </Btn>
          ))}
        </div>
        <Insight>
          {sel
            ? tt(`In plain words: the mistake “${mistakeText(sel).name}” is what the weak card does. A useful persona does this instead: ${mistakeText(sel).instead}`, `In einfachen Worten: Der Fehler „${mistakeText(sel).name}“ ist das, was die schwache Karte tut. Eine brauchbare Persona tut stattdessen dies: ${mistakeText(sel).instead}`)
            : tt("In plain words: select one of the four mistakes to read what a useful persona does instead. Two or three personas are usually enough; more than that and nobody remembers them.", "In einfachen Worten: Wählen Sie einen der vier Fehler, um zu lesen, was eine brauchbare Persona stattdessen tut. Zwei oder drei Personas genügen meist; mehr, und niemand merkt sie sich.")}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A3 · a journey with its emotion curve (interactive) */

type PhaseId = "entry" | "learning" | "progress";
const PH: PhaseId[] = ["entry", "learning", "progress"];
const phaseName = (id: PhaseId) => ({ entry: tt("Entry", "Einstieg"), learning: tt("Learning", "Lernen"), progress: tt("Progress and completion", "Fortschritt und Abschluss") })[id];
const phaseDetail = (id: PhaseId) =>
  ({
    entry: { does: tt("Signs up and opens lesson 1 on her phone.", "Meldet sich an und öffnet Lektion 1 auf dem Handy."), thinks: tt("“This looks fine, I will try.”", "„Das sieht gut aus, ich probiere es.“"), pain: tt("None yet: she arrives with a goal.", "Noch keiner: Sie kommt mit einem Ziel.") },
    learning: { does: tt("Works through lessons 2 and 3 in the evening.", "Arbeitet am Abend Lektion 2 und 3 durch."), thinks: tt("“Twenty minutes is all I have.”", "„Zwanzig Minuten sind alles, was ich habe.“"), pain: tt("A unit needs thirty minutes in one sitting.", "Eine Einheit braucht dreißig Minuten am Stück.") },
    progress: { does: tt("Comes back after three days to finish.", "Kommt nach drei Tagen zurück, um abzuschließen."), thinks: tt("“Where was I?”", "„Wo war ich?“"), pain: tt("No resume: she cannot find where she stopped.", "Kein Fortsetzen: Sie findet ihre Stelle nicht.") },
  })[id];

export function JourneyExplorer() {
  const [em, setEm] = useState<Record<PhaseId, number>>({ entry: 4, learning: 3, progress: 1 });
  const [sel, setSel] = useState<PhaseId>("progress");
  const low = PH.reduce((m, id) => (em[id] < em[m] ? id : m), PH[0]);
  const d = phaseDetail(sel);
  return (
    <Diagram label={tt("A journey map for Mia with its emotion curve · Exploratory · Case assumption (LearnLoop)", "Eine Journey Map für Mia mit ihrer Emotionskurve · Explorativ · Fallannahme (LearnLoop)")}>
      <div className="space-y-3">
        <ThePoint>{tt("A journey map follows one persona through three phases and shows what they do, think and feel. The lowest point of the emotion curve is where the experience breaks, and so where to act first.", "Eine Journey Map folgt einer Persona durch drei Phasen und zeigt, was sie tut, denkt und fühlt. Der tiefste Punkt der Emotionskurve ist, wo das Erlebnis bricht, und damit, wo man zuerst ansetzt.")}</ThePoint>
        <div role="radiogroup" aria-label={tt("A phase of the journey", "Eine Phase der Journey")} className="flex flex-wrap gap-2">
          {PH.map((id) => (
            <Btn key={id} on={sel === id} onClick={() => { setSel(id); }}>{phaseName(id)}</Btn>
          ))}
        </div>
        <div className={"grid items-center gap-3 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"}>
          <EmotionCurve phases={PH.map((id) => ({ id, label: phaseName(id), emotion: em[id] }))} selected={sel} />
          <div className="space-y-1.5 rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
            <p className="smallcaps">{phaseName(sel)}</p>
            <p><span className="font-bold">{tt("Does: ", "Tut: ")}</span><Gloss>{d.does}</Gloss></p>
            <p><span className="font-bold">{tt("Thinks: ", "Denkt: ")}</span>{d.thinks}</p>
            <p><span className="font-bold">{tt("Pain point: ", "Pain Point: ")}</span><Gloss>{d.pain}</Gloss></p>
          </div>
        </div>
        <div role="group" aria-label={tt(`The emotion in the phase ${phaseName(sel)}, from 1 to 5`, `Die Emotion in der Phase ${phaseName(sel)}, von 1 bis 5`)} className="flex flex-wrap items-center gap-2">
          <span className="text-caption font-semibold text-ink">{tt("Emotion in this phase:", "Emotion in dieser Phase:")}</span>
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" aria-pressed={em[sel] === n} onClick={() => { setEm((s) => ({ ...s, [sel]: n })); }} className={clsx("btn btn-sm min-h-[40px] min-w-[40px] border", em[sel] === n ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
              {n}
            </button>
          ))}
          <span className="text-micro normal-case tracking-normal text-ash">{tt("1 very frustrated · 5 very motivated", "1 sehr frustriert · 5 sehr motiviert")}</span>
        </div>
        <Insight>
          {tt(`In plain words: the lowest point is now “${phaseName(low)}” (${em[low]} of 5). That is the phase to act on first, and the one to name in a sentence: what happens to the emotion, and what does the person do next? The scene and the figures are made up for the example.`, `In einfachen Worten: Der tiefste Punkt ist jetzt „${phaseName(low)}“ (${em[low]} von 5). Das ist die Phase, in der man zuerst ansetzt, und die, die man in einem Satz benennt: Was passiert mit der Emotion, und was tut die Person als Nächstes? Die Szene und die Zahlen sind für das Beispiel erfunden.`)}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A4 · two perspectives of one platform (static; Optional card) */

export function TwoPerspectives() {
  const rows: [string, string, string][] = [
    [tt("Wants", "Will"), tt("To finish the course", "Den Kurs abschließen"), tt("To build and run a course with little effort", "Einen Kurs mit wenig Aufwand bauen und durchführen")],
    [tt("First looks at", "Schaut zuerst auf"), tt("Where she stopped, and what is next", "Wo sie aufgehört hat und was als Nächstes kommt"), tt("Who is stuck, and how the course is doing", "Wer feststeckt und wie der Kurs läuft")],
    [tt("Typical frustration", "Typische Frustration"), tt("Loses her place", "Verliert ihre Stelle"), tt("An editor with too many tabs", "Ein Editor mit zu vielen Reitern")],
    [tt("A journey with phases", "Eine Journey mit Phasen"), tt("Entry · learning · progress", "Einstieg · Lernen · Fortschritt"), tt("Set up · run · review", "Einrichten · Durchführen · Auswerten")],
  ];
  return (
    <Diagram
      label={tt("The same platform, two perspectives: the learner and the teacher", "Dieselbe Plattform, zwei Perspektiven: die Lernende und die Lehrende")}
      caption={tt("A platform that serves only one of them fails the other. Each needs its own persona and its own journey, with its own phases.", "Eine Plattform, die nur eine von beiden bedient, lässt die andere im Stich. Jede braucht ihre eigene Persona und ihre eigene Journey mit eigenen Phasen.")}
    >
      <div className="mx-auto grid max-w-[640px] gap-3 sm:grid-cols-2">
        <div>
          <SideScreen kind="learner" />
          <p className="mt-1 text-caption font-bold text-ink">{tt("The learner's view", "Die Sicht der Lernenden")}</p>
        </div>
        <div>
          <SideScreen kind="teacher" />
          <p className="mt-1 text-caption font-bold text-ink">{tt("The teacher's view", "Die Sicht der Lehrenden")}</p>
        </div>
      </div>
      <div className="mx-auto mt-3 max-w-[640px] overflow-x-auto">
        <table className="w-full text-caption">
          <thead>
            <tr className="border-b border-line text-left">
              <th className="py-1 pr-2" />
              <th className="py-1 pr-2">{tt("Learner", "Lernende")}</th>
              <th className="py-1">{tt("Teacher", "Lehrende")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([a, b, c]) => (
              <tr key={a} className="border-b border-line align-top">
                <th className="py-1 pr-2 text-left font-semibold text-ink">{a}</th>
                <td className="py-1 pr-2 text-ink"><Gloss>{b}</Gloss></td>
                <td className="py-1 text-ink"><Gloss>{c}</Gloss></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A5 · LearnLoop weighs three measures along a journey (interactive) */

export function WeighExample() {
  const [sel, setSel] = useState<string | null>(null);
  const rows: GridRow[] = [
    { id: "w1", name: tt("A resume button on every screen", "Ein Fortsetzen-Button auf jedem Bildschirm"), sub: tt("€5,000", "5.000 €"), cells: {
      impact: { level: 3, reason: tt("It removes Mia's lowest point, and many learners return after a break.", "Er beseitigt Mias tiefsten Punkt, und viele Lernende kehren nach einer Pause zurück.") },
      effort: { level: 1, note: tt("€5,000", "5.000 €"), reason: tt("€5,000 is under €8,000: Low.", "5.000 € liegen unter 8.000 €: Niedrig.") },
      risk: { level: 1, reason: tt("A small addition that can be undone.", "Eine kleine Ergänzung, die sich zurücknehmen lässt.") },
    } },
    { id: "w2", name: tt("Five-minute learning formats", "Fünf-Minuten-Lernformate"), sub: tt("€18,000", "18.000 €"), cells: {
      impact: { level: 3, reason: tt("It fits the time-poor learner's situation.", "Es passt zur Situation der Lernenden mit wenig Zeit.") },
      effort: { level: 3, note: tt("€18,000", "18.000 €"), reason: tt("€18,000 is above €15,000: High.", "18.000 € liegen über 15.000 €: Hoch.") },
      risk: { level: 2, reason: tt("Content must be rebuilt, and it uses nearly half the budget.", "Inhalte müssen neu gebaut werden, und es braucht fast das halbe Budget.") },
    } },
    { id: "w3", name: tt("A new course editor for teachers", "Ein neuer Kurseditor für Lehrende"), sub: tt("€26,000", "26.000 €"), cells: {
      impact: { level: 1, reason: tt("Low for Mia, who is a learner; High for teachers, a smaller group.", "Niedrig für Mia, die eine Lernende ist; Hoch für Lehrende, eine kleinere Gruppe.") },
      effort: { level: 3, note: tt("€26,000", "26.000 €"), reason: tt("€26,000 is above €15,000: High.", "26.000 € liegen über 15.000 €: Hoch.") },
      risk: { level: 2, reason: tt("A large project for a smaller group.", "Ein großes Projekt für eine kleinere Gruppe.") },
    } },
  ];
  const cols = [
    { id: "impact", label: tt("User impact (on its persona)", "Nutzerwirkung (auf ihre Persona)") },
    { id: "effort", label: tt("Effort", "Aufwand") },
    { id: "risk", label: tt("Risk", "Risiko") },
  ];
  return (
    <Diagram label={tt("A worked example: LearnLoop weighs three measures along a journey · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei Maßnahmen entlang einer Journey ab · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("Rate a measure for a named persona at a named pain point: how much it helps, how many people that persona stands for, what it costs, and what could go wrong. A measure that touches no pain point has a low impact.", "Bewerten Sie eine Maßnahme für eine benannte Persona an einem benannten Pain Point: wie sehr sie hilft, für wie viele Menschen diese Persona steht, was sie kostet und was schiefgehen könnte. Eine Maßnahme, die keinen Pain Point berührt, hat eine geringe Wirkung.")}</ThePoint>
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {([["resume", tt("A · Resume button", "A · Fortsetzen-Button")], ["formats", tt("B · Five-minute formats", "B · Fünf-Minuten-Formate")], ["editor", tt("C · A new editor", "C · Ein neuer Editor")]] as const).map(([k, name]) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{name}</p>
            </div>
          ))}
        </div>
        <CostBands
          title={tt("LearnLoop, three measures: cost against the effort rule and the €40,000 budget", "LearnLoop, drei Maßnahmen: Kosten gegen die Aufwandsregel und das Budget von 40.000 €")}
          bars={[
            { name: tt("A · Resume button", "A · Fortsetzen-Button"), cost: 5000 },
            { name: tt("B · Five-minute formats", "B · Fünf-Minuten-Formate"), cost: 18000 },
            { name: tt("C · A new editor", "C · Ein neuer Editor"), cost: 26000 },
          ]}
          budget={40000}
          bands={[
            { to: 8000, label: tt("Low", "Niedrig") },
            { to: 15000, label: tt("Mid", "Mittel") },
            { to: null, label: tt("High", "Hoch") },
          ]}
        />
        <OptionGrid label={tt("LearnLoop · budget €40,000, three months", "LearnLoop · Budget 40.000 €, drei Monate")} caption={tt("Three measures for LearnLoop (Case assumption, example company)", "Drei Maßnahmen für LearnLoop (Fallannahme, Beispielunternehmen)")} rows={rows} cols={cols} selected={sel} onSelect={(k) => { setSel(k); }} />
      </div>
    </Diagram>
  );
}
