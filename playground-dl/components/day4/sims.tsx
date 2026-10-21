"use client";

import { useState } from "react";
import clsx from "clsx";
import { tt } from "@/lib/lang";

/**
 * Day 4 · the working simulations of CLAUDE.md #60 and DL-STANDARD section 4, built one to one from the plan's clues. Platform A (a benchmark): a progress bar that reads
 * “40% done”, small successes that are visible (“Correct.” and “Next: task 4”), short tasks of about three minutes, and a goal at the start of each unit. Platform B
 * (MotivaLearn today): long content, no feedback, unclear goals, no progress and no end point. Both work like a platform (v1.6, 2026-10-19): every tab of the top bar, the
 * course, every lesson, the community, the help and the profile open a real page. The three options of Block 1.2 are the same short lesson with points and badges (A), with
 * a visible progress path (B), with interactive tasks (C). Own colours only; the content is made up and nothing is marked.
 */
const INK = "text-[#26323F]";
const btn = "min-h-[40px] rounded border border-[#B9B4C4] bg-[#F4F2F7] px-4 text-[14px] text-[#26323F] hover:bg-[#E9E6F0]";
const btnDark = "min-h-[40px] rounded bg-[#4A4458] px-4 text-[14px] font-semibold text-white hover:bg-[#383344]";

type Task = { ask: string; options: string[]; right: number };
const TASKS = (): Task[] => [
  { ask: tt("The other side asks for a lower price. What do you do first?", "Die Gegenseite fordert einen niedrigeren Preis. Was tun Sie zuerst?"), options: [tt("Ask what is behind the request", "Nachfragen, was hinter der Forderung steckt"), tt("Agree at once", "Sofort zustimmen")], right: 0 },
  { ask: tt("Which sentence opens a counter-offer?", "Welcher Satz eröffnet ein Gegenangebot?"), options: [tt("“We can offer this if you commit to a longer term.”", "„Wir können das anbieten, wenn Sie sich länger binden.“"), tt("“That is impossible.”", "„Das ist unmöglich.“")], right: 0 },
  { ask: tt("A counter-offer should name…", "Ein Gegenangebot sollte nennen …"), options: [tt("what you give and what you ask in return", "was Sie geben und was Sie dafür verlangen"), tt("only your own wish", "nur Ihren eigenen Wunsch")], right: 0 },
  { ask: tt("When the other side says no, you…", "Wenn die Gegenseite Nein sagt, …"), options: [tt("look for a second option to offer", "suchen Sie eine zweite Option, die Sie anbieten"), tt("end the talk", "beenden Sie das Gespräch")], right: 0 },
  { ask: tt("After the agreement you…", "Nach der Einigung …"), options: [tt("write it down and confirm it", "halten Sie sie schriftlich fest und bestätigen sie"), tt("trust memory", "verlassen Sie sich auf das Gedächtnis")], right: 0 },
];


const LONG = () => [
  tt("Motivation is one of the most studied topics in the psychology of learning, and the literature distinguishes many kinds of it. Some authors speak of drives, others of needs, others of goals, and each tradition uses its own words for what keeps a person at a task over time. A learner may begin a course because a manager asked, because a certificate is useful, or because the subject is interesting, and the reasons can change from one week to the next.", "Motivation ist eines der am meisten untersuchten Themen der Lernpsychologie, und die Literatur unterscheidet viele Arten davon. Manche Autoren sprechen von Trieben, andere von Bedürfnissen, andere von Zielen, und jede Tradition nutzt eigene Worte dafür, was eine Person über längere Zeit bei einer Aufgabe hält. Eine Lernende kann einen Kurs beginnen, weil eine Führungskraft darum bat, weil ein Zertifikat nützlich ist oder weil das Thema interessant ist, und die Gründe können sich von Woche zu Woche ändern."),
  tt("The research also shows that the same learner may feel very different on different days, depending on sleep, workload and what happened in the meeting before. For that reason a platform cannot assume that interest will be there when a lesson opens. What it can do is describe the topic, explain the terms in turn, and give the learner the space to read all of the material at their own pace, from the first definition to the last example, before moving on to the next lesson.", "Die Forschung zeigt auch, dass dieselbe Lernende sich an verschiedenen Tagen sehr unterschiedlich fühlen kann, je nach Schlaf, Arbeitslast und dem, was in der Besprechung davor geschah. Deshalb kann eine Plattform nicht davon ausgehen, dass Interesse da ist, wenn eine Lektion sich öffnet. Was sie tun kann, ist, das Thema zu beschreiben, die Begriffe der Reihe nach zu erklären und der Lernenden Raum zu geben, das gesamte Material in ihrem Tempo zu lesen, von der ersten Definition bis zum letzten Beispiel, bevor sie zur nächsten Lektion weitergeht."),
  tt("Over the following pages the course discusses each kind of motivation in turn, with background on where the ideas come from and how they were tested. Readers who reach the end will find that the pieces fit together, although the order in which they are presented follows the history of the field and not the order in which a practitioner would need them.", "Auf den folgenden Seiten bespricht der Kurs jede Art der Motivation der Reihe nach, mit Hintergrund dazu, woher die Ideen kommen und wie sie getestet wurden. Wer das Ende erreicht, wird feststellen, dass die Teile zusammenpassen, auch wenn die Reihenfolge ihrer Darstellung der Geschichte des Fachs folgt und nicht der Reihenfolge, in der eine Praktikerin sie brauchen würde."),
];


const PAGES = () => [
  { title: tt("Why plans slip", "Warum Pläne verrutschen"), text: tt("Plans slip when nobody checks them. A short weekly look at what is done and what is next catches most delays early.", "Pläne verrutschen, wenn niemand sie prüft. Ein kurzer wöchentlicher Blick darauf, was fertig ist und was als Nächstes kommt, fängt die meisten Verzögerungen früh ab."), q: tt("What catches most delays early?", "Was fängt die meisten Verzögerungen früh ab?"), a: [tt("A weekly look at what is done and next", "Ein wöchentlicher Blick auf Erledigtes und Nächstes"), tt("A longer plan", "Ein längerer Plan")] },
  { title: tt("Splitting the work", "Die Arbeit aufteilen"), text: tt("Big tasks hide their size. Splitting a task into steps of a day or less makes the work visible and easier to start.", "Große Aufgaben verbergen ihre Größe. Eine Aufgabe in Schritte von höchstens einem Tag zu teilen macht die Arbeit sichtbar und leichter zu beginnen."), q: tt("Why split a big task?", "Warum eine große Aufgabe teilen?"), a: [tt("It makes the work visible and easier to start", "Es macht die Arbeit sichtbar und leichter zu beginnen"), tt("It makes the task bigger", "Es macht die Aufgabe größer")] },
  { title: tt("Saying what is done", "Sagen, was fertig ist"), text: tt("A step is done when someone else could use its result. Writing that down avoids arguments at the end.", "Ein Schritt ist fertig, wenn jemand anderes sein Ergebnis nutzen könnte. Das aufzuschreiben vermeidet Streit am Ende."), q: tt("When is a step done?", "Wann ist ein Schritt fertig?"), a: [tt("When someone else could use its result", "Wenn jemand anderes sein Ergebnis nutzen könnte"), tt("When the author is tired", "Wenn der Autor müde ist")] },
];


