"use client";

import Link from "next/link";
import { useState } from "react";
import { MeasureThumb } from "@/components/day3/mocks";
import type { MeasureKind } from "@/components/day3/mocks";
import { EduCoreScreens } from "@/components/day3/Screens";
import { EduCoreSim, LessonReadingSim, OptionSim } from "@/components/day3/sims";
import { SimButton } from "@/components/sim/SimFrame";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { ExportBar } from "@/components/ui/ExportBar";
import { CaseKnown } from "@/components/ui/CaseKnown";
import { FacilitatorCard } from "@/components/ui/FacilitatorCard";
import { Field } from "@/components/ui/Field";
import { CellField, FormOrTable, GridTable, LayoutLink } from "@/components/ui/FormOrTable";
import { OptionList, TextBox } from "@/components/ui/Inputs";
import { Callout } from "@/components/ui/MaterialCard";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { FACTS, OPTS, WEEKS_LIMIT } from "@/data/day3/case";
import { ASSESS_GUIDE, CAUSES_GUIDE, PROBLEMS_GUIDE } from "@/data/day3/tableGuides";
import type { OptId } from "@/data/day3/case";
import { routeHref } from "@/data/course";
import { optKey } from "@/lib/day3/answerKey";
import { analysisBody } from "@/lib/day3/exportDoc";
import { assessGuide, causesGuide, feelGuide, improveGuide, improvementsGuide, justifyGuide, optWhyGuide, orderGuide, priorityGuide, problemsGuide } from "@/lib/day3/guides";
import { IDS, r1Missing } from "@/lib/day3/missing";
import { BLOCK_MINUTES, CAUSES_N, CORE1_MINUTES, IMPROVEMENTS_N, MIN_ASSESS, MIN_LINE, PROBLEMS_N, causeCount, improvementCount, problemCount } from "@/lib/day3/progress";
import type { MissingEntry } from "@/lib/missing";
import { Gloss } from "@/lib/glossify";
import { tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { showCardPart } from "@/store/useCardMore";
import { usePersisted } from "@/store/usePersisted";
import { useStore } from "@/store/useStore";

/**
 * Day 3 · Route 1 · the UX Analysis File (CLAUDE.md #57): the plan's own questions as free answers, every block Core.
 * Block 1.1 (UE2): five problems, how the learning process feels, what you would improve. Block 1.2 (UE3): assess three options, a priority,
 * the option with the greatest effect. Two hidden facilitator cards (UE4 coaching, UE7 feedback) with no written answer. Block 2.1 (UE5-6): the
 * case study: four causes, four UX improvements, the priority and the justification.
 */

/* ------------------------------------------------------------------ the case */

function CaseBrief() {
  return (
    <section id="case-brief" aria-labelledby="case-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case-h">{tt("The case: EduCore, a platform with an overwhelm effect", "Der Fall: EduCore, eine Plattform mit Überforderungseffekt")}</h2>
        <span className="smallcaps">{tt("Read once · about 2 min", "Einmal lesen · ca. 2 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt(
            "EduCore is a learning platform for professionals. Learners say they do not understand the content, many drop out, and the platform is called “too complicated”. A first look at the screens shows three things: too much information at once, no visual structure, and no recognisable learning logic. You are part of the UX team and must reduce the overload without making the content useless.",
            "EduCore ist eine Lernplattform für Fachkräfte. Lernende sagen, sie verstünden den Inhalt nicht, viele brechen ab, und die Plattform wird „zu kompliziert“ genannt. Ein erster Blick auf die Bildschirme zeigt drei Dinge: zu viel Information auf einmal, keine visuelle Struktur und keine erkennbare Lernlogik. Sie gehören zum UX-Team und müssen die Überlastung senken, ohne den Inhalt nutzlos zu machen.",
          )}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The conditions", "Die Rahmenbedingungen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt(`Time for the module: ${WEEKS_LIMIT} weeks, until the module goes live`, `Zeit für das Modul: ${WEEKS_LIMIT} Wochen, bis das Modul live geht`)}</li>
            <li>{tt("The content is complex (a specialist subject)", "Der Inhalt ist komplex (ein Fachthema)")}</li>
            <li>{tt("The target group is beginners", "Die Zielgruppe sind Einsteiger")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · three blocks, about ${CORE1_MINUTES} min`, `So läuft die Aufgabe · drei Blöcke, ca. ${CORE1_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 1.1: a lesson screen. Five problems, how the learning process feels, what you would improve.", "Block 1.1: ein Lernbildschirm. Fünf Probleme, wie sich der Lernprozess anfühlt, was Sie verbessern würden.")}</li>
            <li>{tt("Block 1.2: three options for a learning module. Assess each, put them in order, name the one with the greatest effect.", "Block 1.2: drei Optionen für ein Lernmodul. Jede bewerten, in eine Reihenfolge bringen, die mit der größten Wirkung nennen.")}</li>
            <li>{tt("Block 2.1: the case study. Four causes of overload, four UX improvements, a priority and a justification.", "Block 2.1: die Fallstudie. Vier Ursachen der Überlastung, vier UX-Verbesserungen, eine Priorität und eine Begründung.")}</li>
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
              tt("Users do not understand the content.", "Nutzer verstehen den Inhalt nicht."),
              tt("Many learners drop out.", "Viele Lernende brechen ab."),
              tt("The content is called “too complicated”.", "Der Inhalt wird „zu kompliziert“ genannt."),
              tt("A first look at the screens: too much information at once, no visual structure, no recognisable learning logic.", "Ein erster Blick auf die Bildschirme: zu viel Information auf einmal, keine visuelle Struktur, keine erkennbare Lernlogik."),
            ],
          },
          {
            title: tt("Clear · Case assumption", "Klar · Fallannahme"),
            items: [
              tt("EduCore is live and has a list of lessons.", "EduCore ist live und hat eine Liste von Lektionen."),
              tt("The platform records which lessons each learner opens and which quizzes they finish.", "Die Plattform erfasst, welche Lektionen jede Lernende öffnet und welche Quizze sie beendet."),
              tt("“Too complicated” comes from comments in the feedback form.", "„Zu kompliziert“ stammt aus Kommentaren im Feedback-Formular."),
              tt(`The ${WEEKS_LIMIT} weeks are for the module you improve, until it goes live.`, `Die ${WEEKS_LIMIT} Wochen gelten für das Modul, das Sie verbessern, bis es live geht.`),
              tt("“Beginners” means new to the subject, not new to learning online.", "„Einsteiger“ heißt neu im Thema, nicht neu im Online-Lernen."),
              tt("The module in Block 1.2 is a module of EduCore.", "Das Modul in Block 1.2 ist ein Modul von EduCore."),
            ],
          },
          {
            title: tt("Open · on purpose", "Offen · mit Absicht"),
            items: [
              tt("How many learners drop out, and where in a lesson they leave: no figure is given.", "Wie viele Lernende abbrechen und wo in einer Lektion sie gehen: Es ist keine Zahl angegeben."),
              tt("What “too complicated” means to the learners: the three observations come from a first look at the screens, not from the learners.", "Was „zu kompliziert“ für die Lernenden bedeutet: Die drei Beobachtungen stammen aus einem ersten Blick auf die Bildschirme, nicht von den Lernenden."),
              tt("Nobody has tested the lessons with real beginners yet.", "Bisher hat niemand die Lektionen mit echten Einsteigern getestet."),
              tt("How much money there is: it is not set; effort means the work and time an option needs.", "Wie viel Geld es gibt: Es ist nicht festgelegt; Aufwand heißt die Arbeit und Zeit, die eine Option braucht."),
            ],
          },
        ]}
        note={tt("As in most projects, not everything is known. Decide anyway, and say what you assume.", "Wie in den meisten Projekten ist nicht alles bekannt. Entscheiden Sie trotzdem, und sagen Sie, was Sie annehmen.")}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>
          {tt(
            "The brief says: users do not understand the content, a high drop-out rate, content “too complicated”, too much information at once, no visual structure, no recognisable learning logic, a long continuous text of 500 words with no paragraphs, unexplained technical terms and no visualisation, a time limit of 4 weeks, complex content and beginners. It prints no cost or budget, so none is used here. Everything else is made up for this exercise: the screens, the 28 lessons, the 12 quiz questions, the text of the lesson and the facts marked “Clear”.",
            "Der Auftrag sagt: Nutzer verstehen den Inhalt nicht, eine hohe Abbruchquote, Inhalt „zu kompliziert“, zu viel Information auf einmal, keine visuelle Struktur, keine erkennbare Lernlogik, ein langer durchgehender Text von 500 Wörtern ohne Absätze, mit unerklärten Fachbegriffen und ohne Visualisierung, ein Zeitlimit von 4 Wochen, komplexer Inhalt und Einsteiger. Er nennt keine Kosten und kein Budget, daher wird hier keines verwendet. Alles andere ist für diese Übung erfunden: die Bildschirme, die 28 Lektionen, die 12 Quizfragen, der Text der Lektion und die als „Klar“ markierten Fakten.",
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

/* ------------------------------------------------------------------ Block 1.1 (UE2, Level 1) */

function ProblemsHelp() {
  return (
    <WritingHelp
      id="problems-kit"
      refs={[{ label: tt("The lesson screen", "Der Lernbildschirm"), value: tt("picture and simulation above", "Bild und Simulation oben"), target: IDS.pictures }]}
      steps={[
        tt("Open the lesson and imagine you are a beginner with twenty free minutes. Write what gets in your way, one problem per line.", "Öffnen Sie die Lektion und stellen Sie sich vor, Sie sind eine Einsteigerin mit zwanzig freien Minuten. Schreiben Sie, was Ihnen im Weg steht, ein Problem pro Zeile."),
        tt("Start each line with “I…” (“I do not know where to start…”) and say what you then do or cannot do.", "Beginnen Sie jede Zeile mit „Ich …“ („Ich weiß nicht, wo ich anfangen soll …“) und sagen Sie, was Sie dann tun oder nicht können."),
        tt("Choose five problems that are not the same idea twice.", "Wählen Sie fünf Probleme, die nicht zweimal dieselbe Idee sind."),
      ]}
    />
  );
}

export function Block11({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR1();
  const n = problemCount(r);
  return (
    <AnswerBlock
      id="block-1-1"
      title={tt("Block 1.1 · A lesson screen: five problems, how it feels, what you would improve", "Block 1.1 · Ein Lernbildschirm: fünf Probleme, wie es sich anfühlt, was Sie verbessern würden")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["1.1"]}
      findIt={tt("Route 1 → Task 1 → the drawn lesson screen directly below, then the three questions. No prior knowledge is needed.", "Route 1 → Task 1 → der gezeichnete Lernbildschirm direkt darunter, dann die drei Fragen. Vorwissen ist nicht nötig.")}
    >
      <MaterialRefs refs={["A1", "A2"]} />
      <p className="max-w-prose text-body text-ink">
        {tt(
          "You receive the description of a learning screen: a long continuous text of 500 words, no paragraphs, no structure, technical terms without explanation and no visualisation. Look at it, or open it and read it as a learner would, then answer the three questions in your own words.",
          "Sie erhalten die Beschreibung eines Lernbildschirms: ein langer durchgehender Text von 500 Wörtern, keine Absätze, keine Struktur, Fachbegriffe ohne Erklärung und keine Visualisierung. Sehen Sie ihn an, oder öffnen und lesen Sie ihn wie eine Lernende, und beantworten Sie dann die drei Fragen in Ihren eigenen Worten.",
        )}
      </p>
      <div id={IDS.pictures}>
        <EduCoreScreens only={["l7"]} markers={false} />
      </div>
      <SimButton
        label={tt("Open the lesson and read it", "Die Lektion öffnen und lesen")}
        sub={tt("Read it as a learner would, with twenty free minutes.", "Lesen Sie sie wie eine Lernende mit zwanzig freien Minuten.")}
        url="educore.example/lesson/7"
        title={tt("Simulation: the EduCore lesson", "Simulation: die EduCore-Lektion")}
        note={tt("Simulation · Case assumption: the text of the lesson is made up (about 500 words) · nothing here is marked right or wrong.", "Simulation · Fallannahme: der Text der Lektion ist erfunden (etwa 500 Wörter) · hier wird nichts als richtig oder falsch markiert.")}
      >
        {() => <LessonReadingSim />}
      </SimButton>

      <p className="smallcaps text-ash">{tt("Question 1 of 3", "Frage 1 von 3")}</p>
      {r.problemMode === "text" ? (
        <TextBox
          id={IDS.problems}
          label={tt(`Describe ${PROBLEMS_N} problems spontaneously, from the user's perspective`, `Beschreiben Sie spontan ${PROBLEMS_N} Probleme aus Sicht der Nutzer`)}
          help={tt(`Write them as a list, one problem per line. You have ${n} of ${PROBLEMS_N}.`, `Schreiben Sie sie als Liste, ein Problem pro Zeile. Sie haben ${n} von ${PROBLEMS_N}.`)}
          value={r.problems}
          onChange={(v) => patch({ problems: v })}
          rows={6}
          placeholder={tt("1. I do not know where to start reading …", "1. Ich weiß nicht, wo ich zu lesen anfangen soll …")}
        >
          <ProblemsHelp />
        </TextBox>
      ) : (
        <Field id={IDS.problems} label={tt(`Describe ${PROBLEMS_N} problems spontaneously, from the user's perspective`, `Beschreiben Sie spontan ${PROBLEMS_N} Probleme aus Sicht der Nutzer`)} help={tt(`One row per problem: the problem, and how it is for the learner. You have ${n} of ${PROBLEMS_N} rows complete.`, `Eine Zeile pro Problem: das Problem und wie es für die Lernende ist. Sie haben ${n} von ${PROBLEMS_N} Zeilen vollständig.`)}>
          <div className="space-y-2">
            <GridTable
              head={[tt("The problem", "Das Problem"), tt("How it is for the learner", "Wie es für die Lernende ist")]}
              hints={[PROBLEMS_GUIDE.hints.first, PROBLEMS_GUIDE.hints.side]}
              example={[PROBLEMS_GUIDE.example.first, PROBLEMS_GUIDE.example.cells.side]}
              exampleLabel={PROBLEMS_GUIDE.exampleLabel}
              rows={r.problemRows.map((row, i) => ({
                id: IDS.problemRow(i),
                cells: (["problem", "side"] as const).map((k) => {
                  const col = k === "problem" ? tt("The problem", "Das Problem") : tt("How it is for the learner", "Wie es für die Lernende ist");
                  return (
                    <CellField
                      key={k}
                      value={row[k]}
                      onChange={(v) => patch((st) => ({ problemRows: st.problemRows.map((x, j) => (j === i ? { ...x, [k]: v } : x)) }))}
                      label={tt(`Problem ${i + 1}: ${col}`, `Problem ${i + 1}: ${col}`)}
                    />
                  );
                }),
              }))}
            />
            <ProblemsHelp />
          </div>
        </Field>
      )}
      <LayoutLink mode={r.problemMode} onMode={(m) => patch({ problemMode: m })} backText={tt("Back to one text box.", "Zurück zu einem Textfeld.")} />
      <ExampleAnswer id="problems-example" guide={problemsGuide()} />
      {mentor && <MentorGuide guide={problemsGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 2 of 3", "Frage 2 von 3")}</p>
      <TextBox
        id={IDS.feel}
        label={tt("How does the learning process feel?", "Wie fühlt sich der Lernprozess an?")}
        help={tt(`Write it as the learner would feel it (“I would lose track of…”). At least ${MIN_LINE} characters.`, `Schreiben Sie es so, wie die Lernende es empfände („Ich würde den Faden verlieren …“). Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.feel}
        onChange={(v) => patch({ feel: v })}
        min={MIN_LINE}
        rows={4}
      >
        <WritingHelp
          id="feel-kit"
          refs={[{ label: tt("Intake, processing, storage (Materi A1)", "Aufnahme, Verarbeitung, Speicherung (Materi A1)"), value: tt("what to look at · what to hold · what to keep", "worauf schauen · was halten · was behalten"), target: "mat-A1", before: () => showCardPart("A1", "rules") }]}
          steps={[
            tt("Start with “It feels like …” and say what you cannot do or hold in mind on that screen.", "Beginnen Sie mit „Es fühlt sich an wie …“ und sagen Sie, was Sie auf diesem Bildschirm nicht können oder im Kopf behalten können."),
            tt("Say what you then do (skim, stop, come back later).", "Sagen Sie, was Sie dann tun (überfliegen, aufhören, später wiederkommen)."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="feel-example" guide={feelGuide()} />
      {mentor && <MentorGuide guide={feelGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 3 of 3", "Frage 3 von 3")}</p>
      <TextBox
        id={IDS.improve}
        label={tt("What would you improve intuitively?", "Was würden Sie intuitiv verbessern?")}
        help={tt(`Name each improvement and the problem it answers. At least ${MIN_LINE} characters.`, `Nennen Sie jede Verbesserung und das Problem, das sie beantwortet. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.improve}
        onChange={(v) => patch({ improve: v })}
        min={MIN_LINE}
        rows={3}
      >
        <WritingHelp
          id="improve-kit"
          refs={[{ label: tt("Your five problems (question 1)", "Ihre fünf Probleme (Frage 1)"), value: tt(`${n} of ${PROBLEMS_N} written`, `${n} von ${PROBLEMS_N} geschrieben`), target: IDS.problems }]}
          steps={[
            tt("Take two of your problems and write one change for each.", "Nehmen Sie zwei Ihrer Probleme und schreiben Sie für jedes eine Änderung."),
            tt("Say what the learner then notices.", "Sagen Sie, was die Lernende dann bemerkt."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="improve-example" guide={improveGuide()} />
      {mentor && <MentorGuide guide={improveGuide()} />}
      <BlockMissing block="1.1" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.2 (UE3, Level 1) */

const OPT_THUMB: Record<OptId, MeasureKind> = { A: "cut", B: "visual", C: "chunk" };

/**
 * The three options of Block 1.2 as three real pictures (CLAUDE.md #52) and a working simulation of the same lesson as each option leaves it
 * (#60). The text only says what the option is; the learner judges.
 */
function OptionCards() {
  const [look, setLook] = useState<OptId>("A");
  const info: Record<OptId, string> = {
    A: tt("The lesson is cut significantly: only the core and the conclusion stay, and the rest of the content is gone.", "Die Lektion wird deutlich gekürzt: Nur der Kern und der Schluss bleiben, der Rest des Inhalts entfällt."),
    B: tt("The dense parts are replaced by diagrams and graphics; the rest of the text stays.", "Die dichten Teile werden durch Diagramme und Grafiken ersetzt; der übrige Text bleibt."),
    C: tt("The lesson is split into small modules: one short part at a time, all of the content kept.", "Die Lektion wird in kleine Module aufgeteilt: jeweils ein kurzer Teil, der gesamte Inhalt bleibt."),
  };
  return (
    <div className="space-y-3">
      <p className="text-caption text-ash">{tt("Select an option to see what the lesson would look like. It is the same lesson each time.", "Wählen Sie eine Option, um zu sehen, wie die Lektion aussähe. Es ist jedes Mal dieselbe Lektion.")}</p>
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
            <span className="mt-1 block">
              <MeasureThumb kind={OPT_THUMB[o.id]} />
            </span>
            <span className="mt-1 block text-caption font-semibold text-ink">{o.name}</span>
          </button>
        ))}
      </div>
      <div className="space-y-1 rounded-lg border border-line bg-canvas p-3 text-caption text-ink" aria-live="polite">
        <p className="font-semibold">{tt("Option", "Option")} {look} · {OPTS.find((o) => o.id === look)?.name}</p>
        <p>{info[look]}</p>
        <p className="text-ash">{tt("This only says what it is. Whether it is the right choice is for you to say.", "Das sagt nur, was es ist. Ob es die richtige Wahl ist, sagen Sie.")}</p>
        <SimButton
          key={look}
          label={tt(`Open option ${look} and read the lesson`, `Option ${look} öffnen und die Lektion lesen`)}
          sub={look === "C" ? tt("Page through the small modules.", "Blättern Sie durch die kleinen Module.") : look === "B" ? tt("Read the lesson with its diagrams.", "Lesen Sie die Lektion mit ihren Diagrammen.") : tt("Read the shortened lesson.", "Lesen Sie die gekürzte Lektion.")}
          url={`educore.example/lesson/7?option=${look}`}
          title={tt(`Simulation: option ${look}`, `Simulation: Option ${look}`)}
          note={tt("Simulation · Case assumption: the lesson is made up · nothing here is marked right or wrong.", "Simulation · Fallannahme: die Lektion ist erfunden · hier wird nichts als richtig oder falsch markiert.")}
        >
          {() => <OptionSim option={look} />}
        </SimButton>
      </div>
    </div>
  );
}

function AssessHelp() {
  return (
    <WritingHelp
      id="assess-kit"
      refs={[{ label: tt("The three conditions", "Die drei Rahmenbedingungen"), value: tt(`${WEEKS_LIMIT} weeks · complex content · beginners`, `${WEEKS_LIMIT} Wochen · komplexer Inhalt · Einsteiger`), target: "block-1-2-brief" }]}
      steps={[
        tt("Take one option at a time and keep the three conditions in mind: four weeks, complex content, beginners.", "Nehmen Sie eine Option nach der anderen und behalten Sie die drei Rahmenbedingungen im Blick: vier Wochen, komplexer Inhalt, Einsteiger."),
        tt("Learning impact: how much does it help a beginner understand? Effort: how much work and time? Risk: what could be lost or go wrong? Many teams rate each Low, Medium or High with a reason; plain sentences count the same.", "Lernwirkung: Wie sehr hilft es einer Einsteigerin beim Verstehen? Aufwand: Wie viel Arbeit und Zeit? Risiko: Was kann verloren gehen oder schiefgehen? Viele Teams bewerten jedes mit Niedrig, Mittel oder Hoch und einem Grund; einfache Sätze zählen genauso."),
        tt("Say it in the same three terms for every option, so you can compare them.", "Sagen Sie es für jede Option in denselben drei Begriffen, damit Sie sie vergleichen können."),
      ]}
    />
  );
}

export function Block12({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR1();
  const assessItems = OPTS.map((o) => ({ id: o.id, label: `${tt("Option", "Option")} ${o.id} · ${o.name}` }));
  const assessCols = [
    { key: "impact", label: tt("Learning impact", "Lernwirkung") },
    { key: "effort", label: tt("Effort", "Aufwand") },
    { key: "risk", label: tt("Risk", "Risiko") },
  ];
  return (
    <AnswerBlock
      id="block-1-2"
      title={tt("Block 1.2 · Deciding on reducing cognitive load: three options", "Block 1.2 · Über die Senkung der kognitiven Belastung entscheiden: drei Optionen")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["1.2"]}
      findIt={tt("Route 1 → Task 1 → the three options below, then the three questions.", "Route 1 → Task 1 → die drei Optionen darunter, dann die drei Fragen.")}
    >
      <MaterialRefs refs={["A5", "A2"]} />
      <div id="block-1-2-brief" className="space-y-2 rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
        <p>{tt("You are to improve a learning module of EduCore. Three options are on the table. The framework conditions are:", "Sie sollen ein Lernmodul von EduCore verbessern. Drei Optionen stehen zur Wahl. Die Rahmenbedingungen sind:")}</p>
        <ul className="list-disc space-y-0.5 pl-5">
          <li>{tt(`time: ${WEEKS_LIMIT} weeks, until the module goes live`, `Zeit: ${WEEKS_LIMIT} Wochen, bis das Modul live geht`)}</li>
          <li>{tt("the content is complex (a specialist subject)", "der Inhalt ist komplex (ein Fachthema)")}</li>
          <li>{tt("the target group is beginners (new to the subject)", "die Zielgruppe sind Einsteiger (neu im Thema)")}</li>
        </ul>
        <p className="text-ash">{tt("As in most projects, the amount of money is not set and not everything about the learners is known. Decide anyway, and say what you assume.", "Wie in den meisten Projekten ist die Höhe des Geldes nicht festgelegt, und nicht alles über die Lernenden ist bekannt. Entscheiden Sie trotzdem, und sagen Sie, was Sie annehmen.")}</p>
      </div>
      <OptionCards />

      <p className="smallcaps text-ash">{tt("Question 1 of 3", "Frage 1 von 3")}</p>
      <FormOrTable
        id={IDS.assess}
        label={tt("Assess each measure: learning impact, effort and risk", "Bewerten Sie jede Maßnahme: Lernwirkung, Aufwand und Risiko")}
        help={r.assessMode === "text" ? tt(`Write a few sentences for each option. At least ${MIN_ASSESS} characters each.`, `Schreiben Sie für jede Option ein paar Sätze. Mindestens ${MIN_ASSESS} Zeichen je Option.`) : tt("One row per option: say the learning impact, the effort and the risk in a few words.", "Eine Zeile pro Option: Nennen Sie Lernwirkung, Aufwand und Risiko in wenigen Worten.")}
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
        guide={ASSESS_GUIDE}
      >
        <AssessHelp />
      </FormOrTable>
      <ExampleAnswer id="assess-example" guide={assessGuide()} />
      {mentor && <MentorGuide guide={assessGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 2 of 3", "Frage 2 von 3")}</p>
      <TextBox
        id={IDS.optOrder}
        label={tt("Make a prioritisation", "Nehmen Sie eine Priorisierung vor")}
        help={tt(`Put the three options in order, one per line, the first priority first. At least ${MIN_ASSESS} characters.`, `Bringen Sie die drei Optionen in eine Reihenfolge, eine pro Zeile, die erste Priorität zuerst. Mindestens ${MIN_ASSESS} Zeichen.`)}
        value={r.optOrder}
        onChange={(v) => patch({ optOrder: v })}
        min={MIN_ASSESS}
        rows={4}
        placeholder={tt("1. …\n2. …\n3. …", "1. …\n2. …\n3. …")}
      >
        <WritingHelp
          id="optorder-kit"
          refs={[{ label: tt("Your assessment (question 1)", "Ihre Bewertung (Frage 1)"), value: tt("impact · effort · risk", "Wirkung · Aufwand · Risiko"), target: IDS.assess }]}
          steps={[
            tt("Look at your three assessments and put first the option you judge best under the three conditions.", "Sehen Sie sich Ihre drei Bewertungen an und setzen Sie die Option an die erste Stelle, die Sie unter den drei Rahmenbedingungen für die beste halten."),
            tt("Write the other two below it in the order you would do them.", "Schreiben Sie die anderen beiden darunter, in der Reihenfolge, in der Sie sie angehen würden."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="optorder-example" guide={orderGuide()} />
      {mentor && <MentorGuide guide={orderGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 3 of 3", "Frage 3 von 3")}</p>
      <Field id={IDS.optChoice} label={tt("Which measure has the greatest effect?", "Welche Maßnahme hat die größte Wirkung?")} help={tt("Choose one of the three options.", "Wählen Sie eine der drei Optionen.")}>
        <OptionList<OptId> options={OPTS.map((o) => ({ id: o.id, label: `${o.id} · ${o.name}` }))} value={r.optChoice} onChange={(id) => patch({ optChoice: id })} label={tt("The measure with the greatest effect", "Die Maßnahme mit der größten Wirkung")} />
      </Field>
      <TextBox
        id={IDS.optWhy}
        label={tt("Why that one?", "Warum diese?")}
        help={tt(`Refer to what the learner has to hold, find or understand. At least ${MIN_LINE} characters.`, `Beziehen Sie sich darauf, was die Lernende halten, finden oder verstehen muss. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.optWhy}
        onChange={(v) => patch({ optWhy: v })}
        min={MIN_LINE}
        rows={3}
      >
        <WritingHelp
          id="optwhy-kit"
          refs={[{ label: tt("Your assessment of the options (question 1)", "Ihre Bewertung der Optionen (Frage 1)"), value: tt("impact · effort · risk", "Wirkung · Aufwand · Risiko"), target: IDS.assess }]}
          steps={[
            tt("Name the option and say what the learner holds, finds or understands more easily with it.", "Nennen Sie die Option und sagen Sie, was die Lernende damit leichter hält, findet oder versteht."),
            tt("Say why the other two have less effect, in the same terms.", "Sagen Sie, warum die anderen beiden weniger wirken, in denselben Begriffen."),
            tt("Say in one sentence what you assume about what is not known (the money, or how many learners leave).", "Sagen Sie in einem Satz, was Sie über das Unbekannte annehmen (das Geld oder wie viele Lernende gehen)."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="optwhy-example" guide={optWhyGuide()} />
      {mentor && <MentorGuide guide={optWhyGuide()} />}
      <AnswerKey block={optKey()} />
      <BlockMissing block="1.2" missing={missing} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ the UE4 coaching and the UE7 feedback round: hidden facilitator cards */

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
              q: tt("Which module is it?", "Welches Modul ist es?"),
              a: tt("A module of EduCore. The lesson of Block 1.1 is a typical page of it.", "Ein Modul von EduCore. Die Lektion in Block 1.1 ist eine typische Seite davon."),
            },
            {
              q: tt("Four weeks for what?", "Vier Wochen wofür?"),
              a: tt("Until the improved module goes live. Not for the whole platform.", "Bis das verbesserte Modul live geht. Nicht für die ganze Plattform."),
            },
            {
              q: tt("What is the budget?", "Wie hoch ist das Budget?"),
              a: tt("It is not set. Effort here means the work and time an option needs. Ask the participant to say what they assume.", "Es ist nicht festgelegt. Aufwand heißt hier die Arbeit und Zeit, die eine Option braucht. Bitten Sie die Teilnehmenden zu sagen, was sie annehmen."),
            },
            {
              q: tt("Can I combine the options?", "Darf ich die Optionen kombinieren?"),
              a: tt("Block 1.2 asks for an order, so combining is what the order does: say what comes first and what follows.", "Block 1.2 verlangt eine Reihenfolge, Kombinieren ist also das, was die Reihenfolge tut: Sagen Sie, was zuerst kommt und was folgt."),
            },
            {
              q: tt("Shortening is risky with complex content. Is it allowed?", "Kürzen ist bei komplexem Inhalt riskant. Ist es erlaubt?"),
              a: tt("Yes, it is one of the three options. The risk of cutting what the subject needs is exactly what the participant assesses.", "Ja, es ist eine der drei Optionen. Das Risiko, zu kürzen, was das Thema braucht, ist genau das, was die Teilnehmenden bewerten."),
            },
            {
              q: tt("What does “beginners” mean?", "Was heißt „Einsteiger“?"),
              a: tt("New to the subject, not new to learning online.", "Neu im Thema, nicht neu im Online-Lernen."),
            },
            {
              q: tt("What data do we have?", "Welche Daten haben wir?"),
              a: tt("See “What is known and what is open” in the case brief: lesson opens and quiz finishes are recorded; nobody has tested the lessons with beginners.", "Siehe „Was bekannt ist und was offen ist“ im Fall-Auftrag: Öffnen von Lektionen und Abschluss von Quizzen werden erfasst; niemand hat die Lektionen mit Einsteigern getestet."),
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

function CoachingCard() {
  return (
    <FacilitatorCard
      id="coaching-card"
      ariaLabel={tt("Coaching card for the facilitator", "Coaching-Karte für die Moderation")}
      openLabel={tt("Coaching · open it with the group", "Coaching · mit der Gruppe öffnen")}
      hideLabel={tt("Hide the coaching card", "Die Coaching-Karte ausblenden")}
      sections={[
        {
          kicker: tt("Coaching focus: UX = steering attention and thinking", "Coaching-Fokus: UX = Aufmerksamkeit und Denken steuern"),
          items: [
            tt("UX decides whether learning takes place at all", "UX entscheidet, ob Lernen überhaupt stattfindet"),
            tt("Good UX does not reduce thinking, it guides it", "Gutes UX verringert das Denken nicht, es lenkt es"),
            tt("Difference: “simple” against “effective for learning”", "Unterschied: „einfach“ gegen „wirksam fürs Lernen“"),
            tt("How do you recognise cognitive overload?", "Woran erkennt man kognitive Überlastung?"),
            tt("Prioritisation: what must be understood, and what not?", "Priorisierung: Was muss verstanden werden, und was nicht?"),
          ],
        },
        {
          kicker: tt("Reflection · talk it through, nothing is written down", "Reflexion · besprechen Sie es, nichts wird aufgeschrieben"),
          items: [
            tt("Where do we overburden users unnecessarily?", "Wo überlasten wir Nutzer unnötig?"),
            tt("Which information is truly decisive?", "Welche Information ist wirklich entscheidend?"),
            tt("Which UX decision measurably improves learning?", "Welche UX-Entscheidung verbessert das Lernen messbar?"),
          ],
        },
      ]}
    />
  );
}

function FeedbackCard() {
  return (
    <FacilitatorCard
      id="feedback-card"
      ariaLabel={tt("Feedback round card for the facilitator", "Karte zur Feedbackrunde für die Moderation")}
      openLabel={tt("Feedback round · open it with the group", "Feedbackrunde · mit der Gruppe öffnen")}
      hideLabel={tt("Hide the feedback card", "Die Feedback-Karte ausblenden")}
      sections={[
        { kicker: tt("Preparation", "Vorbereitung"), items: [tt("Presentation of the solutions", "Präsentation der Lösungen")] },
        {
          kicker: tt("Level 3 input · talk it through, nothing is written down", "Input Level 3 · besprechen Sie es, nichts wird aufgeschrieben"),
          items: [
            tt("Which measure improves learning the most?", "Welche Maßnahme verbessert das Lernen am meisten?"),
            tt("Which decision reduces the drop-out rate?", "Welche Entscheidung senkt die Abbruchquote?"),
            tt("Where is the risk of “too much simplification”?", "Wo liegt das Risiko der „zu starken Vereinfachung“?"),
          ],
        },
        { kicker: tt("Discussion", "Diskussion"), items: [tt("Efficiency against deep learning", "Effizienz gegen tiefes Lernen"), tt("UX as a learning amplifier", "UX als Lernverstärker")] },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ Block 2.1 (UE5-6, Level 2): the case study */

function CausesHelp() {
  return (
    <WritingHelp
      id="causes-kit"
      refs={[
        { label: tt("The three observations of the case", "Die drei Beobachtungen des Falls"), value: tt("too much at once · no structure · no learning logic", "zu viel auf einmal · keine Struktur · keine Lernlogik"), target: "block-2-1-situation" },
        { label: tt("The EduCore screens", "Die EduCore-Bildschirme"), value: tt("pictures 1 to 8", "Bilder 1 bis 8"), target: "educore-screens" },
      ]}
      steps={[
        tt("Look at the situation and the screens and write what overloads the learner, one cause per line.", "Sehen Sie sich die Lage und die Bildschirme an und schreiben Sie, was die Lernende überlastet, eine Ursache pro Zeile."),
        tt("A cause is something design can change. The complexity of the subject itself is not one; design can only order it.", "Eine Ursache ist etwas, das Gestaltung ändern kann. Die Komplexität des Themas selbst ist keine; Gestaltung kann sie nur ordnen."),
        tt("Then write one UX improvement for each cause, one per line, and say what the learner then notices.", "Schreiben Sie dann für jede Ursache eine UX-Verbesserung, eine pro Zeile, und sagen Sie, was die Lernende dann bemerkt."),
      ]}
    />
  );
}

export function Block21({ missing }: { missing: MissingEntry[] }) {
  const { r, patch, mentor } = useR1();
  const nC = causeCount(r);
  const nI = improvementCount(r);
  return (
    <AnswerBlock
      id="block-2-1"
      title={tt("Block 2.1 · Case study: EduCore, a platform with an overwhelm effect", "Block 2.1 · Fallstudie: EduCore, eine Plattform mit Überforderungseffekt")}
      kind="JUDGED"
      core
      minutes={BLOCK_MINUTES["2.1"]}
      findIt={tt("Route 1 → Task 1 → the situation and the EduCore screens below, then the four questions.", "Route 1 → Task 1 → die Lage und die EduCore-Bildschirme darunter, dann die vier Fragen.")}
    >
      <MaterialRefs refs={["A2", "A3", "A5"]} />
      <div id="block-2-1-situation" className="space-y-2 rounded-lg border border-line bg-canvas p-3 text-caption text-ink">
        <p className="smallcaps text-ash">{tt("The situation", "Die Lage")}</p>
        <ul className="list-disc space-y-0.5 pl-5">
          <li>{tt("users do not understand the content", "Nutzer verstehen den Inhalt nicht")}</li>
          <li>{tt("a high drop-out rate", "eine hohe Abbruchquote")}</li>
          <li>{tt("the content is considered “too complicated”", "der Inhalt gilt als „zu kompliziert“")}</li>
        </ul>
        <p className="smallcaps pt-1 text-ash">{tt("The analysis so far", "Die bisherige Analyse")}</p>
        <ul className="list-disc space-y-0.5 pl-5">
          <li>{tt("too much information at once", "zu viel Information auf einmal")}</li>
          <li>{tt("no visual structure", "keine visuelle Struktur")}</li>
          <li>{tt("no recognisable learning logic", "keine erkennbare Lernlogik")}</li>
        </ul>
      </div>
      <div id="educore-screens">
        <EduCoreScreens />
      </div>
      <SimButton
        label={tt("Open EduCore and try it", "EduCore öffnen und ausprobieren")}
        sub={tt("Use the platform as one of its learners does: the module overview, a lesson, the quiz.", "Nutzen Sie die Plattform so, wie eine ihrer Lernenden es tut: die Modulübersicht, eine Lektion, das Quiz.")}
        url="educore.example/modules"
        title={tt("Simulation: the EduCore platform", "Simulation: die Plattform EduCore")}
        note={tt("Simulation · Case assumption: the 28 lessons, the lesson text and the 12 quiz questions are made up · nothing here is marked right or wrong.", "Simulation · Fallannahme: die 28 Lektionen, der Lektionstext und die 12 Quizfragen sind erfunden · hier wird nichts als richtig oder falsch markiert.")}
      >
        {() => <EduCoreSim />}
      </SimButton>
      <RevealHint id="educore-facts" label={tt("Show what is at each number", "Zeigen, was an jeder Nummer steht")} title={tt("What is at each number in the pictures", "Was an jeder Nummer in den Bildern steht")}>
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

      {r.causeMode === "text" ? (
        <>
          <p className="smallcaps text-ash">{tt("Question 1 of 4", "Frage 1 von 4")}</p>
          <TextBox
            id={IDS.causes}
            label={tt(`Identify ${CAUSES_N} causes of cognitive overload`, `Identifizieren Sie ${CAUSES_N} Ursachen kognitiver Überlastung`)}
            help={tt(`Write them as a list, one cause per line. You have ${nC} of ${CAUSES_N}.`, `Schreiben Sie sie als Liste, eine Ursache pro Zeile. Sie haben ${nC} von ${CAUSES_N}.`)}
            value={r.causesText}
            onChange={(v) => patch({ causesText: v })}
            rows={5}
            placeholder={tt("1. Too much is shown at once …", "1. Es wird zu viel auf einmal gezeigt …")}
          >
            <CausesHelp />
          </TextBox>
          <ExampleAnswer id="causes-example" guide={causesGuide()} />
          {mentor && <MentorGuide guide={causesGuide()} />}

          <p className="smallcaps text-ash">{tt("Question 2 of 4", "Frage 2 von 4")}</p>
          <TextBox
            id={IDS.improvements}
            label={tt(`Develop ${IMPROVEMENTS_N} UX improvements`, `Entwickeln Sie ${IMPROVEMENTS_N} UX-Verbesserungen`)}
            help={tt(`Write them as a list, one improvement per line. You have ${nI} of ${IMPROVEMENTS_N}.`, `Schreiben Sie sie als Liste, eine Verbesserung pro Zeile. Sie haben ${nI} von ${IMPROVEMENTS_N}.`)}
            value={r.improvementsText}
            onChange={(v) => patch({ improvementsText: v })}
            rows={5}
            placeholder={tt("1. Chunking: split each lesson into …", "1. Chunking: jede Lektion teilen in …")}
          />
          <ExampleAnswer id="improvements-example" guide={improvementsGuide()} />
          {mentor && <MentorGuide guide={improvementsGuide()} />}
        </>
      ) : (
        <>
          <p className="smallcaps text-ash">{tt("Questions 1 and 2 of 4", "Fragen 1 und 2 von 4")}</p>
          <Field id={IDS.causes} label={tt(`Identify ${CAUSES_N} causes of cognitive overload and develop ${IMPROVEMENTS_N} UX improvements`, `Identifizieren Sie ${CAUSES_N} Ursachen kognitiver Überlastung und entwickeln Sie ${IMPROVEMENTS_N} UX-Verbesserungen`)} help={tt(`One row per cause, with the improvement that answers it. You have ${nC} causes and ${nI} improvements.`, `Eine Zeile pro Ursache, mit der Verbesserung, die sie beantwortet. Sie haben ${nC} Ursachen und ${nI} Verbesserungen.`)}>
            <div className="space-y-2">
              <GridTable
                head={[tt("Cause of the overload", "Ursache der Überlastung"), tt("UX improvement", "UX-Verbesserung")]}
                hints={[CAUSES_GUIDE.hints.first, CAUSES_GUIDE.hints.improvement]}
                example={[CAUSES_GUIDE.example.first, CAUSES_GUIDE.example.cells.improvement]}
                exampleLabel={CAUSES_GUIDE.exampleLabel}
                rows={r.causeRows.map((row, i) => ({
                  id: IDS.causeRow(i),
                  cells: (["cause", "improvement"] as const).map((k) => {
                    const col = k === "cause" ? tt("Cause of the overload", "Ursache der Überlastung") : tt("UX improvement", "UX-Verbesserung");
                    return (
                      <CellField
                        key={k}
                        value={row[k]}
                        onChange={(v) => patch((st) => ({ causeRows: st.causeRows.map((x, j) => (j === i ? { ...x, [k]: v } : x)) }))}
                        label={`${i + 1}: ${col}`}
                      />
                    );
                  }),
                }))}
              />
              <CausesHelp />
            </div>
          </Field>
          <ExampleAnswer id="causes-example" guide={causesGuide()} />
          {mentor && <MentorGuide guide={causesGuide()} />}
          <ExampleAnswer id="improvements-example" guide={improvementsGuide()} />
          {mentor && <MentorGuide guide={improvementsGuide()} />}
        </>
      )}
      <LayoutLink mode={r.causeMode} onMode={(m) => patch({ causeMode: m })} backText={tt("Back to one text box.", "Zurück zu einem Textfeld.")} />

      <p className="smallcaps text-ash">{tt("Question 3 of 4", "Frage 3 von 4")}</p>
      <TextBox
        id={IDS.priority}
        label={tt("Prioritise your improvements", "Priorisieren Sie Ihre Verbesserungen")}
        help={tt(`Put the improvements in order, the first priority first. At least ${MIN_LINE} characters.`, `Bringen Sie die Verbesserungen in eine Reihenfolge, die erste Priorität zuerst. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.priority}
        onChange={(v) => patch({ priority: v })}
        min={MIN_LINE}
        rows={3}
      >
        <WritingHelp
          id="priority-kit"
          refs={[{ label: tt("Your improvements (question 2)", "Ihre Verbesserungen (Frage 2)"), value: tt(`${nI} of ${IMPROVEMENTS_N} written`, `${nI} von ${IMPROVEMENTS_N} geschrieben`), target: r.causeMode === "text" ? IDS.improvements : IDS.causes }]}
          steps={[
            tt("Put first the improvement that removes the biggest load for the most learners.", "Setzen Sie an die erste Stelle die Verbesserung, die die größte Belastung für die meisten Lernenden entfernt."),
            tt("Order the others by what makes the next one easier.", "Ordnen Sie die anderen danach, was die jeweils nächste erleichtert."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="priority-example" guide={priorityGuide()} />
      {mentor && <MentorGuide guide={priorityGuide()} />}

      <p className="smallcaps text-ash">{tt("Question 4 of 4", "Frage 4 von 4")}</p>
      <TextBox
        id={IDS.justify}
        label={tt("Justify your decision", "Begründen Sie Ihre Entscheidung")}
        help={tt(`Say why the first priority goes first and what the main problem is. At least ${MIN_LINE} characters.`, `Sagen Sie, warum die erste Priorität zuerst kommt und was das Hauptproblem ist. Mindestens ${MIN_LINE} Zeichen.`)}
        value={r.justify}
        onChange={(v) => patch({ justify: v })}
        min={MIN_LINE}
        rows={4}
      >
        <WritingHelp
          id="justify-kit"
          refs={[{ label: tt("Three kinds of load (Materi A2)", "Drei Arten der Belastung (Materi A2)"), value: tt("intrinsic · extraneous · germane", "intrinsisch · extrinsisch · lernbezogen"), target: "mat-A2", before: () => showCardPart("A2", "rules") }]}
          steps={[
            tt("Name the main problem: which kind of load is the one design can remove?", "Nennen Sie das Hauptproblem: Welche Art der Belastung ist die, die Gestaltung entfernen kann?"),
            tt("Say why your first priority answers it, and what the learner can then hold in mind.", "Sagen Sie, warum Ihre erste Priorität es beantwortet und was die Lernende dann im Kopf behalten kann."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="justify-example" guide={justifyGuide()} />
      {mentor && <MentorGuide guide={justifyGuide()} />}
      <BlockMissing block="2.1" missing={missing} />
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
        <p className="smallcaps text-accent">{tt("Task 1 · three blocks", "Task 1 · drei Blöcke")}</p>
        <h2 id="task1-h">{tt("UX Analysis File: recognise the overload, decide on the measures", "UX Analysis File: die Überlastung erkennen, über die Maßnahmen entscheiden")}</h2>
      </header>
      <CaseBrief />
      <CaseQaCard />
      <PartHeading id="part-1" n={1} title={tt("Recognise the overload and decide", "Die Überlastung erkennen und entscheiden")} level={tt("Level 1 · Knowledge", "Level 1 · Wissen")} />
      <Block11 missing={missing} />
      <Block12 missing={missing} />
      <CoachingCard />
      <PartHeading id="part-2" n={2} title={tt("The case study", "Die Fallstudie")} level={tt("Level 2 · Application", "Level 2 · Anwendung")} />
      <Block21 missing={missing} />
      <FeedbackCard />
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
