import { useMemo } from "react";
import {
  ArrowDownTrayIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  ArrowsPointingOutIcon,
  ArrowsRightLeftIcon,
  ArrowsUpDownIcon,
  DocumentPlusIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "@tanstack/react-router";
import { useAtomValue, useSetAtom } from "jotai";
import { useIntl } from "react-intl";
import type { Command } from "./Command";
import type { CommandPaletteProps } from "./CommandPalette";
import { useCommandPalette } from "./UseCommandPalette";
import { useCommandPaletteShortcut } from "./UseCommandPaletteShortcut";
import { useCommandShortcuts } from "./UseCommandShortcuts";
import { rotationControlAtom } from "~/components/editor/atoms/transform/RotationAtoms";
import { scaleControlAtom } from "~/components/editor/atoms/transform/ScaleAtoms";
import { fitScreenAtom } from "~/components/editor/atoms/viewport/FitScreenAtoms";
import { lockControlAtom } from "~/components/editor/atoms/viewport/LockAtoms";
import { viewportAtom } from "~/components/editor/atoms/viewport/ViewportAtoms";
import { zoomControlAtom } from "~/components/editor/atoms/viewport/ZoomAtoms";
import { createImage } from "~/core/image/CreateImage";
import { themeLocalStorageAtom } from "~/core/theme/ThemeAtoms";

export function useCommandPaletteController(): CommandPaletteProps {
  const intl = useIntl();
  const navigate = useNavigate();
  const setThemeMode = useSetAtom(themeLocalStorageAtom);
  const zoomControl = useSetAtom(zoomControlAtom);
  const fitScreen = useSetAtom(fitScreenAtom);
  const rotationControl = useSetAtom(rotationControlAtom);
  const scaleControl = useSetAtom(scaleControlAtom);
  const toggleLock = useSetAtom(lockControlAtom);
  const { isOpen, close } = useCommandPalette();
  const viewport = useAtomValue(viewportAtom);

  const fileGroup = intl.formatMessage({
    description: "CommandPaletteController: label - file group",
    defaultMessage: "File",
    id: "g2BfXO",
  });
  const viewGroup = intl.formatMessage({
    description: "CommandPaletteController: label - view group",
    defaultMessage: "View",
    id: "zIo0cK",
  });
  const transformGroup = intl.formatMessage({
    description: "CommandPaletteController: label - transform group",
    defaultMessage: "Transform",
    id: "hPR+Fi",
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
          id: "twOz5i",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteController: caption - new image command",
          defaultMessage: "Open a new image in the editor",
          id: "NxGJPx",
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
          id: "/sMkPM",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteController: caption - save image command",
          defaultMessage: "Download the current image as PNG",
          id: "jOo7vI",
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
        id: "zoom-in",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - zoom in command",
          defaultMessage: "Zoom In",
          id: "JV6l/U",
        }),
        group: viewGroup,
        keywords: ["zoom", "in", "bigger", "enlarge"],
        icon: <MagnifyingGlassPlusIcon className="h-4 w-4" />,
        shortcut: { mod: true, key: "=" },
        perform: () => zoomControl("increase"),
      },
      {
        id: "zoom-out",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - zoom out command",
          defaultMessage: "Zoom Out",
          id: "ENU/kw",
        }),
        group: viewGroup,
        keywords: ["zoom", "out", "smaller"],
        icon: <MagnifyingGlassMinusIcon className="h-4 w-4" />,
        shortcut: { mod: true, key: "-" },
        perform: () => zoomControl("decrease"),
      },
      {
        id: "fit-to-window",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - fit to window command",
          defaultMessage: "Fit to Window",
          id: "S/fzmA",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteController: caption - fit to window command",
          defaultMessage: "Scale the image to fit the viewport",
          id: "L+SpbB",
        }),
        group: viewGroup,
        keywords: ["fit", "window", "screen", "zoom", "auto"],
        icon: <ArrowsPointingOutIcon className="h-4 w-4" />,
        perform: () => {
          if (!viewport) return;
          fitScreen();
        },
      },
      {
        id: "actual-size",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - actual size command",
          defaultMessage: "Actual Size",
          id: "Gc5erm",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteController: caption - actual size command",
          defaultMessage: "Reset zoom to 100%",
          id: "dvy2wk",
        }),
        group: viewGroup,
        keywords: ["actual", "size", "100", "reset", "zoom", "original"],
        icon: <MagnifyingGlassIcon className="h-4 w-4" />,
        shortcut: { mod: true, key: "0" },
        perform: () => zoomControl("reset"),
      },
      {
        id: "lock",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - lock command",
          defaultMessage: "Toggle Lock",
          id: "s747BT",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteController: caption - lock command",
          defaultMessage: "Lock or unlock viewport panning and zooming",
          id: "7V2yGp",
        }),
        group: viewGroup,
        keywords: ["lock", "unlock", "pan", "zoom", "restrict"],
        icon: <LockClosedIcon className="h-4 w-4" />,
        perform: () => toggleLock(),
      },
      {
        id: "rotate-left",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - rotate left command",
          defaultMessage: "Rotate Left",
          id: "+3FE8Y",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteController: caption - rotate left command",
          defaultMessage: "Rotate the image 90° counter-clockwise",
          id: "qA9JXS",
        }),
        group: transformGroup,
        keywords: ["rotate", "left", "counter-clockwise", "ccw", "90"],
        icon: <ArrowUturnLeftIcon className="h-4 w-4" />,
        perform: () => rotationControl("rotate-left"),
      },
      {
        id: "rotate-right",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - rotate right command",
          defaultMessage: "Rotate Right",
          id: "BPkpxr",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteController: caption - rotate right command",
          defaultMessage: "Rotate the image 90° clockwise",
          id: "1OYY5K",
        }),
        group: transformGroup,
        keywords: ["rotate", "right", "clockwise", "cw", "90"],
        icon: <ArrowUturnRightIcon className="h-4 w-4" />,
        perform: () => rotationControl("rotate-right"),
      },
      {
        id: "flip-horizontal",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - flip horizontal command",
          defaultMessage: "Flip Horizontal",
          id: "2vLOdr",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteController: caption - flip horizontal command",
          defaultMessage: "Mirror the image along the vertical axis",
          id: "fRS5Td",
        }),
        group: transformGroup,
        keywords: ["flip", "horizontal", "mirror"],
        icon: <ArrowsRightLeftIcon className="h-4 w-4" />,
        perform: () => scaleControl("flip-horizontal"),
      },
      {
        id: "flip-vertical",
        label: intl.formatMessage({
          description: "CommandPaletteController: label - flip vertical command",
          defaultMessage: "Flip Vertical",
          id: "s0Z6jW",
        }),
        description: intl.formatMessage({
          description: "CommandPaletteController: caption - flip vertical command",
          defaultMessage: "Mirror the image along the horizontal axis",
          id: "32R4U6",
        }),
        group: transformGroup,
        keywords: ["flip", "vertical", "mirror", "upside"],
        icon: <ArrowsUpDownIcon className="h-4 w-4" />,
        perform: () => scaleControl("flip-vertical"),
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
  }, [
    intl,
    navigate,
    setThemeMode,
    zoomControl,
    fitScreen,
    rotationControl,
    scaleControl,
    toggleLock,
    viewport,
    fileGroup,
    viewGroup,
    transformGroup,
    appearanceGroup,
  ]);

  useCommandPaletteShortcut();
  useCommandShortcuts(commands);

  return { isOpen, commands, onClose: close };
}
