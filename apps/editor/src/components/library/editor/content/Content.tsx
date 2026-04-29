import type { ReactElement } from "react";
import type { AppDrawerProps } from "../drawer/AppDrawer";
import { AppDrawer } from "../drawer/AppDrawer";
import { FilterDrawer } from "../drawer/FilterDrawer";
import { useAppDrawer } from "../drawer/UseAppDrawer";
import { useFilterDrawer } from "../drawer/UseFilterDrawer";
import { StageComponent } from "../stage/StageComponent";
import { ToolbarMenuController } from "../toolbar/ToolbarMenuController";
import { ToolbarToolsController } from "../toolbar/ToolbarToolsController";
import { ToolbarZoomController } from "../toolbar/ToolbarZoomController";

export interface ContentProps {
  appdrawerProps: Omit<AppDrawerProps, "open" | "onClose">;
}

export function Content({ appdrawerProps }: ContentProps): ReactElement {
  const filterDrawerInternalProps = useFilterDrawer();
  const appDrawerInternalProps = useAppDrawer();

  return (
    <div className="relative flex h-full w-full flex-col">
      <AppDrawer {...appdrawerProps} {...appDrawerInternalProps} />
      <FilterDrawer {...filterDrawerInternalProps} />
      <ToolbarMenuController />
      <ToolbarToolsController />
      <ToolbarZoomController />
      <StageComponent />
    </div>
  );
}
