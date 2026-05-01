import { useNavigate } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { useThemeSwitcher } from "~/components/actions/theme-switch/UseThemeSwitcher";
import { viewportAtom } from "~/components/editor/atoms/viewport/ViewportAtoms";
import type { AppDrawerProps } from "~/components/editor/drawer/app-drawer/AppDrawer";
import { getDownloadUrlAtom } from "~/core/DroppedFileAtoms";
import { createImage } from "~/core/image/CreateImage";
import type { ErrorViewProps } from "~/views/error/ErrorView";

export function useEditorRoute(): {
  fileUrl: string | null;
  appDrawerProps: Omit<AppDrawerProps, "open" | "onClose">;
  errorViewProps: ErrorViewProps;
} {
  const navigate = useNavigate();
  const fileUrl = useAtomValue(getDownloadUrlAtom);
  const themeSwitchProps = useThemeSwitcher();
  const viewport = useAtomValue(viewportAtom);

  function handleOnNewImage(): void {
    navigate({ to: "/" });
  }

  async function handleOnSaveImage(): Promise<void> {
    if (!viewport) {
      console.error("Viewport is not available");
      return;
    }

    const imagesrc = await createImage(viewport);
    const createEl = document.createElement("a");

    createEl.href = imagesrc.src;
    createEl.download = "image.png";
    createEl.click();
    createEl.remove();
  }

  return {
    fileUrl,
    appDrawerProps: {
      onNewImage: handleOnNewImage,
      onSaveImage: handleOnSaveImage,
      themeSwitchProps,
    },
    errorViewProps: {
      onBack: () => navigate({ to: "/" }),
    },
  };
}
