import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Provider } from "jotai";
import { expect } from "storybook/test";
import { useCommandPalette } from "./UseCommandPalette";
import { useCommandPaletteShortcut } from "./UseCommandPaletteShortcut";

function UseCommandPaletteShortcutHarness(): ReactElement {
  const { isOpen } = useCommandPalette();
  useCommandPaletteShortcut();
  return (
    <div>
      <span data-testid="is-open">{String(isOpen)}</span>
      <button data-testid="btn">Focusable</button>
    </div>
  );
}

function Wrapper(): ReactElement {
  return (
    <Provider>
      <UseCommandPaletteShortcutHarness />
    </Provider>
  );
}

const meta: Meta<typeof Wrapper> = {
  component: Wrapper,
  title: "Actions/Command Palette/Use Command Palette Shortcut",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId("is-open")).toHaveTextContent("false");
  },
} satisfies Story;

// Ctrl+K (Windows/Linux) or Cmd+K (Mac) toggles the palette open and closed.
export const CtrlKToggles: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByTestId("is-open")).toHaveTextContent("false");

    await userEvent.click(canvas.getByTestId("btn"));
    await userEvent.keyboard("{Control>}k{/Control}");
    await expect(canvas.getByTestId("is-open")).toHaveTextContent("true");

    await userEvent.keyboard("{Control>}k{/Control}");
    await expect(canvas.getByTestId("is-open")).toHaveTextContent("false");
  },
} satisfies Story;
