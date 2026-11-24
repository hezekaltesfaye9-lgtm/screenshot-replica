import { useSyncExternalStore } from "react";

/**
 * Tiny on-device store. Every collection here is private to the browser and is the
 * seam where a Lovable Cloud repository will plug in once accounts exist.
 */
export function createLocalValue<T>(key: string, initial: T) {
  let cache: T | undefined;
  const listeners = new Set<() => void>();

  const read = (): T => {
    if (cache !== undefined) return cache;
    if (typeof window === "undefined") return initial;
    try {
      const raw = window.localStorage.getItem(key);
      cache = raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      cache = initial;
    }
    return cache;
  };

  const write = (next: T) => {
    cache = next;
    window.localStorage.setItem(key, JSON.stringify(next));
    listeners.forEach((l) => l());
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) {
        cache = undefined;
        listener();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  };

  return {
    get: read,
    set: (updater: (prev: T) => T) => write(updater(read())),
    useValue: () => useSyncExternalStore(subscribe, read, () => initial),
  };
}
