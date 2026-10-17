/**
 * Day 2 verification (CLAUDE.md #10, #34, #38, #57): run with `npm run verify:day2`.
 * Day 2's tasks are the plan's own questions as free answers, every block Core: Block 1.1 (UE2), Block 1.2 (UE3), Block 2.1 (the case study)
 * and, in Route 2, Block 3.1 (the transfer project). It checks, in both languages, that the model answers empty every missing list and complete
 * every block, that a list of items counts in the layout the learner chose (a box each or a table) and only in that one, that a different but
 * reasoned decision still exports, that there is no Optional block and no instrument the plan does not print, and that the old saved shape loads.
 * It needs no browser.
 */
import { FACTS, FACT_IDS, MODEL_OPT, MONTHS, OPTS, OPT_IDS, TEST_SLOTS } from "../data/day2/case";
import { MATERIALS, MATERIAL_PLAIN } from "../data/day2/materials";
import { GLOSSARY, GLOSS_LOOKUP, GLOSS_LOOKUP_DE } from "../data/glossary";
import { r1Missing, r2Missing } from "../lib/day2/missing";
import { KEY_D2_R1, KEY_D2_R2 } from "../lib/day2/mentorKey";
import { BLOCK_MINUTES, CORE_UNITS, DIFFS_N, OPTIONAL_BLOCKS, diffCount, diffLines, dossierProgress, taskBlocks } from "../lib/day2/progress";
import { analysisBody, memoBody } from "../lib/day2/exportDoc";
import { MENTOR_PASSCODE } from "../lib/day1/mentorKey";
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
const withKey = (p: Persisted, r1: Record<string, unknown> = {}, r2: Record<string, unknown> = {}): Persisted =>
  ({ ...p, participant: { name: "Test Person" }, d2: { r1: { ...p.d2.r1, ...KEY_D2_R1(), ...r1 }, r2: { ...p.d2.r2, ...KEY_D2_R2(), ...r2 } } }) as Persisted;
const ids = (m: { id: string }[], re: RegExp) => m.map((x) => x.id).filter((x) => re.test(x));

