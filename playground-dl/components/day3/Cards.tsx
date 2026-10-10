"use client";

import type { ReactNode } from "react";
import { Bul } from "@/components/materi/kit";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { HierarchyPair, MistakesPicture } from "@/components/day3/mocks";
import { Chunking, DecisionFrame, EffectivenessChain, LearningLevels, LoadVsDepth, MemoryFlow, ThreeLoads, WeighExample } from "@/components/day3/diagrams";
import { tt } from "@/lib/lang";

/**
 * Day 3 · the eight study cards (CLAUDE.md #11, #22, #37, #51). Each card: title → scan line → "In plain words" → body (the diagram is the
 * instrument) → the rules it gives the task (folded) → sources → Mark as read. Example company: LearnLoop; never EduCore, so no task is answered
 * here. Deeper reading sits behind a quiet "Show" row, because no task block needs it.
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
      scan={tt("Learning happens in three steps: attention picks something, working memory works on it, long-term memory keeps it. A screen can help or hinder each step.", "Lernen geschieht in drei Schritten: Die Aufmerksamkeit wählt etwas, das Arbeitsgedächtnis bearbeitet es, das Langzeitgedächtnis behält es. Ein Bildschirm kann jeden Schritt unterstützen oder behindern.")}
      sources={["atkinson1968", "anderson2001", "roediger2006", "cepeda2006"]}
      reasoning={[
        tt("Describe how a screen feels in terms of the three steps: did the learner know what to look at (intake), could they keep it in mind (processing), will they be able to recall it later (storage)?", "Beschreiben Sie, wie sich ein Bildschirm anfühlt, in Begriffen der drei Schritte: Wusste die Lernende, worauf sie schauen soll (Aufnahme), konnte sie es im Kopf behalten (Verarbeitung), wird sie es später abrufen können (Speicherung)?"),
        tt("Match the screen to the level you want: if the goal is applying, a page of text with no task cannot get the learner there.", "Stimmen Sie den Bildschirm auf die gewünschte Stufe ab: Ist das Ziel das Anwenden, kann eine Textseite ohne Aufgabe die Lernende nicht dorthin bringen."),
        tt("A problem that makes learners stop early is usually an intake or processing problem. A problem that shows up weeks later (they forget) is a storage problem.", "Ein Problem, das Lernende früh aufhören lässt, ist meist ein Aufnahme- oder Verarbeitungsproblem. Ein Problem, das erst Wochen später auftaucht (sie vergessen), ist ein Speicherproblem."),
        tt("Do not blame the learner's motivation before checking the screen: a screen that wastes attention also kills motivation.", "Geben Sie nicht zuerst der Motivation der Lernenden die Schuld, bevor Sie den Bildschirm geprüft haben: Ein Bildschirm, der Aufmerksamkeit vergeudet, tötet auch die Motivation."),
      ]}
    >
      <MemoryFlow />
      <LearningLevels />
      <p>
        {tt(
          "Let us follow Karim, who is learning about data protection after work. The lesson shows a long page. His attention jumps from the menu to a banner to the first line of text, which is intake going wrong: nothing on the screen says what matters. When he finally reads, he has to keep the first sentence in mind to understand the third, which fills working memory, so that by the fifth sentence he has lost the thread. Later that week he remembers almost nothing, because nothing asked him to revisit what he had read. The three steps failed one after another, and none of the failures is about the content.",
          "Begleiten wir Karim, der nach der Arbeit etwas über Datenschutz lernt. Die Lektion zeigt eine lange Seite. Seine Aufmerksamkeit springt vom Menü zu einem Banner zur ersten Textzeile, was eine misslungene Aufnahme ist: Nichts auf dem Bildschirm sagt, was zählt. Als er endlich liest, muss er den ersten Satz im Kopf behalten, um den dritten zu verstehen, das füllt das Arbeitsgedächtnis, sodass er beim fünften Satz den Faden verloren hat. Später in der Woche erinnert er sich an fast nichts, weil ihn nichts aufgefordert hat, das Gelesene wieder aufzugreifen. Die drei Schritte scheiterten nacheinander, und kein Scheitern betrifft den Inhalt.",
        )}
      </p>
      <Bul
        items={[
          tt("Attention and motivation: attention is selective, so learners attend to what is prominent, new or relevant to their goal. Motivation decides whether they spend the effort at all (Day 4).", "Aufmerksamkeit und Motivation: Aufmerksamkeit ist selektiv, Lernende achten also auf das, was auffällig, neu oder für ihr Ziel relevant ist. Die Motivation entscheidet, ob sie die Mühe überhaupt aufwenden (Tag 4)."),
          tt("Knowing, understanding, applying: in the revised Bloom's taxonomy (Anderson and Krathwohl 2001) these correspond to remember, understand and apply. A screen that only presents supports remembering at best; understanding needs examples and links to what the learner already knows; applying needs tasks and feedback.", "Wissen, Verstehen, Anwenden: In der überarbeiteten Bloom'schen Taxonomie (Anderson und Krathwohl 2001) entsprechen sie Erinnern, Verstehen und Anwenden. Ein Bildschirm, der nur präsentiert, stützt bestenfalls das Erinnern; Verstehen braucht Beispiele und Verbindungen zu dem, was die Lernende schon weiß; Anwenden braucht Aufgaben und Feedback."),
          tt("Repetition and context: memory is strengthened when learners retrieve information instead of re-reading it (Roediger and Karpicke 2006) and when practice is spread over time (Cepeda et al. 2006). Learning in a realistic context helps the learner see when to use it.", "Wiederholung und Kontext: Das Gedächtnis wird gestärkt, wenn Lernende Information abrufen, statt sie wieder zu lesen (Roediger und Karpicke 2006), und wenn das Üben über die Zeit verteilt wird (Cepeda et al. 2006). Lernen in einem realistischen Kontext hilft der Lernenden zu sehen, wann sie es nutzen soll."),
        ]}
      />
      <Extra id="A1">
        <p>{tt("Retrieval and spacing in an interface: a short question at the start of the next lesson on the last lesson (“what were the three loads?”) uses retrieval practice and spacing at almost no cost. A “review” button at the end that replays the whole lesson does neither, because re-reading is the weaker strategy.", "Retrieval und Spacing in einem Interface: Eine kurze Frage zu Beginn der nächsten Lektion zur letzten („Was waren die drei Belastungen?“) nutzt Retrieval Practice und Spacing fast ohne Kosten. Ein „Wiederholen“-Button am Ende, der die ganze Lektion abspielt, tut keins von beiden, denn erneutes Lesen ist die schwächere Strategie.")}</p>
        <p>{tt("Context: the plan names context as part of learning psychology. For a platform it means showing why a unit matters for the learner's job (a work example) before the rule, so that the learner knows what to attend to.", "Kontext: Der Plan nennt Kontext als Teil der Lernpsychologie. Für eine Plattform heißt das, vor der Regel zu zeigen, warum eine Einheit für die Arbeit der Lernenden zählt (ein Praxisbeispiel), damit die Lernende weiß, worauf sie achten soll.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("The subject sets part of the mental effort. Design decides how much of the rest is wasted. Cut the waste; keep room for understanding.", "Das Thema legt einen Teil der geistigen Anstrengung fest. Die Gestaltung entscheidet, wie viel vom Rest vergeudet wird. Kürzen Sie die Vergeudung; lassen Sie Platz fürs Verstehen.")}
      sources={["sweller1988", "sweller1998", "mayerMoreno2003"]}
      reasoning={[
        tt("Name the kind of load: if the cause is the subject, it is intrinsic and you can only order it; if the cause is how the screen is built, it is extraneous and you should cut it.", "Benennen Sie die Art der Belastung: Ist das Thema die Ursache, ist sie intrinsisch, und Sie können sie nur ordnen; ist die Ursache, wie der Bildschirm gebaut ist, ist sie extrinsisch, und Sie sollten sie kürzen."),
        tt("Most “this is too complicated” complaints on a platform come from extraneous load: too much at once, no visual structure, no recognisable order.", "Die meisten Klagen „das ist zu kompliziert“ auf einer Plattform kommen von extrinsischer Belastung: zu viel auf einmal, keine visuelle Struktur, keine erkennbare Reihenfolge."),
        tt("Do not remove intrinsic load by deleting the content the learner needs. Split it, order it and support it instead.", "Entfernen Sie intrinsische Belastung nicht, indem Sie den Inhalt löschen, den die Lernende braucht. Teilen, ordnen und unterstützen Sie ihn stattdessen."),
        tt("Keep room for germane load: a screen with nothing to think about is not learning-effective just because it is light.", "Lassen Sie Platz für lernbezogene Belastung: Ein Bildschirm, bei dem man nichts denken muss, ist nicht lerneffektiv, nur weil er leicht ist."),
      ]}
    >
      <ThreeLoads />
      <DataTable
        caption={tt("The three kinds of load, where they come from and what a designer can do", "Die drei Arten von Belastung, woher sie kommen und was eine Gestalterin tun kann")}
        head={[tt("Load", "Belastung"), tt("Where it comes from", "Woher sie kommt"), tt("What a designer can do", "Was eine Gestalterin tun kann"), tt("Example in a lesson", "Beispiel in einer Lektion")]}
        rows={[
          [tt("Intrinsic", "Intrinsisch"), tt("The subject: how many new ideas, how linked", "Das Thema: wie viele neue Ideen, wie verknüpft"), tt("Order it: start with the simplest idea, introduce one new idea at a time", "Ordnen: mit der einfachsten Idee beginnen, jeweils eine neue Idee einführen"), tt("Explaining “legitimate interest” before the learner knows what personal data is", "„Berechtigtes Interesse“ erklären, bevor die Lernende weiß, was personenbezogene Daten sind")],
          [tt("Extraneous", "Extrinsisch"), tt("The presentation: clutter, structure, wording", "Die Darstellung: Unübersichtlichkeit, Struktur, Wortlaut"), tt("Remove it: cut what does not help, structure the rest, explain terms in place", "Entfernen: kürzen, was nicht hilft, den Rest strukturieren, Begriffe an Ort und Stelle erklären"), tt("A banner, a chat window and a menu next to a 500-word block", "Ein Banner, ein Chat-Fenster und ein Menü neben einem Block von 500 Wörtern")],
          [tt("Germane", "Lernbezogen"), tt("Making sense of the content", "Den Inhalt verstehen"), tt("Make room for it: add an example, a question, a link to what the learner knows", "Platz schaffen: ein Beispiel, eine Frage, eine Verbindung zu dem, was die Lernende weiß, hinzufügen"), tt("A short exercise that applies the rule to a case from the learner's work", "Eine kurze Übung, die die Regel auf einen Fall aus der Arbeit der Lernenden anwendet")],
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("Karim, Daniel and the lessons are made up for this card.", "Karim, Daniel und die Lektionen sind für diese Karte erfunden.")}</p>
      </Callout>
      <Extra id="A2">
        <p>{tt("Where the theory comes from: Sweller (1988) showed that people learn problem solving less well when the task itself consumes working memory; Sweller, van Merriënboer and Paas (1998) set out the three kinds of load. Germane load has been revised by later work and is the most debated of the three; for design decisions the practical split into effort that helps learning and effort that does not is the part that counts.", "Woher die Theorie kommt: Sweller (1988) zeigte, dass Menschen Problemlösen schlechter lernen, wenn die Aufgabe selbst das Arbeitsgedächtnis verbraucht; Sweller, van Merriënboer und Paas (1998) legten die drei Arten von Belastung dar. Die lernbezogene Belastung wurde durch spätere Arbeiten überarbeitet und ist die umstrittenste der drei; für Gestaltungsentscheidungen zählt die praktische Trennung in Anstrengung, die dem Lernen hilft, und solche, die es nicht tut.")}</p>
        <p>{tt("Mayer and Moreno's design measures: Mayer and Moreno (2003) list nine ways to reduce load in multimedia learning, for example removing extra material (coherence), marking what matters (signalling), splitting a lesson into learner-paced parts (segmenting) and placing words next to the picture they explain (spatial contiguity).", "Mayer und Morenos Gestaltungsmaßnahmen: Mayer und Moreno (2003) nennen neun Wege, die Belastung beim multimedialen Lernen zu senken, zum Beispiel Überflüssiges entfernen (Kohärenz), das Wichtige markieren (Signalisierung), eine Lektion in Teile im Tempo der Lernenden gliedern (Segmentierung) und Worte neben das Bild setzen, das sie erklären (räumliche Nähe).")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Working memory holds only a few items. Group things into chunks, and use size, contrast and position to tell the eye what comes first.", "Das Arbeitsgedächtnis hält nur wenige Elemente. Fassen Sie Dinge zu Chunks zusammen und nutzen Sie Größe, Kontrast und Position, um dem Auge zu sagen, was zuerst kommt.")}
      sources={["miller1956", "cowan2001", "mayer2009", "harp1998", "nielsen1997"]}
      reasoning={[
        tt("If a screen shows more than about four separate things at once that the learner must handle, group them or hide some of them.", "Zeigt ein Bildschirm mehr als etwa vier einzelne Dinge auf einmal, die die Lernende bewältigen muss, gruppieren Sie sie oder blenden Sie einige aus."),
        tt("Use a visual hierarchy to answer “what should I look at first?”. For a lesson, that is the heading, then the key sentence, then the explanation.", "Nutzen Sie eine visuelle Hierarchie, um „Worauf soll ich zuerst schauen?“ zu beantworten. Bei einer Lektion ist das die Überschrift, dann der Kernsatz, dann die Erklärung."),
        tt("Chunk the content (units with one goal) and chunk the interface (groups with names); both reduce what the learner must hold.", "Gliedern Sie den Inhalt in Chunks (Einheiten mit einem Ziel) und die Oberfläche (Gruppen mit Namen); beides verringert, was die Lernende halten muss."),
        tt("A diagram helps when it shows a structure or flow that text describes badly, and when its labels are inside it. A picture that does not explain anything is clutter.", "Ein Diagramm hilft, wenn es eine Struktur oder einen Ablauf zeigt, den Text schlecht beschreibt, und wenn seine Beschriftungen darin stehen. Ein Bild, das nichts erklärt, ist Unübersichtlichkeit."),
        tt("Remove what does not help the goal of the screen before you add anything.", "Entfernen Sie, was dem Ziel des Bildschirms nicht hilft, bevor Sie etwas hinzufügen."),
      ]}
    >
      <Chunking />
      <HierarchyPair />
      <Bul
        items={[
          tt("Chunking in a lesson: split a long lesson into units of five to seven minutes, each with one goal; group menu entries; give each group a name.", "Chunking in einer Lektion: eine lange Lektion in Einheiten von fünf bis sieben Minuten teilen, jede mit einem Ziel; Menüeinträge gruppieren; jeder Gruppe einen Namen geben."),
          tt("Visual hierarchy: the most important element is the largest, highest-contrast or best-placed. A heading above a paragraph, a primary button next to a quieter secondary one, the key sentence of a lesson marked in bold.", "Visuelle Hierarchie: Das wichtigste Element ist das größte, kontrastreichste oder am besten platzierte. Eine Überschrift über einem Absatz, ein primärer Button neben einem ruhigeren sekundären, der Kernsatz einer Lektion fett markiert."),
          tt("Focus control: remove or quiet what is not needed for the current step (banners, chat, news) while the learner works on the content.", "Fokussteuerung: Entfernen oder dämpfen Sie, was für den aktuellen Schritt nicht gebraucht wird (Banner, Chat, News), solange die Lernende am Inhalt arbeitet."),
          tt("Text and pictures: a relevant picture next to the words that it explains helps (Mayer's multimedia principle); a decorative picture or an interesting but irrelevant detail does not (Harp and Mayer 1998 found that such “seductive details” reduced learning).", "Text und Bilder: Ein relevantes Bild neben den Worten, die es erklärt, hilft (Mayers Multimedia-Prinzip); ein dekoratives Bild oder ein interessantes, aber irrelevantes Detail nicht (Harp und Mayer 1998 fanden, dass solche „Seductive Details“ das Lernen verringerten)."),
        ]}
      />
      <Extra id="A3">
        <p>{tt("Why four and not seven: Miller's seven plus or minus two was a landmark paper but counted items that people had already learned to chunk. Cowan's (2001) review of later studies suggests that when chunking cannot be used, capacity is about four. For design this is the safer number: plan for few items.", "Warum vier und nicht sieben: Millers sieben plus/minus zwei war eine wegweisende Arbeit, zählte aber Elemente, die Menschen schon zu Chunks gelernt hatten. Cowans (2001) Überblick späterer Studien legt nahe, dass die Kapazität etwa vier beträgt, wenn kein Chunking möglich ist. Für die Gestaltung ist das die sicherere Zahl: Planen Sie mit wenigen Elementen.")}</p>
        <p>{tt("Reading behaviour: on web pages most readers scan, they do not read word by word. In Nielsen's study 79 percent of test users always scanned a new page and only 16 percent read word for word (Nielsen 1997). A lesson is read more closely than a news page, but a tired learner scans too. Headings, short paragraphs and one idea per paragraph let a scanning reader find the point.", "Leseverhalten: Auf Webseiten überfliegen die meisten Leser, sie lesen nicht Wort für Wort. In Nielsens Studie überflogen 79 Prozent der Testnutzer eine neue Seite immer, und nur 16 Prozent lasen Wort für Wort (Nielsen 1997). Eine Lektion wird genauer gelesen als eine Nachrichtenseite, aber eine müde Lernende überfliegt auch. Überschriften, kurze Absätze und eine Idee pro Absatz lassen eine überfliegende Leserin die Aussage finden.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA4() {
  return (
    <MaterialCard
      id="A4"
      scan={tt("Four mistakes recur: overload, unclear structure, missing feedback and complex navigation. Each has a psychological cost and a typical remedy.", "Vier Fehler kehren wieder: Überlastung, unklare Struktur, fehlendes Feedback und komplexe Navigation. Jeder hat psychologische Kosten und ein typisches Mittel.")}
      sources={["sweller1998", "kalyuga2003"]}
      reasoning={[
        tt("Information overload is about too many things at once (amount). Unclear structure is about how things are arranged (form). Missing feedback is about not knowing the result. Complex navigation is about effort spent on finding.", "Informationsüberflutung betrifft zu viele Dinge auf einmal (Menge). Unklare Struktur betrifft, wie Dinge angeordnet sind (Form). Fehlendes Feedback betrifft, das Ergebnis nicht zu kennen. Komplexe Navigation betrifft Mühe, die ins Finden fließt."),
        tt("Name the remedy in terms of the load it removes: “group the menu into three” removes extraneous load, “mark the key sentence” directs attention.", "Nennen Sie das Mittel in Begriffen der Belastung, die es entfernt: „Das Menü in drei Gruppen gliedern“ entfernt extrinsische Belastung, „den Kernsatz markieren“ lenkt die Aufmerksamkeit."),
        tt("Do not call something a mistake only because it looks plain: ask what it does to the learner.", "Nennen Sie etwas nicht einen Fehler, nur weil es schlicht aussieht: Fragen Sie, was es mit der Lernenden macht."),
      ]}
    >
      <MistakesPicture />
      <DataTable
        caption={tt("Four typical UX mistakes, what they do in the learner's head, and a way to reduce each", "Vier typische UX-Fehler, was sie im Kopf der Lernenden bewirken, und ein Weg, jeden zu verringern")}
        head={[tt("Typical UX mistake", "Typischer UX-Fehler"), tt("What it does in the learner's head", "Was er im Kopf der Lernenden bewirkt"), tt("A way to reduce it", "Ein Weg, ihn zu verringern")]}
        rows={[
          [tt("Information overload", "Informationsüberflutung"), tt("Too many things compete for attention at once", "Zu viele Dinge konkurrieren zugleich um Aufmerksamkeit"), tt("Show one main thing per screen; hide the rest", "Eine Hauptsache pro Bildschirm zeigen; den Rest ausblenden")],
          [tt("Unclear structure", "Unklare Struktur"), tt("The learner must build the structure from scratch", "Die Lernende muss die Struktur selbst aufbauen"), tt("Headings, short paragraphs, a marked key sentence", "Überschriften, kurze Absätze, ein markierter Kernsatz")],
          [tt("Missing feedback", "Fehlendes Feedback"), tt("The learner cannot tell whether effort worked", "Die Lernende kann nicht erkennen, ob die Mühe gewirkt hat"), tt("A result and a next step after each task", "Ein Ergebnis und ein nächster Schritt nach jeder Aufgabe")],
          [tt("Overly complex navigation", "Übermäßig komplexe Navigation"), tt("Effort goes into finding, not learning", "Mühe fließt ins Finden, nicht ins Lernen"), tt("Few clear paths; always show where you are", "Wenige klare Wege; immer zeigen, wo man ist")],
        ]}
      />
      <Extra id="A4">
        <p>{tt("Expertise changes the answer: guidance and simplification that help beginners can hinder experts, who find the extra support redundant. This is the expertise reversal effect (Kalyuga et al. 2003). If your learners are beginners, as in the plan's Day 3 task, support them heavily; for an advanced audience, make it possible to skip.", "Expertise ändert die Antwort: Anleitung und Vereinfachung, die Einsteigern helfen, können Experten behindern, die die zusätzliche Unterstützung überflüssig finden. Das ist der Expertise-Reversal-Effekt (Kalyuga et al. 2003). Sind Ihre Lernenden Einsteiger, wie in der Aufgabe des Plans für Tag 3, unterstützen Sie sie stark; für ein fortgeschrittenes Publikum machen Sie das Überspringen möglich.")}</p>
        <p>{tt("Too simple is also a mistake: removing difficulty that is part of the learning (for example a worked problem that the learner must try) lowers germane load as well. Materi B2 returns to this as the risk of “too much simplification”.", "Zu einfach ist auch ein Fehler: Schwierigkeit zu entfernen, die zum Lernen gehört (zum Beispiel eine Aufgabe, die die Lernende selbst versuchen muss), senkt auch die lernbezogene Belastung. Materi B2 kommt darauf als Risiko „zu starker Vereinfachung“ zurück.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("Rate each measure on how much it helps learning, what it costs and what could go wrong. Cheap and direct usually beats big and slow when time is short.", "Bewerten Sie jede Maßnahme danach, wie sehr sie dem Lernen hilft, was sie kostet und was schiefgehen kann. Günstig und direkt schlägt bei knapper Zeit meist groß und langsam.")}
      sources={["gibbons2018", "sweller1998"]}
      reasoning={[
        tt("Rate effort by the printed cost: under €8,000 is Low; €8,000 to €15,000 is Mid; above €15,000 is High.", "Bewerten Sie den Aufwand nach den gedruckten Kosten: unter 8.000 € ist Niedrig; 8.000 € bis 15.000 € ist Mittel; über 15.000 € ist Hoch."),
        tt("Rate learning impact by the load it removes from what the learner actually does (reading, finding, holding), and whether it keeps the content the learner needs.", "Bewerten Sie die Lernwirkung danach, welche Belastung sie von dem nimmt, was die Lernende tatsächlich tut (lesen, finden, halten), und ob sie den Inhalt behält, den die Lernende braucht."),
        tt("Rate risk by what could be lost or go wrong: removing needed content is a high risk; a change that can be undone is a low risk.", "Bewerten Sie das Risiko danach, was verloren gehen oder schiefgehen kann: Nötigen Inhalt zu entfernen ist ein hohes Risiko; eine Änderung, die sich zurücknehmen lässt, ein niedriges."),
        tt("A measure that makes the screen lighter but not the learning better (a decoration, a new look) has a low learning impact.", "Eine Maßnahme, die den Bildschirm leichter macht, aber das Lernen nicht besser (eine Dekoration, ein neues Aussehen), hat eine geringe Lernwirkung."),
        tt("Say which measure has the greatest effect and why, and name the information you lack (for example, whether learners are overloaded by amount or by wording).", "Sagen Sie, welche Maßnahme die größte Wirkung hat und warum, und nennen Sie die Information, die Ihnen fehlt (zum Beispiel, ob Lernende durch Menge oder durch Formulierung überlastet sind)."),
      ]}
    >
      <WeighExample />
      <Bul
        items={[
          tt("Effort is the one rating a rule decides, from the printed cost. Learning impact and risk are your judgement; give a reason for each.", "Der Aufwand ist die eine Bewertung, die eine Regel aus den gedruckten Kosten entscheidet. Lernwirkung und Risiko sind Ihr Urteil; begründen Sie beides."),
          tt("A prioritisation matrix plots options on two criteria, for example value to the user against effort (Gibbons 2018). Here you rate three and show them side by side.", "Eine Priorisierungsmatrix ordnet Optionen nach zwei Kriterien, zum Beispiel Nutzerwert gegen Aufwand (Gibbons 2018). Hier bewerten Sie drei und zeigen sie nebeneinander."),
        ]}
      />
      <Callout label={tt("Case assumption", "Fallannahme")}>
        <p>{tt("LearnLoop, its costs and its reasons are made up for this example. EduCore's numbers are in the task.", "LearnLoop, seine Kosten und seine Gründe sind für dieses Beispiel erfunden. Die Zahlen von EduCore stehen in der Aufgabe.")}</p>
      </Callout>
    </MaterialCard>
  );
}

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("A UX decision is strategic when it changes what learners can do afterwards and the mental cost of getting there. Define “learning-effective UX” and judge decisions by it.", "Eine UX-Entscheidung ist strategisch, wenn sie verändert, was Lernende danach können, und die geistigen Kosten, dorthin zu kommen. Definieren Sie „lerneffektives UX“ und beurteilen Sie Entscheidungen danach.")}
      sources={["sweller1998", "mayer2009", "roediger2006"]}
      reasoning={[
        tt("Judge a measure on both lenses: does it help learners learn (effectiveness), and does it cost less unnecessary effort (efficiency)? A measure that lowers effort but also lowers learning is not an improvement.", "Beurteilen Sie eine Maßnahme mit beiden Linsen: Hilft sie Lernenden beim Lernen (Effektivität), und kostet sie weniger unnötige Anstrengung (Effizienz)? Eine Maßnahme, die die Anstrengung senkt, aber auch das Lernen, ist keine Verbesserung."),
        tt("Define “learning-effective” with a learner, a goal, a cost and a proof, so that it can be checked.", "Definieren Sie „lerneffektiv“ mit einer Lernenden, einem Ziel, Kosten und einem Beleg, damit es sich prüfen lässt."),
        tt("Prioritise first the measures that remove extraneous load for every learner (structure, chunking) before those that add something (a new feature).", "Priorisieren Sie zuerst die Maßnahmen, die für jede Lernende die extrinsische Belastung entfernen (Struktur, Chunking), vor solchen, die etwas hinzufügen (eine neue Funktion)."),
        tt("A drop-out rate is a symptom. Use it to find where to look, then use a test to find the cause.", "Eine Abbruchquote ist ein Symptom. Nutzen Sie sie, um zu finden, wo Sie hinschauen sollen, dann einen Test, um die Ursache zu finden."),
      ]}
    >
      <EffectivenessChain />
      <p>
        {tt(
          "A definition you can adapt: “A learning-effective UX is one in which a learner of the intended level can reach the stated learning goal with as little effort as possible that does not help learning, shown by what they can explain or do afterwards.” Notice that this definition names the learner (intended level), the goal (stated), the cost (effort that does not help) and the proof (explain or do). A definition without a proof cannot be tested.",
          "Eine Definition, die Sie anpassen können: „Ein lerneffektives UX ist eines, in dem eine Lernende des vorgesehenen Niveaus das genannte Lernziel mit möglichst wenig Anstrengung erreichen kann, die nicht beim Lernen hilft, gezeigt dadurch, was sie danach erklären oder tun kann.“ Beachten Sie, dass diese Definition die Lernende (vorgesehenes Niveau), das Ziel (genannt), die Kosten (Anstrengung, die nicht hilft) und den Beleg (erklären oder tun) nennt. Eine Definition ohne Beleg lässt sich nicht testen.",
        )}
      </p>
      <DataTable
        caption={tt("Three questions a manager asks, what each measures and typical evidence", "Drei Fragen, die eine Managerin stellt, was jede misst und typische Belege")}
        head={[tt("Question a manager asks", "Frage einer Managerin"), tt("What it measures", "Was sie misst"), tt("Typical evidence", "Typische Belege")]}
        rows={[
          [tt("Did learners learn what we promised?", "Haben Lernende gelernt, was wir versprochen haben?"), tt("Effectiveness", "Effektivität"), tt("A comprehension check, a task in a test, a result after the course", "Eine Verständnisprüfung, eine Aufgabe in einem Test, ein Ergebnis nach dem Kurs")],
          [tt("How much effort did it take?", "Wie viel Anstrengung hat es gekostet?"), tt("Efficiency", "Effizienz"), tt("Time to finish, errors, a short rating of effort, observed hesitation", "Zeit bis zum Abschluss, Fehler, eine kurze Bewertung der Anstrengung, beobachtetes Zögern")],
          [tt("Do learners finish and come back?", "Schließen Lernende ab und kommen wieder?"), tt("Business result", "Geschäftsergebnis"), tt("Completion rate, retention", "Completion Rate, Retention")],
        ]}
      />
      <Extra id="B1">
        <p>{tt("Learning is not the same as satisfaction: learners may rate a very easy course highly and learn little. The Kirkpatrick levels (reaction, learning, behaviour, results) are a reminder to measure beyond the first. A platform manager therefore needs at least one measure of learning, not only of ratings.", "Lernen ist nicht dasselbe wie Zufriedenheit: Lernende bewerten einen sehr leichten Kurs vielleicht hoch und lernen wenig. Die Kirkpatrick-Ebenen (Reaktion, Lernen, Verhalten, Ergebnisse) erinnern daran, über die erste hinaus zu messen. Eine Plattform-Managerin braucht deshalb mindestens ein Maß für das Lernen, nicht nur für Bewertungen.")}</p>
        <p>{tt("Desirable difficulty: some effort helps memory (trying to recall an answer), which is why “as little effort as possible” in the definition is qualified by “that does not help learning”.", "Erwünschte Schwierigkeit: Manche Anstrengung hilft dem Gedächtnis (zu versuchen, sich an eine Antwort zu erinnern), weshalb „möglichst wenig Anstrengung“ in der Definition durch „die nicht beim Lernen hilft“ eingeschränkt wird.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Lighter is not always better. Efficiency and depth pull against each other; name what each option keeps and what it loses.", "Leichter ist nicht immer besser. Effizienz und Tiefe ziehen gegeneinander; benennen Sie, was jede Option behält und was sie verliert.")}
      sources={["sweller1998", "kalyuga2003", "bjork2011"]}
      reasoning={[
        tt("Name both risks: content that is too simple (learners finish and cannot apply it) and content that is too complex (learners leave). A plan that names only one has not weighed the conflict.", "Nennen Sie beide Risiken: zu einfachen Inhalt (Lernende schließen ab und können ihn nicht anwenden) und zu komplexen Inhalt (Lernende gehen). Ein Plan, der nur eines nennt, hat den Konflikt nicht abgewogen."),
        tt("Remove extraneous load first; keep the intrinsic difficulty the course exists to teach, and support it.", "Entfernen Sie zuerst die extrinsische Belastung; behalten Sie die intrinsische Schwierigkeit, die der Kurs lehren soll, und unterstützen Sie sie."),
        tt("For beginners support more; for experienced learners let them skip. Guidance that helps one group can hinder the other (expertise reversal).", "Für Einsteiger unterstützen Sie mehr; für erfahrene Lernende lassen Sie sie überspringen. Anleitung, die einer Gruppe hilft, kann der anderen im Weg stehen (Expertise Reversal)."),
        tt("To tell the two risks apart you need both a completion measure and a measure of what learners can do afterwards.", "Um die beiden Risiken zu unterscheiden, brauchen Sie sowohl ein Maß für die Completion als auch eines dafür, was Lernende danach können."),
      ]}
    >
      <LoadVsDepth />
      <DataTable
        caption={tt("Too simple against too complex", "Zu einfach gegen zu komplex")}
        head={["", tt("Too simple", "Zu einfach"), tt("Too complex", "Zu komplex")]}
        rows={[
          [tt("What the learner experiences", "Was die Lernende erlebt"), tt("A feeling of understanding, but cannot apply it", "Ein Gefühl des Verstehens, kann es aber nicht anwenden"), tt("A feeling of being lost, and stops", "Ein Gefühl, verloren zu sein, und hört auf")],
          [tt("What was removed or left in", "Was entfernt oder belassen wurde"), tt("Examples, practice and the hard steps", "Beispiele, Übung und die schweren Schritte"), tt("Clutter, wall of text, missing structure", "Unübersichtlichkeit, Textwand, fehlende Struktur")],
          [tt("Typical sign in the data", "Typisches Zeichen in den Daten"), tt("High completion, low results in a test or at work", "Hohe Completion, niedrige Ergebnisse in einem Test oder bei der Arbeit"), tt("High drop-out, long time on early lessons", "Hoher Abbruch, lange Zeit bei frühen Lektionen")],
          [tt("Remedy", "Mittel"), tt("Restore the worked example and a task; let experts skip", "Das durchgearbeitete Beispiel und eine Aufgabe wiederherstellen; Experten überspringen lassen"), tt("Chunk, structure, explain terms in place", "Chunken, strukturieren, Begriffe an Ort und Stelle erklären")],
        ]}
      />
      <Extra id="B2">
        <p>{tt("UX as a learning amplifier: the plan's discussion line is “UX as a learning amplifier”. A good interface does not replace the effort of learning; it directs that effort to the right place. When you argue for a UX measure to management, say which learning effort it protects.", "UX als Lernverstärker: Die Diskussionslinie des Plans lautet „UX als Lernverstärker“. Ein gutes Interface ersetzt nicht die Mühe des Lernens; es lenkt diese Mühe an die richtige Stelle. Wenn Sie vor dem Management für eine UX-Maßnahme argumentieren, sagen Sie, welche Lernanstrengung sie schützt.")}</p>
        <p>{tt("Efficiency against deep learning: efficient learning (fast, light) is right for routine knowledge such as a form's fields. Deep learning (slow, effortful) is right for judgement such as assessing a contract risk. A platform that serves both needs to tell them apart in its design.", "Effizienz gegen tiefes Lernen: Effizientes Lernen (schnell, leicht) passt zu Routinewissen, etwa den Feldern eines Formulars. Tiefes Lernen (langsam, anstrengend) passt zu Urteilskraft, etwa dem Beurteilen eines Vertragsrisikos. Eine Plattform, die beides bedient, muss sie in ihrer Gestaltung unterscheiden.")}</p>
      </Extra>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("When you have no user data, state your assumption, choose a step you can test and undo, and fix how future content decisions are made.", "Wenn Sie keine Nutzerdaten haben, nennen Sie Ihre Annahme, wählen Sie einen Schritt, den Sie testen und zurücknehmen können, und legen Sie fest, wie künftige Inhaltsentscheidungen getroffen werden.")}
      sources={["klein2007", "bezos2016", "nielsen2000", "mayer2009"]}
      reasoning={[
        tt("A decision under uncertainty states four things: what you decide, what you do not know, what would make you reverse it and by when, and what you give up.", "Eine Entscheidung unter Unsicherheit nennt vier Dinge: was Sie entscheiden, was Sie nicht wissen, was Sie zum Rückgängigmachen bringen würde und bis wann, und worauf Sie verzichten."),
        tt("A reversal condition is checkable only with a figure and a time, set before the test starts.", "Eine Rückgängig-Bedingung ist nur mit einer Zahl und einer Zeit prüfbar, festgelegt, bevor der Test beginnt."),
        tt("Prefer a step you can undo and learn from; leave the large, hard-to-undo decision for after the evidence.", "Bevorzugen Sie einen Schritt, den Sie zurücknehmen und aus dem Sie lernen können; lassen Sie die große, schwer rückgängig zu machende Entscheidung für nach den Belegen."),
        tt("A decision logic for content names a role that decides and the checks that a lesson must pass; a style guide that nobody checks is not a decision logic.", "Eine Entscheidungslogik für Inhalte nennt eine Rolle, die entscheidet, und die Prüfungen, die eine Lektion bestehen muss; ein Styleguide, den niemand prüft, ist keine Entscheidungslogik."),
        tt("Giving up nothing means you have not decided: name what you postpone.", "Nichts aufzugeben heißt, nicht entschieden zu haben: Nennen Sie, was Sie verschieben."),
      ]}
    >
      <DecisionFrame />
      <Bul
        items={[
          tt("No data is still a decision: choose the step whose result will tell you most and which you can undo: rebuild one course, test it with five beginners, and decide the rest afterwards.", "Keine Daten ist trotzdem eine Entscheidung: Wählen Sie den Schritt, dessen Ergebnis Ihnen am meisten sagt und den Sie zurücknehmen können: einen Kurs neu bauen, mit fünf Einsteigern testen und den Rest danach entscheiden."),
          tt("A reversal condition has a figure and a time: “fewer than four of five beginners can explain the key point” is a figure; “if it does not work” is not.", "Eine Rückgängig-Bedingung hat eine Zahl und eine Zeit: „weniger als vier von fünf Einsteigern können den Kerngedanken erklären“ ist eine Zahl; „wenn es nicht klappt“ nicht."),
          tt("Decision logic for future content: name who decides (a role) and which checks every new lesson passes: one goal, a size that fits the time, the key sentence marked, terms explained, a check at the end.", "Entscheidungslogik für künftige Inhalte: Nennen Sie, wer entscheidet (eine Rolle), und welche Prüfungen jede neue Lektion besteht: ein Ziel, eine Größe, die zur Zeit passt, der Kernsatz markiert, Begriffe erklärt, eine Prüfung am Ende."),
          tt("A premortem helps: imagine in a year that learners still call the platform too complicated: what went wrong? The answers become checks.", "Ein Premortem hilft: Stellen Sie sich vor, in einem Jahr nennen Lernende die Plattform immer noch zu kompliziert: Was ging schief? Die Antworten werden zu Prüfungen."),
        ]}
      />
      <Extra id="B3">
        <p>{tt("Evidence without a big study: with five beginners you can learn most of what is wrong with a lesson (see Day 2, card A3). Ask each to explain the key point in their own words after reading: this is a cheap check of effectiveness that works without any platform data.", "Belege ohne große Studie: Mit fünf Einsteigern erfahren Sie das meiste, was an einer Lektion nicht stimmt (siehe Tag 2, Karte A3). Bitten Sie jeden, nach dem Lesen den Kerngedanken in eigenen Worten zu erklären: Das ist eine günstige Prüfung der Effektivität, die ohne Plattformdaten funktioniert.")}</p>
        <p>{tt("One-way and two-way doors: Bezos distinguishes decisions that are hard to reverse from decisions that can be reversed cheaply. Rebuilding one course is a two-way door; replacing the whole content library is closer to a one-way door.", "Einbahn- und Zweiwegetüren: Bezos unterscheidet Entscheidungen, die schwer rückgängig zu machen sind, von solchen, die sich günstig zurücknehmen lassen. Einen Kurs neu zu bauen ist eine Zweiwegetür; die ganze Inhaltsbibliothek zu ersetzen kommt einer Einbahntür näher.")}</p>
      </Extra>
    </MaterialCard>
  );
}
