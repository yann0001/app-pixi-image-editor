import type { Meta, StoryObj } from "@storybook/react-vite";
import { BlurIcon } from "./BlurIcon";
import { ContrastIcon } from "./ContrastIcon";
import { DropletIcon } from "./DropletIcon";
import { PixelateIcon } from "./PixelateIcon";
import { RgbIcon } from "./RgbIcon";
import { SparklesIcon } from "./SparklesIcon";
import { SunDimIcon } from "./SunDimIcon";
import { SunHighIcon } from "./SunHighIcon";

const meta: Meta<typeof BlurIcon> = {
  component: BlurIcon,
  title: "Icons/Filters/Filter Icons",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Blur: Story = {};
export const Contrast: StoryObj<typeof ContrastIcon> = { render: () => <ContrastIcon /> };
export const Droplet: StoryObj<typeof DropletIcon> = { render: () => <DropletIcon /> };
export const Pixelate: StoryObj<typeof PixelateIcon> = { render: () => <PixelateIcon /> };
export const Rgb: StoryObj<typeof RgbIcon> = { render: () => <RgbIcon /> };
export const Sparkles: StoryObj<typeof SparklesIcon> = { render: () => <SparklesIcon /> };
export const SunDim: StoryObj<typeof SunDimIcon> = { render: () => <SunDimIcon /> };
export const SunHigh: StoryObj<typeof SunHighIcon> = { render: () => <SunHighIcon /> };
