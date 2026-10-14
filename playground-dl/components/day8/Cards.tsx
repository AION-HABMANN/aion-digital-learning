"use client";

import type { ReactNode } from "react";
import { DecisionFrame, DesignChain, FeedbackFig, HierarchyFig, IaTree, MistakesFig, OrientationFig, ReductionMatrix, WeighExample } from "@/components/day8/diagrams";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { tt } from "@/lib/lang";

/**
 * Day 8 · the eight study cards (CLAUDE.md #11, #22, #37, #51, #52). Each card: title → scan line → "In plain words" → body (the picture is the instrument) → the rules
 * it gives the task (folded) → sources → Mark as read. Example company and people: LearnLoop, Tom, Mia, Noor; never StructLearn, so no task is answered here.
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
      scan={tt("Structure comes first. Organise the content so that the learner can answer three questions on any page: where am I, where can I go, what comes next?", "Struktur kommt zuerst. Ordnen Sie den Inhalt so, dass die Lernende auf jeder Seite drei Fragen beantworten kann: Wo bin ich, wohin kann ich, was kommt als Nächstes?")}
      sources={["rosenfeld2015", "spencer2009", "krug2014", "hick1952"]}
      reasoning={[
        tt("Check navigation by three questions: where am I (title, highlighted entry and path agree), where can I go (a few clear sections), what comes next (a Next link or Continue button).", "Prüfen Sie Navigation mit drei Fragen: Wo bin ich (Titel, markierter Eintrag und Pfad stimmen überein), wohin kann ich (wenige klare Bereiche), was kommt als Nächstes (ein Weiter-Link oder Button)."),
        tt("One item has one home. If the same content is reachable from three places under different names, the structure is unclear.", "Ein Eintrag hat einen Ort. Ist derselbe Inhalt von drei Stellen unter verschiedenen Namen erreichbar, ist die Struktur unklar."),
        tt("Name sections after what the learner does (Learn, Find, Progress), not after the system's modules.", "Benennen Sie Bereiche nach dem, was die Lernende tut (Lernen, Finden, Fortschritt), nicht nach den Modulen des Systems."),
        tt("Check a structure with people before you build it: a card sort for the groups, a tree test for the findability.", "Prüfen Sie eine Struktur mit Menschen, bevor Sie sie bauen: einen Card Sort für die Gruppen, einen Tree Test für die Auffindbarkeit."),
      ]}
    >
      <OrientationFig />
      <IaTree />
      <DataTable
        caption={tt("The four parts of an information architecture", "Die vier Teile einer Informationsarchitektur")}
        head={[tt("Part", "Teil"), tt("It decides", "Es entscheidet"), tt("Example at LearnLoop", "Beispiel bei LearnLoop")]}
        rows={[
          [tt("Organisation system", "Organisationssystem"), tt("How content is grouped.", "Wie Inhalt gruppiert wird."), tt("Four sections: Learn, Find, Progress, Help.", "Vier Bereiche: Lernen, Finden, Fortschritt, Hilfe.")],
          [tt("Labelling system", "Beschriftungssystem"), tt("What each group is called.", "Wie jede Gruppe heißt."), tt("“Learn”, not “Module browser”.", "„Lernen“, nicht „Modul-Browser“.")],
          [tt("Navigation system", "Navigationssystem"), tt("How you move.", "Wie man sich bewegt."), tt("A menu, a path and a Next button.", "Ein Menü, ein Pfad und ein Weiter-Button.")],
          [tt("Search system", "Suchsystem"), tt("How you look for something.", "Wie man etwas sucht."), tt("A search box that finds courses by name.", "Ein Suchfeld, das Kurse nach Namen findet.")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop, Tom and the sections shown are made up for this example. The four parts follow Rosenfeld, Morville and Arango (2015); the trunk test is Krug's (2014).", "LearnLoop, Tom und die gezeigten Bereiche sind für dieses Beispiel erfunden. Die vier Teile folgen Rosenfeld, Morville und Arango (2015); der Trunk-Test stammt von Krug (2014).")}</p>
      </Callout>
      <Extra id="A1">
        <p>{tt("Check a structure before you build it: in a card sort, people group labelled cards into the categories that make sense to them; in a tree test, they try to find items in a text-only version of the menu (Spencer 2009). Both are cheap and use few participants.", "Prüfen Sie eine Struktur, bevor Sie sie bauen: In einem Card Sort gruppieren Menschen beschriftete Karten in die Kategorien, die für sie Sinn ergeben; in einem Tree Test versuchen sie, Einträge in einer reinen Textfassung des Menüs zu finden (Spencer 2009). Beides ist günstig und braucht wenige Teilnehmende.")}</p>
        <p>{tt("Krug's trunk test: drop a visitor on any page. Can they tell what site it is, what page they are on, what the major sections are, what their options are and where they are in the scheme of things? And the more options at a decision point, the longer it takes to choose (Hick 1952), so keep the number of main sections small.", "Krugs Trunk-Test: Setzen Sie einen Besucher auf eine beliebige Seite. Kann er sagen, welche Seite das ist, auf welcher Seite er ist, welche die Hauptbereiche sind, welche Optionen er hat und wo er im Gesamtbild steht? Und je mehr Optionen an einem Entscheidungspunkt, desto länger dauert die Wahl (Hick 1952), halten Sie die Zahl der Hauptbereiche also klein.")}</p>
        <p>{tt("Search is not a cure: a search box helps learners who know the name of what they want, not learners who do not know what exists. Structure and search work together.", "Suche ist kein Heilmittel: Ein Suchfeld hilft Lernenden, die den Namen dessen kennen, was sie wollen, nicht Lernenden, die nicht wissen, was es gibt. Struktur und Suche arbeiten zusammen.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("Use size, colour, contrast and position to show what matters first. Keep it legible, consistent, and reduced to the essentials.", "Nutzen Sie Größe, Farbe, Kontrast und Position, um zu zeigen, was zuerst zählt. Halten Sie es lesbar, konsistent und auf das Wesentliche reduziert.")}
      sources={["wertheimer1923", "nielsen1994", "nielsen2006", "bringhurst2012", "wcag22"]}
      reasoning={[
        tt("Name the one main thing on a screen. If five items have the same size, colour and weight, there is no hierarchy.", "Nennen Sie die eine Hauptsache auf einem Bildschirm. Haben fünf Elemente dieselbe Größe, Farbe und Stärke, gibt es keine Hierarchie."),
        tt("Give the main action the strongest visual weight; make secondary actions quieter.", "Geben Sie der Hauptaktion das stärkste visuelle Gewicht; machen Sie zweitrangige Aktionen ruhiger."),
        tt("Use the same style for the same function across the platform (buttons, links, dates, back).", "Nutzen Sie auf der ganzen Plattform denselben Stil für dieselbe Funktion (Buttons, Links, Daten, Zurück)."),
        tt("Reduce: remove what does not help the learner's goal on the screen before you add anything.", "Reduzieren Sie: Entfernen Sie, was dem Ziel der Lernenden auf dem Bildschirm nicht hilft, bevor Sie etwas hinzufügen."),
        tt("A visual fix does not repair a structural problem. If learners cannot find their course, a new colour scheme will not help.", "Eine visuelle Behebung repariert kein Strukturproblem. Finden Lernende ihren Kurs nicht, hilft ein neues Farbschema nicht."),
      ]}
    >
      <HierarchyFig />
      <DataTable
        caption={tt("Five tools of visual design, and what each does", "Fünf Werkzeuge des visuellen Designs und was jedes bewirkt")}
        head={[tt("Tool", "Werkzeug"), tt("What it does", "Was es bewirkt"), tt("Note", "Hinweis")]}
        rows={[
          [tt("Size, colour, contrast, position", "Größe, Farbe, Kontrast, Position"), tt("The eye goes first to what is largest, most contrasting and in a prominent place.", "Das Auge geht zuerst zu dem, was am größten, kontrastreichsten und an prominenter Stelle ist."), tt("One filled button among quiet links tells the learner where to go.", "Ein gefüllter Button unter ruhigen Links sagt der Lernenden, wohin.")],
          [tt("Grouping (Gestalt)", "Gruppieren (Gestalt)"), tt("Things close together or alike are read as belonging together.", "Dinge, die nah beieinander oder gleich sind, werden als zusammengehörig gelesen."), tt("Group with space, not with boxes everywhere.", "Gruppieren Sie mit Abstand, nicht überall mit Kästen.")],
          [tt("Legibility", "Lesbarkeit"), tt("Contrast of at least 4.5 : 1 (Day 7) and a line of about 45 to 75 characters.", "Kontrast von mindestens 4,5 : 1 (Tag 7) und eine Zeile von etwa 45 bis 75 Zeichen."), tt("Do not rely on colour alone.", "Verlassen Sie sich nicht allein auf Farbe.")],
          [tt("Consistency", "Konsistenz"), tt("The same words and actions mean the same thing.", "Dieselben Worte und Aktionen bedeuten dasselbe."), tt("One of Nielsen's heuristics: consistency and standards.", "Eine von Nielsens Heuristiken: Konsistenz und Standards.")],
          [tt("Reduction", "Reduktion"), tt("Leave out what does not help the goal.", "Weglassen, was dem Ziel nicht hilft."), tt("On text-heavy pages many people scan the top and the left edge more than the rest.", "Auf textlastigen Seiten überfliegen viele Menschen den oberen und den linken Rand mehr als den Rest.")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop, Mia and the course page are made up for this example.", "LearnLoop, Mia und die Kursseite sind für dieses Beispiel erfunden.")}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("Visual design supports learning: Mayer's principles (coherence, signalling, spatial contiguity) say that learners learn better when extra material is removed, when what matters is marked, and when labels sit next to what they describe (Mayer 2009). They are the visual-design side of Day 3's cognitive load.", "Visuelles Design unterstützt das Lernen: Mayers Prinzipien (Kohärenz, Signalisierung, räumliche Nähe) sagen, dass Lernende besser lernen, wenn Zusätzliches entfernt wird, wenn das Wichtige markiert ist und wenn Beschriftungen neben dem stehen, was sie beschreiben (Mayer 2009). Sie sind die visuelle Seite der kognitiven Belastung von Tag 3.")}</p>
        <p>{tt("A style guide, a written set of components and rules (a design system), is how consistency survives a team of several people. Without it, each screen gets its own version of a button.", "Ein Style Guide, ein geschriebener Satz von Komponenten und Regeln (ein Designsystem), ist, wie Konsistenz ein Team aus mehreren Personen übersteht. Ohne ihn bekommt jeder Bildschirm seine eigene Version eines Buttons.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("The learner should be able to see what to do, do it easily, and see that it worked.", "Die Lernende soll sehen können, was zu tun ist, es leicht tun können und sehen, dass es geklappt hat.")}
      sources={["norman2013", "shneiderman2016", "fitts1954", "nielsen1993rt"]}
      reasoning={[
        tt("Find the main call to action on a screen. If there are several of equal weight, the learner has no priority to follow.", "Finden Sie die Hauptaufforderung auf einem Bildschirm. Gibt es mehrere gleichen Gewichts, hat die Lernende keine Priorität, der sie folgen kann."),
        tt("A button label says what happens (“Start lesson”), not what the system does (“Submit form”).", "Eine Buttonbeschriftung sagt, was passiert („Lektion starten“), nicht, was das System tut („Formular absenden“)."),
        tt("Every action gets a visible response within about a second; if it takes longer, show that something is happening.", "Jede Aktion bekommt innerhalb von etwa einer Sekunde eine sichtbare Antwort; dauert es länger, zeigen Sie, dass etwas passiert."),
        tt("Make the main targets large and close to where attention is.", "Machen Sie die Hauptziele groß und nah dort, wo die Aufmerksamkeit ist."),
      ]}
    >
      <FeedbackFig />
      <DataTable
        caption={tt("Three jobs of interaction design", "Drei Aufgaben des Interaktionsdesigns")}
        head={[tt("Job", "Aufgabe"), tt("What it means", "Was es bedeutet"), tt("Check it by asking", "Prüfen Sie es mit der Frage")]}
        rows={[
          [tt("Intuitive operability", "Intuitive Bedienbarkeit"), tt("Things look like what they do (a button looks like a button, with a clear label).", "Dinge sehen aus wie das, was sie tun (ein Button sieht aus wie ein Button, mit klarer Beschriftung)."), tt("Can a beginner tell what is pressable and what it does?", "Kann ein Einsteiger sagen, was drückbar ist und was es tut?")],
          [tt("Clear call to action", "Klare Handlungsaufforderung"), tt("One main button says what to do next, with a verb and an object.", "Ein Hauptbutton sagt, was als Nächstes zu tun ist, mit einem Verb und einem Objekt."), tt("Which is the one main button on this screen?", "Welcher ist der eine Hauptbutton auf diesem Bildschirm?")],
          [tt("Feedback on actions", "Rückmeldung auf Aktionen"), tt("The platform answers an action at once.", "Die Plattform antwortet sofort auf eine Aktion."), tt("What does the learner see within a second?", "Was sieht die Lernende innerhalb einer Sekunde?")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop and Noor are made up for this example. The three response-time limits are Nielsen's (1993).", "LearnLoop und Noor sind für dieses Beispiel erfunden. Die drei Antwortzeitgrenzen stammen von Nielsen (1993).")}</p>
      </Callout>
      <Extra id="A3">
        <p>{tt("Norman (2013) distinguishes what an object allows (an affordance) from the sign that shows it (a signifier). Fitts's law (1954): the time to reach a target depends on its distance and size, so make the main targets large and place them where the learner's attention already is, which matters especially on a phone.", "Norman (2013) unterscheidet, was ein Objekt erlaubt (eine Affordance), von dem Zeichen, das es zeigt (ein Signifier). Fittssches Gesetz (1954): Die Zeit, ein Ziel zu erreichen, hängt von Entfernung und Größe ab, machen Sie die Hauptziele also groß und platzieren Sie sie dort, wo die Aufmerksamkeit der Lernenden schon ist, was besonders auf dem Handy zählt.")}</p>
        <p>{tt("Progressive disclosure: show only what is needed now and put advanced options behind a link such as “More” (Nielsen 2006). It keeps the first view calm and supports beginners without removing power for others. In a learning platform, feedback is also a result and a next step after a task (Day 4).", "Progressive Disclosure: Zeigen Sie nur, was jetzt gebraucht wird, und legen Sie erweiterte Optionen hinter einen Link wie „Mehr“ (Nielsen 2006). Das hält die erste Ansicht ruhig und unterstützt Einsteiger, ohne anderen Leistung zu nehmen. In einer Lernplattform ist Rückmeldung auch ein Ergebnis und ein nächster Schritt nach einer Aufgabe (Tag 4).")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("Unclear navigation, visual overload and inconsistent design each waste attention, which is the learner's scarcest resource.", "Unklare Navigation, visuelle Überladung und inkonsistentes Design verschwenden jeweils Aufmerksamkeit, die knappste Ressource der Lernenden.")}
      sources={["sweller1998", "nielsen1994", "mayer2009"]}
      reasoning={[
        tt("Sort a fact by what the learner cannot do: find or place themselves (navigation), pick the main thing (overload), rely on what they have learned (inconsistency).", "Ordnen Sie einen Fakt danach, was die Lernende nicht kann: sich finden oder verorten (Navigation), die Hauptsache erkennen (Überladung), sich auf Gelerntes verlassen (Inkonsistenz)."),
        tt("Several buttons of equal weight with no priority is a hierarchy problem (overload), not an inconsistency.", "Mehrere Buttons gleichen Gewichts ohne Priorität sind ein Hierarchieproblem (Überladung), keine Inkonsistenz."),
        tt("The same function with different looks on different screens is inconsistency, even if each screen looks fine alone.", "Dieselbe Funktion mit verschiedenem Aussehen auf verschiedenen Bildschirmen ist Inkonsistenz, auch wenn jeder Bildschirm allein gut aussieht."),
        tt("Explain the cost in terms of attention and working memory (Day 3), not taste.", "Erklären Sie die Kosten in Begriffen von Aufmerksamkeit und Arbeitsgedächtnis (Tag 3), nicht von Geschmack."),
      ]}
    >
      <MistakesFig />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("The three small screens are made up for this example; they are not the task case.", "Die drei kleinen Bildschirme sind für dieses Beispiel erfunden; sie sind nicht der Aufgabenfall.")}</p>
      </Callout>
      <Extra id="A4">
        <p>{tt("Structure lowers load: chunking a menu into four sections and showing a path turns many items to hold into a few (Sweller, van Merriënboer and Paas 1998). This is why the plan places structure before visual polish. A reduced interface helps beginners; experts may want shortcuts, and progressive disclosure serves both (card A3).", "Struktur senkt die Belastung: Ein Menü in vier Bereiche zu gliedern und einen Pfad zu zeigen, macht aus vielen zu haltenden Einträgen wenige (Sweller, van Merriënboer und Paas 1998). Deshalb stellt der Plan Struktur vor den visuellen Feinschliff. Eine reduzierte Oberfläche hilft Einsteigern; Experten wollen vielleicht Abkürzungen, und Progressive Disclosure dient beiden (Karte A3).")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Rate each measure by how much it helps orientation, what it costs and what could go wrong. Structure usually beats surface.", "Bewerten Sie jede Maßnahme danach, wie sehr sie der Orientierung hilft, was sie kostet und was schiefgehen kann. Struktur schlägt meist Oberfläche.")}
      sources={["gibbons2018", "sweller1998"]}
      reasoning={[
        tt("Rate effort by the printed cost: under €8,000 is Low; €8,000 to €15,000 is Mid; above €15,000 is High.", "Bewerten Sie den Aufwand nach den gedruckten Kosten: unter 8.000 € ist Niedrig; 8.000 € bis 15.000 € ist Mittel; über 15.000 € ist Hoch."),
        tt("Rate user impact by what it does for orientation and action: structure and guidance first, surface second.", "Bewerten Sie die Nutzerwirkung danach, was sie für Orientierung und Handeln bewirkt: zuerst Struktur und Führung, dann Oberfläche."),
        tt("Rate risk by what could be added or lost: a measure that adds elements to a cluttered screen carries the risk of more clutter.", "Bewerten Sie das Risiko danach, was hinzukommen oder verloren gehen kann: Eine Maßnahme, die einem überladenen Bildschirm Elemente hinzufügt, trägt das Risiko von noch mehr Unruhe."),
        tt("Justify the order in a sentence that begins from the learner's problem: structure leads to orientation, and orientation leads to use.", "Begründen Sie die Reihenfolge mit einem Satz, der vom Problem der Lernenden ausgeht: Struktur führt zur Orientierung, und Orientierung führt zur Nutzung."),
        tt("Say what you do not know, for example whether learners fail to find content because of the menu or because of the names.", "Sagen Sie, was Sie nicht wissen, zum Beispiel ob Lernende Inhalte wegen des Menüs oder wegen der Namen nicht finden."),
      ]}
    >
      <WeighExample />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop, its costs and its reasons are made up for this example. The task case is in the task.", "LearnLoop, seine Kosten und seine Gründe sind für dieses Beispiel erfunden. Der Aufgabenfall steht in der Aufgabe.")}</p>
      </Callout>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("Design does not only decorate. It steers what learners do, and so what they learn. Fix the structure before the look.", "Design dekoriert nicht nur. Es steuert, was Lernende tun, und damit, was sie lernen. Beheben Sie die Struktur vor dem Aussehen.")}
      sources={["norman2013", "rosenfeld2015", "shneiderman2016"]}
      reasoning={[
        tt("Fix structure first, then hierarchy, then guidance, then surface. A surface change on a broken structure does not reduce drop-out sustainably.", "Beheben Sie zuerst die Struktur, dann die Hierarchie, dann die Führung, dann die Oberfläche. Eine Oberflächenänderung auf einer kaputten Struktur senkt den Abbruch nicht nachhaltig."),
        tt("Argue a design measure by the wrong decision it prevents: “learners no longer pick the wrong menu entry”.", "Begründen Sie eine Designmaßnahme mit der falschen Entscheidung, die sie verhindert: „Lernende wählen nicht mehr den falschen Menüeintrag“."),
        tt("Link every design principle to learning: reduce load (structure), direct attention (hierarchy), confirm progress (feedback).", "Verbinden Sie jedes Designprinzip mit dem Lernen: Belastung senken (Struktur), Aufmerksamkeit lenken (Hierarchie), Fortschritt bestätigen (Rückmeldung)."),
        tt("A rebrand is justified by brand goals; do not present it as a learning measure unless tests show an effect.", "Ein Rebrand wird mit Markenzielen begründet; stellen Sie ihn nicht als Lernmaßnahme dar, solange Tests keine Wirkung zeigen."),
      ]}
    >
      <DesignChain />
      <DataTable
        caption={tt("Four layers of design, what each decides for the learner, and the business effect", "Vier Ebenen des Designs, was jede für die Lernende entscheidet, und die Geschäftswirkung")}
        head={[tt("Design layer", "Designebene"), tt("What it decides for the learner", "Was sie für die Lernende entscheidet"), tt("Typical business effect", "Typische Geschäftswirkung")]}
        rows={[
          [tt("Structure (information architecture, navigation)", "Struktur (Informationsarchitektur, Navigation)"), tt("Where things are; whether they can be found.", "Wo Dinge sind; ob sie gefunden werden können."), tt("Completion, support requests.", "Abschluss, Supportanfragen.")],
          [tt("Hierarchy (visual)", "Hierarchie (visuell)"), tt("What to look at first.", "Worauf zuerst zu schauen ist."), tt("Task success, time to start.", "Aufgabenerfolg, Zeit bis zum Start.")],
          [tt("Guidance (calls to action, feedback)", "Führung (Handlungsaufforderungen, Rückmeldung)"), tt("What to do next.", "Was als Nächstes zu tun ist."), tt("Progress, return rate.", "Fortschritt, Wiederkehrrate.")],
          [tt("Surface (colour, illustration)", "Oberfläche (Farbe, Illustration)"), tt("How the platform feels.", "Wie sich die Plattform anfühlt."), tt("Brand perception; the effect on learning is small unless structure is right.", "Markenwahrnehmung; die Wirkung auf das Lernen ist gering, solange die Struktur nicht stimmt.")],
        ]}
      />
      <Callout label={tt("Where design is overestimated", "Wo Design überschätzt wird")}>
        <p>{tt("The plan's feedback question asks where design is overestimated. Typical places: a new look is paid for when the problem is structure; an animation is added when the problem is that the next step is hidden; a style guide is written and nobody follows it. The test is always the same: which learner decision does this change?", "Die Feedbackfrage des Plans fragt, wo Design überschätzt wird. Typische Stellen: Ein neues Aussehen wird bezahlt, obwohl das Problem die Struktur ist; eine Animation wird ergänzt, obwohl das Problem ist, dass der nächste Schritt versteckt ist; ein Style Guide wird geschrieben, und niemand folgt ihm. Der Test ist immer derselbe: Welche Entscheidung der Lernenden verändert das?")}</p>
      </Callout>
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("The chain follows the plan's coaching: design → behaviour → learning success.", "Die Kette folgt dem Coaching des Plans: Design → Verhalten → Lernerfolg.")}</p>
      </Callout>
      <Extra id="B1">
        <p>{tt("Design principles as a decision tool: a short list (for example “one main action per screen”, “same function, same look”) lets a team decide quickly and consistently. A principle that cannot be used to say no to a proposal is decoration.", "Designprinzipien als Entscheidungswerkzeug: Eine kurze Liste (zum Beispiel „eine Hauptaktion pro Bildschirm“, „dieselbe Funktion, dasselbe Aussehen“) lässt ein Team schnell und einheitlich entscheiden. Ein Prinzip, das nicht genutzt werden kann, um zu einem Vorschlag Nein zu sagen, ist Dekoration.")}</p>
        <p>{tt("Behaviour: Day 4 showed that behaviour needs motivation, ability and a prompt. Structure and guidance work on ability and the prompt; they are the designer's most direct levers.", "Verhalten: Tag 4 hat gezeigt, dass Verhalten Motivation, Fähigkeit und einen Impuls braucht. Struktur und Führung wirken auf Fähigkeit und Impuls; sie sind die direktesten Hebel der Gestalterin.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("A cluttered platform and an over-reduced one both fail. Reduce clutter, keep the guidance and the functions that learners need.", "Eine überladene Plattform und eine übertrieben reduzierte scheitern beide. Reduzieren Sie Unruhe, behalten Sie die Führung und die Funktionen, die Lernende brauchen.")}
      sources={["nielsen2006pd", "nielsen1994", "norman2013"]}
      reasoning={[
        tt("Name both risks: too complex (learners are lost in clutter) and too reduced (learners lose guidance or experts lose function). A plan that names one has not weighed the conflict.", "Nennen Sie beide Risiken: zu komplex (Lernende sind in der Unruhe verloren) und zu reduziert (Lernende verlieren Führung oder Experten verlieren Funktion). Ein Plan, der eines nennt, hat den Konflikt nicht abgewogen."),
        tt("Remove clutter first (banners, equal-weight buttons, duplicate paths); keep guidance (path, Next, help).", "Entfernen Sie zuerst Unruhe (Banner, gleichgewichtige Buttons, doppelte Pfade); behalten Sie die Führung (Pfad, Weiter, Hilfe)."),
        tt("Use progressive disclosure so that beginners see little and experts can reach more.", "Nutzen Sie Progressive Disclosure, damit Einsteiger wenig sehen und Experten mehr erreichen können."),
        tt("Where there is no time or money to test, choose changes that can be reversed, and write the test into the plan.", "Wo Zeit oder Geld zum Testen fehlen, wählen Sie Änderungen, die sich zurücknehmen lassen, und schreiben Sie den Test in den Plan."),
      ]}
    >
      <ReductionMatrix />
      <DataTable
        caption={tt("Four conflicts and a rule for deciding each", "Vier Konflikte und eine Regel, jeden zu entscheiden")}
        head={[tt("Conflict", "Konflikt"), tt("One side gets", "Die eine Seite bekommt"), tt("The other side gets", "Die andere Seite bekommt"), tt("A rule for deciding", "Eine Regel zum Entscheiden")]}
        rows={[
          [tt("Design against functionality", "Design gegen Funktionalität"), tt("A calm, attractive screen", "Ein ruhiger, ansprechender Bildschirm"), tt("All the functions learners and trainers need", "Alle Funktionen, die Lernende und Trainer brauchen"), tt("Keep the functions; change where and when they appear (progressive disclosure).", "Behalten Sie die Funktionen; ändern Sie, wo und wann sie erscheinen (Progressive Disclosure).")],
          [tt("Too complex against too reduced", "Zu komplex gegen zu reduziert"), tt("A light screen for beginners", "Ein leichter Bildschirm für Einsteiger"), tt("Depth and speed for experts", "Tiefe und Tempo für Experten"), tt("Hide advanced options behind “More”; keep help available.", "Legen Sie erweiterte Optionen hinter „Mehr“; halten Sie Hilfe verfügbar.")],
          [tt("Consistency against local fit", "Konsistenz gegen lokale Passung"), tt("The same pattern everywhere", "Dasselbe Muster überall"), tt("A pattern tuned to one screen", "Ein auf einen Bildschirm abgestimmtes Muster"), tt("Default to consistency; break it only with a tested reason.", "Standard ist Konsistenz; brechen Sie sie nur mit einem getesteten Grund.")],
          [tt("Speed against user tests", "Tempo gegen Nutzertests"), tt("A decision this month", "Eine Entscheidung diesen Monat"), tt("A decision based on evidence", "Eine Entscheidung auf Basis von Belegen"), tt("If there is no time to test, choose reversible changes and test afterwards.", "Gibt es keine Zeit zum Testen, wählen Sie umkehrbare Änderungen und testen Sie danach.")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop and its five options are made up for this example. The positions in the picture are a reading of the example, not a score.", "LearnLoop und seine fünf Optionen sind für dieses Beispiel erfunden. Die Positionen im Bild sind eine Lesart des Beispiels, keine Note.")}</p>
      </Callout>
      <Extra id="B2">
        <p>{tt("Design as steering of behaviour: the plan's discussion line is “UX as steering of behaviour”. Every layout nudges: an enlarged button invites a click. State openly what you want learners to do, and check that it is also what they want (see Day 4 on manipulation).", "Design als Steuerung von Verhalten: Die Diskussionszeile des Plans lautet „UX als Steuerung von Verhalten“. Jedes Layout schubst: Ein vergrößerter Button lädt zum Klick ein. Sagen Sie offen, was Lernende tun sollen, und prüfen Sie, dass es auch das ist, was sie wollen (siehe Tag 4 zu Manipulation).")}</p>
        <p>{tt("Beginners: the plan's Day 8 users are beginners. Beginners benefit from structure, visible next steps and plain labels more than from advanced options.", "Einsteiger: Die Nutzer im Plan für Tag 8 sind Einsteiger. Einsteiger profitieren von Struktur, sichtbaren nächsten Schritten und klaren Bezeichnungen mehr als von erweiterten Optionen.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("When you cannot test first, choose changes that can be reversed, write the test into the plan, and name who decides what the design may do.", "Wenn Sie nicht zuerst testen können, wählen Sie Änderungen, die sich zurücknehmen lassen, schreiben Sie den Test in den Plan und nennen Sie, wer entscheidet, was das Design darf.")}
      sources={["spencer2009", "nielsen2000", "klein2007", "bezos2016"]}
      reasoning={[
        tt("A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.", "Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten."),
        tt("A reversal condition has a figure and a time: “fewer than four of five beginners find their course in 30 seconds”.", "Eine Rücknahmebedingung hat eine Zahl und eine Zeit: „weniger als vier von fünf Einsteigern finden ihren Kurs in 30 Sekunden“."),
        tt("Choose a reversible change, and write the test (card sort, tree test, usability test) into the plan.", "Wählen Sie eine umkehrbare Änderung und schreiben Sie den Test (Card Sort, Tree Test, Usability-Test) in den Plan."),
        tt("State design principles that can be used to refuse a proposal, and a guidance concept that answers “where am I, and what next?”.", "Nennen Sie Designprinzipien, mit denen sich ein Vorschlag ablehnen lässt, und ein Führungskonzept, das „Wo bin ich, und was kommt dann?“ beantwortet."),
        tt("Giving up nothing means you have not decided: name what you postpone, for example the visual rebrand.", "Auf nichts zu verzichten heißt, nicht entschieden zu haben: Nennen Sie, was Sie verschieben, zum Beispiel den visuellen Rebrand."),
      ]}
    >
      <DecisionFrame />
      <DataTable
        caption={tt("Five ways to make a design decision you cannot test first safer", "Fünf Wege, eine Designentscheidung, die Sie nicht zuerst testen können, sicherer zu machen")}
        head={[tt("Way", "Weg"), tt("What it looks like", "Wie es aussieht")]}
        rows={[
          [tt("Test cheaply before you build", "Günstig testen, bevor Sie bauen"), tt("A closed card sort with ten learners shows whether the section names make sense; a tree test shows whether they can find items. Both take days.", "Ein geschlossener Card Sort mit zehn Lernenden zeigt, ob die Bereichsnamen Sinn ergeben; ein Tree Test zeigt, ob sie Einträge finden. Beides dauert Tage.")],
          [tt("Prefer reversible changes", "Umkehrbare Änderungen bevorzugen"), tt("Reorganising the menu behind a switch that can be turned off is reversible; a platform rebuilt around an untested structure is not.", "Das Menü hinter einem abschaltbaren Schalter umzuordnen ist umkehrbar; eine Plattform, die um eine ungetestete Struktur herum neu gebaut wird, nicht.")],
          [tt("Set design principles that can say no", "Designprinzipien setzen, die Nein sagen können"), tt("One main action per screen; the same function always looks the same; no information by colour alone.", "Eine Hauptaktion pro Bildschirm; dieselbe Funktion sieht immer gleich aus; keine Information allein durch Farbe.")],
          [tt("A guidance concept", "Ein Führungskonzept"), tt("A path and a marked entry say where; a Next button says what next; a first-visit guide helps newcomers.", "Ein Pfad und ein markierter Eintrag sagen, wo; ein Weiter-Button sagt, was als Nächstes; eine Einführung beim ersten Besuch hilft Neulingen.")],
          [tt("Fix the rule", "Die Regel festlegen"), tt("Name who decides on a design change and what evidence they need: a test, task success, drop-out.", "Nennen Sie, wer über eine Designänderung entscheidet und welche Belege sie braucht: einen Test, Aufgabenerfolg, Abbruch.")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop and its figures are made up for this example; the task case is in the task.", "LearnLoop und seine Zahlen sind für dieses Beispiel erfunden; der Aufgabenfall steht in der Aufgabe.")}</p>
      </Callout>
      <Extra id="B3">
        <p>{tt("Premortem: Klein's premortem asks the team to imagine that the redesign failed. Typical answers: the new names did not make sense to learners, the style guide was ignored, and the redesign removed something experts needed. Each answer becomes a check.", "Premortem: Kleins Premortem bittet das Team, sich vorzustellen, das Redesign sei gescheitert. Typische Antworten: Die neuen Namen ergaben für Lernende keinen Sinn, der Style Guide wurde ignoriert, und das Redesign entfernte etwas, das Experten brauchten. Jede Antwort wird zu einer Prüfung.")}</p>
        <p>{tt("One-way and two-way doors: Bezos separates hard-to-reverse decisions from cheap-to-reverse ones. A menu change behind a switch is a two-way door; replacing the platform is a one-way door.", "Einbahn- und Zweiwegtüren: Bezos trennt schwer umkehrbare Entscheidungen von leicht umkehrbaren. Eine Menüänderung hinter einem Schalter ist eine Zweiwegtür; die Plattform zu ersetzen ist eine Einbahntür.")}</p>
      </Extra>
    </MaterialCard>
  );
}
