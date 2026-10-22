import type { PlatformCfg, PPage } from "@/components/sim/PlatformSim";
import { LESSON_TEXTS } from "@/components/sim/lessonText";
import { footerOf } from "@/components/sim/courseKit";
import { tt } from "@/lib/lang";

/**
 * Day 12 · a competitor of AdaptLearn as the brief describes them: "competitors use adaptive systems", and how those systems perform cannot be seen (DL-STANDARD v1.8, section 4:
 * a public competitor page in the Route 2 window). PathWise is made up: a placement check, a path recommended for the learner, a switch to turn it off, and its marketing.
 * Its claims are its own; the site shows no result, no figure and no evidence, because the brief says none can be seen. Every menu entry and button opens a real page.
 */
const N = 4;

export const competitor = (): PlatformCfg => {
  const t = LESSON_TEXTS();
  const reasons = () => [
    tt("Recommended for you by PathWise, based on your answers so far.", "Von PathWise für Sie empfohlen, auf Grundlage Ihrer bisherigen Antworten."),
    tt("Recommended for you by PathWise, based on your answers so far.", "Von PathWise für Sie empfohlen, auf Grundlage Ihrer bisherigen Antworten."),
    tt("Recommended for you by PathWise, based on your answers so far.", "Von PathWise für Sie empfohlen, auf Grundlage Ihrer bisherigen Antworten."),
    tt("Recommended for you by PathWise, based on your answers so far.", "Von PathWise für Sie empfohlen, auf Grundlage Ihrer bisherigen Antworten."),
  ];
  const steps = [1, 2, 3, 5];
  const lessons: Record<string, PPage> = {};
  steps.slice(0, N).forEach((k, i) => {
    lessons[`p${i}`] = {
      title: t[k].title,
      crumb: tt(`My path › step ${i + 1}`, `Mein Pfad › Schritt ${i + 1}`),
      section: "path",
      blocks: [
        { t: "note", title: tt("For you", "Für Sie"), text: reasons()[i] },
        { t: "h", text: t[k].title },
        { t: "p", text: t[k].text },
        { t: "quiz", q: tt("Check: what does a limit tell you?", "Check: Was sagt Ihnen eine Grenze?"), options: [tt("When to walk away", "Wann Sie gehen"), tt("What the other side wants", "Was die andere Seite will")], right: 0, why: tt("A limit is the point beyond which you would rather walk away. Your path adjusts to your answer.", "Eine Grenze ist der Punkt, ab dem Sie lieber gehen. Ihr Pfad passt sich Ihrer Antwort an.") },
        { t: "links", items: [...(i + 1 < N ? [{ label: tt("Next step on my path", "Nächster Schritt auf meinem Pfad"), go: `p${i + 1}` }] : []), { label: tt("Back to my path", "Zurück zu meinem Pfad"), go: "path" }] },
      ],
    };
  });
  return {
    name: "PathWise",
    start: "home",
    color: "#1F6E6A",
    nav: [{ label: tt("Home", "Start"), go: "home" }, { label: tt("Placement check", "Einstufung"), go: "check" }, { label: tt("My path", "Mein Pfad"), go: "path" }, { label: tt("How it works", "So funktioniert es"), go: "how" }, { label: tt("Settings", "Einstellungen"), go: "settings" }],
    footer: footerOf("PathWise"),
    pages: {
      home: {
        title: tt("Home", "Start"),
        section: "home",
        blocks: [
          { t: "hero", kicker: tt("PathWise · adaptive learning", "PathWise · adaptives Lernen"), title: tt("A path that fits each learner", "Ein Pfad, der zu jeder Lernenden passt"), text: tt("A short placement check finds what each person already knows. The path then skips what they know and adds practice where they struggle.", "Ein kurzer Einstufungstest findet heraus, was jede Person schon weiß. Der Pfad überspringt dann das Bekannte und ergänzt Übung, wo es hakt."), button: { label: tt("Take the placement check", "Einstufungstest machen"), go: "check" } },
          { t: "meta", items: [tt("Placement check", "Einstufungstest"), tt("Path adapts after every answer", "Pfad passt sich nach jeder Antwort an"), tt("Built on machine learning", "Auf maschinellem Lernen aufgebaut")] },
          { t: "cards", items: [{ title: tt("Continue my path", "Meinen Pfad fortsetzen"), text: tt("Step 2 of your personal path.", "Schritt 2 Ihres persönlichen Pfads."), tag: tt("Negotiation basics", "Verhandlungsgrundlagen"), go: "p1" }, { title: tt("How PathWise decides", "Wie PathWise entscheidet"), text: tt("What the path looks at, and what you can change.", "Worauf der Pfad schaut und was Sie ändern können."), tag: tt("About", "Über"), go: "how" }] },
        ],
      },
      check: { title: tt("Placement check", "Einstufungstest"), crumb: tt("Placement check", "Einstufungstest"), section: "check", blocks: [{ t: "h", text: tt("What do you know already?", "Was wissen Sie schon?") }, { t: "quiz", q: tt("When should you write down your limit?", "Wann sollten Sie Ihre Grenze aufschreiben?"), options: [tt("Before the talk", "Vor dem Gespräch"), tt("After the first offer", "Nach dem ersten Angebot")], right: 0, why: tt("Before the talk, so the other side's number does not move it. Your path is being prepared.", "Vor dem Gespräch, damit die Zahl der anderen Seite sie nicht verschiebt. Ihr Pfad wird vorbereitet.") }, { t: "links", items: [{ label: tt("See my path", "Meinen Pfad ansehen"), go: "path" }] }] },
      path: { title: tt("My path", "Mein Pfad"), crumb: tt("My path", "Mein Pfad"), section: "path", blocks: [{ t: "h", text: tt("My path · Negotiation basics", "Mein Pfad · Verhandlungsgrundlagen") }, { t: "progress", label: tt("Steps done", "Erledigte Schritte"), of: Array.from({ length: N }, (_, i) => `p${i}`) }, { t: "links", items: steps.slice(0, N).map((k, i) => ({ label: `${i + 1}. ${t[k].title}`, go: `p${i}`, track: true, sub: [tt("skipped", "übersprungen"), tt("for you", "für Sie"), tt("next", "als Nächstes"), tt("added", "ergänzt")][i] })) }] },
      ...lessons,
      how: { title: tt("How it works", "So funktioniert es"), crumb: tt("How it works", "So funktioniert es"), section: "how", blocks: [{ t: "h", text: tt("How PathWise chooses the next step", "Wie PathWise den nächsten Schritt wählt") }, { t: "list", items: [tt("Your placement check decides where you start.", "Ihr Einstufungstest entscheidet, wo Sie beginnen."), tt("Every answer can add practice or skip a step.", "Jede Antwort kann Übung ergänzen oder einen Schritt überspringen."), tt("Our model learns from every learner on the platform.", "Unser Modell lernt von allen Lernenden auf der Plattform.")] }, { t: "faq", items: [{ q: tt("Does it work better than a fixed course?", "Wirkt es besser als ein fester Kurs?"), a: tt("Our customers tell us their learners like it. Ask us for a demo with your own content.", "Unsere Kunden sagen uns, dass ihre Lernenden es mögen. Fragen Sie uns nach einer Demo mit Ihren eigenen Inhalten.") }, { q: tt("Can a learner turn it off?", "Kann eine Lernende es ausschalten?"), a: tt("Yes, under Settings.", "Ja, unter Einstellungen.") }] }] },
      settings: { title: tt("Settings", "Einstellungen"), crumb: tt("Settings", "Einstellungen"), section: "settings", blocks: [{ t: "h", text: tt("Settings", "Einstellungen") }, { t: "toggle", label: tt("Adapt my path", "Meinen Pfad anpassen"), on: tt("Your path adapts after every answer.", "Ihr Pfad passt sich nach jeder Antwort an."), off: tt("You follow the course in its fixed order.", "Sie folgen dem Kurs in seiner festen Reihenfolge.") }] },
    },
  };
};
