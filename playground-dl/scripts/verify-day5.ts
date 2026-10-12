/**
 * Day 5 verification (CLAUDE.md #10, #34, #38, #40): run with `npm run verify:day5`.
 * It checks the data and the logic that the screens rest on, in both languages: the key phrases sit inside their texts, the model answers
 * empty every missing list and complete every block, the plan's own four measures are over the printed budget and still export, a different
 * over-budget choice with reasons still exports, the card minutes add up, and the old blobs migrate. It needs no browser.
 */
import { BUDGET, CAUSES, CAUSE_MODEL, FACTS, FACT_IDS, MEASURES, MEASURE_BY_ID, MISTAKES, MISTAKE_IDS, MODEL_MEASURES, OPTS, PICK_CAUSES, PROBLEMS, PROBLEM_MODEL, TRUTH_SORT, WEEKS_LIMIT, effortBand, longestWeeks, totalCost } from "../data/day5/case";
import { DECISIONS, MODEL_DECISIONS, R2_BUDGET, decisionsCost } from "../data/day5/route2";
import { MATERIALS, MATERIAL_PLAIN } from "../data/day5/materials";
import { GLOSSARY, GLOSS_LOOKUP, GLOSS_LOOKUP_DE } from "../data/glossary";
import { REFERENCES } from "../data/references";
import { causeHolds, effortWrong, optEffortWrong, sortHolds } from "../lib/day5/checks";
import { r1Missing, r2Missing } from "../lib/day5/missing";
import { KEY_D5_R1, KEY_D5_R2 } from "../lib/day5/mentorKey";
import { CORE_UNITS, dossierProgress, taskBlocks } from "../lib/day5/progress";
import { analysisBody, memoBody } from "../lib/day5/exportDoc";
import { MENTOR_PASSCODE } from "../lib/day1/mentorKey";
import { setCurrentLang } from "../lib/lang";
import { emptyD2, emptyD3 } from "../store/dayTypes";
import { emptyD4, emptyD5, emptyD5R1 } from "../store/dayTypesStd";
import { migratePersisted } from "../store/useStore";
import type { Persisted, Score } from "../store/useStore";

let failed = 0;
const ok = (cond: boolean, msg: string) => {
  if (!cond) {
    failed++;
    console.error("FAIL  " + msg);
  } else console.log("ok    " + msg);
};

