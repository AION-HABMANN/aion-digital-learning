"use client";

import { useState } from "react";
import clsx from "clsx";
import type { OptId } from "@/data/day3/case";
import { tt } from "@/lib/lang";

/**
 * Day 3 · the working simulations of CLAUDE.md #60. Each one is built one to one from the plan's clues and the task's numbered facts, and adds
 * nothing that would change an answer. Block 1.1: EduCore's Lesson 7 as the plan describes it: one continuous text of about 500 words, no
 * paragraphs, no structure, technical terms without explanation, no visualisation. Block 2.1: the EduCore platform: a module overview with 28
 * lessons in one flat list (no groups, no order labels, no goals), the lesson page with a menu of nine entries, a news banner, a recommendation
 * box and a chat window all at once, and a quiz with all 12 questions on one page. Block 1.2: the same lesson as the three options make it:
 * shortened, visualised, or split into small modules. Own colours only; the lesson text is made up and nothing here is marked right or wrong.
 */

/* ------------------------------------------------------------------ the lesson text (about 500 words, seven parts) */

const PARTS = (): { title: string; text: string }[] => [
  {
    title: tt("What learning analytics is", "Was Learning Analytics ist"),
    text: tt(
      "Learning analytics means collecting and analysing data about how people learn so that a platform can support them better. Every click, every quiz answer and every minute spent on a page is a data point. Taken together, these data points show where learners succeed, where they stall and where they leave, and an organisation that processes them has to decide on which legal basis it does so and how it protects the people behind the numbers.",
      "Learning Analytics bedeutet, Daten darüber zu erheben und auszuwerten, wie Menschen lernen, damit eine Plattform sie besser unterstützen kann. Jeder Klick, jede Quizantwort und jede Minute auf einer Seite ist ein Datenpunkt. Zusammen zeigen diese Datenpunkte, wo Lernende vorankommen, wo sie stocken und wo sie gehen, und eine Organisation, die sie verarbeitet, muss entscheiden, auf welcher Rechtsgrundlage sie das tut und wie sie die Menschen hinter den Zahlen schützt.",
    ),
  },
  {
    title: tt("A lawful basis", "Eine Rechtsgrundlage"),
    text: tt(
      "Under the General Data Protection Regulation, personal data may be processed only if there is a lawful basis. The most common bases are consent, the performance of a contract and legitimate interest. Legitimate interest allows processing when the organisation has a real interest, for example improving its courses, as long as that interest is not outweighed by the rights and freedoms of the individual. Whether it applies has to be weighed case by case in a documented balancing test.",
      "Nach der Datenschutz-Grundverordnung dürfen personenbezogene Daten nur verarbeitet werden, wenn es eine Rechtsgrundlage gibt. Die häufigsten Grundlagen sind die Einwilligung, die Erfüllung eines Vertrags und das berechtigte Interesse. Das berechtigte Interesse erlaubt die Verarbeitung, wenn die Organisation ein echtes Interesse hat, zum Beispiel ihre Kurse zu verbessern, solange dieses Interesse nicht von den Rechten und Freiheiten der Person überwogen wird. Ob es zutrifft, muss im Einzelfall in einer dokumentierten Abwägung geprüft werden.",
    ),
  },
  {
    title: tt("Pseudonymisation", "Pseudonymisierung"),
    text: tt(
      "Pseudonymisation is a technical measure that replaces identifying data, such as a name or an email address, with a code, while the key that links the code to the person is stored separately and protected. Pseudonymised data is still personal data, because the person can be re-identified with the key, but the risk is lower, and the regulation names the technique as an appropriate safeguard. Anonymisation, by contrast, removes the link permanently.",
      "Pseudonymisierung ist eine technische Maßnahme, die identifizierende Daten, etwa einen Namen oder eine E-Mail-Adresse, durch einen Code ersetzt, während der Schlüssel, der den Code mit der Person verbindet, getrennt und geschützt aufbewahrt wird. Pseudonymisierte Daten bleiben personenbezogene Daten, weil die Person mit dem Schlüssel wieder erkannt werden kann, aber das Risiko ist geringer, und die Verordnung nennt die Technik als geeignete Schutzmaßnahme. Anonymisierung dagegen entfernt den Bezug dauerhaft.",
    ),
  },
  {
    title: tt("What a platform records", "Was eine Plattform erfasst"),
    text: tt(
      "A typical learning platform records several kinds of data: the account data of the learner, the progress through each course, the results of every quiz and the time stamps of each session. Some of these are needed to run the course at all, others only to evaluate it. The purpose of each category must be stated before collection begins, and data that is no longer needed for that purpose has to be deleted within a defined retention period.",
      "Eine typische Lernplattform erfasst mehrere Arten von Daten: die Kontodaten der Lernenden, den Fortschritt in jedem Kurs, die Ergebnisse jedes Quiz und die Zeitstempel jeder Sitzung. Manche davon werden gebraucht, um den Kurs überhaupt zu betreiben, andere nur, um ihn auszuwerten. Der Zweck jeder Kategorie muss vor der Erhebung genannt werden, und Daten, die für diesen Zweck nicht mehr gebraucht werden, müssen innerhalb einer festgelegten Aufbewahrungsfrist gelöscht werden.",
    ),
  },
  {
    title: tt("The rights of learners", "Die Rechte der Lernenden"),
    text: tt(
      "Learners have rights that the organisation must be able to honour: the right to information about what is stored, the right to correct wrong data, the right to erasure and the right to object to processing based on legitimate interest. A request must normally be answered within one month, which means that processes and responsible persons need to exist before the first request arrives.",
      "Lernende haben Rechte, die die Organisation erfüllen können muss: das Recht auf Auskunft darüber, was gespeichert ist, das Recht auf Berichtigung falscher Daten, das Recht auf Löschung und das Recht auf Widerspruch gegen eine Verarbeitung aufgrund des berechtigten Interesses. Eine Anfrage muss in der Regel innerhalb eines Monats beantwortet werden, was bedeutet, dass Abläufe und Verantwortliche vorhanden sein müssen, bevor die erste Anfrage eintrifft.",
    ),
  },
  {
    title: tt("What a team should do", "Was ein Team tun sollte"),
    text: tt(
      "In practice, a team that wants to analyse learning data should document its purpose, choose the lawful basis, apply pseudonymisation wherever the analysis does not need names, limit access to those who need it and define how long each category is kept. Doing so does not slow the analysis down; it makes the results usable, because decisions based on lawfully collected data can be defended.",
      "In der Praxis sollte ein Team, das Lerndaten auswerten will, seinen Zweck dokumentieren, die Rechtsgrundlage wählen, Pseudonymisierung anwenden, wo die Auswertung keine Namen braucht, den Zugriff auf die beschränken, die ihn brauchen, und festlegen, wie lange jede Kategorie aufbewahrt wird. Das bremst die Auswertung nicht; es macht die Ergebnisse nutzbar, weil Entscheidungen auf rechtmäßig erhobenen Daten verteidigt werden können.",
    ),
  },
  {
    title: tt("Data outside the EEA", "Daten außerhalb des EWR"),
    text: tt(
      "Finally, transfers of data outside the European Economic Area require additional safeguards, such as standard contractual clauses, and a platform that uses a cloud provider or an analytics tool from another country has to check this before it signs the contract.",
      "Schließlich erfordert die Übermittlung von Daten außerhalb des Europäischen Wirtschaftsraums zusätzliche Garantien, etwa Standardvertragsklauseln, und eine Plattform, die einen Cloud-Anbieter oder ein Analysewerkzeug aus einem anderen Land nutzt, muss das prüfen, bevor sie den Vertrag unterschreibt.",
    ),
  },
];

