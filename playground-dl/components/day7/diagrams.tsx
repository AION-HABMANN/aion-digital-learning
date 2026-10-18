"use client";

import { useState } from "react";
import clsx from "clsx";
import { OptionGrid } from "@/components/day1/diagrams";
import type { GridRow } from "@/components/day1/diagrams";
import { BarrierType, FeatureScreen, MeasureThumb, PourScreen, QuizMock, SignupMock, SpectrumPerson } from "@/components/day7/mocks";
import type { BarrierKind, Pour, PlainTools, SpectrumFeature, SpectrumKind } from "@/components/day7/mocks";
import { ChainFig } from "@/components/materi/figures";
import { Diagram, Insight, ThePoint } from "@/components/materi/kit";
import { Gloss } from "@/lib/glossify";
import { tt } from "@/lib/lang";

/**
 * Day 7 · the teaching diagrams of Materi A. Interactive ones (the persona spectrum, a quiz that needs dragging or also works by keyboard, a sign-up screen with
 * three inclusive tools switched on and off, LearnLoop weighing three measures) carry "The point" and an always-visible "What this shows"; the story of each card is its pixel comic (data/day7/comics.ts)
 * (CLAUDE.md #20, #36, #51). The static ones are drawn pictures (#52). Example companies and people: LearnLoop (an online-course provider), Ben, Sara, Jo, Lena,
 * Noor; never InclusiveLearn, so no task is answered here.
 */

