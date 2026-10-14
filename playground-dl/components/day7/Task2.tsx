"use client";

import { useEffect, useState } from "react";
import { MeasureThumb } from "@/components/day7/mocks";
import type { ThumbKind } from "@/components/day7/mocks";
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
import { Callout } from "@/components/ui/MaterialCard";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { MEASURE_BY_ID } from "@/data/day7/case";
import { DECISIONS, DECISION_AREA, EVALS, EVAL_MIN, KPIS, KPI_MIN, PLACES, PLACES_MIN, R2_BUDGET, R2_MONTHS, R2_PICK, RISKS } from "@/data/day7/route2";
import type { EvalId, KpiId, PlaceId, RiskId } from "@/data/day7/route2";
import { routeHref } from "@/data/course";
import { DOC_CSS } from "@/lib/exportDoc";
import { decisionKey, kpiKey, placesKey, riskKey } from "@/lib/day7/answerKey";
import { memoBody } from "@/lib/day7/exportDoc";
import { decisionOrderGuide, giveUpGuide, readersGuide, riskPlanGuide, strategyGuide, uncertainGuide } from "@/lib/day7/guides";
import { IDS, r2Missing } from "@/lib/day7/missing";
import { BLOCK_MINUTES, CORE2_MINUTES, MIN_FRAME, MIN_LINE, MIN_ROW } from "@/lib/day7/progress";
import { toggleList } from "@/lib/lists";
import type { MissingEntry } from "@/lib/missing";
import { useJumpTo } from "@/lib/useJumpTo";
import { euro, tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { showCardPart } from "@/store/useCardMore";
import type { D7R2 } from "@/store/dayTypesStd";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated, useStore } from "@/store/useStore";

/** Day 7 · Route 2 · the UX Strategy Memo (Level 3). Core: Block 3.1 and Block 3.2, which hold the plan's Transferprojekt (CLAUDE.md #44). */

const DAY = 7;
const useR2 = () => useStdSlice<D7R2>(DAY, 2);

