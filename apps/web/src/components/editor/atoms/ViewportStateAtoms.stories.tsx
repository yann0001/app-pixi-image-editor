import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useAtom, useAtomValue, Provider } from "jotai";
import { expect } from "storybook/test";
import { appMenuStateAtom, toggleAppMenuState } from "./menu/AppMenuAtoms";
import { filterMenuStateAtom, toggleFilterMenuState } from "./menu/FilterMenuAtoms";
import { lockAtom, lockControlAtom } from "./viewport/LockAtoms";
import { zoomAtom, zoomControlAtom, fitZoomAtom, minZoomAtom, maxZoomAtom } from "./viewport/ZoomAtoms";
import { ZOOM_BASE, ZOOM_MIN_DEFAULT, ZOOM_MAX_DEFAULT } from "./viewport/ZoomConstants";

function ZoomAtomsHarness(): ReactElement {
  const [zoom] = useAtom(zoomAtom);
  const [, zoomControl] = useAtom(zoomControlAtom);
  const fitZoom = useAtomValue(fitZoomAtom);
  const minZoom = useAtomValue(minZoomAtom);
  const maxZoom = useAtomValue(maxZoomAtom);

  return (
    <div>
      <span data-testid="zoom-value">{zoom}</span>
      <span data-testid="fit-zoom-value">{fitZoom}</span>
      <span data-testid="min-zoom-value">{minZoom}</span>
      <span data-testid="max-zoom-value">{maxZoom}</span>
      <span data-testid="zoom-base">{ZOOM_BASE}</span>
      <span data-testid="zoom-min-default">{ZOOM_MIN_DEFAULT}</span>
      <span data-testid="zoom-max-default">{ZOOM_MAX_DEFAULT}</span>
      <button data-testid="zoom-increase" onClick={() => zoomControl("increase")}>
        Increase
      </button>
      <button data-testid="zoom-decrease" onClick={() => zoomControl("decrease")}>
        Decrease
      </button>
      <button data-testid="zoom-reset" onClick={() => zoomControl("reset")}>
        Reset
      </button>
      <button data-testid="zoom-set-number" onClick={() => zoomControl(150.7)}>
        Set 150.7
      </button>
    </div>
  );
}

function LockAtomsHarness(): ReactElement {
  const [lock] = useAtom(lockAtom);
  const [, lockControl] = useAtom(lockControlAtom);

  return (
    <div>
      <span data-testid="lock-value">{String(lock)}</span>
      <button data-testid="lock-toggle" onClick={() => lockControl()}>
        Toggle Lock
      </button>
    </div>
  );
}

function MenuAtomsHarness(): ReactElement {
  const [appMenu] = useAtom(appMenuStateAtom);
  const [, toggleApp] = useAtom(toggleAppMenuState);
  const [filterMenu] = useAtom(filterMenuStateAtom);
  const [, toggleFilter] = useAtom(toggleFilterMenuState);

  return (
    <div>
      <span data-testid="app-menu-state">{String(appMenu)}</span>
      <button data-testid="toggle-app-menu" onClick={() => toggleApp()}>
        Toggle App Menu
      </button>
      <span data-testid="filter-menu-state">{String(filterMenu)}</span>
      <button data-testid="toggle-filter-menu" onClick={() => toggleFilter()}>
        Toggle Filter Menu
      </button>
    </div>
  );
}

function ViewportStateWrapper(): ReactElement {
  return (
    <Provider>
      <ZoomAtomsHarness />
      <LockAtomsHarness />
      <MenuAtomsHarness />
    </Provider>
  );
}

const meta: Meta<typeof ViewportStateWrapper> = {
  component: ViewportStateWrapper,
  title: "Editor/Atoms/Viewport State",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {} satisfies Story;

export const WithZoomInteractions: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByTestId("zoom-value")).toHaveTextContent("100");
    await expect(canvas.getByTestId("zoom-base")).toHaveTextContent("100");
    await expect(canvas.getByTestId("zoom-min-default")).toHaveTextContent("10");
    await expect(canvas.getByTestId("zoom-max-default")).toHaveTextContent("2000");

    await userEvent.click(canvas.getByTestId("zoom-increase"));
    await expect(canvas.getByTestId("zoom-value")).toHaveTextContent("110");

    await userEvent.click(canvas.getByTestId("zoom-decrease"));
    await expect(canvas.getByTestId("zoom-value")).toHaveTextContent("100");

    await userEvent.click(canvas.getByTestId("zoom-reset"));
    await expect(canvas.getByTestId("zoom-value")).toHaveTextContent("100");

    await userEvent.click(canvas.getByTestId("zoom-set-number"));
    await expect(canvas.getByTestId("zoom-value")).toHaveTextContent("150");
  },
} satisfies Story;

export const WithLockInteractions: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByTestId("lock-value")).toHaveTextContent("true");
    await userEvent.click(canvas.getByTestId("lock-toggle"));
    await expect(canvas.getByTestId("lock-value")).toHaveTextContent("false");
    await userEvent.click(canvas.getByTestId("lock-toggle"));
    await expect(canvas.getByTestId("lock-value")).toHaveTextContent("true");
  },
} satisfies Story;

export const WithMenuInteractions: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByTestId("app-menu-state")).toHaveTextContent("false");
    await userEvent.click(canvas.getByTestId("toggle-app-menu"));
    await expect(canvas.getByTestId("app-menu-state")).toHaveTextContent("true");
    await userEvent.click(canvas.getByTestId("toggle-app-menu"));
    await expect(canvas.getByTestId("app-menu-state")).toHaveTextContent("false");

    await expect(canvas.getByTestId("filter-menu-state")).toHaveTextContent("false");
    await userEvent.click(canvas.getByTestId("toggle-filter-menu"));
    await expect(canvas.getByTestId("filter-menu-state")).toHaveTextContent("true");
  },
} satisfies Story;
