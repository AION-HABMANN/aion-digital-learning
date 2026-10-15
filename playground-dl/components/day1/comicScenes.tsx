import type { ReactNode } from "react";
import { BLUE, Check, Cross, Dots, Floor, GREY, INK, LINE, PAPER, Person, QMark, RUST, SOFT, Scene, Screen, TEAL } from "@/components/comic/ComicKit";
import { tt } from "@/lib/lang";

/** The drawings of the Day 1 comics (data/day1/comics.ts). Numerals, names and one-word labels only, written with tt() so both languages read. */

type TProps = { x: number; y: number; children: ReactNode; size?: number; bold?: boolean; anchor?: "start" | "middle" | "end"; fill?: string };
const T = ({ x, y, children, size = 12, bold = false, anchor = "middle", fill = INK }: TProps) => (
  <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={bold ? 700 : 400} fill={fill}>
    {children}
  </text>
);

const Clock = ({ x, y, label }: { x: number; y: number; label: string }) => (
  <>
    <circle cx={x} cy={y} r="17" fill={PAPER} stroke={INK} strokeWidth="1.5" />
    <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={INK}>
      {label}
    </text>
  </>
);

/** Three rated rows (Dots plus the word) under a title and a price: the weighing card of A5. */
function RatingCard({ x, y, w, title, price, rows }: { x: number; y: number; w: number; title: string; price: string; rows: [string, number, string][] }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={26 + rows.length * 24 + 8} rx="6" fill={PAPER} stroke={GREY} strokeWidth="1.4" />
      <T x={x + 10} y={y + 18} anchor="start" bold>
        {title}
      </T>
      <T x={x + w - 10} y={y + 18} anchor="end" bold fill={BLUE}>
        {price}
      </T>
      {rows.map(([label, n, word], i) => (
        <g key={label}>
          <T x={x + 10} y={y + 46 + i * 24} anchor="start">
            {label}
          </T>
          <Dots x={x + w - 96} y={y + 42 + i * 24} n={n} />
          <T x={x + w - 10} y={y + 46 + i * 24} anchor="end" bold>
            {word}
          </T>
        </g>
      ))}
    </>
  );
}

const LOW = () => tt("Low", "Niedrig");
const MID = () => tt("Mid", "Mittel");
const HIGH = () => tt("High", "Hoch");

/* ------------------------------------------------------------------ A1 */

function A1Polish() {
  return (
    <Scene label={tt("Lena shows a polished course page with new colours and buttons", "Lena zeigt eine polierte Kursseite mit neuen Farben und Buttons")}>
      <Floor />
      <Person kind="lena" x={52} y={65} face="smile" legs arms="right" />
      <Screen x={104} y={20} w={200} h={140} kind="pretty" hi />
      {[BLUE, TEAL, "#4C8BE0", "#17212E"].map((c, i) => (
        <circle key={i} cx={122 + i * 22} cy={174} r="6" fill={c} />
      ))}
    </Scene>
  );
}
function A1Find() {
  return (
    <Scene label={tt("Mia looks at a menu of eight entries and cannot find her course", "Mia sieht ein Menü mit acht Einträgen und findet ihren Kurs nicht")}>
      <Floor />
      <Person kind="mia" x={52} y={65} face="worry" legs />
      <Screen x={104} y={20} w={200} h={140} kind="menu" />
      <QMark x={240} y={104} size={50} />
    </Scene>
  );
}
function A1Follow() {
  return (
    <Scene label={tt("Mia frowns at a lesson that is one wall of text", "Mia runzelt die Stirn über einer Lektion, die eine einzige Textwand ist")}>
      <Floor />
      <Person kind="mia" x={52} y={65} face="worry" legs />
      <Screen x={104} y={20} w={200} h={140} kind="wall" />
      <QMark x={294} y={22} size={26} color={RUST} />
    </Scene>
  );
}
function A1Finish() {
  return (
    <Scene label={tt("Mia walks away from a lesson that shows no progress", "Mia geht von einer Lektion weg, die keinen Fortschritt zeigt")}>
      <Floor />
      <Screen x={16} y={20} w={170} h={140} kind="wall" />
      <Cross cx={186} cy={22} />
      <path d="M196 90H224" stroke={GREY} strokeWidth="2" strokeDasharray="5 4" fill="none" />
      <path d="M218 84L226 90L218 96" stroke={GREY} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Person kind="mia" x={266} y={65} face="neutral" legs flip />
    </Scene>
  );
}
function A1Layers() {
  const steps = [tt("Find it", "Finden"), tt("Understand it", "Verstehen"), tt("Finish it", "Abschließen")];
  return (
    <Scene label={tt("A thin UI layer sits on top of a three-step experience: find it, understand it, finish it", "Eine dünne UI-Schicht liegt auf einem Erlebnis in drei Schritten: finden, verstehen, abschließen")}>
      <rect x="10" y="12" width="300" height="38" rx="8" fill={SOFT} stroke={BLUE} strokeWidth="1.4" />
      <T x={160} y={36} bold>
        {tt("UI · what you see and touch", "UI · was man sieht und anfasst")}
      </T>
      <path d="M6 62H2V176H6" fill="none" stroke={GREY} strokeWidth="1.5" />
      <T x={14} y={78} anchor="start" bold fill={TEAL}>
        {tt("UX · everything the learner goes through", "UX · alles, was die Lernenden durchlaufen")}
      </T>
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={10 + i * 104} y={92} width={92} height={70} rx="8" fill="#DCF0EE" stroke={TEAL} strokeWidth="1.4" />
          <T x={56 + i * 104} y={132} bold>
            {s}
          </T>
          {i < 2 && <path d={`M${102 + i * 104} 127H${112 + i * 104}`} stroke={TEAL} strokeWidth="2" />}
        </g>
      ))}
    </Scene>
  );
}

