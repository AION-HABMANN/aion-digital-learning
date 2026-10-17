"use client";

import { useState } from "react";
import clsx from "clsx";
import { OptionGrid } from "@/components/day1/diagrams";
import type { GridRow } from "@/components/day1/diagrams";
import { ContextScene, KanoChart, MeasureThumb, MistakeScreen, PlatformHome } from "@/components/day5/mocks";
import type { Mistakes3 } from "@/components/day5/mocks";
import { CostBands, MatrixFig } from "@/components/materi/figures";
import type { MatrixPoint } from "@/components/materi/figures";
import { Diagram, Insight, ThePoint } from "@/components/materi/kit";
import { MISTAKES, MISTAKE_IDS } from "@/data/day5/case";
import type { MistakeId } from "@/data/day5/case";
import { Gloss } from "@/lib/glossify";
import { tt } from "@/lib/lang";

/**
 * Day 5 · the teaching diagrams of Materi A. Interactive ones (the same home screen decided two ways, the three mistakes switched on and off, the methods matrix,
 * LearnLoop weighing three ideas) carry "The point" and an always-visible "What this shows" (CLAUDE.md #20, #36, #51). The static ones are
 * drawn pictures (#52). Example companies and people: LearnLoop (an online-course provider), Mia and Noor; never LearnBase, so no task is answered here.
 */

