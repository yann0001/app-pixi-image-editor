import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToolbarZoom as Component } from "./ToolbarZoom";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Editor/Toolbar/Zoom",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    zoom: 100,
    onZoomIn: () => {},
    onZoomOut: () => {},
    onResetZoom: () => {},
  },
};

export const ZoomedIn: Story = {
  args: { ...Default.args, zoom: 200 },
};