/* ------------------------------------------------------------------ A2 */

function A2Menu() {
  return (
    <Scene label={tt("Mia has twenty minutes and sees a menu of eight features", "Mia hat zwanzig Minuten und sieht ein Menü mit acht Funktionen")}>
      <Floor />
      <Person kind="mia" x={52} y={65} face="neutral" legs />
      <Clock x={26} y={22} label="20" />
      <Screen x={104} y={20} w={200} h={140} kind="menu" hi />
    </Scene>
  );
}
function A2Lost() {
  return (
    <Scene label={tt("Mia searches the menu, the time runs out and she closes the tab", "Mia sucht im Menü, die Zeit läuft ab, und sie schließt den Tab")}>
      <Floor />
      <Person kind="mia" x={52} y={65} face="worry" legs />
      <Clock x={26} y={22} label="3" />
      <Screen x={104} y={20} w={200} h={140} kind="menu" />
      <QMark x={238} y={104} size={46} />
      <Cross cx={304} cy={20} />
    </Scene>
  );
}
function A2Goals() {
  return (
    <Scene label={tt("The same platform with three goal cards; the first says carry on where I stopped", "Dieselbe Plattform mit drei Zielkarten; die erste sagt, dort weiterzumachen, wo man aufgehört hat")}>
      <Floor />
      <Person kind="mia" x={52} y={65} face="smile" legs />
      <Screen x={104} y={20} w={200} h={140} kind="goals" hi />
      <Check cx={304} cy={20} />
    </Scene>
  );
}
function A2Point() {
  return (
    <Scene label={tt("A menu of features next to goal cards, with a question mark between them", "Ein Funktionsmenü neben Zielkarten, mit einem Fragezeichen dazwischen")}>
      <T x={78} y={26} bold>
        {tt("The system's goal?", "Ziel des Systems?")}
      </T>
      <T x={242} y={26} bold fill={BLUE}>
        {tt("The learner's goal?", "Ziel der Lernenden?")}
      </T>
      <Screen x={14} y={38} w={128} h={110} kind="menu" />
      <Screen x={178} y={38} w={128} h={110} kind="goals" hi />
      <QMark x={160} y={104} size={40} />
    </Scene>
  );
}

/* ------------------------------------------------------------------ A3 */

