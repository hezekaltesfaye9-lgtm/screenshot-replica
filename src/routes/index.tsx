import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, HandHeart, LineChart, ScrollText, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-highlands.jpg";
import { Button } from "@/components/ui/button";
import { DailyVerseCard } from "@/components/site/DailyVerseCard";
import { DevotionalCard } from "@/components/site/DevotionalCard";
import { NEW_TESTAMENT, OLD_TESTAMENT } from "@/data/bible-books";
import { DEVOTIONALS } from "@/data/devotionals";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "መጽሐፍ ቅዱስ — በእምነት እደግ፤ በቃሉ ኑር።" },
      {
        name: "description",
        content:
          "A peaceful Christian companion: read the Bible in Amharic and English, keep a prayer journal, follow devotionals and grow in faith.",
      },
      { property: "og:title", content: "መጽሐፍ ቅዱስ — Grow in faith; live by the Word." },
      {
        property: "og:description",
        content: "Read the Bible in Amharic and English, pray, study and grow closer to God every day.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const FEATURES = [
  { key: "bible", to: "/bible", icon: BookOpen },
  { key: "prayer", to: "/prayer", icon: HandHeart },
  { key: "devotionals", to: "/devotionals", icon: ScrollText },
  { key: "study", to: "/study", icon: Sparkles },
  { key: "growth", to: "/growth", icon: LineChart },
] as const;

function HomePage() {
  const { t, lang } = useI18n();

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          width={1536}
          height={1024}
        />
        <div className="absolute inset-0 -z-10 bg-hero-veil" />
        <div className="container-page flex min-h-[34rem] flex-col justify-center pb-40 pt-20 md:min-h-[40rem]">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-gold animate-fade-up md:tracking-[0.25em]">
            <span className="h-px w-8 shrink-0 bg-gold" /> {t.hero.eyebrow}
          </p>
          <h1
            lang="am"
            className="mt-6 max-w-4xl font-geez text-5xl font-semibold leading-tight text-forest-foreground md:text-7xl animate-fade-up"
          >
            በእምነት እደግ፤ <span className="text-gradient-gold">በቃሉ ኑር።</span>
          </h1>
          {lang === "en" && (
            <p className="mt-3 font-display text-2xl italic text-forest-foreground/80">{t.hero.title}</p>
          )}
          <p className="mt-6 max-w-xl text-lg text-forest-foreground/85 animate-fade-up">{t.hero.body}</p>
          <div className="mt-9 flex flex-wrap gap-3 animate-fade-up">
            <Button asChild variant="gold" size="xl">
              <Link to="/bible">
                <BookOpen /> መጽሐፍ ቅዱስን አንብብ
              </Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <a href="#daily-verse">የዕለት ተወዳጅ ጥቅሶች</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Daily verse */}
      <section id="daily-verse" className="container-page relative z-10 -mt-28 scroll-mt-24">
        <DailyVerseCard className="mx-auto max-w-4xl" />
      </section>

      {/* Features */}
      <section className="container-page mt-24">
        <SectionHeading title={t.features.title} subtitle={t.features.subtitle} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {FEATURES.map(({ key, to, icon: Icon }) => (
            <Link
              key={key}
              to={to}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-elegant"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-forest text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-foreground">{t.features[key].title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{t.features[key].body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                {t.features.explore}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bible preview */}
      <section className="container-page mt-24">
        <div className="grid overflow-hidden rounded-3xl bg-gradient-forest text-forest-foreground shadow-elegant md:grid-cols-[1fr_1.2fr]">
          <div className="p-8 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t.bible.preview}</p>
            <h2 className="mt-3 text-4xl font-semibold">{t.bible.title}</h2>
            <p className="mt-3 opacity-80">{t.bible.previewBody}</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: t.bible.old, count: OLD_TESTAMENT.length },
                { label: t.bible.new, count: NEW_TESTAMENT.length },
              ].map((x) => (
                <div key={x.label} className="rounded-2xl border border-forest-foreground/15 p-4">
                  <div className="font-display text-4xl text-gold">{x.count}</div>
                  <div className="mt-1 text-sm opacity-80">{x.label}</div>
                </div>
              ))}
            </div>
            <Button asChild variant="gold" size="lg" className="mt-8 rounded-full">
              <Link to="/bible">
                {t.hero.read} <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap content-center gap-2 border-t border-forest-foreground/10 p-8 md:border-l md:border-t-0 md:p-12">
            {[...OLD_TESTAMENT.slice(0, 8), ...NEW_TESTAMENT.slice(0, 8)].map((b) => (
              <Link
                key={b.id}
                to="/bible"
                search={{ book: b.id, chapter: 1 }}
                className="rounded-full border border-forest-foreground/20 px-3.5 py-1.5 text-sm transition-colors hover:border-gold hover:text-gold"
              >
                {lang === "am" ? b.am : b.en}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Devotionals */}
      <section className="container-page mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading title={t.devotionals.title} subtitle={t.devotionals.subtitle} align="left" />
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/devotionals">
              {t.devotionals.seeAll} <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {DEVOTIONALS.slice(0, 3).map((d) => (
            <DevotionalCard key={d.id} d={d} />
          ))}
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  title,
  subtitle,
  align = "center",
}: {
  title: string;
  subtitle: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className={`h-px w-14 bg-gold ${align === "center" ? "mx-auto" : ""}`} />
      <h2 className="mt-4 text-4xl font-semibold text-foreground md:text-5xl">{title}</h2>
      <p className="mt-3 text-muted-foreground">{subtitle}</p>
    </div>
  );
}
