import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Logo } from "./Logo";
import { NAV_ITEMS } from "./nav";

export function SiteFooter() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-gradient-forest text-forest-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo inverted />
          <p className="mt-4 font-geez text-xl text-gold">በእምነት እደግ፤ በቃሉ ኑር።</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gold">{t.footer.navigate}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="opacity-80 transition-opacity hover:opacity-100">
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gold">{t.footer.about}</h3>
          <p className="mt-4 text-sm opacity-80">{t.footer.aboutBody}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gold">{t.footer.contact}</h3>
          <p className="mt-4 text-sm opacity-80">{t.footer.contactBody}</p>
          <a
            href="mailto:hello@metshafkidus.app"
            className="mt-3 inline-flex items-center gap-2 text-sm text-gold hover:underline"
          >
            <Mail className="h-4 w-4" /> hello@metshafkidus.app
          </a>
        </div>
      </div>
      <div className="container-page">
        <div className="gold-rule opacity-40" />
        <div className="flex flex-col gap-2 py-6 text-xs opacity-70 sm:flex-row sm:justify-between">
          <span>
            © {year} መጽሐፍ ቅዱስ. {t.footer.rights}
          </span>
          <span>{t.footer.scripture}</span>
        </div>
      </div>
    </footer>
  );
}
