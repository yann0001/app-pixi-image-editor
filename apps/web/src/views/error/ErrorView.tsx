import type { ReactElement } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { FullscreenLayout } from "@package/ui";
import { useIntl } from "react-intl";

export interface ErrorViewProps {
  message?: string;
  onBack(): void;
}

export function ErrorView({ message, onBack }: ErrorViewProps): ReactElement {
  const intl = useIntl();

  return (
    <FullscreenLayout>
      <div className="hero flex-1">
        <div className="hero-content flex-col gap-6 text-center">
          <ExclamationTriangleIcon className="text-error h-20 w-20 opacity-80 md:h-28 md:w-28" />
          <div className="max-w-md">
            <h1 className="text-3xl font-bold md:text-4xl">
              {intl.formatMessage({
                description: "ErrorView - heading",
                defaultMessage: "Ops! 😅",
                id: "fag/z4",
              })}
            </h1>
            <p className="text-base-content/60 mt-3 text-base md:text-lg">
              {message ??
                intl.formatMessage({
                  description: "ErrorView - default error message",
                  defaultMessage: "Something went wrong!",
                  id: "dQIA9Q",
                })}
            </p>
          </div>
          <button className="btn btn-primary btn-wide" onClick={onBack}>
            {intl.formatMessage({
              description: "ErrorView - start over button",
              defaultMessage: "Start over",
              id: "aK9Dd0",
            })}
          </button>
        </div>
      </div>
    </FullscreenLayout>
  );
}
