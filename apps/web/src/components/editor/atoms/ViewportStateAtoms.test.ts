import { createStore } from "jotai";
import { describe, it, expect, beforeEach } from "vitest";
import { appMenuStateAtom, toggleAppMenuState } from "./menu/AppMenuAtoms";
import { filterMenuStateAtom, toggleFilterMenuState } from "./menu/FilterMenuAtoms";
import { lockAtom, lockControlAtom } from "./viewport/LockAtoms";
import { zoomAtom, zoomControlAtom, fitZoomAtom, minZoomAtom, maxZoomAtom } from "./viewport/ZoomAtoms";
import { ZOOM_BASE, ZOOM_MIN_DEFAULT, ZOOM_MAX_DEFAULT } from "./viewport/ZoomConstants";

describe("ViewportStateAtoms", () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
  });

  describe("ZoomConstants", () => {
    it("ZOOM_BASE is 100", () => {
      expect(ZOOM_BASE).toBe(100);
    });

    it("ZOOM_MIN_DEFAULT is 10", () => {
      expect(ZOOM_MIN_DEFAULT).toBe(10);
    });

    it("ZOOM_MAX_DEFAULT is 2000", () => {
      expect(ZOOM_MAX_DEFAULT).toBe(2000);
    });
  });

  describe("ZoomAtoms", () => {
    it("has correct default values", () => {
      expect(store.get(zoomAtom)).toBe(ZOOM_BASE);
      expect(store.get(fitZoomAtom)).toBe(ZOOM_BASE);
      expect(store.get(minZoomAtom)).toBe(ZOOM_MIN_DEFAULT);
      expect(store.get(maxZoomAtom)).toBe(ZOOM_MAX_DEFAULT);
    });

    it("increases zoom by 10", () => {
      store.set(zoomControlAtom, "increase");
      expect(store.get(zoomAtom)).toBe(110);
    });

    it("decreases zoom by 10", () => {
      store.set(zoomControlAtom, "increase");
      store.set(zoomControlAtom, "decrease");
      expect(store.get(zoomAtom)).toBe(100);
    });

    it("resets zoom to 100", () => {
      store.set(zoomControlAtom, "increase");
      store.set(zoomControlAtom, "reset");
      expect(store.get(zoomAtom)).toBe(100);
    });

    it("sets zoom to a specific number (floors it)", () => {
      store.set(zoomControlAtom, 150.7);
      expect(store.get(zoomAtom)).toBe(150);
    });
  });

  describe("LockAtoms", () => {
    it("is locked by default", () => {
      expect(store.get(lockAtom)).toBe(true);
    });

    it("toggles from locked to unlocked", () => {
      store.set(lockControlAtom);
      expect(store.get(lockAtom)).toBe(false);
    });

    it("toggles back to locked", () => {
      store.set(lockControlAtom);
      store.set(lockControlAtom);
      expect(store.get(lockAtom)).toBe(true);
    });
  });

  describe("AppMenuAtoms", () => {
    it("app menu is closed by default", () => {
      expect(store.get(appMenuStateAtom)).toBe(false);
    });

    it("toggles app menu open", () => {
      store.set(toggleAppMenuState);
      expect(store.get(appMenuStateAtom)).toBe(true);
    });

    it("toggles app menu closed again", () => {
      store.set(toggleAppMenuState);
      store.set(toggleAppMenuState);
      expect(store.get(appMenuStateAtom)).toBe(false);
    });
  });

  describe("FilterMenuAtoms", () => {
    it("filter menu is closed by default", () => {
      expect(store.get(filterMenuStateAtom)).toBe(false);
    });

    it("toggles filter menu open", () => {
      store.set(toggleFilterMenuState);
      expect(store.get(filterMenuStateAtom)).toBe(true);
    });
  });
});
