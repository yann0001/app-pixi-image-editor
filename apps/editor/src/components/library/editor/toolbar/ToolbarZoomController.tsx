import type { ReactElement } from "react";
import { useToolbarZoom } from "./UseToolbarZoom";
import { ToolbarZoom } from "./ToolbarZoom";

export function ToolbarZoomController(): ReactElement {
  const { zoom, zoomIn, zoomOut, resetZoom } = useToolbarZoom();
  return <ToolbarZoom zoom={zoom} onZoomIn={zoomIn} onZoomOut={zoomOut} onResetZoom={resetZoom} />;
}
