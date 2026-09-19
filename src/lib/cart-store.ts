"use client";

import { useSyncExternalStore } from "react";
import { lineKey, type CartLine } from "./pricing";

// Cart state lives in localStorage and is shared through a tiny external store,
// so every component stays in sync (including across browser tabs).

const KEY = "ftb-cart-v1";

type State = { lines: CartLine[]; open: boolean; lastAdded: string | null };

const EMPTY: State = { lines: [], open: false, lastAdded: null };
let state: State = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function read(): CartLine[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function ensureLoaded() {
  if (!loaded && typeof window !== "undefined") {
    loaded = true;
    state = { ...state, lines: read() };
  }
}

function set(next: Partial<State>) {
  state = { ...state, ...next };
  if (next.lines) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state.lines));
    } catch {}
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  ensureLoaded();
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) set({ lines: read() });
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => {
  ensureLoaded();
  return state;
};
const getServerSnapshot = () => EMPTY;

const actions = {
  add(line: CartLine, openDrawer = true) {
    const key = lineKey(line);
    const existing = state.lines.find((l) => lineKey(l) === key);
    const lines = existing
      ? state.lines.map((l) => (l === existing ? { ...l, qty: Math.min(99, l.qty + line.qty) } : l))
      : [...state.lines, line];
    set({ lines, open: openDrawer || state.open, lastAdded: `${key}#${Date.now()}` });
  },
  setQty(key: string, qty: number) {
    set({
      lines:
        qty < 1
          ? state.lines.filter((l) => lineKey(l) !== key)
          : state.lines.map((l) => (lineKey(l) === key ? { ...l, qty: Math.min(99, qty) } : l)),
    });
  },
  remove(key: string) {
    set({ lines: state.lines.filter((l) => lineKey(l) !== key) });
  },
  clear() {
    set({ lines: [] });
  },
  setOpen(open: boolean) {
    set({ open });
  },
};

export function useCart() {
  const s = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { ...s, count: s.lines.reduce((n, l) => n + l.qty, 0), ...actions };
}