function Moon() {
  return (
    <>
      <circle cx="26" cy="24" r="13" fill="#E6ECF4" stroke={GREY} />
      <circle cx="32" cy="20" r="11" fill={PAPER} />
    </>
  );
}
function A3Wall() {
  return (
    <Scene label={tt("Daniel, tired in the evening, faces one wall of text with no orientation and no progress", "Daniel, abends müde, steht vor einer Textwand ohne Orientierung und ohne Fortschritt")}>
      <Floor />
      <Person kind="daniel" x={52} y={65} face="worry" legs />
      <Moon />
      <Screen x={104} y={20} w={200} h={140} kind="wall" />
    </Scene>
  );
}
function A3Orient() {
  return (
    <Scene label={tt("The lesson now has a top bar with the lesson number and a next button, but the text is still a wall", "Die Lektion hat jetzt eine obere Leiste mit Lektionsnummer und Weiter-Button, aber der Text ist noch eine Wand")}>
      <Floor />
      <Person kind="daniel" x={52} y={65} face="neutral" legs />
      <Screen x={104} y={20} w={200} h={140} kind="orient" hi />
    </Scene>
  );
}
function A3Light() {
  return (
    <Scene label={tt("The lesson now has a heading, short paragraphs and one explained word", "Die Lektion hat jetzt eine Überschrift, kurze Absätze und ein erklärtes Wort")}>
      <Floor />
      <Person kind="daniel" x={52} y={65} face="smile" legs />
      <Screen x={104} y={20} w={200} h={140} kind="easy" hi />
    </Scene>
  );
}
function A3Feedback() {
  return (
    <Scene label={tt("The lesson now shows three of eight lessons done and a quiz result", "Die Lektion zeigt jetzt drei von acht Lektionen erledigt und ein Quizergebnis")}>
      <Floor />
      <Person kind="daniel" x={52} y={65} face="smile" legs />
      <Screen x={104} y={20} w={200} h={140} kind="progress" hi />
      <Check cx={304} cy={20} />
    </Scene>
  );
}
function A3Three() {
  const cap = [tt("Where am I?", "Wo bin ich?"), tt("Can I follow?", "Kann ich folgen?"), tt("Getting somewhere?", "Komme ich voran?")];
  const kinds = ["orient", "easy", "progress"] as const;
  const names = [tt("Orientation", "Orientierung"), tt("Light load", "Leichte Last"), tt("Feedback", "Feedback")];
  return (
    <Scene label={tt("Three small screens, one per principle: orientation, light load and feedback", "Drei kleine Bildschirme, einer je Prinzip: Orientierung, leichte Last und Feedback")}>
      {kinds.map((k, i) => (
        <g key={k}>
          <T x={58 + i * 102} y={20} bold size={11} fill={BLUE}>
            {cap[i]}
          </T>
          <Screen x={10 + i * 102} y={30} w={96} h={100} kind={k} hi />
          <T x={58 + i * 102} y={152} bold>
            {names[i]}
          </T>
        </g>
      ))}
    </Scene>
  );
}

/* ------------------------------------------------------------------ A4 */

function A4Bank() {
  return (
    <Scene label={tt("Mia pays an invoice in a banking app in two minutes", "Mia bezahlt eine Rechnung in einer Banking-App in zwei Minuten")}>
      <Floor />
      <Person kind="mia" x={52} y={65} face="smile" legs />
      <Screen x={104} y={30} w={130} h={110} kind="bank" />
      <Check cx={256} cy={50} r={16} />
      <Clock x={282} y={110} label="2" />
    </Scene>
  );
}
function A4Weeks() {
  return (
    <Scene label={tt("A calendar with many days: learning takes weeks and many visits", "Ein Kalender mit vielen Tagen: Lernen dauert Wochen und viele Besuche")}>
      <Floor />
      <Person kind="mia" x={52} y={65} face="neutral" legs />
      <T x={206} y={22} bold>
        {tt("Weeks, many visits", "Wochen, viele Besuche")}
      </T>
      <rect x="104" y="30" width="204" height="124" rx="6" fill={PAPER} stroke={GREY} strokeWidth="1.4" />
      {Array.from({ length: 28 }, (_, i) => (
        <rect key={i} x={112 + (i % 7) * 28} y={38 + Math.floor(i / 7) * 28} width="22" height="22" rx="4" fill={i < 17 ? "#DCF0EE" : "#F3F6FA"} stroke={i < 17 ? TEAL : LINE} />
      ))}
    </Scene>
  );
}
function A4Effort() {
  return (
    <Scene label={tt("Mia thinks about a quiz question: some effort is the point of learning", "Mia denkt über eine Quizfrage nach: Etwas Mühe ist der Sinn des Lernens")}>
      <Floor />
      <Person kind="mia" x={52} y={65} face="worry" legs />
      <circle cx="96" cy="50" r="4" fill={PAPER} stroke={INK} />
      <circle cx="108" cy="38" r="6" fill={PAPER} stroke={INK} />
      <Screen x={120} y={20} w={184} h={140} kind="quiz" hi />
    </Scene>
  );
}
function A4Guided() {
  return (
    <Scene label={tt("Left, a learner alone and lost. Right, a learner with a trainer who sees how they are doing", "Links eine Lernende allein und verirrt. Rechts ein Lernender mit Trainer, der sieht, wie er vorankommt")}>
      <Floor />
      <T x={80} y={20} bold>
        {tt("Alone", "Allein")}
      </T>
      <T x={240} y={20} bold>
        {tt("With a trainer", "Mit Trainer")}
      </T>
      <line x1="160" y1="14" x2="160" y2="176" stroke={LINE} strokeDasharray="4 4" />
      <Person kind="mia" x={70} y={68} face="worry" legs />
      <QMark x={118} y={70} size={34} />
      <Person kind="trainer" x={206} y={68} face="smile" legs arms="right" />
      <Person kind="daniel" x={284} y={68} face="smile" legs flip />
      <rect x="236" y="96" width="30" height="22" rx="3" fill={PAPER} stroke={GREY} />
      <rect x="240" y="101" width="22" height="3" fill={LINE} />
      <rect x="240" y="108" width="14" height="3" fill={TEAL} />
    </Scene>
  );
}

