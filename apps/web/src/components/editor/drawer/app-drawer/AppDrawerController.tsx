import type { ReactElement } from "react";
import type { AppDrawerProps } from "./AppDrawer";
import { AppDrawer } from "./AppDrawer";
import { useAppDrawer } from "./UseAppDrawer";

export function AppDrawerController(props: Omit<AppDrawerProps, "open" | "onClose">): ReactElement {
  const { open, onClose } = useAppDrawer();
  return <AppDrawer {...props} open={open} onClose={onClose} />;
}
