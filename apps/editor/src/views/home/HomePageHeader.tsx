import type { ReactElement } from "react";
import LogoImageSrc from "~/assets/images/logo/Logo320.png";
import { GithubIcon } from "~/components/icons/social/GithubIcon";
import { LinkedInIcon } from "~/components/icons/social/LinkedInIcon";
import type { ThemeSwitchProps } from "~/components/actions/theme-switch/ThemeSwitch";
import { ThemeSwitch } from "~/components/actions/theme-switch/ThemeSwitch";

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
    <div className="mt-2 flex h-20 w-full items-center justify-center px-4 lg:mt-8 lg:px-0">
      <div className="flex flex-1">
        <div className="hover-3d">
          {/* content */}
          <figure className="max-w-100 rounded-2xl">
            <img className="h-20 w-20 lg:h-16 lg:w-16" src={LogoImageSrc} alt="Pixi Image Editor Logo" />
          </figure>
          {/* 8 empty divs needed for the 3D effect */}
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="flex h-8 flex-row items-center">
        <div className="z-20">
          <ThemeSwitch {...themeSwitchProps} />
        </div>
        <div className="divider divider-horizontal w-0" />
        <div className="flex gap-2">
          <button
            className="btn btn-square btn-ghost fill-neutral dark:fill-neutral-content p-2"
            onClick={onGithubClick}
          >
            <GithubIcon />
          </button>
          <button
            className="btn btn-square btn-ghost fill-neutral dark:fill-neutral-content p-2"
            onClick={onLinkedInClick}
          >
            <LinkedInIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