const Btn = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button type="button" aria-pressed={on} onClick={onClick} className={clsx("btn btn-sm min-h-[40px] border", on ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
    {children}
  </button>
);

/* ------------------------------------------------------------------ A1 · the same home screen, decided two ways (interactive) */

export function FeatureVsUser() {
  const [mode, setMode] = useState<"features" | "tasks">("features");
  return (
    <Diagram label={tt("The same home screen, decided by features and decided by learner tasks · Exploratory · Case assumption", "Derselbe Startbildschirm, nach Features und nach Aufgaben der Lernenden entschieden · Explorativ · Fallannahme")}>
      <div className="space-y-3">
        <ThePoint>{tt("A feature-driven platform is built from what the software can do. A user-centred one is built from what learners need to do, and the screen shows it.", "Eine funktionsgetriebene Plattform wird aus dem gebaut, was die Software kann. Eine nutzerzentrierte wird aus dem gebaut, was Lernende tun müssen, und der Bildschirm zeigt es.")}</ThePoint>
        <div role="radiogroup" aria-label={tt("How the screen was decided", "Wie der Bildschirm entschieden wurde")} className="flex flex-wrap gap-2">
          <Btn on={mode === "features"} onClick={() => { setMode("features"); }}>{tt("Decided by features", "Nach Features entschieden")}</Btn>
          <Btn on={mode === "tasks"} onClick={() => { setMode("tasks"); }}>{tt("Decided by learner tasks", "Nach Aufgaben der Lernenden entschieden")}</Btn>
        </div>
        <div className={"mx-auto w-full max-w-[420px]"}>
          <PlatformHome mode={mode} />
        </div>
        <Insight>
          {mode === "features"
            ? tt("In plain words: every entry in this menu names something the software has, so a learner who wants to carry on has to guess which one it is. Nobody decided this on purpose: each entry was added for a department. The figures and names are made up for the example.", "In einfachen Worten: Jeder Eintrag in diesem Menü nennt etwas, das die Software hat; wer weitermachen will, muss also raten, welcher es ist. Niemand hat das absichtlich so entschieden: Jeder Eintrag wurde für eine Abteilung ergänzt. Die Zahlen und Namen sind für das Beispiel erfunden.")
            : tt("In plain words: every entry here names something a learner wants to do, and the first thing, carrying on, is the biggest thing on the screen. The functions behind the screen have not changed; only the question that decided it has.", "In einfachen Worten: Jeder Eintrag nennt hier etwas, das eine Lernende tun will, und das Erste, das Weitermachen, ist das Größte auf dem Bildschirm. Die Funktionen hinter dem Bildschirm haben sich nicht geändert; geändert hat sich nur die Frage, die ihn entschieden hat.")}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A1 · the Kano model (static) */

export function KanoPicture() {
  return (
    <Diagram
      label={tt("The Kano model: three kinds of quality", "Das Kano-Modell: drei Arten von Qualität")}
      caption={tt("Kano and colleagues (1984) described three kinds of quality. A basic that is missing makes people unhappy; one that works goes unnoticed. Speed pays off in proportion. A pleasant surprise is not missed when absent. More features cannot rescue a weak basic.", "Kano und Kollegen (1984) beschrieben drei Arten von Qualität. Eine fehlende Grundlage macht Menschen unzufrieden; eine, die funktioniert, bleibt unbemerkt. Geschwindigkeit zahlt sich proportional aus. Eine angenehme Überraschung wird nicht vermisst, wenn sie fehlt. Mehr Features können eine schwache Grundlage nicht retten.")}
    >
      <KanoChart />
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A2 · four contexts of use, as scenes (static) */

export function ContextScenes() {
  const items: [ContextKind4, string, string][] = [
    ["train", tt("On a phone, on a train", "Auf dem Handy, im Zug"), tt("One hand, a short stretch of time and a poor connection: short units, large targets, progress saved at once.", "Eine Hand, ein kurzes Stück Zeit und eine schlechte Verbindung: kurze Einheiten, große Ziele, Fortschritt sofort gespeichert.")],
    ["desk", tt("At a desk, between two meetings", "Am Schreibtisch, zwischen zwei Terminen"), tt("Ten minutes and a head full of other things: a clear way to resume, and units that can end anywhere.", "Zehn Minuten und ein Kopf voller anderer Dinge: ein klarer Weg weiterzumachen und Einheiten, die überall enden können.")],
    ["weekend", tt("An intensive weekend", "Ein Intensivwochenende"), tt("Hours at a stretch: an overview of the whole path, room for breaks, and a sign of how far you have come.", "Stunden am Stück: ein Überblick über den ganzen Weg, Raum für Pausen und ein Zeichen, wie weit man gekommen ist.")],
    ["mandatory", tt("A mandatory course with a deadline", "Ein verpflichtender Kurs mit Frist"), tt("Little choice about whether to learn: show the path and the deadline, and do not assume motivation.", "Wenig Wahl, ob man lernt: Weg und Frist zeigen und keine Motivation voraussetzen.")],
  ];
  return (
    <Diagram
      label={tt("Four contexts of use, each drawn as a small scene, with what the design must allow", "Vier Nutzungskontexte, jeweils als kleine Szene gezeichnet, mit dem, was das Design erlauben muss")}
      caption={tt("The same learner can be in any of these on different days. A good design works in all of them, and a goal such as “carry on with my course” looks different in each.", "Dieselbe Lernende kann an verschiedenen Tagen in jedem davon sein. Ein gutes Design funktioniert in allen, und ein Ziel wie „meinen Kurs fortsetzen“ sieht in jedem anders aus.")}
    >
      <div className="mx-auto grid max-w-[720px] grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map(([k, name, rule]) => (
          <div key={k} className="space-y-1">
            <ContextScene kind={k} />
            <p className="text-caption font-bold text-ink">{name}</p>
            <p className="text-micro normal-case tracking-normal text-ink">{rule}</p>
          </div>
        ))}
      </div>
    </Diagram>
  );
}
type ContextKind4 = "train" | "desk" | "weekend" | "mandatory";

/* ------------------------------------------------------------------ A3 · Mia's home screen with the three mistakes switched on and off (interactive) */

const ALL_ON: Mistakes3 = { functions: true, complex: true, orientation: true };
const ALL_OFF: Mistakes3 = { functions: false, complex: false, orientation: false };

export function MistakeBuilder() {
  const [on, setOn] = useState<Mistakes3>(ALL_ON);
  const count = MISTAKE_IDS.filter((k) => on[k]).length;
  const toggle = (k: MistakeId) => setOn((s) => ({ ...s, [k]: !s[k] }));
  return (
    <Diagram label={tt("A home screen that gains and loses the three typical mistakes · Exploratory · Case assumption", "Ein Startbildschirm, der die drei typischen Fehler bekommt und verliert · Explorativ · Fallannahme")}>
      <div className="space-y-3">
        <ThePoint>{tt("Three mistakes recur on platforms built without the user in mind: names after the software, too many choices at once, and no sign of where you are. Each one is visible on the screen, and each can be tested with one question.", "Drei Fehler kehren auf Plattformen wieder, die ohne Blick auf die Nutzer gebaut wurden: Namen nach der Software, zu viele Auswahlmöglichkeiten auf einmal und kein Zeichen, wo man ist. Jeder ist auf dem Bildschirm sichtbar, und jeder lässt sich mit einer Frage prüfen.")}</ThePoint>
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-start">
          <div role="group" aria-label={tt("The three mistakes", "Die drei Fehler")} className="grid gap-2">
            {MISTAKE_IDS.map((k) => (
              <button key={k} type="button" aria-pressed={on[k]} onClick={() => { toggle(k); }} className={clsx("min-h-[44px] rounded-lg border px-3 py-2 text-left text-caption transition-colors", on[k] ? "border-accent bg-accentSoft ring-2 ring-gold" : "border-line bg-paper hover:border-ash")}>
                <span className="font-semibold text-ink"><span aria-hidden className="mr-1.5">{on[k] ? "☑" : "☐"}</span>{MISTAKES[k].label}</span>
                <span className="block pl-5 text-ash">{on[k] ? tt("on the screen", "auf dem Bildschirm") : tt("repaired", "behoben")} · {MISTAKES[k].test}</span>
              </button>
            ))}
          </div>
          <div className={"mx-auto w-full max-w-[420px]"}>
            <MistakeScreen on={on} />
          </div>
        </div>
        <Insight>
          {count === 3
            ? tt("In plain words: all three mistakes are on the screen, so the learner cannot read the menu, cannot choose from it, and does not know where they are. Switch one off to see which part of the trouble it explains.", "In einfachen Worten: Alle drei Fehler sind auf dem Bildschirm, die Lernende kann das Menü also nicht lesen, nicht daraus wählen und weiß nicht, wo sie ist. Schalten Sie einen aus, um zu sehen, welchen Teil der Schwierigkeit er erklärt.")
            : count === 0
              ? tt("In plain words: none of the three mistakes is on the screen. The names say what a learner can do, there are three things to choose from, and a path and a resume card say where you are and what is next. Nothing about the content or the functions changed.", "In einfachen Worten: Keiner der drei Fehler ist auf dem Bildschirm. Die Namen sagen, was eine Lernende tun kann, es gibt drei Dinge zur Auswahl, und ein Pfad und eine Fortsetzen-Karte sagen, wo man ist und was kommt. Am Inhalt und an den Funktionen hat sich nichts geändert.")
              : tt(`In plain words: ${count} of the three mistakes are still on the screen: ${MISTAKE_IDS.filter((k) => on[k]).map((k) => MISTAKES[k].label).join(", ")}. The learner meets exactly those. Ask the test question under each switch of any screen you review.`, `In einfachen Worten: ${count} der drei Fehler sind noch auf dem Bildschirm: ${MISTAKE_IDS.filter((k) => on[k]).map((k) => MISTAKES[k].label).join(", ")}. Genau auf diese trifft die Lernende. Stellen Sie die Testfrage unter jedem Schalter bei jedem Bildschirm, den Sie prüfen.`)}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A4 · methods, by what they tell you and how many people (interactive matrix; Optional card) */

export function MethodsMatrix() {
  const [sel, setSel] = useState<string | null>(null);
  const [spot, setSpot] = useState<string | null>(null);
  const pts: MatrixPoint[] = [
    { id: "a", letter: "A", x: 0.12, y: 0.12, name: tt("Interviews", "Interviews"), reading: tt("A few people say, in their own words, why they leave. You get reasons, but only what people can put into words, and only from a few.", "Wenige Menschen sagen in eigenen Worten, warum sie gehen. Sie bekommen Gründe, aber nur, was Menschen in Worte fassen können, und nur von wenigen.") },
    { id: "b", letter: "B", x: 0.22, y: 0.88, name: tt("A survey", "Eine Umfrage"), reading: tt("Many people say how satisfied they are. You get counts of opinions, but not why, and not what they actually did.", "Viele Menschen sagen, wie zufrieden sie sind. Sie bekommen Zählungen von Meinungen, aber nicht, warum, und nicht, was sie tatsächlich taten.") },
    { id: "c", letter: "C", x: 0.84, y: 0.14, name: tt("A usability test", "Ein Usability-Test"), reading: tt("A few people try a task while you watch. You see where they hesitate and click wrongly: what people do, with reasons you can ask for.", "Wenige Menschen probieren eine Aufgabe, während Sie zusehen. Sie sehen, wo sie zögern und falsch klicken: was Menschen tun, mit Gründen, nach denen Sie fragen können.") },
    { id: "d", letter: "D", x: 0.9, y: 0.9, name: tt("Usage analytics", "Nutzungs-Analytics"), reading: tt("The platform records what thousands of people did. You get exact counts of behaviour, but no reasons.", "Die Plattform zeichnet auf, was Tausende von Menschen taten. Sie bekommen genaue Zählungen des Verhaltens, aber keine Gründe.") },
    { id: "e", letter: "E", x: 0.72, y: 0.34, name: tt("Observation in context", "Beobachtung im Kontext"), reading: tt("You watch a few learners where they really learn, on a phone or at a desk. You see the situation, not just the screen.", "Sie beobachten wenige Lernende dort, wo sie wirklich lernen, auf dem Handy oder am Schreibtisch. Sie sehen die Situation, nicht nur den Bildschirm.") },
  ];
  return (
    <Diagram label={tt("A worked example: five methods by what they tell you and how many people they reach · Exploratory", "Ein durchgerechnetes Beispiel: fünf Methoden danach, was sie Ihnen sagen und wie viele Menschen sie erreichen · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("Methods differ in what they tell you. Interviews and surveys show what people say; tests, observation and analytics show what people do. Small studies give reasons, large ones give counts, and you often need both.", "Methoden unterscheiden sich darin, was sie Ihnen sagen. Interviews und Umfragen zeigen, was Menschen sagen; Tests, Beobachtung und Analytics zeigen, was Menschen tun. Kleine Studien liefern Gründe, große Zählungen, und oft brauchen Sie beides.")}</ThePoint>
        <MatrixFig
          title={tt("Five methods by what they tell you (to the right: what people do) and how many people they reach (upwards)", "Fünf Methoden danach, was sie Ihnen sagen (nach rechts: was Menschen tun) und wie viele Menschen sie erreichen (nach oben)")}
          xLabel={tt("From what people say to what people do", "Von dem, was Menschen sagen, zu dem, was Menschen tun")}
          yLabel={tt("How many people", "Wie viele Menschen")}
          quads={[tt("Many people say", "Viele sagen"), tt("Many people do", "Viele tun"), tt("A few say", "Wenige sagen"), tt("A few do", "Wenige tun")]}
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

/* ------------------------------------------------------------------ A5 · LearnLoop weighs three ideas (interactive) */

export function WeighExample() {
  const [sel, setSel] = useState<string | null>(null);
  const rows: GridRow[] = [
    { id: "w1", name: tt("A chat window", "Ein Chat-Fenster"), sub: tt("€24,000", "24.000 €"), cells: {
      value: { level: 2, reason: tt("It helps some learners who are already stuck, but only if they find it on a crowded screen.", "Es hilft einigen Lernenden, die schon feststecken, aber nur, wenn sie es auf einem vollen Bildschirm finden.") },
      effort: { level: 3, note: tt("€24,000", "24.000 €"), reason: tt("€24,000 is above €20,000: High.", "24.000 € liegen über 20.000 €: Hoch.") },
      risk: { level: 2, reason: tt("Someone must answer the chat every day, and a chat nobody answers is worse than none.", "Jemand muss den Chat jeden Tag beantworten, und ein Chat, den niemand beantwortet, ist schlechter als keiner.") },
    } },
    { id: "w2", name: tt("A menu rebuilt around tasks", "Ein um Aufgaben herum gebautes Menü"), sub: tt("€12,000", "12.000 €"), cells: {
      value: { level: 3, reason: tt("It answers the trouble learners really have: finding their course and the next step.", "Es beantwortet die Schwierigkeit, die Lernende wirklich haben: ihren Kurs und den nächsten Schritt zu finden.") },
      effort: { level: 2, note: tt("€12,000", "12.000 €"), reason: tt("€12,000 lies between €10,000 and €20,000: Mid.", "12.000 € liegen zwischen 10.000 € und 20.000 €: Mittel.") },
      risk: { level: 1, reason: tt("It takes nothing away and can be adjusted after a test.", "Es nimmt nichts weg und lässt sich nach einem Test anpassen.") },
    } },
    { id: "w3", name: tt("Ten new courses", "Zehn neue Kurse"), sub: tt("€32,000", "32.000 €"), cells: {
      value: { level: 1, reason: tt("More to choose from makes finding the right course harder, not easier.", "Mehr Auswahl macht das Finden des richtigen Kurses schwerer, nicht leichter.") },
      effort: { level: 3, note: tt("€32,000", "32.000 €"), reason: tt("€32,000 is above €20,000: High.", "32.000 € liegen über 20.000 €: Hoch.") },
      risk: { level: 3, reason: tt("Most of the budget goes into content before the finding problem is solved.", "Der größte Teil des Budgets geht in Inhalt, bevor das Problem des Findens gelöst ist.") },
    } },
  ];
  const cols = [
    { id: "value", label: tt("User value", "Nutzerwert") },
    { id: "effort", label: tt("Effort", "Aufwand") },
    { id: "risk", label: tt("Risk", "Risiko") },
  ];
  return (
    <Diagram label={tt("A worked example: LearnLoop weighs three ideas · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei Ideen ab · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("Rate each measure on the same three questions: how much it helps the learner, what it costs, and what could go wrong. Then say what the business gets, because management weighs that fourth question too.", "Bewerten Sie jede Maßnahme mit denselben drei Fragen: wie sehr sie der Lernenden hilft, was sie kostet und was schiefgehen könnte. Sagen Sie dann, was das Unternehmen bekommt, denn das Management wägt auch diese vierte Frage ab.")}</ThePoint>
        <div className="mx-auto grid max-w-[560px] grid-cols-3 gap-2">
          {([["chat", tt("A · A chat window", "A · Ein Chat-Fenster")], ["menuTasks", tt("B · A menu around tasks", "B · Ein Menü um Aufgaben")], ["courses", tt("C · Ten new courses", "C · Zehn neue Kurse")]] as const).map(([k, name]) => (
            <div key={k}>
              <MeasureThumb kind={k} />
              <p className="mt-1 text-caption font-semibold text-ink">{name}</p>
            </div>
          ))}
        </div>
        <CostBands
          title={tt("LearnLoop, three ideas: cost against the effort rule and the €50,000 budget", "LearnLoop, drei Ideen: Kosten gegen die Aufwandsregel und das Budget von 50.000 €")}
          bars={[
            { name: tt("A · Chat window", "A · Chat-Fenster"), cost: 24000 },
            { name: tt("B · Menu around tasks", "B · Menü um Aufgaben"), cost: 12000 },
            { name: tt("C · Ten new courses", "C · Zehn neue Kurse"), cost: 32000 },
          ]}
          budget={50000}
          bands={[
            { to: 10000, label: tt("Low", "Niedrig") },
            { to: 20000, label: tt("Mid", "Mittel") },
            { to: null, label: tt("High", "Hoch") },
          ]}
        />
        <OptionGrid label={tt("LearnLoop · budget €50,000", "LearnLoop · Budget 50.000 €")} caption={tt("Three ideas for LearnLoop (Case assumption, example company)", "Drei Ideen für LearnLoop (Fallannahme, Beispielunternehmen)")} rows={rows} cols={cols} selected={sel} onSelect={(k) => { setSel(k); }} />
        <p className="rounded-md border border-line bg-canvas px-3 py-2 text-caption text-ink">
          <span className="smallcaps mr-1.5">{tt("What the business gets", "Was das Unternehmen bekommt")}</span>
          <Gloss>{tt("A: little that lasts. B: fewer first-week drop-outs, slowly but steadily. C: a longer catalogue, but not more finished courses.", "A: wenig, das bleibt. B: weniger Abbrüche in der ersten Woche, langsam, aber stetig. C: ein längerer Katalog, aber nicht mehr abgeschlossene Kurse.")}</Gloss>
        </p>
      </div>
    </Diagram>
  );
}
