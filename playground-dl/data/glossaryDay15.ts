import type { GlossEntry } from "@/data/glossary";

/**
 * Glossary entries added for Day 15 (mobile learning, microlearning, cross-device). Same shape and rules as data/glossary.ts (CLAUDE.md #19, #32): every technical term the cards
 * and tasks use that is not already an entry, written for someone who is not an expert, with German written by hand.
 */
export const GLOSSARY_DAY15: GlossEntry[] = [
  {
    id: "cross-device",
    title: "Cross-device",
    match: ["cross-device", "across devices", "cross device"],
    plain: "Using one service on several devices, such as a phone and a laptop, as one experience. It means the progress, the place and the names carry over when the learner changes device.",
    example: "A learner starts a unit on the phone on the train and finishes it on the laptop at home.",
    from: "Materi A3",
    de: { title: "Cross-Device", match: ["Cross-Device", "über Geräte hinweg", "Geräte hinweg", "geräteübergreifend"], plain: "Einen Dienst auf mehreren Geräten, etwa Handy und Laptop, als ein Erlebnis zu nutzen. Es heißt, dass Fortschritt, Stelle und Namen mitgehen, wenn die Lernende das Gerät wechselt.", example: "Eine Lernende beginnt im Zug eine Einheit auf dem Handy und beendet sie zu Hause am Laptop." },
  },
  {
    id: "synchronisation",
    title: "Synchronisation",
    match: ["synchronisation", "synchronised", "synchronization", "sync", "synchronise"],
    plain: "Keeping the same information up to date on every device. For learning it means that progress, bookmarks and the place where the learner stopped are saved to the account and shown wherever they log in.",
    example: "Unit 3 is marked done on the phone and shows as done on the laptop.",
    from: "Materi A3",
    de: { title: "Synchronisation", match: ["Synchronisation", "synchronisiert", "synchronisierte", "synchronisierten", "synchronisieren", "Synchronisationsfehler"], plain: "Dieselbe Information auf jedem Gerät aktuell zu halten. Beim Lernen heißt es, dass Fortschritt, Lesezeichen und die Stelle, an der die Lernende aufgehört hat, im Konto gespeichert und überall gezeigt werden, wo sie sich anmeldet.", example: "Einheit 3 ist auf dem Handy als erledigt markiert und erscheint auf dem Laptop als erledigt." },
  },
  {
    id: "native-app",
    title: "Native app",
    match: ["native app", "native apps"],
    plain: "A program built for one phone operating system, such as iOS or Android, and installed from a store. It can use phone functions like notifications and offline storage, and it must be built and kept up apart from the website.",
    example: "An app for iPhones and another for Android phones, next to the website.",
    from: "Materi B1",
    de: { title: "Native App", match: ["native App", "native Apps", "nativen Apps", "nativen App"], plain: "Ein Programm, das für ein Handy-Betriebssystem wie iOS oder Android gebaut und aus einem Store installiert wird. Es kann Handyfunktionen wie Benachrichtigungen und Offline-Speicher nutzen und muss getrennt von der Website gebaut und gepflegt werden.", example: "Eine App für iPhones und eine weitere für Android-Handys, neben der Website." },
  },
  {
    id: "fragmentation",
    title: "Fragmentation of knowledge",
    match: ["fragmentation", "fragmented", "fragmentation of knowledge"],
    plain: "When learning is cut into so many small pieces that they do not add up to understanding. The learner has collected pieces and cannot say how they fit together. Microlearning needs a goal and a place in the course for each unit to avoid it.",
    example: "Ten five-minute pieces cut from a lesson, none of which says what it is for.",
    from: "Materi A2",
    de: { title: "Zersplitterung des Wissens", match: ["Zersplitterung", "Fragmentierung", "zersplittert", "Zersplitterung des Wissens", "Fragmentierung des Wissens"], plain: "Wenn Lernen in so viele kleine Stücke geschnitten wird, dass sie sich nicht zu Verständnis fügen. Die Lernende hat Stücke gesammelt und kann nicht sagen, wie sie zusammenpassen. Microlearning braucht dafür ein Ziel und einen Platz im Kurs für jede Einheit.", example: "Zehn Fünf-Minuten-Stücke aus einer Lektion, von denen keines sagt, wofür es da ist." },
  },
  {
    id: "push-notification",
    title: "Push notification",
    match: ["push notification", "push reminder", "push reminders", "push message", "push notifications"],
    plain: "A message sent to a phone without the user opening the app, such as a daily reminder. It can bring people back, and it also interrupts them, which adds to the distractions of a mobile context.",
    example: "“Time to learn!” at eight every evening.",
    from: "Materi B2",
    de: { title: "Push-Benachrichtigung", match: ["Push-Benachrichtigung", "Push-Erinnerung", "Push-Erinnerungen", "Push-Nachricht", "Push-Benachrichtigungen"], plain: "Eine Nachricht, die aufs Handy geschickt wird, ohne dass die Nutzerin die App öffnet, etwa eine tägliche Erinnerung. Sie kann Menschen zurückholen, und sie unterbricht sie auch, was die Ablenkungen eines mobilen Kontexts vergrößert.", example: "„Zeit zum Lernen!“ jeden Abend um acht." },
  },
];