/* ------------------------------------------------------------------ shared small pieces */

const rowBtn = "block min-h-[40px] w-full rounded border border-[#D9D5E2] bg-white px-3 py-1.5 text-left text-[14px] hover:bg-[#F4F2F7]";
const linkBtn = "min-h-[36px] rounded px-2 text-left text-[13px] underline decoration-dotted underline-offset-2 hover:bg-black/5";
const none = () => undefined;

/** A dark numbered marker of the pictures of Block 1.1: it marks a place a fact describes and says nothing about whether it is good or bad. Only in the pictures, never in the simulation. */
function Mk({ n, on, top, right = "-10px" }: { n: number; on?: boolean; top: string; right?: string }) {
  return on ? (
    <span aria-hidden className="absolute z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#17212E] text-[11px] font-bold text-white" style={{ top, right }}>{n}</span>
  ) : null;
}

function Faq({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <ul className="space-y-1">
      {items.map(([q, a], i) => (
        <li key={i}>
          <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className={rowBtn}>{q}</button>
          {open === i && <p className="px-3 py-2 text-[14px]">{a}</p>}
        </li>
      ))}
    </ul>
  );
}

function Thread({ posts, onPost }: { posts: [string, string][]; onPost: (t: string) => void }) {
  const [text, setText] = useState("");
  return (
    <div className="space-y-2">
      {posts.map(([who, t], i) => (<p key={i} className="rounded border border-[#D9D5E2] bg-[#FAF9FC] p-2 text-[14px]"><span className="block text-[12px] font-semibold text-[#5F5E5A]">{who}</span>{t}</p>))}
      <form className="space-y-1" onSubmit={(e) => { e.preventDefault(); if (text.trim()) { onPost(text.trim()); setText(""); } }}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} aria-label={tt("Your post", "Ihr Beitrag")} rows={3} className="w-full rounded border border-[#D9D5E2] p-2 text-[14px]" />
        <button type="submit" className={btn}>{tt("Post", "Beitrag senden")}</button>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ Platform A · a benchmark */

const A_FAQ = (): [string, string][] => [
  [tt("How is my progress counted?", "Wie wird mein Fortschritt gezählt?"), tt("Every finished task counts. The bar on the course page shows how many of the tasks you have done.", "Jede beendete Aufgabe zählt. Der Balken auf der Kursseite zeigt, wie viele Aufgaben Sie geschafft haben.")],
  [tt("Can I repeat a task?", "Kann ich eine Aufgabe wiederholen?"), tt("Yes. Open it from the course page and answer it again.", "Ja. Öffnen Sie sie auf der Kursseite und beantworten Sie sie erneut.")],
  [tt("How long does a task take?", "Wie lange dauert eine Aufgabe?"), tt("About three minutes. The time is shown on every task.", "Etwa drei Minuten. Die Zeit steht bei jeder Aufgabe.")],
];

/** The progress bar of platform A. */
function ABar({ pct, marks }: { pct: number; marks?: boolean }) {
  return (
    <div className="relative flex items-center gap-3 px-4 pt-3">
      <div className="h-2.5 flex-1 rounded-full bg-[#E4E0EC]" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={tt("Progress", "Fortschritt")}>
        <div className="h-2.5 rounded-full bg-[#2E7D5B]" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[13px] font-semibold">{tt(`${pct}% done`, `${pct} % geschafft`)}</span>
      <Mk n={1} on={marks} top="2px" right="-4px" />
    </div>
  );
}

const A_GOAL = () => (
  <>
    <span className="font-semibold">{tt("After this unit you can:", "Nach dieser Einheit können Sie:")}</span> {tt("write a counter-offer", "ein Gegenangebot schreiben")}
  </>
);

/** The course page of platform A: the goal of the unit, the progress bar and the list of tasks. */
export function ACourseView({ done, onOpen, marks }: { done: number[]; onOpen: (i: number) => void; marks?: boolean }) {
  const tasks = TASKS();
  const pct = Math.round((done.length / tasks.length) * 100);
  const next = tasks.findIndex((_, i) => !done.includes(i));
  return (
    <div>
      <ABar pct={pct} marks={marks} />
      <div className="space-y-2 px-4 py-4">
        <p className="relative rounded bg-[#EEF3EE] px-3 py-2 text-[13px]">{A_GOAL()}<Mk n={4} on={marks} top="6px" right="-4px" /></p>
        <ol className="space-y-1.5">
          {tasks.map((t, i) => (
            <li key={i}>
              <button type="button" onClick={() => onOpen(i)} className={clsx("flex min-h-[44px] w-full items-center gap-3 rounded border px-3 text-left", i === next ? "border-2 border-[#4A4458]" : "border-[#D9D5E2]")}>
                <span aria-hidden className={clsx("flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-bold text-white", done.includes(i) ? "bg-[#2E7D5B]" : "bg-[#B9B4C4]")}>{done.includes(i) ? "✓" : i + 1}</span>
                <span className="flex-1 text-[14px]">{tt(`Task ${i + 1}`, `Aufgabe ${i + 1}`)}</span>
                <span className="text-[12px] text-[#5F5E5A]">{tt("3 min", "3 Min.")}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** A task of platform A: a question, a check, and after the check the result and the next task. */
export function ATaskView({ i, done, pick, result, status, onPick, onCheck, onNext, marks }: { i: number; done: number[]; pick: number | null; result: "right" | "wrong" | null; status?: string; onPick: (j: number) => void; onCheck: () => void; onNext: () => void; marks?: boolean }) {
  const tasks = TASKS();
  const t = tasks[i];
  const pct = Math.round((done.length / tasks.length) * 100);
  return (
    <div>
      <ABar pct={pct} />
      <div className="space-y-3 px-4 py-4">
        <p className="rounded bg-[#EEF3EE] px-3 py-2 text-[13px]">{A_GOAL()}</p>
        <p className="relative text-[12px] font-semibold text-[#4A4458]">{tt(`Task ${i + 1} · about 3 minutes`, `Aufgabe ${i + 1} · etwa 3 Minuten`)}<Mk n={3} on={marks} top="-2px" right="-4px" /></p>
        <fieldset className="space-y-2">
          <legend className="text-[15px] font-semibold">{t.ask}</legend>
          {t.options.map((o, j) => (
            <label key={j} className={clsx("flex min-h-[44px] cursor-pointer items-center gap-2 rounded border px-3 text-[14px]", pick === j ? "border-[#4A4458] bg-[#F4F2F7]" : "border-[#D9D5E2]")}>
              <input type="radio" name="task" checked={pick === j} onChange={() => onPick(j)} />
              {o}
            </label>
          ))}
        </fieldset>
        {result === null ? (
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={onCheck} className={btnDark}>{tt("Check", "Prüfen")}</button>
            {status && <span role="status" className="text-[13px]">{status}</span>}
          </div>
        ) : (
          <div className="relative space-y-2" aria-live="polite">
            <p className="text-[15px] font-semibold">{result === "right" ? tt("Correct.", "Richtig.") : tt("Not quite.", "Nicht ganz.")}</p>
            <button type="button" onClick={onNext} className={btnDark}>{i + 2 <= tasks.length ? tt(`Next: task ${i + 2}`, `Weiter: Aufgabe ${i + 2}`) : tt("Back to the course", "Zurück zum Kurs")}</button>
            <Mk n={2} on={marks} top="0px" right="-4px" />
          </div>
        )}
      </div>
    </div>
  );
}

/** Platform A, a benchmark: the course page, the tasks, a profile and a help page. */
export function GuidedPlatformSim() {
  const tasks = TASKS();
  const [page, setPage] = useState<"course" | "task" | "profile" | "help">("course");
  const [done, setDone] = useState<number[]>([0, 1]);
  const [cur, setCur] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [result, setResult] = useState<"right" | "wrong" | null>(null);
  const [status, setStatus] = useState("");
  const [saved, setSaved] = useState(false);
  const open = (i: number) => { setCur(i); setPick(null); setResult(null); setStatus(""); setPage("task"); };
  const nav = (id: typeof page, label: string) => (
    <button type="button" aria-current={page === id ? "page" : undefined} onClick={() => { setPage(id); setSaved(false); }} className={clsx("min-h-[36px] rounded px-3 text-[13px]", page === id ? "bg-white text-[#4A4458]" : "text-white hover:bg-white/15")}>{label}</button>
  );
  return (
    <div className={INK}>
      <div className="flex flex-wrap items-center gap-1 bg-[#4A4458] px-3 py-2 text-white">
        <span className="mr-3 font-serif text-[15px] font-bold">{tt("Negotiation basics", "Verhandlungsgrundlagen")}</span>
        {nav("course", tt("Course", "Kurs"))}{nav("profile", tt("Profile", "Profil"))}{nav("help", tt("Help", "Hilfe"))}
      </div>
      {page === "course" && <ACourseView done={done} onOpen={open} />}
      {page === "task" && (
        <ATaskView
          i={cur} done={done} pick={pick} result={result} status={status}
          onPick={(j) => { setPick(j); setResult(null); setStatus(""); }}
          onCheck={() => (pick === null ? setStatus(tt("Choose an answer first.", "Wählen Sie zuerst eine Antwort.")) : setResult(pick === tasks[cur].right ? "right" : "wrong"))}
          onNext={() => { setDone((d) => (d.includes(cur) ? d : [...d, cur].sort())); if (cur + 1 < tasks.length) open(cur + 1); else setPage("course"); }}
        />
      )}
      {page === "profile" && (
        <form className="max-w-sm space-y-3 px-4 py-4" onSubmit={(e) => { e.preventDefault(); setSaved(true); }}>
          <h3 className="text-[17px] font-semibold">{tt("Profile", "Profil")}</h3>
          <label className="block text-[13px]">{tt("Name", "Name")}<input defaultValue="Mia Berg" className="mt-1 block min-h-[36px] w-full rounded border border-[#D9D5E2] px-2 text-[14px]" /></label>
          <p className="text-[13px]">{tt("Course: Negotiation basics", "Kurs: Verhandlungsgrundlagen")} · {tt(`${done.length} of ${tasks.length} tasks done`, `${done.length} von ${tasks.length} Aufgaben geschafft`)}</p>
          <button type="submit" className={btn}>{tt("Save", "Speichern")}</button>
          {saved && <p role="status" className="text-[13px]">{tt("Your profile was saved.", "Ihr Profil wurde gespeichert.")}</p>}
        </form>
      )}
      {page === "help" && <div className="space-y-2 px-4 py-4"><h3 className="text-[17px] font-semibold">{tt("Help", "Hilfe")}</h3><Faq items={A_FAQ()} /></div>}
    </div>
  );
}

/* ------------------------------------------------------------------ Platform B · MotivaLearn today */

const B_LESSONS = (): { title: string; pages: string[] }[] => [
  { title: tt("Introduction to motivation", "Einführung in die Motivation"), pages: LONG() },
  { title: tt("Intrinsic and extrinsic motivation", "Intrinsische und extrinsische Motivation"), pages: [
    tt("A distinction that runs through the literature is the one between motivation that comes from the activity itself and motivation that comes from a consequence attached to it. The first is usually called intrinsic, the second extrinsic, and most authors place them on a continuum rather than treat them as two boxes, because a person may begin with an external reason and gradually adopt it as their own.", "Eine Unterscheidung, die sich durch die Literatur zieht, ist die zwischen Motivation, die aus der Tätigkeit selbst kommt, und Motivation, die aus einer an sie geknüpften Folge kommt. Die erste heißt meist intrinsisch, die zweite extrinsisch, und die meisten Autoren sehen beide auf einem Kontinuum statt als zwei Schubladen, weil eine Person mit einem äußeren Grund beginnen und ihn nach und nach zu ihrem eigenen machen kann."),
    tt("Empirical work has examined what happens to interest when an external reward is introduced for an activity that was already enjoyed. Some studies report a decline once the reward is removed, while others find no effect or even an increase, depending on how the reward is described, how it is delivered and how the person interprets it. The results are therefore best read together rather than one at a time.", "Empirische Arbeiten haben untersucht, was mit dem Interesse geschieht, wenn für eine Tätigkeit, die ohnehin Freude machte, eine äußere Belohnung eingeführt wird. Manche Studien berichten von einem Rückgang, sobald die Belohnung entfällt, andere finden keinen Effekt oder sogar einen Anstieg, je nachdem, wie die Belohnung beschrieben wird, wie sie gegeben wird und wie die Person sie deutet. Die Ergebnisse lesen sich daher am besten zusammen und nicht einzeln."),
  ] },
  { title: tt("Needs and drives", "Bedürfnisse und Antriebe"), pages: [
    tt("Theories of needs start from the idea that behaviour is directed by something a person lacks or wants. Early versions listed physiological drives, later ones added needs for safety, belonging, esteem and growth, and still later ones argued that a small number of psychological needs, such as competence, autonomy and relatedness, are enough to explain most differences in engagement.", "Bedürfnistheorien gehen davon aus, dass Verhalten von etwas gelenkt wird, das einer Person fehlt oder das sie will. Frühe Fassungen listeten körperliche Antriebe auf, spätere fügten Bedürfnisse nach Sicherheit, Zugehörigkeit, Wertschätzung und Wachstum hinzu, und noch spätere meinten, dass wenige psychologische Bedürfnisse wie Kompetenz, Autonomie und Verbundenheit genügen, um die meisten Unterschiede im Engagement zu erklären."),
    tt("Critics point out that such lists are difficult to test, because almost any behaviour can be explained afterwards by naming a need that it satisfies. Supporters reply that the better versions make predictions about which conditions raise or lower engagement, and that a number of these predictions have held up across cultures and age groups.", "Kritiker weisen darauf hin, dass solche Listen schwer zu prüfen sind, weil sich fast jedes Verhalten nachträglich damit erklären lässt, dass man ein Bedürfnis nennt, das es befriedigt. Befürworter entgegnen, dass die besseren Fassungen Vorhersagen darüber treffen, welche Bedingungen das Engagement erhöhen oder senken, und dass sich mehrere davon über Kulturen und Altersgruppen hinweg bewährt haben."),
  ] },
  { title: tt("Expectation and value", "Erwartung und Wert"), pages: [
    tt("Expectancy-value theories describe motivation as the product of two judgements: how likely a person thinks success is, and how much the outcome is worth to them. If either judgement is close to zero, the product is close to zero, which is why a task that is seen as impossible and a task that is seen as pointless can produce the same lack of effort.", "Erwartungs-Wert-Theorien beschreiben Motivation als Produkt zweier Urteile: wie wahrscheinlich eine Person den Erfolg hält und wie viel ihr das Ergebnis wert ist. Liegt eines der Urteile nahe null, liegt auch das Produkt nahe null, weshalb eine Aufgabe, die als unmöglich gilt, und eine, die als sinnlos gilt, dieselbe fehlende Anstrengung hervorbringen können."),
    tt("Later versions separate the value into several parts, among them enjoyment of the task, usefulness for a future goal, personal importance and the cost in time and energy. The authors stress that these judgements are subjective and can differ between two people looking at the same task, and that they can change as a person gains experience.", "Spätere Fassungen zerlegen den Wert in mehrere Teile, darunter Freude an der Aufgabe, Nützlichkeit für ein künftiges Ziel, persönliche Bedeutung und den Aufwand an Zeit und Energie. Die Autoren betonen, dass diese Urteile subjektiv sind, bei zwei Personen derselben Aufgabe verschieden ausfallen können und sich mit wachsender Erfahrung ändern."),
  ] },
  { title: tt("Rewards and their side effects", "Belohnungen und ihre Nebenwirkungen"), pages: [
    tt("Rewards can be tangible, such as money or a prize, or symbolic, such as praise, points and badges. The literature distinguishes rewards that are promised in advance for taking part from rewards that are given for reaching a standard, and it reports that the two can have different effects on later behaviour, although the findings are not uniform.", "Belohnungen können greifbar sein, etwa Geld oder ein Preis, oder symbolisch, etwa Lob, Punkte und Abzeichen. Die Literatur unterscheidet Belohnungen, die für die Teilnahme im Voraus versprochen werden, von solchen, die für das Erreichen eines Standards gegeben werden, und berichtet, dass beide unterschiedlich auf späteres Verhalten wirken können, wenn auch die Befunde nicht einheitlich sind."),
    tt("Several authors have described unintended consequences, for example people focusing on the quantity that is rewarded rather than the quality that was intended, or losing interest once the reward stops. Others argue that these effects are small when rewards are informative and are linked to the task. The debate is ongoing, and practitioners are advised to read the primary studies.", "Mehrere Autoren haben unbeabsichtigte Folgen beschrieben, etwa dass Menschen sich auf die belohnte Menge statt auf die gemeinte Qualität konzentrieren oder das Interesse verlieren, sobald die Belohnung endet. Andere meinen, dass diese Effekte klein sind, wenn Belohnungen informativ und an die Aufgabe geknüpft sind. Die Debatte dauert an, und Praktikern wird geraten, die Originalstudien zu lesen."),
  ] },
  { title: tt("Attention, effort and fatigue", "Aufmerksamkeit, Anstrengung und Ermüdung"), pages: [
    tt("Sustained effort draws on attention, which is limited and varies over the day. Studies of vigilance show that performance on long monotonous tasks declines after a period that depends on the task, the person and the conditions, and that short breaks or changes of activity can partly restore it, although the evidence on the best interval is mixed.", "Anhaltende Anstrengung beansprucht Aufmerksamkeit, die begrenzt ist und im Tagesverlauf schwankt. Studien zur Vigilanz zeigen, dass die Leistung bei langen monotonen Aufgaben nach einer Zeit sinkt, die von der Aufgabe, der Person und den Bedingungen abhängt, und dass kurze Pausen oder ein Wechsel der Tätigkeit sie teilweise wiederherstellen können, wenn auch die Befunde zum besten Abstand uneinheitlich sind."),
    tt("In learning settings, researchers have also discussed the difference between fatigue that comes from the task and boredom that comes from its lack of challenge. The two can look alike from the outside, since in both cases the person disengages, but they point to different causes and, in the view of most authors, to different responses.", "In Lernsituationen haben Forschende auch den Unterschied zwischen Ermüdung durch die Aufgabe und Langeweile durch fehlende Herausforderung diskutiert. Von außen sehen beide ähnlich aus, da die Person sich in beiden Fällen abwendet, aber sie deuten auf unterschiedliche Ursachen und nach Ansicht der meisten Autoren auf unterschiedliche Reaktionen."),
  ] },
];

const B_FAQ = (): [string, string][] => [
  [tt("How do I start a course?", "Wie beginne ich einen Kurs?"), tt("Open Courses in the top bar and choose the course.", "Öffnen Sie in der oberen Leiste Kurse und wählen Sie den Kurs.")],
  [tt("Can I go back to an earlier lesson?", "Kann ich zu einer früheren Lektion zurückgehen?"), tt("Yes. Open the course page and choose the lesson.", "Ja. Öffnen Sie die Kursseite und wählen Sie die Lektion.")],
  [tt("Who can I ask?", "Wen kann ich fragen?"), tt("Write in the community, or e-mail support.", "Schreiben Sie in der Community oder per E-Mail an den Support.")],
];
const B_THREADS = (): { title: string; posts: [string, string][] }[] => [
  { title: tt("Which lesson should I read first?", "Welche Lektion soll ich zuerst lesen?"), posts: [[tt("Jonas", "Jonas"), tt("I just started. Does the order matter?", "Ich habe gerade angefangen. Kommt es auf die Reihenfolge an?")]] },
  { title: tt("Is there a summary?", "Gibt es eine Zusammenfassung?"), posts: [[tt("Ayse", "Ayse"), tt("I read three lessons. Is there a short version somewhere?", "Ich habe drei Lektionen gelesen. Gibt es irgendwo eine Kurzfassung?")]] },
];

/** The course page of MotivaLearn: a list of lesson titles, nothing about goals, nothing about progress. */
export function BCourseView({ onOpen, marks }: { onOpen: (i: number) => void; marks?: boolean }) {
  return (
    <div className="relative space-y-2 px-4 py-4">
      <h3 className="relative text-[17px] font-semibold">{tt("Motivation in learning", "Motivation beim Lernen")}<Mk n={7} on={marks} top="2px" right="-4px" /></h3>
      <p className="text-[14px]">{tt("A course on motivation.", "Ein Kurs über Motivation.")}</p>
      <ul className="relative space-y-1.5">
        {B_LESSONS().map((l, i) => (
          <li key={i}><button type="button" onClick={() => onOpen(i)} className="block min-h-[44px] w-full rounded border border-[#CCCCCC] bg-white px-3 text-left text-[14px] hover:bg-[#F3F3F3]">{l.title}</button></li>
        ))}
        <Mk n={8} on={marks} top="40%" right="-4px" />
      </ul>
    </div>
  );
}

/** A page of a lesson of MotivaLearn: one long block of reading and a Continue button, no task, no tick. */
export function BLessonView({ lesson, page, onContinue, onCourse, marks }: { lesson: number; page: number; onContinue: () => void; onCourse: () => void; marks?: boolean }) {
  const l = B_LESSONS()[lesson];
  return (
    <div className="space-y-3 px-4 py-4">
      <button type="button" onClick={onCourse} className={linkBtn}>‹ {tt("Back to the course", "Zurück zum Kurs")}</button>
      <h3 className="text-[17px] font-semibold">{l.title}</h3>
      <p className="relative text-[15px] leading-[1.8]">{l.pages[page]}<Mk n={5} on={marks} top="0px" right="-4px" /></p>
      <div className="relative"><button type="button" onClick={onContinue} className={btn}>{tt("Continue", "Weiter")}</button><Mk n={6} on={marks} top="-6px" right="calc(100% - 100px)" /></div>
    </div>
  );
}

/** Platform B, and MotivaLearn today: long content, no feedback, unclear goals, no progress, no end point. */
export function LongPlatformSim() {
  const lessons = B_LESSONS();
  const [view, setView] = useState<"home" | "course" | "lesson" | "community" | "thread" | "help">("course");
  const [lesson, setLesson] = useState(0);
  const [page, setPage] = useState(0);
  const [thread, setThread] = useState(0);
  const [posts, setPosts] = useState<Record<number, [string, string][]>>({});
  const nav = (id: typeof view, label: string) => (
    <button type="button" aria-current={view === id ? "page" : undefined} onClick={() => setView(id)} className={clsx("min-h-[36px] rounded px-3 text-[13px]", view === id ? "bg-white text-[#4A4A4A]" : "text-white hover:bg-white/15")}>{label}</button>
  );
  const cont = () => {
    if (page + 1 < lessons[lesson].pages.length) setPage(page + 1);
    else if (lesson + 1 < lessons.length) { setLesson(lesson + 1); setPage(0); }
    else setView("course");
  };
  const th = B_THREADS();
  return (
    <div className={INK}>
      <div className="flex flex-wrap items-center gap-1 bg-[#6B6F76] px-3 py-2 text-white">
        <button type="button" onClick={() => setView("home")} className="mr-3 min-h-[36px] font-serif text-[15px] font-bold">MotivaLearn</button>
        {nav("home", tt("Home", "Start"))}{nav("course", tt("Courses", "Kurse"))}{nav("community", tt("Community", "Community"))}{nav("help", tt("Help", "Hilfe"))}
      </div>
      {view === "home" && (
        <div className="space-y-3 px-4 py-4">
          <h3 className="text-[17px] font-semibold">{tt("Welcome to MotivaLearn", "Willkommen bei MotivaLearn")}</h3>
          <p className="text-[14px]">{tt("Learn at your own pace. Open a course to begin.", "Lernen Sie in Ihrem Tempo. Öffnen Sie einen Kurs, um zu beginnen.")}</p>
          <button type="button" onClick={() => setView("course")} className={btn}>{tt("Go to the course", "Zum Kurs")}</button>
        </div>
      )}
      {view === "course" && <BCourseView onOpen={(i) => { setLesson(i); setPage(0); setView("lesson"); }} />}
      {view === "lesson" && <BLessonView lesson={lesson} page={page} onContinue={cont} onCourse={() => setView("course")} />}
      {view === "community" && (
        <div className="space-y-2 px-4 py-4">
          <h3 className="text-[17px] font-semibold">{tt("Community", "Community")}</h3>
          <ul className="space-y-1">{th.map((t, i) => (<li key={i}><button type="button" onClick={() => { setThread(i); setView("thread"); }} className={rowBtn}>{t.title}</button></li>))}</ul>
        </div>
      )}
      {view === "thread" && (
        <div className="space-y-2 px-4 py-4">
          <button type="button" onClick={() => setView("community")} className={linkBtn}>‹ {tt("Community", "Community")}</button>
          <h3 className="text-[17px] font-semibold">{th[thread].title}</h3>
          <Thread posts={[...th[thread].posts, ...(posts[thread] ?? [])]} onPost={(t) => setPosts((s) => ({ ...s, [thread]: [...(s[thread] ?? []), ["Mia Berg", t]] }))} />
        </div>
      )}
      {view === "help" && <div className="space-y-2 px-4 py-4"><h3 className="text-[17px] font-semibold">{tt("Help", "Hilfe")}</h3><Faq items={B_FAQ()} /></div>}
    </div>
  );
}

/** Four screens of the two platforms, exactly as the simulations show them, for the pictures of Block 1.1: not clickable, the numbers mark the places the facts describe. */
export type ShotKind = "aCourse" | "aTask" | "bLesson" | "bCourse";
export function MotivaShot({ kind, marks }: { kind: ShotKind; marks: boolean }) {
  const a = kind === "aCourse" || kind === "aTask";
  return (
    <div className={clsx("w-[560px] bg-white", INK)} aria-hidden>
      {a ? (
        <div className="flex items-center gap-1 bg-[#4A4458] px-3 py-2 text-white"><span className="mr-3 font-serif text-[15px] font-bold">{tt("Negotiation basics", "Verhandlungsgrundlagen")}</span><span className="rounded bg-white px-3 py-1 text-[13px] text-[#4A4458]">{tt("Course", "Kurs")}</span><span className="px-3 text-[13px]">{tt("Profile", "Profil")}</span><span className="px-3 text-[13px]">{tt("Help", "Hilfe")}</span></div>
      ) : (
        <div className="flex items-center gap-1 bg-[#6B6F76] px-3 py-2 text-white"><span className="mr-3 font-serif text-[15px] font-bold">MotivaLearn</span><span className="px-3 text-[13px]">{tt("Home", "Start")}</span><span className="rounded bg-white px-3 py-1 text-[13px] text-[#4A4A4A]">{tt("Courses", "Kurse")}</span><span className="px-3 text-[13px]">{tt("Community", "Community")}</span><span className="px-3 text-[13px]">{tt("Help", "Hilfe")}</span></div>
      )}
      {kind === "aCourse" && <ACourseView done={[0, 1]} onOpen={none} marks={marks} />}
      {kind === "aTask" && <ATaskView i={2} done={[0, 1]} pick={0} result="right" onPick={none} onCheck={none} onNext={none} marks={marks} />}
      {kind === "bCourse" && <BCourseView onOpen={none} marks={marks} />}
      {kind === "bLesson" && <BLessonView lesson={1} page={0} onContinue={none} onCourse={none} marks={marks} />}
    </div>
  );
}

/* ------------------------------------------------------------------ Block 1.2 · the three options as the same small platform */

type OView = { v: "home" } | { v: "lesson"; i: number } | { v: "done" } | { v: "badges" } | { v: "board" } | { v: "progress" } | { v: "summary" };
const STEPS = () => [tt("Write down the big task", "Die große Aufgabe aufschreiben"), tt("Split it into steps of a day or less", "Sie in Schritte von höchstens einem Tag teilen"), tt("Start with the first step", "Mit dem ersten Schritt beginnen")];
const WHY = () => [
  tt("A short weekly look at what is done and what is next catches most delays while they are still small.", "Ein kurzer wöchentlicher Blick darauf, was fertig ist und was als Nächstes kommt, fängt die meisten Verzögerungen ab, solange sie klein sind."),
  tt("Writing the task down, splitting it and starting with the first step is the order the lesson describes.", "Die Aufgabe aufzuschreiben, sie zu teilen und mit dem ersten Schritt zu beginnen, ist die Reihenfolge, die die Lektion beschreibt."),
  tt("A step is done when someone else could use its result; writing that down avoids arguments at the end.", "Ein Schritt ist fertig, wenn jemand anderes sein Ergebnis nutzen könnte; das aufzuschreiben vermeidet Streit am Ende."),
];

/** The three options of Block 1.2, each as the same small platform with the same course and the same three lessons: A with points, badges and a ranking, B with a visible progress path, C with a different task on every page. */
export function EngagementOptionSim({ option }: { option: "A" | "B" | "C" }) {
  const pages = PAGES();
  const [view, setView] = useState<OView>({ v: "home" });
  const [done, setDone] = useState<number[]>([]);
  const [pick, setPick] = useState<Record<number, number>>({});
  const [order, setOrder] = useState([1, 2, 0]);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [toast, setToast] = useState("");
  const points = done.length * 10 + (done.length === pages.length ? 10 : 0);
  const level = Math.floor(points / 20) + 1;
  const next = Math.min(pages.length - 1, done.length);
  const BADGES = [
    { n: tt("Explorer", "Entdecker"), need: tt("Finish the first lesson", "Die erste Lektion beenden"), ok: done.length >= 1 },
    { n: tt("Planner", "Planer"), need: tt("Finish two lessons", "Zwei Lektionen beenden"), ok: done.length >= 2 },
    { n: tt("Finisher", "Durchhalter"), need: tt("Finish the course", "Den Kurs beenden"), ok: done.length >= pages.length },
  ];
  const finish = (i: number) => {
    setDone((d) => (d.includes(i) ? d : [...d, i]));
    setToast(option === "A" ? tt("+10 points", "+10 Punkte") : "");
    setView(i === pages.length - 1 ? { v: "done" } : { v: "lesson", i: i + 1 });
  };
  const go = (x: OView) => { setToast(""); setView(x); };
  const nav: [string, OView][] = [[tt("Course", "Kurs"), { v: "home" }]];
  if (option === "A") nav.push([tt("Badges", "Badges"), { v: "badges" }], [tt("Ranking", "Rangliste"), { v: "board" }]);
  if (option === "B") nav.push([tt("My progress", "Mein Fortschritt"), { v: "progress" }]);
  if (option === "C") nav.push([tt("My answers", "Meine Antworten"), { v: "summary" }]);
  const pct = Math.round((done.length / pages.length) * 100);
  const bar = (
    <div className="h-3 rounded-full bg-[#E4E0EC]" role="progressbar" aria-valuemin={0} aria-valuemax={pages.length} aria-valuenow={done.length} aria-label={tt("Course progress", "Kursfortschritt")}>
      <div className="h-3 rounded-full bg-[#4A4458]" style={{ width: `${pct}%` }} />
    </div>
  );
  const head = (
    <div className="bg-[#4A4458] text-white">
      <div className="flex items-center justify-between px-4 py-2.5">
        <span className="font-serif text-[15px] font-bold">{tt("Planning basics", "Planungsgrundlagen")}</span>
        {option === "A" && <span className="rounded-full bg-white px-3 py-0.5 text-[13px] font-bold text-[#4A4458]">{tt(`${points} points · level ${level}`, `${points} Punkte · Stufe ${level}`)}</span>}
        {option === "B" && <span className="text-[13px]">{tt(`${done.length} of ${pages.length} done`, `${done.length} von ${pages.length} geschafft`)}</span>}
      </div>
      <div className="flex gap-1 px-3 pb-2">
        {nav.map(([l, t]) => (
          <button key={l} type="button" onClick={() => go(t)} className={clsx("min-h-[32px] rounded px-3 text-[13px]", view.v === t.v ? "bg-white text-[#4A4458]" : "hover:bg-white/15")}>{l}</button>
        ))}
      </div>
    </div>
  );
  const back = <button type="button" onClick={() => go({ v: "home" })} className="text-[13px] underline">← {tt("Back to the course", "Zurück zum Kurs")}</button>;
  const reset = () => { setDone([]); setPick({}); setChecked({}); setOrder([1, 2, 0]); go({ v: "home" }); };
  let body: React.ReactNode;
  if (view.v === "badges") {
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{tt("Your badges", "Ihre Badges")}</h3>
        <ul className="grid gap-2 sm:grid-cols-3">
          {BADGES.map((b) => (
            <li key={b.n} className={clsx("rounded border p-3 text-[13px]", b.ok ? "border-[#4A4458] bg-[#FFF4D6]" : "border-[#D9D5E2] bg-[#FAF9FC] text-[#5F5E5A]")}>
              <p className="text-[15px] font-semibold">{b.ok ? "★ " : "☆ "}{b.n}</p>
              <p>{b.need}</p>
              <p className="mt-1 font-semibold">{b.ok ? tt("Unlocked", "Freigeschaltet") : tt("Locked", "Gesperrt")}</p>
            </li>
          ))}
        </ul>
        <p className="text-[13px] text-[#5F5E5A]">{tt("Every finished lesson gives 10 points; finishing the course gives 10 more. A new level every 20 points.", "Jede beendete Lektion gibt 10 Punkte; den Kurs zu beenden gibt 10 weitere. Alle 20 Punkte eine neue Stufe.")}</p>
        {back}
      </div>
    );
  } else if (view.v === "board") {
    const you = tt("You", "Sie");
    const rows = [{ n: "Jonas K.", p: 60 }, { n: "Mira S.", p: 40 }, { n: "Tomas B.", p: 20 }, { n: you, p: points }].sort((a, b) => b.p - a.p);
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{tt("Ranking this week", "Rangliste dieser Woche")}</h3>
        <ol className="space-y-1">
          {rows.map((r, k) => (
            <li key={r.n} className={clsx("flex justify-between rounded border px-3 py-2 text-[14px]", r.n === you ? "border-[#4A4458] bg-[#F4F2F7] font-semibold" : "border-[#D9D5E2]")}><span>{k + 1}. {r.n}</span><span>{tt(`${r.p} points`, `${r.p} Punkte`)}</span></li>
          ))}
        </ol>
        <p className="text-[13px] text-[#5F5E5A]">{tt("The other names and points are made up.", "Die anderen Namen und Punkte sind erfunden.")}</p>
        {back}
      </div>
    );
  } else if (view.v === "progress") {
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{tt("Your progress", "Ihr Fortschritt")}</h3>
        <ul className="space-y-1 text-[14px]">
          <li>{tt(`Lessons finished: ${done.length} of ${pages.length}`, `Beendete Lektionen: ${done.length} von ${pages.length}`)}</li>
          <li>{tt(`Time spent: about ${done.length * 3} minutes`, `Verbrachte Zeit: etwa ${done.length * 3} Minuten`)}</li>
          <li>{tt(`Time left: about ${(pages.length - done.length) * 3} minutes`, `Verbleibende Zeit: etwa ${(pages.length - done.length) * 3} Minuten`)}</li>
        </ul>
        {bar}
        {back}
      </div>
    );
  } else if (view.v === "summary") {
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{tt("Your answers", "Ihre Antworten")}</h3>
        <ul className="space-y-2 text-[14px]">
          {pages.map((p, k) => (
            <li key={k} className="rounded border border-[#D9D5E2] p-3">
              <p className="font-semibold">{p.title}</p>
              <p>{k === 1 ? (checked[1] ? order.map((s) => STEPS()[s]).join(" → ") : tt("Not answered yet.", "Noch nicht beantwortet.")) : pick[k] === undefined ? tt("Not answered yet.", "Noch nicht beantwortet.") : p.a[pick[k]]}</p>
            </li>
          ))}
        </ul>
        {back}
      </div>
    );
  } else if (view.v === "done") {
    body = (
      <div className="space-y-3 px-4 py-6">
        <h3 className="text-[17px] font-semibold">{tt("Course finished", "Kurs beendet")}</h3>
        <p className="text-[14px]">{option === "A" ? tt(`You collected ${points} points and reached level ${level}.`, `Sie haben ${points} Punkte gesammelt und Stufe ${level} erreicht.`) : tt("Your progress was saved.", "Ihr Fortschritt wurde gespeichert.")}</p>
        <div className="flex items-center gap-3"><button type="button" onClick={reset} className={btn}>{tt("Start again", "Noch einmal beginnen")}</button>{back}</div>
      </div>
    );
  } else if (view.v === "lesson") {
    const i = view.i;
    const p = pages[i];
    const answered = i === 1 ? !!checked[1] : pick[i] !== undefined;
    const right = i === 1 ? order.join() === "0,1,2" : pick[i] === 0;
    const move = (k: number, d: number) => { const o = [...order]; [o[k + d], o[k]] = [o[k], o[k + d]]; setOrder(o); setChecked((c) => ({ ...c, 1: false })); };
    const badge = BADGES.filter((b) => b.ok).slice(-1)[0];
    body = (
      <div className="space-y-3 px-4 py-4">
        {option === "B" && (
          <div>
            <ol className="flex gap-1" aria-label={tt("Progress path", "Fortschrittspfad")}>
              {pages.map((x, k) => (
                <li key={k} className="flex-1">
                  <button type="button" onClick={() => go({ v: "lesson", i: k })} className={clsx("min-h-[32px] w-full rounded px-2 py-1 text-center text-[12px]", done.includes(k) ? "bg-[#2E7D5B] text-white" : k === i ? "border-2 border-[#4A4458] bg-white font-semibold" : "bg-[#E4E0EC]")}>{done.includes(k) ? "✓ " : ""}{k + 1}</button>
                </li>
              ))}
            </ol>
            <p className="mt-1 text-[13px] text-[#5F5E5A]">{tt(`Step ${i + 1} of ${pages.length} · ${pct}% done`, `Schritt ${i + 1} von ${pages.length} · ${pct} % geschafft`)}{i + 1 < pages.length ? tt(` · next: ${pages[i + 1].title}`, ` · als Nächstes: ${pages[i + 1].title}`) : ""}</p>
          </div>
        )}
        <h3 className="text-[17px] font-semibold">{p.title}</h3>
        <p className="text-[15px] leading-relaxed">{p.text}</p>
        {option === "C" && (
          <fieldset className="space-y-2 rounded border border-[#D9D5E2] p-3">
            <legend className="px-1 text-[14px] font-semibold">{i === 1 ? tt("Put the steps in order", "Bringen Sie die Schritte in die Reihenfolge") : p.q}</legend>
            {i === 1 ? (
              <ol className="space-y-1">
                {order.map((s, k) => (
                  <li key={s} className="flex items-center gap-2 rounded border border-[#D9D5E2] px-2 py-1 text-[14px]">
                    <span className="flex-1">{k + 1}. {STEPS()[s]}</span>
                    <button type="button" aria-label={tt("Move up", "Nach oben")} disabled={k === 0} onClick={() => move(k, -1)} className="min-h-[32px] min-w-[32px] rounded border border-[#B9B4C4] disabled:opacity-40">▲</button>
                    <button type="button" aria-label={tt("Move down", "Nach unten")} disabled={k === order.length - 1} onClick={() => move(k, 1)} className="min-h-[32px] min-w-[32px] rounded border border-[#B9B4C4] disabled:opacity-40">▼</button>
                  </li>
                ))}
                <li><button type="button" onClick={() => setChecked((c) => ({ ...c, 1: true }))} className={btn}>{tt("Check the order", "Reihenfolge prüfen")}</button></li>
              </ol>
            ) : (
              p.a.map((o, j) => (
                <label key={j} className={clsx("flex min-h-[40px] cursor-pointer items-center gap-2 rounded border px-3 text-[14px]", pick[i] === j ? "border-[#4A4458] bg-[#F4F2F7]" : "border-[#D9D5E2]")}>
                  <input type="radio" name={`q${i}`} checked={pick[i] === j} onChange={() => setPick((s) => ({ ...s, [i]: j }))} />
                  {o}
                </label>
              ))
            )}
            {answered && <p role="status" className="text-[13px]"><span className="font-semibold">{right ? tt("Right. ", "Richtig. ") : tt("Not quite. ", "Nicht ganz. ")}</span>{WHY()[i]}</p>}
          </fieldset>
        )}
        {toast && <p role="status" className="rounded bg-[#FFF4D6] px-3 py-2 text-[13px] font-semibold">{toast}{badge ? ` · ${tt("Badge unlocked: ", "Badge freigeschaltet: ")}${badge.n}` : ""}</p>}
        <div className="flex gap-2">
          {i > 0 && <button type="button" onClick={() => go({ v: "lesson", i: i - 1 })} className={btn}>‹ {tt("Back", "Zurück")}</button>}
          <button type="button" onClick={() => finish(i)} className={btnDark}>{i === pages.length - 1 ? tt("Finish", "Beenden") : tt("Next", "Weiter") + " ›"}</button>
        </div>
      </div>
    );
  } else {
    body = (
      <div className="space-y-3 px-4 py-4">
        <h3 className="text-[17px] font-semibold">{tt("Planning basics", "Planungsgrundlagen")}</h3>
        <p className="text-[14px]">{tt(`A short course on keeping a plan on track. ${pages.length} lessons, about ${pages.length * 3} minutes in all.`, `Ein kurzer Kurs darüber, einen Plan im Griff zu behalten. ${pages.length} Lektionen, insgesamt etwa ${pages.length * 3} Minuten.`)}</p>
        {option === "A" && <p className="rounded bg-[#F4F2F7] px-3 py-2 text-[13px]">{tt(`Level ${level} · ${points} points · ${BADGES.filter((b) => b.ok).length} of ${BADGES.length} badges`, `Stufe ${level} · ${points} Punkte · ${BADGES.filter((b) => b.ok).length} von ${BADGES.length} Badges`)}</p>}
        {option === "B" && (
          <div>
            {bar}
            <p className="mt-1 text-[13px] text-[#5F5E5A]">{tt(`${done.length} of ${pages.length} lessons done · about ${(pages.length - done.length) * 3} minutes left`, `${done.length} von ${pages.length} Lektionen geschafft · noch etwa ${(pages.length - done.length) * 3} Minuten`)}</p>
          </div>
        )}
        <ul className="space-y-1">
          {pages.map((p, k) => (
            <li key={k}>
              <button type="button" onClick={() => go({ v: "lesson", i: k })} className={rowBtn}>
                {option === "B" && <span className="mr-2">{done.includes(k) ? "✓" : k === next ? "▶" : "○"}</span>}{k + 1}. {p.title}<span className="float-right text-[12px] text-[#5F5E5A]">{tt("3 min", "3 Min.")}</span>
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => go({ v: "lesson", i: next })} className={btnDark}>
          {done.length === 0 ? tt("Start the course", "Kurs beginnen") : done.length >= pages.length ? tt("Review the last lesson", "Letzte Lektion wiederholen") : option === "B" ? tt(`Continue where you left off (lesson ${next + 1})`, `Dort weitermachen, wo Sie aufgehört haben (Lektion ${next + 1})`) : tt("Continue", "Weitermachen")}
        </button>
      </div>
    );
  }
  return <div className={INK}>{head}{body}</div>;
}
