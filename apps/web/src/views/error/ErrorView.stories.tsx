import type { Meta, StoryObj } from "@storybook/react-vite";
import { ErrorView as Component } from "./ErrorView";
import type { ErrorViewProps as Props } from "./ErrorView";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Error",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  onBack: () => {},
} satisfies Props;

export const Fullscreen: Story = {
  args: defaultArgs,
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};
