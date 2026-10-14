"use client";

import { Arrow, DARK, Frame, LITE, Lines, MID, Marker, Person, Svg, Thumb, Txt } from "@/components/day/mockKit";
import { tt } from "@/lib/lang";

/**
 * Real pictures for Day 12 (CLAUDE.md #52): the four AdaptLearn screens of the task with their numbered markers, the same course for everyone against one that adapts, rules against
 * a model against too little data, a path screen that gains four personalisation patterns, opportunities and risks, and a thumbnail for every measure, option and decision. Mock
 * screens use their own neutral greys; the site's blue, teal and rust never colour the evidence (#15, #49).
 */

const AMBER = "#B7791F";

/* ------------------------------------------------------------------ the Task 1 evidence: four AdaptLearn screens, eight facts */

export type AlScreen = "path" | "rec" | "level" | "settings";

export function AdaptScreen({ kind }: { kind: AlScreen }) {
  const label =
    kind === "path"
      ? tt("AdaptLearn path: a notice that says only 'Your path was updated', and a list in which lesson 4 is missing", "AdaptLearn-Pfad: ein Hinweis, der nur „Ihr Pfad wurde aktualisiert“ sagt, und eine Liste, in der Lektion 4 fehlt")
      : kind === "rec"
        ? tt("AdaptLearn recommendations: one card with no reason, one beginner course offered to an advanced learner", "AdaptLearn-Empfehlungen: eine Karte ohne Grund, ein Anfängerkurs für eine Fortgeschrittene")
        : kind === "level"
          ? tt("AdaptLearn difficulty: a level that dropped two steps after one mistake, and a note with the reason and a button to change it back", "AdaptLearn-Schwierigkeit: ein Niveau, das nach einem Fehler um zwei Stufen sank, und ein Hinweis mit dem Grund und einem Button zum Zurückstellen")
          : tt("AdaptLearn settings: a switch between the system deciding and the learner choosing, and three start questions", "AdaptLearn-Einstellungen: ein Schalter zwischen dem System und der Lernenden als Entscheiderin, und drei Startfragen");
  return (
    <Svg viewBox="0 0 240 170" label={label}>
      <Frame>
        {kind === "path" && (
          <>
            <Txt x={12} y={30} size={9} bold>{tt("Your path", "Ihr Pfad")}</Txt>
            <rect x="12" y="36" width="214" height="16" rx="3" fill="#FFFFFF" stroke={AMBER} strokeWidth="1.4" />
            <Txt x={18} y={47} size={7.4}>{tt("Your path was updated.", "Ihr Pfad wurde aktualisiert.")}</Txt>
            {[1, 2, 3, 5, 6].map((n, i) => (
              <g key={n}>
                <rect x="12" y={58 + i * 15} width="214" height="12" rx="2" fill={LITE} />
                <Txt x={18} y={67 + i * 15} size={7}>{tt(`Lesson ${n}`, `Lektion ${n}`)}</Txt>
              </g>
            ))}
            <Marker x={216} y={44} n={1} />
            <Marker x={118} y={96} n={2} />
          </>
        )}
        {kind === "rec" && (
          <>
            <Txt x={12} y={30} size={9} bold>{tt("Recommended for you", "Für Sie empfohlen")}</Txt>
            <rect x="12" y="38" width="104" height="48" rx="4" fill="#FFFFFF" stroke={DARK} />
            <Txt x={18} y={52} size={7.6} bold>{tt("Pricing basics", "Preisgestaltung")}</Txt>
            <Lines x={18} y={58} n={2} w={90} gap={8} fill={MID} />
            <rect x="122" y="38" width="104" height="48" rx="4" fill="#FFFFFF" stroke={DARK} />
            <Txt x={128} y={52} size={7.6} bold>{tt("Beginner: negotiation", "Anfänger: Verhandeln")}</Txt>
            <Lines x={128} y={58} n={2} w={90} gap={8} fill={MID} />
            <Txt x={12} y={104} size={6.8} fill="#555555">{tt("Advanced test passed: yesterday", "Fortgeschrittenentest bestanden: gestern")}</Txt>
            <Txt x={12} y={116} size={6.8} fill="#555555">{tt("Last three clicks: beginner page", "Letzte drei Klicks: Anfängerseite")}</Txt>
            <Marker x={106} y={46} n={3} />
            <Marker x={216} y={46} n={4} />
          </>
        )}
        {kind === "level" && (
          <>
            <Txt x={12} y={30} size={9} bold>{tt("Difficulty", "Schwierigkeit")}</Txt>
            {[tt("Level 1", "Stufe 1"), tt("Level 2", "Stufe 2"), tt("Level 3", "Stufe 3"), tt("Level 4", "Stufe 4")].map((s, i) => (
              <g key={i}>
                <rect x={12 + i * 54} y="38" width="50" height="14" rx="3" fill={i === 0 ? DARK : LITE} />
                <Txt x={37 + i * 54} y={48} size={7} anchor="middle" fill={i === 0 ? "#FFFFFF" : "#333333"}>{s}</Txt>
              </g>
            ))}
            <Txt x={12} y={66} size={7} fill="#555555">{tt("Was level 3 · one wrong answer", "War Stufe 3 · eine falsche Antwort")}</Txt>
            <rect x="12" y="76" width="214" height="34" rx="4" fill="#FFFFFF" stroke={DARK} />
            <Txt x={18} y={88} size={7} fill="#333333">{tt("Difficulty lowered: you missed 3 of 4", "Schwierigkeit gesenkt: Sie haben 3 von 4")}</Txt>
            <Txt x={18} y={98} size={7} fill="#333333">{tt("questions on pricing.", "Fragen zur Preisgestaltung verfehlt.")}</Txt>
            <rect x="166" y="94" width="56" height="12" rx="3" fill={DARK} />
            <Txt x={194} y={103} size={6.6} anchor="middle" fill="#FFFFFF">{tt("Change back", "Zurückstellen")}</Txt>
            <Marker x={216} y={60} n={5} />
            <Marker x={216} y={84} n={6} />
          </>
        )}
        {kind === "settings" && (
          <>
            <Txt x={12} y={30} size={9} bold>{tt("Settings", "Einstellungen")}</Txt>
            <rect x="12" y="38" width="214" height="22" rx="11" fill={LITE} />
            <rect x="14" y="40" width="102" height="18" rx="9" fill="#FFFFFF" stroke={DARK} />
            <Txt x={65} y={52} size={6.8} anchor="middle" bold>{tt("AdaptLearn decides", "AdaptLearn entscheidet")}</Txt>
            <Txt x={170} y={52} size={6.8} anchor="middle">{tt("I choose my path", "Ich wähle meinen Pfad")}</Txt>
            <Txt x={12} y={78} size={7.6} bold>{tt("Three start questions", "Drei Startfragen")}</Txt>
            {[tt("Your goal", "Ihr Ziel"), tt("Your prior knowledge", "Ihr Vorwissen"), tt("Time per week", "Zeit pro Woche")].map((s, i) => (
              <g key={i}>
                <rect x="12" y={84 + i * 16} width="170" height="12" rx="2" fill="#FFFFFF" stroke={MID} />
                <Txt x={18} y={93} size={6.8}>{s}</Txt>
              </g>
            ))}
            <Txt x={190} y={93} size={6.6} fill="#555555">{tt("Edit later", "Später ändern")}</Txt>
            <Marker x={216} y={46} n={7} />
            <Marker x={216} y={112} n={8} />
          </>
        )}
      </Frame>
    </Svg>
  );
}

