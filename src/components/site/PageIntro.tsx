import type { ReactNode } from "react";

export function PageIntro({ title, subtitle, children }: { title: string; subtitle: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary/60">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-soft blur-3xl animate-glow" />
      <div className="container-page relative py-14 md:py-20">
        <div className="mb-4 h-px w-16 bg-gold" />
        <h1 className="text-4xl font-semibold text-foreground md:text-5xl animate-fade-up">{title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
        {children}
      </div>
    </section>
  );
}
