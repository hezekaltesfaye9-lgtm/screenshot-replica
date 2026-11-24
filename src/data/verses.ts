import type { TranslationId } from "./bible-books";

/**
 * Featured daily verses. English is the King James Version (public domain).
 * Amharic text is the 1954 Amharic Bible. The 2000 translation's wording is left
 * empty until a verified source is connected — never fill it in by hand.
 */
export interface DailyVerse {
  bookId: string;
  chapter: number;
  verse: string;
  text: Partial<Record<TranslationId, string>>;
}

export const DAILY_VERSES: DailyVerse[] = [
  {
    bookId: "jhn",
    chapter: 3,
    verse: "16",
    text: {
      "en-kjv":
        "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      "am-1954":
        "በእርሱ የሚያምን ሁሉ የዘላለም ሕይወት እንዲኖረው እንጂ እንዳይጠፋ እግዚአብሔር አንድያ ልጁን እስኪሰጥ ድረስ ዓለሙን እንዲሁ ወዶአልና።",
    },
  },
  {
    bookId: "psa",
    chapter: 23,
    verse: "1",
    text: {
      "en-kjv": "The LORD is my shepherd; I shall not want.",
      "am-1954": "እግዚአብሔር እረኛዬ ነው፤ የሚያሳጣኝ የለም።",
    },
  },
  {
    bookId: "php",
    chapter: 4,
    verse: "13",
    text: {
      "en-kjv": "I can do all things through Christ which strengtheneth me.",
      "am-1954": "ኃይልን በሚሰጠኝ በክርስቶስ ሁሉን እችላለሁ።",
    },
  },
  {
    bookId: "mat",
    chapter: 11,
    verse: "28",
    text: {
      "en-kjv": "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
      "am-1954": "እናንተ ደካሞች ሸክማችሁ የከበደ ሁሉ፥ ወደ እኔ ኑ፥ እኔም አሳርፋችኋለሁ።",
    },
  },
  {
    bookId: "psa",
    chapter: 119,
    verse: "105",
    text: {
      "en-kjv": "Thy word is a lamp unto my feet, and a light unto my path.",
      "am-1954": "ሕግህ ለእግሬ መብራት ለመንገዴም ብርሃን ነው።",
    },
  },
];

/** Same verse for everyone on a given calendar day; rotates through the list. */
export function verseForDate(date: Date): DailyVerse {
  const dayNumber = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000,
  );
  const verse = DAILY_VERSES[dayNumber % DAILY_VERSES.length];
  if (!verse) throw new Error("No daily verses configured");
  return verse;
}

export function verseKey(v: DailyVerse) {
  return `${v.bookId}.${v.chapter}.${v.verse}`;
}
