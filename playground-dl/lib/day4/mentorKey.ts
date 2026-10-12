import { CAUSE_MODEL, MEASURE_BY_ID, MODEL_IMPACT, MODEL_MEASURES, MODEL_OPT_IMPACT, MODEL_OPT_ORDER, MODEL_OPT_RISK, MODEL_PLATFORM, MODEL_RISK, OPT_BY_ID, OPT_IDS, TRUTH_SORT, effortBand } from "@/data/day4/case";
import { MODEL_DECISIONS, MODEL_EVIDENCE, MODEL_METRICS, MODEL_OWNER, MODEL_RISK_PICK, MODEL_STRATEGY } from "@/data/day4/route2";
import { tt } from "@/lib/lang";
import type { D4R1, D4R2 } from "@/store/dayTypesStd";
import type { Score } from "@/store/useStore";

/**
 * The model answers of Day 4 (CLAUDE.md #7). "Fill all model answers" in the mentor bar enters every one of them, so after one fill every missing
 * list is empty and both documents export at once. The texts follow the site's language, because the fill enters them in that language. Mentor tools
 * stay English (#32); only the answers they enter are bilingual. The measures are the plan's own Musterlösung (progress tracking, interactive
 * elements, clear learning objectives, feedback mechanisms; rationale: perceived progress is the strongest motivator). Together they cost €44,000,
 * €4,000 over the case's €40,000, which the reasons say; a different, well-reasoned choice also exports (#38).
 */
export const MENTOR_NOTE = "The plan's four measures cost €44,000 against the case's €40,000 (a Case assumption): the reference set is €4,000 over and says where the money goes.";

