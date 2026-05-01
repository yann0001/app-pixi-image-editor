import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilterSlider as Component } from "./FilterSlider";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Editor/Filter Drawer/Filter Slider",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Brightness",
    value: 1,
    min: 0,
    max: 2,
    step: 0.1,
    rangeClassName: "range-primary",
    ariaLabel: "Brightness",
    onReset: () => {},
    onChange: () => {},
  },
};

export const AtMinimum: Story = {
  args: { ...Default.args, value: 0 },
};

export const AtMaximum: Story = {
  args: { ...Default.args, value: 2 },
};
