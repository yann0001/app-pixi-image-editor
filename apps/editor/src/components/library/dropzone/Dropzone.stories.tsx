import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropzone } from "./Dropzone";

const meta: Meta<typeof Dropzone> = {
  component: Dropzone,
  title: "Components/Library/Dropzone",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onDrop: () => {} },
};
