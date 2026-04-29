import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToolbarMenu } from "./ToolbarMenu";

const meta: Meta<typeof ToolbarMenu> = {
  component: ToolbarMenu,
  title: "Components/Editor/Toolbar/Menu",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onToggle: () => {} },
};