export function KEY_D4_R1(): Partial<D4R1> {
  const impact: Record<string, Score> = { ...MODEL_IMPACT } as Record<string, Score>;
  const risk: Record<string, Score> = { ...MODEL_RISK } as Record<string, Score>;
  const effort: Record<string, Score> = Object.fromEntries(MODEL_MEASURES.map((id) => [id, effortBand(MEASURE_BY_ID[id].cost)])) as Record<string, Score>;
  const optEffort: Record<string, Score> = Object.fromEntries(OPT_IDS.map((id) => [id, effortBand(OPT_BY_ID[id].cost)])) as Record<string, Score>;
  return {
    sort: { ...TRUTH_SORT },
    prefer: MODEL_PLATFORM,
    preferWhy: tt(
      "On Platform A I can see that I am 40% through, I do a short task instead of only reading, I am told what I can do after the unit, and I get a result and a next step. On Platform B I would not know how far I am or what any of it is for, so I would stop.",
      "Auf Plattform A sehe ich, dass ich zu 40 % durch bin, ich löse eine kurze Aufgabe, statt nur zu lesen, mir wird gesagt, was ich nach der Einheit kann, und ich bekomme ein Ergebnis und einen nächsten Schritt. Auf Plattform B wüsste ich weder, wie weit ich bin, noch wofür das alles da ist, und würde aufhören.",
    ),
    principles: [
      tt("Show the learner their progress, because people continue when they can see they are getting somewhere.", "Zeigen Sie der Lernenden ihren Fortschritt, weil Menschen weitermachen, wenn sie sehen, dass sie vorankommen."),
      tt("Let the learner do something in every unit, because doing keeps attention and builds the skill the unit is about.", "Lassen Sie die Lernende in jeder Einheit etwas tun, weil Tun die Aufmerksamkeit hält und die Fähigkeit aufbaut, um die es in der Einheit geht."),
      tt("State what the learner will be able to do and give a result after each task, because a goal and a result tell them what the effort is for.", "Nennen Sie, was die Lernende können wird, und geben Sie nach jeder Aufgabe ein Ergebnis, weil Ziel und Ergebnis ihr sagen, wofür die Mühe da ist."),
    ],
    optImpact: { ...MODEL_OPT_IMPACT } as Record<string, Score>,
    optEffort,
    optRisk: { ...MODEL_OPT_RISK } as Record<string, Score>,
    optEffortFlags: [],
    optOrder: [...MODEL_OPT_ORDER],
    optWhy: tt(
      "Visualising progress has a lasting effect: after a reward would stop, the learner still knows how far they have come and what is left, which is information about their own skill and not a payment. Badges and points depend on a continuing reward.",
      "Den Fortschritt sichtbar zu machen wirkt nachhaltig: Auch wenn eine Belohnung wegfiele, weiß die Lernende noch, wie weit sie gekommen ist und was bleibt, und das ist eine Information über ihr eigenes Können und keine Bezahlung. Badges und Punkte hängen von einer fortlaufenden Belohnung ab.",
    ),
    reflect: {
      a: tt("Progress that is real and feedback after each task: they change what the learner does next, not only how the screen looks.", "Echter Fortschritt und Feedback nach jeder Aufgabe: Sie verändern, was die Lernende als Nächstes tut, nicht nur, wie der Bildschirm aussieht."),
      b: tt("Motivation that stays when the reward stops: a goal I care about, a sign that I am getting better, a choice in how I learn.", "Motivation, die bleibt, wenn die Belohnung wegfällt: ein Ziel, das mir etwas bedeutet, ein Zeichen, dass ich besser werde, eine Wahl, wie ich lerne."),
      c: tt("Loss messages and rankings of the weakest learners: they raise activity today and cost trust tomorrow.", "Verlustmeldungen und Ranglisten der schwächsten Lernenden: Sie steigern heute die Aktivität und kosten morgen das Vertrauen."),
    },
    causes: [...CAUSE_MODEL],
    causeWhy: tt(
      "The case says the content is perceived as boring and that progress is not visible; facts 1 and 8 show a progress bar on one platform and none on the other, and facts 3 and 5 show a task on one and only reading on the other.",
      "Der Fall sagt, der Inhalt werde als langweilig empfunden und Fortschritt sei nicht sichtbar; die Fakten 1 und 8 zeigen auf der einen Plattform einen Fortschrittsbalken und auf der anderen keinen, und die Fakten 3 und 5 zeigen auf der einen eine Aufgabe und auf der anderen nur Lesetext.",
    ),
    chosen: [...MODEL_MEASURES],
    impact,
    effort,
    risk,
    reasons: {
      m1: tt("Progress tracking answers facts 1 and 8: the learner sees how far they have come. It costs €8,000 and three weeks, so effort is Low. Impact is High because perceived progress is the strongest motivator; risk is Low because it only adds information.", "Fortschrittsverfolgung beantwortet die Fakten 1 und 8: Die Lernende sieht, wie weit sie gekommen ist. Sie kostet 8.000 € und drei Wochen, der Aufwand ist also Niedrig. Die Wirkung ist Hoch, weil wahrgenommener Fortschritt der stärkste Motivator ist; das Risiko ist Niedrig, weil sie nur Information hinzufügt."),
      m2: tt("Interactive elements answer facts 3 and 5, reading without doing. They are the biggest cost, €18,000 and six weeks, so effort is Mid and this is where the plan goes over the budget; I would start with the most-opened courses. Impact High, risk Mid because weak tasks feel like homework.", "Interaktive Elemente beantworten die Fakten 3 und 5, lesen ohne zu tun. Sie sind der größte Posten, 18.000 € und sechs Wochen, der Aufwand ist also Mittel, und hier geht der Plan über das Budget; ich würde mit den meistgeöffneten Kursen beginnen. Wirkung Hoch, Risiko Mittel, weil schwache Aufgaben sich wie Hausaufgaben anfühlen."),
      m3: tt("Clear learning objectives answer facts 4 and 7 cheaply, at €6,000 and two weeks. Impact is Mid: a goal sentence gives direction but does not change what the learner does alone. Risk Low.", "Klare Lernziele beantworten die Fakten 4 und 7 günstig, mit 6.000 € und zwei Wochen. Die Wirkung ist Mittel: Ein Zielsatz gibt Richtung, ändert aber nicht allein, was die Lernende tut. Risiko Niedrig."),
      m4: tt("Feedback after every task answers facts 2 and 6: a result and a next step. It costs €12,000 and four weeks, so effort is Mid. Impact High because it supports competence; risk Low.", "Feedback nach jeder Aufgabe beantwortet die Fakten 2 und 6: ein Ergebnis und ein nächster Schritt. Es kostet 12.000 € und vier Wochen, der Aufwand ist also Mittel. Wirkung Hoch, weil es die Kompetenz stützt; Risiko Niedrig."),
    },
    effortFlags: [],
    order: [...MODEL_MEASURES],
    orderWhy: tt(
      "Progress tracking goes first: it is the cheapest of the four that works for every learner, it answers the strongest motivator, and the other measures show up in it as steps done.",
      "Die Fortschrittsverfolgung kommt zuerst: Sie ist von den vieren die günstigste, die für jede Lernende wirkt, sie beantwortet den stärksten Motivator, und die anderen Maßnahmen erscheinen darin als erledigte Schritte.",
    ),
    missingInfo: tt(
      "I do not know whether learners leave for lack of progress or for lack of time. I would interview six learners who dropped out and ask what made them stop.",
      "Ich weiß nicht, ob Lernende wegen fehlenden Fortschritts oder wegen fehlender Zeit gehen. Ich würde sechs Lernende interviewen, die abgebrochen haben, und fragen, was sie zum Aufhören brachte.",
    ),
  };
}

