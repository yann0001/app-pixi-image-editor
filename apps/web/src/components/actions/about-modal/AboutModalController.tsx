import type { ReactElement } from "react";
import { useAtom } from "jotai";
import { AboutModal } from "./AboutModal";
import { aboutModalOpenAtom } from "./AboutModalAtoms";

export function AboutModalController(): ReactElement {
  const [isOpen, setIsOpen] = useAtom(aboutModalOpenAtom);
  return <AboutModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
