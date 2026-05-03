import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Provider } from "jotai";
import { fn } from "storybook/test";
import { expect } from "storybook/test";
import { ToolbarZoom as Component } from "./ToolbarZoom";
import { ToolbarZoomController } from "./ToolbarZoomController";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Editor/Toolbar/Zoom",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  zoom: 100,
  onZoomIn: fn(),
  onZoomOut: fn(),
  onResetZoom: fn(),
};

export const Default: Story = {
  args: defaultArgs,
};

export const ZoomedIn: Story = {
  args: { ...defaultArgs, zoom: 200 },
};

export const WithInteractions: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /zoom in/i }));
    await expect(defaultArgs.onZoomIn).toHaveBeenCalled();

    await userEvent.click(canvas.getByRole("button", { name: /zoom out/i }));
    await expect(defaultArgs.onZoomOut).toHaveBeenCalled();

    await userEvent.click(canvas.getByTestId("toolbar-zoom__reset"));
    await expect(defaultArgs.onResetZoom).toHaveBeenCalled();
  },
} satisfies Story;

function ToolbarZoomControllerWrapper(): ReactElement {
  return (
    <Provider>
      <ToolbarZoomController />
    </Provider>
  );
}

export const ControllerDefault: StoryObj<typeof ToolbarZoomControllerWrapper> = {
  render: () => <ToolbarZoomControllerWrapper />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /zoom in/i }));
    await userEvent.click(canvas.getByRole("button", { name: /zoom out/i }));
    await userEvent.click(canvas.getByTestId("toolbar-zoom__reset"));
  },
} satisfies StoryObj<typeof ToolbarZoomControllerWrapper>;
