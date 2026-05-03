import { createStore } from "jotai";
import { describe, it, expect, beforeEach } from "vitest";
import { isRotatedAtom, rotationAtom, rotationControlAtom } from "./transform/RotationAtoms";
import { scaleAtom, scaleControlAtom } from "./transform/ScaleAtoms";

describe("TransformAtoms", () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
  });

  describe("RotationAtoms", () => {
    it("rotation is 0 by default", () => {
      expect(store.get(rotationAtom)).toBe(0);
    });

    it("isRotated is false by default", () => {
      expect(store.get(isRotatedAtom)).toBe(false);
    });

    it("rotate-left decreases rotation by PI/2", () => {
      store.set(rotationControlAtom, "rotate-left");
      expect(store.get(rotationAtom)).toBeCloseTo(-Math.PI / 2);
    });

    it("rotate-left sets isRotated to true", () => {
      store.set(rotationControlAtom, "rotate-left");
      expect(store.get(isRotatedAtom)).toBe(true);
    });

    it("rotate-right increases rotation by PI/2", () => {
      store.set(rotationControlAtom, "rotate-right");
      expect(store.get(rotationAtom)).toBeCloseTo(Math.PI / 2);
    });

    it("rotate-right sets isRotated to true", () => {
      store.set(rotationControlAtom, "rotate-right");
      expect(store.get(isRotatedAtom)).toBe(true);
    });

    it("reset sets rotation back to 0", () => {
      store.set(rotationControlAtom, "rotate-left");
      store.set(rotationControlAtom, "reset");
      expect(store.get(rotationAtom)).toBe(0);
      expect(store.get(isRotatedAtom)).toBe(false);
    });

    it("sets rotation to a specific number", () => {
      store.set(rotationControlAtom, Math.PI / 2);
      expect(store.get(rotationAtom)).toBeCloseTo(Math.PI / 2);
      expect(store.get(isRotatedAtom)).toBe(true);
    });
  });

  describe("ScaleAtoms", () => {
    it("scale is {x: 1, y: 1} by default", () => {
      expect(store.get(scaleAtom)).toEqual({ x: 1, y: 1 });
    });

    it("flip-horizontal negates x", () => {
      store.set(scaleControlAtom, "flip-horizontal");
      expect(store.get(scaleAtom)).toEqual({ x: -1, y: 1 });
    });

    it("flip-vertical negates y", () => {
      store.set(scaleControlAtom, "flip-vertical");
      expect(store.get(scaleAtom)).toEqual({ x: 1, y: -1 });
    });

    it("reset restores scale to {x: 1, y: 1}", () => {
      store.set(scaleControlAtom, "flip-horizontal");
      store.set(scaleControlAtom, "flip-vertical");
      store.set(scaleControlAtom, "reset");
      expect(store.get(scaleAtom)).toEqual({ x: 1, y: 1 });
    });

    it("sets scale directly", () => {
      store.set(scaleControlAtom, { x: 2, y: 3 });
      expect(store.get(scaleAtom)).toEqual({ x: 2, y: 3 });
    });
  });
});
