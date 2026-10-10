"use client";

import { useEffect, useState } from "react";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { BudgetBar } from "@/components/ui/BudgetBar";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { ExportBar } from "@/components/ui/ExportBar";
import { Field } from "@/components/ui/Field";
import { OptionList, TextBox } from "@/components/ui/Inputs";
import { Callout } from "@/components/ui/MaterialCard";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { OrderList } from "@/components/ui/OrderList";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { FACT_BY_ID } from "@/data/day3/case";
import { CHECKS, CHECK_MIN, DECISIONS, DECISION_AREA, DECISION_BY_ID, OWNERS, R2_BUDGET, R2_MONTHS, R2_PICK, RISKS, decisionsCost } from "@/data/day3/route2";
import type { CheckId, DecisionId, OwnerId, RiskId } from "@/data/day3/route2";
import { routeHref } from "@/data/course";
import { DOC_CSS } from "@/lib/exportDoc";
import { decisionKey, logicKey, riskKey } from "@/lib/day3/answerKey";
import { memoBody } from "@/lib/day3/exportDoc";
import { decisionOrderGuide, definitionGuide, giveUpGuide, riskPlanGuide, strategyGuide, uncertainGuide } from "@/lib/day3/guides";
import { IDS, r2Missing } from "@/lib/day3/missing";
import { BLOCK_MINUTES, CORE2_MINUTES, MIN_FRAME, MIN_LINE, MIN_REASON, MIN_SENTENCE } from "@/lib/day3/progress";
import { swap, syncOrder, toggleCapped, toggleList } from "@/lib/lists";
import type { MissingEntry } from "@/lib/missing";
import { useJumpTo } from "@/lib/useJumpTo";
import { euro, tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { showCardPart } from "@/store/useCardMore";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated, useStore } from "@/store/useStore";

/** Day 3 · Route 2 · the UX Strategy Memo (Level 3). Core: Block 3.1 and Block 3.2, which hold the plan's Transferprojekt (CLAUDE.md #44). */

