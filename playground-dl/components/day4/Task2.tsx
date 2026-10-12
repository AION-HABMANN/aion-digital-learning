"use client";

import { useEffect, useState } from "react";
import { MeasureThumb } from "@/components/day4/mocks";
import type { MeasureKind } from "@/components/day4/mocks";
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
import { FACT_BY_ID } from "@/data/day4/case";
import { DECISIONS, DECISION_AREA, EVIDENCE, EVIDENCE_MIN, METRICS, METRIC_MIN, OWNERS, R2_BUDGET, R2_MONTHS, R2_PICK, RISKS, STRATEGIES } from "@/data/day4/route2";
import type { EvidenceId, MetricId, OwnerId, RiskId, StrategyId } from "@/data/day4/route2";
import { routeHref } from "@/data/course";
import { DOC_CSS } from "@/lib/exportDoc";
import { decisionKey, logicKey, metricKey, riskKey, strategyKey } from "@/lib/day4/answerKey";
import { memoBody } from "@/lib/day4/exportDoc";
import { decisionOrderGuide, giveUpGuide, riskPlanGuide, strategyWhyGuide, successGuide, uncertainGuide } from "@/lib/day4/guides";
import { IDS, r2Missing } from "@/lib/day4/missing";
import { BLOCK_MINUTES, CORE2_MINUTES, MIN_FRAME, MIN_LINE, MIN_REASON } from "@/lib/day4/progress";
import { toggleList } from "@/lib/lists";
import type { MissingEntry } from "@/lib/missing";
import { useJumpTo } from "@/lib/useJumpTo";
import { euro, tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { showCardPart } from "@/store/useCardMore";
import type { D4R2 } from "@/store/dayTypesStd";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated, useStore } from "@/store/useStore";

/** Day 4 · Route 2 · the UX Strategy Memo (Level 3). Core: Block 3.1 and Block 3.2, which hold the plan's Transferprojekt (CLAUDE.md #44). */

const DAY = 4;
const useR2 = () => useStdSlice<D4R2>(DAY, 2);

