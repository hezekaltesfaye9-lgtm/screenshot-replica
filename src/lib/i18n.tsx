import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "am" | "en";

const en = {
  brand: "Mets'haf Kidus",
  tagline: "Grow in faith; live by the Word.",
  nav: {
    home: "Home",
    bible: "Bible",
    prayer: "Prayer",
    devotionals: "Devotionals",
    study: "Bible Study",
    growth: "My Growth",
    login: "Log in / Sign up",
    menu: "Menu",
    theme: "Toggle light or dark mode",
    language: "Language",
  },
  hero: {
    eyebrow: "A daily companion for your walk with God",
    title: "Grow in faith; live by the Word.",
    body: "Explore God's Word, strengthen your faith, develop your prayer life and grow closer to God every day.",
    read: "Read the Bible",
    verses: "Beloved daily verses",
  },
  verse: {
    label: "Verse of the day",
    copy: "Copy",
    copied: "Verse copied",
    share: "Share",
    bookmark: "Bookmark",
    bookmarked: "Saved",
    bookmarkAdded: "Saved to your bookmarks",
    bookmarkRemoved: "Removed from bookmarks",
    shareFallback: "Sharing isn't available here — the verse was copied instead",
    textPending: "This translation's text isn't connected yet.",
  },
  features: {
    title: "Everything you need to grow",
    subtitle: "Read, pray, study and reflect — all in one peaceful place.",
    bible: { title: "Read the Bible", body: "Browse all 66 books in Amharic and English, chapter by chapter." },
    prayer: { title: "Prayer journal", body: "Write your prayers, keep requests and remember answered prayers." },
    devotionals: { title: "Daily devotionals", body: "Short, Scripture-centred reflections for every day." },
    study: { title: "Bible study", body: "Topics, characters, history and study plans for deeper understanding." },
    growth: { title: "My growth", body: "See your reading progress, streaks and prayer life over time." },
    explore: "Explore",
  },
  devotionals: {
    title: "Daily devotionals",
    subtitle: "Pause, read and reflect on God's Word.",
    readMore: "Read more",
    minutes: (n: number) => `${n} min read`,
    sample: "Sample devotionals — full writings will be added soon.",
    seeAll: "All devotionals",
    markRead: "Mark as read",
    done: "Read",
  },
  bible: {
    title: "The Holy Bible",
    subtitle: "Choose a book and chapter to begin reading.",
    old: "Old Testament",
    new: "New Testament",
    search: "Search books…",
    translation: "Translation",
    chapters: "Chapters",
    chapter: "Chapter",
    prev: "Previous chapter",
    next: "Next chapter",
    pendingTitle: "Scripture text coming soon",
    pendingBody:
      "We only show real, verified Scripture. The text for this translation will appear here once it's connected — the book and chapter navigation is ready.",
    noResults: "No books match your search.",
    books: (n: number) => `${n} books`,
    preview: "Bible reader",
    previewBody: "All 66 books, three translations, chapter-by-chapter navigation.",
  },
  prayer: {
    title: "Prayer journal",
    subtitle: "Pour out your heart to God and remember His faithfulness.",
    placeholder: "Write your prayer…",
    titlePlaceholder: "Title (optional)",
    save: "Save prayer",
    request: "Prayer request",
    entry: "Prayer",
    all: "All",
    open: "Requests",
    answered: "Answered",
    markAnswered: "Mark answered",
    markOpen: "Mark as open",
    remove: "Delete",
    empty: "No prayers here yet. Write your first prayer above.",
    deviceNote: "Prayers are saved privately on this device. Accounts and syncing come in a later stage.",
    saved: "Prayer saved",
  },
  study: {
    title: "Bible study",
    subtitle: "Go deeper into Scripture with guided topics and plans.",
    topics: "Study topics",
    characters: "Bible characters",
    history: "Biblical history",
    explanations: "Chapter explanations",
    questions: "Discussion questions",
    plans: "Study plans",
    soon: "Coming soon",
    days: (n: number) => `${n} days`,
  },
  growth: {
    title: "My growth",
    subtitle: "Your journey, one day at a time.",
    progress: "Bible reading progress",
    chaptersRead: (a: number, b: number) => `${a} of ${b} chapters opened`,
    streak: "Daily streak",
    streakDays: (n: number) => (n === 1 ? "1 day" : `${n} days`),
    devotionals: "Completed devotionals",
    prayers: "Prayers written",
    answered: "Answered prayers",
    bookmarks: "Bookmarked verses",
    challenges: "Reading challenges",
    deviceNote: "Your progress is tracked on this device. Sign-in and syncing come in a later stage.",
    challengeList: [
      { title: "Gospel of John", detail: "21 chapters", bookId: "jhn" },
      { title: "Book of Psalms", detail: "150 chapters", bookId: "psa" },
      { title: "Proverbs", detail: "31 chapters", bookId: "pro" },
    ],
  },
  login: {
    title: "Accounts are coming soon",
    body: "Sign-in will let you sync prayers, bookmarks and progress across devices. Until then, everything you save stays private on this device.",
    back: "Back to home",
  },
  footer: {
    about: "About",
    aboutBody:
      "A peaceful place for Ethiopian and English-speaking Christians to read Scripture, pray and grow closer to God.",
    navigate: "Navigate",
    contact: "Contact",
    contactBody: "Questions or ideas? We'd love to hear from you.",
    rights: "All rights reserved.",
    scripture: "English Scripture: King James Version (public domain).",
  },
  common: {
    soon: "Coming soon",
  },
};