/* ------------------------------------------------------------------ A5 */

function A5Setup() {
  return (
    <Scene label={tt("Of 100 new learners, 30 leave in week one; three questions wait for each idea", "Von 100 neuen Lernenden gehen 30 in Woche eins; drei Fragen warten auf jede Idee")}>
      {Array.from({ length: 100 }, (_, i) => (
        <circle key={i} cx={20 + (i % 10) * 11} cy={20 + Math.floor(i / 10) * 11} r="4" fill={i < 30 ? RUST : "#8B97A8"} opacity={i < 30 ? 1 : 0.55} />
      ))}
      <T x={20} y={140} anchor="start" size={11}>
        {tt("30 of 100 leave", "30 von 100 gehen")}
      </T>
      <T x={20} y={154} anchor="start" size={11}>
        {tt("in week one", "in Woche eins")}
      </T>
      <T x={20} y={174} anchor="start" size={12} bold fill={BLUE}>
        {tt("€30,000 · 6 weeks", "30.000 € · 6 Wochen")}
      </T>
      {[tt("User impact", "Nutzerwirkung"), tt("Effort", "Aufwand"), tt("Risk", "Risiko")].map((l, i) => (
        <g key={i}>
          <rect x="160" y={16 + i * 52} width="150" height="42" rx="6" fill={PAPER} stroke={GREY} strokeWidth="1.4" />
          <T x={172} y={42 + i * 52} anchor="start" bold>
            {l}
          </T>
          <QMark x={290} y={46 + i * 52} size={26} />
        </g>
      ))}
    </Scene>
  );
}
function A5Idea1() {
  return (
    <Scene label={tt("Guided first week, €7,000: effort Low, user impact High, risk Low", "Geführte erste Woche, 7.000 €: Aufwand Niedrig, Nutzerwirkung Hoch, Risiko Niedrig")}>
      <RatingCard x={20} y={26} w={280} title={tt("Guided first week", "Geführte erste Woche")} price={tt("€7,000", "7.000 €")} rows={[[tt("User impact", "Nutzerwirkung"), 3, HIGH()], [tt("Effort", "Aufwand"), 1, LOW()], [tt("Risk", "Risiko"), 1, LOW()]]} />
      <Check cx={290} cy={20} r={12} />
    </Scene>
  );
}
function A5Idea2() {
  const rows = [8, 7, 6, 5];
  return (
    <Scene label={tt("A leaderboard: effort Mid, user impact Low, risk High; the learner at the bottom looks discouraged", "Eine Rangliste: Aufwand Mittel, Nutzerwirkung Niedrig, Risiko Hoch; die Lernende am Ende wirkt entmutigt")}>
      <rect x="10" y="22" width="104" height="146" rx="6" fill={PAPER} stroke={GREY} strokeWidth="1.4" />
      {rows.map((w, i) => (
        <g key={i}>
          <T x={22} y={46 + i * 22} anchor="start" size={11}>
            {String(i + 1)}
          </T>
          <rect x="34" y={38 + i * 22} width={w * 8} height="9" rx="3" fill={i === 0 ? BLUE : GREY} />
        </g>
      ))}
      <line x1="16" y1="126" x2="108" y2="126" stroke={LINE} />
      <circle cx="30" cy="146" r="9" fill="#E9BE98" />
      <path d="M26 149Q30 145 34 149" fill="none" stroke={INK} strokeWidth="1.4" />
      <rect x="46" y="142" width="30" height="9" rx="3" fill={RUST} />
      <RatingCard x={126} y={32} w={184} title={tt("Leaderboard", "Rangliste")} price={tt("€12,000", "12.000 €")} rows={[[tt("Impact", "Wirkung"), 1, LOW()], [tt("Effort", "Aufwand"), 2, MID()], [tt("Risk", "Risiko"), 3, HIGH()]]} />
    </Scene>
  );
}
function A5Idea3() {
  return (
    <Scene label={tt("Rewrite the catalogue, €27,000 of a €30,000 budget: effort High; most of the benefit comes after week six", "Den Katalog neu schreiben, 27.000 € von 30.000 € Budget: Aufwand Hoch; der größte Nutzen kommt nach Woche sechs")}>
      <RatingCard x={20} y={8} w={280} title={tt("Rewrite the catalogue", "Katalog neu schreiben")} price={tt("€27,000", "27.000 €")} rows={[[tt("User impact", "Nutzerwirkung"), 2, MID()], [tt("Effort", "Aufwand"), 3, HIGH()], [tt("Risk", "Risiko"), 2, MID()]]} />
      <rect x="20" y="118" width="280" height="14" rx="4" fill="#F3F6FA" stroke={GREY} />
      <rect x="20" y="118" width="252" height="14" rx="4" fill={BLUE} />
      <T x={20} y={150} anchor="start" size={11}>
        {tt("€27,000 of €30,000", "27.000 € von 30.000 €")}
      </T>
      <line x1="20" y1="172" x2="300" y2="172" stroke={GREY} strokeWidth="1.4" />
      <rect x="20" y="166" width="140" height="12" rx="3" fill={RUST} opacity="0.5" />
      <path d="M160 160V184" stroke={INK} strokeWidth="1.5" strokeDasharray="3 3" />
      <T x={90} y={187} size={11}>
        {tt("weeks 1–6: learners leave", "Woche 1–6: Lernende gehen")}
      </T>
      <T x={232} y={187} size={11}>
        {tt("benefit comes here", "Nutzen kommt hier")}
      </T>
    </Scene>
  );
}
function A5Unknown() {
  return (
    <Scene label={tt("Lena plans five short interviews to find out why newcomers leave", "Lena plant fünf kurze Interviews, um herauszufinden, warum Neue gehen")}>
      <Floor />
      <Person kind="lena" x={52} y={65} face="neutral" legs />
      {Array.from({ length: 5 }, (_, i) => (
        <g key={i}>
          <rect x={112 + (i % 3) * 66} y={30 + Math.floor(i / 3) * 52} width="58" height="40" rx="8" fill={PAPER} stroke={GREY} strokeWidth="1.4" />
          <rect x={120 + (i % 3) * 66} y={42 + Math.floor(i / 3) * 52} width="38" height="4" rx="2" fill={LINE} />
          <rect x={120 + (i % 3) * 66} y={52 + Math.floor(i / 3) * 52} width="26" height="4" rx="2" fill={LINE} />
        </g>
      ))}
      <QMark x={276} y={118} size={50} />
      <T x={276} y={146} size={11}>
        {tt("direction or time?", "Orientierung oder Zeit?")}
      </T>
    </Scene>
  );
}

