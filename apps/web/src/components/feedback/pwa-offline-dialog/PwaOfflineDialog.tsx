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
          <div className="alert shadow-lg">
            <span>
              {intl.formatMessage({
                description: "PwaOfflineDialog - ready to work offline message",
                defaultMessage: "Ready to work offline",
                id: "LqVGkH",
              })}
            </span>
            <button
              className="btn btn-circle btn-sm"
              onClick={onClose}
              aria-label={intl.formatMessage({
                description: "PwaOfflineDialog - close button label",
                defaultMessage: "Close notification",
                id: "la8uS2",
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
