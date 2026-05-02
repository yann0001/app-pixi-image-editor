import type { ReactElement } from "react";
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
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Command } from "./Command";
import { CommandPalette as Component } from "./CommandPalette";
import type { CommandPaletteProps as Props } from "./CommandPalette";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Actions/Command Palette",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function iconEl(node: ReactElement): ReactElement {
  return node;
}

const commands: Command[] = [
  {
    id: "new-image",
    label: "New Image",
    description: "Open a new image in the editor",
    group: "File",
    keywords: ["new", "open", "create"],
    icon: iconEl(<DocumentPlusIcon className="h-4 w-4" />),
    shortcut: { mod: true, key: "n" },
    perform: () => console.log("new image"),
  },
  {
    id: "save-image",
    label: "Save Image",
    description: "Download the current image as PNG",
    group: "File",
    keywords: ["save", "download", "export"],
    icon: iconEl(<ArrowDownTrayIcon className="h-4 w-4" />),
    shortcut: { mod: true, key: "s" },
    perform: () => console.log("save image"),
  },
  {
    id: "zoom-in",
    label: "Zoom In",
    group: "View",
    keywords: ["zoom", "in", "bigger"],
    icon: iconEl(<MagnifyingGlassPlusIcon className="h-4 w-4" />),
    shortcut: { mod: true, key: "=" },
    perform: () => console.log("zoom in"),
  },
  {
    id: "zoom-out",
    label: "Zoom Out",
    group: "View",
    keywords: ["zoom", "out", "smaller"],
    icon: iconEl(<MagnifyingGlassMinusIcon className="h-4 w-4" />),
    shortcut: { mod: true, key: "-" },
    perform: () => console.log("zoom out"),
  },
  {
    id: "fit-to-window",
    label: "Fit to Window",
    description: "Scale the image to fit the viewport",
    group: "View",
    keywords: ["fit", "window", "screen", "auto"],
    icon: iconEl(<ArrowsPointingOutIcon className="h-4 w-4" />),
    perform: () => console.log("fit to window"),
  },
  {
    id: "actual-size",
    label: "Actual Size",
    description: "Reset zoom to 100%",
    group: "View",
    keywords: ["actual", "size", "100", "reset"],
    icon: iconEl(<MagnifyingGlassIcon className="h-4 w-4" />),
    shortcut: { mod: true, key: "0" },
    perform: () => console.log("actual size"),
  },
  {
    id: "lock",
    label: "Toggle Lock",
    description: "Lock or unlock viewport panning and zooming",
    group: "View",
    keywords: ["lock", "unlock", "pan"],
    icon: iconEl(<LockClosedIcon className="h-4 w-4" />),
    perform: () => console.log("toggle lock"),
  },
  {
    id: "rotate-left",
    label: "Rotate Left",
    description: "Rotate the image 90° counter-clockwise",
    group: "Transform",
    keywords: ["rotate", "left", "ccw", "90"],
    icon: iconEl(<ArrowUturnLeftIcon className="h-4 w-4" />),
    perform: () => console.log("rotate left"),
  },
  {
    id: "rotate-right",
    label: "Rotate Right",
    description: "Rotate the image 90° clockwise",
    group: "Transform",
    keywords: ["rotate", "right", "cw", "90"],
    icon: iconEl(<ArrowUturnRightIcon className="h-4 w-4" />),
    perform: () => console.log("rotate right"),
  },
  {
    id: "flip-horizontal",
    label: "Flip Horizontal",
    description: "Mirror the image along the vertical axis",
    group: "Transform",
    keywords: ["flip", "horizontal", "mirror"],
    icon: iconEl(<ArrowsRightLeftIcon className="h-4 w-4" />),
    perform: () => console.log("flip horizontal"),
  },
  {
    id: "flip-vertical",
    label: "Flip Vertical",
    description: "Mirror the image along the horizontal axis",
    group: "Transform",
    keywords: ["flip", "vertical", "mirror"],
    icon: iconEl(<ArrowsUpDownIcon className="h-4 w-4" />),
    perform: () => console.log("flip vertical"),
  },
  {
    id: "theme-light",
    label: "Theme: Light",
    group: "Appearance",
    icon: iconEl(<SunIcon className="h-4 w-4" />),
    shortcut: { mod: true, shift: true, key: "l" },
    perform: () => console.log("theme light"),
  },
  {
    id: "theme-dark",
    label: "Theme: Dark",
    group: "Appearance",
    icon: iconEl(<MoonIcon className="h-4 w-4" />),
    shortcut: { mod: true, shift: true, key: "k" },
    perform: () => console.log("theme dark"),
  },
];

const defaultArgs: Props = {
  isOpen: true,
  commands,
  onClose: () => console.log("onClose"),
};

export const Default: Story = {
  args: defaultArgs,
};

export const Empty: Story = {
  args: {
    ...defaultArgs,
    commands: [],
  },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};
