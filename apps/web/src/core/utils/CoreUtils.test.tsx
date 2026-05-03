import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { atom, Provider, useAtom } from "jotai";
import { describe, it, expect } from "vitest";
import ErrorBoundary from "./ErrorBoundary";
import { HydrateAtoms } from "./HydrateAtoms";
import { throwExpression } from "./ThrowExpression";

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

    render(
      <Provider>
        <HydrateAtoms atomValues={[[testAtom, 42]]}>
          <TestConsumer />
        </HydrateAtoms>
      </Provider>
    );

    expect(screen.getByTestId("hydrated-value").textContent).toBe("42");
  });
});

describe("ErrorBoundary", () => {
  it("renders fallback when a child throws", () => {
    function ThrowingChild(): ReactElement {
      throw new Error("Test render error");
    }

    render(
      <ErrorBoundary fallback={<span data-testid="error-fallback">Error caught</span>}>
        <ThrowingChild />
      </ErrorBoundary>
    );

    const fallback = screen.getByTestId("error-fallback");
    expect(fallback).toBeTruthy();
    expect(fallback.textContent).toBe("Error caught");
  });
});
