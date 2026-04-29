import { useRef, type ReactElement } from "react";
import { FolderPlusIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { useClickOutside } from "@package/react";
import { useIntl } from "react-intl";
import type { ThemeSwitchProps } from "../../theme/ThemeSwitch";
import { ThemeSwitch } from "../../theme/ThemeSwitch";
import LogoImageSrc from "~/assets/images/logo/Logo320.png";

export interface AppDrawerProps {
  open: boolean;
  themeSwitchProps: ThemeSwitchProps;
  onClose: () => void;
  onNewImage: () => void;
  onSaveImage: () => void;
}

export function AppDrawer({ open, themeSwitchProps, onClose, onNewImage, onSaveImage }: AppDrawerProps): ReactElement {
  const intl = useIntl();
  const menuRef = useRef<HTMLUListElement>(null);
  useClickOutside(menuRef, onClose);

  return (
    <div className="drawer z-30">
      <input
        id="app-drawer"
        readOnly
        type="checkbox"
        checked={open}
        className="drawer-toggle"
        aria-label={intl.formatMessage({
          description: "AppDrawer - drawer toggle label",
          defaultMessage: "Application menu",
          id: "9myrmB",
        })}
      />
      <div className="drawer-side">
        <label htmlFor="app-drawer" aria-label="close sidebar" className="drawer-overlay" />
        <ul
          ref={menuRef}
          className="menu bg-base-100 text-base-content min-h-full w-60 p-4 text-base shadow-xl md:w-80"
        >
          <li className="flex items-center p-0">
            <img className="h-10 w-10" src={LogoImageSrc} alt="Pixi Image Editor Logo" />
            <span className="flex flex-1 p-4 text-xl font-bold">
              {intl.formatMessage({
                description: "AppDrawer - app name",
                defaultMessage: "Pixi Image Editor",
                id: "DrZMkW",
              })}
            </span>
          </li>
          <li className="mt-4" data-testid="editor__drawer-new-image" onClick={onNewImage}>
            <a>
              <FolderPlusIcon className="h-6 w-6" />
              {intl.formatMessage({
                description: "AppDrawer - new image menu item",
                defaultMessage: "New Image",
                id: "UNiGdv",
              })}
            </a>
          </li>
          <li className="mt-4" onClick={onSaveImage}>
            <a>
              <ArrowDownTrayIcon className="h-6 w-6" />
              {intl.formatMessage({
                description: "AppDrawer - save image menu item",
                defaultMessage: "Save Image",
                id: "joP9M/",
              })}
            </a>
          </li>
          <li className="m-0 flex flex-1 p-0" />
          <li className="flex flex-row items-center justify-end p-0">
            <ThemeSwitch {...themeSwitchProps} />
          </li>
        </ul>
      </div>
    </div>
  );
}
