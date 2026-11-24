import { describe, expect, it } from "vitest";
import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { BIBLE_BOOKS, NEW_TESTAMENT, OLD_TESTAMENT, TRANSLATIONS } from "@/data/bible-books";
import { DAILY_VERSES, verseForDate } from "@/data/verses";
import { computeStreak } from "@/lib/growth";
import { routeTree } from "@/routeTree.gen";

describe("Bible catalogue", () => {
  it("has 39 Old Testament and 27 New Testament books", () => {
    expect(OLD_TESTAMENT).toHaveLength(39);
    expect(NEW_TESTAMENT).toHaveLength(27);
  });

  it("totals 1,189 chapters", () => {
    expect(BIBLE_BOOKS.reduce((n, b) => n + b.chapters, 0)).toBe(1189);
  });

  it("offers both Amharic translations (1954 and 2000) and the KJV", () => {
    expect(TRANSLATIONS.map((t) => t.id)).toEqual(["am-1954", "am-2000", "en-kjv"]);
  });
});

describe("Daily verse", () => {
  it("never ships hand-written text for the 2000 Amharic translation", () => {
    for (const v of DAILY_VERSES) expect(v.text["am-2000"]).toBeUndefined();
  });

  it("is the same verse all day and changes the next day", () => {
    const morning = verseForDate(new Date(2026, 10, 24, 6));
    const evening = verseForDate(new Date(2026, 10, 24, 22));
    const tomorrow = verseForDate(new Date(2026, 10, 25, 6));
    expect(evening).toBe(morning);
    expect(tomorrow).not.toBe(morning);
  });
});

describe("Reading streak", () => {
  const today = new Date(2026, 10, 24);
  it("counts consecutive days ending today", () => {
    expect(computeStreak(["2026-11-22", "2026-11-23", "2026-11-24"], today)).toBe(3);
  });
  it("keeps yesterday's streak if today isn't recorded yet", () => {
    expect(computeStreak(["2026-11-22", "2026-11-23"], today)).toBe(2);
  });
  it("resets after a missed day", () => {
    expect(computeStreak(["2026-11-20", "2026-11-24"], today)).toBe(1);
  });
});

describe("Navigation", () => {
  it.each(["/", "/bible", "/prayer", "/devotionals", "/study", "/growth", "/login"])("%s has a page", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes(path).at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