const empty = (): Persisted => ({ participant: { name: "" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" }, d1: undefined, d2: emptyD2(), d3: emptyD3(), d4: emptyD4(), d5: emptyD5() }) as unknown as Persisted;
const withKey = (p: Persisted, r1 = KEY_D5_R1(), r2 = KEY_D5_R2()): Persisted => ({ ...p, participant: { name: "Test Person" }, d5: { r1: { ...p.d5.r1, ...r1 }, r2: { ...p.d5.r2, ...r2 } } }) as Persisted;

for (const lang of ["en", "de"] as const) {
  setCurrentLang(lang);
  console.log(`\n=== ${lang.toUpperCase()} ===`);

  // 1 · the eight facts: every key phrase is a piece of its own text; the three mistakes are used 3, 2 and 3 times
  ok(FACTS.length === 8 && FACTS.every((f) => f.text.includes(f.key)), "each fact's key phrase is inside its text");
  ok(FACTS.filter((f) => f.area === "functions").length === 3 && FACTS.filter((f) => f.area === "complex").length === 2 && FACTS.filter((f) => f.area === "orientation").length === 3, "the mistakes are used by 3, 2 and 3 facts");
  ok(MISTAKE_IDS.every((a) => MISTAKES[a].test.length > 10 && MISTAKES[a].hint.length > 5), "every mistake has a hint and a test question");
  ok(FACTS.every((f) => f.clue.endsWith("?")), "every clue is a question");

  // 2 · the model sort and problems hold on the set-level checks
  ok(sortHolds(TRUTH_SORT).holds === 8, "the model sort holds 8 of 8");
  ok(causeHolds(CAUSE_MODEL).holds === 4 && CAUSES.length === 7 && CAUSE_MODEL.length === PICK_CAUSES && PROBLEM_MODEL.every((id) => PROBLEMS.find((p) => p.id === id)?.expected), "the model problems hold 4 of 4 and are the expected ones");
  ok(PROBLEMS.filter((p) => p.expected).length === 4 && PROBLEMS.filter((p) => p.expected).every((p) => !!p.error), "four expected problems, each with a design-error line for the key");

  // 3 · the effort rule and the plan's measures against the printed limits
  ok([effortBand(9999), effortBand(10000), effortBand(20000), effortBand(20001)].join() === "1,2,2,3", "effort bands: <€10,000 Low, ≤€20,000 Mid, above High");
  ok(OPTS.map((o) => effortBand(o.cost)).join() === "3,2,3", "Block 1.2: A is High, B is Mid, C is High by the printed cost (shown for the user; not a check)");
  const cost = totalCost(MODEL_MEASURES);
  ok(cost === 45000 && cost > BUDGET, `the plan's four measures cost ${cost}, €5,000 over the €${BUDGET} the case assumes (said in the key and the README)`);
  ok(longestWeeks(MODEL_MEASURES) <= WEEKS_LIMIT, "the longest model measure fits the 13 weeks");
  ok(MEASURES.length === 9 && DECISIONS.length === 7, "nine measures, seven decisions");
  ok(decisionsCost(MODEL_DECISIONS) <= R2_BUDGET && decisionsCost(MODEL_DECISIONS) === 110000, `the model decisions cost ${decisionsCost(MODEL_DECISIONS)} ≤ ${R2_BUDGET}`);

  // 4 · the case's own figures
  ok(WEEKS_LIMIT === 13 && BUDGET === 40000 && R2_BUDGET === 200000, "13 weeks, €40,000 and €200,000 are the case's assumptions (the plan says only “limited”)");

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
  ok(effortWrong(p1.d5.r1).length === 0 && optEffortWrong(p1.d5.r1).length === 0, "the model effort ratings follow the printed cost");
  const tb = taskBlocks(p1);
  ok(Object.values(tb).every(Boolean), "every task block is complete after the model fill");
  const prog1 = dossierProgress(p1, 1);
  const prog2 = dossierProgress(p1, 2);
  ok(prog1.total === 4 + CORE_UNITS[1].length && prog2.total === 3 + CORE_UNITS[2].length, "progress totals count Core cards and Core blocks only");

  // 6 · Core only (CLAUDE.md #35, #40): filling only the Core fields completes both routes
  const core = withKey(p0, { ...KEY_D5_R1(), optImpact: {}, optEffort: {}, optRisk: {}, optOrder: [], optWhy: "", reflect: { a: "", b: "", c: "" }, causes: [], causeWhy: "", errors: {} });
  ok(r1Missing(core).length === 0, "Route 1: the Core blocks alone leave nothing missing (Optional never required)");

  // 7 · a different, well-reasoned choice still exports (CLAUDE.md #38): a set that stays inside the budget, with reasons; and the plan's four over budget
  const reason = "A different choice with a clear reason of my own here.";
  const inside = ["m1", "m2", "m3", "m5"] as const;
  const other = {
    ...KEY_D5_R1(),
    chosen: [...inside],
    order: [...inside],
    impact: Object.fromEntries(inside.map((id) => [id, 2])) as Record<string, Score>,
    effort: Object.fromEntries(inside.map((id) => [id, effortBand(MEASURE_BY_ID[id].cost)])) as Record<string, Score>,
    risk: Object.fromEntries(inside.map((id) => [id, 1])) as Record<string, Score>,
    reasons: Object.fromEntries(inside.map((id) => [id, reason])),
  };
  const pOther = withKey(p0, other);
  ok(totalCost([...inside]) <= BUDGET, `the alternative set costs ${totalCost([...inside])}, inside the budget`);
  ok(r1Missing(pOther).length === 0, "a different set with reasons still has nothing missing");
  ok(/over|darüber/.test(analysisBody(p1)), "the export prints the over-budget amount of the plan's own four as a fact");
  const otherDec = { ...KEY_D5_R2(), picks: ["d2", "d6", "d7"] as ("d2" | "d6" | "d7")[], order: ["d2", "d6", "d7"] as ("d2" | "d6" | "d7")[], conflict: Object.fromEntries(["d2", "d6", "d7"].map((id) => [id, { user: "A line for the user here.", business: "A line for the business here.", lost: "A line about what is lost." }])) };
  ok(r2Missing(withKey(p0, KEY_D5_R1(), otherDec)).length === 0, "a different set of three decisions with a conflict row each still has nothing missing");

  // 8 · the export bodies are built, in this language, and never print a key or a verdict
  const a = analysisBody(p1);
  const m = memoBody(p1);
  ok(a.includes("Test Person") && m.includes("Test Person"), "both documents carry the participant's name");
  ok(!/answer key|Musterlösung|expected/i.test(a + m), "no answer key text in an export");
  ok(!/[✓✗]/.test(a + m), "no tick or cross in an export");
  ok(analysisBody(p0).includes("—") && memoBody(p0).includes("—"), "empty documents still build");

  // 9 · every glossary term links in this language; every reference exists
  ok(GLOSSARY.every((g) => g.match.length > 0 && !!g.plain), "every glossary entry has forms and an explanation");
  ok(GLOSSARY.every((g) => !!g.de && !!g.de.plain && g.de.match.length > 0), "every glossary entry has a German text");
  ok((lang === "en" ? GLOSS_LOOKUP : GLOSS_LOOKUP_DE).size > 60, "the glossary lookup has entries in this language");
  ok(["norman2013", "kano1984", "christensen2016", "beyer2017", "reichheld2003"].every((k) => !!(REFERENCES as Record<string, { full: string }>)[k]?.full), "the Day 5 references exist");
  ok((lang === "en" ? GLOSS_LOOKUP : GLOSS_LOOKUP_DE).has(lang === "en" ? "context of use" : "nutzungskontext"), "the context of use is a glossary link in this language");
  ok(FACT_IDS.length === 8, "eight fact ids");
}

setCurrentLang("en");
console.log("\n=== language-independent ===");
ok(MATERIALS.filter((x) => x.block === "A").reduce((s, x) => s + x.minutes, 0) === 60, "Materi A cards add up to 60 minutes");
ok(MATERIALS.filter((x) => x.block === "B").reduce((s, x) => s + x.minutes, 0) === 60, "Materi B cards add up to 60 minutes");
ok(MATERIALS.every((x) => !!MATERIAL_PLAIN[x.id].idea && !!MATERIAL_PLAIN[x.id].why && !!MATERIAL_PLAIN[x.id].picture), "every card has an In plain words box with all three parts");
ok(MATERIALS.filter((x) => x.optional).map((x) => x.id).join() === "A4", "only A4 is Optional");
ok(MENTOR_PASSCODE === "muchson123", "the mentor passcode is unchanged");

const migrated = migratePersisted({ participant: { name: "Old" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" }, d1: {} }, 1);
ok(!!migrated.d5 && migrated.d5.r1.sort.f1 === null && migrated.participant.name === "Old", "an old blob migrates with an empty Day 5 slice");
const migrated2 = migratePersisted({ participant: { name: "Old" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" }, d1: {}, d2: emptyD2(), d3: emptyD3(), d4: emptyD4() }, 3);
ok(!!migrated2.d5 && Object.keys(emptyD5R1().sort).length === 8 && !!migrated2.d4, "a version-3 blob (Days 1 to 4) gets an empty Day 5 slice and keeps its answers");

console.log(failed ? `\n${failed} check(s) FAILED` : "\nAll checks passed");
process.exit(failed ? 1 : 0);
