import { MEASURE_BY_ID, MODEL_CRITICAL, MODEL_IMPACT, MODEL_MEASURES, MODEL_PAIN, MODEL_RISK, TRUTH_SORT, effortBand } from "@/data/day6/case";
import { MODEL_DECISIONS, MODEL_SEGMENTS, MODEL_TARGET } from "@/data/day6/route2";
import { tt } from "@/lib/lang";
import type { D6R1, D6R2, Emotion, JCell } from "@/store/dayTypesStd";
import type { Score } from "@/store/useStore";

/**
 * The model answers of Day 6 (CLAUDE.md #7). "Fill all model answers" in the mentor bar enters every one of them, so after one fill every missing
 * list is empty and both documents export at once. The texts follow the site's language, because the fill enters them in that language. Mentor tools
 * stay English (#32); only the answers they enter are bilingual. The reference measures cover the three groups of the brief and together cost €45,000,
 * exactly the case's budget; a different, well-reasoned choice also exports (#38).
 */
export const MENTOR_NOTE = "The reference four measures cover learners (M1, M2), both groups (M6) and teachers (M4) and cost exactly the case's €45,000 (a Case assumption). The organisations' complaint is answered through learners who finish.";

const j = (does: string, thinks: string, emotion: Emotion, pain: string, acts = ""): JCell => ({ does, thinks, emotion, pain, acts });

