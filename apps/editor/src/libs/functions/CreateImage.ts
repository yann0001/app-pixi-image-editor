import type { ImageLike } from "pixi.js";
import type { ViewportExtended } from "~/components/library/editor/viewport/ViewportExtended";

export async function createImage(viewport: ViewportExtended): Promise<ImageLike> {
  const { app } = viewport;

  return app.renderer.extract.image({
    target: viewport,
    frame: app.screen,
    resolution: 2,
  });
}
