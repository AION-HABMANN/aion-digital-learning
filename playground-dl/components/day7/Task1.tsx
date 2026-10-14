"use client";

import Link from "next/link";
import { useState } from "react";
import { MeasureThumb } from "@/components/day7/mocks";
import type { ThumbKind } from "@/components/day7/mocks";
import { InclusiveLearnScreens } from "@/components/day7/Screens";
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
import { BUDGET, CAUSES, EFFORT_RULE, FACTS, FACT_IDS, GROUPS, GROUPS_MIN, MEASURES, MEASURE_AREA, METHODS, OPTS, PICK_CAUSES, PICK_MEASURES, PICK_METHODS, PRINCIPLES, PRINCIPLE_IDS, REFLECT, WEEKS_LIMIT, effortBand } from "@/data/day7/case";
import type { GroupId, MeasureId, MethodId, PrincipleId } from "@/data/day7/case";
import { routeHref } from "@/data/course";
import { causeHolds, sortHolds } from "@/lib/day7/checks";
import { analysisBody } from "@/lib/day7/exportDoc";
import { causeKey, measureKey, optKey, sortKey } from "@/lib/day7/answerKey";
import { causeWhyGuide, groupsGuide, improveGuide, methodsWhyGuide, missingGuide, optWhyGuide, orderGuide, reasonGuide, reflectGuide } from "@/lib/day7/guides";
import { IDS, r1Missing } from "@/lib/day7/missing";
import { BLOCK_MINUTES, CORE1_MINUTES, MIN_FRAME, MIN_LINE, TASK1_MINUTES } from "@/lib/day7/progress";
import { placeItem, redoSort, toggleCapped, toggleList, undoSort } from "@/lib/lists";
import type { MissingEntry } from "@/lib/missing";
import { Gloss } from "@/lib/glossify";
import { euro, tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { showCardPart } from "@/store/useCardMore";
import type { D7R1 } from "@/store/dayTypesStd";
import { usePersisted } from "@/store/usePersisted";

/** Day 7 · Route 1 · the UX Analysis File. Core: Block 1.1 (Level 1) and Block 2.2 (Level 2). Optional: 1.2, 1.3, 2.1 (CLAUDE.md #35, #40). */

const DAY = 7;
const useR1 = () => useStdSlice<D7R1>(DAY, 1);

/* ------------------------------------------------------------------ the case */

function CaseBrief() {
  return (
    <section id="case-brief" aria-labelledby="case-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case-h">{tt("The case: InclusiveLearn, a platform with access problems", "Der Fall: InclusiveLearn, eine Plattform mit Zugangsproblemen")}</h2>
        <span className="smallcaps">{tt("Read once · about 3 min", "Einmal lesen · ca. 3 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt(
            "InclusiveLearn is a learning platform whose content is good, yet usage is low. Users with impairments drop out, and the content is hard to understand. A first analysis points to a lack of accessibility and to no user-centred integration. Complaints are increasing, the budget is limited and time is short. You are part of the UX team and asked to find out who the platform shuts out, and which measures are worth funding.",
            "InclusiveLearn ist eine Lernplattform, deren Inhalt gut ist, deren Nutzung aber gering ist. Nutzer mit Einschränkungen brechen ab, und der Inhalt ist schwer verständlich. Eine erste Analyse weist auf mangelnde Barrierefreiheit und auf fehlende nutzerzentrierte Integration hin. Beschwerden nehmen zu, das Budget ist begrenzt und die Zeit knapp. Sie gehören zum UX-Team und sollen herausfinden, wen die Plattform ausschließt und welche Maßnahmen sich zu finanzieren lohnen.",
          )}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("What you have", "Was Sie haben")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt("Four InclusiveLearn screens in outline, with eight facts about them (Block 1.1).", "Vier InclusiveLearn-Bildschirme in Umrissen, mit acht Fakten dazu (Block 1.1).")}</li>
            <li>{tt("Three options (optional Block 1.2) and seven possible barriers (optional Block 2.1).", "Drei Optionen (optionaler Block 1.2) und sieben mögliche Barrieren (optionaler Block 2.1).")}</li>
            <li>{tt("Nine measures, each with a cost and weeks, and six evaluation methods (Block 2.2).", "Neun Maßnahmen, jeweils mit Kosten und Wochen, und sechs Evaluationsmethoden (Block 2.2).")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Time: ", "Zeit: ")}
              <strong>{tt(`${WEEKS_LIMIT} weeks`, `${WEEKS_LIMIT} Wochen`)}</strong> <span className="text-ash">{tt("(Case assumption: the plan says “high time pressure”)", "(Fallannahme: der Plan sagt „hoher Zeitdruck“)")}</span>
            </li>
            <li>
              {tt("Budget: ", "Budget: ")}
              <strong>{euro(BUDGET)}</strong> <span className="text-ash">{tt("(Case assumption: the plan only says “limited”)", "(Fallannahme: der Plan sagt nur „begrenzt“)")}</span>
            </li>
            <li>{tt("Complaints are rising.", "Die Beschwerden nehmen zu.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · two core blocks, about ${CORE1_MINUTES} min`, `So läuft die Aufgabe · zwei Kernblöcke, ca. ${CORE1_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 1.1: sort eight facts into three principles, name the groups who struggle, write three improvements (Level 1, A1 and A2).", "Block 1.1: acht Fakten in drei Prinzipien sortieren, die Gruppen nennen, die Schwierigkeiten haben, drei Verbesserungen schreiben (Level 1, A1 und A2).")}</li>
            <li>{tt("Block 2.2: choose four of nine measures, rate them, order them, choose three evaluation methods and name what is missing (Level 2, A5).", "Block 2.2: vier von neun Maßnahmen wählen, bewerten, ordnen, drei Evaluationsmethoden wählen und nennen, was fehlt (Level 2, A5).")}</li>
          </ol>
          <p className="mt-1 text-ash">{tt(`Three more blocks (about ${TASK1_MINUTES - CORE1_MINUTES} min) are optional and folded.`, `Drei weitere Blöcke (ca. ${TASK1_MINUTES - CORE1_MINUTES} Min.) sind optional und eingeklappt.`)}</p>
        </div>
      </div>
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>
          {tt(
            "The brief says: users with impairments drop out, content hard to understand, low usage despite good content, a lack of accessibility, no user-centred integration, a small font, complicated language, many steps to operate, a limited budget, rising complaints and high time pressure. Everything else is made up for this exercise: the screens, the numbers on them, the €50,000, the 10 weeks, and the costs and weeks of the measures.",
            "Der Auftrag sagt: Nutzer mit Einschränkungen brechen ab, Inhalt schwer verständlich, geringe Nutzung trotz guten Inhalts, mangelnde Barrierefreiheit, keine nutzerzentrierte Integration, kleine Schrift, komplizierte Sprache, viele Schritte zur Bedienung, ein begrenztes Budget, steigende Beschwerden und hoher Zeitdruck. Alles andere ist für diese Übung erfunden: die Bildschirme, die Zahlen darauf, die 50.000 €, die 10 Wochen sowie die Kosten und Wochen der Maßnahmen.",
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

const MEASURE_THUMB: Record<MeasureId, ThumbKind> = { m1: "language", m2: "keyboard", m3: "contrast", m4: "captions", m5: "testing", m6: "toolbar", m7: "chat", m8: "look", m9: "translate" };
const OPT_THUMB: Record<string, ThumbKind> = { A: "features", B: "structure", C: "a11y" };

const measuresCfg = (afterOrder: React.ReactNode): MeasuresCfg => ({
  day: DAY,
  measures: MEASURES.map((m) => ({ id: m.id, no: m.no, name: m.name, what: m.what, notice: m.notice, cost: m.cost, weeks: m.weeks, area: m.area })),
  areaLabel: (a) => MEASURE_AREA[a as keyof typeof MEASURE_AREA],
  thumb: (id) => <MeasureThumb kind={MEASURE_THUMB[id as MeasureId]} />,
  budget: BUDGET,
  weeksLimit: WEEKS_LIMIT,
  pick: PICK_MEASURES,
  effortBand,
  effortRule: tt(EFFORT_RULE().en, EFFORT_RULE().de),
  impact: { label: tt("User impact", "Nutzerwirkung"), help: tt("How many learners it opens the platform to, and which groups.", "Für wie viele Lernende sie die Plattform öffnet, und welche Gruppen.") },
  riskHelp: tt("What could go wrong, for example that a patch hides a problem without fixing it.", "Was schiefgehen könnte, zum Beispiel dass ein Flicken ein Problem verdeckt, ohne es zu beheben."),
  refs: ["A5", "A2", "A3"],
  title: tt("Block 2.2 · Four measures, rated and ordered, and three evaluation methods", "Block 2.2 · Vier Maßnahmen, bewertet und geordnet, und drei Evaluationsmethoden"),
  findIt: tt("Route 1 → Task 1 → the nine measures in the list directly below, each with its printed cost and weeks, then the six evaluation methods further down. Answer in the lists, the rating rows and the fields under them.", "Route 1 → Task 1 → die neun Maßnahmen in der Liste direkt darunter, jeweils mit gedruckten Kosten und Wochen, dann weiter unten die sechs Evaluationsmethoden. Antworten Sie in den Listen, den Bewertungszeilen und den Feldern darunter."),
  listLabel: tt("Measures InclusiveLearn could fund", "Maßnahmen, die InclusiveLearn finanzieren könnte"),
  evidenceNote: tt("The facts of Block 1.1 and the case brief are your evidence. Effort follows the printed cost, by the rule in Materi A5.", "Die Fakten aus Block 1.1 und der Fall sind Ihre Belege. Der Aufwand folgt den gedruckten Kosten, nach der Regel in Materi A5."),
  reasonHelp: tt(`Which fact it answers (by number), which group it opens the platform to, and what could go wrong. At least ${20} characters.`, `Welchen Fakt sie beantwortet (mit Nummer), für welche Gruppe sie die Plattform öffnet und was schiefgehen könnte. Mindestens ${20} Zeichen.`),
  orderWhyHelp: tt(`A reason for position one: the group it reaches, the cost, or what the others depend on. Accessibility means usage, and usage means success: say how. At least ${MIN_LINE} characters.`, `Ein Grund für Platz eins: die Gruppe, die sie erreicht, die Kosten oder wovon die anderen abhängen. Barrierefreiheit heißt Nutzung, und Nutzung heißt Erfolg: Sagen Sie, wie. Mindestens ${MIN_LINE} Zeichen.`),
  ids: { pick: IDS.measurePick, measure: IDS.measure, reason: IDS.reason, pain: IDS.pain, order: IDS.order, orderWhy: IDS.orderWhy, missingInfo: IDS.missingInfo },
  guides: { reason: (id) => reasonGuide(id), order: orderGuide, missing: missingGuide },
  key: measureKey,
  afterOrder,
});

const optionsCfg = (): OptionsCfg => ({
  day: DAY,
  options: OPTS.map((o) => ({ id: o.id, name: o.name, cost: o.cost, weeks: o.weeks })),
  criteria: [
    { label: tt("User impact", "Nutzerwirkung"), help: tt("How many learners it opens the platform to, and which groups.", "Für wie viele Lernende sie die Plattform öffnet, und welche Gruppen.") },
    { label: tt("Effort", "Aufwand"), help: tt("By the printed cost, with the rule in Materi A5.", "Nach den gedruckten Kosten, mit der Regel in Materi A5.") },
    { label: tt("Risk", "Risiko"), help: tt("What could go wrong or be lost.", "Was schiefgehen oder verloren gehen könnte.") },
  ],
  effortBand,
  effortRule: tt(EFFORT_RULE().en, EFFORT_RULE().de),
  title: tt("Block 1.2 · Integrating and assessing a UX concept: three options", "Block 1.2 · Ein UX-Konzept integrieren und bewerten: drei Optionen"),
  findIt: tt("Route 1 → Task 1 → the three options below, each with its printed cost and weeks. Rate each one, put them in order, and justify your decision.", "Route 1 → Task 1 → die drei Optionen darunter, jeweils mit gedruckten Kosten und Wochen. Bewerten Sie jede, ordnen Sie sie und begründen Sie Ihre Entscheidung."),
  refs: ["A5"],
  intro: <p>{tt(`You are to improve a learning platform. The budget is limited (${euro(BUDGET)}, Case assumption), complaints are increasing and time is short (${WEEKS_LIMIT} weeks). Effort follows the printed cost, by the rule in Materi A5. Option A expands the platform; B and C build inclusion into what exists.`, `Sie sollen eine Lernplattform verbessern. Das Budget ist begrenzt (${euro(BUDGET)}, Fallannahme), Beschwerden nehmen zu und die Zeit ist knapp (${WEEKS_LIMIT} Wochen). Der Aufwand folgt den gedruckten Kosten, nach der Regel in Materi A5. Option A erweitert die Plattform; B und C bauen Inklusion in das Bestehende ein.`)}</p>,
  orderHelp: tt("The first is the one you would do first. Move one up or down with the arrows.", "Die erste ist die, die Sie zuerst machen würden. Verschieben Sie eine mit den Pfeilen nach oben oder unten."),
  whyLabel: tt("Justify your decision: who gains from your first priority, and is it an integration or an expansion?", "Begründen Sie Ihre Entscheidung: Wer profitiert von Ihrer ersten Priorität, und ist sie eine Integration oder eine Erweiterung?"),
  whyHelp: tt(`One or two sentences. At least ${MIN_LINE} characters.`, `Ein bis zwei Sätze. Mindestens ${MIN_LINE} Zeichen.`),
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
      title={tt("Block 1.1 · Eight facts, the groups affected and three improvements", "Block 1.1 · Acht Fakten, die betroffenen Gruppen und drei Verbesserungen")}
      kind="OBJECTIVE + JUDGED"
      core
      minutes={BLOCK_MINUTES["1.1"]}
      findIt={tt("Route 1 → Task 1 → the four drawn screens directly below, then the sort board with the eight facts, the list of user groups and the fields under it. Answer on the board, in the list and in the fields.", "Route 1 → Task 1 → die vier gezeichneten Bildschirme direkt darunter, dann die Sortiertafel mit den acht Fakten, die Liste der Nutzergruppen und die Felder darunter. Antworten Sie auf der Tafel, in der Liste und in den Feldern.")}
    >
      <MaterialRefs refs={["A1", "A2"]} />
      <InclusiveLearnScreens />
      <PlacementBoard<PrincipleId>
        items={FACTS.map((f) => ({ id: f.id, meta: `${f.no} · ${f.where}`, text: f.text }))}
        bins={PRINCIPLE_IDS.map((id) => ({ id, label: PRINCIPLES[id].label, hint: PRINCIPLES[id].hint }))}
        value={r.sort}
        onPlace={(id, bin) => patch((s) => placeItem<PrincipleId, D7R1>(s, id, bin))}
        onUndo={() => patch((s) => undoSort<PrincipleId, D7R1>(s))}
        onRedo={() => patch((s) => redoSort<PrincipleId, D7R1>(s))}
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
        intro={tt("Drag a fact onto the principle it breaks first, or select it and then a principle. Select a placed one to move it again. One principle per fact: Perceivable, Operable or Understandable.", "Ziehen Sie einen Fakt auf das Prinzip, das er zuerst verletzt, oder wählen Sie ihn und dann ein Prinzip. Wählen Sie einen platzierten, um ihn zu verschieben. Ein Prinzip pro Fakt: Wahrnehmbar, Bedienbar oder Verständlich.")}
        tests={
          <RevealHint id="sort-tests" label={tt("Show the test questions", "Testfragen zeigen")} title={tt("Test questions · taught in Materi A2", "Testfragen · aus Materi A2")}>
            <div className="space-y-2 text-caption text-ink">
              <p>{tt("Ask these of every fact. They repeat the three principles; they never say which fact goes where.", "Stellen Sie diese Fragen zu jedem Fakt. Sie wiederholen die drei Prinzipien; sie sagen nie, welcher Fakt wohin gehört.")}</p>
              <ul className="space-y-1.5">
                {PRINCIPLE_IDS.map((a) => (
                  <li key={a}>
                    <span className="font-semibold">{PRINCIPLES[a].label}. </span>
                    <Gloss>{PRINCIPLES[a].test}</Gloss>
                  </li>
                ))}
              </ul>
              <MaterialRefs refs={["A2"]} lead={tt("Taught in", "Gelehrt in")} />
            </div>
          </RevealHint>
        }
      />
      <Field id={IDS.groups} label={tt("Which user groups run into problems?", "Welche Nutzergruppen stoßen auf Probleme?")} help={tt(`Tick every group that one of the eight facts blocks. At least ${GROUPS_MIN}. You have ticked: ${r.groups.length}`, `Haken Sie jede Gruppe an, die einer der acht Fakten blockiert. Mindestens ${GROUPS_MIN}. Sie haben angehakt: ${r.groups.length}`)}>
        <OptionList<GroupId> options={GROUPS.map((g) => ({ id: g.id, label: g.text }))} value={r.groups} onChange={(id) => patch((s) => ({ groups: toggleList(s.groups, id) }))} multi cols={2} label={tt("User groups", "Nutzergruppen")} />
      </Field>
      <TextBox
        id={IDS.groupsWhy}
        label={tt("Pick two groups and say which fact blocks each of them, and what they cannot do", "Wählen Sie zwei Gruppen und sagen Sie, welcher Fakt jede blockiert und was sie nicht tun können")}
        help={tt(`Name the group, the fact by number and the task the group cannot do (read, hear, operate, understand). At least ${MIN_LINE} characters.`, `Nennen Sie die Gruppe, den Fakt mit Nummer und die Aufgabe, die die Gruppe nicht tun kann (lesen, hören, bedienen, verstehen). Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.groupsWhy}
        onChange={(v) => patch({ groupsWhy: v })}
        min={MIN_LINE}
        rows={3}
      >
        <WritingHelp
          id="groups-kit"
          refs={[{ label: tt("A barrier stops a learner from doing something (Materi A1)", "Eine Barriere hindert eine Lernende an etwas (Materi A1)"), value: tt("who · which fact · what they cannot do", "wer · welcher Fakt · was sie nicht können"), target: "mat-A1", before: () => showCardPart("A1", "rules") }]}
          steps={[
            tt("Start with the group: “Learners with low vision…”.", "Beginnen Sie mit der Gruppe: „Lernende mit eingeschränktem Sehvermögen …“."),
            tt("Add the fact by number and what the group cannot do because of it.", "Ergänzen Sie den Fakt mit Nummer und was die Gruppe seinetwegen nicht kann."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="groups-example" guide={groupsGuide()} />
      {mentor && <MentorGuide guide={groupsGuide()} />}
      <TextBox
        id={IDS.improve}
        label={tt("Three improvements", "Drei Verbesserungen")}
        help={tt(`Start each with a verb, name the fact it answers by number, and say who gains. At least ${MIN_FRAME} characters in all.`, `Beginnen Sie jede mit einem Verb, nennen Sie den Fakt, den sie beantwortet, mit Nummer und sagen Sie, wer profitiert. Mindestens ${MIN_FRAME} Zeichen insgesamt.`)}
        value={r.improve}
        onChange={(v) => patch({ improve: v })}
        min={MIN_FRAME}
        rows={5}
      />
      <ExampleAnswer id="improve-example" guide={improveGuide()} />
      {mentor && <MentorGuide guide={improveGuide()} />}
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
      title={tt("Block 2.1 · Four central barriers", "Block 2.1 · Vier zentrale Barrieren")}
      kind="OBJECTIVE + JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["2.1"]}
      findIt={tt("Route 1 → Task 1 → the case brief above and the eight facts of Block 1.1. Choose four of the seven barriers below, then say which printed fact supports your first one.", "Route 1 → Task 1 → der Fall oben und die acht Fakten aus Block 1.1. Wählen Sie vier der sieben Barrieren unten und sagen Sie dann, welcher gedruckte Fakt Ihre erste stützt.")}
    >
      <MaterialRefs refs={["A2", "A3"]} />
      <Field id={IDS.causePick} label={tt(`Choose exactly ${PICK_CAUSES} central barriers`, `Wählen Sie genau ${PICK_CAUSES} zentrale Barrieren`)} help={tt("A central barrier is something that stops a group of learners from doing something, and you can point at it in the case or in a fact. You have chosen:", "Eine zentrale Barriere hindert eine Gruppe von Lernenden an etwas, und Sie können im Fall oder in einem Fakt darauf zeigen. Sie haben gewählt:") + ` ${r.causes.length} / ${PICK_CAUSES}`}>
        <OptionList
          options={CAUSES.map((c) => ({ id: c.id, label: c.text }))}
          value={r.causes}
          onChange={(id) => {
            setNote("");
            patch((s) => ({ causes: toggleCapped(s.causes, id, PICK_CAUSES), causeResult: null }));
          }}
          multi
          label={tt("Possible barriers", "Mögliche Barrieren")}
          disabledIds={full ? CAUSES.map((c) => c.id) : []}
          onDisabledClick={() => setNote(tt(`You have ${PICK_CAUSES}. Deselect one first.`, `Sie haben ${PICK_CAUSES}. Wählen Sie zuerst eine ab.`))}
        />
        {note && <p role="status" className="text-caption text-ash">{note}</p>}
        <CheckBar onCheck={() => patch((s) => ({ checks: s.checks + 1, causeResult: causeHolds(s.causes) }))} checkLabel={tt("Check my barriers", "Meine Barrieren prüfen")} clueShown={r.causeClue} onClue={() => patch({ causeClue: true })} checks={r.checks} />
        {r.causeResult && <Reading>{r.causeResult.chosen === 0 ? tt("Nothing chosen yet.", "Noch nichts gewählt.") : tt(`${r.causeResult.holds} of ${r.causeResult.chosen} chosen barriers hold. It never says which.`, `${r.causeResult.holds} von ${r.causeResult.chosen} gewählten Barrieren stimmen. Es sagt nie, welche.`)}</Reading>}
        {r.causeClue && <Reading label={tt("Clue", "Hinweis")}>{tt("For each barrier, find a printed fact that supports it. Ask also whether it stops a group of learners from doing something, or is only a matter of price, size or taste.", "Suchen Sie für jede Barriere einen gedruckten Fakt, der sie stützt. Fragen Sie auch, ob sie eine Gruppe von Lernenden an etwas hindert oder nur eine Frage von Preis, Größe oder Geschmack ist.")}</Reading>}
      </Field>
      <TextBox
        id={IDS.causeWhy}
        label={tt("Which printed fact supports your first barrier, and which group does it block?", "Welcher gedruckte Fakt stützt Ihre erste Barriere, und welche Gruppe blockiert sie?")}
        help={tt(`Name the fact by number and the group it blocks. At least ${MIN_LINE} characters.`, `Nennen Sie den Fakt mit Nummer und die Gruppe, die er blockiert. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.causeWhy}
        onChange={(v) => patch({ causeWhy: v })}
        min={MIN_LINE}
        rows={3}
      />
      <ExampleAnswer id="causewhy-example" guide={causeWhyGuide()} />
      {mentor && <MentorGuide guide={causeWhyGuide()} />}
      <AnswerKey block={causeKey()} />
      <BlockMissing block="2.1" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 2.2, step 5 (Core): the three evaluation methods */

function MethodsStep() {
  const { r, patch, mentor } = useR1();
  const [note, setNote] = useState("");
  const full = r.methods.length >= PICK_METHODS;
  return (
    <>
      <Field id={IDS.methods} label={tt(`Step 5 · Choose exactly ${PICK_METHODS} evaluation methods`, `Schritt 5 · Wählen Sie genau ${PICK_METHODS} Evaluationsmethoden`)} help={tt("Each shows what it tells you. Choose methods that give different kinds of evidence (Materi A5). You have chosen:", "Jede zeigt, was sie Ihnen sagt. Wählen Sie Methoden, die verschiedene Arten von Belegen liefern (Materi A5). Sie haben gewählt:") + ` ${r.methods.length} / ${PICK_METHODS}`}>
        <OptionList<MethodId>
          options={METHODS.map((m) => ({ id: m.id, label: `${m.no} · ${m.name}`, sub: `${tt("What it tells you:", "Was sie Ihnen sagt:")} ${m.tells}` }))}
          value={r.methods}
          onChange={(id) => {
            setNote("");
            patch((s) => ({ methods: toggleCapped(s.methods, id, PICK_METHODS) }));
          }}
          multi
          cols={2}
          label={tt("Evaluation methods", "Evaluationsmethoden")}
          disabledIds={full ? METHODS.map((m) => m.id) : []}
          onDisabledClick={() => setNote(tt(`You have ${PICK_METHODS}. Deselect one first.`, `Sie haben ${PICK_METHODS}. Wählen Sie zuerst eine ab.`))}
        />
        {note && <p role="status" className="text-caption text-ash">{note}</p>}
      </Field>
      <TextBox
        id={IDS.methodsWhy}
        label={tt("Why these three methods?", "Warum diese drei Methoden?")}
        help={tt(`Say what each tells you that the others would not: one should give reasons and one counts or conformance. At least ${MIN_LINE} characters.`, `Sagen Sie, was jede Ihnen sagt, was die anderen nicht sagen würden: eine sollte Gründe liefern und eine Zahlen oder Konformität. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.methodsWhy}
        onChange={(v) => patch({ methodsWhy: v })}
        min={MIN_LINE}
        rows={3}
      />
      <ExampleAnswer id="methodswhy-example" guide={methodsWhyGuide()} />
      {mentor && <MentorGuide guide={methodsWhyGuide()} />}
    </>
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
        <h2 id="task1-h">{tt("UX Analysis File: find the barriers, choose the measures", "UX Analysis File: die Barrieren finden, die Maßnahmen wählen")}</h2>
      </header>
      <CaseBrief />
      <PartHeading id="part-1" n={1} title={tt("Find the barriers", "Die Barrieren finden")} level={tt("Level 1 · Knowledge", "Level 1 · Wissen")} />
      <Block11 missing={missing} />
      <OptionalSection id="block-1-2" title={tt("Block 1.2 · Integrating and assessing a UX concept: three options", "Block 1.2 · Ein UX-Konzept integrieren und bewerten: drei Optionen")} minutes={BLOCK_MINUTES["1.2"]} reason={tt("Practises the three ratings at small scale; Block 2.2 is answered without it.", "Übt die drei Bewertungen im Kleinen; Block 2.2 wird auch ohne ihn beantwortet.")}>
        <OptionsBlock cfg={optionsCfg()} missing={missing} />
      </OptionalSection>
      <OptionalSection id="block-1-3" title={tt("Block 1.3 · Coaching reflection: inclusion as a strategic UX quality", "Block 1.3 · Coaching-Reflexion: Inklusion als strategische UX-Qualität")} minutes={BLOCK_MINUTES["1.3"]} reason={tt("A reflective bridge between the two levels; your notes appear in the file, and no Core block needs them.", "Eine reflektierende Brücke zwischen den beiden Levels; Ihre Notizen erscheinen in der Datei, und kein Kernblock braucht sie.")}>
        <ReflectBlock
          cfg={{
            day: DAY,
            title: tt("Block 1.3 · Coaching reflection: inclusion as a strategic UX quality", "Block 1.3 · Coaching-Reflexion: Inklusion als strategische UX-Qualität"),
            point: tt("The coaching point of the plan: accessibility is not an add-on but a core quality; inclusive systems are more successful in the long run; evaluation is a continuous task.", "Der Coaching-Punkt des Plans: Barrierefreiheit ist kein Add-on, sondern eine Kernqualität; inklusive Systeme sind langfristig erfolgreicher; Evaluation ist eine fortlaufende Aufgabe."),
            questions: REFLECT.map((q) => ({ k: q.k, q: q.q })),
            guide: reflectGuide,
          }}
          missing={missing}
        />
      </OptionalSection>
      <PartHeading id="part-2" n={2} title={tt("Choose inclusive measures", "Inklusive Maßnahmen wählen")} level={tt("Level 2 · Application", "Level 2 · Anwendung")} />
      <OptionalSection id="block-2-1" title={tt("Block 2.1 · Four central barriers", "Block 2.1 · Vier zentrale Barrieren")} minutes={BLOCK_MINUTES["2.1"]} reason={tt("Practises pointing at a printed fact for a barrier; Block 2.2 reads the facts, not this block.", "Übt, bei einer Barriere auf einen gedruckten Fakt zu zeigen; Block 2.2 liest die Fakten, nicht diesen Block.")}>
        <Block21 missing={missing} />
      </OptionalSection>
      <MeasuresBlock cfg={measuresCfg(<MethodsStep />)} missing={missing} />
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
