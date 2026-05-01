import type { ReactElement } from "react";
import type { SocialLinkProps } from "@package/ui";
import { FullscreenLayout } from "@package/ui";
import { useIntl } from "react-intl";
import { HomePageHeader } from "./HomePageHeader";
import { Dropzone } from "~/components/library/dropzone/Dropzone";
import type { ThemeSwitchProps } from "~/components/library/theme/ThemeSwitch";

export interface HomeViewProps {
  themeSwitchProps: ThemeSwitchProps;
  socialLinkProps: SocialLinkProps;
  onDrop: (acceptedFiles: File[]) => void;
}

export function HomeView({ themeSwitchProps, socialLinkProps = {}, onDrop }: HomeViewProps): ReactElement {
  const intl = useIntl();
  const { onGithubClick, onLinkedInClick } = socialLinkProps;

  return (
    <FullscreenLayout container footer {...socialLinkProps}>
      <HomePageHeader
        themeSwitchProps={themeSwitchProps}
        onGithubClick={onGithubClick}
        onLinkedInClick={onLinkedInClick}
      />
      <div className="flex flex-1">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <div className="flex flex-1 flex-row items-center justify-center">
              <h1 className="from-primary to-secondary inline-block bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:p-2 lg:text-7xl">
                {intl.formatMessage({
                  description: "HomeView - main heading",
                  defaultMessage: "Pixi Image Editor",
                  id: "Dastjz",
                })}
              </h1>
            </div>
            <p className="py-4 text-lg lg:py-6 lg:text-xl">
              {intl.formatMessage(
                {
                  description: "HomeView - subtitle description",
                  defaultMessage:
                    "This is a image editor built using <b>PixiJS</b> and React. You can upload an image to get started.",
                  id: "4NvSlM",
                },
                {
                  b: (chunks) => <b className="text-secondary">{chunks}</b>,
                }
              )}
            </p>
            <div className="flex h-full w-full items-center justify-center">
              <Dropzone onDrop={onDrop} />
            </div>
          </div>
        </div>
      </div>
    </FullscreenLayout>
  );
}
