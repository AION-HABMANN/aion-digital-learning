import { CAUSE_MODEL, CLAIM_TRUTH, MODEL_FIX, MODEL_IMPACT, MODEL_MEASURES, MODEL_RISK, TRUTH_SORT } from "@/data/day1/case";
import { MODEL_DECISIONS, MODEL_EVIDENCE, MODEL_OWNER, MODEL_RISK_PICK } from "@/data/day1/route2";
import { tt } from "@/lib/lang";
import { composeReason } from "@/lib/day1/reason";
import type { D1R1, D1R2, Score } from "@/store/useStore";

/**
 * The model answers of Day 1 (CLAUDE.md #7). "Fill all model answers" in the mentor bar enters every one of them, so after one fill every
 * missing list is empty and both documents export at once. The texts follow the site's language, because the fill enters them in that
 * language. Mentor tools stay English (#32); only the answers they enter are bilingual. The measures follow the plan's Musterlösung
 * (learning paths, modular content, a progress indicator, less cognitive load); a different, well-reasoned choice also exports (#38).
 */
export const MENTOR_PASSCODE = "muchson123";

/** The two learner sentences of Block 2.2 for each reference measure ("so this measure lets the learner …", "so …"). */
const SLOTS = (): Record<string, { a: string; b: string }> => ({
  m1: {
    a: tt("see after the first lesson what comes next and the whole path", "nach der ersten Lektion sehen, was als Nächstes kommt, und den ganzen Pfad"),
    b: tt("fewer of them give up on day one, and the main cause of leaving is removed; the paths need care, so the risk is Mid", "weniger geben am ersten Tag auf, und die Hauptursache fürs Gehen entfällt; die Pfade brauchen Sorgfalt, das Risiko ist also mittel"),
  },
  m2: {
    a: tt("take a lesson in a few short screens, each with one clear goal", "eine Lektion in wenigen kurzen Bildschirmen durcharbeiten, jeder mit einem klaren Ziel"),
    b: tt("the content becomes easier to follow, but the lessons must be rewritten, so the result comes later", "der Inhalt wird leichter verständlich, aber die Lektionen müssen neu geschrieben werden, das Ergebnis kommt also später"),
  },
  m3: {
    a: tt("see “3 of 8 lessons done” on every course page", "auf jeder Kursseite „3 von 8 Lektionen erledigt“ sehen"),
    b: tt("they can tell they are getting somewhere; it is cheap, fast and easy to switch off", "sie erkennen, dass sie vorankommen; es ist billig, schnell und leicht wieder abzuschalten"),
  },
  m4: {
    a: tt("scan a lesson by its headings and tap a term to see its meaning", "eine Lektion über ihre Überschriften überfliegen und per Tipp die Bedeutung eines Begriffs sehen"),
    b: tt("reading costs less effort, and headings and explained terms are cheap and low risk", "das Lesen kostet weniger Mühe, und Überschriften und erklärte Begriffe sind billig und risikoarm"),
  },
});

export function KEY_D1_R1(): Partial<D1R1> {
  const impact: Record<string, Score> = { ...MODEL_IMPACT } as Record<string, Score>;
  const risk: Record<string, Score> = { ...MODEL_RISK } as Record<string, Score>;
  return {
    sort: { ...TRUTH_SORT },
    worst: "f1",
    worstWhy: tt(
      "On my first visit I see 14 identical tiles and nothing that says what to do first. I would not know where to begin, and I would leave before I had even started a lesson.",
      "Bei meinem ersten Besuch sehe ich 14 gleiche Kacheln und nichts, das sagt, was ich zuerst tun soll. Ich wüsste nicht, wo ich anfangen soll, und würde gehen, bevor ich überhaupt eine Lektion begonnen habe.",
    ),
    claims: { ...CLAIM_TRUTH },
    need: tt(
      "I would interview some of the 40 who left and look at the lesson where most of them stop, because the number only says that they left, not why.",
      "Ich würde einige der 40 befragen, die gegangen sind, und mir die Lektion ansehen, bei der die meisten aufhören, denn die Zahl sagt nur, dass sie gegangen sind, nicht warum.",
    ),
    reflect: {
      a: tt("Showing learners where they are and what comes next improves learning more than any new feature, because without it they never reach the content.", "Den Lernenden zu zeigen, wo sie sind und was als Nächstes kommt, verbessert das Lernen mehr als jede neue Funktion, denn ohne das erreichen sie den Inhalt gar nicht."),
      b: tt("Critical: a clear path and visible progress. Nice to have: a new look or extra courses.", "Kritisch: ein klarer Pfad und sichtbarer Fortschritt. Nice to have: ein neues Aussehen oder zusätzliche Kurse."),
      c: tt("Completion: a clear path lets learners finish, and finishing is what the platform earns from.", "Completion: Ein klarer Pfad lässt Lernende abschließen, und das Abschließen ist es, wovon die Plattform lebt."),
    },
    causes: [...CAUSE_MODEL],
    causeWhy: tt(
      "The case itself says there is no clear learning path, and findings 1 to 3 show that learners cannot tell where to start or what comes next.",
      "Der Fall selbst sagt, dass es keinen klaren Lernpfad gibt, und die Befunde 1 bis 3 zeigen, dass die Lernenden nicht erkennen, wo sie anfangen und was als Nächstes kommt.",
    ),
    chosen: [...MODEL_MEASURES],
    impact,
    risk,
    fixes: { ...MODEL_FIX },
    slotA: Object.fromEntries(Object.entries(SLOTS()).map(([id, v]) => [id, v.a])),
    slotB: Object.fromEntries(Object.entries(SLOTS()).map(([id, v]) => [id, v.b])),
    reasons: Object.fromEntries(Object.entries(SLOTS()).map(([id, v]) => [id, composeReason(MODEL_FIX[id], v.a, v.b)])),
    order: [...MODEL_MEASURES],
    orderWhy: tt(
      "Learning paths come first because every learner meets the orientation problem before anything else, and the other three measures work better once a path exists.",
      "Lernpfade kommen zuerst, weil jede Lernende zuerst auf das Orientierungsproblem trifft, und die anderen drei Maßnahmen wirken besser, sobald ein Pfad existiert.",
    ),
    missingInfo: tt(
      "I do not know why the 40 learners leave: the findings show what is hard, not what makes a learner decide to stop. I would interview ten who left before spending all of the €50,000.",
      "Ich weiß nicht, warum die 40 Lernenden gehen: Die Befunde zeigen, was schwer ist, nicht, was Lernende zum Aufhören bringt. Ich würde zehn Ausgestiegene befragen, bevor ich die ganzen 50.000 € ausgebe.",
    ),
  };
}