function CaseBrief() {
  const r1 = useStore((s) => s.d3.r1);
  const jump = useJumpTo();
  return (
    <section id="task-2" aria-labelledby="case2-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case2-h">{tt("The situation: EduCore's Chief Learning Experience Officer", "Die Lage: Chief Learning Experience Officer von EduCore")}</h2>
        <span className="smallcaps">{tt("Read once · about 2 min", "Einmal lesen · ca. 2 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        {tt(
          `You are the Chief Learning Experience Officer of EduCore. The platform is rated “too complicated”. The content is professionally necessary but hard to understand, and the budget is limited. Management wants a learning-psychology-based UX strategy for the next ${R2_MONTHS} months and expects you to take responsibility for learning success.`,
          `Sie sind Chief Learning Experience Officer von EduCore. Die Plattform wird als „zu kompliziert“ bewertet. Der Inhalt ist fachlich nötig, aber schwer verständlich, und das Budget ist begrenzt. Die Geschäftsführung will eine lernpsychologisch fundierte UX-Strategie für die nächsten ${R2_MONTHS} Monate und erwartet, dass Sie die Verantwortung für den Lernerfolg übernehmen.`,
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
            <li>{tt("Content: professionally necessary, so it cannot simply be cut.", "Inhalt: fachlich nötig, er lässt sich also nicht einfach kürzen.")}</li>
            <li>{tt("You must decide even though you have no user data.", "Sie müssen entscheiden, obwohl Sie keine Nutzerdaten haben.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · two core blocks, about ${CORE2_MINUTES} min`, `So läuft die Aufgabe · zwei Kernblöcke, ca. ${CORE2_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 3.1: your strategy to reduce cognitive load, your definition of learning-effective UX and three prioritised measures (B1, B2).", "Block 3.1: Ihre Strategie zur Senkung der kognitiven Belastung, Ihre Definition von lerneffektivem UX und drei priorisierte Maßnahmen (B1, B2).")}</li>
            <li>{tt("Block 3.2: the biggest risk, the decision logic for future content, one decision under uncertainty, and what you give up (B2, B3).", "Block 3.2: das größte Risiko, die Entscheidungslogik für künftige Inhalte, eine Entscheidung unter Unsicherheit und worauf Sie verzichten (B2, B3).")}</li>
          </ol>
        </div>
      </div>
      <p className="text-caption text-ash">
        {r1.worst ? (
          <>
            {tt("Your Route 1 answer, as a soft pointer: you judged this fact most stopping: ", "Ihre Antwort aus Route 1, als weicher Hinweis: Sie hielten diesen Fakt für den, bei dem man am ehesten aufhört: ")}
            <strong className="text-ink">{FACT_BY_ID[r1.worst].short}</strong>.{" "}
            <button type="button" onClick={() => jump("block-1-1", routeHref(3, 1))} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
              {tt("Open it in Route 1", "In Route 1 öffnen")}
            </button>
          </>
        ) : (
          tt("Route 1 is not needed for this route. If you have done it, your answers are quoted in the memo.", "Route 1 ist für diese Route nicht nötig. Wenn Sie sie gemacht haben, werden Ihre Antworten im Memo zitiert.")
        )}
      </p>
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("The brief says: a platform rated too complicated, content professionally necessary but hard to understand, a limited budget, and a decision without user data. Everything else is made up: the €150,000, the seven measures with their costs and weeks.", "Der Auftrag sagt: eine als zu kompliziert bewertete Plattform, fachlich nötiger, aber schwer verständlicher Inhalt, ein begrenztes Budget und eine Entscheidung ohne Nutzerdaten. Alles andere ist erfunden: die 150.000 €, die sieben Maßnahmen mit ihren Kosten und Wochen.")}</p>
      </Callout>
    </section>
  );
}

function useR2() {
  return { r: useStore((s) => s.d3.r2), patch: useStore((s) => s.patchD3R2), mentor: useStore((s) => s.mentorUnlocked) };
}

/* ------------------------------------------------------------------ Block 3.1 */

export function Block31({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR2();
  const [note, setNote] = useState("");
  const full = r.picks.length >= R2_PICK;
  const cost = decisionsCost(r.picks);
  return (
    <AnswerBlock
      id="block-3-1"
      title={tt("Block 3.1 · Strategy, definition and three measures", "Block 3.1 · Strategie, Definition und drei Maßnahmen")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["3.1"]}
      findIt={tt("Route 2 → Task 2 → the two fields for the strategy and the definition, then the seven measures in the list below, each with its printed cost and weeks. Answer in the fields and the list.", "Route 2 → Task 2 → die zwei Felder für Strategie und Definition, dann die sieben Maßnahmen in der Liste darunter, jeweils mit gedruckten Kosten und Wochen. Antworten Sie in den Feldern und der Liste.")}
    >
      <MaterialRefs refs={["B1", "B2"]} />
      <TextBox
        id={IDS.strategy}
        label={tt("Your strategy for reducing cognitive load", "Ihre Strategie zur Senkung der kognitiven Belastung")}
        help={tt(`One to three sentences: what you will reduce first, and what you will protect. At least ${MIN_SENTENCE} characters.`, `Ein bis drei Sätze: was Sie zuerst senken und was Sie schützen. Mindestens ${MIN_SENTENCE} Zeichen.`)}
        value={r.strategy}
        onChange={(v) => patch({ strategy: v })}
        min={MIN_SENTENCE}
        rows={3}
      >
        <WritingHelp
          id="strategy-kit"
          refs={[{ label: tt("Cut extraneous load first, protect the subject (Materi B2)", "Zuerst die extrinsische Belastung kürzen, das Thema schützen (Materi B2)"), value: tt("reduce · protect", "senken · schützen"), target: "mat-B2", before: () => showCardPart("B2", "rules") }]}
          steps={[
            tt("Say what you reduce first (clutter, a wall of text) and for whom.", "Sagen Sie, was Sie zuerst senken (Unübersichtlichkeit, eine Textwand) und für wen."),
            tt("Say what you protect (the professional depth of the content).", "Sagen Sie, was Sie schützen (die fachliche Tiefe des Inhalts)."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="strategy-example" guide={strategyGuide()} />
      {mentor && <MentorGuide guide={strategyGuide()} />}

      <TextBox
        id={IDS.definition}
        label={tt("Your definition of “learning-effective UX”", "Ihre Definition von „lerneffektivem UX“")}
        help={tt(`Name the learner, the goal, the cost to be kept low, and how you will know (the proof). At least ${MIN_SENTENCE} characters.`, `Nennen Sie die Lernende, das Ziel, die Kosten, die niedrig gehalten werden sollen, und woran Sie es erkennen (den Beleg). Mindestens ${MIN_SENTENCE} Zeichen.`)}
        value={r.definition}
        onChange={(v) => patch({ definition: v })}
        min={MIN_SENTENCE}
        rows={3}
      >
        <WritingHelp
          id="definition-kit"
          refs={[{ label: tt("The four parts of a definition (Materi B1)", "Die vier Teile einer Definition (Materi B1)"), value: tt("learner · goal · cost · proof", "Lernende · Ziel · Kosten · Beleg"), target: "mat-B1", before: () => showCardPart("B1", "rules") }]}
          steps={[
            tt("Start with “A learning-effective UX is one in which …” and name the learner and the goal.", "Beginnen Sie mit „Ein lerneffektives UX ist eines, in dem …“ und nennen Sie die Lernende und das Ziel."),
            tt("Add the cost kept low (effort that does not help learning) and the proof (what they can explain or do afterwards).", "Ergänzen Sie die niedrig gehaltenen Kosten (Anstrengung, die nicht beim Lernen hilft) und den Beleg (was sie danach erklären oder tun können)."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="definition-example" guide={definitionGuide()} />
      {mentor && <MentorGuide guide={definitionGuide()} />}

      <Field id={IDS.decisionPick} label={tt(`Choose exactly ${R2_PICK} measures`, `Wählen Sie genau ${R2_PICK} Maßnahmen`)} help={tt("Each shows what it is, its cost and its weeks, and what it acts on. You have chosen:", "Jede zeigt, was sie ist, ihre Kosten und Wochen und worauf sie wirkt. Sie haben gewählt:") + ` ${r.picks.length} / ${R2_PICK}`}>
        <OptionList<DecisionId>
          options={DECISIONS.map((d) => ({ id: d.id, label: `${d.no} · ${d.name} · ${euro(d.cost)} · ${d.weeks} ${tt("weeks", "Wochen")}`, tag: DECISION_AREA[d.area], sub: d.what }))}
          value={r.picks}
          onChange={(id) => {
            setNote("");
            patch((s) => {
              const picks = toggleCapped(s.picks, id, R2_PICK);
              return { picks, order: syncOrder(s.order, picks) };
            });
          }}
          multi
          cols={2}
          label={tt("Measures for the strategy", "Maßnahmen für die Strategie")}
          disabledIds={full ? DECISIONS.map((d) => d.id) : []}
          onDisabledClick={() => setNote(tt(`You have ${R2_PICK}. Deselect one first.`, `Sie haben ${R2_PICK}. Wählen Sie zuerst eine ab.`))}
        />
        {note && <p role="status" className="text-caption text-ash">{note}</p>}
      </Field>
      {r.picks.length > 0 && (
        <div className="space-y-2">
          <BudgetBar items={r.picks.map((id) => ({ id, short: DECISION_BY_ID[id].no, cost: DECISION_BY_ID[id].cost }))} budget={R2_BUDGET} title={tt("Cost of the chosen measures against the yearly budget", "Kosten der gewählten Maßnahmen gegen das Jahresbudget")} />
          <p className="text-caption text-ink" aria-live="polite">
            {tt(`Total ${euro(cost)} of ${euro(R2_BUDGET)}${cost > R2_BUDGET ? `, ${euro(cost - R2_BUDGET)} over` : ""}.`, `Gesamt ${euro(cost)} von ${euro(R2_BUDGET)}${cost > R2_BUDGET ? `, ${euro(cost - R2_BUDGET)} darüber` : ""}.`)}{" "}
            {cost > R2_BUDGET && <span className="text-ash">{tt("Going over is allowed; say why. It is printed in the memo as a fact.", "Das Überschreiten ist erlaubt; sagen Sie, warum. Es steht als Tatsache im Memo.")}</span>}
          </p>
        </div>
      )}
      {r.picks.length === R2_PICK && (
        <Field id={IDS.decisionOrder} label={tt("Put the three measures in priority order", "Bringen Sie die drei Maßnahmen in eine Prioritätsreihenfolge")} help={tt("The first is the most important. Move one up or down with the arrows.", "Die erste ist die wichtigste. Verschieben Sie eine mit den Pfeilen nach oben oder unten.")}>
          <OrderList<DecisionId> order={r.order} name={(id) => `${DECISION_BY_ID[id].no} · ${DECISION_BY_ID[id].name}`} onMove={(id, dir) => patch((s) => ({ order: swap(s.order, id, dir) }))} />
        </Field>
      )}
      <TextBox
        id={IDS.decisionOrderWhy}
        label={tt("Why does the first measure go first?", "Warum kommt die erste Maßnahme zuerst?")}
        help={tt(`Say what it does for learning effectiveness and for cognitive efficiency. At least ${MIN_LINE} characters.`, `Sagen Sie, was sie für die Lerneffektivität und für die kognitive Effizienz leistet. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.orderWhy}
        onChange={(v) => patch({ orderWhy: v })}
        min={MIN_LINE}
        rows={3}
      />
      <ExampleAnswer id="decisionorder-example" guide={decisionOrderGuide()} />
      {mentor && <MentorGuide guide={decisionOrderGuide()} />}
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
      title={tt("Block 3.2 · Risk, decision logic, a decision under uncertainty, and what you give up", "Block 3.2 · Risiko, Entscheidungslogik, eine Entscheidung unter Unsicherheit und worauf Sie verzichten")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["3.2"]}
      findIt={tt("Route 2 → Task 2 → the three measures you chose in Block 3.1, then the fields below. Answer in the lists and the text boxes.", "Route 2 → Task 2 → die drei Maßnahmen, die Sie in Block 3.1 gewählt haben, dann die Felder darunter. Antworten Sie in den Listen und Textfeldern.")}
    >
      <MaterialRefs refs={["B3", "B2"]} />
      <Field id={IDS.risk} label={tt("The biggest risk of your plan", "Das größte Risiko Ihres Plans")} help={tt("Content that is too simple against content that is too complex. Imagine the plan has failed in a year. Which reason is the most likely? Choose one.", "Zu einfacher Inhalt gegen zu komplexen Inhalt. Stellen Sie sich vor, der Plan ist in einem Jahr gescheitert. Welcher Grund ist am wahrscheinlichsten? Wählen Sie einen.")}>
        <OptionList<RiskId> options={RISKS.map((x) => ({ id: x.id, label: x.text }))} value={r.risk} onChange={(id) => patch({ risk: id })} label={tt("Risks", "Risiken")} />
      </Field>
      <TextBox
        id={IDS.riskPlan}
        label={tt("What do you do about that risk?", "Was tun Sie gegen dieses Risiko?")}
        help={tt(`One action, and when you would notice the risk. At least ${MIN_REASON} characters.`, `Eine Maßnahme, und wann Sie das Risiko bemerken würden. Mindestens ${MIN_REASON} Zeichen.`)}
        value={r.riskPlan}
        onChange={(v) => patch({ riskPlan: v })}
        min={MIN_REASON}
        rows={2}
      />
      <ExampleAnswer id="riskplan-example" guide={riskPlanGuide()} />
      {mentor && <MentorGuide guide={riskPlanGuide()} />}

      <Field id={IDS.owner} label={tt("Decision logic for future content: who decides whether a new lesson goes live?", "Entscheidungslogik für künftige Inhalte: Wer entscheidet, ob eine neue Lektion live geht?")} help={tt("Choose one.", "Wählen Sie eine Antwort.")}>
        <OptionList<OwnerId> options={OWNERS.map((o) => ({ id: o.id, label: o.text }))} value={r.owner} onChange={(id) => patch({ owner: id })} label={tt("Who decides", "Wer entscheidet")} />
      </Field>
      <Field id={IDS.lessonChecks} label={tt("Which checks must every new lesson pass?", "Welche Prüfungen muss jede neue Lektion bestehen?")} help={tt(`Choose at least ${CHECK_MIN}. You have chosen: ${r.lessonChecks.length}`, `Wählen Sie mindestens ${CHECK_MIN}. Sie haben gewählt: ${r.lessonChecks.length}`)}>
        <OptionList<CheckId> options={CHECKS.map((c) => ({ id: c.id, label: c.text }))} value={r.lessonChecks} onChange={(id) => patch((s) => ({ lessonChecks: toggleList(s.lessonChecks, id) }))} multi cols={2} label={tt("Checks for a new lesson", "Prüfungen für eine neue Lektion")} />
      </Field>
      <AnswerKey block={logicKey()} />

      <TextBox
        id={IDS.uncertain}
        label={tt("One decision you make without user data", "Eine Entscheidung, die Sie ohne Nutzerdaten treffen")}
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
      <AnswerKey block={riskKey()} />
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
  const filename = exportName(p.participant.name, 3, 2);
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt("Task 2 · two core blocks", "Task 2 · zwei Kernblöcke")}</p>
        <h2>{tt("UX Strategy Memo: decide as Chief Learning Experience Officer", "UX Strategy Memo: als Chief Learning Experience Officer entscheiden")}</h2>
      </header>
      <CaseBrief />
      <Block31 missing={missing} />
      <Block32 missing={missing} />
      <MemoPanel />
      <ExportBar id="export-l3" previewTitle="" showPreview={false} exportLabel={tt("Export the UX Strategy Memo", "UX Strategy Memo exportieren")} docTitle="UX Strategy Memo" filename={filename} missing={missing} buildBody={() => memoBody(p)} />
    </div>
  );
}
