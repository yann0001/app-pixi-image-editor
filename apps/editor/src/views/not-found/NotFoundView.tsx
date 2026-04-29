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
      <div className="flex flex-col items-center gap-4">
        <article className="prose lg:prose-xl max-w-64 p-4 text-pretty lg:max-w-full">
          <strong>
            {intl.formatMessage({
              description: "NotFoundView - not found message",
              defaultMessage: "Could not find the page you were looking for! 🕵️",
              id: "13DDXA",
            })}
          </strong>
        </article>
        <button className="btn btn-primary mt-4 w-48" onClick={onBack}>
          {intl.formatMessage({
            description: "NotFoundView - start over button",
            defaultMessage: "Start over 🦖",
            id: "QINl5/",
          })}
        </button>
      </div>
    </FullscreenLayout>
  );
}
