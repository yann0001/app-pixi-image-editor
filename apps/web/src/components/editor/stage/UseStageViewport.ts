import { useCallback } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import type { ApplicationOptions, PointData } from "pixi.js";
import { isRotatedAtom, rotationAtom } from "../atoms/transform/RotationAtoms";
import { scaleAtom } from "../atoms/transform/ScaleAtoms";
import { lockAtom } from "../atoms/viewport/LockAtoms";
import { maxZoomAtom, minZoomAtom, zoomAtom, zoomControlAtom } from "../atoms/viewport/ZoomAtoms";
import { stageOptionsAtom } from "./StageOptionsAtoms";

export function useStageViewport(): {
  stageOptions: Partial<ApplicationOptions>;
  lock: boolean;
  scale: PointData;
  rotation: number;
  isRotated: boolean;
  zoom: number;
  minZoom: number;
  maxZoom: number;
  setZoom: (value: number) => void;
} {
  const stageOptions = useAtomValue(stageOptionsAtom);
  const lock = useAtomValue(lockAtom);
  const scale = useAtomValue(scaleAtom);
  const zoom = useAtomValue(zoomAtom);
  const minZoom = useAtomValue(minZoomAtom);
  const maxZoom = useAtomValue(maxZoomAtom);
  const zoomControl = useSetAtom(zoomControlAtom);
  const rotation = useAtomValue(rotationAtom);
  const isRotated = useAtomValue(isRotatedAtom);

  // Stable reference — zoomControl from useSetAtom is guaranteed stable by Jotai
  const setZoom = useCallback(
    (value: number): void => {
      zoomControl(value * 100);
    },
    [zoomControl]
  );

  return {
    stageOptions,
    lock,
    scale,
    rotation,
    isRotated,
    zoom,
    minZoom: minZoom,
    maxZoom: maxZoom,
    setZoom,
  };
}
