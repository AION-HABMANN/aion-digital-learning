/**
 * Day 3 verification (CLAUDE.md #10, #34, #38, #40): run with `npm run verify:day3`.
 * It checks the data and the logic that the screens rest on, in both languages: the key phrases sit inside their texts, the model answers
 * empty every missing list and complete every block, the model plan fits the printed limits, a different over-budget choice (including the
 * plan's own visualisation) still exports, the card minutes add up, and the plan's own printed figures are the ones on screen. It needs no browser.
 */
import { AREAS, AREA_IDS, BUDGET, CAUSES, CAUSE_MODEL, FACTS, FACT_IDS, MEASURES, MODEL_MEASURES, OPTS, PICK_CAUSES, TRUTH_SORT, WEEKS_LIMIT, effortBand, longestWeeks, totalCost, MEASURE_BY_ID } from "../data/day3/case";
import { DECISIONS, MODEL_DECISIONS, R2_BUDGET, decisionsCost } from "../data/day3/route2";
import { MATERIALS, MATERIAL_PLAIN } from "../data/day3/materials";
import { GLOSSARY, GLOSS_LOOKUP, GLOSS_LOOKUP_DE } from "../data/glossary";
import { causeHolds, effortWrong, optEffortWrong, sortHolds } from "../lib/day3/checks";
import { r1Missing, r2Missing } from "../lib/day3/missing";
import { KEY_D3_R1, KEY_D3_R2 } from "../lib/day3/mentorKey";
import { CORE_UNITS, dossierProgress, taskBlocks } from "../lib/day3/progress";
import { analysisBody, memoBody } from "../lib/day3/exportDoc";
import { MENTOR_PASSCODE } from "../lib/day1/mentorKey";
import { setCurrentLang } from "../lib/lang";
import { emptyD2, emptyD3, emptyD3R1 } from "../store/dayTypes";
import { migratePersisted } from "../store/useStore";
import type { Persisted, Score } from "../store/useStore";

let failed = 0;
const ok = (cond: boolean, msg: string) => {
  if (!cond) {
    failed++;
    console.error("FAIL  " + msg);
  } else console.log("ok    " + msg);
};

