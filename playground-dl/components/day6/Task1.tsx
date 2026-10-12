"use client";

import Link from "next/link";
import { MeasureThumb } from "@/components/day6/mocks";
import type { MeasureKind } from "@/components/day6/mocks";
import { TouchpointsPicture } from "@/components/day6/mocks";
import { JourneyGrid } from "@/components/day6/JourneyGrid";
import { MeasuresBlock } from "@/components/dayStd/MeasuresBlock";
import type { MeasuresCfg } from "@/components/dayStd/MeasuresBlock";
import { ReflectBlock } from "@/components/dayStd/ReflectBlock";
import { useStdSlice } from "@/components/dayStd/useStd";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { ExportBar } from "@/components/ui/ExportBar";
import { Field } from "@/components/ui/Field";
import { OptionList, TextBox } from "@/components/ui/Inputs";
import { Callout, DataTable } from "@/components/ui/MaterialCard";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { PlacementBoard } from "@/components/ui/PlacementBoard";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { BUDGET, EFFORT_RULE, MEASURES, MEASURE_AREA, NOTES, PERSONA_FIELDS, PERSONA_FIELD_IDS, PHASES_1, PHASES_L, PHASES_T, PHASE_LABEL_1, PHASE_LABEL_L, PHASE_LABEL_T, PICK_MEASURES, REFLECT, TEACHER_NOTES, WEEKS_LIMIT, effortBand } from "@/data/day6/case";
import type { MeasureId, PersonaFieldId, PhaseId1 } from "@/data/day6/case";
import { routeHref } from "@/data/course";
import { sortHolds } from "@/lib/day6/checks";
import { analysisBody } from "@/lib/day6/exportDoc";
import { criticalGuide, frustrationsGuide, journeyProblemsGuide, missingGuide, orderGuide, painGuide, personaGuide, reasonGuide, reflectGuide, sharedGuide, teacherGuide } from "@/lib/day6/guides";
import { measureKey, sortKey } from "@/lib/day6/answerKey";
import { IDS, r1Missing } from "@/lib/day6/missing";
import { BLOCK_MINUTES, CORE1_MINUTES, MIN_FRAME, MIN_LINE, MIN_REASON, MIN_ROW, TASK1_MINUTES } from "@/lib/day6/progress";
import { placeItem, redoSort, undoSort } from "@/lib/lists";
import type { MissingEntry } from "@/lib/missing";
import { Gloss } from "@/lib/glossify";
import { euro, tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { showCardPart } from "@/store/useCardMore";
import type { D6R1 } from "@/store/dayTypesStd";
import { usePersisted } from "@/store/usePersisted";

/** Day 6 · Route 1 · the UX Analysis File. Core: Block 1.1 (Level 1) and Block 2.2 (Level 2). Optional: 1.2, 1.3, 2.1 (CLAUDE.md #35, #40). */

const DAY = 6;
const useR1 = () => useStdSlice<D6R1>(DAY, 1);

/* ------------------------------------------------------------------ the case */

function CaseBrief() {
  return (
    <section id="case-brief" aria-labelledby="case-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case-h">{tt("The case: EduPath, where different users fail in different ways", "Der Fall: EduPath, wo verschiedene Nutzer auf verschiedene Weise scheitern")}</h2>
        <span className="smallcaps">{tt("Read once · about 3 min", "Einmal lesen · ca. 3 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt(
            "EduPath is a learning platform with three kinds of users. Learners drop out because they lack time. Teachers find the platform too complicated. The organisations that buy the courses complain about low usage. You are part of the UX team, and management wants you to understand each group before it decides what to build.",
            "EduPath ist eine Lernplattform mit drei Arten von Nutzern. Lernende brechen aus Zeitmangel ab. Lehrende finden die Plattform zu kompliziert. Die Organisationen, die die Kurse kaufen, klagen über geringe Nutzung. Sie gehören zum UX-Team, und die Geschäftsführung will, dass Sie jede Gruppe verstehen, bevor sie entscheidet, was gebaut wird.",
          )}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("What you have", "Was Sie haben")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt("Five touchpoints of the platform (below) and eight research notes about learners (Block 1.1).", "Fünf Touchpoints der Plattform (unten) und acht Recherchenotizen zu Lernenden (Block 1.1).")}</li>
            <li>{tt("A scenario for a journey (optional Block 1.2) and six notes about teachers and organisations (optional Block 2.1).", "Ein Szenario für eine Journey (optionaler Block 1.2) und sechs Notizen zu Lehrenden und Organisationen (optionaler Block 2.1).")}</li>
            <li>{tt("Nine measures, each with a cost and weeks (Block 2.2).", "Neun Maßnahmen, jeweils mit Kosten und Wochen (Block 2.2).")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Time: ", "Zeit: ")}
              <strong>{tt(`3 months (${WEEKS_LIMIT} weeks)`, `3 Monate (${WEEKS_LIMIT} Wochen)`)}</strong> <span className="text-ash">{tt("(Case assumption)", "(Fallannahme)")}</span>
            </li>
            <li>
              {tt("Budget: ", "Budget: ")}
              <strong>{euro(BUDGET)}</strong> <span className="text-ash">{tt("(Case assumption: the plan only says “limited”)", "(Fallannahme: der Plan sagt nur „begrenzt“)")}</span>
            </li>
            <li>{tt("Resources are limited.", "Die Ressourcen sind begrenzt.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · two core blocks, about ${CORE1_MINUTES} min`, `So läuft die Aufgabe · zwei Kernblöcke, ca. ${CORE1_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 1.1: sort eight research notes into persona fields and write the learner persona (Level 1, A1 and A2).", "Block 1.1: acht Recherchenotizen in Persona-Felder sortieren und die Lernenden-Persona schreiben (Level 1, A1 und A2).")}</li>
            <li>{tt("Block 2.2: choose four of nine measures, name the pain point each answers, rate them, order them and name what is missing (Level 2, A5).", "Block 2.2: vier von neun Maßnahmen wählen, den Pain Point nennen, den jede beantwortet, sie bewerten, ordnen und nennen, was fehlt (Level 2, A5).")}</li>
          </ol>
          <p className="mt-1 text-ash">{tt(`Three more blocks (about ${TASK1_MINUTES - CORE1_MINUTES} min) are optional and folded.`, `Drei weitere Blöcke (ca. ${TASK1_MINUTES - CORE1_MINUTES} Min.) sind optional und eingeklappt.`)}</p>
        </div>
      </div>
      <div>
        <p className="smallcaps">{tt("The evidence: five touchpoints", "Der Beleg: fünf Touchpoints")}</p>
        <TouchpointsPicture />
        <p className="mt-1 text-center text-micro normal-case tracking-normal text-ash">{tt("A touchpoint is any contact between a user and the product or the company. The numbers are only labels.", "Ein Touchpoint ist jeder Kontakt zwischen einem Nutzer und dem Produkt oder dem Unternehmen. Die Nummern sind nur Beschriftungen.")}</p>
      </div>
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>
          {tt(
            "The brief says: learners drop out due to lack of time, teachers find the platform too complicated, the organisation complains about low usage, a working professional with little time who wants to continue their education. Everything else is made up for this exercise: the research notes, the numbers in them, the €45,000, the 13 weeks, and the costs and weeks of the measures.",
            "Der Auftrag sagt: Lernende brechen aus Zeitmangel ab, Lehrende finden die Plattform zu kompliziert, die Organisation klagt über geringe Nutzung, eine Berufstätige mit wenig Zeit, die sich weiterbilden will. Alles andere ist für diese Übung erfunden: die Recherchenotizen, die Zahlen darin, die 45.000 €, die 13 Wochen sowie die Kosten und Wochen der Maßnahmen.",
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

/* ------------------------------------------------------------------ the shared block's configuration */

const MEASURE_THUMB: Record<MeasureId, MeasureKind> = { m1: "formats", m2: "resume", m3: "editor", m4: "stuck", m5: "reuse", m6: "structure", m7: "report", m8: "badges", m9: "brand" };

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
  impact: { label: tt("User impact", "Nutzerwirkung"), help: tt("How much it helps the persona at the pain point it targets, and how many people that persona stands for.", "Wie sehr sie der Persona an dem Pain Point hilft, auf den sie zielt, und für wie viele Menschen diese Persona steht.") },
  riskHelp: tt("What could be lost or wasted.", "Was verloren gehen oder verschwendet werden könnte."),
  refs: ["A5", "A1", "A3"],
  title: tt("Block 2.2 · Four measures, rated and ordered", "Block 2.2 · Vier Maßnahmen, bewertet und geordnet"),
  findIt: tt("Route 1 → Task 1 → the nine measures in the list directly below, each with its printed cost and weeks and who it is for. Answer in the list, the rating rows and the fields under it.", "Route 1 → Task 1 → die neun Maßnahmen in der Liste direkt darunter, jeweils mit gedruckten Kosten und Wochen und für wen sie ist. Antworten Sie in der Liste, den Bewertungszeilen und den Feldern darunter."),
  listLabel: tt("Measures EduPath could fund", "Maßnahmen, die EduPath finanzieren könnte"),
  evidenceNote: tt("The five touchpoints, the notes of Block 1.1 and the case brief are your evidence. Effort follows the printed cost, by the rule in Materi A5.", "Die fünf Touchpoints, die Notizen aus Block 1.1 und der Fall sind Ihre Belege. Der Aufwand folgt den gedruckten Kosten, nach der Regel in Materi A5."),
  reasonHelp: tt(`One or two sentences: which printed note or touchpoint it answers, and what could go wrong. At least ${MIN_REASON} characters.`, `Ein bis zwei Sätze: welche gedruckte Notiz oder welchen Touchpoint sie beantwortet und was schiefgehen könnte. Mindestens ${MIN_REASON} Zeichen.`),
  orderWhyHelp: tt(`A reason for position one: the persona and the pain point it answers, the cost, or what the others depend on. Name the group you give most weight. At least ${MIN_LINE} characters.`, `Ein Grund für Platz eins: die Persona und der Pain Point, den sie beantwortet, die Kosten oder wovon die anderen abhängen. Nennen Sie die Gruppe, der Sie das meiste Gewicht geben. Mindestens ${MIN_LINE} Zeichen.`),
  pain: { label: tt("The pain point it answers (persona and phase)", "Der Pain Point, den sie beantwortet (Persona und Phase)"), help: tt(`Name the persona and the phase of the journey where it acts, and point at a printed note. At least ${MIN_REASON} characters.`, `Nennen Sie die Persona und die Phase der Journey, in der sie wirkt, und zeigen Sie auf eine gedruckte Notiz. Mindestens ${MIN_REASON} Zeichen.`) },
  ids: { pick: IDS.measurePick, measure: IDS.measure, reason: IDS.reason, pain: IDS.pain, order: IDS.order, orderWhy: IDS.orderWhy, missingInfo: IDS.missingInfo },
  guides: { reason: (id) => reasonGuide(id), order: orderGuide, missing: missingGuide, pain: (id) => painGuide(id) },
  key: measureKey,
});

/* ------------------------------------------------------------------ Block 1.1 (Core, Level 1) */

const PERSONA_ROWS: { k: keyof D6R1["persona"]; label: () => string; help: () => string; min: number; rows: number }[] = [
  { k: "nameRole", label: () => tt("Name, age and role", "Name, Alter und Rolle"), help: () => tt(`A made-up person who stands for the group. At least ${MIN_ROW} characters.`, `Eine erfundene Person, die für die Gruppe steht. Mindestens ${MIN_ROW} Zeichen.`), min: MIN_ROW, rows: 1 },
  { k: "goals", label: () => tt("Goals: why does the person learn?", "Ziele: Warum lernt die Person?"), help: () => tt(`A reason in her life, with the note numbers it rests on. At least ${MIN_REASON} characters.`, `Ein Grund in ihrem Leben, mit den Notiznummern, auf denen er beruht. Mindestens ${MIN_REASON} Zeichen.`), min: MIN_REASON, rows: 2 },
  { k: "problems", label: () => tt("Problems and frustrations", "Probleme und Frustrationen"), help: () => tt(`Situations, not verdicts, with the note numbers. At least ${MIN_REASON} characters.`, `Situationen, keine Urteile, mit den Notiznummern. Mindestens ${MIN_REASON} Zeichen.`), min: MIN_REASON, rows: 2 },
  { k: "situation", label: () => tt("Usage situation: time, device, motivation", "Nutzungssituation: Zeit, Gerät, Motivation"), help: () => tt(`When, where, on which device, and why, with the note numbers. At least ${MIN_REASON} characters.`, `Wann, wo, auf welchem Gerät und warum, mit den Notiznummern. Mindestens ${MIN_REASON} Zeichen.`), min: MIN_REASON, rows: 2 },
  { k: "expectations", label: () => tt("Expectations of a learning platform", "Erwartungen an eine Lernplattform"), help: () => tt(`What she assumes will happen before she acts. At least ${MIN_REASON} characters.`, `Was sie annimmt, dass passiert, bevor sie handelt. Mindestens ${MIN_REASON} Zeichen.`), min: MIN_REASON, rows: 2 },
];

export function Block11({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR1();
  return (
    <AnswerBlock
      id="block-1-1"
      title={tt("Block 1.1 · Eight research notes and a learner persona", "Block 1.1 · Acht Recherchenotizen und eine Lernenden-Persona")}
      kind="OBJECTIVE + JUDGED"
      core
      minutes={BLOCK_MINUTES["1.1"]}
      findIt={tt("Route 1 → Task 1 → the scenario below, the sort board with the eight notes, then the persona fields and the frustrations field. Answer on the board and in the fields.", "Route 1 → Task 1 → das Szenario darunter, die Sortiertafel mit den acht Notizen, dann die Persona-Felder und das Frustrationsfeld. Antworten Sie auf der Tafel und in den Feldern.")}
    >
      <MaterialRefs refs={["A1", "A2"]} />
      <p className="max-w-prose text-body text-ink">
        {tt("Scenario: a working professional with little time wants to continue their education. EduPath's team has collected eight notes about learners like this. Each note names its source.", "Szenario: Eine Berufstätige mit wenig Zeit will sich weiterbilden. Das Team von EduPath hat acht Notizen zu Lernenden wie ihr gesammelt. Jede Notiz nennt ihre Quelle.")}
      </p>
      <PlacementBoard<PersonaFieldId>
        items={NOTES.map((n) => ({ id: n.id, meta: `${n.no} · ${n.where}`, text: n.text }))}
        bins={PERSONA_FIELD_IDS.map((id) => ({ id, label: PERSONA_FIELDS[id].label, hint: PERSONA_FIELDS[id].hint }))}
        value={r.sort}
        onPlace={(id, bin) => patch((s) => placeItem<PersonaFieldId, D6R1>(s, id, bin))}
        onUndo={() => patch((s) => undoSort<PersonaFieldId, D6R1>(s))}
        onRedo={() => patch((s) => redoSort<PersonaFieldId, D6R1>(s))}
        undoCount={r.sortHistory.length}
        redoCount={r.sortFuture.length}
        domId={IDS.note}
        keyPhrases={Object.fromEntries(NOTES.map((n) => [n.id, n.key]))}
        clues={Object.fromEntries(NOTES.map((n) => [n.id, n.clue]))}
        reasons={Object.fromEntries(NOTES.map((n) => [n.id, n.why]))}
        result={r.sortResult}
        checks={r.sortChecks}
        onCheck={() => patch((s) => ({ sortChecks: s.sortChecks + 1, sortResult: sortHolds(s.sort) }))}
        onClue={() => patch({ sortClue: true })}
        clueShown={r.sortClue}
        reasoningOpened={r.sortReasoning}
        onOpenReasoning={() => patch({ sortReasoning: true })}
        noun={tt("note", "Notiz")}
        intro={tt("Drag a note onto the persona field it belongs to, or select it and then a field. Select a placed one to move it again. One field per note: Goal, Problem or frustration, or Context of use.", "Ziehen Sie eine Notiz auf das Persona-Feld, zu dem sie gehört, oder wählen Sie sie und dann ein Feld. Wählen Sie eine platzierte, um sie zu verschieben. Ein Feld pro Notiz: Ziel, Problem oder Frustration oder Nutzungskontext.")}
        tests={
          <RevealHint id="sort-tests" label={tt("Show the test questions", "Testfragen zeigen")} title={tt("Test questions · taught in Materi A1", "Testfragen · aus Materi A1")}>
            <div className="space-y-2 text-caption text-ink">
              <p>{tt("Ask these of every note. They repeat the three fields; they never say which note goes where.", "Stellen Sie diese Fragen zu jeder Notiz. Sie wiederholen die drei Felder; sie sagen nie, welche Notiz wohin gehört.")}</p>
              <ul className="space-y-1.5">
                {PERSONA_FIELD_IDS.map((a) => (
                  <li key={a}>
                    <span className="font-semibold">{PERSONA_FIELDS[a].label}. </span>
                    <Gloss>{PERSONA_FIELDS[a].test}</Gloss>
                  </li>
                ))}
              </ul>
              <MaterialRefs refs={["A1"]} lead={tt("Taught in", "Gelehrt in")} />
            </div>
          </RevealHint>
        }
      />
      <p className="text-body font-semibold text-ink">{tt("Write the learner persona", "Schreiben Sie die Lernenden-Persona")}</p>
      <p className="text-caption text-ash">{tt("Use the notes as evidence and refer to them by number. A persona is a representative person, not a list of notes.", "Nutzen Sie die Notizen als Belege und verweisen Sie mit der Nummer darauf. Eine Persona ist eine repräsentative Person, keine Liste von Notizen.")}</p>
      {PERSONA_ROWS.map((row, i) => (
        <TextBox
          key={row.k}
          id={IDS.persona(row.k)}
          label={row.label()}
          help={row.help()}
          value={r.persona[row.k]}
          onChange={(v) => patch((s) => ({ persona: { ...s.persona, [row.k]: v } }))}
          min={row.min}
          rows={row.rows}
        >
          {i === 1 && (
            <WritingHelp
              id="persona-kit"
              refs={[{ label: tt("The three fields of a persona (Materi A1)", "Die drei Felder einer Persona (Materi A1)"), value: tt("goal · problem · context", "Ziel · Problem · Kontext"), target: "mat-A1", before: () => showCardPart("A1", "rules") }, { label: tt("The eight notes", "Die acht Notizen"), value: tt("notes 1 to 8", "Notizen 1 bis 8"), target: IDS.note("n1") }]}
              steps={[
                tt("Take the notes you put under Goal, write them as one reason in her life, and add the numbers.", "Nehmen Sie die Notizen, die Sie unter Ziel gelegt haben, schreiben Sie sie als einen Grund in ihrem Leben und ergänzen Sie die Nummern."),
                tt("Do the same for the Problem notes and the Context notes in the next fields.", "Machen Sie dasselbe mit den Problem-Notizen und den Kontext-Notizen in den nächsten Feldern."),
              ]}
            />
          )}
        </TextBox>
      ))}
      <ExampleAnswer id="persona-example" guide={personaGuide()} />
      {mentor && <MentorGuide guide={personaGuide()} />}
      <TextBox
        id={IDS.frustrations}
        label={tt("What frustrations could arise on a platform like EduPath for this person?", "Welche Frustrationen könnten für diese Person auf einer Plattform wie EduPath entstehen?")}
        help={tt(`Name the situation, not a verdict, and say which decision a team could take because of this persona. At least ${MIN_LINE} characters.`, `Nennen Sie die Situation, kein Urteil, und sagen Sie, welche Entscheidung ein Team wegen dieser Persona treffen könnte. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.frustrations}
        onChange={(v) => patch({ frustrations: v })}
        min={MIN_LINE}
        rows={3}
      />
      <ExampleAnswer id="frustrations-example" guide={frustrationsGuide()} />
      {mentor && <MentorGuide guide={frustrationsGuide()} />}
      <AnswerKey block={sortKey()} />
      <BlockMissing block="1.1" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.2 (Optional) */

export function Block12({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR1();
  return (
    <AnswerBlock
      id="block-1-2"
      title={tt("Block 1.2 · A journey that ends in drop-out", "Block 1.2 · Eine Journey, die im Abbruch endet")}
      kind="OBJECTIVE + JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.2"]}
      findIt={tt("Route 1 → Task 1 → the scenario below and the journey grid. Answer in the grid, the problems field and the phase choice.", "Route 1 → Task 1 → das Szenario darunter und das Journey-Raster. Antworten Sie im Raster, im Problemfeld und bei der Phasenwahl.")}
    >
      <MaterialRefs refs={["A3"]} />
      <p className="max-w-prose text-body text-ink">{tt("Scenario: a user starts an online course on EduPath, but drops out after a short time. Fill in the journey for this person, in a few words per cell, and rate the emotion from 1 (very frustrated) to 5 (very motivated).", "Szenario: Ein Nutzer beginnt einen Online-Kurs auf EduPath, bricht aber nach kurzer Zeit ab. Füllen Sie die Journey für diese Person aus, in ein paar Worten pro Feld, und bewerten Sie die Emotion von 1 (sehr frustriert) bis 5 (sehr motiviert).")}</p>
      <JourneyGrid name={tt("Journey", "Journey")} phases={PHASES_1.map((k) => ({ id: k, label: PHASE_LABEL_1[k] }))} value={r.j} onChange={(k, p) => patch((s) => ({ j: { ...s.j, [k]: { ...s.j[k as PhaseId1], ...p } } }))} fields={["does", "thinks", "pain"]} idOf={IDS.jCell} />
      <TextBox id={IDS.jProblems} label={tt("Identify four possible problems that could lead to the drop-out", "Nennen Sie vier mögliche Probleme, die zum Abbruch führen könnten")} help={tt(`One short line each; a situation along the path, not a verdict. At least ${MIN_FRAME} characters in all.`, `Je eine kurze Zeile; eine Situation entlang des Weges, kein Urteil. Mindestens ${MIN_FRAME} Zeichen insgesamt.`)} value={r.jProblems} onChange={(v) => patch({ jProblems: v })} min={MIN_FRAME} rows={4} />
      <ExampleAnswer id="jproblems-example" guide={journeyProblemsGuide()} />
      {mentor && <MentorGuide guide={journeyProblemsGuide()} />}
      <Field id={IDS.jCritical} label={tt("Which phase is critical?", "Welche Phase ist kritisch?")} help={tt("Choose one; the next field asks why.", "Wählen Sie eine; das nächste Feld fragt, warum.")}>
        <OptionList<PhaseId1> options={PHASES_1.map((k) => ({ id: k, label: PHASE_LABEL_1[k] }))} value={r.jCritical} onChange={(id) => patch({ jCritical: id })} label={tt("The critical phase", "Die kritische Phase")} />
      </Field>
      <TextBox id={IDS.jCriticalWhy} label={tt("Why? What happens to the person's emotion, and what do they do next?", "Warum? Was passiert mit der Emotion der Person, und was tut sie als Nächstes?")} help={tt(`One or two sentences. At least ${MIN_LINE} characters.`, `Ein oder zwei Sätze. Mindestens ${MIN_LINE} Zeichen.`)} value={r.jCriticalWhy} onChange={(v) => patch({ jCriticalWhy: v })} min={MIN_LINE} rows={3} />
      <ExampleAnswer id="jcritical-example" guide={criticalGuide()} />
      {mentor && <MentorGuide guide={criticalGuide()} />}
      <BlockMissing block="1.2" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 2.1 (Optional) */

const TEACHER_ROWS: { k: keyof D6R1["teacher"]; label: () => string; min: number }[] = [
  { k: "nameRole", label: () => tt("Name, role", "Name, Rolle"), min: MIN_ROW },
  { k: "goals", label: () => tt("Goals", "Ziele"), min: MIN_REASON },
  { k: "problems", label: () => tt("Problems and frustrations", "Probleme und Frustrationen"), min: MIN_REASON },
  { k: "situation", label: () => tt("Usage situation", "Nutzungssituation"), min: MIN_REASON },
];

export function Block21({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR1();
  return (
    <AnswerBlock
      id="block-2-1"
      title={tt("Block 2.1 · The teacher persona and two journeys", "Block 2.1 · Die Lehrenden-Persona und zwei Journeys")}
      kind="OBJECTIVE + JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["2.1"]}
      findIt={tt("Route 1 → Task 1 → the six notes below, then the teacher persona, the two journey grids and the last field. Answer in the fields and grids.", "Route 1 → Task 1 → die sechs Notizen darunter, dann die Lehrenden-Persona, die zwei Journey-Raster und das letzte Feld. Antworten Sie in den Feldern und Rastern.")}
    >
      <MaterialRefs refs={["A1", "A3", "A4"]} />
      <DataTable
        caption={tt("Six notes about teachers and the organisation (Case assumption)", "Sechs Notizen zu Lehrenden und der Organisation (Fallannahme)")}
        head={[tt("No.", "Nr."), tt("Source", "Quelle"), tt("The note", "Die Notiz")]}
        rows={TEACHER_NOTES.map((n) => [n.no, n.where, n.text])}
      />
      {TEACHER_ROWS.map((row) => (
        <TextBox key={row.k} id={IDS.teacher(row.k)} label={tt(`The teacher persona · ${row.label()}`, `Die Lehrenden-Persona · ${row.label()}`)} help={tt(`One or two sentences, with the note numbers. At least ${row.min} characters.`, `Ein oder zwei Sätze, mit den Notiznummern. Mindestens ${row.min} Zeichen.`)} value={r.teacher[row.k]} onChange={(v) => patch((s) => ({ teacher: { ...s.teacher, [row.k]: v } }))} min={row.min} rows={2} />
      ))}
      <ExampleAnswer id="teacher-example" guide={teacherGuide()} />
      {mentor && <MentorGuide guide={teacherGuide()} />}
      <p className="text-body font-semibold text-ink">{tt("One journey for each persona", "Eine Journey für jede Persona")}</p>
      <p className="text-caption text-ash">{tt("A few words per cell. For the learner use the persona of Block 1.1 if you have written it; otherwise the scenario of Block 1.1.", "Ein paar Worte pro Feld. Für die Lernende nutzen Sie die Persona aus Block 1.1, wenn Sie sie geschrieben haben; sonst das Szenario aus Block 1.1.")}</p>
      <JourneyGrid name={tt("Learner journey", "Journey der Lernenden")} phases={PHASES_L.map((k) => ({ id: k, label: PHASE_LABEL_L[k] }))} value={r.jl} onChange={(k, p) => patch((s) => ({ jl: { ...s.jl, [k]: { ...s.jl[k as keyof typeof s.jl], ...p } } }))} fields={["does", "pain"]} idOf={IDS.jl} />
      <JourneyGrid name={tt("Teacher journey", "Journey der Lehrenden")} phases={PHASES_T.map((k) => ({ id: k, label: PHASE_LABEL_T[k] }))} value={r.jt} onChange={(k, p) => patch((s) => ({ jt: { ...s.jt, [k]: { ...s.jt[k as keyof typeof s.jt], ...p } } }))} fields={["does", "pain"]} idOf={IDS.jt} />
      <TextBox id={IDS.shared} label={tt("Which pain point appears for two groups? What does that suggest about the cause?", "Welcher Pain Point tritt bei zwei Gruppen auf? Was legt das über die Ursache nahe?")} help={tt(`Name a pain point that recurs for a persona and another, or for a persona and the organisation. At least ${MIN_LINE} characters.`, `Nennen Sie einen Pain Point, der bei einer Persona und einer anderen oder bei einer Persona und der Organisation wiederkehrt. Mindestens ${MIN_LINE} Zeichen.`)} value={r.shared} onChange={(v) => patch({ shared: v })} min={MIN_LINE} rows={3} />
      <ExampleAnswer id="shared-example" guide={sharedGuide()} />
      {mentor && <MentorGuide guide={sharedGuide()} />}
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
        <h2 id="task1-h">{tt("UX Analysis File: describe a person and a path, choose the measures", "UX Analysis File: eine Person und einen Weg beschreiben, die Maßnahmen wählen")}</h2>
      </header>
      <CaseBrief />
      <PartHeading id="part-1" n={1} title={tt("Describe a person and a path", "Eine Person und einen Weg beschreiben")} level={tt("Level 1 · Knowledge", "Level 1 · Wissen")} />
      <Block11 missing={missing} />
      <OptionalSection id="block-1-2" title={tt("Block 1.2 · A journey that ends in drop-out", "Block 1.2 · Eine Journey, die im Abbruch endet")} minutes={BLOCK_MINUTES["1.2"]} reason={tt("Practises the journey grid on a short scenario; Block 2.2 is answered without it.", "Übt das Journey-Raster an einem kurzen Szenario; Block 2.2 wird auch ohne ihn beantwortet.")}>
        <Block12 missing={missing} />
      </OptionalSection>
      <OptionalSection id="block-1-3" title={tt("Block 1.3 · Coaching reflection: from user image to decision basis", "Block 1.3 · Coaching-Reflexion: vom Nutzerbild zur Entscheidungsgrundlage")} minutes={BLOCK_MINUTES["1.3"]} reason={tt("A reflective bridge between the two levels; your notes appear in the file, and no Core block needs them.", "Eine reflektierende Brücke zwischen den beiden Levels; Ihre Notizen erscheinen in der Datei, und kein Kernblock braucht sie.")}>
        <ReflectBlock
          cfg={{
            day: DAY,
            title: tt("Block 1.3 · Coaching reflection: from user image to decision basis", "Block 1.3 · Coaching-Reflexion: vom Nutzerbild zur Entscheidungsgrundlage"),
            point: tt("The coaching point of the plan: personas are not profiles but decision tools; many personas stay ineffective; journeys reveal systemic problems, not single errors.", "Der Coaching-Punkt des Plans: Personas sind keine Profile, sondern Entscheidungswerkzeuge; viele Personas bleiben wirkungslos; Journeys zeigen systemische Probleme, keine Einzelfehler."),
            questions: REFLECT.map((q) => ({ k: q.k, q: q.q })),
            guide: reflectGuide,
          }}
          missing={missing}
        />
      </OptionalSection>
      <PartHeading id="part-2" n={2} title={tt("Two personas, two journeys, four measures", "Zwei Personas, zwei Journeys, vier Maßnahmen")} level={tt("Level 2 · Application", "Level 2 · Anwendung")} />
      <OptionalSection id="block-2-1" title={tt("Block 2.1 · The teacher persona and two journeys", "Block 2.1 · Die Lehrenden-Persona und zwei Journeys")} minutes={BLOCK_MINUTES["2.1"]} reason={tt("Practises writing a second persona and one journey for each group; Block 2.2 reads the printed notes, not this block.", "Übt, eine zweite Persona und eine Journey für jede Gruppe zu schreiben; Block 2.2 liest die gedruckten Notizen, nicht diesen Block.")}>
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
