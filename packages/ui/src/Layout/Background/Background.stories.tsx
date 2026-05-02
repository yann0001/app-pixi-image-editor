import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { BlueFadeBackground } from "./BlueFadeBackground";
import { GridBackground } from "./GridBackground";

const meta: Meta<typeof BlueFadeBackground> = {
  component: BlueFadeBackground,
  title: "Shared/Layout/Background/Blue Fade",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const el = canvas.getByRole("generic");
    await expect(el).toBeInTheDocument();
  },
} satisfies Story;

export const GridBackgroundStory: StoryObj<typeof GridBackground> = {
  name: "Grid Background",
  render: () => <GridBackground />,
  play: async ({ canvas }) => {
    const el = canvas.getByRole("generic");
    await expect(el).toBeInTheDocument();
  },
} satisfies StoryObj<typeof GridBackground>;
