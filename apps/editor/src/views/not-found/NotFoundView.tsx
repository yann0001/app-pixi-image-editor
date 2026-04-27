import type { ReactElement } from "react";
import { BasicLayout } from "~/components/layout/BasicLayout";

export interface NotFoundViewProps {
  onBack(): void;
}

export function NotFoundView({ onBack }: NotFoundViewProps): ReactElement {
  return (
    <BasicLayout container>
      <div className="flex flex-col items-center gap-4">
        <article className="prose lg:prose-xl max-w-64 p-4 text-pretty lg:max-w-full">
          <strong>{"Could not find the page you were looking for! 🕵️"}</strong>
        </article>
        <button className="btn btn-primary mt-4 w-48" onClick={onBack}>
          Start over 🦖
        </button>
      </div>
    </BasicLayout>
  );
}