const Btn = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button type="button" aria-pressed={on} onClick={onClick} className={clsx("btn btn-sm min-h-[40px] border text-left", on ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
    {children}
  </button>
);

/* ------------------------------------------------------------------ A1 · the persona spectrum: one feature, three people (interactive) */

const KINDS: SpectrumKind[] = ["permanent", "temporary", "situational"];
const SPECTRUM: Record<SpectrumFeature, { name: () => string; people: () => [string, string][] }> = {
  captions: {
    name: () => tt("Captions on a video", "Untertitel auf einem Video"),
    people: () => [
      [tt("Ben is deaf.", "Ben ist gehörlos."), tt("Without captions he cannot follow a lesson at all.", "Ohne Untertitel kann er einer Lektion gar nicht folgen.")],
      [tt("Sara has an ear infection this week.", "Sara hat in dieser Woche eine Ohrenentzündung."), tt("She cannot hear the video for a few days.", "Sie kann das Video einige Tage nicht hören.")],
      [tt("Jo is on a noisy train, without headphones.", "Jo sitzt in einem lauten Zug, ohne Kopfhörer."), tt("The sound is there, but Jo cannot hear it.", "Der Ton ist da, aber Jo kann ihn nicht hören.")],
    ],
  },
  keyboard: {
    name: () => tt("A quiz that works by keyboard", "Ein Quiz, das per Tastatur funktioniert"),
    people: () => [
      [tt("Ravi has only one arm.", "Ravi hat nur einen Arm."), tt("Dragging with a mouse and a second hand is hard for him.", "Ziehen mit der Maus und einer zweiten Hand fällt ihm schwer.")],
      [tt("Eva has an arm in a cast for six weeks.", "Eva hat sechs Wochen lang einen Arm im Gips."), tt("She can press keys but not drag.", "Sie kann Tasten drücken, aber nicht ziehen.")],
      [tt("Tom is holding a baby.", "Tom hält ein Baby."), tt("He has one hand free for a moment.", "Er hat für einen Moment eine Hand frei.")],
    ],
  },
  contrast: {
    name: () => tt("Clear contrast and enlargeable text", "Klarer Kontrast und vergrößerbarer Text"),
    people: () => [
      [tt("Mira has low vision.", "Mira hat ein eingeschränktes Sehvermögen."), tt("Pale small text is unreadable for her.", "Blasser kleiner Text ist für sie unlesbar.")],
      [tt("Karl's eyes were dilated at the doctor's.", "Karls Pupillen wurden beim Arzt geweitet."), tt("For a few hours he sees text blurred.", "Einige Stunden sieht er Text verschwommen.")],
      [tt("Nina reads on a phone in bright sunlight.", "Nina liest auf dem Handy in grellem Sonnenlicht."), tt("Pale text disappears in the glare.", "Blasser Text verschwindet im Glanz.")],
    ],
  },
};
const FEATURES: SpectrumFeature[] = ["captions", "keyboard", "contrast"];

export function SpectrumExplorer() {
  const [f, setF] = useState<SpectrumFeature>("captions");
  const people = SPECTRUM[f].people();
  return (
    <Diagram label={tt("One feature, three people: a permanent, a temporary and a situational limit · Exploratory · Case assumption", "Ein Merkmal, drei Menschen: eine dauerhafte, eine vorübergehende und eine situative Einschränkung · Explorativ · Fallannahme")}>
      <div className="space-y-3">
        <ThePoint>{tt("A limit can be permanent, temporary or situational, and the same feature helps all three. That is why accessibility serves far more people than the group it was made for.", "Eine Einschränkung kann dauerhaft, vorübergehend oder situativ sein, und dasselbe Merkmal hilft allen dreien. Deshalb dient Barrierefreiheit weit mehr Menschen als der Gruppe, für die sie gemacht wurde.")}</ThePoint>
        <div role="radiogroup" aria-label={tt("Choose a feature", "Wählen Sie ein Merkmal")} className="flex flex-wrap gap-2">
          {FEATURES.map((k) => (
            <Btn key={k} on={f === k} onClick={() => { setF(k); }}>{SPECTRUM[k].name()}</Btn>
          ))}
        </div>
        <div className="mx-auto grid max-w-[640px] gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:items-start">
          <div className={""}>
            <FeatureScreen feature={f} />
            <p className="mt-1 text-caption font-bold text-ink">{SPECTRUM[f].name()}</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {KINDS.map((k, i) => (
              <div key={k} className="space-y-1">
                <SpectrumPerson feature={f} kind={k} />
                <p className="text-micro normal-case tracking-normal font-semibold text-ink">{people[i][0]}</p>
                <p className="text-micro normal-case tracking-normal text-ash">{people[i][1]}</p>
              </div>
            ))}
          </div>
        </div>
        <Insight>
          {tt(
            `In plain words: “${SPECTRUM[f].name()}” was designed for the first person, but it also helps the other two, because their situation causes the same limit. Three people, three different reasons, one feature that serves them all. Which of the three would you have counted when you estimated how many learners need it?`,
            `In einfachen Worten: „${SPECTRUM[f].name()}“ wurde für die erste Person entworfen, hilft aber auch den anderen beiden, weil ihre Situation dieselbe Einschränkung verursacht. Drei Menschen, drei verschiedene Gründe, ein Merkmal, das allen dient. Welche der drei hätten Sie mitgezählt, als Sie schätzten, wie viele Lernende es brauchen?`,
          )}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A2 · the four principles, each with a screen that breaks it (static) */

export function PourFigure() {
  const items: [Pour, string, string][] = [
    ["perceivable", tt("Perceivable", "Wahrnehmbar"), tt("Can I see or hear it? Pale text, a status shown only by colour, a video with no captions all fail here.", "Kann ich es sehen oder hören? Blasser Text, ein nur durch Farbe gezeigter Status und ein Video ohne Untertitel scheitern hier.")],
    ["operable", tt("Operable", "Bedienbar"), tt("Can I use it? Tiny buttons side by side, a quiz that needs dragging, a sequence only a mouse can finish fail here.", "Kann ich es benutzen? Winzige Buttons nebeneinander, ein Quiz, das Ziehen verlangt, eine Folge, die nur eine Maus abschließen kann, scheitern hier.")],
    ["understandable", tt("Understandable", "Verständlich"), tt("Can I follow it? A wall of long sentences and an error that says only a number fail here.", "Kann ich es nachvollziehen? Eine Wand aus langen Sätzen und ein Fehler, der nur eine Zahl nennt, scheitern hier.")],
    ["robust", tt("Robust", "Robust"), tt("Does it work with my tools? A control with no name for a screen reader fails here.", "Funktioniert es mit meinen Werkzeugen? Ein Bedienelement ohne Namen für einen Screenreader scheitert hier.")],
  ];
  return (
    <Diagram
      label={tt("WCAG 2.2: four principles, often called POUR, each with a small screen that breaks it", "WCAG 2.2: vier Prinzipien, oft POUR genannt, jeweils mit einem kleinen Bildschirm, der es verletzt")}
      caption={tt("The first three are the principles of inclusive design in the plan. A barrier is sorted by the first principle it breaks.", "Die ersten drei sind die Prinzipien inklusiven Designs im Plan. Eine Barriere wird nach dem ersten Prinzip eingeordnet, das sie verletzt.")}
    >
      <div className="mx-auto grid max-w-[760px] gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([k, name, rule]) => (
          <div key={k} className="space-y-1">
            <PourScreen p={k} />
            <p className="text-caption font-bold text-ink">{name}</p>
            <p className="text-micro normal-case tracking-normal text-ink"><Gloss>{rule}</Gloss></p>
          </div>
        ))}
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A2 · the three barrier types (static) */

export function BarrierTypes() {
  const items: [BarrierKind, string, string, string][] = [
    ["visual", tt("Visual", "Visuell"), tt("Contrast, text size, colour only.", "Kontrast, Textgröße, nur Farbe."), tt("Clear contrast, enlargeable text, a word beside every colour.", "Klarer Kontrast, vergrößerbarer Text, ein Wort neben jeder Farbe.")],
    ["cognitive", tt("Cognitive", "Kognitiv"), tt("Complexity, language, many steps.", "Komplexität, Sprache, viele Schritte."), tt("Short sentences, one task per screen, explained errors.", "Kurze Sätze, eine Aufgabe pro Bildschirm, erklärte Fehler.")],
    ["motor", tt("Motor", "Motorisch"), tt("Target size, drag only, keyboard.", "Zielgröße, nur Ziehen, Tastatur."), tt("Large targets with space, a keyboard way, a non-drag way.", "Große Ziele mit Abstand, ein Tastaturweg, ein Weg ohne Ziehen.")],
  ];
  return (
    <Diagram
      label={tt("Three types of barrier, a typical barrier on the left and a typical remedy on the right", "Drei Arten von Barrieren, links eine typische Barriere und rechts ein typisches Gegenmittel")}
      caption={tt("The same barrier can be sorted twice: by the principle it breaks and by its type. The principle says what the learner cannot do; the type says what kind of design causes it.", "Dieselbe Barriere lässt sich zweimal einordnen: nach dem Prinzip, das sie verletzt, und nach ihrer Art. Das Prinzip sagt, was die Lernende nicht kann; die Art sagt, welche Art von Gestaltung es verursacht.")}
    >
      <div className="mx-auto grid max-w-[760px] gap-3 sm:grid-cols-3">
        {items.map(([k, name, barrier, remedy]) => (
          <div key={k} className="space-y-1">
            <BarrierType kind={k} />
            <p className="text-caption font-bold text-ink">{name}</p>
            <p className="text-micro normal-case tracking-normal text-ink">{tt("Typical barrier: ", "Typische Barriere: ")}{barrier}</p>
            <p className="text-micro normal-case tracking-normal text-ash">{tt("Typical remedy: ", "Typisches Gegenmittel: ")}{remedy}</p>
          </div>
        ))}
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A2 · Lena's quiz: drag only, or also by keyboard (interactive) */

export function QuizLena() {
  const [kb, setKb] = useState(false);
  return (
    <Diagram label={tt("A quiz at LearnLoop: drag only, or also by keyboard · Exploratory · Case assumption", "Ein Quiz bei LearnLoop: nur Ziehen oder auch per Tastatur · Explorativ · Fallannahme")}>
      <div className="space-y-3">
        <ThePoint>{tt("A barrier is sorted by what the learner cannot do. A quiz that only works by dragging stops everyone who cannot use a mouse, and one alternative way removes the barrier.", "Eine Barriere wird danach eingeordnet, was die Lernende nicht kann. Ein Quiz, das nur durch Ziehen funktioniert, hält alle auf, die keine Maus benutzen können, und ein alternativer Weg beseitigt die Barriere.")}</ThePoint>
        <div role="radiogroup" aria-label={tt("The quiz version", "Die Quiz-Fassung")} className="flex flex-wrap gap-2">
          <Btn on={!kb} onClick={() => { setKb(false); }}>{tt("Drag only", "Nur Ziehen")}</Btn>
          <Btn on={kb} onClick={() => { setKb(true); }}>{tt("Also by keyboard", "Auch per Tastatur")}</Btn>
        </div>
        <div className={clsx("mx-auto w-full max-w-[460px]")}>
          <QuizMock keyboard={kb} />
        </div>
        <Insight>
          {kb
            ? tt("In plain words: every item can now be chosen and placed with the keyboard, so Lena, a one-armed learner and a learner on a phone can all finish. For learners who drag, nothing changed. This is the success criterion 2.5.7: a drag action also works without dragging.", "In einfachen Worten: Jedes Element lässt sich nun mit der Tastatur wählen und platzieren, Lena, eine einarmige Lernende und eine Lernende am Handy können also alle abschließen. Für Lernende, die ziehen, hat sich nichts geändert. Das ist das Erfolgskriterium 2.5.7: Eine Zieh-Aktion funktioniert auch ohne Ziehen.")
            : tt("In plain words: the quiz can only be answered by dragging five items, so a learner who cannot use a mouse is stopped at the first question. The content is fine; the way of answering is the barrier, and it belongs to the principle “operable”.", "In einfachen Worten: Das Quiz lässt sich nur durch Ziehen von fünf Elementen beantworten, eine Lernende, die keine Maus benutzen kann, wird also schon bei der ersten Frage aufgehalten. Der Inhalt ist in Ordnung; der Antwortweg ist die Barriere, und sie gehört zum Prinzip „bedienbar“.")}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A3 · a sign-up screen with three tools switched on and off (interactive) */

const NONE: PlainTools = { plain: false, structure: false, flex: false };
const ALL: PlainTools = { plain: true, structure: true, flex: true };

export function PlainBuilder() {
  const [on, setOn] = useState<PlainTools>(NONE);
  const count = [on.plain, on.structure, on.flex].filter(Boolean).length;
  const toggle = (k: keyof PlainTools) => setOn((s) => ({ ...s, [k]: !s[k] }));
  const tools: [keyof PlainTools, string, string, string, string][] = [
    ["plain", tt("Plain language", "Einfache Sprache"), tt("Short sentences in everyday words.", "Kurze Sätze in Alltagsworten."), tt("Noor, who reads in her second language, can now follow the instruction.", "Noor, die in ihrer Zweitsprache liest, kann die Anleitung jetzt nachvollziehen."), tt("Wording changed", "Wortlaut geändert")],
    ["structure", tt("Clear structure", "Klare Struktur"), tt("A heading and one step after another.", "Eine Überschrift und ein Schritt nach dem anderen."), tt("Daniel, who is tired in the evening, sees what to do first, second and third.", "Daniel, der abends müde ist, sieht, was er zuerst, zweitens und drittens tun soll."), tt("Structure added", "Struktur ergänzt")],
    ["flex", tt("Flexibility", "Flexibilität"), tt("Read, watch with captions or listen.", "Lesen, mit Untertiteln ansehen oder hören."), tt("Each learner picks the form that suits them today.", "Jede Lernende wählt die Form, die ihr heute passt."), tt("Formats added", "Formate ergänzt")],
  ];
  return (
    <Diagram label={tt("A sign-up screen of LearnLoop with three inclusive tools switched on and off · Exploratory · Case assumption", "Ein Anmeldebildschirm von LearnLoop mit drei ein- und ausschaltbaren inklusiven Werkzeugen · Explorativ · Fallannahme")}>
      <div className="space-y-3">
        <ThePoint>{tt("Plain language, clear structure and flexibility each open the same screen to learners who were shut out, with no new feature. Together they also lower the load for everyone.", "Einfache Sprache, klare Struktur und Flexibilität öffnen denselben Bildschirm für Lernende, die ausgeschlossen waren, ganz ohne neues Feature. Zusammen senken sie auch die Belastung für alle.")}</ThePoint>
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:items-start">
          <div role="group" aria-label={tt("The three tools", "Die drei Werkzeuge")} className="grid gap-2">
            {tools.map(([k, name, what]) => (
              <button key={k} type="button" aria-pressed={on[k]} onClick={() => { toggle(k); }} className={clsx("min-h-[44px] rounded-lg border px-3 py-2 text-left text-caption transition-colors", on[k] ? "border-accent bg-accentSoft ring-2 ring-gold" : "border-line bg-paper hover:border-ash")}>
                <span className="font-semibold text-ink"><span aria-hidden className="mr-1.5">{on[k] ? "☑" : "☐"}</span>{name}</span>
                <span className="block pl-5 text-ash">{what}</span>
              </button>
            ))}
          </div>
          <div className={clsx("mx-auto w-full max-w-[420px]")}>
            <SignupMock on={on} />
          </div>
        </div>
        <Insight>
          {count === 0
            ? tt("In plain words: with none of the tools on, the screen is one block of legal sentences in one format. It is correct and complete, and learners who read in a second language, who are tired or who have dyslexia still cannot use it.", "In einfachen Worten: Ohne eines der Werkzeuge ist der Bildschirm ein Block juristischer Sätze in einem Format. Er ist korrekt und vollständig, und Lernende, die in einer Zweitsprache lesen, müde sind oder Legasthenie haben, können ihn trotzdem nicht nutzen.")
            : tt(
                `In plain words: ${count} of 3 tools are on. ${tools.filter(([k]) => on[k]).map(([, name, , gain]) => `${name}: ${gain}`).join(" ")} The functions behind the screen are the same; only the way it is written and offered changed.`,
                `In einfachen Worten: ${count} von 3 Werkzeugen sind an. ${tools.filter(([k]) => on[k]).map(([, name, , gain]) => `${name}: ${gain}`).join(" ")} Die Funktionen hinter dem Bildschirm sind dieselben; geändert hat sich nur, wie er geschrieben und angeboten wird.`,
              )}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A4 · integrating and evaluating, as a loop (static) */

export function ContinuousLoop() {
  return (
    <ChainFig
      label={tt("Integrating and evaluating UX continuously: plan, design, build, evaluate", "UX fortlaufend integrieren und evaluieren: planen, gestalten, bauen, evaluieren")}
      caption={tt("In every stage the same question is asked: does this work for all learners? The result of the evaluation goes into the next plan.", "In jeder Stufe wird dieselbe Frage gestellt: Funktioniert das für alle Lernenden? Das Ergebnis der Evaluation geht in die nächste Planung ein.")}
      steps={[
        { h: tt("Plan", "Planen"), b: tt("Personas and journeys include learners with access needs.", "Personas und Journeys schließen Lernende mit Zugangsbedarf ein."), kind: "a", tag: "1" },
        { h: tt("Design", "Gestalten"), b: tt("A pattern library whose components are checked against WCAG.", "Eine Pattern-Bibliothek, deren Komponenten gegen WCAG geprüft sind."), kind: "a", tag: "2" },
        { h: tt("Build", "Bauen"), b: tt("Accessibility is part of “done”; automated checks run in every release.", "Barrierefreiheit gehört zu „fertig“; automatische Prüfungen laufen in jedem Release."), kind: "a", tag: "3" },
        { h: tt("Evaluate", "Evaluieren"), b: tt("Tests with users, data by group, an audit; the findings feed the next plan.", "Tests mit Nutzern, Daten pro Gruppe, ein Audit; die Erkenntnisse speisen die nächste Planung."), kind: "s", tag: "4" },
      ]}
      loop={tt("Back to the plan, with what the evaluation found", "Zurück zur Planung, mit dem, was die Evaluation fand")}
    />
  );
}

/* ------------------------------------------------------------------ A5 · LearnLoop weighs three measures (interactive) */

export function WeighExample() {
  const [sel, setSel] = useState<string | null>(null);
  const rows: GridRow[] = [
    { id: "w1", name: tt("A new quiz-battle feature", "Ein neues Quiz-Battle-Feature"), cells: {
      impact: { level: 1, reason: tt("It opens nothing to the groups who drop out: it is a feature for people who are already in.", "Es öffnet nichts für die Gruppen, die abbrechen: Es ist ein Feature für Menschen, die schon drin sind.") },
      risk: { level: 3, reason: tt("A new drag-based game could create new barriers, and the work uses up the time and budget the fixes need.", "Ein neues Spiel mit Ziehen könnte neue Barrieren schaffen, und die Arbeit verbraucht die Zeit und das Budget, die die Behebungen brauchen.") },
      effort: { level: 3, reason: tt("A new feature has to be designed, built and tested: the most work before the release.", "Ein neues Feature muss gestaltet, gebaut und getestet werden: die meiste Arbeit bis zum Release.") },
    } },
    { id: "w2", name: tt("Captions and keyboard use in the most-used courses", "Untertitel und Tastaturbedienung in den meistgenutzten Kursen"), cells: {
      impact: { level: 3, reason: tt("It removes two blocking barriers for several groups: deaf learners, keyboard users and learners on a train.", "Es beseitigt zwei blockierende Barrieren für mehrere Gruppen: gehörlose Lernende, Tastaturnutzer und Lernende im Zug.") },
      risk: { level: 1, reason: tt("It fixes the source and can be tested.", "Es behebt die Quelle und lässt sich testen.") },
      effort: { level: 2, reason: tt("Captions have to be written and the quiz changed, course by course: a medium amount of work.", "Untertitel müssen geschrieben und das Quiz geändert werden, Kurs für Kurs: ein mittlerer Arbeitsaufwand.") },
    } },
    { id: "w3", name: tt("Instructions in plain language", "Anleitungen in einfacher Sprache"), cells: {
      impact: { level: 2, note: tt("Mid to High", "Mittel bis Hoch"), reason: tt("It helps readers with difficulties, learners with a different first language and everyone in a hurry.", "Sie hilft Lesenden mit Schwierigkeiten, Lernenden mit anderer Erstsprache und allen in Eile.") },
      risk: { level: 1, reason: tt("It changes wording, not structure.", "Es ändert den Wortlaut, nicht die Struktur.") },
      effort: { level: 1, reason: tt("A few pages of text to rewrite: little work.", "Ein paar Seiten Text zum Umschreiben: wenig Arbeit.") },
    } },
  ];
  const cols = [
    { id: "impact", label: tt("User impact", "Nutzerwirkung") },
    { id: "risk", label: tt("Risk", "Risiko") },
    { id: "effort", label: tt("Effort", "Aufwand") },
  ];
  return (
    <Diagram label={tt("A worked example: LearnLoop weighs three inclusion measures · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei Inklusionsmaßnahmen ab · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("Rate a measure by the barrier it removes and the groups it reaches, by what could go wrong, and by the work it takes. A fix at the source beats a feature or a layer on top. Give a reason for every rating.", "Bewerten Sie eine Maßnahme nach der Barriere, die sie beseitigt, und den Gruppen, die sie erreicht, danach, was schiefgehen kann, und nach der Arbeit, die sie macht. Eine Behebung an der Quelle schlägt ein Feature oder eine Schicht obendrauf. Begründen Sie jede Bewertung.")}</ThePoint>
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {([["quizBattle", tt("A · Quiz battle", "A · Quiz-Battle")], ["keyboardCaptions", tt("B · Captions and keyboard", "B · Untertitel und Tastatur")], ["language", tt("C · Plain language", "C · Einfache Sprache")]] as const).map(([k, name]) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{name}</p>
            </div>
          ))}
        </div>
        <OptionGrid label={tt("LearnLoop · a limited budget, little time", "LearnLoop · ein begrenztes Budget, wenig Zeit")} caption={tt("Three measures for LearnLoop (Case assumption, example company)", "Drei Maßnahmen für LearnLoop (Fallannahme, Beispielunternehmen)")} rows={rows} cols={cols} selected={sel} onSelect={(k) => setSel(k)} />
      </div>
    </Diagram>
  );
}
