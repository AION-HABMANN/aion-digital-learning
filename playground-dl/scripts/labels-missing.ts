/**
 * Lists the in-drawing labels of a day's pixel comics that have no German entry: `npx tsx scripts/labels-missing.ts 11`. It draws every scene in German and collects the
 * warnings of `pixelLabel` (components/comic/pixelLabels.ts). Add what it lists to `components/comic/pixelLabelsMore.ts`.
 */
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { setCurrentLang } from "../lib/lang";

(globalThis as unknown as { React: unknown }).React = React;

async function main() {
  const day = process.argv[2];
  const mod = await import(`../components/day${day}/comicScenes`);
  const art = mod[`ART_D${day}`] as Record<string, unknown>;
  setCurrentLang("de");
  const missing = new Set<string>();
  const warn = console.warn;
  console.warn = (...a: unknown[]) => {
    const m = String(a[0]);
    if (m.includes("[pixel label without German]")) missing.add(String(a[1]));
    else warn(...a);
  };
  for (const [k, node] of Object.entries(art)) {
    try { renderToStaticMarkup(node as never); } catch (e) { console.log("could not draw", k, String(e).slice(0, 80)); }
  }
  console.warn = warn;
  console.log(`${missing.size} labels without German`);
  for (const m of [...missing].sort()) console.log(`  ${JSON.stringify(m)}: "",`);
}
main();
