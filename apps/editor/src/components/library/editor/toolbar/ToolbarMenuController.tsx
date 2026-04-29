import type { ReactElement } from "react";
import { useToolbarMenu } from "./UseToolbarMenu";
import { ToolbarMenu } from "./ToolbarMenu";

export function ToolbarMenuController(): ReactElement {
  const { toggleDrawer } = useToolbarMenu();
  return <ToolbarMenu onToggle={toggleDrawer} />;
}
