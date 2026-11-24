import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BookOpen, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PageIntro } from "@/components/site/PageIntro";
import { Input } from "@/components/ui/input";
import {
  BIBLE_BOOKS,
  findBook,
  NEW_TESTAMENT,
  OLD_TESTAMENT,
  TRANSLATIONS,
  type TranslationId,
} from "@/data/bible-books";
import { chaptersReadStore } from "@/lib/growth";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface BibleSearch {
  book?: string;
  chapter?: number;
  tr?: TranslationId;
}

const TR_IDS = TRANSLATIONS.map((t) => t.id);

export const Route = createFileRoute("/bible")({
  validateSearch: (s: Record<string, unknown>): BibleSearch => {
    const out: BibleSearch = {};
    const book = s["book"];
    const tr = s["tr"];
    if (typeof book === "string" && findBook(book)) out.book = book;
    const ch = Number(s["chapter"]);
    if (Number.isInteger(ch) && ch > 0) out.chapter = ch;
    if (typeof tr === "string" && (TR_IDS as string[]).includes(tr)) out.tr = tr as TranslationId;
    return out;
  },
  head: () => ({
    meta: [
      { title: "Bible Reader — መጽሐፍ ቅዱስ" },
      {
        name: "description",
        content: "Browse all 66 books of the Bible in Amharic (1954 and 2000) and the King James Version.",
      },
      { property: "og:title", content: "Bible Reader — መጽሐፍ ቅዱስ" },
      { property: "og:description", content: "All 66 books, three translations, chapter-by-chapter navigation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BiblePage,
});

function BiblePage() {
  const { t, lang } = useI18n();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/bible" });
  const [query, setQuery] = useState("");
  const [testament, setTestament] = useState<"old" | "new">("old");

  const book = findBook(search.book ?? "jhn") ?? BIBLE_BOOKS[0]!;
  const chapter = Math.min(search.chapter ?? 1, book.chapters);
  const translation = search.tr ?? (lang === "am" ? "am-1954" : "en-kjv");
  const trInfo = TRANSLATIONS.find((x) => x.id === translation)!;
  const bookLabel = trInfo.lang === "am" ? book.am : book.en;

  useEffect(() => {
    if (!search.book) return;
    const key = `${book.id}.${chapter}`;
    chaptersReadStore.set((prev) => (prev.includes(key) ? prev : [...prev, key]));
  }, [search.book, book.id, chapter]);

  useEffect(() => {
    setTestament(book.testament);
  }, [book.testament]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q ? BIBLE_BOOKS : testament === "old" ? OLD_TESTAMENT : NEW_TESTAMENT;
    return q ? base.filter((b) => b.en.toLowerCase().includes(q) || b.am.includes(q)) : base;
  }, [query, testament]);

  const idx = BIBLE_BOOKS.findIndex((b) => b.id === book.id);
  const prev =
    chapter > 1
      ? { book: book.id, chapter: chapter - 1 }
      : idx > 0
        ? { book: BIBLE_BOOKS[idx - 1]!.id, chapter: BIBLE_BOOKS[idx - 1]!.chapters }
        : null;
  const next =
    chapter < book.chapters
      ? { book: book.id, chapter: chapter + 1 }
      : idx < BIBLE_BOOKS.length - 1
        ? { book: BIBLE_BOOKS[idx + 1]!.id, chapter: 1 }
        : null;

  return (
    <>
      <PageIntro title={t.bible.title} subtitle={t.bible.subtitle}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">{t.bible.translation}:</span>
          <div className="inline-flex flex-wrap gap-1 rounded-full border border-border bg-card p-1">
            {TRANSLATIONS.map((tr) => (
              <button
                key={tr.id}
                type="button"
                onClick={() => navigate({ search: (s) => ({ ...s, tr: tr.id }) })}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  translation === tr.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tr.name[lang]}
              </button>
            ))}
          </div>
        </div>
      </PageIntro>

      <div className="container-page mt-10 grid gap-8 lg:grid-cols-[20rem_1fr]">
        {/* Book list */}
        <aside className="rounded-2xl border border-border bg-card p-4 shadow-soft lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-hidden lg:flex lg:flex-col">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.bible.search}
              className="rounded-full pl-9"
              aria-label={t.bible.search}
            />
          </div>
          {!query && (
            <div className="mt-3 grid grid-cols-2 gap-1 rounded-full bg-muted p-1 text-sm">
              {(["old", "new"] as const).map((x) => (
                <button
                  key={x}
                  type="button"
                  onClick={() => setTestament(x)}
                  className={cn(
                    "rounded-full py-1.5 transition-colors",
                    testament === x ? "bg-card text-foreground shadow-soft" : "text-muted-foreground",
                  )}
                >
                  {x === "old" ? t.bible.old : t.bible.new}
                </button>
              ))}
            </div>
          )}
          <p className="mt-3 px-1 text-xs text-muted-foreground">{t.bible.books(list.length)}</p>
          <ul className="mt-2 max-h-80 overflow-y-auto pr-1 lg:max-h-none lg:flex-1">
            {list.map((b) => (
              <li key={b.id}>
                <Link
                  to="/bible"
                  search={(s) => ({ ...s, book: b.id, chapter: 1 })}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                    b.id === book.id ? "bg-gold-soft font-semibold text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <span>{lang === "am" ? b.am : b.en}</span>
                  <span className="text-xs opacity-60">{b.chapters}</span>
                </Link>
              </li>
            ))}
            {list.length === 0 && <li className="px-3 py-6 text-sm text-muted-foreground">{t.bible.noResults}</li>}
          </ul>
        </aside>

        {/* Reader */}
        <section className="min-w-0">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-2xl font-semibold text-foreground">{lang === "am" ? book.am : book.en}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.bible.chapters}: {book.chapters}
            </p>
            <div className="mt-4 grid max-h-52 grid-cols-[repeat(auto-fill,minmax(2.75rem,1fr))] gap-1.5 overflow-y-auto pr-1">
              {Array.from({ length: book.chapters }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  to="/bible"
                  search={(s) => ({ ...s, book: book.id, chapter: n })}
                  className={cn(
                    "grid h-10 place-items-center rounded-lg border text-sm transition-colors",
                    n === chapter
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-gold hover:text-foreground",
                  )}
                >
                  {n}
                </Link>
              ))}
            </div>
          </div>

          <article className="mt-6 rounded-3xl border border-gold/30 bg-card p-8 shadow-elegant md:p-12">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{trInfo.name[lang]}</p>
                <h3 lang={trInfo.lang} className="mt-2 text-3xl font-semibold text-foreground md:text-4xl">
                  {bookLabel} {chapter}
                </h3>
              </div>
              <div className="flex gap-2">
                <ChapterNav target={prev} label={t.bible.prev} icon="prev" />
                <ChapterNav target={next} label={t.bible.next} icon="next" />
              </div>
            </div>
            <div className="gold-rule my-8" />
            <div className="mx-auto flex max-w-lg flex-col items-center py-8 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-soft text-gold">
                <BookOpen className="h-6 w-6" />
              </span>
              <h4 className="mt-5 text-xl font-semibold text-foreground">{t.bible.pendingTitle}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{t.bible.pendingBody}</p>
            </div>
          </article>
        </section>
      </div>
    </>
  );
}

function ChapterNav({
  target,
  label,
  icon,
}: {
  target: { book: string; chapter: number } | null;
  label: string;
  icon: "prev" | "next";
}) {
  const Icon = icon === "prev" ? ChevronLeft : ChevronRight;
  const cls = "grid h-10 w-10 place-items-center rounded-full border border-border transition-colors";
  if (!target)
    return (
      <span className={cn(cls, "opacity-40")} aria-hidden="true">
        <Icon className="h-4 w-4" />
      </span>
    );
  return (
    <Link
      to="/bible"
      search={(s) => ({ ...s, book: target.book, chapter: target.chapter })}
      aria-label={label}
      title={label}
      className={cn(cls, "hover:border-gold hover:text-gold")}
    >
      <Icon className="h-4 w-4" />
    </Link>
  );
}