for (const lang of ["en", "de"] as const) {
  setCurrentLang(lang);
  console.log(`\n=== ${lang.toUpperCase()} ===`);

  // 1 · the case and its evidence: the plan prints no figure, so the site prints none
  ok(FACTS.length === 8 && FACT_IDS.length === 8 && FACTS.every((f) => f.text.length > 10 && f.where.length > 3), "the eight numbered places are plain descriptions");
  ok(OPTS.length === 3 && TEST_SLOTS.length === 3 && MONTHS === 3, "three options, three test slots, three months");
  ok(OPTIONAL_BLOCKS.length === 0 && Object.keys(BLOCK_MINUTES).sort().join() === "1.1,1.2,2.1,3.1", "there is no Optional block; the blocks are 1.1, 1.2, 2.1 and 3.1");
  ok(CORE_UNITS[1].join() === "b11,b12,b21" && CORE_UNITS[2].join() === "b31", "Route 1 has three blocks and Route 2 has one");

  // 2 · from empty: a named, finite missing list in each route
  const p0 = empty();
  const m1 = r1Missing(p0);
  const m2 = r2Missing(p0);
  ok(m1.length > 0 && m1.every((m) => m.label.length > 12 && m.id.length > 0), `Route 1 from empty names ${m1.length} concrete items`);
  ok(m2.filter((m) => /Block 3\.1:/.test(m.label)).length === 7 && m2.every((m) => m.label.length > 12), "Route 2 from empty names the seven items of Block 3.1");
  ok(m1.every((m) => /^(Block (1\.1|1\.2|2\.1):)|^[A-Z]/.test(m.label)) && !m1.some((m) => /Block (1\.3|1\.4|2\.2|3\.2)/.test(m.label)), "every Route 1 entry names one of the three blocks");

  // 3 · the model answers empty every list and complete every block
  const p1 = withKey(p0);
  ok(r1Missing(p1).length === 0, "Route 1: the model answers leave nothing missing");
  ok(r2Missing(p1).length === 0, "Route 2: the model answers leave nothing missing");
  ok(Object.values(taskBlocks(p1)).every(Boolean), "every task block is complete after the model fill");
  ok(dossierProgress(p1, 1).total === MATERIALS.filter((x) => x.block === "A" && !x.optional).length + 3 && dossierProgress(p1, 2).total === MATERIALS.filter((x) => x.block === "B" && !x.optional).length + 1, "progress totals count the cards and the task blocks");

  // 4 · Block 1.1 (plan UE2): prefer + why, five differences (a text box or a table), three principles
  ok(diffLines(KEY_D2_R1().diffs ?? "").length === DIFFS_N && (KEY_D2_R1().diffRows ?? []).length === DIFFS_N, "the model answer holds exactly five differences, in both layouts");
  ok(diffLines("1. Navigation: A has a path\n2) Progress: B has no sign\n- Length: A is short\n\n• x").length === 3, "numbers and bullets are ignored and a line under 8 characters is not counted");
  ok(m1.some((m) => m.id === "diffs-field" && m.label.includes(`0 ${lang === "en" ? "of" : "von"} ${DIFFS_N}`)), "Block 1.1 from empty (the form is the default) names the differences with the count so far");
  const own = withKey(p0, { diffs: "Platform A feels calm and B feels heavy to me\nOnly A tells me where I am\nA breaks the course into small pieces\nB never says how long it takes\nB ends without a word to the learner" });
  ok(r1Missing(own).length === 0 && analysisBody(own).includes("Only A tells me where I am"), "five differences in the learner's own words count and are printed in the export");
  const four = withKey(p0, { diffs: KEY_D2_R1().diffs!.split("\n").slice(0, 4).join("\n") });
  ok(r1Missing(four).some((m) => m.id === "diffs-field" && /4/.test(m.label)) && !taskBlocks(four).b11, "four differences are named as missing with the count, and Block 1.1 is not complete");
  const tblKey = withKey(p0, { diffMode: "table" as const });
  ok(diffCount(tblKey.d2.r1) === DIFFS_N && r1Missing(tblKey).length === 0, "the model table leaves nothing missing in the table layout");
  const gap = withKey(p0, { diffMode: "table" as const, diffRows: KEY_D2_R1().diffRows!.map((x, i) => (i === 2 ? { ...x, b: "" } : x)) });
  ok(r1Missing(gap).some((m) => m.id === "diffs-row-2" && /3/.test(m.label) && /Platform B|Plattform B/.test(m.label)) && diffCount(gap.d2.r1) === 4, "a table row without its Platform B cell is named (row 3) and does not count");
  ok(ids(r1Missing(withKey(p0, { diffMode: "table" as const, diffRows: emptyD2R1().diffRows })), /^diffs-row-/).length === DIFFS_N, "in the table layout, a full text box does not count");
  ok(r1Missing(withKey(p0, { diffMode: "text" as const, diffs: "" })).some((m) => m.id === "diffs-field"), "in the text layout, a full table does not count");
  ok(analysisBody(tblKey).includes("<th>" + (lang === "en" ? "Platform B" : "Plattform B") + "</th>") && analysisBody(withKey(p0)).includes("<ol><li>"), "the export prints a table in the table layout and a list in the text layout");

  // 5 · Block 1.2 (plan UE3): assess three options, decide, the risks without testing
  const key12 = /^(assess-|optchoice|optwhy|notest)/;
  ok(["assess-A", "assess-B", "assess-C", "optchoice-field", "optwhy-field", "notest-field"].every((x) => ids(m1, key12).includes(x)), "Block 1.2 from empty names each option's assessment, the decision, its reason and the risks");
  ok(ids(r1Missing(p1), key12).length === 0 && taskBlocks(p1).b12, "the model answers complete Block 1.2");
  const tbl12 = withKey(p0, { assessMode: "table" as const });
  ok(ids(r1Missing(tbl12), key12).length === 0 && taskBlocks(tbl12).b12, "the model table completes Block 1.2 in the table layout");
  const gap12 = withKey(p0, { assessMode: "table" as const, assessRows: { ...KEY_D2_R1().assessRows!, B: { ...KEY_D2_R1().assessRows!.B, effort: "" } } });
  ok(r1Missing(gap12).some((x) => x.id === "assess-B" && /effort|Aufwand/.test(x.label)), "a table row without its effort cell is named (option B, effort)");
  ok(ids(r1Missing(withKey(p0, { assessMode: "table" as const, assessRows: emptyD2R1().assessRows })), key12).length === 3, "in the table layout, filled boxes do not count");
  ok(ids(r1Missing(withKey(p0, { optChoice: "C" as const, optWhy: "A different choice with a clear reason of my own: speed matters more to us." })), key12).length === 0, "a different decision with a reason still has nothing missing");
  ok(OPT_IDS.join() === "A,B,C" && MODEL_OPT === "B", "the reference decision is B (low-fidelity first)");

  // 6 · Block 2.1 (plan UE5-6): weaknesses, a prototype approach, three UX tests, the adaptive decision
  const key21 = /^(weak-|approach-|tests-|test-|adaptive)/;
  ok(["weak-field", "approach-field", "test-1", "test-2", "test-3", "adaptive-field", "adaptivewhy-field"].every((x) => ids(m1, key21).includes(x)), "Block 2.1 from empty names the weaknesses, the approach, each test, the decision and its reason");
  ok(ids(r1Missing(p1), key21).length === 0 && taskBlocks(p1).b21, "the model answers complete Block 2.1");
  const tbl21 = withKey(p0, { testMode: "table" as const });
  ok(ids(r1Missing(tbl21), key21).length === 0 && taskBlocks(tbl21).b21, "the model test table completes Block 2.1 in the table layout");
  const gap21 = withKey(p0, { testMode: "table" as const, testRows: { ...KEY_D2_R1().testRows!, "2": { ...KEY_D2_R1().testRows!["2"], how: "" } } });
  ok(r1Missing(gap21).some((x) => x.id === "test-2" && /how|wie/i.test(x.label)), "a test row without its how is named (test 2, how)");
  ok(ids(r1Missing(withKey(p0, { testMode: "table" as const, testRows: emptyD2R1().testRows })), key21).length === 3, "in the table layout, filled test boxes do not count");
  ok(ids(r1Missing(withKey(p0, { adaptive: "no" as const, adaptiveWhy: "A different choice with a clear reason of my own: we lack the data." })), key21).length === 0, "a different adaptive decision with a reason still has nothing missing");
  const doc = analysisBody(p1);
  ok(doc.includes(KEY_D2_R1().noTest!.slice(0, 20)) && doc.includes(KEY_D2_R1().approachText!.slice(0, 20)) && (doc.includes("Test low-fidelity first") || doc.includes("Zuerst Low-Fidelity testen")), "the export prints the assessment, the decision, the risks, the approach and the tests");

  // 7 · Route 2 · Block 3.1 (plan UE8-10): six items
  ok(r2Missing(withKey(p0, {}, { adaptive: "yes" as const, adaptiveWhy: "A different choice with a clear reason of my own: the competitors are ahead." })).length === 0, "a different decision on adaptive learning with a reason still has nothing missing");
  ok(r2Missing(withKey(p0, {}, { roadmap: "" })).some((m) => m.id === "roadmap-field") && r2Missing(withKey(p0, {}, { uncertain: "too short" })).some((m) => m.id === "uncertain-field"), "an empty roadmap and a too-short decision under uncertainty are named");
  const memo = memoBody(p1);
  ok([KEY_D2_R2().roadmap!.slice(0, 20), KEY_D2_R2().riskText!.slice(0, 20), KEY_D2_R2().testing!.slice(0, 20)].every((x) => memo.includes(x)), "the memo prints the six answers");

  // 8 · the export bodies are built, in this language, and never print a key or a verdict
  ok(doc.includes("Test Person") && memo.includes("Test Person"), "both documents carry the participant's name");
  ok(!/answer key|Musterlösung|expected/i.test(doc + memo), "no answer key text in an export");
  ok(!/[✓✗]/.test(doc + memo), "no tick or cross in an export");
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
ok(MATERIALS.filter((x) => x.optional).map((x) => x.id).join() === "A4", "only A4 is an Optional card");
ok(MENTOR_PASSCODE === "muchson123", "the mentor passcode is unchanged");

// the migration (CLAUDE.md #9): an old blob with Day 1 only gets empty Day 2 and Day 3 slices; a Day 2 slice from before #57 keeps what still fits
const old = { participant: { name: "Old" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" }, d1: { r1: {}, r2: {} } };
const migrated = migratePersisted(old, 1);
ok(!!migrated.d2 && !!migrated.d3 && migrated.participant.name === "Old", "an old blob migrates to the current shape with its name kept");
const before57 = mergeDefaults(emptyD2R1(), { prefer: "A", preferWhy: "kept", principles: ["only one"], sort: { f1: "path" }, approach: "p1", optBenefit: { A: 2 } });
ok(before57.prefer === "A" && before57.preferWhy === "kept" && before57.principles.length === 3 && before57.principles[1] === "" && before57.diffMode === "text" && before57.diffRows.length === 5 && before57.assessMode === "text" && before57.testMode === "text" && before57.weakText === "", "a Day 2 slice from before the rebuild keeps its answers and gets the new fields from the defaults");
ok(mergeDefaults(emptyD2R2(), { adaptive: "partly", prototyping: 5, picks: ["i1"] }).prototyping === "" && mergeDefaults(emptyD2R2(), { adaptive: "partly" }).adaptive === "partly", "a value of the wrong type is dropped");

console.log(failed ? `\n${failed} check(s) FAILED` : "\nAll checks passed");
process.exit(failed ? 1 : 0);
