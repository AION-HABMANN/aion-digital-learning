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
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { FINDING_BY_ID } from "@/data/day1/case";
import { DECISIONS, DECISION_AREA, DECISION_BY_ID, EVIDENCE, EVIDENCE_MIN, OWNERS, R2_BUDGET, R2_MONTHS, R2_PICK, RISKS, decisionsCost } from "@/data/day1/route2";
import type { DecisionId, EvidenceId, OwnerId, RiskId } from "@/data/day1/route2";
import { DOC_CSS } from "@/lib/exportDoc";
import { architectureKey, decisionKey, riskKey } from "@/lib/day1/answerKey";
import { memoBody } from "@/lib/day1/exportDoc";
import { decisionOrderGuide, giveUpGuide, riskPlanGuide, uncertainGuide, visionGuide } from "@/lib/day1/guides";
import { IDS, r2Missing } from "@/lib/day1/missing";
import { BLOCK_MINUTES, CORE2_MINUTES, MIN_LINE, MIN_REASON, MIN_SENTENCE } from "@/lib/day1/progress";
import type { MissingEntry } from "@/lib/missing";
import { useJumpTo } from "@/lib/useJumpTo";
import { euro, tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { routeHref } from "@/data/course";
import { showCardPart } from "@/store/useCardMore";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated, useStore } from "@/store/useStore";

/** Day 1 · Route 2 · the UX Strategy Memo (Level 3). Core: Block 3.1 and Block 3.2, which hold the plan's five numbered items and its "decide despite incomplete data" (CLAUDE.md #44). */

