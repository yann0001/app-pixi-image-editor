import type { Meta, StoryObj } from "@storybook/react-vite";
import { PwaOfflineDialog as Component } from "./PwaOfflineDialog";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Feedback/Pwa Offline Dialog",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: { open: true, onClose: () => {} },
};

export const Closed: Story = {
  args: { open: false, onClose: () => {} },
};