export type Dict = typeof en;

const am: Dict = {
  brand: "መጽሐፍ ቅዱስ",
  tagline: "በእምነት እደግ፤ በቃሉ ኑር።",
  nav: {
    home: "መነሻ",
    bible: "መጽሐፍ ቅዱስ",
    prayer: "ጸሎት",
    devotionals: "የዕለት ንባብ",
    study: "ጥናት",
    growth: "እድገቴ",
    login: "ግባ / ተመዝገብ",
    menu: "ማውጫ",
    theme: "ብርሃን ወይም ጨለማ ገጽታ",
    language: "ቋንቋ",
  },
  hero: {
    eyebrow: "ከእግዚአብሔር ጋር ለምታደርገው ጉዞ የዕለት ጓደኛ",
    title: "በእምነት እደግ፤ በቃሉ ኑር።",
    body: "የእግዚአብሔርን ቃል መርምር፣ እምነትህን አጽና፣ የጸሎት ሕይወትህን አሳድግ፣ በየቀኑም ወደ እግዚአብሔር ቅረብ።",
    read: "መጽሐፍ ቅዱስን አንብብ",
    verses: "የዕለት ተወዳጅ ጥቅሶች",
  },
  verse: {
    label: "የዕለቱ ጥቅስ",
    copy: "ቅዳ",
    copied: "ጥቅሱ ተቀድቷል",
    share: "አጋራ",
    bookmark: "አስቀምጥ",
    bookmarked: "ተቀምጧል",
    bookmarkAdded: "በምልክቶችህ ውስጥ ተቀምጧል",
    bookmarkRemoved: "ከምልክቶች ተወግዷል",
    shareFallback: "ማጋራት እዚህ አይሰራም — ጥቅሱ ተቀድቷል",
    textPending: "የዚህ ትርጉም ጽሑፍ ገና አልተገናኘም።",
  },
  features: {
    title: "ለማደግ የሚያስፈልግህ ሁሉ",
    subtitle: "አንብብ፣ ጸልይ፣ አጥና፣ አሰላስል — ሁሉም በአንድ ሰላማዊ ቦታ።",
    bible: { title: "መጽሐፍ ቅዱስን አንብብ", body: "66ቱን መጻሕፍት በአማርኛና በእንግሊዝኛ በምዕራፍ አንብብ።" },
    prayer: { title: "የጸሎት ማስታወሻ", body: "ጸሎትህን ጻፍ፣ የጸሎት ጥያቄዎችን ያዝ፣ የተመለሱ ጸሎቶችን አስታውስ።" },
    devotionals: { title: "የዕለት ንባብ", body: "በቃሉ ላይ የተመሠረቱ አጭር የዕለት ማሰላሰያዎች።" },
    study: { title: "የመጽሐፍ ቅዱስ ጥናት", body: "ርዕሶች፣ ገጸ ባሕርያት፣ ታሪክና የጥናት ዕቅዶች።" },
    growth: { title: "እድገቴ", body: "የንባብ እድገትህን፣ ተከታታይ ቀናትህንና የጸሎት ሕይወትህን ተመልከት።" },
    explore: "ተመልከት",
  },
  devotionals: {
    title: "የዕለት ንባብ",
    subtitle: "ቆም በል፣ አንብብ፣ በእግዚአብሔር ቃል ላይ አሰላስል።",
    readMore: "ተጨማሪ አንብብ",
    minutes: (n: number) => `${n} ደቂቃ ንባብ`,
    sample: "የናሙና ንባቦች — ሙሉ ጽሑፎች በቅርቡ ይጨመራሉ።",
    seeAll: "ሁሉንም ንባቦች",
    markRead: "እንደተነበበ ምልክት አድርግ",
    done: "ተነቧል",
  },
  bible: {
    title: "መጽሐፍ ቅዱስ",
    subtitle: "ማንበብ ለመጀመር መጽሐፍና ምዕራፍ ምረጥ።",
    old: "ብሉይ ኪዳን",
    new: "አዲስ ኪዳን",
    search: "መጽሐፍ ፈልግ…",
    translation: "ትርጉም",
    chapters: "ምዕራፎች",
    chapter: "ምዕራፍ",
    prev: "ያለፈው ምዕራፍ",
    next: "የሚቀጥለው ምዕራፍ",
    pendingTitle: "የቅዱሳት መጻሕፍት ጽሑፍ በቅርቡ",
    pendingBody:
      "እውነተኛና የተረጋገጠ የመጽሐፍ ቅዱስ ጽሑፍ ብቻ እናሳያለን። የዚህ ትርጉም ጽሑፍ ሲገናኝ እዚህ ይታያል — የመጽሐፍና የምዕራፍ ምርጫው ዝግጁ ነው።",
    noResults: "ከፍለጋህ ጋር የሚመሳሰል መጽሐፍ የለም።",
    books: (n: number) => `${n} መጻሕፍት`,
    preview: "የመጽሐፍ ቅዱስ ንባብ",
    previewBody: "66 መጻሕፍት፣ ሦስት ትርጉሞች፣ በምዕራፍ የሚደረግ ጉዞ።",
  },
  prayer: {
    title: "የጸሎት ማስታወሻ",
    subtitle: "ልብህን በእግዚአብሔር ፊት አፍስስ፤ ታማኝነቱንም አስታውስ።",
    placeholder: "ጸሎትህን ጻፍ…",
    titlePlaceholder: "ርዕስ (አማራጭ)",
    save: "ጸሎቱን አስቀምጥ",
    request: "የጸሎት ጥያቄ",
    entry: "ጸሎት",
    all: "ሁሉም",
    open: "ጥያቄዎች",
    answered: "የተመለሱ",
    markAnswered: "ተመልሷል",
    markOpen: "እንደገና ክፈት",
    remove: "ሰርዝ",
    empty: "እስካሁን ጸሎት የለም። የመጀመሪያ ጸሎትህን ከላይ ጻፍ።",
    deviceNote: "ጸሎቶች በዚህ መሣሪያ ላይ በግል ይቀመጣሉ። መለያና ማመሳሰል በሚቀጥለው ደረጃ ይመጣሉ።",
    saved: "ጸሎቱ ተቀምጧል",
  },
  study: {
    title: "የመጽሐፍ ቅዱስ ጥናት",
    subtitle: "በተመሩ ርዕሶችና ዕቅዶች ወደ ቃሉ ጥልቀት ግባ።",
    topics: "የጥናት ርዕሶች",
    characters: "የመጽሐፍ ቅዱስ ገጸ ባሕርያት",
    history: "የመጽሐፍ ቅዱስ ታሪክ",
    explanations: "የምዕራፍ ማብራሪያዎች",
    questions: "የውይይት ጥያቄዎች",
    plans: "የጥናት ዕቅዶች",
    soon: "በቅርቡ",
    days: (n: number) => `${n} ቀናት`,
  },
  growth: {
    title: "እድገቴ",
    subtitle: "ጉዞህ፣ አንድ ቀን በአንድ ጊዜ።",
    progress: "የመጽሐፍ ቅዱስ ንባብ እድገት",
    chaptersRead: (a: number, b: number) => `ከ${b} ምዕራፎች ${a} ተከፍተዋል`,
    streak: "ተከታታይ ቀናት",
    streakDays: (n: number) => `${n} ቀን`,
    devotionals: "የተጠናቀቁ ንባቦች",
    prayers: "የተጻፉ ጸሎቶች",
    answered: "የተመለሱ ጸሎቶች",
    bookmarks: "የተቀመጡ ጥቅሶች",
    challenges: "የንባብ ፈተናዎች",
    deviceNote: "እድገትህ በዚህ መሣሪያ ላይ ይመዘገባል። መግቢያና ማመሳሰል በሚቀጥለው ደረጃ ይመጣሉ።",
    challengeList: [
      { title: "የዮሐንስ ወንጌል", detail: "21 ምዕራፎች", bookId: "jhn" },
      { title: "መዝሙረ ዳዊት", detail: "150 ምዕራፎች", bookId: "psa" },
      { title: "መጽሐፈ ምሳሌ", detail: "31 ምዕራፎች", bookId: "pro" },
    ],
  },
  login: {
    title: "መለያዎች በቅርቡ ይመጣሉ",
    body: "መግቢያ ጸሎቶችን፣ ምልክቶችንና እድገትን በሁሉም መሣሪያዎች ላይ እንድታመሳስል ያስችልሃል። እስከዚያ ድረስ የምታስቀምጠው ሁሉ በዚህ መሣሪያ ላይ በግል ይቆያል።",
    back: "ወደ መነሻ ተመለስ",
  },
  footer: {
    about: "ስለ እኛ",
    aboutBody: "ኢትዮጵያውያንና እንግሊዝኛ ተናጋሪ ክርስቲያኖች ቃሉን የሚያነቡበት፣ የሚጸልዩበትና ወደ እግዚአብሔር የሚቀርቡበት ሰላማዊ ቦታ።",
    navigate: "ማውጫ",
    contact: "ያግኙን",
    contactBody: "ጥያቄ ወይም ሐሳብ አለዎት? ብንሰማዎ ደስ ይለናል።",
    rights: "መብቱ በሕግ የተጠበቀ ነው።",
    scripture: "የእንግሊዝኛ ጥቅሶች፦ ኪንግ ጀምስ ትርጉም (የሕዝብ ንብረት)።",
  },
  common: {
    soon: "በቅርቡ",
  },
};

const DICTS: Record<Lang, Dict> = { am, en };
const STORAGE_KEY = "mk.lang";

interface I18nValue {
  lang: Lang;
  t: Dict;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("am");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "am" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      t: DICTS[lang],
      setLang: (next) => {
        setLangState(next);
        window.localStorage.setItem(STORAGE_KEY, next);
      },
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}
