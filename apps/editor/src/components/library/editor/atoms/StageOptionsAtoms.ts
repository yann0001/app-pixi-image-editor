import { atom } from "jotai";
import type { ApplicationOptions } from "pixi.js";

export const stageOptionsAtom = atom<Partial<ApplicationOptions>>({
  background: 0xffffff,
  backgroundAlpha: 0,
});