/* ------------------------------------------------------------------ B1 */

function B1Ask() {
  const tiles = [tt("Completion", "Completion"), tt("Retention", "Retention"), tt("Engagement", "Engagement")];
  return (
    <Scene label={tt("The managing director and Lena face three number tiles: completion, retention, engagement", "Die Geschäftsführerin und Lena stehen vor drei Zahlenkacheln: Completion, Retention, Engagement")}>
      <Floor />
      <Person kind="md" x={36} y={65} face="neutral" legs />
      <Person kind="lena" x={284} y={65} face="smile" legs flip />
      {tiles.map((l, i) => (
        <g key={i}>
          <rect x={74 + i * 58} y={52} width="54" height="62" rx="6" fill={PAPER} stroke={GREY} strokeWidth="1.4" />
          <QMark x={101 + i * 58} y={88} size={28} />
          <T x={101 + i * 58} y={106} size={10}>
            {l}
          </T>
        </g>
      ))}
    </Scene>
  );
}
function B1Chain() {
  const rows: [string, string, string][] = [
    [tt("Clear path", "Klarer Pfad"), tt("Carry on", "Machen weiter"), tt("Completion", "Completion")],
    [tt("Easy lessons", "Verständlich"), tt("Do more", "Tun mehr"), tt("Engagement", "Engagement")],
    [tt("Progress", "Fortschritt"), tt("Come back", "Kommen wieder"), tt("Retention", "Retention")],
  ];
  return (
    <Scene label={tt("Three chains from experience to behaviour to a number", "Drei Ketten von Erlebnis über Verhalten zu einer Zahl")}>
      {rows.map((r, i) =>
        r.map((c, j) => (
          <g key={`${i}${j}`}>
            <rect x={10 + j * 104} y={14 + i * 56} width="92" height="38" rx="7" fill={j === 2 ? "#DCF0EE" : j === 1 ? "#E6ECF4" : SOFT} stroke={j === 2 ? TEAL : GREY} strokeWidth="1.4" strokeDasharray={j === 1 ? "4 3" : undefined} />
            <T x={56 + j * 104} y={37 + i * 56} bold={j === 2} size={12}>
              {c}
            </T>
            {j < 2 && <path d={`M${102 + j * 104} ${33 + i * 56}H${112 + j * 104}`} stroke={GREY} strokeWidth="2" />}
          </g>
        )),
      )}
    </Scene>
  );
}
function B1Rival() {
  return (
    <Scene label={tt("A learner moves from LearnLoop's confusing platform to a competitor's easier one", "Eine Lernende wechselt von LearnLoops verwirrender Plattform zur leichteren eines Wettbewerbers")}>
      <T x={72} y={24} bold>
        LearnLoop
      </T>
      <T x={248} y={24} bold fill={BLUE}>
        {tt("Competitor", "Wettbewerber")}
      </T>
      <Screen x={14} y={34} w={116} h={92} kind="menu" />
      <Screen x={190} y={34} w={116} h={92} kind="goals" hi />
      <Person kind="mia" x={160} y={92} s={0.9} face="neutral" legs />
      <path d="M134 80H152M168 80H186" stroke={GREY} strokeWidth="2" strokeDasharray="4 3" fill="none" />
      <path d="M180 74L188 80L180 86" stroke={GREY} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Scene>
  );
}
function B1Symptom() {
  return (
    <Scene label={tt("A drop-out line rises; a question mark sits over its cause", "Eine Abbruchlinie steigt; ein Fragezeichen steht über ihrer Ursache")}>
      <T x={20} y={22} anchor="start" bold>
        {tt("Drop-out", "Abbrüche")}
      </T>
      <line x1="24" y1="34" x2="24" y2="160" stroke={GREY} strokeWidth="1.4" />
      <line x1="24" y1="160" x2="300" y2="160" stroke={GREY} strokeWidth="1.4" />
      <polyline points="30,140 80,132 130,124 180,100 230,76 292,50" fill="none" stroke={RUST} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="292" cy="50" r="5" fill={RUST} />
      <rect x="150" y="30" width="90" height="34" rx="17" fill={PAPER} stroke={INK} strokeDasharray="4 3" />
      <QMark x={195} y={58} size={28} />
    </Scene>
  );
}

