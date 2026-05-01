import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppDrawer } from "./AppDrawer";

const meta: Meta<typeof AppDrawer> = {
  component: AppDrawer,
  title: "Components/Editor/AppDrawer",
  tags: ["autodocs"],
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
