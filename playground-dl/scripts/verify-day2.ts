/**
 * Day 2 verification (CLAUDE.md #10, #34, #38, #40): run with `npm run verify:day2`.
 * It checks the data and the logic that the screens rest on, in both languages: the key phrases sit inside their texts, the model answers
 * empty every missing list and complete every block, the model plan fits the printed limits, a different over-budget choice still exports,
 * the card minutes add up, and the plan's own printed figures are the ones on screen. It needs no browser.
 */
import { APPROACHES, BUDGET, FACTS, FACT_IDS, MODEL_APPROACH, MODEL_TESTS, MONTHS, OPTS, PRACTICES, PRACTICE_IDS, TESTS, TRUTH_SORT, WEAKS, WEAK_MODEL, WEEKS_LIMIT, effortBand, planCost, planWeeks } from "../data/day2/case";
import { INVS, MODEL_INVS, R2_BUDGET, invsCost } from "../data/day2/route2";
import { MATERIALS, MATERIAL_PLAIN } from "../data/day2/materials";
import { GLOSSARY, GLOSS_LOOKUP, GLOSS_LOOKUP_DE } from "../data/glossary";
import { optEffortWrong, sortHolds, weakHolds } from "../lib/day2/checks";
import { r1Missing, r2Missing } from "../lib/day2/missing";
import { KEY_D2_R1, KEY_D2_R2 } from "../lib/day2/mentorKey";
import { CORE_UNITS, dossierProgress, taskBlocks } from "../lib/day2/progress";
import { analysisBody, memoBody } from "../lib/day2/exportDoc";
import { MENTOR_PASSCODE } from "../lib/day1/mentorKey";
import { placeItem, redoSort, syncOrder, toggleCapped, undoSort } from "../lib/lists";
import { setCurrentLang } from "../lib/lang";
import { emptyD2, emptyD2R1, emptyD2R2, emptyD3 } from "../store/dayTypes";
import { mergeDefaults, migratePersisted } from "../store/useStore";
import type { Persisted } from "../store/useStore";

let failed = 0;
const ok = (cond: boolean, msg: string) => {
  if (!cond) {
    failed++;
    console.error("FAIL  " + msg);
  } else console.log("ok    " + msg);
};

