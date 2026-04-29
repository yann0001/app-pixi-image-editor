import type { ReactElement } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useEditorRoute } from "./-UseEditorRoute";
import { EditorView } from "~/views/editor/EditorView";
import { ErrorView } from "~/views/error/ErrorView";

export const Route = createFileRoute("/editor")({
  component: EditorRoute,
});

function EditorRoute(): ReactElement {
  const { fileUrl, appDrawerProps, errorViewProps } = useEditorRoute();

  if (!fileUrl) {
    return <ErrorView {...errorViewProps} message="File somehow went missing 🤔" />;
  }

  return <EditorView url={fileUrl} appdrawerProps={appDrawerProps} />;
}