const LESSON_TITLE = () => tt("Learning analytics and data protection", "Learning Analytics und Datenschutz");

/** Own colours, never the site's blue, teal and rust (CLAUDE.md #15, #49). */
const INK = "text-[#2B2B2B]";
const HEAD = "bg-[#4A4458]";
const btn = "min-h-[40px] rounded border border-[#B9B4C4] bg-[#F4F2F7] px-4 text-[14px] text-[#2B2B2B] hover:bg-[#E9E6F0]";

/* ------------------------------------------------------------------ Block 1.1 · Lesson 7, as the plan describes it */

/** One continuous text of about 500 words: no paragraphs, no headings, no lists, no picture, no explanation of terms, every sentence alike. */
export function LessonReadingSim() {
  return (
    <div className={clsx("px-4 py-4", INK)}>
      <h3 className="mb-2 text-[17px] font-semibold">{LESSON_TITLE()}</h3>
      <p className="text-[14px] leading-[1.55]">{PARTS().map((p) => p.text).join(" ")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ Block 2.1 · the EduCore platform */

const TOPICS = (): string[] => [
  tt("Welcome", "Willkommen"), tt("Why data protection matters", "Warum Datenschutz wichtig ist"), tt("Personal data", "Personenbezogene Daten"), tt("Special categories", "Besondere Kategorien"), tt("Roles in data protection", "Rollen im Datenschutz"), tt("Lawful bases", "Rechtsgrundlagen"),
  LESSON_TITLE(),
  tt("Consent", "Einwilligung"), tt("Contracts", "Verträge"), tt("Legitimate interest", "Berechtigtes Interesse"), tt("Purpose limitation", "Zweckbindung"), tt("Data minimisation", "Datenminimierung"), tt("Storage limitation", "Speicherbegrenzung"), tt("Accuracy", "Richtigkeit"),
  tt("Security of processing", "Sicherheit der Verarbeitung"), tt("Pseudonymisation", "Pseudonymisierung"), tt("Anonymisation", "Anonymisierung"), tt("Access rights", "Auskunftsrechte"), tt("Erasure", "Löschung"), tt("Objection", "Widerspruch"), tt("Data portability", "Datenübertragbarkeit"),
  tt("Records of processing", "Verzeichnis der Verarbeitungen"), tt("Impact assessments", "Folgenabschätzungen"), tt("Processors", "Auftragsverarbeiter"), tt("International transfers", "Internationale Übermittlungen"), tt("Breach notification", "Meldung von Verletzungen"), tt("Supervisory authorities", "Aufsichtsbehörden"), tt("Review and next steps", "Rückblick und nächste Schritte"),
];

const MENU = () => [tt("Home", "Start"), tt("My courses", "Meine Kurse"), tt("Catalogue", "Katalog"), tt("Calendar", "Kalender"), tt("Messages", "Nachrichten"), tt("Forum", "Forum"), tt("Certificates", "Zertifikate"), tt("Help", "Hilfe"), tt("Settings", "Einstellungen")];

const QUIZ = (): string[] => [
  tt("Learning analytics collects data about how people learn.", "Learning Analytics erhebt Daten darüber, wie Menschen lernen."),
  tt("Personal data may be processed without any lawful basis.", "Personenbezogene Daten dürfen ohne Rechtsgrundlage verarbeitet werden."),
  tt("Consent is one possible lawful basis.", "Die Einwilligung ist eine mögliche Rechtsgrundlage."),
  tt("Legitimate interest never needs to be weighed.", "Das berechtigte Interesse muss nie abgewogen werden."),
  tt("Pseudonymised data is still personal data.", "Pseudonymisierte Daten bleiben personenbezogene Daten."),
  tt("Anonymisation removes the link to the person permanently.", "Anonymisierung entfernt den Bezug zur Person dauerhaft."),
  tt("The purpose of a data category is stated before collection.", "Der Zweck einer Datenkategorie wird vor der Erhebung genannt."),
  tt("Data may be kept forever, whatever the purpose.", "Daten dürfen für immer aufbewahrt werden, egal zu welchem Zweck."),
  tt("Learners have a right to information about stored data.", "Lernende haben ein Recht auf Auskunft über gespeicherte Daten."),
  tt("A request must normally be answered within one month.", "Eine Anfrage muss in der Regel innerhalb eines Monats beantwortet werden."),
  tt("Access to learning data should be limited to those who need it.", "Der Zugriff auf Lerndaten sollte auf die beschränkt sein, die ihn brauchen."),
  tt("Data may leave the EEA without any safeguard.", "Daten dürfen den EWR ohne jede Garantie verlassen."),
];

type View = "overview" | "lesson" | "quiz";

/** The EduCore platform of Block 2.1: module overview, a lesson page with everything at once, and a quiz with all questions on one page. */
export function EduCoreSim() {
  const [view, setView] = useState<View>("overview");
  const [picked, setPicked] = useState<Record<number, string>>({});
  const [sent, setSent] = useState(false);
  const [note, setNote] = useState("");
  const topics = TOPICS();
  const nav = (id: View, label: string) => (
    <button type="button" onClick={() => { setView(id); setNote(""); }} aria-current={view === id ? "page" : undefined} className={clsx("min-h-[36px] rounded px-3 text-[13px]", view === id ? "bg-white text-[#4A4458]" : "text-white hover:bg-white/15")}>
      {label}
    </button>
  );
  return (
    <div className={INK}>
      <div className={clsx("flex flex-wrap items-center gap-1 px-3 py-2 text-white", HEAD)}>
        <span className="mr-3 font-serif text-[15px] font-bold">EduCore</span>
        {nav("overview", tt("Module overview", "Modulübersicht"))}
        {nav("lesson", tt("Lesson", "Lektion"))}
        {nav("quiz", tt("Quiz", "Quiz"))}
      </div>

      {view === "overview" && (
        <div className="space-y-2 px-4 py-4">
          <h3 className="text-[17px] font-semibold">{tt("Data protection in practice", "Datenschutz in der Praxis")}</h3>
          <ul className="space-y-1">
            {topics.map((x, i) => (
              <li key={i}>
                <button type="button" onClick={() => (i === 6 ? setView("lesson") : setNote(tt("This simulation includes one lesson page. Open the lesson in the list.", "Diese Simulation enthält eine Lektionsseite. Öffnen Sie die Lektion in der Liste.")))} className="block min-h-[36px] w-full rounded border border-[#D9D5E2] bg-white px-3 text-left text-[14px] hover:bg-[#F4F2F7]">
                  {x}
                </button>
              </li>
            ))}
          </ul>
          {note && <p role="status" className="text-[13px] text-[#5F5E5A]">{note}</p>}
        </div>
      )}

      {view === "lesson" && (
        <div>
          <p className="bg-[#E8DFC8] px-4 py-2 text-[13px] font-semibold">{tt("NEWS · 12 new courses added this month. See what is new.", "NEWS · 12 neue Kurse in diesem Monat. Sehen Sie, was neu ist.")}</p>
          <div className="grid gap-3 px-3 py-3 md:grid-cols-[120px_minmax(0,1fr)_180px]">
            <ul className="space-y-1" aria-label={tt("Menu", "Menü")}>
              {MENU().map((m) => (
                <li key={m} className="rounded bg-[#F4F2F7] px-2 py-1.5 text-[13px]">{m}</li>
              ))}
            </ul>
            <div>
              <h3 className="mb-2 text-[17px] font-semibold">{LESSON_TITLE()}</h3>
              <p className="text-[14px] leading-[1.55]">{PARTS().map((p) => p.text).join(" ")}</p>
            </div>
            <div className="space-y-3">
              <div className="rounded border border-[#D9D5E2] bg-[#FAF9FC] p-2">
                <p className="text-[13px] font-semibold">{tt("Recommended for you", "Für Sie empfohlen")}</p>
                <ul className="mt-1 space-y-1 text-[13px]">
                  <li className="rounded bg-[#E9E6F0] px-2 py-1">{tt("Records of processing", "Verzeichnis der Verarbeitungen")}</li>
                  <li className="rounded bg-[#E9E6F0] px-2 py-1">{tt("Impact assessments", "Folgenabschätzungen")}</li>
                  <li className="rounded bg-[#E9E6F0] px-2 py-1">{tt("Breach notification", "Meldung von Verletzungen")}</li>
                </ul>
              </div>
              <div className="rounded border border-[#D9D5E2] bg-white">
                <p className={clsx("px-2 py-1 text-[13px] font-semibold text-white", HEAD)}>{tt("Chat · 3 online", "Chat · 3 online")}</p>
                <div className="space-y-1 p-2 text-[13px]">
                  <p className="rounded-xl bg-[#F4F2F7] px-2 py-1">{tt("Has anyone finished lesson 7?", "Hat jemand Lektion 7 beendet?")}</p>
                  <p className="ml-6 rounded-xl bg-[#E9E6F0] px-2 py-1">{tt("Not yet.", "Noch nicht.")}</p>
                  <p className="rounded border border-[#D9D5E2] px-2 py-1 text-[#777]">{tt("Write a message…", "Nachricht schreiben …")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {view === "quiz" && (
        <div className="space-y-3 px-4 py-4">
          <h3 className="text-[17px] font-semibold">{tt("Quiz · data protection", "Quiz · Datenschutz")}</h3>
          {QUIZ().map((q, i) => (
            <fieldset key={i} className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <legend className="mb-1 text-[14px]">{`${i + 1}. ${q}`}</legend>
              {(["true", "false"] as const).map((v) => (
                <label key={v} className="flex min-h-[32px] cursor-pointer items-center gap-2 text-[14px]">
                  <input type="radio" name={`q${i}`} checked={picked[i] === v} onChange={() => { setPicked((s) => ({ ...s, [i]: v })); setSent(false); }} />
                  {v === "true" ? tt("True", "Wahr") : tt("False", "Falsch")}
                </label>
              ))}
            </fieldset>
          ))}
          <button type="button" onClick={() => setSent(true)} className={btn}>{tt("Submit", "Absenden")}</button>
          {sent && <p role="status" className="text-[14px]">{tt("Your answers were submitted.", "Ihre Antworten wurden abgesendet.")}</p>}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ Block 1.2 · the three options, as the same lesson */

function Diagram({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <figure className="my-3 rounded-lg border border-[#D9D5E2] bg-[#FAF9FC] p-3" aria-label={label}>
      {children}
      <figcaption className="mt-2 text-[12px] text-[#5F5E5A]">{label}</figcaption>
    </figure>
  );
}

const Box = ({ children, strong }: { children: React.ReactNode; strong?: boolean }) => (
  <span className={clsx("rounded border px-2 py-1 text-[13px]", strong ? "border-[#4A4458] bg-[#E9E6F0] font-semibold" : "border-[#B9B4C4] bg-white")}>{children}</span>
);

/** The module of Block 1.2 as each option leaves it: A shortened significantly, B with diagrams and graphics, C split into small modules. */
export function OptionSim({ option }: { option: OptId }) {
  const parts = PARTS();
  const [unit, setUnit] = useState(0);
  if (option === "A") {
    return (
      <div className={clsx("px-4 py-4", INK)}>
        <h3 className="mb-2 text-[17px] font-semibold">{LESSON_TITLE()}</h3>
        <p className="text-[14px] leading-[1.55]">{`${parts[0].text} ${parts[5].text}`}</p>
      </div>
    );
  }
  if (option === "B") {
    return (
      <div className={clsx("space-y-3 px-4 py-4", INK)}>
        <h3 className="text-[17px] font-semibold">{LESSON_TITLE()}</h3>
        <p className="text-[14px] leading-[1.55]">{parts[0].text}</p>
        <Diagram label={tt("Figure 1 · the three most common lawful bases", "Abbildung 1 · die drei häufigsten Rechtsgrundlagen")}>
          <div className="flex flex-wrap items-center gap-2">
            <Box strong>{tt("Personal data", "Personenbezogene Daten")}</Box>
            <span aria-hidden>→</span>
            <Box>{tt("Consent", "Einwilligung")}</Box>
            <Box>{tt("Contract", "Vertrag")}</Box>
            <Box>{tt("Legitimate interest", "Berechtigtes Interesse")}</Box>
          </div>
        </Diagram>
        <Diagram label={tt("Figure 2 · pseudonymisation: the key is kept apart", "Abbildung 2 · Pseudonymisierung: der Schlüssel wird getrennt aufbewahrt")}>
          <div className="flex flex-wrap items-center gap-2">
            <Box>{tt("Name: Mia Berg", "Name: Mia Berg")}</Box>
            <span aria-hidden>→</span>
            <Box strong>{tt("Code: L-4821", "Code: L-4821")}</Box>
            <span aria-hidden>→</span>
            <Box>{tt("Analysis", "Auswertung")}</Box>
          </div>
          <p className="mt-2 text-[13px]">{tt("Key table (name ↔ code): stored separately and protected.", "Schlüsseltabelle (Name ↔ Code): getrennt und geschützt gespeichert.")}</p>
        </Diagram>
        <p className="text-[14px] leading-[1.55]">{`${parts[3].text} ${parts[4].text}`}</p>
        <p className="text-[14px] leading-[1.55]">{`${parts[5].text} ${parts[6].text}`}</p>
      </div>
    );
  }
  const last = parts.length - 1;
  return (
    <div className={INK}>
      <div className="flex items-center gap-3 px-4 pt-3">
        <div className="h-2 flex-1 rounded-full bg-[#E4E0EC]" role="progressbar" aria-valuemin={0} aria-valuemax={parts.length} aria-valuenow={unit + 1} aria-label={tt("Progress", "Fortschritt")}>
          <div className="h-2 rounded-full bg-[#4A4458]" style={{ width: `${Math.round(((unit + 1) / parts.length) * 100)}%` }} />
        </div>
        <span className="text-[13px] text-[#555]">{tt(`Unit ${unit + 1} of ${parts.length}`, `Einheit ${unit + 1} von ${parts.length}`)}</span>
      </div>
      <div className="space-y-3 px-4 py-4">
        <p className="text-[12px] font-semibold text-[#4A4458]">{LESSON_TITLE()} · {tt("about 2 min", "ca. 2 Min.")}</p>
        <h3 className="text-[17px] font-semibold">{parts[unit].title}</h3>
        <p className="max-w-prose text-[15px] leading-relaxed">{parts[unit].text}</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => setUnit((u) => Math.max(0, u - 1))} disabled={unit === 0} className={btn}>‹ {tt("Back", "Zurück")}</button>
          <button type="button" onClick={() => setUnit((u) => Math.min(last, u + 1))} disabled={unit === last} className={btn}>{tt("Next", "Weiter")} ›</button>
        </div>
      </div>
    </div>
  );
}
