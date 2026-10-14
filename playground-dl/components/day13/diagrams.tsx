"use client";

import { MeasureThumb, PlainMock, PourMock, UserMock, WcagMock } from "@/components/day13/mocks";
import type { WcagOn } from "@/components/day13/mocks";
import { MatrixStory, StateFig, SwitchFig, WeighFig } from "@/components/dayGen/figs";
import { ChainFig, DecisionFrameFig } from "@/components/materi/figures";
import { GEN } from "@/data/day13/gen";
import { effortBandOf } from "@/lib/dayGen/model";
import { euro, tt } from "@/lib/lang";

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
      steps={[
        { title: tt("Pale text", "Blasser Text"), say: tt("Let us follow Mia, a learner at LearnLoop who has low vision. The lesson text is pale grey on white. She can squint, zoom in and carry on, but it takes effort every time, and she will tire of it long before the others do.", "Begleiten wir Mia, eine Lernende bei LearnLoop mit eingeschränktem Sehvermögen. Der Lektionstext ist hellgrau auf Weiß. Sie kann blinzeln, hineinzoomen und weitermachen, aber es kostet jedes Mal Mühe, und sie wird es lange vor den anderen leid sein."), look: tt("the pale lines", "die blassen Zeilen") },
        { title: tt("A dead end", "Eine Sackgasse"), say: tt("Now Tom, who uses only a keyboard because of a motor impairment. The course menu opens only when a mouse hovers over it, so pressing Tab skips it. Tom cannot get to any course, and there is nothing he can do about it: the page has stopped him.", "Nun Tom, der wegen einer motorischen Beeinträchtigung nur eine Tastatur nutzt. Das Kursmenü öffnet sich nur, wenn eine Maus darüber fährt, Tab überspringt es also. Tom kommt an keinen Kurs heran, und er kann nichts dagegen tun: Die Seite hat ihn gestoppt."), look: tt("the menu that Tab skips", "das Menü, das Tab überspringt") },
        { title: tt("A wall of text", "Eine Textwand"), say: tt("And Nia, who finds long text hard to follow. The page is one block of text with no headings. She cannot tell where the step she needs begins. So there are barriers that slow, barriers that stop, and barriers that lose people quietly. Press the three buttons to compare.", "Und Nia, der langer Text schwerfällt. Die Seite ist ein Textblock ohne Überschriften. Sie kann nicht sagen, wo der Schritt beginnt, den sie braucht. Es gibt also Barrieren, die bremsen, Barrieren, die stoppen, und Barrieren, die Menschen still verlieren. Drücken Sie die drei Schaltflächen zum Vergleichen."), look: tt("the unbroken block of lines", "der ununterbrochene Block von Zeilen") },
      ]}
      stepStates={["vision", "keys", "mind"]}
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
      steps={[
        { title: tt("A page with four barriers", "Eine Seite mit vier Barrieren"), say: tt("Let us look at a LearnLoop lesson page as it stands: pale text, a chart with no words, no headings, and a menu that needs a mouse. Four learners, each with a different need, are blocked or slowed by it, and none of the four problems is hard to describe.", "Sehen wir uns eine LearnLoop-Lektionsseite an, wie sie jetzt ist: blasser Text, ein Diagramm ohne Worte, keine Überschriften und ein Menü, das eine Maus braucht. Vier Lernende mit je einem anderen Bedarf werden dadurch blockiert oder gebremst, und keines der vier Probleme ist schwer zu beschreiben."), look: tt("the plain page", "die schlichte Seite"), on: { contrast: false, alt: false, structure: false, keyboard: false } },
        { title: tt("Four small fixes", "Vier kleine Korrekturen"), say: tt("Now all four WCAG fixes are on. The text meets a contrast of 4.5 : 1, the chart carries a sentence that says what it shows, headings mark the steps, and the menu can be reached with Tab. The lesson has not changed, only how it is built, and each fix can be tested.", "Jetzt sind alle vier WCAG-Korrekturen an. Der Text erreicht einen Kontrast von 4,5 : 1, das Diagramm trägt einen Satz, der sagt, was es zeigt, Überschriften markieren die Schritte, und das Menü lässt sich mit Tab erreichen. Die Lektion hat sich nicht verändert, nur wie sie gebaut ist, und jede Korrektur lässt sich testen."), look: tt("the sentence under the chart and the headings", "der Satz unter dem Diagramm und die Überschriften"), on: { contrast: true, alt: true, structure: true, keyboard: true } },
        { title: tt("One at a time", "Eines nach dem anderen"), say: tt("A team rarely does all four at once. Press the four switches to add and remove them, and ask for each which learners it frees and what it would cost. Block 1.2 asks you to prioritise exactly this.", "Ein Team macht selten alle vier auf einmal. Drücken Sie die vier Schalter, um sie hinzuzufügen und zu entfernen, und fragen Sie bei jedem, welche Lernenden es befreit und was es kosten würde. Block 1.2 verlangt von Ihnen, genau das zu priorisieren."), look: tt("the contrast fix alone", "die Kontrastkorrektur allein"), on: { contrast: true, alt: false, structure: false, keyboard: false } },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ A4 · plain structure before and after (static) */

export function PlainFig() {
  return <PlainMock />;
}

/* ------------------------------------------------------------------ A5 · LearnLoop weighs three measures (interactive) */

const LL = { budget: 40000, focus: 5000, captions: 12000, rewrite: 30000 };

export function WeighExample() {
  const band = effortBandOf(GEN);
  const L = (n: number) => [tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")][n - 1];
  return (
    <WeighFig
      label={tt("A worked example: LearnLoop weighs three accessibility measures · Exploratory", "Ein durchgerechnetes Beispiel: LearnLoop wägt drei Barrierefreiheitsmaßnahmen ab · Explorativ")}
      point={tt("Rate a measure by how many learners it frees from a barrier and how badly they were blocked, by its printed cost, and by what could go wrong. A cheap fix that stops a group from being blocked beats a big rewrite that takes months and helps only a little.", "Bewerten Sie eine Maßnahme danach, wie viele Lernende sie von einer Barriere befreit und wie stark sie blockiert waren, nach ihren gedruckten Kosten und danach, was schiefgehen kann. Eine günstige Korrektur, die eine Gruppe nicht mehr blockiert, schlägt eine große Überarbeitung, die Monate dauert und nur wenig hilft.")}
      company="LearnLoop"
      budget={LL.budget}
      bands={[{ to: 8000, label: tt("Low", "Niedrig") }, { to: 18000, label: tt("Mid", "Mittel") }, { to: null, label: tt("High", "Hoch") }]}
      band={band}
      impactLabel={tt("Impact", "Wirkung")}
      items={[
        { id: "w1", name: tt("A skip link and a visible focus on every page", "Ein Sprunglink und ein sichtbarer Fokus auf jeder Seite"), cost: LL.focus, thumb: <MeasureThumb kind="nav" />, impact: { level: 3, reason: tt("Keyboard users can finally move through every page, so a group that was stopped is freed.", "Tastaturnutzer können sich endlich durch jede Seite bewegen, eine Gruppe, die gestoppt war, ist also befreit.") }, effortReason: tt(`${euro(LL.focus)} is under ${euro(8000)}: ${L(band(LL.focus))}.`, `${euro(LL.focus)} liegen unter ${euro(8000)}: ${L(band(LL.focus))}.`), risk: { level: 1, reason: tt("A small change in the page template, easy to test.", "Eine kleine Änderung in der Seitenvorlage, leicht zu testen.") } },
        { id: "w2", name: tt("Captions for the ten most-viewed videos", "Untertitel für die zehn meistgesehenen Videos"), cost: LL.captions, thumb: <MeasureThumb kind="alt" />, impact: { level: 3, reason: tt("Deaf learners get the content of the videos that most learners watch.", "Gehörlose Lernende bekommen den Inhalt der Videos, die die meisten Lernenden sehen.") }, effortReason: tt(`${euro(LL.captions)} lies between ${euro(8000)} and ${euro(18000)}: ${L(band(LL.captions))}.`, `${euro(LL.captions)} liegen zwischen ${euro(8000)} und ${euro(18000)}: ${L(band(LL.captions))}.`), risk: { level: 2, reason: tt("The other videos stay without captions, so the gain is partial.", "Die übrigen Videos bleiben ohne Untertitel, der Gewinn ist also teilweise.") } },
        { id: "w3", name: tt("Rewrite all 600 lessons in plain language", "Alle 600 Lektionen in schlichter Sprache neu schreiben"), cost: LL.rewrite, thumb: <MeasureThumb kind="everything" />, impact: { level: 2, reason: tt("It helps many learners a little, but only once all lessons are done.", "Es hilft vielen Lernenden ein wenig, aber erst, wenn alle Lektionen fertig sind.") }, effortReason: tt(`${euro(LL.rewrite)} is above ${euro(18000)}: ${L(band(LL.rewrite))}.`, `${euro(LL.rewrite)} liegen über ${euro(18000)}: ${L(band(LL.rewrite))}.`), risk: { level: 3, reason: tt("It will take months, and the budget may run out before it is finished.", "Es dauert Monate, und das Budget kann ausgehen, bevor es fertig ist.") } },
      ]}
      steps={[
        { title: tt("The setting", "Die Ausgangslage"), say: tt(`Let us look at LearnLoop once more. It has a lot of content, the budget is ${euro(LL.budget)}, time is short, and three ideas are on the table. We rate each on three questions: how many learners it frees and how badly they were blocked (impact), what it costs (effort), and what could go wrong (risk).`, `Sehen wir uns LearnLoop noch einmal an. Es hat viel Inhalt, das Budget beträgt ${euro(LL.budget)}, die Zeit ist knapp, und drei Ideen liegen auf dem Tisch. Wir bewerten jede mit drei Fragen: wie viele Lernende sie befreit und wie stark sie blockiert waren (Wirkung), was sie kostet (Aufwand) und was schiefgehen kann (Risiko).`), look: tt("the three pictures and the dashed budget line", "die drei Bilder und die gestrichelte Budgetlinie") },
        { title: tt("A cheap fix that frees a group", "Eine günstige Korrektur, die eine Gruppe befreit"), say: tt(`A skip link and a visible focus cost ${euro(LL.focus)}, so the effort is ${L(band(LL.focus))}. They free keyboard users who were stopped completely, so the impact is High, and the risk is Low because it is a small change in the template. Captions for ten videos cost ${euro(LL.captions)}, Mid effort, with High impact and Mid risk.`, `Ein Sprunglink und ein sichtbarer Fokus kosten ${euro(LL.focus)}, der Aufwand ist also ${L(band(LL.focus))}. Sie befreien Tastaturnutzer, die vollständig gestoppt waren, die Wirkung ist also Hoch, und das Risiko ist Niedrig, weil es eine kleine Änderung in der Vorlage ist. Untertitel für zehn Videos kosten ${euro(LL.captions)}, Aufwand Mittel, mit Wirkung Hoch und Risiko Mittel.`), look: tt("the first and second rows", "die erste und zweite Zeile") },
        { title: tt("A big rewrite", "Eine große Überarbeitung"), say: tt(`Rewriting all 600 lessons costs ${euro(LL.rewrite)}, so the effort is High. It helps many learners a little and only when it is finished, so the impact is Mid, and the risk is High because the budget may run out first. So: cheap fixes that free a blocked group first, the big job later. Select any cell to read its reason.`, `Alle 600 Lektionen neu zu schreiben kostet ${euro(LL.rewrite)}, der Aufwand ist also Hoch. Es hilft vielen Lernenden ein wenig und erst, wenn es fertig ist, die Wirkung ist also Mittel, und das Risiko ist Hoch, weil das Budget vorher ausgehen kann. Also: zuerst günstige Korrekturen, die eine blockierte Gruppe befreien, die große Aufgabe später. Wählen Sie eine Zelle, um ihren Grund zu lesen.`), look: tt("the third row", "die dritte Zeile") },
      ]}
      stepRows={[null, "w1", "w3"]}
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
      steps={[
        { title: tt("Cheap and wide", "Günstig und breit"), say: tt("Let us look at LearnLoop's options. Raising the text contrast costs little and helps every page, and a keyboard-operable menu with clear structure opens every course to several groups at once. Both gain many learners for modest cost, so both go first.", "Sehen wir uns LearnLoops Optionen an. Den Textkontrast anzuheben kostet wenig und hilft jeder Seite, und ein tastaturbedienbares Menü mit klarer Struktur öffnet jeden Kurs für mehrere Gruppen auf einmal. Beide gewinnen viele Lernende für mäßige Kosten, beide kommen also zuerst."), look: tt("A and B near the top left", "A und B nahe oben links") },
        { title: tt("Costly or narrow", "Teuer oder schmal"), say: tt("Two other ideas look different. A separate accessible version costs the most and serves a narrow group, and a cheap overlay plug-in removes almost nothing. Neither is a good use of a limited budget, however different their price.", "Zwei andere Ideen sehen anders aus. Eine getrennte barrierefreie Fassung kostet am meisten und dient einer kleinen Gruppe, und ein günstiges Overlay-Plug-in beseitigt fast nichts. Keines ist eine gute Verwendung eines begrenzten Budgets, so verschieden ihr Preis auch ist."), look: tt("D and E at the bottom", "D und E unten") },
        { title: tt("Accessibility against cost", "Barrierefreiheit gegen Kosten"), say: tt("A text alternative for all 2,000 items matters a great deal and costs a great deal. The answer is not to skip it but to do the most-viewed items first and the rest in steps. Select a point to read why it sits where it does.", "Eine Textalternative für alle 2.000 Inhalte zählt sehr viel und kostet sehr viel. Die Antwort ist nicht, sie auszulassen, sondern die meistgesehenen Inhalte zuerst und den Rest in Schritten zu machen. Wählen Sie einen Punkt, um zu lesen, warum er dort liegt."), look: tt("C at the right", "C rechts") },
      ]}
      stepPoints={[null, "d", "c"]}
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
