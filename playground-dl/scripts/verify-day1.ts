/**
 * Day 1 verification (CLAUDE.md #10, #34, #38, #40): run with `npm run verify:day1`.
 * It checks the data and the logic that the screens rest on, in both languages: the key phrases sit inside their texts, the model answers
 * empty every missing list and complete every block, the model plan fits the printed limits, the card minutes add up, and the plan's own
 * printed figures are the ones on screen. It needs no browser (the store is never imported).
 */
import { AREAS, AREA_IDS, BUDGET, CAUSES, CAUSE_MODEL, CLAIMS, CLAIM_TRUTH, DROPOUT, FINDINGS, MEASURES, MODEL_MEASURES, MONTHS, WEEKS_LIMIT, effortBand, longestWeeks, totalCost, FINDING_IDS, TRUTH_SORT, MEASURE_BY_ID } from "../data/day1/case";
import { DECISIONS, MODEL_DECISIONS, R2_BUDGET, decisionsCost } from "../data/day1/route2";
import { MATERIALS, MATERIAL_PLAIN } from "../data/day1/materials";
import { GLOSSARY, GLOSS_LOOKUP, GLOSS_LOOKUP_DE } from "../data/glossary";
import { causeHolds, claimHolds, effortWrong, sortHolds } from "../lib/day1/checks";
import { r1Missing, r2Missing } from "../lib/day1/missing";
import { KEY_D1_R1, KEY_D1_R2, MENTOR_PASSCODE } from "../lib/day1/mentorKey";
import { dossierProgress, taskBlocks, CORE_UNITS } from "../lib/day1/progress";
import { analysisBody, memoBody } from "../lib/day1/exportDoc";
import { setCurrentLang } from "../lib/lang";
import type { Persisted } from "../store/useStore";

let failed = 0;
const ok = (cond: boolean, msg: string) => {
  if (!cond) {
    failed++;
    console.error("FAIL  " + msg);
  } else console.log("ok    " + msg);
};

const empty = (): Persisted =>
  ({
    participant: { name: "" },
    ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" },
    d1: {
      r1: { sort: Object.fromEntries(FINDING_IDS.map((i) => [i, null])), sortHistory: [], sortFuture: [], sortChecks: 0, sortResult: null, sortClue: false, sortReasoning: false, worst: null, worstWhy: "", claims: Object.fromEntries(CLAIMS.map((c) => [c.id, null])), claimHistory: [], claimFuture: [], claimChecks: 0, claimResult: null, claimClue: false, claimReasoning: false, need: "", reflect: { a: "", b: "", c: "" }, causes: [], causeResult: null, causeClue: false, causeWhy: "", chosen: [], impact: {}, effort: {}, risk: {}, reasons: {}, effortFlags: [], effortClue: false, effortResult: null, order: [], orderWhy: "", missingInfo: "", checks: 0 },
      r2: { vision: "", picks: [], order: [], orderWhy: "", risk: null, riskPlan: "", uncertain: "", owner: null, evidence: [], giveUp: "" },
    },
  }) as unknown as Persisted;

