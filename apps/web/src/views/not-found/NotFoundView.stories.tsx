import type { Meta, StoryObj } from "@storybook/react-vite";
import { NotFoundView as Component } from "./NotFoundView";
import type { NotFoundViewProps as Props } from "./NotFoundView";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/NotFound",
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
