import type { ReactElement } from "react";
import { ToolbarMenu } from "./ToolbarMenu";
import { useToolbarMenu } from "./UseToolbarMenu";

export function ToolbarMenuController(): ReactElement {
  const { toggleDrawer } = useToolbarMenu();
  return <ToolbarMenu onToggle={toggleDrawer} />;
}