export function KEY_D6_R1(): Partial<D6R1> {
  const impact: Record<string, Score> = { ...MODEL_IMPACT } as Record<string, Score>;
  const risk: Record<string, Score> = { ...MODEL_RISK } as Record<string, Score>;
  const effort: Record<string, Score> = Object.fromEntries(MODEL_MEASURES.map((id) => [id, effortBand(MEASURE_BY_ID[id].cost)])) as Record<string, Score>;
  return {
    sort: { ...TRUTH_SORT },
    persona: {
      nameRole: tt("Anja Weber, 36, a project manager with two children", "Anja Weber, 36, Projektleiterin mit zwei Kindern"),
      goals: tt("She wants the certificate to apply for a team-lead role next year (note 2) and to use what she learns in her project next week (note 5).", "Sie will das Zertifikat, um sich nächstes Jahr auf eine Teamleiterstelle zu bewerben (Notiz 2), und das Gelernte nächste Woche in ihrem Projekt anwenden (Notiz 5)."),
      problems: tt("After three days away she does not know where she stopped (note 3), a lesson needs 40 minutes in one sitting and cannot be paused (note 6), and the reminder arrives at 08:00 while she is at work (note 7).", "Nach drei Tagen weiß sie nicht, wo sie aufgehört hat (Notiz 3), eine Lektion braucht 40 Minuten am Stück und lässt sich nicht pausieren (Notiz 6), und die Erinnerung kommt um 08:00 Uhr, wenn sie bei der Arbeit ist (Notiz 7)."),
      situation: tt("She studies after 21:00 for about 20 minutes on her phone (notes 1 and 4). Her employer pays and her manager wants to see progress (note 8).", "Sie lernt nach 21:00 Uhr etwa 20 Minuten auf dem Handy (Notizen 1 und 4). Ihr Arbeitgeber zahlt, und ihre Chefin will Fortschritt sehen (Notiz 8)."),
      expectations: tt("She expects to land on the exact place where she stopped, a lesson she can finish in 20 minutes, and a sign of progress she can show her manager.", "Sie erwartet, genau an der Stelle zu landen, an der sie aufgehört hat, eine Lektion, die sie in 20 Minuten schafft, und ein Zeichen von Fortschritt, das sie ihrer Chefin zeigen kann."),
    },
    frustrations: tt(
      "She could be frustrated at 21:00, tired, when she must first find where she stopped and then meets a 40-minute lesson, so she closes the app. Because of this persona a team could decide to put a resume button on every screen and to cut lessons into pieces of five minutes.",
      "Sie könnte um 21:00 Uhr müde frustriert sein, wenn sie erst ihre Stelle finden muss und dann auf eine 40-Minuten-Lektion trifft, also schließt sie die App. Wegen dieser Persona könnte ein Team entscheiden, auf jedem Bildschirm einen Fortsetzen-Button zu zeigen und Lektionen in Stücke von fünf Minuten zu schneiden.",
    ),
    reflect: {
      a: tt("For the working professional who studies in twenty minutes at night, not for “the learner” in general.", "Für die Berufstätige, die nachts in zwanzig Minuten lernt, nicht für „die Lernende“ im Allgemeinen."),
      b: tt("The time-poor learner, because she is the largest group, and the organisation that pays decides on renewals through her usage.", "Die Lernende mit wenig Zeit, weil sie die größte Gruppe ist und die zahlende Organisation über ihre Nutzung über Verlängerungen entscheidet."),
      c: tt("At the moment she returns after a break: nothing shows where she stopped.", "In dem Moment, in dem sie nach einer Pause zurückkommt: Nichts zeigt, wo sie aufgehört hat."),
    },
    j: {
      entry: j(tt("Signs up and opens the first lesson.", "Meldet sich an und öffnet die erste Lektion."), tt("This looks fine, I will try it.", "Das sieht gut aus, ich probiere es."), 4, tt("A long start page with no sense of what comes next.", "Eine lange Startseite ohne Eindruck, was als Nächstes kommt.")),
      usage: j(tt("Starts the second lesson in the evening.", "Beginnt am Abend die zweite Lektion."), tt("This takes longer than I have.", "Das dauert länger, als ich habe."), 2, tt("A 40-minute lesson that cannot be paused.", "Eine 40-Minuten-Lektion, die sich nicht pausieren lässt.")),
      drop: j(tt("Closes the app in the middle of a lesson.", "Schließt die App mitten in einer Lektion."), tt("I will do it later.", "Ich mache es später."), 1, tt("No reminder at a useful time and no way back to the place.", "Keine Erinnerung zu einem sinnvollen Zeitpunkt und kein Weg zurück an die Stelle.")),
    },
    jProblems: tt(
      "1. A lesson needs 40 minutes in one sitting. 2. It cannot be paused and resumed. 3. The reminder arrives when she is at work. 4. She cannot find where she stopped.",
      "1. Eine Lektion braucht 40 Minuten am Stück. 2. Sie lässt sich nicht pausieren und fortsetzen. 3. Die Erinnerung kommt, wenn sie bei der Arbeit ist. 4. Sie findet ihre Stelle nicht.",
    ),
    jCritical: MODEL_CRITICAL,
    jCriticalWhy: tt(
      "Usage is critical: her emotion drops from 4 to 2 there, because the lesson does not fit her twenty minutes, and the next thing she does is to close the app and not return.",
      "Die Nutzung ist kritisch: Ihre Emotion fällt dort von 4 auf 2, weil die Lektion nicht in ihre zwanzig Minuten passt, und als Nächstes schließt sie die App und kommt nicht zurück.",
    ),
    teacher: {
      nameRole: tt("Markus Feld, 44, a freelance trainer who builds courses", "Markus Feld, 44, freiberuflicher Trainer, der Kurse baut"),
      goals: tt("He wants to build and run courses with little effort and to reuse a unit in a second course (notes T1, T6).", "Er will Kurse mit wenig Aufwand bauen und durchführen und eine Einheit in einem zweiten Kurs wiederverwenden (Notizen T1, T6)."),
      problems: tt("Uploading one unit takes three hours (T1), the editor has nine tabs and he uses two (T2), and he cannot see which learners are stuck (T3).", "Eine Einheit hochzuladen dauert drei Stunden (T1), der Editor hat neun Reiter und er nutzt zwei (T2), und er sieht nicht, welche Lernenden feststecken (T3)."),
      situation: tt("He builds courses on Sunday evening at his desk (T1), unpaid time next to his own work.", "Er baut Kurse am Sonntagabend an seinem Schreibtisch (T1), unbezahlte Zeit neben seiner eigenen Arbeit."),
    },
    jl: {
      entry: j(tt("Signs up and finds her course.", "Meldet sich an und findet ihren Kurs."), "", 4, tt("None yet: she arrives with a goal.", "Noch keiner: Sie kommt mit einem Ziel.")),
      learning: j(tt("Works through a 40-minute lesson.", "Arbeitet eine 40-Minuten-Lektion durch."), "", 2, tt("The lesson cannot be paused.", "Die Lektion lässt sich nicht pausieren.")),
      progress: j(tt("Returns after three days.", "Kehrt nach drei Tagen zurück."), "", 1, tt("She does not know where she stopped.", "Sie weiß nicht, wo sie aufgehört hat.")),
    },
    jt: {
      setup: j(tt("Builds a course on Sunday evening.", "Baut am Sonntagabend einen Kurs."), "", 2, tt("Nine tabs and a three-hour upload.", "Neun Reiter und ein dreistündiger Upload.")),
      run: j(tt("Waits for learners to write to him.", "Wartet, dass Lernende ihm schreiben."), "", 2, tt("He cannot see who is stuck.", "Er sieht nicht, wer feststeckt.")),
      review: j(tt("Copies a unit into a second course.", "Kopiert eine Einheit in einen zweiten Kurs."), "", 3, tt("He must upload it again.", "Er muss sie noch einmal hochladen.")),
    },
    shared: tt(
      "Both the learner and the teacher cannot see where someone is: she does not know where she stopped, he does not know who is stuck. That suggests the cause is the missing view of the course path, not two separate screens.",
      "Sowohl die Lernende als auch der Lehrende sehen nicht, wo jemand steht: Sie weiß nicht, wo sie aufgehört hat, er weiß nicht, wer feststeckt. Das legt nahe, dass die Ursache die fehlende Sicht auf den Kursweg ist, nicht zwei getrennte Bildschirme.",
    ),
    chosen: [...MODEL_MEASURES],
    impact,
    effort,
    risk,
    pain: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MODEL_PAIN[id]])),
    reasons: {
      m1: tt("Five-minute units answer note 6 and fit the 20 minutes. At €16,000 it is above €15,000, so effort is High. User impact High for the largest persona; risk Mid, because content must be rebuilt. It uses over a third of the budget.", "Fünf-Minuten-Einheiten beantworten Notiz 6 und passen zu den 20 Minuten. Mit 16.000 € liegt sie über 15.000 €, der Aufwand ist also Hoch. Nutzerwirkung Hoch für die größte Persona; Risiko Mittel, weil Inhalte neu gebaut werden müssen. Sie braucht über ein Drittel des Budgets."),
      m2: tt("A resume button answers note 3 exactly. €6,000 is under €8,000, so effort is Low. User impact High, because many learners return after a break; risk Low, a small addition that can be undone.", "Ein Fortsetzen-Button beantwortet Notiz 3 genau. 6.000 € liegen unter 8.000 €, der Aufwand ist also Niedrig. Nutzerwirkung Hoch, weil viele Lernende nach einer Pause zurückkehren; Risiko Niedrig, eine kleine Ergänzung, die sich zurücknehmen lässt."),
      m6: tt("One course structure answers the teachers' T2 and T3 and the learner's note 3: both see the same path. €11,000 is between €8,000 and €15,000, so effort is Mid. Impact Mid, because it is a shared base and not the sharpest fix for anyone; risk Low.", "Eine Kursstruktur beantwortet T2 und T3 der Lehrenden und Notiz 3 der Lernenden: Beide sehen denselben Weg. 11.000 € liegen zwischen 8.000 € und 15.000 €, der Aufwand ist also Mittel. Wirkung Mittel, weil sie eine gemeinsame Basis ist und für niemanden die schärfste Lösung; Risiko Niedrig."),
      m4: tt("A view of stuck learners answers T3 and serves the 120 teachers who supply the content. €12,000, so effort is Mid. Impact Mid for a smaller group; risk Low. The organisations gain indirectly when learners get help earlier.", "Eine Ansicht der festgefahrenen Lernenden beantwortet T3 und dient den 120 Lehrenden, die den Inhalt liefern. 12.000 €, der Aufwand ist also Mittel. Wirkung Mittel für eine kleinere Gruppe; Risiko Niedrig. Die Organisationen profitieren indirekt, wenn Lernende früher Hilfe bekommen."),
    },
    effortFlags: [],
    order: [...MODEL_MEASURES],
    orderWhy: tt(
      "“Where I stopped” goes first: it answers the learner's lowest point, costs the least (€6,000, two weeks) and is done before the larger measures start. Flexible formats follow because they need the longest.",
      "„Wo ich aufgehört habe“ kommt zuerst: Es beantwortet den tiefsten Punkt der Lernenden, kostet am wenigsten (6.000 €, zwei Wochen) und ist fertig, bevor die größeren Maßnahmen beginnen. Flexible Formate folgen, weil sie am längsten brauchen.",
    ),
    missingInfo: tt(
      "I do not know whether learners leave because the lesson is too long or because they cannot find their place. I would interview five learners who stopped and look at where in the lesson they left.",
      "Ich weiß nicht, ob Lernende gehen, weil die Lektion zu lang ist oder weil sie ihre Stelle nicht finden. Ich würde fünf Lernende interviewen, die aufgehört haben, und ansehen, an welcher Stelle der Lektion sie gegangen sind.",
    ),
  };
}

