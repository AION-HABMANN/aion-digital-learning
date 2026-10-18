"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import { SimButton } from "@/components/sim/SimFrame";
import { tt } from "@/lib/lang";

/**
 * "Observe the platform for real" (user request 2026-10-18, for the Digital Learning days, Route 2 first): beside the desk (the messages the Level 3 role receives),
 * an optional window onto the case platform as it is today, so the analysis can rest on something the learner has seen, not only on text. A window has views in
 * tabs: the product itself (the same simulation as in Route 1, or another view of it), what users say (their own words, in different voices), what the platform
 * records (reports, some with rows, some that say plainly that nothing is recorded) and, where the brief has competitors, what they offer. Nothing is marked, nothing is
 * ranked and no total or verdict is shown; every view is a Case assumption made up from the brief's facts. The text of the task stays sufficient: the window is never required.
 */
export type ObserveView = { id: string; name: string; node: ReactNode };

function Tabs({ views }: { views: ObserveView[] }) {
  const [cur, setCur] = useState(views[0].id);
  const v = views.find((x) => x.id === cur) ?? views[0];
  return (
    <div className="text-[#26323F]">
      <div role="tablist" aria-label={tt("What you can look at", "Was Sie ansehen können")} className="flex flex-wrap gap-1 border-b border-[#D9DEE6] bg-[#F4F6F9] px-3 py-2">
        {views.map((x) => (
          <button key={x.id} type="button" role="tab" aria-selected={cur === x.id} onClick={() => setCur(x.id)} className={clsx("min-h-[38px] rounded px-3 text-[13px]", cur === x.id ? "bg-[#3F4A58] font-semibold text-white" : "bg-white text-[#26323F] hover:bg-[#E8ECF2]")}>
            {x.name}
          </button>
        ))}
      </div>
      <div role="tabpanel" key={v.id}>{v.node}</div>
    </div>
  );
}

/** The button under the desk that opens the window. `company` is the case platform; `views` come from the day. */
export function ObserveButton({ company, views }: { company: string; views: ObserveView[] }) {
  return (
    <SimButton
      label={tt("Observe the platform for real · optional", "Die Plattform wirklich beobachten · optional")}
      sub={tt(`Look around ${company} as it is today: the product, what users say, what the platform records. If the text is enough for you, skip this and write your answers.`, `Sehen Sie sich ${company} so an, wie es heute ist: das Produkt, was Nutzer sagen, was die Plattform erfasst. Wenn Ihnen der Text genügt, überspringen Sie das und schreiben Sie Ihre Antworten.`)}
      url={`observe.${company.toLowerCase()}.example/today`}
      title={tt(`Simulation: ${company} today`, `Simulation: ${company} heute`)}
      note={tt("Simulation · Case assumption: everything here is made up from the brief's facts · nothing is marked, ranked or added up · you do not need it to answer.", "Simulation · Fallannahme: Alles hier ist aus den Fakten des Auftrags erfunden · nichts wird markiert, eingestuft oder zusammengezählt · Sie brauchen es nicht, um zu antworten.")}
    >
      {() => <Tabs views={views} />}
    </SimButton>
  );
}

/* ------------------------------------------------------------------ what users say */

export type Voice = { who: string; meta: string; text: string };

/** The messages of users in their own words, as a support or feedback inbox shows them. Different voices, no summary, no verdict. */
export function VoicesView({ intro, voices }: { intro: string; voices: Voice[] }) {
  return (
    <div className="space-y-2 p-3">
      <p className="text-[13px] text-[#5F5E5A]">{intro}</p>
      <ul className="space-y-2">
        {voices.map((v) => (
          <li key={v.who + v.text} className="rounded border border-[#D9DEE6] bg-white p-3">
            <p className="text-[12px] text-[#5F5E5A]"><span className="font-semibold text-[#26323F]">{v.who}</span> · {v.meta}</p>
            <p className="mt-1 text-[14px] leading-relaxed">“{v.text}”</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ what the platform records */

export type Report = { name: string; head?: string[]; rows?: string[][]; note?: string };

/**
 * An analytics console: a list of reports, each opened on its own. A report that exists shows its rows as they are (never added up or charted); a report the platform
 * does not have says so in one plain sentence. The learner sees what can and cannot be known, instead of reading it.
 */
export function RecordsView({ intro, reports }: { intro: string; reports: Report[] }) {
  const [cur, setCur] = useState(0);
  const r = reports[cur];
  return (
    <div className="grid gap-0 sm:grid-cols-[210px_1fr]">
      <div className="border-b border-[#D9DEE6] bg-[#F7F8FA] p-2 sm:border-b-0 sm:border-r">
        <p className="px-1 pb-1 text-[12px] text-[#5F5E5A]">{intro}</p>
        <ul aria-label={tt("Reports", "Berichte")}>
          {reports.map((x, i) => (
            <li key={x.name}>
              <button type="button" aria-current={cur === i} onClick={() => setCur(i)} className={clsx("block min-h-[40px] w-full rounded px-2 py-1 text-left text-[13px]", cur === i ? "bg-white font-semibold shadow-sm" : "hover:bg-white")}>
                {x.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="min-w-0 p-3">
        <h3 className="text-[15px] font-semibold">{r.name}</h3>
        {r.rows && r.head ? (
          <div className="mt-2 overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="bg-[#F1F3F6] text-left">
                  {r.head.map((h) => (
                    <th key={h} className="border border-[#D9DEE6] px-2 py-1.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {r.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((c, j) => (
                      <td key={j} className="border border-[#D9DEE6] px-2 py-1.5">{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-2 rounded border border-dashed border-[#B8C0CC] bg-[#FAFBFC] px-3 py-4 text-[14px]">{r.note ?? tt("The platform has no report of this kind: it does not record this.", "Die Plattform hat keinen Bericht dieser Art: Sie erfasst das nicht.")}</p>
        )}
        {r.rows && r.note && <p className="mt-2 text-[12px] text-[#5F5E5A]">{r.note}</p>}
      </div>
    </div>
  );
}