/* ------------------------------------------------------------------ A1 · the same course for all, an adapted one, an adapted one with no reason */

export type PathKind = "same" | "adapted" | "silent";

export function PathMock({ kind }: { kind: PathKind }) {
  const lessons = [tt("Basics", "Grundlagen"), tt("Pricing", "Preisgestaltung"), tt("Anchoring", "Anker"), tt("Closing", "Abschluss")];
  const state = kind === "same" ? ["ok", "ok", "ok", "ok"] : ["skip", "ok", "extra", "ok"];
  return (
    <Svg
      viewBox="0 0 240 130"
      label={
        kind === "same"
          ? tt("Ravi gets the same four lessons as everyone, including one he already knows", "Ravi bekommt dieselben vier Lektionen wie alle, darunter eine, die er schon kennt")
          : kind === "adapted"
            ? tt("Ravi's path skips what he knows, adds a practice lesson, and says why", "Ravis Pfad überspringt, was er kann, ergänzt eine Übungslektion und sagt, warum")
            : tt("Ravi's path changes in the same way but with no explanation", "Ravis Pfad ändert sich ebenso, aber ohne Erklärung")
      }
    >
      <rect x="1" y="1" width="238" height="128" rx="5" fill="#F6F6F6" stroke={MID} />
      <Person x={26} y={40} s={0.9} />
      {lessons.map((l, i) => (
        <g key={i}>
          <rect x={60 + (i % 2) * 90} y={14 + Math.floor(i / 2) * 36} width="82" height="28" rx="4" fill={state[i] === "skip" ? "#FFFFFF" : "#FFFFFF"} stroke={DARK} strokeWidth="1.4" strokeDasharray={state[i] === "skip" ? "4 3" : undefined} opacity={state[i] === "skip" ? 0.55 : 1} />
          <Txt x={101 + (i % 2) * 90} y={32 + Math.floor(i / 2) * 36} size={8} anchor="middle">{state[i] === "extra" ? tt("Practice: anchoring", "Übung: Anker") : l}</Txt>
        </g>
      ))}
      {kind === "adapted" && <Txt x={12} y={108} size={7.4} bold>{tt("“You know the basics, so we skipped them. You missed anchoring, so here is practice.”", "„Sie kennen die Grundlagen, wir haben sie übersprungen. Sie haben Anker verfehlt, hier ist Übung.“")}</Txt>}
      {kind === "silent" && <Txt x={12} y={108} size={7.4} fill="#777777">{tt("(the path is different, and nothing says why)", "(der Pfad ist anders, und nichts sagt, warum)")}</Txt>}
      {kind === "same" && <Txt x={12} y={108} size={7.4} fill="#777777">{tt("(the same for everyone, including the basics Ravi already knows)", "(für alle gleich, auch die Grundlagen, die Ravi schon kennt)")}</Txt>}
    </Svg>
  );
}

