import type { Blk, Item, PlatformCfg } from "@/components/sim/PlatformSim";
import { lessonKeys } from "@/components/sim/platformKit";
import { coursePageOf, footerOf, richLessonPages, shellNav, shellPages } from "@/components/sim/courseKit";
import { LESSON_TEXTS } from "@/components/sim/lessonText";
import { tt } from "@/lib/lang";

/**
 * Day 12 · the two platforms of Block 1.1 (A where all users receive identical content, B where the content adapts to progress and mistakes), AdaptLearn as it is (a complex
 * adaptive system whose changes users do not understand) and the three options of Block 1.2 as the same platform after each measure (DL-STANDARD v1.8). Every menu entry,
 * lesson and button opens a real page. The course page, the lessons, the catalogue, the help and the account read like a real platform (`courseKit.ts`), the same in every
 * version, so only the way the path adapts differs. Nothing here is marked right or wrong, and no figure is printed that the plan does not print.
 */
const COURSE = () => tt("Negotiation basics", "Verhandlungsgrundlagen");
const N = 5;
const titles = () => LESSON_TEXTS().map((l) => l.title);
const TASK = () => tt("Task: write your limit for the example offer.", "Aufgabe: Schreiben Sie Ihre Grenze für das Beispielangebot.");
const FINISH = () => tt("Finish task", "Aufgabe beenden");
const back = (go: string, label?: string): Blk => ({ t: "links", items: [{ label: label ?? tt("Back to the course", "Zurück zum Kurs"), go }] });
const plainLinks = (): Blk => ({ t: "links", items: titles().slice(0, N).map((l, i) => ({ label: `${i + 1}. ${l}`, go: `lesson${i}` })) });

/** Platform A · all users receive identical content: the same lessons in the same order, whatever they did. */
export const platformA = (): PlatformCfg => ({
  name: "Platform A",
  start: "course",
  color: "#6B7380",
  nav: [{ label: tt("Course", "Kurs"), go: "course" }, ...shellNav()],
  footer: footerOf("Platform A"),
  pages: {
    ...shellPages({}),
    course: coursePageOf({}, N, [{ t: "p", text: tt("The same five lessons in the same order for everyone.", "Dieselben fünf Lektionen in derselben Reihenfolge für alle.") }, plainLinks()]),
    ...richLessonPages(N, { back: "course", extra: () => [{ t: "finish", task: TASK(), label: FINISH(), feedback: [tt("Saved. Next: the next lesson in the list.", "Gespeichert. Als Nächstes: die nächste Lektion der Liste.")] }] }),
  },
});

/** Platform B · the content adapts to progress and mistakes: a gap found in a task adds a step to the path. */
export const platformB = (): PlatformCfg => {
  const lp = richLessonPages(N, {
    back: "course",
    extra: (i) => [
      { t: "quiz", q: tt("What does a limit tell you?", "Was sagt Ihnen eine Grenze?"), options: [tt("When to walk away", "Wann Sie gehen"), tt("Nothing", "Nichts")], right: 0, why: tt("A limit is the point beyond which you would rather walk away.", "Eine Grenze ist der Punkt, ab dem Sie lieber gehen.") },
      { t: "finish", task: TASK(), label: FINISH(), key: `done${i}`, feedback: [tt("Your answer shows a gap on limits. An extra step was added to your path.", "Ihre Antwort zeigt eine Lücke bei Grenzen. Ihrem Pfad wurde ein zusätzlicher Schritt hinzugefügt."), tt("Next: practice on limits.", "Als Nächstes: Übung zu Grenzen.")] },
    ],
  });
  return {
    name: "Platform B",
    start: "course",
    color: "#4A4458",
    nav: [{ label: tt("Course", "Kurs"), go: "course" }, { label: tt("My path", "Mein Pfad"), go: "path" }, ...shellNav()],
    footer: footerOf("Platform B"),
    pages: {
      ...shellPages({}),
      course: coursePageOf({}, N, [{ t: "p", text: tt("Your lessons follow what you know and what you get wrong.", "Ihre Lektionen folgen dem, was Sie wissen und was Sie falsch haben.") }, { t: "progress", label: tt("Tasks done", "Erledigte Aufgaben"), of: lessonKeys(N, "done") }, plainLinks()]),
      path: { title: tt("My path", "Mein Pfad"), crumb: tt("My path", "Mein Pfad"), blocks: [{ t: "h", text: tt("My path", "Mein Pfad") }, { t: "p", text: tt("Changed for you after your last answers:", "Für Sie geändert nach Ihren letzten Antworten:") }, { t: "list", items: [tt("Lesson 2: skipped, you knew it", "Lektion 2: übersprungen, Sie kannten sie"), tt("Practice on limits: added after two mistakes", "Übung zu Grenzen: nach zwei Fehlern ergänzt"), tt("Lesson 3: next", "Lektion 3: als Nächstes")] }, { t: "links", items: [{ label: tt("Practice on limits", "Übung zu Grenzen"), go: "lesson2" }, { label: tt("Back to the course", "Zurück zum Kurs"), go: "course" }] }] },
      ...lp,
    },
  };
};

