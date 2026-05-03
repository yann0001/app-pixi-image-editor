import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { isMac, matchesShortcut } from "./CommandShortcut";

function CommandShortcutHarness(): ReactElement {
  return <div data-testid="harness" />;
}

const meta: Meta<typeof CommandShortcutHarness> = {
  component: CommandShortcutHarness,
  title: "Actions/Command Palette/Command Shortcut",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const IsMacReturnsBool: Story = {
  play: async () => {
    const result = isMac();
    expect(typeof result).toBe("boolean");
  },
} satisfies Story;

// matchesShortcut — mod key maps to ctrlKey on non-Mac and metaKey on Mac
export const MatchesModKey: Story = {
  play: async () => {
    const mac = isMac();
    const event = new KeyboardEvent("keydown", {
      key: "s",
      ctrlKey: !mac,
      metaKey: mac,
    });
    expect(matchesShortcut(event, { mod: true, key: "s" })).toBe(true);
    expect(matchesShortcut(event, { mod: true, key: "k" })).toBe(false);
  },
} satisfies Story;

// matchesShortcut — shift modifier must match exactly
export const MatchesShiftKey: Story = {
  play: async () => {
    const withShift = new KeyboardEvent("keydown", { key: "a", shiftKey: true });
    const noShift = new KeyboardEvent("keydown", { key: "a" });

    expect(matchesShortcut(withShift, { shift: true, key: "a" })).toBe(true);
    expect(matchesShortcut(noShift, { shift: true, key: "a" })).toBe(false);
    expect(matchesShortcut(withShift, { key: "a" })).toBe(false);
  },
} satisfies Story;

// matchesShortcut — alt modifier must match exactly
export const MatchesAltKey: Story = {
  play: async () => {
    const withAlt = new KeyboardEvent("keydown", { key: "d", altKey: true });
    const noAlt = new KeyboardEvent("keydown", { key: "d" });

    expect(matchesShortcut(withAlt, { alt: true, key: "d" })).toBe(true);
    expect(matchesShortcut(noAlt, { alt: true, key: "d" })).toBe(false);
  },
} satisfies Story;

// matchesShortcut — key comparison is case-insensitive
export const KeyCaseInsensitive: Story = {
  play: async () => {
    const event = new KeyboardEvent("keydown", { key: "K" });
    expect(matchesShortcut(event, { key: "k" })).toBe(true);
    expect(matchesShortcut(event, { key: "K" })).toBe(true);
  },
} satisfies Story;
