import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { StorybookNavbarContentComponent } from "../../Storybook/Components/StorybookNavbarContentComponent";
import { Navbar as Component } from "./Navbar";
import type { NavbarProps as Props } from "./Navbar";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Shared/Navigation/Navbar",
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: "color-contrast",
            enabled: false,
          },
          {
            id: "list",
            enabled: false,
          },
          {
            id: "th-has-data-cells",
            enabled: false,
          },
        ],
      },
    },
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  title: "This is a Header",
} satisfies Props;

export const Standard: Story = {
  args: defaultArgs,
};

export const WithComponents: Story = {
  args: {
    ...defaultArgs,
    endElement: <StorybookNavbarContentComponent />,
  },
  parameters: { viewport: { value: "full" } },
};

export const WithScrollInteraction: Story = {
  args: defaultArgs,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("banner")).toBeInTheDocument();
    // Simulate scroll down then up to exercise the scroll handler branches
    window.scrollY = 100;
    window.dispatchEvent(new Event("scroll"));
    window.scrollY = 0;
    window.dispatchEvent(new Event("scroll"));
  },
} satisfies Story;
