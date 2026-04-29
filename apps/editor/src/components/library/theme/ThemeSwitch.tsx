import type { ReactElement } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import type { ThemeMode } from "./ThemeSwitcherClasses";

export interface ThemeSwitchProps {
  mode: ThemeMode;
  onSwitch: () => void;
}

export function ThemeSwitch({ mode, onSwitch }: ThemeSwitchProps): ReactElement {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <SunIcon className="text-base-content h-4 w-4" />
      <input type="checkbox" checked={mode === "dark"} onChange={onSwitch} className="toggle" />
      <MoonIcon className="text-base-content h-4 w-4" />
    </label>
  );
}
