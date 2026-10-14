"use client";

import { useState } from "react";
import clsx from "clsx";
import { OptionGrid } from "@/components/day1/diagrams";
import type { GridRow } from "@/components/day1/diagrams";
import { BarrierType, FeatureScreen, MeasureThumb, PourScreen, QuizMock, SignupMock, SpectrumPerson } from "@/components/day7/mocks";
import type { BarrierKind, Pour, PlainTools, SpectrumFeature, SpectrumKind } from "@/components/day7/mocks";
import { ChainFig, CostBands } from "@/components/materi/figures";
import { Diagram, Insight, Story, ThePoint, useStory } from "@/components/materi/kit";
import type { StoryPlan } from "@/components/materi/kit";
import { EFFORT_LOW_MAX, EFFORT_MID_MAX, effortBand } from "@/data/day7/case";
import { Gloss } from "@/lib/glossify";
import { euro, tt } from "@/lib/lang";

/**
 * Day 7 · the teaching diagrams of Materi A. Interactive ones (the persona spectrum, a quiz that needs dragging or also works by keyboard, a sign-up screen with
 * three inclusive tools switched on and off, LearnLoop weighing three measures) carry "The point", "Walk me through it" and an always-visible "What this shows"
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
  const story = useStory([
    { title: tt("Captions: three people, one limit", "Untertitel: drei Menschen, eine Einschränkung"), say: tt("Let us look at LearnLoop, an online-course provider, and at one small feature: captions on a video. Ben is deaf, so without captions he cannot follow a lesson at all. For Ben the limit is permanent.\n\nSara has an ear infection this week, so for her it is temporary. Jo sits on a noisy train without headphones, so for Jo it is only situational. Three people with three different lives, and one and the same limit.", "Sehen wir uns LearnLoop an, einen Anbieter von Online-Kursen, und ein kleines Merkmal: Untertitel auf einem Video. Ben ist gehörlos, ohne Untertitel kann er einer Lektion also gar nicht folgen. Für Ben ist die Einschränkung dauerhaft.\n\nSara hat in dieser Woche eine Ohrenentzündung, für sie ist sie also vorübergehend. Jo sitzt in einem lauten Zug ohne Kopfhörer, für Jo ist sie also nur situativ. Drei Menschen mit drei verschiedenen Leben und ein und dieselbe Einschränkung."), look: tt("the three people under the video", "die drei Menschen unter dem Video"), apply: () => setF("captions") },
    { title: tt("The same pattern with the keyboard", "Dasselbe Muster bei der Tastatur"), say: tt("The pattern repeats with a quiz. Ravi has only one arm, Eva has an arm in a cast, and Tom is holding a baby. None of them can drag an item across the screen with a mouse and a second hand, but all three can press keys. So a quiz that can also be answered by keyboard serves all three, although it was designed for one of them.", "Das Muster wiederholt sich bei einem Quiz. Ravi hat nur einen Arm, Eva hat einen Arm im Gips, und Tom hält ein Baby. Keiner von ihnen kann mit der Maus und einer zweiten Hand ein Element über den Bildschirm ziehen, aber alle drei können Tasten drücken. Ein Quiz, das sich auch per Tastatur beantworten lässt, dient also allen dreien, obwohl es für einen von ihnen entworfen wurde."), look: tt("the frame on one answer, and the three people", "der Rahmen um eine Antwort und die drei Menschen"), apply: () => setF("keyboard") },
    { title: tt("Why this matters", "Warum das zählt"), say: tt("So a single feature serves far more people than the group it was made for, and that is why accessibility is not a niche. Inclusive design starts from this fact: abilities differ and they change, so a team plans for the differences from the start. Press the three buttons yourself, including clear contrast, and notice who else each feature helps.", "Ein einzelnes Merkmal dient also weit mehr Menschen als die Gruppe, für die es gemacht wurde, und deshalb ist Barrierefreiheit keine Nische. Inklusives Design geht von dieser Tatsache aus: Fähigkeiten sind verschieden und ändern sich, ein Team plant die Unterschiede also von Anfang an ein. Drücken Sie die drei Schaltflächen selbst, auch den klaren Kontrast, und achten Sie darauf, wem jedes Merkmal noch hilft."), look: tt("the three feature buttons", "die drei Merkmal-Schaltflächen"), apply: () => setF("contrast") },
  ] satisfies StoryPlan[]);
  const people = SPECTRUM[f].people();
  return (
    <Diagram label={tt("One feature, three people: a permanent, a temporary and a situational limit · Exploratory · Case assumption", "Ein Merkmal, drei Menschen: eine dauerhafte, eine vorübergehende und eine situative Einschränkung · Explorativ · Fallannahme")}>
      <div className="space-y-3">
        <ThePoint>{tt("A limit can be permanent, temporary or situational, and the same feature helps all three. That is why accessibility serves far more people than the group it was made for.", "Eine Einschränkung kann dauerhaft, vorübergehend oder situativ sein, und dasselbe Merkmal hilft allen dreien. Deshalb dient Barrierefreiheit weit mehr Menschen als der Gruppe, für die sie gemacht wurde.")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <div role="radiogroup" aria-label={tt("Choose a feature", "Wählen Sie ein Merkmal")} className="flex flex-wrap gap-2">
          {FEATURES.map((k) => (
            <Btn key={k} on={f === k} onClick={() => { story.leave(); setF(k); }}>{SPECTRUM[k].name()}</Btn>
          ))}
        </div>
        <div className="mx-auto grid max-w-[640px] gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:items-start">
          <div className={clsx(story.step !== null && "anim-pulse rounded-lg")}>
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
  const story = useStory([
    { title: tt("Lena cannot start the quiz", "Lena kann das Quiz nicht beginnen"), say: tt("Let us follow Lena, a learner at LearnLoop who uses only a keyboard because she cannot use a mouse after an injury. Her course is excellent, and the quiz asks her to drag five items onto five boxes.\n\nLena cannot do it, because dragging needs a mouse and the quiz has no other way. She is blocked by one failure of the principle “operable”, although the content is good, so she cannot finish the course.", "Begleiten wir Lena, eine Lernende bei LearnLoop, die nach einer Verletzung nur eine Tastatur benutzt, weil sie keine Maus bedienen kann. Ihr Kurs ist hervorragend, und das Quiz verlangt von ihr, fünf Elemente in fünf Kästen zu ziehen.\n\nLena kann es nicht, denn Ziehen braucht eine Maus, und das Quiz hat keinen anderen Weg. Sie wird durch einen einzigen Verstoß gegen das Prinzip „bedienbar“ blockiert, obwohl der Inhalt gut ist, und kann den Kurs deshalb nicht abschließen."), look: tt("the dashed arrow, and the boxes with no other way", "der gestrichelte Pfeil und die Kästen ohne anderen Weg"), apply: () => setKb(false) },
    { title: tt("A small fix", "Eine kleine Behebung"), say: tt("The fix is small. Each item gets a button “Place at …” that opens a list of the five boxes, so it can be chosen and placed with the keyboard. The quiz works exactly as before for everyone who drags.\n\nNow Lena can finish, and so can a learner on a phone who finds dragging awkward. The two success criteria behind this are 2.1.1, everything works by keyboard, and 2.5.7, a drag action also works without dragging.", "Die Behebung ist klein. Jedes Element bekommt einen Button „Platzieren …“, der eine Liste der fünf Kästen öffnet, es lässt sich also mit der Tastatur wählen und platzieren. Das Quiz funktioniert für alle, die ziehen, genau wie vorher.\n\nJetzt kann Lena abschließen, und ebenso eine Lernende am Handy, der Ziehen unbequem ist. Die beiden Erfolgskriterien dahinter sind 2.1.1, alles funktioniert per Tastatur, und 2.5.7, eine Zieh-Aktion funktioniert auch ohne Ziehen."), look: tt("the “Place at” buttons and the frame around one of them", "die „Platzieren“-Buttons und der Rahmen um einen davon"), apply: () => setKb(true) },
    { title: tt("The point", "Der Kern"), say: tt("So an access barrier can be one missing alternative, and the repair can cost very little. A tool that finds problems automatically may report nothing here, which is why a manual test with the keyboard matters. Switch between the two versions yourself to see who can finish.", "Eine Zugangsbarriere kann also eine einzige fehlende Alternative sein, und die Reparatur kann sehr wenig kosten. Ein Werkzeug, das Probleme automatisch findet, meldet hier vielleicht nichts, deshalb zählt ein manueller Test mit der Tastatur. Wechseln Sie selbst zwischen den beiden Fassungen, um zu sehen, wer abschließen kann."), look: tt("the two buttons above the quiz", "die beiden Schaltflächen über dem Quiz"), apply: () => setKb(true) },
  ] satisfies StoryPlan[]);
  return (
    <Diagram label={tt("A quiz at LearnLoop: drag only, or also by keyboard · Exploratory · Case assumption", "Ein Quiz bei LearnLoop: nur Ziehen oder auch per Tastatur · Explorativ · Fallannahme")}>
      <div className="space-y-3">
        <ThePoint>{tt("A barrier is sorted by what the learner cannot do. A quiz that only works by dragging stops everyone who cannot use a mouse, and one alternative way removes the barrier.", "Eine Barriere wird danach eingeordnet, was die Lernende nicht kann. Ein Quiz, das nur durch Ziehen funktioniert, hält alle auf, die keine Maus benutzen können, und ein alternativer Weg beseitigt die Barriere.")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <div role="radiogroup" aria-label={tt("The quiz version", "Die Quiz-Fassung")} className="flex flex-wrap gap-2">
          <Btn on={!kb} onClick={() => { story.leave(); setKb(false); }}>{tt("Drag only", "Nur Ziehen")}</Btn>
          <Btn on={kb} onClick={() => { story.leave(); setKb(true); }}>{tt("Also by keyboard", "Auch per Tastatur")}</Btn>
        </div>
        <div className={clsx("mx-auto w-full max-w-[460px]", story.step !== null && "anim-pulse rounded-lg")}>
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
  const story = useStory([
    { title: tt("A hard sign-up", "Eine schwere Anmeldung"), say: tt("Let us look at the sign-up screen of LearnLoop, an online-course provider. It is one block of text in legal wording, with no heading and in one format only. Noor, a learner who reads in her second language, tries to sign up on her phone.\n\nShe reads the first sentence three times and still does not know what she must do. All the information is on the screen, but she cannot follow it. This is a cognitive barrier, and it belongs to the principle “understandable”.", "Sehen wir uns den Anmeldebildschirm von LearnLoop an, einem Anbieter von Online-Kursen. Er ist ein Textblock in juristischem Wortlaut, ohne Überschrift und nur in einem Format. Noor, eine Lernende, die in ihrer Zweitsprache liest, versucht sich auf dem Handy anzumelden.\n\nSie liest den ersten Satz dreimal und weiß immer noch nicht, was sie tun soll. Alle Informationen stehen auf dem Bildschirm, aber sie kann ihnen nicht folgen. Das ist eine kognitive Barriere, und sie gehört zum Prinzip „verständlich“."), look: tt("the single block of long sentences", "der einzelne Block langer Sätze"), apply: () => setOn(NONE) },
    { title: tt("Plain language and structure", "Einfache Sprache und Struktur"), say: tt("First LearnLoop rewrites the sentences in everyday words, and Noor understands them. Then it adds a heading and splits the text into three numbered steps, so Daniel, who is tired in the evening, sees what to do first, second and third.\n\nThe load on both of them is lower, because they no longer have to decode the sentence and also find their place in it. This is the link to Day 3: clear structure lowers the extraneous load.", "Zuerst schreibt LearnLoop die Sätze in Alltagsworten um, und Noor versteht sie. Dann ergänzt es eine Überschrift und teilt den Text in drei nummerierte Schritte, sodass Daniel, der abends müde ist, sieht, was er zuerst, zweitens und drittens tun soll.\n\nDie Belastung beider sinkt, denn sie müssen den Satz nicht mehr entschlüsseln und zugleich ihre Stelle darin finden. Das ist die Verbindung zu Tag 3: Klare Struktur senkt die extrinsische Belastung."), look: tt("the heading and the three numbered steps", "die Überschrift und die drei nummerierten Schritte"), apply: () => setOn({ plain: true, structure: true, flex: false }) },
    { title: tt("Flexibility, and the point", "Flexibilität und der Kern"), say: tt("Last, LearnLoop offers the same instruction to read, to watch with captions or to listen to. A learner with dyslexia can listen, and a learner on a noisy train can read. None of the three tools needed a new feature, only a different way of writing and offering what was already there.\n\nPress the three buttons yourself and notice that each one opens the screen to a different group.", "Zuletzt bietet LearnLoop dieselbe Anleitung zum Lesen, zum Ansehen mit Untertiteln oder zum Hören an. Eine Lernende mit Legasthenie kann zuhören, und ein Lernender in einem lauten Zug kann lesen. Keines der drei Werkzeuge brauchte ein neues Feature, nur eine andere Art, das Vorhandene zu schreiben und anzubieten.\n\nDrücken Sie die drei Schaltflächen selbst und achten Sie darauf, dass jede den Bildschirm für eine andere Gruppe öffnet."), look: tt("the three format buttons at the top of the screen", "die drei Format-Schaltflächen oben auf dem Bildschirm"), apply: () => setOn(ALL) },
  ] satisfies StoryPlan[]);
  return (
    <Diagram label={tt("A sign-up screen of LearnLoop with three inclusive tools switched on and off · Exploratory · Case assumption", "Ein Anmeldebildschirm von LearnLoop mit drei ein- und ausschaltbaren inklusiven Werkzeugen · Explorativ · Fallannahme")}>
      <div className="space-y-3">
        <ThePoint>{tt("Plain language, clear structure and flexibility each open the same screen to learners who were shut out, with no new feature. Together they also lower the load for everyone.", "Einfache Sprache, klare Struktur und Flexibilität öffnen denselben Bildschirm für Lernende, die ausgeschlossen waren, ganz ohne neues Feature. Zusammen senken sie auch die Belastung für alle.")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:items-start">
          <div role="group" aria-label={tt("The three tools", "Die drei Werkzeuge")} className="grid gap-2">
            {tools.map(([k, name, what]) => (
              <button key={k} type="button" aria-pressed={on[k]} onClick={() => { story.leave(); toggle(k); }} className={clsx("min-h-[44px] rounded-lg border px-3 py-2 text-left text-caption transition-colors", on[k] ? "border-accent bg-accentSoft ring-2 ring-gold" : "border-line bg-paper hover:border-ash")}>
                <span className="font-semibold text-ink"><span aria-hidden className="mr-1.5">{on[k] ? "☑" : "☐"}</span>{name}</span>
                <span className="block pl-5 text-ash">{what}</span>
              </button>
            ))}
          </div>
          <div className={clsx("mx-auto w-full max-w-[420px]", story.step !== null && "anim-pulse rounded-lg")}>
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

const LL = { quiz: 30000, captions: 14000, plain: 8000, budget: 45000 };

export function WeighExample() {
  const [sel, setSel] = useState<string | null>(null);
  const L = (n: number) => [tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")][n - 1];
  const story = useStory([
    { title: tt("The setting", "Die Ausgangslage"), say: tt(`Let us look at LearnLoop again. Users with impairments drop out, complaints are increasing, time is short, and the budget is ${euro(LL.budget)}. Three ideas are on the table, and we rate each one on user impact, effort and risk.\n\nEffort follows a rule: under ${euro(EFFORT_LOW_MAX + 1)} is Low, up to ${euro(EFFORT_MID_MAX)} is Mid, above that is High. The first idea is a new quiz-battle feature for engagement. It costs ${euro(LL.quiz)}, which is above ${euro(EFFORT_MID_MAX)}, so its effort is ${L(effortBand(LL.quiz))}.`, `Sehen wir uns LearnLoop noch einmal an. Nutzer mit Einschränkungen brechen ab, Beschwerden nehmen zu, die Zeit ist knapp, und das Budget beträgt ${euro(LL.budget)}. Drei Ideen liegen auf dem Tisch, und wir bewerten jede nach Nutzerwirkung, Aufwand und Risiko.\n\nDer Aufwand folgt einer Regel: unter ${euro(EFFORT_LOW_MAX + 1)} ist Niedrig, bis ${euro(EFFORT_MID_MAX)} Mittel, darüber Hoch. Die erste Idee ist ein neues Quiz-Battle-Feature für mehr Engagement. Es kostet ${euro(LL.quiz)}, das ist über ${euro(EFFORT_MID_MAX)}, sein Aufwand ist also ${L(effortBand(LL.quiz))}.`), look: tt("the first bar and the top row", "der erste Balken und die obere Zeile"), apply: () => setSel("w1.effort") },
    { title: tt("A feature nobody excluded can use", "Ein Feature, das niemand Ausgeschlossenes nutzen kann"), say: tt("Does the quiz battle help? It is a new feature for people who are already in, and it opens the platform to nobody who is currently excluded, so its user impact on the excluded groups is Low. Could it go wrong? A new game that is built around dragging could create new barriers, so the risk is Mid.", "Hilft das Quiz-Battle? Es ist ein neues Feature für Menschen, die schon drin sind, und öffnet die Plattform für niemanden, der derzeit ausgeschlossen ist, seine Nutzerwirkung auf die ausgeschlossenen Gruppen ist also Niedrig. Kann es schiefgehen? Ein neues Spiel, das auf Ziehen aufbaut, könnte neue Barrieren schaffen, das Risiko ist also Mittel."), look: tt("the top row, user impact and risk", "die obere Zeile, Nutzerwirkung und Risiko"), apply: () => setSel("w1.impact") },
    { title: tt("Fixes at the source", "Behebungen an der Quelle"), say: tt(`Captions and keyboard use for ten courses cost ${euro(LL.captions)}, so the effort is ${L(effortBand(LL.captions))}. They remove two blocking barriers for the most-used courses and help several groups at once (deaf learners, keyboard users, learners on a train): the user impact is High and the risk is Low, because the fix is at the source and can be tested.\n\nInstructions in plain language cost ${euro(LL.plain)}, so the effort is ${L(effortBand(LL.plain))}. They help readers with difficulties, learners with a different first language and everyone in a hurry.`, `Untertitel und Tastaturbedienung für zehn Kurse kosten ${euro(LL.captions)}, der Aufwand ist also ${L(effortBand(LL.captions))}. Sie beseitigen zwei blockierende Barrieren in den meistgenutzten Kursen und helfen mehreren Gruppen zugleich (gehörlosen Lernenden, Tastaturnutzern, Lernenden im Zug): Die Nutzerwirkung ist Hoch und das Risiko Niedrig, weil die Behebung an der Quelle liegt und sich testen lässt.\n\nAnleitungen in einfacher Sprache kosten ${euro(LL.plain)}, der Aufwand ist also ${L(effortBand(LL.plain))}. Sie helfen Lesenden mit Schwierigkeiten, Lernenden mit anderer Erstsprache und allen in Eile.`), look: tt("the second and the third row", "die zweite und die dritte Zeile"), apply: () => setSel("w2.impact") },
    { title: tt("What to take from it", "Was Sie mitnehmen"), say: tt("So rate user impact by the barrier a measure removes and the groups it reaches. A measure that adds a feature and removes no barrier has a low impact on excluded groups, and a fix at the source beats a layer on top. Select any cell in the table to read its reason.", "Bewerten Sie die Nutzerwirkung also nach der Barriere, die eine Maßnahme beseitigt, und den Gruppen, die sie erreicht. Eine Maßnahme, die ein Feature ergänzt und keine Barriere beseitigt, hat eine geringe Wirkung auf ausgeschlossene Gruppen, und eine Behebung an der Quelle schlägt eine Schicht obendrauf. Wählen Sie eine Zelle in der Tabelle, um ihren Grund zu lesen."), apply: () => setSel("w3.effort") },
  ] satisfies StoryPlan[]);
  const rows: GridRow[] = [
    { id: "w1", name: tt("A new quiz-battle feature", "Ein neues Quiz-Battle-Feature"), sub: euro(LL.quiz), cells: {
      impact: { level: 1, reason: tt("It opens nothing to the groups who drop out: it is a feature for people who are already in.", "Es öffnet nichts für die Gruppen, die abbrechen: Es ist ein Feature für Menschen, die schon drin sind.") },
      effort: { level: effortBand(LL.quiz), note: euro(LL.quiz), reason: tt(`${euro(LL.quiz)} is above ${euro(EFFORT_MID_MAX)}: High.`, `${euro(LL.quiz)} liegen über ${euro(EFFORT_MID_MAX)}: Hoch.`) },
      risk: { level: 2, reason: tt("A new drag-based game could create new barriers.", "Ein neues Spiel mit Ziehen könnte neue Barrieren schaffen.") },
    } },
    { id: "w2", name: tt("Captions and keyboard use for ten courses", "Untertitel und Tastaturbedienung für zehn Kurse"), sub: euro(LL.captions), cells: {
      impact: { level: 3, reason: tt("It removes two blocking barriers for several groups: deaf learners, keyboard users and learners on a train.", "Es beseitigt zwei blockierende Barrieren für mehrere Gruppen: gehörlose Lernende, Tastaturnutzer und Lernende im Zug.") },
      effort: { level: effortBand(LL.captions), note: euro(LL.captions), reason: tt(`${euro(LL.captions)} lies between ${euro(EFFORT_LOW_MAX + 1)} and ${euro(EFFORT_MID_MAX)}: Mid.`, `${euro(LL.captions)} liegen zwischen ${euro(EFFORT_LOW_MAX + 1)} und ${euro(EFFORT_MID_MAX)}: Mittel.`) },
      risk: { level: 1, reason: tt("It fixes the source and can be tested.", "Es behebt die Quelle und lässt sich testen.") },
    } },
    { id: "w3", name: tt("Instructions in plain language", "Anleitungen in einfacher Sprache"), sub: euro(LL.plain), cells: {
      impact: { level: 2, note: tt("Mid to High", "Mittel bis Hoch"), reason: tt("It helps readers with difficulties, learners with a different first language and everyone in a hurry.", "Sie hilft Lesenden mit Schwierigkeiten, Lernenden mit anderer Erstsprache und allen in Eile.") },
      effort: { level: effortBand(LL.plain), note: euro(LL.plain), reason: tt(`${euro(LL.plain)} is under ${euro(EFFORT_LOW_MAX + 1)}: Low.`, `${euro(LL.plain)} liegen unter ${euro(EFFORT_LOW_MAX + 1)}: Niedrig.`) },
      risk: { level: 1, reason: tt("It changes wording, not structure.", "Es ändert den Wortlaut, nicht die Struktur.") },
    } },
  ];
  const cols = [
    { id: "impact", label: tt("User impact", "Nutzerwirkung") },
    { id: "effort", label: tt("Effort", "Aufwand") },
    { id: "risk", label: tt("Risk", "Risiko") },
  ];
  return (
    <Diagram label={tt("A worked example: LearnLoop weighs three inclusion measures · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei Inklusionsmaßnahmen ab · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("Rate a measure by the barrier it removes and the groups it reaches, by its printed cost, and by what could go wrong. A fix at the source beats a feature or a layer on top.", "Bewerten Sie eine Maßnahme nach der Barriere, die sie beseitigt, und den Gruppen, die sie erreicht, nach ihren gedruckten Kosten und danach, was schiefgehen kann. Eine Behebung an der Quelle schlägt ein Feature oder eine Schicht obendrauf.")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {([["quizBattle", tt("A · Quiz battle", "A · Quiz-Battle")], ["keyboardCaptions", tt("B · Captions and keyboard", "B · Untertitel und Tastatur")], ["language", tt("C · Plain language", "C · Einfache Sprache")]] as const).map(([k, name]) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{name}</p>
            </div>
          ))}
        </div>
        <CostBands
          title={tt(`LearnLoop, three measures: cost against the effort rule and the ${euro(LL.budget)} budget`, `LearnLoop, drei Maßnahmen: Kosten gegen die Aufwandsregel und das Budget von ${euro(LL.budget)}`)}
          bars={[
            { name: tt("A · Quiz battle", "A · Quiz-Battle"), cost: LL.quiz },
            { name: tt("B · Captions and keyboard", "B · Untertitel und Tastatur"), cost: LL.captions },
            { name: tt("C · Plain language", "C · Einfache Sprache"), cost: LL.plain },
          ]}
          budget={LL.budget}
          bands={[
            { to: EFFORT_LOW_MAX + 1, label: tt("Low", "Niedrig") },
            { to: EFFORT_MID_MAX, label: tt("Mid", "Mittel") },
            { to: null, label: tt("High", "Hoch") },
          ]}
        />
        <OptionGrid label={tt(`LearnLoop · budget ${euro(LL.budget)}`, `LearnLoop · Budget ${euro(LL.budget)}`)} caption={tt("Three measures for LearnLoop (Case assumption, example company)", "Drei Maßnahmen für LearnLoop (Fallannahme, Beispielunternehmen)")} rows={rows} cols={cols} selected={sel} onSelect={(k) => { story.leave(); setSel(k); }} />
      </div>
    </Diagram>
  );
}
