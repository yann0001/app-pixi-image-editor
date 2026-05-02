import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditorView as Component } from "./EditorView";
import type { EditorViewProps as Props } from "./EditorView";
import CardImageSrc from "~/assets/images/card-image.jpg";

const meta: Meta<typeof Component> = {
  component: Component,
  title: "Views/Editor",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  url: CardImageSrc,
  appdrawerProps: {
    themeSwitchProps: { mode: "light", onSwitch: () => {} },
    onNewImage: () => {},
    onSaveImage: () => {},
  },
  onBack: () => {},
} satisfies Props;

export const Fullscreen: Story = {
  args: defaultArgs,
  parameters: { viewport: { value: "full" } },
};

export const Phone: Story = {
  args: defaultArgs,
  globals: { viewport: { value: "iphonex" } },
};
