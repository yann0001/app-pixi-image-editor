import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Provider } from "jotai";
import { expect, fn } from "storybook/test";
import { filterMenuStateAtom } from "../../atoms/menu/FilterMenuAtoms";
import { FilterDrawer as Component } from "./FilterDrawer";
import { FilterDrawerController } from "./FilterDrawerController";
import { HydrateAtoms } from "~/core/utils/HydrateAtoms";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Editor/Filter Drawer",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  open: true,
  blur: 0,
  brightness: 1,
  contrast: 1,
  saturation: 1,
  pixelate: 0,
  red: 1,
  green: 1,
  blue: 1,
  onFilterChange: fn(),
  onClose: fn(),
};

export const Open: Story = {
  args: defaultArgs,
};

export const Closed: Story = {
  args: { ...defaultArgs, open: false },
};

export const WithInteractions: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", {
        name: /close filters/i,
      })
    );
    await expect(defaultArgs.onClose).toHaveBeenCalled();
  },
} satisfies Story;

export const WithRgbReset: Story = {
  args: defaultArgs,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /reset/i }));
    await expect(defaultArgs.onFilterChange).toHaveBeenCalledWith({ red: 1, green: 1, blue: 1 });
  },
} satisfies Story;

export const WithAllFilterSliderResets: Story = {
  args: { ...defaultArgs, onFilterChange: fn() },
  play: async ({ canvas, userEvent }) => {
    // Click each FilterSlider reset button to cover onReset inline callbacks
    const resetButtons = canvas.getAllByTestId("filter-slider__reset");
    for (const button of resetButtons) {
      await userEvent.click(button);
    }
    // Use arrow keys on each FilterSlider's range input to cover onChange inline callbacks
    const sliderNames = [/brightness/i, /contrast/i, /saturation/i, /blur/i, /pixelate/i];
    for (const name of sliderNames) {
      const slider = canvas.getByRole("slider", { name });
      await userEvent.click(slider);
      await userEvent.keyboard("{ArrowRight}");
    }
    // Use arrow keys on raw RGB range inputs to cover their inline onChange callbacks
    for (const name of [/red/i, /green/i, /blue/i]) {
      const slider = canvas.getByRole("slider", { name });
      await userEvent.click(slider);
      await userEvent.keyboard("{ArrowLeft}");
    }
  },
} satisfies Story;

function FilterDrawerControllerOpen(): ReactElement {
  return (
    <Provider>
      <HydrateAtoms atomValues={[[filterMenuStateAtom, true]]}>
        <FilterDrawerController />
      </HydrateAtoms>
    </Provider>
  );
}

export const ControllerOpen: StoryObj<typeof FilterDrawerControllerOpen> = {
  render: () => <FilterDrawerControllerOpen />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole("button", { name: /close filters/i })).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: /close filters/i }));
  },
} satisfies StoryObj<typeof FilterDrawerControllerOpen>;
