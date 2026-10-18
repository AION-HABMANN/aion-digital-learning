"use client";

import { useState } from "react";
import clsx from "clsx";
import { OneInSix } from "@/components/day7/mocks";
import { ChainFig, DecisionFrameFig, MatrixFig } from "@/components/materi/figures";
import type { MatrixPoint } from "@/components/materi/figures";
import { Diagram, Insight, ThePoint } from "@/components/materi/kit";
import { pct, tt } from "@/lib/lang";

/**
 * Day 7 · the teaching diagrams of Materi B (Level 3). Two interactive ones: seven measures by reach and cost, and an average that hides a group. Two static ones:
 * why inclusion is a strategic quality (one in six people, and the chain from rules to long-term quality) and a decision under uncertainty filled in for LearnLoop.
 * The example company is LearnLoop; never InclusiveLearn, so no task is answered here (CLAUDE.md #11, #36, #51, #52).
 */

const Btn = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button type="button" aria-pressed={on} onClick={onClick} className={clsx("btn btn-sm min-h-[40px] border text-left", on ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
    {children}
  </button>
);

/* ------------------------------------------------------------------ B1 · why inclusion is a strategic quality (static) */

export function StrategicChain() {
  return (
    <div className="space-y-3">
      <Diagram
        label={tt("About one in six people lives with a significant disability (WHO 2022)", "Etwa jeder sechste Mensch lebt mit einer erheblichen Behinderung (WHO 2022)")}
        caption={tt("One of six people is marked. Many more meet a temporary or situational limit, which this picture does not count. Reach is something you can measure: count which groups finish and which do not.", "Einer von sechs Menschen ist markiert. Viele mehr erleben eine vorübergehende oder situative Einschränkung, die dieses Bild nicht zählt. Reichweite lässt sich messen: Zählen Sie, welche Gruppen abschließen und welche nicht.")}
      >
        <div className="mx-auto max-w-[420px]">
          <OneInSix />
        </div>
      </Diagram>
      <ChainFig
        label={tt("Why inclusion is a strategic quality, not an add-on: rules and expectations, reach, long-term quality", "Warum Inklusion eine strategische Qualität ist, kein Add-on: Regeln und Erwartungen, Reichweite, langfristige Qualität")}
        caption={tt("Read from left to right. Management reads the first as risk, the second as market and the third as cost over time. The rules are in flux: state the rule, the year and what is unclear.", "Lesen Sie von links nach rechts. Das Management liest das Erste als Risiko, das Zweite als Markt und das Dritte als Kosten über die Zeit. Die Regeln sind im Fluss: Nennen Sie die Regel, das Jahr und was unklar ist.")}
        steps={[
          { h: tt("Rules and expectations", "Regeln und Erwartungen"), b: tt("BFSG for many consumer services since June 2025, BITV 2.0 for public bodies, EN 301 549, and customers who ask for WCAG conformance in tenders.", "BFSG für viele Verbraucherdienste seit Juni 2025, BITV 2.0 für öffentliche Stellen, EN 301 549 und Kunden, die in Ausschreibungen WCAG-Konformität verlangen."), kind: "r", tag: "1" },
          { h: tt("Reach", "Reichweite"), b: tt("About one in six people has a significant disability, and many more meet a temporary or situational limit.", "Etwa jeder sechste Mensch hat eine erhebliche Behinderung, und viele mehr erleben eine vorübergehende oder situative Einschränkung."), kind: "a", tag: "2" },
          { h: tt("Long-term quality", "Langfristige Qualität"), b: tt("Plain language, clear structure and keyboard use help everyone, and retrofitting later is more expensive than building in.", "Einfache Sprache, klare Struktur und Tastaturbedienung helfen allen, und Nachrüsten später ist teurer als Einbauen."), kind: "s", tag: "3" },
        ]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ B2 · seven measures by reach and cost (interactive matrix) */

export function ReachMatrix() {
  const [sel, setSel] = useState<string | null>(null);
  const [spot, setSpot] = useState<string | null>(null);
  const pts: MatrixPoint[] = [
    { id: "a", letter: "A", x: 0.8, y: 0.3, name: tt("Captions and keyboard use for ten courses", "Untertitel und Tastaturbedienung für zehn Kurse"), reading: tt("A moderate cost and a wide reach: it removes two blocking barriers in the most-used courses for deaf learners, keyboard users and learners on a train. A strong place to start.", "Mittlere Kosten und große Reichweite: Es beseitigt zwei blockierende Barrieren in den meistgenutzten Kursen für gehörlose Lernende, Tastaturnutzer und Lernende im Zug. Ein starker Anfang.") },
    { id: "b", letter: "B", x: 0.72, y: 0.14, name: tt("Instructions in plain language", "Anleitungen in einfacher Sprache"), reading: tt("The cheapest measure and a wide reach: readers with difficulties, second-language learners and everyone in a hurry gain. It changes wording, not structure.", "Die günstigste Maßnahme und eine große Reichweite: Lesende mit Schwierigkeiten, Zweitsprachler und alle in Eile profitieren. Sie ändert den Wortlaut, nicht die Struktur.") },
    { id: "c", letter: "C", x: 0.9, y: 0.46, name: tt("Accessibility in the definition of “done”", "Barrierefreiheit in der Definition von „fertig“"), reading: tt("A middle cost with the widest reach over time, because every future release is checked. It is an integration, so it is not a recurring project.", "Mittlere Kosten mit der größten Reichweite über die Zeit, weil jedes künftige Release geprüft wird. Es ist eine Integration, kein wiederkehrendes Projekt.") },
    { id: "d", letter: "D", x: 0.5, y: 0.76, name: tt("A full external audit of every course", "Ein vollständiges externes Audit jedes Kurses"), reading: tt("A high cost for a complete picture. An audit finds problems and fixes none, so its reach comes only after the findings are fixed. Fix the most-used paths first and audit in stages.", "Hohe Kosten für ein vollständiges Bild. Ein Audit findet Probleme und behebt keines, seine Reichweite kommt also erst, wenn die Befunde behoben sind. Beheben Sie zuerst die meistgenutzten Pfade und prüfen Sie in Stufen.") },
    { id: "e", letter: "E", x: 0.18, y: 0.34, name: tt("An accessibility toolbar", "Eine Barrierefreiheits-Toolbar"), reading: tt("It looks cheap and promises reach, but the barriers underneath stay. A layer on top does not fix content and code, so its real reach is small.", "Sie wirkt günstig und verspricht Reichweite, aber die Barrieren darunter bleiben. Eine Schicht obendrauf behebt weder Inhalt noch Code, ihre tatsächliche Reichweite ist also klein.") },
    { id: "f", letter: "F", x: 0.1, y: 0.9, name: tt("A new quiz-battle feature", "Ein neues Quiz-Battle-Feature"), reading: tt("A high cost and almost no reach for excluded groups: it is a visible new feature for people who are already in, and a drag-based game could add new barriers.", "Hohe Kosten und fast keine Reichweite für ausgeschlossene Gruppen: Es ist ein sichtbares neues Feature für Menschen, die schon drin sind, und ein Ziehspiel könnte neue Barrieren schaffen.") },
    { id: "g", letter: "G", x: 0.34, y: 0.84, name: tt("Two more languages", "Zwei weitere Sprachen"), reading: tt("A high cost and reach in another way: it adds learners who read other languages, but it removes none of the barriers the excluded groups meet today.", "Hohe Kosten und Reichweite auf anderem Weg: Es erreicht Lernende, die andere Sprachen lesen, beseitigt aber keine der Barrieren, auf die die ausgeschlossenen Gruppen heute treffen.") },
  ];
  return (
    <Diagram label={tt("A worked example: LearnLoop's seven measures by reach and cost · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoops sieben Maßnahmen nach Reichweite und Kosten · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("Inclusion is cheaper built in than bolted on, but it competes with new features for a limited budget. Weigh reach against cost, start with the cheapest and broadest measure, and say what waits.", "Inklusion ist eingebaut billiger als aufgesetzt, konkurriert aber mit neuen Features um ein begrenztes Budget. Wägen Sie Reichweite gegen Kosten ab, beginnen Sie mit der günstigsten und breitesten Maßnahme und sagen Sie, was wartet.")}</ThePoint>
        <MatrixFig
          title={tt("Seven measures of LearnLoop by reach (to the right) and cost and effort (upwards)", "Sieben Maßnahmen von LearnLoop nach Reichweite (nach rechts) und Kosten und Aufwand (nach oben)")}
          xLabel={tt("Reach: how many learners it opens the platform to", "Reichweite: für wie viele Lernende sie die Plattform öffnet")}
          yLabel={tt("Cost and effort", "Kosten und Aufwand")}
          quads={[tt("Costly, reaches few", "Teuer, erreicht wenige"), tt("Costly, reaches many", "Teuer, erreicht viele"), tt("Cheap, reaches few", "Günstig, erreicht wenige"), tt("Cheap, reaches many: start here", "Günstig, erreicht viele: hier beginnen")]}
          points={pts}
          selected={sel}
          onSelect={(id) => {
            setSpot(null);
            setSel(id);
          }}
          spot={spot}
        />
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B3 · an average hides a group (interactive) */

type Grp = { id: string; name: () => string; share: number; success: number };
const GROUPS: Grp[] = [
  { id: "mouse", name: () => tt("Learners with a mouse and a screen", "Lernende mit Maus und Bildschirm"), share: 88, success: 93 },
  { id: "keys", name: () => tt("Keyboard-only learners", "Lernende nur mit Tastatur"), share: 6, success: 58 },
  { id: "reader", name: () => tt("Screen reader users", "Screenreader-Nutzer"), share: 3, success: 41 },
  { id: "zoom", name: () => tt("Learners who enlarge the text", "Lernende, die den Text vergrößern"), share: 3, success: 60 },
];
const AVG = Math.round(GROUPS.reduce((s, g) => s + (g.share * g.success) / 100, 0));

export function AverageHides() {
  const [by, setBy] = useState(false);
  const worst = [...GROUPS].sort((a, b) => a.success - b.success)[0];
  const bar = (label: string, v: number, strong?: boolean, note?: string) => (
    <div key={label} className="grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)_3rem] items-center gap-2 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_3rem]">
      <span className="text-caption text-ink">{label}{note && <span className="block text-micro normal-case tracking-normal text-ash">{note}</span>}</span>
      <span className="relative block h-5 rounded bg-mist" role="img" aria-label={`${label}: ${pct(v)}`}>
        <span className={clsx("absolute inset-y-0 left-0 rounded", strong ? "bg-accent" : "bg-[#2B5F8E]")} style={{ width: `${v}%` }} />
        {by && !strong && <span aria-hidden className="absolute inset-y-[-3px] border-l-2 border-dashed border-ink" style={{ left: `${AVG}%` }} />}
      </span>
      <span className="text-right text-caption font-semibold tabular-nums text-ink">{pct(v)}</span>
    </div>
  );
  return (
    <Diagram label={tt("An average that hides a group: LearnLoop's task success, as one number and by group · Exploratory · Case assumption", "Ein Durchschnitt, der eine Gruppe verbirgt: LearnLoops Aufgabenerfolg, als eine Zahl und pro Gruppe · Explorativ · Fallannahme")}>
      <div className="space-y-3">
        <ThePoint>{tt("An average can look healthy while a small group cannot use the platform at all. Read every KPI by group, and pair a method that shows how many with a method that shows why.", "Ein Durchschnitt kann gesund aussehen, während eine kleine Gruppe die Plattform gar nicht nutzen kann. Lesen Sie jeden KPI pro Gruppe und verbinden Sie eine Methode, die zeigt, wie viele, mit einer, die zeigt, warum.")}</ThePoint>
        <div role="radiogroup" aria-label={tt("How the KPI is read", "Wie der KPI gelesen wird")} className="flex flex-wrap gap-2">
          <Btn on={!by} onClick={() => { setBy(false); }}>{tt("The average", "Der Durchschnitt")}</Btn>
          <Btn on={by} onClick={() => { setBy(true); }}>{tt("By group", "Pro Gruppe")}</Btn>
        </div>
        <div className={clsx("space-y-2 rounded-lg border border-line bg-paper p-3")}>
          <p className="smallcaps">{tt("Task success: the share who finish the main task", "Aufgabenerfolg: der Anteil, der die Hauptaufgabe abschließt")}</p>
          {!by && bar(tt("All learners together", "Alle Lernenden zusammen"), AVG, true)}
          {by && GROUPS.map((g) => bar(g.name(), g.success, false, tt(`${g.share} of every 100 learners`, `${g.share} von je 100 Lernenden`)))}
          {by && <p className="text-micro normal-case tracking-normal text-ash">{tt(`The dashed line marks the average of ${pct(AVG)}.`, `Die gestrichelte Linie markiert den Durchschnitt von ${pct(AVG)}.`)}</p>}
        </div>
        <Insight>
          {by
            ? tt(`In plain words: read by group, the same data show that ${worst.name().toLowerCase()} finish only ${pct(worst.success)} of the time, ${AVG - worst.success} points below the average, although they are only ${worst.share} of every 100 learners. The numbers say how many are blocked; they do not say why, which a test with these learners would show. The figures are made up for the example.`, `In einfachen Worten: pro Gruppe gelesen zeigen dieselben Daten, dass ${worst.name()} nur zu ${pct(worst.success)} abschließen, ${AVG - worst.success} Punkte unter dem Durchschnitt, obwohl sie nur ${worst.share} von je 100 Lernenden sind. Die Zahlen sagen, wie viele blockiert sind; sie sagen nicht, warum, das würde ein Test mit diesen Lernenden zeigen. Die Zahlen sind für das Beispiel erfunden.`)
            : tt(`In plain words: ${pct(AVG)} of all learners finish the main task, which sounds healthy. It is true, and it is weighted by the ${GROUPS[0].share} of every 100 learners who have no barrier, so it cannot show who is stuck. The figures are made up for the example.`, `In einfachen Worten: ${pct(AVG)} aller Lernenden schließen die Hauptaufgabe ab, was gesund klingt. Das stimmt, und es wird von den ${GROUPS[0].share} von je 100 Lernenden gewichtet, die keine Barriere haben, kann also nicht zeigen, wer feststeckt. Die Zahlen sind für das Beispiel erfunden.`)}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B3 · a decision under uncertainty, filled in for LearnLoop (static) */

export function DecisionFrame() {
  return (
    <DecisionFrameFig
      label={tt("A decision without complete user data, filled in for LearnLoop", "Eine Entscheidung ohne vollständige Nutzerdaten, für LearnLoop ausgefüllt")}
      caption={tt("The four boxes make a decision checkable. The two boxes below are the rule that makes future decisions less dependent on one person's interest. The figures are made up for the example.", "Die vier Kästen machen eine Entscheidung überprüfbar. Die zwei Kästen darunter sind die Regel, die künftige Entscheidungen weniger vom Interesse einer einzelnen Person abhängig macht. Die Zahlen sind für das Beispiel erfunden.")}
      boxes={[
        [tt("I decide", "Ich entscheide"), tt("To add captions and keyboard use to the five most-used courses first.", "Zuerst den fünf meistgenutzten Kursen Untertitel und Tastaturbedienung hinzuzufügen.")],
        [tt("I do not know", "Ich weiß nicht"), tt("How many learners need them, because the platform does not record it.", "Wie viele Lernende sie brauchen, weil die Plattform es nicht erfasst.")],
        [tt("I reverse if", "Ich nehme zurück, wenn"), tt("Task success of the tested learners in those courses has not risen from 50% to 70% by the end of the second quarter.", "der Aufgabenerfolg der getesteten Lernenden in diesen Kursen bis Ende des zweiten Quartals nicht von 50 % auf 70 % gestiegen ist.")],
        [tt("I give up", "Ich verzichte auf"), tt("The new quiz-battle feature for this half year.", "das neue Quiz-Battle-Feature in diesem Halbjahr.")],
      ]}
      rule={[
        [tt("Who decides", "Wer entscheidet"), tt("The accessibility lead with the head of product.", "Die Leiterin Barrierefreiheit mit der Leiterin Produkt.")],
        [tt("On what evidence", "Auf welcher Grundlage"), tt("Tests per group, task success by group and audit findings.", "Tests pro Gruppe, Aufgabenerfolg pro Gruppe und Audit-Befunde.")],
      ]}
    />
  );
}
