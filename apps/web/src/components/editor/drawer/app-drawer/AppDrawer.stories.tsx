import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppDrawer as Component } from "./AppDrawer";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Editor/App Drawer",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    open: true,
    themeSwitchProps: { mode: "light", onSwitch: () => {} },
    onClose: () => {},
    onNewImage: () => {},
    onSaveImage: () => {},
  },
};

export const Closed: Story = {
  args: {
    open: false,
    themeSwitchProps: { mode: "light", onSwitch: () => {} },
    onClose: () => {},
    onNewImage: () => {},
    onSaveImage: () => {},
  },
};
