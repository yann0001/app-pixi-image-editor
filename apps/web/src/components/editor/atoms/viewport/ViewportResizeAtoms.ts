import { atomEffect } from "jotai-effect";
import { lockAtom } from "./LockAtoms";
import { viewportAtom } from "./ViewportAtoms";
import { fitZoomAtom, zoomAtom, zoomControlAtom } from "./ZoomAtoms";
import { ZOOM_BASE } from "./ZoomConstants";

export const canvasResizeAtomEffect = atomEffect((get, set) => {
  const viewport = get(viewportAtom);
  if (!viewport) return;

  const { app } = viewport;

  function onResize(): void {
    const newW = app.screen.width;
    const newH = app.screen.height;

    if (viewport === null) {
      return;
    }

    // Capture the world point currently at the screen center before resize shifts it
    const oldCenter = viewport.center;

    // Sync pixi-viewport's internal screen dimensions; triggers plugins.resize() on all plugins
    viewport.resize(newW, newH);

    const { worldWidth, worldHeight } = viewport;
    const newFitZoom = Math.floor(Math.min(newW / worldWidth, newH / worldHeight) * ZOOM_BASE);

    const wasAtFit = get(zoomAtom) === get(fitZoomAtom);
    const locked = get(lockAtom);

    set(fitZoomAtom, newFitZoom);

    if (wasAtFit && locked) {
      // Locked + at fit zoom: re-fit and re-center to image center
      viewport.fit(true);
      viewport.moveCenter(worldWidth / 2, worldHeight / 2);
      set(zoomControlAtom, newFitZoom);
    } else {
      // Unlocked (free pan) or custom zoom: preserve the world point that was centered
      viewport.moveCenter(oldCenter.x, oldCenter.y);
    }
  }

  app.renderer.on("resize", onResize);
  return () => {
    app.renderer.off("resize", onResize);
  };
});
