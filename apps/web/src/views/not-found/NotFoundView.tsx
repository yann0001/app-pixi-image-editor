import type { ReactElement } from "react";
import { FullscreenLayout } from "@package/ui";
import { useIntl } from "react-intl";

export interface NotFoundViewProps {
  onBack(): void;
}

export function NotFoundView({ onBack }: NotFoundViewProps): ReactElement {
  const intl = useIntl();

  return (
    <FullscreenLayout container>
      <div className="hero flex-1">
        <div className="hero-content flex-col gap-6 text-center">
          <p className="from-primary to-secondary bg-linear-to-r bg-clip-text text-8xl font-black text-transparent md:text-9xl">
            404
          </p>
          <div className="max-w-md">
            <p className="text-base-content/60 text-base md:text-lg">
              {intl.formatMessage({
                description: "NotFoundView - not found message",
                defaultMessage: "Could not find the page you were looking for! 🕵️",
                id: "13DDXA",
              })}
            </p>
          </div>
          <button className="btn btn-primary btn-wide" onClick={onBack}>
            {intl.formatMessage({
              description: "NotFoundView - start over button",
              defaultMessage: "Start over",
              id: "ui3yQz",
            })}
          </button>
        </div>
      </div>
    </FullscreenLayout>
  );
}
