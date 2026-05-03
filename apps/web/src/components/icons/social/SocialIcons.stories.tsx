import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { GithubIcon } from "./GithubIcon";
import { LinkedInIcon } from "./LinkedInIcon";

const meta: Meta<typeof GithubIcon> = {
  component: GithubIcon,
  title: "Icons/Social/GitHub",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("img", { name: "GitHub" })).toBeInTheDocument();
  },
} satisfies Story;

export const LinkedIn: StoryObj<typeof LinkedInIcon> = {
  render: () => <LinkedInIcon />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("img", { name: "LinkedIn" })).toBeInTheDocument();
  },
} satisfies StoryObj<typeof LinkedInIcon>;
