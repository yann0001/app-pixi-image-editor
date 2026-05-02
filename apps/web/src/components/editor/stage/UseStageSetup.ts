import { useCallback } from "react";
import { useAtom, useSetAtom } from "jotai";
import { viewportAtom } from "../atoms/viewport/ViewportAtoms";
import { viewportChangeAtomEffect } from "../atoms/viewport/ViewportChangeAtoms";
import { viewportSetupAtomEffect } from "../atoms/viewport/ViewportSetupAtoms";
import type { ViewportExtended } from "./ViewportExtended";

export function useStageSetup(): {
  registerViewport: (viewport: ViewportExtended) => void;
} {
  useAtom(viewportChangeAtomEffect);
  useAtom(viewportSetupAtomEffect);

  const setViewport = useSetAtom(viewportAtom);

  // Stable reference — setViewport from useSetAtom is guaranteed stable by Jotai
  const registerViewport = useCallback(
    (viewport: ViewportExtended): void => {
      setViewport(viewport);
    },
    [setViewport]
  );

  return {
    registerViewport,
  };
}
