import { t } from "@/lib/lang";

/**
 * Builders for the story comics of a day (DL-STANDARD.md section 13): a panel and a comic are written as compact pairs `[en, de]`, both languages by hand
 * (CLAUDE.md #32), and become the `Comic` the modal shows once the day wraps them in `bi(...)`. The drawings are in the day's `comicScenes.tsx`.
 */
export type P = [en: string, de: string];
type Say = [by: string, text: P, think?: boolean];

export const panel = (o: { art: string; scene: P; say: Say[]; tag: ["plain" | "teal" | "ink", P]; means: P; look?: P }) => ({
  art: o.art,
  scene: t(o.scene[0], o.scene[1]),
  speech: o.say.map(([by, text, think]) => ({ by, text: t(text[0], text[1]), ...(think ? { think: true } : {}) })),
  tag: { tone: o.tag[0], text: t(o.tag[1][0], o.tag[1][1]) },
  means: t(o.means[0], o.means[1]),
  ...(o.look ? { look: t(o.look[0], o.look[1]) } : {}),
});

export const comicOf = (o: { id: string; title: P; teaser: P; note: P; names: Record<string, P>; panels: ReturnType<typeof panel>[] }) => ({
  id: o.id,
  pixel: true as const,
  title: t(o.title[0], o.title[1]),
  teaser: t(o.teaser[0], o.teaser[1]),
  note: t(o.note[0], o.note[1]),
  names: Object.fromEntries(Object.entries(o.names).map(([k, v]) => [k, t(v[0], v[1])])),
  panels: o.panels,
});