for (const lang of ["en", "de"] as const) {
  setCurrentLang(lang);
  console.log(`\n=== ${lang.toUpperCase()} ===`);

  // 1 · every key phrase is a piece of its own finding text
  ok(FINDINGS.every((f) => f.text.includes(f.key)), "each finding's key phrase is inside its text");
  ok(FINDINGS.length === 8 && AREA_IDS.every((a) => FINDINGS.some((f) => f.area === a)), "eight findings, every area used");
  ok(AREA_IDS.every((a) => AREAS[a].test.length > 10 && AREAS[a].hint.length > 5), "every area has a hint and a test question");

  // 2 · the model sort, claims and causes hold on the set-level checks
  ok(sortHolds(TRUTH_SORT).holds === 8, "the model sort holds 8 of 8");
  ok(claimHolds(CLAIM_TRUTH).holds === CLAIMS.length, "the model claims hold");
  ok(causeHolds(CAUSE_MODEL).holds === 3 && CAUSES.length === 6, "the model causes hold 3 of 3");

  // 3 · the model measures fit the printed limits, and the effort rule gives the model effort
  const cost = totalCost(MODEL_MEASURES);
  ok(cost <= BUDGET && cost === 47000, `the model measures cost ${cost} ≤ ${BUDGET}`);
  ok(longestWeeks(MODEL_MEASURES) <= WEEKS_LIMIT, "the longest model measure fits the 8 weeks");
  ok([effortBand(6000), effortBand(9999), effortBand(10000), effortBand(15000), effortBand(15001)].join() === "1,1,2,2,3", "effort bands: <€10,000 Low, ≤€15,000 Mid, above High");
  ok(MEASURES.length === 9, "nine measures");

  // 4 · the strategy picks fit the yearly limit
  ok(decisionsCost(MODEL_DECISIONS) <= R2_BUDGET, `the model decisions cost ${decisionsCost(MODEL_DECISIONS)} ≤ ${R2_BUDGET}`);
  ok(DECISIONS.length === 7, "seven decisions");

  // 5 · the plan's own printed figures
  ok(DROPOUT === 40 && BUDGET === 50000 && MONTHS === 2, "40% drop-out, €50,000 and 2 months, as the plan prints them");

  // 6 · from empty: a named, finite missing list; after the model fill: nothing missing, every block complete
  const p0 = empty();
  const m1 = r1Missing(p0);
  const m2 = r2Missing(p0);
  ok(m1.length > 0 && m1.every((m) => m.label.length > 12 && m.id.length > 0), `Route 1 from empty names ${m1.length} concrete items`);
  ok(m2.length > 0 && m2.every((m) => m.label.length > 12), `Route 2 from empty names ${m2.length} concrete items`);
  ok(!m1.some((m) => /^Block (1\.2|1\.3|2\.1):/.test(m.label)), "an Optional block is never in the missing list");

  const p1: Persisted = { ...p0, participant: { name: "Test Person" }, d1: { r1: { ...p0.d1.r1, ...KEY_D1_R1() }, r2: { ...p0.d1.r2, ...KEY_D1_R2() } } };
  ok(r1Missing(p1).length === 0, "Route 1: the model answers leave nothing missing");
  ok(r2Missing(p1).length === 0, "Route 2: the model answers leave nothing missing");
  ok(effortWrong(p1.d1.r1).length === 0, "the model effort ratings follow the printed cost");
  const tb = taskBlocks(p1);
  ok(Object.values(tb).every(Boolean), "every task block is complete after the model fill");
  const prog1 = dossierProgress(p1, 1);
  const prog2 = dossierProgress(p1, 2);
  ok(prog1.total === 4 + CORE_UNITS[1].length && prog2.total === 3 + CORE_UNITS[2].length, "progress totals count Core cards and Core blocks only");

  // 7 · Core only (CLAUDE.md #35, #40): filling only the Core fields completes both routes
  const core = { ...p1, d1: { r1: { ...p0.d1.r1, ...KEY_D1_R1(), claims: p0.d1.r1.claims, need: "", reflect: { a: "", b: "", c: "" }, causes: [], causeWhy: "" }, r2: p1.d1.r2 } } as Persisted;
  ok(r1Missing(core).length === 0, "Route 1: the Core blocks alone leave nothing missing (Optional never required)");

  // 8 · a different, well-reasoned choice still exports (CLAUDE.md #38): four other measures, over budget, with reasons
  const other = ["m6", "m7", "m8", "m5"] as const;
  const r1o = {
    ...p1.d1.r1,
    chosen: [...other],
    order: [...other],
    impact: Object.fromEntries(other.map((id) => [id, 1])),
    effort: Object.fromEntries(other.map((id) => [id, effortBand(MEASURE_BY_ID[id].cost)])),
    risk: Object.fromEntries(other.map((id) => [id, 3])),
    reasons: Object.fromEntries(other.map((id) => [id, "A different choice with a clear reason of my own here."])),
  };
  const pOther: Persisted = { ...p1, d1: { ...p1.d1, r1: r1o } } as Persisted;
  ok(totalCost([...other]) > BUDGET, "the other set is over budget");
  ok(r1Missing(pOther).length === 0, "an over-budget set with reasons still has nothing missing");
  ok(/over|darüber/.test(analysisBody(pOther)), "the export prints the over-budget amount as a fact");

  // 9 · the export bodies are built, in this language, and never print a key or a verdict
  const a = analysisBody(p1);
  const m = memoBody(p1);
  ok(a.includes("Test Person") && m.includes("Test Person"), "both documents carry the participant's name");
  ok(!/answer key|Musterlösung|expected/i.test(a + m), "no answer key text in an export");
  ok(!/[✓✗]/.test(a + m), "no tick or cross in an export");

  // 10 · every glossary term links in this language
  ok(GLOSSARY.every((g) => g.match.length > 0 && !!g.plain), "every glossary entry has forms and an explanation");
  ok((lang === "en" ? GLOSS_LOOKUP : GLOSS_LOOKUP_DE).size > 20, "the glossary lookup has entries in this language");
}

setCurrentLang("en");
console.log("\n=== language-independent ===");
ok(MATERIALS.filter((x) => x.block === "A").reduce((s, x) => s + x.minutes, 0) === 60, "Materi A cards add up to 60 minutes");
ok(MATERIALS.filter((x) => x.block === "B").reduce((s, x) => s + x.minutes, 0) === 60, "Materi B cards add up to 60 minutes");
ok(MATERIALS.every((x) => !!MATERIAL_PLAIN[x.id].idea && !!MATERIAL_PLAIN[x.id].why), "every card has an In plain words box");
ok(MENTOR_PASSCODE === "muchson123", "the mentor passcode is unchanged");

console.log(failed ? `\n${failed} check(s) FAILED` : "\nAll checks passed");
process.exit(failed ? 1 : 0);
