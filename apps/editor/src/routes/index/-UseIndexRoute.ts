import { useNavigate } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { useThemeSwitcher } from "~/components/library/theme/UseThemeSwitcher";
import { droppedFileAtom } from "~/core/DroppedFileAtoms";
import type { HomeViewProps } from "~/views/home/HomeView";

export function useIndexRoute(): HomeViewProps {
  const navigate = useNavigate();
  const setDroppedFile = useSetAtom(droppedFileAtom);
  const themeSwitchProps = useThemeSwitcher();

  function handleOnDrop(acceptedFiles: File[]): void {
    if (acceptedFiles.length > 1 || acceptedFiles.length === 0) {
      console.error("Can only handle one file at a time");
      return;
    }

    const file = acceptedFiles[0];
    if (!file) {
      console.error("No file found");
      return;
    }

    setDroppedFile(file);
    navigate({ to: "/editor" });
  }

  return {
    socialLinkProps: {
      onGithubClick: () =>
        window.open("https://github.com/Pettor/app-pixi-image-editor", "_blank", "noopener noreferrer"),
      onLinkedInClick: () =>
        window.open("https://www.linkedin.com/in/petter-hancock/", "_blank", "noopener noreferrer"),
    },
    onDrop: handleOnDrop,
    themeSwitchProps,
  };
}
