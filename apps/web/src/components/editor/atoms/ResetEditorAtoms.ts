import { atom } from "jotai";
import {
  blueFilterAtom,
  blurFilterAtom,
  brightnessFilterAtom,
  contrastFilterAtom,
  greenFilterAtom,
  pixelateFilterAtom,
  redFilterAtom,
  saturationFilterAtom,
} from "./filters/FilterAtoms";
import { appMenuStateAtom } from "./menu/AppMenuAtoms";
import { filterMenuStateAtom } from "./menu/FilterMenuAtoms";
import { rotationAtom } from "./transform/RotationAtoms";
import { scaleAtom } from "./transform/ScaleAtoms";
import { lockAtom } from "./viewport/LockAtoms";
import { fitZoomAtom, zoomAtom } from "./viewport/ZoomAtoms";
import { ZOOM_BASE } from "./viewport/ZoomConstants";

export const resetEditorAtom = atom(null, (_get, set) => {
  set(blurFilterAtom, 0);
  set(brightnessFilterAtom, 1);
  set(contrastFilterAtom, 1);
  set(saturationFilterAtom, 1);
  set(pixelateFilterAtom, 0);
  set(redFilterAtom, 1);
  set(greenFilterAtom, 1);
  set(blueFilterAtom, 1);
  set(rotationAtom, 0);
  set(scaleAtom, { x: 1, y: 1 });
  set(zoomAtom, ZOOM_BASE);
  set(fitZoomAtom, ZOOM_BASE);
  set(lockAtom, true);
  set(filterMenuStateAtom, false);
  set(appMenuStateAtom, false);
});
