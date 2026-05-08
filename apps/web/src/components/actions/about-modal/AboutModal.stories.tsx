import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { AboutModal as Component } from "./AboutModal";
import type { AboutModalProps as Props } from "./AboutModal";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Actions/About Modal",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  isOpen: true,
  onClose: () => {},
} satisfies Props;

export const Open: Story = {
  args: defaultArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    expect(await canvas.findByText("Pixi Image Editor")).toBeTruthy();
    expect(canvas.getByTestId("about-modal__version")).toBeTruthy();
  },
};

export const Closed: Story = {
  args: {
    ...defaultArgs,
    isOpen: false,
  },
};

export const CloseButton: Story = {
  args: {
    ...defaultArgs,
    onClose: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const closeBtn = await canvas.findByRole("button", { name: "Close" });
    await userEvent.click(closeBtn);
    expect(args.onClose).toHaveBeenCalledOnce();
  },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};
