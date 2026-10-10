"use client";

import { useState } from "react";
import clsx from "clsx";
import { OptionGrid } from "@/components/day1/diagrams";
import type { GridRow } from "@/components/day1/diagrams";
import { ChainFig, CostBands, DecisionFrameFig, MatrixFig } from "@/components/materi/figures";
import type { MatrixPoint } from "@/components/materi/figures";
import { Diagram, Insight, Story, ThePoint, useStory } from "@/components/materi/kit";
import type { StoryPlan } from "@/components/materi/kit";
import { Gloss } from "@/lib/glossify";
import { euro, tt } from "@/lib/lang";

/**
 * Day 3 · the teaching diagrams. Static ones (the memory flow, the levels of learning, the chain of effectiveness, the decision frame) need no story; the
 * interactive ones (the three loads, chunking, the LearnLoop weighing grid, the load-against-depth matrix) carry "The point", "Walk me through it" and an
 * always-visible "What this shows" (CLAUDE.md #20, #36, #51). Example companies: LearnLoop (an online-course provider); never EduCore, so no task is answered here.
 */

/* ------------------------------------------------------------------ A1 · how people learn (static) */

export function MemoryFlow() {
  return (
    <ChainFig
      label={tt("How people learn: intake, processing, storage", "Wie Menschen lernen: Aufnahme, Verarbeitung, Speicherung")}
      steps={[
        { h: tt("Intake", "Aufnahme"), b: tt("Attention picks a few things from the screen. The rest is ignored.", "Die Aufmerksamkeit wählt wenige Dinge vom Bildschirm. Der Rest wird ignoriert."), kind: "a" },
        { h: tt("Processing", "Verarbeitung"), b: tt("Working memory holds and works on about four chunks at a time.", "Das Arbeitsgedächtnis hält und bearbeitet etwa vier Chunks gleichzeitig."), kind: "a" },
        { h: tt("Storage", "Speicherung"), b: tt("Long-term memory keeps what was understood and revisited.", "Das Langzeitgedächtnis behält, was verstanden und wieder aufgegriffen wurde."), kind: "s" },
      ]}
      caption={tt("Design can help at each step: guide attention (intake), do not overfill working memory (processing), and bring learners back to the content later (storage).", "Gestaltung kann bei jedem Schritt helfen: die Aufmerksamkeit lenken (Aufnahme), das Arbeitsgedächtnis nicht überfüllen (Verarbeitung) und Lernende später zum Inhalt zurückbringen (Speicherung).")}
    />
  );
}

export function LearningLevels() {
  return (
    <ChainFig
      label={tt("Three levels of learning: each needs more from the interface than the one before", "Drei Stufen des Lernens: Jede verlangt mehr vom Interface als die vorige")}
      steps={[
        { h: tt("Taking in", "Aufnehmen"), b: tt("The learner can repeat what was shown.", "Die Lernende kann wiederholen, was gezeigt wurde."), kind: "m" },
        { h: tt("Understanding", "Verstehen"), b: tt("The learner can explain it in their own words and give an example.", "Die Lernende kann es in eigenen Worten erklären und ein Beispiel geben."), kind: "a" },
        { h: tt("Applying", "Anwenden"), b: tt("The learner can use it in a new situation at work.", "Die Lernende kann es in einer neuen Situation bei der Arbeit nutzen."), kind: "s" },
      ]}
      caption={tt("A screen that only presents content supports the first level. Examples and connections support the second. Tasks and feedback support the third.", "Ein Bildschirm, der Inhalt nur präsentiert, stützt die erste Stufe. Beispiele und Verknüpfungen stützen die zweite. Aufgaben und Feedback stützen die dritte.")}
    />
  );
}

/* ------------------------------------------------------------------ A2 · the three loads in one learner's working memory (interactive) */

type LoadMode = "over" | "redesigned";
const LOAD = { over: { intrinsic: 38, extraneous: 52, germane: 10 }, redesigned: { intrinsic: 38, extraneous: 12, germane: 50 } } as const;

