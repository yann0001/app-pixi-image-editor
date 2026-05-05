import type { ReactElement } from "react";
import type { ThemeSwitchProps } from "~/components/actions/theme-switch/ThemeSwitch";
import { ThemeSwitch } from "~/components/actions/theme-switch/ThemeSwitch";

export interface HomePageHeaderProps {
  themeSwitchProps: ThemeSwitchProps;
}

export function HomePageHeader({ themeSwitchProps }: HomePageHeaderProps): ReactElement {
  return (
    <div className="navbar bg-base-100/60 supports-[backdrop-filter]:bg-base-100/40 sticky top-0 z-10 px-4 backdrop-blur-md lg:px-8">
      <div className="navbar-end w-full">
        <ThemeSwitch {...themeSwitchProps} />
      </div>
    </div>
  );
}