/* ------------------------------------------------------------------ B2 */

function B2Growth() {
  const chips = [tt("More marketing", "Mehr Marketing"), tt("More courses", "Mehr Kurse"), tt("Simpler navigation", "Einfachere Navigation")];
  return (
    <Scene label={tt("The managing director wants growth; three ideas wait, the first is more marketing", "Die Geschäftsführerin will Wachstum; drei Ideen warten, die erste ist mehr Marketing")}>
      <Floor />
      <Person kind="md" x={46} y={65} face="smile" legs arms="up" />
      <path d="M92 70L116 50V92Z" fill={BLUE} />
      <rect x="82" y="64" width="14" height="14" fill={BLUE} />
      {chips.map((c, i) => (
        <g key={i}>
          <rect x="140" y={26 + i * 44} width="168" height="32" rx="16" fill={i === 0 ? SOFT : PAPER} stroke={i === 0 ? BLUE : GREY} strokeWidth={i === 0 ? 2 : 1.4} />
          <T x={224} y={46 + i * 44} bold={i === 0}>
            {c}
          </T>
        </g>
      ))}
    </Scene>
  );
}
function B2Catch() {
  return (
    <Scene label={tt("New learners arrive at the same confusing platform, and many leave again", "Neue Lernende kommen zur selben verwirrenden Plattform, und viele gehen wieder")}>
      {[34, 70, 106].map((y, i) => (
        <g key={i}>
          <circle cx="24" cy={y + 10} r="9" fill="#E9BE98" />
          <path d={`M36 ${y + 10}H82`} stroke={BLUE} strokeWidth="2" />
          <path d={`M76 ${y + 4}L84 ${y + 10}L76 ${y + 16}`} stroke={BLUE} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
      <Screen x={92} y={26} w={120} h={120} kind="menu" />
      {[34, 70, 106].map((y, i) => (
        <g key={i}>
          <path d={`M216 ${y + 10}H${i === 1 ? 250 : 262}`} stroke={RUST} strokeWidth="2" strokeDasharray="4 3" />
          <circle cx={i === 1 ? 262 : 276} cy={y + 10} r="9" fill="#E9BE98" opacity={i === 1 ? 1 : 0.5} />
        </g>
      ))}
    </Scene>
  );
}
function B2Both() {
  return (
    <Scene label={tt("Simplifying the navigation turns a menu of features into clear goals", "Die Navigation zu vereinfachen macht aus einem Funktionsmenü klare Ziele")}>
      <Screen x={12} y={38} w={124} h={96} kind="menu" />
      <path d="M142 86H174" stroke={GREY} strokeWidth="2.4" fill="none" />
      <path d="M166 78L176 86L166 94" stroke={GREY} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Screen x={182} y={38} w={126} h={96} kind="goals" hi />
      <Check cx={294} cy={36} r={13} />
    </Scene>
  );
}
function B2Grid() {
  const cols = [[tt("User", "Nutzer-"), tt("value", "wert")], [tt("Business", "Geschäfts-"), tt("value", "wert")], [tt("Risk", "Risiko"), ""]];
  const rows: [string, number[]][] = [
    [tt("More courses", "Mehr Kurse"), [1, 2, 2]],
    [tt("Simple navigation", "Einfache Navigation"), [3, 2, 1]],
    [tt("More marketing", "Mehr Marketing"), [1, 2, 3]],
  ];
  return (
    <Scene label={tt("Three options rated Low, Mid or High on user value, business value and risk", "Drei Optionen mit Niedrig, Mittel oder Hoch bei Nutzerwert, Geschäftswert und Risiko bewertet")}>
      {cols.map((c, j) => (
        <g key={j}>
          <T x={159 + j * 66} y={24} size={11} bold>
            {c[0]}
          </T>
          <T x={159 + j * 66} y={38} size={11} bold>
            {c[1]}
          </T>
        </g>
      ))}
      {rows.map(([label, v], i) => (
        <g key={i}>
          <rect x="8" y={50 + i * 40} width="304" height="34" rx="6" fill={i === 1 ? SOFT : PAPER} stroke={i === 1 ? BLUE : LINE} />
          <T x={16} y={72 + i * 40} anchor="start" size={12} bold>
            {label}
          </T>
          {v.map((n, j) => (
            <Dots key={j} x={148 + j * 66} y={67 + i * 40} n={n} color={j === 2 ? RUST : BLUE} />
          ))}
        </g>
      ))}
    </Scene>
  );
}
function B2Decide() {
  return (
    <Scene label={tt("A balance with growth on one side and a usable platform on the other", "Eine Waage mit Wachstum auf der einen und einer nutzbaren Plattform auf der anderen Seite")}>
      <path d="M160 56V160M130 160H190" stroke={GREY} strokeWidth="4" strokeLinecap="round" />
      <path d="M58 62L262 50" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <circle cx="160" cy="56" r="6" fill={INK} />
      <path d="M58 62L36 112H80Z M262 50L240 100H284Z" fill="none" stroke={GREY} strokeWidth="1.4" />
      <path d="M26 112H90Q58 136 26 112Z" fill={SOFT} stroke={BLUE} strokeWidth="1.4" />
      <path d="M230 100H294Q262 124 230 100Z" fill="#DCF0EE" stroke={TEAL} strokeWidth="1.4" />
      <T x={58} y={158} bold fill={BLUE}>
        {tt("Quick growth", "Schnelles Wachstum")}
      </T>
      <T x={262} y={146} bold fill={TEAL}>
        {tt("A usable platform", "Nutzbare Plattform")}
      </T>
    </Scene>
  );
}

/* ------------------------------------------------------------------ B3 */

function B3Fog() {
  return (
    <Scene label={tt("The managing director and Lena face a data chart hidden by fog", "Die Geschäftsführerin und Lena stehen vor einem Datendiagramm, das im Nebel verschwindet")}>
      <Floor />
      <Person kind="md" x={36} y={65} face="neutral" legs />
      <Person kind="lena" x={284} y={65} face="worry" legs flip />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={92 + i * 28} y={130 - (i + 1) * 14} width="20" height={(i + 1) * 14} fill={i < 2 ? BLUE : "#C7D3E3"} />
      ))}
      <ellipse cx="190" cy="90" rx="80" ry="34" fill="#E6ECF4" opacity="0.92" stroke={GREY} />
      <QMark x={190} y={104} size={44} />
    </Scene>
  );
}
function B3Four() {
  const boxes: [string, string][] = [
    [tt("I decide", "Ich entscheide"), tt("Launch week one", "Woche eins starten")],
    [tt("I do not know", "Ich weiß nicht"), tt("Direction or time?", "Orientierung oder Zeit?")],
    [tt("I reverse if", "Ich nehme zurück, wenn"), tt("Below 25% in 6 weeks", "unter 25 % in 6 Wochen")],
    [tt("I give up", "Ich verzichte auf"), tt("The leaderboard", "die Rangliste")],
  ];
  return (
    <Scene label={tt("Four boxes: I decide, I do not know, I reverse if, I give up", "Vier Kästen: Ich entscheide, Ich weiß nicht, Ich nehme zurück, wenn, Ich verzichte auf")}>
      {boxes.map(([h, b], i) => (
        <g key={i}>
          <rect x={8 + (i % 2) * 158} y={10 + Math.floor(i / 2) * 84} width="146" height="72" rx="8" fill={i === 3 ? "#F8E4DE" : SOFT} stroke={i === 3 ? RUST : BLUE} strokeWidth="1.5" />
          <T x={81 + (i % 2) * 158} y={36 + Math.floor(i / 2) * 84} bold>
            {h}
          </T>
          <T x={81 + (i % 2) * 158} y={60 + Math.floor(i / 2) * 84} size={12}>
            {b}
          </T>
        </g>
      ))}
    </Scene>
  );
}
function B3Pre() {
  return (
    <Scene label={tt("A plan card with a cross over it and question marks: imagine it has failed, and ask why", "Eine Plankarte mit einem Kreuz darüber und Fragezeichen: Stellen Sie sich vor, sie ist gescheitert, und fragen Sie warum")}>
      <Floor />
      <Person kind="lena" x={46} y={65} face="neutral" legs arms="right" />
      <rect x="112" y="30" width="96" height="110" rx="6" fill={PAPER} stroke={GREY} strokeWidth="1.4" />
      {[48, 62, 76, 90].map((y) => (
        <rect key={y} x="124" y={y} width="72" height="5" rx="2" fill={LINE} />
      ))}
      <Cross cx={160} cy={110} r={22} />
      <Clock x={244} y={36} label="6" />
      <rect x="222" y="62" width="88" height="62" rx="16" fill={PAPER} stroke={INK} strokeDasharray="4 3" />
      <QMark x={252} y={104} size={30} />
      <QMark x={280} y={96} size={22} />
    </Scene>
  );
}
function B3Rule() {
  const cards: [string, string][] = [
    [tt("Who decides", "Wer entscheidet"), tt("UX lead + product owner", "UX Lead + Product Owner")],
    [tt("On what evidence", "Auf welcher Grundlage"), tt("Interviews, test, drop-out data", "Interviews, Test, Abbruchdaten")],
  ];
  return (
    <Scene label={tt("Two cards: who decides, and on what evidence", "Zwei Karten: wer entscheidet und auf welcher Grundlage")}>
      <Floor />
      <Person kind="lena" x={46} y={65} face="smile" legs />
      {cards.map(([h, b], i) => (
        <g key={i}>
          <rect x="96" y={18 + i * 78} width="214" height="62" rx="8" fill="#DCF0EE" stroke={TEAL} strokeWidth="1.5" />
          <T x={203} y={42 + i * 78} bold>
            {h}
          </T>
          <T x={203} y={64 + i * 78}>
            {b}
          </T>
        </g>
      ))}
    </Scene>
  );
}

