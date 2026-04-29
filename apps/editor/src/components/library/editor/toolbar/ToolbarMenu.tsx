import { type ReactElement } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useIntl } from "react-intl";

export interface ToolbarMenuProps {
  onToggle: () => void;
}

export function ToolbarMenu({ onToggle }: ToolbarMenuProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="absolute z-20 flex justify-center p-4 max-md:top-4 max-md:left-0 md:top-0 md:left-0">
      <div className="glass navbar rounded-box bg-base-300 bg-opacity-80 dark:bg-opacity-80 flex h-10 min-h-0 shadow-xl md:h-12 dark:bg-none">
        <button
          className="btn btn-square btn-ghost btn-sm"
          data-testid="editor__menu-button"
          onClick={onToggle}
          aria-label={intl.formatMessage({
            description: "ToolbarMenu - open menu button label",
            defaultMessage: "Open menu",
            id: "toolbarMenu.openMenu",
          })}
        >
          <Bars3Icon className="h-4 w-4 md:h-6 md:w-6" />
        </button>
      </div>
    </div>
  );
}
