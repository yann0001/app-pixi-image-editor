import type { Meta, StoryObj } from "@storybook/react-vite";
import { PwaUpdateDialog as Component } from "./PwaUpdateDialog";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Pwa Update Dialog",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: { open: true, onUpdate: () => {} },
};

export const Closed: Story = {
  args: { open: false, onUpdate: () => {} },
};
