import { useMemo } from "react";
import { ArrowDownTrayIcon, DocumentPlusIcon, MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "@tanstack/react-router";
import { useAtomValue, useSetAtom } from "jotai";
import { useIntl } from "react-intl";
import type { Command } from "./Command";
import type { CommandPaletteProps } from "./CommandPalette";
import { useCommandPalette } from "./UseCommandPalette";
import { useCommandPaletteShortcut } from "./UseCommandPaletteShortcut";
import { useCommandShortcuts } from "./UseCommandShortcuts";
import { viewportAtom } from "~/components/editor/atoms/viewport/ViewportAtoms";
import { createImage } from "~/core/image/CreateImage";
import { themeLocalStorageAtom } from "~/core/theme/ThemeAtoms";

export function useCommandPaletteController(): CommandPaletteProps {
  const intl = useIntl();
  const navigate = useNavigate();
  const setThemeMode = useSetAtom(themeLocalStorageAtom);
  const { isOpen, close } = useCommandPalette();
  const viewport = useAtomValue(viewportAtom);

  const fileGroup = intl.formatMessage({
    description: "CommandPaletteController: label - file group",
    defaultMessage: "File",
    id: "file-group",
  });
  const appearanceGroup = intl.formatMessage({
    description: "CommandPaletteController: label - appearance group",
    defaultMessage: "Appearance",
    id: "vWoN3+",
  });

  const commands = useMemo<Command[]>(() => {
    return [
      {
        id: "new-image",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - new image command",
          defaultMessage: "New Image",
          id: "new-image-cmd",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteController: caption - new image command",
          defaultMessage: "Open a new image in the editor",
          id: "new-image-desc",
        }),
        group: fileGroup,
        keywords: ["new", "open", "create"],
        icon: <DocumentPlusIcon className="h-4 w-4" />,
        shortcut: { mod: true, key: "n" },
        perform: () => {
          void navigate({ to: "/" });
        },
      },
      {
        id: "save-image",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - save image command",
          defaultMessage: "Save Image",
          id: "save-image-cmd",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteController: caption - save image command",
          defaultMessage: "Download the current image as PNG",
          id: "save-image-desc",
        }),
        group: fileGroup,
        keywords: ["save", "download", "export"],
        icon: <ArrowDownTrayIcon className="h-4 w-4" />,
        shortcut: { mod: true, key: "s" },
        perform: () => {
          if (!viewport) return;
          void createImage(viewport).then((imagesrc) => {
            const el = document.createElement("a");
            el.href = imagesrc.src;
            el.download = "image.png";
            el.click();
            el.remove();
          });
        },
      },
      {
        id: "theme-light",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - theme light command",
          defaultMessage: "Theme: Light",
          id: "MibXHq",
        }),
        group: appearanceGroup,
        keywords: ["light", "theme"],
        icon: <SunIcon className="h-4 w-4" />,
        shortcut: { mod: true, shift: true, key: "l" },
        perform: () => setThemeMode("light"),
      },
      {
        id: "theme-dark",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - theme dark command",
          defaultMessage: "Theme: Dark",
          id: "5ywSOX",
        }),
        group: appearanceGroup,
        keywords: ["dark", "theme"],
        icon: <MoonIcon className="h-4 w-4" />,
        shortcut: { mod: true, shift: true, key: "k" },
        perform: () => setThemeMode("dark"),
      },
    ];
  }, [intl, navigate, setThemeMode, viewport, fileGroup, appearanceGroup]);

  useCommandPaletteShortcut();
  useCommandShortcuts(commands);

  return { isOpen, commands, onClose: close };
}
