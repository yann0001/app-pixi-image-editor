import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToolbarZoom } from "./ToolbarZoom";

const meta: Meta<typeof ToolbarZoom> = {
  component: ToolbarZoom,
  title: "Components/Editor/Toolbar/Zoom",
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
