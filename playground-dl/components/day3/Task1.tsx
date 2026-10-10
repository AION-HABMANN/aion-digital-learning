"use client";

import Link from "next/link";
import { useState } from "react";
import { EduCoreScreens } from "@/components/day3/Screens";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { BudgetBar } from "@/components/ui/BudgetBar";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { ExportBar } from "@/components/ui/ExportBar";
import { Field } from "@/components/ui/Field";
import { MeasureThumb } from "@/components/day3/mocks";
import type { MeasureKind } from "@/components/day3/mocks";
import { CheckBar, OptionList, Reading, ScorePick, TextBox } from "@/components/ui/Inputs";
import { Callout } from "@/components/ui/MaterialCard";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { OrderList } from "@/components/ui/OrderList";
import { PlacementBoard } from "@/components/ui/PlacementBoard";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { AREAS, AREA_IDS, BUDGET, CAUSES, FACTS, FACT_BY_ID, MEASURES, MEASURE_AREA, MEASURE_BY_ID, OPTS, OPT_BY_ID, OPT_IDS, PICK_CAUSES, PICK_MEASURES, REFLECT, WEEKS_LIMIT, longestWeeks, totalCost } from "@/data/day3/case";
import type { AreaId, CauseId, FactId, MeasureId, OptId } from "@/data/day3/case";
import { routeHref } from "@/data/course";
import { analysisBody } from "@/lib/day3/exportDoc";
import { causeHolds, effortWrong, optEffortWrong, sortHolds } from "@/lib/day3/checks";
import { causeGuide, improveGuide, missingGuide, optWhyGuide, orderGuide, reasonGuide, reflectGuide, worstGuide } from "@/lib/day3/guides";
import { causeKey, measureKey, optKey, sortKey } from "@/lib/day3/answerKey";
import { IDS, r1Missing } from "@/lib/day3/missing";
import { BLOCK_MINUTES, CORE1_MINUTES, MIN_LINE, MIN_REASON, TASK1_MINUTES } from "@/lib/day3/progress";
import { placeItem, redoSort, swap, syncOrder, toggleCapped, undoSort } from "@/lib/lists";
import type { MissingEntry } from "@/lib/missing";
import { Gloss } from "@/lib/glossify";
import { euro, tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { showCardPart } from "@/store/useCardMore";
import type { D3R1 } from "@/store/dayTypes";
import { usePersisted } from "@/store/usePersisted";
import { useStore } from "@/store/useStore";
import type { Score } from "@/store/useStore";

/** Day 3 · Route 1 · the UX Analysis File. Core: Block 1.1 (Level 1) and Block 2.2 (Level 2). Optional: 1.2, 1.3, 2.1 (CLAUDE.md #35, #40). */

const LEVELS = () => ["", tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")];

/* ------------------------------------------------------------------ the case */

function CaseBrief() {
  return (
    <section id="case-brief" aria-labelledby="case-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case-h">{tt("The case: EduCore, a platform with an overwhelm effect", "Der Fall: EduCore, eine Plattform mit Überforderungseffekt")}</h2>
        <span className="smallcaps">{tt("Read once · about 3 min", "Einmal lesen · ca. 3 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt(
            "EduCore is a learning platform for professionals. Learners say they do not understand the content, many drop out, and the platform is called “too complicated”. A first look at the screens shows three things: too much information at once, no visual structure, and no recognisable learning logic. You are part of the UX team and must reduce the overload without making the content useless.",
            "EduCore ist eine Lernplattform für Fachkräfte. Lernende sagen, sie verstünden den Inhalt nicht, viele brechen ab, und die Plattform wird „zu kompliziert“ genannt. Ein erster Blick auf die Bildschirme zeigt drei Dinge: zu viel Information auf einmal, keine visuelle Struktur und keine erkennbare Lernlogik. Sie gehören zum UX-Team und müssen die Überlastung senken, ohne den Inhalt nutzlos zu machen.",
          )}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("What you have", "Was Sie haben")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt("Four EduCore screens in outline and eight facts about them (Block 1.1).", "Vier EduCore-Bildschirme in Umrissen und acht Fakten dazu (Block 1.1).")}</li>
            <li>{tt("Three measures for a learning module (optional Block 1.2) and seven possible causes of overload (optional Block 2.1).", "Drei Maßnahmen für ein Lernmodul (optionaler Block 1.2) und sieben mögliche Ursachen der Überlastung (optionaler Block 2.1).")}</li>
            <li>{tt("Nine measures EduCore could fund, each with a cost and weeks (Block 2.2).", "Neun Maßnahmen, die EduCore finanzieren könnte, jeweils mit Kosten und Wochen (Block 2.2).")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Time: ", "Zeit: ")}
              <strong>{tt(`${WEEKS_LIMIT} weeks`, `${WEEKS_LIMIT} Wochen`)}</strong>
            </li>
            <li>
              {tt("Budget: ", "Budget: ")}
              <strong>{euro(BUDGET)}</strong> <span className="text-ash">{tt("(Case assumption)", "(Fallannahme)")}</span>
            </li>
            <li>{tt("The content is specialist and complex; the learners are beginners.", "Der Inhalt ist fachlich und komplex; die Lernenden sind Einsteiger.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · two core blocks, about ${CORE1_MINUTES} min`, `So läuft die Aufgabe · zwei Kernblöcke, ca. ${CORE1_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 1.1: sort eight facts, say how the learning process feels and what you would improve (Level 1, A2 and A3).", "Block 1.1: acht Fakten sortieren, sagen, wie sich der Lernprozess anfühlt und was Sie verbessern würden (Level 1, A2 und A3).")}</li>
            <li>{tt("Block 2.2: choose four of nine measures, rate them, order them, justify and name what is missing (Level 2, A5).", "Block 2.2: vier von neun Maßnahmen wählen, bewerten, ordnen, begründen und nennen, was fehlt (Level 2, A5).")}</li>
          </ol>
          <p className="mt-1 text-ash">{tt(`Three more blocks (about ${TASK1_MINUTES - CORE1_MINUTES} min) are optional and folded.`, `Drei weitere Blöcke (ca. ${TASK1_MINUTES - CORE1_MINUTES} Min.) sind optional und eingeklappt.`)}</p>
        </div>
      </div>
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>
          {tt(
            "The brief says: users do not understand the content, a high drop-out rate, content “too complicated”, too much information at once, no visual structure, no recognisable learning logic, a long continuous text of 500 words with unexplained technical terms, no visualisation, a time limit of 4 weeks, complex content and beginners. Everything else is made up for this exercise: the screens, the 28 lessons, the 12 quiz questions, the costs and the weeks.",
            "Der Auftrag sagt: Nutzer verstehen den Inhalt nicht, eine hohe Abbruchquote, Inhalt „zu kompliziert“, zu viel Information auf einmal, keine visuelle Struktur, keine erkennbare Lernlogik, ein langer durchgehender Text von 500 Wörtern mit unerklärten Fachbegriffen, keine Visualisierung, ein Zeitlimit von 4 Wochen, komplexer Inhalt und Einsteiger. Alles andere ist für diese Übung erfunden: die Bildschirme, die 28 Lektionen, die 12 Quizfragen, die Kosten und die Wochen.",
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

function useR1() {
  return { r: useStore((s) => s.d3.r1), patch: useStore((s) => s.patchD3R1), mentor: useStore((s) => s.mentorUnlocked) };
}

/* ------------------------------------------------------------------ Block 1.1 (Core, Level 1) */

/** A small picture for each measure, so a learner chooses by looking and not only by reading a name (CLAUDE.md #52). */
const MEASURE_THUMB: Record<MeasureId, MeasureKind> = { m1: "chunk", m2: "visual", m3: "structure", m4: "extras", m5: "outline", m6: "points", m7: "brand", m8: "chatbot", m9: "library" };

export function Block11({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR1();
  const worstName = r.worst ? FACT_BY_ID[r.worst].short : "—";
  return (
    <AnswerBlock
      id="block-1-1"
      title={tt("Block 1.1 · Eight facts: amount, form, or order and purpose?", "Block 1.1 · Acht Fakten: Menge, Form oder Ordnung und Zweck?")}
      kind="OBJECTIVE + JUDGED"
      core
      minutes={BLOCK_MINUTES["1.1"]}
      findIt={tt("Route 1 → Task 1 → the drawn EduCore screens directly below, then the sort board with the eight facts. Answer on the board, then in the fields under it.", "Route 1 → Task 1 → die gezeichneten EduCore-Bildschirme direkt darunter, dann die Sortiertafel mit den acht Fakten. Antworten Sie auf der Tafel, dann in den Feldern darunter.")}
    >
      <MaterialRefs refs={["A2", "A3"]} />
      <EduCoreScreens />
      <PlacementBoard<AreaId>
        items={FACTS.map((f) => ({ id: f.id, meta: `${f.no} · ${f.where}`, text: f.text }))}
        bins={AREA_IDS.map((id) => ({ id, label: AREAS[id].label, hint: AREAS[id].hint }))}
        value={r.sort}
        onPlace={(id, bin) => patch((s) => placeItem<AreaId, D3R1>(s, id, bin))}
        onUndo={() => patch((s) => undoSort<AreaId, D3R1>(s))}
        onRedo={() => patch((s) => redoSort<AreaId, D3R1>(s))}
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
        intro={tt("Drag a fact onto the area it concerns, or select it and then an area. Select a placed one to move it again. One area per fact: Amount, Form, or Order and purpose.", "Ziehen Sie einen Fakt auf den Bereich, den er betrifft, oder wählen Sie ihn und dann einen Bereich. Wählen Sie einen platzierten, um ihn zu verschieben. Ein Bereich pro Fakt: Menge, Form oder Ordnung und Zweck.")}
        tests={
          <RevealHint id="sort-tests" label={tt("Show the test questions", "Testfragen zeigen")} title={tt("Test questions · taught in Materi A2 and A3", "Testfragen · aus Materi A2 und A3")}>
            <div className="space-y-2 text-caption text-ink">
              <p>{tt("Ask these of every fact. They repeat the three observations of the case; they never say which fact goes where.", "Stellen Sie diese Fragen zu jedem Fakt. Sie wiederholen die drei Beobachtungen des Falls; sie sagen nie, welcher Fakt wohin gehört.")}</p>
              <ul className="space-y-1.5">
                {AREA_IDS.map((a) => (
                  <li key={a}>
                    <span className="font-semibold">{AREAS[a].label}. </span>
                    <Gloss>{AREAS[a].test}</Gloss>
                  </li>
                ))}
              </ul>
              <MaterialRefs refs={["A2", "A3"]} lead={tt("Taught in", "Gelehrt in")} />
            </div>
          </RevealHint>
        }
      />
      <Field id={IDS.worst} label={tt("Which one fact would make you, as a learner, stop first?", "Welcher eine Fakt ließe Sie als Lernende zuerst aufhören?")} help={tt("Choose one of the eight. Any of them can be right; the next field asks how the process feels.", "Wählen Sie einen der acht. Jeder kann richtig sein; das nächste Feld fragt, wie sich der Prozess anfühlt.")}>
        <OptionList<FactId> options={FACTS.map((f) => ({ id: f.id, label: `${f.no} · ${f.short}`, sub: f.where }))} value={r.worst} onChange={(id) => patch({ worst: id })} label={tt("The fact that makes a learner stop first", "Der Fakt, der Lernende zuerst aufhören lässt")} cols={2} />
      </Field>
      <TextBox
        id={IDS.worstWhy}
        label={tt("How does the learning process feel, and why?", "Wie fühlt sich der Lernprozess an, und warum?")}
        help={tt(`Write it as the learner would feel it (“I would lose track of…”). Say what they cannot do or hold in mind, not what looks wrong. At least ${MIN_LINE} characters.`, `Schreiben Sie es so, wie die Lernenden es empfänden („Ich würde den Faden verlieren…“). Sagen Sie, was sie nicht können oder im Kopf behalten können, nicht was schlecht aussieht. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.worstWhy}
        onChange={(v) => patch({ worstWhy: v })}
        min={MIN_LINE}
        rows={4}
      >
        <WritingHelp
          id="worst-kit"
          refs={[
            { label: tt("The fact you chose", "Der Fakt, den Sie gewählt haben"), value: worstName, target: IDS.fact(r.worst ?? "f1") },
            { label: tt("Intake, processing, storage (Materi A1)", "Aufnahme, Verarbeitung, Speicherung (Materi A1)"), value: tt("what to look at · what to hold · what to keep", "worauf schauen · was halten · was behalten"), target: "mat-A1", before: () => showCardPart("A1", "rules") },
          ]}
          steps={[
            tt("Start with “I would…” and name what the learner cannot do or hold in mind on that screen.", "Beginnen Sie mit „Ich würde…“ und nennen Sie, was die Lernenden auf diesem Bildschirm nicht können oder im Kopf behalten können."),
            tt("Say which step of learning fails (what to look at, what to hold, what to keep) and what they then do.", "Sagen Sie, welcher Schritt des Lernens scheitert (worauf schauen, was halten, was behalten) und was sie daraufhin tun."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="worst-example" guide={worstGuide()} />
      {mentor && <MentorGuide guide={worstGuide()} />}
      <TextBox
        id={IDS.improve}
        label={tt("What would you improve intuitively, and which fact does each improvement answer?", "Was würden Sie intuitiv verbessern, und welchen Fakt beantwortet jede Verbesserung?")}
        help={tt(`Name each improvement and the fact it answers by its number. At least ${MIN_LINE} characters.`, `Nennen Sie jede Verbesserung und den Fakt, den sie beantwortet, mit seiner Nummer. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.improve}
        onChange={(v) => patch({ improve: v })}
        min={MIN_LINE}
        rows={3}
      />
      <ExampleAnswer id="improve-example" guide={improveGuide()} />
      {mentor && <MentorGuide guide={improveGuide()} />}
      <AnswerKey block={sortKey()} />
      <BlockMissing block="1.1" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.2 (Optional) */

export function Block12({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR1();
  const L = LEVELS();
  const ordered = r.optOrder.length === OPT_IDS.length;
  const order = ordered ? r.optOrder : OPT_IDS;
  const set = (key: "optImpact" | "optEffort" | "optRisk", id: OptId, v: Score) =>
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
      title={tt("Block 1.2 · Reduce the load of a module: three options", "Block 1.2 · Die Belastung eines Moduls senken: drei Optionen")}
      kind="OBJECTIVE + JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.2"]}
      findIt={tt("Route 1 → Task 1 → the three options below, each with its printed cost and weeks. Rate each one, put them in order, and say which has the greatest effect.", "Route 1 → Task 1 → die drei Optionen darunter, jeweils mit gedruckten Kosten und Wochen. Bewerten Sie jede, ordnen Sie sie und sagen Sie, welche die größte Wirkung hat.")}
    >
      <MaterialRefs refs={["A5"]} />
      <div className="rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
        <p>{tt(`You are to improve a learning module. You have ${WEEKS_LIMIT} weeks, a budget of ${euro(BUDGET)} (Case assumption), the content is complex (a specialist subject) and the target group is beginners. Effort follows the printed cost, by the rule in Materi A5.`, `Sie sollen ein Lernmodul verbessern. Sie haben ${WEEKS_LIMIT} Wochen, ein Budget von ${euro(BUDGET)} (Fallannahme), der Inhalt ist komplex (ein Fachthema) und die Zielgruppe sind Einsteiger. Der Aufwand folgt den gedruckten Kosten, nach der Regel in Materi A5.`)}</p>
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
                  ["optImpact", tt("Learning impact", "Lernwirkung"), tt("How much it helps learners understand.", "Wie sehr es Lernenden beim Verstehen hilft.")],
                  ["optEffort", tt("Effort", "Aufwand"), tt("By the printed cost, with the rule in Materi A5.", "Nach den gedruckten Kosten, mit der Regel in Materi A5.")],
                  ["optRisk", tt("Risk", "Risiko"), tt("What could be lost or go wrong.", "Was verloren gehen oder schiefgehen kann.")],
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
            {flagged && r.optEffortClue && <Reading label={tt("Clue", "Hinweis")}>{tt(`Which price band is ${euro(o.cost)} in? The rule is in Materi A5: under €8,000, up to €15,000, above.`, `In welches Preisband fallen ${euro(o.cost)}? Die Regel steht in Materi A5: unter 8.000 €, bis 15.000 €, darüber.`)}</Reading>}
          </div>
        );
      })}
      <div className="space-y-2">
        <CheckBar onCheck={check} checkLabel={tt("Check my effort ratings", "Meine Aufwandsbewertungen prüfen")} clueShown={r.optEffortClue} onClue={r.optEffortFlags.length ? () => patch({ optEffortClue: true }) : undefined} checks={r.checks} />
        {r.optEffortResult && (
          <Reading>
            {r.optEffortResult.rated === 0
              ? tt("No effort rating yet.", "Noch keine Aufwandsbewertung.")
              : tt(`${r.optEffortResult.holds} of ${r.optEffortResult.rated} effort ratings follow the printed cost. A flagged one is outlined. Learning impact and risk are your judgement and are never marked.`, `${r.optEffortResult.holds} von ${r.optEffortResult.rated} Aufwandsbewertungen folgen den gedruckten Kosten. Eine markierte ist umrandet. Lernwirkung und Risiko sind Ihr Urteil und werden nie markiert.`)}
          </Reading>
        )}
      </div>
      <Field id={IDS.optOrder} label={tt("Put the three options in priority order", "Bringen Sie die drei Optionen in eine Prioritätsreihenfolge")} help={tt("The first is the one with the greatest effect on learning. Move one up or down with the arrows.", "Die erste ist die mit der größten Wirkung auf das Lernen. Verschieben Sie eine mit den Pfeilen nach oben oder unten.")}>
        <OrderList<OptId> order={order} name={(id) => `${id} · ${OPT_BY_ID[id].name}`} onMove={(id, dir) => patch((s) => ({ optOrder: swap(s.optOrder.length === OPT_IDS.length ? s.optOrder : OPT_IDS, id, dir) }))} />
        {!ordered && (
          <button type="button" onClick={() => patch({ optOrder: [...OPT_IDS] })} className="btn-ghost btn-sm">
            {tt("Keep this order", "Diese Reihenfolge behalten")}
          </button>
        )}
      </Field>
      <TextBox id={IDS.optWhy} label={tt("Which option has the greatest effect on learning, and why?", "Welche Option hat die größte Wirkung auf das Lernen, und warum?")} help={tt(`One or two sentences: refer to what the learner has to hold, find or understand. At least ${MIN_LINE} characters.`, `Ein bis zwei Sätze: Beziehen Sie sich darauf, was die Lernenden halten, finden oder verstehen müssen. Mindestens ${MIN_LINE} Zeichen.`)} value={r.optWhy} onChange={(v) => patch({ optWhy: v })} min={MIN_LINE} rows={3} />
      <ExampleAnswer id="optwhy-example" guide={optWhyGuide()} />
      {mentor && <MentorGuide guide={optWhyGuide()} />}
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
      title={tt("Block 1.3 · Coaching reflection: UX steers attention and thinking", "Block 1.3 · Coaching-Reflexion: UX steuert Aufmerksamkeit und Denken")}
      kind="REFLECTION"
      core={false}
      minutes={BLOCK_MINUTES["1.3"]}
      findIt={tt("Route 1 → Task 1 → the three questions below. Think back on Block 1.1 and write what comes to mind.", "Route 1 → Task 1 → die drei Fragen darunter. Denken Sie an Block 1.1 zurück und schreiben Sie, was Ihnen einfällt.")}
      analyse={false}
    >
      <p className="max-w-prose text-body text-ink">
        {tt("The coaching point of the plan: UX decides whether learning takes place at all; good UX does not reduce thinking but guides it; “simple” is not the same as “effective for learning”. These notes are yours: they are never scored and never missing, and they appear in your file.", "Der Coaching-Punkt des Plans: UX entscheidet, ob Lernen überhaupt stattfindet; gutes UX verringert das Denken nicht, sondern lenkt es; „einfach“ ist nicht dasselbe wie „wirksam fürs Lernen“. Diese Notizen gehören Ihnen: Sie werden nie bewertet, zählen nie als fehlend und erscheinen in Ihrer Datei.")}
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
  const full = r.causes.length >= PICK_CAUSES;
  return (
    <AnswerBlock
      id="block-2-1"
      title={tt("Block 2.1 · Four causes of cognitive overload", "Block 2.1 · Vier Ursachen kognitiver Überlastung")}
      kind="OBJECTIVE + JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["2.1"]}
      findIt={tt("Route 1 → Task 1 → the case brief above and the eight facts of Block 1.1. Choose four of the seven causes below.", "Route 1 → Task 1 → der Fall oben und die acht Fakten aus Block 1.1. Wählen Sie vier der sieben Ursachen unten.")}
    >
      <MaterialRefs refs={["A2", "A4"]} />
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
        {r.causeClue && <Reading label={tt("Clue", "Hinweis")}>{tt("For each cause, find a printed line in the case or a fact that supports it. Ask also whether design can change it, or whether it is the subject itself.", "Suchen Sie für jede Ursache eine gedruckte Zeile im Fall oder einen Fakt, der sie stützt. Fragen Sie auch, ob Gestaltung sie ändern kann oder ob es das Thema selbst ist.")}</Reading>}
      </Field>
      <TextBox id={IDS.causeWhy} label={tt("Which printed fact supports your first cause?", "Welche gedruckte Tatsache stützt Ihre erste Ursache?")} help={tt(`Quote a line of the case or point at a fact by its number. At least ${MIN_LINE} characters.`, `Zitieren Sie eine Zeile des Falls oder zeigen Sie auf einen Fakt mit seiner Nummer. Mindestens ${MIN_LINE} Zeichen.`)} value={r.causeWhy} onChange={(v) => patch({ causeWhy: v })} min={MIN_LINE} rows={2} />
      <ExampleAnswer id="cause-example" guide={causeGuide()} />
      {mentor && <MentorGuide guide={causeGuide()} />}
      <AnswerKey block={causeKey()} />
      <BlockMissing block="2.1" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 2.2 (Core, Level 2) */

export function Block22({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR1();
  const [note, setNote] = useState("");
  const L = LEVELS();
  const chosen = r.chosen;
  const full = chosen.length >= PICK_MEASURES;
  const cost = totalCost(chosen);
  const weeks = longestWeeks(chosen);
  const set = (key: "impact" | "effort" | "risk", id: MeasureId, v: Score) =>
    patch((s) => ({ [key]: { ...s[key], [id]: v }, ...(key === "effort" ? { effortFlags: s.effortFlags.filter((x) => x !== id), effortResult: null } : {}) }));
  const check = () =>
    patch((s) => {
      const wrong = effortWrong(s);
      const rated = s.chosen.filter((id) => !!s.effort[id]).length;
      return { checks: s.checks + 1, effortFlags: wrong, effortClue: false, effortResult: { holds: rated - wrong.length, rated } };
    });
  return (
    <AnswerBlock
      id="block-2-2"
      title={tt("Block 2.2 · Four improvements, rated, ordered and justified", "Block 2.2 · Vier Verbesserungen, bewertet, geordnet und begründet")}
      kind="OBJECTIVE + JUDGED"
      core
      minutes={BLOCK_MINUTES["2.2"]}
      findIt={tt("Route 1 → Task 1 → the nine measures in the list directly below, each with its printed cost and weeks. Answer in the list, the rating rows and the fields under it.", "Route 1 → Task 1 → die neun Maßnahmen in der Liste direkt darunter, jeweils mit gedruckten Kosten und Wochen. Antworten Sie in der Liste, den Bewertungszeilen und den Feldern darunter.")}
    >
      <MaterialRefs refs={["A5", "A2", "A3"]} />
      <div className="rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
        <p>
          <strong>{tt("The limits:", "Die Grenzen:")}</strong> {tt(`${WEEKS_LIMIT} weeks, ${euro(BUDGET)}.`, `${WEEKS_LIMIT} Wochen, ${euro(BUDGET)}.`)} {tt("The facts of Block 1.1 and the case brief are your evidence. Effort follows the printed cost, by the rule in Materi A5.", "Die Fakten aus Block 1.1 und der Fall sind Ihre Belege. Der Aufwand folgt den gedruckten Kosten, nach der Regel in Materi A5.")}
        </p>
      </div>

      <Field id={IDS.measurePick} label={tt(`Step 1 · Choose exactly ${PICK_MEASURES} of the nine measures`, `Schritt 1 · Wählen Sie genau ${PICK_MEASURES} der neun Maßnahmen`)} help={tt("Each shows what it does, what a learner notices, its cost and its weeks, and what it acts on. You have chosen:", "Jede zeigt, was sie tut, was Lernende bemerken, ihre Kosten und Wochen, und worauf sie wirkt. Sie haben gewählt:") + ` ${chosen.length} / ${PICK_MEASURES}`}>
        <OptionList<MeasureId>
          options={MEASURES.map((m) => ({ id: m.id, label: `${m.no} · ${m.name} · ${euro(m.cost)} · ${m.weeks} ${tt("weeks", "Wochen")}`, tag: MEASURE_AREA[m.area], visual: <MeasureThumb kind={MEASURE_THUMB[m.id]} />, sub: `${m.what}\n${tt("A learner notices:", "Lernende bemerken:")} ${m.notice}` }))}
          value={chosen}
          onChange={(id) => {
            setNote("");
            patch((s) => {
              const next = toggleCapped(s.chosen, id, PICK_MEASURES);
              return { chosen: next, order: syncOrder(s.order, next), effortFlags: [], effortClue: false, effortResult: null };
            });
          }}
          multi
          cols={2}
          label={tt("Measures EduCore could fund", "Maßnahmen, die EduCore finanzieren könnte")}
          disabledIds={full ? MEASURES.map((m) => m.id) : []}
          onDisabledClick={() => setNote(tt(`You have ${PICK_MEASURES}. Deselect one first.`, `Sie haben ${PICK_MEASURES}. Wählen Sie zuerst eine ab.`))}
        />
        {note && <p role="status" className="text-caption text-ash">{note}</p>}
      </Field>

      {chosen.length > 0 && (
        <div className="space-y-2">
          <BudgetBar items={chosen.map((id) => ({ id, short: MEASURE_BY_ID[id].no, cost: MEASURE_BY_ID[id].cost }))} budget={BUDGET} title={tt("Cost of the chosen measures against the budget", "Kosten der gewählten Maßnahmen gegen das Budget")} />
          <p className="text-caption text-ink" aria-live="polite">
            {tt(`Total ${euro(cost)} of ${euro(BUDGET)}${cost > BUDGET ? `, ${euro(cost - BUDGET)} over` : ""}. Longest measure ${weeks} weeks of ${WEEKS_LIMIT}${weeks > WEEKS_LIMIT ? ", over" : ""}.`, `Gesamt ${euro(cost)} von ${euro(BUDGET)}${cost > BUDGET ? `, ${euro(cost - BUDGET)} darüber` : ""}. Längste Maßnahme ${weeks} Wochen von ${WEEKS_LIMIT}${weeks > WEEKS_LIMIT ? ", darüber" : ""}.`)}{" "}
            {(cost > BUDGET || weeks > WEEKS_LIMIT) && <span className="text-ash">{tt("Going over is allowed; say why in the reasons below. It is printed in your file as a fact.", "Das Überschreiten ist erlaubt; sagen Sie in den Begründungen unten, warum. Es steht als Tatsache in Ihrer Datei.")}</span>}
          </p>
        </div>
      )}

      {chosen.map((id) => {
        const m = MEASURE_BY_ID[id];
        const flagged = r.effortFlags.includes(id);
        return (
          <div key={id} id={IDS.measure(id)} className="space-y-3 rounded-lg border border-line bg-paper p-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-semibold text-ink">
                {m.no} · {m.name}
              </p>
              <p className="text-caption text-ash">
                {euro(m.cost)} · {m.weeks} {tt("weeks", "Wochen")} · {MEASURE_AREA[m.area]}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {(
                [
                  ["impact", tt("Learning impact", "Lernwirkung"), tt("How much it helps learners understand without losing needed content.", "Wie sehr sie Lernenden beim Verstehen hilft, ohne nötigen Inhalt zu verlieren.")],
                  ["effort", tt("Effort", "Aufwand"), tt("By the printed cost, with the rule in Materi A5.", "Nach den gedruckten Kosten, mit der Regel in Materi A5.")],
                  ["risk", tt("Risk", "Risiko"), tt("What could be lost or go wrong.", "Was verloren gehen oder schiefgehen kann.")],
                ] as const
              ).map(([key, label, help]) => (
                <div key={key} className="space-y-1">
                  <p className="text-caption font-semibold text-ink">{label}</p>
                  <p className="text-micro normal-case tracking-normal text-ash">{help}</p>
                  <ScorePick value={r[key][id] ?? 0} onChange={(v) => set(key, id, v)} label={`${m.no}: ${label}`} flagged={key === "effort" && flagged} />
                  {r[key][id] ? <p className="text-micro text-ash">{L[r[key][id]]}</p> : null}
                </div>
              ))}
            </div>
            {flagged && r.effortClue && <Reading label={tt("Clue", "Hinweis")}>{tt(`Which price band is ${euro(m.cost)} in? The rule is in Materi A5: under €8,000, up to €15,000, above.`, `In welches Preisband fallen ${euro(m.cost)}? Die Regel steht in Materi A5: unter 8.000 €, bis 15.000 €, darüber.`)}</Reading>}
            <TextBox
              id={IDS.reason(id)}
              label={tt("Why these ratings?", "Warum diese Bewertungen?")}
              help={tt(`One or two sentences: which printed fact it answers, and what could go wrong. At least ${MIN_REASON} characters.`, `Ein bis zwei Sätze: welchen gedruckten Fakt sie beantwortet und was schiefgehen kann. Mindestens ${MIN_REASON} Zeichen.`)}
              value={r.reasons[id] ?? ""}
              onChange={(v) => patch((s) => ({ reasons: { ...s.reasons, [id]: v } }))}
              min={MIN_REASON}
              rows={2}
            />
            <ExampleAnswer id={`reason-example-${id}`} guide={reasonGuide(id)} />
            {mentor && <MentorGuide guide={reasonGuide(id)} />}
          </div>
        );
      })}

      {chosen.length > 0 && (
        <div className="space-y-2">
          <CheckBar onCheck={check} checkLabel={tt("Check my effort ratings", "Meine Aufwandsbewertungen prüfen")} clueShown={r.effortClue} onClue={r.effortFlags.length ? () => patch({ effortClue: true }) : undefined} checks={r.checks} />
          {r.effortResult && (
            <Reading>
              {r.effortResult.rated === 0
                ? tt("No effort rating yet.", "Noch keine Aufwandsbewertung.")
                : tt(`${r.effortResult.holds} of ${r.effortResult.rated} effort ratings follow the printed cost. A flagged one is outlined. Learning impact and risk are your judgement and are never marked.`, `${r.effortResult.holds} von ${r.effortResult.rated} Aufwandsbewertungen folgen den gedruckten Kosten. Eine markierte ist umrandet. Lernwirkung und Risiko sind Ihr Urteil und werden nie markiert.`)}
            </Reading>
          )}
        </div>
      )}

      {chosen.length === PICK_MEASURES && (
        <Field id={IDS.order} label={tt("Step 4 · Put your four measures in priority order", "Schritt 4 · Bringen Sie Ihre vier Maßnahmen in eine Prioritätsreihenfolge")} help={tt("The first is the most important. Move one up or down with the arrows.", "Die erste ist die wichtigste. Verschieben Sie eine mit den Pfeilen nach oben oder unten.")}>
          <OrderList<MeasureId> order={r.order} name={(id) => `${MEASURE_BY_ID[id].no} · ${MEASURE_BY_ID[id].name}`} onMove={(id, dir) => patch((s) => ({ order: swap(s.order, id, dir) }))} />
        </Field>
      )}
      <TextBox
        id={IDS.orderWhy}
        label={tt("Justify your decision: why does your first priority go first?", "Begründen Sie Ihre Entscheidung: Warum kommt Ihre erste Priorität zuerst?")}
        help={tt(`A reason for position one: the learner's problem it answers, the cost, or what the others depend on. Learning capacity matters more than the amount of information. At least ${MIN_LINE} characters.`, `Ein Grund für Platz eins: das Problem der Lernenden, das sie beantwortet, die Kosten oder wovon die anderen abhängen. Die Lernkapazität zählt mehr als die Menge der Information. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.orderWhy}
        onChange={(v) => patch({ orderWhy: v })}
        min={MIN_LINE}
        rows={3}
      />
      <ExampleAnswer id="order-example" guide={orderGuide()} />
      {mentor && <MentorGuide guide={orderGuide()} />}
      <TextBox
        id={IDS.missingInfo}
        label={tt("What information are you missing?", "Welche Information fehlt Ihnen?")}
        help={tt(`Name something specific you do not know that would change your decision, and how you could find it out. At least ${MIN_LINE} characters.`, `Nennen Sie etwas Konkretes, das Sie nicht wissen und das Ihre Entscheidung ändern würde, und wie Sie es herausfinden könnten. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.missingInfo}
        onChange={(v) => patch({ missingInfo: v })}
        min={MIN_LINE}
        rows={3}
      />
      <ExampleAnswer id="missing-example" guide={missingGuide()} />
      {mentor && <MentorGuide guide={missingGuide()} />}
      <AnswerKey block={measureKey()} />
      <BlockMissing block="2.2" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ the task */

export function Task1() {
  const p = usePersisted();
  const missing = r1Missing(p);
  const filename = exportName(p.participant.name, 3, 1);
  return (
    <section id="task-1" aria-labelledby="task1-h" className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt("Task 1 · two core blocks, one per level; optional blocks folded", "Task 1 · zwei Kernblöcke, einer pro Level; optionale Blöcke eingeklappt")}</p>
        <h2 id="task1-h">{tt("UX Analysis File: recognise the overload, choose the measures", "UX Analysis File: die Überlastung erkennen, die Maßnahmen wählen")}</h2>
      </header>
      <CaseBrief />
      <PartHeading id="part-1" n={1} title={tt("Recognise the overload", "Die Überlastung erkennen")} level={tt("Level 1 · Knowledge", "Level 1 · Wissen")} />
      <Block11 missing={missing} />
      <OptionalSection
        id="block-1-2"
        title={tt("Block 1.2 · Reduce the load of a module: three options", "Block 1.2 · Die Belastung eines Moduls senken: drei Optionen")}
        minutes={BLOCK_MINUTES["1.2"]}
        reason={tt("Practises the three ratings at small scale; Block 2.2 is answered without it.", "Übt die drei Bewertungen im Kleinen; Block 2.2 wird auch ohne ihn beantwortet.")}
      >
        <Block12 missing={missing} />
      </OptionalSection>
      <OptionalSection
        id="block-1-3"
        title={tt("Block 1.3 · Coaching reflection: UX steers attention and thinking", "Block 1.3 · Coaching-Reflexion: UX steuert Aufmerksamkeit und Denken")}
        minutes={BLOCK_MINUTES["1.3"]}
        reason={tt("A reflective bridge between the two levels; your notes appear in the file, and no Core block needs them.", "Eine reflektierende Brücke zwischen den beiden Levels; Ihre Notizen erscheinen in der Datei, und kein Kernblock braucht sie.")}
      >
        <Block13 missing={missing} />
      </OptionalSection>
      <PartHeading id="part-2" n={2} title={tt("Choose measures within the limits", "Maßnahmen innerhalb der Grenzen wählen")} level={tt("Level 2 · Application", "Level 2 · Anwendung")} />
      <OptionalSection
        id="block-2-1"
        title={tt("Block 2.1 · Four causes of cognitive overload", "Block 2.1 · Vier Ursachen kognitiver Überlastung")}
        minutes={BLOCK_MINUTES["2.1"]}
        reason={tt("Practises pointing at a printed fact for a cause; Block 2.2 reads the facts, not this block.", "Übt, für eine Ursache auf einen gedruckten Fakt zu zeigen; Block 2.2 liest die Fakten, nicht diesen Block.")}
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
        <Link href={routeHref(3, 2)} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          {tt("Route 2 · Level 3 →", "Route 2 · Level 3 →")}
        </Link>{" "}
        {tt("It is only a suggestion; nothing is locked.", "Das ist nur eine Empfehlung; nichts ist gesperrt.")}
      </p>
    </section>
  );
}
