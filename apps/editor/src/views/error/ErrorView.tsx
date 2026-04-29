import type { ReactElement } from "react";
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
      <div className="flex flex-col gap-4">
        <article className="prose lg:prose-xl">
          <h3 className="text-center">
            {intl.formatMessage({
              description: "ErrorView - heading",
              defaultMessage: "Ops! 😅",
              id: "fag/z4",
            })}
          </h3>
          <strong>
            {message ??
              intl.formatMessage({
                description: "ErrorView - default error message",
                defaultMessage: "Something went wrong! 😱",
                id: "XGeAqB",
              })}
          </strong>
        </article>
        <button className="btn btn-primary mt-4" onClick={onBack}>
          {intl.formatMessage({
            description: "ErrorView - start over button",
            defaultMessage: "Start over 🦖",
            id: "m3d5ze",
          })}
        </button>
      </div>
    </FullscreenLayout>
  );
}
