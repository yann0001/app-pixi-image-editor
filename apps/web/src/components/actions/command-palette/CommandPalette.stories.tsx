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
import { expect, fn, userEvent, within } from "storybook/test";
import type { Command } from "./Command";
import { CommandPalette as Component } from "./CommandPalette";
import type { CommandPaletteProps as Props } from "./CommandPalette";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Actions/Command Palette",
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

// Verifies initial render: search input present, all groups visible, first item active.
export const Default: Story = {
  args: defaultArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = await canvas.findByTestId("command-palette__search");
    expect(input).toBeTruthy();

    expect(canvas.getByText("File")).toBeTruthy();
    expect(canvas.getByText("View")).toBeTruthy();
    expect(canvas.getByText("Transform")).toBeTruthy();
    expect(canvas.getByText("Appearance")).toBeTruthy();

    expect(canvas.getByTestId("command-palette__item-new-image").getAttribute("aria-selected")).toBe("true");
  },
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

// Types "zoom" and checks that only zoom-related commands remain visible.
export const SearchFilters: Story = {
  args: defaultArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = await canvas.findByTestId("command-palette__search");
    await userEvent.type(input, "zoom");

    expect(canvas.getByTestId("command-palette__item-zoom-in")).toBeTruthy();
    expect(canvas.getByTestId("command-palette__item-zoom-out")).toBeTruthy();
    expect(canvas.getByTestId("command-palette__item-actual-size")).toBeTruthy();

    expect(canvas.queryByTestId("command-palette__item-rotate-left")).toBeNull();
    expect(canvas.queryByTestId("command-palette__item-flip-horizontal")).toBeNull();
    expect(canvas.queryByTestId("command-palette__item-theme-light")).toBeNull();
  },
};

// Types a query that matches nothing and verifies the empty-state message.
export const SearchNoResults: Story = {
  args: defaultArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = await canvas.findByTestId("command-palette__search");
    await userEvent.type(input, "xyznotfound");

    expect(canvas.getByText("No commands found")).toBeTruthy();
    expect(canvas.queryByTestId("command-palette__item-new-image")).toBeNull();
  },
};

// Uses ArrowDown / ArrowUp to move through the list and checks aria-selected.
export const KeyboardNavigation: Story = {
  args: defaultArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = await canvas.findByTestId("command-palette__search");
    expect(canvas.getByTestId("command-palette__item-new-image").getAttribute("aria-selected")).toBe("true");

    await userEvent.click(input);
    await userEvent.keyboard("{ArrowDown}");
    expect(canvas.getByTestId("command-palette__item-save-image").getAttribute("aria-selected")).toBe("true");
    expect(canvas.getByTestId("command-palette__item-new-image").getAttribute("aria-selected")).not.toBe("true");

    await userEvent.keyboard("{ArrowUp}");
    expect(canvas.getByTestId("command-palette__item-new-image").getAttribute("aria-selected")).toBe("true");
  },
};

// Clicks a command item and checks that onClose is called.
export const CommandExecution: Story = {
  args: {
    ...defaultArgs,
    onClose: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const item = await canvas.findByTestId("command-palette__item-new-image");
    await userEvent.click(item);

    expect(args.onClose).toHaveBeenCalledOnce();
  },
};

// Escape key — keyboard handler intercepts it and calls onClose.
export const EscapeClose: Story = {
  args: {
    ...defaultArgs,
    onClose: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await canvas.findByTestId("command-palette__search");
    await userEvent.keyboard("{Escape}");
    expect(args.onClose).toHaveBeenCalled();
  },
};

// Enter key — activates the focused command and calls onClose.
export const EnterExecute: Story = {
  args: {
    ...defaultArgs,
    onClose: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByTestId("command-palette__search");
    await userEvent.click(input);
    await userEvent.keyboard("{Enter}");
    expect(args.onClose).toHaveBeenCalledOnce();
  },
};

// Home key — after navigating down, Home jumps back to the first item.
export const HomeKey: Story = {
  args: defaultArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByTestId("command-palette__search");
    await userEvent.click(input);
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{Home}");
    expect(canvas.getByTestId("command-palette__item-new-image").getAttribute("aria-selected")).toBe("true");
  },
};

// End key — jumps to the last command in the list.
export const EndKey: Story = {
  args: defaultArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByTestId("command-palette__search");
    await userEvent.click(input);
    await userEvent.keyboard("{End}");
    expect(canvas.getByTestId("command-palette__item-theme-dark").getAttribute("aria-selected")).toBe("true");
  },
};

// Hovering an item sets it as the active command.
export const MouseHoverActivates: Story = {
  args: defaultArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByTestId("command-palette__search");
    await userEvent.hover(canvas.getByTestId("command-palette__item-zoom-in"));
    expect(canvas.getByTestId("command-palette__item-zoom-in").getAttribute("aria-selected")).toBe("true");
  },
};

// Types a no-results query then presses keyboard keys — covers the list.length === 0
// early-return branches in each switch case of UseCommandPaletteKeyboard, plus the
// if (!id) return branch in the Enter case (activeId is undefined after empty filter).
export const KeyboardOnEmptyResults: Story = {
  args: defaultArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByTestId("command-palette__search");
    await userEvent.type(input, "xyznotfound");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowUp}");
    await userEvent.keyboard("{Home}");
    await userEvent.keyboard("{End}");
    await userEvent.keyboard("{Enter}");
  },
};

// A command without an icon covers the falsy path of `command.icon && (...)`.
export const WithCommandWithoutIcon: Story = {
  args: {
    ...defaultArgs,
    commands: [
      ...commands,
      { id: "no-icon", label: "No Icon Command", group: "Test", keywords: [], perform: () => {} },
    ],
  },
};

// A command with no group goes to DEFAULT_GROUP, covering the
// `group.name !== DEFAULT_GROUP` false branch (group header is not rendered).
export const WithDefaultGroup: Story = {
  args: {
    ...defaultArgs,
    commands: [{ id: "ungrouped", label: "Ungrouped Command", keywords: [], perform: () => {} }],
  },
};
