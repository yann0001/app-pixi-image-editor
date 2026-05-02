import type { ReactElement } from "react";
import { ToolbarTools } from "./ToolbarTools";
import { useToolbarAdjustZoom } from "./UseToolbarAdjustZoom";
import { useToolbarTools } from "./UseToolbarTools";

export function ToolbarToolsController(): ReactElement {
  const { lock, swapLock, rotate, flip, toggleFilterMenu } = useToolbarTools();
  const { adjustZoom, showFitScreen } = useToolbarAdjustZoom();

  return (
    <ToolbarTools
      lock={lock}
      showFitScreen={showFitScreen}
      onToggleFilterMenu={toggleFilterMenu}
      onSwapLock={swapLock}
      onRotate={rotate}
      onFlip={flip}
      onAdjustZoom={adjustZoom}
    />
  );
}
