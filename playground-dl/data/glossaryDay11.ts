import type { GlossEntry } from "@/data/glossary";

/**
 * Glossary entries added for Day 11 (gamification and motivation theories). Same shape and rules as data/glossary.ts (CLAUDE.md #19, #32): every technical term the cards and
 * tasks use that is not already an entry, written for someone who is not an expert, with German written by hand.
 */
export const GLOSSARY_DAY11: GlossEntry[] = [
  {
    id: "leaderboard",
    title: "Leaderboard",
    match: ["leaderboard", "leaderboards", "ranking", "rank"],
    plain: "A list that puts people in order by their score. It compares learners with each other. Most people are far from the top, so for them it shows how far behind they are.",
    example: "A list of 5,000 learners where the top three win a prize and a learner at place 4,200 sees where they stand.",
    from: "Materi A1",
    de: { title: "Rangliste", match: ["Rangliste", "Ranglisten", "Leaderboard", "Rang"], plain: "Eine Liste, die Menschen nach ihrer Punktzahl ordnet. Sie vergleicht Lernende miteinander. Die meisten Menschen sind weit von der Spitze entfernt, für sie zeigt sie also, wie weit sie zurückliegen.", example: "Eine Liste von 5.000 Lernenden, bei der die ersten drei einen Preis gewinnen und eine Lernende auf Platz 4.200 sieht, wo sie steht." },
  },
  {
    id: "extrinsic-motivation",
    title: "Extrinsic motivation",
    match: ["extrinsic motivation", "extrinsic", "extrinsically"],
    plain: "Doing something for a reward from outside or to avoid a penalty, such as a point, a prize, a rank or a broken streak. It can push someone hard, and it tends to fade when the reward goes away.",
    example: "A learner studies only in the month a prize is offered.",
    from: "Materi A2",
    de: { title: "Extrinsische Motivation", match: ["extrinsische Motivation", "extrinsische", "extrinsischen", "extrinsisch"], plain: "Etwas für eine Belohnung von außen zu tun oder um eine Strafe zu vermeiden, etwa einen Punkt, einen Preis, einen Rang oder einen gerissenen Streak. Sie kann jemanden stark antreiben und verblasst tendenziell, wenn die Belohnung wegfällt.", example: "Eine Lernende lernt nur in dem Monat, in dem ein Preis ausgelobt ist." },
  },
  {
    id: "game-mechanic",
    title: "Game mechanic",
    match: ["mechanic", "mechanics", "game mechanic", "game mechanics", "game element", "game elements"],
    plain: "One building block taken from games and used in a platform: points, a badge, a level, a leaderboard, a choice. A mechanic is a tool, and it only helps when it serves a learning objective.",
    example: "A bar of objectives mastered is a mechanic that serves the objective “apply the method at work”.",
    from: "Materi B1",
    de: { title: "Spielmechanik", match: ["Mechanik", "Mechaniken", "Spielmechanik", "Spielelement", "Spielelemente", "Spielelementen"], plain: "Ein Baustein aus Spielen, der in einer Plattform genutzt wird: Punkte, ein Abzeichen, ein Level, eine Rangliste, eine Wahl. Eine Mechanik ist ein Werkzeug und hilft nur, wenn sie einem Lernziel dient.", example: "Ein Balken gemeisterter Ziele ist eine Mechanik, die dem Ziel „die Methode bei der Arbeit anwenden“ dient." },
  },
  {
    id: "learning-objective",
    title: "Learning objective",
    match: ["learning objective", "learning objectives", "objective", "objectives"],
    plain: "A clear statement of what learners should be able to do after a lesson or course. It is the thing a game element should serve. Without one, an element is only decoration.",
    example: "“After the unit, the learner can name the first offer in a negotiation.”",
    from: "Materi B1",
    de: { title: "Lernziel", match: ["Lernziel", "Lernziele", "Lernzielen", "Ziel", "Ziele", "Zielen"], plain: "Eine klare Aussage dazu, was Lernende nach einer Lektion oder einem Kurs können sollen. Sie ist das, wofür ein Spielelement da sein sollte. Ohne eines ist ein Element nur Dekoration.", example: "„Nach der Einheit kann die Lernende das erste Angebot in einer Verhandlung benennen.“" },
  },
  {
    id: "loss-aversion",
    title: "Loss aversion",
    match: ["loss aversion", "fear of loss", "loss"],
    plain: "People feel a loss more strongly than a gain of the same size. A streak that breaks, or points that are taken away, use this feeling to bring people back. It works and it creates pressure and worry.",
    example: "Losing a 6-day streak hurts more than the pleasure of day 7.",
    from: "Materi B2",
    de: { title: "Verlustaversion", match: ["Verlustaversion", "Verlustangst", "Angst vor Verlust", "Verlust"], plain: "Menschen spüren einen Verlust stärker als einen Gewinn gleicher Größe. Ein Streak, der reißt, oder Punkte, die weggenommen werden, nutzen dieses Gefühl, um Menschen zurückzuholen. Es wirkt und erzeugt Druck und Sorge.", example: "Einen Streak von 6 Tagen zu verlieren schmerzt mehr, als Tag 7 Freude macht." },
  },
  {
    id: "relatedness",
    title: "Autonomy, competence and relatedness",
    match: ["relatedness", "autonomy", "competence", "the need to feel competent"],
    plain: "The three needs of Self-Determination Theory. Autonomy: I choose what I do. Competence: I am getting better. Relatedness: I belong to others. When they are met, people stay motivated without a reward.",
    example: "A choice of topic meets autonomy; a result line meets competence; a group goal meets relatedness.",
    from: "Materi A2",
    de: { title: "Autonomie, Kompetenz und Zugehörigkeit", match: ["Zugehörigkeit", "Autonomie", "Kompetenz", "kompetent"], plain: "Die drei Bedürfnisse der Selbstbestimmungstheorie. Autonomie: Ich wähle, was ich tue. Kompetenz: Ich werde besser. Zugehörigkeit: Ich gehöre zu anderen. Sind sie erfüllt, bleiben Menschen ohne Belohnung motiviert.", example: "Eine Themenwahl erfüllt Autonomie; eine Ergebniszeile erfüllt Kompetenz; ein Gruppenziel erfüllt Zugehörigkeit." },
  },
];
