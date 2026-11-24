import { useI18n, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const OPTIONS: Array<{ value: Lang; label: string }> = [
  { value: "am", label: "አማርኛ" },
  { value: "en", label: "English" },
];

export function LanguageSwitch({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div
      role="radiogroup"
      aria-label={t.nav.language}
      className={cn("inline-flex rounded-full border border-border bg-card p-0.5 text-xs", className)}
    >
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={lang === o.value}
          onClick={() => setLang(o.value)}
          className={cn(
            "rounded-full px-3 py-1.5 font-medium transition-colors",
            lang === o.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