const feed = (n: number): Blk => ({ t: "p", text: tt(`Your path was updated ${n} times today.`, `Ihr Pfad wurde heute ${n}-mal aktualisiert.`), size: 12 });

/** AdaptLearn today: many signals decide the next lesson, the difficulty and the order, and nothing says why. */
export const today = (): PlatformCfg => {
  const lp = richLessonPages(N, { back: "path", extra: () => [{ t: "finish", task: TASK(), label: FINISH(), feedback: [tt("Your path was updated.", "Ihr Pfad wurde aktualisiert.")] }] });
  return {
    name: "AdaptLearn",
    start: "path",
    color: "#7A4DE8",
    nav: [{ label: tt("My path", "Mein Pfad"), go: "path" }, { label: tt("Updates", "Aktualisierungen"), go: "updates" }, { label: tt("Learner model", "Lernermodell"), go: "model" }, { label: tt("Settings", "Einstellungen"), go: "settings" }, ...shellNav()],
    footer: footerOf("AdaptLearn"),
    pages: {
      ...shellPages({}),
      course: coursePageOf({}, N, [{ t: "links", items: [{ label: tt("Open my path", "Meinen Pfad öffnen"), go: "path" }] }], "path"),
      path: { title: tt("My path", "Mein Pfad"), blocks: [{ t: "h", text: tt("My path", "Mein Pfad") }, feed(4), { t: "links", items: titles().slice(0, N).map((l, i) => ({ label: `${i + 1}. ${l}`, go: `lesson${i}`, sub: i === 1 ? tt("moved", "verschoben") : i === 3 ? tt("harder", "schwerer") : i === 4 ? tt("hidden", "ausgeblendet") : undefined })) }] },
      updates: { title: tt("Updates", "Aktualisierungen"), crumb: tt("Updates", "Aktualisierungen"), blocks: [{ t: "h", text: tt("Updates to your path", "Aktualisierungen Ihres Pfads") }, { t: "list", items: [tt("Lesson 2 was moved.", "Lektion 2 wurde verschoben."), tt("The difficulty of lesson 4 was raised.", "Die Schwierigkeit von Lektion 4 wurde erhöht."), tt("Lesson 5 was hidden.", "Lektion 5 wurde ausgeblendet."), tt("A new unit was added.", "Eine neue Einheit wurde ergänzt.")] }, { t: "links", items: [{ label: tt("Back to my path", "Zurück zu meinem Pfad"), go: "path" }] }] },
      model: { title: tt("Learner model", "Lernermodell"), crumb: tt("Learner model", "Lernermodell"), blocks: [{ t: "h", text: tt("Your learner model", "Ihr Lernermodell") }, { t: "table", head: [tt("Signal", "Signal"), tt("Value", "Wert")], rows: [[tt("Pace", "Tempo"), tt("0.82", "0,82")], [tt("Error pattern", "Fehlermuster"), tt("cluster 3", "Cluster 3")], [tt("Engagement score", "Engagement-Wert"), tt("0.61", "0,61")], [tt("Predicted next topic", "Vorhergesagtes nächstes Thema"), tt("unit 7", "Einheit 7")]] }, { t: "links", items: [{ label: tt("Back to my path", "Zurück zu meinem Pfad"), go: "path" }] }] },
      settings: { title: tt("Settings", "Einstellungen"), crumb: tt("Settings", "Einstellungen"), blocks: [{ t: "h", text: tt("Settings", "Einstellungen") }, { t: "tabs", tabs: [{ label: tt("Signals", "Signale"), fields: [tt("Pace weight", "Tempo-Gewicht"), tt("Error weight", "Fehler-Gewicht"), tt("Recency weight", "Aktualitäts-Gewicht"), tt("Engagement weight", "Engagement-Gewicht")] }, { label: tt("Difficulty", "Schwierigkeit"), fields: [tt("Ramp speed", "Anstiegstempo"), tt("Floor", "Untergrenze")] }], button: tt("Save", "Speichern"), msg: tt("Saved.", "Gespeichert.") }, { t: "links", items: [{ label: tt("Back to my path", "Zurück zu meinem Pfad"), go: "path" }] }] },
      ...lp,
    },
  };
};

