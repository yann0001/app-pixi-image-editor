import { useAtomValue, useSetAtom } from "jotai";
import { toggleFilterMenuState } from "../atoms/menu/FilterMenuAtoms";
import { rotationControlAtom } from "../atoms/transform/RotationAtoms";
import { scaleControlAtom } from "../atoms/transform/ScaleAtoms";
import { lockAtom, lockControlAtom } from "../atoms/viewport/LockAtoms";

type RotationValue = "rotate-left" | "rotate-right" | "reset" | number;
type ScaleValue = "flip-horizontal" | "flip-vertical" | "reset";

export function useToolbarTools(): {
  lock: boolean;
  toggleFilterMenu: () => void;
  swapLock: () => void;
  rotate: (value: RotationValue) => void;
  flip: (value: ScaleValue) => void;
} {
  const toggleFilterMenu = useSetAtom(toggleFilterMenuState);
  const lock = useAtomValue(lockAtom);
  const lockControl = useSetAtom(lockControlAtom);
  const scaleControl = useSetAtom(scaleControlAtom);
  const rotationControl = useSetAtom(rotationControlAtom);

  function swapLock(): void {
    lockControl();
  }

  function rotate(val: RotationValue): void {
    rotationControl(val);
  }

  function flip(val: ScaleValue): void {
    scaleControl(val);
  }

  return {
    toggleFilterMenu,
    lock,
    swapLock,
    rotate,
    flip,
  };
}
