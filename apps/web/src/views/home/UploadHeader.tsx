import { useState } from "react";
import type { ReactElement } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useIntl } from "react-intl";
import { AboutModal } from "~/components/actions/about-modal/AboutModal";
import type { ThemeSwitchProps } from "~/components/actions/theme-switch/ThemeSwitch";
import { ThemeSwitch } from "~/components/actions/theme-switch/ThemeSwitch";

export interface UploadHeaderProps {
  themeSwitchProps: ThemeSwitchProps;
}

export function UploadHeader({ themeSwitchProps }: UploadHeaderProps): ReactElement {
  const intl = useIntl();
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <div className="navbar bg-base-100/60 supports-backdrop-filter:bg-base-100/40 sticky top-0 z-10 px-4 backdrop-blur-md lg:px-8">
        <div className="navbar-end flex w-full items-center gap-2">
          <button
            className="btn btn-ghost btn-circle btn-sm"
            onClick={() => setIsAboutOpen(true)}
            aria-label={intl.formatMessage({
              description: "UploadHeader - about button aria-label",
              defaultMessage: "About",
              id: "UlBRMm",
            })}
          >
            <InformationCircleIcon className="h-5 w-5" />
          </button>
          <ThemeSwitch {...themeSwitchProps} />
        </div>
      </div>
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  );
}