function CaseBrief() {
  const r1 = useStore((s) => s.d1.r1);
  const jump = useJumpTo();
  return (
    <section id="task-2" aria-labelledby="case2-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case2-h">{tt("The situation: SkillUp's Chief UX Officer", "Die Lage: Chief UX Officer von SkillUp")}</h2>
        <span className="smallcaps">{tt("Read once · about 2 min", "Einmal lesen · ca. 2 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        {tt(
          `You are the Chief UX Officer of SkillUp GmbH, the EdTech company that runs LearnFast. The market is growing strongly, competitors offer better UX, the budget is limited and users are impatient. Management wants a UX strategy for the next ${R2_MONTHS} months, and it wants you to take responsibility for it.`,
          `Sie sind Chief UX Officer der SkillUp GmbH, des EdTech-Unternehmens, das LearnFast betreibt. Der Markt wächst stark, Wettbewerber bieten bessere UX, das Budget ist begrenzt und die Nutzer sind ungeduldig. Die Geschäftsführung will eine UX-Strategie für die nächsten ${R2_MONTHS} Monate und erwartet, dass Sie dafür Verantwortung übernehmen.`,
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
            <li>{tt("Drop-out today: 40 of every 100 learners who start a course.", "Abbruch heute: 40 von je 100 Lernenden, die einen Kurs beginnen.")}</li>
            <li>{tt("You must decide even though you do not have complete user data.", "Sie müssen entscheiden, obwohl Sie keine vollständigen Nutzerdaten haben.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · two core blocks, about ${CORE2_MINUTES} min`, `So läuft die Aufgabe · zwei Kernblöcke, ca. ${CORE2_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 3.1: your UX vision, three strategic decisions and their order (B1, B2).", "Block 3.1: Ihre UX-Vision, drei strategische Entscheidungen und ihre Reihenfolge (B1, B2).")}</li>
            <li>{tt("Block 3.2: the biggest risk, one decision without complete data, how you will decide in future, and what you give up (B3).", "Block 3.2: das größte Risiko, eine Entscheidung ohne vollständige Daten, wie Sie künftig entscheiden und worauf Sie verzichten (B3).")}</li>
          </ol>
        </div>
      </div>
      <p className="text-caption text-ash">
        {r1.worst ? (
          <>
            {tt("Your Route 1 answer, as a soft pointer: you judged this finding most serious: ", "Ihre Antwort aus Route 1, als weicher Hinweis: Sie hielten diesen Befund für am schwersten: ")}
            <strong className="text-ink">{FINDING_BY_ID[r1.worst].short}</strong>.{" "}
            <button type="button" onClick={() => jump("block-1-1", routeHref(1, 1))} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
              {tt("Open it in Route 1", "In Route 1 öffnen")}
            </button>
          </>
        ) : (
          tt("Route 1 is not needed for this route. If you have done it, your answers are quoted in the memo.", "Route 1 ist für diese Route nicht nötig. Wenn Sie sie gemacht haben, werden Ihre Antworten im Memo zitiert.")
        )}
      </p>
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("The brief says: a strongly growing market, competitors with better UX, a limited budget, impatient users. Everything else is made up: the €120,000, the seven decisions with their costs and weeks.", "Der Auftrag sagt: ein stark wachsender Markt, Wettbewerber mit besserer UX, ein begrenztes Budget, ungeduldige Nutzer. Alles andere ist erfunden: die 120.000 €, die sieben Entscheidungen mit ihren Kosten und Wochen.")}</p>
      </Callout>
    </section>
  );
}

/* ------------------------------------------------------------------ Block 3.1 */

export function Block31({ missing }: { missing: MissingEntry[] }) {
  const r = useStore((s) => s.d1.r2);
  const toggle = useStore((s) => s.toggleDecision);
  const move = useStore((s) => s.moveDecision);
  const patch = useStore((s) => s.patchD1R2);
  const mentor = useStore((s) => s.mentorUnlocked);
  const [note, setNote] = useState("");
  const full = r.picks.length >= R2_PICK;
  const cost = decisionsCost(r.picks);
  return (
    <AnswerBlock
      id="block-3-1"
      title={tt("Block 3.1 · UX vision, three decisions, and their order", "Block 3.1 · UX-Vision, drei Entscheidungen und ihre Reihenfolge")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["3.1"]}
      findIt={tt("Route 2 → Task 2 → the vision field, then the seven decisions in the list below, each with its printed cost and weeks. Answer in the field and the list.", "Route 2 → Task 2 → das Feld für die Vision, dann die sieben Entscheidungen in der Liste darunter, jeweils mit gedruckten Kosten und Wochen. Antworten Sie im Feld und in der Liste.")}
    >
      <MaterialRefs refs={["B1", "B2"]} />
      <TextBox
        id={IDS.vision}
        label={tt("Your UX vision: how should learning be experienced at SkillUp?", "Ihre UX-Vision: Wie soll Lernen bei SkillUp erlebt werden?")}
        help={tt(`One or two sentences about the learner's experience, not a list of features. At least ${MIN_SENTENCE} characters.`, `Ein bis zwei Sätze über das Erlebnis der Lernenden, keine Liste von Funktionen. Mindestens ${MIN_SENTENCE} Zeichen.`)}
        value={r.vision}
        onChange={(v) => patch({ vision: v })}
        min={MIN_SENTENCE}
        rows={3}
      >
        <WritingHelp
          id="vision-kit"
          refs={[{ label: tt("UX is the whole experience (Materi A1)", "UX ist das ganze Erlebnis (Materi A1)"), value: tt("find it · understand it · finish it", "finden · verstehen · abschließen"), target: "mat-A1", before: () => showCardPart("A1", "rules") }]}
          steps={[
            tt("Describe what a learner can do and feel, in everyday words.", "Beschreiben Sie in Alltagsworten, was Lernende tun können und fühlen."),
            tt("Keep it to one or two sentences you could say to a colleague.", "Halten Sie es bei ein bis zwei Sätzen, die Sie einer Kollegin sagen könnten."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="vision-example" guide={visionGuide()} />
      {mentor && <MentorGuide guide={visionGuide()} />}

      <Field id={IDS.decisionPick} label={tt(`Choose exactly ${R2_PICK} strategic UX decisions`, `Wählen Sie genau ${R2_PICK} strategische UX-Entscheidungen`)} help={tt("Each shows what it is, what a learner notices, its cost and weeks, and what it acts on. You have chosen:", "Jede zeigt, was sie ist, was Lernende bemerken, ihre Kosten und Wochen, und worauf sie wirkt. Sie haben gewählt:") + ` ${r.picks.length} / ${R2_PICK}`}>
        <OptionList<DecisionId>
          options={DECISIONS.map((d) => ({ id: d.id, label: `${d.name} · ${euro(d.cost)} · ${d.weeks} ${tt("weeks", "Wochen")}`, tag: DECISION_AREA[d.area], sub: `${d.what}\n${tt("A learner notices:", "Lernende bemerken:")} ${d.notice}` }))}
          value={r.picks}
          onChange={(id) => {
            setNote("");
            toggle(id);
          }}
          multi
          cols={2}
          label={tt("Strategic UX decisions", "Strategische UX-Entscheidungen")}
          disabledIds={full ? DECISIONS.map((d) => d.id) : []}
          onDisabledClick={() => setNote(tt(`You have ${R2_PICK}. Deselect one first.`, `Sie haben ${R2_PICK}. Wählen Sie zuerst eine ab.`))}
        />
        {note && <p role="status" className="text-caption text-ash">{note}</p>}
      </Field>
      {r.picks.length > 0 && (
        <div className="space-y-2">
          <BudgetBar items={r.picks.map((id) => ({ id, short: id.toUpperCase(), cost: DECISION_BY_ID[id].cost }))} budget={R2_BUDGET} title={tt("Cost of the chosen decisions against the yearly budget", "Kosten der gewählten Entscheidungen gegen das Jahresbudget")} />
          <p className="text-caption text-ink" aria-live="polite">
            {tt(`Total ${euro(cost)} of ${euro(R2_BUDGET)}${cost > R2_BUDGET ? `, ${euro(cost - R2_BUDGET)} over` : ""}.`, `Gesamt ${euro(cost)} von ${euro(R2_BUDGET)}${cost > R2_BUDGET ? `, ${euro(cost - R2_BUDGET)} darüber` : ""}.`)}{" "}
            {cost > R2_BUDGET && <span className="text-ash">{tt("Going over is allowed; say why. It is printed in the memo as a fact.", "Das Überschreiten ist erlaubt; sagen Sie, warum. Es steht als Tatsache im Memo.")}</span>}
          </p>
        </div>
      )}
      {r.picks.length === R2_PICK && (
        <Field id={IDS.decisionOrder} label={tt("Your roadmap: put the three decisions in order", "Ihre Roadmap: Bringen Sie die drei Entscheidungen in eine Reihenfolge")} help={tt("The first happens first. Move one up or down with the arrows.", "Die erste geschieht zuerst. Verschieben Sie eine mit den Pfeilen nach oben oder unten.")}>
          <ol className="space-y-1.5">
            {r.order.map((id, i) => (
              <li key={id} className="flex items-center gap-2 rounded-lg border border-line bg-paper px-3 py-1.5">
                <span className="tnum w-5 font-bold text-ash">{i + 1}</span>
                <span className="min-w-0 flex-1 text-ink">{DECISION_BY_ID[id].name}</span>
                <button type="button" aria-label={tt(`Move ${DECISION_BY_ID[id].name} up`, `${DECISION_BY_ID[id].name} nach oben`)} onClick={() => move(id, -1)} className="btn-ghost btn-sm" aria-disabled={i === 0}>
                  ↑
                </button>
                <button type="button" aria-label={tt(`Move ${DECISION_BY_ID[id].name} down`, `${DECISION_BY_ID[id].name} nach unten`)} onClick={() => move(id, 1)} className="btn-ghost btn-sm" aria-disabled={i === r.order.length - 1}>
                  ↓
                </button>
              </li>
            ))}
          </ol>
        </Field>
      )}
      <TextBox
        id={IDS.decisionOrderWhy}
        label={tt("Why does the first decision go first?", "Warum kommt die erste Entscheidung zuerst?")}
        help={tt(`A reason for position one: reach, cost, what the others depend on, or the evidence it brings. At least ${MIN_LINE} characters.`, `Ein Grund für Platz eins: Reichweite, Kosten, wovon die anderen abhängen oder die Belege, die sie bringt. Mindestens ${MIN_LINE} Zeichen.`)}
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
  const r = useStore((s) => s.d1.r2);
  const patch = useStore((s) => s.patchD1R2);
  const toggleEvidence = useStore((s) => s.toggleEvidence);
  const mentor = useStore((s) => s.mentorUnlocked);
  return (
    <AnswerBlock
      id="block-3-2"
      title={tt("Block 3.2 · The biggest risk, a decision without complete data, how you decide, and what you give up", "Block 3.2 · Das größte Risiko, eine Entscheidung ohne vollständige Daten, wie Sie entscheiden und worauf Sie verzichten")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["3.2"]}
      findIt={tt("Route 2 → Task 2 → the three decisions you chose in Block 3.1, then the fields below. Answer in the lists and the text boxes.", "Route 2 → Task 2 → die drei Entscheidungen, die Sie in Block 3.1 gewählt haben, dann die Felder darunter. Antworten Sie in den Listen und Textfeldern.")}
    >
      <MaterialRefs refs={["B3", "B2"]} />
      <Field id={IDS.risk} label={tt("The biggest risk of your plan", "Das größte Risiko Ihres Plans")} help={tt("Imagine the plan has failed in a year. Which reason is the most likely? Choose one.", "Stellen Sie sich vor, der Plan ist in einem Jahr gescheitert. Welcher Grund ist am wahrscheinlichsten? Wählen Sie einen.")}>
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

      <TextBox
        id={IDS.uncertain}
        label={tt("One decision you make without complete data", "Eine Entscheidung, die Sie ohne vollständige Daten treffen")}
        help={tt("Say what you decide, what you do not know, and when you would reverse it, with a figure and a time. At least 60 characters.", "Sagen Sie, was Sie entscheiden, was Sie nicht wissen und wann Sie es zurücknähmen, mit einer Zahl und einer Zeit. Mindestens 60 Zeichen.")}
        value={r.uncertain}
        onChange={(v) => patch({ uncertain: v })}
        min={60}
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

      <Field id={IDS.owner} label={tt("How will SkillUp decide on UX in future? Who decides?", "Wie wird SkillUp künftig über UX entscheiden? Wer entscheidet?")} help={tt("Choose one.", "Wählen Sie eine Antwort.")}>
        <OptionList<OwnerId> options={OWNERS.map((o) => ({ id: o.id, label: o.text }))} value={r.owner} onChange={(id) => patch({ owner: id })} label={tt("Who decides", "Wer entscheidet")} />
      </Field>
      <Field id={IDS.evidence} label={tt("On what evidence?", "Auf welcher Grundlage?")} help={tt(`Choose at least ${EVIDENCE_MIN}. You have chosen: ${r.evidence.length}`, `Wählen Sie mindestens ${EVIDENCE_MIN}. Sie haben gewählt: ${r.evidence.length}`)}>
        <OptionList<EvidenceId> options={EVIDENCE.map((e) => ({ id: e.id, label: e.text }))} value={r.evidence} onChange={toggleEvidence} multi cols={2} label={tt("Evidence a UX decision needs", "Belege, die eine UX-Entscheidung braucht")} />
      </Field>

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
      <AnswerKey block={architectureKey()} />
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
  const filename = exportName(p.participant.name, 1, 2);
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt("Task 2 · two core blocks", "Task 2 · zwei Kernblöcke")}</p>
        <h2>{tt("UX Strategy Memo: decide as Chief UX Officer", "UX Strategy Memo: als Chief UX Officer entscheiden")}</h2>
      </header>
      <CaseBrief />
      <Block31 missing={missing} />
      <Block32 missing={missing} />
      <MemoPanel />
      <ExportBar id="export-l3" previewTitle="" showPreview={false} exportLabel={tt("Export the UX Strategy Memo", "UX Strategy Memo exportieren")} docTitle="UX Strategy Memo" filename={filename} missing={missing} buildBody={() => memoBody(p)} />
    </div>
  );
}
