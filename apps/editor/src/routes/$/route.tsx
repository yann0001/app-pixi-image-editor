import type { ReactElement } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FullscreenLayout } from "@package/ui";

export const Route = createFileRoute("/$")({
  component: NotFoundRoute,
});

function NotFoundRoute(): ReactElement {
  const navigate = useNavigate();

  function handleBack(): void {
    navigate({ to: "/" });
  }

  return (
    <FullscreenLayout container>
      <div className="flex flex-col items-center gap-4">
        <article className="prose lg:prose-xl max-w-64 p-4 text-pretty lg:max-w-full">
          <strong>{"Could not find the page you were looking for! 🕵️"}</strong>
        </article>
        <button className="btn btn-primary mt-4 w-48" onClick={handleBack}>
          Start over 🦖
        </button>
      </div>
    </FullscreenLayout>
  );
}