const empty = (): Persisted => ({ participant: { name: "" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" }, d1: undefined, d2: emptyD2(), d3: emptyD3() }) as unknown as Persisted;
const withKey = (p: Persisted, r1 = KEY_D2_R1(), r2 = KEY_D2_R2()): Persisted => ({ ...p, participant: { name: "Test Person" }, d2: { r1: { ...p.d2.r1, ...r1 }, r2: { ...p.d2.r2, ...r2 } } }) as Persisted;

for (const lang of ["en", "de"] as const) {
  setCurrentLang(lang);
  console.log(`\n=== ${lang.toUpperCase()} ===`);

  // 1 · the eight facts: every key phrase is a piece of its own text; every practice is used
  ok(FACTS.length === 8 && FACTS.every((f) => f.text.includes(f.key)), "each fact's key phrase is inside its text");
  ok(PRACTICE_IDS.every((a) => FACTS.some((f) => f.practice === a)), "every practice is used by at least one fact");
  ok(PRACTICE_IDS.every((a) => PRACTICES[a].test.length > 10 && PRACTICES[a].hint.length > 5), "every practice has a hint and a test question");
  ok(FACTS.every((f) => f.clue.endsWith("?") && !f.clue.includes(PRACTICES[f.practice].label)), "no clue names the practice it points at");

  // 2 · the model sort and weaknesses hold on the set-level checks
  ok(sortHolds(TRUTH_SORT).holds === 8, "the model sort holds 8 of 8");
  ok(weakHolds(WEAK_MODEL).holds === 3 && WEAKS.length === 6, "the model weaknesses hold 3 of 3");

  // 3 · the effort rule and the model plan against the printed limits
  ok([effortBand(6500), effortBand(9999), effortBand(10000), effortBand(25000), effortBand(25001)].join() === "1,1,2,2,3", "effort bands: <€10,000 Low, ≤€25,000 Mid, above High");
  ok(OPTS.map((o) => effortBand(o.cost)).join() === "2,1,3", "Block 1.2: A is Mid, B is Low, C is High by the printed cost");
  const cost = planCost(MODEL_APPROACH, MODEL_TESTS);
  ok(cost <= BUDGET && cost === 29000, `the model approach and tests cost ${cost} ≤ ${BUDGET}`);
  ok(planWeeks(MODEL_APPROACH, MODEL_TESTS) <= WEEKS_LIMIT, "the longest model item fits the 12 weeks");
  ok(APPROACHES.length === 5 && TESTS.length === 7 && INVS.length === 7, "five approaches, seven tests, seven investments");
  ok(TESTS.filter((x) => MODEL_TESTS.includes(x.id)).some((x) => x.kind === "qual") && TESTS.filter((x) => MODEL_TESTS.includes(x.id)).some((x) => x.kind === "quant"), "the model tests mix a why test and a how-many test");
  ok(invsCost(MODEL_INVS) <= R2_BUDGET && invsCost(MODEL_INVS) === 95000, `the model investments cost ${invsCost(MODEL_INVS)} ≤ ${R2_BUDGET}`);

  // 4 · the plan's own printed figures (the rest are Case assumptions, labelled on screen)
  ok(MONTHS === 3 && WEEKS_LIMIT === 12 && BUDGET === 60000 && R2_BUDGET === 200000, "three months (12 weeks); €60,000 and €200,000 are the case's assumptions");

  // 5 · from empty: a named, finite missing list; after the model fill: nothing missing, every block complete
  const p0 = empty();
  const m1 = r1Missing(p0);
  const m2 = r2Missing(p0);
  ok(m1.length > 0 && m1.every((m) => m.label.length > 12 && m.id.length > 0), `Route 1 from empty names ${m1.length} concrete items`);
  ok(m2.length > 0 && m2.every((m) => m.label.length > 12), `Route 2 from empty names ${m2.length} concrete items`);
  ok(!m1.some((m) => /^Block (1\.2|1\.3|2\.1):/.test(m.label)), "an Optional block is never in the missing list");

  const p1 = withKey(p0);
  ok(r1Missing(p1).length === 0, "Route 1: the model answers leave nothing missing");
  ok(r2Missing(p1).length === 0, "Route 2: the model answers leave nothing missing");
  ok(optEffortWrong(p1.d2.r1).length === 0, "the model effort ratings of Block 1.2 follow the printed cost");
  const tb = taskBlocks(p1);
  ok(Object.values(tb).every(Boolean), "every task block is complete after the model fill");
  const prog1 = dossierProgress(p1, 1);
  const prog2 = dossierProgress(p1, 2);
  ok(prog1.total === 4 + CORE_UNITS[1].length && prog2.total === 3 + CORE_UNITS[2].length, "progress totals count Core cards and Core blocks only");

  // 6 · Core only (CLAUDE.md #35, #40): filling only the Core fields completes both routes
  const core = withKey(p0, { ...KEY_D2_R1(), optBenefit: {}, optEffort: {}, optRisk: {}, optChoice: null, optWhy: "", optRisks: [], optRiskOther: "", reflect: { a: "", b: "", c: "" }, weak: [], weakWhy: "" });
  ok(r1Missing(core).length === 0, "Route 1: the Core blocks alone leave nothing missing (Optional never required)");

  // 7 · a different, well-reasoned choice still exports (CLAUDE.md #38): the engine first, over budget and over time, with reasons
  const reason = "A different choice with a clear reason of my own here.";
  const other = { ...KEY_D2_R1(), approach: "p4" as const, approachWhy: reason, tests: ["t4", "t7", "t3"] as ("t4" | "t7" | "t3")[], testQ: { t4: reason, t7: reason, t3: reason }, adaptive: "yes" as const };
  const pOther = withKey(p0, other);
  ok(planCost("p4", ["t4", "t7", "t3"]) > BUDGET && planWeeks("p4", ["t4", "t7", "t3"]) > WEEKS_LIMIT, "the other plan is over budget and over time");
  ok(r1Missing(pOther).length === 0, "an over-budget plan with reasons still has nothing missing");
  ok(/over|darüber/.test(analysisBody(pOther)), "the export prints the over-budget amount as a fact");
  const otherInv = { ...KEY_D2_R2(), picks: ["i5", "i6", "i7"] as ("i5" | "i6" | "i7")[], order: ["i5", "i6", "i7"] as ("i5" | "i6" | "i7")[] };
  ok(r2Missing(withKey(p0, KEY_D2_R1(), otherInv)).length === 0 && invsCost(["i5", "i6", "i7"]) > R2_BUDGET, "an over-budget roadmap with a reason still has nothing missing");

  // 8 · the export bodies are built, in this language, and never print a key or a verdict
  const a = analysisBody(p1);
  const m = memoBody(p1);
  ok(a.includes("Test Person") && m.includes("Test Person"), "both documents carry the participant's name");
  ok(!/answer key|Musterlösung|expected/i.test(a + m), "no answer key text in an export");
  ok(!/[✓✗]/.test(a + m), "no tick or cross in an export");
  ok(analysisBody(p0).includes("—") && memoBody(p0).includes("—"), "empty documents still build");

  // 9 · every glossary term links in this language, and every entry has a German text
  ok(GLOSSARY.every((g) => g.match.length > 0 && !!g.plain), "every glossary entry has forms and an explanation");
  ok(GLOSSARY.every((g) => !!g.de && !!g.de.plain && g.de.match.length > 0), "every glossary entry has a German text");
  ok((lang === "en" ? GLOSS_LOOKUP : GLOSS_LOOKUP_DE).size > 60, "the glossary lookup has entries in this language");
}

setCurrentLang("en");
console.log("\n=== language-independent ===");
ok(MATERIALS.filter((x) => x.block === "A").reduce((s, x) => s + x.minutes, 0) === 60, "Materi A cards add up to 60 minutes");
ok(MATERIALS.filter((x) => x.block === "B").reduce((s, x) => s + x.minutes, 0) === 60, "Materi B cards add up to 60 minutes");
ok(MATERIALS.every((x) => !!MATERIAL_PLAIN[x.id].idea && !!MATERIAL_PLAIN[x.id].why && !!MATERIAL_PLAIN[x.id].picture), "every card has an In plain words box with all three parts");
ok(MATERIALS.filter((x) => x.optional).map((x) => x.id).join() === "A4", "only A4 is Optional");
ok(MENTOR_PASSCODE === "muchson123", "the mentor passcode is unchanged");

// the list helpers (CLAUDE.md #5, #9)
const s0 = emptyD2R1();
const s1 = { ...s0, ...placeItem<"path" | "units" | "feedback", typeof s0>(s0, "f1", "path") };
ok(s1.sort.f1 === "path" && s1.sortHistory.length === 1, "placing a fact records history");
const s2 = { ...s1, ...undoSort<"path" | "units" | "feedback", typeof s1>(s1) };
ok(s2.sort.f1 === null && s2.sortFuture.length === 1, "undo restores the tray");
const s3 = { ...s2, ...redoSort<"path" | "units" | "feedback", typeof s2>(s2) };
ok(s3.sort.f1 === "path", "redo places it again");
ok(toggleCapped(["a", "b", "c"], "d", 3).length === 3 && toggleCapped(["a", "b"], "c", 3).length === 3 && toggleCapped(["a", "b", "c"], "b", 3).length === 2, "toggleCapped stops at the cap and still removes");
ok(syncOrder(["b", "a"], ["a", "c"]).join() === "a,c", "syncOrder drops what is unchosen and appends what is new");

// the migration (CLAUDE.md #9): an old blob with Day 1 only gets empty Day 2 and Day 3 slices, and a partial slice is filled from the defaults
const old = { participant: { name: "Old" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" }, d1: { r1: {}, r2: {} } };
const migrated = migratePersisted(old, 1);
ok(!!migrated.d2 && !!migrated.d3 && migrated.participant.name === "Old", "an old blob migrates to the current shape with its name kept");
const partial = mergeDefaults(emptyD2R1(), { sort: { f1: "path" }, principles: ["only one"], approach: "p1" });
ok(partial.sort.f1 === "path" && partial.sort.f8 === null && partial.principles.length === 3 && partial.principles[1] === "" && partial.approach === "p1" && partial.testQ !== undefined, "a partial saved slice is filled from the defaults");
ok(mergeDefaults(emptyD2R2(), { picks: ["i1", "i2"], prototyping: 5 }).prototyping === "", "a value of the wrong type is dropped");

console.log(failed ? `\n${failed} check(s) FAILED` : "\nAll checks passed");
process.exit(failed ? 1 : 0);
