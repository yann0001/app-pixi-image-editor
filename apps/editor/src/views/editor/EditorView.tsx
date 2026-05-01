import type { ComponentProps, ReactElement } from "react";
import { FullscreenLayout } from "@package/ui";
import { ImageEditor } from "~/components/library/editor/Editor";
import { ErrorView } from "~/views/error/ErrorView";
import { LoadingView } from "~/views/loading/LoadingView";

export interface EditorViewProps extends Omit<
  ComponentProps<typeof ImageEditor>,
  "LoaderComponent" | "ErrorComponent"
> {
  onBack?: () => void;
}

export function EditorView({ onBack, ...props }: EditorViewProps): ReactElement {
  function handleBack(): void {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  }

  return (
    <FullscreenLayout>
      <ImageEditor
        {...props}
        LoaderComponent={() => <LoadingView />}
        ErrorComponent={() => <ErrorView onBack={handleBack} />}
      />
    </FullscreenLayout>
  );
}
