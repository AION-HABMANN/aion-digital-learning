/**
 * Writes the reference answers of the playground (Days 1 to 6, English) to a JSON file for the trainer documents.
 * Run from playground-dl:  copy this file to scripts/_export.tmp.ts, then
 *   npx tsx scripts/_export.tmp.ts ../materi-task-docx/_tools/trainer_export_days1-6.json
 * and delete the copy. Days 7 and 8 have no playground page yet; their answers are in trainer_data78.py.
 */
import { setCurrentLang } from "../lib/lang";
import * as fs from "fs";
const out: Record<string, unknown> = {};
async function main() {
  setCurrentLang("en");
  for (const d of [1, 2, 3, 4, 5, 6]) {
    const g = await import(`../lib/day${d}/guides`);
    const k = await import(`../lib/day${d}/answerKey`);
    const day: Record<string, unknown> = { guides: {}, keys: {} };
    for (const [n, f] of Object.entries(g)) if (typeof f === "function" && (f as Function).length === 0) (day.guides as any)[n] = (f as any)();
    for (const [n, f] of Object.entries(k)) if (typeof f === "function" && (f as Function).length === 0) (day.keys as any)[n] = (f as any)();
    out["day" + d] = day;
  }
  fs.writeFileSync(process.argv[2], JSON.stringify(out, null, 1), "utf-8");
}
main();
