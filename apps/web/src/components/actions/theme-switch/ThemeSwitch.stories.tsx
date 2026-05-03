import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSwitch as Component } from "./ThemeSwitch";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Actions/Theme Switch",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: { mode: "light", onSwitch: () => {} },
};

export const Dark: Story = {
  args: { mode: "dark", onSwitch: () => {} },
};
