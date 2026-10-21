"use client";

import { MeasureThumb, PlainMock, PourMock, UserMock, WcagMock } from "@/components/day13/mocks";
import type { WcagOn } from "@/components/day13/mocks";
import { MatrixStory, StateFig, SwitchFig, WeighFig } from "@/components/dayFree/figs";
import { ChainFig, DecisionFrameFig } from "@/components/materi/figures";
import { tt } from "@/lib/lang";

/**
 * Day 13 · the teaching diagrams of Materi A and B. Example company: LearnLoop, an online-course provider; never AccessLearn, so no task is answered here. Interactive ones carry
 * "The point", "Walk me through it" and an always-visible "What this shows" (CLAUDE.md #20, #36, #51); the static ones are drawn pictures (#52).
 */

/* ------------------------------------------------------------------ A1 · one lesson page, three learners (interactive) */

export function UsersFig() {
  return (
    <StateFig
      label={tt("The same LearnLoop lesson page as three learners meet it · Exploratory · Case assumption", "Dieselbe LearnLoop-Lektionsseite, wie drei Lernende ihr begegnen · Explorativ · Fallannahme")}
      point={tt("Inclusive design asks who is left out, not only whether a typical user finds a page easy. The same page can be fine for one learner and a dead end for another, depending on whether they see it, can operate it, or can follow it.", "Inklusives Design fragt, wer ausgeschlossen bleibt, nicht nur, ob ein typischer Nutzer eine Seite leicht findet. Dieselbe Seite kann für eine Lernende in Ordnung und für eine andere eine Sackgasse sein, je nachdem, ob sie sie sieht, bedienen oder ihr folgen kann.")}
      states={[
        { id: "vision", button: tt("Mia, low vision", "Mia, eingeschränktes Sehen"), picture: <UserMock kind="vision" />, insight: tt("In plain words: the text is pale grey on white, and Mia can barely read it. She can still use the page, with a zoom or a high-contrast setting, so this barrier slows her.", "In einfachen Worten: Der Text ist hellgrau auf Weiß, und Mia kann ihn kaum lesen. Sie kann die Seite noch nutzen, mit Zoom oder einer Hochkontrast-Einstellung, diese Barriere bremst sie also.") },
        { id: "keys", button: tt("Tom, keyboard only", "Tom, nur Tastatur"), picture: <UserMock kind="keys" />, insight: tt("In plain words: the menu opens only on mouse hover, and Tom presses Tab in vain. He cannot reach a single course, so this barrier stops him completely.", "In einfachen Worten: Das Menü öffnet sich nur bei Mausüberfahrt, und Tom drückt vergeblich Tab. Er erreicht keinen einzigen Kurs, diese Barriere stoppt ihn also vollständig.") },
        { id: "mind", button: tt("Nia, long text is hard", "Nia, langer Text fällt schwer"), picture: <UserMock kind="mind" />, insight: tt("In plain words: a wall of text with no headings, so Nia does not know where to start or where the step she needs is. She may give up, so this barrier loses her.", "In einfachen Worten: eine Textwand ohne Überschriften, Nia weiß also nicht, wo sie anfangen soll oder wo der Schritt ist, den sie braucht. Sie gibt vielleicht auf, diese Barriere verliert sie also.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A2 · the four principles (static) */

export function PourFig() {
  return <PourMock />;
}

/* ------------------------------------------------------------------ A3 · a lesson page that gains four WCAG fixes (interactive) */

export function WcagFig() {
  return (
    <SwitchFig
      label={tt("One LearnLoop lesson page and four WCAG fixes · Exploratory · Case assumption", "Eine LearnLoop-Lektionsseite und vier WCAG-Korrekturen · Explorativ · Fallannahme")}
      point={tt("WCAG turns the four principles into testable requirements. Four matter most on a learning platform: enough contrast, a text alternative for images, a clear structure, and keyboard use. Each is a small, checkable change, and each frees a different group of learners.", "WCAG macht die vier Prinzipien zu prüfbaren Anforderungen. Vier zählen auf einer Lernplattform am meisten: genug Kontrast, eine Textalternative für Bilder, eine klare Struktur und Tastaturbedienung. Jede ist eine kleine, prüfbare Änderung, und jede befreit eine andere Gruppe von Lernenden.")}
      switches={[
        { id: "contrast", label: tt("Contrast 4.5 : 1", "Kontrast 4,5 : 1") },
        { id: "alt", label: tt("Text alternative", "Textalternative") },
        { id: "structure", label: tt("Clear structure", "Klare Struktur") },
        { id: "keyboard", label: tt("Keyboard use", "Tastaturbedienung") },
      ]}
      start={{ contrast: false, alt: false, structure: false, keyboard: false }}
      picture={(on) => <WcagMock on={on as unknown as WcagOn} />}
      insight={(on) => {
        const n = [on.contrast, on.alt, on.structure, on.keyboard].filter(Boolean).length;
        return tt(
          `In plain words: ${n} of the 4 fixes are on. ${on.contrast ? "The text is dark enough to read in any light." : "The text is pale and hard to read."} ${on.alt ? "The chart has words, so a screen reader can say it." : "The chart has no words, so a blind learner misses it."} ${on.structure ? "Headings show where each step begins." : "There are no headings."} ${on.keyboard ? "The menu can be reached with Tab." : "The menu needs a mouse."}`,
          `In einfachen Worten: ${n} von 4 Korrekturen sind an. ${on.contrast ? "Der Text ist dunkel genug, um bei jedem Licht gelesen zu werden." : "Der Text ist blass und schwer lesbar."} ${on.alt ? "Das Diagramm hat Worte, ein Screenreader kann es also sagen." : "Das Diagramm hat keine Worte, eine blinde Lernende verpasst es also."} ${on.structure ? "Überschriften zeigen, wo jeder Schritt beginnt." : "Es gibt keine Überschriften."} ${on.keyboard ? "Das Menü lässt sich mit Tab erreichen." : "Das Menü braucht eine Maus."}`,
        );
      }}
    />
  );
}

/* ------------------------------------------------------------------ A4 · plain structure before and after (static) */

export function PlainFig() {
  return <PlainMock />;
}

/* ------------------------------------------------------------------ A5 · LearnLoop weighs three measures (interactive) */

export function WeighExample() {
  return (
    <WeighFig
      label={tt("A worked example: LearnLoop weighs three accessibility measures · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei Barrierefreiheitsmaßnahmen ab · Explorativ")}
      point={tt("Rate a measure by how many learners it frees from a barrier and how badly they were blocked, by the work it takes, and by what could go wrong. A small fix that stops a group from being blocked beats a big rewrite that takes months and helps only a little. Give a reason for every rating.", "Bewerten Sie eine Maßnahme danach, wie viele Lernende sie von einer Barriere befreit und wie stark sie blockiert waren, wie viel Arbeit sie macht und was schiefgehen kann. Eine kleine Korrektur, die eine Gruppe nicht mehr blockiert, schlägt eine große Überarbeitung, die Monate dauert und nur wenig hilft. Geben Sie für jede Bewertung einen Grund.")}
      company="LearnLoop"
      context={tt("many lessons, little time, three ideas", "viele Lektionen, wenig Zeit, drei Ideen")}
      impactLabel={tt("Impact", "Wirkung")}
      order={["impact", "effort", "risk"]}
      items={[
        { id: "w1", name: tt("A skip link and a visible focus on every page", "Ein Sprunglink und ein sichtbarer Fokus auf jeder Seite"), thumb: <MeasureThumb kind="nav" />, impact: { level: 3, reason: tt("Keyboard users can finally move through every page, so a group that was stopped is freed.", "Tastaturnutzer können sich endlich durch jede Seite bewegen, eine Gruppe, die gestoppt war, ist also befreit.") }, effort: { level: 1, reason: tt("It is one change in the page template, which every page uses: Low.", "Es ist eine Änderung in der Seitenvorlage, die jede Seite nutzt: Niedrig.") }, risk: { level: 1, reason: tt("A small change in one place; little can go wrong.", "Eine kleine Änderung an einer Stelle; wenig kann schiefgehen.") } },
        { id: "w2", name: tt("Captions for the ten most-viewed videos", "Untertitel für die zehn meistgesehenen Videos"), thumb: <MeasureThumb kind="alt" />, impact: { level: 3, reason: tt("Deaf learners get the content of the videos that most learners watch.", "Gehörlose Lernende bekommen den Inhalt der Videos, die die meisten Lernenden sehen.") }, effort: { level: 2, reason: tt("Ten videos have to be written out and checked, which is real work but a bounded amount: Mid.", "Zehn Videos müssen ausgeschrieben und geprüft werden, das ist echte Arbeit, aber in begrenztem Umfang: Mittel.") }, risk: { level: 1, reason: tt("It adds words to the videos and removes nothing.", "Es ergänzt Worte zu den Videos und entfernt nichts.") } },
        { id: "w3", name: tt("Rewrite all lessons in plain language", "Alle Lektionen in schlichter Sprache neu schreiben"), thumb: <MeasureThumb kind="everything" />, impact: { level: 2, reason: tt("It helps many learners a little, but only once all lessons are done.", "Es hilft vielen Lernenden ein wenig, aber erst, wenn alle Lektionen fertig sind.") }, effort: { level: 3, reason: tt("Every lesson has to be rewritten and checked, which takes months: High.", "Jede Lektion muss neu geschrieben und geprüft werden, das dauert Monate: Hoch.") }, risk: { level: 3, reason: tt("The time may run out before it is finished, and meanwhile nothing improves.", "Die Zeit kann ablaufen, bevor es fertig ist, und bis dahin verbessert sich nichts.") } },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B1 · requirement, priority, process, measure (static) */

export function StrategyChain() {
  return (
    <ChainFig
      label={tt("An accessibility strategy: requirement, priority, process, measure", "Eine Barrierefreiheitsstrategie: Anforderung, Priorität, Prozess, Messung")}
      steps={[
        { h: tt("Requirement", "Anforderung"), b: tt("WCAG 2.2 level AA is the minimum, not the goal.", "WCAG 2.2 Stufe AA ist das Minimum, nicht das Ziel."), kind: "a", tag: tt("The floor", "Die Untergrenze") },
        { h: tt("Priority", "Priorität"), b: tt("Start where most learners meet the barrier.", "Beginnen Sie dort, wo die meisten Lernenden auf die Barriere treffen."), kind: "s", tag: tt("Reach first", "Reichweite zuerst") },
        { h: tt("Process", "Prozess"), b: tt("Check at design review, so new content stays accessible.", "Prüfen Sie im Design-Review, damit neuer Inhalt barrierefrei bleibt."), kind: "m", tag: tt("Prevent", "Verhindern") },
        { h: tt("Measure", "Messung"), b: tt("Indicators that management can read.", "Indikatoren, die das Management lesen kann."), kind: "a", tag: tt("Show progress", "Fortschritt zeigen") },
      ]}
      caption={tt("Accessibility is not an add-on: it is a standard that is built in, checked and measured, like security.", "Barrierefreiheit ist kein Add-on: Sie ist ein Standard, der eingebaut, geprüft und gemessen wird, wie Sicherheit.")}
    />
  );
}

/* ------------------------------------------------------------------ B2 · cost against reach (interactive) */

export function ReachMatrix() {
  return (
    <MatrixStory
      label={tt("A worked example: six LearnLoop measures by cost and reach · Exploratory", "Ein durchgerechnetes Beispiel: sechs LearnLoop-Maßnahmen nach Kosten und Reichweite · Explorativ")}
      point={tt("Accessibility competes with cost, and a standard competes with flexibility. Rank measures by how many learners gain against what it costs: cheap measures with wide reach go first, and a cheap overlay that removes no barrier is not a measure at all.", "Barrierefreiheit konkurriert mit Kosten, und ein Standard konkurriert mit Flexibilität. Ordnen Sie Maßnahmen danach, wie viele Lernende profitieren, gegen das, was es kostet: günstige Maßnahmen mit großer Reichweite kommen zuerst, und ein günstiges Overlay, das keine Barriere beseitigt, ist gar keine Maßnahme.")}
      title={tt("Six LearnLoop measures by cost (to the right) and reach, that is how many learners gain (upwards)", "Sechs LearnLoop-Maßnahmen nach Kosten (nach rechts) und Reichweite, also wie viele Lernende profitieren (nach oben)")}
      xLabel={tt("Cost", "Kosten")}
      yLabel={tt("Reach", "Reichweite")}
      quads={[tt("Cheap, wide reach: first", "Günstig, große Reichweite: zuerst"), tt("Costly, wide reach: plan it", "Teuer, große Reichweite: einplanen"), tt("Cheap, narrow reach", "Günstig, kleine Reichweite"), tt("Costly, narrow reach: avoid", "Teuer, kleine Reichweite: meiden")]}
      points={[
        { id: "a", letter: "A", x: 0.14, y: 0.62, name: tt("Raise the text contrast", "Den Textkontrast anheben"), reading: tt("One change in the style sheet, and every page helps learners with low vision and anyone in bright light. Cheap, with wide reach.", "Eine Änderung im Stylesheet, und jede Seite hilft Lernenden mit eingeschränktem Sehvermögen und allen bei hellem Licht. Günstig, mit großer Reichweite.") },
        { id: "b", letter: "B", x: 0.3, y: 0.88, name: tt("A keyboard-operable menu and clear structure", "Ein tastaturbedienbares Menü und klare Struktur"), reading: tt("It opens every course for keyboard users, helps learners who find structure hard, and everyone finds courses faster. Mid cost, the widest reach.", "Es öffnet jeden Kurs für Tastaturnutzer, hilft Lernenden, denen Struktur schwerfällt, und alle finden Kurse schneller. Mittlere Kosten, größte Reichweite.") },
        { id: "c", letter: "C", x: 0.86, y: 0.5, name: tt("A text alternative for all 2,000 items", "Eine Textalternative für alle 2.000 Inhalte"), reading: tt("It matters a lot to blind and deaf learners, but the cost is very high and the gain arrives only at the end. Worth doing, in steps, most-used first.", "Es zählt viel für blinde und gehörlose Lernende, aber die Kosten sind sehr hoch, und der Gewinn kommt erst am Ende. Es lohnt sich, in Schritten, das Meistgenutzte zuerst.") },
        { id: "d", letter: "D", x: 0.2, y: 0.12, name: tt("An accessibility overlay plug-in", "Ein Barrierefreiheits-Overlay-Plug-in"), reading: tt("Cheap and quick, and it removes almost no barrier underneath. Low reach, and a false sense of safety.", "Günstig und schnell, und es beseitigt fast keine Barriere darunter. Kleine Reichweite und ein falsches Sicherheitsgefühl.") },
        { id: "e", letter: "E", x: 0.9, y: 0.16, name: tt("A separate accessible version", "Eine getrennte barrierefreie Fassung"), reading: tt("The highest cost for a narrow group, and a second platform that must be kept up. Costly, narrow reach.", "Die höchsten Kosten für eine kleine Gruppe und eine zweite Plattform, die gepflegt werden muss. Teuer, kleine Reichweite.") },
        { id: "f", letter: "F", x: 0.55, y: 0.74, name: tt("Plain language on the most-used lessons", "Schlichte Sprache bei den meistgenutzten Lektionen"), reading: tt("A mid cost, and it helps learners with dyslexia, non-native speakers and everyone in a hurry. Wide reach, planned in steps.", "Mittlere Kosten, und es hilft Lernenden mit Legasthenie, Nicht-Muttersprachlern und allen in Eile. Große Reichweite, in Schritten geplant.") },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ B3 · a decision with unknown scale, filled in for LearnLoop (static) */

export function DecisionFrame() {
  return (
    <DecisionFrameFig
      label={tt("A decision without knowing how much fails, filled in for LearnLoop", "Eine Entscheidung, ohne zu wissen, wie viel scheitert, für LearnLoop ausgefüllt")}
      caption={tt("The four boxes make a decision checkable. The two boxes below are the rule that makes future decisions less dependent on one person's taste. The figures are made up for the example.", "Die vier Kästen machen eine Entscheidung überprüfbar. Die zwei Kästen darunter sind die Regel, die künftige Entscheidungen weniger vom Geschmack einer einzelnen Person abhängig macht. Die Zahlen sind für das Beispiel erfunden.")}
      boxes={[
        [tt("I decide", "Ich entscheide"), tt("To fix the ten most-visited pages first and to audit five more before I plan the rest.", "Zuerst die zehn meistbesuchten Seiten zu beheben und fünf weitere zu auditieren, bevor ich den Rest plane.")],
        [tt("I do not know", "Ich weiß nicht"), tt("How many barriers the other pages have.", "Wie viele Barrieren die anderen Seiten haben.")],
        [tt("I reverse if", "Ich nehme zurück, wenn"), tt("The audit of five more pages shows more than five barriers per page by the end of month 3.", "das Audit von fünf weiteren Seiten bis Ende von Monat 3 mehr als fünf Barrieren je Seite zeigt.")],
        [tt("I give up", "Ich verzichte auf"), tt("The claim “fully accessible” on the website, for this year.", "die Aussage „vollständig barrierefrei“ auf der Website, in diesem Jahr.")],
      ]}
      rule={[
        [tt("Who decides", "Wer entscheidet"), tt("The head of product with the head of legal.", "Die Leiterin Produkt mit der Leiterin Recht.")],
        [tt("On what evidence", "Auf welcher Grundlage"), tt("The audit results and the complaint count.", "Die Auditergebnisse und die Zahl der Beschwerden.")],
      ]}
    />
  );
}
