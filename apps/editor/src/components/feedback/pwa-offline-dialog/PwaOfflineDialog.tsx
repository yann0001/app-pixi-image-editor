import type { ReactElement } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useIntl } from "react-intl";

export interface PwaOfflineDialogProps {
  open: boolean;
  onClose(): void;
}

export function PwaOfflineDialog({ open, onClose }: PwaOfflineDialogProps): ReactElement {
  const intl = useIntl();

  return (
    <>
      {open && (
        <div className="toast z-50">
          <div className="alert alert-info shadow-lg">
            <span>
              {intl.formatMessage({
                description: "PwaOfflineDialog - ready to work offline message",
                defaultMessage: "Ready to work offline",
                id: "PwaOfflineDialog.ready",
              })}
            </span>
            <button
              className="btn btn-square btn-ghost btn-sm"
              onClick={onClose}
              aria-label={intl.formatMessage({
                description: "PwaOfflineDialog - close button label",
                defaultMessage: "Close notification",
                id: "PwaOfflineDialog.close",
              })}
            >
              <XMarkIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
