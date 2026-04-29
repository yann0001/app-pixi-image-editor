import type { ReactElement } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

export interface ToolbarZoomProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export function ToolbarZoom({ zoom, onZoomIn, onZoomOut, onResetZoom }: ToolbarZoomProps): ReactElement {
  return (
    <div className="absolute z-10 flex justify-center p-4 max-md:top-4 max-md:right-0 md:bottom-0 md:left-0">
      <div className="glass navbar rounded-box border-neutral-content bg-base-100 bg-opacity-60 dark:bg-neutral dark:bg-opacity-80 h-10 min-h-0 w-auto gap-1 border shadow-xl md:h-12 md:gap-4 dark:bg-none">
        <button className="btn btn-square btn-ghost btn-xs md:btn-sm" onClick={onZoomIn}>
          <PlusIcon />
        </button>
        <div className="md:tooltip md:tooltip-top" data-tip="Reset zoom">
          <button className="w-8 md:w-10" onClick={onResetZoom}>
            <span className="text-sm">{zoom}%</span>
          </button>
        </div>
        <button className="btn btn-square btn-ghost btn-xs md:btn-sm" onClick={onZoomOut}>
          <MinusIcon />
        </button>
      </div>
    </div>
  );
}
