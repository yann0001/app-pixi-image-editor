import type { Meta, StoryObj } from "@storybook/react-vite";
import { FitViewIcon } from "./FitViewIcon";
import { FlipHorizontalIcon } from "./FlipHorizontalIcon";
import { FlipVerticalIcon } from "./FlipVerticalIcon";
import { FullscreenIcon } from "./FullscreenIcon";
import { RotateCcwIcon } from "./RotateCcwIcon";
import { RotateCwIcon } from "./RotateCwIcon";

const meta: Meta<typeof FitViewIcon> = {
  component: FitViewIcon,
  title: "Icons/Tools/Tool Icons",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FitView: Story = {};
export const FlipHorizontal: StoryObj<typeof FlipHorizontalIcon> = { render: () => <FlipHorizontalIcon /> };
export const FlipVertical: StoryObj<typeof FlipVerticalIcon> = { render: () => <FlipVerticalIcon /> };
export const Fullscreen: StoryObj<typeof FullscreenIcon> = { render: () => <FullscreenIcon /> };
export const RotateCcw: StoryObj<typeof RotateCcwIcon> = { render: () => <RotateCcwIcon /> };
export const RotateCw: StoryObj<typeof RotateCwIcon> = { render: () => <RotateCwIcon /> };
