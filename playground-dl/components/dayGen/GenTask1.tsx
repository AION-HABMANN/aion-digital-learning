"use client";

import Link from "next/link";
import { useState } from "react";
import { CaseBriefView } from "@/components/dayGen/GenBits";
import type { GenKit } from "@/components/dayGen/GenBits";
import { GenFieldView } from "@/components/dayGen/GenFieldView";
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
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { PlacementBoard } from "@/components/ui/PlacementBoard";
import { RevealHint } from "@/components/ui/RevealHint";
import { routeHref } from "@/data/course";
import { causeKey, measureKey, optKey, sortKey } from "@/lib/dayGen/answerKey";
import { causeHolds, sortHolds } from "@/lib/dayGen/checks";
import { genAnalysisBody } from "@/lib/dayGen/exportDoc";
import { causeWhyGuide, missingGuide, optWhyGuide, orderGuide, reasonGuide, reflectGuide } from "@/lib/dayGen/guides";
import { GIDS, genR1Missing } from "@/lib/dayGen/missing";
import { effortBandOf, realFields } from "@/lib/dayGen/model";
import type { GenSpec } from "@/lib/dayGen/spec";
import { BLOCK_MINUTES, MIN_LINE } from "@/lib/dayStd/common";
import { Gloss } from "@/lib/glossify";
import { tt } from "@/lib/lang";
import { placeItem, redoSort, toggleCapped, undoSort } from "@/lib/lists";
import type { MissingEntry } from "@/lib/missing";
import { exportName } from "@/lib/slug";
import type { GenR1 } from "@/store/dayTypesGen";
import { usePersisted } from "@/store/usePersisted";

/** Route 1 of a generic day · the UX Analysis File. Core: Block 1.1 (Level 1) and Block 2.2 (Level 2). Optional: 1.2, 1.3, 2.1 (CLAUDE.md #35, #40). */

