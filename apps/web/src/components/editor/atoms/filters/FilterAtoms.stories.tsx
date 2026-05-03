import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useAtom, useAtomValue, Provider } from "jotai";
import { expect } from "storybook/test";
import {
  blurFilterAtom,
  brightnessFilterAtom,
  contrastFilterAtom,
  saturationFilterAtom,
  pixelateFilterAtom,
  redFilterAtom,
  greenFilterAtom,
  blueFilterAtom,
  controlFilterAtom,
} from "./FilterAtoms";

function FilterAtomsHarness(): ReactElement {
  const [filters, setFilters] = useAtom(controlFilterAtom);
  const blur = useAtomValue(blurFilterAtom);
  const brightness = useAtomValue(brightnessFilterAtom);
  const contrast = useAtomValue(contrastFilterAtom);
  const saturation = useAtomValue(saturationFilterAtom);
  const pixelate = useAtomValue(pixelateFilterAtom);
  const red = useAtomValue(redFilterAtom);
  const green = useAtomValue(greenFilterAtom);
  const blue = useAtomValue(blueFilterAtom);

  return (
    <div>
      <span data-testid="blur-value">{blur}</span>
      <span data-testid="brightness-value">{brightness}</span>
      <span data-testid="contrast-value">{contrast}</span>
      <span data-testid="saturation-value">{saturation}</span>
      <span data-testid="pixelate-value">{pixelate}</span>
      <span data-testid="red-value">{red}</span>
      <span data-testid="green-value">{green}</span>
      <span data-testid="blue-value">{blue}</span>
      <span data-testid="all-values">{JSON.stringify(filters)}</span>
      <button data-testid="set-blur" onClick={() => setFilters({ blur: 10 })}>
        Set Blur
      </button>
      <button data-testid="set-brightness" onClick={() => setFilters({ brightness: 1.5 })}>
        Set Brightness
      </button>
      <button data-testid="set-contrast" onClick={() => setFilters({ contrast: 1.5 })}>
        Set Contrast
      </button>
      <button data-testid="set-saturation" onClick={() => setFilters({ saturation: 1.5 })}>
        Set Saturation
      </button>
      <button data-testid="set-pixelate" onClick={() => setFilters({ pixelate: 5 })}>
        Set Pixelate
      </button>
      <button data-testid="set-red" onClick={() => setFilters({ red: 0.8 })}>
        Set Red
      </button>
      <button data-testid="set-green" onClick={() => setFilters({ green: 0.8 })}>
        Set Green
      </button>
      <button data-testid="set-blue" onClick={() => setFilters({ blue: 0.8 })}>
        Set Blue
      </button>
    </div>
  );
}

function FilterAtomsWrapper(): ReactElement {
  return (
    <Provider>
      <FilterAtomsHarness />
    </Provider>
  );
}

const meta: Meta<typeof FilterAtomsWrapper> = {
  component: FilterAtomsWrapper,
  title: "Editor/Atoms/Filters",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {} satisfies Story;

export const WithAllFilterChanges: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByTestId("blur-value")).toHaveTextContent("0");

    await userEvent.click(canvas.getByTestId("set-blur"));
    await expect(canvas.getByTestId("blur-value")).toHaveTextContent("10");

    await userEvent.click(canvas.getByTestId("set-brightness"));
    await expect(canvas.getByTestId("brightness-value")).toHaveTextContent("1.5");

    await userEvent.click(canvas.getByTestId("set-contrast"));
    await expect(canvas.getByTestId("contrast-value")).toHaveTextContent("1.5");

    await userEvent.click(canvas.getByTestId("set-saturation"));
    await expect(canvas.getByTestId("saturation-value")).toHaveTextContent("1.5");

    await userEvent.click(canvas.getByTestId("set-pixelate"));
    await expect(canvas.getByTestId("pixelate-value")).toHaveTextContent("5");

    await userEvent.click(canvas.getByTestId("set-red"));
    await expect(canvas.getByTestId("red-value")).toHaveTextContent("0.8");

    await userEvent.click(canvas.getByTestId("set-green"));
    await expect(canvas.getByTestId("green-value")).toHaveTextContent("0.8");

    await userEvent.click(canvas.getByTestId("set-blue"));
    await expect(canvas.getByTestId("blue-value")).toHaveTextContent("0.8");
  },
} satisfies Story;
