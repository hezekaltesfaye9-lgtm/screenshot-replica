import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, BookOpen, CheckCircle2, Flame, HandHeart, ScrollText } from "lucide-react";
import { PageIntro } from "@/components/site/PageIntro";
import { Progress } from "@/components/ui/progress";
import { BIBLE_BOOKS, findBook } from "@/data/bible-books";
import {
  bookmarksStore,
  chaptersReadStore,
  computeStreak,
  devotionalsDoneStore,
  prayersStore,
  visitDaysStore,
} from "@/lib/growth";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/growth")({
  head: () => ({
    meta: [
      { title: "My Growth — መጽሐፍ ቅዱስ" },
      { name: "description", content: "Track Bible reading progress, daily streaks and prayer activity." },
      { property: "og:title", content: "My Growth — መጽሐፍ ቅዱስ" },
      { property: "og:description", content: "Your spiritual growth journey, one day at a time." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GrowthPage,
});

const TOTAL_CHAPTERS = BIBLE_BOOKS.reduce((n, b) => n + b.chapters, 0);

function GrowthPage() {
  const { t } = useI18n();
  const chapters = chaptersReadStore.useValue();
  const days = visitDaysStore.useValue();
  const prayers = prayersStore.useValue();
  const bookmarks = bookmarksStore.useValue();
  const devotionals = devotionalsDoneStore.useValue();
  const streak = computeStreak(days, new Date());
  const pct = Math.round((chapters.length / TOTAL_CHAPTERS) * 1000) / 10;

  const stats = [
    { icon: Flame, label: t.growth.streak, value: t.growth.streakDays(streak) },
    { icon: HandHeart, label: t.growth.prayers, value: String(prayers.length) },
    { icon: CheckCircle2, label: t.growth.answered, value: String(prayers.filter((p) => p.answered).length) },
    { icon: Bookmark, label: t.growth.bookmarks, value: String(bookmarks.length) },
    { icon: ScrollText, label: t.growth.devotionals, value: String(devotionals.length) },
  ];

  return (
    <>
      <PageIntro title={t.growth.title} subtitle={t.growth.subtitle} />
      <div className="container-page mt-10 space-y-8">
        <section className="rounded-3xl bg-gradient-forest p-8 text-forest-foreground shadow-elegant md:p-10">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-gold" />
            <h2 className="text-2xl font-semibold">{t.growth.progress}</h2>
          </div>
          <div className="mt-6 flex items-end gap-3">
            <span className="font-display text-6xl text-gold">{pct}%</span>
          </div>
          <Progress value={pct} className="mt-4 h-2 bg-forest-foreground/15 [&>div]:bg-gold" />
          <p className="mt-3 text-sm opacity-80">{t.growth.chaptersRead(chapters.length, TOTAL_CHAPTERS)}</p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <Icon className="h-5 w-5 text-gold" />
              <div className="mt-3 font-display text-3xl font-semibold text-foreground">{value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-foreground">{t.growth.challenges}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {t.growth.challengeList.map((c) => {
              const book = findBook(c.bookId)!;
              const done = chapters.filter((k) => k.startsWith(`${c.bookId}.`)).length;
              return (
                <Link
                  key={c.bookId}
                  to="/bible"
                  search={{ book: c.bookId, chapter: 1 }}
                  className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-gold/50"
                >
                  <h3 className="text-xl font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.detail}</p>
                  <Progress value={(done / book.chapters) * 100} className="mt-4 h-1.5" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {done} / {book.chapters}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <p className="text-sm text-muted-foreground">{t.growth.deviceNote}</p>
      </div>
    </>
  );
}
