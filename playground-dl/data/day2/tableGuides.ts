import { bi, t } from "@/lib/lang";
import type { TableGuide } from "@/components/ui/FormOrTable";

/**
 * Day 2 · the guided tables (DL-STANDARD section 15). Each table in the layout a learner can choose has a hint per column and one grey example row
 * from another company or case (LearnLoop and two other platforms), never an answer to this case. The hints and the example only show on screen; they
 * are not exported, not checked and not in the mentor key.
 */
const TITLE = t("How to fill this table", "So füllen Sie diese Tabelle aus");
const EXAMPLE = t("Example from another company, not this case", "Beispiel aus einem anderen Unternehmen, nicht aus diesem Fall");

export const DIFFS_GUIDE = bi({
  title: TITLE,
  exampleLabel: t("Example from two other platforms, not this case", "Beispiel aus zwei anderen Plattformen, nicht aus diesem Fall"),
  hints: {
    first: t("one thing you can compare on both platforms", "eine Sache, die Sie auf beiden Plattformen vergleichen können"),
    a: t("what you see or can do on Platform A", "was Sie auf Plattform A sehen oder tun können"),
    b: t("the same thing on Platform B", "dieselbe Sache auf Plattform B"),
  },
  example: {
    first: t("Sign-up", "Anmeldung"),
    cells: {
      a: t("You can try one lesson before you register.", "Sie können eine Lektion probieren, bevor Sie sich registrieren."),
      b: t("You must create an account before you see anything.", "Sie müssen ein Konto anlegen, bevor Sie etwas sehen."),
    },
  },
}) as TableGuide;

export const ASSESS_GUIDE = bi({
  title: TITLE,
  exampleLabel: EXAMPLE,
  hints: {
    first: t("the option you assess", "die Option, die Sie bewerten"),
    risk: t("what could go wrong or backfire", "was schiefgehen oder nach hinten losgehen könnte"),
    benefit: t("what the learner or the team gains", "was die Lernende oder das Team gewinnt"),
    effort: t("how much work and time it takes", "wie viel Arbeit und Zeit es braucht"),
  },
  example: {
    first: t("A full onboarding course (LearnLoop)", "Ein vollständiger Einführungskurs (LearnLoop)"),
    cells: {
      risk: t("Medium: it is built before anyone has tested it.", "Mittel: Er wird gebaut, bevor ihn jemand getestet hat."),
      benefit: t("Medium: it helps, but only if learners find it.", "Mittel: Er hilft, aber nur, wenn Lernende ihn finden."),
      effort: t("High: weeks of writing and recording.", "Hoch: Wochen an Schreiben und Aufnehmen."),
    },
  },
  suggest: Object.fromEntries(
    ["risk", "benefit", "effort"].map((k) => [
      k,
      {
        values: [
          { id: "low", label: t("Low", "Niedrig") },
          { id: "medium", label: t("Medium", "Mittel") },
          { id: "high", label: t("High", "Hoch") },
        ],
        note: t("A scale many teams use (optional):", "Eine Skala, die viele Teams nutzen (optional):"),
      },
    ]),
  ),
}) as TableGuide;

export const TESTS_GUIDE = bi({
  title: TITLE,
  exampleLabel: EXAMPLE,
  hints: {
    first: t("the number of the test", "die Nummer des Tests"),
    what: t("the question or the thing you check", "die Frage oder die Sache, die Sie prüfen"),
    how: t("the way you test it: who takes part, with what", "die Art zu testen: wer teilnimmt, womit"),
    measure: t("the result you will look at afterwards", "das Ergebnis, das Sie danach ansehen"),
  },
  example: {
    first: t("UX test (LearnLoop)", "UX-Test (LearnLoop)"),
    cells: {
      what: t("Whether new learners find the first lesson.", "Ob neue Lernende die erste Lektion finden."),
      how: t("Five learners try to start from a paper sketch while we watch.", "Fünf Lernende versuchen, von einer Papierskizze aus zu starten, während wir zusehen."),
      measure: t("How many find it without help, and where they hesitate.", "Wie viele es ohne Hilfe finden und wo sie zögern."),
    },
  },
}) as TableGuide;

