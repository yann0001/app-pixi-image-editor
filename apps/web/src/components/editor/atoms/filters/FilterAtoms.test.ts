import { createStore } from "jotai";
import { describe, it, expect, beforeEach } from "vitest";
import {
  blurFilterAtom,
  brightnessFilterAtom,
  contrastFilterAtom,
  saturationFilterAtom,
  pixelateFilterAtom,
  redFilterAtom,
  greenFilterAtom,
  blueFilterAtom,
  controlFilterAtom,
} from "./FilterAtoms";

describe("FilterAtoms", () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
  });

  it("has correct default values", () => {
    expect(store.get(blurFilterAtom)).toBe(0);
    expect(store.get(brightnessFilterAtom)).toBe(1);
    expect(store.get(contrastFilterAtom)).toBe(1);
    expect(store.get(saturationFilterAtom)).toBe(1);
    expect(store.get(pixelateFilterAtom)).toBe(0);
    expect(store.get(redFilterAtom)).toBe(1);
    expect(store.get(greenFilterAtom)).toBe(1);
    expect(store.get(blueFilterAtom)).toBe(1);
  });

  it("controlFilterAtom read returns all filter values", () => {
    expect(store.get(controlFilterAtom)).toEqual({
      blur: 0,
      brightness: 1,
      contrast: 1,
      saturation: 1,
      pixelate: 0,
      red: 1,
      green: 1,
      blue: 1,
    });
  });

  it("sets blur via controlFilterAtom", () => {
    store.set(controlFilterAtom, { blur: 10 });
    expect(store.get(blurFilterAtom)).toBe(10);
  });

  it("sets brightness via controlFilterAtom", () => {
    store.set(controlFilterAtom, { brightness: 1.5 });
    expect(store.get(brightnessFilterAtom)).toBe(1.5);
  });

  it("sets contrast via controlFilterAtom", () => {
    store.set(controlFilterAtom, { contrast: 1.5 });
    expect(store.get(contrastFilterAtom)).toBe(1.5);
  });

  it("sets saturation via controlFilterAtom", () => {
    store.set(controlFilterAtom, { saturation: 1.5 });
    expect(store.get(saturationFilterAtom)).toBe(1.5);
  });

  it("sets pixelate via controlFilterAtom", () => {
    store.set(controlFilterAtom, { pixelate: 5 });
    expect(store.get(pixelateFilterAtom)).toBe(5);
  });

  it("sets red via controlFilterAtom", () => {
    store.set(controlFilterAtom, { red: 0.8 });
    expect(store.get(redFilterAtom)).toBe(0.8);
  });

  it("sets green via controlFilterAtom", () => {
    store.set(controlFilterAtom, { green: 0.8 });
    expect(store.get(greenFilterAtom)).toBe(0.8);
  });

  it("sets blue via controlFilterAtom", () => {
    store.set(controlFilterAtom, { blue: 0.8 });
    expect(store.get(blueFilterAtom)).toBe(0.8);
  });

  it("partial update does not affect other filters", () => {
    store.set(controlFilterAtom, { blur: 10 });
    expect(store.get(brightnessFilterAtom)).toBe(1);
    expect(store.get(contrastFilterAtom)).toBe(1);
  });
});
