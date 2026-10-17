/**
 * Day 3 verification (CLAUDE.md #10, #34, #38, #57): run with `npm run verify:day3`.
 * Day 3's tasks are the plan's own questions as free answers, every block Core: Block 1.1 (UE2), Block 1.2 (UE3), Block 2.1 (the case study)
 * and, in Route 2, Block 3.1 (the transfer project). It checks, in both languages, that the model answers empty every missing list and complete
 * every block, that a list of items counts in the layout the learner chose (a box each or a table) and only in that one, that a different but
 * reasoned decision still exports, that there is no Optional block and no instrument the plan does not print, and that the old saved shape loads.
 * It needs no browser.
 */
import { FACTS, FACT_IDS, MODEL_OPT, OPTS, OPT_IDS, WEEKS_LIMIT } from "../data/day3/case";
import { MATERIALS, MATERIAL_PLAIN } from "../data/day3/materials";
import { GLOSSARY, GLOSS_LOOKUP, GLOSS_LOOKUP_DE } from "../data/glossary";
import { r1Missing, r2Missing } from "../lib/day3/missing";
import { KEY_D3_R1, KEY_D3_R2 } from "../lib/day3/mentorKey";
import { BLOCK_MINUTES, CAUSES_N, CORE_UNITS, FRAME_CELL, IMPROVEMENTS_N, MEASURES_N, OPTIONAL_BLOCKS, PROBLEMS_N, causeCount, cellText, dossierProgress, improvementCount, listLines, measureCount, problemCount, taskBlocks } from "../lib/day3/progress";
import { analysisBody, memoBody } from "../lib/day3/exportDoc";
import { ASSESS_GUIDE, CAUSES_GUIDE, LOGIC_GUIDE, MEASURES_GUIDE, PROBLEMS_GUIDE, RISK_GUIDE, UNC_GUIDE } from "../data/day3/tableGuides";
import { MENTOR_PASSCODE } from "../lib/day1/mentorKey";
import { setCurrentLang } from "../lib/lang";
import { emptyD3, emptyD3R1, emptyD3R2, emptyD2 } from "../store/dayTypes";
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
  ({ ...p, participant: { name: "Test Person" }, d3: { r1: { ...p.d3.r1, ...KEY_D3_R1(), ...r1 }, r2: { ...p.d3.r2, ...KEY_D3_R2(), ...r2 } } }) as Persisted;
const ids = (m: { id: string }[], re: RegExp) => m.map((x) => x.id).filter((x) => re.test(x));

