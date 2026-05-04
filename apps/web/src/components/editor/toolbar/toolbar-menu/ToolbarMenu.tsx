import { type ReactElement } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useIntl } from "react-intl";

export interface ToolbarMenuProps {
  onToggle: () => void;
}

export function ToolbarMenu({ onToggle }: ToolbarMenuProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="glass rounded-box bg-base-100/70 flex h-10 min-h-0 items-center px-1 shadow-xl md:h-12">
      <button
        className="btn btn-square btn-ghost btn-sm md:btn-md"
        data-testid="editor__menu-button"
        onClick={onToggle}
        aria-label={intl.formatMessage({
          description: "ToolbarMenu - open menu button label",
          defaultMessage: "Open menu",
          id: "jAA1n5",
        })}
      >
        <Bars3Icon className="h-5 w-5 md:h-6 md:w-6" />
      </button>
    </div>
  );
}
