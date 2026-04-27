import type { ComponentProps, ReactElement } from "react";
import { BasicLayout } from "~/components/layout/BasicLayout";
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
    onBack ? onBack() : window.history.back();
  }

  return (
    <BasicLayout>
      <ImageEditor
        {...props}
        LoaderComponent={() => <LoadingView />}
        ErrorComponent={() => <ErrorView onBack={handleBack} />}
      />
    </BasicLayout>
  );
}
