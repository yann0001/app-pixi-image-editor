import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToolbarMenu as Component } from "./ToolbarMenu";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Editor/Toolbar/Menu",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onToggle: () => {} },
};
