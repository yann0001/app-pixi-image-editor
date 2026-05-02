import type { ReactElement } from "react";
import { FullscreenLayout } from "@package/ui";

export function LoadingView(): ReactElement {
  return (
    <FullscreenLayout container>
      <div className="flex h-full w-full items-center justify-center">
        <span className="loading loading-ring loading-lg" />
      </div>
    </FullscreenLayout>
  );
}
