import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { CommandPaletteController as Component } from "./CommandPaletteController";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Actions/Command Palette/Command Palette Controller",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId("command-palette__search")).toBeInTheDocument();
  },
};

// Exercises the zoom-in perform callback (no viewport dependency)
export const ExecuteZoomIn: Story = {
  play: async ({ canvas, userEvent }) => {
    await canvas.findByTestId("command-palette__search");
    await userEvent.click(canvas.getByTestId("command-palette__item-zoom-in"));
  },
};

// Exercises the zoom-out perform callback
export const ExecuteZoomOut: Story = {
  play: async ({ canvas, userEvent }) => {
    await canvas.findByTestId("command-palette__search");
    await userEvent.click(canvas.getByTestId("command-palette__item-zoom-out"));
  },
};

// Exercises the actual-size perform callback (resets zoom to 100%)
export const ExecuteActualSize: Story = {
  play: async ({ canvas, userEvent }) => {
    await canvas.findByTestId("command-palette__search");
    await userEvent.click(canvas.getByTestId("command-palette__item-actual-size"));
  },
};

// Exercises the save-image perform callback — viewport is null so it hits the early-return branch
export const ExecuteSaveImage: Story = {
  play: async ({ canvas, userEvent }) => {
    await canvas.findByTestId("command-palette__search");
    await userEvent.click(canvas.getByTestId("command-palette__item-save-image"));
  },
};

// Exercises the fit-to-window perform callback — viewport is null so it hits the early-return branch
export const ExecuteFitToWindow: Story = {
  play: async ({ canvas, userEvent }) => {
    await canvas.findByTestId("command-palette__search");
    await userEvent.click(canvas.getByTestId("command-palette__item-fit-to-window"));
  },
};

// Exercises the lock perform callback
export const ExecuteLock: Story = {
  play: async ({ canvas, userEvent }) => {
    await canvas.findByTestId("command-palette__search");
    await userEvent.click(canvas.getByTestId("command-palette__item-lock"));
  },
};

// Exercises the theme-light perform callback
export const ExecuteThemeLight: Story = {
  play: async ({ canvas, userEvent }) => {
    await canvas.findByTestId("command-palette__search");
    await userEvent.click(canvas.getByTestId("command-palette__item-theme-light"));
  },
};

// Exercises the theme-dark perform callback
export const ExecuteThemeDark: Story = {
  play: async ({ canvas, userEvent }) => {
    await canvas.findByTestId("command-palette__search");
    await userEvent.click(canvas.getByTestId("command-palette__item-theme-dark"));
  },
};

// Exercises the rotate-left perform callback
export const ExecuteRotateLeft: Story = {
  play: async ({ canvas, userEvent }) => {
    await canvas.findByTestId("command-palette__search");
    await userEvent.click(canvas.getByTestId("command-palette__item-rotate-left"));
  },
};

// Exercises the rotate-right perform callback
export const ExecuteRotateRight: Story = {
  play: async ({ canvas, userEvent }) => {
    await canvas.findByTestId("command-palette__search");
    await userEvent.click(canvas.getByTestId("command-palette__item-rotate-right"));
  },
};

// Exercises the flip-horizontal perform callback
export const ExecuteFlipHorizontal: Story = {
  play: async ({ canvas, userEvent }) => {
    await canvas.findByTestId("command-palette__search");
    await userEvent.click(canvas.getByTestId("command-palette__item-flip-horizontal"));
  },
};

// Exercises the flip-vertical perform callback
export const ExecuteFlipVertical: Story = {
  play: async ({ canvas, userEvent }) => {
    await canvas.findByTestId("command-palette__search");
    await userEvent.click(canvas.getByTestId("command-palette__item-flip-vertical"));
  },
};

// Exercises the new-image perform callback (calls navigate)
export const ExecuteNewImage: Story = {
  play: async ({ canvas, userEvent }) => {
    await canvas.findByTestId("command-palette__search");
    await userEvent.click(canvas.getByTestId("command-palette__item-new-image"));
  },
};
