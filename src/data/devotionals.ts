// Sample devotionals: titles and summaries are original placeholder writing;
// references point to real passages. Replace with published devotionals later.
export interface Devotional {
  id: string;
  ref: { bookId: string; chapter: number; verses: string };
  minutes: number;
  title: { am: string; en: string };
  summary: { am: string; en: string };
}

export const DEVOTIONALS: Devotional[] = [
  {
    id: "shepherd",
    ref: { bookId: "psa", chapter: 23, verses: "1-6" },
    minutes: 4,
    title: { am: "እረኛዬ የሚመራኝ", en: "The Shepherd Who Leads Me" },
    summary: {
      am: "በዕለት ጭንቀት መካከል እግዚአብሔር እንደ እረኛ የሚመራንና የሚጠብቀን እንዴት እንደሆነ ማሰላሰል።",
      en: "Reflecting on how God guides and cares for us like a shepherd, even in anxious seasons.",
    },
  },
  {
    id: "rest",
    ref: { bookId: "mat", chapter: 11, verses: "28-30" },
    minutes: 3,
    title: { am: "ዕረፍት ለደከሙ", en: "Rest for the Weary" },
    summary: {
      am: "ኢየሱስ ሸክማችንን ወደ እርሱ እንድናመጣ ያቀረበልንን ግብዣ መቀበል።",
      en: "Accepting Jesus' invitation to bring our burdens to Him and find rest.",
    },
  },
  {
    id: "lamp",
    ref: { bookId: "psa", chapter: 119, verses: "105-112" },
    minutes: 5,
    title: { am: "ለእግሬ መብራት", en: "A Lamp to My Feet" },
    summary: {
      am: "የእግዚአብሔር ቃል በውሳኔዎቻችንና በመንገዳችን ላይ እንዴት ብርሃን እንደሚሆን።",
      en: "How God's Word brings light to our choices and the path ahead.",
    },
  },
  {
    id: "trust",
    ref: { bookId: "pro", chapter: 3, verses: "5-6" },
    minutes: 3,
    title: { am: "በፍጹም ልብ መታመን", en: "Trusting With All Your Heart" },
    summary: {
      am: "በራሳችን ማስተዋል ሳይሆን በእግዚአብሔር ላይ መደገፍን መማር።",
      en: "Learning to lean on God rather than on our own understanding.",
    },
  },
];
