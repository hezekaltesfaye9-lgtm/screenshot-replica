import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/PageIntro";
import { DevotionalCard } from "@/components/site/DevotionalCard";
import { DEVOTIONALS } from "@/data/devotionals";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/devotionals")({
  head: () => ({
    meta: [
      { title: "Daily Devotionals — መጽሐፍ ቅዱስ" },
      { name: "description", content: "Short, Scripture-centred daily reflections in Amharic and English." },
      { property: "og:title", content: "Daily Devotionals — መጽሐፍ ቅዱስ" },
      { property: "og:description", content: "Pause, read and reflect on God's Word every day." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DevotionalsPage,
});

function DevotionalsPage() {
  const { t } = useI18n();
  return (
    <>
      <PageIntro title={t.devotionals.title} subtitle={t.devotionals.subtitle} />
      <div className="container-page mt-10">
        <p className="rounded-xl bg-gold-soft px-4 py-3 text-sm text-foreground">{t.devotionals.sample}</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {DEVOTIONALS.map((d) => (
            <div key={d.id} id={d.id} className="scroll-mt-24">
              <DevotionalCard d={d} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
