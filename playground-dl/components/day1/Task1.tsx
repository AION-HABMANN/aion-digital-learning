"use client";

import Link from "next/link";
import { useState } from "react";
import { LearnFastScreens } from "@/components/day1/LearnFast";
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
import { AREAS, AREA_IDS, BUDGET, CAUSES, CAUSE_PICK, CLAIMS, CLAIM_BINS, DROPOUT, FINDINGS, FINDING_BY_ID, MEASURES, MEASURE_AREA, MEASURE_BY_ID, MONTHS, PICK_MEASURES, REFLECT, WEEKS_LIMIT, longestWeeks, totalCost } from "@/data/day1/case";
import type { AreaId, CauseId, ClaimBin, ClaimId, FindingId, MeasureId } from "@/data/day1/case";
import { analysisBody } from "@/lib/day1/exportDoc";
import { causeHolds, claimHolds, effortWrong, sortHolds } from "@/lib/day1/checks";
import { causeGuide, missingGuide, needGuide, orderGuide, reasonGuide, reflectGuide, worstGuide } from "@/lib/day1/guides";
import { causeKey, claimKey, measureKey, sortKey } from "@/lib/day1/answerKey";
import { IDS, r1Missing } from "@/lib/day1/missing";
import { BLOCK_MINUTES, CORE1_MINUTES, MIN_LINE, MIN_REASON, TASK1_MINUTES } from "@/lib/day1/progress";
import type { MissingEntry } from "@/lib/missing";
import { routeHref } from "@/data/course";
import { Gloss } from "@/lib/glossify";
import { euro, tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { showCardPart } from "@/store/useCardMore";
import { usePersisted } from "@/store/usePersisted";
import { useStore } from "@/store/useStore";
import type { Score } from "@/store/useStore";

/** Day 1 · Route 1 · the UX Analysis File. Core: Block 1.1 (Level 1) and Block 2.2 (Level 2). Optional: 1.2, 1.3, 2.1 (CLAUDE.md #35, #40). */

const LEVELS = () => ["", tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")];

/* ------------------------------------------------------------------ the case */

function CaseBrief() {
  return (
    <section id="case-brief" aria-labelledby="case-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case-h">{tt("The case: SkillUp GmbH and its platform LearnFast", "Der Fall: SkillUp GmbH und ihre Plattform LearnFast")}</h2>
        <span className="smallcaps">{tt("Read once · about 3 min", "Einmal lesen · ca. 3 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt(
            `SkillUp GmbH is an EdTech company. It runs the learning platform LearnFast, where professionals take online courses. ${DROPOUT} of every 100 learners who start a course do not finish it. Learners say the content is hard to understand, and there is no clear learning path. The dashboard is cluttered, the lessons are long texts without structure, and there is no progress bar. Management asks the UX lead which measures to fund.`,
            `Die SkillUp GmbH ist ein EdTech-Unternehmen. Sie betreibt die Lernplattform LearnFast, auf der Fachkräfte Online-Kurse belegen. ${DROPOUT} von je 100 Lernenden, die einen Kurs beginnen, schließen ihn nicht ab. Lernende sagen, der Inhalt sei schwer verständlich, und es gibt keinen klaren Lernpfad. Das Dashboard ist unübersichtlich, die Lektionen sind lange Texte ohne Struktur, und es gibt keine Fortschrittsleiste. Die Geschäftsführung fragt den UX Lead, welche Maßnahmen sie finanzieren soll.`,
          )}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("What you have", "Was Sie haben")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt("Eight findings on the LearnFast screens (Block 1.1).", "Acht Befunde auf den LearnFast-Bildschirmen (Block 1.1).")}</li>
            <li>{tt(`The ${DROPOUT}% drop-out figure (optional Block 1.2) and six possible causes (optional Block 2.1).`, `Die Abbruchquote von ${DROPOUT} % (optionaler Block 1.2) und sechs mögliche Ursachen (optionaler Block 2.1).`)}</li>
            <li>{tt("Nine measures SkillUp could fund, each with a cost and weeks (Block 2.2).", "Neun Maßnahmen, die SkillUp finanzieren könnte, jeweils mit Kosten und Wochen (Block 2.2).")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Budget: ", "Budget: ")}
              <strong>{euro(BUDGET)}</strong>
            </li>
            <li>
              {tt("Time: ", "Zeit: ")}
              <strong>{tt(`${MONTHS} months (${WEEKS_LIMIT} weeks)`, `${MONTHS} Monate (${WEEKS_LIMIT} Wochen)`)}</strong>
            </li>
            <li>{tt("Measures can run in parallel (Case assumption).", "Maßnahmen können parallel laufen (Fallannahme).")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · two core blocks, about ${CORE1_MINUTES} min`, `So läuft die Aufgabe · zwei Kernblöcke, ca. ${CORE1_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 1.1: sort eight findings into Orientation, Understanding and Motivation, and say which would make a learner give up first (Level 1, A1 and A3).", "Block 1.1: acht Befunde in Orientierung, Verständnis und Motivation sortieren und sagen, welcher Lernende zuerst aufgeben ließe (Level 1, A1 und A3).")}</li>
            <li>{tt("Block 2.2: choose four of nine measures, rate them, order them and name what is missing (Level 2, A5).", "Block 2.2: vier von neun Maßnahmen wählen, bewerten, ordnen und nennen, was fehlt (Level 2, A5).")}</li>
          </ol>
          <p className="mt-1 text-ash">{tt(`Three more blocks (about ${TASK1_MINUTES - CORE1_MINUTES} min) are optional and folded.`, `Drei weitere Blöcke (ca. ${TASK1_MINUTES - CORE1_MINUTES} Min.) sind optional und eingeklappt.`)}</p>
        </div>
      </div>
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>
          {tt(
            "The brief says: a cluttered dashboard, long texts without structure, no progress bar, many drop-outs, a 40% drop-out rate, content hard to understand, no clear learning path, €50,000 and two months. Everything else is made up for this exercise: the 14 tiles, the 500 words, the four clicks, the quiz, the costs and the weeks.",
            "Der Auftrag sagt: ein unübersichtliches Dashboard, lange Texte ohne Struktur, keine Fortschrittsleiste, viele Abbrüche, eine Abbruchquote von 40 %, schwer verständlicher Inhalt, kein klarer Lernpfad, 50.000 € und zwei Monate. Alles andere ist für diese Übung erfunden: die 14 Kacheln, die 500 Wörter, die vier Klicks, das Quiz, die Kosten und die Wochen.",
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

/* ------------------------------------------------------------------ Block 1.1 (Core, Level 1) */

export function Block11({ missing }: { missing: MissingEntry[] }) {
  const r = useStore((s) => s.d1.r1);
  const place = useStore((s) => s.placeFinding);
  const undo = useStore((s) => s.undoSort);
  const redo = useStore((s) => s.redoSort);
  const patch = useStore((s) => s.patchD1R1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const worstName = r.worst ? FINDING_BY_ID[r.worst].short : "—";
  return (
    <AnswerBlock
      id="block-1-1"
      title={tt("Block 1.1 · Eight findings: Orientation, Understanding or Motivation?", "Block 1.1 · Acht Befunde: Orientierung, Verständnis oder Motivation?")}
      kind="OBJECTIVE + JUDGED"
      core
      minutes={BLOCK_MINUTES["1.1"]}
      findIt={tt("Route 1 → Task 1 → the drawn LearnFast screens directly below, then the sort board with the eight findings. Answer on the board, then in the fields under it.", "Route 1 → Task 1 → die gezeichneten LearnFast-Bildschirme direkt darunter, dann die Sortiertafel mit den acht Befunden. Antworten Sie auf der Tafel, dann in den Feldern darunter.")}
    >
      <MaterialRefs refs={["A1", "A3"]} />
      <LearnFastScreens />
      <PlacementBoard<AreaId>
        items={FINDINGS.map((f) => ({ id: f.id, meta: f.where, text: f.text }))}
        bins={AREA_IDS.map((id) => ({ id, label: AREAS[id].label, hint: AREAS[id].hint }))}
        value={r.sort}
        onPlace={(id, area) => place(id as FindingId, area)}
        onUndo={undo}
        onRedo={redo}
        undoCount={r.sortHistory.length}
        redoCount={r.sortFuture.length}
        domId={IDS.finding}
        keyPhrases={Object.fromEntries(FINDINGS.map((f) => [f.id, f.key]))}
        clues={Object.fromEntries(FINDINGS.map((f) => [f.id, f.clue]))}
        reasons={Object.fromEntries(FINDINGS.map((f) => [f.id, f.why]))}
        result={r.sortResult}
        checks={r.sortChecks}
        onCheck={() => patch((s) => ({ sortChecks: s.sortChecks + 1, sortResult: sortHolds(s.sort) }))}
        onClue={() => patch({ sortClue: true })}
        clueShown={r.sortClue}
        reasoningOpened={r.sortReasoning}
        onOpenReasoning={() => patch({ sortReasoning: true })}
        noun={tt("finding", "Befund")}
        intro={tt("Drag a finding onto the area it breaks, or select it and then select an area. Select a placed one to move it again. One area per finding: the question it breaks first.", "Ziehen Sie einen Befund auf den Bereich, den er verletzt, oder wählen Sie ihn und dann einen Bereich. Wählen Sie einen platzierten, um ihn zu verschieben. Ein Bereich pro Befund: die Frage, die er zuerst verletzt.")}
        tests={
          <RevealHint id="sort-tests" label={tt("Show the test questions", "Testfragen zeigen")} title={tt("Test questions · taught in Materi A3", "Testfragen · aus Materi A3")}>
            <div className="space-y-2 text-caption text-ink">
              <p>{tt("Ask these of every finding. They repeat the three questions of Materi A3; they never say which finding goes where.", "Stellen Sie diese Fragen zu jedem Befund. Sie wiederholen die drei Fragen aus Materi A3; sie sagen nie, welcher Befund wohin gehört.")}</p>
              <ul className="space-y-1.5">
                {AREA_IDS.map((a) => (
                  <li key={a}>
                    <span className="font-semibold">{AREAS[a].label}. </span>
                    <Gloss>{AREAS[a].test}</Gloss>
                  </li>
                ))}
              </ul>
              <MaterialRefs refs={["A3"]} lead={tt("Taught in", "Gelehrt in")} />
            </div>
          </RevealHint>
        }
      />
      <Field id={IDS.worst} label={tt("Which finding would make you, as a learner, give up first?", "Welcher Befund ließe Sie als Lernende zuerst aufgeben?")} help={tt("Choose one of the eight. Any of them can be right; the next field asks why.", "Wählen Sie einen der acht. Jeder kann richtig sein; das nächste Feld fragt nach dem Grund.")}>
        <OptionList<FindingId>
          options={FINDINGS.map((f) => ({ id: f.id, label: f.short, sub: f.where }))}
          value={r.worst}
          onChange={(id) => patch({ worst: id })}
          label={tt("The finding that makes a learner give up first", "Der Befund, der Lernende zuerst aufgeben lässt")}
          cols={2}
        />
      </Field>
      <TextBox
        id={IDS.worstWhy}
        label={tt("Why that one, from the learner's side?", "Warum gerade dieser, aus Sicht der Lernenden?")}
        help={tt(`Write it as the learner would feel it (“I would not know…”). Say what they cannot do or feel, not what looks wrong. At least ${MIN_LINE} characters.`, `Schreiben Sie es so, wie die Lernenden es empfänden („Ich wüsste nicht…“). Sagen Sie, was sie nicht können oder fühlen, nicht was schlecht aussieht. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.worstWhy}
        onChange={(v) => patch({ worstWhy: v })}
        min={MIN_LINE}
        rows={3}
      >
        <WritingHelp
          id="worst-kit"
          refs={[
            { label: tt("The finding you chose", "Der Befund, den Sie gewählt haben"), value: worstName, target: IDS.finding(r.worst ?? "f1") },
            { label: tt("Experience, not surface (Materi A1)", "Erlebnis, nicht Oberfläche (Materi A1)"), value: tt("what the learner cannot do or feel", "was die Lernenden nicht können oder fühlen"), target: "mat-A1", before: () => showCardPart("A1", "rules") },
          ]}
          steps={[
            tt("Start with “I would…” and name what the learner cannot do on that screen.", "Beginnen Sie mit „Ich würde…“ und nennen Sie, was die Lernenden auf diesem Bildschirm nicht können."),
            tt("Say what they then do (leave, stop, guess).", "Sagen Sie, was sie daraufhin tun (gehen, aufhören, raten)."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="worst-example" guide={worstGuide()} />
      {mentor && <MentorGuide guide={worstGuide()} />}
      <AnswerKey block={sortKey()} />
      <BlockMissing block="1.1" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.2 (Optional) */

export function Block12({ missing }: { missing: MissingEntry[] }) {
  const r = useStore((s) => s.d1.r1);
  const place = useStore((s) => s.placeClaim);
  const undo = useStore((s) => s.undoClaims);
  const redo = useStore((s) => s.redoClaims);
  const patch = useStore((s) => s.patchD1R1);
  const mentor = useStore((s) => s.mentorUnlocked);
  return (
    <AnswerBlock
      id="block-1-2"
      title={tt("Block 1.2 · What the 40% shows and does not show", "Block 1.2 · Was die 40 % zeigen und was nicht")}
      kind="OBJECTIVE + JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.2"]}
      findIt={tt("Route 1 → Task 1 → the case brief above: “40 of every 100 learners who start a course do not finish it”. Sort the five statements on the board.", "Route 1 → Task 1 → der Fall oben: „40 von je 100 Lernenden, die einen Kurs beginnen, schließen ihn nicht ab“. Sortieren Sie die fünf Aussagen auf der Tafel.")}
    >
      <MaterialRefs refs={["B1"]} lead={tt("Related", "Dazu")} />
      <PlacementBoard<ClaimBin>
        items={CLAIMS.map((c) => ({ id: c.id, text: c.text }))}
        bins={CLAIM_BINS.map((b) => ({ id: b.id, label: b.label, hint: b.hint }))}
        value={r.claims}
        onPlace={(id, bin) => place(id as ClaimId, bin)}
        onUndo={undo}
        onRedo={redo}
        undoCount={r.claimHistory.length}
        redoCount={r.claimFuture.length}
        domId={IDS.claim}
        clues={Object.fromEntries(CLAIMS.map((c) => [c.id, c.clue]))}
        reasons={Object.fromEntries(CLAIMS.map((c) => [c.id, c.why]))}
        result={r.claimResult}
        checks={r.claimChecks}
        onCheck={() => patch((s) => ({ claimChecks: s.claimChecks + 1, claimResult: claimHolds(s.claims) }))}
        onClue={() => patch({ claimClue: true })}
        clueShown={r.claimClue}
        reasoningOpened={r.claimReasoning}
        onOpenReasoning={() => patch({ claimReasoning: true })}
        noun={tt("statement", "Aussage")}
        intro={tt("Does the number alone show it, or does the statement need something the number does not hold? Drag each statement, or select it and then a box.", "Zeigt die Zahl es allein, oder braucht die Aussage etwas, das die Zahl nicht enthält? Ziehen Sie jede Aussage, oder wählen Sie sie und dann einen Kasten.")}
        binCols={2}
        tests={<></>}
      />
      <TextBox
        id={IDS.need}
        label={tt("What would you need to find out to know why learners leave?", "Was müssten Sie herausfinden, um zu wissen, warum Lernende gehen?")}
        help={tt(`Name one source of evidence about the learners themselves. At least ${MIN_LINE} characters.`, `Nennen Sie eine Quelle für Belege über die Lernenden selbst. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.need}
        onChange={(v) => patch({ need: v })}
        min={MIN_LINE}
        rows={2}
      />
      <ExampleAnswer id="need-example" guide={needGuide()} />
      {mentor && <MentorGuide guide={needGuide()} />}
      <AnswerKey block={claimKey()} />
      <BlockMissing block="1.2" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.3 (Optional, reflection) */

export function Block13({ missing }: { missing: MissingEntry[] }) {
  const r = useStore((s) => s.d1.r1);
  const patch = useStore((s) => s.patchD1R1);
  const mentor = useStore((s) => s.mentorUnlocked);
  return (
    <AnswerBlock
      id="block-1-3"
      title={tt("Block 1.3 · Coaching reflection: from Level 1 to Level 2", "Block 1.3 · Coaching-Reflexion: von Level 1 zu Level 2")}
      kind="REFLECTION"
      core={false}
      minutes={BLOCK_MINUTES["1.3"]}
      findIt={tt("Route 1 → Task 1 → the three questions below. Think back on Block 1.1 and write what comes to mind.", "Route 1 → Task 1 → die drei Fragen darunter. Denken Sie an Block 1.1 zurück und schreiben Sie, was Ihnen einfällt.")}
      analyse={false}
    >
      <p className="max-w-prose text-body text-ink">
        {tt("The coaching point of the plan: UX is not a design problem but a decision problem. Designing beautifully is not the same as designing effectively; think in the learner's flow, not in single screens. These notes are yours: they are never scored and never missing, and they appear in your file.", "Der Coaching-Punkt des Plans: UX ist kein Designproblem, sondern ein Entscheidungsproblem. Schön zu gestalten ist nicht dasselbe wie wirksam zu gestalten; denken Sie im Ablauf der Lernenden, nicht in einzelnen Bildschirmen. Diese Notizen gehören Ihnen: Sie werden nie bewertet, zählen nie als fehlend und erscheinen in Ihrer Datei.")}
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
  const r = useStore((s) => s.d1.r1);
  const toggle = useStore((s) => s.toggleCause);
  const patch = useStore((s) => s.patchD1R1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const [note, setNote] = useState("");
  const full = r.causes.length >= CAUSE_PICK;
  return (
    <AnswerBlock
      id="block-2-1"
      title={tt("Block 2.1 · Three main causes of the drop-out", "Block 2.1 · Drei Hauptursachen des Abbruchs")}
      kind="OBJECTIVE + JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["2.1"]}
      findIt={tt("Route 1 → Task 1 → the case brief above and the eight findings of Block 1.1. Choose three of the six causes below.", "Route 1 → Task 1 → der Fall oben und die acht Befunde aus Block 1.1. Wählen Sie drei der sechs Ursachen unten.")}
    >
      <MaterialRefs refs={["A3"]} />
      <Field id={IDS.causePick} label={tt(`Choose exactly ${CAUSE_PICK} causes`, `Wählen Sie genau ${CAUSE_PICK} Ursachen`)} help={tt("A cause is something you can point at in the case or in a finding. You have chosen:", "Eine Ursache ist etwas, auf das Sie im Fall oder in einem Befund zeigen können. Sie haben gewählt:") + ` ${r.causes.length} / ${CAUSE_PICK}`}>
        <OptionList<CauseId>
          options={CAUSES.map((c) => ({ id: c.id, label: c.text }))}
          value={r.causes}
          onChange={(id) => {
            setNote("");
            toggle(id);
          }}
          multi
          label={tt("Possible causes", "Mögliche Ursachen")}
          disabledIds={full ? CAUSES.map((c) => c.id) : []}
          onDisabledClick={() => setNote(tt(`You have ${CAUSE_PICK}. Deselect one first.`, `Sie haben ${CAUSE_PICK}. Wählen Sie zuerst eine ab.`))}
        />
        {note && <p role="status" className="text-caption text-ash">{note}</p>}
        <CheckBar
          onCheck={() => patch((s) => ({ checks: s.checks + 1, causeResult: causeHolds(s.causes) }))}
          checkLabel={tt("Check my causes", "Meine Ursachen prüfen")}
          clueShown={r.causeClue}
          onClue={() => patch({ causeClue: true })}
          checks={r.checks}
        />
        {r.causeResult && (
          <Reading>
            {r.causeResult.chosen === 0 ? tt("Nothing chosen yet.", "Noch nichts gewählt.") : tt(`${r.causeResult.holds} of ${r.causeResult.chosen} chosen causes hold. It never says which.`, `${r.causeResult.holds} von ${r.causeResult.chosen} gewählten Ursachen stimmen. Es sagt nie, welche.`)}
          </Reading>
        )}
        {r.causeClue && <Reading label={tt("Clue", "Hinweis")}>{tt("For each cause, find a printed line in the case or a finding that supports it. A cause with nothing printed behind it is a guess.", "Suchen Sie für jede Ursache eine gedruckte Zeile im Fall oder in einem Befund, die sie stützt. Eine Ursache ohne Gedrucktes dahinter ist eine Vermutung.")}</Reading>}
      </Field>
      <TextBox
        id={IDS.causeWhy}
        label={tt("Which printed fact supports your first cause?", "Welche gedruckte Tatsache stützt Ihre erste Ursache?")}
        help={tt(`Quote or point at a line of the case or a finding. At least ${MIN_LINE} characters.`, `Zitieren Sie eine Zeile des Falls oder eines Befunds oder zeigen Sie darauf. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.causeWhy}
        onChange={(v) => patch({ causeWhy: v })}
        min={MIN_LINE}
        rows={2}
      />
      <ExampleAnswer id="cause-example" guide={causeGuide()} />
      {mentor && <MentorGuide guide={causeGuide()} />}
      <AnswerKey block={causeKey()} />
      <BlockMissing block="2.1" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 2.2 (Core, Level 2) */

export function Block22({ missing }: { missing: MissingEntry[] }) {
  const r = useStore((s) => s.d1.r1);
  const toggle = useStore((s) => s.toggleMeasure);
  const move = useStore((s) => s.moveMeasure);
  const patch = useStore((s) => s.patchD1R1);
  const mentor = useStore((s) => s.mentorUnlocked);
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
      title={tt("Block 2.2 · Four measures, rated and ordered", "Block 2.2 · Vier Maßnahmen, bewertet und geordnet")}
      kind="OBJECTIVE + JUDGED"
      core
      minutes={BLOCK_MINUTES["2.2"]}
      findIt={tt("Route 1 → Task 1 → the nine measures in the list directly below, each with its printed cost and weeks. Answer in the list, the rating rows and the fields under it.", "Route 1 → Task 1 → die neun Maßnahmen in der Liste direkt darunter, jeweils mit gedruckten Kosten und Wochen. Antworten Sie in der Liste, den Bewertungszeilen und den Feldern darunter.")}
    >
      <MaterialRefs refs={["A5", "A2", "A3"]} />
      <div className="rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
        <p>
          <strong>{tt("The limits:", "Die Grenzen:")}</strong> {euro(BUDGET)}, {tt(`${MONTHS} months (${WEEKS_LIMIT} weeks)`, `${MONTHS} Monate (${WEEKS_LIMIT} Wochen)`)}. {tt("The findings of Block 1.1 and the case brief are your evidence. Effort follows the printed cost, by the rule in Materi A5.", "Die Befunde aus Block 1.1 und der Fall sind Ihre Belege. Der Aufwand folgt den gedruckten Kosten, nach der Regel in Materi A5.")}
        </p>
      </div>

      <Field id={IDS.measurePick} label={tt(`Choose exactly ${PICK_MEASURES} measures`, `Wählen Sie genau ${PICK_MEASURES} Maßnahmen`)} help={tt("Each shows what it does, what a learner notices, its cost and its weeks, and what it acts on. You have chosen:", "Jede zeigt, was sie tut, was die Lernenden bemerken, ihre Kosten und Wochen, und worauf sie wirkt. Sie haben gewählt:") + ` ${chosen.length} / ${PICK_MEASURES}`}>
        <OptionList<MeasureId>
          options={MEASURES.map((m) => ({ id: m.id, label: `${m.name} · ${euro(m.cost)} · ${m.weeks} ${tt("weeks", "Wochen")}`, tag: MEASURE_AREA[m.area], sub: `${m.what}\n${tt("A learner notices:", "Lernende bemerken:")} ${m.notice}` }))}
          value={chosen}
          onChange={(id) => {
            setNote("");
            toggle(id);
          }}
          multi
          cols={2}
          label={tt("Measures SkillUp could fund", "Maßnahmen, die SkillUp finanzieren könnte")}
          disabledIds={full ? MEASURES.map((m) => m.id) : []}
          onDisabledClick={() => setNote(tt(`You have ${PICK_MEASURES}. Deselect one first.`, `Sie haben ${PICK_MEASURES}. Wählen Sie zuerst eine ab.`))}
        />
        {note && <p role="status" className="text-caption text-ash">{note}</p>}
      </Field>

      {chosen.length > 0 && (
        <div className="space-y-2">
          <BudgetBar items={chosen.map((id) => ({ id, short: id.toUpperCase(), cost: MEASURE_BY_ID[id].cost }))} budget={BUDGET} title={tt("Cost of the chosen measures against the budget", "Kosten der gewählten Maßnahmen gegen das Budget")} />
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
              <p className="font-semibold text-ink">{m.name}</p>
              <p className="text-caption text-ash">{euro(m.cost)} · {m.weeks} {tt("weeks", "Wochen")} · {MEASURE_AREA[m.area]}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {(
                [
                  ["impact", tt("User impact", "Nutzerwirkung"), tt("How much it helps learners with a printed finding.", "Wie sehr sie Lernenden bei einem gedruckten Befund hilft.")],
                  ["effort", tt("Effort", "Aufwand"), tt("By the printed cost, with the rule in Materi A5.", "Nach den gedruckten Kosten, mit der Regel in Materi A5.")],
                  ["risk", tt("Risk", "Risiko"), tt("What could go wrong or backfire.", "Was schiefgehen oder nach hinten losgehen kann.")],
                ] as const
              ).map(([key, label, help]) => (
                <div key={key} className="space-y-1">
                  <p className="text-caption font-semibold text-ink">{label}</p>
                  <p className="text-micro normal-case tracking-normal text-ash">{help}</p>
                  <ScorePick value={r[key][id] ?? 0} onChange={(v) => set(key, id, v)} label={`${m.name}: ${label}`} flagged={key === "effort" && flagged} />
                  {r[key][id] ? <p className="text-micro text-ash">{L[r[key][id]]}</p> : null}
                </div>
              ))}
            </div>
            {flagged && r.effortClue && <Reading label={tt("Clue", "Hinweis")}>{tt(`Which price band is ${euro(m.cost)} in? The rule is in Materi A5: under €10,000, up to €15,000, above.`, `In welches Preisband fallen ${euro(m.cost)}? Die Regel steht in Materi A5: unter 10.000 €, bis 15.000 €, darüber.`)}</Reading>}
            <TextBox
              id={IDS.reason(id)}
              label={tt("Why these ratings?", "Warum diese Bewertungen?")}
              help={tt(`One or two sentences: which printed finding it answers, and what could go wrong. At least ${MIN_REASON} characters.`, `Ein bis zwei Sätze: welchen gedruckten Befund sie beantwortet und was schiefgehen kann. Mindestens ${MIN_REASON} Zeichen.`)}
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
                : tt(`${r.effortResult.holds} of ${r.effortResult.rated} effort ratings follow the printed cost. A flagged one is outlined. Impact and risk are your judgement and are never marked.`, `${r.effortResult.holds} von ${r.effortResult.rated} Aufwandsbewertungen folgen den gedruckten Kosten. Eine markierte ist umrandet. Nutzerwirkung und Risiko sind Ihr Urteil und werden nie markiert.`)}
            </Reading>
          )}
        </div>
      )}

      {chosen.length === PICK_MEASURES && (
        <Field id={IDS.order} label={tt("Put your four measures in priority order", "Bringen Sie Ihre vier Maßnahmen in eine Prioritätsreihenfolge")} help={tt("The first is the most important. Move one up or down with the arrows.", "Die erste ist die wichtigste. Verschieben Sie eine mit den Pfeilen nach oben oder unten.")}>
          <ol className="space-y-1.5">
            {r.order.map((id, i) => (
              <li key={id} className="flex items-center gap-2 rounded-lg border border-line bg-paper px-3 py-1.5">
                <span className="tnum w-5 font-bold text-ash">{i + 1}</span>
                <span className="min-w-0 flex-1 text-ink">{MEASURE_BY_ID[id].name}</span>
                <button type="button" aria-label={tt(`Move ${MEASURE_BY_ID[id].name} up`, `${MEASURE_BY_ID[id].name} nach oben`)} onClick={() => move(id, -1)} className="btn-ghost btn-sm" aria-disabled={i === 0}>
                  ↑
                </button>
                <button type="button" aria-label={tt(`Move ${MEASURE_BY_ID[id].name} down`, `${MEASURE_BY_ID[id].name} nach unten`)} onClick={() => move(id, 1)} className="btn-ghost btn-sm" aria-disabled={i === r.order.length - 1}>
                  ↓
                </button>
              </li>
            ))}
          </ol>
        </Field>
      )}
      <TextBox
        id={IDS.orderWhy}
        label={tt("Why does your first priority go first?", "Warum kommt Ihre erste Priorität zuerst?")}
        help={tt(`A reason for position one, not for the whole set. Refer to the learner's problem, the cost or what the others depend on. At least ${MIN_LINE} characters.`, `Ein Grund für Platz eins, nicht für das ganze Set. Beziehen Sie sich auf das Problem der Lernenden, die Kosten oder darauf, wovon die anderen abhängen. Mindestens ${MIN_LINE} Zeichen.`)}
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
  const filename = exportName(p.participant.name, 1, 1);
  return (
    <section id="task-1" aria-labelledby="task1-h" className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt("Task 1 · two core blocks, one per level; optional blocks folded", "Task 1 · zwei Kernblöcke, einer pro Level; optionale Blöcke eingeklappt")}</p>
        <h2 id="task1-h">{tt("UX Analysis File: read the platform, choose the measures", "UX Analysis File: die Plattform lesen, die Maßnahmen wählen")}</h2>
      </header>
      <CaseBrief />
      <PartHeading id="part-1" n={1} title={tt("Read the platform from the learner's side", "Die Plattform aus Sicht der Lernenden lesen")} level={tt("Level 1 · Knowledge", "Level 1 · Wissen")} />
      <Block11 missing={missing} />
      <OptionalSection
        id="block-1-2"
        title={tt("Block 1.2 · What the 40% shows and does not show", "Block 1.2 · Was die 40 % zeigen und was nicht")}
        minutes={BLOCK_MINUTES["1.2"]}
        reason={tt("Practises reading one number without turning it into a cause; Block 2.2 is answered without it.", "Übt, eine Zahl zu lesen, ohne sie zu einer Ursache zu machen; Block 2.2 wird auch ohne ihn beantwortet.")}
      >
        <Block12 missing={missing} />
      </OptionalSection>
      <OptionalSection
        id="block-1-3"
        title={tt("Block 1.3 · Coaching reflection: from Level 1 to Level 2", "Block 1.3 · Coaching-Reflexion: von Level 1 zu Level 2")}
        minutes={BLOCK_MINUTES["1.3"]}
        reason={tt("A reflective bridge between the two levels; your notes appear in the file, and no Core block needs them.", "Eine reflektierende Brücke zwischen den beiden Levels; Ihre Notizen erscheinen in der Datei, und kein Kernblock braucht sie.")}
      >
        <Block13 missing={missing} />
      </OptionalSection>
      <PartHeading id="part-2" n={2} title={tt("Choose measures within the limits", "Maßnahmen innerhalb der Grenzen wählen")} level={tt("Level 2 · Application", "Level 2 · Anwendung")} />
      <OptionalSection
        id="block-2-1"
        title={tt("Block 2.1 · Three main causes of the drop-out", "Block 2.1 · Drei Hauptursachen des Abbruchs")}
        minutes={BLOCK_MINUTES["2.1"]}
        reason={tt("Practises pointing at a printed fact for a cause; Block 2.2 reads the findings, not this block.", "Übt, für eine Ursache auf eine gedruckte Tatsache zu zeigen; Block 2.2 liest die Befunde, nicht diesen Block.")}
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
        <Link href={routeHref(1, 2)} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          {tt("Route 2 · Level 3 →", "Route 2 · Level 3 →")}
        </Link>{" "}
        {tt("It is only a suggestion; nothing is locked.", "Das ist nur eine Empfehlung; nichts ist gesperrt.")}
      </p>
    </section>
  );
}
