import type { ReactElement } from "react";
import { FullscreenLayout } from "@package/ui";

export interface ErrorViewProps {
  message?: string;
  onBack(): void;
}

export function ErrorView({ message, onBack }: ErrorViewProps): ReactElement {
  return (
    <FullscreenLayout>
      <div className="flex flex-col gap-4">
        <article className="prose lg:prose-xl">
          <h3 className="text-center">Ops! 😅 </h3>
          <strong>{message ?? "Something went wrong! 😱"}</strong>
        </article>
        <button className="btn btn-primary mt-4" onClick={onBack}>
          Start over 🦖
        </button>
      </div>
    </FullscreenLayout>
  );
}
