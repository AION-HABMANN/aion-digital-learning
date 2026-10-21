/**
 * Verification of the mini-platforms (DL-STANDARD v1.7, section 4): for every day, every platform (today and each option) in both languages, every link leads to a page that
 * exists, every page is reachable from the start or the menu, no page is empty, and no text prints a price. Run with `npm run verify:platforms`. It needs no browser.
 */
import { platformIssues } from "../components/sim/PlatformSim";
import type { PlatformCfg } from "../components/sim/PlatformSim";
import * as d7 from "../data/day7/platforms";
import * as d8 from "../data/day8/platforms";
import * as d9 from "../data/day9/platforms";
import * as d10 from "../data/day10/platforms";
import { setCurrentLang } from "../lib/lang";

const DAYS: Record<string, Record<string, () => PlatformCfg>> = {
  "Day 7": { today: d7.today, A: d7.optionA, B: d7.optionB, C: d7.optionC },
  "Day 8": { today: d8.today, A: d8.optionA, B: d8.optionB, C: d8.optionC },
  "Day 9": { today: d9.today, A: d9.optionA, B: d9.optionB, C: d9.optionC },
  "Day 10": { today: () => d10.today(), phone: () => d10.today(true), A: d10.optionA, B: d10.optionB, C: d10.optionC },
};

let bad = 0;
const ok = (m: string) => console.log("ok    " + m);
const fail = (m: string) => { bad++; console.log("FAIL  " + m); };

for (const lang of ["en", "de"] as const) {
  setCurrentLang(lang);
  for (const [day, cfgs] of Object.entries(DAYS)) {
    for (const [name, make] of Object.entries(cfgs)) {
      const cfg = make();
      const issues = platformIssues(cfg);
      const text = JSON.stringify(cfg);
      if (/€|undefined|\[object/.test(text)) issues.push(`${day} ${name}: prints a price or an undefined value`);
      if (issues.length) issues.forEach((i) => fail(`${lang} ${day} ${name}: ${i}`));
      else ok(`${lang} ${day} · ${name}: ${Object.keys(cfg.pages).length} pages, every link leads to a page, every page is reachable`);
    }
  }
}
console.log(bad ? `\n${bad} check(s) failed` : "\nAll checks passed");
process.exit(bad ? 1 : 0);
