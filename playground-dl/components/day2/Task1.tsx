"use client";

import Link from "next/link";
import { useState } from "react";
import { CourseStartMock, LiveStartMock } from "@/components/day2/mocks";
import { GuidedCourseSim, HifiPrototypeSim, LongPageSim, PaperPrototypeSim } from "@/components/day2/sims";
import { SimButton } from "@/components/sim/SimFrame";
import { PlatformScreens } from "@/components/day2/Screens";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AutoTextarea } from "@/components/ui/AutoTextarea";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { ExportBar } from "@/components/ui/ExportBar";
import { Field } from "@/components/ui/Field";
import { FormOrTable } from "@/components/ui/FormOrTable";
import { OptionList, TextBox } from "@/components/ui/Inputs";
import { CaseKnown } from "@/components/ui/CaseKnown";
import { FacilitatorCard } from "@/components/ui/FacilitatorCard";
import { Callout } from "@/components/ui/MaterialCard";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { FACTS, MONTHS, OPTS, PLATFORMS, TEST_SLOTS, VERDICTS } from "@/data/day2/case";
import type { OptId, PlatformId, Verdict } from "@/data/day2/case";
import { routeHref } from "@/data/course";
import { adaptiveKey, optKey } from "@/lib/day2/answerKey";
import { analysisBody } from "@/lib/day2/exportDoc";
import { adaptiveGuide, approachGuide, assessGuide, diffsGuide, noTestGuide, optWhyGuide, preferGuide, principleGuide, testsGuide, weakGuide } from "@/lib/day2/guides";
import { IDS, r1Missing } from "@/lib/day2/missing";
import { BLOCK_MINUTES, CORE1_MINUTES, DIFFS_N, MIN_ASSESS, MIN_LINE, diffCount } from "@/lib/day2/progress";
import { scrollToAndFlash } from "@/lib/flash";
import type { MissingEntry } from "@/lib/missing";
import { tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { usePersisted } from "@/store/usePersisted";
import { useStore } from "@/store/useStore";

/**
 * Day 2 · Route 1 · the UX Analysis File (CLAUDE.md #57): the plan's own questions as free answers, every block Core.
 * Block 1.1 (UE2): prefer a platform, five differences, three principles. Block 1.2 (UE3): assess three options, decide, the risks without
 * testing. A hidden facilitator card for the UE4 coaching, which has no written answer. Block 2.1 (UE5-6): the case study in four questions.
 */

/* ------------------------------------------------------------------ the case */

function CaseBrief() {
  return (
    <section id="case-brief" aria-labelledby="case-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case-h">{tt("The case: LearnPro, a stagnating learning platform", "Der Fall: LearnPro, eine stagnierende Lernplattform")}</h2>
        <span className="smallcaps">{tt("Read once · about 2 min", "Einmal lesen · ca. 2 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        {tt(
          `LearnPro is a learning platform that has stopped growing. Learners drop out of courses early, there is no personalisation, and the content is rated as “boring”. You are part of the product team and the goal is to improve the platform. Management gives you ${MONTHS} months and a limited budget, and the needs of the learners are not clear yet.`,
          `LearnPro ist eine Lernplattform, die nicht mehr wächst. Lernende brechen Kurse früh ab, es gibt keine Personalisierung, und der Inhalt wird als „langweilig“ bewertet. Sie gehören zum Produktteam, und das Ziel ist, die Plattform zu verbessern. Die Geschäftsführung gibt Ihnen ${MONTHS} Monate und ein begrenztes Budget, und die Bedürfnisse der Lernenden sind noch nicht klar.`,
        )}
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The conditions", "Die Rahmenbedingungen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt(`Time: ${MONTHS} months, until the next management review`, `Zeit: ${MONTHS} Monate, bis zur nächsten Management-Runde`)}</li>
            <li>{tt("Budget: limited", "Budget: begrenzt")}</li>
            <li>{tt("User needs: unclear", "Nutzerbedürfnisse: unklar")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · three blocks, about ${CORE1_MINUTES} min`, `So läuft die Aufgabe · drei Blöcke, ca. ${CORE1_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 1.1: two platforms. Which one you prefer, five differences, three principles of success.", "Block 1.1: zwei Plattformen. Welche Sie bevorzugen, fünf Unterschiede, drei Erfolgsprinzipien.")}</li>
            <li>{tt("Block 1.2: three options for prototyping and testing. Assess each, decide, name the risks without testing.", "Block 1.2: drei Optionen für Prototyping und Testen. Jede bewerten, entscheiden, die Risiken ohne Testen nennen.")}</li>
            <li>{tt("Block 2.1: the case study. Weaknesses, a prototype approach, three UX tests, and whether adaptive learning is worthwhile.", "Block 2.1: die Fallstudie. Schwächen, ein Prototyping-Ansatz, drei UX-Tests und ob adaptives Lernen lohnt.")}</li>
          </ol>
        </div>
      </div>
      <CaseKnown
        id="case-known"
        title={tt("What is known and what is open", "Was bekannt ist und was offen ist")}
        columns={[
          {
            title: tt("In the brief", "Im Auftrag"),
            items: [
              tt("Learners drop out of courses early.", "Lernende brechen Kurse früh ab."),
              tt("There is no personalisation.", "Es gibt keine Personalisierung."),
              tt("The content is rated “boring”.", "Der Inhalt wird als „langweilig“ bewertet."),
              tt(`The goal is to improve the platform; ${MONTHS} months, a limited budget.`, `Das Ziel ist, die Plattform zu verbessern; ${MONTHS} Monate, ein begrenztes Budget.`),
            ],
          },
          {
            title: tt("Clear · Case assumption", "Klar · Fallannahme"),
            items: [
              tt("LearnPro is live and has a catalogue of courses.", "LearnPro ist live und hat einen Katalog von Kursen."),
              tt("The platform records how many learners start and finish each course, and at which lesson they stop.", "Die Plattform erfasst, wie viele Lernende jeden Kurs beginnen und beenden und bei welcher Lektion sie aufhören."),
              tt("The rating “boring” comes from comments in the feedback form.", "Die Bewertung „langweilig“ stammt aus Kommentaren im Feedback-Formular."),
              tt(`The ${MONTHS} months run until the next management review.`, `Die ${MONTHS} Monate laufen bis zur nächsten Management-Runde.`),
              tt("The platform you develop in Block 1.2 is LearnPro's next version.", "Die Plattform, die Sie in Block 1.2 entwickeln, ist die nächste Version von LearnPro."),
            ],
          },
          {
            title: tt("Open · on purpose", "Offen · mit Absicht"),
            items: [
              tt("Why learners leave: nobody has asked them yet.", "Warum Lernende gehen: Bisher hat sie niemand gefragt."),
              tt("What “boring” means exactly.", "Was „langweilig“ genau bedeutet."),
              tt("What learners expect from personalisation.", "Was Lernende von Personalisierung erwarten."),
              tt("How large the budget is: it is not set.", "Wie groß das Budget ist: Es ist nicht festgelegt."),
            ],
          },
        ]}
        note={tt("As in most projects, not everything is known. Decide anyway, and say what you assume.", "Wie in den meisten Projekten ist nicht alles bekannt. Entscheiden Sie trotzdem, und sagen Sie, was Sie annehmen.")}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>
          {tt(
            "The brief says: users drop out early, no personalisation, content rated boring, three months, limited budget, unclear user needs. Everything else is made up for this exercise: the two platform drawings, the pictures of the three prototypes and the facts marked “Clear”.",
            "Der Auftrag sagt: Nutzer brechen früh ab, keine Personalisierung, Inhalt als langweilig bewertet, drei Monate, begrenztes Budget, unklare Nutzerbedürfnisse. Alles andere ist für diese Übung erfunden: die beiden Plattform-Zeichnungen, die Bilder der drei Prototypen und die als „Klar“ markierten Fakten.",
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

/** The collapsed clue kit of question 2, the same in both layouts (CLAUDE.md #55 section 1, #57). */
function DiffsHelp() {
  return (
    <WritingHelp
      id="diffs-kit"
      refs={[{ label: tt("The two platforms, side by side", "Die beiden Plattformen nebeneinander"), value: tt("pictures 1 to 8", "Bilder 1 bis 8"), target: IDS.pictures }]}
      steps={[
        tt("Look at the same part of both pictures (the top, the units, what happens at the end) and write what each one shows there.", "Sehen Sie sich in beiden Bildern denselben Teil an (oben, die Einheiten, was am Ende geschieht) und schreiben Sie, was jede dort zeigt."),
        tt("Name the thing you compare (“Navigation”, “Length”), then what A has, then what B has.", "Nennen Sie, was Sie vergleichen („Navigation“, „Länge“), dann was A hat, dann was B hat."),
        tt("Choose five differences that are not the same idea twice.", "Wählen Sie fünf Unterschiede, die nicht zweimal dieselbe Idee sind."),
      ]}
    />
  );
}

/**
 * The plan's UE2 task, in the plan's order and words (CLAUDE.md #57): which platform do you prefer and why, identify five differences,
 * derive three principles of success. All free answers; nothing has to be sorted first, and the pictures only help.
 */
export function Block11({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR1();
  const nDiffs = diffCount(r);
  return (
    <AnswerBlock
      id="block-1-1"
      title={tt("Block 1.1 · Two platforms: which one, five differences, three principles", "Block 1.1 · Zwei Plattformen: welche, fünf Unterschiede, drei Prinzipien")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["1.1"]}
      findIt={tt("Route 1 → Task 1 → the two drawn platforms directly below, then the three questions. No prior knowledge is needed.", "Route 1 → Task 1 → die beiden gezeichneten Plattformen direkt darunter, dann die drei Fragen. Vorwissen ist nicht nötig.")}
    >
      <MaterialRefs refs={["A1"]} />
      <p className="max-w-prose text-body text-ink">
        {tt(
          "You see two simplified platforms. Look at both pictures, then answer the three questions in your own words. The numbers in the pictures mark places you can point at.",
          "Sie sehen zwei vereinfachte Plattformen. Sehen Sie sich beide Bilder an und beantworten Sie dann die drei Fragen in Ihren eigenen Worten. Die Nummern in den Bildern markieren Stellen, auf die Sie zeigen können.",
        )}
      </p>
      <div id={IDS.pictures}>
        <PlatformScreens />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <SimButton
          label={tt("Open Platform A and try it", "Plattform A öffnen und ausprobieren")}
          sub={tt("Use it as a learner: follow the path, do a unit and its quiz.", "Nutzen Sie sie als Lernende: dem Pfad folgen, eine Einheit und ihr Quiz machen.")}
          url="learn-a.example/course/project-basics"
          title={tt("Simulation: Platform A", "Simulation: Plattform A")}
        >
          {() => <GuidedCourseSim />}
        </SimButton>
        <SimButton
          label={tt("Open Platform B (LearnPro today) and try it", "Plattform B (LearnPro heute) öffnen und ausprobieren")}
          sub={tt("Use it as a learner: read the course and finish it.", "Nutzen Sie sie als Lernende: den Kurs lesen und abschließen.")}
          url="learnpro.example/course/project-basics"
          title={tt("Simulation: Platform B, LearnPro today", "Simulation: Plattform B, LearnPro heute")}
          note={tt("Simulation · Case assumption: the course is made up and shortened; on LearnPro it is one page of about 40 minutes of reading · nothing here is marked right or wrong.", "Simulation · Fallannahme: der Kurs ist erfunden und gekürzt; bei LearnPro ist er eine Seite mit etwa 40 Minuten Lesestoff · hier wird nichts als richtig oder falsch markiert.")}
        >
          {() => <LongPageSim />}
        </SimButton>
      </div>
      <RevealHint id="platform-facts" label={tt("Show what is at each number", "Zeigen, was an jeder Nummer steht")} title={tt("What is at each number in the pictures", "Was an jeder Nummer in den Bildern steht")}>
        <ul className="space-y-1.5 text-caption text-ink">
          {FACTS.map((f) => (
            <li key={f.id}>
              <span className="tnum font-semibold">{f.no} · </span>
              <span className="text-ash">{f.where}: </span>
              {f.text}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-caption text-ash">{tt("These say what is there, not whether it is good or bad. That is for you to say.", "Sie sagen, was da ist, nicht ob es gut oder schlecht ist. Das sagen Sie.")}</p>
      </RevealHint>

      <p className="smallcaps text-ash">{tt("Question 1 of 3", "Frage 1 von 3")}</p>
      <Field id={IDS.prefer} label={tt("Which platform would you prefer, and why?", "Welche Plattform würden Sie bevorzugen, und warum?")} help={tt("Choose one. Either can be right; the box below asks why.", "Wählen Sie eine. Jede kann richtig sein; das Feld darunter fragt nach dem Grund.")}>
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
          refs={[{ label: tt("The two platforms, side by side", "Die beiden Plattformen nebeneinander"), value: tt("pictures 1 to 8", "Bilder 1 bis 8"), target: IDS.pictures }]}
          steps={[
            tt("Start with “I can…” or “I would…” and name what you can do or see on the platform you prefer.", "Beginnen Sie mit „Ich kann…“ oder „Ich würde…“ und nennen Sie, was Sie auf der bevorzugten Plattform tun oder sehen können."),
            tt("Say what is missing on the other one, in the same terms.", "Sagen Sie, was auf der anderen fehlt, in denselben Begriffen."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="prefer-example" guide={preferGuide()} />
      {mentor && <MentorGuide guide={preferGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 2 of 3", "Frage 2 von 3")}</p>
      {r.diffMode === "text" ? (
        <TextBox
          id={IDS.diffs}
          label={tt(`Identify ${DIFFS_N} differences between the two platforms`, `Erkennen Sie ${DIFFS_N} Unterschiede zwischen den beiden Plattformen`)}
          help={tt(`Write them as a list, one difference per line. Say what Platform A has and what Platform B has. You have ${nDiffs} of ${DIFFS_N}.`, `Schreiben Sie sie als Liste, einen Unterschied pro Zeile. Sagen Sie, was Plattform A hat und was Plattform B hat. Sie haben ${nDiffs} von ${DIFFS_N}.`)}
          value={r.diffs}
          onChange={(v) => patch({ diffs: v })}
          rows={7}
          placeholder={tt("1. Navigation: A shows … B has …", "1. Navigation: A zeigt … B hat …")}
        >
          <DiffsHelp />
        </TextBox>
      ) : (
        <Field
          id={IDS.diffs}
          label={tt(`Identify ${DIFFS_N} differences between the two platforms`, `Erkennen Sie ${DIFFS_N} Unterschiede zwischen den beiden Plattformen`)}
          help={tt(`One row per difference: what you compare, what Platform A has, what Platform B has. You have ${nDiffs} of ${DIFFS_N} rows complete.`, `Eine Zeile pro Unterschied: was Sie vergleichen, was Plattform A hat, was Plattform B hat. Sie haben ${nDiffs} von ${DIFFS_N} Zeilen vollständig.`)}
        >
          <div className="space-y-2">
            <div className="smallcaps hidden grid-cols-[1fr_1.5fr_1.5fr] gap-2 px-1 text-ash md:grid" aria-hidden>
              <span>{tt("What you compare", "Was Sie vergleichen")}</span>
              <span>{tt("Platform A has", "Plattform A hat")}</span>
              <span>{tt("Platform B has", "Plattform B hat")}</span>
            </div>
            {r.diffRows.map((row, i) => (
              <div key={i} id={IDS.diffRow(i)} className="grid gap-2 rounded-lg border border-line bg-canvas p-2 md:grid-cols-[1fr_1.5fr_1.5fr] md:items-start md:border-0 md:bg-transparent md:p-0">
                {(["aspect", "a", "b"] as const).map((k) => {
                  const colName = k === "aspect" ? tt("What you compare", "Was Sie vergleichen") : k === "a" ? tt("Platform A has", "Plattform A hat") : tt("Platform B has", "Plattform B hat");
                  return (
                    <label key={k} className="block">
                      <span className="smallcaps text-ash md:sr-only">{`${i + 1} · ${colName}`}</span>
                      <AutoTextarea
                        className="mt-1 md:mt-0"
                        minRows={1}
                        value={row[k]}
                        onChange={(e) => {
                          const v = e.target.value;
                          patch((st) => ({ diffRows: st.diffRows.map((x, j) => (j === i ? { ...x, [k]: v } : x)) }));
                        }}
                        placeholder={i === 0 && k === "aspect" ? tt("e.g. Navigation", "z. B. Navigation") : ""}
                        aria-label={tt(`Difference ${i + 1}: ${colName}`, `Unterschied ${i + 1}: ${colName}`)}
                      />
                    </label>
                  );
                })}
              </div>
            ))}
            <DiffsHelp />
          </div>
        </Field>
      )}
      <p className="px-1 text-caption text-ash">
        <button type="button" onClick={() => patch({ diffMode: r.diffMode === "text" ? "table" : "text" })} className="underline decoration-dotted underline-offset-2 hover:text-ink">
          {r.diffMode === "text" ? tt("Prefer a table? Fill in rows instead.", "Lieber eine Tabelle? Dann in Zeilen ausfüllen.") : tt("Back to one text box.", "Zurück zu einem Textfeld.")}
        </button>{" "}
        {tt("Your answer in the other layout is kept.", "Ihre Antwort im anderen Layout bleibt erhalten.")}
      </p>
      <ExampleAnswer id="diffs-example" guide={diffsGuide()} />
      {mentor && <MentorGuide guide={diffsGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 3 of 3", "Frage 3 von 3")}</p>
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
        >
          {i === 0 && (
            <WritingHelp
              id="principle-kit"
              refs={[{ label: tt("Your five differences (question 2)", "Ihre fünf Unterschiede (Frage 2)"), value: tt(`${nDiffs} of ${DIFFS_N} written`, `${nDiffs} von ${DIFFS_N} geschrieben`), target: IDS.diffs }]}
              steps={[
                tt("Pick one of your differences and ask what it does to a learner (stops them, helps them, tells them where they are).", "Wählen Sie einen Ihrer Unterschiede und fragen Sie, was er mit einer Lernenden macht (hält sie auf, hilft ihr, sagt ihr, wo sie steht)."),
                tt("Turn it into advice: “Do X, because Y.” X is what the better platform does; Y is what it does for the learner.", "Machen Sie daraus einen Rat: „Tun Sie X, weil Y.“ X ist, was die bessere Plattform tut; Y ist, was es für die Lernende bewirkt."),
              ]}
            />
          )}
        </TextBox>
      ))}
      <ExampleAnswer id="principle-example" guide={principleGuide()} />
      {mentor && <MentorGuide guide={principleGuide()} />}
      <BlockMissing block="1.1" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.2 (Core) */

/**
 * The three options of Block 1.2 as three real pictures of the same course-start screen (CLAUDE.md #52): what the team would have in its hands.
 * The text says what each is, never whether it is right; the learner judges (CLAUDE.md #57).
 */
function OptionCards() {
  const [look, setLook] = useState<OptId>("A");
  const info: Record<OptId, { name: string; text: string }> = {
    A: {
      name: tt("High-fidelity prototype", "High-Fidelity-Prototyp"),
      text: tt("A clickable prototype made in a design tool. It looks and feels like the finished product, with real colours, type and tap targets, but nothing works behind it.", "Ein klickbarer Prototyp aus einem Design-Werkzeug. Er sieht aus und fühlt sich an wie das fertige Produkt, mit echten Farben, Schrift und Tippflächen, aber dahinter funktioniert nichts."),
    },
    B: {
      name: tt("Low-fidelity sketch", "Low-Fidelity-Skizze"),
      text: tt("A rough sketch on paper or in grey boxes. A facilitator turns the pages while a learner tries a task, and a line can be redrawn in minutes.", "Eine grobe Skizze auf Papier oder in grauen Kästen. Eine Moderation blättert die Seiten um, während eine Lernende eine Aufgabe versucht, und eine Linie ist in Minuten neu gezeichnet."),
    },
    C: {
      name: tt("The real product, built in code", "Das echte Produkt, in Code gebaut"),
      text: tt("The real product, built in code and released to all learners. What they meet is exactly what the team built, with real data behind it.", "Das echte Produkt, in Code gebaut und für alle Lernenden freigegeben. Was sie erleben, ist genau das, was das Team gebaut hat, mit echten Daten dahinter."),
    },
  };
  const pic = (id: OptId) => (id === "A" ? <CourseStartMock level="hifi" /> : id === "B" ? <CourseStartMock level="paper" /> : <LiveStartMock />);
  return (
    <div className="space-y-3">
      <p className="text-caption text-ash">{tt("Select an option to see what you would have in your hands. It is the same course start screen each time.", "Wählen Sie eine Option, um zu sehen, was Sie in der Hand hätten. Es ist jedes Mal derselbe Kursstart-Bildschirm.")}</p>
      <div role="radiogroup" aria-label={tt("The three options", "Die drei Optionen")} className="grid gap-2 sm:grid-cols-3">
        {OPTS.map((o) => (
          <button
            key={o.id}
            id={`option-${o.id}`}
            type="button"
            role="radio"
            aria-checked={look === o.id}
            onClick={() => setLook(o.id)}
            className={`flex flex-col justify-start rounded-lg border p-2 text-left ${look === o.id ? "border-accent bg-accentSoft" : "border-line bg-paper hover:border-accent"}`}
          >
            <span className="smallcaps text-accent">{tt("Option", "Option")} {o.id}</span>
            <span className="mt-1 block">{pic(o.id)}</span>
            <span className="mt-1 block text-caption font-semibold text-ink">{o.name}</span>
          </button>
        ))}
      </div>
      <div className="grid gap-3 rounded-lg border border-line bg-canvas p-3 md:grid-cols-[minmax(0,360px)_1fr] md:items-center" aria-live="polite">
        <div className="mx-auto w-full max-w-[360px]">{pic(look)}</div>
        <div className="space-y-1 text-caption text-ink">
          <p className="font-semibold">{tt("Option", "Option")} {look} · {info[look].name}</p>
          <p>{info[look].text}</p>
          <p className="text-ash">{tt("This only says what it is. Whether it is the right choice is for you to say.", "Das sagt nur, was es ist. Ob es die richtige Wahl ist, sagen Sie.")}</p>
          <SimButton
            key={look}
            label={tt(`Open option ${look} and try it`, `Option ${look} öffnen und ausprobieren`)}
            sub={look === "A" ? tt("Click through the prototype as a learner would.", "Klicken Sie sich wie eine Lernende durch den Prototyp.") : look === "B" ? tt("Page through the sketches as in a paper test.", "Blättern Sie die Skizzen durch wie in einem Papiertest.") : tt("Use the product that every learner now has.", "Nutzen Sie das Produkt, das jetzt alle Lernenden haben.")}
            url={look === "A" ? "prototype.design-tool.example/learnpro-course" : look === "B" ? tt("paper prototype · on the table", "Papierprototyp · auf dem Tisch") : "learnpro.example/course/project-basics"}
            title={tt(`Simulation: option ${look}`, `Simulation: Option ${look}`)}
          >
            {() => (look === "A" ? <HifiPrototypeSim /> : look === "B" ? <PaperPrototypeSim /> : <GuidedCourseSim live />)}
          </SimButton>
        </div>
      </div>
    </div>
  );
}

/** The collapsed clue kit of question 1 of Block 1.2, the same in both layouts (CLAUDE.md #55 section 1, #57). */
function AssessHelp() {
  return (
    <WritingHelp
      id="assess-kit"
      refs={[{ label: tt("The three conditions", "Die drei Rahmenbedingungen"), value: tt("3 months · limited budget · unclear needs", "3 Monate · begrenztes Budget · unklare Bedürfnisse"), target: "block-1-2-brief" }]}
      steps={[
        tt("Take one option at a time and keep the three conditions in mind: three months, a limited budget, user needs that are unclear.", "Nehmen Sie eine Option nach der anderen und behalten Sie die drei Rahmenbedingungen im Blick: drei Monate, ein begrenztes Budget, unklare Nutzerbedürfnisse."),
        tt("Risk: what could go wrong if our idea of the users is wrong? Benefit: what do we know or have afterwards? Effort: how much work and time does it take?", "Risiko: Was kann schiefgehen, wenn unsere Vorstellung von den Nutzern falsch ist? Nutzen: Was wissen oder haben wir danach? Aufwand: Wie viel Arbeit und Zeit braucht es?"),
        tt("Say it in the same three terms for every option, so you can compare them.", "Sagen Sie es für jede Option in denselben drei Begriffen, damit Sie sie vergleichen können."),
      ]}
    />
  );
}

export function Block12({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR1();
  const assessItems = OPTS.map((o) => ({ id: o.id, label: `${tt("Option", "Option")} ${o.id} · ${o.name}` }));
  const assessCols = [
    { key: "risk", label: tt("Risk", "Risiko") },
    { key: "benefit", label: tt("Benefit", "Nutzen") },
    { key: "effort", label: tt("Effort", "Aufwand") },
  ];
  return (
    <AnswerBlock
      id="block-1-2"
      title={tt("Block 1.2 · Prototyping and testing strategy: three options", "Block 1.2 · Prototyping- und Teststrategie: drei Optionen")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["1.2"]}
      findIt={tt("Route 1 → Task 1 → the three options below, then the three questions.", "Route 1 → Task 1 → die drei Optionen darunter, dann die drei Fragen.")}
    >
      <MaterialRefs refs={["A2", "A5"]} />
      <div id="block-1-2-brief" className="space-y-2 rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
        <p>{tt("You are developing a new learning platform, LearnPro's next version. Three options are on the table. The conditions are:", "Sie entwickeln eine neue Lernplattform, die nächste Version von LearnPro. Drei Optionen stehen zur Wahl. Die Rahmenbedingungen sind:")}</p>
        <ul className="list-disc space-y-0.5 pl-5">
          <li>{tt("time pressure: three months, until the next management review", "Zeitdruck: drei Monate, bis zur nächsten Management-Runde")}</li>
          <li>{tt("a limited budget", "ein begrenztes Budget")}</li>
          <li>{tt("the needs of the users are unclear", "die Bedürfnisse der Nutzer sind unklar")}</li>
        </ul>
        <p className="text-ash">{tt("As in most projects, the amount of the budget is not set and the needs of the users are not yet known. Decide anyway, and say what you assume.", "Wie in den meisten Projekten ist die Höhe des Budgets nicht festgelegt, und die Bedürfnisse der Nutzer sind noch nicht bekannt. Entscheiden Sie trotzdem, und sagen Sie, was Sie annehmen.")}</p>
      </div>
      <OptionCards />

      <p className="smallcaps text-ash">{tt("Question 1 of 3", "Frage 1 von 3")}</p>
      <FormOrTable
        id={IDS.assess}
        label={tt("Assess each option: risk, benefit and effort", "Bewerten Sie jede Option: Risiko, Nutzen und Aufwand")}
        help={r.assessMode === "text" ? tt(`Write a few sentences for each option. Many teams rate each one Low, Medium or High with a reason; you may do that or write it in your own words. At least ${MIN_ASSESS} characters each.`, `Schreiben Sie für jede Option ein paar Sätze. Viele Teams bewerten jede mit Niedrig, Mittel oder Hoch und einem Grund; Sie können das so machen oder es in eigenen Worten schreiben. Mindestens ${MIN_ASSESS} Zeichen je Option.`) : tt("One row per option: say the risk, the benefit and the effort in a few words. Low, Medium or High with a reason is a common way; your own words count the same.", "Eine Zeile pro Option: Nennen Sie Risiko, Nutzen und Aufwand in wenigen Worten. Niedrig, Mittel oder Hoch mit einem Grund ist ein üblicher Weg; eigene Worte zählen genauso.")}
        mode={r.assessMode}
        onMode={(m) => patch({ assessMode: m })}
        items={assessItems}
        cols={assessCols}
        text={r.assessText}
        rows={r.assessRows}
        onText={(id, v) => patch((st) => ({ assessText: { ...st.assessText, [id]: v } }))}
        onCell={(id, k, v) => patch((st) => ({ assessRows: { ...st.assessRows, [id]: { ...st.assessRows[id], [k]: v } } }))}
        rowId={IDS.assessOpt}
        firstCol={tt("Option", "Option")}
      >
        <AssessHelp />
      </FormOrTable>
      <ExampleAnswer id="assess-example" guide={assessGuide()} />
      {mentor && <MentorGuide guide={assessGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 2 of 3", "Frage 2 von 3")}</p>
      <Field id="optchoice-field" label={tt("Make a decision", "Treffen Sie eine Entscheidung")} help={tt("Choose the option you would start with. The three options fill the three months in different ways.", "Wählen Sie die Option, mit der Sie beginnen würden. Die drei Optionen füllen die drei Monate unterschiedlich.")}>
        <OptionList<OptId> options={OPTS.map((o) => ({ id: o.id, label: `${o.id} · ${o.name}` }))} value={r.optChoice} onChange={(id) => patch({ optChoice: id })} label={tt("Your decision", "Ihre Entscheidung")} />
      </Field>
      <TextBox
        id="optwhy-field"
        label={tt("Why that one?", "Warum diese?")}
        help={tt(`Say why it fits the three conditions better than the other two. At least ${MIN_LINE} characters.`, `Sagen Sie, warum sie besser zu den drei Rahmenbedingungen passt als die anderen beiden. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.optWhy}
        onChange={(v) => patch({ optWhy: v })}
        min={MIN_LINE}
        rows={3}
      >
        <WritingHelp
          id="optwhy-kit"
          refs={[{ label: tt("Your assessment of the options (question 1)", "Ihre Bewertung der Optionen (Frage 1)"), value: tt("risk · benefit · effort", "Risiko · Nutzen · Aufwand"), target: IDS.assess }]}
          steps={[
            tt("Name the option and the condition that weighs most for it (the time, the budget or the unclear needs).", "Nennen Sie die Option und die Bedingung, die am meisten für sie spricht (die Zeit, das Budget oder die unklaren Bedürfnisse)."),
            tt("Say what you give up by not choosing one of the others.", "Sagen Sie, worauf Sie verzichten, wenn Sie nicht eine der anderen wählen."),
            tt("Say in one sentence what you assume “limited” means for your choice.", "Sagen Sie in einem Satz, was Sie unter „begrenzt“ für Ihre Wahl annehmen."),
            tt("If it helps, say what you would do after the first step within the three months. This is not required.", "Wenn es hilft, sagen Sie, was Sie nach dem ersten Schritt innerhalb der drei Monate tun würden. Das ist nicht verlangt."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="optwhy-example" guide={optWhyGuide()} />
      {mentor && <MentorGuide guide={optWhyGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 3 of 3", "Frage 3 von 3")}</p>
      <TextBox
        id="notest-field"
        label={tt("What risks arise without testing?", "Welche Risiken entstehen ohne Testen?")}
        help={tt(`Name the risks you see and say which worries you most. At least ${MIN_LINE} characters.`, `Nennen Sie die Risiken, die Sie sehen, und sagen Sie, welches Sie am meisten sorgt. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.noTest}
        onChange={(v) => patch({ noTest: v })}
        min={MIN_LINE}
        rows={4}
      >
        <WritingHelp
          id="notest-kit"
          steps={[
            tt("Think of what happens to the money, the time and the learners if the idea turns out to be wrong after the build.", "Denken Sie daran, was mit dem Geld, der Zeit und den Lernenden geschieht, wenn sich die Idee nach dem Bau als falsch erweist."),
            tt("Pick the risk that worries you most and say why it costs the most later.", "Wählen Sie das Risiko, das Sie am meisten sorgt, und sagen Sie, warum es später am meisten kostet."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="notest-example" guide={noTestGuide()} />
      {mentor && <MentorGuide guide={noTestGuide()} />}
      <AnswerKey block={optKey()} />
      <BlockMissing block="1.2" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ the UE4 coaching: a hidden facilitator card */

/**
 * The plan's Coaching row (UE4) has questions to discuss and no written answer (CLAUDE.md #57), so it is not a task. It is a card the facilitator
 * opens by hand when the group discusses it: nothing shows until the mentor passcode has been entered, then one quiet button opens it. No fields,
 * not in the missing list, the ring, the page map or the export.
 */
function CoachingCard() {
  const mentor = useStore((s) => s.mentorUnlocked);
  const [open, setOpen] = useState(false);
  if (!mentor) return null;
  const topics = [
    tt("Why successful platforms are not “good by chance”", "Warum erfolgreiche Plattformen nicht „zufällig gut“ sind"),
    tt("Prototyping is risk reduction, not design play", "Prototyping ist Risikoreduktion, kein Designspiel"),
    tt("Testing as a basis for decisions", "Testen als Grundlage für Entscheidungen"),
    tt("When does personalisation really pay off?", "Wann lohnt sich Personalisierung wirklich?"),
    tt("Dealing with uncertainty and missing data", "Umgang mit Unsicherheit und fehlenden Daten"),
  ];
  const questions = [
    tt("What happens if we do not test?", "Was passiert, wenn wir nicht testen?"),
    tt("Which decision costs the most later on?", "Welche Entscheidung kostet später am meisten?"),
    tt("When does technology make sense, and when is it over-engineering?", "Wann ist Technologie sinnvoll, und wann ist es Over-Engineering?"),
  ];
  return (
    <section id="coaching-card" aria-label={tt("Coaching card for the facilitator", "Coaching-Karte für die Moderation")} className="print:hidden">
      <button type="button" aria-expanded={open} aria-controls="coaching-body" onClick={() => setOpen((o) => !o)} className="btn-ghost btn-sm">
        {open ? tt("Hide the coaching card", "Die Coaching-Karte ausblenden") : tt("Coaching · open it with the group", "Coaching · mit der Gruppe öffnen")}
      </button>
      {open && (
        <div id="coaching-body" className="card mt-2 space-y-3 p-4 md:p-6">
          <div>
            <p className="smallcaps text-accent">{tt("Coaching focus: from design to validation", "Coaching-Fokus: vom Design zur Validierung")}</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-body text-ink">
              {topics.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="smallcaps text-accent">{tt("Reflection · talk it through, nothing is written down", "Reflexion · besprechen Sie es, nichts wird aufgeschrieben")}</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-body text-ink">
              {questions.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

/** The standard answers to the questions a participant with experience asks about the case (DL-STANDARD section 14). Hidden behind the mentor passcode. */
function CaseQaCard() {
  return (
    <FacilitatorCard
      id="case-qa-card"
      ariaLabel={tt("Case questions for the facilitator", "Fall-Fragen für die Moderation")}
      openLabel={tt("Case questions · if a participant asks", "Fall-Fragen · wenn Teilnehmende fragen")}
      hideLabel={tt("Hide the case questions", "Die Fall-Fragen ausblenden")}
      sections={[
        {
          kicker: tt("If a participant asks …", "Wenn Teilnehmende fragen …"),
          qa: [
            {
              q: tt("What exactly is the budget?", "Wie hoch ist das Budget genau?"),
              a: tt("It is not set, on purpose. Ask the participant to write down what they assume, and whether the choice would change if the budget were twice as large or half as large. A good decision holds in more than one case.", "Es ist mit Absicht nicht festgelegt. Bitten Sie die Teilnehmenden aufzuschreiben, was sie annehmen, und ob sich die Wahl ändern würde, wenn das Budget doppelt so groß oder halb so groß wäre. Eine gute Entscheidung hält in mehr als einem Fall."),
            },
            {
              q: tt("Three months only for a prototype? That makes no sense.", "Drei Monate nur für einen Prototyp? Das ergibt keinen Sinn."),
              a: tt("Correct. The choice in Block 1.2 is the first step; what follows depends on what the tests show. How the participant would work through the months is written in Block 2.1.", "Richtig. Die Wahl in Block 1.2 ist der erste Schritt; was folgt, hängt davon ab, was die Tests zeigen. Wie die Teilnehmenden die Monate durcharbeiten würden, steht in Block 2.1."),
            },
            {
              q: tt("Can I combine the options?", "Darf ich die Optionen kombinieren?"),
              a: tt("Choose the one you start with. Naming what follows is welcome, but the choice is one.", "Wählen Sie die, mit der Sie beginnen. Zu nennen, was folgt, ist willkommen, aber die Wahl ist eine."),
            },
            {
              q: tt("Is this a new platform or LearnPro?", "Ist das eine neue Plattform oder LearnPro?"),
              a: tt("LearnPro's next version (a Case assumption, written in the case brief).", "Die nächste Version von LearnPro (eine Fallannahme, im Fall-Auftrag festgehalten)."),
            },
            {
              q: tt("What data do we have?", "Welche Daten haben wir?"),
              a: tt("See “What is known and what is open” in the case brief: starts, finishes and the lesson where learners stop are recorded; nobody has asked learners why they leave.", "Siehe „Was bekannt ist und was offen ist“ im Fall-Auftrag: Beginn, Abschluss und die Lektion, bei der Lernende aufhören, werden erfasst; niemand hat Lernende gefragt, warum sie gehen."),
            },
            {
              q: tt("Who rated the content as boring, and what does it mean?", "Wer hat den Inhalt als langweilig bewertet, und was heißt das?"),
              a: tt("Comments in the feedback form. What “boring” means is open: it is one of the things a test would find out.", "Kommentare im Feedback-Formular. Was „langweilig“ heißt, ist offen: Es gehört zu dem, was ein Test herausfinden würde."),
            },
            {
              q: tt("How many learners drop out?", "Wie viele Lernende brechen ab?"),
              a: tt("The brief gives no figure and the site prints none. The drop-out is a fact; its size is not given. Do not invent a number: the decision does not depend on it.", "Der Auftrag nennt keine Zahl, und die Seite druckt keine. Der Abbruch ist ein Fakt; seine Größe ist nicht angegeben. Erfinden Sie keine Zahl: Die Entscheidung hängt nicht davon ab."),
            },
          ],
        },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ Block 2.1 (Core, Level 2): the case study */

export function Block21({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR1();
  const testItems = TEST_SLOTS.map((id) => ({ id, label: `${tt("UX test", "UX-Test")} ${id}` }));
  const testCols = [
    { key: "what", label: tt("What you test", "Was Sie testen") },
    { key: "how", label: tt("How", "Wie") },
    { key: "measure", label: tt("What you measure", "Was Sie messen") },
  ];
  return (
    <AnswerBlock
      id="block-2-1"
      title={tt("Block 2.1 · Case study: LearnPro, a stagnating learning platform", "Block 2.1 · Fallstudie: LearnPro, eine stagnierende Lernplattform")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["2.1"]}
      findIt={tt("Route 1 → Task 1 → the situation below, then the four questions.", "Route 1 → Task 1 → die Lage darunter, dann die vier Fragen.")}
    >
      <MaterialRefs refs={["A2", "A3", "A4", "A5"]} />
      <div id="block-2-1-situation" className="space-y-2 rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
        <p className="smallcaps text-ash">{tt("The situation", "Die Lage")}</p>
        <ul className="list-disc space-y-0.5 pl-5">
          <li>{tt("users drop out of courses early", "Nutzer brechen Kurse früh ab")}</li>
          <li>{tt("there is no personalisation", "es gibt keine Personalisierung")}</li>
          <li>{tt("the content is rated “boring”", "der Inhalt wird als „langweilig“ bewertet")}</li>
        </ul>
        <p>
          {tt("The goal is to improve the platform. Platform B in Block 1.1 is LearnPro today.", "Das Ziel ist, die Plattform zu verbessern. Plattform B in Block 1.1 ist LearnPro heute.")}{" "}
          <button type="button" onClick={() => scrollToAndFlash(IDS.pictures, "ref")} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
            {tt("See the pictures", "Bilder ansehen")}
          </button>
        </p>
        <SimButton
          label={tt("Open LearnPro today and try it", "LearnPro heute öffnen und ausprobieren")}
          sub={tt("Use the platform as one of its learners does.", "Nutzen Sie die Plattform so, wie eine ihrer Lernenden es tut.")}
          url="learnpro.example/course/project-basics"
          title={tt("Simulation: LearnPro today", "Simulation: LearnPro heute")}
          note={tt("Simulation · Case assumption: the course is made up and shortened; on LearnPro it is one page of about 40 minutes of reading · nothing here is marked right or wrong.", "Simulation · Fallannahme: der Kurs ist erfunden und gekürzt; bei LearnPro ist er eine Seite mit etwa 40 Minuten Lesestoff · hier wird nichts als richtig oder falsch markiert.")}
        >
          {() => <LongPageSim />}
        </SimButton>
      </div>

      <p className="smallcaps text-ash">{tt("Question 1 of 4", "Frage 1 von 4")}</p>
      <TextBox
        id={IDS.weak}
        label={tt("Analyse the weaknesses of LearnPro", "Analysieren Sie die Schwächen von LearnPro")}
        help={tt(`Write each weakness as one line, and say which one you think is the main problem. At least ${MIN_LINE} characters.`, `Schreiben Sie jede Schwäche als eine Zeile und sagen Sie, welche Sie für das Hauptproblem halten. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.weakText}
        onChange={(v) => patch({ weakText: v })}
        min={MIN_LINE}
        rows={6}
      >
        <WritingHelp
          id="weak-kit"
          refs={[
            { label: tt("The situation", "Die Lage"), value: tt("drop-out · no personalisation · boring", "Abbruch · keine Personalisierung · langweilig"), target: "block-2-1-situation" },
            { label: tt("Platform B, LearnPro today", "Plattform B, LearnPro heute"), value: tt("pictures 1 to 8", "Bilder 1 bis 8"), target: IDS.pictures },
          ]}
          steps={[
            tt("Look at the situation and at Platform B, and write what is missing or wrong, one weakness per line.", "Sehen Sie sich die Lage und Plattform B an und schreiben Sie, was fehlt oder falsch ist, eine Schwäche pro Zeile."),
            tt("Say what each weakness does to a learner, so a symptom (they leave) is not mixed up with a cause (no feedback).", "Sagen Sie, was jede Schwäche mit einer Lernenden macht, damit ein Symptom (sie gehen) nicht mit einer Ursache (kein Feedback) verwechselt wird."),
            tt("Name the one you think is the main problem.", "Nennen Sie die, die Sie für das Hauptproblem halten."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="weak-example" guide={weakGuide()} />
      {mentor && <MentorGuide guide={weakGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 2 of 4", "Frage 2 von 4")}</p>
      <TextBox
        id={IDS.approach}
        label={tt("Develop a prototype approach: low or high fidelity", "Entwickeln Sie einen Prototyping-Ansatz: Low oder High Fidelity")}
        help={tt(`Say which fidelity you start with and why, what you test first, and what comes later. At least ${MIN_LINE} characters.`, `Sagen Sie, mit welcher Fidelity Sie beginnen und warum, was Sie zuerst testen und was später kommt. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.approachText}
        onChange={(v) => patch({ approachText: v })}
        min={MIN_LINE}
        rows={4}
      >
        <WritingHelp
          id="approach-kit"
          refs={[{ label: tt("The three prototype forms", "Die drei Prototyp-Formen"), value: tt("A hi-fi · B sketch · C real product", "A High-Fi · B Skizze · C echtes Produkt"), target: "option-A" }]}
          steps={[
            tt("Choose low fidelity, high fidelity or a sequence of both, and say why it fits three months and unclear needs.", "Wählen Sie Low Fidelity, High Fidelity oder eine Abfolge beider und sagen Sie, warum sie zu drei Monaten und unklaren Bedürfnissen passt."),
            tt("Say what you test first (the path, the interaction) and what you leave for later.", "Sagen Sie, was Sie zuerst testen (den Pfad, die Interaktion) und was Sie auf später verschieben."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="approach-example" guide={approachGuide()} />
      {mentor && <MentorGuide guide={approachGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 3 of 4", "Frage 3 von 4")}</p>
      <FormOrTable
        id={IDS.tests}
        label={tt("Define 3 UX tests", "Definieren Sie 3 UX-Tests")}
        help={r.testMode === "text" ? tt(`One box per test: what you test, how, and what you measure. At least ${MIN_ASSESS} characters each.`, `Ein Feld pro Test: was Sie testen, wie, und was Sie messen. Mindestens ${MIN_ASSESS} Zeichen je Test.`) : tt("One row per test: what you test, how, and what you measure, in a few words.", "Eine Zeile pro Test: was Sie testen, wie, und was Sie messen, in wenigen Worten.")}
        mode={r.testMode}
        onMode={(m) => patch({ testMode: m })}
        items={testItems}
        cols={testCols}
        text={r.testText}
        rows={r.testRows}
        onText={(id, v) => patch((st) => ({ testText: { ...st.testText, [id]: v } }))}
        onCell={(id, k, v) => patch((st) => ({ testRows: { ...st.testRows, [id]: { ...st.testRows[id as "1"], [k]: v } } }))}
        rowId={IDS.testSlot}
        firstCol={tt("Test", "Test")}
      >
        <WritingHelp
          id="tests-kit"
          steps={[
            tt("Define each test in three parts: what you test, how you test it, and what you measure.", "Definieren Sie jeden Test in drei Teilen: was Sie testen, wie Sie es testen und was Sie messen."),
            tt("Mix tests: one that says why learners act as they do (observation, interview) and one that says how many (data, completion).", "Mischen Sie die Tests: einen, der sagt, warum Lernende so handeln (Beobachtung, Interview), und einen, der sagt, wie viele (Daten, Abschlüsse)."),
            tt("Make each test fit the approach you chose in question 2.", "Lassen Sie jeden Test zu dem Ansatz aus Frage 2 passen."),
          ]}
        />
      </FormOrTable>
      <ExampleAnswer id="tests-example" guide={testsGuide()} />
      {mentor && <MentorGuide guide={testsGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 4 of 4", "Frage 4 von 4")}</p>
      <Field id={IDS.adaptive} label={tt("Decide: is adaptive learning worthwhile?", "Entscheiden Sie: lohnt adaptives Lernen?")} help={tt("Choose one. “Partly” is a real answer: say which part and which part waits.", "Wählen Sie eine. „Teilweise“ ist eine echte Antwort: Sagen Sie, welcher Teil und welcher Teil wartet.")}>
        <OptionList<Verdict> options={VERDICTS.map((v) => ({ id: v.id, label: v.label }))} value={r.adaptive} onChange={(id) => patch({ adaptive: id })} label={tt("Adaptive learning", "Adaptives Lernen")} cols={2} />
      </Field>
      <TextBox
        id={IDS.adaptiveWhy}
        label={tt("Why?", "Warum?")}
        help={tt(`If you say Partly, say which part and which part waits. At least ${MIN_LINE} characters.`, `Wenn Sie „Teilweise“ sagen, nennen Sie, welcher Teil und welcher Teil wartet. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.adaptiveWhy}
        onChange={(v) => patch({ adaptiveWhy: v })}
        min={MIN_LINE}
        rows={3}
      >
        <WritingHelp
          id="adaptive-kit"
          refs={[{ label: tt("The three questions and the simplest level first (Materi A5)", "Die drei Fragen und zuerst die einfachste Stufe (Materi A5)"), value: tt("problem · data · variants", "Problem · Daten · Varianten"), target: "mat-A5" }]}
          steps={[
            tt("Ask the three questions: is there a learner problem that individual paths solve, is there enough data, are there content variants?", "Stellen Sie die drei Fragen: Gibt es ein Problem der Lernenden, das individuelle Pfade lösen, gibt es genug Daten, gibt es Inhaltsvarianten?"),
            tt("Choose the simplest level that answers the problem (a rule before an algorithm) and name the first step.", "Wählen Sie die einfachste Stufe, die das Problem beantwortet (eine Regel vor einem Algorithmus), und nennen Sie den ersten Schritt."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="adaptive-example" guide={adaptiveGuide()} />
      {mentor && <MentorGuide guide={adaptiveGuide()} />}
      <AnswerKey block={adaptiveKey()} />
      <BlockMissing block="2.1" missing={missing} />
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
        <p className="smallcaps text-accent">{tt("Task 1 · three blocks", "Task 1 · drei Blöcke")}</p>
        <h2 id="task1-h">{tt("UX Analysis File: compare platforms, plan prototypes and tests", "UX Analysis File: Plattformen vergleichen, Prototypen und Tests planen")}</h2>
      </header>
      <CaseBrief />
      <CaseQaCard />
      <PartHeading id="part-1" n={1} title={tt("Compare platforms and options", "Plattformen und Optionen vergleichen")} level={tt("Level 1 · Knowledge", "Level 1 · Wissen")} />
      <Block11 missing={missing} />
      <Block12 missing={missing} />
      <CoachingCard />
      <PartHeading id="part-2" n={2} title={tt("The case study", "Die Fallstudie")} level={tt("Level 2 · Application", "Level 2 · Anwendung")} />
      <Block21 missing={missing} />
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
