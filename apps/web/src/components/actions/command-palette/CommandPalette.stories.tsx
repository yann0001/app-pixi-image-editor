import type { ReactElement } from "react";
import { ArrowDownTrayIcon, DocumentPlusIcon, MoonIcon, SunIcon } from "@heroicons/react/20/solid";
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
