"use client";

import Link from "next/link";
import { useState } from "react";
import { MeasureThumb, PlatformScreen } from "@/components/day4/mocks";
import type { MeasureKind } from "@/components/day4/mocks";
import { MotivaScreens } from "@/components/day4/Screens";
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
import { BUDGET, CAUSES, EFFORT_RULE, FACTS, FACT_BY_ID, MEASURES, MEASURE_AREA, MEASURE_BY_ID, OPTS, PICK_CAUSES, PICK_MEASURES, PLATFORM_IDS, PRINCIPLES, PRINCIPLE_IDS, REFLECT, WEEKS_LIMIT, effortBand } from "@/data/day4/case";
import type { CauseId, FactId, MeasureId, PlatformId, PrincipleId } from "@/data/day4/case";
import { routeHref } from "@/data/course";
import { causeHolds, sortHolds } from "@/lib/day4/checks";
import { analysisBody } from "@/lib/day4/exportDoc";
import { causeGuide, missingGuide, optWhyGuide, orderGuide, preferGuide, principlesGuide, reasonGuide, reflectGuide } from "@/lib/day4/guides";
import { causeKey, measureKey, optKey, sortKey } from "@/lib/day4/answerKey";
import { IDS, r1Missing } from "@/lib/day4/missing";
import { BLOCK_MINUTES, CORE1_MINUTES, MIN_LINE, MIN_REASON, TASK1_MINUTES } from "@/lib/day4/progress";
import { placeItem, redoSort, toggleCapped, undoSort } from "@/lib/lists";
import type { MissingEntry } from "@/lib/missing";
import { Gloss } from "@/lib/glossify";
import { euro, tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { showCardPart } from "@/store/useCardMore";
import type { D4R1 } from "@/store/dayTypesStd";
import { usePersisted } from "@/store/usePersisted";

/** Day 4 · Route 1 · the UX Analysis File. Core: Block 1.1 (Level 1) and Block 2.2 (Level 2). Optional: 1.2, 1.3, 2.1 (CLAUDE.md #35, #40). */

const DAY = 4;
const useR1 = () => useStdSlice<D4R1>(DAY, 1);

/* ------------------------------------------------------------------ the case */

function CaseBrief() {
  return (
    <section id="case-brief" aria-labelledby="case-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case-h">{tt("The case: MotivaLearn, a platform with low retention", "Der Fall: MotivaLearn, eine Plattform mit niedriger Retention")}</h2>
        <span className="smallcaps">{tt("Read once · about 3 min", "Einmal lesen · ca. 3 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt(
            "MotivaLearn is a learning platform whose learners start courses and then drop out. Learners call the content “boring”, and nothing on the platform shows them that they are making progress. You are part of the UX team. Management wants to know what really motivates learners, and which measures are worth funding.",
            "MotivaLearn ist eine Lernplattform, deren Lernende Kurse beginnen und dann abbrechen. Lernende nennen den Inhalt „langweilig“, und nichts auf der Plattform zeigt ihnen, dass sie vorankommen. Sie gehören zum UX-Team. Die Geschäftsführung will wissen, was Lernende wirklich motiviert und welche Maßnahmen sich zu finanzieren lohnen.",
          )}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("What you have", "Was Sie haben")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt("Two platforms in outline, Platform A (a benchmark) and Platform B (MotivaLearn today), with eight facts (Block 1.1).", "Zwei Plattformen in Umrissen, Plattform A (ein Vergleichswert) und Plattform B (MotivaLearn heute), mit acht Fakten (Block 1.1).")}</li>
            <li>{tt("Three engagement options (optional Block 1.2) and six possible causes (optional Block 2.1).", "Drei Engagement-Optionen (optionaler Block 1.2) und sechs mögliche Ursachen (optionaler Block 2.1).")}</li>
            <li>{tt("Nine measures, each with a cost and weeks (Block 2.2).", "Neun Maßnahmen, jeweils mit Kosten und Wochen (Block 2.2).")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Time: ", "Zeit: ")}
              <strong>{tt(`2 months (${WEEKS_LIMIT} weeks)`, `2 Monate (${WEEKS_LIMIT} Wochen)`)}</strong>
            </li>
            <li>
              {tt("Budget: ", "Budget: ")}
              <strong>{euro(BUDGET)}</strong> <span className="text-ash">{tt("(Case assumption: the plan only says “limited”)", "(Fallannahme: der Plan sagt nur „begrenzt“)")}</span>
            </li>
            <li>{tt("Users drop out early.", "Nutzer brechen früh ab.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · two core blocks, about ${CORE1_MINUTES} min`, `So läuft die Aufgabe · zwei Kernblöcke, ca. ${CORE1_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 1.1: sort eight facts, say which platform is more motivating, write three principles of motivation (Level 1, A2 and A3).", "Block 1.1: acht Fakten sortieren, sagen, welche Plattform mehr motiviert, drei Prinzipien der Motivation schreiben (Level 1, A2 und A3).")}</li>
            <li>{tt("Block 2.2: choose four of nine measures, rate them, order them, justify and name what is missing (Level 2, A5).", "Block 2.2: vier von neun Maßnahmen wählen, bewerten, ordnen, begründen und nennen, was fehlt (Level 2, A5).")}</li>
          </ol>
          <p className="mt-1 text-ash">{tt(`Three more blocks (about ${TASK1_MINUTES - CORE1_MINUTES} min) are optional and folded.`, `Drei weitere Blöcke (ca. ${TASK1_MINUTES - CORE1_MINUTES} Min.) sind optional und eingeklappt.`)}</p>
        </div>
      </div>
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>
          {tt(
            "The brief says: learners start courses but drop out, the content is perceived as boring, no visible progress, a limited budget, two months. Platform A has a progress bar, small successes visible and short tasks; Platform B has long content, no feedback and unclear goals. Everything else is made up for this exercise: the drawings, the €40,000, and the costs and weeks of the measures.",
            "Der Auftrag sagt: Lernende beginnen Kurse, brechen aber ab, der Inhalt wird als langweilig empfunden, kein sichtbarer Fortschritt, ein begrenztes Budget, zwei Monate. Plattform A hat einen Fortschrittsbalken, sichtbare kleine Erfolge und kurze Aufgaben; Plattform B hat langen Inhalt, kein Feedback und unklare Ziele. Alles andere ist für diese Übung erfunden: die Zeichnungen, die 40.000 € sowie die Kosten und Wochen der Maßnahmen.",
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

const MEASURE_THUMB: Record<MeasureId, MeasureKind> = { m1: "progress", m2: "tasks", m3: "goals", m4: "feedback", m5: "points", m6: "leaderboard", m7: "streak", m8: "coupon", m9: "look" };
const OPT_THUMB: Record<string, MeasureKind> = { A: "gamified", B: "progress", C: "tasks" };

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
  impact: { label: tt("Motivation impact", "Motivationswirkung"), help: tt("How much it supports lasting motivation for the learners who are leaving.", "Wie sehr sie dauerhafte Motivation für die Lernenden stützt, die gehen.") },
  riskHelp: tt("How it could backfire: overjustification, pressure, manipulation.", "Wie sie nach hinten losgehen könnte: Overjustification, Druck, Manipulation."),
  refs: ["A5", "A2", "A3"],
  title: tt("Block 2.2 · Four measures, rated, ordered and justified", "Block 2.2 · Vier Maßnahmen, bewertet, geordnet und begründet"),
  findIt: tt("Route 1 → Task 1 → the nine measures in the list directly below, each with its printed cost and weeks. Answer in the list, the rating rows and the fields under it.", "Route 1 → Task 1 → die neun Maßnahmen in der Liste direkt darunter, jeweils mit gedruckten Kosten und Wochen. Antworten Sie in der Liste, den Bewertungszeilen und den Feldern darunter."),
  listLabel: tt("Measures MotivaLearn could fund", "Maßnahmen, die MotivaLearn finanzieren könnte"),
  evidenceNote: tt("The facts of Block 1.1 and the case brief are your evidence. Effort follows the printed cost, by the rule in Materi A5.", "Die Fakten aus Block 1.1 und der Fall sind Ihre Belege. Der Aufwand folgt den gedruckten Kosten, nach der Regel in Materi A5."),
  reasonHelp: tt(`One or two sentences: which printed fact it answers, and how it could backfire. At least ${MIN_REASON} characters.`, `Ein bis zwei Sätze: welchen gedruckten Fakt sie beantwortet und wie sie nach hinten losgehen könnte. Mindestens ${MIN_REASON} Zeichen.`),
  orderWhyHelp: tt(`A reason for position one: the learner's problem it answers, the cost, or what the others depend on. Perceived progress is the strongest motivator. At least ${MIN_LINE} characters.`, `Ein Grund für Platz eins: das Problem der Lernenden, das sie beantwortet, die Kosten oder wovon die anderen abhängen. Wahrgenommener Fortschritt ist der stärkste Motivator. Mindestens ${MIN_LINE} Zeichen.`),
  ids: { pick: IDS.measurePick, measure: IDS.measure, reason: IDS.reason, pain: IDS.pain, order: IDS.order, orderWhy: IDS.orderWhy, missingInfo: IDS.missingInfo },
  guides: { reason: (id) => reasonGuide(id), order: orderGuide, missing: missingGuide },
  key: measureKey,
});

const optionsCfg = (): OptionsCfg => ({
  day: DAY,
  options: OPTS.map((o) => ({ id: o.id, name: o.name, cost: o.cost, weeks: o.weeks })),
  criteria: [
    { label: tt("Motivation impact", "Motivationswirkung"), help: tt("How much it supports lasting motivation.", "Wie sehr sie dauerhafte Motivation stützt.") },
    { label: tt("Effort", "Aufwand"), help: tt("By the printed cost, with the rule in Materi A5.", "Nach den gedruckten Kosten, mit der Regel in Materi A5.") },
    { label: tt("Risk", "Risiko"), help: tt("How it could backfire.", "Wie sie nach hinten losgehen könnte.") },
  ],
  effortBand,
  effortRule: tt(EFFORT_RULE().en, EFFORT_RULE().de),
  title: tt("Block 1.2 · Choose an engagement strategy: three options", "Block 1.2 · Eine Engagement-Strategie wählen: drei Optionen"),
  findIt: tt("Route 1 → Task 1 → the three options below, each with its printed cost and weeks. Rate each one, put them in order, and say which has a lasting effect.", "Route 1 → Task 1 → die drei Optionen darunter, jeweils mit gedruckten Kosten und Wochen. Bewerten Sie jede, ordnen Sie sie und sagen Sie, welche nachhaltig wirkt."),
  refs: ["A5"],
  intro: <p>{tt(`You are to increase motivation on a learning platform. The budget is limited (${euro(BUDGET)}, Case assumption), users drop out early, and you have two months. Effort follows the printed cost, by the rule in Materi A5.`, `Sie sollen die Motivation auf einer Lernplattform steigern. Das Budget ist begrenzt (${euro(BUDGET)}, Fallannahme), Nutzer brechen früh ab, und Sie haben zwei Monate. Der Aufwand folgt den gedruckten Kosten, nach der Regel in Materi A5.`)}</p>,
  orderHelp: tt("The first is the one you would do first. Move one up or down with the arrows.", "Die erste ist die, die Sie zuerst machen würden. Verschieben Sie eine mit den Pfeilen nach oben oder unten."),
  whyLabel: tt("Which measure has a lasting effect, and why?", "Welche Maßnahme wirkt nachhaltig, und warum?"),
  whyHelp: tt(`One or two sentences: say what remains after a reward would stop. At least ${MIN_LINE} characters.`, `Ein bis zwei Sätze: Sagen Sie, was bleibt, wenn eine Belohnung wegfiele. Mindestens ${MIN_LINE} Zeichen.`),
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
      title={tt("Block 1.1 · Two platforms: what motivates a learner?", "Block 1.1 · Zwei Plattformen: Was motiviert eine Lernende?")}
      kind="OBJECTIVE + JUDGED"
      core
      minutes={BLOCK_MINUTES["1.1"]}
      findIt={tt("Route 1 → Task 1 → the four drawn screens directly below, then the sort board with the eight facts. Answer on the board, then in the fields under it.", "Route 1 → Task 1 → die vier gezeichneten Bildschirme direkt darunter, dann die Sortiertafel mit den acht Fakten. Antworten Sie auf der Tafel, dann in den Feldern darunter.")}
    >
      <MaterialRefs refs={["A2", "A3"]} />
      <MotivaScreens />
      <PlacementBoard<PrincipleId>
        items={FACTS.map((f) => ({ id: f.id, meta: `${f.no} · ${f.where}`, text: f.text }))}
        bins={PRINCIPLE_IDS.map((id) => ({ id, label: PRINCIPLES[id].label, hint: PRINCIPLES[id].hint }))}
        value={r.sort}
        onPlace={(id, bin) => patch((s) => placeItem<PrincipleId, D4R1>(s, id, bin))}
        onUndo={() => patch((s) => undoSort<PrincipleId, D4R1>(s))}
        onRedo={() => patch((s) => redoSort<PrincipleId, D4R1>(s))}
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
        intro={tt("Drag a fact onto the principle it belongs to, or select it and then a principle. Select a placed one to move it again. One principle per fact: Visible progress, Activation, Clear goals or Feedback.", "Ziehen Sie einen Fakt auf das Prinzip, zu dem er gehört, oder wählen Sie ihn und dann ein Prinzip. Wählen Sie einen platzierten, um ihn zu verschieben. Ein Prinzip pro Fakt: Sichtbarer Fortschritt, Aktivierung, Klare Ziele oder Feedback.")}
        tests={
          <RevealHint id="sort-tests" label={tt("Show the test questions", "Testfragen zeigen")} title={tt("Test questions · taught in Materi A2 and A3", "Testfragen · aus Materi A2 und A3")}>
            <div className="space-y-2 text-caption text-ink">
              <p>{tt("Ask these of every fact. They repeat the four principles; they never say which fact goes where.", "Stellen Sie diese Fragen zu jedem Fakt. Sie wiederholen die vier Prinzipien; sie sagen nie, welcher Fakt wohin gehört.")}</p>
              <ul className="space-y-1.5">
                {PRINCIPLE_IDS.map((a) => (
                  <li key={a}>
                    <span className="font-semibold">{PRINCIPLES[a].label}. </span>
                    <Gloss>{PRINCIPLES[a].test}</Gloss>
                  </li>
                ))}
              </ul>
              <MaterialRefs refs={["A2", "A3"]} lead={tt("Taught in", "Gelehrt in")} />
            </div>
          </RevealHint>
        }
      />
      <Field id={IDS.prefer} label={tt("Which platform is more motivating?", "Welche Plattform motiviert mehr?")} help={tt("Choose one. Both are drawn above; the next field asks why.", "Wählen Sie eine. Beide sind oben gezeichnet; das nächste Feld fragt, warum.")}>
        <OptionList<PlatformId>
          options={PLATFORM_IDS.map((p) => ({ id: p, label: tt(`Platform ${p}`, `Plattform ${p}`), sub: p === "A" ? tt("the benchmark", "der Vergleichswert") : tt("MotivaLearn today", "MotivaLearn heute"), visual: <PlatformScreen kind={p === "A" ? "aCourse" : "bCourse"} /> }))}
          value={r.prefer}
          onChange={(id) => patch({ prefer: id })}
          label={tt("The more motivating platform", "Die motivierendere Plattform")}
          cols={2}
        />
      </Field>
      <TextBox
        id={IDS.preferWhy}
        label={tt("Why? What can you, as a learner, see, do or feel on that platform that you cannot on the other?", "Warum? Was können Sie als Lernende auf dieser Plattform sehen, tun oder fühlen, was auf der anderen nicht geht?")}
        help={tt(`Write it from the learner's side (“I can see…”, “I do…”). At least ${MIN_LINE} characters.`, `Schreiben Sie es aus der Sicht der Lernenden („Ich sehe …“, „Ich tue …“). Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.preferWhy}
        onChange={(v) => patch({ preferWhy: v })}
        min={MIN_LINE}
        rows={4}
      >
        <WritingHelp
          id="prefer-kit"
          refs={[
            { label: tt("The four principles (Materi A2)", "Die vier Prinzipien (Materi A2)"), value: tt("progress · doing · goal · result", "Fortschritt · Tun · Ziel · Ergebnis"), target: "mat-A2", before: () => showCardPart("A2", "rules") },
            { label: tt("The facts on the two platforms", "Die Fakten zu den beiden Plattformen"), value: tt("facts 1 to 8", "Fakten 1 bis 8"), target: IDS.fact("f1") },
          ]}
          steps={[
            tt("Start with “On Platform … I can see…” and name one thing that is on that platform.", "Beginnen Sie mit „Auf Plattform … sehe ich …“ und nennen Sie etwas, das auf dieser Plattform ist."),
            tt("Say what is missing on the other platform and what that would do to you as a learner.", "Sagen Sie, was auf der anderen Plattform fehlt und was das mit Ihnen als Lernende machen würde."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="prefer-example" guide={preferGuide()} />
      {mentor && <MentorGuide guide={preferGuide()} />}
      {[0, 1, 2].map((i) => (
        <TextBox
          key={i}
          id={IDS.principle(i)}
          label={tt(`Principle of motivation ${i + 1}`, `Prinzip der Motivation ${i + 1}`)}
          help={tt(`One sentence with a reason: “Do X, because Y”. Draw it from a difference between the platforms. At least ${MIN_REASON} characters.`, `Ein Satz mit einem Grund: „Tun Sie X, weil Y“. Leiten Sie es aus einem Unterschied zwischen den Plattformen ab. Mindestens ${MIN_REASON} Zeichen.`)}
          value={r.principles[i] ?? ""}
          onChange={(v) => patch((s) => ({ principles: s.principles.map((x, j) => (j === i ? v : x)) }))}
          min={MIN_REASON}
          rows={2}
        />
      ))}
      <ExampleAnswer id="principles-example" guide={principlesGuide()} />
      {mentor && <MentorGuide guide={principlesGuide()} />}
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
      title={tt("Block 2.1 · Three main causes of the motivation problem", "Block 2.1 · Drei Hauptursachen des Motivationsproblems")}
      kind="OBJECTIVE + JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["2.1"]}
      findIt={tt("Route 1 → Task 1 → the case brief above and the eight facts of Block 1.1. Choose three of the six causes below.", "Route 1 → Task 1 → der Fall oben und die acht Fakten aus Block 1.1. Wählen Sie drei der sechs Ursachen unten.")}
    >
      <MaterialRefs refs={["A1", "A2"]} />
      <Field id={IDS.causePick} label={tt(`Choose exactly ${PICK_CAUSES} causes`, `Wählen Sie genau ${PICK_CAUSES} Ursachen`)} help={tt("A cause is something you can point at in the case or in a fact. You have chosen:", "Eine Ursache ist etwas, auf das Sie im Fall oder in einem Fakt zeigen können. Sie haben gewählt:") + ` ${r.causes.length} / ${PICK_CAUSES}`}>
        <OptionList<CauseId>
          options={CAUSES.map((c) => ({ id: c.id, label: c.text }))}
          value={r.causes}
          onChange={(id) => {
            setNote("");
            patch((s) => ({ causes: toggleCapped(s.causes, id, PICK_CAUSES), causeResult: null }));
          }}
          multi
          label={tt("Possible causes", "Mögliche Ursachen")}
          disabledIds={full ? CAUSES.map((c) => c.id) : []}
          onDisabledClick={() => setNote(tt(`You have ${PICK_CAUSES}. Deselect one first.`, `Sie haben ${PICK_CAUSES}. Wählen Sie zuerst eine ab.`))}
        />
        {note && <p role="status" className="text-caption text-ash">{note}</p>}
        <CheckBar onCheck={() => patch((s) => ({ checks: s.checks + 1, causeResult: causeHolds(s.causes) }))} checkLabel={tt("Check my causes", "Meine Ursachen prüfen")} clueShown={r.causeClue} onClue={() => patch({ causeClue: true })} checks={r.checks} />
        {r.causeResult && <Reading>{r.causeResult.chosen === 0 ? tt("Nothing chosen yet.", "Noch nichts gewählt.") : tt(`${r.causeResult.holds} of ${r.causeResult.chosen} chosen causes hold. It never says which.`, `${r.causeResult.holds} von ${r.causeResult.chosen} gewählten Ursachen stimmen. Es sagt nie, welche.`)}</Reading>}
        {r.causeClue && <Reading label={tt("Clue", "Hinweis")}>{tt("For each cause, find a printed line in the case or a fact that supports it. Ask also whether it is something the learner can see or do, or only something nobody mentioned.", "Suchen Sie für jede Ursache eine gedruckte Zeile im Fall oder einen Fakt, der sie stützt. Fragen Sie auch, ob die Lernende es sehen oder tun kann oder ob es nur etwas ist, das niemand erwähnt hat.")}</Reading>}
      </Field>
      <TextBox id={IDS.causeWhy} label={tt("Which printed fact supports your first cause?", "Welche gedruckte Tatsache stützt Ihre erste Ursache?")} help={tt(`Quote a line of the case or point at a fact by its number. At least ${MIN_LINE} characters.`, `Zitieren Sie eine Zeile des Falls oder zeigen Sie auf einen Fakt mit seiner Nummer. Mindestens ${MIN_LINE} Zeichen.`)} value={r.causeWhy} onChange={(v) => patch({ causeWhy: v })} min={MIN_LINE} rows={2} />
      <ExampleAnswer id="cause-example" guide={causeGuide()} />
      {mentor && <MentorGuide guide={causeGuide()} />}
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
        <h2 id="task1-h">{tt("UX Analysis File: recognise motivation, choose the measures", "UX Analysis File: Motivation erkennen, die Maßnahmen wählen")}</h2>
      </header>
      <CaseBrief />
      <PartHeading id="part-1" n={1} title={tt("Recognise motivation", "Motivation erkennen")} level={tt("Level 1 · Knowledge", "Level 1 · Wissen")} />
      <Block11 missing={missing} />
      <OptionalSection id="block-1-2" title={tt("Block 1.2 · Choose an engagement strategy: three options", "Block 1.2 · Eine Engagement-Strategie wählen: drei Optionen")} minutes={BLOCK_MINUTES["1.2"]} reason={tt("Practises the three ratings at small scale; Block 2.2 is answered without it.", "Übt die drei Bewertungen im Kleinen; Block 2.2 wird auch ohne ihn beantwortet.")}>
        <OptionsBlock cfg={optionsCfg()} missing={missing} />
      </OptionalSection>
      <OptionalSection id="block-1-3" title={tt("Block 1.3 · Coaching reflection: motivation can be designed, but it is not trivial", "Block 1.3 · Coaching-Reflexion: Motivation lässt sich gestalten, ist aber nicht trivial")} minutes={BLOCK_MINUTES["1.3"]} reason={tt("A reflective bridge between the two levels; your notes appear in the file, and no Core block needs them.", "Eine reflektierende Brücke zwischen den beiden Levels; Ihre Notizen erscheinen in der Datei, und kein Kernblock braucht sie.")}>
        <ReflectBlock
          cfg={{
            day: DAY,
            title: tt("Block 1.3 · Coaching reflection: motivation can be designed, but it is not trivial", "Block 1.3 · Coaching-Reflexion: Motivation lässt sich gestalten, ist aber nicht trivial"),
            point: tt("The coaching point of the plan: motivation is not the same as gamification; engagement arises from structure, not only from rewards; UX can also demotivate.", "Der Coaching-Punkt des Plans: Motivation ist nicht dasselbe wie Gamification; Engagement entsteht aus Struktur, nicht nur aus Belohnungen; UX kann auch demotivieren."),
            questions: REFLECT.map((q) => ({ k: q.k, q: q.q })),
            guide: reflectGuide,
          }}
          missing={missing}
        />
      </OptionalSection>
      <PartHeading id="part-2" n={2} title={tt("Choose measures within the limits", "Maßnahmen innerhalb der Grenzen wählen")} level={tt("Level 2 · Application", "Level 2 · Anwendung")} />
      <OptionalSection id="block-2-1" title={tt("Block 2.1 · Three main causes of the motivation problem", "Block 2.1 · Drei Hauptursachen des Motivationsproblems")} minutes={BLOCK_MINUTES["2.1"]} reason={tt("Practises pointing at a printed fact for a cause; Block 2.2 reads the facts, not this block.", "Übt, für eine Ursache auf einen gedruckten Fakt zu zeigen; Block 2.2 liest die Fakten, nicht diesen Block.")}>
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