export function KEY_D6_R2(): Partial<D6R2> {
  return {
    segs: [...MODEL_SEGMENTS],
    segPersona: {
      s1: tt("Anja, a project manager, wants to finish the course in twenty-minute evening slots on her phone, but loses her place after a break (S1: 45% of learners, return rate falling).", "Anja, Projektleiterin, will den Kurs in zwanzigminütigen Abendfenstern auf dem Handy abschließen, verliert aber nach einer Pause ihre Stelle (S1: 45 % der Lernenden, Rückkehrrate sinkt)."),
      s3: tt("Markus, a trainer, wants to build courses with little effort, but the editor has nine tabs and uploading takes hours (S3: 120 teachers who supply all content, 4 of 6 say it is too complicated).", "Markus, Trainer, will Kurse mit wenig Aufwand bauen, aber der Editor hat neun Reiter und das Hochladen dauert Stunden (S3: 120 Lehrende, die den gesamten Inhalt liefern, 4 von 6 sagen, er sei zu kompliziert)."),
      s4: tt("Petra, a training manager, wants to show management that staff finish, but only 31% logged in and she formats the report by hand (S4: 60 accounts that decide renewals).", "Petra, Weiterbildungsleiterin, will der Geschäftsführung zeigen, dass Mitarbeitende abschließen, aber nur 31 % haben sich angemeldet und sie formatiert den Bericht von Hand (S4: 60 Konten, die über Verlängerungen entscheiden)."),
    },
    target: MODEL_TARGET,
    targetWhy: tt(
      "Time-poor learners go first: they are the largest segment (45%), their return rate is falling, and their usage is what the training managers measure when they decide on renewals, so one fix helps two segments. Teachers and training managers get a smaller fix later.",
      "Lernende mit wenig Zeit kommen zuerst: Sie sind das größte Segment (45 %), ihre Rückkehrrate sinkt, und ihre Nutzung ist das, was die Weiterbildungsleiter messen, wenn sie über Verlängerungen entscheiden, eine Lösung hilft also zwei Segmenten. Lehrende und Weiterbildungsleiter bekommen später eine kleinere Lösung.",
    ),
    problems: tt(
      "1. In the learning phase she meets a 40-minute lesson that cannot be paused. 2. After a break she cannot find where she stopped. 3. The reminder arrives at 08:00, when she is at work, so she ignores it.",
      "1. In der Lernphase trifft sie auf eine 40-Minuten-Lektion, die sich nicht pausieren lässt. 2. Nach einer Pause findet sie ihre Stelle nicht. 3. Die Erinnerung kommt um 08:00 Uhr, wenn sie bei der Arbeit ist, also ignoriert sie sie.",
    ),
    jSeg: MODEL_TARGET,
    jr: {
      entry: j(tt("Signs up and picks her course.", "Meldet sich an und wählt ihren Kurs."), "", 4, tt("A start page that does not say how long a lesson takes.", "Eine Startseite, die nicht sagt, wie lange eine Lektion dauert."), tt("An onboarding step that shows the length of each unit.", "Ein Onboarding-Schritt, der die Länge jeder Einheit zeigt.")),
      work: j(tt("Starts a lesson at 21:00 on her phone.", "Beginnt um 21:00 Uhr eine Lektion auf dem Handy."), "", 2, tt("40 minutes in one sitting; no pause.", "40 Minuten am Stück; keine Pause."), tt("D1: five-minute formats that can be paused anywhere.", "D1: Fünf-Minuten-Formate, die sich überall pausieren lassen.")),
      progress: j(tt("Returns after three days and wants to finish.", "Kehrt nach drei Tagen zurück und will abschließen."), "", 2, tt("She cannot see where she stopped or how far she is.", "Sie sieht nicht, wo sie aufgehört hat oder wie weit sie ist."), tt("D1 resumes at the exact place; D4 shows her manager the progress.", "D1 setzt an der genauen Stelle fort; D4 zeigt ihrer Chefin den Fortschritt.")),
    },
    picks: [...MODEL_DECISIONS],
    order: [...MODEL_DECISIONS],
    orderWhy: tt(
      "Flexible five-minute formats go first: they fix the learner's critical phase and carry the largest segment, so the first figure (the return rate) moves within twenty weeks. Client reporting follows because it keeps the training managers informed, and the research programme runs beside both.",
      "Flexible Fünf-Minuten-Formate kommen zuerst: Sie beheben die kritische Phase der Lernenden und tragen das größte Segment, die erste Zahl (die Rückkehrrate) bewegt sich also innerhalb von zwanzig Wochen. Kundenberichte folgen, weil sie die Weiterbildungsleiter informiert halten, und das Forschungsprogramm läuft neben beiden.",
    ),
    decide: tt("I decide that time-poor learners (S1) are the prioritised persona for the next two quarters.", "Ich entscheide, dass Lernende mit wenig Zeit (S1) in den nächsten zwei Quartalen die priorisierte Persona sind."),
    dontKnow: tt("I do not know whether their falling return rate is caused by the lesson length or by the missing place marker, and the personas rest on only 12 interviews.", "Ich weiß nicht, ob ihre sinkende Rückkehrrate an der Lektionslänge oder an der fehlenden Stellenmarke liegt, und die Personas beruhen nur auf 12 Interviews."),
    reverse: tt("I reverse if the seven-day return rate of S1 is not up eight points after ten weeks, or if the training managers' renewals of S4 show a drop.", "Ich nehme zurück, wenn die Rückkehrrate von S1 nach zehn Wochen nicht um acht Punkte gestiegen ist oder wenn die Verlängerungen der Weiterbildungsleiter (S4) einbrechen."),
    giveUp: tt(
      "I give up the simpler teacher workspace (D2) and the exam-preparation mode (D5) for the first two quarters; the teachers get their turn in the third quarter, and I will tell them the date.",
      "Ich verzichte in den ersten zwei Quartalen auf den einfacheren Arbeitsbereich für Lehrende (D2) und den Prüfungsvorbereitungsmodus (D5); die Lehrenden kommen im dritten Quartal an die Reihe, und ich nenne ihnen den Termin.",
    ),
  };
}
