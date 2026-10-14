/**
 * Day 7 verification (CLAUDE.md #10, #34, #38, #40): run with `npm run verify:day7`.
 * It checks the data and the logic that the screens rest on, in both languages: the key phrases sit inside their texts, the model answers
 * empty every missing list and complete every block, a different over-budget choice with reasons still exports, the card minutes add up, and the
 * old blobs migrate. It needs no browser.
 */
import { BARRIERS, BARRIER_MODEL, BUDGET, FACTS, GROUPS, MEASURES, MEASURE_BY_ID, METHODS, MODEL_GROUPS, MODEL_MEASURES, MODEL_METHODS, OPTS, PRINCIPLES, PRINCIPLE_IDS, TRUTH_SORT, WEEKS_LIMIT, effortBand, longestWeeks, totalCost } from "../data/day7/case";
import { DECISIONS, EVALS, KPIS, MODEL_DECISIONS, MODEL_EVALS, MODEL_KPIS, MODEL_PLACES, PLACES, R2_BUDGET, RISKS, decisionsCost } from "../data/day7/route2";
import { MATERIALS, MATERIAL_PLAIN } from "../data/day7/materials";
import { GLOSSARY, GLOSS_LOOKUP, GLOSS_LOOKUP_DE } from "../data/glossary";
import { REFERENCES } from "../data/references";
import { causeHolds, effortWrong, sortHolds } from "../lib/day7/checks";
import { r1Missing, r2Missing } from "../lib/day7/missing";
import { KEY_D7_R1, KEY_D7_R2 } from "../lib/day7/mentorKey";
import { CORE_UNITS, dossierProgress, taskBlocks } from "../lib/day7/progress";
import { analysisBody, memoBody } from "../lib/day7/exportDoc";
import { MENTOR_PASSCODE } from "../lib/day1/mentorKey";
import { setCurrentLang } from "../lib/lang";
import { emptyD2, emptyD3 } from "../store/dayTypes";
import { emptyD4, emptyD5, emptyD6, emptyD7, emptyD7R1 } from "../store/dayTypesStd";
import { migratePersisted } from "../store/useStore";
import type { Persisted, Score } from "../store/useStore";

let failed = 0;
const ok = (cond: boolean, msg: string) => {
  if (!cond) {
    failed++;
    console.error("FAIL  " + msg);
  } else console.log("ok    " + msg);
};

