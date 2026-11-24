import { createLocalValue } from "./local-store";

export interface Prayer {
  id: string;
  title: string;
  body: string;
  kind: "request" | "entry";
  answered: boolean;
  createdAt: string;
  answeredAt?: string;
}

const EMPTY: string[] = [];
const NO_PRAYERS: Prayer[] = [];

export const prayersStore = createLocalValue<Prayer[]>("mk.prayers", NO_PRAYERS);
export const bookmarksStore = createLocalValue<string[]>("mk.bookmarks", EMPTY);
export const chaptersReadStore = createLocalValue<string[]>("mk.chaptersRead", EMPTY);
export const visitDaysStore = createLocalValue<string[]>("mk.visitDays", EMPTY);
export const devotionalsDoneStore = createLocalValue<string[]>("mk.devotionalsDone", EMPTY);

export function dayKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Consecutive days ending today (or yesterday, if today isn't recorded yet). */
export function computeStreak(days: string[], today: Date): number {
  const set = new Set(days);
  const cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (!set.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (set.has(dayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function recordVisit(now = new Date()) {
  const key = dayKey(now);
  visitDaysStore.set((prev) => (prev.includes(key) ? prev : [...prev, key].slice(-400)));
}

export function toggleInList(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}
