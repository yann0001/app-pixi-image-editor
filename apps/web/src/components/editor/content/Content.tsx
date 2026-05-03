import type { ReactElement } from "react";
import type { AppDrawerProps } from "../drawer/app-drawer/AppDrawer";
import { AppDrawerController } from "../drawer/app-drawer/AppDrawerController";
import { FilterDrawerController } from "../drawer/filter-drawer/FilterDrawerController";
import { StageComponent } from "../stage/StageComponent";
import { ToolbarMenuController } from "../toolbar/toolbar-menu/ToolbarMenuController";
import { ToolbarToolsController } from "../toolbar/toolbar-tools/ToolbarToolsController";
import { ToolbarZoomController } from "../toolbar/toolbar-zoom/ToolbarZoomController";

export interface ContentProps {
  appdrawerProps: Omit<AppDrawerProps, "open" | "onClose">;
}

export function Content({ appdrawerProps }: ContentProps): ReactElement {
  return (
    <div className="relative flex h-full w-full flex-col">
      <AppDrawerController {...appdrawerProps} />
      <FilterDrawerController />
      <div className="absolute z-20 flex justify-center p-4 max-md:top-4 max-md:left-0 md:top-0 md:left-0">
        <ToolbarMenuController />
      </div>
      <div className="absolute z-10 mr-2 flex w-full justify-center p-4 max-md:bottom-0 max-md:left-0 md:top-0 md:mr-0">
        <ToolbarToolsController />
      </div>
      <div className="absolute z-10 flex justify-center p-4 max-md:top-4 max-md:right-0 md:bottom-0 md:left-0">
        <ToolbarZoomController />
      </div>
      <StageComponent />
    </div>
  );
}