function CaseBrief() {
  const first = useStore((s) => s.d7.r1.order[0]);
  const jump = useJumpTo();
  return (
    <section id="task-2" aria-labelledby="case2-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case2-h">{tt("The situation: InclusiveLearn's Chief UX and Accessibility Officer", "Die Lage: Chief UX and Accessibility Officer von InclusiveLearn")}</h2>
        <span className="smallcaps">{tt("Read once · about 2 min", "Einmal lesen · ca. 2 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        {tt(
          `You are the Chief UX and Accessibility Officer of InclusiveLearn. The platform is growing, but it does not reach all user groups. Accessibility requirements are increasing, and resources are limited. Management wants a strategy for inclusive UX and an evaluation system for the next ${R2_MONTHS} months, and it expects you to take responsibility at management level.`,
          `Sie sind Chief UX and Accessibility Officer von InclusiveLearn. Die Plattform wächst, erreicht aber nicht alle Nutzergruppen. Die Anforderungen an Barrierefreiheit steigen, und die Ressourcen sind begrenzt. Das Management will eine Strategie für inklusive UX und ein Evaluationssystem für die nächsten ${R2_MONTHS} Monate und erwartet, dass Sie Verantwortung auf Managementebene übernehmen.`,
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
            <li>{tt("Your data is incomplete: you do not know which groups use the platform or fail to.", "Ihre Daten sind unvollständig: Sie wissen nicht, welche Gruppen die Plattform nutzen oder daran scheitern.")}</li>
            <li>{tt("You must decide anyway.", "Sie müssen trotzdem entscheiden.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · two core blocks, about ${CORE2_MINUTES} min`, `So läuft die Aufgabe · zwei Kernblöcke, ca. ${CORE2_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 3.1: your strategy, where accessibility is checked and three prioritised measures (B1, B2).", "Block 3.1: Ihre Strategie, wo Barrierefreiheit geprüft wird, und drei priorisierte Maßnahmen (B1, B2).")}</li>
            <li>{tt("Block 3.2: the evaluation system, the risk analysis (costs against benefits), one decision under uncertainty, and what you give up (B2, B3).", "Block 3.2: das Evaluationssystem, die Risikoanalyse (Kosten gegen Nutzen), eine Entscheidung unter Unsicherheit und worauf Sie verzichten (B2, B3).")}</li>
          </ol>
        </div>
      </div>
      <p className="text-caption text-ash">
        {first ? (
          <>
            {tt("Your Route 1 answer, as a soft pointer: your first priority there was ", "Ihre Antwort aus Route 1, als weicher Hinweis: Ihre erste Priorität dort war ")}
            <strong className="text-ink">{MEASURE_BY_ID[first].name}</strong>.{" "}
            <button type="button" onClick={() => jump("block-2-2", routeHref(DAY, 1))} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
              {tt("Open it in Route 1", "In Route 1 öffnen")}
            </button>
          </>
        ) : (
          tt("Route 1 is not needed for this route. If you have done it, your answers are quoted in the memo.", "Route 1 ist für diese Route nicht nötig. Wenn Sie sie gemacht haben, werden Ihre Antworten im Memo zitiert.")
        )}
      </p>
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("The brief says: a growing platform that does not reach all user groups, increasing accessibility requirements, limited resources. Everything else is made up: the €240,000, the seven measures with their costs and weeks.", "Der Auftrag sagt: eine wachsende Plattform, die nicht alle Nutzergruppen erreicht, steigende Anforderungen an Barrierefreiheit, begrenzte Ressourcen. Alles andere ist erfunden: die 240.000 €, die sieben Maßnahmen mit ihren Kosten und Wochen.")}</p>
      </Callout>
    </section>
  );
}

/* ------------------------------------------------------------------ Block 3.1 */

const DECISION_THUMB: Record<string, ThumbKind> = { d1: "courses20", d2: "pipeline", d3: "quarters", d4: "language", d5: "audit", d6: "toolbar", d7: "features" };

const decisionsCfg = (): DecisionsCfg => ({
  day: DAY,
  items: DECISIONS.map((d) => ({ id: d.id, no: d.no, name: d.name, what: d.what, cost: d.cost, weeks: d.weeks, area: d.area })),
  areaLabel: (a) => DECISION_AREA[a as keyof typeof DECISION_AREA],
  thumb: (id) => <MeasureThumb kind={DECISION_THUMB[id]} />,
  budget: R2_BUDGET,
  pick: R2_PICK,
  pickLabel: tt("measures for your strategy", "Maßnahmen für Ihre Strategie"),
  listLabel: tt("Measures for the strategy", "Maßnahmen für die Strategie"),
  orderLabel: tt("Put the three measures in priority order", "Bringen Sie die drei Maßnahmen in eine Prioritätsreihenfolge"),
  whyLabel: tt("Why does the first measure go first?", "Warum kommt die erste Maßnahme zuerst?"),
  whyHelp: tt(`Say which groups it reaches and what it costs to wait. At least ${MIN_LINE} characters.`, `Sagen Sie, welche Gruppen sie erreicht und was Warten kostet. Mindestens ${MIN_LINE} Zeichen.`),
  ids: { pick: IDS.decisionPick, order: IDS.decisionOrder, orderWhy: IDS.decisionOrderWhy },
  guide: decisionOrderGuide,
});

export function Block31({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR2();
  return (
    <AnswerBlock
      id="block-3-1"
      title={tt("Block 3.1 · Strategy, integration and three measures", "Block 3.1 · Strategie, Integration und drei Maßnahmen")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["3.1"]}
      findIt={tt("Route 2 → Task 2 → the strategy field, the list of places where accessibility is checked, then the seven measures in the list below, each with its printed cost and weeks. Answer in the fields and the lists.", "Route 2 → Task 2 → das Strategiefeld, die Liste der Stellen, an denen Barrierefreiheit geprüft wird, dann die sieben Maßnahmen in der Liste darunter, jeweils mit gedruckten Kosten und Wochen. Antworten Sie in den Feldern und Listen.")}
    >
      <MaterialRefs refs={["B1", "B2"]} />
      <TextBox
        id={IDS.strategy}
        label={tt("Your strategy for inclusive UX, in two or three sentences", "Ihre Strategie für inklusive UX, in zwei oder drei Sätzen")}
        help={tt(`Which groups you aim to reach, what you will change first, and why this is a core quality and not an add-on. At least ${MIN_FRAME} characters.`, `Welche Gruppen Sie erreichen wollen, was Sie zuerst ändern und warum das eine Kernqualität und kein Add-on ist. Mindestens ${MIN_FRAME} Zeichen.`)}
        value={r.strategy}
        onChange={(v) => patch({ strategy: v })}
        min={MIN_FRAME}
        rows={5}
      >
        <WritingHelp
          id="strategy-kit"
          refs={[{ label: tt("The strategic case in three parts (Materi B1)", "Der strategische Fall in drei Teilen (Materi B1)"), value: tt("rules · reach · long-term quality", "Regeln · Reichweite · langfristige Qualität"), target: "mat-B1", before: () => showCardPart("B1", "rules") }]}
          steps={[
            tt("Name the groups you aim to reach, and how you know they are shut out today (or will find out).", "Nennen Sie die Gruppen, die Sie erreichen wollen, und woher Sie wissen, dass sie heute ausgeschlossen sind (oder herausfinden werden)."),
            tt("Say what you change first, then why it is a core quality: who else gains, and what retrofitting later would cost.", "Sagen Sie, was Sie zuerst ändern, dann warum es eine Kernqualität ist: wer sonst profitiert und was Nachrüsten später kosten würde."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="strategy-example" guide={strategyGuide()} />
      {mentor && <MentorGuide guide={strategyGuide()} />}

      <Field id={IDS.places} label={tt("Integration into existing processes: where will accessibility be checked?", "Integration in bestehende Prozesse: Wo wird Barrierefreiheit geprüft?")} help={tt(`So that it does not depend on one person. Choose at least ${PLACES_MIN}. You have chosen: ${r.places.length}`, `Damit es nicht von einer Person abhängt. Wählen Sie mindestens ${PLACES_MIN}. Sie haben gewählt: ${r.places.length}`)}>
        <OptionList<PlaceId> options={PLACES.map((p) => ({ id: p.id, label: p.text, sub: p.reading }))} value={r.places} onChange={(id) => patch((s) => ({ places: toggleList(s.places, id) }))} multi cols={2} label={tt("Places where accessibility is checked", "Stellen, an denen Barrierefreiheit geprüft wird")} />
      </Field>
      <AnswerKey block={placesKey()} />

      <DecisionsPicker cfg={decisionsCfg()} />
      <AnswerKey block={decisionKey()} />
      <BlockMissing block="3.1" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 3.2 */

export function Block32({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR2();
  return (
    <AnswerBlock
      id="block-3-2"
      title={tt("Block 3.2 · Evaluation system, risk analysis, a decision under uncertainty, and what you give up", "Block 3.2 · Evaluationssystem, Risikoanalyse, eine Entscheidung unter Unsicherheit und worauf Sie verzichten")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["3.2"]}
      findIt={tt("Route 2 → Task 2 → the three measures you chose in Block 3.1, then the lists of KPIs and methods and the fields below. Answer in the lists and the text boxes.", "Route 2 → Task 2 → die drei Maßnahmen, die Sie in Block 3.1 gewählt haben, dann die Listen mit KPIs und Methoden und die Felder darunter. Antworten Sie in den Listen und Textfeldern.")}
    >
      <MaterialRefs refs={["B3", "B2"]} />
      <Field id={IDS.kpis} label={tt("Your evaluation system: KPIs", "Ihr Evaluationssystem: KPIs")} help={tt(`Choose at least ${KPI_MIN}. Read every KPI by group, not as one average. You have chosen: ${r.kpis.length}`, `Wählen Sie mindestens ${KPI_MIN}. Lesen Sie jeden KPI pro Gruppe, nicht als einen Durchschnitt. Sie haben gewählt: ${r.kpis.length}`)}>
        <OptionList<KpiId> options={KPIS.map((k) => ({ id: k.id, label: k.text }))} value={r.kpis} onChange={(id) => patch((s) => ({ kpis: toggleList(s.kpis, id) }))} multi cols={2} label={tt("KPIs", "KPIs")} />
      </Field>
      <Field id={IDS.evals} label={tt("Your evaluation system: methods", "Ihr Evaluationssystem: Methoden")} help={tt(`Choose at least ${EVAL_MIN}, one that gives reasons and one that gives counts or conformance. You have chosen: ${r.evals.length}`, `Wählen Sie mindestens ${EVAL_MIN}, eine, die Gründe liefert, und eine, die Zahlen oder Konformität liefert. Sie haben gewählt: ${r.evals.length}`)}>
        <OptionList<EvalId> options={EVALS.map((e) => ({ id: e.id, label: e.text, sub: `${tt("It gives:", "Sie liefert:")} ${e.gives}` }))} value={r.evals} onChange={(id) => patch((s) => ({ evals: toggleList(s.evals, id) }))} multi cols={2} label={tt("Evaluation methods", "Evaluationsmethoden")} />
      </Field>
      <TextBox
        id={IDS.readers}
        label={tt("Who reads these results, how often, and what must they do when a KPI is poor?", "Wer liest diese Ergebnisse, wie oft, und was muss er tun, wenn ein KPI schlecht ist?")}
        help={tt(`One or two sentences: a role, a rhythm and a consequence. At least ${MIN_LINE} characters.`, `Ein bis zwei Sätze: eine Rolle, ein Rhythmus und eine Konsequenz. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.readers}
        onChange={(v) => patch({ readers: v })}
        min={MIN_LINE}
        rows={3}
      />
      <ExampleAnswer id="readers-example" guide={readersGuide()} />
      {mentor && <MentorGuide guide={readersGuide()} />}
      <AnswerKey block={kpiKey()} />

      <Field id={IDS.risk} label={tt("Risk analysis: costs against benefits", "Risikoanalyse: Kosten gegen Nutzen")} help={tt("Imagine the plan has failed in a year. Which reason is the most likely? Choose one.", "Stellen Sie sich vor, der Plan ist in einem Jahr gescheitert. Welcher Grund ist am wahrscheinlichsten? Wählen Sie einen.")}>
        <OptionList<RiskId> options={RISKS.map((x) => ({ id: x.id, label: x.text }))} value={r.risk} onChange={(id) => patch({ risk: id })} label={tt("Risks", "Risiken")} />
      </Field>
      <TextBox id={IDS.riskPlan} label={tt("What do you do about that risk?", "Was tun Sie gegen dieses Risiko?")} help={tt(`One action, and the cost of the action against the cost of the risk. At least ${MIN_LINE} characters.`, `Eine Maßnahme, und die Kosten der Maßnahme gegen die Kosten des Risikos. Mindestens ${MIN_LINE} Zeichen.`)} value={r.riskPlan} onChange={(v) => patch({ riskPlan: v })} min={MIN_LINE} rows={2} />
      <ExampleAnswer id="riskplan-example" guide={riskPlanGuide()} />
      {mentor && <MentorGuide guide={riskPlanGuide()} />}
      <AnswerKey block={riskKey()} />

      <p className="text-body font-semibold text-ink">{tt("One decision you make under uncertainty (without complete user data)", "Eine Entscheidung, die Sie unter Unsicherheit treffen (ohne vollständige Nutzerdaten)")}</p>
      <RevealHint id="uncertain-frame" label={tt("Show the frame", "Den Rahmen zeigen")} title={tt("The parts · taught in Materi B3", "Die Teile · aus Materi B3")}>
        <ol className="list-decimal space-y-1 pl-5 text-caption text-ink">
          <li>{tt("I decide …", "Ich entscheide …")}</li>
          <li>{tt("I do not know …", "Ich weiß nicht …")}</li>
          <li>{tt("I reverse if … (a figure) … by … (a time)", "Ich nehme zurück, wenn … (eine Zahl) … bis … (eine Zeit)")}</li>
        </ol>
        <p className="mt-1 text-micro text-ash">{tt("The fourth part, what you give up, has its own field below.", "Der vierte Teil, worauf Sie verzichten, hat unten ein eigenes Feld.")}</p>
      </RevealHint>
      <TextBox id={IDS.decide} label={tt("I decide …", "Ich entscheide …")} help={tt(`What you decide, in one sentence. At least ${MIN_ROW} characters.`, `Was Sie entscheiden, in einem Satz. Mindestens ${MIN_ROW} Zeichen.`)} value={r.decide} onChange={(v) => patch({ decide: v })} min={MIN_ROW} rows={2} />
      <TextBox id={IDS.dontKnow} label={tt("I do not know …", "Ich weiß nicht …")} help={tt(`A specific unknown, for example how many learners are affected. At least ${MIN_ROW} characters.`, `Ein konkretes Unbekanntes, zum Beispiel wie viele Lernende betroffen sind. Mindestens ${MIN_ROW} Zeichen.`)} value={r.dontKnow} onChange={(v) => patch({ dontKnow: v })} min={MIN_ROW} rows={2} />
      <TextBox id={IDS.reverse} label={tt("I reverse if … (a figure) … by … (a time)", "Ich nehme zurück, wenn … (eine Zahl) … bis … (eine Zeit)")} help={tt(`A figure you can watch and a time. At least ${MIN_LINE} characters.`, `Eine Zahl, die Sie beobachten können, und eine Zeit. Mindestens ${MIN_LINE} Zeichen.`)} value={r.reverse} onChange={(v) => patch({ reverse: v })} min={MIN_LINE} rows={2} />
      <ExampleAnswer id="uncertain-example" guide={uncertainGuide()} />
      {mentor && <MentorGuide guide={uncertainGuide()} />}

      <TextBox
        id={IDS.giveUp}
        label={tt("What do you give up or postpone?", "Worauf verzichten Sie oder was verschieben Sie?")}
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
        <h2>{tt("UX Strategy Memo: decide as Chief UX and Accessibility Officer", "UX Strategy Memo: als Chief UX and Accessibility Officer entscheiden")}</h2>
      </header>
      <CaseBrief />
      <Block31 missing={missing} />
      <Block32 missing={missing} />
      <MemoPanel />
      <ExportBar id="export-l3" previewTitle="" showPreview={false} exportLabel={tt("Export the UX Strategy Memo", "UX Strategy Memo exportieren")} docTitle="UX Strategy Memo" filename={filename} missing={missing} buildBody={() => memoBody(p)} />
    </div>
  );
}
