import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeView as Component } from "./HomeView";
import type { HomeViewProps as Props } from "./HomeView";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Home",
  tags: ["!test"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  themeSwitchProps: { mode: "light", onSwitch: () => {} },
  socialLinkProps: { onGithubClick: () => {}, onLinkedInClick: () => {} },
  onDrop: () => {},
} satisfies Props;

export const Fullscreen: Story = {
  args: defaultArgs,
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};
