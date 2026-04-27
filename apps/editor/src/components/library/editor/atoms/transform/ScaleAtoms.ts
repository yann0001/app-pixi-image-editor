import { atom } from "jotai";
import type { PointData } from "pixi.js";

export const scaleAtom = atom<PointData>({ x: 1, y: 1 });

// Derived atoms
export const scaleControlAtom = atom(
  null,
  (_get, set, scale: "flip-horizontal" | "flip-vertical" | "reset" | PointData) => {
    switch (scale) {
      case "flip-horizontal":
        set(scaleAtom, (prev) => {
          return { x: -prev.x, y: prev.y };
        });
        break;
      case "flip-vertical":
        set(scaleAtom, (prev) => {
          return { x: prev.x, y: -prev.y };
        });
        break;
      case "reset":
        set(scaleAtom, {
          x: 1,
          y: 1,
        });
        break;
      default:
        set(scaleAtom, scale);
    }
  }
);