export const ART_D1: Record<string, ReactNode> = {
  "a1-polish": <A1Polish />,
  "a1-find": <A1Find />,
  "a1-follow": <A1Follow />,
  "a1-finish": <A1Finish />,
  "a1-layers": <A1Layers />,
  "a2-menu": <A2Menu />,
  "a2-lost": <A2Lost />,
  "a2-goals": <A2Goals />,
  "a2-point": <A2Point />,
  "a3-wall": <A3Wall />,
  "a3-orient": <A3Orient />,
  "a3-light": <A3Light />,
  "a3-feedback": <A3Feedback />,
  "a3-three": <A3Three />,
  "a4-bank": <A4Bank />,
  "a4-weeks": <A4Weeks />,
  "a4-effort": <A4Effort />,
  "a4-guided": <A4Guided />,
  "a5-setup": <A5Setup />,
  "a5-idea1": <A5Idea1 />,
  "a5-idea2": <A5Idea2 />,
  "a5-idea3": <A5Idea3 />,
  "a5-unknown": <A5Unknown />,
  "b1-ask": <B1Ask />,
  "b1-chain": <B1Chain />,
  "b1-rival": <B1Rival />,
  "b1-symptom": <B1Symptom />,
  "b2-growth": <B2Growth />,
  "b2-catch": <B2Catch />,
  "b2-both": <B2Both />,
  "b2-grid": <B2Grid />,
  "b2-decide": <B2Decide />,
  "b3-fog": <B3Fog />,
  "b3-four": <B3Four />,
  "b3-pre": <B3Pre />,
  "b3-rule": <B3Rule />,
};
