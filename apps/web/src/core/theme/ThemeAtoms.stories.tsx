import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useAtom, Provider } from "jotai";
import { expect } from "storybook/test";
import { themeModeAtom, themeLocalStorageAtom } from "./ThemeAtoms";
import type { ThemeMode } from "./ThemeMode";

function ThemeAtomsHarness(): ReactElement {
  const [mode, toggleMode] = useAtom(themeModeAtom);
  const [, setStorage] = useAtom(themeLocalStorageAtom);

  return (
    <div>
      <span data-testid="theme-mode">{mode}</span>
      <button data-testid="toggle-theme" onClick={() => toggleMode()}>
        Toggle Theme
      </button>
      <button data-testid="set-dark" onClick={() => setStorage("dark" as ThemeMode)}>
        Set Dark
      </button>
      <button data-testid="set-light" onClick={() => setStorage("light" as ThemeMode)}>
        Set Light
      </button>
    </div>
  );
}

function ThemeAtomsWrapper(): ReactElement {
  return (
    <Provider>
      <ThemeAtomsHarness />
    </Provider>
  );
}

const meta: Meta<typeof ThemeAtomsWrapper> = {
  component: ThemeAtomsWrapper,
  title: "Core/Theme/Atoms",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {} satisfies Story;

export const WithThemeToggle: Story = {
  play: async ({ canvas, userEvent }) => {
    const modeEl = canvas.getByTestId("theme-mode");
    const initialMode = modeEl.textContent;

    await userEvent.click(canvas.getByTestId("toggle-theme"));
    const toggledMode = modeEl.textContent;
    await expect(toggledMode).not.toBe(initialMode);

    await userEvent.click(canvas.getByTestId("set-dark"));
    await expect(canvas.getByTestId("theme-mode")).toHaveTextContent("dark");

    await userEvent.click(canvas.getByTestId("set-light"));
    await expect(canvas.getByTestId("theme-mode")).toHaveTextContent("light");
  },
} satisfies Story;