function CaseBrief() {
  const r1 = useStore((s) => s.d4.r1);
  const jump = useJumpTo();
  return (
    <section id="task-2" aria-labelledby="case2-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case2-h">{tt("The situation: MotivaLearn's Chief Experience Officer", "Die Lage: Chief Experience Officer von MotivaLearn")}</h2>
        <span className="smallcaps">{tt("Read once · about 2 min", "Einmal lesen · ca. 2 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        {tt(
          `You are the Chief Experience Officer of MotivaLearn. User retention is low, competitors offer more motivating platforms, the budget is limited and your data is incomplete. Management wants an engagement strategy for the next ${R2_MONTHS} months and expects you to take responsibility for the user experience.`,
          `Sie sind Chief Experience Officer von MotivaLearn. Die Nutzer-Retention ist niedrig, Wettbewerber bieten motivierendere Plattformen, das Budget ist begrenzt und Ihre Daten sind unvollständig. Die Geschäftsführung will eine Engagement-Strategie für die nächsten ${R2_MONTHS} Monate und erwartet, dass Sie die Verantwortung für die User Experience übernehmen.`,
        )}
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Budget for the year: ", "Budget für das Jahr: ")}
              <strong>{euro(R2_BUDGET)}</strong> <span className="text-ash">{tt("(Case assumption: the plan only says “limited”)", "(Fallannahme: der Plan sagt nur „begrenzt“)")}</span>
            </li>
            <li>{tt("Data: incomplete. You know that learners leave, not why.", "Daten: unvollständig. Sie wissen, dass Lernende gehen, nicht warum.")}</li>
            <li>{tt("You must decide even though the data is incomplete.", "Sie müssen entscheiden, obwohl die Daten unvollständig sind.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · two core blocks, about ${CORE2_MINUTES} min`, `So läuft die Aufgabe · zwei Kernblöcke, ca. ${CORE2_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 3.1: your motivation strategy, three prioritised measures, and how you will measure success (B1, B3).", "Block 3.1: Ihre Motivationsstrategie, drei priorisierte Maßnahmen und wie Sie den Erfolg messen (B1, B3).")}</li>
            <li>{tt("Block 3.2: the biggest risk, one decision under uncertainty, who decides in future and on what evidence, and what you give up (B2, B3).", "Block 3.2: das größte Risiko, eine Entscheidung unter Unsicherheit, wer künftig entscheidet und auf welcher Grundlage, und worauf Sie verzichten (B2, B3).")}</li>
          </ol>
        </div>
      </div>
      <p className="text-caption text-ash">
        {r1.prefer ? (
          <>
            {tt("Your Route 1 answer, as a soft pointer: you found this platform more motivating: ", "Ihre Antwort aus Route 1, als weicher Hinweis: Diese Plattform fanden Sie motivierender: ")}
            <strong className="text-ink">{tt(`Platform ${r1.prefer}`, `Plattform ${r1.prefer}`)}</strong>.{" "}
            <button type="button" onClick={() => jump("block-1-1", routeHref(DAY, 1))} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
              {tt("Open it in Route 1", "In Route 1 öffnen")}
            </button>
          </>
        ) : (
          tt("Route 1 is not needed for this route. If you have done it, your answers are quoted in the memo.", "Route 1 ist für diese Route nicht nötig. Wenn Sie sie gemacht haben, werden Ihre Antworten im Memo zitiert.")
        )}
      </p>
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("The brief says: low user retention, competitors with more motivating platforms, a limited budget, incomplete data. Everything else is made up: the €180,000, the seven decisions with their costs and weeks.", "Der Auftrag sagt: niedrige Nutzer-Retention, Wettbewerber mit motivierenderen Plattformen, ein begrenztes Budget, unvollständige Daten. Alles andere ist erfunden: die 180.000 €, die sieben Entscheidungen mit ihren Kosten und Wochen.")}</p>
      </Callout>
    </section>
  );
}

/* ------------------------------------------------------------------ Block 3.1 */

const DECISION_THUMB: Record<string, MeasureKind> = { d1: "progress", d2: "rebuild", d3: "standard", d4: "rewards", d5: "research", d6: "streak", d7: "coupon" };

const decisionsCfg = (): DecisionsCfg => ({
  day: DAY,
  items: DECISIONS.map((d) => ({ id: d.id, no: d.no, name: d.name, what: d.what, cost: d.cost, weeks: d.weeks, area: d.area })),
  areaLabel: (a) => DECISION_AREA[a as keyof typeof DECISION_AREA],
  thumb: (id) => <MeasureThumb kind={DECISION_THUMB[id]} />,
  budget: R2_BUDGET,
  pick: R2_PICK,
  pickLabel: tt("decisions", "Entscheidungen"),
  listLabel: tt("Decisions for the strategy", "Entscheidungen für die Strategie"),
  orderLabel: tt("Put the three decisions in priority order", "Bringen Sie die drei Entscheidungen in eine Prioritätsreihenfolge"),
  whyLabel: tt("Why does the first decision go first?", "Warum kommt die erste Entscheidung zuerst?"),
  whyHelp: tt(`Say which condition it works on (motivation, ability, prompt) and what it does for retention. At least ${MIN_LINE} characters.`, `Sagen Sie, auf welche Bedingung sie wirkt (Motivation, Können, Impuls) und was sie für die Retention leistet. Mindestens ${MIN_LINE} Zeichen.`),
  ids: { pick: IDS.decisionPick, order: IDS.decisionOrder, orderWhy: IDS.decisionOrderWhy },
  guide: decisionOrderGuide,
});

