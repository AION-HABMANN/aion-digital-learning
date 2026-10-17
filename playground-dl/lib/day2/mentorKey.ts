import { MODEL_ADAPTIVE, MODEL_OPT, MODEL_PLATFORM } from "@/data/day2/case";
import { tt } from "@/lib/lang";
import type { D2R1, D2R2 } from "@/store/dayTypes";

/**
 * The model answers of Day 2 (CLAUDE.md #7). "Fill all model answers" in the mentor bar enters every one of them, so after one fill every
 * missing list is empty and both documents export at once. The texts follow the site's language, because the fill enters them in that
 * language. Mentor tools stay English (#32); only the answers they enter are bilingual. The choices follow the plan's Musterlösung (main
 * problem: lack of feedback and individualisation; low-fidelity tests first, learning paths and interaction, adaptive elements step by
 * step; rationale: minimise risk before maximising technology). A different, well-reasoned answer also exports (#38). The fill enters both
 * layouts of a list (the text box and the table); the learner's chosen layout is not changed.
 */
export function KEY_D2_R1(): Partial<D2R1> {
  return {
    prefer: MODEL_PLATFORM,
    preferWhy: tt(
      "On Platform A I always see the next step and how far I have come, so I can fit a unit into ten minutes and know when I am done. On Platform B I would scroll for forty minutes with no sign of progress, and I would stop.",
      "Auf Plattform A sehe ich immer den nächsten Schritt und wie weit ich gekommen bin, kann also eine Einheit in zehn Minuten unterbringen und weiß, wann ich fertig bin. Auf Plattform B würde ich vierzig Minuten scrollen, ohne ein Zeichen für den Fortschritt, und aufhören.",
    ),
    diffs: tt(
      "Navigation: A shows a path of six steps with the current one marked; B has no menu, the only way on is to scroll.\nProgress: A shows a progress bar and “Step 2 of 6”; B gives no sign of how far along the learner is.\nLength: each unit on A says “6 min” and has one goal; B is one page of about 40 minutes of reading.\nResult of a task: after a quiz A says “4 of 5 correct” and names the question to review; B gives no result.\nEnding: after the last page B returns the learner to the course list without any message; A shows what the learner got right.",
      "Navigation: A zeigt einen Pfad aus sechs Schritten und markiert den aktuellen; B hat kein Menü, der einzige Weg weiter ist Scrollen.\nFortschritt: A zeigt eine Fortschrittsleiste und „Schritt 2 von 6“; B gibt kein Zeichen, wie weit die Lernende ist.\nLänge: Jede Einheit bei A nennt „6 Min.“ und hat ein Ziel; B ist eine Seite mit etwa 40 Minuten Lesestoff.\nErgebnis einer Aufgabe: Nach einem Quiz sagt A „4 von 5 richtig“ und nennt die Frage zum Wiederholen; B gibt kein Ergebnis.\nAbschluss: Nach der letzten Seite führt B die Lernende ohne Meldung zur Kursliste zurück; A zeigt, was die Lernende richtig hatte.",
    ),
    diffRows: [
      { aspect: tt("Navigation", "Navigation"), a: tt("a path of six steps with the current one marked", "ein Pfad aus sechs Schritten, der aktuelle ist markiert"), b: tt("no menu; the only way on is to scroll", "kein Menü; der einzige Weg weiter ist Scrollen") },
      { aspect: tt("Progress", "Fortschritt"), a: tt("a progress bar and “Step 2 of 6”", "eine Fortschrittsleiste und „Schritt 2 von 6“"), b: tt("no sign of how far along the learner is", "kein Zeichen, wie weit die Lernende ist") },
      { aspect: tt("Length of a unit", "Länge einer Einheit"), a: tt("each unit says “6 min” and has one goal", "jede Einheit nennt „6 Min.“ und hat ein Ziel"), b: tt("one page of about 40 minutes of reading", "eine Seite mit etwa 40 Minuten Lesestoff") },
      { aspect: tt("Result of a task", "Ergebnis einer Aufgabe"), a: tt("after a quiz: “4 of 5 correct” and the question to review", "nach einem Quiz: „4 von 5 richtig“ und die Frage zum Wiederholen"), b: tt("no result", "kein Ergebnis") },
      { aspect: tt("Ending", "Abschluss"), a: tt("shows what the learner got right", "zeigt, was die Lernende richtig hatte"), b: tt("returns to the course list after the last page without any message", "führt nach der letzten Seite ohne Meldung zur Kursliste zurück") },
    ],
    principles: [
      tt("Show the learner the next step, because a learner who has to search for it may stop before they find it.", "Zeigen Sie den Lernenden den nächsten Schritt, weil eine Lernende, die ihn suchen muss, aufhören kann, bevor sie ihn findet."),
      tt("Cut the content into units of a few minutes with one goal each, because a learner with ten free minutes can only start what they can finish.", "Schneiden Sie den Inhalt in Einheiten von wenigen Minuten mit je einem Ziel, weil eine Lernende mit zehn freien Minuten nur beginnt, was sie beenden kann."),
      tt("Show progress and give a result after every task, because without a sign of success the effort feels wasted.", "Zeigen Sie Fortschritt und geben Sie nach jeder Aufgabe ein Ergebnis, weil die Mühe ohne ein Zeichen von Erfolg vergeudet wirkt."),
    ],
    assessText: {
      A: tt(
        "Risk: medium. It is built on user needs we do not know yet, so we may polish the wrong idea. Benefit: medium. We get something realistic to show, but only after a long time. Effort: high, a lot of design and build work before any user has seen it.",
        "Risiko: mittel. Er baut auf Nutzerbedürfnissen auf, die wir noch nicht kennen, wir könnten also die falsche Idee ausarbeiten. Nutzen: mittel. Wir haben etwas Realistisches zum Zeigen, aber erst nach langer Zeit. Aufwand: hoch, viel Design- und Entwicklungsarbeit, bevor ein Nutzer ihn gesehen hat.",
      ),
      B: tt(
        "Risk: low. A rough version is cheap to throw away if it is wrong. Benefit: high. Within a couple of weeks we learn what users really do. Effort: low, sketches or a clickable low-fidelity version are enough.",
        "Risiko: gering. Eine grobe Version ist günstig zu verwerfen, wenn sie falsch ist. Nutzen: hoch. Innerhalb weniger Wochen lernen wir, was Nutzer wirklich tun. Aufwand: gering, Skizzen oder eine klickbare Low-Fidelity-Version genügen.",
      ),
      C: tt(
        "Risk: high. If the needs are different from what we assumed, we find out only after launch. Benefit: low. We are fast, but we have no evidence. Effort: very high, a full build with no way back inside three months.",
        "Risiko: hoch. Wenn die Bedürfnisse anders sind als angenommen, erfahren wir es erst nach dem Start. Nutzen: gering. Wir sind schnell, haben aber keine Belege. Aufwand: sehr hoch, ein kompletter Bau ohne Rückweg innerhalb von drei Monaten.",
      ),
    },
    assessRows: {
      A: { risk: tt("Medium: built on needs we do not know", "Mittel: baut auf unbekannten Bedürfnissen auf"), benefit: tt("Medium: realistic, but late", "Mittel: realistisch, aber spät"), effort: tt("High: much work before any test", "Hoch: viel Arbeit vor jedem Test") },
      B: { risk: tt("Low: cheap to change", "Gering: günstig zu ändern"), benefit: tt("High: quick evidence", "Hoch: schnelle Belege"), effort: tt("Low: sketches are enough", "Gering: Skizzen genügen") },
      C: { risk: tt("High: found out only after launch", "Hoch: erst nach dem Start bemerkt"), benefit: tt("Low: speed without evidence", "Gering: Tempo ohne Belege"), effort: tt("Very high: full build, no way back", "Sehr hoch: kompletter Bau, kein Rückweg") },
    },
    optChoice: MODEL_OPT,
    optWhy: tt(
      "Option B. I assume “limited” means enough for one test round and a first build, but not for a full rebuild. With three months, that budget and unclear needs, a low-fidelity test is the cheapest way to learn what works, and it keeps the rest of the time and money free; what we build next follows from the tests. A is polished but built on an untested idea, and C finds problems only when learners leave.",
      "Option B. Ich nehme an, „begrenzt“ heißt: genug für eine Testrunde und einen ersten Bau, aber nicht für einen vollständigen Umbau. Bei drei Monaten, diesem Budget und unklaren Bedürfnissen ist ein Low-Fidelity-Test der günstigste Weg zu lernen, was funktioniert, und er hält die übrige Zeit und das übrige Geld frei; was wir danach bauen, folgt aus den Tests. A ist ausgearbeitet, aber auf eine ungetestete Idee gebaut, und C findet Probleme erst, wenn Lernende gehen.",
    ),
    noTest: tt(
      "We build the wrong thing and find out only after launch, when every change is expensive and the budget goes into rework. Learners leave before we know why, and a competitor may ship a better version while we rework. The one that worries me most is finding out late.",
      "Wir bauen das Falsche und erfahren es erst nach dem Start, wenn jede Änderung teuer ist und das Budget in Nacharbeit fließt. Lernende gehen, bevor wir wissen, warum, und ein Wettbewerber bringt vielleicht eine bessere Version heraus, während wir nacharbeiten. Am meisten sorgt mich, es spät zu erfahren.",
    ),
    weakText: tt(
      "1. Learners drop out early: nothing tells them how far they are or what comes next.\n2. There is no feedback after a task, so the effort feels wasted.\n3. There is no personalisation: everyone gets the same path, whatever they already know.\n4. The content is rated boring: long text pages with no interaction.\nThe main problem is the lack of feedback and of individualisation.",
      "1. Lernende brechen früh ab: Nichts sagt ihnen, wie weit sie sind oder was als Nächstes kommt.\n2. Es gibt kein Feedback nach einer Aufgabe, die Mühe wirkt vergeudet.\n3. Es gibt keine Personalisierung: Alle bekommen denselben Pfad, egal, was sie schon wissen.\n4. Der Inhalt wird als langweilig bewertet: lange Textseiten ohne Interaktion.\nDas Hauptproblem ist der Mangel an Feedback und an Individualisierung.",
    ),
    approachText: tt(
      "I start with low-fidelity: a clickable sketch of the course path and one lesson with feedback, tried with five learners before anything is built. The focus is the learning path and the interaction. High-fidelity comes only for the flows that survive that test, so the risk stays small.",
      "Ich beginne mit Low-Fidelity: eine klickbare Skizze des Kurspfads und einer Lektion mit Feedback, mit fünf Lernenden ausprobiert, bevor etwas gebaut wird. Der Fokus liegt auf Lernpfad und Interaktion. High-Fidelity kommt nur für die Abläufe, die diesen Test bestehen, so bleibt das Risiko klein.",
    ),
    testText: {
      "1": tt(
        "Task-based usability test of the clickable sketch: five learners find the next step and finish one unit while thinking aloud. I measure whether they finish, how long it takes and where they hesitate.",
        "Aufgabenbasierter Usability-Test der klickbaren Skizze: Fünf Lernende finden den nächsten Schritt und schließen eine Einheit ab und denken dabei laut. Ich messe, ob sie fertig werden, wie lange es dauert und wo sie zögern.",
      ),
      "2": tt(
        "Drop-out analysis of the current courses: I read the learning data to see at which lesson learners leave. I measure the drop-out rate per lesson.",
        "Abbruchanalyse der aktuellen Kurse: Ich lese die Lerndaten, um zu sehen, bei welcher Lektion Lernende gehen. Ich messe die Abbruchquote pro Lektion.",
      ),
      "3": tt(
        "Short interviews with eight learners who left: I ask what made them stop. I measure the reasons they give, grouped by theme.",
        "Kurze Interviews mit acht Lernenden, die gegangen sind: Ich frage, was sie zum Aufhören gebracht hat. Ich messe die genannten Gründe, nach Themen gruppiert.",
      ),
    },
    testRows: {
      "1": { what: tt("Usability test of the clickable sketch", "Usability-Test der klickbaren Skizze"), how: tt("5 learners, task-based, thinking aloud", "5 Lernende, aufgabenbasiert, lautes Denken"), measure: tt("Completion, time, where they hesitate", "Abschluss, Zeit, wo sie zögern") },
      "2": { what: tt("Drop-out analysis of current courses", "Abbruchanalyse der aktuellen Kurse"), how: tt("Read the learning data", "Die Lerndaten lesen"), measure: tt("Drop-out rate per lesson", "Abbruchquote pro Lektion") },
      "3": { what: tt("Interviews with learners who left", "Interviews mit Lernenden, die gegangen sind"), how: tt("8 short interviews", "8 kurze Interviews"), measure: tt("Reasons given, grouped by theme", "Genannte Gründe, nach Themen gruppiert") },
    },
    adaptive: MODEL_ADAPTIVE,
    adaptiveWhy: tt(
      "Partly: first fix path and feedback with low-fidelity tests, then try one rule-based step, a pre-test that lets learners skip what they know, in one course. The algorithmic part waits for data and the legal check.",
      "Teilweise: zuerst Pfad und Feedback mit Low-Fidelity-Tests verbessern, dann einen regelbasierten Schritt versuchen, einen Vortest, mit dem Lernende überspringen, was sie schon wissen, in einem Kurs. Der algorithmische Teil wartet auf Daten und die rechtliche Prüfung.",
    ),
  };
}

