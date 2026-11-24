import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  const { t } = useI18n();
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="መጽሐፍ ቅዱስ">
      <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-forest shadow-soft ring-1 ring-gold/50">
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 text-gold" aria-hidden="true">
          <path d="M11 3h2v5h5v2h-5v11h-2V10H6V8h5z" fill="currentColor" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-geez text-lg font-semibold ${inverted ? "text-forest-foreground" : "text-foreground"}`}
        >
          መጽሐፍ ቅዱስ
        </span>
        <span className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-gold">
          {t.brand === "መጽሐፍ ቅዱስ" ? "The Holy Bible" : "Mets'haf Kidus"}
        </span>
      </span>
    </Link>
  );
}