/* ------------------------------------------------------------------ A2 · rules, a model, too little data */

export type TechKind = "rules" | "model" | "thin";

export function TechMock({ kind }: { kind: TechKind }) {
  return (
    <Svg
      viewBox="0 0 240 130"
      label={
        kind === "rules"
          ? tt("Two if-then rules: if the test is passed, skip the lesson; if it is failed, repeat it", "Zwei Wenn-dann-Regeln: Wenn der Test bestanden ist, die Lektion überspringen; wenn nicht, sie wiederholen")
          : kind === "model"
            ? tt("Lots of learner data goes into a closed box, and a next lesson comes out with no reason", "Viele Lernendendaten gehen in eine geschlossene Box, und eine nächste Lektion kommt ohne Grund heraus")
            : tt("A closed box with only a dozen data points: too little to learn from", "Eine geschlossene Box mit nur einem Dutzend Datenpunkten: zu wenig zum Lernen")
      }
    >
      <rect x="1" y="1" width="238" height="128" rx="5" fill="#F6F6F6" stroke={MID} />
      {kind === "rules" && (
        <>
          <rect x="12" y="16" width="216" height="40" rx="4" fill="#FFFFFF" stroke={DARK} />
          <Txt x={20} y={32} size={8}>{tt("IF test passed", "WENN Test bestanden")}</Txt>
          <Arrow x1={96} y1={29} x2={124} y2={29} />
          <Txt x={130} y={32} size={8} bold>{tt("THEN skip the lesson", "DANN Lektion überspringen")}</Txt>
          <Txt x={20} y={48} size={8}>{tt("IF test failed", "WENN Test verfehlt")}</Txt>
          <Arrow x1={96} y1={45} x2={124} y2={45} />
          <Txt x={130} y={48} size={8} bold>{tt("THEN repeat it", "DANN wiederholen")}</Txt>
          <Txt x={12} y={84} size={7.6}>{tt("Few data needed. The learner can be told the rule.", "Wenige Daten nötig. Der Lernenden lässt sich die Regel nennen.")}</Txt>
        </>
      )}
      {(kind === "model" || kind === "thin") && (
        <>
          {Array.from({ length: kind === "model" ? 40 : 12 }, (_, i) => (
            <circle key={i} cx={16 + (i % 8) * 9} cy={22 + Math.floor(i / 8) * 11 + (kind === "thin" ? 12 : 0)} r="2.6" fill={DARK} />
          ))}
          <Arrow x1={92} y1={56} x2={112} y2={56} />
          <rect x="116" y="30" width="54" height="52" rx="6" fill={DARK} />
          <Txt x={143} y={60} size={14} anchor="middle" bold fill="#FFFFFF">?</Txt>
          <Arrow x1={172} y1={56} x2={194} y2={56} />
          <rect x="196" y="44" width="34" height="24" rx="3" fill="#FFFFFF" stroke={DARK} />
          <Txt x={213} y={59} size={6.6} anchor="middle">{tt("Lesson 7", "Lektion 7")}</Txt>
          <Txt x={12} y={104} size={7.6}>{kind === "model" ? tt("Needs a lot of good data. The reason cannot be stated.", "Braucht viele gute Daten. Der Grund lässt sich nicht nennen.") : tt("Too few examples to learn from, so it guesses.", "Zu wenige Beispiele zum Lernen, also rät es.")}</Txt>
        </>
      )}
    </Svg>
  );
}

