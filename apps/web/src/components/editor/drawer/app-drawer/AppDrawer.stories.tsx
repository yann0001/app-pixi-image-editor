import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Provider } from "jotai";
import { fn } from "storybook/test";
import { expect } from "storybook/test";
import { appMenuStateAtom } from "../../atoms/menu/AppMenuAtoms";
import { AppDrawer as Component } from "./AppDrawer";
import { AppDrawerController } from "./AppDrawerController";
import { HydrateAtoms } from "~/core/utils/HydrateAtoms";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Editor/App Drawer",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  open: true,
  themeSwitchProps: { mode: "light" as const, onSwitch: fn() },
  onClose: fn(),
  onNewImage: fn(),
  onSaveImage: fn(),
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
    await userEvent.click(canvas.getByTestId("editor__drawer-new-image"));
    await userEvent.click(canvas.getByTestId("editor__drawer-save-image"));
  },
} satisfies Story;

function AppDrawerControllerOpen(): ReactElement {
  return (
    <Provider>
      <HydrateAtoms atomValues={[[appMenuStateAtom, true]]}>
        <AppDrawerController
          themeSwitchProps={{ mode: "light", onSwitch: fn() }}
          onNewImage={fn()}
          onSaveImage={fn()}
        />
      </HydrateAtoms>
    </Provider>
  );
}

export const ControllerOpen: StoryObj<typeof AppDrawerControllerOpen> = {
  render: () => <AppDrawerControllerOpen />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByTestId("editor__drawer-new-image")).toBeInTheDocument();
    await userEvent.click(canvas.getByTestId("editor__drawer-new-image"));
  },
} satisfies StoryObj<typeof AppDrawerControllerOpen>;