const empty = (): Persisted => ({ participant: { name: "" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" }, d1: undefined, d2: emptyD2(), d3: emptyD3(), d4: emptyD4(), d5: emptyD5(), d6: emptyD6(), d7: emptyD7() }) as unknown as Persisted;
const withKey = (p: Persisted, r1 = KEY_D7_R1(), r2 = KEY_D7_R2()): Persisted => ({ ...p, participant: { name: "Test Person" }, d7: { r1: { ...p.d7.r1, ...r1 }, r2: { ...p.d7.r2, ...r2 } } }) as Persisted;

for (const lang of ["en", "de"] as const) {
  setCurrentLang(lang);
  console.log(`\n=== ${lang.toUpperCase()} ===`);

  // 1 · the eight facts: every key phrase is a piece of its own text; the three principles are used 3, 3 and 2 times
  ok(FACTS.length === 8 && FACTS.every((f) => f.text.includes(f.key)), "each fact's key phrase is inside its text");
  ok(FACTS.filter((f) => f.area === "perceivable").length === 3 && FACTS.filter((f) => f.area === "operable").length === 3 && FACTS.filter((f) => f.area === "understandable").length === 2, "the principles are used by 3, 3 and 2 facts");
  ok(PRINCIPLE_IDS.every((a) => PRINCIPLES[a].test.length > 10 && PRINCIPLES[a].hint.length > 5), "every principle has a hint and a test question");
  ok(FACTS.every((f) => f.clue.endsWith("?")), "every clue is a question");
  ok(GROUPS.length === 8 && MODEL_GROUPS.length >= 2, "eight groups, and the model ticks at least two");

  // 2 · the model sort holds on the set-level check; the model barriers hold
  ok(sortHolds(TRUTH_SORT).holds === 8, "the model sort holds 8 of 8");
  ok(causeHolds(BARRIER_MODEL).holds === 4 && BARRIERS.length === 7, "the model barriers hold 4 of 4 among seven");

  // 3 · the effort rule and the reference measures against the printed limits
  ok([effortBand(9999), effortBand(10000), effortBand(25000), effortBand(25001)].join() === "1,2,2,3", "effort bands: <€10,000 Low, ≤€25,000 Mid, above High");
  ok(OPTS.map((o) => effortBand(o.cost)).join() === "3,2,2", "the three options are High, Mid, Mid by the printed cost");
  ok(MODEL_MEASURES.map((id) => effortBand(MEASURE_BY_ID[id].cost)).join() === "2,2,2,1", "the reference measures are Mid, Mid, Mid, Low by the printed cost");
  const cost = totalCost(MODEL_MEASURES);
  ok(cost === 47000 && cost <= BUDGET, `the reference four measures cost ${cost}, within the €${BUDGET} the case assumes`);
  ok(longestWeeks(MODEL_MEASURES) === 6 && longestWeeks(MODEL_MEASURES) <= WEEKS_LIMIT, "the longest reference measure is 6 weeks of 10");
  ok(MEASURES.length === 9 && METHODS.length === 6 && DECISIONS.length === 7 && KPIS.length === 7 && EVALS.length === 5 && PLACES.length === 7 && RISKS.length === 5, "nine measures, six methods, seven decisions, seven KPIs, five methods, seven places, five risks");
  ok(decisionsCost(MODEL_DECISIONS) === 150000 && decisionsCost(MODEL_DECISIONS) <= R2_BUDGET, `the model decisions cost ${decisionsCost(MODEL_DECISIONS)} ≤ ${R2_BUDGET}`);
  ok(MODEL_PLACES.length >= 3 && MODEL_KPIS.length >= 3 && MODEL_EVALS.length >= 2 && MODEL_METHODS.length === 3, "the model answers meet the minimum counts");

  // 4 · the case's own figures
  ok(WEEKS_LIMIT === 10 && BUDGET === 50000 && R2_BUDGET === 240000, "10 weeks, €50,000 and €240,000 are the case's assumptions (the plan says only “limited”)");

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
  ok(effortWrong(p1.d7.r1).length === 0, "the model effort ratings follow the printed cost");
  const tb = taskBlocks(p1);
  ok(Object.values(tb).every(Boolean), "every task block is complete after the model fill");
  const prog1 = dossierProgress(p1, 1);
  const prog2 = dossierProgress(p1, 2);
  ok(prog1.total === 4 + CORE_UNITS[1].length && prog2.total === 3 + CORE_UNITS[2].length, "progress totals count Core cards and Core blocks only");

  // 6 · Core only (CLAUDE.md #35, #40): filling only the Core fields completes both routes
  const k1 = KEY_D7_R1();
  const core = withKey(p0, { ...emptyD7R1(), sort: k1.sort, groups: k1.groups, groupsWhy: k1.groupsWhy, improve: k1.improve, chosen: k1.chosen, impact: k1.impact, effort: k1.effort, risk: k1.risk, reasons: k1.reasons, order: k1.order, orderWhy: k1.orderWhy, methods: k1.methods, methodsWhy: k1.methodsWhy, missingInfo: k1.missingInfo });
  ok(r1Missing(core).length === 0, "Route 1: the Core blocks alone leave nothing missing (Optional never required)");
  ok(taskBlocks(core).b11 && taskBlocks(core).b22 && !taskBlocks(core).b12 && !taskBlocks(core).b21, "with the Core fields only, 1.1 and 2.2 are complete and the Optional blocks are not");

  // 7 · a different, well-reasoned choice still exports (CLAUDE.md #38): a set over the budget, with reasons; a different set of decisions
  const reason = "A different choice with a clear reason of my own here.";
  const over = ["m7", "m8", "m9", "m6"] as const;
  const other = {
    ...KEY_D7_R1(),
    chosen: [...over],
    order: [...over],
    impact: Object.fromEntries(over.map((id) => [id, 2])) as Record<string, Score>,
    effort: Object.fromEntries(over.map((id) => [id, effortBand(MEASURE_BY_ID[id].cost)])) as Record<string, Score>,
    risk: Object.fromEntries(over.map((id) => [id, 2])) as Record<string, Score>,
    reasons: Object.fromEntries(over.map((id) => [id, reason])),
    methods: ["e2", "e3", "e5"] as ("e2" | "e3" | "e5")[],
  };
  const pOther = withKey(p0, other);
  ok(totalCost([...over]) > BUDGET, `the alternative set costs ${totalCost([...over])}, over the budget`);
  ok(r1Missing(pOther).length === 0, "a different set that goes over the budget, with reasons, still has nothing missing");
  ok(/over|darüber/.test(analysisBody(pOther)), "the export prints the over-budget amount as a fact");
  const otherDec = { ...KEY_D7_R2(), picks: ["d4", "d5", "d6"] as ("d4" | "d5" | "d6")[], order: ["d4", "d5", "d6"] as ("d4" | "d5" | "d6")[], risk: "r3" as const };
  ok(r2Missing(withKey(p0, KEY_D7_R1(), otherDec)).length === 0, "a different set of three decisions and a different risk still have nothing missing");
  const bigDec = { ...KEY_D7_R2(), picks: ["d7", "d1", "d5"] as ("d7" | "d1" | "d5")[], order: ["d7", "d1", "d5"] as ("d7" | "d1" | "d5")[] };
  ok(r2Missing(withKey(p0, KEY_D7_R1(), bigDec)).length === 0 && memoBody(withKey(p0, KEY_D7_R1(), bigDec)).includes(DECISIONS[6].name), "the three most expensive decisions, with the new features first, still export and the memo names them");
  const dearest = [...DECISIONS].sort((x, y) => y.cost - x.cost).slice(0, 3).reduce((sum, d) => sum + d.cost, 0);
  ok(dearest <= R2_BUDGET, `the three dearest decisions cost ${dearest}, so no set of three exceeds the €${R2_BUDGET} yearly budget (the bar still shows what is left)`);

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
  const look = lang === "en" ? GLOSS_LOOKUP : GLOSS_LOOKUP_DE;
  ok((lang === "en" ? ["accessibility", "inclusive design", "persona spectrum", "wcag", "contrast ratio", "screen reader", "bfsg", "overlay", "plain language"] : ["barrierefreiheit", "inklusives design", "persona-spektrum", "wcag", "kontrastverhältnis", "screenreader", "bfsg", "overlay", "einfache sprache"]).every((k) => look.has(k)), "the Day 7 terms are glossary links in this language");
  ok(["wcag22", "wcagUnderstanding", "en301549", "bfsg", "bitv", "w3cAria", "castUdl", "who2022", "msInclusive", "iso924111", "brooke1996", "rodden2010", "nielsen2000", "gibbons2018", "klein2007", "bezos2016", "gdpr"].every((k) => !!(REFERENCES as Record<string, { full: string }>)[k]?.full), "the Day 7 references exist");
}

setCurrentLang("en");
console.log("\n=== language-independent ===");
ok(MATERIALS.filter((x) => x.block === "A").reduce((s, x) => s + x.minutes, 0) === 60, "Materi A cards add up to 60 minutes");
ok(MATERIALS.filter((x) => x.block === "B").reduce((s, x) => s + x.minutes, 0) === 60, "Materi B cards add up to 60 minutes");
ok(MATERIALS.every((x) => !!MATERIAL_PLAIN[x.id].idea && !!MATERIAL_PLAIN[x.id].why && !!MATERIAL_PLAIN[x.id].picture), "every card has an In plain words box with all three parts");
ok(MATERIALS.filter((x) => x.optional).map((x) => x.id).join() === "A4", "only A4 is Optional");
ok(MENTOR_PASSCODE === "muchson123", "the mentor passcode is unchanged");

const migrated = migratePersisted({ participant: { name: "Old" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" }, d1: {} }, 1);
ok(!!migrated.d7 && migrated.d7.r1.sort.f1 === null && migrated.participant.name === "Old", "an old blob migrates with an empty Day 7 slice");
const migrated2 = migratePersisted({ participant: { name: "Old" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" }, d1: {}, d2: emptyD2(), d3: emptyD3(), d4: emptyD4(), d5: emptyD5(), d6: emptyD6() }, 3);
ok(!!migrated2.d7 && Object.keys(emptyD7R1().sort).length === 8 && !!migrated2.d6, "a version-3 blob (Days 1 to 6) gets an empty Day 7 slice and keeps its answers");

console.log(failed ? `\n${failed} check(s) FAILED` : "\nAll checks passed");
process.exit(failed ? 1 : 0);