export function Block31({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR2();
  return (
    <AnswerBlock
      id="block-3-1"
      title={tt("Block 3.1 · Motivation strategy, three measures and how you measure success", "Block 3.1 · Motivationsstrategie, drei Maßnahmen und wie Sie den Erfolg messen")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["3.1"]}
      findIt={tt("Route 2 → Task 2 → the strategy choice and its field, then the seven decisions in the list below, each with its printed cost and weeks, then the ways to measure success. Answer in the lists and the fields.", "Route 2 → Task 2 → die Strategiewahl und ihr Feld, dann die sieben Entscheidungen in der Liste darunter, jeweils mit gedruckten Kosten und Wochen, dann die Wege, den Erfolg zu messen. Antworten Sie in den Listen und Feldern.")}
    >
      <MaterialRefs refs={["B1", "B3"]} />
      <Field id={IDS.strategy} label={tt("Your motivation strategy: where do you lean?", "Ihre Motivationsstrategie: Wohin neigen Sie?")} help={tt("Intrinsic against extrinsic. Choose one; the next field asks why.", "Intrinsisch gegen extrinsisch. Wählen Sie eine; das nächste Feld fragt, warum.")}>
        <OptionList<StrategyId> options={STRATEGIES.map((s) => ({ id: s.id, label: s.text }))} value={r.strategy} onChange={(id) => patch({ strategy: id })} label={tt("The strategy", "Die Strategie")} />
      </Field>
      <TextBox
        id={IDS.strategyWhy}
        label={tt("Why? Which condition does your strategy work on, and for which learners?", "Warum? Auf welche Bedingung wirkt Ihre Strategie, und für welche Lernenden?")}
        help={tt(`Name which of the three conditions (motivation, ability, prompt) it works on. At least ${MIN_LINE} characters.`, `Nennen Sie, auf welche der drei Bedingungen (Motivation, Können, Impuls) sie wirkt. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.strategyWhy}
        onChange={(v) => patch({ strategyWhy: v })}
        min={MIN_LINE}
        rows={3}
      >
        <WritingHelp
          id="strategy-kit"
          refs={[{ label: tt("Motivation, ability, prompt (Materi B1)", "Motivation, Können, Impuls (Materi B1)"), value: tt("three conditions for behaviour", "drei Bedingungen für Verhalten"), target: "mat-B1", before: () => showCardPart("B1", "rules") }]}
          steps={[
            tt("Say which condition is the barrier for the learners who leave (the reason to continue, the ease of the next step, or an invitation).", "Sagen Sie, welche Bedingung für die Lernenden, die gehen, die Hürde ist (der Grund weiterzumachen, die Leichtigkeit des nächsten Schritts oder eine Einladung)."),
            tt("Say what your strategy does about it, and what it leaves out on purpose.", "Sagen Sie, was Ihre Strategie dagegen tut und was sie bewusst weglässt."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="strategy-example" guide={strategyWhyGuide()} />
      {mentor && <MentorGuide guide={strategyWhyGuide()} />}
      <AnswerKey block={strategyKey()} />

      <DecisionsPicker cfg={decisionsCfg()} />
      <AnswerKey block={decisionKey()} />

      <Field id={IDS.metrics} label={tt("Your evaluation strategy: how do we measure success?", "Ihre Evaluationsstrategie: Wie messen wir den Erfolg?")} help={tt(`Choose at least ${METRIC_MIN}. Be ready to say which question each answers. You have chosen: ${r.metrics.length}`, `Wählen Sie mindestens ${METRIC_MIN}. Seien Sie bereit zu sagen, welche Frage jede beantwortet. Sie haben gewählt: ${r.metrics.length}`)}>
        <OptionList<MetricId> options={METRICS.map((m) => ({ id: m.id, label: m.text }))} value={r.metrics} onChange={(id) => patch((s) => ({ metrics: toggleList(s.metrics, id) }))} multi cols={2} label={tt("Ways to measure success", "Wege, den Erfolg zu messen")} />
      </Field>
      <AnswerKey block={metricKey()} />
      <TextBox
        id={IDS.success}
        label={tt("Your success sentence", "Ihr Erfolgssatz")}
        help={tt(`What will you measure, against what baseline, with what method (for example a control group) and by when? At least ${MIN_FRAME} characters.`, `Was messen Sie, gegen welche Ausgangslage, mit welcher Methode (zum Beispiel einer Kontrollgruppe) und bis wann? Mindestens ${MIN_FRAME} Zeichen.`)}
        value={r.success}
        onChange={(v) => patch({ success: v })}
        min={MIN_FRAME}
        rows={4}
      >
        <WritingHelp
          id="success-kit"
          refs={[{ label: tt("Baseline, target, method, date (Materi B3)", "Ausgangslage, Ziel, Methode, Termin (Materi B3)"), value: tt("written before the change", "vor der Änderung aufgeschrieben"), target: "mat-B3", before: () => showCardPart("B3", "rules") }]}
          steps={[
            tt("Name one behaviour metric from your list and say today's value will be the baseline.", "Nennen Sie eine Verhaltenskennzahl aus Ihrer Liste und sagen Sie, dass der heutige Wert die Ausgangslage ist."),
            tt("Add a method that gives reasons (interviews) and, with enough learners, a control group, and say when you will read the result.", "Ergänzen Sie eine Methode, die Gründe liefert (Interviews) und bei genug Lernenden eine Kontrollgruppe, und sagen Sie, wann Sie das Ergebnis lesen."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="success-example" guide={successGuide()} />
      {mentor && <MentorGuide guide={successGuide()} />}
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
      title={tt("Block 3.2 · Risk, a decision under uncertainty, decision architecture, and what you give up", "Block 3.2 · Risiko, eine Entscheidung unter Unsicherheit, Entscheidungsarchitektur und worauf Sie verzichten")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["3.2"]}
      findIt={tt("Route 2 → Task 2 → the three decisions you chose in Block 3.1, then the fields below. Answer in the lists and the text boxes.", "Route 2 → Task 2 → die drei Entscheidungen, die Sie in Block 3.1 gewählt haben, dann die Felder darunter. Antworten Sie in den Listen und Textfeldern.")}
    >
      <MaterialRefs refs={["B3", "B2"]} />
      <Field id={IDS.risk} label={tt("The biggest risk of your plan", "Das größte Risiko Ihres Plans")} help={tt("Perverse incentives and wrong motivation. Imagine the plan has failed in a year. Which reason is the most likely? Choose one.", "Fehlanreize und falsche Motivation. Stellen Sie sich vor, der Plan ist in einem Jahr gescheitert. Welcher Grund ist am wahrscheinlichsten? Wählen Sie einen.")}>
        <OptionList<RiskId> options={RISKS.map((x) => ({ id: x.id, label: x.text }))} value={r.risk} onChange={(id) => patch({ risk: id })} label={tt("Risks", "Risiken")} />
      </Field>
      <TextBox id={IDS.riskPlan} label={tt("What do you do about that risk?", "Was tun Sie gegen dieses Risiko?")} help={tt(`One action, and when you would notice the risk. At least ${MIN_REASON} characters.`, `Eine Maßnahme, und wann Sie das Risiko bemerken würden. Mindestens ${MIN_REASON} Zeichen.`)} value={r.riskPlan} onChange={(v) => patch({ riskPlan: v })} min={MIN_REASON} rows={2} />
      <ExampleAnswer id="riskplan-example" guide={riskPlanGuide()} />
      {mentor && <MentorGuide guide={riskPlanGuide()} />}
      <AnswerKey block={riskKey()} />

      <TextBox
        id={IDS.uncertain}
        label={tt("One decision you make under uncertainty", "Eine Entscheidung, die Sie unter Unsicherheit treffen")}
        help={tt(`Say what you decide, what you do not know, and when you would reverse it, with a figure and a time. At least ${MIN_FRAME} characters.`, `Sagen Sie, was Sie entscheiden, was Sie nicht wissen und wann Sie es zurücknähmen, mit einer Zahl und einer Zeit. Mindestens ${MIN_FRAME} Zeichen.`)}
        value={r.uncertain}
        onChange={(v) => patch({ uncertain: v })}
        min={MIN_FRAME}
        rows={4}
      >
        <RevealHint id="uncertain-frame" label={tt("Show the frame", "Den Rahmen zeigen")} title={tt("The four parts · taught in Materi B3", "Die vier Teile · aus Materi B3")}>
          <ol className="list-decimal space-y-1 pl-5 text-caption text-ink">
            <li>{tt("I decide …", "Ich entscheide …")}</li>
            <li>{tt("I do not know …", "Ich weiß nicht …")}</li>
            <li>{tt("I reverse if … (a figure) … by … (a time)", "Ich nehme zurück, wenn … (eine Zahl) … bis … (eine Zeit)")}</li>
          </ol>
          <p className="mt-1 text-micro text-ash">{tt("The fourth part, what you give up, has its own field below.", "Der vierte Teil, worauf Sie verzichten, hat unten ein eigenes Feld.")}</p>
        </RevealHint>
      </TextBox>
      <ExampleAnswer id="uncertain-example" guide={uncertainGuide()} />
      {mentor && <MentorGuide guide={uncertainGuide()} />}

      <Field id={IDS.owner} label={tt("How will MotivaLearn decide on UX optimisation in future? Who decides?", "Wie entscheidet MotivaLearn künftig über UX-Optimierung? Wer entscheidet?")} help={tt("Choose one.", "Wählen Sie eine Antwort.")}>
        <OptionList<OwnerId> options={OWNERS.map((o) => ({ id: o.id, label: o.text }))} value={r.owner} onChange={(id) => patch({ owner: id })} label={tt("Who decides", "Wer entscheidet")} />
      </Field>
      <Field id={IDS.evidence} label={tt("On what evidence?", "Auf welcher Grundlage?")} help={tt(`Choose at least ${EVIDENCE_MIN}. You have chosen: ${r.evidence.length}`, `Wählen Sie mindestens ${EVIDENCE_MIN}. Sie haben gewählt: ${r.evidence.length}`)}>
        <OptionList<EvidenceId> options={EVIDENCE.map((c) => ({ id: c.id, label: c.text }))} value={r.evidence} onChange={(id) => patch((s) => ({ evidence: toggleList(s.evidence, id) }))} multi cols={2} label={tt("Evidence for a decision", "Belege für eine Entscheidung")} />
      </Field>
      <AnswerKey block={logicKey()} />

      <TextBox
        id={IDS.giveUp}
        label={tt("What do you give up or postpone?", "Worauf verzichten Sie oder was verschieben Sie?")}
        help={tt(`Name something real that someone would miss. A plan that gives up nothing has not decided. At least ${MIN_LINE} characters.`, `Nennen Sie etwas Reales, das jemand vermissen würde. Ein Plan, der auf nichts verzichtet, hat nicht entschieden. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.giveUp}
        onChange={(v) => patch({ giveUp: v })}
        min={MIN_LINE}
        rows={2}
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
        <h2>{tt("UX Strategy Memo: decide as Chief Experience Officer", "UX Strategy Memo: als Chief Experience Officer entscheiden")}</h2>
      </header>
      <CaseBrief />
      <Block31 missing={missing} />
      <Block32 missing={missing} />
      <MemoPanel />
      <ExportBar id="export-l3" previewTitle="" showPreview={false} exportLabel={tt("Export the UX Strategy Memo", "UX Strategy Memo exportieren")} docTitle="UX Strategy Memo" filename={filename} missing={missing} buildBody={() => memoBody(p)} />
    </div>
  );
}
