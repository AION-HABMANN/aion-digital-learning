"use client";

import { useEffect, useState } from "react";
import { MeasureThumb } from "@/components/day6/mocks";
import type { MeasureKind } from "@/components/day6/mocks";
import { JourneyGrid } from "@/components/day6/JourneyGrid";
import { DecisionsPicker } from "@/components/dayStd/DecisionsPicker";
import type { DecisionsCfg } from "@/components/dayStd/DecisionsPicker";
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
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { MEASURE_BY_ID } from "@/data/day6/case";
import { DECISIONS, DECISION_AREA, PHASES_R, PHASE_LABEL_R, R2_BUDGET, R2_MONTHS, R2_PICK, SEGMENTS, SEGMENT_BY_ID, SEG_MAX, SEG_MIN } from "@/data/day6/route2";
import type { SegmentId } from "@/data/day6/route2";
import { routeHref } from "@/data/course";
import { DOC_CSS } from "@/lib/exportDoc";
import { decisionKey, segmentKey } from "@/lib/day6/answerKey";
import { memoBody } from "@/lib/day6/exportDoc";
import { decisionOrderGuide, giveUpGuide, journeyR2Guide, problemsGuide, segPersonaGuide, targetWhyGuide, uncertainGuide } from "@/lib/day6/guides";
import { IDS, r2Missing } from "@/lib/day6/missing";
import { BLOCK_MINUTES, CORE2_MINUTES, MIN_FRAME, MIN_LINE, MIN_ROW } from "@/lib/day6/progress";
import { toggleCapped } from "@/lib/lists";
import type { MissingEntry } from "@/lib/missing";
import { useJumpTo } from "@/lib/useJumpTo";
import { euro, tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { showCardPart } from "@/store/useCardMore";
import type { D6R2 } from "@/store/dayTypesStd";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated, useStore } from "@/store/useStore";

/** Day 6 · Route 2 · the UX Strategy Memo (Level 3). Core: Block 3.1 and Block 3.2, which hold the plan's Transferprojekt (CLAUDE.md #44). */

const DAY = 6;
const useR2 = () => useStdSlice<D6R2>(DAY, 2);

function CaseBrief() {
  const chosen = useStore((s) => s.d6.r1.chosen);
  const jump = useJumpTo();
  return (
    <section id="task-2" aria-labelledby="case2-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case2-h">{tt("The situation: EduPath's Head of UX Strategy", "Die Lage: Head of UX Strategy von EduPath")}</h2>
        <span className="smallcaps">{tt("Read once · about 2 min", "Einmal lesen · ca. 2 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        {tt(
          `You are the Head of UX Strategy of EduPath. The platform is growing quickly, resources are limited, and different user groups have conflicting needs. Management wants a segmentation and journey strategy for the next ${R2_MONTHS} months, and it expects you to justify the choice of the group you put first.`,
          `Sie sind Head of UX Strategy von EduPath. Die Plattform wächst schnell, die Ressourcen sind begrenzt, und verschiedene Nutzergruppen haben widersprüchliche Bedürfnisse. Die Geschäftsführung will eine Segmentierungs- und Journey-Strategie für die nächsten ${R2_MONTHS} Monate und erwartet, dass Sie die Wahl der Gruppe begründen, die Sie an erste Stelle setzen.`,
        )}
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Budget for the year: ", "Budget für das Jahr: ")}
              <strong>{euro(R2_BUDGET)}</strong> <span className="text-ash">{tt("(Case assumption: the plan only says “limited resources”)", "(Fallannahme: der Plan sagt nur „begrenzte Ressourcen“)")}</span>
            </li>
            <li>{tt("Data: thin. 12 learner interviews, 6 teacher interviews, usage logs, 4 training-manager conversations.", "Daten: dünn. 12 Lernenden-Interviews, 6 Lehrenden-Interviews, Nutzungslogs, 4 Gespräche mit Weiterbildungsleitern.")}</li>
            <li>{tt("You must decide which persona to prioritise although you cannot be sure.", "Sie müssen entscheiden, welche Persona Sie priorisieren, obwohl Sie nicht sicher sein können.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · two core blocks, about ${CORE2_MINUTES} min`, `So läuft die Aufgabe · zwei Kernblöcke, ca. ${CORE2_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 3.1: your strategic personas, the most important target group and its three biggest problems (B1, B2).", "Block 3.1: Ihre strategischen Personas, die wichtigste Zielgruppe und ihre drei größten Probleme (B1, B2).")}</li>
            <li>{tt("Block 3.2: the most critical journey, three decisions in a priority order, one decision under uncertainty, and what you give up (B2, B3).", "Block 3.2: die kritischste Journey, drei Entscheidungen in einer Prioritätsreihenfolge, eine Entscheidung unter Unsicherheit und worauf Sie verzichten (B2, B3).")}</li>
          </ol>
        </div>
      </div>
      <p className="text-caption text-ash">
        {chosen.length ? (
          <>
            {tt("Your Route 1 answer, as a soft pointer: the measures you chose were ", "Ihre Antwort aus Route 1, als weicher Hinweis: Die Maßnahmen, die Sie gewählt haben, waren ")}
            <strong className="text-ink">{chosen.map((id) => MEASURE_BY_ID[id].name).join(", ")}</strong>.{" "}
            <button type="button" onClick={() => jump("block-2-2", routeHref(DAY, 1))} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
              {tt("Open it in Route 1", "In Route 1 öffnen")}
            </button>
          </>
        ) : (
          tt("Route 1 is not needed for this route. If you have done it, your personas and journeys may be used here.", "Route 1 ist für diese Route nicht nötig. Wenn Sie sie gemacht haben, können Sie Ihre Personas und Journeys hier nutzen.")
        )}
      </p>
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("The brief says: different user groups with conflicting needs, limited resources, a quickly growing platform. Everything else is made up: the €220,000, the segment figures and the seven decisions with their costs and weeks.", "Der Auftrag sagt: verschiedene Nutzergruppen mit widersprüchlichen Bedürfnissen, begrenzte Ressourcen, eine schnell wachsende Plattform. Alles andere ist erfunden: die 220.000 €, die Segmentzahlen und die sieben Entscheidungen mit ihren Kosten und Wochen.")}</p>
      </Callout>
    </section>
  );
}

