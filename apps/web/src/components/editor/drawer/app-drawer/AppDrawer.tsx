import { type ReactElement } from "react";
import { ArrowDownTrayIcon, FolderPlusIcon } from "@heroicons/react/24/solid";
import { useIntl } from "react-intl";
import LogoImageSrc from "~/assets/images/logo/Logo320.png";
import type { ThemeSwitchProps } from "~/components/actions/theme-switch/ThemeSwitch";
import { ThemeSwitch } from "~/components/actions/theme-switch/ThemeSwitch";

export interface AppDrawerProps {
  open: boolean;
  themeSwitchProps: ThemeSwitchProps;
  onClose: () => void;
  onNewImage: () => void;
  onSaveImage: () => void;
}

export function AppDrawer({ open, themeSwitchProps, onClose, onNewImage, onSaveImage }: AppDrawerProps): ReactElement {
  const intl = useIntl();

  function handleNewImage(): void {
    onNewImage();
    onClose();
  }

  function handleSaveImage(): void {
    onSaveImage();
    onClose();
  }

  return (
    <div className="drawer z-30">
      <input
        id="app-drawer"
        type="checkbox"
        checked={open}
        onChange={() => {}}
        className="drawer-toggle"
        aria-label={intl.formatMessage({
          description: "AppDrawer - drawer toggle label",
          defaultMessage: "Application menu",
          id: "9myrmB",
        })}
      />
      <div className="drawer-content" />
      <div className="drawer-side">
        <label htmlFor="app-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={onClose} />
        <div className="bg-base-100 text-base-content flex min-h-full w-60 flex-col p-4 shadow-xl md:w-80">
          <div className="flex items-center gap-2 px-2 py-3">
            <img className="h-10 w-10" src={LogoImageSrc} alt="Pixi Image Editor Logo" />
            <span className="text-xl font-bold">
              {intl.formatMessage({
                description: "AppDrawer - app name",
                defaultMessage: "Pixi Image Editor",
                id: "DrZMkW",
              })}
            </span>
          </div>
          <div className="divider my-1" />
          <nav className="flex flex-col gap-1">
            <button
              className="btn btn-ghost justify-start gap-3"
              data-testid="editor__drawer-new-image"
              onClick={handleNewImage}
            >
              <FolderPlusIcon className="h-5 w-5" />
              {intl.formatMessage({
                description: "AppDrawer - new image menu item",
                defaultMessage: "New Image",
                id: "UNiGdv",
              })}
            </button>
            <button className="btn btn-ghost justify-start gap-3" onClick={handleSaveImage}>
              <ArrowDownTrayIcon className="h-5 w-5" />
              {intl.formatMessage({
                description: "AppDrawer - save image menu item",
                defaultMessage: "Save Image",
                id: "joP9M/",
              })}
            </button>
          </nav>
          <div className="flex-1" />
          <div className="flex justify-end">
            <ThemeSwitch {...themeSwitchProps} />
          </div>
        </div>
      </div>
    </div>
  );
}
