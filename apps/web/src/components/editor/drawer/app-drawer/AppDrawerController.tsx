import type { ReactElement } from "react";
import type { AppDrawerProps } from "./AppDrawer";
import { AppDrawer } from "./AppDrawer";
import { useAppDrawer } from "./UseAppDrawer";

export function AppDrawerController(props: Omit<AppDrawerProps, "open" | "onClose" | "onAbout">): ReactElement {
  const { open, onClose, onAbout } = useAppDrawer();
  return <AppDrawer {...props} open={open} onClose={onClose} onAbout={onAbout} />;
}
