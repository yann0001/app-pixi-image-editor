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
      <ToolbarMenuController />
      <ToolbarToolsController />
      <ToolbarZoomController />
      <StageComponent />
    </div>
  );
}
