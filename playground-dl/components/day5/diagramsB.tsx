"use client";

import { useState } from "react";
import clsx from "clsx";
import { Arrow, DARK, LINE, LITE, MID, Svg, Tick, Txt } from "@/components/day/mockKit";
import { DecisionFrameFig } from "@/components/materi/figures";
import { Diagram, Insight, ThePoint } from "@/components/materi/kit";
import { Gloss } from "@/lib/glossify";
import { tt } from "@/lib/lang";

/**
 * Day 5 · the teaching diagrams of Materi B (Level 3). Three interactive ones: a user need followed through the UX decision to the business figure, the three goals
 * that collide with four typical conflicts, and the gate a feature request must pass. One static one: a decision under uncertainty filled in for LearnLoop. The
 * example company is LearnLoop; never LearnBase, so no task is answered here (CLAUDE.md #11, #36, #51, #52).
 */

const Btn = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button type="button" aria-pressed={on} onClick={onClick} className={clsx("btn btn-sm min-h-[40px] border text-left", on ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
    {children}
  </button>
);

/* ------------------------------------------------------------------ B1 · a need, the UX decision, the business figure (interactive) */

type NeedId = "n1" | "n2" | "n3" | "n4";
const NEEDS: NeedId[] = ["n1", "n2", "n3", "n4"];
const chain = (id: NeedId) =>
  ({
    n1: { need: tt("Find my course", "Meinen Kurs finden"), who: tt("A learner who has just enrolled wants to find the course in a few seconds.", "Eine Lernende, die sich gerade angemeldet hat, will den Kurs in wenigen Sekunden finden."), decision: tt("One search with three filters and one list of courses", "Eine Suche mit drei Filtern und einer Liste von Kursen"), figure: tt("Learners who start a course in their first visit", "Lernende, die in ihrem ersten Besuch einen Kurs starten"), money: tt("Fewer sign-ups that never start: better use of what each sign-up cost.", "Weniger Anmeldungen, die nie beginnen: bessere Nutzung dessen, was jede Anmeldung gekostet hat.") },
    n2: { need: tt("Know what to do next", "Wissen, was als Nächstes kommt"), who: tt("A learner who comes back after three days wants to carry on without searching.", "Eine Lernende, die nach drei Tagen zurückkommt, will weitermachen, ohne zu suchen."), decision: tt("A “Continue” card at the top of the home screen", "Eine „Weitermachen“-Karte oben auf dem Startbildschirm"), figure: tt("The share of learners who return within seven days", "Der Anteil der Lernenden, die innerhalb von sieben Tagen zurückkehren"), money: tt("Fewer drop-outs in the first weeks, so more courses are finished and renewed.", "Weniger Abbrüche in den ersten Wochen, also werden mehr Kurse abgeschlossen und verlängert.") },
    n3: { need: tt("Understand the words", "Die Wörter verstehen"), who: tt("A learner who meets a button wants to know what it does before pressing it.", "Eine Lernende, die auf einen Button trifft, will wissen, was er tut, bevor sie ihn drückt."), decision: tt("Labels in the learner's words, such as “Start course”", "Beschriftungen in den Worten der Lernenden, etwa „Kurs starten“"), figure: tt("Support requests per hundred learners", "Support-Anfragen pro hundert Lernende"), money: tt("Fewer questions to the support team, which costs less to run.", "Weniger Fragen an das Support-Team, das weniger kostet.") },
    n4: { need: tt("Trust that my progress is kept", "Darauf vertrauen, dass mein Fortschritt gespeichert ist"), who: tt("A learner who stops mid-lesson wants to find the same place next time.", "Eine Lernende, die mitten in einer Lektion aufhört, will beim nächsten Mal dieselbe Stelle finden."), decision: tt("Progress saved automatically and shown in every list", "Fortschritt automatisch gespeichert und in jeder Liste gezeigt"), figure: tt("The completion rate of started courses", "Die Abschlussquote begonnener Kurse"), money: tt("More finished courses, which is what customers pay for.", "Mehr abgeschlossene Kurse, wofür Kunden zahlen.") },
  })[id];

export function NeedChain() {
  const [sel, setSel] = useState<NeedId>("n2");
  const [shown, setShown] = useState<0 | 1 | 2 | 3>(3);
  const c = chain(sel);
  const boxes: [string, string, string][] = [
    [tt("User need", "Nutzerbedürfnis"), c.need, c.who],
    [tt("UX decision", "UX-Entscheidung"), c.decision, tt("A change to the platform that serves that need.", "Eine Änderung an der Plattform, die dieses Bedürfnis bedient.")],
    [tt("Business figure", "Geschäftszahl"), c.figure, c.money],
  ];
  return (
    <Diagram label={tt("From a user need to the figure the business watches · Exploratory · Case assumption (LearnLoop)", "Von einem Nutzerbedürfnis zur Zahl, die das Unternehmen beobachtet · Explorativ · Fallannahme (LearnLoop)")}>
      <div className="space-y-3">
        <ThePoint>{tt("A user need gets funded when it is said in the company's own terms: who the user is, what they want to do, and which figure the company watches moves.", "Ein Nutzerbedürfnis wird finanziert, wenn es in den Begriffen des Unternehmens gesagt wird: wer der Nutzer ist, was er tun will und welche Zahl, die das Unternehmen beobachtet, sich bewegt.")}</ThePoint>
        <div role="radiogroup" aria-label={tt("A user need of LearnLoop", "Ein Nutzerbedürfnis von LearnLoop")} className="grid gap-2 sm:grid-cols-2">
          {NEEDS.map((n) => (
            <Btn key={n} on={sel === n} onClick={() => { setSel(n); setShown(3); }}>
              {chain(n).need}
            </Btn>
          ))}
        </div>
        <ol className={"flex flex-col gap-1.5 md:flex-row md:items-stretch md:gap-0"}>
          {boxes.map(([tag, h, b], i) => (
            <li key={tag} className="flex flex-col items-stretch gap-1.5 md:min-w-0 md:flex-1 md:flex-row md:items-center md:gap-0">
              <div className={clsx("h-full min-w-0 flex-1 rounded-lg border-2 p-2.5", i < shown ? (i === 1 ? "border-signal/60 bg-signalSoft" : i === 2 ? "border-ash/50 bg-mist" : "border-accent/60 bg-accentSoft") : "border-dashed border-line bg-paper opacity-50")}>
                <p className="smallcaps text-ash">{tag}</p>
                <p className="text-body font-semibold text-ink">{i < shown ? h : "…"}</p>
                <p className="mt-0.5 text-caption text-ink">{i < shown ? <Gloss>{b}</Gloss> : tt("not said yet", "noch nicht gesagt")}</p>
              </div>
              {i < boxes.length - 1 && (
                <span aria-hidden className="self-center text-lg text-ash md:px-1">
                  <span className="md:hidden">↓</span>
                  <span className="hidden md:inline">→</span>
                </span>
              )}
            </li>
          ))}
        </ol>
        <Insight>
          {shown < 3
            ? tt("In plain words: the need alone is true but cannot be funded, because it names no figure the company already watches. Press “Next” to see it said in business terms.", "In einfachen Worten: Das Bedürfnis allein stimmt, lässt sich aber nicht finanzieren, weil es keine Zahl nennt, die das Unternehmen ohnehin beobachtet. Drücken Sie „Weiter“, um es in Geschäftsbegriffen zu sehen.")
            : tt(`In plain words: “${c.need}” leads to the decision “${c.decision}”, and the company hears it as “${c.figure}”. Saying all three together is what gets a need onto the roadmap. The details are made up for the example.`, `In einfachen Worten: „${c.need}“ führt zur Entscheidung „${c.decision}“, und das Unternehmen hört es als „${c.figure}“. Alle drei zusammen zu sagen bringt ein Bedürfnis auf die Roadmap. Die Einzelheiten sind für das Beispiel erfunden.`)}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B2 · three goals and four typical conflicts (interactive) */

type Side = "user" | "business" | "tech";
type ConflictId = "c1" | "c2" | "c3" | "c4" | "c5";
const CONFLICTS: ConflictId[] = ["c1", "c2", "c3", "c4", "c5"];
const conflict = (id: ConflictId): { name: string; serves: Side[]; user: string; business: string; tech: string } =>
  ({
    c1: { name: tt("A feature the sales team asked for", "Ein Feature, das der Vertrieb verlangt hat"), serves: ["business"] as Side[], user: tt("Loses: one more entry on a screen that is already full.", "Verliert: einen weiteren Eintrag auf einem schon vollen Bildschirm."), business: tt("Gets: a new selling point for the next sales call.", "Bekommt: ein neues Verkaufsargument für das nächste Verkaufsgespräch."), tech: tt("Pays: building it, and keeping it running for years.", "Zahlt: den Bau und den Betrieb über Jahre.") },
    c2: { name: tt("Simplify the menu", "Das Menü vereinfachen"), serves: ["user", "business"] as Side[], user: tt("Gets: a menu that can be read in a second.", "Bekommt: ein Menü, das in einer Sekunde lesbar ist."), business: tt("Gets: fewer drop-outs, slowly. Loses: an entry one department liked.", "Bekommt: weniger Abbrüche, langsam. Verliert: einen Eintrag, den eine Abteilung mochte."), tech: tt("Pays: a few weeks of rebuilding, once.", "Zahlt: einige Wochen Umbau, einmalig.") },
    c3: { name: tt("Track every click of every learner", "Jeden Klick jeder Lernenden verfolgen"), serves: ["business", "tech"] as Side[], user: tt("Loses: privacy, and some speed on every page.", "Verliert: Privatsphäre und etwas Tempo auf jeder Seite."), business: tt("Gets: data on everything, whether anyone uses it or not.", "Bekommt: Daten zu allem, ob sie jemand nutzt oder nicht."), tech: tt("Gets: an interesting system to build. Pays: storage and upkeep.", "Bekommt: ein interessantes System zum Bauen. Zahlt: Speicher und Pflege.") },
    c4: { name: tt("Rebuild on a new framework", "Auf einem neuen Framework neu bauen"), serves: ["tech"] as Side[], user: tt("Gets: nothing they can see, and maybe new bugs.", "Bekommt: nichts, was sie sehen kann, und vielleicht neue Fehler."), business: tt("Pays: months of work with no new revenue.", "Zahlt: Monate Arbeit ohne neue Einnahmen."), tech: tt("Gets: code that is easier to maintain.", "Bekommt: Code, der leichter zu pflegen ist.") },
    c5: { name: tt("A “Continue” card on the home screen", "Eine „Weitermachen“-Karte auf dem Startbildschirm"), serves: ["user", "business", "tech"] as Side[], user: tt("Gets: the next step in one click.", "Bekommt: den nächsten Schritt mit einem Klick."), business: tt("Gets: more learners who return and finish.", "Bekommt: mehr Lernende, die zurückkehren und abschließen."), tech: tt("Pays: little. The data already exists.", "Zahlt: wenig. Die Daten gibt es schon.") },
  })[id];

export function GoalsCircles() {
  const [sel, setSel] = useState<ConflictId>("c1");
  const c = conflict(sel);
  const circles: [Side, number, number, string][] = [
    ["user", 112, 98, tt("User", "Nutzer")],
    ["business", 214, 98, tt("Business", "Unternehmen")],
    ["tech", 163, 178, tt("Technology", "Technik")],
  ];
  const lines: [Side, string, string][] = [
    ["user", tt("User", "Nutzer"), c.user],
    ["business", tt("Business", "Unternehmen"), c.business],
    ["tech", tt("Technology", "Technik"), c.tech],
  ];
  const n = c.serves.length;
  return (
    <Diagram label={tt("Three goals and five decisions: who gets and who pays · Exploratory · Case assumption (LearnLoop)", "Drei Ziele und fünf Entscheidungen: wer bekommt und wer zahlt · Explorativ · Fallannahme (LearnLoop)")}>
      <div className="space-y-3">
        <ThePoint>{tt("The user, the business and the technology want different things. A good UX decision aims for where they overlap, and when there is no overlap it says which goal wins and what the others lose.", "Der Nutzer, das Unternehmen und die Technik wollen Verschiedenes. Eine gute UX-Entscheidung zielt auf ihre Überschneidung, und wenn es keine gibt, sagt sie, welches Ziel gewinnt und was die anderen verlieren.")}</ThePoint>
        <div role="radiogroup" aria-label={tt("A decision LearnLoop could take", "Eine Entscheidung, die LearnLoop treffen könnte")} className="grid gap-2 sm:grid-cols-2">
          {CONFLICTS.map((id) => (
            <Btn key={id} on={sel === id} onClick={() => { setSel(id); }}>
              {conflict(id).name}
            </Btn>
          ))}
        </div>
        <div className="grid items-center gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className={"mx-auto w-full max-w-[340px]"}>
            <Svg
              viewBox="0 0 326 258"
              label={tt(`Three overlapping circles for the user, the business and the technology. The decision “${c.name}” serves ${c.serves.length} of them`, `Drei überlappende Kreise für Nutzer, Unternehmen und Technik. Die Entscheidung „${c.name}“ dient ${c.serves.length} davon`)}
            >
              {circles.map(([k, cx, cy, name]) => {
                const served = c.serves.includes(k);
                return (
                  <g key={k}>
                    <circle cx={cx} cy={cy} r="74" fill={served ? "#BDBDBD" : "#F4F4F4"} fillOpacity={served ? 0.7 : 0.6} stroke={DARK} strokeWidth={served ? 2.4 : 1.4} strokeDasharray={served ? undefined : "6 5"} />
                    <Txt x={cx + (k === "user" ? -26 : k === "business" ? 26 : 0)} y={cy + (k === "tech" ? 40 : -34)} size={12} bold anchor="middle" fill="#17212E">{name}</Txt>
                    <Txt x={cx + (k === "user" ? -26 : k === "business" ? 26 : 0)} y={cy + (k === "tech" ? 54 : -20)} size={10} anchor="middle" fill="#333333">{served ? tt("● gets something", "● bekommt etwas") : tt("○ gets nothing", "○ bekommt nichts")}</Txt>
                  </g>
                );
              })}
              <Txt x={163} y={140} size={10.5} bold anchor="middle" fill="#17212E">{n === 3 ? tt("All three agree", "Alle drei stimmen überein") : tt("Overlap", "Überschneidung")}</Txt>
            </Svg>
          </div>
          <ul className="space-y-1.5 text-caption text-ink">
            {lines.map(([k, name, text]) => (
              <li key={k} className={clsx("rounded-md border px-2.5 py-1.5", c.serves.includes(k) ? "border-ash bg-mist" : "border-line bg-paper")}>
                <span className="font-bold">{name}. </span>
                <Gloss>{text}</Gloss>
              </li>
            ))}
          </ul>
        </div>
        <Insight>
          {n === 3
            ? tt(`In plain words: “${c.name}” serves all three goals, so there is nothing to trade off. This is the aim of every decision, and it is rarer than people hope.`, `In einfachen Worten: „${c.name}“ dient allen drei Zielen, es muss also nichts abgewogen werden. Das ist das Ziel jeder Entscheidung, und es ist seltener, als man hofft.`)
            : n === 2
              ? tt(`In plain words: “${c.name}” serves two goals, so the third one pays. Name who pays and how much, so the decision can be defended in a meeting.`, `In einfachen Worten: „${c.name}“ dient zwei Zielen, das dritte zahlt also. Nennen Sie, wer zahlt und wie viel, damit sich die Entscheidung in einer Sitzung vertreten lässt.`)
              : tt(`In plain words: “${c.name}” serves one goal and the other two pay for it. That can still be right, but only if you say which goal wins and why, and what you do to limit the loss of the others.`, `In einfachen Worten: „${c.name}“ dient einem Ziel, und die beiden anderen zahlen dafür. Das kann trotzdem richtig sein, aber nur, wenn Sie sagen, welches Ziel gewinnt und warum, und was Sie tun, um den Verlust der anderen zu begrenzen.`)}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B3 · the gate a feature request must pass (interactive) */

type GateOn = { problem: boolean; metric: boolean; owner: boolean };

export function FeatureGate() {
  const [on, setOn] = useState<GateOn>({ problem: false, metric: false, owner: false });
  const open = on.problem && on.metric && on.owner;
  const missing = [!on.problem && tt("a named user problem", "ein genanntes Nutzerproblem"), !on.metric && tt("a metric", "eine Kennzahl"), !on.owner && tt("an owner", "einen Verantwortlichen")].filter(Boolean) as string[];
  const toggle = (k: keyof GateOn) => setOn((s) => ({ ...s, [k]: !s[k] }));
  const rows: [keyof GateOn, string, string][] = [
    ["problem", tt("A named user problem", "Ein genanntes Nutzerproblem"), tt("Which learner cannot do what?", "Welche Lernende kann was nicht?")],
    ["metric", tt("A metric it should move", "Eine Kennzahl, die es bewegen soll"), tt("How will we know it worked?", "Woran erkennen wir, dass es gewirkt hat?")],
    ["owner", tt("An owner", "Ein Verantwortlicher"), tt("Who answers for the result?", "Wer steht für das Ergebnis ein?")],
  ];
  return (
    <Diagram label={tt("The gate a feature request must pass before it enters the roadmap · Exploratory · Case assumption (LearnLoop)", "Das Tor, das ein Feature-Antrag passieren muss, bevor er in die Roadmap kommt · Explorativ · Fallannahme (LearnLoop)")}>
      <div className="space-y-3">
        <ThePoint>{tt("A decision architecture is a rule that decides who decides and on what evidence. A feature enters the roadmap only with a named user problem, a metric and an owner, the same for every request.", "Eine Entscheidungsarchitektur ist eine Regel, die entscheidet, wer entscheidet und auf welcher Grundlage. Ein Feature kommt nur mit einem genannten Nutzerproblem, einer Kennzahl und einem Verantwortlichen auf die Roadmap, für jeden Antrag gleich.")}</ThePoint>
        <div role="group" aria-label={tt("The three conditions of the gate", "Die drei Bedingungen des Tors")} className="grid gap-2 sm:grid-cols-3">
          {rows.map(([k, label, sub]) => (
            <button key={k} type="button" aria-pressed={on[k]} onClick={() => { toggle(k); }} className={clsx("min-h-[44px] rounded-lg border px-3 py-2 text-left text-caption", on[k] ? "border-accent bg-accentSoft ring-2 ring-gold" : "border-line bg-paper hover:border-ash")}>
              <span className="font-semibold text-ink"><span aria-hidden className="mr-1.5">{on[k] ? "☑" : "☐"}</span>{label}</span>
              <span className="block pl-5 text-ash">{sub}</span>
            </button>
          ))}
        </div>
        <div className={"mx-auto w-full max-w-[460px]"}>
          <Svg
            viewBox="0 0 360 150"
            label={open ? tt("A feature request passes the open gate and enters the roadmap", "Ein Feature-Antrag passiert das offene Tor und kommt auf die Roadmap") : tt(`A feature request stops at the closed gate. Still missing: ${missing.join(", ")}`, `Ein Feature-Antrag bleibt am geschlossenen Tor stehen. Es fehlt noch: ${missing.join(", ")}`)}
          >
            <rect x="8" y="46" width="84" height="54" rx="6" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
            <Txt x={50} y={66} size={9} bold anchor="middle">{tt("Request", "Antrag")}</Txt>
            <Txt x={50} y={80} size={9} anchor="middle">{tt("Live Polls", "Live Polls")}</Txt>
            <Txt x={50} y={92} size={8} anchor="middle" fill="#666666">{tt("“a competitor has it”", "„ein Wettbewerber hat es“")}</Txt>
            <Arrow x1={94} y1={73} x2={122} y2={73} />
            <rect x="124" y="14" width="92" height="122" rx="4" fill={LITE} stroke={DARK} strokeWidth="2" />
            <Txt x={170} y={29} size={9} bold anchor="middle">{open ? tt("Gate: open", "Tor: offen") : tt("Gate: closed", "Tor: geschlossen")}</Txt>
            {rows.map(([k, label], i) => (
              <g key={k}>
                {on[k] ? <Tick x={136} y={50 + i * 28} r={6} /> : <circle cx={136} cy={50 + i * 28} r={6} fill="#FFFFFF" stroke={LINE} strokeWidth="1.5" strokeDasharray="3 2" />}
                <Txt x={146} y={53 + i * 28} size={8}>{label.length > 20 ? label.slice(0, 19) + "…" : label}</Txt>
              </g>
            ))}
            {open ? <Arrow x1={218} y1={73} x2={246} y2={73} /> : <Arrow x1={218} y1={73} x2={238} y2={73} color={MID} dash="4 3" />}
            <rect x="248" y="46" width="104" height="54" rx="6" fill={open ? "#E2E2E2" : "#FAFAFA"} stroke={open ? DARK : MID} strokeWidth={open ? 2 : 1.4} strokeDasharray={open ? undefined : "5 4"} />
            <Txt x={300} y={70} size={9} bold anchor="middle" fill={open ? "#333333" : "#999999"}>{tt("Roadmap", "Roadmap")}</Txt>
            <Txt x={300} y={84} size={8} anchor="middle" fill={open ? "#333333" : "#999999"}>{open ? tt("ranked with the rest", "mit dem Rest gereiht") : tt("not entered", "nicht aufgenommen")}</Txt>
          </Svg>
        </div>
        <Insight>
          {open
            ? tt("In plain words: the request names a user problem, a metric and an owner, so it enters the roadmap and is ranked against everything else. The gate did not say yes to the feature, only that the request is ready to be judged.", "In einfachen Worten: Der Antrag nennt ein Nutzerproblem, eine Kennzahl und einen Verantwortlichen, er kommt also auf die Roadmap und wird mit allem anderen gereiht. Das Tor hat nicht Ja zum Feature gesagt, nur dass der Antrag bereit ist, beurteilt zu werden.")
            : tt(`In plain words: the request stops at the gate, because it still lacks ${missing.join(", ")}. Nobody has judged the idea; the gate only asks the requester to say why, how we will know, and who answers for it.`, `In einfachen Worten: Der Antrag bleibt am Tor stehen, weil ihm noch ${missing.join(", ")} fehlt. Niemand hat die Idee beurteilt; das Tor bittet die Antragstellerin nur zu sagen, warum, woran wir es erkennen und wer dafür einsteht.`)}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B3 · a decision under uncertainty, filled in for LearnLoop (static) */

export function DecisionFrame() {
  return (
    <DecisionFrameFig
      label={tt("A decision under uncertainty, filled in for LearnLoop", "Eine Entscheidung unter Unsicherheit, für LearnLoop ausgefüllt")}
      caption={tt("The four boxes make a decision checkable. The two boxes below are the rule that makes future decisions less dependent on the loudest voice.", "Die vier Kästen machen eine Entscheidung überprüfbar. Die zwei Kästen darunter sind die Regel, die künftige Entscheidungen weniger von der lautesten Stimme abhängig macht.")}
      boxes={[
        [tt("I decide", "Ich entscheide"), tt("Rebuild the menu around tasks in two courses first.", "Zuerst in zwei Kursen das Menü um Aufgaben herum neu bauen.")],
        [tt("I do not know", "Ich weiß nicht"), tt("Whether learners leave because they cannot find the course or because they lack time; the data does not say.", "Ob Lernende gehen, weil sie den Kurs nicht finden oder weil ihnen die Zeit fehlt; die Daten sagen es nicht.")],
        [tt("I reverse if", "Ich nehme zurück, wenn"), tt("The seven-day return rate is not 3 points above the old menu after 8 weeks.", "die Rückkehrrate nach sieben Tagen nach 8 Wochen nicht 3 Punkte über dem alten Menü liegt.")],
        [tt("I give up", "Ich verzichte auf"), tt("The Live Polls feature this year.", "das Feature Live Polls in diesem Jahr.")],
      ]}
      rule={[
        [tt("Who decides", "Wer entscheidet"), tt("The head of product with the UX lead.", "Die Leiterin Produkt mit der UX-Leiterin.")],
        [tt("On what evidence", "Auf welcher Grundlage"), tt("A named user problem, a metric and an owner, plus a usability test or interviews.", "Ein genanntes Nutzerproblem, eine Kennzahl und ein Verantwortlicher, dazu ein Usability-Test oder Interviews.")],
      ]}
    />
  );
}
