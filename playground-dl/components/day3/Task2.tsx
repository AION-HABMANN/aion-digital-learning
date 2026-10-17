"use client";

import { useEffect, useState } from "react";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { ExportBar } from "@/components/ui/ExportBar";
import { TextBox } from "@/components/ui/Inputs";
import { Callout } from "@/components/ui/MaterialCard";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { OPTS } from "@/data/day3/case";
import { routeHref } from "@/data/course";
import { DOC_CSS } from "@/lib/exportDoc";
import { memoBody } from "@/lib/day3/exportDoc";
import { definitionGuide, logicGuide, measuresGuide, riskTextGuide, strategyGuide, uncertainGuide } from "@/lib/day3/guides";
import { IDS, r2Missing } from "@/lib/day3/missing";
import { BLOCK_MINUTES, CORE2_MINUTES, MEASURES_N, MIN_FRAME, MIN_LINE, listLines } from "@/lib/day3/progress";
import type { MissingEntry } from "@/lib/missing";
import { useJumpTo } from "@/lib/useJumpTo";
import { tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { showCardPart } from "@/store/useCardMore";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated, useStore } from "@/store/useStore";

/**
 * Day 3 · Route 2 · the UX Strategy Memo (Level 3, CLAUDE.md #57): the plan's transfer project as six free answers in one Core block: a strategy
 * for reducing cognitive load, three prioritised UX measures, a definition of learning-effective UX, a risk analysis (content that is too simple
 * against content that is too complex), a decision logic for future content, and one decision made under uncertainty. The plan prints no budget
 * figure ("limited"), so the site prints none.
 */

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
          "You are the Chief Learning Experience Officer of EduCore. The platform is rated “too complicated”. The content is professionally necessary but hard to understand, and the budget is limited. Management wants a learning-psychology-based UX strategy and expects you to take responsibility for learning success.",
          "Sie sind Chief Learning Experience Officer von EduCore. Die Plattform wird als „zu kompliziert“ bewertet. Der Inhalt ist fachlich nötig, aber schwer verständlich, und das Budget ist begrenzt. Die Geschäftsführung will eine lernpsychologisch fundierte UX-Strategie und erwartet, dass Sie die Verantwortung für den Lernerfolg übernehmen.",
        )}
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The framework", "Die Rahmenbedingungen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt("The learning platform is rated “too complicated”", "Die Lernplattform wird als „zu kompliziert“ bewertet")}</li>
            <li>{tt("The content is professionally necessary, but hard to understand", "Der Inhalt ist fachlich nötig, aber schwer verständlich")}</li>
            <li>{tt("The budget is limited", "Das Budget ist begrenzt")}</li>
            <li>{tt("You decide without user data", "Sie entscheiden ohne Nutzerdaten")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · one block, about ${CORE2_MINUTES} min`, `So läuft die Aufgabe · ein Block, ca. ${CORE2_MINUTES} Min.`)}</p>
          <p className="mt-1 text-ink">{tt("Block 3.1 asks six questions: your strategy for reducing cognitive load, three prioritised UX measures, your definition of learning-effective UX, a risk analysis, a decision logic for future content, and one decision you make on purpose under uncertainty.", "Block 3.1 stellt sechs Fragen: Ihre Strategie zur Senkung der kognitiven Belastung, drei priorisierte UX-Maßnahmen, Ihre Definition von lerneffektivem UX, eine Risikoanalyse, eine Entscheidungslogik für künftige Inhalte und eine Entscheidung, die Sie bewusst unter Unsicherheit treffen.")}</p>
        </div>
      </div>
      <p className="text-caption text-ash">
        {r1.optChoice ? (
          <>
            {tt("Your Route 1 answer, as a soft pointer: you judged this option to have the greatest effect on learning: ", "Ihre Antwort aus Route 1, als weicher Hinweis: Sie hielten diese Option für die mit der größten Wirkung aufs Lernen: ")}
            <strong className="text-ink">{OPTS.find((o) => o.id === r1.optChoice)?.name}</strong>.{" "}
            <button type="button" onClick={() => jump("block-1-2", routeHref(3, 1))} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
              {tt("Open it in Route 1", "In Route 1 öffnen")}
            </button>
          </>
        ) : (
          tt("Route 1 is not needed for this route. If you have done it, your answers are quoted in the memo.", "Route 1 ist für diese Route nicht nötig. Wenn Sie sie gemacht haben, werden Ihre Antworten im Memo zitiert.")
        )}
      </p>
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("The brief says: a platform rated too complicated, content professionally necessary but hard to understand, a limited budget, and a decision without user data. It prints no figure, so none is used here.", "Der Auftrag sagt: eine als zu kompliziert bewertete Plattform, fachlich nötiger, aber schwer verständlicher Inhalt, ein begrenztes Budget und eine Entscheidung ohne Nutzerdaten. Er nennt keine Zahl, daher wird hier keine verwendet.")}</p>
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
  const b = (id: string) => () => showCardPart(id as "B1", "rules");
  const nM = listLines(r.measures).length;
  return (
    <AnswerBlock
      id="block-3-1"
      title={tt("Block 3.1 · Develop a learning-psychology-based UX strategy", "Block 3.1 · Eine lernpsychologisch fundierte UX-Strategie entwickeln")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["3.1"]}
      findIt={tt("Route 2 → Task 2 → the situation above, then the six questions below.", "Route 2 → Task 2 → die Lage oben, dann die sechs Fragen darunter.")}
    >
      <MaterialRefs refs={["B1", "B2", "B3"]} />

      <p className="smallcaps text-ash">{tt("Question 1 of 6", "Frage 1 von 6")}</p>
      <TextBox
        id={IDS.strategy}
        label={tt("A strategy for reducing cognitive load", "Eine Strategie zur Senkung der kognitiven Belastung")}
        help={tt(`One to three sentences: what you will reduce first, and what you will protect. At least ${MIN_LINE} characters.`, `Ein bis drei Sätze: was Sie zuerst senken und was Sie schützen. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.strategy}
        onChange={(v) => patch({ strategy: v })}
        min={MIN_LINE}
        rows={3}
      >
        <WritingHelp
          id="strategy-kit"
          refs={[{ label: tt("Cut extraneous load first, protect the subject (Materi B2)", "Zuerst die extrinsische Belastung kürzen, das Thema schützen (Materi B2)"), value: tt("reduce · protect", "senken · schützen"), target: "mat-B2", before: b("B2") }]}
          steps={[
            tt("Say what you reduce first (clutter, a wall of text) and for whom.", "Sagen Sie, was Sie zuerst senken (Unübersichtlichkeit, eine Textwand) und für wen."),
            tt("Say what you protect (the professional depth of the content).", "Sagen Sie, was Sie schützen (die fachliche Tiefe des Inhalts)."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="strategy-example" guide={strategyGuide()} />
      {mentor && <MentorGuide guide={strategyGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 2 of 6", "Frage 2 von 6")}</p>
      <TextBox
        id={IDS.measures}
        label={tt(`${MEASURES_N} prioritised UX measures`, `${MEASURES_N} priorisierte UX-Maßnahmen`)}
        help={tt(`Write them as a list, one measure per line, the first priority first. You have ${nM} of ${MEASURES_N}.`, `Schreiben Sie sie als Liste, eine Maßnahme pro Zeile, die erste Priorität zuerst. Sie haben ${nM} von ${MEASURES_N}.`)}
        value={r.measures}
        onChange={(v) => patch({ measures: v })}
        rows={5}
        placeholder={tt("1. …\n2. …\n3. …", "1. …\n2. …\n3. …")}
      >
        <WritingHelp
          id="measures-kit"
          refs={[{ label: tt("Learning effectiveness and cognitive efficiency (Materi B1)", "Lerneffektivität und kognitive Effizienz (Materi B1)"), value: tt("the two yardsticks", "die beiden Maßstäbe"), target: "mat-B1", before: b("B1") }]}
          steps={[
            tt("Choose measures that act on the load, not on the look, and that you could start on now.", "Wählen Sie Maßnahmen, die auf die Belastung wirken, nicht auf das Aussehen, und mit denen Sie jetzt beginnen könnten."),
            tt("Put first the one that helps learning most for the effort, and say in a few words why.", "Setzen Sie die an die erste Stelle, die fürs Lernen im Verhältnis zum Aufwand am meisten bringt, und sagen Sie in wenigen Worten warum."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="measures-example" guide={measuresGuide()} />
      {mentor && <MentorGuide guide={measuresGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 3 of 6", "Frage 3 von 6")}</p>
      <TextBox
        id={IDS.definition}
        label={tt("A definition of “learning-effective UX”", "Eine Definition von „lerneffektivem UX“")}
        help={tt(`Name the learner, the goal, the cost to be kept low, and how you will know. At least ${MIN_LINE} characters.`, `Nennen Sie die Lernende, das Ziel, die Kosten, die niedrig gehalten werden sollen, und woran Sie es erkennen. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.definition}
        onChange={(v) => patch({ definition: v })}
        min={MIN_LINE}
        rows={3}
      >
        <WritingHelp
          id="definition-kit"
          refs={[{ label: tt("The four parts of a definition (Materi B1)", "Die vier Teile einer Definition (Materi B1)"), value: tt("learner · goal · cost · proof", "Lernende · Ziel · Kosten · Beleg"), target: "mat-B1", before: b("B1") }]}
          steps={[
            tt("Start with “A learning-effective UX is one in which …” and name the learner and the goal.", "Beginnen Sie mit „Ein lerneffektives UX ist eines, in dem …“ und nennen Sie die Lernende und das Ziel."),
            tt("Add the cost kept low (effort that does not help learning) and the proof (what they can explain or do afterwards).", "Ergänzen Sie die niedrig gehaltenen Kosten (Anstrengung, die nicht beim Lernen hilft) und den Beleg (was sie danach erklären oder tun können)."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="definition-example" guide={definitionGuide()} />
      {mentor && <MentorGuide guide={definitionGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 4 of 6", "Frage 4 von 6")}</p>
      <TextBox
        id={IDS.riskText}
        label={tt("Risk analysis: content that is too simple against content that is too complex", "Risikoanalyse: zu einfacher gegen zu komplexen Inhalt")}
        help={tt(`Name the risk on each side and say what you do about the bigger one. At least ${MIN_LINE} characters.`, `Nennen Sie das Risiko auf jeder Seite und sagen Sie, was Sie gegen das größere tun. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.riskText}
        onChange={(v) => patch({ riskText: v })}
        min={MIN_LINE}
        rows={4}
      >
        <WritingHelp
          id="risktext-kit"
          refs={[{ label: tt("Efficiency against deep learning (Materi B2)", "Effizienz gegen tiefes Lernen (Materi B2)"), value: tt("conflicting goals", "Zielkonflikte"), target: "mat-B2", before: b("B2") }]}
          steps={[
            tt("Write what goes wrong if the content becomes too simple, and what goes wrong if it stays too complex.", "Schreiben Sie, was schiefgeht, wenn der Inhalt zu einfach wird, und was, wenn er zu komplex bleibt."),
            tt("Pick the bigger risk and say what your plan does about it and what you would notice.", "Wählen Sie das größere Risiko und sagen Sie, was Ihr Plan dagegen tut und was Sie bemerken würden."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="risktext-example" guide={riskTextGuide()} />
      {mentor && <MentorGuide guide={riskTextGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 5 of 6", "Frage 5 von 6")}</p>
      <TextBox
        id={IDS.logic}
        label={tt("A decision logic for future content", "Eine Entscheidungslogik für künftige Inhalte")}
        help={tt(`A rule you can apply to every new lesson, and who decides. At least ${MIN_LINE} characters.`, `Eine Regel, die Sie auf jede neue Lektion anwenden können, und wer entscheidet. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.logic}
        onChange={(v) => patch({ logic: v })}
        min={MIN_LINE}
        rows={4}
      >
        <WritingHelp
          id="logic-kit"
          refs={[{ label: tt("A rule for content (Materi B3)", "Eine Regel für Inhalte (Materi B3)"), value: tt("checks · who decides", "Prüfungen · wer entscheidet"), target: "mat-B3", before: b("B3") }]}
          steps={[
            tt("List the questions every new lesson must pass before it goes live.", "Listen Sie die Fragen auf, die jede neue Lektion vor der Freigabe bestehen muss."),
            tt("Say who decides, and what happens to a lesson that fails.", "Sagen Sie, wer entscheidet und was mit einer Lektion geschieht, die durchfällt."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="logic-example" guide={logicGuide()} />
      {mentor && <MentorGuide guide={logicGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 6 of 6", "Frage 6 von 6")}</p>
      <TextBox
        id={IDS.uncertain}
        label={tt("Make one decision under uncertainty, on purpose", "Treffen Sie bewusst eine Entscheidung unter Unsicherheit")}
        help={tt(`Say what you decide, what you do not know, and when you would reverse it. At least ${MIN_FRAME} characters.`, `Sagen Sie, was Sie entscheiden, was Sie nicht wissen und wann Sie die Entscheidung zurücknähmen. Mindestens ${MIN_FRAME} Zeichen.`)}
        value={r.uncertain}
        onChange={(v) => patch({ uncertain: v })}
        min={MIN_FRAME}
        rows={4}
      >
        <WritingHelp
          id="uncertain-kit"
          refs={[{ label: tt("Deciding without user data (Materi B3)", "Entscheiden ohne Nutzerdaten (Materi B3)"), value: tt("assume · test · reverse", "annehmen · testen · zurücknehmen"), target: "mat-B3", before: b("B3") }]}
          steps={[
            tt("Write the decision in one sentence: what you will do now.", "Schreiben Sie die Entscheidung in einem Satz: was Sie jetzt tun."),
            tt("Name what you do not know, and the sign and the time at which you would reverse it.", "Nennen Sie, was Sie nicht wissen, und das Zeichen und den Zeitpunkt, zu dem Sie sie zurücknähmen."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="uncertain-example" guide={uncertainGuide()} />
      {mentor && <MentorGuide guide={uncertainGuide()} />}
      <BlockMissing block="3.1" missing={missing} />
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
        <p className="smallcaps text-accent">{tt("Task 2 · one block", "Task 2 · ein Block")}</p>
        <h2>{tt("UX Strategy Memo: decide as Chief Learning Experience Officer", "UX Strategy Memo: als Chief Learning Experience Officer entscheiden")}</h2>
      </header>
      <CaseBrief />
      <Block31 missing={missing} />
      <MemoPanel />
      <ExportBar id="export-l3" previewTitle="" showPreview={false} exportLabel={tt("Export the UX Strategy Memo", "UX Strategy Memo exportieren")} docTitle="UX Strategy Memo" filename={filename} missing={missing} buildBody={() => memoBody(p)} />
    </div>
  );
}
