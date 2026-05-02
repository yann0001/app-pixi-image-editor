import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Provider } from "jotai";
import { fn } from "storybook/test";
import { ToolbarTools as Component } from "./ToolbarTools";
import { ToolbarToolsController } from "./ToolbarToolsController";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Editor/Toolbar/Tools",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  lock: false,
  showFitScreen: true,
  onToggleFilterMenu: fn(),
  onSwapLock: fn(),
  onRotate: fn(),
  onFlip: fn(),
  onAdjustZoom: fn(),
};

export const Default: Story = {
  args: defaultArgs,
};

export const Locked: Story = {
  args: { ...defaultArgs, lock: true },
};

export const WithFitToWindow: Story = {
  args: { ...defaultArgs, showFitScreen: false },
};

export const WithAllInteractions: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /lock image to center/i }));
    await userEvent.click(canvas.getByRole("button", { name: /actual size/i }));
    await userEvent.click(canvas.getByRole("button", { name: /rotate 90° left/i }));
    await userEvent.click(canvas.getByRole("button", { name: /rotate 90° right/i }));
    await userEvent.click(canvas.getByRole("button", { name: /flip vertical/i }));
    await userEvent.click(canvas.getByRole("button", { name: /flip horizontal/i }));
    await userEvent.click(canvas.getByRole("button", { name: /filters/i }));
  },
} satisfies Story;

export const WithLockedInteractions: Story = {
  args: { ...defaultArgs, lock: true },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /unlock image/i }));
  },
} satisfies Story;

export const WithFitToWindowInteraction: Story = {
  args: { ...defaultArgs, showFitScreen: false },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /fit to window/i }));
  },
} satisfies Story;

function ToolbarToolsControllerWrapper(): ReactElement {
  return (
    <Provider>
      <ToolbarToolsController />
    </Provider>
  );
}

export const ControllerDefault: StoryObj<typeof ToolbarToolsControllerWrapper> = {
  render: () => <ToolbarToolsControllerWrapper />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /rotate 90° left/i }));
    await userEvent.click(canvas.getByRole("button", { name: /rotate 90° right/i }));
    await userEvent.click(canvas.getByRole("button", { name: /flip vertical/i }));
    await userEvent.click(canvas.getByRole("button", { name: /flip horizontal/i }));
    await userEvent.click(canvas.getByRole("button", { name: /filters/i }));
    await userEvent.click(canvas.getByRole("button", { name: /unlock image|lock image to center/i }));
    await userEvent.click(canvas.getByRole("button", { name: /fit to window|actual size/i }));
  },
} satisfies StoryObj<typeof ToolbarToolsControllerWrapper>;
