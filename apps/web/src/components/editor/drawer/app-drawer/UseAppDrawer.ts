import { useAtomValue, useSetAtom } from "jotai";
import { aboutModalOpenAtom } from "~/components/actions/about-modal/AboutModalAtoms";
import { appMenuStateAtom, toggleAppMenuState } from "../../atoms/menu/AppMenuAtoms";
import type { AppDrawerProps } from "./AppDrawer";

export function useAppDrawer(): Pick<AppDrawerProps, "open" | "onClose" | "onAbout"> {
  const drawerState = useAtomValue(appMenuStateAtom);
  const toggleDrawer = useSetAtom(toggleAppMenuState);
  const openAbout = useSetAtom(aboutModalOpenAtom);

  return {
    open: drawerState,
    onClose: () => drawerState && toggleDrawer(),
    onAbout: () => openAbout(true),
  };
}
