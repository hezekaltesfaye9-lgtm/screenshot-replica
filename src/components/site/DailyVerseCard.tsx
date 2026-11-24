import { Bookmark, BookmarkCheck, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { TRANSLATIONS, type TranslationId } from "@/data/bible-books";
import { verseForDate, verseKey } from "@/data/verses";
import { bookmarksStore, toggleInList } from "@/lib/growth";
import { useI18n } from "@/lib/i18n";
import { formatRef } from "@/lib/scripture";
import { cn } from "@/lib/utils";

// Only translations with verified text for the daily verses are offered here.
const CARD_TRANSLATIONS: TranslationId[] = ["am-1954", "en-kjv"];

export function DailyVerseCard({ className }: { className?: string }) {
  const { t, lang } = useI18n();
  const verse = verseForDate(new Date());
  const [chosen, setChosen] = useState<TranslationId | null>(null);
  const translation = chosen ?? (lang === "am" ? "am-1954" : "en-kjv");
  const text = verse.text[translation];
  const textLang = translation.startsWith("am") ? "am" : "en";
  const ref = formatRef(verse.bookId, verse.chapter, verse.verse, textLang);
  const key = verseKey(verse);
  const bookmarks = bookmarksStore.useValue();
  const isBookmarked = bookmarks.includes(key);
  const shareText = text ? `“${text}” — ${ref}` : ref;

  const copy = async (message: string) => {
    try {
      await navigator.clipboard.writeText(shareText);
      toast.success(message);
    } catch {
      toast.error("Clipboard unavailable");
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: t.verse.label, text: shareText });
      } catch {
        /* user dismissed the share sheet */
      }
    } else {
      await copy(t.verse.shareFallback);
    }
  };

  const bookmark = () => {
    bookmarksStore.set((prev) => toggleInList(prev, key));
    toast.success(isBookmarked ? t.verse.bookmarkRemoved : t.verse.bookmarkAdded);
  };

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-3xl border border-gold/30 bg-card p-7 shadow-elegant md:p-10",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-soft blur-2xl" />
      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          <span className="h-px w-6 bg-gold" /> {t.verse.label}
        </span>
        <div className="inline-flex rounded-full bg-muted p-0.5 text-xs">
          {CARD_TRANSLATIONS.map((id) => {
            const tr = TRANSLATIONS.find((x) => x.id === id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => setChosen(id)}
                className={cn(
                  "rounded-full px-3 py-1 transition-colors",
                  translation === id ? "bg-card text-foreground shadow-soft" : "text-muted-foreground",
                )}
              >
                {tr?.name[lang]}
              </button>
            );
          })}
        </div>
      </div>

      <blockquote lang={textLang} className="relative mt-6">
        <p
          className={cn(
            "text-2xl leading-relaxed text-foreground md:text-[1.75rem]",
            textLang === "am" ? "font-geez" : "font-display italic",
          )}
        >
          {text ? `“${text}”` : t.verse.textPending}
        </p>
        <footer className="mt-5 font-semibold text-primary">— {ref}</footer>
      </blockquote>

      <div className="relative mt-8 flex flex-wrap gap-2">
        <Button variant="soft" size="sm" className="rounded-full" onClick={() => copy(t.verse.copied)}>
          <Copy /> {t.verse.copy}
        </Button>
        <Button variant="soft" size="sm" className="rounded-full" onClick={share}>
          <Share2 /> {t.verse.share}
        </Button>
        <Button
          variant={isBookmarked ? "default" : "soft"}
          size="sm"
          className="rounded-full"
          onClick={bookmark}
          aria-pressed={isBookmarked}
        >
          {isBookmarked ? <BookmarkCheck /> : <Bookmark />}
          {isBookmarked ? t.verse.bookmarked : t.verse.bookmark}
        </Button>
      </div>
    </article>
  );
}
