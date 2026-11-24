import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock } from "lucide-react";
import { devotionalsDoneStore, toggleInList } from "@/lib/growth";
import { cn } from "@/lib/utils";
import type { Devotional } from "@/data/devotionals";
import { useI18n } from "@/lib/i18n";
import { formatRef } from "@/lib/scripture";

export function DevotionalCard({ d }: { d: Devotional }) {
  const { t, lang } = useI18n();
  const done = devotionalsDoneStore.useValue().includes(d.id);
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-elegant">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-semibold text-gold">{formatRef(d.ref.bookId, d.ref.chapter, d.ref.verses, lang)}</span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> {t.devotionals.minutes(d.minutes)}
        </span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-foreground">{d.title[lang]}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{d.summary[lang]}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <Link
          to="/devotionals"
          hash={d.id}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          {t.devotionals.readMore}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <button
          type="button"
          aria-pressed={done}
          onClick={() => devotionalsDoneStore.set((prev) => toggleInList(prev, d.id))}
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs transition-colors",
            done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground",
          )}
        >
          <Check className="h-3.5 w-3.5" /> {done ? t.devotionals.done : t.devotionals.markRead}
        </button>
      </div>
    </article>
  );
}