export function KEY_D2_R2(): Partial<D2R2> {
  return {
    adaptive: MODEL_ADAPTIVE,
    adaptiveWhy: tt(
      "Partly: I fund one small, tested step now, a guided path with feedback and a rule-based pilot in one course, and the recommendation engine waits until the pilot shows a result and our data and legal checks are in place.",
      "Teilweise: Ich finanziere jetzt einen kleinen, getesteten Schritt, einen geführten Pfad mit Feedback und einen regelbasierten Pilot in einem Kurs, und die Empfehlungs-Engine wartet, bis der Pilot ein Ergebnis zeigt und unsere Daten und rechtlichen Prüfungen stehen.",
    ),
    prototyping: tt(
      "We start with low-fidelity: paper and clickable prototypes with five learners per round. The first question is whether learners can find the next step and finish a unit, before anything is built. A new feature is built only after it has passed a round of tests.",
      "Wir beginnen mit Low-Fidelity: Papier- und klickbare Prototypen mit fünf Lernenden pro Runde. Die erste Frage ist, ob Lernende den nächsten Schritt finden und eine Einheit abschließen können, bevor etwas gebaut wird. Eine neue Funktion wird erst gebaut, nachdem sie eine Testrunde bestanden hat.",
    ),
    testing: tt(
      "I need to know where learners leave (drop-out per lesson), how long units take, whether they finish tasks in tests, and why they leave (interviews). Today I only have the first. I collect the rest with five-learner tests every two weeks and eight interviews.",
      "Ich muss wissen, wo Lernende gehen (Abbruch pro Lektion), wie lange Einheiten dauern, ob sie Aufgaben in Tests abschließen und warum sie gehen (Interviews). Heute habe ich nur das Erste. Den Rest erhebe ich mit Tests mit fünf Lernenden alle zwei Wochen und acht Interviews.",
    ),
    roadmap: tt(
      "1. Guided learning path and feedback after each task, for all learners, tested low-fidelity first.\n2. A learning dashboard so the team can see where learners leave.\n3. A rule-based personalisation pilot in one course, with a control group.\nLater: the recommendation engine, only when the pilot and the data show a result.",
      "1. Geführter Lernpfad und Feedback nach jeder Aufgabe, für alle Lernenden, zuerst als Low-Fidelity getestet.\n2. Ein Lern-Dashboard, damit das Team sieht, wo Lernende gehen.\n3. Ein regelbasierter Personalisierungs-Pilot in einem Kurs, mit Kontrollgruppe.\nSpäter: die Empfehlungs-Engine, nur wenn Pilot und Daten ein Ergebnis zeigen.",
    ),
    riskText: tt(
      "Technology against user value: buying AI first would use most of the budget and could leave learners with the same problems. The risk is paying for technology learners do not need. I put path and feedback first, because they solve a learner problem directly, and I treat the AI as a later step with a clear stop sign.",
      "Technologie gegen Nutzerwert: Zuerst KI zu kaufen würde den größten Teil des Budgets verbrauchen und die Lernenden mit denselben Problemen zurücklassen. Das Risiko ist, für Technologie zu zahlen, die Lernende nicht brauchen. Ich setze Pfad und Feedback an die erste Stelle, weil sie ein Problem der Lernenden direkt lösen, und behandle die KI als späteren Schritt mit klarem Stoppschild.",
    ),
    uncertain: tt(
      "I decide to run a rule-based personalisation pilot in one course. I do not know whether learners want recommended steps or whether our data is good enough. I will reverse it if pilot completion is not clearly above the control group after eight weeks.",
      "Ich entscheide, einen regelbasierten Personalisierungs-Pilot in einem Kurs zu fahren. Ich weiß nicht, ob Lernende empfohlene Schritte wollen oder ob unsere Daten gut genug sind. Ich nehme ihn zurück, wenn die Completion im Pilot nach acht Wochen nicht deutlich über der Kontrollgruppe liegt.",
    ),
  };
}
