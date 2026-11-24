import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";
import { NAV_ITEMS } from "./nav";


export function SiteHeader() {
  const { t } = useI18n();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-gold-soft data-[status=active]:text-foreground"
            >
              {t.nav[item.key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitch className="hidden sm:inline-flex" />
          <Button variant="ghost" size="icon" onClick={toggle} aria-label={t.nav.theme}>
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
          <Button asChild size="sm" className="hidden rounded-full md:inline-flex">
            <Link to="/login">{t.nav.login}</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label={t.nav.menu}>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background">
              <SheetHeader>
                <SheetTitle className="text-left">{t.brand}</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1" aria-label="Mobile">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: item.to === "/" }}
                    className="rounded-lg px-3 py-2.5 text-base text-muted-foreground hover:bg-muted hover:text-foreground data-[status=active]:bg-gold-soft data-[status=active]:text-foreground"
                  >
                    {t.nav[item.key]}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-4">
                <LanguageSwitch className="self-start" />
                <Button asChild className="rounded-full">
                  <Link to="/login" onClick={() => setOpen(false)}>
                    {t.nav.login}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
