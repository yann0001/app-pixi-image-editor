import { useEffect, useRef } from "react";
import { useApplication } from "@pixi/react";
import { AdjustmentFilter, PixelateFilter } from "pixi-filters";
import { BlurFilter, Container, type Filter, Sprite, Texture, Ticker } from "pixi.js";
import { ZOOM_BASE } from "../constants/ZoomConstants";
import { ViewportExtended } from "../viewport/ViewportExtended";
import { useStageFilters } from "./UseStageFilters";
import { useStageImage } from "./UseStageImage";
import { useStageSetup } from "./UseStageSetup";
import { useStageViewport } from "./UseStageViewport";

export function PixiScene(): null {
  const { app, isInitialised } = useApplication();
  const viewportRef = useRef<ViewportExtended | null>(null);
  const filterContainerRef = useRef<Container | null>(null);
  const spriteRef = useRef<Sprite | null>(null);

  const { lock, scale, rotation, isRotated, zoom, minZoom, maxZoom, setZoom } = useStageViewport();
  const { imageUrl, imageWidth, imageHeight } = useStageImage();
  const { registerViewport } = useStageSetup();
  const { blur, brightness, contrast, saturation, pixelate, red, green, blue } = useStageFilters();

  // Initialize scene when app is ready and image dimensions are known
  useEffect(() => {
    if (!isInitialised || !imageUrl || !imageWidth || !imageHeight) return;

    const viewport = new ViewportExtended({
      app,
      ticker: Ticker.shared,
      worldWidth: imageWidth,
      worldHeight: imageHeight,
      screenWidth: app.screen.width,
      screenHeight: app.screen.height,
    });

    viewport.drag().pinch().wheel().decelerate();
    viewport.fit();
    viewport.moveCenter(imageWidth / 2, imageHeight / 2);
    viewport.clampZoom({
      maxScale: maxZoom / ZOOM_BASE,
      minScale: minZoom / ZOOM_BASE,
    });
    viewport.addListener("zoomed", () => setZoom(viewport.scale.x));

    const container = new Container();
    viewport.addChild(container);

    app.stage.addChild(viewport);
    viewportRef.current = viewport;
    filterContainerRef.current = container;
    registerViewport(viewport);

    const img = new Image();
    img.src = imageUrl;
    img.decode().then(() => {
      if (!viewportRef.current) return;
      const texture = Texture.from(img);
      const sprite = new Sprite(texture);
      sprite.anchor.set(0.5);
      sprite.scale.set(scale.x, scale.y);
      sprite.rotation = rotation;
      sprite.position.set(imageWidth / 2, imageHeight / 2);
      container.addChild(sprite);
      spriteRef.current = sprite;
    });

    return () => {
      viewport.removeAllListeners();
      viewport.patchEvents();
      viewport.destroy({ children: true });
      viewport.releaseDOMElement();
      viewportRef.current = null;
      filterContainerRef.current = null;
      spriteRef.current = null;
    };
  }, [isInitialised, imageUrl, imageWidth, imageHeight]);

  // Update Pixi filters whenever filter values change
  useEffect(() => {
    const container = filterContainerRef.current;
    if (!container) return;

    const blurFilter = new BlurFilter({ strength: blur });
    const adjustFilter = new AdjustmentFilter({ brightness, contrast, saturation, red, green, blue });
    const activeFilters: Filter[] = [blurFilter, adjustFilter];
    if (pixelate > 0) {
      activeFilters.push(new PixelateFilter(pixelate));
    }
    container.filters = activeFilters;
  }, [blur, brightness, contrast, saturation, pixelate, red, green, blue]);

  // Update sprite scale and rotation
  useEffect(() => {
    const sprite = spriteRef.current;
    if (!sprite) return;
    sprite.scale.set(scale.x, scale.y);
    sprite.rotation = rotation;
  }, [scale, rotation]);

  // Update viewport lock
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    if (lock) {
      viewport.clamp({ direction: "all", underflow: "center" });
    } else {
      viewport.plugins.remove("clamp");
    }
  }, [lock]);

  // Update zoom
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.setZoom(zoom / 100, true);
  }, [zoom]);

  // Re-center when image dimensions change due to rotation
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.moveCenter(imageWidth / 2, imageHeight / 2);
    viewport.fit();
  }, [isRotated]);

  return null;
}
