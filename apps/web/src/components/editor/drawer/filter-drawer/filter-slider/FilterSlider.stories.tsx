import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { FilterSlider as Component } from "./FilterSlider";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Editor/Filter Drawer/Filter Slider",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  label: "Brightness",
  resetLabel: "Reset",
  value: 1,
  min: 0,
  max: 2,
  step: 0.1,
  rangeClassName: "range-primary",
  ariaLabel: "Brightness",
  onReset: fn(),
  onChange: fn(),
};

export const Default: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId("filter-slider__reset"));
    await expect(defaultArgs.onReset).toHaveBeenCalled();
  },
} satisfies Story;

export const AtMinimum: Story = {
  args: { ...defaultArgs, value: 0 },
};

export const AtMaximum: Story = {
  args: { ...defaultArgs, value: 2 },
};