/* ------------------------------------------------------------------ Block 3.1 */

export function Block31({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR2();
  const [note, setNote] = useState("");
  const full = r.segs.length >= SEG_MAX;
  return (
    <AnswerBlock
      id="block-3-1"
      title={tt("Block 3.1 · Strategic personas, the target group and the three biggest problems", "Block 3.1 · Strategische Personas, die Zielgruppe und die drei größten Probleme")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["3.1"]}
      findIt={tt("Route 2 → Task 2 → the five candidate segments in the table below, then the choice of personas, the target group and the fields under them. Answer in the lists and the fields.", "Route 2 → Task 2 → die fünf Kandidatensegmente in der Tabelle darunter, dann die Wahl der Personas, die Zielgruppe und die Felder darunter. Antworten Sie in den Listen und Feldern.")}
    >
      <MaterialRefs refs={["B1", "B2"]} />
      <DataTable
        caption={tt("Five candidate segments (all figures are Case assumptions)", "Fünf Kandidatensegmente (alle Zahlen sind Fallannahmen)")}
        head={[tt("No.", "Nr."), tt("Segment", "Segment"), tt("Facts", "Fakten")]}
        rows={SEGMENTS.map((s) => [s.no, s.name, s.facts])}
      />
      <Field id={IDS.segPick} label={tt(`Choose two or three segments as your strategic personas`, `Wählen Sie zwei oder drei Segmente als Ihre strategischen Personas`)} help={tt("A persona is strategic if a decision would change because of it (Materi B1). You have chosen:", "Eine Persona ist strategisch, wenn sich eine Entscheidung wegen ihr ändern würde (Materi B1). Sie haben gewählt:") + ` ${r.segs.length} / ${SEG_MIN}–${SEG_MAX}`}>
        <OptionList<SegmentId>
          options={SEGMENTS.map((s) => ({ id: s.id, label: `${s.no} · ${s.name}`, sub: s.facts }))}
          value={r.segs}
          onChange={(id) => {
            setNote("");
            patch((s) => ({ segs: toggleCapped(s.segs, id, SEG_MAX) }));
          }}
          multi
          cols={2}
          label={tt("Candidate segments", "Kandidatensegmente")}
          disabledIds={full ? SEGMENTS.map((s) => s.id) : []}
          onDisabledClick={() => setNote(tt(`You have ${SEG_MAX}. Deselect one first.`, `Sie haben ${SEG_MAX}. Wählen Sie zuerst eines ab.`))}
        />
        {note && <p role="status" className="text-caption text-ash">{note}</p>}
      </Field>
      {r.segs.map((id) => (
        <TextBox
          key={id}
          id={IDS.segPersona(id)}
          label={tt(`The persona for ${SEGMENT_BY_ID[id].no} · ${SEGMENT_BY_ID[id].name}`, `Die Persona für ${SEGMENT_BY_ID[id].no} · ${SEGMENT_BY_ID[id].name}`)}
          help={tt(`One or two sentences: goal, problem and situation, and the evidence behind it from the facts above. At least ${MIN_LINE} characters.`, `Ein oder zwei Sätze: Ziel, Problem und Situation und der Beleg dafür aus den Fakten oben. Mindestens ${MIN_LINE} Zeichen.`)}
          value={r.segPersona[id] ?? ""}
          onChange={(v) => patch((s) => ({ segPersona: { ...s.segPersona, [id]: v } }))}
          min={MIN_LINE}
          rows={3}
        />
      ))}
      {r.segs.length > 0 && (
        <>
          <ExampleAnswer id="segpersona-example" guide={segPersonaGuide()} />
          {mentor && <MentorGuide guide={segPersonaGuide()} />}
        </>
      )}
      <Field id={IDS.target} label={tt("Select the most important target group", "Wählen Sie die wichtigste Zielgruppe")} help={tt("Choose one; the next field asks why.", "Wählen Sie eine; das nächste Feld fragt, warum.")}>
        <OptionList<SegmentId> options={SEGMENTS.map((s) => ({ id: s.id, label: `${s.no} · ${s.name}` }))} value={r.target} onChange={(id) => patch({ target: id })} cols={2} label={tt("The target group", "Die Zielgruppe")} />
      </Field>
      <TextBox
        id={IDS.targetWhy}
        label={tt("Why this group first?", "Warum diese Gruppe zuerst?")}
        help={tt(`Say which test decided (size, business value or where its journey breaks) and what the other groups get instead. At least ${MIN_LINE} characters.`, `Sagen Sie, welcher Test entschieden hat (Größe, Geschäftswert oder wo ihre Journey bricht) und was die anderen Gruppen stattdessen bekommen. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.targetWhy}
        onChange={(v) => patch({ targetWhy: v })}
        min={MIN_LINE}
        rows={3}
      >
        <WritingHelp
          id="target-kit"
          refs={[
            { label: tt("Three tests for a strategic persona (Materi B1)", "Drei Tests für eine strategische Persona (Materi B1)"), value: tt("size · value · breakage", "Größe · Wert · Bruchstelle"), target: "mat-B1", before: () => showCardPart("B1", "rules") },
            { label: tt("The five segments and their facts", "Die fünf Segmente und ihre Fakten"), value: tt("S1 to S5", "S1 bis S5"), target: "block-3-1" },
          ]}
          steps={[
            tt("Name the test that decided for your group and quote the printed fact it rests on.", "Nennen Sie den Test, der für Ihre Gruppe entschieden hat, und zitieren Sie den gedruckten Fakt, auf dem er beruht."),
            tt("Name one other group and say what it gets instead and when.", "Nennen Sie eine andere Gruppe und sagen Sie, was sie stattdessen bekommt und wann."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="targetwhy-example" guide={targetWhyGuide()} />
      {mentor && <MentorGuide guide={targetWhyGuide()} />}
      <TextBox
        id={IDS.problems}
        label={tt("The three biggest problems of this group", "Die drei größten Probleme dieser Gruppe")}
        help={tt(`One line each. Name the situation and the phase of the journey. At least ${MIN_FRAME} characters in all.`, `Je eine Zeile. Nennen Sie die Situation und die Phase der Journey. Mindestens ${MIN_FRAME} Zeichen insgesamt.`)}
        value={r.problems}
        onChange={(v) => patch({ problems: v })}
        min={MIN_FRAME}
        rows={4}
      />
      <ExampleAnswer id="problems-example" guide={problemsGuide()} />
      {mentor && <MentorGuide guide={problemsGuide()} />}
      <AnswerKey block={segmentKey()} />
      <BlockMissing block="3.1" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 3.2 */

const DECISION_THUMB: Record<string, MeasureKind> = { d1: "formats", d2: "editor", d3: "onboarding", d4: "report", d5: "exam", d6: "research", d7: "site" };

const decisionsCfg = (): DecisionsCfg => ({
  day: DAY,
  items: DECISIONS.map((d) => ({ id: d.id, no: d.no, name: d.name, what: d.what, cost: d.cost, weeks: d.weeks, area: d.area })),
  areaLabel: (a) => DECISION_AREA[a as keyof typeof DECISION_AREA],
  thumb: (id) => <MeasureThumb kind={DECISION_THUMB[id]} />,
  budget: R2_BUDGET,
  pick: R2_PICK,
  pickLabel: tt("decisions for your prioritised UX optimisation strategy", "Entscheidungen für Ihre priorisierte UX-Optimierungsstrategie"),
  listLabel: tt("Decisions for the strategy", "Entscheidungen für die Strategie"),
  orderLabel: tt("Put the three decisions in priority order", "Bringen Sie die drei Entscheidungen in eine Prioritätsreihenfolge"),
  whyLabel: tt("Why does the first decision go first?", "Warum kommt die erste Entscheidung zuerst?"),
  whyHelp: tt(`Say what it does for your target group, or what the others depend on. At least ${MIN_LINE} characters.`, `Sagen Sie, was sie für Ihre Zielgruppe tut oder wovon die anderen abhängen. Mindestens ${MIN_LINE} Zeichen.`),
  ids: { pick: IDS.decisionPick, order: IDS.decisionOrder, orderWhy: IDS.decisionOrderWhy },
  guide: decisionOrderGuide,
});

export function Block32({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR2();
  return (
    <AnswerBlock
      id="block-3-2"
      title={tt("Block 3.2 · The critical journey, the strategy, a decision under uncertainty, and what you give up", "Block 3.2 · Die kritische Journey, die Strategie, eine Entscheidung unter Unsicherheit und worauf Sie verzichten")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["3.2"]}
      findIt={tt("Route 2 → Task 2 → the target group you chose in Block 3.1, then the journey grid, the seven decisions in the list, and the fields under them. Answer in the grid, the lists and the text boxes.", "Route 2 → Task 2 → die Zielgruppe, die Sie in Block 3.1 gewählt haben, dann das Journey-Raster, die sieben Entscheidungen in der Liste und die Felder darunter. Antworten Sie im Raster, in den Listen und Textfeldern.")}
    >
      <MaterialRefs refs={["B3", "B2"]} />
      <Field id={IDS.jSeg} label={tt("Map the most critical journey of your target group: which persona is it?", "Bilden Sie die kritischste Journey Ihrer Zielgruppe ab: Welche Persona ist es?")} help={tt("Choose the persona (S1 to S5) whose journey you map below.", "Wählen Sie die Persona (S1 bis S5), deren Journey Sie unten abbilden.")}>
        <OptionList<SegmentId> options={SEGMENTS.map((s) => ({ id: s.id, label: `${s.no} · ${s.name}` }))} value={r.jSeg} onChange={(id) => patch({ jSeg: id })} cols={2} label={tt("The persona of the journey", "Die Persona der Journey")} />
      </Field>
      <JourneyGrid name={tt("The critical journey", "Die kritische Journey")} phases={PHASES_R.map((k) => ({ id: k, label: PHASE_LABEL_R[k] }))} value={r.jr} onChange={(k, p) => patch((s) => ({ jr: { ...s.jr, [k]: { ...s.jr[k as keyof typeof s.jr], ...p } } }))} fields={["does", "pain", "acts"]} idOf={IDS.jr} />
      <ExampleAnswer id="journey-example" guide={journeyR2Guide()} />
      {mentor && <MentorGuide guide={journeyR2Guide()} />}

      <DecisionsPicker cfg={decisionsCfg()} />
      <AnswerKey block={decisionKey()} />

      <p className="text-body font-semibold text-ink">{tt("One decision you make under uncertainty: which persona is prioritised", "Eine Entscheidung, die Sie unter Unsicherheit treffen: welche Persona priorisiert wird")}</p>
      <RevealHint id="uncertain-frame" label={tt("Show the frame", "Den Rahmen zeigen")} title={tt("The parts · taught in Materi B3", "Die Teile · aus Materi B3")}>
        <ol className="list-decimal space-y-1 pl-5 text-caption text-ink">
          <li>{tt("I decide …", "Ich entscheide …")}</li>
          <li>{tt("I do not know …", "Ich weiß nicht …")}</li>
          <li>{tt("I reverse if … (a figure) … by … (a time)", "Ich nehme zurück, wenn … (eine Zahl) … bis … (eine Zeit)")}</li>
        </ol>
        <p className="mt-1 text-micro text-ash">{tt("The fourth part, what you give up, has its own field below.", "Der vierte Teil, worauf Sie verzichten, hat unten ein eigenes Feld.")}</p>
      </RevealHint>
      <TextBox id={IDS.decide} label={tt("I decide …", "Ich entscheide …")} help={tt(`Which persona is prioritised, and for how long. At least ${MIN_ROW} characters.`, `Welche Persona priorisiert wird und wie lange. Mindestens ${MIN_ROW} Zeichen.`)} value={r.decide} onChange={(v) => patch({ decide: v })} min={MIN_ROW} rows={2} />
      <TextBox id={IDS.dontKnow} label={tt("I do not know …", "Ich weiß nicht …")} help={tt(`A specific unknown, and how much evidence the persona rests on. At least ${MIN_ROW} characters.`, `Ein konkretes Unbekanntes und auf wie viel Belegen die Persona beruht. Mindestens ${MIN_ROW} Zeichen.`)} value={r.dontKnow} onChange={(v) => patch({ dontKnow: v })} min={MIN_ROW} rows={2} />
      <TextBox id={IDS.reverse} label={tt("I reverse if … (a figure) … by … (a time)", "Ich nehme zurück, wenn … (eine Zahl) … bis … (eine Zeit)")} help={tt(`A figure you can watch and a time. At least ${MIN_LINE} characters.`, `Eine Zahl, die Sie beobachten können, und eine Zeit. Mindestens ${MIN_LINE} Zeichen.`)} value={r.reverse} onChange={(v) => patch({ reverse: v })} min={MIN_LINE} rows={2} />
      <ExampleAnswer id="uncertain-example" guide={uncertainGuide()} />
      {mentor && <MentorGuide guide={uncertainGuide()} />}

      <TextBox
        id={IDS.giveUp}
        label={tt("What do you give up or postpone, and when does that segment get its turn?", "Worauf verzichten Sie oder was verschieben Sie, und wann kommt dieses Segment an die Reihe?")}
        help={tt(`Name something real that someone would miss. A plan that gives up nothing has not decided. At least ${MIN_LINE} characters.`, `Nennen Sie etwas Reales, das jemand vermissen würde. Ein Plan, der auf nichts verzichtet, hat nicht entschieden. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.giveUp}
        onChange={(v) => patch({ giveUp: v })}
        min={MIN_LINE}
        rows={3}
      />
      <ExampleAnswer id="giveup-example" guide={giveUpGuide()} />
      {mentor && <MentorGuide guide={giveUpGuide()} />}
      <BlockMissing block="3.2" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ the memo, as it builds (CLAUDE.md #39) */

function MemoPanel() {
  const p = usePersisted();
  const hydrated = useHydrated();
  const [open, setOpen] = useState(true);
  const [html, setHtml] = useState("");
  useEffect(() => {
    if (hydrated) setHtml(memoBody(p));
  }, [hydrated, p]);
  return (
    <section id="memo-panel" aria-labelledby="memo-h" className="card p-4 print:hidden">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 id="memo-h">{tt("The memo as it builds", "Das Memo, wie es entsteht")}</h3>
        <button type="button" aria-expanded={open} aria-controls="memo-body" onClick={() => setOpen((o) => !o)} className="btn-ghost btn-sm">
          {open ? tt("Hide the memo", "Das Memo ausblenden") : tt("Show the memo", "Das Memo einblenden")}
        </button>
      </div>
      {open && (
        <div id="memo-body" className="mx-auto mt-3 max-w-[48rem] overflow-x-auto rounded-lg border border-line bg-paper p-4 md:p-6">
          <style dangerouslySetInnerHTML={{ __html: DOC_CSS }} />
          <div className="doc" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ the task */

export function Task2() {
  const p = usePersisted();
  const missing = r2Missing(p);
  const filename = exportName(p.participant.name, DAY, 2);
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt("Task 2 · two core blocks", "Task 2 · zwei Kernblöcke")}</p>
        <h2>{tt("UX Strategy Memo: decide as Head of UX Strategy", "UX Strategy Memo: als Head of UX Strategy entscheiden")}</h2>
      </header>
      <CaseBrief />
      <Block31 missing={missing} />
      <Block32 missing={missing} />
      <MemoPanel />
      <ExportBar id="export-l3" previewTitle="" showPreview={false} exportLabel={tt("Export the UX Strategy Memo", "UX Strategy Memo exportieren")} docTitle="UX Strategy Memo" filename={filename} missing={missing} buildBody={() => memoBody(p)} />
    </div>
  );
}