/** Option A · standardised learning paths: everyone gets the same path; nothing adapts. */
export const optionA = (): PlatformCfg => ({
  name: "Platform",
  start: "course",
  color: "#4A4458",
  nav: [{ label: tt("Course", "Kurs"), go: "course" }, ...shellNav()],
  footer: footerOf("AdaptLearn"),
  pages: {
    ...shellPages({}),
    course: coursePageOf({}, N, [{ t: "p", text: tt("One path for every learner: five lessons in a fixed order.", "Ein Pfad für alle Lernenden: fünf Lektionen in fester Reihenfolge.") }, plainLinks()]),
    ...richLessonPages(N, { back: "course", extra: () => [{ t: "finish", task: TASK(), label: FINISH(), feedback: [tt("Saved. Next: the next lesson in the list.", "Gespeichert. Als Nächstes: die nächste Lektion der Liste.")] }] }),
  },
});

/** Option B · simple personalisation, rule-based: three visible rules change the path, and the platform says which one fired. */
export const optionB = (): PlatformCfg => {
  const lp = richLessonPages(N, { back: "course", extra: (i) => [{ t: "finish", task: TASK(), label: FINISH(), key: `done${i}`, feedback: [tt("Rule 1 applied: you missed two questions on limits, so “Practice on limits” was added.", "Regel 1 angewendet: Sie haben zwei Fragen zu Grenzen verfehlt, also wurde „Übung zu Grenzen“ ergänzt."), tt("You can undo it on your path page.", "Sie können es auf Ihrer Pfadseite rückgängig machen.")] }] });
  return {
    name: "Platform",
    start: "course",
    color: "#4A4458",
    nav: [{ label: tt("Course", "Kurs"), go: "course" }, { label: tt("My path", "Mein Pfad"), go: "path" }, { label: tt("The rules", "Die Regeln"), go: "rules" }, ...shellNav()],
    footer: footerOf("AdaptLearn"),
    pages: {
      ...shellPages({}),
      course: coursePageOf({}, N, [{ t: "p", text: tt("Your path follows three simple rules, and the platform tells you which one it used.", "Ihr Pfad folgt drei einfachen Regeln, und die Plattform sagt Ihnen, welche sie angewendet hat.") }, plainLinks()]),
      path: { title: tt("My path", "Mein Pfad"), crumb: tt("My path", "Mein Pfad"), blocks: [{ t: "h", text: tt("My path", "Mein Pfad") }, { t: "list", items: [tt("Lesson 2: skipped (rule 2: you passed the check)", "Lektion 2: übersprungen (Regel 2: Sie haben den Check bestanden)"), tt("Practice on limits: added (rule 1: two mistakes)", "Übung zu Grenzen: ergänzt (Regel 1: zwei Fehler)"), tt("Lesson 3: next", "Lektion 3: als Nächstes")] }, { t: "links", items: [{ label: tt("Undo: remove the practice", "Rückgängig: die Übung entfernen"), go: "course" }, { label: tt("The rules", "Die Regeln"), go: "rules" }] }] },
      rules: { title: tt("The rules", "Die Regeln"), crumb: tt("The rules", "Die Regeln"), blocks: [{ t: "h", text: tt("The three rules", "Die drei Regeln") }, { t: "table", head: [tt("Rule", "Regel"), tt("What it does", "Was sie tut")], rows: [["1", tt("After two mistakes on a topic, add practice on it.", "Nach zwei Fehlern zu einem Thema eine Übung dazu ergänzen.")], ["2", tt("After a perfect check, skip the next lesson on the topic.", "Nach einem perfekten Check die nächste Lektion zum Thema überspringen.")], ["3", tt("After a week without a visit, repeat the last lesson.", "Nach einer Woche ohne Besuch die letzte Lektion wiederholen.")]] }, { t: "links", items: [{ label: tt("Back to the course", "Zurück zum Kurs"), go: "course" }] }] },
      ...lp,
    },
  };
};