/* ------------------------------------------------------------------ Route 2, questions 3 to 6 */

export const DATA_GUIDE = bi({
  title: TITLE,
  exampleLabel: EXAMPLE,
  hints: {
    first: t("", ""),
    data: t("one piece of data you would need", "eine Information, die Sie brauchen würden"),
    have: t("whether you have it today", "ob Sie sie heute haben"),
    how: t("how you get it, or where it comes from", "wie Sie sie bekommen oder woher sie kommt"),
  },
  example: {
    first: t("", ""),
    cells: {
      data: t("How long a new learner needs for the first lesson", "Wie lange eine neue Lernende für die erste Lektion braucht"),
      have: t("No: it is not recorded today", "Nein: Es wird heute nicht erfasst"),
      how: t("Time it in tests with five learners", "In Tests mit fünf Lernenden messen"),
    },
  },
  suggest: {
    have: {
      values: [
        { id: "yes", label: t("Yes", "Ja") },
        { id: "partly", label: t("Partly", "Teilweise") },
        { id: "no", label: t("No", "Nein") },
      ],
      note: t("A quick answer (optional):", "Eine schnelle Antwort (optional):"),
    },
  },
}) as TableGuide;

export const ROAD_GUIDE = bi({
  title: TITLE,
  exampleLabel: EXAMPLE,
  hints: {
    first: t("the place in the order: the first priority is number 1", "der Platz in der Reihenfolge: die erste Priorität ist Nummer 1"),
    item: t("what you do, in a few words", "was Sie tun, in wenigen Worten"),
    why: t("why it has this place: what depends on it or what it unlocks", "warum es diesen Platz hat: was davon abhängt oder was es freischaltet"),
  },
  example: {
    first: t("1", "1"),
    cells: {
      item: t("A progress bar with a next step on every page", "Ein Fortschrittsbalken mit einem nächsten Schritt auf jeder Seite"),
      why: t("Every learner sees it, and it needs no new data.", "Jede Lernende sieht ihn, und er braucht keine neuen Daten."),
    },
  },
}) as TableGuide;

export const RISK_GUIDE = bi({
  title: TITLE,
  exampleLabel: EXAMPLE,
  hints: {
    first: t("", ""),
    risk: t("what could go wrong, in a sentence", "was schiefgehen könnte, in einem Satz"),
    side: t("whose risk it is: the technology or the users", "wessen Risiko es ist: die Technologie oder die Nutzer"),
    action: t("what you do about it", "was Sie dagegen tun"),
  },
  example: {
    first: t("", ""),
    cells: {
      risk: t("A new feature is built before anyone has tested it", "Eine neue Funktion wird gebaut, bevor sie jemand getestet hat"),
      side: t("Technology (the new feature)", "Technologie (die neue Funktion)"),
      action: t("Test a sketch with five learners first", "Zuerst eine Skizze mit fünf Lernenden testen"),
    },
  },
  suggest: {
    side: {
      values: [
        { id: "tech", label: t("Technology", "Technologie") },
        { id: "users", label: t("Users", "Nutzer") },
      ],
      note: t("A quick answer (optional):", "Eine schnelle Antwort (optional):"),
    },
  },
}) as TableGuide;

export const UNC_GUIDE = bi({
  title: TITLE,
  exampleLabel: EXAMPLE,
  hints: {
    first: t("the three parts of the decision", "die drei Teile der Entscheidung"),
    text: t("write each part in your own words; a sentence each is enough", "schreiben Sie jeden Teil in eigenen Worten; ein Satz je Teil genügt"),
  },
  example: {
    first: t("Example (LearnLoop)", "Beispiel (LearnLoop)"),
    cells: {
      text: t("I decide to test a progress bar in one course. I do not know whether learners want it. I would reverse it if completion is not up after six weeks.", "Ich entscheide, einen Fortschrittsbalken in einem Kurs zu testen. Ich weiß nicht, ob Lernende ihn wollen. Ich nähme ihn zurück, wenn die Completion nach sechs Wochen nicht gestiegen ist."),
    },
  },
}) as TableGuide;
