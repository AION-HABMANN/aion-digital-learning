"use client";

import Link from "next/link";
import { useState } from "react";
import { MeasureThumb } from "@/components/day5/mocks";
import type { MeasureKind } from "@/components/day5/mocks";
import { LearnBaseScreens } from "@/components/day5/Screens";
import { MeasuresBlock } from "@/components/dayStd/MeasuresBlock";
import type { MeasuresCfg } from "@/components/dayStd/MeasuresBlock";
import { OptionsBlock } from "@/components/dayStd/OptionsBlock";
import type { OptionsCfg } from "@/components/dayStd/OptionsBlock";
import { ReflectBlock } from "@/components/dayStd/ReflectBlock";
import { useStdSlice } from "@/components/dayStd/useStd";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { ExportBar } from "@/components/ui/ExportBar";
import { Field } from "@/components/ui/Field";
import { CheckBar, OptionList, Reading, TextBox } from "@/components/ui/Inputs";
import { Callout } from "@/components/ui/MaterialCard";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { PlacementBoard } from "@/components/ui/PlacementBoard";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { BUDGET, CAUSES, EFFORT_RULE, FACTS, FACT_BY_ID, FACT_IDS, MEASURES, MEASURE_AREA, MISTAKES, MISTAKE_IDS, OPTS, PICK_CAUSES, PICK_MEASURES, PROBLEM_BY_ID, REFLECT, WEEKS_LIMIT, effortBand } from "@/data/day5/case";
import type { FactId, MeasureId, MistakeId, ProblemId } from "@/data/day5/case";
import { routeHref } from "@/data/course";
import { causeHolds, sortHolds } from "@/lib/day5/checks";
import { analysisBody } from "@/lib/day5/exportDoc";
import { causeKey, measureKey, optKey, sortKey } from "@/lib/day5/answerKey";
import { errorGuide, expectationsGuide, goalGuide, missingGuide, optWhyGuide, orderGuide, reasonGuide, reflectGuide, worstGuide } from "@/lib/day5/guides";
import { IDS, r1Missing } from "@/lib/day5/missing";
import { BLOCK_MINUTES, CORE1_MINUTES, MIN_FRAME, MIN_LINE, MIN_REASON, MIN_ROW, TASK1_MINUTES } from "@/lib/day5/progress";
import { placeItem, redoSort, toggleCapped, undoSort } from "@/lib/lists";
import type { MissingEntry } from "@/lib/missing";
import { Gloss } from "@/lib/glossify";
import { euro, tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { showCardPart } from "@/store/useCardMore";
import type { D5R1 } from "@/store/dayTypesStd";
import { usePersisted } from "@/store/usePersisted";

/** Day 5 · Route 1 · the UX Analysis File. Core: Block 1.1 (Level 1) and Block 2.2 (Level 2). Optional: 1.2, 1.3, 2.1 (CLAUDE.md #35, #40). */

const DAY = 5;
const useR1 = () => useStdSlice<D5R1>(DAY, 1);

/* ------------------------------------------------------------------ the case */

function CaseBrief() {
  return (
    <section id="case-brief" aria-labelledby="case-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case-h">{tt("The case: LearnBase, a platform with many functions and low usage", "Der Fall: LearnBase, eine Plattform mit vielen Funktionen und geringer Nutzung")}</h2>
        <span className="smallcaps">{tt("Read once · about 3 min", "Einmal lesen · ca. 3 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt(
            "LearnBase is a learning platform with many functions, and few people use them. Learners cannot find the content they need, they are frustrated, and satisfaction is falling. The platform follows the logic of its system, not the logic of its users, and gives no clear guidance. Management still demands growth. You are part of the UX team and asked to see the platform through the learner's eyes and to say which measures are worth funding.",
            "LearnBase ist eine Lernplattform mit vielen Funktionen, und nur wenige nutzen sie. Lernende finden den Inhalt nicht, den sie brauchen, sie sind frustriert, und die Zufriedenheit sinkt. Die Plattform folgt der Logik ihres Systems, nicht der Logik ihrer Nutzer, und gibt keine klare Führung. Das Management verlangt trotzdem Wachstum. Sie gehören zum UX-Team und sollen die Plattform mit den Augen der Lernenden sehen und sagen, welche Maßnahmen sich zu finanzieren lohnen.",
          )}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("What you have", "Was Sie haben")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt("Four LearnBase screens in outline, with eight facts about them (Block 1.1).", "Vier LearnBase-Bildschirme in Umrissen, mit acht Fakten dazu (Block 1.1).")}</li>
            <li>{tt("Three goals to weigh (optional Block 1.2) and seven user problems (optional Block 2.1).", "Drei Ziele zum Abwägen (optionaler Block 1.2) und sieben Nutzerprobleme (optionaler Block 2.1).")}</li>
            <li>{tt("Nine measures, each with a cost and weeks (Block 2.2).", "Neun Maßnahmen, jeweils mit Kosten und Wochen (Block 2.2).")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Time: ", "Zeit: ")}
              <strong>{tt(`${WEEKS_LIMIT} weeks`, `${WEEKS_LIMIT} Wochen`)}</strong> <span className="text-ash">{tt("(Case assumption)", "(Fallannahme)")}</span>
            </li>
            <li>
              {tt("Budget: ", "Budget: ")}
              <strong>{euro(BUDGET)}</strong> <span className="text-ash">{tt("(Case assumption: the plan only says “limited”)", "(Fallannahme: der Plan sagt nur „begrenzt“)")}</span>
            </li>
            <li>{tt("Management demands growth.", "Das Management verlangt Wachstum.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · two core blocks, about ${CORE1_MINUTES} min`, `So läuft die Aufgabe · zwei Kernblöcke, ca. ${CORE1_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 1.1: write your goal as a learner, sort eight facts into three mistakes, say which frustrates you most, write three expectations (Level 1, A2 and A3).", "Block 1.1: Ihr Ziel als Lernende schreiben, acht Fakten in drei Fehler sortieren, sagen, welcher Sie am meisten frustriert, drei Erwartungen schreiben (Level 1, A2 und A3).")}</li>
            <li>{tt("Block 2.2: choose four of nine measures, rate them, order them, justify and name what is missing (Level 2, A5).", "Block 2.2: vier von neun Maßnahmen wählen, bewerten, ordnen, begründen und nennen, was fehlt (Level 2, A5).")}</li>
          </ol>
          <p className="mt-1 text-ash">{tt(`Three more blocks (about ${TASK1_MINUTES - CORE1_MINUTES} min) are optional and folded.`, `Drei weitere Blöcke (ca. ${TASK1_MINUTES - CORE1_MINUTES} Min.) sind optional und eingeklappt.`)}</p>
        </div>
      </div>
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>
          {tt(
            "The brief says: many functions but low usage, learners cannot find content, high frustration, system logic instead of user logic, no clear guidance, unclear navigation, a limited budget, falling satisfaction, management demands growth. Everything else is made up for this exercise: the drawings, the numbers on them, the €40,000, the 13 weeks, and the costs and weeks of the measures.",
            "Der Auftrag sagt: viele Funktionen, aber geringe Nutzung, Lernende finden Inhalte nicht, hohe Frustration, Systemlogik statt Nutzerlogik, keine klare Führung, unklare Navigation, ein begrenztes Budget, sinkende Zufriedenheit, das Management verlangt Wachstum. Alles andere ist für diese Übung erfunden: die Zeichnungen, die Zahlen darauf, die 40.000 €, die 13 Wochen sowie die Kosten und Wochen der Maßnahmen.",
          )}
        </p>
      </Callout>
    </section>
  );
}

function PartHeading({ id, n, title, level }: { id: string; n: number; title: string; level: string }) {
  return (
    <div id={id} className="flex flex-wrap items-baseline gap-x-3 border-b-2 border-ink pb-1 pt-2">
      <span className="smallcaps text-accent">{tt(`Part ${n}`, `Teil ${n}`)}</span>
      <h2>{title}</h2>
      <span className="smallcaps ml-auto">{level}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ the shared blocks' configuration */

const MEASURE_THUMB: Record<MeasureId, MeasureKind> = { m1: "nav", m2: "simplify", m3: "core", m4: "structure", m5: "language", m6: "features", m7: "courses", m8: "campaign", m9: "research" };
const OPT_THUMB: Record<string, MeasureKind> = { A: "courses", B: "nav", C: "features" };

const measuresCfg = (): MeasuresCfg => ({
  day: DAY,
  measures: MEASURES.map((m) => ({ id: m.id, no: m.no, name: m.name, what: m.what, notice: m.notice, cost: m.cost, weeks: m.weeks, area: m.area })),
  areaLabel: (a) => MEASURE_AREA[a as keyof typeof MEASURE_AREA],
  thumb: (id) => <MeasureThumb kind={MEASURE_THUMB[id as MeasureId]} />,
  budget: BUDGET,
  weeksLimit: WEEKS_LIMIT,
  pick: PICK_MEASURES,
  effortBand,
  effortRule: tt(EFFORT_RULE().en, EFFORT_RULE().de),
  impact: { label: tt("User value", "Nutzerwert"), help: tt("How much it helps learners reach their goal.", "Wie sehr sie Lernenden hilft, ihr Ziel zu erreichen.") },
  riskHelp: tt("What could go wrong or be lost.", "Was schiefgehen oder verloren gehen könnte."),
  refs: ["A5", "A3", "A1"],
  title: tt("Block 2.2 · Four measures, rated, ordered and justified", "Block 2.2 · Vier Maßnahmen, bewertet, geordnet und begründet"),
  findIt: tt("Route 1 → Task 1 → the nine measures in the list directly below, each with its printed cost and weeks. Answer in the list, the rating rows and the fields under it.", "Route 1 → Task 1 → die neun Maßnahmen in der Liste direkt darunter, jeweils mit gedruckten Kosten und Wochen. Antworten Sie in der Liste, den Bewertungszeilen und den Feldern darunter."),
  listLabel: tt("Measures LearnBase could fund", "Maßnahmen, die LearnBase finanzieren könnte"),
  evidenceNote: tt("The facts of Block 1.1 and the case brief are your evidence. Effort follows the printed cost, by the rule in Materi A5.", "Die Fakten aus Block 1.1 und der Fall sind Ihre Belege. Der Aufwand folgt den gedruckten Kosten, nach der Regel in Materi A5."),
  reasonHelp: tt(`One or two sentences: which printed fact it answers, and what could go wrong. At least ${MIN_REASON} characters.`, `Ein bis zwei Sätze: welchen gedruckten Fakt sie beantwortet und was schiefgehen könnte. Mindestens ${MIN_REASON} Zeichen.`),
  orderWhyHelp: tt(`A reason for position one: the learner's problem it answers, what the business gets, or what the others depend on. At least ${MIN_LINE} characters.`, `Ein Grund für Platz eins: das Problem der Lernenden, das sie beantwortet, was das Unternehmen bekommt oder wovon die anderen abhängen. Mindestens ${MIN_LINE} Zeichen.`),
  ids: { pick: IDS.measurePick, measure: IDS.measure, reason: IDS.reason, pain: IDS.pain, order: IDS.order, orderWhy: IDS.orderWhy, missingInfo: IDS.missingInfo },
  guides: { reason: (id) => reasonGuide(id), order: orderGuide, missing: missingGuide },
  key: measureKey,
});

const optionsCfg = (): OptionsCfg => ({
  day: DAY,
  options: OPTS.map((o) => ({ id: o.id, name: o.name, cost: o.cost, weeks: o.weeks })),
  criteria: [
    { label: tt("User value", "Nutzerwert"), help: tt("How much it helps learners reach their goal.", "Wie sehr sie Lernenden hilft, ihr Ziel zu erreichen.") },
    { label: tt("Business value", "Unternehmenswert"), help: tt("How much it gives the business: growth, retention, lower cost.", "Wie viel sie dem Unternehmen gibt: Wachstum, Retention, niedrigere Kosten.") },
    { label: tt("Risk", "Risiko"), help: tt("What could go wrong or be lost.", "Was schiefgehen oder verloren gehen könnte.") },
  ],
  effortBand,
  effortRule: tt(EFFORT_RULE().en, EFFORT_RULE().de),
  judgedSecond: true,
  title: tt("Block 1.2 · User-centredness against business goals: three options", "Block 1.2 · Nutzerzentrierung gegen Geschäftsziele: drei Optionen"),
  findIt: tt("Route 1 → Task 1 → the three options below, each with its printed cost and weeks. Rate each one, put them in order, and justify your decision.", "Route 1 → Task 1 → die drei Optionen darunter, jeweils mit gedruckten Kosten und Wochen. Bewerten Sie jede, ordnen Sie sie und begründen Sie Ihre Entscheidung."),
  refs: ["A5", "A1"],
  intro: <p>{tt(`Three goals compete on LearnBase: add more content (a business goal), simplify the navigation (a UX goal) or develop new features (a marketing goal). Rate each on user value, business value and risk, and weigh them against the budget (${euro(BUDGET)}, Case assumption).`, `Drei Ziele konkurrieren bei LearnBase: mehr Inhalt hinzufügen (ein Geschäftsziel), die Navigation vereinfachen (ein UX-Ziel) oder neue Features entwickeln (ein Marketingziel). Bewerten Sie jedes nach Nutzerwert, Unternehmenswert und Risiko und wägen Sie sie gegen das Budget (${euro(BUDGET)}, Fallannahme) ab.`)}</p>,
  orderHelp: tt("The first is the one you would do first. Move one up or down with the arrows.", "Die erste ist die, die Sie zuerst machen würden. Verschieben Sie eine mit den Pfeilen nach oben oder unten."),
  whyLabel: tt("Justify your decision: what does the business get from your first priority?", "Begründen Sie Ihre Entscheidung: Was bekommt das Unternehmen von Ihrer ersten Priorität?"),
  whyHelp: tt(`One or two sentences: name what the learner gets and what the business gets. At least ${MIN_LINE} characters.`, `Ein bis zwei Sätze: Nennen Sie, was die Lernende bekommt und was das Unternehmen bekommt. Mindestens ${MIN_LINE} Zeichen.`),
  ids: { order: IDS.optOrder, why: IDS.optWhy },
  guide: optWhyGuide,
  key: optKey,
  thumb: (id) => <MeasureThumb kind={OPT_THUMB[id]} />,
});

/* ------------------------------------------------------------------ Block 1.1 (Core, Level 1) */

export function Block11({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR1();
  return (
    <AnswerBlock
      id="block-1-1"
      title={tt("Block 1.1 · Take the learner's side: goals, eight facts and what frustrates you most", "Block 1.1 · Die Seite der Lernenden einnehmen: Ziele, acht Fakten und was Sie am meisten frustriert")}
      kind="OBJECTIVE + JUDGED"
      core
      minutes={BLOCK_MINUTES["1.1"]}
      findIt={tt("Route 1 → Task 1 → the four drawn screens directly below, then your goal field, the sort board with the eight facts and the fields under it. Answer in the fields and on the board.", "Route 1 → Task 1 → die vier gezeichneten Bildschirme direkt darunter, dann Ihr Zielfeld, die Sortiertafel mit den acht Fakten und die Felder darunter. Antworten Sie in den Feldern und auf der Tafel.")}
    >
      <MaterialRefs refs={["A2", "A3"]} />
      <LearnBaseScreens />
      <TextBox
        id={IDS.goal}
        label={tt("Your goal as a learner: what do you want to do on this platform?", "Ihr Ziel als Lernende: Was wollen Sie auf dieser Plattform tun?")}
        help={tt(`Put yourself in a learner's position. Write one task in everyday words with your situation: the device, the time you have, mandatory or voluntary. At least ${MIN_LINE} characters.`, `Versetzen Sie sich in eine Lernende. Schreiben Sie eine Aufgabe in Alltagsworten mit Ihrer Situation: das Gerät, die Zeit, die Sie haben, verpflichtend oder freiwillig. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.goal}
        onChange={(v) => patch({ goal: v })}
        min={MIN_LINE}
        rows={3}
      >
        <WritingHelp
          id="goal-kit"
          refs={[
            { label: tt("Goals and contexts of use (Materi A2)", "Ziele und Nutzungskontexte (Materi A2)"), value: tt("a task and a situation", "eine Aufgabe und eine Situation"), target: "mat-A2", before: () => showCardPart("A2", "rules") },
          ]}
          steps={[
            tt("Start with “I want to…” and name something a learner does, not a feature.", "Beginnen Sie mit „Ich will …“ und nennen Sie etwas, das eine Lernende tut, kein Feature."),
            tt("Add where, when and why: on a phone or at a desk, in ten minutes or a weekend, mandatory or voluntary.", "Ergänzen Sie wo, wann und warum: auf dem Handy oder am Schreibtisch, in zehn Minuten oder an einem Wochenende, verpflichtend oder freiwillig."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="goal-example" guide={goalGuide()} />
      {mentor && <MentorGuide guide={goalGuide()} />}
      <PlacementBoard<MistakeId>
        items={FACTS.map((f) => ({ id: f.id, meta: `${f.no} · ${f.where}`, text: f.text }))}
        bins={MISTAKE_IDS.map((id) => ({ id, label: MISTAKES[id].label, hint: MISTAKES[id].hint }))}
        value={r.sort}
        onPlace={(id, bin) => patch((s) => placeItem<MistakeId, D5R1>(s, id, bin))}
        onUndo={() => patch((s) => undoSort<MistakeId, D5R1>(s))}
        onRedo={() => patch((s) => redoSort<MistakeId, D5R1>(s))}
        undoCount={r.sortHistory.length}
        redoCount={r.sortFuture.length}
        domId={IDS.fact}
        keyPhrases={Object.fromEntries(FACTS.map((f) => [f.id, f.key]))}
        clues={Object.fromEntries(FACTS.map((f) => [f.id, f.clue]))}
        reasons={Object.fromEntries(FACTS.map((f) => [f.id, f.why]))}
        result={r.sortResult}
        checks={r.sortChecks}
        onCheck={() => patch((s) => ({ sortChecks: s.sortChecks + 1, sortResult: sortHolds(s.sort) }))}
        onClue={() => patch({ sortClue: true })}
        clueShown={r.sortClue}
        reasoningOpened={r.sortReasoning}
        onOpenReasoning={() => patch({ sortReasoning: true })}
        noun={tt("fact", "Fakt")}
        intro={tt("Drag a fact onto the mistake it shows, or select it and then a mistake. Select a placed one to move it again. One mistake per fact: Functions instead of benefits, Overly complex or Missing orientation.", "Ziehen Sie einen Fakt auf den Fehler, den er zeigt, oder wählen Sie ihn und dann einen Fehler. Wählen Sie einen platzierten, um ihn zu verschieben. Ein Fehler pro Fakt: Funktionen statt Nutzen, Übermäßig komplex oder Fehlende Orientierung.")}
        tests={
          <RevealHint id="sort-tests" label={tt("Show the test questions", "Testfragen zeigen")} title={tt("Test questions · taught in Materi A3", "Testfragen · aus Materi A3")}>
            <div className="space-y-2 text-caption text-ink">
              <p>{tt("Ask these of every fact. They repeat the three mistakes; they never say which fact goes where.", "Stellen Sie diese Fragen zu jedem Fakt. Sie wiederholen die drei Fehler; sie sagen nie, welcher Fakt wohin gehört.")}</p>
              <ul className="space-y-1.5">
                {MISTAKE_IDS.map((a) => (
                  <li key={a}>
                    <span className="font-semibold">{MISTAKES[a].label}. </span>
                    <Gloss>{MISTAKES[a].test}</Gloss>
                  </li>
                ))}
              </ul>
              <MaterialRefs refs={["A3"]} lead={tt("Taught in", "Gelehrt in")} />
            </div>
          </RevealHint>
        }
      />
      <Field id={IDS.worst} label={tt("Which fact would frustrate you most as a learner?", "Welcher Fakt würde Sie als Lernende am meisten frustrieren?")} help={tt("Choose one of the eight; the next field asks why.", "Wählen Sie einen der acht; das nächste Feld fragt, warum.")}>
        <OptionList<FactId> options={FACT_IDS.map((id) => ({ id, label: `${FACT_BY_ID[id].no} · ${FACT_BY_ID[id].short}` }))} value={r.worst} onChange={(id) => patch({ worst: id })} label={tt("The most frustrating fact", "Der frustrierendste Fakt")} cols={2} />
      </Field>
      <TextBox
        id={IDS.worstWhy}
        label={tt("What did you expect to see, and what did you see instead?", "Was haben Sie erwartet zu sehen, und was sahen Sie stattdessen?")}
        help={tt(`Write it from the learner's side: “I expected…, I saw…”, and what that costs you. At least ${MIN_LINE} characters.`, `Schreiben Sie es aus der Sicht der Lernenden: „Ich erwartete …, ich sah …“, und was Sie das kostet. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.worstWhy}
        onChange={(v) => patch({ worstWhy: v })}
        min={MIN_LINE}
        rows={3}
      />
      <ExampleAnswer id="worst-example" guide={worstGuide()} />
      {mentor && <MentorGuide guide={worstGuide()} />}
      <TextBox
        id={IDS.expectations}
        label={tt("Three expectations of a good learning platform", "Drei Erwartungen an eine gute Lernplattform")}
        help={tt(`Each starts “I expect…” and says why, tied to your goal or situation. At least ${MIN_FRAME} characters in all.`, `Jede beginnt mit „Ich erwarte …“ und sagt, warum, bezogen auf Ihr Ziel oder Ihre Situation. Mindestens ${MIN_FRAME} Zeichen insgesamt.`)}
        value={r.expectations}
        onChange={(v) => patch({ expectations: v })}
        min={MIN_FRAME}
        rows={5}
      />
      <ExampleAnswer id="expectations-example" guide={expectationsGuide()} />
      {mentor && <MentorGuide guide={expectationsGuide()} />}
      <AnswerKey block={sortKey()} />
      <BlockMissing block="1.1" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 2.1 (Optional) */

export function Block21({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR1();
  const [note, setNote] = useState("");
  const full = r.causes.length >= PICK_CAUSES;
  return (
    <AnswerBlock
      id="block-2-1"
      title={tt("Block 2.1 · Four central user problems and their causes", "Block 2.1 · Vier zentrale Nutzerprobleme und ihre Ursachen")}
      kind="OBJECTIVE + JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["2.1"]}
      findIt={tt("Route 1 → Task 1 → the case brief above and the eight facts of Block 1.1. Choose four of the seven user problems below, then name the design error behind each.", "Route 1 → Task 1 → der Fall oben und die acht Fakten aus Block 1.1. Wählen Sie vier der sieben Nutzerprobleme unten und nennen Sie dann den Designfehler hinter jedem.")}
    >
      <MaterialRefs refs={["A3", "A1"]} />
      <Field id={IDS.causePick} label={tt(`Choose exactly ${PICK_CAUSES} user problems`, `Wählen Sie genau ${PICK_CAUSES} Nutzerprobleme`)} help={tt("A user problem is something a learner meets that you can point at in the case or in a fact. You have chosen:", "Ein Nutzerproblem ist etwas, auf das eine Lernende trifft und auf das Sie im Fall oder in einem Fakt zeigen können. Sie haben gewählt:") + ` ${r.causes.length} / ${PICK_CAUSES}`}>
        <OptionList<ProblemId>
          options={CAUSES.map((c) => ({ id: c.id, label: c.text }))}
          value={r.causes}
          onChange={(id) => {
            setNote("");
            patch((s) => ({ causes: toggleCapped(s.causes, id, PICK_CAUSES), causeResult: null }));
          }}
          multi
          label={tt("Possible user problems", "Mögliche Nutzerprobleme")}
          disabledIds={full ? CAUSES.map((c) => c.id) : []}
          onDisabledClick={() => setNote(tt(`You have ${PICK_CAUSES}. Deselect one first.`, `Sie haben ${PICK_CAUSES}. Wählen Sie zuerst eines ab.`))}
        />
        {note && <p role="status" className="text-caption text-ash">{note}</p>}
        <CheckBar onCheck={() => patch((s) => ({ checks: s.checks + 1, causeResult: causeHolds(s.causes) }))} checkLabel={tt("Check my problems", "Meine Probleme prüfen")} clueShown={r.causeClue} onClue={() => patch({ causeClue: true })} checks={r.checks} />
        {r.causeResult && <Reading>{r.causeResult.chosen === 0 ? tt("Nothing chosen yet.", "Noch nichts gewählt.") : tt(`${r.causeResult.holds} of ${r.causeResult.chosen} chosen problems hold. It never says which.`, `${r.causeResult.holds} von ${r.causeResult.chosen} gewählten Problemen stimmen. Es sagt nie, welche.`)}</Reading>}
        {r.causeClue && <Reading label={tt("Clue", "Hinweis")}>{tt("For each problem, find a printed line in the case or a fact that supports it. Ask also whether it is something a learner meets, or only something nobody mentioned.", "Suchen Sie für jedes Problem eine gedruckte Zeile im Fall oder einen Fakt, der es stützt. Fragen Sie auch, ob eine Lernende darauf trifft oder ob es nur etwas ist, das niemand erwähnt hat.")}</Reading>}
      </Field>
      {r.causes.map((id) => (
        <TextBox
          key={id}
          id={IDS.error(id)}
          label={tt(`The design error behind: “${PROBLEM_BY_ID[id].text}”`, `Der Designfehler hinter: „${PROBLEM_BY_ID[id].text}“`)}
          help={tt(`Name the mistake (names after the software, too many choices, or missing orientation) and the number of the fact that shows it. At least ${MIN_ROW} characters.`, `Nennen Sie den Fehler (Namen nach der Software, zu viele Auswahlmöglichkeiten oder fehlende Orientierung) und die Nummer des Fakts, der ihn zeigt. Mindestens ${MIN_ROW} Zeichen.`)}
          value={r.errors[id] ?? ""}
          onChange={(v) => patch((s) => ({ errors: { ...s.errors, [id]: v } }))}
          min={MIN_ROW}
          rows={2}
        />
      ))}
      <ExampleAnswer id="error-example" guide={errorGuide()} />
      {mentor && <MentorGuide guide={errorGuide()} />}
      <AnswerKey block={causeKey()} />
      <BlockMissing block="2.1" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ the task */

export function Task1() {
  const p = usePersisted();
  const missing = r1Missing(p);
  const filename = exportName(p.participant.name, DAY, 1);
  return (
    <section id="task-1" aria-labelledby="task1-h" className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt("Task 1 · two core blocks, one per level; optional blocks folded", "Task 1 · zwei Kernblöcke, einer pro Level; optionale Blöcke eingeklappt")}</p>
        <h2 id="task1-h">{tt("UX Analysis File: take the learner's side, choose the measures", "UX Analysis File: die Seite der Lernenden einnehmen, die Maßnahmen wählen")}</h2>
      </header>
      <CaseBrief />
      <PartHeading id="part-1" n={1} title={tt("Take the learner's side", "Die Seite der Lernenden einnehmen")} level={tt("Level 1 · Knowledge", "Level 1 · Wissen")} />
      <Block11 missing={missing} />
      <OptionalSection id="block-1-2" title={tt("Block 1.2 · User-centredness against business goals: three options", "Block 1.2 · Nutzerzentrierung gegen Geschäftsziele: drei Optionen")} minutes={BLOCK_MINUTES["1.2"]} reason={tt("Practises the three ratings at small scale; Block 2.2 is answered without it.", "Übt die drei Bewertungen im Kleinen; Block 2.2 wird auch ohne ihn beantwortet.")}>
        <OptionsBlock cfg={optionsCfg()} missing={missing} />
      </OptionalSection>
      <OptionalSection id="block-1-3" title={tt("Block 1.3 · Coaching reflection: user-centredness against business logic", "Block 1.3 · Coaching-Reflexion: Nutzerzentrierung gegen Geschäftslogik")} minutes={BLOCK_MINUTES["1.3"]} reason={tt("A reflective bridge between the two levels; your notes appear in the file, and no Core block needs them.", "Eine reflektierende Brücke zwischen den beiden Levels; Ihre Notizen erscheinen in der Datei, und kein Kernblock braucht sie.")}>
        <ReflectBlock
          cfg={{
            day: DAY,
            title: tt("Block 1.3 · Coaching reflection: user-centredness against business logic", "Block 1.3 · Coaching-Reflexion: Nutzerzentrierung gegen Geschäftslogik"),
            point: tt("The coaching point of the plan: not every decision that looks efficient for the business is good for the user, and UX decisions can be argued in business terms.", "Der Coaching-Punkt des Plans: Nicht jede Entscheidung, die für das Unternehmen effizient aussieht, ist gut für den Nutzer, und UX-Entscheidungen lassen sich in Geschäftsbegriffen begründen."),
            questions: REFLECT.map((q) => ({ k: q.k, q: q.q })),
            guide: reflectGuide,
          }}
          missing={missing}
        />
      </OptionalSection>
      <PartHeading id="part-2" n={2} title={tt("Choose measures within the limits", "Maßnahmen innerhalb der Grenzen wählen")} level={tt("Level 2 · Application", "Level 2 · Anwendung")} />
      <OptionalSection id="block-2-1" title={tt("Block 2.1 · Four central user problems and their causes", "Block 2.1 · Vier zentrale Nutzerprobleme und ihre Ursachen")} minutes={BLOCK_MINUTES["2.1"]} reason={tt("Practises naming the design error behind a problem; Block 2.2 reads the facts, not this block.", "Übt, den Designfehler hinter einem Problem zu benennen; Block 2.2 liest die Fakten, nicht diesen Block.")}>
        <Block21 missing={missing} />
      </OptionalSection>
      <MeasuresBlock cfg={measuresCfg()} missing={missing} />
      <ExportBar
        id="export-l1l2"
        previewTitle={tt("Preview of your UX Analysis File", "Vorschau Ihrer UX Analysis File")}
        exportLabel={tt("Export the UX Analysis File", "UX Analysis File exportieren")}
        docTitle="UX Analysis File"
        filename={filename}
        missing={missing}
        buildBody={() => analysisBody(p)}
      />
      <p className="text-caption text-ash print:hidden">
        {tt("Suggested next: ", "Empfohlen als Nächstes: ")}
        <Link href={routeHref(DAY, 2)} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          {tt("Route 2 · Level 3 →", "Route 2 · Level 3 →")}
        </Link>{" "}
        {tt("It is only a suggestion; nothing is locked.", "Das ist nur eine Empfehlung; nichts ist gesperrt.")}
      </p>
    </section>
  );
}
