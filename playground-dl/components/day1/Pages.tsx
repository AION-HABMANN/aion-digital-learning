"use client";

import Link from "next/link";
import { HashFlash } from "@/components/chrome/HashFlash";
import { PageNav } from "@/components/chrome/PageNav";
import { SectionRail } from "@/components/chrome/SectionRail";
import { MateriA, MateriB } from "@/components/day1/Materi";
import { Task1 } from "@/components/day1/Task1";
import { Task2 } from "@/components/day1/Task2";
import { SuggestedOrderBanner } from "@/components/ui/Banner";
import { ResetRoute } from "@/components/ui/ResetRoute";
import { Gloss } from "@/lib/glossify";
import { DAY_INTRO, ROUTE_CARDS, pageNav, railSections } from "@/data/day1/day";
import { COURSE, dayOf, routeHref } from "@/data/course";
import type { RouteNo } from "@/data/course";
import { dossierProgress, taskBlocks } from "@/lib/day1/progress";
import { tt } from "@/lib/lang";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated } from "@/store/useStore";

const TITLE = () => dayOf(1)!;

/* ------------------------------------------------------------------ the day's home page (CLAUDE.md #27) */

export function Day1Home() {
  const meta = TITLE();
  const total = [1, 2].reduce((s, r) => s + ROUTE_CARDS(r as RouteNo).plan.reduce((t, p) => t + p.minutes, 0), 0);
  return (
    <div className="space-y-8 pt-6">
      <header className="space-y-2">
        <p className="smallcaps text-accent">
          {meta.module} · {meta.part}
        </p>
        <h1 className="text-display">{tt("Day 1 · UX/UI for learning platforms", "Tag 1 · UX/UI für Lernplattformen")}</h1>
        <p className="max-w-prose text-body text-ash">{meta.topic}.</p>
      </header>

      <section aria-labelledby="today-h" className="card space-y-4 p-5">
        <div className="space-y-2">
          <h2 id="today-h" className="text-h2">
            {tt("What today is about", "Worum es heute geht")}
          </h2>
          <p className="max-w-prose text-body text-ink">
            <Gloss>{DAY_INTRO.about}</Gloss>
          </p>
          <p className="max-w-prose text-body text-ink">
            <Gloss>{DAY_INTRO.caseLine}</Gloss>
          </p>
        </div>
        <div className="space-y-2">
          <p className="smallcaps">{tt("One story, two routes", "Eine Geschichte, zwei Routen")}</p>
          <ol className="grid gap-3 md:grid-cols-2">
            {DAY_INTRO.story.map((st) => (
              <li key={st.route}>
                <Link href={routeHref(1, st.route)} className="block h-full space-y-1.5 rounded-lg border border-line bg-canvas p-3 transition-colors hover:border-accent">
                  <p className="smallcaps text-accent">
                    Route {st.route} · {st.verb}
                  </p>
                  <p className="text-body text-ink">
                    <Gloss>{st.question}</Gloss>
                  </p>
                  <p className="text-caption text-ash">
                    {tt("You finish with:", "Sie schließen ab mit:")} <strong className="text-ink">{st.output}</strong>
                  </p>
                </Link>
              </li>
            ))}
          </ol>
          <p className="text-caption text-ash">
            {tt(
              `${total} minutes in total across both routes, facilitator-led for the material. Route 1 and Route 2 each have two core blocks; the optional ones are folded and one click away. You finish with two documents.`,
              `Insgesamt ${total} Minuten über beide Routen, das Material moderiert. Route 1 und Route 2 haben je zwei Kernblöcke; die optionalen sind eingeklappt und einen Klick entfernt. Sie schließen mit zwei Dokumenten ab.`,
            )}
          </p>
        </div>
      </section>

      <section aria-labelledby="wiifm-h" className="card space-y-3 border-accent/40 bg-accentSoft p-5">
        <div className="space-y-1">
          <h2 id="wiifm-h" className="text-h2">
            {tt("What's in it for you", "Was Sie davon haben")}
          </h2>
          <p className="max-w-prose text-body text-ink">{tt("Each skill below is one you can use at your own desk next week, not only in this case.", "Jede Fähigkeit unten können Sie nächste Woche an Ihrem eigenen Arbeitsplatz nutzen, nicht nur in diesem Fall.")}</p>
        </div>
        <ul className="grid gap-3 md:grid-cols-2">
          {DAY_INTRO.wiifm.map((w) => (
            <li key={w.skill} className="space-y-1 rounded-lg border border-line bg-paper p-3">
              <p className="flex flex-wrap items-baseline justify-between gap-x-2">
                <span className="font-semibold text-ink">{w.skill}</span>
                <span className="text-micro font-semibold uppercase text-ash">Route {w.route}</span>
              </p>
              <p className="text-caption text-ink">
                <Gloss>{w.payoff}</Gloss>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="routes-h" className="space-y-3">
        <h2 id="routes-h" className="sr-only">
          {tt("Routes", "Routen")}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {([1, 2] as RouteNo[]).map((n) => {
            const c = ROUTE_CARDS(n);
            return (
              <Link key={n} href={routeHref(1, n)} className="card group block space-y-3 p-5 transition-shadow hover:shadow-md">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <span className="smallcaps text-accent">Route {n}</span>
                  <span className="text-micro font-semibold uppercase text-ash">{n === 1 ? tt("Levels 1 + 2", "Level 1 + 2") : tt("Level 3", "Level 3")}</span>
                </div>
                <h3 className="text-h2">{c.title}</h3>
                <p className="text-caption text-ash">{c.blurb}</p>
                <table className="w-full text-caption">
                  <caption className="sr-only">{tt(`Time plan for Route ${n}`, `Zeitplan für Route ${n}`)}</caption>
                  <tbody>
                    {c.plan.map((p) => (
                      <tr key={p.label} className="border-t border-line">
                        <td className="py-1.5">{p.label}</td>
                        <td className="tnum py-1.5 text-right text-ash">
                          {p.minutes} {tt("min", "Min.")}
                        </td>
                      </tr>
                    ))}
                    {c.optional && (
                      <tr className="border-t border-line">
                        <td className="py-1.5 text-ash" colSpan={2}>{c.optional}</td>
                      </tr>
                    )}
                    <tr className="border-t-2 border-ink font-semibold">
                      <td className="py-1.5">{tt("Core total", "Kern gesamt")}</td>
                      <td className="tnum py-1.5 text-right">
                        {c.plan.reduce((s, p) => s + p.minutes, 0)} {tt("min", "Min.")}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <span className="inline-block text-caption font-semibold text-accent group-hover:underline">{tt(`Open Route ${n} →`, `Route ${n} öffnen →`)}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="how-h" className="card space-y-2 p-5">
        <h2 id="how-h" className="text-h3">
          {tt("How this site works", "So funktioniert diese Seite")}
        </h2>
        <ol className="list-decimal space-y-1 pl-5 text-body">
          <li>{tt("Study, then task, then export: each route ends as one working document, not a quiz score. Route 1 merges Levels 1 and 2 on one case; Route 2 is Level 3.", "Lernen, dann Aufgabe, dann Export: Jede Route endet mit einem Arbeitsdokument, nicht mit einem Quiz-Ergebnis. Route 1 verbindet Level 1 und 2 an einem Fall; Route 2 ist Level 3.")}</li>
          <li>{tt("Nothing is locked. Every section and route stays open, and a suggested order is only a suggestion.", "Nichts ist gesperrt. Jeder Abschnitt und jede Route bleibt offen, und eine empfohlene Reihenfolge ist nur eine Empfehlung.")}</li>
          <li>{tt("The site shows consequences, not verdicts. It marks something only when you press a Check button, and then it gives a question, not the answer.", "Die Seite zeigt Folgen, keine Urteile. Sie markiert etwas nur, wenn Sie eine Prüfen-Schaltfläche drücken, und dann gibt sie eine Frage, nicht die Antwort.")}</li>
          <li>{tt("A different choice with a clear reason still exports: in a decision there is no single right answer.", "Eine andere Wahl mit klarer Begründung lässt sich trotzdem exportieren: Bei einer Entscheidung gibt es keine einzige richtige Antwort.")}</li>
          <li>{tt("EN | DE in the top bar switches the whole site to German. Common technical terms stay in English; every explanation is in German.", "EN | DE oben in der Leiste schaltet die ganze Seite auf Deutsch. Gängige Fachbegriffe bleiben Englisch; jede Erklärung ist auf Deutsch.")}</li>
        </ol>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ the two routes */

function useRouteProgress(route: RouteNo) {
  const p = usePersisted();
  const hydrated = useHydrated();
  const prog = dossierProgress(p, route);
  const blocks = taskBlocks(p) as unknown as Record<string, boolean>;
  const readCards = p.ui.sectionsRead;
  return { done: hydrated ? prog.done : 0, total: prog.total, blocks, readCards };
}

export function Day1Route1() {
  const pr = useRouteProgress(1);
  return (
    <div className="space-y-8 pt-4">
      <HashFlash />
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt("Day 1 · Route 1 · Levels 1 and 2 · Knowledge and application", "Tag 1 · Route 1 · Level 1 und 2 · Wissen und Anwendung")}</p>
        <h1>{tt("UX and UI for learning platforms: read the platform from the learner's side, then choose the measures", "UX und UI für Lernplattformen: die Plattform aus Sicht der Lernenden lesen, dann die Maßnahmen wählen")}</h1>
      </header>
      <SuggestedOrderBanner
        routeKey="d1r1"
        text={tt("Materi A (all five cards, four are core) → the UX Analysis task, one case in two parts (read the platform, choose measures), with two core blocks. Every section stays open, so you can start anywhere.", "Materi A (alle fünf Karten, vier sind Kern) → die Aufgabe UX Analysis, ein Fall in zwei Teilen (die Plattform lesen, Maßnahmen wählen), mit zwei Kernblöcken. Jeder Abschnitt bleibt offen, Sie können überall beginnen.")}
      />
      <SectionRail route={1} sections={railSections(1)} done={pr.done} total={pr.total} />
      <PageNav route={1} groups={pageNav(1)} readCards={pr.readCards} blocks={pr.blocks} />
      <MateriA />
      <Task1 />
      <ResetRoute day={1} route={1} />
    </div>
  );
}

export function Day1Route2() {
  const pr = useRouteProgress(2);
  return (
    <div className="space-y-8 pt-4">
      <HashFlash />
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt("Day 1 · Route 2 · Level 3 · Management decision", "Tag 1 · Route 2 · Level 3 · Managemententscheidung")}</p>
        <h1>{tt("UX as a strategic decision: vision, three decisions, the risk, and what you give up", "UX als strategische Entscheidung: Vision, drei Entscheidungen, das Risiko und worauf Sie verzichten")}</h1>
      </header>
      <SuggestedOrderBanner
        routeKey="d1r2"
        text={tt("Materi B (three cards) → the UX Strategy task, one frame with two core blocks and a memo that builds below. Route 1 is a good start but not needed; every section stays open.", "Materi B (drei Karten) → die Aufgabe UX Strategy, ein Rahmen mit zwei Kernblöcken und einem Memo, das darunter entsteht. Route 1 ist ein guter Einstieg, aber nicht nötig; jeder Abschnitt bleibt offen.")}
      />
      <SectionRail route={2} sections={railSections(2)} done={pr.done} total={pr.total} />
      <PageNav route={2} groups={pageNav(2)} readCards={pr.readCards} blocks={pr.blocks} />
      <MateriB />
      <Task2 />
      <ResetRoute day={1} route={2} />
    </div>
  );
}

/* ------------------------------------------------------------------ a day that is not built yet (CLAUDE.md #12) */

export function DayPlaceholder({ n }: { n: number }) {
  const meta = dayOf(n);
  return (
    <div className="space-y-4 pt-6">
      <p className="smallcaps text-accent">
        {meta ? `${meta.module} · ${meta.part}` : ""}
      </p>
      <h1>{tt(`Day ${n}`, `Tag ${n}`)}</h1>
      <p className="max-w-prose text-body text-ash">{meta?.topic}.</p>
      <div className="card max-w-prose p-4 text-body">
        <p>{tt("This day is not built yet. Its place is kept here so the shape of the course does not change when it is filled in. Nothing is locked: Day 1 is open.", "Dieser Tag ist noch nicht gebaut. Sein Platz ist hier reserviert, damit sich die Form des Kurses nicht ändert, wenn er gefüllt wird. Nichts ist gesperrt: Tag 1 ist offen.")}</p>
        <p className="mt-2">
          <Link href="/day/1/" className="font-semibold text-accent underline decoration-dotted underline-offset-2">
            {tt("Open Day 1 →", "Tag 1 öffnen →")}
          </Link>
        </p>
      </div>
      <p className="text-caption text-ash">{COURSE.course}</p>
    </div>
  );
}
