import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Provider } from "jotai";
import { fn } from "storybook/test";
import { expect } from "storybook/test";
import { ToolbarMenu as Component } from "./ToolbarMenu";
import { ToolbarMenuController } from "./ToolbarMenuController";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Editor/Toolbar/Menu",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onToggle: fn() },
};

export const WithInteraction: Story = {
  args: { onToggle: fn() },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByTestId("editor__menu-button");
    await userEvent.click(button);
    await expect(Default.args?.onToggle).not.toHaveBeenCalled();
    await expect(button).toBeInTheDocument();
  },
} satisfies Story;

function ToolbarMenuControllerWrapper(): ReactElement {
  return (
    <Provider>
      <ToolbarMenuController />
    </Provider>
  );
}

export const ControllerDefault: StoryObj<typeof ToolbarMenuControllerWrapper> = {
  render: () => <ToolbarMenuControllerWrapper />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId("editor__menu-button"));
    await userEvent.click(canvas.getByTestId("editor__menu-button"));
  },
} satisfies StoryObj<typeof ToolbarMenuControllerWrapper>;
