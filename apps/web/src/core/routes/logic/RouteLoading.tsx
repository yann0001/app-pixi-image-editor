import type { ReactElement } from "react";

export function RouteLoading(): ReactElement {
  return (
    <div className="flex min-h-screen items-center justify-center" role="status" aria-label="Loading">
      <span className="loading loading-ring loading-lg" />
    </div>
  );
}