export function ThreeLoads() {
  const [mode, setMode] = useState<LoadMode>("over");
  const story = useStory([
    { title: tt("Daniel opens a hard lesson", "Daniel öffnet eine schwere Lektion"), say: tt("Let us follow Daniel, who works in procurement and is studying contract basics on a platform. The lesson he opens is hard, because contracts are hard: this effort comes from the subject, and no design can remove it. In the bar, it is the grey part, and it takes 38 percent of Daniel's working memory whatever the screen looks like.", "Begleiten wir Daniel, der im Einkauf arbeitet und auf einer Plattform Vertragsgrundlagen lernt. Die Lektion, die er öffnet, ist schwer, weil Verträge schwer sind: Diese Anstrengung kommt vom Thema, und keine Gestaltung kann sie entfernen. Im Balken ist es der graue Teil, und er nimmt 38 Prozent von Daniels Arbeitsgedächtnis ein, egal wie der Bildschirm aussieht."), look: tt("the grey part: the same in both bars", "der graue Teil: in beiden Balken gleich"), apply: () => setMode("over") },
    { title: tt("The page adds waste", "Die Seite fügt Vergeudung hinzu"), say: tt("The page also shows a news banner, a chat window and a menu with nine entries, and the text is one block without headings. Daniel has to ignore all of that while trying to understand a clause, and this effort teaches him nothing about contracts. In the bar it is the rust part: 52 percent is wasted, and only 10 percent is left for making sense of the clause.", "Die Seite zeigt außerdem ein News-Banner, ein Chat-Fenster und ein Menü mit neun Einträgen, und der Text ist ein Block ohne Überschriften. Daniel muss das alles ausblenden, während er versucht, eine Klausel zu verstehen, und diese Anstrengung lehrt ihn nichts über Verträge. Im Balken ist es der rostfarbene Teil: 52 Prozent sind vergeudet, und nur 10 Prozent bleiben, um die Klausel zu verstehen."), look: tt("the rust part, and the small teal part", "der rostfarbene Teil und der kleine türkise Teil"), apply: () => setMode("over") },
    { title: tt("The same lesson, redesigned", "Dieselbe Lektion, neu gestaltet"), say: tt("In the redesigned version the page shows one heading, three short paragraphs, one diagram of the clause and a question at the end. The subject is exactly as hard as before, so the grey part stays at 38 percent, but the waste falls to 12 percent and half of Daniel's capacity now goes into the clause itself. That is the effort the lesson was meant to ask for.", "In der neu gestalteten Version zeigt die Seite eine Überschrift, drei kurze Absätze, ein Diagramm der Klausel und am Ende eine Frage. Das Thema ist genauso schwer wie zuvor, der graue Teil bleibt also bei 38 Prozent, aber die Vergeudung sinkt auf 12 Prozent, und die Hälfte von Daniels Kapazität fließt nun in die Klausel selbst. Das ist die Anstrengung, die die Lektion verlangen sollte."), look: tt("the teal part: from 10% to 50%", "der türkise Teil: von 10 % auf 50 %"), apply: () => setMode("redesigned") },
    { title: tt("What to take from it", "Was Sie mitnehmen"), say: tt("So when learners call a platform “too complicated”, ask which part of the bar is the problem. If it is the subject, you can only order it; if it is how the screen is built, you should cut it. Never cut the subject itself to make the bar look better, and leave room for the teal part. Switch between the two bars yourself to compare.", "Wenn Lernende eine Plattform „zu kompliziert“ nennen, fragen Sie also, welcher Teil des Balkens das Problem ist. Ist es das Thema, können Sie es nur ordnen; ist es, wie der Bildschirm gebaut ist, sollten Sie es kürzen. Kürzen Sie nie das Thema selbst, damit der Balken besser aussieht, und lassen Sie Platz für den türkisen Teil. Wechseln Sie selbst zwischen den beiden Balken, um zu vergleichen."), apply: () => setMode("redesigned") },
  ] satisfies StoryPlan[]);
  const v = LOAD[mode];
  const part = (cls: string, label: string, pct: number) => (
    <div className={clsx("flex min-h-[3.5rem] items-center justify-center border-r-2 border-paper px-1 text-center text-caption font-bold text-paper", cls)} style={{ width: `${pct}%` }}>
      <span>{`${label} ${pct}%`}</span>
    </div>
  );
  return (
    <Diagram label={tt("The three loads in one learner's working memory · Exploratory", "Die drei Belastungen im Arbeitsgedächtnis einer Lernenden · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("The subject sets part of the mental effort, and design decides how much of the rest is wasted. Cut the waste, and keep room for understanding.", "Das Thema legt einen Teil der geistigen Anstrengung fest, und die Gestaltung entscheidet, wie viel vom Rest vergeudet wird. Kürzen Sie die Vergeudung, und lassen Sie Platz fürs Verstehen.")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <div role="radiogroup" aria-label={tt("The lesson", "Die Lektion")} className="flex flex-wrap gap-2">
          {([
            ["over", tt("Overloaded", "Überlastet")],
            ["redesigned", tt("Redesigned", "Neu gestaltet")],
          ] as [LoadMode, string][]).map(([id, label]) => (
            <button key={id} type="button" aria-pressed={mode === id} onClick={() => { story.leave(); setMode(id); }} className={clsx("btn btn-sm min-h-[40px] border", mode === id ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
              {label}
            </button>
          ))}
        </div>
        <div className={clsx("overflow-hidden rounded-lg border-2 border-ink", story.step !== null && "anim-pulse")} role="img" aria-label={tt(`Working memory: subject ${v.intrinsic}%, waste ${v.extraneous}%, making sense ${v.germane}%`, `Arbeitsgedächtnis: Thema ${v.intrinsic} %, Vergeudung ${v.extraneous} %, Verstehen ${v.germane} %`)}>
          <div className="flex w-full">
            {part("bg-ash", tt("Subject", "Thema"), v.intrinsic)}
            {part("bg-rust", tt("Waste", "Vergeudung"), v.extraneous)}
            {part("bg-signal", tt("Making sense", "Verstehen"), v.germane)}
          </div>
        </div>
        <div className="grid gap-2 text-caption sm:grid-cols-3">
          <p className="rounded-lg border-2 border-ash/50 bg-mist p-2.5 text-ink">
            <span className="font-bold">{tt("Intrinsic", "Intrinsisch")}</span> · {tt("how complex the content is", "wie komplex der Inhalt ist")}
          </p>
          <p className="rounded-lg border-2 border-rust/60 bg-rustSoft p-2.5 text-ink">
            <span className="font-bold">{tt("Extraneous", "Extrinsisch")}</span> · {tt("effort caused by poor design", "Anstrengung durch schlechte Gestaltung")}
          </p>
          <p className="rounded-lg border-2 border-signal/60 bg-signalSoft p-2.5 text-ink">
            <span className="font-bold">{tt("Germane", "Lernbezogen")}</span> · {tt("effort that builds understanding", "Anstrengung, die Verstehen aufbaut")}
          </p>
        </div>
        <Insight>
          {mode === "over"
            ? tt(`In plain words: of one moment of working memory, ${v.extraneous} percent goes into clutter and a wall of text, and only ${v.germane} percent is left for making sense of the lesson. The learner feels it as “I cannot follow this”, although the subject itself takes only ${v.intrinsic} percent.`, `In einfachen Worten: Von einem Moment des Arbeitsgedächtnisses fließen ${v.extraneous} Prozent in Unübersichtlichkeit und eine Textwand, und nur ${v.germane} Prozent bleiben, um die Lektion zu verstehen. Die Lernende erlebt es als „Ich kann dem nicht folgen“, obwohl das Thema selbst nur ${v.intrinsic} Prozent braucht.`)
            : tt(`In plain words: the subject still takes ${v.intrinsic} percent, but waste has fallen to ${v.extraneous} percent, so ${v.germane} percent goes into understanding. The same lesson is no easier to learn from, only easier to follow, which is the point of cutting extraneous load. The figures are illustrative.`, `In einfachen Worten: Das Thema braucht weiterhin ${v.intrinsic} Prozent, aber die Vergeudung ist auf ${v.extraneous} Prozent gesunken, also fließen ${v.germane} Prozent ins Verstehen. Dieselbe Lektion ist nicht leichter zu lernen, nur leichter zu verfolgen, und das ist der Sinn davon, die extrinsische Belastung zu senken. Die Zahlen sind veranschaulichend.`)}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A3 · chunking: the same items loose and in groups (interactive) */

type ChunkMode = "loose" | "chunked";

export function Chunking() {
  const [mode, setMode] = useState<ChunkMode>("loose");
  const items = [tt("login", "Anmeldung"), tt("profile", "Profil"), tt("deadline", "Frist"), tt("badge", "Badge"), tt("forum", "Forum"), tt("quiz 1", "Quiz 1"), tt("news", "News"), tt("certificate", "Zertifikat"), tt("quiz 2", "Quiz 2"), tt("reading", "Lesestoff"), tt("chat", "Chat"), tt("report", "Bericht")];
  const groups = [
    { name: tt("Learn", "Lernen"), items: [tt("reading", "Lesestoff"), tt("quiz 1", "Quiz 1"), tt("quiz 2", "Quiz 2")] },
    { name: tt("Progress", "Fortschritt"), items: [tt("badge", "Badge"), tt("certificate", "Zertifikat"), tt("report", "Bericht")] },
    { name: tt("Talk", "Austausch"), items: [tt("forum", "Forum"), tt("chat", "Chat"), tt("news", "News")] },
  ];
  const story = useStory([
    { title: tt("Mira meets twelve things", "Mira trifft auf zwölf Dinge"), say: tt("Let us follow Mira, a team leader who opens the start page of LearnLoop, an online-course provider, to find her next quiz. The page shows twelve separate things: a login, a profile, a deadline, a badge, a forum, two quizzes, the news, a certificate, a reading, a chat and a report. Working memory holds only about four new things at once, so Mira cannot keep them all in mind.", "Begleiten wir Mira, eine Teamleiterin, die die Startseite von LearnLoop, einem Anbieter von Online-Kursen, öffnet, um ihr nächstes Quiz zu finden. Die Seite zeigt zwölf einzelne Dinge: eine Anmeldung, ein Profil, eine Frist, ein Badge, ein Forum, zwei Quizze, die News, ein Zertifikat, einen Lesestoff, einen Chat und einen Bericht. Das Arbeitsgedächtnis hält nur etwa vier neue Dinge gleichzeitig, Mira kann sie also nicht alle im Kopf behalten."), look: tt("the twelve loose items", "die zwölf losen Elemente"), apply: () => setMode("loose") },
    { title: tt("The same items in three groups", "Dieselben Elemente in drei Gruppen"), say: tt("Now LearnLoop groups the same twelve items into three chunks and gives each one a name: Learn, Progress and Talk. Mira has nothing less to look at, but she now has to hold only three things, and each name tells her what is inside. She goes straight to Learn and finds her quiz.", "Nun gruppiert LearnLoop dieselben zwölf Elemente in drei Chunks und gibt jedem einen Namen: Lernen, Fortschritt und Austausch. Mira hat nicht weniger anzusehen, aber sie muss nur noch drei Dinge im Kopf halten, und jeder Name sagt ihr, was darin ist. Sie geht direkt zu Lernen und findet ihr Quiz."), look: tt("the three named groups", "die drei benannten Gruppen"), apply: () => setMode("chunked") },
    { title: tt("What to take from it", "Was Sie mitnehmen"), say: tt("So chunking turns twelve things to hold into three, without removing anything. The second tool does the same job for the eye: a visual hierarchy, using size, colour, contrast and position, shows what to look at first. Whenever a screen shows more than about four separate things that a learner must handle, group them or hide some. Switch between the two views yourself to count.", "Chunking macht also aus zwölf Dingen, die man halten muss, drei, ohne etwas zu entfernen. Das zweite Werkzeug leistet dasselbe für das Auge: eine visuelle Hierarchie, mit Größe, Farbe, Kontrast und Position, zeigt, worauf man zuerst schauen soll. Wann immer ein Bildschirm mehr als etwa vier einzelne Dinge zeigt, die eine Lernende bewältigen muss, gruppieren Sie sie oder blenden Sie einige aus. Wechseln Sie selbst zwischen den beiden Ansichten, um zu zählen."), apply: () => setMode("chunked") },
  ] satisfies StoryPlan[]);
  return (
    <Diagram label={tt("Chunking: the same twelve items, loose and in three groups · Exploratory", "Chunking: dieselben zwölf Elemente, lose und in drei Gruppen · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("Working memory holds only a few new things at once. Grouping items into named chunks gives the learner fewer things to hold, and nothing is removed.", "Das Arbeitsgedächtnis hält nur wenige neue Dinge gleichzeitig. Elemente in benannte Chunks zu gruppieren, gibt der Lernenden weniger zu halten, und nichts wird entfernt.")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <div role="radiogroup" aria-label={tt("View", "Ansicht")} className="flex flex-wrap gap-2">
          {([
            ["loose", tt("Loose items", "Lose Elemente")],
            ["chunked", tt("Three chunks", "Drei Chunks")],
          ] as [ChunkMode, string][]).map(([id, label]) => (
            <button key={id} type="button" aria-pressed={mode === id} onClick={() => { story.leave(); setMode(id); }} className={clsx("btn btn-sm min-h-[40px] border", mode === id ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash")}>
              {label}
            </button>
          ))}
        </div>
        <div className={clsx("rounded-xl border-2 border-ash bg-paper p-3", story.step !== null && "anim-pulse")} aria-label={tt("A drawn start page", "Eine gezeichnete Startseite")}>
          {mode === "loose" ? (
            <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {items.map((x, i) => (
                <li key={x} className={clsx("rounded-md border border-ash/60 bg-mist px-2 py-2 text-center text-caption text-ink", i % 3 === 1 && "-translate-y-0.5", i % 4 === 2 && "translate-y-0.5")}>
                  {x}
                </li>
              ))}
            </ul>
          ) : (
            <div className="grid gap-2 md:grid-cols-3">
              {groups.map((g) => (
                <div key={g.name} className="rounded-lg border-2 border-accent/60 bg-accentSoft p-2">
                  <p className="text-body font-bold text-ink">{g.name}</p>
                  <ul className="mt-1 grid gap-1">
                    {g.items.map((x) => (
                      <li key={x} className="rounded-md border border-ash/60 bg-paper px-2 py-1.5 text-center text-caption text-ink">
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
        <Insight>
          {mode === "loose"
            ? tt("In plain words: twelve loose items are twelve things to hold, and working memory manages about four. The learner has to scan the whole page and may stop before finding what they came for.", "In einfachen Worten: Zwölf lose Elemente sind zwölf Dinge zum Halten, und das Arbeitsgedächtnis schafft etwa vier. Die Lernende muss die ganze Seite absuchen und hört vielleicht auf, bevor sie findet, wofür sie gekommen ist.")
            : tt("In plain words: the same twelve items in three named groups are three things to hold. Working memory has room for that, and the name of each group tells the learner where to look. Nothing was removed, only organised.", "In einfachen Worten: Dieselben zwölf Elemente in drei benannten Gruppen sind drei Dinge zum Halten. Dafür hat das Arbeitsgedächtnis Platz, und der Name jeder Gruppe sagt der Lernenden, wo sie suchen soll. Nichts wurde entfernt, nur geordnet.")}
        </Insight>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ A5 · LearnLoop weighs three load-reducing measures (interactive) */

export function WeighExample() {
  const [sel, setSel] = useState<string | null>(null);
  const story = useStory([
    { title: tt("The setting", "Die Ausgangslage"), say: tt("Let us look at LearnLoop again. A course for beginners on a technical subject is rated “too complicated”, the content has to stay, and the team has four weeks and €30,000. Three ideas are on the table, and we rate each on learning impact (how much it helps learners understand), effort (money and time) and risk (what could go wrong). The rule for effort is: under €8,000 is Low, up to €15,000 is Mid, above that is High.", "Sehen wir uns LearnLoop noch einmal an. Ein Kurs für Einsteiger zu einem technischen Thema wird als „zu kompliziert“ bewertet, der Inhalt muss bleiben, und das Team hat vier Wochen und 30.000 €. Drei Ideen liegen auf dem Tisch, und wir bewerten jede nach Lernwirkung (wie sehr sie Lernenden beim Verstehen hilft), Aufwand (Geld und Zeit) und Risiko (was schiefgehen kann). Die Regel für den Aufwand lautet: unter 8.000 € ist Niedrig, bis 15.000 € Mittel, darüber Hoch."), look: tt("the three bars and the effort bands", "die drei Balken und die Aufwandsbänder"), apply: () => setSel(null) },
    { title: tt("Shorten the content a lot", "Den Inhalt stark kürzen"), say: tt("The first idea, shortening the content a lot, costs €6,000, so its effort is Low. But the content is professionally necessary, so cutting a lot removes things the learners need. The risk is therefore High, and the learning impact is Low, because what is left may no longer teach the subject.", "Die erste Idee, den Inhalt stark zu kürzen, kostet 6.000 €, ihr Aufwand ist also Niedrig. Aber der Inhalt ist fachlich nötig, wer viel kürzt, entfernt also, was die Lernenden brauchen. Das Risiko ist deshalb Hoch und die Lernwirkung Niedrig, denn was bleibt, lehrt das Thema vielleicht nicht mehr."), look: tt("the top row, risk and impact", "die obere Zeile, Risiko und Wirkung"), apply: () => setSel("y1.risk") },
    { title: tt("Diagrams, then modules", "Diagramme, dann Module"), say: tt("The second idea, adding diagrams and graphics, costs €16,000, which is above €15,000, so its effort is High. A good diagram helps where a structure or a flow is described, so the impact is Mid, but it uses all four weeks, so the risk is Mid. The third idea, splitting the content into small modules, costs €12,000, so its effort is Mid. Chunking reduces what the learner holds at once without deleting content, so its impact is High, and its risk is Low because the split can be adjusted.", "Die zweite Idee, Diagramme und Grafiken hinzuzufügen, kostet 16.000 €, das ist über 15.000 €, ihr Aufwand ist also Hoch. Ein gutes Diagramm hilft dort, wo eine Struktur oder ein Ablauf beschrieben wird, die Wirkung ist also Mittel, aber es braucht alle vier Wochen, das Risiko ist also Mittel. Die dritte Idee, den Inhalt in kleine Module aufzuteilen, kostet 12.000 €, ihr Aufwand ist also Mittel. Chunking verringert, was die Lernende auf einmal hält, ohne Inhalt zu löschen, die Wirkung ist also Hoch, und das Risiko ist Niedrig, weil sich die Aufteilung anpassen lässt."), look: tt("the middle and the bottom row", "die mittlere und die untere Zeile"), apply: () => setSel("y3.impact") },
    { title: tt("Say which has the greatest effect", "Sagen, welche die größte Wirkung hat"), say: tt("So the module split has the greatest effect on learning, even though it is not the cheapest. Cheap and direct usually beats big and slow, but a measure that makes the screen lighter without making the learning better has a low impact. LearnLoop also names what it does not know: whether learners are overloaded by the amount or by the wording. Select any cell in the table to read its reason.", "Die Modulaufteilung hat also die größte Wirkung auf das Lernen, obwohl sie nicht die günstigste ist. Günstig und direkt schlägt meist groß und langsam, aber eine Maßnahme, die den Bildschirm leichter macht, ohne das Lernen zu verbessern, hat eine geringe Wirkung. LearnLoop nennt auch, was es nicht weiß: ob Lernende durch die Menge oder durch die Formulierung überlastet sind. Wählen Sie eine Zelle in der Tabelle, um ihren Grund zu lesen."), apply: () => setSel("y3.effort") },
  ] satisfies StoryPlan[]);
  const rows: GridRow[] = [
    { id: "y1", name: tt("Shorten the content a lot", "Den Inhalt stark kürzen"), sub: euro(6000), cells: {
      impact: { level: 1, reason: tt("Beginners need the content; cutting it removes what they came for.", "Einsteiger brauchen den Inhalt; ihn zu kürzen entfernt, wofür sie gekommen sind.") },
      effort: { level: 1, note: euro(6000), reason: tt("€6,000 is under €8,000, so the rule gives Low.", "6.000 € liegen unter 8.000 €, die Regel ergibt also Niedrig.") },
      risk: { level: 3, reason: tt("Too much is lost, and it cannot easily be put back.", "Zu viel geht verloren, und es lässt sich nicht leicht zurückholen.") },
    } },
    { id: "y2", name: tt("Add diagrams and graphics", "Diagramme und Grafiken hinzufügen"), sub: euro(16000), cells: {
      impact: { level: 2, reason: tt("A diagram helps where a structure or flow is described, not everywhere.", "Ein Diagramm hilft dort, wo eine Struktur oder ein Ablauf beschrieben wird, nicht überall.") },
      effort: { level: 3, note: euro(16000), reason: tt("€16,000 is above €15,000, so the rule gives High.", "16.000 € liegen über 15.000 €, die Regel ergibt also Hoch.") },
      risk: { level: 2, reason: tt("It uses the whole four weeks, and weak diagrams add clutter.", "Es braucht alle vier Wochen, und schwache Diagramme erhöhen die Unübersichtlichkeit.") },
    } },
    { id: "y3", name: tt("Split into small modules", "In kleine Module aufteilen"), sub: euro(12000), cells: {
      impact: { level: 3, reason: tt("The learner has less to hold at once, and the content is kept.", "Die Lernende hat weniger auf einmal im Kopf, und der Inhalt bleibt erhalten.") },
      effort: { level: 2, note: euro(12000), reason: tt("€12,000 lies between €8,000 and €15,000: Mid.", "12.000 € liegen zwischen 8.000 € und 15.000 €: Mittel.") },
      risk: { level: 1, reason: tt("Same content in small units, and the split can be adjusted.", "Derselbe Inhalt in kleinen Einheiten, und die Aufteilung lässt sich anpassen.") },
    } },
  ];
  const cols = [
    { id: "impact", label: tt("Learning impact", "Lernwirkung") },
    { id: "effort", label: tt("Effort", "Aufwand") },
    { id: "risk", label: tt("Risk", "Risiko") },
  ];
  return (
    <Diagram label={tt("A worked example: LearnLoop weighs three load-reducing measures · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei Maßnahmen zur Lastsenkung ab · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("Rate each measure on how much it helps learning, what it costs and what could go wrong. Cheap and direct usually beats big and slow when time is short, but a measure that only makes the screen lighter does not help learning.", "Bewerten Sie jede Maßnahme danach, wie sehr sie dem Lernen hilft, was sie kostet und was schiefgehen kann. Günstig und direkt schlägt bei knapper Zeit meist groß und langsam, aber eine Maßnahme, die den Bildschirm nur leichter macht, hilft dem Lernen nicht.")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <CostBands
          title={tt("LearnLoop, three measures: cost against the effort rule and the €30,000 budget", "LearnLoop, drei Maßnahmen: Kosten gegen die Aufwandsregel und das Budget von 30.000 €")}
          bars={[
            { name: tt("A · Shorten a lot", "A · Stark kürzen"), cost: 6000 },
            { name: tt("B · Add diagrams", "B · Diagramme"), cost: 16000 },
            { name: tt("C · Small modules", "C · Kleine Module"), cost: 12000 },
          ]}
          budget={30000}
          bands={[
            { to: 8000, label: tt("Low", "Niedrig") },
            { to: 15000, label: tt("Mid", "Mittel") },
            { to: null, label: tt("High", "Hoch") },
          ]}
        />
        <OptionGrid label={tt("LearnLoop · budget €30,000, four weeks", "LearnLoop · Budget 30.000 €, vier Wochen")} caption={tt("Three measures for LearnLoop (Case assumption, example company)", "Drei Maßnahmen für LearnLoop (Fallannahme, Beispielunternehmen)")} rows={rows} cols={cols} selected={sel} onSelect={(k) => { story.leave(); setSel(k); }} />
        <p className="rounded-md border border-line bg-canvas px-3 py-2 text-caption text-ink">
          <span className="smallcaps mr-1.5">{tt("Still unknown", "Noch unbekannt")}</span>
          <Gloss>{tt("Whether learners are overloaded by the amount of content or by its wording. LearnLoop would ask six beginners to explain the key point of one lesson before it commits the whole budget.", "Ob Lernende durch die Menge des Inhalts oder durch seine Formulierung überlastet sind. LearnLoop würde sechs Einsteiger bitten, den Kerngedanken einer Lektion zu erklären, bevor es das ganze Budget bindet.")}</Gloss>
        </p>
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B1 · two lenses on a UX decision (static) */

export function EffectivenessChain() {
  return (
    <ChainFig
      label={tt("Two lenses on a UX decision, and where they lead", "Zwei Linsen auf eine UX-Entscheidung, und wohin sie führen")}
      steps={[
        { h: tt("Learning effectiveness", "Lerneffektivität"), b: tt("Did the learner learn what the course promised?", "Hat die Lernende gelernt, was der Kurs versprach?"), kind: "a" },
        { h: tt("Cognitive efficiency", "Kognitive Effizienz"), b: tt("How much effort was needed to get there?", "Wie viel Anstrengung war nötig, um dorthin zu kommen?"), kind: "m" },
        { h: tt("Completion and trust", "Completion und Vertrauen"), b: tt("Learners finish and employers see results.", "Lernende schließen ab, und Arbeitgeber sehen Ergebnisse."), kind: "s" },
      ]}
      caption={tt("Effectiveness asks whether learning happened. Efficiency asks at what mental cost. A decision that raises one and lowers the other needs a stated reason.", "Effektivität fragt, ob Lernen stattgefunden hat. Effizienz fragt, zu welchen geistigen Kosten. Eine Entscheidung, die eine hebt und die andere senkt, braucht einen genannten Grund.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · five options for a hard course: load removed against depth kept (interactive) */

export function LoadVsDepth() {
  const [sel, setSel] = useState<string | null>(null);
  const [spot, setSpot] = useState<string | null>(null);
  const pts: MatrixPoint[] = [
    { id: "a", letter: "A", x: 0.8, y: 0.18, name: tt("Cut content by half", "Inhalt um die Hälfte kürzen"), reading: tt("It removes a lot of load, but it also removes the depth: learners finish, and cannot apply what is left.", "Es entfernt viel Belastung, aber auch die Tiefe: Lernende schließen ab und können das Übrige nicht anwenden.") },
    { id: "b", letter: "B", x: 0.64, y: 0.74, name: tt("Chunk into modules", "In Module gliedern"), reading: tt("It removes a good share of the load by splitting and ordering, and keeps the content, so it stays deep.", "Es entfernt einen guten Teil der Belastung durch Teilen und Ordnen und behält den Inhalt, bleibt also tief.") },
    { id: "c", letter: "C", x: 0.58, y: 0.6, name: tt("Add diagrams", "Diagramme hinzufügen"), reading: tt("It helps where a structure or flow is described and keeps the depth, but it removes less load than chunking.", "Es hilft dort, wo eine Struktur oder ein Ablauf beschrieben wird, und behält die Tiefe, entfernt aber weniger Belastung als Chunking.") },
    { id: "d", letter: "D", x: 0.82, y: 0.3, name: tt("Summary button only", "Nur ein Zusammenfassungs-Button"), reading: tt("It makes the lesson feel light, but a summary on demand drops the examples and practice that carry the depth.", "Es lässt die Lektion leicht wirken, aber eine Zusammenfassung auf Abruf lässt die Beispiele und Übungen weg, die die Tiefe tragen.") },
    { id: "e", letter: "E", x: 0.12, y: 0.88, name: tt("Keep as it is", "So lassen, wie es ist"), reading: tt("It keeps all the depth and removes no load, so learners stay overloaded and many leave.", "Es behält die ganze Tiefe und entfernt keine Belastung, die Lernenden bleiben also überlastet, und viele gehen.") },
  ];
  const story = useStory([
    { title: tt("Lighter is not always better", "Leichter ist nicht immer besser"), say: tt("Let us look at LearnLoop, which has a hard course for beginners and five options for it. Option A cuts the content by half. It removes a lot of mental load, so it sits far to the right, but it also removes most of the depth, so it sits low: the corner “Light but shallow”. Learners will finish, and then find they cannot apply what is left.", "Sehen wir uns LearnLoop an, das einen schweren Kurs für Einsteiger und fünf Optionen dafür hat. Option A kürzt den Inhalt um die Hälfte. Sie entfernt viel geistige Belastung und liegt deshalb weit rechts, entfernt aber auch den größten Teil der Tiefe und liegt deshalb unten: in der Ecke „Light but shallow“. Lernende werden abschließen und dann merken, dass sie das Übrige nicht anwenden können."), look: tt("point A, bottom right", "Punkt A, unten rechts"), apply: () => { setSel("a"); setSpot("a"); } },
    { title: tt("Too complex is also a risk", "Zu komplex ist auch ein Risiko"), say: tt("Option E keeps the course as it is. It keeps all the depth, so it sits high, but it removes no load, so it sits far to the left: the corner “Deep but heavy”. The learners stay lost, and many of them leave. So there are two risks, content that is too simple and content that is too complex, and a plan that names only one has not weighed the conflict.", "Option E lässt den Kurs, wie er ist. Sie behält die ganze Tiefe und liegt deshalb oben, entfernt aber keine Belastung und liegt deshalb weit links: in der Ecke „Deep but heavy“. Die Lernenden bleiben verloren, und viele gehen. Es gibt also zwei Risiken, zu einfachen und zu komplexen Inhalt, und ein Plan, der nur eines nennt, hat den Konflikt nicht abgewogen."), look: tt("point E, top left", "Punkt E, oben links"), apply: () => { setSel("e"); setSpot("e"); } },
    { title: tt("The aim, and what to take from it", "Das Ziel, und was Sie mitnehmen"), say: tt("Option B splits the course into modules with one goal each. It removes a good share of the load, and it keeps the content, so it sits near the top right: the corner “Aim here”. So remove extraneous load first, keep the difficulty the course exists to teach, and support it. Select any point yourself to read where it sits, and remember that the positions are a reading of this example, not a score.", "Option B teilt den Kurs in Module mit je einem Ziel. Sie entfernt einen guten Teil der Belastung und behält den Inhalt, liegt also nahe oben rechts: in der Ecke „Aim here“. Entfernen Sie also zuerst die extrinsische Belastung, behalten Sie die Schwierigkeit, die der Kurs lehren soll, und unterstützen Sie sie. Wählen Sie selbst einen Punkt, um zu lesen, wo er liegt, und bedenken Sie, dass die Positionen eine Lesart dieses Beispiels sind, keine Note."), look: tt("point B, top right", "Punkt B, oben rechts"), apply: () => { setSel("b"); setSpot("b"); } },
  ] satisfies StoryPlan[]);
  return (
    <Diagram label={tt("A worked example: LearnLoop's five options for a hard course · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoops fünf Optionen für einen schweren Kurs · Explorativ")}>
      <div className="space-y-3">
        <ThePoint>{tt("Lighter is not always better. Efficiency and depth pull against each other, so name what each option keeps and what it loses, and aim for much load removed with the depth kept.", "Leichter ist nicht immer besser. Effizienz und Tiefe ziehen gegeneinander, benennen Sie also, was jede Option behält und was sie verliert, und streben Sie viel entfernte Belastung bei erhaltener Tiefe an.")}</ThePoint>
        <Story steps={story.plan} step={story.step} onStep={story.go} />
        <MatrixFig
          title={tt("LearnLoop: five options for a hard course by mental load removed and depth kept", "LearnLoop: fünf Optionen für einen schweren Kurs nach entfernter geistiger Belastung und erhaltener Tiefe")}
          xLabel={tt("Mental load removed", "Entfernte geistige Belastung")}
          yLabel={tt("Depth of content kept", "Erhaltene Inhaltstiefe")}
          quads={[tt("Deep but heavy", "Deep but heavy"), tt("Aim here", "Aim here"), tt("Neither", "Neither"), tt("Light but shallow", "Light but shallow")]}
          points={pts}
          selected={sel}
          onSelect={(id) => {
            story.leave();
            setSpot(null);
            setSel(id);
          }}
          spot={spot}
        />
      </div>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ B3 · a decision without user data, filled in for LearnLoop (static) */

export function DecisionFrame() {
  return (
    <DecisionFrameFig
      label={tt("A decision without user data, filled in for LearnLoop", "Eine Entscheidung ohne Nutzerdaten, für LearnLoop ausgefüllt")}
      caption={tt("The four boxes make a decision checkable. The two boxes below make the next one less dependent on one person's taste.", "Die vier Kästen machen eine Entscheidung überprüfbar. Die zwei Kästen darunter machen die nächste weniger abhängig vom Geschmack einer Person.")}
      boxes={[
        [tt("I decide", "Ich entscheide"), tt("Rebuild one course in small modules and test it with five beginners.", "Einen Kurs in kleinen Modulen neu bauen und mit fünf Einsteigern testen.")],
        [tt("I do not know", "Ich weiß nicht"), tt("Whether learners are overloaded by the amount or by the wording; we have no user data yet.", "Ob Lernende durch die Menge oder durch die Formulierung überlastet sind; wir haben noch keine Nutzerdaten.")],
        [tt("I reverse if", "Ich nehme zurück, wenn"), tt("Fewer than 4 of 5 beginners can explain the key point after a lesson, or completion is not up 5 points after 8 weeks.", "weniger als 4 von 5 Einsteigern nach einer Lektion den Kerngedanken erklären können oder die Completion nach 8 Wochen nicht um 5 Punkte gestiegen ist.")],
        [tt("I give up", "Ich verzichte auf"), tt("The full diagram redesign this year.", "die komplette Diagramm-Neugestaltung in diesem Jahr.")],
      ]}
      rule={[
        [tt("Who decides", "Wer entscheidet"), tt("The head of learning with the content lead.", "Die Leiterin Lernen mit dem Content Lead.")],
        [tt("On what evidence", "Auf welcher Grundlage"), tt("A usability test with beginners, a short comprehension check, drop-out per lesson.", "Ein Usability-Test mit Einsteigern, eine kurze Verständnisprüfung, Abbruch pro Lektion.")],
      ]}
    />
  );
}
