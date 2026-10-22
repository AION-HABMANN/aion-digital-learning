import type { Blk, PlatformCfg, PPage } from "@/components/sim/PlatformSim";
import { LESSON_TEXTS } from "@/components/sim/lessonText";
import { footerOf } from "@/components/sim/courseKit";
import { tt } from "@/lib/lang";

/**
 * Day 11 · a competitor of GameLearn as the brief describes them: "competitors make heavy use of gamification", which the known-and-open box settles as points, badges and a
 * ranking on every screen (DL-STANDARD v1.8, section 4: a public competitor page in the Route 2 window). QuestUp is made up; its claims are its own marketing, and the brief says
 * their evidence cannot be seen, so the site shows none: no figure, no result, no rating. Every menu entry and button opens a real page.
 */
const N = 4;
const xp = (v: string[]) => 120 + v.filter((k) => k.startsWith("q")).length * 20;
const PLAYERS = [["Lea M.", 940], ["Sam K.", 910], ["Mia B.", 760], ["Tom R.", 640], ["Ali S.", 610]] as const;

export const competitor = (): PlatformCfg => {
  const titles = LESSON_TEXTS().map((l) => l.title);
  const lessons: Record<string, PPage> = {};
  for (let i = 0; i < N; i++) {
    lessons[`q${i}`] = {
      title: titles[i],
      crumb: tt(`Quest ${i + 1}`, `Quest ${i + 1}`),
      section: "quests",
      blocks: [
        { t: "meta", items: [tt(`Quest ${i + 1} of ${N}`, `Quest ${i + 1} von ${N}`), tt("+20 XP", "+20 XP"), tt("Keeps your streak", "Hält Ihren Streak")] },
        { t: "h", text: titles[i] },
        { t: "p", text: LESSON_TEXTS()[i].text },
        { t: "quiz", q: tt("Bonus question for +5 XP: who should name the first number?", "Bonusfrage für +5 XP: Wer sollte die erste Zahl nennen?"), options: [tt("You", "Sie"), tt("The other side", "Die andere Seite")], right: 0, why: tt("The first number pulls the talk toward it. +5 XP.", "Die erste Zahl zieht das Gespräch zu sich. +5 XP.") },
        { t: "note", title: tt("Quest complete: +20 XP", "Quest geschafft: +20 XP"), text: tt("Your streak continues. Two more quests to the next badge.", "Ihr Streak geht weiter. Noch zwei Quests bis zum nächsten Abzeichen.") },
        { t: "links", items: [...(i + 1 < N ? [{ label: tt(`Next quest: ${titles[i + 1]}`, `Nächste Quest: ${titles[i + 1]}`), go: `q${i + 1}` }] : []), { label: tt("See the league", "Liga ansehen"), go: "league" }] },
      ],
    };
  }
  const board: Blk = { t: "table", head: [tt("Rank", "Rang"), tt("Name", "Name"), tt("XP this week", "XP diese Woche")], rows: PLAYERS.map(([n, p], i) => [String(i + 1), n, String(p)]) };
  return {
    name: "QuestUp",
    start: "home",
    color: "#B4471F",
    header: (v) => tt(`🔥 4-day streak · ${xp(v)} XP · Silver league`, `🔥 4-Tage-Streak · ${xp(v)} XP · Silberliga`),
    nav: [{ label: tt("Home", "Start"), go: "home" }, { label: tt("Quests", "Quests"), go: "quests" }, { label: tt("League", "Liga"), go: "league" }, { label: tt("Badges", "Abzeichen"), go: "badges" }, { label: tt("Why QuestUp", "Warum QuestUp"), go: "why" }],
    footer: footerOf("QuestUp"),
    pages: {
      home: {
        title: tt("Home", "Start"),
        section: "home",
        blocks: [
          { t: "hero", kicker: tt("QuestUp · learning for teams", "QuestUp · Lernen für Teams"), title: tt("Learning that feels like a game", "Lernen, das sich wie ein Spiel anfühlt"), text: tt("Every lesson is a quest. Collect XP, keep your streak, climb the league and unlock badges with your colleagues.", "Jede Lektion ist eine Quest. Sammeln Sie XP, halten Sie Ihren Streak, steigen Sie in der Liga auf und schalten Sie mit Ihren Kolleginnen Abzeichen frei."), button: { label: tt("Start today's quest", "Heutige Quest starten"), go: "q0" } },
          { t: "meta", items: [tt("XP on every screen", "XP auf jeder Seite"), tt("Weekly leagues", "Wöchentliche Ligen"), tt("Daily streaks", "Tägliche Streaks"), tt("Badges", "Abzeichen")] },
          { t: "sub", text: tt("Your league this week", "Ihre Liga diese Woche") },
          board,
          { t: "sub", text: tt("Popular quest lines", "Beliebte Questreihen") },
          { t: "cards", items: [{ title: tt("Negotiation basics", "Verhandlungsgrundlagen"), tag: tt("4 quests", "4 Quests"), text: tt("From your first offer to the close, one quest at a time.", "Vom ersten Angebot bis zum Abschluss, eine Quest nach der anderen."), meta: tt("+80 XP · badge “Deal maker”", "+80 XP · Abzeichen „Dealmaker“"), go: "quests" }, { title: tt("Feedback that lands", "Feedback, das ankommt"), tag: tt("Coming soon", "Bald verfügbar"), text: tt("Unlocks when you reach the Gold league.", "Wird freigeschaltet, wenn Sie die Goldliga erreichen."), meta: tt("+60 XP", "+60 XP"), go: "league" }] },
        ],
      },
      quests: {
        title: tt("Quests", "Quests"),
        crumb: tt("Quests", "Quests"),
        section: "quests",
        blocks: [
          { t: "h", text: tt("Negotiation basics · quest line", "Verhandlungsgrundlagen · Questreihe") },
          { t: "progress", label: tt("Quests done", "Erledigte Quests"), of: Array.from({ length: N }, (_, i) => `q${i}`) },
          { t: "links", items: titles.slice(0, N).map((l, i) => ({ label: `${i + 1}. ${l}`, go: `q${i}`, track: true, sub: "+20 XP" })) },
        ],
      },
      ...lessons,
      league: { title: tt("League", "Liga"), crumb: tt("League", "Liga"), section: "league", blocks: [{ t: "h", text: tt("Silver league · this week", "Silberliga · diese Woche") }, { t: "p", text: tt("The top three move up to Gold on Sunday. The bottom two move down.", "Die ersten drei steigen am Sonntag in die Goldliga auf. Die letzten zwei steigen ab.") }, board, { t: "p", text: tt("The names are made up.", "Die Namen sind erfunden."), size: 12 }] },
      badges: { title: tt("Badges", "Abzeichen"), crumb: tt("Badges", "Abzeichen"), section: "badges", blocks: [{ t: "h", text: tt("Your badges", "Ihre Abzeichen") }, { t: "table", head: [tt("Badge", "Abzeichen"), tt("How to get it", "So bekommen Sie es"), tt("Status", "Status")], rows: [[tt("Early bird", "Frühaufsteher"), tt("Finish a quest before 8 am", "Eine Quest vor 8 Uhr beenden"), tt("earned", "erhalten")], [tt("On fire", "In Flammen"), tt("Keep a 7-day streak", "Einen 7-Tage-Streak halten"), tt("4 of 7 days", "4 von 7 Tagen")], [tt("Deal maker", "Dealmaker"), tt("Finish the negotiation quest line", "Die Verhandlungs-Questreihe beenden"), tt("open", "offen")]] }] },
      why: {
        title: tt("Why QuestUp", "Warum QuestUp"),
        crumb: tt("Why QuestUp", "Warum QuestUp"),
        section: "why",
        blocks: [
          { t: "hero", kicker: tt("For HR and learning teams", "Für HR- und Lernteams"), title: tt("Your people will want to learn", "Ihre Leute werden lernen wollen"), text: tt("Leagues and streaks bring learners back every day. Managers see who is active at a glance.", "Ligen und Streaks bringen Lernende jeden Tag zurück. Führungskräfte sehen auf einen Blick, wer aktiv ist.") },
          { t: "quotes", items: [{ who: "Nina Vogt", role: tt("HR, retail chain", "HR, Handelskette"), text: tt("Our teams compete every week. The office talks about the league.", "Unsere Teams treten jede Woche gegeneinander an. Im Büro wird über die Liga gesprochen.") }, { who: "Paul Hahn", role: tt("Team lead, insurance", "Teamleiter, Versicherung"), text: tt("People log in every day to keep their streak.", "Die Leute melden sich jeden Tag an, um ihren Streak zu halten.") }] },
          { t: "note", title: tt("Book a demo", "Eine Demo buchen"), text: tt("We show QuestUp with your own content.", "Wir zeigen QuestUp mit Ihren eigenen Inhalten."), button: { label: tt("Request a demo", "Demo anfragen"), msg: tt("Thank you. Our team will contact you.", "Danke. Unser Team meldet sich bei Ihnen.") } },
        ],
      },
    },
  };
};
