import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropzone as Component } from "./Dropzone";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Input/Dropzone",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onDrop: () => {} },
};
