"use client";

import Link from "next/link";
import { useState } from "react";
import { PlatformScreens } from "@/components/day2/Screens";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { BudgetBar } from "@/components/ui/BudgetBar";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { ExportBar } from "@/components/ui/ExportBar";
import { Field } from "@/components/ui/Field";
import { CheckBar, OptionList, Reading, ScorePick, TextBox } from "@/components/ui/Inputs";
import { Callout } from "@/components/ui/MaterialCard";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { PlacementBoard } from "@/components/ui/PlacementBoard";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { APPROACHES, APPROACH_BY_ID, BUDGET, FACTS, MONTHS, OPTS, OPT_IDS, PICK_TESTS, PICK_WEAK, PLATFORMS, PRACTICES, PRACTICE_IDS, REFLECT, RISK_TICKS, TESTS, TEST_BY_ID, TEST_KIND, VERDICTS, WEAKS, WEEKS_LIMIT, planCost, planWeeks } from "@/data/day2/case";
import type { ApproachId, FactId, OptId, PlatformId, PracticeId, RiskTickId, TestId, Verdict, WeakId } from "@/data/day2/case";
import { routeHref } from "@/data/course";
import { analysisBody } from "@/lib/day2/exportDoc";
import { optEffortWrong, sortHolds, weakHolds } from "@/lib/day2/checks";
import { adaptiveGuide, approachGuide, missingGuide, optRiskGuide, optWhyGuide, preferGuide, principleGuide, reflectGuide, testQGuide, weakGuide } from "@/lib/day2/guides";
import { adaptiveKey, approachKey, optKey, sortKey, testKey, weakKey } from "@/lib/day2/answerKey";
import { IDS, r1Missing } from "@/lib/day2/missing";
import { BLOCK_MINUTES, CORE1_MINUTES, MIN_LINE, MIN_REASON, TASK1_MINUTES } from "@/lib/day2/progress";
import { placeItem, redoSort, toggleCapped, toggleList, undoSort } from "@/lib/lists";
import type { MissingEntry } from "@/lib/missing";
import { Gloss } from "@/lib/glossify";
import { euro, tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { showCardPart } from "@/store/useCardMore";
import type { D2R1 } from "@/store/dayTypes";
import { usePersisted } from "@/store/usePersisted";
import { useStore } from "@/store/useStore";
import type { Score } from "@/store/useStore";

/** Day 2 · Route 1 · the UX Analysis File. Core: Block 1.1 (Level 1) and Block 2.2 (Level 2). Optional: 1.2, 1.3, 2.1 (CLAUDE.md #35, #40). */

const LEVELS = () => ["", tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")];

/* ------------------------------------------------------------------ the case */

function CaseBrief() {
  return (
    <section id="case-brief" aria-labelledby="case-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case-h">{tt("The case: LearnPro, a stagnating learning platform", "Der Fall: LearnPro, eine stagnierende Lernplattform")}</h2>
        <span className="smallcaps">{tt("Read once · about 3 min", "Einmal lesen · ca. 3 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt(
            `LearnPro is a learning platform that has stopped growing. Learners drop out of courses early, there is no personalisation, and the content is rated as “boring”. You are part of the product team and the goal is to improve the platform. Management gives you ${MONTHS} months and a limited budget, and the needs of the learners are not clear yet.`,
            `LearnPro ist eine Lernplattform, die nicht mehr wächst. Lernende brechen Kurse früh ab, es gibt keine Personalisierung, und der Inhalt wird als „langweilig“ bewertet. Sie gehören zum Produktteam, und das Ziel ist, die Plattform zu verbessern. Die Geschäftsführung gibt Ihnen ${MONTHS} Monate und ein begrenztes Budget, und die Bedürfnisse der Lernenden sind noch nicht klar.`,
          )}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("What you have", "Was Sie haben")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt("Two platforms in outline: Platform A (a benchmark) and Platform B (LearnPro today), with eight facts (Block 1.1).", "Zwei Plattformen in Umrissen: Plattform A (ein Benchmark) und Plattform B (LearnPro heute), mit acht Fakten (Block 1.1).")}</li>
            <li>{tt("Three options for prototyping and testing (optional Block 1.2) and six possible weaknesses (optional Block 2.1).", "Drei Optionen für Prototyping und Testen (optionaler Block 1.2) und sechs mögliche Schwächen (optionaler Block 2.1).")}</li>
            <li>{tt("Five prototype approaches and seven UX tests, each with a cost and weeks (Block 2.2).", "Fünf Prototyping-Ansätze und sieben UX-Tests, jeweils mit Kosten und Wochen (Block 2.2).")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Time: ", "Zeit: ")}
              <strong>{tt(`${MONTHS} months (${WEEKS_LIMIT} weeks)`, `${MONTHS} Monate (${WEEKS_LIMIT} Wochen)`)}</strong>
            </li>
            <li>
              {tt("Budget: ", "Budget: ")}
              <strong>{euro(BUDGET)}</strong> <span className="text-ash">{tt("(Case assumption: the plan only says “limited”)", "(Fallannahme: der Plan sagt nur „begrenzt“)")}</span>
            </li>
            <li>{tt("User needs are unclear.", "Die Nutzerbedürfnisse sind unklar.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · two core blocks, about ${CORE1_MINUTES} min`, `So läuft die Aufgabe · zwei Kernblöcke, ca. ${CORE1_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 1.1: sort eight facts into Learning path, Short units and Feedback, say which platform you prefer, and write three principles of success (Level 1, A1).", "Block 1.1: acht Fakten in Lernpfad, Kurze Einheiten und Feedback sortieren, sagen, welche Plattform Sie bevorzugen, und drei Erfolgsprinzipien schreiben (Level 1, A1).")}</li>
            <li>{tt("Block 2.2: choose a prototype approach and three UX tests, decide on adaptive learning and name what is missing (Level 2, A2, A3, A5).", "Block 2.2: einen Prototyping-Ansatz und drei UX-Tests wählen, über adaptives Lernen entscheiden und nennen, was fehlt (Level 2, A2, A3, A5).")}</li>
          </ol>
          <p className="mt-1 text-ash">{tt(`Three more blocks (about ${TASK1_MINUTES - CORE1_MINUTES} min) are optional and folded.`, `Drei weitere Blöcke (ca. ${TASK1_MINUTES - CORE1_MINUTES} Min.) sind optional und eingeklappt.`)}</p>
        </div>
      </div>
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>
          {tt(
            "The brief says: users drop out early, no personalisation, content rated boring, three months, limited budget, unclear user needs. Everything else is made up for this exercise: the two platform drawings, the €60,000, and the costs and weeks of the options.",
            "Der Auftrag sagt: Nutzer brechen früh ab, keine Personalisierung, Inhalt als langweilig bewertet, drei Monate, begrenztes Budget, unklare Nutzerbedürfnisse. Alles andere ist für diese Übung erfunden: die beiden Plattform-Zeichnungen, die 60.000 € und die Kosten und Wochen der Optionen.",
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

/** The one-screen helper every block uses: the Route 1 slice and its patch action. */
function useR1() {
  return { r: useStore((s) => s.d2.r1), patch: useStore((s) => s.patchD2R1), mentor: useStore((s) => s.mentorUnlocked) };
}

/* ------------------------------------------------------------------ Block 1.1 (Core, Level 1) */

export function Block11({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR1();
  return (
    <AnswerBlock
      id="block-1-1"
      title={tt("Block 1.1 · Two platforms: success practices and principles", "Block 1.1 · Zwei Plattformen: Erfolgspraktiken und Prinzipien")}
      kind="OBJECTIVE + JUDGED"
      core
      minutes={BLOCK_MINUTES["1.1"]}
      findIt={tt("Route 1 → Task 1 → the drawn platforms directly below, then the sort board with the eight facts. Answer on the board, then in the fields under it.", "Route 1 → Task 1 → die gezeichneten Plattformen direkt darunter, dann die Sortiertafel mit den acht Fakten. Antworten Sie auf der Tafel, dann in den Feldern darunter.")}
    >
      <MaterialRefs refs={["A1"]} />
      <PlatformScreens />
      <PlacementBoard<PracticeId>
        items={FACTS.map((f) => ({ id: f.id, meta: `${f.no} · ${f.where}`, text: f.text }))}
        bins={PRACTICE_IDS.map((id) => ({ id, label: PRACTICES[id].label, hint: PRACTICES[id].hint }))}
        value={r.sort}
        onPlace={(id, bin) => patch((s) => placeItem<PracticeId, D2R1>(s, id, bin))}
        onUndo={() => patch((s) => undoSort<PracticeId, D2R1>(s))}
        onRedo={() => patch((s) => redoSort<PracticeId, D2R1>(s))}
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
        intro={tt("Drag a fact onto the practice it shows or lacks, or select it and then a practice. Select a placed one to move it again. One practice per fact: the question it answers or fails first.", "Ziehen Sie einen Fakt auf die Praxis, die er zeigt oder vermissen lässt, oder wählen Sie ihn und dann eine Praxis. Wählen Sie einen platzierten, um ihn zu verschieben. Eine Praxis pro Fakt: die Frage, die er zuerst beantwortet oder verfehlt.")}
        tests={
          <RevealHint id="sort-tests" label={tt("Show the test questions", "Testfragen zeigen")} title={tt("Test questions · taught in Materi A1", "Testfragen · aus Materi A1")}>
            <div className="space-y-2 text-caption text-ink">
              <p>{tt("Ask these of every fact. They repeat the three questions of Materi A1; they never say which fact goes where.", "Stellen Sie diese Fragen zu jedem Fakt. Sie wiederholen die drei Fragen aus Materi A1; sie sagen nie, welcher Fakt wohin gehört.")}</p>
              <ul className="space-y-1.5">
                {PRACTICE_IDS.map((a) => (
                  <li key={a}>
                    <span className="font-semibold">{PRACTICES[a].label}. </span>
                    <Gloss>{PRACTICES[a].test}</Gloss>
                  </li>
                ))}
              </ul>
              <MaterialRefs refs={["A1"]} lead={tt("Taught in", "Gelehrt in")} />
            </div>
          </RevealHint>
        }
      />
      <Field id={IDS.prefer} label={tt("Which platform would you prefer as a learner?", "Welche Plattform würden Sie als Lernende bevorzugen?")} help={tt("Choose one. Either can be right; the next field asks why.", "Wählen Sie eine. Jede kann richtig sein; das nächste Feld fragt nach dem Grund.")}>
        <OptionList<PlatformId> options={PLATFORMS.map((x) => ({ id: x.id, label: x.label }))} value={r.prefer} onChange={(id) => patch({ prefer: id })} label={tt("The platform you would prefer", "Die Plattform, die Sie bevorzugen würden")} cols={2} />
      </Field>
      <TextBox
        id={IDS.preferWhy}
        label={tt("Why that one, from the learner's side?", "Warum gerade diese, aus Sicht der Lernenden?")}
        help={tt(`Say what you, as a learner, can do or feel on that platform that you cannot on the other. At least ${MIN_LINE} characters.`, `Sagen Sie, was Sie als Lernende auf dieser Plattform tun oder fühlen können, das Sie auf der anderen nicht können. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.preferWhy}
        onChange={(v) => patch({ preferWhy: v })}
        min={MIN_LINE}
        rows={3}
      >
        <WritingHelp
          id="prefer-kit"
          refs={[
            { label: tt("The three practices (Materi A1)", "Die drei Praktiken (Materi A1)"), value: tt("path · short units · feedback", "Pfad · kurze Einheiten · Feedback"), target: "mat-A1", before: () => showCardPart("A1", "rules") },
            { label: tt("The facts you sorted above", "Die Fakten, die Sie oben sortiert haben"), value: tt("1 to 8", "1 bis 8"), target: IDS.fact("f1") },
          ]}
          steps={[
            tt("Start with “I can…” or “I would…” and name what you can do or see on the platform you prefer.", "Beginnen Sie mit „Ich kann…“ oder „Ich würde…“ und nennen Sie, was Sie auf der bevorzugten Plattform tun oder sehen können."),
            tt("Say what is missing on the other one, in the same terms.", "Sagen Sie, was auf der anderen fehlt, in denselben Begriffen."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="prefer-example" guide={preferGuide()} />
      {mentor && <MentorGuide guide={preferGuide()} />}

      <p className="text-caption font-semibold text-ink">{tt("Derive three principles of success from the differences.", "Leiten Sie aus den Unterschieden drei Erfolgsprinzipien ab.")}</p>
      {r.principles.map((x, i) => (
        <TextBox
          key={i}
          id={IDS.principle(i)}
          label={tt(`Principle ${i + 1}`, `Prinzip ${i + 1}`)}
          help={tt(`One sentence with a reason: “Do X, because Y.” At least ${MIN_LINE} characters.`, `Ein Satz mit einem Grund: „Tun Sie X, weil Y.“ Mindestens ${MIN_LINE} Zeichen.`)}
          value={x}
          onChange={(v) => patch((s) => ({ principles: s.principles.map((p, k) => (k === i ? v : p)) }))}
          min={MIN_LINE}
          rows={2}
        />
      ))}
      <ExampleAnswer id="principle-example" guide={principleGuide()} />
      {mentor && <MentorGuide guide={principleGuide()} />}
      <AnswerKey block={sortKey()} />
      <BlockMissing block="1.1" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.2 (Optional) */

export function Block12({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR1();
  const L = LEVELS();
  const set = (key: "optBenefit" | "optEffort" | "optRisk", id: OptId, v: Score) =>
    patch((s) => ({ [key]: { ...s[key], [id]: v }, ...(key === "optEffort" ? { optEffortFlags: s.optEffortFlags.filter((x) => x !== id), optEffortResult: null } : {}) }));
  const check = () =>
    patch((s) => {
      const wrong = optEffortWrong(s);
      const rated = OPT_IDS.filter((id) => !!s.optEffort[id]).length;
      return { checks: s.checks + 1, optEffortFlags: wrong, optEffortClue: false, optEffortResult: { holds: rated - wrong.length, rated } };
    });
  return (
    <AnswerBlock
      id="block-1-2"
      title={tt("Block 1.2 · Prototype and test: three options under time pressure", "Block 1.2 · Prototyp und Test: drei Optionen unter Zeitdruck")}
      kind="OBJECTIVE + JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.2"]}
      findIt={tt("Route 1 → Task 1 → the three options below, each with its printed cost and weeks. Rate each one, decide, and tick the risks.", "Route 1 → Task 1 → die drei Optionen darunter, jeweils mit gedruckten Kosten und Wochen. Bewerten Sie jede, entscheiden Sie und haken Sie die Risiken an.")}
    >
      <MaterialRefs refs={["A2", "A5"]} />
      <div className="rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
        <p>{tt(`You are developing a new learning platform. You have three months, a limited budget (${euro(BUDGET)}, Case assumption) and the needs of users are unclear. Effort follows the printed cost, by the rule in Materi A5.`, `Sie entwickeln eine neue Lernplattform. Sie haben drei Monate, ein begrenztes Budget (${euro(BUDGET)}, Fallannahme), und die Bedürfnisse der Nutzer sind unklar. Der Aufwand folgt den gedruckten Kosten, nach der Regel in Materi A5.`)}</p>
      </div>
      {OPTS.map((o) => {
        const flagged = r.optEffortFlags.includes(o.id);
        return (
          <div key={o.id} id={`option-${o.id}`} className="space-y-3 rounded-lg border border-line bg-paper p-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-semibold text-ink">
                {o.id} · {o.name}
              </p>
              <p className="text-caption text-ash">
                {euro(o.cost)} · {o.weeks} {tt("weeks", "Wochen")}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {(
                [
                  ["optBenefit", tt("Benefit", "Nutzen"), tt("What you will know or gain afterwards.", "Was Sie danach wissen oder gewonnen haben.")],
                  ["optEffort", tt("Effort", "Aufwand"), tt("By the printed cost, with the rule in Materi A5.", "Nach den gedruckten Kosten, mit der Regel in Materi A5.")],
                  ["optRisk", tt("Risk", "Risiko"), tt("What could go wrong if the assumption is wrong.", "Was schiefgehen kann, wenn die Annahme falsch ist.")],
                ] as const
              ).map(([key, label, help]) => (
                <div key={key} className="space-y-1">
                  <p className="text-caption font-semibold text-ink">{label}</p>
                  <p className="text-micro normal-case tracking-normal text-ash">{help}</p>
                  <ScorePick value={r[key][o.id] ?? 0} onChange={(v) => set(key, o.id, v)} label={`${o.id}: ${label}`} flagged={key === "optEffort" && flagged} />
                  {r[key][o.id] ? <p className="text-micro text-ash">{L[r[key][o.id]]}</p> : null}
                </div>
              ))}
            </div>
            {flagged && r.optEffortClue && <Reading label={tt("Clue", "Hinweis")}>{tt(`Which price band is ${euro(o.cost)} in? The rule is in Materi A5: under €10,000, up to €25,000, above.`, `In welches Preisband fallen ${euro(o.cost)}? Die Regel steht in Materi A5: unter 10.000 €, bis 25.000 €, darüber.`)}</Reading>}
          </div>
        );
      })}
      <div className="space-y-2">
        <CheckBar onCheck={check} checkLabel={tt("Check my effort ratings", "Meine Aufwandsbewertungen prüfen")} clueShown={r.optEffortClue} onClue={r.optEffortFlags.length ? () => patch({ optEffortClue: true }) : undefined} checks={r.checks} />
        {r.optEffortResult && (
          <Reading>
            {r.optEffortResult.rated === 0
              ? tt("No effort rating yet.", "Noch keine Aufwandsbewertung.")
              : tt(`${r.optEffortResult.holds} of ${r.optEffortResult.rated} effort ratings follow the printed cost. A flagged one is outlined. Benefit and risk are your judgement and are never marked.`, `${r.optEffortResult.holds} von ${r.optEffortResult.rated} Aufwandsbewertungen folgen den gedruckten Kosten. Eine markierte ist umrandet. Nutzen und Risiko sind Ihr Urteil und werden nie markiert.`)}
          </Reading>
        )}
      </div>
      <Field id="optchoice-field" label={tt("Your decision", "Ihre Entscheidung")} help={tt("Choose one of the three options.", "Wählen Sie eine der drei Optionen.")}>
        <OptionList<OptId> options={OPTS.map((o) => ({ id: o.id, label: `${o.id} · ${o.name}` }))} value={r.optChoice} onChange={(id) => patch({ optChoice: id })} label={tt("Your decision", "Ihre Entscheidung")} />
      </Field>
      <TextBox id="optwhy-field" label={tt("Why?", "Warum?")} help={tt(`One or two sentences: refer to the cost, to what you will know afterwards, or to what could go wrong. At least ${MIN_LINE} characters.`, `Ein bis zwei Sätze: Beziehen Sie sich auf die Kosten, darauf, was Sie danach wissen, oder darauf, was schiefgehen kann. Mindestens ${MIN_LINE} Zeichen.`)} value={r.optWhy} onChange={(v) => patch({ optWhy: v })} min={MIN_LINE} rows={3} />
      <ExampleAnswer id="optwhy-example" guide={optWhyGuide()} />
      {mentor && <MentorGuide guide={optWhyGuide()} />}
      <Field id="optrisks-field" label={tt("What risks arise without testing?", "Welche Risiken entstehen ohne Testen?")} help={tt("Tick all that apply to this case.", "Haken Sie alle an, die auf diesen Fall zutreffen.")}>
        <OptionList<RiskTickId> options={RISK_TICKS.map((k) => ({ id: k.id, label: k.text }))} value={r.optRisks} onChange={(id) => patch((s) => ({ optRisks: toggleList(s.optRisks, id) }))} multi cols={2} label={tt("Risks without testing", "Risiken ohne Testen")} />
      </Field>
      <TextBox id="optriskother-field" label={tt("Another risk, or the one that worries you most, and why", "Ein weiteres Risiko oder das, das Sie am meisten sorgt, und warum")} help={tt("Optional. One or two sentences.", "Optional. Ein bis zwei Sätze.")} value={r.optRiskOther} onChange={(v) => patch({ optRiskOther: v })} rows={2} />
      <ExampleAnswer id="optriskother-example" guide={optRiskGuide()} />
      {mentor && <MentorGuide guide={optRiskGuide()} />}
      <AnswerKey block={optKey()} />
      <BlockMissing block="1.2" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.3 (Optional, reflection) */

export function Block13({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR1();
  return (
    <AnswerBlock
      id="block-1-3"
      title={tt("Block 1.3 · Coaching reflection: from design to validation", "Block 1.3 · Coaching-Reflexion: vom Design zur Validierung")}
      kind="REFLECTION"
      core={false}
      minutes={BLOCK_MINUTES["1.3"]}
      findIt={tt("Route 1 → Task 1 → the three questions below. Think back on Block 1.1 and write what comes to mind.", "Route 1 → Task 1 → die drei Fragen darunter. Denken Sie an Block 1.1 zurück und schreiben Sie, was Ihnen einfällt.")}
      analyse={false}
    >
      <p className="max-w-prose text-body text-ink">
        {tt("The coaching point of the plan: successful platforms are not “good by chance”; prototyping reduces risk; testing is the basis for decisions. These notes are yours: they are never scored and never missing, and they appear in your file.", "Der Coaching-Punkt des Plans: Erfolgreiche Plattformen sind nicht „zufällig gut“; Prototyping verringert Risiko; Testen ist die Grundlage für Entscheidungen. Diese Notizen gehören Ihnen: Sie werden nie bewertet, zählen nie als fehlend und erscheinen in Ihrer Datei.")}
      </p>
      {REFLECT.map((q) => (
        <TextBox key={q.k} id={`reflect-${q.k}`} label={q.q} help={tt("Optional. A sentence or two in your own words.", "Optional. Ein oder zwei Sätze in Ihren eigenen Worten.")} value={r.reflect[q.k]} onChange={(v) => patch((s) => ({ reflect: { ...s.reflect, [q.k]: v } }))} rows={2} />
      ))}
      {mentor && <MentorGuide guide={reflectGuide()} />}
      <BlockMissing block="1.3" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 2.1 (Optional) */

export function Block21({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR1();
  const [note, setNote] = useState("");
  const full = r.weak.length >= PICK_WEAK;
  return (
    <AnswerBlock
      id="block-2-1"
      title={tt("Block 2.1 · Three main weaknesses of LearnPro", "Block 2.1 · Drei Hauptschwächen von LearnPro")}
      kind="OBJECTIVE + JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["2.1"]}
      findIt={tt("Route 1 → Task 1 → the case brief above and the eight facts of Block 1.1. Choose three of the six weaknesses below.", "Route 1 → Task 1 → der Fall oben und die acht Fakten aus Block 1.1. Wählen Sie drei der sechs Schwächen unten.")}
    >
      <MaterialRefs refs={["A1", "A3"]} />
      <Field id="weak-pick" label={tt(`Choose exactly ${PICK_WEAK} weaknesses`, `Wählen Sie genau ${PICK_WEAK} Schwächen`)} help={tt("A weakness is something you can point at in the case or in the facts of Block 1.1. You have chosen:", "Eine Schwäche ist etwas, auf das Sie im Fall oder in den Fakten aus Block 1.1 zeigen können. Sie haben gewählt:") + ` ${r.weak.length} / ${PICK_WEAK}`}>
        <OptionList<WeakId>
          options={WEAKS.map((w) => ({ id: w.id, label: w.text }))}
          value={r.weak}
          onChange={(id) => {
            setNote("");
            patch((s) => ({ weak: toggleCapped(s.weak, id, PICK_WEAK), weakResult: null }));
          }}
          multi
          label={tt("Possible weaknesses", "Mögliche Schwächen")}
          disabledIds={full ? WEAKS.map((w) => w.id) : []}
          onDisabledClick={() => setNote(tt(`You have ${PICK_WEAK}. Deselect one first.`, `Sie haben ${PICK_WEAK}. Wählen Sie zuerst eine ab.`))}
        />
        {note && <p role="status" className="text-caption text-ash">{note}</p>}
        <CheckBar onCheck={() => patch((s) => ({ checks: s.checks + 1, weakResult: weakHolds(s.weak) }))} checkLabel={tt("Check my weaknesses", "Meine Schwächen prüfen")} clueShown={r.weakClue} onClue={() => patch({ weakClue: true })} checks={r.checks} />
        {r.weakResult && <Reading>{r.weakResult.chosen === 0 ? tt("Nothing chosen yet.", "Noch nichts gewählt.") : tt(`${r.weakResult.holds} of ${r.weakResult.chosen} chosen weaknesses hold. It never says which.`, `${r.weakResult.holds} von ${r.weakResult.chosen} gewählten Schwächen stimmen. Es sagt nie, welche.`)}</Reading>}
        {r.weakClue && <Reading label={tt("Clue", "Hinweis")}>{tt("For each weakness, find a printed line in the case or a fact that supports it. A weakness with nothing printed behind it is a guess.", "Suchen Sie für jede Schwäche eine gedruckte Zeile im Fall oder einen Fakt, der sie stützt. Eine Schwäche ohne Gedrucktes dahinter ist eine Vermutung.")}</Reading>}
      </Field>
      <TextBox id="weakwhy-field" label={tt("Which printed fact supports your first weakness?", "Welche gedruckte Tatsache stützt Ihre erste Schwäche?")} help={tt(`Quote a line of the case or point at a fact by its number. At least ${MIN_LINE} characters.`, `Zitieren Sie eine Zeile des Falls oder zeigen Sie auf einen Fakt mit seiner Nummer. Mindestens ${MIN_LINE} Zeichen.`)} value={r.weakWhy} onChange={(v) => patch({ weakWhy: v })} min={MIN_LINE} rows={2} />
      <ExampleAnswer id="weak-example" guide={weakGuide()} />
      {mentor && <MentorGuide guide={weakGuide()} />}
      <AnswerKey block={weakKey()} />
      <BlockMissing block="2.1" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 2.2 (Core, Level 2) */

export function Block22({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR1();
  const [note, setNote] = useState("");
  const full = r.tests.length >= PICK_TESTS;
  const cost = planCost(r.approach, r.tests);
  const weeks = planWeeks(r.approach, r.tests);
  const items = [...(r.approach ? [{ id: r.approach, short: APPROACH_BY_ID[r.approach].no, cost: APPROACH_BY_ID[r.approach].cost }] : []), ...r.tests.map((id) => ({ id, short: TEST_BY_ID[id].no, cost: TEST_BY_ID[id].cost }))];
  return (
    <AnswerBlock
      id="block-2-2"
      title={tt("Block 2.2 · Prototype approach, three UX tests and the adaptive decision", "Block 2.2 · Prototyping-Ansatz, drei UX-Tests und die Entscheidung zu adaptivem Lernen")}
      kind="OBJECTIVE + JUDGED"
      core
      minutes={BLOCK_MINUTES["2.2"]}
      findIt={tt("Route 1 → Task 1 → the five approaches and the seven tests in the lists directly below, each with its printed cost and weeks. Answer in the lists and the fields under them.", "Route 1 → Task 1 → die fünf Ansätze und die sieben Tests in den Listen direkt darunter, jeweils mit gedruckten Kosten und Wochen. Antworten Sie in den Listen und den Feldern darunter.")}
    >
      <MaterialRefs refs={["A2", "A3", "A5"]} />
      <div className="rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
        <p>
          <strong>{tt("The limits:", "Die Grenzen:")}</strong> {tt(`${MONTHS} months (${WEEKS_LIMIT} weeks), ${euro(BUDGET)}.`, `${MONTHS} Monate (${WEEKS_LIMIT} Wochen), ${euro(BUDGET)}.`)} {tt("User needs are unclear. The facts of Block 1.1 and the case brief are your evidence. The rule for the adaptive decision is in Materi A5.", "Die Nutzerbedürfnisse sind unklar. Die Fakten aus Block 1.1 und der Fall sind Ihre Belege. Die Regel für die adaptive Entscheidung steht in Materi A5.")}
        </p>
      </div>

      <Field id={IDS.approachPick} label={tt("Step 1 · Choose one prototype approach", "Schritt 1 · Wählen Sie einen Prototyping-Ansatz")} help={tt("Each shows what it is, its cost and its weeks.", "Jeder zeigt, was er ist, seine Kosten und seine Wochen.")}>
        <OptionList<ApproachId>
          options={APPROACHES.map((p) => ({ id: p.id, label: `${p.no} · ${euro(p.cost)} · ${p.weeks} ${tt("weeks", "Wochen")}`, sub: p.what }))}
          value={r.approach}
          onChange={(id) => patch({ approach: id })}
          label={tt("Prototype approaches", "Prototyping-Ansätze")}
        />
      </Field>
      <TextBox
        id={IDS.approachWhy}
        label={tt("Why this approach?", "Warum dieser Ansatz?")}
        help={tt(`Say what question it answers first and what it leaves for later. At least ${MIN_LINE} characters.`, `Sagen Sie, welche Frage er zuerst beantwortet und was er für später lässt. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.approachWhy}
        onChange={(v) => patch({ approachWhy: v })}
        min={MIN_LINE}
        rows={3}
      >
        <WritingHelp
          id="approach-kit"
          refs={[
            { label: tt("A prototype is a question in physical form (Materi A2)", "Ein Prototyp ist eine Frage in physischer Form (Materi A2)"), value: tt("write the question first", "zuerst die Frage schreiben"), target: "mat-A2", before: () => showCardPart("A2", "rules") },
            { label: tt("Unclear needs: test low-fidelity first (Materi A2)", "Unklare Bedürfnisse: zuerst Low-Fidelity testen (Materi A2)"), value: tt("cheap, fast, changeable", "günstig, schnell, änderbar"), target: "mat-A2", before: () => showCardPart("A2", "rules") },
          ]}
          steps={[
            tt("Name the first question your approach answers (“can learners find the next step?”).", "Nennen Sie die erste Frage, die Ihr Ansatz beantwortet („Finden Lernende den nächsten Schritt?“)."),
            tt("Say what it cannot tell you yet (the final look, the speed) and leaves for the next round.", "Sagen Sie, was er noch nicht sagen kann (das endgültige Aussehen, die Geschwindigkeit) und für die nächste Runde lässt."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="approach-example" guide={approachGuide()} />
      {mentor && <MentorGuide guide={approachGuide()} />}

      <Field id={IDS.testPick} label={tt(`Step 2 · Define ${PICK_TESTS} UX tests`, `Schritt 2 · Definieren Sie ${PICK_TESTS} UX-Tests`)} help={tt("Each shows what it answers, what kind of data it gives, its cost and its weeks. You have chosen:", "Jeder zeigt, was er beantwortet, welche Art Daten er liefert, seine Kosten und seine Wochen. Sie haben gewählt:") + ` ${r.tests.length} / ${PICK_TESTS}`}>
        <OptionList<TestId>
          options={TESTS.map((x) => ({ id: x.id, label: `${x.no} · ${x.name} · ${euro(x.cost)} · ${x.weeks} ${tt("weeks", "Wochen")}`, tag: TEST_KIND[x.kind], sub: x.answers }))}
          value={r.tests}
          onChange={(id) => {
            setNote("");
            patch((s) => ({ tests: toggleCapped(s.tests, id, PICK_TESTS) }));
          }}
          multi
          cols={2}
          label={tt("UX tests", "UX-Tests")}
          disabledIds={full ? TESTS.map((x) => x.id) : []}
          onDisabledClick={() => setNote(tt(`You have ${PICK_TESTS}. Deselect one first.`, `Sie haben ${PICK_TESTS}. Wählen Sie zuerst einen ab.`))}
        />
        {note && <p role="status" className="text-caption text-ash">{note}</p>}
      </Field>
      {r.tests.map((id) => (
        <TextBox
          key={id}
          id={IDS.testQ(id)}
          label={tt(`The question ${TEST_BY_ID[id].no} answers for LearnPro`, `Die Frage, die ${TEST_BY_ID[id].no} für LearnPro beantwortet`)}
          help={tt(`${TEST_BY_ID[id].name}. State the question, not the name of the test again. At least ${MIN_REASON} characters.`, `${TEST_BY_ID[id].name}. Nennen Sie die Frage, nicht noch einmal den Namen des Tests. Mindestens ${MIN_REASON} Zeichen.`)}
          value={r.testQ[id] ?? ""}
          onChange={(v) => patch((s) => ({ testQ: { ...s.testQ, [id]: v } }))}
          min={MIN_REASON}
          rows={2}
        />
      ))}
      {r.tests.length > 0 && <ExampleAnswer id="testq-example" guide={testQGuide()} />}
      {mentor && r.tests.length > 0 && <MentorGuide guide={testQGuide()} />}

      {items.length > 0 && (
        <div className="space-y-2">
          <BudgetBar items={items} budget={BUDGET} title={tt("Cost of your approach plus your tests against the budget", "Kosten Ihres Ansatzes plus Ihrer Tests gegen das Budget")} />
          <p className="text-caption text-ink" aria-live="polite">
            {tt(`Total ${euro(cost)} of ${euro(BUDGET)}${cost > BUDGET ? `, ${euro(cost - BUDGET)} over` : ""}. Longest item ${weeks} weeks of ${WEEKS_LIMIT}${weeks > WEEKS_LIMIT ? ", over" : ""}.`, `Gesamt ${euro(cost)} von ${euro(BUDGET)}${cost > BUDGET ? `, ${euro(cost - BUDGET)} darüber` : ""}. Längstes Element ${weeks} Wochen von ${WEEKS_LIMIT}${weeks > WEEKS_LIMIT ? ", darüber" : ""}.`)}{" "}
            {(cost > BUDGET || weeks > WEEKS_LIMIT) && <span className="text-ash">{tt("Going over is allowed; say why in your reasons. It is printed in your file as a fact.", "Das Überschreiten ist erlaubt; sagen Sie in Ihren Begründungen, warum. Es steht als Tatsache in Ihrer Datei.")}</span>}
          </p>
        </div>
      )}

      <Field id={IDS.adaptive} label={tt("Step 3 · Is adaptive learning worthwhile for LearnPro?", "Schritt 3 · Lohnt adaptives Lernen für LearnPro?")} help={tt("Choose one. “Partly” is a real answer: say which part and which part waits.", "Wählen Sie eine. „Teilweise“ ist eine echte Antwort: Sagen Sie, welcher Teil und welcher Teil wartet.")}>
        <OptionList<Verdict> options={VERDICTS.map((v) => ({ id: v.id, label: v.label }))} value={r.adaptive} onChange={(id) => patch({ adaptive: id })} label={tt("Adaptive learning", "Adaptives Lernen")} cols={2} />
      </Field>
      <TextBox
        id={IDS.adaptiveWhy}
        label={tt("Your reason, and the first step you would take", "Ihr Grund und der erste Schritt, den Sie gehen würden")}
        help={tt(`If you say Partly, say which part and which part waits. At least ${MIN_LINE} characters.`, `Wenn Sie „Teilweise“ sagen, nennen Sie, welcher Teil und welcher Teil wartet. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.adaptiveWhy}
        onChange={(v) => patch({ adaptiveWhy: v })}
        min={MIN_LINE}
        rows={4}
      >
        <WritingHelp
          id="adaptive-kit"
          refs={[{ label: tt("The three questions and the simplest level first (Materi A5)", "Die drei Fragen und zuerst die einfachste Stufe (Materi A5)"), value: tt("problem · data · variants", "Problem · Daten · Varianten"), target: "mat-A5", before: () => showCardPart("A5", "rules") }]}
          steps={[
            tt("Ask the three questions: is there a learner problem that individual paths solve, is there enough data, are there content variants?", "Stellen Sie die drei Fragen: Gibt es ein Problem der Lernenden, das individuelle Pfade lösen, gibt es genug Daten, gibt es Inhaltsvarianten?"),
            tt("Choose the simplest level that answers the problem (a rule before an algorithm) and name the first step.", "Wählen Sie die einfachste Stufe, die das Problem beantwortet (eine Regel vor einem Algorithmus), und nennen Sie den ersten Schritt."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="adaptive-example" guide={adaptiveGuide()} />
      {mentor && <MentorGuide guide={adaptiveGuide()} />}

      <TextBox
        id={IDS.missingInfo}
        label={tt("Step 4 · What information are you missing?", "Schritt 4 · Welche Information fehlt Ihnen?")}
        help={tt(`Name something specific you do not know that would change your decision, and how you could find it out. At least ${MIN_LINE} characters.`, `Nennen Sie etwas Konkretes, das Sie nicht wissen und das Ihre Entscheidung ändern würde, und wie Sie es herausfinden könnten. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.missingInfo}
        onChange={(v) => patch({ missingInfo: v })}
        min={MIN_LINE}
        rows={3}
      />
      <ExampleAnswer id="missing-example" guide={missingGuide()} />
      {mentor && <MentorGuide guide={missingGuide()} />}
      <AnswerKey block={approachKey()} />
      <AnswerKey block={testKey()} />
      <AnswerKey block={adaptiveKey()} />
      <BlockMissing block="2.2" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ the task */

export function Task1() {
  const p = usePersisted();
  const missing = r1Missing(p);
  const filename = exportName(p.participant.name, 2, 1);
  return (
    <section id="task-1" aria-labelledby="task1-h" className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt("Task 1 · two core blocks, one per level; optional blocks folded", "Task 1 · zwei Kernblöcke, einer pro Level; optionale Blöcke eingeklappt")}</p>
        <h2 id="task1-h">{tt("UX Analysis File: compare platforms, plan prototypes and tests", "UX Analysis File: Plattformen vergleichen, Prototypen und Tests planen")}</h2>
      </header>
      <CaseBrief />
      <PartHeading id="part-1" n={1} title={tt("Compare platforms and options", "Plattformen und Optionen vergleichen")} level={tt("Level 1 · Knowledge", "Level 1 · Wissen")} />
      <Block11 missing={missing} />
      <OptionalSection
        id="block-1-2"
        title={tt("Block 1.2 · Prototype and test: three options under time pressure", "Block 1.2 · Prototyp und Test: drei Optionen unter Zeitdruck")}
        minutes={BLOCK_MINUTES["1.2"]}
        reason={tt("Practises the three ratings on a prototyping decision at small scale; Block 2.2 is answered without it.", "Übt die drei Bewertungen an einer Prototyping-Entscheidung im Kleinen; Block 2.2 wird auch ohne ihn beantwortet.")}
      >
        <Block12 missing={missing} />
      </OptionalSection>
      <OptionalSection
        id="block-1-3"
        title={tt("Block 1.3 · Coaching reflection: from design to validation", "Block 1.3 · Coaching-Reflexion: vom Design zur Validierung")}
        minutes={BLOCK_MINUTES["1.3"]}
        reason={tt("A reflective bridge between the two levels; your notes appear in the file, and no Core block needs them.", "Eine reflektierende Brücke zwischen den beiden Levels; Ihre Notizen erscheinen in der Datei, und kein Kernblock braucht sie.")}
      >
        <Block13 missing={missing} />
      </OptionalSection>
      <PartHeading id="part-2" n={2} title={tt("Plan prototypes and tests", "Prototypen und Tests planen")} level={tt("Level 2 · Application", "Level 2 · Anwendung")} />
      <OptionalSection
        id="block-2-1"
        title={tt("Block 2.1 · Three main weaknesses of LearnPro", "Block 2.1 · Drei Hauptschwächen von LearnPro")}
        minutes={BLOCK_MINUTES["2.1"]}
        reason={tt("Practises pointing at a printed fact for a weakness; Block 2.2 does not read this block.", "Übt, für eine Schwäche auf einen gedruckten Fakt zu zeigen; Block 2.2 liest diesen Block nicht.")}
      >
        <Block21 missing={missing} />
      </OptionalSection>
      <Block22 missing={missing} />
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
        <Link href={routeHref(2, 2)} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          {tt("Route 2 · Level 3 →", "Route 2 · Level 3 →")}
        </Link>{" "}
        {tt("It is only a suggestion; nothing is locked.", "Das ist nur eine Empfehlung; nichts ist gesperrt.")}
      </p>
    </section>
  );
}
