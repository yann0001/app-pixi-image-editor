import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useAtom, useAtomValue, Provider } from "jotai";
import { expect } from "storybook/test";
import { isRotatedAtom, rotationAtom, rotationControlAtom } from "./transform/RotationAtoms";
import { scaleAtom, scaleControlAtom } from "./transform/ScaleAtoms";

function RotationAtomsHarness(): ReactElement {
  const [rotation] = useAtom(rotationAtom);
  const [, control] = useAtom(rotationControlAtom);
  const isRotated = useAtomValue(isRotatedAtom);

  return (
    <div>
      <span data-testid="rotation-value">{rotation.toFixed(4)}</span>
      <span data-testid="is-rotated">{String(isRotated)}</span>
      <button data-testid="rotate-left" onClick={() => control("rotate-left")}>
        Rotate Left
      </button>
      <button data-testid="rotate-right" onClick={() => control("rotate-right")}>
        Rotate Right
      </button>
      <button data-testid="rotation-reset" onClick={() => control("reset")}>
        Reset
      </button>
      <button data-testid="rotation-set-number" onClick={() => control(Math.PI / 2)}>
        Set 90°
      </button>
    </div>
  );
}

function ScaleAtomsHarness(): ReactElement {
  const [scale] = useAtom(scaleAtom);
  const [, control] = useAtom(scaleControlAtom);

  return (
    <div>
      <span data-testid="scale-x">{scale.x}</span>
      <span data-testid="scale-y">{scale.y}</span>
      <button data-testid="flip-horizontal" onClick={() => control("flip-horizontal")}>
        Flip Horizontal
      </button>
      <button data-testid="flip-vertical" onClick={() => control("flip-vertical")}>
        Flip Vertical
      </button>
      <button data-testid="scale-reset" onClick={() => control("reset")}>
        Reset Scale
      </button>
      <button data-testid="scale-set-direct" onClick={() => control({ x: 2, y: 3 })}>
        Set Direct
      </button>
    </div>
  );
}

function TransformAtomsWrapper(): ReactElement {
  return (
    <Provider>
      <RotationAtomsHarness />
      <ScaleAtomsHarness />
    </Provider>
  );
}

const meta: Meta<typeof TransformAtomsWrapper> = {
  component: TransformAtomsWrapper,
  title: "Editor/Atoms/Transform",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {} satisfies Story;

export const WithRotationInteractions: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByTestId("rotation-value")).toHaveTextContent("0.0000");
    await expect(canvas.getByTestId("is-rotated")).toHaveTextContent("false");

    await userEvent.click(canvas.getByTestId("rotate-left"));
    await expect(canvas.getByTestId("is-rotated")).toHaveTextContent("true");

    await userEvent.click(canvas.getByTestId("rotate-right"));
    await userEvent.click(canvas.getByTestId("rotate-right"));

    await userEvent.click(canvas.getByTestId("rotation-reset"));
    await expect(canvas.getByTestId("rotation-value")).toHaveTextContent("0.0000");

    await userEvent.click(canvas.getByTestId("rotation-set-number"));
    await expect(canvas.getByTestId("is-rotated")).toHaveTextContent("true");
  },
} satisfies Story;

export const WithScaleInteractions: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByTestId("scale-x")).toHaveTextContent("1");
    await expect(canvas.getByTestId("scale-y")).toHaveTextContent("1");

    await userEvent.click(canvas.getByTestId("flip-horizontal"));
    await expect(canvas.getByTestId("scale-x")).toHaveTextContent("-1");

    await userEvent.click(canvas.getByTestId("flip-vertical"));
    await expect(canvas.getByTestId("scale-y")).toHaveTextContent("-1");

    await userEvent.click(canvas.getByTestId("scale-reset"));
    await expect(canvas.getByTestId("scale-x")).toHaveTextContent("1");
    await expect(canvas.getByTestId("scale-y")).toHaveTextContent("1");

    await userEvent.click(canvas.getByTestId("scale-set-direct"));
    await expect(canvas.getByTestId("scale-x")).toHaveTextContent("2");
    await expect(canvas.getByTestId("scale-y")).toHaveTextContent("3");
  },
} satisfies Story;
