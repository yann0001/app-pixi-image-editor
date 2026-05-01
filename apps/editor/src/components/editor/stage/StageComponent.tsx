import { useState, type ReactElement } from "react";
import { Application } from "@pixi/react";
import { PixiScene } from "./PixiScene";

export function StageComponent(): ReactElement {
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);

  return (
    <div ref={setContainerEl} className="border-base-100 flex-1 overflow-hidden rounded-lg border-4">
      {containerEl && (
        <Application resizeTo={containerEl} background={0xffffff} backgroundAlpha={0}>
          <PixiScene />
        </Application>
      )}
    </div>
  );
}
