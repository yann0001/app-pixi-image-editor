import type { ReactElement } from "react";
import type { ThemeSwitchProps } from "~/components/actions/theme-switch/ThemeSwitch";
import { ThemeSwitch } from "~/components/actions/theme-switch/ThemeSwitch";
import { GithubIcon } from "~/components/icons/social/GithubIcon";
import { LinkedInIcon } from "~/components/icons/social/LinkedInIcon";

export interface HomePageHeaderProps {
  themeSwitchProps: ThemeSwitchProps;
  onGithubClick?: () => void;
  onLinkedInClick?: () => void;
}

export function HomePageHeader({
  themeSwitchProps,
  onGithubClick,
  onLinkedInClick,
}: HomePageHeaderProps): ReactElement {
  return (
    <div className="navbar bg-base-100/60 supports-backdrop-filter:bg-base-100/40 sticky top-0 z-10 px-4 backdrop-blur-md lg:px-8">
      <div className="navbar-start" />
      <div className="navbar-end gap-1">
        <ThemeSwitch {...themeSwitchProps} />
        <div className="divider divider-horizontal w-0" />
        <button className="btn btn-square btn-ghost fill-base-content p-2" onClick={onGithubClick} aria-label="GitHub">
          <GithubIcon />
        </button>
        <button
          className="btn btn-square btn-ghost fill-base-content p-2"
          onClick={onLinkedInClick}
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </button>
      </div>
    </div>
  );
}
