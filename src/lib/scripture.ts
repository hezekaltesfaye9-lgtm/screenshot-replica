import { findBook } from "@/data/bible-books";
import type { Lang } from "./i18n";

export function bookName(bookId: string, lang: Lang): string {
  const book = findBook(bookId);
  if (!book) return bookId;
  return lang === "am" ? book.am : book.en;
}

export function formatRef(bookId: string, chapter: number, verses: string | undefined, lang: Lang) {
  const name = bookName(bookId, lang);
  return verses ? `${name} ${chapter}:${verses}` : `${name} ${chapter}`;
}