/* ------------------------------------------------------------------ A3 · a path screen that gains four personalisation patterns */

export type PatternOn = { reco: boolean; difficulty: boolean; path: boolean; feedback: boolean };

export function PatternMock({ on }: { on: PatternOn }) {
  const n = [on.reco, on.difficulty, on.path, on.feedback].filter(Boolean).length;
  return (
    <Svg viewBox="0 0 240 150" label={tt(`A path screen with ${n} of 4 personalisation patterns switched on: a recommendation, adaptive difficulty, a dynamic path and behaviour-based feedback`, `Ein Pfadbildschirm mit ${n} von 4 eingeschalteten Personalisierungsmustern: eine Empfehlung, adaptive Schwierigkeit, ein dynamischer Pfad und verhaltensbasiertes Feedback`)}>
      <rect x="1" y="1" width="238" height="148" rx="5" fill="#F6F6F6" stroke={MID} />
      <Txt x={12} y={18} size={8.5} bold>{tt("Your learning path", "Ihr Lernpfad")}</Txt>
      {on.path ? (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              {i > 0 && <line x1={28 + (i - 1) * 54} y1="40" x2={28 + i * 54} y2="40" stroke={DARK} strokeWidth="1.6" />}
              <circle cx={28 + i * 54} cy="40" r="9" fill={i === 1 ? DARK : "#FFFFFF"} stroke={DARK} strokeWidth="1.5" strokeDasharray={i === 2 ? "3 2" : undefined} />
            </g>
          ))}
          <Txt x={82} y={62} size={6.6} anchor="middle">{tt("added for you", "für Sie ergänzt")}</Txt>
        </g>
      ) : (
        <Lines x={12} y={30} n={4} w={216} gap={9} fill="#C4C4C4" />
      )}
      {on.reco && (
        <g>
          <rect x="12" y="72" width="104" height="24" rx="4" fill="#FFFFFF" stroke={DARK} />
          <Txt x={18} y={84} size={7} bold>{tt("Next: Anchoring", "Weiter: Anker")}</Txt>
          <Txt x={18} y={92} size={6} fill="#555555">{tt("because you missed 2 of 3", "weil Sie 2 von 3 verfehlt haben")}</Txt>
        </g>
      )}
      {on.difficulty && (
        <g>
          <rect x="124" y="72" width="104" height="24" rx="4" fill="#FFFFFF" stroke={DARK} />
          <Txt x={130} y={84} size={7} bold>{tt("Level 2 of 4", "Stufe 2 von 4")}</Txt>
          <Txt x={130} y={92} size={6} fill="#555555">{tt("Too easy? Raise it", "Zu leicht? Anheben")}</Txt>
        </g>
      )}
      {on.feedback && (
        <g>
          <rect x="12" y="104" width="216" height="32" rx="4" fill="#FFFFFF" stroke={DARK} />
          <Txt x={18} y={118} size={7}>{tt("You finished unit 2 faster than usual.", "Sie haben Einheit 2 schneller als üblich beendet.")}</Txt>
          <Txt x={18} y={129} size={7} bold>{tt("Next: a harder practice task.", "Weiter: eine schwerere Übungsaufgabe.")}</Txt>
        </g>
      )}
    </Svg>
  );
}

/* ------------------------------------------------------------------ A4 · opportunities and risks, static */

