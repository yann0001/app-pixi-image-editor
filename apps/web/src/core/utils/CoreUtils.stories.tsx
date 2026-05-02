import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { atom, Provider, useAtom } from "jotai";
import { expect } from "storybook/test";
import ErrorBoundary from "./ErrorBoundary";
import { HydrateAtoms } from "./HydrateAtoms";
import { throwExpression } from "./ThrowExpression";

// Test harness for HydrateAtoms
const testValueAtom = atom(0);

function HydrateAtomsHarness(): ReactElement {
  const [value] = useAtom(testValueAtom);
  return <span data-testid="hydrated-value">{value}</span>;
}

function HydrateAtomsWrapper({ initialValue }: { initialValue: number }): ReactElement {
  return (
    <Provider>
      <HydrateAtoms atomValues={[[testValueAtom, initialValue]]}>
        <HydrateAtomsHarness />
      </HydrateAtoms>
    </Provider>
  );
}

// Test harness for throwExpression
function ThrowExpressionHarness(): ReactElement {
  function handleTest(): void {
    try {
      throwExpression("test error message");
    } catch (e) {
      if (e instanceof Error) {
        const el = document.getElementById("throw-result");
        if (el) el.textContent = e.message;
      }
    }
  }

  return (
    <div>
      <span id="throw-result" data-testid="throw-result" />
      <button data-testid="trigger-throw" onClick={handleTest}>
        Trigger Throw
      </button>
    </div>
  );
}

const meta: Meta<typeof HydrateAtomsWrapper> = {
  component: HydrateAtomsWrapper,
  title: "Core/Utils",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const HydrateAtomsStory: Story = {
  name: "HydrateAtoms",
  args: { initialValue: 42 },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId("hydrated-value")).toHaveTextContent("42");
  },
} satisfies Story;

export const ThrowExpressionStory: StoryObj<typeof ThrowExpressionHarness> = {
  name: "ThrowExpression",
  render: () => <ThrowExpressionHarness />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId("trigger-throw"));
    await expect(canvas.getByTestId("throw-result")).toHaveTextContent("test error message");
  },
} satisfies StoryObj<typeof ThrowExpressionHarness>;

// Test harness for ErrorBoundary
function ThrowingChild(): ReactElement {
  throw new Error("Test render error");
}

function ErrorBoundaryHarness(): ReactElement {
  return (
    <ErrorBoundary fallback={<span data-testid="error-fallback">Error caught</span>}>
      <ThrowingChild />
    </ErrorBoundary>
  );
}

export const ErrorBoundaryStory: StoryObj<typeof ErrorBoundaryHarness> = {
  name: "ErrorBoundary",
  render: () => <ErrorBoundaryHarness />,
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId("error-fallback")).toBeInTheDocument();
    await expect(canvas.getByTestId("error-fallback")).toHaveTextContent("Error caught");
  },
} satisfies StoryObj<typeof ErrorBoundaryHarness>;
