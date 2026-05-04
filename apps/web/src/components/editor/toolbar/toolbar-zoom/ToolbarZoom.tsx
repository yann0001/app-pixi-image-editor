import type { ReactElement } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { useIntl } from "react-intl";

export interface ToolbarZoomProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export function ToolbarZoom({ zoom, onZoomIn, onZoomOut, onResetZoom }: ToolbarZoomProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="glass rounded-box bg-base-100/70 flex h-10 min-h-0 w-auto items-center gap-1 px-1 shadow-xl md:h-12 md:gap-2">
      <button
        className="btn btn-square btn-ghost btn-sm md:btn-md"
        onClick={onZoomIn}
        aria-label={intl.formatMessage({
          description: "ToolbarZoom - zoom in button label",
          defaultMessage: "Zoom in",
          id: "T7uZ6T",
        })}
      >
        <PlusIcon className="h-4 w-4 md:h-5 md:w-5" />
      </button>
      <div className="tooltip tooltip-top" data-tip="Reset zoom">
        <button
          className="btn btn-ghost btn-xs md:btn-sm w-12 font-mono tabular-nums md:w-14"
          data-testid="toolbar-zoom__reset"
          onClick={onResetZoom}
          aria-label={intl.formatMessage({
            description: "ToolbarZoom - reset zoom button label",
            defaultMessage: "Reset zoom",
            id: "QltJXH",
          })}
        >
          {zoom}%
        </button>
      </div>
      <button
        className="btn btn-square btn-ghost btn-sm md:btn-md"
        onClick={onZoomOut}
        aria-label={intl.formatMessage({
          description: "ToolbarZoom - zoom out button label",
          defaultMessage: "Zoom out",
          id: "XwtBZp",
        })}
      >
        <MinusIcon className="h-4 w-4 md:h-5 md:w-5" />
      </button>
    </div>
  );
}
