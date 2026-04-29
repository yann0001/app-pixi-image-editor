import type { ReactElement } from "react";
import { LockOpenIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useIntl } from "react-intl";
import { SparklesIcon } from "~/components/icons/filters/SparklesIcon";
import { FitViewIcon } from "~/components/icons/tools/FitViewIcon";
import { FlipHorizontalIcon } from "~/components/icons/tools/FlipHorizontalIcon";
import { FlipVerticalIcon } from "~/components/icons/tools/FlipVerticalIcon";
import { FullscreenIcon } from "~/components/icons/tools/FullscreenIcon";
import { RotateCcwIcon } from "~/components/icons/tools/RotateCcwIcon";
import { RotateCwIcon } from "~/components/icons/tools/RotateCwIcon";

export interface ToolbarToolsProps {
  lock: boolean;
  showFitScreen: boolean;
  onToggleFilterMenu: () => void;
  onSwapLock: () => void;
  onRotate: (value: "rotate-left" | "rotate-right") => void;
  onFlip: (value: "flip-horizontal" | "flip-vertical") => void;
  onAdjustZoom: () => void;
}

export function ToolbarTools({
  lock,
  showFitScreen,
  onToggleFilterMenu,
  onSwapLock,
  onRotate,
  onFlip,
  onAdjustZoom,
}: ToolbarToolsProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="absolute z-10 mr-2 flex w-full justify-center p-4 max-md:bottom-0 max-md:left-0 md:top-0 md:mr-0">
      <div className="glass navbar rounded-box border-neutral bg-base-300 bg-opacity-80 dark:bg-opacity-80 h-10 min-h-0 w-auto gap-1 border shadow-xl md:h-12 md:gap-2 dark:bg-none">
        <div className="md:tooltip md:tooltip-bottom" data-tip={lock ? undefined : "Lock image to center"}>
          <button className={clsx("btn btn-square btn-ghost swap btn-sm", lock && "btn-active")} onClick={onSwapLock}>
            <input type="checkbox" checked={lock} onChange={onSwapLock} />
            <LockClosedIcon className="swap-on h-6 w-6" />
            <LockOpenIcon className="swap-off h-6 w-6" />
          </button>
        </div>
        <div className="divider divider-horizontal mx-0 w-0" />
        <div className="md:tooltip md:tooltip-bottom mt-1" data-tip={showFitScreen ? "Actual size" : "Fit to window"}>
          <button className="btn btn-square btn-ghost swap btn-sm" onClick={onAdjustZoom}>
            {showFitScreen ? <FullscreenIcon /> : <FitViewIcon />}
          </button>
        </div>
        <div className="divider divider-horizontal mx-0 w-0" />
        <div className="flex gap-1">
          <div className="md:tooltip md:tooltip-bottom mt-1" data-tip="Rotate 90° left">
            <button className="btn btn-square btn-ghost swap btn-sm" onClick={() => onRotate("rotate-left")}>
              <RotateCcwIcon />
            </button>
          </div>
          <div className="md:tooltip md:tooltip-bottom mt-1" data-tip="Rotate 90° right">
            <button className="btn btn-square btn-ghost swap btn-sm" onClick={() => onRotate("rotate-right")}>
              <RotateCwIcon />
            </button>
          </div>
          <div className="md:tooltip md:tooltip-bottom mt-1" data-tip="Flip vertical">
            <button className="btn btn-square btn-ghost swap btn-sm" onClick={() => onFlip("flip-vertical")}>
              <FlipVerticalIcon />
            </button>
          </div>
          <div className="md:tooltip md:tooltip-bottom mt-1" data-tip="Flip horizontal">
            <button className="btn btn-square btn-ghost swap btn-sm" onClick={() => onFlip("flip-horizontal")}>
              <FlipHorizontalIcon />
            </button>
          </div>
        </div>
        <div className="divider divider-horizontal mx-0 w-0" />
        <button className="btn btn-ghost btn-sm max-sm:btn-square" onClick={onToggleFilterMenu}>
          <SparklesIcon />
          <span className="hidden sm:block">
            {intl.formatMessage({
              description: "ToolbarTools - filters button label",
              defaultMessage: "Filters",
              id: "toolbar.filters",
            })}
          </span>
        </button>
      </div>
    </div>
  );
}
