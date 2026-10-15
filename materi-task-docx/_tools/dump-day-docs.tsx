/**
 * Dumps the study cards and evidence screens of a generic day (Days 9 to 16) as plain JSON plus SVG files, for the Word documents.
 * Run from playground-dl:  copy this file to scripts/_dd.tmp.tsx, then
 *   npx tsx scripts/_dd.tmp.tsx ../materi-task-docx/_work 9 10 11 ...   and delete the copy.
 * It calls the card components as plain functions (they only build elements) and reads the props of the shared figures; the mock pictures are rendered to SVG.
 */
import * as R from "react";
import * as fs from "fs";
import * as path from "path";
(globalThis as any).React = R;

const FIGS = ["StateFig", "SwitchFig", "WeighFig", "MatrixStory", "ChainFig", "DecisionFrameFig"];

async function main() {
  const out = process.argv[2];
  const days = process.argv.slice(3).map(Number);
  const { setCurrentLang } = await import("../lib/lang");
  const { renderToStaticMarkup } = await import("react-dom/server");
  setCurrentLang("en");
  fs.mkdirSync(path.join(out, "svg"), { recursive: true });
  fs.mkdirSync(path.join(out, "dump"), { recursive: true });

  const kids = (n: any): any[] => (Array.isArray(n) ? n.flatMap(kids) : n === null || n === undefined || n === false ? [] : [n]);
  const txt = (n: any): string => kids(n).map((c) => (typeof c === "string" || typeof c === "number" ? String(c) : c?.props ? txt(c.props.children) : "")).join("");
  const paras = (n: any): string[] => kids(n).flatMap((c) => (c?.type === "p" ? [txt(c.props.children)] : c?.props ? paras(c.props.children) : typeof c === "string" ? [c] : []));

  for (const day of days) {
    const Cards: any = await import(`../components/day${day}/Cards`);
    const { KIT }: any = await import(`../components/day${day}/kit`);
    let svgN = 0;
    const saveSvg = (el: any, tag: string) => {
      const name = `d${day}_${tag}_${svgN++}.svg`;
      const s = renderToStaticMarkup(el).replace(/<svg /, '<svg xmlns="http://www.w3.org/2000/svg" ');
      fs.writeFileSync(path.join(out, "svg", name), s, "utf-8");
      return name;
    };
    const describe = (name: string, p: any, tag: string): any => {
      if (name === "StateFig")
        return { fig: name, label: p.label, point: p.point, steps: p.steps, caption: p.caption && p.caption.type ? saveSvg(p.caption, tag) : null, states: p.states.map((s: any) => ({ id: s.id, button: s.button, insight: s.insight, svg: saveSvg(s.picture, tag) })) };
      if (name === "SwitchFig") {
        const off = p.start;
        const on = Object.fromEntries(p.switches.map((s: any) => [s.id, true]));
        return { fig: name, label: p.label, point: p.point, switches: p.switches, steps: p.steps.map((s: any) => ({ title: s.title, say: s.say, look: s.look })), off: { svg: saveSvg(p.picture(off), tag), insight: p.insight(off) }, on: { svg: saveSvg(p.picture(on), tag), insight: p.insight(on) } };
      }
      if (name === "WeighFig")
        return { fig: name, label: p.label, point: p.point, company: p.company, budget: p.budget, bands: p.bands, impactLabel: p.impactLabel, steps: p.steps, items: p.items.map((i: any) => ({ id: i.id, name: i.name, cost: i.cost, band: p.band(i.cost), impact: i.impact, effortReason: i.effortReason, risk: i.risk })) };
      if (name === "MatrixStory") return { fig: name, label: p.label, point: p.point, title: p.title, xLabel: p.xLabel, yLabel: p.yLabel, quads: p.quads, points: p.points, steps: p.steps };
      if (name === "ChainFig") return { fig: name, label: p.label, steps: p.steps, caption: p.caption };
      if (name === "DecisionFrameFig") return { fig: name, label: p.label, caption: p.caption, boxes: p.boxes, rule: p.rule };
      throw new Error(name);
    };
    const expand = (el: any, tag: string): any => {
      const name = el.type?.name ?? String(el.type);
      if (FIGS.includes(name)) return describe(name, el.props, tag);
      if (/(Mock|Screen)$/.test(name)) return { fig: "Svg", label: el.props.label ?? "", svg: saveSvg(el, tag) };
      if (typeof el.type !== "function") {
        const html = renderToStaticMarkup(el);
        console.log("  HTML figure in", day, tag, html.length, (html.match(/<svg/g) || []).length, "svg");
        const svgs = (html.match(/<svg[\s\S]*?<\/svg>/g) || []).map((x: string) => {
          const name = `d${day}_${tag}_${svgN++}.svg`;
          fs.writeFileSync(path.join(out, "svg", name), x.replace(/<svg /, '<svg xmlns="http://www.w3.org/2000/svg" '), "utf-8");
          return name;
        });
        return { fig: "Html", label: txt(el.props.children).slice(0, 80), svgs, text: html.replace(/<svg[\s\S]*?<\/svg>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() };
      }
      return expand(el.type(el.props), tag);
    };

    const cards: any = {};
    for (const id of ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3"]) {
      const card: any = Cards[`Card${id}`]();
      const p = card.props;
      const items: any[] = [];
      for (const c of kids(p.children)) {
        const n = c.type?.name ?? String(c.type);
        if (n === "DataTable") items.push({ k: "table", caption: c.props.caption, head: c.props.head, rows: c.props.rows });
        else if (n === "Callout") items.push({ k: "callout", label: c.props.label, text: paras(c.props.children).join("\n\n") });
        else if (n === "Extra") {
          const sm: any = c.type(c.props);
          items.push({ k: "extra", paras: paras(sm.props.children) });
        } else items.push({ k: "fig", ...expand(c, id.toLowerCase()) });
      }
      cards[id] = { scan: p.scan, sources: p.sources, reasoning: p.reasoning, items };
    }
    const ev: any = KIT.Evidence();
    const evidence: any[] = [];
    const walk = (n: any) => {
      for (const c of kids(n)) {
        if (!c?.props) continue;
        const nm = c.type?.name ?? "";
        if (/Screen$/.test(nm)) evidence.push({ svg: saveSvg(c, "ev"), kind: c.props.kind });
        else walk(c.props.children);
      }
    };
    walk(ev.props.children);
    // captions: the <p> after each screen
    const caps: string[] = [];
    const walkCap = (n: any) => {
      for (const c of kids(n)) {
        if (!c?.props) continue;
        if (c.type === "p" && /font-bold/.test(c.props.className || "")) caps.push(txt(c.props.children));
        else walkCap(c.props.children);
      }
    };
    walkCap(ev.props.children);
    evidence.forEach((e, i) => (e.caption = caps[i] ?? ""));
    fs.writeFileSync(path.join(out, "dump", `day${day}.json`), JSON.stringify({ cards, evidence, evidenceLabel: ev.props.label }, null, 1), "utf-8");
    console.log("day", day, "cards", Object.keys(cards).length, "svgs", svgN, "evidence", evidence.length);
  }
}
main();
