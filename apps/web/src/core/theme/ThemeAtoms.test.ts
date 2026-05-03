import { createStore } from "jotai";
import { afterEach, beforeEach, describe, it, expect } from "vitest";
import { themeModeAtom, themeLocalStorageAtom } from "./ThemeAtoms";
import type { ThemeMode } from "./ThemeMode";

describe("ThemeAtoms", () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    localStorage.removeItem("theme");
    store = createStore();
  });

  afterEach(() => {
    localStorage.removeItem("theme");
  });

  it("defaults to light when no preference is stored", () => {
    expect(store.get(themeModeAtom)).toBe("light");
  });

  it("toggling switches from light to dark", () => {
    store.set(themeModeAtom);
    expect(store.get(themeModeAtom)).toBe("dark");
  });

  it("toggling again switches back to light", () => {
    store.set(themeModeAtom);
    store.set(themeModeAtom);
    expect(store.get(themeModeAtom)).toBe("light");
  });

  it("setting storage to dark makes themeModeAtom return dark", () => {
    store.set(themeLocalStorageAtom, "dark" as ThemeMode);
    expect(store.get(themeModeAtom)).toBe("dark");
  });

  it("setting storage to light makes themeModeAtom return light", () => {
    store.set(themeLocalStorageAtom, "dark" as ThemeMode);
    store.set(themeLocalStorageAtom, "light" as ThemeMode);
    expect(store.get(themeModeAtom)).toBe("light");
  });

  it("toggle alternates between light and dark each call", () => {
    const initialMode = store.get(themeModeAtom);
    store.set(themeModeAtom);
    const toggledMode = store.get(themeModeAtom);
    expect(toggledMode).not.toBe(initialMode);
  });
});
