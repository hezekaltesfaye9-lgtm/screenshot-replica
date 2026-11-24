import { createFileRoute, Link } from "@tanstack/react-router";
import { BookMarked, CalendarDays, History, MessagesSquare, ScrollText, Users } from "lucide-react";
import { PageIntro } from "@/components/site/PageIntro";
import { STUDY_CHARACTERS, STUDY_PLANS, STUDY_TOPICS } from "@/data/study";
import { useI18n } from "@/lib/i18n";
import { formatRef } from "@/lib/scripture";

export const Route = createFileRoute("/study")({
  head: () => ({
    meta: [
      { title: "Bible Study — መጽሐፍ ቅዱስ" },
      { name: "description", content: "Bible study topics, characters, history and study plans." },
      { property: "og:title", content: "Bible Study — መጽሐፍ ቅዱስ" },
      { property: "og:description", content: "Go deeper into Scripture with guided topics and plans." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudyPage,
});

function StudyPage() {
  const { t, lang } = useI18n();
  const upcoming = [
    { icon: History, label: t.study.history },
    { icon: ScrollText, label: t.study.explanations },
    { icon: MessagesSquare, label: t.study.questions },
  ];
  return (
    <>
      <PageIntro title={t.study.title} subtitle={t.study.subtitle} />
      <div className="container-page mt-10 space-y-14">
        <section>
          <Heading icon={BookMarked} title={t.study.topics} />
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STUDY_TOPICS.map((topic) => (
              <Link
                key={topic.id}
                to="/bible"
                search={{ book: topic.ref.bookId, chapter: topic.ref.chapter }}
                className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-elegant"
              >
                <h3 className="text-2xl font-semibold text-foreground">{topic[lang]}</h3>
                <p className="mt-2 text-sm font-medium text-gold">
                  {formatRef(topic.ref.bookId, topic.ref.chapter, undefined, lang)}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <Heading icon={Users} title={t.study.characters} />
          <div className="mt-5 flex flex-wrap gap-2">
            {STUDY_CHARACTERS.map((c) => (
              <span key={c.id} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground shadow-soft">
                {c[lang]}
              </span>
            ))}
          </div>
        </section>

        <section>
          <Heading icon={CalendarDays} title={t.study.plans} />
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {STUDY_PLANS.map((p) => (
              <div key={p.id} className="rounded-2xl bg-gradient-forest p-6 text-forest-foreground shadow-elegant">
                <p className="text-xs uppercase tracking-[0.2em] text-gold">{t.study.days(p.days)}</p>
                <h3 className="mt-3 text-2xl font-semibold">{p[lang]}</h3>
                <p className="mt-4 text-sm opacity-70">{t.study.soon}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {upcoming.map(({ icon: Icon, label }) => (
            <div key={label} className="rounded-2xl border border-dashed border-border p-6">
              <Icon className="h-5 w-5 text-gold" />
              <h3 className="mt-3 text-lg font-semibold text-foreground">{label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.study.soon}</p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

function Heading({ icon: Icon, title }: { icon: typeof Users; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold-soft text-gold">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <h2 className="text-3xl font-semibold text-foreground">{title}</h2>
    </div>
  );
}
