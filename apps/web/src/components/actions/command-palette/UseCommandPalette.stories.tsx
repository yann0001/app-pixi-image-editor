import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Provider } from "jotai";
import { expect } from "storybook/test";
import { useCommandPalette } from "./UseCommandPalette";

function UseCommandPaletteHarness(): ReactElement {
  const { isOpen, open, close, toggle } = useCommandPalette();
  return (
    <div>
      <span data-testid="is-open">{String(isOpen)}</span>
      <button data-testid="btn-open" onClick={open}>
        Open
      </button>
      <button data-testid="btn-close" onClick={close}>
        Close
      </button>
      <button data-testid="btn-toggle" onClick={toggle}>
        Toggle
      </button>
    </div>
  );
}

function Wrapper(): ReactElement {
  return (
    <Provider>
      <UseCommandPaletteHarness />
    </Provider>
  );
}

const meta: Meta<typeof Wrapper> = {
  component: Wrapper,
  title: "Actions/Command Palette/Use Command Palette",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId("is-open")).toHaveTextContent("false");
  },
} satisfies Story;

export const OpenAndClose: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId("btn-open"));
    await expect(canvas.getByTestId("is-open")).toHaveTextContent("true");

    await userEvent.click(canvas.getByTestId("btn-close"));
    await expect(canvas.getByTestId("is-open")).toHaveTextContent("false");
  },
} satisfies Story;

export const ToggleState: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByTestId("is-open")).toHaveTextContent("false");

    await userEvent.click(canvas.getByTestId("btn-toggle"));
    await expect(canvas.getByTestId("is-open")).toHaveTextContent("true");

    await userEvent.click(canvas.getByTestId("btn-toggle"));
    await expect(canvas.getByTestId("is-open")).toHaveTextContent("false");
  },
} satisfies Story;