export function OppRiskMock() {
  return (
    <Svg viewBox="0 0 240 120" label={tt("Opportunities on the left: efficiency, motivation and learning success; risks on the right: opacity, over-adaptation and a wrong data basis", "Chancen links: Effizienz, Motivation und Lernerfolg; Risiken rechts: Undurchsichtigkeit, Überanpassung und falsche Datenbasis")}>
      <rect x="4" y="4" width="112" height="112" rx="5" fill="#F6F6F6" stroke={MID} />
      <rect x="124" y="4" width="112" height="112" rx="5" fill="#F6F6F6" stroke={MID} strokeDasharray="5 4" />
      <Txt x={60} y={20} size={8.4} anchor="middle" bold>{tt("Opportunities", "Chancen")}</Txt>
      <Txt x={180} y={20} size={8.4} anchor="middle" bold>{tt("Risks", "Risiken")}</Txt>
      {[tt("Efficiency", "Effizienz"), tt("Motivation", "Motivation"), tt("Learning success", "Lernerfolg")].map((s, i) => (
        <g key={i}>
          <rect x="14" y={32 + i * 26} width="92" height="20" rx="3" fill="#FFFFFF" stroke={DARK} />
          <Txt x={60} y={45 + i * 26} size={7.8} anchor="middle">{s}</Txt>
        </g>
      ))}
      {[tt("Opacity", "Undurchsichtigkeit"), tt("Over-adaptation", "Überanpassung"), tt("Wrong data basis", "Falsche Datenbasis")].map((s, i) => (
        <g key={i}>
          <rect x="134" y={32 + i * 26} width="92" height="20" rx="3" fill="#FFFFFF" stroke={DARK} strokeDasharray="4 3" />
          <Txt x={180} y={45 + i * 26} size={7.6} anchor="middle">{s}</Txt>
        </g>
      ))}
    </Svg>
  );
}

/* ------------------------------------------------------------------ thumbnails for measures, options and decisions */

export type ThumbKind = "explain" | "rules" | "structure" | "feedback" | "control" | "ai" | "variants" | "dense" | "reward" | "standard" | "gamify" | "evidence" | "prize" | "silent" | "questions";

