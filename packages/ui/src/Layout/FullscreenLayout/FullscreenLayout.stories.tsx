import type { Meta, StoryObj } from "@storybook/react-vite";
import { StorybookTableContentComponent } from "../../Storybook/Components/StorybookTableContentComponent";
import { FullscreenLayout as Component } from "./FullscreenLayout";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Shared/Layout/Fullscreen",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <StorybookTableContentComponent />,
  },
};

export const WithFooter: Story = {
  args: {
    footer: true,
    children: <StorybookTableContentComponent />,
    onGithubClick: () => {},
    onLinkedInClick: () => {},
  },
};

export const WithContainer: Story = {
  args: {
    container: true,
    children: <StorybookTableContentComponent />,
  },
};