for (const lang of ["en", "de"] as const) {
  setCurrentLang(lang);
  console.log(`\n=== ${lang.toUpperCase()} ===`);

  // 1 · the case and its evidence: the plan prints no cost or budget, so the site prints none
  ok(FACTS.length === 8 && FACT_IDS.length === 8 && FACTS.every((f) => f.text.length > 10 && f.where.length > 3), "the eight numbered places are plain descriptions");
  ok(OPTS.length === 3 && OPT_IDS.join() === "A,B,C" && WEEKS_LIMIT === 4, "three options, four weeks");
  ok(!OPTS.some((o) => "cost" in o || "weeks" in o), "the options print no cost and no weeks (the plan prints none)");
  ok(OPTIONAL_BLOCKS.length === 0 && Object.keys(BLOCK_MINUTES).sort().join() === "1.1,1.2,2.1,3.1", "there is no Optional block; the blocks are 1.1, 1.2, 2.1 and 3.1");
  ok(CORE_UNITS[1].join() === "b11,b12,b21" && CORE_UNITS[2].join() === "b31", "Route 1 has three blocks and Route 2 has one");

  // 2 · from empty: a named, finite missing list in each route
  const p0 = empty();
  const m1 = r1Missing(p0);
  const m2 = r2Missing(p0);
  ok(m1.length > 0 && m1.every((m) => m.label.length > 12 && m.id.length > 0), `Route 1 from empty names ${m1.length} concrete items`);
  ok(m2.filter((m) => /Block 3\.1:/.test(m.label)).length === 6 && m2.every((m) => m.label.length > 12), "Route 2 from empty names the six items of Block 3.1");
  ok(m1.every((m) => /^(Block (1\.1|1\.2|2\.1):)|^[A-Z]/.test(m.label)) && !m1.some((m) => /Block (1\.3|2\.2|3\.2)/.test(m.label)), "every Route 1 entry names one of the three blocks");

  // 3 · the model answers empty every list and complete every block
  const p1 = withKey(p0);
  ok(r1Missing(p1).length === 0, "Route 1: the model answers leave nothing missing");
  ok(r2Missing(p1).length === 0, "Route 2: the model answers leave nothing missing");
  ok(Object.values(taskBlocks(p1)).every(Boolean), "every task block is complete after the model fill");
  ok(dossierProgress(p1, 1).total === MATERIALS.filter((x) => x.block === "A" && !x.optional).length + 3 && dossierProgress(p1, 2).total === MATERIALS.filter((x) => x.block === "B" && !x.optional).length + 1, "progress totals count the cards and the task blocks");

  // 4 · Block 1.1 (plan UE2): five problems (a text box or a table), how it feels, what to improve
  ok(listLines(KEY_D3_R1().problems ?? "").length === PROBLEMS_N && (KEY_D3_R1().problemRows ?? []).length === PROBLEMS_N, "the model answer holds exactly five problems, in both layouts");
  ok(listLines("1. Wall of text here\n2) No key sentence\n- Terms unexplained\n\n• x").length === 3, "numbers and bullets are ignored and a line under 8 characters is not counted");
  ok(m1.some((m) => m.id === "problems-field" && m.label.includes(`0 ${lang === "en" ? "of" : "von"} ${PROBLEMS_N}`)), "Block 1.1 from empty (the form is the default) names the problems with the count so far");
  const own = withKey(p0, { problems: "I cannot see where to start\nNothing shows what matters most\nWords are not explained to me\nThere is no picture to hold on to\nI do not know how long it is" });
  ok(r1Missing(own).length === 0 && analysisBody(own).includes("Nothing shows what matters most"), "five problems in the learner's own words count and are printed in the export");
  const four = withKey(p0, { problems: KEY_D3_R1().problems!.split("\n").slice(0, 4).join("\n") });
  ok(r1Missing(four).some((m) => m.id === "problems-field" && /4/.test(m.label)) && !taskBlocks(four).b11, "four problems are named as missing with the count, and Block 1.1 is not complete");
  const tblKey = withKey(p0, { problemMode: "table" as const });
  ok(problemCount(tblKey.d3.r1) === PROBLEMS_N && r1Missing(tblKey).length === 0, "the model table leaves nothing missing in the table layout");
  const gap = withKey(p0, { problemMode: "table" as const, problemRows: KEY_D3_R1().problemRows!.map((x, i) => (i === 2 ? { ...x, side: "" } : x)) });
  ok(r1Missing(gap).some((m) => m.id === "problems-row-2" && /3/.test(m.label)) && problemCount(gap.d3.r1) === 4, "a table row without its second cell is named (row 3) and does not count");
  ok(ids(r1Missing(withKey(p0, { problemMode: "table" as const, problemRows: emptyD3R1().problemRows })), /^problems-row-/).length === PROBLEMS_N, "in the table layout, a full text box does not count");
  ok(r1Missing(withKey(p0, { problemMode: "text" as const, problems: "" })).some((m) => m.id === "problems-field"), "in the text layout, a full table does not count");
  ok(analysisBody(tblKey).includes("<th>" + (lang === "en" ? "The problem" : "Das Problem") + "</th>") && analysisBody(withKey(p0)).includes("<ol><li>"), "the export prints a table in the table layout and a list in the text layout");
  ok(["feel-field", "improve-field"].every((x) => ids(m1, /^(feel|improve)-/).includes(x)), "Block 1.1 from empty names how it feels and what to improve");

  // 5 · Block 1.2 (plan UE3): assess three options, a priority, the greatest effect
  const key12 = /^(assess-|optorder|optchoice|optwhy)/;
  ok(["assess-A", "assess-B", "assess-C", "optorder-field", "optchoice-field", "optwhy-field"].every((x) => ids(m1, key12).includes(x)), "Block 1.2 from empty names each option's assessment, the priority, the choice and its reason");
  ok(ids(r1Missing(p1), key12).length === 0 && taskBlocks(p1).b12, "the model answers complete Block 1.2");
  const tbl12 = withKey(p0, { assessMode: "table" as const });
  ok(ids(r1Missing(tbl12), key12).length === 0 && taskBlocks(tbl12).b12, "the model table completes Block 1.2 in the table layout");
  const gap12 = withKey(p0, { assessMode: "table" as const, assessRows: { ...KEY_D3_R1().assessRows!, B: { ...KEY_D3_R1().assessRows!.B, effort: "" } } });
  ok(r1Missing(gap12).some((x) => x.id === "assess-B" && /effort|Aufwand/.test(x.label)), "a table row without its effort cell is named (option B, effort)");
  ok(ids(r1Missing(withKey(p0, { assessMode: "table" as const, assessRows: emptyD3R1().assessRows })), key12).length === 3, "in the table layout, filled boxes do not count");
  ok(ids(r1Missing(withKey(p0, { optChoice: "A" as const, optWhy: "A different choice with a clear reason of my own: speed matters more to us." })), key12).length === 0, "a different choice with a reason still has nothing missing");
  ok(MODEL_OPT === "C", "the reference choice is C (chunking, the plan's first measure)");

  // 6 · Block 2.1 (plan UE5-6): four causes, four improvements, priority, justification
  const key21 = /^(causes-|improvements-|cause-row|priority|justify)/;
  ok(listLines(KEY_D3_R1().causesText ?? "").length === CAUSES_N && listLines(KEY_D3_R1().improvementsText ?? "").length === IMPROVEMENTS_N && (KEY_D3_R1().causeRows ?? []).length === CAUSES_N, "the model answer holds four causes and four improvements, in both layouts");
  ok(["causes-field", "improvements-field", "priority-field", "justify-field"].every((x) => ids(m1, key21).includes(x)), "Block 2.1 from empty names the causes, the improvements, the priority and the justification");
  ok(ids(r1Missing(p1), key21).length === 0 && taskBlocks(p1).b21, "the model answers complete Block 2.1");
  const tbl21 = withKey(p0, { causeMode: "table" as const });
  ok(causeCount(tbl21.d3.r1) === CAUSES_N && improvementCount(tbl21.d3.r1) === IMPROVEMENTS_N && ids(r1Missing(tbl21), key21).length === 0 && taskBlocks(tbl21).b21, "the model table completes Block 2.1 in the table layout");
  const gap21 = withKey(p0, { causeMode: "table" as const, causeRows: KEY_D3_R1().causeRows!.map((x, i) => (i === 1 ? { ...x, improvement: "" } : x)) });
  ok(r1Missing(gap21).some((x) => x.id === "cause-row-1") && improvementCount(gap21.d3.r1) === 3, "a table row without its improvement is named (row 2) and does not count");
  ok(ids(r1Missing(withKey(p0, { causeMode: "table" as const, causeRows: emptyD3R1().causeRows })), /^cause-row/).length === CAUSES_N, "in the table layout, full text boxes do not count");
  const doc = analysisBody(p1);
  ok(doc.includes(KEY_D3_R1().feel!.slice(0, 20)) && doc.includes(KEY_D3_R1().justify!.slice(0, 20)) && doc.includes(KEY_D3_R1().priority!.slice(0, 15)), "the export prints how it feels, the priority and the justification");

  // 7 · Route 2 · Block 3.1 (plan UE8-10): six items
  ok(listLines(KEY_D3_R2().measures ?? "").length === MEASURES_N, "the model answer holds three prioritised measures");
  ok(r2Missing(withKey(p0, {}, { measures: "1. Only one measure here" })).some((m) => m.id === "measures-field" && /1/.test(m.label)), "fewer than three measures are named with the count");
  ok(r2Missing(withKey(p0, {}, { logic: "" })).some((m) => m.id === "logic-field") && r2Missing(withKey(p0, {}, { uncertain: "too short" })).some((m) => m.id === "uncertain-field"), "an empty decision logic and a too-short decision under uncertainty are named");
  const memo = memoBody(p1);
  ok([KEY_D3_R2().strategy!.slice(0, 20), KEY_D3_R2().riskText!.slice(0, 20), KEY_D3_R2().logic!.slice(0, 20), KEY_D3_R2().definition!.slice(0, 20)].every((x) => memo.includes(x)), "the memo prints the answers");

  // 7b · the guided tables (DL-STANDARD section 15): a hint per column, one example row that is not an answer, the layout counts alone
  const guides = [
    { name: "problems", g: PROBLEMS_GUIDE, keys: ["first", "side"], model: [KEY_D3_R1().problemRows![0].problem, KEY_D3_R1().problemRows![0].side] },
    { name: "assessment", g: ASSESS_GUIDE, keys: ["first", "impact", "effort", "risk"], model: Object.values(KEY_D3_R1().assessRows!.C) },
    { name: "causes", g: CAUSES_GUIDE, keys: ["first", "improvement"], model: [KEY_D3_R1().causeRows![0].cause, KEY_D3_R1().causeRows![0].improvement] },
    { name: "measures", g: MEASURES_GUIDE, keys: ["first", "measure", "why"], model: [] as string[] },
    { name: "risk", g: RISK_GUIDE, keys: ["first", "goes", "action"], model: [] as string[] },
    { name: "logic", g: LOGIC_GUIDE, keys: ["first", "text"], model: [] as string[] },
    { name: "uncertainty", g: UNC_GUIDE, keys: ["first", "text"], model: [] as string[] },
  ];
  ok(guides.every((x) => x.keys.every((k) => (x.g.hints[k] ?? "").length > 8) && Object.values(x.g.example.cells).every((c) => c.length > 8) && x.g.example.first.length >= 1), "every guided table has a hint for every column and a filled example row");
  ok(guides.every((x) => x.model.every((m) => !Object.values(x.g.example.cells).includes(m) && m !== x.g.example.first)), "the grey example row is never a model answer");
  ok(Object.keys(ASSESS_GUIDE.suggest ?? {}).join() === "impact,effort,risk" && ASSESS_GUIDE.suggest!.impact.values.length === 3, "the assessment offers a Low, Medium, High scale on its three columns, and no other table does");
  ok(cellText("Medium: ") === "" && cellText("Medium: it costs little") === "it costs little", "a scale word alone is not an answer");
  const r2 = KEY_D3_R2();
  ok((r2.measureRows ?? []).length === 3 && (r2.riskRows ?? []).length === 2 && (r2.logicRows ?? []).length === 3 && (r2.uncRows ?? []).length === 3, "the model fills every fixed row of the four Route 2 tables");
  const tblAll = { measureMode: "table" as const, riskMode: "table" as const, logicMode: "table" as const, uncMode: "table" as const };
  const wipe = { measures: "", riskText: "", logic: "", uncertain: "" };
  const t2 = withKey(p0, {}, { ...tblAll, ...wipe });
  ok(r2Missing(t2).length === 0 && taskBlocks(t2).b31 && measureCount(t2.d3.r2) === MEASURES_N, "the model tables leave nothing missing in the table layout, with every text box empty");
  const text2 = withKey(p0, {}, { measureRows: emptyD3R2().measureRows, riskRows: emptyD3R2().riskRows, logicRows: emptyD3R2().logicRows, uncRows: emptyD3R2().uncRows });
  ok(r2Missing(text2).length === 0, "in the text layout, empty tables do not matter");
  ok(ids(r2Missing(withKey(p0, {}, { ...tblAll, measureRows: emptyD3R2().measureRows, riskRows: emptyD3R2().riskRows, logicRows: emptyD3R2().logicRows, uncRows: emptyD3R2().uncRows })), /-row-/).length === 3 + 2 + 3 + 3, "in the table layout, full text boxes do not count: every row is named");
  const part = withKey(p0, {}, { ...tblAll, ...wipe, measureRows: KEY_D3_R2().measureRows!.map((x, i) => (i === 1 ? { ...x, why: "" } : x)) });
  ok(r2Missing(part).some((m) => m.id === "measures-row-1" && /2/.test(m.label)) && measureCount(part.d3.r2) === 2 && !taskBlocks(part).b31, "a measure row without its reason is named (priority 2) and does not count");
  const scaleOnly = withKey(p0, { assessMode: "table" as const, assessRows: { ...KEY_D3_R1().assessRows!, A: { impact: "Medium: ", effort: "Low", risk: "High: a short reason" } } });
  ok(r1Missing(scaleOnly).some((m) => m.id === "assess-A") && !r1Missing(scaleOnly).some((m) => m.id === "assess-B"), "an assessment cell with only a scale word is named; the next option still counts");
  const shortFrame = withKey(p0, {}, { ...tblAll, ...wipe, uncRows: [{ text: "Too short." }, ...KEY_D3_R2().uncRows!.slice(1)] });
  ok(r2Missing(shortFrame).some((m) => m.id === "uncertain-row-0") && (KEY_D3_R2().uncRows ?? []).every((x) => x.text.length >= FRAME_CELL), "a part of the decision under uncertainty shorter than a sentence is named");
  const tmemo = memoBody(t2);
  ok(tmemo.includes("<table>") && tmemo.includes(KEY_D3_R2().measureRows![0].measure.slice(0, 20)) && tmemo.includes(KEY_D3_R2().uncRows![1].text.slice(0, 20)) && !memoBody(withKey(p0)).includes("<table>"), "the memo prints a table in the table layout and none in the text layout");
  ok(!memoBody(withKey(p0, {}, { ...tblAll, measureRows: emptyD3R2().measureRows, riskRows: emptyD3R2().riskRows, logicRows: emptyD3R2().logicRows, uncRows: emptyD3R2().uncRows })).includes("<tbody>"), "an untouched table prints no empty table");

  // 8 · the export bodies are built, in this language, and never print a key or a verdict
  ok(doc.includes("Test Person") && memo.includes("Test Person"), "both documents carry the participant's name");
  ok(!/answer key|Musterlösung|expected/i.test(doc + memo), "no answer key text in an export");
  ok(!/[✓✗]/.test(doc + memo), "no tick or cross in an export");
  ok(!/€\s?\d|\d\s?€/.test(doc + memo), "no cost or budget figure in an export (the plan prints none)");
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
ok(MENTOR_PASSCODE === "muchson123", "the mentor passcode is unchanged");

// the migration (CLAUDE.md #9): an old blob with Day 1 only gets empty slices; a Day 3 slice from before #57 keeps what still fits
const old = { participant: { name: "Old" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" }, d1: { r1: {}, r2: {} } };
const migrated = migratePersisted(old, 1);
ok(!!migrated.d2 && !!migrated.d3 && migrated.participant.name === "Old", "an old blob migrates to the current shape with its name kept");
const before57 = mergeDefaults(emptyD3R1(), { improve: "kept answer about improvements", optWhy: "kept", sort: { f1: "amount" }, worst: "f1", chosen: ["m1"], causes: ["c1"] });
ok(before57.improve === "kept answer about improvements" && before57.optWhy === "kept" && before57.problemMode === "text" && before57.problemRows.length === 5 && before57.assessMode === "text" && before57.causeMode === "text" && before57.causeRows.length === 4 && before57.priority === "", "a Day 3 slice from before the rebuild keeps its answers and gets the new fields from the defaults");
ok(mergeDefaults(emptyD3R2(), { strategy: "kept strategy", picks: ["d1"] }).strategy === "kept strategy" && mergeDefaults(emptyD3R2(), { measures: 5 }).measures === "", "Route 2 keeps what fits, and a value of the wrong type is dropped");
const oldR2 = mergeDefaults(emptyD3R2(), { strategy: "kept", measures: "1. kept measure here" });
ok(oldR2.measureMode === "text" && oldR2.measureRows.length === 3 && oldR2.riskRows.length === 2 && oldR2.logicRows.length === 3 && oldR2.uncRows.length === 3 && oldR2.measures === "1. kept measure here", "an old Route 2 slice gets the table layouts from the defaults and keeps its answers");

console.log(failed ? `\n${failed} check(s) FAILED` : "\nAll checks passed");
process.exit(failed ? 1 : 0);
