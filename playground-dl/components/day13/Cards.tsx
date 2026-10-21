"use client";

import type { ReactNode } from "react";
import { DecisionFrame, PlainFig, PourFig, ReachMatrix, StrategyChain, UsersFig, WcagFig, WeighExample } from "@/components/day13/diagrams";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D13 } from "@/components/day13/comicScenes";
import { COMICS_D13 } from "@/data/day13/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 13 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the rules
 * it gives the task (folded) → sources → Mark as read. Example company and people: LearnLoop, Mia, Tom, Nia; never AccessLearn, so no task is answered here.
 */
const Extra = ({ id, children }: { id: string; children: ReactNode }) => (
  <ShowMore id={id} part="extra" label={tt("Show deeper reading (optional)", "Vertiefende Lektüre zeigen (optional)")}>
    <Callout label={tt("Extra · go deeper", "Extra · vertiefen")} tone="signal">
      {children}
    </Callout>
  </ShowMore>
);

const CA = (en: string, de: string) => (
  <Callout label={tt("Case assumption", "Fallannahme")}>
    <p>{tt(en, de)}</p>
  </Callout>
);

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("Inclusive design asks who is left out. Three groups of needs matter: visual, motor and cognitive. A barrier can slow a learner, stop them completely, or lose them quietly.", "Inklusives Design fragt, wer ausgeschlossen bleibt. Drei Gruppen von Bedürfnissen zählen: visuell, motorisch und kognitiv. Eine Barriere kann eine Lernende bremsen, vollständig stoppen oder still verlieren.")}
      sources={["castUdl", "msInclusive", "who2022"]}
      reasoning={[
        tt("Sort a barrier by the user group it hits first: visual (contrast, text size, images without a text alternative), motor (a menu that needs a mouse, tiny buttons) or cognitive (deep navigation, unstructured text, fixed time limits).", "Ordnen Sie eine Barriere nach der Nutzergruppe, die sie zuerst trifft: visuell (Kontrast, Textgröße, Bilder ohne Textalternative), motorisch (ein Menü, das eine Maus braucht, winzige Buttons) oder kognitiv (tiefe Navigation, unstrukturierter Text, feste Zeitlimits)."),
        tt("Tell a barrier that stops from one that slows: ask whether the learner has any way around it. If none, it stops.", "Unterscheiden Sie eine Barriere, die stoppt, von einer, die bremst: Fragen Sie, ob die Lernende einen Weg daran vorbei hat. Wenn keinen, stoppt sie."),
        tt("Remember that one barrier can hit more than one group: say whom it hits first and who else it hits.", "Denken Sie daran, dass eine Barriere mehr als eine Gruppe treffen kann: Sagen Sie, wen sie zuerst trifft und wen sonst noch."),
        tt("Do not blame the learner: if a page does not work for a group, the barrier is in the page.", "Geben Sie nicht der Lernenden die Schuld: Wenn eine Seite für eine Gruppe nicht funktioniert, liegt die Barriere in der Seite."),
      ]}
    >
      <ComicButton comic={COMICS_D13.A1} art={ART_D13} />
      <UsersFig />
      <DataTable
        caption={tt("Three groups of needs, with an example of a barrier and a fix", "Drei Gruppen von Bedürfnissen, mit Beispiel für eine Barriere und eine Korrektur")}
        head={[tt("Group", "Gruppe"), tt("A typical barrier", "Eine typische Barriere"), tt("A typical fix", "Eine typische Korrektur")]}
        rows={[
          [tt("Visual", "Visuell"), tt("Pale text; images with no description.", "Blasser Text; Bilder ohne Beschreibung."), tt("Strong contrast; a text alternative.", "Starker Kontrast; eine Textalternative.")],
          [tt("Motor", "Motorisch"), tt("A menu that needs a mouse; tiny buttons.", "Ein Menü, das eine Maus braucht; winzige Buttons."), tt("Everything reachable by keyboard; large targets.", "Alles per Tastatur erreichbar; große Ziele.")],
          [tt("Cognitive", "Kognitiv"), tt("A wall of text; seven levels of menus.", "Eine Textwand; sieben Menüebenen."), tt("Headings and short steps; a flat structure.", "Überschriften und kurze Schritte; eine flache Struktur.")],
        ]}
      />
      {CA("LearnLoop, Mia, Tom and Nia are made up for this example. The idea that one design should work for people with different needs is that of Universal Design for Learning (CAST) and of inclusive design (Microsoft).", "LearnLoop, Mia, Tom und Nia sind für dieses Beispiel erfunden. Die Idee, dass ein Design für Menschen mit unterschiedlichen Bedürfnissen funktionieren soll, ist die des Universal Design for Learning (CAST) und des inklusiven Designs (Microsoft).")}
      <Extra id="A1">
        <p>{tt("Impairments can be permanent, temporary or situational: a broken arm, a bright train window, a noisy room. Designing for the permanent case usually helps the temporary and the situational one too, which is why inclusion improves UX for everyone.", "Beeinträchtigungen können dauerhaft, vorübergehend oder situativ sein: ein gebrochener Arm, ein helles Zugfenster, ein lauter Raum. Für den dauerhaften Fall zu gestalten hilft meist auch dem vorübergehenden und dem situativen, weshalb Inklusion die UX für alle verbessert.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("WCAG rests on four principles: perceivable, operable, understandable, robust. Every barrier breaks one of them.", "WCAG beruht auf vier Prinzipien: wahrnehmbar, bedienbar, verständlich, robust. Jede Barriere bricht eines davon.")}
      sources={["wcag22", "wcagUnderstanding", "w3cAria"]}
      reasoning={[
        tt("Name the principle a barrier breaks: pale text and missing text alternatives break perceivable; a mouse-only menu and tiny targets break operable; deep navigation and long unstructured text break understandable; code that a screen reader cannot read breaks robust.", "Nennen Sie das Prinzip, das eine Barriere bricht: blasser Text und fehlende Textalternativen brechen wahrnehmbar; ein Menü nur für die Maus und winzige Ziele brechen bedienbar; tiefe Navigation und langer unstrukturierter Text brechen verständlich; Code, den ein Screenreader nicht lesen kann, bricht robust."),
        tt("Use the four principles as a checklist when you review a page, one question each: can it be seen or heard, used, followed, and read by assistive technology?", "Nutzen Sie die vier Prinzipien als Checkliste beim Prüfen einer Seite, eine Frage je Prinzip: Lässt sie sich sehen oder hören, nutzen, ihr folgen und von assistiver Technologie lesen?"),
        tt("Treat WCAG as a minimum: meeting it does not by itself make a platform good to use.", "Behandeln Sie WCAG als Minimum: Es zu erfüllen macht eine Plattform nicht von selbst gut nutzbar."),
      ]}
    >
      <ComicButton comic={COMICS_D13.A2} art={ART_D13} />
      <PourFig />
      <DataTable
        caption={tt("The four principles, the question each asks, and a barrier that breaks it", "Die vier Prinzipien, die Frage, die jedes stellt, und eine Barriere, die es bricht")}
        head={[tt("Principle", "Prinzip"), tt("The question", "Die Frage"), tt("A barrier that breaks it", "Eine Barriere, die es bricht")]}
        rows={[
          [tt("Perceivable", "Wahrnehmbar"), tt("Can it be seen or heard?", "Lässt es sich sehen oder hören?"), tt("Contrast 2.1 : 1; a chart with no text alternative.", "Kontrast 2,1 : 1; ein Diagramm ohne Textalternative.")],
          [tt("Operable", "Bedienbar"), tt("Can it be used with different devices?", "Lässt es sich mit verschiedenen Geräten nutzen?"), tt("A menu that opens only on mouse hover.", "Ein Menü, das sich nur bei Mausüberfahrt öffnet.")],
          [tt("Understandable", "Verständlich"), tt("Can it be followed?", "Lässt sich ihm folgen?"), tt("Seven levels of menus; a fixed time limit.", "Sieben Menüebenen; ein festes Zeitlimit.")],
          [tt("Robust", "Robust"), tt("Does it work with assistive technology?", "Funktioniert es mit assistiver Technologie?"), tt("A custom control that a screen reader cannot name.", "Ein eigenes Bedienelement, das ein Screenreader nicht benennen kann.")],
        ]}
      />
      {CA("LearnLoop is the example company. The four principles are those of WCAG 2.2 (W3C); ARIA is the W3C standard that lets custom controls tell assistive technology what they are.", "LearnLoop ist das Beispielunternehmen. Die vier Prinzipien sind die von WCAG 2.2 (W3C); ARIA ist der W3C-Standard, mit dem eigene Bedienelemente assistiver Technologie sagen, was sie sind.")}
      <Extra id="A2">
        <p>{tt("In the EU, accessibility rules rest on EN 301 549, which takes over WCAG, and in Germany on the BFSG (Barrierefreiheitsstärkungsgesetz) and the BITV for public bodies. Rules in this area change, so check the current text and dates before you rely on them.", "In der EU beruhen Barrierefreiheitsregeln auf EN 301 549, die WCAG übernimmt, und in Deutschland auf dem BFSG (Barrierefreiheitsstärkungsgesetz) und der BITV für öffentliche Stellen. Regeln in diesem Bereich ändern sich, prüfen Sie also den aktuellen Text und die Fristen, bevor Sie sich darauf verlassen.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Four WCAG requirements matter most on a learning platform: contrast of at least 4.5 : 1, text alternatives, clear structure and navigation, and keyboard use. Each is a small, testable change.", "Vier WCAG-Anforderungen zählen auf einer Lernplattform am meisten: Kontrast von mindestens 4,5 : 1, Textalternativen, klare Struktur und Navigation und Tastaturbedienung. Jede ist eine kleine, prüfbare Änderung.")}
      sources={["wcag22", "wcagUnderstanding", "en301549"]}
      reasoning={[
        tt("Contrast: normal text needs at least 4.5 : 1 against its background (large text 3 : 1); light grey on white fails.", "Kontrast: Normaler Text braucht mindestens 4,5 : 1 gegenüber dem Hintergrund (großer Text 3 : 1); Hellgrau auf Weiß fällt durch."),
        tt("Text alternatives: every image or chart that carries content needs a short text that says what it shows; a purely decorative image needs none.", "Textalternativen: Jedes Bild oder Diagramm, das Inhalt trägt, braucht einen kurzen Text, der sagt, was es zeigt; ein rein dekoratives Bild braucht keinen."),
        tt("Structure and navigation: use real headings in order, keep menus shallow and the same on every page, and give each page a clear title.", "Struktur und Navigation: Nutzen Sie echte Überschriften in Reihenfolge, halten Sie Menüs flach und auf jeder Seite gleich, und geben Sie jeder Seite einen klaren Titel."),
        tt("Keyboard use: everything that works with a mouse must work with the keyboard, in a sensible order, with a visible focus.", "Tastaturbedienung: Alles, was mit einer Maus funktioniert, muss mit der Tastatur funktionieren, in sinnvoller Reihenfolge, mit sichtbarem Fokus."),
        tt("Videos need captions, and a time limit must be adjustable; both appear as measures in the task.", "Videos brauchen Untertitel, und ein Zeitlimit muss einstellbar sein; beides kommt als Maßnahme in der Aufgabe vor."),
      ]}
    >
      <ComicButton comic={COMICS_D13.A3} art={ART_D13} />
      <WcagFig />
      <DataTable
        caption={tt("Four requirements, the group each frees, and a test", "Vier Anforderungen, die Gruppe, die jede befreit, und ein Test")}
        head={[tt("Requirement", "Anforderung"), tt("Who it frees", "Wen sie befreit"), tt("A simple test", "Ein einfacher Test")]}
        rows={[
          [tt("Contrast of at least 4.5 : 1", "Kontrast von mindestens 4,5 : 1"), tt("Learners with low vision, anyone in bright light", "Lernende mit eingeschränktem Sehvermögen, alle bei hellem Licht"), tt("A contrast checker on every text colour.", "Ein Kontrastprüfer bei jeder Textfarbe.")],
          [tt("Text alternatives", "Textalternativen"), tt("Blind learners, learners who use a screen reader", "Blinde Lernende, Lernende, die einen Screenreader nutzen"), tt("Turn images off: is the message still there?", "Bilder ausschalten: Ist die Aussage noch da?")],
          [tt("Clear structure", "Klare Struktur"), tt("Learners who find structure hard, screen-reader users", "Lernende, denen Struktur schwerfällt, Screenreader-Nutzer"), tt("List the headings: do they tell the story?", "Die Überschriften auflisten: Erzählen sie die Geschichte?")],
          [tt("Keyboard use", "Tastaturbedienung"), tt("Keyboard-only users, learners with a tremor", "Nutzer, die nur die Tastatur nutzen, Lernende mit Zittern"), tt("Put the mouse away and press Tab through the page.", "Die Maus weglegen und mit Tab durch die Seite gehen.")],
        ]}
      />
      {CA("LearnLoop is the example company. The requirements are those of WCAG 2.2, summarised; the 4.5 : 1 ratio is criterion 1.4.3. Check the current criteria text before quoting a number in a document.", "LearnLoop ist das Beispielunternehmen. Die Anforderungen sind die von WCAG 2.2, zusammengefasst; das Verhältnis 4,5 : 1 ist Kriterium 1.4.3. Prüfen Sie den aktuellen Kriterientext, bevor Sie in einem Dokument eine Zahl zitieren.")}
      <Extra id="A3">
        <p>{tt("WCAG has three levels, A, AA and AAA. Level AA is the usual target and the one the European standard asks for. A free automatic tool finds only a part of the barriers, so testing with a keyboard and a screen reader stays necessary.", "WCAG hat drei Stufen, A, AA und AAA. Stufe AA ist das übliche Ziel und das, das die europäische Norm verlangt. Ein kostenloses automatisches Werkzeug findet nur einen Teil der Barrieren, ein Test mit Tastatur und Screenreader bleibt also nötig.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("Build accessibility into the design: plain language, a clear visual hierarchy and intuitive interactions. They help everyone and are the cheapest barriers to avoid.", "Bauen Sie Barrierefreiheit ins Design ein: schlichte Sprache, eine klare visuelle Hierarchie und intuitive Interaktionen. Sie helfen allen und sind die günstigsten Barrieren, die sich vermeiden lassen.")}
      sources={["nielsen1994", "wcag22"]}
      reasoning={[
        tt("Plain language: short sentences, everyday words, each abbreviation explained once.", "Schlichte Sprache: kurze Sätze, Alltagswörter, jede Abkürzung einmal erklärt."),
        tt("Hierarchy: real headings that show what matters, and one main action per screen.", "Hierarchie: echte Überschriften, die zeigen, was zählt, und eine Hauptaktion je Bildschirm."),
        tt("Intuitive interaction: controls look and behave as people expect, with the same pattern for the same task.", "Intuitive Interaktion: Bedienelemente sehen aus und verhalten sich, wie Menschen es erwarten, mit demselben Muster für dieselbe Aufgabe."),
      ]}
    >
      <ComicButton comic={COMICS_D13.A4} art={ART_D13} />
      <PlainFig />
      {CA("LearnLoop is the example company. Day 14 treats plain language and intuitive environments in depth.", "LearnLoop ist das Beispielunternehmen. Tag 14 behandelt schlichte Sprache und intuitive Umgebungen ausführlich.")}
      <Extra id="A4">
        <p>{tt("Structure helps a screen reader as well: it lets a blind learner jump from heading to heading, as a sighted learner skims. One structure serves both.", "Struktur hilft auch einem Screenreader: Sie lässt eine blinde Lernende von Überschrift zu Überschrift springen, wie eine sehende Lernende überfliegt. Eine Struktur dient beiden.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Rate a measure by how many learners it frees and how badly they were blocked, how much work it takes and what could go wrong. Small fixes that free a blocked group go first.", "Bewerten Sie eine Maßnahme danach, wie viele Lernende sie befreit und wie stark sie blockiert waren, wie viel Arbeit sie macht und was schiefgehen kann. Kleine Korrekturen, die eine blockierte Gruppe befreien, kommen zuerst.")}
      sources={["gibbons2018", "wcag22"]}
      reasoning={[
        tt("Rate effort by how much work and how many people it needs. The plan prints no price, so Low, Mid or High is your judgement, with a reason.", "Bewerten Sie den Aufwand danach, wie viel Arbeit und wie viele Personen er braucht. Der Plan nennt keinen Preis, also ist Niedrig, Mittel oder Hoch Ihr Urteil, mit einem Grund."),
        tt("Rate impact by how many learners are freed and how badly they were blocked: a barrier that stops a group completely outweighs one that only slows.", "Bewerten Sie die Wirkung danach, wie viele Lernende befreit werden und wie stark sie blockiert waren: Eine Barriere, die eine Gruppe vollständig stoppt, wiegt schwerer als eine, die nur bremst."),
        tt("Rate risk by what could go wrong: a job that takes longer than the time allows, a fix that covers only part of the content, a new menu that confuses regular users at first.", "Bewerten Sie das Risiko danach, was schiefgehen kann: eine Arbeit, die länger dauert, als die Zeit erlaubt, eine Korrektur, die nur einen Teil des Inhalts abdeckt, ein neues Menü, das Stammnutzer zunächst verwirrt."),
        tt("Justify the order with accessibility is usability is success: say whom your first measure helps soonest.", "Begründen Sie die Reihenfolge mit Barrierefreiheit ist Usability ist Erfolg: Sagen Sie, wem Ihre erste Maßnahme am schnellsten hilft."),
        tt("Say what you do not know, for example how many learners use a screen reader, and how you would find out.", "Sagen Sie, was Sie nicht wissen, zum Beispiel wie viele Lernende einen Screenreader nutzen, und wie Sie es herausfinden würden."),
      ]}
    >
      <ComicButton comic={COMICS_D13.A5} art={ART_D13} />
      <WeighExample />
      {CA("LearnLoop and its reasons are made up for this example. The task case is in the task.", "LearnLoop und seine Gründe sind für dieses Beispiel erfunden. Der Aufgabenfall steht in der Aufgabe.")}
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("Accessibility is a standard, not an add-on, and WCAG is the minimum, not the goal. A strategy moves from requirement to priority, to process, to measure.", "Barrierefreiheit ist ein Standard, kein Add-on, und WCAG ist das Minimum, nicht das Ziel. Eine Strategie geht von der Anforderung zur Priorität, zum Prozess, zur Messung.")}
      sources={["wcag22", "en301549", "bfsg", "castUdl"]}
      reasoning={[
        tt("Choose a strategy that starts where most learners meet the barrier and then builds accessibility into the process; reject “everything at once” (over the budget) and “only when a complaint arrives” (the risk stays).", "Wählen Sie eine Strategie, die dort beginnt, wo die meisten Lernenden auf die Barriere treffen, und dann Barrierefreiheit in den Prozess einbaut; verwerfen Sie „alles auf einmal“ (über dem Budget) und „nur wenn eine Beschwerde kommt“ (das Risiko bleibt)."),
        tt("Build accessibility into the process early: criteria in the brief, a check at design review, accessible components in the style guide, a test before release, training for the people who make content.", "Bauen Sie Barrierefreiheit früh in den Prozess ein: Kriterien im Auftrag, eine Prüfung im Design-Review, barrierefreie Komponenten im Style Guide, ein Test vor der Veröffentlichung, Schulung für die Menschen, die Inhalt erstellen."),
        tt("Make it measurable: use automatic counts (share of pages that pass the contrast check), tests with users (can a keyboard user finish a lesson?) and a figure for management (open barriers by severity).", "Machen Sie es messbar: Nutzen Sie automatische Zählungen (Anteil der Seiten, die die Kontrastprüfung bestehen), Tests mit Nutzern (Kann ein Tastaturnutzer eine Lektion beenden?) und eine Zahl für das Management (offene Barrieren nach Schwere)."),
        tt("Do not use a statement of accessibility as a measure: it is a claim, and it can be wrong.", "Nutzen Sie keine Erklärung zur Barrierefreiheit als Maßnahme: Sie ist eine Behauptung und kann falsch sein."),
        tt("Name who else gains: measures built for one group, such as captions or a clear menu, often help everyone.", "Nennen Sie, wer noch profitiert: Maßnahmen, die für eine Gruppe gebaut sind, etwa Untertitel oder ein klares Menü, helfen oft allen."),
      ]}
    >
      <ComicButton comic={COMICS_D13.B1} art={ART_D13} />
      <StrategyChain />
      <DataTable
        caption={tt("The test for each link of the chain", "Der Test für jedes Glied der Kette")}
        head={[tt("Link", "Glied"), tt("The test", "Der Test"), tt("What goes wrong without it", "Was ohne ihn schiefgeht")]}
        rows={[
          [tt("Requirement", "Anforderung"), tt("Is the standard named (WCAG 2.2 AA) and its status known?", "Ist der Standard benannt (WCAG 2.2 AA) und sein Stand bekannt?"), tt("Nobody knows what “accessible” means.", "Niemand weiß, was „barrierefrei“ heißt.")],
          [tt("Priority", "Priorität"), tt("Do the first steps reach the most learners?", "Erreichen die ersten Schritte die meisten Lernenden?"), tt("Effort goes into rarely used content.", "Aufwand fließt in selten genutzten Inhalt.")],
          [tt("Process", "Prozess"), tt("Does a new page start accessible?", "Startet eine neue Seite barrierefrei?"), tt("New barriers appear as fast as old ones are fixed.", "Neue Barrieren entstehen so schnell, wie alte behoben werden.")],
          [tt("Measure", "Messung"), tt("Can management see progress in a figure?", "Kann das Management Fortschritt in einer Zahl sehen?"), tt("Nobody can say whether it works.", "Niemand kann sagen, ob es wirkt.")],
        ]}
      />
      {CA("The chain follows the plan's coaching: accessibility is a standard and WCAG a minimum. LearnLoop is the example company. Legal duties differ by country and product, so the legal side must be checked for the real case.", "Die Kette folgt dem Coaching des Plans: Barrierefreiheit ist ein Standard und WCAG ein Minimum. LearnLoop ist das Beispielunternehmen. Rechtliche Pflichten unterscheiden sich nach Land und Produkt, die rechtliche Seite muss also für den realen Fall geprüft werden.")}
      <Extra id="B1">
        <p>{tt("In Germany, the BFSG (Barrierefreiheitsstärkungsgesetz) makes accessibility a legal requirement for many products and services, and it applies from 28 June 2025; which parts apply to a given learning platform depends on its use, so a legal check is part of the strategy.", "In Deutschland macht das BFSG (Barrierefreiheitsstärkungsgesetz) Barrierefreiheit für viele Produkte und Dienstleistungen zur gesetzlichen Pflicht, und es gilt seit dem 28. Juni 2025; welche Teile für eine bestimmte Lernplattform gelten, hängt vom Einsatz ab, eine rechtliche Prüfung ist also Teil der Strategie.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Accessibility competes with cost, and a fixed standard with flexibility. Measures with wide reach and modest cost go first; an overlay that removes no barrier is not a measure.", "Barrierefreiheit konkurriert mit Kosten und ein fester Standard mit Flexibilität. Maßnahmen mit großer Reichweite und mäßigen Kosten kommen zuerst; ein Overlay, das keine Barriere beseitigt, ist keine Maßnahme.")}
      sources={["wcag22", "castUdl", "gibbons2018"]}
      reasoning={[
        tt("Name both sides of each conflict: the cost of a broad programme and the cost of doing too little (complaints, legal action, lost customers). A plan that names only one cost has not weighed the conflict.", "Nennen Sie beide Seiten jedes Konflikts: die Kosten eines breiten Programms und die Kosten, zu wenig zu tun (Beschwerden, rechtliche Schritte, verlorene Kunden). Ein Plan, der nur eine Kostenseite nennt, hat den Konflikt nicht abgewogen."),
        tt("Order measures by reach for cost: cheap with wide reach first, costly with wide reach in steps, cheap with narrow reach only if it removes a real barrier, costly with narrow reach avoided.", "Ordnen Sie Maßnahmen nach Reichweite je Kosten: günstig mit großer Reichweite zuerst, teuer mit großer Reichweite in Schritten, günstig mit kleiner Reichweite nur, wenn es eine echte Barriere beseitigt, teuer mit kleiner Reichweite meiden."),
        tt("Reject a separate accessible version and an overlay as the main answer: the first is not inclusive and doubles the upkeep; the second leaves the barriers underneath.", "Verwerfen Sie eine getrennte barrierefreie Fassung und ein Overlay als Hauptantwort: Die erste ist nicht inklusiv und verdoppelt die Pflege; das zweite lässt die Barrieren darunter."),
        tt("Use the standard as the floor and allow flexibility above it: a learner who needs more time or a different format should be able to ask for it.", "Nutzen Sie den Standard als Untergrenze und erlauben Sie darüber Flexibilität: Eine Lernende, die mehr Zeit oder ein anderes Format braucht, sollte darum bitten können."),
      ]}
    >
      <ComicButton comic={COMICS_D13.B2} art={ART_D13} />
      <ReachMatrix />
      <DataTable
        caption={tt("Two conflicts and a rule for deciding each", "Zwei Konflikte und eine Regel, jeden zu entscheiden")}
        head={[tt("Conflict", "Konflikt"), tt("One side gets", "Die eine Seite bekommt"), tt("The other side gets", "Die andere Seite bekommt"), tt("A rule for deciding", "Eine Regel zum Entscheiden")]}
        rows={[
          [tt("Accessibility against cost", "Barrierefreiheit gegen Kosten"), tt("A full programme at once", "Ein volles Programm auf einmal"), tt("A small budget and little time", "Ein kleines Budget und wenig Zeit"), tt("Start with the measures of the widest reach for the least cost.", "Beginnen Sie mit den Maßnahmen größter Reichweite für die geringsten Kosten.")],
          [tt("Standardisation against flexibility", "Standardisierung gegen Flexibilität"), tt("One fixed standard for all", "Ein fester Standard für alle"), tt("Solutions for particular needs", "Lösungen für besondere Bedürfnisse"), tt("Make the standard the floor; allow adjustment above it.", "Machen Sie den Standard zur Untergrenze; erlauben Sie Anpassung darüber.")],
        ]}
      />
      {CA("LearnLoop and its six measures are made up for this example. The positions in the picture are a reading of the example, not a score.", "LearnLoop und seine sechs Maßnahmen sind für dieses Beispiel erfunden. Die Positionen im Bild sind eine Lesart des Beispiels, keine Note.")}
      <Extra id="B2">
        <p>{tt("Accessibility overlays are plug-ins that promise to fix a site automatically. Many accessibility experts and disabled users have criticised them because the barriers underneath remain, so they are better treated as a risk than as a measure.", "Barrierefreiheits-Overlays sind Plug-ins, die versprechen, eine Website automatisch zu reparieren. Viele Barrierefreiheitsexperten und Nutzer mit Behinderungen haben sie kritisiert, weil die Barrieren darunter bleiben, sie sind also eher als Risiko denn als Maßnahme zu behandeln.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("When you do not know how much fails, fix the most-used part first, audit a sample, write a figure you can watch into the plan, and say what you give up.", "Wenn Sie nicht wissen, wie viel scheitert, beheben Sie zuerst den meistgenutzten Teil, auditieren Sie eine Stichprobe, schreiben Sie eine beobachtbare Zahl in den Plan und sagen Sie, worauf Sie verzichten.")}
      sources={["klein2007", "bezos2016", "gibbons2018"]}
      reasoning={[
        tt("A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.", "Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten."),
        tt("A reversal condition has a figure you can watch and a time: “the audit of five more pages shows more than five barriers per page by the end of month 3”.", "Eine Rücknahmebedingung hat eine Zahl, die Sie beobachten können, und eine Zeit: „das Audit von fünf weiteren Seiten zeigt bis Ende von Monat 3 mehr als fünf Barrieren je Seite“."),
        tt("Learn cheaply: audit a sample of pages with a keyboard, a screen reader and an automatic tool before you plan the whole programme.", "Lernen Sie günstig: Auditieren Sie eine Stichprobe von Seiten mit Tastatur, Screenreader und einem automatischen Werkzeug, bevor Sie das ganze Programm planen."),
        tt("Do not wait for certainty: starting with the most-used courses is useful whatever the audit finds.", "Warten Sie nicht auf Gewissheit: Mit den meistgenutzten Kursen zu beginnen ist nützlich, was auch immer das Audit findet."),
        tt("Giving up nothing means you have not decided: name what you postpone, for example the claim “fully accessible” or the old archive.", "Auf nichts zu verzichten heißt, nicht entschieden zu haben: Nennen Sie, was Sie verschieben, zum Beispiel die Aussage „vollständig barrierefrei“ oder das alte Archiv."),
      ]}
    >
      <ComicButton comic={COMICS_D13.B3} art={ART_D13} />
      <DecisionFrame />
      <DataTable
        caption={tt("Five ways to make a decision with an unknown scale safer", "Fünf Wege, eine Entscheidung mit unbekanntem Ausmaß sicherer zu machen")}
        head={[tt("Way", "Weg"), tt("What it looks like", "Wie es aussieht")]}
        rows={[
          [tt("Audit a sample", "Eine Stichprobe auditieren"), tt("Five to ten pages are checked with a keyboard, a screen reader and a tool.", "Fünf bis zehn Seiten werden mit Tastatur, Screenreader und einem Werkzeug geprüft.")],
          [tt("Start with the most-used content", "Mit dem meistgenutzten Inhalt beginnen"), tt("The twenty courses most learners use are fixed first.", "Die zwanzig Kurse, die die meisten Lernenden nutzen, werden zuerst behoben.")],
          [tt("Set a figure and a date", "Eine Zahl und ein Datum festlegen"), tt("The number of barriers per page you expect, and the month you will look.", "Die Zahl der Barrieren je Seite, die Sie erwarten, und der Monat, in dem Sie nachsehen.")],
          [tt("Fix who decides", "Festlegen, wer entscheidet"), tt("A role, with the evidence it needs.", "Eine Rolle, mit den Belegen, die sie braucht.")],
          [tt("Name what you give up", "Nennen, worauf Sie verzichten"), tt("Something real that someone would miss.", "Etwas Reales, das jemand vermissen würde.")],
        ]}
      />
      {CA("LearnLoop and its figures are made up for this example; the task case is in the task.", "LearnLoop und seine Zahlen sind für dieses Beispiel erfunden; der Aufgabenfall steht in der Aufgabe.")}
      <Extra id="B3">
        <p>{tt("Premortem: imagine the programme failed. Typical answers here: we did too little and a complaint became a legal case, retrofitting cost far more than planned, and new content brought new barriers. Each answer becomes a check.", "Premortem: Stellen Sie sich vor, das Programm sei gescheitert. Typische Antworten hier: Wir taten zu wenig, und eine Beschwerde wurde zum Rechtsfall, das nachträgliche Anpassen kostete weit mehr als geplant, und neuer Inhalt brachte neue Barrieren. Jede Antwort wird zu einem Check.")}</p>
        <p>{tt("One-way and two-way doors: a fix in the style sheet is a two-way door; a second, separate platform is a one-way door.", "Einbahn- und Zweiwegtüren: Eine Korrektur im Stylesheet ist eine Zweiwegtür; eine zweite, getrennte Plattform ist eine Einbahntür.")}</p>
      </Extra>
    </MaterialCard>
  );
}
