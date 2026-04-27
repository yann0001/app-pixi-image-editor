import { useEffect } from "react";
import { useAtom } from "jotai";
import { themeModeAtom } from "./atoms/ThemeAtoms";
import type { ThemeSwitchProps } from "./ThemeSwitch";

export function useThemeSwitcher(): ThemeSwitchProps {
  const [themeMode, toggleTheme] = useAtom(themeModeAtom);

  useEffect(() => {
    const html = document.documentElement;
    if (themeMode === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
      html.setAttribute("data-theme", "dark");
    } else {
      html.classList.remove("dark");
      html.classList.add("light");
      html.setAttribute("data-theme", "light");
    }
  }, [themeMode]);

  function setTheme(): void {
    toggleTheme();
  }

  return {
    mode: themeMode,
    onSwitch: setTheme,
  };
}
