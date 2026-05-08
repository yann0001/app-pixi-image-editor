import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import LogoImageSrc from "@package/ui/Branding/assets/template-512x512.svg";
import { useIntl } from "react-intl";

export interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps): ReactElement {
  const intl = useIntl();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  const version = import.meta.env.VITE_APP_VERSION as string | undefined;

  return (
    <dialog
      ref={dialogRef}
      className="modal backdrop:backdrop-blur-sm"
      aria-label={intl.formatMessage({
        description: "AboutModal - dialog aria-label",
        defaultMessage: "About",
        id: "fI+STE",
      })}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className="modal-box relative max-w-sm">
        <button
          className="btn btn-ghost btn-circle btn-sm absolute top-2 right-2"
          onClick={onClose}
          aria-label={intl.formatMessage({
            description: "AboutModal - close button label",
            defaultMessage: "Close",
            id: "rbrahO",
          })}
        >
          <XMarkIcon className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center gap-4 px-2 py-6 text-center">
          <img src={LogoImageSrc} alt="" aria-hidden="true" className="h-16 w-16" />

          <div className="flex flex-col items-center gap-2">
            <h2 className="from-primary to-secondary bg-linear-to-r bg-clip-text text-xl font-bold text-transparent">
              {intl.formatMessage({
                description: "AboutModal - app name heading",
                defaultMessage: "Pixi Image Editor",
                id: "SXjMH5",
              })}
            </h2>
            {version && (
              <span className="badge badge-soft badge-primary text-xs" data-testid="about-modal__version">
                {intl.formatMessage(
                  {
                    description: "AboutModal - version badge",
                    defaultMessage: "Version {version}",
                    id: "f8CBGO",
                  },
                  { version }
                )}
              </span>
            )}
          </div>

          <p className="text-base-content/60 max-w-xs text-sm">
            {intl.formatMessage({
              description: "AboutModal - app description",
              defaultMessage: "A browser-based image editor built with PixiJS and React.",
              id: "dMBf3e",
            })}
          </p>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
