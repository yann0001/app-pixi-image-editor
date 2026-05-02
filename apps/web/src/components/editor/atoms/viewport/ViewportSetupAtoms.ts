import { atom } from "jotai";
import { atomEffect } from "jotai-effect";
import { fitScreenAtom } from "./FitScreenAtoms";
import { viewportAtom } from "./ViewportAtoms";

const viewportSetupHasRunAtom = atom(false);

// Effects
export const viewportSetupAtomEffect = atomEffect((get, set) => {
  if (!get(viewportAtom)) return;
  if (get(viewportSetupHasRunAtom)) return;

  set(viewportSetupHasRunAtom, true);

  // Run setup for viewport
  set(fitScreenAtom);
});
