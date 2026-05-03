import { useMemo, type ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import type { Command } from "./Command";
import { isMac } from "./CommandShortcut";
import { useCommandShortcuts } from "./UseCommandShortcuts";

interface HarnessProps {
  onCommand: () => void;
}

function UseCommandShortcutsHarness({ onCommand }: HarnessProps): ReactElement {
  const commands = useMemo<Command[]>(
    () => [
      { id: "mod-cmd", label: "Mod Command", shortcut: { mod: true, key: "j" }, perform: onCommand },
      { id: "bare-cmd", label: "Bare Command", shortcut: { key: "q" }, perform: onCommand },
    ],
    [onCommand]
  );
  useCommandShortcuts(commands);
  return (
    <div>
      <label htmlFor="test-input">Test input</label>
      <input id="test-input" data-testid="input" />
      <button data-testid="btn">Button</button>
    </div>
  );
}

const meta: Meta<typeof UseCommandShortcutsHarness> = {
  component: UseCommandShortcutsHarness,
  title: "Actions/Command Palette/Use Command Shortcuts",
  tags: ["autodocs"],
  args: {
    onCommand: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {} satisfies Story;

// Modifier shortcut (Ctrl+J on non-Mac, Cmd+J on Mac) fires the command.
export const ModShortcutFires: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByTestId("btn"));
    await userEvent.keyboard(isMac() ? "{Meta>}j{/Meta}" : "{Control>}j{/Control}");
    expect(args.onCommand).toHaveBeenCalledOnce();
  },
} satisfies Story;

// Non-modifier shortcut is suppressed when an input element has focus.
export const BareShortcutBlockedInInput: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByTestId("input"));
    await userEvent.keyboard("q");
    expect(args.onCommand).not.toHaveBeenCalled();
  },
} satisfies Story;

// Non-modifier shortcut fires when focus is outside an editable element.
export const BareShortcutFiresOutsideInput: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByTestId("btn"));
    await userEvent.keyboard("q");
    expect(args.onCommand).toHaveBeenCalledOnce();
  },
} satisfies Story;
