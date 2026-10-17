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
  suggest: {
    cols: ["risk", "benefit", "effort"],
    values: [
      { id: "low", label: t("Low", "Niedrig") },
      { id: "medium", label: t("Medium", "Mittel") },
      { id: "high", label: t("High", "Hoch") },
    ],
    note: t("A scale many teams use (optional):", "Eine Skala, die viele Teams nutzen (optional):"),
  },
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