export function MeasureThumb({ kind }: { kind: ThumbKind }) {
  const label: Record<ThumbKind, string> = {
    explain: tt("A change with its reason and an undo button", "Eine Änderung mit ihrem Grund und einem Rückgängig-Button"),
    rules: tt("Two if-then rules", "Zwei Wenn-dann-Regeln"),
    structure: tt("One path in a fixed order, adapted parts marked", "Ein Pfad in fester Reihenfolge, angepasste Teile gekennzeichnet"),
    feedback: tt("A note after a unit with the next step", "Ein Hinweis nach einer Einheit mit dem nächsten Schritt"),
    control: tt("A switch: the system decides or I choose", "Ein Schalter: das System entscheidet oder ich wähle"),
    ai: tt("A closed box with data going in", "Eine geschlossene Box, in die Daten fließen"),
    variants: tt("One lesson in five variants", "Eine Lektion in fünf Varianten"),
    dense: tt("A wall of twenty figures", "Eine Wand aus zwanzig Zahlen"),
    reward: tt("Badges for following the system", "Abzeichen fürs Befolgen des Systems"),
    standard: tt("The same four lessons for everyone", "Dieselben vier Lektionen für alle"),
    gamify: tt("A goal bar toward the learner's own goal", "Ein Zielbalken auf das eigene Ziel der Lernenden hin"),
    evidence: tt("A prototype tested with a few learners", "Ein Prototyp, mit wenigen Lernenden getestet"),
    prize: tt("A ranking with prizes", "Eine Rangliste mit Preisen"),
    silent: tt("A path that changes silently", "Ein Pfad, der sich still ändert"),
    questions: tt("Three start questions", "Drei Startfragen"),
  };
  return (
    <Thumb label={label[kind]}>
      {kind === "explain" && (
        <>
          <rect x="14" y="20" width="172" height="40" rx="5" fill="#FFFFFF" stroke={DARK} />
          <Lines x={22} y={30} n={2} w={156} gap={9} fill={MID} />
          <rect x="110" y="68" width="76" height="22" rx="4" fill={DARK} />
          <Txt x={148} y={83} size={8.6} anchor="middle" fill="#FFFFFF">{tt("Undo", "Rückgängig")}</Txt>
        </>
      )}
      {kind === "rules" && (
        <>
          <Txt x={14} y={36} size={9}>{tt("IF passed → skip", "WENN bestanden → überspringen")}</Txt>
          <Txt x={14} y={62} size={9}>{tt("IF failed → repeat", "WENN verfehlt → wiederholen")}</Txt>
        </>
      )}
      {kind === "structure" && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="14" y={14 + i * 22} width="172" height="16" rx="3" fill={LITE} stroke={i === 2 ? DARK : "none"} strokeDasharray={i === 2 ? "4 3" : undefined} />
          ))}
        </>
      )}
      {kind === "feedback" && (
        <>
          <rect x="14" y="22" width="172" height="34" rx="5" fill="#FFFFFF" stroke={DARK} />
          <Lines x={22} y={32} n={2} w={156} gap={9} fill={MID} />
          <rect x="100" y="68" width="86" height="22" rx="4" fill={DARK} />
          <Txt x={143} y={83} size={8.6} anchor="middle" fill="#FFFFFF">{tt("Next ▶", "Weiter ▶")}</Txt>
        </>
      )}
      {kind === "control" && (
        <>
          <rect x="30" y="38" width="140" height="28" rx="14" fill={LITE} />
          <rect x="33" y="41" width="66" height="22" rx="11" fill="#FFFFFF" stroke={DARK} />
          <Txt x={66} y={56} size={7.4} anchor="middle" bold>{tt("System", "System")}</Txt>
          <Txt x={136} y={56} size={7.4} anchor="middle">{tt("Me", "Ich")}</Txt>
        </>
      )}
      {kind === "ai" && (
        <>
          {Array.from({ length: 12 }, (_, i) => (
            <circle key={i} cx={20 + (i % 4) * 9} cy={30 + Math.floor(i / 4) * 12} r="2.6" fill={DARK} />
          ))}
          <Arrow x1={62} y1={48} x2={82} y2={48} />
          <rect x="86" y="26" width="50" height="44" rx="6" fill={DARK} />
          <Txt x={111} y={53} size={14} anchor="middle" bold fill="#FFFFFF">?</Txt>
          <Arrow x1={140} y1={48} x2={160} y2={48} />
          <rect x="164" y="38" width="26" height="20" rx="3" fill="#FFFFFF" stroke={DARK} />
        </>
      )}
      {kind === "variants" && (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={20 + i * 34} y={30 + (i % 2) * 10} width="28" height="40" rx="3" fill="#FFFFFF" stroke={DARK} />
          ))}
        </>
      )}
      {kind === "dense" && (
        <>
          {Array.from({ length: 20 }, (_, i) => (
            <rect key={i} x={14 + (i % 5) * 36} y={14 + Math.floor(i / 5) * 22} width="30" height="16" rx="2" fill={LITE} stroke={DARK} strokeWidth="0.8" />
          ))}
        </>
      )}
      {kind === "reward" && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={36 + i * 42} cy="55" r="14" fill="#FFFFFF" stroke={DARK} strokeWidth="1.6" />
          ))}
        </>
      )}
      {kind === "standard" && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="14" y={14 + i * 22} width="172" height="16" rx="3" fill={LITE} />
          ))}
          <Person x={170} y={50} s={0.5} />
        </>
      )}
      {kind === "gamify" && (
        <>
          <Txt x={14} y={30} size={9} bold>{tt("My goal: apply it at work", "Mein Ziel: bei der Arbeit anwenden")}</Txt>
          <rect x="14" y="40" width="172" height="12" rx="6" fill={LITE} />
          <rect x="14" y="40" width="96" height="12" rx="6" fill={DARK} />
        </>
      )}
      {kind === "evidence" && (
        <>
          <Person x={52} y={34} s={0.8} />
          <Person x={100} y={34} s={0.8} />
          <Person x={148} y={34} s={0.8} />
          <rect x="46" y="76" width="108" height="18" rx="3" fill="#FFFFFF" stroke={DARK} strokeDasharray="4 3" />
        </>
      )}
      {kind === "prize" && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="14" y={14 + i * 22} width="172" height="16" rx="3" fill={i < 3 ? LITE : "#FFFFFF"} stroke={i < 3 ? "none" : DARK} />
          ))}
          <Txt x={178} y={26} size={8} anchor="end" bold fill={AMBER}>{tt("Prize", "Preis")}</Txt>
        </>
      )}
      {kind === "silent" && (
        <>
          {[0, 1, 2].map((i) => (
            <rect key={i} x="14" y={20 + i * 24} width="172" height="16" rx="3" fill={LITE} opacity={i === 1 ? 0.35 : 1} />
          ))}
          <Txt x={100} y={100} size={9} anchor="middle" fill="#777777">{tt("no notice", "kein Hinweis")}</Txt>
        </>
      )}
      {kind === "questions" && (
        <>
          {[0, 1, 2].map((i) => (
            <rect key={i} x="14" y={18 + i * 26} width="172" height="18" rx="3" fill="#FFFFFF" stroke={DARK} />
          ))}
        </>
      )}
    </Thumb>
  );
}