/** Option C · a complex AI-based system: a model recommends the next lesson from many signals; the learner sees a recommendation and a score, and no reason. */
export const optionC = (): PlatformCfg => {
  const lp = richLessonPages(N, { back: "course", extra: () => [{ t: "finish", task: TASK(), label: FINISH(), feedback: [tt("The model updated your profile.", "Das Modell hat Ihr Profil aktualisiert."), tt("Recommended for you: unit 7.", "Für Sie empfohlen: Einheit 7.")] }] });
  const items: Item[] = [{ label: tt("Unit 7 · recommended for you", "Einheit 7 · für Sie empfohlen"), go: "lesson4" }, { label: tt("Unit 3 · recommended for you", "Einheit 3 · für Sie empfohlen"), go: "lesson2" }];
  return {
    name: "Platform",
    start: "course",
    color: "#4A4458",
    nav: [{ label: tt("Course", "Kurs"), go: "course" }, { label: tt("For you", "Für Sie"), go: "foryou" }, { label: tt("My profile", "Mein Profil"), go: "profile" }, ...shellNav()],
    footer: footerOf("AdaptLearn"),
    pages: {
      ...shellPages({}),
      course: coursePageOf({}, N, [{ t: "p", text: tt("A model chooses your next lesson from many signals about how you learn.", "Ein Modell wählt Ihre nächste Lektion aus vielen Signalen darüber, wie Sie lernen.") }, plainLinks()]),
      foryou: { title: tt("For you", "Für Sie"), crumb: tt("For you", "Für Sie"), blocks: [{ t: "h", text: tt("Recommended for you", "Für Sie empfohlen") }, { t: "links", items }, { t: "p", text: tt("Match score: 0.87", "Übereinstimmung: 0,87"), size: 12 }, { t: "links", items: [{ label: tt("Back to the course", "Zurück zum Kurs"), go: "course" }] }] },
      profile: { title: tt("My profile", "Mein Profil"), crumb: tt("My profile", "Mein Profil"), blocks: [{ t: "h", text: tt("My learner profile", "Mein Lernerprofil") }, { t: "table", head: [tt("Signal", "Signal"), tt("Value", "Wert")], rows: [[tt("Learning style score", "Lernstil-Wert"), tt("0.64", "0,64")], [tt("Predicted ability", "Vorhergesagte Fähigkeit"), tt("0.71", "0,71")], [tt("Engagement score", "Engagement-Wert"), tt("0.58", "0,58")]] }, { t: "links", items: [{ label: tt("Back to the course", "Zurück zum Kurs"), go: "course" }] }] },
      ...lp,
    },
  };
};

