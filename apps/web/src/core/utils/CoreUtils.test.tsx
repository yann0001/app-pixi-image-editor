import type { ReactElement } from "react";
import { act } from "react";
import { atom, Provider, useAtom } from "jotai";
import { createRoot } from "react-dom/client";
import { describe, it, expect, afterEach } from "vitest";
import ErrorBoundary from "./ErrorBoundary";
import { HydrateAtoms } from "./HydrateAtoms";
import { throwExpression } from "./ThrowExpression";

let container: HTMLDivElement;

afterEach(() => {
  if (container && container.parentNode) {
    document.body.removeChild(container);
  }
});

function renderInto(ui: ReactElement): HTMLDivElement {
  container = document.createElement("div");
  document.body.appendChild(container);
  act(() => {
    createRoot(container).render(ui);
  });
  return container;
}

describe("throwExpression", () => {
  it("throws an Error with the given message", () => {
    expect(() => throwExpression("test error message")).toThrow("test error message");
  });

  it("throws an instance of Error", () => {
    expect(() => throwExpression("oops")).toThrow(Error);
  });
});

describe("HydrateAtoms", () => {
  it("renders children with hydrated atom values", () => {
    const testAtom = atom(0);

    function TestConsumer(): ReactElement {
      const [value] = useAtom(testAtom);
      return <span data-testid="hydrated-value">{value}</span>;
    }

    const el = renderInto(
      <Provider>
        <HydrateAtoms atomValues={[[testAtom, 42]]}>
          <TestConsumer />
        </HydrateAtoms>
      </Provider>
    );

    expect(el.querySelector('[data-testid="hydrated-value"]')?.textContent).toBe("42");
  });
});

describe("ErrorBoundary", () => {
  it("renders fallback when a child throws", () => {
    function ThrowingChild(): ReactElement {
      throw new Error("Test render error");
    }

    const el = renderInto(
      <ErrorBoundary fallback={<span data-testid="error-fallback">Error caught</span>}>
        <ThrowingChild />
      </ErrorBoundary>
    );

    const fallback = el.querySelector('[data-testid="error-fallback"]');
    expect(fallback).toBeTruthy();
    expect(fallback?.textContent).toBe("Error caught");
  });
});