function PartHeading({ id, n, title, level }: { id: string; n: number; title: string; level: string }) {
  return (
    <div id={id} className="flex flex-wrap items-baseline gap-x-3 border-b-2 border-ink pb-1 pt-2">
      <span className="smallcaps text-accent">{tt(`Part ${n}`, `Teil ${n}`)}</span>
      <h2>{title}</h2>
      <span className="smallcaps ml-auto">{level}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ Block 1.1 (Core, Level 1) */

function Block11({ spec, kit, missing }: { spec: GenSpec; kit: GenKit; missing: MissingEntry[] }) {
  const { r, patch } = useStdSlice<GenR1>(spec.day, 1);
  const Evidence = kit.Evidence;
  return (
    <AnswerBlock id="block-1-1" title={spec.b11.title} kind="OBJECTIVE + JUDGED" core minutes={BLOCK_MINUTES["1.1"]} findIt={spec.b11.findIt}>
      <MaterialRefs refs={spec.b11.refs} />
      {spec.b11.plan && <p className="text-caption text-ash">{spec.b11.plan}</p>}
      <Evidence />
      <PlacementBoard<string>
        items={spec.facts.map((f) => ({ id: f.id, meta: `${f.no} · ${f.where}`, text: f.text }))}
        bins={spec.cats.map((c) => ({ id: c.id, label: c.label, hint: c.hint }))}
        value={r.sort}
        onPlace={(id, bin) => patch((s) => placeItem<string, GenR1>(s, id, bin))}
        onUndo={() => patch((s) => undoSort<string, GenR1>(s))}
        onRedo={() => patch((s) => redoSort<string, GenR1>(s))}
        undoCount={r.sortHistory.length}
        redoCount={r.sortFuture.length}
        domId={GIDS.fact}
        keyPhrases={Object.fromEntries(spec.facts.map((f) => [f.id, f.key]))}
        clues={Object.fromEntries(spec.facts.map((f) => [f.id, f.clue]))}
        reasons={Object.fromEntries(spec.facts.map((f) => [f.id, f.why]))}
        result={r.sortResult}
        checks={r.sortChecks}
        onCheck={() => patch((s) => ({ sortChecks: s.sortChecks + 1, sortResult: sortHolds(spec, s.sort) }))}
        onClue={() => patch({ sortClue: true })}
        clueShown={r.sortClue}
        reasoningOpened={r.sortReasoning}
        onOpenReasoning={() => patch({ sortReasoning: true })}
        noun={spec.sortNoun}
        intro={spec.sortIntro}
        tests={
          <RevealHint id="sort-tests" label={tt("Show the test questions", "Testfragen zeigen")} title={spec.testsLabel}>
            <div className="space-y-2 text-caption text-ink">
              <p>{tt("Ask these of every fact. They repeat the categories; they never say which fact goes where.", "Stellen Sie diese Fragen zu jedem Fakt. Sie wiederholen die Kategorien; sie sagen nie, welcher Fakt wohin gehört.")}</p>
              <ul className="space-y-1.5">
                {spec.cats.map((c) => (
                  <li key={c.id}>
                    <span className="font-semibold">{c.label}. </span>
                    <Gloss>{c.test}</Gloss>
                  </li>
                ))}
              </ul>
              <MaterialRefs refs={spec.b11.refs.slice(0, 1)} lead={tt("Taught in", "Gelehrt in")} />
            </div>
          </RevealHint>
        }
      />
      {realFields(spec.b11.fields).map((f) => (
        <GenFieldView key={f.id} day={spec.day} route={1} f={f} block="1.1" />
      ))}
      <AnswerKey block={sortKey(spec)} />
      <BlockMissing block="1.1" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 2.1 (Optional) */

function Block21({ spec, missing }: { spec: GenSpec; missing: MissingEntry[] }) {
  const { r, patch, mentor } = useStdSlice<GenR1>(spec.day, 1);
  const [note, setNote] = useState("");
  const c = spec.causes;
  const cap = spec.limits.pickCauses;
  const full = r.causes.length >= cap;
  return (
    <AnswerBlock id="block-2-1" title={c.title} kind="OBJECTIVE + JUDGED" core={false} minutes={BLOCK_MINUTES["2.1"]} findIt={c.findIt}>
      <MaterialRefs refs={c.refs} />
      <Field id={GIDS.causePick} label={c.pickLabel} help={`${c.pickHelp} ${tt("You have chosen:", "Sie haben gewählt:")} ${r.causes.length} / ${cap}`}>
        <OptionList
          options={c.items.map((x) => ({ id: x.id, label: x.text }))}
          value={r.causes}
          onChange={(id) => {
            setNote("");
            patch((s) => ({ causes: toggleCapped(s.causes, id, cap), causeResult: null }));
          }}
          multi
          label={c.listLabel}
          disabledIds={full ? c.items.map((x) => x.id) : []}
          onDisabledClick={() => setNote(tt(`You have ${cap}. Deselect one first.`, `Sie haben ${cap}. Wählen Sie zuerst eine ab.`))}
        />
        {note && (
          <p role="status" className="text-caption text-ash">
            {note}
          </p>
        )}
        <CheckBar onCheck={() => patch((s) => ({ checks: s.checks + 1, causeResult: causeHolds(spec, s.causes) }))} checkLabel={c.checkLabel} clueShown={r.causeClue} onClue={() => patch({ causeClue: true })} checks={r.checks} />
        {r.causeResult && <Reading>{r.causeResult.chosen === 0 ? tt("Nothing chosen yet.", "Noch nichts gewählt.") : tt(`${r.causeResult.holds} of ${r.causeResult.chosen} chosen hold. It never says which.`, `${r.causeResult.holds} von ${r.causeResult.chosen} gewählten stimmen. Es sagt nie, welche.`)}</Reading>}
        {r.causeClue && <Reading label={tt("Clue", "Hinweis")}>{c.clue}</Reading>}
      </Field>
      <TextBox id={GIDS.causeWhy} label={c.whyLabel} help={c.whyHelp} value={r.causeWhy} onChange={(v) => patch({ causeWhy: v })} min={MIN_LINE} rows={3} />
      <ExampleAnswer id="causewhy-example" guide={causeWhyGuide(spec)} />
      {mentor && <MentorGuide guide={causeWhyGuide(spec)} />}
      <AnswerKey block={causeKey(spec)} />
      <BlockMissing block="2.1" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ the task */

export function GenTask1({ spec, kit }: { spec: GenSpec; kit: GenKit }) {
  const p = usePersisted();
  const missing = genR1Missing(p, spec);
  const filename = exportName(p.participant.name, spec.day, 1);
  const band = effortBandOf(spec);

  const measuresCfg: MeasuresCfg = {
    day: spec.day,
    measures: spec.b22.measures.map((m) => ({ id: m.id, no: m.no, name: m.name, what: m.what, notice: m.notice, cost: m.cost, weeks: m.weeks, area: m.area })),
    areaLabel: (a) => spec.b22.areas[a],
    thumb: kit.measureThumb,
    budget: spec.limits.budget,
    weeksLimit: spec.limits.weeks,
    pick: spec.limits.pickMeasures,
    effortBand: band,
    effortRule: spec.b22.effortRuleText,
    impact: spec.b22.impact,
    riskHelp: spec.b22.riskHelp,
    refs: spec.b22.refs,
    title: spec.b22.title,
    findIt: spec.b22.findIt,
    listLabel: spec.b22.listLabel,
    evidenceNote: spec.b22.evidenceNote,
    reasonHelp: spec.b22.reasonHelp,
    orderWhyHelp: spec.b22.orderWhyHelp,
    ids: { pick: GIDS.measurePick, measure: GIDS.measure, reason: GIDS.reason, pain: GIDS.pain, order: GIDS.order, orderWhy: GIDS.orderWhy, missingInfo: GIDS.missingInfo },
    guides: { reason: (id) => reasonGuide(spec, id), order: () => orderGuide(spec), missing: () => missingGuide(spec) },
    key: () => measureKey(spec),
    afterOrder: (
      <>
        {spec.b22.afterNote && <p className="max-w-prose text-body text-ink">{spec.b22.afterNote}</p>}
        {realFields(spec.b22.after).map((f) => (
          <GenFieldView key={f.id} day={spec.day} route={1} f={f} block="2.2" />
        ))}
      </>
    ),
  };

  const optionsCfg: OptionsCfg = {
    day: spec.day,
    options: spec.opts.options.map((o) => ({ id: o.id, name: o.name, cost: o.cost, weeks: o.weeks })),
    criteria: spec.opts.criteria,
    effortBand: band,
    effortRule: spec.b22.effortRuleText,
    title: spec.opts.title,
    findIt: spec.opts.findIt,
    refs: spec.opts.refs,
    intro: <p>{spec.opts.intro}</p>,
    orderHelp: spec.opts.orderHelp,
    whyLabel: spec.opts.whyLabel,
    whyHelp: spec.opts.whyHelp,
    ids: { order: GIDS.optOrder, why: GIDS.optWhy },
    guide: () => optWhyGuide(spec),
    key: () => optKey(spec),
    thumb: kit.optionThumb,
  };

  return (
    <section id="task-1" aria-labelledby="task1-h" className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt("Task 1 · two core blocks, one per level; optional blocks folded", "Task 1 · zwei Kernblöcke, einer pro Level; optionale Blöcke eingeklappt")}</p>
        <h2 id="task1-h">{spec.route1.taskSub}</h2>
      </header>
      <CaseBriefView id="case-brief" b={spec.brief1} headingId="case-h" />
      <PartHeading id="part-1" n={1} title={spec.partHeadings.p1.title} level={spec.partHeadings.p1.level} />
      <Block11 spec={spec} kit={kit} missing={missing} />
      <OptionalSection id="block-1-2" title={spec.opts.title} minutes={BLOCK_MINUTES["1.2"]} reason={spec.opts.reason}>
        <OptionsBlock cfg={optionsCfg} missing={missing} />
      </OptionalSection>
      <OptionalSection id="block-1-3" title={spec.reflect.title} minutes={BLOCK_MINUTES["1.3"]} reason={spec.reflect.reason}>
        <ReflectBlock cfg={{ day: spec.day, title: spec.reflect.title, point: spec.reflect.point, questions: spec.reflect.questions, guide: () => reflectGuide(spec) }} missing={missing} />
      </OptionalSection>
      <PartHeading id="part-2" n={2} title={spec.partHeadings.p2.title} level={spec.partHeadings.p2.level} />
      <OptionalSection id="block-2-1" title={spec.causes.title} minutes={BLOCK_MINUTES["2.1"]} reason={spec.causes.reason}>
        <Block21 spec={spec} missing={missing} />
      </OptionalSection>
      <MeasuresBlock cfg={measuresCfg} missing={missing} />
      <ExportBar
        id="export-l1l2"
        previewTitle={tt("Preview of your UX Analysis File", "Vorschau Ihrer UX Analysis File")}
        exportLabel={tt("Export the UX Analysis File", "UX Analysis File exportieren")}
        docTitle="UX Analysis File"
        filename={filename}
        missing={missing}
        buildBody={() => genAnalysisBody(p, spec)}
      />
      <p className="text-caption text-ash print:hidden">
        {tt("Suggested next: ", "Empfohlen als Nächstes: ")}
        <Link href={routeHref(spec.day, 2)} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          {tt("Route 2 · Level 3 →", "Route 2 · Level 3 →")}
        </Link>{" "}
        {tt("It is only a suggestion; nothing is locked.", "Das ist nur eine Empfehlung; nichts ist gesperrt.")}
      </p>
    </section>
  );
}
