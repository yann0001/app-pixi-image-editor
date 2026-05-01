import type { ReactElement } from "react";
import { ToolbarZoom } from "./ToolbarZoom";
import { useToolbarZoom } from "./UseToolbarZoom";

export function ToolbarZoomController(): ReactElement {
  const { zoom, zoomIn, zoomOut, resetZoom } = useToolbarZoom();
  return <ToolbarZoom zoom={zoom} onZoomIn={zoomIn} onZoomOut={zoomOut} onResetZoom={resetZoom} />;
}
