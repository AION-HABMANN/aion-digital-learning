"use client";

import type { ReactNode } from "react";
import { ComicButton } from "@/components/comic/ComicModal";
import { ART_D7 } from "@/components/day7/comicScenes";
import { COMICS_D7 } from "@/data/day7/comics";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { BarrierTypes, ContinuousLoop, PlainBuilder, PourFigure, QuizLena, SpectrumExplorer, WeighExample } from "@/components/day7/diagrams";
import { AverageHides, DecisionFrame, ReachMatrix, StrategicChain } from "@/components/day7/diagramsB";
import { tt } from "@/lib/lang";

/**
 * Day 7 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the diagram is the instrument) →
 * the rules it gives the task (folded) → sources → Mark as read. Example companies and people: LearnLoop, Ben, Lena, Noor; never InclusiveLearn, so no task is
 * answered here. Deeper reading sits behind a quiet "Show" row, because no task block needs it. The laws are in flux and each card says so.
 */

const Extra = ({ id, children }: { id: string; children: ReactNode }) => (
  <ShowMore id={id} part="extra" label={tt("Show deeper reading (optional)", "Vertiefende Lektüre zeigen (optional)")}>
    <Callout label={tt("Extra · go deeper", "Extra · vertiefen")} tone="signal">
      {children}
    </Callout>
  </ShowMore>
);

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("Accessibility means everyone can get in; usability means the user can reach the goal. Inclusive design starts from the fact that abilities differ and change.", "Barrierefreiheit heißt, dass alle hineinkommen; Usability heißt, dass die Nutzer das Ziel erreichen. Inklusives Design geht davon aus, dass Fähigkeiten verschieden sind und sich ändern.")}
      sources={["iso924111", "who2022", "msInclusive", "castUdl", "bfsg", "en301549", "bitv"]}
      reasoning={[
        tt("Say what a barrier stops a learner from doing, and who it affects: the permanent, the temporary and the situational groups.", "Sagen Sie, woran eine Barriere eine Lernende hindert und wen sie betrifft: die dauerhaften, die vorübergehenden und die situativen Gruppen."),
        tt("Treat accessibility as a core quality, not an add-on. Ask of every measure: does it open the platform to more learners, or only improve it for those who are already in?", "Behandeln Sie Barrierefreiheit als Kernqualität, nicht als Add-on. Fragen Sie bei jeder Maßnahme: Öffnet sie die Plattform für mehr Lernende, oder verbessert sie sie nur für die, die schon drin sind?"),
        tt("A barrier that blocks one group often hurts others in some situations (captions, contrast, keyboard use). Count all of them when you estimate reach.", "Eine Barriere, die eine Gruppe blockiert, trifft in manchen Situationen oft auch andere (Untertitel, Kontrast, Tastaturbedienung). Zählen Sie alle mit, wenn Sie die Reichweite schätzen."),
        tt("Do not state legal obligations as certain. Name the rule, the year and what is still unclear.", "Nennen Sie rechtliche Pflichten nicht als sicher. Nennen Sie die Regel, das Jahr und was noch unklar ist."),
      ]}
    >
      <ComicButton comic={COMICS_D7.A1} art={ART_D7} />
      <SpectrumExplorer />
      <DataTable
        caption={tt("Accessibility against usability, and the rules around them (in flux)", "Barrierefreiheit gegen Usability, und die Regeln darum (im Fluss)")}
        head={[tt("Term", "Begriff"), tt("It asks", "Es fragt"), tt("Note", "Hinweis")]}
        rows={[
          [tt("Usability (ISO 9241-11)", "Usability (ISO 9241-11)"), tt("Can specified users reach their goals with effectiveness, efficiency and satisfaction in a context of use?", "Können bestimmte Nutzer ihre Ziele in einem Nutzungskontext wirksam, effizient und zufriedenstellend erreichen?"), tt("Judged for specified users.", "Beurteilt für bestimmte Nutzer.")],
          [tt("Accessibility", "Barrierefreiheit"), tt("Do the specified users include the full range of abilities?", "Umfassen die bestimmten Nutzer die ganze Bandbreite an Fähigkeiten?"), tt("Both are needed.", "Beides ist nötig.")],
          [tt("BFSG, EN 301 549, BITV 2.0", "BFSG, EN 301 549, BITV 2.0"), tt("Which rules apply to this service?", "Welche Regeln gelten für diesen Dienst?"), tt("BFSG applies since 28 June 2025 to many consumer-facing digital services; EN 301 549 refers to WCAG for web content; public bodies follow BITV 2.0.", "Das BFSG gilt seit dem 28. Juni 2025 für viele verbraucherbezogene digitale Dienste; EN 301 549 verweist für Webinhalte auf WCAG; öffentliche Stellen folgen der BITV 2.0.")],
        ]}
      />
      <Callout label={tt("In flux: check before you state it", "Im Fluss: prüfen, bevor Sie es nennen")} tone="rust">
        <p>{tt("Whether and how a learning platform is covered depends on the service: a platform that serves only companies as customers may fall outside the consumer scope of the BFSG, while registration and contracts with consumers may bring it in. State the year, and check scope and exemptions with a lawyer before you decide.", "Ob und wie eine Lernplattform erfasst ist, hängt vom Dienst ab: Eine Plattform, die nur Unternehmen als Kunden bedient, kann außerhalb des Verbraucherbereichs des BFSG liegen, während Registrierung und Verträge mit Verbrauchern sie hineinbringen können. Nennen Sie das Jahr und prüfen Sie Geltungsbereich und Ausnahmen mit einer Juristin, bevor Sie entscheiden.")}</p>
      </Callout>
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop, Ben, Sara, Jo, Ravi, Eva, Tom, Mira, Karl and Nina are made up for this example. The persona spectrum comes from Microsoft's inclusive design toolkit; the figure of one in six comes from the WHO (2022).", "LearnLoop, Ben, Sara, Jo, Ravi, Eva, Tom, Mira, Karl und Nina sind für dieses Beispiel erfunden. Das Persona-Spektrum stammt aus dem Inclusive-Design-Toolkit von Microsoft; die Zahl von einem von sechs stammt von der WHO (2022).")}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("Universal Design for Learning: CAST's UDL framework (2024) asks for multiple means of engagement, representation, and action and expression. It is the learning-specific side of inclusive design: the same content offered as text, captioned video and audio lets learners choose.", "Universal Design for Learning: Das UDL-Rahmenwerk von CAST (2024) verlangt mehrere Formen von Engagement, Darstellung sowie Handlung und Ausdruck. Es ist die lernspezifische Seite inklusiven Designs: Derselbe Inhalt als Text, Video mit Untertiteln und Audio lässt Lernende wählen.")}</p>
        <p>{tt("Accessibility is not an add-on: a platform in which accessibility is added at the end has to retrofit every screen. Practitioners and the W3C's business-case materials argue that planning early avoids costly rework. The figure differs by project, so treat it as a direction.", "Barrierefreiheit ist kein Add-on: Eine Plattform, in der Barrierefreiheit am Ende ergänzt wird, muss jeden Bildschirm nachrüsten. Praktiker und die Business-Case-Materialien des W3C argumentieren, dass frühes Planen teure Nacharbeit vermeidet. Die Zahl unterscheidet sich je Projekt, sehen Sie sie also als Richtung.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("Barriers are visual, cognitive or motor. WCAG sorts the ways to remove them under four principles that you can apply to any screen.", "Barrieren sind visuell, kognitiv oder motorisch. WCAG ordnet die Wege, sie zu beseitigen, vier Prinzipien zu, die Sie auf jeden Bildschirm anwenden können.")}
      sources={["wcag22", "wcagUnderstanding", "w3cAria"]}
      reasoning={[
        tt("Sort a barrier by the principle it breaks: cannot see or hear (perceivable), cannot use (operable), cannot follow (understandable). Pick the first one it breaks.", "Ordnen Sie eine Barriere nach dem Prinzip, das sie verletzt: nicht sehen oder hören (wahrnehmbar), nicht bedienen (bedienbar), nicht nachvollziehen (verständlich). Wählen Sie das erste, das sie verletzt."),
        tt("Name the barrier type too: visual (contrast, text size, colour only), cognitive (complexity, language, steps), motor (target size, drag only, keyboard).", "Nennen Sie auch die Art der Barriere: visuell (Kontrast, Textgröße, nur Farbe), kognitiv (Komplexität, Sprache, Schritte), motorisch (Zielgröße, nur Ziehen, Tastatur)."),
        tt("A fix that works with the keyboard, large targets and clear contrast usually helps several groups at once.", "Eine Behebung, die mit Tastatur, großen Zielen und klarem Kontrast funktioniert, hilft meist mehreren Gruppen zugleich."),
        tt("Automated checks find only some problems; a manual check with the keyboard and a screen reader finds more. Do not call a page accessible because a tool passed.", "Automatische Prüfungen finden nur manche Probleme; eine manuelle Prüfung mit Tastatur und Screenreader findet mehr. Nennen Sie eine Seite nicht barrierefrei, nur weil ein Werkzeug sie bestanden hat."),
      ]}
    >
      <ComicButton comic={COMICS_D7.A2} art={ART_D7} />
      <PourFigure />
      <BarrierTypes />
      <QuizLena />
      <DataTable
        caption={tt("The four principles, a learner's question, and success criteria that matter on a learning platform", "Die vier Prinzipien, die Frage einer Lernenden und Erfolgskriterien, die auf einer Lernplattform zählen")}
        head={[tt("Principle", "Prinzip"), tt("A learner's question", "Frage einer Lernenden"), tt("Success criteria that matter (level)", "Erfolgskriterien, die zählen (Stufe)")]}
        rows={[
          [tt("Perceivable", "Wahrnehmbar"), tt("Can I see or hear it?", "Kann ich es sehen oder hören?"), tt("1.1.1 Text alternatives for images (A) · 1.2.2 Captions for recorded video (A) · 1.4.1 Colour is not the only means of conveying information (A) · 1.4.3 Contrast of at least 4.5 : 1 for normal text, 3 : 1 for large (AA) · 1.4.4 Text can be resized to 200% (AA) · 1.4.10 Reflow: content works at 320 CSS px wide without two-way scrolling (AA)", "1.1.1 Textalternativen für Bilder (A) · 1.2.2 Untertitel für aufgezeichnete Videos (A) · 1.4.1 Farbe ist nicht das einzige Mittel, Information zu vermitteln (A) · 1.4.3 Kontrast von mindestens 4,5 : 1 für normalen Text, 3 : 1 für großen (AA) · 1.4.4 Text lässt sich auf 200 % vergrößern (AA) · 1.4.10 Reflow: Inhalt funktioniert bei 320 CSS-px Breite ohne Scrollen in zwei Richtungen (AA)")],
          [tt("Operable", "Bedienbar"), tt("Can I use it?", "Kann ich es benutzen?"), tt("2.1.1 Everything works by keyboard (A) · 2.4.7 The focus is visible (AA) · 2.4.11 The focused element is not hidden by other content (AA, new in 2.2) · 2.5.7 A drag action also works without dragging (AA, new in 2.2) · 2.5.8 Pointer targets are at least 24 × 24 CSS px (AA, new in 2.2)", "2.1.1 Alles funktioniert per Tastatur (A) · 2.4.7 Der Fokus ist sichtbar (AA) · 2.4.11 Das fokussierte Element wird nicht von anderem Inhalt verdeckt (AA, neu in 2.2) · 2.5.7 Eine Zieh-Aktion funktioniert auch ohne Ziehen (AA, neu in 2.2) · 2.5.8 Zeigerziele sind mindestens 24 × 24 CSS-px groß (AA, neu in 2.2)")],
          [tt("Understandable", "Verständlich"), tt("Can I follow it?", "Kann ich es nachvollziehen?"), tt("3.1.1 The page language is set (A) · 3.3.2 Fields have labels or instructions (A) · 3.3.8 Logging in does not depend on remembering or solving a puzzle (AA, new in 2.2)", "3.1.1 Die Seitensprache ist gesetzt (A) · 3.3.2 Felder haben Beschriftungen oder Anweisungen (A) · 3.3.8 Die Anmeldung hängt nicht davon ab, sich etwas zu merken oder ein Rätsel zu lösen (AA, neu in 2.2)")],
          [tt("Robust", "Robust"), tt("Does it work with my tools?", "Funktioniert es mit meinen Werkzeugen?"), tt("4.1.2 Name, role and value are available to assistive technology (A)", "4.1.2 Name, Rolle und Wert stehen assistiver Technologie zur Verfügung (A)")],
        ]}
      />
      <Callout label={tt("In flux: check the reference", "Im Fluss: Referenz prüfen")} tone="rust">
        <p>{tt("WCAG 2.2 (W3C Recommendation, October 2023) has 86 success criteria. It adds nine to WCAG 2.1 and removes one (4.1.1 Parsing). Level AA is the usual target in law and policy. The EN 301 549 standard that the BFSG relies on is currently tied to WCAG 2.1 for web content, with a revision expected to refer to WCAG 2.2: because 2.2 is backward-compatible, aiming at 2.2 AA is a safe choice, but check the current reference.", "WCAG 2.2 (W3C-Empfehlung, Oktober 2023) hat 86 Erfolgskriterien. Es ergänzt neun zu WCAG 2.1 und streicht eines (4.1.1 Parsing). Stufe AA ist das übliche Ziel in Recht und Politik. Die Norm EN 301 549, auf die sich das BFSG stützt, ist für Webinhalte derzeit an WCAG 2.1 gebunden, eine Überarbeitung soll auf WCAG 2.2 verweisen: Da 2.2 abwärtskompatibel ist, ist WCAG 2.2 AA eine sichere Wahl, prüfen Sie aber die aktuelle Referenz.")}</p>
      </Callout>
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("Lena and the LearnLoop quiz are made up for this example.", "Lena und das LearnLoop-Quiz sind für dieses Beispiel erfunden.")}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("Using ARIA: WAI-ARIA lets developers add names, roles and states for custom controls. The first rule in the W3C's guidance is to use native HTML (a real button) when it does the job, because native elements already work with keyboards and assistive technology.", "ARIA nutzen: WAI-ARIA lässt Entwickler Namen, Rollen und Zustände für selbstgebaute Bedienelemente ergänzen. Die erste Regel in der Anleitung des W3C lautet, natives HTML (einen echten Button) zu nutzen, wenn es die Aufgabe erfüllt, denn native Elemente funktionieren schon mit Tastaturen und assistiver Technologie.")}</p>
        <p>{tt("New in WCAG 2.2: the nine additions include focus not obscured, dragging alternatives, a minimum target size, consistent help, redundant entry and accessible authentication. For a learning platform, dragging quizzes, sticky headers that hide focus, and a login that blocks password managers are the typical failures.", "Neu in WCAG 2.2: Zu den neun Ergänzungen gehören nicht verdeckter Fokus, Alternativen zum Ziehen, eine Mindestzielgröße, konsistente Hilfe, keine doppelte Eingabe und barrierefreie Authentifizierung. Auf einer Lernplattform sind Zieh-Quizze, fixierte Kopfzeilen, die den Fokus verdecken, und eine Anmeldung, die Passwortmanager blockiert, die typischen Fehler.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("An inclusive platform is easy to read, light on the mind, and lets the learner choose how to learn.", "Eine inklusive Plattform ist leicht zu lesen, schont den Kopf und lässt die Lernende wählen, wie sie lernt.")}
      sources={["castUdl", "wcag22", "sweller1998"]}
      reasoning={[
        tt("Name which of the three tools a measure uses: plain language, lower load or flexibility.", "Nennen Sie, welches der drei Werkzeuge eine Maßnahme nutzt: einfache Sprache, geringere Belastung oder Flexibilität."),
        tt("Rewrite instructions in everyday words and short sentences; explain every error and say what to do.", "Schreiben Sie Anleitungen in Alltagsworten und kurzen Sätzen um; erklären Sie jeden Fehler und sagen Sie, was zu tun ist."),
        tt("Offer more than one way to reach the same content; do not force one format.", "Bieten Sie mehr als einen Weg zum selben Inhalt an; erzwingen Sie kein Format."),
        tt("A cognitive barrier is real even when a screen passes every technical check. Test it with learners who find reading hard.", "Eine kognitive Barriere ist real, auch wenn ein Bildschirm jede technische Prüfung besteht. Testen Sie sie mit Lernenden, denen Lesen schwerfällt."),
      ]}
    >
      <ComicButton comic={COMICS_D7.A3} art={ART_D7} />
      <PlainBuilder />
      <DataTable
        caption={tt("The three tools of inclusive learning", "Die drei Werkzeuge inklusiven Lernens")}
        head={[tt("Tool", "Werkzeug"), tt("What it is", "Was es ist"), tt("Note", "Hinweis")]}
        rows={[
          [tt("Plain language", "Einfache Sprache"), tt("Short, everyday wording. In German there are two forms: Einfache Sprache (fewer rules) and Leichte Sprache (strict rules, for people with learning difficulties).", "Kurze Alltagsformulierungen. Im Deutschen gibt es zwei Formen: Einfache Sprache (weniger Regeln) und Leichte Sprache (strenge Regeln, für Menschen mit Lernschwierigkeiten)."), tt("WCAG has a reading-level criterion at Level AAA (3.1.5). Day 14 treats it in depth.", "WCAG hat ein Kriterium zum Leseniveau auf Stufe AAA (3.1.5). Tag 14 behandelt es ausführlich.")],
          [tt("Clear structure and low load", "Klare Struktur und geringe Belastung"), tt("Headings, short paragraphs, one task per screen and explained terms reduce extraneous load. Fewer steps in a form help everyone.", "Überschriften, kurze Absätze, eine Aufgabe pro Bildschirm und erklärte Begriffe senken die extrinsische Belastung. Weniger Schritte in einem Formular helfen allen."), tt("The link to Day 3.", "Die Verbindung zu Tag 3.")],
          [tt("Flexibility", "Flexibilität"), tt("Offer the content in more than one form (text, captioned video, a transcript, audio) and let the learner skip what they know.", "Bieten Sie den Inhalt in mehr als einer Form an (Text, Video mit Untertiteln, ein Transkript, Audio) und lassen Sie die Lernende überspringen, was sie kennt."), tt("This follows Universal Design for Learning.", "Das folgt Universal Design for Learning.")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop, Noor and Daniel are made up for this example.", "LearnLoop, Noor und Daniel sind für dieses Beispiel erfunden.")}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("Link to Day 3: plain language and clear structure lower extraneous load. Inclusive design is therefore also the quickest route to a lighter platform for everyone. Link to Day 14: the next module on plain language and intuitive environments continues here with testing and rewriting.", "Verbindung zu Tag 3: Einfache Sprache und klare Struktur senken die extrinsische Belastung. Inklusives Design ist deshalb auch der schnellste Weg zu einer leichteren Plattform für alle. Verbindung zu Tag 14: Das nächste Modul zu einfacher Sprache und intuitiven Umgebungen setzt hier mit Testen und Umschreiben an.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("UX quality is not a single step. Join personas, journeys and design, build them into the organisation, and measure with tests, feedback and data.", "UX-Qualität ist kein einzelner Schritt. Verbinden Sie Personas, Journeys und Design, bauen Sie sie in die Organisation ein und messen Sie mit Tests, Feedback und Daten.")}
      sources={["brooke1996", "rodden2010", "nielsen2000", "iso924111"]}
      reasoning={[
        tt("Choose evaluation methods that give different kinds of evidence: a test with users with impairments (why), data by group (how many), an audit against WCAG (does it meet the criteria).", "Wählen Sie Evaluationsmethoden, die verschiedene Arten von Belegen liefern: einen Test mit Nutzern mit Einschränkungen (warum), Daten pro Gruppe (wie viele), ein Audit gegen WCAG (erfüllt es die Kriterien)."),
        tt("Measure by group. An average score can hide a group that cannot use the platform.", "Messen Sie pro Gruppe. Ein Durchschnittswert kann eine Gruppe verbergen, die die Plattform nicht nutzen kann."),
        tt("Make evaluation continuous: a check in every release and a regular test with users, not one audit.", "Machen Sie die Evaluation fortlaufend: eine Prüfung in jedem Release und ein regelmäßiger Test mit Nutzern, nicht ein einziges Audit."),
        tt("Automated tools find only part of the problems; they cannot replace a manual check or a user test.", "Automatische Werkzeuge finden nur einen Teil der Probleme; sie ersetzen weder eine manuelle Prüfung noch einen Nutzertest."),
      ]}
    >
      <ComicButton comic={COMICS_D7.A4} art={ART_D7} />
      <ContinuousLoop />
      <DataTable
        caption={tt("Where to integrate accessibility, and what to measure", "Wo Barrierefreiheit zu integrieren ist, und was zu messen ist")}
        head={[tt("Where to integrate", "Wo integrieren"), tt("What it looks like for accessibility", "Wie es für Barrierefreiheit aussieht")]}
        rows={[
          [tt("Planning", "Planung"), tt("Personas and journeys include learners with access needs.", "Personas und Journeys schließen Lernende mit Zugangsbedarf ein.")],
          [tt("Design", "Gestaltung"), tt("A pattern library whose components are checked against WCAG.", "Eine Pattern-Bibliothek, deren Komponenten gegen WCAG geprüft sind.")],
          [tt("Development", "Entwicklung"), tt("Accessibility is part of the definition of “done”; automated checks in every release.", "Barrierefreiheit gehört zur Definition von „fertig“; automatische Prüfungen in jedem Release.")],
          [tt("Content", "Inhalt"), tt("Authors follow a plain-language and caption standard.", "Autoren folgen einem Standard für einfache Sprache und Untertitel.")],
          [tt("Buying", "Einkauf"), tt("Third-party tools are checked before purchase.", "Werkzeuge von Drittanbietern werden vor dem Kauf geprüft.")],
          [tt("Support", "Support"), tt("A channel for access problems with a promised reply time.", "Ein Kanal für Zugangsprobleme mit zugesagter Antwortzeit.")],
        ]}
      />
      <DataTable
        caption={tt("What to measure and by which method", "Was zu messen ist und mit welcher Methode")}
        head={[tt("What to measure", "Was zu messen ist"), tt("Method", "Methode")]}
        rows={[
          [tt("Satisfaction", "Zufriedenheit"), tt("A short questionnaire such as SUS, asked per user group.", "Ein kurzer Fragebogen wie SUS, pro Nutzergruppe gestellt.")],
          [tt("Usage and task success", "Nutzung und Aufgabenerfolg"), tt("Analytics by user group; tests with real tasks.", "Analytics pro Nutzergruppe; Tests mit echten Aufgaben.")],
          [tt("Drop-out", "Abbruch"), tt("Where and how many leave, by group.", "Wo und wie viele gehen, pro Gruppe.")],
          [tt("Access quality", "Zugangsqualität"), tt("A manual audit (keyboard, screen reader) plus automated checks.", "Ein manuelles Audit (Tastatur, Screenreader) plus automatische Prüfungen.")],
        ]}
      />
      <Extra id="A4">
        <p>{tt("SUS and HEART: the System Usability Scale (Brooke 1996) is a ten-item questionnaire with a score from 0 to 100. Google's HEART framework (Rodden et al. 2010) lists happiness, engagement, adoption, retention and task success as categories of user-centred metrics. Day 16 treats them in detail.", "SUS und HEART: Die System Usability Scale (Brooke 1996) ist ein Fragebogen mit zehn Aussagen und einem Wert von 0 bis 100. Googles HEART-Rahmen (Rodden et al. 2010) nennt Zufriedenheit, Engagement, Adoption, Retention und Aufgabenerfolg als Kategorien nutzerzentrierter Metriken. Tag 16 behandelt sie ausführlich.")}</p>
        <p>{tt("Small tests are enough to start: five users per group find most problems in a focused test (Nielsen 2000, Day 2). Recruit at least some learners with impairments; their findings differ from the rest.", "Kleine Tests genügen für den Anfang: Fünf Nutzer pro Gruppe finden in einem fokussierten Test die meisten Probleme (Nielsen 2000, Tag 2). Gewinnen Sie mindestens einige Lernende mit Einschränkungen; ihre Befunde unterscheiden sich vom Rest.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Rate a measure by the learners it opens the platform to, what could go wrong and how much work it takes. Prefer fixes at the source to quick patches.", "Bewerten Sie eine Maßnahme danach, für welche Lernenden sie die Plattform öffnet, was schiefgehen könnte und wie viel Arbeit sie macht. Bevorzugen Sie Behebungen an der Quelle gegenüber schnellen Flicken.")}
      sources={["gibbons2018", "wcag22", "nielsen2000"]}
      reasoning={[
        tt("Rate effort by how much work and time the measure takes before the release: a few pages of text is Low, captions and a changed quiz course by course is Mid, a new feature is High.", "Bewerten Sie den Aufwand danach, wie viel Arbeit und Zeit die Maßnahme bis zum Release braucht: ein paar Seiten Text sind Niedrig, Untertitel und ein geändertes Quiz Kurs für Kurs sind Mittel, ein neues Feature ist Hoch."),
        tt("Rate user impact by the barrier it removes and the groups it reaches. A measure that adds new features and removes no barrier has a low impact on excluded groups.", "Bewerten Sie die Nutzerwirkung nach der Barriere, die sie beseitigt, und den Gruppen, die sie erreicht. Eine Maßnahme, die neue Features ergänzt und keine Barriere beseitigt, hat eine geringe Wirkung auf ausgeschlossene Gruppen."),
        tt("Rate risk by what could go wrong: a fix that only hides a problem (an overlay) or a new feature that adds new barriers carries more risk than a fix at the source.", "Bewerten Sie das Risiko danach, was schiefgehen kann: Eine Behebung, die ein Problem nur verdeckt (ein Overlay), oder ein neues Feature, das neue Barrieren schafft, trägt mehr Risiko als eine Behebung an der Quelle."),
        tt("Fix the source (content, code) before you add a layer on top. A toolbar that promises automatic compliance does not remove the barriers underneath.", "Beheben Sie die Quelle (Inhalt, Code), bevor Sie eine Schicht obendrauf legen. Eine Toolbar, die automatische Konformität verspricht, beseitigt die Barrieren darunter nicht."),
        tt("Say how you will evaluate the measure: which method and which group.", "Sagen Sie, wie Sie die Maßnahme evaluieren: mit welcher Methode und für welche Gruppe."),
        tt("Choose evaluation methods that give different kinds of evidence: a test with users with impairments (why), data by group (how many), a manual audit against WCAG (does it meet the criteria). Automated checks find only part of the problems, so they never stand alone.", "Wählen Sie Evaluationsmethoden, die verschiedene Arten von Belegen liefern: einen Test mit Nutzern mit Einschränkungen (warum), Daten pro Gruppe (wie viele), ein manuelles Audit gegen WCAG (erfüllt es die Kriterien). Automatische Prüfungen finden nur einen Teil der Probleme, sie stehen also nie allein."),
      ]}
    >
      <ComicButton comic={COMICS_D7.A5} art={ART_D7} />
      <WeighExample />
      <DataTable
        caption={tt("Three kinds of evidence for an evaluation, and the question each answers", "Drei Arten von Belegen für eine Evaluation, und die Frage, die jede beantwortet")}
        head={[tt("Kind of evidence", "Art des Belegs"), tt("It answers", "Es beantwortet"), tt("Example method", "Beispielmethode")]}
        rows={[
          [tt("Reasons", "Gründe"), tt("Why can a group not finish a task?", "Warum kann eine Gruppe eine Aufgabe nicht abschließen?"), tt("A usability test with learners with impairments.", "Ein Usability-Test mit Lernenden mit Einschränkungen.")],
          [tt("Counts", "Zahlen"), tt("How many in each group are blocked?", "Wie viele in jeder Gruppe sind blockiert?"), tt("Task success and drop-out by user group.", "Aufgabenerfolg und Abbruch pro Nutzergruppe.")],
          [tt("Conformance", "Konformität"), tt("Does the product meet the criteria?", "Erfüllt das Produkt die Kriterien?"), tt("A manual check with the keyboard and a screen reader; an automated check in each release, which finds only part of the problems.", "Eine manuelle Prüfung mit Tastatur und Screenreader; eine automatische Prüfung in jedem Release, die nur einen Teil der Probleme findet.")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop, its three measures and its reasons are made up for this example. The task has its own options and its own answer.", "LearnLoop, seine drei Maßnahmen und seine Gründe sind für dieses Beispiel erfunden. Die Aufgabe hat ihre eigenen Optionen und ihre eigene Antwort.")}</p>
      </Callout>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("Accessibility is a core quality that widens reach, meets growing requirements and improves the platform for everyone.", "Barrierefreiheit ist eine Kernqualität, die die Reichweite erweitert, wachsende Anforderungen erfüllt und die Plattform für alle verbessert.")}
      sources={["who2022", "bfsg", "en301549", "bitv", "wcag22"]}
      reasoning={[
        tt("State the strategic case in three parts: rules and expectations, reach, and long-term quality. Add the cost of not acting.", "Nennen Sie den strategischen Fall in drei Teilen: Regeln und Erwartungen, Reichweite und langfristige Qualität. Ergänzen Sie die Kosten des Nichthandelns."),
        tt("Say which groups the platform does not reach today, and how you know (or will find out).", "Sagen Sie, welche Gruppen die Plattform heute nicht erreicht, und woher Sie es wissen (oder herausfinden werden)."),
        tt("Write legal statements with care: the rule, the year, what is unclear.", "Schreiben Sie rechtliche Aussagen sorgfältig: die Regel, das Jahr, was unklar ist."),
        tt("Argue to management in its terms: tenders won or lost, complaints, completion by group, risk.", "Argumentieren Sie gegenüber dem Management in dessen Begriffen: gewonnene oder verlorene Ausschreibungen, Beschwerden, Abschluss pro Gruppe, Risiko."),
      ]}
    >
      <ComicButton comic={COMICS_D7.B1} art={ART_D7} />
      <StrategicChain />
      <DataTable
        caption={tt("What to watch with each reason", "Worauf bei jedem Grund zu achten ist")}
        head={[tt("Reason", "Grund"), tt("What to watch", "Worauf zu achten ist")]}
        rows={[
          [tt("Rules and expectations", "Regeln und Erwartungen"), tt("The rules are in flux; scope and dates need checking. B2B platforms may be covered through customers' demands even where the law does not reach them.", "Die Regeln sind im Fluss; Geltungsbereich und Termine müssen geprüft werden. B2B-Plattformen können über die Forderungen von Kunden erfasst sein, auch wo das Gesetz sie nicht erreicht.")],
          [tt("Reach", "Reichweite"), tt("Reach is measurable: count which groups finish and which do not.", "Reichweite ist messbar: Zählen Sie, welche Gruppen abschließen und welche nicht.")],
          [tt("Long-term quality", "Langfristige Qualität"), tt("Retrofitting later is more expensive than building in.", "Nachrüsten später ist teurer als Einbauen.")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop is made up for this example. The figure of one in six comes from the WHO (2022); the rules are in flux, so check the scope and the dates before you state them.", "LearnLoop ist für dieses Beispiel erfunden. Die Zahl von einem von sechs stammt von der WHO (2022); die Regeln sind im Fluss, prüfen Sie also Geltungsbereich und Termine, bevor Sie sie nennen.")}</p>
      </Callout>
      <Extra id="B1">
        <p>{tt("UX as social responsibility: the plan's discussion line frames inclusion as social responsibility. In a training provider this has a concrete form: learners who are excluded cannot reach the qualification that the platform exists to give.", "UX als gesellschaftliche Verantwortung: Die Diskussionszeile des Plans rahmt Inklusion als gesellschaftliche Verantwortung. Bei einem Weiterbildungsanbieter hat das eine konkrete Form: Ausgeschlossene Lernende können die Qualifikation nicht erreichen, die die Plattform vermitteln soll.")}</p>
        <p>{tt("The business case: practitioners list benefits such as a larger audience, fewer support requests, better search visibility and lower legal risk. They are plausible, but figures differ by case; use your own data where you can.", "Der Business Case: Praktiker nennen Vorteile wie ein größeres Publikum, weniger Supportanfragen, bessere Auffindbarkeit und geringeres rechtliches Risiko. Sie sind plausibel, aber die Zahlen unterscheiden sich je Fall; nutzen Sie Ihre eigenen Daten, wo Sie können.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Inclusion is cheaper built in than bolted on, but it competes with new features for a limited budget. Weigh reach against cost and say what waits.", "Inklusion ist eingebaut billiger als aufgesetzt, konkurriert aber mit neuen Features um ein begrenztes Budget. Wägen Sie Reichweite gegen Kosten ab und sagen Sie, was wartet.")}
      sources={["wcag22", "gibbons2018", "brooke1996"]}
      reasoning={[
        tt("Weigh each measure by reach (how many learners and which groups), cost and risk. Say what the cheapest, broadest measure is and start there.", "Wägen Sie jede Maßnahme nach Reichweite (wie viele Lernende und welche Gruppen), Kosten und Risiko ab. Sagen Sie, welche die günstigste, breiteste Maßnahme ist, und beginnen Sie dort."),
        tt("Integrate accessibility into existing processes so that it is not a recurring project: requirements, design review, definition of done, content standard, procurement.", "Integrieren Sie Barrierefreiheit in bestehende Prozesse, damit sie kein wiederkehrendes Projekt ist: Anforderungen, Design-Review, Definition von „fertig“, Inhaltsstandard, Einkauf."),
        tt("Be wary of a measure that promises to make a platform compliant automatically. Tools help but do not replace fixing content and code.", "Seien Sie vorsichtig bei einer Maßnahme, die verspricht, eine Plattform automatisch konform zu machen. Werkzeuge helfen, ersetzen aber nicht das Beheben von Inhalt und Code."),
        tt("Name what waits, and say what the learners who wait experience in the meantime.", "Nennen Sie, was wartet, und sagen Sie, was die Lernenden, die warten, in der Zwischenzeit erleben."),
      ]}
    >
      <ComicButton comic={COMICS_D7.B2} art={ART_D7} />
      <ReachMatrix />
      <DataTable
        caption={tt("Four conflicts and a rule for deciding each", "Vier Konflikte und eine Regel, jeden zu entscheiden")}
        head={[tt("Conflict", "Konflikt"), tt("One side gets", "Die eine Seite bekommt"), tt("The other side gets", "Die andere Seite bekommt"), tt("A rule for deciding", "Eine Regel zum Entscheiden")]}
        rows={[
          [tt("Inclusion against a new feature", "Inklusion gegen ein neues Feature"), tt("More learners who can use the platform", "Mehr Lernende, die die Plattform nutzen können"), tt("A visible new feature", "Ein sichtbares neues Feature"), tt("Count excluded groups first; a feature that nobody can use adds nothing.", "Zählen Sie zuerst ausgeschlossene Gruppen; ein Feature, das niemand nutzen kann, bringt nichts.")],
          [tt("Fix at the source against a quick patch", "Behebung an der Quelle gegen einen schnellen Flicken"), tt("A lasting fix", "Eine dauerhafte Behebung"), tt("Speed and low cost today", "Tempo und niedrige Kosten heute"), tt("Prefer the source; use a patch only as a stop-gap with a date.", "Bevorzugen Sie die Quelle; nutzen Sie einen Flicken nur als Notlösung mit Datum.")],
          [tt("Integration against add-on", "Integration gegen Add-on"), tt("Accessibility in every release", "Barrierefreiheit in jedem Release"), tt("A one-off project", "Ein einmaliges Projekt"), tt("Integrate: a definition of done and automated checks; run a project only for the backlog.", "Integrieren: eine Definition von „fertig“ und automatische Prüfungen; ein Projekt nur für den Rückstau.")],
          [tt("Full audit against targeted fixes", "Vollständiges Audit gegen gezielte Behebungen"), tt("A complete picture", "Ein vollständiges Bild"), tt("A fast improvement on the most-used courses", "Eine schnelle Verbesserung der meistgenutzten Kurse"), tt("Fix the most-used paths first, audit in stages.", "Beheben Sie zuerst die meistgenutzten Pfade, prüfen Sie in Stufen.")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop and its seven measures are made up for this example. The positions in the picture are a reading of the example, not a score.", "LearnLoop und seine sieben Maßnahmen sind für dieses Beispiel erfunden. Die Positionen im Bild sind eine Lesart des Beispiels, keine Note.")}</p>
      </Callout>
      <Extra id="B2">
        <p>{tt("Costs and benefits in the risk analysis: the plan's risk analysis for Day 7 is costs against benefits. Costs: budget, time, training of authors. Risks of not acting: complaints, lost tenders, legal exposure where the law applies, learners lost. Both columns need a number or a statement, not a feeling.", "Kosten und Nutzen in der Risikoanalyse: Die Risikoanalyse des Plans für Tag 7 ist Kosten gegen Nutzen. Kosten: Budget, Zeit, Training der Autoren. Risiken des Nichthandelns: Beschwerden, verlorene Ausschreibungen, rechtliche Risiken, wo das Gesetz gilt, verlorene Lernende. Beide Spalten brauchen eine Zahl oder eine Aussage, kein Gefühl.")}</p>
        <p>{tt("Do not rely on one audit: a single audit gives a snapshot; without an integration into the process, the platform drifts back. The audit becomes useful when its findings enter the backlog and the next release is checked.", "Verlassen Sie sich nicht auf ein einziges Audit: Ein einzelnes Audit gibt eine Momentaufnahme; ohne Integration in den Prozess fällt die Plattform zurück. Das Audit wird nützlich, wenn seine Befunde in den Rückstau kommen und das nächste Release geprüft wird.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("Measure UX quality by group, with a method that shows why and one that shows how many. Decide under uncertainty with a figure and a date for reversal.", "Messen Sie UX-Qualität pro Gruppe, mit einer Methode, die zeigt, warum, und einer, die zeigt, wie viele. Entscheiden Sie unter Unsicherheit mit einer Zahl und einem Termin für die Rücknahme.")}
      sources={["brooke1996", "rodden2010", "gdpr", "klein2007", "bezos2016"]}
      reasoning={[
        tt("Choose KPIs by what they show about excluded groups: success and drop-out by group, share of pages that meet AA, issues and time to fix.", "Wählen Sie KPIs danach, was sie über ausgeschlossene Gruppen zeigen: Erfolg und Abbruch pro Gruppe, Anteil der Seiten, die AA erfüllen, Probleme und Zeit bis zur Behebung."),
        tt("Choose at least one method that gives reasons (a test with users) and one that gives counts or conformance (analytics, audit).", "Wählen Sie mindestens eine Methode, die Gründe liefert (ein Test mit Nutzern), und eine, die Zahlen oder Konformität liefert (Analytics, Audit)."),
        tt("A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up. The reversal condition has a figure and a time.", "Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten. Die Rücknahmebedingung hat eine Zahl und eine Zeit."),
        tt("Ask who decides: a role with the evidence it needs, so that accessibility does not depend on one person's interest.", "Fragen Sie, wer entscheidet: eine Rolle mit den Belegen, die sie braucht, damit Barrierefreiheit nicht vom Interesse einer einzelnen Person abhängt."),
        tt("Check data-protection duties before measuring by group.", "Prüfen Sie Datenschutzpflichten, bevor Sie pro Gruppe messen."),
        tt("Giving up nothing means you have not decided: name what you postpone.", "Auf nichts zu verzichten heißt, nicht entschieden zu haben: Nennen Sie, was Sie verschieben."),
      ]}
    >
      <ComicButton comic={COMICS_D7.B3} art={ART_D7} />
      <AverageHides />
      <DataTable
        caption={tt("Five KPIs for inclusion, why each fits, and the method to read it", "Fünf KPIs für Inklusion, warum jeder passt, und die Methode, ihn zu lesen")}
        head={[tt("KPI", "KPI"), tt("Why it fits inclusion", "Warum er zu Inklusion passt"), tt("Method to read it", "Methode, ihn zu lesen")]}
        rows={[
          [tt("Task success by user group", "Aufgabenerfolg pro Nutzergruppe"), tt("Shows whether a group cannot finish the main task.", "Zeigt, ob eine Gruppe die Hauptaufgabe nicht abschließen kann."), tt("Usability tests with learners with impairments; analytics by group where lawful.", "Usability-Tests mit Lernenden mit Einschränkungen; Analytics pro Gruppe, wo zulässig.")],
          [tt("Drop-out by group", "Abbruch pro Gruppe"), tt("A symptom of exclusion.", "Ein Symptom von Ausschluss."), tt("Analytics; interviews for the reason.", "Analytics; Interviews für den Grund.")],
          [tt("Share of pages that meet WCAG 2.2 AA", "Anteil der Seiten, die WCAG 2.2 AA erfüllen"), tt("Measures the product against the standard.", "Misst das Produkt am Standard."), tt("Manual audit and automated checks.", "Manuelles Audit und automatische Prüfungen.")],
          [tt("Access problems reported, and time to fix", "Gemeldete Zugangsprobleme und Zeit bis zur Behebung"), tt("Shows whether the process works.", "Zeigt, ob der Prozess funktioniert."), tt("The support channel and the backlog.", "Der Support-Kanal und der Rückstau.")],
          [tt("Satisfaction by group (for example SUS)", "Zufriedenheit pro Gruppe (zum Beispiel SUS)"), tt("A compact signal of trouble.", "Ein kompaktes Signal für Schwierigkeiten."), tt("A short questionnaire.", "Ein kurzer Fragebogen.")],
        ]}
      />
      <Callout label={tt("Data protection", "Datenschutz")} tone="rust">
        <p>{tt("Measuring by group may touch special categories of data. Ask whether you need it, how you obtain consent, and whether a test with volunteers is enough. This is a DSGVO question, not only a UX one.", "Pro Gruppe zu messen kann besondere Kategorien von Daten berühren. Fragen Sie, ob Sie es brauchen, wie Sie die Einwilligung einholen und ob ein Test mit Freiwilligen genügt. Das ist eine DSGVO-Frage, nicht nur eine UX-Frage.")}</p>
      </Callout>
      <Callout label={tt("Do not guess", "Nicht raten")}>
        <p>{tt("Do not guess how many learners need access features. If the platform does not record it, say you do not know; a test with a few learners shows the barrier, and a survey (with consent) can show the number.", "Raten Sie nicht, wie viele Lernende Zugangsfunktionen brauchen. Wenn die Plattform es nicht erfasst, sagen Sie, dass Sie es nicht wissen; ein Test mit einigen Lernenden zeigt die Barriere, und eine Umfrage (mit Einwilligung) kann die Zahl zeigen.")}</p>
      </Callout>
      <DecisionFrame />
      <Extra id="B3">
        <p>{tt("Premortem: Klein's premortem asks the team to imagine that the inclusion strategy failed. The typical answers are that accessibility stayed a project, authors did not follow the standard, and an overlay was bought instead of fixing the source. Each answer becomes a check.", "Premortem: Kleins Premortem bittet das Team, sich vorzustellen, die Inklusionsstrategie sei gescheitert. Die typischen Antworten sind, dass Barrierefreiheit ein Projekt blieb, Autoren den Standard nicht befolgten und ein Overlay gekauft wurde, statt die Quelle zu beheben. Jede Antwort wird zu einer Prüfung.")}</p>
        <p>{tt("One-way and two-way doors: Bezos separates hard-to-reverse decisions from cheap-to-reverse ones. Fixing five courses and testing is a two-way door; a platform replacement is a one-way door.", "Einbahn- und Zweiwegtüren: Bezos trennt schwer umkehrbare Entscheidungen von leicht umkehrbaren. Fünf Kurse zu beheben und zu testen ist eine Zweiwegtür; ein Plattformwechsel ist eine Einbahntür.")}</p>
      </Extra>
    </MaterialCard>
  );
}