export function KEY_D1_R2(): Partial<D1R2> {
  return {
    vision: tt(
      "Learning at SkillUp should feel guided and visible: every learner always knows where they are, what comes next and how far they have come.",
      "Lernen bei SkillUp soll sich geführt und sichtbar anfühlen: Jede Lernende weiß immer, wo sie ist, was als Nächstes kommt und wie weit sie gekommen ist.",
    ),
    picks: [...MODEL_DECISIONS],
    order: [...MODEL_DECISIONS],
    orderWhy: tt(
      "Paths come first because every learner meets orientation before anything else, and the other decisions work better once a path exists. Progress and feedback come next: they are cheap and build on the path, because a learner can only see progress along something. The research programme runs alongside from the start, so that later decisions rest on what learners actually do and not on the drop-out number alone. I left out the AI recommendations: at €90,000 they take most of the budget and they need data and a path we do not have yet. I also left out points and badges and the marketing, because neither fixes a problem the case names.",
      "Pfade kommen zuerst, weil jede Lernende zuerst auf Orientierung trifft und die anderen Entscheidungen besser wirken, sobald ein Pfad existiert. Fortschritt und Feedback kommen danach: Sie sind günstig und bauen auf dem Pfad auf, denn Fortschritt sieht man nur entlang von etwas. Das Forschungsprogramm läuft von Anfang an nebenher, damit spätere Entscheidungen darauf beruhen, was Lernende tatsächlich tun, und nicht allein auf der Abbruchzahl. Die KI-Empfehlungen habe ich weggelassen: Mit 90.000 € verbrauchen sie den größten Teil des Budgets und brauchen Daten und einen Pfad, die wir noch nicht haben. Punkte und Badges sowie das Marketing habe ich ebenfalls weggelassen, weil keines ein Problem behebt, das der Fall nennt.",
    ),
    risk: MODEL_RISK_PICK,
    riskPlan: tt(
      "I fund the research programme next to the fixes, so that we find out why learners leave and can correct course after the first quarter.",
      "Ich finanziere das Forschungsprogramm neben den Verbesserungen, damit wir herausfinden, warum Lernende gehen, und nach dem ersten Quartal nachsteuern können.",
    ),
    uncertain: tt(
      "I decide to build learning paths for the three most-taken courses now. I do not know whether learners leave from lack of direction or from lack of time. I will refocus if, after the first quarter, the drop-out in those courses has not fallen from 40% to below 35%.",
      "Ich entscheide, jetzt Lernpfade für die drei meistgenutzten Kurse zu bauen. Ich weiß nicht, ob Lernende aus fehlender Orientierung oder aus Zeitmangel gehen. Ich richte neu aus, wenn die Abbruchquote in diesen Kursen nach dem ersten Quartal nicht von 40 % auf unter 35 % gesunken ist.",
    ),
    owner: MODEL_OWNER,
    evidence: [...MODEL_EVIDENCE],
    giveUp: tt(
      "I give up the badge system and the AI recommendations for this year, and I postpone rewriting the ten longest lessons; learners will keep the long lessons for now.",
      "Ich verzichte dieses Jahr auf das Badge-System und die KI-Empfehlungen und verschiebe das Neuschreiben der zehn längsten Lektionen; die langen Lektionen bleiben vorerst.",
    ),
  };
}
