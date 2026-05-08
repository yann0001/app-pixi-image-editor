import { atomEffect } from "jotai-effect";
import { viewportAtom } from "./ViewportAtoms";
import { fitZoomAtom, zoomAtom, zoomControlAtom } from "./ZoomAtoms";
import { ZOOM_BASE } from "./ZoomConstants";

export const canvasResizeAtomEffect = atomEffect((get, set) => {
  const viewport = get(viewportAtom);
  if (!viewport) return;

  const { app } = viewport;

  const onResize = (): void => {
    const newW = app.screen.width;
    const newH = app.screen.height;

    // Sync pixi-viewport's internal screen dimensions; triggers plugins.resize() on all plugins
    viewport.resize(newW, newH);

    const { worldWidth, worldHeight } = viewport;
    const newFitZoom = Math.floor(Math.min(newW / worldWidth, newH / worldHeight) * ZOOM_BASE);

    const wasAtFit = get(zoomAtom) === get(fitZoomAtom);

    set(fitZoomAtom, newFitZoom);

    if (wasAtFit) {
      viewport.fit(true);
      viewport.moveCenter(worldWidth / 2, worldHeight / 2);
      set(zoomControlAtom, newFitZoom);
    }
  };

  app.renderer.on("resize", onResize);
  return () => {
    app.renderer.off("resize", onResize);
  };
});
