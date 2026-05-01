import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToolbarTools } from "./ToolbarTools";

const meta: Meta<typeof ToolbarTools> = {
  component: ToolbarTools,
  title: "Components/Editor/Toolbar/Tools",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lock: false,
    showFitScreen: true,
    onToggleFilterMenu: () => {},
    onSwapLock: () => {},
    onRotate: () => {},
    onFlip: () => {},
    onAdjustZoom: () => {},
  },
};

export const Locked: Story = {
  args: { ...Default.args, lock: true },
};