export function KEY_D4_R2(): Partial<D4R2> {
  return {
    strategy: MODEL_STRATEGY,
    strategyWhy: tt(
      "I build on intrinsic motivation (goals, progress, feedback) and keep extrinsic elements out, because the leaving learners lack a sign of progress and a next step, which are ability and prompt problems; a reward would not fix those.",
      "Ich baue auf intrinsische Motivation (Ziele, Fortschritt, Feedback) und lasse extrinsische Elemente weg, weil den abbrechenden Lernenden ein Zeichen von Fortschritt und ein nächster Schritt fehlen, also Probleme von Können und Impuls; eine Belohnung würde sie nicht lösen.",
    ),
    picks: [...MODEL_DECISIONS],
    order: [...MODEL_DECISIONS],
    orderWhy: tt(
      "Visible progress and a next step go first: they work on ability and prompt for every learner on every page, cost €40,000, and give the first figures (return rate) within fourteen weeks.",
      "Sichtbarer Fortschritt und ein nächster Schritt kommen zuerst: Sie wirken auf Können und Impuls für jede Lernende auf jeder Seite, kosten 40.000 € und liefern in vierzehn Wochen die ersten Zahlen (Rückkehrrate).",
    ),
    metrics: [...MODEL_METRICS],
    success: tt(
      "I will measure the seven-day return rate against today's baseline, with a control group that does not get the progress display, and I will read it after six weeks together with six learner interviews.",
      "Ich messe die Rückkehrrate nach sieben Tagen gegen die heutige Ausgangslage, mit einer Kontrollgruppe, die die Fortschrittsanzeige nicht bekommt, und lese sie nach sechs Wochen zusammen mit sechs Lernenden-Interviews.",
    ),
    risk: MODEL_RISK_PICK,
    riskPlan: tt(
      "I run the research and experiment routine from month one, so we learn why learners leave before we spend the large part of the budget. I would notice the risk if the interviews name a reason the measures do not touch.",
      "Ich starte die Forschungs- und Experimentier-Routine ab Monat eins, damit wir lernen, warum Lernende gehen, bevor wir den großen Teil des Budgets ausgeben. Ich würde das Risiko bemerken, wenn die Interviews einen Grund nennen, den die Maßnahmen nicht berühren.",
    ),
    uncertain: tt(
      "I decide to add a progress display and a next step to the three most-opened courses first. I do not know whether learners leave for lack of progress or lack of time. I will reverse it if the seven-day return rate is not at least five points above the control group after six weeks.",
      "Ich entscheide, zuerst in den drei meistgeöffneten Kursen eine Fortschrittsanzeige und einen nächsten Schritt einzuführen. Ich weiß nicht, ob Lernende wegen fehlenden Fortschritts oder fehlender Zeit gehen. Ich nehme es zurück, wenn die Rückkehrrate nach sieben Tagen nach sechs Wochen nicht mindestens fünf Punkte über der Kontrollgruppe liegt.",
    ),
    owner: MODEL_OWNER,
    evidence: [...MODEL_EVIDENCE],
    giveUp: tt(
      "I give up points, badges and the leaderboard this year, and I postpone rebuilding the five most-used courses; learners keep the current content with a progress display on top.",
      "Ich verzichte dieses Jahr auf Punkte, Badges und die Rangliste und verschiebe den Neuaufbau der fünf meistgenutzten Kurse; die Lernenden behalten den jetzigen Inhalt mit einer Fortschrittsanzeige darüber.",
    ),
  };
}
