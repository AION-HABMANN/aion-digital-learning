"use client";

import { useState } from "react";
import clsx from "clsx";
import { SideScreen } from "@/components/day6/mocks";
import { Arrow, DARK, LINE, MID, Svg, Txt } from "@/components/day/mockKit";
import { DecisionFrameFig, MatrixFig } from "@/components/materi/figures";
import type { MatrixPoint } from "@/components/materi/figures";
import { Diagram, Insight, ThePoint } from "@/components/materi/kit";
import { Gloss } from "@/lib/glossify";
import { tt } from "@/lib/lang";

/**
 * Day 6 · the teaching diagrams of Materi B (Level 3). Three interactive ones: five segments by size and business value, one platform designed for everyone, for
 * a primary segment or with a shared base, and how much evidence a persona decision rests on. One static one: a decision about which persona is prioritised, filled
 * in for LearnLoop. The example company is LearnLoop; never EduPath, so no task is answered here (CLAUDE.md #11, #36, #51, #52).
 */

const Btn = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button type="button" aria-pressed={on} onClick={onClick} className={clsx("btn btn-sm min-h-[40px] border text-left", on ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
    {children}
  </button>
);

/* ------------------------------------------------------------------ B1 · five segments by size and business value (interactive matrix) */

export function SegmentMatrix() {
  const [sel, setSel] = useState<string | null>(null);
  const [spot, setSpot] = useState<string | null>(null);
  const pts: MatrixPoint[] = [
    { id: "a", letter: "A", x: 0.82, y: 0.5, name: tt("Time-poor learners", "Lernende mit wenig Zeit"), reading: tt("The largest group, about 5,000 learners. Its journey breaks at the return after a break. Its usage is what the training managers see, so its value is mid to high.", "Die größte Gruppe, etwa 5.000 Lernende. Ihre Journey bricht bei der Rückkehr nach einer Pause. Ihre Nutzung ist das, was die Weiterbildungsleiter sehen, ihr Wert ist also mittel bis hoch.") },
    { id: "b", letter: "B", x: 0.34, y: 0.36, name: tt("Exam preparers", "Prüfungsvorbereiter"), reading: tt("A smaller group that pays itself and is satisfied. Its journey does not break, so optimisation has little to fix here.", "Eine kleinere Gruppe, die selbst zahlt und zufrieden ist. Ihre Journey bricht nicht, die Optimierung hat hier also wenig zu beheben.") },
    { id: "c", letter: "C", x: 0.16, y: 0.8, name: tt("Teachers who supply content", "Lehrende, die Inhalt liefern"), reading: tt("Few people, but they decide what learners can learn at all. If they leave, the platform has nothing to teach: small but critical.", "Wenige Menschen, aber sie entscheiden, was Lernende überhaupt lernen können. Gehen sie, hat die Plattform nichts zu lehren: klein, aber kritisch.") },
    { id: "d", letter: "D", x: 0.08, y: 0.94, name: tt("Training managers", "Weiterbildungsleiter"), reading: tt("Sixty people who renew licences for 5,000 learners. The smallest group and the highest value: they decide more of the business than all the learners together.", "Sechzig Menschen, die Lizenzen für 5.000 Lernende verlängern. Die kleinste Gruppe und der höchste Wert: Sie entscheiden mehr vom Geschäft als alle Lernenden zusammen.") },
    { id: "e", letter: "E", x: 0.58, y: 0.1, name: tt("Casual browsers", "Gelegenheitsbesucher"), reading: tt("A fair share of sign-ups that rarely finish a course and have no payment link. No decision would change because of this group.", "Ein beachtlicher Teil der Anmeldungen, der selten einen Kurs abschließt und keine Zahlungsverbindung hat. Keine Entscheidung würde sich wegen dieser Gruppe ändern.") },
  ];
  return (
    <Diagram label={tt("A worked example: LearnLoop's five segments by size and business value · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoops fünf Segmente nach Größe und Geschäftswert · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("Prioritise a persona by the size of its segment, its value to the business, and how badly its journey breaks. A small segment can be the most critical.", "Priorisieren Sie eine Persona nach der Größe ihres Segments, ihrem Wert für das Unternehmen und danach, wie stark ihre Journey bricht. Ein kleines Segment kann das kritischste sein.")}</ThePoint>
        <MatrixFig
          title={tt("Five segments of LearnLoop by size (to the right) and business value (upwards)", "Fünf Segmente von LearnLoop nach Größe (nach rechts) und Geschäftswert (nach oben)")}
          xLabel={tt("Size of the segment", "Größe des Segments")}
          yLabel={tt("Value to the business", "Wert für das Unternehmen")}
          quads={[tt("Small but critical", "Klein, aber kritisch"), tt("Large and valuable", "Groß und wertvoll"), tt("Small and light", "Klein und leicht"), tt("Large, lighter value", "Groß, geringerer Wert")]}
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

/* ------------------------------------------------------------------ B2 · one platform designed for everyone, for a primary segment, or with a shared base (interactive) */

type Mode = "everyone" | "primary" | "share";
export function ConflictScreens() {
  const [mode, setMode] = useState<Mode>("everyone");
  const opts: [Mode, string][] = [
    ["everyone", tt("Design for everyone", "Für alle gestalten")],
    ["primary", tt("Primary first", "Primäres zuerst")],
    ["share", tt("Share what is common", "Das Gemeinsame teilen")],
  ];
  return (
    <Diagram label={tt("One platform for two segments: three ways to design it · Exploratory · Case assumption (LearnLoop)", "Eine Plattform für zwei Segmente: drei Wege, sie zu gestalten · Explorativ · Fallannahme (LearnLoop)")}>
      <div className="space-y-3">
        <ThePoint>{tt("“Design for everyone” serves no one. When segments conflict, name the primary one, share what is common, and say what the others get and when.", "„Für alle gestalten“ bedient niemanden. Wenn Segmente kollidieren, nennen Sie das primäre, teilen Sie das Gemeinsame und sagen Sie, was die anderen bekommen und wann.")}</ThePoint>
        <div role="radiogroup" aria-label={tt("How the platform is designed", "Wie die Plattform gestaltet ist")} className="flex flex-wrap gap-2">
          {opts.map(([id, label]) => (
            <Btn key={id} on={mode === id} onClick={() => { setMode(id); }}>{label}</Btn>
          ))}
        </div>
        <div className={"mx-auto grid max-w-[640px] items-start gap-3 sm:grid-cols-2"}>
          {mode === "everyone" && (
            <>
              <div className="sm:col-span-2 sm:mx-auto sm:max-w-[320px]">
                <SideScreen kind="everyone" />
                <p className="mt-1 text-caption font-bold text-ink">{tt("One screen for both groups", "Ein Bildschirm für beide Gruppen")}</p>
              </div>
            </>
          )}
          {mode === "primary" && (
            <>
              <div>
                <SideScreen kind="learner" />
                <p className="mt-1 text-caption font-bold text-ink">{tt("Learners: fixed first", "Lernende: zuerst behoben")}</p>
              </div>
              <div className="opacity-50">
                <SideScreen kind="teacher" />
                <p className="mt-1 text-caption font-bold text-ink">{tt("Teachers: third quarter", "Lehrende: drittes Quartal")}</p>
              </div>
            </>
          )}
          {mode === "share" && (
            <>
              <div>
                <SideScreen kind="learner" />
                <p className="mt-1 text-caption font-bold text-ink">{tt("Learners: their own home screen", "Lernende: ihr eigener Startbildschirm")}</p>
              </div>
              <div>
                <SideScreen kind="teacher" />
                <p className="mt-1 text-caption font-bold text-ink">{tt("Teachers: their own tools", "Lehrende: ihre eigenen Werkzeuge")}</p>
              </div>
              <div className="sm:col-span-2 sm:mx-auto sm:max-w-[320px]">
                <SideScreen kind="both" />
                <p className="mt-1 text-caption font-bold text-ink">{tt("Both: one shared course outline", "Beide: eine gemeinsame Kursgliederung")}</p>
              </div>
            </>
          )}
        </div>
        <Insight>
          {mode === "everyone"
            ? tt("In plain words: one screen that tries to give each group everything gives each of them clutter. The learner cannot find her next step and the teacher cannot find his tab, which is the cost of a design for everyone.", "In einfachen Worten: Ein Bildschirm, der jeder Gruppe alles geben will, gibt jeder von ihnen Unordnung. Die Lernende findet ihren nächsten Schritt nicht und der Lehrende seinen Reiter nicht, das ist der Preis eines Designs für alle.")
            : mode === "primary"
              ? tt("In plain words: the learners are fixed first and the teachers wait for a named quarter. That is a real priority, because someone waits, and saying so is what keeps the waiting group's trust.", "In einfachen Worten: Die Lernenden werden zuerst behoben, und die Lehrenden warten auf ein genanntes Quartal. Das ist eine echte Priorität, weil jemand wartet, und das offen zu sagen erhält das Vertrauen der wartenden Gruppe.")
              : tt("In plain words: the course outline is built once and both groups see it, while the home screen and the tools differ. This costs a little more than the primary-first plan, and gives both groups something at once.", "In einfachen Worten: Die Kursgliederung wird einmal gebaut und beide Gruppen sehen sie, während Startbildschirm und Werkzeuge sich unterscheiden. Das kostet etwas mehr als der Plan „Primäres zuerst“ und gibt beiden Gruppen sofort etwas.")}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B3 · how much evidence a persona decision rests on, and a reversible priority (interactive) */

export function EvidenceStrip() {
  const [rev, setRev] = useState(true);
  const personas: [string, number, string][] = [
    [tt("Mia (learner)", "Mia (Lernende)"), 12, tt("12 interviews + the usage logs", "12 Interviews + die Nutzungslogs")],
    [tt("Sven (teacher)", "Sven (Lehrender)"), 4, tt("4 interviews", "4 Interviews")],
    [tt("Petra (training manager)", "Petra (Weiterbildungsleiterin)"), 2, tt("2 conversations", "2 Gespräche")],
  ];
  return (
    <Diagram label={tt("How much evidence a persona rests on, and a reversible priority against a rebuilt platform · Exploratory · Case assumption (LearnLoop)", "Auf wie viel Belegen eine Persona beruht, und eine umkehrbare Priorität gegen eine umgebaute Plattform · Explorativ · Fallannahme (LearnLoop)")}>
      <div className="space-y-3">
        <ThePoint>{tt("When the data is thin, treat personas as hypotheses, choose a priority you can review, and write down what would make you reverse it and by when.", "Wenn die Daten dünn sind, behandeln Sie Personas als Hypothesen, wählen Sie eine Priorität, die sich prüfen lässt, und schreiben Sie auf, was Sie zum Rückgängigmachen bringen würde und bis wann.")}</ThePoint>
        <div role="radiogroup" aria-label={tt("The plan", "Der Plan")} className="flex flex-wrap gap-2">
          <Btn on={rev} onClick={() => { setRev(true); }}>{tt("Review in two quarters", "In zwei Quartalen prüfen")}</Btn>
          <Btn on={!rev} onClick={() => { setRev(false); }}>{tt("Rebuild around one persona", "Um eine Persona umbauen")}</Btn>
        </div>
        <div className={"mx-auto w-full max-w-[560px]"}>
          <Svg
            viewBox="0 0 400 230"
            label={tt(`Evidence behind three personas, and a plan that ${rev ? "has a review after two quarters" : "rebuilds the platform with no review point"}`, `Belege hinter drei Personas und ein Plan, der ${rev ? "nach zwei Quartalen geprüft wird" : "die Plattform ohne Prüfpunkt umbaut"}`)}
          >
            <Txt x={8} y={16} size={10} bold>{tt("Evidence behind each persona", "Belege hinter jeder Persona")}</Txt>
            {personas.map(([name, n, what], i) => (
              <g key={name}>
                <Txt x={8} y={38 + i * 24} size={9}>{name}</Txt>
                <rect x={150} y={26 + i * 24} width={n * 17} height="14" rx="2" fill={MID} stroke={DARK} />
                <Txt x={154 + n * 17} y={37 + i * 24} size={8.5} fill="#333333">{what}</Txt>
              </g>
            ))}
            <Txt x={8} y={122} size={10} bold>{tt("The plan over time", "Der Plan über die Zeit")}</Txt>
            <line x1={20} y1={190} x2={380} y2={190} stroke={LINE} />
            {[0, 1, 2, 3].map((q) => (
              <g key={q}>
                <line x1={20 + q * 120} y1={186} x2={20 + q * 120} y2={194} stroke={LINE} />
                <Txt x={20 + q * 120} y={208} size={8.5} anchor="middle" fill="#555555">{`Q${q}`}</Txt>
              </g>
            ))}
            {rev ? (
              <>
                <rect x={20} y={146} width={240} height="22" rx="3" fill="#F4F4F4" stroke={DARK} strokeWidth="1.6" />
                <Txt x={28} y={161} size={9} bold>{tt("Prioritise Mia", "Mia priorisieren")}</Txt>
                <polygon points="260,138 268,148 260,158 252,148" fill="#FFFFFF" stroke={DARK} strokeWidth="1.8" />
                <Txt x={260} y={132} size={8.5} bold anchor="middle">{tt("Review", "Prüfung")}</Txt>
                <rect x={268} y={146} width={112} height="22" rx="3" fill="#FAFAFA" stroke={MID} strokeDasharray="4 3" />
                <Txt x={324} y={161} size={8.5} anchor="middle">{tt("Next step, or reverse", "Nächster Schritt oder zurück")}</Txt>
              </>
            ) : (
              <>
                <rect x={20} y={146} width={360} height="22" rx="3" fill="#E2E2E2" stroke={DARK} strokeWidth="1.8" />
                <Txt x={28} y={161} size={9} bold>{tt("Rebuild the platform around Mia", "Die Plattform um Mia herum umbauen")}</Txt>
                <Arrow x1={360} y1={132} x2={360} y2={142} />
                <Txt x={352} y={128} size={8.5} bold anchor="end">{tt("no point to turn back", "kein Punkt zum Umkehren")}</Txt>
              </>
            )}
          </Svg>
        </div>
        <Insight>
          {rev
            ? tt("In plain words: the priority lasts two quarters and has a review point, so if the thin data misled the team, it finds out early and cheaply. Write the figure and the date that would make you reverse it.", "In einfachen Worten: Die Priorität dauert zwei Quartale und hat einen Prüfpunkt, wenn die dünnen Daten das Team also in die Irre geführt haben, merkt es das früh und günstig. Schreiben Sie die Zahl und das Datum auf, die Sie zum Rückgängigmachen bringen würden.")
            : tt("In plain words: a platform rebuilt around one persona has no point to turn back. With evidence this thin, that is a one-way decision, and it is better kept for when the personas have been tested.", "In einfachen Worten: Eine um eine Persona umgebaute Plattform hat keinen Punkt zum Umkehren. Bei so dünnen Belegen ist das eine Einbahnentscheidung, und sie hebt man besser auf, bis die Personas getestet sind.")}
        </Insight>
        <p className="rounded-md border border-line bg-canvas px-3 py-2 text-caption text-ink">
          <span className="smallcaps mr-1.5">{tt("Still unknown", "Noch unbekannt")}</span>
          <Gloss>{tt("Whether learners leave for lack of time or for lack of a place marker. LearnLoop would interview five who stopped before it commits.", "Ob Lernende wegen fehlender Zeit oder wegen einer fehlenden Stellenmarke gehen. LearnLoop würde fünf interviewen, die aufgehört haben, bevor es sich festlegt.")}</Gloss>
        </p>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B3 · a decision about which persona is prioritised, filled in for LearnLoop (static) */

export function DecisionFrame() {
  return (
    <DecisionFrameFig
      label={tt("A decision about which persona is prioritised, filled in for LearnLoop", "Eine Entscheidung, welche Persona priorisiert wird, für LearnLoop ausgefüllt")}
      caption={tt("The four boxes make a decision checkable. The two boxes below are the rule that makes future persona decisions less dependent on one person's favourite.", "Die vier Kästen machen eine Entscheidung überprüfbar. Die zwei Kästen darunter sind die Regel, die künftige Persona-Entscheidungen weniger vom Liebling einer Person abhängig macht.")}
      boxes={[
        [tt("I decide", "Ich entscheide"), tt("Mia, the time-poor learner, is the prioritised persona for two quarters.", "Mia, die Lernende mit wenig Zeit, ist zwei Quartale lang die priorisierte Persona.")],
        [tt("I do not know", "Ich weiß nicht"), tt("Whether learners leave for lack of time or lack of a place marker; Mia rests on twelve interviews.", "Ob Lernende wegen fehlender Zeit oder fehlender Stellenmarke gehen; Mia beruht auf zwölf Interviews.")],
        [tt("I reverse if", "Ich nehme zurück, wenn"), tt("The seven-day return rate is not up eight points after ten weeks, or the churn of the waiting teachers doubles.", "die Rückkehrrate nach sieben Tagen nach zehn Wochen nicht um acht Punkte gestiegen ist oder die Abwanderung der wartenden Lehrenden sich verdoppelt.")],
        [tt("I give up", "Ich verzichte auf"), tt("The new course editor this half year; the teachers get their turn in the third quarter.", "den neuen Kurseditor in diesem Halbjahr; die Lehrenden kommen im dritten Quartal an die Reihe.")],
      ]}
      rule={[
        [tt("Who decides", "Wer entscheidet"), tt("The head of product with the UX lead.", "Die Leiterin Produkt mit der UX-Leiterin.")],
        [tt("On what evidence", "Auf welcher Grundlage"), tt("Interviews per persona, usage per segment and renewal data.", "Interviews pro Persona, Nutzung pro Segment und Verlängerungsdaten.")],
      ]}
    />
  );
}
