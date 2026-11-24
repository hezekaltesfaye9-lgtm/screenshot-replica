import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, HandHeart, RotateCcw, Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PageIntro } from "@/components/site/PageIntro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { prayersStore, type Prayer } from "@/lib/growth";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/prayer")({
  head: () => ({
    meta: [
      { title: "Prayer Journal — መጽሐፍ ቅዱስ" },
      { name: "description", content: "Write prayers, keep prayer requests and remember answered prayers." },
      { property: "og:title", content: "Prayer Journal — መጽሐፍ ቅዱስ" },
      { property: "og:description", content: "A private journal for your prayers, requests and answered prayers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrayerPage,
});

type Filter = "all" | "open" | "answered";

function PrayerPage() {
  const { t, lang } = useI18n();
  const prayers = prayersStore.useValue();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [kind, setKind] = useState<Prayer["kind"]>("request");
  const [filter, setFilter] = useState<Filter>("all");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    const prayer: Prayer = {
      id: crypto.randomUUID(),
      title: title.trim(),
      body: body.trim(),
      kind,
      answered: false,
      createdAt: new Date().toISOString(),
    };
    prayersStore.set((prev) => [prayer, ...prev]);
    setTitle("");
    setBody("");
    toast.success(t.prayer.saved);
  };

  const update = (id: string, patch: Partial<Prayer>) =>
    prayersStore.set((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const remove = (id: string) => prayersStore.set((prev) => prev.filter((p) => p.id !== id));

  const shown = prayers.filter((p) =>
    filter === "all" ? true : filter === "answered" ? p.answered : p.kind === "request" && !p.answered,
  );
  const fmt = new Intl.DateTimeFormat(lang === "am" ? "am-ET" : "en-US", { dateStyle: "medium" });

  return (
    <>
      <PageIntro title={t.prayer.title} subtitle={t.prayer.subtitle} />
      <div className="container-page mt-10 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <form onSubmit={submit} className="h-fit rounded-3xl border border-gold/30 bg-card p-6 shadow-elegant md:p-8">
          <div className="grid grid-cols-2 gap-1 rounded-full bg-muted p-1 text-sm">
            {(["request", "entry"] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                className={cn(
                  "rounded-full py-1.5 transition-colors",
                  kind === k ? "bg-card text-foreground shadow-soft" : "text-muted-foreground",
                )}
              >
                {k === "request" ? t.prayer.request : t.prayer.entry}
              </button>
            ))}
          </div>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.prayer.titlePlaceholder}
            className="mt-4"
            maxLength={120}
          />
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={t.prayer.placeholder}
            className="mt-3 min-h-40 text-base"
            maxLength={4000}
            required
          />
          <Button type="submit" className="mt-4 w-full rounded-full" disabled={!body.trim()}>
            <HandHeart /> {t.prayer.save}
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">{t.prayer.deviceNote}</p>
        </form>

        <section>
          <div className="flex flex-wrap gap-2">
            {(["all", "open", "answered"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm transition-colors",
                  filter === f ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {t.prayer[f]}
              </button>
            ))}
          </div>
          <ul className="mt-5 space-y-3">
            {shown.map((p) => (
              <li key={p.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-full bg-gold-soft px-2.5 py-0.5 font-medium text-foreground">
                        {p.kind === "request" ? t.prayer.request : t.prayer.entry}
                      </span>
                      {p.answered && (
                        <span className="inline-flex items-center gap-1 font-medium text-primary">
                          <CheckCircle2 className="h-3.5 w-3.5" /> {t.prayer.answered}
                        </span>
                      )}
                      <span className="text-muted-foreground">{fmt.format(new Date(p.createdAt))}</span>
                    </div>
                    {p.title && <h3 className="mt-2 text-lg font-semibold text-foreground">{p.title}</h3>}
                    <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">{p.body}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.kind === "request" && (
                    <Button
                      size="sm"
                      variant="soft"
                      className="rounded-full"
                      onClick={() =>
                        update(p.id, p.answered ? { answered: false } : { answered: true, answeredAt: new Date().toISOString() })
                      }
                    >
                      {p.answered ? <RotateCcw /> : <CheckCircle2 />}
                      {p.answered ? t.prayer.markOpen : t.prayer.markAnswered}
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" className="rounded-full text-muted-foreground" onClick={() => remove(p.id)}>
                    <Trash2 /> {t.prayer.remove}
                  </Button>
                </div>
              </li>
            ))}
            {shown.length === 0 && (
              <li className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                {t.prayer.empty}
              </li>
            )}
          </ul>
        </section>
      </div>
    </>
  );
}