const empty = (): Persisted => ({ participant: { name: "" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" }, d1: undefined, d2: emptyD2(), d3: emptyD3() }) as unknown as Persisted;
const withKey = (p: Persisted, r1 = KEY_D3_R1(), r2 = KEY_D3_R2()): Persisted => ({ ...p, participant: { name: "Test Person" }, d3: { r1: { ...p.d3.r1, ...r1 }, r2: { ...p.d3.r2, ...r2 } } }) as Persisted;

for (const lang of ["en", "de"] as const) {
  setCurrentLang(lang);
  console.log(`\n=== ${lang.toUpperCase()} ===`);

  // 1 · the eight facts: every key phrase is a piece of its own text; every area is used
  ok(FACTS.length === 8 && FACTS.every((f) => f.text.includes(f.key)), "each fact's key phrase is inside its text");
  ok(AREA_IDS.every((a) => FACTS.some((f) => f.area === a)), "every area is used by at least one fact");
  ok(AREA_IDS.every((a) => AREAS[a].test.length > 10 && AREAS[a].hint.length > 5), "every area has a hint and a test question");
  ok(FACTS.every((f) => f.clue.endsWith("?")), "every clue is a question");

  // 2 · the model sort and causes hold on the set-level checks
  ok(sortHolds(TRUTH_SORT).holds === 8, "the model sort holds 8 of 8");
  ok(causeHolds(CAUSE_MODEL).holds === 4 && CAUSES.length === 7 && CAUSE_MODEL.length === PICK_CAUSES, "the model causes hold 4 of 4");

  // 3 · the effort rule and the model plan against the printed limits
  ok([effortBand(7500), effortBand(7999), effortBand(8000), effortBand(15000), effortBand(15001)].join() === "1,1,2,2,3", "effort bands: <€8,000 Low, ≤€15,000 Mid, above High");
  ok(OPTS.map((o) => effortBand(o.cost)).join() === "1,3,2", "Block 1.2: A is Low, B is High, C is Mid by the printed cost");
  const cost = totalCost(MODEL_MEASURES);
  ok(cost <= BUDGET && cost === 30000, `the model measures cost ${cost} ≤ ${BUDGET}`);
  ok(longestWeeks(MODEL_MEASURES) <= WEEKS_LIMIT, "the longest model measure fits the 4 weeks");
  ok(MEASURES.length === 9 && DECISIONS.length === 7, "nine measures, seven decisions");
  ok(MEASURE_BY_ID.m2.weeks > WEEKS_LIMIT, "the plan's visualisation (M2) takes longer than the printed four weeks, which is why the key swaps it for M5");
  ok(decisionsCost(MODEL_DECISIONS) <= R2_BUDGET && decisionsCost(MODEL_DECISIONS) === 115000, `the model decisions cost ${decisionsCost(MODEL_DECISIONS)} ≤ ${R2_BUDGET}`);

  // 4 · the plan's own printed figures
  ok(WEEKS_LIMIT === 4 && BUDGET === 40000 && R2_BUDGET === 150000, "four weeks, as the plan prints; €40,000 and €150,000 are the case's assumptions");

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
  ok(effortWrong(p1.d3.r1).length === 0 && optEffortWrong(p1.d3.r1).length === 0, "the model effort ratings follow the printed cost");
  const tb = taskBlocks(p1);
  ok(Object.values(tb).every(Boolean), "every task block is complete after the model fill");
  const prog1 = dossierProgress(p1, 1);
  const prog2 = dossierProgress(p1, 2);
  ok(prog1.total === 4 + CORE_UNITS[1].length && prog2.total === 3 + CORE_UNITS[2].length, "progress totals count Core cards and Core blocks only");

  // 6 · Core only (CLAUDE.md #35, #40): filling only the Core fields completes both routes
  const core = withKey(p0, { ...KEY_D3_R1(), optImpact: {}, optEffort: {}, optRisk: {}, optOrder: [], optWhy: "", reflect: { a: "", b: "", c: "" }, causes: [], causeWhy: "" });
  ok(r1Missing(core).length === 0, "Route 1: the Core blocks alone leave nothing missing (Optional never required)");

  // 7 · a different, well-reasoned choice still exports (CLAUDE.md #38): the plan's own four, including visualisation, over time, with reasons
  const reason = "A different choice with a clear reason of my own here.";
  const planOwn = ["m1", "m2", "m3", "m4"] as const;
  const other = {
    ...KEY_D3_R1(),
    chosen: [...planOwn],
    order: [...planOwn],
    impact: Object.fromEntries(planOwn.map((id) => [id, 3])) as Record<string, Score>,
    effort: Object.fromEntries(planOwn.map((id) => [id, effortBand(MEASURE_BY_ID[id].cost)])) as Record<string, Score>,
    risk: Object.fromEntries(planOwn.map((id) => [id, 1])) as Record<string, Score>,
    reasons: Object.fromEntries(planOwn.map((id) => [id, reason])),
  };
  const pOther = withKey(p0, other);
  ok(totalCost([...planOwn]) > BUDGET && longestWeeks([...planOwn]) > WEEKS_LIMIT, "the plan's own four are over budget and over time");
  ok(r1Missing(pOther).length === 0, "an over-budget, over-time set with reasons still has nothing missing");
  ok(/over|darüber/.test(analysisBody(pOther)), "the export prints the over-budget amount as a fact");
  const otherDec = { ...KEY_D3_R2(), picks: ["d6", "d7", "d4"] as ("d6" | "d7" | "d4")[], order: ["d6", "d7", "d4"] as ("d6" | "d7" | "d4")[] };
  ok(r2Missing(withKey(p0, KEY_D3_R1(), otherDec)).length === 0, "a different set of three decisions with a reason still has nothing missing");

  // 8 · the export bodies are built, in this language, and never print a key or a verdict
  const a = analysisBody(p1);
  const m = memoBody(p1);
  ok(a.includes("Test Person") && m.includes("Test Person"), "both documents carry the participant's name");
  ok(!/answer key|Musterlösung|expected/i.test(a + m), "no answer key text in an export");
  ok(!/[✓✗]/.test(a + m), "no tick or cross in an export");
  ok(analysisBody(p0).includes("—") && memoBody(p0).includes("—"), "empty documents still build");

  // 9 · every glossary term links in this language
  ok(GLOSSARY.every((g) => g.match.length > 0 && !!g.plain), "every glossary entry has forms and an explanation");
  ok(GLOSSARY.every((g) => !!g.de && !!g.de.plain && g.de.match.length > 0), "every glossary entry has a German text");
  ok((lang === "en" ? GLOSS_LOOKUP : GLOSS_LOOKUP_DE).size > 60, "the glossary lookup has entries in this language");
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
ok(!!migrated.d3 && migrated.d3.r1.sort.f1 === null && migrated.participant.name === "Old", "an old blob migrates with an empty Day 3 slice");
ok(Object.keys(emptyD3R1().sort).length === 8, "the empty Day 3 sort has eight facts");

console.log(failed ? `\n${failed} check(s) FAILED` : "\nAll checks passed");
process.exit(failed ? 1 : 0);
