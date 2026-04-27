import { AdjustmentFilter, PixelateFilter } from "pixi-filters";
import type { ImageLike } from "pixi.js";
import { BlurFilter, Rectangle, type Filter } from "pixi.js";
import type { ViewportExtended } from "~/components/library/editor/viewport/ViewportExtended";

export async function createImage(viewport: ViewportExtended): Promise<ImageLike> {
  const { app, filterContainer, rawFilterParams, worldWidth, worldHeight } = viewport;

  if (!filterContainer) throw new Error("Filter container not available");
  if (!rawFilterParams) throw new Error("Filter params not available");

  const { blur, brightness, contrast, saturation, pixelate, red, green, blue } = rawFilterParams;

  // Apply raw (non-zoom-scaled) filters so the saved image uses image-pixel units,
  // matching what the user sees at 100% zoom.
  const savedFilters = filterContainer.filters ? [...filterContainer.filters] : null;
  const extractionFilters: Filter[] = [
    new BlurFilter({ strength: blur }),
    new AdjustmentFilter({ brightness, contrast, saturation, red, green, blue }),
  ];
  if (pixelate > 0) extractionFilters.push(new PixelateFilter(pixelate));
  filterContainer.filters = extractionFilters;

  // resolution: 1 → output pixel dimensions equal world dimensions (no upscaling).
  // This ensures filter values map 1:1 to image pixels.
  const image = await app.renderer.extract.image({
    target: filterContainer,
    frame: new Rectangle(0, 0, worldWidth, worldHeight),
    resolution: 1,
  });

  filterContainer.filters = savedFilters;

  return image;
}
