import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomeView } from "./HomeView";

const meta: Meta<typeof HomeView> = {
  component: HomeView,
  title: "Views/Home",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    themeSwitchProps: { mode: "light", onSwitch: () => {} },
    socialLinkProps: { onGithubClick: () => {}, onLinkedInClick: () => {} },
    onDrop: () => {},
  },
};

export const DarkMode: Story = {
  args: {
    themeSwitchProps: { mode: "dark", onSwitch: () => {} },
    socialLinkProps: { onGithubClick: () => {}, onLinkedInClick: () => {} },
    onDrop: () => {},
  },
};
