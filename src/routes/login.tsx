import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — መጽሐፍ ቅዱስ" },
      { name: "description", content: "Accounts for syncing prayers, bookmarks and progress are coming soon." },
      { property: "og:title", content: "Log in — መጽሐፍ ቅዱስ" },
      { property: "og:description", content: "Accounts are coming soon to መጽሐፍ ቅዱስ." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { t } = useI18n();
  return (
    <div className="container-page flex min-h-[60vh] items-center justify-center py-20">
      <div className="max-w-md rounded-3xl border border-gold/30 bg-card p-10 text-center shadow-elegant">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-forest text-gold">
          <Lock className="h-6 w-6" />
        </span>
        <h1 className="mt-6 text-3xl font-semibold text-foreground">{t.login.title}</h1>
        <p className="mt-3 text-muted-foreground">{t.login.body}</p>
        <Button asChild variant="outline" className="mt-8 rounded-full">
          <Link to="/">
            <ArrowLeft /> {t.login.back}
          </Link>
        </Button>
      </div>
    </div>
  );
}
