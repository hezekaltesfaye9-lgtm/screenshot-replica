// The 66 books of the Protestant canon with their chapter counts (standard versification).
export type Testament = "old" | "new";

export interface BibleBook {
  id: string;
  en: string;
  am: string;
  chapters: number;
  testament: Testament;
}

const OT: Array<[string, string, string, number]> = [
  ["gen", "Genesis", "ዘፍጥረት", 50],
  ["exo", "Exodus", "ዘጸአት", 40],
  ["lev", "Leviticus", "ዘሌዋውያን", 27],
  ["num", "Numbers", "ዘኍልቍ", 36],
  ["deu", "Deuteronomy", "ዘዳግም", 34],
  ["jos", "Joshua", "ኢያሱ", 24],
  ["jdg", "Judges", "መሳፍንት", 21],
  ["rut", "Ruth", "ሩት", 4],
  ["1sa", "1 Samuel", "1 ሳሙኤል", 31],
  ["2sa", "2 Samuel", "2 ሳሙኤል", 24],
  ["1ki", "1 Kings", "1 ነገሥት", 22],
  ["2ki", "2 Kings", "2 ነገሥት", 25],
  ["1ch", "1 Chronicles", "1 ዜና መዋዕል", 29],
  ["2ch", "2 Chronicles", "2 ዜና መዋዕል", 36],
  ["ezr", "Ezra", "ዕዝራ", 10],
  ["neh", "Nehemiah", "ነህምያ", 13],
  ["est", "Esther", "አስቴር", 10],
  ["job", "Job", "ኢዮብ", 42],
  ["psa", "Psalms", "መዝሙረ ዳዊት", 150],
  ["pro", "Proverbs", "ምሳሌ", 31],
  ["ecc", "Ecclesiastes", "መክብብ", 12],
  ["sng", "Song of Solomon", "መኃልየ መኃልይ", 8],
  ["isa", "Isaiah", "ኢሳይያስ", 66],
  ["jer", "Jeremiah", "ኤርምያስ", 52],
  ["lam", "Lamentations", "ሰቆቃው ኤርምያስ", 5],
  ["ezk", "Ezekiel", "ሕዝቅኤል", 48],
  ["dan", "Daniel", "ዳንኤል", 12],
  ["hos", "Hosea", "ሆሴዕ", 14],
  ["jol", "Joel", "ኢዩኤል", 3],
  ["amo", "Amos", "አሞጽ", 9],
  ["oba", "Obadiah", "አብድዩ", 1],
  ["jon", "Jonah", "ዮናስ", 4],
  ["mic", "Micah", "ሚክያስ", 7],
  ["nam", "Nahum", "ናሆም", 3],
  ["hab", "Habakkuk", "ዕንባቆም", 3],
  ["zep", "Zephaniah", "ሶፎንያስ", 3],
  ["hag", "Haggai", "ሐጌ", 2],
  ["zec", "Zechariah", "ዘካርያስ", 14],
  ["mal", "Malachi", "ሚልክያስ", 4],
];

const NT: Array<[string, string, string, number]> = [
  ["mat", "Matthew", "የማቴዎስ ወንጌል", 28],
  ["mrk", "Mark", "የማርቆስ ወንጌል", 16],
  ["luk", "Luke", "የሉቃስ ወንጌል", 24],
  ["jhn", "John", "የዮሐንስ ወንጌል", 21],
  ["act", "Acts", "የሐዋርያት ሥራ", 28],
  ["rom", "Romans", "ሮሜ", 16],
  ["1co", "1 Corinthians", "1 ቆሮንቶስ", 16],
  ["2co", "2 Corinthians", "2 ቆሮንቶስ", 13],
  ["gal", "Galatians", "ገላትያ", 6],
  ["eph", "Ephesians", "ኤፌሶን", 6],
  ["php", "Philippians", "ፊልጵስዩስ", 4],
  ["col", "Colossians", "ቆላስይስ", 4],
  ["1th", "1 Thessalonians", "1 ተሰሎንቄ", 5],
  ["2th", "2 Thessalonians", "2 ተሰሎንቄ", 3],
  ["1ti", "1 Timothy", "1 ጢሞቴዎስ", 6],
  ["2ti", "2 Timothy", "2 ጢሞቴዎስ", 4],
  ["tit", "Titus", "ቲቶ", 3],
  ["phm", "Philemon", "ፊልሞና", 1],
  ["heb", "Hebrews", "ዕብራውያን", 13],
  ["jas", "James", "ያዕቆብ", 5],
  ["1pe", "1 Peter", "1 ጴጥሮስ", 5],
  ["2pe", "2 Peter", "2 ጴጥሮስ", 3],
  ["1jn", "1 John", "1 ዮሐንስ", 5],
  ["2jn", "2 John", "2 ዮሐንስ", 1],
  ["3jn", "3 John", "3 ዮሐንስ", 1],
  ["jud", "Jude", "ይሁዳ", 1],
  ["rev", "Revelation", "የዮሐንስ ራእይ", 22],
];

const toBooks = (rows: typeof OT, testament: Testament): BibleBook[] =>
  rows.map(([id, en, am, chapters]) => ({ id, en, am, chapters, testament }));

export const OLD_TESTAMENT = toBooks(OT, "old");
export const NEW_TESTAMENT = toBooks(NT, "new");
export const BIBLE_BOOKS = [...OLD_TESTAMENT, ...NEW_TESTAMENT];

export function findBook(id: string): BibleBook | undefined {
  return BIBLE_BOOKS.find((b) => b.id === id);
}

export type TranslationId = "am-1954" | "am-2000" | "en-kjv";

export interface Translation {
  id: TranslationId;
  lang: "am" | "en";
  name: { am: string; en: string };
}

/** Translations the reader offers. Text for each is connected in a later stage. */
export const TRANSLATIONS: Translation[] = [
  { id: "am-1954", lang: "am", name: { am: "1954 ትርጉም", en: "Amharic 1954" } },
  { id: "am-2000", lang: "am", name: { am: "አዲሱ መደበኛ ትርጉም (2000)", en: "New Amharic Standard (2000)" } },
  { id: "en-kjv", lang: "en", name: { am: "ኪንግ ጀምስ (KJV)", en: "King James Version" } },
];
