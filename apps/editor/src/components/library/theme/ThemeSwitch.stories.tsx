import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeSwitch } from "./ThemeSwitch";

const meta: Meta<typeof ThemeSwitch> = {
  component: ThemeSwitch,
  title: "Components/Library/ThemeSwitch",
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
